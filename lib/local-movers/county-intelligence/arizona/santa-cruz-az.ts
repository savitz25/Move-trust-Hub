import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeAzTier2Pack,
  AZ_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/arizona/az-tier2-shared';

/**
 * santa-cruz — AZ Tier 2 Wave 1
 */
export const santaCruzCountyAzTier2Intelligence: CountyIntelligencePack = finalizeAzTier2Pack({
  countySlug: 'santa-cruz',
  hubTitle: 'Santa Cruz County Moving Intelligence Hub',
  eyebrow: 'Santa Cruz · Nogales — border county',
  h1: 'Moving in Santa Cruz County: Nogales, Rio Rico & Border Logistics Access',
  heroOpener:
    'Santa Cruz County is southern Arizona border product — Nogales multi-story and multi-family stock, Rio Rico growth edges, Patagonia and rural approaches, and freeflow on I-19 that is not Tucson basin density with different labels. Expect border logistics, commercial-adjacent residential, and long empty miles under one small county. This guide is for people moving in Santa Cruz as border secondary — not a Tucson rename.',
  heroCredibility:
    'Border county · Nogales multi-story · I-19 freeflow · ACC entity diligence · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-19 · AZ-82 · AZ-83 · Grand Avenue corridor',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Pima County',
    parentHref: '/local-movers/arizona/pima',
    title: 'Compared with Pima County',
    intro:
      'Santa Cruz is border logistics product on I-19 — not Pima Tucson metro density and not pure rural desert freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Pima crews fight Tucson arterials and I-10 peaks. Santa Cruz pairs ride I-19 and AZ-82 — freer mid-day south of the basin, still peak-heavy on Nogales arterials and border commercial windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Pima mixes Tucson multi-story and foothill HOAs. Santa Cruz mixes Nogales multi-unit, Rio Rico SFH, and rural edges — more border-town product, less continuous Tucson metro density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Border-adjacent streets need curb plans; multi-family elevators appear on growth edges; rural lots add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Santa Cruz quotes often sit at border secondary rates for multi-story access — commercial freeflow and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Santa Cruz is border county secondary — not Tucson product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Santa Cruz County different',
    intro: 'Border freeflow, Nogales multi-story, and I-19 empty miles — not interchangeable Tucson boilerplate.',
    bullets: [
      {
        title: 'I-19 freeflow is still billable',
        detail:
          'Santa Cruz ↔ Pima pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Nogales multi-story is first-class product',
        detail:
          'Stairs and curb plans need inventories different from pure Rio Rico cul-de-sacs.',
      },
      {
        title: 'Border commercial windows reshape staging',
        detail:
          'Freight and port traffic rewrite pure residential Saturday assumptions.',
      },
      {
        title: 'Empty miles from Tucson yards are real',
        detail:
          'Even “local” Santa Cruz pairs can price as distance work for Tucson-based crews.',
      },
      AZ_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Santa Cruz zones: Nogales multi-story, Rio Rico growth, Patagonia edges & rural lots',
  zonesIntro: 'Two to four sharp products — border multi-story, growth SFH, mountain edges, and rural lots.',
  zones: [
    {
      id: 'nogales',
      name: 'Nogales multi-story & multi-unit',
      shortName: 'Nogales',
      neighborhoods: ["Nogales","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Border freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["nogales"],
    },
    {
      id: 'rio-rico',
      name: 'Rio Rico growth SFH & multi-family',
      shortName: 'Rio Rico',
      neighborhoods: ["Rio Rico","growth villages"],
      housingTypes: 'HOA SFH, multi-family, townhomes',
      challenges: ["HOA packets","I-19 freeflow"],
      moverTips: 'Collect HOA COIs; build I-19 buffer for Pima pairs.',
      cityKeywords: ["rio rico"],
    },
    {
      id: 'patagonia',
      name: 'Patagonia / mountain-edge approaches',
      shortName: 'Patagonia',
      neighborhoods: ["Patagonia","AZ-82 edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Narrow approaches","Empty miles"],
      moverTips: 'Photo last-mile; prefer early starts.',
      cityKeywords: ["patagonia"],
    },
    {
      id: 'rural-lots',
      name: 'Rural Santa Cruz lots',
      shortName: 'Rural lots',
      neighborhoods: ["rural tracts","eastern edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["rural santa cruz"],
    }
  ],
  specialized: [
    {
      id: 'border-logistics',
      title: 'Border logistics module',
      intro: 'Commercial freeflow reshapes residential staging.',
      bullets: ["Build buffers for port and freight peaks.","Do not recycle pure Tucson Saturday rates."],
    },
    {
      id: 'i19-freeflow',
      title: 'I-19 freeflow to Pima',
      intro: 'South pairs still peak hard toward Tucson.',
      bullets: ["Price portal-to-portal honestly.","Clarify Pima second addresses early."],
    },
    {
      id: 'nogales-seat',
      title: 'Nogales multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes â€” primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Santa Cruz families compare Nogales Unified, Santa Cruz Valley, and related district feeders — verify address boundaries; do not assume Tucson maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Arizona DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Holy Cross Hospital and Tucson specialty spillover serve the county; map peak I-19 times for ER access.',
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
    intro: 'Border freeflow, multi-story access, and empty miles from Tucson yards often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450â€“$1,200+' },
      { label: '3â€“4 BR home', value: '$1,600â€“$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115â€“$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, monsoon weather, and extreme heat reshape demand by pocket.',
    items: [
      {
        title: 'Late spring â€“ early fall',
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
      'Official links first; directory listings are independent. Verify Arizona Corporation Commission (ACC) entity status for in-state Arizona moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Pima County movers (parent contrast)',
        href: '/local-movers/arizona/pima',
      },

    ],
  },
});
