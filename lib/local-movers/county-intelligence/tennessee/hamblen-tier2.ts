import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** hamblen — TN Tier 2 Wave 1 */
export const hamblenCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'hamblen',
  hubTitle: 'Hamblen County Moving Intelligence Hub',
  eyebrow: 'Hamblen · Morristown · I-81 East TN · vs Knox / Washington TN',
  h1: 'Moving in Hamblen County: Morristown & the I-81 Corridor Between Knoxville and Tri-Cities',
  heroOpener:
    'Hamblen County is Morristown’s I-81 regional market — between Knoxville and the Tri-Cities, with manufacturing-adjacent housing, small-city staging, and freeflow that is not a Knoxville rename and not Johnson City/Washington product. Expect I-81 timing, industrial-edge workforce housing, and empty miles that map miles understate. This guide is for people moving in Hamblen as Morristown / I-81 corridor product — not Knox core and not Washington TN university density.',
  heroCredibility:
    'Morristown · I-81 East TN · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · US-11E · US-25E · SR-160 · SR-343',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Knox County',
    parentHref: '/local-movers/tennessee/knox',
    title: 'Compared with Knox County',
    intro:
      'Hamblen is Morristown I-81 regional product east of Knoxville — not UT multi-family density and not Johnson City / Washington TN medical-university fabric.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Knox crews fight I-40/I-75 and Kingston Pike peaks. Hamblen pairs ride I-81 and US-11E through Morristown — freer mid-day off Knox core, still peak-heavy on industrial shifts and through-traffic windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Knox mixes campus multi-family and west HOAs. Hamblen mixes Morristown seat stock, plant-adjacent workforce housing, and rural connectors toward Jefferson/Grainger edges.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Small-city streets and industrial freeflow dominate over downtown Knox elevators; not Washington TN’s ETSU multi-family peaks either.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Morristown SFH often sits at East TN secondary rates — empty miles into Knox or Tri-Cities still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Hamblen is Morristown / I-81 regional identity — not Knox renamed and not Johnson City / Kingsport Tri-Cities product.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Hamblen County different',
    intro: 'I-81 corridor freeflow and Morristown industrial edges — not a Knoxville or Johnson City clone.',
    bullets: [
      {
        title: 'I-81 freeflow is billable',
        detail: 'Through-traffic and industrial shift windows rewrite short-looking pairs. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Knoxville core',
        detail: 'Morristown is not a Knox ZIP overlay — different seat, schools, and day-to-day density.',
      },
      {
        title: 'Distinct from Washington TN / Johnson City',
        detail: 'No ETSU term calendar as the default driver; manufacturing and small-city product dominate.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Virginia and other cross-state destinations flip authority even on short-looking hops.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Hamblen zones: Morristown core, industrial edges, lake/crossroads & rural connectors',
  zonesIntro: 'Two to four sharp products under one I-81 corridor label.',
  zones: [
    {
      id: 'morristown-core',
      name: 'Morristown seat & civic core',
      shortName: 'Morristown',
      neighborhoods: ['Morristown', 'downtown / seat neighborhoods'],
      housingTypes: 'Mixed SFH, older stock, multi-unit pockets',
      challenges: ['Street width', 'Seat staging'],
      moverTips: 'Confirm small-city staging near civic and commercial cores.',
      cityKeywords: ['morristown'],
    },
    {
      id: 'industrial-edge',
      name: 'Industrial & plant-adjacent housing',
      shortName: 'Plant edge',
      neighborhoods: ['plant-adjacent neighborhoods', 'I-81 commercial edges'],
      housingTypes: 'Workforce housing near manufacturing',
      challenges: ['Shift traffic', 'Commercial mix'],
      moverTips: 'Ask about employer shift windows before fixing curb times.',
      cityKeywords: ['morristown industrial'],
    },
    {
      id: 'crossroads',
      name: 'US-11E / US-25E crossroads communities',
      shortName: 'Crossroads',
      neighborhoods: ['US-11E edges', 'US-25E approaches'],
      housingTypes: 'Small-community SFH, corridor retail edge',
      challenges: ['Through traffic', 'Empty miles'],
      moverTips: 'Budget freeflow between Morristown and satellite pockets.',
      cityKeywords: ['hamblen crossroads'],
    },
    {
      id: 'rural',
      name: 'Rural Hamblen connectors',
      shortName: 'Rural',
      neighborhoods: ['rural north/south', 'larger lots'],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ['Driveway surveys', 'Soft shoulders'],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ['hamblen rural'],
    },
  ],
  specialized: [
    {
      id: 'i81-corridor',
      title: 'I-81 corridor regional logistics',
      intro: 'Morristown sits between Knoxville and Tri-Cities gravity — freeflow is not either city’s default.',
      bullets: [
        'Price portal-to-portal on I-81 pairs honestly.',
        'Do not quote Knox CBD or Johnson City campus rates for Morristown SFH.',
      ],
    },
    {
      id: 'mfg-edge',
      title: 'Manufacturing-adjacent workforce housing',
      intro: 'Plant calendars reshape mid-week demand more than pure residential Saturday quotes.',
      bullets: [
        'Ask about shift windows near major employers.',
        'Separate household moves from dock rules on commercial edges.',
      ],
    },
    {
      id: 'vs-knox-tri-cities',
      title: 'Not Knoxville and not Johnson City',
      intro: 'Parent-biased legs still name the real unload county.',
      bullets: [
        'Knox destination legs and Washington TN legs price differently from Hamblen-local jobs.',
        'Keep Morristown playbooks separate from both metros.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Hamblen families compare Hamblen County Schools feeders across Morristown — verify boundaries; do not assume Knox or Washington TN maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Tennessee DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, military, and tourism markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail:
              'Morristown-Hamblen Healthcare System anchors local care; Knoxville and Tri-Cities tertiary for complex cases; map I-81 peaks.',
          },
          {
            title: 'Peak drive times',
            detail: 'Map ER access at commute peaks, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'I-81 peaks, industrial freeflow, and empty miles often matter more than raw miles.',
    drivers: [
      { title: 'Corridor freeflow', detail: 'Peak windows inflate hourly bills on short-looking pairs.' },
      { title: 'Access soft costs', detail: 'HOA packets, stairs, or last-mile shuttles add labor hours.' },
      { title: 'Long empty-mile edges', detail: 'Far pockets price differently from seat cores.' },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$120–$190+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Plant calendars and school years reshape demand more than pure Knox office peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, tourism, or plant windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Tennessee TDOR motor carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Knox County movers (parent contrast)', href: '/local-movers/tennessee/knox' },
      { label: 'Washington County TN movers (Tri-Cities contrast)', href: '/local-movers/tennessee/washington' },
    ],
  },
});
