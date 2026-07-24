import {
  finalizeCaTier2Pack,
  CA_TIER2_BHGS_BULLET,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * El Dorado County — California Tier 2 (El Dorado Hills–Placerville foothill collar).
 * Parent: Sacramento County Tier 1 (+ Placer contrast). Not a capital-core or South Placer clone.
 */
export const elDoradoCountyIntelligence = finalizeCaTier2Pack({
  countySlug: 'el-dorado',
  hubTitle: 'El Dorado County Moving Intelligence Hub',
  eyebrow: 'El Dorado County · Sacramento foothill collar · US-50 spine',
  h1: 'Moving in El Dorado County: El Dorado Hills–Placerville Foothill Collar & US-50 Logistics',
  heroOpener:
    'El Dorado County is the Sacramento metro foothill collar on US-50 — El Dorado Hills master-planned suburbs, Cameron Park / Shingle Springs mid-elevation stock, Placerville and CA-49 gold-country grids, and higher Sierra approaches toward South Lake Tahoe. It is not Midtown elevators with a different ZIP, and it is not Roseville/Rocklin on I-80 with the names swapped. Foothill grades, HOA villages, seasonal snow and chain risk higher on the corridor, and US-50 commute timing to the capital floor define the product. Quote the pocket: planned hills community, Placerville downtown, or mountain-edge corridor — never “El Dorado County local” alone.',
  heroCredibility:
    'Sacramento foothill collar · US-50 / CA-49 · HOA + grade access · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'US-50 · CA-49 · I-80 approaches · CA-193',
  parentCompare: {
    parentLabel: 'Sacramento County',
    parentHref: '/local-movers/california/sacramento',
    title: 'How El Dorado County differs from Sacramento County (and Placer)',
    intro:
      'El Dorado is the US-50 foothill collar east of the capital region — planned hills suburbs and elevation edges, not capital-grid density. Placer is the sibling I-80 growth collar (Roseville/Rocklin/Auburn); do not import South Placer arterial assumptions onto El Dorado Hills grades or Placerville two-lanes.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'US-50 is the spine from El Dorado Hills through Placerville toward higher Sierra approaches; CA-49 and CA-193 serve gold-country and mid-county pockets; I-80 is a north-edge approach via Placer, not the daily county spine. El Dorado Hills ↔ downtown Sacramento is a metro-timing local; Hills ↔ Placerville adds grade and two-lane clock; Tahoe-edge legs are mountain-adjacent — not capital grid miles.',
      },
      {
        title: 'Housing differences',
        detail:
          'Master-planned HOA villages in El Dorado Hills, mid-elevation Cameron Park / Shingle Springs tracts, older Placerville multi-unit and hillside SFH, and Sierra-edge stock replace many Sacramento pocket types (grid multi-unit, river-adjacent flats). Versus Placer: more US-50 grade product and gold-country cores, less CA-65 Lincoln-style valley growth.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Gate lists, COI, approved hours, and floor-protection rules are the El Dorado Hills default. Foothill grades, limited turnarounds, and Placerville historic staging replace flat capital arterials. Incomplete builder roads in newer villages add day-of risk Sac crews may not price.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone Hills HOA jobs can look suburban-simple until soft costs and heat hit. Cross-elevation pairs (valley-edge ↔ Placerville or Tahoe approaches) and winter capability raise the bill above flat Sacramento County locals of similar square footage.',
      },
      {
        title: 'Market role',
        detail:
          'Sacramento foothill collar: inbound volume tracks El Dorado Hills inventory and metro spillover, with a Placerville gold-country and Sierra secondary product. Popular routes bias to Sacramento County and Placer secondaries — not a capital-only or pure South Placer rate card.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in El Dorado County different',
    intro:
      'Collar-market realities — US-50 foothill grades, master-planned HOAs, seasonal higher-elevation access, and California licensing.',
    bullets: [
      {
        title: 'El Dorado Hills is HOA-first, grade-aware product',
        detail:
          'Master-planned villages require Certificates of Insurance, gate lists, and approved hours — plus driveway photos on hillside lots. Treat the HOA packet and access survey as one job, not paperwork after the fact.',
      },
      {
        title: 'US-50 freeflow to Sacramento is still clock time',
        detail:
          'Many households pair addresses with Sacramento County. Peak US-50 and El Dorado Hills arterial delays are billable. Ask how portal-to-portal time is priced across the county line.',
      },
      {
        title: 'Placerville & CA-49 are not Hills cul-de-sacs',
        detail:
          'Older downtown grids, hillside approaches, and gold-country staging rewrite truck length and carry distance. Hills ↔ Placerville is a classic underquoted local when grade is ignored.',
      },
      {
        title: 'Seasonal access: summer heat vs higher-elevation winter',
        detail:
          'Hills and mid-county afternoons can run hot; higher US-50 and Tahoe-approach corridors add freeze, storms, and chain controls. Start times and contingency language should match the elevation of each address.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesIntro:
    'Four sharp zones — El Dorado Hills growth core, Cameron Park / Shingle Springs mid-elevation belt, Placerville / CA-49 gold country, and higher US-50 / Tahoe approaches. Elevation and HOA rules define the job more than generic Sacramento tips.',
  zones: [
    {
      id: 'el-dorado-hills',
      name: 'El Dorado Hills — Master-Planned Foothill Core',
      shortName: 'El Dorado Hills',
      neighborhoods: [
        'El Dorado Hills village cores',
        'Serrano / planned communities',
        'Bass Lake edge',
        'Latrobe / west Hills approaches',
        'US-50 corridor commercial edge',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, multi-family, hillside lots with grade driveways',
      challenges: [
        'HOA COI, gate lists, and approved move hours',
        'Hillside grade and limited truck turnaround',
        'US-50 peak congestion toward Sacramento',
      ],
      moverTips:
        'Collect HOA packets before booking. Share driveway grade photos. Early summer starts beat heat. Clarify Hills ↔ Sacramento vs Hills ↔ Placerville drive-time assumptions on the rate card.',
      cityKeywords: [
        'el dorado hills',
        'serrano',
        'bass lake',
        'latrobe',
        'el dorado hills ca',
      ],
    },
    {
      id: 'cameron-shingle',
      name: 'Cameron Park, Shingle Springs & Mid-Elevation Belt',
      shortName: 'Cameron / Shingle',
      neighborhoods: [
        'Cameron Park',
        'Shingle Springs',
        'Rescue edge',
        'Cameron Park lake / village pockets',
        'US-50 mid-county commercial nodes',
      ],
      housingTypes:
        'Suburban SFH, HOA pockets, mid-elevation tracts, some multi-family and rural-edge lots',
      challenges: [
        'US-50 corridor timing between Hills and Placerville',
        'Mixed HOA and older-access stock',
        'Longer local hauls than map miles suggest at peak',
      ],
      moverTips:
        'Price Cameron Park ↔ El Dorado Hills or ↔ Placerville with honest US-50 portal time. Confirm HOA rules where planned stock applies. Do not treat mid-county as “same as Hills” without access photos.',
      cityKeywords: [
        'cameron park',
        'shingle springs',
        'rescue',
        'cameron park ca',
      ],
    },
    {
      id: 'placerville-49',
      name: 'Placerville, Diamond Springs & CA-49 Gold Country',
      shortName: 'Placerville / 49',
      neighborhoods: [
        'Placerville',
        'Downtown / Main Street Placerville',
        'Diamond Springs',
        'Highway 49 corridor',
        'Coloma edge',
        'Hillside and canyon edges',
      ],
      housingTypes:
        'Older downtown multi-unit, foothill SFH, hillside homes, rural-edge lots',
      challenges: [
        'Historic downtown staging limits and tight streets',
        'Elevation, grade, and limited turnaround',
        'Stronger winter risk than western valley-edge floor',
      ],
      moverTips:
        'Access-first: street width, driveway grade, and turnaround photos. Discuss weather contingency in winter. Placerville ↔ El Dorado Hills is a cross-elevation local — grade and US-50 time belong in writing.',
      cityKeywords: [
        'placerville',
        'diamond springs',
        'coloma',
        'highway 49',
        'placerville ca',
      ],
    },
    {
      id: 'tahoe-us50-edge',
      name: 'Higher US-50 & Tahoe Approaches',
      shortName: 'Tahoe / Higher 50',
      neighborhoods: [
        'Pollock Pines',
        'Camino edge',
        'Kyburz / higher US-50 approaches',
        'South Lake Tahoe edge corridors',
        'Sierra canyon and mountain-edge pockets',
      ],
      housingTypes:
        'Mountain and foothill SFH, cabin-style stock, rural driveways, limited multi-unit',
      challenges: [
        'Snow, ice, and chain-control season farther east',
        'Long deadhead and limited service density',
        'Narrow roads, canopy, and weather windows',
      ],
      moverTips:
        'Confirm vehicle capability and weather policy in writing. Prefer flexible winter dates. Sierra-edge ↔ El Dorado Hills is not a master-planned HOA job — price elevation and risk explicitly.',
      cityKeywords: [
        'pollock pines',
        'camino',
        'kyburz',
        'south lake tahoe',
        'us-50 east',
        'tahoe',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside El Dorado County',
    intro:
      'Compressed drivers — HOA soft costs on the Hills collar, US-50/elevation time, and mountain weather risk.',
    drivers: [
      {
        title: 'US-50 / elevation cross-zone time',
        detail:
          'El Dorado Hills ↔ Placerville, mid-county peak arterials, or Tahoe-approach legs burn more clock than valley map miles. Hourly billing follows the clock.',
      },
      {
        title: 'HOA soft costs (El Dorado Hills & planned pockets)',
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
        label: '3–4+ BR (cross-zone / foothills / Tahoe edge)',
        value: '$2,400–$7,500+',
        note: 'Elevation pairs and mountain-access jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'Hills heat, foothill winter, and metro-spillover calendars set operational risk.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across El Dorado Hills and mid-county. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'Foothill summer heat on open suburban staging',
        detail:
          'Western and mid-elevation afternoons can run hot. Prefer early starts, shaded staging, and heat-safe packing for electronics and sealed goods.',
      },
      {
        title: 'Higher US-50 & Tahoe winter windows',
        detail:
          'Placerville edges and higher US-50 corridors can see freeze, storms, and chain controls. Build flexibility and written weather cancellation policies.',
      },
    ],
  },
  specialized: [
    {
      id: 'hoa-foothill-planned',
      title: 'HOA & master-planned foothill logistics',
      intro:
        'El Dorado Hills volume is planned-village paperwork plus hillside access — not capital-core elevators.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final.',
        'Share driveway grade and turnaround photos on hillside lots.',
        'New-construction villages may have incomplete roads or temporary parking rules — confirm access the week of the move.',
        'Prefer early starts in summer heat on open suburban streets.',
      ],
    },
    {
      id: 'foothill-grade-access',
      title: 'Foothill grade & gold-country access',
      intro:
        'Placerville, Diamond Springs, and canyon edges need photos and contingency plans flat valley lots may not.',
      bullets: [
        'Share driveway grade, road width, and turnaround photos before booking.',
        'Measure canopy clearance on rural foothill final approaches.',
        'Discuss fire-season awareness on canyon and WUI edges in writing.',
      ],
    },
    {
      id: 'us50-sac-seasonal',
      title: 'US-50 freeflow to Sacramento & seasonal higher-elevation access',
      intro:
        'Collar pairs into Sacramento County and higher Tahoe legs are timed corridor jobs with seasonal risk.',
      bullets: [
        'If either address is in Sacramento County, confirm whether local rate cards still apply across the line.',
        'Map peak commute timing — spillover demand fills Saturday slots first in El Dorado Hills.',
        'For Pollock Pines / higher US-50 / Tahoe-approach legs, confirm weather policy and whether a mountain or distance schedule applies.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to El Dorado County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then test US-50 commute and elevation weather for the address you want.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple systems (Buckeye Union and other El Dorado Hills feeders, Rescue Union, Camino Union, Placerville-area and El Dorado Union High pathways, Lake Tahoe Unified edges, and others). Match every listing to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Hills vs Placerville vs higher elevation',
            detail:
              'Growth pressure in El Dorado Hills differs from Placerville-area and Tahoe-edge systems. Do not treat county averages as neighborhood truth.',
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
              'Marshall Medical Center (Placerville) and other mid-county services cover much of the foothill spine; western Hills residents often use Sacramento County systems at rush hour — map ER times from your target neighborhood.',
          },
          {
            title: 'Sacramento specialty spillover',
            detail:
              'Some residents use Sacramento County specialty systems. Confirm insurer networks and realistic US-50 appointment drive times before choosing a higher-elevation-only address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful El Dorado County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of El Dorado',
        href: 'https://www.edcgov.us/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Placerville',
        href: 'https://www.cityofplacerville.org/',
        external: true,
      },
      {
        label: 'El Dorado Hills CSD (community services)',
        href: 'https://www.edhcsd.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (El Dorado Hills, Cameron/Shingle, Placerville/49, Tahoe/Higher 50) when available. Confirm HOA/COI for Hills, grade photos for foothills, and weather contingency for higher US-50 pairs — not Sacramento County or South Placer assumptions alone.',
  lastReviewed: '2026-07-24',
});
