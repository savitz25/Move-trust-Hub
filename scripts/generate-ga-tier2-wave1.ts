/**
 * Generate GA Tier 2 Wave 1 county intelligence packs.
 * Run: npx tsx scripts/generate-ga-tier2-wave1.ts
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

type Zone = {
  id: string;
  name: string;
  shortName: string;
  neighborhoods: string[];
  housingTypes: string;
  challenges: string[];
  keywords: string[];
  moverTips: string;
};
type Spec = { id: string; title: string; intro: string; bullets: string[] };
type PackDef = {
  file: string;
  exportName: string;
  slug: string;
  hubTitle: string;
  eyebrow: string;
  h1: string;
  heroOpener: string;
  heroCredibility: string;
  majorCorridors: string;
  parentLabel: string;
  parentHref: string;
  compareIntro: string;
  compareBullets: Array<{ title: string; detail: string }>;
  whatIntro: string;
  whatBullets: Array<{ title: string; detail: string }>;
  zonesHeading: string;
  zonesIntro: string;
  zones: Zone[];
  specialized: Spec[];
  schoolsIntro: string;
  hospitalsDetail: string;
  costIntro: string;
  seasonalIntro: string;
};

function z(
  id: string,
  name: string,
  shortName: string,
  neighborhoods: string[],
  housingTypes: string,
  challenges: string[],
  keywords: string[],
  moverTips: string
): Zone {
  return { id, name, shortName, neighborhoods, housingTypes, challenges, keywords, moverTips };
}

function s(id: string, title: string, intro: string, bullets: string[]): Spec {
  return { id, title, intro, bullets };
}

const packs: PackDef[] = [
  {
    file: 'cherokee-tier2.ts',
    exportName: 'cherokeeCountyTier2Intelligence',
    slug: 'cherokee',
    hubTitle: 'Cherokee County Moving Intelligence Hub',
    eyebrow: 'Cherokee · North Atlanta collar · Woodstock / Canton · vs Fulton',
    h1: 'Moving in Cherokee County: Woodstock, Canton & I-575 North-Metro Growth',
    heroOpener:
      'Cherokee County is north Atlanta’s I-575 growth collar — Woodstock and Holly Springs master-plan HOAs, Canton seat density, longer empty miles from inside the Perimeter, and family SFH inventories that dominate school calendars. It is not Fulton towers or Midtown elevators, and it is not Forsyth’s GA-400 / Lake Lanier pattern with different labels: expect HOA gate lists, cul-de-sac staging, and portal-to-portal time that map miles understate. This guide is for people moving in Cherokee as north-metro growth product — not an Atlanta core rename.',
    heroCredibility:
      'North-metro I-575 growth · HOA subdivisions · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-575 · GA-20 · GA-92 · GA-140 · I-75 (south approach)',
    parentLabel: 'Fulton County (and Cobb northwest patterns)',
    parentHref: '/local-movers/georgia/fulton',
    compareIntro:
      'Cherokee is I-575 north-collar HOA growth — not Fulton intown elevators and not Cobb Cumberland multi-family alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Fulton crews fight Connector peaks and intown permits. Cherokee pairs ride I-575, GA-92, and Bells Ferry-style arterials — freer mid-day north of the Perimeter, still peak-heavy on school-zone and I-575 commute windows. Portal-to-portal time is real; it is not a Midtown elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Fulton mixes towers, Midtown multi-family, and north-Fulton estates. Cherokee skews Woodstock/Holly Springs planned SFH, Canton two-stories, and north rural-edge lots — more continuous HOA cul-de-sac product, less freight-elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA COIs, gate lists, and weekday windows dominate more often than intown street permits. Rural-edge approaches add gravel and longer carries uncommon on Buckhead mid-rises.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cherokee quotes often sit at north-collar suburban rates for driveway SFH — empty miles from intown staging and HOA soft costs push premiums vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Cherokee is north-metro I-575 growth collar — not Fulton core renamed and not Forsyth GA-400 lake product.',
      },
    ],
    whatIntro: 'HOA growth, I-575 freeflow, and longer north-collar empty miles — not Atlanta tower boilerplate.',
    whatBullets: [
      {
        title: 'I-575 is the spine — and the bottleneck',
        detail: 'North–south pairs freer mid-day still peak hard at school and commute windows. Ask portal-to-portal.',
      },
      {
        title: 'HOA master plans dominate family volume',
        detail: 'COI, gate lists, truck limits, and weekday windows are standard on growth villages.',
      },
      {
        title: 'Distance from intown staging is billable',
        detail: 'Perimeter-origin crews burn empty miles even on “metro Atlanta” labels.',
      },
      {
        title: 'New-construction access friction is common',
        detail: 'Incomplete streets, mud, and lagging gate rules appear on growth edges.',
      },
    ],
    zonesHeading: 'Cherokee zones: Woodstock growth, Canton seat, Holly Springs/Towne Lake & north rural edge',
    zonesIntro: 'Two to four sharp products under one I-575 north-collar label.',
    zones: [
      z('woodstock', 'Woodstock south-edge growth', 'Woodstock', ['Woodstock', 'growth villages'], 'SFH, townhomes, HOA master plans', ['HOA packets', 'Cul-de-sac staging', 'I-575 peaks'], ['woodstock'], 'Collect HOA rules before survey final; avoid peak school windows when possible.'),
      z('canton', 'Canton seat & core', 'Canton', ['Canton', 'downtown edges'], 'SFH, multi-story older stock, mixed density', ['Street width', 'Mixed access'], ['canton'], 'Inventory stairs on older stock; confirm staging near seat arterials.'),
      z('holly-springs', 'Holly Springs / Towne Lake patterns', 'Holly Springs', ['Holly Springs', 'Towne Lake edges'], 'Planned SFH, townhomes', ['Gate lists', 'HOA hours'], ['holly springs', 'towne lake'], 'Gate codes and weekday windows often beat weekend assumptions.'),
      z('north-edge', 'North Cherokee rural edge', 'North edge', ['Waleska edges', 'northern towns'], 'Larger lots, longer approaches', ['Empty miles', 'Soft shoulders'], ['waleska'], 'Photo approaches; confirm road conditions on growth-edge mud weeks.'),
    ],
    specialized: [
      s('hoa-growth', 'HOA subdivision logistics', 'Master-plan rules are first-class cost drivers.', ['Collect COI and gate lists early.', 'Confirm truck size limits before load day.']),
      s('i575-freeflow', 'I-575 north-collar freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Fulton tower rates for Woodstock driveways.']),
      s('family-sfh', 'Family multi-bedroom SFH peak', 'School-calendar inventories dominate summer.', ['Packing help and Saturday supply matter more than elevators.', 'Book early May–August.']),
    ],
    schoolsIntro: 'Cherokee families compare Cherokee County School District feeders across Woodstock, Canton, and Holly Springs — verify boundaries; do not assume Fulton or Cobb maps apply.',
    hospitalsDetail: 'Northside Hospital Cherokee and regional clinics anchor acute care; map peak freeflow on I-575, not only off-hour freeflow.',
    costIntro: 'Empty miles, HOA soft costs, and I-575 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than intown corporate calendars alone.',
  },
  {
    file: 'forsyth-tier2.ts',
    exportName: 'forsythCountyTier2Intelligence',
    slug: 'forsyth',
    hubTitle: 'Forsyth County Moving Intelligence Hub',
    eyebrow: 'Forsyth · North Atlanta collar · Cumming / Lanier · vs Fulton',
    h1: 'Moving in Forsyth County: Cumming, Lake Lanier Edge & GA-400 North Growth',
    heroOpener:
      'Forsyth County is north Atlanta’s GA-400 growth collar — Cumming seat density, Lake Lanier-edge approaches, top-growth HOA subdivisions, and freeflow that still peaks hard toward Alpharetta and the Perimeter. It is not Fulton intown product and not Cherokee’s I-575 pattern: expect GA-400 commute clocks, lake last-mile on some edges, and affluent planned-community packets. This guide is for people moving in Forsyth as north-collar GA-400 product — not a Fulton rename.',
    heroCredibility:
      'GA-400 north growth · Lake Lanier edge · HOA density · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'GA-400 · GA-20 · GA-141 · US-19 · McFarland Pkwy',
    parentLabel: 'Fulton County (and Gwinnett northeast patterns)',
    parentHref: '/local-movers/georgia/fulton',
    compareIntro:
      'Forsyth is GA-400 / Cumming north-collar growth with Lanier-edge product — not Fulton towers and not Gwinnett I-85 diversity core alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Fulton north crews fight GA-400 and Perimeter chokes. Forsyth pairs ride GA-400, GA-20, and McFarland corridors — freer mid-day further north, still peak-heavy on Cumming ↔ Alpharetta freeflow and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Fulton mixes towers and north-Fulton estates. Forsyth skews Cumming growth SFH, lake-edge homes, and high-HOA planned villages — more continuous top-growth HOA product, less continuous Midtown multi-family.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Gate lists and HOA hours dominate; lake approaches can add narrow roads and seasonal staging uncommon on pure Alpharetta office-park days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Forsyth quotes often sit at premium north-collar rates for comparable SFH when access is clean — HOA soft costs and GA-400 peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Forsyth is GA-400 top-growth north collar with Lanier edge — not Fulton core and not Cherokee I-575 renamed.',
      },
    ],
    whatIntro: 'GA-400 freeflow, Lanier edges, and premium HOA growth — not a Fulton or Cherokee clone.',
    whatBullets: [
      {
        title: 'GA-400 commute clocks are billable',
        detail: 'Cumming ↔ Perimeter pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Top-growth HOA density is first-class product',
        detail: 'COI, gates, and truck limits are standard on planned villages.',
      },
      {
        title: 'Lake Lanier edges rewrite truck size',
        detail: 'Some approaches need smaller trucks and photo last-mile.',
      },
      {
        title: 'Cross-county north-metro pairs are routine',
        detail: 'Forsyth ↔ Fulton, Gwinnett, or Hall is common — clarify freeflow assumptions.',
      },
    ],
    zonesHeading: 'Forsyth zones: Cumming seat, south GA-400 growth, Lanier edge & west/rural pockets',
    zonesIntro: 'Two to four sharp products under one GA-400 north-collar label.',
    zones: [
      z('cumming', 'Cumming seat & core', 'Cumming', ['Cumming', 'seat neighborhoods'], 'SFH, townhomes, mixed density', ['Arterial timing', 'HOA packets'], ['cumming'], 'Confirm driveway and HOA hours; price school-zone peaks.'),
      z('south-400', 'South Forsyth / GA-400 growth', 'South Forsyth', ['south growth villages', 'GA-400 edges'], 'Planned SFH, townhomes', ['Gate lists', 'Commute peaks'], ['south forsyth'], 'Collect COI early; avoid GA-400 peaks when possible.'),
      z('lanier', 'Lake Lanier edge', 'Lanier edge', ['lake approaches', 'Lanier-adjacent streets'], 'SFH, some seasonal access constraints', ['Narrow roads', 'Last-mile width'], ['lake lanier'], 'Photo approaches; confirm truck size before survey final.'),
      z('west-rural', 'West / rural-edge pockets', 'West edge', ['western towns', 'larger lots'], 'Larger lots, longer approaches', ['Empty miles', 'Soft shoulders'], ['forsyth west'], 'Photo last-mile; mud weeks after storms need flexibility.'),
    ],
    specialized: [
      s('ga400', 'GA-400 north-collar freeflow', 'Commute peaks dominate pricing math.', ['Price portal-to-portal honestly.', 'Do not quote Fulton elevator rates for Cumming driveways.']),
      s('hoa-premium', 'Premium HOA growth logistics', 'Planned villages treat COI as default.', ['Gate lists and truck limits early.', 'Weekday windows often beat Saturdays.']),
      s('lanier-edge', 'Lake Lanier edge access', 'Last-mile width changes truck type.', ['Photo approaches before final quote.', 'Seasonal parking can tighten lake streets.']),
    ],
    schoolsIntro: 'Forsyth families compare Forsyth County Schools feeders across Cumming and south growth villages — verify boundaries; north-collar reputation does not replace district maps.',
    hospitalsDetail: 'Northside Hospital Forsyth and regional clinics anchor acute care; map peak freeflow on GA-400 corridors.',
    costIntro: 'GA-400 peaks, HOA soft costs, and lake last-mile often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than intown corporate peaks alone.',
  },
  {
    file: 'henry-tier2.ts',
    exportName: 'henryCountyTier2Intelligence',
    slug: 'henry',
    hubTitle: 'Henry County Moving Intelligence Hub',
    eyebrow: 'Henry · South Atlanta collar · McDonough / Stockbridge · vs Clayton',
    h1: 'Moving in Henry County: McDonough, Stockbridge & I-75 South Growth',
    heroOpener:
      'Henry County is south Atlanta’s I-75 growth collar — McDonough seat density, Stockbridge multi-family and SFH mix, Hampton and logistics-adjacent residential, and freeflow that is not Clayton airport-core product. Expect longer empty miles than inner-south Fulton, HOA growth villages, and warehouse-corridor peaks that rewrite “local” pairs. This guide is for people moving in Henry as south-metro I-75 growth — not a Clayton rename and not a Fayette planned-community script.',
    heroCredibility:
      'I-75 south growth · Logistics/residential mix · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-75 · I-675 · US-23 · GA-20 · GA-155',
    parentLabel: 'Clayton County (and Fulton south patterns)',
    parentHref: '/local-movers/georgia/clayton',
    compareIntro:
      'Henry is I-75 south growth collar with logistics-adjacent residential — not Clayton airport multi-family core and not Fayette golf-cart planned city alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Clayton crews fight I-75/I-285 airport peaks. Henry pairs ride I-75 further south, I-675, and GA-20 — freer mid-day south of the airport choke, still peak-heavy on McDonough ↔ Stockbridge and warehouse-shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Clayton mixes airport-adjacent multi-family and older corridors. Henry mixes McDonough seat SFH, Stockbridge multi-family, Hampton growth, and logistics-edge homes — more continuous outer-south HOA product, less continuous airport multi-unit density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Growth HOAs need COI packets; industrial-adjacent streets can add truck traffic timing uncommon on pure residential Fayette days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Henry quotes often sit at south-collar suburban rates for driveway SFH — empty miles and logistics-corridor peaks still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Henry is I-75 south growth and logistics/residential mix — not Clayton airport rename and not Fayette planned Peachtree City product.',
      },
    ],
    whatIntro: 'I-75 south freeflow, logistics adjacency, and growth HOAs — not a Clayton clone.',
    whatBullets: [
      {
        title: 'I-75 south freeflow is still billable',
        detail: 'McDonough ↔ Stockbridge pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Logistics corridors rewrite timing',
        detail: 'Warehouse-shift windows can choke arterials near residential growth edges.',
      },
      {
        title: 'Growth HOA product is first-class',
        detail: 'Gate lists and COI packets dominate new villages.',
      },
      {
        title: 'Distinct from Fayette planned-city logistics',
        detail: 'Henry is not golf-cart path geometry — do not recycle Peachtree City playbooks.',
      },
    ],
    zonesHeading: 'Henry zones: McDonough seat, Stockbridge mix, Hampton growth & logistics-edge residential',
    zonesIntro: 'Two to four sharp products under one I-75 south-collar label.',
    zones: [
      z('mcdonough', 'McDonough seat & core', 'McDonough', ['McDonough', 'seat neighborhoods'], 'SFH, townhomes, mixed stock', ['Arterial timing', 'HOA packets'], ['mcdonough'], 'Confirm driveway and HOA hours; price I-75 peaks.'),
      z('stockbridge', 'Stockbridge multi-family & SFH mix', 'Stockbridge', ['Stockbridge', 'multi-family clusters'], 'SFH, apartments, townhomes', ['Building COIs', 'Mixed access'], ['stockbridge'], 'Collect management packets on multi-family; inventory elevators.'),
      z('hampton', 'Hampton growth edge', 'Hampton', ['Hampton', 'growth villages'], 'Planned SFH, townhomes', ['Gate lists', 'Empty miles'], ['hampton'], 'Photo last-mile on new streets; confirm gate rules.'),
      z('logistics-edge', 'Logistics-adjacent residential', 'Logistics edge', ['I-75 industrial edges', 'warehouse-adjacent homes'], 'SFH near industrial freeflow', ['Truck traffic timing', 'Peak shifts'], ['henry logistics'], 'Avoid warehouse-shift peaks when possible; price portal-to-portal.'),
    ],
    specialized: [
      s('i75-south', 'I-75 south growth freeflow', 'Outer-south pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Clayton airport multi-family rates for McDonough driveways.']),
      s('logistics-mix', 'Logistics/residential corridor mix', 'Industrial freeflow meets HOA villages.', ['Time loads away from shift changes when possible.', 'Confirm street width near industrial edges.']),
      s('growth-hoa', 'South-collar HOA growth logistics', 'New villages treat COI as default.', ['Gate lists early.', 'Mud weeks on new construction need flexibility.']),
    ],
    schoolsIntro: 'Henry families compare Henry County Schools feeders across McDonough, Stockbridge, and Hampton — verify boundaries; do not assume Clayton maps apply.',
    hospitalsDetail: 'Piedmont Henry Hospital and regional clinics anchor acute care; map peak freeflow on I-75 south corridors.',
    costIntro: 'I-75 peaks, logistics timing, and HOA soft costs often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than airport cargo calendars alone.',
  },
  {
    file: 'fayette-tier2.ts',
    exportName: 'fayetteCountyTier2Intelligence',
    slug: 'fayette',
    hubTitle: 'Fayette County Moving Intelligence Hub',
    eyebrow: 'Fayette · South Atlanta · Peachtree City / Fayetteville · vs Fulton',
    h1: 'Moving in Fayette County: Peachtree City Paths, Fayetteville Seat & South-Metro Planned Living',
    heroOpener:
      'Fayette County is south-metro planned-community product — Peachtree City golf-cart path geometry and master-plan rules, Fayetteville seat density, and freeflow that is not Henry’s I-75 logistics mix and not Fulton intown elevators. Expect HOA packets, path-adjacent staging quirks, and longer empty miles from inside the Perimeter. This guide is for people moving in Fayette as distinct south-metro planned living — not a Henry rename and not a Clayton airport script.',
    heroCredibility:
      'Peachtree City planned logistics · South-metro HOAs · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'GA-54 · GA-74 · GA-85 · I-85 (west approaches) · US-29 approaches',
    parentLabel: 'Fulton County (and Clayton south patterns)',
    parentHref: '/local-movers/georgia/fulton',
    compareIntro:
      'Fayette is Peachtree City / Fayetteville planned south-metro product — not Fulton towers and not Henry I-75 logistics collar alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Fulton crews fight intown peaks; Henry rides I-75 south. Fayette pairs ride GA-54, GA-74, and south-metro arterials — freer mid-day off the I-75 warehouse spine, still peak-heavy on school and Peachtree City internal freeflow.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Henry mixes logistics-edge SFH and Stockbridge multi-family. Fayette mixes Peachtree City planned SFH, path-network geometry, and Fayetteville seat stock — more continuous master-plan product, less warehouse-adjacent residential.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Planned-community COIs dominate; path-city streets and cul-de-sacs can reject full trailers more often than open I-75 corridor lots.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Fayette quotes often sit at premium south-metro planned rates for clean driveway SFH — HOA soft costs and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Fayette is planned south-metro Peachtree City / Fayetteville product — not Henry I-75 growth renamed.',
      },
    ],
    whatIntro: 'Golf-cart path city logistics, planned HOAs, and south-metro freeflow — not a Henry clone.',
    whatBullets: [
      {
        title: 'Peachtree City path geometry is first-class product',
        detail: 'Street width, path adjacency, and HOA rules rewrite truck size more than map miles suggest.',
      },
      {
        title: 'Planned-community COIs dominate',
        detail: 'Gate lists and weekday windows are standard.',
      },
      {
        title: 'Distinct from Henry logistics mix',
        detail: 'Do not recycle warehouse-corridor timing playbooks for path-city days.',
      },
      {
        title: 'Empty miles from intown staging are billable',
        detail: 'Perimeter-origin crews understate portal time if they quote Fulton rates.',
      },
    ],
    zonesHeading: 'Fayette zones: Peachtree City paths, Fayetteville seat, Tyrone edge & south rural pockets',
    zonesIntro: 'Two to four sharp products under one planned south-metro label.',
    zones: [
      z('ptc', 'Peachtree City path & master-plan core', 'Peachtree City', ['Peachtree City', 'path villages'], 'Planned SFH, townhomes', ['HOA packets', 'Path geometry', 'Truck limits'], ['peachtree city'], 'Collect HOA rules; photo street width; confirm truck size early.'),
      z('fayetteville', 'Fayetteville seat & core', 'Fayetteville', ['Fayetteville', 'seat neighborhoods'], 'SFH, mixed stock', ['Arterial timing'], ['fayetteville'], 'Confirm driveway staging; price school peaks.'),
      z('tyrone', 'Tyrone edge corridors', 'Tyrone', ['Tyrone', 'west edges'], 'SFH, planned pockets', ['Empty miles', 'HOA packets'], ['tyrone'], 'Photo last-mile; confirm gate codes.'),
      z('south-rural', 'South rural-edge pockets', 'South edge', ['southern towns', 'larger lots'], 'Larger lots, longer approaches', ['Empty miles', 'Soft shoulders'], ['fayette south'], 'Photo approaches after rain; allow empty-mile buffer.'),
    ],
    specialized: [
      s('ptc-paths', 'Peachtree City path-city logistics', 'Master-plan geometry rewrites truck type.', ['Photo street width before final quote.', 'HOA truck limits early.']),
      s('planned-hoa', 'South-metro planned HOA packets', 'COI and gate lists are default.', ['Weekday windows often beat Saturdays.', 'Collect rules before survey final.']),
      s('vs-henry', 'Distinct from I-75 logistics collars', 'Fayette is not warehouse-edge residential.', ['Do not price like McDonough industrial freeflow.', 'Path-city last-mile is the differentiator.']),
    ],
    schoolsIntro: 'Fayette families compare Fayette County Schools feeders across Peachtree City and Fayetteville — verify boundaries; planned-community reputation does not replace district maps.',
    hospitalsDetail: 'Piedmont Fayette Hospital and regional clinics anchor acute care; map peak freeflow on GA-54/GA-74 corridors.',
    costIntro: 'HOA soft costs, path-city access, and empty miles often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than logistics-shift calendars alone.',
  },
  {
    file: 'douglas-tier2.ts',
    exportName: 'douglasCountyTier2Intelligence',
    slug: 'douglas',
    hubTitle: 'Douglas County Moving Intelligence Hub',
    eyebrow: 'Douglas · West Atlanta · Douglasville · vs Cobb',
    h1: 'Moving in Douglas County: Douglasville, I-20 West Corridor & West-Metro Suburbs',
    heroOpener:
      'Douglas County is west Atlanta’s I-20 corridor market — Douglasville seat density, west-metro HOA and SFH growth, and freeflow that is not Cobb’s I-75/Cumberland multi-family core. Expect longer empty miles from intown staging, I-20 peak clocks, and residential product that sits west of the Perimeter without Cobb’s continuous northwest density. This guide is for people moving in Douglas as west-metro I-20 product — not a Cobb rename.',
    heroCredibility:
      'I-20 west corridor · West-metro suburbs · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-20 · GA-5 · GA-92 · US-78 · Chapel Hill Road corridors',
    parentLabel: 'Cobb County (and Fulton west patterns)',
    parentHref: '/local-movers/georgia/cobb',
    compareIntro:
      'Douglas is I-20 west Douglasville product — not Cobb Marietta/Cumberland multi-family density and not Fulton intown elevators alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Cobb crews fight I-75 and East-West Connector peaks. Douglas pairs ride I-20 west, GA-5, and west arterials — freer mid-day further west, still peak-heavy on Douglasville commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Cobb mixes East Cobb estates and Smyrna multi-family. Douglas mixes Douglasville SFH, west HOA villages, and longer-lot edges — more continuous west-corridor suburban product, less continuous Cumberland multi-unit density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets appear on growth villages; older Douglasville stock can add street-width constraints uncommon on pure cul-de-sac East Cobb days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Douglas quotes often sit at west-collar suburban rates for driveway SFH — empty miles from intown staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Douglas is west-metro I-20 Douglasville product — not Cobb northwest rename.',
      },
    ],
    whatIntro: 'I-20 west freeflow, west-metro HOAs, and empty miles — not a Cobb clone.',
    whatBullets: [
      {
        title: 'I-20 west freeflow is billable',
        detail: 'Douglasville ↔ intown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'West-metro HOA growth is first-class',
        detail: 'COI and gate lists on new villages are standard.',
      },
      {
        title: 'Distinct from Paulding US-278 growth',
        detail: 'Douglas is I-20 west seat density — not Hiram/Dallas northwest growth alone.',
      },
      {
        title: 'Empty miles from Perimeter staging matter',
        detail: 'Do not quote pure Cobb local rates for west-corridor deadhead.',
      },
    ],
    zonesHeading: 'Douglas zones: Douglasville seat, I-20 growth villages, west edges & rural pockets',
    zonesIntro: 'Two to four sharp products under one I-20 west-collar label.',
    zones: [
      z('douglasville', 'Douglasville seat & core', 'Douglasville', ['Douglasville', 'seat neighborhoods'], 'SFH, multi-story older stock, townhomes', ['Street width', 'Arterial timing'], ['douglasville'], 'Inventory older multi-story; plan temporary no-parking where needed.'),
      z('i20-growth', 'I-20 corridor growth villages', 'I-20 growth', ['growth HOAs', 'corridor villages'], 'Planned SFH, townhomes', ['HOA packets', 'I-20 peaks'], ['douglas growth'], 'Collect COI early; avoid peak I-20 windows when possible.'),
      z('west-edges', 'West Douglas edges', 'West edges', ['western neighborhoods', 'larger lots'], 'SFH, longer approaches', ['Empty miles'], ['douglas west'], 'Photo last-mile; price empty miles honestly.'),
      z('rural', 'Rural-edge pockets', 'Rural edge', ['southern/western rural towns'], 'Larger lots, rural approaches', ['Soft shoulders', 'Empty miles'], ['douglas rural'], 'Photo approaches after rain.'),
    ],
    specialized: [
      s('i20-west', 'I-20 west corridor freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Cobb Cumberland rates for Douglasville driveways.']),
      s('west-hoa', 'West-metro HOA growth', 'Planned villages treat COI as default.', ['Gate lists early.', 'Weekday windows often beat Saturdays.']),
      s('seat-access', 'Douglasville seat access', 'Older stock needs stair inventories.', ['Confirm street width.', 'Temporary no-parking often beats long carries.']),
    ],
    schoolsIntro: 'Douglas families compare Douglas County Schools feeders across Douglasville and growth villages — verify boundaries; do not assume Cobb maps apply.',
    hospitalsDetail: 'Wellstar Douglas Hospital and regional clinics anchor acute care; map peak freeflow on I-20 west corridors.',
    costIntro: 'I-20 peaks, empty miles, and HOA soft costs often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than northwest Cobb corporate peaks alone.',
  },
  {
    file: 'coweta-tier2.ts',
    exportName: 'cowetaCountyTier2Intelligence',
    slug: 'coweta',
    hubTitle: 'Coweta County Moving Intelligence Hub',
    eyebrow: 'Coweta · Southwest Atlanta · Newnan / Senoia · vs Fulton',
    h1: 'Moving in Coweta County: Newnan, Senoia & I-85 South Outer Collar',
    heroOpener:
      'Coweta County is southwest Atlanta’s outer I-85 growth collar — Newnan seat density, Senoia and film-adjacent residential pockets, longer empty miles from the Perimeter, and freeflow that is not Fulton intown product. Expect HOA growth villages, small-city multi-story stock, and outer-collar portal times that map miles understate. This guide is for people moving in Coweta as SW-metro I-85 growth — not a Fulton rename.',
    heroCredibility:
      'I-85 south outer collar · Film/residential mix · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-85 · US-29 · GA-34 · GA-16 · GA-154 approaches',
    parentLabel: 'Fulton County',
    parentHref: '/local-movers/georgia/fulton',
    compareIntro:
      'Coweta is Newnan / Senoia I-85 south outer collar — not Fulton towers and not pure inner-south Fulton multi-family alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Fulton crews fight Connector and intown peaks. Coweta pairs ride I-85 south, GA-34, and Newnan arterials — freer mid-day further southwest, still peak-heavy on Newnan commute and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Fulton mixes towers and south-Fulton stock. Coweta mixes Newnan multi-story and SFH, Senoia village/film-edge homes, and growth HOAs — more continuous outer SW collar product, less continuous intown elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Growth HOAs need COI packets; historic Newnan and Senoia streets can need smaller trucks more often than pure master-plan cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Coweta quotes often sit at outer-collar rates for driveway SFH — empty miles from intown staging push premiums vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Coweta is SW Atlanta I-85 outer collar with film/residential mix — not Fulton core renamed.',
      },
    ],
    whatIntro: 'Outer I-85 freeflow, Newnan seat stock, and film-edge villages — not a Fulton clone.',
    whatBullets: [
      {
        title: 'I-85 south freeflow is billable',
        detail: 'Newnan ↔ Perimeter pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Film/residential pockets rewrite calendars',
        detail: 'Senoia-area production and tourism windows can tighten small-town staging.',
      },
      {
        title: 'Outer-collar empty miles are first-class',
        detail: 'Do not quote pure Fulton local rates for Newnan deadhead.',
      },
      {
        title: 'Growth HOA product is common',
        detail: 'COI and gate lists on new villages are standard.',
      },
    ],
    zonesHeading: 'Coweta zones: Newnan seat, Senoia film/village edge, I-85 growth villages & rural west',
    zonesIntro: 'Two to four sharp products under one SW outer-collar label.',
    zones: [
      z('newnan', 'Newnan seat & core', 'Newnan', ['Newnan', 'downtown edges'], 'Multi-story, SFH, mixed stock', ['Street width', 'Stairs', 'Arterial timing'], ['newnan'], 'Inventory stairs on older stock; plan temporary no-parking.'),
      z('senoia', 'Senoia film & village edge', 'Senoia', ['Senoia', 'village approaches'], 'Village SFH, film-adjacent stock', ['Narrow streets', 'Tourism/production windows'], ['senoia'], 'Photo street width; book around known production peaks when relevant.'),
      z('i85-growth', 'I-85 growth villages', 'I-85 growth', ['growth HOAs', 'corridor villages'], 'Planned SFH, townhomes', ['HOA packets', 'I-85 peaks'], ['coweta growth'], 'Collect COI early; price portal-to-portal toward Atlanta.'),
      z('rural-west', 'Rural west & larger lots', 'Rural west', ['western towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['coweta west'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i85-outer', 'I-85 south outer-collar freeflow', 'Longer empty miles still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Fulton elevator rates for Newnan driveways.']),
      s('film-village', 'Senoia film/village logistics', 'Small-town geometry rewrites truck size.', ['Photo approaches.', 'Production windows can tighten curb plans.']),
      s('growth-hoa', 'Outer SW HOA growth', 'Planned villages treat COI as default.', ['Gate lists early.', 'Mud weeks on new streets need flexibility.']),
    ],
    schoolsIntro: 'Coweta families compare Coweta County Schools feeders across Newnan and growth villages — verify boundaries; outer-collar reputation does not replace district maps.',
    hospitalsDetail: 'Piedmont Newnan Hospital and regional clinics anchor acute care; map peak freeflow on I-85 south corridors.',
    costIntro: 'Empty miles, HOA soft costs, and I-85 peaks often matter more than raw miles.',
    seasonalIntro: 'School years, summer closings, and occasional production calendars reshape demand more than intown corporate peaks alone.',
  },
  {
    file: 'hall-tier2.ts',
    exportName: 'hallCountyTier2Intelligence',
    slug: 'hall',
    hubTitle: 'Hall County Moving Intelligence Hub',
    eyebrow: 'Hall · Northeast · Gainesville / Lanier · vs Gwinnett',
    h1: 'Moving in Hall County: Gainesville, Lake Lanier Edge & I-985 Manufacturing Corridor',
    heroOpener:
      'Hall County is northeast Georgia’s I-985 independent-leaning hub — Gainesville multi-story and manufacturing-adjacent residential, Lake Lanier edge living, and freeflow that is not Gwinnett’s I-85 diversity core. Expect longer empty miles from Atlanta staging, poultry/manufacturing corridor peaks, and lake last-mile on some edges. This guide is for people moving in Hall as Gainesville / Lanier product — not a Gwinnett rename.',
    heroCredibility:
      'I-985 corridor · Manufacturing + lake residential · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-985 · US-129 · GA-365 · GA-53 · Spout Springs Road',
    parentLabel: 'Gwinnett County',
    parentHref: '/local-movers/georgia/gwinnett',
    compareIntro:
      'Hall is Gainesville / Lanier I-985 product with manufacturing adjacency — not Gwinnett I-85 multi-family and HOA density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Gwinnett crews fight I-85 and 316 peaks. Hall pairs ride I-985, US-129, and Gainesville arterials — freer mid-day northeast of Gwinnett cores, still peak-heavy on manufacturing-shift and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Gwinnett mixes diverse multi-family and dense HOAs. Hall mixes Gainesville multi-story, manufacturing-edge SFH, and Lanier-edge homes — more continuous secondary-hub product, less continuous I-85 apartment density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; lake approaches can add narrow roads uncommon on pure Suwanee cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Hall quotes often sit at secondary NE-metro rates for driveway SFH — empty miles from Atlanta staging and lake last-mile still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Hall is Gainesville manufacturing + Lanier residential hub — not Gwinnett renamed.',
      },
    ],
    whatIntro: 'I-985 freeflow, manufacturing calendars, and Lanier edges — not a Gwinnett clone.',
    whatBullets: [
      {
        title: 'Manufacturing-shift windows rewrite arterials',
        detail: 'Industrial freeflow can choke residential pairs at shift change.',
      },
      {
        title: 'Gainesville multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Lake Lanier edges rewrite truck size',
        detail: 'Photo last-mile on lake approaches.',
      },
      {
        title: 'Empty miles from Atlanta staging are billable',
        detail: 'Do not quote pure Gwinnett local rates for Gainesville deadhead.',
      },
    ],
    zonesHeading: 'Hall zones: Gainesville core, I-985 growth, Lanier edge & rural north/east',
    zonesIntro: 'Two to four sharp products under one I-985 hub label.',
    zones: [
      z('gainesville', 'Gainesville city core', 'Gainesville', ['Gainesville', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['gainesville'], 'Inventory stairs; plan temporary no-parking.'),
      z('i985-growth', 'I-985 growth villages', 'I-985 growth', ['growth HOAs', 'corridor villages'], 'Planned SFH, townhomes', ['HOA packets', 'Corridor peaks'], ['hall growth'], 'Collect COI early; price portal-to-portal toward Gwinnett.'),
      z('lanier', 'Lake Lanier edge', 'Lanier edge', ['lake approaches', 'Lanier-adjacent streets'], 'SFH, some seasonal constraints', ['Narrow roads', 'Last-mile width'], ['lake lanier hall'], 'Photo approaches; confirm truck size early.'),
      z('rural', 'Rural north/east pockets', 'Rural edge', ['northern/eastern towns'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['hall rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i985', 'I-985 manufacturing corridor freeflow', 'Shift windows rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Avoid peak industrial windows when possible.']),
      s('gainesville-city', 'Gainesville multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('lanier-edge', 'Lake Lanier edge logistics', 'Last-mile width changes truck type.', ['Photo approaches before final quote.', 'Seasonal parking can tighten lake streets.']),
    ],
    schoolsIntro: 'Hall families compare Hall County and Gainesville City Schools feeders — verify boundaries; do not assume Gwinnett maps apply.',
    hospitalsDetail: 'Northeast Georgia Medical Center and regional clinics anchor acute care; map peak freeflow on I-985 and Gainesville arterials.',
    costIntro: 'Manufacturing peaks, city access, and lake last-mile often matter more than raw miles.',
    seasonalIntro: 'School years, industrial calendars, and summer lake living reshape demand more than pure Gwinnett HOA peaks alone.',
  },
  {
    file: 'paulding-tier2.ts',
    exportName: 'pauldingCountyTier2Intelligence',
    slug: 'paulding',
    hubTitle: 'Paulding County Moving Intelligence Hub',
    eyebrow: 'Paulding · West Atlanta · Hiram / Dallas · vs Cobb',
    h1: 'Moving in Paulding County: Hiram, Dallas & US-278 West-Northwest Growth',
    heroOpener:
      'Paulding County is west-northwest Atlanta’s outer growth collar — Hiram retail corridors, Dallas seat density, US-278 freeflow, and longer empty miles that are not Cobb’s continuous Marietta multi-family core. Expect HOA growth villages, school-calendar SFH volume, and portal times that map miles understate. This guide is for people moving in Paulding as west-northwest growth — not a Cobb rename.',
    heroCredibility:
      'US-278 west-northwest growth · Outer collar HOAs · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-278 · GA-61 · GA-92 · GA-120 approaches · I-20 (south approaches)',
    parentLabel: 'Cobb County',
    parentHref: '/local-movers/georgia/cobb',
    compareIntro:
      'Paulding is Hiram / Dallas west-northwest outer growth — not Cobb East Cobb estates or Cumberland multi-family alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Cobb crews fight I-75 and East-West Connector peaks. Paulding pairs ride US-278, GA-61, and outer arterials — freer mid-day further west-northwest, still peak-heavy on Hiram ↔ Dallas and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Cobb mixes dense northwest multi-family and East Cobb lots. Paulding mixes Hiram growth SFH, Dallas seat stock, and larger-lot edges — more continuous outer-collar HOA product, less continuous Cumberland elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Growth HOAs need COI packets; rural-edge approaches add empty miles uncommon on pure Marietta multi-family days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Paulding quotes often sit at outer west-collar rates for driveway SFH — empty miles from Cobb staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Paulding is west-northwest outer growth on US-278 — not Cobb renamed.',
      },
    ],
    whatIntro: 'US-278 freeflow, outer HOA growth, and empty miles — not a Cobb clone.',
    whatBullets: [
      {
        title: 'US-278 freeflow is billable',
        detail: 'Hiram ↔ Dallas pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Outer-collar HOA growth is first-class',
        detail: 'COI and gate lists on new villages are standard.',
      },
      {
        title: 'Distinct from Douglas I-20 west',
        detail: 'Paulding is US-278 northwest growth — not Douglasville I-20 seat alone.',
      },
      {
        title: 'Empty miles from Cobb staging matter',
        detail: 'Do not quote pure Cobb local rates for Paulding deadhead.',
      },
    ],
    zonesHeading: 'Paulding zones: Dallas seat, Hiram corridors, growth villages & rural west',
    zonesIntro: 'Two to four sharp products under one west-northwest growth label.',
    zones: [
      z('dallas', 'Dallas seat & core', 'Dallas', ['Dallas', 'seat neighborhoods'], 'SFH, mixed stock', ['Arterial timing'], ['dallas ga'], 'Confirm driveway staging; price school peaks.'),
      z('hiram', 'Hiram retail & growth corridors', 'Hiram', ['Hiram', 'corridor villages'], 'SFH, townhomes, retail-adjacent', ['Arterial timing', 'HOA packets'], ['hiram'], 'Avoid peak retail windows; collect HOA rules on growth streets.'),
      z('growth', 'West-northwest growth villages', 'Growth villages', ['planned HOAs', 'new villages'], 'Planned SFH, townhomes', ['Gate lists', 'Mud weeks'], ['paulding growth'], 'Photo last-mile on new streets; COI early.'),
      z('rural-west', 'Rural west & larger lots', 'Rural west', ['western towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['paulding west'], 'Photo approaches after rain.'),
    ],
    specialized: [
      s('us278', 'US-278 west-northwest freeflow', 'Outer pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Cobb Cumberland rates for Hiram driveways.']),
      s('growth-hoa', 'Outer HOA growth logistics', 'Planned villages treat COI as default.', ['Gate lists early.', 'Mud weeks need flexibility.']),
      s('empty-miles', 'Outer-collar empty miles', 'Deadhead rewrites hourly math.', ['Clarify staging location before deposit.', 'Photo rural last-mile.']),
    ],
    schoolsIntro: 'Paulding families compare Paulding County Schools feeders across Dallas and Hiram — verify boundaries; do not assume Cobb maps apply.',
    hospitalsDetail: 'Wellstar Paulding Hospital and regional clinics anchor acute care; map peak freeflow on US-278 corridors.',
    costIntro: 'Empty miles, HOA soft costs, and corridor peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than northwest Cobb corporate peaks alone.',
  },
  {
    file: 'columbia-tier2.ts',
    exportName: 'columbiaCountyGaTier2Intelligence',
    slug: 'columbia',
    hubTitle: 'Columbia County Moving Intelligence Hub',
    eyebrow: 'Columbia · Augusta north collar · Evans / Martinez · vs Richmond',
    h1: 'Moving in Columbia County: Evans, Martinez & CSRA North-Collar Suburbs',
    heroOpener:
      'Columbia County is Augusta’s north CSRA collar — Evans and Martinez planned suburbs, HOA growth villages, and freeflow that is not Richmond’s Augusta core multi-story and medical corridors alone. Expect longer empty miles into downtown Augusta peaks, school-focused SFH volume, and north-collar product that should not recycle Augusta intown playbooks. This guide is for people moving in Columbia as CSRA north suburbs — not a Richmond rename.',
    heroCredibility:
      'CSRA north collar · Evans / Martinez HOAs · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-20 · Washington Road · Belair Road · Furys Ferry Road · Columbia Road corridors',
    parentLabel: 'Richmond County',
    parentHref: '/local-movers/georgia/richmond',
    compareIntro:
      'Columbia is Evans / Martinez CSRA north-collar suburbs — not Augusta core multi-story and medical freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Richmond crews fight Augusta intown peaks and I-520 approaches. Columbia pairs ride Washington/Belair-style north arterials and I-20 approaches — freer mid-day in planned suburbs, still peak-heavy on Evans ↔ Augusta commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Richmond mixes Augusta multi-story and older corridors. Columbia mixes Evans/Martinez planned SFH, HOA villages, and growth edges — more continuous north-collar suburban product, less continuous downtown multi-unit density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA COIs and cul-de-sac staging dominate more often than Augusta historic street permits.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Columbia quotes often sit at CSRA suburban rates for driveway SFH — empty miles into Augusta core still push premiums on cross-county pairs.',
      },
      {
        title: 'Role difference',
        detail:
          'Columbia is Augusta north-collar suburbs — not Richmond Augusta core renamed.',
      },
    ],
    whatIntro: 'North-collar HOAs, Evans/Martinez freeflow, and CSRA commute clocks — not an Augusta core clone.',
    whatBullets: [
      {
        title: 'HOA growth villages dominate family volume',
        detail: 'COI and gate lists are standard on Evans/Martinez product.',
      },
      {
        title: 'Augusta-core pairs still peak hard',
        detail: 'Cross-county medical and job pairs need portal-to-portal pricing.',
      },
      {
        title: 'Distinct from Richmond intown access',
        detail: 'Do not recycle historic Augusta street playbooks for cul-de-sac days.',
      },
      {
        title: 'SC adjacency creates interstate legs',
        detail: 'Aiken and border addresses need FMCSA authority.',
      },
    ],
    zonesHeading: 'Columbia zones: Evans core, Martinez corridors, growth villages & lake/rural edges',
    zonesIntro: 'Two to four sharp products under one CSRA north-collar label.',
    zones: [
      z('evans', 'Evans planned core', 'Evans', ['Evans', 'planned villages'], 'Planned SFH, townhomes', ['HOA packets', 'Cul-de-sac staging'], ['evans'], 'Collect COI early; confirm gate lists.'),
      z('martinez', 'Martinez corridor suburbs', 'Martinez', ['Martinez', 'corridor neighborhoods'], 'SFH, townhomes', ['Arterial timing', 'HOA packets'], ['martinez'], 'Price school and commute peaks; driveway surveys first.'),
      z('growth', 'North growth villages', 'Growth villages', ['new HOAs', 'north edges'], 'Planned SFH', ['Gate lists', 'Mud weeks'], ['columbia ga growth'], 'Photo last-mile on new streets.'),
      z('edges', 'Lake / rural edges', 'Edges', ['lake approaches', 'rural lots'], 'Larger lots, some lake access', ['Last-mile width', 'Empty miles'], ['columbia edges'], 'Photo approaches; confirm truck size.'),
    ],
    specialized: [
      s('north-collar-hoa', 'CSRA north-collar HOA logistics', 'Planned villages treat COI as default.', ['Gate lists early.', 'Weekday windows often beat Saturdays.']),
      s('augusta-pairs', 'Evans/Martinez ↔ Augusta core pairs', 'Cross-county freeflow still peaks hard.', ['Price portal-to-portal honestly.', 'Do not quote Richmond intown rates for Evans driveways.']),
      s('sc-border', 'SC border interstate legs', 'Short-looking hops still need FMCSA.', ['Clarify destination state before deposit.', 'Verify USDOT/MC on interstate quotes.']),
    ],
    schoolsIntro: 'Columbia families compare Columbia County Schools feeders across Evans and Martinez — verify boundaries; do not assume Richmond City maps apply.',
    hospitalsDetail: 'Acute care often routes into Augusta medical campuses plus regional clinics; map peak freeflow on north-collar arterials into Richmond.',
    costIntro: 'HOA soft costs, cross-county peaks, and empty miles often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than Augusta medical-session peaks alone.',
  },
  {
    file: 'houston-tier2.ts',
    exportName: 'houstonCountyGaTier2Intelligence',
    slug: 'houston',
    hubTitle: 'Houston County Moving Intelligence Hub',
    eyebrow: 'Houston · Warner Robins / Robins AFB · Middle GA independent',
    h1: 'Moving in Houston County: Warner Robins, Robins AFB PCS & I-75 Middle Georgia',
    heroOpener:
      'Houston County is Middle Georgia’s military-regional market — Warner Robins multi-family and seat density, Robins AFB PCS calendars, I-75 freeflow, and product that is not a Macon/Bibb rename. Expect orders-driven demand spikes, base-adjacent apartments, and longer empty miles than Atlanta collars. This guide is for people moving in Houston as Warner Robins / Robins AFB product — not Bibb medical-university hub with different labels.',
    heroCredibility:
      'Robins AFB PCS · Warner Robins hub · I-75 middle GA · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-75 · GA-247 · GA-96 · US-41 · Russell Parkway corridors',
    parentLabel: 'independent Middle GA military-regional (vs Bibb / Macon defaults)',
    parentHref: '/local-movers/georgia/bibb',
    compareIntro:
      'Houston is Warner Robins / Robins AFB military-regional product — not Macon multi-story medical/university core alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Bibb crews fight Macon intown peaks and I-16/I-75 approaches. Houston pairs ride I-75, GA-247, and Warner Robins arterials — freer mid-day Middle GA freeflow, still peak-heavy on PCS windows and base-adjacent corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Bibb mixes Macon multi-story and medical corridors. Houston mixes Warner Robins multi-family, base-adjacent apartments, and SFH growth — more continuous PCS turnover product, less continuous university/medical downtown density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Base-adjacent multi-family needs management packets; PCS clusters rewrite calendars more than pure Macon driveway days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Houston quotes often track secondary Middle GA rates for driveway SFH — PCS spikes push multi-family prices up on peak order weeks.',
      },
      {
        title: 'Role difference',
        detail:
          'Houston is Robins AFB military-regional independent — not Bibb Macon renamed.',
      },
    ],
    whatIntro: 'PCS calendars, base multi-family, and I-75 Middle GA freeflow — not a Macon clone.',
    whatBullets: [
      {
        title: 'Robins AFB PCS windows rewrite demand',
        detail: 'Order cycles fill local crews first — book early on peak PCS months.',
      },
      {
        title: 'Base-adjacent multi-family is first-class product',
        detail: 'Elevators, long carries, and building packets need inventories different from pure SFH playbooks.',
      },
      {
        title: 'I-75 freeflow is still billable',
        detail: 'Warner Robins ↔ Macon pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Atlanta collar defaults',
        detail: 'Do not recycle HOA-only north-metro playbooks for PCS multi-family weeks.',
      },
    ],
    zonesHeading: 'Houston zones: Warner Robins core, base-adjacent multi-family, Perry edge & I-75 growth',
    zonesIntro: 'Two to four sharp products under one Middle GA military-regional label.',
    zones: [
      z('warner-robins', 'Warner Robins city core', 'Warner Robins', ['Warner Robins', 'seat neighborhoods'], 'Multi-story, SFH, mixed stock', ['Stairs', 'Street parking'], ['warner robins'], 'Inventory stairs; plan temporary no-parking where needed.'),
      z('base-adjacent', 'Robins AFB adjacent multi-family', 'Base adjacent', ['base approaches', 'apartment corridors'], 'Apartments, multi-family, military-adjacent leases', ['PCS clusters', 'Building COIs'], ['robins afb'], 'Align to PCS windows; collect management packets early.'),
      z('perry', 'Perry edge & south corridors', 'Perry', ['Perry', 'south edges'], 'SFH, mixed stock', ['Empty miles', 'Arterial timing'], ['perry'], 'Price portal-to-portal toward Warner Robins.'),
      z('i75-growth', 'I-75 growth SFH', 'I-75 growth', ['growth villages', 'corridor SFH'], 'Planned SFH, townhomes', ['HOA packets'], ['houston ga growth'], 'Collect COI early on new villages.'),
    ],
    specialized: [
      s('pcs', 'Robins AFB PCS & military-adjacent turnover', 'Order calendars create multi-family clusters.', ['Book early on peak PCS months.', 'Collect elevator windows and building packets.']),
      s('wr-city', 'Warner Robins multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('i75-mid', 'I-75 Middle GA freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Macon medical-campus rates for base apartment weeks.']),
    ],
    schoolsIntro: 'Houston families compare Houston County Schools feeders across Warner Robins and Perry — verify boundaries; PCS households should re-check enrollment timing.',
    hospitalsDetail: 'Houston Healthcare and regional clinics anchor acute care; map peak freeflow on Warner Robins–base corridors.',
    costIntro: 'PCS spikes, multi-family access, and I-75 peaks often matter more than raw miles.',
    seasonalIntro: 'PCS windows and school years reshape demand more than Atlanta HOA calendars alone.',
  },
  {
    file: 'bibb-tier2.ts',
    exportName: 'bibbCountyTier2Intelligence',
    slug: 'bibb',
    hubTitle: 'Bibb County Moving Intelligence Hub',
    eyebrow: 'Bibb · Macon · Middle Georgia hub · independent',
    h1: 'Moving in Bibb County: Macon Hub, Medical/University Corridors & I-75 / I-16 Access',
    heroOpener:
      'Bibb County is Middle Georgia’s independent regional hub — Macon multi-story and historic stock, medical and university corridors, I-75 / I-16 freeflow, and product that does not answer to Atlanta collar defaults. Expect city stairs, longer empty miles to rural edges, and freeflow that is not Warner Robins PCS multi-family alone. This guide is for people moving in Bibb as Macon Middle GA hub — not Houston County renamed and not metro Atlanta recycled.',
    heroCredibility:
      'Macon regional hub · Medical/university · I-75 / I-16 · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-75 · I-16 · US-80 · US-41 · Eisenhower Parkway · Vineville corridors',
    parentLabel: 'independent central GA hub (vs Atlanta collar / Houston AFB defaults)',
    parentHref: '/local-movers/georgia/houston',
    compareIntro:
      'Bibb is Macon medical/university regional hub — not Atlanta HOA collars and not Robins AFB PCS multi-family alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Atlanta collar crews fight Perimeter peaks; Houston rides base corridors. Bibb pairs ride I-75, I-16, and Macon arterials — freer mid-day Middle GA freeflow, still peak-heavy on medical campuses and intown pairs.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Houston mixes base multi-family and Warner Robins SFH. Bibb mixes Macon multi-story, historic streets, medical-corridor stock, and suburban edges — more continuous regional city product, less continuous PCS apartment density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Historic and multi-story stock needs stair inventories; rural Bibb edges add empty miles uncommon on pure base apartment days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Bibb quotes often sit at secondary regional-hub rates for driveway SFH — multi-story access and medical peaks push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Bibb is independent Macon Middle GA hub — not Houston Robins AFB renamed and not Atlanta defaults.',
      },
    ],
    whatIntro: 'Macon multi-story, medical/university freeflow, and I-75/I-16 access — not a Warner Robins clone.',
    whatBullets: [
      {
        title: 'Medical and university calendars drive spikes',
        detail: 'Campus and hospital-adjacent moves fill crews differently than pure family Saturdays.',
      },
      {
        title: 'Macon multi-story is first-class product',
        detail: 'Stairs and historic street width need inventories different from pure suburban playbooks.',
      },
      {
        title: 'I-75 / I-16 freeflow is billable',
        detail: 'Cross-hub pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Robins AFB PCS product',
        detail: 'Do not recycle military multi-family playbooks for historic Macon days.',
      },
    ],
    zonesHeading: 'Bibb zones: Macon core, medical/university corridors, north suburban edges & rural south',
    zonesIntro: 'Two to four sharp products under one Middle GA hub label.',
    zones: [
      z('macon-core', 'Macon city core & historic stock', 'Macon core', ['Macon', 'downtown', 'historic neighborhoods'], 'Multi-story, historic, multi-unit', ['Stairs', 'Street width', 'Parking'], ['macon'], 'Inventory stairs; plan temporary no-parking; measure street width.'),
      z('med-univ', 'Medical & university corridors', 'Medical / university', ['medical campuses', 'university edges'], 'Multi-family, SFH, campus-adjacent', ['Building COIs', 'Campus calendars'], ['macon medical', 'mercer'], 'Book around campus and clinical calendars; collect management packets.'),
      z('north-sub', 'North suburban edges', 'North suburbs', ['north Macon suburbs'], 'SFH, townhomes', ['HOA packets', 'Arterial timing'], ['north macon'], 'Confirm driveway and HOA hours.'),
      z('rural-south', 'Rural south & larger lots', 'Rural south', ['southern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['bibb rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('macon-city', 'Macon multi-story & historic access', 'Stairs and street width are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('med-univ', 'Medical/university corridor logistics', 'Campus and clinical calendars rewrite demand.', ['Book early around term and clinical peaks.', 'Collect building packets on multi-family.']),
      s('i75-i16', 'I-75 / I-16 hub freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Atlanta collar rates for Macon historic days.']),
    ],
    schoolsIntro: 'Bibb families compare Bibb County and related city school options — verify boundaries; regional-hub reputation does not replace district maps.',
    hospitalsDetail: 'Atrium Health Navicent and regional medical campuses anchor acute care; map peak freeflow on medical corridors.',
    costIntro: 'City access, medical peaks, and empty-mile edges often matter more than raw miles.',
    seasonalIntro: 'University calendars, medical staffing moves, and school years reshape demand more than Atlanta HOA peaks alone.',
  },
  {
    file: 'clarke-tier2.ts',
    exportName: 'clarkeCountyTier2Intelligence',
    slug: 'clarke',
    hubTitle: 'Clarke County Moving Intelligence Hub',
    eyebrow: 'Clarke · Athens · UGA university independent',
    h1: 'Moving in Clarke County: Athens UGA Hub, Downtown Density & Student Housing Mix',
    heroOpener:
      'Clarke County is northeast Georgia’s independent university market — Athens multi-story and downtown density, UGA move-in/move-out calendars, student multi-family product, and freeflow that does not answer to Atlanta collar defaults. Expect term-weekend spikes, stairs and street permits downtown, and outer-neighborhood SFH that still peaks hard toward campus. This guide is for people moving in Clarke as Athens UGA product — not generic North Georgia and not Gwinnett renamed.',
    heroCredibility:
      'UGA university hub · Downtown + student housing · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-78 · US-29 · GA-10 Loop · GA-15 · Atlanta Highway corridors',
    parentLabel: 'independent NE GA university hub (vs Gwinnett / Atlanta collar defaults)',
    parentHref: '/local-movers/georgia/gwinnett',
    compareIntro:
      'Clarke is Athens UGA independent university product — not Gwinnett HOA density and not Atlanta tower freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Gwinnett crews fight I-85 peaks. Clarke pairs ride US-78, US-29, and Athens loop arterials — freer mid-day off Atlanta freeflow, still peak-hard on UGA move weekends and game-day constraints.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Gwinnett mixes diverse multi-family and HOAs. Clarke mixes downtown multi-story, student apartments, and eastside/westside SFH — more continuous university density, less continuous suburban master-plan product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Downtown streets and multi-story stock need stair inventories and curb plans; student buildings need management packets uncommon on pure suburban days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Clarke quotes often sit at secondary university-market rates for simple SFH — downtown access and term spikes push multi-family prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Clarke is Athens UGA independent university market — not Gwinnett or generic North Georgia renamed.',
      },
    ],
    whatIntro: 'UGA calendars, downtown multi-story, and student housing clusters — not Atlanta collar boilerplate.',
    whatBullets: [
      {
        title: 'UGA move cycles dominate demand spikes',
        detail: 'Term start/end weekends fill local crews first — book early.',
      },
      {
        title: 'Downtown multi-story is first-class product',
        detail: 'Stairs, curb rules, and street width rewrite truck size.',
      },
      {
        title: 'Student multi-family needs building packets',
        detail: 'Elevators and long carries need inventories different from pure SFH playbooks.',
      },
      {
        title: 'Game-day and event windows tighten freeflow',
        detail: 'Price portal-to-portal around known event calendars.',
      },
    ],
    zonesHeading: 'Clarke zones: Downtown Athens, campus multi-family, eastside/westside SFH & outer edges',
    zonesIntro: 'Two to four sharp products under one university-county label.',
    zones: [
      z('downtown', 'Downtown Athens multi-story', 'Downtown', ['downtown', 'historic blocks'], 'Multi-story, walk-ups, mixed commercial-residential', ['Stairs', 'Street parking', 'Curb rules'], ['athens downtown'], 'Plan temporary no-parking; inventory floor counts; measure street width.'),
      z('campus', 'Campus / student multi-family', 'Campus density', ['UGA edges', 'student apartments'], 'Student multi-family, elevators, apartments', ['Lease-end clusters', 'Building COIs'], ['uga', 'student housing'], 'Book early around term calendars; collect management packets.'),
      z('sfh-sides', 'Eastside / westside SFH', 'SFH sides', ['eastside', 'westside neighborhoods'], 'SFH, townhomes', ['Driveway staging', 'School peaks'], ['athens eastside', 'athens westside'], 'Confirm driveway access; price school windows.'),
      z('outer', 'Outer edges & larger lots', 'Outer edges', ['outer neighborhoods', 'larger lots'], 'SFH, longer approaches', ['Empty miles'], ['clarke outer'], 'Photo last-mile; price portal-to-portal toward downtown.'),
    ],
    specialized: [
      s('uga-turnover', 'UGA term-start / term-end turnover', 'University calendars create demand spikes.', ['Book early around move-in/move-out weekends.', 'Expect short-notice multi-family demand.']),
      s('downtown-access', 'Downtown multi-story & curb logistics', 'Stairs and street rules are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('student-mf', 'Student multi-family building packets', 'Elevators and management rules dominate.', ['Collect COI and elevator windows early.', 'Do not quote pure suburban SFH rates for campus apartments.']),
    ],
    schoolsIntro: 'Clarke families compare Clarke County and related Athens-area school options — verify boundaries; university housing patterns do not replace district maps for family SFH.',
    hospitalsDetail: 'Piedmont Athens Regional and regional clinics anchor acute care; map peak freeflow around campus and downtown constraints.',
    costIntro: 'Term spikes, downtown access, and multi-family packets often matter more than raw miles.',
    seasonalIntro: 'UGA calendars, game weekends, and school years reshape demand more than Atlanta HOA peaks alone.',
  },
];

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function render(p: PackDef): string {
  const zones = p.zones
    .map(
      (z) => `    {
      id: '${z.id}',
      name: '${esc(z.name)}',
      shortName: '${esc(z.shortName)}',
      neighborhoods: ${JSON.stringify(z.neighborhoods)},
      housingTypes: '${esc(z.housingTypes)}',
      challenges: ${JSON.stringify(z.challenges)},
      moverTips: '${esc(z.moverTips)}',
      cityKeywords: ${JSON.stringify(z.keywords)},
    }`
    )
    .join(',\n');
  const specs = p.specialized
    .map(
      (s) => `    {
      id: '${s.id}',
      title: '${esc(s.title)}',
      intro: '${esc(s.intro)}',
      bullets: ${JSON.stringify(s.bullets)},
    }`
    )
    .join(',\n');
  const compare = p.compareBullets
    .map(
      (b) => `      {
        title: '${esc(b.title)}',
        detail: '${esc(b.detail)}',
      }`
    )
    .join(',\n');
  const what = p.whatBullets
    .map(
      (b) => `      {
        title: '${esc(b.title)}',
        detail: '${esc(b.detail)}',
      }`
    )
    .join(',\n');

  return `import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** ${p.slug} — GA Tier 2 Wave 1 */
export const ${p.exportName}: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: '${p.slug}',
  hubTitle: '${esc(p.hubTitle)}',
  eyebrow: '${esc(p.eyebrow)}',
  h1: '${esc(p.h1)}',
  heroOpener: '${esc(p.heroOpener)}',
  heroCredibility: '${esc(p.heroCredibility)}',
  majorCorridors: '${esc(p.majorCorridors)}',
  parentCompare: {
    parentLabel: '${esc(p.parentLabel)}',
    parentHref: '${p.parentHref}',
    title: 'Compared with ${esc(p.parentLabel)}',
    intro: '${esc(p.compareIntro)}',
    bullets: [
${compare}
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in ${esc(p.hubTitle.replace(' Moving Intelligence Hub', ''))} different',
    intro: '${esc(p.whatIntro)}',
    bullets: [
${what},
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: '${esc(p.zonesHeading)}',
  zonesIntro: '${esc(p.zonesIntro)}',
  zones: [
${zones}
  ],
  specialized: [
${specs}
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: '${esc(p.schoolsIntro)}',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university/military markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: '${esc(p.hospitalsDetail)}',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: '${esc(p.costIntro)}',
    drivers: [
      { title: 'Corridor freeflow', detail: 'Peak windows inflate hourly bills on short-looking pairs.' },
      { title: 'Access soft costs', detail: 'HOA packets, stairs, or last-mile shuttles add labor hours.' },
      { title: 'Long empty-mile edges', detail: 'Far pockets price differently from seat cores.' },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$120–$190+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: '${esc(p.seasonalIntro)}',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, PCS, or school windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: '${esc(p.parentLabel)} movers (parent contrast)', href: '${p.parentHref}' },
    ],
  },
});
`;
}

const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/georgia');
for (const p of packs) {
  writeFileSync(join(outDir, p.file), render(p), 'utf8');
  console.log('wrote', p.file);
}
console.log('Generated', packs.length, 'GA Tier 2 Wave 1 packs');
