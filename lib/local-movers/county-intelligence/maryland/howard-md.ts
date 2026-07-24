import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMdPack } from '@/lib/local-movers/county-intelligence/maryland/md-shared';

export const howardCountyMdIntelligence: CountyIntelligencePack = finalizeMdPack({
  countySlug: "howard",
  hubTitle: "Howard County Moving Intelligence Hub",
  eyebrow: "Howard · Columbia planned community, RT 29/32 growth & school-driven moves",
  h1: "Moving in Howard County: Columbia Planned Villages, Route 29/32 Growth & School-Driven Logistics",
  heroOpener: "Howard County is Columbia planned-community logistics — not Annapolis capital and not Bethesda elevators: village HOA rules, Columbia multi-unit belts, Ellicott City older stock, and US-29/MD-32/I-95 portal time that is not PG National Harbor product and not Baltimore City row-homes. A Columbia village two-story, a Town Center condo, and an Ellicott City multi-level do not share truck access or empty-mile risk. This hub is for Howard — not a generic DC-suburb clone.",
  heroCredibility:
    'Maryland household goods mover registration (Dept. of Labor) for intrastate MD moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-95 · US-29 · MD-32 · MD-100 · MD-175",
  whatMakesDifferent: {
    title: "What makes moving in Howard County different",
    intro: "These are Columbia planned-village realities — HOA packets, school calendars, and US-29 timing — not Annapolis historic streets or Montgomery high-rises as the default.",
    bullets: [
      {
        title: "Columbia village HOA rules rewrite access plans",
        detail: "Gate lists, parking rules, and village covenants dominate many jobs.",
      },
      {
        title: "School-driven moves cluster peak demand",
        detail: "Summer transfers and district preferences compress Saturday windows.",
      },
      {
        title: "US-29 / MD-32 / I-95 define portal-to-portal time",
        detail: "Pairs toward DC or Baltimore look regional at peak.",
      },
      {
        title: "Ellicott City older stock differs from Columbia multi-unit",
        detail: "Stairs, grades, and historic-adjacent access change truck sizing.",
      },
      {
        title: "Not Anne Arundel capital product and not Montgomery northwest",
        detail: "Treat Howard as planned-community mid-corridor logistics.",
      },
      {
        title: "Intrastate Maryland HHG registration vs interstate FMCSA",
        detail: "Moves entirely within Maryland by household goods carriers using commercial motor vehicles generally require active Maryland household goods mover registration with the Department of Labor, Division of Occupational and Professional Licensing. Match the legal name on the estimate to Maryland registration before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Howard access zones",
  zonesIntro: "Plan by Columbia villages/Town Center, Ellicott City, north Laurel edges, and west county growth.",
  zones: [
    {
      id: "columbia-core",
      name: "Columbia villages & Town Center multi-unit",
      shortName: "Columbia",
      neighborhoods: ["Columbia Town Center","Owen Brown","Wilde Lake","Long Reach","Hickory Ridge"],
      housingTypes: "HOA SFH, multi-family, townhomes, mid-rises",
      challenges: ["HOA/village rules","Elevator reservations","US-29 congestion"],
      moverTips: "Collect village HOA packets early. Book elevators for month-end.",
      cityKeywords: ["columbia"],
    },
    {
      id: "ellicott-city",
      name: "Ellicott City & historic-adjacent stock",
      shortName: "Ellicott City",
      neighborhoods: ["Ellicott City","Ilchester edges","Catonsville edges"],
      housingTypes: "Older SFH, multi-level, limited multi-family",
      challenges: ["Grades and stairs","Street width","US-40 / US-29 timing"],
      moverTips: "Photo grades and curb. Prefer smaller trucks when required.",
      cityKeywords: ["ellicott city"],
    },
    {
      id: "north-laurel",
      name: "North Laurel, Savage & south-east edges",
      shortName: "North Laurel / SE",
      neighborhoods: ["North Laurel","Savage","Jessup edges","MD-216 corridors"],
      housingTypes: "Multi-family, SFH, mixed stock",
      challenges: ["I-95 congestion","Lease-end waves","Industrial adjacency"],
      moverTips: "Price SE pairs portal-to-portal. Survey multi-unit access type.",
      cityKeywords: ["laurel","savage","jessup"],
    },
    {
      id: "west-howard",
      name: "Clarksville, Glenelg & west growth",
      shortName: "West Howard",
      neighborhoods: ["Clarksville","Glenelg","West Friendship edges","MD-32 corridors"],
      housingTypes: "HOA SFH, executive stock",
      challenges: ["Longer empty miles","HOA rules","MD-32 timing"],
      moverTips: "Price west pairs honestly. Collect HOA packets.",
      cityKeywords: ["clarksville","glenelg"],
    }
  ],
  costDrivers: {
    title: "What drives Howard County moving costs",
    intro: "Village HOA friction and US-29/I-95 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Columbia HOA / village soft costs", detail: "Gate lists push peak windows." },
      { title: "US-29 / MD-32 / I-95 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Ellicott City grades & stairs", detail: "Labor hours spike on older stock." },
      { title: "School-season Saturday premiums", detail: "Peak family demand compresses availability." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$520–$1,650+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,550–$4,400+", note: "HOA friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,900–$9,000+", note: "DC/Baltimore pairs highest" },
      { label: "Typical 2-person crew rate", value: "$120–$200+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Howard County",
    intro: "School calendars dominate more than pure corporate peaks — plan summer carefully.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce US-29 pain." },
      { title: "Peak school-transfer season: late May–mid-August", detail: "Book Columbia Saturdays far ahead." },
      { title: "Month-end multi-family turns", detail: "Town Center elevators fill first." },
      { title: "Winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "howard-columbia-planned-community",
      title: "Columbia planned community & school-driven module",
      intro: "Howard estimates fail when village HOA packets or US-29 empty miles are treated like Annapolis or Bethesda defaults.",
      bullets: ["Collect Columbia village HOA packets before final quotes.","Price US-29/MD-32/I-95 pairs portal-to-portal.","Survey Ellicott City grades separately from Columbia multi-unit.","Clarify Howard vs Montgomery/Anne Arundel/Baltimore County destinations.","Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Howard County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Howard County Public School System is a primary relocator driver. Confirm polygon zoning carefully." },
          { title: "Research sources", detail: "HCPSS tools and Maryland State Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Johns Hopkins Howard County Medical Center and other systems serve mid-corridor communities. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from west Howard into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Columbia village HOA vs Ellicott City older stock", detail: "Planned-community product differs from historic-adjacent multi-level homes." },
          { title: "Cost variation", detail: "Village premium stock often prices differently from north Laurel multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Columbia village lifestyle", detail: "Planned amenities with HOA access tradeoffs." },
          { title: "Ellicott City pattern", detail: "Older stock with grade and stair logistics." },
          { title: "West Howard pattern", detail: "Executive HOA product with longer empty miles." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Healthcare, education, federal adjacency (via Fort Meade corridors), and professional services shape employment." },
          { title: "Commute realism", detail: "US-29 and I-95 peaks are real for DC- and Baltimore-bound workers." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Planned-community identity", detail: "Howard is Columbia mid-corridor — not Annapolis capital or Montgomery northwest high-rises as the default." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Howard County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Maryland household goods mover registration for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Howard County — official site", href: "https://www.howardcountymd.gov/", external: true },
      { label: "MDOT CHART traffic", href: "https://chart.maryland.gov/", external: true }
    ],
  },
  directoryHint: "Prefer Columbia HOA experience and honest US-29 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
