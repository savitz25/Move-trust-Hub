import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** frederick — VA Tier 2 Wave 1 */
export const frederickCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'frederick',
  hubTitle: 'Frederick County Moving Intelligence Hub',
  eyebrow: 'Frederick · Winchester · northern Shenandoah · independent',
  h1: 'Moving in Frederick County: Winchester Hub, I-81 North Valley & Border Access',
  heroOpener: 'Frederick County is northern Shenandoah independent product — Winchester multi-story and seat density, I-81 freeflow, WV/MD border adjacency, and product that does not answer to NoVA I-66 multi-family defaults. Expect longer empty miles into the city, industrial-edge residential, and freeflow that is not Fairfax or Loudoun product. This guide is for people moving in Frederick as Winchester north-valley product — not a NoVA rename. (VA export avoids Maryland Frederick name clash.)',
  heroCredibility: 'I-81 north valley · Border adjacency · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · US-11 · US-50 · US-522 · VA-7 approaches · VA-37',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent north Shenandoah valley hub (vs NoVA defaults)',
    parentHref: '/local-movers/virginia/loudoun',
    title: 'Compared with independent north Shenandoah valley hub (vs NoVA defaults)',
    intro: 'Frederick is Winchester I-81 north-valley product — not Loudoun data-center growth and not Fairfax tower density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'NoVA crews fight I-66 and Dulles peaks. Frederick pairs ride I-81, US-11, and Winchester arterials — freer mid-day valley freeflow, still peak-heavy on school and industrial-shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Loudoun mixes continuous planned growth. Frederick mixes Winchester multi-story, industrial-edge SFH, and rural valley lots — more continuous secondary hub product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; border hops flip jobs to FMCSA more often than pure in-county pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Frederick quotes often sit at secondary valley rates for driveway SFH — empty miles and city access still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Frederick is independent Winchester north-valley product — not NoVA renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Frederick County different',
    intro: 'I-81 freeflow, Winchester multi-story, and border interstate legs — not a NoVA clone.',
    bullets: [
      {
        title: 'I-81 freeflow is billable',
        detail: 'Winchester pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'WV / MD adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'Winchester multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Distinct from Loudoun outer-NOVA growth',
        detail: 'Do not recycle data-center corridor playbooks for valley industrial-edge days.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Frederick zones: Winchester core, I-81 corridors, industrial-edge residential & rural west',
  zonesIntro: 'Two to four sharp products under one north-valley label.',
  zones: [
    {
      id: 'winchester',
      name: 'Winchester multi-story & seat edges',
      shortName: 'Winchester edges',
      neighborhoods: ["Winchester edges","city-adjacent"],
      housingTypes: 'Multi-story, SFH, multi-unit',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking; confirm city vs county line.',
      cityKeywords: ["winchester"],
    },
    {
      id: 'i81',
      name: 'I-81 corridor suburbs',
      shortName: 'I-81 corridors',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["I-81 peaks","HOA packets"],
      moverTips: 'Price portal-to-portal; collect HOA rules.',
      cityKeywords: ["frederick va i-81"],
    },
    {
      id: 'industrial',
      name: 'Industrial-edge residential',
      shortName: 'Industrial edge',
      neighborhoods: ["industrial-adjacent neighborhoods"],
      housingTypes: 'SFH near industrial freeflow',
      challenges: ["Shift timing"],
      moverTips: 'Avoid shift peaks when possible.',
      cityKeywords: ["frederick industrial"],
    },
    {
      id: 'rural-west',
      name: 'Rural west & larger lots',
      shortName: 'Rural west',
      neighborhoods: ["western towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["frederick va west"],
    }
  ],
  specialized: [
    {
      id: 'i81-north',
      title: 'I-81 north-valley freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Loudoun multi-family rates for rural valley lots."],
    },
    {
      id: 'border',
      title: 'WV / MD border interstate legs',
      intro: 'Short-looking hops still need FMCSA.',
      bullets: ["Clarify destination state before deposit.","Verify USDOT/MC on interstate quotes."],
    },
    {
      id: 'winchester-access',
      title: 'Winchester multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Confirm city vs county curb rules."],
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
        intro: 'Frederick families compare Frederick County Schools and related options — verify boundaries; independent-city Winchester schools differ.',
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
            detail: 'Valley Health and regional systems serve the market; map peak freeflow on I-81 corridors.',
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
    intro: 'Empty miles, city access, and I-81 peaks often matter more than raw miles.',
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
    intro: 'School years and industrial calendars reshape demand more than NoVA office peaks alone.',
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
      { label: 'independent north Shenandoah valley hub (vs NoVA defaults) movers (parent contrast)', href: '/local-movers/virginia/loudoun' },
    ],
  },
});
