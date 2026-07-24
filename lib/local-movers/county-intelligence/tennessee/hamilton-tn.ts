import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const hamiltonCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "hamilton",
  hubTitle: "Hamilton County Moving Intelligence Hub",
  eyebrow: "Hamilton · Chattanooga river/mountain-edge logistics & downtown revival",
  h1: "Moving in Hamilton County: Chattanooga Downtown, River Access & I-24 Logistics",
  heroOpener: "Hamilton County is Chattanooga’s river-and-ridge market: downtown revival multi-unit, North Shore and Southside pockets, mountain-edge driveways, and I-24 logistics that punish estimates built for flat Piedmont freeways alone. A downtown loft, a North Shore craftsman, a Hixson multi-family unit, and an East Brainerd HOA home do not share truck access or portal time. This hub is for Hamilton — not Nashville core copy or Knoxville university tips.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-24 · I-75 · US-27 · TN-153 · Broad Street corridor",
  whatMakesDifferent: {
    title: "What makes moving in Hamilton County different",
    intro: "These are Chattanooga river/mountain-edge realities — downtown revival product and I-24 timing — not Memphis loops or Sevier tourism spurs.",
    bullets: [
      {
        title: "Downtown multi-unit is elevator-first on many addresses",
        detail: "Building packets and dock rules beat verbal access promises.",
      },
      {
        title: "Mountain-edge grades appear outside the river core",
        detail: "Survey turn radius and driveway slope before final pricing.",
      },
      {
        title: "I-24 / I-75 define portal-to-portal time",
        detail: "Cross-county and cross-town pairs burn clock at peak.",
      },
      {
        title: "River-adjacent curb competition on event days",
        detail: "Waterfront and downtown events can close staging windows.",
      },
      {
        title: "Georgia border pairs are routine",
        detail: "Clarify Tennessee vs Georgia destinations for TDOR vs FMCSA assumptions.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Hamilton access zones",
  zonesIntro: "Plan by downtown/Southside, North Shore, Hixson/north corridors, and East Brainerd growth.",
  zones: [
    {
      id: "downtown-southside",
      name: "Downtown Chattanooga & Southside",
      shortName: "Downtown / Southside",
      neighborhoods: ["Downtown","Southside","MLK District edges","Riverfront multi-unit"],
      housingTypes: "Lofts, mid-rises, renovated multi-unit",
      challenges: ["COI/elevators","Event-day curb pressure","Tight historic streets"],
      moverTips: "Get building packets early. Prefer mid-week mornings. Avoid major event nights when flexible.",
      cityKeywords: ["chattanooga","downtown","southside","riverfront"],
    },
    {
      id: "north-shore",
      name: "North Shore & near-river neighborhoods",
      shortName: "North Shore",
      neighborhoods: ["North Shore","Hill City edges","Stringers Ridge approaches"],
      housingTypes: "Older SFH, multi-unit, hillside homes",
      challenges: ["Stairs and grades","Limited curb","Bridge approach congestion"],
      moverTips: "Photo curb and driveway grade. Prefer early starts.",
      cityKeywords: ["north shore","hill city","chattanooga"],
    },
    {
      id: "hixson-north",
      name: "Hixson & northern multi-family corridors",
      shortName: "Hixson / north",
      neighborhoods: ["Hixson","TN-153 multi-family","Middle Valley edges","Red Bank edges"],
      housingTypes: "Multi-family, townhomes, SFH",
      challenges: ["TN-153 congestion","Elevator buildings","Longer empty miles from downtown yards"],
      moverTips: "Build TN-153 buffer. Confirm elevator reservations. Collect HOA packets where applicable.",
      cityKeywords: ["hixson","red bank","middle valley"],
    },
    {
      id: "east-brainerd",
      name: "East Brainerd & eastern growth",
      shortName: "East Brainerd",
      neighborhoods: ["East Brainerd","Ooltewah edges","Apison edges","HOA villages"],
      housingTypes: "HOA SFH, townhomes, multi-family",
      challenges: ["I-75 congestion","HOA rules","Long portal time to river core"],
      moverTips: "Collect HOA packets. Price I-75 pairs honestly. Clarify Hamilton vs Georgia border addresses.",
      cityKeywords: ["east brainerd","ooltewah","apison"],
    }
  ],
  costDrivers: {
    title: "What drives Hamilton County moving costs",
    intro: "Elevator buildings, grades, and I-24 portal time drive quotes.",
    drivers: [
      { title: "Downtown elevator / COI buildings", detail: "Labor and wait time dominate core jobs." },
      { title: "Mountain-edge long carries", detail: "Grade access raises labor hours." },
      { title: "I-24 / I-75 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Cross-border empty miles", detail: "Georgia destinations change staging and authority assumptions." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,300+", note: "Higher with elevators or grades" },
      { label: "2–3BR condo or modest SFH", value: "$1,300–$3,600+", note: "HOA soft costs trend up" },
      { label: "3–4+ BR / long local / cross-border", value: "$2,400–$6,900+", note: "Long I-24 pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Hamilton County",
    intro: "Tourism, riverfront events, and family seasons reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-24 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Event and tourism weekends", detail: "Downtown staging competes with visitors — prefer mid-week when flexible." },
      { title: "Summer heat and storms", detail: "Prefer early starts; confirm weather contingency." }
    ],
  },
  specialized: [
    {
      id: "chattanooga-river-ridge",
      title: "Chattanooga river/ridge & I-24 logistics module",
      intro: "Hamilton estimates fail when downtown elevators or mountain-edge grades are ignored.",
      bullets: ["Request downtown building packets early.","Survey driveway grade on ridge-edge addresses.","Price I-24/I-75 pairs portal-to-portal.","Clarify Tennessee vs Georgia destinations.","Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Hamilton County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Hamilton County Schools is the primary public K–12 system. Assignment is address-based." },
          { title: "Research sources", detail: "District tools, Tennessee DOE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Erlanger, CHI Memorial, and other facilities serve Chattanooga corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from East Brainerd and Hixson. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "River-core multi-unit vs eastern HOA growth", detail: "Downtown lofts differ sharply from East Brainerd master plans." },
          { title: "Ridge-edge access realities", detail: "Grades affect move day more than square footage alone." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Downtown / Southside lifestyle", detail: "Urban amenities with elevator tradeoffs." },
          { title: "North Shore pattern", detail: "Near-river character with stair/grade logistics." },
          { title: "East Brainerd growth", detail: "HOA product with I-75 commute risk." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, manufacturing, logistics, tourism, education, and professional services shape employment." },
          { title: "Commute realism", detail: "I-24, I-75, and TN-153 peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "River-and-ridge identity", detail: "Hamilton is distinct from Nashville music-core and Memphis river loops despite shared “Tennessee metro” labels." },
          { title: "Climate", detail: "Hot humid summers and storms. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Hamilton County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Hamilton County — official site", href: "https://www.hamiltontn.gov/", external: true },
      { label: "City of Chattanooga", href: "https://chattanooga.gov/", external: true },
      { label: "Hamilton County Schools", href: "https://www.hcde.org/", external: true, note: "Boundaries & calendars" },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer downtown elevator experience; ridge-edge grade surveys; honest I-24 pricing. Verify TDOR intrastate and FMCSA as applicable.",
  lastReviewed: '2026-07-24',
});
