import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 7):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: balanced
 * - Regulation mode: strong_state_regulator
 */
export const newMexicoStateResourceHub: StateResourceHubPack = {
  "stateSlug": "new-mexico",
  "stateCode": "NM",
  "h1": "New Mexico Moving Resource Hub: Costs, Motor Carrier Authority & 33 County Guides",
  "metaTitle": "New Mexico Movers Guide 2026 — Costs, CPCN Authority & 33 County Guides",
  "metaDescription": "Plan a move within, to, or from New Mexico. Compare local and intrastate costs, verify household goods Certificate of Public Convenience and Necessity authority, browse 33 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for New Mexico moves in 2026 — typical costs, state motor carrier vs FMCSA rules, Albuquerque-to-Las Cruces regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "33 County Guides",
    "Verified Movers",
    "NM Authority & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within New Mexico",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To New Mexico",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From New Mexico",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how New Mexico markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My New Mexico Moving Cost",
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
    "title": "Why moving in New Mexico is different",
    "paragraphs": [
      "New Mexico is not one moving market. Albuquerque multi-unit and adobe-access logistics, Santa Fe historic constraints, Las Cruces border-adjacent growth, oil-patch southeast traffic, and high-desert mountain approaches produce different access and labor profiles under one state name.",
      "Intrastate motor carriers of household goods must obtain a Certificate of Public Convenience and Necessity through New Mexico motor carrier authority frameworks (historically PRC Transportation; applications processing has been transitioning with NMDOT coordination). Interstate jobs need FMCSA authority. Altitude, summer monsoons, and long I-25/I-40 hauls are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "New Mexico moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical New Mexico local and intrastate patterns; they are not bids. Always compare written estimates and confirm state or FMCSA authority for your route.",
    "stats": [
      {
        "label": "Typical Albuquerque studio / 1BR",
        "value": "$450–$2,100+",
        "note": "Access and altitude matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,600–$5,000+",
        "note": "HOAs and long driveways vary"
      },
      {
        "label": "Intrastate corridor (e.g. Albuquerque ↔ Las Cruces)",
        "value": "$1,800–$5,500+",
        "note": "I-25 distance and season matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Monsoon and heat affect productivity"
      },
      {
        "label": "Top inbound origins",
        "value": "TX · CA · AZ · CO · OK",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "33",
        "note": "Albuquerque and Santa Fe emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "New Mexico moving regulations & consumer protection",
    "intro": "New Mexico requires intrastate motor carriers of household goods to obtain a Certificate of Public Convenience and Necessity under state motor carrier authority frameworks. Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside New Mexico)",
      "body": "If origin or destination is outside New Mexico, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. New Mexico household goods CPCN authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within New Mexico)",
      "body": "Intrastate motor carriers of passengers and household goods must submit applications for a Certificate of Public Convenience and Necessity. Applications processing for regulated motor carriers has historically been handled through PRC Transportation and has been coordinating transition work with NMDOT — confirm current application channels when verifying a carrier. Consumers should confirm active authority and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in New Mexico (state HHG CPCN) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm Certificate of Public Convenience and Necessity authority for household goods.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance/valuation clarity, and inventory details.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Certificate of Public Convenience and Necessity",
        "detail": "Intrastate motor carriers of household goods must obtain CPCN authority under New Mexico motor carrier frameworks before operating for hire within the state."
      },
      {
        "title": "Applications processing",
        "detail": "State applications units process authorities to operate as regulated motor carriers, including household goods moving services."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, adobe access, long carries, and packing before signing."
      }
    ],
    "officialLinks": [
      {
        "label": "NMDOT — PRC transportation transition note",
        "href": "https://www.dot.nm.gov/blog/2024/05/21/prc-transportation-coming-soon/",
        "external": true
      },
      {
        "label": "NM MVD — CPCN for passengers and household goods",
        "href": "https://www.mvd.newmexico.gov/who-has-to-get-a-certificate-of-public-convenience-and-necessity/",
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
    "disclaimer": "Agency responsibilities and application channels can change during administrative transitions. Always verify current New Mexico household goods authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "albuquerque-metro",
      "name": "Albuquerque Metro",
      "shortName": "Albuquerque Metro",
      "blurb": "Bernalillo, Sandoval, Valencia, and neighbors with multi-unit access, HOAs, and I-25/I-40 logistics.",
      "challenges": [
        "Altitude and summer monsoon delays",
        "HOA windows in growth suburbs"
      ],
      "countySlugs": [
        "bernalillo",
        "sandoval",
        "valencia",
        "torrance",
        "cibola"
      ],
      "ctaLabel": "Explore Albuquerque Metro"
    },
    {
      "id": "santa-fe-north",
      "name": "Santa Fe & Northern New Mexico",
      "shortName": "Santa Fe / North",
      "blurb": "Santa Fe, Taos, and northern counties with historic access constraints and mountain approaches.",
      "challenges": [
        "Historic district truck limits",
        "Mountain weather and narrow roads"
      ],
      "countySlugs": [
        "santa-fe",
        "los-alamos",
        "rio-arriba",
        "taos",
        "mora",
        "san-miguel",
        "colfax",
        "union",
        "harding",
        "guadalupe"
      ],
      "ctaLabel": "Explore Santa Fe / North"
    },
    {
      "id": "southern-nm",
      "name": "Southern New Mexico",
      "shortName": "Southern NM",
      "blurb": "Las Cruces, border-adjacent growth, and southern high-desert counties.",
      "challenges": [
        "Heat and monsoon timing",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "doa-ana",
        "otero",
        "luna",
        "sierra",
        "grant",
        "hidalgo",
        "catron",
        "socorro"
      ],
      "ctaLabel": "Explore Southern New Mexico"
    },
    {
      "id": "southeast-nm",
      "name": "Southeast New Mexico",
      "shortName": "Southeast NM",
      "blurb": "Roswell, Carlsbad, Hobbs, and oil-patch corridors with industrial traffic and longer hauls.",
      "challenges": [
        "Industrial traffic and crew lodging demand",
        "Long portal-to-portal distances"
      ],
      "countySlugs": [
        "chaves",
        "eddy",
        "lea",
        "lincoln",
        "roosevelt",
        "curry",
        "de-baca",
        "quay"
      ],
      "ctaLabel": "Explore Southeast New Mexico"
    },
    {
      "id": "northwest-nm",
      "name": "Northwest New Mexico",
      "shortName": "Northwest NM",
      "blurb": "Farmington and Gallup approaches with longer regional hauls and Four Corners logistics.",
      "challenges": [
        "Distance from Albuquerque fleets",
        "Confirm mover coverage early"
      ],
      "countySlugs": [
        "san-juan",
        "mckinley"
      ],
      "ctaLabel": "Explore Northwest New Mexico"
    }
  ],
  "costs": {
    "title": "New Mexico moving costs",
    "intro": "New Mexico pricing reflects Albuquerque labor markets, altitude, monsoons, historic access, and long I-25/I-40 hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate New Mexico moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical New Mexico local and intrastate patterns: home size, distance, stairs, parking, altitude, weather, and regional labor. Actual bids vary. Always compare written estimates and confirm state or FMCSA authority for your route."
    },
    "ranges": [
      {
        "label": "Albuquerque studio / 1BR",
        "value": "$450–$2,100+",
        "note": "Access and altitude dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,500–$4,800+",
        "note": "HOAs vary"
      },
      {
        "label": "Intrastate mid-size (e.g. Albuquerque ↔ Santa Fe)",
        "value": "$1,500–$4,800+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Albuquerque ↔ Las Cruces or Farmington)",
        "value": "$2,000–$6,500+",
        "note": "Distance drives hours"
      },
      {
        "label": "Typical 2–3 person crew (Albuquerque)",
        "value": "$110–$210+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Altitude can slow labor productivity for some crews.",
      "Summer monsoons force flexible afternoon schedules.",
      "Santa Fe historic districts constrain truck length and parking.",
      "Southeast oil-patch lodging competition can raise crew costs.",
      "Short hops into TX, AZ, CO, or OK are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular New Mexico moving routes",
    "intro": "New Mexico bridges Texas, Colorado, and Arizona corridors with strong Albuquerque internal traffic and large I-40/I-25 flows. Interstate jobs need FMCSA authority; in-state corridors need properly authorized household goods carriers.",
    "migrationProfile": "balanced",
    "outbound": [
      {
        "label": "New Mexico → Texas",
        "href": "/local-movers/texas",
        "origins": "Albuquerque, Las Cruces, Southeast NM",
        "transit": "I-40 / I-10 multi-day or same-day near border",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Highest-volume outbound corridor."
      },
      {
        "label": "New Mexico → Arizona / Colorado",
        "href": "/local-movers/arizona",
        "origins": "Albuquerque, Northwest NM, North",
        "transit": "I-40 / I-25 multi-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Common Mountain West hops."
      },
      {
        "label": "New Mexico → California",
        "href": "/local-movers/california",
        "origins": "Albuquerque metro",
        "transit": "Multi-day I-40",
        "planningNote": "CA second hops may need BHGS for in-CA legs.",
        "note": "Popular lifestyle outbound route."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Bernalillo County (Albuquerque)",
        "href": "/local-movers/new-mexico/bernalillo",
        "note": "Multi-unit access and I-25/I-40 logistics."
      },
      {
        "label": "Moving to Santa Fe County",
        "href": "/local-movers/new-mexico/santa-fe",
        "note": "Historic access and mountain approaches."
      },
      {
        "label": "Moving to Doña Ana County (Las Cruces)",
        "href": "/local-movers/new-mexico/doa-ana",
        "note": "Southern growth and border-adjacent patterns."
      }
    ]
  },
  "challenges": {
    "title": "New Mexico-specific moving challenges & tips",
    "intro": "These issues show up constantly on real New Mexico moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Santa Fe historic access",
        "detail": "Narrow streets and historic constraints may require smaller trucks. Share approach photos early."
      },
      {
        "title": "Monsoon afternoons",
        "detail": "Summer storms can halt outdoor work with little notice. Prefer morning loading windows July–September."
      },
      {
        "title": "Altitude and long hauls",
        "detail": "Albuquerque–Las Cruces and Albuquerque–Farmington are long crew days. Confirm overnight plans on estimates."
      },
      {
        "title": "Border hops into Texas or Arizona",
        "detail": "Short interstate jobs still need FMCSA authority. Confirm before deposits."
      },
      {
        "title": "Authority verification during agency transitions",
        "detail": "Confirm the exact legal name holds current New Mexico household goods CPCN authority through the active application channel before deposits."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate New Mexico moves."
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
      "description": "Interstate-ready planning checklist you can adapt for New Mexico local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do New Mexico movers need a CPCN?",
      "answer": "Yes. Intrastate motor carriers of household goods generally need a Certificate of Public Convenience and Necessity under New Mexico motor carrier frameworks. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a New Mexico mover?",
      "answer": "Confirm household goods CPCN authority for the legal name on your estimate through current state motor carrier application channels. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Albuquerque move cost?",
      "answer": "Planning ranges often fall around $450–$2,100+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is an Albuquerque-to-Santa Fe move intrastate?",
      "answer": "Yes — both ends are in New Mexico, so you generally need a properly authorized household goods carrier."
    },
    {
      "question": "When is peak moving season in New Mexico?",
      "answer": "Statewide peak is typically May–September. Monsoon storms can affect summer productivity."
    },
    {
      "question": "Does an Albuquerque-to-El Paso move need FMCSA authority?",
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
        "label": "NMDOT — PRC transportation transition",
        "href": "https://www.dot.nm.gov/blog/2024/05/21/prc-transportation-coming-soon/"
      },
      {
        "label": "NM MVD — CPCN requirements",
        "href": "https://www.mvd.newmexico.gov/who-has-to-get-a-certificate-of-public-convenience-and-necessity/"
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
