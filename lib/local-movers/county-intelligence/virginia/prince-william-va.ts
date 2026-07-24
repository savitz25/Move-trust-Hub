import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Prince William County, VA — outer NoVA growth belt (not Fairfax Beltway core, not Arlington towers).
 * Woodbridge/Manassas, Quantico adjacency, I-95 spine, HOA expansion.
 */
export const princeWilliamCountyVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'prince-william',
  hubTitle: 'Prince William County Moving Intelligence Hub',
  eyebrow: 'Prince William · Northern Virginia · Woodbridge, Manassas, Quantico & I-95',
  h1: 'Moving in Prince William County: Woodbridge HOAs, Manassas Access & I-95 Logistics',
  heroOpener:
    'Prince William County is Northern Virginia’s high-growth outer belt: I-95 multifamily and townhome stacks in Woodbridge and Dale City, master-planned villages from Gainesville to Bristow, independent-city adjacency around Manassas and Manassas Park, and Quantico-area military timelines that do not wait for Saturday-only crews. A Woodbridge elevator building, a Gainesville HOA two-story, a Manassas bungalow with tight curb, and a Quantico PCS window do not share truck access or schedule risk. I-95, I-66, VA-234, US-1, and Prince William Parkway rewrite “local” estimates that ignore HOA packets, military hard dates, and peak I-95 freeflow collapse. This hub is for people moving in Prince William County — not a renamed Fairfax page or generic Virginia template.',
  heroCredibility:
    'Virginia DMV Motor Carrier / Household Goods authority for intrastate moves · FMCSA for interstate · PW HOA, Quantico & I-95 corridor awareness · Curated listings',
  majorCorridors: 'I-95 · I-66 · VA-234 · US-1 · Prince William Pkwy',
  whatMakesDifferent: {
    title: 'What makes moving in Prince William County different',
    intro:
      'These are Prince William realities — I-95 growth density, Quantico calendars, and western HOA expansion — not Fairfax Tysons towers or Arlington high-rise COI grids.',
    bullets: [
      {
        title: 'I-95 is the spine that prices the day',
        detail:
          'Woodbridge ↔ Manassas, Dale City ↔ Gainesville, or Quantico-edge ↔ Fairfax pairs look regional and still burn 50–100+ minutes when I-95 or VA-234 clogs. Price portal-to-portal, not map miles.',
      },
      {
        title: 'HOA growth villages dominate west and central product',
        detail:
          'Gainesville, Haymarket, Bristow, and much of Dale City / Lake Ridge require gate lists, truck limits, COI naming, and approved hours. Collect packets before the survey is final.',
      },
      {
        title: 'Quantico and military PCS windows are hard dates',
        detail:
          'Marine Corps Base Quantico and related contractor households create mid-week peaks, storage-in-transit needs, and report-by dates that compete with civilian Saturday demand.',
      },
      {
        title: 'Woodbridge and US-1 multifamily rewrites curb rules',
        detail:
          'Elevator buildings, long interior carries, and limited staging along US-1 and Potomac Mills edges show up more often than rural western parcels. Photo docks and elevators early.',
      },
      {
        title: 'Manassas / Manassas Park jurisdiction lines matter',
        detail:
          'Independent cities sit inside the market geography. Confirm city vs county addresses so permits, curb rules, and “local” marketing claims stay accurate.',
      },
      {
        title: 'Cross-county NoVA and DC-bound pairs are routine',
        detail:
          'Households regularly move PW ↔ Fairfax, Loudoun, Stafford, or MD/DC. Clarify state lines so Virginia DMV vs FMCSA assumptions stay correct when any leg leaves Virginia.',
      },
      {
        title: 'Western I-66 growth is not the eastern I-95 story',
        detail:
          'Gainesville–Haymarket SFH inventories and VA-234 bypass logistics differ sharply from Woodbridge multifamily. Zone the estimate; do not average the county.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Prince William County access zones',
  zonesIntro:
    'Plan by Woodbridge–Dale City–Lake Ridge I-95 east, Manassas metro core, Gainesville–Haymarket–Bristow west growth, Quantico southern edge, and rural western parcels — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'woodbridge-dale-city',
      name: 'Woodbridge, Dale City, Lake Ridge & I-95 east',
      shortName: 'I-95 East',
      neighborhoods: [
        'Woodbridge',
        'Dale City',
        'Lake Ridge',
        'Occoquan edges',
        'Potomac Mills corridor',
        'Dumfries edges',
      ],
      housingTypes: 'Townhomes, multifamily, HOA SFH, older split-levels',
      challenges: [
        'I-95 / US-1 peak congestion',
        'Elevator buildings and limited curb near commercial strips',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Build I-95 buffer for any Fairfax- or DC-linked pair. Confirm elevator/COI rules in writing. Photo curb and dumpster conflicts near retail.',
      cityKeywords: [
        'woodbridge',
        'dale city',
        'lake ridge',
        'occoquan',
        'dumfries',
        'potomac mills',
      ],
    },
    {
      id: 'manassas-core',
      name: 'Manassas, Manassas Park & central PW',
      shortName: 'Manassas core',
      neighborhoods: [
        'Manassas',
        'Manassas Park',
        'Yorkshire edges',
        'Sudley / VA-234 commercial edges',
      ],
      housingTypes: 'Older SFH, townhomes, multifamily, mixed commercial-adjacent rentals',
      challenges: [
        'City vs county jurisdiction and curb rules',
        'VA-234 congestion near retail and distribution',
        'Mix of tight older lots and newer HOA pockets',
      ],
      moverTips:
        'Clarify Manassas City, Manassas Park, or county address on the estimate. Survey driveway width. Prefer early starts for VA-234-linked pairs.',
      cityKeywords: ['manassas', 'manassas park', 'yorkshire', 'sudley', 'bull run'],
    },
    {
      id: 'gainesville-haymarket',
      name: 'Gainesville, Haymarket, Bristow & western HOA belt',
      shortName: 'West growth',
      neighborhoods: [
        'Gainesville',
        'Haymarket',
        'Bristow',
        'Linton Hall corridor',
        'Innovation / I-66 edges',
      ],
      housingTypes: 'Master-planned HOA SFH, townhomes, larger family inventories',
      challenges: [
        'HOA gate lists, truck limits, and approved hours',
        'I-66 / VA-234 peak freeflow collapse',
        'Longer empty miles from eastern staging yards',
      ],
      moverTips:
        'Collect HOA packets first. Price I-66 portal time honestly. Share gate codes and driveway photos before load day.',
      cityKeywords: ['gainesville', 'haymarket', 'bristow', 'linton hall', 'innovation'],
    },
    {
      id: 'quantico-south',
      name: 'Quantico, Triangle, Dumfries south & military edge',
      shortName: 'Quantico / South',
      neighborhoods: ['Quantico', 'Triangle', 'Dumfries', 'South I-95 residential pockets'],
      housingTypes: 'Military-adjacent rentals, modest SFH, townhomes, multifamily',
      challenges: [
        'PCS and report-date hard windows',
        'I-95 traffic near base access peaks',
        'Storage-in-transit and partial inventory waves',
      ],
      moverTips:
        'Ask about hard report dates and storage needs at estimate time. Avoid base ingress peaks when flexible. Prefer crews familiar with military timelines.',
      cityKeywords: ['quantico', 'triangle', 'dumfries', 'marine corps base', 'pcs'],
    },
    {
      id: 'rural-west-edge',
      name: 'Rural western parcels & Nokesville edges',
      shortName: 'Rural west',
      neighborhoods: ['Nokesville', 'Western rural-suburban mix', 'Farm and large-lot edges'],
      housingTypes: 'Large-lot SFH, farmhouses, barns and outbuildings, some new subdivisions',
      challenges: [
        'Long gravel drives, gate width, and soft shoulders',
        'Limited cell coverage for day-of coordination',
        'Weather delays on open exterior carries',
      ],
      moverTips:
        'Survey turn radius and driveway surface. Inventory outdoor and workshop gear carefully. Prefer smaller trucks when lane width is tight.',
      cityKeywords: ['nokesville', 'rural prince william', 'western pw', 'large lot'],
    },
    {
      id: 'potomac-shore-edge',
      name: 'Potomac shore communities & eastern water-edge pockets',
      shortName: 'Potomac edge',
      neighborhoods: ['Belmont Bay edges', 'Potomac waterfront pockets', 'Eastern marina-adjacent stock'],
      housingTypes: 'Townhomes, condo, waterfront SFH, denser planned communities',
      challenges: [
        'Narrow roads and guest-parking only staging',
        'HOA aesthetic and truck-hour rules',
        'Wind and weather exposure on open carries',
      ],
      moverTips:
        'Confirm HOA staging maps. Photo narrow approaches. Plan weather contingency for waterfront exposure.',
      cityKeywords: ['belmont bay', 'potomac', 'waterfront', 'eastern prince william'],
    },
  ],
  costDrivers: {
    title: 'What drives Prince William County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. I-95 portal time, HOA soft costs, and military hard dates separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'I-95 / I-66 / VA-234 congestion',
        detail: 'East–west and DC-bound pairs burn portal-to-portal hours even when distance looks modest.',
      },
      {
        title: 'HOA master-planned rules',
        detail: 'Gate lists, COI, and weekday-only windows push demand into peak pricing across growth villages.',
      },
      {
        title: 'Woodbridge multifamily elevators & curb',
        detail: 'Dock slots, long carries, and limited staging add labor before packing skill matters.',
      },
      {
        title: 'Quantico PCS and contractor spikes',
        detail: 'Hard report dates create mid-week competition and storage-in-transit demand.',
      },
      {
        title: 'Cross-county empty miles',
        detail: 'Fairfax, Stafford, Loudoun, and MD/DC destinations raise staging distance from PW yards.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,400+',
        note: 'Higher with elevators or peak I-95 pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,200–$3,600+',
        note: 'HOA soft costs trend up in growth villages',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$2,200–$6,800+',
        note: 'Gainesville SFH and long I-95 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$185+/hr',
        note: 'Portal-to-portal; military storage and packing scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Prince William County move',
    intro:
      'School calendars, PCS cycles, heat/humidity, and HOA windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce I-95 / VA-234 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Western HOA SFH and eastern townhome Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'PCS and military peak clusters',
        detail:
          'Quantico-related moves spike around common transfer windows. Confirm report dates and storage early.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans.',
      },
    ],
  },
  specialized: [
    {
      id: 'pw-hoa-i95-quantico',
      title: 'PW HOA, I-95 & Quantico logistics module',
      intro:
        'Prince William estimates fail more often on HOA packets, I-95 portal time, and PCS hard dates than on packing skill alone.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final.',
        'Price portal-to-portal time for any pair that rides I-95, I-66, VA-234, US-1, or Prince William Parkway at peak.',
        'Ask about hard report-to-duty dates and storage-in-transit for Quantico-adjacent households.',
        'Clarify Manassas City vs Manassas Park vs county addresses on every estimate.',
        'Photo elevators and curb options for Woodbridge / US-1 multifamily stock.',
        'Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Prince William County?',
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
              'Prince William County Public Schools covers most county addresses; Manassas City and Manassas Park run separate systems. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Western growth corridors can see enrollment pressure. Ask the relevant district about capacity, boundaries, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Virginia Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Sentara Northern Virginia and UVA Health Prince William / Haymarket campuses serve much of the county, with additional specialty options in Fairfax and farther metro. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Woodbridge or Gainesville to preferred campuses — I-95 and VA-234 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'East multifamily vs west HOA SFH',
            detail:
              'Expect denser townhomes and multifamily along Woodbridge / US-1; larger master-planned SFH dominate Gainesville, Haymarket, and Bristow.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor and commute tolerance. Budget for HOA dues, older-home repair risk, and insurance.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and elevator buildings often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Prince William areas fit whom',
        bullets: [
          {
            title: 'Woodbridge–Dale City–Lake Ridge I-95 corridor',
            detail:
              'Suits households prioritizing closer-in NoVA access and denser housing options — with traffic and multifamily logistics.',
          },
          {
            title: 'Manassas metro core',
            detail:
              'Often appeals for established grids and central VA-234 access — with city/county jurisdiction nuances.',
          },
          {
            title: 'Gainesville–Haymarket–Bristow growth',
            detail:
              'Attracts buyers seeking newer homes and space — with HOA rules and longer peak commutes toward DC.',
          },
          {
            title: 'Quantico / southern military edge',
            detail:
              'Fits base-adjacent and contractor households — with PCS calendars and I-95 dependence.',
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
              'Federal and military-adjacent work, logistics, retail/distribution, local government, healthcare, and reverse-commute Fairfax contractor sites shape demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent. I-95, I-66, VA-234, US-1, and Prince William Parkway peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Prince Williams',
            detail:
              'PW stacks I-95 multifamily density, Manassas urban core, western HOA villages, Quantico military edges, and rural west parcels — different from Fairfax Beltway employment cores or Arlington high-rise living.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters with occasional ice. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Family and growth-corridor retail dominate many areas; waterfront and historic pockets feel different. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Prince William County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Prince William County — official site',
        href: 'https://www.pwcva.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Prince William County Public Schools',
        href: 'https://www.pwcs.edu/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'City of Manassas',
        href: 'https://www.manassasva.gov/',
        external: true,
        note: 'Independent city — confirm address jurisdiction',
      },
      {
        label: 'VDOT 511 Virginia traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'I-95 / I-66 / VA-234 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA fluency for Gainesville–Haymarket product; elevator/curb experience for Woodbridge multifamily; military-timeline awareness near Quantico; honest I-95 / VA-234 timing for cross-zone pairs. Verify Virginia DMV Motor Carrier / Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
