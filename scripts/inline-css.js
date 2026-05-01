import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const indexHtmlPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexHtmlPath)) {
    console.error('Error: dist/index.html not found. Run build first.');
    process.exit(1);
}

let html = fs.readFileSync(indexHtmlPath, 'utf-8');

// Find the main CSS file in the link tag
// Matches <link rel="stylesheet" crossorigin href="/assets/index-XXXX.css"> or similar
const cssLinkRegex = /<link rel="stylesheet" crossorigin href="([^"]+)">/g;
let match = cssLinkRegex.exec(html);

// If not found with crossorigin, try without (depends on vite config)
if (!match) {
    const backupRegex = /<link rel="stylesheet" href="([^"]+)">/g;
    match = backupRegex.exec(html);
}

if (match) {
    const cssHref = match[1];
    const cssFileName = cssHref.split('/').pop();
    const cssPath = path.join(distDir, 'assets', cssFileName);

    if (fs.existsSync(cssPath)) {
        console.log(`Inlining CSS: ${cssFileName}`);
        const cssContent = fs.readFileSync(cssPath, 'utf-8');

        // Replace the link tag with an inline style tag
        const styleTag = `<style>${cssContent}</style>`;
        html = html.replace(match[0], styleTag);

        // Write the modified HTML back
        fs.writeFileSync(indexHtmlPath, html);
        console.log('Successfully inlined critical CSS into index.html');
    } else {
        console.warn(`CSS file found in HTML but not on disk: ${cssPath}`);
    }
} else {
    console.log('No external CSS link found to inline.');
}
