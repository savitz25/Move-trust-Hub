import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const saginawCountyMiIntelligence: CountyIntelligencePack = finalizeMiPack({
  countySlug: "saginaw",
  hubTitle: "Saginaw County Moving Intelligence Hub",
  eyebrow: "Saginaw · Great Lakes bay regional hub & I-75/I-675 logistics",
  h1: "Moving in Saginaw County: Bay Region Access, Great Lakes Hub Patterns & I-75/I-675 Logistics",
  heroOpener: "Saginaw County is a Great Lakes bay regional hub: Saginaw city older stock and multi-unit, township growth edges, bay-region logistics, and I-75/I-675/M-46 portal time that is not Detroit SE Michigan and not Flint recovery defaults alone. A Saginaw multi-family unit, a Thomas Township two-story, and a Freeland-edge home do not share truck access or empty-mile risk. This hub is for Saginaw — not a renamed Genesee or Wayne page.",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-75 · I-675 · M-46 · M-13 corridors",
  whatMakesDifferent: {
    title: "What makes moving in Saginaw County different",
    intro: "These are Saginaw bay regional realities — older stock, I-75/I-675 logistics, and township growth — not Detroit collar product.",
    bullets: [
      {
        title: "Saginaw city older stock and multi-unit access dominate many jobs",
        detail: "Stairs, basements, and curb limits rewrite labor hours.",
      },
      {
        title: "Township growth edges are not Detroit north-metro HOA defaults",
        detail: "Regional pricing and empty miles differ from SE Michigan collars.",
      },
      {
        title: "I-75 / I-675 / M-46 define portal-to-portal time",
        detail: "Pairs toward Flint, Bay City, or Detroit look regional at peak.",
      },
      {
        title: "Bay-region manufacturing and healthcare relo calendars matter",
        detail: "Hard dates appear on regional employer transfers.",
      },
      {
        title: "Not a Flint clone and not Detroit spillover",
        detail: "Saginaw is its own bay-region hub with distinct inventory patterns.",
      },
      {
        title: "Intrastate Michigan motor carrier authority vs interstate FMCSA",
        detail: "Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Saginaw access zones",
  zonesIntro: "Plan by Saginaw city core, south/west townships, Freeland/north edges, and east corridors toward Bay City.",
  zones: [
    {
      id: "saginaw-core",
      name: "Saginaw city core & near-city multi-unit",
      shortName: "Saginaw core",
      neighborhoods: ["Downtown Saginaw","East/West side edges","near-core multi-unit","Old Town edges"],
      housingTypes: "Older multi-unit, SFH, renovated stock",
      challenges: ["Stairs and basements","Curb staging","I-675 timing"],
      moverTips: "Survey stair width and curb carefully. Prefer mid-week mornings.",
      cityKeywords: ["saginaw","downtown saginaw"],
    },
    {
      id: "saginaw-twp-south",
      name: "Saginaw Township & southern growth edges",
      shortName: "Saginaw Twp / south",
      neighborhoods: ["Saginaw Charter Twp","Kochville edges","Tittabawassee edges","Hemlock edges"],
      housingTypes: "SFH, multi-family, HOA pockets",
      challenges: ["M-46 congestion","HOA rules","Longer portal time to core"],
      moverTips: "Collect HOA packets. Price township pairs portal-to-portal.",
      cityKeywords: ["saginaw township","hemlock"],
    },
    {
      id: "freeland-north",
      name: "Freeland, Carrollton & northern edges",
      shortName: "Freeland / north",
      neighborhoods: ["Freeland","Carrollton","Zilwaukee edges","northern rural roads"],
      housingTypes: "SFH, multi-family, small-town stock",
      challenges: ["I-75 timing","Longer empty miles","Winter access"],
      moverTips: "Price northern pairs honestly. Photo driveway and street width.",
      cityKeywords: ["freeland","carrollton"],
    },
    {
      id: "saginaw-east-bay",
      name: "Bridgeport, Buena Vista & east bay approaches",
      shortName: "East / bay approach",
      neighborhoods: ["Bridgeport","Buena Vista","Spalding edges","bay-region approaches"],
      housingTypes: "SFH, multi-family, industrial-adjacent stock",
      challenges: ["I-75 / M-13 timing","Industrial traffic","Winter ice"],
      moverTips: "Clarify bay-region destinations early. Survey industrial-adjacent access.",
      cityKeywords: ["bridgeport","buena vista"],
    }
  ],
  costDrivers: {
    title: "What drives Saginaw County moving costs",
    intro: "Older-stock access and I-75/I-675 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Older multi-unit & stair friction", detail: "City-core labor hours spike." },
      { title: "I-75 / I-675 / M-46 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Township HOA soft costs", detail: "Packets push demand into peak windows." },
      { title: "Winter ice contingency", detail: "Bay-region snow can slip schedules." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$380–$1,300+", note: "Higher with stairs or long carries" },
      { label: "2–3BR condo or modest SFH", value: "$1,200–$3,400+", note: "Older stock friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,100–$6,200+", note: "I-75 long pairs highest" },
      { label: "Typical 2-person crew rate", value: "$95–$165+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Saginaw County",
    intro: "Regional family peaks, multi-family turns, and bay-region winter ice reshape Saginaw windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-75/M-46 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book township Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Near-core elevators and stairs fill first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "saginaw-bay-region-hub",
      title: "Saginaw Great Lakes bay regional hub module",
      intro: "Saginaw estimates fail when older-stock access or I-75/I-675 empty miles are treated like Detroit collar defaults.",
      bullets: ["Survey Saginaw core stairs, basements, and curb before final quotes.","Price I-75/I-675/M-46 pairs portal-to-portal toward Flint, Bay City, or Detroit.","Treat township growth product as regional — not Oakland HOA clones.","Clarify Saginaw vs Genesee destinations on multi-county estimates.","Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Saginaw County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Saginaw Public Schools, Saginaw Township Community, Freeland, Bridgeport-Spaulding, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Michigan Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Covenant HealthCare, MyMichigan/Ascension sites, and other systems serve bay-region corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from township edges into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "City multi-unit vs township SFH stock", detail: "Saginaw core product differs from Saginaw Township and Freeland two-stories." },
          { title: "Cost variation", detail: "Near-core renovated stock often prices differently from outer-township SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Saginaw core pattern", detail: "Older multi-unit and SFH with curb/stair tradeoffs." },
          { title: "Township growth pattern", detail: "SFH/multi-family with M-46 logistics." },
          { title: "North/east bay-approach pattern", detail: "Longer empty miles and industrial adjacency." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, manufacturing/suppliers, education, and bay-region services shape employment." },
          { title: "Commute realism", detail: "I-75 and I-675 peaks are real for Flint and Detroit-bound workers." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Bay-region identity", detail: "Saginaw is a Great Lakes bay hub — not Detroit spillover suburbs or pure Flint recovery defaults." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Saginaw County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Saginaw County — official site", href: "https://www.saginawcounty.com/", external: true },
      { label: "City of Saginaw", href: "https://www.saginaw-mi.com/", external: true },
      { label: "MiDrive traffic (MDOT)", href: "https://mdotjboss.state.mi.us/MiDrive/", external: true }
    ],
  },
  directoryHint: "Prefer older-stock access surveys and honest I-75/I-675 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
