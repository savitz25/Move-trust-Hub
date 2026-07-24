import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAkPack,
  AK_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/alaska/ak-shared';

/**
 * Fairbanks North Star Borough, AK — Fairbanks Interior extremes, UAF, Fort Wainwright,
 * North Pole, Parks / Richardson / Steese logistics.
 * NOT Anchorage municipal Bowl, NOT Mat-Su Valley growth, NOT Juneau ferry/air capital.
 */
export const fairbanksNorthStarCountyAkIntelligence: CountyIntelligencePack = finalizeAkPack({
  countySlug: 'fairbanks-north-star',
  hubTitle: 'Fairbanks North Star Borough Moving Intelligence Hub',
  eyebrow:
    'Fairbanks North Star Borough, AK · Interior extremes / UAF / Fort Wainwright & Parks / Richardson / Steese logistics',
  h1: 'Moving in Fairbanks North Star, AK: Interior Extremes, University / Military & Parks / Richardson / Steese Logistics',
  heroOpener:
    'Fairbanks North Star Borough is Interior Alaska — Downtown Fairbanks multi-unit and older stock, University of Alaska Fairbanks (UAF) campus-adjacent density, North Pole residential belts, Fort Wainwright-adjacent military housing, Chena River corridor product, and rural Interior edges — not Anchorage municipal Bowl density, not Mat-Su Wasilla–Palmer growth, and not Juneau’s constrained ferry/air capital model. Expect extreme cold logistics that rewrite every outdoor labor assumption, Parks Highway / Richardson Highway / Steese Highway freeflow that turns “local” pairs into weather-exposed portal time, freeze-up and ice fog staging risk, military PCS and university calendar waves, and Outside or interstate legs that need FMCSA when household goods leave Alaska. A Downtown Fairbanks walk-up, a UAF multi-unit, a North Pole ranch, a Fort Wainwright-adjacent PCS job, and a rural Interior driveway do not share truck access or crew skill. This hub is for people moving in Fairbanks North Star Borough — not a renamed Anchorage page.',
  heroCredibility:
    'Alaska business license + insurance for intrastate · FMCSA for Outside / interstate · Extreme cold, UAF & Fort Wainwright logistics awareness · Curated listings',
  majorCorridors: 'Parks Highway · Richardson Highway · Steese Highway · local grid',
  whatMakesDifferent: {
    title: 'What makes moving in Fairbanks North Star different',
    intro:
      'These are Fairbanks North Star Borough realities — Interior extreme cold, UAF density, Fort Wainwright-adjacent military logistics, North Pole and Chena belts, rural Interior edges, and Parks / Richardson / Steese freeflow — not Anchorage Bowl multi-unit defaults, not Mat-Su growth alone, and not Juneau ferry/air capital constraints.',
    bullets: [
      {
        title: 'This is Fairbanks Interior — not Anchorage, Mat-Su, or Juneau',
        detail:
          'Ignore Anchorage Downtown elevator-only scripts, Mat-Su Valley HOA growth templates, and Southeast capital ferry/air defaults. Fairbanks North Star is Interior Alaska with extreme winter temperatures, ice fog, limited daylight, university and military anchors, and long highway approaches. Match estimates to Fairbanks North Star Borough addresses and Alaska business-license / insurance controls — not Municipality of Anchorage, Matanuska-Susitna Borough, or City and Borough of Juneau packets alone.',
      },
      {
        title: 'Extreme cold logistics rewrite every outdoor labor assumption',
        detail:
          'Sub-zero and deep-cold windows freeze locks, stiffen packing materials, risk injury on ice, and limit how long crews can safely work outdoors. Heat-sensitive electronics, plants, and liquids need protection. Flat-rate “Lower 48 winter” optimism fails here more often than packing skill alone.',
      },
      {
        title: 'University / UAF and multi-unit belts compress calendars',
        detail:
          'Campus-adjacent housing, student turnover, and academic-year peaks collide with limited crew supply. Elevator and walk-up stacks near UAF do not share the driveway geometry of North Pole or rural Interior product.',
      },
      {
        title: 'Fort Wainwright-adjacent military moves need access discipline',
        detail:
          'Base-adjacent housing, PCS timing, gate and ID requirements where applicable, and inventory sensitivity differ from pure civilian Fairbanks jobs. Confirm access rules and appointment windows before the survey is final.',
      },
      {
        title: 'Parks, Richardson, and Steese freeflow burns portal time',
        detail:
          'Downtown Fairbanks ↔ North Pole, UAF ↔ Fort Wainwright edges, or Fairbanks ↔ rural Interior pairs look local and still burn weather-exposed hours. Ice, ice fog, and dark season multiply slowdowns on Parks Highway, Richardson Highway, and Steese Highway approaches.',
      },
      {
        title: 'Anchorage, Mat-Su & Outside pairs are long Interior logistics',
        detail:
          'Households regularly move Fairbanks ↔ Anchorage via Parks Highway, Fairbanks ↔ Delta / Interior edges via Richardson, or Outside via air and long highway networks. Extreme cold and distance dominate more than Anchorage-style municipal freeflow alone. Alaska business license and insurance alone do not authorize interstate delivery — verify FMCSA when any leg leaves Alaska.',
      },
      AK_REG_BULLET,
    ],
  },
  zonesHeading: 'Fairbanks North Star access zones',
  zonesIntro:
    'Plan by Downtown Fairbanks multi-unit and older stock, University / UAF campus-adjacent density, North Pole belts, Fort Wainwright-adjacent military housing, Chena corridor product, and rural Interior edges — access rules cluster by cold exposure, building type, and highway freeflow more than ZIP alone.',
  zones: [
    {
      id: 'downtown-fairbanks',
      name: 'Downtown Fairbanks multi-unit, older stock & core grid',
      shortName: 'Downtown Fairbanks',
      neighborhoods: [
        'Downtown Fairbanks',
        'Core multi-unit pockets',
        'Cushman / downtown corridors',
        'Riverfront edges',
        'Older walk-up residential',
        'Commercial-adjacent mixed stock',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, condo pockets, mixed commercial-adjacent',
      challenges: [
        'Multi-flight stairs, scarce truck length, and tight curb in cold',
        'Ice fog, black ice, and limited daylight staging windows',
        'Older basements, boilers, and freeze-sensitive interiors',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week early starts when temperatures allow safer outdoor work. Protect heat-sensitive items. Confirm plow status and curb staging before arrival. Inventory basements carefully for freeze risk.',
      cityKeywords: [
        'fairbanks',
        'downtown fairbanks',
      ],
    },
    {
      id: 'university-uaf',
      name: 'University / UAF campus-adjacent & academic housing belts',
      shortName: 'University / UAF',
      neighborhoods: [
        'University of Alaska Fairbanks edges',
        'College Road corridors',
        'Campus-adjacent multi-unit',
        'Student and faculty rental belts',
        'University West edges',
        'Academic-year turnover pockets',
      ],
      housingTypes: 'Multifamily, student housing product, townhomes, limited SFH',
      challenges: [
        'Elevator or walk-up packets and building COIs where present',
        'Academic calendar peaks and short lease windows',
        'Cold-weather curb scarcity near campus density',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Align to academic move-in/out windows early. Prefer mid-week starts outside semester peaks. Photo stair and curb options. Budget winter premium for late-fall and early-spring turnover.',
      cityKeywords: [
        'university of alaska fairbanks',
        'uaf',
        'college alaska',
      ],
    },
    {
      id: 'north-pole',
      name: 'North Pole residential, Richardson approach & southern belts',
      shortName: 'North Pole',
      neighborhoods: [
        'North Pole',
        'Richardson Highway approach edges',
        'North Pole subdivision stock',
        'Southern borough residential belts',
        'Badger Road corridors',
        'North Pole multi-unit pockets',
      ],
      housingTypes: 'SFH, ranch and two-story stock, some multi-family, rural-residential edges',
      challenges: [
        'Richardson Highway freeflow and empty miles to Fairbanks core',
        'Mixed driveway width, ice, and winter access product',
        'School-calendar and military-tied timing peaks',
      ],
      moverTips:
        'Price Richardson Highway portal-to-portal honestly for Fairbanks core pairs. Survey driveway width and turnaround in ice. Align with school calendars when relevant. Confirm North Pole vs Fairbanks address labels on every estimate.',
      cityKeywords: [
        'north pole',
        'north pole alaska',
      ],
    },
    {
      id: 'fort-wainwright-adjacent',
      name: 'Fort Wainwright-adjacent military housing & base-tied edges',
      shortName: 'Fort Wainwright-adjacent',
      neighborhoods: [
        'Fort Wainwright-adjacent residential',
        'Military housing edges where publicly accessible',
        'Base-corridor approach belts',
        'PCS-heavy rental corridors',
        'Eastern Fairbanks military-tied pockets',
        'Richardson / base approach edges',
      ],
      housingTypes: 'Military housing product, multi-family, SFH, PCS rental stock',
      challenges: [
        'Access, ID, and appointment rules where installation gates apply',
        'PCS calendar compression and short notice windows in extreme cold',
        'Inventory sensitivity and repeated short-distance military moves',
      ],
      moverTips:
        'Confirm gate, escort, and ID requirements in writing before load day. Align crews to PCS orders and housing office windows — cold weather multiplies delay risk. Inventory carefully for rapid turn jobs. Distinguish pure civilian Fairbanks jobs from installation-adjacent access stacks.',
      cityKeywords: [
        'fort wainwright',
        'wainwright',
      ],
    },
    {
      id: 'chena-belts',
      name: 'Chena River belts, west / river corridor & mixed SFH',
      shortName: 'Chena belts',
      neighborhoods: [
        'Chena River corridor residential',
        'West Fairbanks edges',
        'Chena Hot Springs Road approach edges',
        'River-adjacent SFH belts',
        'Mixed older and newer stock',
        'Floodplain-aware low areas where relevant',
      ],
      housingTypes: 'SFH, multi-level homes, limited multi-unit, rural-residential pockets',
      challenges: [
        'Seasonal river-adjacent access and spring breakup risk awareness',
        'Ice, snow load, and long carries on mixed driveway product',
        'Cross-zone freeflow to Downtown and UAF cores',
      ],
      moverTips:
        'Photo driveway and approach conditions seasonally. Ask about spring breakup and low-area access when timing is shoulder-season. Protect older interiors and basements. Price empty miles to core Fairbanks honestly.',
      cityKeywords: [
        'chena',
        'west fairbanks',
      ],
    },
    {
      id: 'rural-interior-edges',
      name: 'Rural Interior edges, Steese / Parks approaches & outlying product',
      shortName: 'Rural Interior edges',
      neighborhoods: [
        'Steese Highway outlying edges',
        'Parks Highway approach residential',
        'Rural Interior driveway product',
        'Goldstream and outlying belts where applicable',
        'Unincorporated residential edges',
        'Long empty-mile SFH corridors',
      ],
      housingTypes: 'Rural-residential SFH, cabins and hybrid stock, limited multi-unit',
      challenges: [
        'Longer empty miles, gravel or ice approaches, and limited turnarounds',
        'Extreme cold exposure and unreliable cell coverage on some approaches',
        'Parks / Steese weather freeflow and dark-season risk',
      ],
      moverTips:
        'Price empty miles and weather risk honestly. Survey approach width, ice, and turnaround with photos. Prefer daylight windows. Confirm whether full vans can stage or shuttle is required. Pack for freeze protection on long outdoor carries.',
      cityKeywords: [
        'steese',
        'goldstream',
        'ester',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Fairbanks North Star moving costs',
    intro:
      'Extreme cold, multi-unit stairs, military and university calendars, Parks / Richardson / Steese freeflow, and rural Interior empty miles move the number more than packing skill alone — this is Fairbanks Interior logistics, not Anchorage Bowl or Juneau ferry defaults.',
    drivers: [
      {
        title: 'Extreme cold, ice fog & freeze protection labor',
        detail:
          'Deep-cold windows slow every outdoor task, raise injury and damage risk, and require freeze protection for goods and people. Winter premium is structural, not optional.',
      },
      {
        title: 'Stairs, walk-ups & campus multi-unit packets',
        detail:
          'Downtown and UAF-adjacent multi-unit add flight counts, curb scarcity, and COI risk that ranch cul-de-sacs never see — worse when ice covers landings.',
      },
      {
        title: 'Parks Highway · Richardson Highway · Steese Highway freeflow',
        detail:
          'Cross-borough pairs burn portal-to-portal hours even when map miles look short — ice fog and dark season multiply slowdowns.',
      },
      {
        title: 'Fort Wainwright-adjacent access & PCS timing compression',
        detail:
          'Gate rules, ID packets, and military calendar windows rewrite jobs that look like ordinary multi-family on a map — short notice plus cold raises crew premium risk.',
      },
      {
        title: 'Anchorage, rural Interior & Outside empty miles',
        detail:
          'Anchorage via Parks Highway, Interior edges, and Outside air or long-haul destinations raise staging distance, weather exposure, and authority complexity when leaving the borough or Alaska.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$2,100+',
        note: 'Higher with walk-ups, ice, deep cold, or peak highway pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,700–$5,200+',
        note: 'Stairs, freeze protection, multi-unit soft costs, and winter risk trend up',
      },
      {
        label: '3–4+ BR / rural / cross-zone / PCS-heavy',
        value: '$3,200–$10,500+',
        note: 'Rural edges, long corridor pairs, and military windows price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$225+/hr',
        note: 'Portal-to-portal; packing, winter premium, stairs, and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Fairbanks North Star move',
    intro:
      'Extreme winter cold and dark season, ice fog, freeze–thaw and breakup shoulders, summer daylight and wildfire smoke risk, university calendars, and military PCS waves reshape access and crew availability across Fairbanks North Star Borough. Winter is critical — not a minor weather note.',
    items: [
      {
        title: 'Best windows: mid-week early mornings in late spring–early fall',
        detail:
          'Tuesday–Thursday starts clear curb and ease multi-unit windows when temperatures support safer outdoor labor. Late May through early September often offer the most reliable daylight and surface conditions. Avoid month-end Fridays when leases and building slots collide with limited crews.',
      },
      {
        title: 'Peak season: late May–mid-September plus PCS and academic waves',
        detail:
          'Family school calendars, UAF turnover, apartment turnover, and military PCS timing fill first. Book 2–4+ weeks ahead for peak weekends and installation-adjacent windows. Summer daylight helps, but crew supply still tightens.',
      },
      {
        title: 'Winter critical: extreme cold, ice fog, freeze–thaw & dark season',
        detail:
          'October–April (with deepest risk mid-winter) raise cancellation risk, equipment failure risk, slower freeflow, stair and curb hazards, and severely limited daylight. Prefer flexible dates, heated staging strategies, freeze-protection packing, and early starts when temperatures allow. Confirm driveway plowing and path clearing before crews arrive. Budget winter premium labor honestly — deep cold is not a Lower 48 ice-day equivalent.',
      },
      {
        title: 'Breakup, smoke & shoulder contingency',
        detail:
          'Spring breakup and muddy approaches can block rural edges. Summer wildfire smoke can reshape outdoor labor and air quality for crews. Prefer contingency buffers on long Parks / Richardson / Steese pairs when forecasts degrade.',
      },
    ],
  },
  specialized: [
    {
      id: 'fairbanks-interior-cold-module',
      title: 'Fairbanks Interior extreme cold, UAF & Parks / Richardson / Steese logistics module',
      intro:
        'Fairbanks North Star Borough estimates fail more often on extreme cold, ice fog, stair surveys, military and university calendars, and highway freeflow than on packing skill alone.',
      bullets: [
        'Plan freeze protection, heated soft-goods strategy, and shorter outdoor work cycles for any cold-season job — deep cold rewrites labor assumptions.',
        'Photo stair counts, ice on landings, and curb options for Downtown and UAF multi-unit before the survey is final.',
        'Price portal-to-portal time for any pair that rides Parks Highway, Richardson Highway, or Steese Highway at peak or in ice fog.',
        'Confirm Fairbanks core, North Pole, UAF-adjacent, Fort Wainwright-adjacent, Chena, and rural Interior addresses on every estimate.',
        'For Fort Wainwright-adjacent jobs, lock gate, ID, and appointment rules in writing and align to PCS housing windows.',
        'For pure in-state jobs insist on Alaska business license details, written estimates, and insurance certificates; verify FMCSA for any Outside or interstate leg.',
      ],
    },
    {
      id: 'not-anchorage-not-matsu-not-juneau',
      title: 'Not Anchorage Bowl · not Mat-Su growth · not Juneau ferry/air module',
      intro:
        'A single “Alaska rate” collapses when Fairbanks Interior product is confused with Anchorage municipal multi-unit, Mat-Su Valley growth, or Juneau’s constrained capital road-plus-ferry model.',
      bullets: [
        'Do not price Fairbanks deep-cold logistics like Anchorage Bowl elevators or like Juneau ferry/air household-goods handoffs as interchangeable defaults.',
        'State the market as Fairbanks North Star Borough / Interior Alaska on every estimate — disambiguate from Municipality of Anchorage, Matanuska-Susitna Borough, and City and Borough of Juneau.',
        'Keep Anchorage and Mat-Su pairs clear when Parks Highway appears — those are long Interior-to-Southcentral logistics, not local Bowl freeflow.',
        'Match UAF academic peaks separately from military PCS windows and pure civilian mid-week moves.',
        'Note air for Outside legs where accurate — do not invent interstate freeway strings for Fairbanks local jobs; corridors are Parks, Richardson, Steese, and the local grid.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Fairbanks North Star?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, extreme cold readiness, university and military ties, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit across Downtown, UAF, North Pole, and rural Interior edges.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Fairbanks North Star Borough is primarily served by Fairbanks North Star Borough School District campuses spanning Fairbanks core, North Pole, and outlying belts. Assignment is address-based — marketing neighborhood names do not guarantee a campus. Military families should confirm enrollment windows and records transfer early for PCS timing. UAF anchors higher education and family relocation patterns.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year or mid-PCS cycle. Academic-year timing around UAF also shapes rental and multi-unit turnover near campus.',
          },
          {
            title: 'Research sources',
            detail:
              'Borough school district boundary tools, Alaska Department of Education & Early Development data, and campus visits beat ranking screenshots alone — especially when comparing North Pole vs Fairbanks core vs rural edges.',
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
              'Fairbanks Memorial Hospital and related Interior specialty and military-affiliated care anchors serve the borough and broader Interior region. Confirm insurance networks, referral paths, and military TRICARE options for your household. Some specialty care still routes to Anchorage.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and extreme-cold drive times to preferred campuses — Parks, Richardson, and Steese freeflow plus ice fog change “nearby” on paper. Transfer records early. Rural and North Pole households should budget weather-delay buffers for appointments as well as move day.',
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
              'Expect Downtown multi-unit and older SFH; UAF campus-adjacent multifamily; North Pole ranch and subdivision stock; Fort Wainwright-adjacent military and PCS rental product; Chena corridor SFH; rural Interior driveway and hybrid stock.',
          },
          {
            title: 'Cost variation inside the borough',
            detail:
              'Purchase prices and rents vary by core vs outlying location, multi-unit vs SFH, and military proximity. Budget for extreme heating costs, freeze protection, older-building repair risk, and competitive rental seasons near UAF and base corridors.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Multi-unit management often controls move hours, truck size, elevators, and deposits. Rural private roads and long drives may add access rules. Read documents carefully and ask about winter plowing responsibility before load day.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Fairbanks / core multi-unit lifestyle',
            detail:
              'Suits people prioritizing shorter winter commutes and amenities — with stairs, ice, and curb scarcity tradeoffs on move day.',
          },
          {
            title: 'University / UAF campus-adjacent living',
            detail:
              'Often appeals for academic and research households — with turnover peaks, multi-unit packets, and cold-season curb limits.',
          },
          {
            title: 'North Pole / southern belts',
            detail:
              'Fits households seeking more space and southern borough character — with Richardson freeflow and longer empty miles to Fairbanks core.',
          },
          {
            title: 'Fort Wainwright-adjacent / rural Interior living',
            detail:
              'Attracts military-tied households and people seeking outlying space — with gate rules, PCS calendars, extreme cold exposure, and long approaches.',
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
              'Military (Fort Wainwright), University of Alaska Fairbanks, healthcare, government, resource and support services, tourism seasonality, and Interior logistics concentrate demand across the borough.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak Parks Highway, Richardson Highway, and Steese Highway freeflow is real — including ice fog, extreme cold, and dark-season slowdowns. Test winter routes before choosing solely on rent or purchase price. “20 minutes on paper” can become much longer in mid-winter conditions.',
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
              'Fairbanks North Star is Interior Alaska — extreme winter, strong university and military anchors, North Pole and Chena belts, rural edges — not Anchorage municipal Bowl density, not Mat-Su Valley growth alone, and not Juneau’s capital ferry/air isolation.',
          },
          {
            title: 'Climate',
            detail:
              'Continental Interior climate with extreme winter cold, ice fog, very limited mid-winter daylight, and long summer daylight. Plan freeze protection, heating readiness, and dark-season contingency as part of move-in — winter is the defining logistics season.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit in both winter and summer when possible — seasonal contrast is extreme. School calendars, PCS waves, UAF cycles, and deep cold reshape daily rhythm more than Southcentral tourism defaults.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Fairbanks North Star resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Alaska moves insist on written estimates, Alaska business license details, and insurance certificates; verify FMCSA for Outside/interstate legs before deposits.',
    items: [
      {
        label: 'Fairbanks North Star Borough — official site',
        href: 'https://www.fnsb.gov/',
        external: true,
        note: 'Borough services & property context',
      },
      {
        label: 'City of Fairbanks',
        href: 'https://www.fairbanksalaska.us/',
        external: true,
        note: 'Core municipality context',
      },
      {
        label: 'City of North Pole',
        href: 'https://www.northpolealaska.com/',
        external: true,
        note: 'Southern belt municipality context',
      },
      {
        label: '511 Alaska — traveler information',
        href: 'https://511.alaska.gov/',
        external: true,
        note: 'Parks / Richardson / Steese conditions before load windows',
      },
      {
        label: 'University of Alaska Fairbanks',
        href: 'https://www.uaf.edu/',
        external: true,
        note: 'Campus calendar and housing context',
      },
    ],
  },
  directoryHint:
    'Prefer crews with extreme-cold and ice-fog fluency; Downtown / UAF stair and multi-unit experience; honest Parks Highway · Richardson Highway · Steese Highway timing for North Pole and rural pairs; Fort Wainwright-adjacent gate and PCS fluency where applicable. Insist on Alaska business license details, written estimates, and insurance certificates for intrastate moves; verify FMCSA for Outside / interstate legs before deposits. This is Fairbanks North Star Borough / Interior Alaska — not Anchorage Bowl, not Mat-Su only, not Juneau ferry/air capital defaults.',
  lastReviewed: '2026-07-24',
});
