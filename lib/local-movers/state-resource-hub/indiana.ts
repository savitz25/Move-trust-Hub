import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 4):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const indianaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "indiana",
  "stateCode": "IN",
  "h1": "Indiana Moving Resource Hub: Costs, DOR Intrastate Authority & 92 County Guides",
  "metaTitle": "Indiana Movers Guide 2026 — Costs, DOR HHG Authority & 92 County Guides",
  "metaDescription": "Plan a move within, to, or from Indiana. Compare local and intrastate costs, verify Indiana DOR household goods operating authority, browse 92 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Indiana moves in 2026 — typical costs, DOR intrastate vs FMCSA rules, Indy-to-Region regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "92 County Guides",
    "Verified Movers",
    "IN DOR & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Indiana",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Indiana",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Indiana",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Indiana markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Indiana Moving Cost",
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
    "title": "Why moving in Indiana is different",
    "paragraphs": [
      "Indiana is not one moving market. Indianapolis multi-unit and HOA suburbs, Northwest Indiana Chicago-adjacent logistics, Fort Wayne industrial corridors, college towns, and Ohio River border hops produce different access and labor profiles under one state name.",
      "Intrastate household goods carriers need Indiana Intrastate Operating Authority through the Department of Revenue Motor Carrier Services. Interstate jobs need FMCSA authority. Winter weather, Indy 500-week congestion, and short cross-border jobs into Illinois, Ohio, Kentucky, and Michigan are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Indiana moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Indiana local and intrastate patterns; they are not bids. Always compare written estimates from DOR-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Indy studio / 1BR",
        "value": "$500–$2,200+",
        "note": "Stairs, elevators, and parking vary"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,600–$5,000+",
        "note": "Collar-county HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Indy ↔ Fort Wayne)",
        "value": "$1,800–$5,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter weather forces flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · TX · IL · OH · KY · AZ",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "92",
        "note": "Indianapolis metro emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Indiana moving regulations & consumer protection",
    "intro": "Indiana requires for-hire household goods transportation within the state to hold Intrastate Operating Authority through the Department of Revenue Motor Carrier Services. Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Indiana)",
      "body": "If origin or destination is outside Indiana, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Indiana intrastate household goods authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Indiana)",
      "body": "Moving companies that transport household goods for hire within Indiana must obtain Indiana Intrastate Operating Authority through DOR Motor Carrier Services, including household goods-related application materials, insurance filings, and tariff information as required. Consumers should verify authority before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Indiana (DOR intrastate authority) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm Indiana Intrastate Operating Authority for household goods with DOR Motor Carrier Services resources.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance/valuation clarity, and inventory details.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Intrastate operating authority",
        "detail": "Indiana DOR Motor Carrier Services licenses passenger and household goods transportation providers operating within the state."
      },
      {
        "title": "Insurance and tariff filings",
        "detail": "Authority applications typically require proof of insurance and rate/tariff materials — ask carriers for written proof covering your job."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing."
      }
    ],
    "officialLinks": [
      {
        "label": "IN DOR — Intrastate passenger & household goods authority",
        "href": "https://www.in.gov/dor/motor-carrier-services/usdot-and-ucr/indiana-intrastate-passenger-and-household-good-authority/",
        "external": true
      },
      {
        "label": "IN DOR — Motor Carrier Services",
        "href": "https://www.in.gov/dor/motor-carrier-services/",
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
    "disclaimer": "Licensing rules and forms can change. Always verify current Indiana intrastate authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "indianapolis-central",
      "name": "Indianapolis & Central Indiana",
      "shortName": "Indy / Central",
      "blurb": "Marion and collar counties with multi-unit access, HOA suburbs, and I-65/I-70 logistics.",
      "challenges": [
        "HOA windows in growth suburbs",
        "Event-week congestion in Indy"
      ],
      "countySlugs": [
        "marion",
        "hamilton",
        "hancock",
        "hendricks",
        "johnson",
        "morgan",
        "boone",
        "madison",
        "shelby",
        "brown",
        "putnam",
        "clinton",
        "tipton"
      ],
      "ctaLabel": "Explore Indianapolis / Central"
    },
    {
      "id": "northwest-in",
      "name": "Northwest Indiana",
      "shortName": "Northwest IN",
      "blurb": "Lake, Porter, and South Bend–area counties with Chicago-adjacent traffic and industrial towns.",
      "challenges": [
        "Cross-metro traffic toward Chicago",
        "Short IL hops still need FMCSA authority"
      ],
      "countySlugs": [
        "lake",
        "porter",
        "laporte",
        "newton",
        "jasper",
        "starke",
        "pulaski",
        "st-joseph",
        "elkhart",
        "marshall"
      ],
      "ctaLabel": "Explore Northwest Indiana"
    },
    {
      "id": "northeast-in",
      "name": "Northeast Indiana",
      "shortName": "Northeast IN",
      "blurb": "Fort Wayne and surrounding counties with industrial corridors and mixed suburban-rural stock.",
      "challenges": [
        "Winter weather productivity loss",
        "Longer regional hauls to Indy"
      ],
      "countySlugs": [
        "allen",
        "dekalb",
        "steuben",
        "noble",
        "whitley",
        "huntington",
        "wells",
        "adams",
        "jay",
        "blackford",
        "grant",
        "wabash",
        "miami",
        "kosciusko",
        "lagrange",
        "fulton"
      ],
      "ctaLabel": "Explore Northeast Indiana"
    },
    {
      "id": "west-central",
      "name": "West Central Indiana",
      "shortName": "West Central",
      "blurb": "Lafayette, Terre Haute, and west-central counties with college towns and agricultural corridors.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "tippecanoe",
        "white",
        "carroll",
        "cass",
        "howard",
        "clay",
        "vigo",
        "sullivan",
        "vermillion",
        "fountain",
        "warren",
        "montgomery",
        "parke",
        "benton"
      ],
      "ctaLabel": "Explore West Central Indiana"
    },
    {
      "id": "east-central",
      "name": "East Central Indiana",
      "shortName": "East Central",
      "blurb": "Muncie, Bloomington approaches, and east-central counties with college and manufacturing mix.",
      "challenges": [
        "Campus and manufacturing shift timing",
        "Older multi-story stock in small cities"
      ],
      "countySlugs": [
        "delaware",
        "randolph",
        "wayne",
        "henry",
        "rush",
        "fayette",
        "union",
        "franklin",
        "decatur",
        "bartholomew",
        "jennings",
        "jackson",
        "lawrence",
        "monroe",
        "owen",
        "greene"
      ],
      "ctaLabel": "Explore East Central Indiana"
    },
    {
      "id": "southwest-in",
      "name": "Southwest & Southern Indiana",
      "shortName": "Southwest / South",
      "blurb": "Evansville, New Albany–Jeffersonville, and Ohio River counties with Kentucky and Ohio border hops.",
      "challenges": [
        "River-city logistics and hills",
        "Short KY/OH hops need FMCSA authority"
      ],
      "countySlugs": [
        "vanderburgh",
        "warrick",
        "gibson",
        "posey",
        "spencer",
        "perry",
        "dubois",
        "pike",
        "knox",
        "daviess",
        "martin",
        "orange",
        "crawford",
        "harrison",
        "floyd",
        "clark",
        "scott",
        "jefferson",
        "switzerland",
        "ohio",
        "washington",
        "dearborn",
        "ripley"
      ],
      "ctaLabel": "Explore Southwest / South Indiana"
    }
  ],
  "costs": {
    "title": "Indiana moving costs",
    "intro": "Indiana pricing reflects Indianapolis labor markets, collar-county HOAs, winter weather, and long cross-state hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Indiana moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Indiana local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, winter weather, and regional labor. Actual bids vary. Always compare written estimates from DOR-authorized movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Indianapolis studio / 1BR",
        "value": "$500–$2,200+",
        "note": "Access varies by building"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,600–$4,800+",
        "note": "Collar HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Indy ↔ Lafayette)",
        "value": "$1,700–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Indy ↔ Evansville or Fort Wayne)",
        "value": "$2,200–$7,000+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2–3 person crew (Indy metro)",
        "value": "$120–$220+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Collar-county HOAs add elevator and loading windows.",
      "Winter weather can erase productivity and force reschedules.",
      "Northwest Indiana jobs may include Chicago-adjacent traffic time.",
      "College towns create concentrated lease-end demand.",
      "Border hops into IL/OH/KY/MI are interstate even when short."
    ]
  },
  "routes": {
    "title": "Popular Indiana moving routes",
    "intro": "Indiana sees strong outbound flows to Sun Belt states and constant short interstate hops into Illinois, Ohio, Kentucky, and Michigan, plus large Indianapolis internal traffic. Interstate jobs need FMCSA authority; in-state corridors need DOR-authorized movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Indiana → Florida",
        "href": "/moving-to/florida",
        "origins": "Indianapolis, Northwest IN",
        "transit": "Multi-day; snowbird seasonality",
        "planningNote": "Book early for fall/winter FL arrivals.",
        "note": "High-volume Midwest-to-Florida corridor."
      },
      {
        "label": "Indiana → Texas / Arizona",
        "href": "/local-movers/texas",
        "origins": "Indianapolis metro",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular job and lifestyle outbound destinations."
      },
      {
        "label": "Indiana → Illinois / Ohio / Kentucky",
        "href": "/local-movers/illinois",
        "origins": "Northwest, East, and South IN",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Marion County (Indianapolis)",
        "href": "/local-movers/indiana/marion",
        "note": "Multi-unit access and dense urban staging."
      },
      {
        "label": "Moving to Hamilton County",
        "href": "/local-movers/indiana/hamilton",
        "note": "Growth suburbs and HOA calendars."
      },
      {
        "label": "Moving to Lake County",
        "href": "/local-movers/indiana/lake",
        "note": "Chicago-adjacent logistics and industrial towns."
      }
    ]
  },
  "challenges": {
    "title": "Indiana-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Indiana moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Indianapolis collar HOAs",
        "detail": "Hamilton, Hendricks, and Johnson suburbs often restrict elevator and loading hours. Get rules in writing before booking."
      },
      {
        "title": "Winter weather windows",
        "detail": "Snow and ice can shut down driveway access. Build weather buffers November–March statewide."
      },
      {
        "title": "Northwest Indiana cross-border jobs",
        "detail": "Jobs that cross into Illinois are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "College lease peaks",
        "detail": "Bloomington, West Lafayette, and other campus markets compress demand around August. Book early."
      },
      {
        "title": "Authority verification",
        "detail": "Confirm Indiana Intrastate Operating Authority for household goods before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Indiana moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Indiana local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Indiana movers need state authority?",
      "answer": "Yes. For-hire household goods transportation within Indiana generally requires Intrastate Operating Authority from the Department of Revenue Motor Carrier Services. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify an Indiana mover?",
      "answer": "Confirm Intrastate Operating Authority for the legal name on your estimate via DOR Motor Carrier Services resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Indianapolis move cost?",
      "answer": "Planning ranges often fall around $500–$2,200+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is an Indy-to-Fort Wayne move intrastate?",
      "answer": "Yes — both ends are in Indiana, so you generally need a DOR-authorized household goods carrier."
    },
    {
      "question": "When is peak moving season in Indiana?",
      "answer": "Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak."
    },
    {
      "question": "Does a Hammond-to-Chicago move need FMCSA authority?",
      "answer": "Yes. Crossing into Illinois is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "IN DOR — Intrastate HHG authority",
        "href": "https://www.in.gov/dor/motor-carrier-services/usdot-and-ucr/indiana-intrastate-passenger-and-household-good-authority/"
      },
      {
        "label": "IN DOR — Motor Carrier Services",
        "href": "https://www.in.gov/dor/motor-carrier-services/"
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
