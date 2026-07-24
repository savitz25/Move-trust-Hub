import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeScPack,
  SC_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/south-carolina/sc-shared';

/**
 * Richland County, SC — Midlands capital core (not Lexington clone, not Lowcountry).
 * Columbia capital, Fort Jackson adjacency, urban + suburban mix.
 */
export const richlandCountyScIntelligence: CountyIntelligencePack = finalizeScPack({
  countySlug: 'richland',
  hubTitle: 'Richland County Moving Intelligence Hub',
  eyebrow: 'Richland · Midlands SC · Columbia capital, suburbs & Fort Jackson edge',
  h1: 'Moving in Richland County: Capital-City Access, Fort Jackson Cycles & Midlands Freeways',
  heroOpener:
    'Richland County is the Midlands capital mix: dense Columbia cores with multi-story and student-adjacent stock, established neighborhoods from Forest Acres to Shandon, master-planned and HOA growth on the northeast and southeast edges, and Fort Jackson adjacency that injects PCS and training calendars into the same crew pool as civilian leases. A downtown loft, a Rosewood bungalow, a Northeast Columbia HOA two-story, and a Fort-adjacent rental do not share truck access or portal time. I-20, I-26, I-77, US-1, and SC-277 rewrite “local” estimates that ignore peak capital traffic and cross-river pairs into Lexington County. This hub is for people moving in Richland County — not a renamed Lexington page or generic South Carolina template.',
  heroCredibility:
    'SC Class E (ORS/PSC) for intrastate moves · FMCSA for interstate · Capital-city & Fort Jackson calendar awareness · Curated listings',
  majorCorridors: 'I-20 · I-26 · I-77 · US-1 · local Columbia grid',
  whatMakesDifferent: {
    title: 'What makes moving in Richland County different',
    intro:
      'These are Richland Midlands realities — capital-city curb and campus density, Fort Jackson PCS waves, and tri-interstate logistics — not Lowcountry peninsula rules or Upstate manufacturing belts.',
    bullets: [
      {
        title: 'Columbia core access is the urban half of the job',
        detail:
          'Downtown, the Vista, University of South Carolina edges, and near-core multifamily mean limited curb, elevators or stairs, and event-day congestion. Building COIs and timed windows appear more often than rural Richland jobs.',
      },
      {
        title: 'Fort Jackson adjacency shapes demand spikes',
        detail:
          'PCS seasons, training cycles, and contractor housing create mid-month and summer clusters that compete with civilian lease-end Saturdays. Hard report dates and storage-in-transit show up regularly.',
      },
      {
        title: 'I-20, I-26, and I-77 turn short map miles into billable time',
        detail:
          'Downtown ↔ Northeast Columbia, Forest Acres ↔ Irmo-edge pairs, or any cross-river Lexington destination look local and still burn 35–70+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Urban–suburban split inside one county',
        detail:
          'Shandon and Forest Acres street grids differ from Lake Carolina or Southeast Richland HOA tracts. Survey driveway, HOA packets, and stair counts by zone — not by “Columbia” as a single access type.',
      },
      {
        title: 'State government and professional calendars',
        detail:
          'Legislative sessions, agency offices, and professional services create weekday curb pressure near the capital complex and related corridors — different from pure tourism or plant-shift patterns.',
      },
      {
        title: 'Student and academic turnover layers on top',
        detail:
          'USC and nearby campuses add August and May waves of smaller inventories and short-notice dates that fill crews alongside family SFH demand.',
      },
      {
        title: 'Richland–Lexington pairs are routine — still two counties',
        detail:
          'Households regularly move across the Congaree and into Lexington County suburbs. Clarify addresses so estimates, empty miles, and Class E vs FMCSA assumptions stay accurate when any leg leaves South Carolina.',
      },
      SC_REG_BULLET,
    ],
  },
  zonesHeading: 'Richland County access zones',
  zonesIntro:
    'Plan by downtown/Vista/campus core, Forest Acres–Shandon near-east, Northeast Columbia growth, Southeast Richland, and Fort Jackson–edge residential — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-vista-campus',
      name: 'Downtown Columbia, the Vista & campus-adjacent core',
      shortName: 'Downtown / Vista / USC',
      neighborhoods: [
        'Downtown Columbia',
        'The Vista',
        'USC / Five Points edges',
        'Olympia edges',
        'Near-capitol multifamily',
      ],
      housingTypes: 'Lofts, multi-story walk-ups, student multifamily, denser SFH',
      challenges: [
        'Limited curb staging and event / game-day congestion',
        'Stairs, elevators, and building COI rules',
        'I-26 / I-77 downtown approach traffic',
      ],
      moverTips:
        'Photo curb options and stair counts. Prefer mid-week early starts away from major campus events. Confirm elevator and COI rules in writing.',
      cityKeywords: [
        'columbia',
        'downtown columbia',
        'the vista',
        'five points',
        'usc',
        'olympia',
      ],
    },
    {
      id: 'forest-acres-shandon',
      name: 'Forest Acres, Shandon & established near-east neighborhoods',
      shortName: 'Forest Acres / Shandon',
      neighborhoods: [
        'Forest Acres',
        'Shandon',
        'Heathwood',
        'Rosewood',
        'Kilbourne edges',
      ],
      housingTypes: 'Older and mid-century SFH, some duplexes, tree-canopy lots',
      challenges: [
        'Mature trees, narrower driveways, and porch/stair carries',
        'Neighborhood street parking competition',
        'Short distance but slow last-block access',
      ],
      moverTips:
        'Survey driveway width and overhead branches. Inventory basements and porches carefully. Early starts reduce neighborhood congestion.',
      cityKeywords: [
        'forest acres',
        'shandon',
        'heathwood',
        'rosewood',
        'kilbourne',
      ],
    },
    {
      id: 'northeast-columbia',
      name: 'Northeast Columbia, Sandhills & SC-277 growth',
      shortName: 'NE Columbia',
      neighborhoods: [
        'Northeast Columbia',
        'Sandhills',
        'Clemson Road corridor',
        'Lake Carolina',
        'Blythewood edges',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, retail-adjacent multifamily',
      challenges: [
        'SC-277 and I-77 peak congestion',
        'HOA gate lists and approved hours',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Price SC-277 / I-77 pairs honestly. Book peak Saturdays early for larger SFH inventories.',
      cityKeywords: [
        'northeast columbia',
        'sandhills',
        'clemson road',
        'lake carolina',
        'blythewood',
      ],
    },
    {
      id: 'southeast-richland',
      name: 'Southeast Richland & Garners Ferry corridors',
      shortName: 'SE Richland',
      neighborhoods: [
        'Southeast Richland',
        'Garners Ferry corridor',
        'Hopkins edges',
        'Lower Richland pockets',
      ],
      housingTypes: 'Suburban SFH, some rural-edge lots, multifamily along commercial strips',
      challenges: [
        'Longer empty miles from downtown staging',
        'Mix of HOA tracts and rural driveways',
        'US-76 / Garners Ferry timing into the core',
      ],
      moverTips:
        'Price empty miles and corridor congestion. Share driveway photos on rural-edge parcels. Clarify HOA vs open-road access early.',
      cityKeywords: [
        'southeast richland',
        'garners ferry',
        'hopkins',
        'lower richland',
      ],
    },
    {
      id: 'fort-jackson-edge',
      name: 'Fort Jackson–adjacent residential & workforce housing',
      shortName: 'Fort Jackson edge',
      neighborhoods: [
        'Fort Jackson–adjacent rentals',
        'Leesburg Road corridors',
        'Military-family multifamily pockets',
      ],
      housingTypes: 'Workforce multifamily, modest SFH, contractor and PCS-heavy rentals',
      challenges: [
        'PCS and training-cycle demand spikes',
        'Short notice and hard report dates',
        'Base-access rules when any leg involves on-post housing',
      ],
      moverTips:
        'Ask about report dates and storage-in-transit. Confirm whether either address requires base access or escort rules. Build flexibility for order changes.',
      cityKeywords: [
        'fort jackson',
        'leesburg road',
        'military',
        'pcs',
        'richland military',
      ],
    },
    {
      id: 'irmo-edge-west',
      name: 'Irmo-edge / Lake Murray approach (Richland pockets)',
      shortName: 'Irmo edge',
      neighborhoods: [
        'Irmo-edge Richland addresses',
        'St. Andrews corridors',
        'Lake Murray approach pockets',
      ],
      housingTypes: 'HOA SFH, townhomes, lake-adjacent product',
      challenges: [
        'I-26 peak congestion on cross-river pairs',
        'County-line confusion with Lexington addresses',
        'HOA truck and hour limits on newer tracts',
      ],
      moverTips:
        'Confirm exact county line on every estimate. Price I-26 portal time. Collect HOA COI requirements with the survey.',
      cityKeywords: ['irmo', 'st andrews', 'lake murray', 'i-26 richland'],
    },
  ],
  costDrivers: {
    title: 'What drives Richland County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Core curb friction, freeway portal time, HOA soft costs, and PCS timing separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Downtown curb, stairs & multifamily elevators',
        detail: 'Near-core staging friction and multi-story access add labor before packing skill matters.',
      },
      {
        title: 'I-20 / I-26 / I-77 / SC-277 congestion',
        detail: 'Cross-zone and cross-river pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'HOA master-planned rules (NE and growth edges)',
        detail: 'Gate lists, COI, and weekday-only windows push demand into peak pricing.',
      },
      {
        title: 'Fort Jackson PCS and training cycles',
        detail: 'Hard dates and clustered demand raise mid-week and summer crew competition.',
      },
      {
        title: 'Cross-county Midlands empty miles',
        detail: 'Lexington destinations and outer Richland parcels raise staging distance from Columbia yards.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,200+', note: 'Higher with downtown stairs or peak freeways' },
      { label: '2–3BR condo or modest SFH', value: '$1,150–$3,300+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / HOA / cross-zone', value: '$2,100–$6,200+', note: 'NE SFH and long I-26 pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$165+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Richland County move',
    intro: 'School calendars, PCS cycles, heat/humidity, campus turnover, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear core curb space and reduce I-20 / I-26 / I-77 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Northeast and suburban SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'PCS and training-related clusters',
        detail:
          'Fort Jackson calendars create mid-week and summer spikes. Confirm report dates and storage needs early.',
      },
      {
        title: 'Campus May and August waves',
        detail:
          'Student multifamily turnover near USC adds short inventories and competitive crew days. Mid-month weekdays can be easier than lease-end Saturdays.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans.',
      },
    ],
  },
  specialized: [
    {
      id: 'capital-fort-jackson',
      title: 'Capital-city access & Fort Jackson PCS module',
      intro:
        'Richland estimates fail more often on core curb rules, freeway portal time, and military calendars than on packing skill alone.',
      bullets: [
        'Photo downtown / Vista curb options and stair or elevator counts before pricing is final.',
        'Price portal-to-portal time for any pair that rides I-20, I-26, I-77, or SC-277 at peak.',
        'Ask military-adjacent customers about report dates, orders flexibility, and storage-in-transit.',
        'Collect HOA COI and gate lists for Northeast Columbia and growth-edge tracts early.',
        'Clarify Richland vs Lexington addresses on every cross-river estimate.',
        'Verify SC Class E (ORS) for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Richland County?',
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
              'Richland School District One, Richland School District Two, and other local systems cover different address bands. Assignment is address-based — marketing names like Northeast Columbia do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Northeast and some outer growth corridors can see enrollment pressure. Confirm district boundaries and any choice or magnet options when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, South Carolina Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Prisma Health and other regional facilities serve Columbia and Richland corridors, with additional specialty options metro-wide. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Northeast Columbia or Fort-edge housing to preferred campuses — freeway congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Urban denser product vs suburban tracts',
            detail:
              'Expect lofts, multifamily, and older street-grid SFH near downtown and campus; larger HOA tracts dominate much of Northeast Columbia and outer growth edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor and school assignment. Budget for HOA dues, older-home repair risk, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and loft or apartment buildings often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Richland areas fit whom',
        bullets: [
          {
            title: 'Downtown / Vista / campus urban lifestyle',
            detail:
              'Suits people prioritizing walkable amenities and shorter in-city commutes — with parking and stair/elevator tradeoffs on move day.',
          },
          {
            title: 'Forest Acres / Shandon established neighborhoods',
            detail:
              'Often appeals for tree cover and near-core convenience — with older-home access constraints.',
          },
          {
            title: 'Northeast Columbia growth suburbs',
            detail:
              'Attracts households seeking newer homes and retail access — with HOA logistics and SC-277 / I-77 commute realism.',
          },
          {
            title: 'Fort Jackson–adjacent workforce housing',
            detail:
              'Fits military and contractor calendars — with PCS timing and base-access considerations when applicable.',
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
              'State government, healthcare, education, professional services, logistics, and Fort Jackson–related activity concentrate in Columbia and along major freeway nodes.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent outside the densest core blocks. I-20, I-26, I-77, and SC-277 peaks are real. Test drive peak routes before choosing solely on purchase price — including cross-river Lexington jobs.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Richlands',
            detail:
              'Richland stacks a capital urban core, established near-east neighborhoods, HOA growth suburbs, and military-edge housing — different from coastal tourism patterns or pure Upstate industrial fabric.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining, arts, and campus energy concentrate near downtown; suburban corridors feel more family- and retail-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Richland County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify SC Class E / ORS for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Richland County — official site',
        href: 'https://www.richlandcountysc.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Columbia',
        href: 'https://www.columbiasc.gov/',
        external: true,
      },
      {
        label: 'Richland School District One',
        href: 'https://www.richlandone.org/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Richland School District Two',
        href: 'https://www.richland2.org/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'SCDOT 511 traffic',
        href: 'https://www.511sc.org/',
        external: true,
        note: 'I-20 / I-26 / I-77 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with downtown curb and multifamily experience for Vista/campus stock; HOA fluency for Northeast Columbia product; honest I-20/I-26/I-77 timing and PCS calendar awareness for Fort-edge pairs. Verify SC Class E (ORS) for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
