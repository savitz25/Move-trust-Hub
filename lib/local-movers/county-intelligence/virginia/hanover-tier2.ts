import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeVaTier2Pack,
  VA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/virginia/va-tier2-shared';

/** hanover — VA Tier 2 Wave 1 */
export const hanoverCountyVaTier2Intelligence: CountyIntelligencePack = finalizeVaTier2Pack({
  countySlug: 'hanover',
  hubTitle: 'Hanover County Moving Intelligence Hub',
  eyebrow: 'Hanover · Ashland / Mechanicsville edge · Richmond north · vs Henrico',
  h1: 'Moving in Hanover County: Ashland, Mechanicsville Edge & I-95 / I-295 North Collar',
  heroOpener: 'Hanover County is Richmond’s north growth collar — Ashland multi-story and seat stock, Mechanicsville-edge HOAs shared with Henrico freeflow, I-95 / I-295 corridors, and product that is not Henrico’s continuous Short Pump / Innsbrook density alone. Expect longer empty miles into the city core, school-calendar SFH volume, and portal-to-portal time that map miles understate. This guide is for people moving in Hanover as Richmond-north collar product — not a Henrico rename.',
  heroCredibility: 'North-Richmond collar · I-95 / I-295 · Virginia DMV household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-95 · I-295 · US-301 · US-360 · VA-54 · VA-156 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Henrico County',
    parentHref: '/local-movers/virginia/henrico',
    title: 'Compared with Henrico County',
    intro: 'Hanover is Ashland / Mechanicsville-edge north-collar growth — not Henrico Short Pump multi-family density and not Chesterfield south-collar product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Henrico crews fight I-64/I-295 and west-end peaks. Hanover pairs ride I-95 north, I-295, and Ashland arterials — freer mid-day further north, still peak-heavy on commute windows into Richmond.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Henrico mixes west-end multi-family and planned suburbs. Hanover mixes Ashland multi-story, Mechanicsville-edge SFH, and rural north lots — more continuous north-collar mix with a true seat town.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Growth HOAs need COI packets; Ashland multi-story needs stair inventories uncommon on pure Short Pump cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Hanover quotes often sit at north-collar rates for driveway SFH — empty miles into Richmond still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Hanover is Richmond-north I-95/I-295 collar — not Henrico renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Hanover County different',
    intro: 'I-95 north freeflow, Ashland multi-story, and north-collar empty miles — not a Henrico clone.',
    bullets: [
      {
        title: 'I-95 / I-295 freeflow is billable',
        detail: 'Ashland ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Henrico west-end density',
        detail: 'North-collar seat-town mix is not Short Pump multi-family alone.',
      },
      {
        title: 'Ashland multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Rural north empty miles matter',
        detail: 'Do not quote Henrico local rates for far northern lots.',
      },
      VA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Hanover zones: Ashland seat, Mechanicsville edge, I-95 corridors & rural north',
  zonesIntro: 'Two to four sharp products under one Richmond-north label.',
  zones: [
    {
      id: 'ashland',
      name: 'Ashland multi-story & seat',
      shortName: 'Ashland',
      neighborhoods: ["Ashland","seat neighborhoods"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["ashland"],
    },
    {
      id: 'mechanicsville',
      name: 'Mechanicsville edge growth',
      shortName: 'Mechanicsville edge',
      neighborhoods: ["Mechanicsville edges","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Commute peaks"],
      moverTips: 'Collect COI early; clarify county line for freeflow assumptions.',
      cityKeywords: ["mechanicsville"],
    },
    {
      id: 'i95',
      name: 'I-95 / I-295 corridor suburbs',
      shortName: 'I-95 corridors',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["I-95 peaks"],
      moverTips: 'Price portal-to-portal toward Richmond.',
      cityKeywords: ["hanover i-95"],
    },
    {
      id: 'rural-north',
      name: 'Rural north & larger lots',
      shortName: 'Rural north',
      neighborhoods: ["northern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["hanover north"],
    }
  ],
  specialized: [
    {
      id: 'i95-north',
      title: 'I-95 / I-295 north-collar freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Henrico elevator rates for Ashland multi-story."],
    },
    {
      id: 'ashland-city',
      title: 'Ashland multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'vs-henrico',
      title: 'Distinct from Henrico west-end',
      intro: 'North collar differs from Short Pump density.',
      bullets: ["Do not recycle Innsbrook-only playbooks.","Ashland/Mechanicsville mix is the differentiator."],
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
        intro: 'Hanover families compare Hanover County Schools feeders across Ashland and Mechanicsville edges — verify boundaries; do not assume Henrico maps apply.',
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
            detail: 'Regional hospitals and Richmond medical systems serve the north collar; map peak freeflow on I-95/I-295 corridors.',
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
    intro: 'Empty miles, city access, and I-95 peaks often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than downtown event calendars alone.',
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
      { label: 'Henrico County movers (parent contrast)', href: '/local-movers/virginia/henrico' },
    ],
  },
});
