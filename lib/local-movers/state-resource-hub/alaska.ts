import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 8):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: inbound_dominant
 * - Regulation mode: limited_or_none
 */
export const alaskaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "alaska",
  "stateCode": "AK",
  "h1": "Alaska Moving Resource Hub: Costs, FMCSA Checks & 29 Borough Guides",
  "metaTitle": "Alaska Movers Guide 2026 — Costs, Insurance Checks & 29 Borough Guides",
  "metaDescription": "Plan a move within, to, or from Alaska. Compare local and long-haul costs, understand Alaska’s limited state HHG licensing versus FMCSA interstate rules, browse borough guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Alaska moves in 2026 — typical costs, FMCSA-first verification for Outside/interstate work, Anchorage-to-Southeast regional guides, and tools to compare movers without paid placements.",
  "trustBar": [
    "29 Borough Guides",
    "Verified Movers",
    "FMCSA-Focused Checks",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Alaska",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Alaska",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Alaska",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Alaska markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Alaska Moving Cost",
    "href": "/moving-calculator"
  },
  "secondaryCta": {
    "label": "Find & Compare Movers",
    "href": "/companies"
  },
  "tertiaryCta": {
    "label": "Explore Regions & Boroughs",
    "href": "#hub-regions"
  },
  "whyDifferent": {
    "title": "Why moving in Alaska is different",
    "paragraphs": [
      "Alaska is not one moving market. Anchorage multi-unit winters, Mat-Su growth, Fairbanks extreme cold, Southeast ferry logistics, and Bush communities with air/barge-only access produce different labor profiles under one state name.",
      "Alaska does not require a special state-issued household-goods permit for pure intrastate movers comparable to many lower-48 states. Businesses still need an Alaska business license; interstate/Outside moves need FMCSA authority. Ferry schedules, freeze-up, and long empty miles are planning inputs — then open the region and borough that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Alaska moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Alaska local and long-haul patterns; they are not bids. Always compare written estimates and confirm FMCSA authority for Outside/interstate legs.",
    "stats": [
      {
        "label": "Typical Anchorage studio / 1BR",
        "value": "$600–$2,800+",
        "note": "Winter access and elevators matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$2,000–$7,000+",
        "note": "Season and driveway snow matter"
      },
      {
        "label": "Intrastate long (e.g. Anchorage ↔ Fairbanks)",
        "value": "$2,500–$9,000+",
        "note": "Distance, weather, and packing drive spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter forces flexible dates"
      },
      {
        "label": "Top Outside origins",
        "value": "WA · CA · TX · OR · CO",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "Borough guides",
        "value": "29",
        "note": "Southcentral emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "limited_or_none",
    "title": "Alaska moving regulations & consumer protection",
    "intro": "Alaska does not issue a dedicated household-goods carrier license for pure intrastate movers. Consumer protection relies on business licensing, insurance, contracts, Attorney General consumer protection tools, and — for Outside/interstate legs — FMCSA authority. Verify credentials carefully before you pay a deposit.",
    "interstate": {
      "title": "Interstate / Outside Alaska",
      "body": "If origin or destination is outside Alaska, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An Alaska business license alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Alaska)",
      "body": "Alaska does not maintain a specialized household-goods permit board like many lower-48 states. Moving companies still need a State of Alaska business license and should carry appropriate insurance. Consumers should insist on written estimates, certificates of insurance, and clear legal names. Ferry- and air-dependent communities add logistics complexity beyond licensing."
    },
    "verifySteps": [
      "Classify the job: entirely in Alaska vs any Outside/interstate leg (FMCSA / USDOT required).",
      "Copy the exact legal name from the written estimate.",
      "Outside/interstate: look up USDOT / MC on FMCSA SAFER before deposits.",
      "Intrastate: request Alaska business license details, insurance certificates, and written inventory estimates.",
      "For ferry/air communities, confirm schedule and packing requirements early.",
      "Avoid large cash deposits to unverified operators; document all agreements in writing."
    ],
    "protections": [
      {
        "title": "No dedicated HHG permit board",
        "detail": "Consumer sources note Alaska does not require a special state-issued household-goods license for pure intrastate movers beyond general business licensing."
      },
      {
        "title": "Business license and insurance",
        "detail": "Businesses operating in Alaska need a state business license; consumers should still demand cargo/liability insurance certificates and written contracts."
      },
      {
        "title": "FMCSA for Outside moves",
        "detail": "Moves to or from the lower 48 or other states are interstate — verify active FMCSA authority on SAFER."
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
        "label": "Alaska business licensing (DCCED)",
        "href": "https://www.commerce.alaska.gov/web/cbpl/BusinessLicensing.aspx",
        "external": true
      },
      {
        "label": "Move Trust Hub — Verify a USDOT",
        "href": "/verify-dot"
      }
    ],
    "disclaimer": "Regulatory frameworks can change. Always verify current business credentials and FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "anchorage-southcentral",
      "name": "Anchorage & Southcentral",
      "shortName": "Southcentral",
      "blurb": "Anchorage, Mat-Su, Kenai, and southcentral communities with multi-unit winters and highway access.",
      "challenges": [
        "Winter driveway and ice access",
        "Peak summer construction traffic"
      ],
      "countySlugs": [
        "anchorage",
        "matanuska-susitna",
        "kenai-peninsula",
        "valdez-cordova",
        "kodiak-island"
      ],
      "ctaLabel": "Explore Southcentral"
    },
    {
      "id": "interior",
      "name": "Interior Alaska",
      "shortName": "Interior",
      "blurb": "Fairbanks and Interior communities with extreme cold and long highway hauls.",
      "challenges": [
        "Extreme cold labor and equipment limits",
        "Long empty miles from Anchorage"
      ],
      "countySlugs": [
        "fairbanks-north-star",
        "denali",
        "southeast-fairbanks",
        "yukon-koyukuk"
      ],
      "ctaLabel": "Explore Interior"
    },
    {
      "id": "southeast",
      "name": "Southeast Alaska",
      "shortName": "Southeast",
      "blurb": "Juneau, Ketchikan, Sitka, and ferry-dependent communities with marine logistics.",
      "challenges": [
        "Ferry schedule constraints",
        "Rain and limited staging areas"
      ],
      "countySlugs": [
        "juneau",
        "ketchikan-gateway",
        "sitka",
        "petersburg",
        "wrangell",
        "haines",
        "skagway",
        "hoonah-angoon",
        "prince-of-wales-hyder",
        "yakutat"
      ],
      "ctaLabel": "Explore Southeast"
    },
    {
      "id": "southwest-bush",
      "name": "Southwest & Bush Alaska",
      "shortName": "Southwest / Bush",
      "blurb": "Western, Arctic, and Aleutian communities with air/barge-only access in many places.",
      "challenges": [
        "Air/barge-only logistics",
        "Confirm specialized carrier coverage early"
      ],
      "countySlugs": [
        "bethel",
        "wade-hampton",
        "dillingham",
        "bristol-bay",
        "lake-and-peninsula",
        "aleutians-east",
        "aleutians-west",
        "nome",
        "northwest-arctic",
        "north-slope"
      ],
      "ctaLabel": "Explore Southwest / Bush"
    }
  ],
  "costs": {
    "title": "Alaska moving costs",
    "intro": "Alaska pricing reflects Anchorage labor markets, extreme seasons, ferry/air components, and long empty miles. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Alaska moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Alaska local and long-haul patterns: home size, distance, winter access, ferry/air components, packing, and regional labor. Actual bids vary widely by season and community access. Always compare written estimates and confirm FMCSA authority for Outside/interstate legs."
    },
    "ranges": [
      {
        "label": "Anchorage studio / 1BR",
        "value": "$600–$2,800+",
        "note": "Winter access dominates"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$2,000–$6,500+",
        "note": "Season and driveway snow matter"
      },
      {
        "label": "Intrastate long (e.g. Anchorage ↔ Fairbanks)",
        "value": "$2,500–$9,000+",
        "note": "Distance and weather drive hours"
      },
      {
        "label": "Ferry / Bush community moves",
        "value": "Highly variable",
        "note": "Air/barge components dominate"
      },
      {
        "label": "Typical 2–3 person crew (Anchorage)",
        "value": "$140–$260+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Winter ice and extreme cold can erase productivity.",
      "Ferry and air schedules drive Southeast and Bush costs.",
      "Long empty miles between hubs raise portal-to-portal time.",
      "Summer peak competes with construction and tourism demand.",
      "Outside moves are interstate and need FMCSA authority."
    ]
  },
  "routes": {
    "title": "Popular Alaska moving routes",
    "intro": "Alaska sees strong Outside inbound flows via Seattle corridors, large Anchorage–Fairbanks internal traffic, and ferry-dependent Southeast moves. Outside jobs need FMCSA authority; pure in-state jobs need careful insurance and logistics verification.",
    "migrationProfile": "inbound_dominant",
    "outbound": [
      {
        "label": "Alaska → Washington / Lower 48",
        "href": "/local-movers/washington",
        "origins": "Anchorage, Fairbanks, Southeast",
        "transit": "Marine + multi-day inland",
        "planningNote": "Confirm FMCSA authority; plan long transit times.",
        "note": "Primary Outside outbound corridor via Pacific Northwest."
      },
      {
        "label": "Anchorage ↔ Fairbanks",
        "href": "/local-movers/alaska/fairbanks-north-star",
        "origins": "Southcentral / Interior",
        "transit": "Parks / Richardson highway corridors",
        "planningNote": "Weather windows matter in winter.",
        "note": "Major in-state long-haul corridor."
      }
    ],
    "inbound": [
      {
        "label": "Lower 48 → Alaska",
        "href": "/local-movers/alaska/anchorage",
        "origins": "WA, CA, TX, OR",
        "transit": "Marine + local delivery",
        "planningNote": "High-volume inbound into Anchorage.",
        "note": "Confirm interstate FMCSA authority."
      },
      {
        "label": "Moving to Anchorage Municipality",
        "href": "/local-movers/alaska/anchorage",
        "note": "Multi-unit winters and dense urban staging."
      },
      {
        "label": "Moving to Matanuska-Susitna Borough",
        "href": "/local-movers/alaska/matanuska-susitna",
        "note": "Growth suburbs and long driveway access."
      }
    ]
  },
  "challenges": {
    "title": "Alaska-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Alaska moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Extreme winter access",
        "detail": "Ice, snow, and cold can shut down driveway access and slow crews. Build large weather buffers October–April."
      },
      {
        "title": "Ferry and air logistics",
        "detail": "Southeast and Bush communities may depend on marine or air freight. Confirm schedules before booking."
      },
      {
        "title": "Limited state HHG permit regime",
        "detail": "Without a dedicated HHG license lookup, demand insurance certificates, written estimates, and FMCSA checks for Outside moves."
      },
      {
        "title": "Long empty miles",
        "detail": "Anchorage–Fairbanks and remote community jobs create expensive empty miles. Get inventory-based written estimates."
      },
      {
        "title": "Outside interstate authority",
        "detail": "Moves to or from the lower 48 need active FMCSA authority even when booked with a local Alaska brand."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Alaska moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Alaska local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Alaska movers need a special household goods license?",
      "answer": "Alaska generally does not require a special state-issued household-goods permit for pure intrastate movers. Businesses still need an Alaska business license, and Outside/interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify an Alaska mover?",
      "answer": "Request business license details, insurance certificates, and written estimates. For Outside/interstate legs, verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Anchorage move cost?",
      "answer": "Planning ranges often fall around $600–$2,800+ for a studio/1BR and more for larger homes, with season and winter access driving the spread. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is an Anchorage-to-Fairbanks move interstate?",
      "answer": "No — both ends are in Alaska. Focus on weather windows, packing, and inventory-based written estimates for the long haul."
    },
    {
      "question": "When is peak moving season in Alaska?",
      "answer": "Statewide peak is typically May–September. Winter weather can force flexible dates for much of the rest of the year."
    },
    {
      "question": "Does a Seattle-to-Anchorage move need FMCSA authority?",
      "answer": "Yes. Moves between Alaska and the lower 48 are interstate. Confirm active FMCSA operating authority and a USDOT number."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "Borough guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
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
        "label": "Alaska business licensing",
        "href": "https://www.commerce.alaska.gov/web/cbpl/BusinessLicensing.aspx"
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
