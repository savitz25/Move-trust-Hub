import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeIlTier2Pack,
  IL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/illinois/il-tier2-shared';

/**
 * peoria â€” IL Tier 2 Wave 1
 */
export const peoriaCountyIlTier2Intelligence: CountyIntelligencePack = finalizeIlTier2Pack({
  countySlug: 'peoria',
  hubTitle: 'Peoria County Moving Intelligence Hub',
  eyebrow: 'Peoria · central Illinois medical/industrial river hub',
  h1: 'Moving in Peoria County: River Medical Hub, Bluff Access & I-74 Logistics',
  heroOpener:
    'Peoria County is central Illinois’s medical and manufacturing river hub — Peoria multi-story and medical-corridor density, Peoria Heights bluff access, Dunlap growth HOAs, and freeflow on I-74 / I-474 that is not Chicago collar product with different labels. Expect hospital calendars, river-bridge freeflow toward Tazewell, and discontinuous stock under one county. This guide is for people moving in Peoria as independent central IL hub — not Chicago defaults.',
  heroCredibility:
    'Central IL river hub · Medical/industrial · I-74 / bluffs · ICC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-74 · I-474 · IL-29 · US-24 · IL-6 · War Memorial Drive',
  lastReviewed: '2026-07-25',
  parentCompare: {
    parentLabel: 'independent central Illinois (nearest downstate hubs: Sangamon / McLean)',
    parentHref: '/local-movers/illinois/sangamon',
    title: 'Compared with independent central Illinois (nearest downstate hubs: Sangamon / McLean)',
    intro:
      'Peoria is independent central IL medical/industrial river product — not Springfield capital density and not Bloomington twin-city insurance product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Capital and twin-city crews fight I-55 peaks. Peoria pairs ride I-74, I-474, and IL-29 — freer mid-day river-metro freeflow, still peak-heavy on medical corridors and bluff approaches. Portal-to-portal time is real; it is not a Chicago elevator day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Springfield mixes capital multi-story and Chatham HOAs. Peoria mixes medical multi-family, Heights bluff stock, and Dunlap HOA — more river-bluff product, less continuous capital session density.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Bluff streets need grade surveys and smaller trucks; medical multi-family needs COIs; Dunlap HOAs add packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Peoria quotes often track central IL hub rates for multi-story access — bluff shuttles and hospital windows can price above quiet Dunlap driveway jobs.',
      },
      {
        title: 'Role difference',
        detail:
          'Peoria is independent central IL river medical/industrial hub — not Chicago or capital product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Peoria County different',
    intro: 'Medical calendars, river bluffs, and I-74 freeflow — not interchangeable Chicago or capital boilerplate.',
    bullets: [
      {
        title: 'Medical and manufacturing calendars reshape mid-week demand',
        detail:
          'Hospital onboarding and plant report dates create hard windows that compete with Saturday family demand.',
      },
      {
        title: 'Peoria Heights bluff streets rewrite truck assumptions',
        detail:
          'Steep grade and limited turn radius need driveway photos and sometimes smaller equipment.',
      },
      {
        title: 'I-74 / I-474 freeflow is still billable',
        detail:
          'Peoria pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Cross-river Tazewell pairs are routine',
        detail:
          'Clarify county lines so ICC vs FMCSA and drive-time assumptions stay accurate for East Peoria destinations.',
      },
      IL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Peoria zones: medical/downtown multi-story, Heights bluffs, Dunlap growth & north river edges',
  zonesIntro: 'Two to four sharp products — medical multi-story, bluff stock, growth HOAs, and river edges.',
  zones: [
    {
      id: 'medical-core',
      name: 'Medical / downtown multi-story',
      shortName: 'Medical core',
      neighborhoods: ["Downtown Peoria","medical corridor multi-family"],
      housingTypes: 'Multi-story, multi-unit, elevators',
      challenges: ["COI packets","Elevators","Street parking"],
      moverTips: 'Collect building packets; inventory elevators vs stairs.',
      cityKeywords: ["peoria medical","downtown peoria"],
    },
    {
      id: 'heights-bluff',
      name: 'Peoria Heights / bluff access',
      shortName: 'Heights bluffs',
      neighborhoods: ["Peoria Heights","bluff streets"],
      housingTypes: 'SFH, multi-story, hillside stock',
      challenges: ["Grades","Limited turn radius","Long carries"],
      moverTips: 'Photo driveway and grade; discuss smaller trucks early.',
      cityKeywords: ["peoria heights"],
    },
    {
      id: 'dunlap-growth',
      name: 'Dunlap / north growth HOA',
      shortName: 'Dunlap growth',
      neighborhoods: ["Dunlap","north growth villages"],
      housingTypes: 'HOA SFH, townhomes, multi-family',
      challenges: ["HOA packets","I-74 freeflow"],
      moverTips: 'Collect HOA COIs; build I-74 buffer.',
      cityKeywords: ["dunlap"],
    },
    {
      id: 'north-river',
      name: 'Chillicothe / north river edges',
      shortName: 'North river',
      neighborhoods: ["Chillicothe","north river SFH"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Empty miles","River freeflow"],
      moverTips: 'Prefer early starts for long pairs.',
      cityKeywords: ["chillicothe"],
    }
  ],
  specialized: [
    {
      id: 'medical-hub',
      title: 'Medical multi-family & calendar module',
      intro: 'Hospital corridors dominate mid-week volume.',
      bullets: ["Align surveys with hard onboarding dates.","Collect elevator COIs early."],
    },
    {
      id: 'bluff-access',
      title: 'River bluff last-mile',
      intro: 'Heights grades reject full-trailer assumptions.',
      bullets: ["Photo the final approach before promising a 26-foot truck.","Long carries often beat forced full-trailer staging."],
    },
    {
      id: 'i74-freeflow',
      title: 'I-74 / I-474 freeflow',
      intro: 'River-metro pairs still peak hard; Tazewell legs need clear county lines.',
      bullets: ["Price portal-to-portal honestly.","Clarify East Peoria / Tazewell second addresses early."],
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
        intro: 'Peoria families compare Peoria Public Schools, Dunlap, Peoria Heights, and related district feeders — verify address boundaries.',
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
            detail: 'OSF Saint Francis, Carle Health Peoria campuses, and related specialty care anchor acute care; map peak medical-corridor and I-74 times for ER access.',
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
    intro: 'Medical multi-family access, bluff last-mile, and I-74 freeflow often matter more than raw miles.',
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
    intro: 'Hospital calendars, school years, and winter bluff ice reshape demand by pocket.',
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
        label: 'independent central Illinois (nearest downstate hubs: Sangamon / McLean) movers (parent contrast)',
        href: '/local-movers/illinois/sangamon',
      },
      {
        label: 'McLean County movers',
        href: '/local-movers/illinois/mclean',
      },
    ],
  },
});
