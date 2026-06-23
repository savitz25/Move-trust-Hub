# State Local Movers Curation Template (Texas & Beyond)

Replicate the Florida / New Jersey / New York / California / Texas model for any new state. California, Florida, New Jersey, New York, and Texas are **hand-curated** — do not run `generate-state-local-movers.ts` for them.

## Reference states (audit-complete)

| State | Counties | Rural min | Major target | Sitemap 0.85 | Audit scripts |
|-------|----------|-----------|--------------|--------------|---------------|
| California | 58/58 | 5 | 10 | 15 counties | `count-california-movers.ts`, `apply-california-mover-expansion.ts` |
| Florida | 67/67 | 5 | 8 (cap 10) | 2 counties | `count-fl-movers.ts`, `apply-fl-mover-expansion.ts` |
| New Jersey | 21/21 | 7 | 10 | 8 counties | `count-nj-movers.ts`, `apply-nj-mover-expansion.ts` |
| New York | 62/62 | 5 | 10 | 16 counties | `count-ny-movers.ts`, `apply-ny-mover-expansion.ts` |
| Texas | 254/254 | 5 | 10 (cap 10) | 16 counties | `count-texas-movers.ts`, `apply-texas-mover-expansion.ts` |

### California metro pools (`data/local-movers-seed.ts`)

- `bay-area-ca` — SF, Peninsula, South Bay, North Bay franchise slugs
- `greater-la-ca` — LA, Orange, Inland Empire, Ventura franchise slugs
- `sacramento-metro-ca` — Sacramento, Gold Country, Tahoe corridor
- `san-diego-ca` — San Diego / Imperial Valley
- `central-valley-ca` — Fresno, Stockton, Modesto corridor
- `bakersfield-metro-ca` — Kern County cluster
- `chico-metro-ca` — Butte / Chico regional
- `north-coast-ca` — Humboldt, Mendocino, Del Norte
- `northern-valley-ca` — Shasta, Tehama, Glenn, Colusa
- `sierra-rural-ca` — Alpine, Mono, Inyo, Sierra
- `central-coast-ca` — Monterey, SLO, Santa Barbara

### California major counties (10 movers each)

`alameda`, `contra-costa`, `los-angeles`, `orange`, `riverside`, `sacramento`, `san-bernardino`, `san-diego`, `san-francisco`, `san-mateo`, `santa-clara`, `ventura`

### California sitemap priority 0.85 (15 counties)

All major counties above plus `fresno`, `kern`, `marin` (Central Valley ag hub + affluent North Bay commuter market).

### New York metro pools (`data/local-movers-seed.ts`)

- `nyc-metro-ny` — NYC boroughs, Long Island, Westchester franchise slugs
- `capital-district-ny` — Albany cluster (Mabey's, Don's, Lamanna, etc.)
- `buffalo-niagara-ny` — Corrigan, Two Men Buffalo, Dan's WNY
- `rochester-finger-lakes-ny` — Rochester Moving, Hired Hands, Naglee
- `syracuse-central-ny` — Reliable Movers Syracuse, Dimon & Bacorn
- `hudson-valley-ny` — Piece of Cake/Booth per county, Triangle
- `southern-tier-ny` — Binghamton / Elmira regional
- `north-country-ny` — Watertown / Plattsburgh regional

### New York major counties (10 movers each)

`albany`, `bronx`, `erie`, `kings`, `monroe`, `nassau`, `new-york`, `niagara`, `onondaga`, `queens`, `richmond`, `suffolk`, `westchester`

### New York sitemap priority 0.85 (16 counties)

All major counties above plus `dutchess`, `orange`, `rockland` (affluent Hudson Valley commuter markets).

## File checklist (create or update per state)

| Step | File | Purpose |
|------|------|---------|
| 1 | `lib/local-movers/geography/{state}.ts` | All counties with `slug`, `seat`, `metro` region |
| 2 | `lib/local-movers/geography/index.ts` | Import counties (or overrides on generated geography for large states like TX) |
| 3 | `data/local-movers-seed.ts` | Metro pools (`{metro-id}`) + catalog mover entries |
| 4 | `data/{state}-county-research.ts` | `marketNotes`, `costs`, `tips` per county |
| 5 | `data/{state}-county-assignments.ts` | `CURATED_{STATE}_COUNTIES` ranked mover ID arrays |
| 6 | `data/{state}-county-testimonials.ts` | 3 county-specific testimonials per county |
| 7 | `lib/local-movers/{state}-nearby.ts` | Adjacent-county neighbor map for internal links |
| 8 | `lib/local-movers/county-seo.ts` | Hook research + testimonials for `stateSlug` |
| 9 | `lib/local-movers/index.ts` | Import assignments; add to `curatedAssignmentStateSlugs` |
| 10 | `components/local-movers/county-editorial-trust.tsx` | `{STATE}_COUNTY_CONTENT_UPDATED` date constant |
| 11 | `app/sitemap-local/sitemap.ts` | `lastModified` + priority counties for major metros |
| 12 | `app/(marketing)/local-movers/[stateSlug]/page.tsx` | State hub copy (5–10 movers messaging) |
| 13 | `app/(marketing)/local-movers/[stateSlug]/[countySlug]/page.tsx` | Pass `lastUpdated` to `CountyEditorialTrust` |
| 14 | `scripts/generate-state-local-movers.ts` | Add state slug to `SKIP_STATES` |
| 15 | `scripts/apply-{state}-mover-expansion.ts` | Optional one-shot expansion script |
| 16 | `scripts/count-{state}-movers.ts` | Verification script |

### Texas metro pools (`data/local-movers-seed.ts`)

- `houston-tx` — Greater Houston / Gulf Coast
- `dfw-tx` — Dallas–Fort Worth
- `austin-sa-tx` — Austin / San Antonio corridor
- `rio-grande-tx` — Rio Grande Valley / Coastal Bend
- `el-paso-tx` — El Paso / Far West Texas
- `permian-tx` — Permian Basin (Midland–Odessa)
- `panhandle-tx` — Panhandle / South Plains
- `east-tx` — East Texas / Piney Woods
- `rural-west-tx`, `rural-south-tx`, `rural-hill-country-tx`, `rural-north-tx`, `rural-panhandle-tx`, `rural-central-tx`, `rural-east-tx`, `rural-northeast-tx` — rural fallbacks

### Texas major counties (10 movers each)

`harris`, `dallas`, `tarrant`, `bexar`, `travis`, `collin`, `denton`, `fort-bend`, `el-paso`, `hidalgo`, `cameron`, `nueces`, `lubbock`, `brazoria`, `williamson`, `montgomery`, `galveston`, `bell`, `hays`, `webb`, `mclennan`, `jefferson`, `smith`, `comal`, `kaufman`, `johnson`, `ellis`, `brazos`

### Texas sitemap priority 0.85 (16 counties)

`harris`, `dallas`, `tarrant`, `bexar`, `travis`, `collin`, `denton`, `fort-bend`, `el-paso`, `hidalgo`, `cameron`, `nueces`, `lubbock`, `brazoria`, `williamson`, `montgomery`

### Texas nearby counties

Run `npx tsx scripts/generate-texas-nearby.ts` to refresh `lib/local-movers/texas-nearby.generated.ts` from Census GeoJSON adjacency.

## Texas-specific notes (reference)

1. **Geography**: 254 counties — `texas-overrides.ts` supplies seat/metro for rural counties; metro counties use `COUNTY_PRIMARY_POOL` in `apply-texas-mover-expansion.ts`.
2. **Major county target**: 10 curated movers (`MAJOR_TARGET = 10`, cap 10).
3. **Rural county target**: 5 movers minimum from metro pool fallbacks.
4. **Catalog conventions**:
   - Reuse catalog IDs for regional companies across counties
   - Location-specific slugs only for franchises (`two-men-and-a-truck-houston`)
   - Never use `regional-*` or `{state}-region-*` placeholder slugs
   - Omit USDOT when research says "Verify"

## Per-county research workflow (Grok Heavy)

For each county batch, collect:

```ts
// data/texas-county-research.ts
{
  marketNotes: '...',  // 1–2 sentences, county-specific
  costs: {
    studioRange: '$X–$Y',
    familyRange: '$X–$Y',
    avgHourly: '$X–$Y/hr for a 2-person crew',
    note: '...',
  },
  tips: ['...', '...', '...', '...', '...'],  // 5 tips
}
```

```ts
// data/texas-county-assignments.ts — ranked mover IDs (best first)
harris: ['mover-a-houston', 'mover-b-houston', ...],
```

```ts
// data/texas-county-testimonials.ts — 3 per county
harris: [
  { quote: '...', name: '...', location: 'Houston, TX', rating: 5, moveType: '...' },
  ...
],
```

## SEO / E-E-A-T parity checklist

- [ ] Unique `buildCountyTitle` / `buildCountyDescription` (market notes injected automatically via `county-seo.ts`)
- [ ] `CountyEditorialTrust` with state-specific `lastUpdated`
- [ ] `LocalMoversSchema`: LocalBusiness, Review, FAQPage (county pages)
- [ ] `CountyInternalLinks`: hub → calculator → directory + nearby counties
- [ ] Sitemap: state hub + all counties with `lastModified`
- [ ] Major metros at sitemap priority `0.85`

## Verification commands

```bash
npx tsx scripts/count-california-movers.ts
npx tsx scripts/count-fl-movers.ts
npx tsx scripts/count-nj-movers.ts
npx tsx scripts/count-ny-movers.ts
npx tsx scripts/apply-{state}-mover-expansion.ts   # if needed
```

## Commit message template

```
feat({state}): complete county curation + SEO audit

- {N}/{N} counties with research, assignments, testimonials
- Major metros expanded to 8–10 movers
- E-E-A-T, schema, sitemap, internal linking aligned with FL/NJ
```