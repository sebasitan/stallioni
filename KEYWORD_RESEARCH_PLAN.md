# Keyword Research Plan — Stallioni

> Goal: find the best keywords to target **before** writing more pages, so every
> new article/section is aimed at real demand we can realistically rank for.
> You run the numbers in Google Keyword Planner; this doc tells you exactly what
> to enter, how to read it, and how to decide.

---

## 1. The 4 keyword buckets for this site

Every keyword we care about falls into one of these. Treat them differently —
they have different intent, competition, and pages.

| Bucket | Intent | Example | Lands on |
|---|---|---|---|
| **A. Service / hire** (core revenue) | Buyer — wants to hire | "hire dedicated laravel developers" | service + regional pages |
| **B. Local** | Buyer, geo-specific | "web development company in coimbatore" | /it-outsourcing/coimbatore, services |
| **C. Affiliate / comparison** | Buyer, researching tools | "cloudways vs kinsta" | /resources/ articles |
| **D. Informational** (top-of-funnel) | Learning, builds E-E-A-T | "how much does it cost to outsource development" | blog / resources |

**Where the money is:** Bucket A (service leads) and Bucket C (affiliate). Bucket
B is high-conversion but low-volume. Bucket D feeds the others and gets AI citations.

---

## ⭐ The BEST method — mine your own Search Console data (do this FIRST)

Keyword Planner *estimates* demand for keywords you might chase. Your **Search
Console shows keywords you ALREADY rank for** — real data for your real site.
For an indexed site like yours, this is the highest-ROI method by a mile, because
improving a keyword you already rank for is far easier than ranking a new one.

### The "striking distance" play (fastest wins on the whole list)
1. GSC → **Performance** → **Search results**.
2. Date range: **Last 3 months**. Turn on **Average position** + **Total impressions**.
3. Open the **Queries** tab. Add filter **Position → between 5 and 20**. Sort by **Impressions** (high → low).
4. These are keywords where you sit on page 1–2 but not at the top — proven demand, you are *this close*. Pushing #8 → #3 beats ranking a brand-new term.
5. Export → send me the list. For each, I optimize the existing page (title, H1, headings, FAQ, internal links) to climb — usually no new page needed.

### Also mine from GSC (free, fast)
- **High impressions + low CTR** → page ranks but the title/meta is weak. A 5-minute rewrite gets more clicks with zero new content.
- **Queries hitting the wrong page** → you rank for a term with a weak page; we build/strengthen the right one.
- **Queries with impressions but position 20–50** → near-misses worth a content push.

> Use this GSC method for **optimizing what you have**, and Keyword Planner below
> for **discovering NEW topics** you do not rank for yet. Together they cover both.

### Other strong methods (in rough order of power)
| Method | Strength | Cost |
|---|---|---|
| **GSC striking-distance** (above) | Real data, fastest wins | Free (you have it) |
| **Semrush / Ahrefs** (real KD + competitor gap) | Best difficulty data + steal competitors' keywords | Paid (you may have Semrush) |
| **Google Keyword Planner** (§ below) | Good volume + new-topic discovery | Free |
| **Free SERP signals** — autocomplete, "People Also Ask", "Related searches", AnswerThePublic, AlsoAsked | Real intent + question keywords | Free |

> I can also run **live SERP research for you right now** (autocomplete, People-Also-Ask,
> who-ranks analysis) without any tool — just say the word and name a topic.

---

## 2. How to use Google Keyword Planner (step-by-step)

1. Go to **ads.google.com** → top-right **Tools** (wrench icon) → **Planning** → **Keyword Planner**.
2. Two modes — use both:
   - **"Discover new keywords"** → paste 5–10 seed keywords (lists in §3) OR enter a competitor URL to harvest their keywords. Use the **"Start with a website"** option with a competitor domain to mine ideas.
   - **"Get search volume and forecasts"** → paste a finished keyword list to get exact volumes for them.
3. **Set location + language correctly** (top of results) — this is critical:
   - Bucket A/C/D service & affiliate keywords → target **United States** (also re-run for **United Kingdom**, **Australia**). That is where your buyers search.
   - Bucket B local keywords → target **India** (or Tamil Nadu / Coimbatore).
   - Language: **English**.
4. Read the columns:
   - **Avg. monthly searches** — demand. (Shows a range like 1K–10K unless you run ads; ranges are fine for ranking decisions.)
   - **Competition (Low/Med/High)** — ⚠️ this is **AD** competition, **NOT** SEO difficulty. Do not treat it as how hard it is to rank.
   - **Top of page bid (low/high)** — best proxy for **commercial value**. A high bid = advertisers pay a lot = the keyword converts to money. Great signal for affiliate/service keywords.
5. **Download** results to CSV (download icon) and drop the numbers into the table in §6.

### Caveats to remember
- Keyword Planner shows **ad competition**, not organic difficulty. To judge how hard a keyword is to rank for, **Google the term and look at who ranks** (big brands on page 1 = hard; forums/thin sites = easy). If you have Semrush/Ahrefs access, use their **KD (Keyword Difficulty)** score instead.
- Exact volumes need a running ad campaign; the **ranges are enough** to prioritize.
- Prefer **specific long-tail** terms ("hire dedicated woocommerce developers india") over **head terms** ("web development") — lower volume but far higher intent and far easier to rank with our domain authority.

---

## 3. Seed keywords to paste into Keyword Planner

Copy each block into "Discover new keywords" (Planner will expand each into dozens
of related ideas). Run service blocks against **US/UK/AU**, local against **India**.

### Bucket A — Service / hire (target US, UK, AU)
```
hire dedicated developers
offshore software development company
it outsourcing services
hire remote developers india
wordpress development services
woocommerce development agency
shopify development company
laravel development services
hire react developers
mobile app development company india
custom software development outsourcing
white label web development agency
```

### Bucket B — Local (target India / Coimbatore)
```
it company in coimbatore
web development company coimbatore
software development company coimbatore
shopify development company coimbatore
website maintenance company coimbatore
```

### Bucket C — Affiliate / comparison (target US, UK)
```
best woocommerce hosting
best wordpress hosting
managed wordpress hosting
cloudways vs kinsta
kinsta vs wp engine
best shopify alternatives
shopify vs woocommerce
best seo tools for agencies
```

### Bucket D — Informational / top-of-funnel (target US, UK)
```
how much does it cost to outsource software development
offshore vs onshore development
how to hire a development team
in house vs outsourcing development
benefits of outsourcing to india
```

> Also try Planner's **"Start with a website"** with a competitor like
> `bairesdev.com`, `toptal.com`, or `kinsta.com/blog` to harvest keywords they
> already rank for.

---

## 4. How to pick the winners (scoring)

For each keyword, score it and compute a simple priority:

```
Priority = Intent (1–3)  ×  Volume tier (1–3)   −   Difficulty (1–3)
```

- **Intent:** 3 = ready to buy/hire ("hire…", "best…", "company"), 2 = comparing, 1 = learning.
- **Volume tier:** 3 = 1K+/mo, 2 = 200–1K, 1 = <200.
- **Difficulty:** 3 = big brands dominate page 1, 2 = mixed, 1 = weak/forum results.

**Target the sweet spot:** Intent 3, Volume 2–3, Difficulty 1–2. A keyword with
500 searches you can rank #1 for beats one with 10,000 you will never crack.

---

## 5. My pre-analysis picks (validate these in Planner first)

Based on the business + current content, these are the most likely winners.
Confirm volume/competition before committing — but start here:

| Keyword | Bucket | Why | Likely action |
|---|---|---|---|
| `hire dedicated woocommerce developers` | A | High intent, niche, matches a top service | Strengthen woocommerce-development page |
| `hire laravel developers india` | A | High intent, you already have the page (was unindexed) | Boost laravel-development |
| `best woocommerce hosting` | C | Article already live — verify it can rank | Optimize existing article |
| `cloudways vs kinsta` | C | New article targets it; lower competition than "best hosting" | Already covered ✅ |
| `best wordpress hosting 2026` | C | Broad, monetizes all hosting affiliates | Candidate next article |
| `it company in coimbatore` | B | Low competition, high local intent | /coimbatore page (already targeting) |
| `how much does it cost to outsource development` | D | AI-Overview + featured-snippet bait | New blog/FAQ-style article |
| `best shopify alternatives` | C | Monetizes live Shopify affiliate | Candidate next article |
| `offshore software development company` | A | Head term, high value but harder | Long-term, support with content |

---

## 6. Recording template (fill from Planner CSV)

| Keyword | Bucket | Avg searches (US) | Top bid (high) | Competition | SEO difficulty (you check SERP) | Intent | Priority | Decision |
|---|---|---|---|---|---|---|---|---|
| | | | | | | | | |
| | | | | | | | | |

> Fill one row per keyword. Sort by **Priority** descending → that ranked list is
> your content roadmap.

---

## 7. Process — what to do, in order

1. Run the §3 seed lists through Keyword Planner (right geo per bucket).
2. Export each to CSV, dump the candidates into the §6 table.
3. For the top ~20, **check the live SERP** to set real SEO difficulty.
4. Score with the §4 formula; sort by Priority.
5. Send me the top 10 (or the CSV) → I map each to a new/updated page and write the content **targeting the confirmed keyword** (title, H1, headings, FAQ, internal links).

---

## 8. What I need back from you

Either:
- The **exported CSV(s)** from Keyword Planner, or
- A filled-in §6 table with the top 10–15 keywords + their volumes.

Then I turn the winners into pages. No website changes until then.

---

*Created 2026-06-27.*
