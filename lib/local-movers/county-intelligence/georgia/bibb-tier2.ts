import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** bibb — GA Tier 2 Wave 1 */
export const bibbCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'bibb',
  hubTitle: 'Bibb County Moving Intelligence Hub',
  eyebrow: 'Bibb · Macon · Middle Georgia hub · independent',
  h1: 'Moving in Bibb County: Macon Hub, Medical/University Corridors & I-75 / I-16 Access',
  heroOpener: 'Bibb County is Middle Georgia’s independent regional hub — Macon multi-story and historic stock, medical and university corridors, I-75 / I-16 freeflow, and product that does not answer to Atlanta collar defaults. Expect city stairs, longer empty miles to rural edges, and freeflow that is not Warner Robins PCS multi-family alone. This guide is for people moving in Bibb as Macon Middle GA hub — not Houston County renamed and not metro Atlanta recycled.',
  heroCredibility: 'Macon regional hub · Medical/university · I-75 / I-16 · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · I-16 · US-80 · US-41 · Eisenhower Parkway · Vineville corridors',
  parentCompare: {
    parentLabel: 'independent central GA hub (vs Atlanta collar / Houston AFB defaults)',
    parentHref: '/local-movers/georgia/houston',
    title: 'Compared with independent central GA hub (vs Atlanta collar / Houston AFB defaults)',
    intro: 'Bibb is Macon medical/university regional hub — not Atlanta HOA collars and not Robins AFB PCS multi-family alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Atlanta collar crews fight Perimeter peaks; Houston rides base corridors. Bibb pairs ride I-75, I-16, and Macon arterials — freer mid-day Middle GA freeflow, still peak-heavy on medical campuses and intown pairs.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Houston mixes base multi-family and Warner Robins SFH. Bibb mixes Macon multi-story, historic streets, medical-corridor stock, and suburban edges — more continuous regional city product, less continuous PCS apartment density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Historic and multi-story stock needs stair inventories; rural Bibb edges add empty miles uncommon on pure base apartment days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Bibb quotes often sit at secondary regional-hub rates for driveway SFH — multi-story access and medical peaks push prices up.',
      },
      {
        title: 'Role difference',
        detail: 'Bibb is independent Macon Middle GA hub — not Houston Robins AFB renamed and not Atlanta defaults.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Bibb County different',
    intro: 'Macon multi-story, medical/university freeflow, and I-75/I-16 access — not a Warner Robins clone.',
    bullets: [
      {
        title: 'Medical and university calendars drive spikes',
        detail: 'Campus and hospital-adjacent moves fill crews differently than pure family Saturdays.',
      },
      {
        title: 'Macon multi-story is first-class product',
        detail: 'Stairs and historic street width need inventories different from pure suburban playbooks.',
      },
      {
        title: 'I-75 / I-16 freeflow is billable',
        detail: 'Cross-hub pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Robins AFB PCS product',
        detail: 'Do not recycle military multi-family playbooks for historic Macon days.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Bibb zones: Macon core, medical/university corridors, north suburban edges & rural south',
  zonesIntro: 'Two to four sharp products under one Middle GA hub label.',
  zones: [
    {
      id: 'macon-core',
      name: 'Macon city core & historic stock',
      shortName: 'Macon core',
      neighborhoods: ["Macon","downtown","historic neighborhoods"],
      housingTypes: 'Multi-story, historic, multi-unit',
      challenges: ["Stairs","Street width","Parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking; measure street width.',
      cityKeywords: ["macon"],
    },
    {
      id: 'med-univ',
      name: 'Medical & university corridors',
      shortName: 'Medical / university',
      neighborhoods: ["medical campuses","university edges"],
      housingTypes: 'Multi-family, SFH, campus-adjacent',
      challenges: ["Building COIs","Campus calendars"],
      moverTips: 'Book around campus and clinical calendars; collect management packets.',
      cityKeywords: ["macon medical","mercer"],
    },
    {
      id: 'north-sub',
      name: 'North suburban edges',
      shortName: 'North suburbs',
      neighborhoods: ["north Macon suburbs"],
      housingTypes: 'SFH, townhomes',
      challenges: ["HOA packets","Arterial timing"],
      moverTips: 'Confirm driveway and HOA hours.',
      cityKeywords: ["north macon"],
    },
    {
      id: 'rural-south',
      name: 'Rural south & larger lots',
      shortName: 'Rural south',
      neighborhoods: ["southern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["bibb rural"],
    }
  ],
  specialized: [
    {
      id: 'macon-city',
      title: 'Macon multi-story & historic access',
      intro: 'Stairs and street width are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'med-univ',
      title: 'Medical/university corridor logistics',
      intro: 'Campus and clinical calendars rewrite demand.',
      bullets: ["Book early around term and clinical peaks.","Collect building packets on multi-family."],
    },
    {
      id: 'i75-i16',
      title: 'I-75 / I-16 hub freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Atlanta collar rates for Macon historic days."],
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
        intro: 'Bibb families compare Bibb County and related city school options — verify boundaries; regional-hub reputation does not replace district maps.',
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
            detail: 'Atrium Health Navicent and regional medical campuses anchor acute care; map peak freeflow on medical corridors.',
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
    intro: 'City access, medical peaks, and empty-mile edges often matter more than raw miles.',
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
    intro: 'University calendars, medical staffing moves, and school years reshape demand more than Atlanta HOA peaks alone.',
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
      { label: 'independent central GA hub (vs Atlanta collar / Houston AFB defaults) movers (parent contrast)', href: '/local-movers/georgia/houston' },
    ],
  },
});
