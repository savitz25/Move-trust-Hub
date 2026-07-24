import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMaPack,
  MA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/massachusetts/ma-shared';

/**
 * Suffolk County, MA — Boston brownstones, elevators/COI, street permits,
 * neighborhood micro-markets (not Middlesex density-suburb contrast,
 * not Norfolk south-metro, not Essex North Shore).
 */
export const suffolkCountyMaIntelligence: CountyIntelligencePack = finalizeMaPack({
  countySlug: 'suffolk',
  hubTitle: 'Suffolk County Moving Intelligence Hub',
  eyebrow: 'Suffolk · Boston brownstones, Back Bay elevators & street-permit logistics',
  h1: 'Moving in Suffolk County: Boston Brownstones, Elevator Towers & Neighborhood Micro-Markets',
  heroOpener:
    'Suffolk County is not a Cambridge walk-up clone and not a South Shore suburban template — it is Boston brownstone and triple-decker stairs with tight curb, Back Bay and Seaport elevator towers with building COIs and dock slots, street-permit friction on narrow neighborhood blocks, and micro-markets that change block by block from Beacon Hill to East Boston. A South End brownstone with no driveway, a Financial District high-rise freight elevator, a Jamaica Plain triple-decker, and a Charlestown rowhouse do not share truck access or crew skill. I-90, I-93, US-1, Storrow Drive, and the local arterial grid rewrite “local” estimates that ignore permits, elevators, and one-way staging. This hub is for people moving in Suffolk County — not a renamed Middlesex page or generic Greater Boston script.',
  heroCredibility:
    'Massachusetts DPU operating certificate for intrastate moves · FMCSA for interstate · Boston brownstone, elevator/COI & street-permit logistics awareness · Curated listings',
  majorCorridors: 'I-90 · I-93 · US-1 · Storrow Drive · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Suffolk County different',
    intro:
      'These are Suffolk and Boston realities — brownstone stairs, elevator/COI stacks, street permits, and neighborhood micro-markets — not Cambridge/Somerville density alone, Norfolk south-metro product, or Essex North Shore coastal calendars.',
    bullets: [
      {
        title: 'Brownstones, triple-deckers, and multi-flight stairs rewrite labor',
        detail:
          'South End, Back Bay edges, Beacon Hill, Charlestown, and large tracts of Dorchester, Jamaica Plain, and Roxbury stack stoops, multi-flight interiors, basements, and long carries. Flat-rate optimism from suburban driveways underprices flight counts and awkward turns.',
      },
      {
        title: 'Elevators, loading docks, and building COIs dominate vertical product',
        detail:
          'Back Bay, downtown, Seaport, West End, and newer South Boston and East Boston towers require elevator reservations, certificate-of-insurance naming, padded protection, and timed dock or freight slots. A Jamaica Plain triple-decker does not share that logistics stack.',
      },
      {
        title: 'Street permits and scarce legal curb define many Boston blocks',
        detail:
          'Resident parking, construction zones, one-ways, and temporary no-parking rules can wipe staging overnight. Confirm whether a street occupancy or moving permit is required before the crew day — day-of surprises burn hours and tickets.',
      },
      {
        title: 'Neighborhood micro-markets are not interchangeable “Boston” quotes',
        detail:
          'Beacon Hill, Allston, East Boston, Hyde Park, and the Seaport are different products a few miles apart. Building type, curb width, truck length, and approach corridors change labor before packing skill matters.',
      },
      {
        title: 'I-90, I-93, US-1, and Storrow turn short map miles into billable hours',
        detail:
          'South End ↔ East Boston, Back Bay ↔ Dorchester, or Charlestown ↔ Jamaica Plain pairs look local and still burn 30–75+ minutes at peak. Tunnel, bridge, and Storrow constraints punish odometer optimism — price portal-to-portal honestly.',
      },
      {
        title: 'Allston–Brighton, Fenway, and university-adjacent lease waves spike volume',
        detail:
          'Student and young-professional turnover compresses demand into late summer and month-end windows. Elevators, street staging, and crew calendars fill early — book hard dates before peak crush.',
      },
      {
        title: 'Multi-county Greater Boston pairs are routine',
        detail:
          'Households regularly move Suffolk ↔ Middlesex, Norfolk, Essex, or Plymouth. Clarify city and county addresses so Massachusetts DPU operating certificate vs FMCSA interstate assumptions stay accurate when any leg leaves Massachusetts.',
      },
      MA_REG_BULLET,
    ],
  },
  zonesHeading: 'Suffolk County access zones',
  zonesIntro:
    'Plan by downtown and Back Bay vertical product, brownstone and triple-decker neighborhoods, South Boston–Seaport stacks, East Boston–Charlestown approaches, and outer Boston residential belts — access rules cluster by neighborhood more than ZIP alone.',
  zones: [
    {
      id: 'downtown-back-bay-vertical',
      name: 'Downtown, Back Bay, West End & Financial District towers',
      shortName: 'Downtown / Back Bay',
      neighborhoods: [
        'Downtown Boston',
        'Back Bay',
        'Financial District',
        'West End',
        'Beacon Hill edges',
        'Theater District edges',
      ],
      housingTypes: 'High-rise condo, mid-rise multifamily, denser brownstone and converted stock',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow collapse',
        'I-93 / I-90 / Storrow approach congestion into the core',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Confirm street-permit needs and photo dock or curb staging options.',
      cityKeywords: [
        'downtown boston',
        'back bay',
        'financial district',
        'west end',
        'beacon hill',
        'boston',
      ],
    },
    {
      id: 'south-end-brownstone',
      name: 'South End, Bay Village & central brownstone corridors',
      shortName: 'South End / brownstones',
      neighborhoods: [
        'South End',
        'Bay Village',
        'South End SOWA edges',
        'Lower Roxbury edges',
        'Columbus Avenue corridors',
        'Tremont Street residential edges',
      ],
      housingTypes: 'Brownstones, walk-up multifamily, renovated townhouses, limited elevators',
      challenges: [
        'Multi-flight stairs, stoops, and long interior carries',
        'Narrow one-ways with scarce truck length',
        'Street-permit and resident-parking friction',
      ],
      moverTips:
        'Survey stair counts, stoop geometry, and curb options with photos. Confirm whether a smaller truck is required. Inventory basements and roof decks carefully.',
      cityKeywords: [
        'south end',
        'bay village',
        'sowa',
        'roxbury',
        'tremont',
        'columbus avenue',
      ],
    },
    {
      id: 'southie-seaport',
      name: 'South Boston, Seaport & Fort Point vertical product',
      shortName: 'Southie / Seaport',
      neighborhoods: [
        'South Boston',
        'Seaport',
        'Fort Point',
        'City Point edges',
        'Andrew Square edges',
        'Waterfront loft corridors',
      ],
      housingTypes: 'High-rise and mid-rise condo, loft conversions, triple-deckers, denser SFH pockets',
      challenges: [
        'Building COIs and elevator windows on newer towers',
        'I-90 / Summer Street / Seaport Boulevard congestion',
        'Mixed triple-decker stairs and tower docks a few blocks apart',
      ],
      moverTips:
        'Collect building packets early for Seaport and Fort Point. Survey triple-decker access separately from tower product. Price I-90 portal time for westbound pairs.',
      cityKeywords: [
        'south boston',
        'seaport',
        'fort point',
        'city point',
        'southie',
        'waterfront',
      ],
    },
    {
      id: 'east-boston-charlestown',
      name: 'East Boston, Charlestown & harbor-approach neighborhoods',
      shortName: 'Eastie / Charlestown',
      neighborhoods: [
        'East Boston',
        'Charlestown',
        'Orient Heights edges',
        'Jeffries Point',
        'Maverick edges',
        'Navy Yard edges',
      ],
      housingTypes: 'Triple-deckers, rowhouses, denser multifamily, limited newer elevator product',
      challenges: [
        'Tunnel and bridge freeflow into downtown',
        'Airport-adjacent and industrial approach timing',
        'Tight streets and multi-flight stair stock',
      ],
      moverTips:
        'Build tunnel and bridge buffers for downtown-linked pairs. Photo curb and stair access. Clarify truck height and length limits on historic Charlestown blocks.',
      cityKeywords: [
        'east boston',
        'charlestown',
        'orient heights',
        'jeffries point',
        'maverick',
        'navy yard',
      ],
    },
    {
      id: 'jp-roxbury-dorchester',
      name: 'Jamaica Plain, Roxbury, Dorchester & central-south residential belts',
      shortName: 'JP / Roxbury / Dot',
      neighborhoods: [
        'Jamaica Plain',
        'Roxbury',
        'Dorchester',
        'Mattapan edges',
        'Forest Hills edges',
        'Uphams Corner edges',
      ],
      housingTypes: 'Triple-deckers, two- and three-family, older SFH, denser apartments',
      challenges: [
        'Multi-unit stair carries and porch inventories',
        'I-93 / Blue Hill Ave / Washington Street corridor congestion',
        'Mixed driveway and curb-only staging by block',
      ],
      moverTips:
        'Survey unit floor, stair width, and parking maps. Price I-93 portal time for north- or westbound pairs. Prefer early starts on arterial commercial strips.',
      cityKeywords: [
        'jamaica plain',
        'roxbury',
        'dorchester',
        'mattapan',
        'forest hills',
        'uphams corner',
      ],
    },
    {
      id: 'allston-brighton-fenway',
      name: 'Allston, Brighton, Fenway & university-adjacent density',
      shortName: 'Allston / Brighton / Fenway',
      neighborhoods: [
        'Allston',
        'Brighton',
        'Fenway',
        'Kenmore edges',
        'Packard\'s Corner edges',
        'Cleveland Circle edges',
      ],
      housingTypes: 'Student and young-professional multifamily, triple-deckers, denser apartments',
      challenges: [
        'Lease-end and academic-calendar volume spikes',
        'Scarce curb and overlapping move-outs',
        'Storrow Drive / Commonwealth Ave / I-90 approach clusters',
      ],
      moverTips:
        'Book late-August and month-end dates early. Confirm unit access type and elevator vs stair. Build Storrow and Commonwealth Ave buffers for core pairs.',
      cityKeywords: [
        'allston',
        'brighton',
        'fenway',
        'kenmore',
        'cleveland circle',
        'commonwealth',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Suffolk County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Elevator soft costs, brownstone stairs, street permits, and I-90 / I-93 / Storrow portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Back Bay, downtown, Seaport, and West End vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Brownstone stairs, triple-deckers & long carries',
        detail:
          'South End, Beacon Hill, Charlestown, and large JP–Dorchester tracts add flight counts and awkward turns that flat-rate optimism underprices.',
      },
      {
        title: 'Street permits & scarce legal curb',
        detail:
          'Temporary occupancy rules, resident parking, and construction zones add admin soft costs and day-of delay risk.',
      },
      {
        title: 'I-90 · I-93 · US-1 · Storrow congestion',
        detail:
          'Cross-city and city–suburb pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Multi-county Greater Boston empty miles',
        detail:
          'Middlesex, Norfolk, Essex, and Plymouth destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$600–$2,100+',
        note: 'Higher with elevators, brownstone walk-ups, or peak I-93 pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,800–$5,200+',
        note: 'Stairs, COI, permits, and dock soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone multi-unit',
        value: '$3,500–$11,000+',
        note: 'Tower moves and long I-90 or I-93 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$140–$250+/hr',
        note: 'Portal-to-portal; packing, COI admin, permits, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Suffolk County move',
    intro:
      'Lease cycles, academic calendars, street-permit lead times, winter curb friction, and elevator windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown and Seaport freight windows, and reduce I-90 / I-93 / Storrow pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and Allston–Brighton academic waves fill first. Book 2–4 weeks ahead for peak weekends, elevator slots, and street-permit lead times.',
      },
      {
        title: 'Winter: snow, ice, and curb shrinkage',
        detail:
          'December–March adds parking bans, icy stoops, and weather cancellations. Prefer flexible dates, early starts, and contingency for ice melt and tarps on brownstone stock.',
      },
      {
        title: 'Professional and mid-month employer spikes',
        detail:
          'Downtown and Seaport professional relocations often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'boston-brownstone-elevator-permit',
      title: 'Boston brownstone, elevator & street-permit logistics module',
      intro:
        'Suffolk estimates fail more often on stair surveys, elevator packets, street-permit timing, and I-90 / I-93 freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Confirm street occupancy or moving-permit needs with the city when curb is restricted.',
        'Photo stair counts, stoop geometry, curb options, and truck length for brownstone and triple-decker stock.',
        'Price portal-to-portal time for any pair that rides I-90, I-93, US-1, or Storrow Drive at peak.',
        'Plan around marathon, sports, and downtown event calendars when either address is core-adjacent.',
        'Clarify Boston neighborhood vs Revere / Chelsea / Winthrop addresses on every estimate.',
        'Verify Massachusetts DPU operating certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'neighborhood-micro-markets',
      title: 'Boston neighborhood micro-market module',
      intro:
        'A single “Boston rate” collapses when tower, brownstone walk-up, and triple-decker product diverge a few miles apart.',
      bullets: [
        'Survey by product — tower, multi-flight brownstone, or triple-decker — not by city name alone.',
        'Ask which approach corridors the crew will actually use at load and unload (I-93 vs I-90 vs Storrow vs local arterials).',
        'Match high-value Back Bay inventories and basement walk-up inventories to different crew experience.',
        'Expect different parking and permit norms even a few blocks apart; do not assume one staging plan covers both addresses.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Suffolk County?',
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
              'Boston Public Schools covers most City of Boston addresses, with a mix of neighborhood, exam, and choice programs. Chelsea, Revere, and Winthrop operate separate systems. Assignment is address- and application-based — marketing names like South End or Jamaica Plain do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows, transportation, and waitlists early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Massachusetts DESE data, and campus visits beat ranking screenshots alone.',
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
              'Mass General Brigham, Beth Israel Deaconess, Boston Medical Center, Tufts Medical Center, and other campuses anchor care across Boston. Specialty options concentrate heavily in-city — confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive or transit times from Jamaica Plain, East Boston, or Allston to preferred campuses — I-93, I-90, and Storrow congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Brownstones, towers, triple-deckers & lofts',
            detail:
              'Expect high-rise product downtown, Back Bay, and Seaport; brownstones and townhouses in South End and Beacon Hill; triple-deckers across large JP–Dorchester–East Boston tracts; and mixed multifamily in Allston–Brighton.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by neighborhood. Budget for condo dues, older-building repair risk, parking, and insurance on higher-value inventories.',
          },
          {
            title: 'Building and condo governance',
            detail:
              'Condo associations often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Suffolk areas fit whom',
        bullets: [
          {
            title: 'Downtown / Back Bay / Seaport urban lifestyle',
            detail:
              'Suits people prioritizing walkability, transit, and amenities — with elevator, parking, event-day, and COI tradeoffs on move day.',
          },
          {
            title: 'South End and brownstone character living',
            detail:
              'Often appeals for stoop-line stock and central access — with stairs, permits, and tight curb staging constraints.',
          },
          {
            title: 'JP, Dorchester & outer residential belts',
            detail:
              'Attracts households seeking more space or neighborhood character — with multi-unit stair logistics and I-93 timing.',
          },
          {
            title: 'East Boston, Charlestown & harbor-edge options',
            detail:
              'Fits buyers chasing waterfront adjacency or relative value — with tunnel/bridge freeflow and triple-decker access norms.',
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
              'Downtown professional and financial services, Seaport tech and biotech, Longwood and hospital systems, universities, government, and airport-adjacent logistics concentrate demand. Many households reverse-commute to Cambridge, Route 128, or south-metro campuses.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving, MBTA subway and bus, ferry, and walking. I-90, I-93, US-1, and Storrow peaks are real. Test drive or ride peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Bostons',
            detail:
              'Suffolk stacks tower living, brownstone grids, triple-decker belts, and harbor-edge neighborhoods — different from Middlesex’s Cambridge–suburb contrast or Norfolk’s south-metro rhythm.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England climate: humid summers, cold winters with snow, and rapid weather swings. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining, arts, sports, universities, and waterfront culture concentrate heavily in-city; outer neighborhoods feel more residential and school-calendar driven. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Suffolk County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Massachusetts DPU operating certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Boston — official site',
        href: 'https://www.boston.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Boston Public Schools',
        href: 'https://www.bostonpublicschools.org/',
        external: true,
        note: 'Boundaries, choice & calendars (Boston addresses)',
      },
      {
        label: 'MBTA — transit',
        href: 'https://www.mbta.com/',
        external: true,
        note: 'Commute planning for core addresses',
      },
      {
        label: 'MassDOT traffic & travel conditions',
        href: 'https://www.mass.gov/traffic-travel',
        external: true,
        note: 'I-90 / I-93 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown, Back Bay, and Seaport product; brownstone and triple-decker stair fluency for South End, Beacon Hill, JP, and Dorchester stock; street-permit readiness; honest I-90 · I-93 · US-1 · Storrow timing for cross-zone pairs. Verify Massachusetts DPU operating certificate for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
