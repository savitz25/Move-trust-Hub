import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** sumner — TN Tier 2 Wave 1 */
export const sumnerCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'sumner',
  hubTitle: 'Sumner County Moving Intelligence Hub',
  eyebrow: 'Sumner · Gallatin / Hendersonville · Nashville north · vs Davidson',
  h1: 'Moving in Sumner County: Gallatin, Hendersonville & North-Nashville Collar',
  heroOpener: 'Sumner County is Nashville’s northern collar — Gallatin and Hendersonville density, Old Hickory Lake edges, Portland and White House growth, and Vietnam Veterans / I-65 freeflow that is not a Davidson ZIP rename. Expect HOA packets, lake-access last-mile, and portal-to-portal time map miles understate. This guide is for people moving in Sumner as north-collar product — not downtown Nashville and not Wilson’s I-40 east story.',
  heroCredibility: 'North-Nashville collar · Lake & HOA product · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-65 · Vietnam Veterans Blvd · US-31E · TN-386 · Gallatin Pike',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Davidson County',
    parentHref: '/local-movers/tennessee/davidson',
    title: 'Compared with Davidson County',
    intro: 'Sumner is Gallatin/Hendersonville north-collar growth — not Music City core elevators and not Wilson’s Mt. Juliet I-40 product.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Davidson crews fight downtown and I-40/I-24 peaks. Sumner pairs ride I-65 north and Vietnam Veterans Blvd — freer mid-day off the core, still peak-heavy on Nashville commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Davidson mixes Gulch towers and East Nashville stairs. Sumner mixes Hendersonville HOA growth, Gallatin seat stock, and lake-edge lots — more continuous north-collar product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets and lake approaches dominate; downtown alley rules are destination-only issues.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Sumner driveway SFH often sits at north-collar rates — empty miles into Davidson and multi-family access still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Sumner is Nashville north collar with Gallatin seat identity — not Davidson renamed and not Wilson east.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Sumner County different',
    intro: 'North-collar freeflow, lake access, and Hendersonville density — not a Davidson clone.',
    bullets: [
      {
        title: 'I-65 / Vietnam Veterans freeflow is billable',
        detail: 'Sumner ↔ Davidson pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Lake and HOA last-mile',
        detail: 'Old Hickory edges need photos; do not quote Gulch elevator rates for lake lots.',
      },
      {
        title: 'Distinct from Wilson east growth',
        detail: 'North I-65 product is not Mt. Juliet/Lebanon I-40 product.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority even on short-looking hops.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Sumner zones: Hendersonville, Gallatin, northern towns & border edges',
  zonesIntro: 'Two to four sharp products under one north-collar label.',
  zones: [
    {
      id: 'hendersonville',
      name: 'Hendersonville & lake-shore growth',
      shortName: 'Hendersonville',
      neighborhoods: ["Hendersonville","Old Hickory Lake edges"],
      housingTypes: 'HOA SFH, multi-family, lake lots',
      challenges: ["HOA packets","Lake last-mile"],
      moverTips: 'Photo lake approaches; collect gate lists early.',
      cityKeywords: ["hendersonville"],
    },
    {
      id: 'gallatin',
      name: 'Gallatin county seat & civic core',
      shortName: 'Gallatin',
      neighborhoods: ["Gallatin","seat neighborhoods"],
      housingTypes: 'SFH, mixed older stock',
      challenges: ["Street width","Civic staging"],
      moverTips: 'Confirm staging near seat arterials.',
      cityKeywords: ["gallatin"],
    },
    {
      id: 'north-sumner',
      name: 'Portland, White House & northern Sumner',
      shortName: 'North Sumner',
      neighborhoods: ["Portland","White House"],
      housingTypes: 'Growth SFH, small-city stock',
      challenges: ["Empty miles","I-65 timing"],
      moverTips: 'Budget freeflow between pockets.',
      cityKeywords: ["portland","white house"],
    },
    {
      id: 'border-edge',
      name: 'Goodlettsville edge & Davidson line',
      shortName: 'Border edge',
      neighborhoods: ["Goodlettsville edge","Vietnam Veterans corridor"],
      housingTypes: 'Mixed border housing',
      challenges: ["County-line confusion","Arterial peaks"],
      moverTips: 'Pin Sumner vs Davidson on every address.',
      cityKeywords: ["goodlettsville"],
    }
  ],
  specialized: [
    {
      id: 'north-collar',
      title: 'North-Nashville collar freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Davidson CBD rates for Gallatin SFH."],
    },
    {
      id: 'lake-hoa',
      title: 'Lake & HOA access product',
      intro: 'Water-edge and gate lists are first-class cost drivers.',
      bullets: ["Photo driveways and turnarounds.","Collect HOA packets before pack day."],
    },
    {
      id: 'vs-wilson',
      title: 'Distinct from Wilson east collar',
      intro: 'I-65 north is not I-40 east.',
      bullets: ["Keep Sumner and Wilson playbooks separate.","Parent-biased Davidson legs still name the real unload county."],
    }
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Compressed secondary-market notes — primary districts and acute-care access that affect move-in.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro: 'Sumner families compare Sumner County Schools feeders across Hendersonville and Gallatin — verify boundaries; do not assume Davidson maps apply.',
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
            detail: 'Sumner Regional (Gallatin), TriStar Hendersonville, and Nashville tertiary referrals serve the collar; map peak freeflow on I-65 corridors.',
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
    intro: 'Empty miles, HOA access, and I-65 peaks often matter more than raw miles.',
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
    intro: 'School years and Nashville commute peaks reshape demand more than pure Music City event weeks alone.',
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
      { label: 'Davidson County movers (parent contrast)', href: '/local-movers/tennessee/davidson' },
    ],
  },
});
