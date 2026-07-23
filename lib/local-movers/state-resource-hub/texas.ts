import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 1):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const texasStateResourceHub: StateResourceHubPack = {
  "stateSlug": "texas",
  "stateCode": "TX",
  "h1": "Texas Moving Resource Hub: Costs, TxDMV Licensing & 254 County Guides",
  "metaTitle": "Texas Movers Guide 2026 — Costs, TxDMV Licensing & 254 County Guides",
  "metaDescription": "Plan a move within, to, or from Texas. Compare local and intrastate costs, verify TxDMV household goods certificates, browse 254 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Texas moves in 2026 — typical costs, TxDMV vs FMCSA rules, metro and regional county guides, and tools to compare licensed movers without paid placements.",
  "trustBar": [
    "254 County Guides",
    "Verified Movers",
    "TxDMV & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Texas",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Texas",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Texas",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Texas markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Texas Moving Cost",
    "href": "/moving-calculator"
  },
  "secondaryCta": {
    "label": "Find & Compare Movers",
    "href": "/companies"
  },
  "tertiaryCta": {
    "label": "Explore Regions & Counties",
    "href": "#hub-regions"
  },
  "whyDifferent": {
    "title": "Why moving in Texas is different",
    "paragraphs": [
      "Texas is not one moving market. DFW freeways, Houston humidity and flooding risk, Austin growth corridors, San Antonio military calendars, Permian Basin industrial traffic, and vast rural driveways produce different truck access, labor time, and soft costs — even when map miles look similar.",
      "Intrastate household goods movers must hold an active Texas Department of Motor Vehicles (TxDMV) certificate. Interstate jobs need federal FMCSA authority. Summer heat, long intercity distances, and HOA-heavy suburbs are first-class planning inputs — then drill into the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Texas moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Texas local and intrastate patterns; they are not bids. Mover counts combine curated county listings and verified directory carriers. Always compare written estimates from movers licensed for your route.",
    "stats": [
      {
        "label": "Typical local move (studio–2BR)",
        "value": "$450–$2,200+",
        "note": "Same metro; stairs, long carries, and HOAs push higher"
      },
      {
        "label": "Typical local move (3–4+ BR)",
        "value": "$1,600–$5,500+",
        "note": "Larger homes and heat-day crew hours common"
      },
      {
        "label": "Intrastate corridor (e.g. DFW ↔ Houston)",
        "value": "$2,200–$7,500+",
        "note": "Home size, packing, and season drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Heat + school calendars; mid-week mornings help"
      },
      {
        "label": "Top inbound origins",
        "value": "CA · NY · IL · FL · CO",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "254",
        "note": "Major metros emphasized; full state coverage"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Texas moving regulations & consumer protection",
    "intro": "Texas requires household goods movers operating in the state to be certified by the Texas Department of Motor Vehicles (TxDMV). Match the license to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Texas)",
      "body": "If origin or destination is outside Texas, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A TxDMV certificate alone does not authorize an out-of-state delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Texas)",
      "body": "Moves that start and end in Texas generally require an active TxDMV household goods / motor carrier certificate. Consumers can verify status in the TxDMV Truck Stop motor carrier lookup. Certificate numbers should appear on trucks, ads, and proposals."
    },
    "verifySteps": [
      "Classify the job: entirely in Texas (TxDMV) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name and certificate / USDOT numbers from the written estimate.",
      "Intrastate: search the company in the TxDMV Truck Stop database and confirm Active status.",
      "Interstate: look up USDOT / MC on FMCSA SAFER; review out-of-service and authority status.",
      "Refuse large cash deposits to unverified operators; keep the estimate, inventory, and contract.",
      "Confirm cargo and liability insurance and how valuation coverage works before load day."
    ],
    "protections": [
      {
        "title": "Written proposals & contracts",
        "detail": "Licensed Texas movers should provide clear written proposals/contracts. Read every line before you sign and keep a copy."
      },
      {
        "title": "Vehicle markings",
        "detail": "TxDMV expects required markings (including certificate and USDOT information as applicable) on moving equipment. Missing markings can be a red flag."
      },
      {
        "title": "Complaints",
        "detail": "Document damage or disputes in writing. TxDMV consumer-protection resources and FMCSA (for interstate) may apply depending on the route."
      }
    ],
    "officialLinks": [
      {
        "label": "TxDMV — Don’t Make a Move Without Us",
        "href": "https://www.txdmv.gov/motorists/consumer-protection/dont-make-a-move",
        "external": true
      },
      {
        "label": "TxDMV Truck Stop carrier lookup",
        "href": "https://apps.txdmv.gov/apps/mccs/truckstop/",
        "external": true
      },
      {
        "label": "FMCSA SAFER — USDOT lookup",
        "href": "https://safer.fmcsa.dot.gov/",
        "external": true
      },
      {
        "label": "Move Trust Hub — Verify a USDOT",
        "href": "/verify-dot"
      }
    ],
    "disclaimer": "Licensing rules and lookup tools can change. Always verify current certificate or authority status on official government sites for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "dfw",
      "name": "Dallas–Fort Worth Metroplex",
      "shortName": "DFW",
      "blurb": "Freeway-dense suburbs, HOA tracts, and high-volume corporate and family moves across Collin, Dallas, Denton, and Tarrant.",
      "challenges": [
        "I-35 / I-20 / I-635 congestion and long portal-to-portal time",
        "HOA windows and new-construction access"
      ],
      "countySlugs": [
        "collin",
        "dallas",
        "denton",
        "ellis",
        "johnson",
        "kaufman",
        "rockwall",
        "tarrant",
        "wise",
        "parker",
        "hunt",
        "hood"
      ],
      "ctaLabel": "Explore DFW counties"
    },
    {
      "id": "houston",
      "name": "Greater Houston",
      "shortName": "Houston",
      "blurb": "Humidity, floodplain access planning, energy-sector calendars, and sprawling suburban HOAs from Harris to Fort Bend and Montgomery.",
      "challenges": [
        "Weather and flood-risk staging flexibility",
        "Long suburban carries and HOA rules"
      ],
      "countySlugs": [
        "harris",
        "fort-bend",
        "montgomery",
        "brazoria",
        "galveston",
        "liberty",
        "chambers",
        "waller",
        "austin"
      ],
      "ctaLabel": "Explore Houston region"
    },
    {
      "id": "austin-central",
      "name": "Austin & Central Texas",
      "shortName": "Austin",
      "blurb": "Fast-growth corridors, tech and university calendars, and steep demand for mid-week windows in Travis and Williamson.",
      "challenges": [
        "Apartment elevators and downtown staging limits",
        "Peak school-year and tech relocation demand"
      ],
      "countySlugs": [
        "travis",
        "williamson",
        "hays",
        "bastrop",
        "caldwell",
        "burnet",
        "blanco"
      ],
      "ctaLabel": "Explore Austin region"
    },
    {
      "id": "san-antonio",
      "name": "San Antonio & South-Central",
      "shortName": "San Antonio",
      "blurb": "Military PCS cycles, Hill Country approaches, and large family homes across Bexar and neighboring counties.",
      "challenges": [
        "Military calendar spikes",
        "Heat and longer suburban driveways"
      ],
      "countySlugs": [
        "bexar",
        "comal",
        "guadalupe",
        "medina",
        "wilson",
        "kendall",
        "bandera",
        "atascosa"
      ],
      "ctaLabel": "Explore San Antonio region"
    },
    {
      "id": "rgv-south",
      "name": "Rio Grande Valley & South Texas",
      "shortName": "RGV / South",
      "blurb": "Border metros, winter Texian/snowbird patterns, and bilingual service expectations in Hidalgo, Cameron, and Webb.",
      "challenges": [
        "Seasonal population swings",
        "Heat and long regional hauls"
      ],
      "countySlugs": [
        "cameron",
        "hidalgo",
        "starr",
        "willacy",
        "webb",
        "zapata"
      ],
      "ctaLabel": "Explore South Texas"
    },
    {
      "id": "el-paso",
      "name": "El Paso & Far West",
      "shortName": "El Paso",
      "blurb": "Desert climate, mountain-edge access, and cross-border logistics context on the far western edge of the state.",
      "challenges": [
        "Desert heat windows",
        "Long distances to other Texas metros"
      ],
      "countySlugs": [
        "el-paso",
        "hudspeth"
      ],
      "ctaLabel": "Explore El Paso region"
    },
    {
      "id": "permian-west",
      "name": "Permian Basin & West Texas",
      "shortName": "Permian / West",
      "blurb": "Energy-sector demand, industrial traffic, and sparse rural segments between Midland–Odessa and surrounding counties.",
      "challenges": [
        "Oilfield traffic and crew availability",
        "Long rural approaches"
      ],
      "countySlugs": [
        "midland",
        "ector",
        "andrews",
        "martin",
        "crane",
        "ward",
        "reeves",
        "pecos",
        "howard"
      ],
      "ctaLabel": "Explore West Texas"
    },
    {
      "id": "east-texas",
      "name": "East Texas",
      "shortName": "East Texas",
      "blurb": "Piney Woods towns, mixed suburban and rural lots, and corridors linking Tyler–Longview to Houston and DFW.",
      "challenges": [
        "Rural driveway access",
        "Longer hauls to major metros"
      ],
      "countySlugs": [
        "smith",
        "gregg",
        "harrison",
        "angelina",
        "nacogdoches",
        "cherokee",
        "rusk",
        "upshur",
        "wood",
        "panola"
      ],
      "ctaLabel": "Explore East Texas"
    },
    {
      "id": "panhandle-plains",
      "name": "Panhandle & South Plains",
      "shortName": "Panhandle",
      "blurb": "Amarillo and Lubbock hubs, wind and weather exposure, and wide-open approaches across the plains.",
      "challenges": [
        "Wind and weather delays",
        "Distance between towns"
      ],
      "countySlugs": [
        "potter",
        "randall",
        "lubbock",
        "hale",
        "taylor",
        "tom-green",
        "wichita"
      ],
      "ctaLabel": "Explore Panhandle / Plains"
    },
    {
      "id": "coastal-bend",
      "name": "Coastal Bend",
      "shortName": "Coastal Bend",
      "blurb": "Corpus Christi and coastal humidity, hurricane-season flexibility, and port-adjacent logistics.",
      "challenges": [
        "Hurricane-season timing",
        "Humidity and coastal access"
      ],
      "countySlugs": [
        "nueces",
        "san-patricio",
        "aransas",
        "kleberg",
        "jim-wells",
        "bee"
      ],
      "ctaLabel": "Explore Coastal Bend"
    },
    {
      "id": "rest-texas",
      "name": "Hill Country, Borderlands & Rest of Texas",
      "shortName": "Rest of Texas",
      "blurb": "Smaller metros, Hill Country lots, agricultural properties, and long rural driveways outside the major hubs.",
      "challenges": [
        "Thin local crew coverage",
        "Long driveways and farm-adjacent access"
      ],
      "countySlugs": [
        "anderson",
        "archer",
        "armstrong",
        "bailey",
        "baylor",
        "bell",
        "borden",
        "bosque",
        "bowie",
        "brazos",
        "brewster",
        "briscoe",
        "brooks",
        "brown",
        "burleson",
        "calhoun",
        "callahan",
        "camp",
        "carson",
        "cass",
        "castro",
        "childress",
        "clay",
        "cochran",
        "coke",
        "coleman",
        "collingsworth",
        "colorado",
        "comanche",
        "concho",
        "cooke",
        "coryell",
        "cottle",
        "crockett",
        "crosby",
        "culberson",
        "dallam",
        "dawson",
        "deaf-smith",
        "delta",
        "dewitt",
        "dickens",
        "dimmit",
        "donley",
        "duval",
        "eastland",
        "edwards",
        "erath",
        "falls",
        "fannin",
        "fayette",
        "fisher",
        "floyd",
        "foard",
        "franklin",
        "freestone",
        "frio",
        "gaines",
        "garza",
        "gillespie",
        "glasscock",
        "goliad",
        "gonzales",
        "gray",
        "grayson",
        "grimes",
        "hall",
        "hamilton",
        "hansford",
        "hardeman",
        "hardin",
        "hartley",
        "haskell",
        "hemphill",
        "henderson",
        "hill",
        "hockley",
        "hopkins",
        "houston",
        "hutchinson",
        "irion",
        "jack",
        "jackson",
        "jasper",
        "jeff-davis",
        "jefferson",
        "jim-hogg",
        "jones",
        "karnes",
        "kenedy",
        "kent",
        "kerr",
        "kimble",
        "king",
        "kinney",
        "knox",
        "la-salle",
        "lamar",
        "lamb",
        "lampasas",
        "lavaca",
        "lee",
        "leon",
        "limestone",
        "lipscomb",
        "live-oak",
        "llano",
        "loving",
        "lynn",
        "madison",
        "marion",
        "mason",
        "matagorda",
        "maverick",
        "mcculloch",
        "mclennan",
        "mcmullen",
        "menard",
        "milam",
        "mills",
        "mitchell",
        "montague",
        "moore",
        "morris",
        "motley",
        "navarro",
        "newton",
        "nolan",
        "ochiltree",
        "oldham",
        "orange",
        "palo-pinto",
        "parmer",
        "polk",
        "presidio",
        "rains",
        "reagan",
        "real",
        "red-river",
        "refugio",
        "roberts",
        "robertson",
        "runnels",
        "sabine",
        "san-augustine",
        "san-jacinto",
        "san-saba",
        "schleicher",
        "scurry",
        "shackelford",
        "shelby",
        "sherman",
        "somervell",
        "stephens",
        "sterling",
        "stonewall",
        "sutton",
        "swisher",
        "terrell",
        "terry",
        "throckmorton",
        "titus",
        "trinity",
        "tyler",
        "upton",
        "uvalde",
        "val-verde",
        "van-zandt",
        "victoria",
        "walker",
        "washington",
        "wharton",
        "wheeler",
        "wilbarger",
        "winkler",
        "yoakum",
        "young",
        "zavala"
      ],
      "ctaLabel": "Explore other Texas counties"
    }
  ],
  "costs": {
    "title": "Texas moving costs",
    "intro": "Texas pricing reflects metro labor markets, long intercity distances, summer heat productivity, and HOA accessorials. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Texas moving costs",
      "lastReviewed": "2026-07-22",
      "body": "These ranges are planning estimates, not quotes. They combine typical Texas local and intrastate market patterns: home size, distance, accessorials (stairs, long carries, HOAs), seasonal demand, and regional labor rates. Actual bids vary. Always compare written estimates from movers with active TxDMV certificates for in-state work and FMCSA authority for interstate work."
    },
    "ranges": [
      {
        "label": "Local studio / 1BR (simple access)",
        "value": "$450–$1,500+",
        "note": "Higher with elevators or HOA rules"
      },
      {
        "label": "Local 2–3BR house",
        "value": "$1,400–$4,200+",
        "note": "Suburban long carries common"
      },
      {
        "label": "Intrastate mid-size (e.g. Austin ↔ San Antonio)",
        "value": "$1,800–$5,500+",
        "note": "Packing and season matter"
      },
      {
        "label": "Intrastate long (e.g. DFW ↔ Houston)",
        "value": "$2,200–$7,500+",
        "note": "3–4+ BR and full packing push the top"
      },
      {
        "label": "Typical 2-person crew (major metros)",
        "value": "$120–$200+/hr",
        "note": "Portal-to-portal; heat days may affect pace"
      }
    ],
    "factors": [
      "Major metros (DFW, Houston, Austin) often price higher than rural counties.",
      "Summer heat favors early starts and can extend labor time.",
      "HOA move windows and gate lists add soft costs in master-planned suburbs.",
      "Long I-10 / I-35 / I-45 portal-to-portal time affects hourly bills.",
      "Peak May–September and end-of-month weekends fill crews early."
    ]
  },
  "routes": {
    "title": "Popular Texas moving routes",
    "intro": "Texas is a major inbound destination and a large internal market. Interstate jobs need FMCSA authority; in-state corridors need TxDMV-certified household goods movers.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Texas → Oklahoma / Arkansas",
        "href": "/moving-to/oklahoma",
        "origins": "DFW, East Texas, Houston",
        "transit": "Often same-week interstate corridors",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common shorter interstate hops from North and East Texas."
      },
      {
        "label": "Texas → Colorado",
        "href": "/moving-to/colorado",
        "origins": "DFW, Austin, Houston",
        "transit": "Multi-day linehaul",
        "planningNote": "Altitude and seasonal weather at destination matter.",
        "note": "Popular lifestyle outbound lane for metro Texas households."
      },
      {
        "label": "Texas → Florida",
        "href": "/moving-to/florida",
        "origins": "Houston, DFW, San Antonio",
        "transit": "Multi-day I-10 / southeastern corridors",
        "planningNote": "Hurricane season and HOA rules at FL destinations.",
        "note": "Bi-directional Sun Belt traffic is common."
      }
    ],
    "inbound": [
      {
        "label": "California → Texas",
        "href": "/local-movers/texas",
        "origins": "LA Basin, Bay Area, San Diego",
        "transit": "Multi-day; large inventories common",
        "planningNote": "One of the highest-volume inbound lanes into Texas metros.",
        "note": "Confirm interstate FMCSA authority and TxDMV for any in-state second hop."
      },
      {
        "label": "Moving to Dallas County / DFW",
        "href": "/local-movers/texas/dallas",
        "note": "Freeway density and HOA suburbs define many arrivals."
      },
      {
        "label": "Moving to Harris County / Houston",
        "href": "/local-movers/texas/harris",
        "note": "Humidity, sprawl, and floodplain access planning."
      },
      {
        "label": "Moving to Travis County / Austin",
        "href": "/local-movers/texas/travis",
        "note": "Growth corridors and apartment elevators are common."
      }
    ]
  },
  "challenges": {
    "title": "Texas-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Texas moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Summer heat & early starts",
        "detail": "June–September heat is operational, not cosmetic. Prefer early load windows, hydration plans, and realistic labor time for multi-story homes."
      },
      {
        "title": "Metro freeway congestion",
        "detail": "DFW, Houston, and Austin portal-to-portal time often exceeds map estimates at peak. Ask whether quotes are portal-to-portal."
      },
      {
        "title": "HOA and master-planned communities",
        "detail": "Many suburbs require Certificates of Insurance, approved hours, and gate lists. Collect the packet before move day."
      },
      {
        "title": "Rural and ranch access",
        "detail": "Outside metros, long driveways, soft shoulders, and limited turnarounds can force smaller trucks or long carries."
      },
      {
        "title": "Severe weather flexibility",
        "detail": "Thunderstorms, flooding, and Gulf storms can force reschedules. Build buffer into load/delivery windows."
      },
      {
        "title": "Long distances between hubs",
        "detail": "El Paso, Lubbock, the Valley, and East Texas are not “local” to DFW or Houston. Treat long in-state hauls as distance moves with correct licensing."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Texas moves."
    },
    {
      "label": "Verify a USDOT",
      "href": "/verify-dot",
      "description": "Look up interstate authority before you pay a deposit on a cross-state move."
    },
    {
      "label": "Interstate mover directory",
      "href": "/companies",
      "description": "Search licensed carriers nationwide — same tools used across Move Trust Hub."
    },
    {
      "label": "How we score movers",
      "href": "/about/how-we-score-movers",
      "description": "Independent methodology — no lead fees, no paid placement for rankings."
    },
    {
      "label": "Moving timeline checklist",
      "href": "/resources/checklist",
      "description": "Interstate-ready planning checklist you can adapt for Texas local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "How are movers regulated in Texas?",
      "answer": "Intrastate household goods movers generally need an active Texas Department of Motor Vehicles (TxDMV) certificate. Interstate moves that cross state lines require federal FMCSA operating authority and a USDOT number. Confirm which framework applies to your exact origin and destination and verify status on official tools (TxDMV Truck Stop and FMCSA SAFER)."
    },
    {
      "question": "How do I verify a Texas mover is licensed?",
      "answer": "Search the company name or certificate in the TxDMV Truck Stop motor carrier lookup and confirm Active status. For interstate work, also verify USDOT / MC on FMCSA SAFER. Match the legal name on your estimate to the official record before you pay a deposit."
    },
    {
      "question": "When is the best time to move in Texas?",
      "answer": "Demand peaks late spring through early fall and around month-end leases. Mid-week mornings outside peak summer heat are often easier for crew availability and HOA windows. Extreme heat can affect summer pacing even when crews are available."
    },
    {
      "question": "Why do Texas moves vary so much in price?",
      "answer": "Metro labor markets, HOA accessorials, stairs/long carries, heat, and long intercity distances drive spreads. Rural jobs may add travel time. Use county guides for local access tips and the calculator for inventory-based planning."
    },
    {
      "question": "Do I need different movers for local vs interstate Texas moves?",
      "answer": "Not always, but the license must match the job. A TxDMV-certified intrastate operator may not hold FMCSA interstate authority. Always verify TxDMV for in-state work and FMCSA for out-of-state work — some companies hold both."
    },
    {
      "question": "What should I watch for with unlicensed movers in Texas?",
      "answer": "TxDMV warns consumers that unlicensed operators are illegal for household goods work. Avoid large cash deposits, demand written contracts, and verify Active certificate status in Truck Stop before load day."
    }
  ],
  "trust": {
    "byline": "Curated by the Move Trust Hub editorial team",
    "lastReviewed": "2026-07-22",
    "methodology": "County guides combine public licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement for inclusion. Cost ranges are planning estimates derived from typical Texas market patterns, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "TxDMV consumer protection — household movers",
        "href": "https://www.txdmv.gov/motorists/consumer-protection/dont-make-a-move"
      },
      {
        "label": "TxDMV Truck Stop lookup",
        "href": "https://apps.txdmv.gov/apps/mccs/truckstop/"
      },
      {
        "label": "FMCSA SAFER",
        "href": "https://safer.fmcsa.dot.gov/"
      },
      {
        "label": "How we score movers",
        "href": "/about/how-we-score-movers"
      }
    ]
  },
  "stickyNav": [
    {
      "id": "hub-intent",
      "label": "Start"
    },
    {
      "id": "hub-why-different",
      "label": "Why here"
    },
    {
      "id": "hub-snapshot",
      "label": "Snapshot"
    },
    {
      "id": "hub-regulations",
      "label": "Regulations"
    },
    {
      "id": "hub-regions",
      "label": "Regions"
    },
    {
      "id": "hub-map",
      "label": "Map"
    },
    {
      "id": "hub-costs",
      "label": "Costs"
    },
    {
      "id": "hub-routes",
      "label": "Routes"
    },
    {
      "id": "hub-challenges",
      "label": "Tips"
    },
    {
      "id": "hub-counties",
      "label": "Counties"
    },
    {
      "id": "hub-tools",
      "label": "Tools"
    },
    {
      "id": "hub-faq",
      "label": "FAQ"
    }
  ]
};
