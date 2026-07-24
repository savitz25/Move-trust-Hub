import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeVtPack } from '@/lib/local-movers/county-intelligence/vermont/vt-shared';

/**
 * Rutland County, VT — Rutland regional hub / ski-country approaches.
 * NOT a renamed NH Grafton page. NOT Burlington Chittenden density. NOT Bennington clone only.
 */
export const rutlandCountyVtIntelligence: CountyIntelligencePack = finalizeVtPack({
  countySlug: 'rutland',
  hubTitle: 'Rutland County Moving Intelligence Hub',
  eyebrow:
    'Rutland County, VT · Rutland regional · ski-country · US-4 · US-7 · VT-103',
  h1: 'Moving in Rutland County: Regional City Grids, Killington Approaches & US-4 / US-7 Winter Logistics',
  heroOpener:
    'Rutland County, Vermont is a southern Vermont regional hub — Rutland city multi-unit and character grids, Castleton and Fair Haven village stock, Brandon and Pittsford corridor homes, and ski-country mountain approaches toward Killington, Pico, and the US-4 corridor — not a Burlington Chittenden density page and not a New Hampshire seacoast rename. A downtown Rutland third-floor walk-up, a Castleton village long-carry, a Killington mountain-driveway job, and a Brandon ranch do not share truck access, grade risk, or empty-mile math. US-4, US-7, VT-103, and the local Rutland grid freeflow rewrite “local” estimates, and mountain winter ice can erase schedule optimism overnight. This hub is for people moving in Rutland County, Vermont — regional and ski-approach realities, not a recycled NH or Burlington product page.',
  heroCredibility:
    'Written estimates + insurance for intrastate VT moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: 'US-4 · US-7 · VT-103 · local Rutland grid',
  whatMakesDifferent: {
    title: 'What makes moving in Rutland County different',
    intro:
      'These are Rutland regional and ski-country realities — city multi-unit, village stock, mountain approaches, corridor freeflow, and deep-winter logistics — not Burlington lakeshore density, not Bennington south-only templates, and not a New Hampshire or Massachusetts rename.',
    bullets: [
      {
        title: 'Rutland city multi-unit and character grids rewrite labor hours',
        detail:
          'Scarce curb staging, multi-flight stairs, older interiors, and tight residential blocks dominate core jobs. A Killington mountain driveway is not a downtown walk-up — and neither is a Brandon ranch.',
      },
      {
        title: 'Village stock underprices flat-suburb optimism',
        detail:
          'Castleton, Fair Haven, Brandon, and Pittsford bring tight curb, basement stairs, tree canopy, and limited truck turnaround. Survey photos beat bedroom-count quotes.',
      },
      {
        title: 'Ski-country mountain approaches are not city product',
        detail:
          'Killington, Pico, and US-4 mountain grades mix long driveway carries, limited turnaround, seasonal traffic, and winter ice that flat-rate city quotes ignore.',
      },
      {
        title: 'US-4, US-7, and VT-103 define portal-to-portal time',
        detail:
          'Rutland ↔ Killington, Castleton ↔ Brandon, or Fair Haven ↔ Rutland pairs look local on maps and regional at peak or ski-season. Price honestly — empty miles and construction windows stack fast.',
      },
      {
        title: 'Mountain winter logistics and older village stock are real schedule risk',
        detail:
          'Deep snow, freeze-thaw ice on grades, and older basements reshape morning windows. Build weather contingency into outdoor staging — especially November–March and ski-peak weekends.',
      },
      {
        title:
          'Vermont has no dedicated HHG certificate like NH RSA 359-T — written estimates, insurance, FMCSA interstate',
        detail:
          'Vermont does not maintain a dedicated household-goods certificate program comparable to New Hampshire RSA 359-T, Massachusetts DPU operating certificates, New York, or New Jersey consumer-mover frameworks. For pure in-state Vermont jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Vermont DMV Commercial Vehicle Operations (CVO) covers IRP, IFTA, permits, and related commercial frameworks — not a consumer-facing HHG license directory. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not invent a Vermont HHG certificate number that does not exist.',
      },
    ],
  },
  zonesHeading: 'Rutland County access zones',
  zonesIntro:
    'Plan by Rutland city multi-unit, western village belts, northern corridor towns, and ski-country mountain approaches — access rules cluster by density and grade more than ZIP alone.',
  zones: [
    {
      id: 'rutland-city-core',
      name: 'Rutland city multi-unit, downtown grids & character stock',
      shortName: 'Rutland city',
      neighborhoods: [
        'Downtown Rutland',
        'Rutland City residential grids',
        'Center Street / business district edges',
        'West Street corridor edges',
        'Rutland Town edges',
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
        'rutland',
        'rutland city',
        'downtown rutland',
        'rutland town',
      ],
    },
    {
      id: 'castleton-fair-haven',
      name: 'Castleton, Fair Haven & western village stock',
      shortName: 'Castleton / Fair Haven',
      neighborhoods: [
        'Castleton',
        'Fair Haven',
        'Poultney edges',
        'US-4 west approaches',
        'Lake Bomoseen edges',
      ],
      housingTypes: 'Village SFH, older multi-unit, lakeside and rural-residential stock',
      challenges: [
        'Tight village curb and long driveway carries',
        'Limited truck turnaround on older lots',
        'US-4 freeflow into Rutland core',
      ],
      moverTips:
        'Photo driveway pitch and staging length. Prefer smaller trucks on village streets. Price west–core pairs portal-to-portal.',
      cityKeywords: [
        'castleton',
        'fair haven',
        'poultney',
        'bomoseen',
      ],
    },
    {
      id: 'brandon-pittsford-corridor',
      name: 'Brandon, Pittsford & US-7 northern corridor belts',
      shortName: 'Brandon / Pittsford',
      neighborhoods: [
        'Brandon',
        'Pittsford',
        'Proctor edges',
        'US-7 corridor approaches',
        'Mixed village-residential pockets',
      ],
      housingTypes: 'Village SFH, ranch and two-story stock, some multi-family',
      challenges: [
        'US-7 peak freeflow toward Rutland',
        'Mix of simple driveways and older village stairs',
        'Cross-zone empty miles into city multi-unit',
      ],
      moverTips:
        'Price corridor–city pairs with freeflow buffers. Survey stair access on older village stock. Clarify Brandon vs Rutland addresses on every estimate.',
      cityKeywords: [
        'brandon',
        'pittsford',
        'proctor',
        'us-7',
      ],
    },
    {
      id: 'killington-pico-mountain',
      name: 'Killington, Pico & US-4 ski-country mountain approaches',
      shortName: 'Killington / mountain',
      neighborhoods: [
        'Killington',
        'Pico approaches',
        'Mendon edges',
        'US-4 mountain corridor',
        'Seasonal / ski-adjacent homes',
      ],
      housingTypes: 'Mountain homes, chalets, long-driveway SFH, some condo product',
      challenges: [
        'Steep grades and limited truck turnaround',
        'Ski-season traffic and seasonal occupancy windows',
        'Deep winter ice and snow on approaches',
      ],
      moverTips:
        'Photo driveway grade and staging options early. Prefer mid-week non-peak ski windows when flexible. Build serious winter contingency and smaller-truck plans.',
      cityKeywords: [
        'killington',
        'pico',
        'mendon',
        'us-4',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Rutland County moving costs',
    intro:
      'City multi-unit friction, village stairs, mountain grade logistics, corridor portal time, and ski-season winter risk drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'Rutland city stair & curb friction',
        detail: 'Walk-ups, scarce staging, and older stock dominate core jobs.',
      },
      {
        title: 'Village long carries & basement access',
        detail: 'Castleton–Brandon character geometry spikes labor hours.',
      },
      {
        title: 'US-4 / US-7 / VT-103 freeflow',
        detail: 'Portal-to-portal spikes at peak and ski-season windows.',
      },
      {
        title: 'Mountain empty miles and winter grade delays',
        detail: 'Map-short pairs still bill regional time; ice on grades rewrites schedules.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,700+',
        note: 'Higher with city walk-ups, mountain grades, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,100+',
        note: 'Village and mountain friction trends up',
      },
      {
        label: '3–4+ BR / mountain / ski-approach / cross-zone',
        value: '$2,600–$8,600+',
        note: 'Long carries and mountain pairs highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$195+/hr',
        note: 'Portal-to-portal',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a move in Rutland County',
    intro:
      'Family school peaks, ski-season corridor congestion, village lease turns, and deep mountain winter reshape Rutland-region windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear city curb and reduce US-4 / US-7 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book Rutland multi-unit and village Saturdays early.',
      },
      {
        title: 'Ski-season corridor risk: December–March weekends',
        detail: 'Killington / US-4 traffic fills first — prefer flexible mid-week starts.',
      },
      {
        title: 'Winter ice, deep snow & mountain grade risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'rutland-ski-country-corridor',
      title: 'Rutland regional, ski-country approaches & US-4 / US-7 module',
      intro:
        'Rutland VT estimates fail when city stair surveys, village carries, mountain grades, or US-4/US-7 empty miles are ignored — and when crews treat this as Burlington density or a NH ski rename page.',
      bullets: [
        'Survey stair counts and curb options for Rutland city multi-unit early.',
        'Photo driveway grade and staging length on Killington / Pico mountain jobs.',
        'Price US-4 · US-7 · VT-103 pairs portal-to-portal, especially ski-season weekends.',
        'Clarify Rutland City vs Castleton vs Killington destinations on multi-town estimates.',
        'For pure in-state Vermont jobs insist on written estimates and insurance; verify FMCSA for any interstate leg — Vermont has no NH RSA 359-T-style HHG certificate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Rutland County?',
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
              'Rutland City, Rutland Town, Castleton, Mill River, Otter Valley, and other systems serve different addresses. Confirm zoning carefully — district lines shift town by town across the county.',
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
              'Rutland Regional Medical Center anchors regional care. Confirm networks and specialist access; some specialty care routes north toward Burlington.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Castleton, Brandon, Killington, and Fair Haven into RRMC. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'City multi-unit vs village SFH vs mountain stock',
            detail:
              'Rutland walk-ups, Castleton–Brandon village homes, and Killington mountain product price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Ski-adjacent and renovated city stock often prices differently from outer village multi-family or older mill-era product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Rutland city lifestyle',
            detail: 'Regional amenities with stair, curb, and winter city-street tradeoffs.',
          },
          {
            title: 'Castleton / Fair Haven / Brandon village pattern',
            detail: 'Village character and quieter logistics with longer empty miles to core jobs.',
          },
          {
            title: 'Killington / mountain pattern',
            detail: 'Ski-country space and recreation — with grade, winter, and seasonal traffic tradeoffs.',
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
              'Healthcare at RRMC, education, manufacturing heritage, tourism and ski-season hospitality, and regional retail shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'US-4, US-7, and VT-103 peaks are real — especially ski weekends. Test drive peak routes between your zone and Rutland anchors.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Southern Vermont regional / ski-country identity',
            detail:
              'Rutland County is a Vermont regional hub with mountain approaches — not Burlington lakeshore density and not a NH seacoast rename.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England climate with deep mountain winters, freeze-thaw ice, and ski-season traffic. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Rutland County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Vermont does not use a dedicated HHG certificate like NH RSA 359-T — insist on written estimates and insurance for in-state jobs, and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Rutland, Vermont — official site',
        href: 'https://www.rutlandcity.org/',
        external: true,
      },
      {
        label: 'Rutland Regional Medical Center',
        href: 'https://www.rrmc.org/',
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
    'Prefer city multi-unit stair fluency and mountain-grade experience with honest US-4 · US-7 · VT-103 pricing. Insist on written estimates and insurance for intrastate VT moves; verify FMCSA interstate. Vermont has no NH RSA 359-T-style HHG certificate. This is Rutland County VT (regional / ski approaches) — not Burlington density and not a NH rename.',
  lastReviewed: '2026-07-24',
});
