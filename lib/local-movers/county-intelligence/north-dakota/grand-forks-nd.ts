import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNdPack } from '@/lib/local-movers/county-intelligence/north-dakota/nd-shared';

/**
 * Grand Forks County, ND — UND university / Red River Valley / border metro.
 * NOT Fargo Cass metro. NOT Bismarck capital. NOT a renamed MN Twin Cities or SD page.
 */
export const grandForksCountyNdIntelligence: CountyIntelligencePack = finalizeNdPack({
  countySlug: 'grand-forks',
  hubTitle: 'Grand Forks County Moving Intelligence Hub',
  eyebrow:
    'Grand Forks · UND university metro · Red River Valley · I-29 · US-2',
  h1: 'Moving in Grand Forks County: UND Density, Border Metro Logistics & Red River Valley Winter Access',
  heroOpener:
    'Grand Forks County, North Dakota is the northeastern Red River Valley university and border metro — downtown Grand Forks multi-unit, University of North Dakota campus-adjacent lease stock, south and west residential belts, East Grand Forks (MN) cross-river pairs, and rural valley approaches that rewrite “local” estimates under student calendars, prairie wind, and deep winter. This is not Fargo Cass corporate density, not Bismarck capital product, not Minot military-north, and not a renamed Minnesota Twin Cities or South Dakota template. A near-campus third-floor walk-up, a south Grand Forks HOA driveway, a faculty SFH, and a rural Grand Forks County farmstead do not share truck access, curb rules, or empty-mile risk. I-29, US-2, and the local Grand Forks grid freeflow rewrite map-short pairs, and Red River Valley snow, ice, and wind can erase schedule optimism overnight. This hub is for people moving in Grand Forks County, North Dakota — UND / border-metro realities, not a recycled Fargo, MN, SD, or MT page.',
  heroCredibility:
    'NDDOT Household Goods Carrier Permit · FMCSA · Curated directory listings',
  majorCorridors: 'I-29 · US-2 · local Grand Forks grid',
  whatMakesDifferent: {
    title: 'What makes moving in Grand Forks County different',
    intro:
      'These are UND / Red River Valley border-metro realities — campus lease waves, core multi-unit, south and west residential belts, I-29 / US-2 freeflow, and prairie winter logistics — not Fargo corporate defaults, not Bismarck capital product, and not a Minnesota or South Dakota rename.',
    bullets: [
      {
        title: 'UND campus-adjacent multi-unit rewrites labor hours',
        detail:
          'Scarce curb staging, multi-flight stairs, limited truck length, and building COI packets dominate near-campus and downtown jobs. A third-floor student walk-up is not a south Grand Forks garage-friendly two-story.',
      },
      {
        title: 'Semester and faculty lease waves create hard spikes',
        detail:
          'August move-in, May move-out, and mid-year faculty transfers compress surveys, curb, and multi-unit capacity. Civilian “any Saturday” assumptions fail during peak semester windows — book early and price month-end honestly.',
      },
      {
        title: 'I-29 and US-2 define portal-to-portal time',
        detail:
          'Downtown ↔ south belts, campus edges ↔ west residential, or Grand Forks ↔ East Grand Forks (MN) pairs look local on maps and regional at peak. Price honestly — empty miles, construction, and winter freeflow stack fast.',
      },
      {
        title: 'Red River Valley winter, wind, and ice are real schedule risk',
        detail:
          'Prairie snow, freeze-thaw ice on residential grids, and wind-exposed staging reshape morning windows. Build weather contingency into outdoor labor — especially November–March.',
      },
      {
        title: 'Cross-river border pairs are routine (East Grand Forks / Polk County, MN)',
        detail:
          'Households regularly move Grand Forks County ↔ East Grand Forks, MN or other ND counties. Clarify city and state addresses so NDDOT Household Goods Carrier Permit vs FMCSA interstate assumptions stay accurate when any leg leaves North Dakota.',
      },
      {
        title:
          'NDDOT Household Goods Carrier Permit for intrastate ND — not MnDOT, SD, MT, WY, or NJ',
        detail:
          'Moves entirely within North Dakota by for-hire household goods carriers generally require a Household Goods Carrier Permit from the North Dakota Department of Transportation (NDDOT) Motor Vehicle division. Match the legal name on the written estimate to NDDOT permit status before you deposit. Any out-of-state leg — including Grand Forks → East Grand Forks, MN — needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not accept MnDOT HHG, South Dakota, Montana, Wyoming, or New Jersey credentials as substitutes for pure in-state North Dakota authority.',
      },
    ],
  },
  zonesHeading: 'Grand Forks County access zones',
  zonesIntro:
    'Plan by downtown / UND campus multi-unit, south and west residential belts, growth multi-family edges, and rural Red River Valley approaches — access rules cluster by density and product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-und-campus',
      name: 'Downtown Grand Forks, UND campus & near-campus multi-unit',
      shortName: 'Downtown / UND',
      neighborhoods: [
        'Downtown Grand Forks',
        'University of North Dakota campus edges',
        'University Avenue / Columbia Road corridors',
        'Near-campus walk-ups and rentals',
        'Core multi-unit and character stock',
      ],
      housingTypes: 'Walk-up multifamily, student rentals, condos, character SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Semester and month-end multi-unit turns',
        'Tight turning radii and building COI packets',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows outside peak move-in/move-out weeks. Confirm building COIs and curb options in writing. Build Red River Valley winter contingency on core grids.',
      cityKeywords: [
        'grand forks',
        'downtown grand forks',
        'und',
        'university of north dakota',
        'university avenue',
      ],
    },
    {
      id: 'south-grand-forks',
      name: 'South Grand Forks residential & multi-family belts',
      shortName: 'South Grand Forks',
      neighborhoods: [
        'South Grand Forks',
        '32nd Avenue / S. Washington corridors',
        'Established south SFH grids',
        'Mixed multi-family growth pockets',
        'School-corridor residential',
      ],
      housingTypes: 'Mixed SFH, townhomes, multi-family, some HOA product',
      challenges: [
        'I-29 / arterial freeflow into core at peak',
        'HOA packets on newer multi-family',
        'Longer portal time on south–campus pairs',
      ],
      moverTips:
        'Price south Grand Forks ↔ downtown/UND pairs portal-to-portal. Collect HOA packets early on growth multi-family. Avoid peak I-29 windows when flexible.',
      cityKeywords: [
        'south grand forks',
        '32nd avenue',
        'washington street',
        'south grand forks hoa',
      ],
    },
    {
      id: 'west-grand-forks-growth',
      name: 'West Grand Forks & western growth edges',
      shortName: 'West Grand Forks',
      neighborhoods: [
        'West Grand Forks',
        'Columbia Road west edges',
        'Western HOA tracts',
        'Growth multi-family pockets',
        'US-2 west approaches',
      ],
      housingTypes: 'Newer SFH, townhomes, HOA tracts, multi-family growth product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'US-2 / arterial peak congestion toward core',
        'Longer empty miles on growth–campus pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price west belts ↔ downtown/UND pairs portal-to-portal. Photo driveway staging on newer tracts.',
      cityKeywords: [
        'west grand forks',
        'columbia road',
        'west grand forks hoa',
        'us-2 grand forks',
      ],
    },
    {
      id: 'rural-gf-red-river',
      name: 'Rural Grand Forks County & Red River Valley approaches',
      shortName: 'Rural GF / Valley',
      neighborhoods: [
        'Thompson / Manvel edges',
        'Larimore approaches',
        'Northwood corridor edges',
        'Rural Red River Valley farmsteads',
        'I-29 / US-2 rural pockets',
      ],
      housingTypes: 'Older SFH, farmhouses, rural-residential, acreage lots',
      challenges: [
        'Long driveway carries and limited truck turnaround',
        'Wind-exposed staging and winter ice',
        'I-29 / US-2 empty miles into Grand Forks',
      ],
      moverTips:
        'Photo driveway pitch, soft shoulders, and staging length. Price rural–core pairs with freeflow buffers. Build winter contingency on valley approaches.',
      cityKeywords: [
        'thompson',
        'manvel',
        'larimore',
        'northwood',
        'rural grand forks',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Grand Forks County moving costs',
    intro:
      'Campus multi-unit friction, semester lease-wave density, growth-belt HOA rules, I-29 / US-2 portal time, and Red River Valley winter logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'UND / downtown stair & curb friction',
        detail: 'Walk-ups, scarce staging, and building packets dominate campus-adjacent jobs.',
      },
      {
        title: 'Semester spike & multi-unit soft costs',
        detail: 'Move-in/move-out waves, elevators/COIs, and tight curb spike labor hours.',
      },
      {
        title: 'I-29 / US-2 congestion',
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
        value: '$480–$1,850+',
        note: 'Higher with walk-ups, semester turns, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,400–$4,400+',
        note: 'Campus and growth-belt friction trends up',
      },
      {
        label: '3–4+ BR / HOA / cross-metro / rural',
        value: '$2,600–$8,600+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$170+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Grand Forks County',
    intro:
      'UND semester peaks, family season, multi-family month-ends, and Red River Valley winter ice reshape Grand Forks-area windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear campus curb and reduce I-29 / US-2 pain before peak.',
      },
      {
        title: 'Peak campus season: mid-May & mid-August',
        detail: 'Book near-campus multi-unit and south/west Saturdays early around semester turns.',
      },
      {
        title: 'Month-end multi-family & faculty turns',
        detail: 'Downtown and campus-adjacent elevators/curb fill first.',
      },
      {
        title: 'Winter prairie snow, ice & wind risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'und-red-river-border-metro',
      title: 'UND / Red River Valley border-metro & corridor-grid module',
      intro:
        'Grand Forks County ND estimates fail when campus building packets, semester lease density, growth HOA rules, or I-29/US-2 empty miles are ignored — and when crews treat this as a Fargo, Twin Cities, or SD rename page.',
      bullets: [
        'Request downtown and near-campus multi-unit building packets early.',
        'Photo stair access, basement entries, and curb staging on UND-adjacent jobs.',
        'Price I-29 · US-2 pairs portal-to-portal.',
        'Clarify Grand Forks vs south/west belts vs rural destinations on multi-town estimates.',
        'For pure in-state North Dakota jobs verify NDDOT Household Goods Carrier Permit; verify FMCSA for any interstate leg (including East Grand Forks, MN).',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Grand Forks County?',
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
              'Grand Forks Public Schools and surrounding rural systems serve different addresses. Confirm zoning carefully — district lines shift across the city and rural Grand Forks County. UND shapes near-campus housing demand more than K–12 alone.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and North Dakota Department of Public Instruction data beat ranking screenshots. University housing calendars matter for lease-turn planning.',
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
              'Altru Health System and affiliated campuses anchor regional care. Confirm networks and specialist access for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from south and west belts and rural towns into major Grand Forks medical campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Campus multi-unit vs growth SFH vs rural stock',
            detail:
              'Near-campus rentals, downtown walk-ups, south/west HOA product, and rural valley farmsteads price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Renovated core and western growth stock often prices differently from older student-heavy blocks or rural valley product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / UND lifestyle',
            detail: 'Walkable campus amenities with stair, curb, density, and semester-turn tradeoffs.',
          },
          {
            title: 'South Grand Forks pattern',
            detail: 'Mixed SFH and multi-family with I-29 corridor logistics.',
          },
          {
            title: 'West Grand Forks pattern',
            detail: 'More space, HOA rules, and different commute math to campus and core jobs.',
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
              'University of North Dakota, healthcare, aerospace and defense-adjacent employers, agribusiness, and regional retail shape employment across the Grand Forks MSA.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-29 and US-2 peaks are real. Test drive peak routes between your zone and UND / medical / commercial anchors; East Grand Forks pairs add interstate logistics.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Red River Valley university / border identity',
            detail:
              'Grand Forks County is North Dakota’s northeastern university and border metro — not a Fargo Cass rename, not Bismarck capital product, and not a Minnesota Twin Cities page.',
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
    title: 'Useful Grand Forks County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NDDOT Household Goods Carrier Permit for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Grand Forks County, North Dakota — official site',
        href: 'https://www.gfcounty.nd.gov/',
        external: true,
      },
      {
        label: 'City of Grand Forks — official site',
        href: 'https://www.grandforksgov.com/',
        external: true,
      },
      {
        label: 'University of North Dakota — official site',
        href: 'https://und.edu/',
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
    'Prefer UND campus multi-unit and growth-belt experience with honest I-29 · US-2 pricing. Verify NDDOT Household Goods Carrier Permit in-state and FMCSA interstate (including East Grand Forks, MN). This is Grand Forks County ND (UND / Red River Valley border metro) — not Fargo, not a MN or SD rename.',
  lastReviewed: '2026-07-24',
});
