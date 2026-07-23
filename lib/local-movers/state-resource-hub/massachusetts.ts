import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 4):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const massachusettsStateResourceHub: StateResourceHubPack = {
  "stateSlug": "massachusetts",
  "stateCode": "MA",
  "h1": "Massachusetts Moving Resource Hub: Costs, DPU Certificates & 14 County Guides",
  "metaTitle": "Massachusetts Movers Guide 2026 — Costs, DPU Certificates & 14 County Guides",
  "metaDescription": "Plan a move within, to, or from Massachusetts. Compare local and intrastate costs, verify DPU household goods operating certificates, browse county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Massachusetts moves in 2026 — typical costs, DPU vs FMCSA rules, Boston-to-Berkshires regional guides, and tools to compare licensed movers without paid placements.",
  "trustBar": [
    "14 County Guides",
    "Verified Movers",
    "MA DPU & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Massachusetts",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Massachusetts",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Massachusetts",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Massachusetts markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Massachusetts Moving Cost",
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
    "title": "Why moving in Massachusetts is different",
    "paragraphs": [
      "Massachusetts is not one moving market. Boston triple-deckers and street permits, Cambridge and Somerville multi-unit elevators, Route 128 suburban HOAs, Cape Cod ferry and seasonal congestion, and Berkshire mountain approaches produce different access and labor profiles under one state name.",
      "Intrastate household goods movers must hold a current Department of Public Utilities (DPU) operating certificate. Interstate jobs need FMCSA authority. Winter weather, college lease peaks, and narrow colonial streets are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Massachusetts moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Massachusetts local and intrastate patterns; they are not bids. Always compare written estimates from DPU-licensed movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Boston studio / 1BR",
        "value": "$700–$2,900+",
        "note": "Stairs, elevators, and street permits dominate"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$2,000–$6,500+",
        "note": "Route 128 HOAs common"
      },
      {
        "label": "Intrastate corridor (e.g. Boston ↔ Springfield)",
        "value": "$2,000–$6,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "College Aug 31 / Sept 1 peaks are intense"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · NH · ME · NY · NC",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "14",
        "note": "Greater Boston emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Massachusetts moving regulations & consumer protection",
    "intro": "Massachusetts requires household goods moving companies operating within the state to hold a current Department of Public Utilities (DPU) operating certificate. Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Massachusetts)",
      "body": "If origin or destination is outside Massachusetts, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A Massachusetts DPU certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Massachusetts)",
      "body": "DPU’s Transportation Oversight Division regulates companies that move household goods within Massachusetts. Consumers should confirm an up-to-date DPU operating certificate number and ensure the bill of lading includes the company name, address, DPU license number, and phone."
    },
    "verifySteps": [
      "Classify the job: entirely in Massachusetts (DPU) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm the company has a current DPU operating certificate (Mass.gov licensed movers resources).",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Before signing, verify the bill of lading lists DPU license number and company contact details.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "DPU operating certificate",
        "detail": "All household moving companies in Massachusetts must be licensed by the DPU to operate in-state and are subject to state laws and Department rules."
      },
      {
        "title": "Bill of lading requirements",
        "detail": "State consumer guidance expects the bill of lading to include the mover’s name, address, DPU license number, and telephone number."
      },
      {
        "title": "Tariff and insurance filings",
        "detail": "Licensed movers file tariffs and insurance documentation as part of DPU household goods authorization — ask for written rates and coverage clarity."
      }
    ],
    "officialLinks": [
      {
        "label": "Mass.gov — Moving within Massachusetts",
        "href": "https://www.mass.gov/guides/moving-within-massachusetts",
        "external": true
      },
      {
        "label": "Mass.gov — Moving companies regulated by DPU",
        "href": "https://www.mass.gov/info-details/moving-companies-regulated-by-the-department-of-public-utilities-dpu",
        "external": true
      },
      {
        "label": "Mass.gov — Apply as a household goods mover",
        "href": "https://www.mass.gov/how-to/apply-to-be-a-household-goods-mover-in-massachusetts",
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
    "disclaimer": "Licensing rules and directories can change. Always verify current DPU certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "greater-boston",
      "name": "Greater Boston",
      "shortName": "Greater Boston",
      "blurb": "Suffolk, Middlesex, Norfolk, and Essex with triple-deckers, elevators, street permits, and dense suburbs.",
      "challenges": [
        "Street permits and tight staging",
        "Stairs, elevators, and co-op boards"
      ],
      "countySlugs": [
        "suffolk",
        "middlesex",
        "norfolk",
        "essex"
      ],
      "ctaLabel": "Explore Greater Boston"
    },
    {
      "id": "southeast-cape",
      "name": "Southeast & Cape Cod",
      "shortName": "Southeast / Cape",
      "blurb": "Plymouth, Bristol, Barnstable, Dukes, and Nantucket with seasonal congestion and island logistics.",
      "challenges": [
        "Cape summer traffic and ferry timing",
        "Confirm island coverage early"
      ],
      "countySlugs": [
        "plymouth",
        "bristol",
        "barnstable",
        "dukes",
        "nantucket"
      ],
      "ctaLabel": "Explore Southeast / Cape"
    },
    {
      "id": "central-ma",
      "name": "Central Massachusetts",
      "shortName": "Central MA",
      "blurb": "Worcester County corridors with mixed urban cores and suburban HOAs between Boston and the west.",
      "challenges": [
        "I-90 / I-290 congestion windows",
        "Mixed multi-unit and suburban access"
      ],
      "countySlugs": [
        "worcester"
      ],
      "ctaLabel": "Explore Central Massachusetts"
    },
    {
      "id": "western-ma",
      "name": "Western Massachusetts",
      "shortName": "Western MA",
      "blurb": "Springfield metro, Pioneer Valley colleges, and Berkshire mountain approaches.",
      "challenges": [
        "Hill driveways and winter weather",
        "College lease-cycle peaks"
      ],
      "countySlugs": [
        "hampden",
        "hampshire",
        "franklin",
        "berkshire"
      ],
      "ctaLabel": "Explore Western Massachusetts"
    }
  ],
  "costs": {
    "title": "Massachusetts moving costs",
    "intro": "Massachusetts pricing reflects Boston labor markets, multi-unit access, street permits, college peaks, and winter weather. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Massachusetts moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Massachusetts local and intrastate patterns: home size, distance, stairs/elevators, parking permits, HOAs, seasonality, and regional labor. Actual bids vary. Always compare written estimates from DPU-licensed movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Boston studio / 1BR",
        "value": "$700–$2,900+",
        "note": "Stairs and permits dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,900–$5,500+",
        "note": "HOAs common outside the core"
      },
      {
        "label": "Intrastate mid-size (e.g. Boston ↔ Worcester)",
        "value": "$1,900–$5,500+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Boston ↔ Berkshires or Cape)",
        "value": "$2,400–$7,500+",
        "note": "Seasonal and island logistics push the top"
      },
      {
        "label": "Typical 2–3 person crew (Greater Boston)",
        "value": "$150–$280+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Triple-decker stairs and long carries dominate Boston jobs.",
      "Street parking permits can add time and fees.",
      "College move-in/out compresses crews in late August.",
      "Cape and island seasons constrain truck timing.",
      "Winter ice and snow force flexible dates."
    ]
  },
  "routes": {
    "title": "Popular Massachusetts moving routes",
    "intro": "Massachusetts sees strong outbound Sun Belt flows, constant short interstate hops into New Hampshire, Maine, Rhode Island, and New York, and large Boston internal churn. Interstate jobs need FMCSA authority; in-state corridors need DPU-licensed movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Massachusetts → Florida",
        "href": "/moving-to/florida",
        "origins": "Greater Boston, Southeast MA",
        "transit": "Multi-day I-95",
        "planningNote": "Book early for winter arrivals.",
        "note": "High-volume Northeast-to-Florida corridor."
      },
      {
        "label": "Massachusetts → New Hampshire / Maine",
        "href": "/local-movers/new-hampshire",
        "origins": "Essex, Middlesex, Worcester",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Common short cross-border metro moves."
      },
      {
        "label": "Massachusetts → Carolinas",
        "href": "/local-movers/north-carolina",
        "origins": "Greater Boston",
        "transit": "Multi-day I-95",
        "planningNote": "HOAs at destination common.",
        "note": "Popular lifestyle outbound destinations."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Suffolk County (Boston)",
        "href": "/local-movers/massachusetts/suffolk",
        "note": "Street permits, stairs, and dense multi-unit access."
      },
      {
        "label": "Moving to Middlesex County",
        "href": "/local-movers/massachusetts/middlesex",
        "note": "Cambridge–Somerville multi-unit and suburban mix."
      },
      {
        "label": "Moving to Norfolk County",
        "href": "/local-movers/massachusetts/norfolk",
        "note": "South-of-Boston suburbs and HOA communities."
      }
    ]
  },
  "challenges": {
    "title": "Massachusetts-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Massachusetts moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Triple-deckers and narrow streets",
        "detail": "Boston-area staging often means long carries, limited truck length, and resident parking rules. Share approach photos early."
      },
      {
        "title": "College lease peaks",
        "detail": "Late August demand spikes around student turnovers. Book weeks earlier than a typical civilian calendar."
      },
      {
        "title": "Cape and island logistics",
        "detail": "Ferry reservations, bridge traffic, and seasonal bans change truck plans. Confirm coverage for Dukes and Nantucket early."
      },
      {
        "title": "Winter weather",
        "detail": "Ice and snow can close driveways and slow crews. Build weather buffers November–March."
      },
      {
        "title": "DPU certificate verification",
        "detail": "Confirm the exact legal name has a current Massachusetts DPU operating certificate before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Massachusetts moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Massachusetts local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Massachusetts movers need a state license?",
      "answer": "Yes. Household goods movers operating within Massachusetts must be licensed by the Department of Public Utilities (DPU). Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a Massachusetts mover?",
      "answer": "Confirm a current DPU operating certificate for the legal name on your estimate using Mass.gov DPU mover resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Boston move cost?",
      "answer": "Planning ranges often fall around $700–$2,900+ for a studio/1BR and more for larger homes, driven by stairs, elevators, and permits. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Boston-to-Worcester move intrastate?",
      "answer": "Yes — both ends are in Massachusetts, so you generally need a DPU-licensed household goods mover."
    },
    {
      "question": "When is peak moving season in Massachusetts?",
      "answer": "Statewide peak is typically May–September, with especially intense demand around college move dates in late August."
    },
    {
      "question": "Does a move from Boston to New Hampshire need FMCSA authority?",
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
        "label": "Mass.gov — Moving within Massachusetts",
        "href": "https://www.mass.gov/guides/moving-within-massachusetts"
      },
      {
        "label": "Mass.gov — DPU-regulated movers",
        "href": "https://www.mass.gov/info-details/moving-companies-regulated-by-the-department-of-public-utilities-dpu"
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
