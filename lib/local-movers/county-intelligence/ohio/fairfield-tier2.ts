import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** fairfield — OH Tier 2 Wave 1 */
export const fairfieldCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'fairfield',
  hubTitle: 'Fairfield County Moving Intelligence Hub',
  eyebrow: 'Fairfield · Lancaster / Pickerington edge · Columbus SE · vs Franklin',
  h1: 'Moving in Fairfield County: Lancaster Seat, Pickerington Edge & US-33 Southeast Access',
  heroOpener: 'Fairfield County is Columbus’s southeast collar — Lancaster multi-story and seat stock, Pickerington-edge growth shared with Franklin freeflow, US-33 corridors, and product that is not Delaware’s north Powell HOA pattern and not Licking’s Newark east-metro mix alone. Expect longer empty miles into the core, HOA pockets on the metro edge, and small-city stairs in Lancaster. This guide is for people moving in Fairfield as Columbus-southeast product — not a Franklin rename.',
  heroCredibility: 'US-33 corridor · Lancaster / Pickerington edge · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-33 · US-22 · SR-37 · SR-158 · SR-188 · I-70 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Franklin County',
    parentHref: '/local-movers/ohio/franklin',
    title: 'Compared with Franklin County',
    intro: 'Fairfield is Lancaster / Pickerington-edge US-33 southeast product — not Short North elevators and not Delaware north-collar growth alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Franklin crews fight I-70/I-71 core peaks. Fairfield pairs ride US-33, SR-37, and Lancaster arterials — freer mid-day southeast of I-270, still peak-heavy on commute windows into the core.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Delaware skews continuous premium north HOAs. Fairfield mixes Lancaster multi-story, Pickerington-edge planned SFH, and rural lots — more continuous seat-city product, less continuous pure top-growth north villages.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Lancaster multi-story needs stair inventories; metro-edge HOAs need COI packets.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Fairfield quotes often sit at southeast-collar rates for driveway SFH — empty miles and city access still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Fairfield is Columbus-southeast US-33 product — not Franklin core renamed and not Delaware north growth.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Fairfield County different',
    intro: 'US-33 freeflow, Lancaster multi-story, and SE empty miles — not a Delaware north clone.',
    bullets: [
      {
        title: 'US-33 freeflow is billable',
        detail: 'Lancaster ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Delaware north growth',
        detail: 'Southeast seat-city mix is not Powell premium HOA product alone.',
      },
      {
        title: 'Distinct from Licking east-metro',
        detail: 'US-33 southeast is not Newark/Pataskala east product alone.',
      },
      {
        title: 'Lancaster multi-story is first-class',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Fairfield zones: Lancaster core, Pickerington edge, US-33 corridors & rural south',
  zonesIntro: 'Two to four sharp products under one Columbus-southeast label.',
  zones: [
    {
      id: 'lancaster',
      name: 'Lancaster city multi-story',
      shortName: 'Lancaster',
      neighborhoods: ["Lancaster","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["lancaster oh"],
    },
    {
      id: 'pickerington-edge',
      name: 'Pickerington metro-edge growth',
      shortName: 'Pickerington edge',
      neighborhoods: ["Pickerington edges","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Commute peaks"],
      moverTips: 'Collect COI early; clarify county line for freeflow assumptions.',
      cityKeywords: ["pickerington"],
    },
    {
      id: 'us33',
      name: 'US-33 corridor suburbs',
      shortName: 'US-33 corridors',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["US-33 peaks"],
      moverTips: 'Price portal-to-portal toward Columbus.',
      cityKeywords: ["fairfield us-33"],
    },
    {
      id: 'rural-south',
      name: 'Rural south & larger lots',
      shortName: 'Rural south',
      neighborhoods: ["southern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["fairfield south"],
    }
  ],
  specialized: [
    {
      id: 'us33',
      title: 'US-33 southeast freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Franklin elevator rates for Lancaster multi-story."],
    },
    {
      id: 'lancaster-city',
      title: 'Lancaster multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'vs-north-east',
      title: 'Distinct from Delaware and Licking',
      intro: 'Southeast differs from north growth and east-metro.',
      bullets: ["Do not recycle Powell-only or Newark-only playbooks.","US-33 Lancaster mix is the differentiator."],
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
        intro: 'Fairfield families compare Lancaster City, Pickerington, Fairfield Union, and other districts — verify boundaries; metro-edge reputation does not replace district maps.',
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
            detail: 'Fairfield Medical Center and Columbus-region systems serve the southeast collar; map peak freeflow on US-33 corridors.',
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
    intro: 'Empty miles, city access, and US-33 peaks often matter more than raw miles.',
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
