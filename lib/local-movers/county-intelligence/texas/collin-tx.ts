import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Collin County, Texas moving intelligence.
 * Differentiators: Plano/McKinney/Frisco growth, HOA/master-planned, corporate corridor —
 * not Dallas urban core elevators alone, Fort Worth industrial character, or Austin density.
 */
export const collinCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'collin',
  hubTitle: 'Collin County Moving Intelligence Hub',
  eyebrow: 'Collin · Plano, Frisco, McKinney & master-planned growth',
  h1: 'Moving in Collin County: Plano–Frisco–McKinney Growth & HOA Corridor Guide',
  heroOpener:
    'Collin County is North Texas’s master-planned growth engine: corporate campuses and multi-family along the Plano/Legacy corridor, sports-and-HQ density in Frisco, historic-plus-new McKinney, and HOA villages that treat gate lists and COI as standard operating procedure. A Legacy mid-rise, a Frisco two-story in a guarded community, a McKinney craft bungalow near the square, and an Allen tract home do not share truck access or portal time. The Dallas North Tollway, US-75, Sam Rayburn Tollway (SH-121), and President George Bush Turnpike turn “suburb to suburb” into multi-freeway work. This hub is for people actually moving in Collin — not Dallas-core tips with Frisco pasted into the title.',
  heroCredibility:
    'TxDMV household goods for intrastate Texas moves · FMCSA for interstate legs · Master-planned HOA & corporate corridor focus · Curated directory listings',
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
    title: 'What makes moving in Collin County different',
    intro:
      'These are Collin realities — HOA-first master plans, corporate multi-family, and rapid northern growth under one county label — not interchangeable “Dallas suburbs” boilerplate.',
    bullets: [
      {
        title: 'HOA and master-planned rules are the default, not the exception',
        detail:
          'Many Frisco, Prosper, Celina-edge, and west Plano villages enforce gate lists, COI, approved hours, and truck size limits. Treat association packets as part of the survey, not an afterthought.',
      },
      {
        title: 'Corporate corridor multi-family is dense',
        detail:
          'Legacy, Plano tech/corporate campuses, and Frisco HQ districts generate mid-month apartment turnover with elevators and building windows that pure SFH estimates miss.',
      },
      {
        title: 'Suburb-to-suburb still means long portal time',
        detail:
          'McKinney ↔ west Plano, Allen ↔ Prosper, or Frisco ↔ Richardson-edge pairs ride Tollway / 75 / 121 peaks. Map miles understate rush hour in this growth belt.',
      },
      {
        title: 'Historic McKinney and new tracts are different jobs',
        detail:
          'Downtown McKinney edges can mean older street grids and porch carries; northern greenfield tracts mean construction traffic and unfinished staging. One county name, two skill sets.',
      },
      {
        title: 'School-calendar family demand dominates summers',
        detail:
          'Family SFH moves concentrate May–August across Frisco, McKinney, Allen, and Prosper. Saturday crews book out earlier than pure corporate markets expect.',
      },
      {
        title: 'Sports and entertainment event pockets',
        detail:
          'Frisco sports and entertainment districts can choke surface streets on event days — flexible timing beats fighting venue traffic with a box truck.',
      },
      {
        title: 'Cross-county North Texas pairs are routine',
        detail:
          'Households regularly move Collin ↔ Dallas, Denton, or Rockwall. Clarify county lines so drive time and licensing assumptions stay accurate.',
      },
      {
        title: 'Intrastate Texas rules vs interstate authority',
        detail:
          'Moves entirely within Texas are generally subject to TxDMV household-goods motor-carrier frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Collin access zones',
  zonesIntro:
    'Plan by Plano / Legacy corporate, Frisco sports-and-HQ belt, McKinney historic-plus-growth, Allen / Fairview, Prosper / Celina growth edge, and eastern Wylie / Princeton patterns — each has its own HOA and traffic profile.',
  zones: [
    {
      id: 'plano-legacy',
      name: 'Plano & Legacy: corporate campuses, mid-rises & west Plano SFH',
      shortName: 'Plano / Legacy',
      neighborhoods: [
        'Legacy corridor',
        'West Plano',
        'East Plano',
        'Willow Bend edges',
        'Downtown Plano edges',
        'Corporate multi-family belts',
      ],
      housingTypes:
        'Mid-rise multi-family, corporate apartments, established SFH, townhomes, some high-amenity product',
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
      ],
    },
    {
      id: 'frisco-hq',
      name: 'Frisco: HQ campuses, sports district & master-planned villages',
      shortName: 'Frisco',
      neighborhoods: [
        'Frisco',
        'The Star / sports district edges',
        'West Frisco master plans',
        'East Frisco tracts',
        'Frisco multi-family corridors',
        'Little Elm approach edges',
      ],
      housingTypes:
        'Master-planned SFH, gated HOA communities, mid-rise multi-family, corporate-adjacent apartments',
      challenges: [
        'Tollway / Sam Rayburn (121) peaks',
        'Dense HOA gate lists and COI',
        'Event-day surface traffic near sports venues',
        'High summer Saturday family demand',
      ],
      moverTips:
        'Treat Frisco as HOA-first growth work. Avoid major venue event start times for curb-dependent jobs. Book June–August Saturdays early. Photo gate and driveway access.',
      cityKeywords: [
        'frisco',
        'the star',
        'little elm',
        'frisco texas',
      ],
    },
    {
      id: 'mckinney',
      name: 'McKinney: historic square edges, established neighborhoods & north growth',
      shortName: 'McKinney',
      neighborhoods: [
        'Historic McKinney / downtown edges',
        'Established central McKinney',
        'North McKinney growth',
        'Craig Ranch edges',
        'West McKinney master plans',
        'East McKinney tracts',
      ],
      housingTypes:
        'Historic and renovated SFH, new master-planned product, multi-family, townhomes',
      challenges: [
        'Mix of narrow historic grids and new HOA villages',
        'US-75 / 121 / 380 congestion patterns',
        'Construction traffic on northern edges',
        'Long portal time to west Plano / Frisco job centers',
      ],
      moverTips:
        'Photo historic-street access near the square. Collect HOA packets for north and west master plans. Price 75/380 peaks honestly for cross-county pairs.',
      cityKeywords: [
        'mckinney',
        'craig ranch',
        'historic mckinney',
        'downtown mckinney',
      ],
    },
    {
      id: 'allen-fairview',
      name: 'Allen, Fairview & Lucas edges',
      shortName: 'Allen / Fairview',
      neighborhoods: [
        'Allen',
        'Fairview',
        'Lucas edges',
        'Allen multi-family corridors',
        'Watters Creek edges',
        'East Allen tracts',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, multi-family, some larger-lot edges',
      challenges: [
        'US-75 / Sam Rayburn peaks',
        'HOA move windows',
        'Event traffic near large venues in Allen',
        'Cross-zone demand to Frisco and Plano campuses',
      ],
      moverTips:
        'Collect HOA packets. Build venue-event buffers when moves sit near major Allen facilities. Prefer early starts for heat on open suburban streets.',
      cityKeywords: [
        'allen',
        'fairview',
        'lucas',
        'watters creek',
      ],
    },
    {
      id: 'prosper-celina-growth',
      name: 'Prosper, Celina & far-north greenfield growth',
      shortName: 'Prosper / Celina',
      neighborhoods: [
        'Prosper',
        'Celina',
        'Far-north master plans',
        'Dallas North Tollway north extension villages',
        'New construction corridors',
      ],
      housingTypes:
        'New master-planned SFH, HOA villages under construction, limited multi-family, greenfield product',
      challenges: [
        'Construction traffic and incomplete streets',
        'Strict HOA rules in new communities',
        'Long empty-mile time from southern staging',
        'Tollway north peaks and limited alternate routes',
      ],
      moverTips:
        'Confirm community truck access and unfinished road conditions the week of the move. Collect HOA packets early. Price long portal legs from Plano/Frisco honestly.',
      cityKeywords: [
        'prosper',
        'celina',
        'prosper texas',
        'celina texas',
      ],
    },
    {
      id: 'east-collin',
      name: 'East Collin: Wylie, Murphy, Princeton, Farmersville edges',
      shortName: 'East Collin',
      neighborhoods: [
        'Wylie',
        'Murphy',
        'Princeton',
        'Farmersville edges',
        'Lavon edges',
        'Nevada / Josephine approach edges',
      ],
      housingTypes:
        'Suburban SFH, HOA tracts, multi-family, growth-edge product',
      challenges: [
        'President George Bush Turnpike / Lake Lavon approach patterns',
        'Long portal time to Tollway job centers',
        'HOA rules in newer villages',
        'Rockwall / Hunt border confusion on far edges',
      ],
      moverTips:
        'Treat east Collin ↔ west Plano/Frisco pairs as multi-freeway jobs. Collect HOA packets. Clarify county-line addresses on eastern edges.',
      cityKeywords: [
        'wylie',
        'murphy',
        'princeton',
        'farmersville',
        'lavon',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Collin moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, corporate multi-family elevators, and tollway-grid portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'HOA gate lists, COI & approved hours',
        detail:
          'Master-planned communities across Frisco, Prosper, Celina edges, and west Plano add admin time and can force premium weekday slots.',
      },
      {
        title: 'Tollway / US-75 / 121 congestion',
        detail:
          'Portal-to-portal billing tracks peaks. Suburb-to-suburb pairs can burn 35–70+ minutes each way at rush.',
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
      {
        title: 'Peak summer family demand',
        detail:
          'School-calendar SFH volume tightens Saturday supply and raises peak pricing May–August.',
      },
      {
        title: 'Cross-county North Texas patterns',
        detail:
          'Collin ↔ Dallas, Denton, or Rockwall stops need honest distance assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
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
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$185+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Collin move',
    intro:
      'School calendars, corporate lease cycles, new-home closings, and summer heat all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce Tollway / 75 / 121 pain. Avoid month-end Fridays when leases and closings collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Frisco, McKinney, Allen, and Prosper SFH moves fill Saturday calendars first. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Corporate multi-family turnover',
        detail:
          'Legacy and Frisco apartments can spike mid-month. Confirm building elevators and COI early.',
      },
      {
        title: 'New-home closing clusters',
        detail:
          'Greenfield villages may see batches of closings that strain local crew supply. Book early when your builder closing date is firm.',
      },
      {
        title: 'Summer heat & event days',
        detail:
          'Prefer early starts for heat. Cross-check Frisco/Allen venue calendars for curb-dependent jobs near sports districts.',
      },
    ],
  },
  specialized: [
    {
      id: 'hoa-master-planned',
      title: 'Master-planned HOA & greenfield access module',
      intro:
        'Frisco, Prosper, Celina-edge, and many Plano villages fail on gate lists, COI, and construction staging more often than on packing skill.',
      bullets: [
        'Collect HOA COI, gate lists, approved hours, and truck size limits before the survey is final.',
        'Confirm unfinished road and staging conditions the week of greenfield moves.',
        'Photo driveway, gate, and cul-de-sac turnaround space.',
        'Book peak June–August Saturdays early — family HOA corridors fill first.',
        'Prefer early summer starts for heat on open new-construction streets.',
      ],
    },
    {
      id: 'corporate-tollway-corridor',
      title: 'Corporate multi-family & tollway corridor module',
      intro:
        'Legacy, Plano campus apartments, and Frisco HQ multi-family are elevator logistics plus Tollway/75 distance — not historic Dallas bungalow work.',
      bullets: [
        'Request apartment move packets (COI, elevator hours, dock rules) at lease signing.',
        'Price portal-to-portal time honestly for Tollway, US-75, and 121 pairs.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Avoid major sports/entertainment event start times near Frisco venues when flexible.',
        'Clarify Dallas or Denton border addresses so drive-time assumptions stay accurate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Collin County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, master-planned lifestyle — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
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
        title: 'Hospitals & healthcare access',
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
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Master-planned dominance',
            detail:
              'Much of Collin’s newer stock sits in HOA communities with amenities, architectural rules, and dues. Older Plano and historic McKinney offer different character and access profiles.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and master plan. Budget for HOA dues, gate communities, and parking fees in mid-rise product.',
          },
          {
            title: 'New construction pace',
            detail:
              'Far-north corridors can feel like active build sites. Visit at commute hours to understand construction traffic and noise before deciding.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Collin areas fit whom',
        bullets: [
          {
            title: 'Corporate multi-family lifestyle',
            detail:
              'Legacy and Frisco multi-family suit people prioritizing campus proximity and amenities over large yards — still car-dependent at peak.',
          },
          {
            title: 'Family master-planned suburbs',
            detail:
              'Frisco, Allen, McKinney growth, Prosper, and similar patterns often appeal for newer homes and school-focused living — with tollway commute tradeoffs.',
          },
          {
            title: 'Historic or quieter edges',
            detail:
              'Historic McKinney edges and some eastern Collin cities can feel less “new master plan”; verify commute to western job centers.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Employment anchors',
            detail:
              'Corporate headquarters, technology and telecom, finance and professional services, healthcare, retail, and sports/entertainment districts shape local employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. Tollway, US-75, 121, and Bush Turnpike peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'North Texas growth suburb character',
            detail:
              'Collin is defined by master-planned communities and corporate corridors — different from Dallas’s vertical core, Fort Worth’s industrial west, or Austin’s central density.',
          },
          {
            title: 'Climate',
            detail:
              'Hot summers and occasional severe storms. Plan outdoor staging and heat-safe move-in logistics.',
          },
          {
            title: 'Amenities and pace',
            detail:
              'Retail, sports, and new amenities are abundant in Frisco/Plano corridors; far-north edges can feel more construction-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Collin resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
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
        label: 'Plano ISD',
        href: 'https://www.pisd.edu/',
        external: true,
        note: 'Boundaries & calendars (one of several ISDs)',
      },
      {
        label: 'Frisco ISD',
        href: 'https://www.friscoisd.org/',
        external: true,
      },
      {
        label: 'McKinney ISD',
        href: 'https://www.mckinneyisd.net/',
        external: true,
      },
      {
        label: 'DFW traffic — 511DFW',
        href: 'https://www.511dfw.org/',
        external: true,
        note: 'Tollway, US-75, 121 before load windows',
      },
      {
        label: 'TxDMV — household goods movers',
        href: 'https://www.txdmv.gov/motor-carriers/household-goods-movers',
        external: true,
        note: 'Intrastate Texas household-goods motor carrier resources',
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        external: true,
        note: 'Required when the move crosses state lines',
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
      {
        label: 'All Texas local mover guides',
        href: '/local-movers/texas',
      },
    ],
  },
  directoryHint:
    'Prefer crews with master-planned HOA fluency for Frisco/Prosper/Celina; corporate multi-family elevator experience for Legacy and Frisco HQ apartments; honest Tollway/75 timing for suburb-to-suburb pairs. Verify TxDMV for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
