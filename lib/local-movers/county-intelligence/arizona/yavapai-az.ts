import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Yavapai County, Arizona moving intelligence.
 * Differentiators: Prescott / Prescott Valley elevation, milder climate vs Phoenix
 * Valley, mixed historic-town and rural-ranch access — NOT Valley heat scripts or
 * Flagstaff winter packs.
 */
export const yavapaiCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'arizona',
  countySlug: 'yavapai',
  hubTitle: 'Yavapai County Moving Intelligence Hub',
  eyebrow: 'Yavapai County · Prescott elevation & mixed town/rural',
  h1: 'Moving in Yavapai County: Prescott Elevation, Milder Climate & Town-to-Rural Access',
  heroOpener:
    'Yavapai County is not a Phoenix Valley suburb with pine trees. Prescott and Prescott Valley sit at elevation with cooler summers than the Valley, four-season shoulder weather, and a mix of historic downtown grids, planned Valley tracts, and true rural ranch and foothill access. A “local” move can mean a Courthouse Square stair carry one day and a long dirt-approach ranch haul the next. Snow and ice are lighter than Flagstaff but still show up on higher roads; heat is real on lower Verde and desert edges but rarely matches Valley extremes. This guide is for people actually moving in Yavapai — elevation town living, mixed rural logistics, and cross-county hauls toward Phoenix or Flagstaff — not a recycled Maricopa pack.',
  heroCredibility:
    'Arizona Corporation Commission (ACC) entity verification · FMCSA USDOT for interstate legs · Elevation town & rural access · Curated directory listings',
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
    title: 'What makes moving in Yavapai County different',
    intro:
      'Elevation climate, historic-town access, and rural ranch approaches define estimates here — not Valley HOA sprawl or Flagstaff ski-town winter alone.',
    bullets: [
      {
        title: 'Elevation rewrites the climate story vs Phoenix',
        detail:
          'Prescott-area summers are milder than the Valley, but crews still face heat on lower Verde and desert-edge addresses. Winters bring cold mornings, occasional snow/ice on higher roads, and freeze risk that Valley quotes never budget. Ask for season-aware start times — not a copy of a Phoenix summer plan.',
      },
      {
        title: 'Prescott historic core is an access job',
        detail:
          'Downtown grids, older multi-story stock, limited curb staging, and stair carries behave differently from Prescott Valley cul-de-sacs. Walk the block or share street photos before final pricing.',
      },
      {
        title: 'Town vs rural is not one rate card',
        detail:
          'In-town SFH and apartments flip to long gravel drives, soft shoulders, ranch gates, and limited turnaround outside city limits. Same square footage can double labor when the truck cannot stage at the door.',
      },
      {
        title: 'Prescott ↔ Prescott Valley is a real cross-pocket haul',
        detail:
          'Map miles look short, but SR-69 timing, elevation transitions, and different housing stock mean these pairs are not “same-block local.” Name exact origin and destination on every estimate.',
      },
      {
        title: 'Verde Valley and high-desert edges pull different logistics',
        detail:
          'Cottonwood, Camp Verde, Sedona-edge approaches, and lower desert pockets add heat, tourism traffic, and longer deadhead from Prescott crews. Confirm whether “county local” rates still apply.',
      },
      {
        title: 'Four-season shoulders change booking windows',
        detail:
          'Milder summers attract relocators from the Valley; fall foliage and summer tourism tighten Saturday capacity. Mid-week early starts often beat peak-weekend crush.',
      },
      {
        title: 'Longer regional legs toward Phoenix or Flagstaff',
        detail:
          'Many households stage furniture between Yavapai and the Valley or northern Arizona. Those hauls need realistic drive time, weather contingency, and — when they cross state lines — FMCSA authority checks.',
      },
      {
        title: 'ACC entity checks + FMCSA when interstate',
        detail:
          'Arizona does not run a separate statewide household-goods mover license program like some states. Verify business entity status via the Arizona Corporation Commission (ACC), and confirm active FMCSA USDOT (and usually MC) authority when any leg is interstate. Do not treat ACC registration alone as a household-goods operating license.',
      },
    ],
  },
  zonesHeading: 'Yavapai County zones: elevation towns, Valley growth & rural edges',
  zonesIntro:
    'Plan by Prescott historic core, Prescott Valley growth, Chino Valley / north, Verde Valley, and rural ranch / foothill pockets — each shares “Yavapai” on a map but different access and climate problems.',
  zones: [
    {
      id: 'prescott-core',
      name: 'Prescott historic core & westside',
      shortName: 'Prescott core',
      neighborhoods: [
        'Downtown / Courthouse Square area',
        'Mile High / older grid streets',
        'West Prescott residential',
        'Thumb Butte approaches',
        'In-town multi-unit pockets',
      ],
      housingTypes:
        'Historic SFH, bungalows, multi-story older stock, condos, limited multi-family',
      challenges: [
        'Limited curb staging near downtown and events',
        'Stair carries and fragile older interiors',
        'Steep or narrow approaches on some westside streets',
        'Cold-morning frost and occasional winter ice',
      ],
      moverTips:
        'Share street width, parking, and stair photos. Prefer earliest mid-week windows outside major downtown events. Plan freeze protection for winter morning starts.',
      cityKeywords: [
        'prescott',
        'downtown prescott',
        'courthouse square',
        'thumb butte',
        'mile high',
      ],
    },
    {
      id: 'prescott-valley',
      name: 'Prescott Valley growth belt',
      shortName: 'Prescott Valley',
      neighborhoods: [
        'Prescott Valley core',
        'Viewpoint / Glassford Hill edges',
        'Newer planned tracts',
        'Multi-family lease corridors',
        'Retail-corridor residential',
      ],
      housingTypes:
        'Suburban SFH, HOA tracts, townhomes, apartments',
      challenges: [
        'HOA COI and gate rules in planned communities',
        'School-calendar Saturday demand',
        'Wind and open-lot staging exposure',
        'Not interchangeable with Prescott historic access',
      ],
      moverTips:
        'Collect HOA packets early. Price Prescott Valley ↔ Prescott core as a cross-pocket haul with honest SR-69 time. Early starts help with wind and summer heat.',
      cityKeywords: [
        'prescott valley',
        'pv',
        'glassford hill',
        'viewpoint',
      ],
    },
    {
      id: 'chino-north',
      name: 'Chino Valley, Paulden edge & north corridor',
      shortName: 'Chino / North',
      neighborhoods: [
        'Chino Valley',
        'Paulden edge',
        'North SR-89 residential',
        'Larger-lot and rural-suburban edges',
        'Agricultural-adjacent parcels',
      ],
      housingTypes:
        'Larger-lot SFH, manufactured homes, rural-suburban, limited multi-unit',
      challenges: [
        'Longer deadhead from Prescott crews',
        'Soft shoulders and longer driveway carries',
        'Lower service density than core towns',
        'Wind and dust on open lots',
      ],
      moverTips:
        'Send driveway surface and gate photos. Ask whether “local” rate cards still apply for Chino ↔ downtown Prescott pairs. Protect inventory from dust.',
      cityKeywords: [
        'chino valley',
        'paulden',
        'chino',
        'north yavapai',
      ],
    },
    {
      id: 'verde-valley',
      name: 'Verde Valley — Cottonwood, Camp Verde & edges',
      shortName: 'Verde Valley',
      neighborhoods: [
        'Cottonwood',
        'Camp Verde',
        'Clarkdale edge',
        'Verde River corridor residential',
        'Sedona-adjacent approaches (as applicable)',
      ],
      housingTypes:
        'Town SFH, multi-family, retirement and second-home stock, some rural edges',
      challenges: [
        'Warmer lower elevation than Prescott proper',
        'Tourism and weekend traffic on key corridors',
        'Longer hauls from Prescott-based crews',
        'Mixed HOA and older in-town access',
      ],
      moverTips:
        'Confirm crew origin and whether Verde jobs are priced as regional locals. Prefer early starts in summer heat. Flag tourism-weekend congestion.',
      cityKeywords: [
        'cottonwood',
        'camp verde',
        'clarkdale',
        'verde valley',
        'sedona',
      ],
    },
    {
      id: 'rural-ranch-foothill',
      name: 'Rural ranch, foothill & unincorporated Yavapai',
      shortName: 'Rural / Foothill',
      neighborhoods: [
        'Unincorporated ranch parcels',
        'Foothill and forest-edge homes',
        'Long private drives',
        'Gated rural compounds',
        'Mountain-road approaches',
      ],
      housingTypes:
        'Ranch homes, manufactured and modular, larger-lot custom, limited utilities access',
      challenges: [
        'Gravel, soft soil, and limited truck turnaround',
        'Gate codes, livestock, and long carries',
        'Seasonal road conditions and narrow mountain approaches',
        'Shuttle or smaller-truck plans common',
      ],
      moverTips:
        'Treat rural jobs as access-first surveys. Share driveway grade, surface, and turnaround photos. Confirm vehicle capability before dispatching a full-size van.',
      cityKeywords: [
        'rural yavapai',
        'ranch',
        'foothill',
        'unincorporated',
        'mountain',
      ],
    },
    {
      id: 'dewey-humboldt-east',
      name: 'Dewey-Humboldt, Mayer edge & east corridor',
      shortName: 'Dewey / East',
      neighborhoods: [
        'Dewey-Humboldt',
        'Mayer edge',
        'East SR-69 corridor residential',
        'Semi-rural transitional lots',
        'Growth and infill pockets',
      ],
      housingTypes:
        'SFH, manufactured homes, semi-rural lots, limited multi-family',
      challenges: [
        'Corridor traffic on SR-69 peaks',
        'Mixed paved and imperfect approaches',
        'Not Prescott historic and not pure ranch logistics',
        'Service density varies by pocket',
      ],
      moverTips:
        'Name the exact community — Dewey-Humboldt is not interchangeable with downtown Prescott. Price corridor timing honestly and share approach photos.',
      cityKeywords: [
        'dewey',
        'humboldt',
        'dewey-humboldt',
        'mayer',
        'sr-69',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Yavapai County',
    intro:
      'Two “local” moves of the same square footage can differ sharply depending on historic-core access, rural driveway length, Prescott ↔ Valley timing, and whether the address sits at cooler elevation or warmer Verde heat.',
    drivers: [
      {
        title: 'Historic / stair / curb access in Prescott',
        detail:
          'Limited staging, stairs, and older interiors add labor hours that flat Prescott Valley cul-de-sac quotes never capture.',
      },
      {
        title: 'Rural driveway and ranch access',
        detail:
          'Long carries, soft surfaces, gates, and shuttle plans dominate cost outside town limits — access photos prevent underquotes.',
      },
      {
        title: 'Cross-pocket elevation hauls',
        detail:
          'Prescott ↔ Prescott Valley ↔ Verde pairs burn more clock than map miles suggest, especially with corridor traffic and weather.',
      },
      {
        title: 'Seasonal capacity (tourism + Valley relocators)',
        detail:
          'Milder summer and shoulder seasons attract demand from lower desert; Saturday crews fill first.',
      },
      {
        title: 'Regional legs toward Phoenix or Flagstaff',
        detail:
          'Longer deadhead and weather contingency change pricing vs pure in-town locals — confirm transit assumptions in writing.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same pocket, simple access)',
        value: '$350–$1,200+',
        note: 'Higher with stairs, elevators, or rural long-carry',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,000–$3,200+',
        note: 'Cross-pocket and historic-core jobs trend up',
      },
      {
        label: '3–4+ BR (rural / Verde / cross-county)',
        value: '$1,800–$5,500+',
        note: 'Ranch access and regional hauls price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$95–$165+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, elevation weather & calendar intelligence',
    intro:
      'Milder elevation summers, occasional winter ice, tourism weekends, and Valley-to-high-country relocation waves set demand more than pure desert heat scripts.',
    items: [
      {
        title: 'Milder summers than the Valley — still plan heat on lower edges',
        detail:
          'Prescott proper is more move-friendly in summer than Phoenix, but Verde Valley and desert-edge addresses still need early starts and hydration plans.',
      },
      {
        title: 'Winter cold, frost, and occasional snow/ice',
        detail:
          'Higher roads and shaded Prescott streets can ice. Build flexible morning language and protect floors from melt water.',
      },
      {
        title: 'Tourism and event weekends',
        detail:
          'Downtown events and visitor peaks tighten curb space and lodging-adjacent demand. Mid-week bookings often save time and stress.',
      },
      {
        title: 'Valley relocator shoulders',
        detail:
          'Households escaping extreme Valley heat often target late spring through early fall. Book earlier for those windows.',
      },
      {
        title: 'Best value: mid-month mid-week early starts',
        detail:
          'Avoid month-end Saturday peaks when leases and tourism calendars collide. Dawn starts work across elevation and Verde heat.',
      },
    ],
  },
  specialized: [
    {
      id: 'elevation-town-rural-mix',
      title: 'Elevation town + rural ranch access module',
      intro:
        'Yavapai’s signature problem is mixed product: historic Prescott staging one day, long ranch drives the next — Valley HOA scripts fail both.',
      bullets: [
        'Share driveway grade, surface, gate codes, and turnaround photos for any non-grid address before booking.',
        'Assume shuttle or long-carry labor when a full-size truck cannot stage at the door.',
        'Walk or photo-survey historic Prescott blocks for stairs, curb limits, and event conflicts.',
        'Price Prescott ↔ Prescott Valley ↔ Verde as cross-pocket hauls with honest corridor time.',
        'Confirm vehicle capability for mountain or soft-surface approaches before dispatch day.',
      ],
    },
    {
      id: 'valley-to-high-country-regional',
      title: 'Valley-to-high-country & regional haul module',
      intro:
        'Many Yavapai moves connect to Phoenix-area origins or northern Arizona destinations — those are regional logistics jobs, not pure locals.',
      bullets: [
        'Name exact origin and destination cities; “Arizona local” is not a pricing plan.',
        'Build weather contingency for elevation transitions (heat below, cold/ice above).',
        'When any leg crosses state lines, verify FMCSA USDOT/MC authority before deposit.',
        'Ask about overnight transit, storage-in-transit, and crew change assumptions in writing.',
        'Verify business entity status via ACC; do not confuse entity registration with a household-goods license.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Yavapai County?',
    intro:
      'Elevation living, milder climate than the Valley, and mixed town/rural lifestyles are different bets — pick Prescott historic, Prescott Valley growth, Verde, or rural ranch first, then validate schools, healthcare, and winter comfort.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Yavapai spans multiple districts and charter options (e.g., Prescott Unified, Humboldt Unified, Chino Valley, Camp Verde, Cottonwood-Oak Creek, and others). Match every listing address to the correct district.',
        bullets: [
          {
            title: 'Town-first district check',
            detail:
              'Use official district boundary tools. Prescott Valley, unincorporated pockets, and Verde communities can span different feeders with similar marketing names.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Arizona Department of Education data should lead; third-party rankings are secondary signals only.',
          },
          {
            title: 'Higher education presence',
            detail:
              'Yavapai College and regional campuses shape staff and student housing demand near certain corridors.',
          },
          {
            title: 'Rural transportation reality',
            detail:
              'Longer bus rides and limited after-school logistics matter for ranch and foothill addresses — factor commute to activities, not only test scores.',
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
              'Yavapai Regional Medical Center campuses (Prescott / Prescott Valley area), Verde Valley Medical Center, and other regional facilities cover most needs — map ER drive times from rural parcels vs in-town addresses.',
          },
          {
            title: 'Specialty travel',
            detail:
              'Some specialties still pull households toward Phoenix for appointments. Confirm insurer networks and travel tolerance before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer records early; winter weather can slow rural access to care on rare ice days.',
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
              'Prescott historic and view lots, Prescott Valley planned product, Verde town stock, and rural acreage price differently. Compare insurance, heating/cooling, and commute — not sticker price alone.',
          },
          {
            title: 'Elevation utility reality',
            detail:
              'Cooler summers cut peak AC vs the Valley, but winter heating and occasional freeze protection matter. Factor utility estimates into “affordable” addresses.',
          },
          {
            title: 'HOA vs rural tradeoffs',
            detail:
              'Planned communities bring rules and fees; rural lots bring access, well/septic, and longer service distances. Match housing type to move-day logistics.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Prescott historic / in-town',
            detail:
              'Walkable amenities and character — only if you accept older access, events, and stair realities on move day.',
          },
          {
            title: 'Prescott Valley',
            detail:
              'More conventional suburban product and newer stock — with HOA logistics and corridor timing to Prescott jobs and services.',
          },
          {
            title: 'Verde Valley towns',
            detail:
              'Warmer lower elevation, tourism influence, and river-corridor living — different climate and traffic than mile-high Prescott.',
          },
          {
            title: 'Rural ranch / foothill',
            detail:
              'Space and quiet — with long drives, soft approaches, and self-sufficiency expectations for services and move-day access.',
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
              'Healthcare, education, government, retail/hospitality, construction trades, and retirement-economy services — not Phoenix tech corridors.',
          },
          {
            title: 'Corridor patterns',
            detail:
              'Many commutes run SR-69, SR-89, and in-town grids. Peak tourism and school traffic matter more than freeway stack-ups.',
          },
          {
            title: 'Remote + Valley hybrid',
            detail:
              'Some households keep Valley employment with hybrid travel. Housing choice should price those regional drives honestly.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Elevation climate advantage',
            detail:
              'Milder summers than the Phoenix Valley, four seasons at a light touch, and cooler nights — a primary draw for relocators.',
          },
          {
            title: 'Outdoors and town culture',
            detail:
              'Trails, lakes, and a strong small-city downtown culture define daily life; visit on a weekday and a tourist weekend before choosing a pocket.',
          },
          {
            title: 'Winter readiness',
            detail:
              'Not Flagstaff-level snow, but frost, ice, and cold mornings are real — plan vehicles, pipes, and move dates accordingly.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Yavapai County resources',
    intro:
      'Official links and verification notes — road conditions, weather, and access rules change; verify before move day.',
    items: [
      {
        label: 'Yavapai County',
        href: 'https://www.yavapaiaz.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Prescott',
        href: 'https://prescott-az.gov/',
        external: true,
      },
      {
        label: 'Town of Prescott Valley',
        href: 'https://www.prescottvalley-az.gov/',
        external: true,
      },
      {
        label: 'Town of Chino Valley',
        href: 'https://www.chinoaz.net/',
        external: true,
      },
      {
        label: 'City of Cottonwood',
        href: 'https://cottonwoodaz.gov/',
        external: true,
      },
      {
        label: 'ADOT — road conditions & construction',
        href: 'https://azdot.gov/',
        note: 'Check SR-69, SR-89, and mountain corridor delays',
        external: true,
      },
      {
        label: 'National Weather Service — Flagstaff office coverage',
        href: 'https://www.weather.gov/fgz/',
        note: 'Elevation weather, wind, and winter alerts for move planning',
        external: true,
      },
      {
        label: 'Arizona Corporation Commission (ACC) — entity search',
        href: 'https://www.azcc.gov/',
        note: 'Verify business entity status (not a household-goods mover license)',
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
    'Filter listings by zone (Prescott core, Prescott Valley, Chino/North, Verde Valley, Rural/Foothill, Dewey/East) when available. Confirm access photos for historic and rural addresses, elevation weather plans, and ACC + FMCSA checks — not Phoenix Valley assumptions.',
  lastReviewed: '2026-07-23',
};
