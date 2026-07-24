import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Virginia Beach (independent city), VA — coastal tourism + oceanfront access + military families.
 * Not Chesapeake suburban Greenbrier growth; not Norfolk naval/port urban density.
 */
export const virginiaBeachCityVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'virginia-beach',
  hubTitle: 'Virginia Beach Moving Intelligence Hub',
  eyebrow: 'Virginia Beach · oceanfront tourism, military families & Southside coastal logistics',
  h1: 'Moving in Virginia Beach: Oceanfront Access, Military Families & Coastal Corridor Logistics',
  heroOpener:
    'Virginia Beach is a Southside coastal market where oceanfront tourism, military family turnover, and long east–west corridors collide on the same load day. A boardwalk-adjacent condo with elevator and summer curb bans, a Shore Drive townhome, a Great Neck HOA two-story, a Kempsville family ranch, and a NAS Oceana–adjacent rental do not share truck access, COI rules, or calendar pressure. I-264, I-64, VA-44 links, Shore Drive, and Virginia Beach Boulevard rewrite “local” estimates that ignore tourist peaks, base report dates, and humid coastal staging. This hub is for people moving in Virginia Beach — not a renamed Chesapeake Greenbrier page or Norfolk tunnel/port clone.',
  heroCredibility:
    'Virginia DMV Motor Carrier / Household Goods for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-264 · I-64 · VA-44 links · Shore Drive · Virginia Beach Blvd',
  whatMakesDifferent: {
    title: 'What makes moving in Virginia Beach different',
    intro:
      'These are Virginia Beach coastal realities — oceanfront tourism curb limits, military family calendars, and east–west freeway friction — not Chesapeake suburban tract rules or Norfolk downtown tunnel density.',
    bullets: [
      {
        title: 'Oceanfront and resort-strip curb is the job',
        detail:
          'Atlantic Avenue / Pacific Avenue blocks, boardwalk-adjacent condos, and seasonal event windows mean limited legal truck length, elevator buildings, and long carries. Summer tourism multiplies curb competition that inland neighborhoods never see.',
      },
      {
        title: 'Military family and PCS calendars reshape demand',
        detail:
          'NAS Oceana and Joint Expeditionary Base Little Creek–Fort Story drive report-date moves, lease-end waves, and mid-week peaks. Civilian Saturday preference often loses to order-driven timelines.',
      },
      {
        title: 'I-264 and I-64 turn short map miles into portal time',
        detail:
          'Oceanfront ↔ Kempsville, Town Center ↔ Great Neck, or Shore Drive ↔ Princess Anne pairs look local and still burn 35–70+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Coastal humidity, wind, and storm risk affect staging',
        detail:
          'Open carries near the oceanfront need tarp discipline; hurricane-season contingency language matters more than inland Southside jobs. Protect cardboard, mattresses, and electronics.',
      },
      {
        title: 'HOA villages and elevator stock mix across the city',
        detail:
          'Great Neck, Red Mill, Princess Anne growth tracts, and mid-rise/high-rise product often require COI, gate lists, truck-length limits, and approved hours. Collect packets early.',
      },
      {
        title: 'Tourism season is not a suburban calendar',
        detail:
          'Memorial Day through Labor Day fills resort-area curb, hotel guest traffic, and evening congestion on Shore Drive and Virginia Beach Boulevard. Early mid-week starts win when flexible.',
      },
      {
        title: 'Southside multi-city pairs are routine',
        detail:
          'Households regularly move Virginia Beach ↔ Norfolk, Chesapeake, or Portsmouth. Clarify independent-city addresses so Virginia DMV distance frameworks and FMCSA interstate assumptions stay accurate when any leg leaves Virginia.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Virginia Beach access zones',
  zonesIntro:
    'Plan by oceanfront/resort strip, Shore Drive north, Town Center / central corridors, Kempsville–Great Neck suburbs, Princess Anne south growth, and military-adjacent edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'oceanfront-resort',
      name: 'Oceanfront, boardwalk & resort-strip stock',
      shortName: 'Oceanfront / Resort',
      neighborhoods: [
        'Oceanfront / Atlantic–Pacific corridors',
        'Boardwalk-adjacent condos',
        'Resort-area multifamily',
        'Rudee Inlet edges',
      ],
      housingTypes: 'High-rise and mid-rise condos, elevators, denser multifamily, limited street parking',
      challenges: [
        'Tourism-season curb bans and long carries',
        'Elevator reservations and building COIs',
        'Summer congestion on Atlantic / Pacific approaches',
      ],
      moverTips:
        'Photo curb options and elevator doors. Prefer mid-week early starts outside peak tourist weekends. Confirm building move hours and truck length in writing.',
      cityKeywords: [
        'oceanfront',
        'virginia beach oceanfront',
        'atlantic avenue',
        'pacific avenue',
        'boardwalk',
        'rudee',
      ],
    },
    {
      id: 'shore-drive-north',
      name: 'Shore Drive, Lesner Bridge approaches & north coastal',
      shortName: 'Shore Drive / North',
      neighborhoods: [
        'Shore Drive corridor',
        'Lesner Bridge approaches',
        'North End edges',
        'Little Creek–adjacent residential',
      ],
      housingTypes: 'Townhomes, condos, coastal SFH, military-workforce rentals',
      challenges: [
        'Shore Drive peak and weekend tourism traffic',
        'Bridge approach timing into Norfolk pairs',
        'Wind and salt exposure on open carries',
      ],
      moverTips:
        'Build Shore Drive buffer for any Norfolk-linked pair. Survey driveway length on waterfront-edge lots. Protect soft goods from humidity.',
      cityKeywords: ['shore drive', 'lesner', 'north end', 'little creek', 'fort story'],
    },
    {
      id: 'town-center-central',
      name: 'Town Center, Virginia Beach Blvd & central corridors',
      shortName: 'Town Center / Central',
      neighborhoods: [
        'Town Center',
        'Virginia Beach Boulevard corridors',
        'Pembroke edges',
        'Central multifamily strips',
      ],
      housingTypes: 'Mid-rise, townhomes, denser SFH, office-adjacent multifamily',
      challenges: [
        'I-264 / Boulevard retail congestion',
        'Mixed elevator and walk-up stock',
        'Business-district loading competition',
      ],
      moverTips:
        'Confirm loading dock vs curb rules for mid-rise product. Price I-264 peak honestly for oceanfront or south-end pairs.',
      cityKeywords: ['town center', 'pembroke', 'virginia beach boulevard', 'central virginia beach'],
    },
    {
      id: 'kempsville-great-neck',
      name: 'Kempsville, Great Neck & established suburban west/central',
      shortName: 'Kempsville / Great Neck',
      neighborhoods: [
        'Kempsville',
        'Great Neck',
        'London Bridge edges',
        'Established HOA subdivisions',
      ],
      housingTypes: 'HOA SFH, townhomes, larger family inventories',
      challenges: [
        'HOA approved hours and truck limits',
        'School-calendar Saturday demand May–August',
        'I-264 / Independence approaches at peak',
      ],
      moverTips:
        'Collect HOA packets first. Book peak family Saturdays 2–4 weeks ahead. Share driveway and gate photos.',
      cityKeywords: ['kempsville', 'great neck', 'london bridge', 'independence'],
    },
    {
      id: 'princess-anne-south',
      name: 'Princess Anne, Red Mill & south growth corridors',
      shortName: 'Princess Anne / South',
      neighborhoods: [
        'Princess Anne',
        'Red Mill',
        'Sandbridge approaches',
        'Southern growth tracts',
      ],
      housingTypes: 'Newer HOA SFH, townhomes, some coastal-edge product',
      challenges: [
        'Longer empty miles from oceanfront staging',
        'HOA gate lists on newer villages',
        'Sandbridge / south-end weekend tourism pulses',
      ],
      moverTips:
        'Do not price south-end pairs as short oceanfront hops. Confirm HOA COI and truck size early. Build time for Virginia Beach Blvd / I-264 links.',
      cityKeywords: ['princess anne', 'red mill', 'sandbridge', 'southern virginia beach'],
    },
    {
      id: 'military-adjacent',
      name: 'NAS Oceana & military-adjacent residential edges',
      shortName: 'Military-adjacent',
      neighborhoods: [
        'Oceana-adjacent rentals',
        'Base-housing-edge multifamily',
        'Military-workforce corridors',
      ],
      housingTypes: 'Multifamily, townhomes, modest SFH, PCS-oriented rentals',
      challenges: [
        'PCS lease-end waves and hard report dates',
        'Access/ID rules near installation edges',
        'Short-notice schedule changes',
      ],
      moverTips:
        'Align surveys to orders when possible. Ask about storage-in-transit and hard report-to-duty dates. Clarify HHG vs local self-hire scope.',
      cityKeywords: ['oceana', 'nas oceana', 'military', 'pcs', 'base housing'],
    },
  ],
  costDrivers: {
    title: 'What drives Virginia Beach moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Oceanfront curb friction, HOA soft costs, military timing, and I-264 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Oceanfront elevators, stairs & tourism curb',
        detail: 'Resort-strip staging friction and multi-story access add labor before packing skill matters.',
      },
      {
        title: 'I-264 / I-64 / Shore Drive congestion',
        detail: 'Cross-city and Southside pairs burn portal-to-portal hours at peak and tourist peaks.',
      },
      {
        title: 'HOA master-planned rules',
        detail: 'Gate lists, COI, and weekday-only windows push demand into peak pricing.',
      },
      {
        title: 'PCS and military calendar spikes',
        detail: 'Report dates and lease-end clusters create mid-week competition for crews.',
      },
      {
        title: 'Coastal weather protection & contingency',
        detail: 'Tarps, humidity protection, and storm reschedule risk affect total cost exposure.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,350+',
        note: 'Higher with oceanfront elevators or peak tourist weekends',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,250–$3,600+',
        note: 'HOA and elevator soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / oceanfront / cross-zone',
        value: '$2,300–$7,000+',
        note: 'Resort-strip high-rises and long I-264 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$175+/hr',
        note: 'Portal-to-portal; packing scales up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Virginia Beach move',
    intro:
      'Tourism peaks, military PCS windows, school calendars, heat/humidity, and hurricane season reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear oceanfront and Shore Drive curb space. Avoid month-end Fridays when leases and PCS dates collide.',
      },
      {
        title: 'Tourism peak: Memorial Day–Labor Day',
        detail:
          'Resort-area curb and Shore Drive congestion fill first. Prefer early starts; book oceanfront elevators weeks ahead for peak weekends.',
      },
      {
        title: 'Military / PCS high-volume windows',
        detail:
          'Order-driven seasons create mid-week spikes. Align to report dates and confirm storage needs early.',
      },
      {
        title: 'Hurricane season awareness (roughly June–November)',
        detail:
          'Late-summer and fall storm risk. Confirm weather contingency language and protect coastal open carries.',
      },
    ],
  },
  specialized: [
    {
      id: 'oceanfront-pcs-coastal',
      title: 'Oceanfront, PCS & coastal logistics module',
      intro:
        'Virginia Beach estimates fail more often on resort curb rules, elevator packets, and military calendars than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and truck-length limits for oceanfront and Town Center mid-rises before the survey is final.',
        'Price portal-to-portal time for any pair that rides I-264, I-64, Shore Drive, or Virginia Beach Boulevard at peak or tourist hours.',
        'Align PCS jobs to report dates; ask about HHG entitlement vs local self-hire scope and storage-in-transit.',
        'Photo oceanfront curb options, stair counts, and HOA gate approaches; sand and humidity change open-carry risk.',
        'Clarify Virginia Beach vs Norfolk / Chesapeake / Portsmouth addresses on every estimate.',
        'Verify Virginia DMV motor-carrier / household goods authorization for in-state work and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Virginia Beach?',
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
              'Virginia Beach City Public Schools is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Oceanfront, Great Neck, or Princess Anne do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Southern and western growth corridors can see enrollment pressure. Ask the division about capacity, transfers, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'Division boundary tools, Virginia Department of Education data, and campus visits beat ranking screenshots alone. Military families should also check school liaison resources for PCS timing.',
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
              'Sentara campuses (including Virginia Beach General and Princess Anne–area facilities) and other regional providers serve coastal and inland corridors. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Sandbridge, Great Neck, or Shore Drive to preferred campuses — I-264 and tourist traffic change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Oceanfront denser product vs inland tracts',
            detail:
              'Expect condos and elevators near the resort strip; larger HOA SFH dominate Kempsville, Great Neck, Red Mill, and much of Princess Anne.',
          },
          {
            title: 'Cost variation inside the city',
            detail:
              'Purchase prices and rents vary sharply by corridor and flood/insurance exposure. Budget for HOA dues, wind/flood insurance where relevant, and older-home repair risk.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and condo associations often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Virginia Beach areas fit whom',
        bullets: [
          {
            title: 'Oceanfront / resort lifestyle',
            detail:
              'Suits people prioritizing beach access and walkable amenities — with parking, elevator, and tourism-season tradeoffs on move day and daily life.',
          },
          {
            title: 'Kempsville–Great Neck suburban family corridors',
            detail:
              'Often appeals for established schools-adjacent housing and space — with HOA logistics and I-264 commute realism.',
          },
          {
            title: 'Princess Anne / south growth',
            detail:
              'Attracts households seeking newer inventory and more room — with longer empty miles to the oceanfront core and HOA packets.',
          },
          {
            title: 'Military-adjacent rentals',
            detail:
              'Practical for short PCS cycles — with multifamily access friction and order-driven calendars.',
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
              'Military installations, tourism and hospitality, healthcare, professional services, and retail corridors concentrate along I-264, the oceanfront, and Town Center.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-264, I-64, Shore Drive, and Virginia Beach Boulevard peaks are real — especially in summer. Test-drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One city, multiple Virginia Beaches',
            detail:
              'Virginia Beach stacks a resort oceanfront, military-adjacent rentals, established suburban villages, and southern growth tracts — different from Chesapeake’s inland Greenbrier fabric or Norfolk’s denser naval/port core.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, coastal wind, and hurricane-season risk. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Tourism and beach culture define the resort strip; inland corridors feel more family- and retail-oriented. Visit at peak summer and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Virginia Beach resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves (distance can change which framework applies) and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Virginia Beach — official site',
        href: 'https://www.vbgov.com/',
        external: true,
        note: 'City services & offices',
      },
      {
        label: 'Virginia Beach City Public Schools',
        href: 'https://www.vbschools.com/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: '511 Virginia traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'I-264 / I-64 before load windows',
      },
      {
        label: 'Virginia Beach tourism / visitor info',
        href: 'https://www.visitvirginiabeach.com/',
        external: true,
        note: 'Event & peak-season awareness',
      },
    ],
  },
  directoryHint:
    'Prefer crews with oceanfront elevator and curb experience for resort-strip stock; HOA fluency for Great Neck–Princess Anne product; honest I-264 / Shore Drive timing for cross-city pairs; PCS-aware scheduling for Oceana-adjacent jobs. Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
