import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeRiPack,
  RI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/rhode-island/ri-shared';

/**
 * Providence County, RI — capital density / East Side / triple-deckers / I-95 / I-195.
 * NOT Warwick airport suburb product, NOT Newport peninsula historic product.
 */
export const providenceCountyRiIntelligence: CountyIntelligencePack = finalizeRiPack({
  countySlug: 'providence',
  hubTitle: 'Providence County Moving Intelligence Hub',
  eyebrow:
    'Providence County, RI · Capital density / East Side & I-95 / I-195 logistics',
  h1: 'Moving in Providence County: Capital Density, East Side Grids & I-95 / I-195 Logistics',
  heroOpener:
    'Providence County, Rhode Island is capital-city density — Downtown Providence multi-unit, East Side and College Hill character grids, Federal Hill–West End walk-ups, Cranston–Johnston west belts, North Providence–Pawtucket edges, and East Providence Seekonk-border product — not Warwick airport freeflow alone and not Newport peninsula historic logistics. Expect older triple-deckers, scarce curb on narrow arterials, elevator docks near hospitals and campus edges, and I-95 / I-195 / US-6 / RI-10 freeflow that rewrites “local” estimates. A College Hill walk-up, a Federal Hill third-floor triple-decker, a Cranston ranch, and a Pawtucket multi-unit do not share truck access or crew skill. University calendars and capital employment waves are real inputs. This hub is for people moving in Providence County, RI — dense small-state capital product — not a renamed Warwick or Newport page.',
  heroCredibility:
    'RI DPUC Motor Carriers household goods certificate for intrastate · FMCSA for interstate · Capital triple-decker & I-95 / I-195 logistics awareness · Curated listings',
  majorCorridors: 'I-95 · I-195 · US-6 · RI-10 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Providence County different',
    intro:
      'These are Providence County, Rhode Island realities — capital multi-unit density, East Side character product, triple-decker stock, and I-95 / I-195 freeflow — not Warwick T.F. Green airport suburb defaults and not Newport peninsula historic grids alone.',
    bullets: [
      {
        title: 'This is Providence County capital density — not Warwick or Newport product',
        detail:
          'Ignore airport-adjacent Warwick freeflow templates and Aquidneck peninsula historic scripts. Providence County is Rhode Island’s dense capital core with Downtown multi-unit, East Side College Hill, Federal Hill–West End, Cranston–Johnston, North Providence–Pawtucket, and East Providence edges. Match estimates to Providence County addresses and Rhode Island DPUC authority — not Kent or Newport County logistics defaults.',
      },
      {
        title: 'Triple-deckers and walk-up multi-unit rewrite stair labor',
        detail:
          'Providence, Pawtucket, Central Falls, and older Cranston stock routinely present three-flight carries, tight interior turns, and scarce truck length. Flat-rate optimism fails when crews undercount stairs and basement bulk.',
      },
      {
        title: 'East Side / College Hill character grids underprice curb geometry',
        detail:
          'Tree-lined curb, steep grades, limited staging, and older interiors across College Hill, Wayland, Fox Point edges, and Blackstone Boulevard belts fail estimates more often than packing skill alone.',
      },
      {
        title: 'Downtown and hospital-adjacent multi-unit rewrite COI and elevator work',
        detail:
          'Downtown Providence, hospital corridor product near Rhode Island Hospital and Miriam, and campus-adjacent loft stock need elevator reservations, building COIs, and timed freight windows ranch cul-de-sacs never see.',
      },
      {
        title: 'I-95, I-195, US-6, and RI-10 burn portal time',
        detail:
          'Downtown ↔ Cranston, East Side ↔ Johnston, or Pawtucket ↔ East Providence pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly across the capital grid.',
      },
      {
        title: 'Metro and interstate pairs are routine',
        detail:
          'Households regularly move Providence County ↔ Kent, Washington, Newport, or Bristol County RI, or across the Massachusetts line into Attleboro / Seekonk / Fall River belts. A Rhode Island DPUC household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Rhode Island.',
      },
      RI_REG_BULLET,
    ],
  },
  zonesHeading: 'Providence County access zones',
  zonesIntro:
    'Plan by Downtown Providence multi-unit, East Side / College Hill character grids, Federal Hill–West End walk-ups, North Providence–Pawtucket edges, Cranston–Johnston west belts, and East Providence / Seekonk-border edges — access rules cluster by housing product and curb geometry more than ZIP alone.',
  zones: [
    {
      id: 'downtown-providence-multi-unit',
      name: 'Downtown Providence multi-unit, hospital corridor & capital core',
      shortName: 'Downtown Providence',
      neighborhoods: [
        'Downtown Providence',
        'Jewelry District edges',
        'Capital Center edges',
        'Rhode Island Hospital corridor',
        'Westminster / Weybosset multi-unit',
        'Downtown loft and condo stock',
      ],
      housingTypes: 'Mid-rise multifamily, loft condo, walk-up multi-unit, limited SFH',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'Scarce curb near office, retail, and hospital corridors',
        'I-95 / I-195 freeflow into downtown approaches',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early freight windows. Photo curb staging options early and protect tight elevator lobbies.',
      cityKeywords: [
        'providence',
        'downtown providence',
      ],
    },
    {
      id: 'east-side-college-hill',
      name: 'East Side, College Hill, Wayland & character grids',
      shortName: 'East Side',
      neighborhoods: [
        'College Hill',
        'Wayland Square edges',
        'Fox Point edges',
        'Blackstone Boulevard belts',
        'Hope Street corridors',
        'East Side multi-unit pockets',
      ],
      housingTypes: 'Character SFH, duplex, triple-decker, older multi-unit, limited elevator stock',
      challenges: [
        'Steep grades, tree-lined curb, and long carries',
        'Scarce truck length on narrow residential streets',
        'University-calendar peaks near Brown / RISD edges',
      ],
      moverTips:
        'Survey stair counts and driveway geometry with photos. Prefer mid-week starts. Protect landscaping and older interiors; confirm curb permits where municipal rules apply.',
      cityKeywords: [
        'providence',
        'college hill',
        'east side',
      ],
    },
    {
      id: 'federal-hill-west-end',
      name: 'Federal Hill, West End, South Providence & western city grids',
      shortName: 'Federal Hill / West End',
      neighborhoods: [
        'Federal Hill',
        'West End',
        'South Providence edges',
        'Elmwood edges',
        'Atwells Avenue corridors',
        'Broadway multi-unit pockets',
      ],
      housingTypes: 'Triple-deckers, walk-up multifamily, duplexes, older SFH',
      challenges: [
        'Multi-flight stairs and tight interior turns',
        'Scarce curb and limited truck length',
        'US-6 / local arterial freeflow',
      ],
      moverTips:
        'Inventory third-floor triple-deckers carefully. Survey stair wells with photos. Prefer early starts before retail and restaurant curb fills.',
      cityKeywords: [
        'providence',
        'federal hill',
        'west end',
      ],
    },
    {
      id: 'north-providence-pawtucket',
      name: 'North Providence, Pawtucket, Central Falls & northern edges',
      shortName: 'North Prov / Pawtucket',
      neighborhoods: [
        'North Providence',
        'Pawtucket',
        'Central Falls',
        'Mineral Spring corridors',
        'Pawtucket multi-unit belts',
        'Northern arterial edges',
      ],
      housingTypes: 'Triple-deckers, older multi-unit, duplexes, mixed SFH',
      challenges: [
        'Dense walk-up stock and scarce curb',
        'I-95 freeflow and cross-city empty miles',
        'Municipal rule mix across short distances',
      ],
      moverTips:
        'Clarify North Providence vs Pawtucket vs Central Falls addresses. Survey stairs and basement access. Price I-95 honestly for downtown unload pairs.',
      cityKeywords: [
        'north providence',
        'pawtucket',
        'central falls',
      ],
    },
    {
      id: 'cranston-johnston-west',
      name: 'Cranston, Johnston & western suburban belts',
      shortName: 'Cranston / Johnston',
      neighborhoods: [
        'Cranston',
        'Johnston',
        'Garden City edges',
        'Reservoir Avenue corridors',
        'Western HOA and ranch pockets',
        'US-6 western belts',
      ],
      housingTypes: 'Ranch and two-story SFH, townhomes, multi-family pockets, some HOA product',
      challenges: [
        'I-95 / US-6 / RI-10 freeflow to capital core',
        'Mixed driveway and multi-unit access product',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Confirm Cranston vs Johnston municipality. Collect HOA packets when present. Price empty miles to East Side and Downtown honestly.',
      cityKeywords: [
        'cranston',
        'johnston',
      ],
    },
    {
      id: 'east-providence-seekonk-edges',
      name: 'East Providence, Seekonk-border edges & eastern belts',
      shortName: 'East Providence',
      neighborhoods: [
        'East Providence',
        'Riverside edges',
        'Rumford edges',
        'Taunton Avenue corridors',
        'Seekonk-border approaches',
        'Eastern multi-unit pockets',
      ],
      housingTypes: 'SFH, multi-unit, duplexes, limited elevator stock',
      challenges: [
        'I-195 freeflow and Massachusetts border pairs',
        'Mixed curb geometry and older multi-unit stairs',
        'Interstate authority when any leg enters Massachusetts',
      ],
      moverTips:
        'Clarify Rhode Island vs Massachusetts addresses on every estimate. Price I-195 honestly. Verify FMCSA when any leg leaves Rhode Island.',
      cityKeywords: [
        'east providence',
        'riverside',
        'rumford',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Providence County moving costs',
    intro:
      'Triple-decker stairs, multi-unit elevators, East Side curb geometry, and I-95 / I-195 freeflow move the number more than packing skill alone — this is capital-density logistics, not Warwick airport or Newport peninsula defaults.',
    drivers: [
      {
        title: 'Triple-decker stairs, basements & tight interiors',
        detail:
          'Providence, Pawtucket, Central Falls, and older city stock add flight counts and bulk that flat-rate optimism underprices.',
      },
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown, hospital-corridor, and campus-adjacent multi-unit add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'East Side grades, tree-lined curb & scarce truck length',
        detail:
          'College Hill, Wayland, and character grids fail estimates on carry distance and staging more often than inventory alone.',
      },
      {
        title: 'I-95 · I-195 · US-6 · RI-10 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short across the capital grid.',
      },
      {
        title: 'Metro & interstate empty miles',
        detail:
          'Kent, Newport, Bristol, Washington County RI destinations and Massachusetts border pairs raise staging distance and authority complexity when leaving Providence County or Rhode Island.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$550–$2,100+',
        note: 'Higher with triple-decker stairs, elevators, or peak I-95 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,600–$4,800+',
        note: 'Stairs, multi-unit soft costs, and East Side curb trend up',
      },
      {
        label: '3–4+ BR / triple-decker / cross-zone',
        value: '$3,200–$10,000+',
        note: 'Third-floor triple-deckers and long I-95 / I-195 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$215+/hr',
        note: 'Portal-to-portal; packing, stairs, COIs, and curb admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Providence County move',
    intro:
      'University calendars, capital employment cycles, summer humidity, nor’easter risk, and winter ice reshape access and crew availability across the Providence County grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-95 / I-195 pain. Avoid month-end Fridays when leases and elevator slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars, university turnover, and apartment lease churn fill first. Book 2–4 weeks ahead for peak weekends and elevator or curb-permit slots.',
      },
      {
        title: 'University & capital employment waves',
        detail:
          'Late August and mid-year academic and hospital hiring windows tighten East Side and downtown multi-unit capacity. Prefer flexible dates near campus and hospital corridors.',
      },
      {
        title: 'Summer humidity & winter ice',
        detail:
          'June–August humidity and freeze-thaw winters reshape outdoor labor on triple-deckers and East Side grades. Prefer early starts and weather contingency on older stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'capital-triple-decker-corridor',
      title: 'Capital density, triple-decker & I-95 / I-195 logistics module',
      intro:
        'Providence County, RI estimates fail more often on stair surveys, multi-unit COIs, East Side curb geometry, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Survey triple-decker stair counts, interior turns, and basement bulk with photos for Providence, Pawtucket, Central Falls, and older multi-unit stock.',
        'Book elevators and building COIs for Downtown and hospital-corridor product before the survey is final.',
        'Photo curb options, grades, and truck-length limits for East Side / College Hill character grids.',
        'Price portal-to-portal time for any pair that rides I-95, I-195, US-6, or RI-10 at peak.',
        'Clarify Providence, North Providence, Pawtucket, Central Falls, Cranston, Johnston, East Providence, and unincorporated addresses on every estimate.',
        'For in-state jobs verify RI DPUC Motor Carriers household goods certificate status; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-warwick-not-newport',
      title: 'Not Warwick airport · not Newport peninsula module',
      intro:
        'A single “Providence County rate” collapses when capital triple-decker product is confused with Kent County airport freeflow or Newport historic peninsula logistics alone.',
      bullets: [
        'Do not price East Side walk-ups like Warwick HOA cul-de-sacs or like Newport Historic Hill tight-street product as interchangeable defaults.',
        'State the market as Providence County, Rhode Island / capital density on every estimate — distinct from Kent and Newport County logistics.',
        'Keep Rhode Island vs Massachusetts addresses clear when Seekonk / Attleboro / Fall River pairs appear — interstate authority applies when any leg leaves Rhode Island.',
        'Match university-calendar peaks separately from capital mid-week employment windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Providence County?',
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
              'Providence County spans Providence Public Schools, Cranston, Pawtucket, East Providence, North Providence, Johnston, Central Falls, and other municipal systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Charter and choice programs plus boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year, especially near East Side and Cranston demand belts.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Rhode Island Department of Education data, and campus visits beat ranking screenshots alone. Brown, RISD, Providence College, and Johnson & Wales shape rental demand more than K–12 rankings alone.',
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
              'Rhode Island Hospital, The Miriam Hospital, Hasbro Children’s, Women & Infants, and regional partners anchor care across Providence County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-95, I-195, and downtown freeflow change “nearby” on paper. Transfer records early and note hospital-corridor curb limits on move day.',
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
              'Expect Downtown multi-unit and loft product; East Side character SFH and walk-ups; Federal Hill–West End triple-deckers; North Providence–Pawtucket older multi-unit; Cranston–Johnston suburban SFH; East Providence mixed stock.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by neighborhood product and school assignment. Budget for older-building repair risk, parking scarcity, and competitive rental seasons near universities and hospital employment.',
          },
          {
            title: 'Building and multi-unit governance',
            detail:
              'Condo associations and multi-unit management often control move hours, truck size, elevators, and deposits. Read documents carefully before deposit day.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Downtown / multi-unit lifestyle',
            detail:
              'Suits people prioritizing capital access, transit, and amenities — with elevator, curb, and I-95 freeflow tradeoffs on move day.',
          },
          {
            title: 'East Side / College Hill character living',
            detail:
              'Often appeals for walkability and neighborhood feel — with grades, scarce curb, and university-calendar peaks.',
          },
          {
            title: 'Cranston / Johnston suburban belts',
            detail:
              'Fits buyers chasing yards, schools, and relative space — with longer empty miles to Downtown and East Side cores.',
          },
          {
            title: 'Pawtucket / North Providence northern living',
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
              'State government, healthcare systems, higher education, professional services, jewelry and manufacturing legacy corridors, and reverse-commute pairs into Massachusetts concentrate demand across Providence County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-95, I-195, US-6, and RI-10 freeflow is real — including Massachusetts reverse pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Providence County, RI is dense small-state capital product — triple-deckers, East Side grids, and hospital/campus corridors — not Warwick airport suburb defaults and not a Newport peninsula rename.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / coastal New England climate with humid summers, nor’easter risk, and freeze-thaw winters. Plan outdoor staging, ice, and humidity contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — university calendars, capital employment cycles, and winter storms reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Providence County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify RI DPUC household goods certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Providence County context — State of Rhode Island',
        href: 'https://www.ri.gov/',
        external: true,
        note: 'Statewide services & property context',
      },
      {
        label: 'City of Providence',
        href: 'https://www.providenceri.gov/',
        external: true,
        note: 'Capital municipality context',
      },
      {
        label: 'City of Cranston',
        href: 'https://www.cranstonri.gov/',
        external: true,
        note: 'Western suburban municipality context',
      },
      {
        label: 'City of Pawtucket',
        href: 'https://www.pawtucketri.com/',
        external: true,
        note: 'Northern multi-unit municipality context',
      },
      {
        label: 'City of East Providence',
        href: 'https://eastprovidenceri.gov/',
        external: true,
        note: 'Eastern Seekonk-border municipality context',
      },
      {
        label: 'Rhode Island 511 — traveler information',
        href: 'https://www.ri511.com/',
        external: true,
        note: 'I-95 / I-195 / US-6 / RI-10 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with triple-decker and walk-up stair fluency for Providence–Pawtucket–Central Falls product; elevator/COI experience for Downtown and hospital corridors; East Side grade and curb fluency for College Hill–Wayland stock; honest I-95 · I-195 · US-6 · RI-10 timing for cross-zone pairs. Verify RI DPUC Motor Carriers household goods certificate for intrastate moves and FMCSA for interstate legs before deposits. This is Providence County, Rhode Island capital density — not Warwick airport product and not Newport peninsula logistics.',
  lastReviewed: '2026-07-24',
});
