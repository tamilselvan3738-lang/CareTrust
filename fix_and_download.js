const fs = require('fs');
const https = require('https');
const path = require('path');
const crypto = require('crypto');

// --- 1. ACTIVE DETECTION FIX ---
const scriptToInject = `
    <!-- Active Link Detection -->
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        let currentPath = window.location.pathname.split('/').pop();
        if (!currentPath || currentPath === '') currentPath = 'index.html';
        
        const navLinks = document.querySelectorAll('nav a[href], .border-b a[href], #mobile-home-menu a[href], a.text-xs.uppercase');
        
        // 1. STRIP ACTIVE CLASSES FROM ALL LINKS (Removes the stuck Home highlight)
        navLinks.forEach(link => {
            link.classList.remove('text-primary', '!text-primary', 'dark:text-primary', 'dark:!text-primary', 'font-extrabold', 'bg-gray-100', 'dark:bg-primary/10');
            // Ensure they have the base inactive colors
            if(!link.classList.contains('text-white') && !link.classList.contains('text-dark-bg') && !link.classList.contains('text-gray-600')) {
                link.classList.add('text-dark-bg', 'dark:text-white');
            }
            
            // Strip from parent dropdown buttons too
            const dropdown = link.closest('.group');
            if (dropdown) {
                const parentBtn = dropdown.querySelector('button');
                if (parentBtn) {
                    parentBtn.classList.remove('text-primary', '!text-primary', 'dark:!text-primary', 'font-extrabold', 'bg-gray-100', 'dark:bg-primary/10');
                    if(!parentBtn.classList.contains('text-dark-bg')) {
                        parentBtn.classList.add('text-dark-bg', 'dark:text-white');
                    }
                }
            }
            
            // Strip from mobile home button
            const mobileMenu = link.closest('#mobile-home-menu');
            if (mobileMenu) {
                const mobileParentDiv = mobileMenu.previousElementSibling;
                if (mobileParentDiv) {
                    const mobileParentLink = mobileParentDiv.querySelector('a');
                    if (mobileParentLink) {
                        mobileParentLink.classList.remove('text-primary', '!text-primary', 'dark:!text-primary', 'font-extrabold');
                    }
                }
            }
        });
        
        // 2. APPLY ACTIVE CLASS ONLY TO CURRENT PAGE
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === currentPath) {
            link.classList.remove('text-dark-bg', 'dark:text-white', 'text-gray-600', 'dark:text-white/70');
            link.classList.add('!text-primary', 'dark:!text-primary', 'font-extrabold');
            
            if (link.classList.contains('px-2') && link.classList.contains('py-2')) {
                link.classList.add('bg-gray-100', 'dark:bg-primary/10');
            }
            
            const dropdown = link.closest('.group');
            if (dropdown) {
                const parentBtn = dropdown.querySelector('button');
                if (parentBtn) {
                    parentBtn.classList.remove('text-dark-bg', 'dark:text-white');
                    parentBtn.classList.add('!text-primary', 'dark:!text-primary', 'font-extrabold', 'bg-gray-100', 'dark:bg-primary/10');
                }
            }
            
            const mobileMenu = link.closest('#mobile-home-menu');
            if (mobileMenu) {
                const mobileParentDiv = mobileMenu.previousElementSibling;
                if (mobileParentDiv) {
                    const mobileParentLink = mobileParentDiv.querySelector('a');
                    if (mobileParentLink) {
                        mobileParentLink.classList.remove('text-dark-bg', 'dark:text-white');
                        mobileParentLink.classList.add('!text-primary', 'dark:!text-primary', 'font-extrabold');
                    }
                }
            }
          }
        });
      });
    </script>
</body>`;

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    content = content.replace(/<!-- Active Link Detection -->[\s\S]*?<\/script>\s*<\/body>/, '</body>');
    if (content.includes('</body>')) {
        content = content.replace('</body>', scriptToInject);
        fs.writeFileSync(file, content, 'utf8');
    }
});
console.log('Active Link Detection updated to aggressively clear stuck highlights.');

// --- 2. DOWNLOAD IMAGES LOCALLY ---
const assetsDir = path.join(__dirname, 'assets');
if (!fs.existsSync(assetsDir)){
    fs.mkdirSync(assetsDir, { recursive: true });
}

// Regex to capture the URL structure from Unsplash
const urlRegex = /https:\/\/images\.unsplash\.com\/[a-zA-Z0-9\-\?\&=\%]+/g;
let uniqueUrls = new Set();

htmlFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    while ((match = urlRegex.exec(content)) !== null) {
        uniqueUrls.add(match[0]);
    }
});

const urlMap = {};
Array.from(uniqueUrls).forEach((url) => {
    // Make short secure filenames
    const hash = crypto.createHash('md5').update(url).digest('hex').substring(0, 8);
    const filename = `img_${hash}.jpg`;
    urlMap[url] = `assets/${filename}`;
});

async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        if (fs.existsSync(filepath)) return resolve();
        https.get(url, (res) => {
            if (res.statusCode === 301 || res.statusCode === 302) {
                return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
            }
            const fileStream = fs.createWriteStream(filepath);
            res.pipe(fileStream);
            fileStream.on('finish', () => {
                fileStream.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {});
            reject(err);
        });
    });
}

async function processAll() {
    console.log(`Found ${uniqueUrls.size} unique external images. Downloading to assets folder...`);
    for (const url of uniqueUrls) {
        const filepath = path.join(assetsDir, path.basename(urlMap[url]));
        try {
            await downloadImage(url, filepath);
            console.log(`Downloaded ${path.basename(urlMap[url])}`);
        } catch (e) {
            console.error(`Failed to download ${url}: ${e.message}`);
        }
    }

    htmlFiles.forEach(file => {
        let content = fs.readFileSync(file, 'utf8');
        for (const [url, localPath] of Object.entries(urlMap)) {
            // Global replace within file
            content = content.split(url).join(localPath);
        }
        fs.writeFileSync(file, content, 'utf8');
    });
    console.log('All HTML files updated with local asset paths!');
}

processAll();
