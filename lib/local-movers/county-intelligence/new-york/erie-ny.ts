import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Erie County, New York moving intelligence.
 * Differentiators: Buffalo metro, lake-effect winter weather, first-ring suburbs and
 * Southtowns — NOT NYC, Long Island, or downstate co-op patterns.
 */
export const erieCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-york',
  countySlug: 'erie',
  hubTitle: 'Erie County Moving Intelligence Hub',
  eyebrow: 'Erie · Buffalo metro, lake-effect winters & Southtowns',
  h1: 'Moving in Erie County: Buffalo Access, Lake-Effect Winters & Southtowns Guide',
  heroOpener:
    'Erie County is Western New York’s Buffalo metro — not a downstate footnote. Intown Buffalo has older multi-story homes, narrow snow-season streets, and elevator buildings downtown; first-ring suburbs stretch through Amherst, Cheektowaga, and Tonawanda; the Southtowns (Orchard Park, Hamburg, West Seneca, East Aurora) stack family SFH volume and different empty-mile math; lake-effect snow can erase a move day with little warning. A downtown loft, an Elmwood Village walk-up, an Amherst HOA ranch, and a Hamburg colonial do not share truck access or weather risk. I-90, I-190, the 33, and the 219 rewrite “local” estimates that ignore snow windows and suburban distance. This hub is for people actually moving in Erie — not recycled NYC co-op tips with Buffalo place names swapped in.',
  heroCredibility:
    'NYSDOT household goods for intrastate New York moves · FMCSA for interstate legs · Buffalo metro & lake-effect winter awareness · Curated directory listings',
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
    title: 'What makes moving in Erie County different',
    intro:
      'These are Erie / Buffalo realities — lake-effect winters, intown vs Southtowns contrast, and Western NY corridors — not interchangeable downstate or Long Island boilerplate.',
    bullets: [
      {
        title: 'Lake-effect snow is a logistics risk, not color commentary',
        detail:
          'November through March can bring sudden whiteouts, street parking bans, and driveway freeze that slow carries and strand trucks. Flexible weather holds and early starts matter more here than on Long Island.',
      },
      {
        title: 'Buffalo intown is multi-story and curb-constrained',
        detail:
          'Elmwood Village, Allentown, North Buffalo, and South Buffalo often mean porches, stairs, narrow streets, and limited legal truck length — especially after snowbanks form.',
      },
      {
        title: 'Downtown and waterfront vertical product exists',
        detail:
          'Canalside-adjacent and downtown multi-family buildings can require elevator reservations, COI packets, and dock rules. Treat them as building jobs, not generic “Buffalo local.”',
      },
      {
        title: 'First-ring suburbs vs Southtowns distance',
        detail:
          'Amherst, Cheektowaga, and Tonawanda are dense suburban belts. Orchard Park, Hamburg, East Aurora, and rural south edges add empty miles and different crew staging assumptions under one county name.',
      },
      {
        title: 'Thruway and local expressway congestion still bites',
        detail:
          'I-90, I-190, NY-33 (Kensington), and the 219 create peak bottlenecks between city and suburbs. Cross-zone pairs need honest portal time even without NYC traffic myths.',
      },
      {
        title: 'University and medical calendars shape demand',
        detail:
          'UB (North and South campuses), Canisius, and major hospital systems drive lease turnover spikes that fill calendars around August and academic starts.',
      },
      {
        title: 'This is not NYC overflow pricing',
        detail:
          'Co-op density, LIRR villages, and Manhattan multi-stops are the wrong mental model. Erie jobs price on stairs, snow, suburban volume, and regional WNY pairs — not Fort Lee elevator packets.',
      },
      {
        title: 'Intrastate NY rules vs interstate authority',
        detail:
          'Moves entirely within New York are generally subject to NYSDOT household-goods frameworks. Legs into Pennsylvania, Ohio, or Canada-adjacent interstate patterns need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Erie access zones',
  zonesIntro:
    'Plan by Buffalo intown, downtown/waterfront, Amherst/Tonawanda north suburbs, Cheektowaga/Airport east, and Southtowns — winter access and empty miles cluster by zone.',
  zones: [
    {
      id: 'buffalo-intown',
      name: 'Buffalo intown: Elmwood, Allentown, North & South Buffalo',
      shortName: 'Buffalo intown',
      neighborhoods: [
        'Elmwood Village',
        'Allentown',
        'North Buffalo',
        'Parkside',
        'South Buffalo',
        'Black Rock / Riverside edges',
      ],
      housingTypes:
        'Older multi-story SFH, doubles and multi-family, porches and stairs, limited mid-rise multi-unit',
      challenges: [
        'Stairs, long carries, and narrow residential streets',
        'Snowbank curb loss in winter',
        'Limited legal truck length after parking bans',
        'High-volume student and young-professional turnover pockets',
      ],
      moverTips:
        'Photo stairs, porch width, and street parking options. Prefer mid-week morning starts. Build winter contingency into December–March jobs. Confirm temporary no-parking signs early.',
      cityKeywords: [
        'buffalo',
        'elmwood',
        'allentown',
        'north buffalo',
        'parkside',
        'south buffalo',
        'black rock',
      ],
    },
    {
      id: 'downtown-waterfront',
      name: 'Downtown Buffalo, Canalside & waterfront multi-family',
      shortName: 'Downtown / waterfront',
      neighborhoods: [
        'Downtown Buffalo',
        'Canalside edges',
        'Larkin District edges',
        'Cobblestone edges',
        'Medical Campus edges',
        'Harbor / waterfront corridors',
      ],
      housingTypes:
        'High-rises and mid-rises, lofts, renovated industrial product, limited older multi-story',
      challenges: [
        'Elevator/COI rules and dock constraints',
        'Event and waterfront traffic peaks',
        'Garage height limits on some buildings',
        'Winter wind and ice on open docks',
      ],
      moverTips:
        'Get building packets early. Reserve freight elevators in writing. Share dock and truck-height photos. Avoid major event start times when flexible.',
      cityKeywords: [
        'downtown buffalo',
        'canalside',
        'larkin',
        'cobblestone',
        'medical campus',
        'waterfront',
      ],
    },
    {
      id: 'amherst-tonawanda',
      name: 'North suburbs: Amherst, Williamsville, Tonawanda & Kenmore',
      shortName: 'Amherst / Tonawanda',
      neighborhoods: [
        'Amherst',
        'Williamsville',
        'Getzville edges',
        'Tonawanda',
        'North Tonawanda edges (verify county)',
        'Kenmore',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, multi-family near UB North, townhomes, commercial-corridor multi-unit',
      challenges: [
        'UB move-in/out spikes',
        'I-290 / Niagara Falls Boulevard congestion',
        'HOA truck hours and COI packets',
        'Lake-effect impacts on open suburban streets',
      ],
      moverTips:
        'Lock August university windows early. Collect HOA packets for planned communities. Build 290-corridor buffers. Price UB-adjacent multi-family separately from driveway SFH.',
      cityKeywords: [
        'amherst',
        'williamsville',
        'getzville',
        'tonawanda',
        'kenmore',
        'ub north',
      ],
    },
    {
      id: 'cheektowaga-airport',
      name: 'East side suburbs: Cheektowaga, Depew, Lancaster & airport band',
      shortName: 'Cheektowaga / east',
      neighborhoods: [
        'Cheektowaga',
        'Depew',
        'Lancaster',
        'Sloan edges',
        'Airport corridor',
        'Bowmansville edges',
      ],
      housingTypes:
        'Post-war and later SFH tracts, multi-family, airport-adjacent product, some HOA pockets',
      challenges: [
        'I-90 / Walden / Genesee corridor congestion',
        'Airport-area traffic and hotel peaks',
        'Winter wind exposure on open lots',
        'Family SFH Saturday demand',
      ],
      moverTips:
        'Price Thruway and airport-adjacent pairs with peak buffers. Book summer Saturdays early. Confirm HOA rules in newer villages. Allow weather holds in lake-effect bands.',
      cityKeywords: [
        'cheektowaga',
        'depew',
        'lancaster',
        'sloan',
        'bowmansville',
        'airport',
      ],
    },
    {
      id: 'southtowns',
      name: 'Southtowns: Orchard Park, Hamburg, West Seneca & East Aurora',
      shortName: 'Southtowns',
      neighborhoods: [
        'Orchard Park',
        'Hamburg',
        'West Seneca',
        'East Aurora',
        'Blasdell edges',
        'Boston / Colden edges',
      ],
      housingTypes:
        'Family SFH tracts, larger lots, village cores, limited multi-family, rural-edge product',
      challenges: [
        'Longer empty miles from intown Buffalo staging',
        'US-219 and local arterial peaks',
        'Game-day traffic near Orchard Park stadium corridors',
        'Winter hills and longer driveway carries',
      ],
      moverTips:
        'Never price Southtowns ↔ downtown as a free short hop without traffic and distance buffer. Avoid Bills home-game windows near stadium approaches when flexible. Survey long rural drives early.',
      cityKeywords: [
        'orchard park',
        'hamburg',
        'west seneca',
        'east aurora',
        'blasdell',
        'boston',
        'colden',
      ],
    },
    {
      id: 'lackawanna-south-buffalo',
      name: 'Lackawanna, First Ward edges & industrial south corridors',
      shortName: 'Lackawanna / south industrial',
      neighborhoods: [
        'Lackawanna',
        'First Ward edges',
        'Seneca corridor edges',
        'Steel plant–adjacent neighborhoods',
        'Blasdell industrial edges',
        'Hamburg border corridors',
      ],
      housingTypes:
        'Older SFH, multi-family, industrial-adjacent housing, mixed commercial corridors',
      challenges: [
        'Truck-route and industrial traffic mix',
        'Older street grids and limited staging',
        'Winter access after plow berms form',
        'Cross-zone pairs into Southtowns or downtown',
      ],
      moverTips:
        'Confirm street width and legal staging. Prefer early weekday starts near industrial corridors. Build winter contingency. Clarify city vs town addresses.',
      cityKeywords: [
        'lackawanna',
        'first ward',
        'seneca',
        'blasdell',
        'south buffalo',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Erie moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Stairs, winter delays, and city–Southtowns portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Stairs, porches & long carries in older stock',
        detail:
          'Buffalo multi-story homes and doubles raise labor minutes per item even without elevator soft costs.',
      },
      {
        title: 'Lake-effect weather delays & winter access',
        detail:
          'Snow bans, ice, and whiteouts add contingency time and sometimes reschedule costs November–March.',
      },
      {
        title: 'Downtown elevator & dock soft costs',
        detail:
          'Building packets and reserved elevators add time before loading starts on waterfront and tower jobs.',
      },
      {
        title: 'City ↔ suburb / Southtowns portal time',
        detail:
          'I-90, I-190, 33, and 219 peaks stretch intown ↔ Amherst or Orchard Park pairs beyond map miles.',
      },
      {
        title: 'University and family peak demand',
        detail:
          'August UB turnover and June–August family SFH Saturdays tighten crew availability and weekend pricing.',
      },
      {
        title: 'Cross-border regional patterns',
        detail:
          'Erie ↔ Niagara, Chautauqua, or out-of-state PA/OH legs need honest distance and correct NYSDOT vs FMCSA authority.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,300+',
        note: 'Higher with stairs, elevators, or winter access friction',
      },
      {
        label: '2–3BR multi-family or modest SFH',
        value: '$1,400–$3,800+',
        note: 'Stairs and cross-zone portal time trend up',
      },
      {
        label: '3–4+ BR / Southtowns SFH / cross-zone',
        value: '$2,400–$6,500+',
        note: 'Larger SFH volume and long suburban pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$110–$175+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule an Erie move',
    intro:
      'Lake-effect winters, university calendars, family summer peaks, and stadium or waterfront events all reshape access and crew availability.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce expressway pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Lake-effect season: plan flexibility',
        detail:
          'November–March jobs need weather holds, early starts, and sometimes shovel/salt time before carries. Do not assume downstate winter mildness.',
      },
      {
        title: 'UB and student peaks',
        detail:
          'August move-in and May move-out spike Amherst and intown multi-family demand. Book elevators and crews early.',
      },
      {
        title: 'Peak family season: May–August',
        detail:
          'Southtowns and first-ring SFH Saturdays fill for school-year timing. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Stadium and waterfront event days',
        detail:
          'Orchard Park game days and downtown waterfront events can erase curb access. Cross-check calendars for dock-dependent jobs.',
      },
      {
        title: 'Spring thaw and street repairs',
        detail:
          'Potholes and temporary construction after winter can change truck routes. Reconfirm approaches the week of the move.',
      },
    ],
  },
  specialized: [
    {
      id: 'lake-effect-winter',
      title: 'Lake-effect winter & snow-access module',
      intro:
        'Erie jobs fail on weather, parking bans, and icy carries more often than on box count — especially November through March.',
      bullets: [
        'Build written weather contingency into winter estimates (delay windows, not just hope).',
        'Confirm street parking ban status and plow berm clearance before trucks roll.',
        'Budget mats, salt, and slower carry rates on ice.',
        'Prefer earliest legal starts after overnight snow events.',
        'Photograph driveway and curb conditions the morning of for disputed access claims.',
      ],
    },
    {
      id: 'buffalo-southtowns',
      title: 'Buffalo intown vs Southtowns / suburb module',
      intro:
        'Erie’s length from downtown to the Southtowns makes many “local” pairs real drive-time jobs with different housing product at each end.',
      bullets: [
        'Price portal-to-portal time honestly for any pair that rides I-90, I-190, NY-33, or US-219.',
        'Survey stairs and porches carefully on intown doubles and multi-story SFH.',
        'Collect HOA packets for Amherst and planned suburban communities early.',
        'Avoid stadium approach windows near Orchard Park when flexible.',
        'Confirm NYSDOT vs FMCSA authority when any leg leaves New York State.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Erie County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, city vs Southtowns lifestyle — then verify on district and hospital sites. Western NY is not downstate.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Public K–12 spans Buffalo Public Schools and many suburban districts (Amherst, Williamsville, Orchard Park, Hamburg, and others). Assignment is address-based.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Confirm the specific district for each address. City and suburban systems differ sharply; neighborhood marketing names do not guarantee a campus.',
          },
          {
            title: 'Higher education anchors',
            detail:
              'University at Buffalo, Canisius, Buffalo State, and other campuses shape rental demand and traffic. Factor academic calendars near campus corridors.',
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
              'Kaleida Health (including Buffalo General), Catholic Health, Roswell Park, Erie County Medical Center, and suburban facilities serve different corridors. Confirm networks and specialties for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour and winter drive times from Southtowns or Amherst to preferred facilities. Transfer records early.',
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
              'Expect older multi-story homes and doubles intown; more ranch and colonial SFH in first-ring suburbs and Southtowns; growing multi-family downtown.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and taxes vary by city neighborhood vs Williamsville-band or Southtowns addresses. Budget for winter heating and snow-related home costs.',
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
        title: 'Which Erie areas fit whom',
        bullets: [
          {
            title: 'Buffalo intown lifestyle',
            detail:
              'Elmwood, Allentown, and similar neighborhoods suit people prioritizing walkable amenities and shorter urban access — with stairs and winter curb tradeoffs.',
          },
          {
            title: 'North suburban pattern',
            detail:
              'Amherst, Williamsville, and Tonawanda often appeal for schools, services, and UB proximity — with expressway commute patterns.',
          },
          {
            title: 'Southtowns pattern',
            detail:
              'Orchard Park, Hamburg, and East Aurora corridors can offer larger lots and village character — with longer intown drive times.',
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
              'Healthcare, education, advanced manufacturing, logistics, finance/insurance, and government shape local employment more than NYC corporate spillover.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent outside limited metro corridors. Winter driving and I-90/I-190 peaks are real. Test drive peak and snow-condition routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Western New York identity',
            detail:
              'Erie is a Great Lakes metro with its own food culture, sports calendar, and winter reality — not a suburb of Manhattan or a Long Island twin.',
          },
          {
            title: 'Climate',
            detail:
              'Lake-effect snow, cold winters, warm humid summers. Plan outdoor staging and snow removal as part of move-in readiness.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Intown arts and neighborhoods contrast with quieter Southtowns villages. Visit in both summer and deep winter when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Erie resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Erie County — official site',
        href: 'https://www3.erie.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Buffalo',
        href: 'https://www.buffalony.gov/',
        external: true,
      },
      {
        label: 'Town of Amherst',
        href: 'https://www.amherst.ny.us/',
        external: true,
      },
      {
        label: 'Town of Orchard Park',
        href: 'https://www.orchardparkny.org/',
        external: true,
      },
      {
        label: 'NY 511 — traffic & winter conditions',
        href: 'https://www.511ny.org/',
        external: true,
        note: 'I-90, I-190, and lake-effect advisories before load windows',
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
    'Prefer crews with Buffalo multi-story stair experience for intown jobs; elevator/dock fluency for downtown towers; honest city–Southtowns timing; winter access planning for November–March. Verify NYSDOT for in-state moves and FMCSA for interstate legs. This is Western NY — not NYC overflow.',
  lastReviewed: '2026-07-23',
};
