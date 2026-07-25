import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Burlington — NJ Tier 2 Wave 1 · Mount Laurel / Moorestown growth · parent Camden */
export const burlingtonCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'burlington',
  hubTitle: 'Burlington County Moving Intelligence Hub',
  eyebrow: 'Burlington · South Jersey growth · vs Camden',
  h1: 'Moving in Burlington County: Mount Laurel, Moorestown & Turnpike Growth Suburbs',
  heroOpener:
    'Burlington is South Jersey’s growth arc north and east of the Cherry Hill core — Mount Laurel office/retail corridors, Moorestown’s high-value residential character, Mount Holly’s county-seat scale, and longer township runs toward Joint Base McGuire-Dix-Lakehurst. Compared with Camden’s Philly-collar core, Burlington stretches farther on Turnpike / I-295 legs, adds base-adjacent calendars, and introduces longer driveway access on eastern edges. This guide is for people moving in Burlington as growth-suburb product — not a Cherry Hill rename.',
  heroCredibility:
    'Turnpike suburbs · Planned communities · Base-adjacent notes · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'NJ Turnpike · I-295 · Route 38 · Route 73 · Route 206',
  parentCompare: {
    parentLabel: 'Camden County',
    parentHref: '/local-movers/new-jersey/camden',
    title: 'Compared with Camden County',
    intro:
      'Burlington is South Jersey growth north/east of Cherry Hill — Mount Laurel, Moorestown, Mount Holly, and base approaches — not a drop-in template for PATCO walk-ups or Haddonfield historic blocks.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Camden crews fight Philly bridges and denser collar arterials. Burlington pairs stretch on the Turnpike, I-295, Routes 38/73/206 — freer mid-day than bridge approaches, still peak-heavy on Mount Laurel ↔ Philly-direction and eastern base hauls.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Camden mixes Cherry Hill suburbs, historic Haddonfield, and urban multi-story. Burlington’s ladder is planned Mount Laurel communities, Moorestown high-value SFH, Mount Holly mixed stock, and eastern military-adjacent / longer-lot homes — more HOA growth product, less continuous urban curb fights.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Camden adds bridge timing and historic-street shuttles. Burlington defaults to planned-community COIs and longer township empty miles — plus Joint Base gate timing rare in Cherry Hill cores.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Burlington quotes often sit near South Jersey suburban rates for simple driveway access — long east–west pairs, HOA soft costs, and base calendars still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Burlington is Turnpike growth + base-adjacent South Jersey — not Camden’s densest Philly-collar core. Match crews to planned-community paperwork and longer legs.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Burlington County different',
    intro: 'Growth suburbs + base adjacency + long township legs.',
    bullets: [
      {
        title: 'Planned-community HOAs are common',
        detail:
          'Mount Laurel and similar developments often require COIs, approved hours, and floor protection rules.',
      },
      {
        title: 'Turnpike / I-295 timing is a line item',
        detail:
          'Cross-county pairs and Philly-direction jobs feel peak congestion on interstate approaches. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Joint Base–adjacent calendars',
        detail:
          'Military and contractor housing can cluster moves on official calendars — book early around those waves.',
      },
      {
        title: 'Eastern long-access parcels',
        detail:
          'Longer driveways and thinner services than Cherry Hill cores — photo the approach.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Burlington zones: Mount Laurel, Moorestown, Mount Holly & eastern base approaches',
  zonesIntro: 'Western growth suburbs and eastern base/rural edges are different access jobs.',
  zones: [
    {
      id: 'mount-laurel',
      name: 'Mount Laurel corridor',
      shortName: 'Mount Laurel',
      neighborhoods: ['Mount Laurel', 'office/retail edges'],
      housingTypes: 'Planned SFH, townhomes, apartments',
      challenges: ['HOA windows', 'Arterial traffic', 'Lease clusters'],
      moverTips: 'Collect HOA packets early; avoid retail-peak Saturday middays.',
      cityKeywords: ['mount laurel'],
    },
    {
      id: 'moorestown',
      name: 'Moorestown high-value residential',
      shortName: 'Moorestown',
      neighborhoods: ['Moorestown', 'nearby high-value tracts'],
      housingTypes: 'Larger SFH, some historic multi-story',
      challenges: ['High-value packing', 'Tree canopies', 'HOA rules'],
      moverTips: 'Discuss valuation coverage and driveway staging up front.',
      cityKeywords: ['moorestown'],
    },
    {
      id: 'mount-holly-westampton',
      name: 'Mount Holly / Westampton belt',
      shortName: 'Mount Holly',
      neighborhoods: ['Mount Holly', 'Westampton', 'Lumberton edge'],
      housingTypes: 'Mixed SFH, townhomes, county-seat stock',
      challenges: ['Mixed access', 'I-295 timing'],
      moverTips: 'Confirm truck routes around county-seat streets.',
      cityKeywords: ['mount holly', 'westampton', 'lumberton'],
    },
    {
      id: 'east-base',
      name: 'Eastern Burlington / base approaches',
      shortName: 'East / base',
      neighborhoods: ['Pemberton area', 'base-adjacent townships', 'eastern rural edges'],
      housingTypes: 'Military-adjacent housing, longer-lot homes',
      challenges: ['Longer crew travel', 'Base access rules', 'Rural driveways'],
      moverTips: 'Ask about gate timing and ID rules for base-adjacent properties.',
      cityKeywords: ['pemberton', 'browns mills', 'fort dix', 'mcguire'],
    },
  ],
  specialized: [
    {
      id: 'planned-hoa',
      title: 'Planned community / HOA module',
      intro: 'Mount Laurel-style associations are paperwork-heavy.',
      bullets: [
        'Request COI templates at contract signing.',
        'Confirm weekday-only windows before booking Saturday.',
        'Ask about dumpster bans and floor protection deposits.',
      ],
    },
    {
      id: 'turnpike-i295',
      title: 'Turnpike / I-295 timing module',
      intro: 'Interstate approaches define many “local” Burlington pairs.',
      bullets: [
        'Prefer midweek mornings for long township hauls.',
        'Confirm portal-to-portal terms on the estimate.',
      ],
    },
    {
      id: 'joint-base',
      title: 'Joint Base–adjacent module',
      intro: 'Military calendars and access rules are Burlington-specific.',
      bullets: [
        'Confirm whether the property needs base credentials for truck entry.',
        'Book early around PCS peak seasons when known.',
        'Clarify storage options if housing dates slip.',
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
          'Burlington families often compare districts serving Moorestown, Mount Laurel, Lenape regional areas, and other local systems.',
        bullets: [
          {
            title: 'Boundary verification',
            detail:
              'Use NJ DOE performance reports and district maps — growth townships can have non-obvious feeder patterns.',
          },
          {
            title: 'Growth capacity',
            detail:
              'Ask about class sizes and facilities when touring fast-growing communities.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Virtua / regional South Jersey systems',
            detail:
              'Major care anchors for western Burlington households — confirm campus and specialty access in-network.',
          },
          {
            title: 'Eastern / base distance',
            detail:
              'Map ER drive times from eastern township addresses; services are more spread out than Cherry Hill cores.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Burlington County',
    intro: 'HOA soft costs and longer township legs matter more than boardwalk elevators.',
    drivers: [
      {
        title: 'HOA certificates',
        detail: 'Admin delays if left until move day.',
      },
      {
        title: 'Travel across the county',
        detail: 'Mount Laurel ↔ eastern base approaches are long locals.',
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
    intro: 'Family closings and base-related waves.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Suburban SFH Saturdays book first.',
      },
      {
        title: 'PCS-related peaks',
        detail: 'When known, book early around military move seasons.',
      },
    ],
  },
  resources: {
    title: 'Useful Burlington County resources',
    items: [
      {
        label: 'Burlington County',
        href: 'https://www.co.burlington.nj.us/',
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
        label: 'Directory: Burlington filter',
        href: '/companies?coverage=state&state=NJ&counties=burlington',
      },
    ],
  },
  directoryHint: 'Mention HOA rules and any PA destination when requesting quotes.',
  lastReviewed: '2026-07-22',
});
