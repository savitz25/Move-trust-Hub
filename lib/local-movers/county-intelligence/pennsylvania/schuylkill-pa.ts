import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizePaTier2Pack,
  PA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/pennsylvania/pa-tier2-shared';

/**
 * schuylkill — PA Tier 2 Wave 1
 */
export const schuylkillCountyTier2Intelligence: CountyIntelligencePack = finalizePaTier2Pack({
  countySlug: 'schuylkill',
  hubTitle: 'Schuylkill County Moving Intelligence Hub',
  eyebrow: 'Schuylkill · Pottsville — coal-region mid-state',
  h1: 'Moving in Schuylkill County: Pottsville, Coal-Region Towns & I-81 Interior Access',
  heroOpener:
    'Schuylkill County is coal-region mid-state independent product — Pottsville multi-story and seat stock, Tamaqua and Shenandoah valley towns, Schuylkill Haven corridors, and I-81 / PA-61 freeflow distinct from Reading multi-unit and Scranton medical-hub calendars. It is not Berks with freer freeways and not NEPA valley-city density renamed: expect older multi-story inventory, longer empty miles between towns, and interior freeflow that stages differently from US-222 or Scranton I-81 peaks alone. This guide is for people moving in Schuylkill as Pottsville / coal-region product — not recycled Berks or Luzerne packs.',
  heroCredibility:
    'Coal-region mid-state · Pottsville seat · I-81 interior · PA PUC household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-81 · PA-61 · US-209 · PA-183 · PA-443 · PA-54',
  parentCompare: {
    parentLabel: 'Berks County',
    parentHref: '/local-movers/pennsylvania/berks',
    title: 'Compared with Berks County',
    intro:
      'Schuylkill is coal-region mid-state interior product — not Reading US-222 density and not Scranton/Wilkes-Barre NEPA pair freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Berks crews fight Reading arterials and US-222 peaks. Schuylkill pairs ride I-81, PA-61, and US-209 — freer mid-day interior freeflow, still peak-heavy on Pottsville cores and long town-to-town pairs. Portal-to-portal time is real; it is not a Reading day.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Berks mixes Reading multi-story and western HOA. Schuylkill mixes Pottsville multi-unit, coal-region town twins, and rural ridges — more discontinuous town cores, less continuous suburban HOA belts.',
      },
      {
        title: 'Truck access & density',
        detail:
          'Town hills and multi-story stock need stair inventories; ridge lots trade that for driveway length and winter grades uncommon on pure Reading suburban jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Schuylkill quotes often sit at secondary mid-state rates for driveway SFH — multi-story access and long empty-mile town pairs still push prices up.',
      },
      {
        title: 'Role difference',
        detail:
          'Schuylkill is coal-region mid-state interior — not Reading or Scranton product renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Schuylkill County different',
    intro: 'Coal-region multi-story, I-81 interior freeflow, and town-to-town empty miles — not interchangeable Reading or NEPA boilerplate.',
    bullets: [
      {
        title: 'Pottsville multi-story is first-class product',
        detail:
          'Seat stairs and hills need inventories different from rural ridge lots.',
      },
      {
        title: 'Distinct from Reading and Scranton day-rate assumptions',
        detail:
          'Interior town pairs fail when crews recycle Berks US-222 or NEPA medical-hub logistics.',
      },
      {
        title: 'I-81 / PA-61 freeflow is still billable',
        detail:
          'Town-to-town pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Ridge empty miles and winter grades rewrite curb plans',
        detail:
          'Far townships reject seat day rates after ice events.',
      },
      PA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Schuylkill zones: Pottsville seat, Schuylkill Haven corridor, northern coal towns & ridge edges',
  zonesIntro: 'Two to four sharp products — seat multi-story, south corridor, northern towns, and ridge edges.',
  zones: [
    {
      id: 'pottsville-seat',
      name: 'Pottsville multi-story & older stock',
      shortName: 'Pottsville',
      neighborhoods: ["Pottsville","downtown","seat multi-family"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Hills","Street parking"],
      moverTips: 'Inventory stairs and grades; plan temporary no-parking.',
      cityKeywords: ["pottsville"],
    },
    {
      id: 'schuylkill-haven',
      name: 'Schuylkill Haven / south corridor',
      shortName: 'Schuylkill Haven',
      neighborhoods: ["Schuylkill Haven","Orwigsburg edges","Cressona edges"],
      housingTypes: 'SFH, multi-unit, mixed stock',
      challenges: ["Arterial timing","Mixed access","PA-61 freeflow"],
      moverTips: 'Prefer early starts; confirm driveway depth.',
      cityKeywords: ["schuylkill haven","orwigsburg","cressona"],
    },
    {
      id: 'north-coal-towns',
      name: 'Tamaqua / Shenandoah northern towns',
      shortName: 'North coal towns',
      neighborhoods: ["Tamaqua","Shenandoah","Mahanoy City edges","Frackville edges"],
      housingTypes: 'Multi-unit, twins, older SFH',
      challenges: ["Empty miles","Hills","Mixed curb access"],
      moverTips: 'Survey street width; prefer early starts for long pairs.',
      cityKeywords: ["tamaqua","shenandoah","mahanoy city","frackville"],
    },
    {
      id: 'ridge-edges',
      name: 'Ridge edges & larger lots',
      shortName: 'Ridge edges',
      neighborhoods: ["Pine Grove edges","Tremont edges","western ridges"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Long empty miles","Soft shoulders","Winter ice"],
      moverTips: 'Photo approaches; winter mornings need flexibility.',
      cityKeywords: ["pine grove","tremont","rural schuylkill"],
    }
  ],
  specialized: [
    {
      id: 'coal-region-distinct',
      title: 'Coal-region interior vs Reading / Scranton',
      intro: 'Schuylkill is a distinct mid-state interior market.',
      bullets: ["Do not recycle Berks US-222 or NEPA medical-hub day rates alone.","Price town-to-town empty miles honestly."],
    },
    {
      id: 'i81-interior',
      title: 'I-81 / PA-61 interior freeflow',
      intro: 'Interior pairs still peak hard between discontinuous towns.',
      bullets: ["Build corridor buffers for morning and evening peaks.","Clarify Berks or Luzerne second addresses for drive-time assumptions."],
    },
    {
      id: 'town-multi-story',
      title: 'Pottsville & town multi-story access',
      intro: 'Seat and town stairs are first-class cost drivers.',
      bullets: ["Inventory floor counts and hill approaches.","Temporary no-parking often beats long carries."],
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
        intro: 'Schuylkill families compare Pottsville, Blue Mountain, Tamaqua, Schuylkill Haven, and other districts — verify boundaries.',
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
            detail: 'Lehigh Valley Hospital–Schuylkill (Pottsville) and related campuses anchor acute care; map peak freeflow across discontinuous towns.',
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
    intro: 'Town multi-story, interior freeflow, and ridge empty miles often matter more than raw miles.',
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
    intro: 'School years, lease ends, and winter grades reshape demand by pocket.',
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
        label: 'Berks County movers (parent contrast)',
        href: '/local-movers/pennsylvania/berks',
      },
      {
        label: 'Luzerne County movers',
        href: '/local-movers/pennsylvania/luzerne',
      },
    ],
  },
});
