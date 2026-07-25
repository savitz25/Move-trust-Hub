import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** hall — GA Tier 2 Wave 1 */
export const hallCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'hall',
  hubTitle: 'Hall County Moving Intelligence Hub',
  eyebrow: 'Hall · Northeast · Gainesville / Lanier · vs Gwinnett',
  h1: 'Moving in Hall County: Gainesville, Lake Lanier Edge & I-985 Manufacturing Corridor',
  heroOpener: 'Hall County is northeast Georgia’s I-985 independent-leaning hub — Gainesville multi-story and manufacturing-adjacent residential, Lake Lanier edge living, and freeflow that is not Gwinnett’s I-85 diversity core. Expect longer empty miles from Atlanta staging, poultry/manufacturing corridor peaks, and lake last-mile on some edges. This guide is for people moving in Hall as Gainesville / Lanier product — not a Gwinnett rename.',
  heroCredibility: 'I-985 corridor · Manufacturing + lake residential · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-985 · US-129 · GA-365 · GA-53 · Spout Springs Road',
  parentCompare: {
    parentLabel: 'Gwinnett County',
    parentHref: '/local-movers/georgia/gwinnett',
    title: 'Compared with Gwinnett County',
    intro: 'Hall is Gainesville / Lanier I-985 product with manufacturing adjacency — not Gwinnett I-85 multi-family and HOA density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Gwinnett crews fight I-85 and 316 peaks. Hall pairs ride I-985, US-129, and Gainesville arterials — freer mid-day northeast of Gwinnett cores, still peak-heavy on manufacturing-shift and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Gwinnett mixes diverse multi-family and dense HOAs. Hall mixes Gainesville multi-story, manufacturing-edge SFH, and Lanier-edge homes — more continuous secondary-hub product, less continuous I-85 apartment density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; lake approaches can add narrow roads uncommon on pure Suwanee cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Hall quotes often sit at secondary NE-metro rates for driveway SFH — empty miles from Atlanta staging and lake last-mile still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Hall is Gainesville manufacturing + Lanier residential hub — not Gwinnett renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Hall County different',
    intro: 'I-985 freeflow, manufacturing calendars, and Lanier edges — not a Gwinnett clone.',
    bullets: [
      {
        title: 'Manufacturing-shift windows rewrite arterials',
        detail: 'Industrial freeflow can choke residential pairs at shift change.',
      },
      {
        title: 'Gainesville multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Lake Lanier edges rewrite truck size',
        detail: 'Photo last-mile on lake approaches.',
      },
      {
        title: 'Empty miles from Atlanta staging are billable',
        detail: 'Do not quote pure Gwinnett local rates for Gainesville deadhead.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Hall zones: Gainesville core, I-985 growth, Lanier edge & rural north/east',
  zonesIntro: 'Two to four sharp products under one I-985 hub label.',
  zones: [
    {
      id: 'gainesville',
      name: 'Gainesville city core',
      shortName: 'Gainesville',
      neighborhoods: ["Gainesville","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["gainesville"],
    },
    {
      id: 'i985-growth',
      name: 'I-985 growth villages',
      shortName: 'I-985 growth',
      neighborhoods: ["growth HOAs","corridor villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Corridor peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Gwinnett.',
      cityKeywords: ["hall growth"],
    },
    {
      id: 'lanier',
      name: 'Lake Lanier edge',
      shortName: 'Lanier edge',
      neighborhoods: ["lake approaches","Lanier-adjacent streets"],
      housingTypes: 'SFH, some seasonal constraints',
      challenges: ["Narrow roads","Last-mile width"],
      moverTips: 'Photo approaches; confirm truck size early.',
      cityKeywords: ["lake lanier hall"],
    },
    {
      id: 'rural',
      name: 'Rural north/east pockets',
      shortName: 'Rural edge',
      neighborhoods: ["northern/eastern towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["hall rural"],
    }
  ],
  specialized: [
    {
      id: 'i985',
      title: 'I-985 manufacturing corridor freeflow',
      intro: 'Shift windows rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Avoid peak industrial windows when possible."],
    },
    {
      id: 'gainesville-city',
      title: 'Gainesville multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'lanier-edge',
      title: 'Lake Lanier edge logistics',
      intro: 'Last-mile width changes truck type.',
      bullets: ["Photo approaches before final quote.","Seasonal parking can tighten lake streets."],
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
        intro: 'Hall families compare Hall County and Gainesville City Schools feeders — verify boundaries; do not assume Gwinnett maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university/military markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Northeast Georgia Medical Center and regional clinics anchor acute care; map peak freeflow on I-985 and Gainesville arterials.',
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
    intro: 'Manufacturing peaks, city access, and lake last-mile often matter more than raw miles.',
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
    intro: 'School years, industrial calendars, and summer lake living reshape demand more than pure Gwinnett HOA peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, PCS, or school windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Gwinnett County movers (parent contrast)', href: '/local-movers/georgia/gwinnett' },
    ],
  },
});
