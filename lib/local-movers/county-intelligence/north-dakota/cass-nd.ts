import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNdPack } from '@/lib/local-movers/county-intelligence/north-dakota/nd-shared';

/**
 * Cass County, ND — Fargo–Moorhead / Red River Valley metro core.
 * NOT Bismarck capital. NOT Grand Forks university-north. NOT a renamed MN Twin Cities or SD page.
 */
export const cassCountyNdIntelligence: CountyIntelligencePack = finalizeNdPack({
  countySlug: 'cass',
  hubTitle: 'Cass County Moving Intelligence Hub',
  eyebrow:
    'Cass · Fargo–Moorhead · Red River Valley · I-94 · I-29 · US-10',
  h1: 'Moving in Cass County: Fargo Density, West Fargo Growth & Red River Valley Winter Access',
  heroOpener:
    'Cass County, North Dakota is the state’s densest residential market — Fargo downtown and near-campus multi-unit, NDSU-adjacent lease stock, West Fargo and Horace growth belts, south Fargo corridor product, and Red River Valley approaches that rewrite “local” estimates under prairie wind and deep winter. This is not Bismarck capital product, not Grand Forks university-north alone, and not a renamed Minnesota Twin Cities or South Dakota prairie template. A downtown Fargo third-floor walk-up, a West Fargo HOA cul-de-sac, an NDSU-area month-end turn, and a rural Cass farmstead driveway do not share truck access, curb rules, or empty-mile risk. I-94, I-29, US-10, and the local Fargo grid freeflow rewrite map-short pairs, and Red River Valley snow, ice, and wind can erase schedule optimism overnight. This hub is for people moving in Cass County, North Dakota — Fargo–Moorhead metro realities, not a recycled MN, SD, MT, or Bismarck page.',
  heroCredibility:
    'NDDOT Household Goods Carrier Permit · FMCSA · Curated directory listings',
  majorCorridors: 'I-94 · I-29 · US-10 · local Fargo grid',
  whatMakesDifferent: {
    title: 'What makes moving in Cass County different',
    intro:
      'These are Fargo–Moorhead / Red River Valley realities — core multi-unit, NDSU lease waves, West Fargo–Horace growth HOAs, I-94 / I-29 freeflow, and prairie winter logistics — not Bismarck capital defaults, not Grand Forks alone, and not a Minnesota or South Dakota rename.',
    bullets: [
      {
        title: 'Fargo core multi-unit and near-campus stock rewrite labor hours',
        detail:
          'Scarce curb staging, multi-flight stairs, limited truck length, and building COI packets dominate downtown and NDSU-adjacent jobs. A third-floor walk-up is not a West Fargo garage-friendly two-story.',
      },
      {
        title: 'West Fargo–Horace growth belts are not core Fargo product',
        detail:
          'HOA gate lists, truck-length limits, longer portal time into downtown, and mixed townhome product reshape estimates that assume a flat “Cass County rate.”',
      },
      {
        title: 'I-94, I-29, and US-10 define portal-to-portal time',
        detail:
          'West Fargo ↔ downtown, south Fargo ↔ NDSU edges, or Horace ↔ Moorhead-adjacent pairs look local on maps and regional at peak. Price honestly — empty miles, construction, and winter freeflow stack fast.',
      },
      {
        title: 'Red River Valley winter, wind, and ice are real schedule risk',
        detail:
          'Prairie snow, freeze-thaw ice on residential grids, and wind-exposed staging reshape morning windows. Build weather contingency into outdoor labor — especially November–March.',
      },
      {
        title: 'Cross-river and multi-county pairs are routine (Moorhead / Clay County, MN)',
        detail:
          'Fargo–Moorhead households regularly move Cass County ↔ Clay County, MN or other ND counties. Clarify city and state addresses so NDDOT Household Goods Carrier Permit vs FMCSA interstate assumptions stay accurate when any leg leaves North Dakota.',
      },
      {
        title:
          'NDDOT Household Goods Carrier Permit for intrastate ND — not MnDOT, SD, MT, WY, or NJ',
        detail:
          'Moves entirely within North Dakota by for-hire household goods carriers generally require a Household Goods Carrier Permit from the North Dakota Department of Transportation (NDDOT) Motor Vehicle division. Match the legal name on the written estimate to NDDOT permit status before you deposit. Any out-of-state leg — including Fargo → Moorhead, MN — needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not accept MnDOT HHG, South Dakota, Montana, Wyoming, or New Jersey credentials as substitutes for pure in-state North Dakota authority.',
      },
    ],
  },
  zonesHeading: 'Cass County access zones',
  zonesIntro:
    'Plan by Fargo downtown / near-campus multi-unit, south Fargo corridor product, West Fargo–Horace growth belts, and rural Red River Valley approaches — access rules cluster by density and product more than ZIP alone.',
  zones: [
    {
      id: 'fargo-downtown-ndsu',
      name: 'Fargo downtown, near-campus multi-unit & NDSU edges',
      shortName: 'Fargo core / NDSU',
      neighborhoods: [
        'Downtown Fargo',
        'NDSU / University Drive edges',
        'Near North / Roosevelt edges',
        'Hawthorne / Island Park edges',
        'Core multi-unit and walk-ups',
      ],
      housingTypes: 'Walk-up multifamily, condos, character SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Semester and month-end multi-unit turns',
        'Tight turning radii and building COI packets',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm building COIs and curb options in writing. Build Red River Valley winter contingency on core grids.',
      cityKeywords: [
        'fargo',
        'downtown fargo',
        'ndsu',
        'university drive',
        'near north',
      ],
    },
    {
      id: 'south-fargo-corridor',
      name: 'South Fargo corridor & mixed residential belts',
      shortName: 'South Fargo',
      neighborhoods: [
        'South Fargo',
        'I-94 south corridor edges',
        '45th Street / Veterans Boulevard belts',
        'Mixed multi-family growth pockets',
        'Established south SFH grids',
      ],
      housingTypes: 'Mixed SFH, townhomes, multi-family, some HOA product',
      challenges: [
        'I-94 / arterial freeflow into core at peak',
        'HOA packets on newer multi-family',
        'Longer portal time on south–downtown pairs',
      ],
      moverTips:
        'Price south Fargo ↔ downtown pairs portal-to-portal. Collect HOA packets early on growth multi-family. Avoid peak I-94 windows when flexible.',
      cityKeywords: [
        'south fargo',
        '45th street',
        'veterans boulevard',
        'i-94 fargo',
      ],
    },
    {
      id: 'west-fargo-horace',
      name: 'West Fargo, Horace & western growth belts',
      shortName: 'West Fargo / Horace',
      neighborhoods: [
        'West Fargo',
        'Horace',
        'Sheyenne Street / Main corridor edges',
        'Western HOA tracts',
        'I-94 west approaches',
      ],
      housingTypes: 'Newer SFH, townhomes, HOA tracts, multi-family growth product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-94 peak congestion toward Fargo core',
        'Longer empty miles on growth–core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price West Fargo–Fargo and Horace–downtown pairs portal-to-portal. Photo driveway staging on newer tracts.',
      cityKeywords: [
        'west fargo',
        'horace',
        'sheyenne',
        'west fargo hoa',
      ],
    },
    {
      id: 'rural-cass-red-river',
      name: 'Rural Cass & Red River Valley approaches',
      shortName: 'Rural Cass / Valley',
      neighborhoods: [
        'Mapleton edges',
        'Casselton approaches',
        'Harwood / Argusville edges',
        'Rural Red River Valley farmsteads',
        'Eastern river-corridor pockets',
      ],
      housingTypes: 'Older SFH, farmhouses, rural-residential, acreage lots',
      challenges: [
        'Long driveway carries and limited truck turnaround',
        'Wind-exposed staging and winter ice',
        'I-94 / US-10 empty miles into Fargo',
      ],
      moverTips:
        'Photo driveway pitch, soft shoulders, and staging length. Price rural–core pairs with freeflow buffers. Build winter contingency on valley approaches.',
      cityKeywords: [
        'mapleton',
        'casselton',
        'harwood',
        'argusville',
        'rural cass',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Cass County moving costs',
    intro:
      'Core multi-unit friction, NDSU lease-wave density, growth-belt HOA rules, I-94 / I-29 portal time, and Red River Valley winter logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Fargo core stair & curb friction',
        detail: 'Walk-ups, scarce staging, and building packets dominate downtown and near-campus jobs.',
      },
      {
        title: 'West Fargo–Horace HOA soft costs',
        detail: 'Gate lists, truck limits, and growth–core empty miles spike labor hours.',
      },
      {
        title: 'I-94 / I-29 / US-10 congestion',
        detail: 'Portal-to-portal spikes at peak, construction, and winter freeflow.',
      },
      {
        title: 'Valley winter ice, wind & rural empty miles',
        detail: 'Map-short pairs still bill regional time; ice and wind rewrite outdoor staging.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with walk-ups, campus turns, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,500–$4,600+',
        note: 'Core and growth-belt friction trends up',
      },
      {
        label: '3–4+ BR / HOA / cross-metro / rural',
        value: '$2,800–$9,200+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$175+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Cass County',
    intro:
      'Corporate and family peaks, NDSU lease turns, multi-family month-ends, and Red River Valley winter ice reshape Fargo-area windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear core curb and reduce I-94 / I-29 pain before peak.',
      },
      {
        title: 'Peak family & campus season: late May–mid-August',
        detail: 'Book Fargo multi-unit and West Fargo Saturdays early.',
      },
      {
        title: 'Month-end multi-family & NDSU turns',
        detail: 'Downtown, near-campus, and growth elevators/curb fill first.',
      },
      {
        title: 'Winter prairie snow, ice & wind risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'fargo-red-river-metro-grid',
      title: 'Fargo–Moorhead Red River Valley metro & corridor-grid module',
      intro:
        'Cass County ND estimates fail when core building packets, NDSU lease density, West Fargo HOA rules, or I-94/I-29 empty miles are ignored — and when crews treat this as a Bismarck, Twin Cities, or SD prairie rename page.',
      bullets: [
        'Request Fargo multi-unit building packets early.',
        'Photo stair access, basement entries, and curb staging on core and near-campus jobs.',
        'Price I-94 · I-29 · US-10 pairs portal-to-portal.',
        'Clarify Fargo vs West Fargo vs Horace destinations on multi-town estimates.',
        'For pure in-state North Dakota jobs verify NDDOT Household Goods Carrier Permit; verify FMCSA for any interstate leg (including Moorhead, MN).',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Cass County?',
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
              'Fargo Public Schools, West Fargo Public Schools, Northern Cass, Central Cass, and other systems serve different addresses. Confirm zoning carefully — district lines shift across Fargo, West Fargo, Horace, and rural Cass.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and North Dakota Department of Public Instruction data beat ranking screenshots. NDSU shapes near-campus housing demand more than K–12 alone.',
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
              'Sanford Health Fargo, Essentia Health, and affiliated campuses anchor regional care. Confirm networks and specialist access for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from West Fargo, Horace, and south Fargo into major Fargo medical campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs growth SFH vs rural stock',
            detail:
              'Fargo walk-ups, near-campus rentals, West Fargo–Horace HOA product, and rural Cass farmsteads price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Renovated core and western growth stock often prices differently from older south grids or rural valley product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Fargo core / NDSU lifestyle',
            detail: 'Walkable amenities with stair, curb, density, and winter grid tradeoffs.',
          },
          {
            title: 'South Fargo pattern',
            detail: 'Mixed SFH and multi-family with I-94 corridor logistics.',
          },
          {
            title: 'West Fargo / Horace pattern',
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
              'Healthcare, NDSU, tech and professional services, finance, agribusiness, and regional retail shape employment across the Fargo–Moorhead MSA.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-94, I-29, and US-10 peaks are real. Test drive peak routes between your zone and Fargo employment anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Red River Valley metro identity',
            detail:
              'Cass is North Dakota’s largest metro core — not a Bismarck capital rename, not Grand Forks alone, and not a Minnesota Twin Cities product page.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season northern plains climate with deep cold, prairie wind, and valley snow/ice. Plan outdoor staging contingency November–March.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Cass County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NDDOT Household Goods Carrier Permit for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Cass County, North Dakota — official site',
        href: 'https://www.casscountynd.gov/',
        external: true,
      },
      {
        label: 'City of Fargo — official site',
        href: 'https://www.fargond.gov/',
        external: true,
      },
      {
        label: 'City of West Fargo — official site',
        href: 'https://www.westfargond.gov/',
        external: true,
      },
      {
        label: 'North Dakota DOT — traffic & motor vehicle context',
        href: 'https://www.dot.nd.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer core multi-unit and growth-belt HOA experience with honest I-94 · I-29 · US-10 pricing. Verify NDDOT Household Goods Carrier Permit in-state and FMCSA interstate (including Moorhead, MN). This is Cass County ND (Fargo–Moorhead / Red River Valley) — not Bismarck, not a MN or SD rename.',
  lastReviewed: '2026-07-24',
});
