import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 1):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const newYorkStateResourceHub: StateResourceHubPack = {
  "stateSlug": "new-york",
  "stateCode": "NY",
  "h1": "New York Moving Resource Hub: Costs, NYSDOT Licensing & 62 County Guides",
  "metaTitle": "New York Movers Guide 2026 — Costs, NYSDOT Licensing & 62 County Guides",
  "metaDescription": "Plan a move within, to, or from New York. Compare local and intrastate costs, verify NYSDOT household goods authority, browse 62 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for New York moves in 2026 — typical costs, NYSDOT vs FMCSA rules, NYC-to-upstate regional guides, and tools to compare licensed movers without paid placements.",
  "trustBar": [
    "62 County Guides",
    "Verified Movers",
    "NYSDOT & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within New York",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To New York",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From New York",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how New York markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My New York Moving Cost",
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
    "title": "Why moving in New York is different",
    "paragraphs": [
      "New York is not one moving market. NYC walk-ups and freight elevators, Long Island parkways, Hudson Valley estates, and upstate rural driveways produce different access, labor time, and soft costs under one state name.",
      "Intrastate household goods movers must hold authority from the New York State Department of Transportation (NYSDOT). Interstate jobs need FMCSA authority. Building COIs, alternate-side parking, winter weather, and co-op rules are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "New York moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical New York local and intrastate patterns; they are not bids. Always compare written estimates from NYSDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical NYC studio / 1BR",
        "value": "$700–$2,800+",
        "note": "Walk-ups, elevators, and parking dominate cost"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$2,000–$6,500+",
        "note": "Long Island / Westchester access varies"
      },
      {
        "label": "Intrastate corridor (e.g. NYC ↔ Albany)",
        "value": "$2,500–$8,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September + month-end",
        "note": "NYC lease cycles intensify demand"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · NJ · PA · NC · TX · CT",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "62",
        "note": "NYC, Long Island, and upstate coverage"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "New York moving regulations & consumer protection",
    "intro": "New York requires household goods movers operating within the state to be licensed by the New York State Department of Transportation (NYSDOT). Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside New York)",
      "body": "If origin or destination is outside New York, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. NYSDOT intrastate authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within New York)",
      "body": "Moves within New York State generally require NYSDOT household goods moving authority. Consumers should verify licensing with NYSDOT (contact channels published by the Department) and insist on required consumer information materials, including the Summary of Information booklet describing shipper rights."
    },
    "verifySteps": [
      "Classify the job: entirely in New York (NYSDOT) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name and NYDOT / USDOT numbers from the written estimate.",
      "Intrastate: verify the mover is licensed by NYSDOT before hiring.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Require an Order for Service with a clear dollar amount and keep copies of everything you sign.",
      "Make an inventory and understand released vs additional valuation coverage."
    ],
    "protections": [
      {
        "title": "Summary of Information booklet",
        "detail": "NYSDOT expects movers to provide consumer information materials describing shipper rights. Ask for the Summary of Information booklet before you sign."
      },
      {
        "title": "Order for Service",
        "detail": "Before anything moves, ensure you have an Order for Service stating amounts due and key terms. Read it carefully and keep a copy."
      },
      {
        "title": "Claims",
        "detail": "File written claims for loss or damage with the mover promptly. Document condition with photos and inventories."
      }
    ],
    "officialLinks": [
      {
        "label": "NYSDOT — Moving (consumer guidance)",
        "href": "https://www.dot.ny.gov/divisions/operating/osss/truck/moving",
        "external": true
      },
      {
        "label": "NYSDOT — Registration & licensing",
        "href": "https://www.dot.ny.gov/divisions/operating/osss/truck/registration-licensing",
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
    "disclaimer": "Licensing rules and verification processes can change. Always verify current NYSDOT authority or FMCSA status for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "nyc",
      "name": "New York City",
      "shortName": "NYC",
      "blurb": "Five boroughs of walk-ups, freight elevators, COI rules, street permits, and high labor intensity.",
      "challenges": [
        "Walk-ups, elevators, and COI windows",
        "Street parking and loading constraints"
      ],
      "countySlugs": [
        "bronx",
        "kings",
        "new-york",
        "queens",
        "richmond"
      ],
      "ctaLabel": "Explore NYC boroughs"
    },
    {
      "id": "long-island",
      "name": "Long Island",
      "shortName": "Long Island",
      "blurb": "Nassau and Suffolk parkways, suburban lots, barrier-beach access, and summer traffic.",
      "challenges": [
        "Parkway congestion and bridge timing",
        "Seasonal beach-community access"
      ],
      "countySlugs": [
        "nassau",
        "suffolk"
      ],
      "ctaLabel": "Explore Long Island"
    },
    {
      "id": "hudson-valley",
      "name": "Lower Hudson Valley",
      "shortName": "Hudson Valley",
      "blurb": "Westchester through the mid-Hudson: estates, older multi-story homes, and NYC-adjacent commuting patterns.",
      "challenges": [
        "Older homes with tight stairs",
        "Commuter-corridor traffic peaks"
      ],
      "countySlugs": [
        "westchester",
        "rockland",
        "putnam",
        "orange",
        "dutchess",
        "ulster",
        "sullivan"
      ],
      "ctaLabel": "Explore Hudson Valley"
    },
    {
      "id": "capital-region",
      "name": "Capital Region",
      "shortName": "Capital Region",
      "blurb": "Albany–Schenectady–Troy government and university calendars with surrounding suburban and rural lots.",
      "challenges": [
        "Winter weather windows",
        "Mix of urban and rural access"
      ],
      "countySlugs": [
        "albany",
        "rensselaer",
        "schenectady",
        "saratoga",
        "columbia",
        "greene",
        "warren",
        "washington",
        "fulton",
        "montgomery",
        "schoharie"
      ],
      "ctaLabel": "Explore Capital Region"
    },
    {
      "id": "western-ny",
      "name": "Western New York",
      "shortName": "Western NY",
      "blurb": "Buffalo–Niagara lake-effect weather, older housing stock, and industrial-edge logistics.",
      "challenges": [
        "Lake-effect snow planning",
        "Older multi-story homes"
      ],
      "countySlugs": [
        "erie",
        "niagara",
        "chautauqua",
        "cattaraugus",
        "allegany",
        "wyoming",
        "genesee",
        "orleans"
      ],
      "ctaLabel": "Explore Western NY"
    },
    {
      "id": "finger-lakes",
      "name": "Rochester & Finger Lakes",
      "shortName": "Finger Lakes",
      "blurb": "Rochester metro plus lake-country towns with mixed suburban and rural driveway access.",
      "challenges": [
        "Winter weather",
        "Longer regional hauls between towns"
      ],
      "countySlugs": [
        "monroe",
        "livingston",
        "ontario",
        "wayne",
        "seneca",
        "yates",
        "schuyler",
        "steuben",
        "chemung"
      ],
      "ctaLabel": "Explore Finger Lakes"
    },
    {
      "id": "central-ny",
      "name": "Central New York",
      "shortName": "Central NY",
      "blurb": "Syracuse and surrounding counties with university calendars and mixed urban/rural stock.",
      "challenges": [
        "Snow and ice access",
        "Thinner coverage outside the metro"
      ],
      "countySlugs": [
        "onondaga",
        "cayuga",
        "oswego",
        "madison",
        "cortland",
        "oneida",
        "herkimer",
        "otsego",
        "chenango",
        "tioga",
        "broome",
        "tompkins"
      ],
      "ctaLabel": "Explore Central NY"
    },
    {
      "id": "north-country",
      "name": "North Country",
      "shortName": "North Country",
      "blurb": "Adirondack and northern border counties with rural driveways, tourism seasonality, and weather exposure.",
      "challenges": [
        "Rural mountain access",
        "Seasonal road and weather constraints"
      ],
      "countySlugs": [
        "clinton",
        "franklin",
        "st-lawrence",
        "jefferson",
        "lewis",
        "essex",
        "hamilton"
      ],
      "ctaLabel": "Explore North Country"
    },
    {
      "id": "rest-ny",
      "name": "Southern Tier & Remaining Counties",
      "shortName": "Southern Tier+",
      "blurb": "Remaining counties including Southern Tier communities with smaller metros and rural approaches.",
      "challenges": [
        "Longer crew travel times",
        "Rural driveway access"
      ],
      "countySlugs": [
        "delaware"
      ],
      "ctaLabel": "Explore remaining NY counties"
    }
  ],
  "costs": {
    "title": "New York moving costs",
    "intro": "New York pricing reflects NYC labor intensity, building accessorials, Long Island/Westchester suburban patterns, and winter productivity. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate New York moving costs",
      "lastReviewed": "2026-07-22",
      "body": "These ranges are planning estimates, not quotes. They combine typical New York local and intrastate patterns: home size, distance, walk-ups/elevators, parking, co-op/HOA rules, seasonality, and regional labor. Actual bids vary. Always compare written estimates from NYSDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "NYC studio / 1BR (walk-up or elevator)",
        "value": "$700–$2,800+",
        "note": "Flights of stairs and COI dominate"
      },
      {
        "label": "Suburban 2–3BR (LI / Westchester)",
        "value": "$1,800–$5,000+",
        "note": "Driveway access still varies"
      },
      {
        "label": "Intrastate mid-size (e.g. NYC ↔ Hudson Valley)",
        "value": "$2,200–$7,000+",
        "note": "Season and packing matter"
      },
      {
        "label": "Intrastate long (e.g. NYC ↔ Buffalo)",
        "value": "$3,000–$9,500+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2–3 person crew (downstate)",
        "value": "$150–$280+/hr",
        "note": "Portal-to-portal; access drives hours"
      }
    ],
    "factors": [
      "NYC walk-ups and freight elevators add substantial labor time.",
      "Building COI and move windows are common in multi-unit properties.",
      "Street parking rules and permits can force long carries.",
      "Winter weather affects upstate pacing and scheduling.",
      "Peak lease cycles and summer weekends fill crews early."
    ]
  },
  "routes": {
    "title": "Popular New York moving routes",
    "intro": "New York is a major outbound origin (especially from NYC metro) and has large internal NYC–upstate flows. Interstate jobs need FMCSA authority; in-state corridors need NYSDOT-authorized movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "New York → Florida",
        "href": "/moving-to/florida",
        "origins": "NYC, Long Island, Lower Hudson",
        "transit": "Multi-day; strong snowbird seasonality",
        "planningNote": "Book early for fall/winter coastal FL arrivals.",
        "note": "One of the highest-volume outbound lanes from the Northeast."
      },
      {
        "label": "New York → New Jersey / Pennsylvania",
        "href": "/moving-to/new-jersey",
        "origins": "NYC, Westchester, Long Island",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common cross-Hudson and I-80 corridor moves."
      },
      {
        "label": "New York → North Carolina / South",
        "href": "/moving-to/north-carolina",
        "origins": "NYC metro, Upstate",
        "transit": "Multi-day I-95 corridor",
        "planningNote": "Inventory size and elevator origins drive cost.",
        "note": "Popular lifestyle outbound destinations."
      }
    ],
    "inbound": [
      {
        "label": "Moving to New York County (Manhattan)",
        "href": "/local-movers/new-york/new-york",
        "note": "Elevators, COI, and street logistics dominate."
      },
      {
        "label": "Moving to Kings County (Brooklyn)",
        "href": "/local-movers/new-york/kings",
        "note": "Walk-ups and tight street staging are common."
      },
      {
        "label": "Moving to Westchester County",
        "href": "/local-movers/new-york/westchester",
        "note": "Suburban lots with NYC-adjacent traffic patterns."
      }
    ]
  },
  "challenges": {
    "title": "New York-specific moving challenges & tips",
    "intro": "These issues show up constantly on real New York moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Walk-ups and elevator reservations",
        "detail": "NYC and dense multi-unit buildings often need reserved elevators, padding, and COI certificates. Confirm windows before you book."
      },
      {
        "title": "Street parking and loading rules",
        "detail": "Alternate-side rules, hydrants, and limited curb space can force long carries or permits. Plan staging early."
      },
      {
        "title": "Co-op and condo board requirements",
        "detail": "Many buildings require certificates of insurance, certificates of good standing, and fixed move hours. Incomplete paperwork delays crews."
      },
      {
        "title": "Winter weather (especially upstate)",
        "detail": "Snow and ice change driveway access and pacing. Build weather buffer into schedules north and west of NYC."
      },
      {
        "title": "Parkway and bridge congestion",
        "detail": "Long Island and Hudson crossings can double portal-to-portal time at peak. Prefer mid-week mornings."
      },
      {
        "title": "Rural upstate access",
        "detail": "North Country and rural counties may involve long driveways and thinner crew coverage — confirm the mover serves your exact address."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate New York moves."
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
      "description": "Interstate-ready planning checklist you can adapt for New York local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "How are movers regulated in New York?",
      "answer": "Intrastate household goods movers generally need authority from the New York State Department of Transportation (NYSDOT). Interstate moves require federal FMCSA operating authority and a USDOT number. Confirm which framework applies to your exact origin and destination."
    },
    {
      "question": "How do I verify a New York mover is licensed?",
      "answer": "Verify NYSDOT licensing using Department guidance and contact channels for household goods movers. For interstate work, check FMCSA SAFER for USDOT / MC status. Match the legal name on your estimate to official records before paying a deposit."
    },
    {
      "question": "What documents should I receive before a New York move?",
      "answer": "Ask for consumer information materials (including the Summary of Information booklet), a written estimate, and an Order for Service with clear amounts. Keep copies of everything you sign and create your own inventory."
    },
    {
      "question": "When is the best time to move in New York?",
      "answer": "Demand peaks late spring through early fall and around month-end NYC lease cycles. Mid-week mornings are often easier for elevators and street loading. Upstate winter weather can force flexible dates."
    },
    {
      "question": "Why are NYC moves so expensive?",
      "answer": "Labor intensity from stairs, elevators, long carries, COI windows, and limited truck staging drives hours up even for short distances. Access often matters more than miles."
    },
    {
      "question": "Is a NYSDOT license enough for a move to Florida?",
      "answer": "No. Crossing state lines generally requires FMCSA interstate authority. NYSDOT authority covers intrastate New York household goods operations — not interstate operating authority."
    }
  ],
  "trust": {
    "byline": "Curated by the Move Trust Hub editorial team",
    "lastReviewed": "2026-07-22",
    "methodology": "County guides combine public licensing checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "NYSDOT — Moving",
        "href": "https://www.dot.ny.gov/divisions/operating/osss/truck/moving"
      },
      {
        "label": "NYSDOT — Registration & licensing",
        "href": "https://www.dot.ny.gov/divisions/operating/osss/truck/registration-licensing"
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
