import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 9):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const northDakotaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "north-dakota",
  "stateCode": "ND",
  "h1": "North Dakota Moving Resource Hub: Costs, NDDOT HHG Permits & 53 County Guides",
  "metaTitle": "North Dakota Movers Guide 2026 — Costs, HHG Permits & 53 County Guides",
  "metaDescription": "Plan a move within, to, or from North Dakota. Compare local and intrastate costs, verify NDDOT household goods carrier permits, browse 53 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for North Dakota moves in 2026 — typical costs, NDDOT vs FMCSA rules, Fargo-to-Bismarck regional guides, and tools to compare permitted movers without paid placements.",
  "trustBar": [
    "53 County Guides",
    "Verified Movers",
    "NDDOT & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within North Dakota",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To North Dakota",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From North Dakota",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how North Dakota markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My North Dakota Moving Cost",
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
    "title": "Why moving in North Dakota is different",
    "paragraphs": [
      "North Dakota is not one moving market. Fargo Red River logistics, Bismarck capital corridors, Minot and Williston energy cycles, and long empty miles across the prairie produce different access and labor profiles under one state name.",
      "Household goods carriers operating in North Dakota generally need a Household Goods Carrier Permit from the North Dakota Department of Transportation Motor Vehicle division (application fee frameworks under state law). Interstate jobs need FMCSA authority. Extreme cold, wind, and thin rural fleets are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "North Dakota moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical North Dakota local and intrastate patterns; they are not bids. Always compare written estimates from permitted movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Fargo studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Winter access dominates"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,500–$4,800+",
        "note": "Metro HOAs vary"
      },
      {
        "label": "Intrastate long (e.g. Fargo ↔ Williston)",
        "value": "$2,200–$8,000+",
        "note": "Distance and weather drive hours"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter forces flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "MN · TX · AZ · CO · FL · MT",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "53",
        "note": "Red River and Bismarck emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "North Dakota moving regulations & consumer protection",
    "intro": "North Dakota requires household goods carriers operating in the state to obtain a Household Goods Carrier Permit (NDDOT Motor Vehicle application frameworks, including statutory application fees). Match the permit to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside North Dakota)",
      "body": "If origin or destination is outside North Dakota, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A North Dakota household goods permit alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within North Dakota)",
      "body": "Every household goods carrier operating in North Dakota, when applying for a household goods carrier permit, must pay statutory application fees and complete NDDOT Motor Vehicle permit processes. Annual renewal frameworks and insurance documentation commonly apply. Consumers should confirm permit status and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in North Dakota (HHG permit) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm NDDOT household goods carrier permit for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates and insurance certificates.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Household goods carrier permit",
        "detail": "North Dakota law provides for household goods carrier permits administered through NDDOT Motor Vehicle application processes with statutory filing fees."
      },
      {
        "title": "Insurance compliance",
        "detail": "Permit processes commonly require proof of liability and cargo insurance — ask for certificates before move day."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on winter access, long carries, and packing before signing."
      }
    ],
    "officialLinks": [
      {
        "label": "NDDOT — Forms (Household Goods Carrier Permit SFN 10539)",
        "href": "https://www.dot.nd.gov/forms/sfn10539.pdf",
        "external": true
      },
      {
        "label": "North Dakota DOT",
        "href": "https://www.dot.nd.gov/",
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
    "disclaimer": "Licensing rules and forms can change. Always verify current household goods permit status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "fargo-red-river",
      "name": "Fargo & Red River Valley",
      "shortName": "Red River",
      "blurb": "Cass, Grand Forks, and eastern counties with multi-unit access and Minnesota-border hops.",
      "challenges": [
        "Short MN hops need FMCSA authority",
        "Winter ice and flood-season logistics"
      ],
      "countySlugs": [
        "cass",
        "richland",
        "ransom",
        "sargent",
        "barnes",
        "steele",
        "traill",
        "grand-forks",
        "walsh",
        "pembina",
        "nelson",
        "griggs"
      ],
      "ctaLabel": "Explore Red River"
    },
    {
      "id": "bismarck-central",
      "name": "Bismarck & Central / Southwest",
      "shortName": "Bismarck / Central",
      "blurb": "Burleigh–Morton capital corridors and southwest energy approaches.",
      "challenges": [
        "Long empty miles westward",
        "Wind and winter weather"
      ],
      "countySlugs": [
        "burleigh",
        "morton",
        "oliver",
        "mercer",
        "mclean",
        "sheridan",
        "kidder",
        "stutsman",
        "foster",
        "eddy",
        "wells",
        "logan",
        "emmons",
        "mcintosh",
        "lamoure",
        "dickey",
        "grant",
        "sioux",
        "adams",
        "hettinger",
        "bowman",
        "slope",
        "billings",
        "dunn",
        "stark",
        "golden-valley"
      ],
      "ctaLabel": "Explore Bismarck / Central"
    },
    {
      "id": "minot-northwest",
      "name": "Minot & Northwest",
      "shortName": "Northwest",
      "blurb": "Ward, Williams, and northwest energy counties with industrial cycles and thin coverage.",
      "challenges": [
        "Energy-cycle demand spikes",
        "Confirm mover coverage early"
      ],
      "countySlugs": [
        "ward",
        "mchenry",
        "bottineau",
        "renville",
        "mountrail",
        "williams",
        "burke",
        "divide",
        "mckenzie"
      ],
      "ctaLabel": "Explore Northwest"
    },
    {
      "id": "northeast-nd",
      "name": "Northeast North Dakota",
      "shortName": "Northeast",
      "blurb": "Devils Lake approaches and northeast agricultural counties.",
      "challenges": [
        "Rural driveway access",
        "Longer hauls to Fargo fleets"
      ],
      "countySlugs": [
        "ramsey",
        "towner",
        "cavalier",
        "rolette",
        "pierce",
        "benson"
      ],
      "ctaLabel": "Explore Northeast"
    }
  ],
  "costs": {
    "title": "North Dakota moving costs",
    "intro": "North Dakota pricing reflects Fargo labor markets, extreme winters, and long prairie hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate North Dakota moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical North Dakota local and intrastate patterns: home size, distance, winter access, packing, and regional labor. Actual bids vary widely with season and energy-cycle demand. Always compare written estimates from permitted movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Fargo studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Winter access dominates"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,500–$4,500+",
        "note": "HOAs vary"
      },
      {
        "label": "Intrastate mid-size (e.g. Fargo ↔ Bismarck)",
        "value": "$1,800–$5,500+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Fargo ↔ Williston)",
        "value": "$2,400–$8,500+",
        "note": "Distance and weather push hours"
      },
      {
        "label": "Typical 2–3 person crew (Fargo metro)",
        "value": "$110–$200+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Extreme cold can erase productivity and limit truck starts.",
      "Wind and ice force flexible winter dates.",
      "Northwest energy cycles can tighten crew availability.",
      "Long empty miles between hubs raise portal-to-portal time.",
      "Short hops into MN, MT, or SD are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular North Dakota moving routes",
    "intro": "North Dakota sees outbound Sun Belt flows, constant short interstate hops into Minnesota, and large Fargo–Bismarck internal traffic. Interstate jobs need FMCSA authority; in-state corridors need properly permitted household goods carriers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "North Dakota → Minnesota",
        "href": "/local-movers/minnesota",
        "origins": "Fargo, Grand Forks",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Highest-volume short outbound corridor."
      },
      {
        "label": "North Dakota → Texas / Arizona / Florida",
        "href": "/local-movers/texas",
        "origins": "Statewide metros",
        "transit": "Multi-day interstate",
        "planningNote": "Book early for seasonal peaks.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "North Dakota → Montana / Colorado",
        "href": "/local-movers/montana",
        "origins": "West and central ND",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Common regional Mountain West hops."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Cass County (Fargo)",
        "href": "/local-movers/north-dakota/cass",
        "note": "Multi-unit access and MN-border patterns."
      },
      {
        "label": "Moving to Burleigh County (Bismarck)",
        "href": "/local-movers/north-dakota/burleigh",
        "note": "Capital corridors and plains logistics."
      },
      {
        "label": "Moving to Ward County (Minot)",
        "href": "/local-movers/north-dakota/ward",
        "note": "Northwest hub and military cycles."
      }
    ]
  },
  "challenges": {
    "title": "North Dakota-specific moving challenges & tips",
    "intro": "These issues show up constantly on real North Dakota moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Extreme winter access",
        "detail": "Ice, wind, and cold can shut down driveway access. Build large weather buffers November–March."
      },
      {
        "title": "Fargo–Moorhead border hops",
        "detail": "Jobs into Minnesota are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Long prairie hauls",
        "detail": "Fargo–Williston distances create expensive empty miles. Get inventory-based written estimates."
      },
      {
        "title": "Energy-cycle demand",
        "detail": "Northwest markets can tighten crews during boom periods. Book early."
      },
      {
        "title": "HHG permit verification",
        "detail": "Confirm the exact legal name holds a North Dakota household goods carrier permit before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate North Dakota moves."
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
      "description": "Interstate-ready planning checklist you can adapt for North Dakota local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do North Dakota movers need a household goods permit?",
      "answer": "Yes. Household goods carriers operating in North Dakota generally need a Household Goods Carrier Permit through NDDOT Motor Vehicle frameworks. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a North Dakota mover?",
      "answer": "Confirm household goods carrier permit status for the legal name on your estimate and request insurance certificates. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Fargo move cost?",
      "answer": "Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Fargo-to-Bismarck move intrastate?",
      "answer": "Yes — both ends are in North Dakota, so you generally need a permitted household goods carrier."
    },
    {
      "question": "When is peak moving season in North Dakota?",
      "answer": "Statewide peak is typically May–September. Winter weather can force flexible dates for much of the rest of the year."
    },
    {
      "question": "Does a Fargo-to-Moorhead move need FMCSA authority?",
      "answer": "Yes. Crossing into Minnesota is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "NDDOT — Household Goods Carrier Permit form",
        "href": "https://www.dot.nd.gov/forms/sfn10539.pdf"
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
