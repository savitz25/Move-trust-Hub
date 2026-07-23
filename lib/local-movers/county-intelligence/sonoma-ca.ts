import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Sonoma County moving intelligence.
 * Used by /local-movers/california/sonoma and the shared intelligence template.
 *
 * Differentiators vs Napa / SF / Bay Area clones: Santa Rosa urban core vs
 * wine-country towns (Sonoma, Healdsburg, Sebastopol), tourism & harvest traffic,
 * rural/ag access, fire/smoke seasons — not a Napa or San Francisco script.
 */
export const sonomaCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'california',
  countySlug: 'sonoma',
  hubTitle: 'Sonoma County Moving Intelligence Hub',
  eyebrow: 'Sonoma County · Wine country & North Bay guide',
  h1: 'Moving in Sonoma County: Santa Rosa Core, Wine Towns, Fire Season & Zone Guide',
  heroOpener:
    'Sonoma County is not a Napa brochure or a San Francisco suburb with vineyards pasted on. Santa Rosa is a real urban–suburban core with multi-unit stock, school calendars, and freeway timing on US-101. A short drive away, Sonoma, Healdsburg, and Sebastopol run on tourism, tasting-room weekends, and harvest logistics that choke two-lane approaches. Rural and ag-edge properties add long driveways, low canopies, and equipment-shed inventories that city tracts never see. Fire and smoke seasons rewrite outdoor packing and can close roads overnight. This guide is for people moving in Sonoma County — wine-country character, North Bay weather, and Santa Rosa practicality — not generic Bay Area tips with “Sonoma” swapped in.',
  heroCredibility:
    'Santa Rosa vs wine towns · Harvest & tourism timing · Fire/smoke awareness · Intrastate CA (BHGS) · FMCSA when interstate · Curated listings',
  collapsibleDeepContent: true,
  sectionOrder: [
    'whatMakesDifferent',
    'zones',
    'costDrivers',
    'seasonal',
    'specialized',
    'relocation',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'What makes moving in Sonoma County different',
    intro:
      'These are the local realities that change estimates — Santa Rosa core vs wine-country towns, harvest and visitor traffic, rural access, and fire/smoke seasons.',
    bullets: [
      {
        title: 'Santa Rosa is a logistics product of its own',
        detail:
          'County seat density, multi-unit buildings, postwar tracts, and 101 interchanges are not the same job as a plaza-adjacent cottage in Sonoma or a gravel-drive ranch outside Healdsburg. Put both cities (or unincorporated pockets) in the estimate — “Sonoma County local” is too vague.',
      },
      {
        title: 'Wine-country towns run on tourism calendars',
        detail:
          'Sonoma Plaza, Healdsburg square, Sebastopol corridors, and tasting-room routes fill with visitors on weekends and festival weeks. Staging, curb space, and two-lane approaches get harder exactly when residential movers want Saturday slots. Mid-week mornings often win in tourist cores.',
      },
      {
        title: 'Harvest pressure is real (late summer – fall)',
        detail:
          'Crush season brings ag trucks, temporary labor housing turnover, and congested farm-adjacent roads. Rural-edge and vineyard-adjacent moves share pavement with harvest equipment. Build buffer when either address sits near active ag corridors.',
      },
      {
        title: 'Rural / ag access vs city neighborhoods',
        detail:
          'Long driveways, soft shoulders, low oak canopies, gates, and outbuildings are common outside Santa Rosa and Rohnert Park. City blocks may instead mean tight parking and elevator COIs. Share driveway photos and outbuilding inventory on the survey.',
      },
      {
        title: 'Fire and smoke seasons change the job',
        detail:
          'Wildfire risk and poor air-quality days affect hillside, wildland-urban interface, and sometimes entire corridors. Crews may delay outdoor packing, require N95/smoke plans, or reschedule when roads or air quality make work unsafe. Ask about weather and air-quality contingency before peak fire season.',
      },
      {
        title: 'US-101 is the spine — side roads are the bottleneck',
        detail:
          '101 links Petaluma, Rohnert Park, Santa Rosa, Windsor, and Healdsburg approaches. East–west and plaza-town pairs often leave the freeway for narrow, tourist-heavy local roads that burn more clock than map miles suggest. Ask how portal-to-portal time is priced.',
      },
      {
        title: 'Coastal edge vs inland valley microclimates',
        detail:
          'Bodega Bay and coastal edges bring fog, wind, and salt air; inland Santa Rosa and Alexander Valley afternoons run hotter and drier. Packing and floor protection should match the microclimate — note coastal vs inland on the survey.',
      },
      {
        title: 'California intrastate rules (BHGS) + FMCSA when interstate',
        detail:
          'Moves entirely within California are generally overseen by the California Bureau of Household Goods and Services (BHGS). Interstate legs (e.g. Santa Rosa → out-of-state) need FMCSA authority. Confirm which license applies to your exact origin and destination before deposit.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and traffic problem. Santa Rosa multi-unit, wine-town plazas, Petaluma approaches, and rural ag edges are not interchangeable — and harvest or fire season rewrites “local.”',
  zones: [
    {
      id: 'santa-rosa-core',
      name: 'Santa Rosa Core & Mid-County Hub',
      shortName: 'Santa Rosa',
      neighborhoods: [
        'Downtown Santa Rosa',
        'Railroad Square',
        'Bennett Valley edge',
        'Rincon Valley',
        'Roseland',
        'Montgomery Village area',
        'Fountaingrove edge',
      ],
      housingTypes:
        'Multi-unit and condos, mid-century SFH, denser grid stock, hillside edges, some HOA tracts',
      challenges: [
        'Elevator COI and reserved move windows in multi-unit buildings',
        'US-101 / local arterial congestion at peak',
        'Hillside and Fountaingrove-edge access after past fire rebuild patterns',
        'School-calendar and end-of-month lease volume',
      ],
      moverTips:
        'Send building rules + COI early for downtown and multi-unit. Prefer mid-week mornings over 101 peaks. Share hillside driveway photos for Fountaingrove and canyon-edge homes. Treat Santa Rosa ↔ Sonoma or Santa Rosa ↔ Healdsburg as timed locals, not map-mile quotes.',
      cityKeywords: [
        'santa rosa',
        'railroad square',
        'bennett valley',
        'rincon valley',
        'roseland',
        'fountaingrove',
        'montgomery village',
      ],
    },
    {
      id: 'sonoma-valley',
      name: 'Sonoma Valley — Plaza Town & Valley Floor',
      shortName: 'Sonoma Valley',
      neighborhoods: [
        'City of Sonoma',
        'Sonoma Plaza area',
        'Boyes Hot Springs',
        'El Verano',
        'Glen Ellen edge',
        'Kenwood edge',
      ],
      housingTypes:
        'Historic SFH, plaza-adjacent cottages, valley-floor homes, some multi-unit, rural-edge lots toward Glen Ellen',
      challenges: [
        'Tourism weekend congestion around the Plaza and Hwy 12',
        'Limited staging on historic and narrow streets',
        'Harvest and event traffic on valley roads',
        'Fire-season awareness on wildland-adjacent edges',
      ],
      moverTips:
        'Avoid peak tourist Saturdays when flexible — mid-week mornings stage cleaner near the Plaza. Confirm parking and long-carry assumptions on historic blocks. Glen Ellen / Kenwood edges need access photos and fire-season contingency.',
      cityKeywords: [
        'sonoma',
        'boyes hot springs',
        'el verano',
        'glen ellen',
        'kenwood',
        'sonoma valley',
        'plaza',
      ],
    },
    {
      id: 'healdsburg-north',
      name: 'Healdsburg, Windsor & North County Wine Towns',
      shortName: 'Healdsburg / North',
      neighborhoods: [
        'Healdsburg',
        'Windsor',
        'Geyserville edge',
        'Alexander Valley edge',
        'Dry Creek area',
      ],
      housingTypes:
        'Town-center SFH and cottages, newer Windsor tracts, vineyard-adjacent estates, rural driveways',
      challenges: [
        'Square and tasting-room weekend visitor traffic (Healdsburg)',
        'Narrow approaches and long carries in older town core',
        'Ag and harvest truck mix on valley roads',
        'Longer deadhead from Santa Rosa crews for far-north pockets',
      ],
      moverTips:
        'Book Healdsburg mid-week when possible. Flag vineyard-adjacent or gravel access on the survey. Windsor planned tracts may need HOA COI — collect packets early. Price north-county pairs with honest 101 + local-road time.',
      cityKeywords: [
        'healdsburg',
        'windsor',
        'geyserville',
        'alexander valley',
        'dry creek',
      ],
    },
    {
      id: 'sebastopol-west',
      name: 'Sebastopol, West County & Coastal Approaches',
      shortName: 'Sebastopol / West',
      neighborhoods: [
        'Sebastopol',
        'Graton',
        'Forestville edge',
        'Occidental edge',
        'Bodega Bay edge',
        'West County rural pockets',
      ],
      housingTypes:
        'West County SFH, rural-edge and orchard lots, small-town cores, coastal cottages toward Bodega',
      challenges: [
        'Two-lane west-county roads and limited turnaround',
        'Fog, wind, and salt air on coastal edges',
        'Tourism and weekend traffic through Sebastopol corridors',
        'Soft shoulders and canopy clearance on rural drives',
      ],
      moverTips:
        'Treat west county as access-first: road width, gates, and canopy photos matter. Coastal jobs need wind-aware packing. Sebastopol ↔ Santa Rosa is a short distance that still pays for two-lane delay — price portal-to-portal.',
      cityKeywords: [
        'sebastopol',
        'graton',
        'forestville',
        'occidental',
        'bodega bay',
        'bodega',
        'west county',
      ],
    },
    {
      id: 'petaluma-south',
      name: 'Petaluma, Rohnert Park & South County',
      shortName: 'Petaluma / South',
      neighborhoods: [
        'Petaluma',
        'Rohnert Park',
        'Cotati',
        'Penngrove',
        'Petaluma downtown / river area',
      ],
      housingTypes:
        'Historic Petaluma SFH and multi-unit, suburban Rohnert Park tracts, HOA pockets, some ranch-edge lots',
      challenges: [
        '101 congestion toward Marin and Santa Rosa',
        'Historic downtown Petaluma staging limits',
        'HOA rules in parts of Rohnert Park',
        'Spillover timing from Bay Area / North Bay commute patterns',
      ],
      moverTips:
        'Downtown Petaluma benefits from early weekday starts. Collect HOA packets for Rohnert Park tracts. Petaluma ↔ Santa Rosa or Petaluma ↔ Marin-edge pairs need honest 101 ETAs — not brochure minutes.',
      cityKeywords: [
        'petaluma',
        'rohnert park',
        'cotati',
        'penngrove',
      ],
    },
    {
      id: 'rural-ag-edge',
      name: 'Rural, Ag-Edge & Unincorporated Pockets',
      shortName: 'Rural / Ag',
      neighborhoods: [
        'Unincorporated Sonoma County',
        'Vineyard-adjacent parcels',
        'Ranch and orchard edges',
        'Hillside WUI pockets',
        'Long-driveway rural homes',
      ],
      housingTypes:
        'Ranch homes, vineyard estates, ADUs and outbuildings, gravel-drive properties, limited multi-unit',
      challenges: [
        'Long carries, soft ground, and limited truck turnaround',
        'Gates, low branches, and unpaved final approaches',
        'Harvest equipment sharing narrow roads',
        'Fire-season road and smoke risk on WUI parcels',
      ],
      moverTips:
        'Inventory outbuildings and note ground conditions. Measure driveway width and turnaround before dispatching a full-size truck. Discuss shuttle options and fire/smoke contingency in writing for wildland-urban interface addresses.',
      cityKeywords: [
        'unincorporated',
        'vineyard',
        'ranch',
        'rural sonoma',
        'ag',
        'orchard',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Sonoma County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on plaza-town tourism timing, rural access, fire-season risk, and whether the pair stays in Santa Rosa or crosses wine-country two-lanes.',
    drivers: [
      {
        title: 'Cross-zone & 101 / two-lane time',
        detail:
          'Santa Rosa ↔ Sonoma, Petaluma ↔ Healdsburg, or west-county pairs can burn far more clock than freeway miles suggest — especially on tourist weekends and harvest days. Hourly billing follows the clock.',
      },
      {
        title: 'Tourism & harvest staging friction',
        detail:
          'Plaza towns and tasting-room corridors lose curb space on peak weekends. Soft costs show up as longer carries, delayed starts, or forced mid-week windows.',
      },
      {
        title: 'Rural / ag access & shuttles',
        detail:
          'Long driveways, soft shoulders, and canopy limits may need smaller trucks or shuttles. Ask for shuttle and long-carry fees in writing before move day.',
      },
      {
        title: 'Hillside & WUI access',
        detail:
          'Limited turnaround and fire-rebuild or hillside streets add labor hours fast — access photos prevent underquotes.',
      },
      {
        title: 'Fire / smoke contingency risk',
        detail:
          'Red-flag, closure, and poor air-quality days can force reschedules. Clarify cancellation and weather/air policies before peak fire season.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,600+',
        note: 'Higher with elevators, plaza staging, or rural long-carry',
      },
      {
        label: '2–3BR house / town or tract',
        value: '$1,600–$4,400+',
        note: 'Tourism delays and cross-valley hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / rural / hillside)',
        value: '$2,600–$7,500+',
        note: 'Ag-edge access and wine-town peak weekends price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$200+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, harvest, tourism & fire intelligence',
    intro:
      'Sonoma weather is often mild compared with inland valleys — school calendars, visitor peaks, harvest traffic, and fire/smoke seasons set the real operational risk.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Santa Rosa, Rohnert Park, and Petaluma. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Tourism peaks (weekends, festivals, summer–fall)',
        detail:
          'Sonoma, Healdsburg, and Sebastopol corridors tighten for visitors. Prefer mid-week mornings for plaza-adjacent and tasting-room-route addresses.',
      },
      {
        title: 'Harvest / crush season (typically late summer – fall)',
        detail:
          'Ag trucks and rural-road congestion increase. Build buffer for vineyard-adjacent and west/north valley moves; share flexible dates when possible.',
      },
      {
        title: 'Fire season & smoke windows (variable; often summer – fall)',
        detail:
          'Wildfire risk and air-quality events can restrict outdoor packing and close roads. Build schedule flexibility for hillside, WUI, and sometimes countywide poor-air days.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around multi-unit COI windows and tourism calendars. Avoid last Friday/Saturday of the month when leases collide — and check fire/air forecasts in season.',
      },
    ],
  },
  specialized: [
    {
      id: 'wine-country-tourism',
      title: 'Wine-country towns, tourism & harvest logistics',
      intro:
        'Sonoma County’s defining move problem is often plaza-town and harvest timing — not just miles on 101.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that leaves Santa Rosa for Sonoma, Healdsburg, Sebastopol, or west-county two-lanes.',
        'Prefer mid-week mornings for Plaza, square, and tasting-room corridor addresses when HOA or lease windows allow.',
        'Flag festival weeks and major visitor weekends so crews do not plan curb staging that will not exist.',
        'Harvest-season rural addresses should note ag-road adjacency so crews build freight-traffic buffer.',
        'If the job is vineyard-adjacent or estate-scale, inventory outbuildings and note soft-ground or canopy constraints early.',
      ],
    },
    {
      id: 'fire-smoke-rural',
      title: 'Fire season, smoke & rural / ag access module',
      intro:
        'Wildland-urban interface, hillside rebuild edges, and rural driveways need weather, air-quality, and truck-access plans that flat Santa Rosa tracts may not.',
      bullets: [
        'Share driveway, road-width, gate, and turnaround photos for rural and hillside homes before booking.',
        'Ask about red-flag, road-closure, and poor air-quality reschedule policies in writing.',
        'Secure outdoor packing plans — tarps, smoke limits, and when crews will pause work.',
        'During active fire incidents, expect road closures and smoke delays; flexibility beats rigid Saturday-only plans.',
        'Measure canopy clearance and final-approach surface before a full-size truck is dispatched to ag-edge parcels.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Sonoma County?',
    intro:
      'Santa Rosa practicality, wine-town character, west-county rural life, and south-county North Bay access are different bets — pick the pocket first, then validate schools, healthcare, fire insurance, and commute tolerance on 101.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Sonoma County uses multiple districts (e.g., Santa Rosa City Schools and elementary feeders, Petaluma, Sonoma Valley Unified, Healdsburg, Windsor, Sebastopol-area districts, Cotati-Rohnert Park, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and the California School Dashboard. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Core vs wine towns vs west county',
            detail:
              'Enrollment pressures, program offerings, and bus patterns differ by pocket — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state dashboard data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Santa Rosa Junior College and other campuses shape local rental demand and traffic near campus-adjacent areas — useful for student and staff households.',
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
              'Providence / Santa Rosa Memorial and other Santa Rosa campuses, Petaluma Valley, Sonoma Valley Hospital, and Healdsburg-area services cover different pockets — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Specialty care spillover',
            detail:
              'Some residents travel toward Marin or the broader Bay Area for specialty care. Confirm insurer networks and realistic appointment drive times on 101.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer and harvest move chaos.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder by pocket',
            detail:
              'Santa Rosa and Rohnert Park often price differently from Sonoma Plaza-adjacent stock, Healdsburg, west-county rural, or coastal edges. Compare total monthly costs, not sticker price alone.',
          },
          {
            title: 'Stock variety',
            detail:
              'Multi-unit cores, historic town homes, suburban tracts, vineyard-edge estates, and coastal cottages — insurance, HOA dues, and access rules vary widely.',
          },
          {
            title: 'Wildfire & insurance awareness',
            detail:
              'Hillside and wildland-urban interface parcels can face higher insurance scrutiny and rebuild-era rules. Factor insurance availability and cost into WUI and canyon-edge searches.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Urban–suburban hub',
            detail:
              'Santa Rosa for services, employment density, and more varied housing stock — with 101 timing and multi-unit move rules.',
          },
          {
            title: 'Wine-country town life',
            detail:
              'Sonoma, Healdsburg, and Sebastopol for plaza character and visitor-economy energy — with tourism staging tradeoffs on move day.',
          },
          {
            title: 'South county / North Bay access',
            detail:
              'Petaluma, Cotati, and Rohnert Park for relatively easier Bay Area / 101 connectivity and suburban layouts.',
          },
          {
            title: 'West county & coastal edge',
            detail:
              'Sebastopol-to-coast pockets for rural and ocean-adjacent lifestyle — with two-lane access, fog, and wind awareness.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute',
        bullets: [
          {
            title: 'Local anchors',
            detail:
              'Healthcare, education, wine and hospitality, agriculture and food/beverage, retail, public sector, and professional services centered heavily on Santa Rosa.',
          },
          {
            title: '101 corridor patterns',
            detail:
              'Many households commute along 101 between south county, Santa Rosa, and toward Marin / Bay Area employment. Peak times should drive housing choice more than brochure distance.',
          },
          {
            title: 'Hospitality & seasonal work',
            detail:
              'Wine, tourism, and harvest seasons create cyclical staffing and housing turnover — useful context if your household ties to those industries.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Coast vs inland microclimates',
            detail:
              'Marine influence and fog on western and coastal edges vs warmer, drier inland valley afternoons around Santa Rosa and north-county valleys.',
          },
          {
            title: 'Outdoors & visitor economy',
            detail:
              'Wine country, coast, redwoods approaches, and outdoor recreation are major draws; weekend visitor traffic affects town-core staging.',
          },
          {
            title: 'Seasonal risk literacy',
            detail:
              'Fire and smoke seasons are part of living here for many hillside and rural households — emergency kits, evacuation routes, and insurance reviews belong in relocation planning, not after move-in.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Sonoma County resources',
    intro:
      'Official links and licensing notes — parking, fire restrictions, and city rules change; verify before move day.',
    items: [
      {
        label: 'County of Sonoma',
        href: 'https://sonomacounty.ca.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Santa Rosa',
        href: 'https://www.srcity.org/',
        external: true,
      },
      {
        label: 'City of Petaluma',
        href: 'https://cityofpetaluma.org/',
        external: true,
      },
      {
        label: 'City of Sonoma',
        href: 'https://www.sonomacity.org/',
        external: true,
      },
      {
        label: 'City of Healdsburg',
        href: 'https://www.ci.healdsburg.ca.us/',
        external: true,
      },
      {
        label: 'City of Sebastopol',
        href: 'https://www.ci.sebastopol.ca.us/',
        external: true,
      },
      {
        label: 'City of Rohnert Park',
        href: 'https://www.rpcity.org/',
        external: true,
      },
      {
        label: 'CAL FIRE — incident & readiness information',
        href: 'https://www.fire.ca.gov/',
        note: 'Check fire conditions during wildfire season',
        external: true,
      },
      {
        label: 'Air quality — Bay Area / regional context',
        href: 'https://www.airnow.gov/',
        note: 'Smoke and air-quality checks for move planning',
        external: true,
      },
      {
        label: 'CA BHGS — household movers (intrastate)',
        href: 'https://bhgs.dca.ca.gov/',
        note: 'California Bureau of Household Goods and Services',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'PG&E — utility service check',
        href: 'https://www.pge.com/',
        note: 'Electric/gas for much of the county — confirm by address',
        external: true,
      },
      {
        label: 'Move Trust Hub — verify a USDOT',
        href: '/verify-dot',
        note: 'Cross-check interstate licensing before deposits',
      },
      {
        label: 'Free moving calculator',
        href: '/moving-calculator',
        note: 'Inventory-based volume for local or long-distance',
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Santa Rosa, Sonoma Valley, Healdsburg/North, Sebastopol/West, Petaluma/South, Rural/Ag) when available. Confirm tourism/harvest timing, rural access photos, and fire/smoke contingency — especially for plaza towns and WUI pairs.',
  lastReviewed: '2026-07-23',
};
