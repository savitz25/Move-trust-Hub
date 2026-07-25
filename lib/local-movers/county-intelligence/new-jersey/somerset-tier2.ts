import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Somerset — NJ Tier 2 Wave 1 · Bridgewater / Central Jersey · parent Middlesex */
export const somersetCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'somerset',
  hubTitle: 'Somerset County Moving Intelligence Hub',
  eyebrow: 'Somerset · Central Jersey · vs Middlesex',
  h1: 'Moving in Somerset County: Bridgewater Corporate Parks, Somerville & I-287 Living',
  heroOpener:
    'Somerset is Central Jersey’s corporate-and-residential belt — Bridgewater offices and retail, Somerville’s walkable core, Hillsborough/Montgomery family tracts, and Bernards-area upscale pockets. Compared with Middlesex Turnpike/Route 1 industrial density and Rutgers campus churn, Somerset jobs skew planned-community HOAs, cul-de-sac staging, and I-287 / I-78 portal-to-portal time. This guide is for people moving in Somerset as its own market — not an Edison rename.',
  heroCredibility:
    'Corporate parks + HOAs · I-287 / I-78 · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-287 · I-78 · Route 22 · Route 206',
  parentCompare: {
    parentLabel: 'Middlesex County',
    parentHref: '/local-movers/new-jersey/middlesex',
    title: 'Compared with Middlesex County',
    intro:
      'Somerset is Central Jersey HOA and corporate-park product — not Middlesex Turnpike industrial density or New Brunswick campus peaks. Use Middlesex as the dense parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Middlesex crews fight Turnpike / Route 1 industrial pairs and campus calendars. Somerset pairs ride I-287, I-78, Route 22, and Route 206 — freer mid-day than Edison–Woodbridge peaks, still billable on Bridgewater ↔ Hillsborough hauls.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Middlesex mixes multi-family, industrial-adjacent rentals, and dense municipal cores. Somerset skews planned townhomes, larger SFH, Somerville multi-story village stock, and Bernards upscale lots — more HOA paperwork, less continuous multi-unit curb fights.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Middlesex often needs dense-block staging and student-turnover windows. Somerset defaults to HOA COIs, gate lists, and cul-de-sac geometry — with shuttle risk on Somerville downtown blocks.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Somerset quotes often sit near or above dense Middlesex rates when high-value packing and HOA soft costs apply, even when streets look “easier.”',
      },
      {
        title: 'Role difference',
        detail:
          'Somerset is Bridgewater corporate bedroom + residential HOA product — not Middlesex’s industrial/Turnpike engine. Match crews to certificates and driveway access.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Somerset County different',
    intro: 'Paperwork and freeway clocks — not Turnpike industrial defaults.',
    bullets: [
      {
        title: 'HOA move windows are non-negotiable',
        detail:
          'Townhome and condo associations often require COIs and weekday-only loads — a Saturday-only bid can be unusable.',
      },
      {
        title: 'Corporate lease clusters',
        detail:
          'Bridgewater-area apartments turn with office calendars; mid-month midweek can be cleaner than month-end Saturdays.',
      },
      {
        title: 'I-287 / Route 22 peaks are billable',
        detail:
          'Portal-to-portal hourly billing feels every commute delay. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'High-value Bernards-area inventories',
        detail:
          'Fine furniture and electronics need packing tier clarity and valuation coverage in writing.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Somerset zones: Bridgewater, Somerville, Hillsborough & Bernards edge',
  zonesIntro:
    'Corporate apartments, village streets, family tracts, and upscale lots are not one truck plan.',
  zones: [
    {
      id: 'bridgewater',
      name: 'Bridgewater corporate / retail core',
      shortName: 'Bridgewater',
      neighborhoods: ['Bridgewater', 'Finderne', 'office-park adjacent rentals'],
      housingTypes: 'Garden apartments, townhomes, mid-size SFH',
      challenges: ['HOA elevators', 'Route 22 congestion', 'Lease-end waves'],
      moverTips: 'Align with management office hours; Friday early closings are common.',
      cityKeywords: ['bridgewater'],
    },
    {
      id: 'somerville',
      name: 'Somerville & Bound Brook',
      shortName: 'Somerville',
      neighborhoods: ['Somerville', 'Bound Brook'],
      housingTypes: 'Older multi-story, smaller lots, duplexes',
      challenges: ['Street parking', 'Stairs', 'Tighter downtown blocks'],
      moverTips: 'Measure stair turns; stage on wider side streets when possible.',
      cityKeywords: ['somerville', 'bound brook'],
    },
    {
      id: 'hillsborough-montgomery',
      name: 'Hillsborough / Montgomery family belt',
      shortName: 'Hillsborough',
      neighborhoods: ['Hillsborough', 'Montgomery', 'Skillman'],
      housingTypes: 'Larger suburban homes, some longer lots',
      challenges: ['Driveway length', 'School traffic', 'HOA rules'],
      moverTips: 'Photo the driveway; soft shoulders after rain can strand trucks.',
      cityKeywords: ['hillsborough', 'montgomery', 'skillman'],
    },
    {
      id: 'bernards',
      name: 'Bernards / Basking Ridge edge',
      shortName: 'Bernards',
      neighborhoods: ['Basking Ridge', 'Bernardsville', 'Far Hills edge'],
      housingTypes: 'Upscale SFH, luxury townhomes',
      challenges: ['High-value packing', 'Tree canopies', 'Gate codes'],
      moverTips: 'Discuss valuation coverage for fine furnishings up front.',
      cityKeywords: ['basking ridge', 'bernardsville', 'bernards', 'far hills'],
    },
  ],
  specialized: [
    {
      id: 'hoa-corporate',
      title: 'HOA & corporate-apartment module',
      intro: 'Bridgewater complexes fail estimates that ignore certificates and elevator hours.',
      bullets: [
        'Request the COI template at lease signing.',
        'Ask about elevator overtime after 4 p.m.',
        'Corporate reimbursements may require licensed interstate carriers for out-of-state legs.',
      ],
    },
    {
      id: 'i287-timing',
      title: 'I-287 / I-78 timing module',
      intro: 'Freeway peaks turn short Somerset pairs into long billable hours.',
      bullets: [
        'Prefer mid-morning midweek for Bridgewater ↔ Hillsborough hauls.',
        'Confirm whether quotes are portal-to-portal.',
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
          'Families often compare Bridgewater-Raritan, Hillsborough, Montgomery, Bernards Township, and other local systems.',
        bullets: [
          {
            title: 'Boundary check',
            detail:
              'Use NJ DOE performance reports and district maps — town marketing names can cross feeders.',
          },
          {
            title: 'Housing competition',
            detail:
              'Popular districts tighten inventory near school start; begin searches early if timing is fixed.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'RWJ University Hospital Somerset (Somerville)',
            detail: 'Key local acute-care hospital for much of the county; confirm specialties.',
          },
          {
            title: 'Regional tertiary options',
            detail:
              'Some households use New Brunswick or Morristown systems for specialty care — map insurer networks.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Somerset County',
    intro: 'HOA soft costs and freeway timing often outweigh raw miles.',
    drivers: [
      {
        title: 'COI / elevator windows',
        detail: 'Forced midweek loads and admin delays raise effective cost.',
      },
      {
        title: 'High-value packing',
        detail: 'Bernards-area inventories often need higher packing tiers.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$500–$1,000+' },
      { label: '3–4 BR home', value: '$1,900–$4,000+' },
      { label: '2-person crew', value: '$120–$175+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years and corporate lease cycles — not shore tourism.',
    items: [
      {
        title: 'Late summer peak',
        detail: 'Family closings + apartment turns fill Saturday crews.',
      },
      {
        title: 'January–March',
        detail: 'Often better availability; watch ice on north steps.',
      },
    ],
  },
  resources: {
    title: 'Useful Somerset County resources',
    items: [
      {
        label: 'Somerset County',
        href: 'https://www.co.somerset.nj.us/',
        external: true,
      },
      {
        label: 'NJ DOE school performance reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Middlesex County Tier 1 guide (parent contrast)',
        href: '/local-movers/new-jersey/middlesex',
      },
      {
        label: 'Directory: Somerset filter',
        href: '/companies?coverage=state&state=NJ&counties=somerset',
      },
    ],
  },
  directoryHint: 'Filter for HOA-ready crews with Central Jersey freeway experience.',
  lastReviewed: '2026-07-22',
});
