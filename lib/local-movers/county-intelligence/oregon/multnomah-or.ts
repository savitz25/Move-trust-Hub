import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOrPack } from '@/lib/local-movers/county-intelligence/oregon/or-shared';

export const multnomahCountyOrIntelligence: CountyIntelligencePack = finalizeOrPack({
  countySlug: "multnomah",
  hubTitle: "Multnomah County Moving Intelligence Hub",
  eyebrow: "Multnomah · Portland neighborhoods, hills/stairs & I-5/I-84 bridges",
  h1: "Moving in Multnomah County: Portland Neighborhoods, Hills & Bridge Logistics",
  heroOpener: "Multnomah County is Portland’s urban core: westside hills and stairs, eastside neighborhood grids, downtown elevators, bridge and I-5/I-84 congestion, and rain-window curb limits that are not Beaverton HOA product and not Bend high-desert logistics. A Pearl District condo, a SE Portland bungalow, a SW hillside stairs job, and a Gresham multi-family unit do not share truck access or empty-mile risk. This hub is for Multnomah — not a Washington County clone or renamed King County page.",
  heroCredibility:
    'ODOT household goods certificate (ORS 825) for intrastate OR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-5 · I-84 · I-205 · US-26 · local arterial grid",
  whatMakesDifferent: {
    title: "What makes moving in Multnomah County different",
    intro: "These are Portland/Multnomah realities — hills, bridges, neighborhood micro-markets, and rain staging — not west-metro tech collars or central Oregon desert product.",
    bullets: [
      {
        title: "Westside hills and stairs rewrite labor hours",
        detail: "SW and NW hillside addresses often need smaller trucks, long carries, and photo surveys.",
      },
      {
        title: "Eastside neighborhood grids differ from downtown elevators",
        detail: "SE/NE bungalows and multi-unit mix change curb length and parking rules block by block.",
      },
      {
        title: "Bridges and I-5 / I-84 define portal-to-portal time",
        detail: "Cross-river pairs look local on maps and regional at peak or during incidents.",
      },
      {
        title: "Rain windows and limited curb staging dominate many jobs",
        detail: "Protect floors and furniture; confirm legal truck length early.",
      },
      {
        title: "Not Washington County HOA product and not Clackamas south-metro sprawl",
        detail: "Survey each Multnomah address — eastside vs westside vs Gresham edges differ.",
      },
      {
        title: "Intrastate ODOT household goods certificate vs interstate FMCSA",
        detail: "Moves entirely within Oregon by for-hire household goods carriers generally require a certificate of authority from the Oregon Department of Transportation (ODOT), administered through the Commerce and Compliance Division under ORS 825. Match the legal name on the estimate to Oregon household goods authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Multnomah access zones",
  zonesIntro: "Plan by downtown/Pearl, westside hills, eastside neighborhoods, and east county (Gresham/Troutdale) edges.",
  zones: [
    {
      id: "downtown-pearl",
      name: "Downtown, Pearl & inner NW",
      shortName: "Downtown / Pearl",
      neighborhoods: ["Downtown Portland","Pearl District","Goose Hollow edges","Old Town edges"],
      housingTypes: "High-rises, mid-rises, condos, loft stock",
      challenges: ["Elevators and COI","Scarce curb staging","Event-day congestion"],
      moverTips: "Get building packets early. Prefer mid-week morning freight windows.",
      cityKeywords: ["portland","pearl","downtown"],
    },
    {
      id: "westside-hills",
      name: "Westside hills (SW / NW)",
      shortName: "Westside hills",
      neighborhoods: ["Southwest hills","Council Crest edges","NW hills","Sylvan edges"],
      housingTypes: "Hillside SFH, multi-level, limited multi-family",
      challenges: ["Steep driveways","Stairs and long carries","Limited truck turn radius"],
      moverTips: "Photo grades and street width. Prefer smaller trucks when required.",
      cityKeywords: ["southwest hills","northwest portland","sylvan"],
    },
    {
      id: "eastside",
      name: "Inner eastside (SE / NE)",
      shortName: "Eastside",
      neighborhoods: ["SE Division corridors","Alberta edges","Hawthorne edges","Sellwood edges","St. Johns edges"],
      housingTypes: "Bungalows, multi-unit, ADUs, renovated SFH",
      challenges: ["Curb parking limits","Stairs and basements","I-84 / arterial congestion"],
      moverTips: "Confirm permit and parking rules. Survey basement access carefully.",
      cityKeywords: ["southeast portland","northeast portland","sellwood","st johns"],
    },
    {
      id: "east-county",
      name: "East county (Gresham / Troutdale edges)",
      shortName: "East county",
      neighborhoods: ["Gresham","Troutdale edges","Fairview edges","Rockwood edges"],
      housingTypes: "SFH, multi-family, suburban stock",
      challenges: ["I-84 / I-205 timing","Longer portal time to core","HOA pockets"],
      moverTips: "Price east-county pairs portal-to-portal. Collect HOA packets when applicable.",
      cityKeywords: ["gresham","troutdale","fairview"],
    }
  ],
  costDrivers: {
    title: "What drives Multnomah County moving costs",
    intro: "Hills/stairs, elevators, and bridge/I-5 portal time drive quotes more than square footage alone.",
    drivers: [
      { title: "Hillside stairs & long carries", detail: "Westside labor hours spike." },
      { title: "Downtown elevator & curb friction", detail: "COI wait time dominates core jobs." },
      { title: "I-5 / I-84 / bridge congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Rain staging & protection soft costs", detail: "Wet-weather packing adds labor." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$550–$1,700+", note: "Higher with elevators or hills" },
      { label: "2–3BR condo or modest SFH", value: "$1,600–$4,500+", note: "Hills and curb friction trend up" },
      { label: "3–4+ BR / tower / cross-metro", value: "$3,000–$9,000+", note: "Towers and long bridge pairs highest" },
      { label: "Typical 2-person crew rate", value: "$120–$200+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Multnomah County",
    intro: "Rainy winters, summer peak, wildfire-smoke days, and multi-family lease turns reshape Portland windows.",
    items: [
      { title: "Best windows: mid-week dry mornings", detail: "Clear curb and reduce bridge congestion." },
      { title: "Peak family season: late May–mid-August", detail: "Book eastside Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Downtown and eastside elevators fill first." },
      { title: "Wildfire-smoke and extreme heat days", detail: "Confirm contingency for outdoor staging." }
    ],
  },
  specialized: [
    {
      id: "portland-multnomah-hills-bridges",
      title: "Portland hills, elevators & bridge logistics module",
      intro: "Multnomah estimates fail when hillside access, building packets, or I-5/bridge empty miles are ignored.",
      bullets: ["Request downtown/Pearl building packets at lease signing or escrow.","Photo hillside grades, stair width, and truck turn radius for SW/NW jobs.","Price I-5/I-84/bridge pairs portal-to-portal — eastside vs westside differ.","Clarify Multnomah vs Washington/Clackamas destinations on multi-county estimates.","Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Multnomah County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Portland Public Schools and east-county districts (Gresham-Barlow and others) serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Oregon Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "OHSU, Legacy, Providence, and Kaiser sites serve Multnomah corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from east county into core specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Core condo/multi-unit vs eastside bungalows vs east-county SFH", detail: "Pearl product differs sharply from SE bungalows and Gresham multi-family." },
          { title: "Cost variation", detail: "Inner neighborhoods often price differently from east-county growth stock." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Downtown / Pearl lifestyle", detail: "Walkable amenities with elevator and curb tradeoffs." },
          { title: "Eastside neighborhood pattern", detail: "Bungalow density with arterial logistics." },
          { title: "East-county pattern", detail: "Suburban product with longer portal time to core jobs." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, tech/professional services, logistics, government, and creative industries shape employment." },
          { title: "Commute realism", detail: "I-5, I-84, and bridge peaks are real. Test drive peak routes across the river." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Portland core identity", detail: "Multnomah is Portland metro core — not west-metro Silicon Forest HOAs or Bend high-desert product as the default." },
          { title: "Climate", detail: "Wet winters, mild-to-hot summers, and occasional wildfire smoke. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Multnomah County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ODOT household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Multnomah County — official site", href: "https://www.multco.us/", external: true },
      { label: "City of Portland", href: "https://www.portland.gov/", external: true },
      { label: "TripCheck traffic (ODOT)", href: "https://www.tripcheck.com/", external: true }
    ],
  },
  directoryHint: "Prefer hillside/elevator experience and honest bridge/I-5 pricing. Verify ODOT in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
