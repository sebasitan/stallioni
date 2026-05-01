import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseStringPromise } from 'xml2js';
import http from 'http';
import handler from 'serve-handler';

// ESM directory helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 3000;

async function startServer() {
    return new Promise((resolve) => {
        const server = http.createServer((req, res) => {
            return handler(req, res, {
                public: DIST_DIR,
                files: [
                    path.join(DIST_DIR, 'index.html'),
                    path.join(DIST_DIR, 'sitemap.xml')
                ],
                rewrites: [
                    { source: '**', destination: '/index.html' }
                ]
            });
        });
        server.listen(PORT, () => {
            resolve(server);
        });
    });
}

async function getRoutes() {
    const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
        console.error('❌ Sitemap not found!');
        process.exit(1);
    }
    const xml = fs.readFileSync(sitemapPath, "utf8");
    const parsed = await parseStringPromise(xml);
    return parsed.urlset.url.map(u => new URL(u.loc[0]).pathname);
}

(async () => {
    console.log("📦 Starting Pre-rendering Process (Standard Puppeteer)...");

    // Since this runs in GitHub Actions (standard Ubuntu), no crazy hacks needed.
    // Standard Puppeteer works great there.

    const server = await startServer();
    console.log(`🚀 Static server running at http://localhost:${PORT}`);

    const routes = await getRoutes();
    console.log(`🔍 Found ${routes.length} routes to pre-render.`);

    const browser = await puppeteer.launch({
        headless: "new"
        // No args needed for GitHub Actions Ubuntu runners usually, 
        // but --no-sandbox is safe insurance.
    });

    const page = await browser.newPage();

    await page.setRequestInterception(true);
    page.on('request', (req) => {
        const resourceType = req.resourceType();
        if (['image', 'stylesheet', 'font'].includes(resourceType)) {
            req.abort();
        } else {
            req.continue();
        }
    });

    for (const route of routes) {
        const url = `http://localhost:${PORT}${route}`;
        console.log(`➡️ Rendering ${route}`);

        try {
            await page.goto(url, { waitUntil: "networkidle0" });
            await page.waitForSelector("footer", { timeout: 10000 }).catch(() => { });

            const html = await page.content();

            const relativePath = route === '/' ? 'index.html' : path.join(route.substring(1), 'index.html');
            const outDir = path.join(DIST_DIR, path.dirname(relativePath));
            const finalPath = path.join(DIST_DIR, relativePath);

            if (!fs.existsSync(outDir)) {
                fs.mkdirSync(outDir, { recursive: true });
            }

            fs.writeFileSync(finalPath, html);
            console.log(`✅ Saved: ${relativePath}`);
        } catch (e) {
            console.error(`❌ Failed to render ${route}:`, e);
        }
    }

    await browser.close();
    server.close();

    console.log("✅ Pre-rendering completed successfully.");
    process.exit(0);
})();
