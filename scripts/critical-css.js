import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Beasties from 'beasties';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '../dist');

// Recursively collect every .html file under dist/.
function collectHtml(dir) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name === 'assets') continue; // no HTML there
            out.push(...collectHtml(full));
        } else if (entry.name.endsWith('.html')) {
            out.push(full);
        }
    }
    return out;
}

(async () => {
    const files = collectHtml(DIST_DIR);
    console.log(`[critical-css] processing ${files.length} HTML files…`);

    let ok = 0;
    let skipped = 0;
    let failed = 0;

    for (const file of files) {
        const html = fs.readFileSync(file, 'utf8');

        // Only process pages that still reference an external stylesheet — if a
        // page has no <link rel="stylesheet">, there's nothing to inline.
        if (!/<link[^>]+rel=["']stylesheet["']/i.test(html)) {
            skipped++;
            continue;
        }

        // A fresh instance per file so critical CSS is extracted from THIS page's
        // above-the-fold DOM, not a shared/accumulated set.
        const beasties = new Beasties({
            path: DIST_DIR,
            publicPath: '/',
            preload: 'swap',            // remaining CSS loads async, swaps in on load
            pruneSource: false,         // keep the full stylesheet file (async-loaded)
            inlineFonts: false,
            reduceInlineStyles: false,  // leave our hand-written <style> (incl. @font-face) intact
            logLevel: 'silent',
        });

        try {
            const processed = await beasties.process(html);
            fs.writeFileSync(file, processed);
            ok++;
        } catch (e) {
            // Don't fail the build for one bad page — it keeps the (render-blocking
            // but correct) external stylesheet.
            console.warn(`[critical-css] FAILED ${path.relative(DIST_DIR, file)}: ${e.message}`);
            failed++;
        }
    }

    console.log(`[critical-css] done. inlined=${ok} skipped=${skipped} failed=${failed}`);
})();
