import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** lowndes — GA Tier 2 Wave 2 */
export const lowndesCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'lowndes',
  hubTitle: 'Lowndes County Moving Intelligence Hub',
  eyebrow: 'Lowndes · Valdosta · South Georgia hub · independent',
  h1: 'Moving in Lowndes County: Valdosta Regional Hub, University Cycles & I-75 South Access',
  heroOpener: 'Lowndes County is South Georgia’s independent regional hub — Valdosta multi-story and university-adjacent stock, I-75 freeflow, and product that does not answer to Atlanta collar defaults. Expect term-weekend spikes, longer empty miles to rural edges, and freeflow that is not coastal Glynn tourism product. This guide is for people moving in Lowndes as Valdosta South GA hub — not an Atlanta metro rename.',
  heroCredibility: 'I-75 south regional hub · University + residential · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-41 · US-84 · GA-38 · GA-31 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent South Georgia hub (vs Atlanta collar / coastal defaults)',
    parentHref: '/local-movers/georgia/houston',
    title: 'Compared with independent South Georgia hub (vs Atlanta collar / coastal defaults)',
    intro: 'Lowndes is Valdosta university / South GA regional hub — not Atlanta HOA collars and not coastal tourism freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Atlanta collar crews fight Perimeter peaks; coastal crews fight I-95 tourism. Lowndes pairs ride I-75 south, US-41, and Valdosta arterials — freer mid-day South GA freeflow, still peak-heavy on university move weekends.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Atlanta collars mix HOA growth SFH. Lowndes mixes Valdosta multi-story, student multi-family, and rural-edge lots — more continuous secondary-hub product, less continuous metro-collar HOA density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story and student buildings need stair inventories and management packets; rural edges add empty miles uncommon on pure suburban collar days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Lowndes quotes often sit at secondary South GA rates for driveway SFH — university peaks and multi-story access push prices up.',
      },
      {
        title: 'Role difference',
        detail: 'Lowndes is independent Valdosta South GA hub — not Atlanta defaults renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Lowndes County different',
    intro: 'University calendars, Valdosta multi-story, and I-75 south freeflow — not an Atlanta clone.',
    bullets: [
      {
        title: 'University move cycles dominate demand spikes',
        detail: 'Term start/end weekends fill local crews first — book early.',
      },
      {
        title: 'Valdosta multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure rural playbooks.',
      },
      {
        title: 'FL adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'I-75 freeflow is still billable',
        detail: 'Cross-hub pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Lowndes zones: Valdosta core, campus multi-family, I-75 growth & rural edges',
  zonesIntro: 'Two to four sharp products under one South GA hub label.',
  zones: [
    {
      id: 'valdosta',
      name: 'Valdosta city core',
      shortName: 'Valdosta',
      neighborhoods: ["Valdosta","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["valdosta"],
    },
    {
      id: 'campus',
      name: 'Campus / student multi-family',
      shortName: 'Campus density',
      neighborhoods: ["university edges","student apartments"],
      housingTypes: 'Student multi-family, apartments',
      challenges: ["Lease-end clusters","Building COIs"],
      moverTips: 'Book early around term calendars; collect management packets.',
      cityKeywords: ["valdosta state"],
    },
    {
      id: 'i75-growth',
      name: 'I-75 growth SFH',
      shortName: 'I-75 growth',
      neighborhoods: ["growth villages","corridor SFH"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets"],
      moverTips: 'Collect COI early on new villages.',
      cityKeywords: ["lowndes growth"],
    },
    {
      id: 'rural',
      name: 'Rural edges & larger lots',
      shortName: 'Rural edges',
      neighborhoods: ["county towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["lowndes rural"],
    }
  ],
  specialized: [
    {
      id: 'university',
      title: 'University term-start / term-end turnover',
      intro: 'Term calendars create multi-family clusters.',
      bullets: ["Book early around move-in/move-out weekends.","Expect short-notice multi-family demand."],
    },
    {
      id: 'valdosta-city',
      title: 'Valdosta multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i75-south',
      title: 'I-75 South GA freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Atlanta collar rates for Valdosta historic days."],
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
        intro: 'Lowndes families compare Lowndes County and Valdosta City school options — verify boundaries; university housing patterns do not replace district maps for family SFH.',
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
            detail: 'South Georgia Medical Center and regional clinics anchor acute care; map peak freeflow on Valdosta arterials.',
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
    intro: 'Term spikes, city access, and empty miles often matter more than raw miles.',
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
    intro: 'University calendars and school years reshape demand more than Atlanta HOA peaks alone.',
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
      { label: 'independent South Georgia hub (vs Atlanta collar / coastal defaults) movers (parent contrast)', href: '/local-movers/georgia/houston' },
    ],
  },
});
