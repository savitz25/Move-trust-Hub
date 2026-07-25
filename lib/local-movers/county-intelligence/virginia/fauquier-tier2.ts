import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** fauquier — VA Tier 2 Wave 1 */
export const fauquierCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'fauquier',
  hubTitle: 'Fauquier County Moving Intelligence Hub',
  eyebrow: 'Fauquier · Warrenton · outer NOVA / hunt-country edge · vs Prince William',
  h1: 'Moving in Fauquier County: Warrenton Seat, Hunt-Country Lots & US-17 / I-66 Outer Access',
  heroOpener: 'Fauquier County is outer Northern Virginia and hunt-country edge product — Warrenton multi-story and seat stock, lower-density rural-suburban lots, US-17 / I-66 approaches, and freeflow that is not Prince William’s continuous I-95 multi-family density and not Loudoun data-center growth alone. Expect longer empty miles into NoVA cores, HOA pockets on growth edges, and last-mile that rejects full trailers on many farms and estates. This guide is for people moving in Fauquier as outer-NOVA lower-density product — not a Prince William rename.',
  heroCredibility: 'Outer NOVA · Hunt-country edge · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-66 · US-17 · US-29 · US-15 · US-211 · VA-28 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Prince William County (and Loudoun outer patterns)',
    parentHref: '/local-movers/virginia/prince-william',
    title: 'Compared with Prince William County (and Loudoun outer patterns)',
    intro: 'Fauquier is Warrenton / hunt-country outer-NOVA product — not PW Woodbridge multi-family density and not Loudoun continuous planned growth alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Prince William crews fight I-95/VA-234 peaks. Fauquier pairs ride US-17, I-66, and Warrenton arterials — freer mid-day further west, still peak-heavy on commute windows into NoVA.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Prince William mixes continuous multi-family collars. Fauquier mixes Warrenton multi-story, hunt-country large lots, and light growth HOAs — more continuous lower-density product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Large-lot and estate approaches often need smaller trucks or long carries; growth HOAs need COI packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Fauquier quotes often sit at outer-NOVA rates for driveway SFH — empty miles into NoVA and long last-mile still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Fauquier is outer-NOVA hunt-country edge — not Prince William renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Fauquier County different',
    intro: 'US-17 freeflow, hunt-country last-mile, and outer empty miles — not a PW clone.',
    bullets: [
      {
        title: 'US-17 / I-66 freeflow is billable',
        detail: 'Warrenton ↔ NoVA pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Hunt-country last-mile rewrites truck size',
        detail: 'Photo approaches; many estates reject full trailers.',
      },
      {
        title: 'Distinct from Prince William multi-family density',
        detail: 'Lower-density outer product is not Woodbridge apartment corridors.',
      },
      {
        title: 'Distinct from Loudoun continuous growth',
        detail: 'Do not recycle data-center corridor playbooks for hunt-country lots.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Fauquier zones: Warrenton seat, US-17 growth edge, hunt-country lots & rural south',
  zonesIntro: 'Two to four sharp products under one outer-NOVA label.',
  zones: [
    {
      id: 'warrenton',
      name: 'Warrenton multi-story & seat',
      shortName: 'Warrenton',
      neighborhoods: ["Warrenton","seat neighborhoods"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["warrenton"],
    },
    {
      id: 'us17',
      name: 'US-17 growth edge villages',
      shortName: 'US-17 edge',
      neighborhoods: ["growth villages","corridor edges"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","US-17 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward NoVA.',
      cityKeywords: ["fauquier us-17"],
    },
    {
      id: 'hunt',
      name: 'Hunt-country large lots',
      shortName: 'Hunt country',
      neighborhoods: ["estate roads","large lots"],
      housingTypes: 'Large lots, estate approaches',
      challenges: ["Last-mile width","Long carries","Empty miles"],
      moverTips: 'Photo approaches; confirm truck size early.',
      cityKeywords: ["fauquier hunt"],
    },
    {
      id: 'rural-south',
      name: 'Rural south & larger lots',
      shortName: 'Rural south',
      neighborhoods: ["southern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["fauquier south"],
    }
  ],
  specialized: [
    {
      id: 'outer-nova',
      title: 'US-17 / I-66 outer-NOVA freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote PW multi-family rates for hunt-country estates."],
    },
    {
      id: 'hunt-last-mile',
      title: 'Hunt-country last-mile logistics',
      intro: 'Long drives rewrite truck size.',
      bullets: ["Photo approaches before final quote.","Shuttle conversations beat stuck trailers."],
    },
    {
      id: 'vs-pw',
      title: 'Distinct from Prince William density',
      intro: 'Outer lower-density product differs from I-95 multi-family collars.',
      bullets: ["Do not recycle Woodbridge-only playbooks.","Warrenton + hunt-country mix is the differentiator."],
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
        intro: 'Fauquier families compare Fauquier County Schools feeders across Warrenton and growth edges — verify boundaries; do not assume Prince William maps apply.',
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
            detail: 'Fauquier Health and regional NoVA systems serve the market; map peak freeflow on US-17/I-66 corridors.',
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
    intro: 'Empty miles, long last-mile, and outer freeflow peaks often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than pure NoVA office peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Institutional calendars', detail: 'Term, PCS, or tourism windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Virginia DMV household-goods / motor-carrier authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Prince William County (and Loudoun outer patterns) movers (parent contrast)', href: '/local-movers/virginia/prince-william' },
    ],
  },
});
