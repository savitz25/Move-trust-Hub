import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * pueblo â€” CO Tier 2 Wave 1
 */
export const puebloCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'pueblo',
  hubTitle: 'Pueblo County Moving Intelligence Hub',
  eyebrow: 'Pueblo · southern Front Range independent city-region',
  h1: 'Moving in Pueblo County: Pueblo City, Industrial Edges & I-25 South Access',
  heroOpener:
    'Pueblo County is southern Front Range independent city-region product — Pueblo multi-story and seat stock, industrial-residential edges, Pueblo West growth, and freeflow on I-25 / US-50 that is not Colorado Springs El Paso product with different labels. Expect steel/industrial calendars, river-adjacent approaches, and longer empty miles under one county. This guide is for people moving in Pueblo as southern Front Range hub — not a Colorado Springs rename.',
  heroCredibility:
    'Southern Front Range independent · Pueblo city multi-story · I-25 south · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-25 · US-50 · CO-47 · Pueblo Blvd · Northern Ave corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'El Paso County',
    parentHref: '/local-movers/colorado/el-paso',
    title: 'Compared with El Paso County',
    intro:
      'Pueblo is southern Front Range industrial/residential independent product on I-25 — not El Paso Colorado Springs multi-family density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'El Paso crews fight I-25 peaks into Colorado Springs and Powers corridors. Pueblo pairs ride I-25 and US-50 — freer mid-day further south, still peak-heavy on Pueblo arterials and industrial shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'El Paso mixes Springs multi-family and north-growth HOAs. Pueblo mixes city multi-story, industrial-edge SFH, and Pueblo West planned stock — more discontinuous industrial city product, less continuous Springs growth density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; industrial streets rewrite truck type; Pueblo West HOAs add packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Pueblo quotes often sit at southern Front Range secondary rates for driveway SFH — multi-story access and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Pueblo is southern Front Range independent city-region — not Colorado Springs product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Pueblo County different',
    intro: 'Industrial calendars, city multi-story, and I-25 south freeflow — not interchangeable Springs boilerplate.',
    bullets: [
      {
        title: 'I-25 freeflow is still billable',
        detail:
          'Pueblo ↔ El Paso pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Pueblo multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from Pueblo West cul-de-sacs.',
      },
      {
        title: 'Industrial calendars reshape mid-week demand',
        detail:
          'Shift patterns rewrite pure Saturday residential assumptions.',
      },
      {
        title: 'Pueblo West HOA growth differs from pure city stock',
        detail:
          'Gate lists and approved hours are standard survey inputs.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Pueblo zones: city multi-story, industrial edges, Pueblo West growth & rural lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, industrial-residential, HOA growth, and rural lots.',
  zones: [
    {
      id: 'pueblo-city',
      name: 'Pueblo multi-story & seat stock',
      shortName: 'Pueblo city',
      neighborhoods: ["Pueblo","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-25 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["pueblo"],
    },
    {
      id: 'industrial',
      name: 'Industrial-edge residential',
      shortName: 'Industrial edge',
      neighborhoods: ["industrial multi-family","steel-edge SFH"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Shift traffic","Arterial timing"],
      moverTips: 'Prefer early starts; survey last-mile on industrial streets.',
      cityKeywords: ["pueblo industrial"],
    },
    {
      id: 'pueblo-west',
      name: 'Pueblo West HOA growth',
      shortName: 'Pueblo West',
      neighborhoods: ["Pueblo West","growth villages"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","US-50 freeflow"],
      moverTips: 'Collect HOA COIs; prefer early starts.',
      cityKeywords: ["pueblo west"],
    },
    {
      id: 'rural-lots',
      name: 'Southern & rural lots',
      shortName: 'Rural lots',
      neighborhoods: ["southern tracts","rural approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; prefer early starts for long pairs.',
      cityKeywords: ["south pueblo"],
    }
  ],
  specialized: [
    {
      id: 'i25-south',
      title: 'I-25 southern Front Range freeflow',
      intro: 'South pairs still peak hard toward El Paso.',
      bullets: ["Price portal-to-portal honestly.","Clarify Colorado Springs second addresses early."],
    },
    {
      id: 'city-multi',
      title: 'Pueblo multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'industrial-calendars',
      title: 'Industrial calendar module',
      intro: 'Plant windows reshape mid-week demand.',
      bullets: ["Clarify hard report dates early.","Do not quote pure Springs HOA Saturday rates for industrial-edge jobs."],
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
        intro: 'Pueblo families compare Pueblo City 60, Pueblo County 70, and related district feeders — verify address boundaries; do not assume El Paso maps apply.',
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
            detail: 'Parkview Medical Center and UCHealth Parkview campuses anchor acute care; map peak I-25 times for ER access.',
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
    intro: 'Multi-story access, I-25 freeflow, and industrial empty miles often matter more than raw miles.',
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
    intro: 'School years, industrial calendars, and winter ice reshape demand by pocket.',
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
        label: 'El Paso County movers (parent contrast)',
        href: '/local-movers/colorado/el-paso',
      },

    ],
  },
});
