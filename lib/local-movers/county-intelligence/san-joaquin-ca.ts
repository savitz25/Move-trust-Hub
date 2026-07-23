import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted San Joaquin County moving intelligence.
 * Used by /local-movers/california/san-joaquin and the shared intelligence template.
 *
 * Differentiators vs Sacramento / Fresno: Stockton core + Tracy / Manteca /
 * Lathrop growth corridor, Central Valley heat with Bay Area commute overflow
 * via Altamont / I-580 / I-205, logistics and warehouse-adjacent housing —
 * not a Sacramento capital script or Fresno clone.
 */
export const sanJoaquinCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'san-joaquin',
  hubTitle: 'San Joaquin County Moving Intelligence Hub',
  eyebrow: 'San Joaquin County · Stockton & South County growth guide',
  h1: 'Moving in San Joaquin County: Stockton, Tracy–Manteca Growth & Bay Commute Guide',
  heroOpener:
    'San Joaquin County sits at the hinge of the northern San Joaquin Valley and Bay Area commute overflow. Stockton anchors the core; Tracy, Manteca, and Lathrop form a growth corridor of newer tracts, HOA rules, and logistics-adjacent housing; Lodi and Ripon add wine-country and small-city character. I-5, Highway 99, I-205, and the Altamont / I-580 approach turn “local” pairs into billable time — especially when households keep jobs in the East Bay or Silicon Valley. Summers still hit hard on the valley floor. This guide is for people moving in San Joaquin County — not a Sacramento capital script, not Fresno heat copy-paste, and not generic “inland Northern California” filler.',
  heroCredibility:
    'Stockton + South County growth · Altamont / Bay overflow · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in San Joaquin County different',
    intro:
      'These are the Stockton–South County realities that change estimates — Bay Area commute overflow, warehouse-corridor growth, and valley heat that Sacramento or Fresno templates do not capture the same way.',
    bullets: [
      {
        title: 'Stockton core and South County growth are different products',
        detail:
          'Downtown and mid-city Stockton multi-unit and older SFH jobs are about staging, elevators, and denser streets. Tracy, Manteca, and Lathrop are often about HOA packets, cul-de-sacs, and family-volume inventories near logistics corridors. “San Joaquin County local” is too vague without both cities on the estimate.',
      },
      {
        title: 'Bay Area commute overflow shapes housing demand',
        detail:
          'Relative to East Bay and Peninsula prices, San Joaquin still draws households who keep (or seek) Bay Area jobs while living inland. Tracy and Manteca especially feel Altamont / I-580 / I-205 rhythm. Peak spring/summer and end-of-month windows book first when Bay leases turn over.',
      },
      {
        title: 'Altamont, I-580, I-205 & I-5 are line items',
        detail:
          'South County ↔ Stockton, Tracy ↔ Manteca/Lathrop, or any pair aimed at the Altamont approach can burn far more time than map miles suggest at peak. Hourly crews feel every delay — ask how portal-to-portal time is priced and whether cross-zone pairs still use a pure local rate card.',
      },
      {
        title: 'Logistics & warehouse-adjacent housing',
        detail:
          'Distribution centers and industrial parks near Tracy, Lathrop, French Camp, and Stockton edges mix residential moves with heavy truck traffic. Mid-day mid-week can stall “short” locals near warehouse corridors. Note industrial adjacency on the survey so crews build freight-traffic buffer.',
      },
      {
        title: 'Central Valley summer heat still applies',
        detail:
          'June–September afternoons frequently reach the mid-90s to 100°F+ on the valley floor. Prefer early load windows in peak summer, request shaded staging, and avoid mid-afternoon moves when possible — Bay Area mild-weather assumptions do not transfer inland.',
      },
      {
        title: 'HOA paperwork is common in growth tracts',
        detail:
          'Newer Tracy, Manteca, Lathrop, and parts of north Stockton / Mountain House–adjacent growth often require Certificates of Insurance, approved hours, floor protection, and gate lists. Treat the HOA packet as part of the survey, not an afterthought.',
      },
      {
        title: 'Delta-edge & older Stockton access quirks',
        detail:
          'Some delta-adjacent and older Stockton neighborhoods have constrained approaches, multi-unit long carries, or limited curb staging. Confirm parking plans and building rules before truck day — denser core jobs do not price like South County planned communities.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs need FMCSA authority. Confirm which license applies to your exact origin and destination — including when a “local” pair is actually a long inland hop.',
      },
    ],
  },
  zonesHeading: 'San Joaquin County zones: Stockton core to South County corridor',
  zonesIntro:
    'Treat each zone as its own access, heat, and commute problem. Stockton multi-unit density, Tracy/Manteca/Lathrop HOA growth, Lodi character, and warehouse-edge logistics are not interchangeable — corridor timing defines the job more than generic Valley advice.',
  zones: [
    {
      id: 'stockton-core',
      name: 'Central Stockton / Downtown & Mid-City',
      shortName: 'Central Stockton',
      neighborhoods: [
        'Downtown Stockton',
        'Midtown / central corridors',
        'Victory Park edge',
        'Older multi-unit pockets',
        'University-adjacent edges',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, denser street grids, some loft/adaptive reuse',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-5 / Hwy 99 approaches into the core at peak',
        'Peak heat on asphalt staging with limited shade',
      ],
      moverTips:
        'Confirm building rules and COI for multi-unit. Weekday mornings beat heat and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'downtown stockton',
        'midtown stockton',
        'central stockton',
        'stockton',
        'victory park',
      ],
    },
    {
      id: 'north-stockton',
      name: 'North Stockton & Lincoln corridor',
      shortName: 'North Stockton',
      neighborhoods: [
        'North Stockton',
        'Lincoln Village edge',
        'Brookside edge',
        'March Lane / Hammer corridors',
        'Newer north-side multi-family',
      ],
      housingTypes:
        'Suburban SFH, townhomes, planned pockets, multi-family corridors, established and newer tracts',
      challenges: [
        'Cross-town travel to South County or central Stockton at peak',
        'Summer heat on open suburban streets',
        'Growing multi-family with building move rules',
        'School-hour arterial congestion',
      ],
      moverTips:
        'Early summer starts are critical. Clarify North Stockton ↔ Tracy/Manteca pairs for honest drive time. Inventory carefully — suburban volume often runs higher than core condos.',
      cityKeywords: [
        'north stockton',
        'lincoln village',
        'brookside',
        'march lane',
        'hammer lane',
      ],
    },
    {
      id: 'tracy-corridor',
      name: 'Tracy & West South County',
      shortName: 'Tracy',
      neighborhoods: [
        'Tracy',
        'Tracy Hills edge',
        'Mountain House edge (adjacent growth)',
        'I-205 / Altamont approach corridors',
        'West Tracy industrial-adjacent residential',
      ],
      housingTypes:
        'Strong mix of established SFH and newer master-planned communities, townhomes, multi-family',
      challenges: [
        'HOA COI and approved-hour rules in growth villages',
        'Altamont / I-580 / I-205 commute and freight congestion',
        'High Bay-overflow family-move volume on peak weekends',
        'Heat + warehouse-corridor truck traffic mid-day',
      ],
      moverTips:
        'Tracy is increasingly HOA-first in growth areas — send management packets with the estimate. Prefer mid-week early starts that miss Altamont peaks when possible. Book May–August Saturdays early for family moves. Note warehouse adjacency for freight buffer.',
      cityKeywords: [
        'tracy',
        'tracy hills',
        'mountain house',
        'altamont',
        'i-205',
      ],
    },
    {
      id: 'manteca-lathrop',
      name: 'Manteca, Lathrop & central South County',
      shortName: 'Manteca / Lathrop',
      neighborhoods: [
        'Manteca',
        'Lathrop',
        'River Islands edge',
        'South Manteca growth',
        'I-5 / 120 corridor communities',
      ],
      housingTypes:
        'Newer planned communities, suburban SFH, townhomes, multi-family, logistics-adjacent tracts',
      challenges: [
        'HOA packets, gate lists, and approved move windows',
        'I-5 / Hwy 120 / South County arterial congestion',
        'Warehouse and industrial truck traffic near residential edges',
        'Cross-zone hauls to Tracy, Stockton, or Ripon at peak',
      ],
      moverTips:
        'Collect HOA COI early for River Islands and similar planned areas. Clarify Manteca ↔ Tracy or Lathrop ↔ Stockton pairs for portal-to-portal honesty. Early starts protect crews from heat and freight peaks.',
      cityKeywords: [
        'manteca',
        'lathrop',
        'river islands',
        'south manteca',
        'french camp',
      ],
    },
    {
      id: 'lodi-north',
      name: 'Lodi & northern county',
      shortName: 'Lodi / North',
      neighborhoods: [
        'Lodi',
        'North county wine-country edges',
        'Acampo edge',
        'Hwy 99 north corridor',
      ],
      housingTypes:
        'Small-city SFH, downtown multi-unit, suburban tracts, some agricultural-edge properties',
      challenges: [
        'Hwy 99 timing to Stockton and South County',
        'Downtown Lodi staging on tighter blocks',
        'Ag-edge approaches and longer rural driveways in outlying pockets',
        'Summer heat on open lots',
      ],
      moverTips:
        'Separate downtown multi-unit rules from suburban tract access. Build 99 corridor time into Lodi ↔ Stockton or Lodi ↔ Tracy pairs. Mention ag-edge gates and sheds on the survey.',
      cityKeywords: [
        'lodi',
        'acampo',
        'woodbridge',
        'lockeford',
        'north county',
      ],
    },
    {
      id: 'ripon-escalon-east',
      name: 'Ripon, Escalon & eastern edges',
      shortName: 'Ripon / Escalon',
      neighborhoods: [
        'Ripon',
        'Escalon',
        'East county small towns',
        'Farm-edge residential pockets',
      ],
      housingTypes:
        'Small-town SFH, rural-edge homes, farm/ranch-adjacent properties, occasional outbuildings',
      challenges: [
        'Longer approaches and empty miles from Stockton/Tracy staging',
        'Unpaved or constrained rural driveways',
        'Agricultural traffic and seasonal road use',
        'Cross-county timing toward Modesto-area edges on some pairs',
      ],
      moverTips:
        'Treat town-to-metro pairs as long locals with honest portal-to-portal time. Share driveway and outbuilding details. Heat + rural sun exposure makes early starts non-negotiable in summer.',
      cityKeywords: [
        'ripon',
        'escalon',
        'farmington',
        'linden',
        'east san joaquin',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside San Joaquin County',
    intro:
      'Two “local” moves of the same square footage can differ depending on HOA soft costs, South County ↔ Stockton distance, warehouse-corridor delay, and whether the household is timing around Bay Area lease calendars.',
    drivers: [
      {
        title: 'South County / Altamont corridor time',
        detail:
          'Tracy ↔ Stockton, Manteca ↔ Tracy, or any pair touching I-205 / I-580 approaches can burn 45–90+ minutes each way at peak. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs in growth tracts',
        detail:
          'COI processing, approved hours, and gate lists in Tracy, Manteca, Lathrop, and planned Stockton edges add soft costs and can force weekday-only windows.',
      },
      {
        title: 'Warehouse & industrial traffic buffer',
        detail:
          'Freight-heavy corridors near logistics parks stall “short” locals mid-day. Build buffer when either address is warehouse-adjacent.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Bay Area inbound / lease calendars',
        detail:
          'Households leaving higher-cost Bay markets concentrate demand in spring/summer and end-of-month windows — book early for popular Saturdays in Tracy and Manteca.',
      },
      {
        title: 'Core Stockton multi-unit access',
        detail:
          'Elevators, long carries, and limited curb staging in denser Stockton stock add labor hours that South County driveway jobs may not see.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,400+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,600–$4,000+',
        note: 'HOA soft costs and South County cross-hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / Bay-corridor timing)',
        value: '$2,400–$6,500+',
        note: 'Tracy–Stockton and Altamont-timed pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$180+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & Bay-overflow calendar intelligence',
    intro:
      'San Joaquin peaks follow valley heat, school calendars, logistics employment, and Bay Area lease turnover — not capital-session calendars or pure ag-Fresno patterns alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property — Bay Area mild-weather habits do not apply.',
      },
      {
        title: 'Bay Area lease & school calendars',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves in Tracy, Manteca, and Lathrop when Bay leases and school years turn over. Book 2–4 weeks ahead for Saturdays.',
      },
      {
        title: 'Logistics hiring & warehouse rhythm',
        detail:
          'Distribution and fulfillment employment can drive mid-month housing turnover near South County industrial edges. Freight traffic still needs schedule buffer mid-day.',
      },
      {
        title: 'Altamont / I-580 / I-205 peak seasons',
        detail:
          'Commute peaks remain brutal year-round on bad days; holiday weekends and summer construction can worsen South County approaches. Prefer mid-morning starts that miss the worst commute waves when HOA windows allow.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows. Avoid last Friday/Saturday of the month when Bay and local leases collide — and start early for heat.',
      },
    ],
  },
  specialized: [
    {
      id: 'bay-overflow-altamont',
      title: 'Bay Area overflow, Altamont & I-580/I-205 corridor logistics',
      intro:
        'San Joaquin’s defining modern move pattern is often inland housing paired with Bay-facing commute geography — Tracy and South County feel it first.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides I-205, I-580 approaches, I-5, or Highway 99 between Stockton and South County.',
        'Prefer mid-morning starts that miss the worst Altamont-bound commute peaks when HOA windows allow.',
        'If the household is relocating from the East Bay or Peninsula, confirm both addresses early — inbound volume books popular Saturdays first.',
        'Ask whether cross-zone South County ↔ Stockton pairs still use a pure “local” rate card or a long-local schedule.',
        'Build buffer for construction and freight on the same spines residents use to reach Bay jobs.',
      ],
    },
    {
      id: 'warehouse-hoa-growth',
      title: 'Warehouse-adjacent housing & South County HOA growth module',
      intro:
        'Tracy, Manteca, and Lathrop combine master-planned HOA rules with logistics-park adjacency — two soft-cost stacks that pure Stockton core jobs may not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate — River Islands and similar villages are packet-first.',
        'Note warehouse or industrial adjacency so crews build mid-day freight-traffic buffer.',
        'Inventory family-volume SFH carefully; South County suburban loads often exceed older Stockton multi-unit volume.',
        'Confirm approved move hours and floor-protection rules before booking Saturday crews that cannot legally stage.',
        'Share driveway, cul-de-sac, and truck-length constraints for newer tracts with tight turns.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to San Joaquin County?',
    intro:
      'Stockton urban value, Tracy–Manteca–Lathrop growth, Lodi small-city character, and warehouse-corridor practicality are different bets — pick the pocket first, then validate schools, healthcare, heat tolerance, and whether a Bay commute is actually livable from that driveway.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'San Joaquin County uses multiple districts (e.g., Stockton Unified and other Stockton-area systems, Tracy Unified, Manteca Unified, Lodi Unified, Ripon Unified, Escalon Unified, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and the California School Dashboard. Marketing city names, unincorporated pockets, and new tracts can span feeders — especially on the Stockton–Lathrop–Manteca edges.',
          },
          {
            title: 'Core vs South County vs Lodi',
            detail:
              'Enrollment pressures, program offerings, and bus patterns differ by city — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state dashboard data should lead; third-party rankings are secondary signals only. Tour campuses when possible.',
          },
          {
            title: 'Higher education presence',
            detail:
              'University of the Pacific, San Joaquin Delta College, and other campuses shape local rental demand and traffic near campus-adjacent Stockton areas — useful for student and staff households.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'St. Joseph’s Medical Center (Stockton), Sutter Tracy Community Hospital, Kaiser Permanente facilities serving the region, and other campuses cover different pockets — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Bay Area specialty spillover',
            detail:
              'Some residents travel toward East Bay or Sacramento systems for specialty care. Confirm insurer networks and realistic appointment drive times on I-5 / I-205 / Altamont approaches.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos when South County inventories turn over.',
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
              'Tracy and some South County planned communities often price differently from denser Stockton multi-family or Lodi small-city stock. Compare total monthly costs (commute fuel/time, HOA, cooling) — not sticker price alone.',
          },
          {
            title: 'Stock variety',
            detail:
              'Older Stockton SFH and multi-unit, master-planned South County villages, Lodi downtown and suburban stock, and rural-edge homes — insurance, HOA dues, and access rules vary widely.',
          },
          {
            title: 'Commute cost as housing cost',
            detail:
              'A lower purchase price or rent in San Joaquin can be offset by daily Altamont / I-580 time and fuel if jobs stay in the Bay Area. Model peak-hour commute before signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Stockton urban & suburban mix',
            detail:
              'Central multi-unit and older neighborhoods vs north Stockton suburban tracts — different staging, amenities, and price points under one city name.',
          },
          {
            title: 'South County growth lifestyle',
            detail:
              'Tracy, Manteca, and Lathrop for newer SFH, HOA amenities, and logistics-corridor employment — with freeway dependence and warehouse traffic as tradeoffs.',
          },
          {
            title: 'Lodi character',
            detail:
              'Smaller-city downtown, wine-country adjacency, and a different pace than South County boom tracts — still plan valley heat and 99 timing.',
          },
          {
            title: 'Bay commute tolerance test',
            detail:
              'Many Tracy and South County households trade space for Altamont / 580 time. Drive your actual peak commute before choosing a pocket.',
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
              'Logistics and warehousing, agriculture and food processing, healthcare, education, retail, public sector, and Stockton-area professional services.',
          },
          {
            title: 'Bay Area employment overflow',
            detail:
              'A meaningful share of households maintain East Bay, Tri-Valley, or broader Bay jobs. Peak I-205 / I-580 / Altamont times should drive housing choice more than brochure distance.',
          },
          {
            title: 'Hybrid & warehouse-shift patterns',
            detail:
              'Hybrid professional roles reduce some daily Bay trips; warehouse and fulfillment shifts create non-traditional move and traffic windows near industrial parks.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Valley heat vs Bay mild-weather expectations',
            detail:
              'Summer afternoons on the valley floor are much hotter than coastal Bay cities. Plan move-day starts, AC readiness, and outdoor schedules accordingly.',
          },
          {
            title: 'Outdoors & delta adjacency',
            detail:
              'Delta waterways, regional parks, and wine-country edges near Lodi are lifestyle draws; weekend recreation traffic is usually milder than Bay bridges but still plan staging around local events.',
          },
          {
            title: 'Air quality & agricultural seasons',
            detail:
              'Valley air quality and harvest-season activity are part of living here for many households. Build indoor backup plans and flexible outdoor schedules into relocation expectations.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical San Joaquin County resources',
    intro:
      'Official links and licensing notes — HOA, heat safety, road conditions, and city rules change; verify before move day.',
    items: [
      {
        label: 'San Joaquin County — official site',
        href: 'https://www.sjgov.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Stockton',
        href: 'https://www.stocktonca.gov/',
        external: true,
      },
      {
        label: 'City of Tracy',
        href: 'https://www.cityoftracy.org/',
        external: true,
      },
      {
        label: 'City of Manteca',
        href: 'https://www.manteca.gov/',
        external: true,
      },
      {
        label: 'City of Lathrop',
        href: 'https://www.ci.lathrop.ca.us/',
        external: true,
      },
      {
        label: 'City of Lodi',
        href: 'https://www.lodi.gov/',
        external: true,
      },
      {
        label: 'Caltrans District 10 — road conditions',
        href: 'https://dot.ca.gov/caltrans-near-me/district-10',
        note: 'I-5 / I-205 / Hwy 99 corridor awareness',
        external: true,
      },
      {
        label: 'NWS heat safety',
        href: 'https://www.weather.gov/safety/heat',
        note: 'Plan early loads when heat risk is elevated',
        external: true,
      },
      {
        label: 'National Weather Service — Sacramento region',
        href: 'https://www.weather.gov/sto/',
        note: 'Heat and weather context for northern valley moves',
        external: true,
      },
      {
        label: 'CA BHGS — household movers (intrastate)',
        href: 'https://bhgs.dca.ca.gov/',
        note: 'California Bureau of Household Goods and Services',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'PG&E — start/stop service (much of the region)',
        href: 'https://www.pge.com/',
        note: 'Confirm utility provider by exact address',
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
    'Filter listings by zone (Central Stockton, North Stockton, Tracy, Manteca/Lathrop, Lodi/North, Ripon/Escalon) when available. Confirm HOA/COI rules, Altamont/I-205 drive assumptions, warehouse-edge buffers, and heat-window plans — especially for South County and Bay-overflow moves.',
  lastReviewed: '2026-07-23',
};
