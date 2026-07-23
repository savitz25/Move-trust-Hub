import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/** Sussex — lakes, mountains, rural northwest NJ. */
export const sussexCountyNjIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'sussex',
  hubTitle: 'Sussex County Lakes & Highlands Moving Guide',
  eyebrow: 'Sussex County · Lakes, highlands & rural northwest',
  h1: 'Moving to Sussex County, NJ: Lake Access, Mountain Roads & Rural Logistics',
  heroOpener:
    'Sussex is New Jersey’s northwest highlands story: lake communities, winding mountain roads, small downtowns like Newton and Sparta, and winters that actually feel like winters. Moves fail here when estimates ignore steep grades, seasonal lake traffic, and long deadhead from denser labor markets.',
  heroCredibility:
    'Lake & mountain access · Winter readiness · Independent listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'zones',
    'specialized',
    'whatMakesDifferent',
    'seasonal',
    'relocation',
    'costDrivers',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'Sussex move constraints you should price',
    intro: 'Terrain and weather are first-class inputs — not footnotes.',
    bullets: [
      {
        title: 'Steep and winding approaches',
        detail:
          'Some lake and ridge addresses need smaller trucks or winch/hand-carry segments. Photos of the hill beat a vague “long driveway” note.',
      },
      {
        title: 'Lake community rules',
        detail:
          'Private associations may limit truck size, hours, and dock/path use. Get written rules before move day.',
      },
      {
        title: 'Winter is operational',
        detail:
          'Snow and ice on grades can cancel morning loads. Build flexibility into December–March closings.',
      },
      {
        title: 'Labor travel time',
        detail:
          'Regional crews may travel farther than in Essex or Bergen — travel minimums are common and legitimate.',
      },
      {
        title: 'Wildlife & trees',
        detail:
          'Low branches and narrow tree tunnels damage tall box trucks; measure clearance.',
      },
    ],
  },
  zonesHeading: 'Sussex County by terrain',
  zonesIntro: 'Lake shores, ridge homes, and town centers need different equipment.',
  zones: [
    {
      id: 'sparta-lake-mohawk',
      name: 'Sparta & lake communities',
      shortName: 'Sparta / lakes',
      neighborhoods: ['Sparta', 'Lake Mohawk area', 'nearby lake associations'],
      housingTypes: 'Lake homes, colonials, association properties',
      challenges: ['Association rules', 'Steep drives', 'Summer lake traffic'],
      moverTips: 'Confirm truck length limits at the association office.',
      cityKeywords: ['sparta', 'lake mohawk', 'mohawk'],
    },
    {
      id: 'newton-hub',
      name: 'Newton hub',
      shortName: 'Newton',
      neighborhoods: ['Newton', 'nearby borough approaches'],
      housingTypes: 'Older town homes, small multifamily, county-seat services',
      challenges: ['Downtown parking', 'Older stairs'],
      moverTips: 'Stage on wider side streets; protect plaster in older interiors.',
      cityKeywords: ['newton'],
    },
    {
      id: 'vernon-north',
      name: 'Vernon & northern recreation belt',
      shortName: 'Vernon',
      neighborhoods: ['Vernon', 'recreation/resort-adjacent areas'],
      housingTypes: 'Chalets, hillside homes, seasonal properties',
      challenges: ['Grades', 'Seasonal congestion', 'Weather cancellations'],
      moverTips: 'Avoid holiday ski/recreation weekends for hillside deliveries.',
      cityKeywords: ['vernon'],
    },
    {
      id: 'stillwater-west',
      name: 'Stillwater & western rural',
      shortName: 'West rural',
      neighborhoods: ['Stillwater', 'western township roads'],
      housingTypes: 'Farms, long-lot homes, outbuildings',
      challenges: ['Distance', 'Unpaved access', 'Cell gaps'],
      moverTips: 'Print gate codes; do not rely solely on phone GPS in valleys.',
      cityKeywords: ['stillwater'],
    },
  ],
  specialized: [
    {
      id: 'lake-mountain',
      title: 'Lake & mountain access module',
      intro: 'Waterfront and ridge properties share “last 500 feet” risk.',
      bullets: [
        'Ask about shuttle from the main road if the drive is steep or soft.',
        'Protect floors from tracked mud and lake sand.',
        'In winter, require a go/no-go weather call by 6 a.m.',
        'List docks, kayaks, and outdoor equipment so they are not forgotten.',
      ],
    },
  ],
  seasonal: {
    title: 'Sussex seasons that change move day',
    intro: 'This is one of the few NJ counties where true winter logistics dominate planning.',
    items: [
      {
        title: 'Nov–March',
        detail: 'Snow/ice risk on grades; keep a flexible closing addendum if possible.',
      },
      {
        title: 'Summer lake season',
        detail: 'More traffic and association sensitivity around peak recreation weekends.',
      },
      {
        title: 'Mud season (early spring)',
        detail: 'Unpaved drives may not support heavy trucks after thaw.',
      },
    ],
  },
  costDrivers: {
    title: 'Sussex pricing context',
    intro: 'Travel time and access complexity often exceed “miles on the map.”',
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$900' },
      { label: 'Family / lake home', value: '$1,600–$3,400+' },
      { label: '2-person crew', value: '$100–$150/hr' },
    ],
    drivers: [
      { title: 'Travel minimums', detail: 'Regional crews price distance to base.' },
      { title: 'Shuttle on grades', detail: 'Common for lake/ridge homes.' },
      { title: 'Weather standby', detail: 'Winter postponements can create rebooking fees — clarify policy.' },
    ],
  },
  relocation: {
    title: 'Is Sussex right for your household?',
    intro:
      'Space, outdoors, and lower density — with longer drives for some jobs, specialists, and retail.',
    modules: [
      {
        id: 'schools',
        title: 'Schools',
        intro:
          'Sussex districts are local/regional (including systems serving Sparta, Newton, Vernon, and other municipalities). Match every address to the correct district.',
        bullets: [
          {
            title: 'Smaller systems',
            detail:
              'Some districts are smaller than suburban giants — ask about course offerings and extracurricular breadth if that matters.',
          },
          {
            title: 'Data sources',
            detail:
              'NJ DOE performance reports plus district conversations beat online ranking screenshots alone.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare',
        bullets: [
          {
            title: 'Newton Medical Center area',
            detail:
              'Primary local hospital resource for much of the county; confirm specialty availability.',
          },
          {
            title: 'Travel for complex care',
            detail:
              'Some residents travel toward Morristown or other regional centers — include that in lifestyle math.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & costs',
        bullets: [
          {
            title: 'Value for space',
            detail:
              'Often more land per dollar than North Jersey job-core counties; lake frontage is a separate premium tier.',
          },
          {
            title: 'Seasonal properties',
            detail:
              'Some lake homes began as seasonal — check insulation, heat, and year-round access before assuming full-time readiness.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit',
        bullets: [
          { title: 'Sparta area', detail: 'Services + lake community access.' },
          { title: 'Newton', detail: 'County services and small downtown practicality.' },
          { title: 'Vernon belt', detail: 'Recreation-oriented living, hillside homes.' },
          { title: 'Western rural', detail: 'Maximum quiet, maximum driving.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local + outbound',
            detail:
              'Local healthcare, education, retail; many professionals commute toward Morris/eastern job centers.',
          },
          {
            title: 'Car required',
            detail: 'Transit is limited for most daily patterns.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Four seasons',
            detail: 'Snow removal and generator readiness are real homeowner tasks.',
          },
          {
            title: 'Outdoors first',
            detail: 'Hiking, lakes, and state park access are primary draws.',
          },
        ],
      },
      {
        id: 'demographics',
        title: 'Who lives here',
        bullets: [
          {
            title: 'Lower density northwest',
            detail:
              'Sussex remains less dense than coastal and metro NJ counties, with a mix of long-time residents and outdoor-oriented newcomers (Census density patterns).',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Sussex County resources',
    intro: 'Terrain photos beat adjectives when hiring movers.',
    items: [
      { label: 'Sussex County', href: 'https://www.sussex.nj.us/', external: true },
      { label: 'NJ DOE reports', href: 'https://rc.doe.state.nj.us/', external: true },
      {
        label: 'Directory: Sussex',
        href: '/companies?coverage=state&state=NJ&counties=sussex',
      },
      { label: 'NJ county guides', href: '/local-movers/new-jersey' },
    ],
  },
  directoryHint: 'Prioritize crews comfortable with grades, lake associations, and winter contingency plans.',
  lastReviewed: '2026-07-22',
};
