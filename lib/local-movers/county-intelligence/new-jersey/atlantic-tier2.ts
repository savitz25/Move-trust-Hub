import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Atlantic — NJ Tier 2 Wave 1 · A.C. / Egg Harbor · parent Ocean (+ independent shore) */
export const atlanticCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'atlantic',
  hubTitle: 'Atlantic County Moving Intelligence Hub',
  eyebrow: 'Atlantic · shore south · vs Ocean County',
  h1: 'Moving in Atlantic County: Atlantic City Towers, Downbeach Streets & Egg Harbor Mainland',
  heroOpener:
    'Atlantic County is southern shore product — Atlantic City high-rise and casino-district freight elevators, Downbeach (Ventnor / Margate / Longport) beach-block geometry, Egg Harbor / Galloway mainland suburbs, and western Hammonton edges. Compared with Ocean’s Toms River / LBI / Lakewood mix, Atlantic runs harder on casino-district COIs, ACE Expressway timing, and tourism-event calendars — not a Toms River rename and not a barrier-island-only script.',
  heroCredibility:
    'Casino district · Downbeach · Mainland suburbs · ACE Expressway · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'Atlantic City Expressway · Garden State Parkway · Route 30 · Route 40 · Route 9',
  parentCompare: {
    parentLabel: 'Ocean County',
    parentHref: '/local-movers/new-jersey/ocean',
    title: 'Compared with Ocean County',
    intro:
      'Atlantic is shore-south with a casino-district vertical core — not Ocean’s Toms River seat, Lakewood density, or LBI causeway product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Ocean crews fight GSP exits, Routes 37/72 island spines, and Lakewood density. Atlantic pairs ride the Atlantic City Expressway, Parkway south, and Routes 30/40/9 — freer mid-day inland, still peak-heavy on ACE event weekends and boardwalk approaches.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Ocean mixes barrier cottages, 55+ communities, and dense inland multi-family. Atlantic adds casino-district high-rises, Downbeach elevated/condo stock, and Egg Harbor/Galloway planned suburbs — more freight-elevator product than Ocean’s LBI cottage ladder.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Ocean island jobs need causeway timing and sand staging. Atlantic City towers need security desks, reserved freight elevators, and COIs; Downbeach needs beach-block shuttles; mainland is HOA/driveway first.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Atlantic quotes can exceed simple Ocean mainland rates when tower elevators, event-day ACE delays, or Downbeach shuttles apply — even when square footage matches.',
      },
      {
        title: 'Role difference',
        detail:
          'Atlantic is casino/tourism + residential dual market with ACE logistics — not Ocean’s Toms River / Lakewood / LBI three-way alone. Match crews to elevators or beach-block access by address.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Atlantic County different',
    intro: 'Towers, beach blocks, and ACE event traffic — not interchangeable shore boilerplate.',
    bullets: [
      {
        title: 'Casino-district freight elevators',
        detail:
          'Atlantic City towers require COIs, reserved elevators, and strict time windows. Share building rules before the estimate finalizes.',
      },
      {
        title: 'Downbeach geometry',
        detail:
          'Ventnor, Margate, and Longport streets often need smaller trucks or shuttles from wider staging streets.',
      },
      {
        title: 'ACE Expressway event peaks',
        detail:
          'Tourism and casino events clog approaches — portal-to-portal time spikes on peak weekends.',
      },
      {
        title: 'Mainland is a different product',
        detail:
          'Egg Harbor Township and Galloway look like classic suburban NJ HOAs — not boardwalk staging.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Atlantic zones: A.C. core, Downbeach, mainland & western edges',
  zonesIntro: 'Tower, beach-block, and mainland jobs are not one rate card.',
  zones: [
    {
      id: 'ac-core',
      name: 'Atlantic City core',
      shortName: 'A.C. core',
      neighborhoods: ['Atlantic City', 'midtown & inlet corridors'],
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
      housingTypes: 'Suburban SFH, townhomes, apartments',
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
      id: 'casino-tower',
      title: 'Casino-district tower module',
      intro: 'High-rise freight elevators dominate A.C. core jobs.',
      bullets: [
        'Reserve elevators as soon as you have a closing date.',
        'Confirm COI names the condo association and management company.',
        'Avoid major casino event weekends when flexible.',
      ],
    },
    {
      id: 'downbeach-shuttle',
      title: 'Downbeach / beach-block module',
      intro: 'Narrow shore streets rewrite truck selection.',
      bullets: [
        'Ask about shuttle fees before finalizing the estimate.',
        'Protect against sand tracking on multi-story elevated homes.',
      ],
    },
    {
      id: 'ace-timing',
      title: 'ACE Expressway timing module',
      intro: 'Tourism peaks turn short mainland–shore pairs into long billable hours.',
      bullets: [
        'Prefer midweek mornings May–September.',
        'Confirm portal-to-portal terms on ACE legs.',
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
              'Egg Harbor Township and Galloway often enter family shortlists for space — still verify current performance reports.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'AtlantiCare Regional Medical Center',
            detail:
              'Primary regional health system for much of the county — confirm ER and specialty access for your household.',
          },
          {
            title: 'Shore distance',
            detail:
              'From Downbeach and barrier-adjacent addresses, map drive times in peak summer traffic for emergencies.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Atlantic County',
    intro: 'Tower elevators and beach-block shuttles drive outliers more than pure distance.',
    drivers: [
      {
        title: 'Elevator / building fees',
        detail: 'Common in Atlantic City towers.',
      },
      {
        title: 'Shuttle for beach blocks',
        detail: 'Budget contingency for Downbeach streets.',
      },
      {
        title: 'Peak tourism labor',
        detail: 'Summer weekends price higher when crews are scarce.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,000+' },
      { label: 'Family home', value: '$1,800–$4,000+' },
      { label: '2-person crew', value: '$110–$165+/hr' },
    ],
  },
  seasonal: {
    title: 'Tourism calendar & storms',
    intro: 'Summer visitors and Atlantic storms reshape access.',
    items: [
      {
        title: 'Memorial Day–Labor Day',
        detail: 'Peak demand; boardwalk-area parking is worst on weekends.',
      },
      {
        title: 'Shoulder seasons',
        detail: 'Often best for condo moves — still confirm event calendars.',
      },
    ],
  },
  resources: {
    title: 'Useful Atlantic County resources',
    items: [
      {
        label: 'Atlantic County',
        href: 'https://www.atlantic-county.org/',
        external: true,
      },
      {
        label: 'NJ DOE school performance reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Ocean County guide (parent shore contrast)',
        href: '/local-movers/new-jersey/ocean',
      },
      {
        label: 'Directory: Atlantic filter',
        href: '/companies?coverage=state&state=NJ&counties=atlantic',
      },
    ],
  },
  directoryHint: 'Prioritize elevator/COI experience for A.C. towers and shuttle experience for Downbeach.',
  lastReviewed: '2026-07-22',
});
