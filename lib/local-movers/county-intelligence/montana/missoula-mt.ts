import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMtPack,
  MT_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/montana/mt-shared';

/**
 * Missoula County, MT — Missoula university / western Montana hub · I-90 / US-93.
 * Distinct from Billings (Yellowstone County) regional crossroads and Bozeman/Gallatin growth.
 */
export const missoulaCountyMtIntelligence: CountyIntelligencePack = finalizeMtPack({
  countySlug: 'missoula',
  hubTitle: 'Missoula County Moving Intelligence Hub',
  eyebrow:
    'Missoula County, MT · university / western MT hub · I-90 / US-93 logistics',
  h1: 'Moving in Missoula County: University / Western MT Hub Access, I-90 / US-93 & Local Grids',
  heroOpener:
    'Missoula County, Montana is the western Montana university hub — downtown Missoula multi-unit and river-adjacent stock, University of Montana campus density, South Hills elevation approaches, Target Range and Orchard Homes residential belts, East Missoula and Bonner edges, and the I-90 / US-93 freeflow that rewrites “local” estimates across the Bitterroot and Clark Fork corridors. This is not a Billings (Yellowstone County) prairie-crossroads rename, not Bozeman/Gallatin tech-and-outdoor growth alone, and not a generic mountain-resort tourism template. A downtown walk-up, a UM-adjacent student multi-unit, a South Hills hillside driveway, and a Target Range ranch do not share truck access or empty-mile risk. Academic calendars, winter ice on hill approaches, and valley inversion freeflow are real inputs. This hub is for people moving in Missoula County — university and western MT market realities — not a renamed Billings or Gallatin page.',
  heroCredibility:
    'Written estimates & insurance certificates for intrastate Montana · MDT MCS commercial vehicle context · FMCSA for interstate · Missoula I-90 / US-93 logistics awareness · Curated listings',
  majorCorridors: 'I-90 · US-93 · US-12 · local Missoula grid',
  whatMakesDifferent: {
    title: 'What makes moving in Missoula County different',
    intro:
      'These are Missoula County / western Montana university-hub realities — UM academic calendars, South Hills elevation, downtown multi-unit, Target Range–Orchard Homes residential product, and I-90 / US-93 freeflow — not Billings crossroads defaults, not Bozeman growth alone, and not a park-gateway tourism template.',
    bullets: [
      {
        title: 'University of Montana lease and academic calendars create hard spikes',
        detail:
          'August move-in, mid-year turnover, and faculty/staff appointment windows compress surveys and elevators near campus. Civilian “any Saturday” assumptions fail during peak student waves around UM and downtown multi-unit.',
      },
      {
        title: 'Downtown Missoula multi-unit differs from South Hills and Target Range SFH',
        detail:
          'Elevator-scarce walk-ups, scarce curb, river-adjacent staging limits, and older character stock dominate core jobs. A South Hills hillside two-story or Target Range ranch is not a downtown loft freight window.',
      },
      {
        title: 'South Hills elevation and hillside stock rewrite labor hours',
        detail:
          'Pitch, limited turnaround, long carries, tree canopy, and winter ice on hill approaches underprice flat-valley optimism. Survey photos beat bedroom-count quotes on South Hills product.',
      },
      {
        title: 'I-90, US-93, and US-12 burn portal time',
        detail:
          'Downtown ↔ South Hills, UM ↔ Target Range, or Missoula ↔ East Missoula–Bonner pairs look local and still burn 20–55+ minutes at peak, construction, or winter weather. Price portal-to-portal honestly.',
      },
      {
        title: 'Mountain winter and valley inversion logistics are real',
        detail:
          'November–March ice and snow on South Hills and rural western edges, plus valley cold-air pooling and freeflow slowdowns, reshape outdoor labor. Prefer early starts, weather contingency, and honest delay language.',
      },
      {
        title: 'Distinct from Billings and Bozeman/Gallatin defaults',
        detail:
          'Missoula is western MT university density and Bitterroot-corridor living — not Yellowstone County prairie logistics and not Gallatin Valley tech/outdoor growth alone. Do not reuse those packs with a city rename.',
      },
      {
        title: 'Cross-county and interstate pairs are routine',
        detail:
          'Households regularly move Missoula County ↔ Ravalli (Bitterroot), Flathead, or Lewis and Clark County, or into Idaho and Washington. Written estimates and insurance cover pure in-state jobs; any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
      MT_REG_BULLET,
    ],
  },
  zonesHeading: 'Missoula County access zones',
  zonesIntro:
    'Plan by Downtown Missoula multi-unit and river core, University / UM campus density, South Hills elevation, Target Range–Orchard Homes residential belts, East Missoula–Bonner edges, and rural western Missoula County — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-missoula',
      name: 'Downtown Missoula, river-adjacent & core multi-unit',
      shortName: 'Downtown Missoula',
      neighborhoods: [
        'Downtown Missoula',
        'Higgins Avenue corridors',
        'Front Street / river edges',
        'Hip Strip edges',
        'Core multi-unit pockets',
        'Commercial-adjacent lofts',
      ],
      housingTypes: 'Walk-ups, loft conversions, denser multifamily, limited elevators, mixed commercial-residential',
      challenges: [
        'Scarce curb staging and event-day congestion',
        'Multi-flight stairs and elevator-scarce product',
        'I-90 downtown freeflow and river-corridor limits',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and stair counts — downtown Missoula is not Target Range ranch access.',
      cityKeywords: [
        'missoula',
        'downtown missoula',
      ],
    },
    {
      id: 'university-um',
      name: 'University of Montana campus & near-campus multifamily',
      shortName: 'University / UM',
      neighborhoods: [
        'University of Montana campus edges',
        'University District',
        'Near-campus multifamily',
        'Student and young-professional rentals',
        'Arthur Avenue corridors',
        'Campus hill approaches',
      ],
      housingTypes: 'Student multi-unit, walk-ups, denser rentals, limited elevators, older SFH pockets',
      challenges: [
        'August and mid-year academic lease spikes',
        'Tight residential curb and multi-flight stairs',
        'Hill approaches and scarce truck length near campus',
      ],
      moverTips:
        'Book around academic calendars — August and mid-year peaks fill first. Survey stair counts with photos. Prefer mid-week starts outside move-in weekends.',
      cityKeywords: [
        'missoula',
        'university of montana',
        'university district',
      ],
    },
    {
      id: 'south-hills',
      name: 'South Hills elevation & hillside residential',
      shortName: 'South Hills',
      neighborhoods: [
        'South Hills',
        'Hillside residential belts',
        'South Avenue elevation edges',
        'Pattee Canyon approaches',
        'Upper South Hills custom stock',
        'Tree-canopy hillside streets',
      ],
      housingTypes: 'Hillside SFH, two-story elevation lots, custom and character product',
      challenges: [
        'Elevation pitch, limited truck turnaround, long carries',
        'Winter ice and snow on hill approaches',
        'Tree canopy and soft-shoulder risk',
      ],
      moverTips:
        'Photo driveway pitch and turnaround before final pricing. Prefer early starts in winter. Protect landscaping and older interiors on character stock.',
      cityKeywords: [
        'missoula',
        'south hills',
        'pattee canyon',
      ],
    },
    {
      id: 'target-range-orchard-homes',
      name: 'Target Range, Orchard Homes & west-side residential belts',
      shortName: 'Target Range / Orchard Homes',
      neighborhoods: [
        'Target Range',
        'Orchard Homes',
        'Mullan Road corridors',
        'West-side residential belts',
        'Reserve Street west edges',
        'West Missoula multi-unit pockets',
      ],
      housingTypes: 'Ranch SFH, two-story stock, townhomes, multi-family pockets',
      challenges: [
        'Mullan / Reserve freeflow and cross-zone empty miles',
        'Mixed driveway geometry and school-corridor peaks',
        'Winter ice on open residential approaches',
      ],
      moverTips:
        'Clarify Target Range vs Orchard Homes vs downtown addresses. Price arterial freeflow honestly. Align with school calendars when relevant.',
      cityKeywords: [
        'missoula',
        'target range',
        'orchard homes',
      ],
    },
    {
      id: 'east-missoula-bonner',
      name: 'East Missoula, Bonner & eastern corridor edges',
      shortName: 'East Missoula / Bonner',
      neighborhoods: [
        'East Missoula',
        'Bonner',
        'Milltown edges',
        'I-90 eastern exits',
        'Clark Fork corridor approaches',
        'Eastern multi-unit and SFH mix',
      ],
      housingTypes: 'SFH, small multi-unit, rural-residential edges, older mill-town stock',
      challenges: [
        'Longer empty miles to downtown and UM core',
        'I-90 freeflow and river-corridor constraints',
        'Mixed driveway and older-building access',
      ],
      moverTips:
        'Price Missoula core ↔ East Missoula–Bonner pairs as regional-local, not free. Survey curb and driveway early. Confirm municipal vs unincorporated addresses.',
      cityKeywords: [
        'east missoula',
        'bonner',
        'milltown',
      ],
    },
    {
      id: 'rural-western-edges',
      name: 'Rural western Missoula County & outlying valley edges',
      shortName: 'Rural western edges',
      neighborhoods: [
        'Unincorporated Missoula County',
        'Lolo edges',
        'Frenchtown edges',
        'Seeley Lake approaches (longer empty miles)',
        'Rural Bitterroot-corridor approaches',
        'Mountain-edge rural-residential',
      ],
      housingTypes: 'Rural SFH, acreage lots, cabin-style stock, manufactured, limited multi-unit',
      challenges: [
        'Long empty miles and soft-shoulder or gravel access',
        'Winter ice, elevation approaches, and limited staging',
        'I-90 / US-93 / US-12 approach freeflow',
      ],
      moverTips:
        'Survey rural driveway width, turnaround, surface, and winter access. Price empty miles and weather contingency honestly. Do not treat as downtown Missoula curb jobs.',
      cityKeywords: [
        'lolo',
        'frenchtown',
        'seeley lake',
        'clinton',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Missoula County moving costs',
    intro:
      'UM academic spikes, downtown stairs, South Hills elevation, and I-90 / US-93 freeflow move the number more than packing skill alone — this is western MT university-hub logistics, not Billings prairie or Gallatin growth defaults alone.',
    drivers: [
      {
        title: 'Academic lease spikes & near-campus multi-unit',
        detail:
          'August and mid-year UM waves compress crews, curb, and stair labor before packing skill matters.',
      },
      {
        title: 'South Hills pitch, stairs & winter ice',
        detail:
          'Elevation approaches add flight counts, turnaround limits, and weather risk that flat-valley quotes underprice.',
      },
      {
        title: 'Downtown curb scarcity & walk-up labor',
        detail:
          'River-adjacent and core multi-unit product need short-truck staging and stair surveys.',
      },
      {
        title: 'I-90 · US-93 · US-12 congestion & weather',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short — especially in winter.',
      },
      {
        title: 'Rural western empty miles & interstate authority',
        detail:
          'Lolo, Frenchtown, and outlying belts raise staging distance; out-of-state legs need FMCSA — pure in-state jobs need written estimates and insurance, not invented HHG certificate numbers.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,800+',
        note: 'Higher with walk-ups, campus peaks, or South Hills pitch',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,400–$4,400+',
        note: 'Stairs, elevation, and academic-peak soft costs trend up',
      },
      {
        label: '3–4+ BR / hillside / rural / cross-zone',
        value: '$2,900–$9,000+',
        note: 'South Hills and long I-90 / US-93 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$200+/hr',
        note: 'Portal-to-portal; packing, stairs, elevation, and weather scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Missoula County move',
    intro:
      'UM academic calendars, school cycles, summer valley heat, wildfire-smoke risk in dry years, and mountain winter ice reshape access and crew availability across the Missoula grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease campus-adjacent freight windows, and reduce I-90 / US-93 pain. Avoid month-end Fridays and peak UM move-in weekends when possible.',
      },
      {
        title: 'Peak season: late May–mid-September (plus August UM spike)',
        detail:
          'Family school calendars and university turnover fill first. Book 2–4 weeks ahead for peak weekends; treat August campus waves as a hard capacity constraint.',
      },
      {
        title: 'Mountain winter logistics',
        detail:
          'November–March ice and snow raise cancellation and staging risk on South Hills, rural western edges, and I-90 approaches. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat, smoke & inversion contingency',
        detail:
          'June–August heat and occasional wildfire smoke reshape outdoor labor. Prefer early starts and weather/air-quality contingency on hillside and open-edge stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'missoula-um-i90-logistics',
      title: 'UM campus, South Hills elevation & I-90 / US-93 logistics module',
      intro:
        'Missoula County estimates fail more often on academic calendars, stair surveys, hillside pitch, and freeway freeflow than on packing skill alone — and when crews treat this as Billings or Bozeman defaults.',
      bullets: [
        'Align surveys and crews with UM August and mid-year lease waves near campus multi-unit.',
        'Photo stair counts, curb options, and driveway pitch for downtown, University District, and South Hills stock.',
        'Price portal-to-portal time for any pair that rides I-90, US-93, or US-12 at peak or in winter weather.',
        'Survey Target Range, Orchard Homes, East Missoula–Bonner, and rural western driveway access early.',
        'Clarify downtown Missoula, UM-adjacent, South Hills, Target Range, Orchard Homes, East Missoula, Bonner, and unincorporated addresses on every estimate.',
        'For pure in-state Montana jobs insist on written estimates and insurance certificates; verify FMCSA for any out-of-state leg. Do not invent a Montana HHG certificate number.',
      ],
    },
    {
      id: 'not-billings-not-bozeman',
      title: 'Not Billings · not Bozeman/Gallatin-only module',
      intro:
        'A single “Missoula County rate” collapses when western MT university product is confused with Billings prairie-crossroads logistics or Gallatin Valley growth defaults alone.',
      bullets: [
        'Do not price UM-adjacent multi-unit like downtown Billings medical corridors or like Bozeman HOA growth as interchangeable defaults.',
        'State the market as Missoula County / western MT university hub on every estimate.',
        'Keep Yellowstone County, Gallatin, Cascade, and capital-Helena product out of Missoula estimate assumptions unless the pair actually crosses counties.',
        'Match academic peaks separately from civilian school-calendar and mid-week professional relocation windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Missoula County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is western MT university-hub living, not Billings prairie or park-gateway tourism alone.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Missoula County spans Missoula County Public Schools and other systems serving South Hills, Target Range, Orchard Homes, East Missoula, and rural belts. Assignment is address-based — marketing neighborhood names do not guarantee a campus. UM is higher education, not K-12 assignment.',
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
              'Providence St. Patrick Hospital, Community Medical Center, and regional specialty campuses anchor care across Missoula. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — Reserve, Mullan, and I-90 freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect downtown multi-unit and river-adjacent product; UM campus density; South Hills elevation SFH; Target Range–Orchard Homes residential belts; East Missoula–Bonner edges; rural western acreage and cabin-style stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by proximity to campus, views, and product type. Budget for competitive rental seasons near UM and older-building repair risk downtown.',
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
            title: 'Downtown / university-adjacent lifestyle',
            detail:
              'Suits people prioritizing walkability, UM access, and amenities — with curb, stair, and academic-peak tradeoffs on move day.',
          },
          {
            title: 'South Hills elevation living',
            detail:
              'Often appeals for views and privacy — with driveway pitch, winter ice, and longer carries.',
          },
          {
            title: 'Target Range / Orchard Homes residential',
            detail:
              'Fits buyers chasing yards and schools — with arterial freeflow and cross-zone portal time to core employment.',
          },
          {
            title: 'East Missoula / Bonner / rural western edges',
            detail:
              'Attracts households seeking relative value or space — with empty miles, mixed access, and winter survey needs.',
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
              'University of Montana, healthcare systems, professional services, outdoor and tourism-adjacent employers, education, and regional government concentrate demand across the Missoula hub.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-90, US-93, Reserve, and Mullan freeflow is real. Test peak routes before choosing solely on rent or purchase price — winter ice on South Hills changes “nearby.”',
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
              'Missoula County, MT is the western Montana university hub — UM density, downtown river culture, South Hills elevation, and valley residential belts — not a Billings prairie rename and not Gallatin Valley growth alone.',
          },
          {
            title: 'Climate',
            detail:
              'Mountain-valley climate with warm summers, cold winters, occasional wildfire smoke, and ice/snow on hill approaches. Plan outdoor staging, heat, air quality, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — academic calendars, school cycles, and winter weather reshape daily rhythm across the Missoula grid.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Missoula County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Montana moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. Do not invent a Montana household goods certificate number.',
    items: [
      {
        label: 'Missoula County, Montana — official site',
        href: 'https://www.missoulacounty.us/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Missoula',
        href: 'https://www.ci.missoula.mt.us/',
        external: true,
        note: 'Primary municipal context — western MT university hub',
      },
      {
        label: 'University of Montana',
        href: 'https://www.umt.edu/',
        external: true,
        note: 'Campus calendar & near-campus logistics context',
      },
      {
        label: 'MDT — Traveler Information',
        href: 'https://www.mdt.mt.gov/travinfo/',
        external: true,
        note: 'I-90 / US-93 / US-12 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with UM academic-calendar fluency for campus multi-unit; downtown stair and curb fluency; South Hills elevation and winter ice surveys; Target Range–Orchard Homes residential access; honest I-90 · US-93 · US-12 timing for cross-zone pairs. For pure in-state Montana jobs insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. Do not invent a Montana HHG certificate. This is Missoula County / western MT university hub — not Billings, not Bozeman/Gallatin alone.',
  lastReviewed: '2026-07-24',
});
