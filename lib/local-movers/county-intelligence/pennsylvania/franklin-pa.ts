import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * franklin — PA Tier 2 Wave 1
 */
export const franklinCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'franklin',
  hubTitle: 'Franklin County Moving Intelligence Hub',
  eyebrow: 'Franklin · Chambersburg — south-central PA',
  h1: 'Moving in Franklin County: Chambersburg, I-81 South & Maryland-Border Access',
  heroOpener:
    'Franklin County is south-central PA ag-small-city product — Chambersburg multi-story and seat stock, Waynesboro and Greencastle corridors, Shippensburg-adjacent edges, and I-81 freeflow toward Maryland with interstate authority risk at the border. It is not Cumberland west-shore HOA growth renamed: expect small-city stairs, farm-edge empty miles, and MD-adjacent pairs under one county label. This guide is for people moving in Franklin as Chambersburg / I-81 south market — not a recycled Cumberland pack.',
  heroCredibility:
    'South-central PA · Chambersburg seat · I-81 south / MD border · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · US-30 · US-11 · PA-16 · PA-997 · PA-416',
  parentCompare: {
    parentLabel: 'Cumberland County',
    parentHref: '/local-movers/pennsylvania/cumberland',
    title: 'Compared with Cumberland County',
    intro:
      'Franklin is south-central ag-small-city product on I-81 — not Cumberland west-shore HOA growth alone and not pure capital freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Cumberland crews fight west-shore I-81 peaks into Harrisburg. Franklin pairs ride I-81, US-30, and PA-16 — freer mid-day south of Carlisle, still peak-heavy on Chambersburg arterials and MD-bound freeflow.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Cumberland mixes Carlisle multi-story and Mechanicsburg HOA. Franklin mixes Chambersburg multi-unit, Waynesboro SFH, and farm-edge lots — more ag-small-city product, less continuous planned-suburb density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; rural lots trade that for driveway length and soft shoulders; MD addresses flip authority.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Franklin quotes often sit at secondary south-central rates for driveway SFH — multi-story access and long empty-mile farm edges still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Franklin is Chambersburg / I-81 south ag-small-city — not Cumberland west-shore growth renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Franklin County different',
    intro: 'I-81 south freeflow, small-city multi-unit, and MD-border authority — not interchangeable Cumberland boilerplate.',
    bullets: [
      {
        title: 'Chambersburg multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from farm-edge driveways.',
      },
      {
        title: 'I-81 freeflow is still billable',
        detail:
          'Franklin ↔ Cumberland pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Maryland adjacency creates interstate legs',
        detail:
          'MD addresses require FMCSA authority even on short-looking hops.',
      },
      {
        title: 'Ag-edge empty miles price as distance work',
        detail:
          'Far townships fail when crews assume Chambersburg day rates.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Franklin zones: Chambersburg seat, Waynesboro corridor, Greencastle/MD edge & rural ag lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, east corridor, MD edge, and rural lots.',
  zones: [
    {
      id: 'chambersburg-seat',
      name: 'Chambersburg multi-story & older stock',
      shortName: 'Chambersburg',
      neighborhoods: ["Chambersburg","downtown","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-81 peaks"],
      moverTips: 'Inventory stairs; plan temporary no-parking; build I-81 buffers.',
      cityKeywords: ["chambersburg"],
    },
    {
      id: 'waynesboro-corridor',
      name: 'Waynesboro / east corridor',
      shortName: 'Waynesboro',
      neighborhoods: ["Waynesboro","Washington Township edges","Rouzerville edges"],
      housingTypes: 'SFH, multi-unit, mixed stock',
      challenges: ["Arterial timing","Mixed access","Empty miles"],
      moverTips: 'Prefer early starts; survey driveway depth.',
      cityKeywords: ["waynesboro","washington township"],
    },
    {
      id: 'greencastle-md',
      name: 'Greencastle / Maryland-border edge',
      shortName: 'Greencastle / MD edge',
      neighborhoods: ["Greencastle","Antrim edges","MD approaches"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Interstate authority risk","I-81 freeflow","Mixed access"],
      moverTips: 'Clarify MD second addresses; price portal-to-portal honestly.',
      cityKeywords: ["greencastle","antrim"],
    },
    {
      id: 'rural-ag',
      name: 'Rural ag lots & western edges',
      shortName: 'Rural Franklin',
      neighborhoods: ["Mercersburg edges","Fannett edges","western townships"],
      housingTypes: 'Larger lots, farm-edge approaches',
      challenges: ["Long empty miles","Soft shoulders","Limited alternate routes"],
      moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["mercersburg","fannett","rural franklin"],
    }
  ],
  specialized: [
    {
      id: 'i81-south',
      title: 'I-81 south freeflow module',
      intro: 'South-central pairs still peak hard toward Cumberland and MD.',
      bullets: ["Price portal-to-portal time honestly for Franklin ↔ Cumberland legs.","Clarify MD second addresses for interstate authority."],
    },
    {
      id: 'small-city-access',
      title: 'Chambersburg small-city multi-story',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'ag-last-mile',
      title: 'Ag-edge last-mile & empty miles',
      intro: 'Farm approaches punish seat day-rate assumptions.',
      bullets: ["Photo driveways and soft shoulders.","Long empty-mile pairs price as distance work for seat-based crews."],
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
        intro: 'Franklin families compare Chambersburg, Waynesboro, Greencastle-Antrim, Tuscarora, and other districts — verify boundaries.',
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
            detail: 'WellSpan Chambersburg and related campuses anchor acute care; map peak I-81 times and MD specialty spillover routes.',
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
    intro: 'Small-city stairs, I-81 freeflow, and ag-edge empty miles often matter more than raw miles.',
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
    intro: 'School years, ag calendars, and winter ice reshape demand by pocket.',
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
        label: 'Cumberland County movers (parent contrast)',
        href: '/local-movers/pennsylvania/cumberland',
      },
      {
        label: 'Dauphin County movers',
        href: '/local-movers/pennsylvania/dauphin',
      },
    ],
  },
});
