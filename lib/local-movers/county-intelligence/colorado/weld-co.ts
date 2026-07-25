import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeCoTier2Pack,
  CO_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/colorado/co-tier2-shared';

/**
 * weld â€” CO Tier 2 Wave 1
 */
export const weldCountyCoTier2Intelligence: CountyIntelligencePack = finalizeCoTier2Pack({
  countySlug: 'weld',
  hubTitle: 'Weld County Moving Intelligence Hub',
  eyebrow: 'Weld · Greeley / Windsor edge — northern Front Range growth',
  h1: 'Moving in Weld County: Greeley, Windsor Edge & I-25 North Growth',
  heroOpener:
    'Weld County is northern Front Range growth and energy/ag product — Greeley multi-story and seat stock, Windsor and Firestone HOA edges, Fort Lupton and Milliken corridors, and freeflow on I-25 / US-34 / US-85 that is not Adams County Denver-north suburb product with different labels. Expect energy calendars, longer empty miles, and mixed industrial-residential fabric under one large county. This guide is for people moving in Weld as northern Front Range growth — not a Denver-suburb rename.',
  heroCredibility:
    'Northern Front Range growth · Greeley / Windsor · I-25 energy/ag · CO PUC HHG · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-25 · US-34 · US-85 · CO-257 · CO-66 · CO-392',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'Adams County',
    parentHref: '/local-movers/colorado/adams',
    title: 'Compared with Adams County',
    intro:
      'Weld is northern Front Range energy/ag growth on I-25 — not Adams continuous Denver-north multi-family density and not pure rural plains freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Adams crews fight I-76/I-270 and Tower Road peaks into the metro. Weld pairs ride I-25, US-34, and US-85 — freer mid-day further north, still peak-heavy on Greeley arterials and Windsor commute windows. Portal-to-portal time is real; it is not a Thornton elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Adams mixes Northglenn multi-family and Brighton HOAs. Weld mixes Greeley multi-story, Windsor planned SFH, and ag/industrial-edge stock — more energy-corridor product, less continuous metro density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Seat multi-story needs curb plans; HOA packets dominate Windsor growth; rural eastern lots add soft shoulders.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Weld quotes often track northern Front Range secondary rates for driveway SFH — multi-story access and long empty-mile pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Weld is northern Front Range growth collar — not Adams Denver-north product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Weld County different',
    intro: 'I-25 freeflow, Greeley multi-story, and Windsor HOA growth — not interchangeable Adams boilerplate.',
    bullets: [
      {
        title: 'I-25 / US-34 peaks rewrite short-looking locals',
        detail:
          'Weld ↔ Adams pairs freer mid-day still burn clock. Ask portal-to-portal.',
      },
      {
        title: 'Greeley multi-story is first-class product',
        detail:
          'Seat stairs need inventories different from pure Windsor cul-de-sacs.',
      },
      {
        title: 'Energy and plant calendars reshape mid-week demand',
        detail:
          'Shift patterns rewrite pure Saturday residential assumptions.',
      },
      {
        title: 'Empty miles from metro yards are real',
        detail:
          'Even “local” Weld pairs can price as distance work for Adams-based crews.',
      },
      CO_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Weld zones: Greeley multi-story, Windsor growth, I-25 corridor towns & eastern rural lots',
  zonesIntro: 'Two to four sharp products — seat multi-story, HOA growth, corridor stock, and rural lots.',
  zones: [
    {
      id: 'greeley',
      name: 'Greeley multi-story & seat stock',
      shortName: 'Greeley',
      neighborhoods: ["Greeley","downtown edges","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","US-34 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["greeley"],
    },
    {
      id: 'windsor',
      name: 'Windsor / Firestone HOA growth',
      shortName: 'Windsor growth',
      neighborhoods: ["Windsor","Firestone","growth villages"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","I-25 peaks","Lease clusters"],
      moverTips: 'Collect HOA COIs; build I-25 buffer.',
      cityKeywords: ["windsor","firestone"],
    },
    {
      id: 'i25-corridor',
      name: 'Fort Lupton / Milliken I-25 corridor',
      shortName: 'I-25 corridor',
      neighborhoods: ["Fort Lupton","Milliken","Johnstown edges"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Arterial timing","Empty miles"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["fort lupton","milliken","johnstown"],
    },
    {
      id: 'east-rural',
      name: 'Eastern Weld rural / ag edges',
      shortName: 'East rural',
      neighborhoods: ["eastern tracts","ag-edge lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["east weld"],
    }
  ],
  specialized: [
    {
      id: 'i25-north',
      title: 'I-25 northern Front Range freeflow',
      intro: 'North pairs still peak hard toward Adams/Larimer.',
      bullets: ["Price portal-to-portal honestly.","Clarify Adams or Larimer second addresses early."],
    },
    {
      id: 'windsor-hoa',
      title: 'Windsor / Firestone HOA growth module',
      intro: 'Planned suburbs dominate family volume on the west edge.',
      bullets: ["Collect COI and gate lists early.","Do not quote Greeley multi-story rates for driveway SFH."],
    },
    {
      id: 'greeley-seat',
      title: 'Greeley multi-story access',
      intro: 'Seat stairs are a first-class cost driver.',
      bullets: ["Inventory floor counts before comparing hourly rates.","Temporary no-parking often beats long carries."],
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
        intro: 'Weld families compare Greeley-Evans, Windsor, Valley RE-1, and related district feeders — verify address boundaries; do not assume Adams or Larimer maps apply.',
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
            detail: 'UCHealth Greeley and Banner/North Colorado Medical Center campuses anchor acute care; map peak I-25 / US-34 times for ER access.',
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
    intro: 'I-25 freeflow, multi-story access, HOA soft costs, and empty miles often matter more than raw miles.',
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
    intro: 'School years, energy calendars, and winter ice reshape demand by pocket.',
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
        label: 'Adams County movers (parent contrast)',
        href: '/local-movers/colorado/adams',
      },
      {
        label: 'Larimer County movers',
        href: '/local-movers/colorado/larimer',
      },
    ],
  },
});
