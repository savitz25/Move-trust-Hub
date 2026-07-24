import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Placer County — California Tier 2 (Sacramento collar: Roseville/Rocklin growth).
 * Parent: Sacramento County Tier 1. Not a capital-core Midtown elevator script.
 */
export const placerCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'placer',
  hubTitle: 'Placer County Moving Intelligence Hub',
  eyebrow: 'Placer County · Sacramento collar · South Placer growth',
  h1: 'Moving in Placer County: Sacramento Collar, I-80 / CA-65 Growth & HOA Logistics',
  heroOpener:
    'Placer County is the Sacramento metro collar built on Roseville and Rocklin growth — not capital-core elevators with a different ZIP. Master-planned HOAs, CA-65 and I-80 interchange timing, and end-of-month lease volume define South Placer. A short climb east, Auburn and the foothills add grade, older downtown grids, and winter risk the valley floor never sees. Farther on I-80 toward Donner and Tahoe approaches, snow plans and chain controls rewrite “local.” Quote the pocket: HOA village, foothill driveway, or mountain-edge corridor — not “Placer County” as one product.',
  heroCredibility:
    'Sacramento collar · I-80 / CA-65 growth · HOA logistics · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'I-80 · CA-65 · CA-49 · I-80 Donner approaches',
  parentCompare: {
    parentLabel: 'Sacramento County',
    parentHref: '/local-movers/california/sacramento',
    title: 'How Placer County differs from Sacramento County',
    intro:
      'Placer is the growth collar east and northeast of the capital region — newer planned stock and elevation edges, not Midtown/East Sac multi-unit density. Use this when one address sits in Sacramento County and the other in Placer.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'I-80 links Roseville–Rocklin–Auburn and Donner approaches; CA-65 feeds Lincoln and north growth; CA-49 serves foothill pockets. Roseville ↔ downtown Sacramento is a metro-timing local; Roseville ↔ Auburn adds grade; higher I-80 legs are mountain-adjacent — not capital grid miles.',
      },
      {
        title: 'Housing differences',
        detail:
          'Master-planned HOA villages, active-adult communities, and new-construction tracts dominate South Placer. Auburn foothill SFH and Sierra-edge stock replace many Sacramento pocket types (grid multi-unit, river-adjacent older stock). County-line pairs need both cities on the estimate.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Gate lists, COI, approved hours, and floor-protection rules are the South Placer default. Foothill grades and mountain turnarounds replace tight capital-core street grids. Incomplete builder roads in new villages add day-of risk Sac crews may not price.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone Roseville/Rocklin HOA jobs can look suburban-simple until soft costs and heat hit. Cross-elevation pairs (valley floor ↔ Auburn or Donner approaches) and winter capability raise the bill above flat Sacramento County locals of similar square footage.',
      },
      {
        title: 'Market role',
        detail:
          'Sacramento collar growth market: inbound volume tracks South Placer inventory and metro spillover, with a foothill/Sierra secondary product. Popular routes bias to Sacramento County and nearby secondaries — not a capital-only rate card.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Placer County different',
    intro:
      'Collar-market realities — HOA growth logistics, I-80 free-flow to Sac, foothill access, and California licensing.',
    bullets: [
      {
        title: 'Roseville / Rocklin / Lincoln are HOA-first products',
        detail:
          'Master-planned villages require Certificates of Insurance, gate lists, and approved hours. Treat the HOA packet as part of the survey — day-of paperwork scrambles cancel jobs.',
      },
      {
        title: 'I-80 freeflow to Sacramento is still clock time',
        detail:
          'Many households commute or pair addresses with Sacramento County. Peak I-80 and arterial delays on CA-65 pairs are billable. Ask how portal-to-portal time is priced across the county line.',
      },
      {
        title: 'Foothills and Donner approaches are elevation jobs',
        detail:
          'Auburn grades, canyon edges, and higher I-80 corridors need driveway photos, weather windows, and sometimes chain-capable planning. Valley HOA assumptions fail east of the floor.',
      },
      {
        title: 'Summer heat vs foothill winter',
        detail:
          'South Placer afternoons can run extreme; Auburn and Sierra approaches add freeze and storm risk. Start times and contingency language should match the elevation of each address.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — South Placer growth core, Lincoln edge, Auburn foothills, and Tahoe/Donner approaches. Elevation and HOA rules define the job more than generic Sacramento tips.',
  zones: [
    {
      id: 'roseville-rocklin',
      name: 'Roseville & Rocklin — South Placer Growth Core',
      shortName: 'Roseville / Rocklin',
      neighborhoods: [
        'West / East Roseville',
        'Galleria / North Roseville corridors',
        'Rocklin',
        'Stanford Ranch',
        'Whitney Ranch / newer Rocklin villages',
        'Loomis / Granite Bay edge',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, multi-family, some older in-town Roseville stock',
      challenges: [
        'HOA COI, gate lists, and approved move hours',
        'I-80 / CA-65 interchange congestion at peak',
        'Summer heat on open suburban staging',
      ],
      moverTips:
        'Collect HOA packets before booking. Early summer starts beat heat. Clarify Roseville ↔ Rocklin vs Roseville ↔ Auburn drive-time assumptions on the rate card.',
      cityKeywords: [
        'roseville',
        'rocklin',
        'loomis',
        'granite bay',
        'stanford ranch',
        'whitney ranch',
        'fiddyment',
      ],
    },
    {
      id: 'lincoln-growth',
      name: 'Lincoln & North / West Growth Edge',
      shortName: 'Lincoln',
      neighborhoods: [
        'Lincoln',
        'Lincoln Hills / village communities',
        'Twelve Bridges edge',
        'Newer west/north Lincoln tracts',
      ],
      housingTypes:
        'Master-planned villages, HOA SFH, active-adult communities, some multi-family',
      challenges: [
        'HOA COI and gate rules in planned villages',
        'Longer arterials to I-80 than Roseville core',
        'Growing inventory volume in newer builds',
      ],
      moverTips:
        'Collect village HOA packets early. Price Lincoln ↔ Roseville or Lincoln ↔ Auburn with honest arterial + freeway time — “nearby South Placer” can still be a long local on the clock.',
      cityKeywords: ['lincoln', 'twelve bridges', 'lincoln hills', 'lincoln ca'],
    },
    {
      id: 'auburn-foothills',
      name: 'Auburn Foothills & CA-49 Corridor',
      shortName: 'Auburn / Foothills',
      neighborhoods: [
        'Auburn',
        'North Auburn',
        'Old Town Auburn',
        'Highway 49 corridor',
        'Meadow Vista edge',
        'Canyon and hillside edges',
      ],
      housingTypes:
        'Foothill SFH, older downtown multi-unit, hillside and canyon homes, rural-edge lots',
      challenges: [
        'Elevation, grade, and limited truck turnaround',
        'Older downtown staging constraints',
        'Stronger winter risk than South Placer valley floor',
      ],
      moverTips:
        'Access-first: driveway grade and turnaround photos. Discuss weather contingency in winter. Auburn ↔ Roseville is a classic underquoted local — grade and I-80 time belong in writing.',
      cityKeywords: [
        'auburn',
        'north auburn',
        'old town auburn',
        'meadow vista',
        'highway 49',
        'auburn ca',
      ],
    },
    {
      id: 'tahoe-donner-edge',
      name: 'Tahoe / Donner Edge — Higher I-80 Approaches',
      shortName: 'Tahoe / Donner',
      neighborhoods: [
        'Colfax',
        'Weimar edge',
        'Gold Run / higher I-80 approaches',
        'Foresthill edge',
        'Donner / Tahoe-approach corridors',
      ],
      housingTypes:
        'Mountain and foothill SFH, cabin-style stock, rural driveways, limited multi-unit',
      challenges: [
        'Snow, ice, and chain-control season farther east',
        'Long deadhead and limited service density',
        'Narrow roads, canopy, and weather windows',
      ],
      moverTips:
        'Confirm vehicle capability and weather policy in writing. Prefer flexible winter dates. Sierra-edge ↔ Roseville is not a South Placer HOA job — price elevation and risk explicitly.',
      cityKeywords: [
        'colfax',
        'weimar',
        'foresthill',
        'gold run',
        'donner',
        'tahoe',
        'i-80 east',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Placer County',
    intro:
      'Compressed drivers — HOA soft costs on the growth collar, I-80/elevation time, and mountain weather risk.',
    drivers: [
      {
        title: 'I-80 / CA-65 / elevation cross-zone time',
        detail:
          'Roseville ↔ Auburn, Lincoln ↔ Rocklin peak arterials, or Donner-approach legs burn more clock than valley map miles. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs (Roseville, Rocklin, Lincoln)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'Foothill access & winter mountain capability',
        detail:
          'Grades, limited turnaround, snow/ice, and chain requirements farther east force delays or special equipment. Clarify weather policies before winter.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,500+',
        note: 'Higher with HOA windows or foothill long-carry',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$4,200+',
        note: 'HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / foothills / Donner edge)',
        value: '$2,400–$7,500+',
        note: 'Elevation pairs and mountain-access jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'South Placer heat, foothill winter, and metro-spillover calendars set operational risk.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Roseville, Rocklin, and Lincoln. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'South Placer summer heat',
        detail:
          'Valley-floor afternoons can be extreme. Prefer early starts, shaded staging, and heat-safe packing for electronics and sealed goods.',
      },
      {
        title: 'Foothill & Donner winter windows',
        detail:
          'Auburn and higher I-80 corridors can see freeze, storms, and chain controls. Build flexibility and written weather cancellation policies.',
      },
    ],
  },
  specialized: [
    {
      id: 'hoa-master-planned',
      title: 'HOA & master-planned community logistics',
      intro:
        'South Placer’s volume problem is planned-village paperwork and suburban growth demand — not capital-core elevators.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final.',
        'New-construction villages may have incomplete roads or temporary parking rules — confirm access the week of the move.',
        'Prefer early starts in summer heat on open suburban streets.',
        'Price South Placer arterial + I-80 pairs portal-to-portal (Roseville ↔ Rocklin ↔ Lincoln).',
      ],
    },
    {
      id: 'foothill-access',
      title: 'Auburn foothill & elevation access',
      intro:
        'Grade, turnaround, and wildland-adjacent edges need photos and contingency plans flat HOA lots may not.',
      bullets: [
        'Share driveway grade, road width, and turnaround photos before booking.',
        'Measure canopy clearance on rural foothill final approaches.',
        'Discuss fire-season awareness on canyon and WUI edges in writing.',
      ],
    },
    {
      id: 'i80-sac-freeflow',
      title: 'I-80 freeflow to Sacramento & mountain approaches',
      intro:
        'Collar pairs into Sacramento County and higher Donner legs are timed corridor jobs.',
      bullets: [
        'If either address is in Sacramento County, confirm whether local rate cards still apply across the line.',
        'Map peak commute timing — spillover demand fills Saturday slots first in South Placer.',
        'For Colfax / higher I-80 / Tahoe-approach legs, confirm weather policy and whether a mountain or distance schedule applies.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Placer County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then test I-80 commute and elevation weather for the address you want.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple districts (Roseville-area and Eureka Union feeders, Rocklin Unified, Loomis Union, Dry Creek, Western Placer / Lincoln, Auburn-area and Placer Union High pathways, and others). Match every listing to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'South Placer vs foothills',
            detail:
              'Growth pressure in Roseville/Rocklin/Lincoln differs from Auburn-area systems. Sierra College (Rocklin) shapes some campus-adjacent rental demand.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail:
              'Sutter Roseville and Kaiser Roseville dominate South Placer access; Sutter Auburn Faith and other foothill services cover higher elevations — map ER times at rush hour and in winter weather from your target neighborhood.',
          },
          {
            title: 'Sacramento specialty spillover',
            detail:
              'Some residents use Sacramento County specialty systems. Confirm insurer networks and realistic I-80 appointment drive times before choosing a foothill-only address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Placer County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Placer',
        href: 'https://www.placer.ca.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Roseville',
        href: 'https://www.roseville.ca.us/',
        external: true,
      },
      {
        label: 'City of Rocklin',
        href: 'https://www.rocklin.ca.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Roseville/Rocklin, Lincoln, Auburn/Foothills, Tahoe/Donner) when available. Confirm HOA/COI for South Placer, elevation photos for foothills, and weather contingency for Donner-edge pairs — not Sacramento County assumptions alone.',
  lastReviewed: '2026-07-24',
});
