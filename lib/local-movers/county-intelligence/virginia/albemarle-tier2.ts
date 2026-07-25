import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** albemarle — VA Tier 2 Wave 1 */
export const albemarleCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'albemarle',
  hubTitle: 'Albemarle County Moving Intelligence Hub',
  eyebrow: 'Albemarle · Charlottesville-area · UVA university / mountain-edge · independent',
  h1: 'Moving in Albemarle County: Charlottesville-Area Growth, UVA Cycles & Mountain-Edge Access',
  heroOpener: 'Albemarle County is the independent university and mountain-edge market around Charlottesville — Crozet and Pantops growth, rural-suburban lots, UVA term calendars that spill into the county, and freeflow that does not answer to NoVA I-95 collars or Richmond belt defaults. Expect longer empty miles, HOA pockets, mountain last-mile that rejects full trailers, and student-adjacent multi-family near the city line. This guide is for people moving in Albemarle as Charlottesville-area county product — not a NoVA or Richmond rename.',
  heroCredibility: 'UVA market · Mountain-edge · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-64 · US-29 · US-250 · VA-20 · VA-240 · VA-6 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent UVA / Charlottesville-area market (vs NoVA / Richmond defaults)',
    parentHref: '/local-movers/virginia/henrico',
    title: 'Compared with independent UVA / Charlottesville-area market (vs NoVA / Richmond defaults)',
    intro: 'Albemarle is Charlottesville-area university and mountain-edge product — not NoVA HOA density and not Richmond I-95 collars alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'NoVA crews fight Beltway peaks; Richmond crews fight I-95. Albemarle pairs ride I-64, US-29, and mountain approaches — freer mid-day Central VA freeflow, still peak-heavy on UVA term weekends and US-29 peaks.',
      },
      {
        title: 'Housing stock differences',
        detail: 'NoVA mixes continuous multi-family collars. Albemarle mixes Crozet planned SFH, Pantops multi-family, and mountain-edge lots — more continuous university-adjacent and rural-suburban product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Mountain approaches often need smaller trucks; student multi-family near the city line needs building packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Albemarle quotes often sit at secondary university-market rates for driveway SFH — mountain last-mile and term spikes push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Albemarle is independent UVA / Charlottesville-area county product — not NoVA or Richmond renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Albemarle County different',
    intro: 'UVA calendars, mountain last-mile, and Central VA freeflow — not a NoVA clone.',
    bullets: [
      {
        title: 'UVA term calendars spill into the county',
        detail: 'Move-in/move-out weekends fill crews first — book early.',
      },
      {
        title: 'Mountain-edge last-mile rewrites truck size',
        detail: 'Photo approaches; many lots reject full trailers.',
      },
      {
        title: 'I-64 / US-29 freeflow is billable',
        detail: 'Crozet ↔ Pantops pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Richmond and NoVA defaults',
        detail: 'Do not recycle I-95 collar or Beltway multi-family playbooks.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Albemarle zones: Crozet growth, Pantops multi-family, mountain-edge lots & rural south',
  zonesIntro: 'Two to four sharp products under one Charlottesville-area county label.',
  zones: [
    {
      id: 'crozet',
      name: 'Crozet planned growth',
      shortName: 'Crozet',
      neighborhoods: ["Crozet","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","US-250 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Charlottesville.',
      cityKeywords: ["crozet"],
    },
    {
      id: 'pantops',
      name: 'Pantops multi-family & corridors',
      shortName: 'Pantops',
      neighborhoods: ["Pantops","US-250 edges"],
      housingTypes: 'Multi-family, SFH',
      challenges: ["Building COIs","Arterial timing"],
      moverTips: 'Collect management packets; inventory elevators.',
      cityKeywords: ["pantops"],
    },
    {
      id: 'mountain',
      name: 'Mountain-edge rural-suburban lots',
      shortName: 'Mountain edge',
      neighborhoods: ["western approaches","mountain lots"],
      housingTypes: 'Larger lots, grades',
      challenges: ["Last-mile width","Grades","Empty miles"],
      moverTips: 'Photo approaches; confirm truck size early.',
      cityKeywords: ["albemarle mountain"],
    },
    {
      id: 'rural-south',
      name: 'Rural south & larger lots',
      shortName: 'Rural south',
      neighborhoods: ["southern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["albemarle south"],
    }
  ],
  specialized: [
    {
      id: 'uva-spill',
      title: 'UVA-adjacent term turnover',
      intro: 'Term calendars create multi-family clusters near the city line.',
      bullets: ["Book early around move-in/move-out weekends.","Expect short-notice multi-family demand."],
    },
    {
      id: 'mountain-last-mile',
      title: 'Mountain-edge last-mile logistics',
      intro: 'Grades rewrite truck size.',
      bullets: ["Photo approaches before surveys finalize.","Shuttle conversations beat stuck trailers."],
    },
    {
      id: 'central-va',
      title: 'I-64 / US-29 Central VA freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote NoVA multi-family rates for mountain lots."],
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
        intro: 'Albemarle families compare Albemarle County Schools and related options — verify boundaries; university housing patterns do not replace district maps for family SFH.',
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
            detail: 'UVA Health and regional clinics serve the market; map peak freeflow on US-29/I-64 corridors.',
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
    intro: 'Term spikes, mountain access, and empty miles often matter more than raw miles.',
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
    intro: 'UVA calendars and school years reshape demand more than NoVA office peaks alone.',
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
      { label: 'independent UVA / Charlottesville-area market (vs NoVA / Richmond defaults) movers (parent contrast)', href: '/local-movers/virginia/henrico' },
    ],
  },
});
