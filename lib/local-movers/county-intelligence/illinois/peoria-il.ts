import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * Peoria County, IL — central Illinois regional hub (medical/manufacturing).
 * Peoria core, river bluffs, Dunlap growth, I-74 / I-474 logistics.
 * Note: East Peoria is primarily Tazewell County — do not treat as Peoria County stock.
 */
export const peoriaCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'peoria',
  hubTitle: 'Peoria County Moving Intelligence Hub',
  eyebrow: 'Peoria · Central Illinois hub · Peoria Heights, Dunlap, Bartonville, Chillicothe & I-74',
  h1: 'Moving in Peoria County: Regional Medical Hub Access, River Bluffs & I-74 / I-474 Logistics',
  heroOpener:
    'Peoria County is central Illinois’s regional medical and manufacturing hub — not Chicago spillover, not Springfield capital copy, and not a twin-city university template. Downtown and near-north Peoria mix walk-ups with medical-corridor multifamily; Peoria Heights and bluff streets constrain truck length and grade; West Peoria and Bartonville hold modest grids and industrial edges; Dunlap and north growth stack family HOA product; Chillicothe rides Illinois River north corridors. A Medical District elevator job, a Heights hillside carry, a Dunlap HOA gate list, and a plant or hospital hard date do not share truck access or crew skill. I-74, I-474, IL-29, and US-24 rewrite “local” estimates that ignore portal-to-portal time, bluff access, and cross-river pairs into Tazewell. This hub is for people moving in Peoria County.',
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods authority for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-74 · I-474 · IL-29 · US-24',
  whatMakesDifferent: {
    title: 'What makes moving in Peoria County different',
    intro:
      'These are Peoria regional-hub realities — medical campus logistics, river bluff access, and I-74/I-474 portal time — not Champaign lease cycles or Metro East bridge patterns.',
    bullets: [
      {
        title: 'Medical and manufacturing calendars reshape mid-week demand',
        detail:
          'Hospital onboarding, clinic starts, and plant report dates create hard windows that compete with Saturday family demand. Mid-week crew capacity matters as much as weekend quotes.',
      },
      {
        title: 'Peoria Heights and bluff streets rewrite truck and carry assumptions',
        detail:
          'Steep grade, limited turn radius, and tree-lined curb need driveway photos and sometimes smaller equipment. Same-ZIP valley ranches do not share that stack.',
      },
      {
        title: 'I-74 and I-474 turn short map miles into billable hours',
        detail:
          'Peoria ↔ Dunlap, Heights ↔ Bartonville, or West Peoria ↔ Chillicothe pairs look local and still burn portal time at peak, construction, and river-bridge backups toward Tazewell destinations.',
      },
      {
        title: 'Dunlap and north growth product is HOA- and family-inventory heavy',
        detail:
          'Gate lists, truck limits, and larger SFH inventories differ from downtown walk-ups and Medical District elevators. Zone the quote, not the county average.',
      },
      {
        title: 'Cross-river Tazewell pairs are routine — county lines matter',
        detail:
          'East Peoria, Morton, and Washington destinations are often Tazewell County. Clarify addresses so drive time and authority assumptions stay accurate; interstate still needs FMCSA when any leg leaves Illinois.',
      },
      {
        title: 'IL-29 and US-24 define river and north–south family corridors',
        detail:
          'Chillicothe–Peoria and industrial-edge pairs ride these arterials with freight peaks that suburban quotes underprice.',
      },
      {
        title: 'Older Peoria grids still constrain curb and stairs',
        detail:
          'Near-north, south-end, and West Peoria stock often means basements, walk-ups, and limited legal truck length — not only Dunlap HOA checklists.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'Peoria County access zones',
  zonesIntro:
    'Plan by Peoria core and Medical District, Peoria Heights bluffs, West Peoria–Bartonville industrial edges, Dunlap north growth, Chillicothe river north, and rural township pockets — access rules cluster by zone more than ZIP alone. East Peoria is primarily across the river in Tazewell County.',
  zones: [
    {
      id: 'peoria-core-medical',
      name: 'Peoria core, downtown & Medical District',
      shortName: 'Peoria core / Medical',
      neighborhoods: [
        'Downtown Peoria',
        'Medical District / hospital corridor',
        'Near-north Peoria',
        'Warehouse district edges',
        'Riverfront residential pockets',
      ],
      housingTypes: 'Walk-up multifamily, limited mid-rise, older SFH, medical-corridor apartments',
      challenges: [
        'Elevators, stairs, and limited legal curb',
        'Hospital shift and daytime arterial congestion',
        'I-74 downtown approaches at peak',
      ],
      moverTips:
        'Reserve elevators and confirm loading rules near medical campuses. Prefer mid-week early starts. Photo curb and stair counts before final estimate.',
      cityKeywords: [
        'peoria',
        'downtown peoria',
        'medical district',
        'near north',
        'riverfront',
      ],
    },
    {
      id: 'peoria-heights-bluff',
      name: 'Peoria Heights, bluff streets & north river views',
      shortName: 'Peoria Heights / Bluffs',
      neighborhoods: [
        'Peoria Heights',
        'Bluff residential streets',
        'Prospect corridor edges',
        'North Peoria bluff pockets',
        'Grand View Drive edges',
      ],
      housingTypes: 'Hillside SFH, older character homes, limited multifamily',
      challenges: [
        'Steep grade, limited truck turn radius, long carries',
        'Tree-lined curb and seasonal leaf/ice issues',
        'High-value inventory and white-glove expectations on some streets',
      ],
      moverTips:
        'Pre-walk driveway grade and street width. Prefer smaller trucks when hills demand it. Photo both approach directions for staging.',
      cityKeywords: [
        'peoria heights',
        'bluff',
        'prospect',
        'grand view',
        'north peoria',
      ],
    },
    {
      id: 'west-peoria-bartonville',
      name: 'West Peoria, Bartonville & industrial south/west edges',
      shortName: 'West Peoria / Bartonville',
      neighborhoods: [
        'West Peoria',
        'Bartonville',
        'South-end Peoria pockets',
        'Industrial park residential edges',
        'Airport corridor pockets',
      ],
      housingTypes: 'Modest SFH, multifamily near employment, older grids',
      challenges: [
        'Plant-shift hard dates and freight pulses',
        'Tighter curb and basement carries on older stock',
        'I-474 / IL-29 approach congestion',
      ],
      moverTips:
        'Ask about report dates at estimate time. Prefer early starts around shift change. Confirm alley vs street staging.',
      cityKeywords: [
        'west peoria',
        'bartonville',
        'south peoria',
        'airport',
        'industrial',
      ],
    },
    {
      id: 'dunlap-north-growth',
      name: 'Dunlap, north growth & family HOA corridors',
      shortName: 'Dunlap / North',
      neighborhoods: [
        'Dunlap',
        'North Peoria growth edges',
        'Kickapoo Creek corridor residential',
        'Route 91 / Allen Road edges',
        'Newer family tracts',
      ],
      housingTypes: 'HOA SFH, townhomes, larger family inventories, limited multifamily',
      challenges: [
        'HOA gate lists, truck limits, and approved move hours',
        'I-74 / IL-6-style approach peaks into core',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Collect HOA packets first. Book peak Saturdays early. Price portal time for any Medical District or downtown-linked pair.',
      cityKeywords: ['dunlap', 'north peoria', 'kickapoo', 'allen road', 'route 91'],
    },
    {
      id: 'chillicothe-il29',
      name: 'Chillicothe, IL-29 north & river corridor',
      shortName: 'Chillicothe / IL-29',
      neighborhoods: [
        'Chillicothe',
        'IL-29 river corridor residential',
        'North county small-town edges',
        'Rome edges',
        'Spring Bay-facing pockets (confirm county)',
      ],
      housingTypes: 'Small-town SFH, modest multifamily, river-adjacent stock',
      challenges: [
        'IL-29 arterial peaks and longer empty miles from Peoria yards',
        'Weather-sensitive approaches and limited staging in town cores',
        'Cross-zone pairs into bluffs or Dunlap at peak',
      ],
      moverTips:
        'Price IL-29 portal time honestly. Share street and driveway photos. Clarify Peoria County vs Woodford/Tazewell edges on every estimate.',
      cityKeywords: ['chillicothe', 'il-29', 'rome', 'north peoria county', 'river corridor'],
    },
    {
      id: 'peoria-rural-west',
      name: 'West/south rural townships & outer Peoria County',
      shortName: 'Rural west / outer',
      neighborhoods: [
        'Elmwood edges',
        'Brimfield edges',
        'Princeville edges',
        'West township roads',
        'Rural Peoria County pockets',
      ],
      housingTypes: 'Rural SFH, acreage lots, small-town cores, limited multifamily',
      challenges: [
        'Soft shoulders and limited truck staging',
        'Long empty miles and weather-sensitive gravel approaches',
        'Sparse turnarounds on private lanes',
      ],
      moverTips:
        'Pre-walk lane width and turnarounds. Confirm weather contingency for spring thaw. Price empty miles honestly from Peoria staging yards.',
      cityKeywords: [
        'elmwood',
        'brimfield',
        'princeville',
        'rural peoria',
        'west peoria county',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Peoria County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Bluff access, medical/multifamily soft costs, and I-74 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Elevators, walk-ups & Medical District curb',
        detail:
          'Core and hospital-corridor product adds labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Bluff grade and limited truck geometry',
        detail:
          'Peoria Heights and hillside streets raise labor and sometimes force smaller equipment or longer carries.',
      },
      {
        title: 'I-74 / I-474 / IL-29 / US-24 congestion',
        detail:
          'Cross-zone and cross-river pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Dunlap HOA and family-inventory product',
        detail:
          'Gate rules and larger SFH inventories push time and truck constraints into the quote.',
      },
      {
        title: 'Medical/plant hard dates and multi-county empty miles',
        detail:
          'Hospital and manufacturing starts create mid-week spikes; Tazewell and out-of-state destinations raise staging and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,350+',
        note: 'Higher with elevators, walk-ups, or bluff access',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,100–$3,500+',
        note: 'HOA and hillside soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / bluff / cross-river',
        value: '$2,200–$7,000+',
        note: 'Dunlap estates and Heights carries price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$170+/hr',
        note: 'Portal-to-portal; packing and access admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Peoria County move',
    intro:
      'School calendars, hospital and plant onboarding, humidity, and winter ice on bluff streets reshape access and crew availability across the Peoria regional hub.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce I-74 / Medical District pain. Avoid month-end Fridays when leases and report dates collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'Dunlap–north and West Peoria Saturday demand fills first. Book 2–4 weeks ahead for peak weekends and HOA slots.',
      },
      {
        title: 'Medical and manufacturing relocation clusters',
        detail:
          'Hospital and plant calendars create mid-week spikes. Confirm report dates, storage-in-transit, and temporary housing early.',
      },
      {
        title: 'Winter ice on bluffs & summer storms',
        detail:
          'Heights grade becomes high-risk in ice; I-74 incidents erase windows. Prefer flexible mornings and written weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'peoria-hub-bluff-access',
      title: 'Peoria hub, bluff & corridor logistics module',
      intro:
        'Peoria County estimates fail more often on bluff access, Medical District curb, and I-74 portal time than on packing skill alone.',
      bullets: [
        'Photo driveway grade, curb, and stair counts for Peoria Heights and older core stock.',
        'Reserve elevators and confirm loading rules for Medical District and downtown multifamily.',
        'Collect HOA gate lists and truck-length limits for Dunlap growth product.',
        'Price portal-to-portal time for any pair that rides I-74, I-474, IL-29, or US-24 at peak.',
        'Clarify Peoria County vs Tazewell (including East Peoria) vs Woodford addresses on every estimate.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'medical-manufacturing-relocation',
      title: 'Medical & manufacturing relocation module',
      intro:
        'Many Peoria County households move on hospital, clinic, or plant timelines that do not flex with Saturday-only crews.',
      bullets: [
        'Ask about hard report-to-duty or start dates at estimate time.',
        'Clarify storage-in-transit and partial-load needs for temporary housing.',
        'Prefer mid-week early windows when medical campus curb and industrial shift traffic are lighter post-commute.',
        'Match inventory complexity (home office, specialty equipment, high-value items) to crew experience.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Peoria County?',
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
              'Peoria Public Schools District 150 serves much of the city; Peoria Heights, Dunlap, Bartonville-area patterns, Chillicothe, and other unit districts serve suburbs and townships. Assignment is address-based — marketing names do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'Dunlap and north growth can see enrollment pressure. Ask districts about capacity, boundaries, and busing when touring.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Illinois State Board of Education data, and campus visits beat ranking screenshots alone. Bradley University is higher education — not a substitute for K–12 research.',
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
              'OSF HealthCare Saint Francis Medical Center, Carle Health Methodist / Proctor patterns, and related Peoria campuses anchor regional tertiary care. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Dunlap or Chillicothe to preferred campuses — I-74 congestion and bluff routes change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core and medical product vs Heights vs Dunlap growth',
            detail:
              'Expect older SFH and walk-up multifamily near downtown and medical corridors; hillside character homes in Peoria Heights; modest grids in West Peoria–Bartonville; newer HOA SFH in Dunlap; small-town stock in Chillicothe.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by corridor. Budget for HOA dues on north growth tracts, older-home repair risk in core stock, and hillside maintenance on bluff properties.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and medical-corridor multifamily often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Peoria areas fit whom',
        bullets: [
          {
            title: 'Peoria core medical and urban lifestyle',
            detail:
              'Suits people prioritizing short drives to hospitals and downtown — with curb, stair, and daytime congestion tradeoffs on move day.',
          },
          {
            title: 'Peoria Heights bluff character living',
            detail:
              'Often appeals for views and established streets — with grade access and winter ice logistics.',
          },
          {
            title: 'Dunlap north family growth',
            detail:
              'Attracts households seeking newer housing and school-oriented suburbs — with HOA rules and I-74 peaks into core.',
          },
          {
            title: 'Chillicothe river-corridor small-town living',
            detail:
              'Fits buyers chasing quieter IL-29 living — with longer empty miles and arterial timing into Peoria.',
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
              'Healthcare systems, manufacturing and heavy equipment heritage employers, logistics, education (including Bradley University), professional services, and regional retail concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. I-74, I-474, IL-29, and US-24 peaks are real; cross-river Tazewell jobs add bridge timing. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple Peorias',
            detail:
              'Peoria County stacks medical/urban core, river bluffs, industrial edges, Dunlap family growth, Chillicothe river north, and rural townships — a central Illinois regional hub, not a university twin-city or capital-only market.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, severe-storm season, and cold winters with ice — especially hazardous on bluff streets. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining and events concentrate around Peoria corridors and riverfront; Dunlap feels more family- and school-oriented. Visit at peak and off-peak times when deciding — including a cross-river peak drive if your job sits in Tazewell County.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Peoria County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Peoria County — official site',
        href: 'https://www.peoriacounty.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Peoria',
        href: 'https://www.peoriagov.org/',
        external: true,
        note: 'Municipal services — regional hub',
      },
      {
        label: 'Village of Peoria Heights',
        href: 'https://www.peoriaheights.org/',
        external: true,
        note: 'Bluff community municipal services',
      },
      {
        label: 'IDOT travel / traffic conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'I-74 / I-474 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Medical District elevator experience for core jobs; bluff-grade fluency for Peoria Heights; HOA experience for Dunlap; honest I-74 / I-474 / IL-29 / US-24 timing for cross-zone and cross-river pairs. Clarify Peoria vs Tazewell (East Peoria) addresses. Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
