import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Norfolk (independent city), VA — naval/port city, denser urban stock, tunnels/bridges.
 * Not Virginia Beach tourism oceanfront clone; not Chesapeake suburban Greenbrier growth.
 */
export const norfolkCityVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'norfolk',
  hubTitle: 'Norfolk Moving Intelligence Hub',
  eyebrow: 'Norfolk · Naval Station, port city density & tunnel/bridge logistics',
  h1: 'Moving in Norfolk: Naval Base Access, Urban Density & Tunnel Corridor Logistics',
  heroOpener:
    'Norfolk is a naval and port city with denser urban housing stock, installation-driven turnover, and tunnel/bridge approaches that rewrite every Southside pair. A downtown loft with tight curb, a Ghent walk-up, an Ocean View mid-rise, a Naval Station–adjacent multifamily unit, and a Bayview ranch do not share truck access, elevator rules, or calendar pressure. I-64, I-264, I-564, Downtown Tunnel approaches, and Naval Base access corridors turn “short local” estimates into portal-time problems when tunnels back up or base report dates compress the week. This hub is for people moving in Norfolk — not a Virginia Beach tourism clone and not a Chesapeake Greenbrier suburban template.',
  heroCredibility:
    'Virginia DMV Motor Carrier / Household Goods for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-64 · I-264 · I-564 · Downtown Tunnel approaches · Naval Base access corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Norfolk different',
    intro:
      'These are Norfolk naval/port realities — denser urban curb limits, tunnel and bridge timing, and installation calendars — not Virginia Beach resort tourism or Chesapeake master-planned HOA growth.',
    bullets: [
      {
        title: 'Denser urban stock is the default job',
        detail:
          'Downtown, Ghent, Freemason, and near-core blocks mix walk-ups, elevators, limited legal curb, and long carries. Truck length and stair counts matter more than suburban driveway photos.',
      },
      {
        title: 'Naval Station Norfolk drives PCS and workforce churn',
        detail:
          'The world’s largest naval station and surrounding fleet support create order-driven moves, mid-week peaks, and multifamily turnover along base-access corridors that civilian Saturday preference does not fully explain.',
      },
      {
        title: 'Tunnels and bridges rewrite portal time',
        detail:
          'Downtown Tunnel approaches, I-64 / I-264 Hampton Roads crossings, and related bottlenecks make Norfolk ↔ Portsmouth, Norfolk ↔ Chesapeake, and Norfolk ↔ Virginia Beach pairs burn 40–80+ minutes at peak even when map miles look short.',
      },
      {
        title: 'Port and industrial edges add truck competition',
        detail:
          'Port-related and industrial traffic shares approaches with residential crews. Staging near waterfront and terminal-edge neighborhoods needs earlier starts and alternate approach plans.',
      },
      {
        title: 'Ocean View and coastal-edge stock is not VB resort strip',
        detail:
          'Ocean View condos and waterfront-edge SFH bring elevators, wind, and humidity — without Virginia Beach boardwalk tourism as the primary curb story. Survey each building; do not copy oceanfront resort playbooks wholesale.',
      },
      {
        title: 'Older street grids and tight lots dominate many neighborhoods',
        detail:
          'Larchmont, Colonial Place, Park Place, and similar grids need small-truck options, stair inventories, and honest carry distances that Greenbrier-style HOA estimates never model.',
      },
      {
        title: 'Hampton Roads multi-city pairs are routine',
        detail:
          'Households regularly move Norfolk ↔ Virginia Beach, Chesapeake, Portsmouth, or Hampton/Newport News via tunnels and bridges. Clarify independent-city and peninsula addresses so Virginia DMV distance frameworks and FMCSA interstate assumptions stay accurate when any leg leaves Virginia.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Norfolk access zones',
  zonesIntro:
    'Plan by downtown/Ghent core, Naval Station–adjacent corridors, Ocean View coastal edge, westside established grids, and east/southeast I-264 link neighborhoods — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-ghent',
      name: 'Downtown, Ghent, Freemason & near-core urban stock',
      shortName: 'Downtown / Ghent',
      neighborhoods: [
        'Downtown Norfolk',
        'Ghent',
        'Freemason',
        'NEON district edges',
        'Near-core multifamily',
      ],
      housingTypes: 'Lofts, walk-ups, elevators, denser SFH on tight lots',
      challenges: [
        'Limited curb staging and event-day congestion',
        'Stairs and elevator buildings mixed on short blocks',
        'Downtown Tunnel / I-264 approach traffic',
      ],
      moverTips:
        'Photo curb options and stair counts. Prefer mid-week early starts. Confirm elevator/COI rules for loft and mid-rise buildings in writing.',
      cityKeywords: ['downtown norfolk', 'ghent', 'freemason', 'neon', 'downtown'],
    },
    {
      id: 'naval-base-adjacent',
      name: 'Naval Station Norfolk & base-access residential edges',
      shortName: 'Naval Base access',
      neighborhoods: [
        'Naval Station–adjacent multifamily',
        'I-564 corridor residential pockets',
        'Base-workforce rentals',
        'Wards Corner edges',
      ],
      housingTypes: 'Multifamily, townhomes, modest SFH, PCS-oriented rentals',
      challenges: [
        'PCS lease-end waves and hard report dates',
        'Access/ID and security-perimeter awareness near installation edges',
        'I-564 / base-gate traffic at shift peaks',
      ],
      moverTips:
        'Align surveys to orders when possible. Ask about storage-in-transit and HHG vs local self-hire scope. Avoid peak gate ingress windows when flexible.',
      cityKeywords: [
        'naval station',
        'naval base',
        'i-564',
        'wards corner',
        'pcs',
        'norfolk naval',
      ],
    },
    {
      id: 'ocean-view',
      name: 'Ocean View & north coastal-edge Norfolk',
      shortName: 'Ocean View',
      neighborhoods: [
        'Ocean View',
        'Willoughby edges',
        'Coastal multifamily strips',
        'Bayfront SFH pockets',
      ],
      housingTypes: 'Condos, mid-rise, denser SFH, military-workforce mix',
      challenges: [
        'Elevator buildings and limited curb',
        'Wind, humidity, and storm exposure on open carries',
        'Tunnel/bridge timing for peninsula pairs',
      ],
      moverTips:
        'Do not price as Virginia Beach resort oceanfront without surveying. Confirm elevator reservations. Protect soft goods from coastal humidity.',
      cityKeywords: ['ocean view', 'willoughby', 'bayfront', 'north norfolk'],
    },
    {
      id: 'westside-grids',
      name: 'Larchmont, Colonial Place, Park Place & westside grids',
      shortName: 'Westside grids',
      neighborhoods: [
        'Larchmont',
        'Colonial Place',
        'Park Place',
        'Riverview edges',
        'Established westside SFH',
      ],
      housingTypes: 'Older SFH, porches, tight lots, some multifamily',
      challenges: [
        'Narrow streets and limited truck staging',
        'Stairs and long carries on dense blocks',
        'Tree canopy and driveway constraints',
      ],
      moverTips:
        'Survey street width and turn radius. Prefer smaller trucks when needed. Inventory stairs and attic access carefully.',
      cityKeywords: ['larchmont', 'colonial place', 'park place', 'riverview', 'westside norfolk'],
    },
    {
      id: 'east-i264-links',
      name: 'East Norfolk, Military Circle edges & I-264 links',
      shortName: 'East / I-264 links',
      neighborhoods: [
        'Military Circle edges',
        'East Norfolk multifamily',
        'I-264 corridor residential',
        'Virginia Beach–approach neighborhoods',
      ],
      housingTypes: 'Multifamily, townhomes, modest SFH',
      challenges: [
        'I-264 peak congestion toward Virginia Beach',
        'Retail-corridor loading competition',
        'Lease-end multifamily clusters',
      ],
      moverTips:
        'Build I-264 buffer for Virginia Beach destinations. Confirm parking and elevator rules. Prefer early starts for cross-city pairs.',
      cityKeywords: ['military circle', 'east norfolk', 'i-264', 'norfolk virginia beach'],
    },
    {
      id: 'bayview-suburban-edge',
      name: 'Bayview, suburban-edge SFH & southeast pockets',
      shortName: 'Bayview / SE edge',
      neighborhoods: [
        'Bayview',
        'Southeast Norfolk SFH pockets',
        'Suburban-edge tracts inside city limits',
      ],
      housingTypes: 'SFH, some townhomes, limited newer tracts',
      challenges: [
        'Longer empty miles from downtown staging',
        'School-calendar Saturday demand',
        'Mix of HOA and non-HOA access rules',
      ],
      moverTips:
        'Share driveway photos. Do not assume Greenbrier-style HOA packets — verify each address. Price time from core yards honestly.',
      cityKeywords: ['bayview', 'southeast norfolk', 'norfolk suburbs'],
    },
  ],
  costDrivers: {
    title: 'What drives Norfolk moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Urban curb friction, tunnel portal time, elevators/stairs, and PCS calendars separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Downtown / Ghent curb, stairs & elevators',
        detail: 'Near-core staging friction and multi-story access add labor before packing skill matters.',
      },
      {
        title: 'Tunnel, bridge & I-64 / I-264 / I-564 congestion',
        detail: 'Cross-city and peninsula pairs burn portal-to-portal hours when approaches back up.',
      },
      {
        title: 'Naval Station PCS and workforce spikes',
        detail: 'Report dates and multifamily lease-end clusters create mid-week competition for crews.',
      },
      {
        title: 'Tight older grids and long carries',
        detail: 'Westside street width and stair inventories raise labor time on modest square footage.',
      },
      {
        title: 'Coastal-edge weather protection',
        detail: 'Ocean View wind and humidity increase protection and contingency cost risk.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,400+',
        note: 'Higher with downtown stairs/elevators or peak tunnel windows',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,250–$3,700+',
        note: 'Walk-up and elevator soft costs trend up',
      },
      {
        label: '3–4+ BR / dense urban / cross-tunnel',
        value: '$2,400–$7,200+',
        note: 'Downtown multi-story and long tunnel pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$180+/hr',
        note: 'Portal-to-portal; packing scales up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Norfolk move',
    intro:
      'Naval PCS windows, school calendars, heat/humidity, event-day downtown congestion, and hurricane season reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear downtown curb and reduce tunnel pain. Avoid month-end Fridays when leases and PCS dates collide.',
      },
      {
        title: 'Military / PCS high-volume windows',
        detail:
          'Order-driven seasons fill crews first along base-access and multifamily corridors. Book to report dates immediately when known.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'School-calendar SFH demand stacks with military turnover. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Hurricane season awareness (roughly June–November)',
        detail:
          'Late-summer and fall storm risk for coastal-edge and open carries. Confirm weather contingency language.',
      },
    ],
  },
  specialized: [
    {
      id: 'naval-urban-tunnel',
      title: 'Naval base, urban density & tunnel logistics module',
      intro:
        'Norfolk estimates fail more often on curb/elevator access, tunnel portal time, and PCS calendars than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and truck-length limits for downtown, Ghent, and Ocean View stock before the survey is final.',
        'Price portal-to-portal time for any pair that rides I-64, I-264, I-564, or Downtown Tunnel approaches at peak.',
        'Align PCS jobs to report dates; ask about HHG entitlement vs local self-hire scope and storage-in-transit.',
        'Survey westside street width, stair counts, and carry distances — smaller trucks often win on older grids.',
        'Clarify Norfolk vs Virginia Beach / Chesapeake / Portsmouth / peninsula addresses on every estimate.',
        'Verify Virginia DMV motor-carrier / household goods authorization for in-state work and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Norfolk?',
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
              'Norfolk Public Schools is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Ghent, Ocean View, or Bayview do not guarantee a campus.',
          },
          {
            title: 'Urban choice and capacity dynamics',
            detail:
              'Urban divisions can involve specialized programs, transfers, and capacity differences by zone. Ask the division about options, transportation, and calendars when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'Division boundary tools, Virginia Department of Education data, and campus visits beat ranking screenshots alone. Military families should use school liaison resources for PCS timing.',
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
              'Sentara Norfolk General and Children’s Hospital of The King’s Daughters (CHKD) are regional anchors, with additional specialty and military-health pathways for eligible households. Confirm networks and privileges for your situation.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Ocean View, Bayview, or westside grids to preferred campuses — tunnel and I-264 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Denser urban product vs edge SFH',
            detail:
              'Expect lofts, walk-ups, and tight-lot SFH near downtown and Ghent; multifamily along base-access and east corridors; more conventional SFH in Bayview and some westside pockets.',
          },
          {
            title: 'Cost variation inside the city',
            detail:
              'Purchase prices and rents vary by neighborhood character, flood/insurance exposure, and renovation state. Budget for condo fees, older-home systems risk, and parking realities.',
          },
          {
            title: 'Building and landlord governance',
            detail:
              'Downtown and Ocean View multifamily often control move hours, elevator reservations, deposits, and truck size. Read rules carefully before lease signing or closing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Norfolk areas fit whom',
        bullets: [
          {
            title: 'Downtown / Ghent urban lifestyle',
            detail:
              'Suits people prioritizing walkable amenities and cultural density — with parking, stairs, and curb tradeoffs on move day and daily life.',
          },
          {
            title: 'Naval Station–adjacent practical living',
            detail:
              'Often appeals for short commutes to installation work — with multifamily access friction and PCS calendar pressure.',
          },
          {
            title: 'Ocean View coastal-edge living',
            detail:
              'Attracts households wanting water proximity inside Norfolk — without Virginia Beach resort intensity, but with elevator and weather logistics.',
          },
          {
            title: 'Westside historic grids',
            detail:
              'Works for people seeking established neighborhood character — survey truck access carefully.',
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
              'Naval Station Norfolk and defense support, the port and maritime logistics, healthcare (Sentara/CHKD), downtown professional services, and education.',
          },
          {
            title: 'Commute realism',
            detail:
              'Car dependence is high outside a few walkable cores. I-64, I-264, I-564, and tunnel approaches dominate peak friction — including for jobs in Virginia Beach, Chesapeake, or the Peninsula. Test-drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One city, multiple Norfolks',
            detail:
              'Norfolk stacks a naval/port industrial identity, dense historic and loft neighborhoods, base-adjacent multifamily, Ocean View coastal edges, and quieter SFH pockets — different from Virginia Beach tourism oceanfront or Chesapeake suburban Greenbrier growth.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, coastal storms, and hurricane-season risk. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Arts, dining, and events concentrate downtown and Ghent; military and maritime culture shape daily rhythms citywide. Visit at peak commute and event times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Norfolk resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves (distance can change which framework applies) and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Norfolk — official site',
        href: 'https://www.norfolk.gov/',
        external: true,
        note: 'City services & offices',
      },
      {
        label: 'Norfolk Public Schools',
        href: 'https://www.npsk12.com/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: '511 Virginia traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'I-64 / I-264 / tunnels before load windows',
      },
      {
        label: 'Port of Virginia',
        href: 'https://www.portofvirginia.com/',
        external: true,
        note: 'Port & maritime context',
      },
    ],
  },
  directoryHint:
    'Prefer crews with downtown/Ghent curb and stair experience for urban stock; PCS-aware scheduling for Naval Station–adjacent jobs; honest tunnel and I-64 / I-264 / I-564 timing for cross-city pairs; Ocean View elevator fluency without VB resort assumptions. Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
