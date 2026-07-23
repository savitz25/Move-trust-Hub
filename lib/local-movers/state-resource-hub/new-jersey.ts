import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 3):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const newJerseyStateResourceHub: StateResourceHubPack = {
  "stateSlug": "new-jersey",
  "stateCode": "NJ",
  "h1": "New Jersey Moving Resource Hub: Costs, DCA Public Mover Licenses & 21 County Guides",
  "metaTitle": "New Jersey Movers Guide 2026 — Costs, DCA Licenses & 21 County Guides",
  "metaDescription": "Plan a move within, to, or from New Jersey. Compare local and intrastate costs, verify New Jersey Division of Consumer Affairs public mover licenses, browse 21 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for New Jersey moves in 2026 — typical costs, DCA public mover vs FMCSA rules, North-to-South Jersey regional guides, and tools to compare licensed movers without paid placements.",
  "trustBar": [
    "21 County Guides",
    "Verified Movers",
    "NJ DCA & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within New Jersey",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To New Jersey",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From New Jersey",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how New Jersey markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My New Jersey Moving Cost",
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
    "title": "Why moving in New Jersey is different",
    "paragraphs": [
      "New Jersey is not one moving market. Bergen and Hudson multi-unit elevators near NYC, Essex/Union dense street staging, Central Jersey HOA suburbs, Shore seasonal congestion, and South Jersey Philly-adjacent logistics produce different access and labor profiles under one state name.",
      "Intrastate public movers must be licensed by the New Jersey Division of Consumer Affairs (Public Movers and Warehousemen). Interstate jobs need FMCSA authority. Toll roads, street permits, co-op boards, and Shore summer traffic are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "New Jersey moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical New Jersey local and intrastate patterns; they are not bids. Always compare written estimates from DCA-licensed public movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical North Jersey studio / 1BR",
        "value": "$700–$2,900+",
        "note": "Elevators, stairs, and parking dominate"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$2,000–$6,500+",
        "note": "HOAs common in Central Jersey"
      },
      {
        "label": "Intrastate corridor (e.g. Bergen ↔ Ocean)",
        "value": "$2,000–$6,500+",
        "note": "Toll and traffic time matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Shore summer peaks compress crews"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · NC · PA · NY · SC",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "21",
        "note": "North and Central emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "New Jersey moving regulations & consumer protection",
    "intro": "New Jersey requires public movers operating within the state to hold a Public Movers and Warehousemen license from the Division of Consumer Affairs. Match the license to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside New Jersey)",
      "body": "If origin or destination is outside New Jersey, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A New Jersey public mover license alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within New Jersey)",
      "body": "Public movers and warehousemen operating within New Jersey are regulated by the Division of Consumer Affairs. Licensed movers are expected to meet insurance, location, tariff, and consumer-protection requirements. Consumers should verify the license and get written estimates that include the NJ public mover license number."
    },
    "verifySteps": [
      "Classify the job: entirely in New Jersey (DCA public mover license) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: verify the Public Movers license via Division of Consumer Affairs license verification tools.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Confirm written estimate includes name, address, phone, and NJ public mover license number.",
      "Avoid large cash deposits to unverified operators; ask about insurance certificates."
    ],
    "protections": [
      {
        "title": "DCA public mover licensing",
        "detail": "The Division of Consumer Affairs regulates public movers and warehousemen and advises consumers to verify licenses and complaint history before hiring."
      },
      {
        "title": "License number on estimates",
        "detail": "Consumer guidance expects licensed movers to include their New Jersey public mover license number on estimates and related paperwork."
      },
      {
        "title": "Insurance and tariff expectations",
        "detail": "Licensed public movers are expected to meet insurance and tariff filing expectations designed to protect consumers on in-state moves."
      }
    ],
    "officialLinks": [
      {
        "label": "NJ DCA — Public Movers and Warehousemen",
        "href": "https://www.njconsumeraffairs.gov/pmw",
        "external": true
      },
      {
        "label": "NJ DCA — License verification",
        "href": "https://newjersey.mylicense.com/verification/",
        "external": true
      },
      {
        "label": "NJ DCA — Regulated business search",
        "href": "https://rgbportal.dca.njoag.gov/public-view/",
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
    "disclaimer": "Licensing rules and verification portals can change. Always verify current DCA public mover license status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "north-jersey",
      "name": "North Jersey",
      "shortName": "North Jersey",
      "blurb": "Bergen, Hudson, Essex, Passaic, Union, Morris, and neighbors with NYC-adjacent multi-unit logistics and dense suburbs.",
      "challenges": [
        "Elevators, co-ops, and street permits",
        "Bridge and tunnel congestion"
      ],
      "countySlugs": [
        "bergen",
        "hudson",
        "essex",
        "passaic",
        "union",
        "morris",
        "sussex",
        "warren"
      ],
      "ctaLabel": "Explore North Jersey"
    },
    {
      "id": "central-jersey",
      "name": "Central Jersey",
      "shortName": "Central Jersey",
      "blurb": "Middlesex, Somerset, Mercer, Monmouth, and Hunterdon with HOA suburbs, Turnpike/Parkway corridors, and mixed urban cores.",
      "challenges": [
        "HOA move windows",
        "Turnpike and Parkway traffic timing"
      ],
      "countySlugs": [
        "middlesex",
        "somerset",
        "hunterdon",
        "mercer",
        "monmouth"
      ],
      "ctaLabel": "Explore Central Jersey"
    },
    {
      "id": "south-jersey",
      "name": "South Jersey",
      "shortName": "South Jersey",
      "blurb": "Ocean, Burlington, Camden, Atlantic, and Shore counties with seasonal peaks and Philly-adjacent patterns.",
      "challenges": [
        "Shore summer congestion",
        "Cross-metro logistics toward Philadelphia"
      ],
      "countySlugs": [
        "ocean",
        "burlington",
        "camden",
        "gloucester",
        "atlantic",
        "cape-may",
        "cumberland",
        "salem"
      ],
      "ctaLabel": "Explore South Jersey"
    }
  ],
  "costs": {
    "title": "New Jersey moving costs",
    "intro": "New Jersey pricing reflects North Jersey labor markets, multi-unit access, tolls, HOAs, and Shore seasonality. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate New Jersey moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical New Jersey local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, tolls, seasonality, and regional labor. Actual bids vary under licensed public mover frameworks. Always compare written estimates from DCA-licensed movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "North Jersey studio / 1BR",
        "value": "$700–$2,900+",
        "note": "Elevators and parking dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,900–$5,500+",
        "note": "HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Essex ↔ Mercer)",
        "value": "$1,900–$5,500+",
        "note": "Tolls and traffic matter"
      },
      {
        "label": "Intrastate long (e.g. Bergen ↔ Cape May)",
        "value": "$2,400–$7,500+",
        "note": "Shore seasonality pushes the top"
      },
      {
        "label": "Typical 2–3 person crew (North Jersey)",
        "value": "$150–$270+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Multi-unit elevators and long carries dominate North Jersey jobs.",
      "HOA windows are common in Central Jersey growth suburbs.",
      "Tolls and congestion change portal-to-portal time statewide.",
      "Shore summer peaks compete with statewide May–September demand.",
      "Co-op and condo boards may require certificates of insurance."
    ]
  },
  "routes": {
    "title": "Popular New Jersey moving routes",
    "intro": "New Jersey is a high-churn Northeast market with strong outbound Sun Belt flows and constant short interstate hops into New York and Pennsylvania. Interstate jobs need FMCSA authority; in-state corridors need DCA-licensed public movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "New Jersey → Florida",
        "href": "/moving-to/florida",
        "origins": "North and Central Jersey",
        "transit": "Multi-day I-95",
        "planningNote": "Book early for winter arrivals.",
        "note": "High-volume Northeast-to-Florida corridor."
      },
      {
        "label": "New Jersey → Carolinas",
        "href": "/local-movers/north-carolina",
        "origins": "Statewide",
        "transit": "I-95 multi-day",
        "planningNote": "HOAs at destination common.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "New Jersey → New York / Pennsylvania",
        "href": "/local-movers/new-york",
        "origins": "North and South Jersey",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are extremely common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Bergen County",
        "href": "/local-movers/new-jersey/bergen",
        "note": "NYC-adjacent multi-unit and suburban mix."
      },
      {
        "label": "Moving to Middlesex County",
        "href": "/local-movers/new-jersey/middlesex",
        "note": "Central Jersey corridors and HOAs."
      },
      {
        "label": "Moving to Monmouth County",
        "href": "/local-movers/new-jersey/monmouth",
        "note": "Shore-adjacent suburbs and seasonal peaks."
      }
    ]
  },
  "challenges": {
    "title": "New Jersey-specific moving challenges & tips",
    "intro": "These issues show up constantly on real New Jersey moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Multi-unit and co-op access",
        "detail": "North Jersey buildings often need certificates of insurance, elevator reservations, and strict loading windows. Start paperwork a week early."
      },
      {
        "title": "Street permits and tight staging",
        "detail": "Dense towns may require parking permits for trucks. Share approach photos and curb rules with estimators."
      },
      {
        "title": "Shore summer congestion",
        "detail": "Ocean and Atlantic county moves in summer can double transit time. Avoid Friday arrivals when possible."
      },
      {
        "title": "Short interstate hops",
        "detail": "Moves into NYC or Pennsylvania are still interstate. Confirm FMCSA authority even for a one-hour haul."
      },
      {
        "title": "License verification",
        "detail": "Confirm the exact legal name holds an active New Jersey public mover license before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate New Jersey moves."
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
      "description": "Interstate-ready planning checklist you can adapt for New Jersey local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do New Jersey movers need a state license?",
      "answer": "Yes. Public movers operating within New Jersey generally need a Public Movers and Warehousemen license from the Division of Consumer Affairs. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a New Jersey mover is licensed?",
      "answer": "Use the Division of Consumer Affairs license verification tools and match the legal name on your written estimate. Estimates should include the NJ public mover license number."
    },
    {
      "question": "How much does a local North Jersey move cost?",
      "answer": "Planning ranges often fall around $700–$2,900+ for a studio/1BR and more for larger homes, driven by elevators, parking, and labor markets. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Bergen-to-Ocean County move intrastate?",
      "answer": "Yes — both ends are in New Jersey, so you generally need a DCA-licensed public mover."
    },
    {
      "question": "Does a move from Hoboken to Manhattan need FMCSA authority?",
      "answer": "Yes. Crossing into New York is interstate even if the distance is short. Confirm active FMCSA operating authority and a USDOT number."
    },
    {
      "question": "When is peak moving season in New Jersey?",
      "answer": "Statewide peak is typically May–September, with additional Shore congestion in summer months."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "NJ DCA — Public Movers and Warehousemen",
        "href": "https://www.njconsumeraffairs.gov/pmw"
      },
      {
        "label": "NJ DCA — License verification",
        "href": "https://newjersey.mylicense.com/verification/"
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
