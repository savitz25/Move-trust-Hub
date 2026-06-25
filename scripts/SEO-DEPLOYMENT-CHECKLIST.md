# SEO Deployment Checklist — Move Trust Hub

## Pre-deploy (local)

- [ ] `npm run build` — zero TypeScript/build errors
- [ ] Spot-check `/moving-to`, `/moving-to/myrtle-beach-sc`, `/moving-to/florida/miami`
- [ ] Validate JSON-LD with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Confirm no 404s on footer/nav destination links

## Git / GitHub

```bash
git add -A
git commit -m "feat(seo): destination hubs meta, schema, mega-menu, internal linking"
git push origin main
```

## Vercel

- [ ] Confirm production deploy completes (watch Vercel dashboard)
- [ ] If queue is stuck, push empty commit: `git commit --allow-empty -m "chore: trigger Vercel SEO deploy" && git push`
- [ ] Purge CDN cache for `/moving-to/*` if stale copy appears

## Google Search Console

- [ ] Submit updated sitemap: `https://www.movetrusthub.com/sitemap.xml`
- [ ] Request indexing for:
  - `/moving-to`
  - `/moving-to/myrtle-beach-sc`
  - `/moving-to/florida`
  - `/resources/routes/new-york-to-myrtle-beach`
  - `/resources/guides/moving-to-myrtle-beach-2026`
- [ ] Monitor Coverage → validate FAQ/Review rich result eligibility on city hubs

## Post-deploy verification (production)

| URL | Check |
|-----|-------|
| Homepage | New title/description in view-source |
| `/moving-to` | ItemList schema, tiered hub copy |
| `/moving-to/myrtle-beach-sc` | 12 movers schema, 3 reviews, FAQ |
| `/local-movers/south-carolina/horry` | Destination hub backlink |
| Navbar | Destinations mega-menu hover |

## Analytics (GA4: G-433BDVV8MJ)

- [ ] Add custom event `destination_hub_view` (optional follow-up)
- [ ] Monitor organic landing pages report for `/moving-to/*` growth over 14 days

## Prioritized rollout phases

1. **Phase 1 (this deploy):** Meta, schema, mega-menu, broken link fixes, route/guide pages
2. **Phase 2:** Remaining Florida cities (Jacksonville, Sarasota, Naples, etc.)
3. **Phase 3:** County→hub bidirectional links for all curated states
4. **Phase 4:** City-pair landing pages (`/from-{origin}-to-{city}`) at scale