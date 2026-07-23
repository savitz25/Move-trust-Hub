import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 3):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const coloradoStateResourceHub: StateResourceHubPack = {
  "stateSlug": "colorado",
  "stateCode": "CO",
  "h1": "Colorado Moving Resource Hub: Costs, PUC HHG Permits & 64 County Guides",
  "metaTitle": "Colorado Movers Guide 2026 — Costs, PUC HHG Permits & 64 County Guides",
  "metaDescription": "Plan a move within, to, or from Colorado. Compare local and intrastate costs, verify Colorado PUC household goods permits, browse county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Colorado moves in 2026 — typical costs, PUC HHG vs FMCSA rules, Denver-to-mountain regional guides, and tools to compare permitted movers without paid placements.",
  "trustBar": [
    "64 County Guides",
    "Verified Movers",
    "CO PUC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Colorado",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Colorado",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Colorado",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Colorado markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Colorado Moving Cost",
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
    "title": "Why moving in Colorado is different",
    "paragraphs": [
      "Colorado is not one moving market. Denver multi-unit elevators and street staging, Front Range HOA suburbs, high-country altitude and narrow mountain roads, Western Slope agricultural towns, and Eastern Plains long hauls produce different access and labor profiles under one state name.",
      "Intrastate household goods movers must hold a valid Colorado Public Utilities Commission (PUC) household goods (HHG) permit under Title 40, Article 10.1, C.R.S. Interstate jobs need FMCSA authority. Altitude, winter weather, wildfire-season air quality, and ski-town logistics are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Colorado moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Colorado local and intrastate patterns; they are not bids. Always compare written estimates from PUC-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Denver studio / 1BR",
        "value": "$650–$2,500+",
        "note": "Elevators, parking, and altitude labor matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$2,000–$6,000+",
        "note": "Front Range HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Denver ↔ Grand Junction)",
        "value": "$2,500–$8,000+",
        "note": "Mountain passes and weather matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Ski-town winter peaks also exist"
      },
      {
        "label": "Top inbound origins",
        "value": "CA · TX · FL · IL · AZ",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "64",
        "note": "Front Range emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Colorado moving regulations & consumer protection",
    "intro": "Colorado requires household goods movers operating within the state to hold a valid Public Utilities Commission (PUC) household goods permit (HHG). Match the permit to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Colorado)",
      "body": "If origin or destination is outside Colorado, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Colorado PUC HHG permit alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Colorado)",
      "body": "Household goods movers operating within Colorado are regulated by the Colorado PUC under Title 40, Article 10.1, C.R.S. and Commission rules. Consumers should confirm an active HHG permit and written estimate/contract before hiring. The Commission can act against movers that violate permit terms or refuse to obey orders or rules."
    },
    "verifySteps": [
      "Classify the job: entirely in Colorado (PUC HHG) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: search the Colorado PUC permit search and confirm an active HHG permit.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get a written estimate and contract — PUC consumer guidance emphasizes written paperwork.",
      "Avoid large cash deposits to unverified operators; use PUC complaint channels if needed."
    ],
    "protections": [
      {
        "title": "PUC HHG permit requirement",
        "detail": "Colorado PUC regulates household goods movers and publishes consumer guidance to verify permits before you hire. Permit numbers for movers include HHG designation."
      },
      {
        "title": "Written estimate and contract",
        "detail": "PUC consumer materials stress getting a written estimate and contract from permitted movers before move day."
      },
      {
        "title": "Complaint and enforcement channels",
        "detail": "Consumers can check permits and file complaints through PUC household goods consumer tools when movers violate permit terms or rules."
      }
    ],
    "officialLinks": [
      {
        "label": "Colorado PUC — Household goods movers",
        "href": "https://puc.colorado.gov/movers",
        "external": true
      },
      {
        "label": "Colorado PUC — Consumer info for movers",
        "href": "https://puc.colorado.gov/household-goods-movers-consumer-info",
        "external": true
      },
      {
        "label": "Colorado PUC — Permit search",
        "href": "https://www.dora.state.co.us/pls/real/PUC_Permit.Search_Form",
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
    "disclaimer": "Licensing rules and permit directories can change. Always verify current PUC HHG permit status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "denver-metro",
      "name": "Denver Metro & Core Front Range",
      "shortName": "Denver Metro",
      "blurb": "Multi-unit elevators, street parking, and dense suburban HOAs across Denver, Jefferson, Arapahoe, Adams, Boulder, Douglas, and neighbors.",
      "challenges": [
        "Elevators, stairs, and limited truck staging",
        "HOA move windows on the Front Range"
      ],
      "countySlugs": [
        "adams",
        "arapahoe",
        "boulder",
        "broomfield",
        "denver",
        "douglas",
        "jefferson",
        "gilpin",
        "clear-creek"
      ],
      "ctaLabel": "Explore Denver Metro"
    },
    {
      "id": "northern-front-range",
      "name": "Northern Front Range",
      "shortName": "Northern Front Range",
      "blurb": "Fort Collins–Greeley growth corridors, plains approaches, and longer hauls into northeast counties.",
      "challenges": [
        "Growth-suburb HOA calendars",
        "Wind and winter weather on plains corridors"
      ],
      "countySlugs": [
        "larimer",
        "weld",
        "morgan",
        "logan",
        "sedgwick",
        "phillips",
        "yuma",
        "washington"
      ],
      "ctaLabel": "Explore Northern Front Range"
    },
    {
      "id": "southern-front-range",
      "name": "Southern Front Range & Pikes Peak",
      "shortName": "Southern Front Range",
      "blurb": "Colorado Springs, Pueblo, and mountain-adjacent communities with military and suburban mix.",
      "challenges": [
        "Elevation and hill access near Pikes Peak",
        "Military and lease-cycle peaks"
      ],
      "countySlugs": [
        "el-paso",
        "teller",
        "elbert",
        "pueblo",
        "fremont",
        "custer",
        "huerfano",
        "las-animas"
      ],
      "ctaLabel": "Explore Southern Front Range"
    },
    {
      "id": "mountain",
      "name": "Mountain & High Country",
      "shortName": "Mountain",
      "blurb": "Summit, Eagle, Pitkin, and high-country counties with altitude, narrow roads, and seasonal resort demand.",
      "challenges": [
        "Altitude labor and weather windows",
        "Narrow mountain roads and HOA/resort rules"
      ],
      "countySlugs": [
        "summit",
        "eagle",
        "pitkin",
        "lake",
        "chaffee",
        "park",
        "grand",
        "jackson",
        "routt",
        "gunnison",
        "ouray",
        "san-miguel",
        "san-juan",
        "hinsdale"
      ],
      "ctaLabel": "Explore Mountain counties"
    },
    {
      "id": "western-slope",
      "name": "Western Slope",
      "shortName": "Western Slope",
      "blurb": "Grand Junction and Western Slope towns with longer portal-to-portal distances from Denver crews.",
      "challenges": [
        "Distance from Front Range fleets",
        "Mountain pass weather on I-70 approaches"
      ],
      "countySlugs": [
        "mesa",
        "garfield",
        "delta",
        "montrose",
        "rio-blanco",
        "moffat"
      ],
      "ctaLabel": "Explore Western Slope"
    },
    {
      "id": "southwest-san-luis",
      "name": "Southwest & San Luis Valley",
      "shortName": "SW / San Luis",
      "blurb": "Durango-area, Four Corners approaches, and San Luis Valley agricultural communities.",
      "challenges": [
        "Confirm mover coverage for remote addresses",
        "Altitude and long regional hauls"
      ],
      "countySlugs": [
        "la-plata",
        "montezuma",
        "archuleta",
        "dolores",
        "alamosa",
        "conejos",
        "costilla",
        "rio-grande",
        "saguache",
        "mineral"
      ],
      "ctaLabel": "Explore SW / San Luis"
    },
    {
      "id": "eastern-plains",
      "name": "Eastern Plains",
      "shortName": "Eastern Plains",
      "blurb": "Rural plains counties with longer driveway access and thinner local mover density.",
      "challenges": [
        "Longer regional hauls and fuel time",
        "Confirm coverage for remote addresses"
      ],
      "countySlugs": [
        "kit-carson",
        "cheyenne",
        "kiowa",
        "bent",
        "otero",
        "crowley",
        "prowers",
        "baca",
        "lincoln"
      ],
      "ctaLabel": "Explore Eastern Plains"
    }
  ],
  "costs": {
    "title": "Colorado moving costs",
    "intro": "Colorado pricing reflects Front Range labor markets, altitude, mountain access, HOAs, and seasonal resort demand. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Colorado moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Colorado local and intrastate patterns: home size, distance, stairs/elevators, parking, altitude, mountain roads, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from PUC-permitted movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Denver studio / 1BR",
        "value": "$650–$2,500+",
        "note": "Elevators and parking dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,800–$5,500+",
        "note": "Front Range HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Denver ↔ Colorado Springs)",
        "value": "$1,800–$5,500+",
        "note": "Season and packing matter"
      },
      {
        "label": "Intrastate long / mountain (e.g. Denver ↔ Grand Junction or ski towns)",
        "value": "$2,500–$8,500+",
        "note": "Passes, altitude, and weather matter"
      },
      {
        "label": "Typical 2–3 person crew (Front Range)",
        "value": "$140–$250+/hr",
        "note": "Portal-to-portal; access drives hours"
      }
    ],
    "factors": [
      "Altitude can slow labor productivity on mountain moves.",
      "HOA windows are common in Front Range suburbs.",
      "Mountain passes and winter weather affect portal-to-portal time.",
      "Ski-town peak seasons can compete with summer statewide peaks.",
      "Elevators, long carries, and tight street staging add hours in Denver."
    ]
  },
  "routes": {
    "title": "Popular Colorado moving routes",
    "intro": "Colorado is a major Rocky Mountain inbound destination with strong California and Sun Belt origins, plus large Front Range internal flows. Interstate jobs need FMCSA authority; in-state corridors need PUC-permitted HHG movers.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Colorado → California",
        "href": "/local-movers/california",
        "origins": "Denver metro, Front Range",
        "transit": "Multi-day I-70 / I-15 or southern corridors",
        "planningNote": "CA second hops may need BHGS for in-CA legs.",
        "note": "Bi-directional West traffic is common."
      },
      {
        "label": "Colorado → Texas",
        "href": "/local-movers/texas",
        "origins": "Denver, Colorado Springs",
        "transit": "I-25 / I-40 multi-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular Sun Belt outbound and return corridor."
      },
      {
        "label": "Colorado → Arizona",
        "href": "/local-movers/arizona",
        "origins": "Front Range, Western Slope",
        "transit": "Mountain and desert multi-day",
        "planningNote": "Summer heat at destination matters.",
        "note": "Common lifestyle outbound route."
      }
    ],
    "inbound": [
      {
        "label": "California → Colorado",
        "href": "/local-movers/colorado/denver",
        "origins": "Bay Area, LA, San Diego",
        "transit": "Multi-day",
        "planningNote": "High-volume inbound into Denver metro.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Denver County",
        "href": "/local-movers/colorado/denver",
        "note": "Multi-unit elevators and street logistics dominate."
      },
      {
        "label": "Moving to El Paso County (Colorado Springs)",
        "href": "/local-movers/colorado/el-paso",
        "note": "Military cycles and suburban HOA patterns."
      },
      {
        "label": "Moving to Boulder County",
        "href": "/local-movers/colorado/boulder",
        "note": "Hill access and constrained parking common."
      }
    ]
  },
  "challenges": {
    "title": "Colorado-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Colorado moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Altitude and labor pacing",
        "detail": "High-country moves can reduce crew productivity. Build buffer time for mountain towns and share floor counts early."
      },
      {
        "title": "Mountain roads and weather",
        "detail": "I-70 and pass routes can close or slow trucks. Flexible dates beat rigid ski-season calendars."
      },
      {
        "title": "Front Range HOA windows",
        "detail": "Many suburbs limit elevator and loading-dock hours. Get HOA rules in writing before booking."
      },
      {
        "title": "Wildfire-season air quality",
        "detail": "Summer smoke can delay outdoor work. Keep a backup date for July–September Front Range moves."
      },
      {
        "title": "Permit verification",
        "detail": "Confirm the exact legal name has an active Colorado PUC HHG permit for in-state work before deposits."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Colorado moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Colorado local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Colorado movers need a state permit?",
      "answer": "Yes. Household goods movers operating within Colorado generally need a valid Colorado Public Utilities Commission (PUC) household goods (HHG) permit. Interstate moves require FMCSA authority instead of (or in addition to) in-state credentials."
    },
    {
      "question": "How do I verify a Colorado mover is permitted?",
      "answer": "Use the Colorado PUC permit search and match the legal name on your written estimate. For any out-of-state leg, also verify USDOT / MC authority on FMCSA SAFER."
    },
    {
      "question": "How much does a local Denver move cost?",
      "answer": "Planning ranges often fall around $650–$2,500+ for a studio/1BR and more for larger homes, driven by elevators, parking, stairs, and season. Use the calculator for inventory-based planning, then compare written estimates."
    },
    {
      "question": "Is a Denver-to-Colorado Springs move intrastate?",
      "answer": "Yes — both ends are in Colorado, so you generally need a PUC-permitted household goods mover. Confirm written estimates cover stairs, packing, and access fees."
    },
    {
      "question": "When is peak moving season in Colorado?",
      "answer": "Statewide peak is typically May–September. Ski towns can also see winter peaks around holiday and season-change dates."
    },
    {
      "question": "Do I need different authority for interstate moves out of Colorado?",
      "answer": "Yes. Any origin or destination outside Colorado generally requires active FMCSA operating authority and a USDOT number. A PUC HHG permit alone is not interstate authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "Colorado PUC — Household goods movers",
        "href": "https://puc.colorado.gov/movers"
      },
      {
        "label": "Colorado PUC — Consumer info",
        "href": "https://puc.colorado.gov/household-goods-movers-consumer-info"
      },
      {
        "label": "Colorado PUC — Permit search",
        "href": "https://www.dora.state.co.us/pls/real/PUC_Permit.Search_Form"
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
