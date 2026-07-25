import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** charlottesville — VA Tier 2 Wave 2 */
export const charlottesvilleCityVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'charlottesville',
  hubTitle: 'Charlottesville Moving Intelligence Hub',
  eyebrow: 'Charlottesville · UVA / Downtown Mall · vs Albemarle',
  h1: 'Moving in Charlottesville: Independent City Beside the University of Virginia',
  heroOpener: 'Charlottesville is a compact independent city wrapped by Albemarle County — UVA, Downtown Mall, Belmont-scale neighborhoods, and tight historic streets that are not an Albemarle ZIP rename. Expect city parking rules, student turnover, and city/county line confusion on continuous-looking addresses. This guide is for people moving in Charlottesville as independent-city density product.',
  heroCredibility: 'Independent city · UVA-adjacent · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-29 · US-250 · I-64 edge · SR-20 · Emmet Street corridor',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Albemarle County',
    parentHref: '/local-movers/virginia/albemarle',
    title: 'Compared with Albemarle County',
    intro: 'Charlottesville city government and schools differ from Albemarle County rules surrounding the city — compact density the county estate packs understate.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Albemarle pairs lean Crozet, Pantops, and mountain-edge lots. Charlottesville pairs fight Mall staging, campus multi-family, and compact street grids.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Albemarle mixes estates and planned growth. Charlottesville mixes Downtown Mall multi-story, UVA-adjacent apartments, and Belmont residential fabric.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Tight historic streets and elevator buildings rewrite truck size more often than pure county driveway SFH.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'City multi-family can price above pure Albemarle driveway rates once elevators and curb rules appear.',
      },
      {
        title: 'Role difference',
        detail: 'Charlottesville is independent city identity — not Albemarle renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Charlottesville different',
    intro: 'City density, UVA peaks, and jurisdiction lines — not an Albemarle clone.',
    bullets: [
      {
        title: 'Independent city density',
        detail: 'Compact street grids and event calendars punish vague ETAs.',
      },
      {
        title: 'UVA-driven logistics',
        detail: 'Move-in/out windows and hospital shift housing need explicit scoping.',
      },
      {
        title: 'City vs Albemarle line',
        detail: 'The most common quote failure is treating county and city as interchangeable.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Charlottesville zones: Downtown Mall, UVA/hospital west, Belmont south & city/county line',
  zonesIntro: 'Two to four sharp products under one compact-city label.',
  zones: [
    {
      id: 'downtown-mall',
      name: 'Downtown Mall & city core',
      shortName: 'Downtown Mall',
      neighborhoods: ["Downtown Mall","city core"],
      housingTypes: 'Pedestrian mall edge, dense streets',
      challenges: ["Strict staging","Time windows"],
      moverTips: 'Build Mall and game-day buffers.',
      cityKeywords: ["downtown mall","charlottesville"],
    },
    {
      id: 'uva',
      name: 'UVA / hospital west',
      shortName: 'UVA west',
      neighborhoods: ["UVA area","hospital west"],
      housingTypes: 'Campus and medical adjacency',
      challenges: ["Student peaks","Staff housing"],
      moverTips: 'Ask about apartment elevator reservations.',
      cityKeywords: ["uva"],
    },
    {
      id: 'belmont',
      name: 'Belmont, Fifeville & south city',
      shortName: 'Belmont',
      neighborhoods: ["Belmont","Fifeville"],
      housingTypes: 'Residential fabric, varied housing age',
      challenges: ["Street parking competition"],
      moverTips: 'Photo staging options early.',
      cityKeywords: ["belmont","fifeville"],
    },
    {
      id: 'city-line',
      name: 'City/county line neighborhoods',
      shortName: 'City line',
      neighborhoods: ["city/county edge"],
      housingTypes: 'Addresses that look continuous but change jurisdiction',
      challenges: ["Jurisdiction confusion"],
      moverTips: 'Always pin city vs Albemarle.',
      cityKeywords: ["charlottesville line"],
    }
  ],
  specialized: [
    {
      id: 'city-density',
      title: 'Independent city density',
      intro: 'Compact street grids and event calendars punish vague ETAs.',
      bullets: ["Build Mall and game-day buffers."],
    },
    {
      id: 'uva-logistics',
      title: 'UVA-driven logistics',
      intro: 'Move-in/out windows and hospital shift housing need explicit scoping.',
      bullets: ["Book early around term windows."],
    },
    {
      id: 'city-county',
      title: 'City vs Albemarle line',
      intro: 'The most common quote failure is treating county and city as interchangeable.',
      bullets: ["Confirm jurisdiction on every estimate."],
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
        intro: 'Charlottesville families compare Charlottesville City Schools feeders — verify boundaries; do not assume Albemarle maps apply.',
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
            detail: 'UVA Health University Hospital and Sentara Martha Jefferson anchor care; map compact-city freeflow at peaks.',
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
    intro: 'Jurisdiction errors, campus access, and curb rules often matter more than raw miles.',
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
    intro: 'UVA calendars and school years reshape demand more than pure county closing seasons alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, tourism, or plant windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Albemarle County movers (parent contrast)', href: '/local-movers/virginia/albemarle' },
    ],
  },
});
