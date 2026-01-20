import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import fs from "fs";
import path from "path";
import http from "http";
import handler from "serve-handler";
import { parseStringPromise } from "xml2js";
import { fileURLToPath } from 'url';

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
    console.log("📦 Starting Pre-rendering Process...");

    const server = await startServer();
    console.log(`🚀 Static server running at http://localhost:${PORT}`);

    const routes = await getRoutes();
    console.log(`🔍 Found ${routes.length} routes to pre-render.`);

    // 🔥 THIS IS CRITICAL
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(), // MUST be this
        headless: chromium.headless,
    });

    const page = await browser.newPage();

    // Optimization: Intercept requests
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
            await page.waitForSelector("footer", { timeout: 10000 }).catch(() => console.log('Footer wait timed out, saving anyway...'));

            const html = await page.content();
            // Correct path joining logic
            const relativePath = route === '/' ? 'index.html' : path.join(route.substring(1), 'index.html');
            // Handle Windows paths if run locally, but ensure standard path format
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
