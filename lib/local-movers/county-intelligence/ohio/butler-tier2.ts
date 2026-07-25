import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** butler — OH Tier 2 Wave 1 */
export const butlerCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'butler',
  hubTitle: 'Butler County Moving Intelligence Hub',
  eyebrow: 'Butler · Hamilton / Fairfield / West Chester · Cincinnati NW · vs Hamilton',
  h1: 'Moving in Butler County: West Chester, Fairfield & I-75 North Cincinnati Collar',
  heroOpener: 'Butler County is Cincinnati’s I-75 north/northwest growth collar — West Chester and Fairfield HOA density, Hamilton city multi-story stock, and freeflow that is not Warren’s I-71 Mason product and not Hamilton County urban hills alone. Expect industrial-adjacent residential pockets, master-plan COIs, and longer empty miles into the core. This guide is for people moving in Butler as Cincinnati-NW collar product — not a Cincinnati rename and not a Warren clone.',
  heroCredibility: 'I-75 north collar · West Chester growth · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · I-275 · SR-4 · US-127 · SR-129 · Cincinnati-Dayton Rd',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Hamilton County',
    parentHref: '/local-movers/ohio/hamilton',
    title: 'Compared with Hamilton County',
    intro: 'Butler is West Chester / Fairfield I-75 north-collar growth with Hamilton city stock — not Cincinnati OTR hills and not Warren I-71 Mason alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Hamilton crews fight river-city peaks. Butler pairs ride I-75, SR-4, and West Chester corridors — freer mid-day north of I-275, still peak-heavy on industrial-shift and commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Warren skews Mason planned SFH. Butler mixes West Chester multi-family and HOAs, Fairfield corridors, and Hamilton city multi-story — more continuous I-75 growth mix, less continuous pure premium planned-village product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Growth HOAs need COI packets; Hamilton city stairs need inventories uncommon on pure cul-de-sac days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Butler quotes often sit at west/north-collar rates for driveway SFH — multi-family access and empty miles into the core still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Butler is Cincinnati I-75 NW collar — not Hamilton core renamed and not Warren I-71 north product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Butler County different',
    intro: 'I-75 freeflow, West Chester growth, and Hamilton city stock — not a Warren or Cincinnati-core clone.',
    bullets: [
      {
        title: 'I-75 freeflow is billable',
        detail: 'West Chester ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Warren I-71 north',
        detail: 'West/northwest growth is not Mason/Lebanon product.',
      },
      {
        title: 'Hamilton city multi-story is first-class',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Industrial freeflow can rewrite timing',
        detail: 'Shift windows choke some residential pairs near logistics corridors.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Butler zones: West Chester growth, Fairfield corridors, Hamilton city & rural north',
  zonesIntro: 'Two to four sharp products under one I-75 north-collar label.',
  zones: [
    {
      id: 'west-chester',
      name: 'West Chester planned growth',
      shortName: 'West Chester',
      neighborhoods: ["West Chester","growth villages"],
      housingTypes: 'Planned SFH, townhomes, multi-family',
      challenges: ["HOA packets","I-75 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Cincinnati.',
      cityKeywords: ["west chester"],
    },
    {
      id: 'fairfield',
      name: 'Fairfield corridor suburbs',
      shortName: 'Fairfield',
      neighborhoods: ["Fairfield","corridor edges"],
      housingTypes: 'SFH, townhomes, multi-family',
      challenges: ["Arterial timing","Building COIs"],
      moverTips: 'Confirm multi-family packets; avoid peak retail windows when possible.',
      cityKeywords: ["fairfield oh"],
    },
    {
      id: 'hamilton-city',
      name: 'Hamilton city multi-story',
      shortName: 'Hamilton city',
      neighborhoods: ["Hamilton","city neighborhoods"],
      housingTypes: 'Multi-story, older SFH, multi-unit',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["hamilton oh"],
    },
    {
      id: 'rural-north',
      name: 'Rural north & larger lots',
      shortName: 'Rural north',
      neighborhoods: ["northern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["butler north"],
    }
  ],
  specialized: [
    {
      id: 'i75-collar',
      title: 'I-75 north-collar freeflow',
      intro: 'Commute and shift peaks rewrite pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Hamilton hill rates for West Chester driveways."],
    },
    {
      id: 'west-chester-hoa',
      title: 'West Chester HOA / multi-family mix',
      intro: 'Planned villages and apartments both appear.',
      bullets: ["Building packets and gate lists early.","Elevator windows matter on multi-family."],
    },
    {
      id: 'vs-warren',
      title: 'Distinct from Warren I-71 growth',
      intro: 'Different Cincinnati collar spines.',
      bullets: ["Do not recycle Mason-only playbooks.","I-75 west/northwest mix is the differentiator."],
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
        intro: 'Butler families compare Lakota, Fairfield, Hamilton City, and other districts — verify boundaries; do not assume Cincinnati Public maps apply.',
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
            detail: 'Fort Hamilton and regional Cincinnati medical systems serve the collar; map peak freeflow on I-75 corridors.',
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
    intro: 'Empty miles, multi-family access, and I-75 peaks often matter more than raw miles.',
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
    intro: 'School years and industrial calendars reshape demand more than downtown festival peaks alone.',
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
      { label: 'Hamilton County movers (parent contrast)', href: '/local-movers/ohio/hamilton' },
    ],
  },
});
