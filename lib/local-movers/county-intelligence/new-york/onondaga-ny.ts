import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Onondaga County, New York moving intelligence.
 * Differentiators: Syracuse metro, central New York, university/medical anchors,
 * winter weather, city vs suburban town contrast — NOT NYC or Long Island patterns.
 */
export const onondagaCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'onondaga',
  hubTitle: 'Onondaga County Moving Intelligence Hub',
  eyebrow: 'Onondaga · Syracuse, central NY & winter access',
  h1: 'Moving in Onondaga County: Syracuse Access, Central NY Suburbs & Winter Guide',
  heroOpener:
    'Onondaga County is the Syracuse metro in Central New York — not a downstate annex. Intown Syracuse has multi-story homes, student housing near campus, and growing downtown multi-family; first-ring suburbs stretch through Dewitt, Manlius, Liverpool, Camillus, and Cicero; lake and hill towns add longer empty miles; winters routinely rewrite curb access and driveway carries. A University Hill apartment, a Strathmore colonial, a Manlius HOA ranch, and a Skaneateles-edge home do not share truck access or weather risk. I-81, I-690, and I-481 create real portal-time friction on cross-town pairs. This hub is for people actually moving in Onondaga — not recycled NYC or Long Island tips with Syracuse labels.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · Syracuse metro & central NY winter awareness · Curated directory listings',
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
    title: 'What makes moving in Onondaga County different',
    intro:
      'These are Onondaga / Syracuse realities — central NY winters, university peaks, and city–suburb distance — not interchangeable downstate or Western NY boilerplate.',
    bullets: [
      {
        title: 'Central NY winters are a primary logistics factor',
        detail:
          'Heavy snow, ice, and lake-effect bands (often from Lake Ontario or regional systems) can erase legal curb space and slow open carries. Weather holds matter more here than on Long Island.',
      },
      {
        title: 'Syracuse University and medical anchors spike calendars',
        detail:
          'Campus and hospital-related turnover concentrates demand around August, January, and academic milestones. University Hill multi-family behaves differently from suburban SFH.',
      },
      {
        title: 'Intown means stairs and tight streets more than endless towers',
        detail:
          'Strathmore, Westcott, Eastwood, and similar neighborhoods often feature multi-story homes, porches, and limited truck length — with selected downtown elevator product layered in.',
      },
      {
        title: 'Eastern suburbs vs northern and western town contrast',
        detail:
          'Dewitt, Manlius, Fayetteville, and Jamesville stack different access and pricing assumptions than Liverpool, Clay, Cicero, Camillus, or Onondaga Hill. One “Syracuse local” rate fails cross-town pairs.',
      },
      {
        title: 'I-81 / I-690 / I-481 rewrite portal time',
        detail:
          'Even all-county pairs can burn real clock time at peak or during construction eras. Price the drive, not the map radius.',
      },
      {
        title: 'Lake and hill towns add empty miles',
        detail:
          'Skaneateles-edge, Tully, Spafford, and southern hill approaches include longer runs, grades, and weather exposure that intown crews may under-model.',
      },
      {
        title: 'This is not NYC overflow pricing',
        detail:
          'Co-op density, LIRR villages, and Manhattan multi-stops are the wrong mental model. Onondaga jobs price on stairs, snow, suburban volume, and central NY corridors.',
      },
      {
        title: 'Intrastate NY rules vs interstate authority',
        detail:
          'Moves entirely within New York are generally subject to NYSDOT household-goods frameworks. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Onondaga access zones',
  zonesIntro:
    'Plan by Syracuse intown, University Hill/downtown, eastern suburbs, Liverpool/Clay north, western towns, and southern lake/hill edges — winter access and empty miles cluster by zone.',
  zones: [
    {
      id: 'syracuse-intown',
      name: 'Syracuse intown: Strathmore, Westcott, Eastwood & Valley',
      shortName: 'Syracuse intown',
      neighborhoods: [
        'Strathmore',
        'Westcott',
        'Eastwood',
        'Valley',
        'Tipperary Hill',
        'Northside edges',
      ],
      housingTypes:
        'Older multi-story SFH, doubles and multi-family, porches and stairs, limited mid-rise product',
      challenges: [
        'Stairs, long carries, and narrow residential streets',
        'Snowbank curb loss in winter',
        'Student-adjacent turnover in Westcott-band pockets',
        'Limited legal truck length after parking restrictions',
      ],
      moverTips:
        'Photo stairs, porch width, and curb options. Prefer mid-week morning starts. Build winter contingency into December–March jobs. Confirm temporary no-parking signs early.',
      cityKeywords: [
        'syracuse',
        'strathmore',
        'westcott',
        'eastwood',
        'valley',
        'tipperary hill',
      ],
    },
    {
      id: 'university-downtown',
      name: 'University Hill, Downtown & Armory Square edges',
      shortName: 'University / Downtown',
      neighborhoods: [
        'University Hill',
        'Downtown Syracuse',
        'Armory Square',
        'Near Westside edges',
        'Hawley-Green edges',
        'Medical campus corridors',
      ],
      housingTypes:
        'Student multi-family, mid-rises, lofts, renovated commercial product, limited older multi-story',
      challenges: [
        'Elevator/COI rules and dock constraints on selected buildings',
        'August and semester-start congestion',
        'Event and downtown traffic peaks',
        'Winter ice on open loading areas',
      ],
      moverTips:
        'Get building packets early. Lock August university windows. Share dock and truck-height photos. Prefer mid-week freight windows when housing allows.',
      cityKeywords: [
        'university hill',
        'downtown syracuse',
        'armory square',
        'hawley-green',
        'near westside',
      ],
    },
    {
      id: 'eastern-suburbs',
      name: 'Eastern suburbs: Dewitt, Manlius, Fayetteville & Jamesville',
      shortName: 'Eastern suburbs',
      neighborhoods: [
        'Dewitt',
        'Manlius',
        'Fayetteville',
        'Jamesville',
        'East Syracuse edges',
        'Minoa edges',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, townhomes, multi-family near commercial spines',
      challenges: [
        'I-481 / Genesee Street / local arterial congestion',
        'HOA truck hours and COI packets',
        'Family SFH Saturday demand',
        'Longer portal time to Liverpool or Camillus',
      ],
      moverTips:
        'Collect HOA packets early. Price cross-town pairs with peak buffers. Book summer Saturdays ahead. Survey estate and larger-lot drives separately from tract SFH.',
      cityKeywords: [
        'dewitt',
        'manlius',
        'fayetteville',
        'jamesville',
        'east syracuse',
        'minoa',
      ],
    },
    {
      id: 'liverpool-clay',
      name: 'Northern suburbs: Liverpool, Clay, Cicero & North Syracuse',
      shortName: 'Liverpool / Clay',
      neighborhoods: [
        'Liverpool',
        'Clay',
        'Cicero',
        'North Syracuse',
        'Bayberry edges',
        'Brewerton edges',
      ],
      housingTypes:
        'Suburban SFH tracts, multi-family, townhomes, some HOA pockets, lake-adjacent product',
      challenges: [
        'I-81 / Route 31 / local connector congestion',
        'Longer empty miles from eastern suburb staging',
        'Winter wind and lake-effect exposure north of the city',
        'Family volume peaks in summer',
      ],
      moverTips:
        'Never price Cicero ↔ Manlius as a free short hop without traffic buffer. Allow weather holds in lake-effect bands. Confirm HOA rules in planned pockets.',
      cityKeywords: [
        'liverpool',
        'clay',
        'cicero',
        'north syracuse',
        'bayberry',
        'brewerton',
      ],
    },
    {
      id: 'western-towns',
      name: 'Western towns: Camillus, Onondaga Hill, Solvay & Fairmount',
      shortName: 'Western towns',
      neighborhoods: [
        'Camillus',
        'Onondaga Hill',
        'Solvay',
        'Fairmount',
        'Westvale edges',
        'Marcellus edges',
      ],
      housingTypes:
        'Suburban SFH, hill-side lots, multi-family pockets, village homes',
      challenges: [
        'Hills and driveway grades on Onondaga Hill approaches',
        'I-690 / local arterial congestion',
        'Winter ice on grades',
        'Cross-zone pairs into eastern suburbs',
      ],
      moverTips:
        'Photo driveway pitch and street width on hill jobs. Prefer smaller trucks or shuttles when grades are steep. Build 690 buffers for east–west pairs.',
      cityKeywords: [
        'camillus',
        'onondaga hill',
        'solvay',
        'fairmount',
        'westvale',
        'marcellus',
      ],
    },
    {
      id: 'southern-lake-hills',
      name: 'Southern lake & hill edges: Skaneateles, Tully & LaFayette',
      shortName: 'South lake / hills',
      neighborhoods: [
        'Skaneateles edges',
        'Tully',
        'LaFayette',
        'Pompey edges',
        'Otisco edges',
        'Spafford edges',
      ],
      housingTypes:
        'Village and rural SFH, larger lots, waterfront and hill homes, limited multi-family',
      challenges: [
        'Long empty miles from Syracuse staging',
        'Winding roads and winter grades',
        'Seasonal tourist traffic near Skaneateles',
        'Limited crew density compared with first-ring suburbs',
      ],
      moverTips:
        'Never absorb south-lake distance into a flat city rate. Survey approach roads after storms. Prefer mid-week windows in peak tourist months near the village.',
      cityKeywords: [
        'skaneateles',
        'tully',
        'lafayette',
        'pompey',
        'otisco',
        'spafford',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Onondaga moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Stairs, winter delays, university peaks, and cross-town portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Stairs, porches & older multi-story stock',
        detail:
          'Intown Syracuse multi-story homes and doubles raise labor minutes per item even without tower soft costs.',
      },
      {
        title: 'Winter weather delays & curb loss',
        detail:
          'Snow, ice, and plow berms add contingency time and sometimes reschedule costs November–March.',
      },
      {
        title: 'University multi-family soft costs',
        detail:
          'Building packets, elevator reservations, and semester collisions add time before loading starts on University Hill jobs.',
      },
      {
        title: 'Cross-town I-81 / I-690 / I-481 portal time',
        detail:
          'Eastern suburbs ↔ Liverpool or Camillus pairs can burn more clock than map miles suggest.',
      },
      {
        title: 'Southern lake/hill empty miles',
        detail:
          'Skaneateles-edge and Tully-band runs add drive time and weather exposure from city staging.',
      },
      {
        title: 'Family SFH peak demand',
        detail:
          'June–August suburban Saturdays tighten crew availability across Dewitt, Manlius, Clay, and Camillus corridors.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$420–$1,250+',
        note: 'Higher with stairs, elevators, or winter access friction',
      },
      {
        label: '2–3BR multi-family or modest SFH',
        value: '$1,300–$3,500+',
        note: 'Stairs and cross-town portal time trend up',
      },
      {
        label: '3–4+ BR / suburban SFH / lake-edge cross-zone',
        value: '$2,200–$5,800+',
        note: 'Larger SFH volume and long southern pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$170+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Onondaga move',
    intro:
      'University calendars, family summer peaks, heavy winters, and highway construction windows all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce I-81/I-690 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Syracuse University peaks',
        detail:
          'August move-in and semester transitions spike University Hill multi-family demand. Reserve elevators and crews early.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Suburban SFH Saturdays fill for school-year timing. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Winter snow and ice contingency',
        detail:
          'December–March jobs need weather holds, early starts, and mats/salt time. Northern towns can see lake-effect bands.',
      },
      {
        title: 'Skaneateles summer tourist peaks',
        detail:
          'Village curb space tightens on summer weekends. Prefer mid-week for lake-edge addresses when flexible.',
      },
      {
        title: 'Highway construction eras',
        detail:
          'I-81 and related corridor projects can change preferred truck routes for years. Reconfirm approaches the week of the move.',
      },
    ],
  },
  specialized: [
    {
      id: 'su-winter',
      title: 'University Hill & winter access module',
      intro:
        'Syracuse-area multi-family and winter jobs fail on academic calendars, elevators, and snow more often than on box count alone.',
      bullets: [
        'Book August and mid-month academic windows early near University Hill.',
        'Request building move packets (COI, elevator hours, dock rules) at lease signing.',
        'Build written weather contingency into November–March estimates.',
        'Confirm plow berm clearance and parking ban status before trucks roll.',
        'Survey walk-up multi-family and tower product as different jobs.',
      ],
    },
    {
      id: 'cross-town-suburbs',
      title: 'City–suburb & lake/hill empty-mile module',
      intro:
        'Onondaga’s spread from intown Syracuse to Clay, Manlius, and Skaneateles-edge towns makes many “local” pairs real drive-time jobs.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides I-81, I-690, or I-481.',
        'Collect HOA packets for eastern suburban planned communities early.',
        'Photo hill grades on Onondaga Hill and southern approaches.',
        'Never absorb south-lake empty miles into a flat city rate.',
        'Confirm NYSDOT vs FMCSA authority when any leg leaves New York State.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Onondaga County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, city vs suburb lifestyle — then verify on district and hospital sites. Central NY is not downstate.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 spans Syracuse City School District and many suburban districts (Westhill, Westhill-adjacent systems, Fayetteville-Manlius, Jamesville-Dewitt, Liverpool, North Syracuse, and others). Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm the specific district for each address. City and suburban systems differ sharply; neighborhood marketing names do not guarantee a campus.',
          },
          {
            title: 'Higher education anchors',
            detail:
              'Syracuse University, SUNY ESF, Upstate Medical, Le Moyne, and other campuses shape rental demand and traffic. Factor academic calendars near campus corridors.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, NYSED data, and campus visits beat ranking screenshots alone.',
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
              'Upstate University Hospital, St. Joseph’s Health, Crouse Hospital, and affiliated facilities dominate regional care. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times from Clay or Manlius to preferred facilities. Transfer records early — medical and university employment are common relocation drivers.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'City stock vs suburban tracts',
            detail:
              'Expect older multi-story homes intown; student multi-family near University Hill; larger SFH tracts in eastern and northern suburbs; village and rural product toward the lakes and hills.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and taxes vary by city neighborhood vs Manlius-band or lake-edge addresses. Budget for winter heating and snow-related home costs.',
          },
          {
            title: 'HOA and multi-family rules',
            detail:
              'Planned communities and downtown buildings may control move hours and truck size. Read documents before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Onondaga areas fit whom',
        bullets: [
          {
            title: 'Syracuse intown lifestyle',
            detail:
              'Westcott, Strathmore, and downtown-adjacent areas suit people prioritizing urban amenities and shorter campus access — with stairs and winter curb tradeoffs.',
          },
          {
            title: 'Eastern suburban pattern',
            detail:
              'Dewitt, Manlius, and Fayetteville often appeal for schools and services — with higher housing costs and HOA logistics in some pockets.',
          },
          {
            title: 'Northern and lake patterns',
            detail:
              'Liverpool, Clay, Cicero, and Skaneateles-edge living offer varied lot sizes and recreation access — with cross-town commute tradeoffs.',
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
              'Healthcare, higher education, government, logistics (central NY distribution), and professional services shape local employment more than NYC corporate spillover.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. Winter driving and I-81/I-690 peaks are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Central New York identity',
            detail:
              'Onondaga is a Finger Lakes–adjacent metro with university culture and real winters — not a suburb of New York City or a Long Island twin.',
          },
          {
            title: 'Climate',
            detail:
              'Cold snowy winters, warm summers, and lake-effect risk. Plan outdoor staging and snow removal as part of move-in readiness.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Campus energy and downtown events contrast with quieter lake villages. Visit in both summer and winter when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Onondaga resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Onondaga County — official site',
        href: 'https://www.ongov.net/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Syracuse',
        href: 'https://www.syr.gov/',
        external: true,
      },
      {
        label: 'Town of Manlius',
        href: 'https://www.townofmanlius.org/',
        external: true,
      },
      {
        label: 'Town of Clay',
        href: 'https://www.townofclay.org/',
        external: true,
      },
      {
        label: 'NY 511 — traffic & winter conditions',
        href: 'https://www.511ny.org/',
        external: true,
        note: 'I-81, I-690, I-481, and winter advisories before load windows',
      },
      {
        label: 'NYSDOT — motor carriers & household goods',
        href: 'https://www.dot.ny.gov/',
        external: true,
        note: 'Start with NYSDOT for intrastate New York household-goods frameworks',
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        external: true,
        note: 'Required when the move crosses state lines',
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
      {
        label: 'All New York local mover guides',
        href: '/local-movers/new-york',
      },
    ],
  },
  directoryHint:
    'Prefer crews with Syracuse multi-story stair experience for intown jobs; university multi-family fluency for University Hill; honest cross-town I-81/I-690 timing; winter access planning for November–March. Verify NYSDOT for in-state moves and FMCSA for interstate legs. This is Central NY — not NYC overflow.',
  lastReviewed: '2026-07-23',
};
