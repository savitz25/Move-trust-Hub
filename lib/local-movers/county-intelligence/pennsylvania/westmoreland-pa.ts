import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * westmoreland — PA Tier 2 Wave 1
 */
export const westmorelandCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'westmoreland',
  hubTitle: 'Westmoreland County Moving Intelligence Hub',
  eyebrow: 'Westmoreland · Greensburg / Hempfield — Pittsburgh east',
  h1: 'Moving in Westmoreland County: Greensburg, Hempfield & East-Metro Turnpike Access',
  heroOpener:
    'Westmoreland County is Pittsburgh’s eastern metro collar — Greensburg multi-unit and seat stock, Hempfield and Murrysville suburban belts, Latrobe and Jeannette small-city edges, and Turnpike / US-30 freeflow that still peaks toward Allegheny. It is not Pittsburgh neighborhood micro-markets renamed: expect longer empty miles from city yards, east-metro HOA product, and town cores that stage differently from South Hills stairs or North Hills elevators. This guide is for people moving in Westmoreland as Pittsburgh east collar — not a recycled Allegheny Tier 1 pack.',
  heroCredibility:
    'Pittsburgh east metro · Greensburg / Hempfield · Turnpike / US-30 · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-76 Turnpike · US-30 · PA-66 · I-70 links · PA-119 · US-22 edges',
  parentCompare: {
    parentLabel: 'Allegheny County',
    parentHref: '/local-movers/pennsylvania/allegheny',
    title: 'Compared with Allegheny County',
    intro:
      'Westmoreland is Pittsburgh east-metro product on Turnpike / US-30 — not Allegheny city hills/stairs or South Hills density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Allegheny crews fight city one-ways, tunnels, and dense South/North Hills peaks. Westmoreland pairs ride the Turnpike, US-30, and PA-66 — freer mid-day east of the city, still peak-heavy toward Allegheny portals and Greensburg arterials. Empty miles from Pittsburgh yards are first-class.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Allegheny mixes elevators, hillside stairs, and dense multi-family. Westmoreland mixes Greensburg multi-unit, Hempfield HOA SFH, and eastern small-city stock — more empty-mile suburbs, less continuous city-stair product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-unit needs curb plans; rural-edge lots trade that for driveway length and soft shoulders rare on inner Allegheny jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Westmoreland quotes often sit near or slightly below dense Allegheny urban rates for driveway SFH — empty miles from city yards and multi-unit access still erase “cheap eastern suburb” assumptions.',
      },
      {
        title: 'Role difference',
        detail:
          'Westmoreland is Pittsburgh east-metro collar — not Allegheny city/neighborhood product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Westmoreland County different',
    intro: 'East-metro empty miles, Turnpike freeflow, and town multi-unit — not interchangeable Pittsburgh boilerplate.',
    bullets: [
      {
        title: 'Longer empty miles from Pittsburgh yards are real',
        detail:
          'Even “local” Westmoreland pairs can price as distance work for city-based crews. Ask portal-to-portal.',
      },
      {
        title: 'Turnpike / US-30 freeflow is still billable',
        detail:
          'East-metro pairs freer mid-day still peak hard toward Allegheny. Build corridor buffers.',
      },
      {
        title: 'Greensburg multi-unit differs from Hempfield HOA',
        detail:
          'Seat stairs and curb plans need inventories different from cul-de-sac SFH.',
      },
      {
        title: 'Eastern small cities and rural edges add last-mile risk',
        detail:
          'Latrobe, Jeannette, and far townships reject full-trailer assumptions from Murrysville driveways.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Westmoreland zones: Greensburg seat, Hempfield/Murrysville west, eastern small cities & rural edges',
  zonesIntro: 'Two to four sharp products — seat multi-unit, west suburbs, eastern towns, and rural edges price differently.',
  zones: [
    {
      id: 'greensburg-seat',
      name: 'Greensburg multi-unit & older stock',
      shortName: 'Greensburg',
      neighborhoods: ["Greensburg","downtown","seat multi-family"],
      housingTypes: 'Multi-unit, multi-story, older SFH',
      challenges: ["Stairs","Street parking","Mixed curb access"],
      moverTips: 'Inventory stairs; plan temporary no-parking; prefer mid-week mornings.',
      cityKeywords: ["greensburg"],
    },
    {
      id: 'hempfield-west',
      name: 'Hempfield / Murrysville west belt',
      shortName: 'Hempfield west',
      neighborhoods: ["Hempfield","Murrysville","Export edges","Delmont edges"],
      housingTypes: 'HOA SFH, townhomes, some multi-family',
      challenges: ["HOA packets","Turnpike / US-30 peaks","Long portal time to city"],
      moverTips: 'Collect HOA docs; build Turnpike buffer for Allegheny pairs.',
      cityKeywords: ["hempfield","murrysville","export","delmont"],
    },
    {
      id: 'east-small-cities',
      name: 'Latrobe / Jeannette / eastern small cities',
      shortName: 'East small cities',
      neighborhoods: ["Latrobe","Jeannette","New Kensington edges","Monessen edges"],
      housingTypes: 'Multi-unit, twins, older SFH',
      challenges: ["Mixed access","Arterial timing","Empty miles"],
      moverTips: 'Survey driveway and street width; prefer early starts for long pairs.',
      cityKeywords: ["latrobe","jeannette","new kensington","monessen"],
    },
    {
      id: 'rural-edges',
      name: 'Southern & eastern rural edges',
      shortName: 'Rural Westmoreland',
      neighborhoods: ["Donegal edges","Ligonier edges","rural townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long empty miles","Soft shoulders","Winter grades"],
      moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["donegal","ligonier","rural westmoreland"],
    }
  ],
  specialized: [
    {
      id: 'east-metro-empty-miles',
      title: 'East-metro empty miles module',
      intro: 'Pittsburgh-yard crews often price Westmoreland as distance work.',
      bullets: ["Ask whether quotes are portal-to-portal from Allegheny staging.","Clarify second-address city vs east-county freeflow assumptions."],
    },
    {
      id: 'turnpike-us30',
      title: 'Turnpike / US-30 freeflow',
      intro: 'East-metro pairs still peak hard toward Allegheny.',
      bullets: ["Build corridor buffers for morning and evening peaks.","US-30 retail corridors punish Saturday midday crews."],
    },
    {
      id: 'seat-multiunit',
      title: 'Greensburg seat multi-unit access',
      intro: 'Seat stairs and curb plans are first-class cost drivers.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
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
        intro: 'Westmoreland families compare Greensburg Salem, Hempfield, Franklin Regional, Norwin, and other districts — verify address boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use PDE data and district maps; do not assume a borough name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university towns can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Excela Health (Westmoreland / Latrobe) and Allegheny specialty spillover serve the county; map peak Turnpike / US-30 times for ER access.',
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
    intro: 'Empty miles from Pittsburgh yards, Turnpike freeflow, and multi-unit access often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter grades reshape demand by pocket.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, rural edges, and mountain approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Pennsylvania PUC household-goods authority for in-state Pennsylvania moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Allegheny County movers (parent contrast)',
        href: '/local-movers/pennsylvania/allegheny',
      },
      
    ],
  },
});
