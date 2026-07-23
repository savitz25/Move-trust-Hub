import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Kern County moving intelligence.
 * Used by /local-movers/california/kern and the shared intelligence template.
 *
 * Differentiators vs Fresno / Sacramento: Bakersfield metro vs outlying
 * valley/mountain edges (Tehachapi, Ridgecrest, Lake Isabella), extreme heat,
 * industrial/ag/oil-related move patterns, north–south valley logistics on
 * Hwy 99 / 58 / I-5 — not a Fresno clone or capital-region script.
 */
export const kernCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'kern',
  hubTitle: 'Kern County Moving Intelligence Hub',
  eyebrow: 'Kern County · Southern San Joaquin & mountain-edge guide',
  h1: 'Moving in Kern County: Bakersfield Metro, Heat, Oil-Ag Logistics & Zone Guide',
  heroOpener:
    'Kern County is one of California’s largest counties by land — a southern San Joaquin Valley economy anchored by Bakersfield, ringed by ag and oilfield communities, then climbing into Tehachapi, the southern Sierra edges around Lake Isabella, and desert-adjacent Ridgecrest. Summer heat regularly pushes past 100°F+ in the valley floor while mountain and desert legs add elevation, wind, and empty-mile distance. Highway 99, Highway 58, and I-5 set north–south and east–west timing; industrial and agricultural traffic is part of the operational reality, not background noise. This guide is for people moving in Kern County — not a Fresno template with “Bakersfield” pasted in, and not generic Central Valley filler.',
  heroCredibility:
    'Bakersfield metro + mountain/desert edges · Heat & corridor-aware · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in Kern County different',
    intro:
      'These are the southern-valley and mountain-edge realities that change estimates — heat, industrial/ag patterns, and metro-to-outlying distance that Fresno or Sacramento scripts do not capture.',
    bullets: [
      {
        title: 'Bakersfield metro is not the whole county',
        detail:
          'Most household volume sits in greater Bakersfield — southwest tracts, northwest growth, downtown/east-side stock, and Oildale-adjacent pockets. Tehachapi, Ridgecrest, Lake Isabella, Delano, Wasco, Shafter, Taft, and Arvin are different logistics products. “Kern County local” on a quote is too vague without both cities and corridor assumptions.',
      },
      {
        title: 'Extreme valley heat compresses productive hours',
        detail:
          'June–September afternoons on the valley floor frequently top 100°F+. Heat stresses crews, electronics, sealed packaging, and pets. Prefer 6–10 a.m. load windows in peak summer, request shaded staging, and treat mid-afternoon loads as high risk. Mountain and high-desert legs can still be hot and windy — plan water and heat-safe packing either way.',
      },
      {
        title: 'Oil, ag & industrial move patterns',
        detail:
          'Kern’s economy mixes petroleum, agriculture, logistics, and related trades. Households tied to field, plant, and warehouse schedules often need mid-month or mid-week flexibility. Rural-edge and industrial-adjacent addresses can involve longer approaches, equipment sheds, workshop gear, and different driveway patterns than a pure suburban tract.',
      },
      {
        title: 'North–south & east–west corridors are line items',
        detail:
          'Highway 99 is the valley spine (Delano ↔ Bakersfield ↔ south). Highway 58 links Bakersfield toward Tehachapi and the desert edge. I-5 runs the west side for longer through-legs. Cross-county “locals” (e.g. southwest Bakersfield ↔ Delano, or Bakersfield ↔ Tehachapi) burn portal-to-portal time that map miles understate at peak.',
      },
      {
        title: 'Mountain & desert edges change the job',
        detail:
          'Tehachapi elevation and wind, Lake Isabella / Kern River canyon approaches, and Ridgecrest high-desert distances are not interchangeable with valley-floor suburban streets. Grades, wind, limited staging, and empty miles belong in the survey — not as day-of surprises.',
      },
      {
        title: 'Suburban growth vs older core access',
        detail:
          'Northwest and southwest Bakersfield growth areas often mean larger inventories, cul-de-sacs, and occasional HOA packets. Downtown, east Bakersfield, and older multi-unit corridors bring tighter staging, stairs, and street-parking friction. Price them as different products.',
      },
      {
        title: 'Long empty miles on outlying pairs',
        detail:
          'A crew staged in metro Bakersfield may face a long deadhead to Ridgecrest, Lake Isabella, or west-side ag towns. Ask whether quotes are portal-to-portal and whether mountain/desert legs use a local rate card or a long-local schedule.',
      },
      {
        title: 'California intrastate rules (BHGS)',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. Bakersfield → Las Vegas or out of state) need FMCSA authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesHeading: 'Kern County zones: metro, valley towns & mountain edges',
  zonesIntro:
    'Treat each zone as its own heat, access, and distance problem. Southwest Bakersfield tracts, north-valley ag towns, Tehachapi wind, and Ridgecrest empty miles are not interchangeable — corridor and elevation define the job more than generic Valley advice.',
  zones: [
    {
      id: 'bakersfield-metro-core',
      name: 'Central & East Bakersfield / Urban Core',
      shortName: 'Central / East Bako',
      neighborhoods: [
        'Downtown Bakersfield',
        'Oleander / central corridors',
        'East Bakersfield',
        'College area edges',
        'Older multi-unit pockets',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, denser street grids, some adaptive reuse near core corridors',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'Hwy 99 / 58 / 178 approaches into the core at peak',
        'Peak heat on asphalt staging with limited shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks before the truck is dispatched.',
      cityKeywords: [
        'downtown bakersfield',
        'east bakersfield',
        'central bakersfield',
        'oleander',
        'bakersfield',
      ],
    },
    {
      id: 'sw-bakersfield',
      name: 'Southwest Bakersfield & Stockdale corridor',
      shortName: 'SW Bakersfield',
      neighborhoods: [
        'Southwest Bakersfield',
        'Stockdale area',
        'Seven Oaks edge',
        'Ming / Panama corridors',
        'Newer master-planned pockets',
      ],
      housingTypes:
        'Suburban SFH, planned communities, townhomes, higher-volume family inventories, some HOA villages',
      challenges: [
        'HOA COI and approved-hour rules in newer villages',
        'High family-move volume on summer weekends',
        'Cross-town travel to north/east Bakersfield or Delano at peak',
        'Heat on open suburban streets with limited shade',
      ],
      moverTips:
        'Send HOA management packets with the estimate when applicable. Mid-week early starts beat heat and school traffic. Inventory carefully — suburban volume often runs higher than older core condos. Clarify SW ↔ north-valley pairs for honest drive time.',
      cityKeywords: [
        'southwest bakersfield',
        'stockdale',
        'seven oaks',
        'panama',
        'ming',
        'sw bakersfield',
      ],
    },
    {
      id: 'nw-oildale',
      name: 'Northwest Bakersfield, Rosedale & Oildale edge',
      shortName: 'NW / Rosedale / Oildale',
      neighborhoods: [
        'Northwest Bakersfield',
        'Rosedale',
        'Oildale',
        'Coffee / Calloway corridors',
        'Growth tracts toward the northwest',
      ],
      housingTypes:
        'Mix of established and newer SFH, ranch-style lots, multi-family pockets, industrial-adjacent residential edges',
      challenges: [
        'Longer suburban distances and arterial congestion',
        'Industrial / oilfield-adjacent traffic patterns on some approaches',
        'Summer heat on larger lots with limited shade',
        'Cross-zone hauls to SW Bakersfield or Hwy 99 north towns',
      ],
      moverTips:
        'Build arterial and 99-approach timing into NW↔SW pairs. Mention outbuildings, shops, and long driveways on the survey. Early summer starts remain the best operational plan even when the map looks short.',
      cityKeywords: [
        'northwest bakersfield',
        'rosedale',
        'oildale',
        'calloway',
        'coffee road',
        'nw bakersfield',
      ],
    },
    {
      id: 'north-valley-towns',
      name: 'North valley towns (Delano, Wasco, Shafter, McFarland)',
      shortName: 'North Valley Towns',
      neighborhoods: [
        'Delano',
        'Wasco',
        'Shafter',
        'McFarland',
        'Hwy 99 north corridor communities',
      ],
      housingTypes:
        'Small-city and town SFH, multi-family, ag-edge homes, working-community stock',
      challenges: [
        'Hwy 99 freight and commute congestion north of Bakersfield',
        'Longer portal-to-portal time from metro Bakersfield staging',
        'Agricultural seasonal traffic and road use',
        'Heat + limited shaded staging in open lots',
      ],
      moverTips:
        'Treat town-to-Bakersfield pairs as long locals with honest portal-to-portal time. Share ag-edge driveway and gate details. Prefer early starts; harvest-season road activity can add buffer needs mid-day.',
      cityKeywords: [
        'delano',
        'wasco',
        'shafter',
        'mcfarland',
        'buttonwillow',
        'lost hills',
      ],
    },
    {
      id: 'tehachapi-58',
      name: 'Tehachapi & Highway 58 mountain edge',
      shortName: 'Tehachapi / 58',
      neighborhoods: [
        'Tehachapi',
        'Golden Hills edge',
        'Stallion Springs edge',
        'Hwy 58 mountain approaches',
        'Bear Valley Springs edge',
      ],
      housingTypes:
        'Mountain-town SFH, ranch/large-lot properties, cabin-style and foothill homes, some gated or HOA communities',
      challenges: [
        'Elevation, grades, and wind exposure on the Tehachapi Pass corridor',
        'Limited turnaround and longer carries on hillside lots',
        'Weather that can differ sharply from valley-floor heat (wind, cooler nights, occasional winter constraints)',
        'Empty miles from Bakersfield metro staging',
      ],
      moverTips:
        'Share driveway photos, road width, and turnaround limits before booking. Ask how wind and pass conditions affect scheduling. Do not assume a valley-floor crew rate covers mountain access without an on-site or video survey.',
      cityKeywords: [
        'tehachapi',
        'golden hills',
        'stallion springs',
        'bear valley springs',
        'tehachapi pass',
      ],
    },
    {
      id: 'ridgecrest-isabella-edges',
      name: 'Ridgecrest, Lake Isabella & far edges',
      shortName: 'Ridgecrest / Isabella',
      neighborhoods: [
        'Ridgecrest',
        'Lake Isabella',
        'Kernville edge',
        'Wofford Heights edge',
        'Taft / west-side oil towns',
        'Arvin / Lamont edge',
      ],
      housingTypes:
        'High-desert SFH, mountain-lake cabins and SFH, small-town stock, oil/ag-edge properties, occasional outbuildings',
      challenges: [
        'Long empty miles and sparse services on remote legs',
        'Canyon/lake approaches (Isabella) and desert wind (Ridgecrest)',
        'Unpaved or constrained rural driveways',
        'Heat, sun exposure, and limited rescue options if a truck is undersized for the road',
      ],
      moverTips:
        'Price distance and access explicitly — these are rarely “quick locals” from metro Bakersfield. Confirm truck length limits on canyon and rural roads. Inventory sheds and shops; early starts protect crews on exposed desert and lake approaches.',
      cityKeywords: [
        'ridgecrest',
        'lake isabella',
        'kernville',
        'wofford heights',
        'taft',
        'arvin',
        'lamont',
        'california city',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Kern County',
    intro:
      'Two “local” moves of the same square footage can differ depending on heat windows, metro vs mountain/desert distance, industrial-edge access, and whether the pair rides 99, 58, or I-5.',
    drivers: [
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat on the valley floor compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor days or premium scheduling.',
      },
      {
        title: 'Metro-to-outlying and town-to-metro distance',
        detail:
          'Bakersfield ↔ Delano/Wasco, Bakersfield ↔ Tehachapi, or metro ↔ Ridgecrest/Isabella can burn far more portal-to-portal time than map miles suggest.',
      },
      {
        title: 'Mountain / desert access premiums',
        detail:
          'Grades, wind, limited turnaround, and long empty miles on Tehachapi, Isabella, and Ridgecrest legs add labor and vehicle risk — price them explicitly.',
      },
      {
        title: 'Ag, oil & industrial-edge access',
        detail:
          'Longer approaches, outbuildings, workshop inventories, and freight-adjacent roads add time that pure suburban surveys miss.',
      },
      {
        title: 'HOA soft costs in newer Bakersfield tracts',
        detail:
          'COI and approved hours in southwest and northwest growth villages add paperwork and can force weekday-only windows.',
      },
      {
        title: 'Corridor timing (99 / 58 / I-5)',
        detail:
          'Freight and commute peaks on the main spines turn cross-zone pairs into billable hours. Ask whether quotes are portal-to-portal.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,200+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,800+',
        note: 'HOA soft costs and cross-metro hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / mountain / desert edge)',
        value: '$2,200–$6,000+',
        note: 'Tehachapi, Ridgecrest, and Isabella legs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$170+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat & corridor intelligence',
    intro:
      'Kern peaks follow extreme valley heat, school calendars, agricultural and energy-sector rhythms, and mountain/desert weather — not coastal marine layers.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing on the valley floor. Mid-afternoon moves in peak heat are high risk for people and property. Mountain legs can still run hot and windy.',
      },
      {
        title: 'School & family calendars',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves in southwest and northwest Bakersfield. Book 2–4 weeks ahead for Saturdays.',
      },
      {
        title: 'Agricultural & industrial seasonal rhythm',
        detail:
          'Harvest periods and energy/industrial schedules can affect housing turnover and road use in north-valley and west-side communities. Build flexible timing around local activity when either address is ag- or plant-adjacent.',
      },
      {
        title: 'Mountain / pass weather (Tehachapi & Sierra edges)',
        detail:
          'Wind on the Tehachapi corridor and cooler or wetter winter conditions near lake/mountain edges can force reschedules. Confirm weather policies for elevation jobs.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when freeways and heat are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'heat-corridor-industrial',
      title: 'Heat, Hwy 99/58/I-5 corridors & industrial-edge logistics',
      intro:
        'Kern’s defining operational problem is often valley heat plus corridor distance — and households or inventories tied to ag, oil, and industrial edges.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides Highway 99 north of Bakersfield, Highway 58 toward Tehachapi, or I-5 west-side legs.',
        'Prefer 6–10 a.m. starts in peak summer; request shaded staging and heat-safe packing for electronics and sealed goods.',
        'Note industrial, oilfield, or packing-shed adjacency so crews build freight-traffic buffer mid-day.',
        'Inventory workshops, tools, and outbuildings separately — weight and packing needs differ from pure household furniture.',
        'If the job spans metro Bakersfield and a north-valley town, confirm whether the mover’s “local” rate card still applies or if a long-local schedule is used.',
      ],
    },
    {
      id: 'mountain-desert-edges',
      title: 'Mountain, lake & high-desert edge access module',
      intro:
        'Tehachapi, Lake Isabella / Kern River approaches, and Ridgecrest are not valley-floor suburban jobs — elevation, wind, and empty miles change truck choice and timing.',
      bullets: [
        'Share driveway, road-width, grade, and turnaround photos for mountain and canyon homes before booking.',
        'Ask about wind and pass-condition reschedule policies for Tehachapi corridor moves.',
        'Confirm truck length limits on constrained lake/canyon and rural desert roads — measure before dispatch.',
        'Budget empty-mile and portal-to-portal time from Bakersfield staging; remote legs are rarely “quick locals.”',
        'Secure outdoor packing plans for wind exposure — tarps, wind limits, and when crews will pause work.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kern County?',
    intro:
      'Bakersfield metro affordability, north-valley ag towns, Tehachapi mountain living, and Ridgecrest high-desert life are different bets — pick the pocket first, then validate schools, healthcare, heat tolerance, and corridor commute reality.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Kern County uses many districts (e.g., Bakersfield City School District and Kern High School District for large parts of metro Bakersfield, plus separate systems in Delano, Wasco, Tehachapi, Sierra Sands / Ridgecrest area, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and the California School Dashboard. Marketing city names and unincorporated pockets (including parts of greater Bakersfield) can span feeders.',
          },
          {
            title: 'Metro vs mountain vs desert',
            detail:
              'Program offerings, bus patterns, and enrollment pressures differ across Bakersfield, Tehachapi, and Ridgecrest — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state dashboard data should lead; third-party rankings are secondary signals only. Tour campuses when possible.',
          },
          {
            title: 'Higher education presence',
            detail:
              'CSU Bakersfield, Bakersfield College, and other campuses shape local rental demand and traffic near campus-adjacent areas — useful context for student and staff households.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Metro acute-care anchors',
            detail:
              'Kern Medical, Adventist Health Bakersfield, and other regional campuses serve greater Bakersfield. Map ER drive times at rush hour from your target neighborhood — southwest vs east-side access differs.',
          },
          {
            title: 'Outlying coverage gaps',
            detail:
              'Tehachapi, Lake Isabella, Ridgecrest, and north-valley towns may mean longer specialty-care drives into Bakersfield or neighboring counties. Confirm insurer networks and realistic appointment drive times on 99/58.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos and heat-related schedule squeezes.',
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
              'Southwest planned tracts, older east/central stock, north-valley towns, Tehachapi mountain homes, and Ridgecrest high-desert inventory price differently. Compare total monthly costs (utilities in extreme heat, insurance, HOA) — not sticker price alone.',
          },
          {
            title: 'Stock variety',
            detail:
              'Postwar SFH, newer master plans, small-town stock, mountain/large-lot properties, and ag-edge homes — access rules and inventory size vary widely for move day.',
          },
          {
            title: 'Heat & utility reality',
            detail:
              'Valley-floor cooling costs are a real monthly line item in summer. Factor AC condition and insulation into housing decisions, not only purchase price or rent.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Bakersfield metro lifestyle',
            detail:
              'Southwest and northwest growth for more suburban amenities and larger SFH; central/east for older stock and closer-in urban patterns — with corresponding heat and freeway tradeoffs.',
          },
          {
            title: 'North-valley & ag-town living',
            detail:
              'Delano, Wasco, Shafter, and similar communities for smaller-city scale and agricultural-economy context — longer drives to metro amenities and specialty care.',
          },
          {
            title: 'Mountain character',
            detail:
              'Tehachapi and lake/Sierra edges for elevation, wind, and a different climate profile — with canyon/pass access awareness on move day and winter.',
          },
          {
            title: 'High-desert edge',
            detail:
              'Ridgecrest for desert-adjacent living and employment ties in that pocket — empty miles to Bakersfield are part of the lifestyle calculus.',
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
              'Energy and related trades, agriculture and food processing, logistics/warehousing, healthcare, education, retail, and public sector are major employment themes across the county.',
          },
          {
            title: 'Corridor commute reality',
            detail:
              'Highway 99, Highway 58, and I-5 set day-to-day drive times more than brochure distance. Test peak-hour runs for any metro ↔ north-valley or valley ↔ mountain pair.',
          },
          {
            title: 'Hybrid / multi-site work',
            detail:
              'Some professional, healthcare, and remote-capable roles reduce daily corridor trips — still validate broadband and realistic travel when field or plant sites are part of the job.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Valley heat vs mountain/desert microclimates',
            detail:
              'Bakersfield and north-valley floors run very hot in summer; Tehachapi is cooler at elevation but windy; Ridgecrest is high-desert. Choose climate tolerance before you choose square footage.',
          },
          {
            title: 'Outdoors',
            detail:
              'Kern River / lake recreation, mountain trails near Tehachapi and the southern Sierra edges, and wide-open desert access are draws — weekend traffic can affect lake and mountain approaches.',
          },
          {
            title: 'Air quality & seasonal awareness',
            detail:
              'Valley air quality and extreme heat are part of daily life planning for many households. Build heat-safe outdoor schedules and indoor backup plans into relocation expectations.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Kern County resources',
    intro:
      'Official links and licensing notes — HOA, heat safety, road conditions, and city rules change; verify before move day.',
    items: [
      {
        label: 'County of Kern',
        href: 'https://www.kerncounty.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Bakersfield',
        href: 'https://www.bakersfieldcity.us/',
        external: true,
      },
      {
        label: 'City of Delano',
        href: 'https://www.cityofdelano.org/',
        external: true,
      },
      {
        label: 'City of Tehachapi',
        href: 'https://www.tehachapicityhall.com/',
        external: true,
      },
      {
        label: 'City of Ridgecrest',
        href: 'https://www.ridgecrest-ca.gov/',
        external: true,
      },
      {
        label: 'Caltrans District 6 — road conditions',
        href: 'https://dot.ca.gov/caltrans-near-me/district-6',
        note: 'Hwy 99 / 58 corridor awareness',
        external: true,
      },
      {
        label: 'Caltrans District 9 — eastern corridors',
        href: 'https://dot.ca.gov/caltrans-near-me/district-9',
        note: 'Useful context for desert-edge and eastern approaches',
        external: true,
      },
      {
        label: 'NWS heat safety',
        href: 'https://www.weather.gov/safety/heat',
        note: 'Plan early loads when heat risk is elevated',
        external: true,
      },
      {
        label: 'National Weather Service — Hanford (Central Valley)',
        href: 'https://www.weather.gov/hnx/',
        note: 'Heat and weather context for valley moves',
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
    'Filter listings by zone (Central/East Bako, SW Bakersfield, NW/Rosedale/Oildale, North Valley towns, Tehachapi/58, Ridgecrest/Isabella) when available. Confirm heat-window plans, corridor drive assumptions, and mountain/desert access — especially for summer and outlying legs.',
  lastReviewed: '2026-07-23',
};
