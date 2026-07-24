import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeKyPack,
  KY_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/kentucky/ky-shared';

/**
 * Hardin County, KY — Elizabethtown / I-65 corridor / Fort Knox adjacency.
 * NOT Louisville south clone. NOT Warren/Bowling Green regional clone.
 */
export const hardinCountyKyIntelligence: CountyIntelligencePack = finalizeKyPack({
  countySlug: 'hardin',
  hubTitle: 'Hardin County Moving Intelligence Hub',
  eyebrow:
    'Hardin County · Elizabethtown I-65 hub, Fort Knox adjacency & US-31W logistics',
  h1: 'Moving in Hardin County: Elizabethtown Access, Fort Knox Adjacency & I-65 Corridor Logistics',
  heroOpener:
    'Hardin County, Kentucky is Elizabethtown’s I-65 mid-corridor hub with Fort Knox adjacency — not a Louisville south clone, not Bowling Green WKU product, and not a generic interstate truck-stop page. Expect downtown Elizabethtown multi-unit and older grids, Ring Road and commercial-growth multi-family, Radcliff and Vine Grove military-adjacent stock, West Point and river-edge product, and I-65 / US-31W / KY-313 freeflow that rewrites “local” estimates. An E-town townhome gate list, a Radcliff ranch near post gates, a Fort Knox off-post PCS stack, and a rural Cecilia driveway do not share truck access or crew skill. Military PCS calendars and regional empty miles are real inputs. This hub is for people moving in Hardin County — Elizabethtown / Fort Knox adjacency — not a renamed Louisville or Warren County script.',
  heroCredibility:
    'KYTC Division of Motor Carriers household goods certificate for intrastate · FMCSA for interstate · Elizabethtown I-65 & Fort Knox-adjacent logistics awareness · Curated listings',
  majorCorridors: 'I-65 · US-31W · KY-313 · local Elizabethtown grid',
  whatMakesDifferent: {
    title: 'What makes moving in Hardin County different',
    intro:
      'These are Elizabethtown and Fort Knox-adjacent realities — PCS calendars, Radcliff multi-unit, I-65 freeflow, and mid-corridor growth — not Louisville Jefferson East End product and not Bowling Green campus defaults alone.',
    bullets: [
      {
        title: 'Elizabethtown I-65 hub is not Louisville south',
        detail:
          'Ignore Jeffersontown HOA templates and I-264 freeflow defaults. Hardin sits on the mid-Kentucky I-65 belt with Fort Knox adjacency, Radcliff–Vine Grove military-adjacent housing, and empty-mile patterns that Louisville metro scripts underprice.',
      },
      {
        title: 'Fort Knox adjacency and PCS calendars rewrite volume',
        detail:
          'Permanent change of station waves, off-post multi-unit turnover, and gate-adjacent freeflow compress demand. Flat-rate optimism from pure civilian HOA driveways underprices access and timing risk where accurate.',
      },
      {
        title: 'Elizabethtown growth multi-family is not Radcliff post-adjacent stock',
        detail:
          'Ring Road HOA product and downtown older grids do not share curb rules with Radcliff and Vine Grove military-adjacent multi-unit. Same-county jobs still need product-specific surveys.',
      },
      {
        title: 'I-65, US-31W, and KY-313 burn portal time',
        detail:
          'E-town ↔ Radcliff, Ring Road ↔ West Point, or downtown ↔ I-65 south pairs look local and still burn 20–50+ minutes at peak. Price portal-to-portal honestly.',
      },
      {
        title: 'This is not a Warren County / Bowling Green clone',
        detail:
          'Warren stacks WKU campus density and south-central regional retail; Hardin stacks Fort Knox adjacency, mid-corridor logistics, and Elizabethtown–Radcliff dual nodes. Different calendars and access stacks.',
      },
      {
        title: 'Multi-county and interstate pairs are routine',
        detail:
          'Households regularly move Hardin ↔ Meade, Larue, Bullitt, or Jefferson County KY, or out-of-state on I-65. A Kentucky household goods certificate alone does not authorize interstate delivery — verify FMCSA when any leg leaves Kentucky.',
      },
      KY_REG_BULLET,
    ],
  },
  zonesHeading: 'Hardin County access zones',
  zonesIntro:
    'Plan by downtown Elizabethtown stock, Ring Road growth multi-family, Radcliff–Vine Grove Fort Knox-adjacent belts, West Point river edges, Glendale–south corridor product, and rural larger-lot fringe.',
  zones: [
    {
      id: 'elizabethtown-downtown',
      name: 'Downtown Elizabethtown & historic-core multi-unit',
      shortName: 'Downtown E-town',
      neighborhoods: [
        'Downtown Elizabethtown',
        'Dixie Avenue corridors',
        'Mulberry Street edges',
        'Historic core residential',
        'Central multi-unit pockets',
        'Courthouse edges',
      ],
      housingTypes: 'Older SFH, walk-up multifamily, limited elevators, bungalows',
      challenges: [
        'Stairs, basements, and tighter residential curb',
        'Local arterial freeflow toward Ring Road',
        'Mixed older stock',
      ],
      moverTips:
        'Survey stairs and basements with photos. Prefer mid-week starts. Photo curb options on core blocks.',
      cityKeywords: [
        'elizabethtown',
        'downtown elizabethtown',
      ],
    },
    {
      id: 'ring-road-growth',
      name: 'Ring Road, commercial growth & multi-family belts',
      shortName: 'Ring Road growth',
      neighborhoods: [
        'Ring Road corridors',
        'North Dixie multi-family',
        'Pear Orchard edges',
        'Commercial growth pockets',
        'HOA multi-unit belts',
        'Eastern E-town growth edges',
      ],
      housingTypes: 'Townhomes, multi-family, HOA SFH, newer ranch stock',
      challenges: [
        'HOA timed windows and truck limits',
        'Ring Road / US-31W freeflow at peak',
        'Retail-corridor staging limits',
      ],
      moverTips:
        'Collect HOA packets early. Price Ring Road honestly. Clarify multi-unit vs SFH access on the survey.',
      cityKeywords: [
        'elizabethtown',
        'ring road',
      ],
    },
    {
      id: 'radcliff-vine-grove',
      name: 'Radcliff, Vine Grove & Fort Knox-adjacent stock',
      shortName: 'Radcliff / Vine Grove',
      neighborhoods: [
        'Radcliff',
        'Vine Grove',
        'US-31W north corridors',
        'Off-post multi-unit belts',
        'Wilson Road edges',
        'Military-adjacent residential',
      ],
      housingTypes: 'Multi-family, ranch SFH, townhomes, off-post military-adjacent stock',
      challenges: [
        'PCS calendar volume spikes',
        'Gate-adjacent and US-31W freeflow',
        'Mixed multi-unit rules and long carries',
      ],
      moverTips:
        'Confirm PCS windows and multi-unit rules early. Price US-31W honestly for E-town pairs. Clarify Radcliff vs Vine Grove vs unincorporated addresses.',
      cityKeywords: [
        'radcliff',
        'vine grove',
        'fort knox',
      ],
    },
    {
      id: 'west-point-river',
      name: 'West Point, Ohio River edges & northern fringe',
      shortName: 'West Point / north',
      neighborhoods: [
        'West Point',
        'Ohio River edges',
        'Northern Hardin corridors',
        'River-adjacent residential',
        'US-31W north edges',
        'Northern rural-edge pockets',
      ],
      housingTypes: 'Older SFH, limited multi-unit, river-edge and rural-edge approaches',
      challenges: [
        'Longer empty miles vs E-town core',
        'Flood-adjacent and weather-sensitive approaches where relevant',
        'Limited alternate routes',
      ],
      moverTips:
        'Confirm approach access with photos. Price northern empty miles honestly. Plan weather contingency near river edges.',
      cityKeywords: [
        'west point',
        'elizabethtown',
      ],
    },
    {
      id: 'glendale-south-i65',
      name: 'Glendale, south I-65 corridor & commercial-residential edges',
      shortName: 'Glendale / south I-65',
      neighborhoods: [
        'Glendale',
        'I-65 south corridors',
        'South commercial-residential mix',
        'Sonora edges',
        'Upton edges',
        'Southern corridor stock',
      ],
      housingTypes: 'SFH, multi-unit pockets, commercial-adjacent residential',
      challenges: [
        'I-65 freeflow and freight traffic',
        'Mixed curb and driveway product',
        'Cross-zone empty miles common',
      ],
      moverTips:
        'Price I-65 honestly. Confirm commercial-adjacent staging limits. Clarify Glendale vs Elizabethtown addresses.',
      cityKeywords: [
        'glendale',
        'sonora',
        'upton',
        'elizabethtown',
      ],
    },
    {
      id: 'rural-cecilia-fringe',
      name: 'Cecilia, Rineyville edges & rural larger-lot fringe',
      shortName: 'Rural fringe',
      neighborhoods: [
        'Cecilia',
        'Rineyville edges',
        'Eastview edges',
        'Rural larger-lot pockets',
        'KY-313 edges',
        'Western and southern fringe stock',
      ],
      housingTypes: 'SFH, larger lots, limited multi-unit, rural-edge approaches',
      challenges: [
        'Longer empty miles and narrower approaches',
        'Gravel and soft-edge risk in weather',
        'Limited alternate routes',
      ],
      moverTips:
        'Confirm approach width and turnarounds with photos. Price fringe empty miles honestly. Plan weather contingency.',
      cityKeywords: [
        'cecilia',
        'rineyville',
        'eastview',
        'elizabethtown',
      ],
    },
  ],
  costDrivers: {
    title: 'What drives Hardin County moving costs',
    intro:
      'PCS calendars, multi-family access, and I-65 / US-31W freeflow move the number more than packing skill alone — this is Elizabethtown / Fort Knox-adjacent logistics, not Louisville south pricing.',
    drivers: [
      {
        title: 'PCS waves & military-adjacent multi-unit turnover',
        detail:
          'Radcliff–Vine Grove volume and timing risk add schedule pressure that pure civilian HOA optimism underprices.',
      },
      {
        title: 'HOA multi-family windows on Ring Road growth',
        detail:
          'E-town growth product adds gate lists and truck rules before packing skill matters.',
      },
      {
        title: 'I-65 · US-31W · KY-313 congestion',
        detail:
          'Cross-zone pairs burn portal-to-portal hours even when map miles look short.',
      },
      {
        title: 'Older E-town stairs & basements',
        detail:
          'Downtown and historic-core stock add flight counts that flat-rate optimism underprices.',
      },
      {
        title: 'Rural-edge driveways & multi-county empty miles',
        detail:
          'Fringe approaches and Meade / Bullitt / Jefferson destinations raise staging distance and access complexity.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (simple access)',
        value: '$400–$1,500+',
        note: 'Higher with multi-unit rules or peak I-65 pairs',
      },
      {
        label: '2–3BR condo, duplex, or mid-size SFH',
        value: '$1,200–$3,800+',
        note: 'Stairs, HOA, and PCS-window soft costs trend up',
      },
      {
        label: '3–4+ BR / PCS peak / cross-zone',
        value: '$2,400–$7,500+',
        note: 'PCS waves and long I-65 pairs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$105–$185+/hr',
        note: 'Portal-to-portal; packing, access admin, and stairs scale up',
      },
    ],
  },
  seasonal: {
    title: 'When to schedule a Hardin County move',
    intro:
      'PCS calendars, school cycles, summer heat, severe-storm season, and winter ice reshape access and crew availability across Elizabethtown and Radcliff.',
    items: [
      {
        title: 'Best windows: mid-week early mornings',
        detail:
          'Tuesday–Thursday starts clear multi-unit windows, ease Ring Road staging, and reduce I-65 / US-31W pain. Avoid month-end Fridays when turnovers collide.',
      },
      {
        title: 'Peak season: late May–mid-September (PCS spikes vary)',
        detail:
          'Apartment turnover, family school calendars, and military PCS windows fill first. Book 2–4 weeks ahead for peak weekends and multi-unit slots — confirm PCS dates early when relevant.',
      },
      {
        title: 'Fort Knox-adjacent freeflow & gate timing',
        detail:
          'Post-related traffic and off-post multi-unit density compress Radcliff–Vine Grove approaches. Prefer flexible dates near military-adjacent addresses.',
      },
      {
        title: 'Summer heat, storms & winter ice',
        detail:
          'June–August heat and thunderstorms raise cancellation risk; winter ice affects fringe driveways. Prefer early starts and weather contingency.',
      },
    ],
  },
  specialized: [
    {
      id: 'hardin-etown-knox',
      title: 'Elizabethtown multi-family, Fort Knox adjacency & I-65 logistics module',
      intro:
        'Hardin County estimates fail more often on multi-unit rules, PCS calendar collisions, and freeway freeflow than on packing skill alone.',
      bullets: [
        'Confirm PCS windows and multi-unit move rules early for Radcliff–Vine Grove off-post product.',
        'Collect HOA packets for Ring Road growth multi-family before the survey is final.',
        'Price portal-to-portal time for any pair that rides I-65, US-31W, or KY-313 at peak.',
        'Survey stairs and basements with photos for downtown Elizabethtown stock.',
        'Clarify Elizabethtown, Radcliff, Vine Grove, West Point, and unincorporated addresses on every estimate.',
        'For in-state jobs verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR); verify FMCSA for any out-of-state leg. Military HHG entitlement moves may involve contracted carriers — civilian local moves still need matching KYTC or FMCSA authority for the job type.',
      ],
    },
    {
      id: 'not-louisville-not-warren-clone',
      title: 'Not Louisville south · not Bowling Green clone module',
      intro:
        'A single “I-65 corridor rate” collapses when Elizabethtown / Fort Knox-adjacent product is confused with Louisville Jefferson logistics or Warren County WKU campus freeflow.',
      bullets: [
        'Do not price Radcliff multi-unit like NuLu elevators or like WKU walk-ups as interchangeable defaults.',
        'Keep Hardin vs Meade / Bullitt / Larue / Jefferson county lines clear on multi-address estimates.',
        'Match PCS peaks separately from Ring Road school-calendar waves.',
        'Treat interstate legs as FMCSA authority problems — KYTC alone is not enough out of state.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Hardin County?',
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
              'Hardin County Schools, Elizabethtown Independent, and other systems serve different address patterns, with military-connected enrollment common near Radcliff and Vine Grove. Assignment is address-based — marketing subdivision names do not guarantee a campus.',
          },
          {
            title: 'Choice, boundaries & enrollment pressure',
            detail:
              'Growth edges and military-connected transfers can be competitive. Confirm enrollment windows early when relocating mid-year or on PCS orders.',
          },
          {
            title: 'Research sources',
            detail:
              'District boundary tools, Kentucky Department of Education data, and campus visits beat ranking screenshots alone.',
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
              'Baptist Health Hardin (Elizabethtown) and related campuses anchor local care; Fort Knox medical facilities serve eligible beneficiaries. Confirm insurance networks for your household — some specialty care may pull toward Louisville.',
          },
          {
            title: 'What relocators should do',
            detail:
              'Map peak-hour drive times to preferred campuses — I-65 and US-31W freeflow change “nearby” on paper. Transfer records early, including TRICARE networks when relevant.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Housing mix',
            detail:
              'Expect downtown Elizabethtown older stock; Ring Road multi-family and HOA growth; Radcliff–Vine Grove military-adjacent multi-unit and ranch product; West Point river edges; rural larger-lot fringe.',
          },
          {
            title: 'Cost variation inside the county',
            detail:
              'Purchase prices and rents vary by E-town growth vs Radcliff multi-unit vs rural fringe. Budget for HOA dues, multi-family fees, and PCS-driven turnover dynamics where relevant.',
          },
          {
            title: 'Building and HOA governance',
            detail:
              'Associations and multi-unit management often control move hours, truck size, and deposits. Read documents carefully.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which areas fit whom',
        bullets: [
          {
            title: 'Elizabethtown core / Ring Road convenience',
            detail:
              'Suits people prioritizing retail access and mid-corridor amenities — with HOA rules and arterial freeflow on move day.',
          },
          {
            title: 'Radcliff / Vine Grove Fort Knox-adjacent living',
            detail:
              'Often appeals for military and DoD-connected households — with PCS calendars and multi-unit logistics.',
          },
          {
            title: 'West Point / northern fringe living',
            detail:
              'Attracts households seeking quieter river-edge or fringe product — with longer empty miles to E-town.',
          },
          {
            title: 'Cecilia / rural larger-lot living',
            detail:
              'Fits buyers chasing space — with approach logistics and longer staging distance to commercial cores.',
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
              'Fort Knox and defense-related employment, healthcare, logistics and manufacturing on I-65, retail, and regional services concentrate demand. Some households reverse-commute toward Louisville.',
          },
          {
            title: 'Commute realism',
            detail:
              'Peak I-65 and US-31W freeflow is real — including Louisville-bound reverse commutes. Test peak routes before choosing solely on rent or purchase price.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          {
            title: 'Local character',
            detail:
              'Hardin County stacks Elizabethtown commercial growth, Fort Knox adjacency, and I-65 mid-corridor living — different from Louisville Jefferson product and from Bowling Green WKU regional patterns.',
          },
          {
            title: 'Climate',
            detail:
              'Humid subtropical climate with hot summers, severe-storm risk, and freeze-thaw winters. Plan outdoor staging, heat, and ice contingency as part of move-in.',
          },
          {
            title: 'Culture and pace',
            detail:
              'Visit at peak and off-peak times when deciding — PCS seasons, school calendars, and winter weather reshape daily rhythm.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Hardin County resources',
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify KYTC Division of Motor Carriers household goods licensing for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Hardin County, Kentucky — official site',
        href: 'https://www.hcky.org/',
        external: true,
        note: 'County services & property context',
      },
      {
        label: 'City of Elizabethtown',
        href: 'https://www.elizabethtownky.org/',
        external: true,
        note: 'Municipal permits, services & neighborhood context',
      },
      {
        label: 'City of Radcliff',
        href: 'https://www.radcliff.org/',
        external: true,
        note: 'Fort Knox-adjacent municipality context',
      },
      {
        label: 'GOKY — Kentucky 511 traveler info',
        href: 'https://goky.ky.gov/',
        external: true,
        note: 'I-65 / US-31W / KY-313 before load windows',
      },
    ],
  },
  directoryHint:
    'Prefer crews with multi-family and HOA fluency for Elizabethtown Ring Road growth; PCS and off-post multi-unit experience for Radcliff–Vine Grove Fort Knox-adjacent stock; older-grid stair fluency for downtown E-town; rural-edge approach skill for Cecilia–Rineyville fringe; honest I-65 · US-31W · KY-313 timing for cross-zone pairs. Verify KYTC Division of Motor Carriers household goods certificate (DMT/DVR) for intrastate moves and FMCSA for interstate legs before deposits.',
  lastReviewed: '2026-07-24',
});
