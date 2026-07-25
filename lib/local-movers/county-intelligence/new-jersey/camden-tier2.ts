import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Camden — NJ Tier 2 Wave 1 · Cherry Hill / Philly collar */
export const camdenCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'camden',
  hubTitle: 'Camden County Moving Intelligence Hub',
  eyebrow: 'Camden · South Jersey / Philly collar · vs North Jersey density',
  h1: 'Moving in Camden County: Cherry Hill Suburbs, Haddonfield Streets & Philly Bridges',
  heroOpener:
    'Camden County is South Jersey’s Philly collar — Cherry Hill and Voorhees suburban cores, Haddonfield’s historic walkable streets, urban Camden multi-story stock, and PATCO/bridge logistics toward Philadelphia. Compared with North Jersey density markets (Essex/Hudson patterns), Camden jobs run on Walt Whitman / Ben Franklin timing, suburban HOA packets, and NJ↔PA licensing — not GWB high-rises or PATH adjacency. This guide is for people moving in Camden as a Philly-adjacent market — not a Newark or Jersey City script.',
  heroCredibility:
    'Philly-adjacent · PATCO / bridges · Suburban HOAs · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-295 · NJ Turnpike · Route 70 · Route 38 · Walt Whitman Bridge · Ben Franklin Bridge',
  parentCompare: {
    parentLabel: 'North Jersey density markets (Essex / Hudson patterns)',
    parentHref: '/local-movers/new-jersey/essex',
    title: 'Compared with North Jersey density markets',
    intro:
      'Camden is South Jersey’s Philly collar — not a drop-in template for Essex multi-family density or Hudson high-rise freight windows. Use North Jersey as the density parent contrast and Philadelphia as the job pull.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'North Jersey crews fight GWB/PATH-adjacent peaks and denser urban pairs. Camden pairs ride I-295, the Turnpike, Routes 70/38, and Philly bridges — freer mid-day than Hudson cores, still peak-heavy on bridge approaches and Cherry Hill arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'North Jersey mixes towers, multi-family, and tight blocks. Camden’s ladder is Cherry Hill/Voorhees planned suburbs, Haddonfield historic streets, urban Camden multi-story, and southern township tracts — far less continuous high-rise product, far more HOA driveway staging and bridge-aware timing.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Hudson/Essex often need elevator COIs and curb permits. Camden defaults to suburban HOA packets plus historic-street shuttle risk in Haddonfield and stairs in urban Camden — and any PA end flips the job to interstate FMCSA authority.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Camden quotes often sit near South Jersey suburban rates when access is a simple driveway — bridge delays, HOA soft costs, and PA interstate upgrades still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Camden is Philly-collar bedroom and suburban growth product — not North Jersey’s Manhattan-facing density. Match crews to bridges, HOAs, and NJ↔PA licensing.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Camden County different',
    intro: 'Bridge clocks and suburban HOAs define more jobs than elevator freight towers.',
    bullets: [
      {
        title: 'Bridge & PATCO timing is billable',
        detail:
          'Walt Whitman / Ben Franklin approaches change crew arrival windows. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Suburban HOA rules in Cherry Hill / Voorhees',
        detail:
          'Townhome and condo communities often need COIs and approved hours — Saturday-only plans can fail.',
      },
      {
        title: 'Historic Haddonfield geometry',
        detail:
          'Tight streets can force smaller trucks or shuttles that Cherry Hill cul-de-sacs do not need.',
      },
      {
        title: 'Urban Camden multi-story inventory',
        detail:
          'Stairs and limited staging differ from township planned communities — inventory carefully.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Camden zones: Cherry Hill, Voorhees/Haddonfield, Camden city & southern edges',
  zonesIntro: 'Three to four sharp products under one Philly-collar county.',
  zones: [
    {
      id: 'cherry-hill',
      name: 'Cherry Hill core',
      shortName: 'Cherry Hill',
      neighborhoods: ['Cherry Hill', 'Ellisburg', 'mall corridor edges'],
      housingTypes: 'Suburban SFH, townhomes, apartments',
      challenges: ['HOA windows', 'Arterial traffic', 'Lease clusters'],
      moverTips: 'Avoid Saturday midday near retail corridors when possible.',
      cityKeywords: ['cherry hill'],
    },
    {
      id: 'voorhees-haddonfield',
      name: 'Voorhees & Haddonfield',
      shortName: 'Voorhees / Haddonfield',
      neighborhoods: ['Voorhees', 'Haddonfield', 'Haddon Heights edge'],
      housingTypes: 'Planned suburbs, historic village homes',
      challenges: ['Historic street width', 'HOA rules', 'Tree canopies'],
      moverTips: 'Measure streets in Haddonfield; collect HOA packets in Voorhees.',
      cityKeywords: ['voorhees', 'haddonfield', 'haddon'],
    },
    {
      id: 'camden-city',
      name: 'Camden city inventory',
      shortName: 'Camden city',
      neighborhoods: ['Camden', 'waterfront edges'],
      housingTypes: 'Multi-story, multi-unit, tighter lots',
      challenges: ['Stairs', 'Staging limits', 'Urban parking'],
      moverTips: 'Inventory stairs and long carries; confirm building access rules.',
      cityKeywords: ['camden'],
    },
    {
      id: 'south-camden-co',
      name: 'Gloucester Twp & southern edges',
      shortName: 'South Camden Co.',
      neighborhoods: ['Gloucester Township', 'Blackwood', 'southern tracts'],
      housingTypes: 'Suburban SFH, townhomes',
      challenges: ['Arterial timing', 'HOA rules'],
      moverTips: 'Treat as standard suburban access unless HOA docs say otherwise.',
      cityKeywords: ['gloucester township', 'blackwood', 'sicklerville'],
    },
  ],
  specialized: [
    {
      id: 'philly-bridges',
      title: 'Philly bridges & cross-border module',
      intro: 'Many life patterns cross the river; not all movers are licensed for interstate legs.',
      bullets: [
        'If either address is in PA, require USDOT/MC on the estimate.',
        'Build bridge congestion into arrival windows.',
        'Storage in South Jersey can simplify multi-day Philly-area transitions.',
      ],
    },
    {
      id: 'hoa-suburbs',
      title: 'Suburban HOA module',
      intro: 'Cherry Hill / Voorhees associations fail Saturday-only plans.',
      bullets: [
        'Collect COI templates early.',
        'Confirm elevator hours for multi-unit buildings.',
      ],
    },
    {
      id: 'historic-haddonfield',
      title: 'Historic street access',
      intro: 'Haddonfield geometry rejects some full trailers.',
      bullets: [
        'Share street-width photos with every quote.',
        'Ask about shuttle options for downtown blocks.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Camden County education is municipal/regional. Cherry Hill, Voorhees, Haddonfield, and other districts are distinct systems.',
        bullets: [
          {
            title: 'District map first',
            detail:
              'Use NJ DOE performance reports and district boundaries; do not assume “Cherry Hill area” marketing equals one feeder.',
          },
          {
            title: 'Suburban competition',
            detail:
              'High-demand districts tighten inventory near school calendars — start early if fall timing is fixed.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Virtua & Cooper systems',
            detail:
              'Major regional care anchors for Camden County households — confirm campus and specialty access in-network.',
          },
          {
            title: 'Philly tertiary care',
            detail:
              'Some residents keep specialists in Philadelphia — include bridge times in care planning.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Camden County',
    intro: 'Bridge timing and HOA soft costs create outliers vs pure township cul-de-sacs.',
    drivers: [
      {
        title: 'Bridge delays',
        detail: 'Hourly clocks run during peak Philly approaches.',
      },
      {
        title: 'HOA certificates',
        detail: 'Admin delays if COI is requested day-of.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$950+' },
      { label: '3–4 BR home', value: '$1,700–$3,800+' },
      { label: '2-person crew', value: '$105–$165+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Family closings and Philly-area lease cycles dominate.',
    items: [
      {
        title: 'Late spring – summer',
        detail: 'Saturday crews book first for suburban SFH moves.',
      },
      {
        title: 'Winter freezes',
        detail: 'Shaded north steps on older homes get icy.',
      },
    ],
  },
  resources: {
    title: 'Useful Camden County resources',
    items: [
      {
        label: 'Camden County',
        href: 'https://www.camdencounty.com/',
        external: true,
      },
      {
        label: 'NJ DOE school performance reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Essex County guide (North Jersey density contrast)',
        href: '/local-movers/new-jersey/essex',
      },
      {
        label: 'Directory: Camden filter',
        href: '/companies?coverage=state&state=NJ&counties=camden',
      },
    ],
  },
  directoryHint: 'State whether any address is in Pennsylvania when requesting quotes.',
  lastReviewed: '2026-07-22',
});
