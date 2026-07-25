import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * franklin â€” WA Tier 2 Wave 1
 */
export const franklinCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'franklin',
  hubTitle: 'Franklin County Moving Intelligence Hub',
  eyebrow: 'Franklin · Pasco — Tri-Cities east bank',
  h1: 'Moving in Franklin County: Pasco, East-Bank Multi-Family & Bridge Access',
  heroOpener:
    'Franklin County is the Pasco east-bank side of the Tri-Cities — multi-family and multi-story stock, growth edges, ag-adjacent residential, and freeflow that still peaks hard on river bridges into Benton. Expect distinct east-bank access, heat pacing, and discontinuous pairs under one county. This guide is for people moving in Franklin as Tri-Cities east bank — not a Kennewick/Richland rename.',
  heroCredibility:
    'Tri-Cities east bank · Pasco multi-family · Bridge freeflow · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-395 · SR-397 · I-182 · Columbia River bridges · Court Street corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Benton County',
    parentHref: '/local-movers/washington/benton',
    title: 'Compared with Benton County',
    intro:
      'Franklin is Tri-Cities Pasco east-bank product — not Benton Kennewick/Richland employment multi-family renamed.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Benton crews fight Kennewick/Richland arterials and SR-240 peaks. Franklin pairs ride US-395, I-182, and river bridges — freer mid-day east-bank freeflow, still peak-heavy on Pasco arterials and bridge windows into Benton.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Benton mixes Kennewick multi-family and Richland multi-unit. Franklin mixes Pasco multi-story, east-bank multi-family, and ag-edge SFH — more continuous east-bank product, less continuous Richland employment density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Multi-family elevators and seat multi-story dominate; bridge freeflow is first-class; ag edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Franklin quotes often track Tri-Cities secondary rates for multi-family access — bridge peaks and multi-story access still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Franklin is Tri-Cities east bank — not Benton west/south product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Franklin County different',
    intro: 'East-bank multi-story, bridge freeflow, and ag edges — not interchangeable Kennewick/Richland boilerplate.',
    bullets: [
      {
        title: 'River-bridge freeflow to Benton is still billable',
        detail:
          'Pasco ↔ Kennewick pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Pasco multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure growth cul-de-sacs.',
      },
      {
        title: 'Distinct from Benton employment multi-family defaults',
        detail:
          'Do not recycle Richland day rates alone.',
      },
      {
        title: 'Summer heat still governs open carries',
        detail:
          'Early starts outperform noon load-outs June–August.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Franklin zones: Pasco multi-story, multi-family growth, bridge edges & ag-edge lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, multi-family growth, bridge approaches, and ag edges.',
  zones: [
    {
      id: 'pasco-core',
      name: 'Pasco multi-story & multi-unit',
      shortName: 'Pasco core',
      neighborhoods: ["Pasco","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Bridge freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["pasco"],
    },
    {
      id: 'multi-growth',
      name: 'Pasco multi-family growth edges',
      shortName: 'Multi-family growth',
      neighborhoods: ["growth multi-family","east-bank apartments"],
      housingTypes: 'Multi-family, apartments, townhomes',
      challenges: ["Elevators","Lease clusters","Heat staging"],
      moverTips: 'Collect elevator COIs; prefer early starts in summer.',
      cityKeywords: ["pasco multi"],
    },
    {
      id: 'bridge-edge',
      name: 'Bridge approaches toward Benton',
      shortName: 'Bridge edge',
      neighborhoods: ["bridge multi-family","I-182 edges"],
      housingTypes: 'Multi-family, SFH, mixed stock',
      challenges: ["Bridge freeflow","Wind staging"],
      moverTips: 'Build bridge-peak buffers; clarify Benton second addresses.',
      cityKeywords: ["pasco bridge"],
    },
    {
      id: 'ag-edge',
      name: 'Ag-edge residential lots',
      shortName: 'Ag edge',
      neighborhoods: ["ag-adjacent SFH","rural tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Heat staging"],
      moverTips: 'Survey approaches; soft ground after irrigation can block heavy trucks.',
      cityKeywords: ["east franklin"],
    }
  ],
  specialized: [
    {
      id: 'east-bank',
      title: 'Pasco east-bank multi-story module',
      intro: 'East-bank multi-story and multi-family dominate volume.',
      bullets: ["Inventory stairs and elevators.","Do not recycle Kennewick/Richland day rates alone."],
    },
    {
      id: 'bridge-freeflow',
      title: 'Columbia bridge freeflow to Benton',
      intro: 'Cross-river pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Clarify Kennewick or Richland second addresses early."],
    },
    {
      id: 'heat-pacing',
      title: 'Basin heat pacing module',
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
        intro: 'Franklin families compare Pasco School District and related feeders — verify address boundaries; do not assume Benton maps apply.',
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
            detail: 'Lourdes Health and Benton specialty spillover serve the county; map peak bridge times for ER access.',
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
    intro: 'Multi-story access, bridge freeflow, and heat pacing often matter more than raw miles.',
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
    intro: 'School years, ag calendars, and summer heat reshape demand by pocket.',
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
        label: 'Benton County movers (parent contrast)',
        href: '/local-movers/washington/benton',
      },

    ],
  },
});
