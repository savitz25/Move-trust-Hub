/**
 * Generate MI Tier 2 Wave 1 packs (12 counties).
 * Run: npx tsx scripts/generate-mi-tier2-wave1.ts
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

const z = (
  id: string,
  name: string,
  shortName: string,
  neighborhoods: string[],
  housingTypes: string,
  challenges: string[],
  keywords: string[],
  moverTips: string
): Zone => ({ id, name, shortName, neighborhoods, housingTypes, challenges, keywords, moverTips });
const s = (id: string, title: string, intro: string, bullets: string[]): Spec => ({
  id,
  title,
  intro,
  bullets,
});

const packs: PackDef[] = [
  {
    file: 'ottawa-tier2.ts',
    exportName: 'ottawaCountyMiTier2Intelligence',
    slug: 'ottawa',
    hubTitle: 'Ottawa County Moving Intelligence Hub',
    eyebrow: 'Ottawa · Holland / Hudsonville / Zeeland · GR west lakeshore · vs Kent',
    h1: 'Moving in Ottawa County: Holland, Hudsonville & US-31 West Lakeshore Collar',
    heroOpener:
      'Ottawa County is Grand Rapids’ west lakeshore collar — Holland multi-story and tourism stock, Hudsonville and Zeeland growth HOAs, Grand Haven shore approaches, and freeflow that is not Kent’s downtown elevators or Heritage Hill stairs. Expect lakeshore staging, furniture/manufacturing calendars, and portal-to-portal time that map miles understate. This guide is for people moving in Ottawa as west-lakeshore collar product — not a Grand Rapids rename and not a Muskegon port clone.',
    heroCredibility:
      'West lakeshore · Furniture/manufacturing collar · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-96 · US-31 · M-6 links · M-45 · lakeshore corridors',
    parentLabel: 'Kent County',
    parentHref: '/local-movers/michigan/kent',
    compareIntro:
      'Ottawa is Holland / Hudsonville lakeshore and west-collar growth — not Grand Rapids core multi-unit density and not Muskegon port product alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Kent crews fight downtown GR and US-131 peaks. Ottawa pairs ride US-31, I-196/I-96 links, and lakeshore arterials — freer mid-day west of the core, still peak-heavy on tourism weekends and commute windows into GR.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Kent mixes Heritage Hill multi-story and south-belt multi-family. Ottawa mixes Holland multi-story, Zeeland/Hudsonville planned SFH, and shore cottages — more continuous lakeshore and furniture-town product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets dominate growth villages; shore streets can tighten truck size more often than pure Cascade cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Ottawa quotes often sit at west-collar rates for driveway SFH — tourism peaks and empty miles into GR still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Ottawa is GR west lakeshore collar — not Kent core renamed and not Muskegon north-port product.',
      },
    ],
    whatIntro: 'US-31 freeflow, lakeshore staging, and furniture-town calendars — not a GR core clone.',
    whatBullets: [
      {
        title: 'US-31 / lakeshore freeflow is billable',
        detail: 'Holland ↔ GR pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Tourism weekends rewrite shore access',
        detail: 'Summer and festival windows tighten curb plans on lakeshore stock.',
      },
      {
        title: 'Distinct from Muskegon north lakeshore',
        detail: 'Holland/Zeeland furniture-collar product is not Muskegon port multi-story alone.',
      },
      {
        title: 'HOA growth dominates Hudsonville/Zeeland volume',
        detail: 'COI and gate lists are standard on planned villages.',
      },
    ],
    zonesHeading: 'Ottawa zones: Holland core, Hudsonville–Zeeland growth, Grand Haven shore & rural east',
    zonesIntro: 'Two to four sharp products under one west-lakeshore collar label.',
    zones: [
      z('holland', 'Holland multi-story & tourism stock', 'Holland', ['Holland', 'downtown edges'], 'Multi-story, multi-unit, SFH', ['Stairs', 'Tourism parking', 'Street width'], ['holland'], 'Inventory stairs; book around festival peaks when flexible.'),
      z('hudsonville-zeeland', 'Hudsonville / Zeeland HOA growth', 'Hudsonville–Zeeland', ['Hudsonville', 'Zeeland', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'Cul-de-sac staging'], ['hudsonville', 'zeeland'], 'Collect COI early; weekday windows often beat Saturdays.'),
      z('grand-haven', 'Grand Haven lakeshore edge', 'Grand Haven', ['Grand Haven', 'shore approaches'], 'SFH, seasonal stock', ['Last-mile width', 'Tourism peaks'], ['grand haven'], 'Photo approaches; plan smaller trucks near shore streets.'),
      z('east-collar', 'East collar toward GR', 'East collar', ['Jenison edges', 'eastern townships'], 'SFH, multi-family pockets', ['Commute peaks', 'HOA packets'], ['jenison'], 'Price portal-to-portal toward Kent destinations.'),
    ],
    specialized: [
      s('lakeshore', 'Lakeshore tourism & staging logistics', 'Seasonal peaks rewrite curb plans.', ['Book early for summer weekends.', 'Photo shore last-mile before final quote.']),
      s('hoa-growth', 'Hudsonville / Zeeland HOA growth', 'Master-plan rules are first-class cost drivers.', ['Gate lists early.', 'Mud weeks on new streets need flexibility.']),
      s('vs-kent-muskegon', 'Distinct from Kent core and Muskegon port', 'West collar differs from GR elevators and north-port product.', ['Do not recycle downtown GR or Muskegon-only playbooks.', 'Holland/Zeeland lakeshore mix is the differentiator.']),
    ],
    schoolsIntro:
      'Ottawa families compare Holland, Zeeland, Hudsonville, Grand Haven, and other districts — verify boundaries; do not assume Grand Rapids Public maps apply.',
    hospitalsDetail:
      'Holland Hospital and west-Michigan regional systems serve the collar; map peak freeflow on US-31 corridors.',
    costIntro: 'Tourism peaks, HOA soft costs, and empty miles into GR often matter more than raw miles.',
    seasonalIntro: 'Summer lakeshore demand and school years reshape calendars more than pure GR office peaks alone.',
  },
  {
    file: 'livingston-tier2.ts',
    exportName: 'livingstonCountyMiTier2Intelligence',
    slug: 'livingston',
    hubTitle: 'Livingston County Moving Intelligence Hub',
    eyebrow: 'Livingston · Brighton / Howell · Detroit–Lansing west collar · vs Oakland',
    h1: 'Moving in Livingston County: Brighton, Howell & US-23 Growth Suburbs',
    heroOpener:
      'Livingston County is the US-23 growth collar between metro Detroit and Lansing — Brighton multi-family and HOA villages, Howell seat stock, longer empty miles than Oakland’s continuous north-metro density, and freeflow that is not a Troy/Birmingham rename. Expect master-plan COIs, school-calendar SFH volume, and portal-to-portal time that map miles understate. This guide is for people moving in Livingston as US-23 collar product — not an Oakland rename.',
    heroCredibility:
      'US-23 growth suburbs · Detroit–Lansing corridor · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-23 · I-96 · M-59 · M-36 · Grand River Ave corridors',
    parentLabel: 'Oakland County (and Wayne metro patterns)',
    parentHref: '/local-movers/michigan/oakland',
    compareIntro:
      'Livingston is Brighton / Howell US-23 growth collar — not Oakland Troy corporate HOA density and not Wayne city elevators alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Oakland crews fight I-75/I-696 north-metro peaks. Livingston pairs ride US-23, I-96, and Brighton arterials — freer mid-day further west, still peak-heavy on commute windows into Oakland and Ann Arbor edges.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Oakland mixes continuous corporate HOAs and village cores. Livingston mixes Brighton multi-family, Howell seat SFH, and larger-lot townships — more continuous outer-collar growth product, less continuous north-metro executive density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets dominate growth villages; rural township approaches add empty miles uncommon on pure Farmington Hills cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Livingston quotes often sit at outer-collar rates for driveway SFH — empty miles into Oakland still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Livingston is US-23 Detroit–Lansing collar growth — not Oakland renamed.',
      },
    ],
    whatIntro: 'US-23 freeflow, Brighton growth, and outer empty miles — not an Oakland clone.',
    whatBullets: [
      {
        title: 'US-23 freeflow is billable',
        detail: 'Brighton ↔ Oakland pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'HOA growth dominates family volume',
        detail: 'COI and gate lists on planned villages are standard.',
      },
      {
        title: 'Distinct from Oakland continuous north-metro density',
        detail: 'Outer collar is not Troy/Birmingham product alone.',
      },
      {
        title: 'Winter ice on US-23 rewrites mornings',
        detail: 'Build weather buffers into peak commute quotes.',
      },
    ],
    zonesHeading: 'Livingston zones: Brighton growth, Howell seat, US-23 corridors & rural townships',
    zonesIntro: 'Two to four sharp products under one US-23 collar label.',
    zones: [
      z('brighton', 'Brighton multi-family & HOA growth', 'Brighton', ['Brighton', 'growth villages'], 'Multi-family, planned SFH, townhomes', ['HOA packets', 'Building COIs', 'US-23 peaks'], ['brighton'], 'Collect COI and management packets early; price portal-to-portal.'),
      z('howell', 'Howell seat & core', 'Howell', ['Howell', 'seat neighborhoods'], 'SFH, multi-story older stock', ['Street width', 'Mixed access'], ['howell'], 'Inventory older multi-story; confirm staging near seat arterials.'),
      z('us23', 'US-23 corridor suburbs', 'US-23 corridors', ['corridor townships'], 'SFH, townhomes', ['Commute peaks'], ['livingston us-23'], 'Avoid peak US-23 windows when possible.'),
      z('rural', 'Rural townships & larger lots', 'Rural townships', ['eastern/western townships'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['livingston rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('us23', 'US-23 collar freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Oakland multi-family rates for rural township lots.']),
      s('hoa-growth', 'Brighton HOA / multi-family mix', 'Building packets and gate lists dominate growth stock.', ['Elevator windows early.', 'Mud weeks on new streets need flexibility.']),
      s('vs-oakland', 'Distinct from Oakland north-metro', 'Outer US-23 product differs from continuous Troy density.', ['Do not recycle Birmingham village-only playbooks.', 'Brighton/Howell outer collar is the differentiator.']),
    ],
    schoolsIntro:
      'Livingston families compare Brighton, Howell, Hartland, and other districts — verify boundaries; do not assume Oakland maps apply.',
    hospitalsDetail:
      'Trinity Health and regional systems serve the collar; map peak freeflow on US-23/I-96 corridors.',
    costIntro: 'Empty miles, HOA soft costs, and US-23 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than pure Oakland corporate peaks alone.',
  },
  {
    file: 'st-clair-tier2.ts',
    exportName: 'stClairCountyMiTier2Intelligence',
    slug: 'st-clair',
    hubTitle: 'St. Clair County Moving Intelligence Hub',
    eyebrow: 'St. Clair · Port Huron / Marysville · Blue Water east edge · vs Macomb',
    h1: 'Moving in St. Clair County: Port Huron, Marysville & I-94 Blue Water East Edge',
    heroOpener:
      'St. Clair County is metro Detroit’s east Blue Water edge — Port Huron multi-story and river-city stock, Marysville corridors, I-94 terminus freeflow, and border-adjacent logistics that are not Macomb’s continuous Warren/Sterling Heights industrial-suburban density. Expect longer empty miles into the east-metro core, winter ice, and freeflow that still peaks hard on I-94. This guide is for people moving in St. Clair as east-edge / border product — not a Macomb rename.',
    heroCredibility:
      'I-94 east terminus · Border-adjacent · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-94 · I-69 · M-25 · M-29 · Gratiot Ave links',
    parentLabel: 'Macomb County',
    parentHref: '/local-movers/michigan/macomb',
    compareIntro:
      'St. Clair is Port Huron / Marysville Blue Water east-edge product — not Macomb continuous east-metro multi-family density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Macomb crews fight I-94/M-59 east-metro peaks closer in. St. Clair pairs ride I-94 further east, M-25, and Port Huron arterials — freer mid-day at the terminus, still peak-heavy on bridge approaches and commute windows westbound.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Macomb mixes continuous industrial-suburban multi-family. St. Clair mixes Port Huron multi-story, Marysville SFH, and rural lake-edge lots — more continuous terminus/edge product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; border destinations flip jobs to FMCSA more often than pure in-Macomb pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local St. Clair quotes often sit at east-edge rates for driveway SFH — empty miles into Macomb still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'St. Clair is Blue Water I-94 east edge — not Macomb renamed.',
      },
    ],
    whatIntro: 'I-94 terminus freeflow, Port Huron multi-story, and border interstate legs — not a Macomb clone.',
    whatBullets: [
      {
        title: 'I-94 freeflow is billable',
        detail: 'Port Huron ↔ Macomb pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Canada / border adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority clarity.',
      },
      {
        title: 'Port Huron multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure township SFH playbooks.',
      },
      {
        title: 'Winter ice on lakeshore approaches is operational',
        detail: 'Build weather buffers into morning plans.',
      },
    ],
    zonesHeading: 'St. Clair zones: Port Huron core, Marysville corridors, lakeshore edges & rural west',
    zonesIntro: 'Two to four sharp products under one Blue Water east-edge label.',
    zones: [
      z('port-huron', 'Port Huron multi-story & river-city stock', 'Port Huron', ['Port Huron', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking', 'Winter ice'], ['port huron'], 'Inventory stairs; plan temporary no-parking; winter flexibility required.'),
      z('marysville', 'Marysville corridor suburbs', 'Marysville', ['Marysville', 'corridor edges'], 'SFH, townhomes', ['Arterial timing', 'HOA packets'], ['marysville'], 'Confirm driveway staging; price portal-to-portal westbound.'),
      z('lakeshore', 'Lakeshore / river edges', 'Lakeshore edges', ['shore approaches', 'river towns'], 'SFH, seasonal constraints', ['Last-mile width', 'Winter ice'], ['st clair lakeshore'], 'Photo approaches; plan smaller trucks near shore streets.'),
      z('rural-west', 'Rural west toward Macomb', 'Rural west', ['western townships'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['st clair west'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i94-terminus', 'I-94 Blue Water freeflow', 'Terminus pairs still peak hard westbound.', ['Price portal-to-portal honestly.', 'Do not quote Macomb multi-family rates for rural lake lots.']),
      s('border', 'Border-adjacent interstate legs', 'Short-looking hops still need FMCSA.', ['Clarify destination country/state before deposit.', 'Verify USDOT/MC on interstate quotes.']),
      s('port-huron-city', 'Port Huron multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
    ],
    schoolsIntro:
      'St. Clair families compare Port Huron, Marysville, and other districts — verify boundaries; do not assume Macomb maps apply.',
    hospitalsDetail:
      'McLaren Port Huron and regional systems serve the east edge; map peak freeflow on I-94 corridors.',
    costIntro: 'Empty miles, city access, and I-94 peaks often matter more than raw miles.',
    seasonalIntro: 'Winter ice and school years reshape demand more than pure Macomb industrial peaks alone.',
  },
  {
    file: 'monroe-tier2.ts',
    exportName: 'monroeCountyMiTier2Intelligence',
    slug: 'monroe',
    hubTitle: 'Monroe County Moving Intelligence Hub',
    eyebrow: 'Monroe · Detroit south / OH border · vs Wayne',
    h1: 'Moving in Monroe County: Monroe Seat, I-75 South Collar & Ohio Border Access',
    heroOpener:
      'Monroe County is metro Detroit’s south I-75 collar — Monroe multi-story and seat stock, township SFH growth, Ohio border adjacency, and freeflow that is not Wayne’s downtown elevators or Downriver multi-family alone. Expect longer empty miles into the city core, industrial freeflow timing, and interstate legs that flip to FMCSA at the state line. This guide is for people moving in Monroe as Detroit-south / OH-border product — not a Wayne rename. (MI export avoids Ohio Monroe name clash.)',
    heroCredibility:
      'I-75 south collar · OH border · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-75 · US-23 · US-24 · M-50 · Dixie Hwy corridors',
    parentLabel: 'Wayne County',
    parentHref: '/local-movers/michigan/wayne',
    compareIntro:
      'Monroe is I-75 south-collar and OH-border product — not Detroit core multi-unit density and not continuous Downriver multi-family alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Wayne crews fight I-75/I-94 city peaks. Monroe pairs ride I-75 further south, US-23/US-24, and Monroe arterials — freer mid-day at the south edge, still peak-heavy on commute windows northbound.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Wayne mixes downtown elevators and Downriver stock. Monroe mixes Monroe multi-story, township SFH, and industrial-edge homes — more continuous south-collar product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; OH destinations flip jobs to FMCSA more often than pure in-Wayne pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Monroe quotes often sit at south-collar rates for driveway SFH — empty miles into Wayne still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Monroe is Detroit-south I-75 / OH-border collar — not Wayne renamed.',
      },
    ],
    whatIntro: 'I-75 south freeflow, Monroe multi-story, and OH interstate legs — not a Wayne clone.',
    whatBullets: [
      {
        title: 'I-75 freeflow is billable',
        detail: 'Monroe ↔ Wayne pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Ohio adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'Monroe multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure township SFH playbooks.',
      },
      {
        title: 'Industrial freeflow can rewrite timing',
        detail: 'Shift windows choke some residential pairs near industrial edges.',
      },
    ],
    zonesHeading: 'Monroe zones: Monroe city core, township growth, I-75 corridors & OH-border edges',
    zonesIntro: 'Two to four sharp products under one south-collar label.',
    zones: [
      z('monroe-city', 'Monroe multi-story & seat', 'Monroe city', ['Monroe', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['monroe mi'], 'Inventory stairs; plan temporary no-parking.'),
      z('townships', 'Township SFH growth', 'Township growth', ['growth townships'], 'SFH, townhomes', ['HOA packets', 'Empty miles'], ['monroe townships'], 'Collect COI early; photo last-mile on new streets.'),
      z('i75', 'I-75 corridor residential', 'I-75 corridors', ['corridor neighborhoods'], 'SFH, multi-family pockets', ['I-75 peaks', 'Shift timing'], ['monroe i-75'], 'Price portal-to-portal; avoid peak industrial windows when possible.'),
      z('oh-border', 'Ohio-border edges', 'OH border', ['southern edges'], 'SFH, rural approaches', ['Empty miles', 'Interstate legs'], ['monroe oh border'], 'Clarify OH destinations for FMCSA authority early.'),
    ],
    specialized: [
      s('i75-south', 'I-75 south-collar freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Wayne elevator rates for township driveways.']),
      s('oh-border', 'Ohio border interstate legs', 'Short-looking hops still need FMCSA.', ['Clarify destination state before deposit.', 'Verify USDOT/MC on interstate quotes.']),
      s('monroe-city', 'Monroe multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
    ],
    schoolsIntro:
      'Monroe families compare Monroe Public and township districts — verify boundaries; do not assume Wayne maps apply.',
    hospitalsDetail:
      'ProMedica Monroe and regional systems serve the south collar; map peak freeflow on I-75 corridors.',
    costIntro: 'Empty miles, city access, and I-75 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and industrial calendars reshape demand more than pure Detroit office peaks alone.',
  },
  {
    file: 'jackson-tier2.ts',
    exportName: 'jacksonCountyMiTier2Intelligence',
    slug: 'jackson',
    hubTitle: 'Jackson County Moving Intelligence Hub',
    eyebrow: 'Jackson · south-central independent · I-94 · vs Washtenaw',
    h1: 'Moving in Jackson County: Jackson Hub, I-94 Mid-Corridor & South-Central Access',
    heroOpener:
      'Jackson County is south-central Michigan’s independent mid-corridor hub — Jackson multi-story and seat stock, township SFH, I-94 freeflow between Ann Arbor and Battle Creek, and product that is not Washtenaw’s continuous campus multi-unit density. Expect longer empty miles into university markets, industrial freeflow timing, and freeflow that still peaks hard on I-94. This guide is for people moving in Jackson as I-94 mid-corridor product — not an Ann Arbor rename.',
    heroCredibility:
      'I-94 mid-corridor · Independent hub · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-94 · US-127 · M-50 · M-60 · Michigan Ave corridors',
    parentLabel: 'Washtenaw County (and independent south-central patterns)',
    parentHref: '/local-movers/michigan/washtenaw',
    compareIntro:
      'Jackson is I-94 mid-corridor independent hub product — not Ann Arbor campus multi-unit density and not Detroit collar defaults.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Washtenaw crews fight US-23/I-94 campus peaks. Jackson pairs ride I-94 further west, US-127, and Jackson arterials — freer mid-day mid-corridor freeflow, still peak-heavy on school and industrial windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Washtenaw mixes campus multi-family and township HOAs. Jackson mixes city multi-story, township SFH, and industrial-edge homes — more continuous secondary hub product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; township approaches add empty miles uncommon on pure Pittsfield cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Jackson quotes often sit at secondary mid-corridor rates for driveway SFH — city access and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Jackson is independent I-94 mid-corridor hub — not Washtenaw renamed.',
      },
    ],
    whatIntro: 'I-94 freeflow, Jackson multi-story, and mid-corridor empty miles — not an Ann Arbor clone.',
    whatBullets: [
      {
        title: 'I-94 freeflow is billable',
        detail: 'Jackson ↔ Ann Arbor pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Jackson multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Distinct from Washtenaw university density',
        detail: 'Do not recycle campus multi-family-only playbooks for township SFH days.',
      },
      {
        title: 'Industrial freeflow can rewrite timing',
        detail: 'Shift windows choke some residential pairs near industrial edges.',
      },
    ],
    zonesHeading: 'Jackson zones: city core, township growth, I-94 corridors & rural edges',
    zonesIntro: 'Two to four sharp products under one mid-corridor hub label.',
    zones: [
      z('jackson-city', 'Jackson multi-story & seat', 'Jackson city', ['Jackson', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['jackson mi'], 'Inventory stairs; plan temporary no-parking.'),
      z('townships', 'Township SFH growth', 'Township growth', ['growth townships'], 'SFH, townhomes', ['HOA packets', 'Empty miles'], ['jackson townships'], 'Collect COI early; photo last-mile on new streets.'),
      z('i94', 'I-94 corridor residential', 'I-94 corridors', ['corridor neighborhoods'], 'SFH, multi-family pockets', ['I-94 peaks'], ['jackson i-94'], 'Price portal-to-portal toward Ann Arbor and Battle Creek.'),
      z('rural', 'Rural edges & larger lots', 'Rural edges', ['outer townships'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['jackson rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i94-mid', 'I-94 mid-corridor freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Ann Arbor multi-family rates for rural township lots.']),
      s('jackson-city', 'Jackson multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('vs-washtenaw', 'Distinct from Washtenaw university product', 'Mid-corridor hub differs from campus density.', ['Do not recycle U-M lease-wave-only playbooks.', 'City multi-story + township SFH mix is the differentiator.']),
    ],
    schoolsIntro:
      'Jackson families compare Jackson Public and township districts — verify boundaries; do not assume Ann Arbor maps apply.',
    hospitalsDetail:
      'Henry Ford Jackson and regional systems serve the hub; map peak freeflow on I-94 corridors.',
    costIntro: 'Empty miles, city access, and I-94 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and industrial calendars reshape demand more than pure university term peaks alone.',
  },
  {
    file: 'saginaw-tier2.ts',
    exportName: 'saginawCountyMiTier2Intelligence',
    slug: 'saginaw',
    hubTitle: 'Saginaw County Moving Intelligence Hub',
    eyebrow: 'Saginaw · Great Lakes Bay hub · vs Genesee',
    h1: 'Moving in Saginaw County: Saginaw Hub, Township Belts & Great Lakes Bay Access',
    heroOpener:
      'Saginaw County is the Great Lakes Bay industrial/residential hub — Saginaw multi-story and seat stock, Saginaw Township SFH, Freeland and Bridgeport edges, and freeflow that is not Genesee’s continuous Flint core multi-unit density and not Midland’s corporate-campus product alone. Expect longer empty miles into Flint and Midland, winter ice, and freeflow that still peaks hard on I-75. This guide is for people moving in Saginaw as bay-region hub product — not a Flint rename and not a Midland clone.',
    heroCredibility:
      'Great Lakes Bay hub · Industrial/residential · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-75 · I-675 · M-46 · M-13 · M-47 · Tittabawassee Rd corridors',
    parentLabel: 'Genesee County (and independent bay-region patterns)',
    parentHref: '/local-movers/michigan/genesee',
    compareIntro:
      'Saginaw is Great Lakes Bay hub product — not Flint core multi-unit density and not Midland corporate campus product alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Genesee crews fight I-75 Flint peaks. Saginaw pairs ride I-75/I-675 further north, M-46, and township arterials — freer mid-day bay freeflow, still peak-heavy on school and industrial windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Genesee mixes Flint multi-story and southern suburban product. Saginaw mixes city multi-story, township SFH, and bay-edge lots — more continuous bay-hub product distinct from Midland’s corporate-campus fabric.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; township approaches add empty miles uncommon on pure Grand Blanc cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Saginaw quotes often sit at secondary bay rates for driveway SFH — city access and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Saginaw is Great Lakes Bay hub — not Genesee renamed and not Midland renamed.',
      },
    ],
    whatIntro: 'I-75/I-675 freeflow, city multi-story, and bay empty miles — not a Flint or Midland clone.',
    whatBullets: [
      {
        title: 'I-75 / I-675 freeflow is billable',
        detail: 'Saginaw ↔ Flint pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Midland corporate-campus product',
        detail: 'Bay industrial/residential mix is not Midland planned corporate fabric alone.',
      },
      {
        title: 'City multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure township SFH playbooks.',
      },
      {
        title: 'Winter ice rewrites morning plans',
        detail: 'Build weather buffers into peak commute quotes.',
      },
    ],
    zonesHeading: 'Saginaw zones: city core, Saginaw Township, Freeland–Bridgeport edges & rural townships',
    zonesIntro: 'Two to four sharp products under one bay-hub label.',
    zones: [
      z('saginaw-city', 'Saginaw multi-story & seat', 'Saginaw city', ['Saginaw', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['saginaw'], 'Inventory stairs; plan temporary no-parking.'),
      z('township', 'Saginaw Township SFH belts', 'Saginaw Twp', ['Saginaw Township'], 'SFH, townhomes', ['HOA packets', 'Arterial timing'], ['saginaw township'], 'Confirm driveway and HOA hours.'),
      z('freeland-bridgeport', 'Freeland / Bridgeport edges', 'Freeland–Bridgeport', ['Freeland', 'Bridgeport'], 'SFH, mixed stock', ['Empty miles', 'Airport/industrial freeflow'], ['freeland', 'bridgeport'], 'Price portal-to-portal; avoid peak industrial windows when possible.'),
      z('rural', 'Rural townships & larger lots', 'Rural townships', ['outer townships'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['saginaw rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('bay-hub', 'I-75 / I-675 bay freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Flint multi-family rates for rural township lots.']),
      s('city-access', 'Saginaw multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('vs-midland', 'Distinct from Midland corporate product', 'Bay industrial/residential differs from chemical-heritage campus fabric.', ['Do not recycle Midland-only playbooks.', 'City multi-story + township SFH mix is the differentiator.']),
    ],
    schoolsIntro:
      'Saginaw families compare Saginaw Public, Saginaw Township, and other districts — verify boundaries; do not assume Genesee maps apply.',
    hospitalsDetail:
      'Covenant and regional bay systems serve the hub; map peak freeflow on I-75/I-675 corridors.',
    costIntro: 'Empty miles, city access, and bay freeflow peaks often matter more than raw miles.',
    seasonalIntro: 'School years and winter ice reshape demand more than pure Flint industrial peaks alone.',
  },
  {
    file: 'muskegon-tier2.ts',
    exportName: 'muskegonCountyMiTier2Intelligence',
    slug: 'muskegon',
    hubTitle: 'Muskegon County Moving Intelligence Hub',
    eyebrow: 'Muskegon · west lakeshore north of Ottawa · vs Ottawa',
    h1: 'Moving in Muskegon County: Muskegon Port, Lakeshore Stock & US-31 North Access',
    heroOpener:
      'Muskegon County is west Michigan’s port and lakeshore market north of Ottawa — Muskegon multi-story and industrial-edge stock, Norton Shores and lakeshore approaches, US-31 freeflow, and product that is not Holland/Zeeland furniture-collar growth alone and not Grand Rapids core elevators. Expect port freeflow timing, shore last-mile, and longer empty miles into Ottawa and Kent. This guide is for people moving in Muskegon as north-lakeshore / port product — not an Ottawa or Kent rename.',
    heroCredibility:
      'Port / lakeshore · US-31 north · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-31 · I-96 links · M-46 · M-120 · lakeshore corridors',
    parentLabel: 'Ottawa County (and Kent west-MI patterns)',
    parentHref: '/local-movers/michigan/ottawa',
    compareIntro:
      'Muskegon is port/lakeshore north product — not Holland/Zeeland furniture-collar growth and not Grand Rapids core multi-unit density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Ottawa crews fight US-31 Holland tourism peaks. Muskegon pairs ride US-31 further north, M-46, and port arterials — freer mid-day off Holland festival choke points, still peak-heavy on industrial and shore windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Ottawa mixes continuous Hudsonville HOAs. Muskegon mixes port multi-story, Norton Shores SFH, and shore stock — more continuous port/industrial-edge product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; shore streets tighten truck size more often than pure Zeeland cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Muskegon quotes often sit at secondary lakeshore rates for driveway SFH — port freeflow and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Muskegon is north lakeshore port product — not Ottawa renamed.',
      },
    ],
    whatIntro: 'Port freeflow, lakeshore last-mile, and US-31 north peaks — not a Holland clone.',
    whatBullets: [
      {
        title: 'US-31 freeflow is billable',
        detail: 'Muskegon ↔ Holland pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Ottawa furniture-collar product',
        detail: 'Port multi-story is not Hudsonville HOA growth alone.',
      },
      {
        title: 'Shore last-mile rewrites truck size',
        detail: 'Photo approaches; many streets reject full trailers.',
      },
      {
        title: 'Industrial freeflow can rewrite timing',
        detail: 'Shift windows choke some residential pairs near port edges.',
      },
    ],
    zonesHeading: 'Muskegon zones: city/port core, Norton Shores, lakeshore edges & inland townships',
    zonesIntro: 'Two to four sharp products under one north-lakeshore label.',
    zones: [
      z('muskegon-city', 'Muskegon multi-story & port edge', 'Muskegon city', ['Muskegon', 'port approaches'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking', 'Shift timing'], ['muskegon'], 'Inventory stairs; avoid peak industrial windows when possible.'),
      z('norton-shores', 'Norton Shores SFH belts', 'Norton Shores', ['Norton Shores'], 'SFH, townhomes', ['HOA packets', 'Arterial timing'], ['norton shores'], 'Confirm driveway and HOA hours.'),
      z('lakeshore', 'Lakeshore edges', 'Lakeshore', ['shore towns', 'beach approaches'], 'SFH, seasonal stock', ['Last-mile width', 'Tourism peaks'], ['muskegon lakeshore'], 'Photo approaches; plan smaller trucks near shore streets.'),
      z('inland', 'Inland townships', 'Inland townships', ['eastern townships'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['muskegon inland'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('port', 'Port / industrial freeflow logistics', 'Shift windows rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Avoid peak industrial windows when possible.']),
      s('lakeshore', 'Lakeshore last-mile access', 'Street width rewrites truck size.', ['Photo approaches before final quote.', 'Tourism peaks tighten curb plans.']),
      s('vs-ottawa', 'Distinct from Ottawa Holland/Zeeland product', 'North port lakeshore differs from furniture-collar growth.', ['Do not recycle Hudsonville HOA-only playbooks.', 'Port multi-story + shore mix is the differentiator.']),
    ],
    schoolsIntro:
      'Muskegon families compare Muskegon Public, Norton Shores, and other districts — verify boundaries; do not assume Ottawa or Kent maps apply.',
    hospitalsDetail:
      'Trinity Health and regional west-Michigan systems serve the market; map peak freeflow on US-31 corridors.',
    costIntro: 'Port freeflow, shore last-mile, and empty miles often matter more than raw miles.',
    seasonalIntro: 'Tourism summers and industrial calendars reshape demand more than pure GR office peaks alone.',
  },
  {
    file: 'berrien-tier2.ts',
    exportName: 'berrienCountyMiTier2Intelligence',
    slug: 'berrien',
    hubTitle: 'Berrien County Moving Intelligence Hub',
    eyebrow: 'Berrien · St. Joseph / Benton Harbor / Niles · SW MI · independent',
    h1: 'Moving in Berrien County: St. Joseph Lakeshore, Niles & I-94 SW Michigan Access',
    heroOpener:
      'Berrien County is southwest Michigan’s independent I-94 lakeshore market — St. Joseph multi-story and shore stock, Benton Harbor corridors, Niles edge product, Indiana border adjacency, and freeflow that does not answer to Kalamazoo campus multi-unit defaults. Expect tourism peaks, border interstate legs, and longer empty miles into mid-Michigan. This guide is for people moving in Berrien as SW lakeshore / IN-border product — not a Kalamazoo rename.',
    heroCredibility:
      'I-94 lakeshore · IN border · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-94 · US-31 · M-63 · M-139 · Red Arrow Hwy corridors',
    parentLabel: 'independent SW Michigan lakeshore (vs Kalamazoo defaults)',
    parentHref: '/local-movers/michigan/kalamazoo',
    compareIntro:
      'Berrien is St. Joseph / Benton Harbor / Niles SW lakeshore product — not Kalamazoo campus multi-unit density and not Detroit collar defaults.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Kalamazoo crews fight US-131/I-94 campus peaks. Berrien pairs ride I-94 further southwest, US-31, and lakeshore arterials — freer mid-day SW freeflow, still peak-heavy on tourism and border windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Kalamazoo mixes campus multi-family and Portage HOAs. Berrien mixes shore multi-story, Benton Harbor corridors, and Niles edge SFH — more continuous SW lakeshore product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Shore streets tighten truck size; IN destinations flip jobs to FMCSA more often than pure in-Kalamazoo pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Berrien quotes often sit at secondary SW rates for driveway SFH — tourism peaks and border empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Berrien is independent SW lakeshore / IN-border product — not Kalamazoo renamed.',
      },
    ],
    whatIntro: 'I-94 lakeshore freeflow, shore last-mile, and IN interstate legs — not a Kalamazoo clone.',
    whatBullets: [
      {
        title: 'I-94 freeflow is billable',
        detail: 'St. Joseph ↔ Kalamazoo pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Indiana adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'Tourism peaks rewrite shore access',
        detail: 'Summer weekends tighten curb plans on lakeshore stock.',
      },
      {
        title: 'Distinct from Kalamazoo university product',
        detail: 'Do not recycle WMU multi-family-only playbooks for shore last-mile days.',
      },
    ],
    zonesHeading: 'Berrien zones: St. Joseph lakeshore, Benton Harbor corridors, Niles edge & rural east',
    zonesIntro: 'Two to four sharp products under one SW lakeshore label.',
    zones: [
      z('st-joseph', 'St. Joseph multi-story & lakeshore', 'St. Joseph', ['St. Joseph', 'shore neighborhoods'], 'Multi-story, SFH, seasonal stock', ['Stairs', 'Last-mile width', 'Tourism peaks'], ['st joseph mi'], 'Photo shore approaches; inventory stairs; plan smaller trucks when needed.'),
      z('benton-harbor', 'Benton Harbor corridors', 'Benton Harbor', ['Benton Harbor', 'corridor edges'], 'Multi-family, SFH, mixed stock', ['Street width', 'Arterial timing'], ['benton harbor'], 'Confirm street width; plan temporary no-parking.'),
      z('niles', 'Niles edge & IN approaches', 'Niles', ['Niles', 'border approaches'], 'SFH, mixed stock', ['Empty miles', 'Interstate legs'], ['niles'], 'Clarify IN destinations for FMCSA authority early.'),
      z('rural-east', 'Rural east toward Kalamazoo', 'Rural east', ['eastern townships'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['berrien east'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i94-sw', 'I-94 SW lakeshore freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Kalamazoo multi-family rates for shore last-mile days.']),
      s('in-border', 'Indiana border interstate legs', 'Short-looking hops still need FMCSA.', ['Clarify destination state before deposit.', 'Verify USDOT/MC on interstate quotes.']),
      s('lakeshore', 'Lakeshore tourism staging', 'Seasonal peaks rewrite curb plans.', ['Book early for summer weekends.', 'Photo shore approaches before final quote.']),
    ],
    schoolsIntro:
      'Berrien families compare St. Joseph, Benton Harbor, Niles, and other districts — verify boundaries; do not assume Kalamazoo maps apply.',
    hospitalsDetail:
      'Corewell and regional SW systems serve the market; map peak freeflow on I-94 corridors.',
    costIntro: 'Tourism peaks, shore last-mile, and border empty miles often matter more than raw miles.',
    seasonalIntro: 'Summer lakeshore demand and school years reshape calendars more than pure campus term peaks alone.',
  },
  {
    file: 'calhoun-tier2.ts',
    exportName: 'calhounCountyMiTier2Intelligence',
    slug: 'calhoun',
    hubTitle: 'Calhoun County Moving Intelligence Hub',
    eyebrow: 'Calhoun · Battle Creek · cereal city / I-94 · vs Kalamazoo',
    h1: 'Moving in Calhoun County: Battle Creek Hub, I-94 Industrial Corridors & South-Central Access',
    heroOpener:
      'Calhoun County is the I-94 industrial/residential hub around Battle Creek — multi-story and seat stock, township SFH, manufacturing freeflow, and product that is not Kalamazoo’s continuous campus multi-unit density. Expect longer empty miles into Kalamazoo and Jackson, industrial-shift timing, and freeflow that still peaks hard on I-94. This guide is for people moving in Calhoun as Battle Creek / I-94 product — not a Kalamazoo rename.',
    heroCredibility:
      'I-94 industrial/residential · Battle Creek hub · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-94 · I-69 · M-66 · M-37 · Capital Ave corridors',
    parentLabel: 'Kalamazoo County (and independent I-94 mid-corridor patterns)',
    parentHref: '/local-movers/michigan/kalamazoo',
    compareIntro:
      'Calhoun is Battle Creek I-94 industrial/residential product — not Kalamazoo campus multi-unit density and not Detroit collar defaults.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Kalamazoo crews fight US-131/I-94 campus peaks. Calhoun pairs ride I-94 further east, I-69, and Battle Creek arterials — freer mid-day mid-corridor freeflow, still peak-heavy on industrial and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Kalamazoo mixes campus multi-family and Portage HOAs. Calhoun mixes Battle Creek multi-story, township SFH, and industrial-edge homes — more continuous secondary hub product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; industrial freeflow timing rewrites some residential pairs more often than pure Portage cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Calhoun quotes often sit at secondary I-94 rates for driveway SFH — city access and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Calhoun is Battle Creek I-94 hub — not Kalamazoo renamed.',
      },
    ],
    whatIntro: 'I-94 freeflow, Battle Creek multi-story, and industrial timing — not a Kalamazoo clone.',
    whatBullets: [
      {
        title: 'I-94 freeflow is billable',
        detail: 'Battle Creek ↔ Kalamazoo pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Industrial freeflow rewrites timing',
        detail: 'Shift windows choke some residential pairs near industrial edges.',
      },
      {
        title: 'Distinct from Kalamazoo university product',
        detail: 'Do not recycle WMU multi-family-only playbooks for industrial-edge days.',
      },
      {
        title: 'City multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure township SFH playbooks.',
      },
    ],
    zonesHeading: 'Calhoun zones: Battle Creek core, township growth, I-94 corridors & rural edges',
    zonesIntro: 'Two to four sharp products under one I-94 hub label.',
    zones: [
      z('battle-creek', 'Battle Creek multi-story & seat', 'Battle Creek', ['Battle Creek', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['battle creek'], 'Inventory stairs; plan temporary no-parking.'),
      z('townships', 'Township SFH growth', 'Township growth', ['growth townships'], 'SFH, townhomes', ['HOA packets', 'Empty miles'], ['calhoun townships'], 'Collect COI early; photo last-mile on new streets.'),
      z('i94', 'I-94 corridor residential', 'I-94 corridors', ['corridor neighborhoods'], 'SFH, multi-family pockets', ['I-94 peaks', 'Shift timing'], ['calhoun i-94'], 'Price portal-to-portal; avoid peak industrial windows when possible.'),
      z('rural', 'Rural edges & larger lots', 'Rural edges', ['outer townships'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['calhoun rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i94-hub', 'I-94 industrial freeflow', 'Shift and commute peaks rewrite pairs.', ['Price portal-to-portal honestly.', 'Do not quote Kalamazoo multi-family rates for rural township lots.']),
      s('bc-city', 'Battle Creek multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('vs-kzoo', 'Distinct from Kalamazoo university product', 'Industrial hub differs from campus density.', ['Do not recycle WMU lease-wave-only playbooks.', 'City multi-story + industrial freeflow is the differentiator.']),
    ],
    schoolsIntro:
      'Calhoun families compare Battle Creek and township districts — verify boundaries; do not assume Kalamazoo maps apply.',
    hospitalsDetail:
      'Bronson Battle Creek and regional systems serve the hub; map peak freeflow on I-94 corridors.',
    costIntro: 'Empty miles, city access, and industrial peaks often matter more than raw miles.',
    seasonalIntro: 'School years and manufacturing calendars reshape demand more than pure campus term peaks alone.',
  },
  {
    file: 'eaton-tier2.ts',
    exportName: 'eatonCountyMiTier2Intelligence',
    slug: 'eaton',
    hubTitle: 'Eaton County Moving Intelligence Hub',
    eyebrow: 'Eaton · Charlotte / Delta Twp edge · Lansing west · vs Ingham',
    h1: 'Moving in Eaton County: Delta Township Edge, Charlotte Seat & I-69 / I-96 West Collar',
    heroOpener:
      'Eaton County is Lansing’s west growth collar — Delta Township multi-family and HOA product shared with capital freeflow, Charlotte seat stock, I-69 / I-96 corridors, and freeflow that is not Ingham’s continuous downtown elevators or East Lansing campus multi-unit density alone. Expect longer empty miles into the capital core, school-calendar SFH volume, and portal-to-portal time that map miles understate. This guide is for people moving in Eaton as west-Lansing collar product — not an Ingham rename.',
    heroCredibility:
      'West-Lansing collar · I-69 / I-96 · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-69 · I-96 · M-43 · M-50 · M-99 · Saginaw Hwy links',
    parentLabel: 'Ingham County',
    parentHref: '/local-movers/michigan/ingham',
    compareIntro:
      'Eaton is Delta Township / Charlotte west-collar growth — not Lansing downtown elevators and not East Lansing campus multi-unit density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Ingham crews fight downtown and MSU peaks. Eaton pairs ride I-69/I-96 west, M-43, and Delta corridors — freer mid-day west of the core, still peak-heavy on commute windows into Lansing.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Ingham mixes capital elevators and campus multi-family. Eaton mixes Delta Township multi-family, Charlotte multi-story, and township SFH — more continuous west-collar product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets and apartment COIs dominate Delta growth; Charlotte multi-story needs stair inventories uncommon on pure Okemos cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Eaton quotes often sit at west-collar rates for driveway SFH — empty miles into Ingham still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Eaton is west-Lansing I-69/I-96 collar — not Ingham renamed.',
      },
    ],
    whatIntro: 'I-69 freeflow, Delta multi-family, and west-collar empty miles — not an Ingham core clone.',
    whatBullets: [
      {
        title: 'I-69 / I-96 freeflow is billable',
        detail: 'Delta ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from East Lansing campus density',
        detail: 'West-collar product is not MSU multi-family alone.',
      },
      {
        title: 'Delta multi-family needs building packets',
        detail: 'Elevators and COIs rewrite labor hours on growth stock.',
      },
      {
        title: 'Charlotte multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
    ],
    zonesHeading: 'Eaton zones: Delta Township growth, Charlotte seat, I-69 corridors & rural west',
    zonesIntro: 'Two to four sharp products under one west-Lansing collar label.',
    zones: [
      z('delta', 'Delta Township multi-family & HOA growth', 'Delta Twp', ['Delta Township', 'growth villages'], 'Multi-family, planned SFH, townhomes', ['Building COIs', 'HOA packets', 'I-69 peaks'], ['delta township'], 'Collect management packets early; price portal-to-portal toward Lansing.'),
      z('charlotte', 'Charlotte multi-story & seat', 'Charlotte', ['Charlotte', 'seat neighborhoods'], 'Multi-story, SFH, mixed stock', ['Stairs', 'Street parking'], ['charlotte mi'], 'Inventory stairs; plan temporary no-parking.'),
      z('i69', 'I-69 / I-96 corridor suburbs', 'I-69 corridors', ['corridor neighborhoods'], 'SFH, townhomes', ['Commute peaks'], ['eaton i-69'], 'Avoid peak I-69/I-96 windows when possible.'),
      z('rural-west', 'Rural west & larger lots', 'Rural west', ['western townships'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['eaton west'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('west-collar', 'I-69 / I-96 west-collar freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote East Lansing multi-family rates for rural west lots.']),
      s('delta-mf', 'Delta Township multi-family logistics', 'Building packets are first-class cost drivers.', ['Elevator windows early.', 'Month-end competition for crews is real.']),
      s('vs-ingham', 'Distinct from Ingham capital/campus product', 'West collar differs from downtown elevators and MSU density.', ['Do not recycle campus lease-wave-only playbooks.', 'Delta + Charlotte mix is the differentiator.']),
    ],
    schoolsIntro:
      'Eaton families compare Grand Ledge, Charlotte, Eaton Rapids, and other districts — verify boundaries; do not assume Lansing or East Lansing maps apply.',
    hospitalsDetail:
      'Sparrow Eaton and capital-region systems serve the west collar; map peak freeflow on I-69/I-96 corridors.',
    costIntro: 'Empty miles, multi-family access, and west-collar peaks often matter more than raw miles.',
    seasonalIntro: 'School years and capital-session spillover reshape demand more than pure MSU term peaks alone.',
  },
  {
    file: 'grand-traverse-tier2.ts',
    exportName: 'grandTraverseCountyMiTier2Intelligence',
    slug: 'grand-traverse',
    hubTitle: 'Grand Traverse County Moving Intelligence Hub',
    eyebrow: 'Grand Traverse · Traverse City · NW tourism/regional hub · independent',
    h1: 'Moving in Grand Traverse County: Traverse City Hub, Tourism Seasonality & NW Michigan Access',
    heroOpener:
      'Grand Traverse County is northwest Michigan’s independent tourism and regional medical hub — Traverse City multi-story and tourism stock, peninsula and bay approaches, longer empty miles from lower-peninsula metros, and freeflow that does not answer to Detroit collar defaults. Expect extreme seasonal peaks, shore last-mile, and freeflow that still burns on M-72 / US-31. This guide is for people moving in Grand Traverse as NW tourism/regional product — not a Detroit or Grand Rapids rename.',
    heroCredibility:
      'NW tourism hub · Regional medical · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-31 · M-72 · M-37 · M-22 · Peninsula corridors',
    parentLabel: 'independent NW Michigan tourism/regional hub (vs Detroit / GR defaults)',
    parentHref: '/local-movers/michigan/kent',
    compareIntro:
      'Grand Traverse is Traverse City tourism and regional medical product — not Detroit multi-county collar density and not Grand Rapids core elevators alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'SE Michigan crews fight I-75/I-94 peaks. Grand Traverse pairs ride US-31, M-72, and peninsula approaches — freer mid-day off-season, extreme peak congestion on summer tourism windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Detroit collars mix continuous multi-family. Grand Traverse mixes tourism multi-story, bay-edge SFH, and rural peninsula lots — more continuous seasonal tourism product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Tourism streets tighten curb plans; peninsula approaches often need smaller trucks uncommon on pure suburban collar days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Grand Traverse quotes often sit at secondary NW rates for driveway SFH — tourism peaks and long empty miles from lower MI still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Grand Traverse is independent NW tourism/regional hub — not Detroit defaults renamed.',
      },
    ],
    whatIntro: 'Tourism seasonality, bay last-mile, and NW empty miles — not a Detroit clone.',
    whatBullets: [
      {
        title: 'Tourism peaks rewrite demand and curb plans',
        detail: 'Summer weekends fill crews and streets differently than pure family Saturdays.',
      },
      {
        title: 'Peninsula / bay last-mile rewrites truck size',
        detail: 'Photo approaches; many streets reject full trailers.',
      },
      {
        title: 'Long empty miles from lower MI are first-class cost drivers',
        detail: 'Do not quote SE Michigan local rates for Traverse City deadhead.',
      },
      {
        title: 'Regional medical calendars also matter',
        detail: 'Healthcare-related moves fill mid-week windows outside pure tourism peaks.',
      },
    ],
    zonesHeading: 'Grand Traverse zones: Traverse City core, bay/peninsula edges, growth townships & rural south',
    zonesIntro: 'Two to four sharp products under one NW tourism/regional label.',
    zones: [
      z('traverse-city', 'Traverse City multi-story & tourism stock', 'Traverse City', ['Traverse City', 'downtown edges'], 'Multi-story, multi-unit, SFH', ['Stairs', 'Tourism parking', 'Street width'], ['traverse city'], 'Inventory stairs; book around peak tourism weekends when flexible.'),
      z('peninsula', 'Bay / peninsula edges', 'Peninsula edges', ['Old Mission approaches', 'bay neighborhoods'], 'SFH, seasonal stock', ['Last-mile width', 'Seasonal roads'], ['grand traverse peninsula'], 'Photo approaches; plan smaller trucks near bay streets.'),
      z('townships', 'Growth townships', 'Growth townships', ['suburban townships'], 'SFH, townhomes', ['HOA packets', 'Empty miles'], ['grand traverse townships'], 'Collect COI early; price portal-to-portal toward the city.'),
      z('rural-south', 'Rural south & larger lots', 'Rural south', ['southern townships'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['grand traverse south'], 'Photo last-mile; rain and snow weeks need flexibility.'),
    ],
    specialized: [
      s('tourism', 'Tourism seasonality logistics', 'Summer peaks rewrite demand and curb plans.', ['Book early for peak weekends.', 'Confirm access rules for seasonal multi-unit stock.']),
      s('peninsula-last-mile', 'Bay / peninsula last-mile access', 'Street width rewrites truck size.', ['Photo approaches before final quote.', 'Shuttle conversations beat stuck trailers.']),
      s('nw-empty-miles', 'NW Michigan empty-mile logistics', 'Long freeflow from lower MI rewrites hourly math.', ['Price deadhead honestly.', 'Do not quote Detroit collar rates for peninsula lots.']),
    ],
    schoolsIntro:
      'Grand Traverse families compare Traverse City Area Public Schools and township options — verify boundaries; do not assume lower-peninsula maps apply.',
    hospitalsDetail:
      'Munson Medical Center and regional systems serve NW Michigan; map peak freeflow on US-31/M-72 corridors and tourism congestion.',
    costIntro: 'Tourism peaks, bay last-mile, and long empty miles often matter more than raw miles.',
    seasonalIntro: 'Summer tourism and winter access reshape demand more than pure SE Michigan office peaks alone.',
  },
  {
    file: 'midland-tier2.ts',
    exportName: 'midlandCountyMiTier2Intelligence',
    slug: 'midland',
    hubTitle: 'Midland County Moving Intelligence Hub',
    eyebrow: 'Midland · Great Lakes Bay / chemical-heritage city · vs Saginaw',
    h1: 'Moving in Midland County: Midland Corporate Campus, Planned Suburbs & Bay-Region Access',
    heroOpener:
      'Midland County is the Great Lakes Bay corporate-campus and planned-suburb market — Midland multi-story and campus-adjacent stock, continuous planned SFH, freeflow toward Saginaw and Bay City, and product that is not Saginaw’s continuous industrial/residential city fabric alone. Expect HOA packets, longer empty miles into Saginaw, and freeflow that still peaks hard on M-20 / US-10. This guide is for people moving in Midland as corporate/residential bay product — not a Saginaw rename.',
    heroCredibility:
      'Chemical-heritage / corporate campus · Planned suburbs · MSP CVED household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-10 · M-20 · M-47 · M-30 · Eastman Ave corridors',
    parentLabel: 'Saginaw County (and independent bay-region patterns)',
    parentHref: '/local-movers/michigan/saginaw',
    compareIntro:
      'Midland is corporate-campus and planned-suburb bay product — not Saginaw continuous industrial/residential multi-story fabric alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Saginaw crews fight I-75/I-675 city peaks. Midland pairs ride US-10/M-20 and planned arterials — freer mid-day campus freeflow, still peak-heavy on school and commute windows toward Saginaw.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Saginaw mixes older multi-unit and township SFH. Midland mixes continuous planned SFH, campus multi-family, and corporate-adjacent stock — more continuous planned-suburb product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets dominate planned villages; campus multi-family needs building packets uncommon on pure rural Saginaw township days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Midland quotes often sit at secondary bay planned-suburb rates for driveway SFH — HOA soft costs and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Midland is corporate/residential bay product — not Saginaw renamed.',
      },
    ],
    whatIntro: 'Planned HOAs, corporate freeflow, and bay empty miles — not a Saginaw clone.',
    whatBullets: [
      {
        title: 'US-10 / M-20 freeflow is billable',
        detail: 'Midland ↔ Saginaw pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Saginaw industrial/residential fabric',
        detail: 'Planned corporate-suburb product is not continuous older multi-unit density alone.',
      },
      {
        title: 'HOA growth dominates family volume',
        detail: 'COI and gate lists on planned villages are standard.',
      },
      {
        title: 'Campus multi-family packets matter',
        detail: 'Elevators and COIs rewrite labor hours on multi-unit stock.',
      },
    ],
    zonesHeading: 'Midland zones: planned suburbs, campus multi-family, city core edges & rural townships',
    zonesIntro: 'Two to four sharp products under one corporate/residential bay label.',
    zones: [
      z('planned', 'Planned suburban SFH belts', 'Planned suburbs', ['planned villages', 'HOA communities'], 'Planned SFH, townhomes', ['HOA packets', 'Cul-de-sac staging'], ['midland planned'], 'Collect COI early; weekday windows often beat Saturdays.'),
      z('campus-mf', 'Campus / multi-family pockets', 'Campus multi-family', ['multi-family clusters'], 'Apartments, multi-family', ['Building COIs', 'Elevator windows'], ['midland multi-family'], 'Collect management packets; inventory elevators.'),
      z('core-edge', 'City core multi-story edges', 'Core edges', ['central neighborhoods'], 'Multi-story, older SFH', ['Stairs', 'Street parking'], ['midland city'], 'Inventory stairs; plan temporary no-parking.'),
      z('rural', 'Rural townships & larger lots', 'Rural townships', ['outer townships'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['midland rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('planned-hoa', 'Planned HOA growth logistics', 'Master-plan rules are first-class cost drivers.', ['Gate lists early.', 'Mud weeks on new streets need flexibility.']),
      s('bay-freeflow', 'US-10 / M-20 bay freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Saginaw multi-story rates for pure planned-cul-de-sac days.']),
      s('vs-saginaw', 'Distinct from Saginaw industrial/residential fabric', 'Corporate planned suburbs differ from bay industrial multi-unit mix.', ['Do not recycle Saginaw-only playbooks.', 'Planned HOA + campus multi-family mix is the differentiator.']),
    ],
    schoolsIntro:
      'Midland families compare Midland Public Schools feeders — verify boundaries; do not assume Saginaw maps apply.',
    hospitalsDetail:
      'MyMichigan Medical Center Midland and regional bay systems serve the market; map peak freeflow on US-10/M-20 corridors.',
    costIntro: 'HOA soft costs, multi-family access, and bay freeflow peaks often matter more than raw miles.',
    seasonalIntro: 'School years and corporate calendars reshape demand more than pure industrial shift peaks alone.',
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
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** ${p.slug} — MI Tier 2 Wave 1 */
export const ${p.exportName}: CountyIntelligencePack = finalizeMiTier2Pack({
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
      MI_TIER2_REG_BULLET,
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
              'Use Michigan DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, tourism, and manufacturing markets can tighten housing near school calendars.',
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
      { title: 'Winter access', detail: 'Ice and lake-effect windows rewrite morning plans on many collars.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: '${esc(p.parentLabel)} movers (parent contrast)', href: '${p.parentHref}' },
    ],
  },
});
`;
}

const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/michigan');
for (const p of packs) {
  writeFileSync(join(outDir, p.file), render(p), 'utf8');
  console.log('wrote', p.file);
}
console.log('Generated', packs.length, 'MI Tier 2 Wave 1 packs');
