import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKyPack,
  KY_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kentucky/ky-shared';

/**
 * Fayette County, KY — Lexington / Bluegrass horse-country / UK university.
 * NOT Louisville (Jefferson). NOT Northern Kentucky Cincinnati collar.
 */
export const fayetteCountyKyIntelligence: CountyIntelligencePack = finalizeKyPack({
  countySlug: 'fayette',
  hubTitle: 'Fayette County Moving Intelligence Hub',
  eyebrow:
    'Fayette County · Lexington horse-country, UK campus cycles & New Circle logistics',
  h1: 'Moving in Fayette County: Lexington Access, UK Campus Cycles & Horse-Country Corridors',
  heroOpener:
    'Fayette County, Kentucky is Lexington’s Bluegrass core — not Louisville Jefferson product, not Covington riverfront NKY stock, and not a generic I-75 truck-stop clone. Expect downtown and University of Kentucky multi-unit density, Chevy Chase and Ashland Park character stock, Hamburg and Masterson Station growth HOAs, and I-64 / I-75 / US-60 / US-27 / New Circle freeflow that rewrites “local” estimates. A downtown loft elevator, a near-campus walk-up stair stack, a horse-farm edge long driveway, and a Tates Creek HOA cul-de-sac do not share truck access or crew skill. Campus lease waves and Bluegrass weather are real inputs. This hub is for people moving in Fayette County — Lexington horse-country and UK cycles — not a renamed Louisville page.',
  heroCredibility:
    'KYTC Division of Motor Carriers household goods certificate for intrastate · FMCSA for interstate · Lexington campus & New Circle logistics awareness · Curated listings',
  majorCorridors: 'I-64 · I-75 · US-60 · US-27 · New Circle corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Fayette County different',
    intro:
      'These are Lexington and Bluegrass realities — UK multi-unit, New Circle freeflow, horse-country approaches, and growth HOAs — not Louisville I-264 product and not Northern Kentucky I-275 collar logistics.',
    bullets: [
      {
        title: 'Lexington horse-country is not Louisville Jefferson product',
        detail:
          'Ignore Waterfront tower defaults and Watterson Expressway templates. Fayette stacks UK campus density, New Circle belts, and farm-edge driveways with different empty-mile and access patterns than Jefferson County, KY.',
      },
      {
        title: 'University of Kentucky lease waves rewrite calendars and labor',
        detail:
          'Near-campus walk-ups, limited elevators, and August/January turnover compress demand. Flat-rate optimism from Hamburg HOA driveways underprices stair counts and curb scarcity.',
      },
      {
        title: 'Downtown and Chevy Chase product is not Hamburg growth product',
        detail:
          'Lofts, older multi-unit, and tight curb differ from Masterson Station and Tates Creek HOA packets. Same-county jobs still need product-specific surveys.',
      },
      {
        title: 'I-64, I-75, US-60, US-27, and New Circle burn portal time',
        detail:
          'Downtown ↔ Hamburg, campus ↔ Beaumont, or south Lexington ↔ north New Circle pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Horse-farm edges and long driveways rewrite access',
        detail:
          'Rural-edge and farm-adjacent approaches add pitch, soft shoulders, gate codes, and turnaround limits that in-town ranch optimism underprices.',
      },
      {
        title: 'Multi-county Bluegrass and interstate pairs are routine',
        detail:
          'Households regularly move Fayette ↔ Jessamine, Scott, Madison, or Woodford County, or out-of-state on I-64 / I-75. A Kentucky household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Kentucky.',
      },
      KY_REG_BULLET,
    ],
  },
  zonesHeading: 'Fayette County access zones',
  zonesIntro:
    'Plan by downtown multi-unit, UK campus-adjacent stock, Chevy Chase–Ashland Park character grids, Hamburg–east growth HOAs, south Tates Creek–Beaumont belts, and north New Circle commercial–residential edges.',
  zones: [
    {
      id: 'downtown-lexington',
      name: 'Downtown Lexington, Rupp corridor & commercial-core multi-unit',
      shortName: 'Downtown',
      neighborhoods: [
        'Downtown Lexington',
        'Rupp Arena edges',
        'Short Street corridors',
        'Cheapside edges',
        'North Limestone edges',
        'Constitution edges',
      ],
      housingTypes: 'Loft conversions, mid-rise multifamily, limited elevators, older SFH',
      challenges: [
        'Elevator/COI where present and scarce curb',
        'Event and game-day freeflow',
        'US-27 / local arterial congestion',
      ],
      moverTips:
        'Book elevators early when present. Prefer mid-week non-event starts. Photo curb options on commercial-adjacent blocks.',
      cityKeywords: [
        'lexington',
        'downtown lexington',
      ],
    },
    {
      id: 'uk-campus-belt',
      name: 'University of Kentucky campus-adjacent multi-unit',
      shortName: 'UK campus belt',
      neighborhoods: [
        'UK campus edges',
        'Euclid Avenue corridors',
        'Avenue of Champions edges',
        'Student multi-unit belts',
        'South Limestone corridors',
        'University Drive edges',
      ],
      housingTypes: 'Walk-up multifamily, duplexes, limited elevators, student-oriented stock',
      challenges: [
        'August and January lease-end volume spikes',
        'Multi-flight stairs and scarce truck length',
        'Campus-event and game-day curb shrinkage',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts outside move-in weekends. Inventory basements carefully.',
      cityKeywords: [
        'lexington',
        'university of kentucky',
        'uk campus',
      ],
    },
    {
      id: 'chevy-chase-ashland',
      name: 'Chevy Chase, Ashland Park & near-east character stock',
      shortName: 'Chevy Chase / Ashland',
      neighborhoods: [
        'Chevy Chase',
        'Ashland Park',
        'Hollywood-Calumet edges',
        'Bell Court edges',
        'East High Street corridors',
        'Fontaine edges',
      ],
      housingTypes: 'Older SFH, bungalows, multi-unit pockets, character stock',
      challenges: [
        'Stairs, basements, and tighter residential curb',
        'Tree-lined blocks with limited truck turnaround',
        'Local arterial freeflow toward New Circle',
      ],
      moverTips:
        'Photo driveway pitch and stair entries. Prefer mid-week starts. Clarify address lines carefully on estimates.',
      cityKeywords: [
        'chevy chase',
        'ashland park',
        'lexington',
      ],
    },
    {
      id: 'hamburg-east-growth',
      name: 'Hamburg, Masterson Station & east/north growth HOAs',
      shortName: 'Hamburg / Masterson',
      neighborhoods: [
        'Hamburg',
        'Masterson Station',
        'Brighton East edges',
        'Andover edges',
        'Polo Club edges',
        'Man o’ War east corridors',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-75 / New Circle freeflow and longer empty miles vs downtown',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price New Circle / I-75 honestly for westbound unload pairs.',
      cityKeywords: [
        'hamburg',
        'masterson station',
        'lexington',
        'andover',
      ],
    },
    {
      id: 'south-tates-creek-beaumont',
      name: 'Tates Creek, Beaumont & south Lexington multi-family',
      shortName: 'South / Tates Creek',
      neighborhoods: [
        'Tates Creek corridors',
        'Beaumont',
        'Palomar edges',
        'Firebrook edges',
        'Hartland edges',
        'Man o’ War south corridors',
      ],
      housingTypes: 'Multi-family, HOA SFH, townhomes, ranch stock',
      challenges: [
        'US-27 / New Circle freeflow',
        'HOA and multi-unit mix',
        'Longer empty miles vs campus core',
      ],
      moverTips:
        'Collect building rules early. Price Man o’ War and New Circle honestly. Clarify multi-unit vs SFH access on the survey.',
      cityKeywords: [
        'beaumont',
        'tates creek',
        'lexington',
        'palomar',
      ],
    },
    {
      id: 'north-new-circle-farm-edge',
      name: 'North New Circle, Georgetown Road & farm-edge approaches',
      shortName: 'North / farm edge',
      neighborhoods: [
        'North New Circle corridors',
        'Georgetown Road corridors',
        'Coldstream edges',
        'Green Acres edges',
        'Horse-farm edge pockets',
        'I-75 north approaches',
      ],
      housingTypes: 'SFH, larger lots, farm-edge approaches, limited multi-unit',
      challenges: [
        'Long driveways, soft shoulders, and gate codes',
        'I-75 / New Circle freeflow',
        'Weather-sensitive gravel and farm approaches',
      ],
      moverTips:
        'Photo driveway pitch, width, and turnarounds. Prefer smaller trucks when approaches are tight. Plan weather contingency on soft edges.',
      cityKeywords: [
        'lexington',
        'coldstream',
        'georgetown road',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Fayette County moving costs',
    intro:
      'Campus access product, HOA admin, horse-farm approaches, and New Circle / I-75 freeflow move the number more than packing skill alone — this is Lexington logistics, not Louisville I-264 pricing.',
    drivers: [
      {
        title: 'Campus walk-ups, stairs & lease-wave density',
        detail:
          'UK-adjacent multi-unit adds flight counts and month-end volume that suburban HOA optimism underprices.',
      },
      {
        title: 'Elevator/COI & downtown curb scarcity',
        detail:
          'Core vertical product and event freeflow add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'I-64 · I-75 · US-60 · US-27 · New Circle congestion',
        detail:
          'Cross-city pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA gates & growth-belt truck rules',
        detail:
          'Hamburg, Masterson Station, and south multi-family packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Farm-edge driveways & multi-county empty miles',
        detail:
          'Horse-country approaches and Jessamine / Scott / Madison destinations raise staging distance and access complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with campus stairs, elevators, or peak New Circle pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,200+',
        note: 'Stairs, COI, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / campus peak / cross-zone',
        value: '$2,800–$8,500+',
        note: 'Lease-wave and long I-75 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Fayette County move',
    intro:
      'UK lease cycles, school calendars, Keeneland and event freeflow, summer heat, severe-storm season, and winter ice reshape access and crew availability across Lexington.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce New Circle / I-75 pain. Avoid month-end Fridays and campus move-in weekends when flexible.',
      },
      {
        title: 'Peak season: late May–mid-September (campus spike August)',
        detail:
          'Apartment turnover and family school calendars fill first; UK move-in compresses near-campus product. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'Event, Keeneland & game-day freeflow',
        detail:
          'Race meets, basketball and football calendars, and downtown events shrink curb and raise arterial delays. Prefer non-event starts near the core.',
      },
      {
        title: 'Summer heat, storms & winter ice',
        detail:
          'June–August heat and thunderstorms raise cancellation risk; winter ice affects farm edges and stoops. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'fayette-uk-new-circle',
      title: 'UK campus, New Circle & horse-country logistics module',
      intro:
        'Fayette County estimates fail more often on stair surveys, campus calendar collisions, HOA gates, and New Circle freeflow than on packing skill alone.',
      bullets: [
        'Survey stair counts and curb options with photos for campus-adjacent and Chevy Chase stock.',
        'Avoid UK move-in/move-out weekends when flexible; price month-end density honestly.',
        'Price portal-to-portal time for any pair that rides I-64, I-75, US-60, US-27, or New Circle at peak.',
        'Collect HOA packets early for Hamburg, Masterson Station, and south multi-family product.',
        'Photo farm-edge driveway pitch, gates, and turnarounds before finalizing crew size.',
        'For in-state jobs verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-louisville-not-nky',
      title: 'Not Louisville · not Northern Kentucky module',
      intro:
        'A single “Kentucky metro rate” collapses when Lexington horse-country product is confused with Jefferson County Louisville logistics or Kenton/Boone Cincinnati-collar freeflow.',
      bullets: [
        'Do not price UK walk-ups like NuLu elevators or like Covington riverfront stairs as interchangeable defaults.',
        'Keep Fayette vs Jessamine / Scott / Madison / Woodford county lines clear on multi-address estimates.',
        'Match campus lease peaks separately from Hamburg school-calendar waves.',
        'Treat interstate legs as FMCSA authority problems — KYTC alone is not enough out of state. Do not substitute OH PUCO for Kentucky intrastate work.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Fayette County?',
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
              'Fayette County Public Schools covers the consolidated city-county. Assignment is address-based — marketing neighborhood names do not guarantee a campus. UK and other higher-ed options shape adult education patterns separately.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'FCPS boundary tools, Kentucky Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'UK HealthCare / Albert B. Chandler Hospital, Baptist Health Lexington, Saint Joseph Hospital, and specialty campuses anchor care across Fayette County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — New Circle and I-75 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown multi-unit; UK campus walk-ups; Chevy Chase and Ashland Park character SFH; Hamburg and Masterson Station HOA growth; south multi-family; farm-edge larger lots on the fringe.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by belt and product. Budget for HOA dues, older-building repair risk, and parking near campus where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / near-core urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with curb limits and event-day tradeoffs on move day.',
          },
          {
            title: 'UK campus-adjacent living',
            detail:
              'Often appeals for students and staff — with stairs, lease-wave density, and game-day constraints.',
          },
          {
            title: 'Chevy Chase / Ashland Park character living',
            detail:
              'Attracts households seeking established neighborhood feel — with tighter staging and older-stock logistics.',
          },
          {
            title: 'Hamburg / Masterson / south growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to the core.',
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
              'University of Kentucky and healthcare, education, professional services, horse industry and agribusiness, manufacturing, and logistics on I-64 / I-75 concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak New Circle and I-75 freeflow is real — including reverse commutes toward Toyota and other Bluegrass employers outside the county. Test peak routes before choosing solely on rent or purchase price.',
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
              'Fayette County stacks Lexington urban cores, campus energy, Bluegrass horse-country edges, and growth suburbs — different from Louisville Jefferson product and Northern Kentucky Cincinnati-collar patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical climate with hot summers, severe-storm risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in — especially on farm edges.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — UK calendars, Keeneland meets, basketball and football weekends, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Fayette County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KYTC Division of Motor Carriers household goods licensing for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Lexington-Fayette Urban County Government',
        href: 'https://www.lexingtonky.gov/',
        external: true,
        note: 'City-county services, permits & neighborhood context',
      },
      {
        label: 'Fayette County Public Schools',
        href: 'https://www.fcps.net/',
        external: true,
        note: 'Enrollment & boundary research',
      },
      {
        label: 'University of Kentucky',
        href: 'https://www.uky.edu/',
        external: true,
        note: 'Campus calendar & housing-adjacent context',
      },
      {
        label: 'GOKY — Kentucky 511 traveler info',
        href: 'https://goky.ky.gov/',
        external: true,
        note: 'I-64 / I-75 / New Circle before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with campus stair fluency for UK-adjacent multi-unit; curb and character-stock experience for Chevy Chase–Ashland Park; HOA gate fluency for Hamburg–Masterson–south growth; farm-edge approach skill for horse-country driveways; honest I-64 · I-75 · US-60 · US-27 · New Circle timing for cross-zone pairs. Verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR) for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
