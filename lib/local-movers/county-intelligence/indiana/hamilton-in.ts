import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeInPack } from '@/lib/local-movers/county-intelligence/indiana/in-shared';

export const hamiltonCountyInIntelligence: CountyIntelligencePack = finalizeInPack({
  countySlug: "hamilton",
  hubTitle: "Hamilton County Moving Intelligence Hub",
  eyebrow: "Hamilton · Carmel/Fishers/Noblesville north-metro growth & I-69/US-31",
  h1: "Moving in Hamilton County: Carmel–Fishers Growth, North-Metro HOAs & I-69/US-31 Logistics",
  heroOpener: "Hamilton County is Indianapolis north-suburb growth — not Marion city core: Carmel and Fishers HOA product, Noblesville multi-family, corporate relo calendars, and I-69/US-31/146th Street portal time that is not downtown elevator logistics and not Fort Wayne regional product. A Carmel two-story, a Fishers multi-unit, and a Noblesville HOA ranch do not share truck access or empty-mile risk. This hub is for Indiana’s Hamilton County — not Ohio Hamilton/Cincinnati and not an Indy downtown clone.",
  heroCredibility:
    'Indiana DOR household goods operating authority (IC 8-2.1-22) for intrastate IN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-69 · US-31 · US-37 · 146th Street corridors",
  whatMakesDifferent: {
    title: "What makes moving in Hamilton County different",
    intro: "These are Carmel/Fishers north-metro realities — HOA packets, corporate hard dates, and US-31 timing — not Marion midtown elevators as the default.",
    bullets: [
      {
        title: "Carmel / Fishers HOA rules rewrite access plans",
        detail: "Gate lists and driveway rules dominate many jobs.",
      },
      {
        title: "Corporate relo calendars create hard report dates",
        detail: "North-metro campuses compress windows more than pure city lease waves.",
      },
      {
        title: "I-69 / US-31 / 146th Street define portal-to-portal time",
        detail: "Pairs toward Marion look short on maps and regional at peak.",
      },
      {
        title: "Not Marion downtown elevator product as the default",
        detail: "Survey each Hamilton address — growth suburbs differ from city density.",
      },
      {
        title: "Do not confuse with Ohio Hamilton County",
        detail: "This is Indiana Hamilton (Carmel/Fishers) — not Cincinnati river-city logistics.",
      },
      {
        title: "Intrastate Indiana DOR HHG authority vs interstate FMCSA",
        detail: "Moves entirely within Indiana by for-hire household goods carriers generally require a Certificate of Public Convenience and Necessity (Indiana Operating Authority) from the Indiana Department of Revenue Motor Carrier Services under IC 8-2.1-22. Match the legal name on the estimate to Indiana authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Hamilton access zones",
  zonesIntro: "Plan by Carmel core, Fishers growth, Noblesville, and west/north township edges.",
  zones: [
    {
      id: "carmel",
      name: "Carmel core & multi-family belt",
      shortName: "Carmel",
      neighborhoods: ["Carmel","Clay Twp edges","Keystone corridors","City Center edges"],
      housingTypes: "HOA SFH, multi-family, townhomes, mid-rises",
      challenges: ["HOA rules","US-31 congestion","Elevator reservations"],
      moverTips: "Collect HOA packets early. Book elevators for month-end.",
      cityKeywords: ["carmel"],
    },
    {
      id: "fishers",
      name: "Fishers growth suburbs",
      shortName: "Fishers",
      neighborhoods: ["Fishers","Geist edges","146th Street corridors","I-69 corridors"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["I-69 congestion","HOA gate lists","Longer portal time to Indy core"],
      moverTips: "Price I-69 pairs portal-to-portal. Collect HOA rules.",
      cityKeywords: ["fishers","geist"],
    },
    {
      id: "noblesville",
      name: "Noblesville & north-central stock",
      shortName: "Noblesville",
      neighborhoods: ["Noblesville","downtown Noblesville edges","SR-37 corridors"],
      housingTypes: "SFH, multi-family, mixed stock",
      challenges: ["SR-37 congestion","Mixed stairs and elevators","Growth empty miles"],
      moverTips: "Clarify Noblesville vs Carmel destinations. Survey multi-unit access type.",
      cityKeywords: ["noblesville"],
    },
    {
      id: "west-north",
      name: "Westfield, Cicero edges & west/north growth",
      shortName: "Westfield / north",
      neighborhoods: ["Westfield","Cicero edges","Sheridan edges","US-31 north"],
      housingTypes: "HOA SFH, multi-family, growth suburbs",
      challenges: ["Longer empty miles","HOA rules","US-31 timing"],
      moverTips: "Price west/north pairs honestly. Collect HOA packets.",
      cityKeywords: ["westfield","cicero"],
    }
  ],
  costDrivers: {
    title: "What drives Hamilton County moving costs",
    intro: "HOA friction and I-69/US-31 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "HOA gate lists & soft costs", detail: "Packets push demand into peak windows." },
      { title: "I-69 / US-31 / 146th congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Corporate hard-date premiums", detail: "Short windows raise weekend demand." },
      { title: "Multi-unit elevator friction", detail: "Carmel/Fishers labor hours spike." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$480–$1,550+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,450–$4,200+", note: "HOA friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,700–$8,500+", note: "Long I-69 pairs highest" },
      { label: "Typical 2-person crew rate", value: "$110–$185+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Hamilton County",
    intro: "Corporate calendars, school-year suburb demand, summer peak, and winter ice reshape north-metro windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce US-31/I-69 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book HOA Saturdays early." },
      { title: "Corporate Q-end transfers", detail: "Hard dates cluster around fiscal calendars." },
      { title: "Winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "hamilton-in-carmel-fishers-hoa",
      title: "Carmel/Fishers north-metro HOA module",
      intro: "Hamilton (IN) estimates fail when HOA packets or I-69 empty miles are treated like downtown Indianapolis jobs.",
      bullets: ["Collect Carmel/Fishers HOA packets before final quotes.","Price I-69/US-31 pairs portal-to-portal toward Marion.","Separate corporate inventory scopes from standard suburban SFH.","Clarify Indiana Hamilton vs Marion destinations — never assume Ohio Hamilton logistics.","Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Hamilton County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Carmel Clay, Hamilton Southeastern, Noblesville, Westfield Washington, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Indiana Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Riverview Health, IU Health North, Ascension, and Indy systems (via commute) serve north-metro corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Fishers and Westfield into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "HOA growth SFH vs multi-family belts", detail: "Carmel product differs from Noblesville mixed stock." },
          { title: "Cost variation", detail: "North-metro premium suburbs often price differently from far-north multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Carmel lifestyle", detail: "Walkable amenities with HOA and multi-unit tradeoffs." },
          { title: "Fishers growth pattern", detail: "HOA product with I-69 logistics." },
          { title: "Noblesville pattern", detail: "Mixed stock with SR-37 timing." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Corporate campuses, healthcare, professional services, and Indy-commute jobs shape employment." },
          { title: "Commute realism", detail: "I-69 and US-31 peaks are real for downtown Indy-bound workers." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "North-metro identity", detail: "Indiana Hamilton is Carmel/Fishers growth — not Marion city core or Ohio Cincinnati Hamilton as the default." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Hamilton County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Indiana DOR household goods operating authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Hamilton County, IN — official site", href: "https://www.hamiltoncounty.in.gov/", external: true },
      { label: "INDOT traffic", href: "https://www.in.gov/indot/", external: true }
    ],
  },
  directoryHint: "Prefer HOA/north-metro experience and honest I-69 pricing. This is Indiana Hamilton — not OH. Verify Indiana DOR HHG authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
