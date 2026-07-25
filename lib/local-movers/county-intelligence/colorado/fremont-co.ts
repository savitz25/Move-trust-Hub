import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * fremont â€” CO Tier 2 Wave 1
 */
export const fremontCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'fremont',
  hubTitle: 'Fremont County Moving Intelligence Hub',
  eyebrow: 'Fremont · Cañon City — Arkansas River valley',
  h1: 'Moving in Fremont County: Cañon City, Arkansas Valley & US-50 Access',
  heroOpener:
    'Fremont County is south-central Arkansas River valley product — Cañon City multi-story and seat stock, Florence multi-family edges, Penrose and rural valley lots, and freeflow on US-50 that is not Pueblo continuous city product with different labels. Expect tourism and institutional calendars, canyon approaches, and longer empty miles under one county. This guide is for people moving in Fremont as south-central valley secondary — not a Pueblo rename.',
  heroCredibility:
    'Arkansas Valley · Cañon City · US-50 freeflow · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-50 · CO-115 · CO-67 · CO-9 · Royal Gorge corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Pueblo County',
    parentHref: '/local-movers/colorado/pueblo',
    title: 'Compared with Pueblo County',
    intro:
      'Fremont is south-central Arkansas Valley multi-story product on US-50 — not Pueblo continuous industrial city density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Pueblo crews fight I-25 and city arterials. Fremont pairs ride US-50 and CO-115 — freer mid-day west of Pueblo, still peak-heavy on Cañon City arterials and tourism weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Pueblo mixes city multi-story and industrial-edge SFH. Fremont mixes Cañon multi-unit, Florence multi-family, and valley lots — more discontinuous valley product, less continuous industrial density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; canyon approaches rewrite truck size; rural lots add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Fremont quotes often sit at south-central secondary rates for driveway SFH — multi-story access and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Fremont is Arkansas Valley secondary — not Pueblo product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Fremont County different',
    intro: 'Cañon multi-story, US-50 freeflow, and valley empty miles — not interchangeable Pueblo boilerplate.',
    bullets: [
      {
        title: 'US-50 freeflow is still billable',
        detail:
          'Fremont ↔ Pueblo pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Cañon City multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure rural lots.',
      },
      {
        title: 'Tourism peaks rewrite weekends near gorge corridors',
        detail:
          'Seasonal volume stacks around major tourism windows.',
      },
      {
        title: 'Empty miles from Pueblo yards are real',
        detail:
          'Even “local” Fremont pairs can price as distance work for Pueblo-based crews.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Fremont zones: Cañon multi-story, Florence multi-family, Penrose edges & rural valley lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, multi-family edges, corridor towns, and rural lots.',
  zones: [
    {
      id: 'canon-city',
      name: 'Cañon City multi-story & seat stock',
      shortName: 'Cañon City',
      neighborhoods: ["Cañon City","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","US-50 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["canon city","cañon city"],
    },
    {
      id: 'florence',
      name: 'Florence multi-family edges',
      shortName: 'Florence',
      neighborhoods: ["Florence","multi-family corridors"],
      housingTypes: 'Multi-family, SFH, mixed stock',
      challenges: ["Elevators/stairs","Arterial timing"],
      moverTips: 'Confirm elevator rules; prefer early starts.',
      cityKeywords: ["florence co"],
    },
    {
      id: 'penrose',
      name: 'Penrose / CO-115 corridor edges',
      shortName: 'Penrose',
      neighborhoods: ["Penrose","CO-115 multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["penrose"],
    },
    {
      id: 'rural-valley',
      name: 'Rural Arkansas valley lots',
      shortName: 'Rural valley',
      neighborhoods: ["rural tracts","canyon approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["rural fremont"],
    }
  ],
  specialized: [
    {
      id: 'vs-pueblo',
      title: 'Fremont vs Pueblo distinction',
      intro: 'Arkansas Valley product differs from continuous Pueblo industrial density.',
      bullets: ["Do not recycle Pueblo day rates alone.","Clarify Pueblo second addresses for drive-time assumptions."],
    },
    {
      id: 'canon-seat',
      title: 'Cañon City multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'us50-freeflow',
      title: 'US-50 valley freeflow',
      intro: 'Valley pairs still peak hard on arterials.',
      bullets: ["Price portal-to-portal honestly.","Build tourism-weekend buffers near gorge corridors."],
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
        intro: 'Fremont families compare Cañon City RE-1, Florence RE-2, and related district feeders — verify address boundaries; do not assume Pueblo maps apply.',
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
            detail: 'St. Thomas More Hospital and Pueblo specialty spillover serve the county; map peak US-50 times for ER access.',
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
    intro: 'Multi-story access, US-50 freeflow, and empty miles from Pueblo yards often matter more than raw miles.',
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
    intro: 'Tourism summers, school years, and winter ice reshape demand by pocket.',
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
        label: 'Pueblo County movers (parent contrast)',
        href: '/local-movers/colorado/pueblo',
      },

    ],
  },
});
