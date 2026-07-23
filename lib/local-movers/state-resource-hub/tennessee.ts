import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 3):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: partial_state_regulation
 */
export const tennesseeStateResourceHub: StateResourceHubPack = {
  "stateSlug": "tennessee",
  "stateCode": "TN",
  "h1": "Tennessee Moving Resource Hub: Costs, Intrastate Authority & 95 County Guides",
  "metaTitle": "Tennessee Movers Guide 2026 — Costs, TDOR Authority & 95 County Guides",
  "metaDescription": "Plan a move within, to, or from Tennessee. Compare local and intrastate costs, understand Tennessee Department of Revenue intrastate motor carrier authority, browse 95 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Tennessee moves in 2026 — typical costs, intrastate authority vs FMCSA rules, Nashville-to-Memphis regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "95 County Guides",
    "Verified Movers",
    "TN Authority & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Tennessee",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Tennessee",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Tennessee",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Tennessee markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Tennessee Moving Cost",
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
    "title": "Why moving in Tennessee is different",
    "paragraphs": [
      "Tennessee is not one moving market. Nashville multi-unit and HOA growth corridors, Memphis heat and older stock, Knoxville foothill access, Chattanooga ridge-and-valley logistics, and Tri-Cities industrial towns produce different access and labor profiles under one state name.",
      "For-hire motor carriers operating entirely within Tennessee generally need Tennessee Department of Revenue intrastate authority (Motor Carrier unit). Household goods hauls fall under that for-hire framework rather than a California-style dedicated HHG consumer board. Interstate jobs need FMCSA authority. Summer heat, music-city lease peaks, and I-40 corridor distances are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Tennessee moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Tennessee local and intrastate patterns; they are not bids. Always compare written estimates and confirm the right Tennessee or FMCSA authority for your route.",
    "stats": [
      {
        "label": "Typical Nashville studio / 1BR",
        "value": "$550–$2,300+",
        "note": "Elevators and parking dominate"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,800–$5,500+",
        "note": "Middle TN HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Nashville ↔ Knoxville)",
        "value": "$2,000–$6,500+",
        "note": "I-40 distance and season matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Heat and humidity affect productivity"
      },
      {
        "label": "Top inbound origins",
        "value": "CA · IL · NY · FL · TX",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "95",
        "note": "Nashville metro emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "partial_state_regulation",
    "title": "Tennessee moving regulations & consumer protection",
    "intro": "Tennessee regulates for-hire motor carriers operating on public highways within the state through Department of Revenue Motor Carrier intrastate authority. Household goods carriers are part of that for-hire framework. Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Tennessee)",
      "body": "If origin or destination is outside Tennessee, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Tennessee intrastate authority alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Tennessee)",
      "body": "For-hire motor carriers using Tennessee public highways entirely within the state generally need Intrastate Authority through the Tennessee Department of Revenue Motor Carrier unit. Household goods transportation is treated as for-hire property carriage under that system, with insurance and application requirements that can include household goods categories. Consumers should confirm the carrier’s intrastate credentials and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Tennessee (intrastate authority) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm Tennessee Department of Revenue Motor Carrier intrastate authority for for-hire household goods work.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates, insurance/valuation clarity, and inventory details.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "Intrastate authority requirement",
        "detail": "Tennessee Department of Revenue Motor Carrier materials state that intrastate authority allows for-hire motor carriers to use public highways of Tennessee for transportation of persons or property in intrastate commerce."
      },
      {
        "title": "Household goods as for-hire carriage",
        "detail": "Industry compliance references treat household goods as a for-hire category under Tennessee intrastate authority applications and insurance expectations — ask carriers for proof that covers your job type."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on stairs, elevators, long carries, heat delays, and packing before signing."
      }
    ],
    "officialLinks": [
      {
        "label": "TN Department of Revenue — Intrastate authority",
        "href": "https://www.tn.gov/revenue/motor-carrier/intrastate-authority.html",
        "external": true
      },
      {
        "label": "TN Department of Revenue — Motor Carrier",
        "href": "https://www.tn.gov/revenue/motor-carrier.html",
        "external": true
      },
      {
        "label": "TN Revenue support — What is Intrastate Authority",
        "href": "https://revenue.support.tn.gov/hc/en-us/articles/360060995071-MC-Intrastate-1-What-is-Intrastate-Authority",
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
    "disclaimer": "Licensing rules and application processes can change. Always verify current Tennessee intrastate authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "nashville-middle",
      "name": "Nashville & Middle Tennessee",
      "shortName": "Middle TN",
      "blurb": "Davidson, Williamson, Rutherford, Sumner, and Middle Tennessee growth counties with multi-unit and HOA suburbs.",
      "challenges": [
        "Elevators, parking, and HOA windows",
        "Music-city lease and tour-season peaks"
      ],
      "countySlugs": [
        "davidson",
        "williamson",
        "rutherford",
        "sumner",
        "wilson",
        "robertson",
        "cheatham",
        "dickson",
        "maury",
        "montgomery",
        "trousdale",
        "smith",
        "cannon",
        "dekalb",
        "putnam",
        "white",
        "warren",
        "coffee",
        "bedford",
        "marshall",
        "hickman",
        "perry",
        "humphreys",
        "houston",
        "stewart",
        "lewis",
        "wayne",
        "lawrence",
        "giles",
        "lincoln",
        "moore",
        "franklin",
        "macon",
        "jackson",
        "clay",
        "overton",
        "pickett",
        "fentress",
        "van-buren"
      ],
      "ctaLabel": "Explore Middle Tennessee"
    },
    {
      "id": "memphis-west",
      "name": "Memphis & West Tennessee",
      "shortName": "West TN",
      "blurb": "Shelby County and West Tennessee communities with heat, older multi-story stock, and Mississippi River logistics.",
      "challenges": [
        "Summer heat and humidity productivity loss",
        "Older homes and stairs"
      ],
      "countySlugs": [
        "shelby",
        "tipton",
        "fayette",
        "lauderdale",
        "haywood",
        "crockett",
        "dyer",
        "obion",
        "weakley",
        "gibson",
        "carroll",
        "henry",
        "benton",
        "decatur",
        "henderson",
        "chester",
        "hardeman",
        "mcnairy",
        "hardin",
        "madison",
        "lake"
      ],
      "ctaLabel": "Explore West Tennessee"
    },
    {
      "id": "knoxville-east",
      "name": "Knoxville & East Tennessee",
      "shortName": "East TN",
      "blurb": "Knox, Blount, Sevier, and East Tennessee foothill counties with tourist peaks and hill access.",
      "challenges": [
        "Hill driveways and foothill roads",
        "Smokies tourism season congestion"
      ],
      "countySlugs": [
        "knox",
        "blount",
        "sevier",
        "anderson",
        "roane",
        "loudon",
        "monroe",
        "cumberland",
        "morgan",
        "scott",
        "campbell",
        "union",
        "claiborne",
        "grainger",
        "jefferson",
        "hamblen",
        "cocke"
      ],
      "ctaLabel": "Explore East Tennessee"
    },
    {
      "id": "chattanooga-se",
      "name": "Chattanooga & Southeast",
      "shortName": "Chattanooga / SE",
      "blurb": "Hamilton and southeast ridge-and-valley counties with river city logistics and Georgia-border hops.",
      "challenges": [
        "Hill and ridge access",
        "Short interstate hops into Georgia need FMCSA authority"
      ],
      "countySlugs": [
        "hamilton",
        "bradley",
        "polk",
        "mcminn",
        "meigs",
        "rhea",
        "sequatchie",
        "bledsoe",
        "marion",
        "grundy"
      ],
      "ctaLabel": "Explore Chattanooga / SE"
    },
    {
      "id": "tri-cities",
      "name": "Tri-Cities",
      "shortName": "Tri-Cities",
      "blurb": "Sullivan, Washington, Carter, and neighbors with industrial towns and Appalachian approaches.",
      "challenges": [
        "Mountain weather and longer regional hauls",
        "Confirm mover coverage for remote addresses"
      ],
      "countySlugs": [
        "sullivan",
        "washington",
        "carter",
        "johnson",
        "unicoi",
        "hawkins",
        "greene",
        "hancock"
      ],
      "ctaLabel": "Explore Tri-Cities"
    }
  ],
  "costs": {
    "title": "Tennessee moving costs",
    "intro": "Tennessee pricing reflects Nashville labor markets, summer heat, HOA suburbs, and long I-40 east–west hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Tennessee moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Tennessee local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, heat, and regional labor. Actual bids vary. Always compare written estimates and confirm Tennessee intrastate or FMCSA authority for your route."
    },
    "ranges": [
      {
        "label": "Nashville studio / 1BR",
        "value": "$550–$2,300+",
        "note": "Elevators and parking dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,000+",
        "note": "Middle TN HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Nashville ↔ Chattanooga)",
        "value": "$1,800–$5,500+",
        "note": "Season and packing matter"
      },
      {
        "label": "Intrastate long (e.g. Memphis ↔ Knoxville)",
        "value": "$2,400–$7,500+",
        "note": "I-40 distance drives hours"
      },
      {
        "label": "Typical 2–3 person crew (Nashville)",
        "value": "$125–$230+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Nashville multi-unit buildings add elevator and staging time.",
      "Summer heat can slow outdoor labor and force earlier start times.",
      "HOA windows are common in Williamson and Rutherford suburbs.",
      "East–west I-40 hauls create long portal-to-portal days.",
      "Tourism seasons in Sevier County can congest roads and lodging for crews."
    ]
  },
  "routes": {
    "title": "Popular Tennessee moving routes",
    "intro": "Tennessee is a major inbound Sun Belt destination — especially Nashville — with strong California and Midwest origins and large Memphis–Nashville–Knoxville internal flows. Interstate jobs need FMCSA authority; in-state corridors need properly authorized for-hire carriers.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Tennessee → Florida",
        "href": "/moving-to/florida",
        "origins": "Nashville, Memphis",
        "transit": "I-75 / I-65 multi-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Common lifestyle outbound corridor."
      },
      {
        "label": "Tennessee → Georgia / Carolinas",
        "href": "/local-movers/georgia",
        "origins": "Chattanooga, Knoxville, Nashville",
        "transit": "Often next-day interstate",
        "planningNote": "Short hops are still interstate.",
        "note": "Popular Southeast job corridors."
      },
      {
        "label": "Tennessee → Texas",
        "href": "/local-movers/texas",
        "origins": "Nashville, Memphis",
        "transit": "Multi-day I-40",
        "planningNote": "Summer heat at both ends matters.",
        "note": "Bi-directional Sun Belt traffic."
      }
    ],
    "inbound": [
      {
        "label": "California → Tennessee",
        "href": "/local-movers/tennessee/davidson",
        "origins": "LA, Bay Area, San Diego",
        "transit": "Multi-day",
        "planningNote": "High-volume inbound into Nashville metro.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Davidson County (Nashville)",
        "href": "/local-movers/tennessee/davidson",
        "note": "Multi-unit elevators and dense urban staging."
      },
      {
        "label": "Moving to Williamson County",
        "href": "/local-movers/tennessee/williamson",
        "note": "HOA suburbs and larger home inventories."
      },
      {
        "label": "Moving to Shelby County (Memphis)",
        "href": "/local-movers/tennessee/shelby",
        "note": "Heat, older stock, and river-city logistics."
      }
    ]
  },
  "challenges": {
    "title": "Tennessee-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Tennessee moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Nashville growth and HOAs",
        "detail": "Williamson, Rutherford, and Davidson suburbs often restrict elevator and loading hours. Get HOA rules in writing before booking."
      },
      {
        "title": "Summer heat and humidity",
        "detail": "Memphis and Middle Tennessee summer heat slows outdoor labor. Prefer early start times June–August."
      },
      {
        "title": "Long east–west hauls",
        "detail": "Memphis–Knoxville distances make for long crew days. Confirm overnight plans and fuel time on written estimates."
      },
      {
        "title": "Smokies tourism congestion",
        "detail": "Sevier and Blount county roads jam in peak tourism seasons. Avoid weekend arrivals when possible."
      },
      {
        "title": "Authority mix",
        "detail": "Confirm Tennessee intrastate authority for pure in-state jobs and FMCSA authority for any out-of-state leg before deposits."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Tennessee moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Tennessee local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Tennessee movers need state authority?",
      "answer": "For-hire motor carriers operating entirely within Tennessee generally need Intrastate Authority through the Department of Revenue Motor Carrier unit. Interstate moves require FMCSA authority."
    },
    {
      "question": "Is there a dedicated household goods board in Tennessee?",
      "answer": "Tennessee’s primary in-state framework is for-hire motor carrier intrastate authority rather than a California-style dedicated HHG consumer commission. Ask carriers for proof that their credentials cover household goods for-hire work."
    },
    {
      "question": "How much does a local Nashville move cost?",
      "answer": "Planning ranges often fall around $550–$2,300+ for a studio/1BR and more for larger homes, driven by elevators, parking, and season. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Nashville-to-Memphis move intrastate?",
      "answer": "Yes — both ends are in Tennessee, so you generally need a properly authorized for-hire intrastate carrier for household goods."
    },
    {
      "question": "When is peak moving season in Tennessee?",
      "answer": "Statewide peak is typically May–September. Heat and humidity can affect summer productivity even outside holiday weekends."
    },
    {
      "question": "Do short moves into Georgia from Chattanooga need FMCSA authority?",
      "answer": "Yes. Crossing state lines generally requires active FMCSA operating authority even for short hops."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "TN DOR — Intrastate authority",
        "href": "https://www.tn.gov/revenue/motor-carrier/intrastate-authority.html"
      },
      {
        "label": "TN DOR — Motor Carrier",
        "href": "https://www.tn.gov/revenue/motor-carrier.html"
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
