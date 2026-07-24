/**
 * One-shot generator for Michigan Core 10 Tier-1 intelligence packs.
 * Run: npx tsx scripts/generate-mi-tier1-packs.ts
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

type Zone = {
  id: string;
  name: string;
  shortName: string;
  neighborhoods: string[];
  housingTypes: string;
  challenges: string[];
  moverTips: string;
  cityKeywords: string[];
};

type PackSpec = {
  slug: string;
  exportName: string;
  countyName: string;
  hubTitle: string;
  eyebrow: string;
  h1: string;
  heroOpener: string;
  majorCorridors: string;
  whatIntro: string;
  bullets: { title: string; detail: string }[];
  zonesHeading: string;
  zonesIntro: string;
  zones: Zone[];
  costIntro: string;
  drivers: { title: string; detail: string }[];
  ranges: { label: string; value: string; note: string }[];
  seasonalIntro: string;
  seasonal: { title: string; detail: string }[];
  specialized: {
    id: string;
    title: string;
    intro: string;
    bullets: string[];
  };
  schools: { title: string; detail: string }[];
  hospitals: { title: string; detail: string }[];
  housing: { title: string; detail: string }[];
  townFit: { title: string; detail: string }[];
  jobs: { title: string; detail: string }[];
  lifestyle: { title: string; detail: string }[];
  resourceItems: { label: string; href: string }[];
  directoryHint: string;
};

const MI_REG = {
  title: 'Intrastate Michigan motor carrier authority vs interstate FMCSA',
  detail:
    'Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
};

const specs: PackSpec[] = [
  {
    slug: 'wayne',
    exportName: 'wayneCountyMiIntelligence',
    countyName: 'Wayne',
    hubTitle: 'Wayne County Moving Intelligence Hub',
    eyebrow: 'Wayne · Detroit core, Downriver & I-75/I-94 logistics',
    h1: 'Moving in Wayne County: Detroit Neighborhoods, Downriver Access & I-75/I-94 Logistics',
    heroOpener:
      'Wayne County is Detroit metro’s urban core: Midtown and Corktown curb limits, downtown elevators, Grosse Pointe and Dearborn neighborhood micro-markets, Downriver older stock, and I-75/I-94/I-96 portal time that is not Oakland’s north-metro HOA product and not Grand Rapids west-MI logistics. A Detroit walk-up, a Dearborn ranch, a Livonia multi-family unit, and a Downriver two-story do not share truck access or empty-mile risk. This hub is for Wayne — not an Oakland clone or renamed Ann Arbor page.',
    majorCorridors: 'I-75 · I-94 · I-96 · I-275 · M-10 · arterial grid',
    whatIntro:
      'These are Detroit/Wayne realities — neighborhood micro-markets, older urban stock, winter ice, and interstate access — not Troy corporate campuses or Ann Arbor campus cycles.',
    bullets: [
      {
        title: 'Detroit neighborhood micro-markets rewrite access plans',
        detail:
          'Midtown, Corktown, Southwest, Eastside, and near-west blocks each change curb length, stairs, and staging rules.',
      },
      {
        title: 'City vs Downriver vs west-Wayne product are not interchangeable',
        detail:
          'Downtown elevators and alley carries differ from Dearborn, Livonia, Westland, and Taylor two-stories.',
      },
      {
        title: 'Older housing stock and multi-unit stairs raise labor hours',
        detail: 'Photo stair width, parking, and long carries before truck sizing.',
      },
      {
        title: 'I-75 / I-94 / I-96 define portal-to-portal time',
        detail: 'Cross-metro pairs look local on maps and regional at peak or during winter storms.',
      },
      {
        title: 'Auto-economy and corporate relo calendars still matter',
        detail: 'Hard report dates and storage-in-transit appear on supplier and plant-adjacent moves.',
      },
      MI_REG,
    ],
    zonesHeading: 'Wayne access zones',
    zonesIntro:
      'Plan by downtown/Midtown, eastside/Grosse Pointe edges, Dearborn/west-Wayne, and Downriver corridors.',
    zones: [
      {
        id: 'detroit-core',
        name: 'Downtown, Midtown & near-core Detroit',
        shortName: 'Detroit core',
        neighborhoods: ['Downtown Detroit', 'Midtown', 'Corktown', 'New Center edges', 'Woodbridge edges'],
        housingTypes: 'High-rises, mid-rises, walk-ups, renovated multi-unit',
        challenges: ['Elevators and COI', 'Scarce curb staging', 'Event-day congestion'],
        moverTips:
          'Get building packets early. Prefer mid-week morning freight windows. Survey alley and truck length.',
        cityKeywords: ['detroit', 'midtown', 'corktown', 'downtown'],
      },
      {
        id: 'eastside-gp',
        name: 'Eastside & Grosse Pointe edges',
        shortName: 'Eastside / GP',
        neighborhoods: ['East English Village edges', 'Grosse Pointe Park edges', 'Harper Woods edges', 'St. Clair Shores edges'],
        housingTypes: 'Older SFH, multi-unit, lakeshore-adjacent stock',
        challenges: ['Tree-lined street width', 'Basement/stairs access', 'I-94 peak timing'],
        moverTips: 'Photo curb and driveway. Price I-94 portal time honestly for west-county pairs.',
        cityKeywords: ['grosse pointe', 'eastside', 'harper woods'],
      },
      {
        id: 'dearborn-west',
        name: 'Dearborn, Livonia & west-Wayne suburbs',
        shortName: 'Dearborn / west-Wayne',
        neighborhoods: ['Dearborn', 'Dearborn Heights', 'Livonia', 'Westland', 'Garden City edges'],
        housingTypes: 'SFH, multi-family, mid-century stock',
        challenges: ['I-94 / I-275 congestion', 'HOA and condo packets', 'Winter driveway access'],
        moverTips: 'Collect building/HOA rules. Book around shift-change and storm forecasts.',
        cityKeywords: ['dearborn', 'livonia', 'westland'],
      },
      {
        id: 'downriver',
        name: 'Downriver corridor',
        shortName: 'Downriver',
        neighborhoods: ['Taylor', 'Southgate', 'Wyandotte', 'Trenton edges', 'Allen Park edges', 'Lincoln Park edges'],
        housingTypes: 'Older SFH, multi-family, industrial-adjacent stock',
        challenges: ['I-75 congestion', 'Older basements and stairs', 'Industrial traffic'],
        moverTips: 'Clarify Downriver vs Detroit core destinations. Survey older stock access carefully.',
        cityKeywords: ['taylor', 'wyandotte', 'southgate', 'downriver'],
      },
    ],
    costIntro:
      'Neighborhood access, multi-unit stairs/elevators, and I-75/I-94 portal time drive quotes more than square footage alone.',
    drivers: [
      { title: 'Detroit core elevator & curb friction', detail: 'Labor and wait time dominate near-core jobs.' },
      { title: 'Older stock long carries & stairs', detail: 'Basements and walk-ups raise labor hours.' },
      { title: 'I-75 / I-94 / I-96 congestion', detail: 'Portal-to-portal spikes at peak and in storms.' },
      { title: 'Winter ice & lake-effect contingency', detail: 'Driveway and curb access can slip schedules.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$500–$1,600+', note: 'Higher with elevators or long carries' },
      { label: '2–3BR condo or modest SFH', value: '$1,500–$4,200+', note: 'Core curb friction trends up' },
      { label: '3–4+ BR / tower / cross-metro', value: '$2,800–$8,000+', note: 'Downtown towers and long metro pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$115–$190+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Auto calendars, multi-family lease turns, summer peak, and lake-effect winter reshape access.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-75/I-94 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Elevator buildings fill first near core and west-Wayne.' },
      { title: 'Winter ice and lake-effect snow', detail: 'Confirm contingency for driveway and curb staging.' },
    ],
    specialized: {
      id: 'detroit-wayne-neighborhoods-downriver',
      title: 'Detroit neighborhoods, Downriver & interstate access module',
      intro:
        'Wayne estimates fail when neighborhood curb rules, older stock access, or I-75/I-94 empty miles are ignored.',
      bullets: [
        'Request downtown/Midtown building packets at lease signing or escrow.',
        'Survey stair width and curb for older Detroit and Downriver stock.',
        'Price I-75/I-94/I-96 pairs portal-to-portal — city vs Downriver vs west-Wayne differ.',
        'Clarify Wayne vs Oakland/Macomb destinations on multi-county estimates.',
        'Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Detroit Public Schools Community District and numerous suburban districts (Dearborn, Livonia, Grosse Pointe, and others) serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools, Michigan Department of Education data, and campus visits beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Henry Ford, Detroit Medical Center, Beaumont/Corewell sites, and other systems serve county corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from Downriver and west-Wayne into core specialty care. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'City multi-unit vs suburban SFH stock',
        detail: 'Detroit near-core product differs sharply from Livonia/Dearborn and Downriver two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'Near-core renovated stock often prices differently from far-west multi-family.',
      },
    ],
    townFit: [
      { title: 'Detroit core lifestyle', detail: 'Walkable amenities with elevator and curb tradeoffs.' },
      { title: 'Dearborn / west-Wayne pattern', detail: 'Suburban grids with I-94/I-275 commute realism.' },
      { title: 'Downriver pattern', detail: 'Older SFH density with industrial-corridor logistics.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Auto OEMs and suppliers, healthcare, logistics, government, and professional services shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-75, I-94, and I-96 peaks are real. Test drive peak routes across city and suburban pairs.',
      },
    ],
    lifestyle: [
      {
        title: 'SE Michigan identity',
        detail:
          'Wayne is Detroit metro core — not Oakland north-metro corporate campuses or Grand Rapids west-MI product as the default.',
      },
      {
        title: 'Climate',
        detail: 'Hot humid summers and lake-effect winter ice/snow. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Wayne County — official site', href: 'https://www.waynecounty.com/' },
      { label: 'City of Detroit', href: 'https://detroitmi.gov/' },
      { label: 'MiDrive traffic (MDOT)', href: 'https://mdotjboss.state.mi.us/MiDrive/' },
    ],
    directoryHint:
      'Prefer Detroit neighborhood curb/elevator experience and honest I-75/I-94 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.',
  },
  {
    slug: 'oakland',
    exportName: 'oaklandCountyMiIntelligence',
    countyName: 'Oakland',
    hubTitle: 'Oakland County Moving Intelligence Hub',
    eyebrow: 'Oakland · Troy/Birmingham/Rochester north-metro & I-75/I-696',
    h1: 'Moving in Oakland County: Troy–Birmingham Suburbs, Corporate HQ Density & I-75/I-696 Logistics',
    heroOpener:
      'Oakland County is Detroit’s affluent north-metro collar: Troy and Auburn Hills corporate campuses, Birmingham and Royal Oak village cores, Rochester Hills HOA product, and I-75/I-696/M-59 portal time that is not Detroit walk-up logistics and not Grand Rapids west-MI. A Birmingham condo, a Troy executive two-story, a Pontiac multi-family unit, and a Rochester Hills HOA ranch do not share truck access or empty-mile risk. This hub is for Oakland — not a Wayne clone or Macomb industrial-east page.',
    majorCorridors: 'I-75 · I-696 · M-59 · Telegraph · Woodward corridors',
    whatIntro:
      'These are north-metro Oakland realities — corporate HQ density, HOA villages, and Woodward/Telegraph logistics — not Detroit core alleys or Macomb east-metro industrial mix.',
    bullets: [
      {
        title: 'Troy / Auburn Hills corporate density shapes relo calendars',
        detail: 'Hard report dates and executive inventories appear more often than pure city lease waves.',
      },
      {
        title: 'Birmingham / Royal Oak village cores mix curb limits and multi-unit stock',
        detail: 'Limited staging and elevators rewrite labor hours near walkable cores.',
      },
      {
        title: 'HOA growth suburbs are not Detroit product',
        detail: 'Gate lists, driveway rules, and longer empty miles differ from Wayne city stock.',
      },
      {
        title: 'I-75 / I-696 / M-59 define portal-to-portal time',
        detail: 'North-south and east-west pairs look short on maps and regional at peak.',
      },
      {
        title: 'North-metro identity is not Macomb east-metro',
        detail: 'Corporate/HOA mix differs from Warren/Sterling Heights industrial-suburban patterns.',
      },
      MI_REG,
    ],
    zonesHeading: 'Oakland access zones',
    zonesIntro:
      'Plan by Troy/Auburn Hills corporate corridors, Birmingham/Royal Oak cores, Rochester Hills north, and Pontiac/west-Oakland edges.',
    zones: [
      {
        id: 'troy-auburn',
        name: 'Troy, Auburn Hills & corporate corridors',
        shortName: 'Troy / Auburn Hills',
        neighborhoods: ['Troy', 'Auburn Hills', 'Bloomfield Twp edges', 'Rochester Road corridors'],
        housingTypes: 'Executive SFH, multi-family, corporate-adjacent housing',
        challenges: ['I-75 congestion', 'HOA packets', 'Corporate hard dates'],
        moverTips: 'Align crew days with report dates. Collect HOA and building packets early.',
        cityKeywords: ['troy', 'auburn hills'],
      },
      {
        id: 'birmingham-royal-oak',
        name: 'Birmingham, Royal Oak & south-Oakland villages',
        shortName: 'Birmingham / Royal Oak',
        neighborhoods: ['Birmingham', 'Royal Oak', 'Berkley', 'Clawson', 'Ferndale edges'],
        housingTypes: 'Village multi-unit, condos, older SFH, renovated stock',
        challenges: ['Limited curb staging', 'Elevators/COI', 'Woodward peak traffic'],
        moverTips: 'Prefer mid-week mornings. Survey truck length and elevator reservations.',
        cityKeywords: ['birmingham', 'royal oak', 'ferndale'],
      },
      {
        id: 'rochester-north',
        name: 'Rochester Hills & northern Oakland',
        shortName: 'Rochester north',
        neighborhoods: ['Rochester Hills', 'Rochester', 'Lake Orion edges', 'Oakland Twp edges'],
        housingTypes: 'HOA SFH, multi-family, lake-adjacent stock',
        challenges: ['M-59 congestion', 'HOA rules', 'Longer portal time to Detroit core'],
        moverTips: 'Price empty miles honestly. Photo driveway grades and HOA access rules.',
        cityKeywords: ['rochester hills', 'rochester', 'lake orion'],
      },
      {
        id: 'pontiac-west',
        name: 'Pontiac, Farmington Hills & west-Oakland edges',
        shortName: 'Pontiac / west-Oakland',
        neighborhoods: ['Pontiac', 'Farmington Hills', 'Novi edges', 'Southfield edges', 'Waterford edges'],
        housingTypes: 'Multi-family, SFH, mixed suburban stock',
        challenges: ['I-696 / Telegraph congestion', 'Mixed elevators and stairs', 'Winter access'],
        moverTips: 'Clarify west-Oakland vs south-Oakland destinations. Survey multi-unit access type.',
        cityKeywords: ['pontiac', 'farmington hills', 'novi', 'southfield'],
      },
    ],
    costIntro:
      'HOA/elevator friction, executive inventories, and I-75/I-696 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Village-core curb & elevator friction', detail: 'Birmingham/Royal Oak labor hours spike.' },
      { title: 'HOA soft costs', detail: 'Gate lists push demand into peak windows.' },
      { title: 'I-75 / I-696 / M-59 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Corporate hard-date premiums', detail: 'Short windows raise weekend demand.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$550–$1,700+', note: 'Higher near village elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,600–$4,500+', note: 'HOA and curb friction trends up' },
      { label: '3–4+ BR / executive / cross-metro', value: '$3,000–$9,000+', note: 'Executive inventories and long pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$120–$195+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Corporate calendars, school-year suburb demand, summer peak, and winter ice reshape north-metro windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-75/I-696 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book HOA Saturdays early.' },
      { title: 'Corporate Q-end transfers', detail: 'Hard dates cluster around fiscal and plant calendars.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway and hillside contingency north of M-59.' },
    ],
    specialized: {
      id: 'oakland-troy-birmingham-corporate',
      title: 'Troy/Birmingham north-metro & corporate HQ module',
      intro:
        'Oakland estimates fail when HOA packets, village curb limits, or I-75/I-696 empty miles are ignored.',
      bullets: [
        'Collect HOA and elevator packets before final quotes on Troy, Birmingham, and Royal Oak stock.',
        'Price I-75/I-696/M-59 pairs portal-to-portal — not as pure local flat rates.',
        'Separate executive inventory scopes from standard suburban SFH.',
        'Clarify Oakland vs Wayne/Macomb destinations on multi-county estimates.',
        'Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Numerous high-performing suburban districts (Troy, Birmingham, Rochester, Novi, and others) serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Michigan Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Corewell/Beaumont sites, Henry Ford West Bloomfield, and other systems serve north-metro corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from Rochester and Novi edges into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Village multi-unit vs HOA executive stock',
        detail: 'Birmingham/Royal Oak product differs from Rochester Hills and Troy two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'North-metro premium suburbs often price differently from Pontiac multi-family.',
      },
    ],
    townFit: [
      { title: 'Birmingham / Royal Oak lifestyle', detail: 'Walkable villages with curb and elevator tradeoffs.' },
      { title: 'Troy / Auburn Hills pattern', detail: 'Corporate adjacency with HOA and multi-family mix.' },
      { title: 'Rochester north pattern', detail: 'HOA product with longer portal time to Detroit core.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Auto suppliers, tech/professional campuses, healthcare, and corporate HQs shape north-metro employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-75, I-696, and M-59 peaks are real. Test drive peak routes before choosing a submarket.',
      },
    ],
    lifestyle: [
      {
        title: 'North-metro identity',
        detail:
          'Oakland is affluent north Detroit metro — not Wayne city alleys or Macomb east industrial-suburban defaults.',
      },
      {
        title: 'Climate',
        detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Oakland County — official site', href: 'https://www.oakgov.com/' },
      { label: 'MiDrive traffic (MDOT)', href: 'https://mdotjboss.state.mi.us/MiDrive/' },
    ],
    directoryHint:
      'Prefer HOA/village-core experience and honest I-75/I-696 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.',
  },
  {
    slug: 'macomb',
    exportName: 'macombCountyMiIntelligence',
    countyName: 'Macomb',
    hubTitle: 'Macomb County Moving Intelligence Hub',
    eyebrow: 'Macomb · Warren/Sterling Heights east-metro & I-94/M-59',
    h1: 'Moving in Macomb County: Warren–Sterling Heights East Metro, Industrial Mix & I-94/M-59 Logistics',
    heroOpener:
      'Macomb County is Detroit’s east-metro industrial-suburban belt: Warren and Sterling Heights manufacturing adjacency, Clinton Township multi-family, lakeshore edges toward St. Clair Shores, and I-94/M-53/M-59 portal time that is not Birmingham village product and not Flint regional logistics. A Warren ranch, a Sterling Heights two-story, a multi-family lease turn, and a northern Macomb township home do not share truck access or empty-mile risk. This hub is for Macomb — not an Oakland clone or Wayne downtown page.',
    majorCorridors: 'I-94 · M-53 · M-59 · I-696 links · Gratiot corridors',
    whatIntro:
      'These are east-metro Macomb realities — industrial corridors, suburban growth, and I-94 timing — not Oakland corporate villages or Detroit core elevators as the default.',
    bullets: [
      {
        title: 'Warren / Sterling Heights industrial-suburban mix',
        detail: 'Plant-adjacent traffic and shift-change windows reshape crew timing.',
      },
      {
        title: 'East-metro multi-family lease waves cluster demand',
        detail: 'Month-end turns fill elevators and stair buildings first.',
      },
      {
        title: 'I-94 / M-53 / M-59 define portal-to-portal time',
        detail: 'North-south and lakeshore pairs look local on maps and regional at peak.',
      },
      {
        title: 'Not Oakland north-metro HOA product by default',
        detail: 'Macomb industrial-suburban stock differs from Troy/Birmingham executive patterns.',
      },
      {
        title: 'Lake-effect winter still hits east-metro schedules',
        detail: 'Confirm driveway and curb contingency on storm days.',
      },
      MI_REG,
    ],
    zonesHeading: 'Macomb access zones',
    zonesIntro:
      'Plan by Warren industrial-adjacent, Sterling Heights growth, Clinton Township multi-family, and northern/lakeshore edges.',
    zones: [
      {
        id: 'warren-industrial',
        name: 'Warren & industrial-adjacent corridors',
        shortName: 'Warren',
        neighborhoods: ['Warren', 'Center Line edges', 'Eastpointe edges'],
        housingTypes: 'SFH, multi-family, industrial-adjacent stock',
        challenges: ['Shift-change traffic', 'Older basements/stairs', 'I-696 / Mound Rd congestion'],
        moverTips: 'Avoid plant shift peaks when flexible. Survey older stock access carefully.',
        cityKeywords: ['warren', 'center line'],
      },
      {
        id: 'sterling-heights',
        name: 'Sterling Heights growth suburbs',
        shortName: 'Sterling Heights',
        neighborhoods: ['Sterling Heights', 'Utica edges', 'Shelby Twp edges'],
        housingTypes: 'SFH, multi-family, HOA pockets',
        challenges: ['M-59 congestion', 'HOA rules', 'Longer runs north'],
        moverTips: 'Collect HOA packets. Price M-59 portal time to southern Macomb honestly.',
        cityKeywords: ['sterling heights', 'utica', 'shelby'],
      },
      {
        id: 'clinton-multi',
        name: 'Clinton Township multi-family belt',
        shortName: 'Clinton Twp',
        neighborhoods: ['Clinton Township', 'Mount Clemens edges', 'Harrison Twp edges'],
        housingTypes: 'Multi-family, condos, SFH mix',
        challenges: ['Elevator reservations', 'Lease-end waves', 'Gratiot / I-94 timing'],
        moverTips: 'Book elevators early for month-end. Confirm unit access type.',
        cityKeywords: ['clinton township', 'mount clemens'],
      },
      {
        id: 'north-lakeshore',
        name: 'Northern Macomb & lakeshore edges',
        shortName: 'North / lakeshore',
        neighborhoods: ['St. Clair Shores edges', 'New Baltimore edges', 'Macomb Twp', 'Chesterfield edges'],
        housingTypes: 'SFH, lake-adjacent stock, multi-family',
        challenges: ['Longer empty miles', 'Winter lake-effect', 'M-53 / I-94 timing'],
        moverTips: 'Price northern pairs portal-to-portal. Photo driveway and street width.',
        cityKeywords: ['st clair shores', 'macomb township', 'chesterfield'],
      },
    ],
    costIntro:
      'Industrial-corridor timing, multi-family access, and I-94/M-59 portal time drive quotes more than square footage alone.',
    drivers: [
      { title: 'Multi-family elevator & stair friction', detail: 'Lease-end labor hours spike.' },
      { title: 'I-94 / M-53 / M-59 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Industrial shift-change windows', detail: 'Crew timing near Warren corridors matters.' },
      { title: 'Winter lake-effect contingency', detail: 'East-metro snow can slip schedules.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$480–$1,550+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,450–$4,000+', note: 'Multi-family friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,600–$7,500+', note: 'Long I-94/M-59 pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$185+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Manufacturing calendars, multi-family turns, summer peak, and lake-effect winter reshape east-metro windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-94/M-59 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Clinton Twp and Sterling multi-unit fill first.' },
      { title: 'Winter ice and lake-effect snow', detail: 'Confirm contingency for driveway access.' },
    ],
    specialized: {
      id: 'macomb-warren-sterling-east-metro',
      title: 'Warren/Sterling Heights east-metro & industrial mix module',
      intro:
        'Macomb estimates fail when industrial traffic windows, multi-family access, or I-94/M-59 empty miles are ignored.',
      bullets: [
        'Survey multi-unit elevators and older SFH stairs before final quotes.',
        'Price I-94/M-53/M-59 pairs portal-to-portal.',
        'Avoid plant shift peaks near Warren industrial corridors when flexible.',
        'Clarify Macomb vs Oakland/Wayne destinations on multi-county estimates.',
        'Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Warren, Sterling Heights, Chippewa Valley, L’Anse Creuse, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Michigan Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Henry Ford Macomb, Corewell/Beaumont sites, and other systems serve east-metro corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from northern Macomb into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Industrial-adjacent SFH vs multi-family growth',
        detail: 'Warren product differs from Sterling Heights and northern township stock.',
      },
      {
        title: 'Cost variation',
        detail: 'Lakeshore-edge and multi-family product can price differently from inland two-stories.',
      },
    ],
    townFit: [
      { title: 'Warren industrial-suburban pattern', detail: 'Plant-adjacent logistics with older SFH stock.' },
      { title: 'Sterling Heights growth pattern', detail: 'Suburban SFH/multi-family with M-59 timing.' },
      { title: 'Northern / lakeshore pattern', detail: 'Longer empty miles and winter lake-effect risk.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Auto/defense manufacturing, suppliers, healthcare, and logistics shape east-metro employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-94, M-53, and M-59 peaks are real. Test drive peak routes before choosing a submarket.',
      },
    ],
    lifestyle: [
      {
        title: 'East-metro identity',
        detail:
          'Macomb is east Detroit metro industrial-suburban — not Oakland corporate villages or Flint regional defaults.',
      },
      {
        title: 'Climate',
        detail: 'Hot humid summers and lake-effect winter. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Macomb County — official site', href: 'https://www.macombgov.org/' },
      { label: 'MiDrive traffic (MDOT)', href: 'https://mdotjboss.state.mi.us/MiDrive/' },
    ],
    directoryHint:
      'Prefer multi-family and industrial-corridor experience with honest I-94/M-59 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.',
  },
  {
    slug: 'kent',
    exportName: 'kentCountyMiIntelligence',
    countyName: 'Kent',
    hubTitle: 'Kent County Moving Intelligence Hub',
    eyebrow: 'Kent · Grand Rapids west-MI hub & US-131/I-96 logistics',
    h1: 'Moving in Kent County: Grand Rapids Access, West Michigan Hubs & US-131/I-96 Logistics',
    heroOpener:
      'Kent County is West Michigan’s metro engine: downtown Grand Rapids elevators, Eastown and Heritage Hill older stock, Wyoming/Kentwood multi-family, and US-131/I-96/I-196 portal time that is not Detroit SE Michigan logistics and not Holland lakeshore product. A downtown GR condo, a Heritage Hill stairs job, a Cascade HOA two-story, and a Wyoming multi-unit turn do not share truck access or empty-mile risk. This hub is for Kent — not a renamed Wayne page or Ottawa lakeshore clone.',
    majorCorridors: 'I-96 · I-196 · US-131 · M-6 · 28th Street corridors',
    whatIntro:
      'These are Grand Rapids / West Michigan realities — furniture/manufacturing adjacency, lake-effect winter, and US-131 logistics — not SE Michigan corporate collars.',
    bullets: [
      {
        title: 'Grand Rapids core elevators and Heritage Hill stairs rewrite labor hours',
        detail: 'Downtown COIs and older near-core stock differ from suburban HOA product.',
      },
      {
        title: 'West Michigan is not Detroit metro logistics',
        detail: 'US-131/I-96 patterns and lake-effect timing differ from I-75/I-94 SE Michigan defaults.',
      },
      {
        title: 'Wyoming / Kentwood multi-family lease waves cluster crews',
        detail: 'Month-end turns fill elevators first along south and east belts.',
      },
      {
        title: 'I-96 / I-196 / US-131 define portal-to-portal time',
        detail: 'Cross-metro pairs look local on maps and regional at peak.',
      },
      {
        title: 'Furniture, manufacturing, and healthcare relo calendars matter',
        detail: 'Hard report dates appear on West Michigan employer moves.',
      },
      MI_REG,
    ],
    zonesHeading: 'Kent access zones',
    zonesIntro:
      'Plan by downtown/Heritage Hill, east GR suburbs, Wyoming/Kentwood multi-family, and north/west township growth.',
    zones: [
      {
        id: 'gr-downtown',
        name: 'Downtown Grand Rapids & Heritage Hill',
        shortName: 'Downtown GR',
        neighborhoods: ['Downtown Grand Rapids', 'Heritage Hill', 'Eastown edges', 'Midtown edges'],
        housingTypes: 'High-rises, mid-rises, historic SFH, multi-unit',
        challenges: ['Elevators and COI', 'Stairs and tight streets', 'Event-day congestion'],
        moverTips: 'Get building packets early. Survey Heritage Hill stair width and curb.',
        cityKeywords: ['grand rapids', 'heritage hill', 'eastown', 'downtown'],
      },
      {
        id: 'east-gr',
        name: 'East Grand Rapids & Cascade edges',
        shortName: 'East GR / Cascade',
        neighborhoods: ['East Grand Rapids', 'Cascade', 'Ada edges', 'Forest Hills corridors'],
        housingTypes: 'HOA SFH, multi-family, executive stock',
        challenges: ['HOA rules', 'I-96 / M-6 timing', 'Longer portal time to core'],
        moverTips: 'Collect HOA packets. Price east-side pairs portal-to-portal.',
        cityKeywords: ['east grand rapids', 'cascade', 'ada'],
      },
      {
        id: 'wyoming-kentwood',
        name: 'Wyoming, Kentwood & south multi-family belt',
        shortName: 'Wyoming / Kentwood',
        neighborhoods: ['Wyoming', 'Kentwood', 'Byron Center edges', '28th Street corridors'],
        housingTypes: 'Multi-family, SFH, commercial-adjacent stock',
        challenges: ['28th Street congestion', 'Lease-end waves', 'Elevator reservations'],
        moverTips: 'Book elevators early for month-end. Avoid peak 28th Street when flexible.',
        cityKeywords: ['wyoming', 'kentwood', 'byron center'],
      },
      {
        id: 'north-west-kent',
        name: 'Walker, Alpine & north/west township edges',
        shortName: 'North/west Kent',
        neighborhoods: ['Walker', 'Alpine Twp edges', 'Comstock Park edges', 'Rockford edges'],
        housingTypes: 'SFH, multi-family, growth suburbs',
        challenges: ['US-131 congestion', 'Longer empty miles', 'Winter lake-effect'],
        moverTips: 'Price north/west pairs honestly. Confirm winter driveway access.',
        cityKeywords: ['walker', 'rockford', 'comstock park'],
      },
    ],
    costIntro:
      'Core elevator/stair friction and US-131/I-96 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Downtown elevator & Heritage Hill stairs', detail: 'Labor hours dominate near-core jobs.' },
      { title: 'US-131 / I-96 / I-196 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'South-belt multi-family lease waves', detail: 'Month-end demand clusters.' },
      { title: 'Lake-effect winter contingency', detail: 'West Michigan snow can slip schedules.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,500+', note: 'Higher with elevators or stairs' },
      { label: '2–3BR condo or modest SFH', value: '$1,400–$3,900+', note: 'Core friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,500–$7,200+', note: 'Downtown towers and long pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$180+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'West Michigan lake-effect winter, summer peak, and multi-family lease turns reshape windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce US-131/28th Street pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Wyoming/Kentwood elevators fill first.' },
      { title: 'Lake-effect winter', detail: 'Confirm contingency for driveway and curb staging.' },
    ],
    specialized: {
      id: 'grand-rapids-west-mi-hub',
      title: 'Grand Rapids west-MI hub module',
      intro:
        'Kent estimates fail when downtown access, Heritage Hill stairs, or US-131 empty miles are treated like SE Michigan defaults.',
      bullets: [
        'Request downtown GR building packets early; survey Heritage Hill stairs.',
        'Price US-131/I-96/I-196 pairs portal-to-portal.',
        'Do not reuse Detroit I-75/I-94 timing assumptions for West Michigan.',
        'Clarify Kent vs Ottawa destinations on lakeshore-adjacent estimates.',
        'Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Grand Rapids Public Schools and numerous suburban districts (East Grand Rapids, Forest Hills, Kentwood, and others) serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Michigan Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Corewell Health (Spectrum legacy), University of Michigan Health-West, and other systems serve West Michigan corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from suburban belts into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Core historic/condo vs belt multi-family',
        detail: 'Heritage Hill and downtown product differs from Wyoming/Kentwood multi-unit stock.',
      },
      {
        title: 'Cost variation',
        detail: 'East Grand Rapids and Cascade often price differently from south-belt multi-family.',
      },
    ],
    townFit: [
      { title: 'Downtown / Eastown lifestyle', detail: 'Walkable amenities with elevator and stair tradeoffs.' },
      { title: 'East GR / Cascade pattern', detail: 'HOA product with longer portal time to core jobs.' },
      { title: 'Wyoming / Kentwood pattern', detail: 'Multi-family density with 28th Street logistics.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Healthcare, furniture/manufacturing, logistics, education, and professional services shape West Michigan employment.',
      },
      {
        title: 'Commute realism',
        detail: 'US-131, I-96, and 28th Street peaks are real. Test drive peak routes across the belt.',
      },
    ],
    lifestyle: [
      {
        title: 'West Michigan identity',
        detail:
          'Kent is Grand Rapids metro — not Detroit SE Michigan collars or pure lakeshore Holland product as the default.',
      },
      {
        title: 'Climate',
        detail: 'Lake-effect snow is a real planning factor. Confirm winter staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Kent County — official site', href: 'https://www.accesskent.com/' },
      { label: 'City of Grand Rapids', href: 'https://www.grandrapidsmi.gov/' },
      { label: 'MiDrive traffic (MDOT)', href: 'https://mdotjboss.state.mi.us/MiDrive/' },
    ],
    directoryHint:
      'Prefer downtown GR elevator and Heritage Hill stair experience with honest US-131 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.',
  },
  {
    slug: 'washtenaw',
    exportName: 'washtenawCountyMiIntelligence',
    countyName: 'Washtenaw',
    hubTitle: 'Washtenaw County Moving Intelligence Hub',
    eyebrow: 'Washtenaw · Ann Arbor university/tech & I-94/US-23 logistics',
    h1: 'Moving in Washtenaw County: Ann Arbor University Cycles, Tech/Medical Access & I-94/US-23 Logistics',
    heroOpener:
      'Washtenaw County is university/tech metro, not Detroit spillover: Ann Arbor campus multi-family and lease waves, medical/research corridors, Ypsilanti mixed stock, and I-94/US-23/M-14 portal time that is not Wayne industrial logistics and not Lansing capital patterns. A central Ann Arbor condo, a student multi-unit turn, a Pittsfield HOA two-story, and a Ypsilanti walk-up do not share truck access or empty-mile risk. This hub is for Washtenaw — not a renamed Oakland or Detroit page.',
    majorCorridors: 'I-94 · US-23 · M-14 · State Street corridors',
    whatIntro:
      'These are Ann Arbor / Washtenaw realities — university calendars, tech/medical density, and constrained city access — not SE Michigan collar defaults.',
    bullets: [
      {
        title: 'University of Michigan lease cycles cluster crews',
        detail: 'August/May and academic turns fill elevators and street parking first.',
      },
      {
        title: 'Central Ann Arbor curb limits rewrite labor hours',
        detail: 'Limited staging and multi-unit stairs dominate near campus and downtown.',
      },
      {
        title: 'Tech and medical relo calendars differ from pure family suburb moves',
        detail: 'Hard report dates appear on research and hospital-adjacent transfers.',
      },
      {
        title: 'I-94 / US-23 / M-14 define portal-to-portal time',
        detail: 'Pairs toward Detroit metro look regional at peak despite map distance.',
      },
      {
        title: 'Not a Detroit neighborhood clone',
        detail: 'University multi-unit and research-corridor product differs from Wayne city stock.',
      },
      MI_REG,
    ],
    zonesHeading: 'Washtenaw access zones',
    zonesIntro:
      'Plan by central Ann Arbor/campus, south/west A2 growth, Ypsilanti, and township edges toward I-94/US-23.',
    zones: [
      {
        id: 'a2-campus',
        name: 'Central Ann Arbor & campus multi-family',
        shortName: 'Central A2 / campus',
        neighborhoods: ['Downtown Ann Arbor', 'Central Campus edges', 'Kerrytown edges', 'Old West Side edges'],
        housingTypes: 'Student multi-family, condos, older SFH, mid-rises',
        challenges: ['Lease-end waves', 'Scarce curb staging', 'Elevators and stairs'],
        moverTips: 'Book academic peaks early. Confirm elevator reservations and truck length.',
        cityKeywords: ['ann arbor', 'campus', 'kerrytown'],
      },
      {
        id: 'a2-south-west',
        name: 'South/west Ann Arbor & Pittsfield growth',
        shortName: 'South/west A2',
        neighborhoods: ['Pittsfield Twp', 'Scio Twp edges', 'South State corridors', 'Briarwood edges'],
        housingTypes: 'HOA SFH, multi-family, townhomes',
        challenges: ['I-94 / State Street congestion', 'HOA rules', 'Longer portal time to campus'],
        moverTips: 'Collect HOA packets. Price south/west pairs portal-to-portal.',
        cityKeywords: ['pittsfield', 'scio', 'ann arbor south'],
      },
      {
        id: 'ypsilanti',
        name: 'Ypsilanti city & EMU-adjacent stock',
        shortName: 'Ypsilanti',
        neighborhoods: ['Ypsilanti', 'Depot Town edges', 'EMU campus edges', 'Superior Twp edges'],
        housingTypes: 'Older multi-unit, SFH, student-adjacent stock',
        challenges: ['Stairs and tight streets', 'Student lease waves', 'I-94 timing'],
        moverTips: 'Survey stair width and curb. Align with academic calendars when possible.',
        cityKeywords: ['ypsilanti', 'emu', 'depot town'],
      },
      {
        id: 'washtenaw-edges',
        name: 'Saline, Chelsea & outer township edges',
        shortName: 'Outer Washtenaw',
        neighborhoods: ['Saline', 'Chelsea', 'Dexter edges', 'Manchester edges'],
        housingTypes: 'SFH, multi-family, small-town stock',
        challenges: ['Longer empty miles', 'US-12 / I-94 timing', 'Winter access'],
        moverTips: 'Price outer-township pairs honestly. Photo driveway and street width.',
        cityKeywords: ['saline', 'chelsea', 'dexter'],
      },
    ],
    costIntro:
      'Campus multi-unit access and I-94/US-23 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Campus multi-unit & curb friction', detail: 'Academic peaks spike labor hours.' },
      { title: 'I-94 / US-23 / M-14 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs on growth edges', detail: 'Gate lists push demand into peak windows.' },
      { title: 'Winter ice contingency', detail: 'Confirm driveway and curb access on storm days.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$500–$1,650+', note: 'Higher near campus elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,500–$4,300+', note: 'Campus friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,700–$8,000+', note: 'Detroit-metro pairs and peaks highest' },
      { label: 'Typical 2-person crew rate', value: '$115–$190+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'University calendars dominate more than pure suburban family peaks — plan August/May carefully.',
    seasonal: [
      { title: 'Best windows: mid-week outside academic peaks', detail: 'Clear curb near campus and State Street.' },
      { title: 'Academic peaks: August and May', detail: 'Book multi-unit and elevators far ahead.' },
      { title: 'Peak family season still matters in townships', detail: 'Book suburban Saturdays early.' },
      { title: 'Winter ice and snow', detail: 'Confirm contingency for driveway access.' },
    ],
    specialized: {
      id: 'ann-arbor-university-tech-medical',
      title: 'Ann Arbor university, tech & medical module',
      intro:
        'Washtenaw estimates fail when academic lease waves, campus curb limits, or I-94/US-23 empty miles are ignored.',
      bullets: [
        'Align multi-unit moves with U-M and EMU calendars when possible.',
        'Request elevator packets early in central Ann Arbor.',
        'Price I-94/US-23/M-14 pairs portal-to-portal toward Detroit metro.',
        'Do not treat Washtenaw as a Detroit neighborhood clone.',
        'Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Ann Arbor, Ypsilanti Community, Saline, Chelsea, Dexter, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Michigan Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Michigan Medicine (U-M), Trinity Health Ann Arbor, and other systems dominate local care. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from township edges into medical campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Campus multi-unit vs township HOA stock',
        detail: 'Central Ann Arbor product differs sharply from Pittsfield and Saline two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'Near-campus renovated stock often prices differently from outer-township SFH.',
      },
    ],
    townFit: [
      { title: 'Central Ann Arbor lifestyle', detail: 'Walkable university/tech amenities with curb tradeoffs.' },
      { title: 'South/west growth pattern', detail: 'HOA product with I-94/State Street logistics.' },
      { title: 'Ypsilanti pattern', detail: 'Mixed older stock with student-adjacent multi-unit.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'University of Michigan, healthcare/research, tech/startups, and education shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-94, US-23, and M-14 peaks are real — especially toward Detroit metro employment.',
      },
    ],
    lifestyle: [
      {
        title: 'University/tech identity',
        detail:
          'Washtenaw is Ann Arbor metro — not Detroit industrial-suburban defaults or Lansing capital patterns.',
      },
      {
        title: 'Climate',
        detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Washtenaw County — official site', href: 'https://www.washtenaw.org/' },
      { label: 'City of Ann Arbor', href: 'https://www.a2gov.org/' },
      { label: 'MiDrive traffic (MDOT)', href: 'https://mdotjboss.state.mi.us/MiDrive/' },
    ],
    directoryHint:
      'Prefer campus multi-unit and Ann Arbor curb experience with honest I-94/US-23 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.',
  },
  {
    slug: 'genesee',
    exportName: 'geneseeCountyMiIntelligence',
    countyName: 'Genesee',
    hubTitle: 'Genesee County Moving Intelligence Hub',
    eyebrow: 'Genesee · Flint regional hub & I-75/I-69 logistics',
    h1: 'Moving in Genesee County: Flint Regional Access, Recovery/Relo Patterns & I-75/I-69 Logistics',
    heroOpener:
      'Genesee County is a Flint regional market, not a Detroit suburb clone: Flint core multi-unit and older stock, Grand Blanc and Fenton suburban product, I-75/I-69 corridor timing, and recovery/relo patterns that differ from Oakland HOA villages and Saginaw bay logistics. A Flint multi-family unit, a Grand Blanc two-story, and a Fenton township home do not share truck access or empty-mile risk. This hub is for Genesee — not renamed Macomb or Wayne pages.',
    majorCorridors: 'I-75 · I-69 · M-21 · Dort Highway corridors',
    whatIntro:
      'These are Flint regional realities — older stock, I-75/I-69 logistics, and suburban recovery growth — not SE Michigan corporate collars.',
    bullets: [
      {
        title: 'Flint core older stock and multi-unit access dominate many jobs',
        detail: 'Stairs, basements, and curb limits rewrite labor hours.',
      },
      {
        title: 'Grand Blanc / Fenton suburban product is not Detroit north-metro',
        detail: 'Regional pricing and empty miles differ from Oakland HOA defaults.',
      },
      {
        title: 'I-75 / I-69 define portal-to-portal time',
        detail: 'Pairs toward Detroit or Lansing look regional at peak.',
      },
      {
        title: 'Recovery and workforce relo patterns matter where accurate',
        detail: 'Hard dates appear on manufacturing, healthcare, and education transfers.',
      },
      {
        title: 'Not a Detroit spillover clone',
        detail: 'Genesee is its own regional hub with distinct access and inventory patterns.',
      },
      MI_REG,
    ],
    zonesHeading: 'Genesee access zones',
    zonesIntro:
      'Plan by Flint core, Grand Blanc south suburbs, Fenton/west edges, and northern township corridors.',
    zones: [
      {
        id: 'flint-core',
        name: 'Flint core & near-city multi-unit',
        shortName: 'Flint core',
        neighborhoods: ['Downtown Flint', 'Eastside/Westside edges', 'Carriage Town edges', 'College Cultural edges'],
        housingTypes: 'Older multi-unit, SFH, renovated stock',
        challenges: ['Stairs and basements', 'Curb staging', 'Dort / I-69 timing'],
        moverTips: 'Survey stair width and curb carefully. Prefer mid-week mornings.',
        cityKeywords: ['flint', 'downtown flint'],
      },
      {
        id: 'grand-blanc',
        name: 'Grand Blanc & southern suburban belt',
        shortName: 'Grand Blanc',
        neighborhoods: ['Grand Blanc', 'Grand Blanc Twp', 'Mundy Twp edges', 'Holly edges'],
        housingTypes: 'SFH, multi-family, HOA pockets',
        challenges: ['I-75 congestion', 'HOA rules', 'Longer portal time to Flint core'],
        moverTips: 'Collect HOA packets. Price I-75 pairs portal-to-portal.',
        cityKeywords: ['grand blanc', 'holly'],
      },
      {
        id: 'fenton-west',
        name: 'Fenton, Swartz Creek & west edges',
        shortName: 'Fenton / west',
        neighborhoods: ['Fenton', 'Swartz Creek', 'Argentine Twp edges', 'Linden edges'],
        housingTypes: 'SFH, lake-adjacent stock, multi-family',
        challenges: ['US-23 / I-75 timing', 'Longer empty miles', 'Winter access'],
        moverTips: 'Price west-edge pairs honestly. Photo driveway and street width.',
        cityKeywords: ['fenton', 'swartz creek', 'linden'],
      },
      {
        id: 'genesee-north',
        name: 'Flushing, Davison & northern corridors',
        shortName: 'North Genesee',
        neighborhoods: ['Flushing', 'Davison', 'Clio edges', 'Mt. Morris edges'],
        housingTypes: 'SFH, multi-family, small-town stock',
        challenges: ['M-21 congestion', 'Longer runs', 'Winter ice'],
        moverTips: 'Clarify northern destinations early. Confirm winter contingency.',
        cityKeywords: ['flushing', 'davison', 'clio'],
      },
    ],
    costIntro:
      'Older-stock access and I-75/I-69 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Older multi-unit & stair friction', detail: 'Flint core labor hours spike.' },
      { title: 'I-75 / I-69 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Suburban HOA soft costs', detail: 'Grand Blanc packets push peak windows.' },
      { title: 'Winter ice contingency', detail: 'Confirm driveway access on storm days.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,350+', note: 'Higher with stairs or long carries' },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,500+', note: 'Older stock friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,200–$6,500+', note: 'I-75/I-69 long pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$170+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Regional family peaks, multi-family turns, and winter ice reshape Flint-area windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-75/I-69 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Near-core elevators and stairs fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm contingency for driveway access.' },
    ],
    specialized: {
      id: 'flint-genesee-regional-recovery',
      title: 'Flint regional recovery & relo patterns module',
      intro:
        'Genesee estimates fail when older-stock access or I-75/I-69 empty miles are treated like Detroit collar defaults.',
      bullets: [
        'Survey Flint core stairs, basements, and curb before final quotes.',
        'Price I-75/I-69 pairs portal-to-portal toward Detroit or Lansing.',
        'Treat Grand Blanc/Fenton product as regional suburb stock — not Oakland clones.',
        'Clarify Genesee vs Saginaw/Oakland destinations on multi-county estimates.',
        'Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Flint Community Schools, Grand Blanc, Fenton, Davison, Flushing, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Michigan Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Hurley Medical Center, Ascension Genesys, McLaren Flint, and other systems serve regional corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from Fenton and Davison into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Flint core multi-unit vs southern suburban SFH',
        detail: 'Near-city product differs from Grand Blanc and Fenton two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'Recovery-adjacent and suburban stock can price differently across short distances.',
      },
    ],
    townFit: [
      { title: 'Flint core pattern', detail: 'Older multi-unit and SFH with curb/stair tradeoffs.' },
      { title: 'Grand Blanc suburban pattern', detail: 'HOA/SFH product with I-75 timing.' },
      { title: 'Fenton / west pattern', detail: 'Longer empty miles and lake-adjacent pockets.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Healthcare, education, manufacturing/suppliers, and regional services shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-75 and I-69 peaks are real for Detroit and Lansing-bound workers.',
      },
    ],
    lifestyle: [
      {
        title: 'Flint regional identity',
        detail:
          'Genesee is its own mid-Michigan hub — not Detroit spillover suburbs or Saginaw bay defaults.',
      },
      {
        title: 'Climate',
        detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Genesee County — official site', href: 'https://www.geneseecountymi.gov/' },
      { label: 'City of Flint', href: 'https://www.cityofflint.com/' },
      { label: 'MiDrive traffic (MDOT)', href: 'https://mdotjboss.state.mi.us/MiDrive/' },
    ],
    directoryHint:
      'Prefer older-stock access surveys and honest I-75/I-69 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.',
  },
  {
    slug: 'ottawa',
    exportName: 'ottawaCountyMiIntelligence',
    countyName: 'Ottawa',
    hubTitle: 'Ottawa County Moving Intelligence Hub',
    eyebrow: 'Ottawa · Holland lakeshore west-MI & US-31/I-96 logistics',
    h1: 'Moving in Ottawa County: Holland Lakeshore Towns, West Michigan Growth & US-31/I-96 Logistics',
    heroOpener:
      'Ottawa County is West Michigan lakeshore identity: Holland and Zeeland village/growth stock, Grand Haven shoreline logistics, Jenison/Hudsonville GR-collar edges, and US-31/I-96/I-196 portal time that is not Grand Rapids core elevators and not Detroit SE Michigan. A Holland multi-family unit, a lakeshore seasonal turn, and a Hudsonville HOA two-story do not share truck access or empty-mile risk. This hub is for Ottawa — not a Kent downtown clone.',
    majorCorridors: 'I-96 · US-31 · M-6 links · lakeshore corridors',
    whatIntro:
      'These are Holland / lakeshore west-MI realities — shoreline logistics, growth suburbs, and lake-effect winter — not Grand Rapids core product alone.',
    bullets: [
      {
        title: 'Holland / Zeeland growth is not downtown Grand Rapids',
        detail: 'Village cores, HOA product, and manufacturing adjacency differ from GR elevators.',
      },
      {
        title: 'Lakeshore and Grand Haven access rewrite staging plans',
        detail: 'Tourism peaks and shoreline streets change truck length and timing.',
      },
      {
        title: 'Jenison / Hudsonville collar edges lean toward GR logistics',
        detail: 'Still Ottawa addresses — clarify county lines on multi-county estimates.',
      },
      {
        title: 'US-31 / I-96 / I-196 define portal-to-portal time',
        detail: 'Lakeshore-to-GR pairs look short on maps and regional at peak.',
      },
      {
        title: 'Lake-effect snow is a first-class planning risk',
        detail: 'West Michigan winters hit driveway and curb access hard.',
      },
      MI_REG,
    ],
    zonesHeading: 'Ottawa access zones',
    zonesIntro:
      'Plan by Holland/Zeeland core, Grand Haven lakeshore, Jenison/Hudsonville GR collar, and northern township edges.',
    zones: [
      {
        id: 'holland-zeeland',
        name: 'Holland, Zeeland & south-central growth',
        shortName: 'Holland / Zeeland',
        neighborhoods: ['Holland', 'Zeeland', 'Holland Twp', 'Park Twp edges'],
        housingTypes: 'SFH, multi-family, HOA growth, village stock',
        challenges: ['US-31 congestion', 'HOA rules', 'Tourism-season traffic'],
        moverTips: 'Avoid festival/tourism peaks when flexible. Collect HOA packets.',
        cityKeywords: ['holland', 'zeeland'],
      },
      {
        id: 'grand-haven',
        name: 'Grand Haven & lakeshore corridor',
        shortName: 'Grand Haven / shore',
        neighborhoods: ['Grand Haven', 'Ferrysburg', 'Spring Lake edges', 'lakeshore corridors'],
        housingTypes: 'SFH, multi-family, seasonal/shore stock',
        challenges: ['Narrow shoreline streets', 'Seasonal demand spikes', 'Winter lake-effect'],
        moverTips: 'Photo street width and driveway. Book summer weekends early.',
        cityKeywords: ['grand haven', 'spring lake', 'ferrysburg'],
      },
      {
        id: 'jenison-hudsonville',
        name: 'Jenison, Hudsonville & GR-collar edges',
        shortName: 'Jenison / Hudsonville',
        neighborhoods: ['Jenison', 'Hudsonville', 'Georgetown Twp', 'Allendale edges'],
        housingTypes: 'HOA SFH, multi-family, growth suburbs',
        challenges: ['I-196 / M-6 timing', 'HOA rules', 'Empty miles to Holland shore'],
        moverTips: 'Clarify Ottawa vs Kent destinations. Price collar pairs portal-to-portal.',
        cityKeywords: ['jenison', 'hudsonville', 'allendale'],
      },
      {
        id: 'ottawa-north',
        name: 'Coopersville, northern townships & rural edges',
        shortName: 'North Ottawa',
        neighborhoods: ['Coopersville', 'Polkton Twp edges', 'Crockery Twp edges', 'northern rural roads'],
        housingTypes: 'SFH, rural stock, limited multi-family',
        challenges: ['Longer empty miles', 'Rural access', 'Winter ice'],
        moverTips: 'Price rural pairs honestly. Photo driveway and turn radius.',
        cityKeywords: ['coopersville', 'northern ottawa'],
      },
    ],
    costIntro:
      'Lakeshore staging, HOA growth, and US-31/I-96 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Lakeshore curb & seasonal congestion', detail: 'Summer weekends spike labor hours.' },
      { title: 'US-31 / I-96 / I-196 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs on growth edges', detail: 'Gate lists push demand into peak windows.' },
      { title: 'Lake-effect winter contingency', detail: 'West Michigan snow can slip schedules.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,450+', note: 'Higher near shore staging limits' },
      { label: '2–3BR condo or modest SFH', value: '$1,350–$3,800+', note: 'HOA and shore friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,400–$7,000+', note: 'GR pairs and peak weekends highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$175+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Tourism summers, family peaks, and heavy lake-effect winters reshape Ottawa windows more than pure GR core.',
    seasonal: [
      { title: 'Best windows: mid-week outside tourism peaks', detail: 'Clear shore staging and US-31.' },
      { title: 'Peak family + tourism season: late May–mid-August', detail: 'Book lakeshore Saturdays early.' },
      { title: 'Tulip Time and festival windows', detail: 'Holland congestion can block flexible moves.' },
      { title: 'Lake-effect winter', detail: 'Confirm contingency for driveway and curb staging.' },
    ],
    specialized: {
      id: 'ottawa-holland-lakeshore-west-mi',
      title: 'Holland lakeshore & west-MI growth module',
      intro:
        'Ottawa estimates fail when lakeshore staging, tourism peaks, or US-31 empty miles are treated like GR downtown defaults.',
      bullets: [
        'Photo lakeshore street width and driveway grades before truck sizing.',
        'Avoid major Holland tourism weekends when flexible.',
        'Price US-31/I-96/I-196 pairs portal-to-portal toward Grand Rapids.',
        'Clarify Ottawa vs Kent addresses on GR-collar estimates.',
        'Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Holland, Zeeland, Grand Haven, Hudsonville, Jenison, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Michigan Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Holland Hospital, Trinity Health sites, and Grand Rapids systems (via commute) serve the county. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from lakeshore towns into Holland and GR care. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Lakeshore / village vs GR-collar HOA stock',
        detail: 'Holland and Grand Haven product differs from Jenison/Hudsonville growth suburbs.',
      },
      {
        title: 'Cost variation',
        detail: 'Shore-adjacent and growth HOA stock can price differently from inland rural SFH.',
      },
    ],
    townFit: [
      { title: 'Holland / Zeeland lifestyle', detail: 'Village and growth-suburb mix with manufacturing adjacency.' },
      { title: 'Grand Haven shore pattern', detail: 'Seasonal congestion and shoreline staging tradeoffs.' },
      { title: 'Jenison / Hudsonville pattern', detail: 'GR-collar HOA product with I-196 timing.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Manufacturing, agriculture-adjacent industry, healthcare, education, and GR-commute professional jobs shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'US-31 and I-196 peaks are real for Grand Rapids-bound workers.',
      },
    ],
    lifestyle: [
      {
        title: 'Lakeshore west-MI identity',
        detail:
          'Ottawa is Holland/Grand Haven lakeshore growth — not Grand Rapids downtown elevators or SE Michigan collars.',
      },
      {
        title: 'Climate',
        detail: 'Heavy lake-effect snow is a first-class planning factor. Confirm winter staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Ottawa County — official site', href: 'https://www.miottawa.org/' },
      { label: 'City of Holland', href: 'https://www.cityofholland.com/' },
      { label: 'MiDrive traffic (MDOT)', href: 'https://mdotjboss.state.mi.us/MiDrive/' },
    ],
    directoryHint:
      'Prefer lakeshore staging experience and honest US-31/I-196 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.',
  },
  {
    slug: 'ingham',
    exportName: 'inghamCountyMiIntelligence',
    countyName: 'Ingham',
    hubTitle: 'Ingham County Moving Intelligence Hub',
    eyebrow: 'Ingham · Lansing capital, MSU adjacency & I-96/I-69 logistics',
    h1: 'Moving in Ingham County: Lansing Capital Access, MSU Cycles & I-96/I-69 Logistics',
    heroOpener:
      'Ingham County is capital-and-campus logistics: downtown Lansing government multi-unit, East Lansing MSU lease waves, Okemos/Haslett suburban product, and I-96/I-69/US-127 portal time that is not Detroit SE Michigan and not Ann Arbor research-corridor defaults. A downtown Lansing condo, an East Lansing student multi-unit, and an Okemos HOA two-story do not share truck access or empty-mile risk. This hub is for Ingham — not a renamed Washtenaw or Wayne page.',
    majorCorridors: 'I-96 · I-69 · US-127 · Saginaw Hwy corridors',
    whatIntro:
      'These are Lansing capital / MSU realities — government calendars, student lease waves, and I-96/I-69 logistics — not Detroit collar product.',
    bullets: [
      {
        title: 'MSU lease cycles cluster East Lansing multi-unit demand',
        detail: 'August/May turns fill elevators and street parking first.',
      },
      {
        title: 'Capital and government relo calendars create hard dates',
        detail: 'Session timing and agency transfers can compress windows.',
      },
      {
        title: 'Okemos / Haslett suburban product differs from campus multi-unit',
        detail: 'HOA packets and longer empty miles rewrite quotes.',
      },
      {
        title: 'I-96 / I-69 / US-127 define portal-to-portal time',
        detail: 'Pairs toward Detroit, Grand Rapids, or Flint look regional at peak.',
      },
      {
        title: 'Not Ann Arbor and not Detroit by default',
        detail: 'Capital + MSU mix is its own mid-Michigan pattern.',
      },
      MI_REG,
    ],
    zonesHeading: 'Ingham access zones',
    zonesIntro:
      'Plan by downtown Lansing, East Lansing/MSU, Okemos/Haslett suburbs, and south/west township edges.',
    zones: [
      {
        id: 'lansing-core',
        name: 'Downtown Lansing & near-core multi-unit',
        shortName: 'Downtown Lansing',
        neighborhoods: ['Downtown Lansing', 'REO Town edges', 'Old Town edges', 'near-capitol corridors'],
        housingTypes: 'High-rises, mid-rises, multi-unit, renovated stock',
        challenges: ['Elevators and COI', 'Scarce curb staging', 'Government event traffic'],
        moverTips: 'Get building packets early. Prefer mid-week mornings away from major capitol events.',
        cityKeywords: ['lansing', 'downtown lansing', 'old town'],
      },
      {
        id: 'east-lansing-msu',
        name: 'East Lansing & MSU multi-family',
        shortName: 'East Lansing / MSU',
        neighborhoods: ['East Lansing', 'MSU campus edges', 'Grand River multi-family', 'student housing belts'],
        housingTypes: 'Student multi-family, mid-rises, older SFH',
        challenges: ['Lease-end waves', 'Elevators and stairs', 'Campus congestion'],
        moverTips: 'Book academic peaks early. Confirm elevator reservations and unit access type.',
        cityKeywords: ['east lansing', 'msu'],
      },
      {
        id: 'okemos-haslett',
        name: 'Okemos, Haslett & east suburban belt',
        shortName: 'Okemos / Haslett',
        neighborhoods: ['Okemos', 'Haslett', 'Meridian Twp', 'Williamston edges'],
        housingTypes: 'HOA SFH, multi-family, executive stock',
        challenges: ['HOA rules', 'I-96 / Saginaw Hwy timing', 'Longer portal time to campus'],
        moverTips: 'Collect HOA packets. Price east-suburb pairs portal-to-portal.',
        cityKeywords: ['okemos', 'haslett', 'meridian'],
      },
      {
        id: 'ingham-south-west',
        name: 'Mason, Holt & south/west edges',
        shortName: 'South/west Ingham',
        neighborhoods: ['Mason', 'Holt', 'Delhi Twp', 'Leslie edges', 'Onondaga edges'],
        housingTypes: 'SFH, multi-family, small-town stock',
        challenges: ['US-127 timing', 'Longer empty miles', 'Winter access'],
        moverTips: 'Price south/west pairs honestly. Photo driveway and street width.',
        cityKeywords: ['mason', 'holt', 'delhi'],
      },
    ],
    costIntro:
      'Campus multi-unit access, capital-core elevators, and I-96/I-69 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'MSU multi-unit & curb friction', detail: 'Academic peaks spike labor hours.' },
      { title: 'Downtown elevator & staging limits', detail: 'Capitol-adjacent labor hours spike.' },
      { title: 'I-96 / I-69 / US-127 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs on east suburbs', detail: 'Gate lists push demand into peak windows.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,500+', note: 'Higher near campus elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,350–$3,900+', note: 'Campus/core friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,400–$7,000+', note: 'Long I-96/I-69 pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'MSU calendars, capital session timing, family peaks, and winter ice reshape Lansing-area windows.',
    seasonal: [
      { title: 'Best windows: mid-week outside academic peaks', detail: 'Clear curb near MSU and downtown.' },
      { title: 'Academic peaks: August and May', detail: 'Book East Lansing multi-unit far ahead.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Winter ice and snow', detail: 'Confirm contingency for driveway access.' },
    ],
    specialized: {
      id: 'lansing-capital-msu-ingham',
      title: 'Lansing capital & MSU adjacency module',
      intro:
        'Ingham estimates fail when MSU lease waves, capitol-core elevators, or I-96/I-69 empty miles are ignored.',
      bullets: [
        'Align East Lansing multi-unit moves with MSU calendars when possible.',
        'Request downtown Lansing building packets early.',
        'Price I-96/I-69/US-127 pairs portal-to-portal.',
        'Do not treat Ingham as Ann Arbor or Detroit product by default.',
        'Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Lansing, East Lansing, Okemos, Haslett, Holt, Mason, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Michigan Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Sparrow/University of Michigan Health-Sparrow, McLaren Greater Lansing, and other systems serve capital corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from Okemos and Mason into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Campus multi-unit vs east-suburb HOA stock',
        detail: 'East Lansing product differs sharply from Okemos/Haslett two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'Near-campus renovated stock often prices differently from south township SFH.',
      },
    ],
    townFit: [
      { title: 'Downtown Lansing capital lifestyle', detail: 'Government adjacency with elevator tradeoffs.' },
      { title: 'East Lansing / MSU pattern', detail: 'Student multi-unit density and academic calendars.' },
      { title: 'Okemos / Haslett pattern', detail: 'HOA product with longer portal time to core jobs.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'State government, MSU, healthcare, insurance, and professional services shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-96, I-69, and US-127 peaks are real. Test drive peak routes before choosing a submarket.',
      },
    ],
    lifestyle: [
      {
        title: 'Capital + campus identity',
        detail:
          'Ingham is Lansing metro — not Detroit SE Michigan collars or Ann Arbor research-corridor defaults alone.',
      },
      {
        title: 'Climate',
        detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Ingham County — official site', href: 'https://www.ingham.org/' },
      { label: 'City of Lansing', href: 'https://www.lansingmi.gov/' },
      { label: 'MiDrive traffic (MDOT)', href: 'https://mdotjboss.state.mi.us/MiDrive/' },
    ],
    directoryHint:
      'Prefer MSU multi-unit and downtown elevator experience with honest I-96/I-69 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.',
  },
  {
    slug: 'kalamazoo',
    exportName: 'kalamazooCountyMiIntelligence',
    countyName: 'Kalamazoo',
    hubTitle: 'Kalamazoo County Moving Intelligence Hub',
    eyebrow: 'Kalamazoo · southwest MI regional hub, university influence & I-94/US-131',
    h1: 'Moving in Kalamazoo County: Southwest Michigan Access, University Influence & I-94/US-131 Logistics',
    heroOpener:
      'Kalamazoo County is a southwest Michigan regional hub: downtown and Vine neighborhood older stock, Western Michigan University multi-unit waves, Portage suburban product, and I-94/US-131 portal time that is not Grand Rapids core logistics and not Detroit SE Michigan. A downtown Kalamazoo condo, a student multi-unit turn, and a Portage HOA two-story do not share truck access or empty-mile risk. This hub is for Kalamazoo — not a renamed Kent or Wayne page.',
    majorCorridors: 'I-94 · US-131 · M-43 · Stadium Drive corridors',
    whatIntro:
      'These are Kalamazoo regional realities — university cycles, pharma/manufacturing adjacency, and I-94/US-131 logistics — not SE Michigan collars.',
    bullets: [
      {
        title: 'WMU and campus-adjacent multi-unit waves cluster demand',
        detail: 'Academic turns fill elevators and street parking first.',
      },
      {
        title: 'Downtown / Vine older stock mixes stairs and tight streets',
        detail: 'Access photos beat verbal promises on near-core blocks.',
      },
      {
        title: 'Portage suburban product is not downtown product',
        detail: 'HOA packets and longer empty miles rewrite quotes.',
      },
      {
        title: 'I-94 / US-131 define portal-to-portal time',
        detail: 'Pairs toward Chicago, GR, or Detroit look regional at peak.',
      },
      {
        title: 'Southwest MI regional identity — not Detroit spillover',
        detail: 'Treat Kalamazoo as its own hub with distinct inventory patterns.',
      },
      MI_REG,
    ],
    zonesHeading: 'Kalamazoo access zones',
    zonesIntro:
      'Plan by downtown/Vine, WMU multi-family, Portage suburbs, and north/east township edges.',
    zones: [
      {
        id: 'kzoo-downtown',
        name: 'Downtown Kalamazoo & Vine neighborhood',
        shortName: 'Downtown / Vine',
        neighborhoods: ['Downtown Kalamazoo', 'Vine', 'Stuart edges', 'near-core multi-unit'],
        housingTypes: 'Multi-unit, older SFH, renovated stock, mid-rises',
        challenges: ['Stairs and tight streets', 'Scarce curb staging', 'Event-day congestion'],
        moverTips: 'Survey stair width and curb. Prefer mid-week mornings.',
        cityKeywords: ['kalamazoo', 'vine', 'downtown'],
      },
      {
        id: 'wmu-campus',
        name: 'WMU campus multi-family belt',
        shortName: 'WMU / campus',
        neighborhoods: ['WMU campus edges', 'West Main multi-family', 'student housing belts'],
        housingTypes: 'Student multi-family, mid-rises, older SFH',
        challenges: ['Lease-end waves', 'Elevators and stairs', 'Stadium Drive congestion'],
        moverTips: 'Book academic peaks early. Confirm elevator reservations.',
        cityKeywords: ['wmu', 'western michigan', 'stadium drive'],
      },
      {
        id: 'portage',
        name: 'Portage suburban belt',
        shortName: 'Portage',
        neighborhoods: ['Portage', 'south Kalamazoo edges', 'Oakland Dr corridors'],
        housingTypes: 'HOA SFH, multi-family, townhomes',
        challenges: ['HOA rules', 'I-94 / US-131 timing', 'Longer portal time to core'],
        moverTips: 'Collect HOA packets. Price Portage pairs portal-to-portal.',
        cityKeywords: ['portage'],
      },
      {
        id: 'kzoo-edges',
        name: 'Oshtemo, Comstock & outer edges',
        shortName: 'Outer Kalamazoo',
        neighborhoods: ['Oshtemo Twp', 'Comstock Twp', 'Texas Twp edges', 'Parchment edges'],
        housingTypes: 'SFH, multi-family, growth suburbs',
        challenges: ['Longer empty miles', 'M-43 timing', 'Winter access'],
        moverTips: 'Price outer-township pairs honestly. Photo driveway access.',
        cityKeywords: ['oshtemo', 'comstock', 'parchment'],
      },
    ],
    costIntro:
      'Campus multi-unit access and I-94/US-131 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Campus multi-unit & curb friction', detail: 'Academic peaks spike labor hours.' },
      { title: 'Downtown stairs & tight streets', detail: 'Near-core labor hours spike.' },
      { title: 'I-94 / US-131 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs in Portage', detail: 'Gate lists push demand into peak windows.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$420–$1,400+', note: 'Higher near campus elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,300–$3,700+', note: 'Campus/core friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,300–$6,800+', note: 'I-94 long pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'University calendars, family peaks, and winter ice reshape southwest Michigan windows.',
    seasonal: [
      { title: 'Best windows: mid-week outside academic peaks', detail: 'Clear curb near WMU and downtown.' },
      { title: 'Academic peaks: August and May', detail: 'Book multi-unit far ahead.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book Portage Saturdays early.' },
      { title: 'Winter ice and snow', detail: 'Confirm contingency for driveway access.' },
    ],
    specialized: {
      id: 'kalamazoo-sw-mi-university-regional',
      title: 'Kalamazoo southwest MI & university influence module',
      intro:
        'Kalamazoo estimates fail when WMU lease waves, downtown stairs, or I-94/US-131 empty miles are ignored.',
      bullets: [
        'Align multi-unit moves with WMU calendars when possible.',
        'Survey Vine/downtown stair width and curb before final quotes.',
        'Price I-94/US-131 pairs portal-to-portal toward Chicago, GR, or Detroit.',
        'Treat Portage HOA product as distinct from downtown stock.',
        'Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Kalamazoo Public Schools, Portage, Comstock, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Michigan Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Bronson Methodist, Ascension Borgess, and other systems serve southwest Michigan corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from Portage and Oshtemo into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'Downtown/Vine multi-unit vs Portage HOA stock',
        detail: 'Near-core product differs sharply from south suburban two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'Campus-adjacent renovated stock often prices differently from outer-township SFH.',
      },
    ],
    townFit: [
      { title: 'Downtown / Vine lifestyle', detail: 'Walkable amenities with stair and curb tradeoffs.' },
      { title: 'WMU multi-unit pattern', detail: 'Student density and academic calendars.' },
      { title: 'Portage suburban pattern', detail: 'HOA product with I-94/US-131 logistics.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Healthcare, higher education, manufacturing/pharma adjacency, and logistics shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-94 and US-131 peaks are real for Chicago and GR-bound workers.',
      },
    ],
    lifestyle: [
      {
        title: 'Southwest MI regional identity',
        detail:
          'Kalamazoo is its own hub — not Grand Rapids downtown defaults or Detroit SE Michigan collars.',
      },
      {
        title: 'Climate',
        detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Kalamazoo County — official site', href: 'https://www.kalcounty.com/' },
      { label: 'City of Kalamazoo', href: 'https://www.kalamazoocity.org/' },
      { label: 'MiDrive traffic (MDOT)', href: 'https://mdotjboss.state.mi.us/MiDrive/' },
    ],
    directoryHint:
      'Prefer campus multi-unit and downtown stair experience with honest I-94/US-131 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.',
  },
  {
    slug: 'saginaw',
    exportName: 'saginawCountyMiIntelligence',
    countyName: 'Saginaw',
    hubTitle: 'Saginaw County Moving Intelligence Hub',
    eyebrow: 'Saginaw · Great Lakes bay regional hub & I-75/I-675 logistics',
    h1: 'Moving in Saginaw County: Bay Region Access, Great Lakes Hub Patterns & I-75/I-675 Logistics',
    heroOpener:
      'Saginaw County is a Great Lakes bay regional hub: Saginaw city older stock and multi-unit, township growth edges, bay-region logistics, and I-75/I-675/M-46 portal time that is not Detroit SE Michigan and not Flint recovery defaults alone. A Saginaw multi-family unit, a Thomas Township two-story, and a Freeland-edge home do not share truck access or empty-mile risk. This hub is for Saginaw — not a renamed Genesee or Wayne page.',
    majorCorridors: 'I-75 · I-675 · M-46 · M-13 corridors',
    whatIntro:
      'These are Saginaw bay regional realities — older stock, I-75/I-675 logistics, and township growth — not Detroit collar product.',
    bullets: [
      {
        title: 'Saginaw city older stock and multi-unit access dominate many jobs',
        detail: 'Stairs, basements, and curb limits rewrite labor hours.',
      },
      {
        title: 'Township growth edges are not Detroit north-metro HOA defaults',
        detail: 'Regional pricing and empty miles differ from SE Michigan collars.',
      },
      {
        title: 'I-75 / I-675 / M-46 define portal-to-portal time',
        detail: 'Pairs toward Flint, Bay City, or Detroit look regional at peak.',
      },
      {
        title: 'Bay-region manufacturing and healthcare relo calendars matter',
        detail: 'Hard dates appear on regional employer transfers.',
      },
      {
        title: 'Not a Flint clone and not Detroit spillover',
        detail: 'Saginaw is its own bay-region hub with distinct inventory patterns.',
      },
      MI_REG,
    ],
    zonesHeading: 'Saginaw access zones',
    zonesIntro:
      'Plan by Saginaw city core, south/west townships, Freeland/north edges, and east corridors toward Bay City.',
    zones: [
      {
        id: 'saginaw-core',
        name: 'Saginaw city core & near-city multi-unit',
        shortName: 'Saginaw core',
        neighborhoods: ['Downtown Saginaw', 'East/West side edges', 'near-core multi-unit', 'Old Town edges'],
        housingTypes: 'Older multi-unit, SFH, renovated stock',
        challenges: ['Stairs and basements', 'Curb staging', 'I-675 timing'],
        moverTips: 'Survey stair width and curb carefully. Prefer mid-week mornings.',
        cityKeywords: ['saginaw', 'downtown saginaw'],
      },
      {
        id: 'saginaw-twp-south',
        name: 'Saginaw Township & southern growth edges',
        shortName: 'Saginaw Twp / south',
        neighborhoods: ['Saginaw Charter Twp', 'Kochville edges', 'Tittabawassee edges', 'Hemlock edges'],
        housingTypes: 'SFH, multi-family, HOA pockets',
        challenges: ['M-46 congestion', 'HOA rules', 'Longer portal time to core'],
        moverTips: 'Collect HOA packets. Price township pairs portal-to-portal.',
        cityKeywords: ['saginaw township', 'hemlock'],
      },
      {
        id: 'freeland-north',
        name: 'Freeland, Carrollton & northern edges',
        shortName: 'Freeland / north',
        neighborhoods: ['Freeland', 'Carrollton', 'Zilwaukee edges', 'northern rural roads'],
        housingTypes: 'SFH, multi-family, small-town stock',
        challenges: ['I-75 timing', 'Longer empty miles', 'Winter access'],
        moverTips: 'Price northern pairs honestly. Photo driveway and street width.',
        cityKeywords: ['freeland', 'carrollton'],
      },
      {
        id: 'saginaw-east-bay',
        name: 'Bridgeport, Buena Vista & east bay approaches',
        shortName: 'East / bay approach',
        neighborhoods: ['Bridgeport', 'Buena Vista', 'Spalding edges', 'bay-region approaches'],
        housingTypes: 'SFH, multi-family, industrial-adjacent stock',
        challenges: ['I-75 / M-13 timing', 'Industrial traffic', 'Winter ice'],
        moverTips: 'Clarify bay-region destinations early. Survey industrial-adjacent access.',
        cityKeywords: ['bridgeport', 'buena vista'],
      },
    ],
    costIntro:
      'Older-stock access and I-75/I-675 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Older multi-unit & stair friction', detail: 'City-core labor hours spike.' },
      { title: 'I-75 / I-675 / M-46 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Township HOA soft costs', detail: 'Packets push demand into peak windows.' },
      { title: 'Winter ice contingency', detail: 'Bay-region snow can slip schedules.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$380–$1,300+', note: 'Higher with stairs or long carries' },
      { label: '2–3BR condo or modest SFH', value: '$1,200–$3,400+', note: 'Older stock friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,100–$6,200+', note: 'I-75 long pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$95–$165+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro:
      'Regional family peaks, multi-family turns, and bay-region winter ice reshape Saginaw windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-75/M-46 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book township Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Near-core elevators and stairs fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm contingency for driveway access.' },
    ],
    specialized: {
      id: 'saginaw-bay-region-hub',
      title: 'Saginaw Great Lakes bay regional hub module',
      intro:
        'Saginaw estimates fail when older-stock access or I-75/I-675 empty miles are treated like Detroit collar defaults.',
      bullets: [
        'Survey Saginaw core stairs, basements, and curb before final quotes.',
        'Price I-75/I-675/M-46 pairs portal-to-portal toward Flint, Bay City, or Detroit.',
        'Treat township growth product as regional — not Oakland HOA clones.',
        'Clarify Saginaw vs Genesee destinations on multi-county estimates.',
        'Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      {
        title: 'How districts work here',
        detail:
          'Saginaw Public Schools, Saginaw Township Community, Freeland, Bridgeport-Spaulding, and other districts serve different addresses. Confirm zoning carefully.',
      },
      {
        title: 'Research sources',
        detail: 'District tools and Michigan Department of Education data beat ranking screenshots.',
      },
    ],
    hospitals: [
      {
        title: 'Major systems',
        detail:
          'Covenant HealthCare, MyMichigan/Ascension sites, and other systems serve bay-region corridors. Confirm networks.',
      },
      {
        title: 'What relocators should do',
        detail: 'Map peak-hour drive times from township edges into major campuses. Transfer records early.',
      },
    ],
    housing: [
      {
        title: 'City multi-unit vs township SFH stock',
        detail: 'Saginaw core product differs from Saginaw Township and Freeland two-stories.',
      },
      {
        title: 'Cost variation',
        detail: 'Near-core renovated stock often prices differently from outer-township SFH.',
      },
    ],
    townFit: [
      { title: 'Saginaw core pattern', detail: 'Older multi-unit and SFH with curb/stair tradeoffs.' },
      { title: 'Township growth pattern', detail: 'SFH/multi-family with M-46 logistics.' },
      { title: 'North/east bay-approach pattern', detail: 'Longer empty miles and industrial adjacency.' },
    ],
    jobs: [
      {
        title: 'Employment anchors',
        detail:
          'Healthcare, manufacturing/suppliers, education, and bay-region services shape employment.',
      },
      {
        title: 'Commute realism',
        detail: 'I-75 and I-675 peaks are real for Flint and Detroit-bound workers.',
      },
    ],
    lifestyle: [
      {
        title: 'Bay-region identity',
        detail:
          'Saginaw is a Great Lakes bay hub — not Detroit spillover suburbs or pure Flint recovery defaults.',
      },
      {
        title: 'Climate',
        detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.',
      },
    ],
    resourceItems: [
      { label: 'Saginaw County — official site', href: 'https://www.saginawcounty.com/' },
      { label: 'City of Saginaw', href: 'https://www.saginaw-mi.com/' },
      { label: 'MiDrive traffic (MDOT)', href: 'https://mdotjboss.state.mi.us/MiDrive/' },
    ],
    directoryHint:
      'Prefer older-stock access surveys and honest I-75/I-675 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.',
  },
];

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function renderPack(spec: PackSpec): string {
  const zones = spec.zones
    .map(
      (z) => `    {
      id: "${z.id}",
      name: "${esc(z.name)}",
      shortName: "${esc(z.shortName)}",
      neighborhoods: ${JSON.stringify(z.neighborhoods)},
      housingTypes: "${esc(z.housingTypes)}",
      challenges: ${JSON.stringify(z.challenges)},
      moverTips: "${esc(z.moverTips)}",
      cityKeywords: ${JSON.stringify(z.cityKeywords)},
    }`
    )
    .join(',\n');

  const bullets = spec.bullets
    .map(
      (b) => `      {
        title: "${esc(b.title)}",
        detail: "${esc(b.detail)}",
      }`
    )
    .join(',\n');

  const drivers = spec.drivers
    .map((d) => `      { title: "${esc(d.title)}", detail: "${esc(d.detail)}" }`)
    .join(',\n');

  const ranges = spec.ranges
    .map(
      (r) =>
        `      { label: "${esc(r.label)}", value: "${esc(r.value)}", note: "${esc(r.note)}" }`
    )
    .join(',\n');

  const seasonal = spec.seasonal
    .map((s) => `      { title: "${esc(s.title)}", detail: "${esc(s.detail)}" }`)
    .join(',\n');

  const specBullets = spec.specialized.bullets.map((b) => `"${esc(b)}"`).join(',');

  const schools = spec.schools
    .map((b) => `          { title: "${esc(b.title)}", detail: "${esc(b.detail)}" }`)
    .join(',\n');
  const hospitals = spec.hospitals
    .map((b) => `          { title: "${esc(b.title)}", detail: "${esc(b.detail)}" }`)
    .join(',\n');
  const housing = spec.housing
    .map((b) => `          { title: "${esc(b.title)}", detail: "${esc(b.detail)}" }`)
    .join(',\n');
  const townFit = spec.townFit
    .map((b) => `          { title: "${esc(b.title)}", detail: "${esc(b.detail)}" }`)
    .join(',\n');
  const jobs = spec.jobs
    .map((b) => `          { title: "${esc(b.title)}", detail: "${esc(b.detail)}" }`)
    .join(',\n');
  const lifestyle = spec.lifestyle
    .map((b) => `          { title: "${esc(b.title)}", detail: "${esc(b.detail)}" }`)
    .join(',\n');

  const resources = spec.resourceItems
    .map(
      (r) =>
        `      { label: "${esc(r.label)}", href: "${esc(r.href)}", external: true }`
    )
    .join(',\n');

  return `import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const ${spec.exportName}: CountyIntelligencePack = finalizeMiPack({
  countySlug: "${spec.slug}",
  hubTitle: "${esc(spec.hubTitle)}",
  eyebrow: "${esc(spec.eyebrow)}",
  h1: "${esc(spec.h1)}",
  heroOpener: "${esc(spec.heroOpener)}",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "${esc(spec.majorCorridors)}",
  whatMakesDifferent: {
    title: "What makes moving in ${esc(spec.countyName)} County different",
    intro: "${esc(spec.whatIntro)}",
    bullets: [
${bullets},
    ],
  },
  zonesHeading: "${esc(spec.zonesHeading)}",
  zonesIntro: "${esc(spec.zonesIntro)}",
  zones: [
${zones}
  ],
  costDrivers: {
    title: "What drives ${esc(spec.countyName)} County moving costs",
    intro: "${esc(spec.costIntro)}",
    drivers: [
${drivers}
    ],
    ranges: [
${ranges}
    ],
  },
  seasonal: {
    title: "When to schedule a move in ${esc(spec.countyName)} County",
    intro: "${esc(spec.seasonalIntro)}",
    items: [
${seasonal}
    ],
  },
  specialized: [
    {
      id: "${esc(spec.specialized.id)}",
      title: "${esc(spec.specialized.title)}",
      intro: "${esc(spec.specialized.intro)}",
      bullets: [${specBullets}],
    },
  ],
  relocation: {
    title: "Considering a move to ${esc(spec.countyName)} County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
${schools}
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
${hospitals}
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
${housing}
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
${townFit}
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
${jobs}
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
${lifestyle}
        ],
      },
    ],
  },
  resources: {
    title: "Useful ${esc(spec.countyName)} County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
${resources}
    ],
  },
  directoryHint: "${esc(spec.directoryHint)}",
  lastReviewed: '2026-07-24',
});
`;
}

const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/michigan');
mkdirSync(outDir, { recursive: true });

for (const spec of specs) {
  const path = join(outDir, `${spec.slug}-mi.ts`);
  writeFileSync(path, renderPack(spec), 'utf8');
  console.log('wrote', path);
}

console.log(`Generated ${specs.length} Michigan Tier-1 packs.`);
