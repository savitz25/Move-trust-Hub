import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeInPack } from '@/lib/local-movers/county-intelligence/indiana/in-shared';

export const stJosephCountyInIntelligence: CountyIntelligencePack = finalizeInPack({
  countySlug: "st-joseph",
  hubTitle: "St. Joseph County Moving Intelligence Hub",
  eyebrow: "St. Joseph · South Bend/Mishawaka, Notre Dame cycles & I-80/90",
  h1: "Moving in St. Joseph County: South Bend–Mishawaka Access, University Cycles & I-80/90 Logistics",
  heroOpener: "St. Joseph County is north-central Indiana university and industrial mix — not Elkhart RV-only product: South Bend multi-unit, Notre Dame lease waves, Mishawaka stock, and I-80/90/US-31 portal time that is not Fort Wayne ring logistics and not Indianapolis collar. A near-campus multi-family turn, a downtown South Bend condo, and a Granger HOA two-story do not share truck access or empty-mile risk. This hub is for St. Joseph — not an Elkhart clone.",
  heroCredibility:
    'Indiana DOR household goods operating authority (IC 8-2.1-22) for intrastate IN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-80/90 · US-31 · US-20 · SR-23",
  whatMakesDifferent: {
    title: "What makes moving in St. Joseph County different",
    intro: "These are South Bend / Notre Dame realities — academic peaks, industrial adjacency, and MI-border logistics — not Elkhart manufacturing-only defaults.",
    bullets: [
      {
        title: "Notre Dame and campus-adjacent multi-unit waves cluster demand",
        detail: "Academic turns fill elevators and street parking first.",
      },
      {
        title: "South Bend core multi-unit differs from Granger HOA product",
        detail: "Access photos beat verbal promises near campus and downtown.",
      },
      {
        title: "I-80/90 / US-31 define portal-to-portal time",
        detail: "MI-border and regional pairs look short on maps and regional at peak.",
      },
      {
        title: "Not an Elkhart RV-corridor clone",
        detail: "University + city multi-unit mix differs from pure manufacturing product.",
      },
      {
        title: "Not Fort Wayne ring logistics as the default",
        detail: "Treat St. Joseph as its own north-central inventory pattern.",
      },
      {
        title: "Intrastate Indiana DOR HHG authority vs interstate FMCSA",
        detail: "Moves entirely within Indiana by for-hire household goods carriers generally require a Certificate of Public Convenience and Necessity (Indiana Operating Authority) from the Indiana Department of Revenue Motor Carrier Services under IC 8-2.1-22. Match the legal name on the estimate to Indiana authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "St. Joseph access zones",
  zonesIntro: "Plan by South Bend core/campus, Mishawaka, Granger north, and west/south township edges.",
  zones: [
    {
      id: "south-bend-campus",
      name: "South Bend core & Notre Dame multi-family",
      shortName: "South Bend / ND",
      neighborhoods: ["Downtown South Bend","Notre Dame edges","Eddy Street corridors","near-campus multi-unit"],
      housingTypes: "Student multi-family, mid-rises, older SFH",
      challenges: ["Lease-end waves","Scarce curb staging","Elevators and stairs"],
      moverTips: "Book academic peaks early. Confirm elevator reservations.",
      cityKeywords: ["south bend","notre dame"],
    },
    {
      id: "mishawaka",
      name: "Mishawaka city & multi-unit belt",
      shortName: "Mishawaka",
      neighborhoods: ["Mishawaka","downtown Mishawaka edges","US-20 corridors"],
      housingTypes: "Multi-family, SFH, mixed stock",
      challenges: ["US-20 congestion","Mixed elevators and stairs","Lease waves"],
      moverTips: "Clarify Mishawaka vs South Bend destinations. Survey access type.",
      cityKeywords: ["mishawaka"],
    },
    {
      id: "granger-north",
      name: "Granger & north suburban growth",
      shortName: "Granger",
      neighborhoods: ["Granger","Harris Twp edges","SR-23 corridors"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","Longer portal time to core","SR-23 timing"],
      moverTips: "Collect HOA packets. Price north pairs portal-to-portal.",
      cityKeywords: ["granger"],
    },
    {
      id: "west-south",
      name: "Osceola, west/south township edges",
      shortName: "West/south edges",
      neighborhoods: ["Osceola edges","Walkerton edges","west industrial corridors"],
      housingTypes: "SFH, multi-family, industrial-adjacent stock",
      challenges: ["Longer empty miles","Industrial traffic","US-20 / US-31 timing"],
      moverTips: "Price outer pairs honestly. Avoid shift peaks when flexible.",
      cityKeywords: ["osceola","walkerton"],
    }
  ],
  costDrivers: {
    title: "What drives St. Joseph County moving costs",
    intro: "Campus multi-unit access and I-80/90 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Campus multi-unit & curb friction", detail: "Academic peaks spike labor hours." },
      { title: "I-80/90 / US-31 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs in Granger", detail: "Gate lists push peak windows." },
      { title: "MI-border authority soft costs", detail: "FMCSA may apply when any leg leaves Indiana." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,400+", note: "Higher near campus elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,700+", note: "Campus friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,200–$7,000+", note: "Chicago/Indy pairs highest" },
      { label: "Typical 2-person crew rate", value: "$95–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in St. Joseph County",
    intro: "University calendars dominate more than pure suburban peaks — plan August carefully.",
    items: [
      { title: "Best windows: mid-week outside academic peaks", detail: "Clear curb near campus and downtown." },
      { title: "Academic peaks: August and May", detail: "Book multi-unit far ahead." },
      { title: "Peak family season: late May–mid-August", detail: "Book Granger Saturdays early." },
      { title: "Winter lake-effect ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "south-bend-st-joseph-notre-dame",
      title: "South Bend Notre Dame & north-central module",
      intro: "St. Joseph estimates fail when academic lease waves or I-80/90 empty miles are treated like Elkhart-only manufacturing jobs.",
      bullets: ["Align multi-unit moves with Notre Dame calendars when possible.","Request elevator packets early near campus.","Price I-80/90/US-31 pairs portal-to-portal; clarify MI destinations for FMCSA.","Do not treat St. Joseph as an Elkhart clone.","Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to St. Joseph County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "South Bend, Penn-Harris-Madison, Mishawaka, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Indiana Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Beacon Health, Saint Joseph Health System, and other systems serve north-central corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Granger into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Campus multi-unit vs Granger HOA stock", detail: "Near-ND product differs sharply from north suburban two-stories." },
          { title: "Cost variation", detail: "Campus-adjacent renovated stock often prices differently from outer multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "South Bend campus lifestyle", detail: "University density with curb and elevator tradeoffs." },
          { title: "Mishawaka pattern", detail: "Mixed multi-unit with US-20 logistics." },
          { title: "Granger suburban pattern", detail: "HOA product with longer portal time to core jobs." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "University of Notre Dame, healthcare, manufacturing, and professional services shape employment." },
          { title: "Commute realism", detail: "I-80/90 and US-31 peaks are real — especially toward Michigan and Chicago corridors." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "North-central university identity", detail: "St. Joseph is South Bend metro — not Elkhart-only manufacturing or Fort Wayne ring defaults." },
          { title: "Climate", detail: "Lake-effect winter is real. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful St. Joseph County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Indiana DOR household goods operating authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "St. Joseph County — official site", href: "https://www.sjcindiana.com/", external: true },
      { label: "City of South Bend", href: "https://southbendin.gov/", external: true },
      { label: "INDOT traffic", href: "https://www.in.gov/indot/", external: true }
    ],
  },
  directoryHint: "Prefer campus multi-unit experience and honest I-80/90 pricing. Verify Indiana DOR HHG authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
