import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const wilsonCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "wilson",
  hubTitle: "Wilson County Moving Intelligence Hub",
  eyebrow: "Wilson · Mt. Juliet/Lebanon east-Nashville growth corridor",
  h1: "Moving in Wilson County: Mt. Juliet Growth, Lebanon Access & I-40 Logistics",
  heroOpener: "Wilson County is Nashville’s eastern growth corridor: Mt. Juliet multi-family and HOA product along I-40, Lebanon town and industrial-adjacent edges, and portal time into Davidson that is not Sumner’s northern VVB pattern and not Rutherford’s I-24 southeast path. A Mt. Juliet HOA two-story, a Providence multi-family unit, a Lebanon craftsman, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Wilson — not a Sumner or Williamson clone.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-40 · US-70 · TN-109 · Mt. Juliet Road · Lebanon Pike corridors",
  whatMakesDifferent: {
    title: "What makes moving in Wilson County different",
    intro: "East-Nashville I-40 growth — not north Sumner lake edges or south Williamson estates.",
    bullets: [
      {
        title: "I-40 defines Nashville-linked portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Mt. Juliet HOA density is common",
        detail: "Gate lists and approved hours are routine.",
      },
      {
        title: "Lebanon stock can mix town SFH and industrial-adjacent multi-family",
        detail: "Access surveys differ from pure bedroom HOAs.",
      },
      {
        title: "TN-109 and US-70 reshape north–south timing inside the county",
        detail: "Not every job is an I-40 hop.",
      },
      {
        title: "Wilson is not Sumner or Rutherford",
        detail: "East I-40 logistics differ from north VVB and southeast I-24 patterns.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Wilson access zones",
  zonesIntro: "Plan by Mt. Juliet growth, Lebanon core, I-40 multi-family corridors, and rural edges.",
  zones: [
    {
      id: "mt-juliet",
      name: "Mt. Juliet multi-family & HOA growth",
      shortName: "Mt. Juliet",
      neighborhoods: ["Mt. Juliet","Providence","Beckwith Rd corridors","HOA master plans"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","I-40 congestion","Long portal time to Nashville core"],
      moverTips: "Collect HOA packets. Build I-40 buffer. Prefer early starts.",
      cityKeywords: ["mt juliet","mount juliet","providence"],
    },
    {
      id: "lebanon",
      name: "Lebanon core & multi-family",
      shortName: "Lebanon",
      neighborhoods: ["Lebanon","Downtown Lebanon edges","US-70 multi-family","Industrial-adjacent residential"],
      housingTypes: "SFH, multi-family, townhomes",
      challenges: ["Mixed access types","Arterial congestion","Longer empty miles from Mt. Juliet yards"],
      moverTips: "Confirm unit access type. Prefer mid-week mornings.",
      cityKeywords: ["lebanon","wilson county"],
    },
    {
      id: "i40-corridor",
      name: "I-40 multi-family corridor",
      shortName: "I-40 corridor",
      neighborhoods: ["I-40 multi-family","Belinda Pkwy edges","Cross-county approach multi-family"],
      housingTypes: "Multi-family, townhomes",
      challenges: ["Elevator buildings","Peak freeway congestion","Lease-end waves"],
      moverTips: "Reserve elevators in writing. Book month-end early.",
      cityKeywords: ["i-40","belinda","mt juliet multi-family"],
    },
    {
      id: "rural-edges",
      name: "Northern & southern rural edges",
      shortName: "Rural edges",
      neighborhoods: ["Watertown edges","Gladeville edges","Rural driveway lots"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey driveway access. Prefer early starts for long pairs.",
      cityKeywords: ["watertown","gladeville","rural wilson"],
    }
  ],
  costDrivers: {
    title: "What drives Wilson County moving costs",
    intro: "I-40 empty miles and HOA soft costs drive quotes.",
    drivers: [
      { title: "I-40 Nashville-linked congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA gate lists", detail: "Soft costs push demand into peak windows." },
      { title: "Multi-family elevators", detail: "Wait time adds labor hours." },
      { title: "Cross-county empty miles", detail: "Davidson destinations raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with HOA soft costs" },
      { label: "2–3BR HOA SFH or multi-family", value: "$1,300–$3,600+", note: "I-40 pairs trend up" },
      { label: "3–4+ BR / long Nashville-linked", value: "$2,400–$6,800+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Wilson County",
    intro: "Family seasons and multi-family lease turns reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-40 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Lease clusters fill crews in Mt. Juliet multi-unit." },
      { title: "Summer heat and storms", detail: "Prefer early starts on open suburban streets." }
    ],
  },
  specialized: [
    {
      id: "wilson-i40-east",
      title: "East Nashville I-40 growth module",
      intro: "Wilson estimates fail when HOA rules or Davidson empty miles are ignored.",
      bullets: ["Collect HOA packets for Mt. Juliet product.","Price I-40 pairs portal-to-portal.","Clarify Wilson vs Davidson/Rutherford addresses.","Do not reuse Sumner VVB or Williamson estate assumptions here.","Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Wilson County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Wilson County Schools and Lebanon Special School District serve different addresses. Confirm zoning carefully." },
          { title: "Growth areas", detail: "Mt. Juliet corridors can see enrollment pressure. Ask about capacity when touring." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Vanderbilt Wilson County Hospital and Nashville-metro systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour I-40 times into Davidson specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "I-40 growth product", detail: "HOA multi-family and SFH dominate Mt. Juliet corridors." },
          { title: "Lebanon mixed stock", detail: "Town SFH and industrial-adjacent multi-family differ from pure bedroom HOAs." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Mt. Juliet lifestyle", detail: "East-ring amenities with I-40 commute risk." },
          { title: "Lebanon pattern", detail: "Town and mixed stock with different access surveys." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Davidson; local healthcare, retail, logistics, and manufacturing also employ residents." },
          { title: "Commute realism", detail: "I-40 peaks are real. Test drive peak routes into Nashville." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "East Nashville ring identity", detail: "Wilson is distinct from Sumner north growth and Rutherford southeast growth." },
          { title: "Climate", detail: "Hot humid summers and storms. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Wilson County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Wilson County — official site", href: "https://www.wilsoncountytn.gov/", external: true },
      { label: "City of Mt. Juliet", href: "https://www.mtjuliet-tn.gov/", external: true },
      { label: "City of Lebanon", href: "https://www.lebanontn.org/", external: true },
      { label: "Wilson County Schools", href: "https://www.wcschools.com/", external: true },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer HOA fluency for Mt. Juliet; honest I-40 pricing into Davidson. Verify TDOR intrastate and FMCSA as applicable.",
  lastReviewed: '2026-07-24',
});
