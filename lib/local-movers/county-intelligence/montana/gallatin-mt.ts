import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMtPack,
  MT_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/montana/mt-shared';

/**
 * Gallatin County, MT — Bozeman growth / tech + outdoor economy.
 * NOT Billings west (Yellowstone County) and not a pure park-tourism-only template.
 */
export const gallatinCountyMtIntelligence: CountyIntelligencePack = finalizeMtPack({
  countySlug: 'gallatin',
  hubTitle: 'Gallatin County Moving Intelligence Hub',
  eyebrow:
    'Gallatin County, MT · Bozeman growth / tech + outdoor economy · I-90 / US-191 logistics',
  h1: 'Moving in Gallatin County: Bozeman Growth, Tech + Outdoor Economy & I-90 / US-191 Logistics',
  heroOpener:
    'Gallatin County, Montana is Bozeman growth — downtown Bozeman multi-unit and character stock, Montana State University campus density, North and South Belgrade residential belts, Four Corners corridor product, Big Sky gateway edges, and Gallatin Valley rural approaches that rewrite “local” estimates under tech, university, and outdoor-economy demand. This is not Billings west (Yellowstone County prairie-crossroads logistics), not a Missoula university-west rename alone, and not Yellowstone National Park tourism as the only market story. A downtown Bozeman loft elevator job, an MSU-adjacent walk-up, a Belgrade HOA cul-de-sac, and a Big Sky gateway hillside driveway do not share truck access or empty-mile risk. Housing pressure, academic calendars, winter ice on valley and mountain approaches, and I-90 / US-191 freeflow are real inputs. This hub is for people moving in Gallatin County — Bozeman market realities — not a renamed Billings or park-only page.',
  heroCredibility:
    'Written estimates & insurance certificates for intrastate Montana · MDT MCS commercial vehicle context · FMCSA for interstate · Bozeman I-90 / US-191 logistics awareness · Curated listings',
  majorCorridors: 'I-90 · US-191 · MT-84 · local Bozeman grid',
  whatMakesDifferent: {
    title: 'What makes moving in Gallatin County different',
    intro:
      'These are Gallatin County / Bozeman growth realities — tech and outdoor-economy demand, MSU academic calendars, Belgrade and Four Corners expansion, Big Sky gateway elevation, and I-90 / US-191 freeflow — not Billings west, not Missoula alone, and not park tourism as the only product type.',
    bullets: [
      {
        title: 'This is Bozeman growth / tech + outdoor economy — not Billings west',
        detail:
          'Ignore Yellowstone County prairie-crossroads templates and “Billings west suburb” scripts. Gallatin is Bozeman-centered growth with university density, professional relocation, outdoor-lifestyle product, and high housing pressure. Match estimates to Bozeman, Belgrade, Four Corners, Big Sky gateway, and Gallatin Valley addresses.',
      },
      {
        title: 'MSU lease and academic calendars create hard spikes',
        detail:
          'August move-in, mid-year turnover, and faculty/staff windows compress surveys and elevators near campus. Civilian “any Saturday” assumptions fail during peak student waves around MSU and downtown multi-unit.',
      },
      {
        title: 'Downtown Bozeman multi-unit differs from Belgrade and Four Corners SFH',
        detail:
          'Elevators, scarce curb, building packets, and character-grid stairs dominate core jobs. A North Belgrade ranch or Four Corners two-story is not a downtown loft freight window.',
      },
      {
        title: 'Big Sky gateway and mountain-edge product rewrites labor',
        detail:
          'US-191 elevation approaches, limited turnaround, long carries, and winter ice underprice flat-valley optimism. Survey photos beat bedroom-count quotes on gateway and hillside stock.',
      },
      {
        title: 'I-90, US-191, and MT-84 burn portal time',
        detail:
          'Bozeman ↔ Belgrade, downtown ↔ Four Corners, or valley ↔ Big Sky gateway pairs look local and still burn 25–70+ minutes at peak, construction, or winter weather. Price portal-to-portal honestly.',
      },
      {
        title: 'Mountain winter logistics are real',
        detail:
          'November–March ice and snow on valley arterials and mountain approaches reshape outdoor labor, truck traction, and Big Sky gateway access. Prefer early starts, weather contingency, and honest delay language.',
      },
      {
        title: 'Cross-county and interstate pairs are routine',
        detail:
          'Households regularly move Gallatin County ↔ Yellowstone, Park, Madison, or Cascade County, or across state lines into Wyoming and Idaho. Written estimates and insurance cover pure in-state jobs; any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
      },
      MT_REG_BULLET,
    ],
  },
  zonesHeading: 'Gallatin County access zones',
  zonesIntro:
    'Plan by Downtown Bozeman multi-unit and character core, MSU campus density, North/South Belgrade residential belts, Four Corners corridor growth, Big Sky gateway edges, and rural Gallatin Valley — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-bozeman',
      name: 'Downtown Bozeman, character core & multi-unit',
      shortName: 'Downtown Bozeman',
      neighborhoods: [
        'Downtown Bozeman',
        'Main Street corridors',
        'Historic character grids',
        'Core multi-unit and lofts',
        'Northeast / southeast near-downtown pockets',
        'Commercial-adjacent residential',
      ],
      housingTypes: 'Walk-ups, loft conversions, denser multifamily, character SFH, limited elevators',
      challenges: [
        'Scarce curb staging and event-day congestion',
        'Multi-flight stairs and building COI packets',
        'I-90 downtown freeflow and summer tourism peaks',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Photo curb options and stair counts — downtown Bozeman is not Belgrade ranch access.',
      cityKeywords: [
        'bozeman',
        'downtown bozeman',
      ],
    },
    {
      id: 'msu-campus',
      name: 'Montana State University campus & near-campus multifamily',
      shortName: 'MSU campus',
      neighborhoods: [
        'Montana State University campus edges',
        'University-adjacent multifamily',
        'Student and young-professional rentals',
        'South campus residential belts',
        'College Street corridors',
        'Campus hill approaches',
      ],
      housingTypes: 'Student multi-unit, walk-ups, denser rentals, limited elevators, older SFH pockets',
      challenges: [
        'August and mid-year academic lease spikes',
        'Tight residential curb and multi-flight stairs',
        'Scarce truck length near campus at peak',
      ],
      moverTips:
        'Book around academic calendars — August and mid-year peaks fill first. Survey stair counts with photos. Prefer mid-week starts outside move-in weekends.',
      cityKeywords: [
        'bozeman',
        'montana state',
        'msu',
      ],
    },
    {
      id: 'north-south-belgrade',
      name: 'North & South Belgrade residential belts',
      shortName: 'North/South Belgrade',
      neighborhoods: [
        'Belgrade',
        'North Belgrade growth',
        'South Belgrade residential',
        'Airport-adjacent edges',
        'Belgrade multi-unit pockets',
        'I-90 Belgrade exits',
      ],
      housingTypes: 'HOA SFH, ranch and two-story stock, townhomes, multi-family pockets',
      challenges: [
        'I-90 freeflow and longer empty miles vs downtown Bozeman',
        'HOA packets, truck-length limits, and school-calendar peaks',
        'Airport and industrial-adjacent staging mix',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Clarify Belgrade vs Bozeman vs unincorporated addresses. Price I-90 honestly for Bozeman-bound pairs.',
      cityKeywords: [
        'belgrade',
      ],
    },
    {
      id: 'four-corners',
      name: 'Four Corners corridor & west-valley growth',
      shortName: 'Four Corners',
      neighborhoods: [
        'Four Corners',
        'Jackrabbit Lane corridors',
        'West Gallatin Valley growth',
        'MT-84 approaches',
        'Four Corners multi-unit and SFH mix',
        'Valley arterial edges',
      ],
      housingTypes: 'Newer SFH, townhomes, multi-family, mixed growth product',
      challenges: [
        'Arterial freeflow and cross-zone empty miles to Bozeman core',
        'Construction and growth-related access changes',
        'Winter ice on open valley approaches',
      ],
      moverTips:
        'Price Four Corners ↔ downtown Bozeman as regional-local. Survey driveway and HOA rules early. Confirm municipal vs unincorporated Gallatin addresses.',
      cityKeywords: [
        'four corners',
        'bozeman',
      ],
    },
    {
      id: 'big-sky-gateway',
      name: 'Big Sky gateway edges & US-191 mountain approaches',
      shortName: 'Big Sky gateway',
      neighborhoods: [
        'Big Sky gateway edges',
        'US-191 mountain corridor approaches',
        'Gallatin Canyon edges',
        'Mountain-edge residential and resort-adjacent stock',
        'Elevation driveway product',
        'Gateway HOA and custom lots',
      ],
      housingTypes: 'Hillside SFH, resort-adjacent multi-unit, custom elevation lots, cabin-style stock',
      challenges: [
        'Elevation pitch, limited truck turnaround, long carries',
        'Winter ice, snow, and mountain-approach risk on US-191',
        'Long empty miles from Bozeman core and scarce staging',
      ],
      moverTips:
        'Photo driveway pitch, turnaround, and surface before final pricing. Prefer early starts in winter. Price empty miles and weather contingency honestly — not flat-valley rates.',
      cityKeywords: [
        'big sky',
        'gallatin canyon',
      ],
    },
    {
      id: 'rural-gallatin-valley',
      name: 'Rural Gallatin Valley & outlying county belts',
      shortName: 'Rural Gallatin Valley',
      neighborhoods: [
        'Unincorporated Gallatin County',
        'Manhattan edges',
        'Three Forks edges',
        'Amsterdam / Churchill edges',
        'Rural valley acreage',
        'Southern and western rural belts',
      ],
      housingTypes: 'Rural SFH, acreage lots, farm-adjacent, manufactured, limited multi-unit',
      challenges: [
        'Long empty miles and soft-shoulder or gravel access',
        'Winter ice, wind, and limited staging space',
        'I-90 / US-191 / MT-84 approach freeflow',
      ],
      moverTips:
        'Survey rural driveway width, turnaround, and surface condition. Price empty miles and weather contingency honestly. Do not treat as downtown Bozeman curb jobs.',
      cityKeywords: [
        'manhattan',
        'three forks',
        'amsterdam',
        'churchill',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Gallatin County moving costs',
    intro:
      'MSU academic spikes, downtown stairs, Belgrade–Four Corners empty miles, Big Sky gateway elevation, and I-90 / US-191 freeflow move the number more than packing skill alone — this is Bozeman growth logistics, not Billings west defaults.',
    drivers: [
      {
        title: 'Academic lease spikes & near-campus multi-unit',
        detail:
          'August and mid-year MSU waves compress crews, curb, and stair labor before packing skill matters.',
      },
      {
        title: 'Downtown curb scarcity, stairs & building packets',
        detail:
          'Core multi-unit and character stock add schedule risk and labor that flat-rate optimism underprices.',
      },
      {
        title: 'Belgrade · Four Corners · rural empty miles',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short — especially on I-90.',
      },
      {
        title: 'Big Sky gateway elevation & mountain winter access',
        detail:
          'US-191 pitch, snow, and long carries rewrite labor hours vs flat Gallatin Valley SFH.',
      },
      {
        title: 'I-90 · US-191 · MT-84 congestion & interstate authority',
        detail:
          'Cross-corridor freeflow and weather reshape billable time; out-of-state legs need FMCSA — pure in-state jobs need written estimates and insurance, not invented HHG certificate numbers.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$2,000+',
        note: 'Higher with walk-ups, campus peaks, or peak I-90 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,800+',
        note: 'Stairs, HOA, and growth-corridor soft costs trend up',
      },
      {
        label: '3–4+ BR / hillside / Big Sky gateway / cross-zone',
        value: '$3,200–$11,000+',
        note: 'Gateway elevation and long US-191 / I-90 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$210+/hr',
        note: 'Portal-to-portal; packing, stairs, elevation, and weather scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Gallatin County move',
    intro:
      'MSU academic calendars, tech and professional relocation cycles, summer tourism peaks, and mountain winter ice reshape access and crew availability across the Gallatin Valley and Big Sky gateway.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-90 / US-191 pain. Avoid month-end Fridays and peak MSU move-in weekends when possible.',
      },
      {
        title: 'Peak season: late May–mid-September (plus August MSU spike)',
        detail:
          'Family school calendars, tourism, and university turnover fill first. Book 2–4 weeks ahead for peak weekends; treat August campus waves as a hard capacity constraint.',
      },
      {
        title: 'Mountain winter logistics',
        detail:
          'November–March ice and snow raise cancellation and staging risk on valley arterials, Four Corners, rural belts, and especially Big Sky gateway US-191 approaches. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat, tourism & construction contingency',
        detail:
          'June–August heat and visitor traffic reshape outdoor labor and downtown curb. Prefer early starts and weather contingency on open valley and elevation stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'bozeman-growth-i90-logistics',
      title: 'Bozeman multi-unit, Belgrade growth & I-90 / US-191 logistics module',
      intro:
        'Gallatin County estimates fail more often on academic calendars, HOA packets, gateway elevation surveys, and freeflow than on packing skill alone — and when crews treat this as Billings west.',
      bullets: [
        'Align surveys and crews with MSU August and mid-year lease waves near campus multi-unit.',
        'Book elevators and building packets for downtown Bozeman multi-unit before the survey is final.',
        'Collect HOA packets for Belgrade and Four Corners growth product early.',
        'Photo driveway pitch, turnaround, and surface for Big Sky gateway and hillside stock.',
        'Price portal-to-portal time for any pair that rides I-90, US-191, or MT-84 at peak or in winter weather.',
        'Clarify Bozeman, Belgrade, Four Corners, Big Sky gateway, Manhattan, Three Forks, and unincorporated addresses on every estimate.',
        'For pure in-state Montana jobs insist on written estimates and insurance certificates; verify FMCSA for any out-of-state leg. Do not invent a Montana HHG certificate number.',
      ],
    },
    {
      id: 'not-billings-west-not-park-only',
      title: 'Not Billings west · not park-tourism-only module',
      intro:
        'A single “Gallatin County rate” collapses when Bozeman growth product is confused with Yellowstone County prairie logistics or pure park-gateway tourism defaults alone.',
      bullets: [
        'Do not price downtown Bozeman multi-unit like Billings Heights ranch product or like park resort cabins as interchangeable defaults.',
        'State the market as Gallatin County / Bozeman growth on every estimate — disambiguate from Billings west and from Yellowstone National Park as sole label.',
        'Keep Yellowstone County, Missoula, Cascade, and capital-Helena product out of Bozeman estimate assumptions unless the pair actually crosses counties.',
        'Match academic peaks separately from tech/professional mid-week relocation and tourism-season curb pressure.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Gallatin County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is Bozeman growth / tech + outdoor economy living, not Billings west.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Gallatin County spans Bozeman School District, Belgrade schools, and other systems serving Four Corners, Manhattan, Three Forks, and rural belts. Assignment is address-based — marketing neighborhood names do not guarantee a campus. MSU is higher education, not K-12 assignment.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and growth-edge boundaries can be competitive. Confirm enrollment windows early when relocating mid-year.',
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
              'Bozeman Health and regional specialty campuses anchor care across the Gallatin Valley. Confirm insurance networks for your household; Big Sky gateway residents often face longer winter approach times.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-90, Main Street, and valley arterials change “nearby” on paper. Transfer records early.',
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
              'Expect downtown multi-unit and character SFH; MSU campus density; North/South Belgrade growth HOAs; Four Corners corridor product; Big Sky gateway elevation and resort-adjacent stock; rural Gallatin Valley acreage.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents are among Montana’s most pressured markets. Budget for competitive rental seasons near MSU and employment corridors, HOA dues, and older-building repair risk downtown.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully — especially Belgrade and Four Corners growth product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Bozeman / multi-unit lifestyle',
            detail:
              'Suits people prioritizing walkability, amenities, and professional access — with curb, stair, and freeflow tradeoffs on move day.',
          },
          {
            title: 'MSU-adjacent living',
            detail:
              'Attracts students, staff, and young professionals — with academic-peak logistics and dense multi-unit access.',
          },
          {
            title: 'Belgrade / Four Corners growth belts',
            detail:
              'Fits buyers chasing newer product and relative value vs core Bozeman — with HOA rules and longer empty miles to downtown.',
          },
          {
            title: 'Big Sky gateway / rural valley living',
            detail:
              'Appeals for outdoor access and space — with elevation surveys, winter ice, and long portal times.',
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
              'Montana State University, tech and professional services, healthcare, outdoor and tourism-adjacent employers, construction and growth trades, and regional services concentrate demand across Gallatin County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-90, US-191, MT-84, and valley arterial freeflow is real. Test peak routes before choosing solely on rent or purchase price — winter ice and tourism seasons change “nearby.”',
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
              'Gallatin County, MT is Bozeman growth / tech + outdoor economy — university density, valley residential expansion, and mountain gateway product — not Billings west and not park tourism as the only lifestyle story.',
          },
          {
            title: 'Climate',
            detail:
              'High-valley mountain climate with warm summers, cold snowy winters, and elevation-driven ice risk on gateway approaches. Plan outdoor staging, heat, and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — academic calendars, tech relo cycles, tourism, and winter weather reshape daily rhythm across the Gallatin Valley.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Gallatin County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Montana moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. Do not invent a Montana household goods certificate number.',
    items: [
      {
        label: 'Gallatin County, Montana — official site',
        href: 'https://www.gallatin.mt.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Bozeman',
        href: 'https://www.bozeman.net/',
        external: true,
        note: 'Primary municipal context — Bozeman growth hub',
      },
      {
        label: 'City of Belgrade',
        href: 'https://www.cityofbelgrade.net/',
        external: true,
        note: 'North/South Belgrade municipality context',
      },
      {
        label: 'Montana State University',
        href: 'https://www.montana.edu/',
        external: true,
        note: 'Campus calendar & near-campus logistics context',
      },
      {
        label: 'MDT — Traveler Information',
        href: 'https://www.mdt.mt.gov/travinfo/',
        external: true,
        note: 'I-90 / US-191 / MT-84 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with downtown Bozeman multi-unit and stair fluency; MSU academic-calendar capacity for campus peaks; Belgrade–Four Corners HOA and growth-corridor surveys; Big Sky gateway elevation and winter ice honesty; I-90 · US-191 · MT-84 freeflow awareness. For pure in-state Montana jobs insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. Do not invent a Montana HHG certificate. This is Gallatin County / Bozeman growth — not Billings west, not park tourism only.',
  lastReviewed: '2026-07-24',
});
