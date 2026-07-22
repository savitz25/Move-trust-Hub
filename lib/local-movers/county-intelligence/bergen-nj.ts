import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Bergen County, New Jersey moving intelligence.
 * Used by /local-movers/new-jersey/bergen and the shared intelligence template.
 *
 * Differentiators vs Hudson / Essex / generic North Jersey:
 * Most populous NJ county; GWB / Manhattan adjacency (not PATH-only Hudson);
 * Fort Lee–Edgewater high-rise waterfront vs Ridgewood–Wyckoff–Saddle River
 * affluence; Route 17 retail spine; extreme suburban density and parking;
 * high home values — not Newark urban wards (Essex) and not Hoboken/JC waterfront (Hudson).
 */
export const bergenCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'bergen',
  hubTitle: 'Bergen County Moving Intelligence Hub',
  eyebrow: 'Bergen County · North Jersey / GWB guide',
  h1: 'Moving in Bergen County, NJ: Fort Lee High-Rises, Ridgewood & GWB Zone Guide',
  heroOpener:
    'Bergen County (~955,000–980,000 residents) is New Jersey’s most populous county and one of the densest suburban counties in the United States. The George Washington Bridge ties Fort Lee, Edgewater, and the Hudson waterfront to Manhattan every day — so “local” moves often sit next to NYC-oriented relocations, strict high-rise COI windows, and bridge-approach traffic. Inland, Ridgewood, Wyckoff, Allendale, Ramsey, Mahwah, and Saddle River flip the job to high-value single-family homes, tree-lined streets, and careful-handling expectations. Between them: Hackensack Valley multi-family density, the Route 17 / Paramus retail corridor, and older street grids where truck staging is a real planning problem. This guide is for people actually moving in Bergen — not generic North Jersey tips recycled from Hudson or Essex.',
  heroCredibility:
    'GWB / NYC adjacency · Fort Lee high-rises · Affluent north suburbs · Extreme density · Intrastate NJ · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Bergen County different',
    intro:
      'These are Bergen-specific realities — bridge-corridor high-rises vs. affluent inland suburbs, extreme density, and high-value inventories — not interchangeable “NYC suburb” boilerplate.',
    bullets: [
      {
        title: 'Most populous county in New Jersey — density rewrites every curb',
        detail:
          'Bergen packs nearly a million residents into a compact footprint. On-street parking is scarce in Fort Lee, Hackensack, Teaneck, and many older boroughs. Temporary no-parking permits and early staging are often required for box trucks.',
      },
      {
        title: 'George Washington Bridge adjacency shapes demand and timing',
        detail:
          'Manhattan-oriented households move between NYC and Bergen weekly. Even all-Bergen jobs feel GWB approach, Route 4, and Route 46 congestion in peak windows. Interstate authority matters when the job crosses into New York; pure NJ legs follow New Jersey household-goods frameworks.',
      },
      {
        title: 'Sharp waterfront high-rise vs. affluent inland contrast',
        detail:
          'Fort Lee and Edgewater high-rises mean elevators, COI, reserved freight windows, and building management packets. Ridgewood, Wyckoff, Tenafly, and Saddle River mean long carries, high-value contents, and neighborhood expectations. Name both towns on the estimate.',
      },
      {
        title: 'Extremely high average home values and careful-handling norms',
        detail:
          'Many Bergen moves involve higher-value furniture, art, and multi-story homes. Cheap released-value coverage is frequently inadequate — discuss valuation and inventory carefully before move day.',
      },
      {
        title: 'COI and elevators are the default on the Hudson corridor',
        detail:
          'Fort Lee, Edgewater, Cliffside Park, and waterfront multi-unit buildings almost always require Certificates of Insurance, elevator padding, and fixed move-in windows. Treat the building packet as part of the survey.',
      },
      {
        title: 'Older dense street grids limit truck length and turns',
        detail:
          'Central valley boroughs and older neighborhoods often lack driveway depth for a 26′ truck. Smaller trucks, shuttles, or long carries from legal curb spots are common — especially near schools and downtown cores.',
      },
      {
        title: 'Route 17, Route 4, I-80, Route 46, and the Parkway control the clock',
        detail:
          'Paramus retail traffic, Fort Lee approaches, and I-80/GSP weaves can double portal-to-portal time on short-looking locals. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'New Jersey intrastate rules vs. interstate authority',
        detail:
          'Moves entirely within New Jersey are generally overseen under New Jersey household-goods / BPU frameworks for licensed carriers. Legs into New York need FMCSA interstate authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and value profile. Fort Lee high-rise work, Hackensack Valley multi-family, Paramus retail-corridor density, northern affluent SFH towns, Englewood/Tenafly estates, and Meadowlands-adjacent industrial edges are not interchangeable under one “Bergen local” label.',
  zones: [
    {
      id: 'hudson-waterfront',
      name: 'Hudson Waterfront / Bridge Corridor',
      shortName: 'Waterfront / GWB',
      neighborhoods: [
        'Fort Lee',
        'Edgewater',
        'Cliffside Park',
        'Englewood Cliffs edge',
        'Guttenberg edge (Hudson County border)',
        'Palisades Park edge',
      ],
      housingTypes:
        'High-rises and mid-rises, waterfront condos, multi-family, some older multi-story walk-ups, limited single-family pockets on the Palisades',
      challenges: [
        'Near-universal COI, elevator reservations, and building move windows',
        'GWB approach congestion and Fort Lee traffic circles',
        'Extremely limited curb staging — mid-morning spots vanish',
        'Municipal parking permits often required for box trucks',
        'High-rise inventory volume and freight-elevator time limits',
      ],
      moverTips:
        'Get the building management packet early (COI limits, elevator hours, floor protection, certificate holders). Prefer mid-week morning freight windows. Share loading-dock photos. Avoid Friday GWB peaks for portal-to-portal honesty. Clarify Fort Lee vs. Edgewater vs. Cliffside Park — building rules differ block to block.',
      cityKeywords: [
        'fort lee',
        'edgewater',
        'cliffside park',
        'englewood cliffs',
        'palisades park',
        'guttenberg',
        'waterfront',
      ],
    },
    {
      id: 'hackensack-valley',
      name: 'Central / Hackensack Valley',
      shortName: 'Hackensack Valley',
      neighborhoods: [
        'Hackensack',
        'Teaneck',
        'Bergenfield',
        'New Milford',
        'River Edge',
        'Bogota',
        'Maywood edge',
        'Little Ferry edge',
      ],
      housingTypes:
        'Dense multi-family and garden apartments, older single-family grids, downtown multi-story, some mid-rise medical/office-adjacent housing in Hackensack',
      challenges: [
        'Tight street parking and limited truck staging',
        'Elevator/COI rules in larger multi-unit buildings',
        'Route 4 / Route 17 / Hackensack River corridor congestion',
        'Older stairs and long carries from legal curb spots',
      ],
      moverTips:
        'Confirm multi-family vs. SFH access on the survey. Teaneck and Bergenfield grids often need smaller trucks. Mid-week mornings reduce curb fights near schools and downtown Hackensack. Budget labor for walk-ups without freight elevators.',
      cityKeywords: [
        'hackensack',
        'teaneck',
        'bergenfield',
        'new milford',
        'river edge',
        'bogota',
        'maywood',
        'little ferry',
      ],
    },
    {
      id: 'route-17-paramus',
      name: 'Route 17 / Paramus Corridor',
      shortName: 'Rte 17 / Paramus',
      neighborhoods: [
        'Paramus',
        'Rochelle Park',
        'Maywood',
        'Saddle Brook',
        'Elmwood Park edge',
        'River Edge edge',
        'Garden State Plaza / retail corridors',
      ],
      housingTypes:
        'Suburban single-family, multi-family near retail corridors, some townhome communities, commercial-adjacent apartments',
      challenges: [
        'Severe Route 17 and mall-area congestion (especially weekends and holidays)',
        'Limited staging near retail arterials',
        'HOA or condo rules in multi-unit pockets',
        'Spill traffic from Parkway and Route 4 interchanges',
      ],
      moverTips:
        'Avoid Saturday Paramus retail peaks for truck windows when possible. Mid-week mornings beat Route 17. Clarify exact side streets off the commercial spine — access is often better one block off Route 17 than on it.',
      cityKeywords: [
        'paramus',
        'rochelle park',
        'maywood',
        'saddle brook',
        'elmwood park',
        'route 17',
      ],
    },
    {
      id: 'northern-affluent',
      name: 'Northern Affluent Suburbs',
      shortName: 'Northern Affluent',
      neighborhoods: [
        'Ridgewood',
        'Glen Rock',
        'Wyckoff',
        'Waldwick',
        'Allendale',
        'Ramsey',
        'Mahwah',
        'Saddle River',
        'Upper Saddle River',
        'Ho-Ho-Kus',
        'Midland Park',
      ],
      housingTypes:
        'High-value single-family, larger lots in Mahwah / Saddle River, tree-lined village cores (Ridgewood), some multi-family near downtowns and transit',
      challenges: [
        'Long carries and multi-story homes with high-value contents',
        'Tree canopies, narrow village streets, limited large-truck turnarounds',
        'Neighborhood expectations and occasional HOA / association rules',
        'GSP / Route 17 approaches for cross-county pairs',
      ],
      moverTips:
        'Assume careful-handling and full inventory for Ridgewood–Wyckoff–Saddle River jobs. Share driveway and street approach photos. Smaller trucks often beat forcing a full trailer onto village side streets. Discuss valuation coverage. Weekday mornings beat weekend village congestion in Ridgewood.',
      cityKeywords: [
        'ridgewood',
        'glen rock',
        'wyckoff',
        'waldwick',
        'allendale',
        'ramsey',
        'mahwah',
        'saddle river',
        'upper saddle river',
        'ho-ho-kus',
        'midland park',
      ],
    },
    {
      id: 'englewood-east',
      name: 'Eastern / Englewood Area',
      shortName: 'Englewood East',
      neighborhoods: [
        'Englewood',
        'Englewood Cliffs',
        'Leonia',
        'Tenafly',
        'Cresskill',
        'Alpine edge',
        'Fort Lee edge',
      ],
      housingTypes:
        'Mix of multi-family and older SFH in Englewood, cliffside and higher-value homes in Englewood Cliffs / Tenafly / Cresskill / Alpine, some multi-unit near commercial corridors',
      challenges: [
        'Hillside and cliff approaches with tight turns',
        'High-value inventories and careful-handling norms',
        'Spill traffic from Route 4 and GWB approaches',
        'Multi-family elevator/COI rules in denser Englewood pockets',
      ],
      moverTips:
        'Cliffside and hillside addresses need approach videos and realistic truck length. Tenafly / Cresskill / Alpine often pair high value with limited staging — budget long-carry labor. Englewood multi-family needs building packets. Avoid Route 4 peak weave when pairing with Fort Lee.',
      cityKeywords: [
        'englewood',
        'englewood cliffs',
        'leonia',
        'tenafly',
        'cresskill',
        'alpine',
      ],
    },
    {
      id: 'southern-meadowlands',
      name: 'Southern / Meadowlands-Adjacent',
      shortName: 'S. Meadowlands',
      neighborhoods: [
        'East Rutherford',
        'Rutherford',
        'Carlstadt',
        'Moonachie',
        'Little Ferry',
        'South Hackensack',
        'Hasbrouck Heights',
        'Lodi',
        'Garfield',
        'Wallington',
      ],
      housingTypes:
        'Older multi-family and single-family, industrial-edge mixed use, some newer multi-unit near Meadowlands employment, denser borough grids',
      challenges: [
        'Industrial and stadium-event traffic near Meadowlands',
        'Tight older borough streets and limited staging',
        'I-95 / Turnpike / Route 3 / Route 17 weave congestion',
        'Cross-county spill into Hudson and Essex edges',
      ],
      moverTips:
        'Check event calendars around MetLife / Meadowlands for East Rutherford jobs. Older borough grids (Garfield, Lodi, Rutherford) favor smaller trucks. Build buffer for Route 3 / Turnpike peaks. Clarify county-line destinations (Hudson/Essex) for licensing and portal-to-portal time.',
      cityKeywords: [
        'east rutherford',
        'rutherford',
        'carlstadt',
        'moonachie',
        'little ferry',
        'south hackensack',
        'hasbrouck heights',
        'lodi',
        'garfield',
        'wallington',
        'meadowlands',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Bergen County',
    intro:
      'Two “local” Bergen moves of the same square footage can differ sharply depending on Fort Lee elevators, village long-carries in Ridgewood, and whether the pair sits under GWB peak traffic.',
    drivers: [
      {
        title: 'High-rise elevators, COI & building soft costs',
        detail:
          'Fort Lee, Edgewater, and waterfront multi-unit buildings almost always add COI, reserved elevator windows, and forced weekday hours — soft costs even when distance is short.',
      },
      {
        title: 'Parking permits & dense-street staging',
        detail:
          'Temporary no-parking signs and municipal permits for truck staging add lead time and fees across many boroughs. Failure to permit means long carries from distant legal spots.',
      },
      {
        title: 'High-value contents & multi-story homes',
        detail:
          'Northern affluent and Englewood-area inventories raise careful-handling and valuation expectations. Labor minutes per item climb with stairs and long carries.',
      },
      {
        title: 'GWB / Route 4 / Route 17 / I-80 congestion',
        detail:
          'Portal-to-portal time tracks bridge approaches and retail spines. Fort Lee ↔ Ridgewood or Paramus ↔ Teaneck can burn 45–90+ minutes each way at peak.',
      },
      {
        title: 'NYC-related multi-stop patterns',
        detail:
          'Jobs booked as “Bergen local” sometimes include a Manhattan apartment, Brooklyn storage unit, or Hudson County stop. Interstate authority and extra stops must be in the written estimate.',
      },
      {
        title: 'Shuttle trucks on tight village and waterfront streets',
        detail:
          'When a full trailer cannot reach the door, shuttle or long-carry strategies add crew hours — common on Palisades approaches and dense older grids.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$600–$1,600+',
        note: 'Higher with elevators, permits, or Fort Lee high-rises',
      },
      {
        label: '2–3BR multi-family or modest SFH',
        value: '$1,900–$4,600+',
        note: 'COI/elevator soft costs and dense-street carries trend up',
      },
      {
        label: '3–4+ BR (affluent north / cross-zone / high-rise)',
        value: '$3,000–$8,500+',
        note: 'Ridgewood–Wyckoff access and waterfront high-rises price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$135–$210+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Traffic, timing & calendar intelligence',
    intro:
      'Bergen peaks follow leases, school calendars, and Manhattan commute patterns. Density and the GWB make bad timing expensive.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday starts before 9 a.m. usually clear curb space and reduce GWB / Route 4 / Route 17 pain. Avoid last Friday/Saturday of the month when leases collide.',
      },
      {
        title: 'Fort Lee & waterfront high-rises',
        detail:
          'Freight elevators are often reserved in fixed morning blocks. Late starts cascade into overtime if the next tenant’s window is booked. Lock elevator time when you lock the crew.',
      },
      {
        title: 'GWB and Route 4 peak avoidance',
        detail:
          'Even all-Bergen pairs near Fort Lee feel bridge approaches at 7–9 a.m. and 3–7 p.m. Build buffer or start earlier for waterfront ↔ inland hops.',
      },
      {
        title: 'Paramus / Route 17 retail peaks',
        detail:
          'Weekend and holiday shopping traffic constrains staging near malls and big-box corridors. Mid-week mornings win for Paramus-area addresses.',
      },
      {
        title: 'School-calendar family moves (northern suburbs)',
        detail:
          'Ridgewood, Glen Rock, Wyckoff, and similar towns fill June–August Saturdays for school-year timing. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Winter weather on older grids and cliff approaches',
        detail:
          'Ice on stoops, loading docks, and Englewood Cliffs approaches slows carries. Protect floors; allow extra time for mats and salt.',
      },
    ],
  },
  resources: {
    title: 'Practical Bergen County resources',
    intro:
      'Official links and licensing notes — building, parking, and municipal rules change; verify before move day.',
    items: [
      {
        label: 'Bergen County, NJ — official site',
        href: 'https://www.co.bergen.nj.us/',
        external: true,
      },
      {
        label: 'Borough of Fort Lee',
        href: 'https://www.fortleenj.org/',
        note: 'High-rise building and parking rules vary by property',
        external: true,
      },
      {
        label: 'City of Hackensack',
        href: 'https://www.hackensack.org/',
        external: true,
      },
      {
        label: 'Borough of Paramus',
        href: 'https://www.paramusborough.org/',
        external: true,
      },
      {
        label: 'Village of Ridgewood',
        href: 'https://www.ridgewoodnj.net/',
        external: true,
      },
      {
        label: 'City of Englewood',
        href: 'https://www.cityofenglewood.org/',
        external: true,
      },
      {
        label: 'Township of Teaneck',
        href: 'https://www.teanecknj.gov/',
        external: true,
      },
      {
        label: 'NJ 511 — traffic conditions',
        href: 'https://www.511nj.org/',
        note: 'Check GWB approaches, Routes 4/17/46, I-80, Parkway before locking load windows',
        external: true,
      },
      {
        label: 'Port Authority — bridges & tunnels conditions',
        href: 'https://www.panynj.gov/bridges-tunnels/en/conditions-now.html',
        note: 'GWB status for NYC-adjacent timing',
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
        note: 'Electric & gas for much of Bergen County',
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
    'Filter listings by zone (Waterfront/GWB, Hackensack Valley, Rte 17/Paramus, Northern Affluent, Englewood East, S. Meadowlands) when available. Confirm elevator/COI rules for Fort Lee high-rises and approach access for Ridgewood / Wyckoff — they are different jobs under one county name.',
  lastReviewed: '2026-07-22',
};
