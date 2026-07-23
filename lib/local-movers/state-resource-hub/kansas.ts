import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 7):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const kansasStateResourceHub: StateResourceHubPack = {
  "stateSlug": "kansas",
  "stateCode": "KS",
  "h1": "Kansas Moving Resource Hub: Costs, KCC Authority & 105 County Guides",
  "metaTitle": "Kansas Movers Guide 2026 — Costs, KCC Certificates & 105 County Guides",
  "metaDescription": "Plan a move within, to, or from Kansas. Compare local and intrastate costs, verify Kansas Corporation Commission household goods authority, browse 105 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Kansas moves in 2026 — typical costs, KCC vs FMCSA rules, KC-to-Wichita regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "105 County Guides",
    "Verified Movers",
    "KCC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Kansas",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Kansas",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Kansas",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Kansas markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Kansas Moving Cost",
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
    "title": "Why moving in Kansas is different",
    "paragraphs": [
      "Kansas is not one moving market. Kansas City metro multi-unit and HOA suburbs, Wichita industrial corridors, Topeka capital logistics, university towns, and western plains long hauls produce different access and labor profiles under one state name.",
      "Intrastate household goods carriers need a Certificate of Public Convenience and Necessity from the Kansas Corporation Commission (KCC) Transportation Division, with household goods tariff frameworks. Interstate jobs need FMCSA authority. Tornado-season weather, summer heat, and I-70 east–west distances are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Kansas moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Kansas local and intrastate patterns; they are not bids. Always compare written estimates from KCC-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical KC / Wichita studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Stairs and heat matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,500–$4,800+",
        "note": "Metro HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. KC ↔ Wichita)",
        "value": "$1,700–$5,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Storms and heat affect productivity"
      },
      {
        "label": "Top outbound destinations",
        "value": "TX · MO · CO · FL · OK · AZ",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "105",
        "note": "KC and Wichita emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Kansas moving regulations & consumer protection",
    "intro": "Kansas requires household goods movers operating within the state to obtain operating authority (Certificate of Public Convenience and Necessity) from the Kansas Corporation Commission Transportation Division. Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Kansas)",
      "body": "If origin or destination is outside Kansas, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. KCC household goods authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Kansas)",
      "body": "KCC Transportation Division oversees motor carriers of household goods, including certificate frameworks and household goods tariff filings. Consumers should verify KCC operating authority for the legal name on the estimate and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Kansas (KCC authority) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm KCC household goods / motor carrier authority for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates and ask how rates map to filed household goods tariff materials.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "KCC certificate of convenience and necessity",
        "detail": "Kansas law frameworks require household goods carriers to obtain commission authority before conducting for-hire in-state household goods transportation."
      },
      {
        "title": "Household goods tariffs",
        "detail": "KCC publishes household goods tariff resources; carriers file rate and service terms under Transportation Division oversight."
      },
      {
        "title": "Complaint channels",
        "detail": "Consumers can use KCC Transportation Division complaint processes when problems arise with authorized carriers."
      }
    ],
    "officialLinks": [
      {
        "label": "KCC — Transportation",
        "href": "https://www.kcc.ks.gov/transportation",
        "external": true
      },
      {
        "label": "KCC — Household goods tariffs",
        "href": "https://www.kcc.ks.gov/transportation/transportation-quick-links/household-goods-tariffs",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current KCC authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "kansas-city-metro",
      "name": "Kansas City Metro (KS side)",
      "shortName": "KC Metro KS",
      "blurb": "Johnson, Wyandotte, and neighbors with multi-unit access, HOAs, and Missouri-border logistics.",
      "challenges": [
        "Short MO hops need FMCSA authority",
        "HOA windows in Johnson County"
      ],
      "countySlugs": [
        "johnson",
        "wyandotte",
        "leavenworth",
        "miami",
        "douglas",
        "franklin",
        "linn",
        "anderson",
        "jefferson",
        "atchison",
        "doniphan"
      ],
      "ctaLabel": "Explore KC Metro KS"
    },
    {
      "id": "wichita-south-central",
      "name": "Wichita & South Central",
      "shortName": "Wichita / South Central",
      "blurb": "Sedgwick and south-central counties with industrial corridors and mixed suburban stock.",
      "challenges": [
        "Aircraft-industry shift timing",
        "Storm-season weather buffers"
      ],
      "countySlugs": [
        "sedgwick",
        "butler",
        "harvey",
        "sumner",
        "cowley",
        "reno",
        "mcpherson",
        "marion",
        "chase",
        "greenwood",
        "elk",
        "chautauqua",
        "montgomery",
        "wilson",
        "woodson",
        "allen",
        "bourbon",
        "neosho",
        "labette",
        "cherokee",
        "crawford",
        "kingman",
        "harper",
        "barber",
        "pratt",
        "stafford",
        "rice",
        "barton"
      ],
      "ctaLabel": "Explore Wichita / South Central"
    },
    {
      "id": "topeka-northeast",
      "name": "Topeka, Manhattan & Northeast",
      "shortName": "Topeka / Northeast",
      "blurb": "Capital city, Flint Hills approaches, and northeast university towns.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Mix of multi-unit and rural access"
      ],
      "countySlugs": [
        "shawnee",
        "jackson",
        "pottawatomie",
        "wabaunsee",
        "riley",
        "geary",
        "morris",
        "lyon",
        "coffey",
        "osage",
        "nemaha",
        "brown",
        "marshall",
        "washington",
        "clay",
        "dickinson",
        "saline",
        "cloud",
        "jewell",
        "republic",
        "mitchell",
        "ottawa"
      ],
      "ctaLabel": "Explore Topeka / Northeast"
    },
    {
      "id": "western-ks",
      "name": "Western Kansas",
      "shortName": "Western KS",
      "blurb": "Garden City, Dodge City, and western plains counties with long portal-to-portal distances.",
      "challenges": [
        "Long empty miles from major metros",
        "Wind and winter weather on plains"
      ],
      "countySlugs": [
        "finney",
        "ford",
        "seward",
        "haskell",
        "gray",
        "meade",
        "clark",
        "comanche",
        "kiowa",
        "edwards",
        "pawnee",
        "hodgeman",
        "ness",
        "lane",
        "scott",
        "wichita",
        "greeley",
        "hamilton",
        "kearny",
        "grant",
        "stanton",
        "morton",
        "stevens"
      ],
      "ctaLabel": "Explore Western Kansas"
    },
    {
      "id": "northwest-ks",
      "name": "Northwest Kansas",
      "shortName": "Northwest KS",
      "blurb": "Hays and northwest plains counties with thinner local mover density.",
      "challenges": [
        "Confirm coverage for remote addresses",
        "Long regional hauls"
      ],
      "countySlugs": [
        "ellis",
        "russell",
        "rooks",
        "osborne",
        "smith",
        "phillips",
        "norton",
        "decatur",
        "rawlins",
        "cheyenne",
        "sherman",
        "thomas",
        "sheridan",
        "graham",
        "trego",
        "gove",
        "logan",
        "wallace",
        "lincoln",
        "ellsworth",
        "rush"
      ],
      "ctaLabel": "Explore Northwest Kansas"
    }
  ],
  "costs": {
    "title": "Kansas moving costs",
    "intro": "Kansas pricing reflects KC and Wichita labor markets, storm risk, heat, and long I-70 hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Kansas moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Kansas local and intrastate patterns: home size, distance, stairs, parking, HOAs, weather, and regional labor. Actual bids vary under KCC tariff frameworks for authorized carriers. Always compare written estimates from KCC-authorized movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "KC / Wichita studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Access and season dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,500–$4,500+",
        "note": "HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. KC ↔ Topeka or Wichita)",
        "value": "$1,600–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. KC ↔ Garden City)",
        "value": "$2,200–$7,000+",
        "note": "I-70 distance drives hours"
      },
      {
        "label": "Typical 2–3 person crew (major metros)",
        "value": "$110–$200+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Severe storm seasons can force same-day reschedules.",
      "Summer heat slows outdoor labor — prefer early starts.",
      "Johnson County HOAs add elevator and loading windows.",
      "Western plains jobs include long empty miles.",
      "Short hops into MO, OK, NE, or CO are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Kansas moving routes",
    "intro": "Kansas sits between Midwest and Plains corridors with strong KC–Wichita internal traffic and short interstate hops into Missouri, Oklahoma, Nebraska, and Colorado. Interstate jobs need FMCSA authority; in-state corridors need KCC-authorized household goods carriers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Kansas → Texas / Oklahoma",
        "href": "/local-movers/texas",
        "origins": "Wichita, KC, South Central",
        "transit": "I-35 multi-day or next-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "High-volume southern corridor."
      },
      {
        "label": "Kansas → Colorado / Florida",
        "href": "/local-movers/colorado",
        "origins": "KC, Wichita",
        "transit": "Multi-day interstate",
        "planningNote": "Book early for seasonal peaks.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "Kansas → Missouri",
        "href": "/local-movers/missouri",
        "origins": "KC metro KS",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Extremely common short cross-border metro moves."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Johnson County",
        "href": "/local-movers/kansas/johnson",
        "note": "KC-side suburbs and HOA communities."
      },
      {
        "label": "Moving to Sedgwick County (Wichita)",
        "href": "/local-movers/kansas/sedgwick",
        "note": "Industrial corridors and suburban mix."
      },
      {
        "label": "Moving to Shawnee County (Topeka)",
        "href": "/local-movers/kansas/shawnee",
        "note": "Capital-city logistics and suburbs."
      }
    ]
  },
  "challenges": {
    "title": "Kansas-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Kansas moves — not generic national checklist filler.",
    "items": [
      {
        "title": "KC metro border hops",
        "detail": "Moves from Johnson or Wyandotte County into Missouri are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Severe weather windows",
        "detail": "Spring storm and tornado seasons can cancel move days. Build weather buffers March–June."
      },
      {
        "title": "Western plains distance",
        "detail": "Far-west jobs create long empty miles. Confirm overnight plans and fuel time on estimates."
      },
      {
        "title": "University lease peaks",
        "detail": "Lawrence, Manhattan, and other campus markets compress August demand. Book early."
      },
      {
        "title": "KCC authority verification",
        "detail": "Confirm the exact legal name holds KCC household goods authority before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Kansas moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Kansas local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Kansas movers need KCC authority?",
      "answer": "Yes. Household goods movers operating within Kansas generally need a Certificate of Public Convenience and Necessity from the Kansas Corporation Commission. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Kansas mover?",
      "answer": "Confirm KCC Transportation authority for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Wichita or KC-side move cost?",
      "answer": "Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Kansas City, KS-to-Wichita move intrastate?",
      "answer": "Yes — both ends are in Kansas, so you generally need a KCC-authorized household goods carrier."
    },
    {
      "question": "When is peak moving season in Kansas?",
      "answer": "Statewide peak is typically May–September. Storms and heat can affect productivity."
    },
    {
      "question": "Does an Overland Park-to-Kansas City, MO move need FMCSA authority?",
      "answer": "Yes. Crossing into Missouri is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "KCC — Transportation",
        "href": "https://www.kcc.ks.gov/transportation"
      },
      {
        "label": "KCC — Household goods tariffs",
        "href": "https://www.kcc.ks.gov/transportation/transportation-quick-links/household-goods-tariffs"
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
