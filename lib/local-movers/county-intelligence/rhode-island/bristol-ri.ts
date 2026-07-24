import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeRiPack,
  RI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/rhode-island/ri-shared';

/**
 * Bristol County, RI — East Bay: Bristol, Barrington, Warren.
 * Tiny East Bay county — NOT Bristol County MA (Fall River / New Bedford / Taunton).
 * NOT Providence east clone only.
 */
export const bristolCountyRiIntelligence: CountyIntelligencePack = finalizeRiPack({
  countySlug: 'bristol',
  hubTitle: 'Bristol County Moving Intelligence Hub',
  eyebrow:
    'Bristol County, RI · East Bay / Barrington–Warren & RI-114 / RI-136 logistics',
  h1: 'Moving in Bristol County, RI: East Bay Access, Barrington–Warren Grids & RI-114 Logistics',
  heroOpener:
    'Bristol County, Rhode Island is tiny East Bay product — Bristol waterfront grids, Barrington character and school-driven demand, Warren multi-unit and village stock, East Bay multi-unit pockets, rural and edge Bristol County RI belts, and Mt. Hope Bay edges — not Bristol County, Massachusetts (Fall River / New Bedford / Taunton scale) and not a Providence east-side rename alone. Expect narrow waterfront approaches, tourism and festival freeflow in Bristol, school-calendar peaks in Barrington, and RI-114 / RI-136 freeflow across short “local” pairs that still burn portal time. A Bristol harbor walk-up, a Barrington colonial, a Warren triple-decker pocket, and an edge ranch do not share truck access or crew skill. School calendars and East Bay reverse-commute waves are real inputs. This hub is for people moving in Bristol County, RI — East Bay — not Bristol County, MA.',
  heroCredibility:
    'RI DPUC Motor Carriers household goods certificate for intrastate · FMCSA for interstate · East Bay waterfront & RI-114 logistics awareness · Curated listings',
  majorCorridors: 'RI-114 · RI-136 · local East Bay grid',
  whatMakesDifferent: {
    title: 'What makes moving in Bristol County, RI different',
    intro:
      'These are Bristol County, Rhode Island / East Bay realities — Bristol waterfront, Barrington character product, Warren village density, and RI-114 logistics — not Bristol County MA industrial scale and not Providence capital triple-decker defaults alone.',
    bullets: [
      {
        title: 'This is Bristol County, Rhode Island (East Bay) — not Bristol County, Massachusetts',
        detail:
          'Ignore Fall River, New Bedford, Taunton, and Massachusetts Bristol County industrial/metro templates. Bristol County RI is a small East Bay county with Bristol, Barrington, and Warren only. Match estimates to Rhode Island East Bay addresses and Rhode Island DPUC authority — never Massachusetts Bristol County logistics or MA mover-credential scripts.',
      },
      {
        title: 'East Bay waterfront grids underprice tight access',
        detail:
          'Bristol harbor approaches, Mt. Hope Bay edges, and narrow residential streets limit truck length and staging. Flat-rate optimism fails when crews cannot stage near the door.',
      },
      {
        title: 'Barrington character product and school calendars rewrite suburban-simple jobs',
        detail:
          'Tree-lined curb, long carries, driveway geometry, and competitive school-year peaks dominate Barrington belts that Warren multi-unit or Bristol walk-ups do not share.',
      },
      {
        title: 'Warren multi-unit and village density rewrite stair labor',
        detail:
          'Walk-ups, older interiors, and scarce curb across Warren village product add flight counts ranch cul-de-sacs never see.',
      },
      {
        title: 'RI-114 and RI-136 burn portal time',
        detail:
          'Barrington ↔ Bristol, Warren ↔ East Providence edges, or East Bay ↔ Providence capital pairs look local and still burn 20–45+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Metro and interstate pairs are routine',
        detail:
          'Households regularly move Bristol County RI ↔ Providence, Kent, Newport, or Washington County, or across into Massachusetts East Bay and Bristol County MA corridors. A Rhode Island DPUC household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Rhode Island.',
      },
      RI_REG_BULLET,
    ],
  },
  zonesHeading: 'Bristol County, RI (East Bay) access zones',
  zonesIntro:
    'Plan by Bristol waterfront, Barrington character grids, Warren village multi-unit, East Bay multi-unit pockets, rural/edge Bristol County RI belts, and Mt. Hope Bay edges — access rules cluster by waterfront geometry and municipal product more than ZIP alone. This is Rhode Island East Bay, not Bristol County MA.',
  zones: [
    {
      id: 'bristol-waterfront',
      name: 'Bristol waterfront, harbor grids & downtown multi-unit',
      shortName: 'Bristol waterfront',
      neighborhoods: [
        'Bristol',
        'Downtown Bristol edges',
        'Hope Street corridors',
        'Harbor multi-unit pockets',
        'Thames Street edges',
        'Waterfront SFH belts',
      ],
      housingTypes: 'Walk-up multi-unit, historic SFH, condo pockets, waterfront edges',
      challenges: [
        'Narrow waterfront approaches and scarce staging',
        'Festival and tourism freeflow (including Independence Day peaks)',
        'Multi-flight stairs and older interiors',
      ],
      moverTips:
        'Prefer mid-week non-festival starts in peak season. Photo curb and truck-length options early. Protect historic interiors and landscaping.',
      cityKeywords: [
        'bristol',
      ],
    },
    {
      id: 'barrington',
      name: 'Barrington character grids, school belts & East Bay SFH',
      shortName: 'Barrington',
      neighborhoods: [
        'Barrington',
        'Barrington Village edges',
        'County Road corridors',
        'Nayatt edges',
        'Rumstick edges',
        'Character SFH belts',
      ],
      housingTypes: 'Character SFH, colonials, limited multi-unit, waterfront edges',
      challenges: [
        'Tree-lined curb, driveway geometry, and long carries',
        'School-calendar summer peaks and competitive move windows',
        'RI-114 freeflow to Providence and Bristol pairs',
      ],
      moverTips:
        'Photo driveway turnarounds and landscaping. Align with school calendars. Prefer mid-week starts; confirm Barrington vs East Providence vs Warren addresses carefully.',
      cityKeywords: [
        'barrington',
      ],
    },
    {
      id: 'warren',
      name: 'Warren village multi-unit, Main Street & northern East Bay',
      shortName: 'Warren',
      neighborhoods: [
        'Warren',
        'Main Street corridors',
        'Water Street edges',
        'Warren multi-unit pockets',
        'Northern village belts',
        'Kickemuit edges',
      ],
      housingTypes: 'Walk-up multifamily, duplexes, older SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Tight village curb and older basements',
        'RI-114 / RI-136 freeflow',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts before retail curb fills. Inventory basements carefully.',
      cityKeywords: [
        'warren',
      ],
    },
    {
      id: 'east-bay-multi-unit-pockets',
      name: 'East Bay multi-unit pockets, condo & mixed walk-up stock',
      shortName: 'East Bay multi-unit',
      neighborhoods: [
        'East Bay multi-unit pockets',
        'Condo corridors',
        'Route 114 multi-unit edges',
        'Mixed village walk-ups',
        'Limited elevator buildings',
        'Commercial-adjacent rental stock',
      ],
      housingTypes: 'Walk-up multifamily, condo, duplexes, limited elevators',
      challenges: [
        'Elevator/COI needs where present',
        'Scarce curb and stair labor variation by building',
        'Cross-town empty miles across Barrington–Warren–Bristol',
      ],
      moverTips:
        'Book elevators and COIs when required. Survey stair counts building-by-building. Clarify municipality on every estimate.',
      cityKeywords: [
        'bristol',
        'barrington',
        'warren',
      ],
    },
    {
      id: 'rural-edge-bristol-ri',
      name: 'Rural and edge Bristol County RI belts',
      shortName: 'Edge Bristol RI',
      neighborhoods: [
        'Southern Bristol edges',
        'Interior lot belts',
        'Rural-residential pockets',
        'Cross-county approaches to Newport County',
        'Sparse multi-unit stock',
        'Edge connector roads',
      ],
      housingTypes: 'SFH, rural-residential, limited multi-unit',
      challenges: [
        'Longer empty miles relative to waterfront cores',
        'Mixed driveway and overhead clearance risk',
        'Sparse staging options on edge lots',
      ],
      moverTips:
        'Price empty miles honestly even inside this small county. Survey driveway width and turnaround. Align with school calendars when relevant.',
      cityKeywords: [
        'bristol',
      ],
    },
    {
      id: 'mt-hope-bay-edges',
      name: 'Mt. Hope Bay edges, bridge approaches & bay-adjacent product',
      shortName: 'Mt. Hope Bay',
      neighborhoods: [
        'Mt. Hope Bay edges',
        'Mount Hope Bridge approaches',
        'Bay-adjacent SFH',
        'Waterfront lot corridors',
        'Cross-bay visual edges to Portsmouth',
        'Coastal connector streets',
      ],
      housingTypes: 'Waterfront SFH, multi-unit limited, bay-adjacent stock',
      challenges: [
        'Narrow approaches and weather-exposed staging',
        'Bridge freeflow into Newport County pairs',
        'Seasonal freeflow near bay corridors',
      ],
      moverTips:
        'Photo approaches and turnarounds early. Price bridge freeflow for Portsmouth / Newport pairs. Protect landscaping and confirm truck length.',
      cityKeywords: [
        'bristol',
        'mount hope',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Bristol County, RI moving costs',
    intro:
      'Waterfront access limits, Barrington character-grid carries, Warren stairs, festival freeflow, and RI-114 / RI-136 timing move the number more than packing skill alone — this is Rhode Island East Bay logistics, not Bristol County MA scale and not Providence capital defaults alone.',
    drivers: [
      {
        title: 'Waterfront truck-length limits, tight turns & scarce staging',
        detail:
          'Bristol harbor and bay-edge product rewrite jobs that look simple on a map.',
      },
      {
        title: 'Barrington driveway geometry, stairs & school-calendar peaks',
        detail:
          'Character SFH and competitive summer windows add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Warren village stairs, basements & curb limits',
        detail:
          'Older multi-unit stock adds flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'RI-114 · RI-136 congestion',
        detail:
          'Cross–East Bay and Providence pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Metro & interstate empty miles',
        detail:
          'Providence, Newport, Kent destinations and Massachusetts East Bay / Bristol County MA pairs raise staging distance and authority complexity when leaving Bristol County RI or Rhode Island.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,950+',
        note: 'Higher with waterfront access limits, walk-ups, or peak RI-114 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Stairs, character-grid carries, and festival freeflow soft costs trend up',
      },
      {
        label: '3–4+ BR / waterfront / cross-zone',
        value: '$2,900–$9,200+',
        note: 'Barrington character product and long East Bay / Providence pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$210+/hr',
        note: 'Portal-to-portal; packing, stairs, curb admin, and freeflow scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Bristol County, RI move',
    intro:
      'School calendars, Bristol festival and tourism freeflow, summer humidity, nor’easter risk, and winter ice reshape access and crew availability across the East Bay grid — not Bristol County MA industrial calendars.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease multi-unit freight windows, and reduce RI-114 pain. Avoid festival weekends in Bristol and month-end Fridays when leases collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Family school calendars (especially Barrington demand) and apartment turnover fill first. Book 2–4 weeks ahead for peak weekends and waterfront access.',
      },
      {
        title: 'Festival & tourism freeflow risk',
        detail:
          'Bristol’s high-profile summer events and weekend visitors raise staging risk downtown and on waterfront approaches. Prefer flexible dates and early starts.',
      },
      {
        title: 'Summer humidity & winter ice',
        detail:
          'June–August humidity and freeze-thaw winters reshape outdoor labor on waterfront and older village stock. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'east-bay-waterfront-corridor',
      title: 'East Bay waterfront, Barrington–Warren & RI-114 logistics module',
      intro:
        'Bristol County, RI estimates fail more often on waterfront access, character-grid surveys, village stairs, and RI-114 freeflow than on packing skill alone. This is Rhode Island East Bay — not Bristol County MA.',
      bullets: [
        'State the market as Bristol County, Rhode Island / East Bay on every estimate — disambiguate from Bristol County, Massachusetts.',
        'Photo truck length, staging, and approaches for Bristol waterfront and Mt. Hope Bay edges before the survey is final.',
        'Survey driveway geometry and landscaping protection for Barrington character SFH; align with school calendars.',
        'Survey stair counts and basements for Warren village multi-unit with photos.',
        'Price portal-to-portal time for any pair that rides RI-114 or RI-136 at peak — including Providence capital reverse pairs.',
        'Clarify Bristol, Barrington, Warren, and unincorporated addresses on every estimate.',
        'For in-state jobs verify RI DPUC Motor Carriers household goods certificate status; verify FMCSA for any out-of-state leg (including Massachusetts East Bay pairs).',
      ],
    },
    {
      id: 'not-bristol-ma-not-providence-east',
      title: 'Not Bristol County MA · not Providence east-only module',
      intro:
        'A single “Bristol County rate” collapses when Rhode Island East Bay product is confused with Massachusetts Bristol County metro scale or Providence capital triple-decker defaults alone.',
      bullets: [
        'Do not price Barrington colonials or Bristol harbor walk-ups like Fall River / New Bedford industrial multi-unit or like Downtown Providence towers as interchangeable defaults.',
        'State Bristol County, RI / East Bay explicitly — never imply Massachusetts Bristol County jurisdiction or MA public-mover credential scripts.',
        'Keep Rhode Island vs Massachusetts addresses clear when East Bay border pairs appear — interstate authority applies when any leg leaves Rhode Island.',
        'Match Barrington school-calendar peaks separately from Bristol festival windows and Warren multi-unit jobs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Bristol County, RI?',
    intro:
      'Use this as a practical fit checklist for Rhode Island East Bay — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit. This is not Bristol County, Massachusetts.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Bristol County, RI spans Bristol, Barrington, and Warren systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus. Barrington’s school reputation is a major relocation driver and should be verified on official district sources.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and Barrington demand belts can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Rhode Island Department of Education data, and campus visits beat ranking screenshots alone. Roger Williams University (Bristol) shapes local rental and calendar demand beyond K–12 rankings.',
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
              'East Bay households typically use regional access into Providence systems (Rhode Island Hospital, Miriam, and partners) plus local and near-county urgent and specialty options. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred Providence and regional campuses — RI-114 freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect Bristol waterfront and historic multi-unit; Barrington character SFH and school-driven demand product; Warren village walk-ups; East Bay multi-unit pockets; edge rural-residential; Mt. Hope Bay waterfront edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by Barrington vs Warren vs Bristol waterfront product. Budget for older-building repair risk, waterfront insurance diligence, and competitive school-year housing seasons.',
          },
          {
            title: 'Building and multi-unit governance',
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
            title: 'Bristol waterfront lifestyle',
            detail:
              'Suits people prioritizing harbor amenities and historic village feel — with tight access and festival freeflow tradeoffs on move day.',
          },
          {
            title: 'Barrington character / school-driven living',
            detail:
              'Often appeals for schools and tree-lined grids — with driveway geometry, long carries, and competitive housing demand.',
          },
          {
            title: 'Warren village living',
            detail:
              'Fits households seeking relative value and East Bay access — with older multi-unit logistics and stair surveys.',
          },
          {
            title: 'Bay-edge / quieter edge living',
            detail:
              'Attracts buyers chasing water views or relative quiet — with approach limits and longer empty miles to commercial cores.',
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
              'Roger Williams University, local professional services, tourism and hospitality edges, marine trades, healthcare access into Providence, and reverse-commute pairs into the capital region concentrate demand across Bristol County RI.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak RI-114 and RI-136 freeflow is real — including Providence reverse pairs and Massachusetts East Bay options. Test peak routes before choosing solely on rent or purchase price.',
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
              'Bristol County, RI is tiny East Bay product — Bristol waterfront, Barrington schools and character grids, Warren village density — not Bristol County MA industrial metro and not a Providence east-side rename alone.',
          },
          {
            title: 'Climate',
            detail:
              'Coastal New England climate with humid summers, festival freeflow peaks, nor’easter risk, and freeze-thaw winters. Plan outdoor staging, ice, and humidity contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak festival/school-calendar and off-peak times when deciding — summer events, school seasons, and winter storms reshape daily rhythm across the East Bay.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Bristol County, RI (East Bay) resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify RI DPUC household goods certificate status for in-state moves and FMCSA for interstate legs before deposits. This hub covers Bristol County, Rhode Island only — not Bristol County, Massachusetts.',
    items: [
      {
        label: 'Town of Bristol',
        href: 'https://www.bristolri.gov/',
        external: true,
        note: 'East Bay waterfront municipality context',
      },
      {
        label: 'Town of Barrington',
        href: 'https://www.barrington.ri.gov/',
        external: true,
        note: 'Character-grid / school-driven municipality context',
      },
      {
        label: 'Town of Warren',
        href: 'https://www.townofwarren-ri.gov/',
        external: true,
        note: 'Village multi-unit municipality context',
      },
      {
        label: 'Roger Williams University',
        href: 'https://www.rwu.edu/',
        external: true,
        note: 'Bristol campus calendar & local demand context',
      },
      {
        label: 'Rhode Island 511 — traveler information',
        href: 'https://www.ri511.com/',
        external: true,
        note: 'RI-114 / RI-136 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with waterfront and tight-street fluency for Bristol harbor product; Barrington character-grid driveway and landscaping fluency; Warren village stair experience; honest RI-114 · RI-136 timing for East Bay and Providence pairs. Verify RI DPUC Motor Carriers household goods certificate for intrastate moves and FMCSA for interstate legs before deposits. This is Bristol County, Rhode Island (East Bay) — not Bristol County, Massachusetts.',
  lastReviewed: '2026-07-24',
});
