import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 5):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: balanced
 * - Regulation mode: strong_state_regulator
 */
export const louisianaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "louisiana",
  "stateCode": "LA",
  "h1": "Louisiana Moving Resource Hub: Costs, LPSC Certificates & 64 Parish Guides",
  "metaTitle": "Louisiana Movers Guide 2026 — Costs, LPSC HHG Certificates & 64 Parish Guides",
  "metaDescription": "Plan a move within, to, or from Louisiana. Compare local and intrastate costs, verify LPSC household goods carrier certificates, browse 64 parish guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Louisiana moves in 2026 — typical costs, LPSC vs FMCSA rules, New Orleans-to-Shreveport regional guides, and tools to compare certificated movers without paid placements.",
  "trustBar": [
    "64 Parish Guides",
    "Verified Movers",
    "LPSC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Louisiana",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Louisiana",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Louisiana",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Louisiana markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Louisiana Moving Cost",
    "href": "/moving-calculator"
  },
  "secondaryCta": {
    "label": "Find & Compare Movers",
    "href": "/companies"
  },
  "tertiaryCta": {
    "label": "Explore Regions & Parishes",
    "href": "#hub-regions"
  },
  "whyDifferent": {
    "title": "Why moving in Louisiana is different",
    "paragraphs": [
      "Louisiana is not one moving market. New Orleans shotgun houses and flood-zone access, Baton Rouge capital logistics, Lafayette Acadiana culture corridors, Lake Charles industrial traffic, and Shreveport north Louisiana patterns produce different access and labor profiles under one state name.",
      "Intrastate household goods common carriers must hold a Louisiana Public Service Commission (LPSC) certificate. Carriers must advertise LPSC certificate numbers on estimates and provide written estimates (or written waivers) before service. Interstate jobs need FMCSA authority. Hurricane season, humidity, and raised-home access are planning inputs — then open the region and parish that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Louisiana moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Louisiana local and intrastate patterns; they are not bids. Always compare written estimates from LPSC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical New Orleans studio / 1BR",
        "value": "$500–$2,300+",
        "note": "Narrow streets, stairs, and humidity"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,600–$5,000+",
        "note": "HOAs and raised homes vary"
      },
      {
        "label": "Intrastate corridor (e.g. New Orleans ↔ Baton Rouge)",
        "value": "$1,700–$5,500+",
        "note": "I-10 timing and packing matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Hurricane season adds date risk"
      },
      {
        "label": "Top outbound destinations",
        "value": "TX · FL · MS · AR · GA",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "Parish guides",
        "value": "64",
        "note": "New Orleans and Baton Rouge emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Louisiana moving regulations & consumer protection",
    "intro": "Louisiana requires common carriers of household goods to obtain an LPSC certificate before operating intrastate. Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Louisiana)",
      "body": "If origin or destination is outside Louisiana, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An LPSC household goods certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Louisiana)",
      "body": "No motor carrier may operate as a common carrier of household goods without an LPSC certificate under R.S. 45:164 frameworks and Commission general orders. Carriers must maintain a permanent establishment in Louisiana, include LPSC certificate numbers on advertising and written estimates, and provide written estimates before service (or a written waiver signed by both parties)."
    },
    "verifySteps": [
      "Classify the job: entirely in Louisiana (LPSC) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name and LPSC certificate number from the written estimate.",
      "Intrastate: verify LPSC household goods carrier status for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Confirm you receive a written estimate (or signed written waiver) before any moving services begin.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "LPSC household goods certificate",
        "detail": "Louisiana law requires a Commission certificate for common carriers of household goods operating intrastate, with permanent establishment requirements for carriers serving Louisiana."
      },
      {
        "title": "Certificate number on estimates and ads",
        "detail": "LPSC general orders require household goods carriers to include legal/registered name, physical address, and LPSC certificate number in advertising, invoices, and written bids or estimates."
      },
      {
        "title": "Written estimate requirement",
        "detail": "Household goods carriers must provide customers a written estimate prior to conducting moving services, or obtain a written waiver signed by both parties."
      }
    ],
    "officialLinks": [
      {
        "label": "LPSC — Carrier household goods moving",
        "href": "https://www.lpsc.louisiana.gov/Carrier_HGM",
        "external": true
      },
      {
        "label": "LPSC — Motor carrier regulations & applications",
        "href": "https://lpsc.louisiana.gov/Carrier_Regs",
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
    "disclaimer": "Licensing rules and general orders can change. Always verify current LPSC certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "new-orleans-metro",
      "name": "New Orleans Metro",
      "shortName": "New Orleans Metro",
      "blurb": "Orleans, Jefferson, St. Tammany, and neighbors with historic access, flood-zone logistics, and Northshore suburbs.",
      "challenges": [
        "Narrow streets, stairs, and raised homes",
        "Hurricane-season date risk"
      ],
      "countySlugs": [
        "orleans",
        "jefferson",
        "st-bernard",
        "plaquemines",
        "st-tammany",
        "st-charles",
        "st-john-the-baptist",
        "st-james",
        "tangipahoa",
        "washington"
      ],
      "ctaLabel": "Explore New Orleans Metro"
    },
    {
      "id": "baton-rouge-capital",
      "name": "Baton Rouge & Capital Region",
      "shortName": "Baton Rouge / Capital",
      "blurb": "East Baton Rouge and surrounding parishes with capital-city traffic and mixed suburban stock.",
      "challenges": [
        "I-10 / I-12 congestion windows",
        "Heat and humidity productivity loss"
      ],
      "countySlugs": [
        "east-baton-rouge",
        "west-baton-rouge",
        "ascension",
        "livingston",
        "iberville",
        "pointe-coupee",
        "east-feliciana",
        "west-feliciana",
        "st-helena"
      ],
      "ctaLabel": "Explore Baton Rouge / Capital"
    },
    {
      "id": "acadiana-lafayette",
      "name": "Acadiana & Southwest",
      "shortName": "Acadiana / SW",
      "blurb": "Lafayette, Lake Charles approaches, and Acadiana parishes with industrial cycles and coastal humidity.",
      "challenges": [
        "Industrial traffic and plant-turnaround peaks",
        "Hurricane-season logistics"
      ],
      "countySlugs": [
        "lafayette",
        "acadia",
        "st-martin",
        "st-landry",
        "iberia",
        "vermilion",
        "evangeline",
        "st-mary",
        "assumption",
        "terrebonne",
        "lafourche",
        "calcasieu",
        "cameron",
        "jefferson-davis",
        "beauregard",
        "allen"
      ],
      "ctaLabel": "Explore Acadiana / Southwest"
    },
    {
      "id": "cenla",
      "name": "Central Louisiana (Cenla)",
      "shortName": "Cenla",
      "blurb": "Alexandria and central parishes with longer regional hauls between south and north metros.",
      "challenges": [
        "Distance from major metro fleets",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "rapides",
        "avoyelles",
        "grant",
        "la-salle",
        "winn",
        "natchitoches",
        "vernon",
        "sabine",
        "concordia",
        "catahoula"
      ],
      "ctaLabel": "Explore Cenla"
    },
    {
      "id": "north-louisiana",
      "name": "North Louisiana",
      "shortName": "North Louisiana",
      "blurb": "Shreveport–Bossier, Monroe, and north parishes with different weather and longer I-20 corridors.",
      "challenges": [
        "I-20 corridor distance",
        "Mix of urban and rural access"
      ],
      "countySlugs": [
        "caddo",
        "bossier",
        "webster",
        "claiborne",
        "bienville",
        "lincoln",
        "jackson",
        "ouachita",
        "morehouse",
        "union",
        "richland",
        "franklin",
        "west-carroll",
        "east-carroll",
        "madison",
        "tensas",
        "de-soto",
        "red-river",
        "caldwell"
      ],
      "ctaLabel": "Explore North Louisiana"
    }
  ],
  "costs": {
    "title": "Louisiana moving costs",
    "intro": "Louisiana pricing reflects New Orleans labor markets, humidity, raised-home access, and long I-10/I-49 hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Louisiana moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Louisiana local and intrastate patterns: home size, distance, stairs, parking, raised homes, humidity, hurricane-season risk, and regional labor. Actual bids vary. Always compare written estimates from LPSC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "New Orleans studio / 1BR",
        "value": "$500–$2,300+",
        "note": "Narrow streets and stairs dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,600–$4,800+",
        "note": "Raised homes and HOAs vary"
      },
      {
        "label": "Intrastate mid-size (e.g. New Orleans ↔ Baton Rouge)",
        "value": "$1,700–$5,000+",
        "note": "I-10 timing matters"
      },
      {
        "label": "Intrastate long (e.g. New Orleans ↔ Shreveport)",
        "value": "$2,200–$7,000+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2–3 person crew (New Orleans metro)",
        "value": "$115–$210+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Historic New Orleans streets constrain truck length and parking.",
      "Raised homes and long carries add labor time.",
      "Humidity and heat slow outdoor work in summer.",
      "Hurricane season can force last-minute reschedules.",
      "Short hops into Texas or Mississippi are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Louisiana moving routes",
    "intro": "Louisiana sees strong flows into and out of Texas, Florida, and Mississippi plus large New Orleans–Baton Rouge internal traffic. Interstate jobs need FMCSA authority; in-state corridors need LPSC-certificated household goods carriers.",
    "migrationProfile": "balanced",
    "outbound": [
      {
        "label": "Louisiana → Texas",
        "href": "/local-movers/texas",
        "origins": "New Orleans, Baton Rouge, Lake Charles, Shreveport",
        "transit": "I-10 / I-20 multi-day or same-day near border",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Highest-volume outbound corridor."
      },
      {
        "label": "Louisiana → Florida",
        "href": "/moving-to/florida",
        "origins": "South Louisiana metros",
        "transit": "I-10 multi-day",
        "planningNote": "Book early for winter arrivals.",
        "note": "Common lifestyle outbound route."
      },
      {
        "label": "Louisiana → Mississippi / Arkansas",
        "href": "/local-movers/mississippi",
        "origins": "North and southeast LA",
        "transit": "Often same-day interstate",
        "planningNote": "Confirm FMCSA authority even for short hops.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Orleans Parish (New Orleans)",
        "href": "/local-movers/louisiana/orleans",
        "note": "Historic access, stairs, and flood-zone logistics."
      },
      {
        "label": "Moving to East Baton Rouge Parish",
        "href": "/local-movers/louisiana/east-baton-rouge",
        "note": "Capital-city traffic and suburban mix."
      },
      {
        "label": "Moving to Jefferson Parish",
        "href": "/local-movers/louisiana/jefferson",
        "note": "Metro New Orleans suburbs and multi-unit stock."
      }
    ]
  },
  "challenges": {
    "title": "Louisiana-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Louisiana moves — not generic national checklist filler.",
    "items": [
      {
        "title": "New Orleans street access",
        "detail": "Narrow streets, limited truck length, and parking rules are common. Share approach photos and request smaller trucks when needed."
      },
      {
        "title": "Hurricane-season risk",
        "detail": "June–November storms can force reschedules statewide, especially on the coast. Keep flexible dates."
      },
      {
        "title": "Written estimate rules",
        "detail": "LPSC orders emphasize written estimates (or signed waivers) before service — do not start a move on a verbal quote alone."
      },
      {
        "title": "Raised homes and humidity",
        "detail": "Long stair carries and summer humidity add labor hours. Plan early start times May–September."
      },
      {
        "title": "LPSC certificate verification",
        "detail": "Confirm the exact legal name and LPSC certificate number before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Louisiana moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Louisiana local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Louisiana movers need an LPSC certificate?",
      "answer": "Yes. Common carriers of household goods operating within Louisiana generally need an LPSC certificate. Interstate moves require FMCSA authority."
    },
    {
      "question": "Must Louisiana movers put their certificate number on estimates?",
      "answer": "LPSC general orders require household goods carriers to include their legal/registered name, physical address, and LPSC certificate number on written bids or estimates and advertising."
    },
    {
      "question": "How much does a local New Orleans move cost?",
      "answer": "Planning ranges often fall around $500–$2,300+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a New Orleans-to-Baton Rouge move intrastate?",
      "answer": "Yes — both ends are in Louisiana, so you generally need an LPSC-certificated household goods carrier."
    },
    {
      "question": "When is peak moving season in Louisiana?",
      "answer": "Statewide peak is typically May–September. Hurricane season can add date risk for coastal and southern parishes."
    },
    {
      "question": "Does a Lake Charles-to-Houston move need FMCSA authority?",
      "answer": "Yes. Crossing into Texas is interstate even for relatively short hauls. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "Parish guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "LPSC — Household goods carriers",
        "href": "https://www.lpsc.louisiana.gov/Carrier_HGM"
      },
      {
        "label": "LPSC — Motor carrier regulations",
        "href": "https://lpsc.louisiana.gov/Carrier_Regs"
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
