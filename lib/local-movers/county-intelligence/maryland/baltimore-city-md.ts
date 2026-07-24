import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMdPack } from '@/lib/local-movers/county-intelligence/maryland/md-shared';

export const baltimoreCityMdIntelligence: CountyIntelligencePack = finalizeMdPack({
  countySlug: "baltimore-city",
  hubTitle: "Baltimore City Moving Intelligence Hub",
  eyebrow: "Baltimore City · row-homes, neighborhood micro-markets & I-95/I-83",
  h1: "Moving in Baltimore City: Rowhomes, Neighborhood Micro-Markets & I-95/I-83 Logistics",
  heroOpener: "Baltimore City is independent-city logistics — not Baltimore County suburbs: rowhome carries and narrow streets, Harbor East elevators, neighborhood micro-markets from Fells Point to Hampden, and I-95/I-83 portal time that is not Towson HOA product and not DC-collar Montgomery. A Federal Hill stairs job, a Canton condo, a midtown multi-unit, and a northwest city two-story do not share truck access or empty-mile risk. This hub is for Baltimore City — not Baltimore County.",
  heroCredibility:
    'Maryland household goods mover registration (Dept. of Labor) for intrastate MD moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-95 · I-83 · I-895 · local arterial grid",
  whatMakesDifferent: {
    title: "What makes moving in Baltimore City different",
    intro: "These are city rowhome and neighborhood realities — narrow streets, stairs, elevators, and permits — not county Beltway HOA defaults.",
    bullets: [
      {
        title: "Rowhomes and narrow streets rewrite labor hours",
        detail: "Long carries, stairs, and limited truck length dominate many blocks.",
      },
      {
        title: "Neighborhood micro-markets are not interchangeable",
        detail: "Fells Point, Hampden, Charles Village, and Mondawmin each change curb and access rules.",
      },
      {
        title: "Harbor / midtown elevators require building packets",
        detail: "COI and freight windows dominate tower jobs.",
      },
      {
        title: "I-95 / I-83 define portal-to-portal time to the county ring",
        detail: "City-to-county pairs look short on maps and regional at peak.",
      },
      {
        title: "Not Baltimore County suburban product as the default",
        detail: "Photo each address — city stock differs from Towson HOAs.",
      },
      {
        title: "Intrastate Maryland HHG registration vs interstate FMCSA",
        detail: "Moves entirely within Maryland by household goods carriers using commercial motor vehicles generally require active Maryland household goods mover registration with the Department of Labor, Division of Occupational and Professional Licensing. Match the legal name on the estimate to Maryland registration before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Baltimore City access zones",
  zonesIntro: "Plan by harbor/downtown elevators, southeast waterfront, central/north neighborhoods, and west/northwest city stock.",
  zones: [
    {
      id: "harbor-downtown",
      name: "Downtown, Harbor East & Inner Harbor multi-unit",
      shortName: "Harbor / downtown",
      neighborhoods: ["Downtown","Harbor East","Inner Harbor edges","Mount Vernon edges"],
      housingTypes: "High-rises, mid-rises, condos",
      challenges: ["Elevators and COI","Scarce curb staging","Event-day congestion"],
      moverTips: "Get building packets early. Prefer mid-week morning freight windows.",
      cityKeywords: ["downtown baltimore","harbor east","inner harbor"],
    },
    {
      id: "southeast",
      name: "Fells Point, Canton, Federal Hill & southeast",
      shortName: "Southeast",
      neighborhoods: ["Fells Point","Canton","Federal Hill","Locust Point edges"],
      housingTypes: "Rowhomes, condos, renovated multi-unit",
      challenges: ["Narrow streets","Stairs and long carries","Limited truck length"],
      moverTips: "Photo street width and stair access. Prefer smaller trucks when required.",
      cityKeywords: ["fells point","canton","federal hill"],
    },
    {
      id: "north-central",
      name: "Hampden, Charles Village, Roland Park edges",
      shortName: "North-central",
      neighborhoods: ["Hampden","Charles Village","Remington edges","Roland Park edges"],
      housingTypes: "Rowhomes, older SFH, multi-unit",
      challenges: ["Stairs and basements","Mixed curb rules","I-83 timing"],
      moverTips: "Survey stair width carefully. Confirm parking rules block by block.",
      cityKeywords: ["hampden","charles village","roland park"],
    },
    {
      id: "west-northwest",
      name: "West and northwest city corridors",
      shortName: "West / NW city",
      neighborhoods: ["Reservoir Hill edges","Mondawmin edges","Park Heights edges","Edmondson corridors"],
      housingTypes: "Rowhomes, multi-unit, mixed stock",
      challenges: ["Older stock access","Arterial congestion","Longer carries"],
      moverTips: "Photo access early. Clarify city vs county destinations on estimates.",
      cityKeywords: ["reservoir hill","mondawmin","park heights"],
    }
  ],
  costDrivers: {
    title: "What drives Baltimore City moving costs",
    intro: "Rowhome stairs, elevators, and narrow-street friction drive quotes more than square footage alone.",
    drivers: [
      { title: "Rowhome stairs & long carries", detail: "Labor hours dominate many city jobs." },
      { title: "Harbor elevator & curb friction", detail: "COI wait time spikes tower jobs." },
      { title: "I-95 / I-83 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Permit and parking soft costs", detail: "Limited legal staging rewrites crew plans." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$500–$1,700+", note: "Higher with stairs or elevators" },
      { label: "2–3BR rowhome or condo", value: "$1,500–$4,500+", note: "Narrow-street friction trends up" },
      { label: "3–4+ BR / tower / cross-metro", value: "$2,800–$9,000+", note: "Towers and city-county pairs highest" },
      { label: "Typical 2-person crew rate", value: "$115–$200+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Baltimore City",
    intro: "Lease turns, summer peak, event calendars, and winter ice reshape city windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-95/I-83 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book weekend crews early." },
      { title: "Month-end multi-family turns", detail: "Harbor elevators fill first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for narrow streets and stairs." }
    ],
  },
  specialized: [
    {
      id: "baltimore-city-rowhome-micro-markets",
      title: "Baltimore City rowhome & neighborhood micro-markets module",
      intro: "City estimates fail when street width, stair access, or building packets are ignored.",
      bullets: ["Photo alley/street width and stair access for rowhome jobs.","Request Harbor East/downtown building packets early.","Price I-95/I-83 pairs portal-to-portal to the county ring.","Never quote city jobs as Baltimore County HOA defaults.","Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Baltimore City?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Baltimore City Public Schools serves city addresses (not Baltimore County schools). Confirm zoning carefully." },
          { title: "Research sources", detail: "City schools tools and Maryland State Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Johns Hopkins, University of Maryland Medical Center, MedStar, and other systems serve city corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times across neighborhoods into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Rowhomes vs harbor elevators vs northwest mixed stock", detail: "Micro-markets differ sharply within short distances." },
          { title: "Cost variation", detail: "Waterfront renovated stock often prices differently from west/northwest multi-unit." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Harbor / downtown lifestyle", detail: "Elevator amenities with curb tradeoffs." },
          { title: "Southeast rowhome pattern", detail: "Walkable density with stair and street-width logistics." },
          { title: "North-central pattern", detail: "Neighborhood character with mixed multi-unit and SFH." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Healthcare, higher education, government, ports/logistics, and professional services shape employment." },
          { title: "Commute realism", detail: "I-95 and I-83 peaks are real for county and DC-bound workers." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Independent-city identity", detail: "Baltimore City is its own market — not Baltimore County suburbs or DC-collar product as the default." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Baltimore City resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Maryland household goods mover registration for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "City of Baltimore — official site", href: "https://www.baltimorecity.gov/", external: true },
      { label: "MDOT CHART traffic", href: "https://chart.maryland.gov/", external: true }
    ],
  },
  directoryHint: "Prefer rowhome/elevator experience and honest I-95 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
