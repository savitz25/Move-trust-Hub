import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeVtPack } from '@/lib/local-movers/county-intelligence/vermont/vt-shared';

/**
 * Franklin County, VT — St. Albans / northwest dairy / border region.
 * NOT a Chittenden north clone only. NOT Burlington density. NOT Orleans Northeast Kingdom alone.
 */
export const franklinCountyVtIntelligence: CountyIntelligencePack = finalizeVtPack({
  countySlug: 'franklin',
  hubTitle: 'Franklin County Moving Intelligence Hub',
  eyebrow:
    'Franklin County, VT · St. Albans · northwest dairy / border · I-89 · US-7 · VT-78',
  h1: 'Moving in Franklin County: St. Albans Regional Access, Dairy-Country Driveways & I-89 / Border Logistics',
  heroOpener:
    'Franklin County, Vermont is northwest dairy-country and border-region product — St. Albans city multi-unit and character grids, Swanton and Highgate village stock, Enosburg and Richford rural approaches, Lake Champlain western edges, and I-89 freeflow north of the Burlington metro — not a Chittenden north clone and not Burlington hill density recycled with a different ZIP. A downtown St. Albans walk-up, a Swanton village long-carry, a dairy-farm driveway job, and a Highgate rural ranch do not share truck access, empty-mile risk, or winter staging math. I-89, US-7, VT-78, and the local St. Albans grid rewrite “local” estimates, and lake-effect snow plus long rural approaches can erase schedule optimism overnight. This hub is for people moving in Franklin County, Vermont — St. Albans and dairy-border realities, not a renamed Chittenden page.',
  heroCredibility:
    'Written estimates + insurance for intrastate VT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'I-89 · US-7 · VT-78 · local St. Albans grid',
  whatMakesDifferent: {
    title: 'What makes moving in Franklin County different',
    intro:
      'These are St. Albans regional and northwest Vermont dairy-border realities — city multi-unit, village stock, long rural driveways, I-89 freeflow, and Champlain winter logistics — not Burlington core density, not a Chittenden north template only, and not a New Hampshire or Massachusetts rename.',
    bullets: [
      {
        title: 'This is Franklin (St. Albans / dairy-border) — not Chittenden north only',
        detail:
          'Ignore Burlington hill walk-up defaults and Essex HOA scripts applied north of the metro. Franklin is St. Albans city multi-unit, Swanton–Highgate village product, Enosburg–Richford rural approaches, dairy-farm long driveways, and border-region empty miles. Match estimates to Franklin addresses — not a Chittenden clone with a different county name.',
      },
      {
        title: 'St. Albans multi-unit and character grids rewrite labor hours',
        detail:
          'Scarce curb staging, multi-flight stairs, older interiors, and tight residential blocks dominate core jobs. A dairy-country ranch driveway does not share that packet stack.',
      },
      {
        title: 'Village and dairy-country stock underprice flat-suburb optimism',
        detail:
          'Swanton, Highgate, Enosburg, and Richford bring long driveway carries, limited truck turnaround, basement stairs, and winter ice on rural approaches. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'I-89, US-7, and VT-78 define portal-to-portal time',
        detail:
          'St. Albans ↔ Swanton, Enosburg ↔ Highgate, or St. Albans ↔ Burlington-metro pairs look regional for good reason. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Lake Champlain winter, rural grades, and older village stock are real schedule risk',
        detail:
          'Lake-effect snow, freeze-thaw ice on long driveways, and older basements reshape morning windows. Build weather contingency into outdoor staging — especially November–March.',
      },
      {
        title:
          'Vermont has no dedicated HHG certificate like NH RSA 359-T — written estimates, insurance, FMCSA interstate',
        detail:
          'Vermont does not maintain a dedicated household-goods certificate program comparable to New Hampshire RSA 359-T, Massachusetts DPU operating certificates, New York, or New Jersey consumer-mover frameworks. For pure in-state Vermont jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Vermont DMV Commercial Vehicle Operations (CVO) covers IRP, IFTA, permits, and related commercial frameworks — not a consumer-facing HHG license directory. Any out-of-state leg — including Quebec border–adjacent commercial complexity and short hops into New York — needs active FMCSA USDOT (and usually MC) authority where applicable — verify on FMCSA SAFER. Do not invent a Vermont HHG certificate number that does not exist.',
      },
    ],
  },
  zonesHeading: 'Franklin County access zones',
  zonesIntro:
    'Plan by St. Albans city multi-unit, Swanton–Highgate village belts, Enosburg–Richford rural approaches, and western lakeshore edges — access rules cluster by density and driveway length more than ZIP alone. This is not a Chittenden north clone.',
  zones: [
    {
      id: 'st-albans-city',
      name: 'St. Albans city multi-unit, downtown grids & character stock',
      shortName: 'St. Albans city',
      neighborhoods: [
        'Downtown St. Albans',
        'St. Albans City residential grids',
        'Main Street / business district edges',
        'St. Albans Town edges',
        'I-89 / US-7 approaches',
      ],
      housingTypes: 'Walk-up multifamily, character SFH, limited elevators, mixed commercial-residential',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Older basements and tight turning radii',
        'Winter ice on pitched city streets',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm curb staging options in writing before load day.',
      cityKeywords: [
        'st albans',
        'saint albans',
        'st. albans',
        'st albans city',
      ],
    },
    {
      id: 'swanton-highgate',
      name: 'Swanton, Highgate & northwestern village / border approaches',
      shortName: 'Swanton / Highgate',
      neighborhoods: [
        'Swanton',
        'Highgate',
        'VT-78 corridor approaches',
        'Border-adjacent village edges',
        'Missisquoi River corridor pockets',
      ],
      housingTypes: 'Village SFH, older multi-unit, rural-residential, some lakeshore stock',
      challenges: [
        'Long driveway carries and limited turnaround',
        'VT-78 / US-7 freeflow into St. Albans',
        'Winter ice and border-region empty miles',
      ],
      moverTips:
        'Photo driveway pitch and staging length. Prefer smaller trucks on village streets. Price Swanton–St. Albans pairs portal-to-portal.',
      cityKeywords: [
        'swanton',
        'highgate',
        'vt-78',
      ],
    },
    {
      id: 'enosburg-richford-rural',
      name: 'Enosburg Falls, Richford & eastern dairy / rural approaches',
      shortName: 'Enosburg / Richford',
      neighborhoods: [
        'Enosburg Falls',
        'Richford',
        'Montgomery edges',
        'Dairy-country rural roads',
        'VT-105 / mountain approach edges',
      ],
      housingTypes: 'Farmhouses, ranch SFH, long-driveway rural-residential, village stock',
      challenges: [
        'Very long driveway carries and limited truck access',
        'Mountain and rural grade winter risk',
        'Empty miles into St. Albans core',
      ],
      moverTips:
        'Photo driveway length, grade, and turnaround early. Price rural–core pairs with honest empty-mile buffers. Build serious winter contingency.',
      cityKeywords: [
        'enosburg',
        'enosburg falls',
        'richford',
        'montgomery',
      ],
    },
    {
      id: 'lakeshore-champlain-edges',
      name: 'Lake Champlain western edges & St. Albans Bay approaches',
      shortName: 'Lakeshore / Bay',
      neighborhoods: [
        'St. Albans Bay edges',
        'Georgia lakeshore edges',
        'Lake Champlain western approaches',
        'Seasonal / lakeshore homes',
        'US-7 lakeshore corridor pockets',
      ],
      housingTypes: 'Lakeshore SFH, seasonal stock, mixed rural-residential',
      challenges: [
        'Narrow lot access and long carries to water',
        'Lake-effect snow and freeze-thaw ice',
        'Seasonal occupancy and tourism curb windows',
      ],
      moverTips:
        'Photo lot geometry and staging options early. Prefer mid-week non-peak windows. Build Champlain winter contingency on lakeshore approaches.',
      cityKeywords: [
        'st albans bay',
        'georgia vt',
        'lake champlain',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Franklin County moving costs',
    intro:
      'St. Albans multi-unit friction, village stairs, dairy-country driveway length, corridor portal time, and Champlain winter logistics drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'St. Albans city stair & curb friction',
        detail: 'Walk-ups, scarce staging, and older stock dominate core jobs.',
      },
      {
        title: 'Village & dairy-country long carries',
        detail: 'Driveway length and limited turnaround spike labor hours.',
      },
      {
        title: 'I-89 / US-7 / VT-78 freeflow',
        detail: 'Portal-to-portal spikes at peak and construction windows.',
      },
      {
        title: 'Rural empty miles and winter ice delays',
        detail: 'Map-short pairs still bill regional time; lake-effect ice rewrites schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,650+',
        note: 'Higher with city walk-ups, long driveways, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,250–$3,900+',
        note: 'Village and rural friction trends up',
      },
      {
        label: '3–4+ BR / dairy-country / cross-zone',
        value: '$2,400–$8,000+',
        note: 'Long carries and multi-corridor pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$190+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Franklin County',
    intro:
      'Family school peaks, village lease turns, agricultural calendars, and Lake Champlain winter ice reshape St. Albans-region windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear city curb and reduce I-89 / US-7 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book St. Albans multi-unit and village Saturdays early.',
      },
      {
        title: 'Agricultural & lakeshore seasonal windows',
        detail: 'Dairy and seasonal home calendars can stack with school peaks — confirm occupancy early.',
      },
      {
        title: 'Winter lake-effect, rural ice & long-driveway risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'st-albans-dairy-border-logistics',
      title: 'St. Albans regional, dairy-country driveways & I-89 border module',
      intro:
        'Franklin VT estimates fail when city stair surveys, long dairy driveways, village carries, or I-89/US-7 empty miles are ignored — and when crews treat this as a Chittenden north clone or Burlington density rename.',
      bullets: [
        'Survey stair counts and curb options for St. Albans city multi-unit early.',
        'Photo driveway length, grade, and turnaround on dairy-country and rural jobs.',
        'Price I-89 · US-7 · VT-78 pairs portal-to-portal, including Swanton–Enosburg empty miles.',
        'State the market as Franklin County / St. Albans — not Chittenden north or Burlington core.',
        'For pure in-state Vermont jobs insist on written estimates and insurance; verify FMCSA for any interstate leg — Vermont has no NH RSA 359-T-style HHG certificate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Franklin County?',
    intro:
      'Use this as a practical fit checklist for northwest Vermont — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. This is St. Albans dairy-border country, not a Chittenden north clone.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Maple Run (St. Albans), Missisquoi Valley, Enosburg, Richford, and other systems serve different addresses across Franklin County. Confirm zoning carefully — district lines shift town by town.',
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
              'Northwestern Medical Center in St. Albans anchors regional care. Confirm networks; some specialty care routes south toward Burlington / UVM Medical Center.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Swanton, Enosburg, Richford, and Highgate into Northwestern Medical Center and Burlington specialty campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'City multi-unit vs village SFH vs dairy-country stock',
            detail:
              'St. Albans walk-ups, Swanton–Highgate village homes, and Enosburg–Richford farmhouses price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Lakeshore and renovated city stock often prices differently from outer rural multi-family or older dairy-country product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'St. Albans city lifestyle',
            detail: 'Regional amenities with stair, curb, and winter city-street tradeoffs.',
          },
          {
            title: 'Swanton / Highgate village pattern',
            detail: 'Village character near border approaches — with longer empty miles to core jobs.',
          },
          {
            title: 'Enosburg / Richford dairy-country pattern',
            detail: 'Rural space and agricultural setting — with long driveway and winter approach risk.',
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
              'Healthcare at Northwestern Medical Center, dairy and agriculture, manufacturing, education, border-region services, and commuting gravity toward the Burlington metro shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-89, US-7, and VT-78 peaks are real — including southbound metro gravity. Test drive peak routes between your zone and St. Albans or Burlington anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Northwest Vermont dairy-border identity',
            detail:
              'Franklin County is St. Albans regional and dairy-border Vermont — not a Chittenden north clone, not Burlington lakeshore density, and not a NH seacoast rename.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England climate with lake-effect snow, cold winters, and freeze-thaw ice on rural approaches. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Franklin County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Vermont does not use a dedicated HHG certificate like NH RSA 359-T — insist on written estimates and insurance for in-state jobs, and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of St. Albans, Vermont — official site',
        href: 'https://www.stalbansvt.com/',
        external: true,
      },
      {
        label: 'Northwestern Medical Center',
        href: 'https://www.northwesternmedicalcenter.org/',
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
    'Prefer St. Albans multi-unit stair fluency and dairy-country long-driveway experience with honest I-89 · US-7 · VT-78 pricing. Insist on written estimates and insurance for intrastate VT moves; verify FMCSA interstate. Vermont has no NH RSA 359-T-style HHG certificate. This is Franklin County VT (St. Albans / dairy-border) — not a Chittenden north clone and not Burlington density.',
  lastReviewed: '2026-07-24',
});
