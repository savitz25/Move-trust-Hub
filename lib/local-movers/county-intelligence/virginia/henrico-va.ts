import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaPack,
  VA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-shared';

/**
 * Henrico County, VA — west end / Short Pump vs east end contrast
 * (not Chesterfield southside clone, not Richmond City urban core).
 */
export const henricoCountyVaIntelligence: CountyIntelligencePack = finalizeVaPack({
  countySlug: 'henrico',
  hubTitle: 'Henrico County Moving Intelligence Hub',
  eyebrow: 'Henrico · west end / Short Pump vs east end · I-64 & I-295 belt',
  h1: 'Moving in Henrico County: West End Growth, East End Contrast & I-64/I-295 Logistics',
  heroOpener:
    'Henrico County wraps Richmond on three sides with two very different move-day realities: a west-end and Short Pump growth belt of master-planned HOA product, mid-rise multifamily, and retail congestion — and an east-end fabric of older neighborhoods, airport-edge logistics, and different price points that do not share truck access or portal time. A Short Pump townhome, a Innsbrook corporate rental, a Lakeside bungalow, and a Varina-edge SFH are not the same job. I-64, I-295, US-33, US-250, and Parham Road corridors rewrite “local” estimates that treat Henrico as one suburb. This hub is for people moving in Henrico County — not a renamed Chesterfield page or Richmond City template.',
  heroCredibility:
    'Virginia DMV household goods / motor-carrier authority for intrastate moves · FMCSA for interstate · West-end vs east-end corridor awareness · Curated listings',
  majorCorridors: 'I-64 · I-295 · US-33 · US-250 · Parham Road corridors',
  whatMakesDifferent: {
    title: 'What makes moving in Henrico County different',
    intro:
      'These are Henrico realities — west-end/Short Pump density versus east-end contrast, beltway logistics, and airport-edge demand — not Chesterfield lakes communities or Fan District row-home rules.',
    bullets: [
      {
        title: 'West end and Short Pump are HOA- and multifamily-dense',
        detail:
          'Master-planned villages, townhome clusters, and elevator buildings near Short Pump and Innsbrook often need COI, gate lists, approved hours, and reserved elevators. Building packets beat verbal access promises.',
      },
      {
        title: 'East end is a different access and inventory profile',
        detail:
          'Older SFH, more modest multifamily, and airport-adjacent pockets mean driveway photos, stair counts, and different empty-mile patterns — not Short Pump curb rules copied eastward.',
      },
      {
        title: 'I-64 and I-295 define portal-to-portal time',
        detail:
          'Short Pump ↔ downtown Richmond, west end ↔ Varina, or Parham-corridor pairs look short on maps and long on clocks at peak. Price honestly.',
      },
      {
        title: 'US-250 / Broad and Parham are retail-and-apartment arteries',
        detail:
          'Commercial strip congestion, signal delay, and month-end apartment turns compete with residential curb space along major Henrico corridors.',
      },
      {
        title: 'Corporate and airport calendars reshape mid-week demand',
        detail:
          'Innsbrook-area offices, RIC airport logistics, and healthcare systems create mid-week executive and contractor turns that compete with Saturday family SFH demand.',
      },
      {
        title: 'Henrico wraps the city — address lines get messy',
        detail:
          'Many “Richmond” mailing addresses sit in Henrico. Clarify county vs independent city on every estimate so DMV intrastate assumptions and drive times stay accurate.',
      },
      {
        title: 'Not Chesterfield southside, not the capital urban core',
        detail:
          'Henrico’s dual west/east identity and I-64/I-295 belt are distinct from Chesterfield’s VA-288 southside growth and Richmond’s Fan/row-home logistics.',
      },
      VA_REG_BULLET,
    ],
  },
  zonesHeading: 'Henrico County access zones',
  zonesIntro:
    'Plan by Short Pump/west end, Innsbrook/Parham professional corridors, Lakeside/near-north, east end/airport, and Varina/southeast — access and housing stock diverge sharply by zone.',
  zones: [
    {
      id: 'short-pump-west',
      name: 'Short Pump, west end & I-64 growth belt',
      shortName: 'Short Pump / West',
      neighborhoods: [
        'Short Pump',
        'Westin / west-end retail core',
        'Twin Hickory edges',
        'Wyndham edges',
        'I-64 west corridor multifamily',
      ],
      housingTypes: 'HOA SFH, townhomes, mid-rise multifamily, luxury rental product',
      challenges: [
        'I-64 / Short Pump Town Center congestion',
        'HOA and elevator building packets',
        'High Saturday and month-end demand',
      ],
      moverTips:
        'Collect HOA and building COI early. Prefer mid-week morning starts. Build I-64 buffer for any downtown-linked pair.',
      cityKeywords: ['short pump', 'west end', 'twin hickory', 'wyndham', 'henrico west'],
    },
    {
      id: 'innsbrook-parham',
      name: 'Innsbrook, Parham Road & professional corridor',
      shortName: 'Innsbrook / Parham',
      neighborhoods: ['Innsbrook', 'Parham Road corridor', 'Broad Street west-Henrico edges', 'Gaskins corridor'],
      housingTypes: 'Corporate multifamily, townhomes, HOA SFH near office parks',
      challenges: [
        'Parham and Broad peak traffic',
        'Lease-end corporate apartment waves',
        'Limited staging near office-park multifamily',
      ],
      moverTips:
        'Ask about hard report-to-work dates. Confirm elevator reservations. Price Parham portal time honestly.',
      cityKeywords: ['innsbrook', 'parham', 'gaskins', 'broad street henrico'],
    },
    {
      id: 'lakeside-near-north',
      name: 'Lakeside, near-north Henrico & city-edge neighborhoods',
      shortName: 'Lakeside / Near-north',
      neighborhoods: ['Lakeside', 'Chamberlayne edges', 'Brookland edges', 'Near-north city line pockets'],
      housingTypes: 'Older SFH, bungalows, denser small-lot product, some multifamily',
      challenges: [
        'Narrower streets and canopy clearance',
        'Stairs and unfinished basements',
        'City/county line confusion on addresses',
      ],
      moverTips:
        'Photo street width and curb options. Confirm Henrico vs Richmond City line. Plan long carries on small lots.',
      cityKeywords: ['lakeside', 'chamberlayne', 'brookland', 'north henrico'],
    },
    {
      id: 'east-end-airport',
      name: 'East end, Airport Drive & RIC logistics edge',
      shortName: 'East end / Airport',
      neighborhoods: [
        'East End Henrico',
        'Sandston edges',
        'Airport Drive corridor',
        'Nine Mile Road edges',
        'RIC-adjacent multifamily',
      ],
      housingTypes: 'Older SFH, workforce multifamily, airport-adjacent rentals',
      challenges: [
        'I-64 / I-295 airport-area congestion',
        'Different inventory profile than west end',
        'Shift and logistics traffic near RIC',
      ],
      moverTips:
        'Do not apply Short Pump HOA assumptions by default. Prefer early starts near airport peaks. Clarify east-end street access with photos.',
      cityKeywords: ['east end', 'sandston', 'airport', 'ric', 'nine mile', 'henrico east'],
    },
    {
      id: 'varina-southeast',
      name: 'Varina, southeast Henrico & river-edge growth',
      shortName: 'Varina / SE',
      neighborhoods: ['Varina', 'New Market Road edges', 'Southeast growth tracts', 'James River-edge parcels'],
      housingTypes: 'Newer tract SFH, some acreage, mix of HOA and non-HOA',
      challenges: [
        'Longer empty miles from west-end yards',
        'I-295 timing for cross-county pairs',
        'Driveway length on larger lots',
      ],
      moverTips:
        'Survey driveway and turnaround. Price Varina↔Short Pump as a logistics day at peak. Confirm HOA vs non-HOA rules.',
      cityKeywords: ['varina', 'new market', 'southeast henrico', 'james river'],
    },
    {
      id: 'glens-glen-allen',
      name: 'Glen Allen & northwest Henrico',
      shortName: 'Glen Allen / NW',
      neighborhoods: ['Glen Allen', 'Hungary Road corridor', 'Staples Mill edges', 'Northwest HOA growth'],
      housingTypes: 'HOA SFH, townhomes, family inventories',
      challenges: [
        'I-295 / US-33 congestion',
        'School-calendar Saturday demand',
        'HOA truck and hour limits',
      ],
      moverTips:
        'Book peak family Saturdays early. Collect HOA packets first. Share driveway and gate photos with the estimate.',
      cityKeywords: ['glen allen', 'hungary', 'staples mill', 'northwest henrico'],
    },
  ],
  costDrivers: {
    title: 'What drives Henrico County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. West-end HOA/elevator soft costs, I-64/I-295 portal time, and east–west empty miles separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Short Pump / west-end HOA & elevators',
        detail: 'Gate lists, COI, and multifamily freight rules add labor before packing skill matters.',
      },
      {
        title: 'I-64 / I-295 / Parham congestion',
        detail: 'Cross-zone and city-linked pairs burn portal-to-portal hours at peak.',
      },
      {
        title: 'West–east empty miles inside one county',
        detail: 'Short Pump ↔ Varina or Innsbrook ↔ Sandston is not a “nearby suburb hop.”',
      },
      {
        title: 'Corporate and airport demand spikes',
        detail: 'Mid-week executive and logistics calendars compete with residential crews.',
      },
      {
        title: 'City-line and cross-locality pairs',
        detail: 'Richmond City and Chesterfield destinations raise staging distance and regulatory clarity needs.',
      },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,350+', note: 'Higher with elevator buildings or peak freeways' },
      { label: '2–3BR condo/townhome or modest SFH', value: '$1,250–$3,600+', note: 'West-end HOA soft costs trend up' },
      { label: '3–4+ BR / HOA / cross-zone', value: '$2,400–$7,000+', note: 'Short Pump SFH and long I-64 pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal; packing scales up' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Henrico County move',
    intro: 'School calendars, corporate lease turns, summer heat, and west-end retail peaks reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear multifamily freight windows and reduce I-64 / Parham pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          'West-end and Glen Allen SFH Saturday demand fills first. Book 2–4 weeks ahead for peak weekends.',
      },
      {
        title: 'Summer heat and storms',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries. Prefer early starts and tarp plans.',
      },
      {
        title: 'Corporate / airport relocation clusters',
        detail:
          'Innsbrook and RIC-adjacent calendars create mid-week spikes. Confirm report dates and storage-in-transit needs early.',
      },
    ],
  },
  specialized: [
    {
      id: 'west-east-henrico-logistics',
      title: 'West-end vs east-end logistics module',
      intro:
        'Henrico estimates fail more often when crews treat the county as one suburb — Short Pump packets and east-end driveways are different jobs.',
      bullets: [
        'Collect HOA/building COI and elevator rules for Short Pump, Innsbrook, and west-end multifamily first.',
        'Price portal-to-portal time for I-64, I-295, US-250, US-33, and Parham pairs at peak.',
        'Use driveway and street photos for east-end and Lakeside stock — do not assume west-end curb patterns.',
        'Clarify Henrico vs Richmond City vs Chesterfield on every address line.',
        'Verify Virginia DMV household goods / motor-carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Henrico County?',
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
              'Henrico County Public Schools is the primary public K–12 system for most addresses. Assignment is address-based — marketing names like Short Pump or Lakeside do not guarantee a campus.',
          },
          {
            title: 'Growth areas and capacity',
            detail:
              'West-end growth corridors can see enrollment pressure. Ask the district about capacity, transfers, and busing when touring.',
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
              'Henrico Doctors’, St. Mary’s (Bon Secours), VCU Health, and other regional facilities serve Henrico and greater Richmond. Confirm networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Short Pump or the east end to preferred campuses — I-64 and Parham congestion changes “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'West-end density vs east-end older fabric',
            detail:
              'Expect HOA tracts, townhomes, and multifamily near Short Pump/Innsbrook; older SFH and different price bands dominate much of the east end and some near-north pockets.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by corridor. Budget for HOA dues, west-end premiums, and insurance on higher-value inventories.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and apartment buildings often control move hours, truck size, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Henrico areas fit whom',
        bullets: [
          {
            title: 'Short Pump / west end',
            detail:
              'Suits households prioritizing newer product, retail, and west-end employment — with HOA rules and I-64 logistics.',
          },
          {
            title: 'Glen Allen / northwest',
            detail:
              'Often appeals for family SFH and school-shopping — with beltway commute patterns.',
          },
          {
            title: 'East end / Varina',
            detail:
              'Attracts value seekers and different housing character — with longer empty miles to west-end jobs and amenities.',
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
              'Professional services, healthcare, retail, logistics, airport-related work, and Richmond metro employers concentrate along I-64, Innsbrook, and city-edge corridors.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent outside a few denser pockets. I-64, I-295, US-250, and Parham peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, two primary lifestyles',
            detail:
              'Henrico stacks a high-growth west end against a more mixed east end — different from Chesterfield’s southside master-plans or Richmond’s walkable urban districts.',
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and mild winters. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'West-end retail and corporate corridors feel suburban-commercial; east-end and near-north pockets feel more neighborhood-oriented. Visit both sides at peak and off-peak times.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Henrico County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Virginia DMV motor-carrier / household goods authorization for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Henrico County — official site',
        href: 'https://henrico.us/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Henrico County Public Schools',
        href: 'https://henricoschools.us/',
        external: true,
        note: 'Boundaries & calendars',
      },
      {
        label: 'Richmond International Airport (RIC)',
        href: 'https://flyrichmond.com/',
        external: true,
        note: 'East-end logistics context',
      },
      {
        label: 'Virginia 511 traffic',
        href: 'https://www.511virginia.org/',
        external: true,
        note: 'I-64 / I-295 / Parham before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with west-end HOA and elevator fluency for Short Pump/Innsbrook product; honest I-64/I-295 timing for cross-zone pairs; driveway and older-stock experience for east end and Lakeside. Verify Virginia DMV household goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
});
