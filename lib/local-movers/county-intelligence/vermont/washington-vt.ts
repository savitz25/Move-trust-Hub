import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeVtPack } from '@/lib/local-movers/county-intelligence/vermont/vt-shared';

/**
 * Washington County, VT — Montpelier capital / Barre granite-city core.
 * CRITICAL: Washington County VERMONT / Montpelier — NOT Washington State,
 * NOT Washington County AR, NOT Washington County RI.
 */
export const washingtonCountyVtIntelligence: CountyIntelligencePack = finalizeVtPack({
  countySlug: 'washington',
  hubTitle: 'Washington County Moving Intelligence Hub',
  eyebrow:
    'Washington County, VT · Montpelier capital · Barre · I-89 · US-2 · VT-12',
  h1: 'Moving in Washington County, Vermont: Montpelier Capital Access, Barre Village Stock & I-89 / US-2 Logistics',
  heroOpener:
    'Washington County, Vermont — the Montpelier capital region and Barre granite-city core — is not Washington State, not Washington County Arkansas (Fayetteville/Northwest Arkansas), and not Washington County Rhode Island (South County). Expect tight capital-city curb around the State House, older Montpelier and Barre village multi-unit, Berlin–Middlesex corridor growth, mountain approaches toward Waterbury and the Mad River edges, and winter ice that rewrites load windows. A Montpelier third-floor walk-up, a Barre mill-era stair job, a Berlin ranch, and a Waterbury long-driveway home do not share truck access or empty-mile risk. I-89, US-2, VT-12, and the local Montpelier/Barre grid freeflow define portal-to-portal time. This hub is for people moving in Washington County, Vermont (Montpelier / Barre) — capital-region realities, not a Washington State, Arkansas, or Rhode Island page.',
  heroCredibility:
    'Written estimates + insurance for intrastate VT moves · FMCSA for interstate · VT DMV CVO commercial frameworks · Curated directory listings',
  majorCorridors: 'I-89 · US-2 · VT-12 · local Montpelier/Barre grid',
  whatMakesDifferent: {
    title: 'What makes moving in Washington County, Vermont different',
    intro:
      'These are Montpelier capital and Barre village realities — tight downtown curb, older multi-unit stairs, granite-city stock, mountain approaches, and I-89 freeflow — not Washington State, not Washington County AR, not Washington County RI, and not a Burlington Chittenden clone.',
    bullets: [
      {
        title: 'This is Washington County, Vermont (Montpelier) — not WA State, AR, or RI',
        detail:
          'Ignore Seattle–Puget Sound templates, Northwest Arkansas growth scripts, and Rhode Island South County coastal defaults. Washington County VT is Montpelier capital density, Barre village multi-unit, Berlin corridor product, and mountain approaches toward Waterbury. Match estimates to Vermont capital-region addresses only.',
      },
      {
        title: 'Montpelier capital multi-unit and tight downtown curb rewrite labor',
        detail:
          'State-adjacent blocks, scarce truck length, multi-flight stairs, and event-day congestion dominate core jobs. A Berlin ranch does not share that packet stack.',
      },
      {
        title: 'Barre older village and mill-era stock underprice flat-rate optimism',
        detail:
          'Granite-city character SFH, walk-up multifamily, basement stairs, and tight residential curb fail bedroom-count quotes. Survey photos beat inventory lists alone.',
      },
      {
        title: 'I-89, US-2, and VT-12 freeflow is real portal-to-portal time',
        detail:
          'Montpelier ↔ Barre, Berlin ↔ Waterbury, or Barre ↔ Middlesex pairs look local and still burn peak minutes. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Mountain approaches and winter ice are real schedule risk',
        detail:
          'Mad River / Waterbury approaches, freeze-thaw ice on village streets, and snow events reshape morning windows. Build weather contingency into outdoor staging — especially November–March.',
      },
      {
        title:
          'Vermont has no dedicated HHG certificate like NH RSA 359-T — written estimates, insurance, FMCSA interstate',
        detail:
          'Vermont does not maintain a dedicated household-goods certificate program comparable to New Hampshire RSA 359-T, Massachusetts DPU operating certificates, New York, or New Jersey consumer-mover frameworks. For pure in-state Vermont jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Vermont DMV Commercial Vehicle Operations (CVO) covers IRP, IFTA, permits, and related commercial frameworks — not a consumer-facing HHG license directory. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not invent a Vermont HHG certificate number that does not exist.',
      },
    ],
  },
  zonesHeading: 'Washington County, Vermont access zones',
  zonesIntro:
    'Plan by Montpelier capital multi-unit, Barre village stock, Berlin–Middlesex corridor belts, and Waterbury / mountain approaches — access rules cluster by density and terrain more than ZIP alone. This is Vermont only.',
  zones: [
    {
      id: 'montpelier-capital',
      name: 'Montpelier capital core, State House edges & downtown multi-unit',
      shortName: 'Montpelier capital',
      neighborhoods: [
        'Downtown Montpelier',
        'State House / capital approaches',
        'Barre Street corridor edges',
        'Northfield Street edges',
        'Winooski River-adjacent blocks',
      ],
      housingTypes: 'Walk-up multifamily, character SFH, limited elevators, mixed commercial-residential',
      challenges: [
        'Scarce curb and tight downtown truck length',
        'Multi-flight stairs and older interiors',
        'Event-day and legislative-session congestion',
      ],
      moverTips:
        'Survey stair counts with photos. Prefer mid-week early windows away from capital events. Confirm curb staging options in writing before load day.',
      cityKeywords: [
        'montpelier',
        'downtown montpelier',
        'vermont capital',
        'state house',
      ],
    },
    {
      id: 'barre-village',
      name: 'Barre city village stock, mill-era multi-unit & granite-city grids',
      shortName: 'Barre',
      neighborhoods: [
        'Downtown Barre',
        'Barre City residential grids',
        'Granite Street corridor edges',
        'Barre Town edges',
        'US-302 approaches',
      ],
      housingTypes: 'Older SFH, walk-up multifamily, mill-era stock, some multi-family',
      challenges: [
        'Tight residential curb and long carries',
        'Basement stairs and older village geometry',
        'Winter ice on pitched village streets',
      ],
      moverTips:
        'Photo driveway pitch and stair geometry early. Prefer smaller trucks where curb is tight. Protect older interiors and landscaping.',
      cityKeywords: [
        'barre',
        'barre city',
        'barre town',
        'granite city',
      ],
    },
    {
      id: 'berlin-middlesex-corridor',
      name: 'Berlin, Middlesex & US-2 / I-89 corridor belts',
      shortName: 'Berlin / Middlesex',
      neighborhoods: [
        'Berlin',
        'Middlesex',
        'I-89 / US-2 corridor approaches',
        'Hospital / service corridor edges',
        'Mixed residential-commercial pockets',
      ],
      housingTypes: 'Ranch and two-story SFH, some multi-family, corridor stock',
      challenges: [
        'I-89 / US-2 peak freeflow into Montpelier–Barre',
        'Mix of simple driveways and older stock',
        'Cross-zone empty miles into capital multi-unit',
      ],
      moverTips:
        'Price corridor–capital pairs portal-to-portal. Survey multi-family lease-turn timing. Clarify Berlin vs Montpelier addresses on every estimate.',
      cityKeywords: [
        'berlin vt',
        'middlesex vt',
        'us-2',
        'i-89',
      ],
    },
    {
      id: 'waterbury-mountain-approaches',
      name: 'Waterbury, Mad River edges & mountain approaches',
      shortName: 'Waterbury / mountain',
      neighborhoods: [
        'Waterbury',
        'Waterbury Center edges',
        'Mad River approach edges',
        'Northfield edges',
        'Rural mountain approaches',
      ],
      housingTypes: 'Village SFH, farmhouses, rural-residential, ski-adjacent stock',
      challenges: [
        'Long driveway carries and limited turnaround',
        'Mountain grades and winter ice risk',
        'I-89 empty miles into Montpelier–Barre core',
      ],
      moverTips:
        'Photo driveway pitch and staging length. Price mountain–capital pairs with freeflow buffers. Build winter contingency on approach roads.',
      cityKeywords: [
        'waterbury',
        'waterbury center',
        'mad river',
        'northfield',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Washington County, Vermont moving costs',
    intro:
      'Capital multi-unit friction, Barre village stairs, corridor portal time, mountain empty miles, and winter ice drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Montpelier capital curb & stair friction',
        detail: 'Scarce staging and walk-ups dominate core capital jobs.',
      },
      {
        title: 'Barre village long carries & older stock',
        detail: 'Basements, tight curb, and character geometry spike labor hours.',
      },
      {
        title: 'I-89 / US-2 / VT-12 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Mountain empty miles and winter ice delays',
        detail: 'Map-short pairs still bill regional time; ice rewrites schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,750+',
        note: 'Higher with capital walk-ups or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,200+',
        note: 'Village and capital friction trends up',
      },
      {
        label: '3–4+ BR / mountain / cross-county',
        value: '$2,600–$8,400+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Washington County, Vermont',
    intro:
      'Capital session calendars, family school peaks, village lease turns, and mountain winter ice reshape Montpelier–Barre windows — in Vermont only.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear capital curb and reduce I-89 / US-2 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Montpelier multi-unit and Barre Saturdays early.',
      },
      {
        title: 'Month-end multi-family & capital-adjacent turns',
        detail: 'Downtown Montpelier and Barre walk-ups fill first.',
      },
      {
        title: 'Winter ice, snow & mountain approach risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'montpelier-barre-capital-region',
      title: 'Montpelier capital / Barre village & I-89 logistics module',
      intro:
        'Washington County VT estimates fail when capital curb, Barre village stairs, mountain approaches, or I-89/US-2 empty miles are ignored — and when crews treat this as Washington State, Washington County AR, or Washington County RI.',
      bullets: [
        'State the market as Washington County, Vermont / Montpelier on every estimate — never WA State, AR, or RI.',
        'Survey stair counts and curb options for Montpelier capital multi-unit early.',
        'Photo driveway pitch and basement access on Barre village stock.',
        'Price I-89 · US-2 · VT-12 pairs portal-to-portal, including Waterbury mountain approaches.',
        'For pure in-state Vermont jobs insist on written estimates and insurance; verify FMCSA for any interstate leg — Vermont has no NH RSA 359-T-style HHG certificate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Washington County, Vermont?',
    intro:
      'Use this as a practical fit checklist for the Montpelier capital region — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. This is Vermont only, not Washington State or other Washington counties.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Montpelier Roxbury, Barre City, Barre Town, Berlin, U-32 and other systems serve different addresses across Washington County, Vermont. Confirm zoning carefully — marketing neighborhood names do not guarantee a campus.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools and Vermont Agency of Education data beat ranking screenshots.',
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
              'Central Vermont Medical Center (Berlin) and regional specialty campuses anchor care across the Montpelier–Barre belt. Confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Montpelier, Barre, Waterbury, and Northfield into CVMC and Burlington specialty care when needed. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Capital multi-unit vs Barre village vs corridor stock',
            detail:
              'Montpelier walk-ups, Barre character SFH, Berlin corridor product, and Waterbury mountain homes price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Capital-adjacent renovated stock often prices differently from outer village multi-family or rural mountain product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Montpelier capital lifestyle',
            detail: 'Walkable amenities and state employment gravity — with curb, stair, and density tradeoffs.',
          },
          {
            title: 'Barre village pattern',
            detail: 'Character SFH and mill-era multi-unit with tighter residential logistics.',
          },
          {
            title: 'Berlin corridor / Waterbury mountain pattern',
            detail: 'More space, different commute math, and winter approach risk.',
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
              'State government in Montpelier, healthcare at CVMC, education, granite and manufacturing heritage, and regional services shape employment in Washington County, Vermont.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-89, US-2, and VT-12 peaks are real. Test drive peak routes between your zone and Montpelier / Berlin anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Vermont capital-region identity',
            detail:
              'Washington County, Vermont is the Montpelier–Barre capital region — not Washington State, not Washington County AR, not Washington County RI, and not a Burlington Chittenden clone.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England climate with cold winters, mountain snow, and freeze-thaw ice. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Washington County, Vermont resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. This page covers Washington County, Vermont (Montpelier / Barre) only — not Washington State, Washington County AR, or Washington County RI. Vermont has no dedicated HHG certificate like NH RSA 359-T — insist on written estimates and insurance for in-state jobs, and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Montpelier, Vermont — official site',
        href: 'https://www.montpelier-vt.org/',
        external: true,
      },
      {
        label: 'City of Barre, Vermont — official site',
        href: 'https://www.barrecity.org/',
        external: true,
      },
      {
        label: 'Central Vermont Medical Center',
        href: 'https://www.cvmc.org/',
        external: true,
      },
      {
        label: 'Vermont Agency of Transportation — traffic',
        href: 'https://vtrans.vermont.gov/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Prefer capital multi-unit and Barre village stair experience with honest I-89 · US-2 · VT-12 pricing. Insist on written estimates and insurance for intrastate VT moves; verify FMCSA interstate. Vermont has no NH RSA 359-T-style HHG certificate. This is Washington County, VERMONT (Montpelier / Barre) — not Washington State, not Washington County AR, not Washington County RI.',
  lastReviewed: '2026-07-24',
});
