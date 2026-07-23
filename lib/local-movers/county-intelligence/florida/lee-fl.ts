import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Lee County (Fort Myers / Cape Coral) moving intelligence.
 * Growth corridors, storm recovery patterns, bridges/causeways, canal living.
 */
export const leeCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'lee',
  hubTitle: 'Lee County Fort Myers–Cape Coral Moving Intelligence Hub',
  eyebrow: 'Lee County · Southwest Florida · Fort Myers & Cape Coral guide',
  h1: 'Moving in Lee County: Fort Myers Growth, Cape Coral Canals, Bridges & Storm-Season Logistics',
  heroOpener:
    'Lee County is Southwest Florida’s Fort Myers–Cape Coral growth engine — canal-front Cape Coral grids, Fort Myers urban and riverfront stock, Estero and Gateway planned villages, Sanibel / Fort Myers Beach bridge logistics, and post-storm rebuild and insurance rhythms that still shape housing turnover. Causeways, snowbird winters, and hurricane windows matter more than a generic “Gulf Coast condo” script borrowed from Miami or Tampa.',
  heroCredibility:
    'Fort Myers / Cape Coral growth · Bridges & causeways · Storm-season aware · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in Lee County different',
    intro:
      'Canal grids, island bridges, rapid inland growth, and storm-season flexibility are the local constraints — not Orlando theme-park traffic or Jacksonville river sprawl alone.',
    bullets: [
      {
        title: 'Cape Coral is a canal grid, not a standard suburb',
        detail:
          'Miles of canals mean bridges, long rectangular blocks, elevated homes, and boat-adjacent lots. Truck swing room and dead-end canal streets surprise crews who only know Fort Myers arterials.',
      },
      {
        title: 'Bridges and causeways set the clock',
        detail:
          'Cape Coral bridges, Sanibel Causeway, and Fort Myers Beach approaches create choke points. Peak tourist and commute windows turn short map distances into long portal-to-portal hours.',
      },
      {
        title: 'Storm recovery & insurance-driven turnover',
        detail:
          'Hurricane Ian and subsequent rebuild cycles still influence inventory, temporary housing, and contractor traffic. Some addresses involve partial contents, storage pivots, or rebuild timelines — survey carefully.',
      },
      {
        title: 'Snowbird winter demand compresses calendars',
        detail:
          'October–April seasonal arrivals fill condo elevators and preferred crews first. Summer can be quieter for tourism-core buildings but hotter and more storm-sensitive for outdoor labor.',
      },
      {
        title: 'Inland growth vs island/coastal product',
        detail:
          'Estero, Gateway, Lehigh Acres, and east Lee growth villages are HOA and SFH heavy. Barrier and beach communities add elevators, sand, and bridge logistics — different rate cards in practice.',
      },
      {
        title: 'I-75 and US-41 corridor congestion',
        detail:
          'North–south hauls between North Fort Myers, Fort Myers, Estero, and Bonita-edge influence ride I-75 and Tamiami Trail peaks. Cross-cape to mainland pairs need honest drive assumptions.',
      },
      {
        title: 'Waterfront elevation & long carries',
        detail:
          'Elevated coastal and canal homes often mean stairs, soft ground, and limited driveway depth. Shuttle or extra labor contingencies belong in the estimate, not as day-of surprises.',
      },
      {
        title: 'Florida licensing: FDACS Ch. 507 vs FMCSA',
        detail:
          'Moves entirely within Florida generally require FDACS household-mover registration under Chapter 507. Interstate legs need FMCSA authority. Match the legal name on the estimate to the correct lookup.',
      },
    ],
  },
  zonesHeading: 'Lee County zones: Cape canals, Fort Myers core, beaches & growth edges',
  zonesIntro:
    'Treat Cape Coral grids, beach bridges, and inland HOA villages as separate products. A “Fort Myers local” label without both addresses understates bridge and canal reality.',
  zones: [
    {
      id: 'fort-myers-core',
      name: 'Fort Myers core, riverfront & downtown edges',
      shortName: 'Fort Myers core',
      neighborhoods: [
        'Downtown Fort Myers',
        'River District',
        'McGregor corridor',
        'Edison / historic edges',
        'Central Fort Myers multifamily',
      ],
      housingTypes:
        'Mid-rises, historic SFH, riverfront condos, older multifamily, mixed urban stock',
      challenges: [
        'Elevator/COI windows downtown',
        'US-41 / downtown congestion',
        'Older homes with stairs and limited staging',
        'Event traffic near riverfront venues',
      ],
      moverTips:
        'Reserve elevators early. Weekday mornings beat 41 rush. Inventory stairs on historic stock before truck sizing.',
      cityKeywords: [
        'fort myers',
        'downtown fort myers',
        'river district',
        'mcgregor',
      ],
    },
    {
      id: 'cape-coral',
      name: 'Cape Coral canal neighborhoods',
      shortName: 'Cape Coral',
      neighborhoods: [
        'Cape Coral',
        'Cape Coral Parkway corridors',
        'Southwest Cape canals',
        'Northwest Cape growth',
        'SE Cape bridge approaches',
      ],
      housingTypes:
        'Canal-front SFH, elevated homes, inland Cape tracts, some multifamily near commercial strips',
      challenges: [
        'Bridge timing on/off the Cape',
        'Canal-street dead ends and tight swing room',
        'Elevated homes with long stair carries',
        'Long internal Cape distances before mainland bridges',
      ],
      moverTips:
        'Share canal-lot driveway photos and bridge preference. Price Cape-internal long hauls honestly. Early starts beat bridge peaks for mainland pairs.',
      cityKeywords: ['cape coral', 'cape', 'cape coral parkway'],
    },
    {
      id: 'beaches-islands',
      name: 'Fort Myers Beach, Sanibel & coastal bridges',
      shortName: 'Beaches / Islands',
      neighborhoods: [
        'Fort Myers Beach',
        'Sanibel',
        'Captiva edge',
        'Iona / McGregor coastal edges',
        'Causeway-adjacent multifamily',
      ],
      housingTypes:
        'Beach condos, elevated coastal SFH, post-storm rebuild stock, resort-adjacent multifamily',
      challenges: [
        'Causeway and bridge access limits',
        'Sand protection and elevator rules',
        'Storm-rebuild construction traffic',
        'Seasonal tourist parking scarcity',
      ],
      moverTips:
        'Confirm current bridge/causeway constraints and building rules. Budget shuttle options for tight beach streets. Flexible weather language is essential in season.',
      cityKeywords: [
        'fort myers beach',
        'sanibel',
        'captiva',
        'iona',
        'beach',
      ],
    },
    {
      id: 'estero-gateway-south',
      name: 'Estero, Gateway & south Lee planned growth',
      shortName: 'Estero / Gateway',
      neighborhoods: [
        'Estero',
        'Gateway',
        'Miromar / Coconut Point edges',
        'South Fort Myers growth',
        'I-75 south corridors',
      ],
      housingTypes:
        'Master-planned SFH, 55+ and family HOAs, townhomes, newer apartments',
      challenges: [
        'Strict HOA COI and approved hours',
        'I-75 congestion on north–south pairs',
        'High family inventory on winter weekends',
        'Gated entry timing and vendor rules',
      ],
      moverTips:
        'Send HOA packets with the estimate. Mid-week early starts beat school and snowbird peaks. Clarify Estero ↔ Cape Coral as a long local with bridge time.',
      cityKeywords: [
        'estero',
        'gateway',
        'coconut point',
        'south fort myers',
        'miromar',
      ],
    },
    {
      id: 'north-fort-myers-lehigh',
      name: 'North Fort Myers, Lehigh Acres & east growth',
      shortName: 'North / Lehigh',
      neighborhoods: [
        'North Fort Myers',
        'Lehigh Acres',
        'Alva edge',
        'East Lee rural-suburban mix',
        'SR-80 corridors',
      ],
      housingTypes:
        'Suburban and semi-rural SFH, larger lots, manufactured-home communities, growing tract homes',
      challenges: [
        'Longer empty miles to beaches and Cape bridges',
        'Unpaved or soft rural driveways on some parcels',
        'Heat exposure on open lots',
        'Thinner same-day crew density than coastal cores',
      ],
      moverTips:
        'Confirm driveway surface and truck length limits. Price Lehigh ↔ Sanibel-style pairs as long locals. Share gate and HOA rules for newer tracts.',
      cityKeywords: [
        'north fort myers',
        'lehigh acres',
        'lehigh',
        'alva',
        'east lee',
      ],
    },
    {
      id: 'bonita-edge',
      name: 'Bonita Springs edge & south county influence',
      shortName: 'Bonita edge',
      neighborhoods: [
        'Bonita Springs edge (Lee influence)',
        'South county commercial corridors',
        'Gulf-access canal pockets',
        'Shared Collier-adjacent labor markets',
      ],
      housingTypes:
        'Mix of SFH, condos, golf/HOA communities, snowbird multifamily',
      challenges: [
        'Shared peak demand with Collier County crews',
        'US-41 congestion',
        'HOA and condo elevator rules',
        'Winter seasonal pricing pressure',
      ],
      moverTips:
        'Book winter dates early. Confirm whether the crew’s “local” rate still applies across the Lee–Collier edge. Get elevator reservations in writing.',
      cityKeywords: ['bonita springs', 'bonita', 'south lee'],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Lee County',
    intro:
      'Bridges, canal access, storm-season flexibility, and snowbird peaks move quotes more than square footage alone.',
    drivers: [
      {
        title: 'Bridge / causeway delay risk',
        detail:
          'Cape, Beach, and Sanibel approaches add billable time at peak tourist and commute windows.',
      },
      {
        title: 'Canal and elevated-home labor',
        detail:
          'Stairs, long carries, and tight canal streets increase crew hours versus flat inland tracts.',
      },
      {
        title: 'Snowbird winter scarcity',
        detail:
          'October–April preferred dates fill first; condo elevators and weekend crews price higher.',
      },
      {
        title: 'HOA soft costs in growth villages',
        detail:
          'Estero / Gateway COIs and approved hours force weekday windows and paperwork labor.',
      },
      {
        title: 'Storm contingency & partial inventories',
        detail:
          'Rebuild-related moves, storage pivots, and weather holds can require multi-day or flexible pricing structures.',
      },
      {
        title: 'Long Cape-to-inland pairs',
        detail:
          'Lehigh or Estero ↔ canal Cape or island addresses burn portal-to-portal time that map miles understate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,200+',
        note: 'Higher with elevators, beach bridges, or winter peaks',
      },
      {
        label: '2–3BR house / canal or HOA community',
        value: '$1,900–$4,500+',
        note: 'Canal stairs and cross-bridge hauls trend up',
      },
      {
        label: '3–4+ BR (island / cross-zone / elevated coastal)',
        value: '$2,500–$6,500+',
        note: 'Sanibel / Beach and long Cape pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$175+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, snowbird & storm intelligence',
    intro:
      'Lee peaks follow snowbird winters, beach tourism, and hurricane season more than Central Florida park calendars.',
    items: [
      {
        title: 'Snowbird peak (roughly Oct–Apr)',
        detail:
          'Condo and seasonal housing demand spikes. Book elevators and crews early; mid-week slots are the realistic backups.',
      },
      {
        title: 'Summer heat + quieter tourism cores',
        detail:
          'Some beach buildings ease, but heat and afternoon storms compress productive outdoor hours — prefer early starts.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Build flexible date language. Storage demand and contractor traffic can spike around storm watches and rebuild cycles.',
      },
      {
        title: 'Spring break & holiday beach weekends',
        detail:
          'Fort Myers Beach and island approaches worsen. Avoid peak holiday weekends for causeway-dependent jobs when flexible.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still honor HOA weekday rules. Early starts beat both heat and bridge peaks.',
      },
    ],
  },
  specialized: [
    {
      id: 'bridges-canals-islands',
      title: 'Bridges, Cape Coral canals & island/causeway logistics',
      intro:
        'Lee’s signature operational problem is water access — canals inland and bridges to beach communities.',
      bullets: [
        'Name preferred bridges and backup routes on Cape Coral ↔ mainland estimates.',
        'Share canal-lot photos: driveway depth, elevation stairs, and swing room.',
        'Confirm Sanibel / Fort Myers Beach current access rules and truck limits before dispatch.',
        'Budget shuttle or extra labor contingencies for tight beach blocks.',
        'Avoid peak causeway tourist windows when dates are flexible.',
      ],
    },
    {
      id: 'storm-snowbird-growth',
      title: 'Storm-season flexibility, snowbirds & inland growth HOAs',
      intro:
        'Rebuild rhythms, winter arrivals, and Estero/Gateway HOA rules create a second specialized product alongside coastal access.',
      bullets: [
        'Document weather reschedule and storage policies before deposit during hurricane season.',
        'Survey partial inventories and rebuild-related moves carefully — contents may be nonstandard.',
        'Send HOA COI and approved-hour packets for Estero, Gateway, and gated villages with the estimate.',
        'Book October–April condo moves early; elevator times vanish first.',
        'Price Lehigh / east Lee ↔ coastal pairs as long locals with honest empty miles.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Lee County?',
    intro:
      'Canal living, beach bridges, Fort Myers urban edges, and inland HOA growth are different bets — pick water access needs first, then validate insurance, schools, and commute.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'The School District of Lee County covers the county with magnets, charters, and private options. Match every listing address to the correct zone.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Use district boundary tools. Cape Coral, Fort Myers, and Estero brands span multiple feeders.',
          },
          {
            title: 'Growth & capacity',
            detail:
              'East and south growth pockets can see enrollment pressure — verify current capacity and construction plans.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Florida SouthWestern State College and nearby university presence shape some rental and traffic patterns.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Florida DOE reports should lead; third-party rankings are secondary.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Regional systems',
            detail:
              'Lee Health campuses and other regional facilities serve most of the county. Map ER drive times including bridge delays from Cape Coral and the islands.',
          },
          {
            title: 'Island and east-county access',
            detail:
              'Sanibel / Beach and Lehigh addresses can mean longer specialty drives — test peak routes before committing.',
          },
          {
            title: 'Snowbird healthcare timing',
            detail:
              'Winter specialist demand rises with seasonal population; establish care early if relocating in peak season.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder by pocket',
            detail:
              'Island and beach product, canal Cape Coral, Fort Myers core, and inland growth tracts price differently. Insurance after major storms can dominate monthly costs.',
          },
          {
            title: 'Stock variety',
            detail:
              'Elevated coastal homes, canal SFH, HOA master plans, condos, and rebuild properties each change move-day access.',
          },
          {
            title: 'Flood & wind diligence',
            detail:
              'Pull flood maps and insurance quotes before locking contracts — especially canal, river, and beach parcels.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Cape Coral canal living',
            detail:
              'Boat access and grid living for water-oriented households — bridge time is part of daily life.',
          },
          {
            title: 'Fort Myers urban / riverfront',
            detail:
              'Closer-in amenities and denser housing — parking and elevators matter on move day.',
          },
          {
            title: 'Beaches & islands',
            detail:
              'Gulf lifestyle with causeway dependence, tourism peaks, and storm exposure.',
          },
          {
            title: 'Estero / Gateway / Lehigh',
            detail:
              'Inland planned or value-oriented growth — longer drives to beaches, different HOA intensity by pocket.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'Healthcare, tourism/hospitality, retail, construction/rebuild trades, professional services, and logistics along I-75 are major themes.',
          },
          {
            title: 'Bridge & I-75 commute reality',
            detail:
              'Cape bridges and I-75 peaks set drive times more than brochure distance. Test peak runs for any Cape ↔ Estero or North Fort Myers ↔ Beach pair.',
          },
          {
            title: 'Seasonal workforce',
            detail:
              'Hospitality and healthcare demand shift with snowbird season — housing competition can tighten in winter.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Gulf Coast recreation',
            detail:
              'Beaches, boating, and winter warmth draw residents and visitors — summer heat and storms balance the calendar.',
          },
          {
            title: 'Storm awareness culture',
            detail:
              'Hurricane prep, insurance, and flexible plans are part of responsible Southwest Florida living — not optional footnotes.',
          },
          {
            title: 'Canal & outdoor living',
            detail:
              'Waterfront lifestyle is a major draw; docks, lifts, and elevated homes add practical move-day complexity.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Lee County resources',
    intro:
      'Official links and licensing notes — bridge status, HOA rules, and FDACS registration change; verify before move day.',
    items: [
      {
        label: 'Lee County Government',
        href: 'https://www.leegov.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Fort Myers',
        href: 'https://www.cityftmyers.com/',
        external: true,
      },
      {
        label: 'City of Cape Coral',
        href: 'https://www.capecoral.gov/',
        external: true,
      },
      {
        label: 'Town of Fort Myers Beach',
        href: 'https://www.fmbgov.com/',
        external: true,
      },
      {
        label: 'City of Sanibel',
        href: 'https://www.mysanibel.com/',
        external: true,
      },
      {
        label: 'School District of Lee County',
        href: 'https://www.leeschools.net/',
        external: true,
      },
      {
        label: 'FDACS — Moving companies (Ch. 507)',
        href: 'https://www.fdacs.gov/Business-Services/Moving-Companies',
        note: 'Intrastate household mover registration',
        external: true,
      },
      {
        label: 'FDACS — Moving within Florida',
        href: 'https://www.fdacs.gov/Consumer-Resources/Consumer-Rights-and-Responsibilities/Moving-Within-Florida',
        external: true,
      },
      {
        label: 'FDACS business search',
        href: 'https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'National Hurricane Center',
        href: 'https://www.nhc.noaa.gov/',
        external: true,
      },
      {
        label: 'FEMA flood maps',
        href: 'https://msc.fema.gov/portal/home',
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
    'Filter by zone (Fort Myers core, Cape Coral, Beaches/Islands, Estero/Gateway, North/Lehigh, Bonita edge). Confirm bridge routing, canal access, and FDACS registration.',
  lastReviewed: '2026-07-23',
};
