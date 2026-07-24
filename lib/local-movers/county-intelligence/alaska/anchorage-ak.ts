import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAkPack,
  AK_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/alaska/ak-shared';

/**
 * Municipality of Anchorage, AK — Anchorage Bowl, Hillside, Eagle River–Chugiak,
 * South Anchorage, JBER-adjacent logistics.
 * NOT Fairbanks Interior extremes, NOT Mat-Su Valley growth alone, NOT Juneau ferry/air capital.
 */
export const anchorageCountyAkIntelligence: CountyIntelligencePack = finalizeAkPack({
  countySlug: 'anchorage',
  hubTitle: 'Anchorage Moving Intelligence Hub',
  eyebrow:
    'Municipality of Anchorage, AK · Bowl / Hillside / Eagle River & Glenn / Seward logistics',
  h1: 'Moving in Anchorage, AK: Municipal Core, Hillside, Military-Adjacent & Glenn / Seward Logistics',
  heroOpener:
    'Anchorage is Alaska’s Southcentral municipal core — Downtown multi-unit and port-adjacent product, Midtown and Spenard mixed stock, Hillside grades and long drives, Eagle River–Chugiak north belts, South Anchorage ranch and newer subdivisions, and JBER-adjacent military housing logistics — not Fairbanks Interior freeze extremes, not Mat-Su Valley growth alone, and not Juneau’s constrained road-plus-ferry capital model. Expect Glenn Highway and Seward Highway freeflow that rewrites “local” estimates, winter ice and dark-season staging risk, elevator and multi-unit packets downtown, hillside driveway geometry that underprices flat-rate optimism, and Outside or interstate legs that need FMCSA when household goods leave Alaska. A Downtown walk-up, a Hillside two-story, an Eagle River ranch, and a JBER-adjacent PCS job do not share truck access or crew skill. This hub is for people moving in the Municipality of Anchorage — not a renamed Fairbanks, Mat-Su, or Juneau page.',
  heroCredibility:
    'Alaska business license + insurance for intrastate · FMCSA for Outside / interstate · Anchorage Bowl, Hillside & JBER logistics awareness · Curated listings',
  majorCorridors: 'Glenn Highway · Seward Highway · Minnesota Dr · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Anchorage different',
    intro:
      'These are Municipality of Anchorage realities — Bowl multi-unit density, Hillside grades, Eagle River–Chugiak belts, South Anchorage product, JBER-adjacent military logistics, and Glenn / Seward freeflow — not Fairbanks Interior cold defaults, not Mat-Su Wasilla–Palmer growth alone, and not Juneau ferry/air capital constraints.',
    bullets: [
      {
        title: 'This is Anchorage municipal core — not Fairbanks, Mat-Su, or Juneau',
        detail:
          'Ignore Interior extreme-cold only scripts, Mat-Su Valley growth templates, and Southeast capital ferry/air defaults. Anchorage is the Southcentral employment, port, airport, and military-adjacent hub with Bowl density, Hillside topography, and north–south corridor freeflow. Match estimates to Municipality of Anchorage addresses and Alaska business-license / insurance controls — not Fairbanks North Star, Matanuska-Susitna Borough, or City and Borough of Juneau packets alone.',
      },
      {
        title: 'Downtown multi-unit and Midtown / Spenard rewrite simple suburban rates',
        detail:
          'Elevator reservations, building COIs, scarce curb near offices and retail, older walk-ups, and tight alley or dock access dominate core jobs. A Midtown condo or Spenard multi-unit does not share the truck length or labor stack of a South Anchorage ranch cul-de-sac.',
      },
      {
        title: 'Hillside grades, long drives, and driveway geometry underprice flat-rate optimism',
        detail:
          'Steep approaches, limited turnarounds, ice risk on shaded grades, and long carries from street to house fail estimates more often than packing skill alone. Photo approach grades and winter surface conditions early.',
      },
      {
        title: 'Eagle River–Chugiak and South Anchorage belts add empty miles inside the municipality',
        detail:
          'North and south pairs look “local” on a map and still burn portal-to-portal time on Glenn Highway, Seward Highway, and Minnesota Drive freeflow — especially at peak commute and winter weather slowdowns.',
      },
      {
        title: 'JBER-adjacent and military-tied moves need access discipline',
        detail:
          'Base-adjacent housing, PCS timing, gate and ID requirements where applicable, and inventory sensitivity differ from pure civilian Bowl jobs. Confirm access rules and appointment windows before the survey is final.',
      },
      {
        title: 'Winter, dark season, and Outside / interstate pairs are routine complexity',
        detail:
          'Ice, snow, freeze–thaw, and limited daylight reshape curb, stairs, and crew safety. Households regularly move Anchorage ↔ Mat-Su, Anchorage ↔ Fairbanks Interior, or Outside via Ted Stevens Anchorage International Airport and the Alaska Highway network. Alaska business license and insurance alone do not authorize interstate delivery — verify FMCSA when any leg leaves Alaska.',
      },
      AK_REG_BULLET,
    ],
  },
  zonesHeading: 'Anchorage access zones',
  zonesIntro:
    'Plan by Downtown multi-unit and port-adjacent core, Midtown / Spenard mixed stock, Hillside grades, Eagle River–Chugiak north belts, South Anchorage subdivisions, and JBER-adjacent military housing where accurate — access rules cluster by topography, building type, and corridor freeflow more than ZIP alone.',
  zones: [
    {
      id: 'downtown-anchorage-core',
      name: 'Downtown Anchorage multi-unit, port-adjacent & core grid',
      shortName: 'Downtown / core',
      neighborhoods: [
        'Downtown Anchorage',
        'Port-adjacent edges',
        '4th–5th Avenue corridors',
        'L Street / downtown residential edges',
        'Ship Creek edges',
        'Core multi-unit pockets',
      ],
      housingTypes: 'Mid-rise multifamily, older walk-ups, condo, limited SFH, mixed commercial-adjacent',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'Scarce curb near offices, tourism, and retail corridors',
        'Winter ice on downtown grades and limited daylight staging windows',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early freight windows outside cruise and event peaks. Photo curb staging options and ice conditions early. Confirm truck length for tight blocks.',
      cityKeywords: [
        'anchorage',
        'downtown anchorage',
      ],
    },
    {
      id: 'midtown-spenard',
      name: 'Midtown, Spenard & Minnesota Drive mixed belts',
      shortName: 'Midtown / Spenard',
      neighborhoods: [
        'Midtown',
        'Spenard',
        'Minnesota Drive corridors',
        'Northern Lights / Benson edges',
        'Midtown multi-unit pockets',
        'Airport-adjacent residential edges',
      ],
      housingTypes: 'Multifamily, townhomes, older SFH, mixed commercial-adjacent stock',
      challenges: [
        'Multi-flight stairs, older walk-ups, and mixed building rules',
        'Minnesota Drive and arterial freeflow at peak',
        'Airport-adjacent noise and truck-routing constraints on some streets',
      ],
      moverTips:
        'Survey stair counts with photos. Clarify Midtown vs Spenard vs Downtown building packets. Price Minnesota Drive freeflow honestly for cross-Bowl pairs. Protect older interiors and tight landings.',
      cityKeywords: [
        'midtown anchorage',
        'spenard',
      ],
    },
    {
      id: 'hillside-anchorage',
      name: 'Hillside grades, long drives & eastern elevation belts',
      shortName: 'Hillside',
      neighborhoods: [
        'Hillside',
        'Upper Hillside edges',
        'Rabbit Creek edges',
        'Hillside trail-adjacent residential',
        'Eastern elevation belts',
        'Long-drive SFH corridors',
      ],
      housingTypes: 'Character SFH, multi-level homes, estate-style lots, limited multi-unit',
      challenges: [
        'Steep approach grades, limited turnarounds, and long carries',
        'Ice and snow risk on shaded drives and winter access',
        'Truck length and staging constraints on narrow residential approaches',
      ],
      moverTips:
        'Photo driveway grades, turnaround depth, and winter surface conditions. Prefer smaller shuttle trucks when full vans cannot stage. Budget extra labor for elevation and long carries. Avoid late-day winter windows when freeze risk rises.',
      cityKeywords: [
        'hillside anchorage',
        'rabbit creek',
      ],
    },
    {
      id: 'eagle-river-chugiak',
      name: 'Eagle River, Chugiak & northern municipal belts',
      shortName: 'Eagle River / Chugiak',
      neighborhoods: [
        'Eagle River',
        'Chugiak',
        'Peters Creek edges',
        'Glenn Highway north corridors',
        'Northern ranch and two-story stock',
        'Eagle River multi-unit pockets',
      ],
      housingTypes: 'SFH, ranch and two-story stock, some multi-family, rural-residential edges',
      challenges: [
        'Glenn Highway freeflow and longer empty miles to Bowl core',
        'Mixed driveway width and winter access product',
        'School-calendar and military-tied timing peaks',
      ],
      moverTips:
        'Price Glenn Highway portal-to-portal honestly for Bowl pairs. Survey rural driveway width and turnaround. Align with school calendars and PCS windows when relevant. Confirm Eagle River vs Chugiak vs Anchorage Bowl address labels on every estimate.',
      cityKeywords: [
        'eagle river',
        'chugiak',
        'peters creek',
      ],
    },
    {
      id: 'south-anchorage',
      name: 'South Anchorage subdivisions, Dimond corridors & southern belts',
      shortName: 'South Anchorage',
      neighborhoods: [
        'South Anchorage',
        'Dimond corridors',
        'Abbott / Huffman edges',
        'Southern subdivision belts',
        'Seward Highway south approach edges',
        'South multi-unit and townhome pockets',
      ],
      housingTypes: 'HOA and non-HOA SFH, townhomes, newer multi-family, ranch and two-story stock',
      challenges: [
        'Seward Highway and arterial freeflow to Bowl core',
        'HOA packets, gate lists, and timed windows where present',
        'School-calendar summer peaks and winter ice on subdivision approaches',
      ],
      moverTips:
        'Collect HOA packets and gate codes early when required. Confirm truck length rules. Price Seward Highway and Minnesota Drive honestly for northbound unload pairs. Prefer mid-week starts outside lease-end Fridays.',
      cityKeywords: [
        'south anchorage',
        'dimond',
      ],
    },
    {
      id: 'jber-adjacent',
      name: 'JBER-adjacent military housing & base-tied residential edges',
      shortName: 'JBER-adjacent',
      neighborhoods: [
        'JBER-adjacent residential',
        'Military housing edges where publicly accessible',
        'Base-corridor approach belts',
        'Northeast Anchorage military-tied pockets',
        'PCS-heavy rental corridors',
        'Glenn / Muldoon approach edges',
      ],
      housingTypes: 'Military housing product, multi-family, SFH, PCS rental stock',
      challenges: [
        'Access, ID, and appointment rules where base or installation gates apply',
        'PCS calendar compression and short notice windows',
        'Inventory sensitivity and repeated short-distance military moves',
      ],
      moverTips:
        'Confirm gate, escort, and ID requirements in writing before load day. Align crews to PCS orders and housing office windows. Inventory carefully for rapid turn jobs. Distinguish pure civilian Bowl jobs from installation-adjacent access stacks.',
      cityKeywords: [
        'jber',
        'joint base elmendorf richardson',
        'elmendorf',
        'fort richardson',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Anchorage moving costs',
    intro:
      'Multi-unit elevators, Hillside grades, winter access risk, Glenn / Seward freeflow, and military-adjacent access rules move the number more than packing skill alone — this is Anchorage municipal logistics, not Fairbanks Interior or Juneau ferry defaults.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown and Midtown multi-unit add labor and schedule risk before packing skill matters. Scarce curb near offices and retail multiplies shuttle need.',
      },
      {
        title: 'Hillside grades, long drives & winter ice',
        detail:
          'Steep approaches, limited turnarounds, and freeze risk on eastern elevation stock underprice flat-rate suburban optimism. Shuttle trucks and extra labor are common.',
      },
      {
        title: 'Glenn Highway · Seward Highway · Minnesota Dr freeflow',
        detail:
          'Eagle River ↔ Bowl, South Anchorage ↔ Downtown, and Midtown cross-pairs burn portal-to-portal hours even when map miles look short — worse in ice, snow, and dark season.',
      },
      {
        title: 'JBER-adjacent access & PCS timing compression',
        detail:
          'Gate rules, ID packets, and military calendar windows rewrite jobs that look like ordinary multi-family on a map. Short notice raises crew premium risk.',
      },
      {
        title: 'Mat-Su, Interior & Outside empty miles',
        detail:
          'Wasilla–Palmer, Fairbanks North Star, and Outside destinations raise staging distance, weather exposure, and authority complexity when leaving the Municipality or Alaska.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$600–$2,200+',
        note: 'Higher with elevators, walk-ups, ice, or peak Glenn / Seward pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,800–$5,500+',
        note: 'Stairs, Hillside grades, multi-unit soft costs, and winter risk trend up',
      },
      {
        label: '3–4+ BR / Hillside / cross-zone / PCS-heavy',
        value: '$3,500–$11,000+',
        note: 'Elevation stock, long corridor pairs, and military windows price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$130–$230+/hr',
        note: 'Portal-to-portal; packing, winter premium, stairs, and shuttles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Anchorage move',
    intro:
      'Winter ice and dark season, freeze–thaw shoulder months, summer tourism and school calendars, military PCS waves, and Glenn / Seward weather freeflow reshape access and crew availability across the Municipality of Anchorage.',
    items: [
      {
        title: 'Best windows: mid-week early mornings in shoulder seasons',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce Glenn / Seward pain when weather allows. Late spring and early fall often balance daylight, ice risk, and crew supply better than deep winter or peak summer. Avoid month-end Fridays when leases and HOA or building slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September plus PCS waves',
        detail:
          'Family school calendars, apartment turnover, tourism pressure on crews, and military PCS timing fill first. Book 2–4+ weeks ahead for peak weekends, elevator slots, and installation-adjacent windows. Outside-bound air and ferry logistics also tighten in summer.',
      },
      {
        title: 'Winter critical: ice, snow, freeze–thaw & dark season',
        detail:
          'October–March (and often into April on shaded Hillside grades) raise cancellation risk, slower freeflow, stair and curb hazards, and limited daylight. Prefer flexible dates, covered staging, heated soft goods strategy, and early starts. Confirm driveway plowing and path clearing before crews arrive. Budget winter premium labor honestly.',
      },
      {
        title: 'Earthquake, wind & shoulder-storm contingency',
        detail:
          'Southcentral weather and seismic awareness matter for outdoor staging and fragile packing. Prefer contingency buffers on long corridor pairs and Hillside elevation stock when forecasts or aftershocks disrupt road or building access.',
      },
    ],
  },
  specialized: [
    {
      id: 'anchorage-bowl-hillside-module',
      title: 'Anchorage Bowl multi-unit, Hillside & Glenn / Seward logistics module',
      intro:
        'Municipality of Anchorage estimates fail more often on elevators, Hillside grades, winter ice, corridor freeflow, and military-adjacent access than on packing skill alone.',
      bullets: [
        'Book elevators, docks, and building COIs for Downtown and Midtown multi-unit before the survey is final.',
        'Photo Hillside grades, turnaround depth, and winter surface conditions — plan shuttles when full vans cannot stage.',
        'Price portal-to-portal time for any pair that rides Glenn Highway, Seward Highway, or Minnesota Drive at peak or in ice.',
        'Confirm Eagle River, Chugiak, South Anchorage, Hillside, and Bowl core addresses on every estimate — municipal labels hide different access stacks.',
        'For JBER-adjacent jobs, lock gate, ID, and appointment rules in writing and align to PCS housing windows.',
        'For pure in-state jobs insist on Alaska business license details, written estimates, and insurance certificates; verify FMCSA for any Outside or interstate leg.',
      ],
    },
    {
      id: 'not-fairbanks-not-matsu-not-juneau',
      title: 'Not Fairbanks Interior · not Mat-Su only · not Juneau ferry/air module',
      intro:
        'A single “Alaska rate” collapses when Anchorage municipal product is confused with Fairbanks extreme cold, Mat-Su Valley growth alone, or Juneau’s constrained capital road-plus-ferry model.',
      bullets: [
        'Do not price Downtown Anchorage elevators like Fairbanks Interior freeze logistics or like Juneau ferry/air household-goods handoffs as interchangeable defaults.',
        'State the market as Municipality of Anchorage on every estimate — disambiguate from Fairbanks North Star Borough, Matanuska-Susitna Borough, and City and Borough of Juneau.',
        'Keep Mat-Su Wasilla–Palmer growth pairs clear when Glenn / Parks links appear — still Anchorage-adjacent Southcentral, not Interior or Southeast.',
        'Match school-calendar and PCS peaks separately from pure civilian mid-week relocation windows.',
        'Note air and ferry only where household goods actually leave the continuous road network — do not invent interstate highway strings for Anchorage local jobs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Anchorage?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, military ties, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit across the Bowl, Hillside, and Eagle River belts.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'The Municipality of Anchorage is primarily served by Anchorage School District campuses spanning Bowl, Hillside, Eagle River–Chugiak, and South Anchorage belts. Assignment is address-based — marketing neighborhood names do not guarantee a campus. Military families should confirm enrollment windows and records transfer early for PCS timing.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs, charter options, and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year or mid-PCS cycle. University of Alaska Anchorage and private options add adult-education and family-choice layers in the Bowl.',
          },
          {
            title: 'Research sources',
            detail:
              'Anchorage School District boundary tools, Alaska Department of Education & Early Development data, and campus visits beat ranking screenshots alone — especially when comparing Eagle River vs South Anchorage vs Hillside product.',
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
              'Providence Alaska Medical Center, Alaska Native Medical Center, Alaska Regional Hospital, and related specialty and military-affiliated care anchors serve the Municipality and broader Southcentral region. Confirm insurance networks, referral paths, and military TRICARE options for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times to preferred campuses — Glenn Highway, Seward Highway, and Minnesota Drive freeflow change “nearby” on paper. Transfer records early. Hillside and Eagle River households should budget weather-delay buffers for appointments as well as move day.',
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
              'Expect Downtown and Midtown multi-unit; Spenard mixed stock; Hillside multi-level SFH; Eagle River–Chugiak ranch and rural-residential edges; South Anchorage subdivisions and townhomes; JBER-adjacent military and PCS rental product.',
          },
          {
            title: 'Cost variation inside the municipality',
            detail:
              'Purchase prices and rents vary sharply by elevation views, school zones, multi-unit vs SFH, and military proximity. Budget for winter heating, older-building repair risk, HOA dues where present, and competitive rental seasons near employment and base corridors.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Hillside and South Anchorage product may add private road or long-drive access rules. Read documents carefully before load day.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / Midtown multi-unit lifestyle',
            detail:
              'Suits people prioritizing employment access, amenities, and shorter winter commutes — with elevator, curb, and ice freeflow tradeoffs on move day.',
          },
          {
            title: 'Hillside elevation living',
            detail:
              'Often appeals for views, space, and trail access — with grade geometry, long drives, and winter access risk that rewrites move logistics.',
          },
          {
            title: 'Eagle River / Chugiak northern belts',
            detail:
              'Fits households seeking more space and northern municipal character — with Glenn Highway freeflow and longer empty miles to Bowl cores.',
          },
          {
            title: 'South Anchorage / JBER-adjacent living',
            detail:
              'Attracts families and military-tied households seeking subdivisions or base proximity — with HOA packets, PCS calendars, and Seward / Glenn approach freeflow.',
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
              'Oil and gas services, government, healthcare systems, logistics and port activity, Ted Stevens Anchorage International Airport cargo and passenger operations, military (JBER), tourism seasonality, and professional services concentrate demand across the Municipality.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak Glenn Highway, Seward Highway, and Minnesota Drive freeflow is real — including Mat-Su reverse pairs and winter slowdowns. Test peak and winter routes before choosing solely on rent or purchase price. Dark-season and ice conditions change “20 minutes on paper” into longer portal times.',
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
              'Anchorage is Alaska’s largest municipal core — Bowl urban density, Hillside topography, Eagle River north belts, South Anchorage growth product, and military-adjacent logistics — not Fairbanks Interior extremes, not Mat-Su Valley alone, and not Juneau’s capital ferry/air isolation.',
          },
          {
            title: 'Climate',
            detail:
              'Subarctic / maritime-influenced Southcentral climate with cold winters, freeze–thaw shoulders, limited winter daylight, and milder summers than Interior Alaska. Plan outdoor staging, ice, snow, and dark-season contingency as part of move-in — winter is critical, not optional.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, PCS waves, tourism summer pressure, and winter weather reshape daily rhythm. Outdoor recreation access is a major lifestyle driver; move logistics must still respect grades, ice, and corridor freeflow.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Anchorage resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Alaska moves insist on written estimates, Alaska business license details, and insurance certificates; verify FMCSA for Outside/interstate legs before deposits.',
    items: [
      {
        label: 'Municipality of Anchorage — official site',
        href: 'https://www.muni.org/',
        external: true,
        note: 'Municipal services & property context',
      },
      {
        label: 'Anchorage School District',
        href: 'https://www.asdk12.org/',
        external: true,
        note: 'Boundary and enrollment context',
      },
      {
        label: '511 Alaska — traveler information',
        href: 'https://511.alaska.gov/',
        external: true,
        note: 'Glenn / Seward / Minnesota conditions before load windows',
      },
      {
        label: 'Ted Stevens Anchorage International Airport',
        href: 'https://www.anchorageairport.com/',
        external: true,
        note: 'Air-cargo and Outside logistics context when relevant',
      },
      {
        label: 'Alaska Marine Highway System',
        href: 'https://dot.alaska.gov/amhs/',
        external: true,
        note: 'Ferry logistics for Southeast / coastal pairs — not a local Bowl corridor',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Downtown / Midtown elevator and COI fluency; Hillside grade, shuttle, and winter ice experience; honest Glenn Highway · Seward Highway · Minnesota Dr timing for Eagle River and South Anchorage pairs; JBER-adjacent gate and PCS fluency where applicable. Insist on Alaska business license details, written estimates, and insurance certificates for intrastate moves; verify FMCSA for Outside / interstate legs before deposits. This is Municipality of Anchorage — not Fairbanks Interior, not Mat-Su only, not Juneau ferry/air capital defaults.',
  lastReviewed: '2026-07-24',
});
