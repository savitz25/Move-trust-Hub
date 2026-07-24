import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const ottawaCountyMiIntelligence: CountyIntelligencePack = finalizeMiPack({
  countySlug: "ottawa",
  hubTitle: "Ottawa County Moving Intelligence Hub",
  eyebrow: "Ottawa · Holland lakeshore west-MI & US-31/I-96 logistics",
  h1: "Moving in Ottawa County: Holland Lakeshore Towns, West Michigan Growth & US-31/I-96 Logistics",
  heroOpener: "Ottawa County is West Michigan lakeshore identity: Holland and Zeeland village/growth stock, Grand Haven shoreline logistics, Jenison/Hudsonville GR-collar edges, and US-31/I-96/I-196 portal time that is not Grand Rapids core elevators and not Detroit SE Michigan. A Holland multi-family unit, a lakeshore seasonal turn, and a Hudsonville HOA two-story do not share truck access or empty-mile risk. This hub is for Ottawa — not a Kent downtown clone.",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-96 · US-31 · M-6 links · lakeshore corridors",
  whatMakesDifferent: {
    title: "What makes moving in Ottawa County different",
    intro: "These are Holland / lakeshore west-MI realities — shoreline logistics, growth suburbs, and lake-effect winter — not Grand Rapids core product alone.",
    bullets: [
      {
        title: "Holland / Zeeland growth is not downtown Grand Rapids",
        detail: "Village cores, HOA product, and manufacturing adjacency differ from GR elevators.",
      },
      {
        title: "Lakeshore and Grand Haven access rewrite staging plans",
        detail: "Tourism peaks and shoreline streets change truck length and timing.",
      },
      {
        title: "Jenison / Hudsonville collar edges lean toward GR logistics",
        detail: "Still Ottawa addresses — clarify county lines on multi-county estimates.",
      },
      {
        title: "US-31 / I-96 / I-196 define portal-to-portal time",
        detail: "Lakeshore-to-GR pairs look short on maps and regional at peak.",
      },
      {
        title: "Lake-effect snow is a first-class planning risk",
        detail: "West Michigan winters hit driveway and curb access hard.",
      },
      {
        title: "Intrastate Michigan motor carrier authority vs interstate FMCSA",
        detail: "Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Ottawa access zones",
  zonesIntro: "Plan by Holland/Zeeland core, Grand Haven lakeshore, Jenison/Hudsonville GR collar, and northern township edges.",
  zones: [
    {
      id: "holland-zeeland",
      name: "Holland, Zeeland & south-central growth",
      shortName: "Holland / Zeeland",
      neighborhoods: ["Holland","Zeeland","Holland Twp","Park Twp edges"],
      housingTypes: "SFH, multi-family, HOA growth, village stock",
      challenges: ["US-31 congestion","HOA rules","Tourism-season traffic"],
      moverTips: "Avoid festival/tourism peaks when flexible. Collect HOA packets.",
      cityKeywords: ["holland","zeeland"],
    },
    {
      id: "grand-haven",
      name: "Grand Haven & lakeshore corridor",
      shortName: "Grand Haven / shore",
      neighborhoods: ["Grand Haven","Ferrysburg","Spring Lake edges","lakeshore corridors"],
      housingTypes: "SFH, multi-family, seasonal/shore stock",
      challenges: ["Narrow shoreline streets","Seasonal demand spikes","Winter lake-effect"],
      moverTips: "Photo street width and driveway. Book summer weekends early.",
      cityKeywords: ["grand haven","spring lake","ferrysburg"],
    },
    {
      id: "jenison-hudsonville",
      name: "Jenison, Hudsonville & GR-collar edges",
      shortName: "Jenison / Hudsonville",
      neighborhoods: ["Jenison","Hudsonville","Georgetown Twp","Allendale edges"],
      housingTypes: "HOA SFH, multi-family, growth suburbs",
      challenges: ["I-196 / M-6 timing","HOA rules","Empty miles to Holland shore"],
      moverTips: "Clarify Ottawa vs Kent destinations. Price collar pairs portal-to-portal.",
      cityKeywords: ["jenison","hudsonville","allendale"],
    },
    {
      id: "ottawa-north",
      name: "Coopersville, northern townships & rural edges",
      shortName: "North Ottawa",
      neighborhoods: ["Coopersville","Polkton Twp edges","Crockery Twp edges","northern rural roads"],
      housingTypes: "SFH, rural stock, limited multi-family",
      challenges: ["Longer empty miles","Rural access","Winter ice"],
      moverTips: "Price rural pairs honestly. Photo driveway and turn radius.",
      cityKeywords: ["coopersville","northern ottawa"],
    }
  ],
  costDrivers: {
    title: "What drives Ottawa County moving costs",
    intro: "Lakeshore staging, HOA growth, and US-31/I-96 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Lakeshore curb & seasonal congestion", detail: "Summer weekends spike labor hours." },
      { title: "US-31 / I-96 / I-196 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on growth edges", detail: "Gate lists push demand into peak windows." },
      { title: "Lake-effect winter contingency", detail: "West Michigan snow can slip schedules." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,450+", note: "Higher near shore staging limits" },
      { label: "2–3BR condo or modest SFH", value: "$1,350–$3,800+", note: "HOA and shore friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,400–$7,000+", note: "GR pairs and peak weekends highest" },
      { label: "Typical 2-person crew rate", value: "$105–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Ottawa County",
    intro: "Tourism summers, family peaks, and heavy lake-effect winters reshape Ottawa windows more than pure GR core.",
    items: [
      { title: "Best windows: mid-week outside tourism peaks", detail: "Clear shore staging and US-31." },
      { title: "Peak family + tourism season: late May–mid-August", detail: "Book lakeshore Saturdays early." },
      { title: "Tulip Time and festival windows", detail: "Holland congestion can block flexible moves." },
      { title: "Lake-effect winter", detail: "Confirm contingency for driveway and curb staging." }
    ],
  },
  specialized: [
    {
      id: "ottawa-holland-lakeshore-west-mi",
      title: "Holland lakeshore & west-MI growth module",
      intro: "Ottawa estimates fail when lakeshore staging, tourism peaks, or US-31 empty miles are treated like GR downtown defaults.",
      bullets: ["Photo lakeshore street width and driveway grades before truck sizing.","Avoid major Holland tourism weekends when flexible.","Price US-31/I-96/I-196 pairs portal-to-portal toward Grand Rapids.","Clarify Ottawa vs Kent addresses on GR-collar estimates.","Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Ottawa County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Holland, Zeeland, Grand Haven, Hudsonville, Jenison, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Michigan Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Holland Hospital, Trinity Health sites, and Grand Rapids systems (via commute) serve the county. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from lakeshore towns into Holland and GR care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Lakeshore / village vs GR-collar HOA stock", detail: "Holland and Grand Haven product differs from Jenison/Hudsonville growth suburbs." },
          { title: "Cost variation", detail: "Shore-adjacent and growth HOA stock can price differently from inland rural SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Holland / Zeeland lifestyle", detail: "Village and growth-suburb mix with manufacturing adjacency." },
          { title: "Grand Haven shore pattern", detail: "Seasonal congestion and shoreline staging tradeoffs." },
          { title: "Jenison / Hudsonville pattern", detail: "GR-collar HOA product with I-196 timing." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Manufacturing, agriculture-adjacent industry, healthcare, education, and GR-commute professional jobs shape employment." },
          { title: "Commute realism", detail: "US-31 and I-196 peaks are real for Grand Rapids-bound workers." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Lakeshore west-MI identity", detail: "Ottawa is Holland/Grand Haven lakeshore growth — not Grand Rapids downtown elevators or SE Michigan collars." },
          { title: "Climate", detail: "Heavy lake-effect snow is a first-class planning factor. Confirm winter staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Ottawa County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Ottawa County — official site", href: "https://www.miottawa.org/", external: true },
      { label: "City of Holland", href: "https://www.cityofholland.com/", external: true },
      { label: "MiDrive traffic (MDOT)", href: "https://mdotjboss.state.mi.us/MiDrive/", external: true }
    ],
  },
  directoryHint: "Prefer lakeshore staging experience and honest US-31/I-196 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
