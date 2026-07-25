import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeWaTier2Pack,
  WA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/washington/wa-tier2-shared';

/**
 * walla-walla â€” WA Tier 2 Wave 1
 */
export const wallaWallaCountyWaTier2Intelligence: CountyIntelligencePack = finalizeWaTier2Pack({
  countySlug: 'walla-walla',
  hubTitle: 'Walla Walla County Moving Intelligence Hub',
  eyebrow: 'Walla Walla · southeast valley',
  h1: 'Moving in Walla Walla County: Walla Walla Valley, College Edges & US-12 Access',
  heroOpener:
    'Walla Walla County is southeast Washington independent valley product — Walla Walla multi-story and multi-family stock, college-adjacent density, College Place and rural valley edges, and freeflow on US-12 that is not Tri-Cities continuous multi-family with different labels. Expect college calendars, tourism shoulders, and longer empty miles under one county. This guide is for people moving in Walla Walla as independent SE valley — not a Tri-Cities rename.',
  heroCredibility:
    'SE valley independent · College + residential · US-12 freeflow · WA UTC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-12 · SR-125 · SR-124 · Isaacs Ave corridors',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent SE Washington (vs Tri-Cities defaults)',
    parentHref: '/local-movers/washington/benton',
    title: 'Compared with independent SE Washington (vs Tri-Cities defaults)',
    intro:
      'Walla Walla is independent SE valley college/residential product — not Benton Tri-Cities employment multi-family density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Benton crews fight Kennewick/Richland arterials and bridge peaks. Walla Walla pairs ride US-12 and valley arterials — freer mid-day SE freeflow, still peak-heavy on Walla Walla arterials and college term windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Benton mixes employment multi-family and West Richland HOAs. Walla Walla mixes city multi-story, college multi-family, and valley SFH — more college-town product, less continuous Tri-Cities employment density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; college multi-family needs COIs; rural lots add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Walla Walla quotes often track SE secondary rates for multi-story access — term peaks and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Walla Walla is independent SE valley hub — not Tri-Cities product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Walla Walla County different',
    intro: 'College multi-family, valley multi-story, and US-12 freeflow — not interchangeable Tri-Cities boilerplate.',
    bullets: [
      {
        title: 'College term calendars drive demand spikes',
        detail:
          'Move-in/out weekends fill crews near campus. Book early.',
      },
      {
        title: 'Walla Walla multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure rural lots.',
      },
      {
        title: 'US-12 freeflow is still billable',
        detail:
          'SE pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Tri-Cities employment multi-family defaults',
        detail:
          'Do not recycle Kennewick day rates alone.',
      },
      WA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Walla Walla zones: city multi-story, college multi-family, College Place edges & rural valley lots',
  zonesIntro: 'Two to four sharp products — hub multi-story, college multi-family, edge multi-family, and rural lots.',
  zones: [
    {
      id: 'ww-city',
      name: 'Walla Walla multi-story & multi-unit',
      shortName: 'Walla Walla city',
      neighborhoods: ["Walla Walla","downtown edges","city multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","US-12 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["walla walla"],
    },
    {
      id: 'college',
      name: 'College multi-family corridors',
      shortName: 'College multi',
      neighborhoods: ["college multi-family","campus edges"],
      housingTypes: 'Multi-family, apartments, some SFH',
      challenges: ["Term parking","COI packets","Elevators"],
      moverTips: 'Book around term calendars; collect building rules.',
      cityKeywords: ["walla walla college"],
    },
    {
      id: 'college-place',
      name: 'College Place / edge multi-family',
      shortName: 'College Place',
      neighborhoods: ["College Place","edge multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["college place"],
    },
    {
      id: 'rural-valley',
      name: 'Rural SE valley lots',
      shortName: 'Rural valley',
      neighborhoods: ["rural tracts","ag-edge lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Survey approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["rural walla walla"],
    }
  ],
  specialized: [
    {
      id: 'se-valley',
      title: 'SE valley hub multi-story module',
      intro: 'City multi-story and college multi-family dominate volume.',
      bullets: ["Inventory stairs and elevators.","Do not recycle Tri-Cities day rates alone."],
    },
    {
      id: 'college-terms',
      title: 'College move-cycle module',
      intro: 'Term calendars drive demand spikes.',
      bullets: ["Book early around move-in/out weekends.","Price campus-edge curb time honestly."],
    },
    {
      id: 'us12-freeflow',
      title: 'US-12 SE freeflow',
      intro: 'SE pairs still peak hard; Tri-Cities legs need clear county lines.',
      bullets: ["Price portal-to-portal honestly.","Clarify Benton second addresses early."],
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
        intro: 'Walla Walla families compare Walla Walla, College Place, and related district feeders — verify address boundaries.',
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
            detail: 'Providence St. Mary and regional specialty spillover serve the county; map peak US-12 times for ER access.',
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
    intro: 'Multi-story access, term peaks, and empty miles often matter more than raw miles.',
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
    intro: 'College calendars, tourism shoulders, school years, and harvest windows reshape demand by pocket.',
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
        label: 'independent SE Washington (vs Tri-Cities defaults) movers (parent contrast)',
        href: '/local-movers/washington/benton',
      },

    ],
  },
});
