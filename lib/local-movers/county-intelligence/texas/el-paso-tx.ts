import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted El Paso County, Texas moving intelligence.
 * Differentiators: isolated far-west border metro, Chihuahuan Desert climate,
 * Fort Bliss military PCSs, mountain-edge access — NOT Texas Triangle
 * (DFW / Houston / Austin) suburban growth scripts.
 */
export const elPasoCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'el-paso',
  hubTitle: 'El Paso County Moving Intelligence Hub',
  eyebrow: 'El Paso County · Border metro, desert & military',
  h1: 'Moving in El Paso County: Border Metro, Fort Bliss & Desert Mountain-Edge Guide',
  heroOpener:
    'El Paso County is not a Texas Triangle suburb with different freeways. It is a far-west border metro — Chihuahuan Desert heat, Franklin Mountains slopes, Fort Bliss PCS cycles, and a binational economy that does not track DFW, Houston, or Austin HOA growth scripts. Westside mountain-edge homes need grade and turnaround plans; Northeast and Fort Bliss-adjacent apartments absorb military turnover; Eastside and Horizon growth feel suburban but still sit in desert logistics; Downtown and Central grids bring older multi-unit staging. Summer heat is extreme; winters are mild but windy; interstate deadhead to the next major Texas metro is measured in hundreds of miles. This guide is for people actually moving in El Paso County — border-metro and military reality — not a recycled Triangle pack.',
  heroCredibility:
    'Border metro · Fort Bliss PCS · Desert / mountain-edge · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in El Paso County different',
    intro:
      'These are El Paso realities — desert climate, military PCS volume, mountain-edge access, and isolation from the Texas Triangle — not interchangeable “Texas suburb” boilerplate.',
    bullets: [
      {
        title: 'This is not Texas Triangle logistics',
        detail:
          'There is no short-hop spillover into Dallas, Houston, or Austin job corridors. Local crews, long-distance pricing, and equipment availability follow a self-contained border metro — not master-planned DFW or Houston growth patterns. Name exact origin and destination neighborhoods on every estimate.',
      },
      {
        title: 'Fort Bliss PCS cycles rewrite demand',
        detail:
          'Military permanent change of station windows pack apartments, on-base coordination needs, and short-notice inventory. Peak PCS seasons require earlier booking than civilian-only calendars in Triangle suburbs.',
      },
      {
        title: 'Desert heat is a first-order operational risk',
        detail:
          'Extreme summer temperatures stress crews, electronics, and sealed goods. Early starts, hydration plans, and shaded staging are not optional polish — they change whether a same-day load finishes safely.',
      },
      {
        title: 'Franklin Mountains edges are grade and access jobs',
        detail:
          'Westside and mountain-adjacent homes bring slopes, limited turnaround, wind exposure, and longer carries. Flat Eastside cul-de-sac quotes fail on hillside addresses — share driveway photos.',
      },
      {
        title: 'Border-metro traffic and port-of-entry timing matter',
        detail:
          'International bridge approaches, freight corridors, and peak commute on I-10 can delay portal time even on “local” map miles. Ask how drive time is priced.',
      },
      {
        title: 'Long-distance isolation changes interstate planning',
        detail:
          'Moves to the Texas Triangle, New Mexico interiors, or Arizona are long hauls with different crew density than Houston-to-Austin locals. Confirm FMCSA authority and realistic transit assumptions before deposit.',
      },
      {
        title: 'Dust, wind, and monsoon-style storms affect outdoor packing',
        detail:
          'High winds and dust events can pause exterior work; summer storm bursts still occur. Build flexibility and protect inventory from grit.',
      },
      {
        title: 'Texas intrastate rules (TxDMV) + FMCSA when interstate',
        detail:
          'Moves entirely within Texas are generally overseen under Texas Department of Motor Vehicles (TxDMV) household-goods / motor-carrier frameworks. Interstate legs (common from El Paso into New Mexico, Mexico-bound international arrangements, or long-haul U.S. states) need active FMCSA USDOT (and usually MC) authority where applicable. Confirm which framework applies before deposit.',
      },
    ],
  },
  zonesHeading: 'El Paso County access zones',
  zonesIntro:
    'Plan by Westside mountain-edge, Central/Downtown, Northeast / Fort Bliss-adjacent, Eastside growth, Horizon / far east, and Upper Valley / northwest — each has desert climate in common but different access problems.',
  zones: [
    {
      id: 'westside-mountain',
      name: 'Westside & Franklin Mountains edge',
      shortName: 'Westside',
      neighborhoods: [
        'Westside slopes',
        'Coronado area',
        'Mountain-adjacent foothills',
        'Scenic Drive corridor edges',
        'Larger-lot hillside homes',
      ],
      housingTypes:
        'Hillside SFH, larger-lot desert homes, some multi-family lower on the slope',
      challenges: [
        'Grade, limited truck turnaround, and long carries',
        'Wind exposure on open staging',
        'Narrow approaches on some foothill streets',
        'Heat amplification on reflective surfaces',
      ],
      moverTips:
        'Treat Westside as access-first: driveway grade and turnaround photos before booking. Prefer earliest morning starts. Confirm truck size for foothill streets.',
      cityKeywords: [
        'westside',
        'coronado',
        'franklin mountains',
        'scenic drive',
        'west el paso',
      ],
    },
    {
      id: 'central-downtown',
      name: 'Central, Downtown & historic grid',
      shortName: 'Central / Downtown',
      neighborhoods: [
        'Downtown El Paso',
        'Sunset Heights',
        'Manhattan Heights edges',
        'Central multi-unit corridors',
        'Older bungalow grids',
      ],
      housingTypes:
        'Older SFH, multi-unit, some mid-rise and redevelopment product',
      challenges: [
        'Limited curb staging and older street grids',
        'Elevator/COI rules in multi-unit buildings',
        'Event and bridge-approach traffic near downtown',
        'Tight turns and stair carries in historic stock',
      ],
      moverTips:
        'Get building packets early. Prefer mid-week morning freight windows. Share stair and truck-height photos for older multi-unit.',
      cityKeywords: [
        'downtown el paso',
        'sunset heights',
        'central el paso',
        'manhattan heights',
      ],
    },
    {
      id: 'northeast-fort-bliss',
      name: 'Northeast & Fort Bliss-adjacent',
      shortName: 'NE / Fort Bliss',
      neighborhoods: [
        'Northeast El Paso',
        'Fort Bliss-adjacent apartments',
        'Dyer / Railroad corridors',
        'Military family housing edges (as applicable)',
        'Multi-family PCS corridors',
      ],
      housingTypes:
        'Apartments, townhomes, modest SFH, military-adjacent multi-family',
      challenges: [
        'PCS peak volume and short-notice moves',
        'Apartment elevator windows and COI',
        'Base access coordination when applicable',
        'High turnover inventory profiles',
      ],
      moverTips:
        'Book PCS windows early. Confirm gate/base access rules if either address requires it. Inventory carefully for partial loads and storage-in-transit common in military moves.',
      cityKeywords: [
        'fort bliss',
        'northeast',
        'dyer',
        'northeast el paso',
        'pcs',
      ],
    },
    {
      id: 'eastside',
      name: 'Eastside suburban belt',
      shortName: 'Eastside',
      neighborhoods: [
        'East El Paso',
        'Zaragoza corridor residential',
        'Joe Battle / Loop 375 east pockets',
        'Planned and semi-planned tracts',
        'East multi-family clusters',
      ],
      housingTypes:
        'Suburban SFH, HOA tracts, townhomes, multi-family',
      challenges: [
        'Peak I-10 / Loop 375 congestion',
        'HOA COI where planned communities apply',
        'Summer heat on open streets',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Collect HOA packets when applicable. Early starts beat desert heat. Price Eastside ↔ Westside as a multi-zone haul — mountain and freeway time both bill.',
      cityKeywords: [
        'eastside',
        'east el paso',
        'zaragoza',
        'joe battle',
        'loop 375',
      ],
    },
    {
      id: 'horizon-far-east',
      name: 'Horizon City, Socorro edge & far east growth',
      shortName: 'Horizon / Far East',
      neighborhoods: [
        'Horizon City',
        'Socorro',
        'Clint edge',
        'Far east growth tracts',
        'Lower Valley approaches',
      ],
      housingTypes:
        'Newer suburban SFH, some HOA, small-city in-grid stock, limited multi-unit',
      challenges: [
        'Longer deadhead from Westside crews',
        'I-10 east timing and heat on open staging',
        'New-construction incomplete roads in growth pockets',
        'Lower service density than central corridors',
      ],
      moverTips:
        'Ask whether “local” rate cards still apply for Horizon ↔ Westside pairs. Confirm access the week of the move in new sections. Share approach photos.',
      cityKeywords: [
        'horizon',
        'horizon city',
        'socorro',
        'clint',
        'far east el paso',
      ],
    },
    {
      id: 'upper-valley-northwest',
      name: 'Upper Valley, Northwest & Canutillo edge',
      shortName: 'Upper Valley / NW',
      neighborhoods: [
        'Upper Valley',
        'Canutillo',
        'Vinton edge',
        'Northwest desert tracts',
        'Agricultural-edge transitions',
      ],
      housingTypes:
        'Larger-lot SFH, rural-suburban edges, some newer tracts, limited multi-unit',
      challenges: [
        'Longer carries and soft or dusty approaches',
        'Wind and dust on open lots',
        'I-10 northwest / NM line timing',
        'Not interchangeable with Eastside apartment logistics',
      ],
      moverTips:
        'Send driveway and surface photos. Protect inventory from dust. Northwest ↔ Northeast PCS apartments are cross-metro jobs — price time honestly.',
      cityKeywords: [
        'upper valley',
        'canutillo',
        'vinton',
        'northwest el paso',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside El Paso County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on mountain-edge access, PCS timing, I-10 cross-town time, and whether the pair stays Eastside or climbs the Westside slopes — this is not Triangle HOA pricing logic alone.',
    drivers: [
      {
        title: 'Mountain-edge / hillside access',
        detail:
          'Grades, limited turnaround, and long carries on Westside lots add labor hours fast — access photos prevent underquotes.',
      },
      {
        title: 'Cross-town I-10 / desert metro time',
        detail:
          'Westside ↔ Horizon or Northeast ↔ Upper Valley can burn more clock than flat map miles suggest, especially at peak heat and commute.',
      },
      {
        title: 'PCS peak capacity',
        detail:
          'Military move seasons tighten crews and can push rates or lead times — book early for known PCS windows.',
      },
      {
        title: 'Heat-related pacing and crew size',
        detail:
          'Extreme heat can slow outdoor packing and require earlier starts or extra labor to finish safely within daylight comfort windows.',
      },
      {
        title: 'Long-haul isolation (interstate)',
        detail:
          'Legs toward the Texas Triangle or other states involve long deadhead and different pricing than Houston–Austin locals — confirm FMCSA authority and transit assumptions.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,300+',
        note: 'Higher with elevators, PCS peaks, or hillside long-carry',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,600+',
        note: 'Cross-town and mountain-edge jobs trend up',
      },
      {
        label: '3–4+ BR (cross-zone / hillside / far east)',
        value: '$2,000–$6,000+',
        note: 'Westside grade pairs and far-east long locals price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$175+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, desert heat, wind & PCS-calendar intelligence',
    intro:
      'Chihuahuan Desert heat, wind/dust events, and Fort Bliss PCS cycles set demand more than Texas Triangle school-suburb patterns alone.',
    items: [
      {
        title: 'Extreme summer heat (primary constraint)',
        detail:
          'Afternoon temperatures can make open staging unsafe or inefficient. Prefer earliest morning starts May–September; plan hydration and electronics protection.',
      },
      {
        title: 'PCS peak windows',
        detail:
          'Military permanent change of station seasons (often concentrated in summer) fill crews near Northeast and multi-family corridors. Book as soon as orders allow.',
      },
      {
        title: 'Wind and dust events',
        detail:
          'High winds can pause outdoor packing and grit-contaminate inventory. Flexible dates beat rigid Saturday-only plans in windy stretches.',
      },
      {
        title: 'Mild winters, occasional freeze',
        detail:
          'Winters are generally move-friendly compared with northern states, but rare freezes and wind still deserve contingency language.',
      },
      {
        title: 'Best value: mid-month early mornings outside PCS crush',
        detail:
          'Avoid last-Saturday peaks when civilian leases and military calendars collide. Weekday dawn starts are often the operational sweet spot.',
      },
    ],
  },
  specialized: [
    {
      id: 'fort-bliss-pcs',
      title: 'Fort Bliss PCS & military household logistics',
      intro:
        'El Paso County’s volume problem is often military turnover, short notice, and apartment access — not Triangle master-planned HOA paperwork alone.',
      bullets: [
        'Book as soon as PCS orders allow; peak summer capacity disappears first near Northeast multi-family corridors.',
        'Confirm base access, gate hours, and escort rules if either address requires installation entry.',
        'Inventory carefully for partial loads, storage-in-transit, and weight-based military entitlements when applicable.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Ask about claims processes and valuation options in writing — military and civilian contracts differ.',
      ],
    },
    {
      id: 'desert-mountain-access',
      title: 'Desert heat, wind & mountain-edge access module',
      intro:
        'Chihuahuan Desert climate and Franklin Mountains grades need operational plans that flat Triangle suburbs never write.',
      bullets: [
        'Share driveway grade, width, and turnaround photos for Westside and foothill homes before booking.',
        'Prefer earliest morning starts; discuss heat policies and crew pacing in writing for summer moves.',
        'Protect inventory from dust and wind; have tarps and sealed packing for grit-prone days.',
        'Price Westside ↔ Eastside / Horizon pairs as cross-metro jobs with honest I-10 time.',
        'Confirm vehicle capability for steep or narrow mountain-edge approaches before dispatching a full-size truck.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to El Paso County?',
    intro:
      'Border-metro living, Fort Bliss adjacency, mountain-edge Westside, and far-east growth are different bets — and none of them behave like DFW, Houston, or Austin suburbs. Pick the pocket first, then validate schools, healthcare, military lifestyle fit, and desert heat tolerance.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'El Paso County spans multiple districts (e.g., El Paso ISD, Ysleta ISD, Socorro ISD, Canutillo ISD, Clint ISD, Fabens ISD, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and TEA resources. Marketing area names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Military family considerations',
            detail:
              'PCS timing and school-year midpoints matter for Fort Bliss-affiliated households — coordinate enrollment early with district military liaisons when available.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and TEA data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Higher education presence',
            detail:
              'The University of Texas at El Paso (UTEP) and regional colleges shape staff and student housing demand near campus-adjacent areas.',
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
              'University Medical Center of El Paso, Las Palmas, Del Sol, William Beaumont Army Medical Center (military-eligible), and other campuses cover the metro — map ER drive times from Westside slopes vs far-east addresses.',
          },
          {
            title: 'Specialty and cross-border context',
            detail:
              'Some households navigate U.S. specialist networks with longer travel than Triangle metros offer locally. Confirm insurer networks before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer records early; book first appointments before peak summer PCS chaos fills schedules.',
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
              'Westside views and slopes, Northeast multi-family, Eastside suburbs, and Horizon growth often price differently. Compare total monthly costs (utilities in extreme heat, insurance, commute), not sticker price alone.',
          },
          {
            title: 'Military-adjacent stock',
            detail:
              'Apartments and rentals near Fort Bliss absorb PCS churn — lease timing and deposit norms can differ from civilian-only markets.',
          },
          {
            title: 'Desert utility reality',
            detail:
              'Cooling costs in peak summer are a real budget line. Factor utility estimates into “affordable” addresses.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Westside mountain-edge',
            detail:
              'Views and hillside living — only if you accept grade access and wind exposure on move day.',
          },
          {
            title: 'Northeast / military-adjacent',
            detail:
              'Practical for Fort Bliss-affiliated households — with apartment peaks and PCS calendars.',
          },
          {
            title: 'Eastside suburban belt',
            detail:
              'More conventional suburban product — still desert heat and I-10 timing, not Triangle HOA clones.',
          },
          {
            title: 'Horizon / Upper Valley edges',
            detail:
              'Farther, quieter, sometimes newer or larger-lot — with longer service distances across the metro.',
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
              'Military and federal, healthcare, education, logistics, call centers, manufacturing, and binational trade-related employment — not Austin tech spillover or Houston energy corridors.',
          },
          {
            title: 'I-10 spine patterns',
            detail:
              'Many commutes stay inside the border metro on I-10 and Loop 375. Peak heat and bridge-adjacent freight can affect timing more than Triangle-style multi-county hopscotch.',
          },
          {
            title: 'Isolation from Texas Triangle',
            detail:
              'Expect flights or long drives for Triangle business travel. Housing choice is local-metro first, not “close to Dallas in two hours.”',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Chihuahuan Desert climate',
            detail:
              'Very hot summers, mild winters, low humidity vs Gulf Coast, high sun exposure, and windy stretches — plan daily life and move days around heat.',
          },
          {
            title: 'Border-metro culture',
            detail:
              'Binational culture, food, and family ties shape daily life in ways Triangle suburbs do not. Visit on a weekday and weekend before choosing a pocket.',
          },
          {
            title: 'Outdoors',
            detail:
              'Franklin Mountains State Park and desert trails are major draws; heat safety and early starts apply to recreation as much as to moving.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical El Paso County resources',
    intro:
      'Official links and licensing notes — heat, base access, and parking rules change; verify before move day.',
    items: [
      {
        label: 'El Paso County',
        href: 'https://www.epcounty.com/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of El Paso',
        href: 'https://www.elpasotexas.gov/',
        external: true,
      },
      {
        label: 'Town of Horizon City',
        href: 'https://www.horizoncity.org/',
        external: true,
      },
      {
        label: 'City of Socorro',
        href: 'https://www.ci.socorro.tx.us/',
        external: true,
      },
      {
        label: 'Fort Bliss (official)',
        href: 'https://home.army.mil/bliss/',
        note: 'PCS and installation information for military-affiliated moves',
        external: true,
      },
      {
        label: 'TxDOT — road conditions & construction',
        href: 'https://www.txdot.gov/',
        note: 'Check I-10 and local corridor delays',
        external: true,
      },
      {
        label: 'National Weather Service — El Paso',
        href: 'https://www.weather.gov/epz/',
        note: 'Heat, wind, and dust alerts for move planning',
        external: true,
      },
      {
        label: 'TxDMV — motor carrier / household goods',
        href: 'https://www.txdmv.gov/',
        note: 'Texas Department of Motor Vehicles (intrastate frameworks)',
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
    'Filter listings by zone (Westside, Central/Downtown, NE/Fort Bliss, Eastside, Horizon/Far East, Upper Valley/NW) when available. Confirm hillside access photos for Westside, PCS/base rules near Fort Bliss, and heat-aware start times — not DFW, Houston, or Austin suburban assumptions.',
  lastReviewed: '2026-07-23',
};
