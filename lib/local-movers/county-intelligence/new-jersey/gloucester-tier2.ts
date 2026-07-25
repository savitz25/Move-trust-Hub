import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Gloucester — NJ Tier 2 Wave 1 · Deptford / Washington Twp · parent Camden */
export const gloucesterCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'gloucester',
  hubTitle: 'Gloucester County Moving Intelligence Hub',
  eyebrow: 'Gloucester · Philly south collar · vs Camden',
  h1: 'Moving in Gloucester County: Deptford, Washington Twp & I-295 / NJ-42 South Collar',
  heroOpener:
    'Gloucester County is South Jersey’s Philly south collar — Deptford and Washington Township retail arterials, Glassboro’s Rowan calendar, Mullica Hill growth tracts, and still-rural southern edges. Compared with Camden’s denser Cherry Hill / Haddonfield core, Gloucester stretches farther on I-295 and NJ-42, trades more planned-community HOAs and longer township empty miles, and adds university-semester churn at Glassboro. This guide is for people moving in Gloucester as spillover-suburb product — not a Cherry Hill rename and not a North Jersey density script.',
  heroCredibility:
    'Philly south collar · I-295 / NJ-42 · Rowan calendar · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-295 · NJ-42 · Route 55 · Route 322 · NJ Turnpike (nearby)',
  parentCompare: {
    parentLabel: 'Camden County',
    parentHref: '/local-movers/new-jersey/camden',
    title: 'Compared with Camden County',
    intro:
      'Gloucester is Philly spillover south and west of Cherry Hill — Deptford, Washington Twp, Glassboro, Mullica Hill — not a drop-in template for Haddonfield historic blocks or PATCO walk-ups alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Camden crews fight Walt Whitman / Ben Franklin peaks and denser collar arterials. Gloucester pairs ride I-295, NJ-42, Route 55, and Route 322 — freer mid-day than bridge approaches, still peak-heavy on Deptford ↔ Washington Twp retail hauls and Glassboro semester weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Camden mixes Cherry Hill planned suburbs, Haddonfield historic streets, and urban multi-story. Gloucester’s ladder is Deptford/Washington Twp suburban SFH and townhomes, Glassboro student and small-city stock, Mullica Hill new-construction HOAs, and southern rural-edge lots — more growth-tract HOA product, less continuous historic-grid curb fights.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Camden adds bridge timing and Haddonfield shuttle risk. Gloucester defaults to planned-community COIs, cul-de-sac staging, Rowan lease-end clusters, and gravel/soft-shoulder risk on southern township approaches.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Gloucester quotes often sit near or slightly below dense Cherry Hill urban-adjacent rates for simple driveways — HOA soft costs, NJ-42/I-295 timing, and rural deadhead still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Gloucester is Philly south-collar growth and university-edge living — not Camden city’s multi-story core and not North Jersey PATH density. Match crews to HOAs, NJ-42 freeflow, and PA licensing when either end crosses the river.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Gloucester County different',
    intro: 'South collar freeflow, planned HOAs, and Rowan calendars — not boardwalk elevators.',
    bullets: [
      {
        title: 'I-295 / NJ-42 freeflow is still billable',
        detail:
          'Deptford ↔ Washington Twp or Glassboro ↔ Mullica Hill pairs freer than Philly bridges still burn portal-to-portal time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'New-construction HOA is common in growth tracts',
        detail:
          'Mullica Hill and Washington Twp villages treat COI, approved hours, and floor protection as standard.',
      },
      {
        title: 'Rowan / Glassboro semester peaks',
        detail:
          'May and August lease clusters fill local crews — not a Camden office-park calendar alone.',
      },
      {
        title: 'Southern rural-edge access',
        detail:
          'Long driveways, soft shoulders after rain, and longer empty miles than Cherry Hill cores.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Gloucester zones: Deptford/Washington Twp, Glassboro, Mullica Hill & south rural',
  zonesIntro: 'Three to four sharp products under one Philly south-collar county.',
  zones: [
    {
      id: 'deptford-washington',
      name: 'Deptford & Washington Twp corridors',
      shortName: 'Deptford / Wash. Twp',
      neighborhoods: ['Deptford', 'Washington Township', 'Turnersville area'],
      housingTypes: 'Suburban SFH, townhomes, apartments near retail',
      challenges: ['Arterial traffic', 'HOA townhomes', 'Retail congestion Saturdays'],
      moverTips: 'Avoid Saturday midday near mall corridors when possible.',
      cityKeywords: ['deptford', 'washington', 'turnersville'],
    },
    {
      id: 'glassboro-rowan',
      name: 'Glassboro & Rowan area',
      shortName: 'Glassboro',
      neighborhoods: ['Glassboro', 'Pitman', 'nearby boroughs'],
      housingTypes: 'Student rentals, bungalows, renovated older homes',
      challenges: ['Semester peaks', 'Street parking', 'Older stairs'],
      moverTips: 'Book around move-in weekends; inventory stairs carefully.',
      cityKeywords: ['glassboro', 'pitman', 'rowan'],
    },
    {
      id: 'mullica-mantua',
      name: 'Mullica Hill & Mantua growth belt',
      shortName: 'Mullica / Mantua',
      neighborhoods: ['Mullica Hill', 'Mantua', 'Harrison Twp areas'],
      housingTypes: 'New construction, larger lots, some estates',
      challenges: ['HOA architectural rules', 'Long driveways', 'Soft new landscaping'],
      moverTips: 'Protect new sod and irrigation — crews need designated paths.',
      cityKeywords: ['mullica hill', 'mantua', 'harrison'],
    },
    {
      id: 'south-rural',
      name: 'Southern & rural edges',
      shortName: 'South rural',
      neighborhoods: ['South Harrison', 'Elk', 'rural township roads'],
      housingTypes: 'Farms, long-lot homes, outbuildings',
      challenges: ['Gravel access', 'Low wires', 'Travel time for crews'],
      moverTips: 'Send driveway photos and note any weight-restricted bridges.',
      cityKeywords: ['elk', 'south harrison', 'swedesboro'],
    },
  ],
  specialized: [
    {
      id: 'i295-nj42',
      title: 'I-295 / NJ-42 freeflow module',
      intro: 'South collar freeflow is freer than Philly bridges — still a line item on hourly clocks.',
      bullets: [
        'Prefer mid-morning midweek for Deptford ↔ Washington Twp hauls.',
        'Confirm portal-to-portal terms on the estimate.',
        'School peaks on NJ-42 approaches can erase “short hop” assumptions.',
      ],
    },
    {
      id: 'planned-hoa',
      title: 'Planned-community HOA module',
      intro: 'Growth tracts fail estimates that ignore certificates.',
      bullets: [
        'Collect COI templates at contract signing.',
        'Confirm weekday-only windows before booking Saturday.',
      ],
    },
    {
      id: 'rowan-semester',
      title: 'Rowan / Glassboro semester module',
      intro: 'Student and faculty turnover clusters crews in May and August.',
      bullets: [
        'Book early for semester peaks.',
        'Treat multi-unit student stock as long-carry jobs, not cul-de-sac defaults.',
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
          'Families often compare Washington Township, Clearview regional areas, Glassboro, Kingsway regional, and other local systems.',
        bullets: [
          {
            title: 'Boundary check',
            detail:
              'Use NJ DOE performance reports and district maps — growth townships can have non-obvious feeders.',
          },
          {
            title: 'University adjacency',
            detail:
              'Rowan shapes Glassboro rentals and calendars; family districts elsewhere still need separate boundary checks.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Inspira Medical Center Mullica Hill',
            detail:
              'Key regional acute-care resource for much of Gloucester; confirm specialties and insurer networks.',
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
    title: 'Pricing & cost drivers inside Gloucester County',
    intro: 'HOA soft costs and corridor timing matter more than prestige ZIP alone.',
    drivers: [
      {
        title: 'HOA certificates',
        detail: 'Admin delays if left until move day.',
      },
      {
        title: 'Rural deadhead',
        detail: 'Southern township approaches add empty miles from denser bases.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$900+' },
      { label: '3–4 BR home', value: '$1,600–$3,500+' },
      { label: '2-person crew', value: '$100–$155+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'University and family closing seasons dominate.',
    items: [
      {
        title: 'August student wave',
        detail: 'Glassboro-area rentals turn over fast.',
      },
      {
        title: 'Late spring family peak',
        detail: 'Book weekend crews 2–4 weeks ahead.',
      },
    ],
  },
  resources: {
    title: 'Useful Gloucester County resources',
    items: [
      {
        label: 'Gloucester County',
        href: 'https://www.gloucestercountynj.gov/',
        external: true,
      },
      {
        label: 'NJ DOE school performance reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Camden County guide (parent contrast)',
        href: '/local-movers/new-jersey/camden',
      },
      {
        label: 'Directory: Gloucester filter',
        href: '/companies?coverage=state&state=NJ&counties=gloucester',
      },
    ],
  },
  directoryHint: 'Mention driveway length and any PA destination when requesting quotes.',
  lastReviewed: '2026-07-22',
});
