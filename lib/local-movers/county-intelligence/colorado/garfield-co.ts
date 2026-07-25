import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * garfield â€” CO Tier 2 Wave 1
 */
export const garfieldCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'garfield',
  hubTitle: 'Garfield County Moving Intelligence Hub',
  eyebrow: 'Garfield · Glenwood Springs / Rifle — mid-Western Slope',
  h1: 'Moving in Garfield County: Glenwood Springs, Rifle & Mid-Slope I-70 Access',
  heroOpener:
    'Garfield County is mid-Western Slope I-70 product — Glenwood Springs multi-story and seat density, Rifle multi-family and industrial-edge stock, Carbondale and New Castle edges, and freeflow that is not Vail/Eagle resort-core product with different labels. Expect canyon approaches, energy calendars, and longer empty miles under one county. This guide is for people moving in Garfield as mid-slope secondary — not an Eagle rename.',
  heroCredibility:
    'Mid-Western Slope · Glenwood / Rifle · I-70 mid-slope · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-70 · CO-82 · CO-13 · US-6 · Grand Avenue corridor',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Eagle County',
    parentHref: '/local-movers/colorado/eagle',
    title: 'Compared with Eagle County',
    intro:
      'Garfield is mid-slope Glenwood/Rifle product on I-70 — not Eagle Vail/Edwards resort-core density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Eagle crews fight Vail/Edwards tourism peaks. Garfield pairs ride I-70 and CO-82 — freer mid-day mid-slope freeflow, still peak-heavy on Glenwood arterials and Rifle industrial windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Eagle mixes resort multi-story and planned multi-family. Garfield mixes Glenwood multi-story, Rifle multi-unit, and canyon-edge SFH — more mid-slope working-town product, less continuous resort-association density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Canyon streets need curb plans; multi-family elevators appear on growth edges; industrial streets rewrite truck type.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Garfield quotes often track mid-slope secondary rates for driveway SFH — multi-story Glenwood access and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Garfield is mid-Western Slope secondary — not Eagle resort core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Garfield County different',
    intro: 'Glenwood multi-story, Rifle industrial edges, and I-70 mid-slope freeflow — not interchangeable Vail boilerplate.',
    bullets: [
      {
        title: 'Distinct from Eagle/Vail resort-core assumptions',
        detail:
          'Do not recycle Vail association day rates alone.',
      },
      {
        title: 'Glenwood multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure Rifle lots.',
      },
      {
        title: 'I-70 freeflow is still billable',
        detail:
          'Mid-slope pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Energy calendars reshape mid-week demand in Rifle corridors',
        detail:
          'Shift patterns rewrite pure Saturday residential assumptions.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Garfield zones: Glenwood multi-story, Rifle multi-family, Carbondale edges & rural canyon lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, industrial multi-family, valley edges, and rural lots.',
  zones: [
    {
      id: 'glenwood',
      name: 'Glenwood Springs multi-story & seat stock',
      shortName: 'Glenwood',
      neighborhoods: ["Glenwood Springs","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-70 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["glenwood springs"],
    },
    {
      id: 'rifle',
      name: 'Rifle multi-family & industrial-edge stock',
      shortName: 'Rifle',
      neighborhoods: ["Rifle","industrial multi-family"],
      housingTypes: 'Multi-family, SFH, mixed stock',
      challenges: ["Shift traffic","Elevators/stairs","Arterial timing"],
      moverTips: 'Prefer early starts; survey last-mile on industrial streets.',
      cityKeywords: ["rifle"],
    },
    {
      id: 'carbondale',
      name: 'Carbondale / New Castle valley edges',
      shortName: 'Carbondale edges',
      neighborhoods: ["Carbondale","New Castle","CO-82 edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Tourism freeflow"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["carbondale","new castle"],
    },
    {
      id: 'rural-canyon',
      name: 'Rural canyon & mountain lots',
      shortName: 'Rural canyon',
      neighborhoods: ["rural tracts","canyon approaches"],
      housingTypes: 'Larger lots, mountain approaches',
      challenges: ["Empty miles","Grades","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["rural garfield"],
    }
  ],
  specialized: [
    {
      id: 'vs-eagle',
      title: 'Garfield vs Eagle resort-core',
      intro: 'Mid-slope working towns differ from Vail/Edwards association density.',
      bullets: ["Do not recycle Vail association day rates alone.","Clarify Eagle second addresses for drive-time assumptions."],
    },
    {
      id: 'glenwood-seat',
      title: 'Glenwood multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i70-mid',
      title: 'I-70 mid-slope freeflow',
      intro: 'Mid-slope pairs still peak hard on arterials.',
      bullets: ["Price portal-to-portal honestly.","Monitor canyon and pass conditions in season."],
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
        intro: 'Garfield families compare Roaring Fork, Rifle RE-2, and related district feeders — verify address boundaries; do not assume Eagle maps apply.',
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
            detail: 'Valley View Hospital and Grand River Health (Rifle) anchor acute care; map peak I-70 times for ER access.',
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
    intro: 'Multi-story access, I-70 freeflow, and industrial empty miles often matter more than raw miles.',
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
    intro: 'Tourism shoulders, energy calendars, school years, and winter ice reshape demand by pocket.',
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
        label: 'Eagle County movers (parent contrast)',
        href: '/local-movers/colorado/eagle',
      },

    ],
  },
});
