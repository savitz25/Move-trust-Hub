import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  CA_TIER2_BHGS_BULLET,
  finalizeCaTier2Pack,
} from '@/lib/local-movers/county-intelligence/ca-tier2-shared';

/**
 * Yolo County — California Tier 2 (Davis–Woodland Sacramento collar).
 * Parent: Sacramento County Tier 1. Not capital-core elevators with Aggie branding.
 */
export const yoloCountyIntelligence: CountyIntelligencePack = finalizeCaTier2Pack({
  countySlug: 'yolo',
  hubTitle: 'Yolo County Moving Intelligence Hub',
  eyebrow: 'Yolo County · Sacramento collar · Davis–Woodland / UC Davis',
  h1: 'Moving in Yolo County: Davis–Woodland Sacramento Collar, UC Davis Cycles & I-80 / I-5',
  heroOpener:
    'Yolo County is the Davis–Woodland collar west of Sacramento — not Midtown elevators with a different ZIP and not a pure farm-town script. Davis runs on UC Davis semester churn, bike-grid multi-unit, and I-80 freeflow to the capital; Woodland adds family suburban stock and I-5 / CA-113 timing; West Sacramento sits on the river edge with multi-unit density and Sac-pair volume; Winters and ag edges bring two-lane approaches and farm logistics. Summer heat rewrites afternoon packing. Crews that quote “Sacramento local” without naming Davis multi-unit vs Woodland tract vs ag-edge access underprice university peaks, corridor time, and rural long carries.',
  heroCredibility:
    'Sacramento collar · UC Davis cycles · I-80 / I-5 · BHGS in-state · FMCSA interstate · Curated listings',
  majorCorridors: 'I-80 · I-5 · US-50 approaches · CA-113 · CA-16',
  parentCompare: {
    parentLabel: 'Sacramento County',
    parentHref: '/local-movers/california/sacramento',
    title: 'Compared with Sacramento County',
    intro:
      'Yolo is the west collar of the capital region — UC Davis turnover and ag-adjacent towns, not capital-core Midtown/East Sac multi-unit density alone. Use this when one address sits in Sacramento County and the other in Yolo.',
    bullets: [
      {
        title: 'Corridor & drive time',
        detail:
          'I-80 links Davis toward Sacramento and the Bay; I-5 serves Woodland and north/south freeflow; US-50 approaches touch West Sacramento/Sac pairs; CA-113 and CA-16 feed Winters and west-county edges. Davis ↔ downtown Sacramento is a timed metro local; Davis ↔ Winters or Woodland ↔ ag edges add two-lane clock capital grid quotes miss.',
      },
      {
        title: 'Housing differences',
        detail:
          'Davis multi-unit and academic-adjacent rentals, Woodland family tracts, West Sacramento river-edge stock, and ag-edge SFH replace many Sacramento pocket types. Student inventory cycles and farm outbuildings both appear under one county label.',
      },
      {
        title: 'Truck access, university & ag density',
        detail:
          'Davis core grids and campus-adjacent parking rules differ from Woodland suburban staging. Harvest traffic slows west and south edges. Capital loading-dock assumptions do not transfer to farm-edge or Winters two-lane parcels.',
      },
      {
        title: 'Cost posture',
        detail:
          'Same-zone Woodland jobs can look suburban-simple until heat hits. Davis multi-unit peaks, Davis ↔ Sac I-80 pairs, and ag-edge long carries price higher than flat Sacramento County locals of similar bedrooms when portal time and building windows stack.',
      },
      {
        title: 'Market role',
        detail:
          'Sacramento collar secondary: UC Davis-driven turnover in Davis, family volume in Woodland, river-edge multi-unit in West Sacramento, and ag logistics on the edges. Popular long-locals bias toward Sacramento County and nearby secondaries — not a capital-only rate card.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Yolo County different',
    intro:
      'Collar-market realities — UC Davis cycles, I-80/I-5 freeflow, ag-adjacent access, and California licensing.',
    bullets: [
      {
        title: 'Davis is a university product; Woodland is family suburban',
        detail:
          'Semester multi-unit churn, bike-grid streets, and campus-adjacent rules define Davis. Woodland runs tracts and in-town stock. Name both cities — “Yolo County local” fails across Davis ↔ Winters or West Sac pairs.',
      },
      {
        title: 'I-80 / I-5 freeflow is still clock time',
        detail:
          'Many households pair addresses with Sacramento County. Peak I-80, I-5, and CA-113 delays are billable. Ask how portal-to-portal time is priced across the county line.',
      },
      {
        title: 'Ag-adjacent edges and west-county two-lanes',
        detail:
          'Farm freight, soft shoulders, and long driveways appear outside the Davis–Woodland cores. Share approach photos on Winters, rural CA-16, and ag-edge jobs before dispatch.',
      },
      {
        title: 'Valley summer heat',
        detail:
          'Afternoon highs rewrite outdoor packing and crew pacing on open suburban and ag staging. Prefer early starts May–September.',
      },
      CA_TIER2_BHGS_BULLET,
    ],
  },
  zonesHeading: 'Yolo County zones: Davis, Woodland, West Sacramento & west/ag edges',
  zonesIntro:
    'Four sharp zones — Davis / UC Davis, Woodland, West Sacramento river edge, and Winters / ag west. University calendars and corridor time define the job more than generic Sacramento tips.',
  zones: [
    {
      id: 'davis-ucd',
      name: 'Davis & UC Davis Edge',
      shortName: 'Davis',
      neighborhoods: [
        'Downtown Davis',
        'Central / South / West Davis',
        'UC Davis-adjacent',
        'East Davis multi-unit',
        'El Macero edge',
      ],
      housingTypes:
        'Multi-family and student-adjacent rentals, mid-century SFH, denser bike-grid stock, some HOA edges',
      challenges: [
        'UC Davis semester move-in/out peaks',
        'Multi-unit elevators, parking scarcity, and building windows',
        'I-80 congestion toward Sacramento at peak',
      ],
      moverTips:
        'Book early around quarter/semester transitions. Confirm elevator, parking, and building hours for multi-unit. Price Davis ↔ Sacramento as a timed I-80 local — not map-mile freeflow.',
      cityKeywords: [
        'davis',
        'uc davis',
        'ucd',
        'el macero',
        'downtown davis',
        'west davis',
      ],
    },
    {
      id: 'woodland',
      name: 'Woodland Metro & CA-113 Corridor',
      shortName: 'Woodland',
      neighborhoods: [
        'Woodland',
        'Downtown Woodland',
        'North / South Woodland',
        'CA-113 corridor',
        'Spring Lake / newer edges',
      ],
      housingTypes:
        'Family SFH tracts, multi-family, older in-town stock, newer suburban edges',
      challenges: [
        'I-5 / CA-113 peak delays',
        'Summer heat on open suburban staging',
        'Ag freight on edges during harvest windows',
      ],
      moverTips:
        'Early summer starts beat heat. Price Woodland ↔ Davis or Woodland ↔ Sacramento with honest I-5/I-80/113 time. Note ag-edge access on south and west parcels.',
      cityKeywords: [
        'woodland',
        'spring lake',
        'woodland ca',
        'north woodland',
        'south woodland',
      ],
    },
    {
      id: 'west-sacramento',
      name: 'West Sacramento River Edge',
      shortName: 'West Sacramento',
      neighborhoods: [
        'West Sacramento',
        'Bridge District / riverfront edges',
        'Southport',
        'Broderick / older pockets',
        'US-50 approaches',
      ],
      housingTypes:
        'Multi-family and newer planned stock, river-edge SFH, mixed older pockets',
      challenges: [
        'Sac-pair traffic on bridge and US-50 approaches',
        'Multi-unit COI and reserved move windows',
        'Tight staging in denser riverfront blocks',
      ],
      moverTips:
        'Collect building rules early for multi-unit and planned communities. Price West Sacramento ↔ downtown Sacramento as a short but timed river-crossing local. Clarify whether quotes treat it as Yolo or Sac freeflow.',
      cityKeywords: [
        'west sacramento',
        'southport',
        'bridge district',
        'broderick',
        'west sac',
      ],
    },
    {
      id: 'winters-ag-west',
      name: 'Winters & West / Ag Edges',
      shortName: 'West / Ag',
      neighborhoods: [
        'Winters',
        'CA-128 / CA-16 approaches',
        'Esparto edge',
        'Dunnigan edge',
        'Rural west and north ag pockets',
      ],
      housingTypes:
        'Small-town SFH, ranch-edge lots, ag-adjacent homes, limited multi-unit',
      challenges: [
        'Two-lane approaches and limited turnaround',
        'Harvest freight delay',
        'Longer deadhead from Davis/Woodland hub crews',
      ],
      moverTips:
        'Access-first photos on rural final approaches. Build ag-season buffer. Price Winters ↔ Davis or ag-edge ↔ Woodland with two-lane clock — not flat collar map miles.',
      cityKeywords: [
        'winters',
        'esparto',
        'dunnigan',
        'yolo',
        'west yolo',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Yolo County',
    intro:
      'Compressed drivers — I-80/I-5 cross-zone time, UC Davis multi-unit peaks, and ag-edge access.',
    drivers: [
      {
        title: 'I-80 / I-5 / CA-113 cross-zone time',
        detail:
          'Davis ↔ Sacramento, Woodland ↔ Davis, or West Sac bridge pairs burn more clock than map miles at peak. Hourly billing follows the clock.',
      },
      {
        title: 'UC Davis multi-unit & building soft costs',
        detail:
          'Semester peaks, elevator COI, and parking limits add soft costs and force narrow weekday windows before labor starts.',
      },
      {
        title: 'Ag-edge access & summer heat',
        detail:
          'Rural long carries, harvest delay, and extreme afternoon heat slow packing and staging outside core tracts.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,500+',
        note: 'Higher with multi-unit windows or rural long-carry',
      },
      {
        label: '2–3BR house / tract or condo',
        value: '$1,500–$4,000+',
        note: 'I-80/I-5 pairs and Davis peaks trend up',
      },
      {
        label: '3–4+ BR (cross-zone / ag edge / Sac collar peak)',
        value: '$2,400–$7,000+',
        note: 'University peaks and rural access jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal intelligence',
    intro:
      'UC Davis calendars, school leases, harvest freight, and Valley heat set operational risk.',
    items: [
      {
        title: 'UC Davis move-in / move-out peaks',
        detail:
          'Quarter and semester transitions concentrate multi-unit volume in Davis. Book early and confirm building rules around academic calendars.',
      },
      {
        title: 'Peak residential: late spring – early fall weekends',
        detail:
          'School calendars and end-of-month leases fill Saturdays across Woodland, West Sacramento, and Davis family stock. Book 2–4 weeks ahead for popular windows.',
      },
      {
        title: 'Harvest freight & summer heat',
        detail:
          'Ag peaks congest west and south edges; Valley afternoons can be extreme. Early starts and heat-safe packing protect crews and inventory.',
      },
    ],
  },
  specialized: [
    {
      id: 'uc-davis-cycles',
      title: 'UC Davis university turnover',
      intro:
        'Campus-adjacent multi-unit creates academic peaks distinct from pure capital-region lease seasons.',
      bullets: [
        'Align booking with UC Davis move-in/out windows when either household is student-, staff-, or faculty-adjacent.',
        'Confirm elevator reservations, parking plans, and building hours early.',
        'Treat Davis multi-unit density as its own product — not a Woodland tract quote with the city name swapped.',
      ],
    },
    {
      id: 'i80-i5-collar',
      title: 'I-80 / I-5 Sacramento collar freeflow',
      intro:
        'Collar pairs into Sacramento County are timed corridor jobs — still billable clock.',
      bullets: [
        'If either address is in Sacramento County, confirm whether local rate cards still apply across the line.',
        'Map peak I-80, I-5, and US-50 approach timing for Davis, Woodland, and West Sacramento pairs.',
        'Price portal-to-portal honestly on Davis ↔ Sac and Woodland ↔ Sac legs.',
      ],
    },
    {
      id: 'ag-adjacent-access',
      title: 'Ag-adjacent & west-county access',
      intro:
        'Winters and farm edges need truck plans Davis multi-unit jobs never see.',
      bullets: [
        'Share driveway width, soft-shoulder, and turnaround photos before booking.',
        'Build harvest-season freight buffer on CA-16 / CA-128 and rural approaches.',
        'Inventory outbuildings and long carries on ranch-edge parcels.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Yolo County?',
    intro:
      'Compressed relocator notes — schools and hospitals by pocket, then test I-80 commute to Sacramento and UC Davis traffic for the address you want.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Multiple districts (Davis Joint Unified, Woodland Joint Unified, Washington Unified / West Sacramento, Winters Joint Unified, Esparto, and others). Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district tools and the California School Dashboard. Marketing city names and unincorporated pockets can span feeders.',
          },
          {
            title: 'Davis vs Woodland vs West Sac vs west county',
            detail:
              'Enrollment pressure and program mix differ by pocket. UC Davis shapes rental demand and traffic near campus-adjacent Davis more than any other Yolo pocket.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail:
              'Sutter Davis Hospital anchors Davis access; Woodland Memorial and West Sacramento–area services cover other pockets — map ER drive times at rush hour from your target neighborhood, including I-80 delay toward Sacramento campuses.',
          },
          {
            title: 'Sacramento specialty spillover',
            detail:
              'Many households use Sacramento County specialty systems. Confirm insurer networks and realistic I-80 / US-50 appointment times before choosing a far-west or ag-only address.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Yolo County resources',
    intro:
      'Local official links first. BHGS, FMCSA, and Move Trust Hub tools are added automatically for licensing checks.',
    items: [
      {
        label: 'County of Yolo',
        href: 'https://www.yolocounty.org/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Davis',
        href: 'https://www.cityofdavis.org/',
        external: true,
      },
      {
        label: 'City of Woodland',
        href: 'https://www.cityofwoodland.org/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter by zone (Davis, Woodland, West Sacramento, West/Ag) when available. Confirm UC Davis timing, I-80/I-5 portal time, and ag-edge access photos — not Sacramento County assumptions alone. Parent capital market: Sacramento guide.',
  lastReviewed: '2026-07-24',
});
