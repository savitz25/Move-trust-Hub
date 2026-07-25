import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * rensselaer — NY Tier 2 Wave 1
 */
export const rensselaerCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'rensselaer',
  hubTitle: 'Rensselaer County Moving Intelligence Hub',
  eyebrow: 'Rensselaer · Troy · Capital Region east',
  h1: 'Moving in Rensselaer County: Troy City Stock, East Greenbush & I-90 East Collar',
  heroOpener:
    'Rensselaer County is Capital Region east — Troy multi-story and brownstone-adjacent stock, East Greenbush suburban corridors, Rensselaer city river edges, and I-90 freeflow toward Albany and points east. It is not Albany County west-of-river government core renamed: expect east-bank city stairs, university-adjacent turnover, and suburban belts that stage differently from Colonie defaults. This guide is for people moving in Rensselaer as capital-metro east collar — not a recycled Albany Tier 1 script.',
  heroCredibility:
    'Capital Region east · Troy multi-story · I-90 freeflow · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-90 · I-787 · US-4 · US-9 · NY-7 · NY-43',
  parentCompare: {
    parentLabel: 'Albany County',
    parentHref: '/local-movers/new-york/albany',
    title: 'Compared with Albany County',
    intro:
      'Rensselaer is capital-metro east collar with Troy multi-story density — not Albany Plaza core alone and not pure suburban west-of-river product.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Albany crews fight downtown one-ways. Rensselaer pairs ride I-90, I-787, US-4, and NY-7 — freer mid-day east of the river, still peak-heavy on capital-oriented hops and Troy arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Albany mixes brownstones and first-ring suburbs. Rensselaer mixes Troy multi-story, East Greenbush SFH, and eastern larger lots — more east-bank city stairs under one county label.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Troy grids need curb plans and stair inventories; East Greenbush lots trade that for driveway staging uncommon in downtown multi-unit jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Rensselaer quotes often track capital-suburb rates — Troy multi-story soft costs can exceed simple suburban driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Rensselaer is capital east collar — not Albany government/education core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Rensselaer County different',
    intro: 'East-bank city stairs, I-90 freeflow, and suburban contrast — not interchangeable Albany boilerplate.',
    bullets: [
      {
        title: 'Troy multi-story is first-class product',
        detail:
          'Stairs and street parking define more jobs than pure suburban playbooks.',
      },
      {
        title: 'University-adjacent turnover is real',
        detail:
          'RPI-area calendars create lease clusters that do not map to pure family Saturdays.',
      },
      {
        title: 'I-90 freeflow is still billable',
        detail:
          'East Greenbush ↔ Albany pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Eastern larger lots add empty miles',
        detail:
          'Farther east pockets price differently from Troy city rates.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Rensselaer zones: Troy core, East Greenbush belt, Rensselaer city edges & east lots',
  zonesIntro: 'Two to four sharp products — city, suburbs, river edges, and east lots.',
  zones: [
    {
      id: 'troy-core',
      name: 'Troy city core',
      shortName: 'Troy',
      neighborhoods: ["Troy","downtown","university edges"],
      housingTypes: 'Multi-story, multi-unit, some elevators',
      challenges: ["Stairs","Street parking","Student calendars"],
      moverTips: 'Inventory stairs; plan temporary no-parking; avoid peak move-out weekends.',
      cityKeywords: ["troy"],
    },
    {
      id: 'east-greenbush',
      name: 'East Greenbush suburban belt',
      shortName: 'East Greenbush',
      neighborhoods: ["East Greenbush","Wynantskill edges","Defreestville"],
      housingTypes: 'Suburban SFH, townhomes',
      challenges: ["HOA packets","I-90 peaks"],
      moverTips: 'Collect HOA docs; build I-90 commute buffers.',
      cityKeywords: ["east greenbush","wynantskill"],
    },
    {
      id: 'rensselaer-city',
      name: 'Rensselaer city river edges',
      shortName: 'Rensselaer city',
      neighborhoods: ["Rensselaer","river edges"],
      housingTypes: 'Multi-story, SFH, multi-unit',
      challenges: ["Tight streets","Stairs"],
      moverTips: 'Measure streets; inventory carries.',
      cityKeywords: ["rensselaer"],
    },
    {
      id: 'east-lots',
      name: 'Eastern larger lots',
      shortName: 'East county',
      neighborhoods: ["Brunswick","Schodack","Nassau edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["brunswick","schodack","nassau"],
    }
  ],
  specialized: [
    {
      id: 'troy-stairs',
      title: 'Troy multi-story access',
      intro: 'City stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i90-east-collar',
      title: 'I-90 east-collar freeflow',
      intro: 'Capital-oriented pairs still peak hard.',
      bullets: ["Price portal-to-portal time honestly for East Greenbush ↔ Albany legs.","Clarify Albany County second addresses for drive-time assumptions."],
    },
    {
      id: 'university-turnover',
      title: 'University-adjacent turnover',
      intro: 'RPI-area calendars create lease clusters.',
      bullets: ["Book early around term start/end weekends.","Expect short-notice local demand spikes."],
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
        intro: 'Rensselaer families compare Troy City, East Greenbush, Averill Park, and other districts — verify boundaries.',
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
            detail: 'St. Peter’s / Samaritan and Capital Region specialty spillover serve the county; map peak freeflow for ER access.',
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
    intro: 'City stairs, university calendars, and I-90 freeflow often matter more than raw miles.',
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
    intro: 'School years, term calendars, and winter ice reshape demand by pocket.',
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
        label: 'Albany County movers (parent contrast)',
        href: '/local-movers/new-york/albany',
      },
      
    ],
  },
});
