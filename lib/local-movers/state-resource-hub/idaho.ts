import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 8):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: partial_state_regulation
 */
export const idahoStateResourceHub: StateResourceHubPack = {
  "stateSlug": "idaho",
  "stateCode": "ID",
  "h1": "Idaho Moving Resource Hub: Costs, ITD Registration & 44 County Guides",
  "metaTitle": "Idaho Movers Guide 2026 — Costs, ITD Registration & 44 County Guides",
  "metaDescription": "Plan a move within, to, or from Idaho. Compare local and intrastate costs, understand Idaho Transportation Department registration expectations, browse 44 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Idaho moves in 2026 — typical costs, ITD vs FMCSA rules, Boise-to-Coeur d’Alene regional guides, and tools to compare registered movers without paid placements.",
  "trustBar": [
    "44 County Guides",
    "Verified Movers",
    "ITD & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Idaho",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Idaho",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Idaho",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Idaho markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Idaho Moving Cost",
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
    "title": "Why moving in Idaho is different",
    "paragraphs": [
      "Idaho is not one moving market. Boise multi-unit and HOA growth corridors, Coeur d’Alene lake-country access, Idaho Falls industrial logistics, Magic Valley agricultural towns, and mountain-pass weather produce different labor profiles under one state name.",
      "Idaho does not operate a California-style dedicated household-goods consumer permit board. Intrastate movers are generally expected to register with the Idaho Transportation Department and maintain appropriate commercial credentials; interstate jobs need FMCSA authority. Winter passes, wildfire season, and long empty miles between north and south are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Idaho moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Idaho local and intrastate patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for any out-of-state leg.",
    "stats": [
      {
        "label": "Typical Boise studio / 1BR",
        "value": "$500–$2,200+",
        "note": "Elevators, HOAs, and season matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,700–$5,200+",
        "note": "Treasure Valley HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Boise ↔ Coeur d’Alene)",
        "value": "$2,200–$7,500+",
        "note": "Long north–south haul; weather matters"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter passes force flexible dates"
      },
      {
        "label": "Top inbound origins",
        "value": "CA · WA · OR · TX · AZ · UT",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "44",
        "note": "Treasure Valley emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "partial_state_regulation",
    "title": "Idaho moving regulations & consumer protection",
    "intro": "Idaho generally requires intrastate movers to register with the Idaho Transportation Department rather than issuing a dedicated household-goods consumer permit comparable to Nebraska PSC or Oregon ODOT. Interstate work still requires FMCSA authority. Verify insurance and credentials carefully before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Idaho)",
      "body": "If origin or destination is outside Idaho, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. Idaho registration alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Idaho)",
      "body": "Industry and consumer guidance commonly states in-state movers should be registered with the Idaho Transportation Department and carry appropriate commercial insurance. Idaho does not publish a California-style dedicated HHG consumer license directory. Insist on written estimates, insurance certificates, and a clear legal business name for pure in-state jobs."
    },
    "verifySteps": [
      "Classify the job: entirely in Idaho vs any out-of-state leg (FMCSA / USDOT required).",
      "Copy the exact legal name from the written estimate.",
      "Interstate: look up USDOT / MC on FMCSA SAFER before deposits.",
      "Intrastate: request proof of ITD-related commercial registration, insurance certificates, and written inventory estimates.",
      "Confirm mountain-pass and HOA access constraints for your addresses.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "ITD registration expectations",
        "detail": "Consumer guidance commonly requires Idaho intrastate movers to register with the Idaho Transportation Department to operate legally within the state."
      },
      {
        "title": "FMCSA for interstate moves",
        "detail": "Any move that crosses a state line is generally under federal household goods rules — verify active FMCSA authority on SAFER."
      },
      {
        "title": "Written estimates and insurance",
        "detail": "Without a strong state HHG permit lookup, written estimates and cargo/liability insurance certificates are your primary consumer controls on local jobs."
      }
    ],
    "officialLinks": [
      {
        "label": "Idaho Transportation Department",
        "href": "https://www.itd.idaho.gov/",
        "external": true
      },
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
      }
    ],
    "disclaimer": "Regulatory frameworks can change. Always verify current commercial credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "treasure-valley",
      "name": "Treasure Valley",
      "shortName": "Treasure Valley",
      "blurb": "Ada, Canyon, and neighbors with multi-unit access, HOA suburbs, and I-84 logistics.",
      "challenges": [
        "HOA windows in Boise growth corridors",
        "Summer heat and winter inversions"
      ],
      "countySlugs": [
        "ada",
        "canyon",
        "gem",
        "payette",
        "owyhee",
        "elmore",
        "boise",
        "valley",
        "adams",
        "washington"
      ],
      "ctaLabel": "Explore Treasure Valley"
    },
    {
      "id": "eastern-id",
      "name": "Eastern Idaho",
      "shortName": "Eastern ID",
      "blurb": "Idaho Falls, Pocatello, and eastern counties with industrial corridors and mountain approaches.",
      "challenges": [
        "Winter weather and pass timing",
        "Industrial shift and plant peaks"
      ],
      "countySlugs": [
        "bonneville",
        "bannock",
        "bingham",
        "madison",
        "jefferson",
        "fremont",
        "teton",
        "clark",
        "butte",
        "power",
        "caribou",
        "bear-lake",
        "franklin",
        "oneida"
      ],
      "ctaLabel": "Explore Eastern Idaho"
    },
    {
      "id": "magic-valley",
      "name": "Magic Valley",
      "shortName": "Magic Valley",
      "blurb": "Twin Falls and south-central agricultural counties with longer rural approaches.",
      "challenges": [
        "Confirm coverage for rural addresses",
        "Wind and winter weather"
      ],
      "countySlugs": [
        "twin-falls",
        "jerome",
        "cassia",
        "minidoka",
        "gooding",
        "lincoln",
        "camas",
        "blaine"
      ],
      "ctaLabel": "Explore Magic Valley"
    },
    {
      "id": "north-id",
      "name": "North Idaho",
      "shortName": "North Idaho",
      "blurb": "Coeur d’Alene, Sandpoint, and panhandle counties with lake access and Washington-border hops.",
      "challenges": [
        "Short WA hops need FMCSA authority",
        "Lake-road and winter access"
      ],
      "countySlugs": [
        "kootenai",
        "bonner",
        "boundary",
        "shoshone",
        "benewah",
        "latah",
        "nez-perce",
        "clearwater",
        "lewis",
        "idaho"
      ],
      "ctaLabel": "Explore North Idaho"
    },
    {
      "id": "central-mountain",
      "name": "Central Mountain Idaho",
      "shortName": "Central Mountain",
      "blurb": "Custer and Lemhi high-country counties with thin coverage and long hauls.",
      "challenges": [
        "Confirm mover coverage early",
        "Mountain weather windows"
      ],
      "countySlugs": [
        "custer",
        "lemhi"
      ],
      "ctaLabel": "Explore Central Mountain"
    }
  ],
  "costs": {
    "title": "Idaho moving costs",
    "intro": "Idaho pricing reflects Boise labor markets, mountain weather, HOAs, and long north–south hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Idaho moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Idaho local and intrastate patterns: home size, distance, stairs/elevators, parking, HOAs, mountain weather, and regional labor. Actual bids vary. Always compare written estimates and confirm FMCSA authority for any out-of-state leg."
    },
    "ranges": [
      {
        "label": "Boise studio / 1BR",
        "value": "$500–$2,200+",
        "note": "Access and HOAs dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,700–$5,000+",
        "note": "Treasure Valley HOAs common"
      },
      {
        "label": "Intrastate mid-size (e.g. Boise ↔ Twin Falls)",
        "value": "$1,700–$5,200+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Boise ↔ Coeur d’Alene)",
        "value": "$2,400–$8,000+",
        "note": "North–south distance and weather"
      },
      {
        "label": "Typical 2–3 person crew (Boise metro)",
        "value": "$125–$230+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Mountain passes can close or slow trucks in winter.",
      "Treasure Valley HOAs restrict elevator and loading windows.",
      "North–south hauls create long empty miles.",
      "Wildfire-season air quality can delay summer jobs.",
      "Short hops into WA, OR, MT, NV, UT, or WY are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Idaho moving routes",
    "intro": "Idaho is a major Mountain West inbound destination with strong California and Washington origins and large Boise–north Idaho internal flows. Interstate jobs need FMCSA authority; local jobs need careful insurance and registration verification.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Idaho → Washington / Oregon",
        "href": "/local-movers/washington",
        "origins": "North Idaho, Treasure Valley",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common short regional hops."
      },
      {
        "label": "Idaho → California / Arizona",
        "href": "/local-movers/california",
        "origins": "Boise metro",
        "transit": "Multi-day interstate",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Bi-directional West traffic is common."
      },
      {
        "label": "Idaho → Utah / Montana",
        "href": "/local-movers/utah",
        "origins": "Eastern ID, Treasure Valley",
        "transit": "Mountain multi-day or short interstate",
        "planningNote": "Weather windows matter.",
        "note": "Popular Mountain West corridors."
      }
    ],
    "inbound": [
      {
        "label": "California → Idaho",
        "href": "/local-movers/idaho/ada",
        "origins": "Bay Area, LA, San Diego",
        "transit": "Multi-day",
        "planningNote": "High-volume inbound into Treasure Valley.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Ada County (Boise)",
        "href": "/local-movers/idaho/ada",
        "note": "Growth suburbs, multi-unit access, and HOAs."
      },
      {
        "label": "Moving to Kootenai County",
        "href": "/local-movers/idaho/kootenai",
        "note": "Lake-country access and WA-border patterns."
      }
    ]
  },
  "challenges": {
    "title": "Idaho-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Idaho moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Mountain pass weather",
        "detail": "North–south and eastbound routes can close or slow trucks. Build weather buffers November–March."
      },
      {
        "title": "Treasure Valley HOAs",
        "detail": "Boise-area communities often restrict elevator and loading hours. Get rules in writing before booking."
      },
      {
        "title": "Partial state HHG framework",
        "detail": "Without a dedicated consumer HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for any border hop."
      },
      {
        "title": "North Idaho border hops",
        "detail": "Moves into Washington are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Wildfire-season air quality",
        "detail": "Summer smoke can delay outdoor work. Keep a backup date for July–September jobs."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Idaho moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Idaho local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Idaho movers need a special household goods license?",
      "answer": "Idaho generally expects intrastate movers to register with the Idaho Transportation Department rather than issuing a dedicated household-goods consumer permit like some states. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify an Idaho mover?",
      "answer": "Request proof of commercial registration and insurance for the legal name on your estimate. For out-of-state legs, verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Boise move cost?",
      "answer": "Planning ranges often fall around $500–$2,200+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Boise-to-Coeur d’Alene move intrastate?",
      "answer": "Yes — both ends are in Idaho. Focus on insurance, written estimates, and weather logistics for the long haul."
    },
    {
      "question": "When is peak moving season in Idaho?",
      "answer": "Statewide peak is typically May–September. Winter passes can force flexible dates even outside peak."
    },
    {
      "question": "Does a Coeur d’Alene-to-Spokane move need FMCSA authority?",
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
        "label": "Idaho Transportation Department",
        "href": "https://www.itd.idaho.gov/"
      },
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
