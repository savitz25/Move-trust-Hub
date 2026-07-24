import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMePack,
  ME_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/maine/me-shared';

/**
 * York County, ME — Biddeford/Saco, Sanford, southern seacoast.
 * NOT Portland peninsula / Cumberland clone. NOT Bangor.
 */
export const yorkCountyMeIntelligence: CountyIntelligencePack = finalizeMePack({
  countySlug: 'york',
  hubTitle: 'York County Moving Intelligence Hub',
  eyebrow:
    'York County, ME · Biddeford–Saco / southern seacoast / Sanford & I-95 logistics',
  h1: 'Moving in York County: Biddeford–Saco Twin Cities, Southern Seacoast & I-95 Logistics',
  heroOpener:
    'York County, Maine is southern seacoast and twin-city density — Biddeford–Saco multi-unit and mill-era stock, Kennebunk–Wells coastal cottages, York Beach / York village grids, Sanford inland product, Old Orchard Beach tourism turnover, and NH-border Berwick–Kittery edges — not a Portland peninsula rename and not Bangor central Maine. Expect short NH hops that trigger FMCSA, summer beach congestion on US-1, older mill housing stairs, winter ice on coastal approaches, and I-95 freeflow that rewrites “local” estimates. A Biddeford third-floor walk-up, a Wells seasonal cottage, a Sanford ranch, and a Kittery NH-border pair do not share truck access or authority needs. This hub is for people moving in York County, ME — southern seacoast logistics — not a cloned Cumberland Portland page.',
  heroCredibility:
    'Written estimates + insurance for in-state · FMCSA for interstate (incl. short NH hops) · Seacoast tourism & twin-city logistics · Curated listings',
  majorCorridors: 'I-95 · US-1 · ME-109 · ME-111 · local southern ME grid',
  whatMakesDifferent: {
    title: 'What makes moving in York County different',
    intro:
      'These are York County / southern seacoast realities — Biddeford–Saco twin cities, coastal tourism, Sanford inland product, and NH-border hops — not Portland peninsula multi-unit defaults and not Bangor regional density alone.',
    bullets: [
      {
        title: 'This is York (southern seacoast) — not Portland peninsula or Bangor',
        detail:
          'Ignore Munjoy Hill walk-up templates, Freeport outlet scripts, and Bangor / Orono university defaults. York is Biddeford–Saco twin-city mill and multi-unit stock, Kennebunk–Wells coastal product, York Beach village grids, Sanford inland growth, Old Orchard Beach tourism turnover, and Berwick–Kittery NH-border edges. Match estimates to southern Maine addresses — not Cumberland Portland density.',
      },
      {
        title: 'Biddeford–Saco twin-city multi-unit rewrites mill-era labor',
        detail:
          'Older mill housing, walk-up multifamily, scarce downtown curb, and river-adjacent streets bring stair and truck-length risk. A Kennebunk coastal cottage or Sanford ranch does not share that packet stack.',
      },
      {
        title: 'Coastal tourism peaks underprice flat-rate optimism',
        detail:
          'Old Orchard Beach, Wells, and York Beach summer turnover, US-1 congestion, and seasonal rental calendars fail estimates more often than packing skill alone when crews assume “quiet seacoast simple.”',
      },
      {
        title: 'Short NH hops need FMCSA — not just a Maine in-state script',
        detail:
          'Kittery ↔ Portsmouth, Berwick ↔ Somersworth, and other border pairs look local and still leave Maine. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on SAFER before deposits.',
      },
      {
        title: 'I-95, US-1, ME-109, and ME-111 freeflow is real',
        detail:
          'Biddeford ↔ Sanford, Saco ↔ Kennebunk, or York ↔ Wells pairs look local and still burn 20–50+ minutes at peak tourism. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter ice and older coastal stock reshape outdoor labor',
        detail:
          'Freeze-thaw driveway ice, narrow beach-road lots, and older basements raise stair and staging risk from November through March. Prefer early starts and weather contingency.',
      },
      ME_REG_BULLET,
    ],
  },
  zonesHeading: 'York County access zones',
  zonesIntro:
    'Plan by Biddeford–Saco twin cities, Kennebunk–Wells coastal belts, York Beach / York village product, Sanford inland grids, Old Orchard Beach tourism stock, and NH-border Berwick–Kittery edges — access and authority rules cluster by tourism density and state line more than ZIP alone.',
  zones: [
    {
      id: 'biddeford-saco',
      name: 'Biddeford–Saco twin cities, mill housing & multi-unit cores',
      shortName: 'Biddeford–Saco',
      neighborhoods: [
        'Downtown Biddeford',
        'Downtown Saco',
        'Mill District edges',
        'Main Street corridors',
        'River-adjacent multi-unit',
        'Twin-city walk-up pockets',
      ],
      housingTypes: 'Mill-era multifamily, walk-ups, condos, mixed SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce downtown curb',
        'River bridges and tight turning radii',
        'I-95 / US-1 freeflow between twin cores',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Clarify Biddeford vs Saco municipality on every estimate.',
      cityKeywords: [
        'biddeford',
        'saco',
      ],
    },
    {
      id: 'kennebunk-wells',
      name: 'Kennebunk, Wells & mid-coast cottage / village belts',
      shortName: 'Kennebunk / Wells',
      neighborhoods: [
        'Kennebunk',
        'Kennebunkport edges',
        'Wells',
        'US-1 coastal corridors',
        'Beach-road cottage pockets',
        'Village center grids',
      ],
      housingTypes: 'Coastal SFH, seasonal cottages, village stock, multi-unit limited',
      challenges: [
        'Summer tourism curb and US-1 congestion',
        'Narrow beach-road lots and long carries',
        'Seasonal rental turnover calendars',
      ],
      moverTips:
        'Avoid peak beach weekends when possible. Photo coastal driveway width and turnaround. Confirm seasonal occupancy windows before load day.',
      cityKeywords: [
        'kennebunk',
        'kennebunkport',
        'wells',
      ],
    },
    {
      id: 'york-beach-york',
      name: 'York Beach, York village & southern seacoast grids',
      shortName: 'York / York Beach',
      neighborhoods: [
        'York Beach',
        'York Village',
        'York Harbor edges',
        'Long Sands / Short Sands edges',
        'US-1 southern corridors',
        'Cape Neddick edges',
      ],
      housingTypes: 'Coastal SFH, cottages, village multi-unit pockets, tourist-adjacent stock',
      challenges: [
        'Peak summer beach congestion and scarce curb',
        'Narrow lots and older basements',
        'Tourism-calendar crew availability',
      ],
      moverTips:
        'Prefer mid-week early starts outside July–August peaks. Survey beach-road access carefully. Protect older coastal interiors.',
      cityKeywords: [
        'york',
        'york beach',
        'cape neddick',
      ],
    },
    {
      id: 'sanford-inland',
      name: 'Sanford inland grids, ME-109 / ME-111 & western growth',
      shortName: 'Sanford inland',
      neighborhoods: [
        'Sanford',
        'Springvale edges',
        'ME-109 corridors',
        'ME-111 corridors',
        'Inland subdivision pockets',
        'Western county residential belts',
      ],
      housingTypes: 'SFH, multi-unit limited, ranch and two-story stock, older village product',
      challenges: [
        'Longer empty miles to coastal unload pairs',
        'I-95 / ME-109 freeflow and school-calendar peaks',
        'Mixed driveway and older stock access',
      ],
      moverTips:
        'Price empty miles to Biddeford–Saco and coastal pairs honestly. Collect subdivision access notes early. Align with school calendars when relevant.',
      cityKeywords: [
        'sanford',
        'springvale',
      ],
    },
    {
      id: 'old-orchard-beach',
      name: 'Old Orchard Beach tourism stock & seasonal multi-unit',
      shortName: 'Old Orchard Beach',
      neighborhoods: [
        'Old Orchard Beach',
        'Pier District edges',
        'Saco Avenue corridors',
        'Seasonal multi-unit pockets',
        'Beachfront cottage belts',
        'Tourism-adjacent residential',
      ],
      housingTypes: 'Seasonal multi-unit, cottages, condos, tourist-adjacent SFH',
      challenges: [
        'Extreme summer curb competition and tourism traffic',
        'Seasonal turnover peaks and short windows',
        'Narrow beach blocks and scarce truck length',
      ],
      moverTips:
        'Book well ahead for May–September. Prefer off-peak hours even mid-week. Confirm building and HOA rules for seasonal multi-unit early.',
      cityKeywords: [
        'old orchard beach',
      ],
    },
    {
      id: 'nh-border-berwick-kittery',
      name: 'Kittery, Berwick, Eliot & NH-border edges',
      shortName: 'NH-border edges',
      neighborhoods: [
        'Kittery',
        'Berwick',
        'South Berwick edges',
        'Eliot',
        'ME-236 corridors',
        'Portsmouth-adjacent border pairs',
      ],
      housingTypes: 'SFH, village multi-unit, coastal edges, mixed border product',
      challenges: [
        'Short interstate hops into New Hampshire need FMCSA',
        'Border-bridge freeflow and mixed municipal rules',
        'Navy / shipyard adjacent timing windows near Kittery',
      ],
      moverTips:
        'Verify FMCSA USDOT/MC for any NH leg before deposits. Clarify Maine vs New Hampshire unload addresses. Price border freeflow honestly at peak.',
      cityKeywords: [
        'kittery',
        'berwick',
        'south berwick',
        'eliot',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives York County moving costs',
    intro:
      'Twin-city stairs, coastal tourism curb, seasonal multi-unit, NH-border authority, and I-95 freeflow move the number more than packing skill alone — this is southern seacoast logistics, not Portland peninsula or Bangor defaults.',
    drivers: [
      {
        title: 'Mill-era stairs, walk-ups & twin-city curb limits',
        detail:
          'Biddeford–Saco multi-unit rewrites jobs that look simple on a map.',
      },
      {
        title: 'Coastal tourism peaks & seasonal rental turnover',
        detail:
          'Old Orchard Beach, Wells, and York Beach windows add schedule risk before packing skill matters.',
      },
      {
        title: 'Narrow beach-road lots & older coastal basements',
        detail:
          'Kennebunk–Wells and York cottage stock add carry and flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-95 · US-1 · ME-109 · ME-111 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'NH-border interstate empty miles & authority',
        detail:
          'Kittery–Berwick pairs into New Hampshire raise staging distance and require FMCSA when any leg leaves Maine.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,750+',
        note: 'Higher with twin-city walk-ups, beach peaks, or I-95 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,350–$4,000+',
        note: 'Stairs, tourism soft costs, and coastal curb trend up',
      },
      {
        label: '3–4+ BR / coastal / cross-zone',
        value: '$2,700–$8,200+',
        note: 'Seasonal beach multi-unit and NH-border pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$190+/hr',
        note: 'Portal-to-portal; packing, stairs, and tourism windows scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a York County move',
    intro:
      'Beach tourism peaks, school calendars, seasonal rental turnover, summer US-1 congestion, and winter ice reshape access and crew availability across the southern seacoast grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear twin-city curb, ease multi-unit freight windows, and reduce I-95 / US-1 pain. Avoid month-end Fridays when leases and beach turnover collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars, coastal tourism, and Old Orchard Beach / Wells rental turnover fill first. Book 2–4 weeks ahead for peak weekends and beach multi-unit slots.',
      },
      {
        title: 'Beach tourism & US-1 congestion risk',
        detail:
          'Summer seacoast traffic raises cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Winter ice & freeze-thaw labor',
        detail:
          'November–March ice on coastal lots, twin-city streets, and inland approaches reshapes outdoor labor. Prefer early starts and weather contingency on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'seacoast-tourism-twin-city',
      title: 'Seacoast tourism, twin-city multi-unit & I-95 logistics module',
      intro:
        'York County estimates fail more often on tourism curb, mill-era stairs, seasonal multi-unit, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Survey stair counts, curb options, and mill-era access for Biddeford–Saco product early.',
        'Book mid-week early windows for Old Orchard Beach and coastal multi-unit before peak tourism is final.',
        'Photo beach-road driveway width and turnaround for Kennebunk–Wells–York cottage stock.',
        'Price portal-to-portal time for any pair that rides I-95, US-1, ME-109, or ME-111 at peak.',
        'Clarify Biddeford, Saco, Sanford, Kennebunk, Wells, York, Old Orchard Beach, and Kittery addresses on every estimate.',
        'For pure in-state Maine jobs insist on written estimates and insurance certificates; verify FMCSA for any out-of-state leg including short NH hops.',
      ],
    },
    {
      id: 'not-portland-nh-border',
      title: 'Not Portland peninsula · NH-border FMCSA module',
      intro:
        'A single “southern Maine rate” collapses when York seacoast product is confused with Portland peninsula density or when border pairs skip interstate authority.',
      bullets: [
        'Do not price Biddeford mill walk-ups like Munjoy Hill condos or like Sanford inland ranch as interchangeable defaults.',
        'State the market as York County / southern seacoast on every estimate — disambiguate from Cumberland Portland metro.',
        'Treat Kittery–Berwick–Eliot pairs into New Hampshire as interstate — FMCSA USDOT/MC required when any leg leaves Maine.',
        'Match beach tourism peaks separately from inland Sanford school-calendar windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to York County?',
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
              'York spans Biddeford, Saco, Sanford, Kennebunk, Wells, York, Old Orchard Beach, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular coastal and twin-city programs can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Maine Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Southern Maine Health Care (Biddeford and regional campuses), York Hospital, and Portland-metro specialty partners anchor care across the county. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-95, US-1, and tourism freeflow change “nearby” on paper. Transfer records early.',
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
              'Expect Biddeford–Saco mill-era multi-unit and twin-city SFH; Kennebunk–Wells–York coastal cottages; Sanford inland residential; Old Orchard Beach seasonal multi-unit; Berwick–Kittery border product.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by beachfront vs inland location and product type. Budget for older-building repair risk, seasonal rental markets, and competitive summer turnover near the shore.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Condo associations, seasonal multi-unit management, and HOAs often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Biddeford–Saco twin-city lifestyle',
            detail:
              'Suits people prioritizing relative value, amenities, and twin-city access — with mill-era stairs and curb tradeoffs on move day.',
          },
          {
            title: 'Kennebunk / Wells / York coastal living',
            detail:
              'Often appeals for seacoast character and village feel — with tourism congestion and narrow-lot logistics.',
          },
          {
            title: 'Sanford inland living',
            detail:
              'Fits buyers chasing inland space and relative value — with longer empty miles to coastal cores.',
          },
          {
            title: 'Kittery / Berwick border living',
            detail:
              'Attracts households seeking NH-metro access — with interstate authority needs on many short hops and border freeflow.',
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
              'Healthcare systems, education, tourism and hospitality, retail, shipyard-adjacent employment near Kittery, and Portland-metro reverse-commute patterns concentrate demand across York County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-95, US-1, ME-109, and ME-111 freeflow is real — including beach-season choke points and NH-border bridges. Test peak routes before choosing solely on rent or purchase price.',
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
              'York County is southern seacoast Maine — Biddeford–Saco twin cities, beach tourism, Sanford inland product, and NH-border edges — not Portland peninsula density and not Bangor central Maine.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / coastal Maine climate with cool summers, intense beach tourism peaks, nor’easters, and freeze-thaw winters. Plan outdoor staging, ice, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak beach season and off-peak times when deciding — school calendars, tourism cycles, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful York County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs (including short NH hops) before deposits.',
    items: [
      {
        label: 'York County, Maine — official site',
        href: 'https://www.yorkcountymaine.gov/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Biddeford',
        href: 'https://www.biddefordmaine.org/',
        external: true,
        note: 'Twin-city municipality context',
      },
      {
        label: 'City of Saco',
        href: 'https://www.sacomaine.org/',
        external: true,
        note: 'Twin-city municipality context',
      },
      {
        label: 'City of Sanford',
        href: 'https://www.sanfordmaine.org/',
        external: true,
        note: 'Inland municipality context',
      },
      {
        label: '511 Maine — traveler information',
        href: 'https://www.511maine.gov/',
        external: true,
        note: 'I-95 / US-1 / ME-109 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with twin-city multi-unit and mill-era stair fluency for Biddeford–Saco product; coastal tourism curb awareness for Old Orchard Beach–Wells–York; honest I-95 · US-1 · ME-109 · ME-111 timing for cross-zone pairs; FMCSA verification for any NH-border hop. For pure in-state Maine moves insist on written estimates and insurance certificates; verify FMCSA for interstate legs before deposits. This is York County (southern seacoast) — not Cumberland Portland and not Bangor / Penobscot.',
  lastReviewed: '2026-07-24',
});
