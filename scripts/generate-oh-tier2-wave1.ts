/**
 * Generate OH Tier 2 Wave 1 county intelligence packs.
 * Run: npx tsx scripts/generate-oh-tier2-wave1.ts
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
    file: 'delaware-tier2.ts',
    exportName: 'delawareCountyOhTier2Intelligence',
    slug: 'delaware',
    hubTitle: 'Delaware County Moving Intelligence Hub',
    eyebrow: 'Delaware · Powell / Lewis Center · Columbus north growth · vs Franklin',
    h1: 'Moving in Delaware County: Powell, Lewis Center & US-23 / I-71 North Growth',
    heroOpener:
      'Delaware County is Columbus’s top-growth north collar — Powell and Lewis Center HOA villages, Delaware city seat stock, US-23 / I-71 freeflow, and longer empty miles than Franklin’s Short North elevators. It is not a Columbus core rename: expect master-plan COIs, school-calendar SFH volume, and portal-to-portal time that map miles understate. This guide is for people moving in Delaware as Columbus-north growth product — not Franklin intown logistics with different labels.',
    heroCredibility:
      'Columbus north growth · US-23 / I-71 · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-23 · I-71 · SR-315 · SR-37 · SR-750 · US-36 approaches',
    parentLabel: 'Franklin County',
    parentHref: '/local-movers/ohio/franklin',
    compareIntro:
      'Delaware is Powell / Lewis Center north-collar HOA growth — not Short North elevators and not German Village alleys alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Franklin crews fight I-70/I-71 core peaks and Short North curb limits. Delaware pairs ride US-23, I-71, and SR-315 — freer mid-day north of I-270, still peak-heavy on school and commute windows into downtown.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Franklin mixes downtown elevators, German Village brick, and I-270 HOAs. Delaware skews continuous planned SFH, townhomes, and Delaware city older stock — more master-plan cul-de-sacs, less continuous freight-elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA gate lists and weekday windows dominate more often than intown street permits. New-construction mud and incomplete streets appear on growth edges.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Delaware quotes often sit at premium north-collar rates for driveway SFH — empty miles from core staging and HOA soft costs still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Delaware is Columbus-north top-growth collar — not Franklin core renamed and not Fairfield/Licking southeast or east product.',
      },
    ],
    whatIntro: 'HOA growth, US-23 freeflow, and north-collar empty miles — not Columbus tower boilerplate.',
    whatBullets: [
      {
        title: 'US-23 / I-71 freeflow is billable',
        detail: 'Powell ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Master-plan HOAs dominate family volume',
        detail: 'COI, gate lists, and truck limits are standard on growth villages.',
      },
      {
        title: 'Distinct from Fairfield and Licking',
        detail: 'North growth is not US-33 southeast or Newark east-metro product.',
      },
      {
        title: 'Empty miles from core staging matter',
        detail: 'Do not quote Short North elevator rates for Powell driveways.',
      },
    ],
    zonesHeading: 'Delaware zones: Powell growth, Lewis Center corridors, Delaware city & rural north',
    zonesIntro: 'Two to four sharp products under one Columbus-north growth label.',
    zones: [
      z('powell', 'Powell planned growth', 'Powell', ['Powell', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'Cul-de-sac staging'], ['powell'], 'Collect COI and gate lists early; weekday windows often beat Saturdays.'),
      z('lewis-center', 'Lewis Center / US-23 corridors', 'Lewis Center', ['Lewis Center', 'US-23 edges'], 'SFH, townhomes, multi-family pockets', ['US-23 peaks', 'HOA packets'], ['lewis center'], 'Price portal-to-portal; avoid peak US-23 windows when possible.'),
      z('delaware-city', 'Delaware city seat', 'Delaware city', ['Delaware', 'seat neighborhoods'], 'SFH, multi-story older stock', ['Street width', 'Mixed access'], ['delaware oh'], 'Inventory older multi-story; confirm staging near seat arterials.'),
      z('rural-north', 'Rural north & larger lots', 'Rural north', ['northern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['delaware north'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('hoa-growth', 'North-collar HOA growth logistics', 'Master-plan rules are first-class cost drivers.', ['Collect COI and gate lists early.', 'Confirm truck size limits before load day.']),
      s('us23-freeflow', 'US-23 / I-71 north freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Franklin elevator rates for Powell driveways.']),
      s('family-sfh', 'Family multi-bedroom SFH peak', 'School-calendar inventories dominate summer.', ['Packing help and Saturday supply matter more than elevators.', 'Book early May–August.']),
    ],
    schoolsIntro:
      'Delaware families compare Olentangy, Delaware City, Big Walnut, and other districts — verify boundaries; do not assume Columbus City maps apply.',
    hospitalsDetail:
      'OhioHealth and regional clinics serve the north collar; map peak freeflow on US-23/I-71, not only off-hour freeflow.',
    costIntro: 'Empty miles, HOA soft costs, and US-23 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than OSU lease waves alone.',
  },
  {
    file: 'warren-tier2.ts',
    exportName: 'warrenCountyOhTier2Intelligence',
    slug: 'warren',
    hubTitle: 'Warren County Moving Intelligence Hub',
    eyebrow: 'Warren · Mason / Lebanon / Springboro · Cincinnati north · vs Hamilton',
    h1: 'Moving in Warren County: Mason, Lebanon & I-71 North Cincinnati Growth',
    heroOpener:
      'Warren County is Cincinnati’s I-71 north growth collar — Mason HOA villages, Lebanon seat stock, Springboro corridors, and freeflow that is not Hamilton’s Over-the-Rhine hills and not Butler’s I-75 west collar. Expect master-plan COIs, longer empty miles into the city core, and school-calendar SFH volume. This guide is for people moving in Warren as Cincinnati-north growth product — not a Cincinnati rename and not a Butler clone.',
    heroCredibility:
      'I-71 north growth · Mason / Lebanon · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-71 · I-75 links · SR-48 · US-22/3 · SR-123 · Mason-Montgomery Rd',
    parentLabel: 'Hamilton County',
    parentHref: '/local-movers/ohio/hamilton',
    compareIntro:
      'Warren is Mason / Lebanon I-71 north-collar growth — not Cincinnati urban hills and not Butler I-75 west collar alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Hamilton crews fight downtown hills and river-city curb limits. Warren pairs ride I-71, SR-48, and Mason corridors — freer mid-day north of I-275, still peak-heavy on commute windows into the core.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Hamilton mixes OTR multi-unit and hillside SFH. Warren skews continuous planned SFH, townhomes, and Lebanon seat stock — more master-plan product, less continuous river-city stair density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets dominate growth villages; KY border jobs still flip to FMCSA more often than pure in-county pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Warren quotes often sit at premium north-collar rates for driveway SFH — empty miles into Cincinnati still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Warren is Cincinnati-north I-71 growth — not Hamilton core renamed and not Butler I-75 NW product.',
      },
    ],
    whatIntro: 'I-71 freeflow, Mason HOAs, and north-collar empty miles — not Cincinnati hill boilerplate.',
    whatBullets: [
      {
        title: 'I-71 north freeflow is billable',
        detail: 'Mason ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Butler I-75 collar',
        detail: 'Northeast growth is not West Chester / Fairfield west-northwest product.',
      },
      {
        title: 'Distinct from Clermont east collar',
        detail: 'I-71 north is not SR-32 Eastgate freeflow.',
      },
      {
        title: 'KY adjacency can create interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
    ],
    zonesHeading: 'Warren zones: Mason growth, Lebanon seat, Springboro corridors & rural east',
    zonesIntro: 'Two to four sharp products under one I-71 north-collar label.',
    zones: [
      z('mason', 'Mason planned growth', 'Mason', ['Mason', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'Cul-de-sac staging'], ['mason oh'], 'Collect COI early; weekday windows often beat Saturdays.'),
      z('lebanon', 'Lebanon seat & core', 'Lebanon', ['Lebanon', 'seat neighborhoods'], 'SFH, multi-story older stock', ['Street width', 'Mixed access'], ['lebanon oh'], 'Inventory older multi-story; confirm staging near seat arterials.'),
      z('springboro', 'Springboro corridors', 'Springboro', ['Springboro', 'corridor edges'], 'SFH, townhomes', ['Arterial timing', 'HOA packets'], ['springboro'], 'Price portal-to-portal toward Cincinnati and Dayton edges.'),
      z('rural-east', 'Rural east & larger lots', 'Rural east', ['eastern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['warren oh east'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i71-north', 'I-71 north-collar freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Hamilton hill rates for Mason driveways.']),
      s('hoa-growth', 'Mason HOA growth logistics', 'Master-plan rules are first-class cost drivers.', ['Gate lists and truck limits early.', 'Mud weeks on new streets need flexibility.']),
      s('vs-collars', 'Distinct from Butler and Clermont', 'Different Cincinnati collar spines.', ['Do not recycle I-75 west or SR-32 east playbooks.', 'I-71 north HOA growth is the differentiator.']),
    ],
    schoolsIntro:
      'Warren families compare Mason, Lebanon, Springboro, Kings, and other districts — verify boundaries; do not assume Cincinnati Public maps apply.',
    hospitalsDetail:
      'Regional hospitals and Cincinnati medical campuses serve the north collar; map peak freeflow on I-71 corridors.',
    costIntro: 'Empty miles, HOA soft costs, and I-71 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than downtown event calendars alone.',
  },
  {
    file: 'butler-tier2.ts',
    exportName: 'butlerCountyOhTier2Intelligence',
    slug: 'butler',
    hubTitle: 'Butler County Moving Intelligence Hub',
    eyebrow: 'Butler · Hamilton / Fairfield / West Chester · Cincinnati NW · vs Hamilton',
    h1: 'Moving in Butler County: West Chester, Fairfield & I-75 North Cincinnati Collar',
    heroOpener:
      'Butler County is Cincinnati’s I-75 north/northwest growth collar — West Chester and Fairfield HOA density, Hamilton city multi-story stock, and freeflow that is not Warren’s I-71 Mason product and not Hamilton County urban hills alone. Expect industrial-adjacent residential pockets, master-plan COIs, and longer empty miles into the core. This guide is for people moving in Butler as Cincinnati-NW collar product — not a Cincinnati rename and not a Warren clone.',
    heroCredibility:
      'I-75 north collar · West Chester growth · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-75 · I-275 · SR-4 · US-127 · SR-129 · Cincinnati-Dayton Rd',
    parentLabel: 'Hamilton County',
    parentHref: '/local-movers/ohio/hamilton',
    compareIntro:
      'Butler is West Chester / Fairfield I-75 north-collar growth with Hamilton city stock — not Cincinnati OTR hills and not Warren I-71 Mason alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Hamilton crews fight river-city peaks. Butler pairs ride I-75, SR-4, and West Chester corridors — freer mid-day north of I-275, still peak-heavy on industrial-shift and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Warren skews Mason planned SFH. Butler mixes West Chester multi-family and HOAs, Fairfield corridors, and Hamilton city multi-story — more continuous I-75 growth mix, less continuous pure premium planned-village product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Growth HOAs need COI packets; Hamilton city stairs need inventories uncommon on pure cul-de-sac days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Butler quotes often sit at west/north-collar rates for driveway SFH — multi-family access and empty miles into the core still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Butler is Cincinnati I-75 NW collar — not Hamilton core renamed and not Warren I-71 north product.',
      },
    ],
    whatIntro: 'I-75 freeflow, West Chester growth, and Hamilton city stock — not a Warren or Cincinnati-core clone.',
    whatBullets: [
      {
        title: 'I-75 freeflow is billable',
        detail: 'West Chester ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Warren I-71 north',
        detail: 'West/northwest growth is not Mason/Lebanon product.',
      },
      {
        title: 'Hamilton city multi-story is first-class',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Industrial freeflow can rewrite timing',
        detail: 'Shift windows choke some residential pairs near logistics corridors.',
      },
    ],
    zonesHeading: 'Butler zones: West Chester growth, Fairfield corridors, Hamilton city & rural north',
    zonesIntro: 'Two to four sharp products under one I-75 north-collar label.',
    zones: [
      z('west-chester', 'West Chester planned growth', 'West Chester', ['West Chester', 'growth villages'], 'Planned SFH, townhomes, multi-family', ['HOA packets', 'I-75 peaks'], ['west chester'], 'Collect COI early; price portal-to-portal toward Cincinnati.'),
      z('fairfield', 'Fairfield corridor suburbs', 'Fairfield', ['Fairfield', 'corridor edges'], 'SFH, townhomes, multi-family', ['Arterial timing', 'Building COIs'], ['fairfield oh'], 'Confirm multi-family packets; avoid peak retail windows when possible.'),
      z('hamilton-city', 'Hamilton city multi-story', 'Hamilton city', ['Hamilton', 'city neighborhoods'], 'Multi-story, older SFH, multi-unit', ['Stairs', 'Street parking'], ['hamilton oh'], 'Inventory stairs; plan temporary no-parking.'),
      z('rural-north', 'Rural north & larger lots', 'Rural north', ['northern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['butler north'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i75-collar', 'I-75 north-collar freeflow', 'Commute and shift peaks rewrite pairs.', ['Price portal-to-portal honestly.', 'Do not quote Hamilton hill rates for West Chester driveways.']),
      s('west-chester-hoa', 'West Chester HOA / multi-family mix', 'Planned villages and apartments both appear.', ['Building packets and gate lists early.', 'Elevator windows matter on multi-family.']),
      s('vs-warren', 'Distinct from Warren I-71 growth', 'Different Cincinnati collar spines.', ['Do not recycle Mason-only playbooks.', 'I-75 west/northwest mix is the differentiator.']),
    ],
    schoolsIntro:
      'Butler families compare Lakota, Fairfield, Hamilton City, and other districts — verify boundaries; do not assume Cincinnati Public maps apply.',
    hospitalsDetail:
      'Fort Hamilton and regional Cincinnati medical systems serve the collar; map peak freeflow on I-75 corridors.',
    costIntro: 'Empty miles, multi-family access, and I-75 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and industrial calendars reshape demand more than downtown festival peaks alone.',
  },
  {
    file: 'clermont-tier2.ts',
    exportName: 'clermontCountyOhTier2Intelligence',
    slug: 'clermont',
    hubTitle: 'Clermont County Moving Intelligence Hub',
    eyebrow: 'Clermont · Batavia / Eastgate / Milford · Cincinnati east · vs Hamilton',
    h1: 'Moving in Clermont County: Eastgate, Milford & SR-32 / I-275 East Collar',
    heroOpener:
      'Clermont County is Cincinnati’s east growth collar — Eastgate retail corridors, Milford and Batavia stock, SR-32 / I-275 freeflow, and product that is not Warren’s I-71 north Mason pattern and not Butler’s I-75 west density. Expect longer empty miles into the core, HOA growth villages, and hill-edge approaches. This guide is for people moving in Clermont as Cincinnati-east collar product — not a Cincinnati rename.',
    heroCredibility:
      'East-collar suburbs · SR-32 / I-275 · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-275 · SR-32 · US-50 · SR-125 · SR-28 · Eastgate Blvd corridors',
    parentLabel: 'Hamilton County',
    parentHref: '/local-movers/ohio/hamilton',
    compareIntro:
      'Clermont is Eastgate / Milford east-collar growth — not Cincinnati urban hills and not Warren I-71 or Butler I-75 collars alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Hamilton crews fight river-city peaks. Clermont pairs ride I-275, SR-32, and Eastgate corridors — freer mid-day east of the core, still peak-heavy on retail and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Warren and Butler skew continuous planned growth on different spines. Clermont mixes Eastgate multi-family, Milford SFH, Batavia seat stock, and hill-edge lots — more continuous east-collar mix, less continuous pure premium Mason product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Growth HOAs need COI packets; hill approaches can add grades uncommon on pure flat West Chester cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Clermont quotes often sit at east-collar rates for driveway SFH — empty miles into Cincinnati still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Clermont is Cincinnati-east SR-32 / I-275 collar — not Hamilton core renamed and not Warren or Butler product.',
      },
    ],
    whatIntro: 'SR-32 freeflow, Eastgate density, and east-collar empty miles — not a Warren or Butler clone.',
    whatBullets: [
      {
        title: 'SR-32 / I-275 freeflow is billable',
        detail: 'Eastgate ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Warren and Butler collars',
        detail: 'East spine is not I-71 north or I-75 west product.',
      },
      {
        title: 'Hill-edge approaches rewrite truck size',
        detail: 'Photo grades and driveway geometry on some addresses.',
      },
      {
        title: 'KY / OH border legs may need FMCSA',
        detail: 'Clarify authority when either end crosses the river.',
      },
    ],
    zonesHeading: 'Clermont zones: Eastgate corridors, Milford edge, Batavia seat & rural east',
    zonesIntro: 'Two to four sharp products under one east-collar label.',
    zones: [
      z('eastgate', 'Eastgate retail & multi-family corridors', 'Eastgate', ['Eastgate', 'corridor multi-family'], 'Multi-family, townhomes, SFH', ['Arterial timing', 'Building COIs'], ['eastgate'], 'Collect management packets; avoid peak retail windows.'),
      z('milford', 'Milford east-edge suburbs', 'Milford', ['Milford', 'east-edge neighborhoods'], 'SFH, townhomes', ['HOA packets', 'I-275 peaks'], ['milford oh'], 'Confirm driveway and HOA hours; price portal-to-portal.'),
      z('batavia', 'Batavia seat & core', 'Batavia', ['Batavia', 'seat neighborhoods'], 'SFH, mixed stock', ['Street width', 'Arterial timing'], ['batavia'], 'Confirm staging near seat arterials.'),
      z('rural-east', 'Rural east & larger lots', 'Rural east', ['eastern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Grades'], ['clermont east'], 'Photo last-mile; rain and grade weeks need flexibility.'),
    ],
    specialized: [
      s('sr32', 'SR-32 / I-275 east-collar freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Hamilton hill rates for Eastgate multi-family.']),
      s('eastgate-mf', 'Eastgate multi-family logistics', 'Building packets are first-class cost drivers.', ['Elevator windows early.', 'Temporary no-parking often beats long carries.']),
      s('vs-collars', 'Distinct from Warren and Butler', 'East collar spines differ.', ['Do not recycle Mason or West Chester-only playbooks.', 'SR-32 east freeflow is the differentiator.']),
    ],
    schoolsIntro:
      'Clermont families compare Milford, West Clermont, Batavia, and other districts — verify boundaries; do not assume Cincinnati Public maps apply.',
    hospitalsDetail:
      'Regional hospitals and Cincinnati medical systems serve the east collar; map peak freeflow on I-275/SR-32 corridors.',
    costIntro: 'Empty miles, multi-family access, and east-collar peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than downtown event calendars alone.',
  },
  {
    file: 'lake-tier2.ts',
    exportName: 'lakeCountyOhTier2Intelligence',
    slug: 'lake',
    hubTitle: 'Lake County Moving Intelligence Hub',
    eyebrow: 'Lake · Mentor / Willoughby / Painesville · Cleveland east · vs Cuyahoga',
    h1: 'Moving in Lake County: Mentor, Willoughby & I-90 East Lakeshore Collar',
    heroOpener:
      'Lake County is Cleveland’s east lakeshore collar — Mentor corridors, Willoughby multi-story and SFH mix, Painesville seat stock, I-90 / SR-2 freeflow, and product that is not Cuyahoga downtown elevators and not Lorain’s west-shore industrial mix. Expect lake-effect winter access, longer empty miles into the city core, and shore-adjacent last-mile on some streets. This guide is for people moving in Lake as Cleveland-east lakeshore product — not a Cleveland rename.',
    heroCredibility:
      'Lakeshore east collar · I-90 / SR-2 · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-90 · SR-2 · US-20 · SR-44 · SR-91 · Vine Street corridors',
    parentLabel: 'Cuyahoga County',
    parentHref: '/local-movers/ohio/cuyahoga',
    compareIntro:
      'Lake is Mentor / Willoughby east-lakeshore collar — not Cleveland downtown multi-unit density and not Lorain west-shore product alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Cuyahoga crews fight downtown and Heights freeflow. Lake pairs ride I-90, SR-2, and Mentor corridors — freer mid-day east of the core, still peak-heavy on commute and lake-effect mornings.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Cuyahoga mixes downtown elevators and Heights stock. Lake mixes Mentor SFH, Willoughby multi-story, and Painesville seat product — more continuous east-shore suburban mix, less continuous core multi-unit density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Shore streets can tighten truck size; winter ice rewrites morning plans more often than pure inland Medina cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Lake quotes often sit at east-collar rates for driveway SFH — lake-effect delays and empty miles into Cleveland still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Lake is Cleveland-east lakeshore collar — not Cuyahoga core renamed and not Lorain or Medina product.',
      },
    ],
    whatIntro: 'I-90 east freeflow, lakeshore access, and winter contingency — not a Cleveland-core clone.',
    whatBullets: [
      {
        title: 'I-90 / SR-2 freeflow is billable',
        detail: 'Mentor ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Lake-effect winter is operational',
        detail: 'Ice and wind rewrite morning plans more often than southern collars.',
      },
      {
        title: 'Distinct from Lorain west shore',
        detail: 'East shore Mentor product is not Elyria/Avon west industrial mix.',
      },
      {
        title: 'Distinct from Medina south collar',
        detail: 'Lakeshore is not I-71 south inland product.',
      },
    ],
    zonesHeading: 'Lake zones: Mentor corridors, Willoughby mix, Painesville seat & eastern edges',
    zonesIntro: 'Two to four sharp products under one east-lakeshore collar label.',
    zones: [
      z('mentor', 'Mentor corridors & growth', 'Mentor', ['Mentor', 'corridor neighborhoods'], 'SFH, townhomes, multi-family', ['I-90 peaks', 'HOA packets'], ['mentor'], 'Price portal-to-portal; confirm multi-family packets.'),
      z('willoughby', 'Willoughby multi-story & SFH mix', 'Willoughby', ['Willoughby', 'city neighborhoods'], 'Multi-story, SFH, multi-unit', ['Stairs', 'Street parking', 'Winter ice'], ['willoughby'], 'Inventory stairs; winter mornings need flexibility.'),
      z('painesville', 'Painesville seat & core', 'Painesville', ['Painesville', 'seat neighborhoods'], 'SFH, multi-story older stock', ['Street width', 'Mixed access'], ['painesville'], 'Confirm staging near seat arterials.'),
      z('east-edges', 'Eastern edges & larger lots', 'East edges', ['Madison edges', 'eastern towns'], 'Larger lots, rural approaches', ['Empty miles', 'Winter ice'], ['lake east'], 'Photo last-mile; allow winter buffers.'),
    ],
    specialized: [
      s('i90-east', 'I-90 east-lakeshore freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Cuyahoga elevator rates for Mentor driveways.']),
      s('lake-effect', 'Lake-effect winter logistics', 'Weather rewrites morning plans.', ['Build ice-aware buffers into quotes.', 'Confirm approach conditions the day before.']),
      s('vs-collars', 'Distinct from Lorain and Medina', 'East shore differs from west shore and south inland.', ['Do not recycle west-industrial or south-inland playbooks.', 'I-90 east lakeshore is the differentiator.']),
    ],
    schoolsIntro:
      'Lake families compare Mentor, Willoughby-Eastlake, Painesville, and other districts — verify boundaries; do not assume Cleveland Metropolitan maps apply.',
    hospitalsDetail:
      'Lake Health / University Hospitals regional campuses and Cleveland systems serve the collar; map peak freeflow on I-90 corridors.',
    costIntro: 'Empty miles, winter access, and I-90 peaks often matter more than raw miles.',
    seasonalIntro: 'Lake-effect winter and school years reshape demand more than downtown event calendars alone.',
  },
  {
    file: 'lorain-tier2.ts',
    exportName: 'lorainCountyOhTier2Intelligence',
    slug: 'lorain',
    hubTitle: 'Lorain County Moving Intelligence Hub',
    eyebrow: 'Lorain · Lorain / Elyria / Avon · Cleveland west · vs Cuyahoga',
    h1: 'Moving in Lorain County: Avon, Elyria & I-90 / I-480 West Lakeshore Collar',
    heroOpener:
      'Lorain County is Cleveland’s west lakeshore and inland collar — Avon and Amherst growth, Elyria multi-story stock, Lorain city product, I-90 / I-480 freeflow, and product that is not Lake County’s east Mentor pattern and not Medina’s south inland growth alone. Expect industrial-edge residential, HOA west-shore villages, and lake-effect winter access. This guide is for people moving in Lorain as Cleveland-west collar product — not a Cleveland rename.',
    heroCredibility:
      'West lakeshore + I-90 edge · Avon / Elyria · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-90 · SR-2 · SR-57 · US-20 · SR-58 · Midway Mall corridors',
    parentLabel: 'Cuyahoga County',
    parentHref: '/local-movers/ohio/cuyahoga',
    compareIntro:
      'Lorain is Avon / Elyria west-lakeshore and inland collar — not Cleveland downtown multi-unit density and not Lake east-shore Mentor alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Cuyahoga crews fight downtown freeflow. Lorain pairs ride I-90, SR-2, and west corridors — freer mid-day west of the core, still peak-heavy on commute and industrial-shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lake skews continuous east-shore suburban product. Lorain mixes Avon HOA growth, Elyria multi-story, and Lorain city industrial-edge stock — more continuous west mix, less continuous pure east-shore retail corridors.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; growth HOAs need COI packets; industrial freeflow timing rewrites some residential pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Lorain quotes often sit at west-collar rates for driveway SFH — multi-story access and empty miles into Cleveland still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Lorain is Cleveland-west lakeshore/inland collar — not Cuyahoga core renamed and not Lake or Medina product.',
      },
    ],
    whatIntro: 'I-90 west freeflow, Avon growth, and Elyria multi-story — not a Lake or Medina clone.',
    whatBullets: [
      {
        title: 'I-90 / I-480 freeflow is billable',
        detail: 'Avon ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Lake east shore',
        detail: 'West industrial-edge mix is not Mentor corridor product alone.',
      },
      {
        title: 'Distinct from Medina south inland',
        detail: 'Lakeshore west is not I-71 south Brunswick product.',
      },
      {
        title: 'Lake-effect winter is operational',
        detail: 'Build ice-aware buffers into morning plans.',
      },
    ],
    zonesHeading: 'Lorain zones: Avon growth, Elyria multi-story, Lorain city & Amherst edges',
    zonesIntro: 'Two to four sharp products under one west-collar label.',
    zones: [
      z('avon', 'Avon / Amherst growth villages', 'Avon growth', ['Avon', 'Amherst', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'I-90 peaks'], ['avon', 'amherst'], 'Collect COI early; price portal-to-portal toward Cleveland.'),
      z('elyria', 'Elyria multi-story & seat stock', 'Elyria', ['Elyria', 'city neighborhoods'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['elyria'], 'Inventory stairs; plan temporary no-parking.'),
      z('lorain-city', 'Lorain city industrial-edge', 'Lorain city', ['Lorain', 'industrial-edge neighborhoods'], 'Multi-story, SFH, mixed stock', ['Street width', 'Shift timing'], ['lorain'], 'Avoid industrial-shift peaks when possible.'),
      z('inland', 'Inland edges & larger lots', 'Inland edges', ['southern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Winter ice'], ['lorain inland'], 'Photo last-mile; allow winter buffers.'),
    ],
    specialized: [
      s('i90-west', 'I-90 west-collar freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Cuyahoga elevator rates for Avon driveways.']),
      s('elyria-city', 'Elyria multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('vs-collars', 'Distinct from Lake and Medina', 'West shore/inland differs from east shore and south inland.', ['Do not recycle Mentor-only or Brunswick-only playbooks.', 'I-90 west mix is the differentiator.']),
    ],
    schoolsIntro:
      'Lorain families compare Avon, Elyria, Lorain City, Amherst, and other districts — verify boundaries; do not assume Cleveland Metropolitan maps apply.',
    hospitalsDetail:
      'Mercy Health and Cleveland Clinic regional campuses serve the west collar; map peak freeflow on I-90 corridors.',
    costIntro: 'Empty miles, multi-story access, and I-90 peaks often matter more than raw miles.',
    seasonalIntro: 'Lake-effect winter and school years reshape demand more than downtown event calendars alone.',
  },
  {
    file: 'medina-tier2.ts',
    exportName: 'medinaCountyOhTier2Intelligence',
    slug: 'medina',
    hubTitle: 'Medina County Moving Intelligence Hub',
    eyebrow: 'Medina · Medina / Brunswick · Cleveland south · vs Cuyahoga',
    h1: 'Moving in Medina County: Brunswick, Medina Seat & I-71 / I-76 South Collar',
    heroOpener:
      'Medina County is Cleveland’s south inland growth collar — Brunswick HOA corridors, Medina city seat stock, I-71 / I-76 freeflow, and product that is not lakeshore Lake or Lorain and not Cuyahoga Heights elevators. Expect longer empty miles into the city core, master-plan COIs, and school-calendar SFH volume. This guide is for people moving in Medina as Cleveland-south collar product — not a Cleveland rename.',
    heroCredibility:
      'South collar · I-71 / I-76 · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-71 · I-76 · I-271 links · SR-18 · SR-3 · SR-94 approaches',
    parentLabel: 'Cuyahoga County',
    parentHref: '/local-movers/ohio/cuyahoga',
    compareIntro:
      'Medina is Brunswick / Medina south-inland collar growth — not Cleveland downtown multi-unit density and not lakeshore Lake or Lorain product alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Cuyahoga crews fight downtown freeflow. Medina pairs ride I-71, I-76, and Brunswick corridors — freer mid-day south of the core, still peak-heavy on commute windows into Cleveland and Akron edges.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lake and Lorain mix shore multi-story. Medina skews continuous planned SFH, townhomes, and Medina city stock — more continuous south-inland HOA product, less continuous lakeshore industrial-edge mix.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets dominate growth villages; rural south edges add empty miles uncommon on pure Avon cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Medina quotes often sit at south-collar rates for driveway SFH — empty miles into Cleveland still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Medina is Cleveland-south inland collar — not Cuyahoga core renamed and not Lake or Lorain product.',
      },
    ],
    whatIntro: 'I-71 freeflow, Brunswick HOAs, and south-collar empty miles — not a lakeshore clone.',
    whatBullets: [
      {
        title: 'I-71 / I-76 freeflow is billable',
        detail: 'Brunswick ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Lake and Lorain shores',
        detail: 'Inland south growth is not east or west lakeshore product.',
      },
      {
        title: 'HOA growth dominates family volume',
        detail: 'COI and gate lists on new villages are standard.',
      },
      {
        title: 'Akron-edge pairs also appear',
        detail: 'Some jobs freeflow toward Summit — clarify portal assumptions.',
      },
    ],
    zonesHeading: 'Medina zones: Brunswick growth, Medina city seat, I-71 corridors & rural south',
    zonesIntro: 'Two to four sharp products under one south-collar label.',
    zones: [
      z('brunswick', 'Brunswick planned growth', 'Brunswick', ['Brunswick', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'I-71 peaks'], ['brunswick oh'], 'Collect COI early; price portal-to-portal toward Cleveland.'),
      z('medina-city', 'Medina city seat', 'Medina city', ['Medina', 'seat neighborhoods'], 'SFH, multi-story older stock', ['Street width', 'Mixed access'], ['medina'], 'Inventory older multi-story; confirm staging near seat arterials.'),
      z('i71-corridors', 'I-71 corridor suburbs', 'I-71 corridors', ['corridor neighborhoods'], 'SFH, townhomes', ['Commute peaks', 'HOA packets'], ['medina i-71'], 'Avoid peak I-71 windows when possible.'),
      z('rural-south', 'Rural south & larger lots', 'Rural south', ['southern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['medina south'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i71-south', 'I-71 south-collar freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Cuyahoga elevator rates for Brunswick driveways.']),
      s('hoa-growth', 'South-collar HOA growth logistics', 'Master-plan rules are first-class cost drivers.', ['Gate lists early.', 'Mud weeks on new streets need flexibility.']),
      s('vs-shores', 'Distinct from Lake and Lorain', 'Inland south differs from lakeshore collars.', ['Do not recycle shore multi-story playbooks.', 'I-71 south HOA growth is the differentiator.']),
    ],
    schoolsIntro:
      'Medina families compare Medina City, Brunswick, Highland, and other districts — verify boundaries; do not assume Cleveland Metropolitan maps apply.',
    hospitalsDetail:
      'Cleveland Clinic Medina and regional systems serve the south collar; map peak freeflow on I-71 corridors.',
    costIntro: 'Empty miles, HOA soft costs, and I-71 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than downtown event calendars alone.',
  },
  {
    file: 'portage-tier2.ts',
    exportName: 'portageCountyOhTier2Intelligence',
    slug: 'portage',
    hubTitle: 'Portage County Moving Intelligence Hub',
    eyebrow: 'Portage · Kent / Ravenna / Streetsboro · Akron east · vs Summit',
    h1: 'Moving in Portage County: Kent University Hub, Ravenna Seat & I-76 / Turnpike Access',
    heroOpener:
      'Portage County is Akron’s east university and Turnpike collar — Kent multi-story and student multi-family, Ravenna seat stock, Streetsboro growth, I-76 / Turnpike freeflow, and product that is not Summit’s Akron core multi-unit density alone. Expect term-weekend spikes, longer empty miles into Akron and Cleveland edges, and HOA pockets on growth streets. This guide is for people moving in Portage as Akron-east university product — not an Akron rename.',
    heroCredibility:
      'University town + Turnpike · I-76 · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-76 · I-80 Ohio Turnpike · SR-8 links · SR-59 · SR-14 · SR-43 approaches',
    parentLabel: 'Summit County',
    parentHref: '/local-movers/ohio/summit',
    compareIntro:
      'Portage is Kent university / Ravenna east product — not Akron core multi-unit density and not Cuyahoga Heights elevators alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Summit crews fight Akron core freeflow. Portage pairs ride I-76, Turnpike links, and Kent arterials — freer mid-day east of Akron, still peak-heavy on term weekends and I-76 peaks.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Summit mixes Akron multi-story and suburban SFH. Portage mixes Kent student multi-family, Ravenna seat stock, and Streetsboro growth — more continuous university density, less continuous pure Akron industrial-edge product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Student buildings need management packets; growth HOAs need COI; winter ice rewrites Turnpike-edge mornings.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Portage quotes often sit at secondary east-of-Akron rates for driveway SFH — term spikes push multi-family prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Portage is Akron-east university / Turnpike product — not Summit core renamed.',
      },
    ],
    whatIntro: 'Kent term calendars, I-76 freeflow, and east empty miles — not an Akron-core clone.',
    whatBullets: [
      {
        title: 'Kent State term calendars spike demand',
        detail: 'Move-in/move-out weekends fill local crews first — book early.',
      },
      {
        title: 'I-76 / Turnpike freeflow is billable',
        detail: 'Kent ↔ Akron pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Student multi-family needs building packets',
        detail: 'Elevators and long carries need inventories different from pure SFH playbooks.',
      },
      {
        title: 'Winter Turnpike approaches are operational',
        detail: 'Build ice-aware buffers into morning plans.',
      },
    ],
    zonesHeading: 'Portage zones: Kent campus density, Ravenna seat, Streetsboro growth & rural edges',
    zonesIntro: 'Two to four sharp products under one Akron-east label.',
    zones: [
      z('kent', 'Kent university multi-family', 'Kent', ['Kent', 'campus edges'], 'Student multi-family, multi-story, SFH', ['Term clusters', 'Building COIs', 'Stairs'], ['kent'], 'Book early around term calendars; collect management packets.'),
      z('ravenna', 'Ravenna seat & core', 'Ravenna', ['Ravenna', 'seat neighborhoods'], 'SFH, multi-story older stock', ['Street width', 'Mixed access'], ['ravenna'], 'Inventory older multi-story; confirm staging.'),
      z('streetsboro', 'Streetsboro growth corridors', 'Streetsboro', ['Streetsboro', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'Turnpike peaks'], ['streetsboro'], 'Collect COI early; price portal-to-portal.'),
      z('rural', 'Rural edges & larger lots', 'Rural edges', ['eastern/southern towns'], 'Larger lots, rural approaches', ['Empty miles', 'Winter ice'], ['portage rural'], 'Photo last-mile; allow winter buffers.'),
    ],
    specialized: [
      s('kent-university', 'Kent University term turnover', 'Term calendars create multi-family clusters.', ['Book early around move-in/move-out weekends.', 'Expect short-notice multi-family demand.']),
      s('i76-turnpike', 'I-76 / Turnpike freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Akron elevator rates for rural Portage lots.']),
      s('student-mf', 'Student multi-family building packets', 'Elevators and management rules dominate.', ['Collect COI and elevator windows early.', 'Do not quote pure suburban SFH rates for campus apartments.']),
    ],
    schoolsIntro:
      'Portage families compare Kent City, Ravenna, Streetsboro, and other districts — verify boundaries; university housing patterns do not replace district maps for family SFH.',
    hospitalsDetail:
      'University Hospitals Portage and Akron-region systems serve the county; map peak freeflow on I-76 corridors.',
    costIntro: 'Term spikes, multi-family access, and empty miles often matter more than raw miles.',
    seasonalIntro: 'University calendars and winter ice reshape demand more than Akron office peaks alone.',
  },
  {
    file: 'greene-tier2.ts',
    exportName: 'greeneCountyOhTier2Intelligence',
    slug: 'greene',
    hubTitle: 'Greene County Moving Intelligence Hub',
    eyebrow: 'Greene · Beavercreek / Xenia / Fairborn · Dayton east · vs Montgomery',
    h1: 'Moving in Greene County: Beavercreek, Fairborn & Wright-Patterson East-Metro Edge',
    heroOpener:
      'Greene County is Dayton’s east-metro and Wright-Patterson edge — Beavercreek HOA growth, Fairborn multi-family and base-adjacent stock, Xenia seat product, and freeflow that is not Montgomery’s Dayton core multi-unit density alone. Expect PCS and defense-contractor calendars, longer empty miles into Dayton, and master-plan COIs on growth streets. This guide is for people moving in Greene as Dayton-east / Wright-Patt edge product — not a Montgomery rename.',
    heroCredibility:
      'Wright-Patterson edge · East-metro suburbs · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-35 · I-675 · SR-444 · SR-235 · SR-4 approaches · Colonel Glenn Hwy corridors',
    parentLabel: 'Montgomery County',
    parentHref: '/local-movers/ohio/montgomery',
    compareIntro:
      'Greene is Beavercreek / Fairborn Wright-Patt east-edge product — not Dayton core multi-unit density and not pure west Montgomery suburbs alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Montgomery crews fight Dayton core freeflow. Greene pairs ride US-35, I-675, and Beavercreek corridors — freer mid-day east of the core, still peak-heavy on base and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Montgomery mixes Dayton multi-story and Kettering SFH. Greene mixes Beavercreek planned SFH, Fairborn multi-family, and Xenia seat stock — more continuous east-edge growth and base-adjacent product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets dominate Beavercreek; base-adjacent multi-family needs management packets uncommon on pure rural Xenia lots.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Greene quotes often sit at east-metro rates for driveway SFH — PCS spikes push multi-family prices up on peak order weeks.',
      },
      {
        title: 'Role difference',
        detail:
          'Greene is Dayton-east Wright-Patt edge — not Montgomery core renamed.',
      },
    ],
    whatIntro: 'Wright-Patt calendars, Beavercreek HOAs, and east-metro freeflow — not a Dayton-core clone.',
    whatBullets: [
      {
        title: 'Wright-Patterson PCS and contractor cycles rewrite demand',
        detail: 'Order and contract calendars fill crews differently than pure family Saturdays.',
      },
      {
        title: 'Beavercreek HOA growth is first-class product',
        detail: 'COI and gate lists on planned villages are standard.',
      },
      {
        title: 'US-35 / I-675 freeflow is billable',
        detail: 'Beavercreek ↔ Dayton pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Base-adjacent multi-family needs building packets',
        detail: 'Elevators and long carries need inventories different from pure SFH playbooks.',
      },
    ],
    zonesHeading: 'Greene zones: Beavercreek growth, Fairborn base-edge, Xenia seat & rural east',
    zonesIntro: 'Two to four sharp products under one Dayton-east label.',
    zones: [
      z('beavercreek', 'Beavercreek planned growth', 'Beavercreek', ['Beavercreek', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'US-35 peaks'], ['beavercreek'], 'Collect COI early; price portal-to-portal toward Dayton.'),
      z('fairborn', 'Fairborn base-adjacent multi-family', 'Fairborn', ['Fairborn', 'base approaches'], 'Multi-family, apartments, SFH', ['PCS clusters', 'Building COIs'], ['fairborn'], 'Align to PCS windows when relevant; collect management packets.'),
      z('xenia', 'Xenia seat & core', 'Xenia', ['Xenia', 'seat neighborhoods'], 'SFH, multi-story older stock', ['Street width', 'Mixed access'], ['xenia'], 'Inventory older multi-story; confirm staging.'),
      z('rural-east', 'Rural east & larger lots', 'Rural east', ['eastern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['greene east'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('wright-patt', 'Wright-Patterson PCS & contractor turnover', 'Base calendars create multi-family clusters.', ['Book early around peak PCS months.', 'Collect elevator windows and building packets.']),
      s('beavercreek-hoa', 'Beavercreek HOA growth logistics', 'Master-plan rules are first-class cost drivers.', ['Gate lists early.', 'Weekday windows often beat Saturdays.']),
      s('us35-freeflow', 'US-35 / I-675 east-metro freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Dayton elevator rates for Beavercreek driveways.']),
    ],
    schoolsIntro:
      'Greene families compare Beavercreek, Fairborn, Xenia, and other districts — verify boundaries; do not assume Dayton Public maps apply.',
    hospitalsDetail:
      'Soin Medical Center and Dayton-region systems serve the east metro; map peak freeflow on US-35 corridors.',
    costIntro: 'PCS spikes, HOA soft costs, and east-metro peaks often matter more than raw miles.',
    seasonalIntro: 'PCS windows and school years reshape demand more than pure Dayton office peaks alone.',
  },
  {
    file: 'fairfield-tier2.ts',
    exportName: 'fairfieldCountyOhTier2Intelligence',
    slug: 'fairfield',
    hubTitle: 'Fairfield County Moving Intelligence Hub',
    eyebrow: 'Fairfield · Lancaster / Pickerington edge · Columbus SE · vs Franklin',
    h1: 'Moving in Fairfield County: Lancaster Seat, Pickerington Edge & US-33 Southeast Access',
    heroOpener:
      'Fairfield County is Columbus’s southeast collar — Lancaster multi-story and seat stock, Pickerington-edge growth shared with Franklin freeflow, US-33 corridors, and product that is not Delaware’s north Powell HOA pattern and not Licking’s Newark east-metro mix alone. Expect longer empty miles into the core, HOA pockets on the metro edge, and small-city stairs in Lancaster. This guide is for people moving in Fairfield as Columbus-southeast product — not a Franklin rename.',
    heroCredibility:
      'US-33 corridor · Lancaster / Pickerington edge · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-33 · US-22 · SR-37 · SR-158 · SR-188 · I-70 approaches',
    parentLabel: 'Franklin County',
    parentHref: '/local-movers/ohio/franklin',
    compareIntro:
      'Fairfield is Lancaster / Pickerington-edge US-33 southeast product — not Short North elevators and not Delaware north-collar growth alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Franklin crews fight I-70/I-71 core peaks. Fairfield pairs ride US-33, SR-37, and Lancaster arterials — freer mid-day southeast of I-270, still peak-heavy on commute windows into the core.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Delaware skews continuous premium north HOAs. Fairfield mixes Lancaster multi-story, Pickerington-edge planned SFH, and rural lots — more continuous seat-city product, less continuous pure top-growth north villages.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Lancaster multi-story needs stair inventories; metro-edge HOAs need COI packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Fairfield quotes often sit at southeast-collar rates for driveway SFH — empty miles and city access still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Fairfield is Columbus-southeast US-33 product — not Franklin core renamed and not Delaware north growth.',
      },
    ],
    whatIntro: 'US-33 freeflow, Lancaster multi-story, and SE empty miles — not a Delaware north clone.',
    whatBullets: [
      {
        title: 'US-33 freeflow is billable',
        detail: 'Lancaster ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Delaware north growth',
        detail: 'Southeast seat-city mix is not Powell premium HOA product alone.',
      },
      {
        title: 'Distinct from Licking east-metro',
        detail: 'US-33 southeast is not Newark/Pataskala east product alone.',
      },
      {
        title: 'Lancaster multi-story is first-class',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
    ],
    zonesHeading: 'Fairfield zones: Lancaster core, Pickerington edge, US-33 corridors & rural south',
    zonesIntro: 'Two to four sharp products under one Columbus-southeast label.',
    zones: [
      z('lancaster', 'Lancaster city multi-story', 'Lancaster', ['Lancaster', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['lancaster oh'], 'Inventory stairs; plan temporary no-parking.'),
      z('pickerington-edge', 'Pickerington metro-edge growth', 'Pickerington edge', ['Pickerington edges', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'Commute peaks'], ['pickerington'], 'Collect COI early; clarify county line for freeflow assumptions.'),
      z('us33', 'US-33 corridor suburbs', 'US-33 corridors', ['corridor neighborhoods'], 'SFH, townhomes', ['US-33 peaks'], ['fairfield us-33'], 'Price portal-to-portal toward Columbus.'),
      z('rural-south', 'Rural south & larger lots', 'Rural south', ['southern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['fairfield south'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('us33', 'US-33 southeast freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Franklin elevator rates for Lancaster multi-story.']),
      s('lancaster-city', 'Lancaster multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('vs-north-east', 'Distinct from Delaware and Licking', 'Southeast differs from north growth and east-metro.', ['Do not recycle Powell-only or Newark-only playbooks.', 'US-33 Lancaster mix is the differentiator.']),
    ],
    schoolsIntro:
      'Fairfield families compare Lancaster City, Pickerington, Fairfield Union, and other districts — verify boundaries; metro-edge reputation does not replace district maps.',
    hospitalsDetail:
      'Fairfield Medical Center and Columbus-region systems serve the southeast collar; map peak freeflow on US-33 corridors.',
    costIntro: 'Empty miles, city access, and US-33 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than OSU lease waves alone.',
  },
  {
    file: 'licking-tier2.ts',
    exportName: 'lickingCountyOhTier2Intelligence',
    slug: 'licking',
    hubTitle: 'Licking County Moving Intelligence Hub',
    eyebrow: 'Licking · Newark / Pataskala / Heath · Columbus east · vs Franklin',
    h1: 'Moving in Licking County: Newark, Pataskala & SR-161 / I-70 East-Metro Growth',
    heroOpener:
      'Licking County is Columbus’s east-metro growth collar — Pataskala and Heath planned product, Newark multi-story and seat stock, SR-161 / I-70 freeflow, and product that is not Delaware’s north Powell HOA pattern and not Fairfield’s Lancaster US-33 mix alone. Expect longer empty miles into the core, master-plan COIs on the metro edge, and small-city stairs in Newark. This guide is for people moving in Licking as Columbus-east product — not a Franklin rename.',
    heroCredibility:
      'East-metro growth · SR-161 / I-70 · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-70 · SR-161 · SR-16 · SR-79 · SR-37 · US-40 approaches',
    parentLabel: 'Franklin County',
    parentHref: '/local-movers/ohio/franklin',
    compareIntro:
      'Licking is Pataskala / Newark east-metro growth — not Short North elevators and not Delaware north-collar or Fairfield US-33 product alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Franklin crews fight I-70/I-71 core peaks. Licking pairs ride I-70, SR-161, and Newark arterials — freer mid-day east of I-270, still peak-heavy on commute windows into the core.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Delaware skews continuous north premium HOAs. Licking mixes Pataskala planned SFH, Heath corridors, and Newark multi-story — more continuous east-metro mix with a true seat city.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Metro-edge HOAs need COI packets; Newark multi-story needs stair inventories uncommon on pure Powell cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Licking quotes often sit at east-collar rates for driveway SFH — empty miles and city access still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Licking is Columbus-east SR-161 / I-70 product — not Franklin core renamed and not Delaware or Fairfield product.',
      },
    ],
    whatIntro: 'SR-161 freeflow, Newark multi-story, and east-metro empty miles — not a Delaware north clone.',
    whatBullets: [
      {
        title: 'SR-161 / I-70 freeflow is billable',
        detail: 'Pataskala ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Delaware north growth',
        detail: 'East-metro is not Powell premium HOA product alone.',
      },
      {
        title: 'Distinct from Fairfield US-33 southeast',
        detail: 'Newark/Pataskala east is not Lancaster US-33 product alone.',
      },
      {
        title: 'Newark multi-story is first-class',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
    ],
    zonesHeading: 'Licking zones: Pataskala growth, Heath corridors, Newark core & rural east',
    zonesIntro: 'Two to four sharp products under one Columbus-east label.',
    zones: [
      z('pataskala', 'Pataskala metro-edge growth', 'Pataskala', ['Pataskala', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'SR-161 peaks'], ['pataskala'], 'Collect COI early; price portal-to-portal toward Columbus.'),
      z('heath', 'Heath corridor suburbs', 'Heath', ['Heath', 'corridor edges'], 'SFH, townhomes', ['Arterial timing', 'HOA packets'], ['heath'], 'Confirm driveway staging; avoid peak windows when possible.'),
      z('newark', 'Newark city multi-story', 'Newark', ['Newark', 'downtown edges'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street parking'], ['newark oh'], 'Inventory stairs; plan temporary no-parking.'),
      z('rural-east', 'Rural east & larger lots', 'Rural east', ['eastern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['licking east'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('sr161', 'SR-161 / I-70 east-metro freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Franklin elevator rates for Newark multi-story.']),
      s('newark-city', 'Newark multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('vs-collars', 'Distinct from Delaware and Fairfield', 'East-metro differs from north growth and SE US-33.', ['Do not recycle Powell-only or Lancaster-only playbooks.', 'SR-161 Pataskala/Newark mix is the differentiator.']),
    ],
    schoolsIntro:
      'Licking families compare Newark City, Southwest Licking, Lakewood, and other districts — verify boundaries; metro-edge reputation does not replace district maps.',
    hospitalsDetail:
      'Licking Memorial and Columbus-region systems serve the east metro; map peak freeflow on SR-161/I-70 corridors.',
    costIntro: 'Empty miles, city access, and east-metro peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than OSU lease waves alone.',
  },
  {
    file: 'wood-tier2.ts',
    exportName: 'woodCountyOhTier2Intelligence',
    slug: 'wood',
    hubTitle: 'Wood County Moving Intelligence Hub',
    eyebrow: 'Wood · Bowling Green / Perrysburg · Toledo south · vs Lucas',
    h1: 'Moving in Wood County: Bowling Green University Hub, Perrysburg & I-75 South Collar',
    heroOpener:
      'Wood County is Toledo’s south collar and university hub — Bowling Green multi-story and student multi-family, Perrysburg planned growth, I-75 freeflow, and product that is not Lucas’s Toledo core multi-unit density alone. Expect term-weekend spikes, longer empty miles into Toledo, and HOA packets on Perrysburg streets. This guide is for people moving in Wood as Toledo-south / BG university product — not a Toledo rename.',
    heroCredibility:
      'University + I-75 south collar · Perrysburg growth · PUCO household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-75 · US-23 · US-6 · SR-25 · SR-64 · SR-582 approaches',
    parentLabel: 'Lucas County',
    parentHref: '/local-movers/ohio/lucas',
    compareIntro:
      'Wood is Bowling Green university / Perrysburg south-collar product — not Toledo core multi-unit density and not pure lake-plain industrial freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lucas crews fight Toledo core freeflow. Wood pairs ride I-75, US-23, and Perrysburg corridors — freer mid-day south of the core, still peak-heavy on term weekends and I-75 peaks.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lucas mixes Toledo multi-story and Maumee edges. Wood mixes BG student multi-family, Perrysburg planned SFH, and rural lots — more continuous university and south-collar product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Student buildings need management packets; Perrysburg HOAs need COI; MI border jobs still flip to FMCSA.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Wood quotes often sit at secondary south-of-Toledo rates for driveway SFH — term spikes push multi-family prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Wood is Toledo-south university / I-75 collar — not Lucas core renamed.',
      },
    ],
    whatIntro: 'BG term calendars, Perrysburg HOAs, and I-75 freeflow — not a Toledo-core clone.',
    whatBullets: [
      {
        title: 'Bowling Green term calendars spike demand',
        detail: 'Move-in/move-out weekends fill local crews first — book early.',
      },
      {
        title: 'I-75 freeflow is billable',
        detail: 'Perrysburg ↔ Toledo pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Student multi-family needs building packets',
        detail: 'Elevators and long carries need inventories different from pure SFH playbooks.',
      },
      {
        title: 'MI adjacency can create interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
    ],
    zonesHeading: 'Wood zones: Bowling Green campus, Perrysburg growth, I-75 corridors & rural south',
    zonesIntro: 'Two to four sharp products under one Toledo-south label.',
    zones: [
      z('bowling-green', 'Bowling Green university multi-family', 'Bowling Green', ['Bowling Green', 'campus edges'], 'Student multi-family, multi-story, SFH', ['Term clusters', 'Building COIs', 'Stairs'], ['bowling green'], 'Book early around term calendars; collect management packets.'),
      z('perrysburg', 'Perrysburg planned growth', 'Perrysburg', ['Perrysburg', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'I-75 peaks'], ['perrysburg'], 'Collect COI early; price portal-to-portal toward Toledo.'),
      z('i75-corridors', 'I-75 corridor suburbs', 'I-75 corridors', ['corridor neighborhoods'], 'SFH, townhomes', ['Commute peaks'], ['wood i-75'], 'Avoid peak I-75 windows when possible.'),
      z('rural-south', 'Rural south & larger lots', 'Rural south', ['southern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['wood south'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('bgsu-turnover', 'Bowling Green university term turnover', 'Term calendars create multi-family clusters.', ['Book early around move-in/move-out weekends.', 'Expect short-notice multi-family demand.']),
      s('perrysburg-hoa', 'Perrysburg HOA growth logistics', 'Master-plan rules are first-class cost drivers.', ['Gate lists early.', 'Weekday windows often beat Saturdays.']),
      s('i75-south', 'I-75 south-of-Toledo freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Toledo elevator rates for BG campus apartments.']),
    ],
    schoolsIntro:
      'Wood families compare Bowling Green, Perrysburg, Eastwood, and other districts — verify boundaries; university housing patterns do not replace district maps for family SFH.',
    hospitalsDetail:
      'Wood County Hospital and Toledo-region systems serve the south collar; map peak freeflow on I-75 corridors.',
    costIntro: 'Term spikes, HOA soft costs, and I-75 peaks often matter more than raw miles.',
    seasonalIntro: 'University calendars and school years reshape demand more than Toledo industrial peaks alone.',
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
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** ${p.slug} — OH Tier 2 Wave 1 */
export const ${p.exportName}: CountyIntelligencePack = finalizeOhTier2Pack({
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
      OH_TIER2_REG_BULLET,
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
              'Use Ohio DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, and military markets can tighten housing near school calendars.',
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
      { title: 'Winter access', detail: 'Lake-effect and inland ice rewrite morning plans on many collars.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify PUCO household-goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: '${esc(p.parentLabel)} movers (parent contrast)', href: '${p.parentHref}' },
    ],
  },
});
`;
}

const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/ohio');
for (const p of packs) {
  writeFileSync(join(outDir, p.file), render(p), 'utf8');
  console.log('wrote', p.file);
}
console.log('Generated', packs.length, 'OH Tier 2 Wave 1 packs');
