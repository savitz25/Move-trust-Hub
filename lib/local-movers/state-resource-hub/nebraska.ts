import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 8):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const nebraskaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "nebraska",
  "stateCode": "NE",
  "h1": "Nebraska Moving Resource Hub: Costs, PSC HHG Licenses & 93 County Guides",
  "metaTitle": "Nebraska Movers Guide 2026 — Costs, PSC Licenses & 93 County Guides",
  "metaDescription": "Plan a move within, to, or from Nebraska. Compare local and intrastate costs, verify Nebraska Public Service Commission household goods licenses, browse 93 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Nebraska moves in 2026 — typical costs, PSC vs FMCSA rules, Omaha-to-Panhandle regional guides, and tools to compare licensed movers without paid placements.",
  "trustBar": [
    "93 County Guides",
    "Verified Movers",
    "NE PSC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Nebraska",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Nebraska",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Nebraska",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Nebraska markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Nebraska Moving Cost",
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
    "title": "Why moving in Nebraska is different",
    "paragraphs": [
      "Nebraska is not one moving market. Omaha multi-unit and Iowa-border logistics, Lincoln capital and campus peaks, Grand Island–Kearney I-80 corridors, and Panhandle long hauls produce different access and labor profiles under one state name.",
      "Household goods movers must apply for and hold a License from the Nebraska Public Service Commission before transporting household goods in the state. Interstate jobs need FMCSA authority. Winter plains weather, tornado season, and I-80 distances are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Nebraska moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Nebraska local and intrastate patterns; they are not bids. Always compare written estimates from PSC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Omaha studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Stairs and winter access matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,500–$4,800+",
        "note": "Metro HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Omaha ↔ Lincoln or Grand Island)",
        "value": "$1,600–$5,000+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter weather forces flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "CO · TX · AZ · IA · FL · KS",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "93",
        "note": "Omaha and Lincoln emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Nebraska moving regulations & consumer protection",
    "intro": "Nebraska requires household goods movers to apply for and be granted a License by the Nebraska Public Service Commission before transporting household goods in the state. Match the license to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Nebraska)",
      "body": "If origin or destination is outside Nebraska, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Nebraska PSC household goods license alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Nebraska)",
      "body": "Beginning under state statute frameworks, movers of household goods must apply to the Commission for a license prior to transporting household goods. Licenses are typically valid for one year and renewable. PSC publishes licensee lists and application materials. Consumers should confirm active license status and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Nebraska (PSC HHG license) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm a current Nebraska PSC household goods mover license.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance/valuation clarity, and inventory details.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "PSC household goods mover license",
        "detail": "To operate as a household goods mover in Nebraska, an interested party must apply for and be granted a License by the Nebraska Public Service Commission."
      },
      {
        "title": "Annual license term",
        "detail": "Licenses are valid for one year from the effective date and may be renewed with required fees and forms."
      },
      {
        "title": "Statewide service listings",
        "detail": "PSC publishes household goods movers licensee information so consumers can confirm authorized operators."
      }
    ],
    "officialLinks": [
      {
        "label": "NE PSC — Household goods movers licensees",
        "href": "https://psc.nebraska.gov/household-goods-movers-licensees",
        "external": true
      },
      {
        "label": "NE PSC — Transportation",
        "href": "https://psc.nebraska.gov/transportation",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current PSC license status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "omaha-metro",
      "name": "Omaha Metro",
      "shortName": "Omaha Metro",
      "blurb": "Douglas, Sarpy, and neighbors with multi-unit access, suburbs, and Iowa-border logistics.",
      "challenges": [
        "Short IA hops need FMCSA authority",
        "Winter ice and HOA windows"
      ],
      "countySlugs": [
        "douglas",
        "sarpy",
        "washington",
        "cass",
        "saunders",
        "dodge",
        "burt"
      ],
      "ctaLabel": "Explore Omaha Metro"
    },
    {
      "id": "lincoln-southeast",
      "name": "Lincoln & Southeast",
      "shortName": "Lincoln / SE",
      "blurb": "Lancaster capital and campus peaks with southeast agricultural counties.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Mix of multi-unit and rural access"
      ],
      "countySlugs": [
        "lancaster",
        "seward",
        "gage",
        "otoe",
        "johnson",
        "nemaha",
        "richardson",
        "pawnee",
        "jefferson",
        "saline",
        "fillmore",
        "thayer",
        "nuckolls",
        "clay",
        "webster",
        "franklin",
        "adams",
        "york",
        "butler",
        "polk",
        "hamilton"
      ],
      "ctaLabel": "Explore Lincoln / Southeast"
    },
    {
      "id": "central-ne",
      "name": "Central Nebraska",
      "shortName": "Central NE",
      "blurb": "Grand Island, Kearney, and I-80 corridor counties with longer regional hauls.",
      "challenges": [
        "I-80 weather and truck traffic",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "hall",
        "buffalo",
        "dawson",
        "phelps",
        "kearney",
        "howard",
        "merrick",
        "nance",
        "platte",
        "colfax",
        "madison",
        "stanton",
        "cuming",
        "thurston",
        "wayne",
        "pierce",
        "antelope",
        "boone",
        "greeley",
        "valley",
        "sherman",
        "custer",
        "loup",
        "garfield",
        "wheeler",
        "holt",
        "boyd",
        "knox",
        "cedar",
        "dixon",
        "dakota"
      ],
      "ctaLabel": "Explore Central Nebraska"
    },
    {
      "id": "western-ne",
      "name": "Western Nebraska",
      "shortName": "Western NE",
      "blurb": "North Platte and southwest counties with plains approaches and thinner local density.",
      "challenges": [
        "Long empty miles from Omaha fleets",
        "Wind and winter weather"
      ],
      "countySlugs": [
        "lincoln",
        "keith",
        "perkins",
        "chase",
        "dundy",
        "hitchcock",
        "red-willow",
        "frontier",
        "gosper",
        "furnas",
        "harlan",
        "hayes"
      ],
      "ctaLabel": "Explore Western Nebraska"
    },
    {
      "id": "panhandle",
      "name": "Nebraska Panhandle",
      "shortName": "Panhandle",
      "blurb": "Scottsbluff and Panhandle counties with long portal-to-portal distances.",
      "challenges": [
        "Confirm mover coverage early",
        "Long regional hauls and weather"
      ],
      "countySlugs": [
        "scotts-bluff",
        "banner",
        "kimball",
        "cheyenne",
        "deuel",
        "morrill",
        "box-butte",
        "dawes",
        "sioux",
        "sheridan",
        "garden",
        "arthur",
        "grant",
        "hooker",
        "thomas",
        "mcpherson",
        "logan",
        "cherry",
        "keya-paha",
        "brown",
        "rock",
        "blaine"
      ],
      "ctaLabel": "Explore Panhandle"
    }
  ],
  "costs": {
    "title": "Nebraska moving costs",
    "intro": "Nebraska pricing reflects Omaha and Lincoln labor markets, winter weather, and long I-80 hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Nebraska moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Nebraska local and intrastate patterns: home size, distance, stairs, parking, HOAs, winter weather, and regional labor. Actual bids vary. Always compare written estimates from PSC-licensed movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Omaha studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Access and season dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,500–$4,500+",
        "note": "HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Omaha ↔ Lincoln)",
        "value": "$1,500–$4,800+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Omaha ↔ Scottsbluff)",
        "value": "$2,200–$7,000+",
        "note": "I-80 distance drives hours"
      },
      {
        "label": "Typical 2–3 person crew (Omaha / Lincoln)",
        "value": "$110–$200+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Winter ice and snow can force reschedules statewide.",
      "Omaha multi-unit buildings add stair and elevator time.",
      "Panhandle jobs include long empty miles.",
      "College towns compress August demand in Lincoln.",
      "Short hops into IA, KS, MO, SD, CO, or WY are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Nebraska moving routes",
    "intro": "Nebraska sits on I-80 between Midwest and Mountain West corridors with strong Omaha–Lincoln internal traffic and short interstate hops into Iowa, Kansas, and Colorado. Interstate jobs need FMCSA authority; in-state corridors need PSC-licensed movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Nebraska → Colorado / Arizona",
        "href": "/local-movers/colorado",
        "origins": "Omaha, Lincoln, Panhandle",
        "transit": "I-80 multi-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular Mountain West outbound corridors."
      },
      {
        "label": "Nebraska → Texas / Florida",
        "href": "/local-movers/texas",
        "origins": "Omaha, Lincoln",
        "transit": "Multi-day interstate",
        "planningNote": "Book early for seasonal peaks.",
        "note": "Common lifestyle outbound destinations."
      },
      {
        "label": "Nebraska → Iowa / Kansas",
        "href": "/local-movers/iowa",
        "origins": "Omaha metro, Southeast NE",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Douglas County (Omaha)",
        "href": "/local-movers/nebraska/douglas",
        "note": "Multi-unit access and dense urban staging."
      },
      {
        "label": "Moving to Lancaster County (Lincoln)",
        "href": "/local-movers/nebraska/lancaster",
        "note": "Capital and campus logistics."
      },
      {
        "label": "Moving to Sarpy County",
        "href": "/local-movers/nebraska/sarpy",
        "note": "Omaha south-metro suburbs and HOAs."
      }
    ]
  },
  "challenges": {
    "title": "Nebraska-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Nebraska moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Winter plains weather",
        "detail": "Ice, wind, and snow can shut down driveway access. Build weather buffers November–March."
      },
      {
        "title": "Omaha border hops into Iowa",
        "detail": "Council Bluffs–adjacent jobs are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Panhandle distance",
        "detail": "Scottsbluff and far-west jobs create long empty miles. Confirm coverage and overnight plans early."
      },
      {
        "title": "Lincoln campus peaks",
        "detail": "Late August demand spikes around student turnovers. Book earlier than a typical civilian calendar."
      },
      {
        "title": "PSC license verification",
        "detail": "Confirm the exact legal name holds a current Nebraska PSC household goods mover license before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Nebraska moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Nebraska local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Nebraska movers need a PSC license?",
      "answer": "Yes. Household goods movers must be granted a License by the Nebraska Public Service Commission before transporting household goods in the state. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Nebraska mover?",
      "answer": "Check PSC household goods movers licensee resources for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Omaha move cost?",
      "answer": "Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is an Omaha-to-Lincoln move intrastate?",
      "answer": "Yes — both ends are in Nebraska, so you generally need a PSC-licensed household goods mover."
    },
    {
      "question": "When is peak moving season in Nebraska?",
      "answer": "Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak."
    },
    {
      "question": "Does an Omaha-to-Council Bluffs move need FMCSA authority?",
      "answer": "Yes. Crossing into Iowa is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "NE PSC — Household goods movers licensees",
        "href": "https://psc.nebraska.gov/household-goods-movers-licensees"
      },
      {
        "label": "NE PSC — Transportation",
        "href": "https://psc.nebraska.gov/transportation"
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
