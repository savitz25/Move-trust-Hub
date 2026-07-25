import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * washington — PA Tier 2 Wave 1
 */
export const washingtonCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'washington',
  hubTitle: 'Washington County Moving Intelligence Hub',
  eyebrow: 'Washington · South Hills edge — Pittsburgh south',
  h1: 'Moving in Washington County: Washington City, South Hills Edge & I-70/I-79 South Collar',
  heroOpener:
    'Washington County is Pittsburgh’s southern collar and South Hills edge — Washington city multi-story stock, Peters and Canonsburg growth belts, McMurray HOA density, and I-70 / I-79 freeflow that still peaks toward Allegheny. It is not South Hills stairs with freer freeways alone: expect south-collar empty miles, mixed small-city product, and WV-adjacent interstate risk under one county label. This guide is for people moving in Washington as Pittsburgh south collar — not a recycled Allegheny pack.',
  heroCredibility:
    'Pittsburgh south collar · South Hills edge · I-70 / I-79 · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-70 · I-79 · US-19 · US-40 · PA-18 · PA-50',
  parentCompare: {
    parentLabel: 'Allegheny County',
    parentHref: '/local-movers/pennsylvania/allegheny',
    title: 'Compared with Allegheny County',
    intro:
      'Washington is Pittsburgh south collar on I-70 / I-79 — not Allegheny dense South Hills stairs alone and not pure rural southwest freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Allegheny crews fight city peaks and South Hills choke points. Washington pairs ride I-79, I-70, and US-19 — freer mid-day south of the city, still peak-heavy toward Allegheny portals and Peters/Canonsburg corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Allegheny South Hills mixes stairs and dense multi-family. Washington mixes Peters HOA growth, Washington city multi-story, and western larger lots — more south-collar empty miles, less continuous city-hill product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Growth-belt HOAs need packets; city cores need curb plans; WV-border edges add last-mile freeflow uncommon on inner South Hills jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Washington quotes often sit near south-metro suburb rates for driveway SFH — empty miles and multi-story access still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Washington is Pittsburgh south collar — not Allegheny South Hills product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Washington County different',
    intro: 'I-70 / I-79 freeflow, south-collar growth, and city multi-story — not interchangeable Allegheny boilerplate.',
    bullets: [
      {
        title: 'I-79 / I-70 freeflow is still billable',
        detail:
          'South-collar ↔ Allegheny pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Peters / Canonsburg HOA growth is first-class product',
        detail:
          'Planned suburbs treat COI and approved hours as standard survey inputs.',
      },
      {
        title: 'Washington city multi-story needs stair inventories',
        detail:
          'Seat density fails when crews assume pure driveway SFH rates.',
      },
      {
        title: 'WV adjacency creates interstate legs',
        detail:
          'West Virginia addresses require FMCSA authority even on short-looking hops.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Washington zones: city seat, Peters/Canonsburg growth, US-19 corridor & western edges',
  zonesIntro: 'Two to four sharp products — seat multi-story, growth HOAs, corridor stock, and western edges.',
  zones: [
    {
      id: 'washington-city',
      name: 'Washington city multi-story & older stock',
      shortName: 'Washington city',
      neighborhoods: ["Washington","downtown","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Mixed curb access"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["washington pa","washington"],
    },
    {
      id: 'peters-canonsburg',
      name: 'Peters / Canonsburg growth belt',
      shortName: 'Peters growth',
      neighborhoods: ["Peters Township","Canonsburg","McMurray","McDonald edges"],
      housingTypes: 'HOA SFH, townhomes, apartments',
      challenges: ["HOA packets","I-79 peaks","Lease clusters"],
      moverTips: 'Collect HOA COIs; build I-79 commute buffers.',
      cityKeywords: ["peters","canonsburg","mcmurray"],
    },
    {
      id: 'us19-corridor',
      name: 'US-19 / south corridor towns',
      shortName: 'US-19 corridor',
      neighborhoods: ["Houston","Cecil edges","South Strabane edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Arterial timing","Mixed access"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["houston","cecil","south strabane"],
    },
    {
      id: 'west-edges',
      name: 'Western & border edges',
      shortName: 'West edges',
      neighborhoods: ["Charleroi edges","Monongahela edges","WV approaches"],
      housingTypes: 'Older SFH, multi-unit, rural approaches',
      challenges: ["Empty miles","Interstate authority risk","Soft shoulders"],
      moverTips: 'Clarify WV second addresses; photo approaches.',
      cityKeywords: ["charleroi","monongahela","rural washington"],
    }
  ],
  specialized: [
    {
      id: 'i70-i79-south',
      title: 'I-70 / I-79 south-collar freeflow',
      intro: 'South-metro pairs still peak hard toward Allegheny.',
      bullets: ["Price portal-to-portal time honestly for Washington ↔ Allegheny legs.","Clarify WV second addresses for interstate authority."],
    },
    {
      id: 'south-hills-edge-growth',
      title: 'South Hills edge HOA growth',
      intro: 'Peters–Canonsburg planned density is the south-collar product.',
      bullets: ["Collect HOA packets before the estimate is final.","Saturday HOA windows push demand into peak crew slots."],
    },
    {
      id: 'city-stairs',
      title: 'Washington city multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
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
        intro: 'Washington families compare Peters Township, Canon-McMillan, Trinity, Chartiers-Houston, and other districts — verify boundaries.',
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
            detail: 'Washington Health System and Allegheny specialty spillover serve the county; map peak I-79 times for ER access.',
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
    intro: 'I-79 freeflow, HOA soft costs, and city multi-story access often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter ice reshape demand by pocket.',
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
