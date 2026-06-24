# State Local Movers Curation Template (Texas & Beyond)

Replicate the Florida / New Jersey / New York / California / Texas / Georgia / South Carolina / North Carolina / Tennessee / Alabama / Mississippi / Louisiana / Oklahoma / Arkansas / Kansas / Missouri / Illinois / Michigan / Indiana / Ohio / Kentucky / West Virginia / Virginia / District of Columbia / Delaware / Maryland model for any new state. California, Florida, Georgia, New Jersey, New York, North Carolina, South Carolina, Tennessee, Alabama, Mississippi, Louisiana, Oklahoma, Arkansas, Kansas, Missouri, Illinois, Michigan, Indiana, Ohio, Kentucky, West Virginia, Virginia, District of Columbia, Delaware, Maryland, and Texas are **hand-curated** — do not run `generate-state-local-movers.ts` for them.

> **Louisiana note:** Administrative divisions are **parishes** (not counties). Use parish-specific copy on hub and detail pages; data files follow the `{state}-county-*` naming convention for code consistency.

## Reference states (audit-complete)

| State | Counties | Rural min | Major target | Sitemap 0.85 | Audit scripts |
|-------|----------|-----------|--------------|--------------|---------------|
| California | 58/58 | 5 | 10 | 15 counties | `count-california-movers.ts`, `apply-california-mover-expansion.ts` |
| Florida | 67/67 | 5 | 8 (cap 10) | 2 counties | `count-fl-movers.ts`, `apply-fl-mover-expansion.ts` |
| Georgia | 159/159 | 5 | 10 (cap 10) | 19 counties | `count-georgia-movers.ts`, `apply-georgia-mover-expansion.ts` |
| South Carolina | 46/46 | 5 | 10 (cap 10) | 14 counties | `count-south-carolina-movers.ts`, `apply-south-carolina-mover-expansion.ts` |
| North Carolina | 100/100 | 5 | 10 (cap 10) | 28 counties | `count-north-carolina-movers.ts`, `apply-north-carolina-mover-expansion.ts` |
| New Jersey | 21/21 | 7 | 10 | 8 counties | `count-nj-movers.ts`, `apply-nj-mover-expansion.ts` |
| New York | 62/62 | 5 | 10 | 16 counties | `count-ny-movers.ts`, `apply-ny-mover-expansion.ts` |
| Texas | 254/254 | 5 | 10 (cap 10) | 16 counties | `count-texas-movers.ts`, `apply-texas-mover-expansion.ts` |
| Tennessee | 95/95 | 5 | 10 (cap 10) | 20 counties | `count-tennessee-movers.ts`, `apply-tennessee-mover-expansion.ts` |
| Alabama | 67/67 | 5 | 10 (cap 10) | 15 counties | `count-alabama-movers.ts`, `apply-alabama-mover-expansion.ts` |
| Mississippi | 82/82 | 5 | 10 (cap 10) | 15 counties | `count-mississippi-movers.ts`, `apply-mississippi-mover-expansion.ts` |
| Louisiana | 64/64 parishes | 5 | 10 (cap 10) | 15 parishes | `count-louisiana-movers.ts`, `apply-louisiana-mover-expansion.ts` |
| Oklahoma | 77/77 | 3 (rural) | 8 (medium) / 10 (top 5) | 12 counties | `count-oklahoma-movers.ts` |
| Arkansas | 75/75 | 5 | 8 (medium) / 10 (major) | 14 counties | `count-arkansas-movers.ts`, `apply-arkansas-mover-expansion.ts` |
| Kansas | 105/105 | 5 | 8 (medium) / 10 (major) | 14 counties | `count-kansas-movers.ts`, `apply-kansas-mover-expansion.ts` |
| Missouri | 115/115 | 5 | 8 (medium) / 10 (major) | 14 counties | `count-missouri-movers.ts`, `apply-missouri-mover-expansion.ts` |
| Illinois | 102/102 | 5 | 10 (cap 10; Cook up to 19) | 15 counties | `count-illinois-movers.ts`, `apply-illinois-mover-expansion.ts` |
| Michigan | 83/83 | 5 | 10 (cap 10; Wayne up to 18) | 15 counties | `count-michigan-movers.ts`, `apply-michigan-mover-expansion.ts` |
| Indiana | 92/92 (complete) | 5 | 10 (cap 10; Marion up to 18) | 15 counties | `count-indiana-movers.ts`, `apply-indiana-mover-expansion.ts`, `audit-indiana-seo.ts` |
| Ohio | 88/88 (complete) | 5 | 10 (cap 10; Franklin up to 18) | 15 counties | `count-ohio-movers.ts`, `apply-ohio-mover-expansion.ts`, `audit-ohio-seo.ts` |
| Kentucky | 120/120 (complete) | 5 | 10 (cap 10) | 15 counties | `count-kentucky-movers.ts`, `apply-kentucky-mover-expansion.ts`, `audit-kentucky-seo.ts` |
| West Virginia | 55/55 (complete) | 5 | 10 (cap 10) | 15 counties | `count-west-virginia-movers.ts`, `apply-west-virginia-mover-expansion.ts`, `audit-west-virginia-seo.ts` |
| Virginia | 134/134 (complete) | 5 | 10 (cap 10; Fairfax up to 15) | 18 counties/cities | `count-virginia-movers.ts`, `apply-virginia-mover-expansion.ts`, `audit-virginia-seo.ts` |
| District of Columbia | 1/1 jurisdiction (complete) | 15 | 15 (premium hub) | hub + jurisdiction 0.85 | `count-district-of-columbia-movers.ts`, `apply-district-of-columbia-mover-expansion.ts`, `audit-district-of-columbia-seo.ts` |
| Delaware | 3/3 (complete) | 8 | 12 (New Castle) / 8 (Kent, Sussex) | `new-castle` 0.85 | `count-delaware-movers.ts`, `apply-delaware-mover-expansion.ts`, `audit-delaware-seo.ts` |
| Maryland | 24/24 (complete) | 10 | 10 (all jurisdictions) | 16 regional hubs 0.85 | `count-maryland-movers.ts`, `apply-maryland-mover-expansion.ts`, `audit-maryland-seo.ts` |
| Pennsylvania | 56/67 (batch 5) | 10 | 10 (large markets) | 56 counties 0.85 | `count-pennsylvania-movers.ts`, `apply-pennsylvania-mover-expansion.ts`, `audit-pennsylvania-seo.ts` |

> **Pennsylvania note:** Philadelphia County is coterminous with the City of Philadelphia — no supplemental geography needed. PA `delaware` slug = Delaware County PA (not DE state); nearby links use `displayLabel` disambiguation. Montgomery PA nearby links to Montgomery MD cross-border. Add to `SKIP_STATES` and `CURATED_STATE_SLUGS`.

> **Maryland note:** Maryland curation is **complete** — 23 counties + Baltimore **City** (independent), 10 movers each. `baltimore` slug = Baltimore **County** (seat Towson); `baltimore-city` = independent city (supplemental geography). Rural/Eastern Shore counties use `regional-{slug}-md-movers` as #1 with 9 named providers. Cross-border nearby links to DC, VA, PA, DE, and WV strengthen E-E-A-T.

> **District of Columbia note:** DC is a **federal district**, not a state. It has a single jurisdiction (`district-of-columbia` slug) treated as county-equivalent in code. Use district-specific copy on hub and detail pages; data files follow the `{district}-county-*` naming convention for code consistency. Compare quality bar to Cook (IL), Wayne (MI), or Marion (IN) large-market hubs.

> **Delaware note:** Delaware has only **3 counties** — complete state curation is efficient. New Castle (Wilmington metro) is the premium market (12 movers); Kent (Dover/government) and Sussex (coastal/beach/retirement) target 8+ movers each. Cross-border nearby links to MD, PA, and NJ curated counties strengthen E-E-A-T. Add to `SKIP_STATES` and `CURATED_STATE_SLUGS`.

### District of Columbia metro pool (`data/local-movers-seed.ts`)

- `washington-dc-metro-dc` — Washington, DC capital-city hub (15 movers)

### District of Columbia verification commands

```bash
npx tsx scripts/count-district-of-columbia-movers.ts
npx tsx scripts/audit-district-of-columbia-seo.ts
npx tsx scripts/validate-county-schema.ts
```

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/district-of-columbia.xml` (2 URLs: hub + jurisdiction).

### Delaware metro pools (`data/local-movers-seed.ts`)

- `new-castle-metro-de` — Wilmington / New Castle corporate & Philadelphia spillover hub (12 movers)
- `kent-metro-de` — Dover / state capital & government hub (10 movers)
- `sussex-metro-de` — Georgetown / coastal & beach-second-home hub (10 movers)

### Delaware counties (targets)

`new-castle` (12), `kent` (8+), `sussex` (8+)

### Delaware sitemap priority 0.85

`new-castle` (Wilmington metro hub)

### Delaware verification commands

```bash
npx tsx scripts/count-delaware-movers.ts
npx tsx scripts/audit-delaware-seo.ts
npx tsx scripts/validate-county-schema.ts
```

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/delaware.xml` (4 URLs: hub + 3 counties).

### Maryland metro pools (`data/local-movers-seed.ts`) — complete (24 pools)

All 23 counties + Baltimore City have `{slug}-metro-md` pools with 10 movers each. See `generate-maryland-batch{1,2,3}-catalog.ps1` output.

### Maryland counties (complete — 10 movers each)

All 24 jurisdictions curated: `montgomery`, `prince-georges`, `baltimore`, `anne-arundel`, `baltimore-city`, `howard`, `frederick`, `harford`, `charles`, `carroll`, `washington`, `st-marys`, `cecil`, `wicomico`, `calvert`, `allegany`, `queen-annes`, `worcester`, `talbot`, `caroline`, `dorchester`, `garrett`, `somerset`, `kent`

### Maryland sitemap priority 0.85

Regional hubs: `montgomery`, `prince-georges`, `baltimore`, `anne-arundel`, `baltimore-city`, `howard`, `frederick`, `harford`, `charles`, `carroll`, `washington`, `wicomico`, `st-marys`, `calvert`, `cecil`, `worcester`

### Maryland verification commands (batch 1)

```bash
npx tsx scripts/count-maryland-movers.ts
npx tsx scripts/audit-maryland-seo.ts
npx tsx scripts/validate-county-schema.ts
```

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/maryland.xml` (hub + 24 counties; batch-1 counties at 0.85 priority).

### Virginia metro pools (`data/local-movers-seed.ts`)

- `northern-virginia-metro-va` — Fairfax County / NoVA DC-metro hub
- `fairfax-city-metro-va` — Fairfax City independent city hub
- `prince-william-metro-va` — Prince William / Manassas / Woodbridge hub
- `loudoun-metro-va` — Loudoun / Ashburn / Leesburg hub
- `arlington-metro-va` — Arlington urban hub
- `alexandria-metro-va` — Alexandria Potomac waterfront hub
- `hampton-roads-metro-va` — Virginia Beach / Norfolk / Chesapeake / Newport News hub
- `richmond-metro-va` — Richmond City / Henrico / Chesterfield hub
- `roanoke-metro-va` — Roanoke Valley hub
- Per-county `{slug}-metro-va` pools for all 134 localities (batch 1-10 curation)

### Virginia major localities (10 movers each)

`fairfax`, `fairfax-city`, `loudoun`, `prince-william`, `arlington`, `alexandria`, `virginia-beach`, `norfolk`, `chesapeake`, `richmond`, `henrico`, `chesterfield`, `newport-news`, `hampton`, `stafford`, `spotsylvania`, `roanoke`, `roanoke-county`, `salem`

All 134 Virginia counties and independent cities are curated at minimum 5 movers (10 for major metros).

### Virginia sitemap priority 0.85 (18 high-traffic localities)

`fairfax`, `prince-william`, `loudoun`, `virginia-beach`, `chesterfield`, `henrico`, `chesapeake`, `arlington`, `richmond`, `norfolk`, `newport-news`, `stafford`, `alexandria`, `spotsylvania`, `hampton`, `albemarle`, `hanover`, `suffolk`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/virginia.xml` (135 URLs: hub + 134 localities).

### Virginia verification commands

```bash
npx tsx scripts/count-virginia-movers.ts
npx tsx scripts/audit-virginia-seo.ts
npx tsx scripts/validate-county-schema.ts
```

### West Virginia metro pools (`data/local-movers-seed.ts`)

- `charleston-metro-wv` — Charleston / Kanawha state capital hub
- `martinsburg-metro-wv` — Martinsburg / Berkeley Eastern Panhandle (I-81 DC commuter spillover)
- `morgantown-metro-wv` — Morgantown / Monongalia WVU university hub
- `huntington-metro-wv` — Huntington / Cabell tri-state Ohio River hub
- `parkersburg-metro-wv` — Parkersburg / Wood mid-Ohio Valley hub
- `beckley-metro-wv` — Beckley / Raleigh Southern WV coalfields hub
- `wheeling-metro-wv` — Wheeling / Ohio Northern Panhandle tri-state hub
- `clarksburg-metro-wv` — Clarksburg / Harrison North Central hub
- `fairmont-metro-wv` — Fairmont / Marion I-79 university corridor hub
- `princeton-metro-wv` — Princeton / Mercer Southern WV hub
- `fayetteville-metro-wv` — Fayetteville / Fayette New River Gorge hub
- `lewisburg-metro-wv` — Lewisburg / Greenbrier tourism hub
- `logan-metro-wv` — Logan / Logan coalfields hub
- `williamson-metro-wv` — Williamson / Mingo Tug Fork coalfields hub
- `welch-metro-wv` — Welch / McDowell coalfields hub

### West Virginia major counties (10 movers each)

`kanawha`, `berkeley`, `monongalia`, `cabell`, `wood`, `raleigh`, `jefferson`, `harrison`, `mercer`, `putnam`, `marion`, `ohio`, `fayette`, `wayne`, `preston`

All 55 West Virginia counties are curated at 10 movers each.

### West Virginia sitemap priority 0.85 (15 counties — top population / metro hubs)

`kanawha`, `berkeley`, `monongalia`, `cabell`, `wood`, `raleigh`, `jefferson`, `harrison`, `mercer`, `putnam`, `marion`, `ohio`, `fayette`, `wayne`, `preston`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/west-virginia.xml` (56 URLs: hub + 55 counties).

### West Virginia verification commands

```bash
npx tsx scripts/count-west-virginia-movers.ts
npx tsx scripts/audit-west-virginia-seo.ts
npx tsx scripts/validate-county-schema.ts
```

### Kentucky metro pools (`data/local-movers-seed.ts`)

- `louisville-metro-ky` — Louisville / Jefferson hub (Ohio River corridor)
- `lexington-metro-ky` — Lexington / Fayette Bluegrass horse country hub
- `cincinnati-metro-ky` — Northern Kentucky / Covington–Florence–Erlanger (Cincinnati MSA)
- `bowling-green-metro-ky` — Bowling Green / Warren I-65 South Central hub
- `elizabethtown-metro-ky` — Elizabethtown / Hardin Fort Knox military corridor
- `owensboro-metro-ky` — Owensboro / Daviess Western Kentucky hub
- `richmond-metro-ky` — Richmond / Madison Eastern Kentucky hub
- `hopkinsville-metro-ky` — Hopkinsville / Christian Fort Campbell hub
- `paducah-metro-ky` — Paducah / McCracken Western Kentucky lakes hub
- `pikeville-metro-ky` — Pikeville / Pike Eastern Kentucky coalfields hub
- `frankfort-metro-ky` — Frankfort / Franklin state capital hub
- `bardstown-metro-ky` — Bardstown / Nelson bourbon trail hub
- `ashland-metro-ky` — Ashland / Boyd Northeast Kentucky hub
- `glasgow-metro-ky` — Glasgow / Barren South Central hub
- `madisonville-metro-ky` — Madisonville / Hopkins Western Kentucky hub
- `henderson-metro-ky` — Henderson / Henderson Ohio River hub
- `murray-metro-ky` — Murray / Calloway lakes hub
- `hazard-metro-ky` — Hazard / Perry Appalachian hub
- `lebanon-metro-ky` — Lebanon / Marion Central Kentucky hub (distinct from Crittenden seat Marion)

### Kentucky major counties (10 movers each)

`jefferson`, `fayette`, `kenton`, `boone`, `warren`, `hardin`, `daviess`, `madison`, `campbell`, `mccracken`, `bullitt`, `oldham`, `scott`, `shelby`, `christian`, `pulaski`, `laurel`, `jessamine`, `pike`, `franklin`, `nelson`, `boyd`, `barren`, `hopkins`, `henderson`, `calloway`, `clark`, `whitley`, `graves`, `greenup`, `floyd`, `boyle`, `marshall`, `meade`, `muhlenberg`, `knox`, `logan`, `montgomery`, `woodford`, `grayson`, `taylor`, `grant`, `perry`, `carter`, `lincoln`, `anderson`, `rowan`, `harlan`, `mercer`, `allen`, `bell`, `johnson`, `breckinridge`, `spencer`, `simpson`, `hart`, `marion`

All 120 Kentucky counties are curated at 10 movers each.

### Kentucky sitemap priority 0.85 (15 counties — top population / metro hubs)

`jefferson`, `fayette`, `kenton`, `boone`, `warren`, `hardin`, `daviess`, `madison`, `campbell`, `mccracken`, `bullitt`, `oldham`, `scott`, `shelby`, `christian`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/kentucky.xml` (121 URLs: hub + 120 counties). Do **not** use `/sitemap-local/kentucky.xml` (legacy path redirects to canonical).

### Kentucky sitemap priority 0.80 (remaining 105 counties)

### Kentucky verification commands

```bash
npx tsx scripts/count-kentucky-movers.ts
npx tsx scripts/audit-kentucky-seo.ts
npx tsx scripts/validate-county-schema.ts
```

### Ohio metro pools (`data/local-movers-seed.ts`)

- `columbus-metro-oh` — Columbus / Franklin hub
- `cleveland-metro-oh` — Cleveland / Cuyahoga hub
- `cincinnati-metro-oh` — Cincinnati / Hamilton hub
- `dayton-metro-oh` — Dayton / Montgomery hub
- `akron-metro-oh` — Akron / Summit hub
- `toledo-metro-oh` — Toledo / Lucas hub
- `canton-metro-oh` — Canton / Stark hub
- `youngstown-metro-oh` — Youngstown / Mahoning hub
- `springfield-metro-oh` — Springfield / Clark hub
- `mansfield-metro-oh` — Mansfield / Richland hub
- `lima-metro-oh` — Lima / Allen hub
- `zanesville-metro-oh` — Zanesville / Muskingum hub
- `chillicothe-metro-oh` — Chillicothe / Ross hub
- `findlay-metro-oh` — Findlay / Hancock hub
- `portsmouth-metro-oh` — Portsmouth / Scioto hub
- `celina-metro-oh` — Celina / Mercer hub
- `cambridge-metro-oh` — Cambridge / Guernsey hub
- `defiance-metro-oh` — Defiance / Defiance County hub
- `coshocton-metro-oh` — Coshocton / Coshocton County hub
- `bryan-metro-oh` — Bryan / Williams hub
- `athens-metro-oh` — Athens / Athens County hub
- `marietta-metro-oh` — Marietta / Washington County hub

### Ohio major counties (10 movers each; Franklin may expand to 18)

All 88 Ohio counties are curated at 10 movers each (Franklin may expand to 18).

### Ohio sitemap priority 0.85 (15 counties — top population / metro hubs)

`franklin`, `cuyahoga`, `hamilton`, `summit`, `montgomery`, `lucas`, `butler`, `stark`, `lorain`, `warren`, `lake`, `clermont`, `medina`, `delaware`, `mahoning`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/ohio.xml` (89 URLs: hub + 88 counties). Do **not** use `/sitemap-local/ohio.xml` (legacy path redirects to canonical).

### Ohio sitemap priority 0.80 (remaining 73 counties)

### Indiana metro pools (`data/local-movers-seed.ts`)

- `indianapolis-metro-in` — Indianapolis / Marion hub (Hamilton collar spillover)
- `northwest-indiana-metro-in` — Lake County / Gary–Hammond–Merrillville–Crown Point (Chicago metro Indiana side)
- `fort-wayne-metro-in` — Fort Wayne / Allen Northeast Indiana hub
- `south-bend-metro-in` — South Bend / St. Joseph (Notre Dame) hub
- `elkhart-goshen-metro-in` — Elkhart / Goshen RV-industry corridor
- `lafayette-metro-in` — Lafayette / Tippecanoe (Purdue) hub
- `evansville-metro-in` — Evansville / Vanderburgh Southwest Indiana hub
- `bloomington-metro-in` — Bloomington / Monroe (Indiana University) hub
- `anderson-metro-in` — Anderson / Madison East Central Indiana hub
- `louisville-metro-in` — Louisville metro Indiana side (Clark, Floyd)
- `muncie-metro-in` — Muncie / Delaware (Ball State) hub
- `laporte-metro-in` — Michigan City / La Porte Northwest Indiana lakeshore
- `terre-haute-metro-in` — Terre Haute / Vigo West Central Indiana hub
- `columbus-metro-in` — Columbus / Bartholomew South Central Indiana hub
- `kokomo-metro-in` — Kokomo / Howard North Central Indiana hub
- `warsaw-metro-in` — Warsaw / Kosciusko Northern Indiana lakes hub
- `grant-marion-metro-in` — Grant County / Marion city (distinct from Marion County Indianapolis)
- `richmond-metro-in` — Richmond / Wayne East Central Indiana hub
- `cincinnati-metro-in` — Cincinnati metro Indiana side (Dearborn)
- `new-castle-metro-in` — New Castle / Henry East Central Indiana hub
- `noble-metro-in` — Noble County / Albion Northeast Indiana hub
- `seymour-metro-in` — Seymour / Jackson I-65 South Central Indiana hub
- `plymouth-metro-in` — Plymouth / Marshall Northern Indiana hub
- `bedford-metro-in` — Bedford / Lawrence South Central Indiana hub
- `auburn-metro-in` — Auburn / DeKalb Northeast Indiana hub
- `jasper-metro-in` — Jasper / Dubois Southern Indiana manufacturing hub
- `lagrange-metro-in` — LaGrange County Amish country hub
- `crawfordsville-metro-in` — Crawfordsville / Montgomery (Wabash College) hub
- `greencastle-metro-in` — Greencastle / Putnam (DePauw) hub
- `logansport-metro-in` — Logansport / Cass North Central Indiana hub
- `huntington-county-metro-in` — Huntington County Northeast Indiana hub
- `adams-decatur-metro-in` — Adams County / Decatur (distinct from Bartholomew Columbus)
- `vincennes-metro-in` — Vincennes / Knox Southwest Indiana hub
- `columbia-city-metro-in` — Columbia City / Whitley Northeast Indiana hub
- `angola-metro-in` — Angola / Steuben lakes tourism hub
- `peru-metro-in` — Peru / Miami North Central Indiana hub

### Indiana major counties (10 movers each; Marion up to 18)

`marion`, `lake`, `allen`, `hamilton`, `st-joseph`, `elkhart`, `hendricks`, `tippecanoe`, `vanderburgh`, `johnson`, `porter`, `monroe`, `madison`, `clark`, `delaware`, `laporte`, `vigo`, `hancock`, `bartholomew`, `howard`, `boone`, `floyd`, `kosciusko`, `morgan`, `warrick`, `grant`, `wayne`, `dearborn`, `henry`, `noble`, `jackson`, `marshall`, `shelby`, `lawrence`, `dekalb`, `dubois`, `lagrange`, `harrison`, `montgomery`, `putnam`, `cass`, `huntington`, `adams`, `knox`, `whitley`, `steuben`, `miami`

### Indiana sitemap priority 0.85 (15 counties — top population / metro hubs)

`marion`, `lake`, `allen`, `hamilton`, `st-joseph`, `elkhart`, `vanderburgh`, `porter`, `hendricks`, `madison`, `tippecanoe`, `monroe`, `delaware`, `bartholomew`, `clark`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/indiana.xml` (93 URLs: hub + 92 counties). Do **not** use `/sitemap-local/indiana.xml` (legacy path redirects to canonical).

### Michigan metro pools (`data/local-movers-seed.ts`)

- `detroit-metro-mi` — Detroit / Wayne hub (collar spillover from Oakland, Macomb, Livingston)
- `grand-rapids-metro-mi` — Grand Rapids / Kent / Ottawa West Michigan hub
- `flint-metro-mi` — Flint / Genesee corridor
- `ann-arbor-metro-mi` — Ann Arbor / Washtenaw (University of Michigan)
- `lansing-metro-mi` — Lansing / Ingham / Eaton state capital corridor
- `kalamazoo-metro-mi` — Kalamazoo / Western Michigan university hub
- `saginaw-metro-mi`, `bay-city-metro-mi`, `midland-metro-mi` — Tri-Cities and Central Michigan
- `muskegon-metro-mi`, `holland-allegan-metro-mi`, `manistee-metro-mi`, `beulah-metro-mi` — West Michigan lakeshore
- `traverse-city-metro-mi`, `petoskey-metro-mi`, `charlevoix-metro-mi`, `gaylord-metro-mi` — Northern Michigan tourism
- `marquette-metro-mi`, `escanaba-metro-mi`, `iron-mountain-metro-mi`, `sault-ste-marie-metro-mi` — Upper Peninsula hubs
- Rural pools: county-seat metros (`baldwin-metro-mi`, `grayling-metro-mi`, `munising-metro-mi`, etc.)

### Michigan major counties (10 movers each; Wayne up to 18)

`wayne`, `oakland`, `macomb`, `kent`, `ottawa`, `washtenaw`, `ingham`, `genesee`, `kalamazoo`, `livingston`, `saginaw`, `muskegon`, `monroe`, `grand-traverse`, `marquette`

### Michigan sitemap priority 0.85 (15 counties)

`wayne`, `oakland`, `macomb`, `kent`, `ottawa`, `washtenaw`, `ingham`, `genesee`, `kalamazoo`, `livingston`, `saginaw`, `muskegon`, `monroe`, `grand-traverse`, `marquette`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/michigan.xml` (84 URLs: hub + 83 counties). Do **not** use `/sitemap-local/michigan.xml` (legacy path redirects to canonical).

### Illinois metro pools (`data/local-movers-seed.ts`)

- `chicago-metro-il` — Chicago core (Cook hub)
- `chicago-metro-west-il`, `chicago-metro-north-il`, `chicago-metro-southwest-il`, `chicago-metro-northwest-il` — DuPage, Lake, Will, Kane, McHenry collar counties
- `rockford-metro-il` — Rockford / Winnebago northern Illinois hub
- `st-louis-metro-il` — St. Louis MSA Illinois side (Madison, St. Clair, Monroe, Jersey, Bond, Randolph)
- `champaign-urbana-metro-il` — Champaign-Urbana / University of Illinois corridor
- `springfield-metro-il` — Springfield / Sangamon state capital corridor
- `peoria-metro-il` — Peoria / Tazewell / Woodford central Illinois hub
- `bloomington-normal-metro-il` — Bloomington-Normal / McLean I-55 corridor
- `quad-cities-metro-il` — Rock Island / Henry / Mercer Mississippi River metro
- `decatur-metro-il`, `danville-metro-il`, `kankakee-metro-il`, `ottawa-metro-il` — east-central and collar corridors
- `quincy-metro-il`, `galesburg-metro-il`, `galena-metro-il`, `oregon-metro-il` — west-central and northwest Illinois
- `carbondale-metro-il`, `marion-metro-il` — southern Illinois hubs
- `sterling-rock-falls-metro-il`, `dekalb-metro-il` — additional regional pools

### Illinois major counties (10 movers each; Cook up to 19)

`cook`, `dupage`, `lake`, `will`, `kane`, `mchenry`, `winnebago`, `madison`, `st-clair`, `champaign`, `sangamon`, `peoria`, `mclean`, `rock-island`, `kendall`

### Illinois sitemap priority 0.85 (15 counties)

`cook`, `dupage`, `lake`, `will`, `kane`, `mchenry`, `winnebago`, `madison`, `st-clair`, `champaign`, `sangamon`, `peoria`, `mclean`, `rock-island`, `kendall`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/illinois.xml` (103 URLs: hub + 102 counties). Do **not** use `/sitemap-local/illinois.xml` (legacy path redirects to canonical).

### Missouri metro pools (`data/local-movers-seed.ts`)

- `st-louis-metro-mo` — St. Louis MSA (St. Louis County, St. Louis City)
- `st-louis-metro-west-mo`, `st-louis-metro-south-mo`, `st-louis-metro-north-mo` — St. Charles, Jefferson, Franklin, Warren commuter corridors
- `kansas-city-metro-mo` — Kansas City MSA (Jackson hub)
- `kansas-city-metro-north-mo`, `kansas-city-metro-south-mo`, `kansas-city-metro-northwest-mo`, `kansas-city-metro-east-mo` — Clay, Cass, Platte, Lafayette KC suburbs
- `springfield-metro-mo` — Springfield / Greene Ozarks hub
- `columbia-metro-mo` — Columbia / Boone (Mizzou) university corridor
- `joplin-metro-mo` — Joplin / Jasper southwest Missouri hub
- `st-joseph-metro-mo`, `jefferson-city-metro-mo`, `cape-girardeau-metro-mo` — regional hubs
- Rural pools: `regional-*-mo-movers` per remote county seat

### Missouri major counties (10 movers each)

`st-louis`, `st-louis-city`, `jackson`, `st-charles`, `greene`, `clay`, `jefferson`, `boone`, `platte`, `cass`, `franklin`, `jasper`, `buchanan`, `cole`, `christian`, `cape-girardeau`

### Missouri sitemap priority 0.85 (14 counties)

`st-louis`, `st-louis-city`, `jackson`, `st-charles`, `greene`, `clay`, `jefferson`, `boone`, `platte`, `cass`, `franklin`, `jasper`, `buchanan`, `cole`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/missouri.xml` (116 URLs: hub + 115 counties). Do **not** use `/sitemap-local/missouri.xml` (legacy path redirects to canonical).

### Kansas metro pools (`data/local-movers-seed.ts`)

- `kansas-city-metro-ks` — Kansas City MSA (Johnson, Wyandotte, Leavenworth)
- `kansas-city-metro-south-ks` — Miami County / southern KC commuter corridor
- `wichita-metro-ks` — Wichita MSA (Sedgwick hub)
- `wichita-metro-east-ks`, `wichita-metro-north-ks` — Butler, Harvey Wichita-adjacent counties
- `topeka-metro-ks` — Topeka / Shawnee capital corridor
- `lawrence-metro-ks` — Lawrence / Douglas (KU) university corridor
- `manhattan-metro-ks` — Manhattan / Riley (K-State) military-university corridor
- `hutchinson-metro-ks`, `salina-metro-ks` — Central Kansas regional hubs
- `pittsburg-metro-ks`, `garden-city-metro-ks`, `dodge-city-metro-ks`, `hays-metro-ks` — SE/western Kansas agricultural and energy corridors
- Rural pools: `regional-*-ks-movers` per remote county seat

### Kansas major counties (10 movers each)

`johnson`, `sedgwick`, `shawnee`, `wyandotte`, `douglas`, `butler`, `riley`, `reno`, `saline`, `crawford`, `ellis`, `ford`, `finney`

### Kansas sitemap priority 0.85 (14 counties)

`johnson`, `sedgwick`, `shawnee`, `wyandotte`, `douglas`, `leavenworth`, `riley`, `butler`, `reno`, `saline`, `crawford`, `finney`, `ford`, `ellis`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/kansas.xml` (106 URLs: hub + 105 counties). Do **not** use `/sitemap-local/kansas.xml` (legacy path redirects to canonical).

### Arkansas metro pools (`data/local-movers-seed.ts`)

- `little-rock-metro-ar` — Little Rock MSA (Pulaski, Faulkner, Saline, Lonoke, Grant)
- `northwest-arkansas-metro-ar` — Bentonville–Fayetteville NWA growth corridor (Benton, Washington)
- `fort-smith-metro-ar` — Fort Smith / Sebastian–Crawford military corridor
- `jonesboro-metro-ar` — Jonesboro / Craighead northeast Arkansas hub
- `hot-springs-metro-ar` — Hot Springs / Garland tourism corridor
- `searcy-metro-ar`, `russellville-metro-ar` — Central Arkansas regional hubs
- `pine-bluff-metro-ar` — Pine Bluff / Jefferson Delta corridor
- `paragould-metro-ar`, `west-memphis-metro-ar` — NE Arkansas / Memphis border corridor
- `mountain-home-metro-ar`, `texarkana-metro-ar`, `batesville-metro-ar`, `harrison-metro-ar` — Ozark / border regional pools
- Rural pools: `regional-*-ar-movers` per remote county seat

### Arkansas major counties (10 movers each)

`pulaski`, `benton`, `washington`, `faulkner`, `saline`, `sebastian`, `craighead`, `garland`, `lonoke`, `pope`, `white`, `jefferson`

### Arkansas sitemap priority 0.85 (14 counties)

`pulaski`, `benton`, `washington`, `faulkner`, `saline`, `sebastian`, `craighead`, `garland`, `lonoke`, `pope`, `white`, `jefferson`, `crittenden`, `crawford`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/arkansas.xml` (76 URLs: hub + 75 counties). Do **not** use `/sitemap-local/arkansas.xml` (legacy path redirects to canonical).

### Oklahoma metro pools (`data/local-movers-seed.ts`)

- `oklahoma-city-metro-ok` — Oklahoma City MSA (Oklahoma, Cleveland, Canadian, Pottawatomie, Logan, Grady, McClain)
- `tulsa-metro-ok` — Tulsa MSA (Tulsa, Rogers, Wagoner, Creek, Osage, Washington, Mayes)
- `lawton-metro-ok` — Lawton / Fort Sill military corridor (Comanche)
- `stillwater-metro-ok` — Stillwater / Payne County (OSU)
- `shawnee-metro-ok` — Shawnee / Pottawatomie
- `muskogee-metro-ok`, `enid-metro-ok` — East/Northwest regional hubs
- Rural pools: `regional-*-ok-movers` per remote county seat (Panhandle tier: min 3 movers)

### Oklahoma tiered mover targets

**Top 5 (10 movers):** `oklahoma`, `tulsa`, `cleveland`, `canadian`, `rogers`

**Medium counties (8 movers):** all remaining non-rural counties

**Rural tier (3 movers min):** `alfalfa`, `jefferson`, `coal`, `cotton`, `greer`, `beaver`, `dewey`, `grant`, `ellis`, `roger-mills`, `harper`, `harmon`, `cimarron`

### Oklahoma sitemap priority 0.85 (12 counties)

`oklahoma`, `tulsa`, `cleveland`, `canadian`, `rogers`, `comanche`, `payne`, `pottawatomie`, `muskogee`, `garfield`, `grady`, `wagoner`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/oklahoma.xml` (78 URLs: hub + 77 counties). Do **not** use `/sitemap-local/oklahoma.xml` (legacy path redirects to canonical).

### Louisiana metro pools (`data/local-movers-seed.ts`)

- `baton-rouge-metro-la` — Baton Rouge MSA / capital corridor (EBR, Livingston, Ascension, Iberville)
- `new-orleans-metro-la` — Greater New Orleans / Orleans–Jefferson–Plaquemines
- `north-shore-metro-la` — St. Tammany North Shore commuter corridor
- `lafayette-metro-la` — Lafayette / Acadiana Cajun Country hub
- `shreveport-bossier-metro-la` — Shreveport–Bossier / Northwest LA military corridor
- `lake-charles-metro-la` — Lake Charles / Calcasieu petrochemical and coastal corridor
- `monroe-metro-la` — Monroe / Ouachita Northeast Louisiana hub
- `hammond-metro-la` — Hammond / Tangipahoa I-12 corridor
- `alexandria-metro-la` — Alexandria / Rapides Central Louisiana hub
- `houma-bayou-metro-la` — Houma–Thibodaux / Terrebonne–Lafourche bayou corridor
- `ruston-metro-la`, `natchitoches-metro-la`, `leesville-metro-la` — North/Central LA regional pools
- Rural pools: `regional-*-la-movers` entries per remote parish seat

### Louisiana major parishes (10 movers each)

`orleans`, `jefferson`, `east-baton-rouge`, `st-tammany`, `lafayette`, `caddo`, `calcasieu`, `bossier`, `livingston`, `tangipahoa`, `ascension`, `terrebonne`, `rapides`, `ouachita`, `st-landry`

### Louisiana sitemap priority 0.85 (15 parishes)

`east-baton-rouge`, `orleans`, `jefferson`, `st-tammany`, `lafayette`, `caddo`, `calcasieu`, `bossier`, `livingston`, `tangipahoa`, `ascension`, `terrebonne`, `rapides`, `ouachita`, `st-landry`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/louisiana.xml` (65 URLs: hub + 64 parishes). Do **not** use `/sitemap-local/louisiana.xml` (legacy path redirects to canonical).

### Mississippi metro pools (`data/local-movers-seed.ts`)

- `jackson-ms-metro-ms` — Jackson MSA / Hinds–Rankin–Madison corridor
- `gulfport-biloxi-metro-ms` — Gulfport–Biloxi / Harrison County coastal corridor
- `desoto-metro-ms` — DeSoto County / Memphis South suburban corridor
- `pascagoula-metro-ms` — Pascagoula / Jackson County shipbuilding corridor
- `tupelo-metro-ms` — Tupelo / Lee County manufacturing hub
- `hattiesburg-metro-ms` — Hattiesburg / Forrest–Lamar university corridor
- `meridian-metro-ms` — Meridian / Lauderdale East Mississippi hub
- `oxford-metro-ms` — Oxford / Lafayette Ole Miss corridor
- `columbus-ms-metro-ms` — Columbus / Lowndes military and manufacturing corridor
- `starkville-metro-ms` — Starkville / Oktibbeha Mississippi State corridor
- `hancock-coastal-ms` — Bay St. Louis / Hancock Gulf Coast
- `picayune-metro-ms` — Picayune / Pearl River growth corridor
- Rural pools: `mayersville-metro-ms`, `marks-metro-ms`, `belzoni-metro-ms`, etc. (one per remote county seat)

### Mississippi major counties (10 movers each)

`hinds`, `harrison`, `desoto`, `rankin`, `madison`, `lee`, `forrest`, `lauderdale`, `jones`, `lamar`, `oktibbeha`, `lowndes`, `pearl-river`, `hancock`, `monroe`

### Mississippi sitemap priority 0.85 (15 counties)

`hinds`, `harrison`, `desoto`, `rankin`, `madison`, `jackson`, `lee`, `forrest`, `lauderdale`, `lafayette`, `lowndes`, `oktibbeha`, `jones`, `lamar`, `pearl-river`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/mississippi.xml` (83 URLs: hub + 82 counties). Do **not** use `/sitemap-local/mississippi.xml` (legacy path redirects to canonical).

### Alabama metro pools (`data/local-movers-seed.ts`)

- `birmingham-metro-al` — Birmingham MSA / Jefferson–Shelby corridor
- `huntsville-metro-al` — Huntsville / Madison / Research Park growth corridor
- `mobile-metro-al` — Mobile metro / Gulf Coast port and military corridor
- `baldwin-coastal-al` — Baldwin County / Eastern Shore and Gulf Coast
- `tuscaloosa-metro-al` — Tuscaloosa / Northport university corridor
- `montgomery-metro-al` — Montgomery capital / Maxwell-Gunter military corridor
- `auburn-opelika-metro-al` — Auburn–Opelika university corridor
- `decatur-metro-al` — Decatur / Tennessee River industrial corridor
- `anniston-metro-al` — Anniston–Oxford / Calhoun County
- `dothan-metro-al` — Dothan / Wiregrass hub
- `gadsden-metro-al` — Gadsden / Etowah County
- `florence-shoals-metro-al` — Florence–Muscle Shoals / NW Alabama
- Rural pools: `eutaw-metro-al`, `camden-metro-al`, `chatom-metro-al`, etc. (one per remote county seat)

### Alabama major counties (10 movers each)

`jefferson`, `madison`, `mobile`, `baldwin`, `tuscaloosa`, `shelby`, `montgomery`, `lee`, `morgan`, `calhoun`, `limestone`, `etowah`, `houston`

### Alabama sitemap priority 0.85 (15 counties)

`jefferson`, `madison`, `mobile`, `baldwin`, `tuscaloosa`, `shelby`, `montgomery`, `lee`, `limestone`, `morgan`, `calhoun`, `houston`, `etowah`, `marshall`, `st-clair`

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/alabama.xml` (68 URLs: hub + 67 counties). Do **not** use `/sitemap-local/alabama.xml` (legacy path redirects to canonical).

### Tennessee metro pools (`data/local-movers-seed.ts`)

- `memphis-metro-tn` — Memphis / West TN / Tipton corridor
- `nashville-metro-tn` — Nashville, Murfreesboro, Franklin, Gallatin, Lebanon, Columbia
- `clarksville-metro-tn` — Clarksville / Fort Campbell military corridor
- `knoxville-metro-tn` — Knoxville, Maryville, Oak Ridge
- `chattanooga-metro-tn` — Chattanooga metro
- `kingsport-bristol-metro-tn` — Tri-Cities (Johnson City, Kingsport, Bristol, Greeneville)
- `jackson-metro-tn` — Jackson / West TN regional
- `cookeville-metro-tn` — Cookeville / Upper Cumberland
- `crossville-metro-tn` — Crossville / Plateau
- `cleveland-metro-tn` — Cleveland / Bradley
- `sevierville-metro-tn` — Sevierville / Smokies tourism corridor
- `morristown-metro-tn`, `greeneville-metro-tn` — East TN regional fallbacks
- Rural pools: `byrdstown-metro-tn`, `celina-metro-tn`, `spencer-metro-tn`, etc. (one per remote county seat)

### Tennessee major counties (10 movers each)

`shelby`, `davidson`, `knox`, `hamilton`, `rutherford`, `williamson`, `montgomery`, `sumner`, `wilson`, `sullivan`, `blount`, `washington`, `maury`, `bradley`, `sevier`, `madison`, `putnam`, `anderson`, `robertson`, `greene`

### Tennessee sitemap priority 0.85 (20 counties)

Same as major counties above — Memphis, Nashville, Knoxville, Chattanooga, Clarksville, Murfreesboro/Williamson, Tri-Cities, Smokies, Cookeville, and surrounding high-growth corridors.

**GSC submit URL:** `https://www.movetrusthub.com/sitemap-local/sitemap/tennessee.xml` (96 URLs: hub + 95 counties). Do **not** use `/sitemap-local/tennessee.xml` (404; legacy path redirects to canonical).

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
| 11 | `app/sitemap-local/sitemap.ts` | `lastModified` + priority counties for major metros. Live URLs: `/sitemap-local/sitemap/{state}.xml` (not `/sitemap-local/{state}.xml`) |
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

### Georgia metro pools (`data/local-movers-seed.ts`)

- `atlanta-metro-ga` — Atlanta MSA / North Georgia suburbs
- `savannah-metro-ga` — Savannah / Coastal Empire
- `brunswick-metro-ga` — Brunswick / Golden Isles
- `augusta-metro-ga` — Augusta / CSRA
- `columbus-metro-ga` — Columbus / Chattahoochee Valley
- `macon-metro-ga` — Macon / Central Georgia
- `athens-metro-ga` — Athens / Northeast Georgia
- `valdosta-metro-ga` — Valdosta / South Georgia
- `albany-metro-ga` — Albany / Southwest Georgia
- `rome-metro-ga` — Rome / Northwest Georgia
- `dalton-metro-ga` — Dalton / Carpet Capital
- `chattanooga-metro-ga` — Northwest GA border / Chattanooga corridor
- `lagrange-metro-ga` — LaGrange / West Georgia

### Georgia major counties (10 movers each)

`fulton`, `gwinnett`, `cobb`, `dekalb`, `chatham`, `cherokee`, `clayton`, `forsyth`, `henry`, `hall`, `richmond`, `muscogee`, `paulding`, `houston`, `columbia`, `coweta`, `bibb`, `douglas`, `carroll`, `clarke`, `fayette`, `rockdale`, `newton`, `barrow`, `walton`, `glynn`, `liberty`, `effingham`, `bulloch`, `lowndes`, `dougherty`, `troup`, `floyd`, `whitfield`, `bartow`, `pickens`

### Georgia sitemap priority 0.85 (19 counties)

`fulton`, `gwinnett`, `cobb`, `dekalb`, `chatham`, `cherokee`, `clayton`, `forsyth`, `henry`, `hall`, `richmond`, `muscogee`, `paulding`, `houston`, `columbia`, `coweta`, `bibb`, `douglas`, `carroll`

### Georgia nearby counties

Hand-maintained adjacency map in `lib/local-movers/georgia-nearby.ts` (159/159 counties).

### South Carolina metro pools (`data/local-movers-seed.ts`)

- `charleston-metro-sc` — Charleston / Lowcountry / coastal corridor
- `greenville-metro-sc` — Greenville-Anderson / Upstate
- `myrtle-beach-metro-sc` — Myrtle Beach / Grand Strand
- `spartanburg-metro-sc` — Spartanburg / Upstate I-85 corridor
- `sumter-metro-sc` — Columbia / Midlands (Richland, Lexington)
- `florence-metro-sc` — Florence / Pee Dee
- `augusta-aiken-metro-sc` — Aiken / CSRA border
- `charlotte-metro-sc` — York / Lancaster / Charlotte metro SC side

### South Carolina major counties (10 movers each)

`charleston`, `greenville`, `richland`, `horry`, `spartanburg`, `york`, `lexington`, `berkeley`, `dorchester`, `aiken`, `anderson`, `pickens`, `sumter`, `beaufort`, `florence`, `georgetown`, `lancaster`, `oconee`, `cherokee`

### South Carolina sitemap priority 0.85 (14 counties)

`charleston`, `greenville`, `richland`, `horry`, `spartanburg`, `york`, `lexington`, `berkeley`, `dorchester`, `aiken`, `anderson`, `pickens`, `sumter`, `beaufort`

### South Carolina nearby counties

Hand-maintained adjacency map in `lib/local-movers/south-carolina-nearby.ts` (46/46 counties).

### North Carolina metro pools (`data/local-movers-seed.ts`)

- `raleigh-triangle-metro-nc` — Raleigh-Cary / Research Triangle
- `charlotte-metro-nc` — Charlotte Metro
- `greensboro-high-point-metro-nc` — Greensboro-High Point / Piedmont Triad
- `winston-salem-triad-metro-nc` — Winston-Salem / Triad
- `durham-chapel-hill-metro-nc` — Durham-Chapel Hill / Research Triangle
- `fayetteville-metro-nc` — Fayetteville / Fort Liberty corridor
- `asheville-metro-nc` — Asheville / Western NC mountains
- `wilmington-metro-nc` — Wilmington / Cape Fear coast
- `jacksonville-metro-nc` — Jacksonville / Camp Lejeune
- `greenville-metro-nc` — Greenville / Eastern NC
- `hickory-lenoir-metro-nc` — Hickory-Lenoir / Western Piedmont
- `goldsboro-metro-nc` — Goldsboro / Wayne County
- `new-bern-metro-nc` — New Bern / Coastal Carolina
- `pinehurst-metro-nc` — Pinehurst-Southern Pines / Sandhills
- `rocky-mount-metro-nc` — Rocky Mount / Eastern Piedmont
- `wilson-metro-nc`, `sanford-metro-nc`, `crystal-coast-metro-nc`, `boone-metro-nc`, `kinston-metro-nc`, `elizabeth-city-metro-nc`, `outer-banks-metro-nc` — regional fallbacks

### North Carolina major counties (10 movers each)

`wake`, `mecklenburg`, `guilford`, `forsyth`, `cumberland`, `durham`, `buncombe`, `new-hanover`, `onslow`, `cabarrus`, `union`, `iredell`, `johnston`, `henderson`, `gaston`, `catawba`, `robeson`, `pitt`, `wayne`, `alamance`, `brunswick`, `chatham`, `craven`, `davidson`, `harnett`, `moore`, `orange`, `randolph`, `rowan`

### North Carolina sitemap priority 0.85 (28 counties)

`wake`, `mecklenburg`, `guilford`, `forsyth`, `durham`, `cumberland`, `buncombe`, `new-hanover`, `onslow`, `cabarrus`, `union`, `iredell`, `johnston`, `henderson`, `gaston`, `catawba`, `pitt`, `wayne`, `alamance`, `brunswick`, `chatham`, `craven`, `davidson`, `harnett`, `moore`, `orange`, `randolph`, `rowan`

### North Carolina nearby counties

Hand-maintained adjacency map in `lib/local-movers/north-carolina-nearby.ts` (100/100 counties).

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
npx tsx scripts/count-georgia-movers.ts
npx tsx scripts/count-south-carolina-movers.ts
npx tsx scripts/count-north-carolina-movers.ts
npx tsx scripts/count-nj-movers.ts
npx tsx scripts/count-ny-movers.ts
npx tsx scripts/count-texas-movers.ts
npx tsx scripts/count-tennessee-movers.ts
npx tsx scripts/count-illinois-movers.ts
npx tsx scripts/count-michigan-movers.ts
npx tsx scripts/count-indiana-movers.ts
npx tsx scripts/audit-indiana-seo.ts
npx tsx scripts/count-ohio-movers.ts
npx tsx scripts/audit-ohio-seo.ts
npx tsx scripts/count-virginia-movers.ts
npx tsx scripts/audit-virginia-seo.ts
npx tsx scripts/count-district-of-columbia-movers.ts
npx tsx scripts/audit-district-of-columbia-seo.ts
npx tsx scripts/apply-illinois-mover-expansion.ts   # if needed
npx tsx scripts/apply-michigan-mover-expansion.ts   # if needed
npx tsx scripts/apply-indiana-mover-expansion.ts   # if needed
npx tsx scripts/apply-{state}-mover-expansion.ts   # if needed
```

## Commit message template

```
feat({state}): complete county curation + SEO audit

- {N}/{N} counties with research, assignments, testimonials
- Major metros expanded to 8–10 movers
- E-E-A-T, schema, sitemap, internal linking aligned with FL/NJ
```