import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * beaver — PA Tier 2 Wave 1
 */
export const beaverCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'beaver',
  hubTitle: 'Beaver County Moving Intelligence Hub',
  eyebrow: 'Beaver · Beaver / Ohio River — Pittsburgh west',
  h1: 'Moving in Beaver County: Beaver Valley, Ohio River Towns & Pittsburgh West Edge',
  heroOpener:
    'Beaver County is Pittsburgh’s western Ohio River collar — Beaver and Beaver Falls multi-story stock, Center Township and Chippewa suburban belts, Ambridge and Aliquippa river-town density, and freeflow that still peaks toward Allegheny with PA/OH interstate risk at the edge. It is not Pittsburgh West End hills renamed: expect river-town stairs, longer empty miles from city yards, and Ohio-adjacent authority questions under one county label. This guide is for people moving in Beaver as Pittsburgh west collar — not a recycled Allegheny pack.',
  heroCredibility:
    'Pittsburgh west collar · Ohio River towns · PA/OH edge · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-376 · PA-60 · PA-65 · PA-51 · US-30 edges · Ohio River bridges',
  parentCompare: {
    parentLabel: 'Allegheny County',
    parentHref: '/local-movers/pennsylvania/allegheny',
    title: 'Compared with Allegheny County',
    intro:
      'Beaver is Pittsburgh west Ohio River collar — not Allegheny city hills alone and not pure rural northwest freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Allegheny crews fight city peaks and western approaches. Beaver pairs ride I-376, PA-65, and PA-60 — freer mid-day west of the city, still peak-heavy toward Allegheny portals and river-bridge windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Allegheny mixes elevators and hillside multi-family. Beaver mixes river-town multi-story, Center/Chippewa SFH, and northern lots — more Ohio River older stock, less continuous city density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'River-town streets need curb plans and stair inventories; suburban belts trade that for driveway staging; OH addresses flip authority.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Beaver quotes often sit near west-metro secondary rates for driveway SFH — multi-story river towns and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Beaver is Pittsburgh west Ohio River collar — not Allegheny city product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Beaver County different',
    intro: 'Ohio River multi-story, west-collar freeflow, and PA/OH authority risk — not interchangeable Allegheny boilerplate.',
    bullets: [
      {
        title: 'River-town multi-story is first-class product',
        detail:
          'Stairs and tight streets need inventories different from Center Township cul-de-sacs.',
      },
      {
        title: 'I-376 / PA-65 freeflow is still billable',
        detail:
          'West-collar ↔ Allegheny pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Ohio adjacency creates interstate legs',
        detail:
          'Ohio addresses require FMCSA authority even on short-looking hops.',
      },
      {
        title: 'Empty miles from Pittsburgh yards are real',
        detail:
          'Even “local” Beaver pairs can price as distance work for city-based crews.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Beaver zones: river towns, Center/Chippewa belt, Beaver seat corridor & northern edges',
  zonesIntro: 'Two to four sharp products — river multi-story, suburban belts, seat corridor, and northern edges.',
  zones: [
    {
      id: 'river-towns',
      name: 'Ohio River towns multi-story',
      shortName: 'River towns',
      neighborhoods: ["Ambridge","Aliquippa","Monaca","Rochester edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Tight streets","Bridge freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking; build bridge-peak buffers.',
      cityKeywords: ["ambridge","aliquippa","monaca","rochester"],
    },
    {
      id: 'center-chippewa',
      name: 'Center / Chippewa suburban belt',
      shortName: 'Center / Chippewa',
      neighborhoods: ["Center Township","Chippewa","Beaver Falls edges"],
      housingTypes: 'Suburban SFH, townhomes, some multi-family',
      challenges: ["HOA packets","Arterial timing","Mixed stock"],
      moverTips: 'Collect HOA docs where applicable; prefer early starts.',
      cityKeywords: ["center township","chippewa","beaver falls"],
    },
    {
      id: 'beaver-seat',
      name: 'Beaver / seat corridor',
      shortName: 'Beaver seat',
      neighborhoods: ["Beaver","Bridgewater edges","seat multi-family"],
      housingTypes: 'Multi-story, SFH, multi-unit',
      challenges: ["Street parking","Stairs","Mixed curb access"],
      moverTips: 'Measure streets; inventory carries.',
      cityKeywords: ["beaver"],
    },
    {
      id: 'north-edges',
      name: 'Northern edges & larger lots',
      shortName: 'North Beaver',
      neighborhoods: ["New Brighton edges","Koppel edges","northern townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["new brighton","koppel","rural beaver"],
    }
  ],
  specialized: [
    {
      id: 'ohio-river-access',
      title: 'Ohio River multi-story access',
      intro: 'River-town stairs and tight streets are first-class cost drivers.',
      bullets: ["Inventory floor counts and street width before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'pa-oh-edge',
      title: 'PA / OH edge interstate module',
      intro: 'Ohio second addresses flip jobs to FMCSA authority.',
      bullets: ["Verify interstate authority before deposits on OH legs.","Clarify portal-to-portal time for west-collar freeflow."],
    },
    {
      id: 'west-collar-freeflow',
      title: 'Pittsburgh west-collar freeflow',
      intro: 'I-376 / PA-65 pairs to Allegheny still peak hard.',
      bullets: ["Price empty miles from city yards honestly.","Build buffers for river-bridge peaks."],
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
        intro: 'Beaver families compare Blackhawk, Beaver Area, Central Valley, Hopewell, and other districts — verify address boundaries.',
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
            detail: 'Heritage Valley and Allegheny specialty spillover serve the county; map peak freeflow and bridge times for ER access.',
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
    intro: 'River-town stairs, west-collar freeflow, and empty miles often matter more than raw miles.',
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
