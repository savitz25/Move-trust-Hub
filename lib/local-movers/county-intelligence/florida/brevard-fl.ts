import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Brevard County (Space Coast) moving intelligence.
 * Coastal + mainland split, NASA/tourism, bridges, tech/military relocations.
 */
export const brevardCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'brevard',
  hubTitle: 'Brevard County Space Coast Moving Intelligence Hub',
  eyebrow: 'Brevard County · Space Coast · Coastal & mainland guide',
  h1: 'Moving in Brevard County: Space Coast Bridges, Beachside Condos & Mainland Growth Zones',
  heroOpener:
    'Brevard County is Florida’s Space Coast — Cocoa Beach and beachside barrier strips, Melbourne and Palm Bay mainland sprawl, Titusville north-county character near Kennedy Space Center, Viera planned villages, and Indian River Lagoon bridges that split every “local” estimate in two. Launch tourism, Patrick SFB / military timelines, and A1A summer traffic are operational inputs. This is not a Miami high-rise script or a Tampa causeway clone with different city names.',
  heroCredibility:
    'Space Coast bridges · Beachside vs mainland · NASA/tourism peaks · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in Brevard County different',
    intro:
      'Barrier-island bridges, launch-week tourism, and a long north–south county shape estimates more than generic Central Florida suburban advice.',
    bullets: [
      {
        title: 'Beachside vs mainland is the primary split',
        detail:
          'Cocoa Beach, Satellite Beach, Indialantic, and Melbourne Beach are different products from Palm Bay, Viera, and west Melbourne tracts. Bridge crossings and sand access change truck choice and timing.',
      },
      {
        title: 'Lagoon bridges are line items',
        detail:
          'Pineda, Eau Gallie, Melbourne, Cocoa, and other crossings create choke points. Peak beach traffic turns short map distances into long portal-to-portal hours.',
      },
      {
        title: 'Space Coast tourism & launch calendars',
        detail:
          'Launch viewing weeks, cruise/port activity, and beach tourism pack A1A and causeways. Guest traffic can double a “local” truck hour near Cocoa Beach corridors.',
      },
      {
        title: 'NASA, tech & military relocation patterns',
        detail:
          'Kennedy Space Center region employment, aerospace contractors, and Patrick SFB / military-adjacent moves bring PCS-like timelines and high-value equipment inventories more often than pure tourism markets.',
      },
      {
        title: 'Long north–south county distances',
        detail:
          'Titusville ↔ Palm Bay is not a quick local. US-1 and I-95 pairs need honest drive assumptions; crews staged in Melbourne may price north-county differently.',
      },
      {
        title: 'Viera and planned-community HOA rules',
        detail:
          'Master-planned villages often require COIs, approved hours, and driveway/paver protections that beach cottages do not — paperwork is part of the job.',
      },
      {
        title: 'Coastal wind, salt & storm season',
        detail:
          'Salt air, elevated homes, and hurricane windows affect packing, storage, and reschedule policies — especially beachside.',
      },
      {
        title: 'Florida licensing: FDACS Ch. 507 vs FMCSA',
        detail:
          'Intrastate household moves generally require FDACS registration under Chapter 507. Interstate legs need FMCSA authority. Match the legal name on the estimate to the correct lookup.',
      },
    ],
  },
  zonesHeading: 'Brevard County zones: beachside, mainland metros & north Space Coast',
  zonesIntro:
    'Price beachside elevators, mainland HOAs, and Titusville north-county pairs as separate products. “Brevard local” without both sides of the lagoon understates the job.',
  zones: [
    {
      id: 'cocoa-beachside',
      name: 'Cocoa Beach, Cape Canaveral & mid-beachside',
      shortName: 'Cocoa Beachside',
      neighborhoods: [
        'Cocoa Beach',
        'Cape Canaveral',
        'Cocoa beachside corridors',
        'A1A mid-county multifamily',
        'Port Canaveral edge influence',
      ],
      housingTypes:
        'Beach condos, elevated coastal SFH, multifamily near A1A, some cottages',
      challenges: [
        'Elevator/COI windows and sand protection',
        'A1A tourist parking scarcity',
        'Bridge timing from mainland staging',
        'Launch-week and cruise traffic spikes',
      ],
      moverTips:
        'Reserve elevators early. Avoid launch and peak summer weekend windows when flexible. Budget floor protection and possible shuttle staging on tight beach blocks.',
      cityKeywords: [
        'cocoa beach',
        'cape canaveral',
        'port canaveral',
        'a1a',
      ],
    },
    {
      id: 'satellite-indialantic',
      name: 'Satellite Beach, Indian Harbour, Indialantic & Melbourne Beach',
      shortName: 'South beachside',
      neighborhoods: [
        'Satellite Beach',
        'Indian Harbour Beach',
        'Indialantic',
        'Melbourne Beach',
        'South A1A corridors',
      ],
      housingTypes:
        'Beach SFH, low- and mid-rise condos, elevated homes, quieter barrier residential stock',
      challenges: [
        'Narrow beach streets and limited truck swing room',
        'Bridge dependency for mainland pairs',
        'Sand tracking and salt-air packing needs',
        'Summer weekend visitor congestion',
      ],
      moverTips:
        'Share driveway and street-width photos. Prefer weekday beachside loads. Confirm building rules for condos in writing before the final estimate.',
      cityKeywords: [
        'satellite beach',
        'indian harbour',
        'indialantic',
        'melbourne beach',
      ],
    },
    {
      id: 'melbourne-viera',
      name: 'Melbourne, Viera & central mainland',
      shortName: 'Melbourne / Viera',
      neighborhoods: [
        'Melbourne',
        'Viera',
        'Suntree edge',
        'West Melbourne',
        'Central mainland commercial corridors',
      ],
      housingTypes:
        'Suburban SFH, master-planned HOAs, townhomes, apartments, some older core stock',
      challenges: [
        'HOA COI and approved hours in Viera-area villages',
        'I-95 / US-1 congestion on north–south pairs',
        'High family-inventory weekend volume',
        'Cross-lagoon hauls to beachside elevators',
      ],
      moverTips:
        'Send HOA packets with the estimate. Treat Melbourne ↔ Cocoa Beach as bridge-time locals. Mid-week early starts beat school and beach traffic.',
      cityKeywords: [
        'melbourne',
        'viera',
        'suntree',
        'west melbourne',
        'central brevard',
      ],
    },
    {
      id: 'palm-bay-south',
      name: 'Palm Bay & south mainland growth',
      shortName: 'Palm Bay / South',
      neighborhoods: [
        'Palm Bay',
        'Southwest Palm Bay growth',
        'Malabar edge',
        'South mainland arterials',
        'Larger-lot southern pockets',
      ],
      housingTypes:
        'Suburban and semi-rural SFH, growing tracts, multifamily pockets, larger lots',
      challenges: [
        'Long empty miles to north-county and beachside',
        'Variable driveway quality on larger lots',
        'Heat on open suburban streets',
        'Arterial congestion at school peaks',
      ],
      moverTips:
        'Price Palm Bay ↔ Titusville or Palm Bay ↔ Cocoa Beach pairs as long locals. Share long-driveway details. Confirm HOA rules in newer tracts.',
      cityKeywords: [
        'palm bay',
        'malabar',
        'south brevard',
        'southwest palm bay',
      ],
    },
    {
      id: 'titusville-north',
      name: 'Titusville, north mainland & KSC-adjacent',
      shortName: 'Titusville / North',
      neighborhoods: [
        'Titusville',
        'Mims edge',
        'North mainland corridors',
        'KSC-adjacent residential',
        'US-1 north corridors',
      ],
      housingTypes:
        'Small-city SFH, multifamily, space-worker rentals, some waterfront and river-edge stock',
      challenges: [
        'Long north–south hauls to Melbourne/Palm Bay',
        'Launch-week tourism traffic near viewing areas',
        'Thinner same-day crew density than central mainland',
        'Mix of river/lagoon access constraints',
      ],
      moverTips:
        'Confirm explicit north-county coverage and travel fees. Avoid major launch viewing peaks when flexible. Inventory waterfront access carefully.',
      cityKeywords: [
        'titusville',
        'mims',
        'north brevard',
        'kennedy space center',
      ],
    },
    {
      id: 'cocoa-rockledge-mainland',
      name: 'Cocoa, Rockledge & mid-mainland',
      shortName: 'Cocoa / Rockledge',
      neighborhoods: [
        'Cocoa',
        'Rockledge',
        'Merritt Island mainland/lagoon mix',
        'Mid-county US-1 corridors',
        'Historic Cocoa Village edge',
      ],
      housingTypes:
        'Mix of SFH, multifamily, lagoon-adjacent homes, older and updated stock',
      challenges: [
        'Bridge choices to beachside and Merritt Island',
        'Historic-core tight streets near Cocoa Village',
        'Cross-zone pairs north and south at peak',
        'Varied elevator vs non-elevator multifamily',
      ],
      moverTips:
        'Name preferred bridges on estimates. Share staging constraints for older cores. Clarify Merritt Island vs mainland addresses — they are different access problems.',
      cityKeywords: [
        'cocoa',
        'rockledge',
        'merritt island',
        'cocoa village',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Brevard County',
    intro:
      'Bridges, beach elevators, north–south distance, and launch-week traffic move quotes more than square footage alone.',
    drivers: [
      {
        title: 'Lagoon bridge delay risk',
        detail:
          'Peak beach and launch traffic turns hourly jobs into longer billable days on cross-lagoon pairs.',
      },
      {
        title: 'Beachside elevator & sand labor',
        detail:
          'COIs, reserved elevators, floor protection, and tight street staging stack on barrier islands.',
      },
      {
        title: 'North–south empty miles',
        detail:
          'Titusville ↔ Palm Bay and similar pairs burn portal-to-portal time that “Brevard local” labels hide.',
      },
      {
        title: 'HOA soft costs in Viera-area growth',
        detail:
          'Approved hours and paperwork compress schedule options and add admin labor.',
      },
      {
        title: 'Launch / tourism peak scarcity',
        detail:
          'Preferred crews and beachside elevators tighten around major launches and summer weekends.',
      },
      {
        title: 'Storm-season flexibility',
        detail:
          'Coastal jobs may need weather holds, storage pivots, or multi-day splits during hurricane season.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,100+',
        note: 'Higher with beach elevators, bridges, or launch-week windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,700–$3,900+',
        note: 'HOA soft costs and cross-lagoon hauls trend up',
      },
      {
        label: '3–4+ BR (beachside / long north–south / elevated coastal)',
        value: '$2,200–$6,000+',
        note: 'Barrier elevators and Titusville–Palm Bay pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$160+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, launch & storm intelligence',
    intro:
      'Brevard peaks follow beach summers, launch calendars, snowbird winters in coastal condos, and hurricane season.',
    items: [
      {
        title: 'Summer beach tourism (Memorial Day–Labor Day)',
        detail:
          'A1A and bridges worsen on weekends. Prefer weekday beachside condo moves when flexible.',
      },
      {
        title: 'Launch and major viewing events',
        detail:
          'Road congestion near viewing corridors and hotels can stall trucks. Confirm launch calendars against load windows.',
      },
      {
        title: 'Winter coastal seasonal demand',
        detail:
          'Some beachside buildings and retiree moves tighten elevators and preferred crews — book early.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Build flexible date language for coastal addresses. Ask about storage and reschedule policies before deposit.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Beat heat, beach traffic, and school peaks. Still honor HOA weekday rules in planned villages.',
      },
    ],
  },
  specialized: [
    {
      id: 'beachside-bridges',
      title: 'Beachside condos, A1A access & lagoon bridge logistics',
      intro:
        'Brevard’s signature operational problem is the barrier–mainland split across Indian River Lagoon bridges.',
      bullets: [
        'Name origin and destination sides of the lagoon on every estimate.',
        'Reserve beach condo elevators early; get COI naming requirements in writing.',
        'Budget sand protection and possible shuttle staging on tight A1A blocks.',
        'Avoid peak summer weekend and major launch windows when dates are flexible.',
        'Confirm truck length limits on narrow beachside streets before dispatch.',
      ],
    },
    {
      id: 'space-coast-relocations',
      title: 'Space industry, military & long north–south mainland module',
      intro:
        'Aerospace, Patrick SFB adjacency, and a long county create relocation patterns that pure tourism markets do not.',
      bullets: [
        'Share report dates, storage needs, and whether the job is FDACS intrastate or FMCSA interstate.',
        'Inventory high-value electronics and workshop gear carefully for tech/aerospace households.',
        'Price Titusville ↔ Melbourne/Palm Bay pairs as long locals with honest I-95 / US-1 time.',
        'Send Viera and other HOA packets with the survey for planned-community destinations.',
        'Ask about climate-controlled storage if launch or storm timing forces a split move.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Brevard County?',
    intro:
      'Beachside living, Viera planned suburbs, Palm Bay value, and Titusville space-coast character are different bets — pick bridge tolerance first, then validate schools and flood risk.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Brevard Public Schools covers the county with magnets, charters, and private options. Match every listing address to the correct zone.',
        bullets: [
          {
            title: 'Zone before beach or Viera branding',
            detail:
              'Use district boundary tools. Beachside and mainland marketing names can span multiple feeders.',
          },
          {
            title: 'Growth pockets',
            detail:
              'Viera and south mainland growth can pressure capacity — verify current enrollment and construction plans.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Eastern Florida State College and nearby university partnerships shape some rental and traffic patterns.',
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
            title: 'Regional campuses',
            detail:
              'Health First and other regional facilities serve much of the Space Coast. Map ER drive times including bridge delays from beachside addresses.',
          },
          {
            title: 'North vs south access',
            detail:
              'Titusville and far south Palm Bay can mean longer specialty drives — test peak routes before committing.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer care early if mid-treatment; launch and summer peaks can delay first appointments and move windows.',
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
              'Beachside coastal product, Viera planned homes, Melbourne core, Palm Bay, and Titusville price differently. Insurance and flood exposure can dominate coastal monthly costs.',
          },
          {
            title: 'Stock variety',
            detail:
              'Condos, elevated beach SFH, master-planned HOAs, and larger-lot south mainland homes each change move-day access.',
          },
          {
            title: 'Flood & wind diligence',
            detail:
              'Pull flood maps and insurance quotes for barrier and lagoon-edge parcels before locking contracts.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Beachside lifestyle',
            detail:
              'Ocean access and A1A culture — tourism peaks, salt air, and bridge dependence included.',
          },
          {
            title: 'Viera / Melbourne mainland',
            detail:
              'Planned amenities and suburban scale for families — HOA structure and cross-lagoon drives common.',
          },
          {
            title: 'Palm Bay south',
            detail:
              'More space and relative value for many households — longer hauls to north-county jobs and beaches.',
          },
          {
            title: 'Titusville / north Space Coast',
            detail:
              'KSC-adjacent character and smaller-city scale — distance to south-county amenities is real.',
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
              'Aerospace and space industry, military-related employment, healthcare, tourism/hospitality, education, and retail are major themes.',
          },
          {
            title: 'Bridge & I-95 commute reality',
            detail:
              'Lagoon crossings and north–south corridors set daily drive times more than brochure distance. Test peak runs for any beachside ↔ mainland pair.',
          },
          {
            title: 'Shift & launch schedules',
            detail:
              'Space and tourism schedules create non-standard traffic. Hybrid roles still need realistic bridge plans on in-office days.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Space Coast identity',
            detail:
              'Launches, beaches, and lagoon recreation define local culture — visitor surges are part of peak weeks.',
          },
          {
            title: 'Heat, humidity & storms',
            detail:
              'Hot summers and hurricane season require early move starts and flexible contracts on coastal addresses.',
          },
          {
            title: 'Outdoor access',
            detail:
              'Ocean, lagoon, and wildlife refuges are lifestyle draws; waterfront lots add stairs, docks, and soft ground on move day.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Brevard County resources',
    intro:
      'Official links and licensing notes — bridge status, HOA rules, and FDACS registration change; verify before move day.',
    items: [
      {
        label: 'Brevard County Government',
        href: 'https://www.brevardfl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Melbourne',
        href: 'https://www.melbourneflorida.org/',
        external: true,
      },
      {
        label: 'City of Palm Bay',
        href: 'https://www.palmbayflorida.org/',
        external: true,
      },
      {
        label: 'City of Cocoa Beach',
        href: 'https://www.cityofcocoabeach.com/',
        external: true,
      },
      {
        label: 'City of Titusville',
        href: 'https://www.titusville.com/',
        external: true,
      },
      {
        label: 'Brevard Public Schools',
        href: 'https://www.brevardschools.org/',
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
    'Filter by zone (Cocoa Beachside, South beachside, Melbourne/Viera, Palm Bay/South, Titusville/North, Cocoa/Rockledge). Confirm bridge routing, beach elevators, and FDACS registration.',
  lastReviewed: '2026-07-23',
};
