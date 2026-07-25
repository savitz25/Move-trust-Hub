/**
 * Generate NY Tier 2 Wave 1 county intelligence packs (except rockland — hand-written).
 * Run: npx tsx scripts/generate-ny-tier2-wave1.ts
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
    file: 'orange-ny.ts',
    exportName: 'orangeCountyTier2Intelligence',
    slug: 'orange',
    hubTitle: 'Orange County Moving Intelligence Hub',
    eyebrow: 'Orange · Hudson Valley · Newburgh / Middletown / Woodbury',
    h1: 'Moving in Orange County: Newburgh, Middletown & I-87/I-84 Outer NYC Collar',
    heroOpener:
      'Orange County is the Hudson Valley outer NYC collar — Newburgh river-city stock, Middletown inland multi-family and SFH, Woodbury retail-corridor growth, Warwick and Goshen larger lots, and I-87 / I-84 freeflow that still peaks hard toward the Thruway. It is not Westchester hill estates and not Rockland multi-family density with different labels: expect longer empty miles, warehouse-adjacent arterials, and village cores that stage differently from south-county elevators. This guide is for people moving in Orange as an outer commuting-belt market — not a recycled Westchester or Rockland script.',
    heroCredibility:
      'Outer NYC collar · I-87 / I-84 freeflow · Mixed city & inland stock · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-87 · I-84 · NY-17 · NY-211 · NY-32 · NY-208',
    parentLabel: 'Westchester County',
    parentHref: '/local-movers/new-york/westchester',
    parentAltLabel: 'Rockland County',
    parentAltHref: '/local-movers/new-york/rockland',
    compareIntro:
      'Orange is the outer Hudson Valley commuting belt on I-87/I-84 — longer freeflow, mixed city and inland product — not Westchester Sound Shore co-ops or Rockland bridge-dense multi-family alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Westchester crews fight Hutchinson, Saw Mill, and I-287 hills. Orange pairs ride I-87, I-84, NY-17, and Woodbury retail corridors — freer mid-day than south Westchester choke points, still peak-heavy toward the Thruway and I-84. Portal-to-portal time is real; it is not a Yonkers elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Westchester mixes south-county elevators and north-county estates. Orange mixes Newburgh multi-story, Middletown multi-family, Woodbury growth SFH, and western larger lots — more inland empty miles, less continuous Sound Shore village product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Westchester north often means long estate driveways. Orange city cores need curb plans and stair inventories; retail-corridor suburbs add HOA and arterial timing uncommon on pure estate jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Orange quotes often sit near or slightly below dense south-Westchester rates for driveway SFH — Thruway peaks, multi-family elevators, and long empty-mile west pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Orange is the outer NYC commuting belt and Hudson Valley mid-market — not Westchester dual north–south product and not Rockland bridge multi-family density alone.',
      },
    ],
    whatIntro:
      'Thruway freeflow, mixed city inventory, and retail-corridor peaks — not interchangeable Westchester boilerplate.',
    whatBullets: [
      {
        title: 'I-87 / I-84 peaks rewrite short locals',
        detail:
          'Newburgh ↔ Middletown pairs freer mid-day still burn billable time at commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Newburgh multi-story is first-class product',
        detail:
          'City stairs and tight streets need inventories different from Woodbury cul-de-sacs.',
      },
      {
        title: 'Woodbury retail corridors punish Saturday crews',
        detail:
          'Outlet and arterial congestion changes staging windows more than map miles suggest.',
      },
      {
        title: 'NJ / PA adjacency creates interstate legs',
        detail:
          'Sussex NJ or Pike PA addresses flip jobs to FMCSA even when the Orange side feels local.',
      },
    ],
    zonesHeading:
      'Orange zones: Newburgh corridor, Middletown inland, Woodbury growth & western lots',
    zonesIntro:
      'Two to four sharp products — river city, inland multi-family, retail growth, and western lots price differently.',
    zones: [
      {
        id: 'newburgh-corridor',
        name: 'Newburgh & east river corridor',
        shortName: 'Newburgh',
        neighborhoods: ['Newburgh', 'New Windsor', 'Cornwall', 'Beacon approaches'],
        housingTypes: 'City multi-story, SFH, river-edge stock',
        challenges: ['Tight streets', 'Stairs', 'Thruway peaks'],
        moverTips:
          'Plan temporary no-parking; inventory stairs; avoid peak Thruway windows when possible.',
        keywords: ['newburgh', 'new windsor', 'cornwall'],
      },
      {
        id: 'middletown-inland',
        name: 'Middletown inland core',
        shortName: 'Middletown',
        neighborhoods: ['Middletown', 'Wallkill edges', 'Scotchtown'],
        housingTypes: 'Multi-family, SFH, lease clusters',
        challenges: ['Elevators', 'Arterial timing', 'Parking'],
        moverTips:
          'Collect management packets; confirm elevator windows before Saturday bookings.',
        keywords: ['middletown', 'wallkill', 'scotchtown'],
      },
      {
        id: 'woodbury-growth',
        name: 'Woodbury / central retail growth',
        shortName: 'Woodbury growth',
        neighborhoods: ['Woodbury', 'Central Valley', 'Harriman edges'],
        housingTypes: 'Suburban SFH, townhomes, apartments',
        challenges: ['Retail corridor traffic', 'HOA windows'],
        moverTips: 'Avoid Saturday midday near outlet corridors when possible.',
        keywords: ['woodbury', 'central valley', 'harriman'],
      },
      {
        id: 'warwick-west',
        name: 'Warwick / western lots',
        shortName: 'West Orange Co.',
        neighborhoods: ['Warwick', 'Goshen', 'Chester', 'Monroe edges'],
        housingTypes: 'Larger lots, hills, rural approaches',
        challenges: ['Driveway length', 'Grades', 'Winter ice'],
        moverTips:
          'Photo approaches; soft ground after rain can block heavy trucks.',
        keywords: ['warwick', 'goshen', 'chester', 'monroe'],
      },
    ],
    specialized: [
      {
        id: 'i87-i84',
        title: 'I-87 / I-84 freeflow module',
        intro:
          'Outer collar pairs burn portal-to-portal time even when map miles look short.',
        bullets: [
          'Price Thruway and I-84 peaks honestly for Newburgh ↔ Middletown pairs.',
          'Build buffer for Woodbury retail corridors on weekends.',
          'Clarify Rockland or Westchester second addresses for authority and drive-time.',
        ],
      },
      {
        id: 'river-city',
        title: 'Newburgh river-city access',
        intro: 'City multi-story stock needs stair inventories and curb plans.',
        bullets: [
          'Measure streets before promising full trailers.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'inland-mf',
        title: 'Inland multi-family & lease clusters',
        intro: 'Middletown-area apartments drive elevator and COI soft costs.',
        bullets: [
          'Collect management packets before finalizing the estimate.',
          'Confirm elevator overtime rules.',
        ],
      },
    ],
    schoolsIntro:
      'Orange families often compare Newburgh, Middletown, Warwick, Monroe-Woodbury, and other districts — boundaries are address-specific.',
    hospitalsDetail:
      'Montefiore St. Luke’s Cornwall, Garnet Health (Middletown), and related campuses serve greater Orange; map ER times at Thruway peak.',
    costIntro:
      'Thruway freeflow, multi-family elevators, and long empty-mile west pairs often matter more than raw miles.',
    seasonalIntro:
      'School years, retail peaks, and winter grades reshape demand by pocket.',
  },
  // ... remaining packs defined below in array push for clarity
];

// Additional packs
packs.push(
  {
    file: 'dutchess-ny.ts',
    exportName: 'dutchessCountyTier2Intelligence',
    slug: 'dutchess',
    hubTitle: 'Dutchess County Moving Intelligence Hub',
    eyebrow: 'Dutchess · Mid Hudson · Poughkeepsie / Beacon',
    h1: 'Moving in Dutchess County: Poughkeepsie, Beacon & Mid-Hudson Rail-Commute Access',
    heroOpener:
      'Dutchess County is Mid Hudson rail-commute country — Poughkeepsie city multi-story stock, Beacon walkable density, Arlington and Hyde Park corridors, eastern larger lots toward Amenia, and Metro-North clocks that matter as much as I-84 freeflow. It is not Orange Thruway retail corridors and not Westchester south-county elevators: expect mixed city stairs, village grids, and longer east-county empty miles. This guide is for people moving in Dutchess as a Mid Hudson market with its own role — not a recycled Orange or Westchester pack.',
    heroCredibility:
      'Mid Hudson · Metro-North clocks · Mixed density · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-84 · US-9 · NY-9D · NY-55 · NY-44 · Metro-North Hudson Line',
    parentLabel: 'Orange County',
    parentHref: '/local-movers/new-york/orange',
    parentAltLabel: 'Westchester County',
    parentAltHref: '/local-movers/new-york/westchester',
    compareIntro:
      'Dutchess is Mid Hudson rail-commute product with Poughkeepsie/Beacon density and eastern lots — not Orange I-87 retail freeflow and not Westchester NYC-adjacent co-ops alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Orange crews fight Thruway and I-84 outer-collar peaks. Dutchess pairs ride US-9, NY-9D, I-84, and Metro-North-oriented freeflow — freer mid-day than dense downstate cores, still peak-heavy on Poughkeepsie arterials and Beacon weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Orange mixes Newburgh city stock and Woodbury growth. Dutchess mixes Poughkeepsie multi-story, Beacon village homes, and eastern large lots — more rail-village product, less outlet-corridor suburban density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Beacon and Poughkeepsie cores need curb plans and stair inventories; east-county lots trade that for driveway length and soft shoulders rare on Orange retail suburbs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Dutchess quotes often track secondary Hudson Valley rates for driveway SFH — city stairs, tourism weekends, and long empty-mile east pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Dutchess is Mid Hudson rail-commute and mixed-density product — not Orange outer Thruway collar and not Westchester dual north–south estate/co-op market.',
      },
    ],
    whatIntro:
      'Rail-commute clocks, city stairs, and eastern last-mile — not interchangeable Orange boilerplate.',
    whatBullets: [
      {
        title: 'Metro-North living changes crew windows',
        detail:
          'Beacon and Poughkeepsie station-area parking pressure can collide with truck staging — plan early arrivals.',
      },
      {
        title: 'Poughkeepsie multi-story is first-class product',
        detail:
          'City stairs and street parking need inventories different from eastern ranch lots.',
      },
      {
        title: 'US-9 / I-84 freeflow is still a line item',
        detail:
          'Short-looking locals burn billable time at peak. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'CT adjacency creates interstate legs',
        detail:
          'Connecticut addresses flip jobs to FMCSA even when the Dutchess side feels local.',
      },
    ],
    zonesHeading:
      'Dutchess zones: Poughkeepsie core, Beacon corridor, eastern lots & north US-9',
    zonesIntro:
      'Two to four sharp products — city, river village, eastern lots, and north corridor price differently.',
    zones: [
      {
        id: 'poughkeepsie-core',
        name: 'Poughkeepsie city & Arlington',
        shortName: 'Poughkeepsie',
        neighborhoods: ['Poughkeepsie', 'Arlington', 'Fairview edges'],
        housingTypes: 'Multi-story, multi-unit, some elevators',
        challenges: ['Stairs', 'Street parking', 'US-9 traffic'],
        moverTips: 'Inventory floor counts; plan temporary no-parking.',
        keywords: ['poughkeepsie', 'arlington'],
      },
      {
        id: 'beacon-waterfront',
        name: 'Beacon & south river corridor',
        shortName: 'Beacon',
        neighborhoods: ['Beacon', 'Fishkill edges', 'Wappingers Falls edges'],
        housingTypes: 'Village multi-story, SFH, walk-ups',
        challenges: ['Tight streets', 'Tourism weekends', 'Metro-North staging'],
        moverTips: 'Avoid peak event weekends; measure street width.',
        keywords: ['beacon', 'fishkill', 'wappingers'],
      },
      {
        id: 'east-county',
        name: 'Eastern larger lots',
        shortName: 'East Dutchess',
        neighborhoods: ['Amenia', 'Millbrook', 'Dover', 'Pawling edges'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Long driveways', 'Soft ground', 'Winter grades'],
        moverTips: 'Photo approaches; soft shoulders after rain block heavy trucks.',
        keywords: ['amenia', 'millbrook', 'dover', 'pawling'],
      },
      {
        id: 'north-corridor',
        name: 'Hyde Park / Rhinebeck corridor',
        shortName: 'North US-9',
        neighborhoods: ['Hyde Park', 'Rhinebeck', 'Red Hook edges'],
        housingTypes: 'SFH, some multi-story older stock',
        challenges: ['Tourism peaks', 'US-9 freeflow'],
        moverTips: 'Build buffer for tourism weekends near historic corridors.',
        keywords: ['hyde park', 'rhinebeck', 'red hook'],
      },
    ],
    specialized: [
      {
        id: 'metro-north',
        title: 'Metro-North rail-commute timing',
        intro:
          'Many households orient to Hudson Line clocks, not only Thruway freeflow.',
        bullets: [
          'Align crew arrivals with peak train parking pressure in Beacon/Poughkeepsie.',
          'Portal-to-portal time still matters for I-84 pairs toward Orange.',
        ],
      },
      {
        id: 'city-stairs',
        title: 'Poughkeepsie multi-story access',
        intro: 'City inventory needs stair surveys more than cul-de-sac playbooks.',
        bullets: [
          'Inventory floor counts and long carries early.',
          'Temporary no-parking often required.',
        ],
      },
      {
        id: 'east-last-mile',
        title: 'Eastern last-mile & rural approaches',
        intro: 'Amenia–Millbrook lots punish assumptions from city rates.',
        bullets: [
          'Photo driveways and soft shoulders.',
          'Winter ice needs morning flexibility.',
        ],
      },
    ],
    schoolsIntro:
      'Dutchess families compare Poughkeepsie City, Arlington, Beacon, and eastern districts — verify every address.',
    hospitalsDetail:
      'Vassar Brothers, MidHudson Regional, and related campuses anchor acute care; map peak US-9 / I-84 times.',
    costIntro:
      'City stairs, tourism weekends, and eastern empty miles often matter more than raw miles.',
    seasonalIntro:
      'School years, rail-commute calendars, and tourism peaks reshape demand by pocket.',
  },
  {
    file: 'putnam-ny.ts',
    exportName: 'putnamCountyTier2Intelligence',
    slug: 'putnam',
    hubTitle: 'Putnam County Moving Intelligence Hub',
    eyebrow: 'Putnam · Carmel · outer North NYC collar',
    h1: 'Moving in Putnam County: Carmel, Lakes & Outer North NYC Collar Last-Mile',
    heroOpener:
      'Putnam County is the lower-density northern NYC collar — Carmel seat suburbs, lake and hill last-mile toward Lake Carmel and Putnam Valley, Brewster and Southeast corridor stock, and I-84 / Taconic freeflow that still peaks toward Westchester. It is not Westchester with freer freeways: expect longer empty miles, wooded approaches, and fewer elevator jobs than south-county co-ops. This guide is for people moving in Putnam as an outer collar market — not a recycled Westchester hill estate script.',
    heroCredibility:
      'Outer North NYC collar · Lakes & hills last-mile · Lower density · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-84 · Taconic State Parkway · US-6 · NY-22 · NY-301',
    parentLabel: 'Westchester County',
    parentHref: '/local-movers/new-york/westchester',
    compareIntro:
      'Putnam is lower-density northern collar product — lakes, hills, and longer empty miles — not Westchester south-county elevators or Sound Shore village density.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Westchester crews fight denser south-county peaks. Putnam pairs ride I-84, the Taconic, US-6, and NY-22 — freer mid-day, still peak-heavy toward Westchester portals and Carmel arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Westchester mixes elevators and large estates. Putnam skews SFH, lake cottages, and wooded lots — far less continuous multi-family product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Lake and hill approaches often need smaller trucks and long carries; soft shoulders after rain are a first-class failure mode.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Putnam quotes can look lower than south Westchester for simple driveways — empty miles, shuttles, and winter grades still erase “cheap suburban” assumptions.',
      },
      {
        title: 'Role difference',
        detail:
          'Putnam is outer northern collar last-mile — not Westchester dual north–south density product.',
      },
    ],
    whatIntro:
      'Lakes, hills, and empty miles — not interchangeable Westchester boilerplate.',
    whatBullets: [
      {
        title: 'Lake and hill last-mile is the default failure mode',
        detail:
          'Narrow approaches and soft ground reject full trailers more often than map miles suggest.',
      },
      {
        title: 'I-84 / Taconic freeflow is still billable',
        detail:
          'Putnam ↔ Westchester pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Lower multi-family density than Rockland/Westchester south',
        detail:
          'Most jobs are SFH and long driveways — not elevator banks.',
      },
      {
        title: 'CT adjacency creates interstate legs',
        detail:
          'Connecticut addresses require FMCSA authority even on short-looking hops.',
      },
    ],
    zonesHeading: 'Putnam zones: Carmel seat, lake/hill edges, Brewster corridor & west ridges',
    zonesIntro: 'Two to four sharp products — seat suburbs, lakes, corridor stock, and ridges.',
    zones: [
      {
        id: 'carmel-seat',
        name: 'Carmel / Mahopac seat suburbs',
        shortName: 'Carmel',
        neighborhoods: ['Carmel', 'Mahopac', 'Mahopac Falls'],
        housingTypes: 'Suburban SFH, some multi-family',
        challenges: ['Cul-de-sac staging', 'Arterial timing'],
        moverTips: 'Confirm driveway length and HOA rules where applicable.',
        keywords: ['carmel', 'mahopac'],
      },
      {
        id: 'lake-hill',
        name: 'Lake Carmel / Putnam Valley hills',
        shortName: 'Lakes & hills',
        neighborhoods: ['Lake Carmel', 'Putnam Valley', 'lake edges'],
        housingTypes: 'Lake cottages, hillside SFH',
        challenges: ['Narrow roads', 'Soft shoulders', 'Long carries'],
        moverTips: 'Photo approaches; discuss shuttle trucks early.',
        keywords: ['lake carmel', 'putnam valley'],
      },
      {
        id: 'brewster-corridor',
        name: 'Brewster / Southeast corridor',
        shortName: 'Brewster corridor',
        neighborhoods: ['Brewster', 'Southeast', 'I-84 edges'],
        housingTypes: 'SFH, some multi-family',
        challenges: ['I-84 peaks', 'Mixed stock'],
        moverTips: 'Build buffer for I-84 commute peaks.',
        keywords: ['brewster', 'southeast'],
      },
      {
        id: 'west-ridges',
        name: 'Western ridges & larger lots',
        shortName: 'West Putnam',
        neighborhoods: ['Kent', 'Patterson edges', 'wooded lots'],
        housingTypes: 'Larger lots, wooded approaches',
        challenges: ['Grades', 'Winter ice', 'Low wires'],
        moverTips: 'Winter mornings need flexibility; photo grades.',
        keywords: ['kent', 'patterson'],
      },
    ],
    specialized: [
      {
        id: 'lake-last-mile',
        title: 'Lakes & hills last-mile module',
        intro: 'Putnam’s defining access risk is narrow lake and hill approaches.',
        bullets: [
          'Photo the final approach before promising a 26-foot truck.',
          'Soft ground after rain can block heavy equipment.',
          'Long carries are common even when the address looks driveway-accessible.',
        ],
      },
      {
        id: 'outer-collar-freeflow',
        title: 'Outer collar freeflow vs Westchester density',
        intro: 'I-84 and Taconic freeflow is freer mid-day — still a line item at peak.',
        bullets: [
          'Price portal-to-portal time for Putnam ↔ Westchester pairs.',
          'Clarify CT second addresses for interstate authority.',
        ],
      },
    ],
    schoolsIntro:
      'Putnam families compare Carmel, Mahopac, Brewster, and related districts — verify address boundaries.',
    hospitalsDetail:
      'Putnam Hospital and nearby Westchester specialty spillover serve the county; map peak I-84 times for ER access.',
    costIntro:
      'Empty miles, shuttles, and winter grades often matter more than raw square footage.',
    seasonalIntro:
      'School years and winter ice reshape demand more than tourism alone.',
  }
);

// Remaining 8 packs - continue in second array
const more: PackDef[] = [
  {
    file: 'saratoga-ny.ts',
    exportName: 'saratogaCountyTier2Intelligence',
    slug: 'saratoga',
    hubTitle: 'Saratoga County Moving Intelligence Hub',
    eyebrow: 'Saratoga · Saratoga Springs · Capital Region north',
    h1: 'Moving in Saratoga County: Saratoga Springs, Clifton Park Growth & I-87 North',
    heroOpener:
      'Saratoga County is Capital Region north growth — Saratoga Springs tourism and village density, Clifton Park suburban corridors, Ballston Spa seat edges, and I-87 Northway freeflow that still peaks toward Albany. It is not Albany County government-core brownstones with freer freeways: expect tourism calendars, planned-suburb HOAs, and spa-town streets that reject full trailers. This guide is for people moving in Saratoga as a north capital-collar market — not a recycled Albany Tier 1 script.',
    heroCredibility:
      'Capital Region north · Tourism + suburban growth · I-87 Northway · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-87 · NY-50 · NY-9 · NY-29 · NY-67 · NY-146',
    parentLabel: 'Albany County',
    parentHref: '/local-movers/new-york/albany',
    compareIntro:
      'Saratoga is Capital Region north growth and tourism product — not Albany city brownstones or pure government-session calendars alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Albany crews fight downtown one-ways and I-90 city approaches. Saratoga pairs ride I-87, NY-50, and NY-9 — freer mid-day north of the capital, still peak-heavy on Clifton Park ↔ Albany commutes and track-season weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Albany mixes city multi-story and first-ring suburbs. Saratoga mixes Saratoga Springs village multi-story, Clifton Park planned SFH, and northern larger lots — more tourism-driven village product, less capital-core brownstone density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Spa-town streets and HOA villages need curb plans and packets; track season changes staging more than Albany legislative calendars alone.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Saratoga quotes often sit near capital-suburb rates for driveway SFH — tourism peaks and village access can price above quiet Albany suburbs.',
      },
      {
        title: 'Role difference',
        detail:
          'Saratoga is tourism + north growth collar — not Albany government/education core product renamed.',
      },
    ],
    whatIntro:
      'Tourism calendars, Northway freeflow, and planned suburbs — not interchangeable Albany boilerplate.',
    whatBullets: [
      {
        title: 'Track and tourism peaks rewrite weekends',
        detail:
          'Saratoga Springs summers fill crews and parking; book early around major events.',
      },
      {
        title: 'Clifton Park HOA is first-class product',
        detail:
          'Planned suburbs treat COI and approved hours as standard survey inputs.',
      },
      {
        title: 'I-87 Northway freeflow is still billable',
        detail:
          'Saratoga ↔ Albany pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Village geometry rejects full trailers',
        detail:
          'Downtown Saratoga Springs often needs smaller trucks and temporary no-parking.',
      },
    ],
    zonesHeading:
      'Saratoga zones: Springs core, Clifton Park growth, Ballston corridor & north lots',
    zonesIntro: 'Two to four sharp products — tourism core, growth suburbs, seat corridor, and north lots.',
    zones: [
      {
        id: 'springs-core',
        name: 'Saratoga Springs core',
        shortName: 'Saratoga Springs',
        neighborhoods: ['Saratoga Springs', 'downtown', 'track edges'],
        housingTypes: 'Village multi-story, SFH, some multi-unit',
        challenges: ['Tourism parking', 'Tight streets', 'Event weekends'],
        moverTips: 'Avoid major event weekends; measure streets; plan no-parking signs.',
        keywords: ['saratoga springs', 'saratoga'],
      },
      {
        id: 'clifton-park',
        name: 'Clifton Park / Halfmoon growth',
        shortName: 'Clifton Park',
        neighborhoods: ['Clifton Park', 'Halfmoon', 'NY-146 corridors'],
        housingTypes: 'Planned SFH, townhomes, apartments',
        challenges: ['HOA packets', 'I-87 peaks', 'Lease clusters'],
        moverTips: 'Collect HOA COIs; build buffer for Northway commute peaks.',
        keywords: ['clifton park', 'halfmoon'],
      },
      {
        id: 'ballston-corridor',
        name: 'Ballston Spa / central corridor',
        shortName: 'Ballston',
        neighborhoods: ['Ballston Spa', 'Ballston Lake', 'Malta edges'],
        housingTypes: 'SFH, some multi-story older stock',
        challenges: ['Mixed access', 'Arterial timing'],
        moverTips: 'Confirm driveway and street width on older blocks.',
        keywords: ['ballston spa', 'ballston', 'malta'],
      },
      {
        id: 'north-lots',
        name: 'Northern larger lots',
        shortName: 'North Saratoga',
        neighborhoods: ['Wilton', 'Greenfield', 'Corinth edges'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice', 'Long driveways'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['wilton', 'greenfield', 'corinth'],
      },
    ],
    specialized: [
      {
        id: 'tourism-calendar',
        title: 'Tourism & track-season module',
        intro: 'Saratoga Springs event calendars dominate summer access.',
        bullets: [
          'Book and stage around major track and festival weekends.',
          'Temporary no-parking is often required downtown.',
        ],
      },
      {
        id: 'northway-growth',
        title: 'I-87 Northway growth suburbs',
        intro: 'Clifton Park HOA density is the north-collar product.',
        bullets: [
          'Collect HOA packets before the estimate is final.',
          'Price Northway portal-to-portal time to Albany honestly.',
        ],
      },
      {
        id: 'winter-access',
        title: 'Winter & northern last-mile',
        intro: 'Northern lots and hills rewrite January curb plans.',
        bullets: [
          'Ice-aware morning starts matter more than map freeflow.',
          'Soft shoulders after thaw can block heavy trucks.',
        ],
      },
    ],
    schoolsIntro:
      'Saratoga families compare Saratoga Springs, Shenendehowa, Ballston Spa, and other districts — verify address boundaries.',
    hospitalsDetail:
      'Saratoga Hospital and Capital Region specialty spillover serve the county; map peak I-87 times for ER access.',
    costIntro:
      'Tourism peaks, HOA soft costs, and Northway freeflow often matter more than raw miles.',
    seasonalIntro:
      'Track season, school years, and winter ice reshape demand more than pure capital-session calendars.',
  },
  {
    file: 'schenectady-ny.ts',
    exportName: 'schenectadyCountyTier2Intelligence',
    slug: 'schenectady',
    hubTitle: 'Schenectady County Moving Intelligence Hub',
    eyebrow: 'Schenectady · Capital Region west collar',
    h1: 'Moving in Schenectady County: Schenectady City Stock & Capital West Collar',
    heroOpener:
      'Schenectady County is the Capital Region west collar — Schenectady city multi-story stock, Niskayuna and Rotterdam suburban belts, Scotia village edges, and I-890 / NY-5 / NY-7 freeflow into Albany. It is not Albany County government-core product renamed: expect denser city stairs west of the capital, GE-corridor multi-family patterns, and suburban belts that stage differently from Colonie or Guilderland defaults. This guide is for people moving in Schenectady as capital-metro west collar — not a recycled Albany Tier 1 script.',
    heroCredibility:
      'Capital Region west collar · City multi-story · Suburban belts · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-890 · I-90 · NY-5 · NY-7 · NY-50 · NY-146',
    parentLabel: 'Albany County',
    parentHref: '/local-movers/new-york/albany',
    compareIntro:
      'Schenectady is capital-metro west collar with city multi-story density — not Albany Plaza brownstones alone and not pure suburban Colonie defaults.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Albany crews fight downtown one-ways and government peaks. Schenectady pairs ride I-890, NY-5, NY-7, and I-90 — freer mid-day than Plaza cores, still peak-heavy on capital-oriented commutes.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Albany mixes brownstones and first-ring suburbs. Schenectady mixes denser city multi-story, Niskayuna higher-value SFH, and Rotterdam/Scotia mixed product — more continuous city stairs west of the capital.',
      },
      {
        title: 'Truck access & density',
        detail:
          'City blocks need curb plans and stair inventories; Niskayuna lots trade that for driveway staging uncommon in downtown Albany multi-unit jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Schenectady quotes often track capital-suburb rates — city multi-story soft costs can exceed simple Rotterdam driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Schenectady is capital west collar city + suburb mix — not Albany government/education core renamed.',
      },
    ],
    whatIntro:
      'City stairs, west-collar freeflow, and suburban contrast — not interchangeable Albany boilerplate.',
    whatBullets: [
      {
        title: 'Schenectady city multi-story is first-class product',
        detail:
          'Stairs and street parking define more jobs than capital brownstone packets alone.',
      },
      {
        title: 'Niskayuna high-value SFH needs valuation coverage',
        detail:
          'Affluent inventories fail when packing tiers are missing from estimates.',
      },
      {
        title: 'I-890 / NY-5 freeflow is still billable',
        detail:
          'Capital-oriented pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Cross-county Capital Region legs are routine',
        detail:
          'Albany and Saratoga addresses are common; keep drive-time language honest.',
      },
    ],
    zonesHeading:
      'Schenectady zones: city core, Niskayuna belt, Rotterdam/Scotia & corridor edges',
    zonesIntro: 'Two to four sharp products — city, high-value suburbs, west towns, and corridor edges.',
    zones: [
      {
        id: 'city-core',
        name: 'Schenectady city core',
        shortName: 'City',
        neighborhoods: ['Schenectady', 'GE corridor edges', 'Stockade edges'],
        housingTypes: 'Multi-story, multi-unit, some elevators',
        challenges: ['Stairs', 'Street parking', 'Older stock'],
        moverTips: 'Inventory stairs and long carries; plan temporary no-parking.',
        keywords: ['schenectady'],
      },
      {
        id: 'niskayuna',
        name: 'Niskayuna high-value belt',
        shortName: 'Niskayuna',
        neighborhoods: ['Niskayuna', 'River Road edges'],
        housingTypes: 'High-value SFH, some multi-story',
        challenges: ['Valuation packing', 'Tree canopies', 'Driveway staging'],
        moverTips: 'Discuss valuation coverage early; protect floors and landscaping.',
        keywords: ['niskayuna'],
      },
      {
        id: 'rotterdam-scotia',
        name: 'Rotterdam / Scotia towns',
        shortName: 'Rotterdam / Scotia',
        neighborhoods: ['Rotterdam', 'Scotia', 'Glenville edges'],
        housingTypes: 'Suburban SFH, some multi-family',
        challenges: ['Mixed access', 'Arterial timing'],
        moverTips: 'Confirm HOA rules where applicable; build arterial buffers.',
        keywords: ['rotterdam', 'scotia', 'glenville'],
      },
    ],
    specialized: [
      {
        id: 'city-stairs',
        title: 'City multi-story access',
        intro: 'Schenectady city stairs are a first-class cost driver.',
        bullets: [
          'Inventory floor counts before comparing hourly rates.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'capital-west-collar',
        title: 'Capital west-collar freeflow',
        intro: 'I-890 / NY-5 pairs to Albany still peak hard.',
        bullets: [
          'Price portal-to-portal time honestly for capital-oriented legs.',
          'Clarify Albany County second addresses for drive-time assumptions.',
        ],
      },
      {
        id: 'high-value-sfh',
        title: 'Niskayuna high-value SFH',
        intro: 'Affluent inventories need explicit packing tiers.',
        bullets: [
          'Line-item packing for fine furniture and electronics.',
          'Confirm driveway staging on tree-lined streets.',
        ],
      },
    ],
    schoolsIntro:
      'Schenectady families compare Schenectady City, Niskayuna, Schalmont, Scotia-Glenville, and other districts — verify boundaries.',
    hospitalsDetail:
      'Ellis Hospital and Capital Region specialty spillover serve the county; map peak freeflow to Albany specialty care.',
    costIntro:
      'City stairs, high-value packing, and capital freeflow often matter more than raw miles.',
    seasonalIntro:
      'School years, lease ends, and winter ice reshape demand by pocket.',
  },
  {
    file: 'rensselaer-ny.ts',
    exportName: 'rensselaerCountyTier2Intelligence',
    slug: 'rensselaer',
    hubTitle: 'Rensselaer County Moving Intelligence Hub',
    eyebrow: 'Rensselaer · Troy · Capital Region east',
    h1: 'Moving in Rensselaer County: Troy City Stock, East Greenbush & I-90 East Collar',
    heroOpener:
      'Rensselaer County is Capital Region east — Troy multi-story and brownstone-adjacent stock, East Greenbush suburban corridors, Rensselaer city river edges, and I-90 freeflow toward Albany and points east. It is not Albany County west-of-river government core renamed: expect east-bank city stairs, university-adjacent turnover, and suburban belts that stage differently from Colonie defaults. This guide is for people moving in Rensselaer as capital-metro east collar — not a recycled Albany Tier 1 script.',
    heroCredibility:
      'Capital Region east · Troy multi-story · I-90 freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-90 · I-787 · US-4 · US-9 · NY-7 · NY-43',
    parentLabel: 'Albany County',
    parentHref: '/local-movers/new-york/albany',
    compareIntro:
      'Rensselaer is capital-metro east collar with Troy multi-story density — not Albany Plaza core alone and not pure suburban west-of-river product.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Albany crews fight downtown one-ways. Rensselaer pairs ride I-90, I-787, US-4, and NY-7 — freer mid-day east of the river, still peak-heavy on capital-oriented hops and Troy arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Albany mixes brownstones and first-ring suburbs. Rensselaer mixes Troy multi-story, East Greenbush SFH, and eastern larger lots — more east-bank city stairs under one county label.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Troy grids need curb plans and stair inventories; East Greenbush lots trade that for driveway staging uncommon in downtown multi-unit jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Rensselaer quotes often track capital-suburb rates — Troy multi-story soft costs can exceed simple suburban driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Rensselaer is capital east collar — not Albany government/education core renamed.',
      },
    ],
    whatIntro:
      'East-bank city stairs, I-90 freeflow, and suburban contrast — not interchangeable Albany boilerplate.',
    whatBullets: [
      {
        title: 'Troy multi-story is first-class product',
        detail:
          'Stairs and street parking define more jobs than pure suburban playbooks.',
      },
      {
        title: 'University-adjacent turnover is real',
        detail:
          'RPI-area calendars create lease clusters that do not map to pure family Saturdays.',
      },
      {
        title: 'I-90 freeflow is still billable',
        detail:
          'East Greenbush ↔ Albany pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Eastern larger lots add empty miles',
        detail:
          'Farther east pockets price differently from Troy city rates.',
      },
    ],
    zonesHeading:
      'Rensselaer zones: Troy core, East Greenbush belt, Rensselaer city edges & east lots',
    zonesIntro: 'Two to four sharp products — city, suburbs, river edges, and east lots.',
    zones: [
      {
        id: 'troy-core',
        name: 'Troy city core',
        shortName: 'Troy',
        neighborhoods: ['Troy', 'downtown', 'university edges'],
        housingTypes: 'Multi-story, multi-unit, some elevators',
        challenges: ['Stairs', 'Street parking', 'Student calendars'],
        moverTips: 'Inventory stairs; plan temporary no-parking; avoid peak move-out weekends.',
        keywords: ['troy'],
      },
      {
        id: 'east-greenbush',
        name: 'East Greenbush suburban belt',
        shortName: 'East Greenbush',
        neighborhoods: ['East Greenbush', 'Wynantskill edges', 'Defreestville'],
        housingTypes: 'Suburban SFH, townhomes',
        challenges: ['HOA packets', 'I-90 peaks'],
        moverTips: 'Collect HOA docs; build I-90 commute buffers.',
        keywords: ['east greenbush', 'wynantskill'],
      },
      {
        id: 'rensselaer-city',
        name: 'Rensselaer city river edges',
        shortName: 'Rensselaer city',
        neighborhoods: ['Rensselaer', 'river edges'],
        housingTypes: 'Multi-story, SFH, multi-unit',
        challenges: ['Tight streets', 'Stairs'],
        moverTips: 'Measure streets; inventory carries.',
        keywords: ['rensselaer'],
      },
      {
        id: 'east-lots',
        name: 'Eastern larger lots',
        shortName: 'East county',
        neighborhoods: ['Brunswick', 'Schodack', 'Nassau edges'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['brunswick', 'schodack', 'nassau'],
      },
    ],
    specialized: [
      {
        id: 'troy-stairs',
        title: 'Troy multi-story access',
        intro: 'City stairs are a first-class cost driver.',
        bullets: [
          'Inventory floor counts before comparing hourly rates.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'i90-east-collar',
        title: 'I-90 east-collar freeflow',
        intro: 'Capital-oriented pairs still peak hard.',
        bullets: [
          'Price portal-to-portal time honestly for East Greenbush ↔ Albany legs.',
          'Clarify Albany County second addresses for drive-time assumptions.',
        ],
      },
      {
        id: 'university-turnover',
        title: 'University-adjacent turnover',
        intro: 'RPI-area calendars create lease clusters.',
        bullets: [
          'Book early around term start/end weekends.',
          'Expect short-notice local demand spikes.',
        ],
      },
    ],
    schoolsIntro:
      'Rensselaer families compare Troy City, East Greenbush, Averill Park, and other districts — verify boundaries.',
    hospitalsDetail:
      'St. Peter’s / Samaritan and Capital Region specialty spillover serve the county; map peak freeflow for ER access.',
    costIntro:
      'City stairs, university calendars, and I-90 freeflow often matter more than raw miles.',
    seasonalIntro:
      'School years, term calendars, and winter ice reshape demand by pocket.',
  },
  {
    file: 'niagara-ny.ts',
    exportName: 'niagaraCountyTier2Intelligence',
    slug: 'niagara',
    hubTitle: 'Niagara County Moving Intelligence Hub',
    eyebrow: 'Niagara · Niagara Falls / North Tonawanda · North Buffalo',
    h1: 'Moving in Niagara County: Niagara Falls, North Tonawanda & Buffalo North Collar',
    heroOpener:
      'Niagara County is Buffalo’s northern collar and tourism edge — Niagara Falls multi-story and tourism-adjacent stock, North Tonawanda and Wheatfield suburban belts, Lockport seat corridors, and I-190 / NY-104 freeflow that still peaks toward Erie County. It is not Erie County Buffalo core renamed: expect tourism calendars, older multi-story inventory, and north-county freeflow different from Delaware Avenue elevators or Southtowns HOA scripts. This guide is for people moving in Niagara as a north Buffalo collar market — not a recycled Erie Tier 1 pack.',
    heroCredibility:
      'Buffalo north collar · Tourism + multi-story · I-190 freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-190 · I-290 · NY-104 · NY-31 · NY-265 · NY-62',
    parentLabel: 'Erie County',
    parentHref: '/local-movers/new-york/erie',
    compareIntro:
      'Niagara is Buffalo north collar and tourism-edge product — not Erie downtown elevators or Southtowns planned suburbs alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Erie crews fight Buffalo core peaks and Southtowns freeflow. Niagara pairs ride I-190, NY-104, and NY-31 — freer mid-day north of the city, still peak-heavy toward Erie portals and Falls tourism windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Erie mixes towers, first-ring multi-family, and Southtowns SFH. Niagara mixes Falls multi-story, North Tonawanda SFH, and Lockport corridors — more tourism-adjacent older stock, less continuous Southtowns HOA density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Falls streets and multi-story buildings need curb plans; winter lake-effect ice is first-class across both counties but tourism parking pressure is Niagara-specific.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Niagara quotes often sit near or slightly below dense Buffalo urban rates for driveway SFH — multi-story access and tourism peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Niagara is north collar + tourism edge — not Erie Buffalo core product renamed.',
      },
    ],
    whatIntro:
      'Tourism calendars, multi-story stock, and north-collar freeflow — not interchangeable Erie boilerplate.',
    whatBullets: [
      {
        title: 'Tourism peaks rewrite Falls weekends',
        detail:
          'Staging near tourist cores needs early starts and temporary no-parking plans.',
      },
      {
        title: 'Multi-story stock is first-class product',
        detail:
          'Stairs and older buildings need inventories different from pure suburban playbooks.',
      },
      {
        title: 'I-190 freeflow is still billable',
        detail:
          'Niagara ↔ Erie pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Canada adjacency creates cross-border complexity',
        detail:
          'International moves need specialized authority and paperwork — not a pure local NY job.',
      },
    ],
    zonesHeading:
      'Niagara zones: Falls core, North Tonawanda belt, Lockport corridor & east edges',
    zonesIntro: 'Two to four sharp products — tourism core, north suburbs, seat corridor, and east edges.',
    zones: [
      {
        id: 'falls-core',
        name: 'Niagara Falls core',
        shortName: 'Niagara Falls',
        neighborhoods: ['Niagara Falls', 'tourist corridor edges'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Tourism parking', 'Stairs', 'Tight streets'],
        moverTips: 'Avoid peak tourist windows; plan temporary no-parking.',
        keywords: ['niagara falls'],
      },
      {
        id: 'north-tonawanda',
        name: 'North Tonawanda / Wheatfield belt',
        shortName: 'North Tonawanda',
        neighborhoods: ['North Tonawanda', 'Wheatfield', 'Sanborn edges'],
        housingTypes: 'Suburban SFH, some multi-family',
        challenges: ['I-190 peaks', 'Mixed stock'],
        moverTips: 'Build buffer for Erie-oriented commute peaks.',
        keywords: ['north tonawanda', 'wheatfield', 'sanborn'],
      },
      {
        id: 'lockport',
        name: 'Lockport seat corridor',
        shortName: 'Lockport',
        neighborhoods: ['Lockport', 'South Lockport edges'],
        housingTypes: 'SFH, multi-story older stock',
        challenges: ['Mixed access', 'Arterial timing'],
        moverTips: 'Confirm street width on older blocks.',
        keywords: ['lockport'],
      },
      {
        id: 'east-edges',
        name: 'Eastern edges & larger lots',
        shortName: 'East Niagara',
        neighborhoods: ['Newfane', 'Wilson', 'Somerset edges'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice'],
        moverTips: 'Photo approaches; lake-effect mornings need flexibility.',
        keywords: ['newfane', 'wilson', 'somerset'],
      },
    ],
    specialized: [
      {
        id: 'tourism-access',
        title: 'Tourism-core access module',
        intro: 'Falls staging is not a quiet suburban curb.',
        bullets: [
          'Book around peak tourist windows when possible.',
          'Temporary no-parking is often required near dense corridors.',
        ],
      },
      {
        id: 'north-collar-freeflow',
        title: 'Buffalo north-collar freeflow',
        intro: 'I-190 pairs to Erie still peak hard.',
        bullets: [
          'Price portal-to-portal time honestly for Niagara ↔ Buffalo pairs.',
          'Clarify Erie County second addresses for drive-time assumptions.',
        ],
      },
      {
        id: 'winter-lake-effect',
        title: 'Lake-effect winter access',
        intro: 'Western New York ice rewrites curb plans.',
        bullets: [
          'Morning flexibility matters more than map freeflow after storms.',
          'Discuss split-day options rather than pushing into unsafe ice windows.',
        ],
      },
    ],
    schoolsIntro:
      'Niagara families compare Niagara Falls, North Tonawanda, Lockport, and other districts — verify boundaries.',
    hospitalsDetail:
      'Niagara Falls Memorial, Mount St. Mary’s, and Buffalo specialty spillover serve the region; map peak I-190 times.',
    costIntro:
      'Tourism peaks, multi-story access, and north-collar freeflow often matter more than raw miles.',
    seasonalIntro:
      'Tourism summers, school years, and lake-effect winters reshape demand by pocket.',
  },
  {
    file: 'oneida-ny.ts',
    exportName: 'oneidaCountyTier2Intelligence',
    slug: 'oneida',
    hubTitle: 'Oneida County Moving Intelligence Hub',
    eyebrow: 'Oneida · Utica / Rome · Mohawk Valley',
    h1: 'Moving in Oneida County: Utica, Rome & Mohawk Valley I-90 Corridor',
    heroOpener:
      'Oneida County is Mohawk Valley mid-state — Utica multi-story and multi-family stock, Rome corridors, New Hartford suburban belts, and I-90 freeflow that still peaks toward Syracuse. It is not Onondaga County Syracuse core renamed: expect independent mid-state city density, longer empty miles to rural edges, and freeflow different from Syracuse university calendars alone. This guide is for people moving in Oneida as a Mohawk Valley market — not a recycled Syracuse Tier 1 script.',
    heroCredibility:
      'Mohawk Valley · Utica / Rome · I-90 corridor · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-90 · NY-5 · NY-8 · NY-12 · NY-49 · NY-69',
    parentLabel: 'Onondaga County',
    parentHref: '/local-movers/new-york/onondaga',
    compareIntro:
      'Oneida is Mohawk Valley mid-state product — Utica/Rome density and I-90 freeflow — not Syracuse university/core calendars alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Onondaga crews fight Syracuse core peaks. Oneida pairs ride I-90, NY-5, NY-8, and NY-12 — freer mid-day mid-state, still peak-heavy on Utica arterials and Thruway-oriented legs.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Onondaga mixes university multi-family and suburban belts. Oneida mixes Utica multi-story, Rome corridors, and New Hartford SFH — independent mid-state density, not a Syracuse rename.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Utica multi-story needs stair inventories; rural edges add empty miles uncommon on inner Syracuse jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Oneida quotes often sit at or below dense Syracuse urban rates for driveway SFH — multi-story access and long empty-mile edges still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Oneida is Mohawk Valley mid-state — not Onondaga Syracuse core product renamed.',
      },
    ],
    whatIntro:
      'Mid-state city density, I-90 freeflow, and rural edges — not interchangeable Syracuse boilerplate.',
    whatBullets: [
      {
        title: 'Utica multi-story is first-class product',
        detail:
          'Stairs and street parking define more jobs than pure suburban playbooks.',
      },
      {
        title: 'I-90 freeflow is still billable',
        detail:
          'Oneida ↔ Onondaga pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Rural edges add empty miles',
        detail:
          'Far towns price differently from Utica/New Hartford rates.',
      },
      {
        title: 'Winter upstate ice is first-class',
        detail:
          'Morning flexibility matters more than map freeflow after freeze events.',
      },
    ],
    zonesHeading:
      'Oneida zones: Utica core, New Hartford belt, Rome corridor & rural edges',
    zonesIntro: 'Two to four sharp products — city, suburbs, Rome corridor, and rural edges.',
    zones: [
      {
        id: 'utica-core',
        name: 'Utica city core',
        shortName: 'Utica',
        neighborhoods: ['Utica', 'downtown', 'east/west Utica edges'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'Older stock'],
        moverTips: 'Inventory stairs; plan temporary no-parking.',
        keywords: ['utica'],
      },
      {
        id: 'new-hartford',
        name: 'New Hartford suburban belt',
        shortName: 'New Hartford',
        neighborhoods: ['New Hartford', 'Whitesboro edges', 'Yorkville edges'],
        housingTypes: 'Suburban SFH, townhomes',
        challenges: ['HOA packets', 'Arterial timing'],
        moverTips: 'Collect HOA docs; build arterial buffers.',
        keywords: ['new hartford', 'whitesboro', 'yorkville'],
      },
      {
        id: 'rome-corridor',
        name: 'Rome corridor',
        shortName: 'Rome',
        neighborhoods: ['Rome', 'NY-49 edges'],
        housingTypes: 'SFH, multi-story older stock',
        challenges: ['Mixed access', 'Empty miles to Utica'],
        moverTips: 'Price Rome ↔ Utica freeflow honestly.',
        keywords: ['rome'],
      },
      {
        id: 'rural-edges',
        name: 'Rural edges & larger lots',
        shortName: 'Rural Oneida',
        neighborhoods: ['Boonville', 'Camden', 'Vernon edges'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice', 'Soft shoulders'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['boonville', 'camden', 'vernon'],
      },
    ],
    specialized: [
      {
        id: 'utica-stairs',
        title: 'Utica multi-story access',
        intro: 'City stairs are a first-class cost driver.',
        bullets: [
          'Inventory floor counts before comparing hourly rates.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'i90-midstate',
        title: 'I-90 mid-state freeflow',
        intro: 'Thruway-oriented pairs still peak hard.',
        bullets: [
          'Price portal-to-portal time honestly for Oneida ↔ Onondaga legs.',
          'Clarify Syracuse addresses for drive-time assumptions.',
        ],
      },
      {
        id: 'winter-upstate',
        title: 'Upstate winter access',
        intro: 'Ice rewrites curb plans across the Mohawk Valley.',
        bullets: [
          'Morning flexibility matters after freeze events.',
          'Soft shoulders after thaw can block heavy trucks.',
        ],
      },
    ],
    schoolsIntro:
      'Oneida families compare Utica, New Hartford, Rome, and other districts — verify boundaries.',
    hospitalsDetail:
      'Mohawk Valley Health System and related campuses serve the region; map peak freeflow for ER access.',
    costIntro:
      'City stairs, empty-mile edges, and Thruway freeflow often matter more than raw miles.',
    seasonalIntro:
      'School years, lease ends, and winter ice reshape demand by pocket.',
  },
  {
    file: 'broome-ny.ts',
    exportName: 'broomeCountyTier2Intelligence',
    slug: 'broome',
    hubTitle: 'Broome County Moving Intelligence Hub',
    eyebrow: 'Broome · Binghamton · Southern Tier independent',
    h1: 'Moving in Broome County: Binghamton University Hub & Southern Tier Access',
    heroOpener:
      'Broome County is an independent Southern Tier hub — Binghamton multi-story and university-adjacent stock, Vestal and Endicott suburban belts, Johnson City corridors, and I-81 / NY-17 freeflow that does not answer to Syracuse or Albany scripts. It is not “upstate generic” and not an Onondaga rename: expect university calendars, river-valley city density, and longer empty miles to rural edges. This guide is for people moving in Broome as a Southern Tier independent market — not recycled Capital Region or Central NY packs.',
    heroCredibility:
      'Southern Tier independent · Binghamton university hub · I-81 / NY-17 · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-81 · NY-17 · US-11 · NY-26 · NY-434 · NY-201',
    parentLabel: 'independent Southern Tier (vs Central NY / Capital defaults)',
    parentHref: '/local-movers/new-york/onondaga',
    compareIntro:
      'Broome is a Southern Tier independent university/regional hub — not Syracuse core calendars and not Capital Region government freeflow alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Central NY crews fight Syracuse peaks. Broome pairs ride I-81, NY-17, and NY-434 — freer mid-day Southern Tier freeflow, still peak-heavy on Binghamton arterials and university move weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Onondaga mixes university multi-family and suburbs. Broome mixes Binghamton multi-story, Vestal SFH, and Endicott corridors — independent Southern Tier density, not a Syracuse rename.',
      },
      {
        title: 'Truck access & density',
        detail:
          'City hills and multi-story stock need stair inventories; rural edges add empty miles uncommon on inner Syracuse jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Broome quotes often sit at secondary mid-state rates for driveway SFH — multi-story access and university peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Broome is Southern Tier independent university/regional hub — not Central NY or Capital Region product renamed.',
      },
    ],
    whatIntro:
      'University calendars, Southern Tier freeflow, and city hills — not interchangeable upstate boilerplate.',
    whatBullets: [
      {
        title: 'Binghamton University calendars drive demand spikes',
        detail:
          'Term start/end weekends fill local crews first — not only family Saturdays.',
      },
      {
        title: 'City multi-story and hills are first-class product',
        detail:
          'Stairs and grades need inventories different from pure suburban playbooks.',
      },
      {
        title: 'I-81 / NY-17 freeflow is still billable',
        detail:
          'Cross-valley pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'PA adjacency creates interstate legs',
        detail:
          'Pennsylvania addresses require FMCSA authority even on short-looking hops.',
      },
    ],
    zonesHeading:
      'Broome zones: Binghamton core, Vestal belt, Endicott/JC corridor & rural edges',
    zonesIntro: 'Two to four sharp products — city, university suburbs, triple cities corridor, and rural edges.',
    zones: [
      {
        id: 'binghamton-core',
        name: 'Binghamton city core',
        shortName: 'Binghamton',
        neighborhoods: ['Binghamton', 'downtown', 'west/east side edges'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Hills', 'Street parking'],
        moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
        keywords: ['binghamton'],
      },
      {
        id: 'vestal',
        name: 'Vestal university suburb belt',
        shortName: 'Vestal',
        neighborhoods: ['Vestal', 'university edges'],
        housingTypes: 'SFH, student multi-family, apartments',
        challenges: ['Lease-end clusters', 'HOA/management packets'],
        moverTips: 'Book early around term calendars; collect building rules.',
        keywords: ['vestal'],
      },
      {
        id: 'endicott-jc',
        name: 'Endicott / Johnson City corridor',
        shortName: 'Endicott / JC',
        neighborhoods: ['Endicott', 'Johnson City', 'Endwell'],
        housingTypes: 'SFH, multi-story older stock',
        challenges: ['Mixed access', 'Arterial timing'],
        moverTips: 'Confirm street width on older blocks.',
        keywords: ['endicott', 'johnson city', 'endwell'],
      },
      {
        id: 'rural-edges',
        name: 'Rural edges & larger lots',
        shortName: 'Rural Broome',
        neighborhoods: ['Windsor', 'Deposit edges', 'northern towns'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['windsor', 'deposit'],
      },
    ],
    specialized: [
      {
        id: 'university-turnover',
        title: 'University-adjacent turnover',
        intro: 'Binghamton University calendars create lease clusters.',
        bullets: [
          'Book early around term start/end weekends.',
          'Expect short-notice local demand spikes in Vestal multi-family.',
        ],
      },
      {
        id: 'city-hills',
        title: 'Binghamton multi-story & hills',
        intro: 'City stairs and grades are first-class cost drivers.',
        bullets: [
          'Inventory floor counts and hill approaches.',
          'Temporary no-parking often beats long carries.',
        ],
      },
      {
        id: 'southern-tier-freeflow',
        title: 'I-81 / NY-17 Southern Tier freeflow',
        intro: 'Cross-valley pairs still peak hard.',
        bullets: [
          'Price portal-to-portal time honestly.',
          'Clarify PA second addresses for interstate authority.',
        ],
      },
    ],
    schoolsIntro:
      'Broome families compare Binghamton City, Vestal, Union-Endicott, Maine-Endwell, and other districts — verify boundaries.',
    hospitalsDetail:
      'UHS and Lourdes campuses anchor acute care; map peak freeflow across the Triple Cities.',
    costIntro:
      'University peaks, city stairs, and empty-mile edges often matter more than raw miles.',
    seasonalIntro:
      'Term calendars, school years, and winter ice reshape demand more than capital or NYC patterns.',
  },
  {
    file: 'ulster-ny.ts',
    exportName: 'ulsterCountyTier2Intelligence',
    slug: 'ulster',
    hubTitle: 'Ulster County Moving Intelligence Hub',
    eyebrow: 'Ulster · Kingston / New Paltz · Hudson Valley west',
    h1: 'Moving in Ulster County: Kingston, New Paltz College Town & Catskills Edge',
    heroOpener:
      'Ulster County is Hudson Valley west — Kingston multi-story and river-city stock, New Paltz college-town density, Saugerties and Woodstock tourism edges, and Catskills last-mile that rejects full trailers. It is not Orange Thruway retail corridors and not Dutchess east-bank rail villages alone: expect college calendars, tourism peaks, and mountain approaches under one county label. This guide is for people moving in Ulster as Hudson Valley west product — not a recycled Orange or Dutchess pack.',
    heroCredibility:
      'Hudson Valley west · College town + tourism · Catskills edge · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-87 · NY-28 · NY-32 · NY-9W · NY-299 · NY-212',
    parentLabel: 'Orange County',
    parentHref: '/local-movers/new-york/orange',
    parentAltLabel: 'Dutchess County',
    parentAltHref: '/local-movers/new-york/dutchess',
    compareIntro:
      'Ulster is Hudson Valley west with college-town and Catskills-edge product — not Orange I-87 retail freeflow and not Dutchess east-bank rail villages alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Orange crews fight Thruway outer-collar peaks. Ulster pairs ride I-87, NY-28, NY-32, and NY-9W — freer mid-day on some spines, still peak-heavy toward Kingston arterials and New Paltz term weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Orange mixes Newburgh city stock and Woodbury growth. Ulster mixes Kingston multi-story, New Paltz multi-family, and mountain cottages — more tourism/college product, less outlet-corridor suburban density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Mountain and village approaches often need smaller trucks; college multi-family needs COI packets uncommon on pure rural jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Ulster quotes often track secondary Hudson Valley rates — mountain shuttles and tourism peaks can price above quiet Orange driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Ulster is Hudson Valley west college + Catskills edge — not Orange outer NYC collar renamed.',
      },
    ],
    whatIntro:
      'College calendars, tourism peaks, and mountain last-mile — not interchangeable Orange boilerplate.',
    whatBullets: [
      {
        title: 'New Paltz term calendars drive demand spikes',
        detail:
          'Lease clusters fill local crews around term start/end — not only family Saturdays.',
      },
      {
        title: 'Catskills last-mile rejects full trailers',
        detail:
          'Narrow approaches and soft ground are first-class failure modes.',
      },
      {
        title: 'Kingston multi-story is first-class product',
        detail:
          'City stairs and street parking need inventories different from pure rural playbooks.',
      },
      {
        title: 'Tourism peaks rewrite weekends',
        detail:
          'Saugerties/Woodstock corridors need early staging plans in peak season.',
      },
    ],
    zonesHeading:
      'Ulster zones: Kingston core, New Paltz college town, tourism edges & Catskills last-mile',
    zonesIntro: 'Two to four sharp products — river city, college town, tourism edges, and mountain approaches.',
    zones: [
      {
        id: 'kingston-core',
        name: 'Kingston city core',
        shortName: 'Kingston',
        neighborhoods: ['Kingston', 'Uptown', 'Midtown', 'Rondout edges'],
        housingTypes: 'Multi-story, multi-unit, older SFH',
        challenges: ['Stairs', 'Street parking', 'Mixed stock'],
        moverTips: 'Inventory stairs; plan temporary no-parking.',
        keywords: ['kingston', 'rondout'],
      },
      {
        id: 'new-paltz',
        name: 'New Paltz college town',
        shortName: 'New Paltz',
        neighborhoods: ['New Paltz', 'campus edges'],
        housingTypes: 'Multi-family, SFH, student stock',
        challenges: ['Lease clusters', 'Tight streets', 'Building packets'],
        moverTips: 'Book early around term calendars; collect management rules.',
        keywords: ['new paltz'],
      },
      {
        id: 'tourism-edges',
        name: 'Saugerties / Woodstock tourism edges',
        shortName: 'Tourism edges',
        neighborhoods: ['Saugerties', 'Woodstock', 'Phoenicia edges'],
        housingTypes: 'SFH, cottages, some multi-story',
        challenges: ['Tourism parking', 'Narrow roads'],
        moverTips: 'Avoid peak weekend tourism windows when possible.',
        keywords: ['saugerties', 'woodstock', 'phoenicia'],
      },
      {
        id: 'catskills-last-mile',
        name: 'Catskills last-mile & larger lots',
        shortName: 'Catskills edge',
        neighborhoods: ['Shandaken', 'Olive', 'Denning edges', 'mountain roads'],
        housingTypes: 'Cottages, larger lots, steep approaches',
        challenges: ['Narrow roads', 'Soft shoulders', 'Winter ice'],
        moverTips: 'Photo approaches; discuss shuttle trucks early.',
        keywords: ['shandaken', 'olive', 'denning'],
      },
    ],
    specialized: [
      {
        id: 'college-turnover',
        title: 'College-town turnover module',
        intro: 'New Paltz calendars create lease clusters.',
        bullets: [
          'Book early around term start/end weekends.',
          'Expect short-notice multi-family demand spikes.',
        ],
      },
      {
        id: 'catskills-access',
        title: 'Catskills last-mile access',
        intro: 'Mountain approaches reject full trailers.',
        bullets: [
          'Photo the final approach before promising truck length.',
          'Soft ground after rain can block heavy equipment.',
        ],
      },
      {
        id: 'tourism-staging',
        title: 'Tourism-weekend staging',
        intro: 'Saugerties/Woodstock corridors change parking reality.',
        bullets: [
          'Prefer midweek starts in peak tourism season.',
          'Temporary no-parking often required near village cores.',
        ],
      },
    ],
    schoolsIntro:
      'Ulster families compare Kingston, New Paltz, Saugerties, Onteora, and other districts — verify boundaries.',
    hospitalsDetail:
      'HealthAlliance / Westchester Medical network campuses and related care serve the region; map peak freeflow for ER access.',
    costIntro:
      'College peaks, mountain shuttles, and tourism windows often matter more than raw miles.',
    seasonalIntro:
      'Term calendars, tourism summers, and winter mountain ice reshape demand by pocket.',
  },
  {
    file: 'ontario-ny.ts',
    exportName: 'ontarioCountyTier2Intelligence',
    slug: 'ontario',
    hubTitle: 'Ontario County Moving Intelligence Hub',
    eyebrow: 'Ontario · Canandaigua / Geneva · Finger Lakes / Rochester south',
    h1: 'Moving in Ontario County: Canandaigua, Geneva & Finger Lakes South of Rochester',
    heroOpener:
      'Ontario County is Finger Lakes south of Rochester — Canandaigua lake-town density, Geneva college-adjacent stock, Victor and Farmington growth corridors, and I-90 / NY-332 freeflow that still peaks toward Monroe County. It is not Monroe Rochester core renamed: expect lake last-mile, tourism calendars, and south-collar freeflow different from Brighton elevators or Greece suburban scripts. This guide is for people moving in Ontario as Finger Lakes / Rochester south collar — not a recycled Monroe Tier 1 pack.',
    heroCredibility:
      'Finger Lakes · Rochester south collar · Lake last-mile · NYSDOT household goods · FMCSA when interstate · Curated listings',
    majorCorridors: 'I-90 · I-490 · NY-332 · NY-5 · NY-21 · NY-14 · NY-96',
    parentLabel: 'Monroe County',
    parentHref: '/local-movers/new-york/monroe',
    compareIntro:
      'Ontario is Finger Lakes + Rochester south collar — lake-town and growth-corridor product — not Monroe Rochester core elevators alone.',
    compareBullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Monroe crews fight Rochester core peaks. Ontario pairs ride I-90, NY-332, NY-96, and lake corridors — freer mid-day south of the city, still peak-heavy toward Monroe portals and Canandaigua weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Monroe mixes elevators, first-ring multi-family, and suburbs. Ontario mixes lake-town multi-story, Victor growth SFH, and Geneva stock — more Finger Lakes product, less continuous Rochester core density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Lake approaches and village streets need smaller trucks more often; growth corridors add HOA packets uncommon on pure rural Finger Lakes jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Ontario quotes often sit near or slightly below dense Rochester urban rates for driveway SFH — lake access and tourism peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Ontario is Finger Lakes + Rochester south collar — not Monroe Rochester core product renamed.',
      },
    ],
    whatIntro:
      'Lake last-mile, south-collar freeflow, and tourism calendars — not interchangeable Monroe boilerplate.',
    whatBullets: [
      {
        title: 'Lake last-mile is a first-class failure mode',
        detail:
          'Narrow approaches and seasonal congestion rewrite truck plans near Canandaigua and Geneva.',
      },
      {
        title: 'Victor growth HOA is first-class product',
        detail:
          'Planned suburbs treat COI and approved hours as standard survey inputs.',
      },
      {
        title: 'I-90 / NY-332 freeflow is still billable',
        detail:
          'Ontario ↔ Monroe pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'College-adjacent Geneva turnover is real',
        detail:
          'Term calendars create lease clusters different from pure family Saturdays.',
      },
    ],
    zonesHeading:
      'Ontario zones: Canandaigua lake town, Victor growth, Geneva corridor & rural edges',
    zonesIntro: 'Two to four sharp products — lake town, growth corridor, college town, and rural edges.',
    zones: [
      {
        id: 'canandaigua',
        name: 'Canandaigua lake town',
        shortName: 'Canandaigua',
        neighborhoods: ['Canandaigua', 'lake edges'],
        housingTypes: 'Village multi-story, SFH, lake cottages',
        challenges: ['Tourism parking', 'Narrow roads', 'Seasonal congestion'],
        moverTips: 'Avoid peak lake weekends; measure approaches; plan no-parking signs.',
        keywords: ['canandaigua'],
      },
      {
        id: 'victor-growth',
        name: 'Victor / Farmington growth corridor',
        shortName: 'Victor growth',
        neighborhoods: ['Victor', 'Farmington', 'Eastview edges'],
        housingTypes: 'Planned SFH, townhomes, apartments',
        challenges: ['HOA packets', 'I-90 / NY-96 peaks'],
        moverTips: 'Collect HOA COIs; build commute buffers toward Monroe.',
        keywords: ['victor', 'farmington'],
      },
      {
        id: 'geneva',
        name: 'Geneva college-adjacent corridor',
        shortName: 'Geneva',
        neighborhoods: ['Geneva', 'NY-14 edges'],
        housingTypes: 'Multi-story, multi-family, SFH',
        challenges: ['Lease clusters', 'Street parking', 'Stairs'],
        moverTips: 'Book early around term calendars; inventory stairs.',
        keywords: ['geneva'],
      },
      {
        id: 'rural-edges',
        name: 'Rural edges & larger lots',
        shortName: 'Rural Ontario',
        neighborhoods: ['Canadice', 'Naples edges', 'south county lots'],
        housingTypes: 'Larger lots, rural approaches',
        challenges: ['Empty miles', 'Winter ice', 'Soft shoulders'],
        moverTips: 'Photo approaches; winter mornings need flexibility.',
        keywords: ['canadice', 'naples'],
      },
    ],
    specialized: [
      {
        id: 'lake-last-mile',
        title: 'Finger Lakes last-mile module',
        intro: 'Lake approaches reject full trailers more often than map miles suggest.',
        bullets: [
          'Photo the final approach before promising truck length.',
          'Tourism weekends change parking reality near village cores.',
        ],
      },
      {
        id: 'rochester-south-collar',
        title: 'Rochester south-collar freeflow',
        intro: 'I-90 / NY-332 pairs to Monroe still peak hard.',
        bullets: [
          'Price portal-to-portal time honestly for Ontario ↔ Monroe legs.',
          'Clarify Monroe County second addresses for drive-time assumptions.',
        ],
      },
      {
        id: 'growth-hoa',
        title: 'Victor growth HOA logistics',
        intro: 'Planned suburbs are first-class Ontario product.',
        bullets: [
          'Collect HOA packets before the estimate is final.',
          'Confirm approved move hours before booking Saturday crews.',
        ],
      },
    ],
    schoolsIntro:
      'Ontario families compare Canandaigua, Victor, Geneva, and other districts — verify boundaries.',
    hospitalsDetail:
      'FF Thompson and related campuses serve the region with Rochester specialty spillover; map peak freeflow for ER access.',
    costIntro:
      'Lake access, HOA soft costs, and south-collar freeflow often matter more than raw miles.',
    seasonalIntro:
      'Tourism summers, school years, term calendars, and winter ice reshape demand by pocket.',
  },
];

packs.push(...more);

function esc(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
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
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * ${p.slug} — NY Tier 2 Wave 1
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
${compareBullets}
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in ${p.slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ')} County different',
    intro: '${esc(p.whatIntro)}',
    bullets: [
${whatBullets},
      NY_TIER2_REG_BULLET,
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
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and college towns can tighten housing near school and term calendars.',
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
      ${parentAltItem}
    ],
  },
});
`;

  writeFileSync(
    `lib/local-movers/county-intelligence/new-york/${p.file}`,
    content
  );
  console.log('wrote', p.file);
}

for (const p of packs) writePack(p);
console.log(`Generated ${packs.length} packs (rockland is hand-written separately)`);
