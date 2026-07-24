import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeOrPack } from '@/lib/local-movers/county-intelligence/oregon/or-shared';

export const linnCountyOrIntelligence: CountyIntelligencePack = finalizeOrPack({
  countySlug: "linn",
  hubTitle: "Linn County Moving Intelligence Hub",
  eyebrow: "Linn · Albany mid-valley, not Eugene or Salem clone",
  h1: "Moving in Linn County: Albany Mid-Valley Access, I-5 Logistics & Regional Patterns",
  heroOpener: "Linn County is mid-valley Albany regional product, not a Eugene or Salem clone: Albany multi-unit and SFH mix, Lebanon and Sweet Home edges, I-5/US-20/OR-34 portal time, and agricultural-industrial adjacency that is not UO lease waves and not capitol multi-unit defaults. An Albany multi-family unit, a Lebanon two-story, and a rural edge home do not share truck access or empty-mile risk. This hub is for Linn — not renamed Lane or Marion pages.",
  heroCredibility:
    'ODOT household goods certificate (ORS 825) for intrastate OR moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-5 · US-20 · OR-34 · OR-99E",
  whatMakesDifferent: {
    title: "What makes moving in Linn County different",
    intro: "These are Albany / mid-valley realities — regional logistics, valley rain, and I-5 timing — not Portland collars or Eugene campus product as the default.",
    bullets: [
      {
        title: "Albany core multi-unit differs from Lebanon / Sweet Home edges",
        detail: "Survey access type carefully — not one mid-valley product.",
      },
      {
        title: "I-5 / US-20 / OR-34 define portal-to-portal time",
        detail: "Pairs toward Salem, Eugene, or Portland look regional at peak.",
      },
      {
        title: "Not a Eugene campus clone and not a Salem capital clone",
        detail: "Linn has its own industrial/agricultural adjacency patterns.",
      },
      {
        title: "Industrial and mill-adjacent traffic can reshape crew timing",
        detail: "Avoid shift-change peaks when flexible.",
      },
      {
        title: "Rain windows still dominate Willamette Valley staging",
        detail: "Confirm floor protection and driveway contingency.",
      },
      {
        title: "Intrastate ODOT household goods certificate vs interstate FMCSA",
        detail: "Moves entirely within Oregon by for-hire household goods carriers generally require a certificate of authority from the Oregon Department of Transportation (ODOT), administered through the Commerce and Compliance Division under ORS 825. Match the legal name on the estimate to Oregon household goods authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Linn access zones",
  zonesIntro: "Plan by Albany core, north Albany edges, Lebanon, and Sweet Home/east-valley corridors.",
  zones: [
    {
      id: "albany-core",
      name: "Albany core & multi-family belt",
      shortName: "Albany core",
      neighborhoods: ["Downtown Albany","central multi-family","south Albany edges"],
      housingTypes: "Multi-unit, SFH, renovated stock",
      challenges: ["Curb staging","I-5 timing","Mixed stairs and elevators"],
      moverTips: "Prefer mid-week mornings. Confirm multi-unit access type.",
      cityKeywords: ["albany"],
    },
    {
      id: "north-albany",
      name: "North Albany & river edges",
      shortName: "North Albany",
      neighborhoods: ["North Albany","river corridors","OR-20 approaches"],
      housingTypes: "SFH, multi-family, premium pockets",
      challenges: ["Bridge/approach timing","Longer empty miles to Lebanon","Rain access"],
      moverTips: "Price north pairs portal-to-portal. Photo driveway grades.",
      cityKeywords: ["north albany"],
    },
    {
      id: "lebanon",
      name: "Lebanon & mid-county stock",
      shortName: "Lebanon",
      neighborhoods: ["Lebanon","US-20 corridors","mid-county SFH"],
      housingTypes: "SFH, multi-family, small-city stock",
      challenges: ["US-20 congestion","Longer empty miles to Albany","Industrial traffic"],
      moverTips: "Clarify Lebanon vs Albany destinations. Survey older stock carefully.",
      cityKeywords: ["lebanon"],
    },
    {
      id: "sweet-home-east",
      name: "Sweet Home, east-valley & foothills edges",
      shortName: "Sweet Home / east",
      neighborhoods: ["Sweet Home","Brownsville edges","foothills approaches"],
      housingTypes: "SFH, rural stock, limited multi-family",
      challenges: ["Longer empty miles","Rural access","OR-228 / US-20 timing"],
      moverTips: "Price east pairs honestly. Photo driveway and turn radius.",
      cityKeywords: ["sweet home","brownsville"],
    }
  ],
  costDrivers: {
    title: "What drives Linn County moving costs",
    intro: "Regional empty miles and multi-unit access drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Multi-unit access friction in Albany", detail: "Stairs and elevators rewrite labor hours." },
      { title: "I-5 / US-20 / OR-34 empty miles", detail: "Portal-to-portal spikes on longer pairs." },
      { title: "Industrial shift-change windows", detail: "Crew timing near mill/industrial corridors matters." },
      { title: "Rain staging soft costs", detail: "Wet-weather packing adds labor." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,300+", note: "Higher with elevators or long carries" },
      { label: "2–3BR condo or modest SFH", value: "$1,200–$3,400+", note: "Regional friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,100–$6,500+", note: "Portland or Eugene pairs highest" },
      { label: "Typical 2-person crew rate", value: "$95–$165+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Linn County",
    intro: "Mid-valley family peaks, rainy winters, and occasional wildfire smoke reshape Linn windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-5 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Albany multi-unit fills first." },
      { title: "Wildfire-smoke contingency", detail: "Confirm outdoor staging flexibility on smoke days." }
    ],
  },
  specialized: [
    {
      id: "albany-linn-mid-valley",
      title: "Albany mid-valley regional module",
      intro: "Linn estimates fail when empty miles or industrial timing are treated like Eugene campus or Salem capital defaults.",
      bullets: ["Survey Albany multi-unit access carefully before final quotes.","Price I-5/US-20/OR-34 pairs portal-to-portal toward Salem or Eugene.","Do not treat Linn as a Lane or Marion clone.","Clarify Linn vs Marion/Lane destinations on multi-county estimates.","Verify ODOT household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Linn County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Greater Albany, Lebanon Community, Sweet Home, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Oregon Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Samaritan Albany General, Good Samaritan (Lebanon corridor), and other systems serve mid-valley corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map drive times from Lebanon and Sweet Home into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Albany multi-unit vs Lebanon/Sweet Home SFH", detail: "Core product differs from east-county small-city stock." },
          { title: "Cost variation", detail: "Near-core renovated stock often prices differently from foothills-edge SFH." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Albany core pattern", detail: "Regional hub multi-unit and SFH mix." },
          { title: "Lebanon mid-county pattern", detail: "Smaller-city stock with US-20 logistics." },
          { title: "Sweet Home / east pattern", detail: "Longer empty miles and rural access." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Manufacturing, healthcare, education, agriculture-adjacent industry, and logistics shape employment." },
          { title: "Commute realism", detail: "I-5 peaks are real for Salem- and Eugene-bound workers." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Mid-valley identity", detail: "Linn is Albany regional mid-valley — not Eugene campus or Salem capital product as the default." },
          { title: "Climate", detail: "Wet winters, warm summers, and occasional wildfire smoke. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Linn County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify ODOT household goods authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Linn County — official site", href: "https://www.linncountyor.gov/", external: true },
      { label: "City of Albany", href: "https://www.cityofalbany.net/", external: true },
      { label: "TripCheck traffic (ODOT)", href: "https://www.tripcheck.com/", external: true }
    ],
  },
  directoryHint: "Prefer mid-valley multi-unit experience and honest I-5 pricing. Verify ODOT in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
