import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 4):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const missouriStateResourceHub: StateResourceHubPack = {
  "stateSlug": "missouri",
  "stateCode": "MO",
  "h1": "Missouri Moving Resource Hub: Costs, MoDOT HHG Authority & 115 County Guides",
  "metaTitle": "Missouri Movers Guide 2026 — Costs, MoDOT HHG Authority & 115 County Guides",
  "metaDescription": "Plan a move within, to, or from Missouri. Compare local and intrastate costs, verify MoDOT household goods operating authority, browse 115 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Missouri moves in 2026 — typical costs, MoDOT vs FMCSA rules, St. Louis-to-Kansas City regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "115 County Guides",
    "Verified Movers",
    "MoDOT & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Missouri",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Missouri",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Missouri",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Missouri markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Missouri Moving Cost",
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
    "title": "Why moving in Missouri is different",
    "paragraphs": [
      "Missouri is not one moving market. St. Louis brick multi-story stock, Kansas City sprawl and HOAs, Columbia college logistics, Ozarks hill access, and long I-70 east–west hauls produce different access and labor profiles under one state name.",
      "Household goods carriers must obtain operating authority from MoDOT Motor Carrier Services before operating in or between Missouri municipalities. Interstate jobs need FMCSA authority. Summer heat, ice storms, and river-city logistics are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Missouri moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Missouri local and intrastate patterns; they are not bids. Always compare written estimates from MoDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical St. Louis / KC studio / 1BR",
        "value": "$500–$2,200+",
        "note": "Stairs and multi-story stock common"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,600–$5,000+",
        "note": "Metro HOAs vary"
      },
      {
        "label": "Intrastate corridor (e.g. St. Louis ↔ Kansas City)",
        "value": "$2,200–$7,000+",
        "note": "I-70 distance drives hours"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Heat and storms affect productivity"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · TX · AZ · KS · IL · AR",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "115",
        "note": "St. Louis and KC emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Missouri moving regulations & consumer protection",
    "intro": "Missouri requires household goods carriers to obtain operating authority from MoDOT Motor Carrier Services before operating in or between Missouri municipalities and related intrastate household goods service. Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Missouri)",
      "body": "If origin or destination is outside Missouri, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. MoDOT household goods authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Missouri)",
      "body": "Household goods carriers must obtain operating authority from MoDOT Motor Carrier Services. Consumers can verify registered household goods movers through MoDOT MCS household goods resources and should get free written estimates — Missouri consumer materials emphasize free estimates and authority checks."
    },
    "verifySteps": [
      "Classify the job: entirely in Missouri (MoDOT HHG authority) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: verify the mover on MoDOT household goods / MCS registered mover resources.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get more than one free written estimate and compare inventory assumptions.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "MoDOT household goods authority",
        "detail": "MoDOT states household goods carriers must obtain operating authority from Motor Carrier Services before operating in or between Missouri municipalities and related service."
      },
      {
        "title": "Registered mover lists",
        "detail": "Consumer guidance points to MoDOT MCS household goods resources to verify a mover has authority to transport household goods within Missouri."
      },
      {
        "title": "Free estimates expectation",
        "detail": "Missouri consumer materials emphasize that estimates are free — be cautious of pressure tactics around unusually low quotes."
      }
    ],
    "officialLinks": [
      {
        "label": "MoDOT — Household goods transport",
        "href": "https://www.modot.org/HHGoods",
        "external": true
      },
      {
        "label": "MoDOT — Motor Carrier Services",
        "href": "https://www.modot.org/mcs",
        "external": true
      },
      {
        "label": "MoDOT — Intrastate operating authority",
        "href": "https://www.modot.org/MOPA",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current MoDOT household goods authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "st-louis-metro",
      "name": "St. Louis Metro",
      "shortName": "St. Louis Metro",
      "blurb": "St. Louis City/County, St. Charles, and neighbors with brick multi-story stock and Illinois-border hops.",
      "challenges": [
        "Stairs, alleys, and older multi-story homes",
        "Short IL hops need FMCSA authority"
      ],
      "countySlugs": [
        "st-louis",
        "st-louis-city",
        "st-charles",
        "jefferson",
        "franklin",
        "warren",
        "lincoln",
        "st-francois",
        "ste-genevieve"
      ],
      "ctaLabel": "Explore St. Louis Metro"
    },
    {
      "id": "kansas-city-metro",
      "name": "Kansas City Metro",
      "shortName": "Kansas City Metro",
      "blurb": "Jackson, Clay, Platte, and neighbors with sprawl, HOAs, and Kansas-border logistics.",
      "challenges": [
        "Suburban HOA windows",
        "Short KS hops need FMCSA authority"
      ],
      "countySlugs": [
        "jackson",
        "clay",
        "platte",
        "cass",
        "ray",
        "clinton",
        "lafayette",
        "johnson"
      ],
      "ctaLabel": "Explore Kansas City Metro"
    },
    {
      "id": "central-mo",
      "name": "Central Missouri",
      "shortName": "Central MO",
      "blurb": "Columbia, Jefferson City, and central counties along I-70 with college towns and capital logistics.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Long east–west hauls between metros"
      ],
      "countySlugs": [
        "boone",
        "cole",
        "callaway",
        "cooper",
        "howard",
        "moniteau",
        "morgan",
        "miller",
        "osage",
        "gasconade",
        "maries",
        "phelps",
        "pulaski",
        "camden",
        "laclede",
        "dallas",
        "hickory",
        "benton",
        "pettis",
        "saline",
        "audrain",
        "montgomery",
        "pike",
        "ralls",
        "monroe",
        "randolph",
        "chariton",
        "linn",
        "macon",
        "shelby",
        "marion",
        "lewis",
        "clark",
        "knox",
        "scotland",
        "schuyler",
        "adair",
        "putnam",
        "sullivan",
        "carroll"
      ],
      "ctaLabel": "Explore Central Missouri"
    },
    {
      "id": "southwest-mo",
      "name": "Southwest Missouri & Ozarks",
      "shortName": "SW / Ozarks",
      "blurb": "Springfield, Branson approaches, and Ozarks counties with hills and tourism peaks.",
      "challenges": [
        "Hill driveways and narrow roads",
        "Tourism season congestion"
      ],
      "countySlugs": [
        "greene",
        "christian",
        "webster",
        "lawrence",
        "jasper",
        "newton",
        "mcdonald",
        "barry",
        "stone",
        "taney",
        "ozark",
        "douglas",
        "wright",
        "polk",
        "dade",
        "barton",
        "vernon",
        "cedar",
        "st-clair",
        "bates",
        "henry"
      ],
      "ctaLabel": "Explore Southwest / Ozarks"
    },
    {
      "id": "southeast-mo",
      "name": "Southeast Missouri",
      "shortName": "Southeast MO",
      "blurb": "Cape Girardeau and Bootheel counties with river logistics and longer rural approaches.",
      "challenges": [
        "Confirm mover coverage for remote addresses",
        "Heat and humidity in summer"
      ],
      "countySlugs": [
        "cape-girardeau",
        "scott",
        "stoddard",
        "new-madrid",
        "pemiscot",
        "dunklin",
        "butler",
        "ripley",
        "carter",
        "reynolds",
        "iron",
        "madison",
        "wayne",
        "bollinger",
        "perry",
        "mississippi",
        "howell",
        "oregon",
        "shannon",
        "texas",
        "dent",
        "crawford",
        "washington"
      ],
      "ctaLabel": "Explore Southeast Missouri"
    },
    {
      "id": "northwest-mo",
      "name": "Northwest Missouri",
      "shortName": "Northwest MO",
      "blurb": "St. Joseph and northwest agricultural counties with thinner local mover density.",
      "challenges": [
        "Longer regional hauls",
        "Winter weather on plains corridors"
      ],
      "countySlugs": [
        "buchanan",
        "andrew",
        "nodaway",
        "holt",
        "atchison",
        "gentry",
        "worth",
        "harrison",
        "daviess",
        "dekalb",
        "caldwell",
        "livingston",
        "grundy",
        "mercer"
      ],
      "ctaLabel": "Explore Northwest Missouri"
    }
  ],
  "costs": {
    "title": "Missouri moving costs",
    "intro": "Missouri pricing reflects St. Louis and Kansas City labor markets, multi-story access, I-70 distance, and Ozarks terrain. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Missouri moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Missouri local and intrastate patterns: home size, distance, stairs, parking, HOAs, heat, and regional labor. Actual bids vary. Always compare written estimates from MoDOT-authorized movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "St. Louis / KC studio / 1BR",
        "value": "$500–$2,200+",
        "note": "Stairs and multi-story stock dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,600–$4,800+",
        "note": "HOAs vary by suburb"
      },
      {
        "label": "Intrastate mid-size (e.g. St. Louis ↔ Columbia)",
        "value": "$1,800–$5,500+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. St. Louis ↔ Kansas City)",
        "value": "$2,200–$7,000+",
        "note": "I-70 distance drives hours"
      },
      {
        "label": "Typical 2–3 person crew (major metros)",
        "value": "$120–$220+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "St. Louis brick multi-story homes add stair labor.",
      "I-70 east–west hauls create long portal-to-portal days.",
      "Ozarks hills and tourism seasons affect southwest jobs.",
      "Summer heat can slow outdoor labor.",
      "Border hops into IL, KS, AR, or IA are interstate even when short."
    ]
  },
  "routes": {
    "title": "Popular Missouri moving routes",
    "intro": "Missouri bridges Midwest and Sun Belt corridors with large St. Louis–Kansas City internal flows and short interstate hops into Illinois, Kansas, Arkansas, and Iowa. Interstate jobs need FMCSA authority; in-state corridors need MoDOT-authorized household goods carriers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Missouri → Florida",
        "href": "/moving-to/florida",
        "origins": "St. Louis, Kansas City",
        "transit": "Multi-day",
        "planningNote": "Book early for winter arrivals.",
        "note": "Common Midwest-to-Florida corridor."
      },
      {
        "label": "Missouri → Texas",
        "href": "/local-movers/texas",
        "origins": "Kansas City, Springfield, St. Louis",
        "transit": "I-44 / I-35 multi-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular job and lifestyle outbound route."
      },
      {
        "label": "Missouri → Illinois / Kansas",
        "href": "/local-movers/illinois",
        "origins": "St. Louis metro, Kansas City metro",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are extremely common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to St. Louis County",
        "href": "/local-movers/missouri/st-louis",
        "note": "Multi-story stock and suburban mix."
      },
      {
        "label": "Moving to Jackson County (Kansas City)",
        "href": "/local-movers/missouri/jackson",
        "note": "Sprawl, HOAs, and river-city logistics."
      },
      {
        "label": "Moving to Greene County (Springfield)",
        "href": "/local-movers/missouri/greene",
        "note": "Ozarks approaches and growth suburbs."
      }
    ]
  },
  "challenges": {
    "title": "Missouri-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Missouri moves — not generic national checklist filler.",
    "items": [
      {
        "title": "St. Louis multi-story brick homes",
        "detail": "Stairs, narrow streets, and limited staging are common. Share floor counts and approach photos early."
      },
      {
        "title": "I-70 east–west distance",
        "detail": "St. Louis–Kansas City is a full day for many crews. Confirm overnight plans and fuel time on estimates."
      },
      {
        "title": "Ozarks access",
        "detail": "Hill driveways and tourism congestion around Branson can change truck plans. Build schedule buffers."
      },
      {
        "title": "Border metro hops",
        "detail": "Moves into Illinois from St. Louis or Kansas from KC are interstate. Confirm FMCSA authority even for short hauls."
      },
      {
        "title": "MoDOT authority verification",
        "detail": "Confirm the exact legal name has MoDOT household goods operating authority before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Missouri moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Missouri local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Missouri movers need state authority?",
      "answer": "Yes. Household goods carriers generally need operating authority from MoDOT Motor Carrier Services for in-state household goods work. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Missouri mover?",
      "answer": "Use MoDOT MCS household goods resources to confirm authority for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local St. Louis or Kansas City move cost?",
      "answer": "Planning ranges often fall around $500–$2,200+ for a studio/1BR and more for larger homes. Use the calculator, then compare free written estimates."
    },
    {
      "question": "Is a St. Louis-to-Kansas City move intrastate?",
      "answer": "Yes — both ends are in Missouri, so you generally need a MoDOT-authorized household goods carrier."
    },
    {
      "question": "When is peak moving season in Missouri?",
      "answer": "Statewide peak is typically May–September. Heat and storms can affect summer productivity."
    },
    {
      "question": "Does a St. Louis-to-Illinois move need FMCSA authority?",
      "answer": "Yes. Crossing state lines generally requires active FMCSA operating authority even for short metro hops."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "MoDOT — Household goods transport",
        "href": "https://www.modot.org/HHGoods"
      },
      {
        "label": "MoDOT — Motor Carrier Services",
        "href": "https://www.modot.org/mcs"
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
