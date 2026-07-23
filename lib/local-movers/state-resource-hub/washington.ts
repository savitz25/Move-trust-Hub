import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 2):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const washingtonStateResourceHub: StateResourceHubPack = {
  "stateSlug": "washington",
  "stateCode": "WA",
  "h1": "Washington Moving Resource Hub: Costs, UTC Permits & 39 County Guides",
  "metaTitle": "Washington Movers Guide 2026 — Costs, UTC Permits & 39 County Guides",
  "metaDescription": "Plan a move within, to, or from Washington. Compare local and intrastate costs, verify Washington UTC household goods permits, browse 39 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Washington moves in 2026 — typical costs, UTC vs FMCSA rules, Puget Sound-to-Eastern WA regional guides, and tools to compare permitted movers without paid placements.",
  "trustBar": [
    "39 County Guides",
    "Verified Movers",
    "WA UTC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Washington",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Washington",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Washington",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Washington markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Washington Moving Cost",
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
    "title": "Why moving in Washington is different",
    "paragraphs": [
      "Washington is not one moving market. Seattle multi-unit elevators and hills, Eastside HOAs, Southwest WA Portland-adjacent traffic, Central WA agricultural corridors, and Spokane winters produce different access and labor profiles under one state name.",
      "Intrastate household goods carriers must hold a valid permit from the Washington Utilities and Transportation Commission (UTC). It is illegal to operate without one. Interstate jobs need FMCSA authority. Rain, hills, ferries, and wildfire-season air quality are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Washington moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Washington local and intrastate patterns; they are not bids. Always compare written estimates from UTC-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Seattle studio / 1BR",
        "value": "$650–$2,600+",
        "note": "Hills, elevators, and parking dominate"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$2,000–$6,000+",
        "note": "Eastside HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Seattle ↔ Spokane)",
        "value": "$2,500–$8,000+",
        "note": "Passes and weather matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Rain can force flexible dates year-round"
      },
      {
        "label": "Top inbound origins",
        "value": "CA · OR · TX · AZ · IL",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "39",
        "note": "Puget Sound emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Washington moving regulations & consumer protection",
    "intro": "Washington requires household goods carriers operating within the state to hold a valid permit from the Utilities and Transportation Commission (UTC). Match the permit to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Washington)",
      "body": "If origin or destination is outside Washington, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A UTC household goods permit alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Washington)",
      "body": "A moving company operating within Washington must have a valid UTC household goods permit — operating without one is illegal. UTC-permitted companies are expected to follow commission rate/tariff frameworks, insurance requirements, and consumer guide distribution rules."
    },
    "verifySteps": [
      "Classify the job: entirely in Washington (UTC) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: look up the company on the UTC companies / permitted movers tools and confirm active status.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Ask for the consumer moving guide materials and written estimate/forms required by UTC rules.",
      "Avoid large cash deposits to unverified operators; report suspected non-permitted carriers to UTC channels."
    ],
    "protections": [
      {
        "title": "UTC permit requirement",
        "detail": "UTC consumer guidance states in-state movers must have a valid commission permit and that unpermitted operation is illegal."
      },
      {
        "title": "Rates, insurance, and vehicle standards",
        "detail": "Permitted companies are expected to charge proper rates, carry insurance, and maintain vehicles under UTC oversight."
      },
      {
        "title": "Consumer moving guide",
        "detail": "Household goods carriers are required to distribute consumer moving guide materials — ask for them before you sign."
      }
    ],
    "officialLinks": [
      {
        "label": "WA UTC — Household goods carriers",
        "href": "https://www.utc.wa.gov/MovingCompanies",
        "external": true
      },
      {
        "label": "WA UTC — Choosing a licensed mover",
        "href": "https://www.utc.wa.gov/get-help-utility-or-transportation-service/choosing-licensed-mover-washington-state",
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
    "disclaimer": "Licensing rules and permit directories can change. Always verify current UTC permit status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "seattle-puget",
      "name": "Seattle & Puget Sound",
      "shortName": "Puget Sound",
      "blurb": "Hills, multi-unit elevators, ferry-adjacent logistics, and dense Eastside HOAs across King, Snohomish, Pierce, and neighbors.",
      "challenges": [
        "Hills, elevators, and tight street staging",
        "Bridge and freeway congestion"
      ],
      "countySlugs": [
        "king",
        "snohomish",
        "pierce",
        "kitsap",
        "thurston",
        "island",
        "mason",
        "skagit",
        "whatcom",
        "san-juan"
      ],
      "ctaLabel": "Explore Puget Sound"
    },
    {
      "id": "southwest-wa",
      "name": "Southwest Washington",
      "shortName": "SW Washington",
      "blurb": "Vancouver–Clark County Portland-adjacent patterns, coastal approaches, and I-5 corridor towns.",
      "challenges": [
        "Cross-metro traffic toward Portland",
        "Rain and coastal access"
      ],
      "countySlugs": [
        "clark",
        "cowlitz",
        "wahkiakum",
        "skamania",
        "lewis",
        "pacific",
        "grays-harbor"
      ],
      "ctaLabel": "Explore SW Washington"
    },
    {
      "id": "central-wa",
      "name": "Central Washington",
      "shortName": "Central WA",
      "blurb": "Yakima, Tri-Cities, and agricultural corridors with longer highway hauls across the Cascades approaches.",
      "challenges": [
        "Mountain pass weather",
        "Long portal-to-portal distances"
      ],
      "countySlugs": [
        "yakima",
        "kittitas",
        "grant",
        "chelan",
        "douglas",
        "okanogan",
        "adams",
        "benton",
        "franklin",
        "walla-walla",
        "klickitat"
      ],
      "ctaLabel": "Explore Central Washington"
    },
    {
      "id": "eastern-wa",
      "name": "Eastern Washington",
      "shortName": "Eastern WA",
      "blurb": "Spokane metro and inland counties with colder winters and more rural driveway patterns.",
      "challenges": [
        "Winter weather windows",
        "Distance from Puget Sound crews"
      ],
      "countySlugs": [
        "spokane",
        "stevens",
        "pend-oreille",
        "ferry",
        "lincoln",
        "whitman",
        "asotin",
        "garfield",
        "columbia"
      ],
      "ctaLabel": "Explore Eastern Washington"
    },
    {
      "id": "olympic-peninsula",
      "name": "Olympic Peninsula",
      "shortName": "Olympic Peninsula",
      "blurb": "Clallam and Jefferson coastal and forest approaches with thinner coverage and weather exposure.",
      "challenges": [
        "Confirm mover coverage for remote addresses",
        "Weather and ferry/highway timing"
      ],
      "countySlugs": [
        "clallam",
        "jefferson"
      ],
      "ctaLabel": "Explore Olympic Peninsula"
    }
  ],
  "costs": {
    "title": "Washington moving costs",
    "intro": "Washington pricing reflects Seattle labor markets, hills/elevators, rain delays, mountain passes, and HOA suburbs. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Washington moving costs",
      "lastReviewed": "2026-07-22",
      "body": "These ranges are planning estimates, not quotes. They combine typical Washington local and intrastate patterns: home size, distance, hills/elevators, parking, HOAs, weather, and regional labor. Actual bids vary under UTC tariff/rate frameworks for permitted intrastate movers. Always compare written estimates from UTC-permitted movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Seattle studio / 1BR",
        "value": "$650–$2,600+",
        "note": "Hills and elevators dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,800–$5,000+",
        "note": "Eastside HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Seattle ↔ Olympia)",
        "value": "$1,800–$5,500+",
        "note": "Season and packing matter"
      },
      {
        "label": "Intrastate long (e.g. Seattle ↔ Spokane)",
        "value": "$2,500–$8,000+",
        "note": "Passes and weather matter"
      },
      {
        "label": "Typical 2–3 person crew (Puget Sound)",
        "value": "$145–$260+/hr",
        "note": "Portal-to-portal; access drives hours"
      }
    ],
    "factors": [
      "Seattle hills and multi-unit elevators add labor time.",
      "Rain can slow outdoor work and force flexible dates.",
      "Mountain passes affect Seattle–Eastern WA hauls in winter.",
      "HOA windows are common on the Eastside and in growth suburbs.",
      "Peak May–September fills crews early."
    ]
  },
  "routes": {
    "title": "Popular Washington moving routes",
    "intro": "Washington is a major inbound West Coast destination with strong California origins and large Seattle–Spokane internal flows. Interstate jobs need FMCSA authority; in-state corridors need UTC-permitted movers.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Washington → Oregon",
        "href": "/moving-to/oregon",
        "origins": "Seattle, Southwest WA",
        "transit": "Often same-day or next-day interstate via I-5",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common short outbound hop from Puget Sound and Clark County."
      },
      {
        "label": "Washington → California",
        "href": "/local-movers/california",
        "origins": "Seattle metro",
        "transit": "Multi-day I-5 corridor",
        "planningNote": "CA second hops may need BHGS for in-CA legs.",
        "note": "Bi-directional West Coast traffic is common."
      }
    ],
    "inbound": [
      {
        "label": "California → Washington",
        "href": "/local-movers/washington/king",
        "origins": "Bay Area, LA, San Diego",
        "transit": "Multi-day I-5",
        "planningNote": "High-volume inbound into King and Snohomish counties.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to King County (Seattle)",
        "href": "/local-movers/washington/king",
        "note": "Hills, elevators, and dense multi-unit access."
      },
      {
        "label": "Moving to Spokane County",
        "href": "/local-movers/washington/spokane",
        "note": "Eastern WA winters and more open lots."
      }
    ]
  },
  "challenges": {
    "title": "Washington-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Washington moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Hills and elevators (Seattle metro)",
        "detail": "Steep streets and multi-unit freight elevators with COI windows drive hours. Confirm building rules early."
      },
      {
        "title": "Rain and wet staging",
        "detail": "Protect floors and electronics; rain can slow outdoor work and change truck access on soft ground."
      },
      {
        "title": "Mountain pass weather",
        "detail": "Seattle–Spokane and Cascade routes can close or slow in winter. Build weather buffer into long in-state hauls."
      },
      {
        "title": "Ferry and water-adjacent logistics",
        "detail": "Island and peninsula jobs may involve ferry timing or limited staging — survey access carefully."
      },
      {
        "title": "HOA suburbs (Eastside and growth areas)",
        "detail": "Many communities require COI, approved hours, and parking rules."
      },
      {
        "title": "UTC permit enforcement",
        "detail": "Unpermitted movers are illegal for in-state household goods work. Verify UTC permit status before hiring."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Washington moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Washington local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "How are movers regulated in Washington?",
      "answer": "Household goods carriers operating within Washington must hold a valid permit from the Washington Utilities and Transportation Commission (UTC). Operating without a permit is illegal. Interstate moves require federal FMCSA operating authority and a USDOT number."
    },
    {
      "question": "How do I verify a Washington mover is permitted?",
      "answer": "Use UTC company lookup / permitted mover tools to confirm active household goods permit status for the legal company name on your estimate. For interstate work, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "When is the best time to move in Washington?",
      "answer": "Demand peaks late spring through early fall. Mid-week mornings are often easier for elevators and traffic. Rain can affect schedules year-round; mountain passes can force winter flexibility on long hauls."
    },
    {
      "question": "Why are Seattle moves expensive?",
      "answer": "Hills, elevators, limited staging, COI windows, and high metro labor rates increase hours even for short distances. Access often matters more than miles."
    },
    {
      "question": "Is a UTC permit enough for a move to California?",
      "answer": "No. Crossing state lines generally requires FMCSA interstate authority. A UTC household goods permit covers Washington intrastate operations — not interstate operating authority."
    },
    {
      "question": "What should I check before hiring any Washington mover?",
      "answer": "Active UTC permit for in-state work (or FMCSA for interstate), written estimate, insurance/valuation clarity, and consumer guide materials. Avoid large cash deposits to unverified operators."
    }
  ],
  "trust": {
    "byline": "Curated by the Move Trust Hub editorial team",
    "lastReviewed": "2026-07-22",
    "methodology": "County guides combine public permit checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "WA UTC — Household goods carriers",
        "href": "https://www.utc.wa.gov/MovingCompanies"
      },
      {
        "label": "WA UTC — Choosing a licensed mover",
        "href": "https://www.utc.wa.gov/get-help-utility-or-transportation-service/choosing-licensed-mover-washington-state"
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
