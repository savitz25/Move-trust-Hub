import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 6):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: balanced
 * - Regulation mode: strong_state_regulator
 */
export const arkansasStateResourceHub: StateResourceHubPack = {
  "stateSlug": "arkansas",
  "stateCode": "AR",
  "h1": "Arkansas Moving Resource Hub: Costs, ARDOT Intrastate Authority & 75 County Guides",
  "metaTitle": "Arkansas Movers Guide 2026 — Costs, ARDOT Authority & 75 County Guides",
  "metaDescription": "Plan a move within, to, or from Arkansas. Compare local and intrastate costs, understand ARDOT intrastate authority for household goods movers, browse 75 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Arkansas moves in 2026 — typical costs, ARDOT vs FMCSA rules, Little Rock-to-NWA regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "75 County Guides",
    "Verified Movers",
    "ARDOT & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Arkansas",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Arkansas",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Arkansas",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Arkansas markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Arkansas Moving Cost",
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
    "title": "Why moving in Arkansas is different",
    "paragraphs": [
      "Arkansas is not one moving market. Northwest Arkansas growth corridors, Little Rock capital logistics, Delta agricultural towns, Ozarks hill access, and Texas-border industrial traffic produce different access and labor profiles under one state name.",
      "For-hire household goods movers operating within Arkansas need Intrastate Operating Authority through Arkansas Department of Transportation (ARDOT) permit frameworks for household goods movers. Interstate jobs need FMCSA authority. Summer heat, tornado-season weather, and mountain roads are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Arkansas moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Arkansas local and intrastate patterns; they are not bids. Always compare written estimates and confirm ARDOT or FMCSA authority for your route.",
    "stats": [
      {
        "label": "Typical Little Rock / NWA studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Access and heat matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,500–$4,800+",
        "note": "NWA HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Little Rock ↔ Fayetteville)",
        "value": "$1,700–$5,500+",
        "note": "I-40 / I-49 timing matters"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Heat and storms affect productivity"
      },
      {
        "label": "Top outbound destinations",
        "value": "TX · FL · MO · OK · TN · CO",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "75",
        "note": "NWA and Central AR emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Arkansas moving regulations & consumer protection",
    "intro": "Arkansas requires for-hire household goods movers operating within the state to obtain Intrastate Operating Authority through ARDOT permit frameworks for household goods movers. Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Arkansas)",
      "body": "If origin or destination is outside Arkansas, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Arkansas intrastate household goods authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Arkansas)",
      "body": "ARDOT publishes registration forms and intrastate authority processes for for-hire household goods movers and related motor carrier categories. Consumers should confirm the carrier holds appropriate Arkansas intrastate household goods authority and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Arkansas (ARDOT intrastate authority) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm Arkansas intrastate operating authority for household goods movers.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance/valuation clarity, and inventory details.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Intrastate operating authority",
        "detail": "ARDOT permit resources include registration pathways for for-hire household goods movers under Arkansas intrastate authority frameworks."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, elevators, long carries, hills, and packing before signing."
      },
      {
        "title": "Insurance clarity",
        "detail": "Ask for certificates of insurance and valuation options before move day — especially on longer Ozarks and Delta hauls."
      }
    ],
    "officialLinks": [
      {
        "label": "ARDOT — Permits",
        "href": "https://ardot.gov/permits/",
        "external": true
      },
      {
        "label": "ARDOT — Intrastate authority",
        "href": "https://ardot.gov/divisions/legal/arkansas-intrastate-authority/",
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
    "disclaimer": "Licensing rules and forms can change. Always verify current ARDOT intrastate authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "central-ar",
      "name": "Central Arkansas",
      "shortName": "Central AR",
      "blurb": "Little Rock, North Little Rock, and central counties with capital-city logistics and mixed suburbs.",
      "challenges": [
        "I-30 / I-40 congestion windows",
        "Heat and humidity productivity loss"
      ],
      "countySlugs": [
        "pulaski",
        "saline",
        "faulkner",
        "lonoke",
        "white",
        "perry",
        "conway",
        "pope",
        "yell",
        "garland",
        "hot-spring",
        "grant",
        "jefferson",
        "prairie"
      ],
      "ctaLabel": "Explore Central Arkansas"
    },
    {
      "id": "northwest-ar",
      "name": "Northwest Arkansas",
      "shortName": "Northwest AR",
      "blurb": "Benton, Washington, and NWA growth corridors with HOAs, corporate relocations, and hill access.",
      "challenges": [
        "HOA windows in growth suburbs",
        "Ozarks hill driveways"
      ],
      "countySlugs": [
        "benton",
        "washington",
        "crawford",
        "sebastian",
        "franklin",
        "madison",
        "carroll",
        "boone",
        "newton",
        "johnson",
        "logan",
        "scott",
        "polk",
        "montgomery"
      ],
      "ctaLabel": "Explore Northwest Arkansas"
    },
    {
      "id": "northeast-ar",
      "name": "Northeast Arkansas",
      "shortName": "Northeast AR",
      "blurb": "Jonesboro, Delta approaches, and northeast counties with agricultural corridors and Memphis-adjacent patterns.",
      "challenges": [
        "Confirm coverage for rural Delta addresses",
        "Short TN/MO hops need FMCSA authority"
      ],
      "countySlugs": [
        "craighead",
        "greene",
        "clay",
        "randolph",
        "lawrence",
        "sharp",
        "fulton",
        "izard",
        "independence",
        "jackson",
        "poinsett",
        "mississippi",
        "crittenden",
        "st-francis",
        "cross",
        "lee",
        "phillips",
        "monroe",
        "woodruff"
      ],
      "ctaLabel": "Explore Northeast Arkansas"
    },
    {
      "id": "south-ar",
      "name": "South Arkansas",
      "shortName": "South AR",
      "blurb": "Pine Bluff, El Dorado, Texarkana approaches, and south counties with longer regional hauls.",
      "challenges": [
        "Distance from NWA fleets",
        "Texas-border jobs need FMCSA authority"
      ],
      "countySlugs": [
        "union",
        "columbia",
        "lafayette",
        "miller",
        "little-river",
        "sevier",
        "howard",
        "hempstead",
        "nevada",
        "ouachita",
        "calhoun",
        "bradley",
        "ashley",
        "chicot",
        "desha",
        "drew",
        "dallas",
        "cleveland",
        "lincoln",
        "clark",
        "pike",
        "arkansas"
      ],
      "ctaLabel": "Explore South Arkansas"
    },
    {
      "id": "north-central-ar",
      "name": "North-Central Arkansas & Ozarks",
      "shortName": "North-Central / Ozarks",
      "blurb": "Mountain Home and Ozarks counties with tourism peaks and steep access.",
      "challenges": [
        "Mountain roads and steep driveways",
        "Tourism season congestion"
      ],
      "countySlugs": [
        "baxter",
        "marion",
        "searcy",
        "stone",
        "cleburne",
        "van-buren"
      ],
      "ctaLabel": "Explore North-Central / Ozarks"
    }
  ],
  "costs": {
    "title": "Arkansas moving costs",
    "intro": "Arkansas pricing reflects NWA and Little Rock labor markets, heat, hills, and long I-40/I-49 hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Arkansas moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Arkansas local and intrastate patterns: home size, distance, stairs, parking, HOAs, hills, heat, and regional labor. Actual bids vary. Always compare written estimates and confirm ARDOT or FMCSA authority for your route."
    },
    "ranges": [
      {
        "label": "Little Rock / NWA studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Access and heat dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,500–$4,500+",
        "note": "NWA HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Little Rock ↔ Conway or Hot Springs)",
        "value": "$1,500–$4,800+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Fayetteville ↔ Texarkana or Jonesboro)",
        "value": "$2,000–$6,500+",
        "note": "Distance and hills push hours"
      },
      {
        "label": "Typical 2–3 person crew (major metros)",
        "value": "$110–$200+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Summer heat slows outdoor labor — prefer early starts.",
      "NWA HOAs add elevator and loading windows.",
      "Ozarks hills may require smaller trucks or shuttles.",
      "Severe storm seasons can force reschedules.",
      "Border hops into TX, MO, OK, TN, or MS are interstate even when short."
    ]
  },
  "routes": {
    "title": "Popular Arkansas moving routes",
    "intro": "Arkansas bridges the South and Midwest with strong Northwest Arkansas inbound growth, outbound Texas/Florida flows, and large Little Rock–NWA internal traffic. Interstate jobs need FMCSA authority; in-state corridors need properly authorized for-hire carriers.",
    "migrationProfile": "balanced",
    "outbound": [
      {
        "label": "Arkansas → Texas",
        "href": "/local-movers/texas",
        "origins": "Little Rock, NWA, South AR",
        "transit": "I-30 / I-49 multi-day or same-day near border",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Highest-volume outbound corridor."
      },
      {
        "label": "Arkansas → Florida",
        "href": "/moving-to/florida",
        "origins": "Central and Northwest AR",
        "transit": "Multi-day interstate",
        "planningNote": "Book early for seasonal peaks.",
        "note": "Common lifestyle outbound route."
      },
      {
        "label": "Arkansas → Missouri / Oklahoma / Tennessee",
        "href": "/local-movers/missouri",
        "origins": "NWA, Northeast AR, West AR",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Confirm FMCSA authority even for short hops.",
        "note": "Common cross-border metro moves."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Benton County",
        "href": "/local-movers/arkansas/benton",
        "note": "NWA growth suburbs and HOA calendars."
      },
      {
        "label": "Moving to Washington County",
        "href": "/local-movers/arkansas/washington",
        "note": "Fayetteville–Springdale corridor logistics."
      },
      {
        "label": "Moving to Pulaski County (Little Rock)",
        "href": "/local-movers/arkansas/pulaski",
        "note": "Capital-city multi-unit and suburban mix."
      }
    ]
  },
  "challenges": {
    "title": "Arkansas-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Arkansas moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Northwest Arkansas HOAs",
        "detail": "Benton and Washington growth suburbs often restrict elevator and loading hours. Get rules in writing before booking."
      },
      {
        "title": "Ozarks access",
        "detail": "Steep driveways and mountain roads may need smaller trucks or shuttle strategies. Share GPS pins and photos early."
      },
      {
        "title": "Heat and storms",
        "detail": "Summer heat and spring severe weather can cancel or slow move days. Build flexible buffers."
      },
      {
        "title": "Border hops",
        "detail": "Jobs into Texas, Missouri, Oklahoma, or Tennessee are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Authority verification",
        "detail": "Confirm the exact legal name holds Arkansas intrastate household goods authority before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Arkansas moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Arkansas local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Arkansas movers need state authority?",
      "answer": "Yes. For-hire household goods movers operating within Arkansas generally need Intrastate Operating Authority through ARDOT frameworks. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify an Arkansas mover?",
      "answer": "Confirm ARDOT intrastate household goods authority for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Little Rock or NWA move cost?",
      "answer": "Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Little Rock-to-Fayetteville move intrastate?",
      "answer": "Yes — both ends are in Arkansas, so you generally need a properly authorized for-hire household goods carrier."
    },
    {
      "question": "When is peak moving season in Arkansas?",
      "answer": "Statewide peak is typically May–September. Heat and storms can affect productivity."
    },
    {
      "question": "Does a Texarkana, AR-to-Texarkana, TX move need FMCSA authority?",
      "answer": "Yes. Crossing into Texas is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "ARDOT — Permits",
        "href": "https://ardot.gov/permits/"
      },
      {
        "label": "ARDOT — Intrastate authority",
        "href": "https://ardot.gov/divisions/legal/arkansas-intrastate-authority/"
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
