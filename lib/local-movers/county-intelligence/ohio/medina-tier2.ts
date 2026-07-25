import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeOhTier2Pack,
  OH_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/ohio/oh-tier2-shared';

/** medina — OH Tier 2 Wave 1 */
export const medinaCountyOhTier2Intelligence: CountyIntelligencePack = finalizeOhTier2Pack({
  countySlug: 'medina',
  hubTitle: 'Medina County Moving Intelligence Hub',
  eyebrow: 'Medina · Medina / Brunswick · Cleveland south · vs Cuyahoga',
  h1: 'Moving in Medina County: Brunswick, Medina Seat & I-71 / I-76 South Collar',
  heroOpener: 'Medina County is Cleveland’s south inland growth collar — Brunswick HOA corridors, Medina city seat stock, I-71 / I-76 freeflow, and product that is not lakeshore Lake or Lorain and not Cuyahoga Heights elevators. Expect longer empty miles into the city core, master-plan COIs, and school-calendar SFH volume. This guide is for people moving in Medina as Cleveland-south collar product — not a Cleveland rename.',
  heroCredibility: 'South collar · I-71 / I-76 · PUCO household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-71 · I-76 · I-271 links · SR-18 · SR-3 · SR-94 approaches',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Cuyahoga County',
    parentHref: '/local-movers/ohio/cuyahoga',
    title: 'Compared with Cuyahoga County',
    intro: 'Medina is Brunswick / Medina south-inland collar growth — not Cleveland downtown multi-unit density and not lakeshore Lake or Lorain product alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Cuyahoga crews fight downtown freeflow. Medina pairs ride I-71, I-76, and Brunswick corridors — freer mid-day south of the core, still peak-heavy on commute windows into Cleveland and Akron edges.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Lake and Lorain mix shore multi-story. Medina skews continuous planned SFH, townhomes, and Medina city stock — more continuous south-inland HOA product, less continuous lakeshore industrial-edge mix.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets dominate growth villages; rural south edges add empty miles uncommon on pure Avon cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Medina quotes often sit at south-collar rates for driveway SFH — empty miles into Cleveland still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Medina is Cleveland-south inland collar — not Cuyahoga core renamed and not Lake or Lorain product.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Medina County different',
    intro: 'I-71 freeflow, Brunswick HOAs, and south-collar empty miles — not a lakeshore clone.',
    bullets: [
      {
        title: 'I-71 / I-76 freeflow is billable',
        detail: 'Brunswick ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from Lake and Lorain shores',
        detail: 'Inland south growth is not east or west lakeshore product.',
      },
      {
        title: 'HOA growth dominates family volume',
        detail: 'COI and gate lists on new villages are standard.',
      },
      {
        title: 'Akron-edge pairs also appear',
        detail: 'Some jobs freeflow toward Summit — clarify portal assumptions.',
      },
      OH_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Medina zones: Brunswick growth, Medina city seat, I-71 corridors & rural south',
  zonesIntro: 'Two to four sharp products under one south-collar label.',
  zones: [
    {
      id: 'brunswick',
      name: 'Brunswick planned growth',
      shortName: 'Brunswick',
      neighborhoods: ["Brunswick","growth villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","I-71 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Cleveland.',
      cityKeywords: ["brunswick oh"],
    },
    {
      id: 'medina-city',
      name: 'Medina city seat',
      shortName: 'Medina city',
      neighborhoods: ["Medina","seat neighborhoods"],
      housingTypes: 'SFH, multi-story older stock',
      challenges: ["Street width","Mixed access"],
      moverTips: 'Inventory older multi-story; confirm staging near seat arterials.',
      cityKeywords: ["medina"],
    },
    {
      id: 'i71-corridors',
      name: 'I-71 corridor suburbs',
      shortName: 'I-71 corridors',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Commute peaks","HOA packets"],
      moverTips: 'Avoid peak I-71 windows when possible.',
      cityKeywords: ["medina i-71"],
    },
    {
      id: 'rural-south',
      name: 'Rural south & larger lots',
      shortName: 'Rural south',
      neighborhoods: ["southern towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["medina south"],
    }
  ],
  specialized: [
    {
      id: 'i71-south',
      title: 'I-71 south-collar freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Cuyahoga elevator rates for Brunswick driveways."],
    },
    {
      id: 'hoa-growth',
      title: 'South-collar HOA growth logistics',
      intro: 'Master-plan rules are first-class cost drivers.',
      bullets: ["Gate lists early.","Mud weeks on new streets need flexibility."],
    },
    {
      id: 'vs-shores',
      title: 'Distinct from Lake and Lorain',
      intro: 'Inland south differs from lakeshore collars.',
      bullets: ["Do not recycle shore multi-story playbooks.","I-71 south HOA growth is the differentiator."],
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
        intro: 'Medina families compare Medina City, Brunswick, Highland, and other districts — verify boundaries; do not assume Cleveland Metropolitan maps apply.',
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
            detail: 'Cleveland Clinic Medina and regional systems serve the south collar; map peak freeflow on I-71 corridors.',
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
      { label: 'Cuyahoga County movers (parent contrast)', href: '/local-movers/ohio/cuyahoga' },
    ],
  },
});
