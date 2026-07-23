import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 5):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const kentuckyStateResourceHub: StateResourceHubPack = {
  "stateSlug": "kentucky",
  "stateCode": "KY",
  "h1": "Kentucky Moving Resource Hub: Costs, KYTC HHG Certificates & 120 County Guides",
  "metaTitle": "Kentucky Movers Guide 2026 — Costs, KYTC DMT Authority & 120 County Guides",
  "metaDescription": "Plan a move within, to, or from Kentucky. Compare local and intrastate costs, verify Kentucky Transportation Cabinet household goods certificates, browse 120 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Kentucky moves in 2026 — typical costs, KYTC vs FMCSA rules, Louisville-to-Eastern Kentucky regional guides, and tools to compare licensed movers without paid placements.",
  "trustBar": [
    "120 County Guides",
    "Verified Movers",
    "KYTC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Kentucky",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Kentucky",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Kentucky",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Kentucky markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Kentucky Moving Cost",
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
    "title": "Why moving in Kentucky is different",
    "paragraphs": [
      "Kentucky is not one moving market. Louisville multi-unit and Ohio River logistics, Northern Kentucky Cincinnati-adjacent traffic, Lexington Bluegrass suburbs, Western Kentucky river towns, and Eastern Kentucky mountain access produce different access and labor profiles under one state name.",
      "Intrastate household goods movers must be licensed by the Kentucky Transportation Cabinet, Department of Vehicle Regulation, Division of Motor Carriers (often referenced as DMT/DVR authority). Interstate jobs need FMCSA authority. Horse-country HOAs, college peaks, and mountain roads are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Kentucky moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Kentucky local and intrastate patterns; they are not bids. Always compare written estimates from KYTC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Louisville studio / 1BR",
        "value": "$450–$2,100+",
        "note": "Stairs and river-city staging"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,500–$4,800+",
        "note": "Bluegrass and Louisville HOAs vary"
      },
      {
        "label": "Intrastate corridor (e.g. Louisville ↔ Lexington)",
        "value": "$1,600–$5,000+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter ice and summer heat both matter"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · TN · OH · IN · TX · NC",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "120",
        "note": "Louisville and Lexington emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Kentucky moving regulations & consumer protection",
    "intro": "Kentucky requires household goods movers operating within the state to be licensed by the Kentucky Transportation Cabinet Division of Motor Carriers. Match the DMT/DVR household goods certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Kentucky)",
      "body": "If origin or destination is outside Kentucky, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Kentucky household goods certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Kentucky)",
      "body": "For moves of household goods from one location to another within Kentucky, the mover must be licensed by KYTC Department of Vehicle Regulation / Division of Motor Carriers. Consumers should look for a KY DMT (sometimes called DVR) license number, request written estimates, and understand that the Cabinet investigates consumer complaints against licensed movers."
    },
    "verifySteps": [
      "Classify the job: entirely in Kentucky (KYTC HHG certificate) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name and KY DMT/DVR license number from the written estimate.",
      "Intrastate: confirm Kentucky household goods certificate qualification through KYTC / Drive.ky.gov motor carrier resources.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Request and obtain a written estimate before move day.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "KYTC household goods licensing",
        "detail": "Kentucky consumer guidance states in-state household goods movers must be licensed by the Transportation Cabinet Division of Motor Carriers, which sets licensing and insurance requirements."
      },
      {
        "title": "DMT / DVR license number",
        "detail": "Consumers are advised to confirm the mover has a Kentucky DMT (sometimes referred to as DVR) license number before hiring."
      },
      {
        "title": "Written estimates and complaints",
        "detail": "Request written estimates and use KYTC complaint investigation channels when licensed movers create problems."
      }
    ],
    "officialLinks": [
      {
        "label": "KY Drive — Household goods",
        "href": "https://drive.ky.gov/Motor-Carriers/Pages/Household-Goods.aspx",
        "external": true
      },
      {
        "label": "Kentucky Transportation Cabinet",
        "href": "https://transportation.ky.gov/",
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
    "disclaimer": "Licensing rules and forms can change. Always verify current KYTC household goods authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "louisville-metro",
      "name": "Louisville Metro",
      "shortName": "Louisville Metro",
      "blurb": "Jefferson and surrounding counties with multi-unit stock, suburbs, and Ohio River logistics.",
      "challenges": [
        "Stairs, elevators, and river-city staging",
        "Short IN hops need FMCSA authority"
      ],
      "countySlugs": [
        "jefferson",
        "oldham",
        "bullitt",
        "shelby",
        "spencer",
        "nelson",
        "meade",
        "hardin",
        "henry",
        "trimble"
      ],
      "ctaLabel": "Explore Louisville Metro"
    },
    {
      "id": "northern-ky",
      "name": "Northern Kentucky",
      "shortName": "Northern KY",
      "blurb": "Kenton, Campbell, Boone, and neighbors with Cincinnati-adjacent traffic and suburban HOAs.",
      "challenges": [
        "Cross-metro traffic toward Cincinnati",
        "Short OH hops need FMCSA authority"
      ],
      "countySlugs": [
        "kenton",
        "campbell",
        "boone",
        "grant",
        "pendleton",
        "gallatin",
        "carroll",
        "owen",
        "bracken"
      ],
      "ctaLabel": "Explore Northern Kentucky"
    },
    {
      "id": "lexington-bluegrass",
      "name": "Lexington & Bluegrass",
      "shortName": "Lexington / Bluegrass",
      "blurb": "Fayette and Bluegrass counties with horse-country estates, campus peaks, and growth suburbs.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Long driveway and farm access"
      ],
      "countySlugs": [
        "fayette",
        "jessamine",
        "scott",
        "woodford",
        "bourbon",
        "clark",
        "madison",
        "garrard",
        "mercer",
        "anderson",
        "franklin",
        "harrison",
        "nicholas",
        "montgomery",
        "powell",
        "estill",
        "boyle",
        "washington"
      ],
      "ctaLabel": "Explore Lexington / Bluegrass"
    },
    {
      "id": "western-ky",
      "name": "Western Kentucky",
      "shortName": "Western KY",
      "blurb": "Paducah, Bowling Green, Owensboro, and western counties with river towns and longer regional hauls.",
      "challenges": [
        "Distance from Louisville fleets",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "mccracken",
        "marshall",
        "calloway",
        "graves",
        "hickman",
        "fulton",
        "ballard",
        "carlisle",
        "crittenden",
        "livingston",
        "lyon",
        "caldwell",
        "hopkins",
        "christian",
        "todd",
        "trigg",
        "muhlenberg",
        "ohio",
        "daviess",
        "henderson",
        "union",
        "webster",
        "mclean",
        "hancock",
        "breckinridge",
        "grayson",
        "butler",
        "logan",
        "simpson",
        "warren",
        "allen",
        "edmonson",
        "barren",
        "metcalfe",
        "monroe",
        "hart",
        "larue",
        "marion",
        "taylor",
        "green",
        "adair",
        "cumberland",
        "clinton",
        "russell",
        "wayne"
      ],
      "ctaLabel": "Explore Western Kentucky"
    },
    {
      "id": "eastern-ky",
      "name": "Eastern Kentucky",
      "shortName": "Eastern KY",
      "blurb": "Mountain counties with steep access, longer portal-to-portal distances, and thinner local coverage in places.",
      "challenges": [
        "Mountain roads and steep driveways",
        "Confirm mover coverage early"
      ],
      "countySlugs": [
        "boyd",
        "greenup",
        "carter",
        "lawrence",
        "elliott",
        "morgan",
        "rowan",
        "bath",
        "fleming",
        "mason",
        "lewis",
        "johnson",
        "martin",
        "floyd",
        "pike",
        "magoffin",
        "breathitt",
        "knott",
        "perry",
        "leslie",
        "letcher",
        "harlan",
        "bell",
        "knox",
        "whitley",
        "laurel",
        "pulaski",
        "mccreary",
        "jackson",
        "rockcastle",
        "lincoln",
        "casey",
        "clay",
        "owsley",
        "lee",
        "wolfe",
        "menifee",
        "robertson"
      ],
      "ctaLabel": "Explore Eastern Kentucky"
    }
  ],
  "costs": {
    "title": "Kentucky moving costs",
    "intro": "Kentucky pricing reflects Louisville and Lexington labor markets, river-city access, mountain roads, and long east–west hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Kentucky moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Kentucky local and intrastate patterns: home size, distance, stairs, parking, HOAs, hills, seasonality, and regional labor. Actual bids vary. Always compare written estimates from KYTC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Louisville studio / 1BR",
        "value": "$450–$2,100+",
        "note": "Stairs and staging dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,500–$4,500+",
        "note": "HOAs vary by suburb"
      },
      {
        "label": "Intrastate mid-size (e.g. Louisville ↔ Lexington)",
        "value": "$1,600–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Louisville ↔ Paducah or Pikeville)",
        "value": "$2,000–$6,500+",
        "note": "Mountain and distance logistics"
      },
      {
        "label": "Typical 2–3 person crew (Louisville / Lexington)",
        "value": "$110–$200+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Ohio River metro congestion changes portal-to-portal time.",
      "Eastern Kentucky mountain roads may need smaller trucks.",
      "Bluegrass farm and estate access adds long carries.",
      "College towns compress August demand.",
      "Short hops into OH, IN, TN, or WV are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Kentucky moving routes",
    "intro": "Kentucky bridges Midwest and Southeast corridors with strong outbound Sun Belt flows, short interstate hops into Ohio, Indiana, and Tennessee, and large Louisville–Lexington internal traffic. Interstate jobs need FMCSA authority; in-state corridors need KYTC-licensed household goods movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Kentucky → Florida",
        "href": "/moving-to/florida",
        "origins": "Louisville, Lexington, Northern KY",
        "transit": "Multi-day I-75 / I-65",
        "planningNote": "Book early for winter arrivals.",
        "note": "High-volume Midwest/South-to-Florida corridor."
      },
      {
        "label": "Kentucky → Tennessee / Carolinas",
        "href": "/local-movers/tennessee",
        "origins": "Statewide metros",
        "transit": "I-75 / I-65 corridors",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular job and lifestyle outbound routes."
      },
      {
        "label": "Kentucky → Ohio / Indiana",
        "href": "/local-movers/ohio",
        "origins": "Northern KY, Louisville",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are extremely common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Jefferson County (Louisville)",
        "href": "/local-movers/kentucky/jefferson",
        "note": "Multi-unit access and river-city logistics."
      },
      {
        "label": "Moving to Fayette County (Lexington)",
        "href": "/local-movers/kentucky/fayette",
        "note": "Bluegrass suburbs and campus peaks."
      },
      {
        "label": "Moving to Boone County",
        "href": "/local-movers/kentucky/boone",
        "note": "Northern KY growth and Cincinnati-adjacent patterns."
      }
    ]
  },
  "challenges": {
    "title": "Kentucky-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Kentucky moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Ohio River border hops",
        "detail": "Moves from Louisville into Indiana or from Northern Kentucky into Ohio are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Eastern Kentucky mountain access",
        "detail": "Steep grades and narrow roads may require smaller trucks or shuttle strategies. Share GPS pins and photos early."
      },
      {
        "title": "Bluegrass estate and farm access",
        "detail": "Long driveways and gated properties add carry time. Confirm equipment needs on written estimates."
      },
      {
        "title": "College lease peaks",
        "detail": "Lexington and other campus markets compress August demand. Book early."
      },
      {
        "title": "KYTC license verification",
        "detail": "Confirm the exact legal name and KY DMT/DVR household goods license number before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Kentucky moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Kentucky local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Kentucky movers need a state license?",
      "answer": "Yes. Household goods movers operating within Kentucky must be licensed by the Kentucky Transportation Cabinet Division of Motor Carriers. Interstate moves require FMCSA authority."
    },
    {
      "question": "What is a DMT or DVR license number?",
      "answer": "Kentucky consumer materials advise checking for a KY DMT license number (sometimes referred to as DVR) that shows the mover holds state household goods authority."
    },
    {
      "question": "How much does a local Louisville move cost?",
      "answer": "Planning ranges often fall around $450–$2,100+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Louisville-to-Lexington move intrastate?",
      "answer": "Yes — both ends are in Kentucky, so you generally need a KYTC-licensed household goods mover."
    },
    {
      "question": "When is peak moving season in Kentucky?",
      "answer": "Statewide peak is typically May–September. Winter ice and summer heat can both affect productivity."
    },
    {
      "question": "Does a Covington-to-Cincinnati move need FMCSA authority?",
      "answer": "Yes. Crossing into Ohio is interstate even for short hops. Confirm active FMCSA operating authority and a USDOT number."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "KY Drive — Household goods",
        "href": "https://drive.ky.gov/Motor-Carriers/Pages/Household-Goods.aspx"
      },
      {
        "label": "Kentucky Transportation Cabinet",
        "href": "https://transportation.ky.gov/"
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
