import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * benton â€” WA Tier 2 Wave 1
 */
export const bentonCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'benton',
  hubTitle: 'Benton County Moving Intelligence Hub',
  eyebrow: 'Benton · Kennewick / Richland — Tri-Cities west/south',
  h1: 'Moving in Benton County: Kennewick, Richland & Tri-Cities I-82 Access',
  heroOpener:
    'Benton County is the Kennewick–Richland side of the Tri-Cities — multi-family and employment-corridor density, West Richland growth, river-bridge freeflow toward Pasco, and freeflow on I-82 / US-395 that is not Puget Sound product with different labels. Expect lab/energy calendars, summer heat pacing, and discontinuous bridge pairs under one county. This guide is for people moving in Benton as Tri-Cities employment hub — not a Franklin/Pasco rename and not a Yakima clone.',
  heroCredibility:
    'Tri-Cities employment hub · Kennewick / Richland · I-82 / Columbia · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-82 · US-395 · SR-240 · SR-224 · Columbia River bridges',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent southeast Washington (nearest hub contrast: Yakima)',
    parentHref: '/local-movers/washington/yakima',
    title: 'Compared with independent southeast Washington (nearest hub contrast: Yakima)',
    intro:
      'Benton is Tri-Cities Kennewick/Richland employment product — not Yakima valley ag hub alone and not Franklin Pasco east-bank product renamed.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Yakima crews fight valley arterials and I-82 peaks. Benton pairs ride I-82, US-395, and river bridges — freer mid-day Tri-Cities freeflow, still peak-heavy on Kennewick arterials and bridge windows into Pasco.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Yakima mixes city multi-story and West Valley HOAs. Benton mixes Kennewick multi-family, Richland multi-unit, and West Richland growth — more continuous employment multi-family, less continuous ag-edge fabric.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Multi-family elevators dominate employment corridors; bridge freeflow is first-class; clarify Franklin second addresses.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Benton quotes often track Tri-Cities secondary-premium rates for multi-family access — heat and bridge peaks can price above quiet rural lots.',
      },
      {
        title: 'Role difference',
        detail:
          'Benton is Tri-Cities west/south employment hub — not Pasco east-bank or Yakima product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Benton County different',
    intro: 'Employment multi-family, bridge freeflow, and lab calendars — not interchangeable Pasco or Yakima boilerplate.',
    bullets: [
      {
        title: 'Lab / energy calendars reshape mid-week demand',
        detail:
          'Hard report dates compete with Saturday family windows.',
      },
      {
        title: 'River-bridge freeflow to Franklin is still billable',
        detail:
          'Benton ↔ Pasco pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Kennewick multi-family is first-class product',
        detail:
          'Elevators and parking need inventories different from pure SFH lots.',
      },
      {
        title: 'Summer heat still governs open carries',
        detail:
          'Early starts outperform noon load-outs June–August.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Benton zones: Kennewick multi-family, Richland multi-unit, West Richland growth & river edges',
  zonesIntro: 'Two to four sharp products — multi-family cores, employment multi-unit, growth HOAs, and river edges.',
  zones: [
    {
      id: 'kennewick',
      name: 'Kennewick multi-family & employment corridors',
      shortName: 'Kennewick',
      neighborhoods: ["Kennewick","employment multi-family","west-side growth"],
      housingTypes: 'Multi-family, apartments, townhomes, SFH',
      challenges: ["Elevators","Heat staging","Bridge freeflow"],
      moverTips: 'Confirm elevator rules; prefer early starts in summer.',
      cityKeywords: ["kennewick"],
    },
    {
      id: 'richland',
      name: 'Richland multi-unit & employment stock',
      shortName: 'Richland',
      neighborhoods: ["Richland","employment multi-family"],
      housingTypes: 'Multi-family, SFH, townhomes',
      challenges: ["COI packets","Lease clusters","SR-240 freeflow"],
      moverTips: 'Collect building packets; build commute buffers.',
      cityKeywords: ["richland"],
    },
    {
      id: 'west-richland',
      name: 'West Richland HOA growth',
      shortName: 'West Richland',
      neighborhoods: ["West Richland","growth villages"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","Empty miles"],
      moverTips: 'Collect HOA COIs; prefer early starts.',
      cityKeywords: ["west richland"],
    },
    {
      id: 'river-edge',
      name: 'Columbia river-edge approaches',
      shortName: 'River edge',
      neighborhoods: ["river multi-family","bridge approaches"],
      housingTypes: 'Multi-family, SFH, mixed stock',
      challenges: ["Bridge freeflow","Wind staging"],
      moverTips: 'Build bridge-peak buffers; clarify Franklin second addresses.',
      cityKeywords: ["columbia river benton"],
    }
  ],
  specialized: [
    {
      id: 'tri-cities-west',
      title: 'Tri-Cities west/south employment module',
      intro: 'Kennewick/Richland multi-family dominates volume.',
      bullets: ["Collect elevator COIs early.","Do not recycle Pasco east-bank day rates alone."],
    },
    {
      id: 'bridge-freeflow',
      title: 'Columbia bridge freeflow to Franklin',
      intro: 'Cross-river pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Clarify Pasco second addresses early."],
    },
    {
      id: 'lab-calendars',
      title: 'Lab / energy calendar module',
      intro: 'Hard report dates reshape mid-week demand.',
      bullets: ["Align surveys with report dates when possible.","Build buffers for employment-corridor peaks."],
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
        intro: 'Benton families compare Kennewick, Richland, and related district feeders — verify address boundaries; do not assume Franklin maps apply.',
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
            detail: 'Kadlec Regional and Trios Health campuses anchor acute care; map peak bridge and I-82 times for ER access.',
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
    intro: 'Multi-family access, bridge freeflow, and heat pacing often matter more than raw miles.',
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
    intro: 'Lab calendars, school years, and summer heat reshape demand by pocket.',
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
        label: 'independent southeast Washington (nearest hub contrast: Yakima) movers (parent contrast)',
        href: '/local-movers/washington/yakima',
      },
      {
        label: 'Franklin County movers',
        href: '/local-movers/washington/franklin',
      },
    ],
  },
});
