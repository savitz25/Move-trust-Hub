import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Polk County — Florida Tier 2 (Lakeland mid-corridor between Tampa & Orlando).
 * Secondary-market contract vs Hillsborough Tier 1 parent (+ Orange contrast) —
 * not a Tampa rename and not an Orlando theme-park suburb script.
 */
export const polkCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'polk',
  hubTitle: 'Polk County Moving Intelligence Hub',
  eyebrow: 'Polk · Lakeland mid-corridor · Tampa–Orlando inland',
  h1: 'Moving in Polk County: Lakeland Mid-Corridor Between Tampa & Orlando',
  heroOpener:
    'Polk County is Central Florida’s inland mid-corridor — Lakeland as the employment and logistics anchor, Winter Haven / Auburndale lake-country suburbs, Haines City–Davenport growth toward Orlando, and rural/lake edges — not Hillsborough’s Tampa core with freer freeways. I-4, US-27, US-98, the Florida Turnpike, and FL-570 (Polk Parkway) set portal-to-portal time. Compared with Hillsborough, you get freer mid-day freeflow than Tampa basin gridlock, more dual-metro (Tampa vs Orlando) staging questions, and less vertical tower product. Compared with Orange, you sit outside theme-park guest density while still feeling Orlando-direction pressure on the northeast growth edge. This guide is for people moving in Polk as a secondary market with its own role — not a recycled Tampa or Orlando script.',
  heroCredibility:
    'Lakeland mid-corridor · Tampa–Orlando inland · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-4 · US-27 · US-98 · Florida Turnpike · FL-570 (Polk Pkwy)',
  parentCompare: {
    parentLabel: 'Hillsborough County',
    parentHref: '/local-movers/florida/hillsborough',
    title: 'Compared with Hillsborough County (and Orange)',
    intro:
      'Polk is the freestanding inland mid-corridor between Tampa Bay and Orlando — Lakeland, Winter Haven/Auburndale, Haines City–Davenport growth, and lake/rural edges — not a drop-in template for Tampa core elevators or Orange theme-park guest logistics. Use Hillsborough as the dense Bay parent contrast and Orange as the eastern metro secondary parent.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Hillsborough crews fight I-275, I-4 Tampa approaches, and bay-core congestion. Polk pairs ride I-4, US-27, US-98, the Florida Turnpike, and FL-570 (Polk Parkway) with freer mid-day flow — Lakeland ↔ Winter Haven still burns portal-to-portal time at peak, and I-4 tourist/freight through-traffic is real, but it is not a Tampa basin dock job. Orange comparison: same I-4 spine rhythm on the northeast edge, without living inside theme-park arterial density.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Hillsborough mixes towers, older Tampa grid, and Southshore/New Tampa HOAs. Polk’s ladder is Lakeland suburban SFH and mid-century stock, Winter Haven lake-adjacent homes, Haines City–Davenport master-planned growth, and rural/lake-edge lots with outbuildings — far less elevator density, more dual-metro value product and waterfront stairs on chain-of-lakes parcels.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Hillsborough core needs curb permits and multi-unit elevators; many Bay suburbs still allow freer driveway work. Polk stages mostly driveway and cul-de-sac jobs — HOAs concentrate in newer Lakeland and northeast growth tracts (real paperwork, not Tampa-scale COI villages). Lake lots add soft ground and limited swing room that pure inland cul-de-sacs do not share.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Polk quotes often sit below dense Tampa urban rates for comparable square footage when access is a simple driveway — I-4 timing, dual-metro crew staging, lake-lot labor, and rural empty miles still push prices up. Expect secondary-market labor rates with corridor distance and heat as the main premiums, not bay-core scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Polk is an independent inland mid-metro with Lakeland as the anchor between two larger job centers — not a Tampa bedroom collar rename and not an Orange spillover suburb. Treat it as its own market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Polk County different',
    intro:
      'Mid-corridor realities — I-4 freeflow that is still billable, dual-metro staging, lake vs HOA growth product, and inland heat — that change estimates.',
    bullets: [
      {
        title: 'Between two metros, not inside either core',
        detail:
          'Many households orient toward Tampa or Orlando while living in Polk. Crews may stage from either side — ask where the truck starts and whether travel time is portal-to-portal.',
      },
      {
        title: 'I-4 / US-27 freeflow is not Tampa gridlock — still a line item',
        detail:
          'Lakeland ↔ Davenport or Winter Haven ↔ Haines City pairs freer than Bay core still burn billable time at school, freight, and tourist through-peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Lakeland growth, lake lots & rural edges are different products',
        detail:
          'HOA tracts, Winter Haven chain-of-lakes homes, and ag-edge driveways are not interchangeable. “Polk County local” is too vague — put both cities and access type on the estimate.',
      },
      {
        title: 'Inland heat on open lots',
        detail:
          'June–September afternoons stress crews and sealed goods without reliable coastal breeze. Prefer early starts; treat mid-afternoon load-outs as high risk on open suburban and rural staging.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Polk County zones: Lakeland metro, Winter Haven lakes, NE growth & rural edges',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Lakeland metro, Winter Haven/Auburndale lakes, Haines City–Davenport growth, and rural/lake edges price and stage differently under the same mid-corridor.',
  zones: [
    {
      id: 'lakeland-metro',
      name: 'Lakeland Metro',
      shortName: 'Lakeland',
      neighborhoods: [
        'Lakeland',
        'South Lakeland',
        'North Lakeland',
        'Lakeland Highlands edge',
        'I-4 / Polk Parkway corridors',
      ],
      housingTypes:
        'Suburban SFH, HOA villages, mid-century stock, apartments, some downtown multifamily',
      challenges: [
        'I-4 peak congestion on east–west pairs',
        'HOA COI and approved hours in newer tracts',
        'High family-inventory weekend demand',
        'Crews staging from Tampa or Orlando adding travel time',
      ],
      moverTips:
        'Ask where the crew stages and whether quotes are portal-to-portal. Send HOA packets early. Mid-week early starts beat I-4 tourist and freight peaks.',
      cityKeywords: [
        'lakeland',
        'lakeland highlands',
        'south lakeland',
        'north lakeland',
        'polk parkway',
      ],
    },
    {
      id: 'winter-haven-auburndale',
      name: 'Winter Haven / Auburndale Lake Country',
      shortName: 'Winter Haven / Auburndale',
      neighborhoods: [
        'Winter Haven',
        'Auburndale',
        'Chain of Lakes neighborhoods',
        'Lake Alfred edge',
        'Central Polk lake communities',
      ],
      housingTypes:
        'Lake-adjacent SFH, suburban tracts, retiree communities, multifamily near commercial strips',
      challenges: [
        'Lake-lot access, docks, and soft ground',
        'Cross-county hauls to Lakeland or Haines City at peak',
        'Mix of HOA and non-HOA rules',
        'Connector-road congestion between Lakeland and Winter Haven',
      ],
      moverTips:
        'Share lake-lot driveway and dock photos. Inventory stairs and long carries on waterfront homes. Clarify Winter Haven ↔ Lakeland as a true local with arterial timing.',
      cityKeywords: [
        'winter haven',
        'auburndale',
        'chain of lakes',
        'lake alfred',
        'cypress gardens',
      ],
    },
    {
      id: 'haines-davenport-growth',
      name: 'Haines City / Davenport Growth',
      shortName: 'Haines City / Davenport',
      neighborhoods: [
        'Haines City',
        'Davenport',
        'ChampionsGate edge influence',
        'Northeast Polk growth tracts',
        'US-27 corridors',
      ],
      housingTypes:
        'Newer master-planned SFH, townhomes, resort-adjacent housing influence, growing HOA stock',
      challenges: [
        'Orlando-metro tourist traffic spillover on US-27 / I-4',
        'HOA rules in new villages',
        'Long hauls to southern Polk rural edges',
        'High inbound family volume on peak weekends',
      ],
      moverTips:
        'Book growth-corridor weekends early. Confirm HOA windows. Treat Davenport ↔ Lakeland or southern rural pairs as long locals with honest I-4/US-27 time.',
      cityKeywords: [
        'haines city',
        'davenport',
        'championsgate',
        'northeast polk',
        'us-27',
      ],
    },
    {
      id: 'rural-lake-edges',
      name: 'Rural & Lake Edges',
      shortName: 'Rural / lake edges',
      neighborhoods: [
        'Bartow',
        'Lake Wales area',
        'Frostproof edge',
        'Eastern agricultural edges',
        'Southern rural Polk',
      ],
      housingTypes:
        'Small-city SFH, rural-edge homes, agricultural-adjacent lots, outbuildings, some manufactured-home communities',
      challenges: [
        'Long empty miles from Lakeland or metro staging',
        'Unpaved or soft driveways',
        'Outbuildings and equipment inventories',
        'Heat and limited shade on open approaches',
      ],
      moverTips:
        'Price distance and access explicitly. Share road-width and driveway photos. Inventory sheds and workshops separately from household furniture. Prefer early starts in summer heat.',
      cityKeywords: [
        'bartow',
        'lake wales',
        'frostproof',
        'rural polk',
        'east polk',
        'south polk',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Polk County',
    intro:
      'Same square footage prices differently by I-4/US-27 time, dual-metro staging, lake access, and whether the job is Lakeland tract or rural edge.',
    drivers: [
      {
        title: 'I-4 / US-27 corridor & dual-metro staging',
        detail:
          'Portal-to-portal time and crew origin (Tampa vs Orlando vs in-county) often dominate “local” quotes more than map miles suggest at peak.',
      },
      {
        title: 'HOA soft costs in growth tracts',
        detail:
          'COI and approved hours in newer Lakeland and Haines City–Davenport villages add paperwork and can force weekday-only windows.',
      },
      {
        title: 'Lake-lot labor & rural empty miles',
        detail:
          'Stairs, docks, soft ground, outbuildings, and long approaches price higher than dry inland driveway jobs of the same square footage.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$450–$1,100+',
        note: 'Higher with long regional staging travel or peak I-4 windows',
      },
      {
        label: '2–3BR house / suburban HOA',
        value: '$1,500–$3,600+',
        note: 'Cross-zone and lake-lot access trend up',
      },
      {
        label: '3–4+ BR (rural edge / long corridor / lake)',
        value: '$2,200–$5,500+',
        note: 'Rural empty miles and waterfront stairs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Polk peaks follow family summer moves, I-4 tourist through-traffic, and inland heat — not beach snowbird towers alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk on open inland lots.',
      },
      {
        title: 'School & family calendars (Lakeland / growth corridors)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in Lakeland and northeast growth towns.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win when heat and I-4 through-traffic are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'i4-freeflow',
      title: 'I-4 freeflow & dual-metro staging',
      intro:
        'Polk’s defining corridor problem is being between Tampa and Orlando labor markets on a congested spine that still freeflows better than Bay core.',
      bullets: [
        'Ask where the truck and crew stage and whether travel is included portal-to-portal.',
        'Price Lakeland ↔ Davenport / Haines City pairs with I-4 delay risk explicit.',
        'Confirm in-county coverage for Bartow and rural edges — do not assume Tampa or Orlando “local” rates automatically apply.',
        'Prefer early starts to avoid freight and tourist through-traffic on I-4 and US-27.',
      ],
    },
    {
      id: 'suburban-growth-hoa',
      title: 'Suburban growth & HOA logistics',
      intro:
        'Newer Lakeland and northeast Polk villages bring planned-community rules that pure lake cottages and rural lots do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours before booking Saturday crews in growth tracts.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older core multifamily.',
        'Share driveway, cul-de-sac, and truck-length constraints for newer villages with tight turns.',
      ],
    },
    {
      id: 'heat-inland',
      title: 'Inland heat logistics',
      intro:
        'Polk’s operational constraint includes valley-style inland heat that coastal Bay scripts underweight.',
      bullets: [
        'Prefer 6–10 a.m. starts in peak summer; treat mid-afternoon loads as high risk.',
        'Request shaded staging and heat-safe packing for electronics, candles, and sealed goods.',
        'Plan water, rotation, and realistic crew endurance on open rural and suburban lots.',
        'If the job runs long, discuss split-day options rather than pushing into peak heat.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Lakeland suburban convenience, Winter Haven lakes, and northeast growth are different bets — validate schools and healthcare by pocket, then plan for I-4 commute direction.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Polk County Public Schools covers the county with magnets, charters, and private options. Match every listing address to the correct attendance zone.',
        bullets: [
          {
            title: 'Zone before city marketing',
            detail:
              'Use district boundary tools. Lakeland, Winter Haven, and Haines City brands span multiple feeders — verify with official maps and Florida DOE data.',
          },
          {
            title: 'Growth-corridor capacity',
            detail:
              'Northeast I-4 growth can pressure enrollment. Do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'In-county acute-care anchors',
            detail:
              'Lakeland Regional Health and other regional campuses serve large parts of Polk. Map ER drive times at rush hour from lake and rural edges — not only from Lakeland proper.',
          },
          {
            title: 'Specialty spillover to Tampa or Orlando',
            detail:
              'Some specialties still pull residents toward Hillsborough or Orange systems. Factor I-4 corridor drive times into healthcare planning.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Polk resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Polk County — official site',
        href: 'https://www.polk-county.net/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Lakeland',
        href: 'https://www.lakelandgov.net/',
        external: true,
      },
      {
        label: 'City of Winter Haven',
        href: 'https://www.mywinterhaven.com/',
        external: true,
      },
      {
        label: 'Polk County Public Schools',
        href: 'https://polkschoolsfl.com/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Lakeland, Winter Haven/Auburndale, Haines City/Davenport, Rural/lake edges) when available. Confirm crew staging city, I-4 assumptions, HOA packets for growth tracts, and heat-window plans — this is a Lakeland mid-corridor, not a Tampa rename.',
  lastReviewed: '2026-07-24',
});
