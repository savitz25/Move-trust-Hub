import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * Champaign County, IL — Champaign–Urbana university cycles.
 * UIUC lease pulses, I-57 / I-74 logistics, Savoy–Mahomet–Rantoul mix.
 */
export const champaignCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'champaign',
  hubTitle: 'Champaign County Moving Intelligence Hub',
  eyebrow: 'Champaign · Champaign–Urbana · UIUC cycles, Savoy, Mahomet, Rantoul & I-57 / I-74',
  h1: 'Moving in Champaign County: UIUC Lease Cycles, Twin-City Access & I-57 / I-74 Logistics',
  heroOpener:
    'Champaign County is central Illinois’s university twin-city market — Champaign and Urbana stacked with student multifamily, faculty SFH, and research-corridor living; Savoy and Mahomet holding family growth product; Rantoul and north county carrying base-legacy and small-town logistics. A Campus Town third-floor walk-up, a Urbana faculty bungalow, a Savoy HOA ranch, and a mid-August lease hard date do not share truck access or crew skill. I-57, I-74, US-45, and university corridor arterials rewrite “local” estimates that ignore August spikes, elevator or stair bottlenecks, and portal-to-portal time between twin cities and outer towns. This hub is for people moving in Champaign County — university-cycle logistics, not Springfield capital copy and not Chicago collar sprawl.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods authority for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-57 · I-74 · US-45 · University corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Champaign County different',
    intro:
      'These are Champaign–Urbana university realities — August lease pulses, campus walk-ups, and I-57/I-74 portal time — not capital-city government calendars or Metro East bridge traffic.',
    bullets: [
      {
        title: 'UIUC and academic lease cycles dominate summer and mid-year demand',
        detail:
          'August move-in, May move-out, and mid-year academic windows fill campus-adjacent crews first. Elevator slots, parking permits, and stair crews book early — Saturday-only quotes miss the real peak.',
      },
      {
        title: 'Campus Town and near-campus product is stairs and tight curb by default',
        detail:
          'Walk-up multifamily, limited legal curb, and long carries rewrite jobs that look “studio simple” on paper. Faculty SFH a few blocks away still needs driveway photos — not a one-size twin-city checklist.',
      },
      {
        title: 'I-57 and I-74 turn short map miles into billable hours',
        detail:
          'Champaign ↔ Urbana can be slow on university arterials; Champaign ↔ Savoy, Urbana ↔ Mahomet, or twin-city ↔ Rantoul pairs burn portal time at peak, game weekends, and construction seasons.',
      },
      {
        title: 'Savoy and Mahomet growth product is its own logistics stack',
        detail:
          'HOA tracts, larger family inventories, and longer empty miles from campus staging yards do not share Campus Town elevator or stair patterns.',
      },
      {
        title: 'Research park and professional relocates run mid-week, not only student Saturdays',
        detail:
          'Faculty, lab, and tech-adjacent households often need weekday hard dates that compete with academic multifamily spikes for the same crews.',
      },
      {
        title: 'Rantoul and north-county stock differs from twin-city density',
        detail:
          'Base-legacy multifamily, small-town SFH, and longer I-57 approaches need honest empty-mile pricing and access surveys — not Urbana curb rules pasted north.',
      },
      {
        title: 'US-45 and university arterials reshape twin-city timing',
        detail:
          'Neil Street, University Avenue, and related corridors rewrite “ten-minute” pairs during class change, events, and football weekends. Price portal-to-portal, not odometer optimism.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'Champaign County access zones',
  zonesIntro:
    'Plan by Champaign campus-adjacent density, Urbana faculty and east twin-city stock, Savoy south growth, Mahomet west family corridors, Rantoul north, and St. Joseph–east county edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'champaign-campus',
      name: 'Champaign campus-adjacent, Campustown & west twin-city',
      shortName: 'Champaign campus',
      neighborhoods: [
        'Campustown',
        'University District Champaign',
        'Downtown Champaign edges',
        'West Champaign near-campus',
        'Neil Street corridor residential',
      ],
      housingTypes: 'Walk-up multifamily, student apartments, limited mid-rise, older SFH pockets',
      challenges: [
        'Stairs, elevators, and near-universal tight curb at peak',
        'August lease and game-weekend congestion',
        'Parking permits and loading-window rules on multifamily',
      ],
      moverTips:
        'Reserve elevators and parking in writing. Prefer mid-week early starts outside major event weekends. Photo stair counts and staging options.',
      cityKeywords: [
        'champaign',
        'campustown',
        'university district',
        'neil street',
        'uiuc',
      ],
    },
    {
      id: 'urbana-east',
      name: 'Urbana core, faculty neighborhoods & east twin-city',
      shortName: 'Urbana',
      neighborhoods: [
        'Downtown Urbana',
        'University District Urbana',
        'East Urbana neighborhoods',
        'Sunnycrest edges',
        'Philips Recreation area residential edges',
      ],
      housingTypes: 'Faculty SFH, walk-up multifamily, older grids, limited mid-rise',
      challenges: [
        'Tree-lined curb and limited truck length',
        'University Avenue / Lincoln Avenue peak pulses',
        'Mixed product on short distances (bungalow vs student multi-unit)',
      ],
      moverTips:
        'Confirm unit type and stair vs elevator before final estimate. Survey driveway grade and street width. Avoid class-change peaks when flexible.',
      cityKeywords: [
        'urbana',
        'sunnycrest',
        'lincoln avenue',
        'university avenue',
        'east urbana',
      ],
    },
    {
      id: 'savoy-south',
      name: 'Savoy, south growth & research-park edges',
      shortName: 'Savoy / South',
      neighborhoods: [
        'Savoy',
        'South Champaign growth',
        'Research Park residential edges',
        'Willard Airport corridor pockets',
        'Newer family tracts',
      ],
      housingTypes: 'HOA SFH, townhomes, professional multifamily, newer tracts',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-57 / US-45 approach congestion',
        'Cross-zone pairs into campus density at lease peaks',
      ],
      moverTips:
        'Collect HOA packets first. Price I-57 / university corridor portal time. Clarify Champaign vs Savoy addresses on every estimate.',
      cityKeywords: ['savoy', 'research park', 'south champaign', 'willard', 'airport'],
    },
    {
      id: 'mahomet-west',
      name: 'Mahomet, west family corridors & I-74 west',
      shortName: 'Mahomet / West',
      neighborhoods: [
        'Mahomet',
        'Lake of the Woods edges',
        'West county family pockets',
        'I-74 west residential',
        'Rising growth tracts',
      ],
      housingTypes: 'Family SFH, some HOA tracts, limited multifamily, larger lots',
      challenges: [
        'I-74 peak freeflow toward twin cities',
        'High Saturday family demand May–August',
        'Longer empty miles from campus-centric staging yards',
      ],
      moverTips:
        'Build I-74 buffer for morning and evening peaks. Book peak Saturdays early. Survey basements and driveway pitch.',
      cityKeywords: ['mahomet', 'lake of the woods', 'west champaign county', 'i-74'],
    },
    {
      id: 'rantoul-north',
      name: 'Rantoul, north county & base-legacy stock',
      shortName: 'Rantoul / North',
      neighborhoods: [
        'Rantoul',
        'Former Chanute area residential',
        'North US-45 corridors',
        'Thomasboro edges',
        'Fisher edges',
      ],
      housingTypes: 'Modest SFH, base-legacy multifamily, small-town stock',
      challenges: [
        'Longer empty miles from twin-city crews',
        'I-57 north approaches and weather-sensitive staging',
        'Different curb and inventory profile than campus product',
      ],
      moverTips:
        'Price empty miles honestly. Photo multifamily access separately from SFH. Prefer crews willing to stage north without underquoting drive time.',
      cityKeywords: [
        'rantoul',
        'chanute',
        'thomasboro',
        'fisher',
        'north champaign',
      ],
    },
    {
      id: 'st-joseph-east',
      name: 'St. Joseph, east county & I-74 east edges',
      shortName: 'St. Joseph / East',
      neighborhoods: [
        'St. Joseph',
        'Ogden edges',
        'Philo edges',
        'East county rural-suburban mix',
        'I-74 east residential pockets',
      ],
      housingTypes: 'Small-town SFH, rural-lot edges, limited multifamily',
      challenges: [
        'Longer empty miles and soft shoulders on township roads',
        'I-74 east peak pairs into Urbana',
        'Weather-sensitive rural approaches',
      ],
      moverTips:
        'Pre-walk lane width and turnarounds. Price I-74 portal time. Confirm weather contingency for spring thaw.',
      cityKeywords: ['st joseph', 'st. joseph', 'ogden', 'philo', 'east champaign'],
    },
  ],
  costDrivers: {
    title: 'What drives Champaign County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. August lease soft costs, stair/elevator access, and I-57/I-74 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Walk-up stairs, elevators & campus curb scarcity',
        detail:
          'Campus-adjacent multifamily adds labor and schedule risk before packing skill matters — especially in August.',
      },
      {
        title: 'I-57 / I-74 / university arterial congestion',
        detail:
          'Twin-city and outer-town pairs burn portal-to-portal hours even when map miles look short — worse on game weekends and lease peaks.',
      },
      {
        title: 'Savoy–Mahomet HOA and growth-tract rules',
        detail:
          'Gate lists, truck limits, and larger family inventories push time and equipment constraints into the quote.',
      },
      {
        title: 'Academic hard dates and research onboarding',
        detail:
          'Lease-end clusters and faculty/start-date relocates create competition for mid-week and weekend crews.',
      },
      {
        title: 'North/east empty miles and multi-county pairs',
        detail:
          'Rantoul, St. Joseph, and adjacent-county destinations raise staging distance; out-of-state legs add FMCSA complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,400+',
        note: 'Higher with campus walk-ups or August peaks',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,100–$3,600+',
        note: 'Elevator/HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone / lease peak',
        value: '$2,200–$7,200+',
        note: 'Mahomet estates and peak twin-city pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$175+/hr',
        note: 'Portal-to-portal; packing and building admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Champaign County move',
    intro:
      'UIUC academic calendars, family seasons, humidity, and game weekends reshape access and crew availability across the twin cities and outer towns.',
    items: [
      {
        title: 'Best windows: mid-week early mornings outside lease peaks',
        detail:
          'Tuesday–Thursday starts clear curb and reduce university arterial pain. Avoid month-end Fridays in August when leases and elevators collide.',
      },
      {
        title: 'Peak academic season: mid-May and mid-August',
        detail:
          'Campus-adjacent multifamily demand fills first. Book 3–6 weeks ahead for peak move-in/move-out and elevator slots.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Savoy–Mahomet Saturday SFH demand overlaps academic spikes. Book early or shift to mid-week when flexible.',
      },
      {
        title: 'Game weekends, events & weather',
        detail:
          'Football and major campus events erase curb near the universities. Summer storms and winter ice also matter — prefer early starts and contingency plans.',
      },
    ],
  },
  specialized: [
    {
      id: 'uiuc-campus-lease',
      title: 'UIUC campus lease & twin-city access module',
      intro:
        'Champaign County estimates fail more often on lease-peak scheduling, stair/elevator packets, and university arterial portal time than on packing skill alone.',
      bullets: [
        'Reserve elevators, parking permits, and building move windows in writing for campus multifamily.',
        'Photo stair counts, curb options, and alley staging for Campustown and Urbana walk-ups.',
        'Price portal-to-portal time for any pair that rides I-57, I-74, US-45, or university corridors at peak.',
        'Avoid major game weekends for campus-adjacent staging when flexible.',
        'Clarify Champaign vs Urbana vs Savoy vs Mahomet addresses on every estimate.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'faculty-research-family',
      title: 'Faculty, research & family growth relocation module',
      intro:
        'Many Champaign County households move on academic appointments, research starts, or family SFH timelines that differ from pure student lease jobs.',
      bullets: [
        'Ask about hard start dates, lab onboarding, and school calendars at estimate time.',
        'Clarify storage-in-transit and partial-load needs for temporary housing.',
        'Collect HOA packets for Savoy–Mahomet growth product separately from campus multifamily rules.',
        'Match inventory complexity (home office, research equipment policies, full family SFH) to crew experience.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Champaign County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Unit 4 (Champaign), Urbana District 116, and separate districts for Savoy-area patterns, Mahomet-Seymour, Rantoul, St. Joseph, and others serve the county. Assignment is address-based — living “near campus” does not define K–12 assignment.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Savoy and Mahomet growth can see enrollment pressure. Ask districts about capacity, boundaries, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Illinois State Board of Education data, and campus visits beat ranking screenshots alone. UIUC is higher education — not a substitute for K–12 research.',
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
              'Carle Foundation Hospital, OSF Heart of Mary Medical Center, and related Champaign–Urbana campuses anchor regional care, with additional specialty options. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Mahomet or Rantoul to preferred campuses — I-74 / I-57 and university arterial congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Campus multifamily vs faculty SFH vs outer growth',
            detail:
              'Expect dense walk-up and student product near UIUC; faculty and professional SFH across Urbana and parts of Champaign; HOA family tracts in Savoy and Mahomet; small-town and base-legacy stock in Rantoul.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Rents near campus spike around academic calendars; purchase prices vary by twin-city vs outer suburb. Budget for HOA dues on growth tracts and older-home repair risk near core grids.',
          },
          {
            title: 'Multifamily and lease governance',
            detail:
              'Student and professional multifamily often control move hours, elevators, parking, and deposits. Read documents carefully before lease signing — especially for August turnovers.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Champaign areas fit whom',
        bullets: [
          {
            title: 'Campus-adjacent student and early-career lifestyle',
            detail:
              'Suits people prioritizing short walks to UIUC and twin-city amenities — with stair, curb, and August logistics tradeoffs.',
          },
          {
            title: 'Urbana faculty and professional neighborhoods',
            detail:
              'Often appeals for established SFH near campus culture — with tree-lined access constraints and mixed multifamily neighbors.',
          },
          {
            title: 'Savoy south professional / family growth',
            detail:
              'Attracts households seeking newer housing and research-park adjacency — with HOA rules and twin-city peak drives.',
          },
          {
            title: 'Mahomet west family living',
            detail:
              'Fits buyers chasing larger lots and school-oriented suburbs — with I-74 commute realism into the twin cities.',
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
              'University of Illinois Urbana-Champaign, healthcare (Carle/OSF patterns), research park and tech-adjacent roles, education, logistics, and regional retail concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent outside dense twin-city nodes. I-57, I-74, US-45, and university corridor peaks are real. Test drive peak routes and a class-change window before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Champaigns',
            detail:
              'Champaign County stacks campus density, faculty neighborhoods, Savoy/Mahomet family growth, Rantoul north stock, and east small towns — a university twin-city market, not Springfield capital or Metro East.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, severe-storm season, and cold winters with ice. Plan outdoor staging and weather contingency as part of move-in — especially during August heat.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Arts, dining, and events concentrate around Champaign–Urbana; game weekends change traffic and curb overnight. Outer towns feel more family- and school-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Champaign County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Champaign County — official site',
        href: 'https://www.co.champaign.il.us/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Champaign',
        href: 'https://champaignil.gov/',
        external: true,
        note: 'Municipal services',
      },
      {
        label: 'City of Urbana',
        href: 'https://www.urbanaillinois.us/',
        external: true,
        note: 'Municipal services — twin city',
      },
      {
        label: 'University of Illinois Urbana-Champaign',
        href: 'https://illinois.edu/',
        external: true,
        note: 'Academic calendars & campus context',
      },
      {
        label: 'IDOT travel / traffic conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'I-57 / I-74 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with campus multifamily, stair/elevator, and August lease-peak experience for Champaign–Urbana; HOA fluency for Savoy–Mahomet; honest I-57 / I-74 / university corridor timing for cross-zone pairs. Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
