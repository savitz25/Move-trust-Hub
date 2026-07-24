import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOrPack } from '@/lib/local-movers/county-intelligence/oregon/or-shared';

export const laneCountyOrIntelligence: CountyIntelligencePack = finalizeOrPack({
  countySlug: "lane",
  hubTitle: "Lane County Moving Intelligence Hub",
  eyebrow: "Lane · Eugene/Springfield, UO cycles & I-5 valley logistics",
  h1: "Moving in Lane County: Eugene–Springfield Access, University Cycles & I-5 Valley Logistics",
  heroOpener: "Lane County is Willamette Valley university metro, not Portland spillover: Eugene downtown and campus multi-unit, Springfield stock, UO lease waves, and I-5/OR-126 portal time that is not Salem capital patterns and not Bend high-desert product. A campus multi-family turn, a south Eugene HOA two-story, and a Springfield multi-unit do not share truck access or empty-mile risk. This hub is for Lane — not a Multnomah clone or mid-valley Linn rename.",
  heroCredibility:
    'ODOT household goods certificate (ORS 825) for intrastate OR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-5 · OR-126 · OR-99 · Belt Line corridors",
  whatMakesDifferent: {
    title: "What makes moving in Lane County different",
    intro: "These are Eugene/Springfield valley realities — university calendars, valley rain, and I-5 logistics — not Portland hills or central Oregon desert defaults.",
    bullets: [
      {
        title: "University of Oregon lease cycles cluster crews",
        detail: "August/September and academic turns fill elevators and street parking first.",
      },
      {
        title: "Eugene core multi-unit differs from south/west HOA product",
        detail: "Campus access rules and suburban gate lists are not interchangeable.",
      },
      {
        title: "I-5 / Belt Line / OR-126 define portal-to-portal time",
        detail: "Valley pairs look local on maps and regional at peak.",
      },
      {
        title: "Not Portland metro logistics and not Salem capital defaults",
        detail: "Treat Lane as its own valley hub with distinct inventory patterns.",
      },
      {
        title: "Rain windows and occasional wildfire smoke reshape staging",
        detail: "Confirm contingency for outdoor packing days.",
      },
      {
        title: "Intrastate ODOT household goods certificate vs interstate FMCSA",
        detail: "Moves entirely within Oregon by for-hire household goods carriers generally require a certificate of authority from the Oregon Department of Transportation (ODOT), administered through the Commerce and Compliance Division under ORS 825. Match the legal name on the estimate to Oregon household goods authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Lane access zones",
  zonesIntro: "Plan by downtown Eugene/campus, south/west Eugene suburbs, Springfield, and rural valley edges.",
  zones: [
    {
      id: "eugene-campus",
      name: "Downtown Eugene & UO multi-family",
      shortName: "Eugene / UO",
      neighborhoods: ["Downtown Eugene","University district","Whitaker edges","South University edges"],
      housingTypes: "Student multi-family, mid-rises, older SFH",
      challenges: ["Lease-end waves","Scarce curb staging","Elevators and stairs"],
      moverTips: "Book academic peaks early. Confirm elevator reservations and truck length.",
      cityKeywords: ["eugene","university of oregon","uo"],
    },
    {
      id: "south-west-eugene",
      name: "South/west Eugene suburbs",
      shortName: "South/west Eugene",
      neighborhoods: ["South Eugene","West Eugene edges","Santa Clara edges","River Road edges"],
      housingTypes: "HOA SFH, multi-family, ranch stock",
      challenges: ["Belt Line congestion","HOA rules","Longer portal time to campus"],
      moverTips: "Collect HOA packets. Price Belt Line pairs portal-to-portal.",
      cityKeywords: ["south eugene","santa clara"],
    },
    {
      id: "springfield",
      name: "Springfield city & east-valley stock",
      shortName: "Springfield",
      neighborhoods: ["Springfield","Gateway edges","Thurston edges","Mohawk edges"],
      housingTypes: "SFH, multi-family, older stock",
      challenges: ["I-5 / OR-126 timing","Mixed stairs and elevators","Rain access"],
      moverTips: "Clarify Eugene vs Springfield destinations. Survey older stock carefully.",
      cityKeywords: ["springfield"],
    },
    {
      id: "lane-edges",
      name: "Cottage Grove, Florence approaches & rural edges",
      shortName: "Outer Lane",
      neighborhoods: ["Cottage Grove","Junction City edges","Veneta edges","coastal approaches"],
      housingTypes: "SFH, rural stock, limited multi-family",
      challenges: ["Longer empty miles","OR-126 / I-5 timing","Rural access"],
      moverTips: "Price outer pairs honestly. Photo driveway and turn radius.",
      cityKeywords: ["cottage grove","junction city","veneta"],
    }
  ],
  costDrivers: {
    title: "What drives Lane County moving costs",
    intro: "Campus multi-unit access and I-5/Belt Line portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Campus multi-unit & curb friction", detail: "Academic peaks spike labor hours." },
      { title: "I-5 / Belt Line / OR-126 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on south/west edges", detail: "Gate lists push peak windows." },
      { title: "Rain staging soft costs", detail: "Wet-weather packing adds labor." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,450+", note: "Higher near campus elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,350–$3,800+", note: "Campus friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,400–$7,200+", note: "Portland pairs and peaks highest" },
      { label: "Typical 2-person crew rate", value: "$105–$180+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Lane County",
    intro: "University calendars dominate more than pure suburban peaks — plan August carefully; rain and smoke still matter.",
    items: [
      { title: "Best windows: mid-week outside academic peaks", detail: "Clear curb near UO and downtown." },
      { title: "Academic peaks: late August–September", detail: "Book multi-unit far ahead." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Wildfire-smoke contingency", detail: "Confirm outdoor staging flexibility on smoke days." }
    ],
  },
  specialized: [
    {
      id: "eugene-lane-uo-valley",
      title: "Eugene UO & Willamette Valley module",
      intro: "Lane estimates fail when academic lease waves, campus curb limits, or I-5 empty miles are treated like Portland collar defaults.",
      bullets: ["Align multi-unit moves with UO calendars when possible.","Request elevator packets early near campus.","Price I-5/Belt Line/OR-126 pairs portal-to-portal toward Portland or southern OR.","Do not treat Lane as a Multnomah or Marion clone.","Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Lane County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Eugene 4J, Springfield, Bethel, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Oregon Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "PeaceHealth Sacred Heart, McKenzie-Willamette, and other systems serve valley corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Springfield and south Eugene into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Campus multi-unit vs south Eugene HOA stock", detail: "Near-UO product differs sharply from suburban two-stories." },
          { title: "Cost variation", detail: "Campus-adjacent renovated stock often prices differently from outer-valley SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Eugene campus lifestyle", detail: "Walkable university amenities with curb tradeoffs." },
          { title: "South/west suburban pattern", detail: "HOA product with Belt Line logistics." },
          { title: "Springfield pattern", detail: "Mixed stock with I-5/OR-126 timing." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "University of Oregon, healthcare, education, timber/manufacturing adjacency, and professional services shape employment." },
          { title: "Commute realism", detail: "I-5 and Belt Line peaks are real. Test drive peak routes before choosing a submarket." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Valley university identity", detail: "Lane is Eugene metro — not Portland collar product or Bend high-desert lifestyle as the default." },
          { title: "Climate", detail: "Wet winters, warm summers, and occasional wildfire smoke. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Lane County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ODOT household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Lane County — official site", href: "https://www.lanecounty.org/", external: true },
      { label: "City of Eugene", href: "https://www.eugene-or.gov/", external: true },
      { label: "TripCheck traffic (ODOT)", href: "https://www.tripcheck.com/", external: true }
    ],
  },
  directoryHint: "Prefer campus multi-unit experience and honest I-5 pricing. Verify ODOT in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
