import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 1):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: limited_or_none
 */
export const arizonaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "arizona",
  "stateCode": "AZ",
  "h1": "Arizona Moving Resource Hub: Costs, Consumer Checks & 15 County Guides",
  "metaTitle": "Arizona Movers Guide 2026 — Costs, Licensing Reality & 15 County Guides",
  "metaDescription": "Plan a move within, to, or from Arizona. Compare local costs, understand Arizona’s limited state HHG licensing posture, verify FMCSA for interstate work, browse 15 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Arizona moves in 2026 — desert heat logistics, Phoenix and Tucson metro guides, consumer verification steps, and tools to compare movers without paid placements.",
  "trustBar": [
    "15 County Guides",
    "Verified Movers",
    "FMCSA for Interstate",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Arizona",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Arizona",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Arizona",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Arizona markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Arizona Moving Cost",
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
    "title": "Why moving in Arizona is different",
    "paragraphs": [
      "Arizona is not one moving market. Phoenix HOA tracts and summer heat, Tucson mountain-edge lots, Northern Arizona elevation and winter weather, and long desert highway hauls produce different access and labor profiles under one state name.",
      "Arizona does not operate a California-style statewide household goods mover permit system for all intrastate moves. Consumers should still verify business registration, insurance, reviews, and — for any interstate leg — FMCSA authority. Heat, monsoons, and HOA rules are first-class planning inputs."
    ]
  },
  "snapshot": {
    "title": "Arizona moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Arizona local and regional patterns; they are not bids. Always compare written estimates and verify insurance and (for interstate) FMCSA authority.",
    "stats": [
      {
        "label": "Typical local move (studio–2BR)",
        "value": "$450–$2,000+",
        "note": "Heat-day pacing and HOAs push higher"
      },
      {
        "label": "Typical local move (3–4+ BR)",
        "value": "$1,600–$5,000+",
        "note": "Large Phoenix-area homes common"
      },
      {
        "label": "Intrastate corridor (e.g. Phoenix ↔ Tucson)",
        "value": "$1,500–$5,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "Oct–Apr (snowbirds) + summer leases",
        "note": "Extreme summer heat favors early starts"
      },
      {
        "label": "Top inbound origins",
        "value": "CA · WA · CO · IL · NY",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "15",
        "note": "Maricopa and Pima dominate volume"
      }
    ]
  },
  "regulations": {
    "mode": "limited_or_none",
    "title": "Arizona moving regulations & consumer protection",
    "intro": "Arizona does not require a specialized statewide household goods mover license comparable to California BHGS or Texas TxDMV certificates for all intrastate moves. That does not mean “no rules” — business registration, insurance, local requirements, and federal interstate rules still matter.",
    "interstate": {
      "title": "Interstate (any leg outside Arizona)",
      "body": "If origin or destination is outside Arizona, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER and FMCSA Protect Your Move resources before you deposit money."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Arizona)",
      "body": "Arizona is widely treated as having limited state-level household goods mover permitting. Arizona Department of Public Safety materials emphasize complaint investigation and safety enforcement in the household goods space, and consumers are commonly directed to verify business registration (e.g., Arizona Corporation Commission entity search) and to use careful consumer diligence. Always confirm current requirements for your city and mover type."
    },
    "verifySteps": [
      "Classify the job: entirely in Arizona vs any out-of-state leg (FMCSA / USDOT required for interstate).",
      "Verify the company is a registered business (Arizona Corporation Commission entity search is a common check).",
      "For interstate moves, look up USDOT / MC on FMCSA SAFER and review Protect Your Move guidance.",
      "Demand written estimates, proof of insurance, and clear valuation terms.",
      "Check complaint history and avoid large cash deposits to unknown operators.",
      "Document inventory and condition with photos before load day."
    ],
    "protections": [
      {
        "title": "Business registration checks",
        "detail": "Because Arizona lacks a universal HHG permit lookup like some states, confirming the business entity and insurance is especially important."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, long carries, packing, and storage. Verbal-only quotes are a red flag."
      },
      {
        "title": "Interstate consumer booklets",
        "detail": "For interstate moves, FMCSA requires specific consumer disclosures (including rights-and-responsibilities materials). Ask for them."
      }
    ],
    "officialLinks": [
      {
        "label": "Arizona DPS — Household goods information",
        "href": "https://www.azdps.gov/content/basic-page/94/hhg",
        "external": true
      },
      {
        "label": "Arizona Corporation Commission entity search",
        "href": "https://ecorp.azcc.gov/EntitySearch/Index",
        "external": true
      },
      {
        "label": "FMCSA Protect Your Move",
        "href": "https://www.fmcsa.dot.gov/protect-your-move",
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
    "disclaimer": "Arizona’s regulatory posture for intrastate household goods movers can be easy to misstate online. Always verify current requirements with official Arizona agencies and, for interstate moves, FMCSA. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "phoenix-metro",
      "name": "Phoenix Metro",
      "shortName": "Phoenix",
      "blurb": "Maricopa and Pinal growth corridors, HOA tracts, summer heat logistics, and high-volume family and snowbird moves.",
      "challenges": [
        "Extreme summer heat windows",
        "HOA rules in master-planned communities"
      ],
      "countySlugs": [
        "maricopa",
        "pinal"
      ],
      "ctaLabel": "Explore Phoenix metro"
    },
    {
      "id": "tucson-south",
      "name": "Tucson & Southern Arizona",
      "shortName": "Tucson / South",
      "blurb": "Pima metro plus border-region counties with mountain-edge lots and desert highway approaches.",
      "challenges": [
        "Heat and monsoon timing",
        "Mountain-edge driveway access"
      ],
      "countySlugs": [
        "pima",
        "santa-cruz",
        "cochise"
      ],
      "ctaLabel": "Explore Tucson / South"
    },
    {
      "id": "northern-az",
      "name": "Northern Arizona",
      "shortName": "Northern AZ",
      "blurb": "Flagstaff elevation, high-country weather, and tourism towns across Coconino, Yavapai, and the northern counties.",
      "challenges": [
        "Winter weather and elevation",
        "Long distances between towns"
      ],
      "countySlugs": [
        "coconino",
        "yavapai",
        "navajo",
        "apache",
        "mohave"
      ],
      "ctaLabel": "Explore Northern Arizona"
    },
    {
      "id": "western-rural",
      "name": "Western & Rural Arizona",
      "shortName": "West / Rural",
      "blurb": "Yuma agriculture and winter visitors, river communities, and rural counties with thinner crew coverage.",
      "challenges": [
        "Seasonal population swings",
        "Confirm mover coverage for remote addresses"
      ],
      "countySlugs": [
        "yuma",
        "la-paz",
        "gila",
        "graham",
        "greenlee"
      ],
      "ctaLabel": "Explore West / Rural Arizona"
    }
  ],
  "costs": {
    "title": "Arizona moving costs",
    "intro": "Arizona pricing reflects Phoenix metro labor and HOAs, extreme heat productivity, monsoon flexibility, and long desert highway hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Arizona moving costs",
      "lastReviewed": "2026-07-22",
      "body": "These ranges are planning estimates, not quotes. They combine typical Arizona local and regional patterns: home size, distance, HOAs, heat-day labor, and access. Actual bids vary. For interstate moves, always verify FMCSA authority. For local moves, emphasize written estimates, insurance, and business legitimacy checks."
    },
    "ranges": [
      {
        "label": "Local studio / 1BR",
        "value": "$450–$1,600+",
        "note": "HOAs and heat pacing push higher"
      },
      {
        "label": "Local 2–3BR house",
        "value": "$1,400–$4,200+",
        "note": "Large Phoenix-area homes common"
      },
      {
        "label": "Intrastate mid-size (Phoenix ↔ Tucson)",
        "value": "$1,500–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (Phoenix ↔ Flagstaff)",
        "value": "$1,800–$5,500+",
        "note": "Elevation and weather at destination"
      },
      {
        "label": "Typical 2-person crew (Phoenix metro)",
        "value": "$120–$200+/hr",
        "note": "Portal-to-portal; early starts in summer"
      }
    ],
    "factors": [
      "Summer heat makes early starts essential and can slow multi-story jobs.",
      "HOA move windows are common in master-planned Phoenix-area communities.",
      "Monsoon storms can force same-day reschedules.",
      "Long desert highways add portal-to-portal time between metros.",
      "Snowbird season increases demand in many markets from fall through spring."
    ]
  },
  "routes": {
    "title": "Popular Arizona moving routes",
    "intro": "Arizona is a major inbound destination from California and colder states, with strong Phoenix-centric internal flows. Interstate jobs need FMCSA authority.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Arizona → California",
        "href": "/local-movers/california",
        "origins": "Phoenix, Tucson",
        "transit": "Often 1–2 day I-10 corridor",
        "planningNote": "Confirm FMCSA authority; CA intrastate second hops need BHGS.",
        "note": "Common bi-directional Southwest corridor."
      },
      {
        "label": "Arizona → Colorado / Utah",
        "href": "/moving-to/colorado",
        "origins": "Phoenix metro",
        "transit": "Multi-day; elevation at destination",
        "planningNote": "Weather windows matter in winter.",
        "note": "Lifestyle outbound lanes from the Valley."
      }
    ],
    "inbound": [
      {
        "label": "California → Arizona",
        "href": "/local-movers/arizona/maricopa",
        "origins": "Southern California, Bay Area",
        "transit": "I-10 / I-8 corridors",
        "planningNote": "One of the highest-volume inbound lanes into Maricopa County.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Maricopa County (Phoenix)",
        "href": "/local-movers/arizona/maricopa",
        "note": "HOAs, heat, and large suburban homes."
      },
      {
        "label": "Moving to Pima County (Tucson)",
        "href": "/local-movers/arizona/pima",
        "note": "Desert heat and mountain-edge access."
      }
    ]
  },
  "challenges": {
    "title": "Arizona-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Arizona moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Extreme summer heat",
        "detail": "Late spring through early fall, schedule early morning loads. Heat affects crew pacing, electronics protection, and pet safety."
      },
      {
        "title": "Monsoon storms",
        "detail": "Summer storms can flood streets and pause outdoor work. Build flexible dates into contracts when possible."
      },
      {
        "title": "HOA-heavy Valley suburbs",
        "detail": "Many Phoenix-area communities require COI, approved hours, and parking rules. Get the packet before move day."
      },
      {
        "title": "Elevation changes (Flagstaff and high country)",
        "detail": "Northern Arizona winters and elevation can affect truck access and scheduling compared with desert floors."
      },
      {
        "title": "Long desert distances",
        "detail": "Phoenix–Tucson or Valley–Yuma runs need honest portal-to-portal assumptions and hydration/heat planning."
      },
      {
        "title": "Consumer diligence without a universal HHG permit",
        "detail": "Because Arizona lacks a CA/TX-style universal mover certificate for all intrastate moves, emphasize written estimates, insurance proof, business registration, and FMCSA checks for interstate work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Arizona moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Arizona local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Does Arizona require a special license for local movers?",
      "answer": "Arizona does not use a California- or Texas-style statewide household goods mover permit for all intrastate moves. Consumers should still verify business registration, insurance, written estimates, and — for interstate moves — FMCSA authority. Always confirm current requirements with official Arizona sources."
    },
    {
      "question": "How do I verify a mover for an Arizona interstate move?",
      "answer": "Look up the USDOT or MC number on FMCSA SAFER and review FMCSA Protect Your Move guidance. Match the legal name on your estimate to the federal record before paying a deposit."
    },
    {
      "question": "When is the best time to move in Arizona?",
      "answer": "Many people prefer fall through spring to avoid extreme heat, but snowbird season can tighten coastal and Valley calendars. In summer, book early-morning windows and plan for heat delays."
    },
    {
      "question": "Why do Phoenix moves cost more on some days?",
      "answer": "Heat pacing, HOA windows, large single-family inventories, and end-of-month demand all increase labor hours. Access and timing often matter as much as distance."
    },
    {
      "question": "What should I watch for when hiring any Arizona mover?",
      "answer": "Written estimates only, proof of insurance, clear valuation terms, verifiable business identity, and FMCSA authority for interstate work. Avoid large cash deposits to unknown operators."
    },
    {
      "question": "Do HOAs affect Arizona moves?",
      "answer": "Yes — especially in Maricopa County master-planned communities. Confirm COI requirements, approved hours, and parking rules before move day."
    }
  ],
  "trust": {
    "byline": "Curated by the Move Trust Hub editorial team",
    "lastReviewed": "2026-07-22",
    "methodology": "County guides combine public records checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids. Arizona regulation language is intentionally conservative because the state does not mirror CA/TX permit models.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "Arizona DPS — Household goods info",
        "href": "https://www.azdps.gov/content/basic-page/94/hhg"
      },
      {
        "label": "Arizona Corporation Commission entity search",
        "href": "https://ecorp.azcc.gov/EntitySearch/Index"
      },
      {
        "label": "FMCSA Protect Your Move",
        "href": "https://www.fmcsa.dot.gov/protect-your-move"
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
