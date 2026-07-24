import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMdPack } from '@/lib/local-movers/county-intelligence/maryland/md-shared';

export const baltimoreCountyMdIntelligence: CountyIntelligencePack = finalizeMdPack({
  countySlug: "baltimore",
  hubTitle: "Baltimore County Moving Intelligence Hub",
  eyebrow: "Baltimore County · Towson/Owings Mills/White Marsh metro ring & I-695",
  h1: "Moving in Baltimore County: Towson–Owings Mills Ring, Metro Suburbs & I-695 Logistics",
  heroOpener: "Baltimore County is the metro ring around the city — not the city core: Towson multi-unit and campus edges, Owings Mills HOA growth, White Marsh corridors, and I-695/I-83/I-95 portal time that is not Baltimore City row-home logistics and not DC-suburb Montgomery product. A Towson condo, an Owings Mills two-story, and a Catonsville multi-family unit do not share truck access or empty-mile risk. This hub is for Baltimore County — not Baltimore City and not a renamed Howard page.",
  heroCredibility:
    'Maryland household goods mover registration (Dept. of Labor) for intrastate MD moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-695 · I-83 · I-95 · MD-45 · York Road corridors",
  whatMakesDifferent: {
    title: "What makes moving in Baltimore County different",
    intro: "These are metro-ring realities — suburban HOAs, Towson density, and Beltway timing — not city row-homes or Annapolis capital product.",
    bullets: [
      {
        title: "Towson multi-unit and campus-adjacent stock rewrite access plans",
        detail: "Elevators and curb limits dominate near core Towson jobs.",
      },
      {
        title: "Owings Mills / White Marsh HOA product is not city row-home product",
        detail: "Gate lists and longer empty miles rewrite quotes.",
      },
      {
        title: "I-695 defines cross-county portal-to-portal time",
        detail: "Ring pairs look local on maps and regional at peak.",
      },
      {
        title: "Not Baltimore City narrow-street logistics as the default",
        detail: "County suburban stock differs sharply from city micro-markets.",
      },
      {
        title: "Not DC-collar Montgomery patterns either",
        detail: "Baltimore metro ring has its own inventory and congestion profile.",
      },
      {
        title: "Intrastate Maryland HHG registration vs interstate FMCSA",
        detail: "Moves entirely within Maryland by household goods carriers using commercial motor vehicles generally require active Maryland household goods mover registration with the Department of Labor, Division of Occupational and Professional Licensing. Match the legal name on the estimate to Maryland registration before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Baltimore County access zones",
  zonesIntro: "Plan by Towson core, Owings Mills west, White Marsh/east, and Catonsville/southwest edges.",
  zones: [
    {
      id: "towson",
      name: "Towson core & multi-unit belt",
      shortName: "Towson",
      neighborhoods: ["Towson","Loch Raven edges","Rodgers Forge edges","York Road corridors"],
      housingTypes: "Multi-family, mid-rises, older SFH",
      challenges: ["Elevator reservations","York Road congestion","Campus/office peaks"],
      moverTips: "Book elevators early. Prefer mid-week mornings off York Road peak.",
      cityKeywords: ["towson"],
    },
    {
      id: "owings-mills",
      name: "Owings Mills, Reisterstown & northwest growth",
      shortName: "Owings Mills",
      neighborhoods: ["Owings Mills","Reisterstown","Pikesville edges","I-795 corridors"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["I-695 / I-795 congestion","HOA rules","Longer portal time to Towson"],
      moverTips: "Collect HOA packets. Price northwest pairs portal-to-portal.",
      cityKeywords: ["owings mills","reisterstown","pikesville"],
    },
    {
      id: "white-marsh",
      name: "White Marsh, Perry Hall & east corridors",
      shortName: "White Marsh / east",
      neighborhoods: ["White Marsh","Perry Hall","Middle River edges","I-95 corridors"],
      housingTypes: "HOA SFH, multi-family",
      challenges: ["I-95 congestion","HOA rules","Industrial adjacency pockets"],
      moverTips: "Price east pairs honestly. Survey multi-unit access type.",
      cityKeywords: ["white marsh","perry hall"],
    },
    {
      id: "catonsville-sw",
      name: "Catonsville, Arbutus & southwest edges",
      shortName: "Catonsville / SW",
      neighborhoods: ["Catonsville","Arbutus","Lansdowne edges","Security Blvd corridors"],
      housingTypes: "Older SFH, multi-family, mixed stock",
      challenges: ["I-695 timing","Stairs and basements","Mixed curb limits"],
      moverTips: "Survey older stock carefully. Clarify county vs city destinations.",
      cityKeywords: ["catonsville","arbutus"],
    }
  ],
  costDrivers: {
    title: "What drives Baltimore County moving costs",
    intro: "Multi-unit access and I-695 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Towson multi-unit friction", detail: "Elevator labor hours spike." },
      { title: "I-695 / I-83 / I-95 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on growth edges", detail: "Gate lists push peak windows." },
      { title: "Older southwest stock long carries", detail: "Stairs and basements raise labor hours." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$480–$1,550+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,450–$4,100+", note: "Multi-unit friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,600–$8,000+", note: "Long Beltway pairs highest" },
      { label: "Typical 2-person crew rate", value: "$110–$190+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Baltimore County",
    intro: "School calendars, multi-family turns, summer peak, and winter ice reshape metro-ring windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-695 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book HOA Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Towson elevators fill first." },
      { title: "Winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "baltimore-county-towson-ring",
      title: "Towson metro-ring & I-695 module",
      intro: "Baltimore County estimates fail when multi-unit access or Beltway empty miles are treated like city row-home jobs.",
      bullets: ["Survey Towson elevators and curb carefully.","Price I-695 pairs portal-to-portal.","Do not quote county jobs as city row-home defaults.","Clarify Baltimore County vs Baltimore City destinations on multi-county estimates.","Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Baltimore County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Baltimore County Public Schools serves county addresses (not Baltimore City schools). Confirm zoning carefully." },
          { title: "Research sources", detail: "BCPS tools and Maryland State Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "GBMC, University of Maryland St. Joseph, MedStar Franklin Square, and other systems serve the ring. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Owings Mills and White Marsh into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Towson multi-unit vs HOA growth stock", detail: "Core product differs from Owings Mills/White Marsh two-stories." },
          { title: "Cost variation", detail: "Near-Towson renovated stock often prices differently from far-ring multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Towson lifestyle", detail: "Multi-unit density with York Road logistics." },
          { title: "Owings Mills northwest pattern", detail: "HOA product with I-795 timing." },
          { title: "White Marsh east pattern", detail: "Growth suburbs with I-95 logistics." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Healthcare, education, retail/logistics, and Baltimore-city-commute professional jobs shape employment." },
          { title: "Commute realism", detail: "I-695 peaks are real. Test drive peak routes around the ring." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Metro-ring identity", detail: "Baltimore County is suburban ring — not Baltimore City row-homes or DC-collar product as the default." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Baltimore County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Maryland household goods mover registration for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Baltimore County — official site", href: "https://www.baltimorecountymd.gov/", external: true },
      { label: "MDOT CHART traffic", href: "https://chart.maryland.gov/", external: true }
    ],
  },
  directoryHint: "Prefer metro-ring multi-unit experience and honest I-695 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
