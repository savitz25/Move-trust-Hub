import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** newton — GA Tier 2 Wave 2 */
export const newtonCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'newton',
  hubTitle: 'Newton County Moving Intelligence Hub',
  eyebrow: 'Newton · Covington · east Atlanta outer collar · vs Rockdale',
  h1: 'Moving in Newton County: Covington, I-20 East Growth & Film/Residential Mix',
  heroOpener: 'Newton County is east Atlanta’s I-20 outer growth collar — Covington seat density, film-adjacent residential pockets, longer empty miles than Rockdale’s Conyers inner freeflow, and product that is not a Rockdale rename. Expect HOA growth villages, small-city multi-story stock, and outer-east portal times that map miles understate. This guide is for people moving in Newton as Covington outer-east product — not Rockdale inner collar with different labels.',
  heroCredibility: 'I-20 east outer growth · Film/residential mix · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-20 · US-278 · GA-142 · GA-36 · GA-81 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Rockdale County (and DeKalb east patterns)',
    parentHref: '/local-movers/georgia/rockdale',
    title: 'Compared with Rockdale County (and DeKalb east patterns)',
    intro: 'Newton is Covington I-20 east outer growth with film/residential mix — not Rockdale Conyers inner collar and not DeKalb intown density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Rockdale crews fight closer I-20 east peaks into Conyers. Newton pairs ride I-20 further east, US-278, and Covington arterials — freer mid-day outer freeflow, still peak-heavy on school and film-production windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Rockdale mixes Conyers seat and inner HOAs. Newton mixes Covington multi-story, film-edge homes, and outer growth HOAs — more continuous outer-east product, less continuous inner-collar density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Historic Covington streets can need smaller trucks; growth HOAs need COI packets; outer lots add empty miles uncommon on pure Conyers cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Newton quotes often sit at outer-east rates for driveway SFH — empty miles from Rockdale/Atlanta staging still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Newton is I-20 east outer Covington growth — not Rockdale inner collar renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Newton County different',
    intro: 'Outer I-20 freeflow, Covington film-edge stock, and longer empty miles — not a Rockdale clone.',
    bullets: [
      {
        title: 'Outer-east empty miles are first-class',
        detail: 'Do not quote pure Rockdale local rates for Covington deadhead.',
      },
      {
        title: 'Film/residential pockets rewrite calendars',
        detail: 'Production windows can tighten small-town staging.',
      },
      {
        title: 'Distinct from Rockdale inner collar',
        detail: 'Longer freeflow and more outer growth product than Conyers.',
      },
      {
        title: 'Growth HOA product is common',
        detail: 'COI and gate lists on new villages are standard.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Newton zones: Covington seat, film/village edge, I-20 growth & rural east',
  zonesIntro: 'Two to four sharp products under one I-20 east outer-collar label.',
  zones: [
    {
      id: 'covington',
      name: 'Covington seat & core',
      shortName: 'Covington',
      neighborhoods: ["Covington","downtown edges"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Street width","Stairs","Arterial timing"],
      moverTips: 'Inventory stairs; plan temporary no-parking; measure street width.',
      cityKeywords: ["covington"],
    },
    {
      id: 'film-edge',
      name: 'Film & village edge stock',
      shortName: 'Film/village edge',
      neighborhoods: ["film-adjacent neighborhoods","village approaches"],
      housingTypes: 'Village SFH, film-adjacent stock',
      challenges: ["Narrow streets","Production windows"],
      moverTips: 'Photo street width; book around known production peaks when relevant.',
      cityKeywords: ["newton film"],
    },
    {
      id: 'i20-growth',
      name: 'I-20 outer growth villages',
      shortName: 'I-20 growth',
      neighborhoods: ["growth HOAs","corridor villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","I-20 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Rockdale/Atlanta.',
      cityKeywords: ["newton growth"],
    },
    {
      id: 'rural-east',
      name: 'Rural east & larger lots',
      shortName: 'Rural east',
      neighborhoods: ["eastern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["newton east"],
    }
  ],
  specialized: [
    {
      id: 'i20-outer',
      title: 'I-20 east outer-collar freeflow',
      intro: 'Longer empty miles still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Rockdale inner rates for outer Covington lots."],
    },
    {
      id: 'film-village',
      title: 'Film/village logistics',
      intro: 'Small-town geometry rewrites truck size.',
      bullets: ["Photo approaches.","Production windows can tighten curb plans."],
    },
    {
      id: 'growth-hoa',
      title: 'Outer-east HOA growth',
      intro: 'Planned villages treat COI as default.',
      bullets: ["Gate lists early.","Mud weeks on new streets need flexibility."],
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
        intro: 'Newton families compare Newton County Schools feeders across Covington and growth villages — verify boundaries; do not assume Rockdale maps apply.',
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
            detail: 'Piedmont Newton and regional clinics anchor acute care; map peak freeflow on I-20 east outer corridors.',
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
    intro: 'Empty miles, film-edge access, and I-20 peaks often matter more than raw miles.',
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
    intro: 'School years, summer closings, and occasional production calendars reshape demand more than Rockdale inner peaks alone.',
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
      { label: 'Rockdale County (and DeKalb east patterns) movers (parent contrast)', href: '/local-movers/georgia/rockdale' },
    ],
  },
});
