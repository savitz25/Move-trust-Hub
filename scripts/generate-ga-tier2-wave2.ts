/**
 * Generate GA Tier 2 Wave 2 county intelligence packs.
 * Run: npx tsx scripts/generate-ga-tier2-wave2.ts
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
    file: 'bartow-tier2.ts',
    exportName: 'bartowCountyTier2Intelligence',
    slug: 'bartow',
    hubTitle: 'Bartow County Moving Intelligence Hub',
    eyebrow: 'Bartow · Cartersville · I-75 NW · vs Cobb',
    h1: 'Moving in Bartow County: Cartersville, Lake Allatoona Edge & I-75 Northwest Growth',
    heroOpener:
      'Bartow County is northwest Atlanta’s I-75 outer growth collar — Cartersville seat density, Lake Allatoona-edge approaches, industrial-adjacent residential, and freeflow that is not Cobb’s continuous Marietta multi-family core and not Cherokee’s I-575 HOA pattern. Expect longer empty miles from the Perimeter, HOA growth villages, and lake last-mile on some edges. This guide is for people moving in Bartow as I-75 NW Cartersville product — not a Cobb or Cherokee rename.',
    heroCredibility:
      'I-75 NW growth · Lake Allatoona edge · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-75 · US-41 · GA-20 · GA-113 · GA-61 approaches',
    parentLabel: 'Cobb County (and Cherokee north patterns)',
    parentHref: '/local-movers/georgia/cobb',
    compareIntro:
      'Bartow is Cartersville / Allatoona I-75 northwest outer growth — not Cobb Cumberland multi-family and not Cherokee I-575 master-plan density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Cobb crews fight I-75 and East-West Connector peaks closer in. Bartow pairs ride I-75 further northwest, US-41, and Cartersville arterials — freer mid-day outer freeflow, still peak-heavy on commute and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Cobb mixes East Cobb lots and Smyrna multi-family; Cherokee skews I-575 HOAs. Bartow mixes Cartersville multi-story and SFH, Allatoona-edge homes, and industrial-adjacent growth — more continuous outer NW product, less continuous Cumberland elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Growth HOAs need COI packets; lake approaches can add narrow roads uncommon on pure Marietta multi-family days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Bartow quotes often sit at outer NW-collar rates for driveway SFH — empty miles from Cobb staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Bartow is I-75 NW Cartersville / Allatoona product — not Cobb or Cherokee renamed.',
      },
    ],
    whatIntro: 'I-75 NW freeflow, Allatoona edges, and outer empty miles — not a Cobb or Cherokee clone.',
    whatBullets: [
      {
        title: 'I-75 northwest freeflow is billable',
        detail: 'Cartersville ↔ Cobb pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Lake Allatoona edges rewrite truck size',
        detail: 'Photo last-mile on lake approaches.',
      },
      {
        title: 'Distinct from Cherokee I-575 growth',
        detail: 'Do not recycle Woodstock HOA-only playbooks for Cartersville industrial-edge days.',
      },
      {
        title: 'Empty miles from Perimeter staging matter',
        detail: 'Do not quote pure Cobb local rates for Bartow deadhead.',
      },
    ],
    zonesHeading: 'Bartow zones: Cartersville seat, Allatoona edge, I-75 growth & rural west',
    zonesIntro: 'Two to four sharp products under one I-75 NW outer-collar label.',
    zones: [
      z('cartersville', 'Cartersville seat & core', 'Cartersville', ['Cartersville', 'downtown edges'], 'Multi-story, SFH, mixed stock', ['Stairs', 'Street width', 'Arterial timing'], ['cartersville'], 'Inventory stairs on older stock; plan temporary no-parking where needed.'),
      z('allatoona', 'Lake Allatoona edge', 'Allatoona edge', ['lake approaches', 'Allatoona-adjacent streets'], 'SFH, some seasonal access constraints', ['Narrow roads', 'Last-mile width'], ['lake allatoona'], 'Photo approaches; confirm truck size before survey final.'),
      z('i75-growth', 'I-75 corridor growth villages', 'I-75 growth', ['growth HOAs', 'corridor villages'], 'Planned SFH, townhomes', ['HOA packets', 'I-75 peaks'], ['bartow growth'], 'Collect COI early; avoid peak I-75 windows when possible.'),
      z('rural-west', 'Rural west & larger lots', 'Rural west', ['western towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['bartow west'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i75-nw', 'I-75 northwest freeflow', 'Outer pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Cobb Cumberland rates for Cartersville driveways.']),
      s('allatoona', 'Lake Allatoona edge access', 'Last-mile width changes truck type.', ['Photo approaches before final quote.', 'Seasonal parking can tighten lake streets.']),
      s('growth-hoa', 'Outer NW HOA growth logistics', 'Planned villages treat COI as default.', ['Gate lists early.', 'Mud weeks on new streets need flexibility.']),
    ],
    schoolsIntro:
      'Bartow families compare Bartow County Schools feeders across Cartersville and growth villages — verify boundaries; do not assume Cobb or Cherokee maps apply.',
    hospitalsDetail:
      'Piedmont Cartersville and regional clinics anchor acute care; map peak freeflow on I-75 NW corridors.',
    costIntro: 'Empty miles, lake last-mile, and I-75 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than northwest Cobb corporate peaks alone.',
  },
  {
    file: 'carroll-tier2.ts',
    exportName: 'carrollCountyTier2Intelligence',
    slug: 'carroll',
    hubTitle: 'Carroll County Moving Intelligence Hub',
    eyebrow: 'Carroll · Carrollton · west outer Atlanta · vs Douglas',
    h1: 'Moving in Carroll County: Carrollton University Hub, US-27 / I-20 West Outer Ring',
    heroOpener:
      'Carroll County is west Atlanta’s outer ring — Carrollton multi-story and university-adjacent stock, US-27 / I-20 freeflow, longer empty miles than Douglasville’s I-20 seat density, and product that is not a Douglas rename. Expect college calendars, small-city stairs, and outer-west HOA growth. This guide is for people moving in Carroll as Carrollton west-outer product — not Douglas I-20 collar with different labels.',
    heroCredibility:
      'West outer ring · University + residential · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-20 · US-27 · GA-166 · GA-61 · GA-16 approaches',
    parentLabel: 'Douglas County (and Coweta SW patterns)',
    parentHref: '/local-movers/georgia/douglas',
    compareIntro:
      'Carroll is Carrollton university / west-outer product — not Douglasville I-20 seat density and not Coweta Newnan film-edge alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Douglas crews fight I-20 closer to the Perimeter. Carroll pairs ride I-20 further west, US-27, and Carrollton arterials — freer mid-day outer freeflow, still peak-heavy on university and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Douglas mixes Douglasville SFH and I-20 HOAs. Carroll mixes Carrollton multi-story, student multi-family, and outer-lot growth — more continuous university-edge product, less continuous west-metro planned suburbs alone.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; growth HOAs need COI packets; rural west adds empty miles uncommon on pure Douglasville cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Carroll quotes often sit at outer-west secondary rates for driveway SFH — university peaks and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Carroll is west-outer Carrollton university/residential hub — not Douglas renamed.',
      },
    ],
    whatIntro: 'University calendars, US-27 freeflow, and outer-west empty miles — not a Douglas clone.',
    whatBullets: [
      {
        title: 'University calendars spike local demand',
        detail: 'Term start/end weekends fill crews differently than pure family Saturdays.',
      },
      {
        title: 'Carrollton multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Outer-west empty miles are billable',
        detail: 'Do not quote pure Douglas local rates for Carrollton deadhead.',
      },
      {
        title: 'AL border hops create interstate legs',
        detail: 'Short-looking border destinations need FMCSA authority.',
      },
    ],
    zonesHeading: 'Carroll zones: Carrollton core, campus multi-family, I-20 growth & rural west',
    zonesIntro: 'Two to four sharp products under one west-outer label.',
    zones: [
      z('carrollton', 'Carrollton seat & core', 'Carrollton', ['Carrollton', 'downtown edges'], 'Multi-story, SFH, mixed stock', ['Stairs', 'Street parking'], ['carrollton'], 'Inventory stairs; plan temporary no-parking.'),
      z('campus', 'University-adjacent multi-family', 'Campus edge', ['campus approaches', 'student apartments'], 'Student multi-family, apartments', ['Lease clusters', 'Building COIs'], ['uwest', 'carrollton campus'], 'Book early around term calendars; collect management packets.'),
      z('i20-growth', 'I-20 / US-27 growth villages', 'Growth villages', ['growth HOAs', 'corridor villages'], 'Planned SFH, townhomes', ['HOA packets', 'Corridor peaks'], ['carroll growth'], 'Collect COI early; price portal-to-portal toward Douglas/Atlanta.'),
      z('rural-west', 'Rural west & larger lots', 'Rural west', ['western towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['carroll west'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('university', 'University-adjacent turnover', 'Term calendars create multi-family clusters.', ['Book early around term start/end.', 'Collect elevator windows and building packets.']),
      s('carrollton-city', 'Carrollton multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('outer-west', 'US-27 / I-20 outer-west freeflow', 'Longer empty miles still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Douglasville rates for rural west lots.']),
    ],
    schoolsIntro:
      'Carroll families compare Carroll County Schools feeders across Carrollton and growth villages — verify boundaries; do not assume Douglas maps apply.',
    hospitalsDetail:
      'Tanner Health and regional clinics anchor acute care; map peak freeflow on Carrollton arterials.',
    costIntro: 'University peaks, city access, and empty miles often matter more than raw miles.',
    seasonalIntro: 'Term calendars and school years reshape demand more than pure Douglas HOA peaks alone.',
  },
  {
    file: 'rockdale-tier2.ts',
    exportName: 'rockdaleCountyTier2Intelligence',
    slug: 'rockdale',
    hubTitle: 'Rockdale County Moving Intelligence Hub',
    eyebrow: 'Rockdale · Conyers · east Atlanta inner collar · vs DeKalb',
    h1: 'Moving in Rockdale County: Conyers, I-20 East Inner Collar & East-Metro Access',
    heroOpener:
      'Rockdale County is east Atlanta’s I-20 inner collar — Conyers seat density, closer Perimeter freeflow than Newton’s outer Covington growth, and product that is not DeKalb’s continuous intown multi-family core. Expect HOA and SFH mix, I-20 peak clocks, and empty miles that still matter versus inside-Perimeter staging. This guide is for people moving in Rockdale as Conyers east-inner collar — not a Newton outer-collar rename and not a DeKalb script.',
    heroCredibility:
      'I-20 east inner collar · Conyers seat · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-20 · GA-138 · GA-20 · US-278 · Sigman Road corridors',
    parentLabel: 'DeKalb County (and Newton outer-east patterns)',
    parentHref: '/local-movers/georgia/dekalb',
    compareIntro:
      'Rockdale is Conyers I-20 east inner collar — not DeKalb intown multi-family density and not Newton outer Covington growth alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'DeKalb crews fight I-285 and intown peaks. Rockdale pairs ride I-20 east, GA-138, and Conyers arterials — freer mid-day east of the core, still peak-heavy on commute windows and closer-in than Newton’s outer freeflow.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'DeKalb mixes diverse multi-family and intown stock. Rockdale mixes Conyers SFH, multi-family pockets, and HOA villages — more continuous east-inner collar product, less continuous intown elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets appear on growth villages; older Conyers stock can add street-width constraints uncommon on pure outer Newton lots.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Rockdale quotes often sit at east-collar rates for driveway SFH — empty miles from intown staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Rockdale is I-20 east inner collar Conyers product — not DeKalb renamed and not Newton outer collar.',
      },
    ],
    whatIntro: 'Conyers seat density, I-20 east peaks, and inner-east freeflow — not a Newton clone.',
    whatBullets: [
      {
        title: 'I-20 east freeflow is billable',
        detail: 'Conyers ↔ DeKalb pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Inner collar vs Newton outer growth',
        detail: 'Shorter empty miles than Covington outer lots — do not recycle Newton rural-edge playbooks.',
      },
      {
        title: 'HOA and multi-family mix is first-class',
        detail: 'Building packets and gate lists both appear under one county label.',
      },
      {
        title: 'Empty miles from Perimeter staging matter',
        detail: 'Do not quote pure DeKalb local rates for Conyers deadhead.',
      },
    ],
    zonesHeading: 'Rockdale zones: Conyers core, I-20 corridors, HOA villages & east edges',
    zonesIntro: 'Two to four sharp products under one I-20 east inner-collar label.',
    zones: [
      z('conyers', 'Conyers seat & core', 'Conyers', ['Conyers', 'seat neighborhoods'], 'SFH, multi-story older stock, mixed density', ['Street width', 'Arterial timing'], ['conyers'], 'Confirm driveway staging; inventory older multi-story where present.'),
      z('i20-corridors', 'I-20 corridor residential', 'I-20 corridors', ['corridor neighborhoods', 'I-20 edges'], 'SFH, townhomes, some multi-family', ['I-20 peaks', 'Mixed access'], ['rockdale i-20'], 'Price portal-to-portal; avoid peak I-20 windows when possible.'),
      z('hoa-villages', 'HOA growth villages', 'HOA villages', ['planned villages', 'growth HOAs'], 'Planned SFH, townhomes', ['Gate lists', 'HOA hours'], ['rockdale hoa'], 'Collect COI early; weekday windows often beat Saturdays.'),
      z('east-edges', 'East / rural-edge pockets', 'East edges', ['eastern lots', 'larger approaches'], 'Larger lots, longer approaches', ['Empty miles', 'Soft shoulders'], ['rockdale east'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i20-inner', 'I-20 east inner-collar freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote DeKalb elevator rates for Conyers driveways.']),
      s('conyers-seat', 'Conyers seat access mix', 'Older stock and arterials are first-class cost drivers.', ['Confirm street width.', 'Temporary no-parking often beats long carries.']),
      s('vs-newton', 'Distinct from Newton outer collar', 'Closer freeflow than Covington growth edges.', ['Do not recycle outer film/rural playbooks.', 'Inner-collar HOA packets still dominate many villages.']),
    ],
    schoolsIntro:
      'Rockdale families compare Rockdale County Schools feeders across Conyers — verify boundaries; do not assume DeKalb or Newton maps apply.',
    hospitalsDetail:
      'Piedmont Rockdale and regional clinics anchor acute care; map peak freeflow on I-20 east corridors.',
    costIntro: 'I-20 peaks, access soft costs, and empty miles often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than intown DeKalb calendars alone.',
  },
  {
    file: 'newton-tier2.ts',
    exportName: 'newtonCountyTier2Intelligence',
    slug: 'newton',
    hubTitle: 'Newton County Moving Intelligence Hub',
    eyebrow: 'Newton · Covington · east Atlanta outer collar · vs Rockdale',
    h1: 'Moving in Newton County: Covington, I-20 East Growth & Film/Residential Mix',
    heroOpener:
      'Newton County is east Atlanta’s I-20 outer growth collar — Covington seat density, film-adjacent residential pockets, longer empty miles than Rockdale’s Conyers inner freeflow, and product that is not a Rockdale rename. Expect HOA growth villages, small-city multi-story stock, and outer-east portal times that map miles understate. This guide is for people moving in Newton as Covington outer-east product — not Rockdale inner collar with different labels.',
    heroCredibility:
      'I-20 east outer growth · Film/residential mix · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-20 · US-278 · GA-142 · GA-36 · GA-81 approaches',
    parentLabel: 'Rockdale County (and DeKalb east patterns)',
    parentHref: '/local-movers/georgia/rockdale',
    compareIntro:
      'Newton is Covington I-20 east outer growth with film/residential mix — not Rockdale Conyers inner collar and not DeKalb intown density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Rockdale crews fight closer I-20 east peaks into Conyers. Newton pairs ride I-20 further east, US-278, and Covington arterials — freer mid-day outer freeflow, still peak-heavy on school and film-production windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Rockdale mixes Conyers seat and inner HOAs. Newton mixes Covington multi-story, film-edge homes, and outer growth HOAs — more continuous outer-east product, less continuous inner-collar density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Historic Covington streets can need smaller trucks; growth HOAs need COI packets; outer lots add empty miles uncommon on pure Conyers cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Newton quotes often sit at outer-east rates for driveway SFH — empty miles from Rockdale/Atlanta staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Newton is I-20 east outer Covington growth — not Rockdale inner collar renamed.',
      },
    ],
    whatIntro: 'Outer I-20 freeflow, Covington film-edge stock, and longer empty miles — not a Rockdale clone.',
    whatBullets: [
      {
        title: 'Outer-east empty miles are first-class',
        detail: 'Do not quote pure Rockdale local rates for Covington deadhead.',
      },
      {
        title: 'Film/residential pockets rewrite calendars',
        detail: 'Production windows can tighten small-town staging.',
      },
      {
        title: 'Distinct from Rockdale inner collar',
        detail: 'Longer freeflow and more outer growth product than Conyers.',
      },
      {
        title: 'Growth HOA product is common',
        detail: 'COI and gate lists on new villages are standard.',
      },
    ],
    zonesHeading: 'Newton zones: Covington seat, film/village edge, I-20 growth & rural east',
    zonesIntro: 'Two to four sharp products under one I-20 east outer-collar label.',
    zones: [
      z('covington', 'Covington seat & core', 'Covington', ['Covington', 'downtown edges'], 'Multi-story, SFH, mixed stock', ['Street width', 'Stairs', 'Arterial timing'], ['covington'], 'Inventory stairs; plan temporary no-parking; measure street width.'),
      z('film-edge', 'Film & village edge stock', 'Film/village edge', ['film-adjacent neighborhoods', 'village approaches'], 'Village SFH, film-adjacent stock', ['Narrow streets', 'Production windows'], ['newton film'], 'Photo street width; book around known production peaks when relevant.'),
      z('i20-growth', 'I-20 outer growth villages', 'I-20 growth', ['growth HOAs', 'corridor villages'], 'Planned SFH, townhomes', ['HOA packets', 'I-20 peaks'], ['newton growth'], 'Collect COI early; price portal-to-portal toward Rockdale/Atlanta.'),
      z('rural-east', 'Rural east & larger lots', 'Rural east', ['eastern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['newton east'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i20-outer', 'I-20 east outer-collar freeflow', 'Longer empty miles still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Rockdale inner rates for outer Covington lots.']),
      s('film-village', 'Film/village logistics', 'Small-town geometry rewrites truck size.', ['Photo approaches.', 'Production windows can tighten curb plans.']),
      s('growth-hoa', 'Outer-east HOA growth', 'Planned villages treat COI as default.', ['Gate lists early.', 'Mud weeks on new streets need flexibility.']),
    ],
    schoolsIntro:
      'Newton families compare Newton County Schools feeders across Covington and growth villages — verify boundaries; do not assume Rockdale maps apply.',
    hospitalsDetail:
      'Piedmont Newton and regional clinics anchor acute care; map peak freeflow on I-20 east outer corridors.',
    costIntro: 'Empty miles, film-edge access, and I-20 peaks often matter more than raw miles.',
    seasonalIntro: 'School years, summer closings, and occasional production calendars reshape demand more than Rockdale inner peaks alone.',
  },
  {
    file: 'barrow-tier2.ts',
    exportName: 'barrowCountyTier2Intelligence',
    slug: 'barrow',
    hubTitle: 'Barrow County Moving Intelligence Hub',
    eyebrow: 'Barrow · Winder · NE Atlanta collar · vs Gwinnett',
    h1: 'Moving in Barrow County: Winder, GA-316 Corridor & Outer Northeast Growth',
    heroOpener:
      'Barrow County is northeast Atlanta’s outer GA-316 growth collar — Winder seat density, longer empty miles than Gwinnett’s I-85 core, and product that is not a Gwinnett rename and not Hall’s Gainesville manufacturing hub. Expect HOA growth villages, school-calendar SFH volume, and portal times that map miles understate. This guide is for people moving in Barrow as outer NE GA-316 product — not Gwinnett density with different labels.',
    heroCredibility:
      'GA-316 outer NE growth · Winder seat · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'GA-316 · US-29 · GA-11 · GA-81 · GA-211 approaches',
    parentLabel: 'Gwinnett County (and Hall northeast patterns)',
    parentHref: '/local-movers/georgia/gwinnett',
    compareIntro:
      'Barrow is Winder / GA-316 outer NE growth — not Gwinnett I-85 multi-family density and not Hall Gainesville manufacturing hub alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Gwinnett crews fight I-85 and 316 peaks closer in. Barrow pairs ride GA-316 further east, US-29, and Winder arterials — freer mid-day outer freeflow, still peak-heavy on school and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Gwinnett mixes dense multi-family and HOAs. Barrow mixes Winder SFH, outer growth villages, and larger-lot edges — more continuous outer NE product, less continuous I-85 apartment density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Growth HOAs need COI packets; rural edges add empty miles uncommon on pure Suwanee cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Barrow quotes often sit at outer-NE rates for driveway SFH — empty miles from Gwinnett staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Barrow is outer NE GA-316 growth — not Gwinnett renamed and not Hall I-985 hub.',
      },
    ],
    whatIntro: 'GA-316 freeflow, Winder seat stock, and outer NE empty miles — not a Gwinnett clone.',
    whatBullets: [
      {
        title: 'GA-316 freeflow is billable',
        detail: 'Winder ↔ Gwinnett pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Outer NE HOA growth is first-class',
        detail: 'COI and gate lists on new villages are standard.',
      },
      {
        title: 'Distinct from Walton US-78 east',
        detail: 'Barrow is GA-316 Winder product — not Monroe US-78 alone.',
      },
      {
        title: 'Empty miles from Gwinnett staging matter',
        detail: 'Do not quote pure Gwinnett local rates for Barrow deadhead.',
      },
    ],
    zonesHeading: 'Barrow zones: Winder seat, GA-316 growth, west edges & rural east',
    zonesIntro: 'Two to four sharp products under one outer NE growth label.',
    zones: [
      z('winder', 'Winder seat & core', 'Winder', ['Winder', 'seat neighborhoods'], 'SFH, mixed stock', ['Arterial timing'], ['winder'], 'Confirm driveway staging; price school peaks.'),
      z('ga316-growth', 'GA-316 corridor growth villages', 'GA-316 growth', ['growth HOAs', 'corridor villages'], 'Planned SFH, townhomes', ['HOA packets', 'GA-316 peaks'], ['barrow growth'], 'Collect COI early; avoid peak 316 windows when possible.'),
      z('west-edges', 'West edges toward Gwinnett', 'West edges', ['western neighborhoods'], 'SFH, townhomes', ['Commute peaks', 'Empty miles'], ['barrow west'], 'Price portal-to-portal toward Gwinnett job centers.'),
      z('rural-east', 'Rural east & larger lots', 'Rural east', ['eastern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['barrow east'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('ga316', 'GA-316 outer NE freeflow', 'Outer pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Gwinnett multi-family rates for Winder driveways.']),
      s('growth-hoa', 'Outer NE HOA growth logistics', 'Planned villages treat COI as default.', ['Gate lists early.', 'Mud weeks need flexibility.']),
      s('empty-miles', 'Outer-collar empty miles', 'Deadhead rewrites hourly math.', ['Clarify staging location before deposit.', 'Photo rural last-mile.']),
    ],
    schoolsIntro:
      'Barrow families compare Barrow County Schools feeders across Winder and growth villages — verify boundaries; do not assume Gwinnett maps apply.',
    hospitalsDetail:
      'Northeast Georgia Medical Center – Barrow and regional clinics anchor acute care; map peak freeflow on GA-316 corridors.',
    costIntro: 'Empty miles, HOA soft costs, and GA-316 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than Gwinnett corporate peaks alone.',
  },
  {
    file: 'walton-tier2.ts',
    exportName: 'waltonCountyTier2Intelligence',
    slug: 'walton',
    hubTitle: 'Walton County Moving Intelligence Hub',
    eyebrow: 'Walton · Monroe · east of Gwinnett · vs Gwinnett',
    h1: 'Moving in Walton County: Monroe, US-78 East Growth & East-of-Gwinnett Living',
    heroOpener:
      'Walton County is east-of-Gwinnett growth product — Monroe seat density, US-78 freeflow, longer empty miles than Gwinnett’s I-85 core, and product that is not a Barrow GA-316 rename and not Newton’s I-20 film-edge pattern. Expect HOA growth villages, school-calendar SFH volume, and outer-east portal times. This guide is for people moving in Walton as Monroe US-78 east product — not Gwinnett density with different labels.',
    heroCredibility:
      'US-78 east growth · Monroe seat · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-78 · GA-11 · GA-81 · GA-20 approaches · GA-138 approaches',
    parentLabel: 'Gwinnett County (and Newton east patterns)',
    parentHref: '/local-movers/georgia/gwinnett',
    compareIntro:
      'Walton is Monroe / US-78 east-of-Gwinnett growth — not Gwinnett I-85 multi-family density and not Barrow GA-316 or Newton I-20 alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Gwinnett crews fight I-85 peaks. Walton pairs ride US-78 east, GA-11, and Monroe arterials — freer mid-day further east, still peak-heavy on school and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Gwinnett mixes dense multi-family and HOAs. Walton mixes Monroe SFH, east growth villages, and larger-lot edges — more continuous east-of-Gwinnett product, less continuous I-85 apartment density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Growth HOAs need COI packets; rural edges add empty miles uncommon on pure Lawrenceville multi-family days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Walton quotes often sit at east-outer rates for driveway SFH — empty miles from Gwinnett staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Walton is US-78 east Monroe growth — not Gwinnett renamed and not Barrow or Newton renamed.',
      },
    ],
    whatIntro: 'US-78 freeflow, Monroe seat stock, and east-of-Gwinnett empty miles — not a Gwinnett or Barrow clone.',
    whatBullets: [
      {
        title: 'US-78 freeflow is billable',
        detail: 'Monroe ↔ Gwinnett pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Barrow GA-316 product',
        detail: 'Walton is US-78 east — not Winder 316 freeflow alone.',
      },
      {
        title: 'Distinct from Newton I-20 outer',
        detail: 'Different spine and film mix than Covington.',
      },
      {
        title: 'HOA growth villages dominate family volume',
        detail: 'COI and gate lists on new villages are standard.',
      },
    ],
    zonesHeading: 'Walton zones: Monroe seat, US-78 growth, west edges toward Gwinnett & rural east',
    zonesIntro: 'Two to four sharp products under one east-of-Gwinnett label.',
    zones: [
      z('monroe', 'Monroe seat & core', 'Monroe', ['Monroe', 'seat neighborhoods'], 'SFH, mixed stock', ['Arterial timing'], ['monroe ga'], 'Confirm driveway staging; price school peaks.'),
      z('us78-growth', 'US-78 corridor growth villages', 'US-78 growth', ['growth HOAs', 'corridor villages'], 'Planned SFH, townhomes', ['HOA packets', 'US-78 peaks'], ['walton growth'], 'Collect COI early; avoid peak 78 windows when possible.'),
      z('west-edges', 'West edges toward Gwinnett', 'West edges', ['western neighborhoods'], 'SFH, townhomes', ['Commute peaks', 'Empty miles'], ['walton west'], 'Price portal-to-portal toward Gwinnett job centers.'),
      z('rural-east', 'Rural east & larger lots', 'Rural east', ['eastern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['walton east'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('us78', 'US-78 east freeflow', 'Outer pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Gwinnett multi-family rates for Monroe driveways.']),
      s('growth-hoa', 'East-of-Gwinnett HOA growth', 'Planned villages treat COI as default.', ['Gate lists early.', 'Mud weeks need flexibility.']),
      s('vs-neighbors', 'Distinct from Barrow and Newton', 'Different spines and last-mile profiles.', ['Do not recycle GA-316 or I-20 film playbooks.', 'US-78 HOA growth is the differentiator.']),
    ],
    schoolsIntro:
      'Walton families compare Walton County Schools feeders across Monroe and growth villages — verify boundaries; do not assume Gwinnett maps apply.',
    hospitalsDetail:
      'Piedmont Walton and regional clinics anchor acute care; map peak freeflow on US-78 corridors.',
    costIntro: 'Empty miles, HOA soft costs, and US-78 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than Gwinnett corporate peaks alone.',
  },
  {
    file: 'floyd-tier2.ts',
    exportName: 'floydCountyTier2Intelligence',
    slug: 'floyd',
    hubTitle: 'Floyd County Moving Intelligence Hub',
    eyebrow: 'Floyd · Rome · NW Georgia independent',
    h1: 'Moving in Floyd County: Rome Regional Hub, Medical/University Corridors & US-27 Access',
    heroOpener:
      'Floyd County is northwest Georgia’s independent regional hub — Rome multi-story and medical/university corridors, US-27 / US-411 freeflow, and product that does not answer to Atlanta collar defaults. Expect city stairs, longer empty miles to rural ridges, and freeflow that is not Bartow I-75 outer growth alone. This guide is for people moving in Floyd as Rome NW GA hub — not an Atlanta metro rename.',
    heroCredibility:
      'Rome regional hub · Medical/university · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-27 · US-411 · GA-20 · GA-53 · GA-1 approaches',
    parentLabel: 'independent NW Georgia hub (vs Atlanta collar / Bartow defaults)',
    parentHref: '/local-movers/georgia/bartow',
    compareIntro:
      'Floyd is Rome medical/university regional hub — not Atlanta HOA collars and not Bartow I-75 outer growth alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Atlanta collar crews fight Perimeter peaks; Bartow rides I-75. Floyd pairs ride US-27, US-411, and Rome arterials — freer mid-day NW GA freeflow, still peak-heavy on medical campuses and intown pairs.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Bartow mixes Cartersville SFH and Allatoona edges. Floyd mixes Rome multi-story, medical-corridor stock, and ridge lots — more continuous regional city product, less continuous metro-collar HOA density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Historic and multi-story stock needs stair inventories; rural ridges add empty miles uncommon on pure suburban collar days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Floyd quotes often sit at secondary regional-hub rates for driveway SFH — multi-story access and medical peaks push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Floyd is independent Rome NW GA hub — not Atlanta defaults renamed.',
      },
    ],
    whatIntro: 'Rome multi-story, medical/university freeflow, and NW GA empty miles — not an Atlanta clone.',
    whatBullets: [
      {
        title: 'Medical and university calendars drive spikes',
        detail: 'Campus and hospital-adjacent moves fill crews differently than pure family Saturdays.',
      },
      {
        title: 'Rome multi-story is first-class product',
        detail: 'Stairs and historic street width need inventories different from pure suburban playbooks.',
      },
      {
        title: 'US-27 / US-411 freeflow is billable',
        detail: 'Cross-hub pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'AL / TN adjacency can create interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
    ],
    zonesHeading: 'Floyd zones: Rome core, medical/university corridors, suburban edges & rural ridges',
    zonesIntro: 'Two to four sharp products under one NW GA hub label.',
    zones: [
      z('rome-core', 'Rome city core & historic stock', 'Rome core', ['Rome', 'downtown', 'historic neighborhoods'], 'Multi-story, historic, multi-unit', ['Stairs', 'Street width', 'Parking'], ['rome ga'], 'Inventory stairs; plan temporary no-parking; measure street width.'),
      z('med-univ', 'Medical & university corridors', 'Medical / university', ['medical campuses', 'university edges'], 'Multi-family, SFH, campus-adjacent', ['Building COIs', 'Campus calendars'], ['rome medical'], 'Book around campus and clinical calendars; collect management packets.'),
      z('suburbs', 'Suburban edges', 'Suburbs', ['suburban Rome edges'], 'SFH, townhomes', ['HOA packets', 'Arterial timing'], ['rome suburbs'], 'Confirm driveway and HOA hours.'),
      z('ridges', 'Rural ridges & larger lots', 'Rural ridges', ['ridge towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Grades'], ['floyd rural'], 'Photo last-mile; rain and grade weeks need flexibility.'),
    ],
    specialized: [
      s('rome-city', 'Rome multi-story & historic access', 'Stairs and street width are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('med-univ', 'Medical/university corridor logistics', 'Campus and clinical calendars rewrite demand.', ['Book early around term and clinical peaks.', 'Collect building packets on multi-family.']),
      s('nw-freeflow', 'US-27 / US-411 hub freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Atlanta collar rates for Rome historic days.']),
    ],
    schoolsIntro:
      'Floyd families compare Floyd County and Rome City school options — verify boundaries; regional-hub reputation does not replace district maps.',
    hospitalsDetail:
      'Atrium Health Floyd and regional medical campuses anchor acute care; map peak freeflow on medical corridors.',
    costIntro: 'City access, medical peaks, and empty-mile ridges often matter more than raw miles.',
    seasonalIntro: 'University calendars, medical staffing moves, and school years reshape demand more than Atlanta HOA peaks alone.',
  },
  {
    file: 'whitfield-tier2.ts',
    exportName: 'whitfieldCountyTier2Intelligence',
    slug: 'whitfield',
    hubTitle: 'Whitfield County Moving Intelligence Hub',
    eyebrow: 'Whitfield · Dalton · carpet capital / I-75 north GA · independent',
    h1: 'Moving in Whitfield County: Dalton Manufacturing Hub, I-75 North GA & TN Border Access',
    heroOpener:
      'Whitfield County is north Georgia’s independent manufacturing corridor — Dalton multi-story and industrial-adjacent residential, I-75 freeflow, TN border adjacency, and product that does not answer to Atlanta collar defaults. Expect shift-window arterials, longer empty miles, and freeflow that is not Rome’s medical hub alone. This guide is for people moving in Whitfield as Dalton carpet-capital / I-75 north product — not an Atlanta metro rename.',
    heroCredibility:
      'I-75 manufacturing corridor · TN border · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-75 · US-41 · US-76 · GA-52 · GA-3 approaches',
    parentLabel: 'independent north GA manufacturing hub (vs Atlanta collar / Floyd defaults)',
    parentHref: '/local-movers/georgia/floyd',
    compareIntro:
      'Whitfield is Dalton I-75 manufacturing / TN-border product — not Atlanta HOA collars and not Rome medical-university hub alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Atlanta collar crews fight Perimeter peaks; Floyd rides US-27. Whitfield pairs ride I-75 north, US-41, and Dalton arterials — freer mid-day north GA freeflow, still peak-heavy on manufacturing-shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Floyd mixes Rome multi-story medical corridors. Whitfield mixes Dalton multi-story, industrial-edge SFH, and growth pockets — more continuous manufacturing-adjacent product, less continuous medical-campus density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; industrial freeflow timing rewrites residential pairs more often than pure suburban collar days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Whitfield quotes often sit at secondary manufacturing-hub rates for driveway SFH — shift peaks and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Whitfield is independent Dalton carpet-capital / I-75 north product — not Atlanta defaults renamed.',
      },
    ],
    whatIntro: 'Manufacturing-shift freeflow, Dalton multi-story, and TN border legs — not an Atlanta clone.',
    whatBullets: [
      {
        title: 'Manufacturing-shift windows rewrite arterials',
        detail: 'Industrial freeflow can choke residential pairs at shift change.',
      },
      {
        title: 'Dalton multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'TN adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'I-75 freeflow is still billable',
        detail: 'Cross-hub pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
    ],
    zonesHeading: 'Whitfield zones: Dalton core, industrial-edge residential, I-75 growth & rural edges',
    zonesIntro: 'Two to four sharp products under one north GA manufacturing-hub label.',
    zones: [
      z('dalton', 'Dalton city core', 'Dalton', ['Dalton', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['dalton'], 'Inventory stairs; plan temporary no-parking.'),
      z('industrial-edge', 'Industrial-edge residential', 'Industrial edge', ['manufacturing-adjacent neighborhoods'], 'SFH near industrial freeflow', ['Shift timing', 'Truck traffic'], ['whitfield industrial'], 'Avoid warehouse-shift peaks when possible; price portal-to-portal.'),
      z('i75-growth', 'I-75 growth pockets', 'I-75 growth', ['growth villages', 'corridor SFH'], 'Planned SFH, townhomes', ['HOA packets', 'I-75 peaks'], ['whitfield growth'], 'Collect COI early on new villages.'),
      z('rural', 'Rural edges & larger lots', 'Rural edges', ['eastern/western towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['whitfield rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('shift-windows', 'Manufacturing-shift corridor logistics', 'Shift windows rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Avoid peak industrial windows when possible.']),
      s('dalton-city', 'Dalton multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('tn-border', 'TN border interstate legs', 'Short-looking hops still need FMCSA.', ['Clarify destination state before deposit.', 'Verify USDOT/MC on interstate quotes.']),
    ],
    schoolsIntro:
      'Whitfield families compare Whitfield County and Dalton City school options — verify boundaries; manufacturing-hub reputation does not replace district maps.',
    hospitalsDetail:
      'Hamilton Medical Center and regional clinics anchor acute care; map peak freeflow on Dalton–I-75 corridors.',
    costIntro: 'Manufacturing peaks, city access, and empty miles often matter more than raw miles.',
    seasonalIntro: 'Industrial calendars and school years reshape demand more than Atlanta HOA peaks alone.',
  },
  {
    file: 'lowndes-tier2.ts',
    exportName: 'lowndesCountyTier2Intelligence',
    slug: 'lowndes',
    hubTitle: 'Lowndes County Moving Intelligence Hub',
    eyebrow: 'Lowndes · Valdosta · South Georgia hub · independent',
    h1: 'Moving in Lowndes County: Valdosta Regional Hub, University Cycles & I-75 South Access',
    heroOpener:
      'Lowndes County is South Georgia’s independent regional hub — Valdosta multi-story and university-adjacent stock, I-75 freeflow, and product that does not answer to Atlanta collar defaults. Expect term-weekend spikes, longer empty miles to rural edges, and freeflow that is not coastal Glynn tourism product. This guide is for people moving in Lowndes as Valdosta South GA hub — not an Atlanta metro rename.',
    heroCredibility:
      'I-75 south regional hub · University + residential · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-75 · US-41 · US-84 · GA-38 · GA-31 approaches',
    parentLabel: 'independent South Georgia hub (vs Atlanta collar / coastal defaults)',
    parentHref: '/local-movers/georgia/houston',
    compareIntro:
      'Lowndes is Valdosta university / South GA regional hub — not Atlanta HOA collars and not coastal tourism freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Atlanta collar crews fight Perimeter peaks; coastal crews fight I-95 tourism. Lowndes pairs ride I-75 south, US-41, and Valdosta arterials — freer mid-day South GA freeflow, still peak-heavy on university move weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Atlanta collars mix HOA growth SFH. Lowndes mixes Valdosta multi-story, student multi-family, and rural-edge lots — more continuous secondary-hub product, less continuous metro-collar HOA density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story and student buildings need stair inventories and management packets; rural edges add empty miles uncommon on pure suburban collar days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Lowndes quotes often sit at secondary South GA rates for driveway SFH — university peaks and multi-story access push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Lowndes is independent Valdosta South GA hub — not Atlanta defaults renamed.',
      },
    ],
    whatIntro: 'University calendars, Valdosta multi-story, and I-75 south freeflow — not an Atlanta clone.',
    whatBullets: [
      {
        title: 'University move cycles dominate demand spikes',
        detail: 'Term start/end weekends fill local crews first — book early.',
      },
      {
        title: 'Valdosta multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure rural playbooks.',
      },
      {
        title: 'FL adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'I-75 freeflow is still billable',
        detail: 'Cross-hub pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
    ],
    zonesHeading: 'Lowndes zones: Valdosta core, campus multi-family, I-75 growth & rural edges',
    zonesIntro: 'Two to four sharp products under one South GA hub label.',
    zones: [
      z('valdosta', 'Valdosta city core', 'Valdosta', ['Valdosta', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['valdosta'], 'Inventory stairs; plan temporary no-parking.'),
      z('campus', 'Campus / student multi-family', 'Campus density', ['university edges', 'student apartments'], 'Student multi-family, apartments', ['Lease-end clusters', 'Building COIs'], ['valdosta state'], 'Book early around term calendars; collect management packets.'),
      z('i75-growth', 'I-75 growth SFH', 'I-75 growth', ['growth villages', 'corridor SFH'], 'Planned SFH, townhomes', ['HOA packets'], ['lowndes growth'], 'Collect COI early on new villages.'),
      z('rural', 'Rural edges & larger lots', 'Rural edges', ['county towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['lowndes rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('university', 'University term-start / term-end turnover', 'Term calendars create multi-family clusters.', ['Book early around move-in/move-out weekends.', 'Expect short-notice multi-family demand.']),
      s('valdosta-city', 'Valdosta multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('i75-south', 'I-75 South GA freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Atlanta collar rates for Valdosta historic days.']),
    ],
    schoolsIntro:
      'Lowndes families compare Lowndes County and Valdosta City school options — verify boundaries; university housing patterns do not replace district maps for family SFH.',
    hospitalsDetail:
      'South Georgia Medical Center and regional clinics anchor acute care; map peak freeflow on Valdosta arterials.',
    costIntro: 'Term spikes, city access, and empty miles often matter more than raw miles.',
    seasonalIntro: 'University calendars and school years reshape demand more than Atlanta HOA peaks alone.',
  },
  {
    file: 'glynn-tier2.ts',
    exportName: 'glynnCountyTier2Intelligence',
    slug: 'glynn',
    hubTitle: 'Glynn County Moving Intelligence Hub',
    eyebrow: 'Glynn · Brunswick / Golden Isles · coastal independent',
    h1: 'Moving in Glynn County: Brunswick, Golden Isles Access & I-95 Coastal Living',
    heroOpener:
      'Glynn County is coastal Georgia’s Golden Isles market — Brunswick multi-story and mainland stock, St. Simons and Sea Island bridge/causeway constraints, tourism calendars, and freeflow that is not Savannah/Chatham historic-square product. Expect humidity packing, island last-mile that rejects full trailers, and I-95 freeflow that still peaks hard on holiday weekends. This guide is for people moving in Glynn as Brunswick / Golden Isles coastal product — not a Chatham rename.',
    heroCredibility:
      'Golden Isles coastal · Tourism + residential · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-95 · US-17 · US-341 · GA-25 · Torras Causeway / island approaches',
    parentLabel: 'independent coastal GA (distant Chatham / Savannah contrast)',
    parentHref: '/local-movers/georgia/chatham',
    compareIntro:
      'Glynn is Brunswick / Golden Isles coastal product — not Savannah historic-square density and not I-16 port logistics alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Chatham crews fight historic district and island bridge peaks into Savannah/Tybee. Glynn pairs ride I-95, US-17, and Torras Causeway approaches — freer mid-day mid-coast freeflow, still peak-heavy on island tourism weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Chatham mixes Savannah squares and Tybee cottages. Glynn mixes Brunswick multi-story, mainland SFH, and St. Simons/Sea Island resort stock — more continuous Golden Isles tourism product, less continuous historic-lane density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Island causeways and resort streets often need smaller trucks; humidity packing and salt air matter more than Atlanta HOA playbooks.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Glynn quotes often sit at secondary coastal rates for mainland SFH — island shuttles and tourism peaks can price above quiet inland days.',
      },
      {
        title: 'Role difference',
        detail:
          'Glynn is Golden Isles coastal independent — not Chatham Savannah renamed.',
      },
    ],
    whatIntro: 'Island causeways, tourism peaks, and coastal humidity — not a Savannah clone.',
    whatBullets: [
      {
        title: 'Golden Isles last-mile rewrites truck size',
        detail: 'Causeway and resort streets often reject full trailers — photo approaches.',
      },
      {
        title: 'Tourism calendars tighten curb plans',
        detail: 'Holiday and summer peaks fill crews and streets differently than pure family Saturdays.',
      },
      {
        title: 'Humidity and salt air are operational',
        detail: 'Protection labor matters more than inland Georgia jobs.',
      },
      {
        title: 'I-95 freeflow is still billable',
        detail: 'Mainland pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
    ],
    zonesHeading: 'Glynn zones: Brunswick mainland, St. Simons island, Sea Island/resort edge & rural mainland',
    zonesIntro: 'Two to four sharp products under one Golden Isles coastal label.',
    zones: [
      z('brunswick', 'Brunswick mainland core', 'Brunswick', ['Brunswick', 'mainland neighborhoods'], 'Multi-story, SFH, mixed stock', ['Stairs', 'Street parking', 'Humidity'], ['brunswick'], 'Inventory stairs; plan humidity-aware packing; temporary no-parking where needed.'),
      z('st-simons', 'St. Simons island approaches', 'St. Simons', ['St. Simons', 'island villages'], 'Island SFH, multi-unit tourism stock', ['Causeway timing', 'Narrow streets', 'Tourism parking'], ['st simons'], 'Photo last-mile; plan smaller trucks; book around peak tourism weekends.'),
      z('sea-island', 'Sea Island / resort edge', 'Resort edge', ['Sea Island approaches', 'resort properties'], 'Resort homes, multi-unit tourism stock', ['Access rules', 'Seasonal peaks'], ['sea island'], 'Confirm access rules early; do not price as pure Brunswick driveway days.'),
      z('rural-mainland', 'Rural mainland & larger lots', 'Rural mainland', ['mainland towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['glynn mainland'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('island-access', 'Golden Isles causeway & island logistics', 'Bridge timing and street width are first-class cost drivers.', ['Photo last-mile before surveys finalize.', 'Shuttle conversations beat stuck trailers.']),
      s('tourism-peaks', 'Coastal tourism calendar moves', 'Summer and holiday peaks rewrite demand.', ['Book early for peak weekends.', 'Confirm curb rules for seasonal multi-unit stock.']),
      s('vs-chatham', 'Distinct from Savannah historic product', 'Glynn is not square-and-lane historic density.', ['Do not recycle Chatham historic-district playbooks.', 'Island humidity and causeways are the differentiators.']),
    ],
    schoolsIntro:
      'Glynn families compare Glynn County Schools feeders across Brunswick and island communities — verify boundaries; island vs mainland feeders differ.',
    hospitalsDetail:
      'Southeast Georgia Health System and regional clinics anchor acute care; map peak freeflow across mainland–island approaches.',
    costIntro: 'Island access, tourism peaks, and humidity packing often matter more than raw miles.',
    seasonalIntro: 'Summer tourism, holiday weekends, and hurricane-season readiness reshape demand more than Atlanta HOA peaks alone.',
  },
  {
    file: 'dougherty-tier2.ts',
    exportName: 'doughertyCountyTier2Intelligence',
    slug: 'dougherty',
    hubTitle: 'Dougherty County Moving Intelligence Hub',
    eyebrow: 'Dougherty · Albany · Southwest Georgia hub · independent',
    h1: 'Moving in Dougherty County: Albany Regional Hub, Medical Corridors & SW Georgia Access',
    heroOpener:
      'Dougherty County is Southwest Georgia’s independent regional hub — Albany multi-story and medical-corridor stock, agricultural-adjacent residential edges, and freeflow that does not answer to Atlanta collar defaults or coastal tourism scripts. Expect city stairs, longer empty miles to rural lots, and freeflow that is not Valdosta university product alone. This guide is for people moving in Dougherty as Albany SW GA hub — not an Atlanta metro rename.',
    heroCredibility:
      'SW Georgia hub · Medical/agricultural · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-19 · US-82 · GA-300 · GA-91 · GA-62 approaches',
    parentLabel: 'independent Southwest Georgia hub (vs Atlanta / coastal / Lowndes defaults)',
    parentHref: '/local-movers/georgia/lowndes',
    compareIntro:
      'Dougherty is Albany medical/agricultural SW GA hub — not Atlanta HOA collars, not coastal tourism, and not Valdosta university freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Atlanta collar crews fight Perimeter peaks; Lowndes rides I-75. Dougherty pairs ride US-19, US-82, and Albany arterials — freer mid-day SW GA freeflow, still peak-heavy on medical campuses and intown pairs.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lowndes mixes Valdosta student multi-family. Dougherty mixes Albany multi-story, medical-corridor stock, and ag-edge lots — more continuous regional medical-hub product, less continuous university multi-family density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; rural ag edges add empty miles and soft-shoulder risk uncommon on pure suburban collar days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Dougherty quotes often sit at secondary SW GA rates for driveway SFH — multi-story access and medical peaks push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Dougherty is independent Albany SW GA hub — not Atlanta, coastal, or Valdosta renamed.',
      },
    ],
    whatIntro: 'Albany multi-story, medical freeflow, and ag-edge empty miles — not an Atlanta or coastal clone.',
    whatBullets: [
      {
        title: 'Medical-corridor calendars drive spikes',
        detail: 'Hospital-adjacent moves fill crews differently than pure family Saturdays.',
      },
      {
        title: 'Albany multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure rural playbooks.',
      },
      {
        title: 'Ag-edge last-mile rewrites truck size',
        detail: 'Photo approaches; soft shoulders after rain are common.',
      },
      {
        title: 'FL / AL adjacency can create interstate legs',
        detail: 'Border destinations need FMCSA authority.',
      },
    ],
    zonesHeading: 'Dougherty zones: Albany core, medical corridors, suburban edges & ag/rural lots',
    zonesIntro: 'Two to four sharp products under one SW GA hub label.',
    zones: [
      z('albany-core', 'Albany city core', 'Albany core', ['Albany', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['albany ga'], 'Inventory stairs; plan temporary no-parking.'),
      z('medical', 'Medical corridor residential', 'Medical corridors', ['medical campus edges'], 'Multi-family, SFH, campus-adjacent', ['Building COIs', 'Clinical calendars'], ['albany medical'], 'Book around clinical peaks; collect management packets.'),
      z('suburbs', 'Suburban edges', 'Suburbs', ['suburban Albany edges'], 'SFH, townhomes', ['HOA packets', 'Arterial timing'], ['albany suburbs'], 'Confirm driveway and HOA hours.'),
      z('ag-rural', 'Ag-edge & rural lots', 'Ag/rural', ['agricultural edges', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['dougherty rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('albany-city', 'Albany multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('medical', 'Medical corridor logistics', 'Clinical calendars rewrite demand.', ['Book early around staffing and clinic peaks.', 'Collect building packets on multi-family.']),
      s('ag-edge', 'Agricultural-edge empty miles', 'Rural approaches rewrite hourly math.', ['Photo last-mile before locking truck size.', 'Do not quote Atlanta collar rates for ag-edge lots.']),
    ],
    schoolsIntro:
      'Dougherty families compare Dougherty County and related city school options — verify boundaries; regional-hub reputation does not replace district maps.',
    hospitalsDetail:
      'Phoebe Putney and regional medical campuses anchor acute care; map peak freeflow on medical corridors.',
    costIntro: 'City access, medical peaks, and empty-mile edges often matter more than raw miles.',
    seasonalIntro: 'Medical staffing moves, school years, and agricultural calendars reshape demand more than Atlanta HOA peaks alone.',
  },
  {
    file: 'troup-tier2.ts',
    exportName: 'troupCountyTier2Intelligence',
    slug: 'troup',
    hubTitle: 'Troup County Moving Intelligence Hub',
    eyebrow: 'Troup · LaGrange · I-85 west Georgia · vs Coweta',
    h1: 'Moving in Troup County: LaGrange, I-85 West Corridor & Alabama Border Access',
    heroOpener:
      'Troup County is west Georgia’s I-85 corridor hub — LaGrange multi-story and seat density, longer empty miles than Coweta’s Newnan outer collar, AL border adjacency, and product that is not a Coweta rename. Expect small-city stairs, industrial-adjacent residential, and freeflow that still peaks hard on I-85. This guide is for people moving in Troup as LaGrange I-85 west product — not Newnan film-edge growth with different labels.',
    heroCredibility:
      'I-85 west corridor · AL border · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-85 · US-27 · US-29 · GA-109 · GA-219 approaches',
    parentLabel: 'Coweta County (and independent west GA patterns)',
    parentHref: '/local-movers/georgia/coweta',
    compareIntro:
      'Troup is LaGrange I-85 west / AL-border product — not Coweta Newnan film-edge outer collar alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Coweta crews fight I-85 closer to the Perimeter. Troup pairs ride I-85 further west, US-27, and LaGrange arterials — freer mid-day west freeflow, still peak-heavy on school and industrial-shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Coweta mixes Newnan multi-story and Senoia film-edge homes. Troup mixes LaGrange multi-story, industrial-edge SFH, and larger-lot edges — more continuous west-GA hub product, less continuous Atlanta-outer film/residential mix.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; AL border hops flip jobs to interstate authority more often than pure in-metro Coweta pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Troup quotes often sit at secondary west-GA rates for driveway SFH — empty miles from Coweta/Atlanta staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Troup is I-85 west LaGrange / AL-border product — not Coweta Newnan renamed.',
      },
    ],
    whatIntro: 'I-85 west freeflow, LaGrange multi-story, and AL border legs — not a Coweta clone.',
    whatBullets: [
      {
        title: 'I-85 west freeflow is billable',
        detail: 'LaGrange ↔ Coweta pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'AL adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'LaGrange multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Distinct from Newnan film-edge product',
        detail: 'Do not recycle Senoia production playbooks for LaGrange industrial-edge days.',
      },
    ],
    zonesHeading: 'Troup zones: LaGrange core, I-85 growth, industrial-edge residential & rural west',
    zonesIntro: 'Two to four sharp products under one I-85 west hub label.',
    zones: [
      z('lagrange', 'LaGrange seat & core', 'LaGrange', ['LaGrange', 'downtown edges'], 'Multi-story, SFH, mixed stock', ['Stairs', 'Street parking', 'Arterial timing'], ['lagrange'], 'Inventory stairs; plan temporary no-parking.'),
      z('i85-growth', 'I-85 corridor growth', 'I-85 growth', ['growth villages', 'corridor SFH'], 'Planned SFH, townhomes', ['HOA packets', 'I-85 peaks'], ['troup growth'], 'Collect COI early; price portal-to-portal toward Coweta/Atlanta.'),
      z('industrial-edge', 'Industrial-edge residential', 'Industrial edge', ['manufacturing-adjacent neighborhoods'], 'SFH near industrial freeflow', ['Shift timing', 'Truck traffic'], ['troup industrial'], 'Avoid shift peaks when possible; price portal-to-portal.'),
      z('rural-west', 'Rural west & AL approaches', 'Rural west', ['western towns', 'border approaches'], 'Larger lots, rural approaches', ['Empty miles', 'Border interstate'], ['troup west'], 'Photo last-mile; clarify AL destinations for FMCSA authority.'),
    ],
    specialized: [
      s('i85-west', 'I-85 west freeflow', 'Outer pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Coweta Newnan rates for LaGrange multi-story days.']),
      s('al-border', 'Alabama border interstate legs', 'Short-looking hops still need FMCSA.', ['Clarify destination state before deposit.', 'Verify USDOT/MC on interstate quotes.']),
      s('lagrange-city', 'LaGrange multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
    ],
    schoolsIntro:
      'Troup families compare Troup County Schools feeders across LaGrange — verify boundaries; do not assume Coweta maps apply.',
    hospitalsDetail:
      'Wellstar West Georgia Medical Center and regional clinics anchor acute care; map peak freeflow on LaGrange–I-85 corridors.',
    costIntro: 'Empty miles, city access, and I-85 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and industrial calendars reshape demand more than Coweta film peaks alone.',
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

/** ${p.slug} — GA Tier 2 Wave 2 */
export const ${p.exportName}: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: '${p.slug}',
  hubTitle: '${esc(p.hubTitle)}',
  eyebrow: '${esc(p.eyebrow)}',
  h1: '${esc(p.h1)}',
  heroOpener: '${esc(p.heroOpener)}',
  heroCredibility: '${esc(p.heroCredibility)}',
  majorCorridors: '${esc(p.majorCorridors)}',
  lastReviewed: '2026-07-24',
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
              'Growth pockets, university, military, and tourism markets can tighten housing near school calendars.',
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
      { title: 'School & institutional calendars', detail: 'Term, tourism, or industrial windows can outrank pure weekend demand.' },
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
console.log('Generated', packs.length, 'GA Tier 2 Wave 2 packs');
