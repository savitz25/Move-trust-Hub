import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMtPack,
  MT_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/montana/mt-shared';

/**
 * Lewis and Clark County, MT — Helena capital.
 * Distinct from Billings, Bozeman/Gallatin, Missoula, and Great Falls/Cascade regional hubs.
 */
export const lewisAndClarkCountyMtIntelligence: CountyIntelligencePack = finalizeMtPack({
  countySlug: 'lewis-and-clark',
  hubTitle: 'Lewis and Clark County Moving Intelligence Hub',
  eyebrow:
    'Lewis and Clark County, MT · Helena capital · I-15 / US-12 / US-287 logistics',
  h1: 'Moving in Lewis and Clark County: Helena Capital Access, I-15 / US-12 Logistics & Local Grids',
  heroOpener:
    'Lewis and Clark County, Montana is the Helena capital hub — downtown Helena multi-unit and Last Chance Gulch character stock, East Helena residential belts, Montana City edges, Canyon Ferry and lake-edge approaches, rural capital-county product, and West Helena Valley residential grids that rewrite “local” estimates under state government, healthcare, and valley freeflow. This is not a Billings (Yellowstone County) prairie-crossroads rename, not Bozeman/Gallatin tech-and-outdoor growth, not Missoula university-west density, and not Great Falls / Cascade military-regional defaults. A downtown walk-up on the gulch grid, an East Helena ranch, a Montana City hillside driveway, and a Canyon Ferry lake-edge lot do not share truck access or empty-mile risk. Legislative-session demand, winter ice on valley and mountain approaches, and I-15 / US-12 / US-287 freeflow are real inputs. This hub is for people moving in Lewis and Clark County — Helena capital market realities — not a renamed Billings, Bozeman, Missoula, or Great Falls page.',
  heroCredibility:
    'Written estimates & insurance certificates for intrastate Montana · MDT MCS commercial vehicle context · FMCSA for interstate · Helena I-15 / capital logistics awareness · Curated listings',
  majorCorridors: 'I-15 · US-12 · US-287 · local Helena grid',
  whatMakesDifferent: {
    title: 'What makes moving in Lewis and Clark County different',
    intro:
      'These are Lewis and Clark County / Helena capital realities — state government calendars, downtown gulch multi-unit, East Helena and West Helena Valley residential product, Montana City edges, Canyon Ferry lake approaches, and I-15 / US-12 / US-287 freeflow — not Billings, Bozeman, Missoula, or Great Falls defaults.',
    bullets: [
      {
        title: 'This is Helena capital — not Billings, Bozeman, Missoula, or Great Falls',
        detail:
          'Ignore prairie-crossroads, Gallatin growth, university-west, and military-PCS templates as default product. Lewis and Clark is Montana’s capital county with state employment anchors, valley residential belts, and mountain-edge approaches. Match estimates to Helena, East Helena, Montana City, Canyon Ferry edges, and West Helena Valley addresses.',
      },
      {
        title: 'State government and legislative-session cycles shape demand',
        detail:
          'Session months and agency relocation windows compress surveys and mid-week capacity near capital employment. Civilian “any Saturday” assumptions fail when session housing and professional relo collide with school calendars.',
      },
      {
        title: 'Downtown Helena multi-unit differs from East Helena and West Helena Valley SFH',
        detail:
          'Gulch-grid walk-ups, scarce curb, stairs, and older character stock dominate core jobs. An East Helena ranch or West Helena Valley two-story is not a downtown loft freight window.',
      },
      {
        title: 'Montana City edges and Canyon Ferry lake approaches rewrite labor',
        detail:
          'Elevation pitch, limited turnaround, long carries, lake-edge soft ground, and winter ice underprice flat-valley optimism. Survey photos beat bedroom-count quotes on edge product.',
      },
      {
        title: 'I-15, US-12, and US-287 burn portal time',
        detail:
          'Downtown ↔ East Helena, Helena ↔ Montana City, or valley ↔ Canyon Ferry pairs look local and still burn 20–55+ minutes at peak, construction, or winter weather. Price portal-to-portal honestly.',
      },
      {
        title: 'Mountain winter logistics are real',
        detail:
          'November–March ice and snow on valley arterials, Montana City approaches, and rural capital-county belts reshape outdoor labor. Prefer early starts, weather contingency, and honest delay language.',
      },
      {
        title: 'Cross-county and interstate pairs are routine',
        detail:
          'Households regularly move Lewis and Clark County ↔ Cascade, Jefferson, Broadwater, or Gallatin County, or across state lines into Idaho and the Dakotas. Written estimates and insurance cover pure in-state jobs; any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
      MT_REG_BULLET,
    ],
  },
  zonesHeading: 'Lewis and Clark County access zones',
  zonesIntro:
    'Plan by Downtown Helena multi-unit and gulch core, East Helena residential belts, Montana City edges, Canyon Ferry/lake edges, rural capital county, and West Helena Valley grids — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-helena',
      name: 'Downtown Helena, Last Chance Gulch & core multi-unit',
      shortName: 'Downtown Helena',
      neighborhoods: [
        'Downtown Helena',
        'Last Chance Gulch corridors',
        'Capitol complex edges',
        'Core multi-unit and lofts',
        'Historic character grids',
        'Commercial-adjacent residential',
      ],
      housingTypes: 'Walk-ups, loft conversions, denser multifamily, character SFH, limited elevators',
      challenges: [
        'Scarce curb staging and session-day congestion',
        'Multi-flight stairs and building packets',
        'I-15 / downtown freeflow and gulch-grid truck length',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows outside peak legislative-session congestion. Photo curb options and stair counts — downtown Helena is not East Helena ranch access.',
      cityKeywords: [
        'helena',
        'downtown helena',
        'last chance gulch',
      ],
    },
    {
      id: 'east-helena',
      name: 'East Helena residential & eastern valley belts',
      shortName: 'East Helena',
      neighborhoods: [
        'East Helena',
        'East Helena residential grids',
        'US-12 eastern corridors',
        'East-side multi-unit pockets',
        'School-corridor neighborhoods',
        'Eastern valley approaches',
      ],
      housingTypes: 'Ranch SFH, two-story stock, townhomes, multi-family limited',
      challenges: [
        'US-12 / I-15 freeflow and empty miles to downtown Helena',
        'School-calendar summer peaks',
        'Winter ice on open residential approaches',
      ],
      moverTips:
        'Clarify East Helena vs Helena vs unincorporated addresses. Price US-12 and I-15 honestly for capital-core pairs. Align with school calendars when relevant.',
      cityKeywords: [
        'east helena',
      ],
    },
    {
      id: 'montana-city-edges',
      name: 'Montana City edges & southern elevation approaches',
      shortName: 'Montana City edges',
      neighborhoods: [
        'Montana City',
        'Montana City residential belts',
        'Southern elevation approaches',
        'Hillside and custom lots',
        'I-15 southern corridor edges',
        'Rural-residential Montana City product',
      ],
      housingTypes: 'Hillside SFH, custom elevation lots, rural-residential, limited multi-unit',
      challenges: [
        'Elevation pitch, limited truck turnaround, long carries',
        'Winter ice on approaches',
        'Longer empty miles to downtown Helena core',
      ],
      moverTips:
        'Photo driveway pitch and turnaround before final pricing. Prefer early starts in winter. Price empty miles honestly — not flat downtown gulch rates.',
      cityKeywords: [
        'montana city',
      ],
    },
    {
      id: 'canyon-ferry-lake-edges',
      name: 'Canyon Ferry / lake edges & eastern recreation corridor',
      shortName: 'Canyon Ferry / lake edges',
      neighborhoods: [
        'Canyon Ferry edges',
        'Lake-edge residential and cabin-style stock',
        'Eastern recreation corridor approaches',
        'Seasonal and year-round lake product',
        'Rural lake-access driveways',
        'Canyon Ferry Road corridors',
      ],
      housingTypes: 'Lake-edge SFH, cabin-style stock, seasonal product, acreage lots',
      challenges: [
        'Long empty miles from Helena core',
        'Narrow approaches, soft ground, limited turnaround',
        'Winter ice and seasonal access constraints',
      ],
      moverTips:
        'Survey driveway width, turnaround, surface, and seasonal access early. Price empty miles and weather contingency honestly. Do not treat as downtown Helena curb jobs.',
      cityKeywords: [
        'canyon ferry',
        'canyon ferry lake',
      ],
    },
    {
      id: 'rural-capital-county',
      name: 'Rural capital county & outlying Lewis and Clark belts',
      shortName: 'Rural capital county',
      neighborhoods: [
        'Unincorporated Lewis and Clark County',
        'Lincoln edges (longer empty miles)',
        'Marysville approaches',
        'Northern and western rural belts',
        'Ag-adjacent and mountain-edge stock',
        'Outlying subdivision pockets',
      ],
      housingTypes: 'Rural SFH, acreage lots, cabin-style, manufactured, limited multi-unit',
      challenges: [
        'Long empty miles and soft-shoulder or gravel access',
        'Winter ice, elevation approaches, and limited staging',
        'I-15 / US-12 / US-287 approach freeflow',
      ],
      moverTips:
        'Survey rural driveway width, turnaround, surface, and winter access. Price empty miles and weather contingency honestly. Confirm unincorporated vs municipal addresses.',
      cityKeywords: [
        'lincoln',
        'marysville',
        'augusta',
      ],
    },
    {
      id: 'west-helena-valley',
      name: 'West Helena Valley residential & western valley grids',
      shortName: 'West Helena Valley',
      neighborhoods: [
        'West Helena Valley',
        'Western valley residential belts',
        'US-12 west corridors',
        'Valley multi-unit and SFH mix',
        'School and employment reverse-commute edges',
        'Western capital-county approaches',
      ],
      housingTypes: 'Ranch SFH, two-story stock, townhomes, multi-family pockets',
      challenges: [
        'US-12 freeflow and cross-zone empty miles to downtown',
        'School-calendar peaks and mixed driveway geometry',
        'Winter ice on open valley approaches',
      ],
      moverTips:
        'Clarify West Helena Valley vs downtown Helena vs East Helena addresses. Price arterial freeflow honestly. Align with school calendars when relevant.',
      cityKeywords: [
        'helena',
        'west helena valley',
        'helena valley',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Lewis and Clark County moving costs',
    intro:
      'Capital-session demand, downtown gulch stairs, Montana City elevation, Canyon Ferry empty miles, and I-15 / US-12 freeflow move the number more than packing skill alone — this is Helena capital logistics, not Billings, Bozeman, Missoula, or Great Falls defaults.',
    drivers: [
      {
        title: 'Legislative-session & state-employment demand spikes',
        detail:
          'Session months and agency relo windows compress crews and curb before packing skill matters.',
      },
      {
        title: 'Downtown gulch curb scarcity & walk-up labor',
        detail:
          'Character-grid multi-unit and stairs need short-truck staging and stair surveys.',
      },
      {
        title: 'Montana City pitch & Canyon Ferry empty miles',
        detail:
          'Elevation approaches and long lake-edge pairs underprice flat-valley ranch optimism.',
      },
      {
        title: 'East Helena · West Helena Valley · rural freeflow',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short — especially on I-15 and US-12.',
      },
      {
        title: 'I-15 · US-12 · US-287 congestion, weather & interstate authority',
        detail:
          'Crossroads freeflow and winter ice reshape billable time; out-of-state legs need FMCSA — pure in-state jobs need written estimates and insurance, not invented HHG certificate numbers.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,650+',
        note: 'Higher with walk-ups, session peaks, or peak I-15 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,250–$4,100+',
        note: 'Stairs, elevation, and cross-zone soft costs trend up',
      },
      {
        label: '3–4+ BR / hillside / lake-edge / rural / cross-zone',
        value: '$2,700–$8,500+',
        note: 'Montana City, Canyon Ferry, and long I-15 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, elevation, and weather scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Lewis and Clark County move',
    intro:
      'Legislative-session cycles, school calendars, summer heat, and mountain winter ice reshape access and crew availability across the Helena capital grid, Montana City edges, and Canyon Ferry approaches.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-15 / US-12 pain. Avoid month-end Fridays and heavy session-week congestion near the capitol when possible.',
      },
      {
        title: 'Peak season: late May–mid-September (plus session housing pressure)',
        detail:
          'Family school calendars and professional relo fill first. Book 2–4 weeks ahead for peak weekends; treat legislative-session housing demand as a capacity constraint near downtown multi-unit.',
      },
      {
        title: 'Mountain winter logistics',
        detail:
          'November–March ice and snow raise cancellation and staging risk on Montana City approaches, rural capital-county belts, Canyon Ferry edges, and valley arterials. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat & construction contingency',
        detail:
          'June–August heat reshape outdoor labor. Prefer early starts and weather contingency on open valley, hillside, and lake-edge stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'helena-capital-i15-logistics',
      title: 'Helena capital multi-unit, valley edges & I-15 / US-12 logistics module',
      intro:
        'Lewis and Clark County estimates fail more often on session calendars, gulch stair surveys, elevation and lake-edge access, and freeflow than on packing skill alone — and when crews treat this as Billings, Bozeman, Missoula, or Great Falls defaults.',
      bullets: [
        'Align surveys and crews with legislative-session and state-employment relo windows near capital multi-unit.',
        'Photo stair counts, curb options, and driveway pitch for downtown gulch, Montana City, and lake-edge stock.',
        'Price portal-to-portal time for any pair that rides I-15, US-12, or US-287 at peak or in winter weather.',
        'Survey East Helena, West Helena Valley, Canyon Ferry, and rural capital-county driveway access early.',
        'Clarify Helena, East Helena, Montana City, Canyon Ferry edges, West Helena Valley, Lincoln, and unincorporated addresses on every estimate.',
        'For pure in-state Montana jobs insist on written estimates and insurance certificates; verify FMCSA for any out-of-state leg. Do not invent a Montana HHG certificate number.',
      ],
    },
    {
      id: 'not-other-mt-hubs',
      title: 'Not Billings · not Bozeman · not Missoula · not Great Falls module',
      intro:
        'A single “Lewis and Clark County rate” collapses when Helena capital product is confused with other Montana hub defaults.',
      bullets: [
        'Do not price downtown Helena gulch multi-unit like Billings Heights ranch product, Bozeman loft growth, UM campus density, or Malmstrom PCS multi-unit as interchangeable defaults.',
        'State the market as Lewis and Clark County / Helena capital on every estimate.',
        'Keep Yellowstone, Gallatin, Missoula, and Cascade product out of Helena estimate assumptions unless the pair actually crosses counties.',
        'Match legislative-session peaks separately from civilian school-calendar and mid-week professional relocation windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Lewis and Clark County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Helena capital living, not Billings, Bozeman, Missoula, or Great Falls alone.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Lewis and Clark County spans Helena Public Schools, East Helena schools, and other systems serving Montana City edges, West Helena Valley, and rural belts. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Montana Office of Public Instruction data, and campus visits beat ranking screenshots alone.',
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
              'St. Peter’s Health and regional specialty campuses anchor care across Helena. Confirm insurance networks for your household; lake-edge and rural residents often face longer winter approach times.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-15, US-12, and valley freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown multi-unit and gulch character stock; East Helena residential belts; Montana City elevation product; Canyon Ferry lake-edge and cabin-style stock; rural capital-county acreage; West Helena Valley SFH and multi-unit.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by proximity to capital employment, views, and product type. Budget for session-season rental pressure and older-building repair risk downtown.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Multi-unit management and limited HOA pockets often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Helena / capital-adjacent lifestyle',
            detail:
              'Suits people prioritizing state employment, walkability, and amenities — with curb, stair, and session freeflow tradeoffs on move day.',
          },
          {
            title: 'East Helena / West Helena Valley residential',
            detail:
              'Often appeals for schools, yards, and relative value — with arterial freeflow and cross-zone portal time to capital core.',
          },
          {
            title: 'Montana City elevation living',
            detail:
              'Fits buyers chasing space and views — with driveway pitch, winter ice, and longer empty miles.',
          },
          {
            title: 'Canyon Ferry / rural capital-county living',
            detail:
              'Attracts households seeking lake access or acreage — with long portal times, seasonal access, and winter survey needs.',
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
              'State government and agencies, St. Peter’s Health, professional services, education, tourism-adjacent employers, and regional services concentrate demand across Lewis and Clark County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-15, US-12, and US-287 freeflow is real. Test peak routes before choosing solely on rent or purchase price — winter ice and session traffic change “nearby.”',
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
              'Lewis and Clark County, MT is the Helena capital hub — state employment density, gulch character grids, valley residential belts, and mountain/lake edges — not a Billings, Bozeman, Missoula, or Great Falls rename.',
          },
          {
            title: 'Climate',
            detail:
              'Mountain-valley climate with warm summers, cold winters, and ice/snow on elevation and rural approaches. Plan outdoor staging, heat, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — legislative session, school calendars, and winter weather reshape daily rhythm across the capital county grid.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Lewis and Clark County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Montana moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. Do not invent a Montana household goods certificate number.',
    items: [
      {
        label: 'Lewis and Clark County, Montana — official site',
        href: 'https://www.lccountymt.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Helena',
        href: 'https://www.helenamt.gov/',
        external: true,
        note: 'Primary municipal context — Helena capital hub',
      },
      {
        label: 'City of East Helena',
        href: 'https://www.easthelenamt.gov/',
        external: true,
        note: 'Eastern valley municipality context',
      },
      {
        label: 'MDT — Traveler Information',
        href: 'https://www.mdt.mt.gov/travinfo/',
        external: true,
        note: 'I-15 / US-12 / US-287 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with downtown Helena gulch multi-unit and stair fluency; East Helena and West Helena Valley residential surveys; Montana City elevation and winter ice honesty; Canyon Ferry lake-edge empty-mile pricing; I-15 · US-12 · US-287 freeflow awareness; capital-session demand capacity. For pure in-state Montana jobs insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. Do not invent a Montana HHG certificate. This is Lewis and Clark County / Helena capital — not Billings, not Bozeman, not Missoula, not Great Falls.',
  lastReviewed: '2026-07-24',
});
