import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeVtPack } from '@/lib/local-movers/county-intelligence/vermont/vt-shared';

/**
 * Windsor County, VT — White River Junction / Springfield / Upper Valley / I-91.
 * NOT Burlington south. NOT a renamed NH Grafton page. NOT Windham Brattleboro clone only.
 */
export const windsorCountyVtIntelligence: CountyIntelligencePack = finalizeVtPack({
  countySlug: 'windsor',
  hubTitle: 'Windsor County Moving Intelligence Hub',
  eyebrow:
    'Windsor County, VT · Upper Valley · White River Junction · Springfield · I-91 · US-5 · US-4',
  h1: 'Moving in Windsor County: Upper Valley Access, White River Junction Logistics & I-91 / Connecticut River Grids',
  heroOpener:
    'Windsor County, Vermont is Upper Valley and central-southern Vermont product — White River Junction multi-unit and rail-town grids, Hartford and Norwich village stock, Springfield industrial-village housing, Woodstock and Quechee character homes, and I-91 / Connecticut River corridor freeflow — not Burlington south and not a New Hampshire Grafton rename alone. A WRJ third-floor walk-up, a Norwich long-driveway home, a Springfield mill-era stair job, and a Woodstock village carry do not share truck access, interstate empty-mile risk, or winter approach math. I-91, US-5, US-4, and the local Upper Valley grid rewrite “local” estimates, and mountain and river-valley ice can erase schedule optimism overnight. This hub is for people moving in Windsor County, Vermont — Upper Valley realities, not a recycled Burlington or Brattleboro page.',
  heroCredibility:
    'Written estimates + insurance for intrastate VT moves · FMCSA for interstate · VT DMV CVO commercial frameworks · Curated directory listings',
  majorCorridors: 'I-91 · US-5 · US-4 · local Upper Valley grid',
  whatMakesDifferent: {
    title: 'What makes moving in Windsor County different',
    intro:
      'These are Upper Valley and Windsor County realities — WRJ multi-unit, Springfield village stock, Woodstock character product, I-91 freeflow, and river-valley winter logistics — not Burlington Chittenden density, not Windham Brattleboro alone, and not a New Hampshire or Massachusetts rename.',
    bullets: [
      {
        title: 'This is Windsor County Upper Valley — not Burlington south',
        detail:
          'Ignore Burlington hill and lakeshore templates. Windsor is White River Junction rail-town density, Hartford–Norwich village stock, Springfield industrial-village product, Woodstock–Quechee character homes, and I-91 corridor freeflow. Match estimates to Upper Valley addresses — not Chittenden defaults.',
      },
      {
        title: 'White River Junction multi-unit rewrites walk-up labor',
        detail:
          'Scarce curb staging, multi-flight stairs, tight turning radii, and mixed commercial-residential blocks dominate core jobs. A Woodstock village driveway does not share that packet stack.',
      },
      {
        title: 'Springfield and older village stock underprice flat-rate optimism',
        detail:
          'Mill-era multi-unit, basement stairs, tree canopy, and limited truck turnaround fail bedroom-count quotes. Survey photos beat inventory lists alone.',
      },
      {
        title: 'I-91, US-5, and US-4 freeflow is real portal-to-portal time',
        detail:
          'WRJ ↔ Springfield, Hartford ↔ Woodstock, or Norwich ↔ Quechee pairs look local and still burn peak minutes. Interstate NH hops need FMCSA — price honestly.',
      },
      {
        title: 'Mountain approaches, river-valley ice, and older stock are real schedule risk',
        detail:
          'Freeze-thaw ice on valley streets, mountain approaches toward Killington edges, and older basements reshape morning windows. Build weather contingency into outdoor staging — especially November–March.',
      },
      {
        title:
          'Vermont has no dedicated HHG certificate like NH RSA 359-T — written estimates, insurance, FMCSA interstate',
        detail:
          'Vermont does not maintain a dedicated household-goods certificate program comparable to New Hampshire RSA 359-T, Massachusetts DPU operating certificates, New York, or New Jersey consumer-mover frameworks. For pure in-state Vermont jobs, insist on written estimates matching the legal business name, cargo and liability insurance certificates, and clear inventory terms before you deposit. Vermont DMV Commercial Vehicle Operations (CVO) covers IRP, IFTA, permits, and related commercial frameworks — not a consumer-facing HHG license directory. Any out-of-state leg — including short Upper Valley hops into New Hampshire — needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER. Do not invent a Vermont HHG certificate number that does not exist.',
      },
    ],
  },
  zonesHeading: 'Windsor County access zones',
  zonesIntro:
    'Plan by White River Junction multi-unit, Hartford–Norwich Upper Valley villages, Springfield industrial-village belts, and Woodstock–Quechee character approaches — access rules cluster by density and corridor more than ZIP alone. This is not Burlington south.',
  zones: [
    {
      id: 'white-river-junction',
      name: 'White River Junction multi-unit, rail-town grids & downtown stock',
      shortName: 'White River Junction',
      neighborhoods: [
        'White River Junction',
        'Downtown WRJ multi-unit',
        'Rail-town commercial-residential edges',
        'I-91 / US-4 / US-5 approaches',
        'Hartford town WRJ-adjacent blocks',
      ],
      housingTypes: 'Walk-up multifamily, character SFH, mixed commercial-residential, limited elevators',
      challenges: [
        'Multi-flight stairs and scarce curb staging',
        'Interstate freeflow and rail-town congestion',
        'Winter ice on pitched streets',
      ],
      moverTips:
        'Survey stair counts with photos. Book mid-week early freight windows. Confirm curb staging in writing. Price any NH-border hop as interstate with FMCSA.',
      cityKeywords: [
        'white river junction',
        'wrj',
        'hartford vt',
      ],
    },
    {
      id: 'hartford-norwich-upper-valley',
      name: 'Hartford, Norwich & Upper Valley village stock',
      shortName: 'Hartford / Norwich',
      neighborhoods: [
        'Hartford',
        'Norwich',
        'Wilder edges',
        'Connecticut River corridor pockets',
        'Village residential grids',
      ],
      housingTypes: 'Village SFH, some multi-family, character homes, rural-residential edges',
      challenges: [
        'Long driveway carries and limited turnaround',
        'Cross-river NH gravity and interstate authority needs',
        'I-91 / US-5 freeflow into WRJ',
      ],
      moverTips:
        'Photo driveway pitch and staging length. Clarify VT vs NH destinations on every estimate. Prefer smaller trucks on village streets.',
      cityKeywords: [
        'hartford',
        'norwich',
        'wilder',
        'upper valley',
      ],
    },
    {
      id: 'springfield-industrial-village',
      name: 'Springfield industrial-village multi-unit & southern corridor belts',
      shortName: 'Springfield',
      neighborhoods: [
        'Springfield',
        'Downtown Springfield multi-unit',
        'Industrial-village residential grids',
        'I-91 south approaches',
        'Weathersfield / Ascutney edges',
      ],
      housingTypes: 'Mill-era multi-unit, older SFH, walk-ups, some ranch stock',
      challenges: [
        'Mill-era stairs and tight residential curb',
        'I-91 freeflow toward WRJ and Brattleboro',
        'Winter ice on village grades',
      ],
      moverTips:
        'Survey stair geometry on mill-era stock early. Price Springfield–WRJ pairs portal-to-portal. Protect older interiors.',
      cityKeywords: [
        'springfield vt',
        'springfield',
        'weathersfield',
        'ascutney',
      ],
    },
    {
      id: 'woodstock-quechee-character',
      name: 'Woodstock, Quechee & character village / mountain approaches',
      shortName: 'Woodstock / Quechee',
      neighborhoods: [
        'Woodstock',
        'Quechee',
        'Bridgewater edges',
        'US-4 corridor approaches',
        'Mountain / rural-residential edges',
      ],
      housingTypes: 'Character SFH, village stock, long-driveway homes, some condo product',
      challenges: [
        'Tight village curb and tourism-season congestion',
        'Long carries and limited truck length',
        'Mountain approaches and winter ice risk',
      ],
      moverTips:
        'Photo curb options and driveway geometry early. Prefer mid-week windows away from tourism peaks. Build winter contingency on mountain approaches.',
      cityKeywords: [
        'woodstock',
        'quechee',
        'bridgewater',
        'us-4',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Windsor County moving costs',
    intro:
      'WRJ multi-unit friction, village stairs, I-91 portal time, mountain empty miles, and winter ice drive quotes more than bedroom count alone.',
    drivers: [
      {
        title: 'White River Junction stair & curb friction',
        detail: 'Walk-ups, scarce staging, and rail-town geometry dominate core jobs.',
      },
      {
        title: 'Springfield mill-era & Woodstock village carries',
        detail: 'Basements, tight curb, and character stock spike labor hours.',
      },
      {
        title: 'I-91 / US-5 / US-4 freeflow',
        detail: 'Portal-to-portal spikes at peak; NH hops need FMCSA pricing honesty.',
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
        note: 'Higher with WRJ walk-ups, village stairs, or winter weather',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,350–$4,200+',
        note: 'Mill-era and character friction trends up',
      },
      {
        label: '3–4+ BR / mountain / cross-zone / interstate hop',
        value: '$2,600–$8,800+',
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
    title: 'When to schedule a move in Windsor County',
    intro:
      'Family school peaks, Upper Valley lease turns, tourism weekends in Woodstock–Quechee, and river-valley winter ice reshape Windsor County windows.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail: 'Clear WRJ curb and reduce I-91 / US-5 pain before peak.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail: 'Book WRJ multi-unit and village Saturdays early.',
      },
      {
        title: 'Tourism & leaf-season village congestion',
        detail: 'Woodstock–Quechee weekends fill first — prefer flexible mid-week starts.',
      },
      {
        title: 'Winter ice, snow & mountain approach risk',
        detail: 'Plan outdoor staging contingency and flexible start times November–March.',
      },
    ],
  },
  specialized: [
    {
      id: 'upper-valley-i91-logistics',
      title: 'Upper Valley multi-unit, I-91 freeflow & river-corridor module',
      intro:
        'Windsor VT estimates fail when WRJ stair surveys, village carries, I-91 empty miles, or NH-border authority are ignored — and when crews treat this as Burlington south or a Windham-only rename.',
      bullets: [
        'Survey stair counts and curb options for White River Junction multi-unit early.',
        'Photo driveway pitch and basement access on Springfield and Woodstock village stock.',
        'Price I-91 · US-5 · US-4 pairs portal-to-portal.',
        'Treat any New Hampshire Upper Valley hop as interstate — verify FMCSA, not NH RSA 359-T alone as VT permission.',
        'For pure in-state Vermont jobs insist on written estimates and insurance; Vermont has no NH RSA 359-T-style HHG certificate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Windsor County?',
    intro:
      'Use this as a practical fit checklist for the Upper Valley and central-southern Vermont — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. This is not Burlington south.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Hartford, Springfield, Windsor, Woodstock, and other systems serve different addresses across Windsor County. Confirm zoning carefully — district lines shift town by town, and some families look across the river into NH systems.',
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
              'Upper Valley care often routes toward Dartmouth Hitchcock (NH) and regional Vermont campuses including Springfield Hospital. Confirm insurance networks — many specialty trips cross the river and need interstate awareness for medical logistics, not just movers.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from WRJ, Norwich, Springfield, and Woodstock into preferred campuses. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'WRJ multi-unit vs village SFH vs character stock',
            detail:
              'White River Junction walk-ups, Springfield mill-era product, and Woodstock–Quechee character homes price and access very differently.',
          },
          {
            title: 'Cost variation',
            detail:
              'Upper Valley renovated and character stock often prices differently from outer industrial-village multi-family or rural mountain product.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'White River Junction / Hartford lifestyle',
            detail: 'Corridor access and multi-unit options with stair, curb, and freeflow tradeoffs.',
          },
          {
            title: 'Norwich / Upper Valley village pattern',
            detail: 'Village character near river gravity — with longer carries and interstate commute math.',
          },
          {
            title: 'Springfield / Woodstock pattern',
            detail: 'Industrial-village value or character tourism towns — with different logistics and winter risk.',
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
              'Upper Valley professional and healthcare gravity (including NH campuses), education, manufacturing heritage in Springfield, tourism, and regional services shape employment.',
          },
          {
            title: 'Commute realism',
            detail:
              'I-91, US-5, and US-4 peaks are real. Test drive peak routes — including short NH hops that still need interstate awareness for movers.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Upper Valley Vermont identity',
            detail:
              'Windsor County is Upper Valley and central-southern Vermont — not Burlington south, not Windham Brattleboro alone, and not a NH Grafton rename page.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England climate with cold winters, river-valley ice, and mountain snow. Plan outdoor staging contingency year-round.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Windsor County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Vermont does not use a dedicated HHG certificate like NH RSA 359-T — insist on written estimates and insurance for in-state jobs, and FMCSA for interstate legs (including short NH Upper Valley hops) before deposits.',
    items: [
      {
        label: 'Town of Hartford, Vermont — official site',
        href: 'https://www.hartford-vt.org/',
        external: true,
      },
      {
        label: 'Town of Springfield, Vermont — official site',
        href: 'https://www.springfieldvt.gov/',
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
    'Prefer WRJ multi-unit and village stair fluency with honest I-91 · US-5 · US-4 pricing. Insist on written estimates and insurance for intrastate VT moves; verify FMCSA for any NH hop. Vermont has no NH RSA 359-T-style HHG certificate. This is Windsor County VT (Upper Valley) — not Burlington south and not a NH rename.',
  lastReviewed: '2026-07-24',
});
