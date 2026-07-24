import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeVtPack } from '@/lib/local-movers/county-intelligence/vermont/vt-shared';

/**
 * Chittenden County, VT — Burlington / Winooski / Essex / Lake Champlain metro core.
 * NOT a renamed NH Hillsborough page. NOT Rutland ski-country. NOT Franklin dairy-north clone.
 */
export const chittendenCountyVtIntelligence: CountyIntelligencePack = finalizeVtPack({
  countySlug: 'chittenden',
  hubTitle: 'Chittenden County Moving Intelligence Hub',
  eyebrow:
    'Chittenden · Burlington VT metro · Lake Champlain · I-89 · US-7 · US-2',
  h1: 'Moving in Chittenden County: Burlington Density, Winooski Walk-Ups & Lake Champlain Winter Access',
  heroOpener:
    'Chittenden County, Vermont is the state’s densest residential market — Burlington hill and lakeshore multi-unit, Winooski mill-era walk-ups, Essex Junction and Williston growth belts, Shelburne–Charlotte village stock, and mountain approaches east toward Underhill and Jericho — not a renamed New Hampshire seacoast page and not a Rutland ski-country template. A downtown Burlington third-floor walk-up, a Winooski loft elevator job, an Essex cul-de-sac HOA, and a lakeshore long-carry do not share truck access, curb rules, or empty-mile risk. I-89, US-7, US-2, and the local Burlington grid freeflow rewrite “local” estimates, and Lake Champlain lake-effect snow plus hill ice can erase schedule optimism overnight. This hub is for people moving in Chittenden County, Vermont — Burlington-market realities, not a recycled NH or MA product page.',
  heroCredibility:
    'Written estimates + insurance for intrastate VT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-89 · US-7 · US-2 · local Burlington grid',
  whatMakesDifferent: {
    title: 'What makes moving in Chittenden County different',
    intro:
      'These are Burlington–Lake Champlain metro realities — hill multi-unit, mill-era walk-ups, suburban growth HOAs, corridor freeflow, and Champlain winter logistics — not Rutland ski approaches, not Franklin dairy-north defaults, and not a New Hampshire or Massachusetts rename.',
    bullets: [
      {
        title: 'Burlington hill and lakeshore multi-unit rewrite labor hours',
        detail:
          'Scarce curb staging, multi-flight stairs, limited truck length, and building COI packets dominate core jobs. A downtown or hill walk-up is not an Essex garage-friendly two-story.',
      },
      {
        title: 'Winooski and older village stock underprice flat-suburb optimism',
        detail:
          'Mill-era multi-unit, tight residential curb, basement stairs, and tree canopy fail bedroom-count quotes. Survey photos beat inventory lists alone.',
      },
      {
        title: 'Essex–Williston–South Burlington growth belts are not core product',
        detail:
          'HOA gate lists, truck-length limits, longer portal time into Burlington, and mixed townhome product reshape estimates that assume “Chittenden flat rate.”',
      },
      {
        title: 'I-89, US-7, and US-2 define portal-to-portal time',
        detail:
          'Essex ↔ Burlington, Williston ↔ Winooski, or Shelburne ↔ Jericho pairs look local on maps and regional at peak. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Lake Champlain winter, hill ice, and mountain approaches are real schedule risk',
        detail:
          'Lake-effect snow, freeze-thaw ice on hill streets, and eastern mountain approaches toward Underhill reshape morning windows. Build weather contingency into outdoor staging — especially November–March.',
      },
      {
        title:
          'Vermont has no dedicated HHG certificate like NH RSA 359-T — written estimates, insurance, FMCSA interstate',
        detail:
          'Vermont does not maintain a dedicated household-goods certificate program comparable to New Hampshire RSA 359-T, Massachusetts DPU operating certificates, New York, or New Jersey consumer-mover frameworks. For pure in-state Vermont jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Vermont DMV Commercial Vehicle Operations (CVO) covers IRP, IFTA, permits, and related commercial frameworks — not a consumer-facing HHG license directory. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not invent a Vermont HHG certificate number that does not exist.',
      },
    ],
  },
  zonesHeading: 'Chittenden County access zones',
  zonesIntro:
    'Plan by Burlington hill/lakeshore multi-unit, Winooski mill-era walk-ups, Essex–Williston growth belts, and southern/eastern village–mountain approaches — access rules cluster by density and terrain more than ZIP alone.',
  zones: [
    {
      id: 'burlington-hill-lakeshore',
      name: 'Burlington hill, downtown multi-unit & Lake Champlain lakeshore',
      shortName: 'Burlington core',
      neighborhoods: [
        'Downtown Burlington',
        'Hill Section',
        'Old North End edges',
        'South End / Lakeside edges',
        'Waterfront-adjacent blocks',
      ],
      housingTypes: 'Walk-up multifamily, condos, character SFH, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Hill ice and lake-effect winter windows',
        'Tight turning radii and building COI packets',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm building COIs and curb options in writing. Build Champlain winter contingency on lakeshore approaches.',
      cityKeywords: [
        'burlington',
        'downtown burlington',
        'hill section',
        'south end',
        'old north end',
      ],
    },
    {
      id: 'winooski-colchester',
      name: 'Winooski mill-era multi-unit & Colchester corridor edges',
      shortName: 'Winooski / Colchester',
      neighborhoods: [
        'Winooski',
        'Winooski Falls / downtown loft edges',
        'Colchester village edges',
        'Malletts Bay approaches',
        'US-7 / US-2 corridor pockets',
      ],
      housingTypes: 'Mill lofts, walk-up multifamily, mixed SFH, some elevators',
      challenges: [
        'Elevator/COI windows on loft product',
        'Tight mill-era curb and long carries',
        'US-7 freeflow into Burlington core',
      ],
      moverTips:
        'Get loft building packets early. Photo mill-era stair and curb geometry. Price Winooski–Burlington pairs portal-to-portal at peak.',
      cityKeywords: [
        'winooski',
        'colchester',
        'malletts bay',
        'winooski falls',
      ],
    },
    {
      id: 'essex-williston-south-burlington',
      name: 'Essex Junction, Williston & South Burlington growth belts',
      shortName: 'Essex / Williston / S. Burlington',
      neighborhoods: [
        'Essex Junction',
        'Essex town edges',
        'Williston',
        'South Burlington',
        'I-89 / Taft Corners approaches',
      ],
      housingTypes: 'Newer SFH, townhomes, HOA tracts, multi-family growth product',
      challenges: [
        'HOA gate lists and truck-length limits',
        'I-89 / US-2 peak congestion toward core',
        'Longer portal time on growth–core pairs',
      ],
      moverTips:
        'Collect HOA packets early. Price Essex–Burlington and Williston–Winooski pairs portal-to-portal. Avoid peak I-89 windows when flexible.',
      cityKeywords: [
        'essex',
        'essex junction',
        'williston',
        'south burlington',
        'taft corners',
      ],
    },
    {
      id: 'shelburne-charlotte-underhill',
      name: 'Shelburne–Charlotte village stock & eastern mountain approaches',
      shortName: 'Shelburne / Charlotte / Underhill',
      neighborhoods: [
        'Shelburne',
        'Charlotte',
        'Jericho',
        'Underhill',
        'Richmond / Huntington edges',
      ],
      housingTypes: 'Older village SFH, farmhouses, rural-residential, some lakeshore stock',
      challenges: [
        'Long driveway carries and limited truck turnaround',
        'Mountain approach grades and winter ice',
        'US-7 south empty miles into Burlington',
      ],
      moverTips:
        'Photo driveway pitch and staging length. Price rural–core pairs with freeflow buffers. Build winter contingency on mountain approaches.',
      cityKeywords: [
        'shelburne',
        'charlotte',
        'jericho',
        'underhill',
        'richmond',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Chittenden County moving costs',
    intro:
      'Core multi-unit friction, mill-era stairs, growth-belt HOA rules, corridor portal time, and Champlain winter logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Burlington hill / lakeshore stair & curb friction',
        detail: 'Walk-ups, scarce staging, and building packets dominate core jobs.',
      },
      {
        title: 'Winooski mill-era long carries & loft soft costs',
        detail: 'Elevators, COIs, tight curb, and stair geometry spike labor hours.',
      },
      {
        title: 'I-89 / US-7 / US-2 congestion',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Growth–core empty miles and winter ice delays',
        detail: 'Map-short pairs still bill regional time; hill and lake-effect ice rewrites schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$500–$1,900+',
        note: 'Higher with walk-ups, loft COIs, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,500–$4,600+',
        note: 'Core and mill-era friction trends up',
      },
      {
        label: '3–4+ BR / HOA / cross-metro / mountain',
        value: '$2,800–$9,200+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$200+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Chittenden County',
    intro:
      'University and family peaks, multi-family lease turns, lakeshore tourism weekends, and Lake Champlain winter ice reshape Burlington-area windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear hill curb and reduce I-89 / US-7 pain before peak.',
      },
      {
        title: 'Peak family & campus season: late May–mid-August',
        detail: 'Book Burlington multi-unit and Essex Saturdays early.',
      },
      {
        title: 'Month-end multi-family turns',
        detail: 'Downtown, hill, and Winooski elevators fill first.',
      },
      {
        title: 'Winter lake-effect, hill ice & mountain approach risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'burlington-champlain-metro-grid',
      title: 'Burlington–Lake Champlain metro & corridor-grid module',
      intro:
        'Chittenden VT estimates fail when core building packets, mill-era stairs, growth-belt HOA rules, or I-89/US-7/US-2 empty miles are ignored — and when crews treat this as a NH, MA, or Rutland ski rename page.',
      bullets: [
        'Request Burlington and Winooski multi-unit building packets early.',
        'Photo stair access, basement entries, and curb staging on hill and mill-era jobs.',
        'Price I-89 · US-7 · US-2 pairs portal-to-portal.',
        'Clarify Burlington vs Essex vs Williston vs Shelburne destinations on multi-town estimates.',
        'For pure in-state Vermont jobs insist on written estimates and insurance; verify FMCSA for any interstate leg — Vermont has no NH RSA 359-T-style HHG certificate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Chittenden County?',
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
              'Burlington School District, South Burlington, Essex Westford, Colchester, Williston, Shelburne, and other systems serve different addresses. Confirm zoning carefully — district lines shift block by block across the metro.',
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
              'University of Vermont Medical Center and affiliated campuses anchor regional care. Confirm networks and specialist access for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Essex, Williston, Shelburne, and eastern mountain towns into UVM Medical Center. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Core multi-unit vs growth SFH vs village stock',
            detail:
              'Burlington walk-ups, Winooski lofts, Essex–Williston HOA product, and Shelburne–Charlotte village homes price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Lakeshore and Burlington-core renovated stock often prices differently from outer growth multi-family or older village product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Burlington / lakeshore lifestyle',
            detail: 'Walkable amenities with stair, curb, density, and winter hill tradeoffs.',
          },
          {
            title: 'Winooski / Colchester pattern',
            detail: 'Mill-era multi-unit and corridor logistics near US-7 / US-2.',
          },
          {
            title: 'Essex / Williston / South Burlington pattern',
            detail: 'More space, HOA rules, and different commute math to core jobs.',
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
              'Healthcare and UVM, higher education, tech and professional services, government, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-89, US-7, and US-2 peaks are real. Test drive peak routes between your zone and Burlington / UVM anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Lake Champlain metro identity',
            detail:
              'Chittenden is Vermont’s largest metro core — not a NH seacoast rename, not Rutland ski-country product, and not Franklin dairy-north alone.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England climate with lake-effect snow, hill ice, and cold winters. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Chittenden County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Vermont does not use a dedicated HHG certificate like NH RSA 359-T — insist on written estimates and insurance for in-state jobs, and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Chittenden County, Vermont — Regional Planning Commission',
        href: 'https://www.ccrpcvt.org/',
        external: true,
      },
      {
        label: 'City of Burlington — official site',
        href: 'https://www.burlingtonvt.gov/',
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
    'Prefer core multi-unit and mill-era stair experience with honest I-89 · US-7 · US-2 pricing. Insist on written estimates and insurance for intrastate VT moves; verify FMCSA interstate. Vermont has no NH RSA 359-T-style HHG certificate. This is Chittenden County VT (Burlington / Lake Champlain) — not a NH or MA rename.',
  lastReviewed: '2026-07-24',
});
