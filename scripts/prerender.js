import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseStringPromise } from 'xml2js';
import http from 'http';
import handler from 'serve-handler';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_DIR = path.resolve(__dirname, '../dist');
const PORT = 4173;
const PAGE_TIMEOUT_MS = 30000;
const RENDER_WAIT_MS = 1500;

// Chrome paths to probe on Windows / macOS for local dev runs.
const LOCAL_CHROME_PATHS = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    `${process.env.LOCALAPPDATA || ''}\\Google\\Chrome\\Application\\chrome.exe`,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome',
    '/usr/bin/chromium-browser',
    '/usr/bin/chromium',
];

async function resolveBrowserLaunchOptions() {
    // 1. Linux/CI (Vercel build container) — use @sparticuz/chromium for a portable Chrome.
    if (process.platform === 'linux') {
        // Force @sparticuz/chromium to extract AL2023 libs by spoofing AWS_EXECUTION_ENV
        // BEFORE importing the package (its module-top code reads this env var). We must
        // OVERWRITE — Vercel already sets AWS_EXECUTION_ENV=vercel-hive, which doesn't
        // contain "20.x" and therefore fails @sparticuz's lambda detection.
        process.env.AWS_EXECUTION_ENV = 'AWS_Lambda_nodejs20.x';
        const chromium = (await import('@sparticuz/chromium')).default;
        const executablePath = await chromium.executablePath();

        // Belt and braces: ensure LD_LIBRARY_PATH includes whichever lib dirs actually
        // got extracted. The package sets this only inside its own conditional logic.
        const candidateLibDirs = ['/tmp/al2023/lib', '/tmp/al2/lib', '/tmp/aws/lib'];
        const presentLibDirs = candidateLibDirs.filter((d) => fs.existsSync(d));
        const currentLd = (process.env.LD_LIBRARY_PATH || '').split(':').filter(Boolean);
        process.env.LD_LIBRARY_PATH = [...new Set([...presentLibDirs, ...currentLd])].join(':');

        console.log('[prerender] AWS_EXECUTION_ENV:', process.env.AWS_EXECUTION_ENV);
        console.log('[prerender] LD_LIBRARY_PATH:', process.env.LD_LIBRARY_PATH);
        console.log('[prerender] Chromium binary:', executablePath,
            fs.existsSync(executablePath) ? '(exists)' : '(MISSING)');
        for (const d of candidateLibDirs) {
            if (fs.existsSync(d)) {
                const files = fs.readdirSync(d);
                const hasNss = files.includes('libnss3.so');
                console.log(`[prerender] ${d}: ${files.length} files, libnss3.so=${hasNss}`);
            } else {
                console.log(`[prerender] ${d}: missing`);
            }
        }

        return {
            args: [...chromium.args, '--no-sandbox', '--disable-dev-shm-usage'],
            executablePath,
            headless: chromium.headless,
            env: { ...process.env },
        };
    }

    // 2. Local dev (Windows/macOS) — find an installed Chrome
    const localPath = LOCAL_CHROME_PATHS.find((p) => p && fs.existsSync(p));
    if (!localPath) {
        throw new Error(
            'No local Chrome found. Install Google Chrome or set PUPPETEER_EXECUTABLE_PATH.'
        );
    }
    return {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || localPath,
        headless: 'new',
        args: ['--no-sandbox', '--disable-dev-shm-usage'],
    };
}

async function startServer() {
    return new Promise((resolve) => {
        const server = http.createServer((req, res) =>
            handler(req, res, {
                public: DIST_DIR,
                rewrites: [{ source: '**', destination: '/index.html' }],
            })
        );
        server.listen(PORT, () => resolve(server));
    });
}

async function getRoutes() {
    const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
    if (!fs.existsSync(sitemapPath)) {
        console.error('Sitemap not found at', sitemapPath);
        process.exit(1);
    }
    const xml = fs.readFileSync(sitemapPath, 'utf8');
    const parsed = await parseStringPromise(xml);
    const routes = parsed.urlset.url.map((u) => new URL(u.loc[0]).pathname);
    return [...new Set(routes)];
}

function injectPrerenderedFlag(html) {
    // Mark this document as server-rendered so the client app can skip
    // initial network calls / re-fetches if it chooses to.
    return html.replace('<head>', '<head>\n    <meta name="prerendered" content="true">');
}

// Strip duplicate <script src="..."> tags. The recaptcha and clarity loaders
// each chain-load additional scripts, and Puppeteer captures every one of
// them — leaving 5+ copies of recaptcha__en.js and 3+ copies of clarity in
// the HTML. None of this matters at runtime (browsers dedupe by URL) but it
// inflates HTML size and looks ugly to crawlers.
function dedupeScriptTags(html) {
    const seen = new Set();
    return html.replace(/<script\b[^>]*\bsrc="([^"]+)"[^>]*><\/script>/g, (match, src) => {
        if (seen.has(src)) return '';
        seen.add(src);
        return match;
    });
}

(async () => {
    console.log('Pre-rendering: starting…');

    const server = await startServer();
    console.log(`Static server: http://localhost:${PORT}`);

    const routes = await getRoutes();
    // /404 isn't in the sitemap (we don't want Google to discover it as a
    // first-class URL), but Vercel serves dist/404.html as the real 404
    // response, so we have to render it too. It writes to dist/404.html
    // (a file, not /404/index.html — Vercel only picks up the file form).
    routes.push('/404');
    console.log(`Routes to render: ${routes.length}`);

    const launchOptions = await resolveBrowserLaunchOptions();
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // Block heavy resources to speed up rendering. The output HTML still
    // references them, so the live page loads them normally.
    await page.setRequestInterception(true);
    page.on('request', (req) => {
        const t = req.resourceType();
        if (['image', 'media', 'font'].includes(t)) return req.abort();
        return req.continue();
    });

    let ok = 0;
    let failed = 0;

    for (const route of routes) {
        const url = `http://localhost:${PORT}${route}`;
        try {
            await page.goto(url, { waitUntil: 'networkidle0', timeout: PAGE_TIMEOUT_MS });
            // Wait for the React app to finish hydrating + meta tags to settle.
            await page
                .waitForSelector('footer', { timeout: 10000 })
                .catch(() => {});
            await new Promise((r) => setTimeout(r, RENDER_WAIT_MS));

            const html = dedupeScriptTags(injectPrerenderedFlag(await page.content()));

            const relativePath =
                route === '/' ? 'index.html'
                    : route === '/404' ? '404.html'
                    : path.join(route.substring(1), 'index.html');
            const outPath = path.join(DIST_DIR, relativePath);
            fs.mkdirSync(path.dirname(outPath), { recursive: true });
            fs.writeFileSync(outPath, html);
            console.log(`  ok  ${route}`);
            ok++;
        } catch (e) {
            console.error(`  FAIL ${route}:`, e.message);
            failed++;
        }
    }

    await browser.close();
    server.close();

    console.log(`Pre-rendering done. ok=${ok} failed=${failed}`);
    // Don't fail the build on per-route render errors; the SPA fallback
    // will still serve those routes (just without prerendered HTML).
    process.exit(0);
})();
