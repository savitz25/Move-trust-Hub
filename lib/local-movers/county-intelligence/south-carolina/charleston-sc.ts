import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeScPack,
  SC_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/south-carolina/sc-shared';

/**
 * Charleston County, SC — Lowcountry core (not Horry tourism clone, not Midlands).
 * Historic peninsula constraints, COI/narrow streets, humidity, islands/mainland split.
 */
export const charlestonCountyScIntelligence: CountyIntelligencePack = finalizeScPack({
  countySlug: 'charleston',
  hubTitle: 'Charleston County Moving Intelligence Hub',
  eyebrow: 'Charleston · Lowcountry SC · peninsula, islands & mainland corridors',
  h1: 'Moving in Charleston County: Peninsula Access, Island Bridges & Lowcountry Humidity',
  heroOpener:
    'Charleston County is a Lowcountry logistics puzzle: a historic peninsula with narrow streets, carriage-era lots, and building COIs; barrier-island and Johns Island approaches that live or die on bridge timing; and mainland growth from West Ashley through Mount Pleasant that looks “local” until I-526 and US-17 peak. A Battery walk-up, a Sullivan’s Island cottage, a Daniel Island HOA two-story, and a North Charleston multifamily unit do not share truck access, elevator rules, or humidity-sensitive inventory handling. This hub is for people moving in Charleston County — not a renamed Myrtle Beach tourism page or generic South Carolina template.',
  heroCredibility:
    'SC Class E (ORS/PSC) for intrastate moves · FMCSA for interstate · Peninsula COI & island-bridge awareness · Curated listings',
  majorCorridors: 'I-26 · I-526 · US-17 · SC-7 · local peninsula/island approaches',
  whatMakesDifferent: {
    title: 'What makes moving in Charleston County different',
    intro:
      'These are Charleston Lowcountry realities — peninsula curb limits, island-bridge windows, and coastal humidity — not Upstate manufacturing calendars or Midlands capital-city patterns.',
    bullets: [
      {
        title: 'Peninsula streets and COIs define the job',
        detail:
          'Historic downtown, Harleston Village, Ansonborough, and South of Broad stock often means tight curb, limited legal truck length, long carries, and building or landlord certificates of insurance. Stair counts and timed windows show up more than rural Charleston jobs.',
      },
      {
        title: 'Islands and mainland are different markets on one county map',
        detail:
          'James Island, Johns Island, Folly Beach, Isle of Palms, and Sullivan’s Island pairs add bridge approaches, seasonal visitor traffic, and sometimes HOA or gate rules that West Ashley or North Charleston rentals never face.',
      },
      {
        title: 'I-26, I-526, and US-17 turn short miles into billable time',
        detail:
          'Peninsula ↔ Mount Pleasant, West Ashley ↔ North Charleston, or island ↔ mainland pairs look local and still burn 45–80+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Humidity, salt air, and storm seasons change packing risk',
        detail:
          'Open-air staging, wood furniture, electronics, and textiles need weather plans. Afternoon storms and hurricane-season contingency windows are part of summer estimates, not footnotes.',
      },
      {
        title: 'Mount Pleasant and Daniel Island HOA density',
        detail:
          'Planned communities east of the Cooper often require gate lists, COI, truck-length limits, and approved hours. Collect packets early — same day as the inventory survey when possible.',
      },
      {
        title: 'Tourism and event calendars crowd curb space',
        detail:
          'Spoleto, cruise days, market weekends, and beach-season traffic shrink legal staging near the peninsula and major visitor corridors. Mid-week early starts beat Saturday noon on event weekends.',
      },
      {
        title: 'Multi-county Lowcountry pairs are routine',
        detail:
          'Households regularly move Charleston ↔ Berkeley or Dorchester. Clarify county lines so Class E vs FMCSA assumptions stay accurate when any leg leaves South Carolina.',
      },
      SC_REG_BULLET,
    ],
  },
  zonesHeading: 'Charleston County access zones',
  zonesIntro:
    'Plan by historic peninsula, West Ashley, Mount Pleasant / Daniel Island, barrier islands & Johns Island, and North Charleston / I-26 edge — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'historic-peninsula',
      name: 'Historic peninsula, downtown & near-core neighborhoods',
      shortName: 'Peninsula / Downtown',
      neighborhoods: [
        'Downtown Charleston',
        'South of Broad',
        'Harleston Village',
        'Ansonborough',
        'Cannonborough-Elliotborough',
        'Radcliffeborough edges',
      ],
      housingTypes: 'Historic SFH, multi-story walk-ups, carriage houses, denser multifamily',
      challenges: [
        'Narrow streets, limited curb staging, and tourist congestion',
        'Building COIs, timed windows, and stair-heavy stock',
        'Long carries from legal truck positions',
      ],
      moverTips:
        'Photo curb options, stair counts, and alley access. Prefer mid-week early starts. Confirm COI and elevator rules in writing before final pricing.',
      cityKeywords: [
        'charleston',
        'downtown charleston',
        'south of broad',
        'harleston village',
        'ansonborough',
        'cannonborough',
      ],
    },
    {
      id: 'west-ashley',
      name: 'West Ashley & Ashley River approaches',
      shortName: 'West Ashley',
      neighborhoods: [
        'West Ashley',
        'Avondale edges',
        'Byrnes Downs',
        'Shadowmoss',
        'SC-7 / Sam Rittenberg corridors',
      ],
      housingTypes: 'Mid-century SFH, townhomes, multifamily, some HOA tracts',
      challenges: [
        'SC-7 and Ashley River bridge timing into the peninsula',
        'Mix of older driveways and newer HOA rules',
        'I-526 spillover on cross-zone pairs',
      ],
      moverTips:
        'Build bridge and I-526 buffers for peninsula-bound pairs. Survey driveway slope and tree canopy. Clarify HOA packets on newer tracts.',
      cityKeywords: ['west ashley', 'avondale', 'shadowmoss', 'sam rittenberg', 'sc-7'],
    },
    {
      id: 'mount-pleasant-daniel-island',
      name: 'Mount Pleasant, Daniel Island & east Cooper growth',
      shortName: 'Mt Pleasant / DI',
      neighborhoods: [
        'Mount Pleasant',
        'Daniel Island',
        'Park West',
        'Carolina Park edges',
        'Shem Creek edges',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, waterfront and golf-edge product',
      challenges: [
        'US-17 and Ravenel Bridge peak congestion',
        'HOA gate lists, COI, and truck-length limits',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Price bridge and US-17 pairs honestly. Book peak Saturdays 2–4 weeks ahead.',
      cityKeywords: [
        'mount pleasant',
        'mt pleasant',
        'daniel island',
        'park west',
        'carolina park',
        'shem creek',
      ],
    },
    {
      id: 'islands-johns',
      name: 'James Island, Johns Island, Folly & barrier-island edges',
      shortName: 'Islands / Johns',
      neighborhoods: [
        'James Island',
        'Johns Island',
        'Folly Beach',
        'Isle of Palms',
        "Sullivan's Island",
        'Kiawah / Seabrook edges (access-gated)',
      ],
      housingTypes: 'Coastal cottages, elevated SFH, vacation product, gated resort communities',
      challenges: [
        'Bridge approaches and seasonal visitor traffic',
        'Elevated homes, outdoor gear, and humidity-sensitive inventory',
        'Gate, HOA, and sometimes resort-access rules',
      ],
      moverTips:
        'Confirm bridge timing and gate access the day before. Inventory outdoor furniture and flood-zone staging needs. Prefer early weekday starts in peak beach season.',
      cityKeywords: [
        'james island',
        'johns island',
        'folly beach',
        'isle of palms',
        "sullivan's island",
        'kiawah',
      ],
    },
    {
      id: 'north-charleston-i26',
      name: 'North Charleston, airport & I-26 industrial edges',
      shortName: 'N. Charleston / I-26',
      neighborhoods: [
        'North Charleston',
        'Park Circle',
        'Airport / logistics edges',
        'Dorchester Road corridors',
        'Plant- and port-adjacent multifamily',
      ],
      housingTypes: 'Workforce multifamily, modest SFH, contractor-heavy rentals, some revitalized stock',
      challenges: [
        'I-26 peak congestion and industrial truck traffic',
        'Lease-end waves and short-notice corporate dates',
        'Mix of older street grids and large-complex elevators',
      ],
      moverTips:
        'Ask about hard report-to-work or ship dates. Avoid peak I-26 windows when flexible. Clarify storage-in-transit for military and industrial workforce moves.',
      cityKeywords: [
        'north charleston',
        'park circle',
        'dorchester road',
        'airport',
        'i-26',
      ],
    },
    {
      id: 'summerville-edge',
      name: 'Summerville edge & northwest growth spillover',
      shortName: 'Summerville edge',
      neighborhoods: [
        'Summerville edges (Charleston County pockets)',
        'Ladson edges',
        'Northwest growth tracts',
      ],
      housingTypes: 'HOA SFH, townhomes, larger family inventories',
      challenges: [
        'Longer empty miles from peninsula staging',
        'HOA approved hours on newer subdivisions',
        'I-26 corridor congestion on downtown-bound pairs',
      ],
      moverTips:
        'Price empty miles and I-26 portal time. Send HOA COI requirements with the estimate. Confirm exact county line for Berkeley/Dorchester border addresses.',
      cityKeywords: ['summerville', 'ladson', 'northwest charleston'],
    },
  ],
  costDrivers: {
    title: 'What drives Charleston County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Peninsula COI friction, island-bridge portal time, and HOA soft costs separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Peninsula curb, stairs & historic access',
        detail: 'Narrow streets, long carries, and COI-timed windows add labor before packing skill matters.',
      },
      {
        title: 'I-26 / I-526 / US-17 / bridge congestion',
        detail: 'Cross-zone and island–mainland pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'HOA and gate rules (Mt. Pleasant, DI, islands)',
        detail: 'Gate lists, truck limits, and weekday-only windows push demand into peak pricing.',
      },
      {
        title: 'Humidity, storms & outdoor inventory',
        detail: 'Weather contingency, tarps, and elevated-home logistics raise labor and materials.',
      },
      {
        title: 'Cross-county Lowcountry empty miles',
        detail: 'Berkeley and Dorchester destinations raise staging distance from peninsula-based crews.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,400+', note: 'Higher with peninsula stairs or peak bridges' },
      { label: '2–3BR condo or modest SFH', value: '$1,300–$3,800+', note: 'HOA and COI soft costs trend up' },
      { label: '3–4+ BR / island / cross-zone', value: '$2,400–$7,200+', note: 'Island pairs and historic multi-story price highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$180+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Charleston County move',
    intro: 'Tourism peaks, school calendars, humidity/storms, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear peninsula curb space and reduce bridge / US-17 pain. Avoid month-end Fridays when leases and tourist weekends collide.',
      },
      {
        title: 'Peak family and visitor season: late May–mid-August',
        detail:
          'Mount Pleasant SFH Saturdays and island access fill first. Book 2–4 weeks ahead for peak weekends and holiday weeks.',
      },
      {
        title: 'Summer heat, humidity, and afternoon storms',
        detail:
          'Open-air carries slow after midday. Prefer early starts, hydration plans, and tarp coverage for furniture and electronics.',
      },
      {
        title: 'Hurricane-season contingency (roughly June–November)',
        detail:
          'Tropical systems can freeze island approaches and delay crews. Build flexible reschedule language into peak-season contracts.',
      },
      {
        title: 'Event and cruise calendars',
        detail:
          'Major festivals and busy cruise days shrink downtown staging. Confirm local event calendars before locking a peninsula load window.',
      },
    ],
  },
  specialized: [
    {
      id: 'peninsula-island-coa',
      title: 'Peninsula COI, island bridges & Lowcountry access module',
      intro:
        'Charleston estimates fail more often on historic curb rules, bridge timing, and HOA packets than on packing skill alone.',
      bullets: [
        'Collect building COI, timed windows, and stair/elevator counts before the peninsula survey is final.',
        'Price portal-to-portal time for any pair that rides I-26, I-526, US-17, or major bridges at peak.',
        'Confirm gate lists and truck-length limits for Mount Pleasant, Daniel Island, and resort-edge product.',
        'Plan humidity and storm protection for open-air staging on island and elevated homes.',
        'Clarify Charleston vs Berkeley / Dorchester addresses on every estimate.',
        'Verify SC Class E (ORS) for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'coastal-humidity-inventory',
      title: 'Coastal humidity & elevated-home inventory module',
      intro: 'Salt air, moisture, and raised foundations change how inventory is protected and carried.',
      bullets: [
        'Flag antiques, instruments, and electronics for climate-aware packing and minimal open-air dwell time.',
        'Survey stair runs on elevated cottages — ground-to-living-floor carries are common on islands.',
        'Inventory outdoor furniture, grills, and flood-zone garage contents separately from indoor rooms.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Charleston County?',
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
              'Charleston County School District is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Mount Pleasant or downtown do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'East Cooper and some west-side growth corridors can see enrollment pressure. Ask the district about capacity, choice programs, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, South Carolina Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Medical University of South Carolina (MUSC), Roper St. Francis, and other regional facilities serve peninsula and mainland corridors. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from islands or Mount Pleasant to preferred campuses — bridge congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Peninsula historic stock vs suburban tracts',
            detail:
              'Expect multi-story historic and denser product on the peninsula; larger HOA tracts dominate much of Mount Pleasant, Daniel Island, and parts of West Ashley and Johns Island.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by water proximity, historic district, and island access. Budget for insurance, flood considerations, and HOA dues where applicable.',
          },
          {
            title: 'HOA, historic, and multifamily governance',
            detail:
              'Planned communities, historic districts, and multifamily buildings often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Charleston areas fit whom',
        bullets: [
          {
            title: 'Peninsula urban / historic lifestyle',
            detail:
              'Suits people prioritizing walkable amenities and historic character — with parking, stairs, and curb tradeoffs on move day.',
          },
          {
            title: 'Mount Pleasant / Daniel Island suburban growth',
            detail:
              'Often appeals for newer homes and schools access — with bridge congestion and HOA logistics.',
          },
          {
            title: 'Islands and coastal edges',
            detail:
              'Attracts households seeking beach or Lowcountry water access — with bridge timing, humidity, and sometimes gated rules.',
          },
          {
            title: 'West Ashley / North Charleston value and workforce mix',
            detail:
              'Can fit households balancing commute cost and inventory size — with I-26/I-526 realism and mixed housing ages.',
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
              'Healthcare, tourism and hospitality, port/logistics, defense and aerospace suppliers, professional services, and education concentrate along the peninsula, North Charleston, and major corridor nodes.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent outside the densest peninsula blocks. I-26, I-526, US-17, and bridge peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Charlestons',
            detail:
              'Charleston stacks a historic urban core, East Cooper suburbs, barrier-island edges, and industrial North Charleston — different from Myrtle Beach tourism fabric or Upstate manufacturing patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, mild winters, and tropical-season awareness. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining, arts, and visitor activity concentrate on and near the peninsula; suburban and island corridors feel more residential. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Charleston County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify SC Class E / ORS for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Charleston County — official site',
        href: 'https://www.charlestoncounty.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Charleston',
        href: 'https://www.charleston-sc.gov/',
        external: true,
      },
      {
        label: 'Town of Mount Pleasant',
        href: 'https://www.tompsc.com/',
        external: true,
      },
      {
        label: 'City of North Charleston',
        href: 'https://www.northcharleston.org/',
        external: true,
      },
      {
        label: 'Charleston County School District',
        href: 'https://www.ccsdschools.com/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'SCDOT 511 traffic',
        href: 'https://www.511sc.org/',
        external: true,
        note: 'I-26 / I-526 / bridges before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with peninsula COI, stair, and narrow-street experience for historic stock; HOA fluency for Mount Pleasant and Daniel Island; honest bridge and US-17 timing for island and East Cooper pairs. Verify SC Class E (ORS) for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
