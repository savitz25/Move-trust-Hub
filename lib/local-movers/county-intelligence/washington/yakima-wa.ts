import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * yakima â€” WA Tier 2 Wave 1
 */
export const yakimaCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'yakima',
  hubTitle: 'Yakima County Moving Intelligence Hub',
  eyebrow: 'Yakima · central Washington hub',
  h1: 'Moving in Yakima County: Yakima Valley, Medical Hub & I-82 Access',
  heroOpener:
    'Yakima County is central Washington independent hub product — Yakima multi-story and multi-family stock, West Valley HOA growth, Selah and Union Gap edges, and freeflow on I-82 that is not Puget Sound rain logistics with different labels. Expect agricultural calendars, regional medical corridors, summer heat pacing, and longer empty miles under one county. This guide is for people moving in Yakima as central WA hub — not a Seattle-collar rename.',
  heroCredibility:
    'Central WA independent · Ag + medical hub · I-82 freeflow · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-82 · US-12 · SR-24 · SR-821 · Yakima Ave corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent central Washington (vs Puget Sound defaults)',
    parentHref: '/local-movers/washington/king',
    title: 'Compared with independent central Washington (vs Puget Sound defaults)',
    intro:
      'Yakima is independent central WA agricultural and medical hub on I-82 — not King Puget Sound multi-family density and not pure rural basin freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'King crews fight I-5/I-405 metro peaks. Yakima pairs ride I-82 and valley arterials — freer mid-day central freeflow, still peak-heavy on Yakima arterials and harvest windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'King mixes elevators and Eastside HOAs. Yakima mixes city multi-story, West Valley multi-family, and ag-edge SFH — more valley hub product, less continuous Sound multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; multi-family elevators appear on West Valley growth; rural edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Yakima quotes often track central WA secondary rates for multi-story access — long empty-mile pairs from the Sound price as distance work.',
      },
      {
        title: 'Role difference',
        detail:
          'Yakima is independent central WA hub — not Puget Sound product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Yakima County different',
    intro: 'Valley multi-story, ag calendars, and I-82 freeflow — not interchangeable Puget Sound boilerplate.',
    bullets: [
      {
        title: 'Agricultural calendars reshape mid-week demand',
        detail:
          'Harvest windows rewrite pure Saturday residential assumptions.',
      },
      {
        title: 'Yakima multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure West Valley cul-de-sacs.',
      },
      {
        title: 'I-82 freeflow is still billable',
        detail:
          'Valley pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Summer heat still governs open carries',
        detail:
          'Early starts outperform noon load-outs June–August.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Yakima zones: city multi-story, West Valley multi-family, Selah edges & rural valley lots',
  zonesIntro: 'Two to four sharp products — hub multi-story, multi-family growth, edge towns, and rural lots.',
  zones: [
    {
      id: 'yakima-city',
      name: 'Yakima multi-story & multi-unit',
      shortName: 'Yakima city',
      neighborhoods: ["Yakima","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-82 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["yakima"],
    },
    {
      id: 'west-valley',
      name: 'West Valley multi-family & HOA growth',
      shortName: 'West Valley',
      neighborhoods: ["West Valley","growth villages","HOA SFH"],
      housingTypes: 'HOA SFH, multi-family, townhomes',
      challenges: ["HOA packets","Elevators","Heat staging"],
      moverTips: 'Collect HOA COIs; prefer early starts in summer.',
      cityKeywords: ["west valley yakima"],
    },
    {
      id: 'selah',
      name: 'Selah / Union Gap corridor edges',
      shortName: 'Selah / Union Gap',
      neighborhoods: ["Selah","Union Gap","corridor multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["selah","union gap"],
    },
    {
      id: 'rural-valley',
      name: 'Rural Yakima valley lots',
      shortName: 'Rural valley',
      neighborhoods: ["rural tracts","ag-edge lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Heat staging"],
      moverTips: 'Survey approaches; soft ground after irrigation can block heavy trucks.',
      cityKeywords: ["rural yakima"],
    }
  ],
  specialized: [
    {
      id: 'central-hub',
      title: 'Central WA hub multi-story module',
      intro: 'City multi-story and medical corridors dominate volume.',
      bullets: ["Inventory stairs and curb width.","Do not recycle Puget Sound day rates alone."],
    },
    {
      id: 'ag-calendars',
      title: 'Agricultural calendar module',
      intro: 'Harvest windows reshape mid-week demand.',
      bullets: ["Clarify hard dates early.","Build buffers for ag traffic on valley arterials."],
    },
    {
      id: 'i82-freeflow',
      title: 'I-82 valley freeflow',
      intro: 'Central pairs still peak hard; Sound legs are distance work.',
      bullets: ["Price portal-to-portal honestly.","Clarify King second addresses for long empty-mile assumptions."],
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
        intro: 'Yakima families compare Yakima, West Valley, Selah, and related district feeders — verify address boundaries.',
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
            detail: 'MultiCare Yakima Memorial and regional specialty care anchor acute care; map peak I-82 / arterial times for ER access.',
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
    intro: 'Multi-story access, I-82 freeflow, ag empty miles, and heat pacing often matter more than raw miles.',
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
        label: 'independent central Washington (vs Puget Sound defaults) movers (parent contrast)',
        href: '/local-movers/washington/king',
      },

    ],
  },
});
