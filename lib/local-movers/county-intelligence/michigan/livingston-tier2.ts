import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** livingston — MI Tier 2 Wave 1 */
export const livingstonCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'livingston',
  hubTitle: 'Livingston County Moving Intelligence Hub',
  eyebrow: 'Livingston · Brighton / Howell · Detroit–Lansing west collar · vs Oakland',
  h1: 'Moving in Livingston County: Brighton, Howell & US-23 Growth Suburbs',
  heroOpener: 'Livingston County is the US-23 growth collar between metro Detroit and Lansing — Brighton multi-family and HOA villages, Howell seat stock, longer empty miles than Oakland’s continuous north-metro density, and freeflow that is not a Troy/Birmingham rename. Expect master-plan COIs, school-calendar SFH volume, and portal-to-portal time that map miles understate. This guide is for people moving in Livingston as US-23 collar product — not an Oakland rename.',
  heroCredibility: 'US-23 growth suburbs · Detroit–Lansing corridor · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-23 · I-96 · M-59 · M-36 · Grand River Ave corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Oakland County (and Wayne metro patterns)',
    parentHref: '/local-movers/michigan/oakland',
    title: 'Compared with Oakland County (and Wayne metro patterns)',
    intro: 'Livingston is Brighton / Howell US-23 growth collar — not Oakland Troy corporate HOA density and not Wayne city elevators alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Oakland crews fight I-75/I-696 north-metro peaks. Livingston pairs ride US-23, I-96, and Brighton arterials — freer mid-day further west, still peak-heavy on commute windows into Oakland and Ann Arbor edges.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Oakland mixes continuous corporate HOAs and village cores. Livingston mixes Brighton multi-family, Howell seat SFH, and larger-lot townships — more continuous outer-collar growth product, less continuous north-metro executive density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets dominate growth villages; rural township approaches add empty miles uncommon on pure Farmington Hills cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Livingston quotes often sit at outer-collar rates for driveway SFH — empty miles into Oakland still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Livingston is US-23 Detroit–Lansing collar growth — not Oakland renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Livingston County different',
    intro: 'US-23 freeflow, Brighton growth, and outer empty miles — not an Oakland clone.',
    bullets: [
      {
        title: 'US-23 freeflow is billable',
        detail: 'Brighton ↔ Oakland pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'HOA growth dominates family volume',
        detail: 'COI and gate lists on planned villages are standard.',
      },
      {
        title: 'Distinct from Oakland continuous north-metro density',
        detail: 'Outer collar is not Troy/Birmingham product alone.',
      },
      {
        title: 'Winter ice on US-23 rewrites mornings',
        detail: 'Build weather buffers into peak commute quotes.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Livingston zones: Brighton growth, Howell seat, US-23 corridors & rural townships',
  zonesIntro: 'Two to four sharp products under one US-23 collar label.',
  zones: [
    {
      id: 'brighton',
      name: 'Brighton multi-family & HOA growth',
      shortName: 'Brighton',
      neighborhoods: ["Brighton","growth villages"],
      housingTypes: 'Multi-family, planned SFH, townhomes',
      challenges: ["HOA packets","Building COIs","US-23 peaks"],
      moverTips: 'Collect COI and management packets early; price portal-to-portal.',
      cityKeywords: ["brighton"],
    },
    {
      id: 'howell',
      name: 'Howell seat & core',
      shortName: 'Howell',
      neighborhoods: ["Howell","seat neighborhoods"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Street width","Mixed access"],
      moverTips: 'Inventory older multi-story; confirm staging near seat arterials.',
      cityKeywords: ["howell"],
    },
    {
      id: 'us23',
      name: 'US-23 corridor suburbs',
      shortName: 'US-23 corridors',
      neighborhoods: ["corridor townships"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Commute peaks"],
      moverTips: 'Avoid peak US-23 windows when possible.',
      cityKeywords: ["livingston us-23"],
    },
    {
      id: 'rural',
      name: 'Rural townships & larger lots',
      shortName: 'Rural townships',
      neighborhoods: ["eastern/western townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["livingston rural"],
    }
  ],
  specialized: [
    {
      id: 'us23',
      title: 'US-23 collar freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Oakland multi-family rates for rural township lots."],
    },
    {
      id: 'hoa-growth',
      title: 'Brighton HOA / multi-family mix',
      intro: 'Building packets and gate lists dominate growth stock.',
      bullets: ["Elevator windows early.","Mud weeks on new streets need flexibility."],
    },
    {
      id: 'vs-oakland',
      title: 'Distinct from Oakland north-metro',
      intro: 'Outer US-23 product differs from continuous Troy density.',
      bullets: ["Do not recycle Birmingham village-only playbooks.","Brighton/Howell outer collar is the differentiator."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Livingston families compare Brighton, Howell, Hartland, and other districts — verify boundaries; do not assume Oakland maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Michigan DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, tourism, and manufacturing markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Trinity Health and regional systems serve the collar; map peak freeflow on US-23/I-96 corridors.',
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
    intro: 'Empty miles, HOA soft costs, and US-23 peaks often matter more than raw miles.',
    drivers: [
      { title: 'Corridor freeflow', detail: 'Peak windows inflate hourly bills on short-looking pairs.' },
      { title: 'Access soft costs', detail: 'HOA packets, stairs, or last-mile shuttles add labor hours.' },
      { title: 'Long empty-mile edges', detail: 'Far pockets price differently from seat cores.' },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$120–$190+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years and summer family closings reshape demand more than pure Oakland corporate peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Winter access', detail: 'Ice and lake-effect windows rewrite morning plans on many collars.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Oakland County (and Wayne metro patterns) movers (parent contrast)', href: '/local-movers/michigan/oakland' },
    ],
  },
});
