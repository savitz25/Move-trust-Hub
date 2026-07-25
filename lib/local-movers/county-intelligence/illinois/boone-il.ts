import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * boone â€” IL Tier 2 Wave 1
 */
export const booneCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'boone',
  hubTitle: 'Boone County Moving Intelligence Hub',
  eyebrow: 'Boone · Belvidere — Rockford east / I-90',
  h1: 'Moving in Boone County: Belvidere, Auto Manufacturing Edge & I-90 East Access',
  heroOpener:
    'Boone County is Rockford’s eastern I-90 manufacturing collar — Belvidere multi-story and seat stock, auto/industrial calendars, Poplar Grove and Capron edges, and freeflow that is not Winnebago continuous Rockford core with different labels. Expect plant report dates, mixed industrial-residential fabric, and Wisconsin-adjacent interstate risk under one county. This guide is for people moving in Boone as Rockford east collar — not a Rockford rename.',
  heroCredibility:
    'Rockford east collar · Belvidere manufacturing · I-90 · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-90 · US-20 · IL-76 · IL-173 · Business 20',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Winnebago County',
    parentHref: '/local-movers/illinois/winnebago',
    title: 'Compared with Winnebago County',
    intro:
      'Boone is Rockford east I-90 manufacturing collar — not Winnebago Rockford core multi-story alone and not pure rural northern freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Winnebago crews fight Rockford arterials and I-39/I-90 peaks. Boone pairs ride I-90, US-20, and IL-76 — freer mid-day east of the city, still peak-heavy on Belvidere arterials and plant shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Winnebago mixes Rockford multi-story and north/west HOAs. Boone mixes Belvidere multi-unit, manufacturing-edge SFH, and rural lots — more auto-corridor product, less continuous Rockford core density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; industrial-adjacent streets rewrite truck type; WI adjacency flips authority.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Boone quotes often sit near Rockford-east secondary rates for driveway SFH — multi-story access and empty miles still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Boone is Rockford east manufacturing collar — not Winnebago core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Boone County different',
    intro: 'I-90 freeflow, Belvidere multi-story, and auto-plant calendars — not interchangeable Rockford boilerplate.',
    bullets: [
      {
        title: 'I-90 freeflow is still billable',
        detail:
          'Boone ↔ Winnebago pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Belvidere multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure rural lots.',
      },
      {
        title: 'Auto/manufacturing calendars reshape mid-week demand',
        detail:
          'Plant report dates compete with Saturday family windows.',
      },
      {
        title: 'Wisconsin adjacency creates interstate legs',
        detail:
          'WI addresses require FMCSA authority even on short-looking hops.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Boone zones: Belvidere seat, manufacturing edge, Poplar Grove corridor & rural lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, industrial edges, corridor towns, and rural lots.',
  zones: [
    {
      id: 'belvidere',
      name: 'Belvidere multi-story & seat stock',
      shortName: 'Belvidere',
      neighborhoods: ["Belvidere","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-90 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["belvidere"],
    },
    {
      id: 'auto-edge',
      name: 'Auto / manufacturing-edge residential',
      shortName: 'Auto edge',
      neighborhoods: ["plant-adjacent SFH","industrial multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Shift traffic","Arterial timing"],
      moverTips: 'Prefer early starts; clarify hard report dates.',
      cityKeywords: ["belvidere industrial"],
    },
    {
      id: 'poplar-grove',
      name: 'Poplar Grove / Capron corridor',
      shortName: 'Poplar Grove',
      neighborhoods: ["Poplar Grove","Capron edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts for long pairs.',
      cityKeywords: ["poplar grove","capron"],
    },
    {
      id: 'rural-lots',
      name: 'Northern & eastern rural lots',
      shortName: 'Rural lots',
      neighborhoods: ["northern tracts","eastern lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["north boone","east boone"],
    }
  ],
  specialized: [
    {
      id: 'i90-east',
      title: 'I-90 Rockford-east freeflow',
      intro: 'East-collar pairs still peak hard toward Winnebago.',
      bullets: ["Price portal-to-portal honestly.","Clarify WI second addresses for interstate authority."],
    },
    {
      id: 'auto-calendars',
      title: 'Auto manufacturing calendar module',
      intro: 'Plant windows reshape mid-week demand.',
      bullets: ["Align surveys with report dates when possible.","Do not quote pure Rockford Saturday rates for plant-adjacent jobs."],
    },
    {
      id: 'belvidere-seat',
      title: 'Belvidere multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes â€” primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Boone families compare Belvidere, North Boone, and related district feeders — verify address boundaries; do not assume Rockford maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use ISBE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Belvidere-area clinics and Rockford specialty spillover serve the county; map peak I-90 times for ER access.',
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
    intro: 'I-90 freeflow, multi-story access, and manufacturing empty miles often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$450â€“$1,200+' },
      { label: '3â€“4 BR home', value: '$1,600â€“$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115â€“$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, plant calendars, and winter ice reshape demand by pocket.',
    items: [
      {
        title: 'Late spring â€“ early fall',
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
      'Official links first; directory listings are independent. Verify Illinois Commerce Commission (ICC) household goods authority for in-state Illinois moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Winnebago County movers (parent contrast)',
        href: '/local-movers/illinois/winnebago',
      },

    ],
  },
});
