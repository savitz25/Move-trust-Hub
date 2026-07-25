import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** carroll — GA Tier 2 Wave 2 */
export const carrollCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'carroll',
  hubTitle: 'Carroll County Moving Intelligence Hub',
  eyebrow: 'Carroll · Carrollton · west outer Atlanta · vs Douglas',
  h1: 'Moving in Carroll County: Carrollton University Hub, US-27 / I-20 West Outer Ring',
  heroOpener: 'Carroll County is west Atlanta’s outer ring — Carrollton multi-story and university-adjacent stock, US-27 / I-20 freeflow, longer empty miles than Douglasville’s I-20 seat density, and product that is not a Douglas rename. Expect college calendars, small-city stairs, and outer-west HOA growth. This guide is for people moving in Carroll as Carrollton west-outer product — not Douglas I-20 collar with different labels.',
  heroCredibility: 'West outer ring · University + residential · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-20 · US-27 · GA-166 · GA-61 · GA-16 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Douglas County (and Coweta SW patterns)',
    parentHref: '/local-movers/georgia/douglas',
    title: 'Compared with Douglas County (and Coweta SW patterns)',
    intro: 'Carroll is Carrollton university / west-outer product — not Douglasville I-20 seat density and not Coweta Newnan film-edge alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Douglas crews fight I-20 closer to the Perimeter. Carroll pairs ride I-20 further west, US-27, and Carrollton arterials — freer mid-day outer freeflow, still peak-heavy on university and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Douglas mixes Douglasville SFH and I-20 HOAs. Carroll mixes Carrollton multi-story, student multi-family, and outer-lot growth — more continuous university-edge product, less continuous west-metro planned suburbs alone.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; growth HOAs need COI packets; rural west adds empty miles uncommon on pure Douglasville cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Carroll quotes often sit at outer-west secondary rates for driveway SFH — university peaks and empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Carroll is west-outer Carrollton university/residential hub — not Douglas renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Carroll County different',
    intro: 'University calendars, US-27 freeflow, and outer-west empty miles — not a Douglas clone.',
    bullets: [
      {
        title: 'University calendars spike local demand',
        detail: 'Term start/end weekends fill crews differently than pure family Saturdays.',
      },
      {
        title: 'Carrollton multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      {
        title: 'Outer-west empty miles are billable',
        detail: 'Do not quote pure Douglas local rates for Carrollton deadhead.',
      },
      {
        title: 'AL border hops create interstate legs',
        detail: 'Short-looking border destinations need FMCSA authority.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Carroll zones: Carrollton core, campus multi-family, I-20 growth & rural west',
  zonesIntro: 'Two to four sharp products under one west-outer label.',
  zones: [
    {
      id: 'carrollton',
      name: 'Carrollton seat & core',
      shortName: 'Carrollton',
      neighborhoods: ["Carrollton","downtown edges"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["carrollton"],
    },
    {
      id: 'campus',
      name: 'University-adjacent multi-family',
      shortName: 'Campus edge',
      neighborhoods: ["campus approaches","student apartments"],
      housingTypes: 'Student multi-family, apartments',
      challenges: ["Lease clusters","Building COIs"],
      moverTips: 'Book early around term calendars; collect management packets.',
      cityKeywords: ["uwest","carrollton campus"],
    },
    {
      id: 'i20-growth',
      name: 'I-20 / US-27 growth villages',
      shortName: 'Growth villages',
      neighborhoods: ["growth HOAs","corridor villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Corridor peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Douglas/Atlanta.',
      cityKeywords: ["carroll growth"],
    },
    {
      id: 'rural-west',
      name: 'Rural west & larger lots',
      shortName: 'Rural west',
      neighborhoods: ["western towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["carroll west"],
    }
  ],
  specialized: [
    {
      id: 'university',
      title: 'University-adjacent turnover',
      intro: 'Term calendars create multi-family clusters.',
      bullets: ["Book early around term start/end.","Collect elevator windows and building packets."],
    },
    {
      id: 'carrollton-city',
      title: 'Carrollton multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'outer-west',
      title: 'US-27 / I-20 outer-west freeflow',
      intro: 'Longer empty miles still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Douglasville rates for rural west lots."],
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
        intro: 'Carroll families compare Carroll County Schools feeders across Carrollton and growth villages — verify boundaries; do not assume Douglas maps apply.',
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
            detail: 'Tanner Health and regional clinics anchor acute care; map peak freeflow on Carrollton arterials.',
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
    intro: 'University peaks, city access, and empty miles often matter more than raw miles.',
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
    intro: 'Term calendars and school years reshape demand more than pure Douglas HOA peaks alone.',
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
      { label: 'Douglas County (and Coweta SW patterns) movers (parent contrast)', href: '/local-movers/georgia/douglas' },
    ],
  },
});
