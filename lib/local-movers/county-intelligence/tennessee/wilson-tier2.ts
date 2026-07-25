import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTnTier2Pack,
  TN_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/tennessee/tn-tier2-shared';

/** wilson — TN Tier 2 Wave 1 */
export const wilsonCountyTnTier2Intelligence: CountyIntelligencePack = finalizeTnTier2Pack({
  countySlug: 'wilson',
  hubTitle: 'Wilson County Moving Intelligence Hub',
  eyebrow: 'Wilson · Mt. Juliet / Lebanon · Nashville east · vs Davidson',
  h1: 'Moving in Wilson County: Mt. Juliet, Lebanon & I-40 East Collar',
  heroOpener: 'Wilson County is Nashville’s eastern growth collar — Mt. Juliet HOA density, Lebanon seat fabric, Providence-area multi-family, and I-40 freeflow that is not Sumner’s northern lake story and not Davidson core elevators. Expect gate lists, new-plat access, and portal-to-portal time map miles understate. This guide is for people moving in Wilson as east-collar product — not a Davidson rename.',
  heroCredibility: 'I-40 east collar · HOA growth · Tennessee TDOR motor carrier · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · US-70 · TN-109 · Mt. Juliet Road · Lebanon Pike corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Davidson County',
    parentHref: '/local-movers/tennessee/davidson',
    title: 'Compared with Davidson County',
    intro: 'Wilson is Mt. Juliet/Lebanon I-40 east growth — not downtown Nashville and not Sumner’s I-65 north product.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Davidson crews fight core peaks. Wilson pairs ride I-40 east — freer mid-day east of the ring, still peak-heavy on Nashville commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Davidson mixes towers and near-core stairs. Wilson mixes Mt. Juliet planned SFH, Lebanon mixed stock, and corridor multi-family.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets dominate growth villages; downtown curb rules are destination-only.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Wilson driveway SFH often sits at east-collar rates — empty miles into Davidson still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Wilson is Nashville east collar — not Davidson renamed and not Sumner north.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Wilson County different',
    intro: 'I-40 freeflow and HOA growth — not a Sumner or Davidson clone.',
    bullets: [
      {
        title: 'I-40 east freeflow is billable',
        detail: 'Wilson ↔ Davidson pairs freer mid-day still peak hard.',
      },
      {
        title: 'Mt. Juliet HOA product',
        detail: 'Gate lists and new plats rewrite truck plans.',
      },
      {
        title: 'Distinct from Sumner north',
        detail: 'East I-40 is not Hendersonville/Gallatin north product.',
      },
      {
        title: 'Interstate legs need FMCSA',
        detail: 'Cross-state destinations flip authority.',
      },
      TN_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Wilson zones: Mt. Juliet, Lebanon, Gladeville edges & rural south',
  zonesIntro: 'Two to four sharp products under one east-collar label.',
  zones: [
    {
      id: 'mt-juliet',
      name: 'Mt. Juliet & Providence growth',
      shortName: 'Mt. Juliet',
      neighborhoods: ["Mt. Juliet","Providence corridor"],
      housingTypes: 'HOA SFH, multi-family',
      challenges: ["HOA packets","I-40 peaks"],
      moverTips: 'Collect gate lists; avoid peak retail windows.',
      cityKeywords: ["mt juliet"],
    },
    {
      id: 'lebanon',
      name: 'Lebanon seat & square edges',
      shortName: 'Lebanon',
      neighborhoods: ["Lebanon","square-adjacent"],
      housingTypes: 'Mixed SFH, older stock',
      challenges: ["Street width","Seat staging"],
      moverTips: 'Confirm parking near square and civic core.',
      cityKeywords: ["lebanon"],
    },
    {
      id: 'gladeville',
      name: 'Gladeville & rural Wilson',
      shortName: 'Gladeville',
      neighborhoods: ["Gladeville","rural south"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["gladeville"],
    },
    {
      id: 'i40-edge',
      name: 'I-40 employment & warehouse edge',
      shortName: 'I-40 edge',
      neighborhoods: ["I-40 commercial edges"],
      housingTypes: 'Workforce housing near logistics',
      challenges: ["Shift traffic","Commercial mix"],
      moverTips: 'Separate household from dock rules.',
      cityKeywords: ["wilson i-40"],
    }
  ],
  specialized: [
    {
      id: 'i40-collar',
      title: 'I-40 east commuting freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Davidson CBD rates for Mt. Juliet SFH."],
    },
    {
      id: 'hoa-growth',
      title: 'Mt. Juliet HOA & multi-family turns',
      intro: 'Building packets are first-class cost drivers.',
      bullets: ["Elevator windows early on multi-family.","Month-end competition for crews is real."],
    },
    {
      id: 'vs-sumner',
      title: 'Distinct from Sumner north collar',
      intro: 'I-40 east is not I-65 north.',
      bullets: ["Keep Wilson and Sumner playbooks separate."],
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
        intro: 'Wilson families compare Wilson County Schools and Lebanon Special School District — verify boundaries; do not assume Davidson maps apply.',
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
            detail: 'University Medical Center (Lebanon) and metro-edge systems serve the collar; Nashville tertiary for complex care; map I-40 peaks.',
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
    intro: 'Empty miles, HOA access, and I-40 peaks often matter more than raw miles.',
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
