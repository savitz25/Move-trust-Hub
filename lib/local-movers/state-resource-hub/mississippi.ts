import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 7):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const mississippiStateResourceHub: StateResourceHubPack = {
  "stateSlug": "mississippi",
  "stateCode": "MS",
  "h1": "Mississippi Moving Resource Hub: Costs, MDOT HHG Authority & 82 County Guides",
  "metaTitle": "Mississippi Movers Guide 2026 — Costs, MDOT Authority & 82 County Guides",
  "metaDescription": "Plan a move within, to, or from Mississippi. Compare local and intrastate costs, verify MDOT household goods carrier authority, browse 82 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Mississippi moves in 2026 — typical costs, MDOT vs FMCSA rules, Jackson-to-Gulf Coast regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "82 County Guides",
    "Verified Movers",
    "MDOT & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Mississippi",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Mississippi",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Mississippi",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Mississippi markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Mississippi Moving Cost",
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
    "title": "Why moving in Mississippi is different",
    "paragraphs": [
      "Mississippi is not one moving market. Jackson capital logistics, Gulf Coast humidity and hurricane risk, DeSoto County Memphis-adjacent suburbs, Delta agricultural towns, and Pine Belt industrial corridors produce different access and labor profiles under one state name.",
      "Carriers transporting household goods within Mississippi must complete MDOT household goods and passenger carrier application frameworks (Certificate of Public Convenience and Necessity pathways). Interstate jobs need FMCSA authority. Summer heat, hurricane season, and I-55/I-10 corridors are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Mississippi moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Mississippi local and intrastate patterns; they are not bids. Always compare written estimates from MDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Jackson studio / 1BR",
        "value": "$400–$1,900+",
        "note": "Stairs and heat matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,400–$4,500+",
        "note": "HOAs vary by suburb"
      },
      {
        "label": "Intrastate corridor (e.g. Jackson ↔ Gulfport)",
        "value": "$1,600–$5,000+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Heat and hurricane risk affect dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "TX · FL · TN · AL · LA · GA",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "82",
        "note": "Jackson and Coast emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Mississippi moving regulations & consumer protection",
    "intro": "Mississippi requires carriers desiring to transport household goods in the state to complete MDOT household goods carrier application frameworks and hold appropriate authority. Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Mississippi)",
      "body": "If origin or destination is outside Mississippi, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Mississippi household goods authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Mississippi)",
      "body": "MDOT publishes household goods and passenger carriers guidelines and application packets for carriers transporting household goods within Mississippi. Insurance documentation is part of the application process. Consumers should confirm active authority and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Mississippi (MDOT HHG authority) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm MDOT household goods carrier authority for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance/valuation clarity, and inventory details.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "MDOT household goods authority",
        "detail": "Carriers desiring to transport household goods in Mississippi must complete MDOT application packets and meet insurance documentation requirements."
      },
      {
        "title": "Insurance filings",
        "detail": "Application materials require proof of public liability and property damage insurance coverage appropriate to regulated operations."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, long carries, humidity delays, and packing before signing."
      }
    ],
    "officialLinks": [
      {
        "label": "MDOT — Household goods and passenger carriers guidelines",
        "href": "https://mdot.ms.gov/documents/Enforcement/Regulations/Household%20Goods%20and%20Passenger%20Carriers%20Guidelines.pdf",
        "external": true
      },
      {
        "label": "MDOT — Household goods application",
        "href": "https://mdot.ms.gov/documents/Enforcement/Regulations/Household%20Goods%20and%20Passenger%20Carriers%20Application.pdf",
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
    "disclaimer": "Licensing rules and forms can change. Always verify current MDOT household goods authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "jackson-metro",
      "name": "Jackson Metro",
      "shortName": "Jackson Metro",
      "blurb": "Hinds, Rankin, Madison, and neighbors with capital-city logistics and mixed suburbs.",
      "challenges": [
        "Heat and humidity productivity loss",
        "I-55 / I-20 congestion windows"
      ],
      "countySlugs": [
        "hinds",
        "rankin",
        "madison",
        "copiah",
        "simpson",
        "yazoo",
        "warren",
        "claiborne"
      ],
      "ctaLabel": "Explore Jackson Metro"
    },
    {
      "id": "gulf-coast",
      "name": "Mississippi Gulf Coast",
      "shortName": "Gulf Coast",
      "blurb": "Harrison, Hancock, Jackson, and coastal counties with humidity, casinos, and hurricane risk.",
      "challenges": [
        "Hurricane-season date risk",
        "Coastal humidity and parking constraints"
      ],
      "countySlugs": [
        "harrison",
        "hancock",
        "jackson",
        "pearl-river",
        "stone",
        "george"
      ],
      "ctaLabel": "Explore Gulf Coast"
    },
    {
      "id": "pine-belt-south",
      "name": "Pine Belt & South Mississippi",
      "shortName": "Pine Belt / South",
      "blurb": "Hattiesburg, Laurel, Meridian approaches, and south-central counties with industrial mix.",
      "challenges": [
        "Confirm coverage for rural addresses",
        "Summer heat slows outdoor labor"
      ],
      "countySlugs": [
        "forrest",
        "lamar",
        "marion",
        "jones",
        "wayne",
        "covington",
        "jefferson-davis",
        "lawrence",
        "lincoln",
        "pike",
        "walthall",
        "amite",
        "wilkinson",
        "adams",
        "franklin",
        "jefferson",
        "greene",
        "perry",
        "smith",
        "jasper",
        "clarke",
        "lauderdale",
        "newton",
        "scott",
        "leake",
        "neshoba",
        "kemper",
        "noxubee"
      ],
      "ctaLabel": "Explore Pine Belt / South"
    },
    {
      "id": "delta",
      "name": "Mississippi Delta",
      "shortName": "Delta",
      "blurb": "Bolivar, Washington, and Delta counties with agricultural corridors and longer rural approaches.",
      "challenges": [
        "Longer regional hauls",
        "Confirm mover coverage early"
      ],
      "countySlugs": [
        "bolivar",
        "washington",
        "sunflower",
        "leflore",
        "coahoma",
        "quitman",
        "tallahatchie",
        "holmes",
        "humphreys",
        "sharkey",
        "issaquena"
      ],
      "ctaLabel": "Explore Mississippi Delta"
    },
    {
      "id": "north-ms",
      "name": "North Mississippi",
      "shortName": "North MS",
      "blurb": "DeSoto County Memphis-adjacent growth, Oxford campus peaks, and northeast industrial towns.",
      "challenges": [
        "Short TN hops need FMCSA authority",
        "Campus lease-cycle peaks"
      ],
      "countySlugs": [
        "desoto",
        "marshall",
        "tate",
        "tunica",
        "panola",
        "lafayette",
        "benton",
        "tippah",
        "alcorn",
        "tishomingo",
        "prentiss",
        "union",
        "lee",
        "itawamba",
        "pontotoc",
        "chickasaw",
        "monroe",
        "calhoun",
        "yalobusha",
        "grenada",
        "montgomery",
        "webster",
        "clay",
        "lowndes",
        "oktibbeha",
        "choctaw",
        "winston",
        "attala",
        "carroll"
      ],
      "ctaLabel": "Explore North Mississippi"
    }
  ],
  "costs": {
    "title": "Mississippi moving costs",
    "intro": "Mississippi pricing reflects Jackson and Coast labor markets, heat, humidity, and long north–south hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Mississippi moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Mississippi local and intrastate patterns: home size, distance, stairs, parking, heat, humidity, and regional labor. Actual bids vary. Always compare written estimates from MDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Jackson studio / 1BR",
        "value": "$400–$1,900+",
        "note": "Heat and access dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,400–$4,200+",
        "note": "HOAs vary"
      },
      {
        "label": "Intrastate mid-size (e.g. Jackson ↔ Hattiesburg)",
        "value": "$1,500–$4,800+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Southaven ↔ Gulfport)",
        "value": "$2,000–$6,500+",
        "note": "Distance and packing push the top"
      },
      {
        "label": "Typical 2–3 person crew (major markets)",
        "value": "$100–$190+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Summer heat and humidity slow outdoor labor.",
      "Hurricane season can force coastal reschedules.",
      "DeSoto County growth jobs often involve Tennessee border logistics.",
      "Rural Delta and Pine Belt addresses need coverage confirmation early.",
      "Short hops into LA, AL, TN, or AR are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Mississippi moving routes",
    "intro": "Mississippi sits between Southeast growth markets with strong outbound flows to Texas and Florida, Memphis-adjacent northern traffic, and large Jackson–Coast internal flows. Interstate jobs need FMCSA authority; in-state corridors need MDOT-authorized household goods carriers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Mississippi → Texas / Florida",
        "href": "/local-movers/texas",
        "origins": "Jackson, Coast, North MS",
        "transit": "I-10 / I-20 / I-55 multi-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "High-volume Sun Belt corridors."
      },
      {
        "label": "Mississippi → Tennessee / Alabama / Louisiana",
        "href": "/local-movers/tennessee",
        "origins": "North MS, East MS, Southwest MS",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common short cross-border metro moves."
      },
      {
        "label": "Mississippi → Georgia / Carolinas",
        "href": "/local-movers/georgia",
        "origins": "Jackson, Coast",
        "transit": "Multi-day interstate",
        "planningNote": "HOAs at destination common.",
        "note": "Popular job-driven outbound routes."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Hinds County (Jackson)",
        "href": "/local-movers/mississippi/hinds",
        "note": "Capital-city multi-unit and suburban mix."
      },
      {
        "label": "Moving to Harrison County (Gulfport–Biloxi)",
        "href": "/local-movers/mississippi/harrison",
        "note": "Coastal humidity and hurricane-season planning."
      },
      {
        "label": "Moving to DeSoto County",
        "href": "/local-movers/mississippi/desoto",
        "note": "Memphis-adjacent growth suburbs."
      }
    ]
  },
  "challenges": {
    "title": "Mississippi-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Mississippi moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Heat and humidity",
        "detail": "Summer outdoor labor slows quickly. Prefer early start times May–September statewide."
      },
      {
        "title": "Gulf hurricane season",
        "detail": "Coastal jobs can reschedule with little notice June–November. Keep flexible dates."
      },
      {
        "title": "Memphis-adjacent border hops",
        "detail": "DeSoto County moves into Tennessee are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Rural coverage gaps",
        "detail": "Delta and rural Pine Belt addresses may have thinner mover density. Confirm coverage early."
      },
      {
        "title": "MDOT authority verification",
        "detail": "Confirm the exact legal name holds Mississippi household goods authority before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Mississippi moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Mississippi local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Mississippi movers need state authority?",
      "answer": "Yes. Carriers transporting household goods within Mississippi generally need MDOT household goods authority under state application frameworks. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Mississippi mover?",
      "answer": "Confirm MDOT household goods carrier authority for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Jackson move cost?",
      "answer": "Planning ranges often fall around $400–$1,900+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Jackson-to-Gulfport move intrastate?",
      "answer": "Yes — both ends are in Mississippi, so you generally need an MDOT-authorized household goods carrier."
    },
    {
      "question": "When is peak moving season in Mississippi?",
      "answer": "Statewide peak is typically May–September. Hurricane season can add date risk on the Coast."
    },
    {
      "question": "Does a Southaven-to-Memphis move need FMCSA authority?",
      "answer": "Yes. Crossing into Tennessee is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "MDOT — HHG and passenger carriers guidelines",
        "href": "https://mdot.ms.gov/documents/Enforcement/Regulations/Household%20Goods%20and%20Passenger%20Carriers%20Guidelines.pdf"
      },
      {
        "label": "MDOT — HHG application",
        "href": "https://mdot.ms.gov/documents/Enforcement/Regulations/Household%20Goods%20and%20Passenger%20Carriers%20Application.pdf"
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
