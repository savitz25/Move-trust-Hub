import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Suffolk County, New York moving intelligence.
 * Differentiators: outer Long Island distance, east-end seasonal resorts,
 * longer truck runs and empty miles — not Nassau’s inner-LI/HOA density or NYC-overflow grid.
 */
export const suffolkCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'suffolk',
  hubTitle: 'Suffolk County Moving Intelligence Hub',
  eyebrow: 'Suffolk · Outer Long Island distance & east-end seasons',
  h1: 'Moving in Suffolk County: East-End Seasons, Long Truck Runs & Outer-LI Access Guide',
  heroOpener:
    'Suffolk is outer Long Island at scale: longer empty-mile runs than Nassau, LIE spine congestion from western towns to the forks, east-end seasonal homes that spike in spring and early fall, North Fork farm-and-winery corridors, South Fork resort streets that choke on summer weekends, and inland towns from Huntington to Brookhaven that behave like full suburbs — not beach footnotes. A Montauk cottage, a Southampton estate, a Stony Brook multi-family unit, and a Commack ranch do not share truck access, drive-time risk, or seasonal calendars. Treating Suffolk like “Nassau but east” underprices every leg past Exit 49. This hub is for people actually moving in Suffolk — not recycled inner-LI HOA tips.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · East-end seasonal & long-run access awareness · Curated directory listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Suffolk County different',
    intro:
      'These are Suffolk realities — outer-LI distance, east-end seasons, and long LIE runs — not interchangeable Nassau village density or Westchester hill access.',
    bullets: [
      {
        title: 'Distance and empty miles define the county',
        detail:
          'Western Suffolk to the forks can be a multi-hour portal-to-portal job even without packing complexity. Crews staged near Huntington or Smithtown face real empty-mile cost to East Hampton or Riverhead. Price the clock, not the ZIP radius.',
      },
      {
        title: 'East-end seasonal calendars rewrite demand',
        detail:
          'South Fork and North Fork second homes spike moves around Memorial Day, Labor Day, and shoulder seasons. Summer Saturday curb space vanishes in village cores; mid-week windows matter more than on the western mainland.',
      },
      {
        title: 'LIE spine congestion is the default commute risk',
        detail:
          'I-495 peaks from western Suffolk through Brookhaven turn “one county” pairs into regional drive times. Sunrise Highway and local north–south connectors add more friction near the shore.',
      },
      {
        title: 'South Fork resort streets vs inland SFH contrast',
        detail:
          'Southampton, East Hampton, and Montauk stack narrow village streets, estate drives, high-value contents, and summer tourist traffic. Commack, Centereach, Medford, and similar inland tracts flip to driveway SFH volume and longer but simpler approaches.',
      },
      {
        title: 'North Fork farm roads and ferry-adjacent timing',
        detail:
          'Riverhead, Southold, Greenport, and Orient approaches include two-lane farm roads, winery traffic, and seasonal ferry-related congestion. Oversized trailers need honest approach surveys.',
      },
      {
        title: 'Western Suffolk still has multi-family and HOA product',
        detail:
          'Huntington, Babylon Town, and Islip corridors include condos, apartments, and planned communities with COI and hour rules — but average runs still stretch farther east than typical Nassau jobs.',
      },
      {
        title: 'Nassau-origin pairs are not “local freebies”',
        detail:
          'Households regularly move Nassau ↔ Suffolk. Those legs look regional on a clock. Do not absorb LIE time into a flat local rate without writing it into the estimate.',
      },
      {
        title: 'Intrastate NY rules vs interstate authority',
        detail:
          'Moves entirely within New York are generally subject to NYSDOT household-goods frameworks. Interstate legs (including some Connecticut or out-of-state destinations) need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Suffolk access zones',
  zonesIntro:
    'Plan by western Suffolk suburbs, central Brookhaven band, South Fork east end, North Fork / Riverhead, and South Shore Babylon–Islip corridors — empty miles and seasonal curb risk cluster by zone.',
  zones: [
    {
      id: 'western-suffolk',
      name: 'Western Suffolk: Huntington, Smithtown & Babylon edges',
      shortName: 'Western Suffolk',
      neighborhoods: [
        'Huntington',
        'Huntington Station',
        'Commack',
        'Smithtown',
        'Kings Park',
        'Babylon / West Babylon edges',
      ],
      housingTypes:
        'Suburban SFH, townhomes, multi-family near stations, HOA pockets, some waterfront',
      challenges: [
        'LIE / Northern State / local connector congestion',
        'HOA and multi-family packet rules in denser pockets',
        'Long empty-mile time to east-end destinations',
        'Nassau-border address confusion',
      ],
      moverTips:
        'Price any leg past central Suffolk with honest drive time. Collect HOA packets early. Prefer mid-week morning starts for LIE pairs. Clarify Nassau vs Suffolk on border addresses.',
      cityKeywords: [
        'huntington',
        'commack',
        'smithtown',
        'kings park',
        'babylon',
        'west babylon',
      ],
    },
    {
      id: 'central-brookhaven',
      name: 'Central Suffolk: Brookhaven, Stony Brook & Medford band',
      shortName: 'Central / Brookhaven',
      neighborhoods: [
        'Stony Brook',
        'Setauket / East Setauket',
        'Port Jefferson',
        'Centereach',
        'Selden',
        'Medford / Patchogue edges',
      ],
      housingTypes:
        'University-adjacent multi-family, suburban SFH, townhomes, village multi-unit',
      challenges: [
        'University move-in/out spikes near Stony Brook',
        'LIE Exit-range congestion and long north–south hops',
        'Village curb limits in Port Jefferson and Patchogue cores',
        'Family SFH Saturday demand inland',
      ],
      moverTips:
        'Lock university-adjacent windows early in August. Photo village curb options. Build LIE buffers for west–east pairs. Survey multi-family elevators separately from driveway SFH.',
      cityKeywords: [
        'stony brook',
        'setauket',
        'port jefferson',
        'centereach',
        'selden',
        'medford',
        'patchogue',
        'brookhaven',
      ],
    },
    {
      id: 'south-fork',
      name: 'South Fork: Southampton, East Hampton & Montauk',
      shortName: 'South Fork',
      neighborhoods: [
        'Southampton',
        'Bridgehampton',
        'Sag Harbor edges',
        'East Hampton',
        'Amagansett',
        'Montauk',
      ],
      housingTypes:
        'Resort estates, seasonal cottages, village homes, high-value waterfront, limited multi-family',
      challenges: [
        'Summer tourist traffic and scarce curb staging',
        'Narrow village and estate approach roads',
        'High-value contents and careful-handling expectations',
        'Very long empty miles from western Suffolk staging',
      ],
      moverTips:
        'Prefer mid-week shoulder-season windows when flexible. Survey estate drives and truck turnarounds early. Discuss valuation and weather protection for high-value inventories. Never price Montauk as a short local hop from Huntington.',
      cityKeywords: [
        'southampton',
        'bridgehampton',
        'sag harbor',
        'east hampton',
        'amagansett',
        'montauk',
      ],
    },
    {
      id: 'north-fork-riverhead',
      name: 'North Fork & Riverhead',
      shortName: 'North Fork / Riverhead',
      neighborhoods: [
        'Riverhead',
        'Jamesport',
        'Mattituck',
        'Southold',
        'Greenport',
        'Orient edges',
      ],
      housingTypes:
        'Farm-adjacent SFH, village homes, waterfront cottages, limited multi-family, seasonal product',
      challenges: [
        'Two-lane farm and winery-corridor roads',
        'Seasonal tourist and ferry-related congestion',
        'Long runs from western crew bases',
        'Weather exposure on open approaches',
      ],
      moverTips:
        'Photo farm-road width and driveway turnarounds. Avoid peak weekend winery traffic when possible. Build empty-mile cost into western-origin pairs. Confirm ferry-adjacent timing for Orient-area jobs.',
      cityKeywords: [
        'riverhead',
        'jamesport',
        'mattituck',
        'southold',
        'greenport',
        'orient',
        'north fork',
      ],
    },
    {
      id: 'islip-bay-shore',
      name: 'South Shore central: Islip, Bay Shore, Sayville & Oakdale',
      shortName: 'Islip / South Shore',
      neighborhoods: [
        'Islip',
        'Bay Shore',
        'Brentwood',
        'Sayville',
        'Oakdale',
        'Bohemia / Ronkonkoma edges',
      ],
      housingTypes:
        'Suburban SFH tracts, multi-family corridors, airport-adjacent product, canal and bay edges',
      challenges: [
        'Sunrise Highway and local arterial congestion',
        'MacArthur Airport–adjacent traffic patterns',
        'Mixed HOA and older-grid access',
        'Summer Saturday demand on near-shore streets',
      ],
      moverTips:
        'Price Sunrise Highway pairs with peak buffers. Confirm canal-street truck length. Book family SFH Saturdays early in summer. Clarify multi-family elevator vs walk-up access.',
      cityKeywords: [
        'islip',
        'bay shore',
        'brentwood',
        'sayville',
        'oakdale',
        'bohemia',
        'ronkonkoma',
      ],
    },
    {
      id: 'brookhaven-south-shore',
      name: 'Eastern South Shore: Shirley, Mastic, Moriches & Center Moriches',
      shortName: 'East South Shore',
      neighborhoods: [
        'Shirley',
        'Mastic',
        'Mastic Beach',
        'Moriches',
        'Center Moriches',
        'Eastport edges',
      ],
      housingTypes:
        'Suburban and near-shore SFH, waterfront cottages, limited multi-family',
      challenges: [
        'Longer empty miles from western staging',
        'Narrow near-shore and marsh-adjacent approaches',
        'Storm and flood-season access risk',
        'Limited crew density compared with western Suffolk',
      ],
      moverTips:
        'Never absorb east South Shore distance into a flat western rate. Photo low-clearance and soft-shoulder approaches. Allow weather contingency near the bay.',
      cityKeywords: [
        'shirley',
        'mastic',
        'mastic beach',
        'moriches',
        'center moriches',
        'eastport',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Suffolk moving costs',
    intro:
      'Ranges are market context for local / regional moves — not quotes. Empty miles, east-end seasons, and LIE portal time separate cheap estimates from real bills more than packing skill alone.',
    drivers: [
      {
        title: 'Empty miles & long LIE runs',
        detail:
          'Western staging to central or east-end destinations can dominate billable hours before a single carton is moved. Portal-to-portal pricing must track real drive time.',
      },
      {
        title: 'East-end seasonal demand premiums',
        detail:
          'South Fork and North Fork calendars tighten crew availability around holiday weekends and shoulder seasons. Peak dates price higher even for modest inventories.',
      },
      {
        title: 'Estate access & high-value contents',
        detail:
          'South Fork and some North Shore-edge estates add long drives, gate lists, stairs, and careful-handling expectations.',
      },
      {
        title: 'Village curb friction in resort towns',
        detail:
          'Summer tourist parking and narrow village streets force shuttles and long carries in Southampton, East Hampton, and Montauk cores.',
      },
      {
        title: 'University and multi-family soft costs',
        detail:
          'Stony Brook–area and western multi-family buildings still generate elevator, COI, and window constraints — on top of longer average runs.',
      },
      {
        title: 'Nassau ↔ Suffolk and out-of-county pairs',
        detail:
          'Cross-county Long Island and interstate legs need honest distance assumptions and correct NYSDOT vs FMCSA authority in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same sub-region, simple access)',
        value: '$700–$2,000+',
        note: 'Higher with elevators, long empty miles, or east-end seasons',
      },
      {
        label: '2–3BR SFH or modest multi-family',
        value: '$2,000–$5,200+',
        note: 'LIE portal time and inland family volume trend up',
      },
      {
        label: '3–4+ BR / east-end estate / long cross-county',
        value: '$3,500–$12,000+',
        note: 'South Fork estates and western↔forks pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$140–$225+/hr',
        note: 'Portal-to-portal; long runs and packing scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Suffolk move',
    intro:
      'East-end resort calendars, university cycles, school-year family moves, and LIE peaks all reshape access and crew availability — differently west vs east.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. reduce LIE pain and tourist curb competition. Avoid summer weekend starts in South Fork village cores when flexible.',
      },
      {
        title: 'East-end shoulder seasons',
        detail:
          'Late spring open-ups and early fall close-downs pack Montauk-to-Southampton calendars. Book weeks ahead for Memorial Day and Labor Day windows.',
      },
      {
        title: 'Peak family season inland: May–August',
        detail:
          'Western and central SFH Saturdays fill for school-year timing. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Stony Brook university peaks',
        detail:
          'August move-in and May move-out spike multi-family demand near campus. Reserve elevators and crews early.',
      },
      {
        title: 'Summer South Fork traffic',
        detail:
          'Tourist weekends can make village staging impossible. Prefer mid-week or early morning load windows for resort addresses.',
      },
      {
        title: 'Winter storms and coastal wind',
        detail:
          'Nor’easters and ice slow open carries on east-end and bay-adjacent streets. Plan tarps, mats, and flexible weather holds.',
      },
    ],
  },
  specialized: [
    {
      id: 'east-end-seasonal',
      title: 'East-end seasonal & resort access module',
      intro:
        'South Fork and North Fork jobs fail on distance, tourist curb space, and seasonal calendars more often than on box count.',
      bullets: [
        'Price western staging ↔ forks empty miles in writing — never as a free local hop.',
        'Prefer mid-week and shoulder-season windows for village cores when flexible.',
        'Survey estate drives, gate lists, and truck turnarounds before finalizing crew size.',
        'Discuss valuation and weather protection for high-value seasonal inventories.',
        'Avoid summer holiday weekends for Montauk and East Hampton curb-dependent jobs when possible.',
      ],
    },
    {
      id: 'long-run-lie',
      title: 'Outer-LI long-run & LIE spine module',
      intro:
        'Suffolk’s length along the LIE makes many “local” pairs regional drive-time jobs — especially western suburbs ↔ Brookhaven or the forks.',
      bullets: [
        'Build portal-to-portal buffers for any pair that rides I-495 across multiple exit ranges.',
        'Clarify Nassau vs Suffolk border addresses and multi-stop patterns.',
        'Collect HOA and multi-family packets for western denser pockets early.',
        'Book peak June–August inland SFH Saturdays early — family corridors fill first.',
        'Confirm NYSDOT vs FMCSA authority when any leg leaves New York State.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Suffolk County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, west vs east-end lifestyle — then verify on district and hospital sites. Outer LI is not one housing market.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 in Suffolk spans many independent districts across towns from Huntington to the forks. Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm the specific district for each address. Western, central, and east-end systems differ sharply; town marketing names do not guarantee a campus.',
          },
          {
            title: 'Higher education anchors',
            detail:
              'Stony Brook University and other campuses shape rental demand and traffic near central Suffolk. Factor academic calendars if living near campus corridors.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, NYSED data, and campus visits beat ranking screenshots alone.',
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
              'Stony Brook University Hospital, Northwell affiliates, Catholic Health facilities, and east-end hospitals serve different corridors. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from the forks or South Shore to preferred facilities — LIE and two-lane east-end roads change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'West-to-east stock contrast',
            detail:
              'Expect denser suburban SFH and multi-family in western towns; more seasonal, estate, and village product on the forks; mixed inland tracts through Brookhaven.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'South Fork purchase prices and taxes diverge sharply from inland western towns. Budget for flood insurance near shore, seasonal utility patterns, and longer commutes.',
          },
          {
            title: 'Seasonal ownership patterns',
            detail:
              'Second homes and rental turnover on the east end create different move calendars than year-round western family tracts.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Suffolk areas fit whom',
        bullets: [
          {
            title: 'Western suburban pattern',
            detail:
              'Huntington, Smithtown, and Babylon corridors often appeal for schools, services, and shorter NYC-rail options — with denser traffic and higher average prices than farther east inland towns.',
          },
          {
            title: 'Central / university pattern',
            detail:
              'Stony Brook, Port Jefferson, and Brookhaven bands suit people prioritizing hospital/university access and mixed housing — with LIE-dependent commuting.',
          },
          {
            title: 'East-end pattern',
            detail:
              'South Fork and North Fork living prioritizes coastal and rural character — with seasonal crowds, longer service runs, and very different move logistics.',
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
              'Healthcare and Stony Brook-related employment, education, retail/logistics, tourism and hospitality on the east end, and a large NYC/western-LI commuter workforce shape local jobs.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent outside limited rail corridors. LIE peaks and long east–west distances are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Outer Long Island, not Nassau density',
            detail:
              'Suffolk trades inner-LI village density for distance, beaches, farms, and resort corridors — different from Nassau’s NYC-overflow grid and from upstate winter metros.',
          },
          {
            title: 'Climate',
            detail:
              'Humid summers, coastal storms, and winter nor’easters. East-end wind and inland freeze both affect outdoor staging.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Year-round western suburbs and seasonal east-end villages feel like different counties. Visit in both summer and off-season when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Suffolk resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Suffolk County — official site',
        href: 'https://www.suffolkcountyny.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Town of Huntington',
        href: 'https://www.huntingtonny.gov/',
        external: true,
      },
      {
        label: 'Town of Brookhaven',
        href: 'https://www.brookhavenny.gov/',
        external: true,
      },
      {
        label: 'Town of Southampton',
        href: 'https://www.southamptontownny.gov/',
        external: true,
      },
      {
        label: 'Town of East Hampton',
        href: 'https://www.easthamptonny.gov/',
        external: true,
      },
      {
        label: 'NY 511 — traffic conditions',
        href: 'https://www.511ny.org/',
        external: true,
        note: 'LIE, Sunrise Highway, and east-end approaches before load windows',
      },
      {
        label: 'NYSDOT — motor carriers & household goods',
        href: 'https://www.dot.ny.gov/',
        external: true,
        note: 'Start with NYSDOT for intrastate New York household-goods frameworks',
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        external: true,
        note: 'Required when the move crosses state lines',
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
      {
        label: 'All New York local mover guides',
        href: '/local-movers/new-york',
      },
    ],
  },
  directoryHint:
    'Prefer crews with honest long-run / LIE timing for west↔east pairs; east-end estate and seasonal fluency for South Fork and North Fork; university multi-family experience near Stony Brook; HOA awareness in western denser pockets. Verify NYSDOT for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
