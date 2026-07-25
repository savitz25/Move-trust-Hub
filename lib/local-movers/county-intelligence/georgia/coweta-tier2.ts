import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeGaTier2Pack,
  GA_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/georgia/ga-tier2-shared';

/** coweta — GA Tier 2 Wave 1 */
export const cowetaCountyTier2Intelligence: CountyIntelligencePack = finalizeGaTier2Pack({
  countySlug: 'coweta',
  hubTitle: 'Coweta County Moving Intelligence Hub',
  eyebrow: 'Coweta · Southwest Atlanta · Newnan / Senoia · vs Fulton',
  h1: 'Moving in Coweta County: Newnan, Senoia & I-85 South Outer Collar',
  heroOpener: 'Coweta County is southwest Atlanta’s outer I-85 growth collar — Newnan seat density, Senoia and film-adjacent residential pockets, longer empty miles from the Perimeter, and freeflow that is not Fulton intown product. Expect HOA growth villages, small-city multi-story stock, and outer-collar portal times that map miles understate. This guide is for people moving in Coweta as SW-metro I-85 growth — not a Fulton rename.',
  heroCredibility: 'I-85 south outer collar · Film/residential mix · Georgia DPS MCCD · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-85 · US-29 · GA-34 · GA-16 · GA-154 approaches',
  parentCompare: {
    parentLabel: 'Fulton County',
    parentHref: '/local-movers/georgia/fulton',
    title: 'Compared with Fulton County',
    intro: 'Coweta is Newnan / Senoia I-85 south outer collar — not Fulton towers and not pure inner-south Fulton multi-family alone.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail: 'Fulton crews fight Connector and intown peaks. Coweta pairs ride I-85 south, GA-34, and Newnan arterials — freer mid-day further southwest, still peak-heavy on Newnan commute and school windows.',
      },
      {
        title: 'Housing stock differences',
        detail: 'Fulton mixes towers and south-Fulton stock. Coweta mixes Newnan multi-story and SFH, Senoia village/film-edge homes, and growth HOAs — more continuous outer SW collar product, less continuous intown elevator density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail: 'Growth HOAs need COI packets; historic Newnan and Senoia streets can need smaller trucks more often than pure master-plan cul-de-sacs.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail: 'Local Coweta quotes often sit at outer-collar rates for driveway SFH — empty miles from intown staging push premiums vs map miles alone.',
      },
      {
        title: 'Role difference',
        detail: 'Coweta is SW Atlanta I-85 outer collar with film/residential mix — not Fulton core renamed.',
      }
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Coweta County different',
    intro: 'Outer I-85 freeflow, Newnan seat stock, and film-edge villages — not a Fulton clone.',
    bullets: [
      {
        title: 'I-85 south freeflow is billable',
        detail: 'Newnan ↔ Perimeter pairs freer mid-day still peak hard. Ask portal-to-portal.',
      },
      {
        title: 'Film/residential pockets rewrite calendars',
        detail: 'Senoia-area production and tourism windows can tighten small-town staging.',
      },
      {
        title: 'Outer-collar empty miles are first-class',
        detail: 'Do not quote pure Fulton local rates for Newnan deadhead.',
      },
      {
        title: 'Growth HOA product is common',
        detail: 'COI and gate lists on new villages are standard.',
      },
      GA_TIER2_REG_BULLET,
    ],
  },
  zonesHeading: 'Coweta zones: Newnan seat, Senoia film/village edge, I-85 growth villages & rural west',
  zonesIntro: 'Two to four sharp products under one SW outer-collar label.',
  zones: [
    {
      id: 'newnan',
      name: 'Newnan seat & core',
      shortName: 'Newnan',
      neighborhoods: ["Newnan","downtown edges"],
      housingTypes: 'Multi-story, SFH, mixed stock',
      challenges: ["Street width","Stairs","Arterial timing"],
      moverTips: 'Inventory stairs on older stock; plan temporary no-parking.',
      cityKeywords: ["newnan"],
    },
    {
      id: 'senoia',
      name: 'Senoia film & village edge',
      shortName: 'Senoia',
      neighborhoods: ["Senoia","village approaches"],
      housingTypes: 'Village SFH, film-adjacent stock',
      challenges: ["Narrow streets","Tourism/production windows"],
      moverTips: 'Photo street width; book around known production peaks when relevant.',
      cityKeywords: ["senoia"],
    },
    {
      id: 'i85-growth',
      name: 'I-85 growth villages',
      shortName: 'I-85 growth',
      neighborhoods: ["growth HOAs","corridor villages"],
      housingTypes: 'Planned SFH, townhomes',
      challenges: ["HOA packets","I-85 peaks"],
      moverTips: 'Collect COI early; price portal-to-portal toward Atlanta.',
      cityKeywords: ["coweta growth"],
    },
    {
      id: 'rural-west',
      name: 'Rural west & larger lots',
      shortName: 'Rural west',
      neighborhoods: ["western towns","larger lots"],
      housingTypes: 'Larger lots, rural approaches',
      challenges: ["Empty miles","Soft shoulders"],
      moverTips: 'Photo last-mile; rain weeks need flexibility.',
      cityKeywords: ["coweta west"],
    }
  ],
  specialized: [
    {
      id: 'i85-outer',
      title: 'I-85 south outer-collar freeflow',
      intro: 'Longer empty miles still peak hard.',
      bullets: ["Price portal-to-portal honestly.","Do not quote Fulton elevator rates for Newnan driveways."],
    },
    {
      id: 'film-village',
      title: 'Senoia film/village logistics',
      intro: 'Small-town geometry rewrites truck size.',
      bullets: ["Photo approaches.","Production windows can tighten curb plans."],
    },
    {
      id: 'growth-hoa',
      title: 'Outer SW HOA growth',
      intro: 'Planned villages treat COI as default.',
      bullets: ["Gate lists early.","Mud weeks on new streets need flexibility."],
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
        intro: 'Coweta families compare Coweta County Schools feeders across Newnan and growth villages — verify boundaries; outer-collar reputation does not replace district maps.',
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
            detail: 'Piedmont Newnan Hospital and regional clinics anchor acute care; map peak freeflow on I-85 south corridors.',
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
    intro: 'Empty miles, HOA soft costs, and I-85 peaks often matter more than raw miles.',
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
    intro: 'School years, summer closings, and occasional production calendars reshape demand more than intown corporate peaks alone.',
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
      { label: 'Fulton County movers (parent contrast)', href: '/local-movers/georgia/fulton' },
    ],
  },
});
