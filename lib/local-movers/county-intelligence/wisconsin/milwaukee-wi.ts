import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWiPack,
  WI_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/wisconsin/wi-shared';

/**
 * Milwaukee County, WI — city neighborhoods, East Side / Bay View, industrial corridors, elevators (not Waukesha west suburbs, not Racine, not Kenosha IL collar).
 */
export const milwaukeeCountyWiIntelligence: CountyIntelligencePack = finalizeWiPack({
  countySlug: 'milwaukee',
  hubTitle: 'Milwaukee County Moving Intelligence Hub',
  eyebrow: 'Milwaukee · East Side density, Bay View stock & I-94 / I-43 logistics',
  h1: 'Moving in Milwaukee County: City Neighborhoods, Elevator Towers & Lake Michigan Corridors',
  heroOpener:
    'Milwaukee County is not a Brookfield HOA template and not a Kenosha Chicago-collar clone — it is city neighborhood micro-markets with East Side and Bay View walk-ups, downtown elevator towers with building COIs and dock slots, industrial south-side corridors, and I-94 / I-43 / I-894 freeflow that rewrites “local” estimates. A Third Ward loft freight elevator, a Riverwest duplex stair stack, a Wauwatosa multi-unit, and a South Side bungalow do not share truck access or crew skill. Winter lake-effect staging and month-end lease waves are real inputs. This hub is for people moving in Milwaukee County — not a renamed Waukesha page or generic southeast Wisconsin script.',
  heroCredibility:
    'Wisconsin in-state written estimate & insurance diligence · FMCSA for interstate · Milwaukee neighborhood & elevator logistics awareness · Curated listings',
  majorCorridors: 'I-94 · I-43 · I-894 · US-41/45 · local arterial grid',
  whatMakesDifferent: {
    title: 'What makes moving in Milwaukee County different',
    intro:
      'These are Milwaukee city and inner-ring realities — elevator/COI stacks, neighborhood stairs, industrial corridors, and I-94 / I-43 freeflow — not Waukesha west-metro HOAs, Racine mid-size lake stock, or Kenosha Illinois-border patterns.',
    bullets: [
      {
        title: 'Elevators, docks, and building COIs dominate downtown and Third Ward product',
        detail:
          'Downtown towers, Third Ward lofts, and newer multi-unit require elevator reservations, certificate-of-insurance naming, and timed dock slots. A Bay View duplex does not share that logistics stack.',
      },
      {
        title: 'Neighborhood micro-markets rewrite labor a few miles apart',
        detail:
          'East Side, Bay View, Riverwest, Walker’s Point, and the South Side stack different curb widths, stair counts, and winter driveway grades. Flat-rate optimism from suburban driveways underprices urban carries.',
      },
      {
        title: 'I-94, I-43, I-894, and US-41/45 turn short map miles into billable hours',
        detail:
          'Downtown ↔ Wauwatosa, Bay View ↔ West Allis, or East Side ↔ airport-corridor pairs look local and still burn 25–60+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter lake-effect snow and ice reshape outdoor carries',
        detail:
          'December–March adds parking bans, icy stoops, and weather cancellations. Prefer flexible dates, early starts, and contingency for melt and tarps on older stock.',
      },
      {
        title: 'University and young-professional lease waves spike East Side volume',
        detail:
          'Campus-adjacent and dense multi-unit belts compress demand into late summer and month-end windows. Elevators and street staging fill early.',
      },
      {
        title: 'Multi-county southeast Wisconsin pairs are routine',
        detail:
          'Households regularly move Milwaukee ↔ Waukesha, Racine, Ozaukee, or Washington County, WI. Clarify city and county addresses so Wisconsin consumer controls vs FMCSA interstate assumptions stay accurate when any leg leaves Wisconsin.',
      },
      WI_REG_BULLET,
    ],
  },
  zonesHeading: 'Milwaukee County access zones',
  zonesIntro:
    'Plan by downtown and Third Ward vertical product, East Side multi-unit, Bay View–south neighborhood stock, west inner-ring (Wauwatosa / West Allis), and southern industrial–residential belts — access rules cluster by product more than ZIP alone.',
  zones: [
    {
      id: 'downtown-third-ward',
      name: 'Downtown, Third Ward & riverfront towers',
      shortName: 'Downtown / Third Ward',
      neighborhoods: [
        'Downtown Milwaukee',
        'Third Ward',
        'Historic Third Ward',
        'Juneau Town edges',
        'Kilbourn Town edges',
        'Menomonee Valley edges',
      ],
      housingTypes: 'High-rise condo, loft conversions, mid-rise multifamily',
      challenges: [
        'Elevator reservations, dock slots, and building COIs',
        'Limited legal curb and event-day freeflow',
        'I-794 / I-43 approach congestion',
      ],
      moverTips:
        'Book elevators and COIs in writing before the crew day. Prefer mid-week early freight windows. Photo dock or curb staging options.',
      cityKeywords: [
        'milwaukee',
        'downtown milwaukee',
        'third ward',
      ],
    },
    {
      id: 'east-side',
      name: 'East Side, Brady Street & university-adjacent multi-unit',
      shortName: 'East Side',
      neighborhoods: [
        'East Side',
        'Brady Street corridors',
        'Lower East Side',
        'Cambridge Woods edges',
        'North Point edges',
        'UWM edges',
      ],
      housingTypes: 'Walk-up multifamily, older duplexes, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce truck length',
        'Student lease-end volume spikes',
        'Winter curb shrinkage',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week starts near campus peaks. Inventory basements carefully.',
      cityKeywords: [
        'east side milwaukee',
        'milwaukee',
        'shorewood edges',
      ],
    },
    {
      id: 'bay-view-south',
      name: 'Bay View, Walker’s Point & near-south neighborhood stock',
      shortName: 'Bay View / south',
      neighborhoods: [
        'Bay View',
        'Walker’s Point',
        'Harbor View edges',
        'Tippecanoe edges',
        'Fernwood edges',
        'Town of Lake edges',
      ],
      housingTypes: 'Duplexes, bungalows, walk-up multifamily, limited multi-unit elevators',
      challenges: [
        'Tight residential curb',
        'Stairs and long carries',
        'I-94 / KK freeflow at peak',
      ],
      moverTips:
        'Confirm smaller-truck needs on tight blocks. Photo curb options. Price I-94 honestly for cross-zone pairs.',
      cityKeywords: [
        'bay view',
        'walkers point',
        'milwaukee',
      ],
    },
    {
      id: 'west-inner-ring',
      name: 'Wauwatosa, West Allis & west inner-ring multi-unit',
      shortName: 'West inner-ring',
      neighborhoods: [
        'Wauwatosa',
        'West Allis',
        'Washington Heights edges',
        'Story Hill edges',
        'Honey Creek edges',
        'Root River Parkway edges',
      ],
      housingTypes: 'Multi-family, townhomes, older SFH, some elevators',
      challenges: [
        'I-94 / US-45 freeflow',
        'HOA and multi-unit mix',
        'Longer empty miles vs East Side',
      ],
      moverTips:
        'Collect building rules early. Clarify Wauwatosa vs Milwaukee city addresses. Price US-45 / I-94 honestly.',
      cityKeywords: [
        'wauwatosa',
        'west allis',
        'milwaukee',
      ],
    },
    {
      id: 'north-shore-edges',
      name: 'Shorewood, Whitefish Bay & north lakeshore edges',
      shortName: 'North shore edges',
      neighborhoods: [
        'Shorewood',
        'Whitefish Bay',
        'Fox Point edges',
        'Glendale edges',
        'River Hills edges',
        'Bayside edges',
      ],
      housingTypes: 'Older SFH, multi-unit, lakeshore stock',
      challenges: [
        'Lakeshore staging and tight streets',
        'Winter ice on approaches',
        'I-43 freeflow',
      ],
      moverTips:
        'Prefer mid-week starts. Photo driveway pitch and stair entries. Plan winter ice contingency.',
      cityKeywords: [
        'shorewood',
        'whitefish bay',
        'glendale',
        'fox point',
        'bayside',
      ],
    },
    {
      id: 'south-industrial-residential',
      name: 'South Side, airport corridor & industrial-residential belts',
      shortName: 'South / airport',
      neighborhoods: [
        'South Side',
        'Airport corridor',
        'Cudahy edges',
        'St. Francis edges',
        'South Milwaukee edges',
        'Greendale edges',
      ],
      housingTypes: 'Bungalows, multi-unit, some newer multi-family',
      challenges: [
        'I-94 / airport freeflow',
        'Mixed older stock',
        'Industrial corridor traffic spikes',
      ],
      moverTips:
        'Avoid peak airport windows when flexible. Survey older stock carefully. Clarify city boundaries on estimates.',
      cityKeywords: [
        'cudahy',
        'st francis',
        'south milwaukee',
        'greendale',
        'milwaukee',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Milwaukee County moving costs',
    intro:
      'Access product, elevator/COI admin, winter staging, and I-94 / I-43 freeflow move the number more than packing skill alone.',
    drivers: [
      {
        title: 'Elevator reservations, docks & building COIs',
        detail:
          'Downtown and Third Ward vertical product add labor and schedule risk before packing skill matters.',
      },
      {
        title: 'Walk-up stairs, duplexes & tight curb',
        detail:
          'East Side, Bay View, and South Side stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'I-94 · I-43 · I-894 congestion',
        detail:
          'Cross-city and city–suburb pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Winter lake-effect ice & snow bans',
        detail:
          'December–March adds parking bans, icy carries, and cancellation risk that flexible dates reduce.',
      },
      {
        title: 'Multi-county southeast empty miles',
        detail:
          'Waukesha, Racine, and Ozaukee destinations raise staging distance and authority complexity when leaving Wisconsin.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with elevators, walk-ups, or peak I-94 pairs',
      },
      {
        label: '2–3BR condo or duplex',
        value: '$1,500–$4,500+',
        note: 'Stairs, COI, and dock soft costs trend up',
      },
      {
        label: '3–4+ BR / high-rise / cross-zone',
        value: '$3,000–$9,500+',
        note: 'Tower moves and long I-43 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$210+/hr',
        note: 'Portal-to-portal; packing, COI admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Milwaukee County move',
    intro:
      'Lease cycles, campus calendars, winter lake-effect friction, and elevator windows reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease downtown freight windows, and reduce I-94 / I-43 pain. Avoid month-end Fridays when leases and elevators collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and campus waves fill first. Book 2–4 weeks ahead for peak weekends and elevator slots.',
      },
      {
        title: 'Winter: lake-effect snow, ice, and curb shrinkage',
        detail:
          'December–March adds parking bans, icy stoops, and weather cancellations. Prefer flexible dates and early starts.',
      },
      {
        title: 'Corporate and mid-month employer spikes',
        detail:
          'Downtown professional relocations often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates early.',
      },
    ],
  },
  specialized: [
    {
      id: 'milwaukee-elevator-neighborhood',
      title: 'Milwaukee elevator, neighborhood & lake-effect logistics module',
      intro:
        'Milwaukee estimates fail more often on stair surveys, elevator packets, winter curb, and I-94 freeflow than on packing skill alone.',
      bullets: [
        'Collect building COI, elevator reservations, and dock rules before the survey is final.',
        'Photo stair counts, curb options, and truck length for East Side, Bay View, and duplex stock.',
        'Price portal-to-portal time for any pair that rides I-94, I-43, I-894, or US-41/45 at peak.',
        'Plan winter lake-effect ice contingency and snow-emergency parking rules into outdoor carries.',
        'Clarify Milwaukee city vs Wauwatosa / West Allis / Shorewood addresses on every estimate.',
        'For in-state jobs insist on written estimates and insurance; verify FMCSA for any out-of-state leg.',
      ],
    },
    {
      id: 'not-waukesha-west-clone',
      title: 'City product vs west-metro micro-market module',
      intro:
        'A single “metro rate” collapses when Milwaukee city product and Waukesha west-metro HOA product diverge.',
      bullets: [
        'Do not price Third Ward lofts like Brookfield townhomes — access products differ.',
        'Ask which approach corridors the crew will actually use at load and unload.',
        'Match campus and young-professional calendars separately from west-metro school-calendar peaks.',
        'Keep Milwaukee vs Waukesha county lines clear on every multi-address estimate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Milwaukee County?',
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
              'Milwaukee Public Schools covers most City of Milwaukee addresses; suburban cities such as Wauwatosa, West Allis, Shorewood, and Whitefish Bay operate separate systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Wisconsin DPI data, and campus visits beat ranking screenshots alone.',
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
              'Froedtert & Medical College of Wisconsin, Ascension, Advocate Aurora, Children’s Wisconsin, and other campuses anchor care across Milwaukee County. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — freeway freeflow changes “nearby” on paper. Transfer records early.',
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
              'Expect high-rise downtown and Third Ward product; walk-up multifamily on the East Side and Bay View; bungalows and duplexes on the South Side; multi-family and SFH in west inner-ring cities.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by city and product. Budget for condo/HOA dues, older-building repair risk, and parking where relevant.',
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
            title: 'Downtown / Third Ward urban lifestyle',
            detail:
              'Suits people prioritizing walkability and amenities — with elevator, parking, and event-day tradeoffs on move day.',
          },
          {
            title: 'East Side and Bay View character living',
            detail:
              'Often appeals for neighborhood feel and lake proximity — with stairs, curb limits, and winter staging constraints.',
          },
          {
            title: 'West inner-ring cities',
            detail:
              'Attracts households seeking schools and relative space — with multi-unit logistics and I-94 freeflow.',
          },
          {
            title: 'North shore and south residential belts',
            detail:
              'Fits buyers chasing lakeshore character or relative value — with approach freeflow and older stock norms.',
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
              'Downtown professional services, manufacturing and industrial corridors, healthcare systems, education, and financial services concentrate demand. Many households reverse-commute to Waukesha west-metro campuses.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak freeway freeflow is real. Test peak routes before choosing solely on rent or purchase price.',
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
              'Milwaukee County stacks tower living, neighborhood walk-ups, and inner-ring cities — different from Waukesha west-metro HOA growth, Racine mid-size lake patterns, or Kenosha Illinois-border logistics.',
          },
          {
            title: 'Climate',
            detail:
              'Continental four-season climate with cold winters, lake-effect snow near Lake Michigan, and rapid weather swings. Plan outdoor staging and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — school calendars, winter weather, and local events reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Milwaukee County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. For in-state Wisconsin moves insist on written estimates and insurance proof; verify FMCSA for any interstate leg before deposits.',
    items: [
      {
        label: 'City of Milwaukee — official site',
        href: 'https://city.milwaukee.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Milwaukee Public Schools',
        href: 'https://mps.milwaukee.k12.wi.us/',
        external: true,
        note: 'Boundaries & calendars (Milwaukee city addresses)',
      },
      {
        label: '511wi — traffic conditions',
        href: 'https://511wi.gov/',
        external: true,
        note: 'I-94 / I-43 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with elevator/COI experience for downtown and Third Ward product; duplex and walk-up stair fluency for East Side and Bay View stock; honest I-94 · I-43 · I-894 · US-41/45 timing for cross-zone pairs. For in-state jobs insist on written estimates and insurance; verify FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
