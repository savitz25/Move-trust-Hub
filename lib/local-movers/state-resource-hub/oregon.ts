import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 6):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const oregonStateResourceHub: StateResourceHubPack = {
  "stateSlug": "oregon",
  "stateCode": "OR",
  "h1": "Oregon Moving Resource Hub: Costs, ODOT Certificates & 36 County Guides",
  "metaTitle": "Oregon Movers Guide 2026 — Costs, ODOT HHG Certificates & 36 County Guides",
  "metaDescription": "Plan a move within, to, or from Oregon. Compare local and intrastate costs, verify ODOT household goods certificates, browse 36 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Oregon moves in 2026 — typical costs, ODOT vs FMCSA rules, Portland-to-Bend regional guides, and tools to compare certified movers without paid placements.",
  "trustBar": [
    "36 County Guides",
    "Verified Movers",
    "ODOT & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Oregon",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Oregon",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Oregon",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Oregon markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Oregon Moving Cost",
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
    "title": "Why moving in Oregon is different",
    "paragraphs": [
      "Oregon is not one moving market. Portland multi-unit elevators and hills, Willamette Valley college towns, Oregon Coast weather windows, Southern Oregon mountain approaches, Central Oregon high-desert access, and Eastern Oregon long hauls produce different access and labor profiles under one state name.",
      "When origin and destination are both in Oregon, rates and services are regulated by the ODOT Commerce and Compliance Division. Consumers should only use ODOT-certified movers for point-to-point in-state work. Interstate jobs need FMCSA authority. Rain, wildfire-season air quality, and Cascade pass weather are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Oregon moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Oregon local and intrastate patterns; they are not bids. Always compare written estimates from ODOT-certified movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Portland studio / 1BR",
        "value": "$600–$2,500+",
        "note": "Hills, elevators, and parking dominate"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,900–$5,500+",
        "note": "Metro HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Portland ↔ Bend)",
        "value": "$2,200–$7,000+",
        "note": "Passes and weather matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Rain can force flexible dates year-round"
      },
      {
        "label": "Top inbound origins",
        "value": "CA · WA · TX · AZ · IL",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "36",
        "note": "Portland metro emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Oregon moving regulations & consumer protection",
    "intro": "Oregon requires household goods movers operating point-to-point within the state to be certified by the ODOT Commerce and Compliance Division. Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Oregon)",
      "body": "If origin or destination is outside Oregon, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An ODOT household goods certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Oregon)",
      "body": "When the origin and destination of a move are within Oregon, moving company rates and services are regulated by ODOT Commerce and Compliance. Consumers should ask for the certificate number and use only ODOT-certified movers. Certified carriers operate under approved tariffs and insurance/bond expectations; uncertified operation can trigger civil penalties."
    },
    "verifySteps": [
      "Classify the job: entirely in Oregon (ODOT certificate) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm ODOT household goods certification and ask for the certificate number.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Ask for the General Information Bulletin materials carriers are expected to provide shippers.",
      "Avoid large cash deposits to unverified operators; report issues to consumer protection channels when needed."
    ],
    "protections": [
      {
        "title": "ODOT certification requirement",
        "detail": "ODOT consumer guidance states that for moves from point to point within Oregon, you should only use a mover certified by ODOT and ask for its certificate number."
      },
      {
        "title": "Approved tariffs and consumer bulletin",
        "detail": "Authorized intrastate household goods carriers operate under approved rate/tariff frameworks and must provide shippers the General Information Bulletin for Moving Household Goods in Oregon."
      },
      {
        "title": "Enforcement against uncertified movers",
        "detail": "Operating without proper authority can result in citations and civil penalties; ODOT partners with local law enforcement on unauthorized mover operations."
      }
    ],
    "officialLinks": [
      {
        "label": "ODOT — Household goods moving",
        "href": "https://www.oregon.gov/odot/mct/pages/household-goods-moving.aspx",
        "external": true
      },
      {
        "label": "ODOT — Household goods mover application process",
        "href": "https://www.oregon.gov/odot/mct/pages/household-goods-mover-application-process.aspx",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current ODOT certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "portland-metro",
      "name": "Portland Metro",
      "shortName": "Portland Metro",
      "blurb": "Multnomah, Washington, Clackamas, and neighbors with hills, multi-unit elevators, and dense suburbs.",
      "challenges": [
        "Hills, elevators, and tight street staging",
        "Bridge and freeway congestion"
      ],
      "countySlugs": [
        "multnomah",
        "washington",
        "clackamas",
        "columbia",
        "yamhill"
      ],
      "ctaLabel": "Explore Portland Metro"
    },
    {
      "id": "willamette-valley",
      "name": "Willamette Valley",
      "shortName": "Willamette Valley",
      "blurb": "Salem, Eugene, Corvallis, and valley counties with college peaks and I-5 corridor logistics.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Rain delays and soft ground access"
      ],
      "countySlugs": [
        "marion",
        "polk",
        "linn",
        "benton",
        "lane"
      ],
      "ctaLabel": "Explore Willamette Valley"
    },
    {
      "id": "oregon-coast",
      "name": "Oregon Coast",
      "shortName": "Oregon Coast",
      "blurb": "Clatsop to Curry coastal counties with weather exposure, bridges, and thinner coverage in places.",
      "challenges": [
        "Coastal weather and wind delays",
        "Confirm mover coverage for remote addresses"
      ],
      "countySlugs": [
        "clatsop",
        "tillamook",
        "lincoln",
        "coos",
        "curry"
      ],
      "ctaLabel": "Explore Oregon Coast"
    },
    {
      "id": "southern-or",
      "name": "Southern Oregon",
      "shortName": "Southern OR",
      "blurb": "Medford, Grants Pass, and southern mountain approaches with longer regional hauls.",
      "challenges": [
        "Mountain pass weather",
        "Distance from Portland fleets"
      ],
      "countySlugs": [
        "jackson",
        "josephine",
        "douglas",
        "klamath",
        "lake"
      ],
      "ctaLabel": "Explore Southern Oregon"
    },
    {
      "id": "central-or",
      "name": "Central Oregon",
      "shortName": "Central OR",
      "blurb": "Bend–Deschutes high desert, Cascades approaches, and recreation-season demand.",
      "challenges": [
        "Cascade pass weather on I-84/US routes",
        "Seasonal recreation peaks"
      ],
      "countySlugs": [
        "deschutes",
        "crook",
        "jefferson",
        "wasco",
        "hood-river",
        "sherman",
        "gilliam",
        "wheeler"
      ],
      "ctaLabel": "Explore Central Oregon"
    },
    {
      "id": "eastern-or",
      "name": "Eastern Oregon",
      "shortName": "Eastern OR",
      "blurb": "Pendleton, Baker, and eastern counties with long portal-to-portal distances and rural access.",
      "challenges": [
        "Long empty miles and fuel time",
        "Confirm coverage early"
      ],
      "countySlugs": [
        "umatilla",
        "union",
        "wallowa",
        "baker",
        "malheur",
        "harney",
        "grant",
        "morrow"
      ],
      "ctaLabel": "Explore Eastern Oregon"
    }
  ],
  "costs": {
    "title": "Oregon moving costs",
    "intro": "Oregon pricing reflects Portland labor markets, hills/elevators, rain delays, mountain passes, and coastal logistics. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Oregon moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Oregon local and intrastate patterns: home size, distance, hills/elevators, parking, HOAs, weather, and regional labor. Actual bids vary under ODOT tariff frameworks for certified intrastate movers. Always compare written estimates from ODOT-certified movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Portland studio / 1BR",
        "value": "$600–$2,500+",
        "note": "Hills and elevators dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,800–$5,200+",
        "note": "Metro HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Portland ↔ Salem or Eugene)",
        "value": "$1,800–$5,500+",
        "note": "Season and packing matter"
      },
      {
        "label": "Intrastate long (e.g. Portland ↔ Bend or Medford)",
        "value": "$2,400–$8,000+",
        "note": "Passes and weather matter"
      },
      {
        "label": "Typical 2–3 person crew (Portland metro)",
        "value": "$140–$250+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Portland hills and multi-unit elevators add labor time.",
      "Rain can slow outdoor work and force flexible dates.",
      "Cascade and mountain passes affect east–west hauls in winter.",
      "Wildfire-season air quality can delay summer jobs.",
      "Coastal wind and bridge timing change coastal job plans."
    ]
  },
  "routes": {
    "title": "Popular Oregon moving routes",
    "intro": "Oregon is a major West Coast destination with strong California and Washington flows plus large Portland–Bend–Eugene internal traffic. Interstate jobs need FMCSA authority; in-state corridors need ODOT-certified movers.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Oregon → Washington",
        "href": "/local-movers/washington",
        "origins": "Portland metro, Northern OR",
        "transit": "Often same-day interstate via I-5",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common short outbound hop from Portland."
      },
      {
        "label": "Oregon → California",
        "href": "/local-movers/california",
        "origins": "Portland, Southern OR",
        "transit": "Multi-day I-5 corridor",
        "planningNote": "CA second hops may need BHGS for in-CA legs.",
        "note": "Bi-directional West Coast traffic is common."
      },
      {
        "label": "Oregon → Arizona / Texas",
        "href": "/local-movers/arizona",
        "origins": "Portland, Bend",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular lifestyle outbound destinations."
      }
    ],
    "inbound": [
      {
        "label": "California → Oregon",
        "href": "/local-movers/oregon/multnomah",
        "origins": "Bay Area, LA, San Diego",
        "transit": "Multi-day I-5",
        "planningNote": "High-volume inbound into Portland metro.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Multnomah County (Portland)",
        "href": "/local-movers/oregon/multnomah",
        "note": "Hills, elevators, and dense multi-unit access."
      },
      {
        "label": "Moving to Deschutes County (Bend)",
        "href": "/local-movers/oregon/deschutes",
        "note": "High-desert access and recreation-season peaks."
      }
    ]
  },
  "challenges": {
    "title": "Oregon-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Oregon moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Portland hills and multi-unit access",
        "detail": "Elevators, long carries, and limited truck staging are common. Share approach photos early."
      },
      {
        "title": "Rain and flexible dates",
        "detail": "Wet weather can slow outdoor work year-round. Build schedule buffers rather than rigid single-day plans."
      },
      {
        "title": "Mountain passes and high desert",
        "detail": "Portland–Bend and eastbound routes can close or slow trucks in winter. Confirm pass status before booking."
      },
      {
        "title": "Wildfire-season air quality",
        "detail": "Summer smoke can delay outdoor labor. Keep a backup date for July–September jobs."
      },
      {
        "title": "ODOT certificate verification",
        "detail": "Confirm the exact legal name is ODOT-certified before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Oregon moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Oregon local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Oregon movers need an ODOT certificate?",
      "answer": "Yes. For point-to-point moves within Oregon, consumers should use movers certified by ODOT Commerce and Compliance. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify an Oregon mover?",
      "answer": "Ask for the ODOT certificate number and confirm certification via ODOT household goods moving resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Portland move cost?",
      "answer": "Planning ranges often fall around $600–$2,500+ for a studio/1BR and more for larger homes, driven by hills, elevators, and season. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Portland-to-Bend move intrastate?",
      "answer": "Yes — both ends are in Oregon, so you generally need an ODOT-certified household goods mover."
    },
    {
      "question": "When is peak moving season in Oregon?",
      "answer": "Statewide peak is typically May–September. Rain can force flexible dates even outside peak."
    },
    {
      "question": "Does a Portland-to-Vancouver, WA move need FMCSA authority?",
      "answer": "Yes. Crossing into Washington is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "ODOT — Household goods moving",
        "href": "https://www.oregon.gov/odot/mct/pages/household-goods-moving.aspx"
      },
      {
        "label": "ODOT — Mover application process",
        "href": "https://www.oregon.gov/odot/mct/pages/household-goods-mover-application-process.aspx"
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
