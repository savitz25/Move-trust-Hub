import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNePack } from '@/lib/local-movers/county-intelligence/nebraska/ne-shared';

/**
 * Sarpy County, NE — Bellevue/Papillion south-metro growth + Offutt adjacency (not Douglas rename).
 */
export const sarpyCountyNeIntelligence: CountyIntelligencePack = finalizeNePack({
  countySlug: 'sarpy',
  hubTitle: 'Sarpy County Moving Intelligence Hub',
  eyebrow:
    'Sarpy · Bellevue–Papillion NE south-metro · I-80 · US-75 · NE-370',
  h1: 'Moving in Sarpy County: Bellevue–Papillion Growth, Offutt Adjacency & South-Metro Corridor Logistics',
  heroOpener:
    'Sarpy County, Nebraska is Omaha south-metro growth — Bellevue and Papillion family belts, La Vista and Gretna expansion, Offutt Air Force Base adjacency, and Missouri River edges — not a Douglas County Omaha core rename, not downtown Old Market product, and not a Lincoln capital template. A Bellevue multi-family lease turn, a Papillion HOA two-story, a La Vista townhome, and a Gretna cul-de-sac do not share truck access, curb rules, or empty-mile risk. I-80, US-75, and NE-370 freeflow rewrite “local” estimates across the south-metro grid, and winter ice on river approaches and arterials can erase schedule optimism overnight. This hub is for people moving in Sarpy County, Nebraska — south-metro market realities, not a renamed Douglas page.',
  heroCredibility:
    'Nebraska PSC Household Goods Mover License · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-80 · US-75 · NE-370 · local south-metro grid',
  whatMakesDifferent: {
    title: 'What makes moving in Sarpy County different',
    intro:
      'These are south-metro growth realities — military adjacency, HOA tracts, multi-family turns, and corridor freeflow — not Omaha downtown elevators, not Lincoln university cycles, and not a Douglas County rename with different ZIP labels.',
    bullets: [
      {
        title: 'Offutt adjacency rewrites mid-week and PCS demand',
        detail:
          'Military permanent change-of-station windows, contractor relocations, and Bellevue multi-family turns create schedule pressure that pure civilian west-Omaha HOA stock does not share. Confirm timing early around base cycles.',
      },
      {
        title: 'Papillion, La Vista, and Gretna HOA growth is not Bellevue-only product',
        detail:
          'Gate lists, truck-length limits, and timed windows stack soft costs that older Bellevue grids and multi-family docks do not share. Survey each address — “south-metro” is not one product.',
      },
      {
        title: 'I-80, US-75, and NE-370 define portal-to-portal time',
        detail:
          'Bellevue ↔ Papillion, Gretna ↔ La Vista, or Sarpy ↔ Douglas core pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Missouri River edges and winter logistics are real schedule risk',
        detail:
          'River-approach freeflow, ice, wind, and snow events reshape morning windows across the south metro. Build weather contingency into outdoor staging and cross-zone pairs — especially December–March.',
      },
      {
        title: 'This is south-metro Sarpy — not a Douglas County rename',
        detail:
          'Ignore Omaha Old Market elevator defaults and west Omaha Elkhorn scripts as interchangeable templates. Sarpy is Bellevue–Papillion growth with Offutt adjacency and different housing mix and corridor math.',
      },
      {
        title: 'Intrastate Nebraska PSC Household Goods Mover License vs interstate FMCSA',
        detail:
          'Moves entirely within Nebraska by for-hire household goods carriers generally require a Nebraska Public Service Commission Household Goods Mover License. Match the legal name on the estimate to the PSC licensee list before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. This is not Iowa DOT, Kansas KCC, or Colorado PUC product.',
      },
    ],
  },
  zonesHeading: 'Sarpy County access zones',
  zonesIntro:
    'Plan by Bellevue–Offutt multi-family and established stock, Papillion core growth, La Vista corridor product, and Gretna west expansion — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'bellevue-offutt',
      name: 'Bellevue, Offutt adjacency & Missouri River edges',
      shortName: 'Bellevue / Offutt',
      neighborhoods: [
        'Bellevue',
        'Offutt AFB approaches',
        'Missouri River edges',
        'US-75 Bellevue corridors',
        'Multi-family lease-turn belts',
      ],
      housingTypes: 'Mixed SFH, multi-family, military-adjacent rental stock',
      challenges: [
        'PCS calendars and multi-family turn stacking',
        'US-75 peak freeflow and river-approach weather',
        'Mix of older stair product and denser apartments',
      ],
      moverTips:
        'Coordinate around base PCS windows when relevant. Survey multi-family curb and elevator access early. Build winter contingency on river approaches.',
      cityKeywords: [
        'bellevue',
        'offutt',
        'bellevue nebraska',
        'us-75',
        'missouri river',
      ],
    },
    {
      id: 'papillion-core-growth',
      name: 'Papillion core & family growth belts',
      shortName: 'Papillion',
      neighborhoods: [
        'Papillion',
        'Papillion downtown edges',
        'Family tract growth belts',
        'NE-370 Papillion approaches',
        'School-corridor neighborhoods',
      ],
      housingTypes: 'Newer SFH, HOA tracts, some multi-family and townhome product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'NE-370 peak congestion',
        'School-season Saturday demand',
      ],
      moverTips:
        'Collect HOA packets early. Prefer mid-week mornings around school calendars. Photo driveway and garage access on two-story stock.',
      cityKeywords: [
        'papillion',
        'papillion nebraska',
        'ne-370',
        'papillion downtown',
        'sarpy',
      ],
    },
    {
      id: 'la-vista-corridor',
      name: 'La Vista corridor & south-metro multi-unit',
      shortName: 'La Vista',
      neighborhoods: [
        'La Vista',
        'I-80 La Vista approaches',
        'Corridor multi-family edges',
        'Giles Road corridors',
        'Townhome product belts',
      ],
      housingTypes: 'Multi-family, townhomes, mixed SFH and corridor stock',
      challenges: [
        'I-80 freeflow and limited curb on multi-unit jobs',
        'Elevator COI packets on denser product',
        'Cross-zone empty miles into Bellevue and Papillion',
      ],
      moverTips:
        'Get multi-unit building packets early. Price I-80 pairs portal-to-portal. Confirm elevator size and dock rules before final pricing.',
      cityKeywords: [
        'la vista',
        'lavista',
        'giles road',
        'i-80',
        'la vista nebraska',
      ],
    },
    {
      id: 'gretna-west-expansion',
      name: 'Gretna west expansion & outer growth edges',
      shortName: 'Gretna / West',
      neighborhoods: [
        'Gretna',
        'West Sarpy growth edges',
        'I-80 west approaches',
        'Newer HOA tracts',
        'Rural-edge acreage lots',
      ],
      housingTypes: 'Newer SFH, HOA growth, some acreage and outbuilding stock',
      challenges: [
        'Longer portal time into Bellevue and Omaha core',
        'HOA rules and longer driveways on edge lots',
        'I-80 peak freeflow and winter exposure',
      ],
      moverTips:
        'Price Gretna–core pairs portal-to-portal. Survey driveway length and outbuilding access. Avoid peak I-80 windows when flexible.',
      cityKeywords: [
        'gretna',
        'gretna nebraska',
        'west sarpy',
        'i-80',
        'ne-370',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Sarpy County moving costs',
    intro:
      'HOA rules, multi-family turns, military calendars, and corridor portal time drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'HOA gate lists & truck limits',
        detail: 'Papillion, La Vista, and Gretna tracts add soft costs and delays.',
      },
      {
        title: 'Bellevue multi-family & PCS stacking',
        detail: 'Lease turns and military windows spike demand and curb friction.',
      },
      {
        title: 'I-80 / US-75 / NE-370 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Cross-zone empty miles and winter delays',
        detail: 'Map-short pairs still bill regional time; ice rewrites schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$475–$1,750+',
        note: 'Higher with multi-unit or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,400–$4,200+',
        note: 'HOA and multi-family friction trends up',
      },
      {
        label: '3–4+ BR / HOA / cross-metro',
        value: '$2,600–$8,400+',
        note: 'Long carries and corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$108–$190+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Sarpy County',
    intro:
      'Summer family peaks, PCS windows, multi-family lease turns, and Plains winter ice reshape south-metro schedules.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear curb and reduce I-80 / NE-370 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Papillion and Gretna Saturdays early.',
      },
      {
        title: 'PCS and multi-family turn peaks',
        detail: 'Bellevue elevators and curb fill first around base calendars.',
      },
      {
        title: 'Winter ice, wind & river-approach risk',
        detail: 'Plan outdoor staging contingency and flexible start times December–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'sarpy-south-metro-offutt-growth',
      title: 'Sarpy south-metro & Offutt-adjacency module',
      intro:
        'Sarpy NE estimates fail when HOA packets, multi-family turns, PCS calendars, or I-80/US-75/NE-370 empty miles are ignored — and when crews treat this as a Douglas Omaha core rename.',
      bullets: [
        'Collect Papillion / La Vista / Gretna HOA packets early.',
        'Plan Bellevue multi-family and Offutt-adjacent timing carefully.',
        'Price I-80 / US-75 / NE-370 pairs portal-to-portal.',
        'Clarify Sarpy vs Douglas destinations on multi-county metro estimates.',
        'Verify Nebraska PSC Household Goods Mover License for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Sarpy County?',
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
              'Bellevue Public Schools, Papillion-La Vista, Gretna, Springfield Platteview, and other systems serve different addresses. Confirm zoning carefully — district lines shift across growth belts.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Nebraska Department of Education data beat ranking screenshots.',
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
              'CHI Health Midlands, Bellevue Medical Center, and Omaha-metro campuses (Nebraska Medicine, Methodist, CHI) serve Sarpy residents. Confirm networks and specialist access.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Bellevue, Papillion, La Vista, and Gretna into major campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Bellevue multi-family vs Papillion SFH vs Gretna growth',
            detail:
              'Military-adjacent rentals, family HOA tracts, and west expansion product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Gretna and Papillion new-build stock often prices differently from older Bellevue multi-family or corridor product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Bellevue / Offutt pattern',
            detail: 'Military adjacency and multi-family logistics with river-edge tradeoffs.',
          },
          {
            title: 'Papillion / La Vista pattern',
            detail: 'Family HOA growth with corridor commute math to Omaha jobs.',
          },
          {
            title: 'Gretna west pattern',
            detail: 'More space, longer portal times, and newer tract rules.',
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
              'Offutt Air Force Base and defense contractors, Omaha metro professional services, logistics, healthcare, and retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-80, US-75, and NE-370 peaks are real. Test drive peak routes between your zone and Omaha or Bellevue work anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'South-metro identity',
            detail:
              'Sarpy is Omaha south-metro growth with Offutt adjacency — not a Douglas County core rename and not Lincoln capital product.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, strong thunderstorms, and cold winters with ice and wind. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Sarpy County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Nebraska PSC Household Goods Mover License for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Sarpy County, Nebraska — official site',
        href: 'https://www.sarpy.gov/',
        external: true,
      },
      {
        label: 'City of Bellevue — official site',
        href: 'https://www.bellevue.net/',
        external: true,
      },
      {
        label: 'City of Papillion — official site',
        href: 'https://www.papillion.org/',
        external: true,
      },
      {
        label: 'Nebraska Department of Transportation — traffic',
        href: 'https://dot.nebraska.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer south-metro HOA and multi-family experience with honest I-80 / US-75 / NE-370 pricing. Verify Nebraska PSC Household Goods Mover License in-state and FMCSA interstate. This is Sarpy County NE (Bellevue–Papillion) — not a Douglas Omaha rename.',
  lastReviewed: '2026-07-24',
});
