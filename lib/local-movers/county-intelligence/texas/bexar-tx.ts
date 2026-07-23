import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Bexar County, Texas moving intelligence.
 * Differentiators: San Antonio, military installations, sprawl, extreme heat —
 * not Houston energy corridor, Austin tech density, or DFW freeway corporate grid.
 */
export const bexarCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'bexar',
  hubTitle: 'Bexar County Moving Intelligence Hub',
  eyebrow: 'Bexar · San Antonio core, military bases & heat sprawl',
  h1: 'Moving in Bexar County: San Antonio Core, Military Corridors & Sprawl Guide',
  heroOpener:
    'Bexar County is San Antonio’s metro: a historic downtown and River Walk core on one side, major military installations shaping housing demand on another, and fast outer-loop sprawl where summer heat and long arterial drives define the job. A downtown loft, a Pearl-adjacent condo, a Lackland-area rental, and a Stone Oak two-story do not share truck access, security rules, or portal time. I-10, I-35, Loop 1604, and Loop 410 turn cross-town “local” moves into heat-and-traffic endurance tests. This hub is for people actually moving in Bexar — not generic Texas tips recycled from Austin or Houston.',
  heroCredibility:
    'TxDMV household goods for intrastate Texas moves · FMCSA for interstate legs · Military & heat-sprawl awareness · Curated directory listings',
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
    title: 'What makes moving in Bexar County different',
    intro:
      'These are Bexar realities — military PCS cycles, historic core access, and outer-loop sprawl under extreme heat — not interchangeable “South Texas” boilerplate.',
    bullets: [
      {
        title: 'Military installations shape demand calendars',
        detail:
          'Joint Base San Antonio (Fort Sam Houston, Lackland, Randolph) and related housing create PCS-driven spikes that pure civilian markets do not see. Base access and housing office rules can affect timing.',
      },
      {
        title: 'Historic core and tourist density change staging',
        detail:
          'Downtown, River Walk approaches, and King William / Southtown grids mean tight streets, event traffic, and limited truck length that Stone Oak cul-de-sacs never face.',
      },
      {
        title: 'Outer-loop sprawl is the real “local” distance',
        detail:
          'Loop 1604 and Loop 410 pairs from far north to far west routinely burn 45–75+ minutes at peak. Map miles understate arterial and freeway congestion.',
      },
      {
        title: 'Extreme heat is a labor-hours factor',
        detail:
          'San Antonio summers routinely stress open carries. Heat-safe pacing and early starts are operational necessities from late spring through early fall — not optional comfort tips.',
      },
      {
        title: 'Medical Center and northwest multi-family density',
        detail:
          'Medical Center apartments and northwest corridors generate mid-month turnover that competes with family summer SFH demand on the outer loops.',
      },
      {
        title: 'Hill Country edge vs flat east/south patterns',
        detail:
          'Northwest and far-north edges can include grades, longer drives, and different housing product than east-side industrial-adjacent tracts. Surveys must match topography and stock.',
      },
      {
        title: 'Cross-county SA metro pairs are common',
        detail:
          'Households regularly move Bexar ↔ Comal, Guadalupe, or Medina. Clarify county lines so drive time and licensing assumptions stay accurate.',
      },
      {
        title: 'Intrastate Texas rules vs interstate authority',
        detail:
          'Moves entirely within Texas are generally subject to TxDMV household-goods motor-carrier frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Bexar access zones',
  zonesIntro:
    'Plan by San Antonio core / downtown, near-core historic and medical corridors, northwest growth, northeast (Stone Oak / 281), south/southeast, and far west / 1604 belt — each has its own access, military, and heat profile.',
  zones: [
    {
      id: 'sa-core-downtown',
      name: 'San Antonio core: Downtown, River Walk & Pearl edges',
      shortName: 'SA Core',
      neighborhoods: [
        'Downtown San Antonio',
        'River Walk approaches',
        'Pearl District edges',
        'Tobin Hill edges',
        'Lavaca edges',
        'Convention / Alamodome approaches',
      ],
      housingTypes:
        'High-rises and mid-rises, urban lofts, hotels-adjacent multi-family, renovated historic product',
      challenges: [
        'Elevator/COI and tight curb staging',
        'Tourist and event traffic near River Walk',
        'Limited truck length on historic streets',
        'Fiesta and major event calendar disruptions',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning windows away from major festivals. Share dock and street photos. Avoid peak tourist load hours when flexible.',
      cityKeywords: [
        'san antonio',
        'downtown san antonio',
        'river walk',
        'pearl',
        'tobin hill',
      ],
    },
    {
      id: 'near-core-historic-med',
      name: 'Near-core: King William, Southtown, Medical Center & Alamo Heights edges',
      shortName: 'Near-Core',
      neighborhoods: [
        'King William',
        'Southtown',
        'Alamo Heights edges',
        'Olmos Park edges',
        'Medical Center',
        'Deco District edges',
      ],
      housingTypes:
        'Historic SFH, bungalows, mid-rise multi-family, medical apartments, townhomes',
      challenges: [
        'Narrow historic streets and porch carries',
        'Medical Center congestion and multi-family turnover',
        'Higher-value contents in historic districts',
        'Street-park pressure near popular corridors',
      ],
      moverTips:
        'Photo driveway and street width in King William / Southtown. Collect apartment packets for Medical Center. Discuss valuation for historic inventories.',
      cityKeywords: [
        'king william',
        'southtown',
        'alamo heights',
        'olmos park',
        'medical center',
      ],
    },
    {
      id: 'northwest-growth',
      name: 'Northwest: Helotes edges, Leon Valley, Medical Center NW & 1604 west',
      shortName: 'Northwest',
      neighborhoods: [
        'Leon Valley',
        'Helotes edges',
        'Shavano Park edges',
        'Northwest Side multi-family',
        'Loop 1604 west villages',
        'Bandera Road corridor',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, multi-family, Hill Country-edge product',
      challenges: [
        'I-10 / Loop 1604 congestion',
        'HOA COI and gate lists',
        'Heat exposure on open new-construction streets',
        'Grades and longer driveway carries on some edges',
      ],
      moverTips:
        'Price I-10 and 1604 peaks honestly. Collect HOA packets. Prefer early summer starts for heat on open sites.',
      cityKeywords: [
        'helotes',
        'leon valley',
        'shavano park',
        'northwest san antonio',
        'bandera road',
      ],
    },
    {
      id: 'northeast-stone-oak',
      name: 'Northeast: Stone Oak, Hollywood Park, Live Oak & 281 corridor',
      shortName: 'NE / Stone Oak',
      neighborhoods: [
        'Stone Oak',
        'Hollywood Park',
        'Live Oak',
        'Universal City edges',
        'Selma edges',
        'US-281 north corridor',
      ],
      housingTypes:
        'Master-planned SFH, HOA villages, multi-family, higher-end suburban product',
      challenges: [
        'US-281 / Loop 1604 peaks',
        'Dense HOA rules and summer family demand',
        'Long portal time to south-side origins',
        'Randolph / northeast military-adjacent timing',
      ],
      moverTips:
        'Treat Stone Oak and 281 growth as HOA-first work. Book summer Saturdays early. Build buffer for 281 peaks and military-related timing when relevant.',
      cityKeywords: [
        'stone oak',
        'hollywood park',
        'live oak',
        'universal city',
        'selma',
        '281',
      ],
    },
    {
      id: 'south-southeast',
      name: 'South & southeast: South Side, Brooks edges & I-37 corridor',
      shortName: 'South / SE',
      neighborhoods: [
        'South Side',
        'Brooks edges',
        'East Side edges',
        'I-37 corridor multi-family',
        'Elmendorf approach edges',
        'Pleasanton Road corridor edges',
      ],
      housingTypes:
        'Older SFH, renovated stock, multi-family, growth tracts on southern edges',
      challenges: [
        'I-37 / I-10 south approach congestion',
        'Varied older-grid access',
        'Heat and limited shade on open streets',
        'Long north-bound portal time to Stone Oak / Medical Center',
      ],
      moverTips:
        'Photo older-grid access. Price south ↔ far-north pairs as full cross-town jobs. Prefer early starts in peak heat.',
      cityKeywords: [
        'south side',
        'brooks',
        'east side',
        'elmendorf',
        'san antonio south',
      ],
    },
    {
      id: 'west-military-sprawl',
      name: 'West: Lackland approaches, SeaWorld corridor & far-west 1604',
      shortName: 'West / Lackland',
      neighborhoods: [
        'Lackland approaches',
        'SeaWorld / Westover Hills edges',
        'Far-west Loop 1604 villages',
        'Castroville approach edges',
        'Potranco corridor',
      ],
      housingTypes:
        'Military-adjacent multi-family and rentals, suburban SFH, HOA growth tracts',
      challenges: [
        'PCS-driven demand spikes',
        'Base-adjacent traffic and timing constraints',
        'I-410 / US-90 / 1604 congestion',
        'Extreme heat on open western growth streets',
      ],
      moverTips:
        'Ask about PCS windows and base housing timelines early. Price west ↔ northeast pairs with full loop buffer. Start early for heat; confirm HOA rules on new tracts.',
      cityKeywords: [
        'lackland',
        'seaworld',
        'westover hills',
        'potranco',
        'castroville',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Bexar moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Core access soft costs, loop sprawl portal time, and heat-related pacing separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Downtown elevator, COI & tourist-corridor access',
        detail:
          'Building packets, tight curb space, and event/tourist traffic add time before and during core load-outs.',
      },
      {
        title: 'Loop sprawl congestion (I-10 / I-35 / 410 / 1604)',
        detail:
          'Portal-to-portal billing tracks peaks. Far-north ↔ far-west or south ↔ Medical Center pairs can burn 45–75+ minutes each way.',
      },
      {
        title: 'Military PCS concentration',
        detail:
          'Seasonal and cycle-driven demand around base housing can tighten crew calendars and raise peak pricing.',
      },
      {
        title: 'HOA density on outer growth belts',
        detail:
          'Gate lists, COI, and approved hours in Stone Oak and 1604 villages push demand into premium slots.',
      },
      {
        title: 'Heat-safe pacing and weather holds',
        detail:
          'Extreme heat slows open carries and can force longer job hours or earlier crew starts on suburban streets.',
      },
      {
        title: 'Historic near-core long carries',
        detail:
          'Tight grids, stairs, and limited driveway depth raise labor hours vs new cul-de-sac product.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$420–$1,250+',
        note: 'Higher with elevators, festivals, or peak loop traffic',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,400–$3,800+',
        note: 'HOA soft costs and older-grid carries trend up',
      },
      {
        label: '3–4+ BR / core vertical / cross-zone',
        value: '$2,400–$7,000+',
        note: 'Downtown vertical and long 1604 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$175+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Bexar move',
    intro:
      'PCS cycles, school calendars, Fiesta and tourist peaks, and extreme summer heat all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts before 8–9 a.m. clear curb space and reduce loop pain — and beat peak heat. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family & PCS season: late spring–summer',
        detail:
          'Outer-loop SFH and military-adjacent moves fill calendars. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Fiesta and major downtown events',
        detail:
          'Festival periods can choke core access. Shift downtown jobs when flexible or build large buffers.',
      },
      {
        title: 'Medical Center multi-family turnover',
        detail:
          'Apartment corridors near medical campuses spike around training and lease cycles. Confirm building windows early.',
      },
      {
        title: 'Extreme heat (May–September)',
        detail:
          'Plan early starts, water/rest pacing, and shade where possible. Noon open carries on new-construction streets are high-risk for delays.',
      },
    ],
  },
  specialized: [
    {
      id: 'sa-core-historic',
      title: 'San Antonio core & historic-district access module',
      intro:
        'Downtown, River Walk approaches, King William, and Southtown jobs fail on street width, events, and docks more often than on packing skill.',
      bullets: [
        'Request building move packets (COI, elevator hours, dock rules) early for vertical product.',
        'Share street and driveway photos for historic grids.',
        'Avoid Fiesta peak and major downtown event days when flexible.',
        'Discuss valuation for higher-value historic inventories early.',
        'Prefer early morning windows to clear tourist traffic.',
      ],
    },
    {
      id: 'military-heat-sprawl',
      title: 'Military PCS & outer-loop heat-sprawl module',
      intro:
        'Lackland/Fort Sam/Randolph-adjacent volume and 1604 growth are timing, HOA, and heat logistics — not downtown loft packing alone.',
      bullets: [
        'Ask about PCS orders windows and base housing keys early in the survey.',
        'Collect HOA COI and gate lists for Stone Oak and far-loop villages.',
        'Price portal-to-portal time honestly for any 410 / 1604 cross-town pair.',
        'Default to early starts in summer; plan heat-safe crew pacing.',
        'Clarify Comal, Guadalupe, or Medina border addresses before final pricing.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Bexar County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, military lifestyle, core vs sprawl — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Multiple independent school districts and public charters serve Bexar County (San Antonio ISD, Northside, North East, Judson, and others). Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is split across many ISDs. Confirm zoning for any property — master-plan marketing names do not guarantee school assignment.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Northwest and northeast growth corridors can see enrollment pressure. Ask districts about capacity and busing when touring.',
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
              'University Health, Methodist Healthcare, Baptist Health System, military medical facilities for eligible beneficiaries, and other regional campuses serve the metro. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from outer-loop suburbs to preferred Medical Center or regional facilities. Transfer records early — especially for PCS households.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core vs sprawl stock',
            detail:
              'Expect denser multi-unit and historic SFH near downtown and near-core districts; larger HOA tracts dominate Stone Oak, far-northwest, and western 1604 growth.',
          },
          {
            title: 'Military housing patterns',
            detail:
              'On-base and privatized military housing has separate assignment rules from civilian rentals. Off-base military-adjacent multi-family can see PCS-driven turnover.',
          },
          {
            title: 'HOA prevalence',
            detail:
              'Newer north and west communities often include dues and architectural rules. Read association documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Bexar areas fit whom',
        bullets: [
          {
            title: 'Urban and historic lifestyle',
            detail:
              'Downtown, Pearl edges, King William, and Southtown suit people prioritizing walkable culture and shorter urban access over new-tract square footage.',
          },
          {
            title: 'North growth family suburbs',
            detail:
              'Stone Oak, Hollywood Park, and similar 281/1604 patterns often appeal for newer homes and amenities — with long cross-town commute risk.',
          },
          {
            title: 'Military-adjacent practicality',
            detail:
              'West and northeast base approaches can suit active-duty households needing shorter base access; verify traffic at shift and gate times.',
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
              'Military and defense, healthcare, tourism and hospitality, cybersecurity and tech growth, education, and logistics shape local employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-10, I-35, Loop 410, and Loop 1604 peaks are real. Test drive peak routes from outer suburbs before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'South Texas metro with military roots',
            detail:
              'Bexar mixes a tourist-facing historic core, large military presence, and sprawling suburban belts — different from Austin’s tech-core density or Houston’s energy sprawl.',
          },
          {
            title: 'Climate',
            detail:
              'Long, hot summers and mild winters. Heat is a daily livability and moving-logistics factor; plan outdoor work early.',
          },
          {
            title: 'Culture and events',
            detail:
              'Fiesta, sports, and River Walk tourism create energy — and occasional access constraints near the core. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Bexar resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Bexar County — official site',
        href: 'https://www.bexar.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of San Antonio',
        href: 'https://www.sanantonio.gov/',
        external: true,
      },
      {
        label: 'Northside ISD',
        href: 'https://www.nisd.net/',
        external: true,
        note: 'Boundaries & calendars (one of several ISDs)',
      },
      {
        label: 'North East ISD',
        href: 'https://www.neisd.net/',
        external: true,
      },
      {
        label: 'San Antonio ISD',
        href: 'https://www.saisd.net/',
        external: true,
      },
      {
        label: 'Joint Base San Antonio',
        href: 'https://www.jbsa.mil/',
        external: true,
        note: 'Military community resources',
      },
      {
        label: 'TxDOT San Antonio traffic',
        href: 'https://www.txdot.gov/',
        external: true,
        note: 'I-10, I-35, loops before load windows',
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
    'Prefer crews with downtown/historic-grid experience for core jobs; PCS and base-adjacent timing fluency for military corridors; HOA and heat-safe early starts for Stone Oak and 1604 growth. Verify TxDMV for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
