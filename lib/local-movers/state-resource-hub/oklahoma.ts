import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 6):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const oklahomaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "oklahoma",
  "stateCode": "OK",
  "h1": "Oklahoma Moving Resource Hub: Costs, OCC HHG Certificates & 77 County Guides",
  "metaTitle": "Oklahoma Movers Guide 2026 — Costs, OCC Certificates & 77 County Guides",
  "metaDescription": "Plan a move within, to, or from Oklahoma. Compare local and intrastate costs, verify Oklahoma Corporation Commission household goods certificates, browse 77 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Oklahoma moves in 2026 — typical costs, OCC vs FMCSA rules, OKC-to-Tulsa regional guides, and tools to compare certificated movers without paid placements.",
  "trustBar": [
    "77 County Guides",
    "Verified Movers",
    "OCC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Oklahoma",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Oklahoma",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Oklahoma",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Oklahoma markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Oklahoma Moving Cost",
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
    "title": "Why moving in Oklahoma is different",
    "paragraphs": [
      "Oklahoma is not one moving market. Oklahoma City multi-unit and HOA suburbs, Tulsa river-city stock, Lawton military cycles, college towns, and panhandle long hauls produce different access and labor profiles under one state name.",
      "Intrastate carriers of household goods — even for shipments wholly within city limits — must obtain a Household Goods Certificate from the Oklahoma Corporation Commission (OCC). Interstate jobs need FMCSA authority. Tornado-season weather, summer heat, and I-35/I-40 corridors are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Oklahoma moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Oklahoma local and intrastate patterns; they are not bids. Always compare written estimates from OCC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical OKC / Tulsa studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Stairs and heat matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,500–$4,800+",
        "note": "Metro HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. OKC ↔ Tulsa)",
        "value": "$1,600–$5,000+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Heat and storms affect productivity"
      },
      {
        "label": "Top outbound destinations",
        "value": "TX · FL · CO · AR · KS · AZ",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "77",
        "note": "OKC and Tulsa emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Oklahoma moving regulations & consumer protection",
    "intro": "Oklahoma requires intrastate household goods carriers — including moves wholly within city limits — to obtain a Household Goods Certificate from the Oklahoma Corporation Commission. Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Oklahoma)",
      "body": "If origin or destination is outside Oklahoma, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An OCC household goods certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Oklahoma)",
      "body": "OCC Transportation Division issues Intrastate Household Goods Carriers Certificates valid for statewide operations. Certificates are issued for a term (initially one year) and must be renewed. Vehicle stamps/copies of certificates are required for equipment operating under the certificate."
    },
    "verifySteps": [
      "Classify the job: entirely in Oklahoma (OCC HHG certificate) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm an active OCC Household Goods Certificate for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance/valuation clarity, and inventory details.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "OCC Household Goods Certificate",
        "detail": "Intrastate carriers of household goods — even within city limits — must obtain a Household Goods Certificate from the Oklahoma Corporation Commission."
      },
      {
        "title": "Statewide certificate scope",
        "detail": "Household Goods Certificates are valid for statewide operations once issued and must be renewed on the Commission’s schedule."
      },
      {
        "title": "Vehicle documentation",
        "detail": "Carriers receive certificate documentation and must keep required copies/stamps for vehicles operated under the certificate."
      }
    ],
    "officialLinks": [
      {
        "label": "OCC — Household goods movers",
        "href": "https://oklahoma.gov/occ/divisions/transportation/household-goods-movers.html",
        "external": true
      },
      {
        "label": "Oklahoma Corporation Commission",
        "href": "https://oklahoma.gov/occ/",
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
    "disclaimer": "Licensing rules and fees can change. Always verify current OCC household goods certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "oklahoma-city-metro",
      "name": "Oklahoma City Metro",
      "shortName": "OKC Metro",
      "blurb": "Oklahoma, Cleveland, Canadian, and neighbors with multi-unit access, HOAs, and I-35/I-40 logistics.",
      "challenges": [
        "HOA windows in growth suburbs",
        "Tornado-season weather buffers"
      ],
      "countySlugs": [
        "oklahoma",
        "cleveland",
        "canadian",
        "mcclain",
        "pottawatomie",
        "logan",
        "lincoln",
        "grady",
        "kingfisher"
      ],
      "ctaLabel": "Explore OKC Metro"
    },
    {
      "id": "tulsa-metro",
      "name": "Tulsa Metro",
      "shortName": "Tulsa Metro",
      "blurb": "Tulsa and surrounding counties with river-city stock, suburbs, and industrial corridors.",
      "challenges": [
        "Mixed multi-story and suburban access",
        "I-44 corridor timing"
      ],
      "countySlugs": [
        "tulsa",
        "creek",
        "rogers",
        "wagoner",
        "osage",
        "washington",
        "pawnee",
        "okmulgee"
      ],
      "ctaLabel": "Explore Tulsa Metro"
    },
    {
      "id": "southwest-ok",
      "name": "Southwest Oklahoma",
      "shortName": "Southwest OK",
      "blurb": "Lawton, southern plains, and southwest counties with military cycles and longer rural approaches.",
      "challenges": [
        "Military PCS timing near Lawton",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "comanche",
        "stephens",
        "carter",
        "garvin",
        "murray",
        "love",
        "jefferson",
        "cotton",
        "tillman",
        "jackson",
        "kiowa",
        "greer",
        "harmon",
        "beckham",
        "custer",
        "washita",
        "caddo"
      ],
      "ctaLabel": "Explore Southwest Oklahoma"
    },
    {
      "id": "northwest-ok",
      "name": "Northwest Oklahoma & Panhandle",
      "shortName": "Northwest / Panhandle",
      "blurb": "Enid, Stillwater approaches, and panhandle counties with long portal-to-portal distances.",
      "challenges": [
        "Wind and winter weather on plains corridors",
        "Long empty miles from major metros"
      ],
      "countySlugs": [
        "garfield",
        "kay",
        "noble",
        "payne",
        "blaine",
        "major",
        "woodward",
        "woods",
        "alfalfa",
        "grant",
        "harper",
        "ellis",
        "dewey",
        "roger-mills",
        "beaver",
        "texas",
        "cimarron"
      ],
      "ctaLabel": "Explore Northwest / Panhandle"
    },
    {
      "id": "eastern-ok",
      "name": "Eastern Oklahoma",
      "shortName": "Eastern OK",
      "blurb": "Muskogee, lake country, and eastern counties with hill access and Arkansas-border hops.",
      "challenges": [
        "Hill and lake-road access",
        "Short AR hops need FMCSA authority"
      ],
      "countySlugs": [
        "muskogee",
        "cherokee",
        "sequoyah",
        "adair",
        "delaware",
        "mayes",
        "ottawa",
        "craig",
        "nowata",
        "mcintosh",
        "hughes",
        "okfuskee",
        "seminole",
        "pontotoc",
        "pittsburg",
        "haskell",
        "le-flore",
        "latimer",
        "pushmataha",
        "choctaw",
        "mccurtain",
        "bryan",
        "atoka",
        "coal",
        "johnston",
        "marshall"
      ],
      "ctaLabel": "Explore Eastern Oklahoma"
    }
  ],
  "costs": {
    "title": "Oklahoma moving costs",
    "intro": "Oklahoma pricing reflects OKC and Tulsa labor markets, summer heat, storm risk, and long east–west hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Oklahoma moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Oklahoma local and intrastate patterns: home size, distance, stairs, parking, HOAs, heat, storms, and regional labor. Actual bids vary. Always compare written estimates from OCC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "OKC / Tulsa studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Access and heat dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,500–$4,500+",
        "note": "HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. OKC ↔ Tulsa)",
        "value": "$1,600–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. OKC ↔ Guymon or Idabel)",
        "value": "$2,000–$6,500+",
        "note": "Distance drives hours"
      },
      {
        "label": "Typical 2–3 person crew (major metros)",
        "value": "$110–$200+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Summer heat slows outdoor labor — prefer early starts.",
      "Severe storm seasons can force same-day reschedules.",
      "Metro HOAs add elevator and loading windows.",
      "Panhandle and far-east jobs include long empty miles.",
      "Short hops into TX, KS, AR, or MO are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Oklahoma moving routes",
    "intro": "Oklahoma sits between Texas and the Midwest with strong outbound flows to Texas and Florida and large OKC–Tulsa internal traffic. Interstate jobs need FMCSA authority; in-state corridors need OCC-certificated household goods carriers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Oklahoma → Texas",
        "href": "/local-movers/texas",
        "origins": "OKC, Tulsa, Southwest OK",
        "transit": "Often same-day or next-day interstate via I-35/I-44",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Highest-volume outbound corridor."
      },
      {
        "label": "Oklahoma → Florida / Colorado",
        "href": "/moving-to/florida",
        "origins": "OKC, Tulsa",
        "transit": "Multi-day interstate",
        "planningNote": "Book early for seasonal peaks.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "Oklahoma → Arkansas / Kansas",
        "href": "/local-movers/arkansas",
        "origins": "Eastern and northern OK",
        "transit": "Often same-day interstate",
        "planningNote": "Confirm FMCSA authority even for short hops.",
        "note": "Common cross-border metro moves."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Oklahoma County (OKC)",
        "href": "/local-movers/oklahoma/oklahoma",
        "note": "Multi-unit access and dense urban staging."
      },
      {
        "label": "Moving to Tulsa County",
        "href": "/local-movers/oklahoma/tulsa",
        "note": "River-city stock and suburban mix."
      },
      {
        "label": "Moving to Cleveland County",
        "href": "/local-movers/oklahoma/cleveland",
        "note": "Norman–OKC south metro growth corridors."
      }
    ]
  },
  "challenges": {
    "title": "Oklahoma-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Oklahoma moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Severe weather windows",
        "detail": "Spring storm and tornado seasons can cancel move days with little notice. Build weather buffers March–June."
      },
      {
        "title": "Summer heat",
        "detail": "Outdoor labor slows quickly June–August. Prefer early start times and shade staging when possible."
      },
      {
        "title": "Metro HOA windows",
        "detail": "OKC and Tulsa growth suburbs often restrict elevator and loading hours. Get rules in writing before booking."
      },
      {
        "title": "Short interstate hops into Texas",
        "detail": "Border jobs are still interstate. Confirm FMCSA authority even for a one-hour haul."
      },
      {
        "title": "OCC certificate verification",
        "detail": "Confirm the exact legal name holds an active OCC Household Goods Certificate before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Oklahoma moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Oklahoma local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Oklahoma movers need an OCC certificate?",
      "answer": "Yes. Intrastate household goods carriers — including moves within city limits — must obtain a Household Goods Certificate from the Oklahoma Corporation Commission. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify an Oklahoma mover?",
      "answer": "Confirm OCC household goods certificate status for the legal name on your estimate via OCC Transportation resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local OKC or Tulsa move cost?",
      "answer": "Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is an OKC-to-Tulsa move intrastate?",
      "answer": "Yes — both ends are in Oklahoma, so you generally need an OCC-certificated household goods carrier."
    },
    {
      "question": "When is peak moving season in Oklahoma?",
      "answer": "Statewide peak is typically May–September. Heat and storms can affect productivity."
    },
    {
      "question": "Does an OKC-to-Dallas move need FMCSA authority?",
      "answer": "Yes. Crossing into Texas is interstate. Confirm active FMCSA operating authority and a USDOT number."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "OCC — Household goods movers",
        "href": "https://oklahoma.gov/occ/divisions/transportation/household-goods-movers.html"
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
