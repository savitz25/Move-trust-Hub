import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNdPack } from '@/lib/local-movers/county-intelligence/north-dakota/nd-shared';

/**
 * Burleigh County, ND — Bismarck capital / Missouri River plateau.
 * NOT Fargo Red River Valley. NOT Minot military-north. NOT a renamed MN/SD/MT capital page.
 */
export const burleighCountyNdIntelligence: CountyIntelligencePack = finalizeNdPack({
  countySlug: 'burleigh',
  hubTitle: 'Burleigh County Moving Intelligence Hub',
  eyebrow:
    'Burleigh · Bismarck capital · Missouri River · I-94 · US-83 · ND-1804',
  h1: 'Moving in Burleigh County: Bismarck Capital Access, Lincoln Growth & Missouri River Winter Logistics',
  heroOpener:
    'Burleigh County, North Dakota is the Bismarck capital hub — downtown Bismarck multi-unit and character stock, north and south residential belts, Lincoln growth product, Missouri River corridor approaches, and rural capital-county acreage that rewrite “local” estimates under state government, healthcare, and prairie freeflow. This is not Fargo Red River Valley density, not Grand Forks university-north, not Minot military-regional defaults, and not a renamed Minnesota, South Dakota, or Montana capital template. A downtown walk-up near the capitol complex, a Lincoln HOA driveway, a north Bismarck two-story, and a rural Burleigh farmstead do not share truck access, curb rules, or empty-mile risk. I-94, US-83, ND-1804, and the local Bismarck grid freeflow rewrite map-short pairs, and Missouri Plateau winter ice and wind can erase schedule optimism overnight. This hub is for people moving in Burleigh County, North Dakota — Bismarck capital realities, not a recycled Fargo, MN, SD, or MT page.',
  heroCredibility:
    'NDDOT Household Goods Carrier Permit · FMCSA · Curated directory listings',
  majorCorridors: 'I-94 · US-83 · ND-1804 · local Bismarck grid',
  whatMakesDifferent: {
    title: 'What makes moving in Burleigh County different',
    intro:
      'These are Bismarck capital / Missouri River realities — state government calendars, downtown multi-unit, Lincoln growth HOAs, Mandan cross-river pairs, and prairie winter logistics — not Fargo Red River defaults, not Minot military product, and not a Minnesota or South Dakota rename.',
    bullets: [
      {
        title: 'This is Bismarck capital — not Fargo, Grand Forks, or Minot',
        detail:
          'Ignore Red River Valley density scripts, UND lease waves, and Minot AFB PCS templates as default product. Burleigh is North Dakota’s capital county with state employment anchors, healthcare campuses, and Missouri River corridor housing. Match estimates to Bismarck, Lincoln, and rural Burleigh addresses.',
      },
      {
        title: 'State government and healthcare cycles shape demand',
        detail:
          'Legislative-session months, agency transfers, and hospital-system relocations compress surveys and mid-week capacity near capital employment. Civilian “any Saturday” assumptions fail when session housing and professional relo collide with school calendars.',
      },
      {
        title: 'Downtown Bismarck multi-unit differs from Lincoln and north-belt SFH',
        detail:
          'Walk-ups, scarce curb, stairs, and older character stock dominate core jobs. A Lincoln ranch or north Bismarck two-story is not a downtown loft freight window.',
      },
      {
        title: 'I-94, US-83, and ND-1804 define portal-to-portal time',
        detail:
          'Downtown ↔ Lincoln, north Bismarck ↔ south belts, or Bismarck ↔ Mandan (Morton County) pairs look local on maps and regional at peak. Price honestly — empty miles, construction, and winter freeflow stack fast.',
      },
      {
        title: 'Missouri Plateau winter, wind, and ice are real schedule risk',
        detail:
          'Prairie snow, freeze-thaw ice on residential grids, river-corridor wind, and rural approach soft shoulders reshape morning windows. Build weather contingency into outdoor labor — especially November–March.',
      },
      {
        title:
          'NDDOT Household Goods Carrier Permit for intrastate ND — not MnDOT, SD, MT, WY, or NJ',
        detail:
          'Moves entirely within North Dakota by for-hire household goods carriers generally require a Household Goods Carrier Permit from the North Dakota Department of Transportation (NDDOT) Motor Vehicle division. Match the legal name on the written estimate to NDDOT permit status before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not accept MnDOT HHG, South Dakota, Montana, Wyoming, or New Jersey credentials as substitutes for pure in-state North Dakota authority.',
      },
    ],
  },
  zonesHeading: 'Burleigh County access zones',
  zonesIntro:
    'Plan by downtown Bismarck multi-unit and capitol edges, north and south residential belts, Lincoln growth product, and rural Missouri River / capital-county approaches — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'bismarck-downtown-capitol',
      name: 'Downtown Bismarck, capitol complex edges & core multi-unit',
      shortName: 'Downtown Bismarck',
      neighborhoods: [
        'Downtown Bismarck',
        'Capitol complex edges',
        'Core multi-unit and walk-ups',
        'Historic character grids',
        'Commercial-adjacent residential',
      ],
      housingTypes: 'Walk-up multifamily, condos, character SFH, limited elevators',
      challenges: [
        'Scarce curb staging and session-day congestion',
        'Multi-flight stairs and building packets',
        'I-94 / downtown freeflow and truck-length limits',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows outside peak legislative-session congestion. Photo curb options and stair counts — downtown is not Lincoln ranch access.',
      cityKeywords: [
        'bismarck',
        'downtown bismarck',
        'capitol',
        'north dakota capitol',
      ],
    },
    {
      id: 'north-south-bismarck-belts',
      name: 'North & south Bismarck residential belts',
      shortName: 'N/S Bismarck',
      neighborhoods: [
        'North Bismarck',
        'South Bismarck',
        'Century Avenue / State Street edges',
        'Established SFH grids',
        'Mixed multi-family pockets',
      ],
      housingTypes: 'Mixed SFH, townhomes, multi-family, some HOA product',
      challenges: [
        'US-83 / arterial freeflow into core at peak',
        'HOA packets on newer multi-family',
        'Longer portal time on belt–downtown pairs',
      ],
      moverTips:
        'Price north/south Bismarck ↔ downtown pairs portal-to-portal. Collect HOA packets early on growth multi-family. Avoid peak US-83 windows when flexible.',
      cityKeywords: [
        'north bismarck',
        'south bismarck',
        'century avenue',
        'state street',
      ],
    },
    {
      id: 'lincoln-growth',
      name: 'Lincoln & southeastern growth product',
      shortName: 'Lincoln',
      neighborhoods: [
        'Lincoln',
        'Southeastern HOA tracts',
        'I-94 east approaches',
        'Growth multi-family pockets',
        'School-corridor residential',
      ],
      housingTypes: 'Newer SFH, townhomes, HOA tracts, multi-family growth product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-94 peak congestion toward Bismarck core',
        'Longer empty miles on growth–core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price Lincoln–downtown pairs portal-to-portal. Photo driveway staging on newer tracts.',
      cityKeywords: [
        'lincoln',
        'lincoln nd',
        'southeast bismarck',
        'lincoln hoa',
      ],
    },
    {
      id: 'rural-burleigh-missouri',
      name: 'Rural Burleigh & Missouri River corridor approaches',
      shortName: 'Rural Burleigh / River',
      neighborhoods: [
        'Missouri River corridor edges',
        'Menoken approaches',
        'Baldwin / Wing corridor edges',
        'Rural capital-county farmsteads',
        'ND-1804 river-road pockets',
      ],
      housingTypes: 'Older SFH, farmhouses, rural-residential, acreage lots',
      challenges: [
        'Long driveway carries and limited truck turnaround',
        'Wind-exposed staging and winter ice',
        'I-94 / US-83 / ND-1804 empty miles into Bismarck',
      ],
      moverTips:
        'Photo driveway pitch, soft shoulders, and staging length. Price rural–core pairs with freeflow buffers. Build winter contingency on plateau and river approaches.',
      cityKeywords: [
        'menoken',
        'baldwin',
        'wing',
        'missouri river',
        'rural burleigh',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Burleigh County moving costs',
    intro:
      'Core multi-unit friction, capital-session demand, Lincoln HOA rules, I-94 / US-83 portal time, and Missouri Plateau winter logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Downtown stair & curb friction',
        detail: 'Walk-ups, scarce staging, and building packets dominate core jobs.',
      },
      {
        title: 'Lincoln growth HOA soft costs',
        detail: 'Gate lists, truck limits, and growth–core empty miles spike labor hours.',
      },
      {
        title: 'I-94 / US-83 / ND-1804 congestion',
        detail: 'Portal-to-portal spikes at peak, construction, and winter freeflow.',
      },
      {
        title: 'Prairie winter ice, wind & rural empty miles',
        detail: 'Map-short pairs still bill regional time; ice and wind rewrite outdoor staging.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,800+',
        note: 'Higher with walk-ups, session peaks, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,400–$4,400+',
        note: 'Core and growth-belt friction trends up',
      },
      {
        label: '3–4+ BR / HOA / cross-metro / rural',
        value: '$2,600–$8,800+',
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
    title: 'When to schedule a move in Burleigh County',
    intro:
      'State government and healthcare peaks, family season, multi-family month-ends, and Missouri Plateau winter ice reshape Bismarck-area windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear core curb and reduce I-94 / US-83 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Bismarck multi-unit and Lincoln Saturdays early.',
      },
      {
        title: 'Legislative session & month-end multi-family turns',
        detail: 'Downtown curb and elevators fill first near capital employment.',
      },
      {
        title: 'Winter prairie snow, ice & wind risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'bismarck-capital-corridor-grid',
      title: 'Bismarck capital & Missouri River corridor-grid module',
      intro:
        'Burleigh County ND estimates fail when core building packets, capital-session demand, Lincoln HOA rules, or I-94/US-83 empty miles are ignored — and when crews treat this as a Fargo, Twin Cities, or SD capital rename page.',
      bullets: [
        'Request Bismarck multi-unit building packets early.',
        'Photo stair access, basement entries, and curb staging on downtown jobs.',
        'Price I-94 · US-83 · ND-1804 pairs portal-to-portal.',
        'Clarify Bismarck vs Lincoln vs rural Burleigh destinations on multi-town estimates.',
        'For pure in-state North Dakota jobs verify NDDOT Household Goods Carrier Permit; verify FMCSA for any interstate leg.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Burleigh County?',
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
              'Bismarck Public Schools, Lincoln Elementary / affiliated systems, and rural Burleigh districts serve different addresses. Confirm zoning carefully — district lines shift across Bismarck, Lincoln, and capital-county edges.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and North Dakota Department of Public Instruction data beat ranking screenshots.',
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
              'Sanford Health Bismarck, CHI St. Alexius, and affiliated campuses anchor regional care. Confirm networks and specialist access for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Lincoln, north Bismarck, and rural Burleigh into major medical campuses. Transfer records early.',
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
              'Downtown walk-ups, north/south belt SFH, Lincoln HOA product, and rural Burleigh farmsteads price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Renovated core and southeastern growth stock often prices differently from older grids or rural plateau product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / capitol lifestyle',
            detail: 'Walkable amenities with stair, curb, density, and session-day tradeoffs.',
          },
          {
            title: 'North / south Bismarck pattern',
            detail: 'Mixed SFH and multi-family with US-83 corridor logistics.',
          },
          {
            title: 'Lincoln pattern',
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
              'State government, healthcare, energy and professional services, education, and regional retail shape employment across the Bismarck–Mandan MSA.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-94, US-83, and ND-1804 peaks are real. Test drive peak routes between your zone and Bismarck employment anchors; Mandan cross-river pairs add Morton County logistics.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Capital metro identity',
            detail:
              'Burleigh is North Dakota’s capital county — not a Fargo Red River rename, not Minot military product, and not a Minnesota or South Dakota template.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season northern plains climate with deep cold, prairie wind, and plateau snow/ice. Plan outdoor staging contingency November–March.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Burleigh County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NDDOT Household Goods Carrier Permit for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Burleigh County, North Dakota — official site',
        href: 'https://www.burleighco.com/',
        external: true,
      },
      {
        label: 'City of Bismarck — official site',
        href: 'https://www.bismarcknd.gov/',
        external: true,
      },
      {
        label: 'City of Lincoln — official site',
        href: 'https://www.cityoflincolnnd.com/',
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
    'Prefer capital multi-unit and Lincoln HOA experience with honest I-94 · US-83 · ND-1804 pricing. Verify NDDOT Household Goods Carrier Permit in-state and FMCSA interstate. This is Burleigh County ND (Bismarck capital) — not Fargo, not a MN/SD/MT rename.',
  lastReviewed: '2026-07-24',
});
