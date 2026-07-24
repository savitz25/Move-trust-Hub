import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Collin County — Texas Tier 2 (DFW north corporate collar).
 * Parent: Dallas County. Plano / McKinney / Frisco master-planned growth —
 * NOT a renamed Dallas urban-core pack.
 */
export const collinCountyIntelligence = finalizeTxTier2Pack({
  countySlug: 'collin',
  hubTitle: 'Collin County Moving Intelligence Hub',
  eyebrow: 'Collin County · DFW north — Plano / McKinney / Frisco corporate suburbs',
  h1: 'Moving in Collin County: DFW North Corporate Suburbs — Plano, McKinney & Frisco',
  heroOpener:
    'Collin County is DFW’s north corporate collar — Plano Legacy campuses, Frisco HQ and sports-district density, McKinney historic-plus-growth, and Allen/Prosper HOA villages — not Dallas County with Frisco pasted into the title. Master-planned gate lists, corporate multi-family elevators, and the US-75 / PGBT / Dallas North Tollway / SH-121 / US-380 grid define crew days more than downtown elevator permits. A Legacy mid-rise, a Frisco two-story behind a gate, a McKinney craft bungalow near the square, and a Prosper greenfield tract do not share truck access or portal time. Quote the pocket and the corridor pair — never a recycled Dallas-core rate card.',
  heroCredibility:
    'DFW north corporate collar · HOA master-planned growth · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-75 · PGBT · Dallas North Tollway · SH-121 · US-380',
  parentCompare: {
    parentLabel: 'Dallas County',
    parentHref: '/local-movers/texas/dallas',
    title: 'Compared with Dallas County',
    intro:
      'Collin is the north DFW corporate and master-planned growth market above Dallas County — freer mid-day freeflow on the tollway grid than I-35E/I-30 urban core, denser HOA paperwork than many Dallas SFH pockets, and far less vertical mid-rise elevator work than Uptown/downtown. Use this when one address sits in Dallas County and the other in Collin.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dallas County crews fight I-35E, I-30, I-635, and dense urban arterials. Collin pairs ride US-75, PGBT, the Dallas North Tollway, SH-121, and US-380 with freer mid-day flow — Plano ↔ Frisco or McKinney ↔ west Plano still burns portal-to-portal time at peak, but it is not a downtown Dallas elevator + I-35E job. Cross-county Collin ↔ Dallas pairs are long locals on the tollway grid.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dallas mixes vertical multi-family, older urban grids, and inner-ring SFH. Collin’s ladder is Legacy/Frisco corporate multi-family, master-planned HOA SFH (Frisco, Prosper, Celina-edge, west Plano), historic McKinney edges, and rural north greenfield — more gated villages and new construction, less Uptown high-rise product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Collin stages more driveway, cul-de-sac, and gate-list work than Dallas core. HOA COI, approved hours, and truck size limits are the default in Frisco/Prosper/Allen villages — real soft costs Dallas urban quotes often omit. Elevator packets concentrate in Legacy and Frisco HQ multi-family, not county-wide high-rises.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Same-zone Collin HOA jobs can look suburban-simple until gate lists, corporate elevator windows, and peak tollway time hit. Cross-zone north–south pairs and greenfield incomplete roads raise the bill above pure Plano in-town quotes. Do not assume Dallas-core rates transfer without naming both cities and corridors.',
      },
      {
        title: 'Role difference',
        detail:
          'Collin is DFW north’s corporate-suburb and master-planned growth engine — Plano/McKinney/Frisco employment and family SFH volume — not a Dallas bedroom dump and not interchangeable Fort Worth industrial character. Match crews to HOA fluency and tollway timing, not downtown Dallas elevator résumés alone.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Collin County different',
    intro:
      'North-collar realities — HOA-first master plans, corporate multi-family, tollway-grid freeflow vs Dallas core, and Texas licensing — that a renamed Dallas pack would miss.',
    bullets: [
      {
        title: 'HOA and master-planned rules are the default',
        detail:
          'Frisco, Prosper, Celina-edge, Allen, and many west Plano villages enforce gate lists, COI, approved hours, and truck limits. Treat association packets as part of the survey — not move-morning surprises.',
      },
      {
        title: 'Corporate corridor multi-family is dense',
        detail:
          'Legacy, Plano campus apartments, and Frisco HQ districts generate mid-month elevator turnover that pure SFH estimates miss. Building windows and COI come before loading starts.',
      },
      {
        title: 'Tollway-grid freeflow is still a line item',
        detail:
          'Suburb-to-suburb pairs freer than Dallas urban core still burn billable minutes at school and commute peaks on US-75, Tollway, PGBT, 121, and 380. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Historic McKinney and rural north edges are different jobs',
        detail:
          'Square-adjacent grids and porch carries are not interchangeable with Prosper/Celina greenfield construction traffic. Name both origin and destination cities — “Collin County local” is too vague.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Collin County zones: corporate suburbs, growth belt & north edges',
  zonesIntro:
    'Four sharp products — not a six-zone Dallas dump. Plano/Richardson edge, Frisco/McKinney growth, Allen/Prosper HOA belt, and rural north edges price and stage differently under the same tollway calendar.',
  zones: [
    {
      id: 'plano-richardson-edge',
      name: 'Plano & Richardson Edge: corporate campuses, mid-rises & established SFH',
      shortName: 'Plano / Richardson edge',
      neighborhoods: [
        'Legacy corridor',
        'West Plano',
        'East Plano',
        'Willow Bend edges',
        'Richardson / Collin border edges',
        'Corporate multi-family belts',
      ],
      housingTypes:
        'Mid-rise multi-family, corporate apartments, established SFH, townhomes, high-amenity product',
      challenges: [
        'Tollway / US-75 corporate congestion',
        'Elevator/COI and apartment move windows',
        'HOA rules in planned SFH villages',
        'Dallas County border pairs southward',
      ],
      moverTips:
        'Collect apartment and HOA packets early. Price Tollway and 75 peaks honestly. Mid-week mornings reduce corporate commute collisions. Clarify Collin vs Dallas destinations on southern edges.',
      cityKeywords: [
        'plano',
        'legacy',
        'willow bend',
        'west plano',
        'east plano',
        'richardson',
      ],
    },
    {
      id: 'frisco-mckinney-growth',
      name: 'Frisco & McKinney Growth: HQ campuses, sports district & historic-plus-new',
      shortName: 'Frisco / McKinney',
      neighborhoods: [
        'Frisco',
        'The Star / sports district edges',
        'West Frisco master plans',
        'Historic McKinney / downtown edges',
        'North McKinney growth',
        'Craig Ranch edges',
      ],
      housingTypes:
        'Master-planned SFH, gated HOA communities, historic and renovated SFH, mid-rise multi-family, corporate-adjacent apartments',
      challenges: [
        'Tollway / Sam Rayburn (121) / US-75 peaks',
        'Dense HOA gate lists and COI',
        'Event-day surface traffic near Frisco venues',
        'Mix of narrow historic grids and new HOA villages in McKinney',
      ],
      moverTips:
        'Treat Frisco as HOA-first growth work. Photo historic-street access near McKinney square. Avoid major venue event starts for curb-dependent jobs. Book June–August Saturdays early.',
      cityKeywords: [
        'frisco',
        'mckinney',
        'the star',
        'craig ranch',
        'historic mckinney',
        'downtown mckinney',
      ],
    },
    {
      id: 'allen-prosper',
      name: 'Allen, Prosper & planned-village belt',
      shortName: 'Allen / Prosper',
      neighborhoods: [
        'Allen',
        'Fairview',
        'Prosper',
        'Watters Creek edges',
        'Prosper master plans',
        'Lucas edges',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, multi-family, larger-lot edges, new master-planned product',
      challenges: [
        'US-75 / Sam Rayburn peaks',
        'HOA move windows and COI processing',
        'Event traffic near large Allen venues',
        'Construction traffic and unfinished streets on Prosper edges',
      ],
      moverTips:
        'Collect HOA packets before locking Saturday crews. Confirm unfinished road conditions the week of Prosper greenfield moves. Build venue-event buffers near major Allen facilities.',
      cityKeywords: [
        'allen',
        'prosper',
        'fairview',
        'lucas',
        'watters creek',
      ],
    },
    {
      id: 'rural-north-edges',
      name: 'Rural North Edges: Celina, Princeton, Wylie & far-north growth',
      shortName: 'Rural north edges',
      neighborhoods: [
        'Celina',
        'Princeton',
        'Wylie',
        'Murphy',
        'Farmersville edges',
        'Far-north Tollway extension villages',
      ],
      housingTypes:
        'New master-planned SFH, HOA villages under construction, growth-edge product, limited multi-family',
      challenges: [
        'Construction traffic and incomplete streets',
        'Strict HOA rules in new communities',
        'Long empty-mile time from southern staging',
        'US-380 / PGBT approach patterns and limited alternate routes',
      ],
      moverTips:
        'Confirm community truck access and unfinished roads the week of the move. Price long portal legs from Plano/Frisco honestly. Clarify Rockwall/Hunt border addresses on far-east edges.',
      cityKeywords: [
        'celina',
        'princeton',
        'wylie',
        'murphy',
        'farmersville',
        'lavon',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Collin County',
    intro:
      'Same square footage prices differently by HOA soft costs, corporate elevator windows, tollway-grid portal time, and whether the job is Legacy multi-family or Prosper greenfield.',
    drivers: [
      {
        title: 'HOA gate lists, COI & approved hours',
        detail:
          'Master-planned communities across Frisco, Prosper, Celina edges, Allen, and west Plano add admin time and can force premium weekday slots.',
      },
      {
        title: 'Tollway / US-75 / 121 / 380 congestion',
        detail:
          'Portal-to-portal billing tracks peaks. Suburb-to-suburb pairs can burn 35–70+ minutes each way at rush — freer than Dallas core, still billable.',
      },
      {
        title: 'Corporate multi-family elevator soft costs',
        detail:
          'Legacy and Frisco mid-rises require packets, elevator reservations, and fixed move windows before loading starts.',
      },
      {
        title: 'New-construction access friction',
        detail:
          'Incomplete streets, mud, and limited staging on Prosper/Celina-edge builds raise labor hours and risk delays.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$470–$1,350+',
        note: 'Higher with elevators, HOA windows, or peak tollway traffic',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,550–$4,000+',
        note: 'HOA soft costs and mid-rise elevators trend up',
      },
      {
        label: '3–4+ BR / gated community / cross-zone',
        value: '$2,600–$7,500+',
        note: 'Large HOA homes and long north–south pairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & corporate-calendar intelligence',
    intro:
      'Collin peaks follow school calendars, corporate lease cycles, new-home closings, and summer heat — not Dallas downtown lease density alone.',
    items: [
      {
        title: 'Peak family season: May–August',
        detail:
          'Frisco, McKinney, Allen, and Prosper SFH moves fill Saturday calendars first. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'Corporate multi-family turnover',
        detail:
          'Legacy and Frisco apartments can spike mid-month. Confirm building elevators and COI early.',
      },
      {
        title: 'Best value: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce Tollway / 75 / 121 pain. Avoid month-end Fridays when leases and closings collide.',
      },
    ],
  },
  specialized: [
    {
      id: 'hoa-master-planned',
      title: 'HOA master-planned & greenfield access',
      intro:
        'Frisco, Prosper, Celina-edge, Allen, and many Plano villages fail on gate lists, COI, and construction staging more often than on packing skill.',
      bullets: [
        'Collect HOA COI, gate lists, approved hours, and truck size limits before the survey is final.',
        'Confirm unfinished road and staging conditions the week of greenfield moves.',
        'Photo driveway, gate, and cul-de-sac turnaround space.',
        'Book peak June–August Saturdays early — family HOA corridors fill first.',
      ],
    },
    {
      id: 'corporate-relo-calendars',
      title: 'Corporate relo calendars & multi-family elevators',
      intro:
        'Legacy, Plano campus apartments, and Frisco HQ multi-family are elevator logistics plus employer-driven timing — not historic Dallas bungalow work.',
      bullets: [
        'Request apartment move packets (COI, elevator hours, dock rules) at lease signing.',
        'Expect mid-month and fiscal-quarter transfer clusters along corporate corridors.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Inventory for partial corporate-paid loads and tight multi-unit turns.',
      ],
    },
    {
      id: 'tollway-grid-freeflow',
      title: 'Tollway-grid freeflow logistics',
      intro:
        'Collin’s defining corridor stack is US-75, PGBT, Dallas North Tollway, SH-121, and US-380 — freer than Dallas urban core, still a line item.',
      bullets: [
        'Price portal-to-portal time honestly for Tollway, US-75, PGBT, 121, and 380 pairs.',
        'Avoid major Frisco sports/entertainment event start times for curb-dependent jobs when flexible.',
        'Clarify Dallas or Denton border addresses so drive-time assumptions stay accurate.',
        'Ask whether suburb-to-suburb pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in. Not a full Tier 1 lifestyle essay.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple independent school districts serve Collin County (Plano, Frisco, McKinney, Allen, Prosper, Wylie, and others). Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is split across many ISDs. Confirm zoning for any property — master-plan marketing names do not guarantee school assignment.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Northern and far-north growth can see enrollment pressure as new tracts open. Ask districts about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Texas Education Agency data, and campus visits beat ranking screenshots alone.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Medical City campuses, Baylor Scott & White, Texas Health resources, and other regional facilities serve Plano, Frisco, McKinney, and surrounding cities. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Prosper/Celina or east Collin to preferred facilities — tollway congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Collin County resources',
    intro:
      'Local official links first. TxDMV, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Collin County — official site',
        href: 'https://www.collincountytx.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Plano',
        href: 'https://www.plano.gov/',
        external: true,
      },
      {
        label: 'City of Frisco',
        href: 'https://www.friscotexas.gov/',
        external: true,
      },
      {
        label: 'City of McKinney',
        href: 'https://www.mckinneytexas.org/',
        external: true,
      },
      {
        label: 'DFW traffic — 511DFW',
        href: 'https://www.511dfw.org/',
        external: true,
        note: 'Tollway, US-75, 121 before load windows',
      },
    ],
  },
  directoryHint:
    'Filter by zone (Plano/Richardson edge, Frisco/McKinney, Allen/Prosper, Rural north edges) when available. Confirm HOA packets, corporate elevator windows, and tollway-grid drive assumptions — this is a DFW north corporate collar, not a renamed Dallas pack. Parent market: Dallas guide for metro-core context.',
  lastReviewed: '2026-07-24',
});
