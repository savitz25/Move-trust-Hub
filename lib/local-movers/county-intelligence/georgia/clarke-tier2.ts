import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** clarke — GA Tier 2 Wave 1 */
export const clarkeCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'clarke',
  hubTitle: 'Clarke County Moving Intelligence Hub',
  eyebrow: 'Clarke · Athens · UGA university independent',
  h1: 'Moving in Clarke County: Athens UGA Hub, Downtown Density & Student Housing Mix',
  heroOpener: 'Clarke County is northeast Georgia’s independent university market — Athens multi-story and downtown density, UGA move-in/move-out calendars, student multi-family product, and freeflow that does not answer to Atlanta collar defaults. Expect term-weekend spikes, stairs and street permits downtown, and outer-neighborhood SFH that still peaks hard toward campus. This guide is for people moving in Clarke as Athens UGA product — not generic North Georgia and not Gwinnett renamed.',
  heroCredibility: 'UGA university hub · Downtown + student housing · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-78 · US-29 · GA-10 Loop · GA-15 · Atlanta Highway corridors',
  parentCompare: {
    parentLabel: 'independent NE GA university hub (vs Gwinnett / Atlanta collar defaults)',
    parentHref: '/local-movers/georgia/gwinnett',
    title: 'Compared with independent NE GA university hub (vs Gwinnett / Atlanta collar defaults)',
    intro: 'Clarke is Athens UGA independent university product — not Gwinnett HOA density and not Atlanta tower freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Gwinnett crews fight I-85 peaks. Clarke pairs ride US-78, US-29, and Athens loop arterials — freer mid-day off Atlanta freeflow, still peak-hard on UGA move weekends and game-day constraints.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Gwinnett mixes diverse multi-family and HOAs. Clarke mixes downtown multi-story, student apartments, and eastside/westside SFH — more continuous university density, less continuous suburban master-plan product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Downtown streets and multi-story stock need stair inventories and curb plans; student buildings need management packets uncommon on pure suburban days.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Clarke quotes often sit at secondary university-market rates for simple SFH — downtown access and term spikes push multi-family prices up.',
      },
      {
        title: 'Role difference',
        detail: 'Clarke is Athens UGA independent university market — not Gwinnett or generic North Georgia renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Clarke County different',
    intro: 'UGA calendars, downtown multi-story, and student housing clusters — not Atlanta collar boilerplate.',
    bullets: [
      {
        title: 'UGA move cycles dominate demand spikes',
        detail: 'Term start/end weekends fill local crews first — book early.',
      },
      {
        title: 'Downtown multi-story is first-class product',
        detail: 'Stairs, curb rules, and street width rewrite truck size.',
      },
      {
        title: 'Student multi-family needs building packets',
        detail: 'Elevators and long carries need inventories different from pure SFH playbooks.',
      },
      {
        title: 'Game-day and event windows tighten freeflow',
        detail: 'Price portal-to-portal around known event calendars.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Clarke zones: Downtown Athens, campus multi-family, eastside/westside SFH & outer edges',
  zonesIntro: 'Two to four sharp products under one university-county label.',
  zones: [
    {
      id: 'downtown',
      name: 'Downtown Athens multi-story',
      shortName: 'Downtown',
      neighborhoods: ["downtown","historic blocks"],
      housingTypes: 'Multi-story, walk-ups, mixed commercial-residential',
      challenges: ["Stairs","Street parking","Curb rules"],
      moverTips: 'Plan temporary no-parking; inventory floor counts; measure street width.',
      cityKeywords: ["athens downtown"],
    },
    {
      id: 'campus',
      name: 'Campus / student multi-family',
      shortName: 'Campus density',
      neighborhoods: ["UGA edges","student apartments"],
      housingTypes: 'Student multi-family, elevators, apartments',
      challenges: ["Lease-end clusters","Building COIs"],
      moverTips: 'Book early around term calendars; collect management packets.',
      cityKeywords: ["uga","student housing"],
    },
    {
      id: 'sfh-sides',
      name: 'Eastside / westside SFH',
      shortName: 'SFH sides',
      neighborhoods: ["eastside","westside neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Driveway staging","School peaks"],
      moverTips: 'Confirm driveway access; price school windows.',
      cityKeywords: ["athens eastside","athens westside"],
    },
    {
      id: 'outer',
      name: 'Outer edges & larger lots',
      shortName: 'Outer edges',
      neighborhoods: ["outer neighborhoods","larger lots"],
      housingTypes: 'SFH, longer approaches',
      challenges: ["Empty miles"],
      moverTips: 'Photo last-mile; price portal-to-portal toward downtown.',
      cityKeywords: ["clarke outer"],
    }
  ],
  specialized: [
    {
      id: 'uga-turnover',
      title: 'UGA term-start / term-end turnover',
      intro: 'University calendars create demand spikes.',
      bullets: ["Book early around move-in/move-out weekends.","Expect short-notice multi-family demand."],
    },
    {
      id: 'downtown-access',
      title: 'Downtown multi-story & curb logistics',
      intro: 'Stairs and street rules are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'student-mf',
      title: 'Student multi-family building packets',
      intro: 'Elevators and management rules dominate.',
      bullets: ["Collect COI and elevator windows early.","Do not quote pure suburban SFH rates for campus apartments."],
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
        intro: 'Clarke families compare Clarke County and related Athens-area school options — verify boundaries; university housing patterns do not replace district maps for family SFH.',
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
            detail: 'Piedmont Athens Regional and regional clinics anchor acute care; map peak freeflow around campus and downtown constraints.',
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
    intro: 'Term spikes, downtown access, and multi-family packets often matter more than raw miles.',
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
    intro: 'UGA calendars, game weekends, and school years reshape demand more than Atlanta HOA peaks alone.',
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
      { label: 'independent NE GA university hub (vs Gwinnett / Atlanta collar defaults) movers (parent contrast)', href: '/local-movers/georgia/gwinnett' },
    ],
  },
});
