/**
 * One-shot generator for Indiana Core 8 Tier-1 intelligence packs.
 * Run: npx tsx scripts/generate-in-tier1-packs.ts
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

type Spec = {
  slug: string;
  exportName: string;
  display: string;
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
  specialized: { id: string; title: string; intro: string; bullets: string[] };
  schools: { title: string; detail: string }[];
  hospitals: { title: string; detail: string }[];
  housing: { title: string; detail: string }[];
  townFit: { title: string; detail: string }[];
  jobs: { title: string; detail: string }[];
  lifestyle: { title: string; detail: string }[];
  resourceItems: { label: string; href: string }[];
  directoryHint: string;
};

const REG = {
  title: 'Intrastate Indiana DOR HHG authority vs interstate FMCSA',
  detail:
    'Moves entirely within Indiana by for-hire household goods carriers generally require a Certificate of Public Convenience and Necessity (Indiana Operating Authority) from the Indiana Department of Revenue Motor Carrier Services under IC 8-2.1-22. Match the legal name on the estimate to Indiana authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.',
};

const specs: Spec[] = [
  {
    slug: 'marion',
    exportName: 'marionCountyInIntelligence',
    display: 'Marion County',
    hubTitle: 'Marion County Moving Intelligence Hub',
    eyebrow: 'Marion · Indianapolis neighborhoods, midtown elevators & I-465 ring',
    h1: 'Moving in Marion County: Indianapolis Neighborhoods, Midtown Access & I-465 Logistics',
    heroOpener:
      'Marion County is Indianapolis metro core — not Carmel north-suburb product: downtown and midtown elevators, Mass Ave and Fountain Square multi-unit, west-side and Speedway stock, airport-corridor logistics, and I-65/I-70/I-465 portal time that is not Hamilton HOA growth and not NW Indiana Chicago collar. A downtown condo, a Broad Ripple multi-family unit, and a west-side two-story do not share truck access or empty-mile risk. This hub is for Marion (Indianapolis) — not a Hamilton clone or renamed Ohio Marion page.',
    majorCorridors: 'I-65 · I-70 · I-465 · I-74 · US-31 · local arterial grid',
    whatIntro:
      'These are Indianapolis core realities — neighborhood micro-markets, elevators, and beltway timing — not Carmel HOA defaults or Fort Wayne regional product.',
    bullets: [
      { title: 'Downtown and midtown elevators rewrite labor hours', detail: 'Building packets and freight windows dominate core jobs.' },
      { title: 'Neighborhood micro-markets are not interchangeable', detail: 'Fountain Square, Broad Ripple, Meridian-Kessler, and west-side stock change curb and access rules.' },
      { title: 'I-465 / I-65 / I-70 define portal-to-portal time', detail: 'Cross-metro pairs look local on maps and regional at peak.' },
      { title: 'Airport corridor and west-side logistics differ from midtown product', detail: 'Industrial adjacency and multi-family waves reshape timing.' },
      { title: 'Not Hamilton north-suburb HOA product as the default', detail: 'Survey each Marion address — city density is not Carmel/Fishers growth.' },
      REG,
    ],
    zonesHeading: 'Marion access zones',
    zonesIntro: 'Plan by downtown/midtown, northside neighborhoods, west-side/Speedway, and south/east I-465 edges.',
    zones: [
      { id: 'downtown-midtown', name: 'Downtown, Mass Ave & midtown elevators', shortName: 'Downtown / midtown', neighborhoods: ['Downtown Indianapolis', 'Mass Ave', 'Lockerbie edges', 'Fountain Square edges'], housingTypes: 'High-rises, mid-rises, renovated multi-unit', challenges: ['Elevators and COI', 'Scarce curb staging', 'Event-day congestion'], moverTips: 'Get building packets early. Prefer mid-week morning freight windows.', cityKeywords: ['indianapolis', 'downtown', 'mass ave', 'fountain square'] },
      { id: 'northside', name: 'Broad Ripple, Meridian-Kessler & northside multi-unit', shortName: 'Northside', neighborhoods: ['Broad Ripple', 'Meridian-Kessler', 'Butler-Tarkington edges', 'Nora edges'], housingTypes: 'Multi-family, older SFH, mid-rises', challenges: ['Curb parking limits', 'Stairs and basements', 'Keystone / College congestion'], moverTips: 'Survey stair width carefully. Confirm parking rules block by block.', cityKeywords: ['broad ripple', 'meridian-kessler', 'nora'] },
      { id: 'west-speedway', name: 'West side, Speedway & airport corridor', shortName: 'West / Speedway', neighborhoods: ['Speedway', 'Wayne Twp edges', 'airport corridors', 'Haughville edges'], housingTypes: 'SFH, multi-family, industrial-adjacent stock', challenges: ['I-465 / I-70 congestion', 'Event calendars near Speedway', 'Mixed access types'], moverTips: 'Avoid major race-event peaks when flexible. Price airport pairs portal-to-portal.', cityKeywords: ['speedway', 'west indianapolis'] },
      { id: 'south-east-ring', name: 'South and east I-465 suburban edges', shortName: 'South/east ring', neighborhoods: ['Southport edges', 'Beech Grove edges', 'Lawrence edges', 'Warren Twp edges'], housingTypes: 'SFH, multi-family, HOA pockets', challenges: ['I-465 congestion', 'HOA rules', 'Longer portal time to core'], moverTips: 'Collect HOA packets. Price ring pairs portal-to-portal.', cityKeywords: ['beech grove', 'lawrence', 'southport'] },
    ],
    costIntro: 'Elevator friction, neighborhood access, and I-465 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Downtown elevator & curb friction', detail: 'Core labor hours spike.' },
      { title: 'I-465 / I-65 / I-70 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Neighborhood stairs & long carries', detail: 'Older multi-unit raises labor hours.' },
      { title: 'Event-day premiums near Speedway/downtown', detail: 'Calendars compress flexible windows.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,500+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,350–$3,900+', note: 'Core friction trends up' },
      { label: '3–4+ BR / tower / cross-metro', value: '$2,500–$7,800+', note: 'Towers and long ring pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Summer family peaks, multi-family lease turns, race weekends, and winter ice reshape Indy windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-465 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Downtown elevators fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'indianapolis-marion-neighborhoods-i465',
      title: 'Indianapolis neighborhoods & I-465 module',
      intro: 'Marion estimates fail when building packets, neighborhood curb rules, or I-465 empty miles are ignored.',
      bullets: [
        'Request downtown/midtown building packets early.',
        'Photo curb and stair access for neighborhood multi-unit jobs.',
        'Price I-465/I-65/I-70 pairs portal-to-portal.',
        'Clarify Marion vs Hamilton destinations on multi-county estimates.',
        'Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      { title: 'How districts work here', detail: 'Indianapolis Public Schools and township/district systems serve different addresses. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'District tools and Indiana Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'IU Health, Ascension St. Vincent, Community Health Network, and other systems serve county corridors. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from ring edges into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Core condo/multi-unit vs ring SFH stock', detail: 'Downtown product differs sharply from south/east I-465 two-stories.' },
      { title: 'Cost variation', detail: 'Near-core renovated stock often prices differently from outer multi-family.' },
    ],
    townFit: [
      { title: 'Downtown / midtown lifestyle', detail: 'Walkable amenities with elevator and curb tradeoffs.' },
      { title: 'Northside neighborhood pattern', detail: 'Multi-unit density with arterial logistics.' },
      { title: 'Ring suburban pattern', detail: 'SFH/HOA product with longer portal time to core jobs.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Healthcare, logistics, government, education, and professional services shape employment.' },
      { title: 'Commute realism', detail: 'I-465 peaks are real. Test drive peak routes around the ring.' },
    ],
    lifestyle: [
      { title: 'Indianapolis core identity', detail: 'Marion is Indy metro core — not Carmel north-suburb product or NW Indiana Chicago collar as the default.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourceItems: [
      { label: 'Marion County — official site', href: 'https://www.indy.gov/' },
      { label: 'INDOT traffic', href: 'https://www.in.gov/indot/' },
    ],
    directoryHint: 'Prefer downtown elevator and neighborhood access experience with honest I-465 pricing. Verify Indiana DOR HHG authority in-state and FMCSA interstate.',
  },
  {
    slug: 'hamilton',
    exportName: 'hamiltonCountyInIntelligence',
    display: 'Hamilton County',
    hubTitle: 'Hamilton County Moving Intelligence Hub',
    eyebrow: 'Hamilton · Carmel/Fishers/Noblesville north-metro growth & I-69/US-31',
    h1: 'Moving in Hamilton County: Carmel–Fishers Growth, North-Metro HOAs & I-69/US-31 Logistics',
    heroOpener:
      'Hamilton County is Indianapolis north-suburb growth — not Marion city core: Carmel and Fishers HOA product, Noblesville multi-family, corporate relo calendars, and I-69/US-31/146th Street portal time that is not downtown elevator logistics and not Fort Wayne regional product. A Carmel two-story, a Fishers multi-unit, and a Noblesville HOA ranch do not share truck access or empty-mile risk. This hub is for Indiana’s Hamilton County — not Ohio Hamilton/Cincinnati and not an Indy downtown clone.',
    majorCorridors: 'I-69 · US-31 · US-37 · 146th Street corridors',
    whatIntro:
      'These are Carmel/Fishers north-metro realities — HOA packets, corporate hard dates, and US-31 timing — not Marion midtown elevators as the default.',
    bullets: [
      { title: 'Carmel / Fishers HOA rules rewrite access plans', detail: 'Gate lists and driveway rules dominate many jobs.' },
      { title: 'Corporate relo calendars create hard report dates', detail: 'North-metro campuses compress windows more than pure city lease waves.' },
      { title: 'I-69 / US-31 / 146th Street define portal-to-portal time', detail: 'Pairs toward Marion look short on maps and regional at peak.' },
      { title: 'Not Marion downtown elevator product as the default', detail: 'Survey each Hamilton address — growth suburbs differ from city density.' },
      { title: 'Do not confuse with Ohio Hamilton County', detail: 'This is Indiana Hamilton (Carmel/Fishers) — not Cincinnati river-city logistics.' },
      REG,
    ],
    zonesHeading: 'Hamilton access zones',
    zonesIntro: 'Plan by Carmel core, Fishers growth, Noblesville, and west/north township edges.',
    zones: [
      { id: 'carmel', name: 'Carmel core & multi-family belt', shortName: 'Carmel', neighborhoods: ['Carmel', 'Clay Twp edges', 'Keystone corridors', 'City Center edges'], housingTypes: 'HOA SFH, multi-family, townhomes, mid-rises', challenges: ['HOA rules', 'US-31 congestion', 'Elevator reservations'], moverTips: 'Collect HOA packets early. Book elevators for month-end.', cityKeywords: ['carmel'] },
      { id: 'fishers', name: 'Fishers growth suburbs', shortName: 'Fishers', neighborhoods: ['Fishers', 'Geist edges', '146th Street corridors', 'I-69 corridors'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['I-69 congestion', 'HOA gate lists', 'Longer portal time to Indy core'], moverTips: 'Price I-69 pairs portal-to-portal. Collect HOA rules.', cityKeywords: ['fishers', 'geist'] },
      { id: 'noblesville', name: 'Noblesville & north-central stock', shortName: 'Noblesville', neighborhoods: ['Noblesville', 'downtown Noblesville edges', 'SR-37 corridors'], housingTypes: 'SFH, multi-family, mixed stock', challenges: ['SR-37 congestion', 'Mixed stairs and elevators', 'Growth empty miles'], moverTips: 'Clarify Noblesville vs Carmel destinations. Survey multi-unit access type.', cityKeywords: ['noblesville'] },
      { id: 'west-north', name: 'Westfield, Cicero edges & west/north growth', shortName: 'Westfield / north', neighborhoods: ['Westfield', 'Cicero edges', 'Sheridan edges', 'US-31 north'], housingTypes: 'HOA SFH, multi-family, growth suburbs', challenges: ['Longer empty miles', 'HOA rules', 'US-31 timing'], moverTips: 'Price west/north pairs honestly. Collect HOA packets.', cityKeywords: ['westfield', 'cicero'] },
    ],
    costIntro: 'HOA friction and I-69/US-31 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'HOA gate lists & soft costs', detail: 'Packets push demand into peak windows.' },
      { title: 'I-69 / US-31 / 146th congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Corporate hard-date premiums', detail: 'Short windows raise weekend demand.' },
      { title: 'Multi-unit elevator friction', detail: 'Carmel/Fishers labor hours spike.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$480–$1,550+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,450–$4,200+', note: 'HOA friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,700–$8,500+', note: 'Long I-69 pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$110–$185+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Corporate calendars, school-year suburb demand, summer peak, and winter ice reshape north-metro windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce US-31/I-69 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book HOA Saturdays early.' },
      { title: 'Corporate Q-end transfers', detail: 'Hard dates cluster around fiscal calendars.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'hamilton-in-carmel-fishers-hoa',
      title: 'Carmel/Fishers north-metro HOA module',
      intro: 'Hamilton (IN) estimates fail when HOA packets or I-69 empty miles are treated like downtown Indianapolis jobs.',
      bullets: [
        'Collect Carmel/Fishers HOA packets before final quotes.',
        'Price I-69/US-31 pairs portal-to-portal toward Marion.',
        'Separate corporate inventory scopes from standard suburban SFH.',
        'Clarify Indiana Hamilton vs Marion destinations — never assume Ohio Hamilton logistics.',
        'Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      { title: 'How districts work here', detail: 'Carmel Clay, Hamilton Southeastern, Noblesville, Westfield Washington, and other districts serve different addresses. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'District tools and Indiana Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Riverview Health, IU Health North, Ascension, and Indy systems (via commute) serve north-metro corridors. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from Fishers and Westfield into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'HOA growth SFH vs multi-family belts', detail: 'Carmel product differs from Noblesville mixed stock.' },
      { title: 'Cost variation', detail: 'North-metro premium suburbs often price differently from far-north multi-family.' },
    ],
    townFit: [
      { title: 'Carmel lifestyle', detail: 'Walkable amenities with HOA and multi-unit tradeoffs.' },
      { title: 'Fishers growth pattern', detail: 'HOA product with I-69 logistics.' },
      { title: 'Noblesville pattern', detail: 'Mixed stock with SR-37 timing.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Corporate campuses, healthcare, professional services, and Indy-commute jobs shape employment.' },
      { title: 'Commute realism', detail: 'I-69 and US-31 peaks are real for downtown Indy-bound workers.' },
    ],
    lifestyle: [
      { title: 'North-metro identity', detail: 'Indiana Hamilton is Carmel/Fishers growth — not Marion city core or Ohio Cincinnati Hamilton as the default.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourceItems: [
      { label: 'Hamilton County, IN — official site', href: 'https://www.hamiltoncounty.in.gov/' },
      { label: 'INDOT traffic', href: 'https://www.in.gov/indot/' },
    ],
    directoryHint: 'Prefer HOA/north-metro experience and honest I-69 pricing. This is Indiana Hamilton — not OH. Verify Indiana DOR HHG authority in-state and FMCSA interstate.',
  },
  {
    slug: 'lake',
    exportName: 'lakeCountyInIntelligence',
    display: 'Lake County',
    hubTitle: 'Lake County Moving Intelligence Hub',
    eyebrow: 'Lake · Gary/Hammond/Merrillville Chicago collar & I-80/94',
    h1: 'Moving in Lake County: NW Indiana Chicago Collar, Industrial-Suburban Mix & I-80/94 Logistics',
    heroOpener:
      'Lake County is northwest Indiana Chicago collar — not Indianapolis spillover: Hammond and Munster multi-unit, Merrillville HOA product, Gary industrial-adjacent stock, and I-80/94/I-65 portal time that is not Marion/I-465 logistics and not Fort Wayne regional product. A Munster two-story, a Merrillville multi-family unit, and a Hammond condo do not share truck access or empty-mile risk. This hub is for Indiana Lake County — not Illinois Lake County and not an Indy clone.',
    majorCorridors: 'I-80/94 · I-65 · US-30 · US-41 · local arterial grid',
    whatIntro:
      'These are Chicago-collar NW Indiana realities — industrial traffic, IL-border logistics, and I-80/94 timing — not Indianapolis beltway product.',
    bullets: [
      { title: 'Chicago commute patterns rewrite empty-mile math', detail: 'IL destinations often need FMCSA — clarify origin/destination early.' },
      { title: 'Industrial and multi-family mix is not Carmel HOA product', detail: 'Shift-change windows and older stock reshape crew timing.' },
      { title: 'I-80/94 / I-65 define portal-to-portal time', detail: 'Cross-border and regional pairs look short on maps and regional at peak.' },
      { title: 'Merrillville / Crown Point suburban product differs from lakefront edges', detail: 'HOA packets and longer empty miles rewrite quotes.' },
      { title: 'Not Indianapolis and not Illinois Lake County as the page identity', detail: 'This is NW Indiana — survey each address on its own terms.' },
      REG,
    ],
    zonesHeading: 'Lake access zones',
    zonesIntro: 'Plan by Hammond/Munster west, Gary industrial-adjacent, Merrillville/US-30 growth, and Crown Point/south edges.',
    zones: [
      { id: 'hammond-munster', name: 'Hammond, Munster & west collar', shortName: 'Hammond / Munster', neighborhoods: ['Hammond', 'Munster', 'Highland edges', 'Whiting edges'], housingTypes: 'Multi-family, SFH, older stock', challenges: ['I-80/94 congestion', 'Stairs and basements', 'IL border logistics'], moverTips: 'Clarify Indiana vs Illinois destinations. Survey older stock carefully.', cityKeywords: ['hammond', 'munster', 'highland'] },
      { id: 'gary-industrial', name: 'Gary & industrial-adjacent corridors', shortName: 'Gary', neighborhoods: ['Gary', 'Miller edges', 'industrial corridors'], housingTypes: 'Older multi-unit, SFH, industrial-adjacent stock', challenges: ['Industrial traffic', 'Older access', 'I-90 / I-65 timing'], moverTips: 'Avoid plant shift peaks when flexible. Photo access early.', cityKeywords: ['gary'] },
      { id: 'merrillville-us30', name: 'Merrillville, Hobart & US-30 growth', shortName: 'Merrillville / US-30', neighborhoods: ['Merrillville', 'Hobart', 'US-30 corridors', 'Broadway corridors'], housingTypes: 'HOA SFH, multi-family, commercial-adjacent stock', challenges: ['US-30 congestion', 'HOA rules', 'Lease-end waves'], moverTips: 'Collect HOA packets. Book elevators for month-end.', cityKeywords: ['merrillville', 'hobart'] },
      { id: 'crown-point-south', name: 'Crown Point, Cedar Lake & south edges', shortName: 'Crown Point / south', neighborhoods: ['Crown Point', 'Cedar Lake', 'St. John edges', 'Schererville edges'], housingTypes: 'HOA SFH, multi-family, lake-adjacent stock', challenges: ['Longer empty miles', 'HOA rules', 'I-65 timing'], moverTips: 'Price south pairs portal-to-portal. Collect HOA packets.', cityKeywords: ['crown point', 'cedar lake', 'st john', 'schererville'] },
    ],
    costIntro: 'Industrial timing, multi-unit access, and I-80/94 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'I-80/94 / I-65 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Older stock stairs & long carries', detail: 'Labor hours spike on west-collar jobs.' },
      { title: 'HOA soft costs on growth edges', detail: 'Gate lists push peak windows.' },
      { title: 'Cross-border IL soft costs', detail: 'Authority and empty miles rise when any leg leaves Indiana.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$450–$1,500+', note: 'Higher with elevators or long carries' },
      { label: '2–3BR condo or modest SFH', value: '$1,350–$3,900+', note: 'Industrial/HOA friction trends up' },
      { label: '3–4+ BR / cross-metro / IL pairs', value: '$2,500–$8,000+', note: 'Chicago pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$105–$180+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Chicago-metro peaks, multi-family turns, lake-effect winter, and industrial calendars reshape NW Indiana windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-80/94 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'West-collar elevators fill first.' },
      { title: 'Lake-effect winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'lake-in-nw-chicago-collar',
      title: 'NW Indiana Chicago-collar module',
      intro: 'Lake (IN) estimates fail when IL-border authority, industrial timing, or I-80/94 empty miles are treated like Indianapolis jobs.',
      bullets: [
        'Clarify Indiana vs Illinois destinations before quoting authority.',
        'Price I-80/94/I-65 pairs portal-to-portal.',
        'Avoid industrial shift peaks when flexible.',
        'Do not treat Lake as an Indianapolis spillover clone.',
        'Verify Indiana DOR household goods authority for pure in-state jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      { title: 'How districts work here', detail: 'Numerous city and township districts serve different addresses across the collar. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'District tools and Indiana Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Community Healthcare System, Methodist Hospitals, Franciscan, and Chicago systems (via commute) serve the collar. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from Crown Point into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'West multi-unit vs US-30 HOA growth', detail: 'Hammond/Munster product differs from Merrillville two-stories.' },
      { title: 'Cost variation', detail: 'IL-adjacent renovated stock often prices differently from south-county multi-family.' },
    ],
    townFit: [
      { title: 'Hammond / Munster collar lifestyle', detail: 'Chicago-commute density with industrial adjacency tradeoffs.' },
      { title: 'Merrillville growth pattern', detail: 'HOA/multi-family mix with US-30 logistics.' },
      { title: 'Crown Point south pattern', detail: 'Suburban product with longer empty miles to the lake edge.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Logistics, manufacturing, healthcare, retail corridors, and Chicago-commute professional jobs shape employment.' },
      { title: 'Commute realism', detail: 'I-80/94 and I-65 peaks are first-class planning factors for Chicago-bound workers.' },
    ],
    lifestyle: [
      { title: 'Chicago-collar identity', detail: 'Indiana Lake is NW Indiana — not Indianapolis metro and not Illinois Lake County as the default product.' },
      { title: 'Climate', detail: 'Lake-effect winter is real. Plan outdoor staging contingency.' },
    ],
    resourceItems: [
      { label: 'Lake County, IN — official site', href: 'https://www.lakecountyin.org/' },
      { label: 'INDOT traffic', href: 'https://www.in.gov/indot/' },
    ],
    directoryHint: 'Prefer Chicago-collar multi-unit experience and honest I-80/94 pricing. Clarify IN vs IL authority. Verify Indiana DOR HHG in-state and FMCSA interstate.',
  },
  {
    slug: 'allen',
    exportName: 'allenCountyInIntelligence',
    display: 'Allen County',
    hubTitle: 'Allen County Moving Intelligence Hub',
    eyebrow: 'Allen · Fort Wayne regional hub, northeast IN & I-69/I-469',
    h1: 'Moving in Allen County: Fort Wayne Regional Access, Northeast Indiana & I-69/I-469 Logistics',
    heroOpener:
      'Allen County is northeast Indiana’s regional hub — not Indianapolis spillover: Fort Wayne downtown multi-unit, north/southwest suburban HOAs, industrial corridors, and I-69/I-469/US-30 portal time that is not Marion/I-465 logistics and not South Bend university product. A downtown Fort Wayne condo, a north-side HOA two-story, and a New Haven multi-family unit do not share truck access or empty-mile risk. This hub is for Allen — not an Indy clone.',
    majorCorridors: 'I-69 · I-469 · US-30 · US-27',
    whatIntro:
      'These are Fort Wayne regional realities — ring logistics, industrial adjacency, and mid-size multi-unit — not Carmel HOA density or NW Indiana Chicago collar.',
    bullets: [
      { title: 'Fort Wayne core multi-unit differs from outer HOA product', detail: 'Elevators and curb limits rewrite near-core labor hours.' },
      { title: 'I-69 / I-469 define portal-to-portal time', detail: 'Cross-metro pairs look local on maps and regional at peak.' },
      { title: 'Industrial and logistics corridors reshape crew timing', detail: 'Shift-change windows matter near manufacturing belts.' },
      { title: 'Not Indianapolis north-suburb product as the default', detail: 'Treat Allen as its own northeast regional inventory pattern.' },
      { title: 'Not South Bend / Elkhart industrial-RV defaults either', detail: 'Fort Wayne ring logistics differ from St. Joseph/Elkhart product.' },
      REG,
    ],
    zonesHeading: 'Allen access zones',
    zonesIntro: 'Plan by downtown Fort Wayne, north suburbs, southwest growth, and east/New Haven corridors.',
    zones: [
      { id: 'fw-downtown', name: 'Downtown Fort Wayne & near-core multi-unit', shortName: 'Downtown FW', neighborhoods: ['Downtown Fort Wayne', 'West Central edges', 'Near-core multi-family'], housingTypes: 'Mid-rises, multi-unit, renovated stock', challenges: ['Elevators and COI', 'Scarce curb staging', 'Event-day congestion'], moverTips: 'Get building packets early. Prefer mid-week mornings.', cityKeywords: ['fort wayne', 'downtown'] },
      { id: 'north-fw', name: 'North Fort Wayne suburbs & I-69 corridors', shortName: 'North FW', neighborhoods: ['Dupont Road corridors', 'Leo-Cedarville edges', 'Huntertown edges'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['I-69 congestion', 'HOA rules', 'Longer portal time to core'], moverTips: 'Collect HOA packets. Price north pairs portal-to-portal.', cityKeywords: ['huntertown', 'leo'] },
      { id: 'southwest-fw', name: 'Southwest Fort Wayne growth', shortName: 'SW Fort Wayne', neighborhoods: ['Southwest FW', 'Aboite edges', 'Covington corridors'], housingTypes: 'HOA SFH, multi-family', challenges: ['I-69 / I-469 timing', 'HOA rules', 'Growth empty miles'], moverTips: 'Collect HOA packets. Survey multi-unit access type.', cityKeywords: ['aboite', 'southwest fort wayne'] },
      { id: 'east-new-haven', name: 'New Haven, east corridors & industrial edges', shortName: 'East / New Haven', neighborhoods: ['New Haven', 'east industrial corridors', 'US-30 edges'], housingTypes: 'SFH, multi-family, industrial-adjacent stock', challenges: ['US-30 congestion', 'Industrial traffic', 'Mixed access'], moverTips: 'Avoid shift peaks when flexible. Price east pairs honestly.', cityKeywords: ['new haven'] },
    ],
    costIntro: 'Multi-unit access and I-69/I-469 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Core elevator & curb friction', detail: 'Downtown labor hours spike.' },
      { title: 'I-69 / I-469 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs on growth edges', detail: 'Gate lists push peak windows.' },
      { title: 'Industrial shift-change windows', detail: 'Crew timing near manufacturing belts matters.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,350+', note: 'Higher with elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,600+', note: 'HOA friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,200–$6,800+', note: 'Indy pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$95–$170+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family peaks, multi-family turns, industrial calendars, and winter ice reshape Fort Wayne windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce I-69 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Core elevators fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'fort-wayne-allen-regional-hub',
      title: 'Fort Wayne northeast regional hub module',
      intro: 'Allen estimates fail when ring empty miles or industrial timing are treated like Indianapolis collar defaults.',
      bullets: [
        'Survey downtown multi-unit access carefully.',
        'Price I-69/I-469 pairs portal-to-portal.',
        'Do not treat Allen as an Indy north-suburb clone.',
        'Clarify Allen vs St. Joseph/Elkhart destinations on multi-county estimates.',
        'Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      { title: 'How districts work here', detail: 'Fort Wayne Community Schools, Northwest Allen, Southwest Allen, East Allen, and other districts serve different addresses. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'District tools and Indiana Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Parkview Health, Lutheran Health Network, and other systems serve northeast corridors. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from outer suburbs into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Core multi-unit vs outer HOA stock', detail: 'Downtown product differs from north/southwest two-stories.' },
      { title: 'Cost variation', detail: 'Near-core renovated stock often prices differently from far-ring multi-family.' },
    ],
    townFit: [
      { title: 'Downtown Fort Wayne lifestyle', detail: 'Walkable amenities with elevator tradeoffs.' },
      { title: 'North suburban pattern', detail: 'HOA product with I-69 logistics.' },
      { title: 'East industrial-adjacent pattern', detail: 'Mixed stock with US-30 timing.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Healthcare, manufacturing, logistics, defense adjacency, and professional services shape employment.' },
      { title: 'Commute realism', detail: 'I-69 and I-469 peaks are real. Test drive peak routes around the ring.' },
    ],
    lifestyle: [
      { title: 'Northeast regional identity', detail: 'Allen is Fort Wayne metro — not Indianapolis spillover or South Bend university defaults.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourceItems: [
      { label: 'Allen County — official site', href: 'https://www.allencounty.us/' },
      { label: 'City of Fort Wayne', href: 'https://www.cityoffortwayne.org/' },
      { label: 'INDOT traffic', href: 'https://www.in.gov/indot/' },
    ],
    directoryHint: 'Prefer regional multi-unit experience and honest I-69 pricing. Verify Indiana DOR HHG authority in-state and FMCSA interstate.',
  },
  {
    slug: 'st-joseph',
    exportName: 'stJosephCountyInIntelligence',
    display: 'St. Joseph County',
    hubTitle: 'St. Joseph County Moving Intelligence Hub',
    eyebrow: 'St. Joseph · South Bend/Mishawaka, Notre Dame cycles & I-80/90',
    h1: 'Moving in St. Joseph County: South Bend–Mishawaka Access, University Cycles & I-80/90 Logistics',
    heroOpener:
      'St. Joseph County is north-central Indiana university and industrial mix — not Elkhart RV-only product: South Bend multi-unit, Notre Dame lease waves, Mishawaka stock, and I-80/90/US-31 portal time that is not Fort Wayne ring logistics and not Indianapolis collar. A near-campus multi-family turn, a downtown South Bend condo, and a Granger HOA two-story do not share truck access or empty-mile risk. This hub is for St. Joseph — not an Elkhart clone.',
    majorCorridors: 'I-80/90 · US-31 · US-20 · SR-23',
    whatIntro:
      'These are South Bend / Notre Dame realities — academic peaks, industrial adjacency, and MI-border logistics — not Elkhart manufacturing-only defaults.',
    bullets: [
      { title: 'Notre Dame and campus-adjacent multi-unit waves cluster demand', detail: 'Academic turns fill elevators and street parking first.' },
      { title: 'South Bend core multi-unit differs from Granger HOA product', detail: 'Access photos beat verbal promises near campus and downtown.' },
      { title: 'I-80/90 / US-31 define portal-to-portal time', detail: 'MI-border and regional pairs look short on maps and regional at peak.' },
      { title: 'Not an Elkhart RV-corridor clone', detail: 'University + city multi-unit mix differs from pure manufacturing product.' },
      { title: 'Not Fort Wayne ring logistics as the default', detail: 'Treat St. Joseph as its own north-central inventory pattern.' },
      REG,
    ],
    zonesHeading: 'St. Joseph access zones',
    zonesIntro: 'Plan by South Bend core/campus, Mishawaka, Granger north, and west/south township edges.',
    zones: [
      { id: 'south-bend-campus', name: 'South Bend core & Notre Dame multi-family', shortName: 'South Bend / ND', neighborhoods: ['Downtown South Bend', 'Notre Dame edges', 'Eddy Street corridors', 'near-campus multi-unit'], housingTypes: 'Student multi-family, mid-rises, older SFH', challenges: ['Lease-end waves', 'Scarce curb staging', 'Elevators and stairs'], moverTips: 'Book academic peaks early. Confirm elevator reservations.', cityKeywords: ['south bend', 'notre dame'] },
      { id: 'mishawaka', name: 'Mishawaka city & multi-unit belt', shortName: 'Mishawaka', neighborhoods: ['Mishawaka', 'downtown Mishawaka edges', 'US-20 corridors'], housingTypes: 'Multi-family, SFH, mixed stock', challenges: ['US-20 congestion', 'Mixed elevators and stairs', 'Lease waves'], moverTips: 'Clarify Mishawaka vs South Bend destinations. Survey access type.', cityKeywords: ['mishawaka'] },
      { id: 'granger-north', name: 'Granger & north suburban growth', shortName: 'Granger', neighborhoods: ['Granger', 'Harris Twp edges', 'SR-23 corridors'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'Longer portal time to core', 'SR-23 timing'], moverTips: 'Collect HOA packets. Price north pairs portal-to-portal.', cityKeywords: ['granger'] },
      { id: 'west-south', name: 'Osceola, west/south township edges', shortName: 'West/south edges', neighborhoods: ['Osceola edges', 'Walkerton edges', 'west industrial corridors'], housingTypes: 'SFH, multi-family, industrial-adjacent stock', challenges: ['Longer empty miles', 'Industrial traffic', 'US-20 / US-31 timing'], moverTips: 'Price outer pairs honestly. Avoid shift peaks when flexible.', cityKeywords: ['osceola', 'walkerton'] },
    ],
    costIntro: 'Campus multi-unit access and I-80/90 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Campus multi-unit & curb friction', detail: 'Academic peaks spike labor hours.' },
      { title: 'I-80/90 / US-31 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs in Granger', detail: 'Gate lists push peak windows.' },
      { title: 'MI-border authority soft costs', detail: 'FMCSA may apply when any leg leaves Indiana.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,400+', note: 'Higher near campus elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,700+', note: 'Campus friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,200–$7,000+', note: 'Chicago/Indy pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$95–$170+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro: 'University calendars dominate more than pure suburban peaks — plan August carefully.',
    seasonal: [
      { title: 'Best windows: mid-week outside academic peaks', detail: 'Clear curb near campus and downtown.' },
      { title: 'Academic peaks: August and May', detail: 'Book multi-unit far ahead.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book Granger Saturdays early.' },
      { title: 'Winter lake-effect ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'south-bend-st-joseph-notre-dame',
      title: 'South Bend Notre Dame & north-central module',
      intro: 'St. Joseph estimates fail when academic lease waves or I-80/90 empty miles are treated like Elkhart-only manufacturing jobs.',
      bullets: [
        'Align multi-unit moves with Notre Dame calendars when possible.',
        'Request elevator packets early near campus.',
        'Price I-80/90/US-31 pairs portal-to-portal; clarify MI destinations for FMCSA.',
        'Do not treat St. Joseph as an Elkhart clone.',
        'Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      { title: 'How districts work here', detail: 'South Bend, Penn-Harris-Madison, Mishawaka, and other districts serve different addresses. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'District tools and Indiana Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Beacon Health, Saint Joseph Health System, and other systems serve north-central corridors. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from Granger into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Campus multi-unit vs Granger HOA stock', detail: 'Near-ND product differs sharply from north suburban two-stories.' },
      { title: 'Cost variation', detail: 'Campus-adjacent renovated stock often prices differently from outer multi-family.' },
    ],
    townFit: [
      { title: 'South Bend campus lifestyle', detail: 'University density with curb and elevator tradeoffs.' },
      { title: 'Mishawaka pattern', detail: 'Mixed multi-unit with US-20 logistics.' },
      { title: 'Granger suburban pattern', detail: 'HOA product with longer portal time to core jobs.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'University of Notre Dame, healthcare, manufacturing, and professional services shape employment.' },
      { title: 'Commute realism', detail: 'I-80/90 and US-31 peaks are real — especially toward Michigan and Chicago corridors.' },
    ],
    lifestyle: [
      { title: 'North-central university identity', detail: 'St. Joseph is South Bend metro — not Elkhart-only manufacturing or Fort Wayne ring defaults.' },
      { title: 'Climate', detail: 'Lake-effect winter is real. Plan outdoor staging contingency.' },
    ],
    resourceItems: [
      { label: 'St. Joseph County — official site', href: 'https://www.sjcindiana.com/' },
      { label: 'City of South Bend', href: 'https://southbendin.gov/' },
      { label: 'INDOT traffic', href: 'https://www.in.gov/indot/' },
    ],
    directoryHint: 'Prefer campus multi-unit experience and honest I-80/90 pricing. Verify Indiana DOR HHG authority in-state and FMCSA interstate.',
  },
  {
    slug: 'elkhart',
    exportName: 'elkhartCountyInIntelligence',
    display: 'Elkhart County',
    hubTitle: 'Elkhart County Moving Intelligence Hub',
    eyebrow: 'Elkhart · RV/manufacturing corridor, not South Bend clone',
    h1: 'Moving in Elkhart County: RV Manufacturing Corridor, Goshen Access & I-80/90 Logistics',
    heroOpener:
      'Elkhart County is RV and manufacturing corridor logistics — not a South Bend university clone: Elkhart multi-unit and industrial adjacency, Goshen stock, Bristol/Middlebury edges, and I-80/90/US-20 portal time that is not Notre Dame lease-wave product and not Fort Wayne ring defaults. An industrial-adjacent multi-family unit, a Goshen two-story, and a Middlebury HOA ranch do not share truck access or empty-mile risk. This hub is for Elkhart — not a St. Joseph rename.',
    majorCorridors: 'I-80/90 · US-20 · US-33 · SR-19',
    whatIntro:
      'These are RV/manufacturing corridor realities — industrial timing, plant-adjacent traffic, and US-20 logistics — not South Bend campus elevators as the default.',
    bullets: [
      { title: 'RV and manufacturing calendars create hard report dates', detail: 'Plant schedules and shift-change windows reshape crew timing.' },
      { title: 'Elkhart industrial-adjacent multi-unit differs from Goshen SFH product', detail: 'Survey access type carefully — not one corridor product.' },
      { title: 'I-80/90 / US-20 define portal-to-portal time', detail: 'Pairs toward South Bend or Michigan look regional at peak.' },
      { title: 'Not a South Bend university clone', detail: 'Manufacturing density and empty miles differ from ND multi-unit waves.' },
      { title: 'Amish-country and rural edges add access friction', detail: 'Photo driveway grades and turn radius early.' },
      REG,
    ],
    zonesHeading: 'Elkhart access zones',
    zonesIntro: 'Plan by Elkhart city/industrial, Goshen, Bristol/Middlebury, and Nappanee/south edges.',
    zones: [
      { id: 'elkhart-city', name: 'Elkhart city & industrial multi-unit belt', shortName: 'Elkhart city', neighborhoods: ['Elkhart', 'downtown edges', 'industrial multi-family corridors'], housingTypes: 'Multi-family, SFH, industrial-adjacent stock', challenges: ['Shift-change traffic', 'Mixed stairs and elevators', 'US-20 congestion'], moverTips: 'Avoid plant shift peaks when flexible. Survey multi-unit access type.', cityKeywords: ['elkhart'] },
      { id: 'goshen', name: 'Goshen city & central stock', shortName: 'Goshen', neighborhoods: ['Goshen', 'downtown Goshen edges', 'US-33 corridors'], housingTypes: 'SFH, multi-family, mixed stock', challenges: ['US-33 congestion', 'Mixed access', 'Longer empty miles to Elkhart plants'], moverTips: 'Clarify Goshen vs Elkhart destinations. Photo curb carefully.', cityKeywords: ['goshen'] },
      { id: 'bristol-middlebury', name: 'Bristol, Middlebury & east corridor edges', shortName: 'Bristol / Middlebury', neighborhoods: ['Bristol', 'Middlebury', 'east industrial edges'], housingTypes: 'SFH, multi-family, rural-adjacent stock', challenges: ['Longer empty miles', 'Industrial traffic', 'I-80/90 timing'], moverTips: 'Price east pairs honestly. Confirm driveway access.', cityKeywords: ['bristol', 'middlebury'] },
      { id: 'nappanee-south', name: 'Nappanee, Wakarusa & south edges', shortName: 'Nappanee / south', neighborhoods: ['Nappanee', 'Wakarusa edges', 'south rural roads'], housingTypes: 'SFH, rural stock, limited multi-family', challenges: ['Longer empty miles', 'Rural access', 'US-6 / SR-19 timing'], moverTips: 'Photo driveway and turn radius. Price rural pairs portal-to-portal.', cityKeywords: ['nappanee', 'wakarusa'] },
    ],
    costIntro: 'Industrial timing and I-80/90 empty miles drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Industrial shift-change windows', detail: 'Crew timing near plant corridors matters.' },
      { title: 'I-80/90 / US-20 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Multi-unit access friction', detail: 'Elkhart labor hours spike.' },
      { title: 'Rural empty miles south/east', detail: 'Longer hauls cost more than map distance suggests.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$380–$1,300+', note: 'Higher with elevators or long carries' },
      { label: '2–3BR condo or modest SFH', value: '$1,200–$3,400+', note: 'Industrial friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,100–$6,500+', note: 'Chicago/South Bend pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$90–$165+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Manufacturing calendars, family peaks, and lake-effect winter reshape Elkhart windows more than pure academic peaks.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce US-20 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Manufacturing shutdown windows', detail: 'Hard dates can cluster around plant calendars.' },
      { title: 'Winter lake-effect ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'elkhart-rv-manufacturing-corridor',
      title: 'Elkhart RV/manufacturing corridor module',
      intro: 'Elkhart estimates fail when industrial timing or empty miles are treated like South Bend campus jobs.',
      bullets: [
        'Avoid plant shift peaks when flexible.',
        'Price I-80/90/US-20 pairs portal-to-portal toward South Bend or Michigan.',
        'Do not treat Elkhart as a St. Joseph university clone.',
        'Clarify Elkhart vs St. Joseph destinations on multi-county estimates.',
        'Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      { title: 'How districts work here', detail: 'Elkhart, Goshen, Middlebury, Fairfield, and other districts serve different addresses. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'District tools and Indiana Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Beacon Health Elkhart, Goshen Health, and other systems serve corridor communities. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from Middlebury and Nappanee into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Industrial multi-unit vs Goshen SFH vs rural south', detail: 'Submarkets differ sharply within short distances.' },
      { title: 'Cost variation', detail: 'Plant-adjacent multi-family often prices differently from south rural SFH.' },
    ],
    townFit: [
      { title: 'Elkhart industrial-suburban pattern', detail: 'Plant adjacency with multi-unit logistics.' },
      { title: 'Goshen pattern', detail: 'Mixed city stock with US-33 timing.' },
      { title: 'Middlebury / rural pattern', detail: 'Longer empty miles and driveway access.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'RV/manufacturing, suppliers, healthcare, and logistics shape employment.' },
      { title: 'Commute realism', detail: 'US-20 and I-80/90 peaks are real for regional workers.' },
    ],
    lifestyle: [
      { title: 'Manufacturing corridor identity', detail: 'Elkhart is RV/industrial north-central Indiana — not South Bend campus defaults or Fort Wayne ring product.' },
      { title: 'Climate', detail: 'Lake-effect winter is real. Plan outdoor staging contingency.' },
    ],
    resourceItems: [
      { label: 'Elkhart County — official site', href: 'https://elkhartcounty.com/' },
      { label: 'INDOT traffic', href: 'https://www.in.gov/indot/' },
    ],
    directoryHint: 'Prefer industrial-corridor experience and honest US-20 pricing. Verify Indiana DOR HHG authority in-state and FMCSA interstate.',
  },
  {
    slug: 'tippecanoe',
    exportName: 'tippecanoeCountyInIntelligence',
    display: 'Tippecanoe County',
    hubTitle: 'Tippecanoe County Moving Intelligence Hub',
    eyebrow: 'Tippecanoe · Lafayette/West Lafayette, Purdue cycles & I-65',
    h1: 'Moving in Tippecanoe County: Lafayette–West Lafayette Access, Purdue Cycles & I-65 Logistics',
    heroOpener:
      'Tippecanoe County is Purdue university logistics — not Indianapolis collar product: West Lafayette multi-unit and lease waves, Lafayette multi-family, Wabash River access constraints, and I-65/US-52 portal time that is not Carmel HOA density and not Evansville river-city product. A near-campus multi-unit turn, a downtown Lafayette condo, and a south-side HOA two-story do not share truck access or empty-mile risk. This hub is for Tippecanoe — not a Marion clone.',
    majorCorridors: 'I-65 · US-52 · US-231 · SR-26',
    whatIntro:
      'These are Lafayette / Purdue realities — academic peaks, campus curb limits, and I-65 timing — not Indy north-suburb HOA defaults.',
    bullets: [
      { title: 'Purdue lease cycles cluster West Lafayette multi-unit demand', detail: 'August/May turns fill elevators and street parking first.' },
      { title: 'West Lafayette campus access differs from Lafayette multi-family', detail: 'Curb limits and building packets rewrite labor hours near campus.' },
      { title: 'I-65 / US-52 define portal-to-portal time', detail: 'Pairs toward Indy look regional at peak despite map distance.' },
      { title: 'Not an Indianapolis collar clone', detail: 'University multi-unit product differs from Carmel HOA growth.' },
      { title: 'Wabash River and bridge approaches reshape staging plans', detail: 'Confirm truck routing early for cross-river pairs.' },
      REG,
    ],
    zonesHeading: 'Tippecanoe access zones',
    zonesIntro: 'Plan by West Lafayette/Purdue, downtown Lafayette, south Lafayette growth, and north/east township edges.',
    zones: [
      { id: 'west-lafayette-purdue', name: 'West Lafayette & Purdue multi-family', shortName: 'West Lafayette / Purdue', neighborhoods: ['West Lafayette', 'Purdue campus edges', 'Chauncey corridors', 'student multi-unit belts'], housingTypes: 'Student multi-family, mid-rises, older SFH', challenges: ['Lease-end waves', 'Scarce curb staging', 'Elevators and stairs'], moverTips: 'Book academic peaks early. Confirm elevator reservations and truck length.', cityKeywords: ['west lafayette', 'purdue'] },
      { id: 'lafayette-core', name: 'Downtown Lafayette & near-core multi-unit', shortName: 'Downtown Lafayette', neighborhoods: ['Downtown Lafayette', 'near-core multi-family', 'Main Street corridors'], housingTypes: 'Multi-unit, renovated stock, mid-rises', challenges: ['Curb staging', 'Elevators and stairs', 'Bridge approach timing'], moverTips: 'Prefer mid-week mornings. Survey multi-unit access type.', cityKeywords: ['lafayette', 'downtown lafayette'] },
      { id: 'south-lafayette', name: 'South Lafayette suburban growth', shortName: 'South Lafayette', neighborhoods: ['South Lafayette', 'McCutcheon edges', 'US-231 corridors'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'US-231 congestion', 'Longer portal time to campus'], moverTips: 'Collect HOA packets. Price south pairs portal-to-portal.', cityKeywords: ['south lafayette'] },
      { id: 'north-east', name: 'Battle Ground, north/east township edges', shortName: 'North/east edges', neighborhoods: ['Battle Ground edges', 'Dayton edges', 'I-65 corridors'], housingTypes: 'SFH, multi-family, rural-adjacent stock', challenges: ['Longer empty miles', 'I-65 timing', 'Winter access'], moverTips: 'Price outer pairs honestly. Photo driveway access.', cityKeywords: ['battle ground', 'dayton'] },
    ],
    costIntro: 'Campus multi-unit access and I-65 portal time drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Purdue multi-unit & curb friction', detail: 'Academic peaks spike labor hours.' },
      { title: 'I-65 / US-52 / US-231 congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'HOA soft costs on south growth', detail: 'Gate lists push peak windows.' },
      { title: 'Bridge approach timing', detail: 'Cross-river pairs add empty miles.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,400+', note: 'Higher near campus elevators' },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,600+', note: 'Campus friction trends up' },
      { label: '3–4+ BR / cross-metro', value: '$2,200–$6,800+', note: 'Indy pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$95–$170+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Purdue calendars dominate more than pure suburban peaks — plan August carefully.',
    seasonal: [
      { title: 'Best windows: mid-week outside academic peaks', detail: 'Clear curb near Purdue and downtown.' },
      { title: 'Academic peaks: August and May', detail: 'Book West Lafayette multi-unit far ahead.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book south-side Saturdays early.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'lafayette-tippecanoe-purdue',
      title: 'Lafayette Purdue university module',
      intro: 'Tippecanoe estimates fail when academic lease waves or I-65 empty miles are treated like Indianapolis collar defaults.',
      bullets: [
        'Align multi-unit moves with Purdue calendars when possible.',
        'Request elevator packets early in West Lafayette.',
        'Price I-65 pairs portal-to-portal toward Indianapolis.',
        'Do not treat Tippecanoe as a Marion or Hamilton clone.',
        'Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      { title: 'How districts work here', detail: 'Lafayette, West Lafayette, Tippecanoe School Corporation, and other districts serve different addresses. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'District tools and Indiana Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'IU Health Arnett, Franciscan Health Lafayette, and other systems serve Wabash Valley corridors. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from south growth into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Campus multi-unit vs south HOA stock', detail: 'West Lafayette product differs sharply from south Lafayette two-stories.' },
      { title: 'Cost variation', detail: 'Near-campus renovated stock often prices differently from outer multi-family.' },
    ],
    townFit: [
      { title: 'West Lafayette campus lifestyle', detail: 'University density with curb and elevator tradeoffs.' },
      { title: 'Downtown Lafayette pattern', detail: 'Multi-unit mix with bridge logistics.' },
      { title: 'South suburban pattern', detail: 'HOA product with US-231 timing.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Purdue University, healthcare, manufacturing, and professional services shape employment.' },
      { title: 'Commute realism', detail: 'I-65 peaks toward Indianapolis are first-class planning factors.' },
    ],
    lifestyle: [
      { title: 'University identity', detail: 'Tippecanoe is Lafayette/Purdue metro — not Indianapolis collar or Evansville river-city defaults.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourceItems: [
      { label: 'Tippecanoe County — official site', href: 'https://www.tippecanoe.in.gov/' },
      { label: 'City of Lafayette', href: 'https://www.lafayette.in.gov/' },
      { label: 'INDOT traffic', href: 'https://www.in.gov/indot/' },
    ],
    directoryHint: 'Prefer Purdue multi-unit experience and honest I-65 pricing. Verify Indiana DOR HHG authority in-state and FMCSA interstate.',
  },
  {
    slug: 'vanderburgh',
    exportName: 'vanderburghCountyInIntelligence',
    display: 'Vanderburgh County',
    hubTitle: 'Vanderburgh County Moving Intelligence Hub',
    eyebrow: 'Vanderburgh · Evansville, Ohio River / tri-state & I-69/US-41',
    h1: 'Moving in Vanderburgh County: Evansville Access, Ohio River Logistics & I-69/US-41 Corridors',
    heroOpener:
      'Vanderburgh County is southwest Indiana river-city logistics — not Indianapolis south clone: Evansville multi-unit and older stock, Ohio River / tri-state adjacency (KY/IL), west-side industrial corridors, and I-69/US-41 portal time that is not Marion/I-465 product and not Purdue university waves. A downtown Evansville multi-unit, an east-side HOA two-story, and a west industrial-adjacent ranch do not share truck access or empty-mile risk. This hub is for Vanderburgh — not an Indy rename.',
    majorCorridors: 'I-69 · US-41 · SR-62 · SR-66',
    whatIntro:
      'These are Evansville / Ohio River realities — tri-state logistics, river-city access, and US-41 timing — not Indianapolis collar HOA defaults.',
    bullets: [
      { title: 'Ohio River / tri-state pairs often need FMCSA', detail: 'KY and IL destinations leave Indiana authority — clarify early.' },
      { title: 'Evansville core multi-unit differs from east-side HOA product', detail: 'Stairs, elevators, and curb limits rewrite near-core labor hours.' },
      { title: 'I-69 / US-41 define portal-to-portal time', detail: 'Pairs toward Indy look long-regional; price empty miles honestly.' },
      { title: 'Not an Indianapolis south clone', detail: 'River-city and industrial mix differs from Marion/I-465 product.' },
      { title: 'West industrial corridors reshape crew timing', detail: 'Shift-change windows matter near manufacturing belts.' },
      REG,
    ],
    zonesHeading: 'Vanderburgh access zones',
    zonesIntro: 'Plan by downtown Evansville, east-side suburbs, west industrial edges, and north township growth.',
    zones: [
      { id: 'evansville-core', name: 'Downtown Evansville & near-core multi-unit', shortName: 'Downtown Evansville', neighborhoods: ['Downtown Evansville', 'near-core multi-family', 'riverfront edges'], housingTypes: 'Multi-unit, renovated stock, mid-rises', challenges: ['Elevators and stairs', 'Scarce curb staging', 'Event-day congestion'], moverTips: 'Get building packets early. Prefer mid-week mornings.', cityKeywords: ['evansville', 'downtown'] },
      { id: 'east-side', name: 'East Evansville suburbs & HOA growth', shortName: 'East side', neighborhoods: ['East Evansville', 'Newburgh edges', 'SR-66 corridors'], housingTypes: 'HOA SFH, multi-family, townhomes', challenges: ['HOA rules', 'SR-66 congestion', 'Longer portal time to core'], moverTips: 'Collect HOA packets. Price east pairs portal-to-portal.', cityKeywords: ['east evansville', 'newburgh'] },
      { id: 'west-industrial', name: 'West side industrial-adjacent corridors', shortName: 'West industrial', neighborhoods: ['West Evansville', 'industrial corridors', 'US-41 west'], housingTypes: 'SFH, multi-family, industrial-adjacent stock', challenges: ['Industrial traffic', 'Older access', 'US-41 congestion'], moverTips: 'Avoid shift peaks when flexible. Survey older stock carefully.', cityKeywords: ['west evansville'] },
      { id: 'north-growth', name: 'North township growth edges', shortName: 'North growth', neighborhoods: ['Darmstadt edges', 'north township stock', 'I-69 approaches'], housingTypes: 'SFH, multi-family, growth suburbs', challenges: ['Longer empty miles', 'I-69 timing', 'Winter access'], moverTips: 'Price north pairs honestly. Photo driveway access.', cityKeywords: ['darmstadt'] },
    ],
    costIntro: 'Core access friction and long I-69 empty miles drive quotes more than bedroom count alone.',
    drivers: [
      { title: 'Core multi-unit & curb friction', detail: 'Downtown labor hours spike.' },
      { title: 'I-69 / US-41 empty miles', detail: 'Portal-to-portal spikes on Indy and tri-state pairs.' },
      { title: 'HOA soft costs on east side', detail: 'Gate lists push peak windows.' },
      { title: 'Tri-state authority soft costs', detail: 'FMCSA may apply when any leg leaves Indiana.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$380–$1,300+', note: 'Higher with elevators or long carries' },
      { label: '2–3BR condo or modest SFH', value: '$1,200–$3,400+', note: 'Core friction trends up' },
      { label: '3–4+ BR / cross-metro / tri-state', value: '$2,100–$6,800+', note: 'Indy or KY/IL pairs highest' },
      { label: 'Typical 2-person crew rate', value: '$90–$165+/hr', note: 'Portal-to-portal' },
    ],
    seasonalIntro: 'Family peaks, multi-family turns, industrial calendars, and winter ice reshape Evansville windows.',
    seasonal: [
      { title: 'Best windows: mid-week early mornings', detail: 'Clear curb and reduce US-41 pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book east-side Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Core elevators fill first.' },
      { title: 'Winter ice and snow', detail: 'Confirm driveway contingency.' },
    ],
    specialized: {
      id: 'evansville-vanderburgh-ohio-river',
      title: 'Evansville Ohio River / tri-state module',
      intro: 'Vanderburgh estimates fail when tri-state authority or I-69 empty miles are treated like Indianapolis collar defaults.',
      bullets: [
        'Clarify Indiana vs Kentucky/Illinois destinations before quoting authority.',
        'Price I-69/US-41 pairs portal-to-portal toward Indy or the river.',
        'Survey downtown multi-unit access carefully.',
        'Do not treat Vanderburgh as an Indy south clone.',
        'Verify Indiana DOR household goods authority for pure in-state jobs and FMCSA for interstate legs.',
      ],
    },
    schools: [
      { title: 'How districts work here', detail: 'Evansville Vanderburgh School Corporation and other systems serve different addresses. Confirm zoning carefully.' },
      { title: 'Research sources', detail: 'District tools and Indiana Department of Education data beat ranking screenshots.' },
    ],
    hospitals: [
      { title: 'Major systems', detail: 'Deaconess, Ascension St. Vincent Evansville, and other systems serve southwest corridors. Confirm networks.' },
      { title: 'What relocators should do', detail: 'Map peak-hour drive times from east-side growth into major campuses. Transfer records early.' },
    ],
    housing: [
      { title: 'Core multi-unit vs east HOA vs west industrial-adjacent', detail: 'Submarkets differ sharply within short distances.' },
      { title: 'Cost variation', detail: 'Near-core renovated stock often prices differently from north multi-family.' },
    ],
    townFit: [
      { title: 'Downtown Evansville lifestyle', detail: 'River-city amenities with multi-unit tradeoffs.' },
      { title: 'East suburban pattern', detail: 'HOA product with SR-66 logistics.' },
      { title: 'West industrial-adjacent pattern', detail: 'Plant traffic and older stock access.' },
    ],
    jobs: [
      { title: 'Employment anchors', detail: 'Healthcare, manufacturing, logistics, education, and tri-state professional services shape employment.' },
      { title: 'Commute realism', detail: 'US-41 and I-69 peaks are real — especially for tri-state workers.' },
    ],
    lifestyle: [
      { title: 'Southwest river-city identity', detail: 'Vanderburgh is Evansville / Ohio River — not Indianapolis spillover or Purdue university defaults.' },
      { title: 'Climate', detail: 'Hot humid summers and winter ice/snow. Plan outdoor staging contingency.' },
    ],
    resourceItems: [
      { label: 'Vanderburgh County — official site', href: 'https://www.vanderburghgov.org/' },
      { label: 'City of Evansville', href: 'https://www.evansvillegov.org/' },
      { label: 'INDOT traffic', href: 'https://www.in.gov/indot/' },
    ],
    directoryHint: 'Prefer river-city multi-unit experience and honest I-69 pricing. Clarify tri-state authority. Verify Indiana DOR HHG in-state and FMCSA interstate.',
  },
];

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function render(spec: Spec): string {
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
    .map((b) => `      {\n        title: "${esc(b.title)}",\n        detail: "${esc(b.detail)}",\n      }`)
    .join(',\n');
  const drivers = spec.drivers.map((d) => `      { title: "${esc(d.title)}", detail: "${esc(d.detail)}" }`).join(',\n');
  const ranges = spec.ranges
    .map((r) => `      { label: "${esc(r.label)}", value: "${esc(r.value)}", note: "${esc(r.note)}" }`)
    .join(',\n');
  const seasonal = spec.seasonal.map((s) => `      { title: "${esc(s.title)}", detail: "${esc(s.detail)}" }`).join(',\n');
  const specBullets = spec.specialized.bullets.map((b) => `"${esc(b)}"`).join(',');
  const mk = (items: { title: string; detail: string }[]) =>
    items.map((b) => `          { title: "${esc(b.title)}", detail: "${esc(b.detail)}" }`).join(',\n');
  const resources = spec.resourceItems
    .map((r) => `      { label: "${esc(r.label)}", href: "${esc(r.href)}", external: true }`)
    .join(',\n');

  return `import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeInPack } from '@/lib/local-movers/county-intelligence/indiana/in-shared';

export const ${spec.exportName}: CountyIntelligencePack = finalizeInPack({
  countySlug: "${spec.slug}",
  hubTitle: "${esc(spec.hubTitle)}",
  eyebrow: "${esc(spec.eyebrow)}",
  h1: "${esc(spec.h1)}",
  heroOpener: "${esc(spec.heroOpener)}",
  heroCredibility:
    'Indiana DOR household goods operating authority (IC 8-2.1-22) for intrastate IN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "${esc(spec.majorCorridors)}",
  whatMakesDifferent: {
    title: "What makes moving in ${esc(spec.display)} different",
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
    title: "What drives ${esc(spec.display)} moving costs",
    intro: "${esc(spec.costIntro)}",
    drivers: [
${drivers}
    ],
    ranges: [
${ranges}
    ],
  },
  seasonal: {
    title: "When to schedule a move in ${esc(spec.display)}",
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
    title: "Considering a move to ${esc(spec.display)}?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
${mk(spec.schools)}
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
${mk(spec.hospitals)}
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
${mk(spec.housing)}
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
${mk(spec.townFit)}
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
${mk(spec.jobs)}
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
${mk(spec.lifestyle)}
      ]},
    ],
  },
  resources: {
    title: "Useful ${esc(spec.display)} resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Indiana DOR household goods operating authority for in-state moves and FMCSA for interstate legs.',
    items: [
${resources}
    ],
  },
  directoryHint: "${esc(spec.directoryHint)}",
  lastReviewed: '2026-07-24',
});
`;
}

const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/indiana');
mkdirSync(outDir, { recursive: true });
for (const spec of specs) {
  const path = join(outDir, `${spec.slug}-in.ts`);
  writeFileSync(path, render(spec), 'utf8');
  console.log('wrote', path);
}
console.log(`Generated ${specs.length} Indiana Tier-1 packs.`);
