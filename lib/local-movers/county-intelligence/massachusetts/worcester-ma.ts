import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMaPack,
  MA_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/massachusetts/ma-shared';

/**
 * Worcester County, MA — central MA regional hub (not Boston-west clone).
 */
export const worcesterCountyMaIntelligence: CountyIntelligencePack = finalizeMaPack({
  countySlug: 'worcester',
  hubTitle: 'Worcester County Moving Intelligence Hub',
  eyebrow: 'Worcester · Central MA hub, three-decker stock & I-290 / I-90 logistics',
  h1: 'Moving in Worcester County: Central Massachusetts Hub, Three-Deckers & Cross-State Corridors',
  heroOpener:
    'Worcester County is not a Boston-west suburb rename and not a generic Massachusetts template — it is the state’s second city and a true central-MA regional hub, with three-decker walk-ups, hospital and university turnover, Blackstone Valley mill-town stock, and I-290 / I-90 freeflow that rewrites “local” portal time. A Main South three-decker with porch flights, a Shrewsbury cul-de-sac two-story, a Fitchburg mill-conversion loft, and a Westborough office-park multifamily do not share truck access or crew skill. I-290, I-90, I-190, Route 9, and Route 20 turn short map miles into billable hours when peak commute and lease-end waves collide. This hub is for people moving in Worcester County — not a renamed Middlesex corridor page or Boston-metro script.',
  heroCredibility:
    'Massachusetts DPU operating certificate for intrastate moves · FMCSA for interstate · Curated listings',
  majorCorridors: 'I-290 · I-90 · I-190 · Route 9 · Route 20',
  whatMakesDifferent: {
    title: 'What makes moving in Worcester County different',
    intro:
      'These are Worcester and central-MA realities — three-decker geometry, regional-hub congestion, and Blackstone / Wachusett micro-markets — not Boston core elevator towers or South Shore coastal product.',
    bullets: [
      {
        title: 'Worcester three-deckers and porch flights rewrite labor',
        detail:
          'Main South, Grafton Hill, Bell Hill, and many central Worcester blocks stack multi-flight porches, tight curb, and long carries. Flat-rate optimism from suburban cul-de-sacs underprices flight counts and truck placement.',
      },
      {
        title: 'Central MA hub product is not “Boston west”',
        detail:
          'UMass Chan, UMass Memorial, Worcester Polytechnic, and downtown revitalization drive mid-month professional and student turnover that differs from Route 128 tech corridors. Match crew experience to three-decker, loft, and hospital-adjacent product — not a suburban Boston rate card.',
      },
      {
        title: 'I-290, I-90, I-190, Route 9, and Route 20 turn short miles into portal hours',
        detail:
          'Worcester ↔ Shrewsbury, Leominster ↔ Westborough, or Fitchburg ↔ Auburn pairs look local and still burn 35–75+ minutes at peak. Price portal-to-portal honestly, not odometer optimism.',
      },
      {
        title: 'Blackstone Valley and southern Worcester County are a separate micro-market',
        detail:
          'Millbury, Sutton, Uxbridge, and Blackstone stack mill-era stock, driveway grades, and Route 146 / Route 20 freeflow that differ from city three-deckers or North County ranch belts. Do not reuse one “Worcester rate” across all three.',
      },
      {
        title: 'North County and Montachusett edges need different truck plans',
        detail:
          'Fitchburg, Leominster, Gardner, and Holden mix older multifamily, hillside approaches, and I-190 / Route 2–linked timing. Narrow streets and winter ice reshape open carries more than a Westborough HOA survey implies.',
      },
      {
        title: 'East and west suburban belts diverge on HOA and access rules',
        detail:
          'Shrewsbury, Westborough, Northborough, and Grafton often mean two-story SFH, cul-de-sac truck length, and HOA windows; Spencer, Leicester, and Paxton edges can mean longer rural approaches and limited staging. Survey both addresses, not the county name alone.',
      },
      {
        title: 'Multi-county central New England pairs are routine',
        detail:
          'Households regularly move Worcester ↔ Middlesex, Norfolk, Hampden, Rhode Island, or New Hampshire. Clarify addresses so Massachusetts DPU operating certificate vs FMCSA interstate assumptions stay accurate when any leg leaves Massachusetts.',
      },
      MA_REG_BULLET,
    ],
  },
  zonesHeading: 'Worcester County access zones',
  zonesIntro:
    'Plan by Worcester city three-deckers, east suburban Route 9 belts, Blackstone Valley mill towns, North County / Montachusett edges, and west rural–suburban mix — access rules cluster by zone more than ZIP alone.',
  zones: [
    {
      id: 'worcester-city-core',
      name: 'Worcester city core, downtown & hospital–university belt',
      shortName: 'Worcester core',
      neighborhoods: [
        'Downtown Worcester',
        'Main South',
        'Canal District edges',
        'UMass Memorial / Medical School edges',
        'WPI / Highland Street edges',
        'Shrewsbury Street corridor',
      ],
      housingTypes: 'Three-deckers, older walk-ups, loft conversions, denser multifamily',
      challenges: [
        'Multi-flight porches, tight curb, and limited truck length',
        'Hospital and campus mid-month turnover spikes',
        'I-290 approach congestion into the core',
      ],
      moverTips:
        'Survey porch flights and curb options with photos. Prefer mid-week early starts. Confirm alley or side-street staging before finalizing labor hours.',
      cityKeywords: [
        'downtown worcester',
        'main south',
        'canal district',
        'worcester',
        'highland street',
        'shrewsbury street',
      ],
    },
    {
      id: 'worcester-city-neighborhoods',
      name: 'Worcester hill neighborhoods (Grafton Hill, Bell Hill, Tatnuck & beyond)',
      shortName: 'Worcester hills',
      neighborhoods: [
        'Grafton Hill',
        'Bell Hill',
        'Tatnuck',
        'Columbus Park edges',
        'Vernon Hill edges',
        'Burncoat edges',
      ],
      housingTypes: 'Three-deckers, two-family stock, bungalows, denser duplexes',
      challenges: [
        'Hill approaches, porch stairs, and basement carries',
        'Tree-lined curb with limited legal staging',
        'Winter ice and rain-slick grades on open carries',
      ],
      moverTips:
        'Count flights and photo driveway grade. Confirm whether a smaller truck is required. Inventory basements and third-floor units carefully.',
      cityKeywords: [
        'grafton hill',
        'bell hill',
        'tatnuck',
        'vernon hill',
        'burncoat',
        'columbus park',
      ],
    },
    {
      id: 'east-suburban-route-9',
      name: 'East suburban belt (Shrewsbury, Westborough, Northborough, Grafton)',
      shortName: 'East suburbs',
      neighborhoods: [
        'Shrewsbury',
        'Westborough',
        'Northborough',
        'Grafton',
        'Southborough edges',
        'Hopkinton edges',
      ],
      housingTypes: 'Two-story SFH, townhomes, HOA planned tracts, newer multifamily',
      challenges: [
        'HOA gate lists, truck-length rules, and move-hour windows',
        'Route 9 / I-90 / I-495 approach clusters',
        'High Saturday family demand May–August',
      ],
      moverTips:
        'Confirm HOA rules and gate access before the crew day. Survey cul-de-sac truck length. Book peak Saturdays early for larger SFH.',
      cityKeywords: [
        'shrewsbury',
        'westborough',
        'northborough',
        'grafton',
        'southborough',
        'hopkinton',
      ],
    },
    {
      id: 'blackstone-valley',
      name: 'Blackstone Valley & southern Worcester County',
      shortName: 'Blackstone Valley',
      neighborhoods: [
        'Millbury',
        'Sutton',
        'Uxbridge',
        'Blackstone',
        'Douglas edges',
        'Auburn edges',
      ],
      housingTypes: 'Mill-era multifamily, ranch and colonial SFH, mixed rural edges',
      challenges: [
        'Older mill stock with awkward stairs and narrow approaches',
        'Route 146 / Route 20 freeflow and Rhode Island–linked pairs',
        'Limited staging on mill-village streets',
      ],
      moverTips:
        'Photo mill-building access and stair geometry. Price Route 146 and I-90 buffers for cross-valley pairs. Clarify MA vs RI addresses near Blackstone edges.',
      cityKeywords: [
        'millbury',
        'sutton',
        'uxbridge',
        'blackstone',
        'douglas',
        'auburn',
      ],
    },
    {
      id: 'north-county-montachusett',
      name: 'North County / Montachusett (Fitchburg, Leominster, Gardner, Holden)',
      shortName: 'North County',
      neighborhoods: [
        'Fitchburg',
        'Leominster',
        'Gardner',
        'Holden',
        'Sterling edges',
        'Clinton edges',
      ],
      housingTypes: 'Older multifamily, hillside SFH, ranch stock, mill-adjacent rentals',
      challenges: [
        'I-190 / Route 2 corridor congestion clusters',
        'Hillside approaches and winter access risk',
        'Mixed alley and driveway staging by block',
      ],
      moverTips:
        'Build I-190 and I-290 buffers for Worcester-linked pairs. Survey grade and curb with photos. Prefer early starts in winter ice season.',
      cityKeywords: [
        'fitchburg',
        'leominster',
        'gardner',
        'holden',
        'sterling',
        'clinton',
      ],
    },
    {
      id: 'west-rural-suburban',
      name: 'West Worcester County (Spencer, Leicester, Barre, Paxton edges)',
      shortName: 'West County',
      neighborhoods: [
        'Spencer',
        'Leicester',
        'Paxton',
        'Barre edges',
        'Oakham edges',
        'Rutland edges',
      ],
      housingTypes: 'Ranch and colonial SFH, rural driveways, limited multifamily',
      challenges: [
        'Longer empty-mile staging from Worcester crews',
        'Narrow rural approaches and limited truck turn radius',
        'Route 9 / Route 31 freeflow variability',
      ],
      moverTips:
        'Confirm driveway length, soft shoulder, and truck turnaround. Price empty miles honestly for west-county destinations. Clarify well/septic inventory access when basements are full.',
      cityKeywords: [
        'spencer',
        'leicester',
        'paxton',
        'barre',
        'rutland',
        'oakham',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Worcester County moving costs',
    intro:
      'Ranges are market context for local / short regional moves — not quotes. Three-decker flights, curb friction, HOA soft costs, and I-290 / I-90 / Route 9 portal time separate cheap estimates from real bills.',
    drivers: [
      {
        title: 'Three-decker porches, stairs & long carries',
        detail:
          'Worcester city and mill-town stock add flight counts and awkward turns that suburban flat rates underprice.',
      },
      {
        title: 'I-290 · I-90 · I-190 · Route 9 · Route 20 congestion',
        detail:
          'Cross-county and city–suburb pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'HOA gates & east-suburban building packets',
        detail:
          'Shrewsbury, Westborough, and Grafton multifamily or planned tracts add admin soft costs and timed windows.',
      },
      {
        title: 'Hospital, campus & mid-month professional spikes',
        detail:
          'Medical and university calendars stack demand outside pure Saturday peaks and compress lead time.',
      },
      {
        title: 'Multi-county New England empty miles',
        detail:
          'Middlesex, Hampden, Rhode Island, and New Hampshire destinations raise staging distance and authority complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$450–$1,600+',
        note: 'Higher with three-decker flights or peak I-290 pairs',
      },
      {
        label: '2–3BR condo or walk-up flat',
        value: '$1,300–$4,200+',
        note: 'Stairs, curb friction, and HOA soft costs trend up',
      },
      {
        label: '3–4+ BR / three-decker / cross-zone SFH',
        value: '$2,800–$8,500+',
        note: 'Full three-deckers and long I-90 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$120–$210+/hr',
        note: 'Portal-to-portal; packing, stairs, and long carries scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Worcester County move',
    intro:
      'Lease cycles, hospital and campus calendars, school windows, winter ice, and HOA slots reshape access and crew availability.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear curb, ease I-290 and Route 9 freeflow, and reduce three-decker street conflict. Avoid month-end Fridays when leases and porches collide.',
      },
      {
        title: 'Peak season: late May–mid-September',
        detail:
          'Apartment turnover and family SFH Saturdays fill first. Book 2–4 weeks ahead for peak weekends and east-suburban HOA windows.',
      },
      {
        title: 'Winter ice and snow friction (December–March)',
        detail:
          'Slick porches, narrow plowed streets, and limited dry staging slow open carries. Prefer early starts, mats, and flexible weather windows on hill-street addresses.',
      },
      {
        title: 'Hospital and campus mid-month spikes',
        detail:
          'Medical residency and university calendars often land mid-month rather than only on Saturday peaks. Confirm hard move-in dates, temporary housing, and storage-in-transit early.',
      },
    ],
  },
  specialized: [
    {
      id: 'worcester-three-decker-hub',
      title: 'Three-decker, central-hub & corridor logistics module',
      intro:
        'Worcester estimates fail more often on porch flights, curb staging, and I-290 / I-90 timing than on packing skill alone.',
      bullets: [
        'Photo porch flights, curb options, and truck length for city three-decker and mill-town stock.',
        'Price portal-to-portal time for any pair that rides I-290, I-90, I-190, Route 9, or Route 20 at peak.',
        'Confirm HOA gate lists, truck-size limits, and move hours on east-suburban planned tracts.',
        'Plan winter contingency: mats, ice melt, and shorter outdoor carries on slick grades.',
        'Clarify Worcester city vs Shrewsbury/Westborough vs Fitchburg/Leominster addresses on every estimate.',
        'Verify Massachusetts DPU operating certificate for in-state-only jobs and FMCSA for interstate legs.',
      ],
    },
    {
      id: 'central-ma-micro-markets',
      title: 'City three-decker vs suburban vs North County micro-market module',
      intro:
        'A single “Worcester County rate” collapses when three-decker, HOA two-story, and Montachusett hillside product diverge a few miles apart.',
      bullets: [
        'Survey by product — three-decker, HOA SFH, or mill conversion — not by county name alone.',
        'Ask which approach corridors the crew will actually use at load and unload (I-290 vs Route 9 vs I-190).',
        'Match basement and third-floor inventories to experienced crews; do not assume one staging plan covers both addresses.',
        'Expect different parking norms even a few miles apart between city core and east suburbs.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Worcester County?',
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
              'Worcester Public Schools covers most Worcester city addresses; dozens of suburban and regional districts cover Shrewsbury, Westborough, Grafton, Fitchburg, Leominster, and other municipalities. Assignment is address-based — “central MA” marketing does not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Popular programs and boundary edges can be competitive, especially near high-demand east-suburban pockets. Confirm enrollment windows, transportation, and waitlists early when relocating mid-year.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Massachusetts DESE data, and campus visits beat ranking screenshots alone.',
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
              'UMass Memorial, Saint Vincent, and other campuses anchor care in Worcester; community hospitals serve North County and Blackstone edges. Specialty options span the region — confirm insurance networks for your household.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times from city three-deckers, Shrewsbury, or Fitchburg to preferred campuses — I-290 and Route 9 congestion change “nearby” on paper. Transfer records early.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Three-deckers, mill stock, east SFH & rural mix',
            detail:
              'Expect three-deckers and walk-ups in Worcester; mill-era product in Blackstone towns; HOA two-stories and townhomes east of the city; and ranch/colonial stock through west and north county edges.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary sharply by city and town. Budget for older-building repair risk, parking, and insurance on higher-value inventories.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Condo associations and suburban HOAs often control move hours, truck size, elevators, and deposits. Read documents carefully before closing or lease signing.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Worcester areas fit whom',
        bullets: [
          {
            title: 'Worcester city urban and revitalization lifestyle',
            detail:
              'Suits people prioritizing walkability, hospitals, campuses, and relative value — with three-decker stairs, curb, and winter tradeoffs on move day.',
          },
          {
            title: 'East suburban family corridors',
            detail:
              'Often appeals for newer product and school clusters — with Route 9 / I-90 commute realism and HOA rules.',
          },
          {
            title: 'Blackstone Valley character towns',
            detail:
              'Attracts households seeking mill-town scale and Rhode Island–linked access — with older stock geometry and corridor freeflow.',
          },
          {
            title: 'North County value and hillside options',
            detail:
              'Fits buyers seeking more space or rent flexibility — with I-190 timing and different building norms than east suburbs.',
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
              'Healthcare systems, higher education, manufacturing, logistics along I-90 / I-290, government, and growing downtown professional employers concentrate demand. Many households reverse-commute toward Route 128 or Providence edges.',
          },
          {
            title: 'Commute realism',
            detail:
              'Many households mix driving and limited transit. I-290, I-90, I-190, Route 9, and Route 20 peaks are real. Test drive peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'One county, many Worcesters',
            detail:
              'Worcester stacks city three-deckers, east-suburban HOA belts, Blackstone mill towns, and North County hillsides — different from Boston-metro corridor living or Cape seasonal logistics.',
          },
          {
            title: 'Climate',
            detail:
              'Four-season New England weather with real winter snow and ice risk on open carries. Plan outdoor staging and winter contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Dining, arts, sports, and campus culture concentrate in Worcester city; east towns skew more school- and commute-calendar driven. Visit at peak and off-peak times when deciding.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Worcester County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Massachusetts DPU operating certificate status for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Worcester County — official / regional info',
        href: 'https://www.worcesterma.gov/',
        external: true,
        note: 'City of Worcester services & offices (largest municipality)',
      },
      {
        label: 'City of Worcester',
        href: 'https://www.worcesterma.gov/',
        external: true,
        note: 'Permits, services & city info',
      },
      {
        label: 'Worcester Public Schools',
        href: 'https://worcesterschools.org/',
        external: true,
        note: 'Boundaries & calendars (Worcester addresses)',
      },
      {
        label: 'MassDOT traffic & travel conditions',
        href: 'https://www.mass.gov/traffic-travel',
        external: true,
        note: 'I-290 / I-90 / I-190 / Route 9 / Route 20 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with three-decker and porch-flight fluency for Worcester city and mill-town stock; honest I-290 · I-90 · I-190 · Route 9 · Route 20 timing for cross-zone pairs; east-suburban HOA readiness. Verify Massachusetts DPU operating certificate for in-state moves and FMCSA for interstate legs.',
  lastReviewed: '2026-07-24',
});
