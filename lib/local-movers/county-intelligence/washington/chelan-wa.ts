import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * chelan â€” WA Tier 2 Wave 1
 */
export const chelanCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'chelan',
  hubTitle: 'Chelan County Moving Intelligence Hub',
  eyebrow: 'Chelan · Wenatchee — north-central valley',
  h1: 'Moving in Chelan County: Wenatchee, River Valley & US-2 / US-97 Access',
  heroOpener:
    'Chelan County is north-central Washington river-valley product — Wenatchee multi-story and multi-family stock, East Wenatchee-edge approaches (clarify Douglas County lines), Cashmere and Leavenworth tourism edges, and freeflow on US-2 / US-97 that is not Puget Sound product with different labels. Expect agricultural calendars, tourism peaks, and mountain-approach last-mile under one county. This guide is for people moving in Chelan as independent north-central WA — not a Cascade/Puget rename.',
  heroCredibility:
    'North-central river valley · Wenatchee hub · US-2 / US-97 · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-2 · US-97 · SR-285 · SR-150 · Wenatchee Ave corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent north-central Washington (vs Puget Sound defaults)',
    parentHref: '/local-movers/washington/king',
    title: 'Compared with independent north-central Washington (vs Puget Sound defaults)',
    intro:
      'Chelan is independent north-central river-valley hub on US-2/97 — not King Puget Sound multi-family density and not pure mountain resort freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'King crews fight I-5/I-405 metro peaks. Chelan pairs ride US-2, US-97, and valley arterials — freer mid-day valley freeflow, still peak-heavy on Wenatchee arterials, harvest windows, and Leavenworth tourism weekends.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'King mixes elevators and Eastside HOAs. Chelan mixes Wenatchee multi-story, multi-family growth, and mountain-edge SFH — more river-valley product, less continuous Sound multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; tourism multi-family needs packets; mountain approaches rewrite truck size.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Chelan quotes often track north-central secondary rates for multi-story access — tourism peaks and grades can price above quiet valley driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Chelan is independent north-central river valley — not Puget Sound product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Chelan County different',
    intro: 'Wenatchee multi-story, tourism peaks, and US-2 freeflow — not interchangeable Puget Sound boilerplate.',
    bullets: [
      {
        title: 'Agricultural calendars reshape mid-week demand',
        detail:
          'Harvest windows rewrite pure Saturday residential assumptions.',
      },
      {
        title: 'Leavenworth tourism peaks rewrite weekends',
        detail:
          'Seasonal volume stacks around major tourism windows.',
      },
      {
        title: 'Wenatchee multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure rural lots.',
      },
      {
        title: 'Mountain approaches rewrite truck size',
        detail:
          'Photo last-mile before promising full trailers.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Chelan zones: Wenatchee multi-story, multi-family growth, Cashmere/Leavenworth edges & rural valley lots',
  zonesIntro: 'Two to four sharp products — hub multi-story, multi-family growth, tourism edges, and rural lots.',
  zones: [
    {
      id: 'wenatchee',
      name: 'Wenatchee multi-story & multi-unit',
      shortName: 'Wenatchee',
      neighborhoods: ["Wenatchee","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","US-2 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["wenatchee"],
    },
    {
      id: 'multi-growth',
      name: 'Wenatchee multi-family growth edges',
      shortName: 'Multi-family growth',
      neighborhoods: ["growth multi-family","HOA edges"],
      housingTypes: 'Multi-family, apartments, townhomes',
      challenges: ["Elevators","Lease clusters"],
      moverTips: 'Collect elevator COIs; prefer early starts.',
      cityKeywords: ["wenatchee multi"],
    },
    {
      id: 'leavenworth',
      name: 'Cashmere / Leavenworth tourism edges',
      shortName: 'Tourism edges',
      neighborhoods: ["Cashmere","Leavenworth","tourism multi-family"],
      housingTypes: 'Multi-family, SFH, tourism stock',
      challenges: ["Tourism peaks","Narrow approaches","Grades"],
      moverTips: 'Book around tourism peaks; photo last-mile.',
      cityKeywords: ["leavenworth","cashmere"],
    },
    {
      id: 'rural-valley',
      name: 'Rural river valley lots',
      shortName: 'Rural valley',
      neighborhoods: ["rural tracts","orchard edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; soft ground after irrigation can block heavy trucks.',
      cityKeywords: ["rural chelan"],
    }
  ],
  specialized: [
    {
      id: 'valley-hub',
      title: 'Wenatchee valley hub module',
      intro: 'Hub multi-story and medical corridors dominate volume.',
      bullets: ["Inventory stairs and curb width.","Do not recycle Puget Sound day rates alone."],
    },
    {
      id: 'tourism-peaks',
      title: 'Leavenworth tourism peak module',
      intro: 'Seasonal weekends rewrite staging.',
      bullets: ["Book capacity early for peak seasons.","Build arterial buffers for festival windows."],
    },
    {
      id: 'us2-freeflow',
      title: 'US-2 / US-97 freeflow',
      intro: 'Valley pairs still peak hard; Sound legs are distance work.',
      bullets: ["Price portal-to-portal honestly.","Clarify King second addresses for long empty-mile assumptions."],
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
        intro: 'Chelan families compare Wenatchee, Cascade, Cashmere, and related district feeders — verify address boundaries; clarify East Wenatchee / Douglas County lines.',
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
            detail: 'Confluence Health campuses anchor acute care; map peak US-2 / arterial times for ER access.',
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
    intro: 'Multi-story access, tourism peaks, and mountain last-mile often matter more than raw miles.',
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
    intro: 'Harvest windows, tourism peaks, school years, and winter ice reshape demand by pocket.',
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
        label: 'independent north-central Washington (vs Puget Sound defaults) movers (parent contrast)',
        href: '/local-movers/washington/king',
      },

    ],
  },
});
