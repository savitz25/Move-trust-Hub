# Multi-Hub Deployment Guide — Move | Lender | Insurance

Host **Lender Trust Hub** and **Insurance Trust Hub** as subdirectories on `www.movetrusthub.com` while keeping Move content at the site root.

| Hub | URL prefix | Example |
|-----|------------|---------|
| Move | `/` | `/local-movers/michigan/wayne` |
| Lender | `/lender` | `/lender/local-lenders` |
| Insurance | `/insurance` | `/insurance/hubs` |

**Do not use `basePath` in Next.js config** — it would prefix every route including Move. Use App Router folders `app/lender/` and `app/insurance/` instead.

---

## Files added / changed

| File | Purpose |
|------|---------|
| `lib/hub/config.ts` | Per-hub nav, footer, metadata, logos |
| `lib/hub/paths.ts` | `hubPath()`, `getHubFromPathname()`, canonical URLs |
| `lib/hub/metadata.ts` | SEO metadata with subdirectory canonicals |
| `components/hub/hub-selector.tsx` | Move \| Lender \| Insurance tabs |
| `components/hub/hub-navbar.tsx` | Hub-aware navigation |
| `components/hub/hub-footer.tsx` | Hub footer + Trust Hub family cross-links |
| `components/hub/lender-home.tsx` | `/lender` homepage (adapted content) |
| `components/hub/insurance-home.tsx` | `/insurance` homepage (adapted content) |
| `app/lender/page.tsx` | Lender hub entry |
| `app/insurance/page.tsx` | Insurance hub entry |
| `app/lender/sitemap.ts` | `/lender/sitemap.xml` |
| `app/insurance/sitemap.ts` | `/insurance/sitemap.xml` |
| `middleware.ts` | Sets `x-trust-hub` header |
| `app/robots.ts` | Registers hub sitemaps |
| `app/sitemap.ts` | Root sitemap includes hub landing URLs |
| `next.config.ts` | Host-based redirects from standalone domains |
| `vercel.json` | Vercel redirects + hub response headers |
| `public/lender/brand/*` | Lender logos |
| `public/insurance/brand/*` | Insurance logos |

---

## Pre-deployment checklist

### 1. Local build

```bash
npm run build
```

Confirm no errors for:

- `/` (Move home)
- `/lender` (Lender home)
- `/insurance` (Insurance home)

### 2. Hub selector UX

- [ ] Tabs show **Move | Lender | Insurance** on all three homepages
- [ ] Active tab highlights correctly on `/`, `/lender`, `/insurance`
- [ ] Logo links to the current hub home (not always Move)
- [ ] Mobile menu includes hub switch links

### 3. Cross-links

- [ ] Footer **Trust Hub family** cards link to `/`, `/lender`, `/insurance`
- [ ] Lender homepage CTAs use `/lender/calculators`, `/lender/about`, etc.
- [ ] Insurance homepage CTAs use `/insurance/hubs`, `/insurance/calculators`, etc.
- [ ] Move homepage unchanged at `/`

### 4. ZIP search

- [ ] Lender ZIP on `/lender` navigates to `/lender/local-lenders?zip=#####`
- [ ] Insurance ZIP on `/insurance` navigates to `/insurance/hubs/browse?zip=#####`
- [ ] Invalid ZIP (< 5 digits) does not navigate

### 5. 404 handling

- [ ] `/lender/does-not-exist` shows lender-branded `not-found` with recovery links
- [ ] `/insurance/does-not-exist` shows insurance-branded `not-found`
- [ ] Move 404 still uses root `not-found.tsx` (if present)

### 6. SEO

- [ ] `/lender` canonical = `https://www.movetrusthub.com/lender`
- [ ] `/insurance` canonical = `https://www.movetrusthub.com/insurance`
- [ ] Open Graph `url` matches canonical
- [ ] `robots.txt` lists `/lender/sitemap.xml` and `/insurance/sitemap.xml`
- [ ] Root `sitemap.xml` includes hub landing URLs

### 7. Domain redirects (after DNS on Vercel)

Add domains in Vercel project:

- `movetrusthub.com` (primary)
- `lendertrusthub.com` → redirects to `/lender/*`
- `insurancetrusthub.com` → redirects to `/insurance/*`

Test:

```bash
curl -I https://www.lendertrusthub.com/calculators
# Expect 308 → https://www.movetrusthub.com/lender/calculators
```

---

## Vercel deployment steps

1. **Merge** multi-hub branch to `main`
2. **Deploy** to production on Vercel
3. **Add domains** (Settings → Domains):
   - `www.movetrusthub.com` (primary)
   - `lendertrusthub.com`, `www.lendertrusthub.com`
   - `insurancetrusthub.com`, `www.insurancetrusthub.com`
4. **Environment variables** — keep existing Move vars; add when syncing full apps:
   - `LENDER_SUPABASE_*` (if separate project)
   - `INSURANCE_SUPABASE_*` (if separate project)
5. **Submit sitemaps** in Google Search Console:
   - `https://www.movetrusthub.com/sitemap.xml`
   - `https://www.movetrusthub.com/lender/sitemap.xml`
   - `https://www.movetrusthub.com/insurance/sitemap.xml`
6. **Monitor** 404 rate for `/lender/*` and `/insurance/*` in Vercel Analytics

---

## Phase 2 — Full route sync

Homepages are live; inner routes (`/lender/local-lenders`, `/insurance/hubs/...`) return 404 until synced.

1. Run `npx tsx scripts/sync-trust-hub-subapps.ts` (scaffold)
2. Copy `lender-trust-hub/app/*` → `app/lender/` (exclude `layout.tsx`)
3. Copy `insurance-trust-hub/app/*` → `app/insurance/` (exclude `layout.tsx`)
4. Bulk-rewrite `href="/` → `href="/lender/` or `/insurance/`
5. Re-run build; expand `app/lender/sitemap.ts` and `app/insurance/sitemap.ts`

---

## SEO preservation notes

- **Move URLs unchanged** — no impact on existing rankings
- **Lender/Insurance** use subdirectory canonicals on `movetrusthub.com` (not separate domains after cutover)
- **301 redirects** from `lendertrusthub.com` and `insurancetrusthub.com` preserve link equity
- Title pattern: `{Page} | Lender Trust Hub • Move Trust Hub` for lender pages
- Each hub has dedicated `sitemap.xml` for crawl budget separation