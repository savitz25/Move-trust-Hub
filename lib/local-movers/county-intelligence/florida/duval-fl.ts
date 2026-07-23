import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Duval County (Jacksonville) moving intelligence.
 * River crossings, military/port logistics, beach communities, and metro sprawl.
 */
export const duvalCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'duval',
  hubTitle: 'Duval County Jacksonville Moving Intelligence Hub',
  eyebrow: 'Duval County · Northeast Florida · Jacksonville metro guide',
  h1: 'Moving in Duval County: River Crossings, Military & Port Logistics, Beach & Sprawl Zones',
  heroOpener:
    'Duval County is Jacksonville’s consolidated metro — St. Johns River bridges, NAS Jacksonville and Mayport military timelines, port-adjacent industrial edges, Southside and Mandarin sprawl, and Jax Beach / Atlantic Beach coastal product. A “local” move can mean downtown elevators one day and a long bridge-plus-suburban haul the next. This guide is built for Duval realities — not a Miami condo script or a Tampa Bay causeway clone.',
  heroCredibility:
    'Jacksonville sprawl · River & bridge-aware · Military/port timelines · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in Duval County different',
    intro:
      'River crossings, military PCS calendars, port freight, and extreme metro sprawl define estimates here more than South Florida high-rise culture.',
    bullets: [
      {
        title: 'River bridges are line items, not scenery',
        detail:
          'I-95, I-295, Mathews, Main Street, and other crossings create choke points between Northside, Southside, Arlington, and the Beaches. Peak bridge delays turn map miles into billable hours — ask how crews route cross-river pairs.',
      },
      {
        title: 'Military & PCS documentation timelines',
        detail:
          'NAS Jacksonville, NS Mayport, and related commands drive PCS waves with hard report dates. Crews who understand orders, temporary lodging, and partial-shipment timing reduce last-week chaos.',
      },
      {
        title: 'Port & industrial-edge logistics',
        detail:
          'JAXPORT activity and warehouse corridors add freight traffic near some residential edges. Industrial-adjacent streets can limit staging and change best arrival windows mid-day.',
      },
      {
        title: 'Sprawl distances understate true drive time',
        detail:
          'Jacksonville covers a huge land area. Mandarin ↔ Northside, Westside ↔ Beaches, or downtown ↔ far Southside pairs need honest portal-to-portal pricing — not a single “Jax local” rate card without addresses.',
      },
      {
        title: 'Downtown / Riverside density vs suburban tracts',
        detail:
          'Urban core elevators, historic Riverside / San Marco stock, and tight street parking are a different product from HOA cul-de-sacs in Mandarin or Southside master plans.',
      },
      {
        title: 'Beach communities add sand, condos & tourist peaks',
        detail:
          'Jacksonville Beach, Neptune Beach, and Atlantic Beach bring elevators, sand tracking, summer parking fights, and weekend visitor traffic that inland suburbs do not see.',
      },
      {
        title: 'Storm season & riverine flood awareness',
        detail:
          'Hurricane season and river/creek flood zones affect coastal and low-lying addresses. Build flexible date language and verify storage options when weather threatens.',
      },
      {
        title: 'Florida licensing: FDACS Ch. 507 vs FMCSA',
        detail:
          'Intrastate household moves generally require FDACS registration under Chapter 507. Interstate legs (including many military long-hauls) need FMCSA authority. Verify the legal name on the estimate against the correct registry.',
      },
    ],
  },
  zonesHeading: 'Duval County zones: river, beaches, military edges & sprawl',
  zonesIntro:
    'Price each zone as its own bridge, access, and housing problem. Downtown elevators, Beaches sand, Mandarin HOAs, and Northside industrial edges are not one Jacksonville product.',
  zones: [
    {
      id: 'downtown-riverside',
      name: 'Downtown, Riverside, Avondale & San Marco',
      shortName: 'Downtown / Riverside',
      neighborhoods: [
        'Downtown Jacksonville',
        'Riverside',
        'Avondale',
        'San Marco',
        'Brooklyn edge',
      ],
      housingTypes:
        'High-rises, historic SFH, duplexes, mid-rises, denser street grids near the river',
      challenges: [
        'Elevator/COI windows and limited staging',
        'Bridge approaches at rush hour',
        'Older homes with stairs and tight drives',
        'Event and sports traffic near the core',
      ],
      moverTips:
        'Reserve elevators early and confirm COI naming. Weekday mornings beat bridge peaks. Inventory historic-home stairs and long carries before sizing the truck.',
      cityKeywords: [
        'downtown jacksonville',
        'riverside',
        'avondale',
        'san marco',
        'jacksonville',
      ],
    },
    {
      id: 'southside-mandarin',
      name: 'Southside, Mandarin & southeast sprawl',
      shortName: 'Southside / Mandarin',
      neighborhoods: [
        'Southside',
        'Mandarin',
        'Baymeadows corridor',
        'Deerwood edge',
        'Southeast suburban villages',
      ],
      housingTypes:
        'Suburban SFH, HOA planned communities, townhomes, apartments along major arterials',
      challenges: [
        'HOA COI and approved-hour rules',
        'I-95 / JTB / 9A congestion on cross-zone hauls',
        'High family-inventory volume on weekends',
        'Long distances to Northside or Beaches',
      ],
      moverTips:
        'Send HOA packets with the estimate. Treat Mandarin ↔ Northside or Mandarin ↔ Beaches as long locals. Mid-week early starts beat school and JTB peaks.',
      cityKeywords: [
        'southside',
        'mandarin',
        'baymeadows',
        'deerwood',
        'southeast jacksonville',
      ],
    },
    {
      id: 'beaches',
      name: 'Jacksonville Beaches (Jax Beach, Neptune, Atlantic)',
      shortName: 'The Beaches',
      neighborhoods: [
        'Jacksonville Beach',
        'Neptune Beach',
        'Atlantic Beach',
        'Ponte Vedra edge influence',
        'Beachside multifamily corridors',
      ],
      housingTypes:
        'Beach condos, elevated coastal SFH, cottages, multifamily near A1A',
      challenges: [
        'Sand tracking and floor protection needs',
        'Elevator reservations in coastal towers',
        'Summer weekend tourist parking scarcity',
        'Bridge/causeway timing from inland staging',
      ],
      moverTips:
        'Budget floor protection and possible shuttle staging on tight beach blocks. Avoid peak summer weekend load windows when flexible. Confirm building rules in writing.',
      cityKeywords: [
        'jacksonville beach',
        'neptune beach',
        'atlantic beach',
        'jax beach',
        'beaches',
      ],
    },
    {
      id: 'arlington-east',
      name: 'Arlington, Regency & east-of-river corridors',
      shortName: 'Arlington / East',
      neighborhoods: [
        'Arlington',
        'Regency',
        'East Arlington',
        'Beach Boulevard corridors',
        'Craig Airport edge',
      ],
      housingTypes:
        'Mix of mid-century SFH, multifamily, townhomes, commercial-adjacent residential',
      challenges: [
        'Bridge dependency for many cross-river jobs',
        'Arterial congestion on Beach Blvd and related routes',
        'Varied driveway and parking quality',
        'Mixed elevator and non-elevator multifamily stock',
      ],
      moverTips:
        'Build bridge buffer into Arlington ↔ Southside and Arlington ↔ Downtown pairs. Confirm complex loading rules for garden apartments. Share access photos for tight courts.',
      cityKeywords: [
        'arlington',
        'regency',
        'east arlington',
        'beach boulevard',
      ],
    },
    {
      id: 'northside-westside',
      name: 'Northside, Westside & industrial-adjacent edges',
      shortName: 'North / West',
      neighborhoods: [
        'Northside',
        'Westside',
        'Oceanway edge',
        'Port / warehouse-adjacent residential',
        'I-295 outer loops',
      ],
      housingTypes:
        'SFH, working-community stock, multifamily pockets, industrial-edge homes, larger lots on outer rings',
      challenges: [
        'Freight and port-related traffic patterns',
        'Long empty miles to Beaches or Mandarin',
        'Limited shaded staging on open lots in heat',
        'Rural-edge driveways on far outer addresses',
      ],
      moverTips:
        'Price distance explicitly for Northside ↔ Beaches pairs. Note industrial traffic windows mid-day. Inventory sheds and long drives on outer-lot homes.',
      cityKeywords: [
        'northside',
        'westside',
        'oceanway',
        'northwest jacksonville',
        'west jacksonville',
      ],
    },
    {
      id: 'military-mayport-nas',
      name: 'NAS Jacksonville & Mayport military-adjacent areas',
      shortName: 'Military edges',
      neighborhoods: [
        'NAS Jacksonville area',
        'Orange Park edge influence (Clay)',
        'Mayport / naval station corridors',
        'Military housing and nearby rentals',
        'Base-adjacent apartment clusters',
      ],
      housingTypes:
        'Base-adjacent multifamily, modest SFH, temporary lodging turnovers, family rentals near gates',
      challenges: [
        'PCS hard dates and partial shipments',
        'Gate and security-adjacent traffic patterns',
        'High volume of lease-end clusters around orders',
        'Mix of intrastate and interstate authority needs',
      ],
      moverTips:
        'Confirm report dates, storage-in-transit needs, and whether the job is FDACS-only or FMCSA interstate. Prefer crews with PCS documentation experience.',
      cityKeywords: [
        'nas jacksonville',
        'mayport',
        'naval',
        'military',
        'orange park',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Duval County',
    intro:
      'Bridge time, military calendars, beach elevators, and extreme sprawl move the needle more than pure square footage.',
    drivers: [
      {
        title: 'Cross-river bridge delay risk',
        detail:
          'Peak crossings turn hourly jobs into longer billable days. Fixed quotes should document assumed windows and routes.',
      },
      {
        title: 'Sprawl portal-to-portal distance',
        detail:
          'Beaches ↔ Mandarin, Northside ↔ Southside, and downtown ↔ outer-loop pairs burn empty miles that “Jacksonville local” labels hide.',
      },
      {
        title: 'Elevator / coastal building soft costs',
        detail:
          'Downtown towers and beach condos add COIs, reserved elevators, and protection labor.',
      },
      {
        title: 'PCS and hard-date premiums',
        detail:
          'Military report dates and last-week availability constraints can price higher than flexible civilian moves.',
      },
      {
        title: 'HOA suburban rules',
        detail:
          'Mandarin and Southside villages often restrict hours and require paperwork that compresses schedule options.',
      },
      {
        title: 'Summer heat & storm flexibility',
        detail:
          'Heat-safe packing, early starts, and weather contingency language can add labor or multi-day splits on large inventories.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,100+',
        note: 'Higher with elevators, beach blocks, or peak bridge windows',
      },
      {
        label: '2–3BR house / suburban HOA',
        value: '$1,700–$4,000+',
        note: 'Cross-river and long-sprawl pairs trend up',
      },
      {
        label: '3–4+ BR (cross-zone / beach / downtown tower)',
        value: '$2,200–$6,000+',
        note: 'Beaches elevators and long river crossings price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$165+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, military & storm intelligence',
    intro:
      'Duval peaks follow PCS cycles, school calendars, beach tourism weekends, and hurricane season — not Central Florida park calendars alone.',
    items: [
      {
        title: 'Military PCS waves',
        detail:
          'Summer PCS remains heavy; mid-month order clusters can exhaust crews. Book as soon as orders are firm and clarify storage needs.',
      },
      {
        title: 'School & family summer weekends',
        detail:
          'Suburban SFH moves fill first in Southside and Mandarin. Mid-week early starts are the realistic backups.',
      },
      {
        title: 'Beach tourism weekends',
        detail:
          'Memorial Day through Labor Day parking and visitor traffic worsen beach-block access. Prefer weekday beach condo moves when flexible.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Coastal and river-adjacent addresses may need flexible closing language. Ask about storm reschedule and storage policies before deposit.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Beat bridge peaks and heat. Still honor HOA weekday windows where required.',
      },
    ],
  },
  specialized: [
    {
      id: 'river-bridge-sprawl',
      title: 'River crossings, bridges & metro sprawl logistics',
      intro:
        'Duval’s defining operational problem is often cross-river time plus extreme distance under one city name.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that must cross the St. Johns River at peak.',
        'Name both origin and destination zones on the estimate — “Jacksonville local” is too vague.',
        'Prefer early starts to avoid I-95 / I-295 / JTB congestion on long suburban hauls.',
        'Confirm staging plans when downtown or historic streets cannot take full trailers.',
        'Build buffer for event and sports traffic near the urban core.',
      ],
    },
    {
      id: 'military-port-beach',
      title: 'Military PCS, port edges & beach condo module',
      intro:
        'Orders timelines, industrial approaches, and coastal buildings create three specialized products that generic “Jax movers” marketing often glosses over.',
      bullets: [
        'Share report dates, temporary lodging plans, and whether the job is intrastate (FDACS) or interstate (FMCSA).',
        'Ask for PCS documentation experience and storage-in-transit options before the final week.',
        'Note port/freight-adjacent traffic for Northside and industrial-edge residential streets.',
        'Reserve beach condo elevators early; budget sand protection and possible shuttle staging.',
        'Avoid peak summer beach weekends when dates are flexible.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Duval County?',
    intro:
      'Urban river living, Southside sprawl, Beaches lifestyle, and military-adjacent housing are different bets — pick the pocket first, then validate bridges, schools, and flood risk.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Duval County Public Schools covers the consolidated city-county, with magnets, charters, and private options. Match every listing to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before neighborhood brand',
            detail:
              'Use DCPS boundary tools. “Mandarin” or “Southside” marketing spans multiple feeders and program options.',
          },
          {
            title: 'Magnet & specialty programs',
            detail:
              'Application timelines matter for families targeting specialty schools — do not assume neighborhood assignment alone.',
          },
          {
            title: 'Higher education presence',
            detail:
              'University of North Florida, Jacksonville University, and other campuses shape rental demand and traffic near campus edges.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Florida DOE data should lead; third-party rankings are secondary signals only.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Regional acute-care anchors',
            detail:
              'Mayo Clinic Florida, UF Health Jacksonville, Baptist Health campuses, and other systems serve the metro. Map ER drive times including bridge delays.',
          },
          {
            title: 'Beaches vs far sprawl access',
            detail:
              'Coastal and outer-loop addresses can mean longer specialty drives into the urban core — test peak-hour routes.',
          },
          {
            title: 'Military healthcare context',
            detail:
              'Active-duty and veteran households should confirm TRICARE network and base clinic logistics alongside civilian hospitals.',
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
              'Historic Riverside / San Marco, Beaches coastal product, Mandarin suburbs, and Northside stock price differently. Compare insurance and flood exposure, not only list price.',
          },
          {
            title: 'Stock variety',
            detail:
              'High-rises, mid-century SFH, master-planned HOAs, beach cottages, and industrial-edge rentals each change move-day access.',
          },
          {
            title: 'Relative metro affordability',
            detail:
              'Jacksonville often prices below South Florida coastal markets for comparable size inland — waterfront and Beaches remain their own ladder.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Urban river & historic neighborhoods',
            detail:
              'Downtown density, Riverside character, and San Marco walkability — with parking and elevator tradeoffs.',
          },
          {
            title: 'Southside / Mandarin suburban',
            detail:
              'Family HOA tracts and longer corridor drives; school and shopping access often primary draws.',
          },
          {
            title: 'Beaches lifestyle',
            detail:
              'Ocean access and coastal culture — summer crowds, salt air, and condo rules are part of the deal.',
          },
          {
            title: 'Military-adjacent living',
            detail:
              'NAS Jax / Mayport proximity for orders convenience — gate traffic and PCS churn shape neighborhood rhythms.',
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
              'Military, logistics and port operations, healthcare, finance/insurance, logistics/distribution, and professional services are major themes.',
          },
          {
            title: 'Bridge commute reality',
            detail:
              'River crossings and I-295 loops set daily drive times more than straight-line miles. Test peak runs for any North ↔ South or inland ↔ Beaches pair.',
          },
          {
            title: 'Port & logistics shifts',
            detail:
              'Warehouse and port schedules create non-standard traffic. Hybrid office roles still need realistic bridge plans on in-office days.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'River city + Atlantic beaches',
            detail:
              'Few metros combine a major river core with nearby ocean towns — recreation options are strong; weekend beach traffic is real.',
          },
          {
            title: 'Heat, humidity & storms',
            detail:
              'Hot summers and hurricane season require early-move starts and flexible contracts. Low-lying parcels need flood diligence.',
          },
          {
            title: 'Outdoor access',
            detail:
              'Intracoastal, beaches, and large park systems are lifestyle draws; boat and dock properties add move-day access complexity.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Duval County resources',
    intro:
      'Official links and licensing notes — bridge closures, base timelines, and FDACS registration change; verify before move day.',
    items: [
      {
        label: 'City of Jacksonville / Duval County',
        href: 'https://www.jacksonville.gov/',
        note: 'Consolidated city-county services',
        external: true,
      },
      {
        label: 'Jacksonville Beach',
        href: 'https://www.jacksonvillebeach.org/',
        external: true,
      },
      {
        label: 'Atlantic Beach',
        href: 'https://www.coab.us/',
        external: true,
      },
      {
        label: 'Neptune Beach',
        href: 'https://www.ci.neptune-beach.fl.us/',
        external: true,
      },
      {
        label: 'Duval County Public Schools',
        href: 'https://dcps.duvalschools.org/',
        external: true,
      },
      {
        label: 'JAXPORT',
        href: 'https://www.jaxport.com/',
        note: 'Port context for industrial-edge logistics',
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
    'Filter by zone (Downtown/Riverside, Southside/Mandarin, Beaches, Arlington/East, North/West, Military edges). Confirm bridge routing, PCS timelines, and FDACS vs FMCSA authority.',
  lastReviewed: '2026-07-23',
};
