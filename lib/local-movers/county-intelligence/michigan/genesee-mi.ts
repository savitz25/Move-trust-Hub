import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const geneseeCountyMiIntelligence: CountyIntelligencePack = finalizeMiPack({
  countySlug: "genesee",
  hubTitle: "Genesee County Moving Intelligence Hub",
  eyebrow: "Genesee · Flint regional hub & I-75/I-69 logistics",
  h1: "Moving in Genesee County: Flint Regional Access, Recovery/Relo Patterns & I-75/I-69 Logistics",
  heroOpener: "Genesee County is a Flint regional market, not a Detroit suburb clone: Flint core multi-unit and older stock, Grand Blanc and Fenton suburban product, I-75/I-69 corridor timing, and recovery/relo patterns that differ from Oakland HOA villages and Saginaw bay logistics. A Flint multi-family unit, a Grand Blanc two-story, and a Fenton township home do not share truck access or empty-mile risk. This hub is for Genesee — not renamed Macomb or Wayne pages.",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-75 · I-69 · M-21 · Dort Highway corridors",
  whatMakesDifferent: {
    title: "What makes moving in Genesee County different",
    intro: "These are Flint regional realities — older stock, I-75/I-69 logistics, and suburban recovery growth — not SE Michigan corporate collars.",
    bullets: [
      {
        title: "Flint core older stock and multi-unit access dominate many jobs",
        detail: "Stairs, basements, and curb limits rewrite labor hours.",
      },
      {
        title: "Grand Blanc / Fenton suburban product is not Detroit north-metro",
        detail: "Regional pricing and empty miles differ from Oakland HOA defaults.",
      },
      {
        title: "I-75 / I-69 define portal-to-portal time",
        detail: "Pairs toward Detroit or Lansing look regional at peak.",
      },
      {
        title: "Recovery and workforce relo patterns matter where accurate",
        detail: "Hard dates appear on manufacturing, healthcare, and education transfers.",
      },
      {
        title: "Not a Detroit spillover clone",
        detail: "Genesee is its own regional hub with distinct access and inventory patterns.",
      },
      {
        title: "Intrastate Michigan motor carrier authority vs interstate FMCSA",
        detail: "Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Genesee access zones",
  zonesIntro: "Plan by Flint core, Grand Blanc south suburbs, Fenton/west edges, and northern township corridors.",
  zones: [
    {
      id: "flint-core",
      name: "Flint core & near-city multi-unit",
      shortName: "Flint core",
      neighborhoods: ["Downtown Flint","Eastside/Westside edges","Carriage Town edges","College Cultural edges"],
      housingTypes: "Older multi-unit, SFH, renovated stock",
      challenges: ["Stairs and basements","Curb staging","Dort / I-69 timing"],
      moverTips: "Survey stair width and curb carefully. Prefer mid-week mornings.",
      cityKeywords: ["flint","downtown flint"],
    },
    {
      id: "grand-blanc",
      name: "Grand Blanc & southern suburban belt",
      shortName: "Grand Blanc",
      neighborhoods: ["Grand Blanc","Grand Blanc Twp","Mundy Twp edges","Holly edges"],
      housingTypes: "SFH, multi-family, HOA pockets",
      challenges: ["I-75 congestion","HOA rules","Longer portal time to Flint core"],
      moverTips: "Collect HOA packets. Price I-75 pairs portal-to-portal.",
      cityKeywords: ["grand blanc","holly"],
    },
    {
      id: "fenton-west",
      name: "Fenton, Swartz Creek & west edges",
      shortName: "Fenton / west",
      neighborhoods: ["Fenton","Swartz Creek","Argentine Twp edges","Linden edges"],
      housingTypes: "SFH, lake-adjacent stock, multi-family",
      challenges: ["US-23 / I-75 timing","Longer empty miles","Winter access"],
      moverTips: "Price west-edge pairs honestly. Photo driveway and street width.",
      cityKeywords: ["fenton","swartz creek","linden"],
    },
    {
      id: "genesee-north",
      name: "Flushing, Davison & northern corridors",
      shortName: "North Genesee",
      neighborhoods: ["Flushing","Davison","Clio edges","Mt. Morris edges"],
      housingTypes: "SFH, multi-family, small-town stock",
      challenges: ["M-21 congestion","Longer runs","Winter ice"],
      moverTips: "Clarify northern destinations early. Confirm winter contingency.",
      cityKeywords: ["flushing","davison","clio"],
    }
  ],
  costDrivers: {
    title: "What drives Genesee County moving costs",
    intro: "Older-stock access and I-75/I-69 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Older multi-unit & stair friction", detail: "Flint core labor hours spike." },
      { title: "I-75 / I-69 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Suburban HOA soft costs", detail: "Grand Blanc packets push peak windows." },
      { title: "Winter ice contingency", detail: "Confirm driveway access on storm days." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,350+", note: "Higher with stairs or long carries" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,500+", note: "Older stock friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,200–$6,500+", note: "I-75/I-69 long pairs highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Genesee County",
    intro: "Regional family peaks, multi-family turns, and winter ice reshape Flint-area windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-75/I-69 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Near-core elevators and stairs fill first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "flint-genesee-regional-recovery",
      title: "Flint regional recovery & relo patterns module",
      intro: "Genesee estimates fail when older-stock access or I-75/I-69 empty miles are treated like Detroit collar defaults.",
      bullets: ["Survey Flint core stairs, basements, and curb before final quotes.","Price I-75/I-69 pairs portal-to-portal toward Detroit or Lansing.","Treat Grand Blanc/Fenton product as regional suburb stock — not Oakland clones.","Clarify Genesee vs Saginaw/Oakland destinations on multi-county estimates.","Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Genesee County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Flint Community Schools, Grand Blanc, Fenton, Davison, Flushing, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Michigan Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Hurley Medical Center, Ascension Genesys, McLaren Flint, and other systems serve regional corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Fenton and Davison into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Flint core multi-unit vs southern suburban SFH", detail: "Near-city product differs from Grand Blanc and Fenton two-stories." },
          { title: "Cost variation", detail: "Recovery-adjacent and suburban stock can price differently across short distances." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Flint core pattern", detail: "Older multi-unit and SFH with curb/stair tradeoffs." },
          { title: "Grand Blanc suburban pattern", detail: "HOA/SFH product with I-75 timing." },
          { title: "Fenton / west pattern", detail: "Longer empty miles and lake-adjacent pockets." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, education, manufacturing/suppliers, and regional services shape employment." },
          { title: "Commute realism", detail: "I-75 and I-69 peaks are real for Detroit and Lansing-bound workers." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Flint regional identity", detail: "Genesee is its own mid-Michigan hub — not Detroit spillover suburbs or Saginaw bay defaults." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Genesee County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Genesee County — official site", href: "https://www.geneseecountymi.gov/", external: true },
      { label: "City of Flint", href: "https://www.cityofflint.com/", external: true },
      { label: "MiDrive traffic (MDOT)", href: "https://mdotjboss.state.mi.us/MiDrive/", external: true }
    ],
  },
  directoryHint: "Prefer older-stock access surveys and honest I-75/I-69 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
