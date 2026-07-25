import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * kittitas â€” WA Tier 2 Wave 1
 */
export const kittitasCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'kittitas',
  hubTitle: 'Kittitas County Moving Intelligence Hub',
  eyebrow: 'Kittitas · Ellensburg — I-90 central Cascades east',
  h1: 'Moving in Kittitas County: Ellensburg, CWU Cycles & I-90 East Access',
  heroOpener:
    'Kittitas County is central Cascades-east independent product — Ellensburg multi-story and CWU-adjacent multi-family, Cle Elum and mountain-edge approaches, rural valley lots, and freeflow on I-90 that is not King Puget Sound multi-family with different labels. Expect university calendars, pass weather, and longer empty miles under one county. This guide is for people moving in Kittitas as independent I-90 university market — not a Seattle-collar rename.',
  heroCredibility:
    'I-90 university market · Ellensburg / CWU · Pass weather · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-90 · US-97 · SR-10 · SR-903 · University Way corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent I-90 university (nearest hub contrast: King)',
    parentHref: '/local-movers/washington/king',
    title: 'Compared with independent I-90 university (nearest hub contrast: King)',
    intro:
      'Kittitas is independent I-90 Ellensburg university product — not King Puget Sound multi-family density and not pure mountain freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'King crews fight I-5/I-405 metro peaks. Kittitas pairs ride I-90 and valley arterials — freer mid-day east of the Cascades, still peak-heavy on Ellensburg arterials, CWU term windows, and pass closures.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'King mixes elevators and Eastside HOAs. Kittitas mixes Ellensburg multi-story, CWU multi-family, and Cle Elum mountain-edge SFH — more university-town product, less continuous Sound multi-family density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Campus multi-family needs COIs; seat multi-story needs curb plans; mountain approaches rewrite truck size and winter staging.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Kittitas quotes often track I-90 secondary rates for multi-story access — term peaks and pass weather can price above quiet rural lots.',
      },
      {
        title: 'Role difference',
        detail:
          'Kittitas is independent I-90 university market — not Puget Sound product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Kittitas County different',
    intro: 'CWU term calendars, Ellensburg multi-story, and I-90 pass freeflow — not interchangeable Seattle boilerplate.',
    bullets: [
      {
        title: 'CWU term calendars drive demand spikes',
        detail:
          'Move-in/out weekends fill crews near campus. Book early.',
      },
      {
        title: 'Ellensburg multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure rural lots.',
      },
      {
        title: 'I-90 pass freeflow is still billable',
        detail:
          'Pass conditions and peaks rewrite short-looking pairs. Ask portal-to-portal.',
      },
      {
        title: 'Long empty miles from Puget Sound yards are real',
        detail:
          'Even “in-state” pairs can price as distance work for King-based crews.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Kittitas zones: Ellensburg multi-story, CWU multi-family, Cle Elum edges & rural valley lots',
  zonesIntro: 'Two to four sharp products — hub multi-story, campus multi-family, mountain edges, and rural lots.',
  zones: [
    {
      id: 'ellensburg',
      name: 'Ellensburg multi-story & multi-unit',
      shortName: 'Ellensburg',
      neighborhoods: ["Ellensburg","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-90 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["ellensburg"],
    },
    {
      id: 'cwu',
      name: 'CWU campus-edge multi-family',
      shortName: 'CWU edge',
      neighborhoods: ["campus multi-family","student stock"],
      housingTypes: 'Multi-family, apartments, some SFH',
      challenges: ["Term parking","COI packets","Elevators"],
      moverTips: 'Book around term calendars; collect building rules.',
      cityKeywords: ["cwu","central washington"],
    },
    {
      id: 'cle-elum',
      name: 'Cle Elum / mountain-edge approaches',
      shortName: 'Cle Elum',
      neighborhoods: ["Cle Elum","Roslyn edges","mountain SFH"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Grades","Empty miles","Winter ice"],
      moverTips: 'Photo last-mile; winter mornings need flexibility.',
      cityKeywords: ["cle elum","roslyn"],
    },
    {
      id: 'rural-valley',
      name: 'Rural Kittitas valley lots',
      shortName: 'Rural valley',
      neighborhoods: ["rural tracts","valley approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Survey approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["rural kittitas"],
    }
  ],
  specialized: [
    {
      id: 'cwu-cycles',
      title: 'CWU university move-cycle module',
      intro: 'Term calendars drive demand spikes.',
      bullets: ["Book early around move-in/out weekends.","Price campus-edge curb time honestly."],
    },
    {
      id: 'i90-pass',
      title: 'I-90 pass freeflow',
      intro: 'Pass conditions rewrite freeflow assumptions.',
      bullets: ["Price portal-to-portal honestly.","Monitor closures and chain laws in season."],
    },
    {
      id: 'vs-sound',
      title: 'Kittitas vs Puget Sound distinction',
      intro: 'I-90 university product differs from Sound multi-family density.',
      bullets: ["Do not recycle Seattle day rates alone.","Clarify King second addresses for long empty-mile assumptions."],
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
        intro: 'Kittitas families compare Ellensburg, Cle Elum-Roslyn, and related district feeders — verify address boundaries.',
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
            detail: 'Kittitas Valley Healthcare and regional specialty spillover serve the county; map peak I-90 times for ER access.',
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
    intro: 'Term peaks, multi-story access, and pass freeflow often matter more than raw miles.',
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
    intro: 'University calendars, school years, and winter pass weather reshape demand by pocket.',
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
        label: 'independent I-90 university (nearest hub contrast: King) movers (parent contrast)',
        href: '/local-movers/washington/king',
      },

    ],
  },
});
