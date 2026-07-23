import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/** Warren — Delaware River, Phillipsburg, rural northwest-west NJ. */
export const warrenCountyNjIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'warren',
  hubTitle: 'Warren County River & Ridge Moving Guide',
  eyebrow: 'Warren County · Delaware River & rural west',
  h1: 'Moving to Warren County, NJ: River Towns, Rural Access & Cross-Border Notes',
  heroOpener:
    'Warren County faces the Delaware River at Phillipsburg, climbs into ridge-and-valley countryside, and keeps small downtowns like Belvidere and Washington Borough in the mix. Moves here are about river approaches, rural driveways, and occasional Pennsylvania cross-border legs — not HOA elevators.',
  heroCredibility:
    'River-town + rural logistics · Cross-border awareness · Independent directory',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'relocation',
    'zones',
    'specialized',
    'costDrivers',
    'seasonal',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'Warren County logistics in plain terms',
    intro: 'Distance, grades, and river weather matter more than parking permits.',
    bullets: [
      {
        title: 'Phillipsburg river-town density',
        detail:
          'Older streets and multi-story homes near the river mean stairs and limited staging — different from township lane moves 20 minutes away.',
      },
      {
        title: 'Cross-border PA jobs & moves',
        detail:
          'Households often connect to Easton/Lehigh Valley. If either address is in Pennsylvania, the job is interstate and needs FMCSA authority.',
      },
      {
        title: 'Rural deadhead',
        detail:
          'Crews may travel from denser NJ bases; travel minimums should be transparent in the estimate.',
      },
      {
        title: 'Farm and ridge parcels',
        detail:
          'Outbuildings, equipment, and long drives need inventory detail and truck selection up front.',
      },
      {
        title: 'Weather funnels',
        detail:
          'Valley fog and river icing can slow morning starts — especially on bridges and shaded grades.',
      },
    ],
  },
  zonesHeading: 'Warren County zones',
  zonesIntro: 'River towns and ridge farms should not share one generic access assumption.',
  zones: [
    {
      id: 'phillipsburg',
      name: 'Phillipsburg river town',
      shortName: 'Phillipsburg',
      neighborhoods: ['Phillipsburg', 'river-adjacent streets'],
      housingTypes: 'Older multi-story, some multifamily, tight lots',
      challenges: ['Stairs', 'Street width', 'Bridge traffic'],
      moverTips: 'Confirm which bridge approaches the crew will use at rush hour.',
      cityKeywords: ['phillipsburg'],
    },
    {
      id: 'washington-hackettstown-edge',
      name: 'Washington Borough & eastern approaches',
      shortName: 'Washington / east',
      neighborhoods: ['Washington', 'eastern township corridors'],
      housingTypes: 'Small-town homes, suburban infill',
      challenges: ['Downtown parking', 'Mixed road quality'],
      moverTips: 'Use wider side streets for staging when main street is tight.',
      cityKeywords: ['washington', 'hackettstown'],
    },
    {
      id: 'belvidere-central',
      name: 'Belvidere & central county',
      shortName: 'Belvidere',
      neighborhoods: ['Belvidere', 'central rural roads'],
      housingTypes: 'County-seat homes, surrounding rural parcels',
      challenges: ['Service travel time', 'Older interiors'],
      moverTips: 'Combine errands — fewer specialty stores than metro counties.',
      cityKeywords: ['belvidere'],
    },
    {
      id: 'ridge-rural',
      name: 'Ridge & rural west/north',
      shortName: 'Ridge rural',
      neighborhoods: ['Rural townships', 'ridge roads', 'farm edges'],
      housingTypes: 'Farms, long-lot homes, outbuildings',
      challenges: ['Access geometry', 'Soft ground', 'Low wires'],
      moverTips: 'Gate codes + driveway video save failed arrivals.',
      cityKeywords: ['blairstown', 'knowlton', 'hardwick'],
    },
  ],
  specialized: [
    {
      id: 'cross-border',
      title: 'Delaware River / PA cross-border module',
      intro: 'Many life patterns cross the river; not all movers are licensed for interstate legs.',
      bullets: [
        'NJ-only moves and NJ↔PA moves are different products legally.',
        'Ask for USDOT/MC on any estimate that touches Pennsylvania.',
        'Bridge congestion at shift changes can erase “short hop” assumptions.',
        'Storage on either side of the river may simplify multi-day closings.',
      ],
    },
    {
      id: 'rural-access',
      title: 'Rural access module',
      intro: 'Country parcels need a site plan, not just a square-footage number.',
      bullets: [
        'Mark septic and well covers.',
        'Trim branches only if safe/allowed — or warn the crew of clearance issues.',
        'Have a weather backup for unpaved drives.',
      ],
    },
  ],
  seasonal: {
    title: 'Seasonal timing in Warren',
    intro: 'River weather and rural mud seasons matter.',
    items: [
      { title: 'Winter', detail: 'Icy grades and bridge wind — flexible mornings help.' },
      { title: 'Spring thaw', detail: 'Soft shoulders can trap heavy trucks.' },
      { title: 'Fall', detail: 'Often excellent moving weather with moderate demand.' },
    ],
  },
  costDrivers: {
    title: 'Warren County cost context',
    intro: 'Expect access and travel to influence price more than prestige ZIP premiums.',
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$900' },
      { label: 'Family / rural home', value: '$1,600–$3,400' },
      { label: '2-person crew', value: '$100–$150/hr' },
    ],
    drivers: [
      { title: 'Travel minimums', detail: 'Common when crews stage from outside the county.' },
      { title: 'Stairs in river towns', detail: 'Phillipsburg multi-story homes add labor.' },
      { title: 'Interstate upgrade', detail: 'Any PA address changes licensing and often rate structure.' },
    ],
  },
  relocation: {
    title: 'Relocating to Warren County',
    intro:
      'Lower density, river recreation, and cross-border job access — with fewer urban amenities and longer specialty drives.',
    modules: [
      {
        id: 'schools',
        title: 'Schools',
        intro:
          'Warren County education is organized through local and regional districts serving Phillipsburg, Washington, Blairstown-area communities, and other municipalities.',
        bullets: [
          {
            title: 'Confirm boundaries',
            detail:
              'Regional high school arrangements are common — verify both elementary and secondary placements for your address via NJ DOE and district sites.',
          },
          {
            title: 'Program breadth',
            detail:
              'Smaller systems may offer different AP/arts/athletics mixes than large suburban districts; visit and ask.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare',
        bullets: [
          {
            title: 'St. Luke’s / regional partners',
            detail:
              'Residents often use hospital systems serving the Phillipsburg–Easton corridor; confirm which campuses are in-network.',
          },
          {
            title: 'Rural EMS reality',
            detail:
              'Response and transfer times can be longer than in dense North Jersey — discuss special medical needs with local providers before moving.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & costs',
        bullets: [
          {
            title: 'Relative affordability',
            detail:
              'Often more attainable than many eastern NJ counties for comparable land; river-view and renovated historic stock still premiums.',
          },
          {
            title: 'Older housing share',
            detail:
              'Budget for updates (electric, insulation, windows) on charming but older homes.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit',
        bullets: [
          { title: 'Phillipsburg', detail: 'River-town energy, cross-border convenience.' },
          { title: 'Washington area', detail: 'Smaller downtown practical living.' },
          { title: 'Belvidere', detail: 'Quieter county-seat scale.' },
          { title: 'Rural townships', detail: 'Privacy and acreage, car-mandatory.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commuting',
        bullets: [
          {
            title: 'Cross-border Lehigh Valley',
            detail: 'Easton/Allentown-direction jobs are part of the regional labor market.',
          },
          {
            title: 'Local employers',
            detail: 'Healthcare, logistics, education, small manufacturing, and agriculture-adjacent work.',
          },
          {
            title: 'Transit',
            detail: 'Limited — most households are car-primary.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle',
        bullets: [
          {
            title: 'River & ridge outdoors',
            detail: 'Delaware recreation and Appalachian approaches are major draws.',
          },
          {
            title: 'Quieter nights',
            detail: 'Fewer late-service amenities than metro counties — plan supply runs.',
          },
        ],
      },
      {
        id: 'demographics',
        title: 'Who lives here',
        bullets: [
          {
            title: 'Lower density west',
            detail:
              'Warren remains comparatively rural within New Jersey, with small boroughs and township living rather than continuous suburbia (Census density patterns).',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Warren County resources',
    intro: 'Clarify NJ-only vs interstate legs before comparing bids.',
    items: [
      { label: 'Warren County', href: 'https://www.warrencountynj.gov/', external: true },
      { label: 'NJ DOE reports', href: 'https://rc.doe.state.nj.us/', external: true },
      {
        label: 'Directory: Warren',
        href: '/companies?coverage=state&state=NJ&counties=warren',
      },
      { label: 'NJ county guides', href: '/local-movers/new-jersey' },
    ],
  },
  directoryHint: 'State whether any address is in Pennsylvania when requesting quotes.',
  lastReviewed: '2026-07-22',
};
