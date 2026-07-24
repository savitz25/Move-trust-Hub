import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOrPack } from '@/lib/local-movers/county-intelligence/oregon/or-shared';

export const jacksonCountyOrIntelligence: CountyIntelligencePack = finalizeOrPack({
  countySlug: "jackson",
  hubTitle: "Jackson County Moving Intelligence Hub",
  eyebrow: "Jackson · Medford/Rogue Valley, southern OR & I-5 logistics",
  h1: "Moving in Jackson County: Medford–Rogue Valley Access, Southern Oregon Identity & I-5 Logistics",
  heroOpener: "Jackson County is southern Oregon Rogue Valley, not Portland spillover: Medford multi-unit and SFH mix, Ashland tourism and campus-adjacent stock, Central Point/White City growth, and I-5/OR-62 portal time that is not Bend high-desert product and not Eugene valley defaults. A Medford multi-family unit, an Ashland hillside job, and a Central Point two-story do not share truck access or empty-mile risk. This hub is for Jackson — not a Multnomah south rename.",
  heroCredibility:
    'ODOT household goods certificate (ORS 825) for intrastate OR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-5 · OR-62 · OR-99 · OR-238",
  whatMakesDifferent: {
    title: "What makes moving in Jackson County different",
    intro: "These are Rogue Valley realities — southern OR climate, tourism peaks, and I-5 logistics — not Portland collars or central Oregon desert as the default.",
    bullets: [
      {
        title: "Medford core multi-unit differs from Ashland hillside and tourism stock",
        detail: "Survey access type carefully — not one valley product.",
      },
      {
        title: "I-5 defines long north-south portal time",
        detail: "Pairs toward Portland or California are long regional or interstate hauls.",
      },
      {
        title: "Tourism and cultural calendars (Ashland) reshape summer windows",
        detail: "Peak weekends fill curb and lodging demand first.",
      },
      {
        title: "Wildfire-smoke and heat days are first-class planning risks",
        detail: "Confirm outdoor staging contingency in late summer.",
      },
      {
        title: "Not Portland south and not Bend clone",
        detail: "Treat Jackson as Rogue Valley with its own inventory patterns.",
      },
      {
        title: "Intrastate ODOT household goods certificate vs interstate FMCSA",
        detail: "Moves entirely within Oregon by for-hire household goods carriers generally require a certificate of authority from the Oregon Department of Transportation (ODOT), administered through the Commerce and Compliance Division under ORS 825. Match the legal name on the estimate to Oregon household goods authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Jackson access zones",
  zonesIntro: "Plan by Medford core, Ashland, Central Point/White City, and Applegate/west-valley edges.",
  zones: [
    {
      id: "medford-core",
      name: "Medford core & multi-family belt",
      shortName: "Medford",
      neighborhoods: ["Downtown Medford","east/west Medford","multi-family corridors"],
      housingTypes: "Multi-unit, SFH, renovated stock",
      challenges: ["Curb staging","I-5 timing","Heat/smoke days"],
      moverTips: "Prefer mid-week mornings. Confirm multi-unit access type.",
      cityKeywords: ["medford"],
    },
    {
      id: "ashland",
      name: "Ashland tourism & hillside stock",
      shortName: "Ashland",
      neighborhoods: ["Ashland","downtown Ashland","hillside neighborhoods"],
      housingTypes: "Hillside SFH, multi-unit, tourism-adjacent stock",
      challenges: ["Hills and stairs","Tourism congestion","Limited street width"],
      moverTips: "Photo grades and curb. Avoid festival/peak tourism windows when flexible.",
      cityKeywords: ["ashland"],
    },
    {
      id: "central-point-white-city",
      name: "Central Point, White City & north-valley growth",
      shortName: "Central Point / White City",
      neighborhoods: ["Central Point","White City","Eagle Point edges"],
      housingTypes: "SFH, multi-family, industrial-adjacent stock",
      challenges: ["OR-62 congestion","Industrial traffic","Longer empty miles to Ashland"],
      moverTips: "Price north-valley pairs portal-to-portal. Survey industrial-adjacent access.",
      cityKeywords: ["central point","white city","eagle point"],
    },
    {
      id: "west-valley",
      name: "Jacksonville, Applegate & west-valley edges",
      shortName: "West valley",
      neighborhoods: ["Jacksonville","Applegate edges","Ruch edges","OR-238 corridors"],
      housingTypes: "SFH, rural stock, historic town product",
      challenges: ["Longer empty miles","Rural access","Wildfire-season risk"],
      moverTips: "Price rural pairs honestly. Confirm driveway and turn radius.",
      cityKeywords: ["jacksonville","applegate"],
    }
  ],
  costDrivers: {
    title: "What drives Jackson County moving costs",
    intro: "Hillside/tourism access and long I-5 empty miles drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Ashland hillside & tourism friction", detail: "Peak weekends spike labor hours." },
      { title: "I-5 / OR-62 long empty miles", detail: "Regional pairs cost more than map distance suggests." },
      { title: "Heat and wildfire-smoke contingency", detail: "Late-summer outdoor staging risk." },
      { title: "Multi-unit access friction in Medford", detail: "Elevators and stairs rewrite labor hours." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$420–$1,400+", note: "Higher in Ashland tourism peaks" },
      { label: "2–3BR condo or modest SFH", value: "$1,300–$3,800+", note: "Hills and heat friction trend up" },
      { label: "3–4+ BR / cross-state", value: "$2,400–$8,000+", note: "CA or Portland pairs highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Jackson County",
    intro: "Southern OR heat, tourism summers, and wildfire-smoke risk reshape windows more than Portland rain defaults.",
    items: [
      { title: "Best windows: mid-week spring/fall", detail: "Avoid peak heat and tourism when flexible." },
      { title: "Peak tourism season: summer", detail: "Book Ashland weekends early." },
      { title: "Late-summer wildfire-smoke risk", detail: "Confirm outdoor staging contingency." },
      { title: "Mild winters vs valley ice pockets", detail: "Still confirm driveway access on cold snaps." }
    ],
  },
  specialized: [
    {
      id: "medford-jackson-rogue-valley",
      title: "Medford Rogue Valley & southern OR module",
      intro: "Jackson estimates fail when Ashland tourism access, heat/smoke days, or long I-5 empty miles are treated like Portland collar defaults.",
      bullets: ["Photo Ashland grades and curb before truck sizing.","Avoid peak tourism weekends when flexible.","Price I-5 pairs portal-to-portal toward California or Portland.","Do not treat Jackson as Multnomah south or Bend high-desert product.","Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Jackson County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Medford, Ashland, Central Point, Phoenix-Talent, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Oregon Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Asante Rogue Regional, Providence Medford, and other systems serve Rogue Valley corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map drive times from Ashland and Central Point into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Medford multi-unit vs Ashland hillside vs north-valley growth", detail: "Submarkets differ sharply within the Rogue Valley." },
          { title: "Cost variation", detail: "Tourism-adjacent Ashland stock often prices differently from White City growth SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Medford core pattern", detail: "Regional hub multi-unit and SFH mix." },
          { title: "Ashland lifestyle", detail: "Tourism and hillside tradeoffs." },
          { title: "Central Point / White City pattern", detail: "Growth suburbs with OR-62 logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, retail/logistics, agriculture-adjacent industry, tourism, and education shape employment." },
          { title: "Commute realism", detail: "I-5 and OR-62 peaks are real across the valley. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Southern OR identity", detail: "Jackson is Rogue Valley — not Portland spillover suburbs or Bend high-desert defaults." },
          { title: "Climate", detail: "Hotter, drier summers than the Willamette Valley, with wildfire-smoke risk. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Jackson County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ODOT household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Jackson County — official site", href: "https://jacksoncountyor.gov/", external: true },
      { label: "City of Medford", href: "https://www.medfordoregon.gov/", external: true },
      { label: "TripCheck traffic (ODOT)", href: "https://www.tripcheck.com/", external: true }
    ],
  },
  directoryHint: "Prefer Rogue Valley hillside/tourism experience and honest I-5 pricing. Verify ODOT in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
