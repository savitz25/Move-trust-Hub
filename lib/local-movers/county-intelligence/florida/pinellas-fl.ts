import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Pinellas County, Florida moving intelligence.
 * Differentiators: peninsula / bridges, beach vs inland, older housing stock —
 * not Hillsborough growth-corridor or Pasco north-suburb patterns alone.
 */
export const pinellasCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'florida',
  countySlug: 'pinellas',
  hubTitle: 'Pinellas County Moving Intelligence Hub',
  eyebrow: 'Pinellas · Peninsula bridges & beach–inland split',
  h1: 'Moving in Pinellas County: Beach Towns, Bridges & Older-Stock Zone Guide',
  heroOpener:
    'Pinellas is a peninsula market: barrier-island and beach-town access on one side, denser inland grids and older housing stock on the other, all tied to Hillsborough by bridges that rewrite “short local” timing. St. Pete mid-rises and downtown docks need COI packets; Pass-a-Grille, Clearwater Beach, and Sand Key mean causeways, tourist curb scarcity, and storm exposure; Largo, Pinellas Park, and north-county corridors flip to mid-century SFH, HOA pockets, and US-19 congestion. This hub is for people actually moving in Pinellas — not generic Tampa Bay tips recycled from Brandon growth tracts.',
  heroCredibility:
    'FDACS Ch. 507 for intrastate Florida moves · FMCSA for interstate legs · Bridge & beach-access awareness · Curated directory listings',
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
    title: 'What makes moving in Pinellas County different',
    intro:
      'These are Pinellas realities — peninsula bridges, beach staging, and older stock — not interchangeable “Tampa Bay suburb” boilerplate.',
    bullets: [
      {
        title: 'Peninsula geography makes bridges part of the job plan',
        detail:
          'Howard Frankland, Gandy, Courtney Campbell, and beach causeways control portal-to-portal time for any pair that leaves the peninsula or reaches barrier islands. Peak bridge traffic can double a short-looking hop.',
      },
      {
        title: 'Beach towns and inland grids are different access problems',
        detail:
          'Clearwater Beach, Treasure Island, Madeira Beach, and St. Pete Beach staging is not the same job as a Largo cul-de-sac or Pinellas Park ranch. Name both ends of the move on the estimate.',
      },
      {
        title: 'Older housing stock means stairs, tight turns, and long carries',
        detail:
          'Much of central and southern Pinellas is mid-century and earlier SFH, duplexes, and low-rise multi-family. Smaller trucks and careful stair work beat forcing a 26′ trailer onto a narrow beach block or older grid.',
      },
      {
        title: 'Tourism seasons erase curb space on the barrier islands',
        detail:
          'Peak winter and spring break tourism fill beach parking and slow causeways. Mid-week mornings outperform Saturday beach load-ins when association rules allow.',
      },
      {
        title: 'Condos and mid-rises cluster on the coast and downtown St. Pete',
        detail:
          'Elevator reservations, COI packets, and fixed move windows are common in beach towers and downtown St. Petersburg product. Treat building rules as operational constraints.',
      },
      {
        title: 'Flood and storm exposure is real on barrier and bay parcels',
        detail:
          'FEMA flood-mapped addresses, elevated homes, and salt-air staging need moisture protection and hurricane-season contingency language.',
      },
      {
        title: 'Cross-bay pairs with Hillsborough are routine',
        detail:
          'Many households move Pinellas ↔ Tampa. Price bridge timing honestly; keep FDACS Ch. 507 frameworks for in-state-only work and FMCSA when any leg leaves Florida.',
      },
      {
        title: 'Intrastate Florida rules vs interstate authority',
        detail:
          'Moves entirely within Florida are generally subject to Florida Statutes Chapter 507 household-mover frameworks administered by FDACS. Interstate legs need active FMCSA USDOT (and usually MC) authority.',
      },
    ],
  },
  zonesHeading: 'Pinellas access zones',
  zonesIntro:
    'Plan by St. Pete core, beach barrier chain, central inland, Clearwater corridor, and north county — bridges and older stock change the playbook by zone.',
  zones: [
    {
      id: 'st-pete-core',
      name: 'St. Petersburg core & downtown',
      shortName: 'St. Pete Core',
      neighborhoods: [
        'Downtown St. Petersburg',
        'Old Northeast',
        'Kenwood',
        'Historic Roser Park',
        'Grand Central / Edge Districts',
        'Snell Isle edges',
      ],
      housingTypes:
        'Mid-rises and condos, historic bungalows, multi-story SFH, multi-family, redevelopment product',
      challenges: [
        'Elevator/COI rules in downtown and waterfront towers',
        'Tight historic grids and limited staging',
        'Event traffic near the waterfront',
        'Bridge approaches for cross-bay legs',
      ],
      moverTips:
        'Get building packets early for downtown towers. Photo street width in Old Northeast and Kenwood. Prefer mid-week mornings. Avoid major festival weekends when flexible.',
      cityKeywords: [
        'st petersburg',
        'st. petersburg',
        'saint petersburg',
        'kenwood',
        'old northeast',
        'snell isle',
      ],
    },
    {
      id: 'beach-barrier',
      name: 'Beach barrier chain: Pass-a-Grille to Clearwater Beach',
      shortName: 'Beach Barrier',
      neighborhoods: [
        'St. Pete Beach',
        'Pass-a-Grille',
        'Treasure Island',
        'Madeira Beach',
        'Redington / North Redington',
        'Indian Shores / Indian Rocks',
        'Clearwater Beach',
        'Sand Key',
      ],
      housingTypes:
        'Beach condos and mid-rises, older beach cottages, walk-ups, some elevated homes, tourist-oriented multi-family',
      challenges: [
        'Causeway timing and tourist curb scarcity',
        'Elevator/COI rules in beach towers',
        'Narrow sand-adjacent streets and truck length limits',
        'Storm, flood, and salt-air staging',
      ],
      moverTips:
        'Build causeway buffer into start times. Reserve elevators early. Measure truck length vs beach blocks. Protect floors and metal goods from sand and salt. Prefer mid-week off-peak tourism days.',
      cityKeywords: [
        'st pete beach',
        'treasure island',
        'madeira beach',
        'clearwater beach',
        'indian rocks',
        'redington',
        'sand key',
      ],
    },
    {
      id: 'central-inland',
      name: 'Central inland: Largo, Pinellas Park, Seminole & Kenneth City',
      shortName: 'Central Inland',
      neighborhoods: [
        'Largo',
        'Pinellas Park',
        'Seminole',
        'Kenneth City',
        'South Highpoint edges',
        'Bardmoor edges',
      ],
      housingTypes:
        'Mid-century SFH, ranch stock, townhomes, multi-family, some HOA pockets and mobile-home communities',
      challenges: [
        'US-19 / Park / Ulmerton arterial congestion',
        'Older stairs and long carries from curb',
        'Mixed HOA and open-street rules',
        'Cross-zone pairs to beaches or St. Pete core',
      ],
      moverTips:
        'Survey curb depth and driveway width on mid-century lots. Price beach ↔ inland pairs with honest portal time. Mid-week mornings reduce US-19 friction.',
      cityKeywords: [
        'largo',
        'pinellas park',
        'seminole',
        'kenneth city',
        'highpoint',
        'bardmoor',
      ],
    },
    {
      id: 'clearwater-corridor',
      name: 'Clearwater, Dunedin & mid-north corridor',
      shortName: 'Clearwater Corridor',
      neighborhoods: [
        'Clearwater (mainland)',
        'Dunedin',
        'Safety Harbor',
        'Belleair / Belleair Bluffs',
        'Harbor Bluffs edges',
      ],
      housingTypes:
        'Mix of SFH, condos, waterfront pockets, downtown multi-story, HOA communities',
      challenges: [
        'Courtney Campbell / US-19 approaches',
        'Elevator rules near waterfront multi-unit',
        'Tourist spill from beach days into mainland arterials',
        'Older elevated and multi-story stock in places',
      ],
      moverTips:
        'Clarify beach vs mainland Clearwater addresses. Collect condo packets for waterfront multi-unit. Prefer early starts when Courtney Campbell is on the route.',
      cityKeywords: [
        'clearwater',
        'dunedin',
        'safety harbor',
        'belleair',
        'belleair bluffs',
      ],
    },
    {
      id: 'north-pinellas',
      name: 'North Pinellas: Palm Harbor, Tarpon Springs & East Lake',
      shortName: 'North Pinellas',
      neighborhoods: [
        'Palm Harbor',
        'Tarpon Springs',
        'East Lake',
        'Oldsmar edges',
        'Ozona / Crystal Beach edges',
      ],
      housingTypes:
        'Suburban SFH, HOA communities, waterfront pockets, multi-family along US-19, mix of older and newer stock',
      challenges: [
        'US-19 congestion and long north–south legs',
        'HOA gate lists in planned communities',
        'Distance from southern beach staging',
        'Cross-county pairs toward Pasco or Hillsborough',
      ],
      moverTips:
        'Price Tarpon / East Lake ↔ St. Pete Beach pairs as long locals. Collect HOA packets for East Lake villages. Confirm Pasco border addresses when relevant.',
      cityKeywords: [
        'palm harbor',
        'tarpon springs',
        'east lake',
        'oldsmar',
        'ozona',
        'crystal beach',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Pinellas moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Beach staging, bridge time, and older-stock carries separate lowball quotes from real costs.',
    drivers: [
      {
        title: 'Beach causeway staging & shuttles',
        detail:
          'Narrow barrier streets and tourist parking often require smaller trucks, shuttles, or long carries — especially peak season.',
      },
      {
        title: 'Bridge & cross-bay portal time',
        detail:
          'Howard Frankland, Gandy, Courtney Campbell, and beach causeways add billable time even when map miles look short.',
      },
      {
        title: 'Condo elevator and COI soft costs',
        detail:
          'Beach towers and downtown St. Pete multi-unit buildings add packet admin, elevator reservations, and pad requirements.',
      },
      {
        title: 'Older-stock stairs and tight grids',
        detail:
          'Bungalows, duplexes, and mid-century lots raise labor minutes per item vs new suburban drive-up access.',
      },
      {
        title: 'Tourism-season demand premiums',
        detail:
          'Winter and spring beach demand tightens Saturday capacity; last-minute crews price scarcity.',
      },
      {
        title: 'Storm and moisture protection',
        detail:
          'Barrier and flood-mapped moves may need extra wrap, weather holds, and contingency days in hurricane season.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple inland access)',
        value: '$450–$1,300+',
        note: 'Higher with beach staging, elevators, or peak tourism',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,550–$4,200+',
        note: 'Older-grid carries and beach shuttles trend up',
      },
      {
        label: '3–4+ BR / beach tower / cross-bay pair',
        value: '$2,700–$7,800+',
        note: 'Barrier towers and bridge pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$115–$190+/hr',
        note: 'Portal-to-portal; packing and larger crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Pinellas move',
    intro:
      'Tourism seasons, snowbird turnovers, summer storms, and daily bridge peaks all matter here.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday before 9 a.m. usually clear curb space and reduce bridge / US-19 pain. Avoid month-end Fridays when leases collide.',
      },
      {
        title: 'Peak beach demand: winter through spring break',
        detail:
          'Seasonal residents and tourism raise beach condo turnovers and curb scarcity. Book elevators and crews earlier for barrier addresses.',
      },
      {
        title: 'Shoulder seasons for beach access',
        detail:
          'Late spring after peak tourism and quieter fall weeks often improve barrier staging — still confirm association blackout dates.',
      },
      {
        title: 'Hurricane season: June–November',
        detail:
          'Barrier and bay parcels need flexible date language. Confirm weather reschedule policies before deposits.',
      },
      {
        title: 'Summer heat & afternoon storms',
        detail:
          'Prefer early starts; plan tarps for open beach loading. Heat and storms slow exterior carries on sand-adjacent streets.',
      },
    ],
  },
  specialized: [
    {
      id: 'beach-bridge-access',
      title: 'Beach barrier & bridge access module',
      intro:
        'Pinellas’s defining logistics problem is often causeway timing plus constrained beach staging — not a generic suburban driveway.',
      bullets: [
        'Build bridge and causeway buffer into every beach or cross-bay start time.',
        'Expect shuttle or smaller-truck language on barrier blocks until photos prove a full trailer fits.',
        'Reserve beach-tower elevators early and reconfirm the day before.',
        'Protect goods from sand and salt; plan dry staging on flood-mapped parcels.',
        'Avoid peak tourism Saturdays for barrier load-ins when flexible.',
      ],
    },
    {
      id: 'older-stock-grids',
      title: 'Older housing stock & inland grid module',
      intro:
        'Central and southern inland Pinellas fails estimates that assume new-construction drive-up access.',
      bullets: [
        'Share stair counts, driveway width, and street-turn photos for mid-century and historic homes.',
        'Budget labor for long carries from the nearest legal curb spot on tight grids.',
        'Clarify multi-family elevator/COI rules separately from SFH curb access.',
        'Price St. Pete core ↔ north county or beach ↔ inland pairs with honest portal-to-portal assumptions.',
        'Discuss floor and plaster protection on older interiors — rush carries scratch easily.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Pinellas County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, beach vs inland lifestyle — then verify on district and hospital sites. Treat rankings as one signal among many.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        intro:
          'Pinellas County Schools serves most public K–12 students. Choice and magnet options vary; confirm zoning for any address.',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              'Public K–12 is largely under Pinellas County Schools, with magnets and choice programs layered on. Neighborhood names do not guarantee school assignment — check current zoning tools.',
          },
          {
            title: 'Beach vs inland patterns',
            detail:
              'Family enrollment patterns can differ between barrier communities and inland suburbs. Tour campuses and ask about capacity when it matters to you.',
          },
          {
            title: 'Research sources',
            detail:
              'District tools, Florida Department of Education data, and independent comparison sites help — validate with visits.',
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
              'BayCare campuses (including Morton Plant and related facilities), Johns Hopkins All Children’s Hospital in St. Petersburg, and other regional providers anchor care. Confirm specialties and insurance networks.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times — bridge congestion changes access to Hillsborough specialists as well. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Older stock and condo mix',
            detail:
              'Expect substantial mid-century SFH inland, condo product on the coast and downtown St. Pete, and redevelopment pockets. Square footage alone does not predict access difficulty.',
          },
          {
            title: 'Insurance and flood',
            detail:
              'Barrier and bay-adjacent parcels can carry higher flood and wind insurance costs. Check FEMA maps and quotes before finalizing a budget.',
          },
          {
            title: 'Relative Bay comparison',
            detail:
              'Many households compare Pinellas to Hillsborough on commute, beach access, and housing age. Compare specific micro-markets, not county averages alone.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Pinellas areas fit whom',
        bullets: [
          {
            title: 'Urban arts and waterfront energy',
            detail:
              'Downtown St. Pete and nearby historic neighborhoods suit people prioritizing walkability and culture — with parking and older-grid tradeoffs.',
          },
          {
            title: 'Beach lifestyle',
            detail:
              'Barrier communities prioritize beach access and tourism energy — with COI rules, insurance, and seasonal crowds.',
          },
          {
            title: 'Quieter inland or northern suburbs',
            detail:
              'Largo, Seminole, Palm Harbor, East Lake, and similar areas often appeal for suburban footprints and slightly calmer streets — with US-19 and bridge commutes as the tradeoff.',
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
              'Healthcare, tourism and hospitality, professional services, retail, and cross-bay employment in Tampa shape many local job patterns.',
          },
          {
            title: 'Commute realism',
            detail:
              'Most households are car-dependent. Bridge peaks to Hillsborough are the main regional constraint. Test drive peak routes before choosing solely on housing cost.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Beach and bay recreation',
            detail:
              'Gulf beaches, bay access, and coastal parks are major quality-of-life draws — with tourism pressure in peak months.',
          },
          {
            title: 'Climate & storms',
            detail:
              'Hot humid summers, afternoon storms, and hurricane season. Barrier residents should learn evacuation zones and building storm procedures early.',
          },
          {
            title: 'Density on a peninsula',
            detail:
              'Pinellas packs diverse housing into a constrained geography. Visit beach and inland options at different times of day before deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Pinellas resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify mover registration before deposits.',
    items: [
      {
        label: 'Pinellas County — official site',
        href: 'https://pinellas.gov/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'Pinellas County Schools',
        href: 'https://www.pcsb.org/',
        external: true,
        note: 'Boundaries, choice & calendars',
      },
      {
        label: 'City of St. Petersburg',
        href: 'https://www.stpete.org/',
        external: true,
      },
      {
        label: 'City of Clearwater',
        href: 'https://www.myclearwater.com/',
        external: true,
      },
      {
        label: 'City of Largo',
        href: 'https://www.largo.com/',
        external: true,
      },
      {
        label: 'FL511 — traffic conditions',
        href: 'https://fl511.com/',
        external: true,
        note: 'Bridges, US-19, I-275 before load windows',
      },
      {
        label: 'FEMA Flood Map Service Center',
        href: 'https://msc.fema.gov/portal/home',
        external: true,
        note: 'Check parcel flood zones',
      },
      {
        label: 'FDACS — Florida household movers (Ch. 507)',
        href: 'https://www.fdacs.gov/',
        external: true,
        note: 'Intrastate mover registration & consumer resources',
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
        label: 'All Florida local mover guides',
        href: '/local-movers/florida',
      },
    ],
  },
  directoryHint:
    'Prefer crews with beach-causeway and older-grid experience for barrier and St. Pete historic jobs; confirm elevator/COI fluency for towers. Cross-bay pairs need honest bridge timing. Verify FDACS for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-23',
};
