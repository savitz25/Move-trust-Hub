import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** monroe — MI Tier 2 Wave 1 */
export const monroeCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'monroe',
  hubTitle: 'Monroe County Moving Intelligence Hub',
  eyebrow: 'Monroe · Detroit south / OH border · vs Wayne',
  h1: 'Moving in Monroe County: Monroe Seat, I-75 South Collar & Ohio Border Access',
  heroOpener: 'Monroe County is metro Detroit’s south I-75 collar — Monroe multi-story and seat stock, township SFH growth, Ohio border adjacency, and freeflow that is not Wayne’s downtown elevators or Downriver multi-family alone. Expect longer empty miles into the city core, industrial freeflow timing, and interstate legs that flip to FMCSA at the state line. This guide is for people moving in Monroe as Detroit-south / OH-border product — not a Wayne rename. (MI export avoids Ohio Monroe name clash.)',
  heroCredibility: 'I-75 south collar · OH border · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-75 · US-23 · US-24 · M-50 · Dixie Hwy corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Wayne County',
    parentHref: '/local-movers/michigan/wayne',
    title: 'Compared with Wayne County',
    intro: 'Monroe is I-75 south-collar and OH-border product — not Detroit core multi-unit density and not continuous Downriver multi-family alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Wayne crews fight I-75/I-94 city peaks. Monroe pairs ride I-75 further south, US-23/US-24, and Monroe arterials — freer mid-day at the south edge, still peak-heavy on commute windows northbound.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Wayne mixes downtown elevators and Downriver stock. Monroe mixes Monroe multi-story, township SFH, and industrial-edge homes — more continuous south-collar product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'City multi-story needs stair inventories; OH destinations flip jobs to FMCSA more often than pure in-Wayne pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Monroe quotes often sit at south-collar rates for driveway SFH — empty miles into Wayne still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Monroe is Detroit-south I-75 / OH-border collar — not Wayne renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Monroe County different',
    intro: 'I-75 south freeflow, Monroe multi-story, and OH interstate legs — not a Wayne clone.',
    bullets: [
      {
        title: 'I-75 freeflow is billable',
        detail: 'Monroe ↔ Wayne pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Ohio adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'Monroe multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure township SFH playbooks.',
      },
      {
        title: 'Industrial freeflow can rewrite timing',
        detail: 'Shift windows choke some residential pairs near industrial edges.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Monroe zones: Monroe city core, township growth, I-75 corridors & OH-border edges',
  zonesIntro: 'Two to four sharp products under one south-collar label.',
  zones: [
    {
      id: 'monroe-city',
      name: 'Monroe multi-story & seat',
      shortName: 'Monroe city',
      neighborhoods: ["Monroe","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["monroe mi"],
    },
    {
      id: 'townships',
      name: 'Township SFH growth',
      shortName: 'Township growth',
      neighborhoods: ["growth townships"],
      housingTypes: 'SFH, townhomes',
      challenges: ["HOA packets","Empty miles"],
      moverTips: 'Collect COI early; photo last-mile on new streets.',
      cityKeywords: ["monroe townships"],
    },
    {
      id: 'i75',
      name: 'I-75 corridor residential',
      shortName: 'I-75 corridors',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, multi-family pockets',
      challenges: ["I-75 peaks","Shift timing"],
      moverTips: 'Price portal-to-portal; avoid peak industrial windows when possible.',
      cityKeywords: ["monroe i-75"],
    },
    {
      id: 'oh-border',
      name: 'Ohio-border edges',
      shortName: 'OH border',
      neighborhoods: ["southern edges"],
      housingTypes: 'SFH, rural approaches',
      challenges: ["Empty miles","Interstate legs"],
      moverTips: 'Clarify OH destinations for FMCSA authority early.',
      cityKeywords: ["monroe oh border"],
    }
  ],
  specialized: [
    {
      id: 'i75-south',
      title: 'I-75 south-collar freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Wayne elevator rates for township driveways."],
    },
    {
      id: 'oh-border',
      title: 'Ohio border interstate legs',
      intro: 'Short-looking hops still need FMCSA.',
      bullets: ["Clarify destination state before deposit.","Verify USDOT/MC on interstate quotes."],
    },
    {
      id: 'monroe-city',
      title: 'Monroe multi-story access',
      intro: 'City stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts.","Temporary no-parking often beats long carries."],
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
        intro: 'Monroe families compare Monroe Public and township districts — verify boundaries; do not assume Wayne maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use Michigan DOE data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university, tourism, and manufacturing markets can tighten housing near school calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'ProMedica Monroe and regional systems serve the south collar; map peak freeflow on I-75 corridors.',
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
    intro: 'Empty miles, city access, and I-75 peaks often matter more than raw miles.',
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
    intro: 'School years and industrial calendars reshape demand more than pure Detroit office peaks alone.',
    items: [
      { title: 'Late spring – early fall', detail: 'Family closings and peak calendars fill Saturday crews first.' },
      { title: 'Winter access', detail: 'Ice and lake-effect windows rewrite morning plans on many collars.' },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: 'Wayne County movers (parent contrast)', href: '/local-movers/michigan/wayne' },
    ],
  },
});
