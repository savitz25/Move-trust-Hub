import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMtPack,
  MT_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/montana/mt-shared';

/**
 * Yellowstone County, MT — Billings regional hub / I-90 · I-94 crossroads.
 * NOT Yellowstone National Park as primary market label (park tourism is a different logistics story).
 * Distinct from Bozeman/Gallatin growth and western MT university hubs.
 */
export const yellowstoneCountyMtIntelligence: CountyIntelligencePack = finalizeMtPack({
  countySlug: 'yellowstone',
  hubTitle: 'Yellowstone County Moving Intelligence Hub',
  eyebrow:
    'Yellowstone County, MT · Billings regional hub · I-90 / I-94 crossroads logistics',
  h1: 'Moving in Yellowstone County: Billings Regional Access, I-90 / I-94 Crossroads & Local Grids',
  heroOpener:
    'Yellowstone County, Montana is the Billings regional hub — downtown Billings commercial and multi-unit cores, West End and Heights residential belts, Lockwood and Laurel edge product, and the I-90 / I-94 freeflow that rewrites “local” estimates across eastern and south-central Montana. This is not Yellowstone National Park tourism logistics as a primary market label, not a Bozeman/Gallatin tech-and-outdoor growth rename, and not a Missoula university-west template. A downtown Billings elevator dock, a Heights ranch driveway, a Lockwood rural-residential approach, and a Laurel edge SFH do not share truck access or empty-mile risk. Winter ice on arterial approaches, wind across open prairie edges, and school-calendar peaks are real inputs. This hub is for people moving in Yellowstone County — Billings market realities — not a park-gateway or Gallatin Valley page.',
  heroCredibility:
    'Written estimates & insurance certificates for intrastate Montana · MDT MCS commercial vehicle context · FMCSA for interstate · Billings I-90 / I-94 logistics awareness · Curated listings',
  majorCorridors: 'I-90 · I-94 · US-87 · US-212 · local Billings grid',
  whatMakesDifferent: {
    title: 'What makes moving in Yellowstone County different',
    intro:
      'These are Yellowstone County / Billings regional realities — I-90 and I-94 crossroads freeflow, Heights and West End residential product, Lockwood and Laurel edges, and prairie-edge winter logistics — not Yellowstone National Park tourism defaults, not Bozeman/Gallatin growth, and not a generic Montana mountain-resort template.',
    bullets: [
      {
        title: 'This is Billings regional hub — not Yellowstone National Park as primary market',
        detail:
          'Ignore park-gateway tourism scripts, West Entrance / Gardiner resort logistics, and “gateway to the park” marketing as the default move profile. Yellowstone County is Billings — eastern Montana’s commercial, healthcare, and logistics core with I-90 / I-94 freeflow. Match estimates to Billings, Heights, West End, Lockwood, and Laurel addresses — not park tourism defaults.',
      },
      {
        title: 'Downtown Billings multi-unit differs from Heights and West End SFH',
        detail:
          'Elevator docks, scarce curb, building COIs, and older commercial-adjacent stock dominate core jobs. A Heights ranch or West End two-story is not a downtown walk-up or loft freight window.',
      },
      {
        title: 'I-90, I-94, US-87, and US-212 burn portal time',
        detail:
          'Heights ↔ West End, downtown ↔ Lockwood, or Billings ↔ Laurel pairs look local and still burn 20–50+ minutes at peak, weather events, or construction. Price portal-to-portal honestly across the Billings grid.',
      },
      {
        title: 'Lockwood, Laurel, and rural Yellowstone County rewrite empty miles',
        detail:
          'Rural-residential driveways, longer approaches, mixed gravel access, and wind-exposed staging are not downtown curb problems. Flat-rate optimism underprices edge product.',
      },
      {
        title: 'Mountain/prairie winter logistics are real',
        detail:
          'November–March ice, wind, and occasional heavy snow reshape outdoor labor, truck traction, and arterial freeflow on I-90 / I-94 approaches. Prefer early starts, weather contingency, and honest delay language — not summer-only templates.',
      },
      {
        title: 'Distinct from Bozeman/Gallatin and western university hubs',
        detail:
          'Billings is not Bozeman tech-and-outdoor growth, not Missoula university density, and not Helena capital product. Do not reuse Gallatin or Missoula packs with a city rename.',
      },
      {
        title: 'Cross-county and interstate pairs are routine',
        detail:
          'Households regularly move Yellowstone County ↔ Gallatin, Cascade, or Carbon County, or across state lines into Wyoming or the Dakotas. Written estimates and insurance cover pure in-state jobs; any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
      MT_REG_BULLET,
    ],
  },
  zonesHeading: 'Yellowstone County access zones',
  zonesIntro:
    'Plan by Downtown Billings multi-unit and commercial core, West End residential belts, Heights product, Lockwood edges, Laurel approaches, and rural Yellowstone County — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-billings',
      name: 'Downtown Billings, commercial core & multi-unit',
      shortName: 'Downtown Billings',
      neighborhoods: [
        'Downtown Billings',
        'Central Avenue corridors',
        'Montana Avenue edges',
        'Hospital and medical corridors',
        'Core multi-unit pockets',
        'Commercial-adjacent lofts',
      ],
      housingTypes: 'Mid-rise multifamily, walk-ups, loft conversions, mixed commercial-residential',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'Scarce curb near retail and medical corridors',
        'I-90 / downtown freeflow and event-day congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early freight windows. Photo curb staging options early — downtown Billings is not Heights ranch access.',
      cityKeywords: [
        'billings',
        'downtown billings',
      ],
    },
    {
      id: 'west-end',
      name: 'West End Billings residential & west arterial belts',
      shortName: 'West End',
      neighborhoods: [
        'West End',
        'Shiloh corridors',
        'Grand Avenue west belts',
        'ZooMontana edges',
        'West End multi-unit pockets',
        'Western arterial approaches',
      ],
      housingTypes: 'SFH ranch and two-story, townhomes, multi-family pockets',
      challenges: [
        'Arterial freeflow on Shiloh and Grand corridors',
        'Mixed driveway geometry and HOA-lite packets',
        'Cross-zone empty miles to Heights and downtown',
      ],
      moverTips:
        'Clarify West End vs Heights vs downtown addresses. Price I-90 and arterial freeflow honestly. Survey driveway width for larger trucks.',
      cityKeywords: [
        'billings',
        'west end',
        'shiloh',
      ],
    },
    {
      id: 'heights',
      name: 'Billings Heights residential & northern belts',
      shortName: 'Heights',
      neighborhoods: [
        'Billings Heights',
        'Main Street Heights corridors',
        'Northern residential belts',
        'Heights multi-unit pockets',
        'Airport-adjacent edges',
        'Heights school corridors',
      ],
      housingTypes: 'Ranch SFH, two-story stock, townhomes, multi-family limited',
      challenges: [
        'Heights ↔ downtown / West End freeflow on Main and I-90 ramps',
        'School-calendar summer peaks',
        'Winter ice on open residential approaches',
      ],
      moverTips:
        'Price portal-to-portal for Heights ↔ downtown pairs. Align with school calendars when relevant. Prefer early starts in winter ice windows.',
      cityKeywords: [
        'billings heights',
        'heights',
        'billings',
      ],
    },
    {
      id: 'lockwood',
      name: 'Lockwood edges & eastern Yellowstone approaches',
      shortName: 'Lockwood',
      neighborhoods: [
        'Lockwood',
        'Lockwood residential belts',
        'I-90 Lockwood exits',
        'Eastern industrial-adjacent edges',
        'Rural-residential Lockwood approaches',
        'Yellowstone River corridor edges',
      ],
      housingTypes: 'SFH, rural-residential, manufactured and multi-unit limited',
      challenges: [
        'Longer empty miles to downtown Billings core',
        'Mixed driveway and industrial-adjacent access',
        'I-90 freeflow and weather exposure',
      ],
      moverTips:
        'Price empty miles honestly. Survey driveway width and turnaround. Confirm Lockwood vs Billings municipal addresses on every estimate.',
      cityKeywords: [
        'lockwood',
      ],
    },
    {
      id: 'laurel-edges',
      name: 'Laurel edges & western Yellowstone approaches',
      shortName: 'Laurel edges',
      neighborhoods: [
        'Laurel',
        'Laurel residential belts',
        'I-90 Laurel corridors',
        'Western county edges toward Laurel',
        'Rural Laurel approaches',
        'US-212 corridors',
      ],
      housingTypes: 'SFH, small-town multi-unit, rural-residential',
      challenges: [
        'Longer empty miles to Billings core',
        'I-90 approach freeflow and construction windows',
        'Small-town curb and mixed driveway product',
      ],
      moverTips:
        'Price Billings ↔ Laurel pairs as regional, not “local free.” Survey curb and driveway early. Clarify Laurel vs unincorporated Yellowstone County addresses.',
      cityKeywords: [
        'laurel',
      ],
    },
    {
      id: 'rural-yellowstone',
      name: 'Rural Yellowstone County, prairie-edge & outlying belts',
      shortName: 'Rural Yellowstone',
      neighborhoods: [
        'Unincorporated Yellowstone County',
        'Prairie-edge rural-residential',
        'Southern county edges',
        'Northern rural belts',
        'Ag-adjacent approaches',
        'Outlying subdivision pockets',
      ],
      housingTypes: 'Rural SFH, acreage lots, manufactured, limited multi-unit',
      challenges: [
        'Long empty miles and soft-shoulder or gravel access',
        'Wind, winter ice, and limited staging space',
        'I-90 / I-94 / US-87 / US-212 approach freeflow',
      ],
      moverTips:
        'Survey rural driveway width, turnaround, and surface condition. Price empty miles and weather contingency honestly. Do not treat as downtown Billings curb jobs.',
      cityKeywords: [
        'yellowstone county',
        'shepherd',
        'huntley',
        'worden',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Yellowstone County moving costs',
    intro:
      'Multi-unit elevators, Heights–West End freeflow, rural empty miles, and I-90 / I-94 winter logistics move the number more than packing skill alone — this is Billings regional hub logistics, not Yellowstone National Park tourism defaults.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown Billings multi-unit and commercial-adjacent product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Heights · West End · Lockwood · Laurel empty miles',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short — especially on I-90 and arterial freeflow.',
      },
      {
        title: 'Rural driveway geometry & gravel access',
        detail:
          'Lockwood, Laurel edges, and rural Yellowstone County add long carries, soft shoulders, and turnaround limits that flat-rate optimism underprices.',
      },
      {
        title: 'I-90 · I-94 · US-87 · US-212 congestion & weather',
        detail:
          'Crossroads freeflow and winter ice reshape billable time across Billings regional pairs.',
      },
      {
        title: 'Interstate empty miles & authority complexity',
        detail:
          'Wyoming, Dakota, and other out-of-state destinations raise staging distance — verify FMCSA when any leg leaves Montana; pure in-state jobs need written estimates and insurance, not invented HHG certificate numbers.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with elevators, walk-ups, or peak I-90 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,300–$4,200+',
        note: 'Stairs, multi-unit, and cross-zone soft costs trend up',
      },
      {
        label: '3–4+ BR / rural / cross-zone',
        value: '$2,800–$8,500+',
        note: 'Rural access and long I-90 / I-94 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal; packing, stairs, and weather contingency scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Yellowstone County move',
    intro:
      'School calendars, healthcare and corporate relocation cycles, summer heat and wind, and mountain/prairie winter ice reshape access and crew availability across the Billings grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-90 / I-94 pain. Avoid month-end Fridays when leases and medical-adjacent demand collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and elevator slots in downtown Billings.',
      },
      {
        title: 'Mountain/prairie winter logistics',
        detail:
          'November–March ice, wind, and snow raise cancellation and staging risk on Heights, Lockwood, Laurel, and rural approaches. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat, wind & storm contingency',
        detail:
          'June–August heat and prairie wind reshape outdoor labor. Prefer early starts and weather contingency on open rural-residential stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'billings-i90-i94-logistics',
      title: 'Billings multi-unit, Heights–West End & I-90 / I-94 logistics module',
      intro:
        'Yellowstone County estimates fail more often on multi-unit packets, cross-zone freeflow, rural driveway surveys, and winter ice than on packing skill alone — and when crews treat this as park tourism logistics.',
      bullets: [
        'Book elevators and building COIs for downtown Billings multi-unit before the survey is final.',
        'Photo stair counts, curb options, and driveway pitch for Heights, West End, and older stock.',
        'Price portal-to-portal time for any pair that rides I-90, I-94, US-87, or US-212 at peak or in winter weather.',
        'Survey Lockwood, Laurel, and rural Yellowstone driveway width, turnaround, and surface condition early.',
        'Clarify Billings, Heights, West End, Lockwood, Laurel, and unincorporated addresses on every estimate.',
        'For pure in-state Montana jobs insist on written estimates and insurance certificates; verify FMCSA for any out-of-state leg. Do not invent a Montana HHG certificate number.',
      ],
    },
    {
      id: 'not-park-not-bozeman',
      title: 'Not Yellowstone National Park · not Bozeman/Gallatin module',
      intro:
        'A single “Yellowstone County rate” collapses when Billings regional product is confused with park-gateway tourism logistics or Gallatin Valley growth defaults.',
      bullets: [
        'Do not price downtown Billings multi-unit like park resort cabin product or like Bozeman loft/HOA growth as interchangeable defaults.',
        'State the market as Yellowstone County / Billings regional hub on every estimate — disambiguate from Yellowstone National Park tourism as primary label.',
        'Keep Gallatin, Missoula, Cascade, and capital-Helena product out of Billings estimate assumptions.',
        'Match school-calendar peaks separately from healthcare and corporate mid-week relocation windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Yellowstone County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Billings regional living, not park-gateway tourism as primary lifestyle default.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Yellowstone County spans Billings Public Schools and other systems serving Heights, West End, Lockwood, Laurel, and rural belts. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
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
              'Billings Clinic, Intermountain Health (St. Vincent), and regional specialty campuses anchor care across the Billings metro. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-90 ramps, Main Street Heights, and Grand Avenue freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown multi-unit and commercial-adjacent product; West End and Heights SFH and townhomes; Lockwood and Laurel edge stock; rural Yellowstone acreage and manufactured product.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by school assignment, product type, and proximity to medical and employment corridors. Budget for older-building repair risk and competitive rental seasons near healthcare anchors.',
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
            title: 'Downtown Billings / multi-unit lifestyle',
            detail:
              'Suits people prioritizing medical, professional, and amenity access — with elevator, curb, and freeflow tradeoffs on move day.',
          },
          {
            title: 'Heights / West End residential living',
            detail:
              'Often appeals for schools, yards, and suburban grids — with cross-zone portal time to downtown employment.',
          },
          {
            title: 'Lockwood / Laurel edge living',
            detail:
              'Fits buyers chasing relative value and space — with longer empty miles and mixed driveway logistics.',
          },
          {
            title: 'Rural Yellowstone County living',
            detail:
              'Attracts households seeking acreage and quieter approaches — with gravel access, wind, and winter ice survey needs.',
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
              'Healthcare systems, energy and logistics, professional services, retail, education, and regional government concentrate demand across the Billings hub.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-90, I-94, Main Street Heights, and Grand / Shiloh freeflow is real. Test peak routes before choosing solely on rent or purchase price — winter ice changes “nearby.”',
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
              'Yellowstone County, MT is the Billings regional hub — commercial and healthcare density, Heights–West End residential belts, and prairie-edge logistics — not Yellowstone National Park tourism as primary market label and not a Bozeman growth rename.',
          },
          {
            title: 'Climate',
            detail:
              'Semi-arid continental climate with hot summers, strong wind, and cold winters with ice and snow risk on open approaches. Plan outdoor staging, heat, wind, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, healthcare shifts, and winter weather reshape daily rhythm across the Billings grid.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Yellowstone County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Montana moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. Do not invent a Montana household goods certificate number.',
    items: [
      {
        label: 'Yellowstone County, Montana — official site',
        href: 'https://www.yellowstonecountymt.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Billings',
        href: 'https://www.billingsmt.gov/',
        external: true,
        note: 'Primary municipal context — Billings regional hub',
      },
      {
        label: 'City of Laurel',
        href: 'https://www.laurel.mt.gov/',
        external: true,
        note: 'Western edge municipality context',
      },
      {
        label: 'MDT — Traveler Information',
        href: 'https://www.mdt.mt.gov/travinfo/',
        external: true,
        note: 'I-90 / I-94 / US-87 / US-212 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with downtown Billings multi-unit elevator/COI fluency; Heights–West End residential stair and driveway surveys; Lockwood–Laurel rural empty-mile honesty; winter ice and I-90 · I-94 freeflow awareness. For pure in-state Montana jobs insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. Do not invent a Montana HHG certificate. This is Yellowstone County / Billings regional hub — not Yellowstone National Park as primary market label, not Bozeman/Gallatin.',
  lastReviewed: '2026-07-24',
});
