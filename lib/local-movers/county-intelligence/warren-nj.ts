import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Warren County, New Jersey moving intelligence.
 * Used by /local-movers/new-jersey/warren and the shared intelligence template.
 *
 * Differentiators vs dense North/Central Jersey flagships:
 * Rural / small-town character; Phillipsburg–Delaware River / Lehigh Valley (PA)
 * border influence; long driveways and thin local crew coverage; relative
 * affordability vs Bergen/Essex/Middlesex — NOT high-rise, elevator, or extreme-density language.
 */
export const warrenCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'warren',
  hubTitle: 'Warren County Moving Intelligence Hub',
  eyebrow: 'Warren County · NW Jersey / Delaware River guide',
  h1: 'Moving in Warren County, NJ: Phillipsburg, Hackettstown & Rural Zone Guide',
  heroOpener:
    'Warren County is northwestern New Jersey with a rural and small-town character that denser North and Central Jersey counties do not share. County seat Belvidere sits among quieter river and township roads; Phillipsburg — the largest community — anchors the Delaware River corridor directly across from Easton, Pennsylvania, so many moves have a real NJ–PA / Lehigh Valley dimension. Hackettstown, Washington, Blairstown, and surrounding townships mix older small-town housing with larger-lot and farm-adjacent properties. You will see far more long driveways, gravel approaches, and regional crew travel time than elevator COIs or high-rise freight windows. Relative affordability draws households outbound from higher-cost counties. I-80, Route 46, Route 57, and Route 31 stitch thin coverage across real distance. This guide is for people actually moving in Warren — not urban North Jersey tips forced onto rural roads.',
  heroCredibility:
    'Rural & small-town · Delaware River / PA border · Long driveways · Thin local coverage · Intrastate NJ · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Warren County different',
    intro:
      'These are Warren-specific realities — space, rural access, and the Pennsylvania border — not recycled density language from Bergen, Essex, or Middlesex.',
    bullets: [
      {
        title: 'Much lower density than North and Central Jersey cores',
        detail:
          'Most jobs are single-family, small-town multi-story, or rural-lot properties. High-rise elevators and extreme curb competition are the exception, not the rule. Plan for driveway length, road width, and crew travel distance instead.',
      },
      {
        title: 'Phillipsburg sits on the Delaware — NJ–PA is operational, not theoretical',
        detail:
          'Moves often involve Easton / Lehigh Valley addresses, storage, or family logistics on the Pennsylvania side. Crossing state lines needs FMCSA interstate authority; pure NJ legs follow New Jersey household-goods frameworks. Confirm which license applies.',
      },
      {
        title: 'Relative affordability draws outbound relocations',
        detail:
          'Households leave higher-cost North and Central Jersey counties for more space in Warren. Inbound inventory can still be large even when the destination feels rural — survey both ends honestly.',
      },
      {
        title: 'Rural driveways and narrow private roads rewrite truck size',
        detail:
          'Outside main towns, long gravel drives, low branches, limited turnarounds, and soft shoulders are common. A 26′ truck that works in a suburban cul-de-sac may not reach a farmhouse porch. Share approach photos early.',
      },
      {
        title: 'Small-town cores still have tight streets',
        detail:
          'Phillipsburg, Belvidere, Washington, and Hackettstown downtown grids can limit staging even without “urban density.” Stair carries in older multi-story homes still matter.',
      },
      {
        title: 'Thinner local mover coverage — travel time is part of the price',
        detail:
          'Regional crews often dispatch from outside Warren. Confirm the company actually serves your town or rural road, and ask whether travel is portal-to-portal or billed as a separate fee.',
      },
      {
        title: 'Farm-adjacent and larger-lot properties need extra survey detail',
        detail:
          'Outbuildings, gates, long carries from barn parking, and equipment-adjacent inventories show up more often than condo elevators. List special items and access constraints in writing.',
      },
      {
        title: 'I-80 and thin arterial network control longer “locals”',
        detail:
          'I-80 is the east–west spine; Routes 46, 57, and 31 connect towns. Phillipsburg ↔ Blairstown or Hackettstown ↔ Belvidere is real drive time, not a dense-suburb hop. Ask whether quotes are portal-to-portal.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access profile. Phillipsburg river-town work, Washington/central small-town cores, Hackettstown, Belvidere river towns, remote western townships, and eastern approaches toward Morris/Hunterdon are not interchangeable under one “Warren local” label.',
  zones: [
    {
      id: 'phillipsburg-delaware',
      name: 'Phillipsburg & Delaware River Corridor',
      shortName: 'Phillipsburg / River',
      neighborhoods: [
        'Phillipsburg',
        'Delaware River waterfront edge',
        'Lopatcong edge',
        'Alpha edge',
        'Pohatcong edge',
        'Easton, PA approaches (cross-border)',
      ],
      housingTypes:
        'Older small-town multi-story and single-family, denser street grids than rural townships, some multi-family, river-adjacent homes',
      challenges: [
        'Tighter small-town staging than rural lots',
        'Cross-border NJ–PA logistics and licensing questions',
        'Hills and river-adjacent access on some blocks',
        'Regional traffic toward Easton / Lehigh Valley',
      ],
      moverTips:
        'Clarify whether any stop is in Pennsylvania (Easton/Lehigh Valley). Confirm interstate authority when state lines are crossed. Share street photos for older Phillipsburg blocks. Mid-week mornings usually beat weekend river-town congestion. Do not assume a “local NJ” price if one end is PA.',
      cityKeywords: [
        'phillipsburg',
        'lopatcong',
        'alpha',
        'pohatcong',
        'delaware',
        'easton',
      ],
    },
    {
      id: 'central-warren',
      name: 'Washington / Oxford / Central Warren',
      shortName: 'Central Warren',
      neighborhoods: [
        'Washington Borough',
        'Washington Township',
        'Oxford',
        'Brass Castle edge',
        'Portland / Route 31 approaches',
        'Route 57 corridor',
      ],
      housingTypes:
        'Small-town single-family, older multi-story stock, suburban-style tracts near Washington, mixed larger-lot edges',
      challenges: [
        'Downtown Washington tighter streets',
        'Route 31 / Route 57 travel time for cross-county pairs',
        'Mix of in-town curb access and out-of-town long driveways',
        'Thinner Saturday crew availability than dense counties',
      ],
      moverTips:
        'Confirm in-town vs. township address — access changes quickly outside the borough. Mid-week mornings help for Route 31 runs. Survey driveway length on township properties. Book popular Saturdays early; volume is lower but crews may travel farther.',
      cityKeywords: [
        'washington',
        'oxford',
        'brass castle',
        'warren',
      ],
    },
    {
      id: 'hackettstown',
      name: 'Hackettstown & Surrounding',
      shortName: 'Hackettstown',
      neighborhoods: [
        'Hackettstown',
        'Independence edge',
        'Allamuchy edge',
        'Mount Olive / Morris border approaches',
        'Route 46 corridor',
      ],
      housingTypes:
        'Small-city single-family and multi-story, some multi-family, suburban edges, larger-lot approaches toward Allamuchy',
      challenges: [
        'Route 46 congestion at peaks toward I-80',
        'Tighter downtown staging than pure rural lots',
        'Cross-county spill into Morris County edges',
        'Student/small-college calendar pockets can add seasonal demand',
      ],
      moverTips:
        'Hackettstown is one of the stronger local demand nodes — still confirm driveway vs. downtown access. Build buffer for Route 46 / I-80 when pairing with Phillipsburg or Blairstown. Clarify Morris-border destinations for portal-to-portal time.',
      cityKeywords: [
        'hackettstown',
        'independence',
        'allamuchy',
        'mount olive edge',
      ],
    },
    {
      id: 'belvidere-north',
      name: 'Belvidere & Northern River Towns',
      shortName: 'Belvidere North',
      neighborhoods: [
        'Belvidere',
        'White Township edge',
        'Harmony edge',
        'Delaware River northern approaches',
        'County seat / small historic core',
      ],
      housingTypes:
        'Historic small-town stock, single-family, river-adjacent homes, township larger lots outside the borough',
      challenges: [
        'Limited local staging and thinner same-day crew options',
        'Older multi-story homes with stair carries',
        'Rural approaches outside Belvidere proper',
        'Distance to I-80 access for eastbound pairs',
      ],
      moverTips:
        'County-seat scale means quieter streets but fewer last-minute crew options — book early. Share approach photos for river and township edges. Confirm the mover’s travel fee policy for remote Belvidere-area addresses.',
      cityKeywords: [
        'belvidere',
        'white township',
        'harmony',
      ],
    },
    {
      id: 'western-blairstown',
      name: 'Western / Blairstown–Hardwick–Knowlton Area',
      shortName: 'Western Warren',
      neighborhoods: [
        'Blairstown',
        'Hardwick',
        'Knowlton',
        'Columbia edge',
        'Delaware Water Gap approaches',
        'Rural township roads',
      ],
      housingTypes:
        'Rural single-family, larger lots, farm-adjacent properties, wooded and hillside approaches, limited multi-family',
      challenges: [
        'Long gravel or private drives and limited truck turnarounds',
        'Low branches, soft shoulders, and weather-sensitive access',
        'Longer crew travel times from outside the western tier',
        'Sparse cell service on some roads can complicate day-of coordination',
      ],
      moverTips:
        'Access-first survey: driveway length, grade, gates, and turnaround. Smaller trucks or shuttle strategies often beat forcing a full trailer. Build weather contingency (mud/ice). Confirm storage options — local warehouse space is limited; regional storage may be in PA or eastern NJ.',
      cityKeywords: [
        'blairstown',
        'hardwick',
        'knowlton',
        'columbia',
        'delaware water gap',
      ],
    },
    {
      id: 'eastern-approaches',
      name: 'Eastern Approaches toward Morris / Hunterdon Edges',
      shortName: 'Eastern Approaches',
      neighborhoods: [
        'Hackettstown–Mount Olive approaches',
        'Mansfield edge',
        'Franklin Township edge',
        'I-80 corridor eastbound',
        'Hunterdon border approaches',
      ],
      housingTypes:
        'Mix of small-town, suburban-edge, and larger-lot stock; transitional between rural Warren and more developed Morris/Hunterdon patterns',
      challenges: [
        'I-80 congestion for eastbound pairs toward denser counties',
        'County-line confusion (Morris / Hunterdon addresses)',
        'Crews may price these as “toward the dense market” travel',
        'Still fewer elevators than true North Jersey cores — but more HOA tracts near borders',
      ],
      moverTips:
        'Clarify exact municipality and county on the survey. Build I-80 peak buffers for moves toward Morris employment corridors. If the destination is denser North Jersey, expect inventory and access profiles to change at the far end — survey both addresses.',
      cityKeywords: [
        'mansfield',
        'franklin township',
        'i-80',
        'mount olive',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Warren County',
    intro:
      'Warren pricing often tracks travel distance and rural access more than elevator soft costs. Two “local” jobs of the same square footage can differ if one is in-town Phillipsburg and the other is a long western driveway.',
    drivers: [
      {
        title: 'Crew travel time & thin local coverage',
        detail:
          'Regional carriers may bill meaningful portal-to-portal or travel fees. Confirm coverage for your exact town or rural road before comparing hourly rates alone.',
      },
      {
        title: 'Long driveways, shuttles & limited turnarounds',
        detail:
          'Rural and farm-adjacent properties can need smaller trucks, long carries, or shuttle loads — adding labor minutes even when inventory is modest.',
      },
      {
        title: 'Cross-border NJ–PA legs',
        detail:
          'Phillipsburg–Easton and Lehigh Valley pairs may require interstate authority and different pricing than pure NJ intrastate jobs.',
      },
      {
        title: 'Small-town stair carries',
        detail:
          'Older multi-story homes in Phillipsburg, Belvidere, Washington, and Hackettstown still raise labor time without any high-rise elevator.',
      },
      {
        title: 'I-80 / arterial distance on longer locals',
        detail:
          'West–east pairs and runs toward Morris can burn significant drive time at peak. Honest ETAs prevent overtime surprises.',
      },
      {
        title: 'Limited local storage options',
        detail:
          'Partial loads and temporary storage may require facilities outside the county — plan extra logistics cost and timing.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same town, simple driveway)',
        value: '$450–$1,200+',
        note: 'Higher when crews travel from outside Warren',
      },
      {
        label: '2–3BR small-town or modest SFH',
        value: '$1,400–$3,600+',
        note: 'Long driveways and stair carries trend up',
      },
      {
        label: '3–4+ BR (rural lot / cross-zone / NJ–PA)',
        value: '$2,200–$5,800+',
        note: 'Western access and interstate pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$175+/hr',
        note: 'Portal-to-portal; travel fees may apply separately — ask',
      },
    ],
  },
  seasonal: {
    title: 'Traffic, rural weather & calendar intelligence',
    intro:
      'Warren is lower volume than dense counties, but weather, I-80, and outbound relocation waves still shape good truck windows.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday starts give crews cleaner I-80 runs and more daylight for long rural drives. Book early if you need a specific Saturday — available crews may be traveling in.',
      },
      {
        title: 'I-80 east–west peaks',
        detail:
          'Even rural pairs feel interstate congestion when crews use I-80 toward denser counties. Build buffer for morning and late-afternoon peaks.',
      },
      {
        title: 'Mud, ice, and soft rural driveways',
        detail:
          'Spring thaw and winter ice change access on gravel and hillside drives. Confirm truck weight and approach conditions the day before.',
      },
      {
        title: 'Outbound affordability-driven moves',
        detail:
          'Households leaving higher-cost NJ counties often time moves around leases and school years — volume still spikes late spring through summer.',
      },
      {
        title: 'Cross-border Phillipsburg–Easton timing',
        detail:
          'Coordinate NJ and PA ends carefully; bridge and Lehigh Valley traffic can stretch a “short” river hop.',
      },
      {
        title: 'Leaf / fall foliage weekends (western roads)',
        detail:
          'Scenic western routes see visitor traffic in peak foliage — mid-week is quieter for Blairstown-area access.',
      },
    ],
  },
  resources: {
    title: 'Practical Warren County resources',
    intro:
      'Official links and licensing notes — rural access and municipal rules change; verify before move day. Confirm mover coverage for your exact address.',
    items: [
      {
        label: 'Warren County, NJ — official site',
        href: 'https://www.warrencountynj.gov/',
        external: true,
      },
      {
        label: 'Town of Phillipsburg',
        href: 'https://www.phillipsburgnj.org/',
        external: true,
      },
      {
        label: 'Town of Hackettstown',
        href: 'https://www.hackettstown.net/',
        external: true,
      },
      {
        label: 'Town of Belvidere',
        href: 'https://www.belviderenj.net/',
        external: true,
      },
      {
        label: 'Borough of Washington',
        href: 'https://www.washingtonboro-nj.org/',
        external: true,
      },
      {
        label: 'Township of Blairstown',
        href: 'https://www.blairstown.org/',
        external: true,
      },
      {
        label: 'NJ 511 — traffic conditions',
        href: 'https://www.511nj.org/',
        note: 'Check I-80, Routes 46/57/31 before locking load windows',
        external: true,
      },
      {
        label: 'PennDOT / PA traffic (for NJ–PA pairs)',
        href: 'https://www.511pa.com/',
        note: 'Useful when one end is Easton / Lehigh Valley',
        external: true,
      },
      {
        label: 'NJ Board of Public Utilities — utilities & consumer info',
        href: 'https://www.nj.gov/bpu/',
        note: 'Start with BPU for NJ frameworks; confirm mover licensing for your route',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses into Pennsylvania or other states',
        external: true,
      },
      {
        label: 'JCP&L / FirstEnergy — electric service (much of Warren)',
        href: 'https://www.firstenergycorp.com/jcp_l.html',
        note: 'Confirm your exact utility for gas/electric start-stop',
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
    'Filter listings by zone (Phillipsburg/River, Central Warren, Hackettstown, Belvidere North, Western Warren, Eastern Approaches) when available. Confirm the mover actually serves your town or rural road, ask about travel fees, and clarify NJ–PA licensing for Delaware River pairs — access and coverage are the defining issues here, not elevators.',
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
  specialized: [
    {
      id: 'cross-border-pa',
      title: 'Delaware River / PA cross-border module',
      intro:
        'Phillipsburg–Easton life patterns often cross state lines — licensing changes when either address is in Pennsylvania.',
      bullets: [
        'Require USDOT/MC on any estimate that touches PA.',
        'Bridge congestion at shift changes can erase “short hop” assumptions.',
        'Ask about travel fees when crews stage outside Warren.',
        'Storage on either side of the river can simplify multi-day closings.',
      ],
    },
    {
      id: 'rural-access',
      title: 'Rural driveway & long-access module',
      intro: 'Country parcels need a site plan, not just square footage.',
      bullets: [
        'Share driveway photos, gate codes, and low-wire notes.',
        'Mark septic lids and wells so trucks do not drive over them.',
        'Have a weather backup for unpaved drives after rain or thaw.',
      ],
    },
  ],
  relocation: {
    title: 'Relocating to Warren County',
    intro:
      'Lower density, river recreation, and cross-border job access — with fewer urban amenities and longer specialty drives.',
    modules: [
      {
        id: 'schools',
        title: 'Schools',
        intro:
          'Warren uses local and regional districts serving Phillipsburg, Washington, Blairstown-area communities, and other municipalities. Match every parcel to the correct feeder.',
        bullets: [
          {
            title: 'Regional high schools',
            detail:
              'Many students attend regional high schools drawing multiple municipalities — research both elementary and secondary campuses via NJ DOE reports.',
          },
          {
            title: 'Program breadth',
            detail:
              'Smaller systems may differ from large suburban districts in AP/arts/athletics mix — visit and ask.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare',
        bullets: [
          {
            title: 'Phillipsburg–Easton corridor systems',
            detail:
              'Residents often use hospital systems serving the river corridor; confirm in-network campuses and transfer pathways.',
          },
          {
            title: 'Rural EMS reality',
            detail:
              'Response and transfer times can be longer than dense North Jersey — discuss special medical needs before moving.',
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
              'Often more attainable than eastern NJ counties for comparable land; river-view and renovated historic stock still premiums.',
          },
          {
            title: 'Older housing share',
            detail: 'Budget for systems updates on charming but older homes.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit',
        bullets: [
          { title: 'Phillipsburg', detail: 'River-town energy and PA convenience.' },
          { title: 'Washington / Hackettstown approaches', detail: 'Smaller downtown practical living.' },
          { title: 'Belvidere', detail: 'Quieter county-seat scale.' },
          { title: 'Rural townships', detail: 'Privacy and acreage — car mandatory.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commuting',
        bullets: [
          {
            title: 'Lehigh Valley links',
            detail: 'Easton/Allentown-direction jobs are part of the regional labor market.',
          },
          {
            title: 'Local employers',
            detail: 'Healthcare, logistics, education, small manufacturing, agriculture-adjacent work.',
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
            title: 'Quieter services',
            detail: 'Fewer late-night amenities than metro counties — plan supply runs.',
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
              'Warren remains comparatively rural within New Jersey, with boroughs and townships rather than continuous suburbia (Census density patterns).',
          },
        ],
      },
    ],
  },
  lastReviewed: '2026-07-22',
};
