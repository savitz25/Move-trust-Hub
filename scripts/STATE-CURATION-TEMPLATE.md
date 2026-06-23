# State Local Movers Curation Template (Texas & Beyond)

Replicate the Florida / New Jersey / New York / California / Texas / Georgia / South Carolina / North Carolina / Tennessee / Alabama / Mississippi / Louisiana / Oklahoma / Arkansas / Kansas / Missouri model for any new state. California, Florida, Georgia, New Jersey, New York, North Carolina, South Carolina, Tennessee, Alabama, Mississippi, Louisiana, Oklahoma, Arkansas, Kansas, Missouri, and Texas are **hand-curated** — do not run `generate-state-local-movers.ts` for them.

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
npx tsx scripts/apply-{state}-mover-expansion.ts   # if needed
```

## Commit message template

```
feat({state}): complete county curation + SEO audit

- {N}/{N} counties with research, assignments, testimonials
- Major metros expanded to 8–10 movers
- E-E-A-T, schema, sitemap, internal linking aligned with FL/NJ
```