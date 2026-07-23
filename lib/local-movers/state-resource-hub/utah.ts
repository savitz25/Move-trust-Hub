import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 7):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: limited_or_none
 */
export const utahStateResourceHub: StateResourceHubPack = {
  "stateSlug": "utah",
  "stateCode": "UT",
  "h1": "Utah Moving Resource Hub: Costs, FMCSA Checks & 29 County Guides",
  "metaTitle": "Utah Movers Guide 2026 — Costs, Insurance Checks & 29 County Guides",
  "metaDescription": "Plan a move within, to, or from Utah. Compare local and intrastate costs, understand Utah’s limited state HHG licensing versus FMCSA interstate rules, browse 29 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Utah moves in 2026 — typical costs, FMCSA-first verification for interstate work, Salt Lake-to-St. George regional guides, and tools to compare movers without paid placements.",
  "trustBar": [
    "29 County Guides",
    "Verified Movers",
    "FMCSA-Focused Checks",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Utah",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Utah",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Utah",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Utah markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Utah Moving Cost",
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
    "title": "Why moving in Utah is different",
    "paragraphs": [
      "Utah is not one moving market. Salt Lake multi-unit elevators and inversion air quality, Utah County growth HOAs, Cache Valley college peaks, St. George desert heat, and canyon-country access produce different labor profiles under one state name.",
      "Utah does not issue a dedicated household-goods carrier license for moves contained wholly inside state lines — unlike many neighboring states. Interstate jobs still need FMCSA authority. For in-state work, insist on insurance certificates, written estimates, and clear legal names. Winter canyon closures, summer heat, and ski-town peaks are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Utah moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Utah local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.",
    "stats": [
      {
        "label": "Typical Salt Lake studio / 1BR",
        "value": "$550–$2,400+",
        "note": "Elevators, hills, and winter staging"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,800–$5,500+",
        "note": "Wasatch Front HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. SLC ↔ St. George)",
        "value": "$2,000–$6,500+",
        "note": "I-15 distance and season matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Ski-town winter peaks also exist"
      },
      {
        "label": "Top inbound origins",
        "value": "CA · TX · AZ · CO · WA",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "29",
        "note": "Wasatch Front emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "limited_or_none",
    "title": "Utah moving regulations & consumer protection",
    "intro": "Utah does not maintain a dedicated household-goods permit regime comparable to Oregon ODOT or Colorado PUC. Consumer protection depends on insurance, contracts, consumer-protection rules, and — for any out-of-state leg — FMCSA authority. Verify credentials carefully before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Utah)",
      "body": "If origin or destination is outside Utah, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Do not treat a Utah business registration alone as interstate authority."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Utah)",
      "body": "Utah generally does not issue a dedicated household-goods carrier license for pure in-state moves. Movers still must register commercial vehicles appropriately, maintain liability and cargo insurance, and follow Utah Division of Consumer Protection expectations on written estimates and claims handling. Insist on written paperwork and insurance certificates even for local jobs."
    },
    "verifySteps": [
      "Classify the job: entirely in Utah vs any out-of-state leg (FMCSA / USDOT required).",
      "Copy the exact legal name from the written estimate.",
      "Interstate or cross-border: look up USDOT / MC on FMCSA SAFER before deposits.",
      "Intrastate: request certificates of insurance, written inventory estimates, and business registration details.",
      "Confirm HOA, elevator, and street-permit needs for Wasatch Front multi-unit buildings.",
      "Avoid large cash deposits to unverified operators; document all agreements in writing."
    ],
    "protections": [
      {
        "title": "FMCSA for interstate moves",
        "detail": "Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority and USDOT numbers on SAFER."
      },
      {
        "title": "Insurance and written estimates",
        "detail": "Without a strong state HHG permit lookup, written estimates and proof of cargo/liability insurance become your primary consumer controls on local jobs."
      },
      {
        "title": "Consumer protection expectations",
        "detail": "Industry guidance notes Utah movers should still comply with consumer-protection expectations on written estimates and claims handling — ask for those terms in writing."
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
        "label": "UDOT — Motor carriers",
        "href": "https://connect.udot.utah.gov/business/motor-carriers/",
        "external": true
      },
      {
        "label": "Move Trust Hub — Verify a USDOT",
        "href": "/verify-dot"
      }
    ],
    "disclaimer": "Regulatory frameworks can change. Always verify current FMCSA authority for interstate work and obtain insurance and written contracts for local work. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "wasatch-front",
      "name": "Wasatch Front",
      "shortName": "Wasatch Front",
      "blurb": "Salt Lake, Utah, Davis, Weber, and neighbors with multi-unit elevators, HOAs, and canyon approaches.",
      "challenges": [
        "Elevators, hills, and inversion-season air quality",
        "HOA windows in growth suburbs"
      ],
      "countySlugs": [
        "salt-lake",
        "utah",
        "davis",
        "weber",
        "tooele",
        "morgan",
        "summit",
        "wasatch"
      ],
      "ctaLabel": "Explore Wasatch Front"
    },
    {
      "id": "northern-ut",
      "name": "Northern Utah",
      "shortName": "Northern UT",
      "blurb": "Cache Valley and northern counties with college peaks and agricultural corridors.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Winter weather on northern corridors"
      ],
      "countySlugs": [
        "cache",
        "box-elder",
        "rich"
      ],
      "ctaLabel": "Explore Northern Utah"
    },
    {
      "id": "central-ut",
      "name": "Central Utah",
      "shortName": "Central UT",
      "blurb": "Sanpete, Sevier, and central valleys with longer regional hauls from the Front.",
      "challenges": [
        "Distance from Salt Lake fleets",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "juab",
        "sanpete",
        "sevier",
        "millard",
        "piute",
        "wayne"
      ],
      "ctaLabel": "Explore Central Utah"
    },
    {
      "id": "southern-ut",
      "name": "Southern Utah",
      "shortName": "Southern UT",
      "blurb": "St. George, Cedar City, and southern desert counties with heat and tourism peaks.",
      "challenges": [
        "Summer heat productivity loss",
        "Tourism-season congestion near parks"
      ],
      "countySlugs": [
        "washington",
        "iron",
        "garfield",
        "kane",
        "beaver"
      ],
      "ctaLabel": "Explore Southern Utah"
    },
    {
      "id": "eastern-ut",
      "name": "Eastern Utah",
      "shortName": "Eastern UT",
      "blurb": "Uintah Basin, Moab approaches, and eastern counties with long portal-to-portal distances.",
      "challenges": [
        "Long empty miles and canyon access",
        "Confirm mover coverage early"
      ],
      "countySlugs": [
        "uintah",
        "duchesne",
        "carbon",
        "emery",
        "grand",
        "san-juan",
        "daggett"
      ],
      "ctaLabel": "Explore Eastern Utah"
    }
  ],
  "costs": {
    "title": "Utah moving costs",
    "intro": "Utah pricing reflects Wasatch Front labor markets, hills/elevators, canyon weather, and long I-15 hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Utah moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Utah local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, weather, and regional labor. Actual bids vary. Always compare written estimates and confirm FMCSA authority for any out-of-state leg."
    },
    "ranges": [
      {
        "label": "Salt Lake studio / 1BR",
        "value": "$550–$2,400+",
        "note": "Elevators and hills dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,000+",
        "note": "Wasatch Front HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. SLC ↔ Provo or Ogden)",
        "value": "$1,600–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. SLC ↔ St. George or Moab)",
        "value": "$2,200–$7,500+",
        "note": "I-15 distance and heat matter"
      },
      {
        "label": "Typical 2–3 person crew (Wasatch Front)",
        "value": "$130–$240+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Wasatch Front multi-unit buildings add elevator and stair time.",
      "Canyon and mountain weather can close access in winter.",
      "Southern Utah heat slows outdoor labor in summer.",
      "Ski-town peaks compete with statewide May–September demand.",
      "Short hops into ID, WY, NV, AZ, or CO are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Utah moving routes",
    "intro": "Utah is a major Mountain West inbound destination with strong California origins and large Salt Lake–St. George internal flows. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Utah → Arizona / Nevada",
        "href": "/local-movers/arizona",
        "origins": "Wasatch Front, Southern UT",
        "transit": "I-15 multi-day or same-day near border",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common lifestyle and job corridors."
      },
      {
        "label": "Utah → California",
        "href": "/local-movers/california",
        "origins": "Salt Lake metro",
        "transit": "Multi-day I-15 / I-80",
        "planningNote": "CA second hops may need BHGS for in-CA legs.",
        "note": "Bi-directional West traffic is common."
      },
      {
        "label": "Utah → Colorado / Idaho",
        "href": "/local-movers/colorado",
        "origins": "Wasatch Front, Northern UT",
        "transit": "Mountain multi-day or short interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Regional Mountain West hops."
      }
    ],
    "inbound": [
      {
        "label": "California → Utah",
        "href": "/local-movers/utah/salt-lake",
        "origins": "Bay Area, LA, San Diego",
        "transit": "Multi-day",
        "planningNote": "High-volume inbound into Wasatch Front.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Salt Lake County",
        "href": "/local-movers/utah/salt-lake",
        "note": "Multi-unit elevators and canyon logistics."
      },
      {
        "label": "Moving to Utah County",
        "href": "/local-movers/utah/utah",
        "note": "Growth suburbs and HOA calendars."
      }
    ]
  },
  "challenges": {
    "title": "Utah-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Utah moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Limited state HHG permit regime",
        "detail": "Without a dedicated state household-goods license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop."
      },
      {
        "title": "Wasatch Front multi-unit access",
        "detail": "Elevators, HOAs, and limited staging dominate Salt Lake and Utah County jobs. Reserve elevators early."
      },
      {
        "title": "Canyon and winter closures",
        "detail": "Mountain and canyon routes can close or slow trucks. Build weather buffers November–March."
      },
      {
        "title": "Southern Utah heat",
        "detail": "St. George summer heat slows outdoor labor. Prefer early start times May–September."
      },
      {
        "title": "Short interstate hops",
        "detail": "Moves into Idaho, Wyoming, Nevada, Arizona, or Colorado are interstate even if short. Confirm FMCSA authority before deposits."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Utah moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Utah local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Utah movers need a special state household goods license?",
      "answer": "Utah generally does not issue a dedicated household-goods carrier license for pure in-state moves. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg."
    },
    {
      "question": "How do I verify a Utah mover for an interstate move?",
      "answer": "Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates."
    },
    {
      "question": "How much does a local Salt Lake move cost?",
      "answer": "Planning ranges often fall around $550–$2,400+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Salt Lake-to-St. George move interstate?",
      "answer": "No — both ends are in Utah. Focus on insurance, written estimates, and access logistics rather than FMCSA authority for pure in-state jobs."
    },
    {
      "question": "When is peak moving season in Utah?",
      "answer": "Statewide peak is typically May–September. Ski towns can also see winter peaks around holiday and season-change dates."
    },
    {
      "question": "Does a St. George-to-Las Vegas move need FMCSA authority?",
      "answer": "Yes. Crossing into Nevada is interstate even for relatively short hauls. Confirm active FMCSA operating authority."
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
        "label": "UDOT — Motor carriers",
        "href": "https://connect.udot.utah.gov/business/motor-carriers/"
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
