import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Muscogee County, Georgia moving intelligence.
 * Columbus, military, western Georgia regional hub — not Atlanta metro.
 */
export const muscogeeCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'muscogee',
  hubTitle: 'Muscogee County Moving Intelligence Hub',
  eyebrow: 'Muscogee · Columbus · Western Georgia military & regional hub',
  h1: 'Moving in Muscogee County: Columbus Core, Military PCS & Western Georgia Access',
  heroOpener:
    'Muscogee County is western Georgia’s Columbus metro — not an Atlanta suburb and not a coastal tourism district. Fort Moore (formerly Fort Benning) PCS waves, Chattahoochee river-city streets, Alabama cross-border pairs, midtown and historic stock, and suburban belts toward Midland define the work. A “local” move can mean a Uptown elevator one day and a hard-date military household the next. This guide is built for Columbus realities — infantry/Airborne timelines, river-city access, and western GA regional logistics — not a Henry County HOA overflow script or a Savannah square.',
  heroCredibility:
    'Georgia DPS MCCD for intrastate household goods · FMCSA for interstate legs · Columbus military & western GA regional awareness · Curated directory listings',
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
    title: 'What makes moving in Muscogee County different',
    intro:
      'Military PCS calendars, Columbus river-city geography, and Georgia–Alabama border pairs define estimates here — not Atlanta south-metro growth culture.',
    bullets: [
      {
        title: 'Columbus is a standalone western GA metro',
        detail:
          'Crew networks, traffic, and pricing follow the Chattahoochee valley — not I-75 Clayton/Henry patterns. Do not transplant Atlanta overflow assumptions onto Muscogee addresses.',
      },
      {
        title: 'Fort Moore PCS is the capacity driver',
        detail:
          'Training and permanent-party cycles create hard report dates, partial shipments, and storage needs. PCS-fluent crews outperform generic “local movers” marketing during peak orders seasons.',
      },
      {
        title: 'Alabama pairs flip the job to interstate',
        detail:
          'Phenix City and other AL destinations are minutes away but legally interstate. FMCSA authority matters as soon as the state line is crossed.',
      },
      {
        title: 'Uptown / historic vs suburban Midland product',
        detail:
          'River-adjacent and midtown stock means tighter streets and stairs; northern suburban belts flip to HOA cul-de-sacs and longer arterial hauls under one county name.',
      },
      {
        title: 'Military-adjacent rental churn is constant',
        detail:
          'Apartment and modest SFH turnover near installation edges compresses month-end calendars year-round — not only in civilian summer peaks.',
      },
      {
        title: 'Regional medical and education anchors',
        detail:
          'Hospital campuses and colleges shape traffic and lease cycles in specific belts that pure suburban playbooks miss.',
      },
      {
        title: 'Heat, humidity & western GA summer peaks',
        detail:
          'Hot summers punish late starts on open lots and long outdoor carries. Early mid-week windows remain the value play for large SFH inventories.',
      },
      {
        title: 'Georgia DPS MCCD vs FMCSA authority',
        detail:
          'Intrastate Georgia household moves are generally under Georgia DPS MCCD. Any Alabama-bound or other interstate leg needs active FMCSA USDOT (and usually MC) authority — verify the legal name on the estimate.',
      },
    ],
  },
  zonesHeading: 'Muscogee County zones: Columbus core, military edges & northern suburbs',
  zonesIntro:
    'Price Uptown/midtown, Fort Moore-adjacent areas, south/east Columbus, Midland/north suburbs, and AL border pairs as separate access and authority products.',
  zones: [
    {
      id: 'uptown-midtown',
      name: 'Uptown Columbus, midtown & river-city core',
      shortName: 'Uptown / Midtown',
      neighborhoods: [
        'Uptown Columbus',
        'Midtown residential',
        'Riverfront / riverwalk edges',
        'Historic and renovated core stock',
        'Urban multifamily and loft product',
      ],
      housingTypes:
        'Historic SFH, renovated midtown homes, lofts, mid-rises, denser street grids',
      challenges: [
        'Limited curb staging downtown',
        'Stairs and older interiors',
        'Elevator/COI rules in multifamily',
        'Event and riverfront visitor traffic',
      ],
      moverTips:
        'Prefer early mid-week starts in the core. Confirm elevator reservations. Inventory stairs and long carries before sizing the truck.',
      cityKeywords: [
        'uptown',
        'midtown columbus',
        'downtown columbus',
        'columbus',
      ],
    },
    {
      id: 'fort-moore-edge',
      name: 'Fort Moore (Fort Benning) military-adjacent areas',
      shortName: 'Military edges',
      neighborhoods: [
        'Fort Moore / Fort Benning adjacent',
        'Military family housing edges',
        'PCS rental corridors',
        'Gate-approach residential',
        'South/east installation-influenced tracts',
      ],
      housingTypes:
        'Base-adjacent multifamily, modest SFH, temporary lodging turnovers, family rentals',
      challenges: [
        'Hard report dates and partial shipments',
        'Gate and training-related traffic patterns',
        'High lease-end clusters around orders',
        'Mix of intrastate and interstate authority needs',
      ],
      moverTips:
        'Confirm report dates, storage-in-transit, and GA-only vs AL/interstate destinations. Prefer PCS-experienced crews with documentation fluency.',
      cityKeywords: [
        'fort moore',
        'fort benning',
        'military',
        'pcs',
        'benning',
      ],
    },
    {
      id: 'south-east-columbus',
      name: 'South & east Columbus residential belts',
      shortName: 'South / East',
      neighborhoods: [
        'South Columbus residential',
        'East Columbus corridors',
        'Working-community SFH belts',
        'Multifamily arterial edges',
        'Industrial-adjacent residential pockets',
      ],
      housingTypes:
        'SFH, duplexes, garden apartments, commercial-edge residential',
      challenges: [
        'Varied driveway and parking quality',
        'Freight and industrial traffic windows',
        'Heat exposure on open lots',
        'Cross-zone pairs into Uptown or Midland',
      ],
      moverTips:
        'Share access photos for tight courts. Build buffer for industrial mid-day traffic. Inventory sheds and long carries on older lots.',
      cityKeywords: [
        'south columbus',
        'east columbus',
        'muscogee',
      ],
    },
    {
      id: 'midland-north',
      name: 'Midland, north Muscogee & suburban growth',
      shortName: 'Midland / North',
      neighborhoods: [
        'Midland',
        'North Columbus suburbs',
        'HOA family subdivisions',
        'Townhome and retail corridor edges',
        'Northern growth tracts',
      ],
      housingTypes:
        'Suburban SFH, townhomes, HOA planned communities, some multifamily',
      challenges: [
        'HOA COI and approved-hour rules',
        'Full family inventories on summer weekends',
        'Long empty miles to Fort Moore edges',
        'School-zone timing on family streets',
      ],
      moverTips:
        'Send HOA packets with the estimate. Price Midland ↔ military-edge pairs as long locals. Early starts beat heat and school peaks.',
      cityKeywords: [
        'midland',
        'north columbus',
        'northern muscogee',
      ],
    },
    {
      id: 'alabama-border',
      name: 'Chattahoochee border & Alabama approach pairs',
      shortName: 'AL border',
      neighborhoods: [
        'River border residential edges',
        'Phenix City approach corridors',
        'Bridge-dependent pairs',
        'Western Columbus border streets',
        'Cross-state CSRA-west logistics',
      ],
      housingTypes:
        'Mix of GA-side SFH/multifamily with frequent AL destinations',
      challenges: [
        'Interstate licensing as soon as AL is involved',
        'Bridge and border arterial timing',
        'Two-state address and estimate clarity',
        'PCS households often land on either side of the river',
      ],
      moverTips:
        'State clearly if destination is Alabama. Verify FMCSA before deposit. Build bridge buffers and name both cities on the estimate.',
      cityKeywords: [
        'phenix city',
        'alabama',
        'chattahoochee',
        'border',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Muscogee County',
    intro:
      'PCS hard dates, core staging, HOA suburbs, and Alabama interstate legs move the needle more than pure bedroom count.',
    drivers: [
      {
        title: 'Military report-date premiums',
        detail:
          'Hard PCS windows and last-week availability constraints can price higher than flexible civilian moves.',
      },
      {
        title: 'Uptown / historic staging labor',
        detail:
          'Limited curb, stairs, and elevators add labor vs open suburban lots in Midland.',
      },
      {
        title: 'Cross-border interstate authority',
        detail:
          'Alabama-bound pairs need FMCSA-qualified carriers and honest bridge portal time.',
      },
      {
        title: 'Military-edge to north-suburb distance',
        detail:
          'Fort Moore-adjacent ↔ Midland pairs burn empty miles that “Columbus local” labels hide.',
      },
      {
        title: 'HOA suburban rules',
        detail:
          'Northern planned communities restrict hours and require paperwork that compresses calendars.',
      },
      {
        title: 'Summer heat labor planning',
        detail:
          'Heat-safe packing and early starts can add labor or multi-day splits on large inventories.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,000+',
        note: 'Higher with elevators, Uptown staging, or peak PCS windows',
      },
      {
        label: '2–3BR house / suburban HOA',
        value: '$1,450–$3,600+',
        note: 'Military-edge to Midland pairs trend up',
      },
      {
        label: '3–4+ BR (PCS / interstate / core access)',
        value: '$2,000–$5,600+',
        note: 'Hard-date military and AL interstate legs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$155+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, military & heat intelligence',
    intro:
      'Muscogee peaks follow Fort Moore PCS cycles, school calendars, and western Georgia heat — not Atlanta overflow or coastal tourism alone.',
    items: [
      {
        title: 'Military PCS waves',
        detail:
          'Summer PCS remains heavy; training calendars can add shoulder peaks. Book as soon as orders are firm and clarify storage needs.',
      },
      {
        title: 'School & family summer weekends',
        detail:
          'Midland and suburban SFH demand rises with term calendars. Mid-week early starts are the realistic backups.',
      },
      {
        title: 'Month-end military rental clusters',
        detail:
          'Lease ends near the installation stack with civilian closings. Reserve loading slots early for multifamily.',
      },
      {
        title: 'Heat season labor planning',
        detail:
          'Early starts and hydration breaks matter for open lots, stairs, and long outdoor carries.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Beat heat and school traffic. Still honor HOA and building windows where required.',
      },
    ],
  },
  specialized: [
    {
      id: 'fort-moore-pcs',
      title: 'Fort Moore PCS & military-adjacent logistics',
      intro:
        'Columbus capacity is often defined by orders timelines — a western Georgia specialty distinct from Atlanta civilian lease cycles.',
      bullets: [
        'Share report dates, temporary lodging plans, and partial-shipment needs with the estimate.',
        'Clarify Georgia-only (DPS MCCD) vs Alabama/interstate (FMCSA) destinations up front.',
        'Ask for PCS documentation experience and storage-in-transit options before the final week.',
        'Build buffer for gate-adjacent and training-related traffic patterns.',
        'Confirm inventory and weight requirements if third-party coordinators are involved.',
      ],
    },
    {
      id: 'river-city-border-suburbs',
      title: 'River-city core, AL border & northern suburb module',
      intro:
        'Uptown access, Alabama pairs, and Midland HOAs are three products that generic “Columbus movers” marketing often flattens.',
      bullets: [
        'Walk or photo-survey Uptown/midtown staging before final quote on historic and loft stock.',
        'Name both GA and AL cities when the pair crosses the Chattahoochee; verify FMCSA before deposit.',
        'Send HOA packets early for Midland and north suburban planned communities.',
        'Price Fort Moore-edge ↔ Midland as a long local with honest portal time.',
        'Prefer early starts in heat season for open-lot suburban and outdoor military-edge inventories.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Muscogee County?',
    intro:
      'Columbus is a western Georgia regional hub — military, river-city, and suburban choices differ from Atlanta. Pick the pocket first, then validate PCS logistics, schools, and whether Alabama is part of your daily pattern.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Muscogee County School District and private options serve families. Match every listing to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before neighborhood brand',
            detail:
              'Use official boundary tools. Midland and south Columbus marketing can span multiple feeders.',
          },
          {
            title: 'Military family transitions',
            detail:
              'PCS calendars often force mid-year entries — confirm registration documents early.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Columbus State University and other campuses shape rental demand and traffic near academic edges.',
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
            title: 'Regional acute-care anchors',
            detail:
              'Piedmont Columbus Regional, St. Francis-Emory, and other facilities serve the metro. Map ER drive times from Midland and military edges.',
          },
          {
            title: 'Military healthcare context',
            detail:
              'Active-duty and veteran households should confirm TRICARE network and installation clinic logistics alongside civilian hospitals.',
          },
          {
            title: 'Cross-border care patterns',
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
            title: 'Columbus price ladder (not Atlanta comps)',
            detail:
              'Compare Muscogee pockets to other western GA / AL valley options, not north-metro Atlanta. Military-edge rentals and Midland SFH price differently.',
          },
          {
            title: 'Stock variety',
            detail:
              'Uptown renovations, base-edge apartments, southside working stock, and northern HOAs each change move-day access.',
          },
          {
            title: 'Alabama alternative consideration',
            detail:
              'Phenix City comparisons are common — remember interstate move rules if you cross the line.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Uptown / midtown river city',
            detail:
              'Dining, events, and denser streets — with parking and older-home tradeoffs.',
          },
          {
            title: 'Military-adjacent living',
            detail:
              'Orders convenience and PCS churn near Fort Moore edges shape neighborhood rhythms.',
          },
          {
            title: 'South/east practical residential',
            detail:
              'More working-community and multifamily options with industrial-edge influences.',
          },
          {
            title: 'Midland / north suburban family',
            detail:
              'HOA tracts and newer product — longer hauls to the installation and some core jobs.',
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
              'Military, healthcare, manufacturing, education, logistics, and regional services are major themes — not Atlanta corporate sprawl.',
          },
          {
            title: 'Valley commute reality',
            detail:
              'Arterials between Midland, core, and installation edges set times more than interstate-only thinking.',
          },
          {
            title: 'Cross-state work patterns',
            detail:
              'Jobs and housing often mix GA/AL. Factor bridge timing and two-state assumptions carefully.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'River-city western Georgia living',
            detail:
              'Chattahoochee recreation, Uptown energy, and regional arts define lifestyle differently from Atlanta suburb kits.',
          },
          {
            title: 'Heat & humidity',
            detail:
              'Hot summers require early-move starts and flexible outdoor labor plans on large homes.',
          },
          {
            title: 'Military community rhythm',
            detail:
              'PCS seasons and installation events shape local tempo — plan housing and move dates with that calendar open.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Muscogee County resources',
    intro:
      'Official links and licensing notes — military timelines, county services, and Georgia DPS MCCD credentials change; verify before move day.',
    items: [
      {
        label: 'Columbus Consolidated Government',
        href: 'https://www.columbusga.gov/',
        note: 'City-county services and public information',
        external: true,
      },
      {
        label: 'Muscogee County School District',
        href: 'https://www.muscogee.k12.ga.us/',
        external: true,
      },
      {
        label: 'Fort Moore',
        href: 'https://www.benning.army.mil/',
        note: 'Installation context for PCS-adjacent logistics',
        external: true,
      },
      {
        label: 'Columbus Convention & Visitors Bureau',
        href: 'https://visitcolumbusga.com/',
        note: 'Regional context and event awareness',
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
        note: 'Required when the move crosses state lines (including AL)',
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
    'Filter by zone (Uptown/Midtown, Military edges, South/East, Midland/North, AL border). Confirm PCS timelines, Alabama interstate needs, and Georgia DPS MCCD vs FMCSA authority.',
  lastReviewed: '2026-07-23',
};
