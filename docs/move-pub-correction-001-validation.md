# MOVE-PUB-CORRECTION-001 validation

Read-only computation against Move production exports and the real county evaluator.
No database writes. Headquarters strings are not listed. Business names below are the Duval listing only.

Coverage JSON on company rows adds 0 counties beyond `company_destination_assignments` (4,044 edges, 0 extra). Service-area rows in `provider_service_area`: 0. Verified discovery and verified active state authority are included.

## Counts

Live #243 is the main publication path, including the canary home-county RPC, with the historical catalog quality score. 4d7871ec is the measurement at that commit. The new head is this correction.

| Measure | Live #243 | 4d7871ec | New head |
|---|---:|---:|---:|
| County pages with qualifying businesses | 3143 | 585 | 604 |
| Indexable Premium counties | 278 | 153 | 120 |
| Indexable Standard counties | 551 | 45 | 68 |
| Development / noindex counties | 2314 | 2945 | 2955 |
| Indexable county pages | 829 | 198 | 188 |
| Unpublished companies displayed | 725 | 0 | 0 |
| Dead profile links | 463 | 0 | 0 |
| Unsupported blanket assignments counted as coverage | 2982 | 0 | 0 |
| State-only movers shown as federally authorized | 0 | 0 | 0 |
| Sitemap URLs | 880 | 249 | 239 |

Development counts are county pages that are not Premium or Standard. There are 3,143 scored counties. State hub URLs are in the sitemap total and are not a county tier.

Premium after the cap is 120 (cap 400). The cap changes a county only when more than 400 counties qualify as Premium. Standard is not counted against the cap.

In-state statewide seed slots removed (headquarters state matches the slot state, slot is not the headquarters county, footprint is 50 or more): 6702 across 63 mover/state pairs. Those fills stay off the listings.

Sitemap URLs added: 0. Removed: 641.

## Waterfall

Each step adds one rule to the live main path. The URL delta is versus the previous step. State hub URLs stay in every total.

| Step | Sitemap URLs | Premium | Standard | URL delta |
|---|---:|---:|---:|---:|
| 1. Live main (canary RPC, qualifying at least 3) | 880 | 278 | 551 | — |
| 2. Publication gate | 870 | 269 | 550 | -10 |
| 3. Blanket, known non-adjacent, and statewide seed fills | 181 | 97 | 33 | -689 |
| 4. Evidence joined on companies.id | 181 | 97 | 33 | 0 |
| 5. Index at one qualifying mover | 239 | 120 | 68 | 58 |
| 6. Premium cap only above 400 | 239 | 120 | 68 | 0 |

Evidence joined on `companies.id` does not change the URL count. All 4,048 assignment `company_id` values already equal `companies.id`, and those companies have no verified discovery rows. The 966 discovery rows belong to other company ids, including the canary set, where the id and the public slug differ. The loader queries `companies.id`, not the slug. Duval `a1ace-movers-inc` is company id `fl-im-1426` and is included through the canary RPC.

### Counties the cap must not downgrade

Premium qualifying counties are 120, which is under 400, so the cap does not change a tier.

| County | Tier | Score | Qualifying movers |
|---|---|---:|---:|
| florida / collier | Premium | 76 | 3 |
| florida / lake | Premium | 76 | 3 |
| florida / leon | Premium | 80 | 3 |
| florida / manatee | Premium | 76 | 3 |
| washington / clark | Premium | 93 | 8 |
| washington / king | Premium | 93 | 8 |
| washington / thurston | Premium | 93 | 8 |

## Mover-dependent score changes

Inventory points now use the movers on the page. The raw catalog assignment count is not a score input and is not a three-mover gate. `countExplicitCountyMovers` remains available for audits. `minExplicitMovers` is no longer a hard block. Research, citation, regulatory context, utility, and county content are unchanged.

The measured change from 4d7871ec is 249 sitemap URLs to 239, Premium 153 to 120, and Standard 45 to 68. That is 10 fewer county URLs, not the roughly 215-URL loss in the earlier estimate. The estimate counted counties whose catalog score looked indexable but that already had no qualifying mover on the page, so they were not in the sitemap. The band rows below are only counties that still have a qualifying mover. A Premium to Standard row stays in the sitemap. A Standard to noindex row is a real removal, and only when that county was actually Standard at 4d7871ec. The band math can mark a county Standard that 4d7871ec already kept noindex for a research or citation block. The count table is the published result.

- Premium → Standard: 34
- Premium → noindex: 0
- Standard → noindex: 38
- Other tier changes: 27

- california/el-dorado: Premium → Standard; catalog assignments 23, shown 1, qualifying 1; score 61
- california/kern: Premium → Standard; catalog assignments 25, shown 1, qualifying 1; score 67
- california/kings: Standard → noindex; catalog assignments 23, shown 1, qualifying 1; score 43
- california/madera: Premium → Standard; catalog assignments 24, shown 1, qualifying 1; score 61
- california/marin: Premium → Standard; catalog assignments 27, shown 1, qualifying 1; score 61
- california/napa: Premium → Standard; catalog assignments 25, shown 1, qualifying 1; score 61
- california/placer: Premium → Standard; catalog assignments 26, shown 3, qualifying 3; score 66
- california/san-mateo: Premium → Standard; catalog assignments 26, shown 1, qualifying 1; score 61
- california/santa-barbara: Premium → Standard; catalog assignments 25, shown 2, qualifying 2; score 67
- california/sonoma: Premium → Standard; catalog assignments 25, shown 1, qualifying 1; score 67
- california/stanislaus: Premium → Standard; catalog assignments 25, shown 5, qualifying 5; score 63
- california/tuolumne: Standard → noindex; catalog assignments 24, shown 2, qualifying 2; score 43
- new-jersey/hudson: Premium → Standard; catalog assignments 21, shown 11, qualifying 11; score 69
- new-jersey/union: Premium → Standard; catalog assignments 21, shown 9, qualifying 9; score 65
- new-york/columbia: Premium → Standard; catalog assignments 21, shown 3, qualifying 3; score 61
- new-york/richmond: Premium → Standard; catalog assignments 27, shown 3, qualifying 3; score 66
- new-york/saratoga: Premium → Standard; catalog assignments 21, shown 3, qualifying 3; score 66
- new-york/schenectady: Premium → Standard; catalog assignments 23, shown 3, qualifying 3; score 66
- arizona/pima: Standard → noindex; catalog assignments 21, shown 9, qualifying 9; score 68
- arizona/pinal: Standard → noindex; catalog assignments 21, shown 10, qualifying 10; score 74
- arizona/yavapai: Standard → noindex; catalog assignments 21, shown 9, qualifying 9; score 64
- georgia/appling: Standard → noindex; catalog assignments 23, shown 1, qualifying 1; score 36
- georgia/bibb: Premium → Standard; catalog assignments 23, shown 1, qualifying 1; score 67
- georgia/chatham: Premium → Standard; catalog assignments 23, shown 2, qualifying 2; score 67
- georgia/cherokee: Premium → Standard; catalog assignments 23, shown 1, qualifying 1; score 61
- georgia/clarke: Premium → Standard; catalog assignments 23, shown 2, qualifying 2; score 67
- georgia/forsyth: Premium → Standard; catalog assignments 23, shown 1, qualifying 1; score 67
- georgia/gwinnett: Premium → Standard; catalog assignments 23, shown 2, qualifying 2; score 65
- georgia/hall: Premium → Standard; catalog assignments 23, shown 1, qualifying 1; score 61
- georgia/henry: Premium → Standard; catalog assignments 23, shown 1, qualifying 1; score 61
- georgia/jackson: Standard → noindex; catalog assignments 23, shown 1, qualifying 1; score 36
- georgia/lumpkin: Standard → noindex; catalog assignments 23, shown 1, qualifying 1; score 36
- indiana/allen: Standard → noindex; catalog assignments 21, shown 2, qualifying 2; score 51
- indiana/vanderburgh: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 51
- iowa/adair: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/audubon: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/clayton: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/decatur: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/emmet: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/humboldt: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/ida: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/lucas: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/monona: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/osceola: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/palo-alto: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/ringgold: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/sac: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/story: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 36
- iowa/tama: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/van-buren: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- iowa/worth: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 9
- massachusetts/franklin: Development → noindex; catalog assignments 21, shown 6, qualifying 6; score 35
- michigan/saginaw: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 57
- new-mexico/sandoval: Standard → noindex; catalog assignments 23, shown 7, qualifying 7; score 61
- ohio/lake: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 42
- oklahoma/oklahoma: Premium → Standard; catalog assignments 21, shown 1, qualifying 1; score 66
- oregon/douglas: Development → noindex; catalog assignments 21, shown 6, qualifying 6; score 35
- oregon/jackson: Standard → noindex; catalog assignments 21, shown 6, qualifying 6; score 55
- oregon/lane: Standard → noindex; catalog assignments 21, shown 6, qualifying 6; score 55
- tennessee/anderson: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 48
- tennessee/blount: Premium → Standard; catalog assignments 21, shown 2, qualifying 2; score 56
- tennessee/cheatham: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 22
- tennessee/cocke: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 36
- tennessee/grainger: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 22
- tennessee/hamblen: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 42
- tennessee/hamilton: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 58
- tennessee/jefferson: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 22
- tennessee/knox: Standard → noindex; catalog assignments 21, shown 4, qualifying 4; score 67
- tennessee/loudon: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 22
- tennessee/robertson: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 42
- tennessee/rutherford: Standard → noindex; catalog assignments 21, shown 6, qualifying 6; score 64
- tennessee/sevier: Premium → Standard; catalog assignments 21, shown 2, qualifying 2; score 62
- tennessee/shelby: Standard → noindex; catalog assignments 21, shown 3, qualifying 3; score 67
- tennessee/sumner: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 48
- tennessee/union: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 22
- tennessee/williamson: Standard → noindex; catalog assignments 21, shown 3, qualifying 3; score 57
- tennessee/wilson: Standard → noindex; catalog assignments 21, shown 3, qualifying 3; score 59
- texas/bell: Premium → Standard; catalog assignments 25, shown 2, qualifying 2; score 60
- texas/brazoria: Premium → Standard; catalog assignments 24, shown 1, qualifying 1; score 60
- texas/chambers: Standard → noindex; catalog assignments 26, shown 1, qualifying 1; score 36
- texas/el-paso: Premium → Standard; catalog assignments 26, shown 2, qualifying 2; score 66
- texas/galveston: Premium → Standard; catalog assignments 26, shown 1, qualifying 1; score 60
- texas/liberty: Standard → noindex; catalog assignments 24, shown 1, qualifying 1; score 36
- texas/lubbock: Premium → Standard; catalog assignments 25, shown 2, qualifying 2; score 62
- texas/lynn: Standard → noindex; catalog assignments 23, shown 1, qualifying 1; score 36
- texas/rockwall: Standard → noindex; catalog assignments 22, shown 1, qualifying 1; score 36
- virginia/bedford-city: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 25
- virginia/fairfax-city: Standard → noindex; catalog assignments 21, shown 1, qualifying 1; score 46
- virginia/franklin-city: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 25
- virginia/richmond-county: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 25
- virginia/richmond: Premium → Standard; catalog assignments 21, shown 1, qualifying 1; score 68
- virginia/roanoke-county: Development → noindex; catalog assignments 21, shown 1, qualifying 1; score 25
- virginia/roanoke: Premium → Standard; catalog assignments 21, shown 1, qualifying 1; score 64
- washington/douglas: Standard → noindex; catalog assignments 21, shown 6, qualifying 6; score 41
- washington/franklin: Standard → noindex; catalog assignments 21, shown 6, qualifying 6; score 61
- washington/grant: Standard → noindex; catalog assignments 21, shown 6, qualifying 6; score 61
- washington/island: Standard → noindex; catalog assignments 21, shown 6, qualifying 6; score 61
- washington/klickitat: Standard → noindex; catalog assignments 21, shown 6, qualifying 6; score 41
- washington/skagit: Standard → noindex; catalog assignments 21, shown 6, qualifying 6; score 61

These rows are counties whose catalog assignment count was higher than the evidenced, publishable list. Hidden, inactive, review-required, blanket, and statewide fill-ins no longer add inventory points. A county that still has one qualifying mover and still meets the Premium or Standard score stays in that tier. No separate three-mover minimum is applied.

A page is incorrectly suppressed only if it still shows at least one evidenced qualifying mover, still meets the research and citation standards, and still clears the score floor after the shown-mover inventory. The rows that fall to noindex are below that floor once the catalog fill-ins are removed. Verified state operating authority does not put a company on a non-adjacent county, and state-only movers are still not labeled as federally authorized.

## Street numbers read as ZIPs

Seven catalog records had a 5-digit street number and no state. The previous ZIP rule treated that number as a ZCTA and invented a headquarters county. A ZIP is now accepted only immediately after a state code. The headquarters stays unresolved, so an in-state slot under 50 counties is not dropped for that reason. 23 seed slots change inclusion. No street address is listed.

| Business | Before county resolution | After |
|---|---|---|
| Firefighting's Finest Moving & Storage | Prince William County, Virginia | unresolved |
| express moving (58-county record) | Baltimore County, Maryland | unresolved |
| Red Rover Moving & Storage | Delaware County, New York | unresolved |
| Bull Moving | Albany County, New York | unresolved |
| Northstar Moving Company | Montgomery County, Pennsylvania | unresolved |
| express moving (2-county record) | Baltimore County, Maryland | unresolved |
| Studio City Movers | Suffolk County, New York | unresolved |

The 23 slots whose include/exclude changed are Red Rover (12), Bull Moving (5), Northstar (3), the smaller express moving record (2), and Studio City Movers (1). The two larger records were already excluded by the 50-county statewide rule, so their invented county did not keep extra slots.

## Sitemap URL changes versus live main

Added (0):

- none

Removed (641):

- /local-movers/arizona/coconino
- /local-movers/arizona/greenlee
- /local-movers/arizona/mohave
- /local-movers/arizona/yuma
- /local-movers/california/alpine
- /local-movers/california/amador
- /local-movers/california/butte
- /local-movers/california/calaveras
- /local-movers/california/colusa
- /local-movers/california/del-norte
- /local-movers/california/glenn
- /local-movers/california/humboldt
- /local-movers/california/imperial
- /local-movers/california/inyo
- /local-movers/california/kings
- /local-movers/california/lake
- /local-movers/california/lassen
- /local-movers/california/mariposa
- /local-movers/california/mendocino
- /local-movers/california/merced
- /local-movers/california/modoc
- /local-movers/california/mono
- /local-movers/california/nevada
- /local-movers/california/plumas
- /local-movers/california/san-benito
- /local-movers/california/san-luis-obispo
- /local-movers/california/santa-cruz
- /local-movers/california/shasta
- /local-movers/california/sierra
- /local-movers/california/siskiyou
- /local-movers/california/solano
- /local-movers/california/sutter
- /local-movers/california/tehama
- /local-movers/california/trinity
- /local-movers/california/tulare
- /local-movers/california/tuolumne
- /local-movers/california/yolo
- /local-movers/california/yuba
- /local-movers/colorado/adams
- /local-movers/colorado/alamosa
- /local-movers/colorado/arapahoe
- /local-movers/colorado/archuleta
- /local-movers/colorado/baca
- /local-movers/colorado/bent
- /local-movers/colorado/boulder
- /local-movers/colorado/chaffee
- /local-movers/colorado/cheyenne
- /local-movers/colorado/clear-creek
- /local-movers/colorado/conejos
- /local-movers/colorado/costilla
- /local-movers/colorado/crowley
- /local-movers/colorado/custer
- /local-movers/colorado/delta
- /local-movers/colorado/denver
- /local-movers/colorado/dolores
- /local-movers/colorado/douglas
- /local-movers/colorado/eagle
- /local-movers/colorado/el-paso
- /local-movers/colorado/elbert
- /local-movers/colorado/fremont
- /local-movers/colorado/garfield
- /local-movers/colorado/gilpin
- /local-movers/colorado/grand
- /local-movers/colorado/gunnison
- /local-movers/colorado/hinsdale
- /local-movers/colorado/huerfano
- /local-movers/colorado/jackson
- /local-movers/colorado/jefferson
- /local-movers/colorado/kiowa
- /local-movers/colorado/kit-carson
- /local-movers/colorado/la-plata
- /local-movers/colorado/lake
- /local-movers/colorado/larimer
- /local-movers/colorado/las-animas
- /local-movers/colorado/lincoln
- /local-movers/colorado/logan
- /local-movers/colorado/mineral
- /local-movers/colorado/moffat
- /local-movers/colorado/morgan
- /local-movers/colorado/otero
- /local-movers/colorado/ouray
- /local-movers/colorado/park
- /local-movers/colorado/phillips
- /local-movers/colorado/pitkin
- /local-movers/colorado/prowers
- /local-movers/colorado/pueblo
- /local-movers/colorado/rio-blanco
- /local-movers/colorado/rio-grande
- /local-movers/colorado/routt
- /local-movers/colorado/saguache
- /local-movers/colorado/san-juan
- /local-movers/colorado/san-miguel
- /local-movers/colorado/sedgwick
- /local-movers/colorado/summit
- /local-movers/colorado/teller
- /local-movers/colorado/washington
- /local-movers/colorado/weld
- /local-movers/colorado/yuma
- /local-movers/district-of-columbia/district-of-columbia
- /local-movers/florida/baker
- /local-movers/florida/bradford
- /local-movers/florida/calhoun
- /local-movers/florida/dixie
- /local-movers/florida/franklin
- /local-movers/florida/gadsden
- /local-movers/florida/gilchrist
- /local-movers/florida/glades
- /local-movers/florida/gulf
- /local-movers/florida/hamilton
- /local-movers/florida/hardee
- /local-movers/florida/holmes
- /local-movers/florida/jackson
- /local-movers/florida/jefferson
- /local-movers/florida/lafayette
- /local-movers/florida/levy
- /local-movers/florida/liberty
- /local-movers/florida/madison
- /local-movers/florida/okeechobee
- /local-movers/florida/suwannee
- /local-movers/florida/union
- /local-movers/florida/wakulla
- /local-movers/florida/washington
- /local-movers/georgia/appling
- /local-movers/georgia/atkinson
- /local-movers/georgia/bacon
- /local-movers/georgia/baker
- /local-movers/georgia/baldwin
- /local-movers/georgia/banks
- /local-movers/georgia/barrow
- /local-movers/georgia/bartow
- /local-movers/georgia/ben-hill
- /local-movers/georgia/berrien
- /local-movers/georgia/bleckley
- /local-movers/georgia/brantley
- /local-movers/georgia/brooks
- /local-movers/georgia/bryan
- /local-movers/georgia/bulloch
- /local-movers/georgia/burke
- /local-movers/georgia/butts
- /local-movers/georgia/calhoun
- /local-movers/georgia/camden
- /local-movers/georgia/candler
- /local-movers/georgia/carroll
- /local-movers/georgia/catoosa
- /local-movers/georgia/charlton
- /local-movers/georgia/chattahoochee
- /local-movers/georgia/chattooga
- /local-movers/georgia/clay
- /local-movers/georgia/clayton
- /local-movers/georgia/clinch
- /local-movers/georgia/coffee
- /local-movers/georgia/colquitt
- /local-movers/georgia/columbia
- /local-movers/georgia/cook
- /local-movers/georgia/coweta
- /local-movers/georgia/crawford
- /local-movers/georgia/crisp
- /local-movers/georgia/dade
- /local-movers/georgia/dawson
- /local-movers/georgia/decatur
- /local-movers/georgia/dodge
- /local-movers/georgia/dooly
- /local-movers/georgia/dougherty
- /local-movers/georgia/douglas
- /local-movers/georgia/early
- /local-movers/georgia/echols
- /local-movers/georgia/effingham
- /local-movers/georgia/elbert
- /local-movers/georgia/emanuel
- /local-movers/georgia/evans
- /local-movers/georgia/fannin
- /local-movers/georgia/fayette
- /local-movers/georgia/floyd
- /local-movers/georgia/franklin
- /local-movers/georgia/gilmer
- /local-movers/georgia/glascock
- /local-movers/georgia/glynn
- /local-movers/georgia/gordon
- /local-movers/georgia/grady
- /local-movers/georgia/greene
- /local-movers/georgia/habersham
- /local-movers/georgia/hancock
- /local-movers/georgia/haralson
- /local-movers/georgia/harris
- /local-movers/georgia/hart
- /local-movers/georgia/heard
- /local-movers/georgia/houston
- /local-movers/georgia/irwin
- /local-movers/georgia/jackson
- /local-movers/georgia/jasper
- /local-movers/georgia/jeff-davis
- /local-movers/georgia/jefferson
- /local-movers/georgia/jenkins
- /local-movers/georgia/johnson
- /local-movers/georgia/jones
- /local-movers/georgia/lamar
- /local-movers/georgia/lanier
- /local-movers/georgia/laurens
- /local-movers/georgia/lee
- /local-movers/georgia/liberty
- /local-movers/georgia/lincoln
- /local-movers/georgia/long
- /local-movers/georgia/lowndes
- /local-movers/georgia/lumpkin
- /local-movers/georgia/macon
- /local-movers/georgia/madison
- /local-movers/georgia/marion
- /local-movers/georgia/mcduffie
- /local-movers/georgia/mcintosh
- /local-movers/georgia/meriwether
- /local-movers/georgia/miller
- /local-movers/georgia/mitchell
- /local-movers/georgia/monroe
- /local-movers/georgia/montgomery
- /local-movers/georgia/morgan
- /local-movers/georgia/murray
- /local-movers/georgia/muscogee
- /local-movers/georgia/newton
- /local-movers/georgia/oconee
- /local-movers/georgia/oglethorpe
- /local-movers/georgia/paulding
- /local-movers/georgia/peach
- /local-movers/georgia/pickens
- /local-movers/georgia/pierce
- /local-movers/georgia/pike
- /local-movers/georgia/polk
- /local-movers/georgia/pulaski
- /local-movers/georgia/putnam
- /local-movers/georgia/quitman
- /local-movers/georgia/rabun
- /local-movers/georgia/randolph
- /local-movers/georgia/richmond
- /local-movers/georgia/rockdale
- /local-movers/georgia/schley
- /local-movers/georgia/screven
- /local-movers/georgia/seminole
- /local-movers/georgia/spalding
- /local-movers/georgia/stephens
- /local-movers/georgia/stewart
- /local-movers/georgia/sumter
- /local-movers/georgia/talbot
- /local-movers/georgia/taliaferro
- /local-movers/georgia/tattnall
- /local-movers/georgia/taylor
- /local-movers/georgia/telfair
- /local-movers/georgia/terrell
- /local-movers/georgia/thomas
- /local-movers/georgia/tift
- /local-movers/georgia/toombs
- /local-movers/georgia/towns
- /local-movers/georgia/treutlen
- /local-movers/georgia/troup
- /local-movers/georgia/turner
- /local-movers/georgia/twiggs
- /local-movers/georgia/union
- /local-movers/georgia/upson
- /local-movers/georgia/walker
- /local-movers/georgia/walton
- /local-movers/georgia/ware
- /local-movers/georgia/warren
- /local-movers/georgia/washington
- /local-movers/georgia/wayne
- /local-movers/georgia/webster
- /local-movers/georgia/wheeler
- /local-movers/georgia/white
- /local-movers/georgia/whitfield
- /local-movers/georgia/wilcox
- /local-movers/georgia/wilkes
- /local-movers/georgia/wilkinson
- /local-movers/georgia/worth
- /local-movers/illinois/champaign
- /local-movers/illinois/cook
- /local-movers/illinois/dupage
- /local-movers/illinois/jo-daviess
- /local-movers/illinois/kane
- /local-movers/illinois/lake
- /local-movers/illinois/madison
- /local-movers/illinois/mchenry
- /local-movers/illinois/peoria
- /local-movers/illinois/sangamon
- /local-movers/illinois/st-clair
- /local-movers/illinois/will
- /local-movers/illinois/winnebago
- /local-movers/indiana/brown
- /local-movers/indiana/hamilton
- /local-movers/indiana/steuben
- /local-movers/iowa/story
- /local-movers/maine/androscoggin
- /local-movers/michigan/alger
- /local-movers/michigan/antrim
- /local-movers/michigan/benzie
- /local-movers/michigan/charlevoix
- /local-movers/michigan/cheboygan
- /local-movers/michigan/crawford
- /local-movers/michigan/emmet
- /local-movers/michigan/grand-traverse
- /local-movers/michigan/ingham
- /local-movers/michigan/iosco
- /local-movers/michigan/kalkaska
- /local-movers/michigan/kent
- /local-movers/michigan/leelanau
- /local-movers/michigan/mackinac
- /local-movers/michigan/macomb
- /local-movers/michigan/manistee
- /local-movers/michigan/marquette
- /local-movers/michigan/mason
- /local-movers/michigan/oakland
- /local-movers/michigan/otsego
- /local-movers/michigan/presque-isle
- /local-movers/michigan/roscommon
- /local-movers/michigan/van-buren
- /local-movers/michigan/washtenaw
- /local-movers/michigan/wayne
- /local-movers/michigan/wexford
- /local-movers/minnesota/hennepin
- /local-movers/minnesota/olmsted
- /local-movers/mississippi/adams
- /local-movers/mississippi/hinds
- /local-movers/mississippi/madison
- /local-movers/mississippi/rankin
- /local-movers/missouri/st-louis
- /local-movers/new-hampshire/belknap
- /local-movers/new-jersey/cape-may
- /local-movers/new-jersey/cumberland
- /local-movers/new-mexico/santa-fe
- /local-movers/new-york/fulton
- /local-movers/new-york/hamilton
- /local-movers/new-york/herkimer
- /local-movers/new-york/monroe
- /local-movers/new-york/montgomery
- /local-movers/new-york/nassau
- /local-movers/new-york/onondaga
- /local-movers/new-york/orange
- /local-movers/new-york/rockland
- /local-movers/new-york/suffolk
- /local-movers/north-carolina/alamance
- /local-movers/north-carolina/mecklenburg
- /local-movers/north-carolina/wayne
- /local-movers/ohio/cuyahoga
- /local-movers/ohio/franklin
- /local-movers/oklahoma/tulsa
- /local-movers/south-carolina/abbeville
- /local-movers/south-carolina/aiken
- /local-movers/south-carolina/allendale
- /local-movers/south-carolina/bamberg
- /local-movers/south-carolina/barnwell
- /local-movers/south-carolina/cherokee
- /local-movers/south-carolina/chester
- /local-movers/south-carolina/clarendon
- /local-movers/south-carolina/darlington
- /local-movers/south-carolina/edgefield
- /local-movers/south-carolina/greenwood
- /local-movers/south-carolina/hampton
- /local-movers/south-carolina/laurens
- /local-movers/south-carolina/marlboro
- /local-movers/south-carolina/mccormick
- /local-movers/south-carolina/newberry
- /local-movers/south-carolina/oconee
- /local-movers/south-carolina/pickens
- /local-movers/south-carolina/saluda
- /local-movers/south-carolina/union
- /local-movers/south-carolina/williamsburg
- /local-movers/south-carolina/york
- /local-movers/tennessee/clay
- /local-movers/tennessee/cocke
- /local-movers/tennessee/crockett
- /local-movers/tennessee/decatur
- /local-movers/tennessee/hancock
- /local-movers/tennessee/hardeman
- /local-movers/tennessee/houston
- /local-movers/tennessee/jackson
- /local-movers/tennessee/lake
- /local-movers/tennessee/lauderdale
- /local-movers/tennessee/lewis
- /local-movers/tennessee/overton
- /local-movers/tennessee/perry
- /local-movers/tennessee/pickett
- /local-movers/tennessee/trousdale
- /local-movers/tennessee/van-buren
- /local-movers/tennessee/wayne
- /local-movers/texas/anderson
- /local-movers/texas/andrews
- /local-movers/texas/angelina
- /local-movers/texas/aransas
- /local-movers/texas/archer
- /local-movers/texas/armstrong
- /local-movers/texas/atascosa
- /local-movers/texas/austin
- /local-movers/texas/bailey
- /local-movers/texas/bandera
- /local-movers/texas/bastrop
- /local-movers/texas/baylor
- /local-movers/texas/bee
- /local-movers/texas/bexar
- /local-movers/texas/blanco
- /local-movers/texas/borden
- /local-movers/texas/bosque
- /local-movers/texas/bowie
- /local-movers/texas/brazos
- /local-movers/texas/brewster
- /local-movers/texas/briscoe
- /local-movers/texas/brooks
- /local-movers/texas/brown
- /local-movers/texas/burleson
- /local-movers/texas/burnet
- /local-movers/texas/caldwell
- /local-movers/texas/calhoun
- /local-movers/texas/callahan
- /local-movers/texas/cameron
- /local-movers/texas/camp
- /local-movers/texas/carson
- /local-movers/texas/cass
- /local-movers/texas/castro
- /local-movers/texas/chambers
- /local-movers/texas/cherokee
- /local-movers/texas/childress
- /local-movers/texas/clay
- /local-movers/texas/cochran
- /local-movers/texas/coke
- /local-movers/texas/coleman
- /local-movers/texas/collingsworth
- /local-movers/texas/colorado
- /local-movers/texas/comal
- /local-movers/texas/comanche
- /local-movers/texas/concho
- /local-movers/texas/cooke
- /local-movers/texas/coryell
- /local-movers/texas/cottle
- /local-movers/texas/crane
- /local-movers/texas/crockett
- /local-movers/texas/crosby
- /local-movers/texas/culberson
- /local-movers/texas/dallam
- /local-movers/texas/dawson
- /local-movers/texas/deaf-smith
- /local-movers/texas/delta
- /local-movers/texas/dewitt
- /local-movers/texas/dickens
- /local-movers/texas/dimmit
- /local-movers/texas/donley
- /local-movers/texas/duval
- /local-movers/texas/eastland
- /local-movers/texas/ector
- /local-movers/texas/edwards
- /local-movers/texas/ellis
- /local-movers/texas/erath
- /local-movers/texas/falls
- /local-movers/texas/fannin
- /local-movers/texas/fayette
- /local-movers/texas/fisher
- /local-movers/texas/floyd
- /local-movers/texas/foard
- /local-movers/texas/franklin
- /local-movers/texas/freestone
- /local-movers/texas/frio
- /local-movers/texas/gaines
- /local-movers/texas/garza
- /local-movers/texas/gillespie
- /local-movers/texas/glasscock
- /local-movers/texas/goliad
- /local-movers/texas/gonzales
- /local-movers/texas/gray
- /local-movers/texas/grayson
- /local-movers/texas/gregg
- /local-movers/texas/grimes
- /local-movers/texas/guadalupe
- /local-movers/texas/hale
- /local-movers/texas/hall
- /local-movers/texas/hamilton
- /local-movers/texas/hansford
- /local-movers/texas/hardeman
- /local-movers/texas/hardin
- /local-movers/texas/harrison
- /local-movers/texas/hartley
- /local-movers/texas/haskell
- /local-movers/texas/hays
- /local-movers/texas/hemphill
- /local-movers/texas/henderson
- /local-movers/texas/hidalgo
- /local-movers/texas/hill
- /local-movers/texas/hockley
- /local-movers/texas/hood
- /local-movers/texas/hopkins
- /local-movers/texas/houston
- /local-movers/texas/howard
- /local-movers/texas/hudspeth
- /local-movers/texas/hunt
- /local-movers/texas/hutchinson
- /local-movers/texas/irion
- /local-movers/texas/jack
- /local-movers/texas/jackson
- /local-movers/texas/jasper
- /local-movers/texas/jeff-davis
- /local-movers/texas/jefferson
- /local-movers/texas/jim-hogg
- /local-movers/texas/jim-wells
- /local-movers/texas/johnson
- /local-movers/texas/jones
- /local-movers/texas/karnes
- /local-movers/texas/kaufman
- /local-movers/texas/kendall
- /local-movers/texas/kenedy
- /local-movers/texas/kent
- /local-movers/texas/kerr
- /local-movers/texas/kimble
- /local-movers/texas/king
- /local-movers/texas/kinney
- /local-movers/texas/kleberg
- /local-movers/texas/knox
- /local-movers/texas/la-salle
- /local-movers/texas/lamar
- /local-movers/texas/lamb
- /local-movers/texas/lampasas
- /local-movers/texas/lavaca
- /local-movers/texas/lee
- /local-movers/texas/leon
- /local-movers/texas/liberty
- /local-movers/texas/limestone
- /local-movers/texas/lipscomb
- /local-movers/texas/live-oak
- /local-movers/texas/llano
- /local-movers/texas/loving
- /local-movers/texas/lynn
- /local-movers/texas/madison
- /local-movers/texas/marion
- /local-movers/texas/martin
- /local-movers/texas/mason
- /local-movers/texas/matagorda
- /local-movers/texas/maverick
- /local-movers/texas/mcculloch
- /local-movers/texas/mclennan
- /local-movers/texas/mcmullen
- /local-movers/texas/medina
- /local-movers/texas/menard
- /local-movers/texas/midland
- /local-movers/texas/milam
- /local-movers/texas/mills
- /local-movers/texas/mitchell
- /local-movers/texas/montague
- /local-movers/texas/moore
- /local-movers/texas/morris
- /local-movers/texas/motley
- /local-movers/texas/nacogdoches
- /local-movers/texas/navarro
- /local-movers/texas/newton
- /local-movers/texas/nolan
- /local-movers/texas/nueces
- /local-movers/texas/ochiltree
- /local-movers/texas/oldham
- /local-movers/texas/orange
- /local-movers/texas/palo-pinto
- /local-movers/texas/panola
- /local-movers/texas/parker
- /local-movers/texas/parmer
- /local-movers/texas/pecos
- /local-movers/texas/polk
- /local-movers/texas/potter
- /local-movers/texas/presidio
- /local-movers/texas/rains
- /local-movers/texas/randall
- /local-movers/texas/reagan
- /local-movers/texas/real
- /local-movers/texas/red-river
- /local-movers/texas/reeves
- /local-movers/texas/refugio
- /local-movers/texas/roberts
- /local-movers/texas/robertson
- /local-movers/texas/rockwall
- /local-movers/texas/runnels
- /local-movers/texas/rusk
- /local-movers/texas/sabine
- /local-movers/texas/san-augustine
- /local-movers/texas/san-jacinto
- /local-movers/texas/san-patricio
- /local-movers/texas/san-saba
- /local-movers/texas/schleicher
- /local-movers/texas/scurry
- /local-movers/texas/shackelford
- /local-movers/texas/shelby
- /local-movers/texas/sherman
- /local-movers/texas/smith
- /local-movers/texas/somervell
- /local-movers/texas/starr
- /local-movers/texas/stephens
- /local-movers/texas/sterling
- /local-movers/texas/stonewall
- /local-movers/texas/sutton
- /local-movers/texas/swisher
- /local-movers/texas/taylor
- /local-movers/texas/terrell
- /local-movers/texas/terry
- /local-movers/texas/throckmorton
- /local-movers/texas/titus
- /local-movers/texas/tom-green
- /local-movers/texas/trinity
- /local-movers/texas/tyler
- /local-movers/texas/upshur
- /local-movers/texas/upton
- /local-movers/texas/uvalde
- /local-movers/texas/val-verde
- /local-movers/texas/van-zandt
- /local-movers/texas/victoria
- /local-movers/texas/walker
- /local-movers/texas/waller
- /local-movers/texas/ward
- /local-movers/texas/washington
- /local-movers/texas/webb
- /local-movers/texas/wharton
- /local-movers/texas/wheeler
- /local-movers/texas/wichita
- /local-movers/texas/wilbarger
- /local-movers/texas/willacy
- /local-movers/texas/wilson
- /local-movers/texas/winkler
- /local-movers/texas/wise
- /local-movers/texas/wood
- /local-movers/texas/yoakum
- /local-movers/texas/young
- /local-movers/texas/zapata
- /local-movers/texas/zavala
- /local-movers/vermont/addison
- /local-movers/virginia/albemarle
- /local-movers/virginia/alexandria
- /local-movers/virginia/arlington
- /local-movers/virginia/bath
- /local-movers/virginia/chesapeake
- /local-movers/virginia/chesterfield
- /local-movers/virginia/fairfax
- /local-movers/virginia/fairfax-city
- /local-movers/virginia/hampton
- /local-movers/virginia/henrico
- /local-movers/virginia/james-city
- /local-movers/virginia/loudoun
- /local-movers/virginia/newport-news
- /local-movers/virginia/norfolk
- /local-movers/virginia/prince-william
- /local-movers/virginia/spotsylvania
- /local-movers/virginia/stafford
- /local-movers/virginia/virginia-beach
- /local-movers/wisconsin/dane
- /local-movers/wyoming/teton

### Per state

- arizona: added 0, removed 4
- california: added 0, removed 34
- colorado: added 0, removed 60
- district-of-columbia: added 0, removed 1
- florida: added 0, removed 23
- georgia: added 0, removed 148
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
- tennessee: added 0, removed 17
- texas: added 0, removed 240
- vermont: added 0, removed 1
- virginia: added 0, removed 18
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
- A county is indexable with at least one evidenced, publishable, qualifying mover. Zero stays noindex. Inventory points use that shown list. Research, citation, regulatory, utility, and county-content scores are unchanged. `countExplicitCountyMovers` and `minExplicitMovers` are not an indexability gate.
- The Premium cap runs only when more than 400 counties qualify. The ranking includes canary movers and the same publication filter as the page, ordered by score then state and county.
- Duval includes the published home-county canary from the read-only RPC fixture. No company is hard-coded.
