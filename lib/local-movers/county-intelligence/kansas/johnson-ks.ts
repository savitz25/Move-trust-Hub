import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKsPack,
  KS_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kansas/ks-shared';

/**
 * Johnson County, KS — JOCO / Overland Park / Olathe / KC metro KS suburbs.
 * NOT Johnson County, IA (Iowa City / University of Iowa).
 */
export const johnsonCountyKsIntelligence: CountyIntelligencePack = finalizeKsPack({
  countySlug: 'johnson',
  hubTitle: 'Johnson County Moving Intelligence Hub',
  eyebrow:
    'Johnson County, KS · JOCO / Overland Park / Olathe & I-35 / I-435 logistics',
  h1: 'Moving in Johnson County, KS: JOCO Access, Overland Park–Olathe HOAs & I-35 / I-435 Logistics',
  heroOpener:
    'Johnson County, Kansas is JOCO — Overland Park, Olathe, Lenexa, Shawnee, Leawood, Prairie Village, and the Kansas-side KC metro growth belt — not Johnson County, Iowa (Iowa City / University of Iowa campus density). Expect corporate campus corridors, master-planned HOA cul-de-sacs, Leawood and Prairie Village character grids, downtown Olathe multi-unit, and I-35 / I-435 / US-69 / K-10 freeflow that rewrites “local” estimates. A Corporate Woods elevator dock, a Leawood gated driveway, a Shawnee ranch, and a Prairie Village walk-up do not share truck access or crew skill. School calendars and corporate relocation waves are real inputs. This hub is for people moving in Johnson County, KS — JOCO — not a renamed Iowa City page.',
  heroCredibility:
    'KCC Certificate of Public Convenience and Necessity (HHG) for intrastate · FMCSA for interstate · JOCO HOA & I-35 / I-435 logistics awareness · Curated listings',
  majorCorridors: 'I-35 · I-435 · US-69 · K-10 · local JOCO arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Johnson County different',
    intro:
      'These are Johnson County, Kansas / JOCO realities — Overland Park and Olathe HOAs, Leawood character product, corporate corridors, and I-35 / I-435 freeflow — not Johnson County IA Iowa City campus density and not Missouri-side KCMO tower defaults alone.',
    bullets: [
      {
        title: 'This is Johnson County, Kansas (JOCO) — not Johnson County, Iowa',
        detail:
          'Ignore Iowa City / University of Iowa campus templates, Ped Mall multi-unit, and Coralville growth scripts. Johnson KS is the Kansas City metro suburban core with Overland Park, Olathe, Lenexa, Shawnee, Leawood, and Prairie Village product. Match estimates to JOCO addresses and Kansas KCC authority — not Iowa DOT scripts.',
      },
      {
        title: 'Overland Park and Olathe HOA growth rewrites suburban-simple jobs',
        detail:
          'Gate lists, truck-length limits, timed move windows, and school-calendar peaks dominate south and west growth belts. A Prairie Village bungalow or Mission multi-unit does not share that packet stack.',
      },
      {
        title: 'Leawood, Prairie Village, and Mission Hills character grids underprice flat-rate optimism',
        detail:
          'Tree-lined curb, long carries, older basements, and municipal rule mix across short distances fail estimates more often than packing skill alone.',
      },
      {
        title: 'Corporate campus and multi-unit corridors rewrite labor',
        detail:
          'Corporate Woods, Metcalf multi-unit, and office-adjacent loft product need elevator reservations, COIs, and scarce curb that ranch cul-de-sacs never see.',
      },
      {
        title: 'I-35, I-435, US-69, and K-10 burn portal time',
        detail:
          'Overland Park ↔ Olathe, Leawood ↔ Shawnee, or Lenexa ↔ Prairie Village pairs look local and still burn 25–55+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Metro and interstate pairs are routine',
        detail:
          'Households regularly move Johnson County ↔ Wyandotte, Douglas, or Leavenworth County, or across the state line into Missouri. A KCC Certificate of Public Convenience and Necessity alone does not authorize interstate delivery — verify FMCSA when any leg leaves Kansas.',
      },
      KS_REG_BULLET,
    ],
  },
  zonesHeading: 'Johnson County access zones',
  zonesIntro:
    'Plan by Overland Park core and corporate corridors, Olathe growth HOAs, Leawood–Prairie Village character grids, Shawnee–Lenexa west belts, Mission–Roeland Park northern multi-unit, and southern / western exurban edges — access rules cluster by HOA and municipal product more than ZIP alone.',
  zones: [
    {
      id: 'overland-park-core',
      name: 'Overland Park core, Corporate Woods & Metcalf multi-unit',
      shortName: 'Overland Park / core',
      neighborhoods: [
        'Downtown Overland Park edges',
        'Corporate Woods',
        'Metcalf Avenue corridors',
        'College Boulevard belts',
        'Nall corridors',
        'OP multi-unit pockets',
      ],
      housingTypes: 'Mid-rise multifamily, townhomes, condo, mixed SFH',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'Scarce curb near office and retail corridors',
        'I-435 / Metcalf freeflow',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early freight windows. Photo curb staging options early.',
      cityKeywords: [
        'overland park',
        'corporate woods',
      ],
    },
    {
      id: 'olathe-growth',
      name: 'Olathe growth HOAs, downtown Olathe & southern belts',
      shortName: 'Olathe',
      neighborhoods: [
        'Olathe',
        'Downtown Olathe edges',
        'K-10 corridors',
        'Southern Olathe HOAs',
        'Ridgeview corridors',
        'Santa Fe corridors',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch and two-story stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-35 / K-10 freeflow and longer empty miles vs north JOCO',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets and gate codes early. Confirm truck length rules. Price I-35 and K-10 honestly for northbound unload pairs.',
      cityKeywords: [
        'olathe',
      ],
    },
    {
      id: 'leawood-prairie-village',
      name: 'Leawood, Prairie Village, Mission Hills & eastern character grids',
      shortName: 'Leawood / PV',
      neighborhoods: [
        'Leawood',
        'Prairie Village',
        'Mission Hills',
        'Fairway edges',
        'Town Center edges',
        'State Line corridors',
      ],
      housingTypes: 'Character SFH, estate lots, some multi-unit pockets',
      challenges: [
        'Tree-lined curb, long carries, and driveway geometry',
        'Municipal rule mix across short distances',
        'State Line and arterial freeflow',
      ],
      moverTips:
        'Confirm municipality on every estimate. Photo driveway turnarounds. Protect landscaping and older interiors.',
      cityKeywords: [
        'leawood',
        'prairie village',
        'mission hills',
        'fairway',
      ],
    },
    {
      id: 'shawnee-lenexa',
      name: 'Shawnee, Lenexa & western growth belts',
      shortName: 'Shawnee / Lenexa',
      neighborhoods: [
        'Shawnee',
        'Lenexa',
        'Shawnee Mission Parkway corridors',
        'Lackman corridors',
        'Western HOA growth',
        'City Center Lenexa edges',
      ],
      housingTypes: 'HOA SFH, townhomes, multi-family, ranch and two-story stock',
      challenges: [
        'I-435 / K-10 / US-69 freeflow',
        'HOA packets and mixed municipal rules',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Collect HOA packets early. Clarify Shawnee vs Lenexa vs Overland Park addresses. Price I-435 honestly.',
      cityKeywords: [
        'shawnee',
        'lenexa',
      ],
    },
    {
      id: 'mission-roeland-park-north',
      name: 'Mission, Roeland Park, Merriam & northern multi-unit belts',
      shortName: 'Mission / north',
      neighborhoods: [
        'Mission',
        'Roeland Park',
        'Merriam',
        'Mission multi-unit corridors',
        'Johnson Drive corridors',
        'Northern arterial edges',
      ],
      housingTypes: 'Walk-up multifamily, older SFH, duplexes, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight residential curb and older basements',
        'Shawnee Mission Parkway freeflow',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts. Inventory basements carefully.',
      cityKeywords: [
        'mission',
        'roeland park',
        'merriam',
      ],
    },
    {
      id: 'southern-western-edges',
      name: 'Spring Hill, Gardner, De Soto & southern / western edges',
      shortName: 'South / west edges',
      neighborhoods: [
        'Spring Hill edges',
        'Gardner edges',
        'De Soto edges',
        'Edgerton edges',
        'Southern rural-residential belts',
        'Western county edges',
      ],
      housingTypes: 'SFH, HOA pockets, rural-residential, multi-unit limited',
      challenges: [
        'Longer empty miles to Overland Park core',
        'Mixed driveway and gravel access product',
        'I-35 / K-10 approach freeflow',
      ],
      moverTips:
        'Price empty miles honestly. Survey rural driveway width and turnaround. Align with school calendars when relevant.',
      cityKeywords: [
        'spring hill',
        'gardner',
        'de soto',
        'edgerton',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Johnson County moving costs',
    intro:
      'HOA admin, multi-unit elevators, character-grid stairs, and I-35 / I-435 freeflow move the number more than packing skill alone — this is JOCO / Overland Park–Olathe logistics, not Johnson County IA campus defaults.',
    drivers: [
      {
        title: 'HOA gates, truck-length rules & timed windows',
        detail:
          'Overland Park, Olathe, Shawnee, and Lenexa growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Corporate Woods and Metcalf multi-unit add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Character-grid stairs, basements & curb limits',
        detail:
          'Leawood, Prairie Village, Mission, and older multi-unit stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-35 · I-435 · US-69 · K-10 congestion',
        detail:
          'Cross-JOCO pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Metro & interstate empty miles',
        detail:
          'Wyandotte, Douglas, Leavenworth, and Missouri destinations raise staging distance and authority complexity when leaving Johnson County or Kansas.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators, walk-ups, or peak I-435 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Stairs, HOA, and multi-unit soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$3,000–$9,500+',
        note: 'Gated growth and long I-35 / I-435 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$205+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Johnson County move',
    intro:
      'School calendars, corporate relocation cycles, summer heat, severe-storm and tornado season, and winter ice reshape access and crew availability across the JOCO grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-35 / I-435 pain. Avoid month-end Fridays when leases and HOA slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots.',
      },
      {
        title: 'Severe-storm & tornado-season risk',
        detail:
          'Spring and early summer storms raise cancellation and staging risk. Prefer flexible dates, covered staging plans, and early starts when forecasts allow.',
      },
      {
        title: 'Summer heat & winter ice',
        detail:
          'June–August heat and freeze-thaw winters reshape outdoor labor. Prefer early starts and weather contingency on older character stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'joco-hoa-corridor',
      title: 'JOCO HOA, multi-unit & I-35 / I-435 logistics module',
      intro:
        'Johnson County, KS estimates fail more often on HOA packets, stair surveys, multi-unit COIs, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Collect HOA packets, gate codes, and truck-length rules for Overland Park, Olathe, Shawnee, and Lenexa product early.',
        'Book elevators and building COIs for Corporate Woods and Metcalf multi-unit before the survey is final.',
        'Photo stair counts, curb options, and basement access for Leawood, Prairie Village, Mission, and older stock.',
        'Price portal-to-portal time for any pair that rides I-35, I-435, US-69, or K-10 at peak.',
        'Clarify Overland Park, Olathe, Leawood, Shawnee, Lenexa, Prairie Village, Mission, and unincorporated addresses on every estimate.',
        'For in-state jobs verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs); verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-johnson-ia-not-kcmo',
      title: 'Not Johnson County IA · not KCMO-only module',
      intro:
        'A single “Johnson County rate” collapses when JOCO suburban product is confused with Iowa City university logistics or Missouri-side Kansas City tower defaults alone.',
      bullets: [
        'Do not price Overland Park HOAs like Iowa City campus multi-unit or like downtown Kansas City, MO towers as interchangeable defaults.',
        'State the market as Johnson County, Kansas / JOCO on every estimate — disambiguate from Johnson County, Iowa.',
        'Keep Kansas-side vs Missouri-side addresses clear when State Line pairs appear — interstate authority applies when any leg leaves Kansas.',
        'Match school-calendar peaks separately from corporate mid-week relocation windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Johnson County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Johnson County spans Blue Valley, Olathe, Shawnee Mission, De Soto, Spring Hill, Gardner Edgerton, and other systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Kansas State Department of Education data, and campus visits beat ranking screenshots alone.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'AdventHealth, Olathe Health, The University of Kansas Health System partners, and regional specialty campuses anchor care across JOCO. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-435, Metcalf, and I-35 freeflow change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect Overland Park multi-unit and corporate-adjacent product; Olathe and west HOA growth; Leawood–Prairie Village character SFH; Shawnee–Lenexa mixed stock; Mission–Roeland Park older multi-unit; southern and western edge SFH.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by school district and product type. Budget for HOA dues, older-building repair risk, and competitive rental seasons near employment corridors.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Overland Park core / multi-unit lifestyle',
            detail:
              'Suits people prioritizing corporate access and amenities — with elevator, curb, and I-435 freeflow tradeoffs on move day.',
          },
          {
            title: 'Leawood / Prairie Village character living',
            detail:
              'Often appeals for neighborhood feel and tree-lined grids — with driveway geometry and municipal rule mix.',
          },
          {
            title: 'Olathe / Shawnee / Lenexa growth belts',
            detail:
              'Fits buyers chasing newer product and schools — with HOA rules and longer empty miles to north JOCO cores.',
          },
          {
            title: 'Mission / Merriam northern living',
            detail:
              'Attracts households seeking relative value and northern access — with older multi-unit logistics and stair surveys.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Employment anchors',
            detail:
              'Corporate campuses, professional services, healthcare systems, logistics, retail headquarters, and KC metro reverse-commute patterns concentrate demand across JOCO.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-35, I-435, US-69, and K-10 freeflow is real — including Missouri-side and Wyandotte reverse pairs. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'Johnson County, KS is JOCO — Overland Park–Olathe suburban metro density, strong school-district marketing, and HOA growth — not Johnson County IA university product and not a Kansas City, MO downtown rename.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / southern plains climate with hot summers, severe-storm and tornado risk, and freeze-thaw winters. Plan outdoor staging, heat, and storm contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, corporate cycles, and storm season reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Johnson County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KCC Certificate of Public Convenience and Necessity (household goods) status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Johnson County, Kansas — official site',
        href: 'https://www.jocogov.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Overland Park',
        href: 'https://www.opkansas.org/',
        external: true,
        note: 'Largest JOCO municipality context',
      },
      {
        label: 'City of Olathe',
        href: 'https://www.olatheks.org/',
        external: true,
        note: 'Southern growth municipality context',
      },
      {
        label: 'City of Lenexa',
        href: 'https://www.lenexa.com/',
        external: true,
        note: 'Western growth municipality context',
      },
      {
        label: 'KanDrive — Kansas traveler information',
        href: 'https://www.kandrive.org/',
        external: true,
        note: 'I-35 / I-435 / US-69 / K-10 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with HOA gate fluency for Overland Park–Olathe–Shawnee–Lenexa product; elevator/COI experience for Corporate Woods and multi-unit; stair and character-grid fluency for Leawood–Prairie Village–Mission stock; honest I-35 · I-435 · US-69 · K-10 timing for cross-zone pairs. Verify KCC Certificate of Public Convenience and Necessity covering household goods (tariffs) for intrastate moves and FMCSA for interstate legs before deposits. This is Johnson County, Kansas (JOCO) — not Johnson County, Iowa.',
  lastReviewed: '2026-07-24',
});
