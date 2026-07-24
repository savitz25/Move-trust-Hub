import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAkPack,
  AK_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/alaska/ak-shared';

/**
 * City and Borough of Juneau, AK — capital, constrained road network, ferry/air reliance.
 * NOT Anchorage Southcentral Bowl, NOT Fairbanks Interior, NOT Mat-Su growth corridor.
 * Major corridors are local capital roads only — NO fake interstate highway string.
 */
export const juneauCountyAkIntelligence: CountyIntelligencePack = finalizeAkPack({
  countySlug: 'juneau',
  hubTitle: 'Juneau Moving Intelligence Hub',
  eyebrow:
    'City and Borough of Juneau, AK · capital / constrained roads & ferry / air logistics',
  h1: 'Moving in Juneau, AK: Capital, Constrained Road Network & Ferry / Air Reliance',
  heroOpener:
    'Juneau is Alaska’s capital and a Southeast constrained-road market — Downtown multi-unit and hillside walks, Douglas Island residential product, Mendenhall Valley growth and SFH belts, Auke Bay marine-adjacent edges, Lemon Creek mixed stock, and ferry/air logistics for anything that leaves the continuous local road network — not Anchorage municipal Bowl freeflow, not Fairbanks Interior extreme cold alone, and not Mat-Su Valley growth toward Anchorage. There is no continuous highway drive to Anchorage or the Lower 48; household goods that leave Juneau typically depend on Alaska Marine Highway ferry schedules, barges, or air cargo — not a fake interstate corridor string. Expect Egan Drive and Glacier Highway freeflow that rewrites “local” estimates inside the borough, winter ice and dark-season staging risk on grades, cruise-season curb pressure downtown, and Outside or interstate authority that needs FMCSA when household goods leave Alaska. A Downtown walk-up, a Douglas Island home, a Mendenhall Valley ranch, and a ferry-dependent long-distance job do not share truck access or crew skill. This hub is for people moving in the City and Borough of Juneau — capital plus ferry/air logistics — not a renamed Southcentral page.',
  heroCredibility:
    'Alaska business license + insurance for intrastate · FMCSA for Outside / interstate · Capital road constraints & ferry / air logistics awareness · Curated listings',
  majorCorridors: 'Egan Drive · Glacier Highway · local capital grid',
  whatMakesDifferent: {
    title: 'What makes moving in Juneau different',
    intro:
      'These are City and Borough of Juneau realities — capital multi-unit density, constrained continuous road network, Douglas and Mendenhall Valley product, Auke Bay and Lemon Creek belts, and ferry/air dependence for external moves — not Anchorage Glenn / Seward freeflow, not Fairbanks Interior freeze defaults, and not Mat-Su Parks / Glenn growth corridors.',
    bullets: [
      {
        title: 'This is Juneau capital + ferry/air — not Southcentral or Interior',
        detail:
          'Ignore Anchorage Bowl multi-unit templates, Mat-Su growth scripts, and Fairbanks extreme-cold-only defaults as if they were interchangeable “Alaska” logistics. Juneau is Southeast capital product with a constrained road network that does not connect by continuous highway to Anchorage or the continental interstate system. Match estimates to City and Borough of Juneau addresses and Alaska business-license / insurance controls — not Municipality of Anchorage, Matanuska-Susitna Borough, or Fairbanks North Star packets alone.',
      },
      {
        title: 'Constrained road network rewrites empty-mile assumptions',
        detail:
          'Local pairs ride Egan Drive, Glacier Highway, and the capital grid — not I-5-style freeflow and not Parks / Glenn Southcentral corridors. Cross-borough “local” jobs still burn portal time on hills, bridges, and weather, but Outside destinations require ferry, barge, or air — never invent an interstate highway string for Juneau.',
      },
      {
        title: 'Downtown multi-unit and hillside walks underprice flat-rate optimism',
        detail:
          'Elevator or walk-up packets, scarce curb during cruise season, steep approaches, and older character stock fail estimates more often than packing skill alone. Photo stairs, grades, and curb options early.',
      },
      {
        title: 'Douglas, Mendenhall Valley, Auke Bay, and Lemon Creek are different access stacks',
        detail:
          'Douglas Island bridge approaches, Valley subdivision product, Auke Bay marine-adjacent edges, and Lemon Creek mixed industrial-residential belts do not share truck length or labor with Downtown alone. Zone the job, do not zip-code it.',
      },
      {
        title: 'Ferry and air logistics dominate external moves',
        detail:
          'Household goods leaving Juneau typically depend on Alaska Marine Highway schedules, barge capacity, weather delays, and air-cargo constraints. Price ferry cutoffs, storage between legs, and weather contingency — not highway drive-time alone. Air and ferry are logistics modules, not local highway corridors.',
      },
      {
        title: 'Winter, cruise season & Outside pairs are routine complexity',
        detail:
          'Ice on grades, limited daylight, and cruise-season curb pressure reshape Downtown access. Outside or interstate legs need FMCSA when household goods leave Alaska. Alaska business license and insurance alone do not authorize interstate delivery.',
      },
      AK_REG_BULLET,
    ],
  },
  zonesHeading: 'Juneau access zones',
  zonesIntro:
    'Plan by Downtown Juneau multi-unit and capital core, Douglas Island product, Mendenhall Valley growth and SFH belts, Auke Bay marine-adjacent edges, Lemon Creek mixed stock, and ferry/air logistics edges where household goods leave the continuous local road network — access rules cluster by grade, island/valley product, and external mode more than ZIP alone.',
  zones: [
    {
      id: 'downtown-juneau',
      name: 'Downtown Juneau multi-unit, capital core & hillside walks',
      shortName: 'Downtown Juneau',
      neighborhoods: [
        'Downtown Juneau',
        'Capital complex edges',
        'Franklin / downtown corridors',
        'Hillside walk-up residential',
        'Cruise-adjacent multi-unit pockets',
        'Core commercial-adjacent stock',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, condo pockets, mixed commercial-adjacent',
      challenges: [
        'Multi-flight stairs, scarce curb, and cruise-season congestion',
        'Steep approaches and winter ice on downtown grades',
        'Elevator or building COIs where present; tight truck length',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week early starts outside cruise and legislative peaks when possible. Book elevators and COIs in writing. Photo curb staging options. Avoid late-day winter windows on icy grades.',
      cityKeywords: [
        'juneau',
        'downtown juneau',
      ],
    },
    {
      id: 'douglas',
      name: 'Douglas Island residential, bridge approaches & island belts',
      shortName: 'Douglas',
      neighborhoods: [
        'Douglas',
        'Douglas Highway corridors',
        'West Juneau / Douglas residential',
        'Island SFH and multi-unit pockets',
        'Bridge approach edges',
        'Douglas hillside product',
      ],
      housingTypes: 'SFH, multi-level homes, some multi-family, island residential stock',
      challenges: [
        'Bridge and approach freeflow to Downtown core',
        'Hillside grades, limited turnarounds, and winter ice',
        'Longer local empty miles vs pure Downtown pairs',
      ],
      moverTips:
        'Price bridge and approach time honestly for Downtown pairs. Photo driveway grades and turnarounds. Prefer daylight windows in winter. Confirm Douglas vs Downtown address labels on every estimate.',
      cityKeywords: [
        'douglas',
        'douglas alaska',
        'west juneau',
      ],
    },
    {
      id: 'mendenhall-valley',
      name: 'Mendenhall Valley growth, SFH belts & Glacier Highway product',
      shortName: 'Mendenhall Valley',
      neighborhoods: [
        'Mendenhall Valley',
        'Glacier Highway valley corridors',
        'Valley subdivision stock',
        'Mendenhall multi-unit pockets',
        'Airport-adjacent residential edges',
        'Northern valley SFH belts',
      ],
      housingTypes: 'SFH, ranch and two-story stock, townhomes, multi-family pockets',
      challenges: [
        'Glacier Highway / Egan freeflow to Downtown',
        'School-calendar peaks and mixed HOA or subdivision rules',
        'Winter ice and longer empty miles vs capital core',
      ],
      moverTips:
        'Collect HOA or subdivision packets early when present. Price Glacier Highway and Egan Drive portal-to-portal for Downtown pairs. Survey driveway width in ice. Align with school calendars when relevant.',
      cityKeywords: [
        'mendenhall',
        'mendenhall valley',
      ],
    },
    {
      id: 'auke-bay',
      name: 'Auke Bay marine-adjacent, ferry approach edges & northwest belts',
      shortName: 'Auke Bay',
      neighborhoods: [
        'Auke Bay',
        'Auke Bay ferry and harbor edges',
        'Northwest Glacier Highway residential',
        'Marine-adjacent SFH pockets',
        'University of Alaska Southeast edges',
        'Auke Lake residential edges',
      ],
      housingTypes: 'SFH, multi-level homes, limited multi-unit, marine-adjacent residential',
      challenges: [
        'Longer empty miles from Downtown via Glacier Highway',
        'Marine weather, grades, and limited turnarounds on some approaches',
        'Ferry-schedule adjacency without treating harbor roads as interstate corridors',
      ],
      moverTips:
        'Photo approach and turnaround conditions. Price Glacier Highway honestly. Coordinate carefully if household goods will transfer to ferry or barge nearby — treat that as a logistics leg, not a local corridor rename. Prefer weather-aware windows.',
      cityKeywords: [
        'auke bay',
        'auke lake',
      ],
    },
    {
      id: 'lemon-creek',
      name: 'Lemon Creek mixed stock, industrial-residential & mid-corridor belts',
      shortName: 'Lemon Creek',
      neighborhoods: [
        'Lemon Creek',
        'Lemon Creek industrial-residential edges',
        'Egan Drive mid-corridor stock',
        'Mixed multi-unit and SFH pockets',
        'Mid-borough commercial-adjacent residential',
        'Lemon Creek valley edges',
      ],
      housingTypes: 'Mixed SFH, multi-family, commercial-adjacent residential',
      challenges: [
        'Egan Drive freeflow and mixed truck routing near industrial edges',
        'Older multi-unit stairs and scarce curb on some streets',
        'Cross-zone empty miles between Downtown and Valley',
      ],
      moverTips:
        'Clarify Lemon Creek vs Downtown vs Valley addresses. Survey stair counts and curb options. Price Egan Drive freeflow for end-to-end pairs. Prefer mid-week starts away from industrial peak traffic when possible.',
      cityKeywords: [
        'lemon creek',
      ],
    },
    {
      id: 'ferry-air-logistics-edges',
      name: 'Ferry / air logistics edges — external household-goods handoffs',
      shortName: 'Ferry / air edges',
      neighborhoods: [
        'Alaska Marine Highway terminal approach edges',
        'Harbor and barge staging areas',
        'Juneau International Airport cargo-adjacent logistics',
        'Storage-between-legs facilities',
        'External-mode transfer points',
        'Weather-delay holding residential staging',
      ],
      housingTypes: 'Not a housing zone — logistics handoff edges for external moves',
      challenges: [
        'Ferry schedule cutoffs, weather cancellations, and barge capacity limits',
        'Air-cargo weight, size, and cost constraints for household goods',
        'Storage, double-handling, and insurance gaps between truck and vessel/aircraft legs',
      ],
      moverTips:
        'Treat ferry, barge, and air as separate logistics legs with written cutoffs — never as fake highway corridors. Confirm weather contingency, storage between legs, and which carrier holds cargo insurance at each handoff. Verify FMCSA for Outside/interstate authority when goods leave Alaska. Align local trucking windows to published AMHS or air-cargo schedules, not wishful drive times.',
      cityKeywords: [
        'juneau ferry',
        'alaska marine highway',
        'juneau airport',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Juneau moving costs',
    intro:
      'Downtown stairs and cruise-season curb, hillside and island grades, Egan / Glacier freeflow, winter ice, and ferry/air handoffs for external moves move the number more than packing skill alone — this is capital constrained-road and marine logistics, not Southcentral highway defaults.',
    drivers: [
      {
        title: 'Stairs, hillside walks & cruise-season curb scarcity',
        detail:
          'Downtown multi-unit and capital-core product add flight counts, tight truck length, and seasonal congestion that suburban flat rates underprice.',
      },
      {
        title: 'Douglas grades, Valley empty miles & local freeflow',
        detail:
          'Bridge approaches, Glacier Highway / Egan Drive pairs, and mid-corridor mixed stock burn portal-to-portal time even inside the continuous road network.',
      },
      {
        title: 'Winter ice, dark season & marine weather',
        detail:
          'Icy grades, limited daylight, and Southeast weather systems raise cancellation risk and crew premium. Winter is critical on hills and bridges.',
      },
      {
        title: 'Ferry, barge & air handoff labor',
        detail:
          'External moves add schedule cutoffs, double-handling, storage between legs, and weather delay risk. Price mode transfers honestly — they are not local highway miles.',
      },
      {
        title: 'Outside / interstate authority & long logistics chains',
        detail:
          'Any leg that leaves Alaska needs FMCSA verification. Multi-mode chains (local truck → ferry/barge/air → destination truck) multiply soft cost and insurance complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple local access)',
        value: '$600–$2,300+',
        note: 'Higher with walk-ups, ice, cruise-season curb, or long Valley pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,800–$5,500+',
        note: 'Stairs, grades, Douglas/Valley empty miles, and winter risk trend up',
      },
      {
        label: '3–4+ BR / cross-zone / ferry- or air-linked',
        value: '$3,500–$12,000+',
        note: 'External mode handoffs and multi-leg chains price highest',
      },
      {
        label: 'Typical 2-person crew rate (local trucking)',
        value: '$130–$230+/hr',
        note: 'Portal-to-portal local; ferry/air/barge and storage are separate cost lines',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Juneau move',
    intro:
      'Winter ice and dark season on grades, cruise-season curb pressure, legislative and capital calendar waves, ferry schedule reliability, and Southeast marine weather reshape access and crew availability across the City and Borough of Juneau. Winter is critical; ferry/air legs add their own seasonal reliability curves.',
    items: [
      {
        title: 'Best windows: mid-week early mornings outside cruise peaks when possible',
        detail:
          'Tuesday–Thursday starts clear curb and ease multi-unit freight windows. Shoulder seasons can balance ice risk, daylight, and cruise congestion better than mid-summer waterfront peaks or deep winter. Avoid month-end Fridays when leases and building slots collide.',
      },
      {
        title: 'Peak local pressure: late May–mid-September cruise and summer turnover',
        detail:
          'Cruise-season curb scarcity Downtown, family school calendars, and apartment turnover fill first. Book 2–4+ weeks ahead for peak weekends and elevator slots. Summer improves daylight but tightens downtown staging.',
      },
      {
        title: 'Winter critical: ice, snow, freeze–thaw & dark season on grades',
        detail:
          'October–March raise cancellation risk on hills, bridges, and stairs; limited daylight shortens safe outdoor windows. Prefer flexible dates, covered staging, and early starts. Confirm path clearing before crews arrive. Budget winter premium labor honestly for Downtown and Douglas grades.',
      },
      {
        title: 'Ferry / air schedule & marine weather contingency',
        detail:
          'External household-goods legs depend on Alaska Marine Highway schedules, barge capacity, air-cargo calendars, and marine weather cancellations. Build storage buffers and alternate dates. Never assume a continuous highway alternative exists out of Juneau.',
      },
    ],
  },
  specialized: [
    {
      id: 'juneau-capital-constrained-roads-module',
      title: 'Juneau capital constrained roads, grades & Egan / Glacier logistics module',
      intro:
        'City and Borough of Juneau estimates fail more often on stairs, hillside and island grades, cruise-season curb, Egan / Glacier freeflow, and winter ice than on packing skill alone — for local continuous-road jobs.',
      bullets: [
        'Survey stair counts, grades, and curb options for Downtown multi-unit before the survey is final; book elevators and COIs when required.',
        'Price portal-to-portal time for any pair that rides Egan Drive or Glacier Highway at peak or in ice — including Douglas and Mendenhall Valley pairs.',
        'Confirm Downtown, Douglas, Mendenhall Valley, Auke Bay, and Lemon Creek addresses on every estimate — capital labels hide different access stacks.',
        'Prefer mid-week early starts outside cruise and legislative peaks when curb is scarce.',
        'For pure in-state local jobs insist on Alaska business license details, written estimates, and insurance certificates.',
        'Never invent interstate freeway corridor strings for Juneau — local corridors are Egan Drive, Glacier Highway, and the capital grid.',
      ],
    },
    {
      id: 'ferry-air-not-southcentral-module',
      title: 'Ferry / air external logistics · not Southcentral highway module',
      intro:
        'A single “Alaska rate” collapses when Juneau capital and ferry/air logistics are confused with Anchorage Bowl freeflow, Mat-Su growth, or Fairbanks Interior cold defaults.',
      bullets: [
        'Do not price Juneau external moves like Anchorage Glenn / Seward highway pairs or Mat-Su Parks / Glenn reverse-commute defaults.',
        'State the market as City and Borough of Juneau / capital Southeast on every estimate — disambiguate from Municipality of Anchorage, Matanuska-Susitna Borough, and Fairbanks North Star Borough.',
        'Treat ferry, barge, and air as separate logistics legs with cutoffs, storage, and insurance handoffs — not as local highway corridors.',
        'Verify FMCSA for any Outside or interstate leg; Alaska business license alone is not interstate authority.',
        'Match cruise-season Downtown curb risk separately from Valley SFH jobs and from multi-mode external chains.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Juneau?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, capital employment, constrained geography, ferry/air travel reality, and housing character — then verify on district and hospital sites. No single ranking captures neighborhood fit across Downtown, Douglas, and Mendenhall Valley.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'The City and Borough of Juneau is primarily served by Juneau School District campuses spanning Downtown, Douglas, Mendenhall Valley, and related belts. Assignment is address-based — marketing neighborhood names do not guarantee a campus. University of Alaska Southeast adds higher-education and family relocation patterns near Auke Bay edges.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year. Capital employment transfers and legislative-session timing can also shape mid-year arrival patterns.',
          },
          {
            title: 'Research sources',
            detail:
              'Juneau School District boundary tools, Alaska Department of Education & Early Development data, and campus visits beat ranking screenshots alone — especially when comparing Downtown vs Douglas vs Mendenhall Valley product.',
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
              'Bartlett Regional Hospital and related Southeast specialty clinics anchor local care. Some complex specialty care still routes to Anchorage or Outside via air. Confirm insurance networks and medevac awareness for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times to Bartlett and clinics — Egan Drive and Glacier Highway freeflow plus icy grades change “nearby” on paper. Transfer records early. Douglas and Valley households should budget weather-delay buffers for appointments as well as move day.',
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
              'Expect Downtown multi-unit and hillside walks; Douglas Island SFH and multi-level homes; Mendenhall Valley subdivisions and multi-family; Auke Bay marine-adjacent stock; Lemon Creek mixed product. Land constraints and topography keep inventory tight relative to many Lower 48 markets.',
          },
          {
            title: 'Cost variation inside the borough',
            detail:
              'Purchase prices and rents vary by Downtown vs Valley vs Douglas location, multi-unit vs SFH, and view or grade product. Budget for heating, older-building repair risk, limited inventory, and competitive rental seasons near capital employment.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Steep approaches and limited staging may add practical rules beyond paper HOA packets. Read documents carefully before load day.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / capital multi-unit lifestyle',
            detail:
              'Suits people prioritizing walkability to capital employment and amenities — with stairs, cruise-season curb, and grade tradeoffs on move day.',
          },
          {
            title: 'Douglas Island living',
            detail:
              'Often appeals for island residential character and relative separation — with bridge freeflow and hillside geometry.',
          },
          {
            title: 'Mendenhall Valley living',
            detail:
              'Fits households seeking more suburban SFH product and schools — with Glacier Highway / Egan empty miles to Downtown.',
          },
          {
            title: 'Auke Bay / Lemon Creek living',
            detail:
              'Attracts people seeking marine-adjacent or mid-corridor value — with longer empty miles and mixed industrial-residential logistics in Lemon Creek.',
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
              'State capital government, tourism and cruise-season services, healthcare, education (including University of Alaska Southeast), fishing and marine support, and regional services concentrate demand across the borough.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak Egan Drive and Glacier Highway freeflow is real — including winter ice on grades and cruise-season Downtown pressure. There is no highway commute to Anchorage; travel Outside depends on air (and ferry for some coastal links). Test peak and winter local routes before choosing solely on rent or purchase price.',
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
              'Juneau is Alaska’s capital and a Southeast constrained-road community — Downtown hillside density, Douglas Island, Mendenhall Valley, ferry/air dependence for external travel — not Anchorage Southcentral freeflow, not Mat-Su growth corridor, and not Fairbanks Interior extremes.',
          },
          {
            title: 'Climate',
            detail:
              'Southeast maritime climate with cool summers, wet weather, winter ice and snow on grades, and limited mid-winter daylight. Plan outdoor staging, ice, and rain contingency as part of move-in — winter on hills is critical.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit in cruise season and off-season when possible — waterfront intensity changes dramatically. Capital calendars, school cycles, and ferry/air reliability reshape daily rhythm more than continuous-highway Southcentral defaults.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Juneau resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Alaska moves insist on written estimates, Alaska business license details, and insurance certificates; verify FMCSA for Outside/interstate legs before deposits. Ferry and air schedule pages matter when household goods leave the continuous local road network.',
    items: [
      {
        label: 'City and Borough of Juneau — official site',
        href: 'https://juneau.org/',
        external: true,
        note: 'Borough services & property context',
      },
      {
        label: 'Alaska Marine Highway System',
        href: 'https://dot.alaska.gov/amhs/',
        external: true,
        note: 'Ferry schedules & external household-goods logistics — not a local highway corridor',
      },
      {
        label: 'Juneau International Airport',
        href: 'https://juneau.org/airport',
        external: true,
        note: 'Air-cargo and Outside travel logistics context',
      },
      {
        label: '511 Alaska — traveler information',
        href: 'https://511.alaska.gov/',
        external: true,
        note: 'Egan / Glacier and regional road conditions before load windows',
      },
      {
        label: 'Bartlett Regional Hospital',
        href: 'https://www.bartletthospital.org/',
        external: true,
        note: 'Primary local hospital context',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Downtown stair, hillside, and cruise-season curb fluency; Douglas grade and bridge approach experience; Mendenhall Valley SFH and Glacier Highway / Egan Drive timing honesty; written ferry/barge/air handoff discipline for external moves — never fake interstate corridor strings. Insist on Alaska business license details, written estimates, and insurance certificates for intrastate local moves; verify FMCSA for Outside / interstate legs before deposits. This is City and Borough of Juneau capital + ferry/air — not Anchorage Southcentral, not Mat-Su growth, not Fairbanks Interior defaults.',
  lastReviewed: '2026-07-24',
});
