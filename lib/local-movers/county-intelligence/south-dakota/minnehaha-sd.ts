import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeSdPack } from '@/lib/local-movers/county-intelligence/south-dakota/sd-shared';

/**
 * Minnehaha County, SD — Sioux Falls metro core.
 * NOT Pennington / Rapid City west. NOT Lincoln south-suburb rename. NOT ND, MN, IA, or NE product.
 */
export const minnehahaCountySdIntelligence: CountyIntelligencePack = finalizeSdPack({
  countySlug: 'minnehaha',
  hubTitle: 'Minnehaha County Moving Intelligence Hub',
  eyebrow:
    'Minnehaha · Sioux Falls SD metro core · I-29 · I-90 · US-14 · Big Sioux',
  h1: 'Moving in Minnehaha County: Sioux Falls Density, Downtown Multi-Unit & East-Metro Growth Logistics',
  heroOpener:
    'Minnehaha County, South Dakota is the state’s densest residential market — Sioux Falls downtown and near-core multi-unit, established east- and west-side neighborhood grids, Brandon and Hartford growth belts, and Big Sioux valley approaches — not a Rapid City Black Hills page, not a Lincoln County south-suburb template, and not a renamed Minnesota or Iowa metro product. A downtown loft elevator job, a McKennan Park bungalow long-carry, a Brandon cul-de-sac HOA, and a rural edge driveway do not share truck access, curb rules, or empty-mile risk. I-29, I-90, US-14, and the local Sioux Falls grid freeflow rewrite “local” estimates, and Plains winter ice and wind can erase schedule optimism overnight. This hub is for people moving in Minnehaha County, South Dakota — Sioux Falls-market realities, not a recycled ND, MN, IA, NE, or WY product page.',
  heroCredibility:
    'Written estimates + insurance for intrastate SD · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-29 · I-90 · US-14 · local Sioux Falls grid',
  whatMakesDifferent: {
    title: 'What makes moving in Minnehaha County different',
    intro:
      'These are Sioux Falls metro-core realities — downtown multi-unit, established neighborhood stairs, suburban growth HOAs, interstate freeflow, and Plains winter logistics — not Rapid City Hills product, not Lincoln south-growth defaults, and not a Minnesota, Iowa, or Nebraska rename.',
    bullets: [
      {
        title: 'Downtown and near-core multi-unit rewrite labor hours',
        detail:
          'Elevators, COI packets, scarce curb staging, dock windows, and stair-heavy product dominate core jobs. A downtown or near-core loft is not a Brandon garage-friendly two-story.',
      },
      {
        title: 'Established Sioux Falls grids underprice flat-suburb optimism',
        detail:
          'McKennan, All Saints, and older east- and west-side stock bring tight curb, basement stairs, tree canopy, and limited truck turnaround. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Brandon–Hartford growth belts are not core product',
        detail:
          'HOA gate lists, truck-length limits, longer portal time into Sioux Falls core, and mixed townhome product reshape estimates that assume “Minnehaha flat rate.”',
      },
      {
        title: 'I-29, I-90, and US-14 define portal-to-portal time',
        detail:
          'Brandon ↔ downtown, west Sioux Falls ↔ east grids, or Hartford ↔ core pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Plains winter ice, wind, and interstate freeflow are real schedule risk',
        detail:
          'Ice, wind, snow events, and I-29 / I-90 freeflow reshape morning windows across the metro. Build weather contingency into outdoor staging — especially November–March.',
      },
      {
        title:
          'South Dakota has no dedicated HHG permit board like ND NDDOT or NE PSC — written estimates, insurance, FMCSA interstate',
        detail:
          'South Dakota does not maintain a dedicated household-goods permit or certificate board comparable to North Dakota’s NDDOT HHG permit, Nebraska PSC Household Goods Mover License, Iowa, Minnesota, Wyoming, or New Jersey consumer-mover frameworks. For pure in-state South Dakota jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not invent a South Dakota HHG certificate number that does not exist.',
      },
    ],
  },
  zonesHeading: 'Minnehaha County access zones',
  zonesIntro:
    'Plan by downtown–near-core multi-unit, established Sioux Falls grids, Brandon–east growth, and west/I-90 corridor belts — access rules cluster by density and corridor more than ZIP alone.',
  zones: [
    {
      id: 'sioux-falls-downtown-near-core',
      name: 'Sioux Falls downtown, near-core multi-unit & Big Sioux edges',
      shortName: 'Sioux Falls core',
      neighborhoods: [
        'Downtown Sioux Falls',
        'Eastbank / near-core loft edges',
        'Phillips Avenue corridor edges',
        'McKennan Park edges',
        'Big Sioux river-adjacent blocks',
      ],
      housingTypes: 'Lofts, mid-rises, renovated multi-unit, denser walk-ups',
      challenges: [
        'Elevators, COI, and timed building windows',
        'Scarce curb staging and event-day congestion',
        'I-29 / local-grid freeflow and winter ice risk',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and elevator size before final pricing. Build winter contingency on core approaches.',
      cityKeywords: [
        'sioux falls',
        'downtown sioux falls',
        'eastbank',
        'mckennan',
        'phillips avenue',
      ],
    },
    {
      id: 'established-east-west-grids',
      name: 'Established east- and west-side neighborhood grids',
      shortName: 'Established grids',
      neighborhoods: [
        'All Saints / historic edges',
        'East-side established SFH',
        'West-side established SFH',
        'Avera / healthcare corridor edges',
        'Older multi-family pocket stock',
      ],
      housingTypes: 'Established SFH, bungalows, some multi-family and carriage-house stock',
      challenges: [
        'Tight residential curb and limited truck turnaround',
        'Basement stairs, long carries, and tree canopy',
        'Local arterial freeflow into core at peak',
      ],
      moverTips:
        'Photo stair access, basement entries, and curb staging. Price established-grid pairs portal-to-portal at peak. Avoid assuming garage-friendly suburb access.',
      cityKeywords: [
        'all saints',
        'east sioux falls',
        'west sioux falls',
        'avera',
        'sioux falls neighborhoods',
      ],
    },
    {
      id: 'brandon-east-growth',
      name: 'Brandon & east-metro growth belts',
      shortName: 'Brandon / east growth',
      neighborhoods: [
        'Brandon',
        'East Sioux Falls growth edges',
        'I-90 east approaches',
        'Split Rock / corridor pockets',
        'Newer HOA and townhome tracts',
      ],
      housingTypes: 'Newer SFH, townhomes, HOA tracts, multi-family growth product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-90 / I-29 peak congestion toward core',
        'Longer portal time on growth–core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price Brandon–downtown pairs portal-to-portal. Avoid peak I-90 / I-29 windows when flexible.',
      cityKeywords: [
        'brandon',
        'east sioux falls',
        'split rock',
        'i-90',
        'brandon sd',
      ],
    },
    {
      id: 'west-i90-hartford-corridor',
      name: 'West Sioux Falls, Hartford & I-90 corridor edges',
      shortName: 'West / Hartford / I-90',
      neighborhoods: [
        'West Sioux Falls growth edges',
        'Hartford',
        'I-90 west approaches',
        'Crooks / northern edge pockets',
        'Rural-residential corridor stock',
      ],
      housingTypes: 'Newer SFH, mixed rural-residential, some multi-family growth product',
      challenges: [
        'Longer empty miles into core',
        'Driveway carries and limited rural turnaround',
        'I-90 freeflow and winter wind exposure',
      ],
      moverTips:
        'Photo driveway pitch and staging length. Price west–core and Hartford pairs with freeflow buffers. Build winter contingency on open corridor approaches.',
      cityKeywords: [
        'hartford',
        'west sioux falls',
        'crooks',
        'i-90 west',
        'hartford sd',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Minnehaha County moving costs',
    intro:
      'Core multi-unit friction, established-grid stairs, growth-belt HOA rules, corridor portal time, and Plains winter logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown / near-core elevator & curb friction',
        detail: 'Building packets and scarce staging dominate core jobs.',
      },
      {
        title: 'Established-grid long carries & basement stairs',
        detail: 'Tight curb, basements, and carry distance spike labor hours.',
      },
      {
        title: 'I-29 / I-90 / US-14 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Growth–core empty miles and winter ice delays',
        detail: 'Map-short pairs still bill regional time; ice and wind rewrite schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators, loft COIs, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,500–$4,600+',
        note: 'Core and established-grid friction trends up',
      },
      {
        label: '3–4+ BR / HOA / cross-metro',
        value: '$2,800–$9,200+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Minnehaha County',
    intro:
      'Summer family peaks, multi-family lease turns, healthcare hiring cycles, and Plains winter ice reshape Sioux Falls-area windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear core curb and reduce I-29 / I-90 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book downtown multi-unit and Brandon Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Downtown and near-core elevators fill first.',
      },
      {
        title: 'Winter ice, wind & interstate freeflow risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'sioux-falls-minnehaha-metro-grid',
      title: 'Sioux Falls metro & interstate-grid module',
      intro:
        'Minnehaha SD estimates fail when core building packets, established-grid stairs, growth-belt HOA rules, or I-29/I-90/US-14 empty miles are ignored — and when crews treat this as Rapid City, Lincoln south-suburb, or an ND/MN/IA/NE rename page.',
      bullets: [
        'Request downtown and near-core multi-unit building packets early.',
        'Photo stair access, basement entries, and curb staging on established-grid jobs.',
        'Price I-29 · I-90 · US-14 pairs portal-to-portal.',
        'Clarify Sioux Falls vs Brandon vs Hartford destinations on multi-town estimates.',
        'For pure in-state South Dakota jobs insist on written estimates and insurance; verify FMCSA for any interstate leg — South Dakota has no ND NDDOT- or NE PSC-style HHG permit board.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Minnehaha County?',
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
              'Sioux Falls School District, Brandon Valley, Harrisburg spillover edges, Hartford, and other systems serve different addresses. Confirm zoning carefully — district lines shift block by block across the metro.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and South Dakota Department of Education data beat ranking screenshots.',
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
              'Sanford Health, Avera, and affiliated campuses anchor regional care in Sioux Falls. Confirm networks and specialist access for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Brandon, west Sioux Falls, and Hartford into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs established SFH vs growth stock',
            detail:
              'Downtown lofts, established-grid bungalows, Brandon HOA product, and west corridor homes price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Renovated core and east-growth new-build stock often prices differently from outer multi-family or older neighborhood product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / near-core lifestyle',
            detail: 'Walkable amenities with elevator, curb, density, and winter ice tradeoffs.',
          },
          {
            title: 'Established east- / west-side pattern',
            detail: 'Neighborhood SFH logistics near local arterials and healthcare corridors.',
          },
          {
            title: 'Brandon / Hartford growth pattern',
            detail: 'More space, HOA rules, and different commute math to core jobs.',
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
              'Healthcare (Sanford / Avera), finance and insurance, professional services, logistics, government, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-29, I-90, US-14, and local grid peaks are real. Test drive peak routes between your zone and Sioux Falls anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Sioux Falls metro identity',
            detail:
              'Minnehaha is South Dakota’s largest metro core — not Rapid City Black Hills product, not Lincoln south-suburb alone, and not an ND, MN, IA, or NE rename.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, strong thunderstorms, and cold Plains winters with ice and wind. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Minnehaha County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. South Dakota does not use a dedicated HHG permit board like ND NDDOT or NE PSC — insist on written estimates and insurance for in-state jobs, and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Minnehaha County, South Dakota — official site',
        href: 'https://www.minnehahacounty.org/',
        external: true,
      },
      {
        label: 'City of Sioux Falls — official site',
        href: 'https://www.siouxfalls.org/',
        external: true,
      },
      {
        label: 'South Dakota Department of Transportation — traffic',
        href: 'https://dot.sd.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer core multi-unit and established-grid access experience with honest I-29 · I-90 · US-14 pricing. Insist on written estimates and insurance for intrastate SD moves; verify FMCSA interstate. South Dakota has no ND NDDOT- or NE PSC-style HHG permit board. This is Minnehaha County SD (Sioux Falls) — not Rapid City, not Lincoln south-suburb, and not ND/MN/IA/NE product.',
  lastReviewed: '2026-07-24',
});
