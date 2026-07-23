import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Richmond County, Georgia moving intelligence.
 * Augusta metro, military/medical anchors — NOT Atlanta.
 */
export const richmondCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'richmond',
  hubTitle: 'Richmond County Moving Intelligence Hub',
  eyebrow: 'Richmond · Augusta metro · Military & medical regional hub',
  h1: 'Moving in Richmond County: Augusta Metro, Military Timelines & Medical Corridors',
  heroOpener:
    'Richmond County is the Augusta metro core — not an Atlanta suburb with a different ZIP. Fort Eisenhower (formerly Fort Gordon) PCS waves, major medical campuses, the Savannah River corridor, South Carolina cross-river pairs, and a mix of historic Augusta streets and suburban belts define the work. A “local” move can mean a downtown elevator one day and a military-report-date household the next. This guide is built for Augusta realities — cyber/military calendars, hospital traffic, and CSRA regional logistics — not a Clayton airport script or a Savannah tourism lane.',
  heroCredibility:
    'Georgia DPS MCCD for intrastate household goods · FMCSA for interstate legs · Augusta military & medical corridor awareness · Curated directory listings',
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
    title: 'What makes moving in Richmond County different',
    intro:
      'Military PCS calendars, medical-campus traffic, and CSRA cross-river logistics define estimates here — not Atlanta freeway overflow culture.',
    bullets: [
      {
        title: 'This is Augusta metro — not Atlanta',
        detail:
          'Pricing, crew networks, and traffic patterns follow the Central Savannah River Area. Do not apply north-metro HOA playbooks or airport-edge Clayton assumptions to Richmond addresses.',
      },
      {
        title: 'Military PCS timelines dominate peak capacity',
        detail:
          'Fort Eisenhower and related missions drive hard report dates, partial shipments, and storage-in-transit needs. Crews who understand orders paperwork reduce last-week chaos.',
      },
      {
        title: 'Medical corridors create mid-day congestion',
        detail:
          'Hospital and clinic campuses generate shift traffic, patient peaks, and limited staging on adjacent residential streets. Arrival windows matter as much as distance.',
      },
      {
        title: 'River and South Carolina pairs are routine',
        detail:
          'Households regularly move Richmond ↔ Aiken/North Augusta and other SC points. Crossing the state line flips authority needs to interstate FMCSA frameworks.',
      },
      {
        title: 'Historic core vs suburban belts',
        detail:
          'Downtown and older Augusta stock mean stairs, tight streets, and varied parking. Martinez-edge and south/west suburban tracts flip to HOA and arterial logistics.',
      },
      {
        title: 'Masters and major event windows',
        detail:
          'Tournament week and large downtown events can make some corridors impractical. Flexible dates outperform fighting event traffic for non-essential moves.',
      },
      {
        title: 'Regional employment anchors beyond one industry',
        detail:
          'Military, healthcare, manufacturing, and education each create different lease and PCS-adjacent churn patterns across the county.',
      },
      {
        title: 'Georgia DPS MCCD vs FMCSA authority',
        detail:
          'Moves entirely within Georgia are generally under Georgia DPS MCCD. Many Augusta-area jobs that touch South Carolina need active FMCSA USDOT (and usually MC) authority — verify before deposit.',
      },
    ],
  },
  zonesHeading: 'Richmond County zones: Augusta core, medical edges, military & suburbs',
  zonesIntro:
    'Price downtown/historic Augusta, medical corridors, Fort Eisenhower-adjacent areas, south/west suburbs, and river-edge pairs as separate products.',
  zones: [
    {
      id: 'downtown-historic',
      name: 'Downtown Augusta, historic & riverfront core',
      shortName: 'Downtown / Historic',
      neighborhoods: [
        'Downtown Augusta',
        'Historic district edges',
        'Riverwalk / riverfront residential',
        'Olde Town influence',
        'Urban multifamily and loft stock',
      ],
      housingTypes:
        'Historic SFH, row-style and renovated stock, lofts, mid-rises, denser street grids',
      challenges: [
        'Limited curb staging and event traffic',
        'Stairs and older interiors',
        'Elevator/COI rules in multifamily',
        'Masters and festival window congestion',
      ],
      moverTips:
        'Prefer mid-week mornings outside major event weeks. Confirm elevator reservations. Inventory stairs and long carries on historic stock.',
      cityKeywords: [
        'downtown augusta',
        'olde town',
        'riverwalk',
        'augusta',
      ],
    },
    {
      id: 'medical-corridor',
      name: 'Medical campus corridors & midtown belts',
      shortName: 'Medical corridors',
      neighborhoods: [
        'Hospital campus edges',
        'Midtown Augusta medical belts',
        'Clinic and professional park residential',
        'Staff and student rental clusters',
        'Arterial multifamily near care campuses',
      ],
      housingTypes:
        'Apartments, townhomes, modest SFH, medical-adjacent rentals',
      challenges: [
        'Shift-change and patient traffic peaks',
        'Limited staging near busy campuses',
        'High lease-turnover clusters',
        'Mixed elevator and garden-style access',
      ],
      moverTips:
        'Avoid peak clinic arrival windows when flexible. Confirm complex loading rules. Build buffer for ambulance and visitor congestion.',
      cityKeywords: [
        'medical',
        'hospital',
        'midtown augusta',
        'university hospital',
      ],
    },
    {
      id: 'fort-eisenhower-edge',
      name: 'Fort Eisenhower (Fort Gordon) military-adjacent areas',
      shortName: 'Military edges',
      neighborhoods: [
        'Fort Eisenhower / Fort Gordon adjacent',
        'Military family housing edges',
        'PCS rental corridors',
        'Gate-approach residential',
        'West Augusta military-influenced tracts',
      ],
      housingTypes:
        'Base-adjacent multifamily, modest SFH, temporary lodging turnovers, family rentals',
      challenges: [
        'Hard report dates and partial shipments',
        'Gate and security-adjacent traffic patterns',
        'High volume of lease-end clusters around orders',
        'Mix of intrastate and interstate authority needs',
      ],
      moverTips:
        'Confirm report dates, storage-in-transit, and whether the job stays in Georgia or crosses into SC/other states. Prefer PCS-experienced crews.',
      cityKeywords: [
        'fort eisenhower',
        'fort gordon',
        'military',
        'pcs',
        'grovetown edge',
      ],
    },
    {
      id: 'south-west-suburbs',
      name: 'South & west Richmond suburban belts',
      shortName: 'South / West suburbs',
      neighborhoods: [
        'South Augusta residential',
        'West Augusta suburban tracts',
        'HOA family subdivisions',
        'Retail arterial edges',
        'Growth multifamily pockets',
      ],
      housingTypes:
        'Suburban SFH, townhomes, HOA planned communities, garden apartments',
      challenges: [
        'HOA COI and approved-hour rules',
        'Full family inventories on summer weekends',
        'Arterial congestion near retail nodes',
        'Longer hauls to downtown or SC river pairs',
      ],
      moverTips:
        'Send HOA packets with the estimate. Price suburb ↔ downtown and suburb ↔ SC pairs honestly. Early mid-week starts beat heat and school peaks.',
      cityKeywords: [
        'south augusta',
        'west augusta',
        'richmond',
      ],
    },
    {
      id: 'river-sc-edge',
      name: 'Savannah River edge & SC approach corridors',
      shortName: 'River / SC edge',
      neighborhoods: [
        'River-adjacent residential',
        'North Augusta approach corridors',
        'Bridge-dependent pairs',
        'CSRA cross-river edges',
        'Eastern Richmond river influences',
      ],
      housingTypes:
        'Mix of SFH, multifamily, and river-edge stock; destination often SC suburbs',
      challenges: [
        'Bridge timing and cross-river delay risk',
        'Interstate licensing when SC is involved',
        'Event and recreational river traffic on peak weekends',
        'Coordinate two-state address logistics',
      ],
      moverTips:
        'State clearly if origin/destination crosses into South Carolina. Verify FMCSA for interstate legs. Build bridge buffers at peak.',
      cityKeywords: [
        'north augusta',
        'river',
        'savannah river',
        'south carolina',
        'aiken',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Richmond County',
    intro:
      'PCS hard dates, medical traffic, historic access, and cross-river interstate legs move the needle more than pure bedroom count.',
    drivers: [
      {
        title: 'Military report-date premiums',
        detail:
          'Hard PCS windows and last-week availability constraints can price higher than flexible civilian moves.',
      },
      {
        title: 'Medical-corridor delay risk',
        detail:
          'Campus peaks add billable time near hospital-adjacent residential streets.',
      },
      {
        title: 'Historic core staging labor',
        detail:
          'Downtown stairs, limited curb, and event weeks increase labor vs open suburban lots.',
      },
      {
        title: 'Cross-river / interstate authority',
        detail:
          'SC-bound pairs need FMCSA-qualified carriers and honest bridge portal time.',
      },
      {
        title: 'HOA suburban rules',
        detail:
          'South/west planned communities restrict hours and require paperwork that compresses calendars.',
      },
      {
        title: 'Event-week scarcity (including Masters period)',
        detail:
          'Major Augusta events can exhaust crews and block preferred corridors — book early or flex dates.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,050+',
        note: 'Higher with elevators, downtown staging, or peak medical windows',
      },
      {
        label: '2–3BR house / suburban HOA',
        value: '$1,500–$3,700+',
        note: 'PCS timing and cross-river pairs trend up',
      },
      {
        label: '3–4+ BR (PCS / historic / interstate)',
        value: '$2,100–$5,800+',
        note: 'Hard-date military and SC interstate legs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$160+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, military & event intelligence',
    intro:
      'Richmond peaks follow PCS cycles, medical hiring waves, school calendars, and major Augusta events — not Atlanta north-metro lease culture alone.',
    items: [
      {
        title: 'Military PCS waves',
        detail:
          'Summer PCS remains heavy; mid-month order clusters can exhaust crews. Book as soon as orders are firm and clarify storage needs.',
      },
      {
        title: 'Masters and major event windows',
        detail:
          'Tournament week and large downtown events worsen core access. Avoid non-essential downtown moves when flexible.',
      },
      {
        title: 'School & family summer weekends',
        detail:
          'Suburban SFH demand rises with term calendars. Mid-week early starts are the realistic backups.',
      },
      {
        title: 'Heat season labor planning',
        detail:
          'Early starts and hydration breaks matter for historic stairs and unshaded suburban lots.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Beat medical peaks and heat. Still honor HOA and building windows where required.',
      },
    ],
  },
  specialized: [
    {
      id: 'military-pcs-augusta',
      title: 'Fort Eisenhower PCS & military-adjacent logistics',
      intro:
        'Augusta’s defining seasonal capacity problem is often military timelines — not Atlanta tech lease turnovers.',
      bullets: [
        'Share report dates, temporary lodging plans, and partial-shipment needs with the estimate.',
        'Clarify whether the job is Georgia-only (DPS MCCD) or interstate FMCSA (including SC destinations).',
        'Ask for PCS documentation experience and storage-in-transit options before the final week.',
        'Build buffer for gate-adjacent traffic on military-edge residential streets.',
        'Confirm weight tickets and inventory standards if required by orders or third-party coordinators.',
      ],
    },
    {
      id: 'medical-river-csra',
      title: 'Medical corridors, river crossings & CSRA regional module',
      intro:
        'Hospital campuses and Savannah River pairs create a second product line distinct from pure suburban HOA moves.',
      bullets: [
        'Avoid peak clinic arrival windows for medical-adjacent multifamily when flexible.',
        'Name both Georgia and South Carolina addresses clearly when the pair crosses the river.',
        'Verify FMCSA authority before deposit on any interstate leg.',
        'Price downtown historic access separately from south/west suburban HOA product.',
        'Watch Masters and major event calendars for core staging feasibility.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Richmond County?',
    intro:
      'Augusta is a standalone regional metro — military, medical, and CSRA lifestyle choices differ sharply from Atlanta suburbs. Pick the pocket first, then validate commute, schools, and whether SC is part of your daily pattern.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Richmond County School System and private options serve families. Match every listing to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before neighborhood brand',
            detail:
              'Use official boundary tools. “West Augusta” or “southside” marketing can span multiple feeders.',
          },
          {
            title: 'Military family transitions',
            detail:
              'PCS calendars often force mid-year entries — confirm registration documents early.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Augusta University and other campuses shape rental demand and traffic near academic/medical edges.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Georgia DOE data should lead; third-party rankings are secondary only.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Regional medical destination',
            detail:
              'Augusta is a healthcare hub. Map ER and specialty drive times including campus congestion.',
          },
          {
            title: 'Military healthcare context',
            detail:
              'Active-duty and veteran households should confirm TRICARE network and base clinic logistics alongside civilian systems.',
          },
          {
            title: 'CSRA cross-river access',
            detail:
              'Some households use providers on both sides of the river — test bridge timing for appointments.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Augusta price ladder (not Atlanta comps)',
            detail:
              'Compare Richmond pockets to other CSRA options, not north-metro Atlanta. Historic, military-edge, and suburban product price differently.',
          },
          {
            title: 'Stock variety',
            detail:
              'Historic renovations, medical-adjacent rentals, base-edge apartments, and HOA SFH each change move-day access.',
          },
          {
            title: 'SC alternative consideration',
            detail:
              'Some households compare North Augusta/Aiken pricing — remember interstate move rules if you cross the line.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Downtown / historic urban',
            detail:
              'Riverfront energy and older architecture — parking and event tradeoffs included.',
          },
          {
            title: 'Medical / university adjacent',
            detail:
              'Short campus commutes and rental density — shift traffic is part of daily life.',
          },
          {
            title: 'Military-adjacent living',
            detail:
              'Orders convenience and PCS churn shape neighborhood rhythms near Fort Eisenhower edges.',
          },
          {
            title: 'South/west suburban family',
            detail:
              'HOA tracts and longer corridor drives; more classic family-suburb product within the Augusta metro.',
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
              'Military/cyber missions, healthcare, manufacturing, education, and regional services are major themes — not Atlanta corporate sprawl.',
          },
          {
            title: 'CSRA commute reality',
            detail:
              'River bridges, Washington Road-style arterials, and campus peaks set times more than interstate-only thinking.',
          },
          {
            title: 'Cross-state work patterns',
            detail:
              'Jobs and housing often mix GA/SC. Factor bridge timing and two-state tax/commute assumptions carefully.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Regional river city culture',
            detail:
              'Augusta’s food, arts, golf heritage, and riverfront recreation define lifestyle more than Atlanta suburb amenity kits.',
          },
          {
            title: 'Heat & humidity',
            detail:
              'Hot summers favor early move starts. Plan shade and hydration for historic stairs and open lots.',
          },
          {
            title: 'Event-week energy',
            detail:
              'Major tournaments and festivals bring visitors and traffic — plan housing and move dates with the calendar open.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Richmond County resources',
    intro:
      'Official links and licensing notes — military timelines, county services, and Georgia DPS MCCD credentials change; verify before move day.',
    items: [
      {
        label: 'Augusta-Richmond County consolidated government',
        href: 'https://www.augustaga.gov/',
        note: 'City-county services and public information',
        external: true,
      },
      {
        label: 'Richmond County School System',
        href: 'https://www.rcboe.org/',
        external: true,
      },
      {
        label: 'Fort Eisenhower',
        href: 'https://home.army.mil/eisenhower/',
        note: 'Installation context for PCS-adjacent logistics',
        external: true,
      },
      {
        label: 'Augusta University Health',
        href: 'https://www.augustahealth.org/',
        note: 'Medical corridor context',
        external: true,
      },
      {
        label: 'Georgia DPS — Department of Public Safety',
        href: 'https://dps.georgia.gov/',
        note: 'MCCD / intrastate household goods mover context',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines (including SC)',
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
    'Filter by zone (Downtown/Historic, Medical corridors, Military edges, South/West suburbs, River/SC edge). Confirm PCS timelines, SC interstate needs, and Georgia DPS MCCD vs FMCSA authority.',
  lastReviewed: '2026-07-23',
};
