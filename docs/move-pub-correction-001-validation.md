# MOVE-PUB-CORRECTION-001 validation

Read-only computation against Move production exports and the real county evaluator.
No database writes. Headquarters strings are not listed. Business names below are the Duval listing only.

Coverage JSON on company rows adds 0 counties beyond `company_destination_assignments` (4,044 edges, 0 extra). Service-area rows in `provider_service_area`: 0. Verified discovery and verified active state authority are included.

## Counts

| Measure | Before (main rules) | After (this branch) |
|---|---:|---:|
| County pages with qualifying businesses | 3143 | 585 |
| Indexable Premium counties | 278 | 153 |
| Indexable Standard counties | 551 | 45 |
| Unpublished companies displayed | 725 | 0 |
| Dead profile links | 463 | 0 |
| Unsupported blanket assignments counted as coverage | 2981 | 0 |
| State-only movers shown as federally authorized | 0 | 0 |
| Sitemap URLs | 880 | 249 |

Premium after the cap is 153 (cap 400). The cap changes a county only when more than 400 counties qualify as Premium. Standard is not counted against the cap.

In-state statewide seed slots removed (headquarters state matches the slot state, slot is not the headquarters county, footprint is 50 or more): 6397 across 61 mover/state pairs. Those fills stay off the listings.

Sitemap URLs added: 0. Removed: 631.

## Waterfall

Each step adds one rule to the live main path. The URL delta is versus the previous step. State hub URLs stay in every total.

| Step | Sitemap URLs | Premium | Standard | URL delta |
|---|---:|---:|---:|---:|
| 1. Live main (canary RPC, qualifying at least 3) | 880 | 278 | 551 | — |
| 2. Publication gate | 870 | 269 | 550 | -10 |
| 3. Blanket, known non-adjacent, and statewide seed fills | 182 | 104 | 27 | -688 |
| 4. Evidence joined on companies.id | 182 | 104 | 27 | 0 |
| 5. Index at one qualifying mover | 249 | 153 | 45 | 67 |
| 6. Premium cap only above 400 | 249 | 153 | 45 | 0 |

Evidence joined on `companies.id` does not change the URL count. All 4,048 assignment `company_id` values already equal `companies.id`, and those companies have no verified discovery rows. The 966 discovery rows belong to other company ids, including the canary set, where the id and the public slug differ. The loader queries `companies.id`, not the slug. Duval `a1ace-movers-inc` is company id `fl-im-1426` and is included through the canary RPC.

### Counties the cap must not downgrade

Premium qualifying counties are 153, which is under 400, so the cap does not change a tier.

| County | Tier | Score | Qualifying movers |
|---|---|---:|---:|
| florida / collier | Premium | 91 | 3 |
| florida / lake | Premium | 91 | 3 |
| florida / leon | Premium | 95 | 3 |
| florida / manatee | Premium | 91 | 3 |
| washington / clark | Premium | 95 | 8 |
| washington / king | Premium | 95 | 8 |
| washington / thurston | Premium | 95 | 8 |

### Per state

- arizona: added 0, removed 4
- california: added 0, removed 32
- colorado: added 0, removed 60
- district-of-columbia: added 0, removed 1
- florida: added 0, removed 23
- georgia: added 0, removed 146
- illinois: added 0, removed 13
- indiana: added 0, removed 3
- iowa: added 0, removed 1
- maine: added 0, removed 1
- michigan: added 0, removed 26
- minnesota: added 0, removed 2
- mississippi: added 0, removed 4
- missouri: added 0, removed 1
- new-hampshire: added 0, removed 1
- new-jersey: added 0, removed 2
- new-mexico: added 0, removed 1
- new-york: added 0, removed 10
- north-carolina: added 0, removed 3
- ohio: added 0, removed 2
- oklahoma: added 0, removed 1
- south-carolina: added 0, removed 22
- tennessee: added 0, removed 16
- texas: added 0, removed 236
- vermont: added 0, removed 1
- virginia: added 0, removed 17
- wisconsin: added 0, removed 1
- wyoming: added 0, removed 1

## Duval / Jacksonville

The city hub takes Duval first, so this is the Duval county list.

### Before

- a1ace-movers-inc (A1ACE MOVERS INC.) — publication PUBLISHABLE; headquarters county duval; evidence canary RPC
- brothers-ez-moving-of-tampa (Brothers EZ Moving of Tampa) — publication PUBLISHABLE; headquarters county hillsborough; evidence not_adjacent_to_headquarters (not counted)
- flex-moving (Flex Moving) — publication PUBLISHABLE; headquarters county hillsborough; evidence not_adjacent_to_headquarters (not counted)
- flex-moving-storage (Flex Moving & Storage) — publication PUBLISHABLE; headquarters county orange; evidence not_adjacent_to_headquarters (not counted)
- good-greek-moving-storage-of-tampa (Good Greek Moving & Storage Of Tampa) — publication PUBLISHABLE; headquarters county hillsborough; evidence not_adjacent_to_headquarters (not counted)
- razorback-moving-tampa-2 (Razorback Moving Tampa) — publication REVIEW_REQUIRED; headquarters county hillsborough; evidence blanket_owner_selection (not counted)
- solomon-sons-relocation-services (Solomon & Sons Relocation Services) — publication PUBLISHABLE; headquarters county broward; evidence blanket_owner_selection (not counted)
- amerisafe-van-lines (Amerisafe Van Lines) — publication PUBLISHABLE; headquarters county palm-beach; evidence seed catalog
- american-van-lines (American Van Lines) — publication PUBLISHABLE; headquarters county broward; evidence seed catalog

### After

- a1ace-movers-inc (A1ACE MOVERS INC.) — publication PUBLISHABLE; headquarters county duval; evidence canary RPC

## Rules applied

- Publication uses `isConsumerVisibleCompany`. `REVIEW_REQUIRED`, `INACTIVE`, `INGESTED`, and `CLASSIFIED` are excluded. Null stays visible. There is no `is_published` column.
- Headquarters county comes from the ZIP when the ZIP's state agrees with the parsed state, otherwise from the city. An unresolved in-state headquarters does not by itself drop an owner selection or seed slot under 50 counties. A known other state still does. A known non-adjacent county still does.
- Blanket threshold is 50 owner-selected counties in one state. Headquarters, discovery, and system assignment sources still count inside a blanket. State authority does not create statewide coverage. Statewide seed fills stay off the listing.
- Evidence queries use companies.id. Assignment rows that store a slug are joined through the company row.
- A county is indexable with at least one evidenced, publishable, qualifying mover. Zero stays noindex. Premium and Standard content scores are unchanged.
- The Premium cap runs only when more than 400 counties qualify. The ranking includes canary movers and the same publication filter as the page, ordered by score then state and county.
- Duval includes the published home-county canary from the read-only RPC fixture. No company is hard-coded.
