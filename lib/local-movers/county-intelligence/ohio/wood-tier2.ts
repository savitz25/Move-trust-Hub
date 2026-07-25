import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** wood — OH Tier 2 Wave 1 */
export const woodCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'wood',
  hubTitle: 'Wood County Moving Intelligence Hub',
  eyebrow: 'Wood · Bowling Green / Perrysburg · Toledo south · vs Lucas',
  h1: 'Moving in Wood County: Bowling Green University Hub, Perrysburg & I-75 South Collar',
  heroOpener: 'Wood County is Toledo’s south collar and university hub — Bowling Green multi-story and student multi-family, Perrysburg planned growth, I-75 freeflow, and product that is not Lucas’s Toledo core multi-unit density alone. Expect term-weekend spikes, longer empty miles into Toledo, and HOA packets on Perrysburg streets. This guide is for people moving in Wood as Toledo-south / BG university product — not a Toledo rename.',
  heroCredibility: 'University + I-75 south collar · Perrysburg growth · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-23 · US-6 · SR-25 · SR-64 · SR-582 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Lucas County',
    parentHref: '/local-movers/ohio/lucas',
    title: 'Compared with Lucas County',
    intro: 'Wood is Bowling Green university / Perrysburg south-collar product — not Toledo core multi-unit density and not pure lake-plain industrial freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Lucas crews fight Toledo core freeflow. Wood pairs ride I-75, US-23, and Perrysburg corridors — freer mid-day south of the core, still peak-heavy on term weekends and I-75 peaks.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Lucas mixes Toledo multi-story and Maumee edges. Wood mixes BG student multi-family, Perrysburg planned SFH, and rural lots — more continuous university and south-collar product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Student buildings need management packets; Perrysburg HOAs need COI; MI border jobs still flip to FMCSA.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Wood quotes often sit at secondary south-of-Toledo rates for driveway SFH — term spikes push multi-family prices up.',
      },
      {
        title: 'Role difference',
        detail: 'Wood is Toledo-south university / I-75 collar — not Lucas core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Wood County different',
    intro: 'BG term calendars, Perrysburg HOAs, and I-75 freeflow — not a Toledo-core clone.',
    bullets: [
      {
        title: 'Bowling Green term calendars spike demand',
        detail: 'Move-in/move-out weekends fill local crews first — book early.',
      },
      {
        title: 'I-75 freeflow is billable',
        detail: 'Perrysburg ↔ Toledo pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Student multi-family needs building packets',
        detail: 'Elevators and long carries need inventories different from pure SFH playbooks.',
      },
      {
        title: 'MI adjacency can create interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Wood zones: Bowling Green campus, Perrysburg growth, I-75 corridors & rural south',
  zonesIntro: 'Two to four sharp products under one Toledo-south label.',
  zones: [
    {
      id: 'bowling-green',
      name: 'Bowling Green university multi-family',
      shortName: 'Bowling Green',
      neighborhoods: ["Bowling Green","campus edges"],
      housingTypes: 'Student multi-family, multi-story, SFH',
      challenges: ["Term clusters","Building COIs","Stairs"],
      moverTips: 'Book early around term calendars; collect management packets.',
      cityKeywords: ["bowling green"],
    },
    {
      id: 'perrysburg',
      name: 'Perrysburg planned growth',
      shortName: 'Perrysburg',
      neighborhoods: ["Perrysburg","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","I-75 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Toledo.',
      cityKeywords: ["perrysburg"],
    },
    {
      id: 'i75-corridors',
      name: 'I-75 corridor suburbs',
      shortName: 'I-75 corridors',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Commute peaks"],
      moverTips: 'Avoid peak I-75 windows when possible.',
      cityKeywords: ["wood i-75"],
    },
    {
      id: 'rural-south',
      name: 'Rural south & larger lots',
      shortName: 'Rural south',
      neighborhoods: ["southern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["wood south"],
    }
  ],
  specialized: [
    {
      id: 'bgsu-turnover',
      title: 'Bowling Green university term turnover',
      intro: 'Term calendars create multi-family clusters.',
      bullets: ["Book early around move-in/move-out weekends.","Expect short-notice multi-family demand."],
    },
    {
      id: 'perrysburg-hoa',
      title: 'Perrysburg HOA growth logistics',
      intro: 'Master-plan rules are first-class cost drivers.',
      bullets: ["Gate lists early.","Weekday windows often beat Saturdays."],
    },
    {
      id: 'i75-south',
      title: 'I-75 south-of-Toledo freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Toledo elevator rates for BG campus apartments."],
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
        intro: 'Wood families compare Bowling Green, Perrysburg, Eastwood, and other districts — verify boundaries; university housing patterns do not replace district maps for family SFH.',
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
            detail: 'Wood County Hospital and Toledo-region systems serve the south collar; map peak freeflow on I-75 corridors.',
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
    intro: 'Term spikes, HOA soft costs, and I-75 peaks often matter more than raw miles.',
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
    intro: 'University calendars and school years reshape demand more than Toledo industrial peaks alone.',
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
      { label: 'Lucas County movers (parent contrast)', href: '/local-movers/ohio/lucas' },
    ],
  },
});
