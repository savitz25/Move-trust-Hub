import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 9):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: partial_state_regulation
 */
export const wyomingStateResourceHub: StateResourceHubPack = {
  "stateSlug": "wyoming",
  "stateCode": "WY",
  "h1": "Wyoming Moving Resource Hub: Costs, WYDOT Authority & 23 County Guides",
  "metaTitle": "Wyoming Movers Guide 2026 — Costs, WYDOT Authority & 23 County Guides",
  "metaDescription": "Plan a move within, to, or from Wyoming. Compare local and intrastate costs, understand WYDOT intrastate operating authority for household goods hauls, browse 23 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Wyoming moves in 2026 — typical costs, WYDOT vs FMCSA rules, Cheyenne-to-Jackson regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "23 County Guides",
    "Verified Movers",
    "WYDOT & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Wyoming",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Wyoming",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Wyoming",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Wyoming markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Wyoming Moving Cost",
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
    "title": "Why moving in Wyoming is different",
    "paragraphs": [
      "Wyoming is not one moving market. Cheyenne plains logistics, Casper energy corridors, Jackson Hole seasonal peaks, and long empty miles across the Basin produce different access and labor profiles under one state name.",
      "Intrastate for-hire carriers — including household goods — generally need Operating Authority from the Wyoming Department of Transportation (often documented as a Letter of Authority carried in the vehicle). Interstate jobs need FMCSA authority. Wind, winter closures, and thin rural fleets are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Wyoming moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Wyoming local and intrastate patterns; they are not bids. Always compare written estimates from properly authorized carriers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Cheyenne / Casper studio / 1BR",
        "value": "$450–$2,100+",
        "note": "Wind and season matter"
      },
      {
        "label": "Typical house 3–4 BR",
        "value": "$1,600–$5,500+",
        "note": "Rural driveways common"
      },
      {
        "label": "Intrastate long (e.g. Cheyenne ↔ Jackson)",
        "value": "$2,500–$9,000+",
        "note": "Distance, weather, and seasonality"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Jackson peaks can extend into winter"
      },
      {
        "label": "Top outbound destinations",
        "value": "CO · TX · AZ · UT · MT · CA",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "23",
        "note": "Southeast and Northwest emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "partial_state_regulation",
    "title": "Wyoming moving regulations & consumer protection",
    "intro": "Wyoming generally requires intrastate for-hire motor carriers — including household goods hauls — to hold Operating Authority from WYDOT Motor Carrier Services. A Letter of Authority is commonly expected in each vehicle. Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Wyoming)",
      "body": "If origin or destination is outside Wyoming, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Wyoming operating authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Wyoming)",
      "body": "Anyone transporting goods they do not own for compensation within Wyoming generally needs Operating Authority from WYDOT. Applications typically require a filing fee, USDOT number, and insurance filings (liability and cargo minimums apply for household goods-type hauls). Consumers should confirm authority and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Wyoming (WYDOT operating authority) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: ask for WYDOT Letter of Authority / operating authority documentation.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates and insurance certificates (cargo + liability).",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "WYDOT operating authority",
        "detail": "Intrastate household goods carriers operating for compensation generally need Operating Authority from Wyoming Department of Transportation Motor Carrier Services."
      },
      {
        "title": "Letter of Authority in vehicles",
        "detail": "Compliance guidance commonly expects a Letter of Authority to be held in each vehicle operating under Wyoming authority."
      },
      {
        "title": "Insurance minimums",
        "detail": "WYDOT frameworks typically require liability and cargo insurance filings for household goods-type hauls — ask for certificates before move day."
      }
    ],
    "officialLinks": [
      {
        "label": "WYDOT — Trucking & commercial vehicles",
        "href": "https://www.dot.state.wy.us/home/trucking_commercial_vehicles.html",
        "external": true
      },
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
      }
    ],
    "disclaimer": "Licensing rules and forms can change. Always verify current WYDOT operating authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "southeast-wy",
      "name": "Southeast Wyoming",
      "shortName": "Southeast",
      "blurb": "Cheyenne, Laramie, and southeast plains counties with I-80/I-25 logistics.",
      "challenges": [
        "Wind and winter weather",
        "Short CO hops need FMCSA authority"
      ],
      "countySlugs": [
        "laramie",
        "albany",
        "platte",
        "goshen",
        "niobrara"
      ],
      "ctaLabel": "Explore Southeast Wyoming"
    },
    {
      "id": "central-wy",
      "name": "Central Wyoming",
      "shortName": "Central",
      "blurb": "Casper, Riverton, and central basin counties with energy corridors and longer hauls.",
      "challenges": [
        "Long empty miles",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "natrona",
        "converse",
        "carbon",
        "fremont",
        "hot-springs",
        "washakie"
      ],
      "ctaLabel": "Explore Central Wyoming"
    },
    {
      "id": "northeast-wy",
      "name": "Northeast Wyoming",
      "shortName": "Northeast",
      "blurb": "Gillette, Sheridan, and northeast counties with industrial and ranch access.",
      "challenges": [
        "Industrial shift timing",
        "Winter road conditions"
      ],
      "countySlugs": [
        "campbell",
        "sheridan",
        "johnson",
        "crook",
        "weston"
      ],
      "ctaLabel": "Explore Northeast Wyoming"
    },
    {
      "id": "northwest-wy",
      "name": "Northwest Wyoming",
      "shortName": "Northwest",
      "blurb": "Jackson, Cody, and northwest mountain counties with tourism peaks and thin winter access.",
      "challenges": [
        "Seasonal housing and HOA/resort rules",
        "Mountain pass weather"
      ],
      "countySlugs": [
        "park",
        "big-horn",
        "teton",
        "sublette",
        "lincoln",
        "uinta",
        "sweetwater"
      ],
      "ctaLabel": "Explore Northwest Wyoming"
    }
  ],
  "costs": {
    "title": "Wyoming moving costs",
    "intro": "Wyoming pricing reflects thin fleets, wind, long empty miles, and Jackson seasonal demand. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Wyoming moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Wyoming local and intrastate patterns: home size, distance, weather, rural access, and regional labor. Actual bids vary widely by season — especially in Teton County. Always compare written estimates and confirm the correct Wyoming or FMCSA authority for your route."
    },
    "ranges": [
      {
        "label": "Cheyenne / Casper studio / 1BR",
        "value": "$450–$2,100+",
        "note": "Wind and access dominate"
      },
      {
        "label": "House 2–3BR",
        "value": "$1,600–$5,200+",
        "note": "Rural driveways common"
      },
      {
        "label": "Intrastate mid-size (e.g. Cheyenne ↔ Casper)",
        "value": "$1,800–$5,500+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long / mountain (e.g. Cheyenne ↔ Jackson)",
        "value": "$2,800–$10,000+",
        "note": "Seasonality and weather push the top"
      },
      {
        "label": "Typical 2–3 person crew (major markets)",
        "value": "$115–$210+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Wind and winter weather can force same-day reschedules.",
      "Jackson seasonal peaks compress available crews.",
      "Long empty miles between hubs raise portal-to-portal time.",
      "Mountain approaches may need smaller trucks or shuttles.",
      "Short hops into CO, MT, UT, ID, NE, or SD are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Wyoming moving routes",
    "intro": "Wyoming sits between Colorado Front Range and Mountain West corridors with strong outbound Sun Belt flows and short interstate hops into Colorado, Montana, and Utah. Interstate jobs need FMCSA authority; in-state corridors need properly authorized carriers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Wyoming → Colorado",
        "href": "/local-movers/colorado",
        "origins": "Cheyenne, Laramie, Casper",
        "transit": "Often same-day or next-day interstate via I-25/I-80",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Highest-volume short outbound corridor."
      },
      {
        "label": "Wyoming → Texas / Arizona",
        "href": "/local-movers/texas",
        "origins": "Statewide",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "Wyoming → Utah / Montana",
        "href": "/local-movers/utah",
        "origins": "Western and northern WY",
        "transit": "Mountain multi-day or next-day",
        "planningNote": "Weather windows matter.",
        "note": "Common regional Mountain West hops."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Laramie County (Cheyenne)",
        "href": "/local-movers/wyoming/laramie",
        "note": "Plains logistics and I-25/I-80 access."
      },
      {
        "label": "Moving to Natrona County (Casper)",
        "href": "/local-movers/wyoming/natrona",
        "note": "Central hub and energy-corridor patterns."
      },
      {
        "label": "Moving to Teton County (Jackson)",
        "href": "/local-movers/wyoming/teton",
        "note": "Seasonal peaks and mountain access."
      }
    ]
  },
  "challenges": {
    "title": "Wyoming-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Wyoming moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Wind and winter closures",
        "detail": "I-80 and mountain routes can close with little notice. Build weather buffers October–April."
      },
      {
        "title": "Jackson seasonal demand",
        "detail": "Tourism and second-home calendars compress crews. Book early for peak seasons."
      },
      {
        "title": "Long empty miles",
        "detail": "Cross-state-internal hauls create expensive empty miles. Get inventory-based written estimates."
      },
      {
        "title": "Short interstate hops into Colorado",
        "detail": "Cheyenne-to-Front Range jobs are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "WYDOT authority verification",
        "detail": "Ask for Operating Authority / Letter of Authority documentation for pure in-state household goods work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Wyoming moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Wyoming local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Wyoming movers need operating authority?",
      "answer": "Yes. Intrastate for-hire carriers transporting household goods generally need Operating Authority from WYDOT. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Wyoming mover?",
      "answer": "Ask for WYDOT Letter of Authority / operating authority documentation and insurance certificates. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Cheyenne or Casper move cost?",
      "answer": "Planning ranges often fall around $450–$2,100+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Cheyenne-to-Jackson move intrastate?",
      "answer": "Yes — both ends are in Wyoming, so you generally need properly authorized for-hire carriers for household goods."
    },
    {
      "question": "When is peak moving season in Wyoming?",
      "answer": "Statewide peak is typically May–September. Jackson markets can also see strong winter demand."
    },
    {
      "question": "Does a Cheyenne-to-Fort Collins move need FMCSA authority?",
      "answer": "Yes. Crossing into Colorado is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "WYDOT — Trucking & commercial vehicles",
        "href": "https://www.dot.state.wy.us/home/trucking_commercial_vehicles.html"
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
