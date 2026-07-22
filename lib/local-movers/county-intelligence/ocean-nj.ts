import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Ocean County, New Jersey moving intelligence.
 * Used by /local-movers/new-jersey/ocean and the shared intelligence template.
 *
 * Differentiators vs Monmouth / generic Jersey Shore:
 * Barrier islands (LBI, Seaside/Ortley) with causeway access; county seat Toms River;
 * Lakewood as a dense, demographically distinct housing market; large inland
 * retirement / 55+ communities (Jackson, Manchester); Route 37 / 72 island spines;
 * not Monmouth’s Asbury–Red Bank–Freehold profile.
 */
export const oceanCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'ocean',
  hubTitle: 'Ocean County Moving Intelligence Hub',
  eyebrow: 'Ocean County · Jersey Shore / inland guide',
  h1: 'Moving in Ocean County, NJ: Toms River, Lakewood, LBI & Inland Zone Guide',
  heroOpener:
    'Ocean County (~674,000–679,000 residents) is one of New Jersey’s larger, faster-growing counties — and one of the least interchangeable “shore” markets. Barrier islands and beach towns (Point Pleasant Beach, Seaside, Lavallette, Ortley Beach, Long Beach Island) mean narrow roads, causeway timing, seasonal congestion, sand, and flood-zone logistics. Inland, Toms River, Brick, Jackson, Manchester, and Stafford flip the job to suburban tracts, HOAs, and large retirement / 55+ communities with strict move windows. Lakewood is demographically and housing-pattern distinct: denser multi-family and multi-generational stock, different curb and scheduling realities than a bayfront cottage or an LBI summer house. Garden State Parkway, Routes 9, 37, 70, and 72 turn short-looking locals into real portal-to-portal time — especially summer weekends when shore-bound traffic packs the exits. This guide is for people actually moving in Ocean County — not generic Jersey Shore tips recycled from Monmouth.',
  heroCredibility:
    'Barrier islands · Lakewood density · Retirement communities · Shore vs inland · Intrastate NJ · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Ocean County different',
    intro:
      'These are Ocean-specific realities — barrier-island access, Lakewood’s distinct patterns, and inland retirement townships — not interchangeable shore boilerplate.',
    bullets: [
      {
        title: 'Dual identity: barrier islands + large inland townships',
        detail:
          'An LBI seasonal house, a Toms River family home, a Lakewood multi-family block, and a Jackson 55+ community do not share truck access, HOA rules, or inventory profiles. Put both towns in the estimate assumptions.',
      },
      {
        title: 'County seat Toms River anchors year-round suburban demand',
        detail:
          'Toms River and Brick concentrate medical, retail, and family housing. Moves here feel conventional suburban — until Route 37 backs up toward the barrier or the Parkway fills on a Friday in July.',
      },
      {
        title: 'Lakewood is not “generic Ocean County”',
        detail:
          'Lakewood’s density, multi-generational households, and local housing patterns create different curb staging, multi-unit access, and calendar pressure than shore cottages or inland retirement tracts. Survey the exact block and building type — do not price it like a bayfront ranch.',
      },
      {
        title: 'Seasonal, second-home, and retirement move patterns',
        detail:
          'Late spring through early fall, barrier towns see second-home turnovers, short-term rental changes, and summer arrivals. Inland 55+ and adult communities run year-round but enforce approved hours and COI. Peak calendars stack — book early for Saturdays May–September.',
      },
      {
        title: 'Barrier-island roads, causeways, and flood-zone logistics',
        detail:
          'LBI (Route 72), Seaside/Ortley access, and low-lying shore streets can limit truck length, staging, and weather windows. Storm surge, tidal flooding, and post-storm debris are real operational factors — build flexibility into coastal load dates.',
      },
      {
        title: 'Narrow island streets and summer curb competition',
        detail:
          'Legal truck parking disappears on beach weekends. Smaller trucks, shuttles, and temporary no-parking strategies beat forcing a 26′ trailer onto a one-way island block in July.',
      },
      {
        title: 'Parkway, Route 9, 37, 70, and 72 control the clock',
        detail:
          'Garden State Parkway is the north–south spine; Route 9 runs inland; Routes 37 and 72 feed barrier islands; Route 70 ties western townships. Shore-bound Friday afternoons and Sunday reverse traffic can double portal-to-portal time. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'New Jersey intrastate rules vs. interstate authority',
        detail:
          'Moves entirely within New Jersey are generally overseen under New Jersey household-goods / BPU frameworks for licensed carriers. Legs into New York or other states need FMCSA interstate authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and seasonal profile. Point Pleasant–Brick, barrier islands (including LBI), Toms River core, Lakewood, western inland townships, and southern Ocean communities are not interchangeable under one “Ocean local” label.',
  zones: [
    {
      id: 'northern-shore',
      name: 'Northern Shore / Point Pleasant–Brick Corridor',
      shortName: 'N. Shore / Brick',
      neighborhoods: [
        'Point Pleasant',
        'Point Pleasant Beach',
        'Brick',
        'Bay Head',
        'Mantoloking edge',
        'Normandy Beach edge',
        'Herbertsville / Laurelton edges',
      ],
      housingTypes:
        'Shore cottages and multi-story beach homes, multi-family near bay/ocean, conventional suburban SFH in Brick, mixed bayfront stock',
      challenges: [
        'Summer weekend congestion on local shore arteries and Parkway exits',
        'Limited curb staging in Point Pleasant Beach and bayfront blocks',
        'Mix of seasonal and year-round inventories on the same route',
        'Brick is large — access varies block to block (suburban vs. waterfront)',
      ],
      moverTips:
        'Clarify Point Pleasant Beach vs. inland Brick on the survey. Prefer mid-week mornings May–September. Share approach photos for bayfront or tight beach blocks. Smaller trucks often win near the water; Brick HOA tracts need packets when applicable.',
      cityKeywords: [
        'point pleasant',
        'point pleasant beach',
        'brick',
        'bay head',
        'mantoloking',
        'normandy beach',
        'laurelton',
      ],
    },
    {
      id: 'barrier-islands',
      name: 'Central Shore & Barrier Islands',
      shortName: 'Barrier / LBI',
      neighborhoods: [
        'Seaside Heights',
        'Seaside Park',
        'Lavallette',
        'Ortley Beach',
        'Long Beach Island',
        'Ship Bottom',
        'Surf City',
        'Long Beach Township',
        'Beach Haven',
        'Barnegat Light',
      ],
      housingTypes:
        'Seasonal and year-round beach homes, multi-story rentals, elevated flood-zone construction, limited multi-family, older cottages mixed with rebuilds',
      challenges: [
        'Narrow island roads and limited legal truck staging — especially peak summer',
        'Causeway timing (Route 37 / Route 72) and single-spine congestion',
        'Flood-zone, elevation, and storm-window constraints',
        'Sand, humidity, and outdoor furniture volume on beach inventories',
        'Short-term rental and second-home turnover spikes',
      ],
      moverTips:
        'Book barrier moves mid-week and off-peak when possible. Confirm truck length limits and bridge/causeway constraints for LBI. Protect floors from sand; plan temporary no-parking where allowed. Build weather flexibility for flood-prone streets. Do not schedule major island jobs on July 4th or peak festival weekends unless forced by lease.',
      cityKeywords: [
        'seaside heights',
        'seaside park',
        'lavallette',
        'ortley',
        'long beach island',
        'lbi',
        'ship bottom',
        'surf city',
        'beach haven',
        'barnegat light',
        'long beach township',
      ],
    },
    {
      id: 'toms-river',
      name: 'Toms River & Immediate Surroundings',
      shortName: 'Toms River',
      neighborhoods: [
        'Toms River',
        'Downtown / Washington Street area',
        'Silverton',
        'Ortley mainland approaches',
        'Bayville edge',
        'South Toms River',
        'Beachwood edge',
      ],
      housingTypes:
        'Suburban single-family, multi-family and garden apartments, some waterfront-adjacent stock, commercial-corridor multi-unit',
      challenges: [
        'Route 37 congestion toward the barrier on summer Fridays',
        'Parkway exit traffic into the township',
        'HOA rules in many planned neighborhoods',
        'Medical/retail corridor staging limits mid-day',
      ],
      moverTips:
        'Toms River is the operational hub of the county — most “locals” still need honest time to Brick, Lakewood, or the islands. Prefer mid-week mornings. Collect HOA packets for planned communities. If one end is barrier, treat Route 37 as a primary bottleneck.',
      cityKeywords: [
        'toms river',
        'silverton',
        'bayville',
        'south toms river',
        'beachwood',
      ],
    },
    {
      id: 'lakewood',
      name: 'Lakewood',
      shortName: 'Lakewood',
      neighborhoods: [
        'Lakewood Township',
        'Downtown Lakewood',
        'Multi-family corridors',
        'Newer residential sections',
        'Industrial / warehouse edges',
      ],
      housingTypes:
        'Higher-density multi-family and multi-generational homes, older and newer SFH, duplexes and multi-unit buildings, mixed commercial-residential blocks',
      challenges: [
        'Dense curb competition and limited large-truck staging on many blocks',
        'Distinct community calendars and peak family-move windows',
        'Multi-unit access and long carries from legal parking',
        'Different inventory profiles than shore cottages or 55+ communities',
      ],
      moverTips:
        'Do not price Lakewood like a barrier cottage or Jackson ranch. Survey exact block access, multi-unit rules, and preferred load windows. Smaller trucks and early starts often beat mid-day curb fights. Confirm elevator/COI only where multi-unit buildings require them — many jobs are walk-ups and multi-generational SFH.',
      cityKeywords: [
        'lakewood',
        'lakewood township',
      ],
    },
    {
      id: 'western-inland',
      name: 'Western / Inland Townships',
      shortName: 'Western Inland',
      neighborhoods: [
        'Jackson',
        'Manchester',
        'Plumsted',
        'New Egypt edge',
        'Whiting',
        'Lakehurst edge',
        'Six Flags / commercial edges (Jackson)',
      ],
      housingTypes:
        'Suburban tracts, large 55+ and adult communities, single-family on larger lots, townhome HOAs, some rural-edge properties in Plumsted',
      challenges: [
        'Near-universal HOA / community association rules in retirement developments',
        'Approved hours and COI requirements in many 55+ communities',
        'Longer hauls to barrier islands on summer weekends',
        'Route 70 / Parkway / Route 9 congestion for cross-county pairs',
      ],
      moverTips:
        'Jackson and Manchester retirement communities are packet-first — collect rules before the estimate. Mid-week mornings beat both HOA windows and shore-bound traffic if the other end is coastal. Plumsted/New Egypt can mean longer driveways and rural access. Clarify 55+ vs. conventional SFH on the survey.',
      cityKeywords: [
        'jackson',
        'manchester',
        'plumsted',
        'new egypt',
        'whiting',
        'lakehurst',
      ],
    },
    {
      id: 'southern-ocean',
      name: 'Southern Ocean',
      shortName: 'Southern Ocean',
      neighborhoods: [
        'Barnegat',
        'Stafford',
        'Manahawkin',
        'Little Egg Harbor',
        'Tuckerton',
        'Eagleswood edge',
        'LBI mainland approaches (Manahawkin)',
      ],
      housingTypes:
        'Suburban SFH, bayfront and lagoon homes, multi-family pockets, mainland staging for LBI, mix of year-round and seasonal',
      challenges: [
        'Route 72 congestion for LBI access on summer peaks',
        'Bayfront / lagoon limited staging and longer carries',
        'HOA rules in many Stafford / Barnegat developments',
        'Distance to northern county centers (Toms River / Brick)',
      ],
      moverTips:
        'Manahawkin / Stafford often stage LBI moves — confirm whether the job ends on-island or mainland. Bayfront lagoon streets need smaller trucks and careful backing. Prefer mid-week for Route 72. Southern Ocean ↔ Lakewood or Point Pleasant pairs are long locals — quote portal-to-portal honestly.',
      cityKeywords: [
        'barnegat',
        'stafford',
        'manahawkin',
        'little egg harbor',
        'tuckerton',
        'eagleswood',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Ocean County',
    intro:
      'Two “local” Ocean moves of the same square footage can differ sharply depending on barrier-island staging, Lakewood density, 55+ HOA soft costs, and summer Parkway time.',
    drivers: [
      {
        title: 'Barrier-island access, shuttles & causeway time',
        detail:
          'Narrow island roads and Route 37/72 bottlenecks often require smaller trucks, shuttles, or longer carries — especially LBI and Seaside/Ortley in peak season.',
      },
      {
        title: 'Seasonal demand & peak-weekend premiums',
        detail:
          'Memorial Day through Labor Day tightens crew availability for shore and second-home jobs. Book early or accept mid-week windows for better rates and access.',
      },
      {
        title: 'Retirement / 55+ community soft costs',
        detail:
          'COI, approved hours, and gate lists in Jackson, Manchester, and similar communities add soft costs and can force weekday-only moves.',
      },
      {
        title: 'Lakewood density & multi-unit labor',
        detail:
          'Denser blocks and multi-generational inventories can raise labor minutes per stop versus open suburban driveways — survey carefully.',
      },
      {
        title: 'Parkway / Routes 9 · 37 · 70 · 72 congestion',
        detail:
          'Portal-to-portal time tracks shore-bound peaks. Toms River ↔ LBI or Jackson ↔ Point Pleasant can burn 45–90+ minutes each way on bad summer Fridays.',
      },
      {
        title: 'Sand, humidity, flood-zone & outdoor volume',
        detail:
          'Beach inventories need floor protection and weather covers; elevated flood-zone homes can mean more stairs and careful exterior staging.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,350+',
        note: 'Higher with island staging, elevators, or peak summer weekends',
      },
      {
        label: '2–3BR multi-family or modest SFH',
        value: '$1,600–$4,000+',
        note: 'HOA soft costs and shore long-carries trend up',
      },
      {
        label: '3–4+ BR (barrier island / cross-zone / summer peak)',
        value: '$2,500–$6,800+',
        note: 'LBI/Seaside access and inland↔island pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$190+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Traffic, seasonal & calendar intelligence',
    intro:
      'Ocean peaks follow the shore calendar, retirement community rules, and Parkway tourism — barrier access makes bad timing expensive.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings, especially May–September',
        detail:
          'Tuesday–Thursday starts before 9 a.m. usually clear island curb space and reduce Parkway / Route 37 / Route 72 pain. Avoid last Friday/Saturday of the month and major beach holidays when possible.',
      },
      {
        title: 'Peak shore & second-home season: late spring – early fall',
        detail:
          'Tourism and seasonal house turnovers fill barrier crews. Book 2–4 weeks ahead for LBI, Seaside, Lavallette, and Point Pleasant Beach Saturdays.',
      },
      {
        title: 'Inland retirement communities (year-round rules)',
        detail:
          'Jackson and Manchester 55+ communities enforce approved hours even in winter. Collect packets early; do not assume Saturday access.',
      },
      {
        title: 'Lakewood family-move calendars',
        detail:
          'Local peak windows can differ from shore tourism peaks. Confirm preferred days with the household — density makes mid-day curb access harder.',
      },
      {
        title: 'Storm, flood, and wind windows on the barrier',
        detail:
          'Coastal flood watches and post-storm debris can delay island access. Build contingency dates for LBI and low-lying shore streets in hurricane season.',
      },
      {
        title: 'Off-peak shore advantage (October–April)',
        detail:
          'Easier curb access and more flexible crews — good for complex multi-story beach homes that need time without summer traffic.',
      },
    ],
  },
  resources: {
    title: 'Practical Ocean County resources',
    intro:
      'Official links and licensing notes — island access, HOA, and municipal rules change; verify before move day.',
    items: [
      {
        label: 'Ocean County, NJ — official site',
        href: 'https://www.co.ocean.nj.us/',
        external: true,
      },
      {
        label: 'Township of Toms River',
        href: 'https://www.tomsrivertownship.com/',
        external: true,
      },
      {
        label: 'Township of Lakewood',
        href: 'https://www.lakewoodnj.gov/',
        external: true,
      },
      {
        label: 'Township of Brick',
        href: 'https://www.bricktownship.net/',
        external: true,
      },
      {
        label: 'Township of Jackson',
        href: 'https://www.jacksontwpnj.net/',
        external: true,
      },
      {
        label: 'Township of Stafford (Manahawkin / LBI mainland)',
        href: 'https://www.staffordnj.gov/',
        external: true,
      },
      {
        label: 'Long Beach Township',
        href: 'https://www.longbeachtownship.com/',
        note: 'LBI municipal rules and parking',
        external: true,
      },
      {
        label: 'NJ 511 — traffic conditions',
        href: 'https://www.511nj.org/',
        note: 'Check Parkway, Routes 9/37/70/72 before locking load windows',
        external: true,
      },
      {
        label: 'NJ Board of Public Utilities — utilities & consumer info',
        href: 'https://www.nj.gov/bpu/',
        note: 'Start with BPU for NJ utility and consumer frameworks; confirm mover licensing for your route',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'JCP&L / FirstEnergy — electric service (much of Ocean)',
        href: 'https://www.firstenergycorp.com/jcp_l.html',
        note: 'Confirm your exact utility for gas/electric start-stop',
        external: true,
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
    ],
  },
  directoryHint:
    'Filter listings by zone (N. Shore/Brick, Barrier/LBI, Toms River, Lakewood, Western Inland, Southern Ocean) when available. Confirm summer island staging and 55+ HOA rules for Jackson/Manchester — and never price Lakewood like a barrier cottage.',
  lastReviewed: '2026-07-22',
};
