import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Yuma County, Arizona moving intelligence.
 * Differentiators: border-adjacent metro, winter agriculture and snowbird cycles,
 * extreme summer heat — NOT high-country elevation or northwest dispersed-highway packs.
 */
export const yumaCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'arizona',
  countySlug: 'yuma',
  hubTitle: 'Yuma County Moving Intelligence Hub',
  eyebrow: 'Yuma County · Border-adjacent, ag & snowbird cycles',
  h1: 'Moving in Yuma County: Border Metro, Winter Ag/Snowbird Cycles & Extreme Heat',
  heroOpener:
    'Yuma County is not a Phoenix suburb and not a mountain town. It is a border-adjacent desert metro where extreme summer heat, winter agriculture labor and produce logistics, and large snowbird / seasonal population swings rewrite calendars and housing turnover. Cross-border and cross-state patterns (California Imperial Valley edges, Mexico adjacency) appear in daily life even when a household goods truck stays on the U.S. side. A “local” move can mean a central Yuma multi-family pack-out in July heat or a winter park model shuffle when seasonal residents arrive. This guide is for people actually moving in Yuma County — border-metro heat, ag-season and snowbird timing, and valley-floor access — not a recycled high-country or northwest Arizona pack.',
  heroCredibility:
    'Arizona Corporation Commission (ACC) entity verification · FMCSA USDOT for interstate legs · Border-adjacent heat & seasonal cycles · Curated directory listings',
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
    title: 'What makes moving in Yuma County different',
    intro:
      'Border-metro geography, extreme summer heat, and winter ag/snowbird population swings define estimates here — not elevation climate or continuous Valley HOA sprawl.',
    bullets: [
      {
        title: 'Border-adjacent logistics mindset',
        detail:
          'Port-of-entry timing, binational family and commerce patterns, and California desert edges shape traffic and sometimes destination mix. Even all-Arizona moves can feel “edge of the map” compared with interior metros — name exact addresses and any CA destination early.',
      },
      {
        title: 'Extreme summer heat is non-negotiable',
        detail:
          'Yuma-area summers rank among the hottest in the United States. Afternoon outdoor packing can be unsafe; dawn starts, hydration plans, and electronics protection are operational requirements from late spring through early fall.',
      },
      {
        title: 'Winter ag and produce cycles move people and congestion',
        detail:
          'Agricultural seasons bring labor housing turnover, freight on farm-to-market routes, and different weekday traffic than summer’s quieter heat. Estimates should ask which season the move falls in.',
      },
      {
        title: 'Snowbird and seasonal housing rewrite winter demand',
        detail:
          'Parks, resorts, and seasonal communities fill in cooler months. Move-in/move-out clusters, park rules, and partial loads are common — not a year-round suburban lease curve alone.',
      },
      {
        title: 'Military and federal presence adds PCS waves',
        detail:
          'Yuma-area installations and federal activity create short-notice and peak-window demand that competes with civilian snowbird calendars.',
      },
      {
        title: 'Valley-floor parks and older grids need access plans',
        detail:
          'Manufactured-home parks, irrigation-adjacent parcels, and tight multi-family staging differ from new-tract HOA jobs. Share park maps and truck-height limits.',
      },
      {
        title: 'Interstate and cross-border-adjacent legs appear often',
        detail:
          'Moves into California’s Imperial Valley or longer hauls toward Phoenix/Tucson need realistic transit and, when state lines cross, FMCSA authority checks.',
      },
      {
        title: 'ACC entity checks + FMCSA when interstate',
        detail:
          'Arizona does not run a separate statewide household-goods mover license program like some states. Verify business entity status via the Arizona Corporation Commission (ACC), and confirm active FMCSA USDOT (and usually MC) authority for interstate legs. Do not treat ACC registration as a household-goods operating license.',
      },
    ],
  },
  zonesHeading: 'Yuma County zones: metro core, south valley, east growth & seasonal parks',
  zonesIntro:
    'Plan by central Yuma, Foothills / east growth, south county ag edges, Somerton / San Luis corridor, and seasonal park communities — heat is shared; access and calendars are not.',
  zones: [
    {
      id: 'yuma-central',
      name: 'Central Yuma & historic / multi-family core',
      shortName: 'Central Yuma',
      neighborhoods: [
        'Central Yuma residential',
        'Historic and older grid streets',
        'Multi-family lease corridors',
        'Medical and service-adjacent pockets',
        'In-town commercial-edge housing',
      ],
      housingTypes:
        'Older SFH, apartments, duplexes, some redevelopment product',
      challenges: [
        'Limited curb staging on older streets',
        'Elevator/COI rules in multi-unit buildings',
        'Extreme heat on asphalt staging',
        'Peak commute and seasonal traffic',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week dawn freight windows in summer. Share stair and truck-height photos for older multi-unit.',
      cityKeywords: [
        'yuma',
        'downtown yuma',
        'central yuma',
        'historic yuma',
      ],
    },
    {
      id: 'foothills-east',
      name: 'Foothills, east Yuma growth & newer tracts',
      shortName: 'Foothills / East',
      neighborhoods: [
        'Yuma Foothills',
        'East corridor growth',
        'Planned and semi-planned tracts',
        'Larger-lot desert edges',
        'HOA communities',
      ],
      housingTypes:
        'Suburban SFH, HOA tracts, some custom desert lots, limited multi-family',
      challenges: [
        'HOA COI and gate rules',
        'Longer carries on larger lots',
        'Heat and wind on open desert streets',
        'Not interchangeable with park-model logistics',
      ],
      moverTips:
        'Collect HOA packets when applicable. Early starts beat heat. Price Foothills ↔ south ag edges as cross-metro time, not same-block locals.',
      cityKeywords: [
        'foothills',
        'yuma foothills',
        'east yuma',
        'foothills yuma',
      ],
    },
    {
      id: 'south-ag-valley',
      name: 'South county ag valley & farm-edge residential',
      shortName: 'South ag valley',
      neighborhoods: [
        'South Yuma County farm edges',
        'Irrigation-adjacent parcels',
        'Labor and seasonal housing clusters',
        'Rural-suburban transitions',
        'Produce-corridor residential',
      ],
      housingTypes:
        'Modest SFH, manufactured homes, seasonal and workforce housing, rural lots',
      challenges: [
        'Farm equipment and freight on narrow routes in season',
        'Soft or dusty approaches',
        'Variable address density and long carries',
        'Winter workforce turnover peaks',
      ],
      moverTips:
        'Ask about harvest and freight timing for winter moves. Send driveway photos. Confirm truck access on farm-edge roads.',
      cityKeywords: [
        'south yuma',
        'gadsden',
        'ag valley',
        'farm',
        'yuma agriculture',
      ],
    },
    {
      id: 'somerton-san-luis',
      name: 'Somerton, San Luis & southwest corridor',
      shortName: 'Somerton / San Luis',
      neighborhoods: [
        'Somerton',
        'San Luis',
        'Southwest corridor residential',
        'Border-adjacent neighborhoods',
        'Corridor multi-family and SFH mix',
      ],
      housingTypes:
        'Town SFH, multi-family, manufactured homes, workforce-oriented stock',
      challenges: [
        'Border-adjacent traffic patterns and peak timing',
        'Cross-town deadhead from Foothills crews',
        'Heat on open staging',
        'Language and document preferences vary by household — clear written estimates help',
      ],
      moverTips:
        'Name Somerton or San Luis explicitly — not generic “south Yuma.” Confirm portal time from crew staging points. Prefer early starts year-round for heat.',
      cityKeywords: [
        'somerton',
        'san luis',
        'san luis az',
        'southwest yuma',
      ],
    },
    {
      id: 'seasonal-parks',
      name: 'Seasonal parks, resorts & snowbird communities',
      shortName: 'Seasonal parks',
      neighborhoods: [
        'RV and manufactured-home parks',
        'Resort and seasonal communities',
        'Winter visitor corridors',
        'Park-model and cottage clusters',
        'Age-restricted seasonal pockets',
      ],
      housingTypes:
        'Park models, manufactured homes, seasonal cottages, RV-to-park transitions',
      challenges: [
        'Park rules, gate hours, and tight internal streets',
        'Partial loads and storage-in-transit common',
        'Sharp winter in/out clusters',
        'Summer heat still applies when parks are quieter',
      ],
      moverTips:
        'Collect park management rules and truck size limits before the survey is final. Book winter transition weeks early. Inventory carefully for partial seasonal loads.',
      cityKeywords: [
        'snowbird',
        'rv park',
        'manufactured home park',
        'seasonal yuma',
        'resort',
      ],
    },
    {
      id: 'marine-base-adjacent',
      name: 'MCAS / military-adjacent & south-central edges',
      shortName: 'Military-adjacent',
      neighborhoods: [
        'MCAS Yuma-adjacent residential',
        'Military family multi-family corridors',
        'South-central lease clusters',
        'PCS-oriented apartments',
        'Installation-edge SFH',
      ],
      housingTypes:
        'Apartments, townhomes, modest SFH, military-affiliated rentals',
      challenges: [
        'PCS peak volume and short-notice moves',
        'Apartment elevator windows and COI',
        'Base access coordination when applicable',
        'Competition with snowbird winter demand',
      ],
      moverTips:
        'Book as soon as orders allow. Confirm gate rules if either address requires installation entry. Ask about storage-in-transit for military timelines.',
      cityKeywords: [
        'mcas yuma',
        'military',
        'pcs yuma',
        'marine corps air station',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Yuma County',
    intro:
      'Heat pacing, seasonal population swings, park access, and border-adjacent or interstate legs move quotes more than square footage alone.',
    drivers: [
      {
        title: 'Extreme heat labor and multi-day risk',
        detail:
          'Safe summer pacing can require dawn starts, extra crew, or split days on large inventories — budget time, not only truck space.',
      },
      {
        title: 'Snowbird / park access rules',
        detail:
          'Tight streets, gate hours, and park-model partial loads add coordination labor that standard SFH quotes miss.',
      },
      {
        title: 'Winter ag and workforce turnover',
        detail:
          'Seasonal housing clusters and farm-edge access change route timing and inventory profiles in cooler months.',
      },
      {
        title: 'Cross-metro and CA-edge legs',
        detail:
          'Foothills ↔ San Luis or Yuma ↔ Imperial Valley pairs need honest drive time and, when interstate, FMCSA authority.',
      },
      {
        title: 'PCS peak capacity',
        detail:
          'Military windows can tighten crews even outside civilian snowbird peaks — book early when orders are known.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$350–$1,150+',
        note: 'Higher with elevators, parks, or peak heat pacing',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,000–$3,300+',
        note: 'Seasonal peaks and cross-town jobs trend up',
      },
      {
        label: '3–4+ BR (parks / ag-edge / interstate-adjacent)',
        value: '$1,800–$5,800+',
        note: 'Winter clusters and CA-edge hauls price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$165+/hr',
        note: 'Portal-to-portal; packing and heat-season demand scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal heat, ag, snowbird & PCS intelligence',
    intro:
      'Extreme summer heat empties outdoor comfort; winter fills the county with agriculture activity and snowbirds — plan the calendar before the inventory.',
    items: [
      {
        title: 'Extreme summer heat (primary constraint)',
        detail:
          'Afternoon temperatures can make open staging unsafe. Prefer earliest morning starts; consider multi-day plans for large homes in peak heat.',
      },
      {
        title: 'Winter snowbird arrivals and spring departures',
        detail:
          'Seasonal communities pack crews in cooler months. Book transition weeks as soon as park or lease dates firm up.',
      },
      {
        title: 'Agriculture season congestion and housing turnover',
        detail:
          'Produce and labor seasons change south-county traffic and workforce housing demand. Build route flexibility in winter.',
      },
      {
        title: 'PCS and federal calendar waves',
        detail:
          'Military permanent change of station windows can stack with civilian demand — early booking protects capacity.',
      },
      {
        title: 'Best value: mid-week dawn starts outside dual peaks',
        detail:
          'Avoid stacking peak heat afternoons with month-end Saturdays, and avoid the busiest snowbird move weeks when possible.',
      },
    ],
  },
  specialized: [
    {
      id: 'border-heat-seasonal',
      title: 'Border-adjacent heat & seasonal population module',
      intro:
        'Yuma’s signature stack is extreme heat plus winter population swings — Valley suburban scripts and mountain winter scripts both fail here.',
      bullets: [
        'Write heat policies into the estimate: start time, crew pacing, and what happens if temperatures exceed safe work thresholds.',
        'For winter moves, ask whether the address is year-round, seasonal, or park-managed — rules differ.',
        'Name any California destination early; verify FMCSA when the job is interstate.',
        'Protect electronics, candles, and heat-sensitive goods from closed-truck heat soak.',
        'Build flexible date language around ag freight peaks and snowbird transition weeks.',
      ],
    },
    {
      id: 'parks-pcs-ag-housing',
      title: 'Seasonal parks, PCS & ag-edge housing module',
      intro:
        'Park models, military apartments, and farm-edge workforce housing need access and inventory discipline that standard SFH quotes skip.',
      bullets: [
        'Collect park maps, gate hours, and maximum truck size before final pricing.',
        'Inventory partial loads carefully for seasonal residents and storage-in-transit needs.',
        'Confirm base access rules for military-affiliated addresses when applicable.',
        'Send photos of irrigation-adjacent or soft farm-edge approaches.',
        'Verify ACC entity status for the carrier; confirm FMCSA for any interstate leg.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Yuma County?',
    intro:
      'Border-metro living, extreme summer heat tolerance, winter ag and snowbird energy, and military adjacency are different bets — pick the pocket and the season you will live, not only a winter visit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Yuma County spans multiple districts (e.g., Yuma Elementary / Yuma Union high school systems, Crane, Gadsden, Somerton, and others depending on address). Match every listing to the correct district.',
        bullets: [
          {
            title: 'Address-first district check',
            detail:
              'Foothills, south county, and border-corridor addresses can sit in different systems with similar marketing area names.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Arizona Department of Education data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Seasonal population effects',
            detail:
              'Winter visitor pressure affects traffic and some services more than classroom rosters — still plan commute timing in peak months.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Arizona Western College and regional programs shape some staff and student housing demand.',
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
              'Yuma Regional Medical Center and other regional clinics cover most acute needs — map ER drive times from Foothills vs San Luis corridor addresses.',
          },
          {
            title: 'Heat and specialty reality',
            detail:
              'Summer heat affects appointment travel; some specialties may require trips to larger metros. Confirm insurer networks early.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer records before peak winter visitor season fills schedules.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & cost of living',
        bullets: [
          {
            title: 'Price ladder by pocket and season',
            detail:
              'Foothills SFH, central multi-family, border-corridor towns, and seasonal parks price differently — and winter demand can change availability.',
          },
          {
            title: 'Cooling cost reality',
            detail:
              'Peak summer utility bills are a first-order budget line. “Cheap rent” that cannot be cooled safely is not a bargain.',
          },
          {
            title: 'Seasonal vs year-round stock',
            detail:
              'Park and resort communities may not match year-round family needs. Confirm occupancy rules and park governance before buying or leasing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Central Yuma',
            detail:
              'Services and multi-family convenience — with older access and full summer heat exposure.',
          },
          {
            title: 'Foothills / east growth',
            detail:
              'More suburban desert product — still extreme heat, with HOA logistics.',
          },
          {
            title: 'Somerton / San Luis corridor',
            detail:
              'Border-adjacent daily life and workforce patterns — confirm commute and service access.',
          },
          {
            title: 'Seasonal parks',
            detail:
              'Winter lifestyle fit for many visitors — evaluate summer emptiness and park rules before year-round commitment.',
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
              'Agriculture and related logistics, military and federal, healthcare, education, retail, call centers, and cross-border commerce — not Phoenix tech corridors.',
          },
          {
            title: 'Seasonal labor markets',
            detail:
              'Winter ag seasons change hiring and housing pressure. Year-round roles in healthcare and military-adjacent work are more stable calendars.',
          },
          {
            title: 'Regional drives',
            detail:
              'Some households connect to California desert employment or longer Arizona hauls. Price those drives in heat and border-adjacent traffic.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Extreme summer heat culture',
            detail:
              'Daily life runs on early mornings, indoor afternoons, and heat safety — visit in July before deciding based on a February tour.',
          },
          {
            title: 'Winter energy and outdoors',
            detail:
              'Cooler months bring outdoor comfort, snowbird social life, and ag activity — a different county than peak summer.',
          },
          {
            title: 'Border-metro culture',
            detail:
              'Binational ties, food, and family patterns shape daily life. Visit on a weekday and weekend in the season you will actually live here.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Yuma County resources',
    intro:
      'Official links and verification notes — heat alerts, park rules, and road conditions change; verify before move day.',
    items: [
      {
        label: 'Yuma County',
        href: 'https://www.yumacountyaz.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Yuma',
        href: 'https://www.yumaaz.gov/',
        external: true,
      },
      {
        label: 'City of Somerton',
        href: 'https://www.somertonaz.gov/',
        external: true,
      },
      {
        label: 'City of San Luis',
        href: 'https://www.sanluisaz.gov/',
        external: true,
      },
      {
        label: 'ADOT — road conditions & construction',
        href: 'https://azdot.gov/',
        note: 'Check I-8 and local corridor delays',
        external: true,
      },
      {
        label: 'National Weather Service — Phoenix office (Yuma heat products)',
        href: 'https://www.weather.gov/psr/',
        note: 'Extreme heat and monsoon alerts for move planning',
        external: true,
      },
      {
        label: 'Arizona Corporation Commission (ACC) — entity search',
        href: 'https://www.azcc.gov/',
        note: 'Verify business entity status (not a household-goods mover license)',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
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
    'Filter listings by zone (Central Yuma, Foothills/East, South ag valley, Somerton/San Luis, Seasonal parks, Military-adjacent) when available. Confirm heat-aware start times, park or base rules, and ACC + FMCSA checks — not high-country or Valley HOA assumptions.',
  lastReviewed: '2026-07-23',
};
