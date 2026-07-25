import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeNyTier2Pack,
  NY_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/new-york/ny-tier2-shared';

/**
 * clinton — NY Tier 2 Wave 2
 */
export const clintonCountyTier2Intelligence: CountyIntelligencePack = finalizeNyTier2Pack({
  countySlug: 'clinton',
  hubTitle: 'Clinton County Moving Intelligence Hub',
  eyebrow: 'Clinton · Plattsburgh North Country · independent',
  h1: 'Moving in Clinton County: Plattsburgh North Country, Lake Champlain Edge & I-87 Access',
  heroOpener:
    'Clinton County is North Country independent product — Plattsburgh multi-story and seat density, Lake Champlain edges, college and former-base corridor stock, and I-87 freeflow that does not answer to Capital Region scripts. Expect long empty miles from Albany/Saratoga, border-adjacent interstate legs, and winter access that rejects soft schedules. This guide is for people moving in Clinton as Plattsburgh North Country — not Saratoga growth suburbs renamed and not Adirondack tourism alone.',
  heroCredibility:
    'Plattsburgh North Country · Lake Champlain · I-87 north · NYSDOT household goods · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-87 · NY-3 · NY-9 · NY-22 · NY-374 · NY-190',
  parentCompare: {
    parentLabel: 'independent North Country (vs Saratoga / Albany defaults)',
    parentHref: '/local-movers/new-york/saratoga',
    title: 'Compared with independent North Country (vs Saratoga / Albany defaults)',
    intro:
      'Clinton is Plattsburgh North Country independent — not Saratoga Springs tourism growth and not Albany government-core freeflow alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Saratoga crews fight Northway peaks toward Albany. Clinton pairs ride I-87 far north, NY-3, and NY-22 — freer mid-day North Country freeflow, still peak-heavy on Plattsburgh arterials and long-haul empty miles for out-of-area crews.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Saratoga mixes tourism village density and Clifton Park HOAs. Clinton mixes Plattsburgh multi-story, lake-edge SFH, and rural North Country lots — more continuous secondary-city product, less Capital-collar planned suburbs.',
      },
      {
        title: 'Truck access & density',
        detail:
          'City multi-story needs stair inventories; lake and rural edges add winter ice and long approaches uncommon on Clifton Park jobs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Clinton quotes often track secondary North Country rates — long deadhead for regional crews and winter access push premiums vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail:
          'Clinton is Plattsburgh North Country independent — not Saratoga Capital-collar growth renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Clinton County different',
    intro: 'North Country freeflow, lake-edge winter, and border adjacency — not Capital Region boilerplate.',
    bullets: [
      {
        title: 'Plattsburgh multi-story is first-class product',
        detail:
          'Stairs and street parking need inventories different from pure rural playbooks.',
      },
      {
        title: 'Long empty miles are operational',
        detail:
          'Regional crews price deadhead honestly; local pairs still peak on city arterials.',
      },
      {
        title: 'VT / Quebec adjacency creates interstate legs',
        detail:
          'Short-looking border hops need FMCSA authority and customs-aware planning when applicable.',
      },
      {
        title: 'Winter North Country access rewrites mornings',
        detail:
          'Ice and wind need flexible start times more often than mid-Hudson winters.',
      },
      NY_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Clinton zones: Plattsburgh core, lake edge, former-base corridors & rural North Country',
  zonesIntro: 'Two to four sharp products — city, lake, corridor multi-family, and rural edges.',
  zones: [
    {
      id: 'plattsburgh-core',
      name: 'Plattsburgh city core',
      shortName: 'Plattsburgh',
      neighborhoods: ["Plattsburgh","downtown","city neighborhoods"],
      housingTypes: 'Multi-story, multi-unit, older SFH',
      challenges: ["Stairs","Street parking","Winter ice"],
      moverTips: 'Inventory stairs; plan temporary no-parking; winter flexibility required.',
      cityKeywords: ["plattsburgh"],
    },
    {
      id: 'lake-edge',
      name: 'Lake Champlain edge towns',
      shortName: 'Lake edge',
      neighborhoods: ["lake approaches","Rouses Point edges","Champlain towns"],
      housingTypes: 'SFH, seasonal stock, some multi-unit',
      challenges: ["Wind/ice","Seasonal roads","Border-adjacent freeflow"],
      moverTips: 'Photo approaches; clarify interstate/border legs early.',
      cityKeywords: ["rouses point","champlain"],
    },
    {
      id: 'corridor-stock',
      name: 'Former-base & corridor multi-family',
      shortName: 'Corridor multi-family',
      neighborhoods: ["base corridor edges","apartment clusters"],
      housingTypes: 'Apartments, multi-family, mixed SFH',
      challenges: ["Building COIs","Lease clusters"],
      moverTips: 'Collect management packets; inventory elevators and long carries.',
      cityKeywords: ["plattsburgh base"],
    },
    {
      id: 'rural-nc',
      name: 'Rural North Country edges',
      shortName: 'Rural edges',
      neighborhoods: ["Dannemora edges","Saranac edges","western towns"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Winter ice","Soft shoulders"],
      moverTips: 'Photo last-mile; allow winter buffer.',
      cityKeywords: ["dannemora","saranac"],
    }
  ],
  specialized: [
    {
      id: 'plattsburgh-city',
      title: 'Plattsburgh multi-story & winter access',
      intro: 'City stairs and ice are first-class cost drivers.',
      bullets: ["Inventory floor counts and street width.","Winter mornings need flexible start times."],
    },
    {
      id: 'border-interstate',
      title: 'Border-adjacent interstate legs',
      intro: 'VT and Canada-facing pairs need authority clarity.',
      bullets: ["Verify FMCSA for any out-of-state leg.","Do not assume local NYSDOT alone covers border hops."],
    },
    {
      id: 'north-country-empty',
      title: 'North Country empty miles',
      intro: 'Longer freeflow still peaks on city pairs.',
      bullets: ["Price portal-to-portal and deadhead honestly.","Photo rural last-mile before locking truck size."],
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
        intro: 'Clinton families compare Plattsburgh City, Beekmantown, Saranac, and other districts — verify boundaries; rural feeders differ from city schools.',
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
            detail: 'University of Vermont Health Network – Champlain Valley Physicians Hospital and regional clinics anchor acute care; map peak freeflow in Plattsburgh.',
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
    intro: 'Winter access, multi-story stairs, and empty miles often matter more than raw miles.',
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
    intro: 'Harsh winters, school years, and border freeflow reshape demand more than Capital Region tourism calendars alone.',
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
        label: 'independent North Country (vs Saratoga / Albany defaults) movers (parent contrast)',
        href: '/local-movers/new-york/saratoga',
      },
    ],
  },
});
