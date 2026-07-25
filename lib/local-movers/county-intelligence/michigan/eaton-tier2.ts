import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** eaton — MI Tier 2 Wave 1 */
export const eatonCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'eaton',
  hubTitle: 'Eaton County Moving Intelligence Hub',
  eyebrow: 'Eaton · Charlotte / Delta Twp edge · Lansing west · vs Ingham',
  h1: 'Moving in Eaton County: Delta Township Edge, Charlotte Seat & I-69 / I-96 West Collar',
  heroOpener: 'Eaton County is Lansing’s west growth collar — Delta Township multi-family and HOA product shared with capital freeflow, Charlotte seat stock, I-69 / I-96 corridors, and freeflow that is not Ingham’s continuous downtown elevators or East Lansing campus multi-unit density alone. Expect longer empty miles into the capital core, school-calendar SFH volume, and portal-to-portal time that map miles understate. This guide is for people moving in Eaton as west-Lansing collar product — not an Ingham rename.',
  heroCredibility: 'West-Lansing collar · I-69 / I-96 · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-69 · I-96 · M-43 · M-50 · M-99 · Saginaw Hwy links',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Ingham County',
    parentHref: '/local-movers/michigan/ingham',
    title: 'Compared with Ingham County',
    intro: 'Eaton is Delta Township / Charlotte west-collar growth — not Lansing downtown elevators and not East Lansing campus multi-unit density alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Ingham crews fight downtown and MSU peaks. Eaton pairs ride I-69/I-96 west, M-43, and Delta corridors — freer mid-day west of the core, still peak-heavy on commute windows into Lansing.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Ingham mixes capital elevators and campus multi-family. Eaton mixes Delta Township multi-family, Charlotte multi-story, and township SFH — more continuous west-collar product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'HOA packets and apartment COIs dominate Delta growth; Charlotte multi-story needs stair inventories uncommon on pure Okemos cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Eaton quotes often sit at west-collar rates for driveway SFH — empty miles into Ingham still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Eaton is west-Lansing I-69/I-96 collar — not Ingham renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Eaton County different',
    intro: 'I-69 freeflow, Delta multi-family, and west-collar empty miles — not an Ingham core clone.',
    bullets: [
      {
        title: 'I-69 / I-96 freeflow is billable',
        detail: 'Delta ↔ downtown pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Distinct from East Lansing campus density',
        detail: 'West-collar product is not MSU multi-family alone.',
      },
      {
        title: 'Delta multi-family needs building packets',
        detail: 'Elevators and COIs rewrite labor hours on growth stock.',
      },
      {
        title: 'Charlotte multi-story is first-class product',
        detail: 'Stairs and street parking need inventories different from pure HOA playbooks.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Eaton zones: Delta Township growth, Charlotte seat, I-69 corridors & rural west',
  zonesIntro: 'Two to four sharp products under one west-Lansing collar label.',
  zones: [
    {
      id: 'delta',
      name: 'Delta Township multi-family & HOA growth',
      shortName: 'Delta Twp',
      neighborhoods: ["Delta Township","growth villages"],
      housingTypes: 'Multi-family, planned SFH, townhomes',
      challenges: ["Building COIs","HOA packets","I-69 peaks"],
      moverTips: 'Collect management packets early; price portal-to-portal toward Lansing.',
      cityKeywords: ["delta township"],
    },
    {
      id: 'charlotte',
      name: 'Charlotte multi-story & seat',
      shortName: 'Charlotte',
      neighborhoods: ["Charlotte","seat neighborhoods"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Stairs","Street parking"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["charlotte mi"],
    },
    {
      id: 'i69',
      name: 'I-69 / I-96 corridor suburbs',
      shortName: 'I-69 corridors',
      neighborhoods: ["corridor neighborhoods"],
      housingTypes: 'SFH, townhomes',
      challenges: ["Commute peaks"],
      moverTips: 'Avoid peak I-69/I-96 windows when possible.',
      cityKeywords: ["eaton i-69"],
    },
    {
      id: 'rural-west',
      name: 'Rural west & larger lots',
      shortName: 'Rural west',
      neighborhoods: ["western townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["eaton west"],
    }
  ],
  specialized: [
    {
      id: 'west-collar',
      title: 'I-69 / I-96 west-collar freeflow',
      intro: 'Commute peaks rewrite short-looking pairs.',
      bullets: ["Price portal-to-portal honestly.","Do not quote East Lansing multi-family rates for rural west lots."],
    },
    {
      id: 'delta-mf',
      title: 'Delta Township multi-family logistics',
      intro: 'Building packets are first-class cost drivers.',
      bullets: ["Elevator windows early.","Month-end competition for crews is real."],
    },
    {
      id: 'vs-ingham',
      title: 'Distinct from Ingham capital/campus product',
      intro: 'West collar differs from downtown elevators and MSU density.',
      bullets: ["Do not recycle campus lease-wave-only playbooks.","Delta + Charlotte mix is the differentiator."],
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
        intro: 'Eaton families compare Grand Ledge, Charlotte, Eaton Rapids, and other districts — verify boundaries; do not assume Lansing or East Lansing maps apply.',
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
            detail: 'Sparrow Eaton and capital-region systems serve the west collar; map peak freeflow on I-69/I-96 corridors.',
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
    intro: 'Empty miles, multi-family access, and west-collar peaks often matter more than raw miles.',
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
    intro: 'School years and capital-session spillover reshape demand more than pure MSU term peaks alone.',
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
      { label: 'Ingham County movers (parent contrast)', href: '/local-movers/michigan/ingham' },
    ],
  },
});
