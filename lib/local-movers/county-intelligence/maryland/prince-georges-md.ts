import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMdPack } from '@/lib/local-movers/county-intelligence/maryland/md-shared';

export const princeGeorgesCountyMdIntelligence: CountyIntelligencePack = finalizeMdPack({
  countySlug: "prince-georges",
  hubTitle: "Prince George's County Moving Intelligence Hub",
  eyebrow: "Prince George's · DC-east, National Harbor/Bowie/College Park & I-495/I-95",
  h1: "Moving in Prince George's County: DC-East Patterns, National Harbor & I-495/I-95 Logistics",
  heroOpener: "Prince George's County is Maryland’s DC-east metro: National Harbor multi-unit, College Park campus waves, Bowie and Upper Marlboro suburban stock, and I-495/I-95/US-50 portal time that is not Bethesda high-rise product and not Fairfax Virginia logistics. A National Harbor condo, a College Park multi-family turn, a Bowie HOA two-story, and a Largo multi-unit do not share truck access or empty-mile risk. This hub is for Prince George's — not a Montgomery clone.",
  heroCredibility:
    'Maryland household goods mover registration (Dept. of Labor) for intrastate MD moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-495 · I-95 · US-50 · MD-4 · MD-214",
  whatMakesDifferent: {
    title: "What makes moving in Prince George's County different",
    intro: "These are DC-east / PG realities — National Harbor staging, campus calendars, and beltway timing — not Montgomery northwest federal campuses as the default.",
    bullets: [
      {
        title: "National Harbor and inner-belt multi-unit rewrite staging plans",
        detail: "Elevators, hotel-adjacent congestion, and curb limits dominate waterfront jobs.",
      },
      {
        title: "College Park / UMD lease cycles cluster crews",
        detail: "Academic peaks fill elevators and street parking first.",
      },
      {
        title: "I-495 / I-95 / US-50 define portal-to-portal time",
        detail: "East-of-DC pairs look local on maps and regional at peak.",
      },
      {
        title: "Bowie / Upper Marlboro suburban product is not National Harbor product",
        detail: "HOA packets and longer empty miles rewrite quotes.",
      },
      {
        title: "Not Montgomery northwest and not DC city defaults alone",
        detail: "Treat PG as its own east-metro inventory pattern.",
      },
      {
        title: "Intrastate Maryland HHG registration vs interstate FMCSA",
        detail: "Moves entirely within Maryland by household goods carriers using commercial motor vehicles generally require active Maryland household goods mover registration with the Department of Labor, Division of Occupational and Professional Licensing. Match the legal name on the estimate to Maryland registration before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Prince George's access zones",
  zonesIntro: "Plan by National Harbor/inner south, College Park, Bowie/central suburbs, and Upper Marlboro/south growth.",
  zones: [
    {
      id: "national-harbor",
      name: "National Harbor, Oxon Hill & inner south multi-unit",
      shortName: "National Harbor",
      neighborhoods: ["National Harbor","Oxon Hill","Fort Washington edges"],
      housingTypes: "High-rises, condos, multi-family",
      challenges: ["Elevators and COI","Tourism/event congestion","I-495 peak timing"],
      moverTips: "Get building packets early. Avoid major event peaks when flexible.",
      cityKeywords: ["national harbor","oxon hill"],
    },
    {
      id: "college-park",
      name: "College Park, Hyattsville & UMD-adjacent stock",
      shortName: "College Park",
      neighborhoods: ["College Park","Hyattsville","Riverdale Park edges","Greenbelt edges"],
      housingTypes: "Student multi-family, older SFH, mid-rises",
      challenges: ["Lease-end waves","Scarce curb staging","US-1 / I-95 timing"],
      moverTips: "Book academic peaks early. Confirm elevator reservations.",
      cityKeywords: ["college park","hyattsville","greenbelt"],
    },
    {
      id: "bowie-central",
      name: "Bowie, Largo & central suburban belt",
      shortName: "Bowie / Largo",
      neighborhoods: ["Bowie","Largo","Mitchellville edges","Kettering edges"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["US-50 / MD-4 congestion","HOA rules","Longer portal time to DC core"],
      moverTips: "Collect HOA packets. Price central pairs portal-to-portal.",
      cityKeywords: ["bowie","largo"],
    },
    {
      id: "upper-marlboro-south",
      name: "Upper Marlboro, Clinton & south growth",
      shortName: "South PG",
      neighborhoods: ["Upper Marlboro","Clinton","Brandywine edges","Accokeek edges"],
      housingTypes: "SFH, multi-family, growth suburbs",
      challenges: ["MD-4 / MD-5 timing","Longer empty miles","HOA pockets"],
      moverTips: "Price south pairs honestly. Photo driveway and street width.",
      cityKeywords: ["upper marlboro","clinton","brandywine"],
    }
  ],
  costDrivers: {
    title: "What drives Prince George's County moving costs",
    intro: "Multi-unit access, campus peaks, and I-495/I-95 portal time drive quotes more than bedroom count alone.",
    drivers: [
      { title: "National Harbor elevator & event friction", detail: "Waterfront labor hours spike." },
      { title: "Campus multi-unit lease waves", detail: "UMD peaks fill elevators first." },
      { title: "I-495 / I-95 / US-50 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on suburban belts", detail: "Gate lists push peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$500–$1,650+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,500–$4,300+", note: "Multi-unit friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,800–$9,000+", note: "Long beltway pairs highest" },
      { label: "Typical 2-person crew rate", value: "$115–$200+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Prince George's County",
    intro: "UMD calendars, federal adjacency peaks, summer family demand, and winter ice reshape windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-495 pain." },
      { title: "Academic peaks: August and May", detail: "Book College Park multi-unit far ahead." },
      { title: "Peak family season: late May–mid-August", detail: "Book Bowie Saturdays early." },
      { title: "Winter ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "pg-dc-east-national-harbor-college-park",
      title: "DC-east National Harbor & College Park module",
      intro: "Prince George's estimates fail when campus waves, National Harbor packets, or I-495 empty miles are treated like Montgomery northwest defaults.",
      bullets: ["Request National Harbor building packets early; survey College Park curb carefully.","Price I-495/I-95/US-50 pairs portal-to-portal.","Align multi-unit moves with UMD calendars when possible.","Clarify PG vs Montgomery/Anne Arundel destinations on multi-county estimates.","Verify Maryland HHG registration for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Prince George's County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Prince George's County Public Schools serves most addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "PGCPS tools and Maryland State Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "UM Capital Region, Luminis, MedStar affiliates, and DC systems (via commute) serve east-metro corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Bowie and Upper Marlboro into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Waterfront multi-unit vs suburban HOA stock", detail: "National Harbor product differs from Bowie two-stories." },
          { title: "Cost variation", detail: "Inner-belt renovated stock often prices differently from far-south multi-family." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "National Harbor lifestyle", detail: "Waterfront multi-unit with elevator tradeoffs." },
          { title: "College Park pattern", detail: "Campus multi-unit density and academic calendars." },
          { title: "Bowie suburban pattern", detail: "HOA product with US-50 logistics." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "Federal agencies (including joint-base adjacency), education, healthcare, logistics, and professional services shape employment." },
          { title: "Commute realism", detail: "I-495, I-95, and US-50 peaks are real. Test drive peak routes before choosing a submarket." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "DC-east identity", detail: "Prince George's is Maryland’s east-of-DC metro — not Montgomery northwest or Baltimore defaults." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Prince George's County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Maryland household goods mover registration for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Prince George's County — official site", href: "https://www.princegeorgescountymd.gov/", external: true },
      { label: "MDOT CHART traffic", href: "https://chart.maryland.gov/", external: true }
    ],
  },
  directoryHint: "Prefer multi-unit/campus experience and honest I-495 pricing. Verify Maryland HHG registration in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
