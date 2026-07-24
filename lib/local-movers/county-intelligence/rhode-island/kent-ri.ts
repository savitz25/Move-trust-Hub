import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeRiPack,
  RI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/rhode-island/ri-shared';

/**
 * Kent County, RI — Warwick / T.F. Green airport / West Warwick suburban.
 * NOT Providence capital triple-decker clone south only.
 */
export const kentCountyRiIntelligence: CountyIntelligencePack = finalizeRiPack({
  countySlug: 'kent',
  hubTitle: 'Kent County Moving Intelligence Hub',
  eyebrow:
    'Kent County, RI · Warwick / airport / West Warwick & I-95 / RI-4 logistics',
  h1: 'Moving in Kent County: Warwick Access, T.F. Green Airport Freeflow & West Warwick Logistics',
  heroOpener:
    'Kent County, Rhode Island is Warwick multi-unit and airport-adjacent freeflow, West Warwick density, Coventry growth, East Greenwich character product, West Greenwich edges, and coastal Warwick necks — not a Providence capital triple-decker page renamed south. Expect T.F. Green Airport traffic that rewrites load windows, HOA and ranch cul-de-sacs that still need truck-length honesty, older West Warwick multi-unit stairs, and I-95 / RI-4 / US-1 freeflow across “local” pairs. A Warwick airport-adjacent condo, a West Warwick walk-up, an East Greenwich colonial, and a Coventry ranch do not share truck access or crew skill. Airport employment waves and school calendars are real inputs. This hub is for people moving in Kent County, RI — Warwick / airport suburban product — not a renamed Downtown Providence page.',
  heroCredibility:
    'RI DPUC Motor Carriers household goods certificate for intrastate · FMCSA for interstate · T.F. Green freeflow & Warwick multi-unit awareness · Curated listings',
  majorCorridors: 'I-95 · RI-4 · US-1 · local Warwick grid',
  whatMakesDifferent: {
    title: 'What makes moving in Kent County different',
    intro:
      'These are Kent County, Rhode Island realities — Warwick airport freeflow, West Warwick multi-unit, East Greenwich character product, and I-95 / RI-4 logistics — not Providence capital triple-decker defaults alone and not Newport peninsula historic grids.',
    bullets: [
      {
        title: 'This is Kent County Warwick / airport product — not Providence capital density',
        detail:
          'Ignore Downtown Providence triple-decker templates and East Side grade scripts as interchangeable defaults. Kent County is Rhode Island’s central suburban belt with Warwick, West Warwick, Coventry, East Greenwich, and West Greenwich product. Match estimates to Kent County addresses and Rhode Island DPUC authority — not Providence County capital logistics alone.',
      },
      {
        title: 'T.F. Green Airport freeflow rewrites “local” timing',
        detail:
          'Airport peak windows, rental-car corridors, and Post Road / Airport Road approaches burn portal time even when map miles look short. Price load and unload windows against flight-driven congestion, not map optimism.',
      },
      {
        title: 'Warwick multi-unit and coastal necks underprice access complexity',
        detail:
          'Condo elevators, scarce curb near retail corridors, and coastal Warwick neck geometry fail estimates more often than packing skill alone. Ranch cul-de-sacs inland do not share that packet stack.',
      },
      {
        title: 'West Warwick density and older multi-unit rewrite stair labor',
        detail:
          'Walk-ups, limited truck length, and tight residential curb across West Warwick multi-unit belts add flight counts flat-rate optimism underprices.',
      },
      {
        title: 'I-95, RI-4, and US-1 burn portal time',
        detail:
          'Warwick ↔ East Greenwich, West Warwick ↔ Coventry, or airport-adjacent ↔ West Greenwich pairs look local and still burn 20–45+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Metro and interstate pairs are routine',
        detail:
          'Households regularly move Kent County ↔ Providence, Washington, Newport, or Bristol County RI, or into Connecticut and Massachusetts corridors. A Rhode Island DPUC household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Rhode Island.',
      },
      RI_REG_BULLET,
    ],
  },
  zonesHeading: 'Kent County access zones',
  zonesIntro:
    'Plan by Warwick multi-unit and airport-adjacent product, West Warwick density, Coventry growth, East Greenwich character grids, West Greenwich edges, and coastal Warwick necks — access rules cluster by airport freeflow and housing product more than ZIP alone.',
  zones: [
    {
      id: 'warwick-airport-multi-unit',
      name: 'Warwick multi-unit, T.F. Green airport-adjacent & Post Road corridors',
      shortName: 'Warwick / airport',
      neighborhoods: [
        'Warwick',
        'T.F. Green Airport edges',
        'Post Road corridors',
        'Airport Road approaches',
        'Warwick multi-unit pockets',
        'Retail and hotel-adjacent belts',
      ],
      housingTypes: 'Mid-rise multifamily, condo, townhomes, mixed SFH',
      challenges: [
        'Elevator reservations, docks, and building COIs',
        'Airport freeflow and scarce curb near retail corridors',
        'I-95 / US-1 congestion into load windows',
      ],
      moverTips:
        'Book elevators and COIs in writing when required. Prefer mid-week early starts away from flight peaks. Photo curb staging options early near Post Road product.',
      cityKeywords: [
        'warwick',
        't.f. green',
        'tf green',
      ],
    },
    {
      id: 'west-warwick',
      name: 'West Warwick density, multi-unit & central Kent belts',
      shortName: 'West Warwick',
      neighborhoods: [
        'West Warwick',
        'Arctic edges',
        'Main Street corridors',
        'West Warwick multi-unit belts',
        'Central arterial edges',
        'Older mill-adjacent stock',
      ],
      housingTypes: 'Walk-up multifamily, duplexes, older SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight residential curb and older basements',
        'I-95 freeflow to Warwick and Providence pairs',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts. Inventory basements carefully and clarify West Warwick vs Warwick addresses.',
      cityKeywords: [
        'west warwick',
      ],
    },
    {
      id: 'coventry',
      name: 'Coventry growth, ranch belts & western Kent product',
      shortName: 'Coventry',
      neighborhoods: [
        'Coventry',
        'Tiogue edges',
        'Coventry Center edges',
        'Western ranch and HOA pockets',
        'Local arterial growth belts',
        'Rural-residential edges',
      ],
      housingTypes: 'Ranch and two-story SFH, townhomes, multi-family limited, HOA pockets',
      challenges: [
        'Longer empty miles to Warwick airport core',
        'Mixed driveway and HOA access product',
        'School-calendar summer peaks',
      ],
      moverTips:
        'Collect HOA packets when present. Price empty miles to Warwick and I-95 honestly. Survey rural driveway width and turnaround on edge lots.',
      cityKeywords: [
        'coventry',
      ],
    },
    {
      id: 'east-greenwich',
      name: 'East Greenwich character grids, Main Street & northern Kent edges',
      shortName: 'East Greenwich',
      neighborhoods: [
        'East Greenwich',
        'Main Street corridors',
        'Division Street edges',
        'Character SFH belts',
        'Northern multi-unit pockets',
        'RI-4 approach corridors',
      ],
      housingTypes: 'Character SFH, colonials, some multi-unit and condo stock',
      challenges: [
        'Tree-lined curb, driveway geometry, and long carries',
        'Municipal rule mix and scarce staging near Main Street',
        'RI-4 / I-95 freeflow',
      ],
      moverTips:
        'Confirm municipality on every estimate. Photo driveway turnarounds. Protect landscaping and older interiors; prefer mid-week curb windows.',
      cityKeywords: [
        'east greenwich',
      ],
    },
    {
      id: 'west-greenwich-edges',
      name: 'West Greenwich edges & southwestern Kent rural-residential',
      shortName: 'West Greenwich',
      neighborhoods: [
        'West Greenwich',
        'Southwestern rural-residential belts',
        'Local connector roads',
        'Wooded lot edges',
        'Cross-county approaches to Washington County',
        'Sparse multi-unit pockets',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit',
      challenges: [
        'Longer empty miles and mixed driveway access',
        'Gravel or narrow approach risk on edge lots',
        'I-95 / RI-4 approach freeflow',
      ],
      moverTips:
        'Price empty miles honestly. Survey driveway width, turnaround, and overhead clearance. Align with school calendars when relevant.',
      cityKeywords: [
        'west greenwich',
      ],
    },
    {
      id: 'coastal-warwick-necks',
      name: 'Coastal Warwick necks, gaspee & bay-adjacent product',
      shortName: 'Coastal Warwick',
      neighborhoods: [
        'Gaspee Plateau edges',
        'Conimicut edges',
        'Oakland Beach edges',
        'Buttonwoods edges',
        'Bay-adjacent multi-unit pockets',
        'Coastal Warwick necks',
      ],
      housingTypes: 'SFH, seasonal-adjacent product, multi-unit pockets, waterfront edges',
      challenges: [
        'Narrow neck approaches and scarce staging',
        'Seasonal tourism and beach-weekend freeflow',
        'Weather and tide-adjacent access risk on edge streets',
      ],
      moverTips:
        'Photo neck approaches and turnarounds early. Prefer mid-week non-beach-weekend starts. Protect landscaping and confirm truck length on tight streets.',
      cityKeywords: [
        'warwick',
        'gaspee',
        'conimicut',
        'oakland beach',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Kent County moving costs',
    intro:
      'Airport freeflow, multi-unit elevators, West Warwick stairs, coastal neck access, and I-95 / RI-4 timing move the number more than packing skill alone — this is Warwick / airport logistics, not Providence capital triple-decker defaults alone.',
    drivers: [
      {
        title: 'T.F. Green freeflow & Post Road congestion',
        detail:
          'Airport peaks and retail corridors rewrite load windows that look simple on a map.',
      },
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Warwick multi-unit and condo product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'West Warwick stairs, basements & curb limits',
        detail:
          'Older multi-unit stock adds flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-95 · RI-4 · US-1 congestion',
        detail:
          'Cross-Kent pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Metro & interstate empty miles',
        detail:
          'Providence, Washington, Newport, Bristol County RI destinations and Connecticut / Massachusetts pairs raise staging distance and authority complexity when leaving Kent County or Rhode Island.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,950+',
        note: 'Higher with elevators, walk-ups, or peak airport / I-95 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Stairs, multi-unit soft costs, and coastal necks trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$2,900–$9,200+',
        note: 'Airport freeflow and long I-95 / RI-4 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$210+/hr',
        note: 'Portal-to-portal; packing, stairs, COIs, and airport timing scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Kent County move',
    intro:
      'School calendars, airport employment cycles, summer beach freeflow on coastal necks, nor’easter risk, and winter ice reshape access and crew availability across the Kent County grid.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce I-95 / airport pain. Avoid month-end Fridays when leases and elevator slots collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends, elevator slots, and coastal Warwick neck access.',
      },
      {
        title: 'Airport & beach-weekend freeflow risk',
        detail:
          'Flight peaks and summer beach weekends raise staging risk near T.F. Green and coastal necks. Prefer flexible dates, early starts, and non-holiday weekends when possible.',
      },
      {
        title: 'Summer humidity & winter ice',
        detail:
          'June–August humidity and freeze-thaw winters reshape outdoor labor. Prefer early starts and weather contingency on older multi-unit and coastal stock.',
      },
    ],
  },
  specialized: [
    {
      id: 'warwick-airport-corridor',
      title: 'Warwick multi-unit, T.F. Green freeflow & I-95 / RI-4 logistics module',
      intro:
        'Kent County, RI estimates fail more often on airport freeflow, multi-unit COIs, West Warwick stairs, coastal neck access, and freeway timing than on packing skill alone.',
      bullets: [
        'Price load windows against T.F. Green flight peaks and Post Road congestion for Warwick airport-adjacent product.',
        'Book elevators and building COIs for Warwick multi-unit and condo stock before the survey is final.',
        'Photo stair counts, curb options, and basement access for West Warwick multi-unit belts.',
        'Survey neck approaches and truck length for coastal Warwick product; avoid beach-weekend starts when possible.',
        'Price portal-to-portal time for any pair that rides I-95, RI-4, or US-1 at peak.',
        'Clarify Warwick, West Warwick, Coventry, East Greenwich, West Greenwich, and unincorporated addresses on every estimate.',
        'For in-state jobs verify RI DPUC Motor Carriers household goods certificate status; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-providence-capital-not-newport',
      title: 'Not Providence capital · not Newport peninsula module',
      intro:
        'A single “Kent County rate” collapses when Warwick airport suburban product is confused with Providence triple-decker density or Newport historic peninsula logistics alone.',
      bullets: [
        'Do not price Warwick HOA and airport multi-unit like Downtown Providence triple-deckers or like Newport Historic Hill tight-street product as interchangeable defaults.',
        'State the market as Kent County, Rhode Island / Warwick–West Warwick on every estimate — distinct from Providence and Newport County logistics.',
        'Keep Rhode Island vs Connecticut / Massachusetts addresses clear when border pairs appear — interstate authority applies when any leg leaves Rhode Island.',
        'Match school-calendar peaks separately from airport mid-week employment windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Kent County?',
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
              'Kent County spans Warwick, West Warwick, Coventry, East Greenwich, and West Greenwich systems and related municipal arrangements. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive, especially near East Greenwich and Warwick demand belts. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Rhode Island Department of Education data, and campus visits beat ranking screenshots alone. Community college and regional campus options shape adult education demand more than K–12 rankings alone.',
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
              'Kent Hospital anchors local acute care, with regional access into Providence hospital systems for specialty services. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to Kent Hospital and Providence specialty campuses — I-95 freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect Warwick multi-unit and airport-adjacent product; West Warwick older multi-unit; Coventry ranch and growth SFH; East Greenwich character SFH; West Greenwich rural-residential; coastal Warwick necks.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by school district and product type. Budget for HOA dues where present, older-building repair risk, and competitive rental seasons near airport employment.',
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
            title: 'Warwick multi-unit / airport lifestyle',
            detail:
              'Suits people prioritizing airport access and amenities — with freeflow, elevator, and curb tradeoffs on move day.',
          },
          {
            title: 'East Greenwich character living',
            detail:
              'Often appeals for neighborhood feel and Main Street access — with driveway geometry and municipal rule mix.',
          },
          {
            title: 'Coventry / West Greenwich growth and edge living',
            detail:
              'Fits buyers chasing space and relative value — with longer empty miles to Warwick cores and mixed driveway access.',
          },
          {
            title: 'West Warwick denser living',
            detail:
              'Attracts households seeking relative value and central access — with older multi-unit logistics and stair surveys.',
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
              'T.F. Green Airport, healthcare, retail and logistics corridors, professional services, and reverse-commute pairs into Providence and Massachusetts concentrate demand across Kent County.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-95, RI-4, and US-1 freeflow is real — including Providence capital reverse pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Kent County, RI is Warwick / airport suburban density, coastal necks, and West Warwick multi-unit product — not Providence capital triple-decker defaults alone and not a Newport peninsula rename.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / coastal New England climate with humid summers, beach freeflow peaks, nor’easter risk, and freeze-thaw winters. Plan outdoor staging, ice, and humidity contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, airport cycles, and summer beach weekends reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Kent County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify RI DPUC household goods certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Warwick',
        href: 'https://www.warwickri.gov/',
        external: true,
        note: 'Largest Kent municipality & airport-adjacent context',
      },
      {
        label: 'Town of West Warwick',
        href: 'https://www.westwarwickri.org/',
        external: true,
        note: 'Central multi-unit municipality context',
      },
      {
        label: 'Town of East Greenwich',
        href: 'https://www.eastgreenwichri.com/',
        external: true,
        note: 'Character-grid municipality context',
      },
      {
        label: 'Town of Coventry',
        href: 'https://www.coventryri.org/',
        external: true,
        note: 'Western growth municipality context',
      },
      {
        label: 'Rhode Island T.F. Green International Airport',
        href: 'https://www.pvdairport.com/',
        external: true,
        note: 'Airport freeflow context for load windows',
      },
      {
        label: 'Rhode Island 511 — traveler information',
        href: 'https://www.ri511.com/',
        external: true,
        note: 'I-95 / RI-4 / US-1 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Warwick multi-unit and elevator/COI fluency; T.F. Green freeflow honesty for airport-adjacent windows; West Warwick stair and curb fluency; coastal neck access experience for bay-adjacent Warwick product; honest I-95 · RI-4 · US-1 timing for cross-zone pairs. Verify RI DPUC Motor Carriers household goods certificate for intrastate moves and FMCSA for interstate legs before deposits. This is Kent County, Rhode Island Warwick / airport product — not Providence capital triple-decker logistics alone.',
  lastReviewed: '2026-07-24',
});
