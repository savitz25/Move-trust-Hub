import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** robertson — TN Tier 2 Wave 1 */
export const robertsonCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'robertson',
  hubTitle: 'Robertson County Moving Intelligence Hub',
  eyebrow: 'Robertson · Springfield · Nashville northwest · vs Davidson',
  h1: 'Moving in Robertson County: Springfield & Northwest Nashville Collar',
  heroOpener: 'Robertson County is Nashville’s northwest collar — Springfield seat fabric, White House western reach, Coopertown and Greenbrier crossroads, and I-24 / US-41 freeflow that is not a Davidson rename and not Montgomery’s Fort Campbell PCS story by default. Expect longer rural last-mile, small-city staging, and portal-to-portal time map miles understate.',
  heroCredibility: 'Northwest Nashville collar · Springfield seat · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-24 · US-41 · US-431 · SR-49 · SR-25',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Davidson County',
    parentHref: '/local-movers/tennessee/davidson',
    title: 'Compared with Davidson County',
    intro: 'Robertson is Springfield-centered northwest collar — not downtown Nashville and not Clarksville/Montgomery military product by default.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Davidson crews fight core peaks. Robertson pairs ride I-24 and US-41 northwest — freer mid-day off the core, still peak-heavy on Nashville commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Davidson mixes towers and near-core stairs. Robertson mixes Springfield small-city stock, acreage lots, and border growth toward Sumner.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Long driveways and rural approaches dominate over alley and high-rise inventory.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Robertson SFH often sits at outer-collar rates — empty miles into Davidson still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Robertson is northwest collar with Springfield identity — not Davidson renamed and not Fort Campbell default.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Robertson County different',
    intro: 'Springfield small-city logistics and rural last-mile — not a Davidson or Montgomery clone.',
    bullets: [
      {
        title: 'Northwest freeflow is billable',
        detail: 'Robertson ↔ Davidson pairs freer mid-day still peak hard.',
      },
      {
        title: 'Rural and acreage access',
        detail: 'Long lanes rewrite truck size more often than midtown stairs.',
      },
      {
        title: 'Not Fort Campbell by default',
        detail: 'Montgomery absorbs more military PCS volume — scope the actual job.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Kentucky border hops flip authority quickly.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Robertson zones: Springfield, White House edge, crossroads towns & rural west',
  zonesIntro: 'Two to four sharp products under one northwest-collar label.',
  zones: [
    {
      id: 'springfield',
      name: 'Springfield seat & county core',
      shortName: 'Springfield',
      neighborhoods: ["Springfield","civic core"],
      housingTypes: 'Small-city SFH, mixed stock',
      challenges: ["Street width","Staging"],
      moverTips: 'Confirm small-city staging honesty.',
      cityKeywords: ["springfield"],
    },
    {
      id: 'white-house-edge',
      name: 'White House edge & southern Robertson',
      shortName: 'White House edge',
      neighborhoods: ["White House edge","south Robertson"],
      housingTypes: 'Growth SFH toward Sumner/Davidson',
      challenges: ["County-line confusion"],
      moverTips: 'Pin county on border streets.',
      cityKeywords: ["white house"],
    },
    {
      id: 'crossroads',
      name: 'Greenbrier, Coopertown & crossroads towns',
      shortName: 'Crossroads',
      neighborhoods: ["Greenbrier","Coopertown"],
      housingTypes: 'Small towns, rural connectors',
      challenges: ["Empty miles","Gravel access"],
      moverTips: 'Photo driveway and power lines.',
      cityKeywords: ["greenbrier","coopertown"],
    },
    {
      id: 'rural-west',
      name: 'Agricultural north and west',
      shortName: 'Rural west',
      neighborhoods: ["north/west farms","large lots"],
      housingTypes: 'Acreage home sites',
      challenges: ["Truck weight","Turnaround"],
      moverTips: 'Survey turnarounds early.',
      cityKeywords: ["robertson rural"],
    }
  ],
  specialized: [
    {
      id: 'nw-collar',
      title: 'Northwest Nashville collar',
      intro: 'Springfield-centered growth with Nashville jobs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Davidson CBD rates for Springfield SFH."],
    },
    {
      id: 'rural-lots',
      title: 'Small-city and rural lot mix',
      intro: 'Long drives and acreage access dominate.',
      bullets: ["Photo last-mile before pack day."],
    },
    {
      id: 'montgomery-edge',
      title: 'Montgomery-adjacent awareness',
      intro: 'Western patterns can lean Clarksville — verify the real job.',
      bullets: ["Do not assume Fort Campbell PCS logistics without evidence."],
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
        intro: 'Robertson families compare Robertson County Schools feeders — verify boundaries; do not assume Davidson maps apply.',
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
            detail: 'TriStar NorthCrest (Springfield) anchors local care; Nashville and Clarksville referrals for specialty; map I-24 peaks.',
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
    intro: 'Empty miles, rural access, and I-24 peaks often matter more than raw miles.',
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
