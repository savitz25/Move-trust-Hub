import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Middlesex County, New Jersey moving intelligence.
 * Used by /local-movers/new-jersey/middlesex and the shared intelligence template.
 *
 * Differentiators vs Somerset / Monmouth / generic Central Jersey:
 * Rutgers / New Brunswick academic calendar spikes; dense townships (Edison,
 * Woodbridge, Piscataway); Perth Amboy waterfront urban core; Turnpike / Route 1
 * logistics spine; high multi-family COI volume — not shore barrier islands (Ocean)
 * and not GWB high-rises (Bergen).
 */
export const middlesexCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'middlesex',
  hubTitle: 'Middlesex County Moving Intelligence Hub',
  eyebrow: 'Middlesex County · Central Jersey guide',
  h1: 'Moving in Middlesex County, NJ: Rutgers, Edison, Woodbridge & Turnpike Zone Guide',
  heroOpener:
    'Middlesex County sits in the middle of New Jersey’s busiest residential and logistics map — between the New York City metro gravity to the north and the Jersey Shore corridors to the east and south. County seat New Brunswick is home to Rutgers University, so May and August student, faculty, and academic-related turnovers stack on top of ordinary family leases. Around that core: dense townships (Edison, Woodbridge, Piscataway), older urban centers (Perth Amboy), and large suburban communities (East Brunswick, Old Bridge, South Brunswick, North Brunswick) with apartments, condos, townhomes, and HOAs. The New Jersey Turnpike, Garden State Parkway, Route 1, Route 18, Route 9, and Route 27 turn “short locals” into real portal-to-portal time. Multilingual crews and clear written estimates matter in one of the state’s most diverse counties. This guide is for people actually moving in Middlesex — not generic Central Jersey tips recycled from Somerset or Monmouth.',
  heroCredibility:
    'Rutgers seasonal peaks · Dense townships · Multi-family COI · Turnpike / Rte 1 · Intrastate NJ · FMCSA when interstate · Curated listings',
  whatMakesDifferent: {
    title: 'What makes moving in Middlesex County different',
    intro:
      'These are Middlesex-specific realities — Rutgers calendars, Turnpike-corridor density, and high multi-family volume — not interchangeable “central NJ” boilerplate.',
    bullets: [
      {
        title: 'Rutgers / New Brunswick rewrites the residential calendar',
        detail:
          'Student and faculty move-in/move-out spikes (especially May and August) fill crews and curb space around New Brunswick, Highland Park, and nearby multi-family. Book early for those windows — or target mid-week off-peak if your lease allows.',
      },
      {
        title: 'Dense townships, not one continuous suburb',
        detail:
          'Edison, Woodbridge, and Piscataway pack apartments, garden complexes, and SFH on the same map. A Route 1 corridor multi-unit job is not the same as an East Brunswick cul-de-sac — name both towns and building types on the estimate.',
      },
      {
        title: 'High multi-family, condo, and townhome volume → COI is common',
        detail:
          'Certificates of Insurance, elevator reservations, and approved hours show up constantly in garden apartments and newer condo/townhome developments. Treat the building or HOA packet as part of the survey.',
      },
      {
        title: 'Older urban cores: New Brunswick and Perth Amboy',
        detail:
          'Tighter streets, limited truck staging, multi-story walk-ups, and downtown curb competition define many urban jobs. Smaller trucks and early starts beat mid-day gridlock.',
      },
      {
        title: 'Turnpike, Parkway, Route 1, and Route 18 control the clock',
        detail:
          'Logistics and commuter traffic share the same spines households use. Woodbridge ↔ New Brunswick or Edison ↔ Old Bridge can double travel time in peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Industrial and warehouse corridors sit next to residential blocks',
        detail:
          'Port Reading, parts of Edison/Woodbridge, and Turnpike-adjacent zones mean mid-day freight traffic and staging competition near industrial edges. Build buffer when one end of the job sits near logistics corridors.',
      },
      {
        title: 'Diversity makes clear communication operational, not optional',
        detail:
          'Multilingual crews, written inventories, and confirmed building contacts reduce day-of friction in one of New Jersey’s most diverse counties.',
      },
      {
        title: 'New Jersey intrastate rules vs. interstate authority',
        detail:
          'Moves entirely within New Jersey are generally overseen under New Jersey household-goods / BPU frameworks for licensed carriers. Legs into New York or other states need FMCSA interstate authority. Confirm which license applies to your exact origin and destination.',
      },
    ],
  },
  zonesIntro:
    'Treat each zone as its own access and calendar profile. Rutgers/New Brunswick multi-family, Edison density, Woodbridge/Turnpike corridors, Perth Amboy waterfront, Piscataway, East Brunswick suburbs, Old Bridge/Sayreville south county, and South Brunswick tracts are not interchangeable under one “Middlesex local” label.',
  zones: [
    {
      id: 'new-brunswick-rutgers',
      name: 'New Brunswick / Highland Park / Rutgers Area',
      shortName: 'NB / Rutgers',
      neighborhoods: [
        'New Brunswick',
        'Highland Park',
        'College Avenue / campus-adjacent',
        'Downtown New Brunswick',
        'Medical / hospital corridor edge',
      ],
      housingTypes:
        'Apartments and multi-family, student-oriented rentals, older multi-story walk-ups, some condos and mid-rises, limited SFH in Highland Park',
      challenges: [
        'May and August student move peaks — curb space and elevators book early',
        'Tight downtown streets and limited legal truck staging',
        'COI and elevator windows in multi-unit buildings',
        'Route 18 / Route 27 congestion near campus and medical centers',
      ],
      moverTips:
        'Lock elevator/COI and load windows before Rutgers peak weeks. Prefer mid-week mornings outside move-in weekends. Smaller trucks help on one-way downtown blocks. Confirm whether the unit is walk-up vs. elevator — labor minutes change fast.',
      cityKeywords: [
        'new brunswick',
        'highland park',
        'rutgers',
        'college avenue',
      ],
    },
    {
      id: 'edison',
      name: 'Edison & Surrounding',
      shortName: 'Edison',
      neighborhoods: [
        'Edison',
        'Clara Barton / Menlo Park edges',
        'Oak Tree / Iselin edge',
        'Raritan Center edge',
        'Route 1 / Route 27 corridors',
      ],
      housingTypes:
        'Large mix of single-family, garden apartments, condos/townhomes, multi-family along commercial corridors',
      challenges: [
        'High multi-family COI and elevator volume',
        'Route 1 and local arterial congestion',
        'HOA rules in many condo/townhome communities',
        'Industrial/logistics spill near Raritan Center edges',
      ],
      moverTips:
        'Edison is large — survey the exact section (Metuchen-edge SFH vs. garden complex vs. Route 1 multi-unit). Collect HOA packets early. Mid-week mornings beat Route 1 retail peaks. Multilingual communication helps across diverse neighborhoods.',
      cityKeywords: [
        'edison',
        'menlo park',
        'clara barton',
        'oak tree',
        'raritan center',
      ],
    },
    {
      id: 'woodbridge-corridor',
      name: 'Woodbridge / Iselin / Port Reading Corridor',
      shortName: 'Woodbridge / Iselin',
      neighborhoods: [
        'Woodbridge',
        'Iselin',
        'Port Reading',
        'Avenel edge',
        'Sewaren edge',
        'Woodbridge Center retail corridor',
      ],
      housingTypes:
        'Suburban SFH, multi-family and garden apartments, townhomes, industrial-edge mixed use near Port Reading',
      challenges: [
        'Turnpike / Parkway / Route 9 interchange congestion',
        'Retail-corridor staging limits near Woodbridge Center',
        'HOA and multi-unit COI rules common',
        'Freight and logistics traffic near Port Reading / industrial edges',
      ],
      moverTips:
        'Avoid peak Turnpike/Parkway merge windows when possible. Confirm multi-unit packets for Iselin/Avenel complexes. Port Reading and industrial-edge addresses need mid-day freight awareness. Mid-week mornings are usually cleaner than Saturday retail peaks.',
      cityKeywords: [
        'woodbridge',
        'iselin',
        'port reading',
        'avenel',
        'sewaren',
      ],
    },
    {
      id: 'perth-amboy',
      name: 'Perth Amboy & Waterfront',
      shortName: 'Perth Amboy',
      neighborhoods: [
        'Perth Amboy',
        'Waterfront / marina edge',
        'Downtown Perth Amboy',
        'State Street corridor',
        'Hopelawn edge',
      ],
      housingTypes:
        'Older multi-family and multi-story urban stock, some single-family, waterfront-adjacent multi-unit, denser downtown blocks',
      challenges: [
        'Tight streets and limited curb staging',
        'Multi-unit access and long carries from legal parking',
        'Route 35 / local arterial congestion',
        'Waterfront weather and outdoor inventory volume on some properties',
      ],
      moverTips:
        'Urban Perth Amboy favors smaller trucks and early starts. Confirm elevator/COI where multi-unit. Share street approach photos for downtown blocks. Build buffer for local congestion toward Woodbridge/Turnpike.',
      cityKeywords: [
        'perth amboy',
        'hopelawn',
        'waterfront',
      ],
    },
    {
      id: 'piscataway',
      name: 'Piscataway / Middlesex Borough Area',
      shortName: 'Piscataway',
      neighborhoods: [
        'Piscataway',
        'Middlesex Borough',
        'Rutgers Busch / Livingston campus edge',
        'Possumtown / Centennial edges',
        'River Road corridor',
      ],
      housingTypes:
        'Suburban SFH, multi-family and student-adjacent rentals near Rutgers campuses, townhomes, mixed commercial-residential',
      challenges: [
        'Campus-adjacent seasonal peaks overlapping New Brunswick',
        'Route 18 / local arterial congestion',
        'Multi-family COI volume',
        'Longer “local” hauls toward Edison or South Brunswick',
      ],
      moverTips:
        'Confirm whether the address is student-adjacent multi-unit or conventional SFH — calendars and access differ. Collect building packets early near campus edges. Mid-week mornings beat Route 18 peaks.',
      cityKeywords: [
        'piscataway',
        'middlesex',
        'busch',
        'livingston',
        'possumtown',
      ],
    },
    {
      id: 'east-brunswick',
      name: 'East Brunswick / South River / Milltown',
      shortName: 'E. Brunswick',
      neighborhoods: [
        'East Brunswick',
        'South River',
        'Milltown',
        'Route 18 retail corridor',
        'Downtown South River',
      ],
      housingTypes:
        'Suburban single-family, townhome HOAs, multi-family pockets, older denser stock in South River',
      challenges: [
        'Route 18 congestion (especially retail peaks)',
        'HOA move-in rules in many townhome communities',
        'Tighter streets in South River older grid',
        'School-calendar family move spikes June–August',
      ],
      moverTips:
        'East Brunswick SFH and townhome HOAs need packets and driveway photos. South River can feel more urban-tight — smaller trucks help. Avoid Route 18 Saturday afternoons when possible.',
      cityKeywords: [
        'east brunswick',
        'south river',
        'milltown',
      ],
    },
    {
      id: 'old-bridge-south',
      name: 'Old Bridge / Sayreville / South County',
      shortName: 'Old Bridge / Sayreville',
      neighborhoods: [
        'Old Bridge',
        'Sayreville',
        'South Amboy edge',
        'Laurence Harbor edge',
        'Parlin / Ernston edges',
        'Route 9 corridor',
      ],
      housingTypes:
        'Large suburban SFH tracts, townhomes, multi-family, bay-adjacent stock near Laurence Harbor / South Amboy edge',
      challenges: [
        'Route 9 and Parkway access congestion',
        'HOA rules in many developments',
        'Longer hauls to New Brunswick / Edison cores',
        'Mix of open driveway SFH and denser multi-unit pockets',
      ],
      moverTips:
        'Old Bridge is geographically large — confirm section and HOA rules. Sayreville multi-unit needs COI awareness. Build portal-to-portal time for northbound Turnpike/Parkway pairs. Mid-week mornings beat Route 9 peaks.',
      cityKeywords: [
        'old bridge',
        'sayreville',
        'south amboy',
        'laurence harbor',
        'parlin',
      ],
    },
    {
      id: 'south-brunswick',
      name: 'South Brunswick / Dayton / Monmouth Junction Edge',
      shortName: 'S. Brunswick',
      neighborhoods: [
        'South Brunswick',
        'Dayton',
        'Monmouth Junction',
        'Kendall Park',
        'Princeton edge spill (note: Mercer County border)',
        'Route 1 / Route 27 corridors',
      ],
      housingTypes:
        'Suburban tracts, planned communities with HOAs, multi-family near corridors, some larger-lot edges',
      challenges: [
        'HOA packets and approved hours in planned communities',
        'Route 1 congestion toward New Brunswick and Princeton edge',
        'Confusion when addresses sit near Mercer / Somerset lines',
        'Longer hauls to Perth Amboy or Woodbridge',
      ],
      moverTips:
        'Treat South Brunswick as HOA-aware suburban work. Clarify county-line destinations (Princeton/Mercer or Franklin/Somerset). Mid-week mornings on Route 1 are usually cleaner. Collect association rules before move day.',
      cityKeywords: [
        'south brunswick',
        'dayton',
        'monmouth junction',
        'kendall park',
        'north brunswick edge',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Middlesex County',
    intro:
      'Two “local” Middlesex moves of the same square footage can differ sharply depending on Rutgers peak elevators, garden-apartment COI soft costs, and Turnpike/Route 1 portal-to-portal time.',
    drivers: [
      {
        title: 'Elevator reservations, COI & HOA soft costs',
        detail:
          'Multi-family, condo, and townhome communities across Edison, Woodbridge, Piscataway, and New Brunswick often require COI and fixed windows — soft costs even on short distances.',
      },
      {
        title: 'Rutgers May / August peak demand',
        detail:
          'Student turnovers fill crews and raise weekend rates. Mid-week or shoulder dates usually price better when leases allow.',
      },
      {
        title: 'Urban long carries (New Brunswick / Perth Amboy)',
        detail:
          'Tight streets and distant legal truck spots add labor minutes per item versus open suburban driveways.',
      },
      {
        title: 'Turnpike / Parkway / Route 1 / Route 18 congestion',
        detail:
          'Portal-to-portal time tracks logistics and commute peaks. Cross-township pairs can burn 45–90+ minutes each way at peak.',
      },
      {
        title: 'Industrial-edge staging friction',
        detail:
          'Jobs near Port Reading, Raritan Center, or Turnpike logistics nodes compete with freight traffic mid-day.',
      },
      {
        title: 'Diverse multi-stop family and student patterns',
        detail:
          'Storage units, campus double-parks, and multi-family relays are common — extra stops must be in the written estimate.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$550–$1,450+',
        note: 'Higher with elevators, COI, or Rutgers peak weeks',
      },
      {
        label: '2–3BR multi-family or modest SFH',
        value: '$1,700–$4,200+',
        note: 'HOA soft costs and dense-street carries trend up',
      },
      {
        label: '3–4+ BR (cross-township / peak calendar)',
        value: '$2,600–$6,800+',
        note: 'Turnpike pairs and August student peaks price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$125–$195+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Traffic, university & calendar intelligence',
    intro:
      'Middlesex peaks follow Rutgers, ordinary leases, and Turnpike logistics — density makes bad timing expensive.',
    items: [
      {
        title: 'Best truck windows: mid-week mornings',
        detail:
          'Tuesday–Thursday starts before 9 a.m. usually clear multi-family curb space and reduce Turnpike / Route 1 / Route 18 pain. Avoid last Friday/Saturday of the month when leases collide.',
      },
      {
        title: 'Rutgers move-out / move-in peaks (May & August)',
        detail:
          'New Brunswick, Highland Park, and campus-adjacent Piscataway fill early. Book 2–4 weeks ahead or target mid-week off-peak if possible.',
      },
      {
        title: 'Family school-calendar suburbs',
        detail:
          'East Brunswick, Old Bridge, and South Brunswick still peak June–August for school districts; HOA weekday rules often force Tuesday–Thursday windows.',
      },
      {
        title: 'Turnpike & Route 1 logistics peaks',
        detail:
          'Mid-day freight and rush-hour merges affect Woodbridge, Edison, and Port Reading edges. Build buffer for industrial-adjacent addresses.',
      },
      {
        title: 'Multi-family elevator blocks',
        detail:
          'Garden apartments and mid-rises reserve freight windows in fixed morning slots. Late starts cascade into overtime if the next tenant is booked.',
      },
      {
        title: 'Winter weather on older urban grids',
        detail:
          'Ice on New Brunswick and Perth Amboy stoops slows carries. Protect floors; allow extra time for mats and salt.',
      },
    ],
  },
  resources: {
    title: 'Practical Middlesex County resources',
    intro:
      'Official links and licensing notes — building, HOA, and municipal rules change; verify before move day.',
    items: [
      {
        label: 'Middlesex County, NJ — official site',
        href: 'https://www.middlesexcountynj.gov/',
        external: true,
      },
      {
        label: 'City of New Brunswick',
        href: 'https://www.cityofnewbrunswick.org/',
        external: true,
      },
      {
        label: 'Township of Edison',
        href: 'https://www.edisonnj.org/',
        external: true,
      },
      {
        label: 'Township of Woodbridge',
        href: 'https://www.twp.woodbridge.nj.us/',
        external: true,
      },
      {
        label: 'City of Perth Amboy',
        href: 'https://www.perthamboynj.org/',
        external: true,
      },
      {
        label: 'Township of Piscataway',
        href: 'https://www.piscatawaynj.org/',
        external: true,
      },
      {
        label: 'Township of East Brunswick',
        href: 'https://www.eastbrunswick.org/',
        external: true,
      },
      {
        label: 'Township of Old Bridge',
        href: 'https://www.oldbridge.com/',
        external: true,
      },
      {
        label: 'Rutgers University — housing / move resources',
        href: 'https://www.rutgers.edu/',
        note: 'Confirm campus-adjacent building rules separately',
        external: true,
      },
      {
        label: 'NJ 511 — traffic conditions',
        href: 'https://www.511nj.org/',
        note: 'Check Turnpike, Parkway, Routes 1/9/18/27 before locking load windows',
        external: true,
      },
      {
        label: 'NJ Board of Public Utilities — utilities & consumer info',
        href: 'https://www.nj.gov/bpu/',
        note: 'Start with BPU for NJ utility and consumer frameworks; confirm mover licensing for your route',
        external: true,
      },
      {
        label: 'FMCSA SAFER — interstate authority',
        href: 'https://safer.fmcsa.dot.gov/',
        note: 'Required when the move crosses state lines',
        external: true,
      },
      {
        label: 'PSE&G — start/stop service',
        href: 'https://nj.pseg.com/',
        note: 'Electric & gas for much of Middlesex County',
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
    'Filter listings by zone (NB/Rutgers, Edison, Woodbridge/Iselin, Perth Amboy, Piscataway, E. Brunswick, Old Bridge/Sayreville, S. Brunswick) when available. Confirm elevator/COI for multi-family and Rutgers peak timing for New Brunswick — they are different jobs under one county name.',
  lastReviewed: '2026-07-22',
};
