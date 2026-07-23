import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 9):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: limited_or_none
 */
export const southDakotaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "south-dakota",
  "stateCode": "SD",
  "h1": "South Dakota Moving Resource Hub: Costs, FMCSA Checks & 66 County Guides",
  "metaTitle": "South Dakota Movers Guide 2026 — Costs, Insurance Checks & 66 County Guides",
  "metaDescription": "Plan a move within, to, or from South Dakota. Compare local and intrastate costs, understand South Dakota’s limited dedicated HHG licensing versus FMCSA interstate rules, browse 66 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for South Dakota moves in 2026 — typical costs, FMCSA-first verification for interstate work, Sioux Falls-to-Rapid City regional guides, and tools to compare movers without paid placements.",
  "trustBar": [
    "66 County Guides",
    "Verified Movers",
    "FMCSA-Focused Checks",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within South Dakota",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To South Dakota",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From South Dakota",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how South Dakota markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My South Dakota Moving Cost",
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
    "title": "Why moving in South Dakota is different",
    "paragraphs": [
      "South Dakota is not one moving market. Sioux Falls multi-unit growth, Rapid City Black Hills approaches, Pierre capital logistics, and long empty miles across the prairie produce different access and labor profiles under one state name.",
      "South Dakota does not operate a consumer-facing household-goods permit regime comparable to North Dakota’s NDDOT HHG permit or Nebraska’s PSC license. Interstate jobs need FMCSA authority. For in-state work, insist on insurance certificates, written estimates, and clear legal names. Winter ice, wind, and tourism peaks near the Hills are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "South Dakota moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical South Dakota local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.",
    "stats": [
      {
        "label": "Typical Sioux Falls studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Access and winter weather matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,500–$4,800+",
        "note": "HOAs in growth suburbs"
      },
      {
        "label": "Intrastate long (e.g. Sioux Falls ↔ Rapid City)",
        "value": "$2,200–$8,000+",
        "note": "I-90 distance and weather drive hours"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Hills tourism can create second peaks"
      },
      {
        "label": "Top outbound destinations",
        "value": "MN · TX · AZ · CO · FL · NE",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "66",
        "note": "Sioux Falls and Black Hills emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "limited_or_none",
    "title": "South Dakota moving regulations & consumer protection",
    "intro": "South Dakota does not maintain a dedicated household-goods consumer permit board comparable to several neighboring states. Interstate work still requires FMCSA authority. Verify insurance and contracts carefully before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside South Dakota)",
      "body": "If origin or destination is outside South Dakota, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A South Dakota business registration alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within South Dakota)",
      "body": "Without a strong state HHG permit directory, consumers should insist on written estimates, cargo and liability insurance certificates, and a clear legal business name for pure in-state jobs. Commercial vehicle safety rules still apply; confirm any local licensing requirements with the carrier in writing."
    },
    "verifySteps": [
      "Classify the job: entirely in South Dakota vs any out-of-state leg (FMCSA / USDOT required).",
      "Copy the exact legal name from the written estimate.",
      "Interstate: look up USDOT / MC on FMCSA SAFER before deposits.",
      "Intrastate: request insurance certificates, written inventory estimates, and business credentials.",
      "Confirm rural driveway and Black Hills access for your addresses.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "No dedicated HHG permit board",
        "detail": "South Dakota does not publish a California-style dedicated household-goods consumer license directory — do not invent a permit number that does not exist."
      },
      {
        "title": "FMCSA for interstate moves",
        "detail": "Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority on SAFER."
      },
      {
        "title": "Written estimates and insurance",
        "detail": "Without a strong state HHG license lookup, written estimates and cargo/liability insurance certificates are your primary consumer controls on local jobs."
      }
    ],
    "officialLinks": [
      {
        "label": "FMCSA SAFER — USDOT lookup",
        "href": "https://safer.fmcsa.dot.gov/",
        "external": true
      },
      {
        "label": "FMCSA — Protect Your Move",
        "href": "https://www.fmcsa.dot.gov/protect-your-move",
        "external": true
      },
      {
        "label": "Move Trust Hub — Verify a USDOT",
        "href": "/verify-dot"
      },
      {
        "label": "Move Trust Hub — How we score movers",
        "href": "/about/how-we-score-movers"
      }
    ],
    "disclaimer": "Regulatory frameworks can change. Always verify current commercial credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "sioux-falls-east",
      "name": "Sioux Falls & East River",
      "shortName": "East River",
      "blurb": "Minnehaha, Lincoln, and east-river counties with multi-unit access and Iowa/Minnesota-border hops.",
      "challenges": [
        "Short IA/MN hops need FMCSA authority",
        "Winter ice and growth-suburb HOAs"
      ],
      "countySlugs": [
        "minnehaha",
        "lincoln",
        "turner",
        "lake",
        "moody",
        "brookings",
        "union",
        "clay",
        "yankton",
        "hutchinson",
        "bon-homme",
        "douglas",
        "charles-mix",
        "davison",
        "hanson",
        "sanborn",
        "miner",
        "kingsbury",
        "hamlin",
        "deuel",
        "codington",
        "grant",
        "roberts",
        "day",
        "marshall",
        "clark",
        "spink",
        "beadle",
        "aurora",
        "jerauld",
        "brule",
        "buffalo",
        "hand",
        "mccook"
      ],
      "ctaLabel": "Explore East River"
    },
    {
      "id": "pierre-central",
      "name": "Pierre & Central South Dakota",
      "shortName": "Central",
      "blurb": "Hughes and central prairie counties with longer regional hauls and thinner fleets.",
      "challenges": [
        "Long empty miles",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "hughes",
        "stanley",
        "sully",
        "hyde",
        "potter",
        "faulk",
        "edmunds",
        "walworth",
        "campbell",
        "mcpherson",
        "brown",
        "lyman",
        "jones",
        "haakon",
        "jackson",
        "mellette",
        "todd",
        "tripp",
        "gregory"
      ],
      "ctaLabel": "Explore Central"
    },
    {
      "id": "black-hills-west",
      "name": "Rapid City & Black Hills",
      "shortName": "Black Hills",
      "blurb": "Pennington, Meade, Lawrence, and western counties with tourism peaks and hill access.",
      "challenges": [
        "Tourism-season congestion",
        "Hill driveways and winter weather"
      ],
      "countySlugs": [
        "pennington",
        "meade",
        "lawrence",
        "butte",
        "custer",
        "fall-river",
        "harding",
        "perkins",
        "bennett",
        "shannon",
        "ziebach",
        "dewey",
        "corson"
      ],
      "ctaLabel": "Explore Black Hills"
    }
  ],
  "costs": {
    "title": "South Dakota moving costs",
    "intro": "South Dakota pricing reflects Sioux Falls labor markets, winter weather, and long I-90 hauls to the Black Hills. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate South Dakota moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical South Dakota local and intrastate patterns: home size, distance, winter access, packing, and regional labor. Actual bids vary with season and tourism peaks. Always compare written estimates and confirm FMCSA authority for any out-of-state leg."
    },
    "ranges": [
      {
        "label": "Sioux Falls studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Access and season dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,500–$4,500+",
        "note": "HOAs in growth suburbs"
      },
      {
        "label": "Intrastate mid-size (e.g. Sioux Falls ↔ Brookings)",
        "value": "$1,500–$4,800+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Sioux Falls ↔ Rapid City)",
        "value": "$2,200–$8,000+",
        "note": "I-90 distance drives hours"
      },
      {
        "label": "Typical 2–3 person crew (Sioux Falls)",
        "value": "$110–$200+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Winter ice and wind force flexible dates.",
      "Black Hills tourism can tighten summer crews.",
      "Long empty miles between Sioux Falls and Rapid City raise portal-to-portal time.",
      "Growth suburbs add HOA elevator windows.",
      "Short hops into MN, IA, NE, ND, MT, or WY are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular South Dakota moving routes",
    "intro": "South Dakota sees outbound Sun Belt flows, short interstate hops into Minnesota and Iowa, and large Sioux Falls–Rapid City internal traffic. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "South Dakota → Minnesota / Iowa",
        "href": "/local-movers/minnesota",
        "origins": "Sioux Falls metro",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Highest-volume short outbound corridors."
      },
      {
        "label": "South Dakota → Texas / Arizona / Florida",
        "href": "/local-movers/texas",
        "origins": "Statewide metros",
        "transit": "Multi-day interstate",
        "planningNote": "Book early for seasonal peaks.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "South Dakota → Colorado / Wyoming",
        "href": "/local-movers/colorado",
        "origins": "Rapid City, west river",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Common Mountain West hops."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Minnehaha County (Sioux Falls)",
        "href": "/local-movers/south-dakota/minnehaha",
        "note": "Multi-unit access and growth suburbs."
      },
      {
        "label": "Moving to Pennington County (Rapid City)",
        "href": "/local-movers/south-dakota/pennington",
        "note": "Black Hills access and tourism peaks."
      },
      {
        "label": "Moving to Lincoln County",
        "href": "/local-movers/south-dakota/lincoln",
        "note": "Sioux Falls south-metro growth corridors."
      }
    ]
  },
  "challenges": {
    "title": "South Dakota-specific moving challenges & tips",
    "intro": "These issues show up constantly on real South Dakota moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Winter ice and wind",
        "detail": "Prairie weather can cancel move days with little notice. Build buffers November–March."
      },
      {
        "title": "Sioux Falls–Rapid City distance",
        "detail": "I-90 hauls create long empty miles. Get inventory-based written estimates."
      },
      {
        "title": "Limited state HHG permit regime",
        "detail": "Without a dedicated consumer HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop."
      },
      {
        "title": "Black Hills tourism peaks",
        "detail": "Summer congestion can slow trucks and lodging for crews. Avoid Friday arrivals when possible."
      },
      {
        "title": "Short interstate hops",
        "detail": "Moves into Minnesota, Iowa, Nebraska, or North Dakota are interstate even if short. Confirm FMCSA authority before deposits."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate South Dakota moves."
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
      "description": "Interstate-ready planning checklist you can adapt for South Dakota local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do South Dakota movers need a special household goods license?",
      "answer": "South Dakota does not operate a dedicated household-goods consumer permit board comparable to some neighboring states. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg."
    },
    {
      "question": "How do I verify a South Dakota mover for an interstate move?",
      "answer": "Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates."
    },
    {
      "question": "How much does a local Sioux Falls move cost?",
      "answer": "Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Sioux Falls-to-Rapid City move interstate?",
      "answer": "No — both ends are in South Dakota. Focus on weather windows, packing, and inventory-based written estimates for the long haul."
    },
    {
      "question": "When is peak moving season in South Dakota?",
      "answer": "Statewide peak is typically May–September. Black Hills tourism can create additional summer demand."
    },
    {
      "question": "Does a Sioux Falls-to-Sioux City move need FMCSA authority?",
      "answer": "Yes. Crossing into Iowa is interstate even for relatively short hauls. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "FMCSA SAFER",
        "href": "https://safer.fmcsa.dot.gov/"
      },
      {
        "label": "FMCSA — Protect Your Move",
        "href": "https://www.fmcsa.dot.gov/protect-your-move"
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
