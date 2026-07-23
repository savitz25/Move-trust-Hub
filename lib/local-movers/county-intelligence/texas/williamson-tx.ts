import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Williamson County, Texas moving intelligence.
 * Differentiators: Round Rock / Georgetown / Hutto / Cedar Park-edge growth,
 * Austin north tech spillover, HOA density — not Travis downtown elevators
 * or DFW north-suburb scripts.
 */
export const williamsonCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'texas',
  countySlug: 'williamson',
  hubTitle: 'Williamson County Moving Intelligence Hub',
  eyebrow: 'Williamson · Round Rock, Georgetown & Austin north growth',
  h1: 'Moving in Williamson County: Round Rock Growth, Georgetown & Austin North Guide',
  heroOpener:
    'Williamson County is Austin’s northern growth engine — Round Rock tech and retail corridors, Georgetown’s historic square plus master-planned edges, Hutto and Taylor expansion, and Cedar Park / Leander-adjacent product that still sits in Williamson logistics. This is not downtown Travis elevators and not a DFW suburb with different freeways. HOA packets, I-35 and 130 toll timing, summer heat, and tech-driven transfer volume define crew days. Leander and Liberty Hill feel more exurban; Round Rock absorbs corporate relocations; Georgetown mixes square-adjacent older stock with Sun City and new villages. This guide is for people moving in Williamson County — Austin-north spillover plus distinct town identities — not a recycled Austin core pack.',
  heroCredibility:
    'Round Rock / Georgetown growth · Austin north tech spillover · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
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
    title: 'What makes moving in Williamson County different',
    intro:
      'These are Williamson realities — Austin-north HOA growth, tech spillover volume, and I-35 / 130 corridor timing — not interchangeable “Austin metro” boilerplate.',
    bullets: [
      {
        title: 'Round Rock, Georgetown, and Hutto are different products',
        detail:
          'A Round Rock HOA two-story, a Georgetown Square bungalow, a Hutto new build, and a Liberty Hill larger-lot do not share truck access, gate rules, or inventory profiles. Name both origin and destination cities on every estimate.',
      },
      {
        title: 'Austin tech and corporate spillover drives inbound volume',
        detail:
          'Households choose Williamson for newer housing, schools, and relative value while commuting into Travis job centers or working remote/hybrid for Austin employers. Peak spring/summer and end-of-month windows book first.',
      },
      {
        title: 'HOAs dominate much of the growth stock',
        detail:
          'Master-planned villages require COI, approved hours, gate lists, and floor protection. Treat the HOA packet as part of the survey — not an afterthought on move morning.',
      },
      {
        title: 'I-35 / 183A / 130 / 45 timing rewrites “local” ETAs',
        detail:
          'Map miles between Round Rock, Georgetown, and Cedar Park-edge understate peak portal time. Toll vs non-toll routing can change billable minutes — ask how drive time is priced.',
      },
      {
        title: 'Georgetown Square character vs Sun City / village edges',
        detail:
          'Historic-grid staging near the Square is not the same job as active-adult Sun City or new eastern villages. Access photos and building rules prevent day-of chaos.',
      },
      {
        title: 'Eastern and northern expansion are long-local jobs',
        detail:
          'Hutto, Taylor, Jarrell, and Liberty Hill look close on a map and still burn deadhead and arterial time. Confirm whether “local” rate cards still apply.',
      },
      {
        title: 'Central Texas summer heat stresses open staging',
        detail:
          'Afternoon heat on suburban streets and apartment docks slows exterior carries. Early starts outperform noon load-outs in July and August.',
      },
      {
        title: 'Texas intrastate rules (TxDMV) + FMCSA when interstate',
        detail:
          'Moves entirely within Texas are generally overseen under Texas Department of Motor Vehicles (TxDMV) household-goods / motor-carrier frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority. Confirm which license applies before deposit.',
      },
    ],
  },
  zonesHeading: 'Williamson County access zones',
  zonesIntro:
    'Plan by Round Rock core, Georgetown Square vs villages, Cedar Park/Leander-edge, Hutto/Taylor east growth, and Liberty Hill/Jarrell north — each has its own HOA and traffic profile.',
  zones: [
    {
      id: 'round-rock',
      name: 'Round Rock — tech, retail & planned growth core',
      shortName: 'Round Rock',
      neighborhoods: [
        'Downtown Round Rock',
        'East Round Rock growth',
        'West Round Rock / 620 corridors',
        'Teravista and similar villages',
        'La Frontera / retail-employment edges',
        'Multi-family apartment corridors',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, multi-family, some older in-town stock',
      challenges: [
        'HOA COI, gate lists, and approved move hours',
        'I-35 / 45 / local arterial congestion at peak',
        'Corporate transfer and end-of-month lease volume',
        'Apartment elevator windows near employment corridors',
      ],
      moverTips:
        'Collect HOA and apartment packets early. Prefer weekday mornings near I-35. Round Rock ↔ Georgetown is a classic underquoted local — price portal time honestly.',
      cityKeywords: [
        'round rock',
        'teravista',
        'la frontera',
        'round rock tx',
      ],
    },
    {
      id: 'georgetown-core-villages',
      name: 'Georgetown — Square, Sun City & village edges',
      shortName: 'Georgetown',
      neighborhoods: [
        'Georgetown Square / historic core',
        'Sun City Texas',
        'Wolf Ranch and similar villages',
        'East Georgetown growth',
        'North Georgetown tracts',
        'South Georgetown toward Round Rock',
      ],
      housingTypes:
        'Historic SFH, active-adult communities, master-planned HOA SFH, multi-family',
      challenges: [
        'Historic-grid staging near the Square',
        'Sun City / village HOA rules and hours',
        'I-35 interchange timing',
        'Mix of retiree and family move calendars',
      ],
      moverTips:
        'Share street-width photos for Square-adjacent homes. Collect Sun City and village HOA packets before booking. Early starts in summer heat.',
      cityKeywords: [
        'georgetown',
        'sun city',
        'sun city texas',
        'wolf ranch',
        'georgetown square',
      ],
    },
    {
      id: 'cedar-park-leander-edge',
      name: 'Cedar Park edge, Leander edge & western corridor',
      shortName: 'Cedar Park / Leander',
      neighborhoods: [
        'Cedar Park (Williamson portions)',
        'Leander (Williamson portions)',
        '183A corridor residential',
        'Brushy Creek edges',
        'Master-planned west villages',
      ],
      housingTypes:
        'HOA SFH, townhomes, multi-family, some hillside and larger-lot edges',
      challenges: [
        '183A / 620 congestion toward Austin employment',
        'HOA COI and approved hours',
        'Cross-county pairs into Travis job centers',
        'School-calendar Saturday demand',
      ],
      moverTips:
        'Price portal-to-portal time for west-corridor ↔ Round Rock or downtown Austin pairs honestly. Collect HOA packets before locking Saturday crews.',
      cityKeywords: [
        'cedar park',
        'leander',
        'brushy creek',
        '183a',
      ],
    },
    {
      id: 'hutto-taylor-east',
      name: 'Hutto, Taylor & eastern growth',
      shortName: 'Hutto / Taylor',
      neighborhoods: [
        'Hutto',
        'Taylor',
        'East 79 / 1660 corridors',
        'Newer master-planned east villages',
        'Agricultural-edge transitions',
      ],
      housingTypes:
        'Newer HOA SFH, small-town in-grid stock, some multi-family and acreage edges',
      challenges: [
        'Longer arterials to I-35 job corridors',
        'HOA rules in new villages vs older town grids',
        'New-construction incomplete roads',
        'Lower service density than Round Rock core',
      ],
      moverTips:
        'Confirm builder/HOA access the week of the move. Hutto ↔ Round Rock or Taylor ↔ Georgetown needs honest deadhead assumptions — not pure map-mile locals.',
      cityKeywords: [
        'hutto',
        'taylor',
        'taylor tx',
        'hutto tx',
      ],
    },
    {
      id: 'liberty-hill-jarrell-north',
      name: 'Liberty Hill, Jarrell & northern expansion',
      shortName: 'North Expansion',
      neighborhoods: [
        'Liberty Hill',
        'Jarrell',
        'Florence edge',
        'I-35 north growth villages',
        'Larger-lot and rural-suburban pockets',
      ],
      housingTypes:
        'New master-planned SFH, larger-lot suburban, limited multi-unit, rural-edge homes',
      challenges: [
        'Long deadhead from Round Rock core crews',
        'HOA gates in new villages',
        'I-35 north construction and congestion variability',
        'Soft or incomplete approaches in new sections',
      ],
      moverTips:
        'Ask whether “local” rate cards still apply. Share approach photos for larger-lot and new-construction addresses. Prefer flexible dates during corridor construction seasons.',
      cityKeywords: [
        'liberty hill',
        'jarrell',
        'florence',
        'liberty hill tx',
      ],
    },
    {
      id: 'pflugerville-edge',
      name: 'Pflugerville-edge & southeastern Williamson',
      shortName: 'SE / Pflugerville Edge',
      neighborhoods: [
        'Pflugerville (Williamson portions as applicable)',
        'Southeast 130 corridor pockets',
        'Cross-county line residential',
        'Multi-family and HOA mix near Travis border',
      ],
      housingTypes:
        'Suburban HOA SFH, multi-family, townhomes',
      challenges: [
        'SH 130 / local arterial timing',
        'Cross-county pairs into Travis',
        'HOA and apartment COI requirements',
        'High lease-churn multi-family volume',
      ],
      moverTips:
        'Clarify which county and HOA rules apply at each address. Price SE edge ↔ Round Rock or Austin core with honest toll-corridor assumptions.',
      cityKeywords: [
        'pflugerville',
        'sh 130',
        'pflugerville edge',
        'williamson southeast',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Williamson County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on HOA soft costs, I-35 / 130 portal time, tech-transfer volume, and whether the pair stays in Round Rock–Georgetown or stretches to Hutto, Taylor, or Liberty Hill.',
    drivers: [
      {
        title: 'Cross-zone Austin-north corridor time',
        detail:
          'Round Rock ↔ Georgetown, Cedar Park-edge ↔ Hutto, or any peak I-35 / 183A / 130 leg can burn far more clock than map miles suggest.',
      },
      {
        title: 'HOA soft costs (growth villages)',
        detail:
          'COI processing, approved hours, and gate lists add soft costs and can force weekday-only windows before labor starts.',
      },
      {
        title: 'Tech / corporate transfer clustering',
        detail:
          'Employer-driven moves can tighten mid-month mid-week capacity and still compete with Saturday HOA demand in peak season.',
      },
      {
        title: 'Eastern / northern expansion deadhead',
        detail:
          'Hutto, Taylor, Jarrell, and Liberty Hill raise portal time versus Round Rock core — confirm local vs long-local pricing.',
      },
      {
        title: 'Historic-grid vs village access mix (Georgetown)',
        detail:
          'Square-adjacent staging constraints and Sun City rules create different labor profiles under one city name.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,450+',
        note: 'Higher with elevators, HOA windows, or peak transfer weeks',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$4,200+',
        note: 'HOA soft costs and multi-zone hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / east-north expansion)',
        value: '$2,400–$7,000+',
        note: 'Long locals toward Hutto, Taylor, or Liberty Hill price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$195+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, heat, tech-transfer & school-calendar intelligence',
    intro:
      'Central Texas heat, Austin-metro school calendars, and tech/corporate transfer cycles set residential peaks across Williamson County.',
    items: [
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Round Rock, Georgetown villages, and Hutto growth. Book 2–4 weeks ahead for popular HOA windows.',
      },
      {
        title: 'Central Texas summer heat',
        detail:
          'Afternoon heat stresses open suburban staging. Prefer early starts, shaded staging, and heat-safe packing for electronics and sealed goods.',
      },
      {
        title: 'Tech and corporate transfer waves',
        detail:
          'Employer-driven moves can cluster around fiscal quarters and project starts. Mid-week capacity still competes with residential peaks in summer.',
      },
      {
        title: 'Mild winters, storm-day exceptions',
        detail:
          'Ice or severe-storm days can still cancel outdoor packing. Build flexibility around forecast windows.',
      },
      {
        title: 'Best value: mid-month Tue–Thu mornings',
        detail:
          'Still plan around HOA weekday windows. Avoid last Friday/Saturday of the month when leases and family moves collide.',
      },
    ],
  },
  specialized: [
    {
      id: 'austin-north-hoa-tech',
      title: 'Austin-north HOAs, tech spillover & Round Rock logistics',
      intro:
        'Williamson County’s volume problem is often planned-community paperwork plus tech-driven transfer demand along the I-35 spine.',
      bullets: [
        'Collect HOA COI, gate lists, and approved hours before the survey is final — many villages will turn crews away without paperwork.',
        'Price Round Rock ↔ Georgetown and Round Rock ↔ Cedar Park-edge pairs with honest I-35 / 183A portal time.',
        'Corporate transfers may need inventory lists and elevator reservations for multi-unit product near employment corridors.',
        'Prefer early starts in peak summer heat on open suburban streets.',
        'If either address ties to Travis County employment, map peak commute timing into the rate card conversation.',
      ],
    },
    {
      id: 'georgetown-east-north-expansion',
      title: 'Georgetown character & east/north expansion module',
      intro:
        'Historic Square access, Sun City rules, and Hutto–Taylor–Liberty Hill growth need distinct survey inputs.',
      bullets: [
        'Share street-width and driveway photos for Georgetown Square-adjacent homes.',
        'Collect Sun City and village HOA packets separately from non-HOA in-town stock.',
        'Confirm new-construction access the week of the move in Hutto, Taylor, Jarrell, and Liberty Hill.',
        'Ask whether “local” rate cards still apply for eastern and northern long locals.',
        'Active-adult moves may need extra care for medical equipment and slower packing pacing — inventory accurately.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Williamson County?',
    intro:
      'Round Rock employment adjacency, Georgetown character, Hutto growth, and Liberty Hill expansion are different bets — pick the pocket first, then validate schools, healthcare, Austin commute tolerance, and HOA lifestyle fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Williamson County spans multiple districts (e.g., Round Rock ISD, Georgetown ISD, Hutto ISD, Leander ISD portions, Liberty Hill ISD, Jarrell ISD, Taylor ISD, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools and TEA resources. Marketing city names and master-planned villages can span feeders.',
          },
          {
            title: 'Growth vs established systems',
            detail:
              'Enrollment pressures differ between rapid east/north villages and longer-established Round Rock or Georgetown corridors — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and TEA data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Southwestern University (Georgetown) and nearby Austin campuses shape some staff and student housing demand.',
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
              'Baylor Scott & White Round Rock, St. David’s Georgetown, Ascension Seton Williamson, and other north-metro campuses cover much of the county — map ER drive times at rush hour from your target neighborhood.',
          },
          {
            title: 'Austin specialty spillover',
            detail:
              'Many residents use Travis County specialty systems. Confirm insurer networks and realistic I-35 / 183 appointment drive times.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer HOA move chaos.',
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
              'Round Rock planned communities, Georgetown Square vs Sun City, Hutto new builds, and Liberty Hill expansion often price differently. Compare total monthly costs (HOA, insurance, tolls, commute), not sticker price alone.',
          },
          {
            title: 'HOA-dominant growth stock',
            detail:
              'Master-planned dues and move-day restrictions are part of the lifestyle cost in much of the growth belt.',
          },
          {
            title: 'New construction volume',
            detail:
              'East and north belts add inventory quickly; incomplete amenities and temporary access rules can affect move-in logistics.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Round Rock employment & amenities',
            detail:
              'Tech/retail adjacency and planned living — with HOA paperwork and I-35 timing.',
          },
          {
            title: 'Georgetown character spectrum',
            detail:
              'Square culture, Sun City active-adult, or village growth — three lifestyles under one city brand.',
          },
          {
            title: 'West corridor toward Austin',
            detail:
              'Cedar Park / Leander edges for western access — with 183A congestion patterns.',
          },
          {
            title: 'East and north expansion',
            detail:
              'Hutto, Taylor, Jarrell, Liberty Hill for newer or larger-lot housing — only if you accept longer corridor drives.',
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
              'Tech and corporate campuses (notably Round Rock), healthcare, retail, education, public sector, and growing commercial nodes — plus strong ties into the Austin metro economy.',
          },
          {
            title: 'Austin-north corridor patterns',
            detail:
              'Many residents commute within Williamson or into Travis County. Peak I-35 / 183A / 130 times should drive housing choice more than brochure distance.',
          },
          {
            title: 'Hybrid / remote options',
            detail:
              'Tech and professional remote-capable roles are common — still validate broadband and coworking by pocket if that matters to you.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Central Texas climate reality',
            detail:
              'Hot summers, mild winters, and occasional severe-storm days — plan move windows around heat and weather alerts.',
          },
          {
            title: 'Outdoors & town life',
            detail:
              'Parks, trails, Georgetown Square culture, and suburban amenities are major draws; peak weekends affect staging near events and retail corridors.',
          },
          {
            title: 'Growth-speed literacy',
            detail:
              'Rapid expansion means construction traffic and evolving retail — visit your target pocket at commute hour before locking a purchase or lease.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Williamson County resources',
    intro:
      'Official links and licensing notes — HOA, parking, and city rules change; verify before move day.',
    items: [
      {
        label: 'Williamson County',
        href: 'https://www.wilco.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Round Rock',
        href: 'https://www.roundrocktexas.gov/',
        external: true,
      },
      {
        label: 'City of Georgetown',
        href: 'https://georgetown.org/',
        external: true,
      },
      {
        label: 'City of Hutto',
        href: 'https://www.huttotx.gov/',
        external: true,
      },
      {
        label: 'City of Cedar Park',
        href: 'https://www.cedarparktexas.gov/',
        external: true,
      },
      {
        label: 'City of Leander',
        href: 'https://www.leandertx.gov/',
        external: true,
      },
      {
        label: 'City of Liberty Hill',
        href: 'https://www.libertyhilltx.gov/',
        external: true,
      },
      {
        label: 'TxDOT — road conditions & construction',
        href: 'https://www.txdot.gov/',
        note: 'Check I-35 and corridor delays for long locals',
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
    'Filter listings by zone (Round Rock, Georgetown, Cedar Park/Leander, Hutto/Taylor, North Expansion, SE/Pflugerville Edge) when available. Confirm HOA/COI for growth villages, Square access photos for Georgetown historic stock, and honest I-35 / 130 time — not Travis downtown assumptions.',
  lastReviewed: '2026-07-23',
};
