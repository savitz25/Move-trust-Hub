/**
 * Generate PA Tier 2 Wave 1 county intelligence packs (12 counties).
 * Run: npx tsx scripts/generate-pa-tier2-wave1.ts
 */
import { writeFileSync } from 'node:fs';

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
  parentAltLabel?: string;
  parentAltHref?: string;
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
    file: 'berks-pa.ts',
    exportName: 'berksCountyTier2Intelligence',
    slug: 'berks',
    hubTitle: 'Berks County Moving Intelligence Hub',
    eyebrow: 'Berks · Reading mid-state independent secondary',
    h1: 'Moving in Berks County: Reading, US-222 Corridor & Mid-State Independent Access',
    heroOpener:
      'Berks County is a Reading-centered mid-state independent secondary market — city multi-unit and older stock, US-222 and I-78 corridor freeflow toward Lehigh Valley, western township HOAs, and longer empty miles to rural edges. It is not an Allentown rename and not Philly collar freeways with different labels: expect Reading hills and stairs, Route 222 portal time, and mid-state patterns that stage differently from Lehigh Valley industrial multi-family. This guide is for people moving in Berks as a Reading / US-222 independent market — not recycled Lehigh or Lancaster scripts.',
    heroCredibility:
      'Reading mid-state independent · I-78 / US-222 freeflow · Mixed city & township stock · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'US-222 · I-78 links · US-422 · PA-61 · PA-12 · PA-183',
    parentLabel: 'Lehigh County',
    parentHref: '/local-movers/pennsylvania/lehigh',
    parentAltLabel: 'Lancaster County',
    parentAltHref: '/local-movers/pennsylvania/lancaster',
    compareIntro:
      'Berks is Reading mid-state independent product on US-222 / I-78 — not Lehigh Valley Allentown industrial multi-family and not Lancaster Amish-edge tourism alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lehigh crews fight I-78 / PA-22 Valley peaks into Allentown. Berks pairs ride US-222, US-422, and I-78 links — freer mid-day west of the Valley, still peak-heavy on Reading arterials and 222 toward Lehigh. Portal-to-portal time is real; it is not an Allentown elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lehigh mixes Allentown multi-unit and western township growth. Berks mixes Reading multi-story hills, Wyomissing HOA, Exeter twins, and rural-edge lots — more Reading city stairs, less continuous Valley industrial multi-family.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Reading hills need stair inventories and curb plans; western townships add HOA packets uncommon on pure rural jobs. Soft shoulders on rural edges reject full trailers more often than map miles suggest.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Berks quotes often sit near secondary mid-state rates for driveway SFH — city stairs, 222 peaks, and long empty-mile edges still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Berks is Reading mid-state independent secondary — not Lehigh Valley Allentown product renamed and not Philly collar spillover.',
      },
    ],
    whatIntro:
      'Reading hills, US-222 freeflow, and township empty miles — not interchangeable Allentown boilerplate.',
    whatBullets: [
      {
        title: 'US-222 / I-78 peaks rewrite short locals',
        detail:
          'Reading ↔ Lehigh pairs freer mid-day still burn billable time at commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Reading multi-story hills are first-class product',
        detail:
          'City stairs and grades need inventories different from Wyomissing cul-de-sacs.',
      },
      {
        title: 'Western township HOA is real soft cost',
        detail:
          'Gate lists and approved hours push demand into peak windows more than map miles suggest.',
      },
      {
        title: 'Rural-edge empty miles price as distance work',
        detail:
          'Northern and southern lots fail when crews assume Reading-city day rates.',
      },
    ],
    zonesHeading:
      'Berks zones: Reading city, western suburbs, eastern corridors & rural edges',
    zonesIntro:
      'Two to four sharp products — city hills, HOA suburbs, eastern arterials, and rural edges price differently.',
    zones: [
      {
        id: 'reading-city',
        name: 'Reading city multi-unit & older stock',
        shortName: 'Reading city',
        neighborhoods: ['Downtown Reading', 'City multi-family', 'Older SFH pockets'],
        housingTypes: 'Multi-family, twins, older SFH',
        challenges: ['Hills and stairs', 'Tight streets', 'Arterial congestion'],
        moverTips: 'Photo curb and stairs. Prefer mid-week mornings.',
        keywords: ['reading', 'downtown reading'],
      },
      {
        id: 'west-suburbs',
        name: 'Western suburban multi-family & HOA',
        shortName: 'West suburbs',
        neighborhoods: ['Wyomissing', 'Sinking Spring edges', 'US-422 multi-family', 'HOA villages'],
        housingTypes: 'HOA SFH, multi-family, townhomes',
        challenges: ['HOA rules', 'US-422 congestion', 'Long portal time to Reading core'],
        moverTips: 'Collect HOA packets. Build arterial buffer.',
        keywords: ['wyomissing', 'sinking spring', 'west reading'],
      },
      {
        id: 'east-corridors',
        name: 'Eastern corridors & small towns',
        shortName: 'East corridors',
        neighborhoods: ['Exeter', 'Birdsboro edges', 'US-422 east multi-family'],
        housingTypes: 'SFH, multi-family, twins',
        challenges: ['Arterial congestion', 'Mixed access types', 'Longer empty miles'],
        moverTips: 'Prefer early starts. Survey driveway depth.',
        keywords: ['exeter', 'birdsboro', 'st. lawrence'],
      },
      {
        id: 'rural-edges',
        name: 'Northern & southern rural edges',
        shortName: 'Rural edges',
        neighborhoods: ['Kutztown edges', 'Southern tracts', 'Rural driveway lots'],
        housingTypes: 'SFH, rural-edge lots',
        challenges: ['Long empty miles', 'Soft surfaces after rain', 'Limited alternate routes'],
        moverTips: 'Survey truck access. Prefer early starts for long pairs.',
        keywords: ['kutztown', 'rural berks'],
      },
    ],
    specialized: [
      {
        id: 'us222-i78',
        title: 'US-222 / I-78 freeflow module',
        intro:
          'Mid-state pairs burn portal-to-portal time even when map miles look short.',
        bullets: [
          'Price 222 and I-78 peaks honestly for Reading ↔ Lehigh pairs.',
          'Build buffer for US-422 retail corridors on weekends.',
          'Clarify Lehigh or Lancaster second addresses for drive-time and authority.',
        ],
      },
      {
        id: 'reading-hills',
        title: 'Reading city hills & multi-story access',
        intro: 'City stairs and grades need inventories different from township playbooks.',
        bullets: [
          'Measure streets and floor counts before promising full trailers.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'township-hoa',
        title: 'Western township HOA & soft costs',
        intro: 'HOA packets and gate lists are standard survey inputs west of Reading.',
        bullets: [
          'Collect COI and approved-hour rules before the estimate is final.',
          'Saturday HOA windows push demand into peak crew slots.',
        ],
      },
    ],
    schoolsIntro:
      'Berks families often compare Reading, Wilson, Governor Mifflin, Exeter, and other districts — boundaries are address-specific.',
    hospitalsDetail:
      'Reading Hospital (Tower Health) and related campuses anchor acute care; map ER times at US-222 / US-422 peak.',
    costIntro:
      'City hills/stairs, US-222 freeflow, and township empty miles often matter more than raw miles.',
    seasonalIntro:
      'School years, lease ends, and winter grades reshape demand by pocket.',
  },
  {
    file: 'cumberland-pa.ts',
    exportName: 'cumberlandCountyTier2Intelligence',
    slug: 'cumberland',
    hubTitle: 'Cumberland County Moving Intelligence Hub',
    eyebrow: 'Cumberland · Carlisle / Mechanicsburg — Harrisburg west collar',
    h1: 'Moving in Cumberland County: Carlisle, Mechanicsburg & West-Shore I-81 Growth',
    heroOpener:
      'Cumberland County is Harrisburg’s west-shore growth collar — Carlisle seat multi-story and college-adjacent stock, Mechanicsburg and Hampden suburban belts, Camp Hill river-edge density, and I-81 / Turnpike freeflow that still peaks toward Dauphin. It is not Dauphin east-bank capital core renamed: expect west-shore HOA growth, military and college calendars, and longer empty miles to western lots. This guide is for people moving in Cumberland as Harrisburg west collar — not a recycled Dauphin Tier 1 script.',
    heroCredibility:
      'Harrisburg west collar · West-shore growth · I-81 / Turnpike · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-81 · I-76 Turnpike · US-11 · PA-581 · PA-114 · PA-34',
    parentLabel: 'Dauphin County',
    parentHref: '/local-movers/pennsylvania/dauphin',
    compareIntro:
      'Cumberland is Harrisburg west-shore growth product on I-81 / Turnpike — not Dauphin capital-core multi-story alone and not pure rural mid-state freeflow.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dauphin crews fight capital arterials and east-shore peaks. Cumberland pairs ride I-81, PA-581, US-11, and the Turnpike — freer mid-day west of the river, still peak-heavy on west-shore commute windows into Harrisburg.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dauphin mixes capital multi-story and east-shore suburbs. Cumberland mixes Carlisle multi-story, Mechanicsburg HOA growth, and western larger lots — more planned-suburb product, less continuous capital-core density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'West-shore HOAs need packets and approved hours; Carlisle older blocks need curb plans uncommon on pure driveway SFH jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Cumberland quotes often track capital-suburb rates for driveway SFH — HOA soft costs and I-81 peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Cumberland is Harrisburg west-shore growth collar — not Dauphin capital/education core renamed.',
      },
    ],
    whatIntro:
      'West-shore growth, I-81 freeflow, and HOA soft costs — not interchangeable Dauphin boilerplate.',
    whatBullets: [
      {
        title: 'I-81 / Turnpike freeflow is still billable',
        detail:
          'West-shore ↔ Dauphin pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Mechanicsburg / Hampden HOA is first-class product',
        detail:
          'Planned suburbs treat COI and approved hours as standard survey inputs.',
      },
      {
        title: 'Carlisle multi-story and college calendars matter',
        detail:
          'Seat density and Dickinson-adjacent turnover need stair inventories and term-aware booking.',
      },
      {
        title: 'MD / interstate adjacency creates FMCSA legs',
        detail:
          'Out-of-state addresses flip jobs to interstate authority even when the Cumberland side feels local.',
      },
    ],
    zonesHeading:
      'Cumberland zones: Carlisle seat, Mechanicsburg growth, Camp Hill river edge & west lots',
    zonesIntro:
      'Two to four sharp products — seat core, growth suburbs, river edge, and western lots price differently.',
    zones: [
      {
        id: 'carlisle-seat',
        name: 'Carlisle seat multi-story & college edges',
        shortName: 'Carlisle',
        neighborhoods: ['Carlisle', 'downtown', 'college edges'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'Term calendars'],
        moverTips: 'Inventory stairs; plan temporary no-parking; avoid peak term weekends.',
        keywords: ['carlisle'],
      },
      {
        id: 'mechanicsburg-growth',
        name: 'Mechanicsburg / Hampden growth belt',
        shortName: 'Mechanicsburg growth',
        neighborhoods: ['Mechanicsburg', 'Hampden', 'Silver Spring edges'],
        housingTypes: 'HOA SFH, townhomes, apartments',
        challenges: ['HOA packets', 'I-81 peaks', 'Lease clusters'],
        moverTips: 'Collect HOA COIs; build buffer for I-81 commute peaks.',
        keywords: ['mechanicsburg', 'hampden', 'silver spring'],
      },
      {
        id: 'camp-hill-edge',
        name: 'Camp Hill / east river edge',
        shortName: 'Camp Hill edge',
        neighborhoods: ['Camp Hill', 'Lemoyne edges', 'Wormleysburg edges'],
        housingTypes: 'SFH, multi-family, some multi-story',
        challenges: ['River-bridge freeflow', 'Tight older streets'],
        moverTips: 'Build bridge-peak buffers; measure older block access.',
        keywords: ['camp hill', 'lemoyne', 'wormleysburg'],
      },
      {
        id: 'west-lots',
        name: 'Western larger lots & rural edges',
        shortName: 'West Cumberland',
        neighborhoods: ['Shippensburg edges', 'Newville edges', 'western townships'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Soft shoulders', 'Winter ice'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['shippensburg', 'newville', 'rural cumberland'],
      },
    ],
    specialized: [
      {
        id: 'west-shore-growth',
        title: 'West-shore HOA growth module',
        intro: 'Mechanicsburg–Hampden planned suburbs dominate west-collar product.',
        bullets: [
          'Collect HOA packets before the estimate is final.',
          'Price I-81 portal-to-portal time to Dauphin honestly.',
        ],
      },
      {
        id: 'i81-turnpike',
        title: 'I-81 / Turnpike freeflow',
        intro: 'Capital-oriented pairs still peak hard.',
        bullets: [
          'Clarify Dauphin second addresses for drive-time assumptions.',
          'Turnpike and I-81 peaks rewrite short-looking locals.',
        ],
      },
      {
        id: 'carlisle-access',
        title: 'Carlisle multi-story & college access',
        intro: 'Seat density and term calendars are first-class cost drivers.',
        bullets: [
          'Inventory stairs and street width downtown.',
          'Book early around college move-in/out weekends.',
        ],
      },
    ],
    schoolsIntro:
      'Cumberland families compare Carlisle, Cumberland Valley, Mechanicsburg, Camp Hill, and other districts — verify address boundaries.',
    hospitalsDetail:
      'UPMC Carlisle, Penn State Health west-shore campuses, and Harrisburg specialty spillover serve the county; map peak I-81 / bridge times.',
    costIntro:
      'HOA soft costs, I-81 freeflow, and seat multi-story access often matter more than raw miles.',
    seasonalIntro:
      'School years, college terms, and winter ice reshape demand more than pure capital-session calendars.',
  },
  {
    file: 'westmoreland-pa.ts',
    exportName: 'westmorelandCountyTier2Intelligence',
    slug: 'westmoreland',
    hubTitle: 'Westmoreland County Moving Intelligence Hub',
    eyebrow: 'Westmoreland · Greensburg / Hempfield — Pittsburgh east',
    h1: 'Moving in Westmoreland County: Greensburg, Hempfield & East-Metro Turnpike Access',
    heroOpener:
      'Westmoreland County is Pittsburgh’s eastern metro collar — Greensburg multi-unit and seat stock, Hempfield and Murrysville suburban belts, Latrobe and Jeannette small-city edges, and Turnpike / US-30 freeflow that still peaks toward Allegheny. It is not Pittsburgh neighborhood micro-markets renamed: expect longer empty miles from city yards, east-metro HOA product, and town cores that stage differently from South Hills stairs or North Hills elevators. This guide is for people moving in Westmoreland as Pittsburgh east collar — not a recycled Allegheny Tier 1 pack.',
    heroCredibility:
      'Pittsburgh east metro · Greensburg / Hempfield · Turnpike / US-30 · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-76 Turnpike · US-30 · PA-66 · I-70 links · PA-119 · US-22 edges',
    parentLabel: 'Allegheny County',
    parentHref: '/local-movers/pennsylvania/allegheny',
    compareIntro:
      'Westmoreland is Pittsburgh east-metro product on Turnpike / US-30 — not Allegheny city hills/stairs or South Hills density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Allegheny crews fight city one-ways, tunnels, and dense South/North Hills peaks. Westmoreland pairs ride the Turnpike, US-30, and PA-66 — freer mid-day east of the city, still peak-heavy toward Allegheny portals and Greensburg arterials. Empty miles from Pittsburgh yards are first-class.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Allegheny mixes elevators, hillside stairs, and dense multi-family. Westmoreland mixes Greensburg multi-unit, Hempfield HOA SFH, and eastern small-city stock — more empty-mile suburbs, less continuous city-stair product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-unit needs curb plans; rural-edge lots trade that for driveway length and soft shoulders rare on inner Allegheny jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Westmoreland quotes often sit near or slightly below dense Allegheny urban rates for driveway SFH — empty miles from city yards and multi-unit access still erase “cheap eastern suburb” assumptions.',
      },
      {
        title: 'Role difference',
        detail:
          'Westmoreland is Pittsburgh east-metro collar — not Allegheny city/neighborhood product renamed.',
      },
    ],
    whatIntro:
      'East-metro empty miles, Turnpike freeflow, and town multi-unit — not interchangeable Pittsburgh boilerplate.',
    whatBullets: [
      {
        title: 'Longer empty miles from Pittsburgh yards are real',
        detail:
          'Even “local” Westmoreland pairs can price as distance work for city-based crews. Ask portal-to-portal.',
      },
      {
        title: 'Turnpike / US-30 freeflow is still billable',
        detail:
          'East-metro pairs freer mid-day still peak hard toward Allegheny. Build corridor buffers.',
      },
      {
        title: 'Greensburg multi-unit differs from Hempfield HOA',
        detail:
          'Seat stairs and curb plans need inventories different from cul-de-sac SFH.',
      },
      {
        title: 'Eastern small cities and rural edges add last-mile risk',
        detail:
          'Latrobe, Jeannette, and far townships reject full-trailer assumptions from Murrysville driveways.',
      },
    ],
    zonesHeading:
      'Westmoreland zones: Greensburg seat, Hempfield/Murrysville west, eastern small cities & rural edges',
    zonesIntro:
      'Two to four sharp products — seat multi-unit, west suburbs, eastern towns, and rural edges price differently.',
    zones: [
      {
        id: 'greensburg-seat',
        name: 'Greensburg multi-unit & older stock',
        shortName: 'Greensburg',
        neighborhoods: ['Greensburg', 'downtown', 'seat multi-family'],
        housingTypes: 'Multi-unit, multi-story, older SFH',
        challenges: ['Stairs', 'Street parking', 'Mixed curb access'],
        moverTips: 'Inventory stairs; plan temporary no-parking; prefer mid-week mornings.',
        keywords: ['greensburg'],
      },
      {
        id: 'hempfield-west',
        name: 'Hempfield / Murrysville west belt',
        shortName: 'Hempfield west',
        neighborhoods: ['Hempfield', 'Murrysville', 'Export edges', 'Delmont edges'],
        housingTypes: 'HOA SFH, townhomes, some multi-family',
        challenges: ['HOA packets', 'Turnpike / US-30 peaks', 'Long portal time to city'],
        moverTips: 'Collect HOA docs; build Turnpike buffer for Allegheny pairs.',
        keywords: ['hempfield', 'murrysville', 'export', 'delmont'],
      },
      {
        id: 'east-small-cities',
        name: 'Latrobe / Jeannette / eastern small cities',
        shortName: 'East small cities',
        neighborhoods: ['Latrobe', 'Jeannette', 'New Kensington edges', 'Monessen edges'],
        housingTypes: 'Multi-unit, twins, older SFH',
        challenges: ['Mixed access', 'Arterial timing', 'Empty miles'],
        moverTips: 'Survey driveway and street width; prefer early starts for long pairs.',
        keywords: ['latrobe', 'jeannette', 'new kensington', 'monessen'],
      },
      {
        id: 'rural-edges',
        name: 'Southern & eastern rural edges',
        shortName: 'Rural Westmoreland',
        neighborhoods: ['Donegal edges', 'Ligonier edges', 'rural townships'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Long empty miles', 'Soft shoulders', 'Winter grades'],
        moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
        keywords: ['donegal', 'ligonier', 'rural westmoreland'],
      },
    ],
    specialized: [
      {
        id: 'east-metro-empty-miles',
        title: 'East-metro empty miles module',
        intro: 'Pittsburgh-yard crews often price Westmoreland as distance work.',
        bullets: [
          'Ask whether quotes are portal-to-portal from Allegheny staging.',
          'Clarify second-address city vs east-county freeflow assumptions.',
        ],
      },
      {
        id: 'turnpike-us30',
        title: 'Turnpike / US-30 freeflow',
        intro: 'East-metro pairs still peak hard toward Allegheny.',
        bullets: [
          'Build corridor buffers for morning and evening peaks.',
          'US-30 retail corridors punish Saturday midday crews.',
        ],
      },
      {
        id: 'seat-multiunit',
        title: 'Greensburg seat multi-unit access',
        intro: 'Seat stairs and curb plans are first-class cost drivers.',
        bullets: [
          'Inventory floor counts before comparing hourly rates.',
          'Temporary no-parking often beats long carries.',
        ],
      },
    ],
    schoolsIntro:
      'Westmoreland families compare Greensburg Salem, Hempfield, Franklin Regional, Norwin, and other districts — verify address boundaries.',
    hospitalsDetail:
      'Excela Health (Westmoreland / Latrobe) and Allegheny specialty spillover serve the county; map peak Turnpike / US-30 times for ER access.',
    costIntro:
      'Empty miles from Pittsburgh yards, Turnpike freeflow, and multi-unit access often matter more than raw miles.',
    seasonalIntro:
      'School years, lease ends, and winter grades reshape demand by pocket.',
  },
  {
    file: 'washington-pa.ts',
    exportName: 'washingtonCountyTier2Intelligence',
    slug: 'washington',
    hubTitle: 'Washington County Moving Intelligence Hub',
    eyebrow: 'Washington · South Hills edge — Pittsburgh south',
    h1: 'Moving in Washington County: Washington City, South Hills Edge & I-70/I-79 South Collar',
    heroOpener:
      'Washington County is Pittsburgh’s southern collar and South Hills edge — Washington city multi-story stock, Peters and Canonsburg growth belts, McMurray HOA density, and I-70 / I-79 freeflow that still peaks toward Allegheny. It is not South Hills stairs with freer freeways alone: expect south-collar empty miles, mixed small-city product, and WV-adjacent interstate risk under one county label. This guide is for people moving in Washington as Pittsburgh south collar — not a recycled Allegheny pack.',
    heroCredibility:
      'Pittsburgh south collar · South Hills edge · I-70 / I-79 · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-70 · I-79 · US-19 · US-40 · PA-18 · PA-50',
    parentLabel: 'Allegheny County',
    parentHref: '/local-movers/pennsylvania/allegheny',
    compareIntro:
      'Washington is Pittsburgh south collar on I-70 / I-79 — not Allegheny dense South Hills stairs alone and not pure rural southwest freeflow.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Allegheny crews fight city peaks and South Hills choke points. Washington pairs ride I-79, I-70, and US-19 — freer mid-day south of the city, still peak-heavy toward Allegheny portals and Peters/Canonsburg corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Allegheny South Hills mixes stairs and dense multi-family. Washington mixes Peters HOA growth, Washington city multi-story, and western larger lots — more south-collar empty miles, less continuous city-hill product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Growth-belt HOAs need packets; city cores need curb plans; WV-border edges add last-mile freeflow uncommon on inner South Hills jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Washington quotes often sit near south-metro suburb rates for driveway SFH — empty miles and multi-story access still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Washington is Pittsburgh south collar — not Allegheny South Hills product renamed.',
      },
    ],
    whatIntro:
      'I-70 / I-79 freeflow, south-collar growth, and city multi-story — not interchangeable Allegheny boilerplate.',
    whatBullets: [
      {
        title: 'I-79 / I-70 freeflow is still billable',
        detail:
          'South-collar ↔ Allegheny pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Peters / Canonsburg HOA growth is first-class product',
        detail:
          'Planned suburbs treat COI and approved hours as standard survey inputs.',
      },
      {
        title: 'Washington city multi-story needs stair inventories',
        detail:
          'Seat density fails when crews assume pure driveway SFH rates.',
      },
      {
        title: 'WV adjacency creates interstate legs',
        detail:
          'West Virginia addresses require FMCSA authority even on short-looking hops.',
      },
    ],
    zonesHeading:
      'Washington zones: city seat, Peters/Canonsburg growth, US-19 corridor & western edges',
    zonesIntro:
      'Two to four sharp products — seat multi-story, growth HOAs, corridor stock, and western edges.',
    zones: [
      {
        id: 'washington-city',
        name: 'Washington city multi-story & older stock',
        shortName: 'Washington city',
        neighborhoods: ['Washington', 'downtown', 'city multi-family'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'Mixed curb access'],
        moverTips: 'Inventory stairs; plan temporary no-parking.',
        keywords: ['washington pa', 'washington'],
      },
      {
        id: 'peters-canonsburg',
        name: 'Peters / Canonsburg growth belt',
        shortName: 'Peters growth',
        neighborhoods: ['Peters Township', 'Canonsburg', 'McMurray', 'McDonald edges'],
        housingTypes: 'HOA SFH, townhomes, apartments',
        challenges: ['HOA packets', 'I-79 peaks', 'Lease clusters'],
        moverTips: 'Collect HOA COIs; build I-79 commute buffers.',
        keywords: ['peters', 'canonsburg', 'mcmurray'],
      },
      {
        id: 'us19-corridor',
        name: 'US-19 / south corridor towns',
        shortName: 'US-19 corridor',
        neighborhoods: ['Houston', 'Cecil edges', 'South Strabane edges'],
        housingTypes: 'SFH, multi-family, mixed stock',
        challenges: ['Arterial timing', 'Mixed access'],
        moverTips: 'Prefer early starts; confirm driveway depth.',
        keywords: ['houston', 'cecil', 'south strabane'],
      },
      {
        id: 'west-edges',
        name: 'Western & border edges',
        shortName: 'West edges',
        neighborhoods: ['Charleroi edges', 'Monongahela edges', 'WV approaches'],
        housingTypes: 'Older SFH, multi-unit, rural approaches',
        challenges: ['Empty miles', 'Interstate authority risk', 'Soft shoulders'],
        moverTips: 'Clarify WV second addresses; photo approaches.',
        keywords: ['charleroi', 'monongahela', 'rural washington'],
      },
    ],
    specialized: [
      {
        id: 'i70-i79-south',
        title: 'I-70 / I-79 south-collar freeflow',
        intro: 'South-metro pairs still peak hard toward Allegheny.',
        bullets: [
          'Price portal-to-portal time honestly for Washington ↔ Allegheny legs.',
          'Clarify WV second addresses for interstate authority.',
        ],
      },
      {
        id: 'south-hills-edge-growth',
        title: 'South Hills edge HOA growth',
        intro: 'Peters–Canonsburg planned density is the south-collar product.',
        bullets: [
          'Collect HOA packets before the estimate is final.',
          'Saturday HOA windows push demand into peak crew slots.',
        ],
      },
      {
        id: 'city-stairs',
        title: 'Washington city multi-story access',
        intro: 'Seat stairs are a first-class cost driver.',
        bullets: [
          'Inventory floor counts before comparing hourly rates.',
          'Temporary no-parking often beats long carries.',
        ],
      },
    ],
    schoolsIntro:
      'Washington families compare Peters Township, Canon-McMillan, Trinity, Chartiers-Houston, and other districts — verify boundaries.',
    hospitalsDetail:
      'Washington Health System and Allegheny specialty spillover serve the county; map peak I-79 times for ER access.',
    costIntro:
      'I-79 freeflow, HOA soft costs, and city multi-story access often matter more than raw miles.',
    seasonalIntro:
      'School years, lease ends, and winter ice reshape demand by pocket.',
  },
  {
    file: 'butler-pa.ts',
    exportName: 'butlerCountyTier2Intelligence',
    slug: 'butler',
    hubTitle: 'Butler County Moving Intelligence Hub',
    eyebrow: 'Butler · Butler / Cranberry edge — Pittsburgh north',
    h1: 'Moving in Butler County: Butler City, Cranberry Edge & I-79 North Growth',
    heroOpener:
      'Butler County is Pittsburgh’s northern growth collar — Cranberry Township HOA and multi-family density, Butler city multi-story stock, Zelienople and Adams Township corridors, and I-79 / Turnpike freeflow that still peaks toward Allegheny. It is not North Hills elevators renamed: expect north-collar growth calendars, longer empty miles from city yards, and seat multi-unit that stages differently from Cranberry cul-de-sacs. This guide is for people moving in Butler as Pittsburgh north collar — not a recycled Allegheny pack.',
    heroCredibility:
      'Pittsburgh north collar · Cranberry growth · I-79 / Turnpike · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-79 · I-76 Turnpike · US-19 · PA-8 · PA-228 · PA-68',
    parentLabel: 'Allegheny County',
    parentHref: '/local-movers/pennsylvania/allegheny',
    compareIntro:
      'Butler is Pittsburgh north-collar growth on I-79 / Turnpike — not Allegheny North Hills elevators alone and not pure rural northwest freeflow.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Allegheny crews fight North Hills peaks and city approaches. Butler pairs ride I-79, PA-228, and the Turnpike — freer mid-day north of the city, still peak-heavy on Cranberry ↔ Allegheny commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Allegheny North Hills mixes elevators and dense multi-family. Butler mixes Cranberry planned SFH, Butler city multi-story, and northern larger lots — more growth-collar HOA product, less continuous city density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Cranberry HOAs need packets and arterial timing; Butler seat cores need curb plans uncommon on pure cul-de-sac jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Butler quotes often track north-metro suburb rates for driveway SFH — Cranberry HOA soft costs and empty miles from city yards still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Butler is Pittsburgh north growth collar — not Allegheny North Hills product renamed.',
      },
    ],
    whatIntro:
      'Cranberry growth, I-79 freeflow, and seat multi-story — not interchangeable Allegheny boilerplate.',
    whatBullets: [
      {
        title: 'I-79 / Turnpike freeflow is still billable',
        detail:
          'Cranberry ↔ Allegheny pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Cranberry HOA and multi-family are first-class product',
        detail:
          'Planned suburbs treat COI, elevators, and approved hours as standard survey inputs.',
      },
      {
        title: 'Butler city multi-story differs from growth-belt SFH',
        detail:
          'Seat stairs and curb plans need inventories different from PA-228 cul-de-sacs.',
      },
      {
        title: 'Northern empty miles price as distance work',
        detail:
          'Far townships fail when crews assume Cranberry day rates.',
      },
    ],
    zonesHeading:
      'Butler zones: Cranberry growth, Butler city seat, US-19 corridor & northern lots',
    zonesIntro:
      'Two to four sharp products — growth HOAs, seat multi-story, corridor stock, and northern lots.',
    zones: [
      {
        id: 'cranberry-growth',
        name: 'Cranberry / south growth belt',
        shortName: 'Cranberry growth',
        neighborhoods: ['Cranberry Township', 'Seven Fields', 'Mars edges', 'Adams edges'],
        housingTypes: 'HOA SFH, townhomes, apartments',
        challenges: ['HOA packets', 'I-79 / PA-228 peaks', 'Lease clusters'],
        moverTips: 'Collect HOA COIs; build I-79 commute buffers.',
        keywords: ['cranberry', 'seven fields', 'mars', 'adams'],
      },
      {
        id: 'butler-city',
        name: 'Butler city multi-story & older stock',
        shortName: 'Butler city',
        neighborhoods: ['Butler', 'downtown', 'city multi-family'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'Mixed curb access'],
        moverTips: 'Inventory stairs; plan temporary no-parking.',
        keywords: ['butler'],
      },
      {
        id: 'us19-corridor',
        name: 'US-19 / Zelienople corridor',
        shortName: 'US-19 corridor',
        neighborhoods: ['Zelienople', 'Harmony edges', 'Evans City edges'],
        housingTypes: 'SFH, multi-family, mixed stock',
        challenges: ['Arterial timing', 'Mixed access'],
        moverTips: 'Prefer early starts; confirm driveway depth.',
        keywords: ['zelienople', 'harmony', 'evans city'],
      },
      {
        id: 'north-lots',
        name: 'Northern larger lots & rural edges',
        shortName: 'North Butler',
        neighborhoods: ['Slippery Rock edges', 'Prospect edges', 'northern townships'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Soft shoulders', 'Winter ice'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['slippery rock', 'prospect', 'rural butler'],
      },
    ],
    specialized: [
      {
        id: 'cranberry-growth',
        title: 'Cranberry north-collar growth module',
        intro: 'Cranberry planned density is the north-collar product.',
        bullets: [
          'Collect HOA packets and elevator rules before the estimate is final.',
          'Price I-79 portal-to-portal time to Allegheny honestly.',
        ],
      },
      {
        id: 'i79-turnpike-north',
        title: 'I-79 / Turnpike north freeflow',
        intro: 'North-metro pairs still peak hard toward Allegheny.',
        bullets: [
          'Build corridor buffers for morning and evening peaks.',
          'Clarify Allegheny second addresses for drive-time assumptions.',
        ],
      },
      {
        id: 'butler-seat',
        title: 'Butler city multi-story access',
        intro: 'Seat stairs are a first-class cost driver.',
        bullets: [
          'Inventory floor counts before comparing hourly rates.',
          'Temporary no-parking often beats long carries.',
        ],
      },
    ],
    schoolsIntro:
      'Butler families compare Seneca Valley, Butler Area, Mars, Slippery Rock, and other districts — verify address boundaries.',
    hospitalsDetail:
      'Butler Memorial / Independence Health and Allegheny specialty spillover serve the county; map peak I-79 times for ER access.',
    costIntro:
      'Cranberry HOA soft costs, I-79 freeflow, and seat multi-story access often matter more than raw miles.',
    seasonalIntro:
      'School years, growth-lease calendars, and winter ice reshape demand by pocket.',
  },
  {
    file: 'beaver-pa.ts',
    exportName: 'beaverCountyTier2Intelligence',
    slug: 'beaver',
    hubTitle: 'Beaver County Moving Intelligence Hub',
    eyebrow: 'Beaver · Beaver / Ohio River — Pittsburgh west',
    h1: 'Moving in Beaver County: Beaver Valley, Ohio River Towns & Pittsburgh West Edge',
    heroOpener:
      'Beaver County is Pittsburgh’s western Ohio River collar — Beaver and Beaver Falls multi-story stock, Center Township and Chippewa suburban belts, Ambridge and Aliquippa river-town density, and freeflow that still peaks toward Allegheny with PA/OH interstate risk at the edge. It is not Pittsburgh West End hills renamed: expect river-town stairs, longer empty miles from city yards, and Ohio-adjacent authority questions under one county label. This guide is for people moving in Beaver as Pittsburgh west collar — not a recycled Allegheny pack.',
    heroCredibility:
      'Pittsburgh west collar · Ohio River towns · PA/OH edge · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-376 · PA-60 · PA-65 · PA-51 · US-30 edges · Ohio River bridges',
    parentLabel: 'Allegheny County',
    parentHref: '/local-movers/pennsylvania/allegheny',
    compareIntro:
      'Beaver is Pittsburgh west Ohio River collar — not Allegheny city hills alone and not pure rural northwest freeflow.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Allegheny crews fight city peaks and western approaches. Beaver pairs ride I-376, PA-65, and PA-60 — freer mid-day west of the city, still peak-heavy toward Allegheny portals and river-bridge windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Allegheny mixes elevators and hillside multi-family. Beaver mixes river-town multi-story, Center/Chippewa SFH, and northern lots — more Ohio River older stock, less continuous city density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'River-town streets need curb plans and stair inventories; suburban belts trade that for driveway staging; OH addresses flip authority.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Beaver quotes often sit near west-metro secondary rates for driveway SFH — multi-story river towns and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Beaver is Pittsburgh west Ohio River collar — not Allegheny city product renamed.',
      },
    ],
    whatIntro:
      'Ohio River multi-story, west-collar freeflow, and PA/OH authority risk — not interchangeable Allegheny boilerplate.',
    whatBullets: [
      {
        title: 'River-town multi-story is first-class product',
        detail:
          'Stairs and tight streets need inventories different from Center Township cul-de-sacs.',
      },
      {
        title: 'I-376 / PA-65 freeflow is still billable',
        detail:
          'West-collar ↔ Allegheny pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Ohio adjacency creates interstate legs',
        detail:
          'Ohio addresses require FMCSA authority even on short-looking hops.',
      },
      {
        title: 'Empty miles from Pittsburgh yards are real',
        detail:
          'Even “local” Beaver pairs can price as distance work for city-based crews.',
      },
    ],
    zonesHeading:
      'Beaver zones: river towns, Center/Chippewa belt, Beaver seat corridor & northern edges',
    zonesIntro:
      'Two to four sharp products — river multi-story, suburban belts, seat corridor, and northern edges.',
    zones: [
      {
        id: 'river-towns',
        name: 'Ohio River towns multi-story',
        shortName: 'River towns',
        neighborhoods: ['Ambridge', 'Aliquippa', 'Monaca', 'Rochester edges'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Tight streets', 'Bridge freeflow'],
        moverTips: 'Inventory stairs; plan temporary no-parking; build bridge-peak buffers.',
        keywords: ['ambridge', 'aliquippa', 'monaca', 'rochester'],
      },
      {
        id: 'center-chippewa',
        name: 'Center / Chippewa suburban belt',
        shortName: 'Center / Chippewa',
        neighborhoods: ['Center Township', 'Chippewa', 'Beaver Falls edges'],
        housingTypes: 'Suburban SFH, townhomes, some multi-family',
        challenges: ['HOA packets', 'Arterial timing', 'Mixed stock'],
        moverTips: 'Collect HOA docs where applicable; prefer early starts.',
        keywords: ['center township', 'chippewa', 'beaver falls'],
      },
      {
        id: 'beaver-seat',
        name: 'Beaver / seat corridor',
        shortName: 'Beaver seat',
        neighborhoods: ['Beaver', 'Bridgewater edges', 'seat multi-family'],
        housingTypes: 'Multi-story, SFH, multi-unit',
        challenges: ['Street parking', 'Stairs', 'Mixed curb access'],
        moverTips: 'Measure streets; inventory carries.',
        keywords: ['beaver'],
      },
      {
        id: 'north-edges',
        name: 'Northern edges & larger lots',
        shortName: 'North Beaver',
        neighborhoods: ['New Brighton edges', 'Koppel edges', 'northern townships'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Soft shoulders', 'Winter ice'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['new brighton', 'koppel', 'rural beaver'],
      },
    ],
    specialized: [
      {
        id: 'ohio-river-access',
        title: 'Ohio River multi-story access',
        intro: 'River-town stairs and tight streets are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and street width before comparing hourly rates.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'pa-oh-edge',
        title: 'PA / OH edge interstate module',
        intro: 'Ohio second addresses flip jobs to FMCSA authority.',
        bullets: [
          'Verify interstate authority before deposits on OH legs.',
          'Clarify portal-to-portal time for west-collar freeflow.',
        ],
      },
      {
        id: 'west-collar-freeflow',
        title: 'Pittsburgh west-collar freeflow',
        intro: 'I-376 / PA-65 pairs to Allegheny still peak hard.',
        bullets: [
          'Price empty miles from city yards honestly.',
          'Build buffers for river-bridge peaks.',
        ],
      },
    ],
    schoolsIntro:
      'Beaver families compare Blackhawk, Beaver Area, Central Valley, Hopewell, and other districts — verify address boundaries.',
    hospitalsDetail:
      'Heritage Valley and Allegheny specialty spillover serve the county; map peak freeflow and bridge times for ER access.',
    costIntro:
      'River-town stairs, west-collar freeflow, and empty miles often matter more than raw miles.',
    seasonalIntro:
      'School years, lease ends, and winter ice reshape demand by pocket.',
  },
];

// Remaining 6 packs
const more: PackDef[] = [
  {
    file: 'lackawanna-pa.ts',
    exportName: 'lackawannaCountyTier2Intelligence',
    slug: 'lackawanna',
    hubTitle: 'Lackawanna County Moving Intelligence Hub',
    eyebrow: 'Lackawanna · Scranton — NEPA hub independent',
    h1: 'Moving in Lackawanna County: Scranton, I-81 Medical Hub & Northeast PA Independent Access',
    heroOpener:
      'Lackawanna County is an independent Northeast PA hub — Scranton multi-story and older stock, Dunmore and Dickson City corridors, Clarks Summit suburban belts, and I-81 freeflow that does not answer to Philly, Pittsburgh, or Lehigh Valley scripts. It is not a SEPA rename and not an Allentown industrial multi-family pack with different labels: expect medical and university calendars, valley-city stairs, and longer empty miles to Abingtons and rural edges. This guide is for people moving in Lackawanna as a Scranton / NEPA independent market — not recycled Lehigh or SEPA packs.',
    heroCredibility:
      'NEPA independent hub · Scranton medical/university · I-81 freeflow · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-81 · I-84 · I-380 · US-6 · PA-307 · PA-347',
    parentLabel: 'independent Northeast PA (vs Lehigh Valley / SEPA defaults)',
    parentHref: '/local-movers/pennsylvania/lehigh',
    compareIntro:
      'Lackawanna is a NEPA independent Scranton hub — not Lehigh Valley Allentown product and not SEPA Philly-collar freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lehigh crews fight I-78 Valley peaks. Lackawanna pairs ride I-81, I-84, and US-6 — freer mid-day NEPA freeflow, still peak-heavy on Scranton arterials and medical-campus windows. Portal-to-portal time is real; it is not an Allentown day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lehigh mixes Allentown multi-unit and township growth. Lackawanna mixes Scranton multi-story, Clarks Summit SFH, and valley-city twins — independent NEPA density, not Valley industrial multi-family renamed.',
      },
      {
        title: 'Truck access & density',
        detail:
          'City hills and multi-story stock need stair inventories; Abingtons lots trade that for driveway staging; winter ice is first-class.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Lackawanna quotes often sit at secondary NEPA rates for driveway SFH — multi-story access and medical-calendar peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Lackawanna is NEPA independent Scranton hub — not Lehigh Valley or SEPA product renamed.',
      },
    ],
    whatIntro:
      'I-81 freeflow, medical/university calendars, and valley-city stairs — not interchangeable LV or SEPA boilerplate.',
    whatBullets: [
      {
        title: 'Scranton multi-story is first-class product',
        detail:
          'City stairs and hills need inventories different from Clarks Summit cul-de-sacs.',
      },
      {
        title: 'Medical and university calendars drive demand spikes',
        detail:
          'Hospital and campus windows create lease clusters that do not map to pure family Saturdays.',
      },
      {
        title: 'I-81 freeflow is still billable',
        detail:
          'Valley pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'NY / NJ adjacency creates interstate legs',
        detail:
          'Out-of-state addresses require FMCSA authority even on short-looking hops.',
      },
    ],
    zonesHeading:
      'Lackawanna zones: Scranton core, Dunmore corridor, Clarks Summit belt & valley edges',
    zonesIntro:
      'Two to four sharp products — city multi-story, valley corridor, suburban belt, and edges price differently.',
    zones: [
      {
        id: 'scranton-core',
        name: 'Scranton city multi-story & older stock',
        shortName: 'Scranton',
        neighborhoods: ['Scranton', 'downtown', 'west/east side edges'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Hills', 'Street parking'],
        moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
        keywords: ['scranton'],
      },
      {
        id: 'dunmore-corridor',
        name: 'Dunmore / Dickson City corridor',
        shortName: 'Dunmore corridor',
        neighborhoods: ['Dunmore', 'Dickson City', 'Throop edges'],
        housingTypes: 'Multi-unit, SFH, mixed stock',
        challenges: ['Arterial timing', 'Mixed access', 'I-81 peaks'],
        moverTips: 'Build I-81 buffers; confirm street width on older blocks.',
        keywords: ['dunmore', 'dickson city', 'throop'],
      },
      {
        id: 'clarks-summit-belt',
        name: 'Clarks Summit / Abingtons belt',
        shortName: 'Abingtons',
        neighborhoods: ['Clarks Summit', 'Clarks Green', 'South Abington edges'],
        housingTypes: 'Suburban SFH, some multi-family',
        challenges: ['HOA packets', 'Empty miles to city', 'Winter grades'],
        moverTips: 'Collect HOA docs where applicable; photo grades in winter.',
        keywords: ['clarks summit', 'clarks green', 'abingtons'],
      },
      {
        id: 'valley-edges',
        name: 'Valley edges & larger lots',
        shortName: 'Valley edges',
        neighborhoods: ['Old Forge edges', 'Moosic edges', 'northern townships'],
        housingTypes: 'SFH, rural approaches, mixed stock',
        challenges: ['Empty miles', 'Soft shoulders', 'Winter ice'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['old forge', 'moosic', 'rural lackawanna'],
      },
    ],
    specialized: [
      {
        id: 'scranton-stairs',
        title: 'Scranton multi-story & hills',
        intro: 'City stairs and grades are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and hill approaches.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'i81-nepa',
        title: 'I-81 NEPA freeflow',
        intro: 'Valley pairs still peak hard; independent of LV scripts.',
        bullets: [
          'Price portal-to-portal time honestly for Scranton corridor legs.',
          'Clarify NY/NJ second addresses for interstate authority.',
        ],
      },
      {
        id: 'medical-university',
        title: 'Medical & university calendar module',
        intro: 'Hospital and campus windows create lease clusters.',
        bullets: [
          'Book early around medical-hire and term calendars.',
          'Expect short-notice local demand spikes near campuses.',
        ],
      },
    ],
    schoolsIntro:
      'Lackawanna families compare Scranton, Abington Heights, Dunmore, Valley View, and other districts — verify boundaries.',
    hospitalsDetail:
      'Geisinger Community Medical Center, Regional Hospital of Scranton, and related campuses anchor acute care; map peak I-81 times.',
    costIntro:
      'City stairs, medical calendars, and I-81 freeflow often matter more than raw miles.',
    seasonalIntro:
      'School years, medical hire calendars, and winter ice reshape demand more than Philly or Pittsburgh patterns.',
  },
  {
    file: 'luzerne-pa.ts',
    exportName: 'luzerneCountyTier2Intelligence',
    slug: 'luzerne',
    hubTitle: 'Luzerne County Moving Intelligence Hub',
    eyebrow: 'Luzerne · Wilkes-Barre — NEPA pair with Scranton',
    h1: 'Moving in Luzerne County: Wilkes-Barre, Valley Cities & I-81 NEPA Pair Access',
    heroOpener:
      'Luzerne County is the Wilkes-Barre half of the NEPA pair — city multi-story and valley-city stock, Kingston and Plains corridors, Mountain Top and Back Mountain suburban belts, and I-81 freeflow distinct from Scranton’s medical-hub calendars. It is not Lackawanna with freer freeways: expect separate valley-city cores, Wyoming Valley multi-unit patterns, and empty miles to Hazleton and rural edges that do not map to Scranton day rates alone. This guide is for people moving in Luzerne as Wilkes-Barre / valley-city product — not a recycled Scranton pack.',
    heroCredibility:
      'Wilkes-Barre NEPA pair · Valley cities · I-81 freeflow · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-81 · PA-309 · US-11 · PA-115 · I-80 links · PA-29',
    parentLabel: 'Lackawanna County',
    parentHref: '/local-movers/pennsylvania/lackawanna',
    compareIntro:
      'Luzerne is Wilkes-Barre valley-city NEPA product — not Scranton medical-hub density alone and not interchangeable Lackawanna freeflow with different labels.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lackawanna crews fight Scranton arterials and I-81 north peaks. Luzerne pairs ride I-81, PA-309, and US-11 — freer mid-day between valley cities, still peak-heavy on Wilkes-Barre cores and Mountain Top freeflow. Portal-to-portal time between Scranton and Wilkes-Barre is real.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lackawanna mixes Scranton multi-story and Abingtons SFH. Luzerne mixes Wilkes-Barre multi-unit, Kingston corridors, Back Mountain lots, and Hazleton edges — more multi-valley-city product under one county label.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Valley-city cores need curb plans and stair inventories; Back Mountain lots trade that for driveway length and winter grades.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Luzerne quotes often track NEPA secondary rates for driveway SFH — multi-story access and long empty-mile south pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Luzerne is Wilkes-Barre / valley-city NEPA pair — not Scranton medical hub renamed.',
      },
    ],
    whatIntro:
      'Valley-city multi-unit, I-81 freeflow, and Back Mountain last-mile — not interchangeable Scranton boilerplate.',
    whatBullets: [
      {
        title: 'Wilkes-Barre multi-story is first-class product',
        detail:
          'City stairs need inventories different from Mountain Top cul-de-sacs.',
      },
      {
        title: 'Distinct from Scranton day-rate assumptions',
        detail:
          'Valley-city pairs and Hazleton edges fail when crews recycle Lackawanna-only logistics.',
      },
      {
        title: 'I-81 freeflow is still billable',
        detail:
          'Wilkes-Barre ↔ Scranton pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Hazleton and rural edges add empty miles',
        detail:
          'South-county pockets price differently from Kingston corridor rates.',
      },
    ],
    zonesHeading:
      'Luzerne zones: Wilkes-Barre core, Kingston corridor, Back Mountain belt & Hazleton edges',
    zonesIntro:
      'Two to four sharp products — city multi-story, valley corridor, suburban belt, and south edges.',
    zones: [
      {
        id: 'wilkes-barre-core',
        name: 'Wilkes-Barre city multi-story & older stock',
        shortName: 'Wilkes-Barre',
        neighborhoods: ['Wilkes-Barre', 'downtown', 'city multi-family'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'Arterial congestion'],
        moverTips: 'Inventory stairs; plan temporary no-parking; prefer mid-week mornings.',
        keywords: ['wilkes-barre', 'wilkes barre'],
      },
      {
        id: 'kingston-corridor',
        name: 'Kingston / Plains / Wyoming Valley corridor',
        shortName: 'Kingston corridor',
        neighborhoods: ['Kingston', 'Plains', 'Edwardsville edges', 'Wyoming edges'],
        housingTypes: 'Multi-unit, SFH, mixed stock',
        challenges: ['Arterial timing', 'Mixed access', 'I-81 peaks'],
        moverTips: 'Build I-81 buffers; confirm street width on older blocks.',
        keywords: ['kingston', 'plains', 'edwardsville', 'wyoming'],
      },
      {
        id: 'back-mountain',
        name: 'Mountain Top / Back Mountain belt',
        shortName: 'Back Mountain',
        neighborhoods: ['Mountain Top', 'Dallas', 'Trucksville edges', 'Shavertown edges'],
        housingTypes: 'Suburban SFH, larger lots',
        challenges: ['Grades', 'Winter ice', 'Empty miles to valley floor'],
        moverTips: 'Photo grades; winter mornings need flexibility.',
        keywords: ['mountain top', 'dallas', 'trucksville', 'shavertown'],
      },
      {
        id: 'hazleton-edges',
        name: 'Hazleton & southern edges',
        shortName: 'Hazleton edges',
        neighborhoods: ['Hazleton', 'West Hazleton edges', 'southern townships'],
        housingTypes: 'Multi-unit, SFH, mixed stock',
        challenges: ['Long empty miles', 'Mixed access', 'I-81 south freeflow'],
        moverTips: 'Prefer early starts for long pairs; survey driveway access.',
        keywords: ['hazleton', 'west hazleton', 'rural luzerne'],
      },
    ],
    specialized: [
      {
        id: 'valley-city-distinct',
        title: 'Wilkes-Barre valley-city vs Scranton',
        intro: 'Luzerne is a distinct NEPA pair market — not a Scranton rename.',
        bullets: [
          'Do not recycle Lackawanna-only day rates for Wilkes-Barre multi-story.',
          'Price Scranton ↔ Wilkes-Barre portal-to-portal time honestly.',
        ],
      },
      {
        id: 'i81-valley',
        title: 'I-81 valley freeflow',
        intro: 'Valley pairs still peak hard across NEPA cores.',
        bullets: [
          'Build corridor buffers for morning and evening peaks.',
          'Clarify Lackawanna second addresses for drive-time assumptions.',
        ],
      },
      {
        id: 'back-mountain-last-mile',
        title: 'Back Mountain last-mile & grades',
        intro: 'Mountain Top and Dallas lots punish valley-floor rate assumptions.',
        bullets: [
          'Photo grades and soft shoulders.',
          'Winter ice needs morning flexibility.',
        ],
      },
    ],
    schoolsIntro:
      'Luzerne families compare Wilkes-Barre Area, Wyoming Valley West, Dallas, Hazleton, and other districts — verify boundaries.',
    hospitalsDetail:
      'Geisinger Wyoming Valley, Wilkes-Barre General, and related campuses anchor acute care; map peak freeflow across the valley.',
    costIntro:
      'Valley-city stairs, I-81 freeflow, and Back Mountain empty miles often matter more than raw miles.',
    seasonalIntro:
      'School years, lease ends, and winter grades reshape demand by pocket.',
  },
  {
    file: 'centre-pa.ts',
    exportName: 'centreCountyTier2Intelligence',
    slug: 'centre',
    hubTitle: 'Centre County Moving Intelligence Hub',
    eyebrow: 'Centre · State College — Penn State independent',
    h1: 'Moving in Centre County: State College, Penn State Cycles & I-80 / US-322 Access',
    heroOpener:
      'Centre County is an independent central PA university market — State College multi-family and student density, College Township and Patton growth belts, Bellefonte seat edges, and I-80 / US-322 freeflow that does not answer to Harrisburg or Philly scripts. It is not a capital-suburb rename: expect term-driven move spikes, apartment COI packets, and longer empty miles to rural ridges under one county label. This guide is for people moving in Centre as a Penn State independent market — not recycled Dauphin mid-state packs.',
    heroCredibility:
      'Penn State independent · University move cycles · I-80 / US-322 · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-80 · US-322 · PA-26 · PA-45 · PA-144 · PA-150',
    parentLabel: 'independent central PA university (nearest mid-state hub: Dauphin)',
    parentHref: '/local-movers/pennsylvania/dauphin',
    compareIntro:
      'Centre is a central PA university independent market — not Harrisburg capital freeflow and not SEPA density alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dauphin crews fight capital arterials and I-81 peaks. Centre pairs ride I-80, US-322, and PA-26 — freer mid-day central PA freeflow, still peak-heavy on State College arterials and term move weekends. Portal-to-portal time is real; it is not a Harrisburg day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dauphin mixes capital multi-story and suburbs. Centre mixes student multi-family, State College SFH, and rural ridges — more university lease product, less continuous capital-core density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Apartment elevators and COI packets dominate near campus; ridge lots trade that for driveway length and winter ice.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Centre quotes often sit at secondary mid-state rates for driveway SFH — term peaks and multi-family access still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Centre is Penn State independent university market — not Dauphin capital product renamed.',
      },
    ],
    whatIntro:
      'University calendars, multi-family packets, and I-80 freeflow — not interchangeable capital boilerplate.',
    whatBullets: [
      {
        title: 'Penn State term calendars drive demand spikes',
        detail:
          'Move-in/out weekends fill local crews first — not only family Saturdays.',
      },
      {
        title: 'Student multi-family is first-class product',
        detail:
          'Elevators, COIs, and short-notice locals need inventories different from Bellefonte lots.',
      },
      {
        title: 'I-80 / US-322 freeflow is still billable',
        detail:
          'Cross-ridge pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Rural ridges add empty miles and winter risk',
        detail:
          'Far townships reject State College day-rate assumptions after ice events.',
      },
    ],
    zonesHeading:
      'Centre zones: State College core, campus multi-family, Bellefonte seat & rural ridges',
    zonesIntro:
      'Two to four sharp products — downtown core, student multi-family, seat edge, and rural ridges.',
    zones: [
      {
        id: 'state-college-core',
        name: 'State College core & downtown',
        shortName: 'State College',
        neighborhoods: ['State College', 'downtown', 'College Heights edges'],
        housingTypes: 'Multi-family, multi-story, SFH',
        challenges: ['Street parking', 'Term peaks', 'Tight staging'],
        moverTips: 'Avoid peak move-in weekends; plan temporary no-parking.',
        keywords: ['state college'],
      },
      {
        id: 'campus-multifamily',
        name: 'Campus multi-family & growth belts',
        shortName: 'Campus MF',
        neighborhoods: ['College Township', 'Patton Township', 'Harris Township edges'],
        housingTypes: 'Apartments, townhomes, student multi-family',
        challenges: ['Elevators', 'COI packets', 'Lease-end clusters'],
        moverTips: 'Collect management packets; confirm elevator windows early.',
        keywords: ['college township', 'patton', 'harris township'],
      },
      {
        id: 'bellefonte-seat',
        name: 'Bellefonte seat & corridor edges',
        shortName: 'Bellefonte',
        neighborhoods: ['Bellefonte', 'Pleasant Gap edges', 'seat multi-family'],
        housingTypes: 'SFH, multi-story older stock',
        challenges: ['Mixed access', 'US-322 freeflow'],
        moverTips: 'Confirm driveway and street width on older blocks.',
        keywords: ['bellefonte', 'pleasant gap'],
      },
      {
        id: 'rural-ridges',
        name: 'Rural ridges & larger lots',
        shortName: 'Rural Centre',
        neighborhoods: ['Philipsburg edges', 'Milesburg edges', 'northern ridges'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice', 'Soft shoulders'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['philipsburg', 'milesburg', 'rural centre'],
      },
    ],
    specialized: [
      {
        id: 'penn-state-cycles',
        title: 'Penn State university move cycles',
        intro: 'Term start/end weekends dominate local demand.',
        bullets: [
          'Book early around official move-in/out windows.',
          'Expect short-notice apartment demand spikes near campus.',
        ],
      },
      {
        id: 'campus-multifamily',
        title: 'Campus multi-family & COI soft costs',
        intro: 'Elevators and management packets are standard survey inputs.',
        bullets: [
          'Collect COI and elevator overtime rules before the estimate is final.',
          'Line-item packing for dense student inventories when needed.',
        ],
      },
      {
        id: 'i80-us322',
        title: 'I-80 / US-322 freeflow',
        intro: 'Cross-ridge pairs still peak hard.',
        bullets: [
          'Price portal-to-portal time honestly for long county pairs.',
          'Winter ice on ridges rewrites morning curb plans.',
        ],
      },
    ],
    schoolsIntro:
      'Centre families compare State College Area, Bellefonte, Bald Eagle, and other districts — verify address boundaries.',
    hospitalsDetail:
      'Mount Nittany Medical Center and related campuses anchor acute care; map peak freeflow on term weekends and I-80 windows.',
    costIntro:
      'Term peaks, multi-family elevators, and ridge empty miles often matter more than raw miles.',
    seasonalIntro:
      'University calendars, school years, and winter ice reshape demand more than capital or SEPA patterns.',
  },
  {
    file: 'monroe-pa.ts',
    exportName: 'monroeCountyTier2Intelligence',
    slug: 'monroe',
    hubTitle: 'Monroe County Moving Intelligence Hub',
    eyebrow: 'Monroe · Stroudsburg — Poconos',
    h1: 'Moving in Monroe County: Stroudsburg, Poconos Residential & I-80/I-84 Access',
    heroOpener:
      'Monroe County is Poconos tourism-plus-residential product — Stroudsburg multi-story and seat stock, East Stroudsburg and university edges, Mount Pocono and Tannersville corridor density, and I-80 / I-84 freeflow that is not Lehigh Valley industrial multi-family with mountain labels. Expect second-home and rental turnover, lake and hill last-mile, and NY/NJ interstate risk under one county label. This guide is for people moving in Monroe as a Poconos market — not a recycled Northampton or Lehigh pack.',
    heroCredibility:
      'Poconos tourism + residential · Stroudsburg seat · I-80 / I-84 · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-80 · I-84 · PA-33 · PA-611 · PA-940 · US-209',
    parentLabel: 'Northampton County',
    parentHref: '/local-movers/pennsylvania/northampton',
    compareIntro:
      'Monroe is Poconos tourism-residential product on I-80 / I-84 — not Northampton Bethlehem/Easton Valley density and not pure Lehigh industrial multi-family.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Northampton crews fight Lehigh Valley peaks into Bethlehem/Easton. Monroe pairs ride I-80, I-84, and PA-33 — freer mid-day Poconos freeflow, still peak-heavy on Stroudsburg arterials and tourism weekends. Portal-to-portal time is real; it is not a Valley elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Northampton mixes city multi-unit and Valley townships. Monroe mixes Stroudsburg multi-story, mountain SFH, lake cottages, and rental clusters — more tourism/second-home product, less continuous Valley industrial density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Mountain and lake approaches often need smaller trucks; HOA and resort communities add packets uncommon on pure Valley SFH jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Monroe quotes often track secondary NEPA/Poconos rates — shuttles, tourism peaks, and long empty-mile hills can price above quiet Valley driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Monroe is Poconos tourism + residential — not Lehigh Valley product renamed.',
      },
    ],
    whatIntro:
      'Tourism calendars, mountain last-mile, and I-80 freeflow — not interchangeable Valley boilerplate.',
    whatBullets: [
      {
        title: 'Tourism and second-home peaks rewrite weekends',
        detail:
          'Seasonal rentals and holiday windows fill crews and parking near corridor towns.',
      },
      {
        title: 'Mountain and lake last-mile is the default failure mode',
        detail:
          'Narrow approaches and soft ground reject full trailers more often than map miles suggest.',
      },
      {
        title: 'I-80 / I-84 freeflow is still billable',
        detail:
          'Poconos pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'NY / NJ adjacency creates interstate legs',
        detail:
          'Out-of-state addresses require FMCSA authority even on short-looking hops.',
      },
    ],
    zonesHeading:
      'Monroe zones: Stroudsburg seat, East Stroudsburg corridor, Mount Pocono belt & mountain edges',
    zonesIntro:
      'Two to four sharp products — seat multi-story, university corridor, tourism belt, and mountain edges.',
    zones: [
      {
        id: 'stroudsburg-seat',
        name: 'Stroudsburg seat multi-story & older stock',
        shortName: 'Stroudsburg',
        neighborhoods: ['Stroudsburg', 'downtown', 'seat multi-family'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'Tourism peaks'],
        moverTips: 'Inventory stairs; avoid peak tourism weekends when possible.',
        keywords: ['stroudsburg'],
      },
      {
        id: 'east-stroudsburg',
        name: 'East Stroudsburg / university corridor',
        shortName: 'East Stroudsburg',
        neighborhoods: ['East Stroudsburg', 'university edges', 'Analomink edges'],
        housingTypes: 'Multi-family, SFH, student stock',
        challenges: ['Lease clusters', 'Management packets', 'I-80 peaks'],
        moverTips: 'Book early around term calendars; collect building rules.',
        keywords: ['east stroudsburg', 'analomink'],
      },
      {
        id: 'mount-pocono-belt',
        name: 'Mount Pocono / Tannersville corridor',
        shortName: 'Mount Pocono belt',
        neighborhoods: ['Mount Pocono', 'Tannersville', 'Tobyhanna edges'],
        housingTypes: 'SFH, rentals, multi-family',
        challenges: ['Tourism traffic', 'HOA/resort rules', 'Arterial timing'],
        moverTips: 'Build buffers for tourism weekends; confirm HOA rules.',
        keywords: ['mount pocono', 'tannersville', 'tobyhanna'],
      },
      {
        id: 'mountain-edges',
        name: 'Mountain & lake last-mile edges',
        shortName: 'Mountain edges',
        neighborhoods: ['Lake communities', 'Barrett edges', 'Price Township edges'],
        housingTypes: 'Lake cottages, hillside SFH, rural approaches',
        challenges: ['Narrow roads', 'Soft shoulders', 'Long carries'],
        moverTips: 'Photo approaches; discuss shuttle trucks early.',
        keywords: ['poconos lakes', 'barrett', 'price township'],
      },
    ],
    specialized: [
      {
        id: 'poconos-tourism',
        title: 'Poconos tourism & second-home module',
        intro: 'Seasonal rentals and holiday peaks dominate corridor access.',
        bullets: [
          'Book and stage around major tourism weekends.',
          'Confirm HOA/resort packets before the estimate is final.',
        ],
      },
      {
        id: 'i80-i84',
        title: 'I-80 / I-84 freeflow',
        intro: 'Poconos pairs still peak hard; NY/NJ legs need FMCSA.',
        bullets: [
          'Price portal-to-portal time honestly.',
          'Clarify out-of-state second addresses for interstate authority.',
        ],
      },
      {
        id: 'mountain-last-mile',
        title: 'Mountain & lake last-mile',
        intro: 'Narrow approaches reject full-trailer assumptions from Valley rates.',
        bullets: [
          'Photo the final approach before promising a 26-foot truck.',
          'Soft ground after rain can block heavy equipment.',
        ],
      },
    ],
    schoolsIntro:
      'Monroe families compare Stroudsburg, East Stroudsburg, Pleasant Valley, Pocono Mountain, and other districts — verify boundaries.',
    hospitalsDetail:
      'Lehigh Valley Hospital–Pocono and related campuses anchor acute care; map peak I-80 times for ER access.',
    costIntro:
      'Tourism peaks, mountain shuttles, and I-80 freeflow often matter more than raw miles.',
    seasonalIntro:
      'Tourism summers, school years, term calendars, and winter ice reshape demand by pocket.',
  },
  {
    file: 'franklin-pa.ts',
    exportName: 'franklinCountyTier2Intelligence',
    slug: 'franklin',
    hubTitle: 'Franklin County Moving Intelligence Hub',
    eyebrow: 'Franklin · Chambersburg — south-central PA',
    h1: 'Moving in Franklin County: Chambersburg, I-81 South & Maryland-Border Access',
    heroOpener:
      'Franklin County is south-central PA ag-small-city product — Chambersburg multi-story and seat stock, Waynesboro and Greencastle corridors, Shippensburg-adjacent edges, and I-81 freeflow toward Maryland with interstate authority risk at the border. It is not Cumberland west-shore HOA growth renamed: expect small-city stairs, farm-edge empty miles, and MD-adjacent pairs under one county label. This guide is for people moving in Franklin as Chambersburg / I-81 south market — not a recycled Cumberland pack.',
    heroCredibility:
      'South-central PA · Chambersburg seat · I-81 south / MD border · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-81 · US-30 · US-11 · PA-16 · PA-997 · PA-416',
    parentLabel: 'Cumberland County',
    parentHref: '/local-movers/pennsylvania/cumberland',
    parentAltLabel: 'Dauphin County',
    parentAltHref: '/local-movers/pennsylvania/dauphin',
    compareIntro:
      'Franklin is south-central ag-small-city product on I-81 — not Cumberland west-shore HOA growth alone and not pure capital freeflow.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Cumberland crews fight west-shore I-81 peaks into Harrisburg. Franklin pairs ride I-81, US-30, and PA-16 — freer mid-day south of Carlisle, still peak-heavy on Chambersburg arterials and MD-bound freeflow.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Cumberland mixes Carlisle multi-story and Mechanicsburg HOA. Franklin mixes Chambersburg multi-unit, Waynesboro SFH, and farm-edge lots — more ag-small-city product, less continuous planned-suburb density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; rural lots trade that for driveway length and soft shoulders; MD addresses flip authority.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Franklin quotes often sit at secondary south-central rates for driveway SFH — multi-story access and long empty-mile farm edges still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Franklin is Chambersburg / I-81 south ag-small-city — not Cumberland west-shore growth renamed.',
      },
    ],
    whatIntro:
      'I-81 south freeflow, small-city multi-unit, and MD-border authority — not interchangeable Cumberland boilerplate.',
    whatBullets: [
      {
        title: 'Chambersburg multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from farm-edge driveways.',
      },
      {
        title: 'I-81 freeflow is still billable',
        detail:
          'Franklin ↔ Cumberland pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Maryland adjacency creates interstate legs',
        detail:
          'MD addresses require FMCSA authority even on short-looking hops.',
      },
      {
        title: 'Ag-edge empty miles price as distance work',
        detail:
          'Far townships fail when crews assume Chambersburg day rates.',
      },
    ],
    zonesHeading:
      'Franklin zones: Chambersburg seat, Waynesboro corridor, Greencastle/MD edge & rural ag lots',
    zonesIntro:
      'Two to four sharp products — seat multi-story, east corridor, MD edge, and rural lots.',
    zones: [
      {
        id: 'chambersburg-seat',
        name: 'Chambersburg multi-story & older stock',
        shortName: 'Chambersburg',
        neighborhoods: ['Chambersburg', 'downtown', 'seat multi-family'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'I-81 peaks'],
        moverTips: 'Inventory stairs; plan temporary no-parking; build I-81 buffers.',
        keywords: ['chambersburg'],
      },
      {
        id: 'waynesboro-corridor',
        name: 'Waynesboro / east corridor',
        shortName: 'Waynesboro',
        neighborhoods: ['Waynesboro', 'Washington Township edges', 'Rouzerville edges'],
        housingTypes: 'SFH, multi-unit, mixed stock',
        challenges: ['Arterial timing', 'Mixed access', 'Empty miles'],
        moverTips: 'Prefer early starts; survey driveway depth.',
        keywords: ['waynesboro', 'washington township'],
      },
      {
        id: 'greencastle-md',
        name: 'Greencastle / Maryland-border edge',
        shortName: 'Greencastle / MD edge',
        neighborhoods: ['Greencastle', 'Antrim edges', 'MD approaches'],
        housingTypes: 'SFH, multi-family, mixed stock',
        challenges: ['Interstate authority risk', 'I-81 freeflow', 'Mixed access'],
        moverTips: 'Clarify MD second addresses; price portal-to-portal honestly.',
        keywords: ['greencastle', 'antrim'],
      },
      {
        id: 'rural-ag',
        name: 'Rural ag lots & western edges',
        shortName: 'Rural Franklin',
        neighborhoods: ['Mercersburg edges', 'Fannett edges', 'western townships'],
        housingTypes: 'Larger lots, farm-edge approaches',
        challenges: ['Long empty miles', 'Soft shoulders', 'Limited alternate routes'],
        moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
        keywords: ['mercersburg', 'fannett', 'rural franklin'],
      },
    ],
    specialized: [
      {
        id: 'i81-south',
        title: 'I-81 south freeflow module',
        intro: 'South-central pairs still peak hard toward Cumberland and MD.',
        bullets: [
          'Price portal-to-portal time honestly for Franklin ↔ Cumberland legs.',
          'Clarify MD second addresses for interstate authority.',
        ],
      },
      {
        id: 'small-city-access',
        title: 'Chambersburg small-city multi-story',
        intro: 'Seat stairs are a first-class cost driver.',
        bullets: [
          'Inventory floor counts before comparing hourly rates.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'ag-last-mile',
        title: 'Ag-edge last-mile & empty miles',
        intro: 'Farm approaches punish seat day-rate assumptions.',
        bullets: [
          'Photo driveways and soft shoulders.',
          'Long empty-mile pairs price as distance work for seat-based crews.',
        ],
      },
    ],
    schoolsIntro:
      'Franklin families compare Chambersburg, Waynesboro, Greencastle-Antrim, Tuscarora, and other districts — verify boundaries.',
    hospitalsDetail:
      'WellSpan Chambersburg and related campuses anchor acute care; map peak I-81 times and MD specialty spillover routes.',
    costIntro:
      'Small-city stairs, I-81 freeflow, and ag-edge empty miles often matter more than raw miles.',
    seasonalIntro:
      'School years, ag calendars, and winter ice reshape demand by pocket.',
  },
  {
    file: 'schuylkill-pa.ts',
    exportName: 'schuylkillCountyTier2Intelligence',
    slug: 'schuylkill',
    hubTitle: 'Schuylkill County Moving Intelligence Hub',
    eyebrow: 'Schuylkill · Pottsville — coal-region mid-state',
    h1: 'Moving in Schuylkill County: Pottsville, Coal-Region Towns & I-81 Interior Access',
    heroOpener:
      'Schuylkill County is coal-region mid-state independent product — Pottsville multi-story and seat stock, Tamaqua and Shenandoah valley towns, Schuylkill Haven corridors, and I-81 / PA-61 freeflow distinct from Reading multi-unit and Scranton medical-hub calendars. It is not Berks with freer freeways and not NEPA valley-city density renamed: expect older multi-story inventory, longer empty miles between towns, and interior freeflow that stages differently from US-222 or Scranton I-81 peaks alone. This guide is for people moving in Schuylkill as Pottsville / coal-region product — not recycled Berks or Luzerne packs.',
    heroCredibility:
      'Coal-region mid-state · Pottsville seat · I-81 interior · PA PUC household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-81 · PA-61 · US-209 · PA-183 · PA-443 · PA-54',
    parentLabel: 'Berks County',
    parentHref: '/local-movers/pennsylvania/berks',
    parentAltLabel: 'Luzerne County',
    parentAltHref: '/local-movers/pennsylvania/luzerne',
    compareIntro:
      'Schuylkill is coal-region mid-state interior product — not Reading US-222 density and not Scranton/Wilkes-Barre NEPA pair freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Berks crews fight Reading arterials and US-222 peaks. Schuylkill pairs ride I-81, PA-61, and US-209 — freer mid-day interior freeflow, still peak-heavy on Pottsville cores and long town-to-town pairs. Portal-to-portal time is real; it is not a Reading day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Berks mixes Reading multi-story and western HOA. Schuylkill mixes Pottsville multi-unit, coal-region town twins, and rural ridges — more discontinuous town cores, less continuous suburban HOA belts.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Town hills and multi-story stock need stair inventories; ridge lots trade that for driveway length and winter grades uncommon on pure Reading suburban jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Schuylkill quotes often sit at secondary mid-state rates for driveway SFH — multi-story access and long empty-mile town pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Schuylkill is coal-region mid-state interior — not Reading or Scranton product renamed.',
      },
    ],
    whatIntro:
      'Coal-region multi-story, I-81 interior freeflow, and town-to-town empty miles — not interchangeable Reading or NEPA boilerplate.',
    whatBullets: [
      {
        title: 'Pottsville multi-story is first-class product',
        detail:
          'Seat stairs and hills need inventories different from rural ridge lots.',
      },
      {
        title: 'Distinct from Reading and Scranton day-rate assumptions',
        detail:
          'Interior town pairs fail when crews recycle Berks US-222 or NEPA medical-hub logistics.',
      },
      {
        title: 'I-81 / PA-61 freeflow is still billable',
        detail:
          'Town-to-town pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Ridge empty miles and winter grades rewrite curb plans',
        detail:
          'Far townships reject seat day rates after ice events.',
      },
    ],
    zonesHeading:
      'Schuylkill zones: Pottsville seat, Schuylkill Haven corridor, northern coal towns & ridge edges',
    zonesIntro:
      'Two to four sharp products — seat multi-story, south corridor, northern towns, and ridge edges.',
    zones: [
      {
        id: 'pottsville-seat',
        name: 'Pottsville multi-story & older stock',
        shortName: 'Pottsville',
        neighborhoods: ['Pottsville', 'downtown', 'seat multi-family'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Hills', 'Street parking'],
        moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
        keywords: ['pottsville'],
      },
      {
        id: 'schuylkill-haven',
        name: 'Schuylkill Haven / south corridor',
        shortName: 'Schuylkill Haven',
        neighborhoods: ['Schuylkill Haven', 'Orwigsburg edges', 'Cressona edges'],
        housingTypes: 'SFH, multi-unit, mixed stock',
        challenges: ['Arterial timing', 'Mixed access', 'PA-61 freeflow'],
        moverTips: 'Prefer early starts; confirm driveway depth.',
        keywords: ['schuylkill haven', 'orwigsburg', 'cressona'],
      },
      {
        id: 'north-coal-towns',
        name: 'Tamaqua / Shenandoah northern towns',
        shortName: 'North coal towns',
        neighborhoods: ['Tamaqua', 'Shenandoah', 'Mahanoy City edges', 'Frackville edges'],
        housingTypes: 'Multi-unit, twins, older SFH',
        challenges: ['Empty miles', 'Hills', 'Mixed curb access'],
        moverTips: 'Survey street width; prefer early starts for long pairs.',
        keywords: ['tamaqua', 'shenandoah', 'mahanoy city', 'frackville'],
      },
      {
        id: 'ridge-edges',
        name: 'Ridge edges & larger lots',
        shortName: 'Ridge edges',
        neighborhoods: ['Pine Grove edges', 'Tremont edges', 'western ridges'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Long empty miles', 'Soft shoulders', 'Winter ice'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['pine grove', 'tremont', 'rural schuylkill'],
      },
    ],
    specialized: [
      {
        id: 'coal-region-distinct',
        title: 'Coal-region interior vs Reading / Scranton',
        intro: 'Schuylkill is a distinct mid-state interior market.',
        bullets: [
          'Do not recycle Berks US-222 or NEPA medical-hub day rates alone.',
          'Price town-to-town empty miles honestly.',
        ],
      },
      {
        id: 'i81-interior',
        title: 'I-81 / PA-61 interior freeflow',
        intro: 'Interior pairs still peak hard between discontinuous towns.',
        bullets: [
          'Build corridor buffers for morning and evening peaks.',
          'Clarify Berks or Luzerne second addresses for drive-time assumptions.',
        ],
      },
      {
        id: 'town-multi-story',
        title: 'Pottsville & town multi-story access',
        intro: 'Seat and town stairs are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and hill approaches.',
          'Temporary no-parking often beats long carries.',
        ],
      },
    ],
    schoolsIntro:
      'Schuylkill families compare Pottsville, Blue Mountain, Tamaqua, Schuylkill Haven, and other districts — verify boundaries.',
    hospitalsDetail:
      'Lehigh Valley Hospital–Schuylkill (Pottsville) and related campuses anchor acute care; map peak freeflow across discontinuous towns.',
    costIntro:
      'Town multi-story, interior freeflow, and ridge empty miles often matter more than raw miles.',
    seasonalIntro:
      'School years, lease ends, and winter grades reshape demand by pocket.',
  },
];

packs.push(...more);

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

function countyTitleFromSlug(slug: string): string {
  return slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function writePack(p: PackDef) {
  const zoneBlocks = p.zones
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

  const specBlocks = p.specialized
    .map(
      (s) => `    {
      id: '${s.id}',
      title: '${esc(s.title)}',
      intro: '${esc(s.intro)}',
      bullets: ${JSON.stringify(s.bullets)},
    }`
    )
    .join(',\n');

  const whatBullets = p.whatBullets
    .map(
      (b) => `      {
        title: '${esc(b.title)}',
        detail:
          '${esc(b.detail)}',
      }`
    )
    .join(',\n');

  const compareBullets = p.compareBullets
    .map(
      (b) => `      {
        title: '${esc(b.title)}',
        detail:
          '${esc(b.detail)}',
      }`
    )
    .join(',\n');

  const parentAltItem = p.parentAltLabel
    ? `{
        label: '${esc(p.parentAltLabel)} movers',
        href: '${p.parentAltHref}',
      },`
    : '';

  const content = `import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * ${p.slug} — PA Tier 2 Wave 1
 */
export const ${p.exportName}: CountyIntelligencePack = finalizePaTier2Pack({
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
${compareBullets}
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in ${countyTitleFromSlug(p.slug)} County different',
    intro: '${esc(p.whatIntro)}',
    bullets: [
${whatBullets},
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: '${esc(p.zonesHeading)}',
  zonesIntro: '${esc(p.zonesIntro)}',
  zones: [
${zoneBlocks}
  ],
  specialized: [
${specBlocks}
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
              'Use PDE data and district maps; do not assume a borough name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university towns can tighten housing near school and term calendars.',
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
        detail: 'Far pockets price differently from seat suburbs.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$500–$1,200+' },
      {
        label: '3–4 BR home',
        value: '$1,800–$4,200+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$120–$185+/hr' },
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
        detail: 'Hills, rural edges, and mountain approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Pennsylvania PUC household-goods authority for in-state Pennsylvania moves and FMCSA for interstate legs.',
    items: [
      {
        label: '${esc(p.parentLabel)} movers (parent contrast)',
        href: '${p.parentHref}',
      },
      ${parentAltItem}
    ],
  },
});
`;

  writeFileSync(
    `lib/local-movers/county-intelligence/pennsylvania/${p.file}`,
    content
  );
  console.log('wrote', p.file);
}

for (const p of packs) writePack(p);
console.log(`Generated ${packs.length} PA Tier 2 Wave 1 packs`);
