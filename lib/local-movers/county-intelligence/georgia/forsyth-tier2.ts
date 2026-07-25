import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** forsyth — GA Tier 2 Wave 1 */
export const forsythCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'forsyth',
  hubTitle: 'Forsyth County Moving Intelligence Hub',
  eyebrow: 'Forsyth · North Atlanta collar · Cumming / Lanier · vs Fulton',
  h1: 'Moving in Forsyth County: Cumming, Lake Lanier Edge & GA-400 North Growth',
  heroOpener: 'Forsyth County is north Atlanta’s GA-400 growth collar — Cumming seat density, Lake Lanier-edge approaches, top-growth HOA subdivisions, and freeflow that still peaks hard toward Alpharetta and the Perimeter. It is not Fulton intown product and not Cherokee’s I-575 pattern: expect GA-400 commute clocks, lake last-mile on some edges, and affluent planned-community packets. This guide is for people moving in Forsyth as north-collar GA-400 product — not a Fulton rename.',
  heroCredibility: 'GA-400 north growth · Lake Lanier edge · HOA density · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'GA-400 · GA-20 · GA-141 · US-19 · McFarland Pkwy',
  parentCompare: {
    parentLabel: 'Fulton County (and Gwinnett northeast patterns)',
    parentHref: '/local-movers/georgia/fulton',
    title: 'Compared with Fulton County (and Gwinnett northeast patterns)',
    intro: 'Forsyth is GA-400 / Cumming north-collar growth with Lanier-edge product — not Fulton towers and not Gwinnett I-85 diversity core alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Fulton north crews fight GA-400 and Perimeter chokes. Forsyth pairs ride GA-400, GA-20, and McFarland corridors — freer mid-day further north, still peak-heavy on Cumming ↔ Alpharetta freeflow and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Fulton mixes towers and north-Fulton estates. Forsyth skews Cumming growth SFH, lake-edge homes, and high-HOA planned villages — more continuous top-growth HOA product, less continuous Midtown multi-family.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Gate lists and HOA hours dominate; lake approaches can add narrow roads and seasonal staging uncommon on pure Alpharetta office-park days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Forsyth quotes often sit at premium north-collar rates for comparable SFH when access is clean — HOA soft costs and GA-400 peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail: 'Forsyth is GA-400 top-growth north collar with Lanier edge — not Fulton core and not Cherokee I-575 renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Forsyth County different',
    intro: 'GA-400 freeflow, Lanier edges, and premium HOA growth — not a Fulton or Cherokee clone.',
    bullets: [
      {
        title: 'GA-400 commute clocks are billable',
        detail: 'Cumming ↔ Perimeter pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Top-growth HOA density is first-class product',
        detail: 'COI, gates, and truck limits are standard on planned villages.',
      },
      {
        title: 'Lake Lanier edges rewrite truck size',
        detail: 'Some approaches need smaller trucks and photo last-mile.',
      },
      {
        title: 'Cross-county north-metro pairs are routine',
        detail: 'Forsyth ↔ Fulton, Gwinnett, or Hall is common — clarify freeflow assumptions.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Forsyth zones: Cumming seat, south GA-400 growth, Lanier edge & west/rural pockets',
  zonesIntro: 'Two to four sharp products under one GA-400 north-collar label.',
  zones: [
    {
      id: 'cumming',
      name: 'Cumming seat & core',
      shortName: 'Cumming',
      neighborhoods: ["Cumming","seat neighborhoods"],
      housingTypes: 'SFH, townhomes, mixed density',
      challenges: ["Arterial timing","HOA packets"],
      moverTips: 'Confirm driveway and HOA hours; price school-zone peaks.',
      cityKeywords: ["cumming"],
    },
    {
      id: 'south-400',
      name: 'South Forsyth / GA-400 growth',
      shortName: 'South Forsyth',
      neighborhoods: ["south growth villages","GA-400 edges"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["Gate lists","Commute peaks"],
      moverTips: 'Collect COI early; avoid GA-400 peaks when possible.',
      cityKeywords: ["south forsyth"],
    },
    {
      id: 'lanier',
      name: 'Lake Lanier edge',
      shortName: 'Lanier edge',
      neighborhoods: ["lake approaches","Lanier-adjacent streets"],
      housingTypes: 'SFH, some seasonal access constraints',
      challenges: ["Narrow roads","Last-mile width"],
      moverTips: 'Photo approaches; confirm truck size before survey final.',
      cityKeywords: ["lake lanier"],
    },
    {
      id: 'west-rural',
      name: 'West / rural-edge pockets',
      shortName: 'West edge',
      neighborhoods: ["western towns","larger lots"],
      housingTypes: 'Larger lots, longer approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; mud weeks after storms need flexibility.',
      cityKeywords: ["forsyth west"],
    }
  ],
  specialized: [
    {
      id: 'ga400',
      title: 'GA-400 north-collar freeflow',
      intro: 'Commute peaks dominate pricing math.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Fulton elevator rates for Cumming driveways."],
    },
    {
      id: 'hoa-premium',
      title: 'Premium HOA growth logistics',
      intro: 'Planned villages treat COI as default.',
      bullets: ["Gate lists and truck limits early.","Weekday windows often beat Saturdays."],
    },
    {
      id: 'lanier-edge',
      title: 'Lake Lanier edge access',
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
        intro: 'Forsyth families compare Forsyth County Schools feeders across Cumming and south growth villages — verify boundaries; north-collar reputation does not replace district maps.',
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
            detail: 'Northside Hospital Forsyth and regional clinics anchor acute care; map peak freeflow on GA-400 corridors.',
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
    intro: 'GA-400 peaks, HOA soft costs, and lake last-mile often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than intown corporate peaks alone.',
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
      { label: 'Fulton County (and Gwinnett northeast patterns) movers (parent contrast)', href: '/local-movers/georgia/fulton' },
    ],
  },
});
