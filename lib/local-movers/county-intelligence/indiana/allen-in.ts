import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeInPack } from '@/lib/local-movers/county-intelligence/indiana/in-shared';

export const allenCountyInIntelligence: CountyIntelligencePack = finalizeInPack({
  countySlug: "allen",
  hubTitle: "Allen County Moving Intelligence Hub",
  eyebrow: "Allen · Fort Wayne regional hub, northeast IN & I-69/I-469",
  h1: "Moving in Allen County: Fort Wayne Regional Access, Northeast Indiana & I-69/I-469 Logistics",
  heroOpener: "Allen County is northeast Indiana’s regional hub — not Indianapolis spillover: Fort Wayne downtown multi-unit, north/southwest suburban HOAs, industrial corridors, and I-69/I-469/US-30 portal time that is not Marion/I-465 logistics and not South Bend university product. A downtown Fort Wayne condo, a north-side HOA two-story, and a New Haven multi-family unit do not share truck access or empty-mile risk. This hub is for Allen — not an Indy clone.",
  heroCredibility:
    'Indiana DOR household goods operating authority (IC 8-2.1-22) for intrastate IN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-69 · I-469 · US-30 · US-27",
  whatMakesDifferent: {
    title: "What makes moving in Allen County different",
    intro: "These are Fort Wayne regional realities — ring logistics, industrial adjacency, and mid-size multi-unit — not Carmel HOA density or NW Indiana Chicago collar.",
    bullets: [
      {
        title: "Fort Wayne core multi-unit differs from outer HOA product",
        detail: "Elevators and curb limits rewrite near-core labor hours.",
      },
      {
        title: "I-69 / I-469 define portal-to-portal time",
        detail: "Cross-metro pairs look local on maps and regional at peak.",
      },
      {
        title: "Industrial and logistics corridors reshape crew timing",
        detail: "Shift-change windows matter near manufacturing belts.",
      },
      {
        title: "Not Indianapolis north-suburb product as the default",
        detail: "Treat Allen as its own northeast regional inventory pattern.",
      },
      {
        title: "Not South Bend / Elkhart industrial-RV defaults either",
        detail: "Fort Wayne ring logistics differ from St. Joseph/Elkhart product.",
      },
      {
        title: "Intrastate Indiana DOR HHG authority vs interstate FMCSA",
        detail: "Moves entirely within Indiana by for-hire household goods carriers generally require a Certificate of Public Convenience and Necessity (Indiana Operating Authority) from the Indiana Department of Revenue Motor Carrier Services under IC 8-2.1-22. Match the legal name on the estimate to Indiana authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Allen access zones",
  zonesIntro: "Plan by downtown Fort Wayne, north suburbs, southwest growth, and east/New Haven corridors.",
  zones: [
    {
      id: "fw-downtown",
      name: "Downtown Fort Wayne & near-core multi-unit",
      shortName: "Downtown FW",
      neighborhoods: ["Downtown Fort Wayne","West Central edges","Near-core multi-family"],
      housingTypes: "Mid-rises, multi-unit, renovated stock",
      challenges: ["Elevators and COI","Scarce curb staging","Event-day congestion"],
      moverTips: "Get building packets early. Prefer mid-week mornings.",
      cityKeywords: ["fort wayne","downtown"],
    },
    {
      id: "north-fw",
      name: "North Fort Wayne suburbs & I-69 corridors",
      shortName: "North FW",
      neighborhoods: ["Dupont Road corridors","Leo-Cedarville edges","Huntertown edges"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["I-69 congestion","HOA rules","Longer portal time to core"],
      moverTips: "Collect HOA packets. Price north pairs portal-to-portal.",
      cityKeywords: ["huntertown","leo"],
    },
    {
      id: "southwest-fw",
      name: "Southwest Fort Wayne growth",
      shortName: "SW Fort Wayne",
      neighborhoods: ["Southwest FW","Aboite edges","Covington corridors"],
      housingTypes: "HOA SFH, multi-family",
      challenges: ["I-69 / I-469 timing","HOA rules","Growth empty miles"],
      moverTips: "Collect HOA packets. Survey multi-unit access type.",
      cityKeywords: ["aboite","southwest fort wayne"],
    },
    {
      id: "east-new-haven",
      name: "New Haven, east corridors & industrial edges",
      shortName: "East / New Haven",
      neighborhoods: ["New Haven","east industrial corridors","US-30 edges"],
      housingTypes: "SFH, multi-family, industrial-adjacent stock",
      challenges: ["US-30 congestion","Industrial traffic","Mixed access"],
      moverTips: "Avoid shift peaks when flexible. Price east pairs honestly.",
      cityKeywords: ["new haven"],
    }
  ],
  costDrivers: {
    title: "What drives Allen County moving costs",
    intro: "Multi-unit access and I-69/I-469 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Core elevator & curb friction", detail: "Downtown labor hours spike." },
      { title: "I-69 / I-469 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on growth edges", detail: "Gate lists push peak windows." },
      { title: "Industrial shift-change windows", detail: "Crew timing near manufacturing belts matters." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,350+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,600+", note: "HOA friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,200–$6,800+", note: "Indy pairs highest" },
      { label: "Typical 2-person crew rate", value: "$95–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Allen County",
    intro: "Family peaks, multi-family turns, industrial calendars, and winter ice reshape Fort Wayne windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-69 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Core elevators fill first." },
      { title: "Winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "fort-wayne-allen-regional-hub",
      title: "Fort Wayne northeast regional hub module",
      intro: "Allen estimates fail when ring empty miles or industrial timing are treated like Indianapolis collar defaults.",
      bullets: ["Survey downtown multi-unit access carefully.","Price I-69/I-469 pairs portal-to-portal.","Do not treat Allen as an Indy north-suburb clone.","Clarify Allen vs St. Joseph/Elkhart destinations on multi-county estimates.","Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Allen County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Fort Wayne Community Schools, Northwest Allen, Southwest Allen, East Allen, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Indiana Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Parkview Health, Lutheran Health Network, and other systems serve northeast corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from outer suburbs into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Core multi-unit vs outer HOA stock", detail: "Downtown product differs from north/southwest two-stories." },
          { title: "Cost variation", detail: "Near-core renovated stock often prices differently from far-ring multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Downtown Fort Wayne lifestyle", detail: "Walkable amenities with elevator tradeoffs." },
          { title: "North suburban pattern", detail: "HOA product with I-69 logistics." },
          { title: "East industrial-adjacent pattern", detail: "Mixed stock with US-30 timing." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Healthcare, manufacturing, logistics, defense adjacency, and professional services shape employment." },
          { title: "Commute realism", detail: "I-69 and I-469 peaks are real. Test drive peak routes around the ring." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Northeast regional identity", detail: "Allen is Fort Wayne metro — not Indianapolis spillover or South Bend university defaults." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Allen County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Indiana DOR household goods operating authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Allen County — official site", href: "https://www.allencounty.us/", external: true },
      { label: "City of Fort Wayne", href: "https://www.cityoffortwayne.org/", external: true },
      { label: "INDOT traffic", href: "https://www.in.gov/indot/", external: true }
    ],
  },
  directoryHint: "Prefer regional multi-unit experience and honest I-69 pricing. Verify Indiana DOR HHG authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
