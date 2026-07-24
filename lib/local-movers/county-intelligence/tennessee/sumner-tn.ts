import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const sumnerCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "sumner",
  hubTitle: "Sumner County Moving Intelligence Hub",
  eyebrow: "Sumner · Hendersonville/Gallatin north-Nashville growth & lake-adjacent suburbs",
  h1: "Moving in Sumner County: Hendersonville Growth, Gallatin Access & I-65 Logistics",
  heroOpener: "Sumner County is Nashville’s northern growth ring: Hendersonville multi-family and HOA product, Gallatin town and industrial-adjacent edges, lake-adjacent suburbs, and Vietnam Veterans Blvd / I-65 portal time that is not Williamson premium estates and not Wilson’s I-40 east corridor. A Hendersonville HOA two-story, a Gallatin multi-family unit, a lake-edge home, and a Portland-edge tract do not share truck access or empty-mile risk. This hub is for Sumner — not a Davidson or Rutherford clone.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-65 · Vietnam Veterans Blvd · US-31E · TN-386 · Gallatin Pike",
  whatMakesDifferent: {
    title: "What makes moving in Sumner County different",
    intro: "North-Nashville growth and lake-adjacent suburbs — not Franklin estates or Murfreesboro I-24 growth tracts.",
    bullets: [
      {
        title: "Vietnam Veterans Blvd and I-65 define portal time",
        detail: "Cross-county pairs into Davidson burn clock at peak.",
      },
      {
        title: "HOA density is common in Hendersonville corridors",
        detail: "Gate lists and approved hours are routine.",
      },
      {
        title: "Lake-adjacent access can mean longer driveways and seasonal traffic",
        detail: "Survey access photos beat map miles.",
      },
      {
        title: "Gallatin stock can differ from pure bedroom HOAs",
        detail: "Town and industrial-adjacent edges need different surveys.",
      },
      {
        title: "Sumner is not Wilson or Williamson",
        detail: "North-corridor logistics differ from I-40 east growth and south premium suburbs.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Sumner access zones",
  zonesIntro: "Plan by Hendersonville growth, Gallatin core, lake-adjacent edges, and northern towns.",
  zones: [
    {
      id: "hendersonville",
      name: "Hendersonville multi-family & HOA growth",
      shortName: "Hendersonville",
      neighborhoods: ["Hendersonville","Vietnam Veterans Blvd multi-family","HOA master plans","Indian Lake edges"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","TN-386 / VVB congestion","Long portal time to Nashville core"],
      moverTips: "Collect HOA packets. Build VVB/I-65 buffer. Prefer early starts.",
      cityKeywords: ["hendersonville","indian lake","vvb"],
    },
    {
      id: "gallatin",
      name: "Gallatin core & multi-family",
      shortName: "Gallatin",
      neighborhoods: ["Gallatin","Downtown Gallatin edges","US-31E multi-family","Industrial-adjacent residential"],
      housingTypes: "SFH, multi-family, townhomes",
      challenges: ["Mixed access types","Arterial congestion","Longer empty miles from Hendersonville yards"],
      moverTips: "Confirm unit access type. Prefer mid-week mornings. Survey industrial-edge staging carefully.",
      cityKeywords: ["gallatin","us-31e"],
    },
    {
      id: "lake-edge",
      name: "Lake-adjacent residential edges",
      shortName: "Lake edge",
      neighborhoods: ["Old Hickory Lake edges","Lake-adjacent SFH","Seasonal recreation corridors"],
      housingTypes: "SFH, some multi-family",
      challenges: ["Longer driveways","Seasonal traffic pulses","Weather-sensitive approaches"],
      moverTips: "Share driveway photos. Build seasonal buffer on summer weekends.",
      cityKeywords: ["old hickory lake","lake"],
    },
    {
      id: "north-towns",
      name: "Portland, White House edges & northern towns",
      shortName: "North towns",
      neighborhoods: ["Portland","White House edges","Northern tracts"],
      housingTypes: "SFH, multi-family, rural-edge lots",
      challenges: ["Long empty miles","I-65 approach congestion","Varied driveway access"],
      moverTips: "Price long north-county pairs honestly. Clarify Sumner vs Robertson addresses when relevant.",
      cityKeywords: ["portland","white house","north sumner"],
    }
  ],
  costDrivers: {
    title: "What drives Sumner County moving costs",
    intro: "North-corridor empty miles and HOA soft costs drive quotes.",
    drivers: [
      { title: "I-65 / Vietnam Veterans congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA gate lists", detail: "Soft costs push demand into peak windows." },
      { title: "Lake-edge long carries", detail: "Labor hours rise on long driveways." },
      { title: "Cross-county empty miles", detail: "Davidson destinations raise staging distance." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with HOA soft costs" },
      { label: "2–3BR HOA SFH or multi-family", value: "$1,300–$3,600+", note: "I-65 pairs trend up" },
      { label: "3–4+ BR / long Nashville-linked", value: "$2,400–$6,800+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Sumner County",
    intro: "Family seasons and summer lake traffic reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce VVB/I-65 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Summer lake-edge weekends", detail: "Expect recreation traffic; prefer mid-week when flexible." },
      { title: "Summer heat and storms", detail: "Prefer early starts on open suburban streets." }
    ],
  },
  specialized: [
    {
      id: "sumner-north-ring",
      title: "North Nashville growth & lake-edge module",
      intro: "Sumner estimates fail when HOA rules or Davidson empty miles are ignored.",
      bullets: ["Collect HOA packets for Hendersonville product.","Price I-65/VVB pairs portal-to-portal.","Survey lake-edge driveways carefully.","Do not reuse Williamson estate or Wilson I-40 assumptions here.","Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Sumner County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Sumner County Schools is the primary public K–12 system. Assignment is address-based." },
          { title: "Growth areas", detail: "Hendersonville corridors can see enrollment pressure. Ask about capacity when touring." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Sumner Regional / Highpoint Health and Nashville-metro systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour times into Davidson specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "HOA growth vs lake-edge stock", detail: "Master plans dominate many corridors; lake edges add access complexity." },
          { title: "Cost variation", detail: "Hendersonville often prices differently from northern towns." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Hendersonville lifestyle", detail: "North-ring amenities with freeway commute risk." },
          { title: "Gallatin pattern", detail: "Town and mixed stock with different access surveys." },
          { title: "Lake-edge lifestyle", detail: "Recreation access with driveway logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Davidson; local healthcare, retail, and manufacturing also employ residents." },
          { title: "Commute realism", detail: "I-65 and Vietnam Veterans peaks are real. Test drive peak routes into Nashville." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "North Nashville ring identity", detail: "Sumner is distinct from Wilson’s east I-40 growth and Williamson’s south premium corridor." },
          { title: "Climate", detail: "Hot humid summers and storms. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Sumner County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Sumner County — official site", href: "https://www.sumnertn.org/", external: true },
      { label: "City of Hendersonville", href: "https://www.hvilletn.org/", external: true },
      { label: "City of Gallatin", href: "https://www.gallatintn.gov/", external: true },
      { label: "Sumner County Schools", href: "https://www.sumnerschools.org/", external: true },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer HOA fluency for Hendersonville; honest I-65/VVB pricing into Davidson. Verify TDOR intrastate and FMCSA as applicable.",
  lastReviewed: '2026-07-24',
});
