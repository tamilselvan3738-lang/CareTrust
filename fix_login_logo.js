const fs = require('fs');

['login.html', 'register.html'].forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');

        // Fix tailwind colors in the head config
        content = content.replace(/primary:\s*'#[A-Fa-f0-9]+'/g, "primary: '#000080'");
        content = content.replace(/secondary:\s*'#[A-Fa-f0-9]+'/g, "secondary: '#000000'");
        
        // Also fix the gradient 
        content = content.replace(/'gradient-primary':\s*'.*?'/g, "'gradient-primary': 'linear-gradient(to right, #000080, #000000)'");
        
        // Just to be 100% sure the logo perfectly matches the home page layout (with the subtitle), let's replace the whole anchor tag block for the logo:
        const oldLogoRegex = /<a href="index\.html" class="flex items-center gap-2">[\s\S]*?<\/a>/;
        const newLogo = `<a href="index.html" class="flex items-center gap-2 md:gap-3">
    <i class="fas fa-heartbeat text-3xl md:text-4xl text-primary drop-shadow-[0_2px_8px_rgba(0,0,128,0.4)]"></i>
    <div class="flex flex-col">
        <span class="text-xl md:text-2xl font-extrabold tracking-widest text-[var(--text-color)] uppercase whitespace-nowrap leading-none mb-0.5">Care<span class="text-primary">Trust</span></span>
        <span class="text-[0.6rem] md:text-xs text-[var(--text-muted)] font-medium tracking-[0.2em] uppercase leading-none">Nursing & Care</span>
    </div>
</a>`;
        content = content.replace(oldLogoRegex, newLogo);

        // Also fix the hover highlight css var
        content = content.replace(/--hover-highlight:\s*#EF4444;/g, "--hover-highlight: #000080;");
        
        fs.writeFileSync(file, content, 'utf8');
        console.log(`Fully fixed logo and theme in ${file}`);
    }
});
