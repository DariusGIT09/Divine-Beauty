const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const filePath = path.join(pagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex to match the Gallery section including the optional comment and the entire block until the closing div of the button
    const regex = /(?:[ \t]*<!--\s*Gallery (?:Grid|Salon)\s*-->\s*\r?\n)?([ \t]*)<h3 class="section-title text-center"[^>]*>\s*Galerie\s+(?:Rezultate|Salon)\s*<\/h3>\s*\r?\n[ \t]*<div class="gallery-grid">[\s\S]*?<a href="\.\.\/galerie\.html"[^>]*>VEZI TOATĂ GALERIA DE POZE<\/a>\s*\r?\n[ \t]*<\/div>\s*\r?\n/g;

    const newContent = content.replace(regex, '');

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated ${file}`);
    } else {
        console.log(`No match found in ${file}`);
    }
}
