import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** montgomery — VA Tier 2 Wave 1 */
export const montgomeryCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'montgomery',
  hubTitle: 'Montgomery County Moving Intelligence Hub',
  eyebrow: 'Montgomery · Blacksburg / Christiansburg · VT university · independent',
  h1: 'Moving in Montgomery County: Blacksburg, Christiansburg & Virginia Tech Term Cycles',
  heroOpener: 'Montgomery County is the independent New River Valley university market — Blacksburg multi-story and student multi-family, Christiansburg corridors, I-81 freeflow, and product that does not answer to NoVA or Richmond defaults. Expect term-weekend spikes, longer empty miles into valley towns, and freeflow that is not Roanoke County suburban product alone. This guide is for people moving in Montgomery as VT university product — not a NoVA rename. (Export is VA-specific to avoid Ohio Montgomery name clash.)',
  heroCredibility: 'Virginia Tech university · I-81 · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · US-460 · US-11 · VA-114 · VA-8 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent New River Valley university market (vs NoVA / Roanoke defaults)',
    parentHref: '/local-movers/virginia/roanoke',
    title: 'Compared with independent New River Valley university market (vs NoVA / Roanoke defaults)',
    intro: 'Montgomery is Blacksburg / Christiansburg VT university product — not NoVA multi-family density and not Roanoke valley suburbs alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Roanoke County crews fight valley peaks. Montgomery pairs ride I-81, US-460, and Blacksburg arterials — freer mid-day NRV freeflow, still peak-heavy on term weekends and football calendars.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Roanoke County mixes suburban SFH. Montgomery mixes Blacksburg student multi-family, Christiansburg corridors, and rural lots — more continuous university density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Student buildings need management packets; grades and narrow streets rewrite truck size near campus.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Montgomery quotes often sit at secondary university-market rates for driveway SFH — term spikes push multi-family prices up.',
      },
      {
        title: 'Role difference',
        detail: 'Montgomery is independent VT / New River Valley university product — not NoVA or Roanoke renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Montgomery County different',
    intro: 'VT term calendars, Blacksburg multi-story, and I-81 freeflow — not a NoVA clone.',
    bullets: [
      {
        title: 'Virginia Tech term calendars dominate demand spikes',
        detail: 'Move-in/move-out weekends fill crews first — book early.',
      },
      {
        title: 'Blacksburg multi-story is first-class product',
        detail: 'Stairs and curb rules need inventories different from pure SFH playbooks.',
      },
      {
        title: 'I-81 freeflow is billable',
        detail: 'Blacksburg ↔ Christiansburg pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Game-day windows tighten freeflow',
        detail: 'Price portal-to-portal around known event calendars.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Montgomery zones: Blacksburg campus density, Christiansburg corridors, I-81 edges & rural south',
  zonesIntro: 'Two to four sharp products under one NRV university label.',
  zones: [
    {
      id: 'blacksburg',
      name: 'Blacksburg campus multi-family',
      shortName: 'Blacksburg',
      neighborhoods: ["Blacksburg","campus edges"],
      housingTypes: 'Student multi-family, multi-story, SFH',
      challenges: ["Term clusters","Building COIs","Stairs"],
      moverTips: 'Book early around term calendars; collect management packets.',
      cityKeywords: ["blacksburg"],
    },
    {
      id: 'christiansburg',
      name: 'Christiansburg corridors',
      shortName: 'Christiansburg',
      neighborhoods: ["Christiansburg","corridor edges"],
      housingTypes: 'SFH, multi-family pockets',
      challenges: ["Arterial timing","HOA packets"],
      moverTips: 'Price portal-to-portal toward Blacksburg.',
      cityKeywords: ["christiansburg"],
    },
    {
      id: 'i81',
      name: 'I-81 edge suburbs',
      shortName: 'I-81 edges',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["I-81 peaks"],
      moverTips: 'Avoid peak I-81 windows when possible.',
      cityKeywords: ["montgomery va i-81"],
    },
    {
      id: 'rural',
      name: 'Rural south & larger lots',
      shortName: 'Rural south',
      neighborhoods: ["southern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["montgomery va rural"],
    }
  ],
  specialized: [
    {
      id: 'vt-turnover',
      title: 'Virginia Tech term-start / term-end turnover',
      intro: 'Term calendars create multi-family clusters.',
      bullets: ["Book early around move-in/move-out weekends.","Expect short-notice multi-family demand."],
    },
    {
      id: 'blacksburg-city',
      title: 'Blacksburg multi-story access',
      intro: 'Stairs and curb rules are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i81-nrv',
      title: 'I-81 New River Valley freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote NoVA multi-family rates for rural NRV lots."],
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
        intro: 'Montgomery families compare Montgomery County Schools and related options — verify boundaries; university housing patterns do not replace district maps for family SFH.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Virginia DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, military, and tourism markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Carilion New River Valley and regional clinics serve the market; map peak freeflow on US-460/I-81 corridors.',
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
    intro: 'Term spikes, multi-story access, and empty miles often matter more than raw miles.',
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
    intro: 'VT calendars and school years reshape demand more than NoVA office peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, or tourism windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'independent New River Valley university market (vs NoVA / Roanoke defaults) movers (parent contrast)', href: '/local-movers/virginia/roanoke' },
    ],
  },
});
