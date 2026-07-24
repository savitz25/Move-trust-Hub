import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoPack,
  CO_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-shared';

/**
 * Jefferson County, CO — Lakewood / Arvada foothills edge (not Denver elevators, not Adams airport belt).
 * Driveway elevation, C-470 / US-6, Colfax west, foothills weather.
 */
export const jeffersonCountyCoIntelligence: CountyIntelligencePack = finalizeCoPack({
  countySlug: 'jefferson',
  hubTitle: 'Jefferson County Moving Intelligence Hub',
  eyebrow: 'Jefferson · West metro · Lakewood, Arvada, Golden & foothills edge',
  h1: 'Moving in Jefferson County: Lakewood Access, Arvada Grids & Foothills Driveway Elevation',
  heroOpener:
    'Jefferson County is Denver’s western foothills collar: Lakewood mid-century and multifamily fabric, Arvada and Wheat Ridge grids, Golden canyon-edge product, and mountain-shadow driveways where grade and turn radius matter as much as cubic feet. A Lakewood Belmar condo elevator, an Arvada bi-level with steep approach, a Golden hillside long carry, and a C-470 HOA Saturday move do not share truck access or crew skill. I-70, US-6, C-470, Wadsworth, and Colfax west rewrite “local” estimates that ignore driveway elevation, tree canopy, and peak west-metro portal time. This hub is for people moving in Jefferson County — not a renamed RiNo loft page or generic Colorado template.',
  heroCredibility:
    'Colorado PUC household goods (HHG) permit for intrastate moves · FMCSA for interstate · Jefferson foothills driveway, HOA & west-metro corridor awareness · Curated listings',
  majorCorridors: 'I-70 · US-6 · C-470 · Wadsworth · Colfax west',
  whatMakesDifferent: {
    title: 'What makes moving in Jefferson County different',
    intro:
      'These are Jefferson west-metro realities — foothills driveway elevation, Lakewood/Arvada access mix, and C-470 / US-6 congestion — not Denver core elevators alone or Adams airport-adjacent growth sprawl.',
    bullets: [
      {
        title: 'Driveway elevation and grade rewrite labor hours',
        detail:
          'Golden edges, Lookout Mountain approaches, and many Arvada / Lakewood hillside streets add long uphill carries, limited truck turn radius, and winter ice risk. Survey photos beat verbal “driveway is fine” claims.',
      },
      {
        title: 'I-70, US-6, and C-470 turn short map miles into billable hours',
        detail:
          'Lakewood ↔ Arvada, Golden ↔ Belmar, or Colfax-west ↔ C-470 pairs look local and still burn 35–80+ minutes at peak — especially with mountain-bound weekend traffic. Price portal-to-portal honestly.',
      },
      {
        title: 'Lakewood product spans multifamily, mid-century, and HOA tracts',
        detail:
          'Belmar and Federal Center-adjacent multifamily need elevator/COI fluency; older ranch and bi-level stock need basement and stair surveys. One ZIP can hide both skill sets.',
      },
      {
        title: 'Arvada and Wheat Ridge grids still matter',
        detail:
          'Tree-lined curb, alley remnants, porch stairs, and garage geometry dominate established neighborhoods — not only foothills estate checklists.',
      },
      {
        title: 'Foothills weather compresses open-carry windows',
        detail:
          'Faster snow onset, canyon wind, and freeze–thaw on shaded north faces slow exterior work earlier than the plains. Prefer early starts and flexible weather contingency October–April.',
      },
      {
        title: 'Colfax west and Wadsworth arterials reshape curb staging',
        detail:
          'Commercial-strip congestion, signal density, and limited legal truck length near retail corridors force distant parking and long carries if crews skip surveys.',
      },
      {
        title: 'Cross-county Front Range pairs are routine',
        detail:
          'Households regularly move Jefferson ↔ Denver, Boulder County edges, Adams, Arapahoe, or mountain towns beyond. Clarify addresses so Colorado PUC HHG vs FMCSA assumptions stay accurate when any leg leaves Colorado.',
      },
      CO_REG_BULLET,
    ],
  },
  zonesHeading: 'Jefferson County access zones',
  zonesIntro:
    'Plan by Lakewood / Belmar mix, Arvada–Wheat Ridge north grids, Golden and foothills edges, south Jeffco C-470 HOA tracts, and Colfax-west / Wadsworth arterials — access rules cluster by elevation and corridor more than ZIP alone.',
  zones: [
    {
      id: 'lakewood-belmar',
      name: 'Lakewood, Belmar & central Jeffco multifamily / mid-century',
      shortName: 'Lakewood / Belmar',
      neighborhoods: [
        'Lakewood',
        'Belmar',
        'Villa Italia edges',
        'Green Mountain edges',
        'Federal Center-adjacent residential',
      ],
      housingTypes: 'Condo and multifamily, mid-century ranch, bi-levels, townhomes',
      challenges: [
        'Elevator/COI on denser Belmar product vs basement ranch stock',
        'US-6 / Wadsworth / Alameda congestion',
        'Mixed HOA rules on redevelopment tracts',
      ],
      moverTips:
        'Confirm unit type before final estimate. Collect building packets for multifamily. Photo basement access and driveway grade on mid-century SFH.',
      cityKeywords: [
        'lakewood',
        'belmar',
        'green mountain',
        'federal center',
        'villa italia',
      ],
    },
    {
      id: 'arvada-wheat-ridge',
      name: 'Arvada, Wheat Ridge & north Jeffco grids',
      shortName: 'Arvada / Wheat Ridge',
      neighborhoods: [
        'Arvada',
        'Olde Town Arvada edges',
        'Wheat Ridge',
        'Ralston corridor',
        'Kipling / Ward residential',
      ],
      housingTypes: 'Ranch and bi-level SFH, duplexes, limited multifamily, newer infill',
      challenges: [
        'I-70 / Wadsworth / Kipling peak clusters',
        'Tree canopy, curb limits, and porch stairs',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Survey curb options and stair counts. Build I-70 buffers for airport- or east-metro-linked pairs. Book peak Saturdays early for larger SFH.',
      cityKeywords: [
        'arvada',
        'wheat ridge',
        'olde town arvada',
        'ralston',
        'kipling',
      ],
    },
    {
      id: 'golden-foothills',
      name: 'Golden, foothills edges & canyon-approach residential',
      shortName: 'Golden / Foothills',
      neighborhoods: [
        'Golden',
        'Lookout Mountain edges',
        'Genesee edges',
        'Mt. Vernon Canyon approaches',
        'North Table / south Table residential edges',
      ],
      housingTypes: 'Hillside SFH, larger lots, some multifamily near downtown Golden',
      challenges: [
        'Steep driveways, limited turn radius, and long uphill carries',
        'US-6 / I-70 mountain-bound weekend congestion',
        'Winter ice on shaded grades',
      ],
      moverTips:
        'Pre-walk driveway length, grade, and truck turnaround. Prefer smaller trucks when required. Build weather contingency for any foothills unload.',
      cityKeywords: [
        'golden',
        'lookout mountain',
        'genesee',
        'mount vernon',
        'foothills',
      ],
    },
    {
      id: 'south-jeffco-c470',
      name: 'South Jeffco, Ken Caryl, Dakota Ridge & C-470 HOA belt',
      shortName: 'South Jeffco / C-470',
      neighborhoods: [
        'Ken Caryl',
        'Dakota Ridge',
        'Columbine edges',
        'Littleton Jeffco edges',
        'Deer Creek / Chatfield residential pockets',
      ],
      housingTypes: 'HOA SFH, townhomes, master-planned family product',
      challenges: [
        'HOA gate lists and approved move hours',
        'C-470 peak freeflow collapse',
        'Cross-county pairs into Douglas and Arapahoe',
      ],
      moverTips:
        'Collect HOA packets first. Price C-470 portal time honestly. Clarify Jeffco vs Douglas / Arapahoe address jurisdiction.',
      cityKeywords: [
        'ken caryl',
        'dakota ridge',
        'columbine',
        'littleton',
        'chatfield',
        'deer creek',
      ],
    },
    {
      id: 'colfax-west-wadsworth',
      name: 'Colfax west, Wadsworth corridor & older commercial-edge residential',
      shortName: 'Colfax west / Wadsworth',
      neighborhoods: [
        'West Colfax residential edges',
        'Wadsworth corridor',
        'Edgewater edges',
        'Applewood edges',
      ],
      housingTypes: 'Older SFH, duplexes, garden apartments, denser infill',
      challenges: [
        'Arterial congestion and scarce legal truck length',
        'Long carries from distant staging',
        'Mixed alley and driveway access by block',
      ],
      moverTips:
        'Photo curb and alley options. Prefer early mid-week starts on commercial strips. Inventory basement and garage items carefully.',
      cityKeywords: [
        'edgewater',
        'applewood',
        'wadsworth',
        'west colfax',
        'lakewood colfax',
      ],
    },
    {
      id: 'evergreen-mountain-edge',
      name: 'Evergreen, Conifer approaches & mountain-edge Jeffco',
      shortName: 'Evergreen / Mountain edge',
      neighborhoods: [
        'Evergreen',
        'Conifer edges',
        'Idledale / Kittredge edges',
        'Mountain residential pockets',
      ],
      housingTypes: 'Mountain SFH, long private drives, higher-value inventories',
      challenges: [
        'Narrow mountain roads, private-drive length, and limited truck size',
        'Weather and wildlife delays',
        'Long empty miles from metro staging yards',
      ],
      moverTips:
        'Confirm road width, seasonal restrictions, and drive surface. Prefer experienced mountain-access crews. Price empty miles and weather contingency explicitly.',
      cityKeywords: [
        'evergreen',
        'conifer',
        'idledale',
        'kittredge',
        'jefferson mountain',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Jefferson County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Driveway elevation, HOA rules, basement labor, and I-70 / C-470 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Driveway elevation, grade & long uphill carries',
        detail:
          'Foothills and hillside product add labor and equipment risk before packing skill matters.',
      },
      {
        title: 'I-70 · US-6 · C-470 · Wadsworth congestion',
        detail:
          'Cross-zone and mountain-edge pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA master-planned rules on south Jeffco tracts',
        detail:
          'Gate lists, truck limits, and approved hours push demand into peak pricing.',
      },
      {
        title: 'Basements, bi-levels & mid-century geometry',
        detail:
          'Lakewood and Arvada stock commonly add flight counts and awkward garage turns.',
      },
      {
        title: 'Mountain-edge empty miles & weather friction',
        detail:
          'Evergreen / Conifer destinations and winter ice raise staging distance and cancellation risk.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$480–$1,650+',
        note: 'Higher with steep drives, elevators, or peak C-470 pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,400–$4,200+',
        note: 'Grade, basement, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / foothills / mountain-edge / cross-zone',
        value: '$2,800–$9,500+',
        note: 'Steep drives and long I-70 mountain pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$205+/hr',
        note: 'Portal-to-portal; packing and grade labor scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Jefferson County move',
    intro:
      'School calendars, foothills weather, mountain-bound weekend traffic, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, reduce US-6 / C-470 pain, and avoid mountain-bound recreational surges. Avoid month-end Fridays when leases and HOA slots collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Arvada, Lakewood, and south Jeffco SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Foothills winter: ice, shade, and early storms',
        detail:
          'Shaded north-face driveways ice earlier than plains addresses. Prefer flexible dates, early starts, and contingency for salt, mats, and delayed foothills access.',
      },
      {
        title: 'Ski-season and weekend I-70 compression',
        detail:
          'Winter and peak recreation weekends can collapse I-70 freeflow for any Golden or mountain-edge pair. Prefer mid-week loads when flexible.',
      },
    ],
  },
  specialized: [
    {
      id: 'jeffco-foothills-driveway',
      title: 'Jefferson foothills driveway, HOA & west-metro corridor module',
      intro:
        'Jefferson estimates fail more often on driveway grade, HOA packets, and I-70 / C-470 portal time than on packing skill alone.',
      bullets: [
        'Pre-walk driveway length, grade, turn radius, and surface before finalizing truck size.',
        'Collect HOA gate lists, truck limits, and approved hours for Ken Caryl / Dakota Ridge / similar tracts.',
        'Price portal-to-portal time for any pair that rides I-70, US-6, C-470, Wadsworth, or Colfax west at peak.',
        'Photo basement access, porch stairs, and curb options for Lakewood and Arvada mid-century stock.',
        'Build winter ice contingency on any foothills or mountain-edge unload.',
        'Clarify Jefferson vs Denver / Boulder County / Douglas addresses on every estimate.',
        'Verify Colorado PUC household goods (HHG) permit for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'mountain-edge-access',
      title: 'Evergreen / mountain-edge access module',
      intro:
        'Mountain-edge Jeffco jobs need road-width honesty and weather buffers that plains HOA quotes omit.',
      bullets: [
        'Confirm private-drive width, seasonal road conditions, and low-clearance hazards in writing.',
        'Prefer smaller trucks or shuttle strategies when full trailers cannot turn.',
        'Price empty miles from metro yards explicitly — do not bury them in a flat “local” rate.',
        'Match higher-value mountain inventories to crews experienced with long carries and weather delays.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Jefferson County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures foothills vs plains fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Jefferson County Public Schools (Jeffco Public Schools) covers most county addresses, with some edge cases near municipal boundaries. Assignment is address-based — marketing names like Belmar or Ken Caryl do not guarantee a campus.',
          },
          {
            title: 'Option and choice programs',
            detail:
              'Jeffco offers a mix of neighborhood and option programs. Confirm enrollment windows, transportation, and capacity when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'Jeffco Public Schools boundary tools, Colorado Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'St. Anthony (Lakewood), Lutheran (Wheat Ridge area network context), OrthoColorado, and broader UCHealth / HealthONE metro campuses serve Jeffco residents. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Golden or Ken Caryl to preferred campuses — US-6 and C-470 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Mid-century plains, HOA south belt & foothills hillside',
            detail:
              'Expect ranch/bi-level stock across Lakewood and Arvada; HOA SFH along south C-470; denser multifamily near Belmar; and hillside / mountain-edge product toward Golden and Evergreen.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply from older Wheat Ridge grids to Genesee and Evergreen. Budget for HOA dues, hillside maintenance, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and condo buildings often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Jefferson areas fit whom',
        bullets: [
          {
            title: 'Lakewood / Belmar amenity-adjacent living',
            detail:
              'Suits people prioritizing central west-metro access and mixed housing — with multifamily COI tradeoffs and arterial congestion.',
          },
          {
            title: 'Arvada–Wheat Ridge established neighborhoods',
            detail:
              'Often appeals for yards, schools, and grid character — with I-70 timing and mid-century basement logistics.',
          },
          {
            title: 'Golden and foothills edge',
            detail:
              'Attracts households seeking mountain proximity and outdoor lifestyle — with driveway elevation and weather tradeoffs on move day.',
          },
          {
            title: 'South Jeffco C-470 HOA corridors',
            detail:
              'Fits buyers chasing master-planned family product — with gate logistics and reverse-commute peaks into Denver.',
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
              'Federal Center and government-adjacent work, healthcare campuses, west-metro retail and light industrial, Denver reverse-commutes, and some tech / professional spillover concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households remain car-dependent. I-70, US-6, C-470, Wadsworth, and Colfax west peaks are real; mountain recreation weekends add noise. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, plains-to-foothills range',
            detail:
              'Jefferson stacks suburban grids, redevelopment multifamily, C-470 HOA belts, and true mountain-edge living — different from Denver’s loft core or Adams’s north-metro growth belt.',
          },
          {
            title: 'Climate',
            detail:
              'Front Range sun with faster foothills snow onset, canyon wind, and freeze–thaw on shaded grades. Plan outdoor staging and winter driveway readiness as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Outdoor access is a primary draw; commercial energy clusters along Belmar, Olde Town Arvada, and Golden. Outer HOA corridors feel more school-calendar driven. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Jefferson County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Colorado PUC household goods (HHG) permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Jefferson County — official site',
        href: 'https://www.jeffco.us/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Jeffco Public Schools',
        href: 'https://www.jeffcopublicschools.org/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'City of Lakewood',
        href: 'https://www.lakewood.org/',
        external: true,
        note: 'Municipal services & permits',
      },
      {
        label: 'CDOT COtrip — road conditions',
        href: 'https://www.cotrip.org/',
        external: true,
        note: 'I-70 / US-6 / C-470 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with foothills driveway and grade fluency for Golden / Evergreen product; HOA experience for Ken Caryl / Dakota Ridge; mixed multifamily and mid-century skill for Lakewood / Arvada; honest I-70 · US-6 · C-470 · Wadsworth timing for cross-zone pairs. Verify Colorado PUC household goods (HHG) permit for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
