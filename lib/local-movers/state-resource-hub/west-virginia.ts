import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 8):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const westVirginiaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "west-virginia",
  "stateCode": "WV",
  "h1": "West Virginia Moving Resource Hub: Costs, PSC Authority & 55 County Guides",
  "metaTitle": "West Virginia Movers Guide 2026 — Costs, PSC Certificates & 55 County Guides",
  "metaDescription": "Plan a move within, to, or from West Virginia. Compare local and intrastate costs, understand WV Public Service Commission motor carrier certificates for household goods, browse 55 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for West Virginia moves in 2026 — typical costs, PSC vs FMCSA rules, Charleston-to-Eastern Panhandle regional guides, and tools to compare authorized movers without paid placements.",
  "trustBar": [
    "55 County Guides",
    "Verified Movers",
    "WV PSC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within West Virginia",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To West Virginia",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From West Virginia",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how West Virginia markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My West Virginia Moving Cost",
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
    "title": "Why moving in West Virginia is different",
    "paragraphs": [
      "West Virginia is not one moving market. Charleston valley logistics, Eastern Panhandle DC-adjacent growth, Morgantown campus peaks, Northern Panhandle Ohio River stock, and southern coalfield mountain access produce different labor profiles under one state name.",
      "Household goods common carriers generally need Certificate of Convenience and Necessity authority through the Public Service Commission of West Virginia Motor Carrier Section. Interstate jobs need FMCSA authority. Steep driveways, narrow mountain roads, and winter ice are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "West Virginia moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical West Virginia local and intrastate patterns; they are not bids. Always compare written estimates from PSC-authorized movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Charleston / Morgantown studio / 1BR",
        "value": "$400–$1,900+",
        "note": "Stairs and hill access matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,400–$4,500+",
        "note": "Hills and long drives common"
      },
      {
        "label": "Intrastate corridor (e.g. Charleston ↔ Morgantown)",
        "value": "$1,600–$5,200+",
        "note": "Mountain roads and season matter"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Winter ice forces flexible dates"
      },
      {
        "label": "Top outbound destinations",
        "value": "OH · VA · NC · FL · PA · KY",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "55",
        "note": "Kanawha Valley and Panhandles emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "West Virginia moving regulations & consumer protection",
    "intro": "West Virginia generally requires common carriers of household goods to obtain Certificate of Convenience and Necessity authority through the Public Service Commission Motor Carrier Section. Match authority to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside West Virginia)",
      "body": "If origin or destination is outside West Virginia, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. A WV PSC household goods certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within West Virginia)",
      "body": "PSC Motor Carrier dockets and certificates authorize transportation of household goods between points in West Virginia. Applicants file for Certificate of Convenience and Necessity authority with the Motor Carrier Section. Consumers should confirm active certificate status and get written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in West Virginia (PSC certificate) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm PSC Motor Carrier household goods certificate authority for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates and share photos of steep or narrow access early.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "PSC certificate of convenience and necessity",
        "detail": "West Virginia PSC Motor Carrier frameworks authorize common carriers of household goods through certificate processes administered by the Commission."
      },
      {
        "title": "Motor Carrier Section applications",
        "detail": "Applicants complete Certificate of Convenience and Necessity applications with the Motor Carrier Section for regulated for-hire operations."
      },
      {
        "title": "Written estimates",
        "detail": "Insist on written estimates and clarity on hills, long carries, stairs, and packing before signing."
      }
    ],
    "officialLinks": [
      {
        "label": "Public Service Commission of West Virginia",
        "href": "http://www.psc.state.wv.us/",
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
    "disclaimer": "Licensing rules and docket tools can change. Always verify current PSC certificate status or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "northern-panhandle",
      "name": "Northern Panhandle",
      "shortName": "Northern Panhandle",
      "blurb": "Wheeling and Ohio River counties with industrial stock and short OH/PA hops.",
      "challenges": [
        "Short OH/PA hops need FMCSA authority",
        "Older multi-story stock and hills"
      ],
      "countySlugs": [
        "ohio",
        "brooke",
        "hancock",
        "marshall",
        "wetzel",
        "tyler"
      ],
      "ctaLabel": "Explore Northern Panhandle"
    },
    {
      "id": "eastern-panhandle",
      "name": "Eastern Panhandle",
      "shortName": "Eastern Panhandle",
      "blurb": "Martinsburg, Charles Town, and eastern growth corridors with DC-adjacent patterns.",
      "challenges": [
        "Growth-suburb HOA calendars",
        "I-81 corridor congestion"
      ],
      "countySlugs": [
        "berkeley",
        "jefferson",
        "morgan",
        "hampshire",
        "hardy",
        "mineral",
        "grant",
        "pendleton"
      ],
      "ctaLabel": "Explore Eastern Panhandle"
    },
    {
      "id": "north-central",
      "name": "North-Central West Virginia",
      "shortName": "North-Central",
      "blurb": "Morgantown campus peaks, Clarksburg, and north-central mountain counties.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Hill driveways and winter ice"
      ],
      "countySlugs": [
        "monongalia",
        "marion",
        "harrison",
        "taylor",
        "preston",
        "tucker",
        "randolph",
        "barbour",
        "upshur",
        "lewis",
        "doddridge",
        "ritchie",
        "gilmer",
        "braxton",
        "webster"
      ],
      "ctaLabel": "Explore North-Central"
    },
    {
      "id": "kanawha-valley",
      "name": "Kanawha Valley & Mid-Ohio Valley",
      "shortName": "Kanawha / Mid-Ohio",
      "blurb": "Charleston, Huntington, Parkersburg approaches with river valleys and mixed suburbs.",
      "challenges": [
        "Valley fog and winter ice",
        "River-city staging constraints"
      ],
      "countySlugs": [
        "kanawha",
        "putnam",
        "cabell",
        "wayne",
        "lincoln",
        "boone",
        "logan",
        "mingo",
        "clay",
        "roane",
        "jackson",
        "mason",
        "wirt",
        "wood",
        "pleasants",
        "calhoun"
      ],
      "ctaLabel": "Explore Kanawha / Mid-Ohio Valley"
    },
    {
      "id": "southern-wv",
      "name": "Southern West Virginia",
      "shortName": "Southern WV",
      "blurb": "Beckley, Bluefield, and southern mountain counties with steep access and longer hauls.",
      "challenges": [
        "Steep mountain driveways",
        "Confirm mover coverage for remote addresses"
      ],
      "countySlugs": [
        "raleigh",
        "fayette",
        "nicholas",
        "greenbrier",
        "summers",
        "monroe",
        "mercer",
        "wyoming",
        "mcdowell",
        "pocahontas"
      ],
      "ctaLabel": "Explore Southern West Virginia"
    }
  ],
  "costs": {
    "title": "West Virginia moving costs",
    "intro": "West Virginia pricing reflects mountain access, hills, thinner rural coverage, and river-valley logistics. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate West Virginia moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical West Virginia local and intrastate patterns: home size, distance, hills, stairs, parking, winter weather, and regional labor. Actual bids vary. Always compare written estimates from PSC-authorized movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Charleston / Morgantown studio / 1BR",
        "value": "$400–$1,900+",
        "note": "Stairs and hills dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,400–$4,200+",
        "note": "Long driveways common"
      },
      {
        "label": "Intrastate mid-size (e.g. Charleston ↔ Huntington)",
        "value": "$1,500–$4,800+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Martinsburg ↔ Huntington)",
        "value": "$2,000–$6,500+",
        "note": "Mountain roads push hours"
      },
      {
        "label": "Typical 2–3 person crew (major markets)",
        "value": "$100–$190+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Steep driveways may require smaller trucks or shuttle strategies.",
      "Winter ice on mountain roads forces flexible dates.",
      "Rural southern and mountain counties have thinner mover density.",
      "Eastern Panhandle growth creates HOA and inbound pressure.",
      "Short hops into OH, VA, PA, KY, or MD are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular West Virginia moving routes",
    "intro": "West Virginia sits between Midwest and Mid-Atlantic corridors with strong Eastern Panhandle growth and short interstate hops into Ohio, Virginia, and Pennsylvania. Interstate jobs need FMCSA authority; in-state corridors need PSC-authorized movers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "West Virginia → Carolinas / Florida",
        "href": "/local-movers/north-carolina",
        "origins": "Eastern Panhandle, Kanawha Valley",
        "transit": "I-81 / I-77 multi-day",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "Popular lifestyle outbound corridors."
      },
      {
        "label": "West Virginia → Ohio / Pennsylvania / Virginia",
        "href": "/local-movers/ohio",
        "origins": "Northern and Eastern Panhandles",
        "transit": "Often same-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      },
      {
        "label": "West Virginia → Kentucky / Tennessee",
        "href": "/local-movers/kentucky",
        "origins": "Southern and western WV",
        "transit": "Mountain multi-day or next-day",
        "planningNote": "Weather windows matter.",
        "note": "Common job-driven regional hops."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Kanawha County (Charleston)",
        "href": "/local-movers/west-virginia/kanawha",
        "note": "Valley logistics and mixed multi-story stock."
      },
      {
        "label": "Moving to Berkeley County",
        "href": "/local-movers/west-virginia/berkeley",
        "note": "Eastern Panhandle growth corridors."
      },
      {
        "label": "Moving to Monongalia County (Morgantown)",
        "href": "/local-movers/west-virginia/monongalia",
        "note": "Campus peaks and hill access."
      }
    ]
  },
  "challenges": {
    "title": "West Virginia-specific moving challenges & tips",
    "intro": "These issues show up constantly on real West Virginia moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Steep driveways and mountain roads",
        "detail": "Many homes need smaller trucks or shuttle strategies. Share GPS pins and approach photos early."
      },
      {
        "title": "Winter ice",
        "detail": "Mountain routes can ice over for days. Build weather buffers November–March."
      },
      {
        "title": "Short interstate panhandle hops",
        "detail": "Jobs into Ohio, Pennsylvania, Maryland, or Virginia are interstate even if short. Confirm FMCSA authority before deposits."
      },
      {
        "title": "Rural coverage gaps",
        "detail": "Southern and mountain counties may have thinner mover density. Confirm coverage early."
      },
      {
        "title": "PSC certificate verification",
        "detail": "Confirm the exact legal name holds WV PSC household goods certificate authority before deposits on pure in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate West Virginia moves."
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
      "description": "Interstate-ready planning checklist you can adapt for West Virginia local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do West Virginia movers need a PSC certificate?",
      "answer": "Yes. Common carriers of household goods generally need Certificate of Convenience and Necessity authority through the Public Service Commission Motor Carrier Section. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify a West Virginia mover?",
      "answer": "Confirm PSC Motor Carrier household goods certificate status for the legal name on your estimate. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Charleston or Morgantown move cost?",
      "answer": "Planning ranges often fall around $400–$1,900+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Charleston-to-Morgantown move intrastate?",
      "answer": "Yes — both ends are in West Virginia, so you generally need a PSC-authorized household goods carrier."
    },
    {
      "question": "When is peak moving season in West Virginia?",
      "answer": "Statewide peak is typically May–September. Winter ice can force flexible dates even outside peak."
    },
    {
      "question": "Does a Weirton-to-Steubenville move need FMCSA authority?",
      "answer": "Yes. Crossing into Ohio is interstate even for short hops. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "Public Service Commission of West Virginia",
        "href": "http://www.psc.state.wv.us/"
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
