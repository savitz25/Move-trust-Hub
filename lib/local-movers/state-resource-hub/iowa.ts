import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 6):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const iowaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "iowa",
  "stateCode": "IA",
  "h1": "Iowa Moving Resource Hub: Costs, Iowa DOT HHG Permits & 99 County Guides",
  "metaTitle": "Iowa Movers Guide 2026 — Costs, Iowa DOT Authority & 99 County Guides",
  "metaDescription": "Plan a move within, to, or from Iowa. Compare local and intrastate costs, verify Iowa DOT household goods motor carrier permits, browse 99 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Iowa moves in 2026 — typical costs, Iowa DOT vs FMCSA rules, Des Moines-to-Cedar Rapids regional guides, and tools to compare permitted movers without paid placements.",
  "trustBar": [
    "99 County Guides",
    "Verified Movers",
    "Iowa DOT & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Iowa",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Iowa",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Iowa",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Iowa markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Iowa Moving Cost",
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
    "title": "Why moving in Iowa is different",
    "paragraphs": [
      "Iowa is not one moving market. Des Moines multi-unit and HOA suburbs, Cedar Rapids–Iowa City corridor logistics, Quad Cities river approaches, Sioux City border hops, and long prairie hauls produce different access and labor profiles under one state name.",
      "Intrastate for-hire motor carriers of household goods must obtain an Iowa DOT Intrastate Motor Carrier Permit and file tariffs with the Office of Motor Carrier Services. Interstate jobs need FMCSA authority. Winter ice, summer heat, and college lease peaks are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Iowa moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Iowa local and intrastate patterns; they are not bids. Always compare written estimates from Iowa DOT-permitted movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Des Moines studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Stairs and winter access matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,500–$4,800+",
        "note": "Metro HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Des Moines ↔ Cedar Rapids)",
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
        "value": "FL · TX · AZ · IL · MN · MO",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "99",
        "note": "Des Moines and Eastern IA emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Iowa moving regulations & consumer protection",
    "intro": "Iowa requires for-hire motor carriers transporting household goods within the state to hold an Intrastate Motor Carrier Permit from the Iowa DOT Office of Motor Carrier Services and to file household goods tariffs. Match the permit to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Iowa)",
      "body": "If origin or destination is outside Iowa, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An Iowa intrastate household goods permit alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Iowa)",
      "body": "Motor carrier permits are issued for intrastate for-hire transportation including household goods. Household goods carriers must file tariffs stating rates and charges with Iowa DOT Motor Carrier Services; tariffs must be filed, posted, and approved before a permit can be issued. Consumers should confirm permit and written rate clarity before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Iowa (Iowa DOT permit + HHG tariff) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm Iowa Intrastate Motor Carrier Permit covering household goods.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates and ask how rates map to the filed tariff.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Intrastate motor carrier permit",
        "detail": "Iowa DOT issues motor carrier permits to for-hire carriers transporting household goods and other regulated categories within the state."
      },
      {
        "title": "Household goods tariff filing",
        "detail": "Motor carriers of household goods must maintain tariffs on file with Iowa DOT stating rates and charges for services performed under the permit."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, elevators, long carries, and packing before signing."
      }
    ],
    "officialLinks": [
      {
        "label": "Iowa DOT — Motor carriers",
        "href": "https://iowadot.gov/motor-carriers",
        "external": true
      },
      {
        "label": "Iowa DOT — Intrastate for-hire authority guide",
        "href": "https://iowadot.gov/media/1143/download?inline",
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
    "disclaimer": "Licensing rules and forms can change. Always verify current Iowa DOT permit status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "des-moines-central",
      "name": "Des Moines & Central Iowa",
      "shortName": "Des Moines / Central",
      "blurb": "Polk, Dallas, Warren, Story, and central counties with multi-unit access, HOAs, and I-35/I-80 logistics.",
      "challenges": [
        "HOA windows in growth suburbs",
        "Winter ice and summer heat"
      ],
      "countySlugs": [
        "polk",
        "dallas",
        "warren",
        "story",
        "jasper",
        "marion",
        "madison",
        "boone",
        "marshall",
        "hardin",
        "hamilton",
        "webster",
        "greene",
        "guthrie",
        "carroll",
        "audubon",
        "adair",
        "union",
        "clarke",
        "lucas",
        "monroe",
        "poweshiek",
        "tama"
      ],
      "ctaLabel": "Explore Des Moines / Central"
    },
    {
      "id": "eastern-ia",
      "name": "Eastern Iowa",
      "shortName": "Eastern IA",
      "blurb": "Cedar Rapids, Iowa City, Quad Cities approaches, and eastern industrial corridors.",
      "challenges": [
        "Campus lease-cycle peaks",
        "River-city staging near the Mississippi"
      ],
      "countySlugs": [
        "linn",
        "johnson",
        "scott",
        "muscatine",
        "cedar",
        "clinton",
        "jackson",
        "dubuque",
        "delaware",
        "buchanan",
        "benton",
        "iowa",
        "washington",
        "keokuk",
        "mahaska",
        "wapello",
        "jefferson",
        "henry",
        "des-moines",
        "louisa",
        "jones",
        "black-hawk",
        "bremer",
        "butler",
        "grundy",
        "chickasaw"
      ],
      "ctaLabel": "Explore Eastern Iowa"
    },
    {
      "id": "western-ia",
      "name": "Western Iowa",
      "shortName": "Western IA",
      "blurb": "Sioux City, Council Bluffs, and western counties with Nebraska-border hops and longer rural hauls.",
      "challenges": [
        "Short NE hops need FMCSA authority",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "woodbury",
        "pottawattamie",
        "harrison",
        "mills",
        "montgomery",
        "page",
        "fremont",
        "shelby",
        "cass",
        "crawford",
        "monona",
        "ida",
        "sac",
        "buena-vista",
        "cherokee",
        "plymouth",
        "sioux",
        "lyon",
        "osceola",
        "obrien",
        "clay",
        "dickinson",
        "palo-alto",
        "emmet",
        "pocahontas",
        "calhoun"
      ],
      "ctaLabel": "Explore Western Iowa"
    },
    {
      "id": "northern-ia",
      "name": "Northern Iowa",
      "shortName": "Northern IA",
      "blurb": "Mason City and northern counties with agricultural corridors and winter exposure.",
      "challenges": [
        "Severe winter weather windows",
        "Longer regional hauls to Des Moines"
      ],
      "countySlugs": [
        "cerro-gordo",
        "floyd",
        "mitchell",
        "worth",
        "winnebago",
        "hancock",
        "kossuth",
        "humboldt",
        "wright",
        "franklin",
        "howard",
        "winneshiek",
        "allamakee",
        "fayette",
        "clayton"
      ],
      "ctaLabel": "Explore Northern Iowa"
    },
    {
      "id": "southern-ia",
      "name": "Southern Iowa",
      "shortName": "Southern IA",
      "blurb": "Southern counties with thinner local mover density and longer driveway approaches.",
      "challenges": [
        "Confirm mover coverage early",
        "Long portal-to-portal distances"
      ],
      "countySlugs": [
        "appanoose",
        "davis",
        "van-buren",
        "lee",
        "wayne",
        "decatur",
        "ringgold",
        "taylor",
        "adams"
      ],
      "ctaLabel": "Explore Southern Iowa"
    }
  ],
  "costs": {
    "title": "Iowa moving costs",
    "intro": "Iowa pricing reflects Des Moines labor markets, winter weather, college peaks, and long cross-state hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Iowa moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Iowa local and intrastate patterns: home size, distance, stairs, parking, HOAs, winter weather, and regional labor. Actual bids vary under permitted tariff frameworks. Always compare written estimates from Iowa DOT-permitted movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Des Moines studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Access and season dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,500–$4,500+",
        "note": "HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Des Moines ↔ Cedar Rapids)",
        "value": "$1,600–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Sioux City ↔ Dubuque)",
        "value": "$2,000–$6,500+",
        "note": "Distance drives hours"
      },
      {
        "label": "Typical 2–3 person crew (Des Moines metro)",
        "value": "$110–$200+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Winter ice and snow can erase productivity and force reschedules.",
      "College towns compress August demand along the I-80 corridor.",
      "Metro HOAs add elevator and loading windows.",
      "Border hops into IL, NE, MN, MO, or WI are interstate even when short.",
      "Peak May–September fills crews before winter risk rises."
    ]
  },
  "routes": {
    "title": "Popular Iowa moving routes",
    "intro": "Iowa sees strong outbound Sun Belt flows and constant short interstate hops into Illinois, Nebraska, Minnesota, Missouri, and Wisconsin, plus large Des Moines–Cedar Rapids internal traffic. Interstate jobs need FMCSA authority; in-state corridors need Iowa DOT-permitted household goods carriers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Iowa → Florida",
        "href": "/moving-to/florida",
        "origins": "Des Moines, Eastern IA",
        "transit": "Multi-day; snowbird seasonality",
        "planningNote": "Book early for fall/winter FL arrivals.",
        "note": "High-volume Midwest-to-Florida corridor."
      },
      {
        "label": "Iowa → Texas / Arizona",
        "href": "/local-movers/texas",
        "origins": "Des Moines metro",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular job and lifestyle outbound destinations."
      },
      {
        "label": "Iowa → Illinois / Nebraska / Minnesota",
        "href": "/local-movers/illinois",
        "origins": "Eastern, Western, and Northern IA",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Polk County (Des Moines)",
        "href": "/local-movers/iowa/polk",
        "note": "Multi-unit access and dense urban staging."
      },
      {
        "label": "Moving to Linn County (Cedar Rapids)",
        "href": "/local-movers/iowa/linn",
        "note": "Eastern corridor industrial and suburban mix."
      },
      {
        "label": "Moving to Johnson County (Iowa City)",
        "href": "/local-movers/iowa/johnson",
        "note": "Campus peaks and mixed multi-unit stock."
      }
    ]
  },
  "challenges": {
    "title": "Iowa-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Iowa moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Winter weather windows",
        "detail": "Ice and snow can shut down driveway access. Build weather buffers November–March statewide."
      },
      {
        "title": "College lease peaks",
        "detail": "Iowa City, Ames, and other campus markets compress August demand. Book early."
      },
      {
        "title": "Border metro hops",
        "detail": "Quad Cities, Council Bluffs, and Sioux City jobs often cross state lines. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Tariff-aware estimates",
        "detail": "Ask how quoted rates map to the carrier’s Iowa DOT-filed household goods tariff for pure in-state work."
      },
      {
        "title": "Permit verification",
        "detail": "Confirm the exact legal name holds an Iowa Intrastate Motor Carrier Permit covering household goods before deposits."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Iowa moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Iowa local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Iowa movers need a state permit?",
      "answer": "Yes. For-hire household goods transportation within Iowa generally requires an Intrastate Motor Carrier Permit from Iowa DOT, with household goods tariffs on file. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify an Iowa mover?",
      "answer": "Confirm Iowa DOT motor carrier permit status for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Des Moines move cost?",
      "answer": "Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Des Moines-to-Cedar Rapids move intrastate?",
      "answer": "Yes — both ends are in Iowa, so you generally need an Iowa DOT-permitted household goods carrier."
    },
    {
      "question": "When is peak moving season in Iowa?",
      "answer": "Statewide peak is typically May–September. Winter weather can force flexible dates even outside peak."
    },
    {
      "question": "Does a Council Bluffs-to-Omaha move need FMCSA authority?",
      "answer": "Yes. Crossing into Nebraska is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "Iowa DOT — Motor carriers",
        "href": "https://iowadot.gov/motor-carriers"
      },
      {
        "label": "Iowa DOT — Intrastate for-hire authority",
        "href": "https://iowadot.gov/media/1143/download?inline"
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
