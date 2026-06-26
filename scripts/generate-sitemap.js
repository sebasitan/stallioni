// Auto-generate public/sitemap.xml from the app's own data so the sitemap can
// never drift from reality again. Routes are derived from SERVICE_DETAILS,
// BLOG_POSTS, REGIONAL_PAGES, and RESOURCE_ARTICLES — the same sources the app
// renders from — so adding a service/article automatically adds its sitemap URL.
//
// Runs FIRST in the build (`generate-sitemap && vite build && prerender`):
//   1. it writes public/sitemap.xml
//   2. vite copies public/ -> dist/
//   3. prerender.js reads dist/sitemap.xml to know which routes to render
// so sitemap + prerender stay in lockstep automatically.
//
// lastmod policy (honest freshness — never stamp "today" on everything, which
// teaches Google to ignore the signal):
//   - blog posts / resource articles -> their own content date
//   - services / regional / static pages -> git commit date of the file that
//     defines that content (falls back to today only if git is unavailable)
//
// The data lives in TS/TSX (with React icon imports), which Node can't import
// directly, so we transpile+bundle it in-memory with esbuild (already a Vite
// dependency) and import the result. Any failure leaves the existing sitemap
// untouched and exits 0 — a sitemap hiccup must never break the deploy.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execFileSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..');
const BASE_URL = 'https://www.stallioni.com';
const OUT_PATH = path.join(ROOT, 'public', 'sitemap.xml');
const TODAY = new Date().toISOString().slice(0, 10);

// Last git commit date (YYYY-MM-DD) that touched a file, for an honest lastmod.
const gitDateCache = new Map();
function gitDate(relFile) {
  if (gitDateCache.has(relFile)) return gitDateCache.get(relFile);
  let date = TODAY;
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', relFile], {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(out)) date = out;
  } catch {
    /* shallow clone or no git — fall back to TODAY */
  }
  gitDateCache.set(relFile, date);
  return date;
}

// Transpile + bundle the TS/TSX data modules in-memory, then import them.
async function loadData() {
  const esbuild = (await import('esbuild')).default;
  const entry = [
    `export { SERVICE_DETAILS } from ${JSON.stringify(path.join(ROOT, 'constants-full.tsx'))};`,
    `export { BLOG_POSTS } from ${JSON.stringify(path.join(ROOT, 'constants/heavy-data.ts'))};`,
    `export { REGIONAL_PAGES } from ${JSON.stringify(path.join(ROOT, 'constants/regional-pages.ts'))};`,
    `export { RESOURCE_ARTICLES } from ${JSON.stringify(path.join(ROOT, 'constants/resources.ts'))};`,
  ].join('\n');

  const result = await esbuild.build({
    stdin: { contents: entry, resolveDir: ROOT, loader: 'ts' },
    bundle: true,
    write: false,
    platform: 'node',
    format: 'esm',
    jsx: 'automatic',
    logLevel: 'silent',
    absWorkingDir: ROOT,
  });

  const code = result.outputFiles[0].text;
  const dataUrl = 'data:text/javascript;base64,' + Buffer.from(code).toString('base64');
  return import(dataUrl);
}

const xmlEscape = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

(async () => {
  let data;
  try {
    data = await loadData();
  } catch (e) {
    console.error('[sitemap] data load failed — keeping existing sitemap. Reason:', e.message);
    process.exit(0); // never break the build over the sitemap
  }

  const urls = [];
  const add = (loc, lastmod, changefreq, priority) =>
    urls.push({ loc: `${BASE_URL}${loc}`, lastmod, changefreq, priority });

  // --- Static core pages (lastmod = git date of the component that owns them)
  add('/', gitDate('pages/HomePage.tsx'), 'weekly', '1.0');
  add('/about', gitDate('pages/AboutPage.tsx'), 'monthly', '0.8');
  add('/services', gitDate('pages/ServicesPage.tsx'), 'weekly', '0.9');
  add('/portfolio', gitDate('pages/PortfolioPage.tsx'), 'weekly', '0.7');
  add('/blog', gitDate('pages/BlogPage.tsx'), 'weekly', '0.7');
  add('/careers', gitDate('pages/CareersPage.tsx'), 'monthly', '0.6');
  add('/contact', gitDate('pages/ContactPage.tsx'), 'monthly', '0.7');
  add('/agencies', gitDate('constants/agencies-page.ts'), 'monthly', '0.8');
  add('/resources', gitDate('constants/resources.ts'), 'weekly', '0.7');

  // --- Service detail pages (all defined in constants-full.tsx)
  const servicesDate = gitDate('constants-full.tsx');
  for (const s of data.SERVICE_DETAILS || []) {
    if (s && s.id) add(`/services/${s.id}`, servicesDate, 'monthly', '0.8');
  }

  // --- Regional landing pages
  const regionalDate = gitDate('constants/regional-pages.ts');
  for (const slug of Object.keys(data.REGIONAL_PAGES || {})) {
    add(`/it-outsourcing/${slug}`, regionalDate, 'monthly', '0.8');
  }

  // --- Resource articles (per-article content date)
  for (const a of data.RESOURCE_ARTICLES || []) {
    if (a && a.slug) {
      add(`/resources/${a.slug}`, a.updatedDate || a.publishedDate || TODAY, 'monthly', '0.7');
    }
  }

  // --- Blog posts (per-post content date). Numeric seeded IDs only; runtime
  // admin posts aren't in the static data and can't be prerendered anyway.
  for (const p of data.BLOG_POSTS || []) {
    if (p && (typeof p.id === 'number' || typeof p.id === 'string')) {
      add(`/blog/${p.id}`, p.date || TODAY, 'monthly', '0.6');
    }
  }

  // De-dupe by loc (last write wins) and keep a stable, readable order.
  const byLoc = new Map();
  for (const u of urls) byLoc.set(u.loc, u);
  const finalUrls = [...byLoc.values()];

  const body = finalUrls
    .map(
      (u) =>
        `  <url>\n` +
        `    <loc>${xmlEscape(u.loc)}</loc>\n` +
        `    <lastmod>${u.lastmod}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n` +
        `  </url>`
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

  fs.writeFileSync(OUT_PATH, xml, 'utf8');
  console.log(`[sitemap] wrote ${finalUrls.length} URLs -> ${path.relative(ROOT, OUT_PATH)}`);
})();
