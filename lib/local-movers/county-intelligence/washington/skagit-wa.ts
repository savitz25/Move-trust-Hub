import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * skagit â€” WA Tier 2 Wave 1
 */
export const skagitCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'skagit',
  hubTitle: 'Skagit County Moving Intelligence Hub',
  eyebrow: 'Skagit · Mount Vernon / Burlington / Anacortes — north I-5 corridor',
  h1: 'Moving in Skagit County: Mount Vernon, Burlington & North I-5 Corridor Access',
  heroOpener:
    'Skagit County is north I-5 mid-corridor product — Mount Vernon multi-story and seat stock, Burlington multi-family and retail-corridor growth, Anacortes and island-edge approaches, and freeflow that is not Bellingham WWU density or Everett industrial multi-family with different labels. Expect agricultural calendars, rain staging, and longer empty miles under one county. This guide is for people moving in Skagit as north I-5 mid-corridor — not a Whatcom or Snohomish rename.',
  heroCredibility:
    'North I-5 mid-corridor · Ag + multi-family mix · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-5 · SR-20 · SR-536 · SR-9 · Anacortes approaches',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Whatcom County',
    parentHref: '/local-movers/washington/whatcom',
    title: 'Compared with Whatcom County',
    intro:
      'Skagit is north I-5 agricultural and mid-corridor multi-family product — not Whatcom Bellingham university density and not Snohomish Everett industrial multi-family alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Whatcom crews fight Bellingham arterials and border freeflow. Skagit pairs ride I-5, SR-20, and local arterials — freer mid-day between metros, still peak-heavy on Mount Vernon arterials and Burlington retail weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Whatcom mixes Bellingham multi-story and WWU multi-family. Skagit mixes Mount Vernon multi-unit, Burlington multi-family, and Anacortes stock — more ag-corridor product, less continuous university density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; multi-family elevators appear on Burlington growth; Anacortes approaches add ferry-adjacent timing.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Skagit quotes often track north I-5 secondary rates for driveway SFH — multi-story access and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Skagit is north I-5 mid-corridor — not Bellingham or Everett product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Skagit County different',
    intro: 'Ag calendars, Mount Vernon multi-story, and I-5 freeflow — not interchangeable Bellingham or Everett boilerplate.',
    bullets: [
      {
        title: 'I-5 freeflow is still billable',
        detail:
          'Skagit ↔ Whatcom/Snohomish pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Mount Vernon multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure Burlington cul-de-sacs.',
      },
      {
        title: 'Agricultural calendars reshape mid-week demand',
        detail:
          'Harvest windows rewrite pure Saturday residential assumptions.',
      },
      {
        title: 'Anacortes approaches add ferry-adjacent timing risk',
        detail:
          'Clarify island second addresses and sailing windows early.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Skagit zones: Mount Vernon multi-story, Burlington multi-family, Anacortes edges & rural valley lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, multi-family growth, island-edge stock, and rural lots.',
  zones: [
    {
      id: 'mount-vernon',
      name: 'Mount Vernon multi-story & seat stock',
      shortName: 'Mount Vernon',
      neighborhoods: ["Mount Vernon","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-5 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["mount vernon"],
    },
    {
      id: 'burlington',
      name: 'Burlington multi-family & retail corridors',
      shortName: 'Burlington',
      neighborhoods: ["Burlington","retail multi-family","growth villages"],
      housingTypes: 'Multi-family, HOA SFH, townhomes',
      challenges: ["Elevators","HOA packets","Retail peaks"],
      moverTips: 'Collect HOA COIs; build I-5 commute buffers.',
      cityKeywords: ["burlington wa"],
    },
    {
      id: 'anacortes',
      name: 'Anacortes / island-edge approaches',
      shortName: 'Anacortes',
      neighborhoods: ["Anacortes","ferry approaches","island multi-family"],
      housingTypes: 'Multi-family, SFH, mixed stock',
      challenges: ["Ferry timing","Arterial freeflow"],
      moverTips: 'Clarify ferry windows; photo last-mile.',
      cityKeywords: ["anacortes"],
    },
    {
      id: 'rural-valley',
      name: 'Rural Skagit valley lots',
      shortName: 'Rural valley',
      neighborhoods: ["rural tracts","ag-edge lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Rain staging"],
      moverTips: 'Survey approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["rural skagit"],
    }
  ],
  specialized: [
    {
      id: 'i5-mid',
      title: 'I-5 north mid-corridor freeflow',
      intro: 'North pairs still peak hard toward Whatcom or Snohomish.',
      bullets: ["Price portal-to-portal honestly.","Clarify Bellingham or Everett second addresses early."],
    },
    {
      id: 'ag-calendars',
      title: 'Agricultural calendar module',
      intro: 'Harvest windows reshape mid-week demand.',
      bullets: ["Clarify hard dates early.","Do not quote pure Bellingham Saturday rates for ag-edge jobs."],
    },
    {
      id: 'mv-seat',
      title: 'Mount Vernon multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes Ã¢â‚¬â€ primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Skagit families compare Mount Vernon, Burlington-Edison, Anacortes, Sedro-Woolley, and related district feeders — verify address boundaries; do not assume Whatcom or Snohomish maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use OSPI data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university towns, and military markets can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Skagit Regional Health and regional specialty spillover serve the county; map peak I-5 times for ER access.',
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
    intro: 'I-5 freeflow, multi-story access, and empty miles often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450Ã¢â‚¬â€œ$1,200+' },
      { label: '3Ã¢â‚¬â€œ4 BR home', value: '$1,600Ã¢â‚¬â€œ$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115Ã¢â‚¬â€œ$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, harvest windows, rain staging, and tourism shoulders reshape demand by pocket.',
    items: [
      {
        title: 'Late spring Ã¢â‚¬â€œ early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Institutional & weather windows',
        detail:
          'School, university, PCS, tourism, or storm seasons can outrank pure weekend preference.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Washington UTC household goods permit for in-state Washington moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Whatcom County movers (parent contrast)',
        href: '/local-movers/washington/whatcom',
      },
      {
        label: 'Snohomish County movers',
        href: '/local-movers/washington/snohomish',
      },
    ],
  },
});
