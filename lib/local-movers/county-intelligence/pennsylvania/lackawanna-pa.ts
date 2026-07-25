import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * lackawanna — PA Tier 2 Wave 1
 */
export const lackawannaCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'lackawanna',
  hubTitle: 'Lackawanna County Moving Intelligence Hub',
  eyebrow: 'Lackawanna · Scranton — NEPA hub independent',
  h1: 'Moving in Lackawanna County: Scranton, I-81 Medical Hub & Northeast PA Independent Access',
  heroOpener:
    'Lackawanna County is an independent Northeast PA hub — Scranton multi-story and older stock, Dunmore and Dickson City corridors, Clarks Summit suburban belts, and I-81 freeflow that does not answer to Philly, Pittsburgh, or Lehigh Valley scripts. It is not a SEPA rename and not an Allentown industrial multi-family pack with different labels: expect medical and university calendars, valley-city stairs, and longer empty miles to Abingtons and rural edges. This guide is for people moving in Lackawanna as a Scranton / NEPA independent market — not recycled Lehigh or SEPA packs.',
  heroCredibility:
    'NEPA independent hub · Scranton medical/university · I-81 freeflow · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · I-84 · I-380 · US-6 · PA-307 · PA-347',
  parentCompare: {
    parentLabel: 'independent Northeast PA (vs Lehigh Valley / SEPA defaults)',
    parentHref: '/local-movers/pennsylvania/lehigh',
    title: 'Compared with independent Northeast PA (vs Lehigh Valley / SEPA defaults)',
    intro:
      'Lackawanna is a NEPA independent Scranton hub — not Lehigh Valley Allentown product and not SEPA Philly-collar freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Lehigh crews fight I-78 Valley peaks. Lackawanna pairs ride I-81, I-84, and US-6 — freer mid-day NEPA freeflow, still peak-heavy on Scranton arterials and medical-campus windows. Portal-to-portal time is real; it is not an Allentown day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Lehigh mixes Allentown multi-unit and township growth. Lackawanna mixes Scranton multi-story, Clarks Summit SFH, and valley-city twins — independent NEPA density, not Valley industrial multi-family renamed.',
      },
      {
        title: 'Truck access & density',
        detail:
          'City hills and multi-story stock need stair inventories; Abingtons lots trade that for driveway staging; winter ice is first-class.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Lackawanna quotes often sit at secondary NEPA rates for driveway SFH — multi-story access and medical-calendar peaks still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Lackawanna is NEPA independent Scranton hub — not Lehigh Valley or SEPA product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Lackawanna County different',
    intro: 'I-81 freeflow, medical/university calendars, and valley-city stairs — not interchangeable LV or SEPA boilerplate.',
    bullets: [
      {
        title: 'Scranton multi-story is first-class product',
        detail:
          'City stairs and hills need inventories different from Clarks Summit cul-de-sacs.',
      },
      {
        title: 'Medical and university calendars drive demand spikes',
        detail:
          'Hospital and campus windows create lease clusters that do not map to pure family Saturdays.',
      },
      {
        title: 'I-81 freeflow is still billable',
        detail:
          'Valley pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'NY / NJ adjacency creates interstate legs',
        detail:
          'Out-of-state addresses require FMCSA authority even on short-looking hops.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Lackawanna zones: Scranton core, Dunmore corridor, Clarks Summit belt & valley edges',
  zonesIntro: 'Two to four sharp products — city multi-story, valley corridor, suburban belt, and edges price differently.',
  zones: [
    {
      id: 'scranton-core',
      name: 'Scranton city multi-story & older stock',
      shortName: 'Scranton',
      neighborhoods: ["Scranton","downtown","west/east side edges"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Hills","Street parking"],
      moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
      cityKeywords: ["scranton"],
    },
    {
      id: 'dunmore-corridor',
      name: 'Dunmore / Dickson City corridor',
      shortName: 'Dunmore corridor',
      neighborhoods: ["Dunmore","Dickson City","Throop edges"],
      housingTypes: 'Multi-unit, SFH, mixed stock',
      challenges: ["Arterial timing","Mixed access","I-81 peaks"],
      moverTips: 'Build I-81 buffers; confirm street width on older blocks.',
      cityKeywords: ["dunmore","dickson city","throop"],
    },
    {
      id: 'clarks-summit-belt',
      name: 'Clarks Summit / Abingtons belt',
      shortName: 'Abingtons',
      neighborhoods: ["Clarks Summit","Clarks Green","South Abington edges"],
      housingTypes: 'Suburban SFH, some multi-family',
      challenges: ["HOA packets","Empty miles to city","Winter grades"],
      moverTips: 'Collect HOA docs where applicable; photo grades in winter.',
      cityKeywords: ["clarks summit","clarks green","abingtons"],
    },
    {
      id: 'valley-edges',
      name: 'Valley edges & larger lots',
      shortName: 'Valley edges',
      neighborhoods: ["Old Forge edges","Moosic edges","northern townships"],
      housingTypes: 'SFH, rural approaches, mixed stock',
      challenges: ["Empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["old forge","moosic","rural lackawanna"],
    }
  ],
  specialized: [
    {
      id: 'scranton-stairs',
      title: 'Scranton multi-story & hills',
      intro: 'City stairs and grades are first-class cost drivers.',
      bullets: ["Inventory floor counts and hill approaches.","Temporary no-parking often beats long carries."],
    },
    {
      id: 'i81-nepa',
      title: 'I-81 NEPA freeflow',
      intro: 'Valley pairs still peak hard; independent of LV scripts.',
      bullets: ["Price portal-to-portal time honestly for Scranton corridor legs.","Clarify NY/NJ second addresses for interstate authority."],
    },
    {
      id: 'medical-university',
      title: 'Medical & university calendar module',
      intro: 'Hospital and campus windows create lease clusters.',
      bullets: ["Book early around medical-hire and term calendars.","Expect short-notice local demand spikes near campuses."],
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
        intro: 'Lackawanna families compare Scranton, Abington Heights, Dunmore, Valley View, and other districts — verify boundaries.',
        bullets: [
          {
            title: 'District-first shopping',
            detail:
              'Use PDE data and district maps; do not assume a borough name equals one feeder pattern.',
          },
          {
            title: 'Capacity & calendars',
            detail:
              'Growth pockets and university towns can tighten housing near school and term calendars.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Acute-care anchors',
            detail: 'Geisinger Community Medical Center, Regional Hospital of Scranton, and related campuses anchor acute care; map peak I-81 times.',
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
    intro: 'City stairs, medical calendars, and I-81 freeflow often matter more than raw miles.',
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
      { label: 'Studio / 1-BR', value: '$500–$1,200+' },
      {
        label: '3–4 BR home',
        value: '$1,800–$4,200+',
        note: 'Higher with access friction',
      },
      { label: '2-person crew', value: '$120–$185+/hr' },
    ],
  },
  seasonal: {
    title: 'Seasonal & calendar notes',
    intro: 'School years, medical hire calendars, and winter ice reshape demand more than Philly or Pittsburgh patterns.',
    items: [
      {
        title: 'Late spring – early fall',
        detail: 'Family closings and peak calendars fill Saturday crews first.',
      },
      {
        title: 'Winter access',
        detail: 'Hills, rural edges, and mountain approaches need ice-aware morning plans.',
      },
    ],
  },
  resources: {
    title: 'Useful resources',
    intro:
      'Official links first; directory listings are independent. Verify Pennsylvania PUC household-goods authority for in-state Pennsylvania moves and FMCSA for interstate legs.',
    items: [
      {
        label: 'independent Northeast PA (vs Lehigh Valley / SEPA defaults) movers (parent contrast)',
        href: '/local-movers/pennsylvania/lehigh',
      },
      
    ],
  },
});
