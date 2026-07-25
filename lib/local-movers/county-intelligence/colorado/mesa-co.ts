import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * mesa â€” CO Tier 2 Wave 1
 */
export const mesaCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'mesa',
  hubTitle: 'Mesa County Moving Intelligence Hub',
  eyebrow: 'Mesa · Grand Junction — Western Slope hub',
  h1: 'Moving in Mesa County: Grand Junction, Western Slope Hub & I-70 West Access',
  heroOpener:
    'Mesa County is Western Slope independent hub product — Grand Junction multi-story and multi-family stock, Fruita and Clifton edges, Palisade and orchard-edge approaches, and freeflow on I-70 that is not Front Range Denver-metro product with different labels. Expect regional medical/employment calendars, desert-valley heat, and longer empty miles under one county. This guide is for people moving in Mesa as Western Slope hub — not Front Range defaults.',
  heroCredibility:
    'Western Slope independent · Grand Junction hub · I-70 west · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-70 · US-50 · US-6 · CO-340 · 24 Road / Horizon Drive corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent Western Slope (vs Front Range defaults)',
    parentHref: '/local-movers/colorado/denver',
    title: 'Compared with independent Western Slope (vs Front Range defaults)',
    intro:
      'Mesa is independent Western Slope regional hub on I-70 — not Denver Front Range multi-family density and not pure mountain resort product.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Front Range crews fight I-25 metro peaks. Mesa pairs ride I-70, US-50, and local arterials — freer mid-day valley freeflow, still peak-heavy on Grand Junction arterials and Horizon Drive corridors.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Denver mixes elevators and dense multi-family. Mesa mixes GJ multi-story, Fruita SFH, and orchard-edge lots — more regional hub product, less continuous metro density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; multi-family elevators appear on growth edges; rural mesas add grades and soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Mesa quotes often track Western Slope secondary rates for multi-story access — long empty-mile pairs from Front Range yards price as distance work.',
      },
      {
        title: 'Role difference',
        detail:
          'Mesa is independent Western Slope hub — not Front Range product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Mesa County different',
    intro: 'Western Slope hub multi-story, I-70 freeflow, and valley empty miles — not interchangeable Denver boilerplate.',
    bullets: [
      {
        title: 'Grand Junction multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure Fruita cul-de-sacs.',
      },
      {
        title: 'I-70 freeflow is still billable',
        detail:
          'Valley pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Long empty miles from Front Range yards are real',
        detail:
          'Even “in-state” pairs can price as multi-day distance work.',
      },
      {
        title: 'Desert-valley heat still governs summer open carries',
        detail:
          'Early starts outperform noon load-outs June–August.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Mesa zones: Grand Junction multi-story, Fruita/Clifton edges, Palisade orchard edge & rural lots',
  zonesIntro: 'Two to four sharp products — hub multi-story, edge multi-family, orchard edges, and rural lots.',
  zones: [
    {
      id: 'gj-core',
      name: 'Grand Junction multi-story & multi-unit',
      shortName: 'Grand Junction',
      neighborhoods: ["Grand Junction","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-70 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["grand junction"],
    },
    {
      id: 'fruita-clifton',
      name: 'Fruita / Clifton multi-family edges',
      shortName: 'Fruita / Clifton',
      neighborhoods: ["Fruita","Clifton","edge multi-family"],
      housingTypes: 'SFH, multi-family, townhomes',
      challenges: ["HOA packets","Arterial timing"],
      moverTips: 'Collect HOA docs where applicable; prefer early starts.',
      cityKeywords: ["fruita","clifton"],
    },
    {
      id: 'palisade',
      name: 'Palisade / orchard-edge approaches',
      shortName: 'Palisade',
      neighborhoods: ["Palisade","orchard edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Narrow approaches","Seasonal traffic"],
      moverTips: 'Photo last-mile; build harvest-season buffers.',
      cityKeywords: ["palisade"],
    },
    {
      id: 'rural-lots',
      name: 'Desert mesa rural lots',
      shortName: 'Rural lots',
      neighborhoods: ["rural tracts","mesa approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Heat staging"],
      moverTips: 'Survey approaches; early starts beat heat peaks.',
      cityKeywords: ["rural mesa"],
    }
  ],
  specialized: [
    {
      id: 'ws-hub',
      title: 'Western Slope hub module',
      intro: 'GJ multi-story and regional employment dominate volume.',
      bullets: ["Inventory stairs and curb width.","Do not recycle Front Range day rates alone."],
    },
    {
      id: 'i70-west',
      title: 'I-70 west freeflow',
      intro: 'Valley pairs still peak hard; Front Range legs are distance work.',
      bullets: ["Price portal-to-portal honestly.","Clarify Denver second addresses for long empty-mile assumptions."],
    },
    {
      id: 'heat-pacing',
      title: 'Desert-valley heat pacing',
      intro: 'Summer open carries are first-class labor-hours drivers.',
      bullets: ["Prefer early starts June–August.","Pace crews and protect inventories."],
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
        intro: 'Mesa families compare District 51 feeders across Grand Junction, Fruita, and related communities — verify address boundaries.',
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
            detail: 'Community Hospital and St. Mary’s Medical Center anchor acute care; map peak I-70 / arterial times for ER access.',
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
    intro: 'Hub multi-story, I-70 freeflow, and long empty miles often matter more than raw miles.',
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
    intro: 'School years, harvest edges, tourism shoulders, and summer heat reshape demand by pocket.',
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
        label: 'independent Western Slope (vs Front Range defaults) movers (parent contrast)',
        href: '/local-movers/colorado/denver',
      },

    ],
  },
});
