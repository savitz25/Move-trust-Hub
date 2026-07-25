/**
 * Generate NY Tier 2 Wave 2 county intelligence packs.
 * Run: npx tsx scripts/generate-ny-tier2-wave2.ts
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

const packs: PackDef[] = [
  {
    file: 'tompkins-ny.ts',
    exportName: 'tompkinsCountyTier2Intelligence',
    slug: 'tompkins',
    hubTitle: 'Tompkins County Moving Intelligence Hub',
    eyebrow: 'Tompkins · Ithaca university · Finger Lakes independent',
    h1: 'Moving in Tompkins County: Ithaca University Hub, Cascadilla Density & Finger Lakes Access',
    heroOpener:
      'Tompkins County is an independent Finger Lakes university market — Ithaca multi-story hills and student density, Cornell and Ithaca College calendars, Lansing and Dryden suburban edges, and gorge/lake last-mile that rejects full trailers. It is not Broome’s Binghamton Southern Tier and not Onondaga’s Syracuse core: expect steeper city grades, continuous student multi-family product, and Finger Lakes freeflow that still peaks hard on term weekends. This guide is for people moving in Tompkins as a university independent market — not a recycled Broome or Central NY pack.',
    heroCredibility:
      'Ithaca university hub · Finger Lakes independent · Hill multi-story · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'NY-13 · NY-79 · NY-96 · NY-34 · NY-89 · I-81 (regional approaches)',
    parentLabel: 'independent Finger Lakes university hub (vs Broome / Onondaga defaults)',
    parentHref: '/local-movers/new-york/broome',
    compareIntro:
      'Tompkins is an independent Ithaca university / Finger Lakes market — not Binghamton Southern Tier density and not Syracuse Central NY freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Broome crews fight I-81 / NY-17 Triple Cities peaks. Tompkins pairs ride NY-13, NY-79, NY-96, and hill arterials into Ithaca — freer mid-day on rural approaches, still peak-heavy on campus move weekends and gorge-side one-ways.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Broome mixes Binghamton multi-story and Vestal SFH. Tompkins mixes Ithaca hill walk-ups, student multi-family, and outer-town larger lots — more continuous university density, less Southern Tier triple-city corridor product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Ithaca grades, narrow streets, and multi-story stairs need shuttle conversations more often than Vestal driveways; rural edges add empty miles uncommon on inner campus jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Tompkins quotes often sit at secondary university-market rates for simple SFH — hill access, elevators, and term spikes push prices up vs quiet Finger Lakes driveway days.',
      },
      {
        title: 'Role difference',
        detail:
          'Tompkins is Ithaca university independent Finger Lakes product — not Broome Southern Tier renamed and not Onondaga Syracuse core.',
      },
    ],
    whatIntro:
      'University calendars, hill multi-story stock, and Finger Lakes freeflow — not interchangeable Broome or Syracuse boilerplate.',
    whatBullets: [
      {
        title: 'Cornell / Ithaca College calendars drive demand spikes',
        detail:
          'Term start/end weekends fill local crews first — not only family Saturdays.',
      },
      {
        title: 'Hill multi-story is first-class product',
        detail:
          'Stairs, grades, and tight village streets need inventories different from pure suburban playbooks.',
      },
      {
        title: 'Gorge and lake edges rewrite truck size',
        detail:
          'Many approaches reject full trailers; photo last-mile before the survey is final.',
      },
      {
        title: 'Regional freeflow is still billable',
        detail:
          'Ithaca ↔ Lansing or Dryden pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
    ],
    zonesHeading: 'Tompkins zones: Ithaca core, campus density, outer suburbs & rural Finger Lakes edges',
    zonesIntro:
      'Two to four sharp products — city hills, campus multi-family, outer SFH, and rural lake edges price differently under one university-county label.',
    zones: [
      {
        id: 'ithaca-core',
        name: 'Ithaca city core & hills',
        shortName: 'Ithaca core',
        neighborhoods: ['Ithaca', 'downtown', 'South Hill edges', 'Fall Creek'],
        housingTypes: 'Multi-story, walk-ups, older SFH on grades',
        challenges: ['Stairs', 'Hills', 'Street parking', 'One-ways'],
        keywords: ['ithaca', 'fall creek', 'south hill'],
        moverTips:
          'Inventory floor counts and hill approaches; plan temporary no-parking early.',
      },
      {
        id: 'campus-density',
        name: 'Campus / student multi-family',
        shortName: 'Campus density',
        neighborhoods: ['Cornell edges', 'Collegetown', 'Ithaca College approaches'],
        housingTypes: 'Student multi-family, apartments, elevators',
        challenges: ['Lease-end clusters', 'Building COIs', 'Elevator windows'],
        keywords: ['collegetown', 'cornell', 'ithaca college'],
        moverTips:
          'Book early around term calendars; collect management packets before surveys finalize.',
      },
      {
        id: 'outer-suburbs',
        name: 'Lansing / Dryden outer suburbs',
        shortName: 'Outer suburbs',
        neighborhoods: ['Lansing', 'Dryden', 'Cayuga Heights edges'],
        housingTypes: 'SFH, townhomes, some multi-family',
        challenges: ['Cul-de-sac staging', 'Commute peaks toward Ithaca'],
        keywords: ['lansing', 'dryden', 'cayuga heights'],
        moverTips: 'Confirm driveway length and HOA hours on planned streets.',
      },
      {
        id: 'rural-edges',
        name: 'Rural Finger Lakes edges',
        shortName: 'Rural edges',
        neighborhoods: ['Trumansburg edges', 'Newfield', 'Groton edges'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Soft shoulders', 'Winter ice'],
        keywords: ['trumansburg', 'newfield', 'groton'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
      },
    ],
    specialized: [
      {
        id: 'university-turnover',
        title: 'University-adjacent turnover',
        intro: 'Cornell and Ithaca College calendars create lease clusters.',
        bullets: [
          'Book early around term start/end weekends.',
          'Expect short-notice local demand spikes in campus multi-family.',
        ],
      },
      {
        id: 'hill-access',
        title: 'Ithaca hill multi-story & grades',
        intro: 'City stairs and grades are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and hill approaches.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'finger-lakes-freeflow',
        title: 'Finger Lakes freeflow & empty miles',
        intro: 'Outer-town pairs freer mid-day still peak hard toward Ithaca.',
        bullets: [
          'Price portal-to-portal time honestly.',
          'Photo rural last-mile before locking truck size.',
        ],
      },
    ],
    schoolsIntro:
      'Tompkins families compare Ithaca City, Lansing, Dryden, Trumansburg, and other districts — verify boundaries; university calendars affect housing near campus.',
    hospitalsDetail:
      'Cayuga Medical Center and regional clinics anchor acute care; map peak freeflow across Ithaca hills, not only off-hour freeflow.',
    costIntro:
      'University peaks, hill stairs, and empty-mile edges often matter more than raw miles.',
    seasonalIntro:
      'Term calendars, graduation weekends, and winter ice on grades reshape demand more than Capital Region or NYC patterns.',
  },
  {
    file: 'chemung-ny.ts',
    exportName: 'chemungCountyTier2Intelligence',
    slug: 'chemung',
    hubTitle: 'Chemung County Moving Intelligence Hub',
    eyebrow: 'Chemung · Elmira Southern Tier · vs Broome',
    h1: 'Moving in Chemung County: Elmira Southern Tier, Horseheads Corridors & NY-17 Access',
    heroOpener:
      'Chemung County is Southern Tier product west of Broome — Elmira multi-story and river-city stock, Horseheads retail and suburban corridors, Big Flats approaches, and NY-17 / I-86 freeflow that is not a Binghamton University rename. Expect smaller city density than Broome’s Triple Cities stack, more continuous Horseheads growth product, and longer empty miles to rural Chemung edges. This guide is for people moving in Chemung as Elmira Southern Tier — not Broome with different labels.',
    heroCredibility:
      'Elmira Southern Tier · Horseheads corridors · NY-17 / I-86 · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-86 · NY-17 · NY-14 · NY-13 · NY-352 · US-220 approaches',
    parentLabel: 'Broome County',
    parentHref: '/local-movers/new-york/broome',
    compareIntro:
      'Chemung is Elmira / Horseheads Southern Tier — not Binghamton university multi-story and not Vestal term-calendar density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Broome crews fight I-81 Binghamton peaks and university weekends. Chemung pairs ride I-86 / NY-17, NY-14, and Horseheads arterials — freer mid-day Southern Tier freeflow, still peak-heavy on Elmira city pairs and retail corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Broome mixes Binghamton multi-story, Vestal student multi-family, and Endicott corridors. Chemung mixes Elmira multi-story, Horseheads SFH/growth, and Big Flats edges — less continuous university product, more mid-size Southern Tier city + suburb ladder.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Elmira hills and older multi-story need stair inventories; Horseheads often means driveway staging — not a pure Vestal lease-cluster day.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Chemung quotes often sit near or slightly below Broome university-peak rates for simple SFH — city access friction and empty-mile edges still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Chemung is Elmira Southern Tier regional product — not Broome Binghamton University hub renamed.',
      },
    ],
    whatIntro:
      'Elmira city stock, Horseheads freeflow, and Southern Tier empty miles — not a Broome clone.',
    whatBullets: [
      {
        title: 'Elmira multi-story is first-class product',
        detail:
          'Stairs, hills, and tight streets need inventories different from Horseheads cul-de-sacs.',
      },
      {
        title: 'Horseheads corridors still peak',
        detail:
          'Retail and commute windows inflate short-looking local pairs. Ask portal-to-portal.',
      },
      {
        title: 'I-86 / NY-17 freeflow is billable',
        detail:
          'Cross-county Southern Tier pairs freer mid-day still burn time at peaks.',
      },
      {
        title: 'PA adjacency creates interstate legs',
        detail:
          'Pennsylvania addresses require FMCSA authority even on short-looking hops.',
      },
    ],
    zonesHeading: 'Chemung zones: Elmira core, Horseheads belt, Big Flats edges & rural south/west',
    zonesIntro:
      'Two to four sharp products — city, growth suburb, airport-edge corridors, and rural edges.',
    zones: [
      {
        id: 'elmira-core',
        name: 'Elmira city core',
        shortName: 'Elmira',
        neighborhoods: ['Elmira', 'downtown', 'southside edges'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Hills', 'Street parking'],
        keywords: ['elmira'],
        moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
      },
      {
        id: 'horseheads',
        name: 'Horseheads suburban & retail corridors',
        shortName: 'Horseheads',
        neighborhoods: ['Horseheads', 'retail corridor edges'],
        housingTypes: 'SFH, townhomes, some multi-family',
        challenges: ['Arterial timing', 'Cul-de-sac staging'],
        keywords: ['horseheads'],
        moverTips: 'Avoid peak retail windows when possible; confirm driveway access.',
      },
      {
        id: 'big-flats',
        name: 'Big Flats corridor edges',
        shortName: 'Big Flats',
        neighborhoods: ['Big Flats', 'airport approaches'],
        housingTypes: 'SFH, mixed commercial-adjacent',
        challenges: ['Corridor freeflow', 'Longer local pairs'],
        keywords: ['big flats'],
        moverTips: 'Price portal-to-portal on Elmira ↔ Big Flats pairs.',
      },
      {
        id: 'rural-edges',
        name: 'Rural Chemung edges',
        shortName: 'Rural edges',
        neighborhoods: ['Southport edges', 'Erin', 'Van Etten edges'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice'],
        keywords: ['southport', 'erin', 'van etten'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
      },
    ],
    specialized: [
      {
        id: 'elmira-city',
        title: 'Elmira multi-story & hills',
        intro: 'City stairs and grades are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and hill approaches.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'horseheads-corridors',
        title: 'Horseheads retail & suburban freeflow',
        intro: 'Growth corridors still peak hard.',
        bullets: [
          'Price portal-to-portal time honestly.',
          'Confirm HOA hours on planned streets.',
        ],
      },
      {
        id: 'southern-tier-spine',
        title: 'I-86 / NY-17 Southern Tier spine',
        intro: 'Cross-valley pairs still peak hard.',
        bullets: [
          'Clarify PA second addresses for interstate authority.',
          'Do not quote Broome university rates for Elmira driveway days.',
        ],
      },
    ],
    schoolsIntro:
      'Chemung families compare Elmira City, Horseheads, Elmira Heights, and other districts — verify boundaries; do not assume Broome feeder patterns apply.',
    hospitalsDetail:
      'Arnot Health and regional campuses anchor acute care; map peak freeflow across Elmira–Horseheads, not only off-hour freeflow.',
    costIntro:
      'City access, corridor peaks, and empty-mile edges often matter more than raw miles.',
    seasonalIntro:
      'School years, winter ice on city hills, and Southern Tier weather reshape demand more than university-term Broome spikes alone.',
  },
  {
    file: 'jefferson-ny.ts',
    exportName: 'jeffersonCountyTier2Intelligence',
    slug: 'jefferson',
    hubTitle: 'Jefferson County Moving Intelligence Hub',
    eyebrow: 'Jefferson · Watertown / Fort Drum · military-regional independent',
    h1: 'Moving in Jefferson County: Watertown, Fort Drum PCS & North Country Access',
    heroOpener:
      'Jefferson County is a military-regional independent market — Watertown multi-story and seat density, Fort Drum PCS calendars, lake-edge and rural North Country approaches, and I-81 freeflow that does not answer to Syracuse scripts alone. Expect orders-driven demand spikes, base-adjacent multi-family turnover, and winter last-mile that rejects soft schedules. This guide is for people moving in Jefferson as Watertown / Fort Drum product — not Onondaga with different labels and not a pure tourist Adirondack pack.',
    heroCredibility:
      'Fort Drum PCS · Watertown hub · North Country freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-81 · NY-3 · NY-12 · NY-11 · NY-342 · NY-37 approaches',
    parentLabel: 'independent military-regional (vs Onondaga / Central NY defaults)',
    parentHref: '/local-movers/new-york/onondaga',
    compareIntro:
      'Jefferson is Watertown / Fort Drum military-regional product — not Syracuse university multi-family and not Capital Region freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Onondaga crews fight Syracuse peaks and I-81 city approaches. Jefferson pairs ride I-81 north, NY-3, NY-12, and Fort Drum approaches — freer mid-day North Country freeflow, still peak-heavy on PCS windows and Watertown arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Onondaga mixes university multi-family and suburbs. Jefferson mixes Watertown multi-story, base-adjacent apartments, and rural North Country lots — more PCS turnover product, less continuous Syracuse college density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Base-adjacent multi-family needs management packets; rural and lake edges add empty miles and winter ice uncommon on inner Syracuse jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Jefferson quotes often track secondary North Country rates for driveway SFH — PCS spikes and multi-family access push prices up on peak order weeks.',
      },
      {
        title: 'Role difference',
        detail:
          'Jefferson is Fort Drum military-regional independent — not Onondaga Central NY renamed.',
      },
    ],
    whatIntro:
      'PCS calendars, Watertown multi-story, and North Country winter access — not interchangeable Syracuse boilerplate.',
    whatBullets: [
      {
        title: 'Fort Drum PCS windows rewrite demand',
        detail:
          'Order cycles fill local crews first — not only family Saturdays. Book early on peak PCS months.',
      },
      {
        title: 'Base-adjacent multi-family is first-class product',
        detail:
          'Elevators, long carries, and building packets need inventories different from pure rural playbooks.',
      },
      {
        title: 'Winter North Country access is operational',
        detail:
          'Ice, wind, and rural approaches need flexible morning plans and honest truck-size conversations.',
      },
      {
        title: 'I-81 freeflow is still billable',
        detail:
          'Watertown ↔ base or rural pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
    ],
    zonesHeading: 'Jefferson zones: Watertown core, Fort Drum adjacent, lake edges & rural North Country',
    zonesIntro:
      'Two to four sharp products — city, base multi-family, lake approaches, and rural edges.',
    zones: [
      {
        id: 'watertown-core',
        name: 'Watertown city core',
        shortName: 'Watertown',
        neighborhoods: ['Watertown', 'downtown', 'city neighborhoods'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'Winter ice'],
        keywords: ['watertown'],
        moverTips: 'Inventory stairs; plan temporary no-parking; winter mornings need flexibility.',
      },
      {
        id: 'fort-drum-adjacent',
        name: 'Fort Drum adjacent multi-family',
        shortName: 'Fort Drum adjacent',
        neighborhoods: ['Fort Drum approaches', 'Calcium edges', 'base housing corridors'],
        housingTypes: 'Apartments, multi-family, military-adjacent leases',
        challenges: ['PCS clusters', 'Building COIs', 'Gate/timing constraints'],
        keywords: ['fort drum', 'calcium'],
        moverTips:
          'Align to PCS windows; collect management packets; confirm any base access rules early.',
      },
      {
        id: 'lake-edges',
        name: 'Lake Ontario / Thousand Islands edges',
        shortName: 'Lake edges',
        neighborhoods: ['Sackets Harbor edges', 'Clayton approaches', 'lake towns'],
        housingTypes: 'Seasonal homes, SFH, some multi-unit',
        challenges: ['Seasonal roads', 'Tourism peaks', 'Last-mile width'],
        keywords: ['sackets harbor', 'clayton'],
        moverTips: 'Photo approaches; plan around summer tourism where relevant.',
      },
      {
        id: 'rural-nc',
        name: 'Rural North Country edges',
        shortName: 'Rural edges',
        neighborhoods: ['Adams', 'Carthage edges', 'northern towns'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice', 'Soft shoulders'],
        keywords: ['adams', 'carthage'],
        moverTips: 'Photo last-mile; allow winter buffer time.',
      },
    ],
    specialized: [
      {
        id: 'pcs-turnover',
        title: 'Fort Drum PCS & military-adjacent turnover',
        intro: 'Order calendars create demand spikes and multi-family clusters.',
        bullets: [
          'Book early around peak PCS months.',
          'Collect building packets and elevator windows before surveys finalize.',
        ],
      },
      {
        id: 'watertown-city',
        title: 'Watertown multi-story & winter access',
        intro: 'City stairs and ice are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and street width.',
          'Winter mornings need flexible start times.',
        ],
      },
      {
        id: 'north-country-freeflow',
        title: 'I-81 North Country freeflow',
        intro: 'Longer empty miles still peak hard on local pairs.',
        bullets: [
          'Price portal-to-portal time honestly.',
          'Clarify interstate legs for Canadian-border and out-of-state destinations.',
        ],
      },
    ],
    schoolsIntro:
      'Jefferson families compare Watertown City, Indian River, General Brown, and other districts — verify boundaries; PCS households should re-check enrollment timing.',
    hospitalsDetail:
      'Samaritan Medical Center and regional clinics anchor acute care; map peak freeflow across Watertown–Fort Drum approaches.',
    costIntro:
      'PCS spikes, multi-family access, and winter empty miles often matter more than raw miles.',
    seasonalIntro:
      'PCS windows, school years, and harsh North Country winter reshape demand more than Syracuse university calendars alone.',
  },
  {
    file: 'chautauqua-ny.ts',
    exportName: 'chautauquaCountyTier2Intelligence',
    slug: 'chautauqua',
    hubTitle: 'Chautauqua County Moving Intelligence Hub',
    eyebrow: 'Chautauqua · Jamestown western NY · vs Erie',
    h1: 'Moving in Chautauqua County: Jamestown, Lake Corridor & Western NY Access',
    heroOpener:
      'Chautauqua County is western New York south of Buffalo — Jamestown multi-story and seat density, Dunkirk and Fredonia lake/college edges, Chautauqua Institution seasonal product, and I-86 / NY-60 freeflow that is not an Erie County rename. Expect longer empty miles from Buffalo cores, lake-effect winter access, and tourism calendars that rewrite village staging. This guide is for people moving in Chautauqua as Jamestown western NY product — not Buffalo suburbs with different labels.',
    heroCredibility:
      'Jamestown western NY · Lake corridor · I-86 freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-86 · I-90 (north edge) · NY-60 · NY-5 · NY-394 · NY-430',
    parentLabel: 'Erie County',
    parentHref: '/local-movers/new-york/erie',
    compareIntro:
      'Chautauqua is Jamestown / lake-corridor western NY — not Buffalo multi-story cores and not Amherst suburban freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Erie crews fight Buffalo peaks and I-90/I-190 city approaches. Chautauqua pairs ride I-86, NY-60, and lake corridors — freer mid-day southern freeflow, still peak-heavy on Jamestown arterials and seasonal institution weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Erie mixes Buffalo multi-story and first-ring suburbs. Chautauqua mixes Jamestown multi-story, Fredonia college stock, Dunkirk lake edges, and rural lots — more continuous secondary-city product, less Buffalo elevator density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Jamestown hills and older multi-story need stair inventories; lake and institution villages often need smaller trucks and seasonal curb plans.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Chautauqua quotes often sit below Buffalo core rates for simple SFH — empty miles from regional crews and winter access still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Chautauqua is western NY secondary hub and lake corridor — not Erie Buffalo metro renamed.',
      },
    ],
    whatIntro:
      'Jamestown density, lake-effect winter, and seasonal institution calendars — not a Buffalo clone.',
    whatBullets: [
      {
        title: 'Jamestown multi-story is first-class product',
        detail:
          'Stairs and grades need inventories different from pure rural driveway playbooks.',
      },
      {
        title: 'Lake-effect winter rewrites schedules',
        detail:
          'I-86 and lake approaches need ice-aware morning plans more often than southern counties.',
      },
      {
        title: 'Institution / tourism peaks tighten village staging',
        detail:
          'Summer Chautauqua Institution and lake weekends change curb plans — book early.',
      },
      {
        title: 'PA and OH adjacency create interstate legs',
        detail:
          'Short-looking border hops still need FMCSA authority.',
      },
    ],
    zonesHeading: 'Chautauqua zones: Jamestown core, Dunkirk/Fredonia lake edge, Chautauqua Institution & rural south',
    zonesIntro:
      'Two to four sharp products — city, lake college edge, seasonal institution, and rural lots.',
    zones: [
      {
        id: 'jamestown-core',
        name: 'Jamestown city core',
        shortName: 'Jamestown',
        neighborhoods: ['Jamestown', 'downtown', 'city neighborhoods'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Hills', 'Street parking'],
        keywords: ['jamestown'],
        moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
      },
      {
        id: 'dunkirk-fredonia',
        name: 'Dunkirk / Fredonia lake & college edge',
        shortName: 'Dunkirk / Fredonia',
        neighborhoods: ['Dunkirk', 'Fredonia', 'lake approaches'],
        housingTypes: 'SFH, college multi-family, lake stock',
        challenges: ['Term calendars', 'Lake wind/ice', 'Street width'],
        keywords: ['dunkirk', 'fredonia'],
        moverTips: 'Book early around college calendars; photo lake approaches in winter.',
      },
      {
        id: 'chautauqua-inst',
        name: 'Chautauqua Institution & lake villages',
        shortName: 'Institution / lake villages',
        neighborhoods: ['Chautauqua', 'Mayville edges', 'lake villages'],
        housingTypes: 'Seasonal homes, cottages, village SFH',
        challenges: ['Seasonal access', 'Tourism parking', 'Narrow streets'],
        keywords: ['chautauqua', 'mayville'],
        moverTips: 'Plan summer curb carefully; off-season may freer but colder.',
      },
      {
        id: 'rural-south',
        name: 'Rural south & larger lots',
        shortName: 'Rural edges',
        neighborhoods: ['Clymer edges', 'Sherman', 'southern towns'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice'],
        keywords: ['clymer', 'sherman'],
        moverTips: 'Photo last-mile; allow winter buffer.',
      },
    ],
    specialized: [
      {
        id: 'jamestown-city',
        title: 'Jamestown multi-story & hills',
        intro: 'City stairs and grades are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and approaches.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'lake-college',
        title: 'Fredonia college & Dunkirk lake edge',
        intro: 'Term calendars and lake weather rewrite local pairs.',
        bullets: [
          'Book early around term start/end.',
          'Winter lake approaches need flexible mornings.',
        ],
      },
      {
        id: 'seasonal-institution',
        title: 'Chautauqua Institution seasonal product',
        intro: 'Summer tourism changes village staging.',
        bullets: [
          'Confirm curb and access rules for seasonal properties.',
          'Do not price as pure Jamestown driveway days.',
        ],
      },
    ],
    schoolsIntro:
      'Chautauqua families compare Jamestown, Dunkirk, Fredonia, Southwestern, and other districts — verify boundaries; lake and rural feeders differ.',
    hospitalsDetail:
      'UPMC Chautauqua and regional campuses anchor acute care; map peak freeflow across Jamestown–lake corridors.',
    costIntro:
      'City access, lake winter, and seasonal peaks often matter more than raw miles.',
    seasonalIntro:
      'Lake-effect winter, institution summers, and college calendars reshape demand more than Buffalo office peaks alone.',
  },
  {
    file: 'clinton-ny.ts',
    exportName: 'clintonCountyTier2Intelligence',
    slug: 'clinton',
    hubTitle: 'Clinton County Moving Intelligence Hub',
    eyebrow: 'Clinton · Plattsburgh North Country · independent',
    h1: 'Moving in Clinton County: Plattsburgh North Country, Lake Champlain Edge & I-87 Access',
    heroOpener:
      'Clinton County is North Country independent product — Plattsburgh multi-story and seat density, Lake Champlain edges, college and former-base corridor stock, and I-87 freeflow that does not answer to Capital Region scripts. Expect long empty miles from Albany/Saratoga, border-adjacent interstate legs, and winter access that rejects soft schedules. This guide is for people moving in Clinton as Plattsburgh North Country — not Saratoga growth suburbs renamed and not Adirondack tourism alone.',
    heroCredibility:
      'Plattsburgh North Country · Lake Champlain · I-87 north · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-87 · NY-3 · NY-9 · NY-22 · NY-374 · NY-190',
    parentLabel: 'independent North Country (vs Saratoga / Albany defaults)',
    parentHref: '/local-movers/new-york/saratoga',
    compareIntro:
      'Clinton is Plattsburgh North Country independent — not Saratoga Springs tourism growth and not Albany government-core freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Saratoga crews fight Northway peaks toward Albany. Clinton pairs ride I-87 far north, NY-3, and NY-22 — freer mid-day North Country freeflow, still peak-heavy on Plattsburgh arterials and long-haul empty miles for out-of-area crews.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Saratoga mixes tourism village density and Clifton Park HOAs. Clinton mixes Plattsburgh multi-story, lake-edge SFH, and rural North Country lots — more continuous secondary-city product, less Capital-collar planned suburbs.',
      },
      {
        title: 'Truck access & density',
        detail:
          'City multi-story needs stair inventories; lake and rural edges add winter ice and long approaches uncommon on Clifton Park jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Clinton quotes often track secondary North Country rates — long deadhead for regional crews and winter access push premiums vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Clinton is Plattsburgh North Country independent — not Saratoga Capital-collar growth renamed.',
      },
    ],
    whatIntro:
      'North Country freeflow, lake-edge winter, and border adjacency — not Capital Region boilerplate.',
    whatBullets: [
      {
        title: 'Plattsburgh multi-story is first-class product',
        detail:
          'Stairs and street parking need inventories different from pure rural playbooks.',
      },
      {
        title: 'Long empty miles are operational',
        detail:
          'Regional crews price deadhead honestly; local pairs still peak on city arterials.',
      },
      {
        title: 'VT / Quebec adjacency creates interstate legs',
        detail:
          'Short-looking border hops need FMCSA authority and customs-aware planning when applicable.',
      },
      {
        title: 'Winter North Country access rewrites mornings',
        detail:
          'Ice and wind need flexible start times more often than mid-Hudson winters.',
      },
    ],
    zonesHeading: 'Clinton zones: Plattsburgh core, lake edge, former-base corridors & rural North Country',
    zonesIntro:
      'Two to four sharp products — city, lake, corridor multi-family, and rural edges.',
    zones: [
      {
        id: 'plattsburgh-core',
        name: 'Plattsburgh city core',
        shortName: 'Plattsburgh',
        neighborhoods: ['Plattsburgh', 'downtown', 'city neighborhoods'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'Winter ice'],
        keywords: ['plattsburgh'],
        moverTips: 'Inventory stairs; plan temporary no-parking; winter flexibility required.',
      },
      {
        id: 'lake-edge',
        name: 'Lake Champlain edge towns',
        shortName: 'Lake edge',
        neighborhoods: ['lake approaches', 'Rouses Point edges', 'Champlain towns'],
        housingTypes: 'SFH, seasonal stock, some multi-unit',
        challenges: ['Wind/ice', 'Seasonal roads', 'Border-adjacent freeflow'],
        keywords: ['rouses point', 'champlain'],
        moverTips: 'Photo approaches; clarify interstate/border legs early.',
      },
      {
        id: 'corridor-stock',
        name: 'Former-base & corridor multi-family',
        shortName: 'Corridor multi-family',
        neighborhoods: ['base corridor edges', 'apartment clusters'],
        housingTypes: 'Apartments, multi-family, mixed SFH',
        challenges: ['Building COIs', 'Lease clusters'],
        keywords: ['plattsburgh base'],
        moverTips: 'Collect management packets; inventory elevators and long carries.',
      },
      {
        id: 'rural-nc',
        name: 'Rural North Country edges',
        shortName: 'Rural edges',
        neighborhoods: ['Dannemora edges', 'Saranac edges', 'western towns'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice', 'Soft shoulders'],
        keywords: ['dannemora', 'saranac'],
        moverTips: 'Photo last-mile; allow winter buffer.',
      },
    ],
    specialized: [
      {
        id: 'plattsburgh-city',
        title: 'Plattsburgh multi-story & winter access',
        intro: 'City stairs and ice are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and street width.',
          'Winter mornings need flexible start times.',
        ],
      },
      {
        id: 'border-interstate',
        title: 'Border-adjacent interstate legs',
        intro: 'VT and Canada-facing pairs need authority clarity.',
        bullets: [
          'Verify FMCSA for any out-of-state leg.',
          'Do not assume local NYSDOT alone covers border hops.',
        ],
      },
      {
        id: 'north-country-empty',
        title: 'North Country empty miles',
        intro: 'Longer freeflow still peaks on city pairs.',
        bullets: [
          'Price portal-to-portal and deadhead honestly.',
          'Photo rural last-mile before locking truck size.',
        ],
      },
    ],
    schoolsIntro:
      'Clinton families compare Plattsburgh City, Beekmantown, Saranac, and other districts — verify boundaries; rural feeders differ from city schools.',
    hospitalsDetail:
      'University of Vermont Health Network – Champlain Valley Physicians Hospital and regional clinics anchor acute care; map peak freeflow in Plattsburgh.',
    costIntro:
      'Winter access, multi-story stairs, and empty miles often matter more than raw miles.',
    seasonalIntro:
      'Harsh winters, school years, and border freeflow reshape demand more than Capital Region tourism calendars alone.',
  },
  {
    file: 'st-lawrence-ny.ts',
    exportName: 'stLawrenceCountyTier2Intelligence',
    slug: 'st-lawrence',
    hubTitle: 'St. Lawrence County Moving Intelligence Hub',
    eyebrow: 'St. Lawrence · Canton / Massena · independent North Country',
    h1: 'Moving in St. Lawrence County: Canton, Massena & North Country River Access',
    heroOpener:
      'St. Lawrence County is North Country independent product at scale — Canton and Potsdam college towns, Massena industrial and river-edge stock, Ogdensburg approaches, and long rural freeflow that does not answer to Watertown or Syracuse scripts alone. Expect extreme empty miles, winter last-mile constraints, and college calendars that spike local demand without creating Binghamton-style continuous multi-family density. This guide is for people moving in St. Lawrence as Canton / Massena North Country — not Jefferson Fort Drum product renamed.',
    heroCredibility:
      'Canton / Massena · College towns · River North Country · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-11 · NY-37 · NY-68 · NY-56 · NY-812 · NY-3 approaches',
    parentLabel: 'independent North Country (vs Jefferson / Onondaga defaults)',
    parentHref: '/local-movers/new-york/jefferson',
    compareIntro:
      'St. Lawrence is Canton / Massena / college-town North Country at scale — not Fort Drum PCS multi-family alone and not Syracuse freeflow.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Jefferson crews fight I-81 Watertown and Fort Drum peaks. St. Lawrence pairs ride US-11, NY-37, and long rural spines — freer mid-day on empty miles, still peak-heavy on college move weekends and Massena industrial corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Jefferson mixes Watertown multi-story and base apartments. St. Lawrence mixes Canton/Potsdam college multi-family, Massena multi-story, and vast rural lots — more dispersed product, less continuous PCS corridor density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'College multi-family needs management packets; rural and river edges add extreme empty miles and winter ice uncommon on Watertown city jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local St. Lawrence quotes often track secondary North Country rates — deadhead and winter access dominate pricing more than map miles.',
      },
      {
        title: 'Role difference',
        detail:
          'St. Lawrence is dispersed North Country college + river industrial product — not Jefferson Fort Drum renamed.',
      },
    ],
    whatIntro:
      'Dispersed college towns, river industrial stock, and extreme empty miles — not Watertown PCS boilerplate.',
    whatBullets: [
      {
        title: 'Canton / Potsdam college calendars spike demand',
        detail:
          'Term weekends fill local crews without matching continuous Ithaca density.',
      },
      {
        title: 'Massena multi-story and industrial edges',
        detail:
          'City stairs and corridor freeflow need inventories different from pure farm approaches.',
      },
      {
        title: 'Extreme empty miles are first-class cost drivers',
        detail:
          'County scale means long local pairs; price portal-to-portal honestly.',
      },
      {
        title: 'Canada adjacency creates interstate legs',
        detail:
          'Border-facing destinations need FMCSA authority clarity.',
      },
    ],
    zonesHeading: 'St. Lawrence zones: Canton/Potsdam colleges, Massena river, Ogdensburg edge & rural interior',
    zonesIntro:
      'Two to four sharp products — college towns, river industrial city, river seat, and vast rural interior.',
    zones: [
      {
        id: 'canton-potsdam',
        name: 'Canton / Potsdam college towns',
        shortName: 'College towns',
        neighborhoods: ['Canton', 'Potsdam', 'campus edges'],
        housingTypes: 'Student multi-family, SFH, apartments',
        challenges: ['Term clusters', 'Building COIs', 'Street parking'],
        keywords: ['canton', 'potsdam'],
        moverTips: 'Book early around term calendars; collect management packets.',
      },
      {
        id: 'massena',
        name: 'Massena river & industrial edges',
        shortName: 'Massena',
        neighborhoods: ['Massena', 'river approaches'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Corridor freeflow', 'Winter ice'],
        keywords: ['massena'],
        moverTips: 'Inventory stairs; price portal-to-portal on longer pairs.',
      },
      {
        id: 'ogdensburg',
        name: 'Ogdensburg river seat edge',
        shortName: 'Ogdensburg',
        neighborhoods: ['Ogdensburg', 'river seat'],
        housingTypes: 'Multi-story, SFH, mixed stock',
        challenges: ['Street width', 'Winter access'],
        keywords: ['ogdensburg'],
        moverTips: 'Plan temporary no-parking; photo approaches in winter.',
      },
      {
        id: 'rural-interior',
        name: 'Rural interior & larger lots',
        shortName: 'Rural interior',
        neighborhoods: ['Gouverneur edges', 'interior towns'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Extreme empty miles', 'Soft shoulders', 'Winter ice'],
        keywords: ['gouverneur'],
        moverTips: 'Photo last-mile; allow large winter buffers.',
      },
    ],
    specialized: [
      {
        id: 'college-turnover',
        title: 'Canton / Potsdam college turnover',
        intro: 'Term calendars create multi-family clusters.',
        bullets: [
          'Book early around term start/end.',
          'Inventory elevators and long carries.',
        ],
      },
      {
        id: 'massena-access',
        title: 'Massena multi-story & river corridors',
        intro: 'City stairs and freeflow are first-class cost drivers.',
        bullets: [
          'Inventory floor counts.',
          'Price long local pairs portal-to-portal.',
        ],
      },
      {
        id: 'empty-miles',
        title: 'North Country empty-mile logistics',
        intro: 'County scale rewrites hourly math.',
        bullets: [
          'Do not quote tight urban rates for interior farms.',
          'Photo approaches before locking truck size.',
        ],
      },
    ],
    schoolsIntro:
      'St. Lawrence families compare Canton, Potsdam, Massena, Ogdensburg, and other districts — verify boundaries across a very large county.',
    hospitalsDetail:
      'Canton-Potsdam Hospital, Massena Hospital, and regional clinics anchor acute care; map peak freeflow honestly across long distances.',
    costIntro:
      'Empty miles, winter access, and college peaks often matter more than raw miles.',
    seasonalIntro:
      'Harsh winters, term calendars, and river weather reshape demand more than mid-state patterns.',
  },
  {
    file: 'oswego-ny.ts',
    exportName: 'oswegoCountyTier2Intelligence',
    slug: 'oswego',
    hubTitle: 'Oswego County Moving Intelligence Hub',
    eyebrow: 'Oswego · Lake Ontario · vs Onondaga',
    h1: 'Moving in Oswego County: Oswego Lake City, Fulton Corridors & Central NY North Edge',
    heroOpener:
      'Oswego County is Central NY’s Lake Ontario north edge — Oswego multi-story and college-town density, Fulton corridors, lake-effect winter product, and NY-481 / NY-104 freeflow that is not a Syracuse rename. Expect longer empty miles from Onondaga cores, port-city hills, and winter access that rewrites morning plans. This guide is for people moving in Oswego as lake-north Central NY — not Onondaga university multi-family with different labels.',
    heroCredibility:
      'Lake Ontario edge · Oswego / Fulton · Central NY north · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'NY-481 · NY-104 · NY-48 · NY-3 · I-81 (east approaches) · NY-69 approaches',
    parentLabel: 'Onondaga County',
    parentHref: '/local-movers/new-york/onondaga',
    compareIntro:
      'Oswego is Lake Ontario north-edge city and corridor product — not Syracuse university multi-family and not pure Onondaga suburban freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Onondaga crews fight Syracuse peaks and I-81 city approaches. Oswego pairs ride NY-481, NY-104, and lake corridors — freer mid-day north of the metro, still peak-heavy on Oswego city pairs and lake-effect days.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Onondaga mixes Syracuse multi-family and suburbs. Oswego mixes Oswego multi-story/college stock, Fulton SFH, and lake-edge homes — more continuous lake-city product, less inner Syracuse elevator density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Port-city hills and multi-story need stair inventories; lake-effect ice and wind rewrite winter schedules more often than southern Onondaga suburbs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Oswego quotes often sit near secondary Central NY rates for driveway SFH — city access and winter peaks push prices up vs quiet suburban Onondaga days.',
      },
      {
        title: 'Role difference',
        detail:
          'Oswego is Lake Ontario north-edge Central NY — not Onondaga Syracuse core renamed.',
      },
    ],
    whatIntro:
      'Lake-city multi-story, lake-effect winter, and north-edge freeflow — not a Syracuse clone.',
    whatBullets: [
      {
        title: 'Oswego multi-story & college product',
        detail:
          'Stairs and term calendars need inventories different from pure suburban playbooks.',
      },
      {
        title: 'Lake-effect winter is operational',
        detail:
          'NY-481 and lake approaches need ice-aware mornings more often than Syracuse south suburbs.',
      },
      {
        title: 'Fulton corridors still peak',
        detail:
          'Cross-county pairs freer mid-day still burn billable time. Ask portal-to-portal.',
      },
      {
        title: 'North-edge empty miles matter',
        detail:
          'Rural lake towns price differently from Oswego city cores.',
      },
    ],
    zonesHeading: 'Oswego zones: Oswego city/college, Fulton corridor, lake towns & rural interior',
    zonesIntro:
      'Two to four sharp products — lake city, inland corridor, lake villages, and rural interior.',
    zones: [
      {
        id: 'oswego-city',
        name: 'Oswego city & college edge',
        shortName: 'Oswego city',
        neighborhoods: ['Oswego', 'downtown', 'campus edges'],
        housingTypes: 'Multi-story, student multi-family, older SFH',
        challenges: ['Stairs', 'Hills', 'Term clusters', 'Lake wind'],
        keywords: ['oswego'],
        moverTips: 'Inventory stairs; book early around term calendars; winter flexibility required.',
      },
      {
        id: 'fulton',
        name: 'Fulton corridor',
        shortName: 'Fulton',
        neighborhoods: ['Fulton', 'corridor edges'],
        housingTypes: 'SFH, multi-story older stock',
        challenges: ['Arterial timing', 'Mixed access'],
        keywords: ['fulton'],
        moverTips: 'Confirm street width; price portal-to-portal toward Oswego or Syracuse.',
      },
      {
        id: 'lake-towns',
        name: 'Lake Ontario town edges',
        shortName: 'Lake towns',
        neighborhoods: ['Mexico edges', 'Pulaski edges', 'lake villages'],
        housingTypes: 'SFH, seasonal stock',
        challenges: ['Seasonal roads', 'Wind/ice', 'Empty miles'],
        keywords: ['mexico', 'pulaski'],
        moverTips: 'Photo approaches; plan winter buffers.',
      },
      {
        id: 'rural-interior',
        name: 'Rural interior',
        shortName: 'Rural interior',
        neighborhoods: ['central towns', 'farm approaches'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Soft shoulders'],
        keywords: ['oswego county rural'],
        moverTips: 'Photo last-mile before locking truck size.',
      },
    ],
    specialized: [
      {
        id: 'oswego-city-access',
        title: 'Oswego multi-story & college turnover',
        intro: 'City stairs and term calendars are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and elevators.',
          'Book early around term start/end.',
        ],
      },
      {
        id: 'lake-effect',
        title: 'Lake-effect winter logistics',
        intro: 'Weather rewrites morning plans more than map miles.',
        bullets: [
          'Build ice-aware buffers into quotes.',
          'Confirm approach conditions the day before.',
        ],
      },
      {
        id: 'north-edge-freeflow',
        title: 'Central NY north-edge freeflow',
        intro: 'Oswego ↔ Onondaga pairs still peak hard.',
        bullets: [
          'Price portal-to-portal honestly.',
          'Do not quote pure Syracuse driveway rates for lake-city multi-story.',
        ],
      },
    ],
    schoolsIntro:
      'Oswego families compare Oswego City, Fulton, Mexico, Pulaski, and other districts — verify boundaries; lake and interior feeders differ.',
    hospitalsDetail:
      'Oswego Health and regional clinics anchor acute care; map peak freeflow across lake corridors and winter weather days.',
    costIntro:
      'City access, lake-effect winter, and empty miles often matter more than raw miles.',
    seasonalIntro:
      'Lake-effect winter, college calendars, and school years reshape demand more than Syracuse office peaks alone.',
  },
  {
    file: 'cayuga-ny.ts',
    exportName: 'cayugaCountyTier2Intelligence',
    slug: 'cayuga',
    hubTitle: 'Cayuga County Moving Intelligence Hub',
    eyebrow: 'Cayuga · Auburn Finger Lakes · vs Onondaga / Monroe',
    h1: 'Moving in Cayuga County: Auburn Finger Lakes Seat, Lake Edge & Thruway Approaches',
    heroOpener:
      'Cayuga County is Finger Lakes mid-corridor product — Auburn multi-story and seat density, lake-edge villages, Thruway approaches, and freeflow between Onondaga and Monroe that is not a rename of either. Expect mid-size city stock, seasonal lake access, and longer empty miles than Syracuse or Rochester first-ring suburbs. This guide is for people moving in Cayuga as Auburn Finger Lakes — not Onondaga multi-family cores and not Monroe growth collars with different labels.',
    heroCredibility:
      'Auburn Finger Lakes · Lake edge · Thruway approaches · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-90 · NY-5 · NY-20 · NY-34 · NY-38 · NY-90',
    parentLabel: 'Onondaga County (and Monroe collar patterns)',
    parentHref: '/local-movers/new-york/onondaga',
    compareIntro:
      'Cayuga is Auburn / Finger Lakes mid-corridor product — not Syracuse university density and not Rochester south-collar HOAs alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Onondaga crews fight Syracuse peaks; Monroe crews fight Rochester collars. Cayuga pairs ride I-90, NY-5/20, and lake corridors — freer mid-day mid-state freeflow, still peak-heavy on Auburn arterials and Thruway approaches.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Onondaga mixes university multi-family; Monroe mixes growth HOAs. Cayuga mixes Auburn multi-story, lake villages, and rural lots — more continuous mid-size seat product, less metro multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Auburn multi-story needs stair inventories; lake villages often need smaller trucks and seasonal curb plans uncommon on pure suburban jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cayuga quotes often sit at secondary Finger Lakes rates for driveway SFH — city access and seasonal lake peaks push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Cayuga is Auburn Finger Lakes mid-corridor — not Onondaga or Monroe renamed.',
      },
    ],
    whatIntro:
      'Auburn seat density, lake-edge access, and mid-state freeflow — not a Syracuse or Rochester clone.',
    whatBullets: [
      {
        title: 'Auburn multi-story is first-class product',
        detail:
          'Stairs and street parking need inventories different from pure lake cottages.',
      },
      {
        title: 'Finger Lakes seasonal access',
        detail:
          'Summer tourism and lake approaches rewrite curb plans on village jobs.',
      },
      {
        title: 'Thruway approaches are still billable',
        detail:
          'East–west pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Between-metro empty miles matter',
        detail:
          'Jobs bridging Syracuse and Rochester freeflow price differently from pure local Auburn days.',
      },
    ],
    zonesHeading: 'Cayuga zones: Auburn core, lake villages, Thruway edges & rural south',
    zonesIntro:
      'Two to four sharp products — seat city, lake villages, Thruway approaches, and rural lots.',
    zones: [
      {
        id: 'auburn-core',
        name: 'Auburn city core',
        shortName: 'Auburn',
        neighborhoods: ['Auburn', 'downtown', 'city neighborhoods'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking'],
        keywords: ['auburn'],
        moverTips: 'Inventory stairs; plan temporary no-parking.',
      },
      {
        id: 'lake-villages',
        name: 'Cayuga Lake village edges',
        shortName: 'Lake villages',
        neighborhoods: ['Aurora edges', 'Union Springs', 'lake villages'],
        housingTypes: 'Village SFH, seasonal stock, some multi-unit',
        challenges: ['Narrow streets', 'Seasonal parking', 'Last-mile width'],
        keywords: ['aurora', 'union springs'],
        moverTips: 'Photo approaches; plan summer curb carefully.',
      },
      {
        id: 'thruway-edges',
        name: 'Thruway approach corridors',
        shortName: 'Thruway edges',
        neighborhoods: ['Weedsport edges', 'corridor towns'],
        housingTypes: 'SFH, mixed stock',
        challenges: ['Corridor freeflow', 'Longer local pairs'],
        keywords: ['weedsport'],
        moverTips: 'Price portal-to-portal on east–west pairs.',
      },
      {
        id: 'rural-south',
        name: 'Rural south & larger lots',
        shortName: 'Rural south',
        neighborhoods: ['Moravia edges', 'southern towns'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Soft shoulders'],
        keywords: ['moravia'],
        moverTips: 'Photo last-mile; winter flexibility required.',
      },
    ],
    specialized: [
      {
        id: 'auburn-city',
        title: 'Auburn multi-story & seat access',
        intro: 'City stairs are first-class cost drivers.',
        bullets: [
          'Inventory floor counts.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'lake-edge',
        title: 'Finger Lakes village & seasonal access',
        intro: 'Lake approaches rewrite truck size and curb plans.',
        bullets: [
          'Photo last-mile before surveys finalize.',
          'Summer tourism changes staging windows.',
        ],
      },
      {
        id: 'mid-corridor',
        title: 'I-90 mid-state freeflow',
        intro: 'Between-metro pairs still peak hard.',
        bullets: [
          'Price portal-to-portal honestly.',
          'Do not quote pure Syracuse or Rochester suburban rates for Auburn multi-story.',
        ],
      },
    ],
    schoolsIntro:
      'Cayuga families compare Auburn, Southern Cayuga, Cato-Meridian, and other districts — verify boundaries; lake and rural feeders differ.',
    hospitalsDetail:
      'Auburn Community Hospital and regional clinics anchor acute care; map peak freeflow across Auburn–lake corridors.',
    costIntro:
      'City access, seasonal lake peaks, and mid-state freeflow often matter more than raw miles.',
    seasonalIntro:
      'Summer lake tourism, school years, and winter ice reshape demand more than pure metro office calendars.',
  },
  {
    file: 'steuben-ny.ts',
    exportName: 'steubenCountyTier2Intelligence',
    slug: 'steuben',
    hubTitle: 'Steuben County Moving Intelligence Hub',
    eyebrow: 'Steuben · Corning / Hornell · vs Broome / Chemung',
    h1: 'Moving in Steuben County: Corning, Hornell & Southern Tier West Access',
    heroOpener:
      'Steuben County is Southern Tier west product — Corning multi-story and industrial-campus edges, Hornell seat corridors, Bath approaches, and I-86 freeflow that is not Binghamton university density and not Elmira alone. Expect glass-corridor employment stock, hill towns, and longer empty miles than Broome’s Triple Cities stack. This guide is for people moving in Steuben as Corning / Hornell Southern Tier west — not Broome or Chemung renames.',
    heroCredibility:
      'Corning / Hornell · Southern Tier west · I-86 freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-86 · NY-15 · NY-17 · NY-21 · NY-36 · NY-415',
    parentLabel: 'Broome County (and Chemung Southern Tier patterns)',
    parentHref: '/local-movers/new-york/broome',
    compareIntro:
      'Steuben is Corning / Hornell Southern Tier west — not Binghamton university multi-family and not Elmira/Horseheads alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Broome crews fight I-81 Binghamton peaks; Chemung rides I-86 Elmira. Steuben pairs ride I-86 west, NY-15, and NY-36 — freer mid-day Southern Tier freeflow, still peak-heavy on Corning arterials and Hornell pairs.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Broome mixes university multi-family; Chemung mixes Elmira city and Horseheads growth. Steuben mixes Corning multi-story, Hornell corridors, and rural hill lots — more industrial-campus edge product, less continuous student density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Corning multi-story and hills need stair inventories; rural ridges add empty miles and winter ice uncommon on pure Horseheads driveway days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Steuben quotes often sit near secondary Southern Tier rates — city access and empty-mile edges still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Steuben is Corning / Hornell Southern Tier west — not Broome or Chemung renamed.',
      },
    ],
    whatIntro:
      'Corning industrial-edge density, Hornell corridors, and Southern Tier west freeflow — not a Broome clone.',
    whatBullets: [
      {
        title: 'Corning multi-story is first-class product',
        detail:
          'Stairs and grades need inventories different from pure rural playbooks.',
      },
      {
        title: 'I-86 freeflow is still billable',
        detail:
          'East–west pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Hill-town last-mile rewrites truck size',
        detail:
          'Photo approaches; winter ridges need flexible mornings.',
      },
      {
        title: 'PA adjacency creates interstate legs',
        detail:
          'Short-looking border hops still need FMCSA authority.',
      },
    ],
    zonesHeading: 'Steuben zones: Corning core, Hornell corridors, Bath edges & rural ridges',
    zonesIntro:
      'Two to four sharp products — Corning city, Hornell seat, Bath approaches, and rural ridges.',
    zones: [
      {
        id: 'corning-core',
        name: 'Corning city & campus edges',
        shortName: 'Corning',
        neighborhoods: ['Corning', 'downtown', 'industrial-campus edges'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Hills', 'Street parking'],
        keywords: ['corning'],
        moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
      },
      {
        id: 'hornell',
        name: 'Hornell seat corridors',
        shortName: 'Hornell',
        neighborhoods: ['Hornell', 'corridor edges'],
        housingTypes: 'Multi-story, SFH, mixed stock',
        challenges: ['Mixed access', 'Arterial timing'],
        keywords: ['hornell'],
        moverTips: 'Confirm street width; price portal-to-portal toward Corning.',
      },
      {
        id: 'bath-edges',
        name: 'Bath & mid-county edges',
        shortName: 'Bath edges',
        neighborhoods: ['Bath', 'mid-county towns'],
        housingTypes: 'SFH, mixed stock',
        challenges: ['Longer local pairs', 'Corridor freeflow'],
        keywords: ['bath'],
        moverTips: 'Price empty miles honestly on cross-county pairs.',
      },
      {
        id: 'rural-ridges',
        name: 'Rural ridges & larger lots',
        shortName: 'Rural ridges',
        neighborhoods: ['Canisteo edges', 'ridge towns'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice', 'Grades'],
        keywords: ['canisteo'],
        moverTips: 'Photo last-mile; winter buffers required.',
      },
    ],
    specialized: [
      {
        id: 'corning-city',
        title: 'Corning multi-story & hills',
        intro: 'City stairs and grades are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and approaches.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'hornell-corridor',
        title: 'Hornell seat corridor logistics',
        intro: 'Mid-size city freeflow still peaks hard.',
        bullets: [
          'Price portal-to-portal on Corning ↔ Hornell pairs.',
          'Confirm street width on older blocks.',
        ],
      },
      {
        id: 'i86-west',
        title: 'I-86 Southern Tier west freeflow',
        intro: 'East–west pairs rewrite hourly math.',
        bullets: [
          'Clarify PA second addresses for interstate authority.',
          'Do not quote Binghamton university rates for rural ridge days.',
        ],
      },
    ],
    schoolsIntro:
      'Steuben families compare Corning-Painted Post, Hornell, Bath, and other districts — verify boundaries across a large county.',
    hospitalsDetail:
      'Guthrie Corning Hospital, St. James Hospital (Hornell), and regional clinics anchor acute care; map peak freeflow across Corning–Hornell corridors.',
    costIntro:
      'City access, ridge empty miles, and winter grades often matter more than raw miles.',
    seasonalIntro:
      'School years, winter ridges, and Southern Tier weather reshape demand more than university-term spikes alone.',
  },
  {
    file: 'sullivan-ny.ts',
    exportName: 'sullivanCountyTier2Intelligence',
    slug: 'sullivan',
    hubTitle: 'Sullivan County Moving Intelligence Hub',
    eyebrow: 'Sullivan · Monticello Catskills · vs Ulster / Orange',
    h1: 'Moving in Sullivan County: Monticello, Catskills Resorts & NY-17 Access',
    heroOpener:
      'Sullivan County is Catskills interior product — Monticello multi-story and seat density, resort and bungalow-colony stock, Liberty and Fallsburg corridors, and NY-17 freeflow that is not Ulster college-town density and not Orange outer-NYC collar. Expect longer empty miles, seasonal tourism peaks, and mountain last-mile that rejects full trailers more often than Kingston or Middletown driveway days. This guide is for people moving in Sullivan as Monticello Catskills — not Ulster or Orange renames.',
    heroCredibility:
      'Monticello Catskills · Resort seasonal product · NY-17 freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'NY-17 · NY-42 · NY-52 · NY-55 · NY-97 · NY-17B',
    parentLabel: 'Ulster County (and Orange Hudson Valley patterns)',
    parentHref: '/local-movers/new-york/ulster',
    compareIntro:
      'Sullivan is Monticello / Catskills interior resort-and-rural product — not New Paltz college density and not Orange Thruway retail freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Ulster crews fight Kingston/New Paltz peaks; Orange rides I-87/I-84. Sullivan pairs ride NY-17, NY-42, and mountain corridors — freer mid-day interior freeflow, still peak-heavy on summer resort weekends and Monticello arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Ulster mixes college multi-family and river-city stock; Orange mixes outer-collar growth. Sullivan mixes Monticello multi-story, resort cottages, bungalow colonies, and large rural lots — more seasonal product, less continuous college or outlet-corridor density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Mountain and resort approaches often need smaller trucks; seasonal properties rewrite curb plans more often than pure Kingston driveway jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Sullivan quotes often sit at secondary Catskills rates for simple SFH — mountain shuttles and seasonal peaks can price above quiet Ulster driveway days.',
      },
      {
        title: 'Role difference',
        detail:
          'Sullivan is Catskills interior Monticello product — not Ulster Hudson west college edge renamed.',
      },
    ],
    whatIntro:
      'Resort calendars, mountain last-mile, and NY-17 freeflow — not an Ulster clone.',
    whatBullets: [
      {
        title: 'Seasonal resort product is first-class',
        detail:
          'Summer peaks and vacation-turn clusters fill crews differently than year-round college towns.',
      },
      {
        title: 'Mountain last-mile rewrites truck size',
        detail:
          'Photo approaches; many properties reject full trailers.',
      },
      {
        title: 'NY-17 freeflow is still billable',
        detail:
          'Long interior pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'PA adjacency creates interstate legs',
        detail:
          'Short-looking border hops still need FMCSA authority.',
      },
    ],
    zonesHeading: 'Sullivan zones: Monticello core, Liberty/Fallsburg corridors, resort edges & rural Catskills',
    zonesIntro:
      'Two to four sharp products — seat city, resort corridors, seasonal colonies, and deep rural lots.',
    zones: [
      {
        id: 'monticello-core',
        name: 'Monticello seat core',
        shortName: 'Monticello',
        neighborhoods: ['Monticello', 'downtown', 'seat edges'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'Arterial timing'],
        keywords: ['monticello'],
        moverTips: 'Inventory stairs; plan temporary no-parking.',
      },
      {
        id: 'liberty-fallsburg',
        name: 'Liberty / Fallsburg corridors',
        shortName: 'Liberty / Fallsburg',
        neighborhoods: ['Liberty', 'Fallsburg', 'corridor towns'],
        housingTypes: 'SFH, multi-family, mixed stock',
        challenges: ['Seasonal peaks', 'Mixed access'],
        keywords: ['liberty', 'fallsburg'],
        moverTips: 'Book early around summer peaks; confirm building rules.',
      },
      {
        id: 'resort-edges',
        name: 'Resort & bungalow-colony edges',
        shortName: 'Resort edges',
        neighborhoods: ['resort properties', 'colony roads', 'lake edges'],
        housingTypes: 'Seasonal homes, cottages, multi-unit resorts',
        challenges: ['Narrow roads', 'Seasonal access', 'Long carries'],
        keywords: ['catskills resort'],
        moverTips: 'Photo last-mile; plan smaller trucks; confirm seasonal access rules.',
      },
      {
        id: 'rural-catskills',
        name: 'Rural Catskills lots',
        shortName: 'Rural Catskills',
        neighborhoods: ['Callicoon edges', 'western towns', 'interior lots'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Grades', 'Winter ice'],
        keywords: ['callicoon'],
        moverTips: 'Photo approaches; allow winter buffers.',
      },
    ],
    specialized: [
      {
        id: 'resort-seasonal',
        title: 'Catskills resort & seasonal turnover',
        intro: 'Summer peaks rewrite demand and curb plans.',
        bullets: [
          'Book early for peak summer weekends.',
          'Confirm access rules for seasonal properties.',
        ],
      },
      {
        id: 'mountain-last-mile',
        title: 'Mountain last-mile & truck size',
        intro: 'Many approaches reject full trailers.',
        bullets: [
          'Photo last-mile before surveys finalize.',
          'Shuttle conversations beat stuck trailers.',
        ],
      },
      {
        id: 'ny17-freeflow',
        title: 'NY-17 interior freeflow',
        intro: 'Long pairs still peak hard.',
        bullets: [
          'Price portal-to-portal honestly.',
          'Do not quote Ulster college-town rates for deep resort roads.',
        ],
      },
    ],
    schoolsIntro:
      'Sullivan families compare Monticello, Liberty, Fallsburg, Sullivan West, and other districts — verify boundaries; resort and rural feeders differ.',
    hospitalsDetail:
      'Garnet Health (Catskills) and regional clinics anchor acute care; map peak freeflow across Monticello–Liberty corridors and mountain weather days.',
    costIntro:
      'Mountain access, seasonal peaks, and empty miles often matter more than raw miles.',
    seasonalIntro:
      'Summer resort peaks, school years, and winter mountain ice reshape demand more than Ulster college calendars alone.',
  },
  {
    file: 'warren-ny.ts',
    exportName: 'warrenCountyNyTier2Intelligence',
    slug: 'warren',
    hubTitle: 'Warren County Moving Intelligence Hub',
    eyebrow: 'Warren · Glens Falls Adirondack south · vs Saratoga / Albany',
    h1: 'Moving in Warren County: Glens Falls, Lake George Edge & Adirondack South Access',
    heroOpener:
      'Warren County is Adirondack south product — Glens Falls multi-story and seat density, Queensbury retail corridors, Lake George seasonal villages, and I-87 freeflow that is not Saratoga Springs tourism growth alone and not Albany government-core. Expect seasonal tourism peaks, mountain last-mile, and lake approaches that reject full trailers more often than Clifton Park HOAs. This guide is for people moving in Warren as Glens Falls / Lake George Adirondack south — not Saratoga renamed.',
    heroCredibility:
      'Glens Falls · Lake George seasonal · Adirondack south · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-87 · NY-9 · NY-9N · NY-149 · NY-8 · NY-28 approaches',
    parentLabel: 'Saratoga County (and Albany Capital patterns)',
    parentHref: '/local-movers/new-york/saratoga',
    compareIntro:
      'Warren is Glens Falls / Lake George Adirondack south — not Saratoga Springs track-season growth suburbs and not Albany brownstones alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Saratoga crews fight Northway peaks toward Albany and track-season weekends. Warren pairs ride I-87 further north, NY-9, and NY-9N — freer mid-day mid-week, still peak-heavy on Lake George summer weekends and Glens Falls arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Saratoga mixes spa-town density and Clifton Park HOAs. Warren mixes Glens Falls multi-story, Queensbury retail-corridor SFH, and Lake George seasonal stock — more continuous tourism-village product, less Capital-collar planned suburbs.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Lake villages and mountain approaches often need smaller trucks; seasonal curb plans differ from pure Clifton Park driveway days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Warren quotes often sit near secondary Adirondack-south rates for driveway SFH — seasonal peaks and mountain shuttles can price above quiet Saratoga suburb days.',
      },
      {
        title: 'Role difference',
        detail:
          'Warren is Adirondack south Glens Falls / Lake George product — not Saratoga Capital-collar growth renamed.',
      },
    ],
    whatIntro:
      'Lake George seasonal peaks, Glens Falls multi-story, and Adirondack last-mile — not a Saratoga clone.',
    whatBullets: [
      {
        title: 'Lake George tourism peaks rewrite demand',
        detail:
          'Summer weekends fill crews and tighten village staging — not only family Saturdays.',
      },
      {
        title: 'Glens Falls multi-story is first-class product',
        detail:
          'Stairs and street parking need inventories different from pure resort cottages.',
      },
      {
        title: 'Mountain / lake last-mile rewrites truck size',
        detail:
          'Photo approaches; many lake streets reject full trailers.',
      },
      {
        title: 'I-87 freeflow is still billable',
        detail:
          'Northway pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
    ],
    zonesHeading: 'Warren zones: Glens Falls core, Queensbury corridors, Lake George villages & Adirondack edges',
    zonesIntro:
      'Two to four sharp products — seat city, retail corridors, seasonal lake villages, and mountain edges.',
    zones: [
      {
        id: 'glens-falls',
        name: 'Glens Falls city core',
        shortName: 'Glens Falls',
        neighborhoods: ['Glens Falls', 'downtown', 'city neighborhoods'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking'],
        keywords: ['glens falls'],
        moverTips: 'Inventory stairs; plan temporary no-parking.',
      },
      {
        id: 'queensbury',
        name: 'Queensbury retail & suburban corridors',
        shortName: 'Queensbury',
        neighborhoods: ['Queensbury', 'retail corridor edges'],
        housingTypes: 'SFH, townhomes, some multi-family',
        challenges: ['Arterial timing', 'Cul-de-sac staging'],
        keywords: ['queensbury'],
        moverTips: 'Avoid peak retail windows; confirm driveway access.',
      },
      {
        id: 'lake-george',
        name: 'Lake George seasonal villages',
        shortName: 'Lake George',
        neighborhoods: ['Lake George', 'lake villages', 'tourist approaches'],
        housingTypes: 'Seasonal homes, multi-unit tourism stock, SFH',
        challenges: ['Tourism parking', 'Narrow streets', 'Seasonal access'],
        keywords: ['lake george'],
        moverTips: 'Book early for summer peaks; photo street width; plan smaller trucks.',
      },
      {
        id: 'adirondack-edges',
        name: 'Adirondack mountain edges',
        shortName: 'Adirondack edges',
        neighborhoods: ['Warrensburg edges', 'mountain towns'],
        housingTypes: 'Larger lots, mountain approaches',
        challenges: ['Grades', 'Empty miles', 'Winter ice'],
        keywords: ['warrensburg'],
        moverTips: 'Photo last-mile; winter buffers required.',
      },
    ],
    specialized: [
      {
        id: 'lake-george-seasonal',
        title: 'Lake George seasonal & tourism product',
        intro: 'Summer peaks rewrite demand and curb plans.',
        bullets: [
          'Book early for peak summer weekends.',
          'Confirm access rules for seasonal multi-unit stock.',
        ],
      },
      {
        id: 'glens-falls-city',
        title: 'Glens Falls multi-story access',
        intro: 'City stairs are first-class cost drivers.',
        bullets: [
          'Inventory floor counts.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'adirondack-last-mile',
        title: 'Adirondack south last-mile',
        intro: 'Mountain approaches rewrite truck size.',
        bullets: [
          'Photo last-mile before surveys finalize.',
          'Do not quote Saratoga HOA rates for lake-village peaks.',
        ],
      },
    ],
    schoolsIntro:
      'Warren families compare Glens Falls, Queensbury, Lake George, and other districts — verify boundaries; tourism towns and seat feeders differ.',
    hospitalsDetail:
      'Glens Falls Hospital and regional clinics anchor acute care; map peak freeflow across Glens Falls–Queensbury and summer lake congestion.',
    costIntro:
      'Seasonal peaks, multi-story access, and mountain last-mile often matter more than raw miles.',
    seasonalIntro:
      'Lake George summers, school years, and Adirondack winter ice reshape demand more than Saratoga track season alone.',
  },
  {
    file: 'columbia-ny.ts',
    exportName: 'columbiaCountyTier2Intelligence',
    slug: 'columbia',
    hubTitle: 'Columbia County Moving Intelligence Hub',
    eyebrow: 'Columbia · Hudson Upper Hudson · vs Dutchess / Albany',
    h1: 'Moving in Columbia County: Hudson Upper Hudson, Historic Villages & Taconic Access',
    heroOpener:
      'Columbia County is Upper Hudson product — Hudson multi-story and historic-city stock, Chatham and Kinderhook villages, Taconic freeflow, and longer empty miles that are not Dutchess rail-suburb density and not Albany government-core. Expect historic street geometry, second-home and arts-driven demand, and rural edges that reject full trailers more often than Poughkeepsie multi-family days. This guide is for people moving in Columbia as Hudson Upper Hudson — not Dutchess or Albany renames.',
    heroCredibility:
      'Hudson Upper Hudson · Historic villages · Taconic freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-90 · Taconic State Parkway · NY-9H · NY-9 · NY-23 · NY-66',
    parentLabel: 'Dutchess County (and Albany Capital patterns)',
    parentHref: '/local-movers/new-york/dutchess',
    compareIntro:
      'Columbia is Hudson / Upper Hudson historic and village product — not Dutchess east-bank rail suburbs and not Albany brownstones alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dutchess crews fight US-9 and rail-village peaks; Albany fights capital one-ways. Columbia pairs ride the Taconic, I-90 approaches, NY-9H, and NY-23 — freer mid-day Upper Hudson freeflow, still peak-heavy on Hudson city pairs and weekend second-home traffic.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dutchess mixes rail multi-family and growth suburbs; Albany mixes government-core stock. Columbia mixes Hudson multi-story historic, village SFH, and large rural lots — more continuous historic-village product, less continuous Metro-North multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Hudson historic streets often need smaller trucks and temporary no-parking; rural Taconic edges add empty miles uncommon on pure Poughkeepsie jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Columbia quotes often sit at secondary Upper Hudson rates for driveway SFH — historic access and second-home peaks can price above quiet rural days.',
      },
      {
        title: 'Role difference',
        detail:
          'Columbia is Upper Hudson historic Hudson + villages — not Dutchess rail collar or Albany capital renamed.',
      },
    ],
    whatIntro:
      'Historic Hudson streets, village geometry, and Taconic freeflow — not a Dutchess clone.',
    whatBullets: [
      {
        title: 'Hudson historic multi-story is first-class product',
        detail:
          'Stairs, narrow streets, and curb rules need inventories different from pure rural playbooks.',
      },
      {
        title: 'Second-home and arts-driven demand spikes',
        detail:
          'Weekend peaks and seasonal arrivals rewrite local calendars more than pure family Saturdays.',
      },
      {
        title: 'Taconic freeflow is still billable',
        detail:
          'North–south pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'MA adjacency creates interstate legs',
        detail:
          'Short-looking border hops still need FMCSA authority.',
      },
    ],
    zonesHeading: 'Columbia zones: Hudson core, Chatham/Kinderhook villages, Taconic edges & rural east',
    zonesIntro:
      'Two to four sharp products — historic city, villages, Taconic approaches, and rural east lots.',
    zones: [
      {
        id: 'hudson-core',
        name: 'Hudson historic city core',
        shortName: 'Hudson',
        neighborhoods: ['Hudson', 'downtown', 'historic blocks'],
        housingTypes: 'Multi-story, historic stock, multi-unit',
        challenges: ['Narrow streets', 'Stairs', 'Tourism parking'],
        keywords: ['hudson'],
        moverTips: 'Plan temporary no-parking; measure street width; inventory stairs.',
      },
      {
        id: 'villages',
        name: 'Chatham / Kinderhook village belt',
        shortName: 'Villages',
        neighborhoods: ['Chatham', 'Kinderhook', 'village edges'],
        housingTypes: 'Village SFH, some multi-unit',
        challenges: ['Street width', 'Weekend traffic'],
        keywords: ['chatham', 'kinderhook'],
        moverTips: 'Confirm curb plans; photo village approaches.',
      },
      {
        id: 'taconic-edges',
        name: 'Taconic approach corridors',
        shortName: 'Taconic edges',
        neighborhoods: ['corridor towns', 'Taconic approaches'],
        housingTypes: 'SFH, mixed stock',
        challenges: ['Corridor freeflow', 'Longer local pairs'],
        keywords: ['columbia taconic'],
        moverTips: 'Price portal-to-portal on north–south pairs.',
      },
      {
        id: 'rural-east',
        name: 'Rural east & larger lots',
        shortName: 'Rural east',
        neighborhoods: ['Hillsdale edges', 'Copake edges', 'eastern towns'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Soft shoulders', 'Winter ice'],
        keywords: ['hillsdale', 'copake'],
        moverTips: 'Photo last-mile; allow winter buffers.',
      },
    ],
    specialized: [
      {
        id: 'hudson-historic',
        title: 'Hudson historic multi-story access',
        intro: 'Narrow streets and stairs are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and street width.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'village-second-home',
        title: 'Village & second-home logistics',
        intro: 'Weekend peaks rewrite curb plans.',
        bullets: [
          'Book early around summer and holiday weekends.',
          'Confirm access rules for mixed-use village stock.',
        ],
      },
      {
        id: 'taconic-freeflow',
        title: 'Taconic / Upper Hudson freeflow',
        intro: 'North–south pairs still peak hard.',
        bullets: [
          'Price portal-to-portal honestly.',
          'Clarify MA second addresses for interstate authority.',
        ],
      },
    ],
    schoolsIntro:
      'Columbia families compare Hudson City, Chatham, Ichabod Crane, Taconic Hills, and other districts — verify boundaries; village and rural feeders differ.',
    hospitalsDetail:
      'Columbia Memorial Health and regional clinics anchor acute care; map peak freeflow across Hudson–village corridors.',
    costIntro:
      'Historic access, weekend peaks, and empty miles often matter more than raw miles.',
    seasonalIntro:
      'Second-home weekends, school years, and winter ice reshape demand more than Dutchess rail commute peaks alone.',
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
        detail:
          '${esc(b.detail)}',
      }`
    )
    .join(',\n');

  const what = p.whatBullets
    .map(
      (b) => `      {
        title: '${esc(b.title)}',
        detail:
          '${esc(b.detail)}',
      }`
    )
    .join(',\n');

  return `import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * ${p.slug} — NY Tier 2 Wave 2
 */
export const ${p.exportName}: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: '${p.slug}',
  hubTitle: '${esc(p.hubTitle)}',
  eyebrow: '${esc(p.eyebrow)}',
  h1: '${esc(p.h1)}',
  heroOpener:
    '${esc(p.heroOpener)}',
  heroCredibility:
    '${esc(p.heroCredibility)}',
  majorCorridors: '${esc(p.majorCorridors)}',
  parentCompare: {
    parentLabel: '${esc(p.parentLabel)}',
    parentHref: '${p.parentHref}',
    title: 'Compared with ${esc(p.parentLabel)}',
    intro:
      '${esc(p.compareIntro)}',
    bullets: [
${compare}
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in ${esc(p.hubTitle.replace(' Moving Intelligence Hub', ''))} different',
    intro: '${esc(p.whatIntro)}',
    bullets: [
${what},
      NY_TIER2_REG_BULLET,
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
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, college towns, and seasonal markets can tighten housing near school calendars.',
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
              'Map ER access at commute peaks and weather days, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: '${esc(p.costIntro)}',
    drivers: [
      {
        title: 'Corridor freeflow',
        detail: 'Peak windows inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'Access soft costs',
        detail: 'Building packets, stairs, or last-mile shuttles add labor hours.',
      },
      {
        title: 'Long empty-mile edges',
        detail: 'Far pockets price differently from seat cores.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,100+' },
      {
        label: '3–4 BR home',
        value: '$1,600–$4,000+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$115–$180+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: '${esc(p.seasonalIntro)}',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, lake edges, and rural approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify NYSDOT household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: '${esc(p.parentLabel)} movers (parent contrast)',
        href: '${p.parentHref}',
      },
    ],
  },
});
`;
}

const outDir = join(process.cwd(), 'lib/local-movers/county-intelligence/new-york');
for (const p of packs) {
  writeFileSync(join(outDir, p.file), render(p), 'utf8');
  console.log('wrote', p.file);
}
console.log('Generated', packs.length, 'NY Tier 2 Wave 2 packs');
