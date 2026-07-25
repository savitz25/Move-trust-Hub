import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * broomfield â€” CO Tier 2 Wave 1
 */
export const broomfieldCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'broomfield',
  hubTitle: 'Broomfield City and County Moving Intelligence Hub',
  eyebrow: 'Broomfield · north-metro city-county',
  h1: 'Moving in Broomfield: North-Metro Employment Corridors & Dual-Carriage Access',
  heroOpener:
    'Broomfield is a compact north-metro city-county — multi-family and HOA growth along US-36 / I-25 edges, employment-corridor density, and freeflow that is not Adams continuous Brighton/Commerce City product with different labels. Expect COI multi-family, HOA packets, and short but peak-heavy portal times under one consolidated jurisdiction. This guide is for people moving in Broomfield as compact north-metro product — not an Adams rename.',
  heroCredibility:
    'North-metro city-county · US-36 / I-25 corridors · Compact multi-family · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-36 · I-25 · CO-121 · CO-128 · 120th / Midway corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Adams County',
    parentHref: '/local-movers/colorado/adams',
    title: 'Compared with Adams County',
    intro:
      'Broomfield is compact north-metro multi-family/HOA city-county product — not Adams continuous north-metro industrial-residential density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Adams crews fight I-76/I-270 and Tower Road peaks. Broomfield pairs ride US-36, I-25, and Midway corridors — freer mid-day inside a compact footprint, still peak-heavy on Flatiron/US-36 commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Adams mixes Brighton multi-family and industrial-edge stock. Broomfield mixes planned multi-family, HOA SFH, and employment-corridor apartments — more continuous compact north-metro product, less continuous industrial-residential fabric.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Multi-family elevators and HOA packets dominate; staging is compact but highly rule-bound.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Broomfield quotes often track north-metro suburb rates for multi-family access — COI soft costs and peak freeflow still push prices up vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Broomfield is compact north-metro city-county — not Adams product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Broomfield County different',
    intro: 'Compact multi-family COIs, US-36 freeflow, and HOA soft costs — not interchangeable Adams boilerplate.',
    bullets: [
      {
        title: 'US-36 / I-25 peaks rewrite short-looking locals',
        detail:
          'Broomfield ↔ Adams/Boulder pairs freer mid-day still burn clock. Ask portal-to-portal.',
      },
      {
        title: 'Multi-family elevators are first-class product',
        detail:
          'COI and elevator reservations need inventories different from pure SFH lots.',
      },
      {
        title: 'HOA soft costs dominate planned villages',
        detail:
          'Gate lists and approved hours are standard survey inputs.',
      },
      {
        title: 'Compact footprint still has empty-mile edges to Adams yards',
        detail:
          'Clarify staging origin on every estimate.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Broomfield zones: employment multi-family, HOA growth, US-36 corridor & open-space edges',
  zonesIntro: 'Two to four sharp products — multi-family cores, HOA growth, corridor stock, and open-space edges.',
  zones: [
    {
      id: 'employment-multi',
      name: 'Employment-corridor multi-family',
      shortName: 'Employment multi',
      neighborhoods: ["Interlocken edges","employment multi-family","apartment corridors"],
      housingTypes: 'Multi-family, elevators, townhomes',
      challenges: ["COI packets","Elevators","US-36 peaks"],
      moverTips: 'Collect elevator COIs; build commute peak buffers.',
      cityKeywords: ["broomfield multi","interlocken"],
    },
    {
      id: 'hoa-growth',
      name: 'HOA SFH growth villages',
      shortName: 'HOA growth',
      neighborhoods: ["planned villages","HOA SFH"],
      housingTypes: 'HOA SFH, townhomes',
      challenges: ["HOA packets","Cul-de-sac staging"],
      moverTips: 'Collect COI and gate lists early.',
      cityKeywords: ["broomfield hoa"],
    },
    {
      id: 'us36-corridor',
      name: 'US-36 / Midway corridor stock',
      shortName: 'US-36 corridor',
      neighborhoods: ["Midway multi-family","corridor mixed stock"],
      housingTypes: 'Multi-family, SFH, mixed stock',
      challenges: ["Arterial freeflow","Lease clusters"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["midway broomfield"],
    },
    {
      id: 'open-edge',
      name: 'Open-space / edge lots',
      shortName: 'Open edges',
      neighborhoods: ["open-space edges","edge SFH"],
      housingTypes: 'SFH, larger lots',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; clarify Adams second addresses.',
      cityKeywords: ["edge broomfield"],
    }
  ],
  specialized: [
    {
      id: 'north-metro',
      title: 'Compact north-metro freeflow',
      intro: 'US-36/I-25 pairs still peak hard toward Adams/Boulder/Jefferson.',
      bullets: ["Price portal-to-portal honestly.","Clarify Adams, Jefferson, or Boulder second addresses early."],
    },
    {
      id: 'multi-coi',
      title: 'Employment multi-family COI module',
      intro: 'Elevators and building packets are first-class cost drivers.',
      bullets: ["Collect COI and elevator reservations early.","Do not quote pure Adams industrial-edge rates for COI multi-family."],
    },
    {
      id: 'hoa-soft',
      title: 'HOA soft-cost module',
      intro: 'Planned villages dominate family volume.',
      bullets: ["Collect gate lists and approved hours before the estimate is final.","Saturday HOA windows push demand into peak crew slots."],
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
        intro: 'Broomfield families compare Boulder Valley, Adams 12, Jefferson County, and related district feeders that cross the city-county — verify address boundaries carefully.',
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
            detail: 'SCL Health / Intermountain Broomfield and north-metro specialty spillover serve the city-county; map peak US-36 times for ER access.',
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
    intro: 'Multi-family COIs, HOA soft costs, and US-36 freeflow often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter ice reshape demand by pocket.',
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
        label: 'Adams County movers (parent contrast)',
        href: '/local-movers/colorado/adams',
      },
      {
        label: 'Jefferson County movers',
        href: '/local-movers/colorado/jefferson',
      },
    ],
  },
});
