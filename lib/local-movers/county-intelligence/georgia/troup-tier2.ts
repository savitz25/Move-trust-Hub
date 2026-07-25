import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** troup — GA Tier 2 Wave 2 */
export const troupCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'troup',
  hubTitle: 'Troup County Moving Intelligence Hub',
  eyebrow: 'Troup · LaGrange · I-85 west Georgia · vs Coweta',
  h1: 'Moving in Troup County: LaGrange, I-85 West Corridor & Alabama Border Access',
  heroOpener: 'Troup County is west Georgia’s I-85 corridor hub — LaGrange multi-story and seat density, longer empty miles than Coweta’s Newnan outer collar, AL border adjacency, and product that is not a Coweta rename. Expect small-city stairs, industrial-adjacent residential, and freeflow that still peaks hard on I-85. This guide is for people moving in Troup as LaGrange I-85 west product — not Newnan film-edge growth with different labels.',
  heroCredibility: 'I-85 west corridor · AL border · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-85 · US-27 · US-29 · GA-109 · GA-219 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Coweta County (and independent west GA patterns)',
    parentHref: '/local-movers/georgia/coweta',
    title: 'Compared with Coweta County (and independent west GA patterns)',
    intro: 'Troup is LaGrange I-85 west / AL-border product — not Coweta Newnan film-edge outer collar alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Coweta crews fight I-85 closer to the Perimeter. Troup pairs ride I-85 further west, US-27, and LaGrange arterials — freer mid-day west freeflow, still peak-heavy on school and industrial-shift windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Coweta mixes Newnan multi-story and Senoia film-edge homes. Troup mixes LaGrange multi-story, industrial-edge SFH, and larger-lot edges — more continuous west-GA hub product, less continuous Atlanta-outer film/residential mix.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; AL border hops flip jobs to interstate authority more often than pure in-metro Coweta pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Troup quotes often sit at secondary west-GA rates for driveway SFH — empty miles from Coweta/Atlanta staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Troup is I-85 west LaGrange / AL-border product — not Coweta Newnan renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Troup County different',
    intro: 'I-85 west freeflow, LaGrange multi-story, and AL border legs — not a Coweta clone.',
    bullets: [
      {
        title: 'I-85 west freeflow is billable',
        detail: 'LaGrange ↔ Coweta pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'AL adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'LaGrange multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Distinct from Newnan film-edge product',
        detail: 'Do not recycle Senoia production playbooks for LaGrange industrial-edge days.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Troup zones: LaGrange core, I-85 growth, industrial-edge residential & rural west',
  zonesIntro: 'Two to four sharp products under one I-85 west hub label.',
  zones: [
    {
      id: 'lagrange',
      name: 'LaGrange seat & core',
      shortName: 'LaGrange',
      neighborhoods: ["LaGrange","downtown edges"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Stairs","Street parking","Arterial timing"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["lagrange"],
    },
    {
      id: 'i85-growth',
      name: 'I-85 corridor growth',
      shortName: 'I-85 growth',
      neighborhoods: ["growth villages","corridor SFH"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","I-85 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Coweta/Atlanta.',
      cityKeywords: ["troup growth"],
    },
    {
      id: 'industrial-edge',
      name: 'Industrial-edge residential',
      shortName: 'Industrial edge',
      neighborhoods: ["manufacturing-adjacent neighborhoods"],
      housingTypes: 'SFH near industrial freeflow',
      challenges: ["Shift timing","Truck traffic"],
      moverTips: 'Avoid shift peaks when possible; price portal-to-portal.',
      cityKeywords: ["troup industrial"],
    },
    {
      id: 'rural-west',
      name: 'Rural west & AL approaches',
      shortName: 'Rural west',
      neighborhoods: ["western towns","border approaches"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Border interstate"],
      moverTips: 'Photo last-mile; clarify AL destinations for FMCSA authority.',
      cityKeywords: ["troup west"],
    }
  ],
  specialized: [
    {
      id: 'i85-west',
      title: 'I-85 west freeflow',
      intro: 'Outer pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Coweta Newnan rates for LaGrange multi-story days."],
    },
    {
      id: 'al-border',
      title: 'Alabama border interstate legs',
      intro: 'Short-looking hops still need FMCSA.',
      bullets: ["Clarify destination state before deposit.","Verify USDOT/MC on interstate quotes."],
    },
    {
      id: 'lagrange-city',
      title: 'LaGrange multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
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
        intro: 'Troup families compare Troup County Schools feeders across LaGrange — verify boundaries; do not assume Coweta maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Georgia DOE data and district maps; do not assume a city name equals one feeder pattern.',
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
            detail: 'Wellstar West Georgia Medical Center and regional clinics anchor acute care; map peak freeflow on LaGrange–I-85 corridors.',
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
    intro: 'Empty miles, city access, and I-85 peaks often matter more than raw miles.',
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
    intro: 'School years and industrial calendars reshape demand more than Coweta film peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'School & institutional calendars', detail: 'Term, tourism, or industrial windows can outrank pure weekend demand.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Georgia DPS MCCD household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Coweta County (and independent west GA patterns) movers (parent contrast)', href: '/local-movers/georgia/coweta' },
    ],
  },
});
