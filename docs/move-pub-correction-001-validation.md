# MOVE-PUB-CORRECTION-001 validation

This inventory is the shipped loader. `evaluatePublishedStateCounties` is the function `app/sitemap-local/sitemap.ts` calls. It uses `getMoversForCountyAsync`, `listedCountyMovers` inside the quality score, and `publishedCountyIndexDecision`. No second mover list is built here. No database writes.

Source modes in this run: degraded 3143.

## Counts from this run

| Measure | This run |
|---|---:|
| Scored counties | 3143 |
| Premium | 0 |
| Standard | 20 |
| Development / noindex | 3123 |
| Indexable county pages | 20 |
| Sitemap URLs, including 51 state hubs | 71 |

## Comparison with C3 at c8c0d61a

C3's credentialed run, before the hidden-card score fix: Premium 88, Standard 76, sitemap URLs 215, Development 2,979. Versus live #243 that was 0 added and 665 removed (880 to 215). Versus 4d7871ec, C3 counted 65 Premium to Standard and 35 Standard to noindex.

This process has no Supabase client, and `unstable_cache` cannot run here, so every county is `degraded`: approved movers and canaries are absent, and the Premium allowance fails closed. That is why this table shows Premium 0, Standard 20, and 71 sitemap URLs, and why Duval is noindex here. It is not a second mover builder. C3's credentialed path at c8c0d61a is the comparable inventory: Premium 88, Standard 76, 215 URLs.

The only scoring change since that run is that mover points use `listedCountyMovers`. C3 measured that this drops Morris, NJ and Williamson, TX from Premium 71 to Standard 66, and does not change the tier of the other 25 counties whose hidden cards were inflating points. A credentialed rerun is therefore Premium 86, Standard 78, Development 2,979, and sitemap URLs still 215. State directory links on that path are the 18 New Jersey counties and 44 Florida counties C3 listed, because the state page now calls the same function as the sitemap. Salem stays unlinked. The 23 Florida noindex counties stay unlinked.

## Named counties in this run

| County | Tier | Score | Reason | Listed movers | Source |
|---|---|---:|---|---:|---|
| new-jersey / morris | noindex | 52 | no_listed_movers | 0 | degraded |
| texas / williamson | noindex | 51 | no_qualifying_publishable_movers | 0 | degraded |
| florida / duval | noindex | 56 | no_listed_movers | 0 | degraded |
| florida / collier | noindex | 56 | no_listed_movers | 0 | degraded |
| florida / lake | noindex | 56 | no_listed_movers | 0 | degraded |
| florida / leon | Standard | 71 | premium_cap_fallback_standard | 1 | degraded |
| florida / manatee | noindex | 56 | no_listed_movers | 0 | degraded |
| washington / clark | noindex | 56 | no_listed_movers | 0 | degraded |
| washington / king | noindex | 56 | no_listed_movers | 0 | degraded |
| washington / thurston | noindex | 56 | no_listed_movers | 0 | degraded |

Duval is eligible when this table shows it indexable. At c8c0d61a with the canary path it was Premium 71 with only a1ace-movers-inc listed. This score change does not remove that one listed mover.

## State directory links in this run

New Jersey indexable counties (0): none.

Florida indexable counties (3): broward, leon, palm-beach.

Florida noindex counties (64): alachua, baker, bay, bradford, brevard, calhoun, charlotte, citrus, clay, collier, columbia, desoto, dixie, duval, escambia, flagler, franklin, gadsden, gilchrist, glades, gulf, hamilton, hardee, hendry, hernando, highlands, hillsborough, holmes, indian-river, jackson, jefferson, lafayette, lake, lee, levy, liberty, madison, manatee, marion, martin, miami-dade, monroe, nassau, okaloosa, okeechobee, orange, osceola, pasco, pinellas, polk, putnam, santa-rosa, sarasota, seminole, st-johns, st-lucie, sumter, suwannee, taylor, union, volusia, wakulla, walton, washington.

These sets are the sitemap decision. The state page renders `getPublishedIndexableCounties`, which filters the same function. The guard does not hardcode 21, 67, 18, or 44.

## Indexable county URLs in this run

- /local-movers/florida/broward
- /local-movers/florida/leon
- /local-movers/florida/palm-beach
- /local-movers/indiana/marion
- /local-movers/massachusetts/barnstable
- /local-movers/massachusetts/bristol
- /local-movers/massachusetts/essex
- /local-movers/massachusetts/hampden
- /local-movers/massachusetts/hampshire
- /local-movers/massachusetts/middlesex
- /local-movers/massachusetts/norfolk
- /local-movers/massachusetts/plymouth
- /local-movers/massachusetts/suffolk
- /local-movers/massachusetts/worcester
- /local-movers/rhode-island/bristol
- /local-movers/rhode-island/kent
- /local-movers/rhode-island/newport
- /local-movers/rhode-island/providence
- /local-movers/rhode-island/washington
- /local-movers/texas/tarrant
