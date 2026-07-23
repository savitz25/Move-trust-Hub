import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/** Somerset — affluent suburban / corporate / historic villages. */
export const somersetCountyNjIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'somerset',
  hubTitle: 'Somerset County Relocation & Moving Guide',
  eyebrow: 'Somerset County · Affluent suburban & corporate',
  h1: 'Moving to Somerset County, NJ: Corporate Corridors, HOAs & Village Streets',
  heroOpener:
    'Somerset County is classic Central Jersey suburbia with an upscale tilt: Bridgewater shopping and offices, Somerville’s walkable core, historic village streets, and large-lot townships where HOAs and winding cul-de-sacs shape every move. Expect polished properties — and paperwork to match.',
  heroCredibility:
    'HOA-heavy suburbs · I-287 corridor · Independent listings — not paid placements',
  collapsibleDeepContent: true,
  sectionOrder: [
    'costDrivers',
    'whatMakesDifferent',
    'zones',
    'specialized',
    'relocation',
    'seasonal',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'Somerset-specific moving friction',
    intro: 'The hard parts are usually rules and geometry — not finding a truck on a random Tuesday.',
    bullets: [
      {
        title: 'HOA move windows are non-negotiable',
        detail:
          'Many townhome and condo communities require COIs, reserved elevators, and weekday-only moves. A great price that ignores association rules is not a usable bid.',
      },
      {
        title: 'Cul-de-sac geometry',
        detail:
          'Large-lot subdivisions can still strand a 26-ft truck. Measure turnarounds and low wires on the last 200 feet of driveway.',
      },
      {
        title: 'I-287 & Route 22 timing',
        detail:
          'Corporate commuting corridors make mid-afternoon moves expensive on the clock. Morning midweek is usually cleaner.',
      },
      {
        title: 'Historic village cores',
        detail:
          'Somerville, Bound Brook edges, and older centers have tighter streets and older staircases — plan for long carries.',
      },
      {
        title: 'High-value household goods',
        detail:
          'Affluent inventory (fine furniture, wine storage, art) needs packing tier clarity and insurance documentation in writing.',
      },
    ],
  },
  zonesHeading: 'Somerset County neighborhoods by move type',
  zonesIntro: 'Corporate apartments, townhome HOAs, and estate lots do not share the same crew profile.',
  zones: [
    {
      id: 'bridgewater-core',
      name: 'Bridgewater & corporate core',
      shortName: 'Bridgewater',
      neighborhoods: ['Bridgewater', 'Finderne', 'office-park adjacent apartments'],
      housingTypes: 'Garden apartments, townhomes, mid-size colonials',
      challenges: ['HOA elevators', 'Route 22 congestion', 'Lease-end clusters'],
      moverTips: 'Align move day with building management hours; many offices close early Fridays.',
      cityKeywords: ['bridgewater'],
    },
    {
      id: 'somerville-bound-brook',
      name: 'Somerville & Bound Brook',
      shortName: 'Somerville',
      neighborhoods: ['Somerville', 'Bound Brook', 'Manville edge'],
      housingTypes: 'Victorians, duplexes, smaller lots',
      challenges: ['Street parking', 'Older stairs', 'Flood-history parcels in places'],
      moverTips: 'Check flood and elevation notes for low-lying parcels; protect against damp basements.',
      cityKeywords: ['somerville', 'bound brook', 'manville'],
    },
    {
      id: 'hillsborough-montgomery',
      name: 'Hillsborough & Montgomery belt',
      shortName: 'Hillsborough',
      neighborhoods: ['Hillsborough', 'Montgomery', 'Skillman'],
      housingTypes: 'Larger suburban homes, some equestrian-adjacent lots',
      challenges: ['Long driveways', 'HOA architectural rules', 'School traffic'],
      moverTips: 'Photo the driveway grade. Soft shoulders after rain can block heavy trucks.',
      cityKeywords: ['hillsborough', 'montgomery', 'skillman'],
    },
    {
      id: 'bernards-far-hills',
      name: 'Bernards / Far Hills / Basking Ridge',
      shortName: 'Bernards area',
      neighborhoods: ['Basking Ridge', 'Bernardsville', 'Far Hills'],
      housingTypes: 'Upscale colonials, estates, luxury townhomes',
      challenges: ['High-value packing needs', 'Gate codes', 'Tree-lined low wires'],
      moverTips: 'Require detailed valuation coverage discussion for fine furnishings.',
      cityKeywords: ['basking ridge', 'bernardsville', 'far hills', 'bernards'],
    },
  ],
  specialized: [
    {
      id: 'corporate-hoa',
      title: 'Corporate corridor & HOA module',
      intro: 'Bridgewater-area complexes and office-adjacent rentals turn on paperwork more than muscle.',
      bullets: [
        'Collect COI requirements the day you sign a lease.',
        'Ask if the building charges elevator overtime after 4 p.m.',
        'Corporate relos may reimburse only for licensed interstate carriers — clarify if your move stays in-state.',
      ],
    },
  ],
  seasonal: {
    title: 'Best windows for Somerset moves',
    intro: 'School calendars and corporate lease cycles matter more than tourism.',
    items: [
      {
        title: 'Late summer peak',
        detail: 'Family closings + lease turns; book early for Saturdays.',
      },
      {
        title: 'January–March',
        detail: 'Often better crew availability; watch ice on north-facing steps.',
      },
      {
        title: 'December freezes',
        detail: 'Holiday blackout dates at some HOAs — read the rules PDF carefully.',
      },
    ],
  },
  costDrivers: {
    title: 'Pricing context for Somerset County',
    intro: 'Upscale access and packing needs often matter more than raw mileage.',
    ranges: [
      { label: 'Studio / 1-BR', value: '$500–$1,000' },
      { label: '3–4 BR home', value: '$1,900–$4,000+', note: 'Estate packing can exceed range' },
      { label: '2-person crew', value: '$120–$175/hr' },
    ],
    drivers: [
      { title: 'Full packing service', detail: 'Common for executive moves — line-item it clearly.' },
      { title: 'HOA admin time', detail: 'Certificate processing can delay start if left late.' },
      { title: 'Long driveway carries', detail: 'Hillsborough-area lots add labor minutes per trip.' },
    ],
  },
  relocation: {
    title: 'Is Somerset County the right fit?',
    intro:
      'Strong schools reputation in many districts, corporate job access, and suburban amenities — at NJ cost levels. Validate the specific town, not the county brand.',
    modules: [
      {
        id: 'schools',
        title: 'Education landscape',
        intro:
          'Somerset families often prioritize district reputation when choosing among Bridgewater-Raritan, Hillsborough, Montgomery, Bernards Township, and other local systems.',
        bullets: [
          {
            title: 'District-by-town shopping',
            detail:
              'Confirm boundaries for any address. NJ DOE performance reports and district sites are the authoritative starting points.',
          },
          {
            title: 'Competitive enrollment',
            detail:
              'Popular districts can see tight housing inventory — build buffer time before school start.',
          },
          {
            title: 'Independent ratings',
            detail:
              'Niche/GreatSchools can help shortlist, but visit schools and talk to parents for program fit (arts, STEM, special education).',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare access',
        bullets: [
          {
            title: 'RWJ University Hospital Somerset (Somerville)',
            detail: 'Key local acute-care hospital for much of the county; confirm specialties.',
          },
          {
            title: 'Regional options',
            detail:
              'Some residents use systems toward New Brunswick or Morristown for tertiary care — map insurance networks before you move.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & costs',
        bullets: [
          {
            title: 'Affluent suburban profile',
            detail:
              'Many towns price above state median; townhomes can be the entry point for first-time buyers.',
          },
          {
            title: 'Versus NYC metro',
            detail:
              'Often positioned as a space-and-schools trade versus denser North Jersey or city living — run total commute + tax math.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          { title: 'Bridgewater', detail: 'Retail, offices, practical suburban living.' },
          { title: 'Somerville', detail: 'Walkable downtown energy with smaller lots.' },
          { title: 'Hillsborough / Montgomery', detail: 'Larger homes, school-focused family draws.' },
          { title: 'Bernards area', detail: 'Upscale, quieter, premium pricing.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commuting',
        bullets: [
          {
            title: 'Corporate employers',
            detail: 'Pharmaceuticals, finance, and professional services cluster along major corridors.',
          },
          {
            title: 'Transit',
            detail:
              'NJ Transit rail access from select stations supports NYC commuting for some; many households still drive I-287 daily.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Daily life',
        bullets: [
          {
            title: 'Parks & suburbs',
            detail: 'Strong park systems and organized youth sports culture in many towns.',
          },
          {
            title: 'Car dependence',
            detail: 'Outside a few downtown cores, plan on driving for errands.',
          },
        ],
      },
      {
        id: 'demographics',
        title: 'Who lives here',
        bullets: [
          {
            title: 'Family & professional skew',
            detail:
              'Census patterns for many Somerset municipalities show family households and higher educational attainment relative to some peers — still verify block-level feel in person.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Somerset County links',
    intro: 'Use official district and county resources; mover listings remain independent.',
    items: [
      { label: 'Somerset County', href: 'https://www.co.somerset.nj.us/', external: true },
      {
        label: 'NJ DOE performance reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Directory filter: Somerset',
        href: '/companies?coverage=state&state=NJ&counties=somerset',
      },
      { label: 'All NJ county guides', href: '/local-movers/new-jersey' },
    ],
  },
  directoryHint: 'Look for HOA-ready crews and high-value packing experience.',
  lastReviewed: '2026-07-22',
};
