import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKyPack,
  KY_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kentucky/ky-shared';

/**
 * Warren County, KY — Bowling Green / south-central regional hub.
 * NOT Louisville south. NOT Nashville spillover as the default narrative.
 */
export const warrenCountyKyIntelligence: CountyIntelligencePack = finalizeKyPack({
  countySlug: 'warren',
  hubTitle: 'Warren County Moving Intelligence Hub',
  eyebrow:
    'Warren County · Bowling Green regional core, WKU cycles & I-65 logistics',
  h1: 'Moving in Warren County: Bowling Green Access, WKU Campus Cycles & I-65 Regional Corridors',
  heroOpener:
    'Warren County, Kentucky is Bowling Green’s south-central regional hub — not Louisville south, not Lexington horse-country, and not a Nashville spillover clone as the default narrative. Expect downtown and Western Kentucky University multi-unit density, Scottsville Road and Greenwood growth product, Plano and Plano Road HOA edges, industrial-adjacent stock near the GM Corridor, and I-65 / US-31W / US-68 freeflow that rewrites “local” estimates. A near-campus walk-up stair stack, a downtown loft curb limit, a south HOA driveway, and a rural-edge approach do not share truck access or crew skill. Campus lease waves and regional empty miles are real inputs. This hub is for people moving in Warren County — Bowling Green regional logistics — not a renamed Louisville page.',
  heroCredibility:
    'KYTC Division of Motor Carriers household goods certificate for intrastate · FMCSA for interstate · Bowling Green regional & WKU logistics awareness · Curated listings',
  majorCorridors: 'I-65 · US-31W · US-68 · local Bowling Green grid',
  whatMakesDifferent: {
    title: 'What makes moving in Warren County different',
    intro:
      'These are Bowling Green and south-central Kentucky realities — WKU multi-unit, I-65 freeflow, and regional growth product — not Louisville I-264 loops and not Northern Kentucky Cincinnati-collar logistics.',
    bullets: [
      {
        title: 'Bowling Green is a south-central regional hub — not Louisville south',
        detail:
          'Ignore Jefferson County East End HOA templates and Watterson Expressway freeflow defaults. Corridors, housing mix, and empty-mile patterns are I-65 mid-Kentucky specific between Louisville and Nashville.',
      },
      {
        title: 'Western Kentucky University lease waves rewrite calendars and labor',
        detail:
          'Near-campus walk-ups, limited elevators, and August/January turnover compress demand. Flat-rate optimism from Greenwood HOA driveways underprices stair counts and curb scarcity.',
      },
      {
        title: 'Downtown multi-unit is not south growth HOA product',
        detail:
          'Lofts, older multi-unit, and tight curb differ from Scottsville Road and Plano HOA packets. Same-county jobs still need product-specific surveys.',
      },
      {
        title: 'I-65, US-31W, and US-68 turn short pairs into billable hours',
        detail:
          'Downtown ↔ Greenwood, campus ↔ industrial corridor, or north BG ↔ Plano pairs look local and still burn portal time at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Automotive and industrial corridors reshape some approaches',
        detail:
          'Shift-change freeflow and commercial traffic near major employers rewrite timing that pure residential optimism underprices.',
      },
      {
        title: 'Regional multi-county and interstate pairs are routine',
        detail:
          'Households regularly move Warren ↔ Barren, Allen, Simpson, or Edmonson County, or out-of-state on I-65 toward Tennessee. A Kentucky household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Kentucky. Do not substitute TN credentials for KYTC on Kentucky intrastate work.',
      },
      KY_REG_BULLET,
    ],
  },
  zonesHeading: 'Warren County access zones',
  zonesIntro:
    'Plan by downtown multi-unit, WKU campus-adjacent stock, Greenwood–Scottsville Road growth, north US-31W belts, industrial-corridor residential edges, and rural larger-lot fringe product.',
  zones: [
    {
      id: 'downtown-bowling-green',
      name: 'Downtown Bowling Green & commercial-core multi-unit',
      shortName: 'Downtown BG',
      neighborhoods: [
        'Downtown Bowling Green',
        'Fountain Square edges',
        'State Street corridors',
        'College Street edges',
        'Historic core residential',
        'Commercial-core multi-unit',
      ],
      housingTypes: 'Loft conversions, walk-up multifamily, limited elevators, older SFH',
      challenges: [
        'Elevator/COI where present and scarce curb',
        'Event and entertainment freeflow',
        'Local arterial congestion toward campus',
      ],
      moverTips:
        'Book elevators early when present. Prefer mid-week starts. Photo curb options on commercial-adjacent blocks.',
      cityKeywords: [
        'bowling green',
        'downtown bowling green',
      ],
    },
    {
      id: 'wku-campus-belt',
      name: 'Western Kentucky University campus-adjacent multi-unit',
      shortName: 'WKU campus belt',
      neighborhoods: [
        'WKU campus edges',
        'Normal Drive corridors',
        'University multi-unit belts',
        'College Heights edges',
        'Regents Avenue edges',
        'Student housing corridors',
      ],
      housingTypes: 'Walk-up multifamily, duplexes, limited elevators, student-oriented stock',
      challenges: [
        'August and January lease-end volume spikes',
        'Multi-flight stairs and scarce truck length',
        'Campus-event curb shrinkage',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts outside move-in weekends. Inventory basements carefully.',
      cityKeywords: [
        'bowling green',
        'western kentucky university',
        'wku',
      ],
    },
    {
      id: 'greenwood-scottsville',
      name: 'Greenwood, Scottsville Road & south growth multi-family',
      shortName: 'Greenwood / south',
      neighborhoods: [
        'Greenwood',
        'Scottsville Road corridors',
        'Nashville Road edges',
        'South HOA pockets',
        'Campbell Lane edges',
        'Southern multi-family belts',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch stock',
      challenges: [
        'HOA packets and truck-length limits where present',
        'I-65 / Scottsville Road freeflow',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets early. Price I-65 honestly for northbound unload pairs. Clarify multi-unit vs SFH access.',
      cityKeywords: [
        'bowling green',
        'greenwood',
        'scottsville road',
      ],
    },
    {
      id: 'north-us31w',
      name: 'North Bowling Green, US-31W & commercial-residential belts',
      shortName: 'North / US-31W',
      neighborhoods: [
        'North Bowling Green corridors',
        'US-31W corridors',
        'Louisville Road edges',
        'North multi-unit pockets',
        'Commercial-residential mix',
        'I-65 north approaches',
      ],
      housingTypes: 'Multi-family, ranch SFH, commercial-adjacent residential',
      challenges: [
        'US-31W / I-65 freeflow',
        'Retail and industrial traffic spikes',
        'Mixed curb product',
      ],
      moverTips:
        'Price US-31W honestly. Confirm commercial-adjacent staging limits. Prefer off-peak starts when flexible.',
      cityKeywords: [
        'bowling green',
        'louisville road',
      ],
    },
    {
      id: 'industrial-gm-corridor',
      name: 'Industrial corridor & employment-adjacent residential edges',
      shortName: 'Industrial corridor',
      neighborhoods: [
        'Industrial park edges',
        'Three Springs edges',
        'Lovers Lane corridors',
        'Employment-adjacent residential',
        'East BG industrial-residential mix',
        'Corridor multi-unit pockets',
      ],
      housingTypes: 'SFH, multi-unit, industrial-adjacent residential',
      challenges: [
        'Shift-change freeflow and freight traffic',
        'Mixed driveway and curb product',
        'Longer empty miles vs campus core on some pairs',
      ],
      moverTips:
        'Avoid peak shift-change windows when flexible. Survey older stock carefully. Clarify addresses near industrial edges.',
      cityKeywords: [
        'bowling green',
        'three springs',
        'lovers lane',
      ],
    },
    {
      id: 'rural-plano-fringe',
      name: 'Plano, Alvaton edges & rural larger-lot fringe',
      shortName: 'Plano / rural fringe',
      neighborhoods: [
        'Plano',
        'Alvaton edges',
        'Smiths Grove edges',
        'Rural larger-lot pockets',
        'US-68 edges',
        'Southern and eastern fringe stock',
      ],
      housingTypes: 'SFH, larger lots, limited multi-unit, rural-edge approaches',
      challenges: [
        'Longer empty miles and narrower approaches',
        'Gravel and soft-edge risk in weather',
        'Limited alternate routes',
      ],
      moverTips:
        'Confirm approach width and turnarounds with photos. Price fringe empty miles honestly. Plan weather contingency.',
      cityKeywords: [
        'plano',
        'alvaton',
        'smiths grove',
        'bowling green',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Warren County moving costs',
    intro:
      'Campus access product, HOA admin, industrial freeflow, and I-65 empty miles move the number more than packing skill alone — this is Bowling Green regional logistics, not Louisville south pricing.',
    drivers: [
      {
        title: 'Campus walk-ups, stairs & lease-wave density',
        detail:
          'WKU-adjacent multi-unit adds flight counts and month-end volume that suburban HOA optimism underprices.',
      },
      {
        title: 'Downtown curb scarcity & limited elevators',
        detail:
          'Core multi-unit and event freeflow add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'I-65 · US-31W · US-68 congestion',
        detail:
          'Cross-city and regional pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'South growth HOA windows',
        detail:
          'Greenwood and Scottsville Road packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Industrial freeflow & multi-county empty miles',
        detail:
          'Shift-change traffic and Barren / Allen / Simpson destinations raise staging distance and timing risk.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,500+',
        note: 'Higher with campus stairs or peak I-65 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,200–$3,800+',
        note: 'Stairs, HOA, and access soft costs trend up',
      },
      {
        label: '3–4+ BR / campus peak / cross-zone',
        value: '$2,400–$7,500+',
        note: 'Lease-wave and long I-65 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Warren County move',
    intro:
      'WKU lease cycles, school calendars, summer heat, severe-storm season, and winter ice reshape access and crew availability across Bowling Green.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown staging, and reduce I-65 / US-31W pain. Avoid month-end Fridays and campus move-in weekends when flexible.',
      },
      {
        title: 'Peak season: late May–mid-September (campus spike August)',
        detail:
          'Apartment turnover and family school calendars fill first; WKU move-in compresses near-campus product. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'Industrial shift-change & event freeflow',
        detail:
          'Major employer shift windows and campus event days shrink approaches. Prefer flexible starts near industrial-adjacent addresses.',
      },
      {
        title: 'Summer heat, storms & winter ice',
        detail:
          'June–August heat and thunderstorms raise cancellation risk; winter ice affects fringe driveways and stoops. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'warren-wku-i65',
      title: 'WKU campus, I-65 & south-central regional logistics module',
      intro:
        'Warren County estimates fail more often on stair surveys, campus calendar collisions, HOA gates, and I-65 freeflow than on packing skill alone.',
      bullets: [
        'Survey stair counts and curb options with photos for WKU-adjacent and downtown stock.',
        'Avoid WKU move-in/move-out weekends when flexible; price month-end density honestly.',
        'Price portal-to-portal time for any pair that rides I-65, US-31W, or US-68 at peak.',
        'Collect HOA packets early for Greenwood and Scottsville Road growth product.',
        'Avoid peak industrial shift-change windows for employment-adjacent loads when flexible.',
        'For in-state jobs verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR); verify FMCSA for any out-of-state leg — especially Tennessee-bound I-65 pairs. Do not substitute TN credentials for KYTC on Kentucky intrastate work.',
      ],
    },
    {
      id: 'not-louisville-south',
      title: 'Not Louisville south · not NKY module',
      intro:
        'A single “Kentucky I-65 rate” collapses when Bowling Green regional product is confused with Louisville Jefferson logistics or Northern Kentucky Cincinnati-collar freeflow.',
      bullets: [
        'Do not price WKU walk-ups like NuLu elevators or like Florence HOA driveways as interchangeable defaults.',
        'Keep Warren vs Barren / Allen / Simpson county lines clear on multi-address estimates.',
        'Match campus lease peaks separately from south growth school-calendar waves.',
        'Treat interstate legs as FMCSA authority problems — KYTC alone is not enough out of state.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Warren County?',
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
              'Warren County Public Schools and Bowling Green Independent Schools serve different address patterns. Assignment is address-based — marketing neighborhood names do not guarantee a campus. WKU shapes adult education separately.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Growth edges and popular programs can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Kentucky Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Med Center Health / The Medical Center at Bowling Green and related campuses anchor regional care. Confirm insurance networks for your household — some specialty care may pull toward Louisville or Nashville.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-65 and US-31W freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown multi-unit; WKU campus walk-ups; Greenwood and Scottsville Road growth HOAs; north commercial-residential stock; rural larger-lot fringe toward Plano and Alvaton edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by belt and product. Budget for HOA dues, older-building repair risk, and parking near campus where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / near-core living',
            detail:
              'Suits people prioritizing walkability and amenities — with curb limits and event-day tradeoffs on move day.',
          },
          {
            title: 'WKU campus-adjacent living',
            detail:
              'Often appeals for students and staff — with stairs, lease-wave density, and event constraints.',
          },
          {
            title: 'Greenwood / south growth living',
            detail:
              'Attracts households seeking newer product and schools — with HOA rules and I-65 freeflow.',
          },
          {
            title: 'Plano / rural fringe living',
            detail:
              'Fits buyers chasing space and larger lots — with longer empty miles and approach logistics.',
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
              'Western Kentucky University, healthcare, automotive and manufacturing (including major assembly-related employment), logistics on I-65, and regional services concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-65 and US-31W freeflow is real — including reverse commutes toward industrial parks. Test peak routes before choosing solely on rent or purchase price.',
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
              'Warren County stacks Bowling Green urban cores, campus energy, south growth suburbs, and rural fringe — different from Louisville Jefferson product and Northern Kentucky Cincinnati-collar patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical climate with hot summers, severe-storm risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — WKU calendars, school schedules, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Warren County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KYTC Division of Motor Carriers household goods licensing for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Warren County, Kentucky — official site',
        href: 'https://www.warrencountyky.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Bowling Green',
        href: 'https://www.bgky.org/',
        external: true,
        note: 'Municipal permits, services & neighborhood context',
      },
      {
        label: 'Western Kentucky University',
        href: 'https://www.wku.edu/',
        external: true,
        note: 'Campus calendar & housing-adjacent context',
      },
      {
        label: 'GOKY — Kentucky 511 traveler info',
        href: 'https://goky.ky.gov/',
        external: true,
        note: 'I-65 / US-31W before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with campus stair fluency for WKU-adjacent multi-unit; curb experience for downtown product; HOA fluency for Greenwood–Scottsville Road growth; industrial-approach timing awareness for employment-adjacent stock; honest I-65 · US-31W · US-68 timing for cross-zone pairs. Verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR) for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
