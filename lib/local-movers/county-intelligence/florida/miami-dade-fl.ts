import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Miami-Dade County, Florida moving intelligence.
 * Differentiators: high-rises / COI / elevators, traffic micro-markets,
 * coastal flood & storm logistics — not generic South Florida boilerplate.
 */
export const miamiDadeCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'miami-dade',
  hubTitle: 'Miami-Dade County Moving Intelligence Hub',
  eyebrow: 'Miami-Dade · High-rise & coastal logistics',
  h1: 'Moving in Miami-Dade County: High-Rises, COI Windows & Micro-Market Zone Guide',
  heroOpener:
    'Miami-Dade is not one move market — it is a stack of micro-markets under one county name. Brickell and Downtown towers demand freight elevators, Certificates of Insurance, and reserved loading docks; Coral Gables and Coconut Grove mean older tree-lined streets and careful curb staging; Kendall and Doral flip to suburban HOAs and long arterial carries; Homestead and South Dade stretch portal-to-portal time on the Turnpike and US-1. Hurricane season, flood-zone parcels, and I-95 / Dolphin / Palmetto congestion rewrite “local” estimates that ignore building packets and traffic windows. This hub is for people actually moving in Miami-Dade — not generic Florida tips recycled from Orlando or Tampa.',
  heroCredibility:
    'FDACS Ch. 507 for intrastate Florida moves · FMCSA for interstate legs · High-rise COI / elevator awareness · Curated directory listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Miami-Dade County different',
    intro:
      'These are Miami-Dade realities — vertical living, coastal risk, and zone-by-zone access — not interchangeable “South Florida” boilerplate.',
    bullets: [
      {
        title: 'High-rises make COI and elevators the default, not the exception',
        detail:
          'Brickell, Downtown, Edgewater, Sunny Isles, Aventura towers, and many Midtown mid-rises require Certificates of Insurance naming the association or management company, reserved freight elevators, floor protection, and fixed move windows. Treat the building packet as part of the survey — not day-of paperwork.',
      },
      {
        title: 'Micro-markets do not share truck access or inventory profiles',
        detail:
          'A Brickell one-bedroom, a Coral Gables SFH, a Kendall townhome, and a Homestead single-story are different jobs under one county label. Name origin and destination neighborhoods on every estimate assumption.',
      },
      {
        title: 'Traffic is billable time on short-looking locals',
        detail:
          'I-95, the Dolphin Expressway (836), Palmetto (826), Turnpike, US-1, and causeways to Miami Beach / Key Biscayne can double portal-to-portal hours at peak. Ask whether quotes are portal-to-portal and avoid rush windows when HOA rules allow.',
      },
      {
        title: 'Coastal, bayfront, and flood-mapped parcels change risk',
        detail:
          'Beach and bayfront buildings, raised homes, and FEMA flood-zone addresses need dry staging plans, moisture protection after storms, and honest contingency language during hurricane season.',
      },
      {
        title: 'Condos and HOAs enforce weekday and hour limits',
        detail:
          'Many associations ban weekend or evening moves, limit truck length in loading courts, and require elevator pads and deposit holds. Collect rules in writing before locking a crew.',
      },
      {
        title: 'International and multi-stop patterns sit beside true locals',
        detail:
          'Households often combine a Miami-Dade condo with storage, a second county stop (Broward), or an outbound interstate leg. Confirm FDACS registration for in-state-only work and FMCSA authority when the job crosses state lines.',
      },
      {
        title: 'Language, building staff, and dock logistics matter',
        detail:
          'Property managers, concierges, and security desks control load docks. Clear contact names, COI email paths, and arrival windows prevent crews waiting on locked freight elevators.',
      },
      {
        title: 'Intrastate Florida rules vs interstate authority',
        detail:
          'Moves entirely within Florida are generally subject to Florida Statutes Chapter 507 household-mover frameworks administered by FDACS. Legs out of state need active FMCSA USDOT (and usually MC) authority. Verify which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesHeading: 'Miami-Dade access zones',
  zonesIntro:
    'Plan by vertical core vs coastal towers vs inland suburbs — elevator rules, flood exposure, and arterial congestion cluster by zone more than by ZIP alone.',
  zones: [
    {
      id: 'brickell-downtown',
      name: 'Brickell, Downtown & urban core',
      shortName: 'Brickell / Downtown',
      neighborhoods: [
        'Brickell',
        'Downtown Miami',
        'Edgewater',
        'Midtown',
        'Wynwood edge',
        'Arts & Entertainment District',
      ],
      housingTypes:
        'High-rises and mid-rises, luxury condos, some older multi-story walk-ups, limited SFH pockets on edges',
      challenges: [
        'Near-universal COI, elevator reservations, and building move windows',
        'Tight loading docks and limited curb staging',
        'I-95 / downtown event congestion',
        'High-rise inventory volume and freight-elevator time limits',
      ],
      moverTips:
        'Get the building management packet early (COI limits, elevator hours, dock rules, certificate holders). Prefer mid-week morning freight windows. Share dock photos. Avoid Friday downtown peaks for portal-to-portal honesty.',
      cityKeywords: [
        'brickell',
        'downtown',
        'edgewater',
        'midtown',
        'wynwood',
        'miami',
      ],
    },
    {
      id: 'miami-beach-coastal',
      name: 'Miami Beach, Key Biscayne & coastal towers',
      shortName: 'Beach / Coastal',
      neighborhoods: [
        'South Beach',
        'Mid-Beach',
        'North Beach',
        'Surfside',
        'Bal Harbour',
        'Sunny Isles Beach',
        'Key Biscayne',
        'Aventura edge',
      ],
      housingTypes:
        'Coastal high-rises, older beach condos and walk-ups, oceanfront and bayfront product, some low-rise multi-family',
      challenges: [
        'Causeway timing and beach traffic',
        'Elevator/COI rules and salt-air staging',
        'Narrow beach blocks and permit parking',
        'Storm and flood contingency on barrier and island addresses',
      ],
      moverTips:
        'Build causeway buffer into start times. Confirm truck length limits in coastal loading courts. Protect floors and metal goods from sand and salt. Reserve elevators as soon as the closing date is firm.',
      cityKeywords: [
        'miami beach',
        'surfside',
        'bal harbour',
        'sunny isles',
        'key biscayne',
        'aventura',
        'north bay village',
      ],
    },
    {
      id: 'coral-gables-grove',
      name: 'Coral Gables, Coconut Grove & near-south',
      shortName: 'Gables / Grove',
      neighborhoods: [
        'Coral Gables',
        'Coconut Grove',
        'South Miami',
        'Pinecrest edge',
        'Coral Terrace',
      ],
      housingTypes:
        'Historic and tree-canopied SFH, Mediterranean revival stock, townhomes, some low-rise multi-family',
      challenges: [
        'Canopy clearance and narrow residential streets',
        'Older stairs and long driveway carries',
        'Municipal staging rules in Gables commercial cores',
        'High-value contents and careful-handling expectations',
      ],
      moverTips:
        'Photo driveway width, overhanging trees, and turnaround space. Discuss valuation for higher-value inventories. Prefer early weekday starts near schools and Miracle Mile corridors.',
      cityKeywords: [
        'coral gables',
        'coconut grove',
        'south miami',
        'pinecrest',
        'coral terrace',
      ],
    },
    {
      id: 'kendall-doral-west',
      name: 'Kendall, Doral & western suburbs',
      shortName: 'Kendall / Doral',
      neighborhoods: [
        'Kendall',
        'Doral',
        'Westchester',
        'Fontainebleau',
        'Sweetwater edge',
        'Tamiami',
      ],
      housingTypes:
        'Suburban SFH, townhomes, HOA communities, garden apartments, some mid-rise multi-family',
      challenges: [
        'HOA COI and gate-list rules',
        'Turnpike / 826 / 836 arterial congestion',
        'Long carries in large planned communities',
        'Heat and afternoon storm timing in peak summer',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Price portal-to-portal time for Doral ↔ Kendall or western pairs honestly. Start early in summer heat; plan moisture protection if afternoon storms are forecast.',
      cityKeywords: [
        'kendall',
        'doral',
        'westchester',
        'fontainebleau',
        'sweetwater',
        'tamiami',
      ],
    },
    {
      id: 'north-corridor',
      name: 'North corridor: North Miami to Aventura inland',
      shortName: 'North Corridor',
      neighborhoods: [
        'North Miami',
        'North Miami Beach',
        'Miami Shores',
        'Biscayne Park',
        'Aventura inland',
        'Ives Estates edge',
      ],
      housingTypes:
        'Mix of mid-century SFH, multi-family, mid-rises, and condo product near Biscayne corridors',
      challenges: [
        'US-1 / Biscayne Boulevard congestion',
        'Elevator rules in denser multi-unit pockets',
        'Cross-county spill into Broward destinations',
        'Older street grids with limited truck length',
      ],
      moverTips:
        'Clarify Miami-Dade vs Broward addresses near the county line. Survey multi-family elevator rules separately from SFH curb access. Mid-week mornings reduce Biscayne corridor friction.',
      cityKeywords: [
        'north miami',
        'north miami beach',
        'miami shores',
        'biscayne park',
        'ives estates',
        'aventura',
      ],
    },
    {
      id: 'south-dade',
      name: 'South Dade: Homestead, Cutler Bay & beyond',
      shortName: 'South Dade',
      neighborhoods: [
        'Homestead',
        'Florida City',
        'Cutler Bay',
        'Palmetto Bay',
        'Goulds',
        'Princeton',
        'Naranja',
      ],
      housingTypes:
        'Single-family tracts, newer growth homes, agricultural-edge parcels, some multi-family corridors',
      challenges: [
        'Long Turnpike / US-1 legs to the urban core',
        'Storm and flood exposure on lower-elevation pockets',
        'Heat and rural-edge access on some parcels',
        'Empty-mile time if crews stage from central Miami',
      ],
      moverTips:
        'Confirm whether “local” rate cards still apply for Homestead ↔ Brickell pairs. Share driveway and gate photos for agricultural-edge homes. Build hurricane-season flexibility into closings when possible.',
      cityKeywords: [
        'homestead',
        'florida city',
        'cutler bay',
        'palmetto bay',
        'goulds',
        'princeton',
        'naranja',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Miami-Dade moving costs',
    intro:
      'Ranges below are market context for local (in-county / short regional) moves — not quotes. Two same-sq-ft jobs can diverge sharply by elevator soft costs, shuttle needs, and portal-to-portal traffic. Interstate legs need separate FMCSA-aware estimates.',
    drivers: [
      {
        title: 'Elevator reservations, COI & building soft costs',
        detail:
          'High-rise packets, certificate admin, elevator pads, and deposit holds add time and sometimes building fees before the first box moves.',
      },
      {
        title: 'Shuttle / long-carry on constrained docks and beach blocks',
        detail:
          'When a full trailer cannot stage at the door, shuttle trucks or long carries add crew hours — common on coastal streets and tight loading courts.',
      },
      {
        title: 'Expressway & causeway congestion',
        detail:
          'Portal-to-portal billing tracks I-95, 836, 826, Turnpike, and Miami Beach / Key Biscayne causeways. Bad windows turn short map miles into expensive hours.',
      },
      {
        title: 'HOA and gated-community rules inland',
        detail:
          'Kendall, Doral, and planned communities often limit truck hours and require gate lists — weekday-only windows can raise peak pricing.',
      },
      {
        title: 'Storm, flood & moisture protection',
        detail:
          'Coastal and flood-mapped moves may need extra wrap, weather holds, and contingency days during hurricane season.',
      },
      {
        title: 'Cross-zone and multi-stop patterns',
        detail:
          'Brickell ↔ Homestead, storage-in-between, or Broward second stops should be priced as written assumptions — not surprise add-ons.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access, non-tower)',
        value: '$550–$1,500+',
        note: 'Higher with elevators, docks, or peak traffic windows',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,800–$4,800+',
        note: 'COI/elevator soft costs and long carries trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone',
        value: '$3,200–$9,500+',
        note: 'Brickell–Beach towers and long South Dade pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$210+/hr',
        note: 'Portal-to-portal; packing and 3–4 person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Miami-Dade move',
    intro:
      'Snowbird and lease cycles, hurricane season, and daily expressway peaks matter as much as school calendars here.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday starts before 9 a.m. usually clear docks and reduce I-95 / 836 / 826 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak demand: late fall through spring snowbird season',
        detail:
          'Winter and early spring raise condo turnovers and inbound relocation volume. Book elevators and crews earlier for Brickell and Beach towers.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Closings and open-air packing can need flexible date language. Protect goods from wind-driven rain; confirm carrier weather policies in writing.',
      },
      {
        title: 'Summer heat and afternoon storms',
        detail:
          'Heat stress and daily thunderstorms slow exterior carries. Prefer early starts; plan tarps and dry staging for open loading courts.',
      },
      {
        title: 'Event and cruise-adjacent downtown friction',
        detail:
          'Arena, stadium, and waterfront events can lock downtown curb and dock access. Check calendars before locking a Brickell / Downtown load window.',
      },
    ],
  },
  specialized: [
    {
      id: 'high-rise-coi-elevator',
      title: 'High-rise COI, elevator & dock logistics',
      intro:
        'Vertical Miami-Dade jobs fail on paperwork and freight windows more often than on packing skill.',
      bullets: [
        'Request the building move packet at lease signing or escrow and send it with every estimate request.',
        'Confirm COI certificate holders, coverage limits, and whether the association and management company must both be named.',
        'Reserve freight elevators in writing and reconfirm the day before — shared residential elevators slip schedules fast.',
        'Share loading-dock photos, truck height limits, and whether a shuttle is required from a remote lot.',
        'Budget labor for elevator time limits and multiple trips on high floors even when map distance is short.',
      ],
    },
    {
      id: 'coastal-flood-storm',
      title: 'Coastal, flood-zone & storm-season module',
      intro:
        'Beach, bayfront, and flood-mapped parcels need moisture plans and contingency that inland suburban jobs may never see.',
      bullets: [
        'Check FEMA flood maps for both addresses and plan dry staging — cardboard and unfinished wood hate wet docks.',
        'Protect metal furniture and appliances from salt air when staging on coastal streets.',
        'Ask about hurricane and tropical-storm reschedule policies before peak season deposits.',
        'Build causeway and barrier-island buffer into start times; do not treat Key Biscayne or Beach legs as map-mile errands.',
        'If sale and occupancy dates may shift for weather, keep short-term storage options on the mainland as a backup.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Miami-Dade County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing micro-markets, and commute reality — then verify details on district, hospital, and official county sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Miami-Dade County Public Schools is among the largest U.S. districts. Magnet, choice, and boundary options vary by address — confirm zoning for any property you are considering.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Most public K–12 students fall under Miami-Dade County Public Schools, with magnets, academies, and charter options layered on top. Boundary lines and lottery programs matter as much as the neighborhood name.',
          },
          {
            title: 'Research sources',
            detail:
              'Use the district’s school-choice and boundary tools, Florida Department of Education data, and independent sites such as GreatSchools or Niche as signals — not sole decision rules.',
          },
          {
            title: 'Private & international options',
            detail:
              'The county has a large private and bilingual school landscape. Factor start times and pickup logistics into move-day planning if children transfer mid-year.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Jackson Health System (including Jackson Memorial), University of Miami / UHealth, Baptist Health, and other regional systems anchor acute care across the county. Confirm specialties and insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Transfer records early, map drive times at peak traffic (not off-hour map estimates), and identify urgent care near your new micro-market for non-emergency gaps.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Vertical vs suburban stock',
            detail:
              'Expect condo-dominant living in Brickell, Beach, and many coastal corridors; SFH and townhome product inland in Kendall, parts of South Dade, and older near-core neighborhoods.',
          },
          {
            title: 'Insurance and flood costs',
            detail:
              'Homeowners and flood insurance can be material budget lines on coastal and flood-mapped parcels. Price total housing cost — not purchase price alone.',
          },
          {
            title: 'HOA and condo fees',
            detail:
              'Association dues, special assessments, and rental restrictions vary widely tower to tower. Read recent budgets and rules before assuming a building fits your plan.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Miami-Dade areas fit whom',
        bullets: [
          {
            title: 'Urban vertical lifestyle',
            detail:
              'Brickell, Downtown, Edgewater, and Midtown suit people prioritizing short vertical living and urban amenities over yard space.',
          },
          {
            title: 'Coastal and beach-oriented',
            detail:
              'Miami Beach, Sunny Isles, Key Biscayne, and similar corridors prioritize water access — with elevator rules and insurance tradeoffs.',
          },
          {
            title: 'Suburban family and space',
            detail:
              'Kendall, parts of Coral Gables / Pinecrest edges, and South Dade often appeal for SFH footprints and planned communities — with longer core commutes.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Employment anchors',
            detail:
              'Trade and logistics, tourism and hospitality, healthcare, professional services, aviation, and international business shape many local job markets.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households plan around cars and expressways; Metrorail and Metromover serve limited corridors. Test drive peak-hour routes before choosing a zone solely on map distance.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent afternoon storms, and a defined hurricane season. Plan outdoor staging and outdoor furniture care accordingly.',
          },
          {
            title: 'Culture & density',
            detail:
              'Neighborhood character shifts block to block — multilingual commercial corridors, nightlife districts, and quieter suburban grids can sit minutes apart. Visit at different times of day before deciding.',
          },
          {
            title: 'Storm readiness',
            detail:
              'New residents should learn evacuation zones, shutters or impact-glass status, and building hurricane procedures as part of move-in — not after the first watch is issued.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Miami-Dade resources',
    intro:
      'Start with official and primary sources; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Miami-Dade County — official site',
        href: 'https://www.miamidade.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Miami-Dade County Public Schools',
        href: 'https://www.dadeschools.net/',
        external: true,
        note: 'Boundaries, choice & calendars',
      },
      {
        label: 'City of Miami',
        href: 'https://www.miamigov.com/',
        external: true,
      },
      {
        label: 'City of Miami Beach',
        href: 'https://www.miamibeachfl.gov/',
        external: true,
      },
      {
        label: 'City of Coral Gables',
        href: 'https://www.coralgables.com/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        external: true,
        note: 'I-95, 836, 826, Turnpike before load windows',
      },
      {
        label: 'FEMA Flood Map Service Center',
        href: 'https://msc.fema.gov/portal/home',
        external: true,
        note: 'Check parcel flood zones',
      },
      {
        label: 'FDACS — Florida household movers (Ch. 507)',
        href: 'https://www.fdacs.gov/',
        external: true,
        note: 'Intrastate mover registration & consumer resources',
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        external: true,
        note: 'Required when the move crosses state lines',
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
      {
        label: 'All Florida local mover guides',
        href: '/local-movers/florida',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Miami-Dade high-rise COI/elevator experience for Brickell, Beach, and tower jobs; confirm suburban HOA packet fluency for Kendall and Doral. Verify FDACS registration for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
