import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Hall County, Georgia moving intelligence.
 * Gainesville / Lake Lanier, suburban-rural mix, NE Georgia gateway — not south-metro I-75 overflow.
 */
export const hallCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'hall',
  hubTitle: 'Hall County Moving Intelligence Hub',
  eyebrow: 'Hall · Gainesville · Lake Lanier & NE Georgia gateway',
  h1: 'Moving in Hall County: Gainesville, Lake Lanier Access & NE Georgia Gateway',
  heroOpener:
    'Hall County is Northeast Georgia’s gateway belt — Gainesville’s growing urban core, Lake Lanier shoreline and recreational edges, I-985 corridor suburbs, and rural-suburban tracts that still feel a world away from south-metro cul-de-sacs. A “local” move can mean a downtown Gainesville multifamily one day and a steep Lanier driveway the next. This guide is built for Hall realities — lake access, poultry-and-industry edges, and mountain-direction gateways — not an Atlanta airport script or a coastal historic district.',
  heroCredibility:
    'Georgia DPS MCCD for intrastate household goods · FMCSA for interstate legs · Lake Lanier & NE Georgia gateway awareness · Curated directory listings',
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
    title: 'What makes moving in Hall County different',
    intro:
      'Lake Lanier access, Gainesville density pockets, and NE Georgia corridor living define estimates here more than pure Atlanta-suburb overflow culture.',
    bullets: [
      {
        title: 'Lake Lanier is an access problem, not only a lifestyle perk',
        detail:
          'Shoreline and near-lake streets can mean grades, limited turnarounds, docks, boats, and seasonal visitor traffic. Waterfront inventories need different labor than flat inland tracts.',
      },
      {
        title: 'Gainesville core vs rural-suburban edges',
        detail:
          'Downtown and mid-town multifamily, hospital-adjacent streets, and industrial edges differ sharply from Flowery Branch, Oakwood, and outer acreage lots under one county name.',
      },
      {
        title: 'I-985 / NE Georgia gateway traffic',
        detail:
          'The corridor toward Atlanta and the mountain-direction gateways create commute and weekend recreation waves. Peak times rewrite portal-to-portal estimates.',
      },
      {
        title: 'Industry and agriculture edges still matter',
        detail:
          'Poultry, manufacturing, and warehouse activity shape some residential approaches with freight traffic and non-standard shift patterns.',
      },
      {
        title: 'Suburban growth without pure south-metro sameness',
        detail:
          'Master-planned and HOA product exists, but Hall also keeps older in-town stock and true rural last-miles that Henry-style overflow counties may not.',
      },
      {
        title: 'Recreation seasonality around the lake',
        detail:
          'Summer weekends and holiday lake traffic worsen near-shore parking and two-lane approaches. Flexible dates beat fighting boat-ramp congestion.',
      },
      {
        title: 'Cross-county NE Georgia pairs',
        detail:
          'Hall ↔ Gwinnett, Forsyth, Jackson, and White legs are common. Price the full corridor — not a single “north Georgia local” rate without addresses.',
      },
      {
        title: 'Georgia DPS MCCD vs FMCSA authority',
        detail:
          'Intrastate Georgia household moves are generally under Georgia DPS MCCD frameworks. Interstate legs (including many mountain- and Carolina-bound hauls) need active FMCSA authority.',
      },
    ],
  },
  zonesHeading: 'Hall County zones: Gainesville core, Lanier edges & corridor towns',
  zonesIntro:
    'Price Gainesville core, Lake Lanier shoreline, Flowery Branch / Oakwood corridors, and outer rural-suburban pockets as separate access products.',
  zones: [
    {
      id: 'gainesville-core',
      name: 'Gainesville core, mid-town & hospital-adjacent',
      shortName: 'Gainesville core',
      neighborhoods: [
        'Downtown Gainesville',
        'Mid-town residential',
        'Hospital / medical corridor edges',
        'Square and civic core approaches',
        'Urban multifamily pockets',
      ],
      housingTypes:
        'Historic and mid-century SFH, multifamily, townhomes, medical-adjacent rentals',
      challenges: [
        'Tighter street grids and limited staging',
        'Medical and shift traffic near hospitals',
        'Older homes with stairs and narrow drives',
        'Event and downtown activity windows',
      ],
      moverTips:
        'Prefer early mid-week starts near the core. Confirm multifamily loading rules. Inventory stairs and long carries on older stock before sizing the truck.',
      cityKeywords: [
        'gainesville',
        'downtown gainesville',
        'hall',
      ],
    },
    {
      id: 'lake-lanier',
      name: 'Lake Lanier shoreline & recreational edges',
      shortName: 'Lake Lanier',
      neighborhoods: [
        'Lake Lanier shoreline communities',
        'Marina and cove edges',
        'Near-lake subdivisions',
        'Boat-storage adjacent residential',
        'Seasonal recreational corridors',
      ],
      housingTypes:
        'Waterfront and near-lake SFH, elevated homes, docks, some multifamily near recreation nodes',
      challenges: [
        'Grades, long driveways, and limited truck turnarounds',
        'Boats, docks, and outdoor equipment volume',
        'Summer weekend visitor congestion',
        'Weather and shoreline access sensitivity',
      ],
      moverTips:
        'Share driveway grade photos and turnaround notes. Inventory watercraft and dock gear separately. Avoid peak summer lake weekends when dates are flexible.',
      cityKeywords: [
        'lake lanier',
        'lanier',
        'marina',
        'flowery branch lake',
      ],
    },
    {
      id: 'flowery-branch-oakwood',
      name: 'Flowery Branch, Oakwood & I-985 corridor suburbs',
      shortName: 'Flowery Branch / Oakwood',
      neighborhoods: [
        'Flowery Branch',
        'Oakwood',
        'I-985 corridor subdivisions',
        'HOA family tracts',
        'Retail arterial residential edges',
      ],
      housingTypes:
        'Suburban SFH, townhomes, HOA planned communities, corridor multifamily',
      challenges: [
        'HOA COI and approved-hour rules',
        'I-985 peak commute waves',
        'Cross-county pairs toward Gwinnett',
        'Family summer inventory volume',
      ],
      moverTips:
        'Send HOA packets with the estimate. Treat Flowery Branch ↔ south Gwinnett as a long local. Early starts beat corridor peaks.',
      cityKeywords: [
        'flowery branch',
        'oakwood',
        'i-985',
      ],
    },
    {
      id: 'south-hall-growth',
      name: 'South Hall growth toward Gwinnett influence',
      shortName: 'South Hall',
      neighborhoods: [
        'South Hall residential belts',
        'Gwinnett approach corridors',
        'Newer subdivision pockets',
        'Mixed commercial-residential edges',
        'Growth construction zones',
      ],
      housingTypes:
        'Newer SFH, townhomes, some multifamily along growth corridors',
      challenges: [
        'Construction traffic and unfinished streets',
        'Atlanta-direction commute congestion',
        'HOA density on new tracts',
        'Long empty miles to far Lanier coves',
      ],
      moverTips:
        'Price south Hall ↔ Lanier shoreline pairs honestly. Confirm construction access. Book early for school-calendar peaks.',
      cityKeywords: [
        'south hall',
        'buford edge',
        'gwinnett',
      ],
    },
    {
      id: 'north-east-rural',
      name: 'North & east Hall rural-suburban gateway',
      shortName: 'North / East Hall',
      neighborhoods: [
        'North Hall communities',
        'East Hall rural-suburban lots',
        'Mountain-direction gateway edges',
        'Acreage and farmette properties',
        'Smaller unincorporated communities',
      ],
      housingTypes:
        'SFH on larger lots, rural driveways, some older farmhouses, limited multifamily',
      challenges: [
        'Long last-miles on secondary roads',
        'Soft shoulders and limited staging pads',
        'Outbuildings, equipment, and well/septic sites',
        'Distance premiums to Gainesville core',
      ],
      moverTips:
        'Confirm road width and truck turnaround. Inventory barns and outbuildings. Budget extra labor for long driveway carries.',
      cityKeywords: [
        'north hall',
        'east hall',
        'clermont',
        'lula',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Hall County',
    intro:
      'Lake grades, corridor distance, HOA rules, and rural last-miles move the needle more than pure bedroom count.',
    drivers: [
      {
        title: 'Lanier shoreline access complexity',
        detail:
          'Grades, docks, boats, and limited turnarounds add labor beyond inland suburban jobs.',
      },
      {
        title: 'I-985 / gateway portal time',
        detail:
          'South Hall ↔ Gainesville core and Hall ↔ Gwinnett pairs burn empty miles at peak.',
      },
      {
        title: 'HOA suburban soft costs',
        detail:
          'COIs, gate lists, and approved hours compress schedules in corridor planned communities.',
      },
      {
        title: 'Rural last-mile premiums',
        detail:
          'North/east acreage properties can require smaller trucks, shuttles, or long carries.',
      },
      {
        title: 'Summer lake & recreation peaks',
        detail:
          'Visitor traffic near shorelines can force longer days or flexible reschedule language.',
      },
      {
        title: 'Core multifamily vs edge SFH mix',
        detail:
          'Gainesville elevators/stairs and medical-corridor congestion differ from open suburban lots — price by pocket.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,050+',
        note: 'Higher with multifamily rules or peak corridor windows',
      },
      {
        label: '2–3BR house / suburban HOA',
        value: '$1,550–$3,800+',
        note: 'Lanier grades and cross-zone pairs trend up',
      },
      {
        label: '3–4+ BR (shoreline / rural / cross-county)',
        value: '$2,100–$5,800+',
        note: 'Waterfront access and long gateway hauls price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$160+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, lake & corridor intelligence',
    intro:
      'Hall peaks follow lake recreation weekends, school calendars, and NE Georgia corridor travel — not south-metro I-75 overflow alone.',
    items: [
      {
        title: 'Lake season weekends (late spring–early fall)',
        detail:
          'Shoreline and near-lake streets fill with visitors. Prefer weekday lake-area moves when flexible.',
      },
      {
        title: 'School & family summer peak',
        detail:
          'Suburban SFH demand rises May–August. Mid-week early starts are the realistic backups.',
      },
      {
        title: 'Holiday mountain & recreation traffic',
        detail:
          'Gateway corridors toward the mountains and lake can jam on major holidays — avoid when possible for long hauls.',
      },
      {
        title: 'Heat & humidity labor planning',
        detail:
          'Early starts matter for grades, outdoor docks, and unshaded rural drives.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Beat I-985 peaks and lake visitor waves. Still honor HOA weekday windows.',
      },
    ],
  },
  specialized: [
    {
      id: 'lanier-access',
      title: 'Lake Lanier shoreline & recreational access logistics',
      intro:
        'Water-adjacent Hall moves often fail generic suburban playbooks because of grades, boats, and seasonal congestion.',
      bullets: [
        'Photograph driveway grade, turnaround, and dock access before final crew sizing.',
        'Inventory watercraft, lifts, and outdoor recreational gear as separate line items when needed.',
        'Avoid peak summer lake weekends for shoreline streets when dates are flexible.',
        'Confirm whether full trailers can reach the pad or a shuttle/long-carry is required.',
        'Build weather contingency language for exposed shoreline load paths.',
      ],
    },
    {
      id: 'gateway-corridor-rural',
      title: 'NE Georgia gateway, corridor suburbs & rural last-mile module',
      intro:
        'I-985 growth product and true rural edges create two specialized products under the same county name.',
      bullets: [
        'Price portal-to-portal time for south Hall ↔ Gainesville and Hall ↔ Gwinnett pairs.',
        'Send HOA packets early for Flowery Branch / Oakwood planned communities.',
        'Confirm road width and staging on north/east acreage properties.',
        'Name both towns on the estimate — “Hall local” is too vague for lake vs corridor pairs.',
        'Ask about outbuildings and equipment on rural-edge inventories.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hall County?',
    intro:
      'Gainesville urban amenities, Lanier recreation, and NE Georgia corridor access are different bets — pick the pocket first, then validate commute, schools, and shoreline tradeoffs.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Hall County Schools and city systems in some areas serve families. Match every listing to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before lake or subdivision brand',
            detail:
              'Use official boundary tools. Lanier and corridor marketing names can span multiple feeders.',
          },
          {
            title: 'Gainesville vs county systems',
            detail:
              'Confirm city vs county school assignment near municipal edges — do not assume by ZIP alone.',
          },
          {
            title: 'Higher education presence',
            detail:
              'University of North Georgia and other campuses shape rental demand and traffic near campus edges.',
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
            title: 'Regional medical anchors',
            detail:
              'Northeast Georgia Medical Center and related campuses are major Gainesville anchors. Map ER drive times from lake and rural edges.',
          },
          {
            title: 'Shoreline and outer-lot access',
            detail:
              'Cove and north/east addresses can mean longer specialty drives into the core — test peak routes.',
          },
          {
            title: 'Atlanta specialty options',
            detail:
              'Some households still travel south for specialty care; I-985 timing becomes part of the healthcare plan.',
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
              'Lanier waterfront, Gainesville in-town, corridor HOAs, and rural acreage price differently. Compare insurance and access, not only list price.',
          },
          {
            title: 'Stock variety',
            detail:
              'Historic SFH, new suburbs, shoreline homes, and farmette lots each change move-day logistics and ongoing maintenance.',
          },
          {
            title: 'Relative NE Georgia value',
            detail:
              'Many households choose Hall for space and recreation access relative to closer-in Gwinnett/Forsyth pricing — verify commute cost carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Gainesville urban-rural hub',
            detail:
              'Jobs, hospitals, dining, and denser streets — with parking and older-home tradeoffs.',
          },
          {
            title: 'Lake Lanier recreation living',
            detail:
              'Water access and weekend energy — summer crowds and shoreline access complexity included.',
          },
          {
            title: 'Flowery Branch / Oakwood corridor',
            detail:
              'Family HOA tracts with I-985 dependence toward Atlanta-direction jobs.',
          },
          {
            title: 'North/east rural-suburban',
            detail:
              'Larger lots and quieter roads — longer drives to core amenities and services.',
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
              'Healthcare, manufacturing, poultry/agribusiness, education, logistics, and regional retail are major themes.',
          },
          {
            title: 'I-985 commute reality',
            detail:
              'Southbound peaks toward Gwinnett/Atlanta set daily times for many corridor households. Test your actual pair.',
          },
          {
            title: 'Regional gateway roles',
            detail:
              'Some jobs face mountain-direction or multi-county territories — factor non-standard travel days into housing choice.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Lake + foothill gateway living',
            detail:
              'Lanier recreation and easy mountain-direction weekend trips are signature draws; traffic follows the same amenities.',
          },
          {
            title: 'Four-season humidity & heat',
            detail:
              'Hot summers and humid shoulders favor early move starts. Winter ice on grades can affect lake and rural driveways.',
          },
          {
            title: 'Outdoor culture',
            detail:
              'Boating, trails, and parks shape weekend life — boat and outdoor gear often expand move inventories.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Hall County resources',
    intro:
      'Official links and licensing notes — lake conditions, county services, and Georgia DPS MCCD credentials change; verify before move day.',
    items: [
      {
        label: 'Hall County government',
        href: 'https://www.hallcounty.org/',
        note: 'County services and public information',
        external: true,
      },
      {
        label: 'City of Gainesville',
        href: 'https://www.gainesville.org/',
        external: true,
      },
      {
        label: 'City of Flowery Branch',
        href: 'https://www.flowerybranchga.org/',
        external: true,
      },
      {
        label: 'City of Oakwood',
        href: 'https://www.cityofoakwood.net/',
        external: true,
      },
      {
        label: 'Hall County Schools',
        href: 'https://www.hallco.org/',
        external: true,
      },
      {
        label: 'U.S. Army Corps of Engineers — Lake Lanier',
        href: 'https://www.sam.usace.army.mil/Missions/Civil-Works/Recreation/Lake-Sidney-Lanier/',
        note: 'Lake operations and recreation context',
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
    'Filter by zone (Gainesville core, Lake Lanier, Flowery Branch/Oakwood, South Hall, North/East Hall). Confirm shoreline access, corridor timing, and Georgia DPS MCCD vs FMCSA authority.',
  lastReviewed: '2026-07-23',
};
