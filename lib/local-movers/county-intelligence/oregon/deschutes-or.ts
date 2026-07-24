import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOrPack } from '@/lib/local-movers/county-intelligence/oregon/or-shared';

export const deschutesCountyOrIntelligence: CountyIntelligencePack = finalizeOrPack({
  countySlug: "deschutes",
  hubTitle: "Deschutes County Moving Intelligence Hub",
  eyebrow: "Deschutes · Bend growth, high-desert logistics & US-97",
  h1: "Moving in Deschutes County: Bend Growth, High-Desert Logistics & US-97 Access",
  heroOpener: "Deschutes County is high-desert central Oregon, not Willamette Valley: Bend multi-unit and HOA growth, Redmond airport-corridor stock, tourism and second-home pulses, and US-97/US-20 portal time that is not Portland rain-hills logistics and not Medford Rogue Valley product. A westside Bend stairs job, a northeast HOA two-story, and a Redmond multi-family unit do not share truck access or empty-mile risk. This hub is for Deschutes — not a Multnomah south rename.",
  heroCredibility:
    'ODOT household goods certificate (ORS 825) for intrastate OR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "US-97 · US-20 · OR-372 · parkway corridors",
  whatMakesDifferent: {
    title: "What makes moving in Deschutes County different",
    intro: "These are Bend / high-desert realities — dry climate staging, tourism peaks, and mountain-edge access — not Portland bridges or Eugene campus waves.",
    bullets: [
      {
        title: "High-desert climate changes staging assumptions",
        detail: "Dust, heat, and winter ice matter more than Willamette Valley rain defaults.",
      },
      {
        title: "Tourism and second-home pulses cluster summer demand",
        detail: "Short-term rental turns and peak weekends fill crews first.",
      },
      {
        title: "US-97 / US-20 define portal-to-portal time",
        detail: "Pairs toward Portland or southern OR are long regional hauls — price honestly.",
      },
      {
        title: "Bend westside hills vs northeast flat growth are not clones",
        detail: "Photo grades and HOA rules separately.",
      },
      {
        title: "Not Portland spillover and not Rogue Valley product",
        detail: "Treat Deschutes as central Oregon with its own inventory patterns.",
      },
      {
        title: "Intrastate ODOT household goods certificate vs interstate FMCSA",
        detail: "Moves entirely within Oregon by for-hire household goods carriers generally require a certificate of authority from the Oregon Department of Transportation (ODOT), administered through the Commerce and Compliance Division under ORS 825. Match the legal name on the estimate to Oregon household goods authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Deschutes access zones",
  zonesIntro: "Plan by central Bend, westside hills, northeast/Redmond growth, and Sisters/rural edges.",
  zones: [
    {
      id: "bend-core",
      name: "Central Bend multi-unit & downtown",
      shortName: "Central Bend",
      neighborhoods: ["Downtown Bend","Old Bend edges","central multi-family"],
      housingTypes: "Multi-unit, condos, renovated SFH",
      challenges: ["Curb staging","Tourism congestion","Elevators and stairs"],
      moverTips: "Avoid peak tourism weekends when flexible. Confirm elevator reservations.",
      cityKeywords: ["bend","downtown bend"],
    },
    {
      id: "bend-westside",
      name: "Westside Bend hills & premium stock",
      shortName: "Westside Bend",
      neighborhoods: ["Westside Bend","Awbrey Butte edges","Summit edges"],
      housingTypes: "Hillside SFH, multi-level, HOA pockets",
      challenges: ["Grades and stairs","Limited truck turn radius","Winter ice"],
      moverTips: "Photo driveway grades. Prefer smaller trucks when required.",
      cityKeywords: ["westside bend","awbrey butte"],
    },
    {
      id: "ne-redmond",
      name: "Northeast Bend, Redmond & airport corridor",
      shortName: "NE Bend / Redmond",
      neighborhoods: ["Northeast Bend","Redmond","Deschutes River Woods edges","airport corridors"],
      housingTypes: "HOA SFH, multi-family, growth suburbs",
      challenges: ["US-97 congestion","HOA rules","Longer empty miles to westside"],
      moverTips: "Collect HOA packets. Price US-97 pairs portal-to-portal.",
      cityKeywords: ["redmond","northeast bend"],
    },
    {
      id: "sisters-edges",
      name: "Sisters, Sunriver approaches & rural edges",
      shortName: "Sisters / rural",
      neighborhoods: ["Sisters","Sunriver approaches","La Pine edges","rural forest roads"],
      housingTypes: "SFH, vacation/second-home stock, rural access",
      challenges: ["Longer empty miles","Seasonal tourism","Winter access"],
      moverTips: "Price rural pairs honestly. Confirm winter and driveway contingency.",
      cityKeywords: ["sisters","sunriver","la pine"],
    }
  ],
  costDrivers: {
    title: "What drives Deschutes County moving costs",
    intro: "Tourism peaks, hillside access, and long US-97 empty miles drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Westside grades & stairs", detail: "Hillside labor hours spike." },
      { title: "Tourism-weekend demand premiums", detail: "Summer peaks raise rates." },
      { title: "US-97 / US-20 long empty miles", detail: "Regional pairs cost more than map distance suggests." },
      { title: "HOA soft costs on growth edges", detail: "Gate lists push peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$500–$1,600+", note: "Higher in peak tourism windows" },
      { label: "2–3BR condo or modest SFH", value: "$1,500–$4,400+", note: "Hills and HOA friction trend up" },
      { label: "3–4+ BR / cross-state / long OR haul", value: "$2,900–$9,500+", note: "Portland or CA pairs highest" },
      { label: "Typical 2-person crew rate", value: "$115–$195+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Deschutes County",
    intro: "Summer tourism dominates more than Willamette Valley patterns; winter ice and wildfire smoke still matter.",
    items: [
      { title: "Best windows: mid-week outside peak tourism", detail: "Clear curb in central Bend." },
      { title: "Peak season: June–September", detail: "Book Bend weekends far ahead." },
      { title: "Shoulder seasons for second-home turns", detail: "Still confirm HOA and access rules." },
      { title: "Winter ice and wildfire-smoke contingency", detail: "Confirm driveway and outdoor staging flexibility." }
    ],
  },
  specialized: [
    {
      id: "bend-deschutes-high-desert",
      title: "Bend high-desert growth & tourism module",
      intro: "Deschutes estimates fail when tourism peaks, westside grades, or long US-97 empty miles are treated like Portland rain-metro defaults.",
      bullets: ["Photo westside grades and street width before truck sizing.","Avoid peak tourism weekends in central Bend when flexible.","Price US-97/US-20 pairs portal-to-portal toward Portland, Eugene, or southern OR.","Do not treat Deschutes as Multnomah south or Willamette Valley product.","Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Deschutes County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Bend-La Pine, Redmond, Sisters, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Oregon Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "St. Charles Health System and other central Oregon providers serve Bend/Redmond corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map drive times from Sisters and Redmond into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Central multi-unit vs westside hills vs northeast HOA growth", detail: "Submarkets differ sharply within short distances." },
          { title: "Cost variation", detail: "Tourism-adjacent and premium hillside stock often prices differently from Redmond growth SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Central Bend lifestyle", detail: "Walkable amenities with tourism congestion tradeoffs." },
          { title: "Westside hillside pattern", detail: "Premium grades and stair logistics." },
          { title: "Redmond / NE growth pattern", detail: "HOA product with US-97 logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, tourism/hospitality, outdoor recreation economy, construction, and remote/tech hybrid work shape employment." },
          { title: "Commute realism", detail: "US-97 peaks and long distances between Bend and Redmond are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "High-desert identity", detail: "Deschutes is central Oregon high desert — not Portland rain-metro or Willamette Valley university defaults." },
          { title: "Climate", detail: "Dry climate, cold winters, hot summers, and wildfire-smoke risk. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Deschutes County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ODOT household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Deschutes County — official site", href: "https://www.deschutes.org/", external: true },
      { label: "City of Bend", href: "https://www.bendoregon.gov/", external: true },
      { label: "TripCheck traffic (ODOT)", href: "https://www.tripcheck.com/", external: true }
    ],
  },
  directoryHint: "Prefer high-desert hillside and tourism-window experience with honest US-97 pricing. Verify ODOT in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
