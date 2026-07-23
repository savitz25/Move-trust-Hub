import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 10 — final):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const rhodeIslandStateResourceHub: StateResourceHubPack = {
  "stateSlug": "rhode-island",
  "stateCode": "RI",
  "h1": "Rhode Island Moving Resource Hub: Costs, DPUC Certificates & 5 County Guides",
  "metaTitle": "Rhode Island Movers Guide 2026 — Costs, DPUC Certificates & 5 County Guides",
  "metaDescription": "Plan a move within, to, or from Rhode Island. Compare local and intrastate costs, verify Rhode Island Division of Public Utilities and Carriers household goods certificates, browse 5 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Rhode Island moves in 2026 — typical costs, DPUC vs FMCSA rules, Providence-to-South County guides, and tools to compare certificated movers without paid placements.",
  "trustBar": [
    "5 County Guides",
    "Verified Movers",
    "RI DPUC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Rhode Island",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Rhode Island",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Rhode Island",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Rhode Island markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Rhode Island Moving Cost",
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
    "title": "Why moving in Rhode Island is different",
    "paragraphs": [
      "Rhode Island is not one moving market. Providence multi-unit elevators and tight streets, East Bay and Kent County suburbs, Newport tourism congestion, and South County coastal access produce different labor profiles under one state name — with only five counties but dense border pressure from Massachusetts and Connecticut.",
      "Intrastate household goods movers must hold a certificate from the Rhode Island Division of Public Utilities and Carriers (DPUC). Interstate jobs need FMCSA authority. Winter ice, college peaks, and short hops into Massachusetts and Connecticut are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Rhode Island moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Rhode Island local and intrastate patterns; they are not bids. Always compare written estimates from DPUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Providence studio / 1BR",
        "value": "$550–$2,500+",
        "note": "Stairs, elevators, and tight streets"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,700–$5,200+",
        "note": "HOAs and coastal access vary"
      },
      {
        "label": "Intrastate mid-size (e.g. Providence ↔ Warwick or Newport)",
        "value": "$1,400–$4,800+",
        "note": "Season and traffic matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "College and tourism peaks compress crews"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · MA · CT · NC · SC · NY",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "5",
        "note": "Providence emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Rhode Island moving regulations & consumer protection",
    "intro": "Rhode Island requires household goods movers operating within the state to hold a certificate from the Division of Public Utilities and Carriers. Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Rhode Island)",
      "body": "If origin or destination is outside Rhode Island, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Rhode Island DPUC household goods certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Rhode Island)",
      "body": "To receive a certificate to transport household goods, applicants must prove fitness, willingness, and ability to provide the proposed service under DPUC Motor Carriers Division jurisdiction. DPUC publishes licensed moving company lists and moving information for consumers. Carriers must provide a Bill of Lading as receipt and contract for household goods transportation."
    },
    "verifySteps": [
      "Classify the job: entirely in Rhode Island (DPUC certificate) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm DPUC licensed household goods carrier status for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get a written estimate and Bill of Lading before move day.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "DPUC household goods certificate",
        "detail": "Rhode Island Division of Public Utilities and Carriers certificates household goods movers; applicants must prove fitness, willingness, and ability to perform the service."
      },
      {
        "title": "Public licensed mover lists",
        "detail": "DPUC maintains consumer-facing lists of licensed moving companies and advises calling Motor Carriers for questions."
      },
      {
        "title": "Bill of Lading requirement",
        "detail": "Movers must provide customers with a Bill of Lading that serves as a receipt and contract for the transportation of household goods."
      }
    ],
    "officialLinks": [
      {
        "label": "RI DPUC — Moving information",
        "href": "https://ripuc.ri.gov/utility-information/motor-carriers/moving-information",
        "external": true
      },
      {
        "label": "RI DPUC — Motor Carriers Division jurisdiction",
        "href": "https://ripuc.ri.gov/utility-information/motor-carriers/responsibilities-and-jurisdiction-motor-carriers-division",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current DPUC certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "providence-metro",
      "name": "Providence Metro",
      "shortName": "Providence Metro",
      "blurb": "Providence, Bristol, and Kent with multi-unit elevators, tight streets, and dense suburbs.",
      "challenges": [
        "Elevators, stairs, and limited staging",
        "I-95 congestion windows"
      ],
      "countySlugs": [
        "providence",
        "bristol",
        "kent"
      ],
      "ctaLabel": "Explore Providence Metro"
    },
    {
      "id": "south-county-coast",
      "name": "South County & Newport",
      "shortName": "South County / Newport",
      "blurb": "Washington and Newport with coastal tourism peaks and ferry-adjacent logistics.",
      "challenges": [
        "Summer tourism congestion",
        "Coastal parking and access limits"
      ],
      "countySlugs": [
        "washington",
        "newport"
      ],
      "ctaLabel": "Explore South County / Newport"
    }
  ],
  "costs": {
    "title": "Rhode Island moving costs",
    "intro": "Rhode Island pricing reflects Providence labor markets, multi-unit access, coastal tourism, and constant short interstate border hops. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Rhode Island moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Rhode Island local and intrastate patterns: home size, distance, stairs/elevators, parking, tourism seasonality, and regional labor. Actual bids vary. Always compare written estimates from DPUC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Providence studio / 1BR",
        "value": "$550–$2,500+",
        "note": "Stairs and tight streets dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,000+",
        "note": "HOAs and coastal access vary"
      },
      {
        "label": "Intrastate mid-size (e.g. Providence ↔ Newport)",
        "value": "$1,400–$4,800+",
        "note": "Tourism traffic matters"
      },
      {
        "label": "Typical 2–3 person crew (Providence metro)",
        "value": "$125–$240+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Providence multi-unit buildings add stair and elevator time.",
      "Summer coastal tourism compresses crews and road capacity.",
      "College move-in peaks tighten late August demand.",
      "Almost every long haul quickly becomes interstate into MA or CT.",
      "Winter ice forces flexible dates."
    ]
  },
  "routes": {
    "title": "Popular Rhode Island moving routes",
    "intro": "Rhode Island is a high-churn New England market with strong outbound Sun Belt flows and constant short interstate hops into Massachusetts and Connecticut. Interstate jobs need FMCSA authority; in-state corridors need DPUC-certificated household goods movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Rhode Island → Florida / Carolinas",
        "href": "/moving-to/florida",
        "origins": "Providence metro",
        "transit": "Multi-day I-95",
        "planningNote": "Book early for winter arrivals.",
        "note": "High-volume Northeast snowbird corridor."
      },
      {
        "label": "Rhode Island → Massachusetts / Connecticut",
        "href": "/local-movers/massachusetts",
        "origins": "Statewide",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Extremely common short cross-border metro moves."
      },
      {
        "label": "Rhode Island → New York",
        "href": "/local-movers/new-york",
        "origins": "Providence, South County",
        "transit": "I-95 multi-day or next-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Common Northeast job corridor."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Providence County",
        "href": "/local-movers/rhode-island/providence",
        "note": "Multi-unit elevators and dense urban staging."
      },
      {
        "label": "Moving to Kent County",
        "href": "/local-movers/rhode-island/kent",
        "note": "Warwick–central suburbs and HOAs."
      },
      {
        "label": "Moving to Washington County",
        "href": "/local-movers/rhode-island/washington",
        "note": "South County coastal access and tourism peaks."
      }
    ]
  },
  "challenges": {
    "title": "Rhode Island-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Rhode Island moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Providence multi-unit access",
        "detail": "Stairs, elevators, and tight streets dominate. Share approach photos and reserve elevators early."
      },
      {
        "title": "Border hops into MA and CT",
        "detail": "Many jobs cross state lines within minutes. Confirm FMCSA authority even for short hauls."
      },
      {
        "title": "Summer tourism congestion",
        "detail": "Newport and South County roads jam in peak season. Avoid Friday arrivals when possible."
      },
      {
        "title": "College lease peaks",
        "detail": "Late August demand spikes around student turnovers. Book earlier than a typical civilian calendar."
      },
      {
        "title": "DPUC certificate verification",
        "detail": "Confirm the exact legal name holds a Rhode Island DPUC household goods certificate before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Rhode Island moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Rhode Island local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Rhode Island movers need a DPUC certificate?",
      "answer": "Yes. Household goods movers operating within Rhode Island generally need a certificate from the Division of Public Utilities and Carriers. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Rhode Island mover?",
      "answer": "Use DPUC licensed moving company resources and match the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Providence move cost?",
      "answer": "Planning ranges often fall around $550–$2,500+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Providence-to-Newport move intrastate?",
      "answer": "Yes — both ends are in Rhode Island, so you generally need a DPUC-certificated household goods mover."
    },
    {
      "question": "When is peak moving season in Rhode Island?",
      "answer": "Statewide peak is typically May–September, with additional college and tourism spikes."
    },
    {
      "question": "Does a Providence-to-Boston move need FMCSA authority?",
      "answer": "Yes. Crossing into Massachusetts is interstate. Confirm active FMCSA operating authority and a USDOT number."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "RI DPUC — Moving information",
        "href": "https://ripuc.ri.gov/utility-information/motor-carriers/moving-information"
      },
      {
        "label": "RI DPUC — Motor Carriers Division",
        "href": "https://ripuc.ri.gov/utility-information/motor-carriers/responsibilities-and-jurisdiction-motor-carriers-division"
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
