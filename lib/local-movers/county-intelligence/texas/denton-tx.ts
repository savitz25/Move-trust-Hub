import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Denton County — Texas Tier 2 (DFW northwest collar).
 * Parent: Dallas County (Tarrant contrast ok). Denton / Lewisville / Flower Mound —
 * NOT a renamed Dallas or Collin pack.
 */
export const dentonCountyIntelligence = finalizeTxTier2Pack({
  countySlug: 'denton',
  hubTitle: 'Denton County Moving Intelligence Hub',
  eyebrow: 'Denton County · DFW NW — Denton / Lewisville / Flower Mound',
  h1: 'Moving in Denton County: DFW Northwest Collar — Denton, Lewisville & Flower Mound',
  heroOpener:
    'Denton County is DFW’s northwest collar — university-town Denton, Lewisville multi-family corridors, Flower Mound larger-lot suburbs, and Corinth/Lake Dallas edges — not Dallas County with different freeways and not a Collin Plano/McKinney script. UNT and TWU calendars pack short-notice apartments; I-35E, I-35W, US-380, Loop 288, and Sam Rayburn Tollway freeflow still bill at peak; HOA suburban growth fills Saturdays first. A near-campus walk-up, a Lewisville elevator building, a Flower Mound cul-de-sac two-story, and a Lake Dallas growth tract do not share truck access. Quote the pocket and the I-35 pair — never a recycled Dallas-core rate card.',
  heroCredibility:
    'DFW northwest collar · University & HOA suburban growth · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-35E · I-35W · US-380 · Loop 288 · Sam Rayburn Tollway',
  parentCompare: {
    parentLabel: 'Dallas County',
    parentHref: '/local-movers/texas/dallas',
    title: 'Compared with Dallas County',
    intro:
      'Denton is the northwest DFW collar above Dallas County — university-town density in Denton proper, suburban HOA growth south and east, and freer mid-day I-35 freeflow than Dallas urban core. Tarrant contrast: more university cycle and lake-edge product than Fort Worth industrial west. Use this when one address sits in Dallas County (or Tarrant) and the other in Denton.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Dallas County crews fight I-35E south, I-30, I-635, and dense urban arterials. Denton pairs ride I-35E, I-35W, US-380, Loop 288, and Sam Rayburn Tollway with freer mid-day flow — Denton ↔ Lewisville or Flower Mound ↔ Corinth still burns portal-to-portal time at peak, but it is not a downtown Dallas elevator job. Cross-county Denton ↔ Dallas (and Tarrant) pairs are long locals on the I-35 spine.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Dallas mixes vertical multi-family and inner-ring SFH. Denton’s ladder is UNT/TWU student and workforce apartments, Lewisville multi-family and suburban tracts, Flower Mound/Highland Village larger-lot HOA SFH, and Corinth/Lake Dallas growth edges — more university turnover and lake-adjacent product, less Uptown high-rise.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Denton stages more driveway, cul-de-sac, and campus-adjacent curb work than Dallas core elevators. HOAs dominate Flower Mound and many growth villages; campus multi-unit buildings add elevator/COI packets. Lake-edge and larger-lot carries replace downtown dock fights as the hard suburban cases.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Same-zone Denton jobs can look secondary-market simple until university peaks, HOA windows, and peak I-35 time hit. Cross-zone collar pairs into Dallas or Tarrant raise the bill above pure in-town Denton quotes. Do not assume Dallas-core rates transfer without naming both cities and corridors.',
      },
      {
        title: 'Role difference',
        detail:
          'Denton is DFW NW’s university-plus-suburban growth collar — Denton/Lewisville/Flower Mound identity — not a Dallas bedroom dump and not Collin’s Plano/Frisco corporate HQ belt. Match crews to campus calendars, I-35 freeflow timing, and HOA paperwork.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Denton County different',
    intro:
      'Northwest-collar realities — university cycles, I-35 freeflow, HOA suburban growth, and Texas licensing — that a renamed Dallas pack would miss.',
    bullets: [
      {
        title: 'University Denton and suburban growth are different products',
        detail:
          'A near-campus apartment, a downtown Denton bungalow, a Lewisville multi-family unit, and a Flower Mound HOA home do not share truck access. Name both cities — “Denton County local” fails across campus vs lake-edge last-mile.',
      },
      {
        title: 'UNT / TWU calendars drive student and staff turnover',
        detail:
          'August, December, and May windows pack crews with short-notice apartment moves, elevators, and high volume near campus. Start-of-term peaks need earlier lead time than pure suburban markets expect.',
      },
      {
        title: 'I-35 freeflow is not Dallas gridlock — still clock time',
        detail:
          'Many households pair addresses across Lewisville, Flower Mound, Corinth, and into Dallas or Tarrant. Peak I-35E/I-35W and 380 delays are billable. Ask how portal-to-portal time is priced.',
      },
      {
        title: 'HOAs dominate much of the suburban growth stock',
        detail:
          'Master-planned villages require COI, approved hours, gate lists, and floor protection. Treat the HOA packet as part of the survey — not an afterthought on move morning.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Denton County zones: university core, southern suburbs & lake edges',
  zonesIntro:
    'Four sharp products — Denton university core, Lewisville/Highland Village corridor, Flower Mound/Highland larger-lot belt, and Corinth/Lake Dallas edges. Not a Dallas zone dump with new labels.',
  zones: [
    {
      id: 'denton-university-core',
      name: 'Denton University Core: campus, Square & historic grid',
      shortName: 'Denton university core',
      neighborhoods: [
        'Downtown Denton / The Square',
        'UNT campus-adjacent',
        'TWU / east campus edges',
        'South Denton',
        'North Denton residential',
        'Older bungalow and multi-unit pockets',
      ],
      housingTypes:
        'Student and workforce apartments, older SFH, downtown multi-unit, some mid-rise and redevelopment product',
      challenges: [
        'Campus-calendar peaks and short-notice apartment turnover',
        'Limited curb staging near The Square and older grids',
        'Elevator/COI rules in multi-unit buildings',
        'I-35E interchange timing into and out of town',
      ],
      moverTips:
        'Book campus peaks 2–4 weeks ahead when flexible. Share building packets and truck-height limits. Prefer weekday mornings away from game days and move-in weekends. Denton ↔ Lewisville is a classic underquoted local.',
      cityKeywords: [
        'denton',
        'unt',
        'twu',
        'downtown denton',
        'the square',
        'university of north texas',
      ],
    },
    {
      id: 'lewisville-highland-village',
      name: 'Lewisville & Highland Village: southern multi-family & suburban corridor',
      shortName: 'Lewisville / Highland Village',
      neighborhoods: [
        'Lewisville',
        'Highland Village',
        'Castle Hills edge',
        'Hebron corridor',
        'Lake Lewisville approaches',
        'Carrollton (Denton County edge)',
      ],
      housingTypes:
        'Suburban SFH, townhomes, multi-family, HOA tracts, older in-town stock, lake-approach homes',
      challenges: [
        'DFW arterial congestion at peak (121 / 35E / local belts)',
        'Apartment elevator windows and COI',
        'Cross-county pairs into Dallas / Collin job corridors',
        'High end-of-month lease churn',
      ],
      moverTips:
        'Price portal-to-portal time for Lewisville ↔ Denton and Lewisville ↔ Flower Mound honestly. Collect apartment management rules early. Avoid last-Saturday-of-month when flexible.',
      cityKeywords: [
        'lewisville',
        'highland village',
        'castle hills',
        'hebron',
        'lake lewisville',
        'carrollton',
      ],
    },
    {
      id: 'flower-mound-highland',
      name: 'Flower Mound / Highland: larger-lot HOA & lake-adjacent belt',
      shortName: 'Flower Mound / Highland',
      neighborhoods: [
        'Flower Mound',
        'Double Oak edge',
        'Larger-lot west/northwest Flower Mound',
        'Lake-adjacent pockets',
        'HOA villages and cul-de-sac tracts',
      ],
      housingTypes:
        'Larger-lot SFH, HOA communities, lake-edge homes, some multi-family clusters',
      challenges: [
        'Cul-de-sac turnaround and longer driveway carries',
        'HOA COI and approved move hours',
        'Weekend recreation traffic near lake approaches',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Share driveway and turnaround photos for larger-lot homes. Collect HOA packets before locking a Saturday crew. Early summer starts beat heat on open streets.',
      cityKeywords: [
        'flower mound',
        'double oak',
        'lake grapevine edge',
        'flower mound tx',
      ],
    },
    {
      id: 'corinth-lake-dallas-edges',
      name: 'Corinth, Lake Dallas & eastern growth edges',
      shortName: 'Corinth / Lake Dallas edges',
      neighborhoods: [
        'Corinth',
        'Lake Dallas',
        'Hickory Creek edge',
        'Shady Shores edge',
        'US-380 / eastern growth villages',
        'Newer master-planned pockets',
      ],
      housingTypes:
        'Suburban SFH, HOA growth tracts, lake-edge homes, some multi-family and new construction',
      challenges: [
        'I-35E / 380 approach timing',
        'HOA rules in newer villages',
        'Longer arterials to Denton core or southern job corridors',
        'New-construction incomplete roads',
      ],
      moverTips:
        'Confirm builder/HOA access the week of the move in new sections. Price Corinth ↔ Denton or Lake Dallas ↔ Lewisville with honest arterial time. Collect HOA packets early.',
      cityKeywords: [
        'corinth',
        'lake dallas',
        'hickory creek',
        'shady shores',
        'corinth tx',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Denton County',
    intro:
      'Same square footage prices differently by university peaks, HOA soft costs, I-35 portal time, and whether the job is campus multi-unit or Flower Mound larger-lot.',
    drivers: [
      {
        title: 'Cross-zone I-35 / 380 corridor time',
        detail:
          'Denton ↔ Lewisville, Flower Mound ↔ Corinth, or any peak I-35E / 35W / 380 leg can burn far more clock than map miles suggest. Hourly billing follows the clock.',
      },
      {
        title: 'University multi-unit access',
        detail:
          'Elevators, stair carries, and short-notice campus peaks add labor hours and require building coordination suburban HOA jobs may not.',
      },
      {
        title: 'HOA soft costs (growth villages)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'Larger-lot / lake-edge access',
        detail:
          'Long driveways, cul-de-sacs, and limited turnaround on Flower Mound and lake-edge lots add carry time — access photos prevent underquotes.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,400+',
        note: 'Higher with elevators, campus peaks, or HOA windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,400–$3,800+',
        note: 'HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / larger-lot / growth edge)',
        value: '$2,200–$6,500+',
        note: 'Long locals across I-35E / 380 corridors price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, university & school-calendar intelligence',
    intro:
      'North Texas heat, DFW school calendars, and UNT/TWU terms set residential peaks. HOA villages and campus buildings compete for the same Saturday crews.',
    items: [
      {
        title: 'University move-in / move-out spikes',
        detail:
          'August, December, and May near UNT and TWU pack apartments and create short-notice demand. Flexible mid-week dates often price better than peak weekends.',
      },
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Lewisville, Flower Mound, and Corinth edges. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows and campus building rules. Avoid last Friday/Saturday of the month when leases and family moves collide.',
      },
    ],
  },
  specialized: [
    {
      id: 'unt-twu-university-cycle',
      title: 'UNT / TWU university cycle logistics',
      intro:
        'Denton County’s volume problem near the university core is apartment elevators, short calendars, and dense student turnover — not only HOA cul-de-sacs.',
      bullets: [
        'Collect building COI, elevator reservations, and loading rules before the survey is final.',
        'Expect August/December/May spikes; lock dates early or accept mid-week alternatives.',
        'Inventory for stairs, tight turns, and partial DIY loads common in student moves.',
        'Game days and special events can close staging near The Square — check calendars when flexible.',
      ],
    },
    {
      id: 'i35-freeflow',
      title: 'I-35 freeflow & DFW NW corridor timing',
      intro:
        'Denton’s defining metro relationship is the I-35E/I-35W spine plus 380 and Sam Rayburn — freer than Dallas urban core, still a line item.',
      bullets: [
        'Price Denton ↔ Lewisville/Flower Mound and collar pairs into Dallas or Tarrant as portal-to-portal jobs.',
        'Build peak I-35 and school-traffic buffer into weekday afternoons and Friday evenings.',
        'Ask whether cross-county pairs still use a pure local rate card or a long-local schedule.',
        'Loop 288 and local Denton grids still matter for Square-adjacent staging — not just freeway ETAs.',
      ],
    },
    {
      id: 'hoa-suburban-growth',
      title: 'HOA suburban growth module',
      intro:
        'Flower Mound, Highland Village edges, Corinth growth, and many planned villages need paperwork-first logistics that university apartments may not.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before booking — many villages will turn crews away without paperwork.',
        'New-construction sections may have incomplete roads or temporary parking rules — confirm access the week of the move.',
        'Prefer early starts in peak summer heat on open suburban streets.',
        'Share driveway and cul-de-sac turnaround photos for larger-lot Flower Mound product.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in. Not a full Tier 1 lifestyle essay.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Denton County spans multiple districts (e.g., Denton ISD, Lewisville ISD, Little Elm ISD, Argyle ISD, Northwest ISD edges, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and Texas Education Agency resources. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Growth vs established systems',
            detail:
              'Enrollment pressures differ between rapid-growth edges and longer-established Denton or Lewisville corridors — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Higher education presence',
            detail:
              'University of North Texas and Texas Woman’s University shape rental demand, traffic, and staff housing near campus — useful for student and university-affiliated households.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'Medical City Denton, Texas Health Presbyterian Denton, and other north-metro campuses cover much of the county; southern corridors also use Lewisville-area and broader DFW systems — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'DFW specialty spillover',
            detail:
              'Some residents use Dallas or Collin specialty systems. Confirm insurer networks and realistic appointment drive times on I-35E / 121 / 380.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Denton County resources',
    intro:
      'Local official links first. TxDMV, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'Denton County',
        href: 'https://www.dentoncounty.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Denton',
        href: 'https://www.cityofdenton.com/',
        external: true,
      },
      {
        label: 'City of Lewisville',
        href: 'https://www.cityoflewisville.com/',
        external: true,
      },
      {
        label: 'Town of Flower Mound',
        href: 'https://www.flower-mound.com/',
        external: true,
      },
      {
        label: 'TxDOT — road conditions & construction',
        href: 'https://www.txdot.gov/',
        note: 'Check corridor delays for long locals',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Denton university core, Lewisville/Highland Village, Flower Mound/Highland, Corinth/Lake Dallas edges) when available. Confirm campus packets near UNT/TWU, HOA/COI for suburban growth, and honest I-35 freeflow time — this is a DFW NW collar, not a renamed Dallas pack. Parent market: Dallas guide for metro-core context.',
  lastReviewed: '2026-07-24',
});
