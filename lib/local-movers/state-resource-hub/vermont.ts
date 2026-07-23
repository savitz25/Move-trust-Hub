import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 10 — final):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: limited_or_none
 */
export const vermontStateResourceHub: StateResourceHubPack = {
  "stateSlug": "vermont",
  "stateCode": "VT",
  "h1": "Vermont Moving Resource Hub: Costs, FMCSA Checks & 14 County Guides",
  "metaTitle": "Vermont Movers Guide 2026 — Costs, Insurance Checks & 14 County Guides",
  "metaDescription": "Plan a move within, to, or from Vermont. Compare local and intrastate costs, understand Vermont’s limited dedicated HHG licensing versus FMCSA interstate rules, browse 14 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Vermont moves in 2026 — typical costs, FMCSA-first verification for interstate work, Burlington-to-Brattleboro regional guides, and tools to compare movers without paid placements.",
  "trustBar": [
    "14 County Guides",
    "Verified Movers",
    "FMCSA-Focused Checks",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Vermont",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Vermont",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Vermont",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Vermont markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Vermont Moving Cost",
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
    "title": "Why moving in Vermont is different",
    "paragraphs": [
      "Vermont is not one moving market. Burlington multi-unit and lake-effect weather, Central Vermont capital logistics, southern ski-town peaks, and Northeast Kingdom long hauls produce different access and labor profiles under one state name — with fourteen counties and sharp mountain micro-climates.",
      "Vermont does not require a dedicated local household-goods mover license in commonly cited consumer guidance (unlike New Hampshire’s HHG carrier authority). Interstate jobs need FMCSA authority. For in-state work, insist on insurance certificates, written estimates, and clear legal names. Mud season, winter ice, and thin rural fleets are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Vermont moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Vermont local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.",
    "stats": [
      {
        "label": "Typical Burlington studio / 1BR",
        "value": "$500–$2,300+",
        "note": "Stairs, elevators, and winter staging"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,700–$5,200+",
        "note": "Long driveways and mud season matter"
      },
      {
        "label": "Intrastate mid-size (e.g. Burlington ↔ Montpelier)",
        "value": "$1,500–$5,000+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Ski and foliage seasons create second peaks"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · NY · MA · NC · SC · NH",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "14",
        "note": "Chittenden emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "limited_or_none",
    "title": "Vermont moving regulations & consumer protection",
    "intro": "Vermont does not maintain a dedicated household-goods consumer permit board for most local movers according to commonly cited state and industry summaries. Interstate work still requires FMCSA authority. Verify insurance and contracts carefully before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Vermont)",
      "body": "If origin or destination is outside Vermont, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Vermont business registration alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Vermont)",
      "body": "Without a strong state HHG permit directory, consumers should insist on written estimates, cargo and liability insurance certificates, and a clear legal business name for pure in-state jobs. Confirm any municipal parking or road-weight rules in mountain towns separately."
    },
    "verifySteps": [
      "Classify the job: entirely in Vermont vs any out-of-state leg (FMCSA / USDOT required).",
      "Copy the exact legal name from the written estimate.",
      "Interstate: look up USDOT / MC on FMCSA SAFER before deposits.",
      "Intrastate: request insurance certificates, written inventory estimates, and business credentials.",
      "Confirm mountain driveway and mud-season access for your addresses.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "No dedicated local HHG license (typical guidance)",
        "detail": "Consumer sources commonly state a local household-goods mover license is not required in Vermont — do not invent a permit number that does not exist."
      },
      {
        "title": "FMCSA for interstate moves",
        "detail": "Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority on SAFER."
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
      "id": "northwest-vt",
      "name": "Northwest Vermont",
      "shortName": "Northwest",
      "blurb": "Chittenden, Franklin, and northwest counties with Burlington multi-unit access and lake-effect weather.",
      "challenges": [
        "Elevators, stairs, and winter ice",
        "Short NY hops need FMCSA authority"
      ],
      "countySlugs": [
        "chittenden",
        "franklin",
        "grand-isle",
        "lamoille"
      ],
      "ctaLabel": "Explore Northwest Vermont"
    },
    {
      "id": "central-vt",
      "name": "Central Vermont",
      "shortName": "Central",
      "blurb": "Washington, Addison, and central counties with capital logistics and mountain approaches.",
      "challenges": [
        "Mud season driveway access",
        "I-89 weather windows"
      ],
      "countySlugs": [
        "washington",
        "addison",
        "orange",
        "windsor"
      ],
      "ctaLabel": "Explore Central Vermont"
    },
    {
      "id": "southern-vt",
      "name": "Southern Vermont",
      "shortName": "Southern",
      "blurb": "Bennington, Windham, and Rutland with ski-town peaks and MA/NY border patterns.",
      "challenges": [
        "Ski-season demand spikes",
        "Short MA/NY hops need FMCSA authority"
      ],
      "countySlugs": [
        "bennington",
        "windham",
        "rutland"
      ],
      "ctaLabel": "Explore Southern Vermont"
    },
    {
      "id": "northeast-kingdom",
      "name": "Northeast Kingdom",
      "shortName": "NE Kingdom",
      "blurb": "Caledonia, Essex, and Orleans with long hauls and thinner local fleets.",
      "challenges": [
        "Confirm mover coverage early",
        "Long empty miles from Burlington fleets"
      ],
      "countySlugs": [
        "caledonia",
        "essex",
        "orleans"
      ],
      "ctaLabel": "Explore Northeast Kingdom"
    }
  ],
  "costs": {
    "title": "Vermont moving costs",
    "intro": "Vermont pricing reflects Burlington labor markets, winter weather, mountain access, and long rural hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Vermont moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Vermont local and intrastate patterns: home size, distance, stairs, parking, mud season, winter weather, and regional labor. Actual bids vary with ski and foliage seasons. Always compare written estimates and confirm FMCSA authority for any out-of-state leg."
    },
    "ranges": [
      {
        "label": "Burlington studio / 1BR",
        "value": "$500–$2,300+",
        "note": "Stairs and winter access dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,000+",
        "note": "Long driveways common"
      },
      {
        "label": "Intrastate mid-size (e.g. Burlington ↔ Montpelier)",
        "value": "$1,500–$4,800+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Burlington ↔ Brattleboro)",
        "value": "$2,000–$7,000+",
        "note": "Distance and weather push hours"
      },
      {
        "label": "Typical 2–3 person crew (Burlington metro)",
        "value": "$120–$220+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Winter ice and mud season force flexible dates.",
      "Ski towns can tighten crews outside summer peak.",
      "Northeast Kingdom jobs include long empty miles.",
      "Burlington multi-unit buildings add stair and elevator time.",
      "Short hops into NY, NH, or MA are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Vermont moving routes",
    "intro": "Vermont sees outbound Sun Belt and New England flows, short interstate hops into New York, New Hampshire, and Massachusetts, and large Burlington internal traffic. Interstate jobs need FMCSA authority; local jobs need careful insurance and contract verification.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Vermont → Florida / Carolinas",
        "href": "/moving-to/florida",
        "origins": "Burlington, southern VT",
        "transit": "Multi-day interstate",
        "planningNote": "Book early for winter arrivals.",
        "note": "Common snowbird outbound corridor."
      },
      {
        "label": "Vermont → New York / New Hampshire / Massachusetts",
        "href": "/local-movers/new-york",
        "origins": "Northwest and southern VT",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common short cross-border metro moves."
      },
      {
        "label": "Vermont → Texas / Arizona",
        "href": "/local-movers/texas",
        "origins": "Statewide",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular long-haul outbound destinations."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Chittenden County (Burlington)",
        "href": "/local-movers/vermont/chittenden",
        "note": "Multi-unit access and lake-effect weather."
      },
      {
        "label": "Moving to Washington County (Montpelier area)",
        "href": "/local-movers/vermont/washington",
        "note": "Capital corridors and mountain approaches."
      },
      {
        "label": "Moving to Windham County",
        "href": "/local-movers/vermont/windham",
        "note": "Southern ski-town and border patterns."
      }
    ]
  },
  "challenges": {
    "title": "Vermont-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Vermont moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Mud season and winter ice",
        "detail": "Driveways can become impassable in spring thaw and midwinter ice. Build large weather buffers."
      },
      {
        "title": "Limited state HHG permit regime",
        "detail": "Without a dedicated consumer HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop."
      },
      {
        "title": "Ski-town seasonal demand",
        "detail": "Southern and mountain markets tighten crews around ski and foliage peaks. Book early."
      },
      {
        "title": "Northeast Kingdom empty miles",
        "detail": "Remote northern jobs create long empty miles from Burlington fleets. Confirm coverage early."
      },
      {
        "title": "Short interstate hops",
        "detail": "Moves into New York, New Hampshire, or Massachusetts are interstate even if short. Confirm FMCSA authority before deposits."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Vermont moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Vermont local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Vermont movers need a special household goods license?",
      "answer": "Consumer sources commonly state a local household-goods mover license is not required in Vermont. Consumers should still verify insurance, written contracts, and FMCSA authority for any out-of-state leg."
    },
    {
      "question": "How do I verify a Vermont mover for an interstate move?",
      "answer": "Look up USDOT / MC authority on FMCSA SAFER for the legal name on your estimate. Also request certificates of insurance and written inventory estimates."
    },
    {
      "question": "How much does a local Burlington move cost?",
      "answer": "Planning ranges often fall around $500–$2,300+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Burlington-to-Brattleboro move interstate?",
      "answer": "No — both ends are in Vermont. Focus on weather windows, packing, and inventory-based written estimates for the haul."
    },
    {
      "question": "When is peak moving season in Vermont?",
      "answer": "Statewide peak is typically May–September. Ski and foliage seasons can create additional demand spikes."
    },
    {
      "question": "Does a Burlington-to-Plattsburgh move need FMCSA authority?",
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
