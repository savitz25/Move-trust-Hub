import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** warren — OH Tier 2 Wave 1 */
export const warrenCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'warren',
  hubTitle: 'Warren County Moving Intelligence Hub',
  eyebrow: 'Warren · Mason / Lebanon / Springboro · Cincinnati north · vs Hamilton',
  h1: 'Moving in Warren County: Mason, Lebanon & I-71 North Cincinnati Growth',
  heroOpener: 'Warren County is Cincinnati’s I-71 north growth collar — Mason HOA villages, Lebanon seat stock, Springboro corridors, and freeflow that is not Hamilton’s Over-the-Rhine hills and not Butler’s I-75 west collar. Expect master-plan COIs, longer empty miles into the city core, and school-calendar SFH volume. This guide is for people moving in Warren as Cincinnati-north growth product — not a Cincinnati rename and not a Butler clone.',
  heroCredibility: 'I-71 north growth · Mason / Lebanon · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-71 · I-75 links · SR-48 · US-22/3 · SR-123 · Mason-Montgomery Rd',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Hamilton County',
    parentHref: '/local-movers/ohio/hamilton',
    title: 'Compared with Hamilton County',
    intro: 'Warren is Mason / Lebanon I-71 north-collar growth — not Cincinnati urban hills and not Butler I-75 west collar alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Hamilton crews fight downtown hills and river-city curb limits. Warren pairs ride I-71, SR-48, and Mason corridors — freer mid-day north of I-275, still peak-heavy on commute windows into the core.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Hamilton mixes OTR multi-unit and hillside SFH. Warren skews continuous planned SFH, townhomes, and Lebanon seat stock — more master-plan product, less continuous river-city stair density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets dominate growth villages; KY border jobs still flip to FMCSA more often than pure in-county pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Warren quotes often sit at premium north-collar rates for driveway SFH — empty miles into Cincinnati still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Warren is Cincinnati-north I-71 growth — not Hamilton core renamed and not Butler I-75 NW product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Warren County different',
    intro: 'I-71 freeflow, Mason HOAs, and north-collar empty miles — not Cincinnati hill boilerplate.',
    bullets: [
      {
        title: 'I-71 north freeflow is billable',
        detail: 'Mason ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Butler I-75 collar',
        detail: 'Northeast growth is not West Chester / Fairfield west-northwest product.',
      },
      {
        title: 'Distinct from Clermont east collar',
        detail: 'I-71 north is not SR-32 Eastgate freeflow.',
      },
      {
        title: 'KY adjacency can create interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Warren zones: Mason growth, Lebanon seat, Springboro corridors & rural east',
  zonesIntro: 'Two to four sharp products under one I-71 north-collar label.',
  zones: [
    {
      id: 'mason',
      name: 'Mason planned growth',
      shortName: 'Mason',
      neighborhoods: ["Mason","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","Cul-de-sac staging"],
      moverTips: 'Collect COI early; weekday windows often beat Saturdays.',
      cityKeywords: ["mason oh"],
    },
    {
      id: 'lebanon',
      name: 'Lebanon seat & core',
      shortName: 'Lebanon',
      neighborhoods: ["Lebanon","seat neighborhoods"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Street width","Mixed access"],
      moverTips: 'Inventory older multi-story; confirm staging near seat arterials.',
      cityKeywords: ["lebanon oh"],
    },
    {
      id: 'springboro',
      name: 'Springboro corridors',
      shortName: 'Springboro',
      neighborhoods: ["Springboro","corridor edges"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Arterial timing","HOA packets"],
      moverTips: 'Price portal-to-portal toward Cincinnati and Dayton edges.',
      cityKeywords: ["springboro"],
    },
    {
      id: 'rural-east',
      name: 'Rural east & larger lots',
      shortName: 'Rural east',
      neighborhoods: ["eastern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["warren oh east"],
    }
  ],
  specialized: [
    {
      id: 'i71-north',
      title: 'I-71 north-collar freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Hamilton hill rates for Mason driveways."],
    },
    {
      id: 'hoa-growth',
      title: 'Mason HOA growth logistics',
      intro: 'Master-plan rules are first-class cost drivers.',
      bullets: ["Gate lists and truck limits early.","Mud weeks on new streets need flexibility."],
    },
    {
      id: 'vs-collars',
      title: 'Distinct from Butler and Clermont',
      intro: 'Different Cincinnati collar spines.',
      bullets: ["Do not recycle I-75 west or SR-32 east playbooks.","I-71 north HOA growth is the differentiator."],
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
        intro: 'Warren families compare Mason, Lebanon, Springboro, Kings, and other districts — verify boundaries; do not assume Cincinnati Public maps apply.',
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
            detail: 'Regional hospitals and Cincinnati medical campuses serve the north collar; map peak freeflow on I-71 corridors.',
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
    intro: 'Empty miles, HOA soft costs, and I-71 peaks often matter more than raw miles.',
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
    intro: 'School years and summer family closings reshape demand more than downtown event calendars alone.',
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
      { label: 'Hamilton County movers (parent contrast)', href: '/local-movers/ohio/hamilton' },
    ],
  },
});
