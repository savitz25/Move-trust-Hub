import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 5):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const minnesotaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "minnesota",
  "stateCode": "MN",
  "h1": "Minnesota Moving Resource Hub: Costs, MnDOT HHG Permits & 87 County Guides",
  "metaTitle": "Minnesota Movers Guide 2026 — Costs, MnDOT HHG Permits & 87 County Guides",
  "metaDescription": "Plan a move within, to, or from Minnesota. Compare local and intrastate costs, verify MnDOT household goods mover permits, browse 87 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Minnesota moves in 2026 — typical costs, MnDOT HHG vs FMCSA rules, Twin Cities-to-North Shore regional guides, and tools to compare permitted movers without paid placements.",
  "trustBar": [
    "87 County Guides",
    "Verified Movers",
    "MnDOT & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Minnesota",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Minnesota",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Minnesota",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Minnesota markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Minnesota Moving Cost",
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
    "title": "Why moving in Minnesota is different",
    "paragraphs": [
      "Minnesota is not one moving market. Twin Cities multi-unit elevators and winter street staging, Rochester medical corridors, Duluth hill access, lake-country seasonal homes, and long prairie hauls produce different access and labor profiles under one state name.",
      "For-hire household goods movers operating within Minnesota must hold a Household Goods Mover Permit from the Minnesota Department of Transportation (MnDOT) Office of Freight and Commercial Vehicle Operations. Interstate jobs need FMCSA authority. Deep freezes, lake-effect snow, and college lease peaks are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Minnesota moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Minnesota local and intrastate patterns; they are not bids. Always compare written estimates from MnDOT-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Twin Cities studio / 1BR",
        "value": "$550–$2,400+",
        "note": "Elevators, stairs, and winter staging"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,800–$5,500+",
        "note": "Metro HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Minneapolis ↔ Duluth)",
        "value": "$2,000–$6,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter weather forces flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · AZ · TX · WI · IL · CO",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "87",
        "note": "Twin Cities emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Minnesota moving regulations & consumer protection",
    "intro": "Minnesota requires for-hire household goods movers operating within the state to obtain a Household Goods Mover Permit from MnDOT Commercial Vehicle Operations. Match the permit to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Minnesota)",
      "body": "If origin or destination is outside Minnesota, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Minnesota HHG permit alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Minnesota)",
      "body": "Household goods carriers operating for hire within Minnesota need a MnDOT Household Goods Mover Permit (Minn. Stat. §221.121 framework). Permitted movers are expected to maintain insurance on file, publish rates/tariffs, and meet vehicle registration requirements. Consumers can search carriers through MnDOT OFCVO tools."
    },
    "verifySteps": [
      "Classify the job: entirely in Minnesota (MnDOT HHG permit) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: search MnDOT OFCVO carrier tools for an active household goods permit.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Ask for published rates/tariff materials and written inventory-based estimates.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "MnDOT HHG permit requirement",
        "detail": "For-hire household goods movers operating within Minnesota must obtain a Household Goods Mover Permit through MnDOT Commercial Vehicle Operations."
      },
      {
        "title": "Insurance and tariff expectations",
        "detail": "Industry and association guidance notes that Minnesota movers must carry required insurance on file and publish rates and charges in tariff form available on request."
      },
      {
        "title": "Carrier search",
        "detail": "MnDOT publishes carrier search tools so consumers can confirm permit status for the company named on an estimate."
      }
    ],
    "officialLinks": [
      {
        "label": "MnDOT — Household goods movers",
        "href": "https://www.dot.state.mn.us/cvo/household-goods.html",
        "external": true
      },
      {
        "label": "Minnesota eLicense — Household Goods Mover Permit",
        "href": "https://mn.gov/elicense/a-z/?id=1083-230879",
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
    "disclaimer": "Licensing rules and lookup tools can change. Always verify current MnDOT household goods permit status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "twin-cities",
      "name": "Twin Cities Metro",
      "shortName": "Twin Cities",
      "blurb": "Hennepin, Ramsey, and collar counties with multi-unit elevators, winter street staging, and dense suburbs.",
      "challenges": [
        "Elevators, stairs, and winter driveway access",
        "HOA windows in growth suburbs"
      ],
      "countySlugs": [
        "hennepin",
        "ramsey",
        "anoka",
        "dakota",
        "washington",
        "scott",
        "carver",
        "wright",
        "sherburne",
        "chisago",
        "isanti"
      ],
      "ctaLabel": "Explore Twin Cities"
    },
    {
      "id": "southeast-mn",
      "name": "Southeast Minnesota",
      "shortName": "Southeast MN",
      "blurb": "Rochester medical corridors, Winona bluffs, and agricultural counties with mixed multi-unit and farm access.",
      "challenges": [
        "Bluff and river-city staging",
        "Medical and campus lease peaks"
      ],
      "countySlugs": [
        "olmsted",
        "winona",
        "goodhue",
        "wabasha",
        "dodge",
        "steele",
        "mower",
        "fillmore",
        "houston",
        "freeborn",
        "rice",
        "waseca",
        "le-sueur",
        "blue-earth",
        "faribault",
        "nicollet",
        "brown",
        "sibley"
      ],
      "ctaLabel": "Explore Southeast Minnesota"
    },
    {
      "id": "southwest-mn",
      "name": "Southwest Minnesota",
      "shortName": "Southwest MN",
      "blurb": "Prairie counties with longer driveway approaches and thinner local mover density.",
      "challenges": [
        "Confirm coverage for remote addresses",
        "Wind and winter weather on plains corridors"
      ],
      "countySlugs": [
        "lyon",
        "redwood",
        "cottonwood",
        "jackson",
        "nobles",
        "rock",
        "pipestone",
        "murray",
        "watonwan",
        "martin",
        "lincoln",
        "yellow-medicine",
        "lac-qui-parle",
        "chippewa",
        "kandiyohi",
        "meeker",
        "mcleod",
        "renville",
        "swift",
        "big-stone",
        "traverse",
        "stevens",
        "grant",
        "pope"
      ],
      "ctaLabel": "Explore Southwest Minnesota"
    },
    {
      "id": "central-mn",
      "name": "Central Minnesota",
      "shortName": "Central MN",
      "blurb": "St. Cloud, Brainerd lakes, and central counties with seasonal cabin moves and highway hauls.",
      "challenges": [
        "Seasonal lake-home access",
        "Summer tourism congestion on lake roads"
      ],
      "countySlugs": [
        "stearns",
        "benton",
        "morrison",
        "todd",
        "douglas",
        "otter-tail",
        "wadena",
        "cass",
        "crow-wing",
        "mille-lacs",
        "kanabec",
        "pine",
        "aitkin",
        "hubbard",
        "becker"
      ],
      "ctaLabel": "Explore Central Minnesota"
    },
    {
      "id": "northwest-mn",
      "name": "Northwest Minnesota",
      "shortName": "Northwest MN",
      "blurb": "Moorhead–Fargo approaches and northwest agricultural counties with long portal-to-portal distances.",
      "challenges": [
        "Distance from Twin Cities fleets",
        "Severe winter weather windows"
      ],
      "countySlugs": [
        "clay",
        "wilkin",
        "mahnomen",
        "norman",
        "polk",
        "red-lake",
        "pennington",
        "marshall",
        "kittson",
        "roseau",
        "lake-of-the-woods",
        "beltrami",
        "clearwater"
      ],
      "ctaLabel": "Explore Northwest Minnesota"
    },
    {
      "id": "northeast-mn",
      "name": "Northeast Minnesota & North Shore",
      "shortName": "Northeast / North Shore",
      "blurb": "Duluth hills, Iron Range, and North Shore counties with lake-effect weather and steep access.",
      "challenges": [
        "Hill driveways and winter ice",
        "Longer regional hauls from the metro"
      ],
      "countySlugs": [
        "st-louis",
        "lake",
        "cook",
        "carlton",
        "itasca",
        "koochiching"
      ],
      "ctaLabel": "Explore Northeast / North Shore"
    }
  ],
  "costs": {
    "title": "Minnesota moving costs",
    "intro": "Minnesota pricing reflects Twin Cities labor markets, winter weather delays, multi-unit access, and long north–south hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Minnesota moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Minnesota local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, winter weather, and regional labor. Actual bids vary under permitted mover tariff frameworks. Always compare written estimates from MnDOT-permitted movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Twin Cities studio / 1BR",
        "value": "$550–$2,400+",
        "note": "Elevators and winter access dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,000+",
        "note": "Metro HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Minneapolis ↔ Rochester)",
        "value": "$1,800–$5,500+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Minneapolis ↔ Duluth or Moorhead)",
        "value": "$2,200–$7,500+",
        "note": "Weather and distance drive hours"
      },
      {
        "label": "Typical 2–3 person crew (Twin Cities)",
        "value": "$125–$230+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Winter ice and snow can erase productivity and force reschedules.",
      "Twin Cities multi-unit buildings add elevator and stair time.",
      "North Shore and Iron Range hills change truck access plans.",
      "College and medical lease cycles compress demand in Rochester and campus towns.",
      "Peak May–September fills crews early before winter risk rises."
    ]
  },
  "routes": {
    "title": "Popular Minnesota moving routes",
    "intro": "Minnesota sees strong outbound Sun Belt flows, short interstate hops into Wisconsin, North Dakota, Iowa, and South Dakota, and large Twin Cities internal traffic. Interstate jobs need FMCSA authority; in-state corridors need MnDOT-permitted household goods movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Minnesota → Florida",
        "href": "/moving-to/florida",
        "origins": "Twin Cities, Rochester",
        "transit": "Multi-day; snowbird seasonality",
        "planningNote": "Book early for fall/winter FL arrivals.",
        "note": "High-volume Upper Midwest-to-Florida corridor."
      },
      {
        "label": "Minnesota → Arizona / Texas",
        "href": "/local-movers/arizona",
        "origins": "Twin Cities metro",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular job and lifestyle outbound destinations."
      },
      {
        "label": "Minnesota → Wisconsin / Illinois",
        "href": "/local-movers/wisconsin",
        "origins": "Twin Cities, Southeast MN",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Hennepin County (Minneapolis)",
        "href": "/local-movers/minnesota/hennepin",
        "note": "Multi-unit elevators and dense urban staging."
      },
      {
        "label": "Moving to Ramsey County (St. Paul)",
        "href": "/local-movers/minnesota/ramsey",
        "note": "Urban stock and winter street logistics."
      },
      {
        "label": "Moving to Dakota County",
        "href": "/local-movers/minnesota/dakota",
        "note": "South-metro suburbs and HOA communities."
      }
    ]
  },
  "challenges": {
    "title": "Minnesota-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Minnesota moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Deep-freeze and ice access",
        "detail": "Driveways and loading zones can ice over for days. Build weather buffers November–March and share photos of approaches."
      },
      {
        "title": "Twin Cities multi-unit logistics",
        "detail": "Elevators, loading docks, and street permits dominate Minneapolis–St. Paul jobs. Reserve elevators early."
      },
      {
        "title": "North Shore and Duluth hills",
        "detail": "Steep grades may require smaller trucks or shuttle strategies. Confirm access with estimators before move day."
      },
      {
        "title": "Lake-cabin seasonal peaks",
        "detail": "Memorial Day through Labor Day compresses cabin-country demand. Book early for Crow Wing and lake counties."
      },
      {
        "title": "MnDOT permit verification",
        "detail": "Confirm the exact legal name holds an active Minnesota household goods mover permit before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Minnesota moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Minnesota local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Minnesota movers need a state permit?",
      "answer": "Yes. For-hire household goods movers operating within Minnesota generally need a Household Goods Mover Permit from MnDOT. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Minnesota mover?",
      "answer": "Use MnDOT OFCVO carrier search tools and match the legal name on your written estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Twin Cities move cost?",
      "answer": "Planning ranges often fall around $550–$2,400+ for a studio/1BR and more for larger homes, driven by elevators, stairs, and season. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Minneapolis-to-Duluth move intrastate?",
      "answer": "Yes — both ends are in Minnesota, so you generally need a MnDOT-permitted household goods mover."
    },
    {
      "question": "When is peak moving season in Minnesota?",
      "answer": "Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak."
    },
    {
      "question": "Does a Twin Cities-to-Wisconsin move need FMCSA authority?",
      "answer": "Yes. Crossing state lines generally requires active FMCSA operating authority even for short hops."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "MnDOT — Household goods movers",
        "href": "https://www.dot.state.mn.us/cvo/household-goods.html"
      },
      {
        "label": "Minnesota eLicense — HHG Mover Permit",
        "href": "https://mn.gov/elicense/a-z/?id=1083-230879"
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
