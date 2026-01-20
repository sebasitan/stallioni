import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { createServer } from 'http';
import handler from 'serve-handler';

// ESM directory helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DIST_DIR = path.resolve(__dirname, '../dist');
const BASE_URL = 'http://localhost:3000';
const SITEMAP_PATH = path.join(DIST_DIR, 'sitemap.xml');

// Helper to start a local static server for the build
const startServer = () => {
    return new Promise((resolve) => {
        const server = createServer((request, response) => {
            return handler(request, response, {
                public: DIST_DIR,
                rewrites: [
                    { source: '**', destination: '/index.html' }
                ]
            });
        });

        server.listen(3000, () => {
            console.log(`🚀 Static server running at ${BASE_URL}`);
            resolve(server);
        });
    });
};

// Helper to extract URLs from sitemap.xml
const getRoutesFromSitemap = () => {
    if (!fs.existsSync(SITEMAP_PATH)) {
        console.error('❌ Sitemap not found in dist/. Build project first!');
        process.exit(1);
    }

    const sitemapContent = fs.readFileSync(SITEMAP_PATH, 'utf-8');
    // Simple regex to extract <loc> URLs
    const urls = [];
    const regex = /<loc>(https:\/\/www\.stallioni\.com)(.*?)<\/loc>/g;
    let match;

    while ((match = regex.exec(sitemapContent)) !== null) {
        // match[2] corresponds to the path (e.g. /services/php-development)
        const route = match[2] || '/';
        urls.push(route);
    }

    // Remove duplicates and ensure homepage is there
    return [...new Set(urls)];
};

const prerender = async () => {
    console.log('📦 Starting Pre-rendering Process...');

    const server = await startServer();
    const routes = getRoutesFromSitemap();

    console.log(`🔍 Found ${routes.length} routes to pre-render.`);

    const browser = await puppeteer.launch({
        headless: "new",
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    // Optimization: Intercept requests to skip non-critical assets (images, fonts)
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
        try {
            const fullUrl = `${BASE_URL}${route}`;
            console.log(`Rendering: ${route}...`);

            // Go to page and wait for logical load
            await page.goto(fullUrl, { waitUntil: 'networkidle0' });

            // Wait for a critical element to ensure React has mounted (e.g., footer or specific h1)
            await page.waitForSelector('footer', { timeout: 10000 }).catch(() => console.log('Footer wait timed out, proceeding anyway...'));

            // Get the HTML
            const html = await page.content();

            // Define output path
            // e.g. /services/php-development/ -> dist/services/php-development/index.html
            // e.g. / -> dist/index.html
            const relativePath = route === '/' ? 'index.html' : path.join(route.substring(1), 'index.html');
            const outputPath = path.join(DIST_DIR, relativePath);
            const outputDir = path.dirname(outputPath);

            // Ensure directory exists
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Write File
            fs.writeFileSync(outputPath, html);
            console.log(`✅ Saved: ${relativePath}`);

        } catch (err) {
            console.error(`❌ Failed to render ${route}:`, err.message);
        }
    }

    await browser.close();
    server.close();
    console.log('🎉 Pre-rendering complete!');
    process.exit(0);
};

prerender();
