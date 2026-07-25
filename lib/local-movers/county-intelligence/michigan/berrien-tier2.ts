import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeMiTier2Pack,
  MI_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/michigan/mi-tier2-shared';

/** berrien — MI Tier 2 Wave 1 */
export const berrienCountyMiTier2Intelligence: CountyIntelligencePack = finalizeMiTier2Pack({
  countySlug: 'berrien',
  hubTitle: 'Berrien County Moving Intelligence Hub',
  eyebrow: 'Berrien · St. Joseph / Benton Harbor / Niles · SW MI · independent',
  h1: 'Moving in Berrien County: St. Joseph Lakeshore, Niles & I-94 SW Michigan Access',
  heroOpener: 'Berrien County is southwest Michigan’s independent I-94 lakeshore market — St. Joseph multi-story and shore stock, Benton Harbor corridors, Niles edge product, Indiana border adjacency, and freeflow that does not answer to Kalamazoo campus multi-unit defaults. Expect tourism peaks, border interstate legs, and longer empty miles into mid-Michigan. This guide is for people moving in Berrien as SW lakeshore / IN-border product — not a Kalamazoo rename.',
  heroCredibility: 'I-94 lakeshore · IN border · MSP CVED household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-94 · US-31 · M-63 · M-139 · Red Arrow Hwy corridors',
  lastReviewed: '2026-07-24',
  parentCompare: {
    parentLabel: 'independent SW Michigan lakeshore (vs Kalamazoo defaults)',
    parentHref: '/local-movers/michigan/kalamazoo',
    title: 'Compared with independent SW Michigan lakeshore (vs Kalamazoo defaults)',
    intro: 'Berrien is St. Joseph / Benton Harbor / Niles SW lakeshore product — not Kalamazoo campus multi-unit density and not Detroit collar defaults.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Kalamazoo crews fight US-131/I-94 campus peaks. Berrien pairs ride I-94 further southwest, US-31, and lakeshore arterials — freer mid-day SW freeflow, still peak-heavy on tourism and border windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Kalamazoo mixes campus multi-family and Portage HOAs. Berrien mixes shore multi-story, Benton Harbor corridors, and Niles edge SFH — more continuous SW lakeshore product.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Shore streets tighten truck size; IN destinations flip jobs to FMCSA more often than pure in-Kalamazoo pairs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Berrien quotes often sit at secondary SW rates for driveway SFH — tourism peaks and border empty miles still push premiums.',
      },
      {
        title: 'Role difference',
        detail: 'Berrien is independent SW lakeshore / IN-border product — not Kalamazoo renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Berrien County different',
    intro: 'I-94 lakeshore freeflow, shore last-mile, and IN interstate legs — not a Kalamazoo clone.',
    bullets: [
      {
        title: 'I-94 freeflow is billable',
        detail: 'St. Joseph ↔ Kalamazoo pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Indiana adjacency creates interstate legs',
        detail: 'Short-looking border hops need FMCSA authority.',
      },
      {
        title: 'Tourism peaks rewrite shore access',
        detail: 'Summer weekends tighten curb plans on lakeshore stock.',
      },
      {
        title: 'Distinct from Kalamazoo university product',
        detail: 'Do not recycle WMU multi-family-only playbooks for shore last-mile days.',
      },
      MI_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Berrien zones: St. Joseph lakeshore, Benton Harbor corridors, Niles edge & rural east',
  zonesIntro: 'Two to four sharp products under one SW lakeshore label.',
  zones: [
    {
      id: 'st-joseph',
      name: 'St. Joseph multi-story & lakeshore',
      shortName: 'St. Joseph',
      neighborhoods: ["St. Joseph","shore neighborhoods"],
      housingTypes: 'Multi-story, SFH, seasonal stock',
      challenges: ["Stairs","Last-mile width","Tourism peaks"],
      moverTips: 'Photo shore approaches; inventory stairs; plan smaller trucks when needed.',
      cityKeywords: ["st joseph mi"],
    },
    {
      id: 'benton-harbor',
      name: 'Benton Harbor corridors',
      shortName: 'Benton Harbor',
      neighborhoods: ["Benton Harbor","corridor edges"],
      housingTypes: 'Multi-family, SFH, mixed stock',
      challenges: ["Street width","Arterial timing"],
      moverTips: 'Confirm street width; plan temporary no-parking.',
      cityKeywords: ["benton harbor"],
    },
    {
      id: 'niles',
      name: 'Niles edge & IN approaches',
      shortName: 'Niles',
      neighborhoods: ["Niles","border approaches"],
      housingTypes: 'SFH, mixed stock',
      challenges: ["Empty miles","Interstate legs"],
      moverTips: 'Clarify IN destinations for FMCSA authority early.',
      cityKeywords: ["niles"],
    },
    {
      id: 'rural-east',
      name: 'Rural east toward Kalamazoo',
      shortName: 'Rural east',
      neighborhoods: ["eastern townships"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["berrien east"],
    }
  ],
  specialized: [
    {
      id: 'i94-sw',
      title: 'I-94 SW lakeshore freeflow',
      intro: 'Regional pairs still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Kalamazoo multi-family rates for shore last-mile days."],
    },
    {
      id: 'in-border',
      title: 'Indiana border interstate legs',
      intro: 'Short-looking hops still need FMCSA.',
      bullets: ["Clarify destination state before deposit.","Verify USDOT/MC on interstate quotes."],
    },
    {
      id: 'lakeshore',
      title: 'Lakeshore tourism staging',
      intro: 'Seasonal peaks rewrite curb plans.',
      bullets: ["Book early for summer weekends.","Photo shore approaches before final quote."],
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
        intro: 'Berrien families compare St. Joseph, Benton Harbor, Niles, and other districts — verify boundaries; do not assume Kalamazoo maps apply.',
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
            detail: 'Corewell and regional SW systems serve the market; map peak freeflow on I-94 corridors.',
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
    intro: 'Tourism peaks, shore last-mile, and border empty miles often matter more than raw miles.',
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
    intro: 'Summer lakeshore demand and school years reshape calendars more than pure campus term peaks alone.',
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
      { label: 'independent SW Michigan lakeshore (vs Kalamazoo defaults) movers (parent contrast)', href: '/local-movers/michigan/kalamazoo' },
    ],
  },
});
