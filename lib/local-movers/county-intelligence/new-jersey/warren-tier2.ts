import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNjTier2Pack,
  NJ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-jersey/nj-tier2-shared';

/** Warren — NJ Tier 2 Wave 1 · Phillipsburg / I-78 western edge · parent Hunterdon/Morris */
export const warrenCountyTier2Intelligence: CountyIntelligencePack = finalizeNjTier2Pack({
  countySlug: 'warren',
  hubTitle: 'Warren County Moving Intelligence Hub',
  eyebrow: 'Warren · I-78 western edge · vs Hunterdon / Morris',
  h1: 'Moving in Warren County: Phillipsburg, I-78 Western Edge & PA Border Logistics',
  heroOpener:
    'Warren faces the Delaware at Phillipsburg, keeps small downtowns like Belvidere and Washington, and spreads into ridge-and-farm townships on the I-78 western edge. Compared with Hunterdon’s Flemington/Clinton village product or Morris’s denser corporate suburbs, Warren jobs skew PA-border adjacency, longer empty miles, river-town stairs, and rural last-mile access. This guide is for people moving in Warren as small-town + rural-edge product — not a Morris rename and not a high-rise script.',
  heroCredibility:
    'PA border · I-78 logistics · Small-town + rural-edge · NJ public mover rules · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-78 · I-80 · Route 22 · Route 31 · Route 46 · Route 57',
  parentCompare: {
    parentLabel: 'Hunterdon County (and denser Morris)',
    parentHref: '/local-movers/new-jersey/hunterdon',
    title: 'Compared with Hunterdon County',
    intro:
      'Warren is the I-78 western edge with a hard PA border at Phillipsburg — not Flemington/Clinton village product alone, and not Morristown/Parsippany density.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Hunterdon pairs ride I-78 and Routes 202/31 with village access. Warren pairs add I-80, Routes 22/46/57, and Delaware River bridge timing into Easton/Lehigh Valley — freer mid-day than Morris cores, still peak-heavy on I-78 and bridge approaches.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Hunterdon mixes villages and larger lots. Warren adds Phillipsburg multi-story river-town stock, small borough centers, and thinner rural coverage — more border-adjacent multi-story stairs, similar long-driveway risk, less continuous upscale HOA product than Morris.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Hunterdon defaults to driveway photos and historic stairs. Warren adds NJ↔PA licensing for river pairs, bridge congestion at shift changes, and travel minimums when crews stage outside the county.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Warren quotes can match denser-county rates for comparable square footage when travel minimums and interstate upgrades apply — access and coverage matter more than prestige ZIP.',
      },
      {
        title: 'Role difference',
        detail:
          'Warren is PA-border small-town + rural-edge living on I-78 — not Hunterdon’s western-suburb brand alone and not Morris corporate product. Match crews to border licensing and last-mile access.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Warren County different',
    intro: 'PA border adjacency and thin local coverage rewrite the rate card.',
    bullets: [
      {
        title: 'Phillipsburg river-town density',
        detail:
          'Older streets and multi-story homes near the river mean stairs and limited staging — different from township lane moves 20 minutes away.',
      },
      {
        title: 'Cross-border PA jobs & moves',
        detail:
          'If either address is in Pennsylvania, the job is interstate and needs FMCSA authority — pure NJ public-mover assumptions fail.',
      },
      {
        title: 'Rural deadhead',
        detail:
          'Crews may travel from denser NJ bases; travel minimums should be transparent in the estimate.',
      },
      {
        title: 'I-78 / I-80 freeflow is still billable',
        detail:
          'Western edge pairs freer than Morristown peaks still burn portal-to-portal time at shift changes and weather delays.',
      },
      NJ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Warren zones: Phillipsburg river town, Washington/east, Belvidere & ridge rural',
  zonesIntro: 'River towns and ridge farms should not share one generic access assumption.',
  zones: [
    {
      id: 'phillipsburg',
      name: 'Phillipsburg river town',
      shortName: 'Phillipsburg',
      neighborhoods: ['Phillipsburg', 'river-adjacent streets'],
      housingTypes: 'Older multi-story, some multifamily, tight lots',
      challenges: ['Stairs', 'Street width', 'Bridge traffic'],
      moverTips: 'Confirm which bridge approaches the crew will use at rush hour.',
      cityKeywords: ['phillipsburg'],
    },
    {
      id: 'washington-east',
      name: 'Washington Borough & eastern approaches',
      shortName: 'Washington / east',
      neighborhoods: ['Washington', 'Hackettstown edge', 'eastern township corridors'],
      housingTypes: 'Small-town homes, suburban infill',
      challenges: ['Downtown parking', 'Mixed road quality'],
      moverTips: 'Use wider side streets for staging when main street is tight.',
      cityKeywords: ['washington', 'hackettstown'],
    },
    {
      id: 'belvidere-central',
      name: 'Belvidere & central county',
      shortName: 'Belvidere',
      neighborhoods: ['Belvidere', 'central rural roads'],
      housingTypes: 'County-seat homes, surrounding rural parcels',
      challenges: ['Service travel time', 'Older interiors'],
      moverTips: 'Combine errands — fewer specialty stores than metro counties.',
      cityKeywords: ['belvidere'],
    },
    {
      id: 'ridge-rural',
      name: 'Ridge & rural west/north',
      shortName: 'Ridge rural',
      neighborhoods: ['Rural townships', 'ridge roads', 'farm edges'],
      housingTypes: 'Farms, long-lot homes, outbuildings',
      challenges: ['Access geometry', 'Soft ground', 'Low wires'],
      moverTips: 'Gate codes + driveway video save failed arrivals.',
      cityKeywords: ['blairstown', 'knowlton', 'hardwick'],
    },
  ],
  specialized: [
    {
      id: 'cross-border-pa',
      title: 'Delaware River / PA cross-border module',
      intro: 'Phillipsburg–Easton life patterns often cross state lines.',
      bullets: [
        'Require USDOT/MC on any estimate that touches PA.',
        'Bridge congestion at shift changes can erase “short hop” assumptions.',
        'Ask about travel fees when crews stage outside Warren.',
      ],
    },
    {
      id: 'rural-access',
      title: 'Rural access module',
      intro: 'Country parcels need a site plan, not just square footage.',
      bullets: [
        'Mark septic and well covers.',
        'Have a weather backup for unpaved drives.',
      ],
    },
    {
      id: 'i78-edge',
      title: 'I-78 western-edge freeflow module',
      intro: 'Western edge freeflow is freer than dense North Jersey — still a line item.',
      bullets: [
        'Prefer midweek mornings for long rural daylight access.',
        'Confirm portal-to-portal terms on I-78 / I-80 pairs.',
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
          'Warren education is organized through local and regional districts serving Phillipsburg, Washington, Blairstown-area communities, and other municipalities.',
        bullets: [
          {
            title: 'Confirm boundaries',
            detail:
              'Regional high school arrangements are common — verify both elementary and secondary placements via NJ DOE and district sites.',
          },
          {
            title: 'Program breadth',
            detail:
              'Smaller systems may offer different AP/arts/athletics mixes than large suburban districts; visit and ask.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Phillipsburg–Easton corridor systems',
            detail:
              'Residents often use hospital systems serving the river corridor; confirm which campuses are in-network.',
          },
          {
            title: 'Rural EMS reality',
            detail:
              'Response and transfer times can be longer than dense North Jersey — discuss special medical needs before moving.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Warren County',
    intro: 'Expect access and travel to influence price more than prestige ZIP premiums.',
    drivers: [
      {
        title: 'Travel minimums',
        detail: 'Common when crews stage from outside the county.',
      },
      {
        title: 'Interstate upgrade',
        detail: 'Any PA address changes licensing and often rate structure.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$900+' },
      { label: 'Family / rural home', value: '$1,600–$3,400+' },
      { label: '2-person crew', value: '$100–$155+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'River weather and rural mud seasons matter.',
    items: [
      {
        title: 'Winter',
        detail: 'Icy grades and bridge wind — flexible mornings help.',
      },
      {
        title: 'Spring thaw',
        detail: 'Soft shoulders can trap heavy trucks.',
      },
    ],
  },
  resources: {
    title: 'Useful Warren County resources',
    items: [
      {
        label: 'Warren County',
        href: 'https://www.warrencountynj.gov/',
        external: true,
      },
      {
        label: 'NJ DOE school performance reports',
        href: 'https://rc.doe.state.nj.us/',
        external: true,
      },
      {
        label: 'Hunterdon County guide (parent contrast)',
        href: '/local-movers/new-jersey/hunterdon',
      },
      {
        label: 'Directory: Warren filter',
        href: '/companies?coverage=state&state=NJ&counties=warren',
      },
    ],
  },
  directoryHint: 'State whether any address is in Pennsylvania when requesting quotes.',
  lastReviewed: '2026-07-22',
});
