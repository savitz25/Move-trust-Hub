import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** licking — OH Tier 2 Wave 1 */
export const lickingCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'licking',
  hubTitle: 'Licking County Moving Intelligence Hub',
  eyebrow: 'Licking · Newark / Pataskala / Heath · Columbus east · vs Franklin',
  h1: 'Moving in Licking County: Newark, Pataskala & SR-161 / I-70 East-Metro Growth',
  heroOpener: 'Licking County is Columbus’s east-metro growth collar — Pataskala and Heath planned product, Newark multi-story and seat stock, SR-161 / I-70 freeflow, and product that is not Delaware’s north Powell HOA pattern and not Fairfield’s Lancaster US-33 mix alone. Expect longer empty miles into the core, master-plan COIs on the metro edge, and small-city stairs in Newark. This guide is for people moving in Licking as Columbus-east product — not a Franklin rename.',
  heroCredibility: 'East-metro growth · SR-161 / I-70 · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-70 · SR-161 · SR-16 · SR-79 · SR-37 · US-40 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Franklin County',
    parentHref: '/local-movers/ohio/franklin',
    title: 'Compared with Franklin County',
    intro: 'Licking is Pataskala / Newark east-metro growth — not Short North elevators and not Delaware north-collar or Fairfield US-33 product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Franklin crews fight I-70/I-71 core peaks. Licking pairs ride I-70, SR-161, and Newark arterials — freer mid-day east of I-270, still peak-heavy on commute windows into the core.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Delaware skews continuous north premium HOAs. Licking mixes Pataskala planned SFH, Heath corridors, and Newark multi-story — more continuous east-metro mix with a true seat city.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Metro-edge HOAs need COI packets; Newark multi-story needs stair inventories uncommon on pure Powell cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Licking quotes often sit at east-collar rates for driveway SFH — empty miles and city access still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Licking is Columbus-east SR-161 / I-70 product — not Franklin core renamed and not Delaware or Fairfield product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Licking County different',
    intro: 'SR-161 freeflow, Newark multi-story, and east-metro empty miles — not a Delaware north clone.',
    bullets: [
      {
        title: 'SR-161 / I-70 freeflow is billable',
        detail: 'Pataskala ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Delaware north growth',
        detail: 'East-metro is not Powell premium HOA product alone.',
      },
      {
        title: 'Distinct from Fairfield US-33 southeast',
        detail: 'Newark/Pataskala east is not Lancaster US-33 product alone.',
      },
      {
        title: 'Newark multi-story is first-class',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Licking zones: Pataskala growth, Heath corridors, Newark core & rural east',
  zonesIntro: 'Two to four sharp products under one Columbus-east label.',
  zones: [
    {
      id: 'pataskala',
      name: 'Pataskala metro-edge growth',
      shortName: 'Pataskala',
      neighborhoods: ["Pataskala","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","SR-161 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Columbus.',
      cityKeywords: ["pataskala"],
    },
    {
      id: 'heath',
      name: 'Heath corridor suburbs',
      shortName: 'Heath',
      neighborhoods: ["Heath","corridor edges"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Arterial timing","HOA packets"],
      moverTips: 'Confirm driveway staging; avoid peak windows when possible.',
      cityKeywords: ["heath"],
    },
    {
      id: 'newark',
      name: 'Newark city multi-story',
      shortName: 'Newark',
      neighborhoods: ["Newark","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["newark oh"],
    },
    {
      id: 'rural-east',
      name: 'Rural east & larger lots',
      shortName: 'Rural east',
      neighborhoods: ["eastern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["licking east"],
    }
  ],
  specialized: [
    {
      id: 'sr161',
      title: 'SR-161 / I-70 east-metro freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Franklin elevator rates for Newark multi-story."],
    },
    {
      id: 'newark-city',
      title: 'Newark multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'vs-collars',
      title: 'Distinct from Delaware and Fairfield',
      intro: 'East-metro differs from north growth and SE US-33.',
      bullets: ["Do not recycle Powell-only or Lancaster-only playbooks.","SR-161 Pataskala/Newark mix is the differentiator."],
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
        intro: 'Licking families compare Newark City, Southwest Licking, Lakewood, and other districts — verify boundaries; metro-edge reputation does not replace district maps.',
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
            detail: 'Licking Memorial and Columbus-region systems serve the east metro; map peak freeflow on SR-161/I-70 corridors.',
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
    intro: 'Empty miles, city access, and east-metro peaks often matter more than raw miles.',
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
