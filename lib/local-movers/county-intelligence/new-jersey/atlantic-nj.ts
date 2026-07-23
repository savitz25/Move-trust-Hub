import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';

/** Atlantic — casino/tourism corridor + mainland suburbs + pine/rural edges. */
export const atlanticCountyNjIntelligence: CountyIntelligencePack = {
  stateSlug: 'new-jersey',
  countySlug: 'atlantic',
  hubTitle: 'Atlantic County Shore & Mainland Moving Guide',
  eyebrow: 'Atlantic County · Casino coast & mainland',
  h1: 'Moving in Atlantic County, NJ: Boardwalk Logistics, Condos & Mainland Towns',
  heroOpener:
    'Atlantic County is not only the Boardwalk. Casino-district high-rises, Ventnor and Margate beach blocks, Egg Harbor / Galloway mainland suburbs, and pine-belt edges each create a different truck problem. Tourism seasons and event calendars can make a “simple” condo move feel like a production.',
  heroCredibility:
    'Boardwalk + mainland zones · Tourism-season awareness · Independent mover directory',
  collapsibleDeepContent: true,
  sectionOrder: [
    'specialized',
    'whatMakesDifferent',
    'zones',
    'relocation',
    'seasonal',
    'costDrivers',
    'resources',
  ],
  whatMakesDifferent: {
    title: 'Atlantic County move realities',
    intro: 'Elevators, sand, and summer traffic show up more often than in inland South Jersey.',
    bullets: [
      {
        title: 'High-rise casino-district rules',
        detail:
          'Atlantic City towers often require COIs, reserved freight elevators, and strict time windows. Share building rules with your mover before the estimate finalizes.',
      },
      {
        title: 'Beach-block geometry',
        detail:
          'Ventnor, Margate, and Longport streets can be tight; full trailers may need shuttles from wider staging streets.',
      },
      {
        title: 'ACE / parkway approach traffic',
        detail:
          'Atlantic City Expressway and local approaches congest on summer weekends and event days — billable time if your crew is hourly.',
      },
      {
        title: 'Mainland is a different market',
        detail:
          'Egg Harbor Township, Galloway, and Hamilton Township moves look more like classic suburban New Jersey — HOAs and cul-de-sacs rather than sand.',
      },
      {
        title: 'Hospitality workforce turnover',
        detail:
          'Seasonal employment creates lease-end clusters; book early if your dates land on those waves.',
      },
    ],
  },
  zonesHeading: 'Atlantic County zones that change the plan',
  zonesIntro: 'Island/coastal product vs mainland suburbs should change truck type and packing.',
  zones: [
    {
      id: 'ac-core',
      name: 'Atlantic City core',
      shortName: 'A.C. core',
      neighborhoods: ['Atlantic City', 'inlet & midtown corridors'],
      housingTypes: 'High-rises, multifamily, some row stock',
      challenges: ['Freight elevators', 'Security desks', 'Limited staging'],
      moverTips: 'Get elevator reservation confirmation numbers in writing.',
      cityKeywords: ['atlantic city'],
    },
    {
      id: 'downbeach',
      name: 'Downbeach towns',
      shortName: 'Downbeach',
      neighborhoods: ['Ventnor', 'Margate', 'Longport'],
      housingTypes: 'Beach houses, condos, elevated homes',
      challenges: ['Narrow streets', 'Sand tracking', 'Summer parking'],
      moverTips: 'Budget for floor protection and possible shuttle fees.',
      cityKeywords: ['ventnor', 'margate', 'longport'],
    },
    {
      id: 'mainland',
      name: 'Egg Harbor / Galloway mainland',
      shortName: 'Mainland',
      neighborhoods: ['Egg Harbor Township', 'Galloway', 'Northfield', 'Pleasantville'],
      housingTypes: 'Suburban single-family, townhomes, apartments',
      challenges: ['HOA rules', 'ACE traffic', 'School peaks'],
      moverTips: 'Treat as standard suburban access unless HOA docs say otherwise.',
      cityKeywords: ['egg harbor', 'galloway', 'northfield', 'pleasantville'],
    },
    {
      id: 'west-atlantic',
      name: 'Hammonton & western edges',
      shortName: 'West / Hammonton',
      neighborhoods: ['Hammonton', 'Buena area', 'rural edges'],
      housingTypes: 'Larger lots, agricultural-adjacent homes',
      challenges: ['Longer crew travel', 'Rural driveways'],
      moverTips: 'Confirm the crew is not pricing a pure shore surcharge for inland addresses.',
      cityKeywords: ['hammonton', 'buena'],
    },
  ],
  specialized: [
    {
      id: 'shore-condo',
      title: 'Boardwalk & condo logistics',
      intro: 'Coastal towers and beach blocks fail estimates that ignore building operations.',
      bullets: [
        'Ask whether COI must name the condo association and management company.',
        'Reserve elevators as soon as you have a closing date.',
        'Avoid major casino event weekends if flexible.',
        'Protect against salt air corrosion for metal furniture when storing near the coast.',
      ],
    },
  ],
  seasonal: {
    title: 'Tourism calendar & storms',
    intro: 'Summer visitors and Atlantic storms both reshape access.',
    items: [
      {
        title: 'Memorial Day–Labor Day',
        detail: 'Peak demand; boardwalk-area parking is worst on weekends.',
      },
      {
        title: 'Shoulder seasons',
        detail: 'Often best for condo moves — still confirm event calendars.',
      },
      {
        title: 'Hurricane / nor’easter watch',
        detail: 'Coastal closings may need flexible language if weather threatens.',
      },
    ],
  },
  costDrivers: {
    title: 'Atlantic County cost context',
    intro: 'Island elevators and shuttles drive outliers more than pure distance.',
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$950' },
      { label: 'Family home', value: '$1,800–$4,000' },
      { label: '2-person crew', value: '$110–$165/hr' },
    ],
    drivers: [
      { title: 'Elevator / building fees', detail: 'Common in AC towers.' },
      { title: 'Shuttle for beach blocks', detail: 'Budget contingency for Downbeach streets.' },
      { title: 'Peak tourism labor', detail: 'Summer weekends price higher when crews are scarce.' },
    ],
  },
  relocation: {
    title: 'Moving to Atlantic County — lifestyle research',
    intro:
      'Decide whether you want boardwalk energy, quieter downbeach living, or mainland suburban schools — then validate flood insurance and commute needs.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & districts',
        intro:
          'Atlantic County education is municipal/regional. Atlantic City, mainland townships, and western communities each operate distinct systems.',
        bullets: [
          {
            title: 'Match address to district',
            detail:
              'Use NJ DOE tools and district boundary maps before assuming a desirable school follows a listing’s marketing town name.',
          },
          {
            title: 'Mainland family draws',
            detail:
              'Egg Harbor Township and Galloway often enter family shortlists for space and program variety — still verify current performance reports.',
          },
          {
            title: 'Ratings caution',
            detail:
              'Independent rating sites can lag renovations and leadership changes; pair them with in-person visits.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & care access',
        bullets: [
          {
            title: 'AtlantiCare Regional Medical Center',
            detail:
              'Primary regional health system for much of the county (Atlantic City / mainland campuses) — confirm ER and specialty access for your household.',
          },
          {
            title: 'Shore distance',
            detail:
              'From barrier and downbeach addresses, map drive times in summer traffic for emergencies.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing & costs',
        bullets: [
          {
            title: 'Bimodal market',
            detail:
              'Condo/boardwalk product vs mainland suburban stock — insurance (including flood) can dominate coastal monthly costs.',
          },
          {
            title: 'Relative affordability',
            detail:
              'Often more approachable than North Jersey for comparable size inland; waterfront is its own market.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town fit',
        bullets: [
          { title: 'Atlantic City', detail: 'Urban density, hospitality jobs, high-rise living.' },
          { title: 'Downbeach', detail: 'Year-round shore towns with quieter winters.' },
          { title: 'Mainland townships', detail: 'Family subdivisions and commercial corridors.' },
          { title: 'Hammonton area', detail: 'More inland character, agricultural heritage.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commuting',
        bullets: [
          {
            title: 'Hospitality & healthcare',
            detail: 'Casinos, tourism, and AtlantiCare-related employment remain major anchors.',
          },
          {
            title: 'Philly / South Jersey',
            detail:
              'Some residents commute west toward Camden/Philly corridors; ACE traffic is the constraint.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & climate',
        bullets: [
          {
            title: 'Seasonal swing',
            detail: 'Summer crowds vs quieter winters change daily life dramatically on the coast.',
          },
          {
            title: 'Flood awareness',
            detail: 'Check FEMA maps and elevation certificates for coastal and bay parcels.',
          },
        ],
      },
      {
        id: 'demographics',
        title: 'Community snapshot',
        bullets: [
          {
            title: 'Diverse economy',
            detail:
              'Tourism workforce plus year-round mainland families create distinct subcultures by neighborhood (Census/local economic data).',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Atlantic County resources',
    intro: 'Verify building rules and flood data on official channels.',
    items: [
      { label: 'Atlantic County', href: 'https://www.atlantic-county.org/', external: true },
      {
        label: 'FEMA flood maps',
        href: 'https://msc.fema.gov/portal/home',
        external: true,
      },
      {
        label: 'Directory: Atlantic County',
        href: '/companies?coverage=state&state=NJ&counties=atlantic',
      },
      { label: 'NJ local movers hub', href: '/local-movers/new-jersey' },
    ],
  },
  directoryHint: 'Prioritize elevator/COI experience for Atlantic City and Downbeach addresses.',
  lastReviewed: '2026-07-22',
};
