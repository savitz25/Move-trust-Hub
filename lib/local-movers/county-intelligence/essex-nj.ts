import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Essex County, New Jersey moving intelligence.
 * Used by /local-movers/new-jersey/essex and the shared intelligence template.
 *
 * Differentiators vs Bergen / Hudson / generic North Jersey:
 * Newark as the largest NJ city and dense urban core, sharp contrast to
 * Montclair–South Orange–Maplewood–Short Hills affluence, extreme density
 * (parking/COI/elevators), and NYC-oriented commute relocation patterns —
 * not waterfront Hudson high-rises and not Bergen’s route-to-GW-Bridge profile.
 */
export const essexCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'essex',
  hubTitle: 'Essex County Moving Intelligence Hub',
  eyebrow: 'Essex County · North Jersey guide',
  h1: 'Moving in Essex County, NJ: Newark Core, Montclair & Inner-Suburb Zone Guide',
  heroOpener:
    'Essex County (~850,000 residents) is one of the densest counties in the United States — and one of the least interchangeable “local” markets in New Jersey. County seat Newark is the largest city in the state: multi-family walk-ups, high-rises, Ironbound mixed-use blocks, and wards with tight curb staging. Minutes west, Montclair, Glen Ridge, South Orange, Maplewood, Livingston, Millburn, and Short Hills flip the job to Victorian streets, tree canopies, high-value single-family inventories, and HOA or neighborhood rules. Garden State Parkway, I-280, Route 21, Route 24, and Route 10 turn short-looking locals into real portal-to-portal time. NYC-oriented households move between Manhattan/Brooklyn and Essex suburbs, or between Newark and the inner-ring towns, every week. This guide is for people actually moving in Essex — not generic North Jersey tips recycled from Bergen or Hudson.',
  heroCredibility:
    'Newark urban core · Affluent west suburbs · Extreme density · COI & elevators · Intrastate NJ · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Essex County different',
    intro:
      'These are the Essex-specific realities — Newark density vs. leafy inner suburbs, elevator/COI culture, and NYC-oriented relocation patterns — not generic New Jersey boilerplate.',
    bullets: [
      {
        title: 'Newark is the largest city in New Jersey — and a full urban job',
        detail:
          'Downtown, Ironbound, and the North/South/Central Wards mean multi-family buildings, freight elevators, Certificates of Insurance, reserved elevator windows, and curb space that disappears by mid-morning. A “Newark local” is not the same job as a Livingston cul-de-sac.',
      },
      {
        title: 'Extreme density rewrites parking and staging',
        detail:
          'Essex ranks among the densest U.S. counties. On-street parking is scarce in Newark and many older towns (East Orange, Orange, Belleville, Bloomfield). Temporary no-parking permits or municipal staging rules are common — plan truck length and permit lead time before move day.',
      },
      {
        title: 'Sharp urban core vs. affluent inner-suburb contrast',
        detail:
          'East of the Parkway you often face older multi-family stock and tight streets; west toward Montclair, South Orange, Maplewood, Glen Ridge, Livingston, Millburn, and Short Hills you face high-value contents, longer carries, narrow Victorian stairs, and stricter neighborhood expectations. Name both towns on the estimate.',
      },
      {
        title: 'NYC-oriented relocation and commuting patterns',
        detail:
          'Households move between New York City and Essex suburbs, or between Newark and Montclair/Maplewood for schools and space. Cross-Hudson timing, PATH/NJ Transit rhythms, and reverse-commute peaks affect truck windows even when both ends are in New Jersey.',
      },
      {
        title: 'COI, elevators, and building management are the default in multi-family',
        detail:
          'In Newark high-rises and many East Orange/Bloomfield multi-unit buildings, property managers require Certificates of Insurance, elevator padding, and reserved freight windows. Treat the building packet as part of the survey — not an afterthought.',
      },
      {
        title: 'Older housing stock: walk-ups, Victorians, and tight staircases',
        detail:
          'Pre-war apartments and Victorian homes across Montclair, Glen Ridge, and Maplewood often have narrow stairs, limited loading zones, and long carries from legal truck parking. Shuttle or smaller-truck strategies show up more often than flat suburban curb access.',
      },
      {
        title: 'Parkway, I-280, 21, 24, and 10 control the clock',
        detail:
          'Garden State Parkway, I-280, Route 21 (McCarter Highway), Route 24, and Route 10 are the county’s spines. Newark ↔ Short Hills or Ironbound ↔ Montclair can double travel time in 7–9 a.m. and 3–7 p.m. peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'New Jersey intrastate rules vs. interstate authority',
        detail:
          'Moves entirely within New Jersey are generally overseen under New Jersey household-goods / BPU frameworks for licensed carriers. Legs that cross into New York or other states need FMCSA interstate authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and value profile. Newark high-rise or Ironbound work, East Orange multi-family, Montclair Victorian streets, Maplewood–South Orange corridors, and Livingston–Short Hills single-family jobs are not interchangeable under one “Essex local” label.',
  zones: [
    {
      id: 'newark-core',
      name: 'Newark Urban Core',
      shortName: 'Newark Core',
      neighborhoods: [
        'Downtown Newark',
        'Ironbound',
        'North Ward',
        'South Ward',
        'Central Ward',
        'University Heights',
        'Branch Brook / Forest Hill edge',
      ],
      housingTypes:
        'High-rises and mid-rises, older multi-family and walk-ups, mixed-use Ironbound blocks, some single-family pockets in Forest Hill / North Ward',
      challenges: [
        'COI, elevator reservations, and building move windows almost always required in larger buildings',
        'Extremely limited curb staging — mid-morning spots vanish',
        'Municipal parking permits or temporary no-parking signs often needed for box trucks',
        'Ironbound narrow streets and commercial curb competition',
        'Route 21 / downtown congestion and event-day street closures',
      ],
      moverTips:
        'Get the building management packet early (COI limits, elevator hours, floor protection). Prefer mid-week morning load windows. Share photos of the loading dock or curb approach. For Ironbound, assume tight turns and short legal truck parking — smaller trucks or staggered loads beat a 26′ stuck on a one-way.',
      cityKeywords: [
        'newark',
        'ironbound',
        'forest hill',
        'university heights',
        'branch brook',
        'north ward',
        'south ward',
        'central ward',
      ],
    },
    {
      id: 'inner-ring',
      name: 'Immediate Inner Ring',
      shortName: 'Inner Ring',
      neighborhoods: [
        'East Orange',
        'Orange',
        'Irvington',
        'Belleville',
        'Vailsburg edge',
      ],
      housingTypes:
        'Dense multi-family, older walk-ups and garden apartments, mixed single-family on narrower lots, some mid-century stock',
      challenges: [
        'Limited on-street parking and tight curb cuts',
        'Elevator/COI rules in larger multi-unit buildings',
        'Older stairs and long carries from legal truck spots',
        'Cross-town traffic into Newark or toward the Parkway',
      ],
      moverTips:
        'Confirm exact city (East Orange vs. Orange vs. Irvington) — building rules differ. Reserve elevator time where multi-unit. Mid-week mornings reduce curb fights. Budget extra labor for walk-ups without freight elevators.',
      cityKeywords: [
        'east orange',
        'orange',
        'irvington',
        'belleville',
        'vailsburg',
      ],
    },
    {
      id: 'north-northwest',
      name: 'North / Northwest Suburbs',
      shortName: 'North / NW',
      neighborhoods: [
        'Bloomfield',
        'Nutley',
        'Belleville edge',
        'Glen Ridge north edge',
        'Brookdale area',
      ],
      housingTypes:
        'Older multi-family and duplex stock, mid-century single-family, some denser corridors near Bloomfield Ave and transit',
      challenges: [
        'Parkway access ramps and local arterial congestion',
        'Street parking competition near multi-family corridors',
        'Mix of walk-up apartments and SFH on the same route',
        'School-year end-of-month peaks',
      ],
      moverTips:
        'Clarify multi-family vs. single-family access on the survey. Bloomfield corridors can feel urban; Nutley more residential — truck size and carry distance change. Avoid Parkway peak merges when possible for portal-to-portal honesty.',
      cityKeywords: [
        'bloomfield',
        'nutley',
        'belleville',
        'brookdale',
        'glen ridge',
      ],
    },
    {
      id: 'west-affluent',
      name: 'West / Affluent Suburbs',
      shortName: 'West Affluent',
      neighborhoods: [
        'Montclair',
        'Glen Ridge',
        'Verona',
        'Cedar Grove',
        'Upper Montclair',
        'Watchung Plaza area',
      ],
      housingTypes:
        'Victorian and early-20th-century single-family, tree-lined streets, some multi-family near downtown Montclair, higher-value inventories',
      challenges: [
        'Narrow streets, canopy branches, and limited large-truck turnarounds',
        'Long carries from legal parking to Victorian porches and upper floors',
        'High-value contents and careful-handling expectations',
        'Downtown Montclair weekend congestion and staging limits',
        'Some HOA or condo association rules in multi-unit pockets',
      ],
      moverTips:
        'Assume access complexity until proven otherwise — send street and approach photos. Smaller trucks or shuttle strategies often beat forcing a full trailer onto a Montclair side street. Inventory art, antiques, and upper-floor furniture carefully. Weekday mornings beat Saturday downtown Montclair.',
      cityKeywords: [
        'montclair',
        'glen ridge',
        'verona',
        'cedar grove',
        'upper montclair',
        'watchung',
      ],
    },
    {
      id: 'maplewood-so',
      name: 'Southwest / Maplewood–South Orange Corridor',
      shortName: 'Maplewood–SO',
      neighborhoods: [
        'Maplewood',
        'South Orange',
        'Village centers',
        'Seton Hall edge',
        'Tuscan / Wyoming edges',
      ],
      housingTypes:
        'Older single-family, some multi-family near village cores and transit, denser lots near downtowns, higher-value family inventories',
      challenges: [
        'Village downtown parking and one-way patterns',
        'Narrow stairs in older homes',
        'School-calendar peaks (families time moves to June–August)',
        'Route 24 / Parkway access for longer Essex hops',
      ],
      moverTips:
        'Village centers pack up on Saturdays — prefer mid-week curb access. Confirm whether the address is South Orange Village or Maplewood for permit nuances. Family moves often need full packing days; book school-window Saturdays early.',
      cityKeywords: [
        'maplewood',
        'south orange',
        'seton hall',
        'tuscan',
        'wyoming',
      ],
    },
    {
      id: 'far-west',
      name: 'Far West / Livingston–Millburn–Short Hills',
      shortName: 'Far West',
      neighborhoods: [
        'Livingston',
        'Millburn',
        'Short Hills',
        'The Mall at Short Hills edge',
        'Route 10 / Eisenhower corridors',
      ],
      housingTypes:
        'Larger single-family homes, cul-de-sacs, higher-value contents, some multi-family and townhome communities with association rules',
      challenges: [
        'Longer carries on large lots and multi-story homes',
        'HOA or association move rules in some communities',
        'Route 24 / Route 10 / I-280 congestion into the rest of Essex',
        'High shipment values and white-glove expectations',
        'Retail-adjacent staging limits near Short Hills commercial nodes',
      ],
      moverTips:
        'Treat Far West as a high-value suburban profile: full inventory, valuation coverage discussion, and honest time for multi-story homes. Collect HOA packets where applicable. Mid-week mornings on Route 24 / I-280 beat weekend Mall traffic. Cross-zone pairs (Short Hills ↔ Newark) need portal-to-portal assumptions.',
      cityKeywords: [
        'livingston',
        'millburn',
        'short hills',
        'short hills mall',
        'eisenhower',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Essex County',
    intro:
      'Two “local” Essex moves of the same square footage can differ sharply depending on elevators and permits in Newark, long carries on Victorian streets, and whether the pair is Ironbound-to-downtown or Short Hills-to-Montclair across peak freeways.',
    drivers: [
      {
        title: 'Elevator reservations, COI & building soft costs',
        detail:
          'Newark high-rises and multi-family buildings often require COI, elevator padding, and fixed windows. Soft costs and forced weekday-only hours show up on the final bill even when distance is short.',
      },
      {
        title: 'Parking permits & curb staging in dense towns',
        detail:
          'Temporary no-parking signs and municipal permits for truck staging add lead time and fees in Newark and many older Essex towns. Failure to permit can mean double-parking risk or long carries from distant legal spots.',
      },
      {
        title: 'Long carries & stair density (Victorians / walk-ups)',
        detail:
          'Montclair, Glen Ridge, Maplewood, and pre-war walk-ups often need more labor minutes per item. Narrow stairs and tree-lined curb setbacks inflate hourly totals vs. open driveway suburbs.',
      },
      {
        title: 'Parkway / I-280 / Routes 21 · 24 · 10 congestion',
        detail:
          'Portal-to-portal time tracks the freeways and arterials. Newark ↔ Livingston or East Orange ↔ Short Hills can burn 45–90+ minutes each way at peak.',
      },
      {
        title: 'High-value western-suburb inventories',
        detail:
          'Montclair, South Orange, Maplewood, Livingston, Millburn, and Short Hills often involve higher-value contents and careful-handling expectations. Cheap released-value coverage is frequently inadequate.',
      },
      {
        title: 'NYC-related and multi-stop patterns',
        detail:
          'Jobs that book as “local Essex” sometimes include a Manhattan storage unit, Brooklyn origin, or a second stop in Hudson County. Interstate authority and extra stops must be in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,500+',
        note: 'Higher with elevators, permits, or Newark walk-ups',
      },
      {
        label: '2–3BR multi-family or modest SFH',
        value: '$1,700–$4,200+',
        note: 'COI/elevator soft costs and dense-street carries trend up',
      },
      {
        label: '3–4+ BR (western suburbs / cross-zone)',
        value: '$2,800–$7,500+',
        note: 'Montclair–Short Hills access and Newark↔west pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$200+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Traffic, timing & calendar intelligence',
    intro:
      'Essex peaks follow leases, school calendars, and NYC-oriented commute patterns. Density makes bad timing expensive — elevators and curb space do not wait.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday starts before 9 a.m. usually clear curb space in Newark multi-family and reduce Parkway / I-280 / Route 24 pain. Avoid last Friday/Saturday of the month when leases collide.',
      },
      {
        title: 'Newark high-rise & dense multi-family',
        detail:
          'Freight elevators are often reserved in fixed morning blocks. Late starts cascade into overtime if the next tenant’s window is booked. Lock elevator time when you lock the crew.',
      },
      {
        title: 'Western suburb cross-town (Montclair / Maplewood / Short Hills)',
        detail:
          'Weekend village congestion in Montclair and Maplewood, plus Route 24 / Parkway peaks into Livingston–Millburn, favor mid-week. School-year family moves fill June–August Saturdays early.',
      },
      {
        title: 'NYC commute & reverse-commute peaks',
        detail:
          'Even all-Essex jobs feel Hudson-facing traffic when trucks share Route 21, the Parkway, or I-280 with commuters. Build buffer around 7–9 a.m. and 3–7 p.m., especially for Ironbound ↔ west-suburb pairs.',
      },
      {
        title: 'Winter weather & older housing stock',
        detail:
          'Ice on Victorian stoops and Newark loading docks slows carries. Protect wood floors; allow extra time for salt and mats on move day.',
      },
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases pack Saturdays across the inner ring and western towns. Book 2–4 weeks ahead for popular windows.',
      },
    ],
  },
  resources: {
    title: 'Practical Essex County resources',
    intro:
      'Official links and licensing notes — building, parking, and city rules change; verify before move day.',
    items: [
      {
        label: 'Essex County, NJ — official site',
        href: 'https://essexcountynj.org/',
        external: true,
      },
      {
        label: 'City of Newark',
        href: 'https://www.newarknj.gov/',
        note: 'Building, parking, and municipal services',
        external: true,
      },
      {
        label: 'Township of Montclair',
        href: 'https://www.montclairnjusa.org/',
        external: true,
      },
      {
        label: 'Township of Maplewood',
        href: 'https://www.twp.maplewood.nj.us/',
        external: true,
      },
      {
        label: 'Township of South Orange Village',
        href: 'https://www.southorange.org/',
        external: true,
      },
      {
        label: 'Township of Livingston',
        href: 'https://www.livingstonnj.org/',
        external: true,
      },
      {
        label: 'Township of Millburn',
        href: 'https://twp.millburn.nj.us/',
        note: 'Includes Short Hills',
        external: true,
      },
      {
        label: 'NJ 511 — traffic conditions',
        href: 'https://www.511nj.org/',
        note: 'Check Parkway, I-280, Routes 21/24/10 before locking load windows',
        external: true,
      },
      {
        label: 'NJ Board of Public Utilities — utilities & consumer info',
        href: 'https://www.nj.gov/bpu/',
        note: 'Start with BPU for NJ utility and consumer frameworks; confirm mover licensing for your route',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines (e.g. into New York)',
        external: true,
      },
      {
        label: 'PSE&G — start/stop service',
        href: 'https://nj.pseg.com/',
        note: 'Electric & gas for much of Essex County',
        external: true,
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Newark Core, Inner Ring, North/NW, West Affluent, Maplewood–South Orange, Far West) when available. Confirm elevator/COI rules for Newark multi-family and approach access for Montclair / Short Hills — they are different jobs under one county name.',
  lastReviewed: '2026-07-22',
};
