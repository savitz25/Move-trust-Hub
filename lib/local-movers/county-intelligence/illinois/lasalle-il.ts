import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * lasalle â€” IL Tier 2 Wave 1
 */
export const lasalleCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'lasalle',
  hubTitle: 'LaSalle County Moving Intelligence Hub',
  eyebrow: 'LaSalle · Ottawa / Peru / LaSalle — Illinois Valley',
  h1: 'Moving in LaSalle County: Ottawa, Peru & Illinois Valley I-80 Access',
  heroOpener:
    'LaSalle County is Illinois Valley town product on I-80 — Ottawa multi-story and seat stock, Peru and LaSalle multi-unit corridors, Streator and Mendota edges, and freeflow that is not Grundy Morris industrial-edge product with different labels. Expect discontinuous valley towns, longer empty miles between seats, and mixed industrial-residential fabric under one county. This guide is for people moving in LaSalle as Illinois Valley secondary — not a Grundy rename.',
  heroCredibility:
    'Illinois Valley · Ottawa / Peru / LaSalle · I-80 valley towns · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-80 · I-39 · US-6 · US-51 · IL-23 · IL-71 · IL-251',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Grundy County',
    parentHref: '/local-movers/illinois/grundy',
    title: 'Compared with Grundy County',
    intro:
      'LaSalle is Illinois Valley multi-town product on I-80 — not Grundy Morris industrial-edge density alone and not pure rural prairie freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Grundy crews fight Morris arterials and I-80 industrial peaks. LaSalle pairs ride I-80, US-6, and IL-23 across discontinuous valley towns — freer mid-day between towns, still peak-heavy on Ottawa and Peru arterials.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Grundy mixes Morris multi-story and industrial-edge SFH. LaSalle mixes Ottawa multi-unit, Peru/LaSalle multi-story, and Streator/Mendota stock — more multi-town valley product, less continuous single-seat industrial density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; town-to-town empty miles dominate; rural edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local LaSalle quotes often sit at valley secondary rates for driveway SFH — multi-story access and long empty-mile town pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'LaSalle is Illinois Valley multi-town secondary — not Grundy/Morris product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Lasalle County different',
    intro: 'Valley multi-story, I-80 freeflow, and town-to-town empty miles — not interchangeable Morris boilerplate.',
    bullets: [
      {
        title: 'Ottawa multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure rural lots.',
      },
      {
        title: 'Discontinuous valley towns add empty miles',
        detail:
          'Peru ↔ Ottawa pairs fail when crews assume continuous single-seat density.',
      },
      {
        title: 'I-80 freeflow is still billable',
        detail:
          'Valley pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Grundy industrial-edge assumptions',
        detail:
          'Do not recycle Morris energy-corridor day rates alone.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'LaSalle zones: Ottawa seat, Peru/LaSalle multi-unit, Streator/Mendota edges & rural lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, twin multi-unit, outer towns, and rural lots.',
  zones: [
    {
      id: 'ottawa',
      name: 'Ottawa multi-story & seat stock',
      shortName: 'Ottawa',
      neighborhoods: ["Ottawa","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-80 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["ottawa"],
    },
    {
      id: 'peru-lasalle',
      name: 'Peru / LaSalle multi-unit corridors',
      shortName: 'Peru / LaSalle',
      neighborhoods: ["Peru","LaSalle","multi-family corridors"],
      housingTypes: 'Multi-unit, twins, older SFH',
      challenges: ["Mixed curb","Arterial timing","Empty miles"],
      moverTips: 'Survey street width; prefer early starts for town pairs.',
      cityKeywords: ["peru","lasalle"],
    },
    {
      id: 'streator-mendota',
      name: 'Streator / Mendota outer towns',
      shortName: 'Outer towns',
      neighborhoods: ["Streator","Mendota","outer multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["streator","mendota"],
    },
    {
      id: 'rural-lots',
      name: 'Rural valley lots & edges',
      shortName: 'Rural lots',
      neighborhoods: ["rural tracts","valley edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["rural lasalle"],
    }
  ],
  specialized: [
    {
      id: 'valley-distinct',
      title: 'Illinois Valley vs Grundy/Morris',
      intro: 'LaSalle is a multi-town valley market, not a single industrial seat.',
      bullets: ["Do not recycle Morris energy-corridor day rates alone.","Price town-to-town empty miles honestly."],
    },
    {
      id: 'i80-valley',
      title: 'I-80 valley freeflow',
      intro: 'Valley pairs still peak hard between discontinuous towns.',
      bullets: ["Build corridor buffers for morning and evening peaks.","Clarify Grundy second addresses for drive-time assumptions."],
    },
    {
      id: 'ottawa-seat',
      title: 'Ottawa multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts and hill approaches where present.","Temporary no-parking often beats long carries."],
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
        intro: 'LaSalle families compare Ottawa, LaSalle-Peru, Streator, Mendota, and related district feeders — verify address boundaries; do not assume Grundy maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use ISBE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'OSF Saint Elizabeth and regional specialty spillover serve the county; map peak freeflow across discontinuous valley towns.',
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
    intro: 'Town multi-story, I-80 freeflow, and valley empty miles often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter ice reshape demand by pocket.',
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
      'Official links first; directory listings are independent. Verify Illinois Commerce Commission (ICC) household goods authority for in-state Illinois moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Grundy County movers (parent contrast)',
        href: '/local-movers/illinois/grundy',
      },

    ],
  },
});
