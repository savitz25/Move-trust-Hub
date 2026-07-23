import type { StateResourceHubPack } from '@/lib/local-movers/state-resource-hub/types';

/**
 * Research brief (Wave 5):
 * - Regulator: see pack.regulations + trust.sources
 * - Regions: every curated county assigned once (validated at generate time)
 * - Migration profile: outbound_dominant
 * - Regulation mode: strong_state_regulator
 */
export const alabamaStateResourceHub: StateResourceHubPack = {
  "stateSlug": "alabama",
  "stateCode": "AL",
  "h1": "Alabama Moving Resource Hub: Costs, APSC Certificates & 67 County Guides",
  "metaTitle": "Alabama Movers Guide 2026 — Costs, APSC HHG Certificates & 67 County Guides",
  "metaDescription": "Plan a move within, to, or from Alabama. Compare local and intrastate costs, verify Alabama PSC household goods certificates, browse 67 county guides, and use free tools — independent of mover lead fees.",
  "heroSubhead": "The independent planning hub for Alabama moves in 2026 — typical costs, APSC vs FMCSA rules, Birmingham-to-Gulf Coast regional guides, and tools to compare certificated movers without paid placements.",
  "trustBar": [
    "67 County Guides",
    "Verified Movers",
    "APSC & FMCSA Checked",
    "Updated 2026"
  ],
  "intents": [
    {
      "id": "within",
      "label": "Moving Within Alabama",
      "href": "#hub-regulations",
      "description": "Confirm in-state licensing rules, then compare local costs and open the counties you will use."
    },
    {
      "id": "to",
      "label": "Moving To Alabama",
      "href": "#hub-regions",
      "description": "Choose a region first, then a county guide for access, seasonality, and metro logistics."
    },
    {
      "id": "from",
      "label": "Moving From Alabama",
      "href": "#hub-routes",
      "description": "Review outbound corridors, confirm interstate FMCSA authority, and size inventory for the haul."
    },
    {
      "id": "unsure",
      "label": "Not Sure Yet",
      "href": "#hub-why-different",
      "description": "Start with how Alabama markets differ, then use the calculator and map to narrow your plan."
    }
  ],
  "primaryCta": {
    "label": "Calculate My Alabama Moving Cost",
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
    "title": "Why moving in Alabama is different",
    "paragraphs": [
      "Alabama is not one moving market. Birmingham multi-story stock and hills, Huntsville growth corridors, Montgomery capital logistics, Mobile humidity and port traffic, and Gulf Coast vacation-home peaks produce different access and labor profiles under one state name.",
      "Intrastate household goods carriers need an Alabama Public Service Commission (APSC) certificate or permit for for-hire transportation between points in Alabama. Interstate jobs need FMCSA authority. Summer heat, college lease peaks, and tornado-season weather are planning inputs — then open the region and county that match your addresses."
    ]
  },
  "snapshot": {
    "title": "Alabama moving snapshot",
    "methodology": "Snapshot figures are planning orientation only. Cost bands reflect typical Alabama local and intrastate patterns; they are not bids. Always compare written estimates from APSC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work.",
    "stats": [
      {
        "label": "Typical Birmingham studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Stairs and heat matter"
      },
      {
        "label": "Typical suburban 3–4 BR",
        "value": "$1,500–$4,800+",
        "note": "HOAs in growth suburbs"
      },
      {
        "label": "Intrastate corridor (e.g. Birmingham ↔ Mobile)",
        "value": "$1,800–$5,500+",
        "note": "Season and packing drive the spread"
      },
      {
        "label": "Peak season",
        "value": "May–September",
        "note": "Heat and humidity affect productivity"
      },
      {
        "label": "Top outbound destinations",
        "value": "FL · TX · GA · TN · NC",
        "note": "Interstate — confirm FMCSA authority"
      },
      {
        "label": "County guides",
        "value": "67",
        "note": "Birmingham and Huntsville emphasized"
      }
    ]
  },
  "regulations": {
    "mode": "strong_state_regulator",
    "title": "Alabama moving regulations & consumer protection",
    "intro": "Alabama requires an APSC certificate or permit when household goods are transported by motor vehicle for compensation from one point in Alabama to another (unless exempted by law). Match the certificate to the job before you pay a deposit.",
    "interstate": {
      "title": "Interstate (any leg outside Alabama)",
      "body": "If origin or destination is outside Alabama, the carrier generally needs active FMCSA operating authority and a USDOT number. Verify on FMCSA SAFER. An APSC household goods certificate alone does not authorize interstate delivery."
    },
    "intrastate": {
      "title": "Intrastate (entirely within Alabama)",
      "body": "APSC regulates intrastate motor carriers of household goods. Carriers file Form 14H applications, maintain cargo insurance, and keep approved tariffs on file. Household goods carriers also file annual reports. Consumers should confirm active authority and written estimates before hiring."
    },
    "verifySteps": [
      "Classify the job: entirely in Alabama (APSC) vs any out-of-state leg (FMCSA / USDOT).",
      "Copy the exact legal name from the written estimate.",
      "Intrastate: confirm APSC household goods certificate/permit for the company.",
      "Interstate: look up USDOT / MC on FMCSA SAFER.",
      "Get written estimates and clarity on stairs, long carries, and packing.",
      "Avoid large cash deposits to unverified operators."
    ],
    "protections": [
      {
        "title": "APSC certificate or permit",
        "detail": "An APSC certificate or permit is required for for-hire household goods transportation between points in Alabama unless exempted by law."
      },
      {
        "title": "Cargo insurance and tariffs",
        "detail": "Regulated household goods carriers must maintain cargo insurance and have approved tariffs on file with the Commission."
      },
      {
        "title": "Annual reporting",
        "detail": "Household goods carriers are required to file annual reports with APSC — a marker of ongoing regulated status."
      }
    ],
    "officialLinks": [
      {
        "label": "APSC — Motor carrier applications & forms",
        "href": "https://psc.alabama.gov/motor-carrier-applications-forms/",
        "external": true
      },
      {
        "label": "APSC — Motor Carrier Section",
        "href": "https://psc.alabama.gov/motor-carrier-section/",
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
    "disclaimer": "Licensing rules and forms can change. Always verify current APSC authority or FMCSA authority for the company named on your estimate. This page is educational, not legal advice."
  },
  "regions": [
    {
      "id": "birmingham-central",
      "name": "Birmingham & Central Alabama",
      "shortName": "Birmingham / Central",
      "blurb": "Jefferson, Shelby, and central counties with hills, multi-story stock, and growth suburbs.",
      "challenges": [
        "Hill access and older multi-story homes",
        "HOA windows in Shelby growth corridors"
      ],
      "countySlugs": [
        "jefferson",
        "shelby",
        "st-clair",
        "blount",
        "walker",
        "bibb",
        "chilton",
        "talladega",
        "calhoun",
        "clay",
        "coosa",
        "tallapoosa",
        "cullman",
        "cleburne"
      ],
      "ctaLabel": "Explore Birmingham / Central"
    },
    {
      "id": "huntsville-north",
      "name": "Huntsville & North Alabama",
      "shortName": "North Alabama",
      "blurb": "Madison County growth, Tennessee Valley towns, and north Alabama industrial corridors.",
      "challenges": [
        "Growth-suburb HOA calendars",
        "Defense and aerospace employment cycles"
      ],
      "countySlugs": [
        "madison",
        "limestone",
        "morgan",
        "marshall",
        "jackson",
        "dekalb",
        "etowah",
        "cherokee",
        "lauderdale",
        "colbert",
        "franklin",
        "lawrence",
        "winston",
        "marion",
        "fayette",
        "lamar"
      ],
      "ctaLabel": "Explore North Alabama"
    },
    {
      "id": "montgomery-river",
      "name": "Montgomery & River Region",
      "shortName": "Montgomery / River",
      "blurb": "Capital-city logistics and Black Belt counties with longer rural approaches.",
      "challenges": [
        "Heat and humidity productivity loss",
        "Confirm coverage for rural addresses"
      ],
      "countySlugs": [
        "montgomery",
        "elmore",
        "autauga",
        "lowndes",
        "macon",
        "bullock",
        "pike",
        "crenshaw",
        "butler",
        "dallas",
        "perry",
        "wilcox",
        "hale",
        "greene",
        "sumter",
        "marengo"
      ],
      "ctaLabel": "Explore Montgomery / River"
    },
    {
      "id": "mobile-south",
      "name": "Mobile, Gulf Coast & Southeast",
      "shortName": "Mobile / South",
      "blurb": "Mobile, Baldwin, Wiregrass, and southeast counties with humidity, port traffic, and beach peaks.",
      "challenges": [
        "Hurricane-season date risk",
        "Beach and port congestion windows"
      ],
      "countySlugs": [
        "mobile",
        "baldwin",
        "washington",
        "clarke",
        "monroe",
        "conecuh",
        "escambia",
        "covington",
        "geneva",
        "houston",
        "dale",
        "henry",
        "barbour",
        "coffee",
        "russell",
        "lee",
        "chambers",
        "randolph",
        "choctaw"
      ],
      "ctaLabel": "Explore Mobile / South"
    },
    {
      "id": "tuscaloosa-west",
      "name": "Tuscaloosa & West Alabama",
      "shortName": "Tuscaloosa / West",
      "blurb": "Tuscaloosa campus peaks and western counties with mixed urban-rural access.",
      "challenges": [
        "Campus lease-cycle peaks",
        "Distance from major metro fleets"
      ],
      "countySlugs": [
        "tuscaloosa",
        "pickens"
      ],
      "ctaLabel": "Explore Tuscaloosa / West"
    }
  ],
  "costs": {
    "title": "Alabama moving costs",
    "intro": "Alabama pricing reflects Birmingham and Huntsville labor markets, heat, hills, and long north–south hauls. Use ranges for planning, then inventory your home in the calculator.",
    "methodology": {
      "title": "How we estimate Alabama moving costs",
      "lastReviewed": "2026-07-23",
      "body": "These ranges are planning estimates, not quotes. They combine typical Alabama local and intrastate patterns: home size, distance, stairs, parking, HOAs, heat, and regional labor. Actual bids vary under APSC tariff frameworks for certificated carriers. Always compare written estimates from APSC-certificated movers for in-state work and FMCSA-authorized carriers for interstate work."
    },
    "ranges": [
      {
        "label": "Birmingham studio / 1BR",
        "value": "$450–$2,000+",
        "note": "Stairs and heat dominate"
      },
      {
        "label": "Suburban 2–3BR house",
        "value": "$1,500–$4,500+",
        "note": "HOAs vary by suburb"
      },
      {
        "label": "Intrastate mid-size (e.g. Birmingham ↔ Huntsville)",
        "value": "$1,600–$5,000+",
        "note": "Season matters"
      },
      {
        "label": "Intrastate long (e.g. Huntsville ↔ Mobile)",
        "value": "$2,000–$6,500+",
        "note": "Full packing pushes the top"
      },
      {
        "label": "Typical 2–3 person crew (major metros)",
        "value": "$110–$200+/hr",
        "note": "Portal-to-portal"
      }
    ],
    "factors": [
      "Summer heat and humidity slow outdoor labor.",
      "Birmingham hills can require shuttle strategies.",
      "Gulf Coast hurricane season adds date risk.",
      "College towns compress August demand.",
      "Short hops into FL, GA, TN, or MS are interstate even when nearby."
    ]
  },
  "routes": {
    "title": "Popular Alabama moving routes",
    "intro": "Alabama sits between Southeast growth markets with strong outbound flows to Florida and Texas and large Birmingham–Huntsville–Mobile internal traffic. Interstate jobs need FMCSA authority; in-state corridors need APSC-certificated household goods carriers.",
    "migrationProfile": "outbound_dominant",
    "outbound": [
      {
        "label": "Alabama → Florida",
        "href": "/moving-to/florida",
        "origins": "Birmingham, Huntsville, Mobile",
        "transit": "Often next-day or multi-day I-10/I-65",
        "planningNote": "Confirm FMCSA authority end-to-end.",
        "note": "High-volume Southeast corridor."
      },
      {
        "label": "Alabama → Texas / Georgia",
        "href": "/local-movers/texas",
        "origins": "Statewide metros",
        "transit": "I-20 / I-85 multi-day",
        "planningNote": "HOAs at destination common in growth metros.",
        "note": "Popular job-driven outbound routes."
      },
      {
        "label": "Alabama → Tennessee",
        "href": "/local-movers/tennessee",
        "origins": "North Alabama",
        "transit": "Often same-day or next-day interstate",
        "planningNote": "Still interstate — confirm FMCSA authority.",
        "note": "Short cross-border metro moves are common."
      }
    ],
    "inbound": [
      {
        "label": "Moving to Jefferson County (Birmingham)",
        "href": "/local-movers/alabama/jefferson",
        "note": "Hills, multi-story stock, and suburban mix."
      },
      {
        "label": "Moving to Madison County (Huntsville)",
        "href": "/local-movers/alabama/madison",
        "note": "Growth suburbs and employment-driven inbound."
      },
      {
        "label": "Moving to Mobile County",
        "href": "/local-movers/alabama/mobile",
        "note": "Humidity, port traffic, and coastal access."
      }
    ]
  },
  "challenges": {
    "title": "Alabama-specific moving challenges & tips",
    "intro": "These issues show up constantly on real Alabama moves — not generic national checklist filler.",
    "items": [
      {
        "title": "Heat and humidity",
        "detail": "Summer outdoor labor slows quickly. Prefer early start times May–September."
      },
      {
        "title": "Birmingham hills",
        "detail": "Steep driveways may need smaller trucks or shuttles. Share approach photos early."
      },
      {
        "title": "Gulf hurricane season",
        "detail": "Coastal jobs can reschedule with little notice June–November. Keep flexible dates."
      },
      {
        "title": "College lease peaks",
        "detail": "Tuscaloosa and other campus markets compress August demand. Book early."
      },
      {
        "title": "APSC certificate verification",
        "detail": "Confirm the exact legal name holds active APSC household goods authority before deposits on in-state work."
      }
    ]
  },
  "tools": [
    {
      "label": "Free moving calculator",
      "href": "/moving-calculator",
      "description": "Inventory-based volume and cost planning for local, intrastate, or interstate Alabama moves."
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
      "description": "Interstate-ready planning checklist you can adapt for Alabama local and long moves."
    },
    {
      "label": "Packing checklist",
      "href": "/resources/packing-checklist",
      "description": "Room-by-room packing guidance before your crew arrival window."
    }
  ],
  "faq": [
    {
      "question": "Do Alabama movers need an APSC certificate?",
      "answer": "Yes. For-hire household goods transportation between points in Alabama generally requires an APSC certificate or permit. Interstate moves require FMCSA authority."
    },
    {
      "question": "How do I verify an Alabama mover?",
      "answer": "Confirm APSC household goods authority for the legal name on your estimate using Commission motor carrier resources. For out-of-state legs, also verify USDOT / MC on FMCSA SAFER."
    },
    {
      "question": "How much does a local Birmingham move cost?",
      "answer": "Planning ranges often fall around $450–$2,000+ for a studio/1BR and more for larger homes. Use the calculator, then compare written estimates."
    },
    {
      "question": "Is a Birmingham-to-Mobile move intrastate?",
      "answer": "Yes — both ends are in Alabama, so you generally need an APSC-certificated household goods carrier."
    },
    {
      "question": "When is peak moving season in Alabama?",
      "answer": "Statewide peak is typically May–September. Heat and humidity can affect summer productivity."
    },
    {
      "question": "Does a Huntsville-to-Nashville move need FMCSA authority?",
      "answer": "Yes. Crossing into Tennessee is interstate even for relatively short hauls. Confirm active FMCSA operating authority."
    }
  ],
  "trust": {
    "byline": "Move Trust Hub editorial research",
    "lastReviewed": "2026-07-23",
    "methodology": "County guides combine public registration checks, directory verification, and editorial research. Rankings and listings are independent — we do not accept lead fees or paid placement. Cost ranges are planning estimates, not live bids.",
    "independence": "Move Trust Hub is an independent research and directory resource. We are not a moving company and do not sell your lead to movers for a fee.",
    "sources": [
      {
        "label": "APSC — Motor carrier applications",
        "href": "https://psc.alabama.gov/motor-carrier-applications-forms/"
      },
      {
        "label": "APSC — Motor Carrier Section",
        "href": "https://psc.alabama.gov/motor-carrier-section/"
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
