/**
 * Generate VA Tier 2 Wave 1 packs (12 jurisdictions).
 * Run: npx tsx scripts/generate-va-tier2-wave1.ts
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
    file: 'stafford-tier2.ts',
    exportName: 'staffordCountyVaTier2Intelligence',
    slug: 'stafford',
    hubTitle: 'Stafford County Moving Intelligence Hub',
    eyebrow: 'Stafford · Aquia / Garrisonville · I-95 NoVA–Fredericksburg · vs Prince William',
    h1: 'Moving in Stafford County: Aquia, Garrisonville & I-95 Quantico-Adjacent Growth',
    heroOpener:
      'Stafford County is the I-95 collar between Northern Virginia and Fredericksburg — Aquia and Garrisonville multi-family density, Quantico-adjacent PCS calendars, US-1 corridors, and longer empty miles than Prince William’s Woodbridge/Manassas product alone. Expect HOA packets, base-adjacent deadlines, and portal-to-portal time that map miles understate. This guide is for people moving in Stafford as I-95 commuting collar product — not a Prince William rename and not a Spotsylvania south-growth clone.',
    heroCredibility:
      'I-95 commute collar · Quantico-adjacent · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-95 · US-1 · VA-610 (Garrisonville) · VA-17',
    parentLabel: 'Prince William County',
    parentHref: '/local-movers/virginia/prince-william',
    compareIntro:
      'Stafford is I-95 south-of-PW commuting growth with Quantico adjacency — not Woodbridge/Manassas density alone and not Spotsylvania VA-3 south product.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Prince William crews fight I-95/VA-234 peaks closer to the Beltway. Stafford pairs ride I-95 further south, US-1, and VA-610 — freer mid-day off NoVA choke points, still peak-heavy on Quantico and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Prince William mixes Dale City multi-family and Gainesville HOAs. Stafford mixes Garrisonville multi-family, Aquia water-edge lots, and Courthouse-edge SFH — more continuous Quantico-adjacent product, less continuous outer-Manassas warehouse-edge density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets and apartment COIs dominate growth corridors; base calendars rewrite mid-week demand more often than pure Saturday residential quotes.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Stafford quotes often sit at secondary I-95 collar rates for driveway SFH — empty miles into NoVA and multi-family access still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Stafford is I-95 NoVA–Fredericksburg collar with Quantico adjacency — not Prince William renamed and not Spotsylvania south growth.',
      },
    ],
    whatIntro: 'I-95 freeflow, Quantico calendars, and Garrisonville density — not a PW or Spotsylvania clone.',
    whatBullets: [
      {
        title: 'I-95 freeflow is billable',
        detail: 'Stafford ↔ PW pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Quantico-adjacent PCS and contractor deadlines',
        detail: 'Report dates create mid-week spikes pure residential Saturday quotes miss.',
      },
      {
        title: 'Distinct from Spotsylvania south growth',
        detail: 'North-of-Freds I-95 product is not Massaponax/VA-3 western growth alone.',
      },
      {
        title: 'MD/DC legs need FMCSA',
        detail: 'Cross-border destinations flip authority even on short-looking hops.',
      },
    ],
    zonesHeading: 'Stafford zones: Garrisonville density, Aquia edge, Courthouse seat & rural west',
    zonesIntro: 'Two to four sharp products under one I-95 collar label.',
    zones: [
      z('garrisonville', 'Garrisonville multi-family & retail corridors', 'Garrisonville', ['Garrisonville', 'VA-610 edges'], 'Multi-family, townhomes, SFH', ['Arterial timing', 'Building COIs'], ['garrisonville'], 'Collect management packets; avoid peak retail windows.'),
      z('aquia', 'Aquia / water-edge product', 'Aquia', ['Aquia Harbour', 'Aquia edges'], 'SFH, water-access lots', ['Last-mile width', 'HOA packets'], ['aquia'], 'Photo approaches; confirm HOA rules early.'),
      z('courthouse', 'Stafford Courthouse seat edges', 'Courthouse', ['Stafford Courthouse', 'seat neighborhoods'], 'SFH, mixed stock', ['Street width', 'Mixed access'], ['stafford courthouse'], 'Confirm driveway staging near seat arterials.'),
      z('rural-west', 'Rural west & larger lots', 'Rural west', ['western towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['stafford west'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i95-collar', 'I-95 commuting freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote PW Woodbridge rates for Aquia water-edge lots.']),
      s('quantico', 'Quantico-adjacent PCS logistics', 'Base calendars create hard deadlines.', ['Book early around report dates.', 'Ask about storage-in-transit.']),
      s('garrisonville-mf', 'Garrisonville multi-family turns', 'Building packets are first-class cost drivers.', ['Elevator windows early.', 'Month-end competition for crews is real.']),
    ],
    schoolsIntro:
      'Stafford families compare Stafford County Schools feeders across Garrisonville and Courthouse areas — verify boundaries; do not assume Prince William maps apply.',
    hospitalsDetail:
      'Stafford Hospital and regional NoVA/Fredericksburg systems serve the collar; map peak freeflow on I-95 corridors.',
    costIntro: 'Empty miles, multi-family access, and I-95 peaks often matter more than raw miles.',
    seasonalIntro: 'PCS windows and school years reshape demand more than pure NoVA office peaks alone.',
  },
  {
    file: 'spotsylvania-tier2.ts',
    exportName: 'spotsylvaniaCountyVaTier2Intelligence',
    slug: 'spotsylvania',
    hubTitle: 'Spotsylvania County Moving Intelligence Hub',
    eyebrow: 'Spotsylvania · Massaponax / Spotsylvania Courthouse · Freds south · vs Stafford',
    h1: 'Moving in Spotsylvania County: Massaponax Growth, Courthouse Seat & I-95 South Access',
    heroOpener:
      'Spotsylvania County is Fredericksburg’s south growth collar — Massaponax multi-family and retail corridors, Spotsylvania Courthouse seat stock, VA-3 western growth, and freeflow that is not Stafford’s Quantico-adjacent I-95 north product alone. Expect longer empty miles into NoVA, HOA packets on growth streets, and I-95 peaks that still rewrite “local” pairs. This guide is for people moving in Spotsylvania as south-Freds growth product — not a Stafford rename.',
    heroCredibility:
      'South-Fredericksburg growth · I-95 / VA-3 · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-95 · VA-3 · US-1 · VA-208',
    parentLabel: 'Stafford County (and independent Fredericksburg-south patterns)',
    parentHref: '/local-movers/virginia/stafford',
    compareIntro:
      'Spotsylvania is Massaponax / VA-3 south-Freds growth — not Stafford Garrisonville Quantico product and not Richmond-metro defaults.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Stafford crews fight Quantico and north I-95 peaks. Spotsylvania pairs ride I-95 further south, VA-3, and Massaponax corridors — freer mid-day off Quantico choke points, still peak-heavy on Freds and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Stafford mixes Garrisonville multi-family and Aquia lots. Spotsylvania mixes Massaponax multi-family, Courthouse SFH, and western VA-3 growth — more continuous south-Freds product, less continuous Quantico-adjacent density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Growth HOAs need COI packets; Massaponax multi-family needs building packets uncommon on pure rural western lots.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Spotsylvania quotes often sit at secondary south-Freds rates for driveway SFH — empty miles into NoVA still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Spotsylvania is south-Fredericksburg I-95/VA-3 growth — not Stafford renamed.',
      },
    ],
    whatIntro: 'Massaponax freeflow, VA-3 growth, and south-Freds empty miles — not a Stafford clone.',
    whatBullets: [
      {
        title: 'I-95 freeflow is still billable',
        detail: 'Massaponax ↔ NoVA pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Stafford Quantico product',
        detail: 'South growth is not Garrisonville base-adjacent density alone.',
      },
      {
        title: 'VA-3 western growth rewrites last-mile',
        detail: 'Longer empty miles and rural approaches vs Massaponax multi-family.',
      },
      {
        title: 'MD/DC legs need FMCSA',
        detail: 'Cross-border destinations flip authority.',
      },
    ],
    zonesHeading: 'Spotsylvania zones: Massaponax corridors, Courthouse seat, VA-3 west growth & rural south',
    zonesIntro: 'Two to four sharp products under one south-Freds label.',
    zones: [
      z('massaponax', 'Massaponax multi-family & retail', 'Massaponax', ['Massaponax', 'US-1 edges'], 'Multi-family, townhomes, SFH', ['Arterial timing', 'Building COIs'], ['massaponax'], 'Collect management packets; avoid peak retail windows.'),
      z('courthouse', 'Spotsylvania Courthouse seat', 'Courthouse', ['Spotsylvania Courthouse', 'seat neighborhoods'], 'SFH, mixed stock', ['Street width', 'Mixed access'], ['spotsylvania courthouse'], 'Confirm driveway staging near seat arterials.'),
      z('va3-west', 'VA-3 western growth villages', 'VA-3 west', ['western growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'Empty miles'], ['spotsylvania va-3'], 'Collect COI early; price portal-to-portal.'),
      z('rural-south', 'Rural south & larger lots', 'Rural south', ['southern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['spotsylvania south'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i95-south', 'I-95 south-Freds freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Stafford Quantico rates for rural VA-3 lots.']),
      s('massaponax-mf', 'Massaponax multi-family logistics', 'Building packets are first-class cost drivers.', ['Elevator windows early.', 'Month-end competition for crews is real.']),
      s('vs-stafford', 'Distinct from Stafford north collar', 'South growth differs from Quantico adjacency.', ['Do not recycle Garrisonville-only playbooks.', 'Massaponax/VA-3 mix is the differentiator.']),
    ],
    schoolsIntro:
      'Spotsylvania families compare Spotsylvania County Schools feeders across Massaponax and Courthouse areas — verify boundaries; do not assume Stafford maps apply.',
    hospitalsDetail:
      'Mary Washington and regional systems serve the Freds south collar; map peak freeflow on I-95 corridors.',
    costIntro: 'Empty miles, multi-family access, and I-95 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than Quantico PCS peaks alone.',
  },
  {
    file: 'hanover-tier2.ts',
    exportName: 'hanoverCountyVaTier2Intelligence',
    slug: 'hanover',
    hubTitle: 'Hanover County Moving Intelligence Hub',
    eyebrow: 'Hanover · Ashland / Mechanicsville edge · Richmond north · vs Henrico',
    h1: 'Moving in Hanover County: Ashland, Mechanicsville Edge & I-95 / I-295 North Collar',
    heroOpener:
      'Hanover County is Richmond’s north growth collar — Ashland multi-story and seat stock, Mechanicsville-edge HOAs shared with Henrico freeflow, I-95 / I-295 corridors, and product that is not Henrico’s continuous Short Pump / Innsbrook density alone. Expect longer empty miles into the city core, school-calendar SFH volume, and portal-to-portal time that map miles understate. This guide is for people moving in Hanover as Richmond-north collar product — not a Henrico rename.',
    heroCredibility:
      'North-Richmond collar · I-95 / I-295 · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-95 · I-295 · US-301 · US-360 · VA-54 · VA-156 approaches',
    parentLabel: 'Henrico County',
    parentHref: '/local-movers/virginia/henrico',
    compareIntro:
      'Hanover is Ashland / Mechanicsville-edge north-collar growth — not Henrico Short Pump multi-family density and not Chesterfield south-collar product alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Henrico crews fight I-64/I-295 and west-end peaks. Hanover pairs ride I-95 north, I-295, and Ashland arterials — freer mid-day further north, still peak-heavy on commute windows into Richmond.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Henrico mixes west-end multi-family and planned suburbs. Hanover mixes Ashland multi-story, Mechanicsville-edge SFH, and rural north lots — more continuous north-collar mix with a true seat town.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Growth HOAs need COI packets; Ashland multi-story needs stair inventories uncommon on pure Short Pump cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Hanover quotes often sit at north-collar rates for driveway SFH — empty miles into Richmond still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Hanover is Richmond-north I-95/I-295 collar — not Henrico renamed.',
      },
    ],
    whatIntro: 'I-95 north freeflow, Ashland multi-story, and north-collar empty miles — not a Henrico clone.',
    whatBullets: [
      {
        title: 'I-95 / I-295 freeflow is billable',
        detail: 'Ashland ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Henrico west-end density',
        detail: 'North-collar seat-town mix is not Short Pump multi-family alone.',
      },
      {
        title: 'Ashland multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Rural north empty miles matter',
        detail: 'Do not quote Henrico local rates for far northern lots.',
      },
    ],
    zonesHeading: 'Hanover zones: Ashland seat, Mechanicsville edge, I-95 corridors & rural north',
    zonesIntro: 'Two to four sharp products under one Richmond-north label.',
    zones: [
      z('ashland', 'Ashland multi-story & seat', 'Ashland', ['Ashland', 'seat neighborhoods'], 'Multi-story, SFH, mixed stock', ['Stairs', 'Street parking'], ['ashland'], 'Inventory stairs; plan temporary no-parking.'),
      z('mechanicsville', 'Mechanicsville edge growth', 'Mechanicsville edge', ['Mechanicsville edges', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'Commute peaks'], ['mechanicsville'], 'Collect COI early; clarify county line for freeflow assumptions.'),
      z('i95', 'I-95 / I-295 corridor suburbs', 'I-95 corridors', ['corridor neighborhoods'], 'SFH, townhomes', ['I-95 peaks'], ['hanover i-95'], 'Price portal-to-portal toward Richmond.'),
      z('rural-north', 'Rural north & larger lots', 'Rural north', ['northern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['hanover north'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i95-north', 'I-95 / I-295 north-collar freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Henrico elevator rates for Ashland multi-story.']),
      s('ashland-city', 'Ashland multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('vs-henrico', 'Distinct from Henrico west-end', 'North collar differs from Short Pump density.', ['Do not recycle Innsbrook-only playbooks.', 'Ashland/Mechanicsville mix is the differentiator.']),
    ],
    schoolsIntro:
      'Hanover families compare Hanover County Schools feeders across Ashland and Mechanicsville edges — verify boundaries; do not assume Henrico maps apply.',
    hospitalsDetail:
      'Regional hospitals and Richmond medical systems serve the north collar; map peak freeflow on I-95/I-295 corridors.',
    costIntro: 'Empty miles, city access, and I-95 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than downtown event calendars alone.',
  },
  {
    file: 'albemarle-tier2.ts',
    exportName: 'albemarleCountyVaTier2Intelligence',
    slug: 'albemarle',
    hubTitle: 'Albemarle County Moving Intelligence Hub',
    eyebrow: 'Albemarle · Charlottesville-area · UVA university / mountain-edge · independent',
    h1: 'Moving in Albemarle County: Charlottesville-Area Growth, UVA Cycles & Mountain-Edge Access',
    heroOpener:
      'Albemarle County is the independent university and mountain-edge market around Charlottesville — Crozet and Pantops growth, rural-suburban lots, UVA term calendars that spill into the county, and freeflow that does not answer to NoVA I-95 collars or Richmond belt defaults. Expect longer empty miles, HOA pockets, mountain last-mile that rejects full trailers, and student-adjacent multi-family near the city line. This guide is for people moving in Albemarle as Charlottesville-area county product — not a NoVA or Richmond rename.',
    heroCredibility:
      'UVA market · Mountain-edge · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-64 · US-29 · US-250 · VA-20 · VA-240 · VA-6 approaches',
    parentLabel: 'independent UVA / Charlottesville-area market (vs NoVA / Richmond defaults)',
    parentHref: '/local-movers/virginia/henrico',
    compareIntro:
      'Albemarle is Charlottesville-area university and mountain-edge product — not NoVA HOA density and not Richmond I-95 collars alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'NoVA crews fight Beltway peaks; Richmond crews fight I-95. Albemarle pairs ride I-64, US-29, and mountain approaches — freer mid-day Central VA freeflow, still peak-heavy on UVA term weekends and US-29 peaks.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'NoVA mixes continuous multi-family collars. Albemarle mixes Crozet planned SFH, Pantops multi-family, and mountain-edge lots — more continuous university-adjacent and rural-suburban product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Mountain approaches often need smaller trucks; student multi-family near the city line needs building packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Albemarle quotes often sit at secondary university-market rates for driveway SFH — mountain last-mile and term spikes push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Albemarle is independent UVA / Charlottesville-area county product — not NoVA or Richmond renamed.',
      },
    ],
    whatIntro: 'UVA calendars, mountain last-mile, and Central VA freeflow — not a NoVA clone.',
    whatBullets: [
      {
        title: 'UVA term calendars spill into the county',
        detail: 'Move-in/move-out weekends fill crews first — book early.',
      },
      {
        title: 'Mountain-edge last-mile rewrites truck size',
        detail: 'Photo approaches; many lots reject full trailers.',
      },
      {
        title: 'I-64 / US-29 freeflow is billable',
        detail: 'Crozet ↔ Pantops pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Richmond and NoVA defaults',
        detail: 'Do not recycle I-95 collar or Beltway multi-family playbooks.',
      },
    ],
    zonesHeading: 'Albemarle zones: Crozet growth, Pantops multi-family, mountain-edge lots & rural south',
    zonesIntro: 'Two to four sharp products under one Charlottesville-area county label.',
    zones: [
      z('crozet', 'Crozet planned growth', 'Crozet', ['Crozet', 'growth villages'], 'Planned SFH, townhomes', ['HOA packets', 'US-250 peaks'], ['crozet'], 'Collect COI early; price portal-to-portal toward Charlottesville.'),
      z('pantops', 'Pantops multi-family & corridors', 'Pantops', ['Pantops', 'US-250 edges'], 'Multi-family, SFH', ['Building COIs', 'Arterial timing'], ['pantops'], 'Collect management packets; inventory elevators.'),
      z('mountain', 'Mountain-edge rural-suburban lots', 'Mountain edge', ['western approaches', 'mountain lots'], 'Larger lots, grades', ['Last-mile width', 'Grades', 'Empty miles'], ['albemarle mountain'], 'Photo approaches; confirm truck size early.'),
      z('rural-south', 'Rural south & larger lots', 'Rural south', ['southern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['albemarle south'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('uva-spill', 'UVA-adjacent term turnover', 'Term calendars create multi-family clusters near the city line.', ['Book early around move-in/move-out weekends.', 'Expect short-notice multi-family demand.']),
      s('mountain-last-mile', 'Mountain-edge last-mile logistics', 'Grades rewrite truck size.', ['Photo approaches before surveys finalize.', 'Shuttle conversations beat stuck trailers.']),
      s('central-va', 'I-64 / US-29 Central VA freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote NoVA multi-family rates for mountain lots.']),
    ],
    schoolsIntro:
      'Albemarle families compare Albemarle County Schools and related options — verify boundaries; university housing patterns do not replace district maps for family SFH.',
    hospitalsDetail:
      'UVA Health and regional clinics serve the market; map peak freeflow on US-29/I-64 corridors.',
    costIntro: 'Term spikes, mountain access, and empty miles often matter more than raw miles.',
    seasonalIntro: 'UVA calendars and school years reshape demand more than NoVA office peaks alone.',
  },
  {
    file: 'roanoke-tier2.ts',
    exportName: 'roanokeCountyVaTier2Intelligence',
    slug: 'roanoke',
    hubTitle: 'Roanoke County Moving Intelligence Hub',
    eyebrow: 'Roanoke County · Roanoke Valley · western VA hub edge · independent',
    h1: 'Moving in Roanoke County: Valley Suburbs, I-81 Access & Western Virginia Hub Edge',
    heroOpener:
      'Roanoke County is the western Virginia valley hub edge around the Roanoke urban core — suburban SFH belts, mountain approaches, I-81 freeflow, and product that does not answer to NoVA I-95 collars. Expect longer empty miles into the city, grades that rewrite truck size, and freeflow that is not Richmond belt defaults. This guide is for people moving in Roanoke County as valley hub-edge product — not a NoVA rename. (Independent-city Roanoke product differs; survey the actual address.)',
    heroCredibility:
      'Roanoke Valley · I-81 · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-81 · I-581 links · US-220 · US-460 · VA-419 · Electric Road corridors',
    parentLabel: 'independent western VA valley hub (vs NoVA / Richmond defaults)',
    parentHref: '/local-movers/virginia/fairfax',
    compareIntro:
      'Roanoke County is valley suburban and mountain-edge product — not NoVA multi-family density and not Richmond I-95 collars alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'NoVA crews fight Beltway peaks. Roanoke County pairs ride I-81, VA-419, and valley arterials — freer mid-day western freeflow, still peak-heavy on school and I-81 windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'NoVA mixes continuous tower and HOA collars. Roanoke County mixes suburban SFH, mountain-edge lots, and city-line multi-family — more continuous valley product, less continuous Beltway density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Mountain approaches often need smaller trucks; city-line multi-family needs building packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Roanoke County quotes often sit at secondary valley rates for driveway SFH — grades and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Roanoke County is independent western VA valley hub edge — not NoVA renamed.',
      },
    ],
    whatIntro: 'I-81 freeflow, valley suburbs, and mountain grades — not a NoVA clone.',
    whatBullets: [
      {
        title: 'I-81 freeflow is billable',
        detail: 'County ↔ city pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Mountain grades rewrite truck size',
        detail: 'Photo approaches; many lots reject full trailers.',
      },
      {
        title: 'Independent-city vs county line matters',
        detail: 'Confirm the exact locality before quoting “Roanoke” generically.',
      },
      {
        title: 'Distinct from NoVA and Richmond defaults',
        detail: 'Do not recycle I-95 collar playbooks for valley grades.',
      },
    ],
    zonesHeading: 'Roanoke County zones: south/west suburbs, Electric Road corridors, mountain edges & rural north',
    zonesIntro: 'Two to four sharp products under one valley hub-edge label.',
    zones: [
      z('south-suburbs', 'South / west suburban SFH belts', 'South/west suburbs', ['Cave Spring edges', 'suburban belts'], 'SFH, townhomes', ['HOA packets', 'Arterial timing'], ['cave spring'], 'Confirm driveway and HOA hours.'),
      z('electric', 'Electric Road / VA-419 corridors', 'Electric Road', ['VA-419 corridors', 'retail edges'], 'SFH, multi-family pockets', ['Arterial timing', 'Building COIs'], ['electric road'], 'Price portal-to-portal; collect multi-family packets.'),
      z('mountain', 'Mountain-edge lots', 'Mountain edge', ['mountain approaches'], 'Larger lots, grades', ['Last-mile width', 'Grades'], ['roanoke mountain'], 'Photo approaches; confirm truck size early.'),
      z('rural', 'Rural north & larger lots', 'Rural north', ['northern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['roanoke county rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i81', 'I-81 valley freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote NoVA multi-family rates for mountain lots.']),
      s('grades', 'Mountain-edge grade logistics', 'Grades rewrite truck size.', ['Photo approaches before final quote.', 'Shuttle conversations beat stuck trailers.']),
      s('city-line', 'County vs independent-city access', 'Locality lines change curb rules.', ['Confirm the exact address locality early.', 'City multi-story packets differ from county SFH.']),
    ],
    schoolsIntro:
      'Roanoke County families compare Roanoke County Schools feeders — verify boundaries; independent-city schools differ.',
    hospitalsDetail:
      'Carilion and regional valley systems serve the market; map peak freeflow on I-81/VA-419 corridors.',
    costIntro: 'Grades, empty miles, and I-81 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and winter ice on grades reshape demand more than NoVA office peaks alone.',
  },
  {
    file: 'montgomery-tier2.ts',
    exportName: 'montgomeryCountyVaTier2Intelligence',
    slug: 'montgomery',
    hubTitle: 'Montgomery County Moving Intelligence Hub',
    eyebrow: 'Montgomery · Blacksburg / Christiansburg · VT university · independent',
    h1: 'Moving in Montgomery County: Blacksburg, Christiansburg & Virginia Tech Term Cycles',
    heroOpener:
      'Montgomery County is the independent New River Valley university market — Blacksburg multi-story and student multi-family, Christiansburg corridors, I-81 freeflow, and product that does not answer to NoVA or Richmond defaults. Expect term-weekend spikes, longer empty miles into valley towns, and freeflow that is not Roanoke County suburban product alone. This guide is for people moving in Montgomery as VT university product — not a NoVA rename. (Export is VA-specific to avoid Ohio Montgomery name clash.)',
    heroCredibility:
      'Virginia Tech university · I-81 · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-81 · US-460 · US-11 · VA-114 · VA-8 approaches',
    parentLabel: 'independent New River Valley university market (vs NoVA / Roanoke defaults)',
    parentHref: '/local-movers/virginia/roanoke',
    compareIntro:
      'Montgomery is Blacksburg / Christiansburg VT university product — not NoVA multi-family density and not Roanoke valley suburbs alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Roanoke County crews fight valley peaks. Montgomery pairs ride I-81, US-460, and Blacksburg arterials — freer mid-day NRV freeflow, still peak-heavy on term weekends and football calendars.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Roanoke County mixes suburban SFH. Montgomery mixes Blacksburg student multi-family, Christiansburg corridors, and rural lots — more continuous university density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Student buildings need management packets; grades and narrow streets rewrite truck size near campus.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Montgomery quotes often sit at secondary university-market rates for driveway SFH — term spikes push multi-family prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Montgomery is independent VT / New River Valley university product — not NoVA or Roanoke renamed.',
      },
    ],
    whatIntro: 'VT term calendars, Blacksburg multi-story, and I-81 freeflow — not a NoVA clone.',
    whatBullets: [
      {
        title: 'Virginia Tech term calendars dominate demand spikes',
        detail: 'Move-in/move-out weekends fill crews first — book early.',
      },
      {
        title: 'Blacksburg multi-story is first-class product',
        detail: 'Stairs and curb rules need inventories different from pure SFH playbooks.',
      },
      {
        title: 'I-81 freeflow is billable',
        detail: 'Blacksburg ↔ Christiansburg pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Game-day windows tighten freeflow',
        detail: 'Price portal-to-portal around known event calendars.',
      },
    ],
    zonesHeading: 'Montgomery zones: Blacksburg campus density, Christiansburg corridors, I-81 edges & rural south',
    zonesIntro: 'Two to four sharp products under one NRV university label.',
    zones: [
      z('blacksburg', 'Blacksburg campus multi-family', 'Blacksburg', ['Blacksburg', 'campus edges'], 'Student multi-family, multi-story, SFH', ['Term clusters', 'Building COIs', 'Stairs'], ['blacksburg'], 'Book early around term calendars; collect management packets.'),
      z('christiansburg', 'Christiansburg corridors', 'Christiansburg', ['Christiansburg', 'corridor edges'], 'SFH, multi-family pockets', ['Arterial timing', 'HOA packets'], ['christiansburg'], 'Price portal-to-portal toward Blacksburg.'),
      z('i81', 'I-81 edge suburbs', 'I-81 edges', ['corridor neighborhoods'], 'SFH, townhomes', ['I-81 peaks'], ['montgomery va i-81'], 'Avoid peak I-81 windows when possible.'),
      z('rural', 'Rural south & larger lots', 'Rural south', ['southern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['montgomery va rural'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('vt-turnover', 'Virginia Tech term-start / term-end turnover', 'Term calendars create multi-family clusters.', ['Book early around move-in/move-out weekends.', 'Expect short-notice multi-family demand.']),
      s('blacksburg-city', 'Blacksburg multi-story access', 'Stairs and curb rules are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('i81-nrv', 'I-81 New River Valley freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote NoVA multi-family rates for rural NRV lots.']),
    ],
    schoolsIntro:
      'Montgomery families compare Montgomery County Schools and related options — verify boundaries; university housing patterns do not replace district maps for family SFH.',
    hospitalsDetail:
      'Carilion New River Valley and regional clinics serve the market; map peak freeflow on US-460/I-81 corridors.',
    costIntro: 'Term spikes, multi-story access, and empty miles often matter more than raw miles.',
    seasonalIntro: 'VT calendars and school years reshape demand more than NoVA office peaks alone.',
  },
  {
    file: 'frederick-tier2.ts',
    exportName: 'frederickCountyVaTier2Intelligence',
    slug: 'frederick',
    hubTitle: 'Frederick County Moving Intelligence Hub',
    eyebrow: 'Frederick · Winchester · northern Shenandoah · independent',
    h1: 'Moving in Frederick County: Winchester Hub, I-81 North Valley & Border Access',
    heroOpener:
      'Frederick County is northern Shenandoah independent product — Winchester multi-story and seat density, I-81 freeflow, WV/MD border adjacency, and product that does not answer to NoVA I-66 multi-family defaults. Expect longer empty miles into the city, industrial-edge residential, and freeflow that is not Fairfax or Loudoun product. This guide is for people moving in Frederick as Winchester north-valley product — not a NoVA rename. (VA export avoids Maryland Frederick name clash.)',
    heroCredibility:
      'I-81 north valley · Border adjacency · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-81 · US-11 · US-50 · US-522 · VA-7 approaches · VA-37',
    parentLabel: 'independent north Shenandoah valley hub (vs NoVA defaults)',
    parentHref: '/local-movers/virginia/loudoun',
    compareIntro:
      'Frederick is Winchester I-81 north-valley product — not Loudoun data-center growth and not Fairfax tower density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'NoVA crews fight I-66 and Dulles peaks. Frederick pairs ride I-81, US-11, and Winchester arterials — freer mid-day valley freeflow, still peak-heavy on school and industrial-shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Loudoun mixes continuous planned growth. Frederick mixes Winchester multi-story, industrial-edge SFH, and rural valley lots — more continuous secondary hub product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'City multi-story needs stair inventories; border hops flip jobs to FMCSA more often than pure in-county pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Frederick quotes often sit at secondary valley rates for driveway SFH — empty miles and city access still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Frederick is independent Winchester north-valley product — not NoVA renamed.',
      },
    ],
    whatIntro: 'I-81 freeflow, Winchester multi-story, and border interstate legs — not a NoVA clone.',
    whatBullets: [
      {
        title: 'I-81 freeflow is billable',
        detail: 'Winchester pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'WV / MD adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'Winchester multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Distinct from Loudoun outer-NOVA growth',
        detail: 'Do not recycle data-center corridor playbooks for valley industrial-edge days.',
      },
    ],
    zonesHeading: 'Frederick zones: Winchester core, I-81 corridors, industrial-edge residential & rural west',
    zonesIntro: 'Two to four sharp products under one north-valley label.',
    zones: [
      z('winchester', 'Winchester multi-story & seat edges', 'Winchester edges', ['Winchester edges', 'city-adjacent'], 'Multi-story, SFH, multi-unit', ['Stairs', 'Street parking'], ['winchester'], 'Inventory stairs; plan temporary no-parking; confirm city vs county line.'),
      z('i81', 'I-81 corridor suburbs', 'I-81 corridors', ['corridor neighborhoods'], 'SFH, townhomes', ['I-81 peaks', 'HOA packets'], ['frederick va i-81'], 'Price portal-to-portal; collect HOA rules.'),
      z('industrial', 'Industrial-edge residential', 'Industrial edge', ['industrial-adjacent neighborhoods'], 'SFH near industrial freeflow', ['Shift timing'], ['frederick industrial'], 'Avoid shift peaks when possible.'),
      z('rural-west', 'Rural west & larger lots', 'Rural west', ['western towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['frederick va west'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i81-north', 'I-81 north-valley freeflow', 'Regional pairs still peak hard.', ['Price portal-to-portal honestly.', 'Do not quote Loudoun multi-family rates for rural valley lots.']),
      s('border', 'WV / MD border interstate legs', 'Short-looking hops still need FMCSA.', ['Clarify destination state before deposit.', 'Verify USDOT/MC on interstate quotes.']),
      s('winchester-access', 'Winchester multi-story access', 'City stairs are first-class cost drivers.', ['Inventory floor counts.', 'Confirm city vs county curb rules.']),
    ],
    schoolsIntro:
      'Frederick families compare Frederick County Schools and related options — verify boundaries; independent-city Winchester schools differ.',
    hospitalsDetail:
      'Valley Health and regional systems serve the market; map peak freeflow on I-81 corridors.',
    costIntro: 'Empty miles, city access, and I-81 peaks often matter more than raw miles.',
    seasonalIntro: 'School years and industrial calendars reshape demand more than NoVA office peaks alone.',
  },
  {
    file: 'james-city-tier2.ts',
    exportName: 'jamesCityCountyVaTier2Intelligence',
    slug: 'james-city',
    hubTitle: 'James City County Moving Intelligence Hub',
    eyebrow: 'James City · Williamsburg area · Historic Triangle · vs York',
    h1: 'Moving in James City County: Williamsburg-Area Growth, Tourism Calendars & Historic Triangle Access',
    heroOpener:
      'James City County is the Historic Triangle residential and tourism-edge market around Williamsburg — planned SFH growth, multi-family pockets, tourism calendars that rewrite curb plans, and freeflow that is not York’s Peninsula military-edge product alone and not Newport News urban density. Expect HOA packets, longer empty miles into Peninsula cities, and seasonal peaks. This guide is for people moving in James City as Williamsburg-area county product — not a Peninsula city rename.',
    heroCredibility:
      'Historic Triangle · Tourism + residential · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-64 · VA-199 · US-60 · VA-5 · VA-31 approaches',
    parentLabel: 'York County (and independent Historic Triangle patterns)',
    parentHref: '/local-movers/virginia/york',
    compareIntro:
      'James City is Williamsburg-area tourism and planned residential product — not Yorktown/Peninsula military-edge density and not Newport News multi-story alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'York crews fight Peninsula military freeflow. James City pairs ride I-64, VA-199, and Williamsburg-area arterials — freer mid-day off base peaks, still peak-heavy on tourism weekends and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'York mixes light Peninsula suburbs. James City mixes planned SFH growth, tourism-edge multi-family, and rural lots — more continuous Historic Triangle residential product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets dominate growth villages; tourism streets can tighten curb plans uncommon on pure military-edge days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local James City quotes often sit at secondary Peninsula-edge rates for driveway SFH — tourism peaks and HOA soft costs still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'James City is Historic Triangle residential/tourism product — not York or Newport News renamed.',
      },
    ],
    whatIntro: 'Tourism calendars, planned HOAs, and I-64 freeflow — not a York or NN clone.',
    whatBullets: [
      {
        title: 'Tourism peaks rewrite curb plans',
        detail: 'Holiday and summer weekends fill streets differently than pure family Saturdays.',
      },
      {
        title: 'Planned-community HOAs dominate growth volume',
        detail: 'COI and gate lists are standard.',
      },
      {
        title: 'Distinct from York Peninsula product',
        detail: 'Williamsburg-area residential is not Yorktown military-edge alone.',
      },
      {
        title: 'I-64 freeflow is billable',
        detail: 'County ↔ Peninsula city pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
    ],
    zonesHeading: 'James City zones: planned growth villages, Williamsburg-edge multi-family, VA-5 edges & rural west',
    zonesIntro: 'Two to four sharp products under one Historic Triangle label.',
    zones: [
      z('growth', 'Planned growth villages', 'Growth villages', ['planned villages', 'HOA communities'], 'Planned SFH, townhomes', ['HOA packets', 'Cul-de-sac staging'], ['james city growth'], 'Collect COI early; weekday windows often beat Saturdays.'),
      z('williamsburg-edge', 'Williamsburg-edge multi-family', 'Williamsburg edge', ['multi-family pockets', 'tourism edges'], 'Multi-family, townhomes', ['Building COIs', 'Tourism parking'], ['williamsburg edge'], 'Collect management packets; book around tourism peaks when relevant.'),
      z('va5', 'VA-5 / corridor edges', 'VA-5 edges', ['corridor neighborhoods'], 'SFH, mixed stock', ['Arterial timing'], ['james city va-5'], 'Price portal-to-portal toward Peninsula cities.'),
      z('rural-west', 'Rural west & larger lots', 'Rural west', ['western towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['james city west'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('tourism', 'Historic Triangle tourism calendars', 'Seasonal peaks rewrite demand and curb plans.', ['Book early for peak tourism weekends.', 'Confirm access rules for tourism-edge multi-unit stock.']),
      s('hoa-growth', 'Planned HOA growth logistics', 'Master-plan rules are first-class cost drivers.', ['Gate lists early.', 'Mud weeks on new streets need flexibility.']),
      s('vs-york', 'Distinct from York Peninsula product', 'Williamsburg-area residential differs from Yorktown military-edge.', ['Do not recycle base-adjacent-only playbooks.', 'Tourism + planned HOAs are the differentiators.']),
    ],
    schoolsIntro:
      'James City families compare Williamsburg-James City Schools feeders — verify boundaries; do not assume York or Newport News maps apply.',
    hospitalsDetail:
      'Sentara and regional Peninsula systems serve the market; map peak freeflow on I-64/VA-199 corridors.',
    costIntro: 'Tourism peaks, HOA soft costs, and empty miles often matter more than raw miles.',
    seasonalIntro: 'Tourism calendars and school years reshape demand more than pure military PCS peaks alone.',
  },
  {
    file: 'york-tier2.ts',
    exportName: 'yorkCountyVaTier2Intelligence',
    slug: 'york',
    hubTitle: 'York County Moving Intelligence Hub',
    eyebrow: 'York · Yorktown / light Peninsula suburbs · vs James City',
    h1: 'Moving in York County: Yorktown, Peninsula Suburbs & I-64 Military-Edge Access',
    heroOpener:
      'York County is light Peninsula suburban and military-edge product — Yorktown approaches, planned SFH pockets, freeflow toward Newport News and Langley-adjacent patterns, and product that is not James City’s Historic Triangle tourism density and not Newport News multi-story urban stock alone. Expect HOA packets, longer empty miles into Peninsula cities, and freeflow that still peaks hard on I-64. This guide is for people moving in York as Peninsula collar product — not a James City or Newport News rename. (VA export avoids PA/SC York name clash.)',
    heroCredibility:
      'Peninsula collar · Military-edge · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-64 · US-17 · VA-134 · VA-105 · VA-199 links',
    parentLabel: 'James City County (and Newport News contrast)',
    parentHref: '/local-movers/virginia/james-city',
    compareIntro:
      'York is Yorktown / Peninsula military-edge suburban product — not James City Williamsburg tourism growth and not Newport News shipyard multi-story alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'James City crews fight tourism peaks. York pairs ride I-64, US-17, and Peninsula arterials — freer mid-day off Historic Triangle choke points, still peak-heavy on military and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'James City mixes tourism-edge multi-family. York mixes light Peninsula SFH, military-adjacent apartments, and Yorktown-edge stock — more continuous military-edge suburban product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'HOA packets appear on planned streets; military multi-family needs management packets uncommon on pure tourism SFH days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local York quotes often sit at Peninsula-collar rates for driveway SFH — multi-family access and empty miles into NN still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'York is Peninsula military-edge collar — not James City or Newport News renamed.',
      },
    ],
    whatIntro: 'Military-edge freeflow, light Peninsula HOAs, and I-64 peaks — not a James City clone.',
    whatBullets: [
      {
        title: 'I-64 freeflow is billable',
        detail: 'York ↔ Newport News pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from James City tourism product',
        detail: 'Military-edge suburbs are not Historic Triangle tourism density alone.',
      },
      {
        title: 'Distinct from Newport News urban density',
        detail: 'County SFH is not shipyard multi-story product.',
      },
      {
        title: 'Military multi-family packets matter',
        detail: 'Elevators and COIs rewrite labor hours on base-adjacent stock.',
      },
    ],
    zonesHeading: 'York zones: Yorktown edges, Peninsula planned SFH, military multi-family & rural north',
    zonesIntro: 'Two to four sharp products under one Peninsula collar label.',
    zones: [
      z('yorktown', 'Yorktown-edge residential', 'Yorktown edge', ['Yorktown edges', 'historic approaches'], 'SFH, mixed stock', ['Street width', 'Tourism peaks'], ['yorktown'], 'Photo approaches; plan smaller trucks near historic streets.'),
      z('planned', 'Peninsula planned SFH', 'Planned SFH', ['planned villages'], 'Planned SFH, townhomes', ['HOA packets'], ['york va planned'], 'Collect COI early.'),
      z('military-mf', 'Military-edge multi-family', 'Military multi-family', ['apartment corridors'], 'Apartments, multi-family', ['Building COIs', 'PCS clusters'], ['york military'], 'Collect management packets; book early around PCS windows when relevant.'),
      z('rural-north', 'Rural north & larger lots', 'Rural north', ['northern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['york va north'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('i64-peninsula', 'I-64 Peninsula freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote Newport News multi-story rates for York planned SFH.']),
      s('military-mf', 'Military-edge multi-family logistics', 'Building packets are first-class cost drivers.', ['Elevator windows early.', 'PCS windows create mid-week spikes.']),
      s('vs-neighbors', 'Distinct from James City and Newport News', 'Peninsula collar differs from tourism county and urban city.', ['Do not recycle Williamsburg tourism-only or shipyard-only playbooks.', 'Military-edge SFH mix is the differentiator.']),
    ],
    schoolsIntro:
      'York families compare York County Schools feeders — verify boundaries; do not assume James City or Newport News maps apply.',
    hospitalsDetail:
      'Riverside and regional Peninsula systems serve the market; map peak freeflow on I-64 corridors.',
    costIntro: 'Empty miles, multi-family access, and I-64 peaks often matter more than raw miles.',
    seasonalIntro: 'PCS windows and school years reshape demand more than tourism peaks alone.',
  },
  {
    file: 'newport-news-tier2.ts',
    exportName: 'newportNewsCityVaTier2Intelligence',
    slug: 'newport-news',
    hubTitle: 'Newport News Moving Intelligence Hub',
    eyebrow: 'Newport News · Peninsula independent city · shipyard / midtown · independent',
    h1: 'Moving in Newport News: Shipyard Logistics, Midtown Multi-Story & Peninsula Urban Access',
    heroOpener:
      'Newport News is an independent Peninsula city — shipyard and industrial freeflow, midtown multi-story stock, denser curb rules than York County suburbs, and product that is not Hampton’s urban fabric alone and not Norfolk southside tunnels. Expect freight elevators, street permits, industrial-shift peaks, and freeflow that still burns on I-64. This guide is for people moving in Newport News as Peninsula urban product — not a York or Hampton rename.',
    heroCredibility:
      'Peninsula independent city · Shipyard logistics · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-64 · US-60 · US-17 · Jefferson Ave · Warwick Blvd · J. Clyde Morris Blvd',
    parentLabel: 'independent Peninsula urban (vs York County / Hampton / Norfolk)',
    parentHref: '/local-movers/virginia/york',
    compareIntro:
      'Newport News is Peninsula urban multi-story and shipyard freeflow — not York light suburbs and not Hampton or Norfolk product alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'York crews fight suburban freeflow. Newport News pairs ride Jefferson, Warwick, and I-64 — denser arterial peaks, still freer mid-day than Norfolk tunnel approaches on some spines.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'York mixes planned SFH. Newport News mixes midtown multi-story, shipyard-adjacent multi-family, and older SFH — more continuous urban Peninsula product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Multi-story packets and curb permits dominate more often than pure cul-de-sac HOA days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Newport News quotes often sit at secondary urban Peninsula rates for multi-story access — elevator soft costs push premiums vs York driveways.',
      },
      {
        title: 'Role difference',
        detail:
          'Newport News is independent Peninsula urban shipyard product — not York or Hampton renamed.',
      },
    ],
    whatIntro: 'Shipyard freeflow, midtown multi-story, and Peninsula arterials — not a York clone.',
    whatBullets: [
      {
        title: 'Shipyard and industrial freeflow rewrite timing',
        detail: 'Shift windows choke some residential pairs near industrial edges.',
      },
      {
        title: 'Midtown multi-story is first-class product',
        detail: 'Elevators, stairs, and curb permits need inventories different from pure SFH playbooks.',
      },
      {
        title: 'Distinct from Hampton urban fabric',
        detail: 'Different Peninsula city product — do not recycle Hampton-only playbooks.',
      },
      {
        title: 'Distinct from Norfolk tunnel logistics',
        detail: 'Peninsula freeflow is not southside tunnel multi-story defaults.',
      },
    ],
    zonesHeading: 'Newport News zones: midtown multi-story, shipyard-edge residential, Denbigh north & southeast SFH',
    zonesIntro: 'Two to four sharp products under one Peninsula city label.',
    zones: [
      z('midtown', 'Midtown multi-story & mixed stock', 'Midtown', ['midtown', 'central neighborhoods'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Elevators', 'Street parking'], ['newport news midtown'], 'Inventory floor counts; plan temporary no-parking.'),
      z('shipyard', 'Shipyard-edge multi-family', 'Shipyard edge', ['shipyard approaches', 'industrial-adjacent'], 'Multi-family, apartments', ['Building COIs', 'Shift timing'], ['newport news shipyard'], 'Avoid shift peaks when possible; collect management packets.'),
      z('denbigh', 'Denbigh / north corridors', 'Denbigh north', ['Denbigh', 'northern corridors'], 'SFH, multi-family pockets', ['Arterial timing', 'HOA packets'], ['denbigh'], 'Price portal-to-portal; confirm multi-family packets.'),
      z('se-sfh', 'Southeast SFH belts', 'Southeast SFH', ['southeast neighborhoods'], 'SFH, townhomes', ['Driveway staging'], ['newport news se'], 'Confirm driveway access.'),
    ],
    specialized: [
      s('shipyard-freeflow', 'Shipyard industrial freeflow', 'Shift windows rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Avoid peak industrial windows when possible.']),
      s('midtown-access', 'Midtown multi-story access', 'Elevators and curb permits are first-class cost drivers.', ['Inventory floor counts.', 'Temporary no-parking often beats long carries.']),
      s('vs-peninsula', 'Distinct from York, Hampton, and Norfolk', 'Urban Peninsula product differs from county suburbs and other cities.', ['Do not recycle York HOA-only or Norfolk tunnel-only playbooks.', 'Shipyard multi-story mix is the differentiator.']),
    ],
    schoolsIntro:
      'Newport News families compare Newport News Public Schools feeders — verify boundaries; county Peninsula maps do not apply.',
    hospitalsDetail:
      'Riverside Regional and regional Peninsula systems serve the city; map peak freeflow on Jefferson/Warwick corridors.',
    costIntro: 'Multi-story access, industrial peaks, and arterial freeflow often matter more than raw miles.',
    seasonalIntro: 'Industrial calendars and school years reshape demand more than pure tourism peaks alone.',
  },
  {
    file: 'hampton-tier2.ts',
    exportName: 'hamptonCityVaTier2Intelligence',
    slug: 'hampton',
    hubTitle: 'Hampton Moving Intelligence Hub',
    eyebrow: 'Hampton · Peninsula independent city · Hampton Roads north · independent',
    h1: 'Moving in Hampton: Phoebus, Coliseum Corridors & North Hampton Roads Urban Access',
    heroOpener:
      'Hampton is an independent Peninsula city on the north Hampton Roads edge — Phoebus multi-story and water-edge stock, Coliseum multi-family corridors, denser curb rules than York County suburbs, and product that must feel distinct from Newport News shipyard freeflow and Norfolk southside tunnels. Expect elevators, street permits, bridge approaches, and freeflow that still peaks hard. This guide is for people moving in Hampton as north Hampton Roads urban product — not a Newport News or Norfolk rename.',
    heroCredibility:
      'Hampton Roads north · Urban Peninsula · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-64 · I-664 · US-60 · Mercury Blvd · VA-134 · Settlers Landing approaches',
    parentLabel: 'independent north Hampton Roads urban (vs Newport News / Norfolk / York)',
    parentHref: '/local-movers/virginia/newport-news',
    compareIntro:
      'Hampton is north Hampton Roads urban multi-story and water-edge product — not Newport News shipyard freeflow alone and not Norfolk tunnel density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Newport News crews fight Jefferson/Warwick peaks. Hampton pairs ride Mercury, I-64, and bridge approaches — different freeflow clocks, still peak-heavy on school and event windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Newport News mixes shipyard multi-family. Hampton mixes Phoebus multi-story, Coliseum multi-family, and water-edge stock — more continuous north-HR urban product with different water-edge geometry.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Multi-story packets and curb permits dominate; water-edge streets can tighten truck size more often than pure midtown NN days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Hampton quotes often sit at secondary urban Peninsula rates for multi-story access — water-edge last-mile can price above simple driveway days.',
      },
      {
        title: 'Role difference',
        detail:
          'Hampton is independent north Hampton Roads urban product — not Newport News or Norfolk renamed.',
      },
    ],
    whatIntro: 'Water-edge multi-story, Coliseum freeflow, and north-HR arterials — not a Newport News clone.',
    whatBullets: [
      {
        title: 'Distinct from Newport News shipyard product',
        detail: 'Different Peninsula city freeflow and housing mix — do not recycle shipyard-only playbooks.',
      },
      {
        title: 'Distinct from Norfolk tunnel logistics',
        detail: 'North-HR freeflow is not southside tunnel multi-story defaults.',
      },
      {
        title: 'Water-edge last-mile rewrites truck size',
        detail: 'Photo approaches; many streets reject full trailers.',
      },
      {
        title: 'Coliseum multi-family needs building packets',
        detail: 'Elevators and COIs rewrite labor hours.',
      },
    ],
    zonesHeading: 'Hampton zones: Phoebus multi-story, Coliseum multi-family, Mercury corridors & northwest SFH',
    zonesIntro: 'Two to four sharp products under one north Hampton Roads city label.',
    zones: [
      z('phoebus', 'Phoebus multi-story & water-edge', 'Phoebus', ['Phoebus', 'water-edge neighborhoods'], 'Multi-story, multi-unit, older SFH', ['Stairs', 'Street width', 'Water-edge access'], ['phoebus'], 'Photo street width; inventory stairs; plan smaller trucks when needed.'),
      z('coliseum', 'Coliseum multi-family corridors', 'Coliseum', ['Coliseum Drive edges', 'multi-family clusters'], 'Multi-family, apartments', ['Building COIs', 'Arterial timing'], ['coliseum hampton'], 'Collect management packets; elevator windows early.'),
      z('mercury', 'Mercury Blvd corridors', 'Mercury corridors', ['Mercury Blvd edges'], 'SFH, multi-family pockets', ['Arterial timing'], ['mercury blvd'], 'Price portal-to-portal; avoid peak retail windows.'),
      z('nw-sfh', 'Northwest SFH belts', 'Northwest SFH', ['northwest neighborhoods'], 'SFH, townhomes', ['Driveway staging', 'HOA packets'], ['hampton nw'], 'Confirm driveway and HOA hours.'),
    ],
    specialized: [
      s('water-edge', 'Phoebus water-edge multi-story access', 'Street width and stairs are first-class cost drivers.', ['Photo approaches before final quote.', 'Temporary no-parking often beats long carries.']),
      s('coliseum-mf', 'Coliseum multi-family logistics', 'Building packets dominate.', ['Elevator windows early.', 'Month-end competition for crews is real.']),
      s('vs-cities', 'Distinct from Newport News and Norfolk', 'North-HR urban product differs from shipyard and tunnel cities.', ['Do not recycle NN shipyard-only or Norfolk tunnel-only playbooks.', 'Water-edge + Coliseum mix is the differentiator.']),
    ],
    schoolsIntro:
      'Hampton families compare Hampton City Schools feeders — verify boundaries; county Peninsula maps do not apply.',
    hospitalsDetail:
      'Sentara CarePlex and regional systems serve the city; map peak freeflow on Mercury/I-64 corridors.',
    costIntro: 'Multi-story access, water-edge last-mile, and arterial peaks often matter more than raw miles.',
    seasonalIntro: 'School years and event calendars reshape demand more than pure industrial shift peaks alone.',
  },
  {
    file: 'fauquier-tier2.ts',
    exportName: 'fauquierCountyVaTier2Intelligence',
    slug: 'fauquier',
    hubTitle: 'Fauquier County Moving Intelligence Hub',
    eyebrow: 'Fauquier · Warrenton · outer NOVA / hunt-country edge · vs Prince William',
    h1: 'Moving in Fauquier County: Warrenton Seat, Hunt-Country Lots & US-17 / I-66 Outer Access',
    heroOpener:
      'Fauquier County is outer Northern Virginia and hunt-country edge product — Warrenton multi-story and seat stock, lower-density rural-suburban lots, US-17 / I-66 approaches, and freeflow that is not Prince William’s continuous I-95 multi-family density and not Loudoun data-center growth alone. Expect longer empty miles into NoVA cores, HOA pockets on growth edges, and last-mile that rejects full trailers on many farms and estates. This guide is for people moving in Fauquier as outer-NOVA lower-density product — not a Prince William rename.',
    heroCredibility:
      'Outer NOVA · Hunt-country edge · Virginia DMV household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-66 · US-17 · US-29 · US-15 · US-211 · VA-28 approaches',
    parentLabel: 'Prince William County (and Loudoun outer patterns)',
    parentHref: '/local-movers/virginia/prince-william',
    compareIntro:
      'Fauquier is Warrenton / hunt-country outer-NOVA product — not PW Woodbridge multi-family density and not Loudoun continuous planned growth alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Prince William crews fight I-95/VA-234 peaks. Fauquier pairs ride US-17, I-66, and Warrenton arterials — freer mid-day further west, still peak-heavy on commute windows into NoVA.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Prince William mixes continuous multi-family collars. Fauquier mixes Warrenton multi-story, hunt-country large lots, and light growth HOAs — more continuous lower-density product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Large-lot and estate approaches often need smaller trucks or long carries; growth HOAs need COI packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Fauquier quotes often sit at outer-NOVA rates for driveway SFH — empty miles into NoVA and long last-mile still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Fauquier is outer-NOVA hunt-country edge — not Prince William renamed.',
      },
    ],
    whatIntro: 'US-17 freeflow, hunt-country last-mile, and outer empty miles — not a PW clone.',
    whatBullets: [
      {
        title: 'US-17 / I-66 freeflow is billable',
        detail: 'Warrenton ↔ NoVA pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Hunt-country last-mile rewrites truck size',
        detail: 'Photo approaches; many estates reject full trailers.',
      },
      {
        title: 'Distinct from Prince William multi-family density',
        detail: 'Lower-density outer product is not Woodbridge apartment corridors.',
      },
      {
        title: 'Distinct from Loudoun continuous growth',
        detail: 'Do not recycle data-center corridor playbooks for hunt-country lots.',
      },
    ],
    zonesHeading: 'Fauquier zones: Warrenton seat, US-17 growth edge, hunt-country lots & rural south',
    zonesIntro: 'Two to four sharp products under one outer-NOVA label.',
    zones: [
      z('warrenton', 'Warrenton multi-story & seat', 'Warrenton', ['Warrenton', 'seat neighborhoods'], 'Multi-story, SFH, mixed stock', ['Stairs', 'Street parking'], ['warrenton'], 'Inventory stairs; plan temporary no-parking.'),
      z('us17', 'US-17 growth edge villages', 'US-17 edge', ['growth villages', 'corridor edges'], 'Planned SFH, townhomes', ['HOA packets', 'US-17 peaks'], ['fauquier us-17'], 'Collect COI early; price portal-to-portal toward NoVA.'),
      z('hunt', 'Hunt-country large lots', 'Hunt country', ['estate roads', 'large lots'], 'Large lots, estate approaches', ['Last-mile width', 'Long carries', 'Empty miles'], ['fauquier hunt'], 'Photo approaches; confirm truck size early.'),
      z('rural-south', 'Rural south & larger lots', 'Rural south', ['southern towns', 'larger lots'], 'Larger lots, rural approaches', ['Empty miles', 'Soft shoulders'], ['fauquier south'], 'Photo last-mile; rain weeks need flexibility.'),
    ],
    specialized: [
      s('outer-nova', 'US-17 / I-66 outer-NOVA freeflow', 'Commute peaks rewrite short-looking pairs.', ['Price portal-to-portal honestly.', 'Do not quote PW multi-family rates for hunt-country estates.']),
      s('hunt-last-mile', 'Hunt-country last-mile logistics', 'Long drives rewrite truck size.', ['Photo approaches before final quote.', 'Shuttle conversations beat stuck trailers.']),
      s('vs-pw', 'Distinct from Prince William density', 'Outer lower-density product differs from I-95 multi-family collars.', ['Do not recycle Woodbridge-only playbooks.', 'Warrenton + hunt-country mix is the differentiator.']),
    ],
    schoolsIntro:
      'Fauquier families compare Fauquier County Schools feeders across Warrenton and growth edges — verify boundaries; do not assume Prince William maps apply.',
    hospitalsDetail:
      'Fauquier Health and regional NoVA systems serve the market; map peak freeflow on US-17/I-66 corridors.',
    costIntro: 'Empty miles, long last-mile, and outer freeflow peaks often matter more than raw miles.',
    seasonalIntro: 'School years and summer family closings reshape demand more than pure NoVA office peaks alone.',
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
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** ${p.slug} — VA Tier 2 Wave 1 */
export const ${p.exportName}: CountyIntelligencePack = finalizeVaTier2Pack({
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
    title: 'What makes moving in ${esc(p.hubTitle.replace(' Moving Intelligence Hub$', '').replace(' Moving Intelligence Hub', ''))} different',
    intro: '${esc(p.whatIntro)}',
    bullets: [
${what},
      VA_TIER2_REG_BULLET,
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
              'Use Virginia DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
      { title: 'Institutional calendars', detail: 'Term, PCS, or tourism windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: '${esc(p.parentLabel)} movers (parent contrast)', href: '${p.parentHref}' },
    ],
  },
});
`;
}

const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/virginia');
for (const p of packs) {
  writeFileSync(join(outDir, p.file), render(p), 'utf8');
  console.log('wrote', p.file);
}
console.log('Generated', packs.length, 'VA Tier 2 Wave 1 packs');
