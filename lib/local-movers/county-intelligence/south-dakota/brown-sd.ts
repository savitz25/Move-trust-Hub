import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeSdPack } from '@/lib/local-movers/county-intelligence/south-dakota/sd-shared';

/**
 * Brown County, SD — Aberdeen regional hub (James River north basin).
 * NOT Sioux Falls, NOT Rapid City, NOT Brown County in other states. NOT ND/MN/IA/NE product.
 */
export const brownCountySdIntelligence: CountyIntelligencePack = finalizeSdPack({
  countySlug: 'brown',
  hubTitle: 'Brown County Moving Intelligence Hub',
  eyebrow:
    'Brown · Aberdeen SD regional hub · US-12 · US-281 · James River north',
  h1: 'Moving in Brown County: Aberdeen Density, Regional Empty Miles & Northeast Plains Logistics',
  heroOpener:
    'Brown County, South Dakota is northeastern South Dakota’s regional hub — Aberdeen core multi-unit and neighborhood grids, healthcare and campus-adjacent stock, smaller community nodes across the James River north basin, and long empty-mile approaches on US-12 and US-281 — not Sioux Falls, not Rapid City Black Hills product, and not Brown County in Minnesota, Wisconsin, or other states. A downtown Aberdeen walk-up, an established neighborhood basement long-carry, a rural farmstead driveway, and a cross-county US-12 haul do not share truck access, curb rules, or empty-mile risk. US-12, US-281, and the local Aberdeen grid freeflow rewrite “local” estimates, and open-prairie winter wind and ice can erase schedule optimism overnight. This hub is for people moving in Brown County, South Dakota — Aberdeen-market realities, not a recycled Sioux Falls or ND/MN product page.',
  heroCredibility:
    'Written estimates + insurance for intrastate SD · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'US-12 · US-281 · local Aberdeen grid',
  whatMakesDifferent: {
    title: 'What makes moving in Brown County different',
    intro:
      'These are Aberdeen regional-hub realities — core multi-unit, established neighborhood stairs, long corridor empty miles, healthcare/campus turnover, and northeast Plains winter logistics — not Sioux Falls metro defaults, not Rapid City hills product, and not a Minnesota or North Dakota rename.',
    bullets: [
      {
        title: 'Aberdeen core multi-unit rewrite labor hours',
        detail:
          'Scarce curb staging, multi-flight stairs, limited truck length, and building access packets dominate core jobs. A downtown walk-up is not a rural garage-friendly ranch.',
      },
      {
        title: 'Established Aberdeen grids underprice flat-prairie optimism',
        detail:
          'Older SFH, basement stairs, tight residential curb, and tree canopy fail bedroom-count quotes. Survey photos beat inventory lists alone.',
      },
      {
        title: 'Regional empty miles are not “local flat rate” product',
        detail:
          'US-12 and US-281 hauls to smaller Brown County communities and neighboring markets bill portal-to-portal time that map apps understate. Price honestly — deadhead and crew return stack fast.',
      },
      {
        title: 'US-12 and US-281 define portal-to-portal time',
        detail:
          'Aberdeen ↔ rural nodes, core ↔ west-edge, or cross-basin pairs look short on maps and regional in practice. Construction, weather, and freight freeflow reshape windows.',
      },
      {
        title: 'Northeast Plains winter wind, ice, and open-corridor exposure are real schedule risk',
        detail:
          'Wind, ice, snow events, and whiteout risk on open US-12 / US-281 approaches reshape morning windows. Build weather contingency into outdoor staging — especially November–March.',
      },
      {
        title:
          'South Dakota has no dedicated HHG permit board like ND NDDOT or NE PSC — written estimates, insurance, FMCSA interstate',
        detail:
          'South Dakota does not maintain a dedicated household-goods permit or certificate board comparable to North Dakota’s NDDOT HHG permit, Nebraska PSC Household Goods Mover License, Iowa, Minnesota, Wyoming, or New Jersey consumer-mover frameworks. For pure in-state South Dakota jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Any out-of-state leg (including nearby Minnesota or North Dakota) needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not invent a South Dakota HHG certificate number that does not exist.',
      },
    ],
  },
  zonesHeading: 'Brown County access zones',
  zonesIntro:
    'Plan by Aberdeen core multi-unit, established neighborhood grids, west/east corridor edges, and rural James River basin stock — access rules cluster by density and empty-mile distance more than ZIP alone.',
  zones: [
    {
      id: 'aberdeen-core',
      name: 'Aberdeen downtown, near-core multi-unit & local grid',
      shortName: 'Aberdeen core',
      neighborhoods: [
        'Downtown Aberdeen',
        'Near-core multi-unit edges',
        'Main Street / commercial grid blocks',
        'Older walk-up and character SFH pockets',
        'Local arterial approaches',
      ],
      housingTypes: 'Walk-up multifamily, modest multi-unit, character SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Tight turning radii on older grid streets',
        'Winter ice on core approaches',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm curb options and building access in writing. Build winter contingency on core jobs.',
      cityKeywords: [
        'aberdeen',
        'downtown aberdeen',
        'aberdeen sd',
        'aberdeen south dakota',
      ],
    },
    {
      id: 'aberdeen-established-grids',
      name: 'Established Aberdeen neighborhood grids & healthcare edges',
      shortName: 'Established grids',
      neighborhoods: [
        'Established east Aberdeen SFH',
        'Established west Aberdeen SFH',
        'Healthcare corridor residential edges',
        'Campus-adjacent residential stock',
        'Older multi-family pocket stock',
      ],
      housingTypes: 'Established SFH, bungalows, some multi-family',
      challenges: [
        'Tight residential curb and limited truck turnaround',
        'Basement stairs, long carries, and tree canopy',
        'Local arterial freeflow into core at peak',
      ],
      moverTips:
        'Photo stair access, basement entries, and curb staging. Price established-grid pairs portal-to-portal. Avoid assuming open rural access.',
      cityKeywords: [
        'east aberdeen',
        'west aberdeen',
        'aberdeen neighborhoods',
        'aberdeen residential',
      ],
    },
    {
      id: 'us12-us281-corridor-edges',
      name: 'US-12 & US-281 corridor edges & smaller community nodes',
      shortName: 'US-12 / US-281 edges',
      neighborhoods: [
        'US-12 west corridor edges',
        'US-12 east corridor edges',
        'US-281 north/south approaches',
        'Smaller Brown County community nodes',
        'Corridor commercial-adjacent residential',
      ],
      housingTypes: 'Mixed SFH, modest multi-family, corridor residential stock',
      challenges: [
        'Longer empty miles into Aberdeen core',
        'Freight freeflow and construction on US routes',
        'Winter wind exposure on open approaches',
      ],
      moverTips:
        'Price corridor–core pairs with honest portal time. Confirm crew return/deadhead on multi-stop days. Build weather buffers on open US-12 / US-281 runs.',
      cityKeywords: [
        'us-12',
        'us-281',
        'brown county corridor',
        'aberdeen corridor',
      ],
    },
    {
      id: 'rural-james-river-basin',
      name: 'Rural James River north-basin & farm-edge residential',
      shortName: 'Rural basin',
      neighborhoods: [
        'Rural Brown County edges',
        'James River basin farmsteads',
        'Smaller village residential stock',
        'Acreage and long-driveway properties',
        'Agricultural-edge homes',
      ],
      housingTypes: 'Rural-residential, farmhouses, village SFH',
      challenges: [
        'Long driveway carries and limited truck turnaround',
        'Significant empty miles into Aberdeen',
        'Winter wind, ice, and soft-shoulder risk',
      ],
      moverTips:
        'Photo driveway pitch, staging length, and turnaround. Price rural–Aberdeen pairs with freeflow and weather buffers. Confirm soft-shoulder and gate access before truck assignment.',
      cityKeywords: [
        'rural brown county',
        'james river',
        'brown county sd rural',
        'aberdeen rural',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Brown County moving costs',
    intro:
      'Core multi-unit friction, established-grid stairs, US-12 / US-281 empty miles, rural driveway logistics, and northeast Plains winter exposure drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Aberdeen core stair & curb friction',
        detail: 'Walk-ups, scarce staging, and access packets dominate core jobs.',
      },
      {
        title: 'Established-grid long carries & basement stairs',
        detail: 'Tight curb and carry distance spike labor hours.',
      },
      {
        title: 'US-12 / US-281 portal-to-portal empty miles',
        detail: 'Regional pairs bill deadhead and freeflow time maps understate.',
      },
      {
        title: 'Rural driveway logistics and winter wind delays',
        detail: 'Long carries and open-corridor ice rewrite schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with walk-ups, rural miles, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,400–$4,400+',
        note: 'Core and established-grid friction trends up',
      },
      {
        label: '3–4+ BR / rural / long US-12 or US-281 haul',
        value: '$2,600–$8,800+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$180+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Brown County',
    intro:
      'Summer family peaks, healthcare and campus-adjacent turnover, multi-family lease turns, and northeast Plains winter wind reshape Aberdeen-area windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear core curb and start rural corridor runs before peak freeflow.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Aberdeen multi-unit and Saturday rural jobs early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Core and near-core multi-unit slots fill first.',
      },
      {
        title: 'Winter wind, ice & open-corridor risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'aberdeen-brown-regional-hub-module',
      title: 'Aberdeen regional-hub & US-corridor module',
      intro:
        'Brown SD estimates fail when core stair access, established-grid basements, rural driveway geometry, or US-12/US-281 empty miles are ignored — and when crews treat this as Sioux Falls, Rapid City, or an ND/MN/IA/NE rename page.',
      bullets: [
        'Request Aberdeen multi-unit building and access details early.',
        'Photo stair access, basement entries, and curb staging on established-grid jobs.',
        'Price US-12 · US-281 pairs portal-to-portal with honest deadhead.',
        'Clarify Aberdeen core vs rural basin destinations on multi-stop estimates.',
        'For pure in-state South Dakota jobs insist on written estimates and insurance; verify FMCSA for any interstate leg (including nearby MN/ND) — South Dakota has no ND NDDOT- or NE PSC-style HHG permit board.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Brown County?',
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
              'Aberdeen School District and smaller rural systems serve different addresses across Brown County. Confirm zoning carefully — rural and city lines are not interchangeable.',
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
              'Avera St. Luke’s and Sanford Aberdeen-area care anchor regional healthcare. Confirm networks and specialist access for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map drive times from rural basin edges into Aberdeen campuses in winter conditions. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs established SFH vs rural stock',
            detail:
              'Aberdeen walk-ups, established-grid homes, and farm-edge residential price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Renovated core and established neighborhood stock often prices differently from outer rural multi-acre properties.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Aberdeen core lifestyle',
            detail: 'Walkable amenities with stair, curb, density, and winter ice tradeoffs.',
          },
          {
            title: 'Established grid pattern',
            detail: 'Neighborhood SFH logistics near local arterials and healthcare edges.',
          },
          {
            title: 'Rural / corridor pattern',
            detail: 'More space with empty-mile, driveway, and open-winter exposure tradeoffs.',
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
              'Healthcare, education, agriculture and agribusiness support, manufacturing, government, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'US-12, US-281, and local grid conditions are real — especially winter. Test drive peak and weather-risk routes between your zone and Aberdeen anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Aberdeen regional-hub identity',
            detail:
              'Brown County is northeastern South Dakota’s Aberdeen hub — not Sioux Falls, not Rapid City Hills product, not Brown County in other states, and not an ND, MN, IA, or NE rename.',
          },
          {
            title: 'Climate',
            detail:
              'Hot summers, strong thunderstorms, and cold northeast Plains winters with wind, ice, and open-corridor exposure. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Brown County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. South Dakota does not use a dedicated HHG permit board like ND NDDOT or NE PSC — insist on written estimates and insurance for in-state jobs, and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Brown County, South Dakota — official site',
        href: 'https://brown.sdcounties.org/',
        external: true,
      },
      {
        label: 'City of Aberdeen — official site',
        href: 'https://www.aberdeen.sd.us/',
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
    'Prefer Aberdeen multi-unit and regional US-12 · US-281 empty-mile experience. Insist on written estimates and insurance for intrastate SD moves; verify FMCSA interstate (including nearby MN/ND). South Dakota has no ND NDDOT- or NE PSC-style HHG permit board. This is Brown County SD (Aberdeen) — not Sioux Falls, not Rapid City, and not ND/MN/IA/NE product.',
  lastReviewed: '2026-07-24',
});
