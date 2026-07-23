import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 10 — final):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const newHampshireStateResourceHub: StateResourceHubPack = {
  "stateSlug": "new-hampshire",
  "stateCode": "NH",
  "h1": "New Hampshire Moving Resource Hub: Costs, HHG Carrier Authority & 10 County Guides",
  "metaTitle": "New Hampshire Movers Guide 2026 — Costs, NHPC Authority & 10 County Guides",
  "metaDescription": "Plan a move within, to, or from New Hampshire. Compare local and intrastate costs, verify New Hampshire household goods carrier authority, browse 10 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for New Hampshire moves in 2026 — typical costs, state HHG authority vs FMCSA rules, Seacoast-to-North Country regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "10 County Guides",
    "Verified Movers",
    "NH Authority & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within New Hampshire",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To New Hampshire",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From New Hampshire",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how New Hampshire markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My New Hampshire Moving Cost",
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
    "title": "Why moving in New Hampshire is different",
    "paragraphs": [
      "New Hampshire is not one moving market. Seacoast multi-unit and MA-border logistics, Manchester–Nashua growth corridors, Lakes Region seasonal peaks, and North Country long hauls produce different access and labor profiles under one state name — with only ten counties but sharp micro-climates.",
      "Intrastate household goods carriers generally need Household Goods Carrier authority under New Hampshire Department of Safety / Bureau frameworks (RSA 359-T rules; NHPC-style carrier identifiers in consumer guidance). Interstate jobs need FMCSA authority. Winter ice, leaf-season traffic, and short hops into Massachusetts and Maine are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "New Hampshire moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical New Hampshire local and intrastate patterns; they are not bids. Always compare written estimates from authorized carriers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Manchester / Seacoast studio / 1BR",
        "value": "$550–$2,400+",
        "note": "Stairs, elevators, and winter staging"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,700–$5,200+",
        "note": "HOAs and long driveways vary"
      },
      {
        "label": "Intrastate mid-size (e.g. Nashua ↔ Concord)",
        "value": "$1,500–$4,800+",
        "note": "Season matters"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Foliage and ski seasons create second peaks"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · MA · ME · NC · SC · TX",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "10",
        "note": "Seacoast and Hillsborough emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "New Hampshire moving regulations & consumer protection",
    "intro": "New Hampshire requires intrastate household goods carriers to hold Household Goods Carrier authority under state Department of Safety Bureau frameworks (RSA 359-T and related rules). Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside New Hampshire)",
      "body": "If origin or destination is outside New Hampshire, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. New Hampshire household goods authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within New Hampshire)",
      "body": "Intrastate movers must obtain Household Goods Carrier authority (permit or certificate pathways under Bureau rules). Updated rules emphasize written estimates on customer request, annual household-goods vehicle registration with DMV for vehicles used in service, and fitness-to-perform evaluations for new authority. Consumers should confirm active authority and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in New Hampshire (state HHG authority) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm New Hampshire household goods carrier authority for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Request a written estimate (carriers must provide one on customer request under current rules).",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Household goods carrier authority",
        "detail": "New Hampshire requires household goods carriers to hold state authority under RSA 359-T frameworks administered through the Department of Safety Bureau of common carriers rules."
      },
      {
        "title": "Written estimates on request",
        "detail": "Updated regulatory guidance requires household goods carriers to provide a written estimate of cost upon the request of any customer."
      },
      {
        "title": "Vehicle registration for HHG service",
        "detail": "Carriers with active authority register each vehicle used in household goods service annually with the Division of Motor Vehicles."
      }
    ],
    "officialLinks": [
      {
        "label": "New Hampshire Department of Transportation",
        "href": "https://www.nh.gov/dot/",
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
    "disclaimer": "Licensing rules and application channels can change. Always verify current New Hampshire household goods authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "seacoast-south",
      "name": "Seacoast & Southern New Hampshire",
      "shortName": "Seacoast / South",
      "blurb": "Rockingham, Strafford, and Hillsborough with MA-border hops, multi-unit access, and dense suburbs.",
      "challenges": [
        "Short MA hops need FMCSA authority",
        "Elevators, HOAs, and winter ice"
      ],
      "countySlugs": [
        "rockingham",
        "strafford",
        "hillsborough"
      ],
      "ctaLabel": "Explore Seacoast / South"
    },
    {
      "id": "central-nh",
      "name": "Central New Hampshire",
      "shortName": "Central NH",
      "blurb": "Merrimack, Belknap, and Sullivan with capital logistics and Lakes Region approaches.",
      "challenges": [
        "Seasonal lake-home access",
        "I-93 congestion windows"
      ],
      "countySlugs": [
        "merrimack",
        "belknap",
        "sullivan"
      ],
      "ctaLabel": "Explore Central New Hampshire"
    },
    {
      "id": "lakes-north",
      "name": "Lakes Region & North Country",
      "shortName": "Lakes / North",
      "blurb": "Carroll, Grafton, and Coos with mountain access, ski peaks, and thinner northern fleets.",
      "challenges": [
        "Mountain weather and long empty miles",
        "Confirm coverage for remote addresses"
      ],
      "countySlugs": [
        "carroll",
        "grafton",
        "coos"
      ],
      "ctaLabel": "Explore Lakes / North Country"
    },
    {
      "id": "southwest-nh",
      "name": "Southwest New Hampshire",
      "shortName": "Southwest",
      "blurb": "Cheshire County with VT/MA border patterns and mixed rural-town access.",
      "challenges": [
        "Short VT/MA hops need FMCSA authority",
        "Confirm mover coverage early"
      ],
      "countySlugs": [
        "cheshire"
      ],
      "ctaLabel": "Explore Southwest New Hampshire"
    }
  ],
  "costs": {
    "title": "New Hampshire moving costs",
    "intro": "New Hampshire pricing reflects Seacoast and Manchester labor markets, winter weather, and short interstate border hops. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate New Hampshire moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical New Hampshire local and intrastate patterns: home size, distance, stairs/elevators, parking, winter weather, and regional labor. Actual bids vary with season and tourism peaks. Always compare written estimates from authorized movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Manchester / Seacoast studio / 1BR",
        "value": "$550–$2,400+",
        "note": "Stairs and winter access dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,000+",
        "note": "HOAs and long driveways vary"
      },
      {
        "label": "Intrastate mid-size (e.g. Nashua ↔ Concord)",
        "value": "$1,500–$4,800+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Nashua ↔ North Country)",
        "value": "$2,000–$7,000+",
        "note": "Distance and weather push hours"
      },
      {
        "label": "Typical 2–3 person crew (southern NH)",
        "value": "$125–$230+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Winter ice and snow force flexible dates statewide.",
      "Southern multi-unit buildings add stair and elevator time.",
      "Foliage and ski seasons can tighten crews outside summer peak.",
      "North Country jobs include long empty miles from Seacoast fleets.",
      "Short hops into MA, ME, VT, or NY are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular New Hampshire moving routes",
    "intro": "New Hampshire sees strong outbound Sun Belt flows, constant short interstate hops into Massachusetts and Maine, and large Seacoast–Lakes internal traffic. Interstate jobs need FMCSA authority; in-state corridors need authorized household goods carriers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "New Hampshire → Florida / Carolinas",
        "href": "/moving-to/florida",
        "origins": "Seacoast, Hillsborough",
        "transit": "Multi-day I-95",
        "planningNote": "Book early for winter arrivals.",
        "note": "High-volume Northeast snowbird corridor."
      },
      {
        "label": "New Hampshire → Massachusetts / Maine",
        "href": "/local-movers/massachusetts",
        "origins": "Southern and Seacoast NH",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Extremely common short cross-border metro moves."
      },
      {
        "label": "New Hampshire → Texas / Arizona",
        "href": "/local-movers/texas",
        "origins": "Statewide",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular long-haul outbound destinations."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Hillsborough County",
        "href": "/local-movers/new-hampshire/hillsborough",
        "note": "Manchester–Nashua multi-unit and suburban mix."
      },
      {
        "label": "Moving to Rockingham County",
        "href": "/local-movers/new-hampshire/rockingham",
        "note": "Seacoast logistics and MA-border patterns."
      },
      {
        "label": "Moving to Merrimack County (Concord)",
        "href": "/local-movers/new-hampshire/merrimack",
        "note": "Capital corridors and Lakes approaches."
      }
    ]
  },
  "challenges": {
    "title": "New Hampshire-specific moving challenges & tips",
    "intro": "These issues show up constantly on real New Hampshire moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Winter ice and snow",
        "detail": "Driveways and mountain roads can ice over for days. Build weather buffers November–March."
      },
      {
        "title": "MA border hops",
        "detail": "Jobs from Nashua or Seacoast into Massachusetts are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Written estimate rules",
        "detail": "Current HHG rules emphasize written estimates on customer request — get one in writing before move day."
      },
      {
        "title": "North Country empty miles",
        "detail": "Coos and northern Grafton jobs create long empty miles from southern fleets. Confirm coverage early."
      },
      {
        "title": "Authority verification",
        "detail": "Confirm the exact legal name holds New Hampshire household goods carrier authority before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate New Hampshire moves."
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
      "description": "Interstate-ready planning checklist you can adapt for New Hampshire local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do New Hampshire movers need state authority?",
      "answer": "Yes. Intrastate household goods carriers generally need Household Goods Carrier authority under New Hampshire Department of Safety Bureau frameworks. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a New Hampshire mover?",
      "answer": "Confirm state household goods carrier authority for the legal name on your estimate and request a written estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Manchester or Seacoast move cost?",
      "answer": "Planning ranges often fall around $550–$2,400+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Nashua-to-Concord move intrastate?",
      "answer": "Yes — both ends are in New Hampshire, so you generally need an authorized household goods carrier."
    },
    {
      "question": "When is peak moving season in New Hampshire?",
      "answer": "Statewide peak is typically May–September. Foliage and ski seasons can create additional demand spikes."
    },
    {
      "question": "Does a Nashua-to-Lowell move need FMCSA authority?",
      "answer": "Yes. Crossing into Massachusetts is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "New Hampshire Department of Transportation",
        "href": "https://www.nh.gov/dot/"
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
