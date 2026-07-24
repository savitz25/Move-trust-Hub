import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Nueces County — Texas Tier 2 (independent Corpus Christi Gulf metro).
 * Secondary-market contract vs Houston Tier 1 coastal-adjacent defaults — not a
 * Houston collar and not a thinner Triangle zone dump.
 */
export const nuecesCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'nueces',
  hubTitle: 'Nueces County Moving Intelligence Hub',
  eyebrow: 'Nueces County · Independent Corpus Christi Gulf metro',
  h1: 'Moving in Nueces County: Independent Gulf Metro, Coastal Humidity & Port Logistics',
  heroOpener:
    'Nueces County is an independent Corpus Christi Gulf metro — not Houston with freer freeways, and not a Texas Triangle HOA growth collar. Corpus Christi core multi-unit and older grids, Flour Bluff / Padre approaches, Robstown and west industrial-edge product, and island/causeway edges form their own housing ladder under Gulf humidity, wind, and port-adjacent logistics. Compared with Houston Tier 1 coastal-adjacent defaults, I-37 and SH-358 freeflow replace multi-county basin gridlock, causeway access is a first-class constraint, and port/industrial adjacency is normal. This guide is for people moving in Nueces County as a secondary market with its own role — not recycled Harris scripts.',
  heroCredibility:
    'Independent Corpus Christi Gulf metro · Coastal humidity · Port / causeway logistics · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-37 · SH-358 · US-181 · SH-44 · Padre Island approaches',
  parentCompare: {
    parentLabel: 'Texas Triangle Tier 1 metros (Harris density defaults)',
    parentHref: '/local-movers/texas/harris',
    title: 'Compared with Houston Tier 1 coastal-adjacent defaults',
    intro:
      'Nueces is a freestanding Gulf coastal metro south of the Houston basin. Use Harris County as the high-density coastal-adjacent parent contrast — it is not a drop-in template for Padre Island causeway jobs, port-industrial edges, or Corpus Christi humidity calendars.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Houston crews fight I-10/I-45/I-69 basin stacks and multi-hour cross-metro pairs. Nueces pairs ride I-37, SH-358, US-181, SH-44, and Padre Island approaches with freer mid-day flow — core ↔ Flour Bluff still burns portal-to-portal time at peak, but it is not a Katy ↔ Downtown Houston job. Isolation from the Triangle means long-haul deadhead, not short-hop collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Harris mixes dense elevators, master-planned HOA villages, and multi-county suburban product. Nueces’s ladder is Corpus Christi core multi-unit and mid-century stock, Flour Bluff / Padre approach SFH, Robstown/west working and industrial-edge homes, and island/causeway edges with wind and access constraints — more coastal and port-adjacent product, less Houston HOA default.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Nueces stages more driveway, causeway-timing, and industrial-edge work than Houston elevator corridors. HOAs exist in some growth pockets but are not the Sugar Land operating system. Bridge/causeway windows, wind exposure, and port freight replace dense curb-staging fights.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Nueces quotes often sit below Houston rates for comparable square footage when access is simple — humidity windows, causeway/island empty miles, and port-adjacent congestion still push prices up. Expect secondary-market labor rates with coastal weather and distance as the main premiums, not basin gridlock fees.',
      },
      {
        title: 'Role difference',
        detail:
          'Corpus Christi is an independent Gulf metro with its own employment base (port, energy/industrial, healthcare, military adjacency, tourism/coastal) — not a Houston bedroom collar. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Nueces County different',
    intro:
      'Independent Gulf-metro realities — coastal humidity, port/industrial adjacency, causeway/island access, and freer I-37/358 corridors than Houston parents — that change estimates.',
    bullets: [
      {
        title: 'Humidity and coastal weather are operational constraints',
        detail:
          'Gulf humidity, summer heat, and wind stress crews, electronics, and sealed packaging. Prefer morning load windows in peak summer; protect inventory from moisture and grit — inland Houston HOA habits do not transfer one-for-one to open coastal staging.',
      },
      {
        title: 'Port and industrial adjacency reshape timing',
        detail:
          'Port freight, refinery/industrial corridors, and peak commercial traffic can delay trucks even when residential addresses look simple. Buffer time on SH-358 / I-37 industrial edges.',
      },
      {
        title: 'Island and causeway access is a first-class job type',
        detail:
          'Padre Island approaches and causeway timing are not interchangeable with Corpus Christi core driveway jobs. “Nueces local” is too vague — put island vs mainland and access type on the estimate.',
      },
      {
        title: 'I-37 / 358 freeflow is not Houston basin — still a line item',
        detail:
          'Cross-town pairs freer than Harris still burn billable time at school, tourist, and commute peaks. Ask whether quotes are portal-to-portal, especially core ↔ Flour Bluff or mainland ↔ island.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Nueces County zones: Corpus core, Flour Bluff/Padre, Robstown/west & island edges',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Corpus Christi core density, Flour Bluff/Padre approaches, Robstown/west edges, and island/causeway product price and stage differently under the same Gulf weather calendar.',
  zones: [
    {
      id: 'corpus-christi-core',
      name: 'Corpus Christi core',
      shortName: 'Corpus core',
      neighborhoods: [
        'Downtown Corpus Christi',
        'Southside multi-unit corridors',
        'Midtown / older grid neighborhoods',
        'Bayfront-adjacent residential',
        'Central multi-family clusters',
      ],
      housingTypes:
        'Older SFH, multi-unit buildings, mid-century stock, some mid-rise and redevelopment product',
      challenges: [
        'Tighter street parking and multi-unit long carries',
        'Elevator/COI rules in some multi-unit buildings',
        'I-37 / SH-358 approaches into the core',
        'Humidity and heat on asphalt staging without shade',
      ],
      moverTips:
        'Confirm building rules for multi-unit. Weekday mornings beat heat, humidity, and commute peaks. Inventory stairs carefully in older multi-story stock. Share parking constraints on denser blocks.',
      cityKeywords: [
        'corpus christi',
        'downtown corpus',
        'southside corpus',
        'midtown corpus christi',
        'corpus',
      ],
    },
    {
      id: 'flour-bluff-padre-approaches',
      name: 'Flour Bluff / Padre approaches',
      shortName: 'Flour Bluff / Padre',
      neighborhoods: [
        'Flour Bluff',
        'Padre Island approach residential',
        'NAS Corpus Christi-adjacent edges',
        'Southeast coastal SFH tracts',
        'Multi-family near approach corridors',
      ],
      housingTypes:
        'Suburban SFH, coastal-edge homes, multi-family, some military-adjacent stock',
      challenges: [
        'SH-358 corridor congestion at peak',
        'Wind and humidity on open staging',
        'Military-adjacent access rules where applicable',
        'Cross-town peaks toward core and island',
      ],
      moverTips:
        'Build 358 timing into core ↔ Flour Bluff pairs. Confirm gate/base rules if either address requires installation adjacency. Morning starts beat Gulf heat and tourist traffic on approach corridors.',
      cityKeywords: [
        'flour bluff',
        'padre island',
        'nas corpus christi',
        'southeast corpus',
        'flourbluff',
      ],
    },
    {
      id: 'robstown-west',
      name: 'Robstown / west',
      shortName: 'Robstown / west',
      neighborhoods: [
        'Robstown',
        'West Corpus industrial-edge residential',
        'SH-44 corridor pockets',
        'Working neighborhoods near port/industrial approaches',
        'Smaller in-grid west stock',
      ],
      housingTypes:
        'In-town SFH, multi-family, working neighborhoods, some larger-lot west edges',
      challenges: [
        'Port/industrial freight timing on approaches',
        'Varied property access and multi-unit long carries',
        'Humidity and heat on open lots with limited shade',
        'Longer deadhead from island/Flour Bluff crews',
      ],
      moverTips:
        'Buffer time near industrial and port peaks. Share street-width photos for older grids. Price Robstown ↔ island or Flour Bluff as long locals with honest portal time.',
      cityKeywords: [
        'robstown',
        'west corpus',
        'sh 44',
        'highway 44',
        'robstown tx',
      ],
    },
    {
      id: 'island-causeway-edges',
      name: 'Island / causeway edges',
      shortName: 'Island / causeway',
      neighborhoods: [
        'Padre Island residential edges',
        'Causeway approach pockets',
        'Coastal multi-family and rental product',
        'Wind-exposed open-lot homes',
        'Seasonal / second-home inventory pockets',
      ],
      housingTypes:
        'Coastal SFH, multi-family rentals, vacation/second-home product, limited dense core stock',
      challenges: [
        'Causeway timing, wind, and weather windows',
        'Longer approaches and empty miles from core staging',
        'Moisture, salt air, and open-lot staging risk',
        'Not interchangeable with mainland driveway logistics',
      ],
      moverTips:
        'Treat island pairs as access-and-weather jobs: confirm causeway timing, truck size, and wind plans before booking. Inventory outdoor and seasonal furniture carefully. Prefer flexible early starts over rigid noon Saturday slots.',
      cityKeywords: [
        'padre island',
        'north padre',
        'causeway',
        'island corpus',
        'padre island tx',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Nueces County',
    intro:
      'Same square footage prices differently by humidity window, causeway/island access, port-adjacent timing, and whether the job stays core or runs Flour Bluff/west/island.',
    drivers: [
      {
        title: 'Coastal weather–constrained work windows',
        detail:
          'Heat, humidity, and wind compress productive outdoor hours. Jobs that slip into peak afternoon or high-wind windows may need more labor days or premium scheduling.',
      },
      {
        title: 'Causeway / island empty miles',
        detail:
          'Mainland ↔ island pairs and long Padre approaches burn more portal-to-portal time than map miles suggest — freer than Houston, still billable.',
      },
      {
        title: 'Port / industrial adjacency delays',
        detail:
          'Freight peaks near port and industrial corridors can slow trucks even on short residential legs — buffer time into the estimate.',
      },
      {
        title: 'Multi-unit core access',
        detail:
          'Elevators, COI, and curb staging in Corpus Christi core multi-unit add coordination soft costs versus pure driveway SFH.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,300+',
        note: 'Higher with elevators, humidity delays, or causeway time',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,600+',
        note: 'Cross-town and Flour Bluff/west hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / island / west)',
        value: '$2,000–$6,000+',
        note: 'Island/causeway and long locals price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & Gulf weather calendar intelligence',
    intro:
      'Nueces peaks follow summer heat/humidity, tourist and coastal calendars, and storm-season flexibility needs — not Houston basin lease density alone.',
    items: [
      {
        title: 'Summer heat & humidity: roughly May – September',
        detail:
          'Plan early-morning loads, moisture-safe packing, and realistic crew endurance. Mid-afternoon moves in peak humidity are high risk for people and property.',
      },
      {
        title: 'Coastal / tourist shoulder demand',
        detail:
          'Weekend and seasonal peaks near Padre approaches and coastal rentals can tighten crews. Book popular Saturdays early when flexible.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around apartment elevator windows and causeway timing when applicable. Dawn starts win even in shoulder seasons when weather and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'coastal-humidity',
      title: 'Coastal humidity & Gulf weather logistics',
      intro:
        'Nueces’s defining climate constraint is Gulf humidity, heat, and wind that inland Triangle rate cards often underweight.',
      bullets: [
        'Prefer morning starts in peak summer; treat mid-afternoon and high-wind loads as higher risk.',
        'Request shaded staging and moisture-safe packing for electronics, paper goods, and sealed items.',
        'Plan water, rotation, and realistic crew endurance — humidity is a labor and quality issue, not just comfort.',
        'Build flexible language for storm-season weather delays on outdoor packing.',
      ],
    },
    {
      id: 'port-industrial-adjacency',
      title: 'Port & industrial adjacency',
      intro:
        'Port freight and industrial corridors are not interchangeable with pure residential cul-de-sacs — timing and empty miles define the job.',
      bullets: [
        'Buffer portal time near port and industrial peaks on I-37 / SH-358 / west approaches.',
        'Share street-width and parking photos for industrial-edge residential grids.',
        'Ask whether west/Robstown ↔ core pairs still use a pure local rate card.',
        'Inventory carefully when sheds, shops, or mixed-use edges appear on the survey.',
      ],
    },
    {
      id: 'causeway-island-access',
      title: 'Causeway & island access',
      intro:
        'Padre Island approaches and causeway logistics need plans that mainland driveway jobs never write.',
      bullets: [
        'Confirm causeway timing, truck size, and weather windows before booking island pairs.',
        'Price mainland ↔ island as long local with honest empty miles — map miles understate peak delays.',
        'Protect inventory from wind, salt air, and open-lot grit on coastal edges.',
        'Inventory seasonal/second-home outdoor furniture carefully — weight and volume often exceed core apartments.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent Gulf-metro value, coastal living, and humidity are different bets — validate schools and healthcare by pocket, then plan for weather and causeway access.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Corpus Christi ISD, Flour Bluff ISD, Robstown ISD, and others. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Multiple districts under one county',
            detail:
              'City and coastal-edge addresses often fall in different systems. Marketing names and island/approach pockets can span feeders — verify with official boundary tools and TEA data.',
          },
          {
            title: 'Coastal vs inland pockets',
            detail:
              'Flour Bluff and island-adjacent households may face different calendars and commute patterns than core or Robstown addresses. Do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and TEA data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Metro acute-care anchors',
            detail:
              'CHRISTUS Spohn and other Corpus Christi-area campuses serve the metro. Map ER drive times at rush hour from Flour Bluff, island edges, and Robstown.',
          },
          {
            title: 'Specialty & regional reality',
            detail:
              'Some specialties require travel toward San Antonio or Houston. Confirm insurer networks and realistic long-drive plans before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer coastal-move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Nueces resources',
    intro:
      'Local official links first; directory listings are independent. Verify TxDMV household goods authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Nueces County',
        href: 'https://www.nuecesco.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Corpus Christi',
        href: 'https://www.cctexas.com/',
        external: true,
      },
      {
        label: 'City of Robstown',
        href: 'https://www.robstowntx.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Corpus core, Flour Bluff/Padre, Robstown/west, Island/causeway) when available. Confirm humidity-window plans, causeway timing for island pairs, and port-adjacent drive assumptions — this is an independent Gulf metro, not a Houston collar.',
  lastReviewed: '2026-07-24',
});
