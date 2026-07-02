# Phase 2 — Full Lender & Insurance Hub Migration

Complete integration of `lender-trust-hub` and `insurance-trust-hub` into `movetrusthub.com` under `/lender/*` and `/insurance/*`.

---

## 1. Recommended folder structure

```
move-trust-hub-temp/
├── app/
│   ├── layout.tsx                    # Root — HubShell (Move | Lender | Insurance)
│   ├── lender/
│   │   ├── layout.tsx                # buildHubLayoutMetadata('lender')
│   │   ├── page.tsx                  # Adapted homepage (LenderHomePage)
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts                # Dynamic — FDIC, mortgage, auto, profiles
│   │   ├── about/page.tsx
│   │   ├── calculators/page.tsx
│   │   ├── compare/
│   │   ├── fdic-insured-banks/[state]/page.tsx
│   │   ├── local-lenders/[state]/[county|cluster]/page.tsx
│   │   ├── auto-loan-companies/[state]/page.tsx
│   │   ├── lenders/[slug]/page.tsx
│   │   ├── admin/...
│   │   └── api/leads/route.ts
│   └── insurance/
│       ├── layout.tsx
│       ├── page.tsx                  # InsuranceHomePage
│       ├── not-found.tsx
│       ├── sitemap.ts                # Dynamic — 60 hubs, providers, articles
│       ├── directory/page.tsx
│       ├── providers/[slug]/page.tsx
│       ├── hubs/
│       │   ├── page.tsx
│       │   ├── browse/page.tsx       # ZIP / state browser
│       │   ├── browse/[state]/page.tsx
│       │   ├── [state]/page.tsx
│       │   ├── [state]/[slug]/page.tsx
│       │   ├── aca|medicare|health-insurance|south-florida/page.tsx
│       ├── calculators/...
│       ├── tools/...
│       ├── destinations/[state]/[city]/page.tsx
│       ├── resources/[slug]/page.tsx
│       ├── about|contact|privacy|terms/page.tsx
│       ├── admin/...
│       └── api/admin/...
├── components/
│   ├── hub/                          # Shared shell (selector, navbar, footer)
│   ├── lender/                       # Copied from lender-trust-hub/components
│   └── insurance/                    # Copied from insurance-trust-hub/components
├── lib/
│   ├── hub/                          # paths, config, metadata, wrap-metadata
│   ├── lender/                       # mortgage, fdic, calculators, mockData
│   └── insurance/                    # hubs/registry, providers, destinations
├── data/lender/                      # Content clusters (markdown)
├── public/lender/brand/
├── public/insurance/brand/
├── scripts/
│   ├── sync-trust-hub-subapps.ts     # Copy + transform from sibling repos
│   └── prefix-hub-links.ts           # Post-sync link prefix pass
└── vercel.json                       # Host redirects (belt-and-suspenders)
```

---

## 2. Migration commands (run from `move-trust-hub-temp`)

```powershell
# 1. Sync all routes, lib, components, data from sibling repos
npm run sync:hubs

# 2. Fix remaining internal href/path references
npm run sync:hubs:prefix-links

# 3. Install hub-specific dependencies
npm install

# 4. Build and verify
npm run build
npm run start
```

**Re-sync one hub only:**
```powershell
npx tsx scripts/sync-trust-hub-subapps.ts --hub lender
npx tsx scripts/sync-trust-hub-subapps.ts --hub insurance
```

**Dry run:**
```powershell
npm run sync:hubs:dry
```

---

## 3. Manual steps the sync script performs

| Step | Action |
|------|--------|
| 1 | Copy `lender-trust-hub/app/*` → `app/lender/` (skip root layout, page, not-found, sitemap) |
| 2 | Copy `insurance-trust-hub/app/*` → `app/insurance/` (same skips + robots.ts) |
| 3 | Copy `lib/`, `components/`, `hooks/`, `types/`, `data/` → `{folder}/{hub}/` |
| 4 | Rewrite `@/lib/` → `@/lib/lender/` or `@/lib/insurance/` |
| 5 | Rewrite standalone domain URLs → `movetrusthub.com/lender` or `/insurance` |
| 6 | Strip standalone Navbar/Footer imports (HubShell provides chrome) |
| 7 | `prefix-hub-links.ts` second pass for `href`, `path:`, `router.push` |

**Do NOT copy:** standalone `app/layout.tsx`, `globals.css`, favicons — root Move layout owns the shell.

**Preserve:** existing `app/lender/page.tsx` and `app/insurance/page.tsx` (adapted homepages with JSON-LD).

---

## 4. Environment variables

Add to Vercel (main Move project):

```env
# Lender (if separate Supabase project)
NEXT_PUBLIC_LENDER_SUPABASE_URL=
NEXT_PUBLIC_LENDER_SUPABASE_ANON_KEY=
LENDER_SUPABASE_SERVICE_ROLE_KEY=
LENDER_ADMIN_SECRET=

# Insurance (if separate Supabase project)
NEXT_PUBLIC_INSURANCE_SUPABASE_URL=
NEXT_PUBLIC_INSURANCE_SUPABASE_ANON_KEY=
INSURANCE_SUPABASE_SERVICE_ROLE_KEY=
INSURANCE_ADMIN_SECRET=

# Shared
NEXT_PUBLIC_GA4_ID=
```

Standalone hub env vars in copied `lib/*/supabase/` may need aliasing to hub-specific names.

---

## 5. Testing checklist

### Hub homepages
- [ ] `/` — Move homepage, Move tab active
- [ ] `/lender` — Lender logo, NMLS hero, ZIP search
- [ ] `/insurance` — Insurance logo, health hub hero, ZIP search

### ZIP search
- [ ] Lender ZIP `90210` → `/lender/local-lenders?zip=90210`
- [ ] Insurance ZIP `33101` → `/insurance/hubs/browse?zip=33101`
- [ ] Invalid ZIP (3 digits) — no navigation

### Deep routes (post-sync)
- [ ] `/insurance/hubs/browse` — 60 hub cards
- [ ] `/insurance/hubs/florida/miami-fort-lauderdale` — hub page with agents
- [ ] `/insurance/providers/[slug]` — provider profile
- [ ] `/insurance/calculators/aca-subsidy` — interactive calculator
- [ ] `/lender/calculators` — calculator hub with hash routing
- [ ] `/lender/local-lenders/florida` — state mortgage directory
- [ ] `/lender/fdic-insured-banks/california` — FDIC state page
- [ ] `/lender/lenders/[slug]` — lender profile

### Cross-hub navigation
- [ ] Hub selector switches Move | Lender | Insurance on all pages
- [ ] Footer Trust Hub family cards link correctly
- [ ] Logo links to current hub home

### 404 handling
- [ ] `/lender/does-not-exist` — lender not-found with recovery links
- [ ] `/insurance/does-not-exist` — insurance not-found

### SEO
- [ ] `/lender` canonical = `https://www.movetrusthub.com/lender`
- [ ] `/insurance/hubs/florida/miami-fort-lauderdale` canonical includes `/insurance/`
- [ ] `/robots.txt` lists hub sitemaps
- [ ] `/lender/sitemap.xml` and `/insurance/sitemap.xml` return URLs

### Domain redirects (standalone Vercel projects)
```powershell
curl.exe -sI https://www.insurancetrusthub.com/calculators
curl.exe -sI https://www.lendertrusthub.com/calculators
```
Expected: `308` → `movetrusthub.com/insurance/...` or `/lender/...`

### Mobile
- [ ] Hub selector visible on mobile
- [ ] Mobile nav includes hub switch links
- [ ] Calculator and directory pages responsive

---

## 6. Local dev commands

```powershell
cd C:\Users\Michael.Savitsky\move-trust-hub-temp
$env:PATH = ".\.node-portable;$env:PATH"
npm run dev
# Visit http://localhost:3000/lender
# Visit http://localhost:3000/insurance/hubs/browse
```

## 7. Deploy to Vercel

```powershell
git add -A
git commit -m "feat: Phase 2 lender + insurance full route migration"
git push origin main
```

Vercel auto-deploys `savitz25/Move-trust-Hub`. Submit sitemaps in GSC:
- `https://www.movetrusthub.com/sitemap.xml`
- `https://www.movetrusthub.com/lender/sitemap.xml`
- `https://www.movetrusthub.com/insurance/sitemap.xml`

---

## 8. Post-migration recommendations

1. **Analytics** — tag hub in GA4 events: `hub: move|lender|insurance` from `x-trust-hub` header or pathname.
2. **Cross-promotion** — optional banners on Move county pages linking to `/lender/local-lenders` and `/insurance/hubs/browse`.
3. **Legal pages** — wire `hubPath(hub, '/privacy-policy')` to hub-specific `/privacy` and `/terms` or shared Move legal with hub metadata.
4. **Admin routes** — `/lender/admin` and `/insurance/admin` work but should be `noindex` and env-gated in production.
5. **Re-sync workflow** — when sibling repos update, re-run `npm run sync:hubs` then `npm run sync:hubs:prefix-links`; resolve conflicts in `app/*/page.tsx` (homepages) manually.