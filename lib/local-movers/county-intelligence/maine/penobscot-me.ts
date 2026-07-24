import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMePack,
  ME_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/maine/me-shared';

/**
 * Penobscot County, ME — Bangor regional hub / I-95 central Maine.
 * NOT Portland north. NOT York seacoast.
 */
export const penobscotCountyMeIntelligence: CountyIntelligencePack = finalizeMePack({
  countySlug: 'penobscot',
  hubTitle: 'Penobscot County Moving Intelligence Hub',
  eyebrow:
    'Penobscot County, ME · Bangor regional hub / Orono–UMaine & I-95 central Maine logistics',
  h1: 'Moving in Penobscot County: Bangor Regional Access, Orono–UMaine & I-95 Central Maine Logistics',
  heroOpener:
    'Penobscot County, Maine is the Bangor regional hub — downtown multi-unit, Bangor suburbs and Brewer river pairs, Orono / University of Maine campus density, Hampden–Hermon growth belts, rural northern and western approaches, and Penobscot River town product — not Portland peninsula density and not York seacoast tourism. Expect long rural empty miles, winter ice on extended approaches, university move-in waves, older Bangor multi-unit stairs, and I-95 freeflow that rewrites “local” estimates across a large county footprint. A downtown Bangor third-floor walk-up, an Orono student multi-unit, a Hermon ranch, and a rural northern township home do not share truck access or crew skill. This hub is for people moving in Penobscot County, ME — Bangor regional logistics — not a Portland-north rename.',
  heroCredibility:
    'Written estimates + insurance for in-state · FMCSA for interstate · Bangor multi-unit & rural approach logistics · Curated listings',
  majorCorridors: 'I-95 · US-2 · ME-15 · local Bangor grid',
  whatMakesDifferent: {
    title: 'What makes moving in Penobscot County different',
    intro:
      'These are Penobscot County / Bangor regional realities — downtown multi-unit, UMaine campus density, long rural approaches, and I-95 central Maine freeflow — not Portland peninsula walk-up defaults and not York beach tourism alone.',
    bullets: [
      {
        title: 'This is Penobscot (Bangor regional) — not Portland density',
        detail:
          'Ignore Munjoy Hill triple-decker templates, Freeport outlet scripts, and Biddeford–Saco twin-city seacoast defaults. Penobscot is Bangor regional multi-unit and suburban product, Brewer river pairs, Orono / UMaine campus density, Hampden–Hermon growth, and long rural northern/western approaches. Match estimates to central Maine addresses — not Cumberland or York coastal clones.',
      },
      {
        title: 'Downtown Bangor multi-unit rewrites walk-up labor',
        detail:
          'Older multi-story stock, scarce curb near commercial cores, and river-adjacent grids bring stair and truck-length risk. A Hermon ranch or rural township driveway does not share that packet stack.',
      },
      {
        title: 'Orono / UMaine campus density underprices flat-rate optimism',
        detail:
          'Student move-in and move-out waves, multi-unit near campus, and short-window calendar peaks fail estimates more often than packing skill alone when crews assume “quiet college town simple.”',
      },
      {
        title: 'Long rural approaches burn empty miles',
        detail:
          'Northern and western township pairs, lake-edge product, and dispersed residential belts look local on a map of Maine and still burn significant portal time. Price empty miles honestly.',
      },
      {
        title: 'I-95, US-2, and ME-15 freeflow is real',
        detail:
          'Bangor ↔ Orono, Brewer ↔ Hampden, or core ↔ rural pairs look local and still burn 20–55+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter ice and long approaches reshape outdoor labor',
        detail:
          'Freeze-thaw driveway ice, extended rural roads, and older basements raise stair and staging risk from November through March. Prefer early starts and weather contingency — this is not Portland curb density.',
      },
      ME_REG_BULLET,
    ],
  },
  zonesHeading: 'Penobscot County access zones',
  zonesIntro:
    'Plan by downtown Bangor multi-unit, Bangor suburbs / Brewer river pairs, Orono / UMaine campus product, Hampden–Hermon growth, rural northern/western edges, and Penobscot River towns — access rules cluster by density and empty-mile distance more than ZIP alone.',
  zones: [
    {
      id: 'downtown-bangor',
      name: 'Downtown Bangor multi-unit, commercial core & walk-up stock',
      shortName: 'Downtown Bangor',
      neighborhoods: [
        'Downtown Bangor',
        'Main Street corridors',
        'State Street edges',
        'Commercial multi-unit pockets',
        'Riverfront-adjacent blocks',
        'Bangor walk-up stock',
      ],
      housingTypes: 'Walk-up multifamily, older multi-story, mixed commercial-residential, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Downtown curb competition and tight turning radii',
        'Winter ice on pitched and river-adjacent streets',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm building access and curb staging options in writing before load day.',
      cityKeywords: [
        'bangor',
        'downtown bangor',
      ],
    },
    {
      id: 'bangor-suburbs-brewer',
      name: 'Bangor suburbs, Brewer & river-pair residential belts',
      shortName: 'Bangor suburbs / Brewer',
      neighborhoods: [
        'Bangor suburban edges',
        'Brewer',
        'Union Street corridors',
        'Broadway corridors',
        'River-crossing pairs',
        'Suburban multi-unit pockets',
      ],
      housingTypes: 'Ranch and two-story SFH, multi-unit limited, duplexes, suburban stock',
      challenges: [
        'Bridge freeflow and I-95 approach congestion',
        'Mixed municipal rules across Bangor–Brewer pairs',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Clarify Bangor vs Brewer addresses on every estimate. Price river-crossing and I-95 approach time honestly. Align with school calendars when relevant.',
      cityKeywords: [
        'brewer',
        'bangor',
      ],
    },
    {
      id: 'orono-umaine',
      name: 'Orono, University of Maine campus density & student multi-unit',
      shortName: 'Orono / UMaine',
      neighborhoods: [
        'Orono',
        'UMaine campus edges',
        'College Avenue corridors',
        'Student multi-unit pockets',
        'Stillwater edges',
        'Campus-adjacent residential',
      ],
      housingTypes: 'Student multi-unit, walk-ups, SFH near campus, limited elevators',
      challenges: [
        'Move-in / move-out calendar waves',
        'Scarce curb near campus peaks',
        'Short windows and inventory churn',
      ],
      moverTips:
        'Book university peaks weeks ahead. Prefer mid-week early starts outside move-in weekends. Survey multi-unit access carefully for student buildings.',
      cityKeywords: [
        'orono',
        'university of maine',
      ],
    },
    {
      id: 'hampden-hermon',
      name: 'Hampden, Hermon & southern growth belts',
      shortName: 'Hampden / Hermon',
      neighborhoods: [
        'Hampden',
        'Hermon',
        'US-202 / southern corridors',
        'I-95 interchange belts',
        'Growth subdivision pockets',
        'Southern county residential',
      ],
      housingTypes: 'SFH, HOA and subdivision pockets, ranch and two-story stock, multi-unit limited',
      challenges: [
        'I-95 freeflow to Bangor core',
        'Longer empty miles vs downtown multi-unit',
        'School-calendar and subdivision access rules',
      ],
      moverTips:
        'Collect subdivision access notes early. Price empty miles to downtown Bangor honestly. Confirm truck length and driveway turnaround.',
      cityKeywords: [
        'hampden',
        'hermon',
      ],
    },
    {
      id: 'rural-northern-western',
      name: 'Rural northern & western township edges',
      shortName: 'Rural N / W edges',
      neighborhoods: [
        'Northern township edges',
        'Western rural-residential belts',
        'Lake-edge product',
        'Forest-adjacent approaches',
        'Long driveway stock',
        'Dispersed residential nodes',
      ],
      housingTypes: 'Rural SFH, camps and lake homes, long-driveway product, multi-unit rare',
      challenges: [
        'Long empty miles and extended approach times',
        'Gravel driveway width and turnaround limits',
        'Winter ice and remote staging risk',
      ],
      moverTips:
        'Price empty miles and approach time honestly. Survey driveway width, pitch, and turnaround with photos. Prefer weather contingency for winter rural jobs.',
      cityKeywords: [
        'dexter',
        'corinth',
        'charleston',
        'milford',
      ],
    },
    {
      id: 'penobscot-river-towns',
      name: 'Penobscot River towns, Old Town & river-corridor product',
      shortName: 'River towns',
      neighborhoods: [
        'Old Town',
        'Milford edges',
        'River corridor villages',
        'Paper-mill heritage multi-unit pockets',
        'US-2 river corridors',
        'River-adjacent residential',
      ],
      housingTypes: 'Village SFH, older multi-unit, mill-heritage stock, mixed rural-residential',
      challenges: [
        'Older multi-unit stairs and scarce village curb',
        'US-2 freeflow and river-crossing timing',
        'Mixed access product along the corridor',
      ],
      moverTips:
        'Survey stair counts for older multi-unit. Clarify village vs unincorporated addresses. Price US-2 and river-corridor freeflow honestly.',
      cityKeywords: [
        'old town',
        'milford',
        'orono',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Penobscot County moving costs',
    intro:
      'Downtown stairs, campus multi-unit peaks, long rural empty miles, river-pair freeflow, and winter ice move the number more than packing skill alone — this is Bangor regional logistics, not Portland density or York seacoast defaults.',
    drivers: [
      {
        title: 'Multi-flight stairs, walk-ups & downtown curb limits',
        detail:
          'Bangor core multi-unit rewrites jobs that look simple on a map.',
      },
      {
        title: 'UMaine move-in / move-out calendar waves',
        detail:
          'Orono campus multi-unit adds schedule risk and scarce curb before packing skill matters.',
      },
      {
        title: 'Long rural empty miles & driveway geometry',
        detail:
          'Northern and western township approaches add staging distance that flat-rate optimism underprices.',
      },
      {
        title: 'I-95 · US-2 · ME-15 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short inside a large county.',
      },
      {
        title: 'Winter ice on long approaches & older stock',
        detail:
          'Freeze-thaw ice and extended rural roads reshape outdoor labor far more than Portland curb density would suggest.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,600+',
        note: 'Higher with downtown walk-ups, campus peaks, or rural empty miles',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,200–$3,800+',
        note: 'Stairs, multi-unit soft costs, and approach miles trend up',
      },
      {
        label: '3–4+ BR / rural / cross-zone',
        value: '$2,400–$7,500+',
        note: 'Long rural approaches and downtown multi-unit pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$180+/hr',
        note: 'Portal-to-portal; packing, stairs, and empty miles scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Penobscot County move',
    intro:
      'University calendars, school peaks, summer rural tourism, and severe winter ice reshape access and crew availability across the Bangor regional grid — explicitly not Portland tourism density.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear downtown curb, ease multi-unit freight windows, and reduce I-95 pain. Avoid month-end Fridays when leases and campus windows collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars, UMaine move cycles, and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and campus multi-unit slots.',
      },
      {
        title: 'UMaine move-in / move-out risk',
        detail:
          'Campus calendar waves raise cancellation and staging risk near Orono. Prefer flexible dates outside official move weekends when possible.',
      },
      {
        title: 'Winter ice & long-approach labor',
        detail:
          'November–March ice on rural roads, river approaches, and downtown streets reshapes outdoor labor. Prefer early starts and weather contingency — long empty miles compound delays.',
      },
    ],
  },
  specialized: [
    {
      id: 'bangor-rural-umaine',
      title: 'Bangor multi-unit, rural approaches & UMaine logistics module',
      intro:
        'Penobscot County estimates fail more often on stair surveys, campus calendar peaks, long empty miles, and winter approaches than on packing skill alone.',
      bullets: [
        'Survey stair counts, curb options, and building access for downtown Bangor multi-unit early.',
        'Book UMaine move-in / move-out windows weeks ahead for Orono campus multi-unit before the survey is final.',
        'Photo driveway width, pitch, and turnaround for rural northern/western and lake-edge stock.',
        'Price portal-to-portal time for any pair that rides I-95, US-2, or ME-15 — and for long rural approaches.',
        'Clarify Bangor, Brewer, Orono, Hampden, Hermon, Old Town, and rural township addresses on every estimate.',
        'For pure in-state Maine jobs insist on written estimates and insurance certificates; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-portland-density',
      title: 'Not Portland density · not York seacoast module',
      intro:
        'A single “Maine rate” collapses when Bangor regional product is confused with Portland peninsula multi-unit or York beach tourism defaults.',
      bullets: [
        'Do not price downtown Bangor walk-ups like Munjoy Hill condos or like Old Orchard Beach seasonal multi-unit as interchangeable defaults.',
        'State the market as Penobscot County / Bangor regional hub on every estimate — disambiguate from Cumberland Portland and York seacoast.',
        'Match UMaine campus peaks separately from family school-calendar windows and rural empty-mile pricing.',
        'Treat long rural approaches as a primary cost driver — this county is not Portland curb density.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Penobscot County?',
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
              'Penobscot spans Bangor, Brewer, Orono, Hampden, Hermon, Old Town, and many smaller systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus. University of Maine in Orono is a major higher-ed anchor.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular Bangor-area programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Maine Department of Education data, UMaine resources for student households, and campus visits beat ranking screenshots alone.',
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
              'Northern Light Eastern Maine Medical Center and regional specialty campuses anchor care across the Bangor metro and broader county. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-95 freeflow and long rural approaches change “nearby” on paper. Transfer records early.',
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
              'Expect Bangor downtown multi-unit and suburban SFH; Brewer river-pair product; Orono student multi-unit; Hampden–Hermon growth SFH; rural northern/western and lake-edge homes; Old Town and river-corridor village stock. Explicitly not Portland peninsula density.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by Bangor core vs rural location and product type. Budget for older-building repair risk, student rental seasons near UMaine, and longer service distances in rural belts.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Multi-unit management and associations often control move hours, truck size, and deposits. Read documents carefully — especially near campus.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown Bangor / multi-unit lifestyle',
            detail:
              'Suits people prioritizing regional amenities and urban access — with stair, curb, and winter freeflow tradeoffs on move day.',
          },
          {
            title: 'Brewer / Hampden / Hermon suburban living',
            detail:
              'Often appeals for relative space and school access — with I-95 freeflow and mixed municipal rules.',
          },
          {
            title: 'Orono / UMaine campus living',
            detail:
              'Fits students, faculty, and campus-adjacent households — with move-in calendar peaks and multi-unit logistics.',
          },
          {
            title: 'Rural / lake-edge living',
            detail:
              'Attracts households seeking space and lower density — with long empty miles, driveway geometry, and winter approach risk.',
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
              'Healthcare systems, University of Maine, professional services, retail, logistics, education, and regional government concentrate demand across the Bangor hub.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-95, US-2, and ME-15 freeflow is real — including long rural approaches that make “local” distances longer than coastal Maine maps suggest. Test peak routes before choosing solely on rent or purchase price.',
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
              'Penobscot County is Bangor regional central Maine — multi-unit core, UMaine campus, suburban growth, and long rural approaches — not Portland peninsula density and not York seacoast tourism.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / interior Maine climate with warm summers, lake recreation seasons, and often harsher freeze-thaw winters than the southern coast. Plan outdoor staging, ice, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, UMaine cycles, and winter weather reshape daily rhythm more than coastal tourism alone.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Penobscot County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Penobscot County, Maine — official site',
        href: 'https://www.penobscot-county.net/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Bangor',
        href: 'https://www.bangormaine.gov/',
        external: true,
        note: 'Regional hub municipality context',
      },
      {
        label: 'City of Brewer',
        href: 'https://www.brewermaine.gov/',
        external: true,
        note: 'River-pair municipality context',
      },
      {
        label: 'Town of Orono',
        href: 'https://www.orono.org/',
        external: true,
        note: 'UMaine campus town context',
      },
      {
        label: '511 Maine — traveler information',
        href: 'https://www.511maine.gov/',
        external: true,
        note: 'I-95 / US-2 / ME-15 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with downtown multi-unit and stair fluency for Bangor core product; campus calendar awareness for Orono / UMaine; honest long rural empty-mile pricing for northern/western approaches; winter ice staging for extended driveway jobs. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. This is Penobscot County (Bangor regional) — not Portland density and not York seacoast.',
  lastReviewed: '2026-07-24',
});
