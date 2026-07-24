import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeInPack } from '@/lib/local-movers/county-intelligence/indiana/in-shared';

export const marionCountyInIntelligence: CountyIntelligencePack = finalizeInPack({
  countySlug: "marion",
  hubTitle: "Marion County Moving Intelligence Hub",
  eyebrow: "Marion · Indianapolis neighborhoods, midtown elevators & I-465 ring",
  h1: "Moving in Marion County: Indianapolis Neighborhoods, Midtown Access & I-465 Logistics",
  heroOpener: "Marion County is Indianapolis metro core — not Carmel north-suburb product: downtown and midtown elevators, Mass Ave and Fountain Square multi-unit, west-side and Speedway stock, airport-corridor logistics, and I-65/I-70/I-465 portal time that is not Hamilton HOA growth and not NW Indiana Chicago collar. A downtown condo, a Broad Ripple multi-family unit, and a west-side two-story do not share truck access or empty-mile risk. This hub is for Marion (Indianapolis) — not a Hamilton clone or renamed Ohio Marion page.",
  heroCredibility:
    'Indiana DOR household goods operating authority (IC 8-2.1-22) for intrastate IN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-65 · I-70 · I-465 · I-74 · US-31 · local arterial grid",
  whatMakesDifferent: {
    title: "What makes moving in Marion County different",
    intro: "These are Indianapolis core realities — neighborhood micro-markets, elevators, and beltway timing — not Carmel HOA defaults or Fort Wayne regional product.",
    bullets: [
      {
        title: "Downtown and midtown elevators rewrite labor hours",
        detail: "Building packets and freight windows dominate core jobs.",
      },
      {
        title: "Neighborhood micro-markets are not interchangeable",
        detail: "Fountain Square, Broad Ripple, Meridian-Kessler, and west-side stock change curb and access rules.",
      },
      {
        title: "I-465 / I-65 / I-70 define portal-to-portal time",
        detail: "Cross-metro pairs look local on maps and regional at peak.",
      },
      {
        title: "Airport corridor and west-side logistics differ from midtown product",
        detail: "Industrial adjacency and multi-family waves reshape timing.",
      },
      {
        title: "Not Hamilton north-suburb HOA product as the default",
        detail: "Survey each Marion address — city density is not Carmel/Fishers growth.",
      },
      {
        title: "Intrastate Indiana DOR HHG authority vs interstate FMCSA",
        detail: "Moves entirely within Indiana by for-hire household goods carriers generally require a Certificate of Public Convenience and Necessity (Indiana Operating Authority) from the Indiana Department of Revenue Motor Carrier Services under IC 8-2.1-22. Match the legal name on the estimate to Indiana authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Marion access zones",
  zonesIntro: "Plan by downtown/midtown, northside neighborhoods, west-side/Speedway, and south/east I-465 edges.",
  zones: [
    {
      id: "downtown-midtown",
      name: "Downtown, Mass Ave & midtown elevators",
      shortName: "Downtown / midtown",
      neighborhoods: ["Downtown Indianapolis","Mass Ave","Lockerbie edges","Fountain Square edges"],
      housingTypes: "High-rises, mid-rises, renovated multi-unit",
      challenges: ["Elevators and COI","Scarce curb staging","Event-day congestion"],
      moverTips: "Get building packets early. Prefer mid-week morning freight windows.",
      cityKeywords: ["indianapolis","downtown","mass ave","fountain square"],
    },
    {
      id: "northside",
      name: "Broad Ripple, Meridian-Kessler & northside multi-unit",
      shortName: "Northside",
      neighborhoods: ["Broad Ripple","Meridian-Kessler","Butler-Tarkington edges","Nora edges"],
      housingTypes: "Multi-family, older SFH, mid-rises",
      challenges: ["Curb parking limits","Stairs and basements","Keystone / College congestion"],
      moverTips: "Survey stair width carefully. Confirm parking rules block by block.",
      cityKeywords: ["broad ripple","meridian-kessler","nora"],
    },
    {
      id: "west-speedway",
      name: "West side, Speedway & airport corridor",
      shortName: "West / Speedway",
      neighborhoods: ["Speedway","Wayne Twp edges","airport corridors","Haughville edges"],
      housingTypes: "SFH, multi-family, industrial-adjacent stock",
      challenges: ["I-465 / I-70 congestion","Event calendars near Speedway","Mixed access types"],
      moverTips: "Avoid major race-event peaks when flexible. Price airport pairs portal-to-portal.",
      cityKeywords: ["speedway","west indianapolis"],
    },
    {
      id: "south-east-ring",
      name: "South and east I-465 suburban edges",
      shortName: "South/east ring",
      neighborhoods: ["Southport edges","Beech Grove edges","Lawrence edges","Warren Twp edges"],
      housingTypes: "SFH, multi-family, HOA pockets",
      challenges: ["I-465 congestion","HOA rules","Longer portal time to core"],
      moverTips: "Collect HOA packets. Price ring pairs portal-to-portal.",
      cityKeywords: ["beech grove","lawrence","southport"],
    }
  ],
  costDrivers: {
    title: "What drives Marion County moving costs",
    intro: "Elevator friction, neighborhood access, and I-465 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Downtown elevator & curb friction", detail: "Core labor hours spike." },
      { title: "I-465 / I-65 / I-70 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Neighborhood stairs & long carries", detail: "Older multi-unit raises labor hours." },
      { title: "Event-day premiums near Speedway/downtown", detail: "Calendars compress flexible windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$450–$1,500+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,350–$3,900+", note: "Core friction trends up" },
      { label: "3–4+ BR / tower / cross-metro", value: "$2,500–$7,800+", note: "Towers and long ring pairs highest" },
      { label: "Typical 2-person crew rate", value: "$105–$180+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Marion County",
    intro: "Summer family peaks, multi-family lease turns, race weekends, and winter ice reshape Indy windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-465 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Downtown elevators fill first." },
      { title: "Winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "indianapolis-marion-neighborhoods-i465",
      title: "Indianapolis neighborhoods & I-465 module",
      intro: "Marion estimates fail when building packets, neighborhood curb rules, or I-465 empty miles are ignored.",
      bullets: ["Request downtown/midtown building packets early.","Photo curb and stair access for neighborhood multi-unit jobs.","Price I-465/I-65/I-70 pairs portal-to-portal.","Clarify Marion vs Hamilton destinations on multi-county estimates.","Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Marion County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Indianapolis Public Schools and township/district systems serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Indiana Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "IU Health, Ascension St. Vincent, Community Health Network, and other systems serve county corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from ring edges into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Core condo/multi-unit vs ring SFH stock", detail: "Downtown product differs sharply from south/east I-465 two-stories." },
          { title: "Cost variation", detail: "Near-core renovated stock often prices differently from outer multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Downtown / midtown lifestyle", detail: "Walkable amenities with elevator and curb tradeoffs." },
          { title: "Northside neighborhood pattern", detail: "Multi-unit density with arterial logistics." },
          { title: "Ring suburban pattern", detail: "SFH/HOA product with longer portal time to core jobs." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Healthcare, logistics, government, education, and professional services shape employment." },
          { title: "Commute realism", detail: "I-465 peaks are real. Test drive peak routes around the ring." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Indianapolis core identity", detail: "Marion is Indy metro core — not Carmel north-suburb product or NW Indiana Chicago collar as the default." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Marion County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Indiana DOR household goods operating authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Marion County — official site", href: "https://www.indy.gov/", external: true },
      { label: "INDOT traffic", href: "https://www.in.gov/indot/", external: true }
    ],
  },
  directoryHint: "Prefer downtown elevator and neighborhood access experience with honest I-465 pricing. Verify Indiana DOR HHG authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
