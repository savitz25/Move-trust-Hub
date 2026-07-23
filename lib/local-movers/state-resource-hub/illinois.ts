import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 2):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const illinoisStateResourceHub: StateResourceHubPack = {
  "stateSlug": "illinois",
  "stateCode": "IL",
  "h1": "Illinois Moving Resource Hub: Costs, ICC Licensing & 102 County Guides",
  "metaTitle": "Illinois Movers Guide 2026 — Costs, ICC Licensing & 102 County Guides",
  "metaDescription": "Plan a move within, to, or from Illinois. Compare local and intrastate costs, verify Illinois Commerce Commission household goods licenses, browse 102 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Illinois moves in 2026 — typical costs, ICC vs FMCSA rules, Chicago-to-downstate regional guides, and tools to compare licensed movers without paid placements.",
  "trustBar": [
    "102 County Guides",
    "Verified Movers",
    "ICC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Illinois",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Illinois",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Illinois",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Illinois markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Illinois Moving Cost",
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
    "title": "Why moving in Illinois is different",
    "paragraphs": [
      "Illinois is not one moving market. Chicago high-rises and alley staging, collar-county HOAs, Central Illinois college towns, Metro East St. Louis logistics, and rural Southern Illinois driveways produce different access and labor profiles under one state name.",
      "Intrastate household goods movers must hold a Household Goods license from the Illinois Commerce Commission (ICC). Interstate jobs need FMCSA authority. Winter weather, lake-effect snow in the north, and long I-55/I-57 hauls are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Illinois moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Illinois local and intrastate patterns; they are not bids. Always compare written estimates from ICC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Chicago studio / 1BR",
        "value": "$600–$2,500+",
        "note": "Walk-ups, elevators, and alley staging dominate"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,800–$5,500+",
        "note": "Collar-county HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Chicago ↔ Springfield)",
        "value": "$2,200–$7,000+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter weather can force flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · TX · AZ · IN · WI · MO",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "102",
        "note": "Chicago metro emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Illinois moving regulations & consumer protection",
    "intro": "Illinois requires for-hire household goods movers operating within the state to hold a Household Goods license from the Illinois Commerce Commission (ICC). Match the license to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Illinois)",
      "body": "If origin or destination is outside Illinois, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An ICC household goods license alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Illinois)",
      "body": "For-hire transportation of household property within Illinois generally requires an ICC Household Goods license. Consumers can search licensed household goods movers and related complaint information through ICC motor carrier search tools."
    },
    "verifySteps": [
      "Classify the job: entirely in Illinois (ICC) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: search the ICC household goods / motor carrier tools for an active license.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, confirm insurance and valuation, and keep contracts.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "ICC licensing requirement",
        "detail": "Illinois guidance states businesses engaged in for-hire household goods transportation must obtain a Household Goods license from the ICC. Operating without a valid license can trigger enforcement."
      },
      {
        "title": "Complaint visibility",
        "detail": "ICC consumer tools may show complaint history for licensed movers — review before you hire."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing."
      }
    ],
    "officialLinks": [
      {
        "label": "Illinois — Household Goods Movers service page",
        "href": "https://www.illinois.gov/services/service.household-goods-movers.html",
        "external": true
      },
      {
        "label": "ICC motor carrier search",
        "href": "https://www.icc.illinois.gov/emdb/mcis/search",
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
    "disclaimer": "Licensing rules and lookup tools can change. Always verify current ICC license or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "chicago-metro",
      "name": "Chicago Metro",
      "shortName": "Chicago Metro",
      "blurb": "Cook and collar counties: high-rises, alleys, elevators/COI, and dense suburban HOAs around the city.",
      "challenges": [
        "Walk-ups, elevators, and alley staging",
        "Expressway congestion and permit rules"
      ],
      "countySlugs": [
        "cook",
        "dupage",
        "kane",
        "lake",
        "mchenry",
        "will",
        "kendall",
        "grundy",
        "dekalb"
      ],
      "ctaLabel": "Explore Chicago metro"
    },
    {
      "id": "northern-il",
      "name": "Northern Illinois",
      "shortName": "Northern IL",
      "blurb": "Rockford corridor and northwestern counties with mixed suburban and rural lots outside the core collar.",
      "challenges": [
        "Winter weather windows",
        "Longer hauls into Chicago"
      ],
      "countySlugs": [
        "boone",
        "winnebago",
        "ogle",
        "stephenson",
        "jo-daviess",
        "carroll",
        "whiteside",
        "lee",
        "rock-island",
        "henry",
        "bureau",
        "putnam",
        "lasalle",
        "livingston"
      ],
      "ctaLabel": "Explore Northern Illinois"
    },
    {
      "id": "central-il",
      "name": "Central Illinois",
      "shortName": "Central IL",
      "blurb": "Springfield, Peoria, Champaign–Urbana, and Bloomington–Normal hubs with college and government calendars.",
      "challenges": [
        "University move-in peaks",
        "Heat and winter extremes"
      ],
      "countySlugs": [
        "sangamon",
        "menard",
        "logan",
        "macon",
        "christian",
        "montgomery",
        "shelby",
        "moultrie",
        "douglas",
        "coles",
        "champaign",
        "piatt",
        "de-witt",
        "mclean",
        "tazewell",
        "peoria",
        "woodford",
        "marshall",
        "stark",
        "knox",
        "fulton",
        "mason",
        "cass",
        "morgan",
        "scott",
        "greene",
        "macoupin",
        "jersey",
        "calhoun"
      ],
      "ctaLabel": "Explore Central Illinois"
    },
    {
      "id": "metro-east",
      "name": "Metro East / Southern Metro",
      "shortName": "Metro East",
      "blurb": "St. Louis metro Illinois side and southern industrial corridors with cross-river logistics context.",
      "challenges": [
        "Cross-metro traffic patterns",
        "Mix of urban and rural access"
      ],
      "countySlugs": [
        "madison",
        "st-clair",
        "monroe",
        "clinton",
        "bond",
        "washington",
        "randolph",
        "perry",
        "jackson",
        "williamson",
        "franklin",
        "jefferson",
        "marion"
      ],
      "ctaLabel": "Explore Metro East"
    },
    {
      "id": "southern-il",
      "name": "Southern Illinois",
      "shortName": "Southern IL",
      "blurb": "Smaller metros and rural counties with longer driveways and thinner local crew coverage.",
      "challenges": [
        "Confirm mover coverage for remote addresses",
        "Long portal-to-portal distances"
      ],
      "countySlugs": [
        "alexander",
        "pulaski",
        "massac",
        "pope",
        "hardin",
        "gallatin",
        "saline",
        "white",
        "hamilton",
        "wayne",
        "edwards",
        "wabash",
        "lawrence",
        "richland",
        "crawford",
        "jasper",
        "clay",
        "effingham",
        "fayette",
        "cumberland",
        "clark",
        "edgar",
        "vermilion"
      ],
      "ctaLabel": "Explore Southern Illinois"
    },
    {
      "id": "rest-illinois",
      "name": "Other Illinois Counties",
      "shortName": "Rest of IL",
      "blurb": "Remaining counties outside the primary metro and regional groupings.",
      "challenges": [
        "Rural driveway access",
        "Crew travel time from larger hubs"
      ],
      "countySlugs": [
        "adams",
        "brown",
        "ford",
        "hancock",
        "henderson",
        "iroquois",
        "johnson",
        "kankakee",
        "mcdonough",
        "mercer",
        "pike",
        "schuyler",
        "union",
        "warren"
      ],
      "ctaLabel": "Explore remaining counties"
    }
  ],
  "costs": {
    "title": "Illinois moving costs",
    "intro": "Illinois pricing reflects Chicago labor intensity, building accessorials, collar-county HOAs, and long downstate distances. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Illinois moving costs",
      "lastReviewed": "2026-07-22",
      "body": "These ranges are planning estimates, not quotes. They combine typical Illinois local and intrastate patterns: home size, distance, elevators/stairs, parking, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from ICC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Chicago studio / 1BR",
        "value": "$600–$2,500+",
        "note": "Walk-ups and elevators dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,600–$4,500+",
        "note": "HOA soft costs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Chicago ↔ Champaign)",
        "value": "$2,000–$6,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Chicago ↔ Metro East)",
        "value": "$2,400–$7,500+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2–3 person crew (Chicago metro)",
        "value": "$140–$250+/hr",
        "note": "Portal-to-portal; access drives hours"
      }
    ],
    "factors": [
      "Chicago walk-ups, elevators, and alley loading add labor time.",
      "Collar-county HOAs often require COI and approved hours.",
      "Winter weather can slow upstate/northern jobs and force reschedules.",
      "Long I-55 / I-57 / I-80 hauls affect portal-to-portal pricing.",
      "Peak May–September and month-end leases fill crews early."
    ]
  },
  "routes": {
    "title": "Popular Illinois moving routes",
    "intro": "Illinois is a Midwest hub with strong Chicago outbound lanes and internal Chicago–downstate flows. Interstate jobs need FMCSA authority; in-state corridors need ICC-licensed household goods movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Illinois → Florida",
        "href": "/moving-to/florida",
        "origins": "Chicago metro, Central Illinois",
        "transit": "Multi-day; strong snowbird seasonality",
        "planningNote": "Book early for fall/winter FL arrivals.",
        "note": "High-volume Midwest-to-Florida corridor."
      },
      {
        "label": "Illinois → Texas / Southwest",
        "href": "/moving-to/texas",
        "origins": "Chicago metro",
        "transit": "Multi-day linehaul",
        "planningNote": "Large inventories and heat at destination.",
        "note": "Common job and lifestyle outbound lane."
      },
      {
        "label": "Illinois → Indiana / Wisconsin",
        "href": "/moving-to/indiana",
        "origins": "Chicago collar counties",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Cook County (Chicago)",
        "href": "/local-movers/illinois/cook",
        "note": "High-rise and walk-up access dominate many arrivals."
      },
      {
        "label": "Moving to DuPage County",
        "href": "/local-movers/illinois/dupage",
        "note": "Collar-county HOAs and suburban lots."
      },
      {
        "label": "Moving to Champaign County",
        "href": "/local-movers/illinois/champaign",
        "note": "University calendars and mid-state logistics."
      }
    ]
  },
  "challenges": {
    "title": "Illinois-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Illinois moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Chicago walk-ups and elevators",
        "detail": "Multi-flight walk-ups and reserved freight elevators with COI requirements drive hours even on short distances. Confirm building rules early."
      },
      {
        "title": "Alley and street staging limits",
        "detail": "Limited curb space and alley access can force smaller trucks or longer carries. Plan permits and staging in advance."
      },
      {
        "title": "Winter weather",
        "detail": "Snow and ice affect driveways, loading docks, and schedules — especially outside the city core. Build weather buffer into winter moves."
      },
      {
        "title": "Collar-county HOAs",
        "detail": "Many suburbs require certificates of insurance, approved hours, and gate lists. Incomplete paperwork delays crews."
      },
      {
        "title": "Long downstate distances",
        "detail": "Chicago to Southern Illinois is not a local hop. Treat long in-state hauls as distance moves with correct ICC licensing."
      },
      {
        "title": "University and lease calendars",
        "detail": "Champaign–Urbana, Normal, and Chicago lease cycles create peak windows. Book early for May and August."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Illinois moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Illinois local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "How are movers regulated in Illinois?",
      "answer": "For-hire household goods movers operating within Illinois generally need a Household Goods license from the Illinois Commerce Commission (ICC). Interstate moves that cross state lines require federal FMCSA operating authority and a USDOT number. Confirm which framework applies to your exact origin and destination."
    },
    {
      "question": "How do I verify an Illinois mover is licensed?",
      "answer": "Use ICC motor carrier / household goods search tools to confirm an active license for the legal company name on your estimate. For interstate work, also verify USDOT / MC on FMCSA SAFER before paying a deposit."
    },
    {
      "question": "When is the best time to move in Illinois?",
      "answer": "Demand peaks late spring through early fall and around month-end leases. Mid-week mornings are often easier. Winter weather can force flexible dates, especially in northern counties."
    },
    {
      "question": "Why are Chicago moves expensive?",
      "answer": "Labor intensity from stairs, elevators, long carries, COI windows, and limited truck staging drives hours up even for short distances. Access often matters more than miles."
    },
    {
      "question": "Is an ICC license enough for a move to Florida?",
      "answer": "No. Crossing state lines generally requires FMCSA interstate authority. An ICC household goods license covers Illinois intrastate for-hire household goods operations — not interstate operating authority."
    },
    {
      "question": "What should I check before hiring any Illinois mover?",
      "answer": "Active ICC license for in-state work (or FMCSA for interstate), written estimate, insurance/valuation clarity, and complaint history where available. Avoid large cash deposits to unverified operators."
    }
  ],
  "trust": {
    "byline": "Curated by the Move Trust Hub editorial team",
    "lastReviewed": "2026-07-22",
    "methodology": "County guides combine public licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "Illinois — Household Goods Movers",
        "href": "https://www.illinois.gov/services/service.household-goods-movers.html"
      },
      {
        "label": "ICC motor carrier search",
        "href": "https://www.icc.illinois.gov/emdb/mcis/search"
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
