import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** delaware — OH Tier 2 Wave 1 */
export const delawareCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'delaware',
  hubTitle: 'Delaware County Moving Intelligence Hub',
  eyebrow: 'Delaware · Powell / Lewis Center · Columbus north growth · vs Franklin',
  h1: 'Moving in Delaware County: Powell, Lewis Center & US-23 / I-71 North Growth',
  heroOpener: 'Delaware County is Columbus’s top-growth north collar — Powell and Lewis Center HOA villages, Delaware city seat stock, US-23 / I-71 freeflow, and longer empty miles than Franklin’s Short North elevators. It is not a Columbus core rename: expect master-plan COIs, school-calendar SFH volume, and portal-to-portal time that map miles understate. This guide is for people moving in Delaware as Columbus-north growth product — not Franklin intown logistics with different labels.',
  heroCredibility: 'Columbus north growth · US-23 / I-71 · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-23 · I-71 · SR-315 · SR-37 · SR-750 · US-36 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Franklin County',
    parentHref: '/local-movers/ohio/franklin',
    title: 'Compared with Franklin County',
    intro: 'Delaware is Powell / Lewis Center north-collar HOA growth — not Short North elevators and not German Village alleys alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Franklin crews fight I-70/I-71 core peaks and Short North curb limits. Delaware pairs ride US-23, I-71, and SR-315 — freer mid-day north of I-270, still peak-heavy on school and commute windows into downtown.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Franklin mixes downtown elevators, German Village brick, and I-270 HOAs. Delaware skews continuous planned SFH, townhomes, and Delaware city older stock — more master-plan cul-de-sacs, less continuous freight-elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA gate lists and weekday windows dominate more often than intown street permits. New-construction mud and incomplete streets appear on growth edges.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Delaware quotes often sit at premium north-collar rates for driveway SFH — empty miles from core staging and HOA soft costs still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Delaware is Columbus-north top-growth collar — not Franklin core renamed and not Fairfield/Licking southeast or east product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Delaware County different',
    intro: 'HOA growth, US-23 freeflow, and north-collar empty miles — not Columbus tower boilerplate.',
    bullets: [
      {
        title: 'US-23 / I-71 freeflow is billable',
        detail: 'Powell ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Master-plan HOAs dominate family volume',
        detail: 'COI, gate lists, and truck limits are standard on growth villages.',
      },
      {
        title: 'Distinct from Fairfield and Licking',
        detail: 'North growth is not US-33 southeast or Newark east-metro product.',
      },
      {
        title: 'Empty miles from core staging matter',
        detail: 'Do not quote Short North elevator rates for Powell driveways.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Delaware zones: Powell growth, Lewis Center corridors, Delaware city & rural north',
  zonesIntro: 'Two to four sharp products under one Columbus-north growth label.',
  zones: [
    {
      id: 'powell',
      name: 'Powell planned growth',
      shortName: 'Powell',
      neighborhoods: ["Powell","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Cul-de-sac staging"],
      moverTips: 'Collect COI and gate lists early; weekday windows often beat Saturdays.',
      cityKeywords: ["powell"],
    },
    {
      id: 'lewis-center',
      name: 'Lewis Center / US-23 corridors',
      shortName: 'Lewis Center',
      neighborhoods: ["Lewis Center","US-23 edges"],
      housingTypes: 'SFH, townhomes, multi-family pockets',
      challenges: ["US-23 peaks","HOA packets"],
      moverTips: 'Price portal-to-portal; avoid peak US-23 windows when possible.',
      cityKeywords: ["lewis center"],
    },
    {
      id: 'delaware-city',
      name: 'Delaware city seat',
      shortName: 'Delaware city',
      neighborhoods: ["Delaware","seat neighborhoods"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Street width","Mixed access"],
      moverTips: 'Inventory older multi-story; confirm staging near seat arterials.',
      cityKeywords: ["delaware oh"],
    },
    {
      id: 'rural-north',
      name: 'Rural north & larger lots',
      shortName: 'Rural north',
      neighborhoods: ["northern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["delaware north"],
    }
  ],
  specialized: [
    {
      id: 'hoa-growth',
      title: 'North-collar HOA growth logistics',
      intro: 'Master-plan rules are first-class cost drivers.',
      bullets: ["Collect COI and gate lists early.","Confirm truck size limits before load day."],
    },
    {
      id: 'us23-freeflow',
      title: 'US-23 / I-71 north freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Franklin elevator rates for Powell driveways."],
    },
    {
      id: 'family-sfh',
      title: 'Family multi-bedroom SFH peak',
      intro: 'School-calendar inventories dominate summer.',
      bullets: ["Packing help and Saturday supply matter more than elevators.","Book early May–August."],
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
        intro: 'Delaware families compare Olentangy, Delaware City, Big Walnut, and other districts — verify boundaries; do not assume Columbus City maps apply.',
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
            detail: 'OhioHealth and regional clinics serve the north collar; map peak freeflow on US-23/I-71, not only off-hour freeflow.',
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
    intro: 'Empty miles, HOA soft costs, and US-23 peaks often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than OSU lease waves alone.',
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
      { label: 'Franklin County movers (parent contrast)', href: '/local-movers/ohio/franklin' },
    ],
  },
});
