import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMdPack } from '@/lib/local-movers/county-intelligence/maryland/md-shared';

export const harfordCountyMdIntelligence: CountyIntelligencePack = finalizeMdPack({
  countySlug: "harford",
  hubTitle: "Harford County Moving Intelligence Hub",
  eyebrow: "Harford · Bel Air/Aberdeen northeast fringe & I-95 logistics",
  h1: "Moving in Harford County: Bel Air–Aberdeen Fringe, Northeast Metro Access & I-95 Logistics",
  heroOpener: "Harford County is northeast metro fringe — not Baltimore City and not a Towson clone: Bel Air suburban product, Aberdeen Proving Ground adjacency, Edgewood multi-unit, and I-95/MD-24 portal time that is not DC-collar logistics and not city rowhome carries. A Bel Air HOA two-story, an Aberdeen multi-family unit, and a Fallston-edge home do not share truck access or empty-mile risk. This hub is for Harford — not a Baltimore County rename.",
  heroCredibility:
    'Maryland household goods mover registration (Dept. of Labor) for intrastate MD moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-95 · MD-24 · US-1 · MD-22",
  whatMakesDifferent: {
    title: "What makes moving in Harford County different",
    intro: "These are northeast-fringe realities — APG adjacency, I-95 timing, and suburban stock — not city micro-markets or DC-suburb density.",
    bullets: [
      {
        title: "Aberdeen Proving Ground adjacency creates hard report dates",
        detail: "Military and contractor calendars reshape windows.",
      },
      {
        title: "Bel Air suburban HOA product is not city row-home product",
        detail: "Gate lists and longer empty miles rewrite quotes.",
      },
      {
        title: "I-95 / MD-24 define portal-to-portal time",
        detail: "Pairs toward Baltimore look regional at peak.",
      },
      {
        title: "Not a Baltimore County Towson clone",
        detail: "Harford fringe logistics and APG patterns differ.",
      },
      {
        title: "Edgewood multi-unit lease waves cluster demand",
        detail: "Month-end turns fill elevators first.",
      },
      {
        title: "Intrastate Maryland HHG registration vs interstate FMCSA",
        detail: "Moves entirely within Maryland by household goods carriers using commercial motor vehicles generally require active Maryland household goods mover registration with the Department of Labor, Division of Occupational and Professional Licensing. Match the legal name on the estimate to Maryland registration before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Harford access zones",
  zonesIntro: "Plan by Bel Air core, Aberdeen/APG corridors, Edgewood/south I-95, and north/rural edges.",
  zones: [
    {
      id: "bel-air",
      name: "Bel Air core & suburban belt",
      shortName: "Bel Air",
      neighborhoods: ["Bel Air","Forest Hill edges","Fallston edges","MD-24 corridors"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["MD-24 congestion","HOA rules","Longer portal time to Baltimore"],
      moverTips: "Collect HOA packets. Price MD-24 pairs portal-to-portal.",
      cityKeywords: ["bel air","forest hill","fallston"],
    },
    {
      id: "aberdeen-apg",
      name: "Aberdeen, APG adjacency & north-east corridors",
      shortName: "Aberdeen / APG",
      neighborhoods: ["Aberdeen","Havre de Grace edges","APG-adjacent housing","MD-22 corridors"],
      housingTypes: "Multi-family, SFH, military-adjacent stock",
      challenges: ["PCS hard dates","I-95 timing","Mixed access types"],
      moverTips: "Align with report dates when possible. Survey multi-unit access carefully.",
      cityKeywords: ["aberdeen","havre de grace"],
    },
    {
      id: "edgewood-south",
      name: "Edgewood, Joppatowne & south I-95",
      shortName: "Edgewood / south",
      neighborhoods: ["Edgewood","Joppatowne","Abingdon edges","I-95 corridors"],
      housingTypes: "Multi-family, SFH, mixed stock",
      challenges: ["I-95 congestion","Lease-end waves","Industrial adjacency"],
      moverTips: "Book elevators early for month-end. Price south pairs portal-to-portal.",
      cityKeywords: ["edgewood","joppatowne","abingdon"],
    },
    {
      id: "north-rural",
      name: "Jarrettsville, north rural & US-1 edges",
      shortName: "North rural",
      neighborhoods: ["Jarrettsville","Whiteford edges","US-1 corridors","rural roads"],
      housingTypes: "SFH, rural stock, limited multi-family",
      challenges: ["Longer empty miles","Rural access","Winter ice"],
      moverTips: "Price rural pairs honestly. Photo driveway and turn radius.",
      cityKeywords: ["jarrettsville","whiteford"],
    }
  ],
  costDrivers: {
    title: "What drives Harford County moving costs",
    intro: "I-95 empty miles, HOA friction, and multi-unit access drive quotes more than bedroom count alone.",
    drivers: [
      { title: "I-95 / MD-24 empty miles", detail: "Portal-to-portal spikes toward Baltimore." },
      { title: "HOA soft costs in Bel Air", detail: "Gate lists push peak windows." },
      { title: "APG/PCS hard-date premiums", detail: "Short windows raise weekend demand." },
      { title: "Multi-unit access friction", detail: "Edgewood elevators rewrite labor hours." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$420–$1,400+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,300–$3,700+", note: "HOA friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,300–$7,200+", note: "Baltimore pairs highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Harford County",
    intro: "PCS seasons, family peaks, and winter ice reshape northeast-fringe windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-95 pain." },
      { title: "PCS peak: late spring–summer", detail: "Book Aberdeen-adjacent jobs early." },
      { title: "Peak family season: late May–mid-August", detail: "Book Bel Air Saturdays early." },
      { title: "Winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "harford-bel-air-aberdeen-fringe",
      title: "Bel Air / Aberdeen northeast fringe module",
      intro: "Harford estimates fail when I-95 empty miles or APG calendars are treated like Baltimore City or Towson defaults.",
      bullets: ["Price I-95/MD-24 pairs portal-to-portal toward Baltimore.","Align APG-adjacent jobs with report dates when possible.","Collect Bel Air HOA packets early.","Do not treat Harford as a Baltimore County Towson clone.","Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Harford County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Harford County Public Schools serves most addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "HCPS tools and Maryland State Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "University of Maryland Upper Chesapeake Health and other systems serve northeast corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Aberdeen and Bel Air into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Bel Air HOA vs Aberdeen multi-unit vs rural north", detail: "Submarkets differ sharply within short distances." },
          { title: "Cost variation", detail: "Suburban premium stock often prices differently from south I-95 multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Bel Air suburban lifestyle", detail: "HOA product with MD-24 logistics." },
          { title: "Aberdeen / APG pattern", detail: "Military-adjacent multi-unit and SFH mix." },
          { title: "North rural pattern", detail: "Longer empty miles and driveway access." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "APG/DoD adjacency, healthcare, logistics, and Baltimore-commute professional jobs shape employment." },
          { title: "Commute realism", detail: "I-95 peaks toward Baltimore are first-class planning factors." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Northeast fringe identity", detail: "Harford is metro fringe — not Baltimore City row-homes or DC-collar density as the default." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Harford County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Maryland household goods mover registration for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Harford County — official site", href: "https://www.harfordcountymd.gov/", external: true },
      { label: "MDOT CHART traffic", href: "https://chart.maryland.gov/", external: true }
    ],
  },
  directoryHint: "Prefer fringe HOA and APG-window experience with honest I-95 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
