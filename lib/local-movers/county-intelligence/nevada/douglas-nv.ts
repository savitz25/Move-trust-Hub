import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNvPack,
  NV_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/nevada/nv-shared';

/**
 * Douglas County, NV — Minden–Gardnerville / Tahoe NV approaches.
 * NOT Las Vegas Valley, NOT Reno industrial core, NOT Carson City capital grid alone.
 */
export const douglasCountyNvIntelligence: CountyIntelligencePack = finalizeNvPack({
  countySlug: 'douglas',
  hubTitle: 'Douglas County Moving Intelligence Hub',
  eyebrow:
    'Douglas County, NV · Minden–Gardnerville valley & Tahoe NV approaches',
  h1: 'Moving in Douglas County: Minden–Gardnerville Access, Carson Valley Product & Tahoe NV Approaches',
  heroOpener:
    'Douglas County, Nevada is not a Las Vegas Valley HOA-and-heat clone and not a Reno industrial freeflow template — it is Carson Valley living around Minden and Gardnerville, Genoa and foothill product, Topaz and rural larger-lot edges, and Lake Tahoe Nevada approaches (Zephyr Cove, Stateline edges, Kingsbury) where grades, tourism, and CA-border authority rewrite “local” estimates. A valley ranch driveway, a Genoa foothill turnaround, a Tahoe multi-unit stair stack, and a rural private-road carry do not share truck access or crew skill. US-395, US-50, and NV-207 freeflow connect capital, Reno, and Tahoe pairs. This hub is for people moving in Douglas County, NV — not a renamed Clark or Washoe page.',
  heroCredibility:
    'NTA household goods CPCN for intrastate · FMCSA for interstate (including CA Tahoe) · Carson Valley & Tahoe approach logistics awareness · Curated listings',
  majorCorridors: 'US-395 · US-50 · NV-207/Tahoe approaches',
  whatMakesDifferent: {
    title: 'What makes moving in Douglas County different',
    intro:
      'These are Carson Valley and Tahoe Nevada realities — valley ranch product, foothill grades, and mountain tourism access — not Strip-adjacent elevators and not Sparks warehouse freeflow.',
    bullets: [
      {
        title: 'Minden–Gardnerville valley product is the volume core',
        detail:
          'Ranch SFH, town centers, and valley HOA pockets dominate everyday jobs. Long driveway carries and agricultural-edge staging differ from capital multi-unit or Reno walk-ups.',
      },
      {
        title: 'Tahoe NV approaches are a different job than valley ranch moves',
        detail:
          'Zephyr Cove, Stateline edges, Kingsbury Grade approaches, and lake-adjacent multi-unit stack steep grades, truck limits, tourism curb, and seasonal second-home inventory that Minden cul-de-sacs do not share.',
      },
      {
        title: 'CA-border Tahoe pairs are routine interstate jobs',
        detail:
          'Households regularly move Douglas ↔ South Lake Tahoe CA or broader California. An NTA household goods CPCN alone does not authorize California delivery — verify FMCSA USDOT/MC when any leg leaves Nevada.',
      },
      {
        title: 'US-395, US-50 & NV-207 freeflow rewrite portal time',
        detail:
          'Minden ↔ Carson City, Gardnerville ↔ Reno approaches, or valley ↔ Tahoe pairs look short and still burn billable minutes — longer with tourism peaks and winter weather. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not Clark County and not Washoe industrial core',
        detail:
          'Ignore Strip COI heat scripts and Sparks warehouse templates. Douglas mixes valley agriculture-edge living with mountain tourism product under one county label.',
      },
      {
        title: 'Four-season mountain and valley weather is real',
        detail:
          'Summer heat on open valley carries, winter ice and snow on Tahoe approaches, and wind reshape labor and cancellation soft costs. Vegas-only heat notes miss the mountain stack.',
      },
      NV_REG_BULLET,
    ],
  },
  zonesHeading: 'Douglas County access zones',
  zonesIntro:
    'Plan by Minden–Gardnerville valley core, Genoa / foothill product, Tahoe Nevada shoreline approaches, Topaz / rural larger lots, and north corridor links toward Carson City — access rules cluster by elevation and tourism more than ZIP alone.',
  zones: [
    {
      id: 'minden-gardnerville',
      name: 'Minden, Gardnerville & Carson Valley core',
      shortName: 'Minden / Gardnerville',
      neighborhoods: [
        'Minden',
        'Gardnerville',
        'Valley town-center edges',
        'US-395 corridor residential',
        'Carson Valley HOA pockets',
        'Agricultural-edge residential',
      ],
      housingTypes: 'Ranch SFH, townhomes, multi-unit pockets, HOA villages, agricultural-edge homes',
      challenges: [
        'Long driveway carries and mixed curb product',
        'US-395 freeflow at peak',
        'HOA packets in planned pockets',
      ],
      moverTips:
        'Photo driveways and turnarounds. Collect HOA rules early where applicable. Prefer mid-week early starts. Clarify Minden vs Gardnerville addresses on the estimate.',
      cityKeywords: [
        'minden',
        'gardnerville',
        'carson valley',
      ],
    },
    {
      id: 'genoa-foothills',
      name: 'Genoa, foothill estates & west valley grades',
      shortName: 'Genoa / foothills',
      neighborhoods: [
        'Genoa',
        'Genoa foothill edges',
        'West valley hillside product',
        'Jack’s Valley edges',
        'Foothill custom homes',
        'Private-road pockets',
      ],
      housingTypes: 'Custom SFH, foothill estates, limited multi-unit, private-road product',
      challenges: [
        'Driveway grade, turnaround, and truck-length limits',
        'Private-road and gate access',
        'Longer empty miles vs valley town centers',
      ],
      moverTips:
        'Survey grades with photos. Confirm gate codes and private-road rules. Inventory high-value items carefully on larger foothill homes.',
      cityKeywords: [
        'genoa',
        'jacks valley',
        'jack\'s valley',
        'douglas',
      ],
    },
    {
      id: 'tahoe-nv-approaches',
      name: 'Zephyr Cove, Stateline edges, Kingsbury & Tahoe NV approaches',
      shortName: 'Tahoe NV',
      neighborhoods: [
        'Zephyr Cove',
        'Stateline edges (NV)',
        'Kingsbury Grade approaches',
        'Round Hill edges',
        'Lake Tahoe Nevada shoreline pockets',
        'Mountain condo multi-unit',
      ],
      housingTypes: 'Mountain SFH, cabins, condo multi-unit, seasonal second homes',
      challenges: [
        'Steep grades, narrow roads, and truck-length limits',
        'Tourism curb shrinkage and seasonal traffic',
        'Winter snow/ice and CA-side interstate pairs',
      ],
      moverTips:
        'Survey grades and turnarounds with photos. Prefer non-peak tourist windows when flexible. Treat any CA unload as FMCSA interstate. Build winter contingency into every mountain estimate.',
      cityKeywords: [
        'zephyr cove',
        'stateline',
        'kingsbury',
        'round hill',
        'tahoe',
      ],
    },
    {
      id: 'topaz-rural-south',
      name: 'Topaz Lake edges, south valley & rural larger-lot product',
      shortName: 'Topaz / rural south',
      neighborhoods: [
        'Topaz Lake edges',
        'South Carson Valley rural',
        'Larger-lot ranch product',
        'Agricultural residential edges',
        'Remote private-road pockets',
      ],
      housingTypes: 'Ranch SFH, multi-acre lots, limited multi-unit, rural custom homes',
      challenges: [
        'Extreme empty miles vs Tahoe or Reno pairs',
        'Long driveway carries and limited staging',
        'Dust, wind, and weather exposure',
      ],
      moverTips:
        'Never price Topaz ↔ Tahoe as a short local hop. Confirm driveway photos and turnarounds. Build weather and distance buffer into the estimate.',
      cityKeywords: [
        'topaz',
        'topaz lake',
        'gardnerville',
      ],
    },
    {
      id: 'north-carson-line',
      name: 'North corridor, Indian Hills edges & Carson City line approaches',
      shortName: 'North / Carson line',
      neighborhoods: [
        'Indian Hills edges',
        'North Douglas corridor',
        'US-395 north residential',
        'Carson City line approaches',
        'Johnson Lane edges',
        'Valley north HOA pockets',
      ],
      housingTypes: 'SFH, HOA pockets, multi-unit edges, corridor residential',
      challenges: [
        'County-line confusion near Carson City',
        'US-395 freeflow for capital and Reno pairs',
        'Mixed HOA and open-street product',
      ],
      moverTips:
        'Clarify Douglas vs Carson City destinations on every estimate. Price US-395 honestly. Collect HOA packets early where planned villages apply.',
      cityKeywords: [
        'indian hills',
        'johnson lane',
        'douglas',
        'minden',
      ],
    },
    {
      id: 'east-valley-open',
      name: 'East Carson Valley open range & larger-lot belts',
      shortName: 'East valley',
      neighborhoods: [
        'East valley larger lots',
        'Open-range residential edges',
        'US-395 east approaches',
        'Agricultural buffer residential',
        'Rural subdivision pockets',
      ],
      housingTypes: 'Larger-lot SFH, ranch stock, limited multi-unit',
      challenges: [
        'Long carries from street to home',
        'Limited curb staging width',
        'Heat and wind exposure on open approaches',
      ],
      moverTips:
        'Confirm driveway length and turnaround space. Prefer early starts in summer heat. Inventory carefully on larger ranch homes.',
      cityKeywords: [
        'gardnerville',
        'minden',
        'carson valley',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Douglas County moving costs',
    intro:
      'Access product, mountain grades, tourism freeflow, and US-395 / US-50 portal time move the number more than packing skill alone — this is Carson Valley and Tahoe NV logistics, not Las Vegas Valley pricing.',
    drivers: [
      {
        title: 'Long driveway carries & valley ranch product',
        detail:
          'Minden–Gardnerville and rural larger lots add labor that compact multi-unit jobs do not share.',
      },
      {
        title: 'Tahoe grades, truck limits & tourism curb',
        detail:
          'Mountain approaches rewrite jobs that look simple on a valley map.',
      },
      {
        title: 'US-395 · US-50 · NV-207 freeflow',
        detail:
          'Valley ↔ Tahoe and capital/Reno pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Seasonal second-home & tourism demand',
        detail:
          'Peak lake weekends and seasonal turnover raise premiums and crew scarcity.',
      },
      {
        title: 'CA-border & cross-county empty miles',
        detail:
          'South Lake Tahoe CA, Carson City, and Washoe destinations raise staging distance and FMCSA complexity when leaving Nevada.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple valley access)',
        value: '$450–$1,800+',
        note: 'Higher with mountain approaches or peak tourism windows',
      },
      {
        label: '2–3BR SFH, condo, or mid-size home',
        value: '$1,400–$4,400+',
        note: 'Grades, long carries, and freeflow soft costs trend up',
      },
      {
        label: '3–4+ BR / Tahoe / rural long approach',
        value: '$2,800–$9,000+',
        note: 'Mountain grades and long empty-mile pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$210+/hr',
        note: 'Portal-to-portal; packing, grades, and distance scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Douglas County move',
    intro:
      'School calendars, summer valley heat, Tahoe tourism peaks, winter mountain snow, and corridor freeflow reshape access and crew availability across Carson Valley and lake approaches.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear valley curb and reduce US-395 / US-50 pain. On Tahoe approaches, avoid peak tourist weekends when flexible.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family calendars, summer heat, and lake tourism fill first. Book 2–4 weeks ahead for peak weekends and mountain access.',
      },
      {
        title: 'Winter snow & ice on mountain approaches',
        detail:
          'December–March adds snow risk on Kingsbury and lake roads plus icy valley stoops. Prefer flexible dates and contingency for weather holds.',
      },
      {
        title: 'Shoulder seasons for Tahoe second homes',
        detail:
          'Spring and fall can ease tourism curb but still compete with seasonal turnover. Confirm HOA and condo windows early for multi-unit lake product.',
      },
    ],
  },
  specialized: [
    {
      id: 'douglas-valley-tahoe',
      title: 'Douglas County valley ranch & Tahoe approach logistics module',
      intro:
        'Douglas estimates fail more often on driveway surveys, mountain grades, tourism freeflow, and interstate authority than on packing skill alone.',
      bullets: [
        'Photo driveway length, grades, and turnarounds before the survey is final.',
        'Treat Tahoe NV multi-unit and cabin product as grade- and tourism-first work — not valley ranch clones.',
        'Price portal-to-portal time for any pair that rides US-395, US-50, or NV-207 at peak.',
        'Build weather contingency for winter mountain approaches and summer open-valley heat.',
        'Clarify Minden, Gardnerville, Genoa, Tahoe NV, and county-line addresses on every estimate.',
        'For in-state jobs verify NTA household goods CPCN; verify FMCSA for any out-of-state leg — especially CA Tahoe pairs.',
      ],
    },
    {
      id: 'not-vegas-not-reno-core',
      title: 'Not Las Vegas Valley · not Reno industrial core module',
      intro:
        'A single “Nevada rate” collapses when Carson Valley and Tahoe NV product is confused with Strip-adjacent elevators or Sparks industrial freeflow.',
      bullets: [
        'Do not price Kingsbury grades like Summerlin HOA gates or like Sparks warehouse curb.',
        'Keep Douglas vs Carson City vs Washoe county lines clear on every multi-address estimate.',
        'Match tourism peaks separately from valley school-calendar waves.',
        'Treat California legs as interstate authority problems — NTA CPCN alone is not enough for CA delivery.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Douglas County?',
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
              'Douglas County School District serves Minden, Gardnerville, Genoa, Tahoe Nevada communities, and rural areas with address-based assignment. Marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive — especially between valley and mountain communities. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Nevada Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Carson Valley Medical Center and related regional care serve the valley; many households also use Carson City and Reno systems for specialty access. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — US-395 freeflow and mountain weather change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect Minden–Gardnerville ranch and HOA product; Genoa foothill estates; Tahoe NV mountain and condo stock; Topaz and rural larger lots.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by elevation and lake proximity. Budget for HOA/condo dues, winter access costs, and larger-lot maintenance where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, and deposits — especially at lake multi-unit product. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Minden / Gardnerville valley living',
            detail:
              'Suits households seeking Carson Valley space, schools, and town amenities — with driveway logistics and US-395 freeflow.',
          },
          {
            title: 'Genoa / foothill character',
            detail:
              'Often appeals for historic and hillside product — with grades, private roads, and careful access planning.',
          },
          {
            title: 'Tahoe NV shoreline / mountain living',
            detail:
              'Attracts second-home and lake-lifestyle households — with tourism, weather, and CA-border tradeoffs.',
          },
          {
            title: 'Rural / Topaz larger-lot living',
            detail:
              'Fits buyers chasing space and quiet — with long empty miles and limited nearby services.',
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
              'Local services, tourism/hospitality at the lake, agriculture-adjacent work, healthcare, education, and reverse-commutes to Carson City or Reno concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak US-395 freeflow and mountain weather are real. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'Douglas County stacks Carson Valley ranch living with Tahoe Nevada mountain tourism — different from Las Vegas Valley sprawl and from Reno/Sparks industrial scale.',
          },
          {
            title: 'Climate',
            detail:
              'Valley heat and mountain snow share one county. Plan outdoor staging, heat, ice, and elevation contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit valley and lake zones at peak and off-peak times when deciding — tourism calendars and school waves reshape daily rhythm differently by elevation.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Douglas County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify NTA household goods CPCN status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Douglas County, Nevada — official site',
        href: 'https://www.douglascountynv.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'Town of Minden',
        href: 'https://www.townofminden.com/',
        external: true,
        note: 'Valley town-center context',
      },
      {
        label: 'NDOT — traveler information',
        href: 'https://nvroads.com/',
        external: true,
        note: 'US-395 / US-50 / NV-207 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with long-driveway and ranch fluency for Minden–Gardnerville product; mountain-grade and tourism discipline for Tahoe NV approaches; honest US-395 · US-50 · NV-207 timing for valley–lake and capital pairs. Verify Nevada Transportation Authority (NTA) household goods CPCN for intrastate moves and FMCSA for interstate legs (including CA Tahoe pairs) before deposits.',
  lastReviewed: '2026-07-24',
});
