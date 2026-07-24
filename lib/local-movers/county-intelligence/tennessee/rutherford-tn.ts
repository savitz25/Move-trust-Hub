import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const rutherfordCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "rutherford",
  hubTitle: "Rutherford County Moving Intelligence Hub",
  eyebrow: "Rutherford · Murfreesboro growth & Nashville southeast overflow",
  h1: "Moving in Rutherford County: Murfreesboro Growth, HOA Construction & I-24 Logistics",
  heroOpener: "Rutherford County is Nashville’s southeast growth engine: Murfreesboro multi-family and new construction, Smyrna and La Vergne industrial-adjacent housing, and I-24 portal time into Davidson that is not Williamson estate product and not downtown Nashville elevators. A Medical Center Parkway multi-family unit, a Murfreesboro HOA two-story, a Smyrna townhome, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Rutherford — not a Davidson or Williamson clone.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-24 · US-41/70S · TN-840 links · Medical Center Pkwy · Old Fort Pkwy",
  whatMakesDifferent: {
    title: "What makes moving in Rutherford County different",
    intro: "Southeast Nashville overflow with new construction density — not premium Williamson estates or Sumner lake-edge patterns.",
    bullets: [
      {
        title: "New construction and HOA villages dominate many addresses",
        detail: "Gate lists, driveway mud, and unfinished streets are routine on growth edges.",
      },
      {
        title: "I-24 defines Nashville-linked portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "University and multi-family lease waves exist in Murfreesboro",
        detail: "Book academic and month-end clusters early.",
      },
      {
        title: "Industrial-adjacent corridors near Smyrna change staging",
        detail: "Freight traffic and curb competition differ from pure bedroom HOAs.",
      },
      {
        title: "Rutherford is not Williamson",
        detail: "More growth-tract product and different price/access mix — do not reuse Franklin estate copy.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Rutherford access zones",
  zonesIntro: "Plan by Murfreesboro core/growth, Smyrna/La Vergne, TN-840 edges, and rural south/east approaches.",
  zones: [
    {
      id: "murfreesboro-growth",
      name: "Murfreesboro multi-family & HOA growth",
      shortName: "Murfreesboro growth",
      neighborhoods: ["Murfreesboro","Medical Center Pkwy multi-family","Old Fort Pkwy corridors","HOA master plans"],
      housingTypes: "Multi-family, townhomes, HOA SFH, new construction",
      challenges: ["HOA rules","I-24 congestion","Construction-site access"],
      moverTips: "Collect HOA packets. Survey unfinished streets. Build I-24 buffer.",
      cityKeywords: ["murfreesboro","medical center","old fort"],
    },
    {
      id: "smyrna-lavergne",
      name: "Smyrna, La Vergne & industrial-adjacent housing",
      shortName: "Smyrna / La Vergne",
      neighborhoods: ["Smyrna","La Vergne","Nissan Drive edges","I-24 multi-family"],
      housingTypes: "Multi-family, townhomes, SFH",
      challenges: ["Freight corridor traffic","Elevator buildings","Long portal time to Nashville core"],
      moverTips: "Prefer early starts. Confirm elevator reservations. Clarify Rutherford vs Davidson addresses.",
      cityKeywords: ["smyrna","la vergne","nissan"],
    },
    {
      id: "840-edges",
      name: "TN-840 edges & cross-county approaches",
      shortName: "840 edges",
      neighborhoods: ["TN-840 multi-family","Northwest Rutherford tracts","Nolensville-edge (verify county)"],
      housingTypes: "HOA SFH, multi-family",
      challenges: ["Cross-county confusion","Long empty miles","HOA density"],
      moverTips: "Clarify county lines. Price Davidson-linked pairs honestly.",
      cityKeywords: ["840","nolensville edge","northwest rutherford"],
    },
    {
      id: "rural-se",
      name: "Southern & eastern rural-edge Rutherford",
      shortName: "Rural SE",
      neighborhoods: ["Eagleville edges","Eastern tracts","Rural driveway lots"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey driveway access. Prefer early starts for long pairs.",
      cityKeywords: ["eagleville","rural rutherford"],
    }
  ],
  costDrivers: {
    title: "What drives Rutherford County moving costs",
    intro: "I-24 empty miles, HOA soft costs, and new-construction access drive quotes.",
    drivers: [
      { title: "I-24 Nashville-linked congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA gate lists and approved hours", detail: "Soft costs push demand into peak windows." },
      { title: "New construction site access", detail: "Unfinished streets raise time risk." },
      { title: "Cross-county empty miles", detail: "Davidson destinations raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with HOA soft costs" },
      { label: "2–3BR HOA SFH or multi-family", value: "$1,300–$3,600+", note: "I-24 pairs trend up" },
      { label: "3–4+ BR / long Nashville-linked", value: "$2,400–$6,800+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Rutherford County",
    intro: "Growth construction seasons and family calendars reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce I-24 pain and clear HOA hours." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "University / multi-family lease waves", detail: "May/August clusters in Murfreesboro multi-family." },
      { title: "Summer heat and storms", detail: "Prefer early starts on open new-construction streets." }
    ],
  },
  specialized: [
    {
      id: "rutherford-i24-growth",
      title: "Murfreesboro growth & I-24 overflow module",
      intro: "Rutherford estimates fail when HOA rules or Nashville empty miles are ignored.",
      bullets: ["Collect HOA packets for master-planned villages.","Survey new-construction street access before final pricing.","Price I-24 Davidson pairs portal-to-portal.","Do not reuse Williamson estate assumptions here.","Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Rutherford County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Rutherford County Schools and Murfreesboro City Schools serve different addresses. Confirm zoning carefully." },
          { title: "Growth areas and capacity", detail: "Rapid growth corridors can see enrollment pressure. Ask about capacity when touring." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Ascension Saint Thomas Rutherford and Nashville-metro systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour I-24 times into Davidson specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Growth-tract product", detail: "New construction and HOA villages dominate many corridors." },
          { title: "Cost vs Williamson", detail: "Often more attainable than Franklin/Brentwood — still budget HOA dues and commute time." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Murfreesboro growth lifestyle", detail: "Newer multi-family and HOA product with I-24 commute risk." },
          { title: "Smyrna / La Vergne pattern", detail: "Industrial-adjacent housing with freight corridor logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Davidson; local manufacturing, healthcare, education, and retail also employ residents." },
          { title: "Commute realism", detail: "I-24 peaks are real. Test drive peak routes into Nashville." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Southeast Nashville overflow identity", detail: "Rutherford is growth suburb fabric — not downtown Nashville vertical living or Williamson premium estates." },
          { title: "Climate", detail: "Hot humid summers and storms. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Rutherford County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Rutherford County — official site", href: "https://www.rutherfordcountytn.gov/", external: true },
      { label: "City of Murfreesboro", href: "https://www.murfreesborotn.gov/", external: true },
      { label: "Rutherford County Schools", href: "https://www.rcschools.net/", external: true },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer HOA and new-construction fluency; honest I-24 pricing into Davidson. Verify TDOR intrastate and FMCSA as applicable.",
  lastReviewed: '2026-07-24',
});
