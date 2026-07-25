import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNcTier2Pack,
  NC_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/north-carolina/nc-tier2-shared';

/**
 * johnston — NC Tier 2 Wave 1
 */
export const johnstonCountyNcTier2Intelligence: CountyIntelligencePack = finalizeNcTier2Pack({
  countySlug: 'johnston',
  hubTitle: 'Johnston County Moving Intelligence Hub',
  eyebrow: 'Johnston · Raleigh south · Clayton / Smithfield / Benson',
  h1: 'Moving in Johnston County: Clayton, Smithfield & I-40/I-95 South Growth',
  heroOpener:
    'Johnston County is Raleigh’s southern I-40 / I-95 growth collar — Clayton multi-family and HOA spillover, Smithfield seat stock, Benson and Selma logistics edges, and freeflow that still peaks hard toward Wake. It is not a Garner rename with different labels: expect longer empty miles from capital yards, warehouse-adjacent residential product, and I-95 interstate risk under one county. This guide is for people moving in Johnston as Raleigh south growth collar — not a Wake rename.',
  heroCredibility:
    'Raleigh south collar · I-40 / I-95 growth · Clayton / Smithfield · NCUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-40 · I-95 · US-70 · US-301 · NC-42 · NC-50',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'Wake County',
    parentHref: '/local-movers/north-carolina/wake',
    title: 'Compared with Wake County',
    intro:
      'Johnston is Raleigh south I-40/I-95 growth collar — not Wake capital elevators and not pure rural Coastal Plain freeflow.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Wake crews fight I-40/I-440/I-540 peaks into Raleigh core. Johnston pairs ride I-40, NC-42, and US-70 — freer mid-day south of the Outer Loop, still peak-heavy toward Wake portals and Clayton commute windows.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Wake mixes downtown elevators and Cary HOAs. Johnston mixes Clayton multi-family, Smithfield multi-story, and logistics-edge SFH — more south-collar growth and warehouse-adjacent stock, less continuous capital vertical product.',
      },
      {
        title: 'Truck access & density',
        detail:
          'HOA packets dominate Clayton growth; seat streets need curb plans; I-95 edges add interstate authority questions on SC/VA legs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Johnston quotes often sit near south-Triangle suburb rates for driveway SFH — empty miles and multi-family access still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Johnston is Raleigh south growth collar — not Wake core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Johnston County different',
    intro: 'South-collar growth, I-40/I-95 freeflow, and logistics-edge residential — not interchangeable Raleigh boilerplate.',
    bullets: [
      {
        title: 'I-40 peaks rewrite short-looking locals',
        detail:
          'Johnston ↔ Wake pairs freer mid-day still burn clock. Ask portal-to-portal.',
      },
      {
        title: 'Clayton multi-family and HOA is first-class product',
        detail:
          'Gate lists and elevators need inventories different from Benson driveway lots.',
      },
      {
        title: 'I-95 logistics edges create long empty miles',
        detail:
          'Warehouse-adjacent residential fails when crews assume Cary day rates.',
      },
      {
        title: 'Smithfield seat multi-story differs from pure growth HOAs',
        detail:
          'Stairs and curb plans are real cost drivers.',
      },
      NC_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Johnston zones: Clayton growth, Smithfield seat, I-95 logistics edges & southern lots',
  zonesIntro: 'Two to four sharp products — growth multi-family, seat stock, logistics edges, and southern lots.',
  zones: [
    {
      id: 'clayton-growth',
      name: 'Clayton multi-family & HOA growth',
      shortName: 'Clayton',
      neighborhoods: ["Clayton","growth villages","NC-42 corridor"],
      housingTypes: 'HOA SFH, multi-family, townhomes',
      challenges: ["HOA packets","I-40 peaks","Lease clusters"],
      moverTips: 'Collect HOA COIs; build I-40 buffer for Wake pairs.',
      cityKeywords: ["clayton"],
    },
    {
      id: 'smithfield',
      name: 'Smithfield seat multi-story & older stock',
      shortName: 'Smithfield',
      neighborhoods: ["Smithfield","downtown edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","US-70 freeflow"],
      moverTips: 'Inventory stairs; plan temporary no-parking.',
      cityKeywords: ["smithfield"],
    },
    {
      id: 'i95-edge',
      name: 'Selma / Benson I-95 logistics edges',
      shortName: 'I-95 edge',
      neighborhoods: ["Selma","Benson","I-95 multi-family"],
      housingTypes: 'SFH, multi-family, mixed stock',
      challenges: ["Arterial timing","Empty miles","Interstate adjacency"],
      moverTips: 'Prefer early starts; clarify out-of-state second addresses.',
      cityKeywords: ["selma","benson"],
    },
    {
      id: 'south-lots',
      name: 'Southern & eastern larger lots',
      shortName: 'South lots',
      neighborhoods: ["Four Oaks edges","eastern tracts"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo approaches; soft ground after rain can block heavy trucks.',
      cityKeywords: ["four oaks","east johnston"],
    }
  ],
  specialized: [
    {
      id: 'i40-south',
      title: 'I-40 / I-95 south-collar freeflow',
      intro: 'South-Triangle pairs still peak hard toward Wake.',
      bullets: ["Price portal-to-portal honestly.","Build buffers for Clayton commute windows."],
    },
    {
      id: 'clayton-growth',
      title: 'Clayton growth & multi-family module',
      intro: 'South spillover density is the collar product.',
      bullets: ["Collect HOA and elevator rules early.","Do not quote downtown Raleigh elevator rates for driveway SFH."],
    },
    {
      id: 'logistics-edge',
      title: 'I-95 logistics-edge residential',
      intro: 'Warehouse corridors rewrite empty-mile assumptions.',
      bullets: ["Survey last-mile on industrial-adjacent streets.","Clarify FMCSA when either address is out of NC."],
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
        intro: 'Johnston families compare Johnston County Schools feeders across Clayton, Smithfield, Benson, and Selma — verify address boundaries; do not assume Wake County maps apply.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use NCDPI data and district maps; do not assume a city name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets, university towns, and military markets can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'UNC Health Johnston and Triangle specialty spillover serve the county; map peak I-40 times for ER access.',
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
    intro: 'I-40 freeflow, HOA soft costs, and logistics-edge empty miles often matter more than raw miles.',
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
        detail: 'Far pockets price differently from seat suburbs.',
      },
    ],
    ranges: [
      { label: 'Studio / 1-BR', value: '$450–$1,200+' },
      { label: '3–4 BR home', value: '$1,600–$4,200+', note: 'Higher with access friction' },
      { label: '2-person crew', value: '$115–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, lease ends, and peak I-95 travel seasons reshape demand by pocket.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Institutional & weather windows',
        detail:
          'School, university, PCS, tourism, or storm seasons can outrank pure weekend preference.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify NCUC household-goods certification for in-state North Carolina moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'Wake County movers (parent contrast)',
        href: '/local-movers/north-carolina/wake',
      },

    ],
  },
});
