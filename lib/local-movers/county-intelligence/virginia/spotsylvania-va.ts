import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Spotsylvania County, VA — Fredericksburg-area growth, south of NoVA on I-95
 * (not Stafford clone — different corridors, less Quantico-primary identity).
 */
export const spotsylvaniaCountyVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'spotsylvania',
  hubTitle: 'Spotsylvania County Moving Intelligence Hub',
  eyebrow: 'Spotsylvania · Fredericksburg-area growth · south of NoVA on I-95 & VA-3',
  h1: 'Moving in Spotsylvania County: Fredericksburg-Area Growth, VA-3 Corridors & I-95 Logistics',
  heroOpener:
    'Spotsylvania County is the Fredericksburg-area growth county south of the core Northern Virginia density: VA-3 (Plank Road) retail and subdivision belts, US-1 corridor product, I-95 links into the wider mid-Atlantic, and western/rural-edge parcels that do not share access with Stafford’s Quantico-facing north. A Spotsylvania Courthouse-area HOA two-story, a Massaponax multifamily unit, a Lake Anna-edge seasonal home, and a Four Mile Fork retail-adjacent townhome are not the same job. I-95, VA-3, US-1, and VA-208 rewrite estimates that treat Spotsylvania as a Stafford rename. This hub is for people moving in Spotsylvania County — not a Quantico-primary page or generic “Fredericksburg suburbs” template.',
  heroCredibility:
    'Virginia DMV household goods / motor-carrier authority for intrastate moves · FMCSA for interstate · Fredericksburg-area VA-3 & I-95 awareness · Curated listings',
  majorCorridors: 'I-95 · VA-3 · US-1 · VA-208',
  whatMakesDifferent: {
    title: 'What makes moving in Spotsylvania County different',
    intro:
      'These are Spotsylvania realities — VA-3 growth belts, Fredericksburg-edge logistics, and western rural mix — not Stafford’s Garrisonville/Quantico primary identity or Richmond-metro patterns.',
    bullets: [
      {
        title: 'VA-3 (Plank Road) is the suburban growth spine',
        detail:
          'Retail congestion, signal delay, and master-planned subdivisions concentrate along VA-3. Peak hour turns short map miles into billable portal time.',
      },
      {
        title: 'Fredericksburg-area pairs need locality precision',
        detail:
          'Spotsylvania surrounds and adjoins Fredericksburg City and borders Stafford. Many “Fredericksburg” mailing labels sit in Spotsylvania — clarify independent city vs county on every estimate.',
      },
      {
        title: 'I-95 pulls NoVA spillover without being Quantico-first',
        detail:
          'Households commute north and relocate south of denser NoVA pricing, but day-to-day military-gate logistics are less central than in northern Stafford. Still price I-95 crash delay honestly.',
      },
      {
        title: 'HOA family inventories dominate eastern growth tracts',
        detail:
          'Three- and four-bedroom two-stories, townhomes, and finished basements are common near Four Mile Fork, Massaponax, and Courthouse growth. Stair counts and HOA packets matter.',
      },
      {
        title: 'Western and Lake Anna edges are a different access job',
        detail:
          'Longer driveways, rural shoulders, seasonal homes, and VA-208 timing replace VA-3 retail curb rules. Survey turn radius and soft ground.',
      },
      {
        title: 'US-1 and Massaponax corridors mix multifamily and commercial curb',
        detail:
          'Apartment turns and retail strip traffic compete with residential staging. Month-end volume spikes are common.',
      },
      {
        title: 'Not a Stafford clone',
        detail:
          'Spotsylvania’s identity is Fredericksburg-south growth on VA-3/US-1 with western rural depth — different from Stafford’s VA-610 Garrisonville and Quantico-adjacent north belt.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Spotsylvania County access zones',
  zonesIntro:
    'Plan by VA-3/Four Mile Fork growth, Massaponax/US-1 south, Spotsylvania Courthouse/central, western VA-208/Lake Anna edges, and Fredericksburg City-line pockets — access rules diverge by corridor.',
  zones: [
    {
      id: 'va3-four-mile-fork',
      name: 'VA-3, Four Mile Fork & eastern growth belt',
      shortName: 'VA-3 / Four Mile Fork',
      neighborhoods: [
        'Four Mile Fork',
        'VA-3 / Plank Road corridor',
        'Eastern HOA subdivisions',
        'Retail-adjacent townhomes',
        'I-95 Exit 130 area residential',
      ],
      housingTypes: 'HOA SFH, townhomes, multifamily near retail',
      challenges: [
        'VA-3 peak retail congestion',
        'HOA approved hours and truck limits',
        'High Saturday family demand',
      ],
      moverTips:
        'Collect HOA packets first. Prefer mid-week early starts on VA-3. Photo driveway and gate access for cul-de-sac lots.',
      cityKeywords: ['four mile fork', 'va-3', 'plank road', 'spotsylvania east'],
    },
    {
      id: 'massaponax-us1',
      name: 'Massaponax, US-1 south & commercial multifamily',
      shortName: 'Massaponax / US-1',
      neighborhoods: [
        'Massaponax',
        'US-1 south corridor',
        'South commercial residential',
        'I-95 southern Spotsylvania exits',
      ],
      housingTypes: 'Multifamily, townhomes, newer tract SFH',
      challenges: [
        'US-1 signal and commercial congestion',
        'Month-end apartment turns',
        'I-95 south approach delay',
      ],
      moverTips:
        'Book month-end multifamily early. Confirm elevator vs stair access. Price US-1/I-95 portal time at peak.',
      cityKeywords: ['massaponax', 'us-1', 'south spotsylvania', 'i-95 south'],
    },
    {
      id: 'courthouse-central',
      name: 'Spotsylvania Courthouse & central county',
      shortName: 'Courthouse / Central',
      neighborhoods: [
        'Spotsylvania Courthouse',
        'Central subdivisions',
        'Government-adjacent housing',
        'Crossroads growth pockets',
      ],
      housingTypes: 'HOA SFH, some older stock, townhomes',
      challenges: [
        'Longer empty miles from I-95-exit yards',
        'Mix of HOA and non-HOA rules',
        'School-calendar move peaks',
      ],
      moverTips:
        'Survey routes from VA-3 and VA-208. Collect HOA documents when present. Prefer early starts for long central pairs.',
      cityKeywords: ['spotsylvania courthouse', 'courthouse', 'central spotsylvania'],
    },
    {
      id: 'west-va208-lake-anna',
      name: 'Western VA-208, rural edge & Lake Anna approaches',
      shortName: 'West / Lake Anna',
      neighborhoods: [
        'VA-208 corridor',
        'Western rural-suburban mix',
        'Lake Anna-edge parcels',
        'Seasonal and waterfront-access homes',
      ],
      housingTypes: 'Acreage SFH, seasonal homes, non-HOA rural product, some lake communities',
      challenges: [
        'Long driveways and soft shoulders',
        'Seasonal inventory and outdoor gear',
        'Distance from main staging yards',
      ],
      moverTips:
        'Survey driveway grade, turnaround, and weather-sensitive surfaces. Inventory docks, sheds, and garages carefully. Price empty miles honestly.',
      cityKeywords: ['lake anna', 'va-208', 'west spotsylvania', 'rural spotsylvania'],
    },
    {
      id: 'fred-city-line',
      name: 'Fredericksburg City-line & northern Spotsylvania edge',
      shortName: 'Fred City-line',
      neighborhoods: [
        'Fredericksburg City-line Spotsylvania',
        'Northern edge neighborhoods',
        'City-adjacent multifamily',
        'Bridge and downtown-approach corridors',
      ],
      housingTypes: 'Denser SFH, multifamily, older near-city product',
      challenges: [
        'City vs county address confusion',
        'Downtown Fredericksburg approach congestion',
        'Tighter curb than western Spotsylvania',
      ],
      moverTips:
        'Confirm independent city vs Spotsylvania County on the address. Photo curb options near denser stock. Build buffer for downtown-linked pairs.',
      cityKeywords: ['fredericksburg', 'city line', 'north spotsylvania', 'fred edge'],
    },
    {
      id: 'thornburg-south',
      name: 'Thornburg & far-south I-95 Spotsylvania',
      shortName: 'Thornburg / Far south',
      neighborhoods: [
        'Thornburg',
        'Far-south I-95 residential',
        'Logistics-edge housing',
        'South county growth tracts',
      ],
      housingTypes: 'Newer SFH, some multifamily, logistics-adjacent rentals',
      challenges: [
        'Long empty miles from northern yards',
        'I-95 freight and traveler traffic',
        'Fewer nearby crew bases on some days',
      ],
      moverTips:
        'Price staging distance honestly. Prefer early I-95 windows. Clarify destinations further south toward Caroline or Richmond-edge when relevant.',
      cityKeywords: ['thornburg', 'south spotsylvania', 'i-95 thornburg'],
    },
  ],
  costDrivers: {
    title: 'What drives Spotsylvania County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. VA-3/I-95 portal time, HOA soft costs, and west-county empty miles separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'VA-3 and I-95 congestion',
        detail: 'Growth-belt and interstate pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'HOA master-planned family inventories',
        detail: 'Gate lists, COI, stairs, and basements add labor on eastern growth product.',
      },
      {
        title: 'Western / Lake Anna empty miles',
        detail: 'Rural driveways and seasonal homes raise staging distance and truck time.',
      },
      {
        title: 'Multifamily lease-end waves on US-1',
        detail: 'Massaponax-area apartment turns create month-end crew competition.',
      },
      {
        title: 'Cross-locality Fredericksburg-area pairs',
        detail: 'Fredericksburg City, Stafford, and further NoVA destinations raise logistics complexity.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,350+', note: 'Higher with peak I-95 or stairs' },
      { label: '2–3BR townhome or modest SFH', value: '$1,250–$3,600+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / HOA / long cross-zone', value: '$2,400–$7,200+', note: 'VA-3 SFH and Lake Anna-edge pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Spotsylvania County move',
    intro: 'School calendars, summer lake traffic, HOA windows, and I-95 peaks reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear VA-3 retail congestion and reduce I-95 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Eastern growth-tract SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Lake Anna and summer recreational traffic',
        detail:
          'Western approaches see seasonal home turns and weekend traffic. Prefer mid-week for lake-edge jobs when flexible.',
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
      id: 'fred-area-va3-spotsylvania',
      title: 'Fredericksburg-area VA-3 & I-95 logistics module',
      intro:
        'Spotsylvania estimates fail more often on VA-3 portal time, city/county address lines, and west-county driveways than on packing skill alone.',
      bullets: [
        'Price portal-to-portal time for VA-3, I-95, US-1, and VA-208 pairs at peak.',
        'Collect HOA COI, gate lists, and approved hours for eastern growth tracts before the survey is final.',
        'Survey driveway grade and turnaround for western and Lake Anna-edge homes.',
        'Clarify Spotsylvania vs Fredericksburg City vs Stafford addresses on every estimate.',
        'Verify Virginia DMV household goods / motor-carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Spotsylvania County?',
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
              'Spotsylvania County Public Schools is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Four Mile Fork or Massaponax do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Eastern VA-3 growth corridors can see enrollment pressure. Ask the district about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Virginia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Mary Washington and other regional facilities serve the Fredericksburg–Spotsylvania area, with additional options toward Northern Virginia and Richmond for specialty care. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from VA-3 growth areas or western parcels to preferred campuses — corridor congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Eastern growth tracts vs western rural/lake product',
            detail:
              'Expect HOA SFH and townhomes along VA-3/US-1; larger lots, seasonal, and lake-edge product appear west. Fredericksburg City-line pockets feel denser.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor and commute premium relative to NoVA. Budget for HOA dues, vehicle commute costs, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and apartment complexes often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Spotsylvania areas fit whom',
        bullets: [
          {
            title: 'VA-3 / Four Mile Fork growth',
            detail:
              'Often appeals for newer homes, retail access, and family space — with HOA rules and Plank Road congestion.',
          },
          {
            title: 'Massaponax / US-1 south',
            detail:
              'Suits renters and value-oriented households near commercial corridors — with multifamily logistics.',
          },
          {
            title: 'West / Lake Anna edge',
            detail:
              'Attracts households seeking space or seasonal lake access — with long driveways and greater empty miles.',
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
              'Healthcare, retail, logistics, education, local government, and northbound NoVA/DC-region employment shape many household calendars. Fredericksburg-area employers matter for shorter commutes.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent. I-95 and VA-3 peaks are real for northbound workers. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Fredericksburg-area growth south of dense NoVA',
            detail:
              'Spotsylvania stacks VA-3 suburban expansion, US-1 commercial multifamily, and western rural/lake living — different from Stafford’s Quantico-facing north and from deep Fairfax density.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters. Plan outdoor staging and weather contingency as part of move-in — especially on rural and lake-edge lots.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Family-oriented growth corridors dominate the east; western parcels feel quieter and more recreational. Visit VA-3 at rush hour and Lake Anna roads on summer weekends when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Spotsylvania County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Spotsylvania County — official site',
        href: 'https://www.spotsylvania.va.us/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Spotsylvania County Public Schools',
        href: 'https://www.spotsylvania.k12.va.us/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'City of Fredericksburg',
        href: 'https://www.fredericksburgva.gov/',
        external: true,
        note: 'Adjacent independent city context',
      },
      {
        label: 'Virginia 511 traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'I-95 / VA-3 / US-1 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with VA-3 HOA fluency for eastern growth tracts; honest I-95/US-1 timing for corridor pairs; driveway and rural access experience for western/Lake Anna edges. Verify Virginia DMV household goods / motor-carrier authority for in-state moves and FMCSA for interstate legs. Not a Stafford/Quantico clone — Spotsylvania is Fredericksburg-area VA-3 growth south of dense NoVA.',
  lastReviewed: '2026-07-23',
});
