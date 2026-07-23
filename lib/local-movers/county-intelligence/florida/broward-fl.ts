import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Broward County, Florida moving intelligence.
 * Differentiators: condo corridors, coastal vs inland, I-95/Turnpike,
 * HOA density — not Miami-Dade tower boilerplate or Palm Beach seasonal luxury alone.
 */
export const browardCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'broward',
  hubTitle: 'Broward County Moving Intelligence Hub',
  eyebrow: 'Broward · Condo corridors & coastal–inland split',
  h1: 'Moving in Broward County: Condo Corridors, HOAs & I-95 / Turnpike Zone Guide',
  heroOpener:
    'Broward County sits between Miami-Dade intensity and Palm Beach’s longer north–south spread — and it has its own logistics fingerprint. Fort Lauderdale, Hollywood, Pompano, and coastal condo corridors mean elevators, COI packets, and barrier-island bridges; Plantation, Coral Springs, Davie, and southwest suburbs flip to HOA gates, townhome clusters, and arterial congestion on I-95, the Turnpike, I-595, and University Drive. “Local” Broward jobs still burn hours when a coastal tower pairs with an inland planned community. This hub is for people actually moving in Broward — not generic South Florida tips recycled from Brickell or Boca alone.',
  heroCredibility:
    'FDACS Ch. 507 for intrastate Florida moves · FMCSA for interstate legs · Condo / HOA density awareness · Curated directory listings',
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
    title: 'What makes moving in Broward County different',
    intro:
      'These are Broward-specific realities — condo corridors and HOA suburbs sharing the same I-95 spine — not interchangeable “tri-county” boilerplate.',
    bullets: [
      {
        title: 'Condo corridors dominate the coastal and near-coast belt',
        detail:
          'Fort Lauderdale beach and downtown towers, Hollywood, Hallandale, Pompano, and Deerfield coastal product often require Certificates of Insurance, reserved elevators, and fixed move windows. Building packets are operational requirements, not optional admin.',
      },
      {
        title: 'Coastal vs inland is two different jobs under one county name',
        detail:
          'A Las Olas high-rise, a Hollywood beach block, a Plantation cul-de-sac, and a Coral Springs HOA townhome do not share truck access, parking rules, or inventory profiles. Name both towns on the estimate.',
      },
      {
        title: 'I-95, Turnpike, I-595, and surface arterials control the clock',
        detail:
          'Portal-to-portal time tracks expressway peaks and University / Pine Island / Sample / Commercial corridors. Short map miles between coastal and western suburbs can still cost an hour each way at rush.',
      },
      {
        title: 'HOA density is high inland and in many multi-family pockets',
        detail:
          'Planned communities in Coral Springs, Parkland edges, Weston, Pembroke Pines, Miramar, and townhome clusters countywide enforce gate lists, COI, and weekday-only windows more often than open SFH streets.',
      },
      {
        title: 'Barrier islands and Intracoastal bridges change staging',
        detail:
          'Fort Lauderdale Beach, Lauderdale-by-the-Sea, Hillsboro approaches, and similar Intracoastal crossings add bridge timing, truck length limits, and tourist-season curb scarcity.',
      },
      {
        title: 'Airport and cruise logistics sit next to residential moves',
        detail:
          'FLL and Port Everglades traffic spill into nearby residential and condo corridors. Event and peak travel days can erase curb and dock access near the airport belt.',
      },
      {
        title: 'Cross-county pairs with Miami-Dade and Palm Beach are common',
        detail:
          'Households regularly move Broward ↔ Aventura or Broward ↔ Boca. Confirm whether the job stays in-state (FDACS Ch. 507 frameworks) or becomes interstate (FMCSA) if any stop leaves Florida.',
      },
      {
        title: 'Intrastate Florida rules vs interstate authority',
        detail:
          'Moves entirely within Florida are generally subject to Florida Statutes Chapter 507 household-mover frameworks administered by FDACS. Legs out of state need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Broward access zones',
  zonesIntro:
    'Plan by coastal condo belt vs central corridor vs western HOA suburbs — elevators, bridges, and expressway friction cluster by zone.',
  zones: [
    {
      id: 'fort-lauderdale-core',
      name: 'Fort Lauderdale core & downtown',
      shortName: 'Ft. Lauderdale',
      neighborhoods: [
        'Downtown Fort Lauderdale',
        'Las Olas',
        'Victoria Park',
        'Flagler Village',
        'Tarpon River',
        'Coral Ridge edge',
      ],
      housingTypes:
        'High-rises and mid-rises, waterfront condos, older multi-story, some SFH and duplex pockets inland of the core',
      challenges: [
        'Elevator/COI rules and reserved load docks',
        'I-95 / downtown event congestion',
        'Limited curb staging near Las Olas and riverfront',
        'Intracoastal bridge timing for beach-side legs',
      ],
      moverTips:
        'Collect building packets early. Prefer mid-week morning elevator windows. Clarify beach-side vs mainland addresses — bridge and truck rules differ. Avoid major event Fridays downtown when flexible.',
      cityKeywords: [
        'fort lauderdale',
        'las olas',
        'flagler village',
        'victoria park',
        'coral ridge',
      ],
    },
    {
      id: 'coastal-condo-belt',
      name: 'Coastal condo belt: Hollywood to Deerfield',
      shortName: 'Coastal Condos',
      neighborhoods: [
        'Hollywood',
        'Hallandale Beach',
        'Dania Beach',
        'Lauderdale-by-the-Sea',
        'Pompano Beach',
        'Lighthouse Point',
        'Deerfield Beach',
      ],
      housingTypes:
        'Beach and Intracoastal towers, older beach walk-ups, mid-rises, some low-rise multi-family and SFH pockets',
      challenges: [
        'Elevator reservations and association COI',
        'Tourist and snowbird curb pressure',
        'A1A / Federal Highway congestion',
        'Storm and salt-air staging on barrier approaches',
      ],
      moverTips:
        'Reserve elevators as soon as the closing date is firm. Measure truck length vs coastal loading courts. Protect goods from sand and salt. Build A1A buffer in peak season.',
      cityKeywords: [
        'hollywood',
        'hallandale',
        'dania',
        'pompano',
        'deerfield',
        'lighthouse point',
        'lauderdale-by-the-sea',
      ],
    },
    {
      id: 'central-corridor',
      name: 'Central corridor: Oakland Park, Wilton Manors & inland mid-county',
      shortName: 'Central Corridor',
      neighborhoods: [
        'Oakland Park',
        'Wilton Manors',
        'Lauderdale Lakes',
        'Lauderhill',
        'Plantation',
        'Sunrise',
        'Tamarac edge',
      ],
      housingTypes:
        'Mid-century SFH, multi-family and garden apartments, townhomes, some mid-rise, mixed HOA and open-street stock',
      challenges: [
        'I-95 / I-595 / 441 arterial congestion',
        'Elevator rules in denser multi-unit pockets',
        'Tight older grids with limited staging',
        'Cross-zone pairs to beach or western suburbs',
      ],
      moverTips:
        'Survey multi-family vs SFH access separately. Mid-week mornings reduce 441 and Commercial Boulevard friction. Price Plantation / Sunrise ↔ beach pairs as long locals when traffic is peak.',
      cityKeywords: [
        'oakland park',
        'wilton manors',
        'lauderdale lakes',
        'lauderhill',
        'plantation',
        'sunrise',
        'tamarac',
      ],
    },
    {
      id: 'southwest-suburbs',
      name: 'Southwest: Pembroke Pines, Miramar, Davie & Weston',
      shortName: 'SW Suburbs',
      neighborhoods: [
        'Pembroke Pines',
        'Miramar',
        'Davie',
        'Weston',
        'Cooper City',
        'Southwest Ranches edge',
      ],
      housingTypes:
        'Planned SFH communities, townhomes, HOA villages, some multi-family corridors, larger-lot edges in Ranches / Davie',
      challenges: [
        'HOA COI, gates, and approved hours',
        'I-75 / Turnpike / I-595 congestion',
        'Long driveway and community-entry carries',
        'Confusion near Miami-Dade county line addresses',
      ],
      moverTips:
        'Collect HOA packets before the survey is final. Clarify Broward vs Miami-Dade destinations near Miramar / Miami Gardens edges. Start early in summer heat on open suburban streets.',
      cityKeywords: [
        'pembroke pines',
        'miramar',
        'davie',
        'weston',
        'cooper city',
        'southwest ranches',
      ],
    },
    {
      id: 'northwest-growth',
      name: 'Northwest: Coral Springs, Parkland & Coconut Creek',
      shortName: 'NW Growth',
      neighborhoods: [
        'Coral Springs',
        'Parkland',
        'Coconut Creek',
        'Margate',
        'North Lauderdale',
        'Coral Springs / Parkland edges',
      ],
      housingTypes:
        'Suburban SFH, gated and HOA communities, townhomes, multi-family along Sample / Lyons corridors',
      challenges: [
        'HOA density and gate lists',
        'Turnpike / Sawgrass / Sample Road peaks',
        'School-calendar Saturday demand',
        'Long carries in large planned villages',
      ],
      moverTips:
        'Treat Coral Springs / Parkland as HOA-first suburban work. Book popular June–August Saturdays early. Confirm truck access through community gates the week of the move.',
      cityKeywords: [
        'coral springs',
        'parkland',
        'coconut creek',
        'margate',
        'north lauderdale',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Broward moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Condo soft costs and coastal–inland portal time separate cheap-looking locals from real bills.',
    drivers: [
      {
        title: 'Condo elevator, COI & association soft costs',
        detail:
          'Building packets, elevator reservations, pads, and certificate admin add time before loading starts — especially on the coastal belt and downtown towers.',
      },
      {
        title: 'Coastal–inland and bridge staging',
        detail:
          'Intracoastal crossings, A1A constraints, and shuttle needs on beach blocks raise labor hours vs open suburban driveways.',
      },
      {
        title: 'I-95 / Turnpike / I-595 congestion',
        detail:
          'Portal-to-portal billing tracks expressway peaks. Fort Lauderdale Beach ↔ Weston or Hollywood ↔ Coral Springs can burn 45–90+ minutes each way at rush.',
      },
      {
        title: 'Western HOA gate and hour limits',
        detail:
          'Weekday-only windows and gate lists in Pembroke Pines, Weston, Coral Springs, and similar communities can push demand into peak pricing.',
      },
      {
        title: 'Airport / port spillover timing',
        detail:
          'FLL and Port Everglades corridors complicate curb access on travel-peak days near the airport belt.',
      },
      {
        title: 'Cross-county multi-stop patterns',
        detail:
          'Broward ↔ Miami-Dade or Broward ↔ Palm Beach stops need honest distance and traffic assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,400+',
        note: 'Higher with elevators, beach staging, or peak windows',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,700–$4,400+',
        note: 'HOA/COI soft costs and long carries trend up',
      },
      {
        label: '3–4+ BR / tower / coastal–inland pair',
        value: '$2,900–$8,200+',
        note: 'Tower packets and expressway pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$200+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Broward move',
    intro:
      'Snowbird season, summer heat, and expressway peaks shape crew availability as much as school calendars.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clears condo docks and reduces I-95 / 595 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Snowbird & winter peak: roughly November–April',
        detail:
          'Seasonal occupancy and condo turnovers rise along the coast. Book elevators and Saturday crews earlier in peak months.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Coastal and Intracoastal addresses need weather contingency language. Confirm reschedule policies before deposits.',
      },
      {
        title: 'Summer family & school moves inland',
        detail:
          'Coral Springs, Parkland, Pembroke Pines, and Weston fill June–August Saturdays. Mid-week windows often cost less in friction.',
      },
      {
        title: 'Tourism & beach-event weekends',
        detail:
          'Hollywood, Fort Lauderdale Beach, and A1A corridors lose curb space on major weekends. Prefer inland load-out first when flexible.',
      },
    ],
  },
  specialized: [
    {
      id: 'condo-corridor-coa',
      title: 'Condo corridor COI & elevator module',
      intro:
        'Broward’s coastal and near-coast multi-unit stock fails estimates that ignore association operations.',
      bullets: [
        'Get COI certificate-holder language and elevator hours in writing before locking the crew.',
        'Ask whether the association and management company must both be named on the certificate.',
        'Reserve freight elevators as soon as the closing or lease date is firm; reconfirm the day before.',
        'Share dock photos and truck height / length limits — many courts cannot take a full 26′ trailer.',
        'Budget labor for elevator time caps and high-floor multi-trip carries even on short map distances.',
      ],
    },
    {
      id: 'coastal-inland-corridors',
      title: 'Coastal vs inland & expressway corridor module',
      intro:
        'The defining Broward planning problem is often a beach or Intracoastal address paired with a western HOA suburb on the same ticket.',
      bullets: [
        'Price portal-to-portal time honestly for any coastal ↔ western pair that rides I-95, I-595, or the Turnpike.',
        'Collect HOA gate lists and approved hours for Plantation, Weston, Pembroke Pines, Coral Springs, and similar villages early.',
        'Build bridge and A1A buffer for barrier and Intracoastal destinations.',
        'Clarify Miami-Dade or Palm Beach edge addresses so licensing and drive-time assumptions stay accurate.',
        'Prefer mid-week morning starts that miss the worst expressway peaks when association windows allow.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Broward County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, coastal vs inland lifestyle — then verify on district and hospital sites. Treat rankings as one signal among many.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Broward County Public Schools serves most of the county. Choice, magnet, and boundary options vary by address — confirm zoning for any property under contract.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is largely under Broward County Public Schools, with magnets, charters, and choice programs layered on top. Neighborhood name alone does not guarantee a school assignment.',
          },
          {
            title: 'Coastal vs inland patterns',
            detail:
              'Family-oriented inland suburbs often organize around school calendars and sports traffic; coastal condo corridors can have different enrollment mixes. Tour campuses and ask about capacity when it matters to you.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary and choice tools, Florida Department of Education data, and independent comparison sites can help — validate with in-person visits.',
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
              'Broward Health, Memorial Healthcare System, Cleveland Clinic Florida (Weston), Holy Cross, and other regional facilities anchor acute care. Confirm specialties and insurer networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Transfer records early and map peak-hour drive times to the nearest ER and preferred specialists — expressway congestion changes “nearby” on paper.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Mixed inventory',
            detail:
              'Expect condo-heavy coastal product, mid-century and newer SFH inland, and large HOA villages in the west and northwest.',
          },
          {
            title: 'Insurance & association costs',
            detail:
              'Condo assessments, HOA dues, and property insurance (including wind/flood where applicable) can dominate monthly budgets. Read association financials carefully.',
          },
          {
            title: 'Relative position in South Florida',
            detail:
              'Many households compare Broward to Miami-Dade and Palm Beach on total cost, commute, and building type. Compare specific micro-markets, not county averages alone.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Broward areas fit whom',
        bullets: [
          {
            title: 'Urban / waterfront energy',
            detail:
              'Fort Lauderdale core, Las Olas, and beach corridors suit people prioritizing amenities and vertical living.',
          },
          {
            title: 'Family suburban space',
            detail:
              'Coral Springs, Parkland, Weston, Pembroke Pines, and Cooper City often appeal for yards, HOA amenities, and school-oriented calendars.',
          },
          {
            title: 'Value / mid-county balance',
            detail:
              'Plantation, Sunrise, Tamarac, and similar mid-county areas often balance access to both coast and western job corridors — with arterial traffic as the tradeoff.',
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
              'Healthcare, aviation and logistics, marine industries, tourism, professional services, and corporate campuses (including western corridors) shape local employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-95 and I-595 peaks are real planning constraints — test drive peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Coastal recreation vs inland quiet',
            detail:
              'Beaches, Intracoastal boating, and downtown entertainment contrast with quieter planned suburbs a few exits west. Visit both patterns before deciding.',
          },
          {
            title: 'Climate & storms',
            detail:
              'Hot humid summers and hurricane season apply countywide; coastal and Intracoastal parcels add flood and wind considerations. Learn evacuation zones early.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Broward resources',
    intro:
      'Official links and licensing notes first; directory listings are independent, not endorsements.',
    items: [
      {
        label: 'Broward County — official site',
        href: 'https://www.broward.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Broward County Public Schools',
        href: 'https://www.browardschools.com/',
        external: true,
        note: 'Boundaries, choice & calendars',
      },
      {
        label: 'City of Fort Lauderdale',
        href: 'https://www.fortlauderdale.gov/',
        external: true,
      },
      {
        label: 'City of Hollywood',
        href: 'https://www.hollywoodfl.org/',
        external: true,
      },
      {
        label: 'City of Pembroke Pines',
        href: 'https://www.ppines.com/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        external: true,
        note: 'I-95, I-595, Turnpike before load windows',
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
    'Filter by coastal condo experience vs western HOA fluency when possible. Confirm elevator/COI packets for Fort Lauderdale and beach corridors, and gate access for Pembroke Pines, Weston, and Coral Springs — different jobs under one county name.',
  lastReviewed: '2026-07-23',
};
