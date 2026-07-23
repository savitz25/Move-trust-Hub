import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 6):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const connecticutStateResourceHub: StateResourceHubPack = {
  "stateSlug": "connecticut",
  "stateCode": "CT",
  "h1": "Connecticut Moving Resource Hub: Costs, CTDOT Certificates & 8 County Guides",
  "metaTitle": "Connecticut Movers Guide 2026 — Costs, HHG Certificates & 8 County Guides",
  "metaDescription": "Plan a move within, to, or from Connecticut. Compare local and intrastate costs, verify Connecticut household goods carrier certificates, browse 8 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Connecticut moves in 2026 — typical costs, CT household goods vs FMCSA rules, Fairfield-to-New London regional guides, and tools to compare certificated movers without paid placements.",
  "trustBar": [
    "8 County Guides",
    "Verified Movers",
    "CT Cert & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Connecticut",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Connecticut",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Connecticut",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Connecticut markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Connecticut Moving Cost",
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
    "title": "Why moving in Connecticut is different",
    "paragraphs": [
      "Connecticut is not one moving market. Fairfield County NYC-adjacent multi-unit logistics, New Haven and Hartford urban cores, shoreline seasonal congestion, and Litchfield hills produce different access and labor profiles under one state name — even with only eight counties.",
      "Household goods movers operating within Connecticut generally need a Household Goods Carrier Certificate (CTDOT certificate frameworks). Interstate jobs need FMCSA authority. Toll roads, co-op boards, winter ice, and short hops into New York, Massachusetts, and Rhode Island are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Connecticut moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Connecticut local and intrastate patterns; they are not bids. Always compare written estimates from certificated movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Fairfield studio / 1BR",
        "value": "$700–$2,900+",
        "note": "Elevators, stairs, and parking dominate"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$2,000–$6,500+",
        "note": "HOAs and long driveways common"
      },
      {
        "label": "Intrastate corridor (e.g. Stamford ↔ Hartford)",
        "value": "$1,900–$6,000+",
        "note": "I-95 / I-84 timing matters"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "College and lease peaks compress crews"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · NY · MA · NC · SC",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "8",
        "note": "Fairfield and Hartford emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Connecticut moving regulations & consumer protection",
    "intro": "Connecticut requires household goods movers operating within the state to hold appropriate Household Goods Carrier Certificate authority under state transportation frameworks. Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Connecticut)",
      "body": "If origin or destination is outside Connecticut, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Connecticut household goods certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Connecticut)",
      "body": "Movers transporting household goods within Connecticut generally need a Household Goods Carrier Certificate (CTDOT certificate lists and consumer guidance). Confirm the certificate for the legal name on your estimate and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Connecticut (state HHG certificate) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm a Connecticut Household Goods Carrier Certificate for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance certificates, and inventory details.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Household Goods Carrier Certificate",
        "detail": "Connecticut consumer materials state movers must have a Household Goods Carrier Certificate or related motor carrier permit authority to transport household goods."
      },
      {
        "title": "CTDOT certificate listings",
        "detail": "State resources publish lists of household goods movers with CTDOT certificates for consumer verification."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing — especially on Fairfield multi-unit jobs."
      }
    ],
    "officialLinks": [
      {
        "label": "CT.gov — Movers and moving consumer facts",
        "href": "https://portal.ct.gov/dcp/common-elements/consumer-facts-and-contacts/movers-and-moving",
        "external": true
      },
      {
        "label": "CTDOT — Household goods movers with certificate",
        "href": "https://portal.ct.gov/dot/publictrans/bureau-of-public-transportation/household-goods-movers-with-ctdot-cert",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current Connecticut household goods certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "southwest-ct",
      "name": "Southwest Connecticut",
      "shortName": "Southwest CT",
      "blurb": "Fairfield and New Haven with NYC-adjacent multi-unit logistics, shoreline towns, and dense suburbs.",
      "challenges": [
        "Elevators, co-ops, and street permits",
        "I-95 congestion windows"
      ],
      "countySlugs": [
        "fairfield",
        "new-haven"
      ],
      "ctaLabel": "Explore Southwest Connecticut"
    },
    {
      "id": "central-ct",
      "name": "Central Connecticut",
      "shortName": "Central CT",
      "blurb": "Hartford, Middlesex, and Tolland with capital-city logistics, suburbs, and I-84 corridors.",
      "challenges": [
        "Mixed multi-unit and suburban access",
        "I-84 / I-91 timing"
      ],
      "countySlugs": [
        "hartford",
        "middlesex",
        "tolland"
      ],
      "ctaLabel": "Explore Central Connecticut"
    },
    {
      "id": "eastern-ct",
      "name": "Eastern Connecticut",
      "shortName": "Eastern CT",
      "blurb": "New London and Windham with shoreline, casino-corridor traffic, and rural approaches.",
      "challenges": [
        "Shoreline seasonal congestion",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "new-london",
        "windham"
      ],
      "ctaLabel": "Explore Eastern Connecticut"
    },
    {
      "id": "northwest-ct",
      "name": "Northwest Connecticut",
      "shortName": "Northwest CT",
      "blurb": "Litchfield County hills, longer driveways, and thinner local coverage in places.",
      "challenges": [
        "Hill driveways and winter ice",
        "Longer regional hauls from the shore"
      ],
      "countySlugs": [
        "litchfield"
      ],
      "ctaLabel": "Explore Northwest Connecticut"
    }
  ],
  "costs": {
    "title": "Connecticut moving costs",
    "intro": "Connecticut pricing reflects Fairfield labor markets, multi-unit access, HOAs, tolls, and winter weather. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Connecticut moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Connecticut local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, tolls, seasonality, and regional labor. Actual bids vary. Always compare written estimates from certificated movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Fairfield studio / 1BR",
        "value": "$700–$2,900+",
        "note": "Elevators and parking dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,900–$5,500+",
        "note": "HOAs and long driveways common"
      },
      {
        "label": "Intrastate mid-size (e.g. New Haven ↔ Hartford)",
        "value": "$1,800–$5,500+",
        "note": "I-91 timing matters"
      },
      {
        "label": "Intrastate long (e.g. Stamford ↔ New London)",
        "value": "$2,200–$7,000+",
        "note": "I-95 congestion pushes hours"
      },
      {
        "label": "Typical 2–3 person crew (Southwest CT)",
        "value": "$150–$270+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Fairfield multi-unit buildings add elevator and security-desk time.",
      "I-95 congestion changes portal-to-portal hours along the shore.",
      "HOA and co-op rules often require certificates of insurance.",
      "Winter ice can force flexible dates inland and on hills.",
      "Short hops into NY, MA, or RI are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Connecticut moving routes",
    "intro": "Connecticut is a high-churn Northeast market with strong outbound Sun Belt flows and constant short interstate hops into New York, Massachusetts, and Rhode Island. Interstate jobs need FMCSA authority; in-state corridors need certificated household goods movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Connecticut → Florida",
        "href": "/moving-to/florida",
        "origins": "Fairfield, Hartford, New Haven",
        "transit": "Multi-day I-95",
        "planningNote": "Book early for winter arrivals.",
        "note": "High-volume Northeast-to-Florida corridor."
      },
      {
        "label": "Connecticut → Carolinas",
        "href": "/local-movers/north-carolina",
        "origins": "Statewide",
        "transit": "I-95 multi-day",
        "planningNote": "HOAs at destination common.",
        "note": "Popular lifestyle outbound destinations."
      },
      {
        "label": "Connecticut → New York / Massachusetts",
        "href": "/local-movers/new-york",
        "origins": "Fairfield, Litchfield, Hartford",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are extremely common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Fairfield County",
        "href": "/local-movers/connecticut/fairfield",
        "note": "NYC-adjacent multi-unit and suburban mix."
      },
      {
        "label": "Moving to Hartford County",
        "href": "/local-movers/connecticut/hartford",
        "note": "Capital region logistics and suburbs."
      },
      {
        "label": "Moving to New Haven County",
        "href": "/local-movers/connecticut/new-haven",
        "note": "Urban cores and shoreline communities."
      }
    ]
  },
  "challenges": {
    "title": "Connecticut-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Connecticut moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Fairfield multi-unit access",
        "detail": "Co-ops and condos often need certificates of insurance, elevator reservations, and strict loading windows. Start paperwork early."
      },
      {
        "title": "I-95 corridor congestion",
        "detail": "Shoreline truck timing can double portal-to-portal hours. Avoid peak commute windows when possible."
      },
      {
        "title": "Short interstate hops",
        "detail": "Moves into NYC, Westchester, or Massachusetts are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Winter ice on hills",
        "detail": "Litchfield and inland driveways can ice over. Build weather buffers November–March."
      },
      {
        "title": "Certificate verification",
        "detail": "Confirm the exact legal name holds a Connecticut Household Goods Carrier Certificate before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Connecticut moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Connecticut local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Connecticut movers need a state certificate?",
      "answer": "Yes. Household goods movers operating within Connecticut generally need a Household Goods Carrier Certificate. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Connecticut mover?",
      "answer": "Confirm CT household goods certificate status for the legal name on your estimate using state CTDOT/consumer resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Fairfield County move cost?",
      "answer": "Planning ranges often fall around $700–$2,900+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Stamford-to-Hartford move intrastate?",
      "answer": "Yes — both ends are in Connecticut, so you generally need a certificated household goods mover."
    },
    {
      "question": "When is peak moving season in Connecticut?",
      "answer": "Statewide peak is typically May–September, with additional pressure around college and lease turnovers."
    },
    {
      "question": "Does a Greenwich-to-Westchester move need FMCSA authority?",
      "answer": "Yes. Crossing into New York is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "CT.gov — Movers and moving",
        "href": "https://portal.ct.gov/dcp/common-elements/consumer-facts-and-contacts/movers-and-moving"
      },
      {
        "label": "CTDOT — Household goods movers with certificate",
        "href": "https://portal.ct.gov/dot/publictrans/bureau-of-public-transportation/household-goods-movers-with-ctdot-cert"
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
