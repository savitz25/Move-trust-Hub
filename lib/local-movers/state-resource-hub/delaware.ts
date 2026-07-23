import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 10 — final):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: limited_or_none
 */
export const delawareStateResourceHub: StateResourceHubPack = {
  "stateSlug": "delaware",
  "stateCode": "DE",
  "h1": "Delaware Moving Resource Hub: Costs, FMCSA Checks & 3 County Guides",
  "metaTitle": "Delaware Movers Guide 2026 — Costs, Insurance Checks & 3 County Guides",
  "metaDescription": "Plan a move within, to, or from Delaware. Compare local and intrastate costs, understand Delaware’s limited dedicated HHG licensing versus FMCSA interstate rules, browse 3 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Delaware moves in 2026 — typical costs, FMCSA-first verification for interstate work, New Castle-to-Sussex county guides, and tools to compare movers without paid placements.",
  "trustBar": [
    "3 County Guides",
    "Verified Movers",
    "FMCSA-Focused Checks",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Delaware",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Delaware",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Delaware",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Delaware markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Delaware Moving Cost",
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
    "title": "Why moving in Delaware is different",
    "paragraphs": [
      "Delaware is not one moving market. New Castle multi-unit and Philly-adjacent logistics, Kent capital corridors, and Sussex beach-season congestion produce different access and labor profiles under one state name — with only three counties but intense cross-border pressure from Pennsylvania, Maryland, and New Jersey.",
      "Delaware does not require a special state household-goods certificate for pure intrastate movers according to commonly cited consumer guidance. Interstate jobs need FMCSA authority. For in-state work, insist on insurance certificates, written estimates, and clear legal names. Summer beach traffic, winter ice, and constant short interstate hops are planning inputs — then open the county that matches your addresses."
    ]
  },
  "snapshot": {
    "title": "Delaware moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Delaware local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.",
    "stats": [
      {
        "label": "Typical Wilmington studio / 1BR",
        "value": "$500–$2,300+",
        "note": "Stairs, elevators, and parking matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,600–$5,000+",
        "note": "HOAs common in growth suburbs"
      },
      {
        "label": "Intrastate mid-size (e.g. Wilmington ↔ Dover or Rehoboth)",
        "value": "$1,400–$4,800+",
        "note": "Beach season traffic matters"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Sussex beach peaks compress crews"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · MD · PA · NC · SC · NJ",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "3",
        "note": "New Castle emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "limited_or_none",
    "title": "Delaware moving regulations & consumer protection",
    "intro": "Delaware does not issue a special state household-goods certificate for pure intrastate movers according to commonly cited consumer guidance. Interstate work still requires FMCSA authority. Verify insurance and contracts carefully before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Delaware)",
      "body": "If origin or destination is outside Delaware, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Delaware business registration alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Delaware)",
      "body": "Without a dedicated state HHG permit directory, consumers should insist on written estimates, cargo and liability insurance certificates, and a clear legal business name for pure in-state jobs. Business registration remains an important verification step. Confirm any municipal parking rules separately."
    },
    "verifySteps": [
      "Classify the job: entirely in Delaware vs any out-of-state leg (FMCSA / USDOT required).",
      "Copy the exact legal name from the written estimate.",
      "Interstate: look up USDOT / MC on FMCSA SAFER before deposits.",
      "Intrastate: request insurance certificates, written inventory estimates, and business registration details.",
      "Confirm beach-town and multi-unit access for your addresses.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "No special state HHG certificate (typical guidance)",
        "detail": "Consumer sources commonly state Delaware does not require a special household goods mover license or certificate for pure intrastate operators — do not invent a permit number that does not exist."
      },
      {
        "title": "FMCSA for interstate moves",
        "detail": "Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority on SAFER. Many Delaware jobs become interstate within minutes."
      },
      {
        "title": "Written estimates and insurance",
        "detail": "Without a strong state HHG license lookup, written estimates and cargo/liability insurance certificates are your primary consumer controls on local jobs."
      }
    ],
    "officialLinks": [
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
      },
      {
        "label": "Move Trust Hub — How we score movers",
        "href": "/about/how-we-score-movers"
      }
    ],
    "disclaimer": "Regulatory frameworks can change. Always verify current commercial credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "new-castle",
      "name": "New Castle County",
      "shortName": "New Castle",
      "blurb": "Wilmington multi-unit access, suburbs, and Philly-adjacent border logistics.",
      "challenges": [
        "Elevators, stairs, and tight staging",
        "Short PA/NJ hops need FMCSA authority"
      ],
      "countySlugs": [
        "new-castle"
      ],
      "ctaLabel": "Explore New Castle County"
    },
    {
      "id": "kent",
      "name": "Kent County",
      "shortName": "Kent",
      "blurb": "Dover capital corridors and central Delaware suburbs with I-1 logistics.",
      "challenges": [
        "Military and capital-cycle peaks",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "kent"
      ],
      "ctaLabel": "Explore Kent County"
    },
    {
      "id": "sussex",
      "name": "Sussex County",
      "shortName": "Sussex",
      "blurb": "Beach towns and southern growth with summer tourism congestion and MD-border hops.",
      "challenges": [
        "Beach-season road congestion",
        "Short MD hops need FMCSA authority"
      ],
      "countySlugs": [
        "sussex"
      ],
      "ctaLabel": "Explore Sussex County"
    }
  ],
  "costs": {
    "title": "Delaware moving costs",
    "intro": "Delaware pricing reflects Wilmington labor markets, beach-season demand, and constant short interstate border hops. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Delaware moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Delaware local and intrastate patterns: home size, distance, stairs/elevators, parking, beach seasonality, and regional labor. Actual bids vary. Always compare written estimates and confirm FMCSA authority for any out-of-state leg."
    },
    "ranges": [
      {
        "label": "Wilmington studio / 1BR",
        "value": "$500–$2,300+",
        "note": "Stairs and elevators dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,600–$4,800+",
        "note": "HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Wilmington ↔ Dover or Rehoboth)",
        "value": "$1,400–$4,800+",
        "note": "Beach traffic matters"
      },
      {
        "label": "Typical 2–3 person crew (New Castle County)",
        "value": "$120–$220+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Wilmington multi-unit buildings add stair and elevator time.",
      "Sussex beach season compresses crews and road capacity.",
      "Many hauls become interstate into PA, MD, or NJ within minutes.",
      "HOA windows are common in northern suburbs.",
      "Winter ice forces flexible dates."
    ]
  },
  "routes": {
    "title": "Popular Delaware moving routes",
    "intro": "Delaware sits between Northeast metros and Mid-Atlantic beach markets with constant short interstate hops into Pennsylvania, Maryland, and New Jersey. Interstate jobs need FMCSA authority; pure in-state jobs need careful insurance and contract verification.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Delaware → Florida / Carolinas",
        "href": "/moving-to/florida",
        "origins": "New Castle, Sussex",
        "transit": "Multi-day I-95",
        "planningNote": "Book early for winter arrivals.",
        "note": "High-volume Mid-Atlantic snowbird corridor."
      },
      {
        "label": "Delaware → Pennsylvania / Maryland / New Jersey",
        "href": "/local-movers/pennsylvania",
        "origins": "Statewide",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Extremely common short cross-border metro moves."
      },
      {
        "label": "Delaware → Virginia / North Carolina",
        "href": "/local-movers/virginia",
        "origins": "New Castle, Kent",
        "transit": "I-95 multi-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Common lifestyle outbound destinations."
      }
    ],
    "inbound": [
      {
        "label": "Moving to New Castle County",
        "href": "/local-movers/delaware/new-castle",
        "note": "Wilmington multi-unit access and Philly-adjacent patterns."
      },
      {
        "label": "Moving to Kent County",
        "href": "/local-movers/delaware/kent",
        "note": "Dover capital corridors and central suburbs."
      },
      {
        "label": "Moving to Sussex County",
        "href": "/local-movers/delaware/sussex",
        "note": "Beach-town access and summer tourism peaks."
      }
    ]
  },
  "challenges": {
    "title": "Delaware-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Delaware moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Constant short interstate hops",
        "detail": "Jobs into Pennsylvania, Maryland, or New Jersey are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Limited state HHG permit regime",
        "detail": "Without a dedicated consumer HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop."
      },
      {
        "title": "Sussex beach season",
        "detail": "Summer traffic can double transit time to coastal towns. Avoid Friday arrivals when possible."
      },
      {
        "title": "Wilmington multi-unit access",
        "detail": "Stairs, elevators, and limited staging dominate. Share approach photos early."
      },
      {
        "title": "HOA windows in northern suburbs",
        "detail": "New Castle growth communities often restrict elevator and loading hours. Get rules in writing."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Delaware moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Delaware local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Delaware movers need a special household goods license?",
      "answer": "Consumer sources commonly state Delaware does not require a special state household goods certificate for pure intrastate movers. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg."
    },
    {
      "question": "How do I verify a Delaware mover for an interstate move?",
      "answer": "Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates."
    },
    {
      "question": "How much does a local Wilmington move cost?",
      "answer": "Planning ranges often fall around $500–$2,300+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Wilmington-to-Rehoboth move interstate?",
      "answer": "No — both ends are in Delaware. Focus on beach-season traffic, packing, and inventory-based written estimates."
    },
    {
      "question": "When is peak moving season in Delaware?",
      "answer": "Statewide peak is typically May–September. Sussex beach season creates additional summer demand."
    },
    {
      "question": "Does a Wilmington-to-Philadelphia move need FMCSA authority?",
      "answer": "Yes. Crossing into Pennsylvania is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "FMCSA SAFER",
        "href": "https://safer.fmcsa.dot.gov/"
      },
      {
        "label": "FMCSA — Protect Your Move",
        "href": "https://www.fmcsa.dot.gov/protect-your-move"
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
