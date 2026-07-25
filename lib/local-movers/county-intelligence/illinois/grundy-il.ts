import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * grundy â€” IL Tier 2 Wave 1
 */
export const grundyCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'grundy',
  hubTitle: 'Grundy County Moving Intelligence Hub',
  eyebrow: 'Grundy · Morris — I-80 southwest industrial/residential',
  h1: 'Moving in Grundy County: Morris, I-80 Energy Edge & Southwest Industrial Access',
  heroOpener:
    'Grundy County is I-80 southwest industrial-residential product — Morris multi-story and seat stock, energy/industrial corridor freeflow, Coal City and Minooka edges, and empty miles that are not Will County continuous suburb with different labels. Expect plant and energy calendars, mixed mill-era stock, and I-80 portal time under one county. This guide is for people moving in Grundy as I-80 industrial edge — not a Will rename.',
  heroCredibility:
    'I-80 industrial edge · Morris seat · Energy/residential mix · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-80 · IL-47 · IL-113 · US-6 · IL-170',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Will County',
    parentHref: '/local-movers/illinois/will',
    title: 'Compared with Will County',
    intro:
      'Grundy is I-80 energy/industrial edge residential — not Will continuous south-collar HOA density and not pure rural prairie freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Will crews fight I-55/I-80 peaks into Joliet. Grundy pairs ride I-80, IL-47, and US-6 — freer mid-day west of Will density, still peak-heavy on Morris arterials and industrial shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Will mixes Joliet multi-story and south-collar HOAs. Grundy mixes Morris multi-unit, industrial-edge SFH, and Coal City/Minooka stock — more energy-corridor product, less continuous Will growth density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; industrial-adjacent streets rewrite truck type; rural edges add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Grundy quotes often sit at I-80 secondary rates for driveway SFH — multi-story access and industrial freeflow still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Grundy is I-80 southwest industrial/residential edge — not Will product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Grundy County different',
    intro: 'I-80 freeflow, Morris multi-story, and energy-corridor calendars — not interchangeable Will boilerplate.',
    bullets: [
      {
        title: 'I-80 freeflow is still billable',
        detail:
          'Grundy ↔ Will pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Morris multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure industrial-edge lots.',
      },
      {
        title: 'Energy and plant calendars reshape mid-week demand',
        detail:
          'Shift patterns rewrite pure Saturday residential assumptions.',
      },
      {
        title: 'Discontinuous towns add empty miles',
        detail:
          'Coal City and Minooka pairs fail when crews assume continuous Will density.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Grundy zones: Morris seat, industrial corridor, Minooka/Coal City edges & rural lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, industrial edges, corridor towns, and rural lots.',
  zones: [
    {
      id: 'morris-seat',
      name: 'Morris multi-story & seat stock',
      shortName: 'Morris',
      neighborhoods: ["Morris","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","I-80 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["morris"],
    },
    {
      id: 'industrial',
      name: 'I-80 industrial / energy-edge residential',
      shortName: 'Industrial edge',
      neighborhoods: ["industrial-adjacent SFH","energy corridor edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Shift traffic","Arterial timing","Mixed access"],
      moverTips: 'Prefer early starts; survey last-mile on industrial streets.',
      cityKeywords: ["grundy industrial"],
    },
    {
      id: 'minooka-coal',
      name: 'Minooka / Coal City corridor towns',
      shortName: 'Minooka / Coal City',
      neighborhoods: ["Minooka edges","Coal City","corridor multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","Arterial timing"],
      moverTips: 'Prefer early starts for long pairs; confirm driveway depth.',
      cityKeywords: ["minooka","coal city"],
    },
    {
      id: 'rural-lots',
      name: 'Southern & western rural lots',
      shortName: 'Rural lots',
      neighborhoods: ["southern tracts","western lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["south grundy","west grundy"],
    }
  ],
  specialized: [
    {
      id: 'i80-edge',
      title: 'I-80 industrial-edge freeflow',
      intro: 'Southwest pairs still peak hard toward Will.',
      bullets: ["Price portal-to-portal honestly.","Build buffers for industrial shift windows."],
    },
    {
      id: 'morris-seat',
      title: 'Morris multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'energy-calendars',
      title: 'Energy / plant calendar module',
      intro: 'Industrial calendars reshape mid-week demand.',
      bullets: ["Clarify hard report dates early.","Do not quote pure Will HOA Saturday rates for plant-adjacent jobs."],
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
        intro: 'Grundy families compare Morris, Minooka, Coal City, and related district feeders — verify address boundaries; do not assume Will maps apply.',
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
            detail: 'Morris Hospital and Joliet specialty spillover serve the county; map peak I-80 times for ER access.',
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
    intro: 'I-80 freeflow, multi-story access, and industrial empty miles often matter more than raw miles.',
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
        label: 'Will County movers (parent contrast)',
        href: '/local-movers/illinois/will',
      },

    ],
  },
});
