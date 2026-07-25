import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * Rockland County — NY Tier 2 Wave 1
 * Role: NYC north suburb — New City / Nyack / Spring Valley
 * Parent: Westchester (+ NYC borough contrast)
 */
export const rocklandCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'rockland',
  hubTitle: 'Rockland County Moving Intelligence Hub',
  eyebrow: 'Rockland · NYC north suburb · New City / Nyack / Spring Valley',
  h1: 'Moving in Rockland County: New City Suburbs, Nyack River Towns & Bridge Access',
  heroOpener:
    'Rockland County is the west-of-Hudson NYC collar — New City’s suburban seat, Nyack’s river-town grid, Spring Valley and Monsey multi-family density, and Tappan Zee / I-87 / Palisades Parkway portals into Westchester and the city. It is not Westchester with a different nameplate: expect denser multi-family pockets, bridge-clocked freeflow, and village streets that reject full trailers more often than north-county estate driveways. This guide is for people moving in Rockland as its own north-suburb market — not a recycled Westchester hill script or Manhattan co-op packet.',
  heroCredibility:
    'NYC north collar · Bridge / parkway freeflow · Multi-family density · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-87 · Palisades Interstate Parkway · NY-59 · NY-304 · NY-9W · Tappan Zee / Governor Mario M. Cuomo Bridge approaches',
  parentCompare: {
    parentLabel: 'Westchester County',
    parentHref: '/local-movers/new-york/westchester',
    title: 'Compared with Westchester County',
    intro:
      'Rockland is the west-bank NYC north collar — denser multi-family, bridge portals, and village grids — not Westchester’s Sound Shore estates or south-county co-op towers alone.',
    bullets: [
      {
        title: 'Bridge & parkway freeflow vs parkway hills',
        detail:
          'Westchester crews fight Hutchinson, Saw Mill, and I-287 hills. Rockland pairs ride the Cuomo Bridge, Palisades Parkway, I-87, and NY-59 — freer mid-day than south Westchester choke points, still peak-heavy toward the bridge and Spring Valley arterials. Portal-to-portal time is real; it is not a Yonkers elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Westchester mixes south-county elevators, Sound Shore villages, and north-county large lots. Rockland skews New City cul-de-sacs, Nyack multi-story village homes, Spring Valley / Monsey multi-family density, and river-edge walk-ups — more continuous multi-unit product than northern Westchester estates.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Westchester north often means long driveways and grades. Rockland village cores (Nyack, Piermont, Haverstraw) force smaller trucks and temporary no-parking more often; multi-family buildings need COI packets closer to Bronx-style rules without the same tower docks.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Rockland quotes often sit near south-Westchester suburban rates for comparable square footage when access is a driveway — bridge congestion, multi-family elevators, and dense village staging push prices up. Expect collar labor with multi-family friction, not north-Westchester empty-mile premiums alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Rockland is the west-bank NYC bedroom and multi-family growth collar — schools, bridge commutes, and dense suburbs — not Westchester’s dual north–south estate/co-op market. Match crews to multi-family and bridge clocks, not only hill estates.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Rockland County different',
    intro:
      'Bridge clocks, multi-family density, and village geometry — not interchangeable Westchester or Hudson Valley boilerplate.',
    bullets: [
      {
        title: 'Cuomo Bridge & Palisades peaks rewrite local pairs',
        detail:
          'Nyack ↔ New City or Spring Valley ↔ Westchester pairs freer mid-day still burn billable time at commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Multi-family density is first-class product',
        detail:
          'Spring Valley, Monsey, and parts of Nanuet stack elevators, long carries, and building packets uncommon on large-lot north Westchester jobs.',
      },
      {
        title: 'River-town streets reject full trailers',
        detail:
          'Nyack, Piermont, and Haverstraw grids need shuttle conversations and temporary no-parking signs more often than map miles suggest.',
      },
      {
        title: 'NJ adjacency creates interstate legs',
        detail:
          'Bergen and Passaic addresses flip jobs to FMCSA authority even when the Rockland side feels “local.”',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Rockland zones: New City seat, Nyack river towns, Spring Valley density & west ridges',
  zonesIntro:
    'Two to four sharp products — seat suburbs, river villages, multi-family cores, and western ridges price differently under the same north-collar label.',
  zones: [
    {
      id: 'new-city-seat',
      name: 'New City / Clarkstown seat suburbs',
      shortName: 'New City',
      neighborhoods: ['New City', 'Congers', 'Bardonia', 'West Nyack edges'],
      housingTypes: 'Suburban SFH, townhomes, some multi-family',
      challenges: ['Cul-de-sac staging', 'Arterial NY-304 traffic', 'HOA packets'],
      moverTips:
        'Confirm driveway length and HOA hours. Avoid Saturday midday near mall corridors when possible.',
      cityKeywords: ['new city', 'clarkstown', 'congers', 'bardonia', 'west nyack'],
    },
    {
      id: 'nyack-river',
      name: 'Nyack & river-town grids',
      shortName: 'Nyack / river',
      neighborhoods: ['Nyack', 'South Nyack', 'Piermont', 'Grand View'],
      housingTypes: 'Multi-story village homes, walk-ups, some elevators',
      challenges: ['Tight streets', 'Tourism parking', 'Stairs', 'Bridge approaches'],
      moverTips:
        'Plan temporary no-parking; measure street width; book early around weekend events.',
      cityKeywords: ['nyack', 'piermont', 'grand view', 'south nyack'],
    },
    {
      id: 'spring-valley-density',
      name: 'Spring Valley / Monsey multi-family',
      shortName: 'Spring Valley density',
      neighborhoods: ['Spring Valley', 'Monsey', 'Nanuet edges', 'Hillcrest'],
      housingTypes: 'Multi-family, elevators, dense SFH lots',
      challenges: ['Building COIs', 'Elevator windows', 'Street parking pressure'],
      moverTips:
        'Collect management packets before the survey is final. Inventory elevators and long carries.',
      cityKeywords: ['spring valley', 'monsey', 'nanuet', 'hillcrest'],
    },
    {
      id: 'west-ridge',
      name: 'Western ridges & larger lots',
      shortName: 'West Rockland',
      neighborhoods: ['Suffern', 'Airmont', 'Montebello', 'Pomona', 'Stony Point edge'],
      housingTypes: 'Larger lots, hills, wooded approaches',
      challenges: ['Grades', 'Long driveways', 'Winter ice'],
      moverTips:
        'Photo approaches; soft ground after rain can block heavy trucks; winter mornings need flexibility.',
      cityKeywords: ['suffern', 'airmont', 'montebello', 'pomona', 'stony point'],
    },
  ],
  specialized: [
    {
      id: 'bridge-parkway',
      title: 'Bridge & parkway freeflow module',
      intro:
        'Rockland’s defining logistics are Cuomo Bridge, Palisades Parkway, and I-87 clocks — not Sound Shore estates.',
      bullets: [
        'Price portal-to-portal time honestly for Rockland ↔ Westchester and Rockland ↔ Bergen pairs.',
        'Build buffer for bridge and parkway peaks — freer mid-day still fails at commute.',
        'Clarify whether either address is in New Jersey so authority assumptions stay accurate.',
        'Ask whether short-looking NY-59 pairs still use a pure local rate card at rush hour.',
      ],
    },
    {
      id: 'multifamily-density',
      title: 'Multi-family & elevator density',
      intro:
        'Spring Valley / Monsey multi-unit product is first-class Rockland inventory — not an edge case.',
      bullets: [
        'Send building COI templates and elevator hours with the estimate.',
        'Inventory long carries and stair flights before comparing hourly rates.',
        'Confirm reserved elevator windows before booking Saturday crews.',
      ],
    },
    {
      id: 'river-village-access',
      title: 'River-village last-mile',
      intro: 'Nyack–Piermont streets punish oversized trailers.',
      bullets: [
        'Discuss shuttle or smaller trucks for village cores.',
        'Temporary no-parking signs often beat long carries.',
        'Protect floors and railings on multi-story village homes.',
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
          'Rockland families often compare Clarkstown, East Ramapo, North Rockapo, Nyack, and other districts — boundaries are address-specific.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a hamlet name equals one feeder pattern.',
          },
          {
            title: 'Growth & capacity',
            detail:
              'Dense multi-family pockets can pressure enrollment differently than New City SFH belts. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Montefiore Nyack & Good Samaritan corridors',
            detail:
              'Major acute-care anchors for much of Rockland; map ER drive times at peak parkway congestion.',
          },
          {
            title: 'Downstate specialty spillover',
            detail:
              'Some specialties still pull toward Westchester or NYC systems — confirm insurer networks and bridge times.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers inside Rockland County',
    intro:
      'Bridge freeflow, multi-family elevators, and village staging often matter more than raw miles.',
    drivers: [
      {
        title: 'Bridge & parkway portal-to-portal',
        detail: 'Cuomo Bridge / Palisades / I-87 peaks inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'Multi-family COI & elevators',
        detail: 'Building packets and reserved elevators add soft costs uncommon on large-lot jobs.',
      },
      {
        title: 'Village shuttle risk',
        detail: 'Nyack-area grids can force smaller trucks and extra labor hours.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$550–$1,250+' },
      {
        label: '3–4 BR home / multi-family',
        value: '$2,000–$4,500+',
        note: 'Higher with elevators / bridge windows',
      },
      { label: '2-person crew', value: '$130–$190+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, multi-family lease ends, and bridge peaks dominate more than tourism alone.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings fill Saturday crews first; book dense multi-family elevators early.',
      },
      {
        title: 'Winter grades & ice',
        detail: 'Western ridges and river hills need morning flexibility after freeze events.',
      },
    ],
  },
  resources: {
    title: 'Useful Rockland County resources',
    intro:
      'Official links first; directory listings are independent. Verify NYSDOT household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Rockland County government',
        href: 'https://www.rocklandcountyny.gov/',
        external: true,
      },
      {
        label: 'Westchester County movers (parent contrast)',
        href: '/local-movers/new-york/westchester',
      },
    ],
  },
});
