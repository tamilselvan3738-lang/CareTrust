const fs = require('fs');

const scriptToInject = `
    <!-- Active Link Detection -->
    <script>
      document.addEventListener('DOMContentLoaded', () => {
        let currentPath = window.location.pathname.split('/').pop();
        if (!currentPath || currentPath === '') currentPath = 'index.html';
        
        // Target all links inside navigation areas
        const navLinks = document.querySelectorAll('nav a[href], .border-b a[href], #mobile-home-menu a[href]');
        
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          // If the link matches the current page URL
          if (href === currentPath) {
            
            // 1. Highlight the link itself
            link.classList.remove('text-dark-bg', 'dark:text-white', 'text-gray-600', 'dark:text-white/70');
            link.classList.add('!text-primary', 'dark:!text-primary', 'font-extrabold');
            
            // Add background if it's a desktop top-level link
            if (link.classList.contains('px-2') && link.classList.contains('py-2')) {
                link.classList.add('bg-gray-100', 'dark:bg-primary/10');
            }
            
            // 2. Highlight parent dropdown button (Desktop)
            const dropdown = link.closest('.group');
            if (dropdown) {
                const parentBtn = dropdown.querySelector('button');
                if (parentBtn) {
                    parentBtn.classList.remove('text-dark-bg', 'dark:text-white');
                    parentBtn.classList.add('!text-primary', 'dark:!text-primary', 'font-extrabold', 'bg-gray-100', 'dark:bg-primary/10');
                }
            }
            
            // 3. Highlight parent button (Mobile)
            const mobileMenu = link.closest('#mobile-home-menu');
            if (mobileMenu) {
                // Find the previous sibling block which holds the mobile "Home" toggle
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

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
let count = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Remove old injected script if it exists to prevent duplication
    content = content.replace(/<!-- Active Link Detection -->[\s\S]*?<\/script>\s*<\/body>/, '</body>');
    
    // Inject script right before the closing body tag
    if (content.includes('</body>')) {
        content = content.replace('</body>', scriptToInject);
        fs.writeFileSync(file, content, 'utf8');
        count++;
        console.log('Injected active detection into ' + file);
    }
});

console.log('Success! Added active link detection to ' + count + ' HTML files.');
