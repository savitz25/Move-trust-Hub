import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Travis County, Texas moving intelligence.
 * Differentiators: Austin density/tech, traffic, central vs suburban —
 * not Houston sprawl scale, DFW freeway corporate grid, or SA military PCS cycles.
 */
export const travisCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'travis',
  hubTitle: 'Travis County Moving Intelligence Hub',
  eyebrow: 'Travis · Austin core density, tech corridors & traffic',
  h1: 'Moving in Travis County: Austin Core Density, Tech Corridors & Suburb Guide',
  heroOpener:
    'Travis County is Austin’s density-and-traffic puzzle: vertical and townhome product in central districts, tech-driven multi-family along Domain and north corridors, and suburban belts in Round Rock-edge patterns, Manor growth, and Lake Travis hills where grades and HOAs rewrite the job. A downtown high-rise, an East Austin bungalow, a Domain apartment, and a Steiner Ranch two-story do not share truck access or drive time. MoPac, I-35, 183, and 360 turn short map miles into long portal windows — especially when SXSW, ACL, UT move-in, and tech lease cycles collide. This hub is for people actually moving in Travis — not generic “keep Austin weird” tips without loading-dock reality.',
  heroCredibility:
    'TxDMV household goods for intrastate Texas moves · FMCSA for interstate legs · Austin density & traffic awareness · Curated directory listings',
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
    title: 'What makes moving in Travis County different',
    intro:
      'These are Travis realities — central density, tech corridor multi-family, and painful arterial traffic under one county name — not interchangeable “Central Texas” boilerplate.',
    bullets: [
      {
        title: 'Central Austin access is a different job than suburbs',
        detail:
          'Downtown, Rainey, Zilker edges, Hyde Park, and East Austin mean elevators, narrow streets, or porch carries. Cedar Park-edge patterns, Pflugerville, and far-south tracts flip to HOA cul-de-sacs and longer freeway legs.',
      },
      {
        title: 'Traffic is the primary portal-to-portal cost driver',
        detail:
          'I-35, MoPac (Loop 1), US-183, and 360 routinely erase optimistic ETAs. “Local” central ↔ Domain or East Austin ↔ Lake Travis pairs need honest peak buffers.',
      },
      {
        title: 'Tech and corporate multi-family concentration',
        detail:
          'Domain, north tech corridors, and downtown towers generate mid-month apartment turnover that competes with family summer demand — inventories and building rules differ from pure SFH suburbs.',
      },
      {
        title: 'UT and festival calendars spike core congestion',
        detail:
          'University move-in, football weekends, SXSW, ACL, and major downtown events can make central curb access impractical. Flexible dates outperform fighting festival traffic.',
      },
      {
        title: 'Hills, lakes, and HOAs on the west side',
        detail:
          'West Lake, Lakeway, Bee Cave, and Steiner Ranch patterns can include grades, longer driveways, gate lists, and limited truck turnarounds that flat east-side tracts do not.',
      },
      {
        title: 'Rapid growth on eastern and northern edges',
        detail:
          'Manor, Pflugerville, and northern multi-family belts add construction traffic and HOA density. Crew calendars fill early in peak season.',
      },
      {
        title: 'Cross-county Austin metro pairs are routine',
        detail:
          'Households regularly move Travis ↔ Williamson or Hays. Clarify county lines so drive time and licensing assumptions stay accurate.',
      },
      {
        title: 'Intrastate Texas rules vs interstate authority',
        detail:
          'Moves entirely within Texas are generally subject to TxDMV household-goods motor-carrier frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Travis access zones',
  zonesIntro:
    'Plan by downtown / central vertical, east central neighborhoods, north tech corridors, west lake / hill country edges, south Austin, and eastern growth — each has its own access and traffic profile.',
  zones: [
    {
      id: 'austin-core-downtown',
      name: 'Austin core: Downtown, Rainey, Seaholm & market-district vertical',
      shortName: 'Austin Core',
      neighborhoods: [
        'Downtown Austin',
        'Rainey Street district',
        'Seaholm / market district edges',
        'Warehouse District edges',
        '2nd Street / Congress corridor',
        'Lady Bird Lake south-bank edges',
      ],
      housingTypes:
        'High-rises and mid-rises, urban condos, luxury multi-family, some loft product',
      challenges: [
        'Elevator/COI and loading-dock reservations',
        'Festival, concert, and UT event traffic',
        'Extremely limited curb staging',
        'Garage height and truck route constraints',
      ],
      moverTips:
        'Get building packets at lease signing. Prefer mid-week morning freight windows outside festival weeks. Share dock photos and truck height limits. Reconfirm elevators the day before.',
      cityKeywords: [
        'austin',
        'downtown austin',
        'rainey',
        'seaholm',
        'congress avenue',
      ],
    },
    {
      id: 'central-east',
      name: 'Central & East: Hyde Park, Clarksville, East Austin & Zilker edges',
      shortName: 'Central / East',
      neighborhoods: [
        'Hyde Park',
        'Clarksville',
        'East Austin',
        'Zilker edges',
        'Barton Hills edges',
        'Mueller edges',
      ],
      housingTypes:
        'Older bungalows and SFH, ADUs, townhomes, mid-rise multi-family, renovated stock',
      challenges: [
        'Narrow streets and limited truck length',
        'Street-park pressure near popular corridors',
        'Stairs, porches, and mature landscaping',
        'High-value contents and careful-handling norms',
      ],
      moverTips:
        'Photo driveway width, street turns, and stairs. Prefer early starts. Discuss valuation for renovated inventories. Avoid ACL / Zilker peak weekends for nearby jobs when flexible.',
      cityKeywords: [
        'hyde park',
        'clarksville',
        'east austin',
        'zilker',
        'barton hills',
        'mueller',
      ],
    },
    {
      id: 'north-tech',
      name: 'North tech: Domain, North Burnet, Allandale edges & 183 corridor',
      shortName: 'North Tech',
      neighborhoods: [
        'The Domain',
        'North Burnet',
        'Allandale edges',
        'Crestview edges',
        'US-183 / MoPac north multi-family',
        'Tech Ridge edges',
      ],
      housingTypes:
        'Mid-rise multi-family, apartments, some SFH and townhomes, corporate-adjacent product',
      challenges: [
        'MoPac / 183 / I-35 corporate congestion',
        'Apartment move windows and elevator COI',
        'Mid-month tech lease-turn spikes',
        'Williamson County border confusion northward',
      ],
      moverTips:
        'Collect apartment packets early. Price MoPac and 183 peaks honestly. Mid-week mornings reduce tech commute collisions. Clarify Travis vs Williamson destinations.',
      cityKeywords: [
        'domain',
        'north burnet',
        'allandale',
        'crestview',
        'tech ridge',
      ],
    },
    {
      id: 'west-lake-hills',
      name: 'West: West Lake Hills, Rollingwood, Bee Cave, Lakeway & Steiner Ranch',
      shortName: 'West / Lake',
      neighborhoods: [
        'West Lake Hills',
        'Rollingwood',
        'Bee Cave',
        'Lakeway',
        'Steiner Ranch',
        'Barton Creek edges',
      ],
      housingTypes:
        'Higher-end SFH, hill-country lots, HOA communities, gated villages, some multi-family',
      challenges: [
        'Grades, long driveways, and limited truck turnarounds',
        'HOA gate lists and COI',
        'Bee Caves Road / 360 / 71 congestion',
        'Heat and longer carry distances on sloped lots',
      ],
      moverTips:
        'Photo driveway grade and turnaround space. Collect HOA packets. Price 360 / Bee Caves peaks honestly. Prefer early starts for heat on exposed lots.',
      cityKeywords: [
        'west lake hills',
        'rollingwood',
        'bee cave',
        'lakeway',
        'steiner ranch',
        'barton creek',
      ],
    },
    {
      id: 'south-austin',
      name: 'South Austin: SoCo edges, South Lamar, Manchaca & Slaughter corridors',
      shortName: 'South Austin',
      neighborhoods: [
        'South Congress edges',
        'South Lamar',
        'Manchaca corridor',
        'Slaughter Lane corridor',
        'Onion Creek edges',
        'Far south multi-family',
      ],
      housingTypes:
        'Older SFH and bungalows, renovated stock, apartments, townhomes, growth multi-family',
      challenges: [
        'I-35 / South Lamar / Manchaca congestion',
        'Mixed older-grid and new multi-family access',
        'Hays County border pairs southward',
        'Festival spillover near central south corridors',
      ],
      moverTips:
        'Photo older-grid access near SoCo-adjacent streets. Price south ↔ Domain pairs with full I-35/MoPac buffer. Clarify Travis vs Hays destinations.',
      cityKeywords: [
        'south austin',
        'south lamar',
        'manchaca',
        'slaughter',
        'onion creek',
        'soco',
      ],
    },
    {
      id: 'east-growth',
      name: 'Eastern growth: Manor, Hornsby Bend edges & 290 east corridor',
      shortName: 'East Growth',
      neighborhoods: [
        'Manor',
        'Hornsby Bend edges',
        'US-290 east corridor',
        'Colony Park edges',
        'Eastern multi-family growth',
        'Webberville approach edges',
      ],
      housingTypes:
        'Newer SFH tracts, HOA communities, multi-family, construction-phase neighborhoods',
      challenges: [
        '290 / 130 / construction traffic',
        'HOA rules in new villages',
        'Long portal time to central or west destinations',
        'Incomplete streets and limited staging on active builds',
      ],
      moverTips:
        'Treat eastern growth as HOA-plus-distance work. Confirm community truck access the week of the move. Book summer Saturdays early.',
      cityKeywords: [
        'manor',
        'hornsby bend',
        'webberville',
        'colony park',
        '290 east',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Travis moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Core elevator soft costs and Austin arterial traffic separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Downtown elevator, COI & dock soft costs',
        detail:
          'Building packets, elevator reservations, and certificate admin add time before loading starts on core towers.',
      },
      {
        title: 'Arterial congestion (I-35 / MoPac / 183 / 360)',
        detail:
          'Portal-to-portal billing tracks peaks. Central ↔ Domain or east ↔ west lake pairs can burn 40–80+ minutes each way.',
      },
      {
        title: 'Festival and UT event access risk',
        detail:
          'SXSW, ACL, football, and downtown events can force overtime, reschedules, or long detours for curb-dependent jobs.',
      },
      {
        title: 'West-side grades, gates & long carries',
        detail:
          'Hill-country driveways, HOA rules, and limited turnarounds raise labor hours vs flat east-side cul-de-sacs.',
      },
      {
        title: 'Apartment density in tech corridors',
        detail:
          'Domain and north multi-family enforce move windows and elevators that pure SFH rate cards understate.',
      },
      {
        title: 'Cross-county Austin metro patterns',
        detail:
          'Travis ↔ Williamson or Hays stops need honest distance assumptions in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,450+',
        note: 'Higher with elevators, festivals, or peak arterial traffic',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,600–$4,300+',
        note: 'HOA/apartment soft costs and older-grid carries trend up',
      },
      {
        label: '3–4+ BR / core tower / cross-zone',
        value: '$2,900–$8,200+',
        note: 'Downtown towers and long west/east pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$195+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Travis move',
    intro:
      'UT calendars, tech lease cycles, festival season, school moves, and summer heat all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce I-35 / MoPac pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Suburban SFH and multi-family moves fill Saturday calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'UT move-in and football weekends',
        detail:
          'Central and near-campus multi-family spike around semester starts and home games. Avoid peak student weekends when flexible.',
      },
      {
        title: 'Festival season (SXSW, ACL, major downtown events)',
        detail:
          'Core access can collapse during major festivals. Shift downtown jobs or build large buffers when dates are flexible.',
      },
      {
        title: 'Summer heat',
        detail:
          'Prefer early starts; heat slows open carries on west-side lots and new-construction eastern streets.',
      },
    ],
  },
  specialized: [
    {
      id: 'austin-core-density',
      title: 'Austin core density & festival-access module',
      intro:
        'Downtown, Rainey, and central-east jobs fail on docks, curb space, and event calendars more often than on packing skill.',
      bullets: [
        'Request building move packets (COI, elevator hours, dock rules) at lease signing or escrow.',
        'Share dock, garage height, and street photos for towers and bungalows.',
        'Cross-check SXSW, ACL, UT, and downtown event calendars before locking Saturday core jobs.',
        'Reserve freight elevators in writing and reconfirm the day before.',
        'Discuss valuation for higher-value central inventories early.',
      ],
    },
    {
      id: 'tech-west-traffic',
      title: 'Tech corridor multi-family & west-hill HOA module',
      intro:
        'Domain apartments and west-lake HOA volume is elevator/HOA logistics plus MoPac/360 distance — not pure downtown loft packing.',
      bullets: [
        'Collect apartment and HOA packets before the survey is final.',
        'Price portal-to-portal time honestly for I-35, MoPac, 183, and 360 pairs.',
        'Photo driveway grade and turnaround space for west-side SFH.',
        'Prefer early summer starts for heat on exposed lots and streets.',
        'Clarify Williamson or Hays border addresses so drive-time assumptions stay accurate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Travis County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, core density vs suburban space — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Multiple independent school districts serve Travis County (Austin ISD, Eanes, Lake Travis, Manor, Del Valle, Pflugerville-edge patterns, and others). Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is split across multiple ISDs. Confirm zoning for any property — neighborhood marketing names do not guarantee school assignment.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Eastern and some southern growth corridors can see enrollment pressure. Ask districts about capacity and busing when touring.',
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
              'Dell Seton / Ascension, St. David’s, Baylor Scott & White, and other regional campuses serve Austin. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from west lake or eastern growth suburbs to preferred facilities — MoPac and I-35 change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core density vs suburban stock',
            detail:
              'Expect towers and townhomes downtown; bungalows and renovated SFH in central/east; multi-family in tech corridors; larger HOA lots on west lake and eastern growth edges.',
          },
          {
            title: 'Cost pressure',
            detail:
              'Purchase and rent levels are often elevated relative to many Texas metros, especially near central amenities and west-side school corridors. Budget for parking and HOA fees.',
          },
          {
            title: 'HOA and apartment rules',
            detail:
              'West-side villages and north multi-family often enforce move windows and fees. Read documents carefully before closing or signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Travis areas fit whom',
        bullets: [
          {
            title: 'Urban and central lifestyle',
            detail:
              'Downtown, Rainey, East Austin, Hyde Park, and Zilker edges suit people prioritizing walkability and cultural access over yard space — with traffic and parking tradeoffs.',
          },
          {
            title: 'Tech corridor convenience',
            detail:
              'Domain and north multi-family often appeal for shorter tech-campus access and amenities — still car-dependent at peak.',
          },
          {
            title: 'West lake and east growth family patterns',
            detail:
              'Bee Cave, Lakeway, Steiner Ranch, and Manor-area growth can offer more space; verify commute into central job centers before choosing on house size alone.',
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
              'Technology, government, education (including UT), healthcare, creative industries, and professional services shape local employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households still rely on cars. I-35, MoPac, 183, and 360 peaks are real. Test drive peak routes before choosing solely on purchase price or rent.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Dense core metro with outdoor edges',
            detail:
              'Travis mixes a compact cultural core, tech multi-family belts, and lake/hill country edges — different from Houston’s scale sprawl or San Antonio’s military-centered geography.',
          },
          {
            title: 'Climate',
            detail:
              'Hot summers and generally mild winters. Plan outdoor staging and heat-safe move-in logistics.',
          },
          {
            title: 'Events and growth pace',
            detail:
              'Festivals and rapid construction can mean noise and traffic. Visit at commute and event hours before deciding on a central address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Travis resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Travis County — official site',
        href: 'https://www.traviscountytx.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Austin',
        href: 'https://www.austintexas.gov/',
        external: true,
      },
      {
        label: 'Austin ISD',
        href: 'https://www.austinisd.org/',
        external: true,
        note: 'Boundaries & calendars (one of several ISDs)',
      },
      {
        label: 'Eanes ISD',
        href: 'https://www.eanesisd.net/',
        external: true,
      },
      {
        label: 'Lake Travis ISD',
        href: 'https://www.ltisdschools.org/',
        external: true,
      },
      {
        label: 'Austin traffic — Mobility35 / regional conditions',
        href: 'https://www.mobility35.org/',
        external: true,
        note: 'I-35 corridor context before load windows',
      },
      {
        label: 'TxDOT Austin district',
        href: 'https://www.txdot.gov/',
        external: true,
        note: 'MoPac, 183, 360 conditions',
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
    'Prefer crews with downtown dock/elevator experience for core towers; festival-calendar awareness for central jobs; HOA and grade fluency for west lake; honest MoPac/I-35 timing for Domain and cross-zone pairs. Verify TxDMV for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
