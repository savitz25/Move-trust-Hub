import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/**
 * Hand-crafted Chatham County, Georgia moving intelligence.
 * Savannah historic constraints, coastal humidity, tourism, islands/mainland — not Atlanta metro.
 */
export const chathamCountyIntelligence: CountyIntelligencePack = {
  stateSlug: 'georgia',
  countySlug: 'chatham',
  hubTitle: 'Chatham County Moving Intelligence Hub',
  eyebrow: 'Chatham · Savannah · Coastal Georgia historic & island logistics',
  h1: 'Moving in Chatham County: Historic Savannah, Coastal Humidity & Island Access',
  heroOpener:
    'Chatham County is coastal Georgia’s historic-and-island puzzle — Savannah’s squares and lane-width streets, tourism curb fights, humidity that attacks cardboard and wood, Tybee and island bridge timing, and mainland suburbs that still do not behave like Atlanta HOA tracts. A “local” move can mean a Historic District carriage-step carry one day and a long islands haul the next. This guide is built for Chatham realities — cobblestone edges, salt air, and visitor calendars — not a south-metro I-75 script or an Augusta medical corridor.',
  heroCredibility:
    'Georgia DPS MCCD for intrastate household goods · FMCSA for interstate legs · Historic district & coastal island awareness · Curated directory listings',
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
    title: 'What makes moving in Chatham County different',
    intro:
      'Historic street geometry, coastal humidity, tourism peaks, and island bridges define estimates here — not Atlanta freeway sprawl culture.',
    bullets: [
      {
        title: 'Historic District access is a different job class',
        detail:
          'Squares, narrow lanes, limited truck staging, stairs, and fragile older interiors require smaller equipment, longer carries, and often shuttle plans. Generic “Savannah local” pricing without a street walkthrough fails.',
      },
      {
        title: 'Tourism is a curb and calendar problem',
        detail:
          'Visitor traffic, events, and weekend peaks make downtown and riverfront staging scarce. Flexible mid-week early starts beat fighting parade and festival windows.',
      },
      {
        title: 'Coastal humidity rewrites packing standards',
        detail:
          'Salt air and moisture punish inadequate wrapping, cardboard, and long outdoor sits. Protection labor and climate-aware packing matter more than inland Georgia jobs.',
      },
      {
        title: 'Islands vs mainland are not one product',
        detail:
          'Tybee and other island approaches add bridge timing, wind, tourist congestion, and sometimes truck restrictions. Mainland Pooler/West Chatham suburbs flip to HOA and corridor logistics.',
      },
      {
        title: 'Port and industrial edges still influence routes',
        detail:
          'Port-related freight and industrial corridors can slow approaches to some residential edges. Mid-day routing choices change billable time.',
      },
      {
        title: 'Storm and flood awareness is operational',
        detail:
          'Tropical systems and low-lying parcels affect coastal and marsh-adjacent addresses. Build flexible date language and storage options before peak season.',
      },
      {
        title: 'Military and student calendars add waves',
        detail:
          'Hunter Army Airfield and nearby education calendars create PCS and lease clusters that compete with tourism-season civilian demand.',
      },
      {
        title: 'Georgia DPS MCCD vs FMCSA authority',
        detail:
          'Intrastate Georgia household moves are generally under Georgia DPS MCCD frameworks. Interstate legs (including many Florida/Carolina coastal hauls) need active FMCSA USDOT authority.',
      },
    ],
  },
  zonesHeading: 'Chatham County zones: historic core, mainland suburbs & islands',
  zonesIntro:
    'Price Historic District, Victorian/midtown belts, west mainland growth, southside, and island communities as separate access and climate products — never one Savannah rate card.',
  zones: [
    {
      id: 'historic-district',
      name: 'Savannah Historic District & squares',
      shortName: 'Historic District',
      neighborhoods: [
        'Historic District squares',
        'River Street edges',
        'Factors Walk influence',
        'Downtown lanes and carriage streets',
        'Landmark district residential',
      ],
      housingTypes:
        'Historic row houses, townhomes, condos, loft conversions, multi-story older stock',
      challenges: [
        'Narrow streets and extremely limited truck staging',
        'Long stair carries and fragile interiors',
        'Tourism and event curb competition',
        'Shuttle or smaller-truck requirements common',
      ],
      moverTips:
        'Walk the block before final pricing. Plan shuttle/long-carry labor. Prefer earliest mid-week windows outside major events. Protect floors and finishes aggressively in humidity.',
      cityKeywords: [
        'historic district',
        'downtown savannah',
        'river street',
        'savannah',
      ],
    },
    {
      id: 'victorian-midtown',
      name: 'Victorian District, midtown & near-downtown belts',
      shortName: 'Victorian / Midtown',
      neighborhoods: [
        'Victorian District',
        'Thomas Square edges',
        'Midtown Savannah',
        'Near-downtown residential grids',
        'Streetcar-era neighborhoods',
      ],
      housingTypes:
        'Victorian and early-20th-century SFH, duplexes, renovated historic stock, some multifamily',
      challenges: [
        'Stairs, porches, and tight street parking',
        'Mixed one-way and narrow approaches',
        'Tourism spillover on popular weekends',
        'Older electrical and access quirks for elevators where present',
      ],
      moverTips:
        'Inventory stairs and porch geometry. Reserve curb space early when possible. Share access photos for tight courts and alleys.',
      cityKeywords: [
        'victorian',
        'midtown savannah',
        'thomas square',
      ],
    },
    {
      id: 'west-chatham-pooler',
      name: 'West Chatham, Pooler & mainland growth corridors',
      shortName: 'West / Pooler',
      neighborhoods: [
        'Pooler',
        'West Chatham suburbs',
        'I-95 / airport corridor residential',
        'HOA master-planned tracts',
        'Retail arterial edges',
      ],
      housingTypes:
        'Newer SFH, townhomes, garden apartments, HOA planned communities',
      challenges: [
        'HOA COI and approved-hour rules',
        'I-95 and airport-related congestion',
        'Long empty miles to Historic District destinations',
        'Full family inventories on summer weekends',
      ],
      moverTips:
        'Send HOA packets with the estimate. Price Pooler ↔ Historic District as a long local with tourism buffer. Early starts beat I-95 peaks.',
      cityKeywords: [
        'pooler',
        'west chatham',
        'bloomingdale',
        'garden city',
      ],
    },
    {
      id: 'southside-islands-approach',
      name: 'Southside Savannah & islands approach mainland',
      shortName: 'Southside',
      neighborhoods: [
        'Southside Savannah',
        'Medical Arts / south corridors',
        'Mainland approaches toward islands',
        'Multifamily south belts',
        'Suburban residential grids',
      ],
      housingTypes:
        'Mid-century and later SFH, condos, apartments, townhomes',
      challenges: [
        'Arterial congestion on island-bound days',
        'Mixed elevator and stair multifamily',
        'Humidity and afternoon storm labor planning',
        'Cross-zone pairs into historic core',
      ],
      moverTips:
        'Confirm building loading rules for southside complexes. Build buffer when destinations are island-bound. Prefer morning weather windows in storm season.',
      cityKeywords: [
        'southside savannah',
        'south savannah',
        'medical arts',
      ],
    },
    {
      id: 'tybee-islands',
      name: 'Tybee Island & coastal island communities',
      shortName: 'Tybee / Islands',
      neighborhoods: [
        'Tybee Island',
        'Island beach residential',
        'Causeway / bridge approach edges',
        'Coastal cottages and elevated homes',
        'Vacation and year-round mix stock',
      ],
      housingTypes:
        'Beach cottages, elevated coastal SFH, condos, short-term and long-term mix',
      challenges: [
        'Bridge and causeway timing with tourist traffic',
        'Sand, salt, wind, and humidity protection needs',
        'Possible truck size or staging limits',
        'Peak summer weekend parking scarcity',
      ],
      moverTips:
        'Avoid peak summer beach weekends when flexible. Budget floor/sand protection and weather holds. Confirm truck access before load day; plan shuttle if needed.',
      cityKeywords: [
        'tybee',
        'tybee island',
        'island',
        'beach',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Chatham County',
    intro:
      'Historic access, humidity protection, tourism delays, and island bridges move the needle more than pure bedroom count.',
    drivers: [
      {
        title: 'Historic long-carry / shuttle labor',
        detail:
          'Lane width and square-adjacent staging often force smaller equipment and extra labor hours.',
      },
      {
        title: 'Tourism curb and event delay risk',
        detail:
          'Peak visitor windows turn short map miles into long billable days downtown and riverfront.',
      },
      {
        title: 'Coastal protection & packing standards',
        detail:
          'Humidity- and salt-aware packing, floor protection, and covered staging add soft costs vs inland moves.',
      },
      {
        title: 'Island bridge portal time',
        detail:
          'Tybee and island-bound pairs need explicit bridge buffers — especially summer weekends.',
      },
      {
        title: 'Mainland HOA rules',
        detail:
          'Pooler and west growth tracts compress hours and require paperwork that affects crew calendars.',
      },
      {
        title: 'Storm-season flexibility premiums',
        detail:
          'Weather holds, storage-in-transit, and multi-day splits can raise total cost on coastal inventories.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,200+',
        note: 'Higher in Historic District or peak tourism windows',
      },
      {
        label: '2–3BR house / mainland HOA',
        value: '$1,700–$4,200+',
        note: 'Historic stairs and island pairs trend up',
      },
      {
        label: '3–4+ BR (historic / island / cross-zone)',
        value: '$2,400–$6,500+',
        note: 'Shuttle historic jobs and peak island weekends price highest',
      },
      {
        label: 'Typical 2-person crew rate',
        value: '$100–$170+/hr',
        note: 'Portal-to-portal; packing and 3-person crews scale up',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, tourism & storm intelligence',
    intro:
      'Chatham peaks follow tourism calendars, coastal storm season, military/education waves, and humidity — not Atlanta school overflow alone.',
    items: [
      {
        title: 'Tourism high season & event weekends',
        detail:
          'Spring through fall visitor peaks and major events crush downtown curb access. Mid-week early starts are essential for historic jobs.',
      },
      {
        title: 'Summer island congestion',
        detail:
          'Tybee weekends fill causeways and beach blocks. Prefer weekday island moves when flexible.',
      },
      {
        title: 'Tropical storm season',
        detail:
          'Build flexible closing language and ask about storage/reschedule policies before deposits on coastal addresses.',
      },
      {
        title: 'Military & student clusters',
        detail:
          'PCS and academic calendars can stack with tourism demand — book as soon as dates firm.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Beat visitor traffic and afternoon storms. Still honor HOA and building windows on the mainland.',
      },
    ],
  },
  specialized: [
    {
      id: 'historic-district-access',
      title: 'Historic District, squares & narrow-lane logistics',
      intro:
        'Savannah’s landmark core is an access specialty — not a standard suburban driveway move with better marketing photos.',
      bullets: [
        'Walk or photo-survey the block for truck length, one-ways, and square-adjacent staging before final quote.',
        'Budget shuttle or long-carry labor as a default assumption on tight lanes until proven otherwise.',
        'Protect stairs, floors, and historic finishes; humidity makes scuffs and moisture issues more costly.',
        'Avoid major event and peak tourism weekends when dates are flexible.',
        'Confirm building and HOA (where applicable) rules in writing for condos and shared historic stock.',
      ],
    },
    {
      id: 'coastal-island-humidity',
      title: 'Coastal humidity, islands & storm-ready module',
      intro:
        'Salt air, bridges, and tropical weather create a second Chatham product line distinct from any Atlanta-metro playbook.',
      bullets: [
        'Specify moisture- and salt-aware packing standards for coastal inventories.',
        'Price Tybee/island pairs with explicit bridge and tourist-traffic buffers.',
        'Confirm truck access and possible size limits before load day; plan shuttle if needed.',
        'Ask about storm reschedule and storage-in-transit policies before deposit.',
        'Prefer morning windows in heat and storm season for outdoor load paths.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Chatham County?',
    intro:
      'Historic urban living, mainland growth suburbs, and island coastal life are different bets — pick the pocket first, then validate flood risk, tourism tradeoffs, and access.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Savannah-Chatham County Public School System and private options serve families. Match every listing to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before neighborhood brand',
            detail:
              'Historic, southside, and west mainland marketing names can span multiple feeders — use official tools.',
          },
          {
            title: 'Island vs mainland logistics',
            detail:
              'Island living can mean longer school and activity drives; test real routes at pickup times.',
          },
          {
            title: 'Higher education presence',
            detail:
              'SCAD and other campuses shape rental demand, traffic, and lease cycles near core neighborhoods.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and Georgia DOE data should lead; third-party rankings are secondary only.',
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
              'Memorial Health, St. Joseph’s/Candler, and other facilities serve the metro. Map ER drive times including tourist and bridge delays.',
          },
          {
            title: 'Island and low-lying access',
            detail:
              'Coastal addresses can mean longer specialty drives into mainland campuses — test peak routes.',
          },
          {
            title: 'Military healthcare context',
            detail:
              'Active-duty and veteran households should confirm TRICARE network logistics alongside civilian hospitals.',
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
              'Historic trophy stock, Victorian renovations, Pooler suburbs, and Tybee coastal product price on different ladders. Compare insurance and flood exposure carefully.',
          },
          {
            title: 'Flood, wind & insurance diligence',
            detail:
              'Coastal and marsh-adjacent parcels need elevation, flood zone, and insurance quotes before you treat list price as the full cost.',
          },
          {
            title: 'Stock variety',
            detail:
              'Landmark homes, mid-century southside, mainland HOAs, and elevated island cottages each change move-day access.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit by lifestyle',
        bullets: [
          {
            title: 'Historic walkable core',
            detail:
              'Squares, dining, and tourism energy — with parking, stairs, and visitor crowds as daily reality.',
          },
          {
            title: 'Mainland growth suburbs',
            detail:
              'Pooler/west Chatham space and newer product — with I-95 dependence and less coastal character.',
          },
          {
            title: 'Southside practical living',
            detail:
              'More day-to-day residential grids and multifamily options between core and islands.',
          },
          {
            title: 'Island coastal lifestyle',
            detail:
              'Beach access and salt air — bridge timing, storms, and tourism are part of the deal.',
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
              'Tourism/hospitality, port and logistics, military, healthcare, education, and professional services are major themes.',
          },
          {
            title: 'Tourism and port traffic reality',
            detail:
              'Downtown events and freight corridors set drive times more than straight-line miles on many pairs.',
          },
          {
            title: 'Island commute tradeoffs',
            detail:
              'Year-round island living can mean daily bridge timing for mainland jobs — test peak runs before committing.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Coastal historic culture',
            detail:
              'Architecture, food, and riverfront life are signature draws; crowds and humidity come with them.',
          },
          {
            title: 'Humidity, heat & storms',
            detail:
              'Hot, humid summers and tropical season require early-move starts and flexible contracts on exposed addresses.',
          },
          {
            title: 'Marshes, beaches & outdoors',
            detail:
              'Coastal recreation is excellent; boat and beach gear often expand inventories and storage needs.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Practical Chatham County resources',
    intro:
      'Official links and licensing notes — historic rules, island access, storm guidance, and Georgia DPS MCCD credentials change; verify before move day.',
    items: [
      {
        label: 'Chatham County government',
        href: 'https://www.chathamcountyga.gov/',
        note: 'County services and public information',
        external: true,
      },
      {
        label: 'City of Savannah',
        href: 'https://www.savannahga.gov/',
        external: true,
      },
      {
        label: 'City of Pooler',
        href: 'https://www.pooler-ga.gov/',
        external: true,
      },
      {
        label: 'City of Tybee Island',
        href: 'https://www.cityoftybee.org/',
        external: true,
      },
      {
        label: 'Savannah-Chatham County Public School System',
        href: 'https://sccpss.com/',
        external: true,
      },
      {
        label: 'Georgia Ports Authority',
        href: 'https://gaports.com/',
        note: 'Port context for industrial-edge logistics',
        external: true,
      },
      {
        label: 'National Hurricane Center',
        href: 'https://www.nhc.noaa.gov/',
        external: true,
      },
      {
        label: 'Georgia DPS — Department of Public Safety',
        href: 'https://dps.georgia.gov/',
        note: 'MCCD / intrastate household goods mover context',
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
    'Filter by zone (Historic District, Victorian/Midtown, West/Pooler, Southside, Tybee/Islands). Confirm shuttle needs, humidity packing, bridge timing, and Georgia DPS MCCD vs FMCSA authority.',
  lastReviewed: '2026-07-23',
};
