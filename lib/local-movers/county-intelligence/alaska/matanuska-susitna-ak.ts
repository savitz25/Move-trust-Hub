import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAkPack,
  AK_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/alaska/ak-shared';

/**
 * Matanuska-Susitna Borough, AK — Wasilla / Palmer growth corridor toward Anchorage,
 * Big Lake, Meadow Lakes, Willow edges, Parks / Glenn links.
 * NOT Anchorage municipal core, NOT Fairbanks Interior extremes, NOT Juneau ferry/air capital.
 */
export const matanuskaSusitnaCountyAkIntelligence: CountyIntelligencePack = finalizeAkPack({
  countySlug: 'matanuska-susitna',
  hubTitle: 'Matanuska-Susitna Borough Moving Intelligence Hub',
  eyebrow:
    'Matanuska-Susitna Borough, AK · Wasilla / Palmer growth & Parks / Glenn logistics',
  h1: 'Moving in Matanuska-Susitna, AK: Wasilla / Palmer Mat-Su Growth Toward Anchorage',
  heroOpener:
    'Matanuska-Susitna Borough is the Southcentral growth corridor — Wasilla commercial and residential density, Palmer agricultural-town and valley product, Big Lake recreation-adjacent housing, Meadow Lakes mixed belts, Willow and northern edges, and rural Mat-Su driveway stock — not Anchorage municipal Bowl multi-unit defaults, not Fairbanks Interior extreme cold alone, and not Juneau’s constrained ferry/air capital model. Expect Parks Highway freeflow and Glenn Highway links that rewrite “local” estimates when households reverse-commute to Anchorage, winter ice and dark-season staging risk, HOA and long-drive geometry on growth product, lake and rural access that underprices flat-rate optimism, and Outside or interstate legs that need FMCSA when household goods leave Alaska. A Wasilla multi-unit, a Palmer character SFH, a Big Lake cabin-style driveway, and a Willow rural edge do not share truck access or crew skill. This hub is for people moving in Matanuska-Susitna Borough — the growth corridor toward Anchorage — not a renamed Anchorage city page.',
  heroCredibility:
    'Alaska business license + insurance for intrastate · FMCSA for Outside / interstate · Mat-Su growth, Parks / Glenn & winter logistics awareness · Curated listings',
  majorCorridors: 'Parks Highway · Glenn Highway links · local Wasilla/Palmer grid',
  whatMakesDifferent: {
    title: 'What makes moving in Matanuska-Susitna different',
    intro:
      'These are Matanuska-Susitna Borough realities — Wasilla and Palmer growth product, Big Lake and Meadow Lakes belts, Willow and rural edges, Parks Highway freeflow, and Glenn Highway links toward Anchorage — not Anchorage city multi-unit defaults, not Fairbanks Interior freeze scripts alone, and not Juneau ferry/air capital constraints.',
    bullets: [
      {
        title: 'This is Mat-Su growth corridor — not Anchorage city, Fairbanks, or Juneau',
        detail:
          'Ignore Downtown Anchorage elevator-only templates, Fairbanks extreme-cold-only scripts, and Southeast capital ferry/air defaults. Mat-Su is the valley growth belt with Wasilla and Palmer cores, recreation-adjacent lake product, and long rural approaches. Match estimates to Matanuska-Susitna Borough addresses and Alaska business-license / insurance controls — not Municipality of Anchorage packets alone, Fairbanks North Star, or City and Borough of Juneau.',
      },
      {
        title: 'Wasilla and Palmer growth rewrites “suburban simple” jobs',
        detail:
          'HOA packets where present, long private drives, mixed municipal and borough rules, school-calendar peaks, and commercial-corridor curb scarcity dominate growth belts. A Palmer character home does not share the truck stack of a Wasilla multi-unit or a Willow gravel approach.',
      },
      {
        title: 'Big Lake, Meadow Lakes, and recreation-adjacent access underprice flat rates',
        detail:
          'Seasonal roads, long carries, limited turnarounds, cabin-style product, and winter ice fail estimates more often than packing skill alone. Photo approach width and freeze conditions early.',
      },
      {
        title: 'Parks Highway and Glenn Highway links burn portal time toward Anchorage',
        detail:
          'Wasilla ↔ Anchorage, Palmer ↔ Eagle River, or Meadow Lakes ↔ Bowl pairs look “regional local” and still burn 45–90+ minutes at peak — worse in ice, snow, and dark season. Price portal-to-portal honestly; this is growth-corridor logistics, not same-city freeflow.',
      },
      {
        title: 'Rural Mat-Su and Willow edges add empty miles and driveway risk',
        detail:
          'Gravel approaches, limited cell coverage, long empty miles between jobs, and mixed driveway geometry rewrite crew routing. Rural edge product is not interchangeable with Wasilla commercial-adjacent multi-unit.',
      },
      {
        title: 'Anchorage reverse commute & Outside pairs are routine',
        detail:
          'Households regularly move Mat-Su ↔ Anchorage for work, Mat-Su ↔ Fairbanks via Parks, or Outside via Anchorage air and highway networks. Alaska business license and insurance alone do not authorize interstate delivery — verify FMCSA when any leg leaves Alaska.',
      },
      AK_REG_BULLET,
    ],
  },
  zonesHeading: 'Matanuska-Susitna access zones',
  zonesIntro:
    'Plan by Wasilla core and commercial corridors, Palmer valley product, Big Lake recreation-adjacent belts, Meadow Lakes mixed growth, Willow and northern edges, and rural Mat-Su driveway stock — access rules cluster by growth product, lake/rural approaches, and Parks / Glenn freeflow more than ZIP alone.',
  zones: [
    {
      id: 'wasilla-core',
      name: 'Wasilla core, Parks Highway commercial & multi-unit belts',
      shortName: 'Wasilla',
      neighborhoods: [
        'Wasilla',
        'Parks Highway commercial corridors',
        'Wasilla multi-unit pockets',
        'Lucus / Trunk Road edges',
        'Wasilla lake-adjacent residential edges',
        'Central Mat-Su growth stock',
      ],
      housingTypes: 'Multifamily, townhomes, SFH, mixed commercial-adjacent stock',
      challenges: [
        'Elevator or walk-up packets and scarce curb near commercial corridors',
        'Parks Highway freeflow at peak and winter ice',
        'School-calendar and reverse-commute timing peaks',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early starts. Photo curb staging near commercial corridors. Price Parks Highway honestly for Anchorage-bound pairs. Clarify Wasilla city vs borough address labels.',
      cityKeywords: [
        'wasilla',
      ],
    },
    {
      id: 'palmer-valley',
      name: 'Palmer valley, agricultural-town character & Glenn links',
      shortName: 'Palmer',
      neighborhoods: [
        'Palmer',
        'Downtown Palmer edges',
        'Glenn Highway Palmer approach',
        'Palmer-Wasilla Highway corridors',
        'Valley SFH and character stock',
        'Palmer multi-unit pockets',
      ],
      housingTypes: 'Character SFH, ranch and two-story stock, some multi-family, agricultural-adjacent residential',
      challenges: [
        'Mixed driveway geometry and older character interiors',
        'Glenn / Palmer-Wasilla freeflow and empty miles to Wasilla or Anchorage',
        'State Fair and seasonal event pressure on curb and crews',
      ],
      moverTips:
        'Confirm Palmer vs Wasilla vs unincorporated borough addresses. Photo driveway turnarounds. Protect older interiors. Price Glenn and Parks links honestly for Anchorage reverse pairs. Avoid peak fair and festival windows when possible.',
      cityKeywords: [
        'palmer',
      ],
    },
    {
      id: 'big-lake',
      name: 'Big Lake recreation-adjacent, lake belts & seasonal access',
      shortName: 'Big Lake',
      neighborhoods: [
        'Big Lake',
        'Big Lake road corridors',
        'Lake-adjacent residential',
        'Recreation cabin and hybrid stock',
        'Southern Mat-Su lake belts',
        'Seasonal access edges',
      ],
      housingTypes: 'Lake SFH, cabin-style and hybrid stock, limited multi-unit, recreational residential',
      challenges: [
        'Long carries, limited turnarounds, and seasonal road or ice conditions',
        'Empty miles from Wasilla core and Parks Highway staging',
        'Winter freeze and summer recreation congestion both reshape access',
      ],
      moverTips:
        'Photo approach width, turnaround, and seasonal surface conditions. Prefer daylight windows. Plan shuttles when full vans cannot stage. Inventory outdoor and garage goods carefully. Price empty miles from Wasilla honestly.',
      cityKeywords: [
        'big lake',
      ],
    },
    {
      id: 'meadow-lakes',
      name: 'Meadow Lakes mixed growth, Parks approach & mid-valley belts',
      shortName: 'Meadow Lakes',
      neighborhoods: [
        'Meadow Lakes',
        'Parks Highway Meadow Lakes edges',
        'Mid-valley subdivision stock',
        'Mixed SFH growth belts',
        'Meadow Lakes multi-unit limited pockets',
        'Central valley arterial edges',
      ],
      housingTypes: 'SFH, ranch and two-story stock, some multi-family, mixed growth product',
      challenges: [
        'Parks Highway freeflow between Wasilla and points north/south',
        'Mixed driveway and HOA rules across short distances',
        'School-calendar peaks and reverse-commute timing',
      ],
      moverTips:
        'Collect HOA packets early when present. Clarify Meadow Lakes vs Wasilla vs Knik-Fairview style address labels. Price Parks Highway portal time for Anchorage pairs. Survey driveway width in ice.',
      cityKeywords: [
        'meadow lakes',
      ],
    },
    {
      id: 'willow-edges',
      name: 'Willow edges, northern Parks approaches & outlying growth',
      shortName: 'Willow edges',
      neighborhoods: [
        'Willow',
        'Willow Parks Highway edges',
        'Northern Mat-Su residential belts',
        'Outlying subdivision and cabin hybrid stock',
        'Willow creek and recreation edges',
        'Long empty-mile corridors north of Wasilla',
      ],
      housingTypes: 'Rural-residential SFH, cabin hybrid stock, limited multi-unit',
      challenges: [
        'Longer empty miles to Wasilla / Palmer cores',
        'Gravel or ice approaches and limited turnarounds',
        'Parks Highway weather freeflow and dark-season risk',
      ],
      moverTips:
        'Price empty miles honestly. Survey approach width and winter surface with photos. Prefer daylight windows. Confirm whether full vans can stage. Pack for freeze protection on long outdoor carries in shoulder and winter seasons.',
      cityKeywords: [
        'willow',
        'willow alaska',
      ],
    },
    {
      id: 'rural-matsu',
      name: 'Rural Mat-Su, Knik-Fairview edges & borough driveway product',
      shortName: 'Rural Mat-Su',
      neighborhoods: [
        'Knik-Fairview edges',
        'Rural Mat-Su driveway belts',
        'Unincorporated borough residential',
        'Agricultural-adjacent edges',
        'Southern and western rural product',
        'Long private-drive SFH corridors',
      ],
      housingTypes: 'Rural-residential SFH, agricultural-adjacent homes, limited multi-unit, long-drive stock',
      challenges: [
        'Private road and long-drive access rules',
        'Mixed borough addressing and longer staging distance',
        'Winter ice, mud season, and limited services on some approaches',
      ],
      moverTips:
        'Clarify unincorporated borough addresses carefully. Photo private road width, bridges, and turnarounds. Align with school calendars when relevant. Price cross-zone empty miles to Wasilla, Palmer, and Anchorage honestly.',
      cityKeywords: [
        'knik',
        'fairview',
        'mat-su',
        'matanuska',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Matanuska-Susitna moving costs',
    intro:
      'Growth-product HOA and driveway rules, lake and rural access, Parks / Glenn freeflow toward Anchorage, winter ice, and empty miles between valley edges move the number more than packing skill alone — this is Mat-Su growth-corridor logistics, not Anchorage city or Juneau ferry defaults.',
    drivers: [
      {
        title: 'HOA packets, long drives & mixed borough rules',
        detail:
          'Wasilla, Palmer, Meadow Lakes, and unincorporated growth product rewrite jobs that look simple on a map. Private roads and truck-length limits add soft cost.',
      },
      {
        title: 'Lake, cabin & rural approach labor',
        detail:
          'Big Lake, Willow edges, and rural Mat-Su add long carries, limited turnarounds, and seasonal surface risk that flat-rate suburban rates underprice.',
      },
      {
        title: 'Parks Highway · Glenn Highway links freeflow',
        detail:
          'Mat-Su ↔ Anchorage reverse pairs and cross-valley jobs burn portal-to-portal hours — worse in ice, snow, and dark season. This is growth-corridor distance, not same-city freeflow.',
      },
      {
        title: 'Winter ice, dark season & shoulder mud',
        detail:
          'Freeze risk, limited daylight, and spring mud on rural approaches raise cancellation risk and crew premium. Winter is critical across the valley.',
      },
      {
        title: 'Anchorage, Fairbanks & Outside empty miles',
        detail:
          'Anchorage reverse-commute destinations, Interior Parks Highway legs, and Outside air or long-haul destinations raise staging distance and authority complexity when leaving the borough or Alaska.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$2,000+',
        note: 'Higher with multi-unit, ice, or peak Parks / Glenn Anchorage pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,600–$5,000+',
        note: 'Drives, HOA, rural approaches, and winter risk trend up',
      },
      {
        label: '3–4+ BR / lake / rural / Anchorage reverse',
        value: '$3,000–$10,000+',
        note: 'Big Lake, Willow, rural edges, and long corridor pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$220+/hr',
        note: 'Portal-to-portal; packing, winter premium, empty miles, and shuttles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Matanuska-Susitna move',
    intro:
      'Winter ice and dark season, spring mud on rural approaches, summer recreation and school calendars, reverse-commute congestion toward Anchorage, and Parks / Glenn weather freeflow reshape access and crew availability across Matanuska-Susitna Borough.',
    items: [
      {
        title: 'Best windows: mid-week early mornings in shoulder seasons',
        detail:
          'Tuesday–Thursday starts clear curb and reduce Parks / Glenn pain when weather allows. Late spring and early fall often balance daylight, ice risk, and crew supply better than deep winter or peak summer recreation pressure. Avoid month-end Fridays when leases and HOA slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars, apartment and growth-product turnover, summer recreation congestion near lakes, and Anchorage reverse-commute pressure fill first. Book 2–4+ weeks ahead for peak weekends and long Anchorage pairs. Tourism and outdoor season also tighten crew supply.',
      },
      {
        title: 'Winter critical: ice, snow, freeze–thaw & dark season',
        detail:
          'October–March (and often into April on shaded and rural drives) raise cancellation risk, slower freeflow, stair and curb hazards, and limited daylight. Prefer flexible dates, covered staging, freeze-protection packing, and early starts. Confirm driveway and private-road plowing before crews arrive. Budget winter premium labor honestly.',
      },
      {
        title: 'Mud season, wind & shoulder contingency',
        detail:
          'Spring mud on rural and lake approaches can block trucks that handled winter ice fine. Prefer contingency buffers on Willow, Big Lake, and unincorporated long-drive product when forecasts degrade.',
      },
    ],
  },
  specialized: [
    {
      id: 'matsu-growth-corridor-module',
      title: 'Mat-Su growth corridor, lake/rural & Parks / Glenn logistics module',
      intro:
        'Matanuska-Susitna Borough estimates fail more often on driveway and HOA packets, lake/rural approaches, winter ice, and Parks / Glenn freeflow toward Anchorage than on packing skill alone.',
      bullets: [
        'Collect HOA packets, private-road rules, and truck-length limits for Wasilla, Palmer, Meadow Lakes, and unincorporated growth product early.',
        'Photo Big Lake, Willow, and rural approach width, turnaround, and seasonal surface — plan shuttles when full vans cannot stage.',
        'Price portal-to-portal time for any pair that rides Parks Highway or Glenn Highway links at peak or in ice — especially Mat-Su ↔ Anchorage reverse pairs.',
        'Confirm Wasilla, Palmer, Big Lake, Meadow Lakes, Willow, and unincorporated borough addresses on every estimate.',
        'Align school-calendar peaks separately from pure mid-week relocation windows.',
        'For pure in-state jobs insist on Alaska business license details, written estimates, and insurance certificates; verify FMCSA for any Outside or interstate leg.',
      ],
    },
    {
      id: 'not-anchorage-city-not-fairbanks-not-juneau',
      title: 'Not Anchorage city · not Fairbanks Interior · not Juneau ferry/air module',
      intro:
        'A single “Alaska rate” collapses when Mat-Su growth-corridor product is confused with Anchorage municipal multi-unit, Fairbanks extreme cold alone, or Juneau’s constrained capital road-plus-ferry model.',
      bullets: [
        'Do not price Wasilla multi-unit or Palmer character stock like Downtown Anchorage elevators or like Fairbanks deep-cold logistics as interchangeable defaults.',
        'State the market as Matanuska-Susitna Borough / Mat-Su Valley growth corridor on every estimate — disambiguate from Municipality of Anchorage city product, Fairbanks North Star Borough, and City and Borough of Juneau.',
        'Keep Anchorage reverse pairs clear — Glenn / Parks links make them routine but not “same city.”',
        'Match lake and rural edge logistics separately from Wasilla commercial-corridor multi-unit.',
        'Note air and ferry only where household goods actually leave the continuous road network — do not invent interstate freeway strings for Mat-Su local jobs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Matanuska-Susitna?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, Anchorage commute realism, and winter readiness — then verify on district and hospital sites. No single ranking captures neighborhood fit across Wasilla, Palmer, Big Lake, and rural edges.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Matanuska-Susitna Borough is primarily served by Matanuska-Susitna Borough School District campuses spanning Wasilla, Palmer, and outlying valley belts. Assignment is address-based — marketing neighborhood names do not guarantee a campus. Families reverse-commuting to Anchorage should still confirm Mat-Su enrollment zones carefully.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and growth-area boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year. Growth pressure in Wasilla–Palmer corridors can shift capacity expectations over short horizons.',
          },
          {
            title: 'Research sources',
            detail:
              'Borough school district boundary tools, Alaska Department of Education & Early Development data, and campus visits beat ranking screenshots alone — especially when comparing Palmer vs Wasilla vs outlying lake and rural product.',
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
              'Mat-Su Regional Medical Center and related valley clinics anchor local care; many households also use Anchorage specialty systems for complex care. Confirm insurance networks and referral paths for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times to Mat-Su Regional and to preferred Anchorage campuses — Parks and Glenn freeflow change “nearby” on paper. Transfer records early. Rural, Big Lake, and Willow households should budget weather-delay buffers for appointments as well as move day.',
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
              'Expect Wasilla multi-unit and commercial-adjacent stock; Palmer character and valley SFH; Big Lake recreation-adjacent homes; Meadow Lakes mixed growth; Willow and rural long-drive product; agricultural-adjacent edges.',
          },
          {
            title: 'Cost variation inside the borough',
            detail:
              'Purchase prices and rents vary by proximity to Wasilla–Palmer cores, lake recreation amenities, school zones, and Anchorage commute tolerance. Budget for winter heating, private-road maintenance, HOA dues where present, and competitive rental seasons near employment corridors.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Private roads and long drives may add access rules. Read documents carefully before load day.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Wasilla core / multi-unit lifestyle',
            detail:
              'Suits people prioritizing services, employment access, and shorter valley trips — with commercial-corridor curb and Parks freeflow tradeoffs on move day.',
          },
          {
            title: 'Palmer valley character living',
            detail:
              'Often appeals for small-city feel and valley setting — with driveway geometry and Glenn link freeflow toward Anchorage.',
          },
          {
            title: 'Big Lake / Meadow Lakes belts',
            detail:
              'Fits households seeking recreation-adjacent or mid-valley space — with seasonal access, empty miles, and winter ice risk.',
          },
          {
            title: 'Willow / rural Mat-Su living',
            detail:
              'Attracts people seeking outlying space and quieter edges — with long approaches, gravel or ice risk, and longer empty miles to cores.',
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
              'Local retail and services, government, healthcare, construction and trades, tourism and recreation seasonality, agriculture-adjacent work, and heavy reverse-commute employment in Anchorage concentrate demand across the borough.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak Parks Highway and Glenn Highway freeflow toward Anchorage is the defining Mat-Su commute story — including winter slowdowns and dark-season risk. Test peak and winter routes before choosing solely on rent or purchase price. Many households accept longer portal times in exchange for space and housing cost tradeoffs.',
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
              'Matanuska-Susitna is the Southcentral growth corridor — Wasilla–Palmer density, lake recreation product, rural edges, and Anchorage reverse-commute culture — not Anchorage city multi-unit alone, not Fairbanks Interior extremes, and not Juneau’s capital ferry/air isolation.',
          },
          {
            title: 'Climate',
            detail:
              'Southcentral / continental-influenced valley climate with cold winters, freeze–thaw shoulders, limited winter daylight, and milder summers than Interior Alaska. Plan outdoor staging, ice, snow, mud season, and dark-season contingency as part of move-in — winter is critical.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak commute and off-peak times when deciding — school calendars, recreation summers, and winter weather reshape daily rhythm. Outdoor access is a major lifestyle driver; move logistics must still respect long drives, ice, and Parks / Glenn freeflow.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Matanuska-Susitna resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Alaska moves insist on written estimates, Alaska business license details, and insurance certificates; verify FMCSA for Outside/interstate legs before deposits.',
    items: [
      {
        label: 'Matanuska-Susitna Borough — official site',
        href: 'https://www.matsugov.us/',
        external: true,
        note: 'Borough services & property context',
      },
      {
        label: 'City of Wasilla',
        href: 'https://www.cityofwasilla.com/',
        external: true,
        note: 'Largest Mat-Su municipality context',
      },
      {
        label: 'City of Palmer',
        href: 'https://www.palmerak.org/',
        external: true,
        note: 'Valley municipality context',
      },
      {
        label: '511 Alaska — traveler information',
        href: 'https://511.alaska.gov/',
        external: true,
        note: 'Parks / Glenn conditions before load windows',
      },
      {
        label: 'Mat-Su Regional Medical Center',
        href: 'https://www.matsuregional.com/',
        external: true,
        note: 'Primary valley hospital context',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Wasilla multi-unit and commercial-corridor fluency; Palmer character and driveway experience; Big Lake / Willow / rural approach and shuttle skill; honest Parks Highway · Glenn Highway link timing for Anchorage reverse pairs; winter ice and dark-season readiness. Insist on Alaska business license details, written estimates, and insurance certificates for intrastate moves; verify FMCSA for Outside / interstate legs before deposits. This is Matanuska-Susitna Borough growth corridor — not Anchorage city alone, not Fairbanks Interior, not Juneau ferry/air capital defaults.',
  lastReviewed: '2026-07-24',
});
