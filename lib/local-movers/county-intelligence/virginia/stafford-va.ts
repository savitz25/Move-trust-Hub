import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Stafford County, VA — I-95 NoVA commute growth, Quantico-adjacent
 * (not Spotsylvania clone, not Prince William northern suburbs alone).
 */
export const staffordCountyVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'stafford',
  hubTitle: 'Stafford County Moving Intelligence Hub',
  eyebrow: 'Stafford · I-95 NoVA commute growth · Quantico-adjacent Northern Virginia edge',
  h1: 'Moving in Stafford County: I-95 Commute Growth, Quantico-Adjacent Moves & Garrisonville Logistics',
  heroOpener:
    'Stafford County sits on the I-95 spine between Fredericksburg-area growth and Northern Virginia demand: Quantico-adjacent military and contractor households, Garrisonville Road (VA-610) retail and multifamily density, US-1 corridor product, and master-planned subdivisions that feed long NoVA and DC-region commutes. A Aquia Harbour water-access lot, a Garrisonville townhome, a Stafford Courthouse-edge SFH, and a Quantico-gate rental do not share truck access or portal time. I-95, US-1, VA-610, and VA-17 rewrite “local” estimates that ignore HOA packets, base calendars, and peak I-95 burn. This hub is for people moving in Stafford County — not a renamed Spotsylvania page or generic Fredericksburg template.',
  heroCredibility:
    'Virginia DMV household goods / motor-carrier authority for intrastate moves · FMCSA for interstate · I-95 commute & Quantico-adjacent awareness · Curated listings',
  majorCorridors: 'I-95 · US-1 · VA-610 (Garrisonville) · VA-17',
  whatMakesDifferent: {
    title: 'What makes moving in Stafford County different',
    intro:
      'These are Stafford realities — I-95 NoVA commute growth, Quantico-adjacent military calendars, and Garrisonville density — not Spotsylvania’s VA-3 western growth alone or Richmond-metro patterns.',
    bullets: [
      {
        title: 'I-95 is the job clock for most pairs',
        detail:
          'Stafford ↔ Prince William, Stafford ↔ Fairfax-edge, or Courthouse ↔ Garrisonville pairs look regional and still burn long portal hours at peak. Price I-95 honestly — crash delay is common.',
      },
      {
        title: 'Quantico-adjacent military and contractor demand',
        detail:
          'PCS windows, contractor report dates, and base-related lease turns create mid-week spikes and hard deadlines that pure residential Saturday quotes miss. Ask about report dates and storage-in-transit.',
      },
      {
        title: 'VA-610 Garrisonville is a congestion and multifamily artery',
        detail:
          'Retail signal delay, apartment turns, and townhome product concentrate along Garrisonville Road. Month-end competition for crews is real.',
      },
      {
        title: 'HOA growth tracts feed the NoVA commute belt',
        detail:
          'Master-planned subdivisions often require gate lists, COI, truck limits, and approved hours. Collect packets early — many households move with full family inventories.',
      },
      {
        title: 'US-1 and VA-17 shape north–south and river-edge access',
        detail:
          'US-1 parallels I-95 for local hops; VA-17 pulls west–east traffic toward Falmouth and river approaches. Corridor choice changes empty miles and timing.',
      },
      {
        title: 'Cross-county Fredericksburg-area pairs are routine',
        detail:
          'Households regularly move Stafford ↔ Spotsylvania, Fredericksburg City, or Prince William. Clarify locality lines so Virginia DMV vs FMCSA assumptions stay accurate when any leg leaves Virginia.',
      },
      {
        title: 'Not Spotsylvania’s interior growth map',
        detail:
          'Stafford’s identity is I-95 NoVA-facing commute growth and Quantico adjacency — different from Spotsylvania’s VA-3/US-1 Fredericksburg-south expansion pattern.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Stafford County access zones',
  zonesIntro:
    'Plan by Garrisonville/VA-610 north, Quantico-adjacent north corridor, Stafford Courthouse/central, Aquia/US-1 south-central, and western VA-17 approaches — access and military calendars cluster by zone.',
  zones: [
    {
      id: 'garrisonville-va610',
      name: 'Garrisonville Road (VA-610) & northern multifamily belt',
      shortName: 'Garrisonville / VA-610',
      neighborhoods: [
        'Garrisonville',
        'VA-610 corridor',
        'Northern townhome clusters',
        'Retail-adjacent multifamily',
        'I-95 Exit 143 area residential',
      ],
      housingTypes: 'Townhomes, multifamily, HOA SFH, contractor-heavy rentals',
      challenges: [
        'VA-610 peak retail congestion',
        'Month-end apartment turns',
        'I-95 northbound commute overflow',
      ],
      moverTips:
        'Prefer mid-week early starts. Confirm elevator vs stair access. Build Garrisonville and I-95 buffer into portal pricing.',
      cityKeywords: ['garrisonville', 'va-610', 'stafford north', 'exit 143'],
    },
    {
      id: 'quantico-adjacent',
      name: 'Quantico-adjacent & north Stafford military-edge',
      shortName: 'Quantico-adjacent',
      neighborhoods: [
        'Quantico-adjacent residential',
        'North Stafford base-edge pockets',
        'Contractor rental corridors',
        'Triangle/Dumfries-edge context (verify locality)',
      ],
      housingTypes: 'Workforce multifamily, modest SFH, short-notice rentals',
      challenges: [
        'PCS and hard report-date pressure',
        'Gate and base-calendar timing',
        'Cross-locality confusion near Prince William line',
      ],
      moverTips:
        'Ask about ship-out/report dates and temporary storage. Clarify Stafford vs Prince William addresses. Flexible crews help on short-notice military jobs.',
      cityKeywords: ['quantico', 'north stafford', 'pcs', 'military', 'base'],
    },
    {
      id: 'courthouse-central',
      name: 'Stafford Courthouse & central county',
      shortName: 'Courthouse / Central',
      neighborhoods: [
        'Stafford Courthouse',
        'Central subdivisions',
        'Government-adjacent housing',
        'I-95 mid-county exits residential',
      ],
      housingTypes: 'HOA SFH, townhomes, some multifamily',
      challenges: [
        'I-95 mid-county congestion',
        'HOA approved hours',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Collect HOA packets first. Book peak family Saturdays early. Price Courthouse↔Garrisonville pairs honestly at rush hour.',
      cityKeywords: ['stafford courthouse', 'courthouse', 'central stafford'],
    },
    {
      id: 'aquia-us1',
      name: 'Aquia, US-1 corridor & south-central Stafford',
      shortName: 'Aquia / US-1',
      neighborhoods: ['Aquia', 'Aquia Harbour edges', 'US-1 corridor', 'South-central growth tracts'],
      housingTypes: 'HOA SFH, water-access community product, corridor multifamily',
      challenges: [
        'Gate communities and waterfront access rules',
        'US-1 signal delay as I-95 alternate',
        'Longer carries on waterfront lots',
      ],
      moverTips:
        'Confirm gate lists and community truck rules. Survey dock, driveway, and turn radius for harbour lots. Prefer early US-1 starts.',
      cityKeywords: ['aquia', 'aquia harbour', 'us-1', 'south stafford'],
    },
    {
      id: 'va17-west',
      name: 'VA-17 western approaches & Falmouth-edge',
      shortName: 'VA-17 / West',
      neighborhoods: [
        'VA-17 corridor',
        'Western rural-suburban mix',
        'Falmouth-edge (verify locality)',
        'Rappahannock approaches',
      ],
      housingTypes: 'SFH, some acreage, mix of HOA and non-HOA',
      challenges: [
        'Longer empty miles from I-95-exit yards',
        'Driveway length and soft shoulders',
        'Bridge and river-edge timing into Fredericksburg',
      ],
      moverTips:
        'Survey driveway grade and turnaround. Clarify Stafford vs Fredericksburg City / Spotsylvania lines. Prefer early starts for long west-county pairs.',
      cityKeywords: ['va-17', 'falmouth', 'west stafford', 'rappahannock'],
    },
    {
      id: 'south-i95-fred-edge',
      name: 'Southern I-95 & Fredericksburg-edge Stafford',
      shortName: 'South I-95 / Fred edge',
      neighborhoods: [
        'Southern I-95 exits residential',
        'Fredericksburg-edge Stafford',
        'South county multifamily',
        'Commute-south spillover tracts',
      ],
      housingTypes: 'HOA SFH, townhomes, multifamily',
      challenges: [
        'I-95 south congestion toward Fredericksburg',
        'Cross-locality address confusion',
        'High dual-income NoVA commute demand',
      ],
      moverTips:
        'Confirm county vs city addresses carefully. Build I-95 buffer for any NoVA-linked pair. Share HOA and driveway photos with the estimate.',
      cityKeywords: ['fredericksburg edge', 'south stafford', 'i-95 south', 'stafford fred'],
    },
  ],
  costDrivers: {
    title: 'What drives Stafford County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. I-95 portal time, HOA soft costs, and military/contractor hard dates separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'I-95 congestion and crash delay',
        detail: 'North–south pairs burn portal-to-portal hours; NoVA-linked jobs price like regional logistics.',
      },
      {
        title: 'HOA growth-tract rules',
        detail: 'Gate lists, COI, and truck limits push demand into peak pricing.',
      },
      {
        title: 'Garrisonville multifamily lease-end waves',
        detail: 'VA-610 apartment turns create month-end crew competition.',
      },
      {
        title: 'Military / contractor deadline pressure',
        detail: 'PCS and report dates reduce schedule flexibility and can require storage-in-transit.',
      },
      {
        title: 'Cross-locality empty miles',
        detail: 'Prince William, Spotsylvania, Fredericksburg City, and DC-region destinations raise staging distance.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,400+', note: 'Higher with I-95 peak or stairs' },
      { label: '2–3BR townhome or modest SFH', value: '$1,300–$3,700+', note: 'HOA soft costs trend up' },
      { label: '3–4+ BR / HOA / I-95 long pair', value: '$2,500–$7,500+', note: 'NoVA-linked and large family inventories price highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$185+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Stafford County move',
    intro: 'PCS windows, school calendars, summer heat, and I-95 peaks reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts reduce Garrisonville retail pain and I-95 commute overflow. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'HOA SFH Saturday demand and military summer PCS overlap. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Military PCS clusters',
        detail:
          'Quantico-adjacent calendars create mid-week and end-of-month spikes. Confirm ship-out/report dates and storage needs early.',
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
      id: 'i95-quantico-stafford',
      title: 'I-95 commute & Quantico-adjacent logistics module',
      intro:
        'Stafford estimates fail more often on I-95 portal time and military hard dates than on packing skill alone.',
      bullets: [
        'Price portal-to-portal time for any pair that rides I-95, US-1, VA-610, or VA-17 at peak.',
        'Ask about PCS/report dates, temporary lodging, and storage-in-transit on Quantico-adjacent jobs.',
        'Collect HOA COI, gate lists, and approved hours for master-planned product before the survey is final.',
        'Clarify Stafford vs Spotsylvania / Fredericksburg City / Prince William addresses on every estimate.',
        'Verify Virginia DMV household goods / motor-carrier authority for in-state-only jobs and FMCSA for interstate legs (common on NoVA and out-of-state PCS moves).',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Stafford County?',
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
              'Stafford County Public Schools is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Garrisonville do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'I-95 corridor growth can see enrollment pressure. Ask the district about capacity, transfers, and busing when touring.',
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
              'Mary Washington and other regional facilities serve the Fredericksburg–Stafford corridor, with additional specialty options toward Northern Virginia. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Garrisonville or Courthouse areas to preferred campuses — I-95 congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Commute-belt product and gate communities',
            detail:
              'Expect HOA SFH and townhomes along the I-95/VA-610 growth belt; waterfront and gate product appears in places like Aquia Harbour edges; multifamily clusters on Garrisonville.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor and commute premium. Budget for HOA dues, longer vehicle wear from I-95 commuting, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and apartment complexes often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Stafford areas fit whom',
        bullets: [
          {
            title: 'Garrisonville / north I-95',
            detail:
              'Suits NoVA-oriented commuters and multifamily renters — with VA-610 congestion and high demand.',
          },
          {
            title: 'Quantico-adjacent north Stafford',
            detail:
              'Often fits military and contractor households — with PCS timing and cross-locality address checks.',
          },
          {
            title: 'Aquia / Courthouse / west VA-17',
            detail:
              'Appeals for more space or waterfront community living — with gate rules, longer empty miles, or rural-edge driveways.',
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
              'Defense, federal contracting, logistics, healthcare, retail, and NoVA/DC-region employers dominate many household calendars. Local employment exists but long northbound commutes are common.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-95 peaks define daily life for many residents. Test drive peak routes and consider telework patterns before choosing solely on purchase price or HOA amenities.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'I-95 edge between NoVA and Fredericksburg',
            detail:
              'Stafford stacks Quantico adjacency, commute-belt subdivisions, and river-edge communities — different from Spotsylvania’s VA-3 interior growth or deep NoVA dense suburbs.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Military, contractor, and family-commuter cultures overlap. Visit Garrisonville at rush hour and quieter west-county roads before deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Stafford County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Stafford County — official site',
        href: 'https://www.staffordcountyva.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Stafford County Public Schools',
        href: 'https://www.staffordschools.net/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Marine Corps Base Quantico (public info)',
        href: 'https://www.quantico.marines.mil/',
        external: true,
        note: 'Base context for adjacent households',
      },
      {
        label: 'Virginia 511 traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'I-95 / US-1 / VA-610 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with I-95 portal honesty for NoVA-linked pairs; HOA fluency for growth-tract SFH; military/PCS flexibility for Quantico-adjacent jobs. Verify Virginia DMV household goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
