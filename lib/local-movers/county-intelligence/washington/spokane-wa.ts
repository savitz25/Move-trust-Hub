import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaPack,
  WA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-shared';

/**
 * Spokane County, WA — eastern Washington hub
 * (distinct climate and logistics from Puget Sound — NOT Seattle east).
 */
export const spokaneCountyWaIntelligence: CountyIntelligencePack = finalizeWaPack({
  countySlug: 'spokane',
  hubTitle: 'Spokane County Moving Intelligence Hub',
  eyebrow: 'Spokane · eastern WA hub, Inland Northwest climate & I-90 logistics',
  h1: 'Moving in Spokane County: Inland Northwest Access, South Hill Stairs & I-90 Logistics',
  heroOpener:
    'Spokane County is eastern Washington’s hub — downtown and Kendall Yards denseness, South Hill porch-and-stair stock, Spokane Valley ranch and HOA product, north-side family tracts, and Liberty Lake / Coeur d’Alene–corridor growth that is not a Puget Sound clone. A Browne’s Addition walk-up, a South Hill multi-flight house, a Valley driveway ranch, and a Liberty Lake planned-community lot do not share truck access or crew skill. I-90, US-2, US-395, and SR-290 turn short map miles into billable hours when winter ice, summer heat, and peak commute windows collide. This hub is for people moving in Spokane County — not a renamed Seattle-east page or generic western Washington template.',
  heroCredibility:
    'Washington UTC household goods permit for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-90 · US-2 · US-395 · SR-290',
  whatMakesDifferent: {
    title: 'What makes moving in Spokane County different',
    intro:
      'These are Spokane and Inland Northwest realities — eastern WA climate, South Hill elevation, Valley sprawl, and I-90 spine logistics — not Puget Sound ferry schedules, Seattle high-rise elevators, or Cascades-west rain patterns.',
    bullets: [
      {
        title: 'Eastern WA hub scale, not Seattle-metro spillover',
        detail:
          'Crew density, specialty equipment, and same-week multi-stop options are thinner than King/Snohomish markets. Booking lead time and empty miles matter more here than west-side micro-market volume.',
      },
      {
        title: 'South Hill elevation vs Valley flat product is not one job',
        detail:
          'South Hill and Browne’s Addition need stair counts, grade, and curb surveys; Spokane Valley and Liberty Lake need driveway length, HOA rules, and longer portal runs — not a single “Spokane rate.”',
      },
      {
        title: 'I-90, US-2, US-395, and SR-290 rewrite portal time',
        detail:
          'Downtown ↔ Valley, North Spokane ↔ Liberty Lake, or US-2 airport-edge pairs look local and still burn 30–60+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Continental climate — snow, ice, and summer heat reshape open carries',
        detail:
          'Spokane’s inland climate differs sharply from maritime Puget Sound: icy walks and freeze–thaw November–March, plus hot dry summer afternoons that stress crews and heat-sensitive inventories. Prefer early starts and weather contingency.',
      },
      {
        title: 'University, medical, and military-adjacent turnover is routine',
        detail:
          'Gonzaga-area multifamily, downtown medical campuses, Fairchild AFB–linked households, and campus lease waves create mid-month spikes that pure Saturday SFH quotes underprice.',
      },
      {
        title: 'Cross-county Inland Northwest pairs are routine',
        detail:
          'Households regularly move Spokane ↔ Stevens, Spokane ↔ Kootenai County ID (Coeur d’Alene), or toward the Tri-Cities and Wenatchee. Clarify addresses so Washington UTC HHG vs FMCSA interstate assumptions stay accurate when any leg leaves Washington.',
      },
      {
        title: 'Spokane is not Seattle east',
        detail:
          'Inland Northwest product, climate, and corridor patterns differ from King County elevators and Sound-side HOA belts. Do not reuse Puget Sound ferry-adjacent or Seattle high-rise copy here.',
      },
      WA_REG_BULLET,
    ],
  },
  zonesHeading: 'Spokane County access zones',
  zonesIntro:
    'Plan by downtown / Kendall Yards denseness, South Hill elevation, Spokane Valley arterials, north Spokane / US-2 edges, and Liberty Lake growth — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-kendall',
      name: 'Downtown Spokane, Kendall Yards & riverfront denseness',
      shortName: 'Downtown / Kendall',
      neighborhoods: [
        'Downtown Spokane',
        'Kendall Yards',
        'Peaceful Valley edges',
        'West Central edges',
        'Riverfront multifamily',
      ],
      housingTypes: 'Mid-rise multifamily, lofts, walk-ups, mixed commercial-edge product',
      challenges: [
        'Limited curb and elevator or stair stacks on denser product',
        'I-90 approach congestion into the core',
        'Event-day freeflow collapse near riverfront and arena blocks',
      ],
      moverTips:
        'Photo curb options and elevator rules. Prefer mid-week early starts. Confirm building COI and dock rules before the crew day.',
      cityKeywords: [
        'downtown spokane',
        'kendall yards',
        'peaceful valley',
        'west central',
        'spokane',
      ],
    },
    {
      id: 'south-hill',
      name: 'South Hill, Browne’s Addition & elevated porch stock',
      shortName: 'South Hill',
      neighborhoods: [
        "Browne's Addition",
        'South Hill',
        'Manito edges',
        'Comstock',
        'Rockwood edges',
      ],
      housingTypes: 'Historic SFH, multi-flight porches, basements, denser older apartments',
      challenges: [
        'Elevation grade, stairs, and long interior carries',
        'Tree-lined curb with limited truck length',
        'Winter ice on steep approaches',
      ],
      moverTips:
        'Survey stair counts, driveway grade, and curb width. Prefer smaller trucks when streets narrow. Build ice contingency November–March.',
      cityKeywords: [
        "browne's addition",
        'brownes addition',
        'south hill',
        'manito',
        'comstock',
        'rockwood',
      ],
    },
    {
      id: 'spokane-valley',
      name: 'Spokane Valley, Sprague corridor & east-side product',
      shortName: 'Spokane Valley',
      neighborhoods: [
        'Spokane Valley',
        'Opportunity edges',
        'Veradale edges',
        'Sprague corridor residential',
        'Greenacres edges',
      ],
      housingTypes: 'Ranch and bi-level SFH, townhomes, garden apartments, strip-adjacent multifamily',
      challenges: [
        'I-90 / Sprague / Pines congestion on cross-valley pairs',
        'Long driveway and garage inventories on older stock',
        'Cross-zone pairs into Liberty Lake or downtown',
      ],
      moverTips:
        'Price I-90 and Sprague portal time honestly. Survey garage clearance and driveway turn radius. Share photos of basement access.',
      cityKeywords: [
        'spokane valley',
        'opportunity',
        'veradale',
        'greenacres',
        'sprague',
      ],
    },
    {
      id: 'north-spokane-us2',
      name: 'North Spokane, Five Mile & US-2 / Division edges',
      shortName: 'North Spokane',
      neighborhoods: [
        'North Spokane',
        'Five Mile Prairie edges',
        'Mead edges',
        'Hillyard edges',
        'Division corridor residential',
      ],
      housingTypes: 'Family SFH, acreage edges, multifamily along arterials',
      challenges: [
        'US-2 / US-395 / Division approach timing',
        'Prairie grades and longer rural-edge driveways',
        'School-calendar Saturday demand May–August',
      ],
      moverTips:
        'Build US-2 and Division buffers for airport- or Valley-linked pairs. Survey soft shoulders on acreage edges. Prefer early Saturday starts.',
      cityKeywords: [
        'north spokane',
        'five mile',
        'mead',
        'hillyard',
        'division',
      ],
    },
    {
      id: 'liberty-lake-east',
      name: 'Liberty Lake, Otis Orchards & I-90 east growth',
      shortName: 'Liberty Lake / East',
      neighborhoods: [
        'Liberty Lake',
        'Otis Orchards edges',
        'Newman Lake edges',
        'I-90 east planned tracts',
        'State-line corridor residential',
      ],
      housingTypes: 'Planned-community SFH, townhomes, HOA product, lake-edge lots',
      challenges: [
        'HOA gates, truck limits, and approved move hours',
        'I-90 empty miles from downtown or Valley load addresses',
        'Idaho-adjacent pairs that flip interstate authority',
      ],
      moverTips:
        'Collect HOA packets early. Price I-90 portal time from west-county origins. Clarify WA vs ID addresses so UTC vs FMCSA assumptions stay accurate.',
      cityKeywords: [
        'liberty lake',
        'otis orchards',
        'newman lake',
        'liberty',
      ],
    },
    {
      id: 'airway-cheney-southwest',
      name: 'Airway Heights, Cheney & southwest county edges',
      shortName: 'Airway / Cheney',
      neighborhoods: [
        'Airway Heights',
        'Cheney',
        'Medical Lake edges',
        'Fairchild-adjacent residential',
        'US-2 west corridor',
      ],
      housingTypes: 'Workforce SFH, campus multifamily, military-adjacent apartments',
      challenges: [
        'US-2 / I-90 links and base-adjacent lease waves',
        'Eastern Washington University move-in spikes in Cheney',
        'Long empty miles from core Spokane crews',
      ],
      moverTips:
        'Book campus and PCS-adjacent windows early. Price empty miles honestly. Confirm multifamily elevator or stair rules near campus and Airway Heights.',
      cityKeywords: [
        'airway heights',
        'cheney',
        'medical lake',
        'fairchild',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Spokane County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. South Hill stairs, Valley portal time, HOA soft costs, and winter ice separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'South Hill stairs, grade & porch geometry',
        detail:
          'Elevated historic stock adds flight counts and awkward turns that flat-rate optimism underprices.',
      },
      {
        title: 'I-90 · US-2 · US-395 · SR-290 congestion',
        detail:
          'Cross-county and core–Valley pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA gates, truck limits & approved hours',
        detail:
          'Liberty Lake and newer planned tracts add packet lead time and can force smaller trucks.',
      },
      {
        title: 'Winter ice, freeze–thaw & summer heat',
        detail:
          'Inland climate slows exterior work, shrinks curb, and can force weather delays not common on maritime west-side moves.',
      },
      {
        title: 'Cross-county and interstate empty miles',
        detail:
          'Cheney, Airway Heights, Coeur d’Alene ID, and Tri-Cities destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,500+',
        note: 'Higher with stairs, elevators, or peak I-90 pairs',
      },
      {
        label: '2–3BR apartment, townhome, or modest SFH',
        value: '$1,200–$3,800+',
        note: 'South Hill stairs and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / South Hill / cross-zone SFH',
        value: '$2,400–$7,500+',
        note: 'Elevation access and long I-90 or Idaho pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$185+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Spokane County move',
    intro:
      'School calendars, university turnover, inland winter ice, and hot dry summers reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease HOA hour rules, and reduce I-90 / Division pain. Avoid month-end Fridays when leases and campus calendars collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family SFH Saturdays and campus move-in fill first. Book 2–4 weeks ahead for peak weekends. Summer afternoon heat can slow open carries — prefer early starts.',
      },
      {
        title: 'Winter: snow, ice, and freeze–thaw',
        detail:
          'November–March adds curb shrinkage, icy South Hill approaches, and weather cancellations. Prefer flexible dates, early starts, and contingency for ice melt and tarps.',
      },
      {
        title: 'Campus, medical & Fairchild-linked mid-month spikes',
        detail:
          'Gonzaga-area, medical-campus, and military-adjacent households often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'inland-northwest-climate-access',
      title: 'Inland Northwest climate & South Hill access module',
      intro:
        'Spokane estimates fail more often on elevation stairs, ice windows, and I-90 portal time than on packing skill alone.',
      bullets: [
        'Photo stair counts, driveway grade, and curb options for South Hill and Browne’s Addition stock.',
        'Price portal-to-portal time for any pair that rides I-90, US-2, US-395, or SR-290 at peak.',
        'Plan ice contingency and flexible weather dates November–March — inland freeze–thaw differs from Puget Sound rain.',
        'Collect HOA packets for Liberty Lake and newer planned tracts before the survey is final.',
        'Clarify Spokane city vs Spokane Valley vs Liberty Lake vs Cheney addresses on every estimate.',
        'Verify Washington UTC household goods permit for in-state-only jobs and FMCSA for interstate legs (including Idaho).',
      ],
    },
    {
      id: 'spokane-zone-micro-markets',
      title: 'Downtown / Valley / Liberty Lake micro-market module',
      intro:
        'A single “Spokane rate” collapses when loft denseness, South Hill stairs, Valley ranches, and HOA growth product diverge a few miles apart.',
      bullets: [
        'Survey by zone product — downtown multifamily, multi-flight historic SFH, Valley ranch, or HOA planned tract — not by city name alone.',
        'Ask which approach corridors the crew will actually use at load and unload (I-90 vs US-2 vs Division).',
        'Match high-value inventories and basement walk-up inventories to different crew experience.',
        'Expect different parking and permit norms even a few miles apart; do not assume one staging plan covers both addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Spokane County?',
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
              'Spokane Public Schools, Central Valley, East Valley, Mead, Cheney, and other districts cover different address bands. Assignment is address-based — marketing names like South Hill or Liberty Lake do not guarantee a campus.',
          },
          {
            title: 'Higher education anchors',
            detail:
              'Gonzaga, Whitworth, Eastern Washington University (Cheney), and community-college campuses shape multifamily demand and August turnover near core and Cheney addresses.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, OSPI data, and campus visits beat ranking screenshots alone. Confirm enrollment windows early when relocating mid-year.',
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
              'Providence Sacred Heart, MultiCare Deaconess and Valley campuses, and specialty networks anchor much of Inland Northwest care. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from South Hill, Valley, or Liberty Lake to preferred campuses — I-90 and Division congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Historic core, South Hill, Valley & planned growth',
            detail:
              'Expect denser older stock and walk-ups near downtown; elevated porch SFH on South Hill; ranch and bi-level product in the Valley; and HOA planned communities toward Liberty Lake.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by zone. Budget for older-building repair risk, winter heating, HOA dues, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and building governance',
            detail:
              'Planned-community associations and some multifamily buildings control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Spokane County areas fit whom',
        bullets: [
          {
            title: 'Downtown / Kendall Yards urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with curb, elevator, and event-day tradeoffs on move day.',
          },
          {
            title: 'South Hill character living',
            detail:
              'Often appeals for historic homes and views — with stairs, grade, and winter ice constraints.',
          },
          {
            title: 'Spokane Valley practical sprawl',
            detail:
              'Attracts households seeking larger lots and retail access — with I-90 timing and longer portal runs.',
          },
          {
            title: 'Liberty Lake & east growth',
            detail:
              'Fits buyers chasing planned-community amenities and lake-edge living — with HOA rules and state-line commute patterns.',
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
              'Healthcare systems, higher education, government, logistics, aerospace/defense-adjacent employers, and professional services concentrate demand. Fairchild AFB shapes west-county and Airway Heights housing pressure.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households drive I-90, US-2, US-395, and Division peaks. Test drive peak routes before choosing solely on rent or purchase price — Valley ↔ downtown is not a trivial “local” hop at rush hour.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Spokanes',
            detail:
              'Spokane stacks riverfront denseness, elevated historic neighborhoods, Valley sprawl, and lake-edge growth — different from Puget Sound ferry towns or Seattle condo belts.',
          },
          {
            title: 'Inland climate',
            detail:
              'Four true seasons: cold snowy winters, warm-to-hot dry summers, and rapid shoulder-season swings. Plan outdoor staging, ice, and heat as part of move-in — not maritime drizzle alone.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Regional-hub dining, outdoors access (lakes, mountains, trails), and a more affordable inland cost structure than west-side metros. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Spokane County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Washington UTC household goods permit status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Spokane County — official site',
        href: 'https://www.spokanecounty.org/',
        external: true,
        note: 'County services & permits context',
      },
      {
        label: 'City of Spokane — official site',
        href: 'https://my.spokanecity.org/',
        external: true,
        note: 'City services & street-use context',
      },
      {
        label: 'Spokane Public Schools',
        href: 'https://www.spokaneschools.org/',
        external: true,
        note: 'Boundaries & calendars (city district)',
      },
      {
        label: 'WSDOT — traffic & road conditions',
        href: 'https://wsdot.com/travel/real-time/',
        external: true,
        note: 'I-90 / US-2 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with South Hill stair/grade experience; Valley and Liberty Lake HOA fluency; honest I-90 · US-2 · US-395 · SR-290 timing for cross-zone pairs; inland winter ice readiness. Verify Washington UTC household goods permit for in-state moves and FMCSA for interstate legs (including Idaho).',
  lastReviewed: '2026-07-24',
});
