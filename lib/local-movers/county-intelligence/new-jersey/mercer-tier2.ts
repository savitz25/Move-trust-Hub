import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Mercer — NJ Tier 2 Wave 1 · capital + university · parent Middlesex */
export const mercerCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'mercer',
  hubTitle: 'Mercer County Moving Intelligence Hub',
  eyebrow: 'Mercer · capital + university corridor · vs Middlesex',
  h1: 'Moving in Mercer County: Trenton Capital, Princeton Campus & Turnpike Access',
  heroOpener:
    'Mercer packs a state capital, a global university town, Route 1 office parks, and still-rural western pockets into short drives. Compared with Middlesex Turnpike industrial density and Rutgers New Brunswick churn, Mercer jobs swing between Trenton stairs, Princeton narrow streets, Hamilton suburban HOAs, and Hopewell long driveways — with Turnpike / I-295 and Route 1 as the clocks. This guide is for people moving in Mercer as capital + campus product — not an Edison rename.',
  heroCredibility:
    'Capital + university · Route 1 / Turnpike / I-295 · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · I-295 · NJ Turnpike · Route 1 · Route 206',
  parentCompare: {
    parentLabel: 'Middlesex County',
    parentHref: '/local-movers/new-jersey/middlesex',
    title: 'Compared with Middlesex County',
    intro:
      'Mercer is capital + Princeton campus + Route 1 professional product — not Middlesex industrial/Turnpike density. Use Middlesex as the dense Central Jersey parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Middlesex crews fight Turnpike / Route 1 industrial pairs and campus peaks around New Brunswick. Mercer pairs use I-295, the Turnpike, Route 1, and Route 206 — freer mid-day on western legs, still peak-heavy on Princeton ↔ Hamilton and capital approaches.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Middlesex mixes multi-family, industrial-adjacent rentals, and dense municipal cores. Mercer mixes Trenton multi-story, Princeton historic homes, Hamilton suburban SFH, and Hopewell larger lots — more campus/capital calendar friction, less continuous industrial churn.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Middlesex often needs dense-block staging and student turnovers. Mercer adds Princeton shuttle risk, Trenton stairs, Route 1 HOA townhomes, and western soft-driveway risk after rain.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Mercer quotes can match or exceed dense Middlesex rates when stairs, campus access, and professional packing apply — even when map miles look short.',
      },
      {
        title: 'Role difference',
        detail:
          'Mercer is capital + university corridor with independent government calendars — not Middlesex’s industrial/Turnpike engine alone.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Mercer County different',
    intro: 'Capital, campus, and corridor — three jobs under one county name.',
    bullets: [
      {
        title: 'Campus peaks jam curb space',
        detail:
          'Late August and academic events near Princeton fill elevators and streets — flexible dates save money.',
      },
      {
        title: 'Urban Trenton inventory',
        detail:
          'Rowhomes and multi-story buildings mean stairs and limited staging vs suburban Hamilton cul-de-sacs.',
      },
      {
        title: 'Route 1 / Turnpike portal-to-portal',
        detail:
          'Office-park to residential pairs burn billable time at commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Western Hopewell access risk',
        detail:
          'Long driveways and soft shoulders after rain can force smaller trucks or shuttles.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Mercer zones: Princeton, Trenton/Hamilton, Route 1 east & Hopewell west',
  zonesIntro: 'Campus blocks, capital streets, and western lots need different trucks.',
  zones: [
    {
      id: 'princeton',
      name: 'Princeton university belt',
      shortName: 'Princeton',
      neighborhoods: ['Princeton', 'near-campus streets', 'West Windsor edge'],
      housingTypes: 'Victorians, colonials, faculty rentals',
      challenges: ['Narrow streets', 'Event parking', 'Historic stairs'],
      moverTips: 'Avoid reunions weekends; measure street width before promising a full trailer.',
      cityKeywords: ['princeton', 'west windsor'],
    },
    {
      id: 'trenton-hamilton',
      name: 'Trenton & Hamilton',
      shortName: 'Trenton / Hamilton',
      neighborhoods: ['Trenton', 'Hamilton', 'Ewing'],
      housingTypes: 'Rowhomes, capes, garden apartments',
      challenges: ['Stairs', 'Urban parking', 'Long carries'],
      moverTips: 'Inventory stairs carefully; get written building access rules for multi-unit.',
      cityKeywords: ['trenton', 'hamilton', 'ewing'],
    },
    {
      id: 'lawrence-east',
      name: 'Lawrence / East Windsor corridor',
      shortName: 'Route 1 east',
      neighborhoods: ['Lawrence', 'East Windsor', 'Hightstown'],
      housingTypes: 'Suburban SFH, townhomes, office-adjacent rentals',
      challenges: ['HOA windows', 'Route 1 peaks'],
      moverTips: 'Mid-morning starts miss the worst Route 1 crush.',
      cityKeywords: ['lawrence', 'east windsor', 'hightstown'],
    },
    {
      id: 'hopewell-west',
      name: 'Hopewell western lots',
      shortName: 'West Mercer',
      neighborhoods: ['Hopewell', 'Pennington'],
      housingTypes: 'Larger lots, village homes',
      challenges: ['Long driveways', 'Soft shoulders'],
      moverTips: 'Photo the driveway after rain; soft ground can strand heavy trucks.',
      cityKeywords: ['hopewell', 'pennington'],
    },
  ],
  specialized: [
    {
      id: 'university-capital',
      title: 'University & capital calendars',
      intro: 'Princeton peaks and state schedules pull the same regional labor pool.',
      bullets: [
        'Avoid late August campus turnovers when flexible.',
        'State holidays can free parking but close related building offices — plan elevator access.',
        'Professional inventories (libraries, art) need packing tier clarity.',
      ],
    },
    {
      id: 'turnpike-i295',
      title: 'Turnpike / I-295 corridor timing',
      intro: 'Long-local and multi-county pairs use interstate approaches even when both ends are NJ.',
      bullets: [
        'Ask whether quotes are portal-to-portal.',
        'Midweek mornings usually beat Friday outbound peaks.',
      ],
    },
    {
      id: 'hoa-route1',
      title: 'HOA / COI along Route 1',
      intro: 'Townhome communities require certificates before move-in.',
      bullets: [
        'Request association COI templates early.',
        'Some boards allow weekday moves only.',
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
          'Families evaluate municipal/regional districts tied to Princeton, Hopewell Valley, Hamilton, Lawrence, East Windsor, and others.',
        bullets: [
          {
            title: 'Address → district',
            detail:
              'Confirm boundaries via NJ DOE tools; Princeton-area competition for housing is real near school calendars.',
          },
          {
            title: 'Higher ed presence',
            detail:
              'Princeton University shapes rentals and traffic — useful for dual-career academic households.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Penn Medicine Princeton Medical Center',
            detail: 'Major regional acute-care hub for much of central Mercer.',
          },
          {
            title: 'Capital Health (Trenton/Hamilton area)',
            detail: 'Key system for capital-area residents — map ER times at rush hour.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Mercer County',
    intro: 'Stairs, campus access, and corridor timing move price more than prestige ZIP alone.',
    drivers: [
      {
        title: 'Long carries & stairs',
        detail: 'Trenton multi-story and older Princeton homes add labor hours.',
      },
      {
        title: 'Shuttle for narrow streets',
        detail: 'Princeton borough blocks may not stage full trailers.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,000+' },
      { label: '3–4 BR home', value: '$1,700–$3,800+' },
      { label: '2-person crew', value: '$110–$170+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Academic and professional calendars dominate.',
    items: [
      {
        title: 'Late August / early September',
        detail: 'Campus turnovers near Princeton.',
      },
      {
        title: 'May–June family peak',
        detail: 'Book weekend crews 2–4 weeks ahead.',
      },
    ],
  },
  resources: {
    title: 'Useful Mercer County resources',
    items: [
      {
        label: 'Mercer County',
        href: 'https://www.mercercounty.org/',
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
        label: 'Directory: Mercer filter',
        href: '/companies?coverage=state&state=NJ&counties=mercer',
      },
    ],
  },
  directoryHint: 'Mention stairs, street width, and any PA destination when requesting quotes.',
  lastReviewed: '2026-07-22',
});
