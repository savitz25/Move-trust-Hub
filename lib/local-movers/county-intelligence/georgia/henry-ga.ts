import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Henry County, Georgia moving intelligence.
 * South-metro growth, family suburbs, Atlanta overflow — not airport-edge Clayton or coastal Savannah.
 */
export const henryCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'henry',
  hubTitle: 'Henry County Moving Intelligence Hub',
  eyebrow: 'Henry · South metro growth · Family suburbs & Atlanta overflow',
  h1: 'Moving in Henry County: South-Metro Growth, Family Suburbs & Atlanta Overflow',
  heroOpener:
    'Henry County is Atlanta’s south-metro growth belt — McDonough and Stockbridge family tracts, Locust Grove and Hampton expansion, I-75 corridor living, and HOA cul-de-sacs absorbing overflow from higher-priced in-town and north-metro markets. A “local” move often means a full household inventory between master-planned streets, not a downtown elevator. This guide is built for Henry realities — growth traffic, school-driven calendars, and long south-metro hauls — not a Buckhead high-rise script or a Savannah historic lane.',
  heroCredibility:
    'Georgia DPS MCCD for intrastate household goods · FMCSA for interstate legs · South-metro growth & family-suburb awareness · Curated directory listings',
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
    title: 'What makes moving in Henry County different',
    intro:
      'Rapid south-metro growth, family HOA product, and I-75 dependence define estimates here more than urban core density or coastal tourism constraints.',
    bullets: [
      {
        title: 'Atlanta overflow is the demand engine',
        detail:
          'Households trading up from denser or pricier metro pockets fill Henry subdivisions. Peak seasons mean full SFH inventories, not studio apartment turnovers alone.',
      },
      {
        title: 'I-75 is the county’s spine — and bottleneck',
        detail:
          'McDonough, Stockbridge, Locust Grove, and Hampton pairs often live or die on I-75 timing. Peak freights and commute waves erase optimistic ETAs.',
      },
      {
        title: 'HOA master plans rewrite truck access',
        detail:
          'Gate lists, approved hours, street parking bans, and COI requirements are common in newer communities. Paperwork delays can cost more than map miles.',
      },
      {
        title: 'Family calendars drive the booking curve',
        detail:
          'School start, spring sports, and summer weekends set capacity. Mid-month mid-week remains the value window when dates are flexible.',
      },
      {
        title: 'Growth construction adds staging friction',
        detail:
          'Active building sites, unfinished streets, and temporary access rules appear on outer edges. Confirm truck routes before load day.',
      },
      {
        title: 'Cross-county south-metro pairs are normal',
        detail:
          'Henry ↔ Clayton, Rockdale, Newton, Spalding, and Fulton legs are routine. Price portal-to-portal honesty — not a flat “south Atlanta” rate.',
      },
      {
        title: 'Suburban volume, not elevator culture',
        detail:
          'Two-story SFH, garages, sheds, and attic stock dominate. Long driveway carries and garage staging matter more than downtown dock reservations.',
      },
      {
        title: 'Georgia DPS MCCD vs FMCSA authority',
        detail:
          'Intrastate Georgia household moves are generally under Georgia DPS MCCD frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority — match the estimate legal name to the correct registry.',
      },
    ],
  },
  zonesHeading: 'Henry County zones: growth corridors, family cores & I-75 towns',
  zonesIntro:
    'Price McDonough, Stockbridge, Locust Grove, Hampton, and outer growth edges as separate access and traffic products — not one “Henry County local” card.',
  zones: [
    {
      id: 'mcdonough-core',
      name: 'McDonough core & county-seat residential',
      shortName: 'McDonough',
      neighborhoods: [
        'McDonough',
        'Historic square edges',
        'County-seat service corridors',
        'Interior family subdivisions',
        'North McDonough residential belts',
      ],
      housingTypes:
        'SFH (older and newer), townhomes, some multifamily near arterials',
      challenges: [
        'Mix of older streets and new HOA tracts',
        'School-zone and event traffic near the core',
        'I-75 access timing for cross-zone jobs',
        'Full family inventories on summer weekends',
      ],
      moverTips:
        'Confirm HOA rules when the address is in a gated or planned community. Early mid-week starts beat school and I-75 peaks. Inventory sheds and garages up front.',
      cityKeywords: [
        'mcdonough',
        'henry',
      ],
    },
    {
      id: 'stockbridge',
      name: 'Stockbridge & northwest Henry corridors',
      shortName: 'Stockbridge',
      neighborhoods: [
        'Stockbridge',
        'Eagle’s Landing influence',
        'Northwest Henry subdivisions',
        'Clayton County approach corridors',
        'Retail arterial residential edges',
      ],
      housingTypes:
        'Suburban SFH, golf/HOA communities, townhomes, corridor apartments',
      challenges: [
        'HOA COI and approved-hour rules',
        'Peak arterial congestion near retail nodes',
        'Cross-county pairs into Clayton/Fulton',
        'High family-inventory volume',
      ],
      moverTips:
        'Send HOA packets with the estimate. Treat Stockbridge ↔ north-metro destinations as long locals. Prefer early starts on I-75-dependent pairs.',
      cityKeywords: [
        'stockbridge',
        'eagles landing',
        "eagle's landing",
      ],
    },
    {
      id: 'locust-grove',
      name: 'Locust Grove & southern growth edge',
      shortName: 'Locust Grove',
      neighborhoods: [
        'Locust Grove',
        'Southern Henry growth tracts',
        'I-75 south residential belts',
        'Newer master-planned pockets',
        'Outlet / retail corridor edges',
      ],
      housingTypes:
        'Newer SFH, townhomes, some larger lots on outer edges',
      challenges: [
        'Construction traffic on growth edges',
        'Long empty miles to north-metro destinations',
        'HOA gate and truck-size rules',
        'I-75 freight peaks',
      ],
      moverTips:
        'Price distance explicitly for Locust Grove ↔ Stockbridge or Clayton pairs. Confirm unfinished-street access. Book early for summer SFH peaks.',
      cityKeywords: [
        'locust grove',
        'south henry',
      ],
    },
    {
      id: 'hampton-lovejoy-edge',
      name: 'Hampton, Lovejoy edge & western approaches',
      shortName: 'Hampton / west',
      neighborhoods: [
        'Hampton',
        'Lovejoy edge influence',
        'Western Henry residential',
        'Spalding approach corridors',
        'Rural-suburban transition streets',
      ],
      housingTypes:
        'SFH, some acreage lots, townhomes, small multifamily pockets',
      challenges: [
        'Longer rural-edge driveways',
        'Mixed paved and soft shoulders',
        'Cross-county pairs into Spalding/Clayton',
        'Limited shaded staging in heat',
      ],
      moverTips:
        'Share driveway photos and truck turnaround notes. Inventory outbuildings and long carries. Early starts help heat and school traffic.',
      cityKeywords: [
        'hampton',
        'lovejoy',
        'west henry',
      ],
    },
    {
      id: 'east-henry-growth',
      name: 'East Henry growth & Ola / rural-suburban pockets',
      shortName: 'East Henry',
      neighborhoods: [
        'Ola area',
        'East Henry subdivisions',
        'Rural-suburban transition lots',
        'Newton County approach edges',
        'Outer family tracts',
      ],
      housingTypes:
        'SFH on larger lots, newer subdivisions, some farmette-style properties',
      challenges: [
        'Longer last-mile on secondary roads',
        'Septic/well properties with limited staging pads',
        'School-bus timing on two-lane roads',
        'Distance premiums to I-75 towns',
      ],
      moverTips:
        'Confirm road width and turnaround for large trucks. Budget extra labor for long driveway carries. Price east-edge ↔ I-75-core pairs honestly.',
      cityKeywords: [
        'ola',
        'east henry',
        'mcdonough east',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Henry County',
    intro:
      'HOA rules, full family inventories, I-75 time, and growth-edge access move the needle more than pure bedroom count.',
    drivers: [
      {
        title: 'HOA paperwork & hour restrictions',
        detail:
          'Gate lists, COIs, and approved windows compress schedule options and can force multi-day plans on large homes.',
      },
      {
        title: 'I-75 portal-to-portal distance',
        detail:
          'Locust Grove ↔ Stockbridge, Hampton ↔ McDonough, and Henry ↔ Clayton pairs burn empty miles at peak.',
      },
      {
        title: 'Full SFH inventory volume',
        detail:
          'Attics, garages, sheds, and two-story carries dominate overflow family moves — packing labor scales quickly.',
      },
      {
        title: 'Growth construction friction',
        detail:
          'Unfinished streets and temporary access can add shuttle or long-carry labor on outer tracts.',
      },
      {
        title: 'Summer family demand premiums',
        detail:
          'School calendars fill weekend crews first; hard dates near term start price higher than flexible mid-week jobs.',
      },
      {
        title: 'Cross-county metro overflow legs',
        detail:
          'In-migration from other Atlanta counties often means long locals — document both addresses on the estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,050+',
        note: 'Higher with apartment rules or peak I-75 windows',
      },
      {
        label: '2–3BR house / HOA suburb',
        value: '$1,600–$3,900+',
        note: 'Full inventories and cross-zone pairs trend up',
      },
      {
        label: '3–4+ BR (growth edge / cross-county)',
        value: '$2,200–$5,800+',
        note: 'Long I-75 and multi-story family homes price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$160+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & school-calendar intelligence',
    intro:
      'Henry peaks follow family school calendars, summer overflow migration, and I-75 holiday travel — not coastal tourism or military PCS alone.',
    items: [
      {
        title: 'School-driven summer peak',
        detail:
          'May–August SFH demand is strongest. Book as soon as the closing date is firm; mid-week is the realistic backup.',
      },
      {
        title: 'Month-end lease & closing clusters',
        detail:
          'Closings and apartment turnovers stack on the same weekends as family moves. Reserve HOA windows early.',
      },
      {
        title: 'Holiday I-75 travel waves',
        detail:
          'Major holiday weekends worsen interstate timing. Prefer non-holiday mid-week for long corridor hauls when flexible.',
      },
      {
        title: 'Heat season labor planning',
        detail:
          'Early starts and hydration breaks matter for two-story and outdoor garage/shed inventories.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Beat school traffic and I-75 peaks. Still honor HOA weekday rules where required.',
      },
    ],
  },
  specialized: [
    {
      id: 'hoa-family-suburb',
      title: 'HOA family-suburb & full-inventory logistics',
      intro:
        'Henry’s core product is often a gated or planned-community SFH with garage, attic, and shed volume — not a downtown elevator move.',
      bullets: [
        'Collect HOA COI, gate codes, and approved hours with the estimate — not the morning of the move.',
        'Inventory attics, garages, sheds, and outdoor equipment before sizing crew and truck.',
        'Plan long driveway carries and limited street parking common in cul-de-sac tracts.',
        'Prefer early starts for heat and school-zone streets.',
        'Photograph access constraints for large trailers in tight planned communities.',
      ],
    },
    {
      id: 'growth-i75-overflow',
      title: 'South-metro growth, I-75 & Atlanta overflow module',
      intro:
        'In-migration, construction edges, and interstate dependence create a second product line distinct from mature in-town Atlanta moves.',
      bullets: [
        'Price portal-to-portal time for any I-75-dependent pair, especially Locust Grove ↔ northern Henry or Clayton.',
        'Name origin and destination towns on the estimate — “Henry local” is too vague.',
        'Confirm construction-zone and unfinished-street access on growth-edge addresses.',
        'Clarify whether overflow moves are same-county or long metro locals into Fulton/DeKalb.',
        'Build buffer for retail and outlet-corridor traffic near southern growth nodes.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Henry County?',
    intro:
      'Family space, south-metro value relative to many closer-in markets, and I-75 access are the usual draws — pick the town first, then validate schools, HOAs, and commute.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Henry County Schools covers the county with multiple high-school clusters. Attendance zones are a primary housing filter for many families.',
        bullets: [
          {
            title: 'Zone before subdivision brand',
            detail:
              'Use official boundary tools. Master-planned marketing names often span more than one feeder pattern.',
          },
          {
            title: 'Summer move pressure',
            detail:
              'Families targeting a clean school-year start book early — crew capacity tightens by late spring.',
          },
          {
            title: 'Private & extracurricular load',
            detail:
              'Sports and activity calendars shape after-school traffic; test neighborhood streets at pickup times.',
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
            title: 'South-metro hospital access',
            detail:
              'Piedmont Henry and other regional facilities serve local households. Map ER drive times including I-75 delays.',
          },
          {
            title: 'Atlanta specialty care',
            detail:
              'Some specialty appointments still pull north — test peak routes from McDonough, Stockbridge, or Locust Grove.',
          },
          {
            title: 'Growth-edge response times',
            detail:
              'Outer tracts can mean longer drives to acute care; factor real miles on secondary roads.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Overflow value proposition',
            detail:
              'Many buyers choose Henry for more house per dollar than closer-in or north-metro options — compare HOA dues, taxes, and commute costs.',
          },
          {
            title: 'Stock profile',
            detail:
              'Newer master plans dominate growth edges; older in-town McDonough stock and rural-edge lots remain distinct products.',
          },
          {
            title: 'HOA living tradeoffs',
            detail:
              'Amenities and standards come with rules that affect move day, parking, and exterior projects.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'McDonough county-seat balance',
            detail:
              'Mix of historic edges and family subdivisions with civic services nearby.',
          },
          {
            title: 'Stockbridge / northwest access',
            detail:
              'Closer to Clayton and some northbound commutes; HOA and retail-corridor living.',
          },
          {
            title: 'Locust Grove growth lifestyle',
            detail:
              'Newer product and southern I-75 living — longer hauls to many metro job centers.',
          },
          {
            title: 'Hampton / east rural-suburban',
            detail:
              'More lot size and quieter streets — with secondary-road and distance tradeoffs.',
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
              'Logistics/distribution, retail, healthcare, education, and light industrial along south-metro corridors are major themes.',
          },
          {
            title: 'I-75 commute reality',
            detail:
              'Northbound peaks toward Atlanta and airport-area jobs set daily times more than map miles. Test your actual pair.',
          },
          {
            title: 'Hybrid & remote hybrids',
            detail:
              'Remote-friendly households still need realistic in-office day plans on I-75 — especially from Locust Grove and east edges.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Family-suburb living',
            detail:
              'Parks, youth sports, and subdivision amenities define many pockets — weekend street parking can be tight on game days.',
          },
          {
            title: 'Heat & humidity',
            detail:
              'Hot summers favor early move starts. Plan shade and hydration for large outdoor inventories.',
          },
          {
            title: 'Growth-town rhythm',
            detail:
              'New retail and housing keep some corridors active; quieter rural-suburban edges feel different within the same county.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Henry County resources',
    intro:
      'Official links and licensing notes — county services, schools, and Georgia DPS MCCD credentials change; verify before move day.',
    items: [
      {
        label: 'Henry County government',
        href: 'https://www.henrycountyga.gov/',
        note: 'County services and public information',
        external: true,
      },
      {
        label: 'City of McDonough',
        href: 'https://www.mcdonoughga.org/',
        external: true,
      },
      {
        label: 'City of Stockbridge',
        href: 'https://www.cityofstockbridge.com/',
        external: true,
      },
      {
        label: 'City of Locust Grove',
        href: 'https://www.locustgrove-ga.gov/',
        external: true,
      },
      {
        label: 'City of Hampton',
        href: 'https://www.hamptonga.gov/',
        external: true,
      },
      {
        label: 'Henry County Schools',
        href: 'https://schoolwires.henry.k12.ga.us/',
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
        note: 'Required when the move crosses state lines',
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
    'Filter by zone (McDonough, Stockbridge, Locust Grove, Hampton/west, East Henry). Confirm HOA rules, I-75 windows, and Georgia DPS MCCD vs FMCSA authority.',
  lastReviewed: '2026-07-23',
};
