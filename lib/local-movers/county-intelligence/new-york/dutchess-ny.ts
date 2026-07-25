import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * dutchess — NY Tier 2 Wave 1
 */
export const dutchessCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'dutchess',
  hubTitle: 'Dutchess County Moving Intelligence Hub',
  eyebrow: 'Dutchess · Mid Hudson · Poughkeepsie / Beacon',
  h1: 'Moving in Dutchess County: Poughkeepsie, Beacon & Mid-Hudson Rail-Commute Access',
  heroOpener:
    'Dutchess County is Mid Hudson rail-commute country — Poughkeepsie city multi-story stock, Beacon walkable density, Arlington and Hyde Park corridors, eastern larger lots toward Amenia, and Metro-North clocks that matter as much as I-84 freeflow. It is not Orange Thruway retail corridors and not Westchester south-county elevators: expect mixed city stairs, village grids, and longer east-county empty miles. This guide is for people moving in Dutchess as a Mid Hudson market with its own role — not a recycled Orange or Westchester pack.',
  heroCredibility:
    'Mid Hudson · Metro-North clocks · Mixed density · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-84 · US-9 · NY-9D · NY-55 · NY-44 · Metro-North Hudson Line',
  parentCompare: {
    parentLabel: 'Orange County',
    parentHref: '/local-movers/new-york/orange',
    title: 'Compared with Orange County',
    intro:
      'Dutchess is Mid Hudson rail-commute product with Poughkeepsie/Beacon density and eastern lots — not Orange I-87 retail freeflow and not Westchester NYC-adjacent co-ops alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Orange crews fight Thruway and I-84 outer-collar peaks. Dutchess pairs ride US-9, NY-9D, I-84, and Metro-North-oriented freeflow — freer mid-day than dense downstate cores, still peak-heavy on Poughkeepsie arterials and Beacon weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Orange mixes Newburgh city stock and Woodbury growth. Dutchess mixes Poughkeepsie multi-story, Beacon village homes, and eastern large lots — more rail-village product, less outlet-corridor suburban density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Beacon and Poughkeepsie cores need curb plans and stair inventories; east-county lots trade that for driveway length and soft shoulders rare on Orange retail suburbs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Dutchess quotes often track secondary Hudson Valley rates for driveway SFH — city stairs, tourism weekends, and long empty-mile east pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Dutchess is Mid Hudson rail-commute and mixed-density product — not Orange outer Thruway collar and not Westchester dual north–south estate/co-op market.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Dutchess County different',
    intro: 'Rail-commute clocks, city stairs, and eastern last-mile — not interchangeable Orange boilerplate.',
    bullets: [
      {
        title: 'Metro-North living changes crew windows',
        detail:
          'Beacon and Poughkeepsie station-area parking pressure can collide with truck staging — plan early arrivals.',
      },
      {
        title: 'Poughkeepsie multi-story is first-class product',
        detail:
          'City stairs and street parking need inventories different from eastern ranch lots.',
      },
      {
        title: 'US-9 / I-84 freeflow is still a line item',
        detail:
          'Short-looking locals burn billable time at peak. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'CT adjacency creates interstate legs',
        detail:
          'Connecticut addresses flip jobs to FMCSA even when the Dutchess side feels local.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Dutchess zones: Poughkeepsie core, Beacon corridor, eastern lots & north US-9',
  zonesIntro: 'Two to four sharp products — city, river village, eastern lots, and north corridor price differently.',
  zones: [
    {
      id: 'poughkeepsie-core',
      name: 'Poughkeepsie city & Arlington',
      shortName: 'Poughkeepsie',
      neighborhoods: ["Poughkeepsie","Arlington","Fairview edges"],
      housingTypes: 'Multi-story, multi-unit, some elevators',
      challenges: ["Stairs","Street parking","US-9 traffic"],
      moverTips: 'Inventory floor counts; plan temporary no-parking.',
      cityKeywords: ["poughkeepsie","arlington"],
    },
    {
      id: 'beacon-waterfront',
      name: 'Beacon & south river corridor',
      shortName: 'Beacon',
      neighborhoods: ["Beacon","Fishkill edges","Wappingers Falls edges"],
      housingTypes: 'Village multi-story, SFH, walk-ups',
      challenges: ["Tight streets","Tourism weekends","Metro-North staging"],
      moverTips: 'Avoid peak event weekends; measure street width.',
      cityKeywords: ["beacon","fishkill","wappingers"],
    },
    {
      id: 'east-county',
      name: 'Eastern larger lots',
      shortName: 'East Dutchess',
      neighborhoods: ["Amenia","Millbrook","Dover","Pawling edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long driveways","Soft ground","Winter grades"],
      moverTips: 'Photo approaches; soft shoulders after rain block heavy trucks.',
      cityKeywords: ["amenia","millbrook","dover","pawling"],
    },
    {
      id: 'north-corridor',
      name: 'Hyde Park / Rhinebeck corridor',
      shortName: 'North US-9',
      neighborhoods: ["Hyde Park","Rhinebeck","Red Hook edges"],
      housingTypes: 'SFH, some multi-story older stock',
      challenges: ["Tourism peaks","US-9 freeflow"],
      moverTips: 'Build buffer for tourism weekends near historic corridors.',
      cityKeywords: ["hyde park","rhinebeck","red hook"],
    }
  ],
  specialized: [
    {
      id: 'metro-north',
      title: 'Metro-North rail-commute timing',
      intro: 'Many households orient to Hudson Line clocks, not only Thruway freeflow.',
      bullets: ["Align crew arrivals with peak train parking pressure in Beacon/Poughkeepsie.","Portal-to-portal time still matters for I-84 pairs toward Orange."],
    },
    {
      id: 'city-stairs',
      title: 'Poughkeepsie multi-story access',
      intro: 'City inventory needs stair surveys more than cul-de-sac playbooks.',
      bullets: ["Inventory floor counts and long carries early.","Temporary no-parking often required."],
    },
    {
      id: 'east-last-mile',
      title: 'Eastern last-mile & rural approaches',
      intro: 'Amenia–Millbrook lots punish assumptions from city rates.',
      bullets: ["Photo driveways and soft shoulders.","Winter ice needs morning flexibility."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Dutchess families compare Poughkeepsie City, Arlington, Beacon, and eastern districts — verify every address.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and college towns can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Vassar Brothers, MidHudson Regional, and related campuses anchor acute care; map peak US-9 / I-84 times.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'City stairs, tourism weekends, and eastern empty miles often matter more than raw miles.',
    drivers: [
      {
        title: 'Corridor freeflow',
        detail: 'Peak windows inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'Access soft costs',
        detail: 'Building packets, stairs, or last-mile shuttles add labor hours.',
      },
      {
        title: 'Long empty-mile edges',
        detail: 'Far pockets price differently from seat suburbs.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$500–$1,200+' },
      {
        label: '3–4 BR home',
        value: '$1,800–$4,200+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$120–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, rail-commute calendars, and tourism peaks reshape demand by pocket.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, lake edges, and rural approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify NYSDOT household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Orange County movers (parent contrast)',
        href: '/local-movers/new-york/orange',
      },
      {
        label: 'Westchester County movers',
        href: '/local-movers/new-york/westchester',
      },
    ],
  },
});
