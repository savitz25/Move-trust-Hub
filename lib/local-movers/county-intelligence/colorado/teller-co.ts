import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * teller â€” CO Tier 2 Wave 1
 */
export const tellerCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'teller',
  hubTitle: 'Teller County Moving Intelligence Hub',
  eyebrow: 'Teller · Woodland Park — Colorado Springs west mountain edge',
  h1: 'Moving in Teller County: Woodland Park, Mountain-West COS Collar Access',
  heroOpener:
    'Teller County is Colorado Springs’ western mountain collar — Woodland Park multi-family and growth stock, Divide and Florissant edges, Cripple Creek tourism approaches, and freeflow on US-24 that is not El Paso continuous Springs multi-family with different labels. Expect elevation grades, tourism peaks, and longer empty miles under one county. This guide is for people moving in Teller as COS mountain-west collar — not an El Paso rename.',
  heroCredibility:
    'COS mountain-west collar · Woodland Park · US-24 freeflow · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-24 · CO-67 · CO-67/CO-9 links · Woodland Park arterials',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'El Paso County',
    parentHref: '/local-movers/colorado/el-paso',
    title: 'Compared with El Paso County',
    intro:
      'Teller is Colorado Springs mountain-west collar on US-24 — not El Paso continuous Springs multi-family density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'El Paso crews fight I-25 and Powers peaks into Colorado Springs. Teller pairs ride US-24 west — freer mid-day further into the mountains, still peak-heavy on Woodland Park arterials and tourism weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'El Paso mixes Springs multi-family and north-growth HOAs. Teller mixes Woodland Park multi-unit, mountain SFH, and tourism stock — more elevation product, less continuous Springs density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Grades rewrite truck size; multi-family elevators appear on growth edges; soft shoulders appear on rural approaches.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Teller quotes often track mountain-collar secondary rates for multi-story access — grades and empty miles from Springs yards still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Teller is COS mountain-west collar — not El Paso product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Teller County different',
    intro: 'US-24 freeflow, mountain grades, and Woodland Park multi-family — not interchangeable Springs boilerplate.',
    bullets: [
      {
        title: 'Empty miles from El Paso yards are real',
        detail:
          'Even “local” Teller pairs can price as distance work for Springs-based crews.',
      },
      {
        title: 'Mountain grades rewrite truck size',
        detail:
          'Approaches reject pure flat-suburb assumptions.',
      },
      {
        title: 'Woodland Park multi-family is first-class product',
        detail:
          'Elevators and curb plans need inventories different from pure cabin lots.',
      },
      {
        title: 'US-24 freeflow is still billable',
        detail:
          'Mountain-collar pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Teller zones: Woodland Park multi-family, Divide edges, Cripple Creek tourism & rural mountain lots',
  zonesIntro: 'Two to four sharp products — multi-family growth, mountain edges, tourism stock, and rural lots.',
  zones: [
    {
      id: 'woodland-park',
      name: 'Woodland Park multi-family & growth stock',
      shortName: 'Woodland Park',
      neighborhoods: ["Woodland Park","growth multi-family","HOA edges"],
      housingTypes: 'Multi-family, HOA SFH, townhomes',
      challenges: ["Elevators","US-24 freeflow","HOA packets"],
      moverTips: 'Collect HOA COIs; build US-24 buffer for El Paso pairs.',
      cityKeywords: ["woodland park"],
    },
    {
      id: 'divide',
      name: 'Divide / mountain-edge SFH',
      shortName: 'Divide',
      neighborhoods: ["Divide","mountain SFH"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Grades","Empty miles"],
      moverTips: 'Photo last-mile; prefer early starts.',
      cityKeywords: ["divide"],
    },
    {
      id: 'cripple-creek',
      name: 'Cripple Creek tourism approaches',
      shortName: 'Cripple Creek',
      neighborhoods: ["Cripple Creek","tourism multi-family"],
      housingTypes: 'Multi-story, multi-unit, tourism stock',
      challenges: ["Tourism peaks","Narrow streets","Grades"],
      moverTips: 'Book around tourism peaks; inventory stairs.',
      cityKeywords: ["cripple creek"],
    },
    {
      id: 'rural-mtn',
      name: 'Rural mountain lots',
      shortName: 'Rural mountain',
      neighborhoods: ["rural tracts","forest-edge lots"],
      housingTypes: 'Larger lots, mountain approaches',
      challenges: ["Long empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["rural teller"],
    }
  ],
  specialized: [
    {
      id: 'cos-collar',
      title: 'US-24 COS mountain-west freeflow',
      intro: 'West-collar pairs still peak hard toward El Paso.',
      bullets: ["Price portal-to-portal honestly.","Clarify Colorado Springs second addresses early."],
    },
    {
      id: 'grades',
      title: 'Mountain grade last-mile',
      intro: 'Grades rewrite flat-suburb truck assumptions.',
      bullets: ["Photo the final approach before promising a 26-foot truck.","Do not recycle Powers Blvd day rates alone."],
    },
    {
      id: 'wp-multi',
      title: 'Woodland Park multi-family access',
      intro: 'Elevators and HOA packets are first-class cost drivers.',
      bullets: ["Collect COI and elevator rules early.","Build tourism and commute peak buffers."],
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
        intro: 'Teller families compare Woodland Park RE-2, Cripple Creek-Victor, and related district feeders — verify address boundaries; do not assume El Paso maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use CDE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'UCHealth Pikes Peak Regional and Colorado Springs specialty spillover serve the county; map peak US-24 times for ER access.',
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
    intro: 'Grades, multi-family access, and empty miles from Springs yards often matter more than raw miles.',
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
    intro: 'Tourism summers, school years, and winter ice reshape demand by pocket.',
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
      'Official links first; directory listings are independent. Verify Colorado PUC household goods (HHG) permit for in-state Colorado moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'El Paso County movers (parent contrast)',
        href: '/local-movers/colorado/el-paso',
      },

    ],
  },
});
