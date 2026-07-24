import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeInPack } from '@/lib/local-movers/county-intelligence/indiana/in-shared';

export const lakeCountyInIntelligence: CountyIntelligencePack = finalizeInPack({
  countySlug: "lake",
  hubTitle: "Lake County Moving Intelligence Hub",
  eyebrow: "Lake · Gary/Hammond/Merrillville Chicago collar & I-80/94",
  h1: "Moving in Lake County: NW Indiana Chicago Collar, Industrial-Suburban Mix & I-80/94 Logistics",
  heroOpener: "Lake County is northwest Indiana Chicago collar — not Indianapolis spillover: Hammond and Munster multi-unit, Merrillville HOA product, Gary industrial-adjacent stock, and I-80/94/I-65 portal time that is not Marion/I-465 logistics and not Fort Wayne regional product. A Munster two-story, a Merrillville multi-family unit, and a Hammond condo do not share truck access or empty-mile risk. This hub is for Indiana Lake County — not Illinois Lake County and not an Indy clone.",
  heroCredibility:
    'Indiana DOR household goods operating authority (IC 8-2.1-22) for intrastate IN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-80/94 · I-65 · US-30 · US-41 · local arterial grid",
  whatMakesDifferent: {
    title: "What makes moving in Lake County different",
    intro: "These are Chicago-collar NW Indiana realities — industrial traffic, IL-border logistics, and I-80/94 timing — not Indianapolis beltway product.",
    bullets: [
      {
        title: "Chicago commute patterns rewrite empty-mile math",
        detail: "IL destinations often need FMCSA — clarify origin/destination early.",
      },
      {
        title: "Industrial and multi-family mix is not Carmel HOA product",
        detail: "Shift-change windows and older stock reshape crew timing.",
      },
      {
        title: "I-80/94 / I-65 define portal-to-portal time",
        detail: "Cross-border and regional pairs look short on maps and regional at peak.",
      },
      {
        title: "Merrillville / Crown Point suburban product differs from lakefront edges",
        detail: "HOA packets and longer empty miles rewrite quotes.",
      },
      {
        title: "Not Indianapolis and not Illinois Lake County as the page identity",
        detail: "This is NW Indiana — survey each address on its own terms.",
      },
      {
        title: "Intrastate Indiana DOR HHG authority vs interstate FMCSA",
        detail: "Moves entirely within Indiana by for-hire household goods carriers generally require a Certificate of Public Convenience and Necessity (Indiana Operating Authority) from the Indiana Department of Revenue Motor Carrier Services under IC 8-2.1-22. Match the legal name on the estimate to Indiana authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Lake access zones",
  zonesIntro: "Plan by Hammond/Munster west, Gary industrial-adjacent, Merrillville/US-30 growth, and Crown Point/south edges.",
  zones: [
    {
      id: "hammond-munster",
      name: "Hammond, Munster & west collar",
      shortName: "Hammond / Munster",
      neighborhoods: ["Hammond","Munster","Highland edges","Whiting edges"],
      housingTypes: "Multi-family, SFH, older stock",
      challenges: ["I-80/94 congestion","Stairs and basements","IL border logistics"],
      moverTips: "Clarify Indiana vs Illinois destinations. Survey older stock carefully.",
      cityKeywords: ["hammond","munster","highland"],
    },
    {
      id: "gary-industrial",
      name: "Gary & industrial-adjacent corridors",
      shortName: "Gary",
      neighborhoods: ["Gary","Miller edges","industrial corridors"],
      housingTypes: "Older multi-unit, SFH, industrial-adjacent stock",
      challenges: ["Industrial traffic","Older access","I-90 / I-65 timing"],
      moverTips: "Avoid plant shift peaks when flexible. Photo access early.",
      cityKeywords: ["gary"],
    },
    {
      id: "merrillville-us30",
      name: "Merrillville, Hobart & US-30 growth",
      shortName: "Merrillville / US-30",
      neighborhoods: ["Merrillville","Hobart","US-30 corridors","Broadway corridors"],
      housingTypes: "HOA SFH, multi-family, commercial-adjacent stock",
      challenges: ["US-30 congestion","HOA rules","Lease-end waves"],
      moverTips: "Collect HOA packets. Book elevators for month-end.",
      cityKeywords: ["merrillville","hobart"],
    },
    {
      id: "crown-point-south",
      name: "Crown Point, Cedar Lake & south edges",
      shortName: "Crown Point / south",
      neighborhoods: ["Crown Point","Cedar Lake","St. John edges","Schererville edges"],
      housingTypes: "HOA SFH, multi-family, lake-adjacent stock",
      challenges: ["Longer empty miles","HOA rules","I-65 timing"],
      moverTips: "Price south pairs portal-to-portal. Collect HOA packets.",
      cityKeywords: ["crown point","cedar lake","st john","schererville"],
    }
  ],
  costDrivers: {
    title: "What drives Lake County moving costs",
    intro: "Industrial timing, multi-unit access, and I-80/94 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "I-80/94 / I-65 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Older stock stairs & long carries", detail: "Labor hours spike on west-collar jobs." },
      { title: "HOA soft costs on growth edges", detail: "Gate lists push peak windows." },
      { title: "Cross-border IL soft costs", detail: "Authority and empty miles rise when any leg leaves Indiana." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,500+", note: "Higher with elevators or long carries" },
      { label: "2–3BR condo or modest SFH", value: "$1,350–$3,900+", note: "Industrial/HOA friction trends up" },
      { label: "3–4+ BR / cross-metro / IL pairs", value: "$2,500–$8,000+", note: "Chicago pairs highest" },
      { label: "Typical 2-person crew rate", value: "$105–$180+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Lake County",
    intro: "Chicago-metro peaks, multi-family turns, lake-effect winter, and industrial calendars reshape NW Indiana windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-80/94 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "West-collar elevators fill first." },
      { title: "Lake-effect winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "lake-in-nw-chicago-collar",
      title: "NW Indiana Chicago-collar module",
      intro: "Lake (IN) estimates fail when IL-border authority, industrial timing, or I-80/94 empty miles are treated like Indianapolis jobs.",
      bullets: ["Clarify Indiana vs Illinois destinations before quoting authority.","Price I-80/94/I-65 pairs portal-to-portal.","Avoid industrial shift peaks when flexible.","Do not treat Lake as an Indianapolis spillover clone.","Verify Indiana DOR household goods authority for pure in-state jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Lake County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Numerous city and township districts serve different addresses across the collar. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Indiana Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Community Healthcare System, Methodist Hospitals, Franciscan, and Chicago systems (via commute) serve the collar. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Crown Point into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "West multi-unit vs US-30 HOA growth", detail: "Hammond/Munster product differs from Merrillville two-stories." },
          { title: "Cost variation", detail: "IL-adjacent renovated stock often prices differently from south-county multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Hammond / Munster collar lifestyle", detail: "Chicago-commute density with industrial adjacency tradeoffs." },
          { title: "Merrillville growth pattern", detail: "HOA/multi-family mix with US-30 logistics." },
          { title: "Crown Point south pattern", detail: "Suburban product with longer empty miles to the lake edge." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Logistics, manufacturing, healthcare, retail corridors, and Chicago-commute professional jobs shape employment." },
          { title: "Commute realism", detail: "I-80/94 and I-65 peaks are first-class planning factors for Chicago-bound workers." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Chicago-collar identity", detail: "Indiana Lake is NW Indiana — not Indianapolis metro and not Illinois Lake County as the default product." },
          { title: "Climate", detail: "Lake-effect winter is real. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Lake County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Indiana DOR household goods operating authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Lake County, IN — official site", href: "https://www.lakecountyin.org/", external: true },
      { label: "INDOT traffic", href: "https://www.in.gov/indot/", external: true }
    ],
  },
  directoryHint: "Prefer Chicago-collar multi-unit experience and honest I-80/94 pricing. Clarify IN vs IL authority. Verify Indiana DOR HHG in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
