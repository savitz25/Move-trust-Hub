import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOrPack } from '@/lib/local-movers/county-intelligence/oregon/or-shared';

export const marionCountyOrIntelligence: CountyIntelligencePack = finalizeOrPack({
  countySlug: "marion",
  hubTitle: "Marion County Moving Intelligence Hub",
  eyebrow: "Marion · Salem capital, mid-valley & I-5/OR-22 logistics",
  h1: "Moving in Marion County: Salem Capital Access, Mid-Valley Patterns & I-5/OR-22 Logistics",
  heroOpener: "Marion County is capital and mid-valley logistics: downtown Salem multi-unit, state-government calendars, Keizer and South Salem suburbs, and I-5/OR-22 portal time that is not Eugene campus waves and not Portland collar HOAs. A capitol-adjacent condo, a South Salem two-story, and a Woodburn multi-family unit do not share truck access or empty-mile risk. This hub is for Marion — not a Lane clone or Multnomah rename.",
  heroCredibility:
    'ODOT household goods certificate (ORS 825) for intrastate OR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-5 · OR-22 · OR-99E · Capitol corridors",
  whatMakesDifferent: {
    title: "What makes moving in Marion County different",
    intro: "These are Salem capital / mid-valley realities — government calendars, valley rain, and I-5 logistics — not UO lease waves or Portland hills.",
    bullets: [
      {
        title: "State government relo calendars create hard dates",
        detail: "Session timing and agency transfers can compress windows.",
      },
      {
        title: "Downtown Salem multi-unit differs from South Salem / Keizer SFH",
        detail: "Elevators and curb limits rewrite core labor hours.",
      },
      {
        title: "I-5 / OR-22 / OR-99E define portal-to-portal time",
        detail: "Pairs toward Portland or Eugene look regional at peak.",
      },
      {
        title: "Not Eugene university product and not Portland SE-metro",
        detail: "Treat Marion as capital mid-valley with its own inventory patterns.",
      },
      {
        title: "Agricultural and logistics corridors still matter",
        detail: "Truck traffic near I-5 and valley arterials can reshape crew timing.",
      },
      {
        title: "Intrastate ODOT household goods certificate vs interstate FMCSA",
        detail: "Moves entirely within Oregon by for-hire household goods carriers generally require a certificate of authority from the Oregon Department of Transportation (ODOT), administered through the Commerce and Compliance Division under ORS 825. Match the legal name on the estimate to Oregon household goods authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Marion access zones",
  zonesIntro: "Plan by downtown Salem, South Salem suburbs, Keizer north, and Woodburn/east-valley edges.",
  zones: [
    {
      id: "salem-core",
      name: "Downtown Salem & capitol corridors",
      shortName: "Downtown Salem",
      neighborhoods: ["Downtown Salem","Capitol area","North Salem edges","West Salem edges"],
      housingTypes: "Multi-unit, mid-rises, renovated stock",
      challenges: ["Elevators and COI","Scarce curb staging","Government event traffic"],
      moverTips: "Get building packets early. Prefer mid-week mornings away from major capitol events.",
      cityKeywords: ["salem","downtown salem","capitol"],
    },
    {
      id: "south-salem",
      name: "South Salem suburban belt",
      shortName: "South Salem",
      neighborhoods: ["South Salem","Liberty corridors","Kuebler edges"],
      housingTypes: "SFH, multi-family, HOA pockets",
      challenges: ["HOA rules","I-5 timing","Longer portal time to core"],
      moverTips: "Collect HOA packets. Price south pairs portal-to-portal.",
      cityKeywords: ["south salem"],
    },
    {
      id: "keizer",
      name: "Keizer & north mid-valley",
      shortName: "Keizer",
      neighborhoods: ["Keizer","Clear Lake edges","north river corridors"],
      housingTypes: "SFH, multi-family",
      challenges: ["OR-99E congestion","Rain access","Empty miles to south jobs"],
      moverTips: "Clarify Keizer vs Salem destinations. Survey multi-unit access type.",
      cityKeywords: ["keizer"],
    },
    {
      id: "woodburn-east",
      name: "Woodburn, Silverton edges & east valley",
      shortName: "Woodburn / east",
      neighborhoods: ["Woodburn","Silverton edges","Stayton edges","Aumsville edges"],
      housingTypes: "SFH, multi-family, small-town stock",
      challenges: ["I-5 / OR-22 timing","Longer empty miles","Agricultural traffic"],
      moverTips: "Price east-valley pairs honestly. Photo driveway and street width.",
      cityKeywords: ["woodburn","silverton","stayton"],
    }
  ],
  costDrivers: {
    title: "What drives Marion County moving costs",
    intro: "Core elevator friction and I-5/OR-22 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Downtown elevator & curb friction", detail: "Capitol-adjacent labor hours spike." },
      { title: "I-5 / OR-22 / OR-99E congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on south suburbs", detail: "Gate lists push peak windows." },
      { title: "Rain staging soft costs", detail: "Wet-weather packing adds labor." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$420–$1,400+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,300–$3,700+", note: "Core friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,300–$7,000+", note: "Portland pairs highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Marion County",
    intro: "Capital session timing, family peaks, rainy winters, and summer smoke days reshape Salem windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-5 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Government transfer windows", detail: "Hard dates can cluster around fiscal calendars." },
      { title: "Wildfire-smoke contingency", detail: "Confirm outdoor staging flexibility on smoke days." }
    ],
  },
  specialized: [
    {
      id: "salem-marion-capital-mid-valley",
      title: "Salem capital & mid-valley module",
      intro: "Marion estimates fail when capitol-core elevators or I-5 empty miles are treated like Eugene campus or Portland collar defaults.",
      bullets: ["Request downtown Salem building packets early.","Price I-5/OR-22 pairs portal-to-portal toward Portland or Eugene.","Separate government hard-date scopes from standard suburban SFH.","Clarify Marion vs Linn/Lane destinations on multi-county estimates.","Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Marion County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Salem-Keizer, Woodburn, Silver Falls, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Oregon Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Salem Health, Legacy Silverton affiliates, and other systems serve mid-valley corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Woodburn and South Salem into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Capitol multi-unit vs suburban SFH", detail: "Downtown product differs from South Salem and Keizer two-stories." },
          { title: "Cost variation", detail: "Near-core renovated stock often prices differently from east-valley small-town SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Downtown capital lifestyle", detail: "Government adjacency with elevator tradeoffs." },
          { title: "South Salem suburban pattern", detail: "HOA/SFH product with I-5 logistics." },
          { title: "Woodburn / east-valley pattern", detail: "Smaller-town stock with longer empty miles." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "State government, healthcare, education, agriculture-adjacent industry, and logistics shape employment." },
          { title: "Commute realism", detail: "I-5 and OR-22 peaks are real for Portland-bound workers." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Capital mid-valley identity", detail: "Marion is Salem metro — not Eugene campus defaults or Portland SE-metro collars." },
          { title: "Climate", detail: "Wet winters, warm summers, and occasional wildfire smoke. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Marion County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ODOT household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Marion County — official site", href: "https://www.co.marion.or.us/", external: true },
      { label: "City of Salem", href: "https://www.cityofsalem.net/", external: true },
      { label: "TripCheck traffic (ODOT)", href: "https://www.tripcheck.com/", external: true }
    ],
  },
  directoryHint: "Prefer capitol multi-unit experience and honest I-5 pricing. Verify ODOT in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
