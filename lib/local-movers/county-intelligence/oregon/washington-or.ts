import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOrPack } from '@/lib/local-movers/county-intelligence/oregon/or-shared';

export const washingtonCountyOrIntelligence: CountyIntelligencePack = finalizeOrPack({
  countySlug: "washington",
  hubTitle: "Washington County Moving Intelligence Hub",
  eyebrow: "Washington · Beaverton/Hillsboro Silicon Forest & US-26/OR-217",
  h1: "Moving in Washington County: Beaverton–Hillsboro Tech Corridor, West-Metro HOAs & US-26 Logistics",
  heroOpener: "Washington County is Portland’s west-metro tech collar: Beaverton and Hillsboro campus housing, Tigard/Tualatin HOA growth, US-26 and OR-217 portal time, and Silicon Forest relo calendars that are not Multnomah hills/stairs and not Clackamas SE-metro product. A Hillsboro multi-family unit, a Beaverton HOA two-story, and a Forest Grove edge home do not share truck access or empty-mile risk. This hub is for Oregon’s Washington County — not Washington State King County and not urban Portland.",
  heroCredibility:
    'ODOT household goods certificate (ORS 825) for intrastate OR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-5 · US-26 · OR-217 · OR-8 · TV Highway corridors",
  whatMakesDifferent: {
    title: "What makes moving in Washington County different",
    intro: "These are west-metro / Silicon Forest realities — HOA growth, tech hard dates, and US-26 logistics — not Portland core elevators or eastside bungalows.",
    bullets: [
      {
        title: "Silicon Forest corporate calendars create hard report dates",
        detail: "Tech and supplier transfers compress windows more than pure city lease waves.",
      },
      {
        title: "Beaverton / Hillsboro multi-family and HOA product dominate many jobs",
        detail: "Gate lists and elevator packets rewrite labor hours.",
      },
      {
        title: "US-26 / OR-217 / TV Highway define portal-to-portal time",
        detail: "West-metro pairs look short on maps and regional at peak.",
      },
      {
        title: "Not Multnomah hillside stairs as the default product",
        detail: "West-metro grids differ from SW Portland hills and downtown elevators.",
      },
      {
        title: "Do not confuse with Washington State markets",
        detail: "This is Oregon’s Washington County (Beaverton/Hillsboro) — not King or Clark County WA as the page identity.",
      },
      {
        title: "Intrastate ODOT household goods certificate vs interstate FMCSA",
        detail: "Moves entirely within Oregon by for-hire household goods carriers generally require a certificate of authority from the Oregon Department of Transportation (ODOT), administered through the Commerce and Compliance Division under ORS 825. Match the legal name on the estimate to Oregon household goods authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Washington County access zones",
  zonesIntro: "Plan by Beaverton core, Hillsboro tech corridors, Tigard/Tualatin south edges, and western township growth.",
  zones: [
    {
      id: "beaverton",
      name: "Beaverton core & multi-family belt",
      shortName: "Beaverton",
      neighborhoods: ["Beaverton","Cedar Hills edges","Aloha edges","TV Highway corridors"],
      housingTypes: "Multi-family, SFH, HOA pockets",
      challenges: ["OR-217 congestion","Elevator reservations","Lease-end waves"],
      moverTips: "Book elevators early for month-end. Avoid peak OR-217 when flexible.",
      cityKeywords: ["beaverton","aloha","cedar hills"],
    },
    {
      id: "hillsboro-tech",
      name: "Hillsboro & Silicon Forest campuses",
      shortName: "Hillsboro",
      neighborhoods: ["Hillsboro","Orenco edges","North Plains edges","US-26 west corridors"],
      housingTypes: "Multi-family, HOA SFH, campus-adjacent housing",
      challenges: ["Corporate hard dates","US-26 congestion","HOA rules"],
      moverTips: "Align crew days with report dates. Collect HOA and building packets early.",
      cityKeywords: ["hillsboro","orenco"],
    },
    {
      id: "tigard-tualatin",
      name: "Tigard, Tualatin & south-west metro edges",
      shortName: "Tigard / Tualatin",
      neighborhoods: ["Tigard","Tualatin","King City edges","Durham edges"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["I-5 / OR-217 timing","HOA rules","Longer portal time to Hillsboro"],
      moverTips: "Price south-west pairs portal-to-portal. Collect gate lists.",
      cityKeywords: ["tigard","tualatin"],
    },
    {
      id: "west-growth",
      name: "Forest Grove, Cornelius & western growth edges",
      shortName: "West growth",
      neighborhoods: ["Forest Grove","Cornelius","North Plains edges","Banks edges"],
      housingTypes: "SFH, multi-family, small-town stock",
      challenges: ["Longer empty miles","OR-8 timing","Rain access"],
      moverTips: "Price western pairs honestly. Photo driveway and street width.",
      cityKeywords: ["forest grove","cornelius","north plains"],
    }
  ],
  costDrivers: {
    title: "What drives Washington County moving costs",
    intro: "HOA/elevator friction and US-26/OR-217 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "HOA gate lists & elevator packets", detail: "Soft costs push peak windows." },
      { title: "US-26 / OR-217 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Corporate hard-date premiums", detail: "Short windows raise weekend demand." },
      { title: "Rain staging soft costs", detail: "Wet-weather packing adds labor." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$520–$1,600+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,500–$4,200+", note: "HOA friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,800–$8,500+", note: "Long US-26 pairs highest" },
      { label: "Typical 2-person crew rate", value: "$115–$195+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Washington County",
    intro: "Tech calendars, school-year suburb demand, rainy winters, and summer peak reshape west-metro windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce US-26/OR-217 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book HOA Saturdays early." },
      { title: "Corporate Q-end transfers", detail: "Hard dates cluster around fiscal calendars." },
      { title: "Rainy winter staging", detail: "Confirm floor protection and driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "washington-or-silicon-forest-hoa",
      title: "Silicon Forest west-metro & HOA module",
      intro: "Washington County (OR) estimates fail when HOA packets, tech hard dates, or US-26 empty miles are treated like Portland hills jobs.",
      bullets: ["Collect HOA and elevator packets before final quotes on Beaverton/Hillsboro stock.","Price US-26/OR-217 pairs portal-to-portal.","Separate corporate inventory scopes from standard suburban SFH.","Clarify Oregon Washington County vs Multnomah/Clackamas destinations — and never assume Washington State logistics.","Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Washington County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Beaverton, Hillsboro, Tigard-Tualatin, Forest Grove, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Oregon Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Providence St. Vincent, Kaiser west-metro sites, OHSU affiliates, and other systems serve west-metro corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Hillsboro and Forest Grove into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Tech multi-family vs HOA SFH growth", detail: "Orenco/Hillsboro product differs from Tigard/Tualatin two-stories." },
          { title: "Cost variation", detail: "West-metro premium suburbs often price differently from far-west small-town stock." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Hillsboro / tech-corridor lifestyle", detail: "Campus adjacency with multi-family tradeoffs." },
          { title: "Beaverton pattern", detail: "Mixed multi-unit and HOA product with OR-217 logistics." },
          { title: "Tigard / Tualatin pattern", detail: "South-west HOA growth with I-5 timing." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Semiconductor and tech campuses, suppliers, healthcare, and professional services shape west-metro employment." },
          { title: "Commute realism", detail: "US-26, OR-217, and TV Highway peaks are real. Test drive peak routes before choosing a submarket." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "West-metro identity", detail: "Oregon’s Washington County is Silicon Forest collar — not Multnomah hills and not Washington State Puget Sound defaults." },
          { title: "Climate", detail: "Wet winters and mild-to-hot summers. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Washington County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ODOT household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Washington County, OR — official site", href: "https://www.washingtoncountyor.gov/", external: true },
      { label: "TripCheck traffic (ODOT)", href: "https://www.tripcheck.com/", external: true }
    ],
  },
  directoryHint: "Prefer HOA/tech-corridor experience and honest US-26 pricing. Verify ODOT in-state and FMCSA interstate. This is Oregon Washington County — not WA state.",
  lastReviewed: '2026-07-24',
});
