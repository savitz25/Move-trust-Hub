import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlPack,
  IL_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-shared';

/**
 * St. Clair County, IL — Belleville / Metro East partner to Madison (not Madison clone).
 * Scott AFB, O'Fallon growth, East St. Louis river edge, I-64 / I-255 logistics.
 */
export const stClairCountyIlIntelligence: CountyIntelligencePack = finalizeIlPack({
  countySlug: 'st-clair',
  hubTitle: 'St. Clair County Moving Intelligence Hub',
  eyebrow: "St. Clair · Metro East · Belleville, O'Fallon, Fairview Heights, Scott AFB & I-64",
  h1: "Moving in St. Clair County: Belleville Access, Scott AFB Timelines & I-64 / I-255 Logistics",
  heroOpener:
    "St. Clair County is Metro East’s Belleville-centered partner market — not a Madison/Edwardsville clone and not Chicago. Belleville holds denser older grids and multifamily; O'Fallon and Shiloh stack military-adjacent and HOA growth product around Scott Air Force Base; Fairview Heights rides retail and I-64 access; Swansea and Freeburg lean family SFH; East St. Louis and river edges bring tighter curb and industrial calendars; Mascoutah and south-county pockets hold smaller-town logistics. A Belleville walk-up, a Scott AFB PCS hard date, an O'Fallon HOA gate list, and an East St. Louis staging constraint do not share truck access or crew skill. I-64, I-255, I-55/70 links, and IL-15 rewrite “local” estimates that ignore base windows, Missouri authority, and peak freeflow collapse toward the Arch. This hub is for people moving in St. Clair County.",
  heroCredibility:
    'Illinois Commerce Commission (ICC) Household Goods authority for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-64 · I-255 · I-55/70 links · IL-15',
  whatMakesDifferent: {
    title: 'What makes moving in St. Clair County different',
    intro:
      "These are Belleville–Scott AFB–I-64 realities — military PCS calendars, O'Fallon growth HOAs, and river-edge access — not Edwardsville/SIUE patterns pasted onto a different map.",
    bullets: [
      {
        title: 'Scott AFB PCS and military calendars dominate mid-week demand',
        detail:
          'Orders-driven report dates, temporary lodging, and storage-in-transit needs do not flex with Saturday-only family crews. Confirm hard dates and base access rules early.',
      },
      {
        title: "O'Fallon–Shiloh growth product is HOA- and base-adjacent",
        detail:
          'Gate lists, truck-length limits, and newer multifamily elevators rewrite jobs that look “suburban simple” on paper. Same-county Belleville grids do not share that stack.',
      },
      {
        title: 'I-64 and I-255 turn short map miles into billable hours',
        detail:
          "Belleville ↔ Fairview Heights, O'Fallon ↔ Swansea, or Shiloh ↔ East St. Louis pairs look local and still burn portal time at peak, construction, and Missouri-bound backups.",
      },
      {
        title: 'Belleville older grids still constrain curb and carries',
        detail:
          'Walk-ups, basement stairs, tree-lined streets, and limited truck length need driveway photos — not only HOA checklists from O\'Fallon.',
      },
      {
        title: 'Missouri-bound legs are routine — authority must match the route',
        detail:
          'Many households move St. Clair ↔ St. Louis City/County. An ICC household goods license alone does not authorize interstate delivery; confirm FMCSA when any stop leaves Illinois.',
      },
      {
        title: 'East St. Louis and river-edge logistics are their own product',
        detail:
          'Tighter staging, industrial freight pulses, and security-aware sites need experienced crews and honest access surveys — not generic Metro East copy.',
      },
      {
        title: 'IL-15 and I-55/70 links reshape south and west timing',
        detail:
          'Belleville–Freeburg–Mascoutah and Fairview Heights–bridge approaches ride these corridors with freight peaks that underpriced quotes ignore.',
      },
      IL_REG_BULLET,
    ],
  },
  zonesHeading: 'St. Clair County access zones',
  zonesIntro:
    "Plan by Belleville core, O'Fallon–Shiloh–Scott AFB growth, Fairview Heights I-64 retail belt, Swansea–Freeburg family corridors, East St. Louis river edge, and Mascoutah–south county — access rules cluster by zone more than ZIP alone.",
  zones: [
    {
      id: 'belleville-core',
      name: 'Belleville core, near-downtown & older grids',
      shortName: 'Belleville core',
      neighborhoods: [
        'Downtown Belleville',
        'West Belleville',
        'East Belleville neighborhoods',
        'IL-15 residential edges',
        'Signal Hill edges',
      ],
      housingTypes: 'Older SFH, walk-up multifamily, limited mid-rise, mixed commercial-residential',
      challenges: [
        'Stairs, long carries, and limited legal curb',
        'IL-15 / local arterial congestion',
        'Older street grids with tight truck turn radius',
      ],
      moverTips:
        'Photo curb and stair counts before the final estimate. Prefer mid-week early starts. Confirm alley vs street staging in writing.',
      cityKeywords: ['belleville', 'signal hill', 'downtown belleville', 'west belleville'],
    },
    {
      id: 'ofallon-shiloh-scott',
      name: "O'Fallon, Shiloh & Scott AFB-adjacent growth",
      shortName: "O'Fallon / Scott",
      neighborhoods: [
        "O'Fallon",
        'Shiloh',
        'Scott AFB area residential',
        'Green Mount corridor edges',
        'Family HOA tracts',
      ],
      housingTypes: 'HOA SFH, townhomes, military-adjacent multifamily, newer tracts',
      challenges: [
        'HOA gate lists, truck limits, and approved move hours',
        'PCS hard dates and temporary lodging turnover',
        'I-64 peak freeflow collapse toward St. Louis',
      ],
      moverTips:
        'Collect HOA packets and ask about PCS report dates first. Prefer mid-week early starts. Confirm elevator vs walk-up before final estimate.',
      cityKeywords: [
        "o'fallon",
        'ofallon',
        'shiloh',
        'scott afb',
        'scott air force base',
        'green mount',
      ],
    },
    {
      id: 'fairview-heights-i64',
      name: 'Fairview Heights, I-64 retail belt & mid-county',
      shortName: 'Fairview Heights',
      neighborhoods: [
        'Fairview Heights',
        'St. Clair Square corridor edges',
        'I-64 residential pockets',
        'Caseyville edges',
        'Washington Park edges',
      ],
      housingTypes: 'Suburban SFH, multifamily near retail, mixed commercial-adjacent stock',
      challenges: [
        'I-64 / I-255 congestion clusters',
        'Retail freight and weekend curb pressure',
        'Cross-zone pairs into Belleville or Missouri',
      ],
      moverTips:
        'Build I-64 buffer for morning and evening peaks. Avoid peak retail weekends for curb-sensitive buildings when flexible.',
      cityKeywords: [
        'fairview heights',
        'caseyville',
        'washington park',
        'i-64',
        'st clair square',
      ],
    },
    {
      id: 'swansea-freeburg',
      name: 'Swansea, Freeburg & south-central family corridors',
      shortName: 'Swansea / Freeburg',
      neighborhoods: [
        'Swansea',
        'Freeburg',
        'Smithton edges',
        'South Belleville family pockets',
        'IL-15 south corridors',
      ],
      housingTypes: 'Family SFH, some HOA tracts, limited multifamily',
      challenges: [
        'High Saturday family demand May–August',
        'Basement carries and driveway grade variation',
        'Longer empty miles from river-edge staging for some crews',
      ],
      moverTips:
        'Survey basements and driveway pitch. Book peak Saturdays 2–3 weeks ahead. Clarify Belleville vs Swansea municipal rules if applicable.',
      cityKeywords: ['swansea', 'freeburg', 'smithton', 'south belleville'],
    },
    {
      id: 'east-st-louis-river',
      name: 'East St. Louis, river edge & industrial approaches',
      shortName: 'East St. Louis / River',
      neighborhoods: [
        'East St. Louis',
        'River bridge approaches',
        'Industrial corridor residential',
        'Centreville edges',
        'Sauget / industrial park edges',
      ],
      housingTypes: 'Modest SFH, multifamily, industrial-adjacent stock',
      challenges: [
        'Tighter staging and limited legal curb on some blocks',
        'Freight pulses and bridge approach congestion',
        'Security-aware sites and honest access surveys required',
      ],
      moverTips:
        'Pre-walk staging and confirm daylight windows. Price bridge and I-55/70 link portal time. Use crews experienced with river-edge logistics.',
      cityKeywords: [
        'east st louis',
        'east saint louis',
        'centreville',
        'sauget',
        'river edge',
      ],
    },
    {
      id: 'mascoutah-south',
      name: 'Mascoutah, Lebanon edges & south/east county',
      shortName: 'Mascoutah / South',
      neighborhoods: [
        'Mascoutah',
        'Lebanon edges',
        'New Athens edges',
        'South-county rural-suburban mix',
        'Scott AFB south residential pockets',
      ],
      housingTypes: 'Small-town SFH, rural-lot edges, limited multifamily, some HOA growth',
      challenges: [
        'Longer empty miles from Belleville/I-64 staging yards',
        'Weather-sensitive rural approaches',
        'Military-adjacent turnover overlapping small-town curb limits',
      ],
      moverTips:
        'Price empty miles honestly. Share driveway and street photos. Align PCS dates with crew availability early.',
      cityKeywords: ['mascoutah', 'lebanon', 'new athens', 'south st clair'],
    },
  ],
  costDrivers: {
    title: 'What drives St. Clair County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. HOA soft costs, PCS hard dates, I-64 portal time, and Missouri authority complexity separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'HOA packets, elevators & growth-tract rules',
        detail:
          "O'Fallon–Shiloh product adds schedule risk and truck constraints before packing skill matters.",
      },
      {
        title: 'I-64 / I-255 / I-55-70 link congestion',
        detail:
          'Cross-zone and St. Louis-bound pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Belleville walk-ups, basements & limited curb',
        detail:
          'Older grids add labor and sometimes force smaller equipment on tight streets.',
      },
      {
        title: 'Scott AFB PCS and temporary lodging cycles',
        detail:
          'Orders-driven mid-week spikes and storage-in-transit needs raise urgency premiums.',
      },
      {
        title: 'Missouri and multi-county empty miles',
        detail:
          'St. Louis destinations and Madison pairs raise staging distance and interstate authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,450+',
        note: 'Higher with multifamily or peak I-64 pairs',
      },
      {
        label: '2–3BR condo or modest SFH',
        value: '$1,200–$3,800+',
        note: 'HOA and stair soft costs trend up',
      },
      {
        label: '3–4+ BR / HOA / PCS / interstate',
        value: '$2,400–$7,500+',
        note: "O'Fallon estates and MO pairs price highest",
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$180+/hr',
        note: 'Portal-to-portal; packing and HOA/PCS admin scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a St. Clair County move',
    intro:
      'School calendars, Scott AFB PCS pulses, humidity, and interstate construction reshape access and crew availability across Belleville Metro East.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb and reduce I-64 pain. Avoid month-end Fridays when leases, elevators, and PCS dates collide.',
      },
      {
        title: 'Peak family season: late May–mid-August',
        detail:
          "Swansea–O'Fallon–Belleville Saturday demand fills first. Book 2–4 weeks ahead for peak weekends and HOA slots.",
      },
      {
        title: 'PCS and military relocation clusters',
        detail:
          'Summer and mid-year orders create mid-week spikes around Scott AFB. Confirm report dates, lodging, and storage-in-transit early.',
      },
      {
        title: 'Summer heat, storms & winter ice',
        detail:
          'Afternoon humidity and pop-up storms slow exterior carries; winter ice on older Belleville streets is real. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'belleville-i64-access',
      title: 'Belleville, I-64 & Metro East access module',
      intro:
        'St. Clair estimates fail more often on HOA packets, I-64 portal time, and Missouri authority mismatches than on packing skill alone.',
      bullets: [
        "Collect HOA gate lists, truck-length limits, and approved hours for O'Fallon–Shiloh product.",
        'Photo curb, stair counts, and driveway grade for Belleville core and Swansea family stock.',
        'Price portal-to-portal time for any pair that rides I-64, I-255, I-55/70 links, or IL-15 at peak.',
        'Clarify St. Clair vs Madison vs Missouri addresses on every estimate before deposit.',
        'Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state-only jobs and FMCSA for any out-of-state leg.',
        'Build bridge and construction buffers for St. Louis-bound windows.',
      ],
    },
    {
      id: 'scott-afb-pcs',
      title: 'Scott AFB PCS & military relocation module',
      intro:
        'Many St. Clair households move on orders, TMO guidance, and temporary lodging timelines that do not flex with Saturday-only crews.',
      bullets: [
        'Ask about hard report-to-duty, lodging checkout, and orders windows at estimate time.',
        'Clarify storage-in-transit, partial loads, and weight-ticket needs when claims processes apply.',
        'Prefer mid-week early windows when base-adjacent traffic and lodging turnover peak.',
        'Match inventory complexity (uniform gear policies, specialty items) to crew experience and valuation coverage.',
        'Confirm whether the job is HHG-for-hire commercial or government-arranged — authority and paperwork differ.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to St. Clair County?',
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          {
            title: 'How districts work here',
            detail:
              "St. Clair County is served by multiple unit and high-school districts (Belleville area, O'Fallon, Freeburg, Mascoutah, East St. Louis, and others). Assignment is address-based — marketing names do not guarantee a campus.",
          },
          {
            title: 'Growth areas and capacity',
            detail:
              "O'Fallon–Shiloh and south growth pockets can see enrollment pressure. Ask districts about capacity, boundaries, and busing when touring.",
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Illinois State Board of Education data, and campus visits beat ranking screenshots alone. Military families should re-check eligibility when orders change addresses mid-year.',
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
              'Memorial Hospital Belleville / Memorial Metro East patterns, HSHS St. Elizabeth’s (O’Fallon area), and broader St. Louis metro specialty options serve St. Clair households. Confirm networks and Illinois vs Missouri facility preferences.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from Mascoutah or Freeburg to preferred campuses — I-64 congestion changes “nearby” on paper. Transfer records early; military families should align TRICARE networks with local systems.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Belleville grids vs O\'Fallon growth vs river edge',
            detail:
              "Expect older SFH and walk-up multifamily in Belleville; newer HOA SFH and military-adjacent multifamily in O'Fallon–Shiloh; retail-corridor product in Fairview Heights; tighter industrial-adjacent stock toward East St. Louis.",
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by corridor. Budget for HOA dues on growth tracts and older-home repair risk in core Belleville stock.',
          },
          {
            title: 'HOA and multifamily governance',
            detail:
              'Planned communities and multifamily properties often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which St. Clair areas fit whom',
        bullets: [
          {
            title: 'Belleville central and value lifestyle',
            detail:
              'Suits people prioritizing established neighborhoods and central county location — with stair, curb, and renovation tradeoffs on move day.',
          },
          {
            title: "O'Fallon–Shiloh military-adjacent growth",
            detail:
              'Often appeals for newer housing and Scott AFB proximity — with HOA logistics, PCS calendars, and I-64 peaks.',
          },
          {
            title: 'Swansea–Freeburg family corridors',
            detail:
              'Attracts households seeking SFH space and quieter streets — with Saturday demand and basement carries.',
          },
          {
            title: 'Fairview Heights retail-corridor access',
            detail:
              'Fits buyers chasing I-64 and shopping/employment adjacency — with weekend traffic and multifamily staging constraints.',
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
              'Scott Air Force Base and defense-adjacent roles, healthcare, logistics, retail/office along I-64, local government, and St. Louis metro reverse-commute or Missouri-bound jobs concentrate demand.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households are car-dependent and St. Louis-facing. I-64, I-255, I-55/70 links, and IL-15 peaks and bridge approaches are real. Test drive peak routes before choosing solely on purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, multiple St. Clairs',
            detail:
              "St. Clair stacks Belleville older grids, Scott AFB growth suburbs, I-64 retail belts, south family towns, and river-edge industrial edges — partner to Madison Metro East, not an Edwardsville clone.",
          },
          {
            title: 'Climate',
            detail:
              'Hot humid summers, frequent storms, and winters with ice events. Plan outdoor staging and weather contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              "Dining and events concentrate around Belleville and Fairview Heights corridors; O'Fallon feels more family- and base-oriented. Visit at peak and off-peak times when deciding — including a St. Louis peak-commute test if you work west of the river.",
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful St. Clair County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Illinois Commerce Commission (ICC) household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'St. Clair County — official site',
        href: 'https://www.co.st-clair.il.us/',
        external: true,
        note: 'County services & offices',
      },
      {
        label: 'City of Belleville',
        href: 'https://belleville.net/',
        external: true,
        note: 'Municipal services — county seat',
      },
      {
        label: 'Scott Air Force Base',
        href: 'https://www.scott.af.mil/',
        external: true,
        note: 'Base info & military community context',
      },
      {
        label: 'IDOT travel / traffic conditions',
        href: 'https://www.gettingaroundillinois.com/',
        external: true,
        note: 'I-64 / I-255 before load windows',
      },
    ],
  },
  directoryHint:
    "Prefer crews with PCS/temporary-lodging fluency for Scott AFB-adjacent jobs; HOA experience for O'Fallon–Shiloh; walk-up and curb fluency for Belleville core; honest I-64 / I-255 timing for cross-zone pairs; FMCSA readiness for Missouri legs. Verify Illinois Commerce Commission (ICC) Household Goods authorization for in-state moves and FMCSA for interstate legs.",
  lastReviewed: '2026-07-24',
});
