import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeScPack,
  SC_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/south-carolina/sc-shared';

/**
 * Greenville County, SC — Upstate core (not Spartanburg clone, not Midlands).
 * Downtown revival, suburbs, BMW/manufacturing corridor, I-85 logistics.
 */
export const greenvilleCountyScIntelligence: CountyIntelligencePack = finalizeScPack({
  countySlug: 'greenville',
  hubTitle: 'Greenville County Moving Intelligence Hub',
  eyebrow: 'Greenville · Upstate SC · downtown, suburbs & I-85 manufacturing belt',
  h1: 'Moving in Greenville County: Downtown Access, Suburban HOAs & I-85 Logistics',
  heroOpener:
    'Greenville County is the Upstate’s growth engine: a revived downtown and West End with tight curb and multi-story stock, master-planned suburbs from Greer to Simpsonville, and an I-85 manufacturing belt that pulls corporate and industrial traffic through the same corridors movers use. A downtown loft, a Travelers Rest craftsman, a Five Forks HOA two-story, and a Greer plant-adjacent rental do not share truck access or portal time. I-85, I-385, US-123, and SC-183 rewrite “local” estimates that ignore HOA packets and peak manufacturing shift windows. This hub is for people moving in Greenville County — not a renamed Spartanburg page or generic South Carolina template.',
  heroCredibility:
    'SC Class E (ORS/PSC) for intrastate moves · FMCSA for interstate · Upstate HOA & I-85 corridor awareness · Curated listings',
  majorCorridors: 'I-85 · I-385 · US-25 · SC-14 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Greenville County different',
    intro:
      'These are Greenville Upstate realities — downtown revival curb limits, I-85 plant traffic, and suburban HOA density — not Lowcountry peninsula rules or Myrtle Beach tourism calendars.',
    bullets: [
      {
        title: 'Downtown and West End curb is the job',
        detail:
          'Main Street-adjacent lofts, multi-story walk-ups, and event-day congestion mean limited legal truck length and long carries. Building or landlord COIs and timed windows show up more often than rural Greenville jobs.',
      },
      {
        title: 'I-85 and I-385 turn short map miles into billable time',
        detail:
          'Downtown ↔ Greer, downtown ↔ Simpsonville, or Travelers Rest ↔ Five Forks pairs look local and still burn 40–75+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Manufacturing and corporate calendars shape demand',
        detail:
          'BMW-adjacent and broader I-85 industrial corridors create mid-week peaks, contractor traffic, and corporate relocation clusters that compete with residential Saturday demand.',
      },
      {
        title: 'Suburban HOA villages dominate south and east growth',
        detail:
          'Five Forks, Simpsonville, Mauldin, and Greer growth tracts often require gate lists, COI, truck-length limits, and approved hours. Collect packets early.',
      },
      {
        title: 'Hills, older stock, and rural edges still exist',
        detail:
          'Travelers Rest foothill approaches, older Greenville street grids, and northern rural parcels need driveway photos and stair counts — not just HOA checklists.',
      },
      {
        title: 'Upstate multi-county pairs are routine',
        detail:
          'Households regularly move Greenville ↔ Spartanburg, Anderson, or Pickens. Clarify county lines so Class E vs FMCSA assumptions stay accurate when any leg leaves South Carolina (e.g. NC destinations).',
      },
      SC_REG_BULLET,
    ],
  },
  zonesHeading: 'Greenville County access zones',
  zonesIntro:
    'Plan by downtown/West End, east Greer/Pelham, south Mauldin–Simpsonville–Five Forks, north Travelers Rest, and I-85 industrial edges — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'downtown-west-end',
      name: 'Downtown Greenville, West End & near-core neighborhoods',
      shortName: 'Downtown / West End',
      neighborhoods: [
        'Downtown Greenville',
        'West End',
        'North Main edges',
        'Augusta Road near-core',
        'Parkins Mill edges',
      ],
      housingTypes: 'Lofts, multi-story walk-ups, denser SFH, boutique multifamily',
      challenges: [
        'Limited curb staging and event-day congestion',
        'Stairs and elevator buildings mixed on short blocks',
        'I-385 / downtown approach traffic',
      ],
      moverTips:
        'Photo curb options and stair counts. Prefer mid-week early starts. Confirm elevator/COI rules for loft buildings in writing.',
      cityKeywords: ['greenville', 'downtown greenville', 'west end', 'north main', 'augusta road'],
    },
    {
      id: 'greer-pelham',
      name: 'Greer, Pelham Road & east Greenville growth',
      shortName: 'Greer / Pelham',
      neighborhoods: ['Greer', 'Pelham Road corridor', 'Wade Hampton edges', 'Eastside retail corridors'],
      housingTypes: 'HOA SFH, townhomes, multifamily along commercial strips',
      challenges: [
        'I-85 / Pelham congestion near retail and plants',
        'HOA gate lists on newer tracts',
        'Longer empty miles from downtown staging',
      ],
      moverTips:
        'Build I-85 buffer for any downtown-linked pair. Collect HOA packets first. Share driveway and gate photos.',
      cityKeywords: ['greer', 'pelham', 'wade hampton', 'east greenville'],
    },
    {
      id: 'south-suburbs',
      name: 'Mauldin, Simpsonville & Five Forks',
      shortName: 'South suburbs',
      neighborhoods: ['Mauldin', 'Simpsonville', 'Five Forks', 'Woodruff Road corridor', 'Fountain Inn edges'],
      housingTypes: 'Master-planned HOA SFH, townhomes, larger family inventories',
      challenges: [
        'Woodruff Road peak congestion',
        'HOA approved hours and truck limits',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Book peak Saturdays early. Price Woodruff-corridor pairs honestly. Send HOA COI requirements with the estimate.',
      cityKeywords: ['mauldin', 'simpsonville', 'five forks', 'woodruff', 'fountain inn'],
    },
    {
      id: 'travelers-rest-north',
      name: 'Travelers Rest & northern foothill approaches',
      shortName: 'TR / North',
      neighborhoods: ['Travelers Rest', 'Paris Mountain edges', 'Northern rural-suburban mix'],
      housingTypes: 'Craftsman and older SFH, hillside lots, some new subdivisions',
      challenges: [
        'Grade, driveway length, and tree canopy',
        'US-276 / SC-183 timing into downtown',
        'Weather and storm delays on open carries',
      ],
      moverTips:
        'Survey driveway grade and turn radius. Prefer early starts for downtown-bound pairs. Inventory outdoor and garage gear carefully.',
      cityKeywords: ['travelers rest', 'paris mountain', 'us-276', 'northern greenville'],
    },
    {
      id: 'i85-industrial-edge',
      name: 'I-85 industrial & plant-adjacent residential edges',
      shortName: 'I-85 industrial edge',
      neighborhoods: ['I-85 corridor residential pockets', 'Plant-adjacent rentals', 'Logistics-edge multifamily'],
      housingTypes: 'Workforce multifamily, modest SFH, contractor-heavy rentals',
      challenges: [
        'Shift-change truck traffic near plants',
        'Lease-end waves for industrial workforce',
        'Mix of short notice and hard corporate dates',
      ],
      moverTips:
        'Ask about hard report-to-work dates. Avoid peak plant ingress windows when flexible. Clarify storage-in-transit needs.',
      cityKeywords: ['i-85', 'industrial', 'bmw', 'greer industrial', 'manufacturing'],
    },
  ],
  costDrivers: {
    title: 'What drives Greenville County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, I-85 portal time, and downtown curb friction separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Downtown curb, stairs & loft elevators',
        detail: 'Near-core staging friction and multi-story access add labor before packing skill matters.',
      },
      {
        title: 'I-85 / I-385 / Woodruff congestion',
        detail: 'Cross-county and cross-suburb pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'HOA master-planned rules',
        detail: 'Gate lists, COI, and weekday-only windows push demand into peak pricing.',
      },
      {
        title: 'Manufacturing-adjacent demand spikes',
        detail: 'Corporate and plant calendars create mid-week competition for crews.',
      },
      {
        title: 'Cross-county Upstate empty miles',
        detail: 'Spartanburg, Anderson, and Pickens destinations raise staging distance from Greenville yards.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,250+', note: 'Higher with downtown stairs or peak freeways' },
      { label: '2–3BR condo or modest SFH', value: '$1,200–$3,400+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / HOA / cross-zone', value: '$2,200–$6,500+', note: 'Five Forks SFH and long I-85 pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$170+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Greenville County move',
    intro: 'School calendars, manufacturing shifts, heat/humidity, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Tuesday–Thursday starts clear curb space and reduce I-85 / Woodruff pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'South-suburb SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Summer heat and storms',
        detail: 'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans.',
      },
      {
        title: 'Corporate / plant relocation clusters',
        detail: 'I-85 industrial calendars create mid-week spikes. Confirm report dates and storage needs early.',
      },
    ],
  },
  specialized: [
    {
      id: 'upstate-hoa-i85',
      title: 'Upstate HOA & I-85 logistics module',
      intro: 'Greenville estimates fail more often on HOA packets and freeway portal time than on packing skill.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final.',
        'Price portal-to-portal time for any pair that rides I-85, I-385, or Woodruff Road at peak.',
        'Photo downtown curb options and stair counts for West End / loft stock.',
        'Clarify Greenville vs Spartanburg / Anderson / Pickens addresses on every estimate.',
        'Verify SC Class E (ORS) for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Greenville County?',
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
              'Greenville County Schools is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Five Forks or downtown do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'South and east growth corridors can see enrollment pressure. Ask the district about capacity, transfers, and busing when touring.',
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
              'Prisma Health and other regional facilities serve Greenville corridors, with additional specialty options metro-wide. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Simpsonville or Greer to preferred campuses — I-85 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Downtown denser product vs suburban tracts',
            detail:
              'Expect lofts and multi-story stock near Main Street/West End; larger HOA tracts dominate Mauldin, Simpsonville, Five Forks, and much of Greer.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor. Budget for HOA dues, older-home repair risk, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and loft buildings often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Greenville areas fit whom',
        bullets: [
          {
            title: 'Downtown / West End urban lifestyle',
            detail:
              'Suits people prioritizing walkable amenities — with parking and stair/elevator tradeoffs on move day.',
          },
          {
            title: 'South suburban growth (Mauldin–Simpsonville–Five Forks)',
            detail:
              'Often appeals for newer homes and space — with Woodruff Road and HOA logistics.',
          },
          {
            title: 'Travelers Rest / foothill edge',
            detail:
              'Attracts households seeking a smaller-town feel and outdoor access — with grade and driveway constraints.',
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
              'Advanced manufacturing, healthcare, logistics, professional services, and downtown employers concentrate along I-85 and the urban core.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent outside downtown. I-85, I-385, and Woodruff peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Greenvilles',
            detail:
              'Greenville stacks a revived urban core, fast HOA suburbs, foothill edges, and plant-adjacent workforce housing — different from Spartanburg industrial fabric or Lowcountry coastal patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Arts, dining, and events concentrate downtown; suburban corridors feel more family- and retail-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Greenville County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify SC Class E / ORS for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Greenville County — official site',
        href: 'https://www.greenvillecounty.org/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Greenville',
        href: 'https://www.greenvillesc.gov/',
        external: true,
      },
      {
        label: 'Greenville County Schools',
        href: 'https://www.greenville.k12.sc.us/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'SCDOT 511 traffic',
        href: 'https://www.511sc.org/',
        external: true,
        note: 'I-85 / I-385 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with downtown curb and stair experience for West End/loft stock; HOA fluency for Five Forks–Simpsonville product; honest I-85 timing for Greer and plant-edge pairs. Verify SC Class E (ORS) for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
