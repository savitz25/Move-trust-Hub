import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * grant â€” WA Tier 2 Wave 1
 */
export const grantCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'grant',
  hubTitle: 'Grant County Moving Intelligence Hub',
  eyebrow: 'Grant · Moses Lake — Columbia Basin',
  h1: 'Moving in Grant County: Moses Lake, Columbia Basin & I-90 Access',
  heroOpener:
    'Grant County is Columbia Basin independent product — Moses Lake multi-story and multi-family stock, Ephrata and Quincy edges, ag-adjacent residential, and freeflow on I-90 that is not Cascade/Puget Sound product with different labels. Expect agricultural calendars, summer heat pacing, and longer empty miles under one large county. This guide is for people moving in Grant as basin hub — not a Seattle-collar rename.',
  heroCredibility:
    'Columbia Basin independent · Moses Lake hub · I-90 freeflow · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-90 · SR-17 · SR-28 · SR-282 · Pioneer Way corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent Columbia Basin (vs Puget Sound / Cascade defaults)',
    parentHref: '/local-movers/washington/king',
    title: 'Compared with independent Columbia Basin (vs Puget Sound / Cascade defaults)',
    intro:
      'Grant is independent Columbia Basin hub on I-90 — not King Puget Sound multi-family density and not pure rural desert freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'King crews fight I-5/I-405 metro peaks. Grant pairs ride I-90 and SR-17 — freer mid-day basin freeflow, still peak-heavy on Moses Lake arterials and harvest windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'King mixes elevators and Eastside HOAs. Grant mixes Moses Lake multi-story, multi-family growth, and ag-edge SFH — more basin hub product, less continuous Sound multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; multi-family elevators appear on growth edges; rural lots add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Grant quotes often track basin secondary rates for multi-story access — long empty-mile pairs from the Sound price as distance work.',
      },
      {
        title: 'Role difference',
        detail:
          'Grant is independent Columbia Basin hub — not Puget Sound product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Grant County different',
    intro: 'Basin multi-story, ag calendars, and I-90 freeflow — not interchangeable Puget Sound boilerplate.',
    bullets: [
      {
        title: 'Agricultural calendars reshape mid-week demand',
        detail:
          'Harvest windows rewrite pure Saturday residential assumptions.',
      },
      {
        title: 'Moses Lake multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure rural lots.',
      },
      {
        title: 'I-90 freeflow is still billable',
        detail:
          'Basin pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Summer heat still governs open carries',
        detail:
          'Early starts outperform noon load-outs June–August.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Grant zones: Moses Lake multi-story, multi-family growth, Ephrata/Quincy edges & rural basin lots',
  zonesIntro: 'Two to four sharp products — hub multi-story, multi-family growth, edge towns, and rural lots.',
  zones: [
    {
      id: 'moses-lake',
      name: 'Moses Lake multi-story & multi-unit',
      shortName: 'Moses Lake',
      neighborhoods: ["Moses Lake","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-90 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["moses lake"],
    },
    {
      id: 'multi-growth',
      name: 'Moses Lake multi-family growth',
      shortName: 'Multi-family growth',
      neighborhoods: ["growth multi-family","HOA edges"],
      housingTypes: 'Multi-family, apartments, townhomes',
      challenges: ["Elevators","Heat staging","Lease clusters"],
      moverTips: 'Collect elevator COIs; prefer early starts in summer.',
      cityKeywords: ["moses lake multi"],
    },
    {
      id: 'ephrata-quincy',
      name: 'Ephrata / Quincy corridor edges',
      shortName: 'Ephrata / Quincy',
      neighborhoods: ["Ephrata","Quincy","corridor multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts for long pairs.',
      cityKeywords: ["ephrata","quincy"],
    },
    {
      id: 'rural-basin',
      name: 'Rural basin lots',
      shortName: 'Rural basin',
      neighborhoods: ["rural tracts","ag-edge lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Heat staging"],
      moverTips: 'Survey approaches; soft ground after irrigation can block heavy trucks.',
      cityKeywords: ["rural grant"],
    }
  ],
  specialized: [
    {
      id: 'basin-hub',
      title: 'Columbia Basin hub module',
      intro: 'Moses Lake multi-story dominates hub volume.',
      bullets: ["Inventory stairs and curb width.","Do not recycle Puget Sound day rates alone."],
    },
    {
      id: 'i90-basin',
      title: 'I-90 basin freeflow',
      intro: 'Basin pairs still peak hard; Sound legs are distance work.',
      bullets: ["Price portal-to-portal honestly.","Clarify King second addresses for long empty-mile assumptions."],
    },
    {
      id: 'ag-heat',
      title: 'Ag calendar & heat pacing',
      intro: 'Harvest and heat are first-class labor inputs.',
      bullets: ["Prefer early starts June–August.","Build buffers for harvest traffic."],
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
        intro: 'Grant families compare Moses Lake, Ephrata, Quincy, and related district feeders — verify address boundaries.',
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
            detail: 'Samaritan Healthcare and regional specialty spillover serve the county; map peak I-90 times for ER access.',
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
    intro: 'Multi-story access, I-90 freeflow, empty miles, and heat pacing often matter more than raw miles.',
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
    intro: 'Harvest windows, school years, and summer heat reshape demand by pocket.',
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
        label: 'independent Columbia Basin (vs Puget Sound / Cascade defaults) movers (parent contrast)',
        href: '/local-movers/washington/king',
      },

    ],
  },
});
