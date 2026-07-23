import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Coconino County, Arizona moving intelligence.
 * Differentiators: Flagstaff elevation, real winter weather, tourism peaks,
 * mountain-town and canyon-edge access — NOT Valley heat, Yuma snowbird, or
 * Mohave long-desert dispersion alone.
 */
export const coconinoCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'arizona',
  countySlug: 'coconino',
  hubTitle: 'Coconino County Moving Intelligence Hub',
  eyebrow: 'Coconino County · Flagstaff elevation, winter & mountain access',
  h1: 'Moving in Coconino County: Flagstaff Elevation, Winter Weather & Mountain-Town Access',
  heroOpener:
    'Coconino County is not desert Arizona with a pine filter. Flagstaff sits near 7,000 feet with real winter snow and ice, freeze-thaw driveway problems, and a mountain-town street grid that punishes oversized trucks. Tourism and university calendars pack curb space; forest and canyon-edge communities (including longer hauls toward Grand Canyon and remote plateaus) turn “local” into regional logistics. Summer monsoons and winter storms both stop outdoor work. A successful move here is elevation and weather first — tire chains, roof clearances, steep approaches, and flexible dates — not a recycled Phoenix heat script or a Yuma snowbird pack. This guide is for people actually moving in Coconino: winter operations, tourism timing, and mountain-town access.',
  heroCredibility:
    'Arizona Corporation Commission (ACC) entity verification · FMCSA USDOT for interstate legs · Elevation winter & mountain-town access · Curated directory listings',
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
    title: 'What makes moving in Coconino County different',
    intro:
      'High elevation, genuine winter weather, tourism/university peaks, and mountain or canyon-edge access define estimates here — not low-desert heat logistics.',
    bullets: [
      {
        title: 'Elevation and winter are first-order operations',
        detail:
          'Snow, ice, freeze-thaw heaves, and cold-soaked mornings change start times, truck choice, and whether a driveway is even usable. Valley summer plans fail in Flagstaff January. Ask explicitly for winter weather policies and delay language.',
      },
      {
        title: 'Mountain-town access is not Valley HOA access',
        detail:
          'Narrow streets, steep grades, limited turnaround, snowbanks narrowing curb cuts, and older multi-story stock require smaller equipment and longer carries. Share driveway grade and winter photos, not only summer Google Street View.',
      },
      {
        title: 'Tourism peaks rewrite curb and calendar',
        detail:
          'Grand Canyon travel seasons, weekend visitors, and special events fill lodging-adjacent corridors and downtown staging. Mid-week early windows beat peak tourist Saturdays.',
      },
      {
        title: 'University and student calendars create lease clusters',
        detail:
          'Northern Arizona University move-in/out waves pack multi-family corridors and storage demand. Book academic peaks early.',
      },
      {
        title: 'Forest, canyon, and remote plateau hauls are regional jobs',
        detail:
          'Addresses toward parks, canyons, and far unincorporated communities add long mountain highway miles, weather exposure, and limited crew density. Price deadhead honestly.',
      },
      {
        title: 'Monsoon and winter storms both pause outdoor work',
        detail:
          'Summer storms bring lightning and downpours; winter storms bring snow and ice. Flexible dates and covered staging matter more than in mild-elevation towns.',
      },
      {
        title: 'Altitude affects people and some goods',
        detail:
          'Crews and customers new to 7,000 feet may pace differently; sealed containers and liquids need sensible packing. Plan hydration and realistic day length in winter daylight.',
      },
      {
        title: 'ACC entity checks + FMCSA when interstate',
        detail:
          'Arizona does not operate a separate statewide household-goods mover license program like some states. Verify business entity status via the Arizona Corporation Commission (ACC), and confirm active FMCSA USDOT (and usually MC) authority when any leg is interstate (common toward New Mexico, Utah, Nevada, or California). ACC registration alone is not a household-goods operating license.',
      },
    ],
  },
  zonesHeading: 'Coconino County zones: Flagstaff core, mountains, corridors & remote edges',
  zonesIntro:
    'Plan by Flagstaff core / campus, westside and forest-edge, east Flagstaff / I-40, Sedona-adjacent south approaches, and remote north/canyon communities — winter weather is shared; access difficulty is not.',
  zones: [
    {
      id: 'flagstaff-core-campus',
      name: 'Flagstaff core, downtown & NAU-adjacent',
      shortName: 'Flagstaff core / NAU',
      neighborhoods: [
        'Downtown Flagstaff',
        'NAU-adjacent multi-family',
        'Historic and in-town grids',
        'Southside / core residential',
        'Campus-edge rentals',
      ],
      housingTypes:
        'Older SFH, apartments, condos, student-oriented multi-family, historic stock',
      challenges: [
        'Limited curb staging and winter snowbank loss of parking',
        'Stair carries and older interiors',
        'Student lease peaks and tourism weekends',
        'Ice on shaded streets and walkways',
      ],
      moverTips:
        'Book around NAU move peaks early. Prefer mid-week non-event windows. Plan ice melt protection for floors and longer carries when snow narrows staging.',
      cityKeywords: [
        'flagstaff',
        'nau',
        'downtown flagstaff',
        'northern arizona university',
        'southside',
      ],
    },
    {
      id: 'flagstaff-west-forest',
      name: 'West Flagstaff, forest edge & mountain approaches',
      shortName: 'West / Forest edge',
      neighborhoods: [
        'West Flagstaff residential',
        'Forest Highlands edges (as applicable)',
        'Mountain and ski-adjacent approaches',
        'Larger-lot pine forest homes',
        'Steep driveway neighborhoods',
      ],
      housingTypes:
        'SFH, cabin-style and custom forest homes, some HOA mountain communities',
      challenges: [
        'Steep grades and limited truck turnaround',
        'Snow and ice on shaded forest drives',
        'Low branches and narrow private roads',
        'HOA and gate rules in some communities',
      ],
      moverTips:
        'Treat forest-edge homes as access-first winter jobs. Share grade, clearance, and turnaround photos. Confirm chain or 4x4 needs in writing for storm windows.',
      cityKeywords: [
        'west flagstaff',
        'forest highlands',
        'snowbowl',
        'fort valley',
        'mountain flagstaff',
      ],
    },
    {
      id: 'flagstaff-east-i40',
      name: 'East Flagstaff, I-40 corridor & continental edges',
      shortName: 'East / I-40',
      neighborhoods: [
        'East Flagstaff',
        'I-40 corridor residential',
        'Continental / country-club edges',
        'Newer tract and multi-family pockets',
        'Airport-adjacent approaches',
      ],
      housingTypes:
        'Suburban SFH, HOA tracts, apartments, some larger-lot edges',
      challenges: [
        'Corridor wind and winter black ice risk',
        'HOA COI where planned communities apply',
        'Tourism and through-traffic on peak weekends',
        'Still full elevation winter — not Valley weather',
      ],
      moverTips:
        'Collect HOA packets early. Do not price as desert suburb. Build storm delay language for I-40 impacts on crew arrival.',
      cityKeywords: [
        'east flagstaff',
        'continental',
        'i-40 flagstaff',
        'flagstaff east',
      ],
    },
    {
      id: 'sedona-south-approach',
      name: 'Sedona-adjacent south county & Oak Creek approaches',
      shortName: 'Sedona / South approach',
      neighborhoods: [
        'Sedona (Coconino portions / adjacent logistics)',
        'Oak Creek Canyon approaches',
        'Village of Oak Creek edges (as applicable)',
        'Red-rock tourism residential',
        'Steep canyon-road parcels',
      ],
      housingTypes:
        'SFH, vacation and second-home stock, condos, hillside custom',
      challenges: [
        'Tourism traffic and limited staging',
        'Steep, winding canyon approaches',
        'Visitor-calendar peaks year-round',
        'Weather transitions between Flagstaff snow and lower red-rock zones',
      ],
      moverTips:
        'Price canyon and red-rock access separately from Flagstaff core. Share approach videos when roads are narrow. Avoid peak visitor weekends when possible.',
      cityKeywords: [
        'sedona',
        'oak creek',
        'village of oak creek',
        'canyon',
        'red rock',
      ],
    },
    {
      id: 'page-north',
      name: 'Page, far north lake & plateau communities',
      shortName: 'Page / North',
      neighborhoods: [
        'Page',
        'Lake Powell-oriented residential',
        'Far north plateau parcels',
        'Tourism and park-service adjacent housing',
        'Highway-linked remote clusters',
      ],
      housingTypes:
        'Town SFH, multi-family, tourism workforce housing, limited remote lots',
      challenges: [
        'Very long deadhead from Flagstaff crews',
        'Tourism peaks and limited equipment density',
        'Wind, sun, and seasonal storm exposure on open highway hauls',
        'Not interchangeable with Flagstaff winter street logistics',
      ],
      moverTips:
        'Treat Page and far-north jobs as regional hauls. Confirm crew origin, overnight needs, and weather windows. Verify FMCSA if Utah destinations appear.',
      cityKeywords: [
        'page',
        'lake powell',
        'page az',
        'glen canyon',
        'far north coconino',
      ],
    },
    {
      id: 'remote-canyon-parks',
      name: 'Grand Canyon edges, parks & remote unincorporated',
      shortName: 'Canyon / Remote',
      neighborhoods: [
        'Grand Canyon-adjacent communities',
        'Park-service and gateway housing',
        'Remote forest roads',
        'Unincorporated plateau parcels',
        'Seasonal and workforce housing edges',
      ],
      housingTypes:
        'Gateway SFH, workforce multi-family, cabins, limited remote custom',
      challenges: [
        'Extreme distance and weather exposure',
        'Narrow or restricted approaches near park operations',
        'Limited services and long carries',
        'Permit and access rules near federal lands when applicable',
      ],
      moverTips:
        'Plan remote canyon-edge moves like specialty logistics: photos, alternate dates, and explicit mileage. Confirm any federal land access constraints before dispatch.',
      cityKeywords: [
        'grand canyon',
        'tusayan',
        'canyon',
        'remote coconino',
        'parks',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Coconino County',
    intro:
      'Winter access, mountain grades, tourism/university peaks, and remote highway deadhead move quotes more than square footage alone — elevation logistics, not desert heat pacing alone.',
    drivers: [
      {
        title: 'Snow, ice, and freeze-thaw access',
        detail:
          'Storm delays, snowbank-narrowed staging, and unsafe grades can add days or require smaller equipment and extra labor.',
      },
      {
        title: 'Steep forest and canyon approaches',
        detail:
          'Long carries, shuttle vans, and limited turnaround dominate cost on mountain and red-rock edges.',
      },
      {
        title: 'Tourism and NAU calendar capacity',
        detail:
          'Peak visitor and student windows tighten crews and raise lead times — book early for known move-in weeks.',
      },
      {
        title: 'Remote north and park-edge deadhead',
        detail:
          'Page, canyon gateways, and far unincorporated parcels bill like regional hauls from Flagstaff staging.',
      },
      {
        title: 'Interstate mountain-west legs',
        detail:
          'Routes into Utah, New Mexico, Nevada, or California need FMCSA authority and weather-aware transit assumptions.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same Flagstaff zone, fair weather)',
        value: '$400–$1,350+',
        note: 'Higher with stairs, snow delays, or student peaks',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,200–$3,800+',
        note: 'Forest-edge grades and winter jobs trend up',
      },
      {
        label: '3–4+ BR (mountain / canyon / remote / regional)',
        value: '$2,200–$7,000+',
        note: 'Remote north and storm-window jobs price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$180+/hr',
        note: 'Portal-to-portal; winter difficulty and packing scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal winter, monsoon, tourism & university intelligence',
    intro:
      'Snow and ice, summer monsoons, Grand Canyon tourism, and NAU calendars set demand more than low-desert heat or pure snowbird cycles.',
    items: [
      {
        title: 'Winter snow and ice (primary constraint)',
        detail:
          'Storms can close or slow mountain highways and make steep driveways unusable. Build multi-day flexibility and ask about cancellation or weather-delay policies before deposit.',
      },
      {
        title: 'Freeze-thaw and black ice mornings',
        detail:
          'Even between storms, shaded streets and metal ramps ice. Later morning starts can be safer than dawn in deep winter — the opposite of desert heat logic.',
      },
      {
        title: 'Summer monsoon and lightning pauses',
        detail:
          'Afternoon storms interrupt outdoor packing. Morning-weighted schedules still help in summer for different reasons than Valley heat.',
      },
      {
        title: 'Tourism and NAU peaks',
        detail:
          'Visitor seasons and student move weeks fill curb space and crews. Book academic and holiday-adjacent windows early.',
      },
      {
        title: 'Best value: mid-week fair-weather windows',
        detail:
          'Watch the mountain forecast 72 hours out; prefer flexible mid-week dates over rigid Saturday storm gambles.',
      },
    ],
  },
  specialized: [
    {
      id: 'elevation-winter-ops',
      title: 'Elevation winter operations module',
      intro:
        'Coconino’s defining logistics problem is high-elevation winter — snow, ice, steep forest drives, and storm delay risk that desert counties never price.',
      bullets: [
        'Require driveway grade, surface, and winter-condition photos before final pricing on any non-flat address.',
        'Put weather-delay, road-closure, and reschedule language in writing before deposit.',
        'Confirm truck size, 4x4/chain capability, and shuttle plans for snow-narrowed streets.',
        'Protect floors from melt water and grit; plan longer carries when curb cuts disappear under snowbanks.',
        'Do not import dawn-start heat scripts blindly — icy mornings may need later starts for safety.',
      ],
    },
    {
      id: 'tourism-mountain-remote',
      title: 'Tourism, mountain-town & remote canyon haul module',
      intro:
        'Flagstaff core, red-rock tourism edges, and far canyon or Page hauls are different products sharing one county name.',
      bullets: [
        'Avoid peak visitor Saturdays for downtown and Sedona-approach staging when possible.',
        'Book NAU move-in/out weeks as soon as lease dates are known.',
        'Price Page, Grand Canyon gateway, and remote parcels with explicit mileage and overnight assumptions.',
        'Share canyon-road approach videos for narrow or steep tourist corridors.',
        'Verify ACC entity status; confirm FMCSA USDOT/MC when any leg crosses state lines.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Coconino County?',
    intro:
      'High-elevation living, real winter, tourism economy, and mountain or remote-plateau lifestyles are different bets — visit in January and in peak summer tourism before choosing a pocket based on one perfect fall weekend.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Coconino spans Flagstaff Unified and other district or community options across a huge geographic county. Match every listing address to the correct system — remote communities are not Flagstaff feeders by default.',
        bullets: [
          {
            title: 'Address-first district check',
            detail:
              'Use official boundary tools. Forest-edge, east corridor, and far-north addresses can sit far from assumed Flagstaff campuses.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Arizona Department of Education data should lead; third-party rankings are secondary only.',
          },
          {
            title: 'NAU influence',
            detail:
              'Northern Arizona University shapes housing demand, traffic, and cultural life in Flagstaff — useful for some households, noisy for others near campus peaks.',
          },
          {
            title: 'Winter transportation',
            detail:
              'Snow days and icy drives affect rural and mountain approaches more than core grids — factor family logistics honestly.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Regional acute-care anchors',
            detail:
              'Flagstaff Medical Center and regional clinics cover much of the high country — map ER drive times from forest-edge and far-north addresses carefully.',
          },
          {
            title: 'Specialty and weather travel',
            detail:
              'Some specialties require travel to Phoenix or other metros. Winter storms can delay that travel — plan critical care logistics before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer records early; altitude and winter illness seasons can fill schedules.',
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
              'Core Flagstaff, forest-edge custom, east corridor tracts, Sedona-adjacent tourism product, and remote north housing price differently. Compare heating, snow maintenance, and insurance — not sticker alone.',
          },
          {
            title: 'Winter utility and access costs',
            detail:
              'Heating, snow removal, and 4x4 vehicle needs are real budget lines that desert relocators underestimate.',
          },
          {
            title: 'Tourism and second-home pressure',
            detail:
              'Vacation markets can tighten inventory near red-rock and park gateways. Confirm year-round occupancy rules and HOA winter policies.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Flagstaff core / NAU-adjacent',
            detail:
              'Services, culture, and walkability — with student peaks, tourism curb fights, and full winter street realities.',
          },
          {
            title: 'West / forest edge',
            detail:
              'Pine privacy and mountain feel — only if you accept steep access and serious snow operations.',
          },
          {
            title: 'Sedona / red-rock approaches',
            detail:
              'Tourism lifestyle and scenery — with visitor traffic and canyon access constraints.',
          },
          {
            title: 'Page / remote canyon edges',
            detail:
              'Gateway and plateau living — with long distances to Flagstaff services and different weather patterns.',
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
              'Healthcare, education (including NAU), tourism/hospitality, government, forestry and outdoor industries, and regional services — not Phoenix Valley employment density.',
          },
          {
            title: 'Winter commute reality',
            detail:
              'I-17, I-40, and mountain roads can slow or close. Housing “20 minutes away” in summer can be a different calculation in a storm.',
          },
          {
            title: 'Tourism seasonality',
            detail:
              'Hospitality and retail hours flex with visitor seasons. Year-round roles in healthcare and education offer more stable calendars.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'True four-season elevation climate',
            detail:
              'Snowy winters, cool summers vs the Valley, intense sun at altitude, and monsoon bursts — plan wardrobe, vehicles, and move dates for winter first if you arrive November–March.',
          },
          {
            title: 'Outdoors and tourism identity',
            detail:
              'Skiing, trails, Grand Canyon access, and mountain-town culture are major draws; peak visitor crowds are part of the package near gateways.',
          },
          {
            title: 'Altitude adjustment',
            detail:
              'Newcomers from sea level or low desert should expect an adjustment period; schedule demanding move days with realistic pacing.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Coconino County resources',
    intro:
      'Official links and verification notes — mountain weather and road conditions change quickly; verify before move day.',
    items: [
      {
        label: 'Coconino County',
        href: 'https://www.coconino.az.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Flagstaff',
        href: 'https://www.flagstaff.az.gov/',
        external: true,
      },
      {
        label: 'City of Page',
        href: 'https://www.cityofpage.org/',
        external: true,
      },
      {
        label: 'City of Sedona',
        href: 'https://www.sedonaaz.gov/',
        external: true,
      },
      {
        label: 'ADOT — road conditions & construction',
        href: 'https://azdot.gov/',
        note: 'Check I-17, I-40, and mountain corridor closures',
        external: true,
      },
      {
        label: 'National Weather Service — Flagstaff',
        href: 'https://www.weather.gov/fgz/',
        note: 'Winter storms, wind, and monsoon alerts for move planning',
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
    'Filter listings by zone (Flagstaff core/NAU, West/Forest edge, East/I-40, Sedona/South approach, Page/North, Canyon/Remote) when available. Confirm winter access photos, storm delay policies, and ACC + FMCSA checks — not Valley heat or low-desert snowbird assumptions.',
  lastReviewed: '2026-07-23',
};
