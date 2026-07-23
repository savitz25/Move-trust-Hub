import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/** Hunterdon — historic villages, equestrian/rural, I-78 commuter. */
export const hunterdonCountyNjIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'hunterdon',
  hubTitle: 'Hunterdon County Rural & Village Moving Guide',
  eyebrow: 'Hunterdon County · Historic villages & open land',
  h1: 'Moving to Hunterdon County, NJ: Country Access, Historic Homes & I-78 Commutes',
  heroOpener:
    'Hunterdon trades dense suburbia for villages, farm edges, and larger lots — with Flemington and Clinton as anchors and I-78 carrying many professionals toward employment centers. The move risk here is access: long driveways, low wires, soft ground, and historic staircases — not casino elevators.',
  heroCredibility:
    'Rural driveway logistics · Historic home care · I-78 timing · Independent directory',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'specialized',
    'relocation',
    'costDrivers',
    'seasonal',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'Hunterdon’s country-move checklist',
    intro: 'If the estimate assumes a suburban cul-de-sac, it is incomplete.',
    bullets: [
      {
        title: 'Long rural approaches',
        detail:
          'Gravel, single-lane bridges, and gated entries can force smaller trucks or multiple trips. Send video of the last quarter mile.',
      },
      {
        title: 'Historic homes',
        detail:
          'Narrow stair turns and plaster walls need careful padding plans — “blanket wrap only” may not protect original railings.',
      },
      {
        title: 'Equestrian / outbuilding inventories',
        detail:
          'Barns and workshops add awkward, heavy items. List them explicitly or they become day-of surprises.',
      },
      {
        title: 'I-78 commute clock',
        detail:
          'Professionals heading east toward Somerset/Union corridors feel peak congestion — hourly moves should avoid those windows when possible.',
      },
      {
        title: 'Cell dead zones',
        detail:
          'Some valleys have weak signal; give crews gate codes and printed directions, not only a pin.',
      },
    ],
  },
  zonesHeading: 'Hunterdon by landscape',
  zonesIntro: 'Village cores and agricultural edges need different truck choices.',
  zones: [
    {
      id: 'flemington',
      name: 'Flemington area',
      shortName: 'Flemington',
      neighborhoods: ['Flemington', 'Raritan Twp areas'],
      housingTypes: 'Village homes, suburban infill, shopping-corridor apartments',
      challenges: ['Downtown parking', 'Mixed-age housing stock'],
      moverTips: 'Reserve street space early for downtown deliveries.',
      cityKeywords: ['flemington', 'raritan'],
    },
    {
      id: 'clinton-north',
      name: 'Clinton & northern villages',
      shortName: 'Clinton',
      neighborhoods: ['Clinton', 'High Bridge', 'Lebanon'],
      housingTypes: 'Historic village homes, hillside lots',
      challenges: ['Steep drives', 'Narrow streets', 'Older stairs'],
      moverTips: 'Measure stair width; hillside homes may need extra crew.',
      cityKeywords: ['clinton', 'high bridge', 'lebanon'],
    },
    {
      id: 'west-delaware',
      name: 'Delaware River townships',
      shortName: 'River west',
      neighborhoods: ['Stockton area', 'western townships', 'river-adjacent roads'],
      housingTypes: 'Country homes, some floodplain-adjacent parcels',
      challenges: ['Floodplain awareness', 'Long access', 'Limited staging'],
      moverTips: 'Check flood maps; avoid heavy trucks on soft river-bottom soils after rain.',
      cityKeywords: ['stockton', 'lambertville edge', 'delaware'],
    },
    {
      id: 'east-readington',
      name: 'Readington & eastern townships',
      shortName: 'East Hunterdon',
      neighborhoods: ['Readington', 'Whitehouse Station area', 'eastern farms'],
      housingTypes: 'Large lots, newer builds mixed with farms',
      challenges: ['Driveway length', 'I-78 interchange traffic'],
      moverTips: 'Plan arrivals outside peak I-78 merges.',
      cityKeywords: ['readington', 'whitehouse'],
    },
  ],
  specialized: [
    {
      id: 'rural-driveway',
      title: 'Rural driveway & long-access module',
      intro: 'Country access is the #1 estimate killer in Hunterdon.',
      bullets: [
        'Photo gates, switchbacks, and overhead wires.',
        'Ask whether a shuttle from the road is included or extra.',
        'Mark septic lids and wells so trucks do not drive over them.',
        'Have a weather backup if the driveway is unpaved.',
      ],
    },
    {
      id: 'historic',
      title: 'Historic home handling',
      intro: 'Older interiors need slower carries and more protection.',
      bullets: [
        'Flag fragile plaster and original floors on the walkthrough.',
        'Confirm valuation coverage for antiques.',
        'Allow more hours than a same-sq-ft new colonial.',
      ],
    },
  ],
  seasonal: {
    title: 'Seasonal notes for Hunterdon',
    intro: 'Mud season and foliage weekends both affect access.',
    items: [
      {
        title: 'Spring thaw',
        detail: 'Unpaved drives soften — reschedule heavy trucks after multi-day rain.',
      },
      {
        title: 'Fall foliage tourism',
        detail: 'Western roads get visitor traffic; start early on peak weekends.',
      },
      {
        title: 'Winter hills',
        detail: 'Steep drives may need salting before a morning load.',
      },
    ],
  },
  costDrivers: {
    title: 'What moves cost in Hunterdon (context)',
    intro: 'Travel time and access complexity often outweigh pure inventory size.',
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$950' },
      { label: 'Family / large-lot home', value: '$1,700–$3,600+' },
      { label: '2-person crew', value: '$110–$165/hr' },
    ],
    drivers: [
      { title: 'Driveway shuttle', detail: 'Common when trailers cannot reach the house.' },
      { title: 'Extra labor for stairs', detail: 'Historic multi-story homes add hours.' },
      { title: 'Regional travel minimums', detail: 'Some crews price from denser bases.' },
    ],
  },
  relocation: {
    title: 'Living in Hunterdon — research modules',
    intro:
      'Space, schools with strong local reputations in several districts, and a quieter pace — balanced against car dependence and longer errands.',
    modules: [
      {
        id: 'schools',
        title: 'Schools',
        intro:
          'Hunterdon uses local and regional districts (e.g., systems serving Flemington-Raritan, North Hunterdon-Voorhees region, Delaware Valley region, and others). Always match the parcel to the district.',
        bullets: [
          {
            title: 'Regional high schools',
            detail:
              'Many students attend regional high schools that draw from multiple municipalities — research both elementary feeders and the high school campus.',
          },
          {
            title: 'Performance data',
            detail:
              'NJ DOE reports and district sites are primary; treat third-party rankings as conversation starters only.',
          },
          {
            title: 'Bus rides',
            detail:
              'Rural addresses can mean longer bus times — ask about routes if that matters for your family.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare access',
        bullets: [
          {
            title: 'Hunterdon Medical Center (Flemington area)',
            detail:
              'Primary local hospital resource for much of the county; confirm specialty coverage and transfer relationships for complex care.',
          },
          {
            title: 'Travel for tertiary care',
            detail:
              'Some residents use New Brunswick, Morristown, or Philadelphia systems for specialty care — map drive times.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & costs',
        bullets: [
          {
            title: 'Land premium',
            detail:
              'Larger lots and privacy command premiums versus denser Central Jersey towns; septic/well maintenance is a real ownership cost.',
          },
          {
            title: 'Village vs acreage',
            detail:
              'Walkable village living is limited inventory; most homes assume a car.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit',
        bullets: [
          { title: 'Flemington area', detail: 'Services, shopping, more central errands.' },
          { title: 'Clinton / High Bridge', detail: 'Village character, hills, smaller lots.' },
          { title: 'Western townships', detail: 'Maximum privacy, longer drives.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commuting',
        bullets: [
          {
            title: 'I-78 eastbound',
            detail: 'Common professional commute pattern toward employment centers east of the county.',
          },
          {
            title: 'Local economy',
            detail: 'Healthcare, education, small business, agriculture-adjacent work.',
          },
          {
            title: 'Transit',
            detail: 'Limited rail utility for most addresses — plan car-first.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle',
        bullets: [
          {
            title: 'Outdoors',
            detail: 'Parks, trails, and river recreation are quality-of-life centerpieces.',
          },
          {
            title: 'Dark skies & quiet',
            detail: 'Less light pollution than urban counties — and fewer late-night services.',
          },
        ],
      },
      {
        id: 'demographics',
        title: 'Who lives here',
        bullets: [
          {
            title: 'Lower density',
            detail:
              'Hunterdon is among New Jersey’s less dense counties, with a mix of long-time rural households and commuting professionals (Census density patterns).',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Hunterdon resources',
    intro: 'Confirm driveway access before you compare hourly rates.',
    items: [
      { label: 'Hunterdon County', href: 'https://www.co.hunterdon.nj.us/', external: true },
      { label: 'NJ DOE reports', href: 'https://rc.doe.state.nj.us/', external: true },
      {
        label: 'Directory: Hunterdon',
        href: '/companies?coverage=state&state=NJ&counties=hunterdon',
      },
      { label: 'NJ county guides', href: '/local-movers/new-jersey' },
    ],
  },
  directoryHint: 'Share driveway photos and stair measurements with every quote request.',
  lastReviewed: '2026-07-22',
};
