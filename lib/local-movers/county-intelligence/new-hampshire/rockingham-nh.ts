import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNhPack,
  NH_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-hampshire/nh-shared';

/**
 * Rockingham County, NH — Portsmouth seacoast / Exeter / Hampton.
 * NOT Manchester–Nashua density clone; coastal tourism & MA-border west belts.
 */
export const rockinghamCountyNhIntelligence: CountyIntelligencePack = finalizeNhPack({
  countySlug: 'rockingham',
  hubTitle: 'Rockingham County Moving Intelligence Hub',
  eyebrow:
    'Rockingham County, NH · Portsmouth seacoast / Exeter–Hampton & I-95 logistics',
  h1: 'Moving in Rockingham County: Portsmouth Seacoast Access, Hampton Tourism Cycles & I-95 Logistics',
  heroOpener:
    'Rockingham County is New Hampshire’s seacoast and Massachusetts-border west belt — Portsmouth downtown and harbor multi-unit, Hampton Beach seasonal and year-round stock, Exeter–Newmarket village grids, Derry–Londonderry growth and MA-border short hops, Seabrook–Hampton Falls coastal edges, and Salem NH / Windham suburban freeflow. I-95, NH-101, NH-16, and US-1 rewrite “local” estimates when tourism peaks, coastal curb limits, and winter ice stack on older village and multi-unit product. A Portsmouth walk-up, a Hampton seasonal rental turnover, an Exeter character home, and a Londonderry HOA cul-de-sac do not share truck access or crew skill. This hub is for people moving in Rockingham County — not a Manchester–Nashua rename and not a Dover–Rochester inland clone.',
  heroCredibility:
    'NH DOS / Bureau Household Goods Carrier authority (RSA 359-T) for intrastate · FMCSA for interstate · Portsmouth seacoast & I-95 logistics awareness · Curated listings',
  majorCorridors: 'I-95 · NH-101 · NH-16 · US-1 · local seacoast grid',
  whatMakesDifferent: {
    title: 'What makes moving in Rockingham County different',
    intro:
      'These are Rockingham / Portsmouth–Hampton–Exeter realities — coastal tourism calendars, seacoast multi-unit curb, MA-border west freeflow, and NH winter ice — not Manchester mill density alone and not Strafford inland Spaulding defaults.',
    bullets: [
      {
        title: 'This is Rockingham seacoast & MA-border west — not Manchester density',
        detail:
          'Ignore Manchester mill-only templates and Concord capital-only scripts. Rockingham mixes Portsmouth harbor product, Hampton tourism cycles, Exeter village character, and Derry–Londonderry / Salem NH growth. Match estimates to seacoast and west-belt addresses — not a generic “southern NH” rate.',
      },
      {
        title: 'Portsmouth downtown and seacoast multi-unit underprice curb optimism',
        detail:
          'Tight historic blocks, limited truck length, scarce staging, and winter ice rewrite labor before packing skill matters. Elevator buildings still need reservations and COIs that suburban ranches never see.',
      },
      {
        title: 'Hampton Beach and coastal tourism peaks rewrite calendars',
        detail:
          'Seasonal rental turnovers, summer weekend curb conflicts, and tourism freeflow on US-1 and beach approaches fill crews and block staging. Mid-week early windows matter more here than inland suburbs.',
      },
      {
        title: 'Derry–Londonderry and Salem NH / MA-border short hops need FMCSA',
        detail:
          'West-belt pairs into Massachusetts look local on a map and still require active FMCSA USDOT (and usually MC) when any leg leaves New Hampshire. New Hampshire household goods authority alone does not authorize interstate delivery.',
      },
      {
        title: 'I-95, NH-101, NH-16, and US-1 burn portal-to-portal hours',
        detail:
          'Portsmouth ↔ Hampton, Exeter ↔ Derry, or Salem NH ↔ seacoast pairs look short and still burn 25–55+ minutes at peak — longer in summer tourism and winter weather. Price portal-to-portal honestly.',
      },
      {
        title: 'Winter ice and coastal wind are operational constraints',
        detail:
          'December–March ice on village stairs, coastal wind exposure for outdoor staging, and I-95 corridor delays reshape access. Prefer early starts, flexible dates, and weather contingency on older coastal stock.',
      },
      NH_REG_BULLET,
    ],
  },
  zonesHeading: 'Rockingham County access zones',
  zonesIntro:
    'Plan by Portsmouth / downtown seacoast multi-unit, Hampton Beach / coastal tourism stock, Exeter–Newmarket village grids, Derry–Londonderry MA-border west, Seabrook–Hampton Falls edges, and Salem NH / Windham suburban belts — access rules cluster by coastal vs inland product more than ZIP alone.',
  zones: [
    {
      id: 'portsmouth-seacoast',
      name: 'Portsmouth downtown, harbor multi-unit & seacoast freeflow',
      shortName: 'Portsmouth / seacoast',
      neighborhoods: [
        'Downtown Portsmouth',
        'Harbor and waterfront edges',
        'Islington Street corridors',
        'South End character blocks',
        'Pease-adjacent belts',
        'Seacoast multi-unit pockets',
      ],
      housingTypes: 'Walk-up multifamily, limited elevators, historic SFH, mixed condo',
      challenges: [
        'Tight historic curb, truck-length limits, and scarce staging',
        'Elevator reservations and building COIs where present',
        'I-95 / US-1 freeflow into load windows',
      ],
      moverTips:
        'Photo curb staging options early. Book elevators and COIs in writing when required. Prefer mid-week early freight windows away from tourism peaks.',
      cityKeywords: [
        'portsmouth',
        'portsmouth nh',
      ],
    },
    {
      id: 'hampton-beach-coastal',
      name: 'Hampton Beach, Hampton & coastal tourism stock',
      shortName: 'Hampton / beach',
      neighborhoods: [
        'Hampton Beach',
        'Hampton village edges',
        'Ocean Boulevard corridors',
        'North Beach pockets',
        'Seasonal rental belts',
        'Coastal multi-unit edges',
      ],
      housingTypes: 'Seasonal and year-round multi-unit, cottages, mixed SFH',
      challenges: [
        'Summer tourism curb conflicts and weekend freeflow',
        'Seasonal turnover peaks and short load windows',
        'Coastal wind, sand, and winter ice on exterior access',
      ],
      moverTips:
        'Avoid peak summer weekend beach approaches when possible. Confirm seasonal vs year-round access rules. Stage trucks off primary tourist curb early.',
      cityKeywords: [
        'hampton',
        'hampton beach',
      ],
    },
    {
      id: 'exeter-newmarket',
      name: 'Exeter, Newmarket, Stratham & inland seacoast villages',
      shortName: 'Exeter / Newmarket',
      neighborhoods: [
        'Exeter',
        'Newmarket',
        'Stratham edges',
        'Newfields edges',
        'Village multi-unit pockets',
        'NH-101 / NH-108 corridors',
      ],
      housingTypes: 'Character SFH, village multi-unit limited, mixed townhomes',
      challenges: [
        'Village curb limits and older stair product',
        'NH-101 freeflow to I-95 or west belts',
        'School and campus-adjacent calendar peaks',
      ],
      moverTips:
        'Survey stair counts and driveway geometry with photos. Price NH-101 empty miles. Protect older interiors and long carries.',
      cityKeywords: [
        'exeter',
        'newmarket',
        'stratham',
      ],
    },
    {
      id: 'derry-londonderry-west',
      name: 'Derry, Londonderry & MA-border west growth belts',
      shortName: 'Derry / Londonderry',
      neighborhoods: [
        'Derry',
        'Londonderry',
        'I-93 / NH-102 corridors',
        'Suburban HOA cul-de-sacs',
        'West multi-unit pockets',
        'Massachusetts-adjacent pairs',
      ],
      housingTypes: 'HOA SFH, townhomes, newer multi-family, ranch and two-story stock',
      challenges: [
        'HOA gate lists, truck-length limits, and timed windows',
        'I-93 approach freeflow and MA-border timing',
        'Interstate authority when any leg enters Massachusetts',
      ],
      moverTips:
        'Collect HOA packets early. Clarify NH-only vs MA-crossing estimates. Price I-93 / NH-102 freeflow honestly.',
      cityKeywords: [
        'derry',
        'londonderry',
      ],
    },
    {
      id: 'seabrook-hampton-falls',
      name: 'Seabrook, Hampton Falls & southern coastal edges',
      shortName: 'Seabrook / Hampton Falls',
      neighborhoods: [
        'Seabrook',
        'Hampton Falls',
        'US-1 southern corridors',
        'Coastal residential edges',
        'MA-border coastal pairs',
        'Rural-coastal pockets',
      ],
      housingTypes: 'SFH, multi-unit limited, coastal cottages, mixed stock',
      challenges: [
        'US-1 tourism freeflow and longer empty miles to Portsmouth core',
        'Mixed driveway and coastal weather product',
        'MA-border short hops needing FMCSA',
      ],
      moverTips:
        'Price empty miles and US-1 delays honestly. Survey coastal driveway and staging. Verify FMCSA on any Massachusetts leg.',
      cityKeywords: [
        'seabrook',
        'hampton falls',
      ],
    },
    {
      id: 'salem-windham-edges',
      name: 'Salem NH, Windham, Atkinson & southwestern edges',
      shortName: 'Salem / Windham',
      neighborhoods: [
        'Salem NH',
        'Windham',
        'Atkinson edges',
        'Hampstead edges',
        'I-93 / MA-border corridors',
        'Southwestern suburban belts',
      ],
      housingTypes: 'HOA SFH, multi-unit limited, ranch and two-story stock',
      challenges: [
        'I-93 freeflow and MA-border interstate complexity',
        'HOA packets and mixed municipal rules',
        'Longer empty miles to Portsmouth seacoast cores',
      ],
      moverTips:
        'Clarify Salem NH vs Massachusetts Salem. Collect HOA rules early. Price I-93 portal time and FMCSA when crossing the state line.',
      cityKeywords: [
        'salem',
        'salem nh',
        'windham',
        'atkinson',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Rockingham County moving costs',
    intro:
      'Coastal curb limits, tourism peaks, village stairs, HOA admin, and I-95 / US-1 freeflow move the number more than packing skill alone — this is Portsmouth seacoast logistics, not Manchester mill defaults.',
    drivers: [
      {
        title: 'Seacoast curb limits, historic blocks & truck length',
        detail:
          'Portsmouth and dense coastal product add staging risk that flat-rate optimism underprices.',
      },
      {
        title: 'Tourism peaks & seasonal turnover calendars',
        detail:
          'Hampton Beach and coastal summer windows fill crews and compress load slots before packing skill matters.',
      },
      {
        title: 'HOA gates, multi-unit elevators & timed windows',
        detail:
          'Derry–Londonderry and west growth packets rewrite jobs that look simple on a map.',
      },
      {
        title: 'I-95 · NH-101 · NH-16 · US-1 congestion',
        detail:
          'Cross-county pairs burn portal-to-portal hours even when map miles look short — worse in summer tourism and winter storms.',
      },
      {
        title: 'MA-border & interstate empty miles',
        detail:
          'Massachusetts destinations and long west-to-seacoast pairs raise staging distance and FMCSA authority complexity when leaving New Hampshire.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with seacoast curb limits, elevators, or peak I-95 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,500–$4,500+',
        note: 'Stairs, tourism timing, HOA, and multi-unit soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / cross-zone',
        value: '$3,000–$9,500+',
        note: 'Coastal peaks and long I-95 / MA-border pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$205+/hr',
        note: 'Portal-to-portal; packing, HOA admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Rockingham County move',
    intro:
      'Tourism peaks, school calendars, apartment turnover, coastal summer congestion, and long New Hampshire winters reshape access and crew availability across the seacoast and west belts.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear seacoast curb, ease multi-unit freight windows, and reduce I-95 / US-1 pain. Avoid month-end Fridays and peak summer beach weekends when possible.',
      },
      {
        title: 'Peak season: late May–mid-September (tourism amplified)',
        detail:
          'Family school calendars, apartment turnover, and Hampton-area tourism fill first. Book 2–4 weeks ahead for peak weekends and elevator or HOA slots — longer near the beach in July–August.',
      },
      {
        title: 'Winter ice, snow & coastal wind',
        detail:
          'December–March ice on village stairs, coastal wind exposure, and I-95 weather slowdowns raise cancellation and labor risk. Prefer flexible dates, early starts, and covered staging when forecasts allow.',
      },
      {
        title: 'Shoulder seasons & off-peak coastal value',
        detail:
          'October–April (outside holiday weeks and storm windows) often improves curb access and crew availability if winter logistics are planned honestly.',
      },
    ],
  },
  specialized: [
    {
      id: 'seacoast-tourism-corridor',
      title: 'Portsmouth seacoast, tourism & I-95 logistics module',
      intro:
        'Rockingham estimates fail more often on coastal curb surveys, tourism calendars, multi-unit COIs, HOA packets, and I-95 / US-1 freeflow than on packing skill alone.',
      bullets: [
        'Photo curb staging, truck-length options, and winter exterior access for Portsmouth and dense seacoast product.',
        'Plan around Hampton Beach tourism peaks — mid-week early windows beat summer weekend beach approaches.',
        'Book elevators and building COIs for multi-unit before the survey is final.',
        'Collect HOA packets, gate codes, and truck-length rules for Derry, Londonderry, Windham, and Salem NH growth early.',
        'Price portal-to-portal time for any pair that rides I-95, NH-101, NH-16, or US-1 at peak — longer in tourism and winter.',
        'For in-state jobs verify New Hampshire household goods carrier authority under RSA 359-T frameworks; verify FMCSA for any out-of-state leg (especially Massachusetts border pairs).',
      ],
    },
    {
      id: 'not-manchester-not-strafford',
      title: 'Not Manchester density · not Strafford inland-only module',
      intro:
        'A single “southern NH rate” collapses when Portsmouth seacoast product is confused with Manchester mill logistics or Dover–Rochester inland Spaulding defaults alone.',
      bullets: [
        'Do not price Portsmouth harbor walk-ups like Manchester mill conversions or like Dover multi-unit as interchangeable defaults.',
        'State the market as Rockingham County / Portsmouth seacoast on every estimate — disambiguate from Hillsborough density and Strafford inland belts.',
        'Keep New Hampshire vs Massachusetts addresses clear when west-belt or coastal border pairs appear — interstate authority applies when any leg leaves New Hampshire.',
        'Match tourism peaks separately from school-calendar and lease mid-month windows.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Rockingham County?',
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
              'Rockingham spans Portsmouth, Exeter, Hampton, Derry, Londonderry, Salem, Windham, and other SAU systems. Assignment is address-based — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive, especially in high-demand suburban and seacoast SAUs. Confirm enrollment windows early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, New Hampshire Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Portsmouth Regional Hospital, Exeter Hospital, and regional specialty campuses anchor care across the seacoast and inland west. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-95, NH-101, and US-1 freeflow change “nearby” on paper, especially in summer tourism. Transfer records early.',
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
              'Expect Portsmouth historic multi-unit and SFH; Hampton Beach seasonal and year-round coastal stock; Exeter–Newmarket village character; Derry–Londonderry HOA growth; Seabrook coastal edges; Salem NH / Windham suburban belts.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by seacoast vs inland product. Budget for HOA dues, coastal insurance and repair risk, and competitive rental seasons near tourism and employment corridors.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, elevators, and deposits. Seasonal rental rules can further compress load windows on the coast.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Portsmouth / downtown seacoast lifestyle',
            detail:
              'Suits people prioritizing walkable amenities and harbor access — with curb, truck-length, and winter-access tradeoffs on move day.',
          },
          {
            title: 'Hampton / coastal living',
            detail:
              'Often appeals for beach proximity — with tourism freeflow, seasonal turnover calendars, and coastal weather logistics.',
          },
          {
            title: 'Exeter–Newmarket village living',
            detail:
              'Fits households seeking character grids and inland seacoast access — with village curb and older stair surveys.',
          },
          {
            title: 'Derry–Londonderry / Salem NH west belts',
            detail:
              'Attracts buyers chasing schools, newer product, and MA-border employment — with HOA rules and interstate authority awareness on cross-border pairs.',
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
              'Healthcare, professional services, tourism and hospitality, logistics, education, retail, and Massachusetts reverse-commute patterns concentrate demand across seacoast and west belts.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-95, NH-101, NH-16, and US-1 freeflow is real — including summer tourism and MA-border reverse pairs. Test peak routes before choosing solely on rent or purchase price.',
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
              'Rockingham is New Hampshire’s seacoast and MA-border west stack — Portsmouth harbor density, Hampton tourism cycles, Exeter village character, and inland growth — not Manchester mill-only density and not Dover–Rochester inland defaults.',
          },
          {
            title: 'Climate',
            detail:
              'Humid continental / coastal-influenced climate with warm summers, tourism congestion, long freeze-thaw winters, ice, snow, and coastal wind. Plan outdoor staging and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — tourism weekends, school calendars, and winter storms reshape daily rhythm across the seacoast grid.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Rockingham County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify New Hampshire household goods carrier authority for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Rockingham County, New Hampshire',
        href: 'https://www.rockinghamcountynh.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Portsmouth',
        href: 'https://www.cityofportsmouth.com/',
        external: true,
        note: 'Seacoast municipality context',
      },
      {
        label: 'Town of Exeter',
        href: 'https://www.exeternh.gov/',
        external: true,
        note: 'Inland seacoast municipality context',
      },
      {
        label: 'Town of Hampton',
        href: 'https://www.hamptonnh.gov/',
        external: true,
        note: 'Coastal tourism municipality context',
      },
      {
        label: '511 NH — traveler information',
        href: 'https://www.511nh.com/',
        external: true,
        note: 'I-95 / NH-101 / NH-16 / US-1 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with seacoast curb and historic-block fluency for Portsmouth; tourism-calendar awareness for Hampton Beach; village stair skill for Exeter–Newmarket; HOA and I-93 approach fluency for Derry–Londonderry–Salem NH product; honest I-95 · NH-101 · NH-16 · US-1 timing for cross-zone pairs. Verify New Hampshire household goods carrier authority under RSA 359-T frameworks for intrastate moves and FMCSA for interstate legs (including Massachusetts border pairs) before deposits. This is Rockingham County / Portsmouth seacoast — not Manchester density and not Strafford inland defaults.',
  lastReviewed: '2026-07-24',
});
