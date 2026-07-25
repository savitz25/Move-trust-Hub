import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** lake — OH Tier 2 Wave 1 */
export const lakeCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'lake',
  hubTitle: 'Lake County Moving Intelligence Hub',
  eyebrow: 'Lake · Mentor / Willoughby / Painesville · Cleveland east · vs Cuyahoga',
  h1: 'Moving in Lake County: Mentor, Willoughby & I-90 East Lakeshore Collar',
  heroOpener: 'Lake County is Cleveland’s east lakeshore collar — Mentor corridors, Willoughby multi-story and SFH mix, Painesville seat stock, I-90 / SR-2 freeflow, and product that is not Cuyahoga downtown elevators and not Lorain’s west-shore industrial mix. Expect lake-effect winter access, longer empty miles into the city core, and shore-adjacent last-mile on some streets. This guide is for people moving in Lake as Cleveland-east lakeshore product — not a Cleveland rename.',
  heroCredibility: 'Lakeshore east collar · I-90 / SR-2 · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-90 · SR-2 · US-20 · SR-44 · SR-91 · Vine Street corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Cuyahoga County',
    parentHref: '/local-movers/ohio/cuyahoga',
    title: 'Compared with Cuyahoga County',
    intro: 'Lake is Mentor / Willoughby east-lakeshore collar — not Cleveland downtown multi-unit density and not Lorain west-shore product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Cuyahoga crews fight downtown and Heights freeflow. Lake pairs ride I-90, SR-2, and Mentor corridors — freer mid-day east of the core, still peak-heavy on commute and lake-effect mornings.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Cuyahoga mixes downtown elevators and Heights stock. Lake mixes Mentor SFH, Willoughby multi-story, and Painesville seat product — more continuous east-shore suburban mix, less continuous core multi-unit density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Shore streets can tighten truck size; winter ice rewrites morning plans more often than pure inland Medina cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Lake quotes often sit at east-collar rates for driveway SFH — lake-effect delays and empty miles into Cleveland still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Lake is Cleveland-east lakeshore collar — not Cuyahoga core renamed and not Lorain or Medina product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Lake County different',
    intro: 'I-90 east freeflow, lakeshore access, and winter contingency — not a Cleveland-core clone.',
    bullets: [
      {
        title: 'I-90 / SR-2 freeflow is billable',
        detail: 'Mentor ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Lake-effect winter is operational',
        detail: 'Ice and wind rewrite morning plans more often than southern collars.',
      },
      {
        title: 'Distinct from Lorain west shore',
        detail: 'East shore Mentor product is not Elyria/Avon west industrial mix.',
      },
      {
        title: 'Distinct from Medina south collar',
        detail: 'Lakeshore is not I-71 south inland product.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Lake zones: Mentor corridors, Willoughby mix, Painesville seat & eastern edges',
  zonesIntro: 'Two to four sharp products under one east-lakeshore collar label.',
  zones: [
    {
      id: 'mentor',
      name: 'Mentor corridors & growth',
      shortName: 'Mentor',
      neighborhoods: ["Mentor","corridor neighborhoods"],
      housingTypes: 'SFH, townhomes, multi-family',
      challenges: ["I-90 peaks","HOA packets"],
      moverTips: 'Price portal-to-portal; confirm multi-family packets.',
      cityKeywords: ["mentor"],
    },
    {
      id: 'willoughby',
      name: 'Willoughby multi-story & SFH mix',
      shortName: 'Willoughby',
      neighborhoods: ["Willoughby","city neighborhoods"],
      housingTypes: 'Multi-story, SFH, multi-unit',
      challenges: ["Stairs","Street parking","Winter ice"],
      moverTips: 'Inventory stairs; winter mornings need flexibility.',
      cityKeywords: ["willoughby"],
    },
    {
      id: 'painesville',
      name: 'Painesville seat & core',
      shortName: 'Painesville',
      neighborhoods: ["Painesville","seat neighborhoods"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Street width","Mixed access"],
      moverTips: 'Confirm staging near seat arterials.',
      cityKeywords: ["painesville"],
    },
    {
      id: 'east-edges',
      name: 'Eastern edges & larger lots',
      shortName: 'East edges',
      neighborhoods: ["Madison edges","eastern towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice"],
      moverTips: 'Photo last-mile; allow winter buffers.',
      cityKeywords: ["lake east"],
    }
  ],
  specialized: [
    {
      id: 'i90-east',
      title: 'I-90 east-lakeshore freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Cuyahoga elevator rates for Mentor driveways."],
    },
    {
      id: 'lake-effect',
      title: 'Lake-effect winter logistics',
      intro: 'Weather rewrites morning plans.',
      bullets: ["Build ice-aware buffers into quotes.","Confirm approach conditions the day before."],
    },
    {
      id: 'vs-collars',
      title: 'Distinct from Lorain and Medina',
      intro: 'East shore differs from west shore and south inland.',
      bullets: ["Do not recycle west-industrial or south-inland playbooks.","I-90 east lakeshore is the differentiator."],
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
        intro: 'Lake families compare Mentor, Willoughby-Eastlake, Painesville, and other districts — verify boundaries; do not assume Cleveland Metropolitan maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Ohio DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, and military markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Lake Health / University Hospitals regional campuses and Cleveland systems serve the collar; map peak freeflow on I-90 corridors.',
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
    intro: 'Empty miles, winter access, and I-90 peaks often matter more than raw miles.',
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
    intro: 'Lake-effect winter and school years reshape demand more than downtown event calendars alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Winter access', detail: 'Lake-effect and inland ice rewrite morning plans on many collars.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify PUCO household-goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Cuyahoga County movers (parent contrast)', href: '/local-movers/ohio/cuyahoga' },
    ],
  },
});
