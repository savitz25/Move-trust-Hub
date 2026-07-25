import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/**
 * warren — VA Tier 2 Wave 2
 * Export name-clash-safe vs Ohio Warren (warrenCountyOhTier2Intelligence) and other states.
 */
export const warrenCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'warren',
  hubTitle: 'Warren County Moving Intelligence Hub',
  eyebrow: 'Warren VA · Front Royal · I-66 west / north valley · vs Fauquier',
  h1: 'Moving in Warren County, Virginia: Front Royal & the North-Valley I-66 Gateway',
  heroOpener:
    'Warren County, Virginia is Front Royal’s north-valley gateway — I-66 west of NoVA, Shenandoah approaches, small-city staging, and freeflow that is not Fauquier hunt-country product and not Ohio’s Warren County. Expect mountain-edge last-mile, tourism/weekend peaks toward the park, and portal-to-portal time map miles understate. This guide is for people moving in Warren County, Virginia as Front Royal gateway product — not Warrenton/Fauquier renamed. (Export is VA-specific to avoid Ohio Warren name clash.)',
  heroCredibility:
    'Front Royal · I-66 north-valley gateway · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-66 · US-340 · US-522 · SR-55 · Skyline Drive approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Fauquier County',
    parentHref: '/local-movers/virginia/fauquier',
    title: 'Compared with Fauquier County',
    intro:
      'Warren VA is Front Royal / I-66 north-valley gateway — not Fauquier hunt-country estate product and not Frederick/Winchester industrial valley alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Fauquier crews fight US-17/Warrenton and hunt-country last-mile. Warren pairs ride I-66 into Front Royal, US-340/US-522 valley spines, and park approaches — freer mid-day off outer-NOVA, still peak-heavy on weekend tourism and DC-commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Fauquier mixes Warrenton multi-story and estate lots. Warren mixes Front Royal small-city stock, river-edge neighborhoods, and mountain-approach lots — more continuous north-valley gateway product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Grades toward the Blue Ridge and tourism curb peaks rewrite truck size more often than pure Fauquier driveway estates.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Front Royal SFH often sits at north-valley secondary rates — empty miles into NoVA and mountain last-mile still push premiums.',
      },
      {
        title: 'Role difference',
        detail:
          'Warren County VA is Front Royal gateway identity — not Fauquier renamed and not Ohio Warren.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Warren County different',
    intro: 'I-66 gateway freeflow and mountain-edge access — not a Fauquier hunt-country clone.',
    bullets: [
      {
        title: 'North-valley gateway (not hunt country)',
        detail: 'Front Royal product is not Warrenton estate logistics. Keep playbooks separate.',
      },
      {
        title: 'I-66 west freeflow is billable',
        detail: 'NoVA-bound pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Name-clash-safe Virginia market',
        detail: 'Always say Warren County, Virginia on interstate BOLs — not Ohio Warren.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'West Virginia and other border hops flip authority quickly.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Warren zones: Front Royal core, I-66 approaches, river edges & mountain last-mile',
  zonesIntro: 'Two to four sharp products under one north-valley gateway label.',
  zones: [
    {
      id: 'front-royal',
      name: 'Front Royal seat & small-city core',
      shortName: 'Front Royal',
      neighborhoods: ['Front Royal', 'downtown / seat'],
      housingTypes: 'Mixed SFH, multi-unit pockets, older stock',
      challenges: ['Street width', 'Tourism curb peaks'],
      moverTips: 'Build weekend tourism buffers near the core and park approaches.',
      cityKeywords: ['front royal'],
    },
    {
      id: 'i66-edge',
      name: 'I-66 western approaches & commute corridors',
      shortName: 'I-66 edge',
      neighborhoods: ['I-66 corridor edges', 'commute growth'],
      housingTypes: 'Growth SFH, multi-family pockets',
      challenges: ['Commute peaks', 'HOA packets'],
      moverTips: 'Price NoVA destination legs separately from Front Royal-local moves.',
      cityKeywords: ['warren i-66'],
    },
    {
      id: 'river-edge',
      name: 'Shenandoah / river-edge neighborhoods',
      shortName: 'River edge',
      neighborhoods: ['river-edge pockets', 'valley floor'],
      housingTypes: 'SFH, water-adjacent lots',
      challenges: ['Last-mile width', 'Flood-adjacent staging notes'],
      moverTips: 'Photo approaches; confirm truck length on tight streets.',
      cityKeywords: ['shenandoah warren'],
    },
    {
      id: 'mountain',
      name: 'Mountain-edge & Skyline approaches',
      shortName: 'Mountain edge',
      neighborhoods: ['mountain approaches', 'park-edge lots'],
      housingTypes: 'Steeper lots, rural approaches',
      challenges: ['Grades', 'Turnarounds'],
      moverTips: 'Photo grades and turnarounds; plan shuttles when needed.',
      cityKeywords: ['warren mountain'],
    },
  ],
  specialized: [
    {
      id: 'gateway',
      title: 'I-66 north-valley gateway',
      intro: 'Front Royal is the west-of-NoVA valley entry — not Fauquier hunt country.',
      bullets: [
        'Price portal-to-portal on I-66 pairs honestly.',
        'Do not quote Fauquier estate rates for Front Royal multi-unit stock.',
      ],
    },
    {
      id: 'name-clash',
      title: 'Name-clash-safe Virginia Warren',
      intro: 'Ops notes must distinguish VA Warren from OH Warren and other states.',
      bullets: [
        'Label state as Virginia on every interstate BOL.',
        'Export is warrenCountyVaTier2Intelligence — not OH Warren.',
      ],
    },
    {
      id: 'mountain-tourism',
      title: 'Mountain-edge and tourism freeflow',
      intro: 'Park weekends rewrite curb plans more than pure residential Saturdays.',
      bullets: [
        'Build tourism buffers near Skyline approaches.',
        'Photo mountain last-mile before pack day.',
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
          'Warren families compare Warren County Public Schools feeders across Front Royal — verify boundaries; do not assume Fauquier or Frederick maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Virginia DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
              'Warren Memorial Hospital and regional valley/NoVA systems serve the gateway; map I-66 freeflow at peaks.',
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
    intro: 'I-66 peaks, mountain last-mile, and tourism freeflow often matter more than raw miles.',
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
    intro: 'Tourism weekends and school years reshape demand more than pure Fauquier estate calendars alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, tourism, or plant windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Fauquier County movers (parent contrast)', href: '/local-movers/virginia/fauquier' },
      { label: 'Frederick County movers (valley contrast)', href: '/local-movers/virginia/frederick' },
    ],
  },
});
