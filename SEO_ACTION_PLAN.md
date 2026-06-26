# SEO Action Plan — manual steps (external, only you can do)

> Companion to the code work shipped 2026-06-26. The code side (sitemap
> automation, internal linking, FAQ blocks) is done and deploys automatically.
> The items below are external actions Claude can't perform for you.

---

## ✅ Already shipped in code (context)
- Sitemap auto-generated with honest `lastmod` (`scripts/generate-sitemap.js`).
- Internal links: 4 failed pages + 13 never-submitted pages now have ≥2–3 inbound links each.
- FAQ blocks added to thin pages `webrtc` and `ar-vr-experiences` (FAQPage schema → AI/rich results).
- Fixed broken link `woocommerce-devel` → `woocommerce-development`.

---

## 🔍 TIER 1 #4 — Submit the 13 never-submitted pages to GSC
**After this deploy finishes (~7 min)**, in Search Console → **URL Inspection** → paste each → **Request Indexing** (~10–15/day limit, so spread over 1–2 days):

```
https://www.stallioni.com/services/core-php-development
https://www.stallioni.com/services/legacy-php-migration
https://www.stallioni.com/services/on-page-off-page-seo
https://www.stallioni.com/services/social-media-ads
https://www.stallioni.com/services/manual-testing
https://www.stallioni.com/services/api-testing
https://www.stallioni.com/services/cross-browser-testing
https://www.stallioni.com/services/cicd-automation
https://www.stallioni.com/services/hosting-support
https://www.stallioni.com/services/real-time-apps
https://www.stallioni.com/services/nlp-features
https://www.stallioni.com/services/webrtc
https://www.stallioni.com/services/ar-vr-experiences
```
Also re-submit the 4 previously-failed pages (hold expired): `drupal-development`, `laravel-development`, `wix-development`, `security-audits`.

---

## 🔗 TIER 2 — Backlinks (your single biggest lever)
Low domain authority = Google crawls you rarely. Even 5–10 quality links move the needle most. Highest-relevance sources for an IT agency, in priority order:

1. **Agency directories (high DA + relevant):** Clutch, GoodFirms, DesignRush, The Manifest, Sortlist — create a profile, link to the site. (These also send real leads.)
2. **Freelancer.com profile** — add the website link to your `graphicaa` profile bio.
3. **LinkedIn** — create/refresh a **company page** (not just founder profile), link the site; post the `/resources/` articles.
4. **Business listings:** Crunchbase, GitHub org page, Justdial, Sulekha, IndiaMART (India relevance).
5. **HARO / Connectively** — answer journalist queries on web-dev/outsourcing for editorial backlinks.
6. **Affiliate partner pages** — several programs you join list partners; ask to be listed.

Target: diversify across 6–8 domains; don't buy links.

## 📍 TIER 2 — Google Business Profile
Create at **business.google.com** using **exactly** this NAP (must match the LocalBusiness schema already on the homepage, or it dilutes the signal):

| Field | Value |
|---|---|
| Name | Stallioni Net Solutions |
| Address | 23 Jayanth Complex, TP Road, Annur, Coimbatore, Tamil Nadu 641653, India |
| Phone | +91 98432 96279 |
| Website | https://www.stallioni.com |
| Hours | Mon–Fri 9:00–18:00 IST |
| Category | Software company / Website designer |
| Email | contact@stallioni.com |

Then verify (postcard/phone), add services + photos. This unlocks Google Maps + local pack + strengthens the LocalBusiness schema.

---

## 🤖 TIER 3 — AI Visibility
- **FAQ coverage is now 78/79 services.** Only `maintenance-support` (a category hub) still lacks FAQs — optional, low priority (Claude can add it on request).
- **GeoAnalyzer re-score:** go to **geo-analyzer.com**, enter `https://www.stallioni.com/`. Baseline was **63** ("Functional AI presence"). Expect **70+** now after the trust-signal + schema + llms.txt additions. Note the `trust_signals` and `content` sub-scores so we can target the next gap.

---

*Created 2026-06-26.*
