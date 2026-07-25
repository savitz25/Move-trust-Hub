import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * tompkins — NY Tier 2 Wave 2
 */
export const tompkinsCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'tompkins',
  hubTitle: 'Tompkins County Moving Intelligence Hub',
  eyebrow: 'Tompkins · Ithaca university · Finger Lakes independent',
  h1: 'Moving in Tompkins County: Ithaca University Hub, Cascadilla Density & Finger Lakes Access',
  heroOpener:
    'Tompkins County is an independent Finger Lakes university market — Ithaca multi-story hills and student density, Cornell and Ithaca College calendars, Lansing and Dryden suburban edges, and gorge/lake last-mile that rejects full trailers. It is not Broome’s Binghamton Southern Tier and not Onondaga’s Syracuse core: expect steeper city grades, continuous student multi-family product, and Finger Lakes freeflow that still peaks hard on term weekends. This guide is for people moving in Tompkins as a university independent market — not a recycled Broome or Central NY pack.',
  heroCredibility:
    'Ithaca university hub · Finger Lakes independent · Hill multi-story · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'NY-13 · NY-79 · NY-96 · NY-34 · NY-89 · I-81 (regional approaches)',
  parentCompare: {
    parentLabel: 'independent Finger Lakes university hub (vs Broome / Onondaga defaults)',
    parentHref: '/local-movers/new-york/broome',
    title: 'Compared with independent Finger Lakes university hub (vs Broome / Onondaga defaults)',
    intro:
      'Tompkins is an independent Ithaca university / Finger Lakes market — not Binghamton Southern Tier density and not Syracuse Central NY freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Broome crews fight I-81 / NY-17 Triple Cities peaks. Tompkins pairs ride NY-13, NY-79, NY-96, and hill arterials into Ithaca — freer mid-day on rural approaches, still peak-heavy on campus move weekends and gorge-side one-ways.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Broome mixes Binghamton multi-story and Vestal SFH. Tompkins mixes Ithaca hill walk-ups, student multi-family, and outer-town larger lots — more continuous university density, less Southern Tier triple-city corridor product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Ithaca grades, narrow streets, and multi-story stairs need shuttle conversations more often than Vestal driveways; rural edges add empty miles uncommon on inner campus jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Tompkins quotes often sit at secondary university-market rates for simple SFH — hill access, elevators, and term spikes push prices up vs quiet Finger Lakes driveway days.',
      },
      {
        title: 'Role difference',
        detail:
          'Tompkins is Ithaca university independent Finger Lakes product — not Broome Southern Tier renamed and not Onondaga Syracuse core.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Tompkins County different',
    intro: 'University calendars, hill multi-story stock, and Finger Lakes freeflow — not interchangeable Broome or Syracuse boilerplate.',
    bullets: [
      {
        title: 'Cornell / Ithaca College calendars drive demand spikes',
        detail:
          'Term start/end weekends fill local crews first — not only family Saturdays.',
      },
      {
        title: 'Hill multi-story is first-class product',
        detail:
          'Stairs, grades, and tight village streets need inventories different from pure suburban playbooks.',
      },
      {
        title: 'Gorge and lake edges rewrite truck size',
        detail:
          'Many approaches reject full trailers; photo last-mile before the survey is final.',
      },
      {
        title: 'Regional freeflow is still billable',
        detail:
          'Ithaca ↔ Lansing or Dryden pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Tompkins zones: Ithaca core, campus density, outer suburbs & rural Finger Lakes edges',
  zonesIntro: 'Two to four sharp products — city hills, campus multi-family, outer SFH, and rural lake edges price differently under one university-county label.',
  zones: [
    {
      id: 'ithaca-core',
      name: 'Ithaca city core & hills',
      shortName: 'Ithaca core',
      neighborhoods: ["Ithaca","downtown","South Hill edges","Fall Creek"],
      housingTypes: 'Multi-story, walk-ups, older SFH on grades',
      challenges: ["Stairs","Hills","Street parking","One-ways"],
      moverTips: 'Inventory floor counts and hill approaches; plan temporary no-parking early.',
      cityKeywords: ["ithaca","fall creek","south hill"],
    },
    {
      id: 'campus-density',
      name: 'Campus / student multi-family',
      shortName: 'Campus density',
      neighborhoods: ["Cornell edges","Collegetown","Ithaca College approaches"],
      housingTypes: 'Student multi-family, apartments, elevators',
      challenges: ["Lease-end clusters","Building COIs","Elevator windows"],
      moverTips: 'Book early around term calendars; collect management packets before surveys finalize.',
      cityKeywords: ["collegetown","cornell","ithaca college"],
    },
    {
      id: 'outer-suburbs',
      name: 'Lansing / Dryden outer suburbs',
      shortName: 'Outer suburbs',
      neighborhoods: ["Lansing","Dryden","Cayuga Heights edges"],
      housingTypes: 'SFH, townhomes, some multi-family',
      challenges: ["Cul-de-sac staging","Commute peaks toward Ithaca"],
      moverTips: 'Confirm driveway length and HOA hours on planned streets.',
      cityKeywords: ["lansing","dryden","cayuga heights"],
    },
    {
      id: 'rural-edges',
      name: 'Rural Finger Lakes edges',
      shortName: 'Rural edges',
      neighborhoods: ["Trumansburg edges","Newfield","Groton edges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["trumansburg","newfield","groton"],
    }
  ],
  specialized: [
    {
      id: 'university-turnover',
      title: 'University-adjacent turnover',
      intro: 'Cornell and Ithaca College calendars create lease clusters.',
      bullets: ["Book early around term start/end weekends.","Expect short-notice local demand spikes in campus multi-family."],
    },
    {
      id: 'hill-access',
      title: 'Ithaca hill multi-story & grades',
      intro: 'City stairs and grades are first-class cost drivers.',
      bullets: ["Inventory floor counts and hill approaches.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'finger-lakes-freeflow',
      title: 'Finger Lakes freeflow & empty miles',
      intro: 'Outer-town pairs freer mid-day still peak hard toward Ithaca.',
      bullets: ["Price portal-to-portal time honestly.","Photo rural last-mile before locking truck size."],
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
        intro: 'Tompkins families compare Ithaca City, Lansing, Dryden, Trumansburg, and other districts — verify boundaries; university calendars affect housing near campus.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NYSED data and district maps; do not assume a village name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, college towns, and seasonal markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Cayuga Medical Center and regional clinics anchor acute care; map peak freeflow across Ithaca hills, not only off-hour freeflow.',
          },
          {
            title: 'Peak drive times',
            detail:
              'Map ER access at commute peaks and weather days, not only off-hour freeflow.',
          },
        ],
      },
    ],
  },
  costDrivers: {
    title: 'Pricing & cost drivers',
    intro: 'University peaks, hill stairs, and empty-mile edges often matter more than raw miles.',
    drivers: [
      {
        title: 'Corridor freeflow',
        detail: 'Peak windows inflate hourly bills on short-looking pairs.',
      },
      {
        title: 'Access soft costs',
        detail: 'Building packets, stairs, or last-mile shuttles add labor hours.',
      },
      {
        title: 'Long empty-mile edges',
        detail: 'Far pockets price differently from seat cores.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,100+' },
      {
        label: '3–4 BR home',
        value: '$1,600–$4,000+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$115–$180+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'Term calendars, graduation weekends, and winter ice on grades reshape demand more than Capital Region or NYC patterns.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, lake edges, and rural approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify NYSDOT household-goods frameworks for in-state moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent Finger Lakes university hub (vs Broome / Onondaga defaults) movers (parent contrast)',
        href: '/local-movers/new-york/broome',
      },
    ],
  },
});
