import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * Will County, IL — south-collar growth + warehouse/industrial (not Cook city, not DuPage corporate).
 * Joliet core, Plainfield/Shorewood growth, I-55/I-80 logistics belt.
 */
export const willCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'will',
  hubTitle: 'Will County Moving Intelligence Hub',
  eyebrow: 'Will · south collar · Joliet, Plainfield growth & I-55 / I-80 logistics',
  h1: 'Moving in Will County: Joliet Access, South-Collar Growth & Warehouse Logistics',
  heroOpener:
    'Will County is the south collar’s growth and freight engine: a Joliet urban core with multi-unit and older SFH stock, master-planned tracts from Plainfield to Shorewood and New Lenox, and an I-55 / I-80 warehouse belt that floods arterials with tractor-trailers on the same windows movers need. A downtown Joliet walk-up, a Plainfield HOA two-story, a Homer Glen cul-de-sac, and a mid-week industrial-workforce lease-out do not share truck access or crew skill. I-55, I-80, I-355, US-30, and IL-53 links rewrite “local” estimates that ignore freight congestion, HOA packets, and long empty miles from city staging. This hub is for people moving in Will County — not a renamed Naperville page or generic Illinois template.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods license for intrastate moves · FMCSA for interstate · Joliet, south-collar HOA & warehouse-corridor awareness · Curated listings',
  majorCorridors: 'I-55 · I-80 · I-355 · US-30 · IL-53 links',
  whatMakesDifferent: {
    title: 'What makes moving in Will County different',
    intro:
      'These are Will south-collar realities — Joliet core access, warehouse-corridor freights, and growth-tract HOAs — not Chicago elevator micro-markets or DuPage’s I-88 corporate calendar alone.',
    bullets: [
      {
        title: 'Warehouse and industrial traffic reshape the clock',
        detail:
          'I-55, I-80, and intermodal-adjacent arterials carry heavy truck volumes. Residential pairs that look local still lose 30–60+ minutes when freights peak — price portal-to-portal with logistics traffic in mind.',
      },
      {
        title: 'Joliet core is a different job than collar growth tracts',
        detail:
          'Older multi-unit, street grids, and downtown curb limits do not share logistics with Plainfield or New Lenox HOA SFH. Survey by zone, not by “Will County” as a single product type.',
      },
      {
        title: 'South-collar HOA villages dominate family demand',
        detail:
          'Plainfield, Shorewood, New Lenox, Frankfort, and Homer Glen tracts often require gate lists, truck-length limits, and approved hours. Collect packets early.',
      },
      {
        title: 'I-55, I-80, and I-355 turn short map miles into billable hours',
        detail:
          'Joliet ↔ Naperville-edge, Plainfield ↔ Mokena, or Shorewood ↔ Bolingbrook-edge pairs burn time at peak even when odometer miles look modest.',
      },
      {
        title: 'Workforce and industrial relocation calendars create mid-week spikes',
        detail:
          'Warehouse hiring waves, contractor housing, and lease-end clusters compete with Saturday family moves for the same crews.',
      },
      {
        title: 'US-30 and IL-53 links add signal-dense empty miles',
        detail:
          'East–west and north–south arterial congestion underprices when estimates only model interstate freeflow.',
      },
      {
        title: 'Cross-county south-metro pairs are routine',
        detail:
          'Households regularly move Will ↔ Cook, DuPage, Kendall, or Grundy. Clarify county lines so ICC vs FMCSA assumptions stay accurate when any leg leaves Illinois.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'Will County access zones',
  zonesIntro:
    'Plan by Joliet core, Plainfield–Shorewood west growth, New Lenox–Frankfort–Mokena east/south, Homer Glen–Lockport north edges, and I-55/I-80 industrial residential pockets — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'joliet-core',
      name: 'Joliet core, near-downtown & established city neighborhoods',
      shortName: 'Joliet core',
      neighborhoods: [
        'Downtown Joliet',
        'Near-west Joliet',
        'Cathedral area edges',
        'South Joliet established',
        'Rockdale edges',
      ],
      housingTypes: 'Multi-unit walk-ups, older SFH, denser rentals, some newer infill',
      challenges: [
        'Limited curb and stair-heavy multi-unit stock',
        'I-80 / US-30 approach congestion',
        'Mixed industrial and residential truck traffic',
      ],
      moverTips:
        'Photo curb options and stair counts. Prefer mid-week early starts. Confirm alley vs street staging before the crew day.',
      cityKeywords: ['joliet', 'rockdale', 'downtown joliet'],
    },
    {
      id: 'plainfield-shorewood',
      name: 'Plainfield, Shorewood & west Will growth',
      shortName: 'Plainfield / Shorewood',
      neighborhoods: [
        'Plainfield',
        'Shorewood',
        'Crystal Lawns edges',
        'West Joliet growth tracts',
        'Troy Township edges',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, larger family inventories',
      challenges: [
        'HOA gate lists and approved hours',
        'I-55 peak freeflow collapse',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Book peak Saturdays early. Share gate codes and driveway photos with the estimate.',
      cityKeywords: ['plainfield', 'shorewood', 'crystal lawns'],
    },
    {
      id: 'new-lenox-frankfort-mokena',
      name: 'New Lenox, Frankfort, Mokena & east/south Will',
      shortName: 'East / South Will',
      neighborhoods: [
        'New Lenox',
        'Frankfort',
        'Mokena',
        'Manhattan edges',
        'Tinley Park Will edges',
      ],
      housingTypes: 'HOA SFH, townhomes, established larger lots',
      challenges: [
        'I-80 / US-30 / I-355 link congestion',
        'HOA truck limits on newer tracts',
        'Longer empty miles from Joliet or Cook staging',
      ],
      moverTips:
        'Price I-80 and US-30 portal time honestly. Clarify Cook vs Will addresses on border parcels. Survey basement access on older stock.',
      cityKeywords: ['new lenox', 'frankfort', 'mokena', 'manhattan'],
    },
    {
      id: 'homer-lockport-north',
      name: 'Homer Glen, Lockport & northern Will edges',
      shortName: 'Homer / Lockport',
      neighborhoods: [
        'Homer Glen',
        'Lockport',
        'Lemont Will edges',
        'Romeoville edges',
        'Bolingbrook Will edges',
      ],
      housingTypes: 'HOA SFH, larger lots, some older village grids',
      challenges: [
        'I-355 / IL-53 link timing into DuPage and Cook',
        'Cul-de-sac geometry and long drives',
        'Cross-county pairs into DuPage',
      ],
      moverTips:
        'Build I-355 buffers for any Naperville- or Downers-linked pair. Photo driveway turn radius. Collect HOA rules early.',
      cityKeywords: [
        'homer glen',
        'lockport',
        'lemont',
        'romeoville',
        'bolingbrook',
      ],
    },
    {
      id: 'i55-i80-industrial-edge',
      name: 'I-55 / I-80 industrial & warehouse-adjacent residential',
      shortName: 'Industrial edge',
      neighborhoods: [
        'I-55 corridor residential pockets',
        'I-80 logistics-edge multifamily',
        'Elwood edges',
        'Channahon / Minooka edges',
      ],
      housingTypes: 'Workforce multifamily, modest SFH, contractor-heavy rentals',
      challenges: [
        'Shift-change and freight truck traffic',
        'Lease-end waves for industrial workforce',
        'Mix of short notice and hard start dates',
      ],
      moverTips:
        'Ask about hard report-to-work dates. Avoid peak warehouse ingress windows when flexible. Clarify storage-in-transit needs.',
      cityKeywords: [
        'elwood',
        'channahon',
        'minooka',
        'i-55',
        'i-80',
        'warehouse',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Will County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Freight congestion, HOA rules, and Joliet multi-unit friction separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'I-55 / I-80 / I-355 freight & peak congestion',
        detail:
          'Warehouse corridors burn portal-to-portal hours even when residential map miles look short.',
      },
      {
        title: 'HOA growth-tract rules',
        detail:
          'Gate lists, truck limits, and approved hours on Plainfield–New Lenox product add soft cost and schedule risk.',
      },
      {
        title: 'Joliet stairs, curb & older grids',
        detail:
          'Multi-unit and downtown-adjacent stock adds labor before packing skill matters.',
      },
      {
        title: 'Industrial workforce mid-week spikes',
        detail:
          'Hiring waves and lease clusters create competition for crews outside classic Saturday peaks.',
      },
      {
        title: 'Cross-county south-metro empty miles',
        detail:
          'Cook, DuPage, Kendall, and Grundy destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,300+',
        note: 'Higher with Joliet stairs or peak I-55/I-80 pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,200–$3,500+',
        note: 'HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$2,200–$6,800+',
        note: 'Plainfield SFH and long freight-corridor pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$175+/hr',
        note: 'Portal-to-portal; packing and HOA admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Will County move',
    intro:
      'School calendars, warehouse hiring waves, summer heat, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce I-55 / I-80 freight pain. Avoid month-end Fridays when leases and HOA windows collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Plainfield, New Lenox, and Homer Glen SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans.',
      },
      {
        title: 'Industrial hiring and lease-end clusters',
        detail:
          'Warehouse calendars create mid-week spikes. Confirm report dates and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'will-warehouse-hoa',
      title: 'Will warehouse corridor & south-collar HOA logistics module',
      intro:
        'Will estimates fail more often on freight portal time and HOA packets than on packing skill alone.',
      bullets: [
        'Price portal-to-portal time for any pair that rides I-55, I-80, I-355, US-30, or IL-53 links at peak freight hours.',
        'Collect HOA COI, gate lists, and approved hours for Plainfield–Shorewood–New Lenox–Frankfort product.',
        'Photo curb, stairs, and alley options for Joliet multi-unit stock.',
        'Ask about hard report-to-work dates for industrial workforce moves.',
        'Clarify Will vs Cook / DuPage / Kendall addresses on every estimate.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'will-industrial-workforce',
      title: 'Industrial workforce relocation module',
      intro:
        'Many Will households move on warehouse or contractor timelines that do not flex with Saturday-only crews.',
      bullets: [
        'Ask about hard start dates and shift schedules at estimate time.',
        'Clarify storage-in-transit and partial-load needs for temporary housing.',
        'Avoid peak plant/warehouse ingress windows when the schedule is flexible.',
        'Match short-notice inventory complexity to crew availability honestly — do not overpromise same-week capacity at peak.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Will County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures town fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Will County is served by multiple elementary and high-school districts (Joliet-area systems, Plainfield, Lincoln-Way, and others). Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'West and south growth corridors can see enrollment pressure. Ask the specific district about capacity, boundary adjustments, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Illinois State Board of Education data, and campus visits beat ranking screenshots alone.',
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
              'Ascension Saint Joseph–Joliet, Silver Cross (New Lenox), and other regional campuses serve Will corridors, with additional specialty options toward Cook and DuPage. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Plainfield or Mokena to preferred campuses — I-80 and I-55 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Joliet denser product vs collar growth tracts',
            detail:
              'Expect multi-unit and older SFH near Joliet core; larger HOA tracts dominate Plainfield, Shorewood, New Lenox, Frankfort, and Homer Glen.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor and lot size. Budget for HOA dues, property taxes, and commute costs that offset “cheaper than Naperville” headlines.',
          },
          {
            title: 'HOA governance on growth tracts',
            detail:
              'Planned communities often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Will areas fit whom',
        bullets: [
          {
            title: 'Joliet urban and near-core living',
            detail:
              'Suits people prioritizing lower entry costs or city amenities — with multi-unit logistics and freight-adjacent traffic.',
          },
          {
            title: 'Plainfield–Shorewood west growth',
            detail:
              'Often appeals for newer homes and space — with HOA rules and I-55 timing.',
          },
          {
            title: 'New Lenox–Frankfort–Mokena family corridors',
            detail:
              'Attracts households seeking schools and larger lots — with I-80/US-30 peaks.',
          },
          {
            title: 'Homer Glen–Lockport north edge',
            detail:
              'Fits buyers wanting Will pricing with closer DuPage/Cook links — with I-355 commute realism.',
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
              'Warehousing and logistics, manufacturing, healthcare, retail, and reverse-commute or Chicago-bound corridors concentrate demand along I-55 and I-80.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-55, I-80, I-355, US-30, and IL-53 peaks — plus freight — are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, south-collar reality',
            detail:
              'Will stacks Joliet urban fabric, fast HOA growth, and warehouse-edge workforce housing — different from Cook’s neighborhood micro-markets or DuPage’s corporate I-88 belt.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, cold winters with snow/ice, and frequent storms. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Family sports and school calendars dominate growth towns; Joliet has denser dining and event life; industrial edges feel workforce-oriented. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Will County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Will County — official site',
        href: 'https://www.willcountyillinois.com/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Joliet',
        href: 'https://www.joliet.gov/',
        external: true,
      },
      {
        label: 'Village of Plainfield',
        href: 'https://www.plainfield-il.org/',
        external: true,
      },
      {
        label: 'IDOT / Illinois traffic & road conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'I-55 / I-80 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Joliet multi-unit and curb experience for city stock; HOA fluency for Plainfield–New Lenox–Frankfort product; honest I-55 · I-80 · I-355 freight-aware timing for cross-zone pairs. Verify Illinois Commerce Commission (ICC) Household Goods authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
