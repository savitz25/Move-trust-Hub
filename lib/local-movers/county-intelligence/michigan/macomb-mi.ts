import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeMiPack } from '@/lib/local-movers/county-intelligence/michigan/mi-shared';

export const macombCountyMiIntelligence: CountyIntelligencePack = finalizeMiPack({
  countySlug: "macomb",
  hubTitle: "Macomb County Moving Intelligence Hub",
  eyebrow: "Macomb · Warren/Sterling Heights east-metro & I-94/M-59",
  h1: "Moving in Macomb County: Warren–Sterling Heights East Metro, Industrial Mix & I-94/M-59 Logistics",
  heroOpener: "Macomb County is Detroit’s east-metro industrial-suburban belt: Warren and Sterling Heights manufacturing adjacency, Clinton Township multi-family, lakeshore edges toward St. Clair Shores, and I-94/M-53/M-59 portal time that is not Birmingham village product and not Flint regional logistics. A Warren ranch, a Sterling Heights two-story, a multi-family lease turn, and a northern Macomb township home do not share truck access or empty-mile risk. This hub is for Macomb — not an Oakland clone or Wayne downtown page.",
  heroCredibility:
    'Michigan motor carrier / household goods authority (MSP CVED) for intrastate MI moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-94 · M-53 · M-59 · I-696 links · Gratiot corridors",
  whatMakesDifferent: {
    title: "What makes moving in Macomb County different",
    intro: "These are east-metro Macomb realities — industrial corridors, suburban growth, and I-94 timing — not Oakland corporate villages or Detroit core elevators as the default.",
    bullets: [
      {
        title: "Warren / Sterling Heights industrial-suburban mix",
        detail: "Plant-adjacent traffic and shift-change windows reshape crew timing.",
      },
      {
        title: "East-metro multi-family lease waves cluster demand",
        detail: "Month-end turns fill elevators and stair buildings first.",
      },
      {
        title: "I-94 / M-53 / M-59 define portal-to-portal time",
        detail: "North-south and lakeshore pairs look local on maps and regional at peak.",
      },
      {
        title: "Not Oakland north-metro HOA product by default",
        detail: "Macomb industrial-suburban stock differs from Troy/Birmingham executive patterns.",
      },
      {
        title: "Lake-effect winter still hits east-metro schedules",
        detail: "Confirm driveway and curb contingency on storm days.",
      },
      {
        title: "Intrastate Michigan motor carrier authority vs interstate FMCSA",
        detail: "Moves entirely within Michigan by household goods carriers are generally subject to Michigan motor carrier / household goods operating authority under the Motor Carrier Act, administered through MSP CVED. Match the legal name on the estimate to Michigan authority search tools before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Macomb access zones",
  zonesIntro: "Plan by Warren industrial-adjacent, Sterling Heights growth, Clinton Township multi-family, and northern/lakeshore edges.",
  zones: [
    {
      id: "warren-industrial",
      name: "Warren & industrial-adjacent corridors",
      shortName: "Warren",
      neighborhoods: ["Warren","Center Line edges","Eastpointe edges"],
      housingTypes: "SFH, multi-family, industrial-adjacent stock",
      challenges: ["Shift-change traffic","Older basements/stairs","I-696 / Mound Rd congestion"],
      moverTips: "Avoid plant shift peaks when flexible. Survey older stock access carefully.",
      cityKeywords: ["warren","center line"],
    },
    {
      id: "sterling-heights",
      name: "Sterling Heights growth suburbs",
      shortName: "Sterling Heights",
      neighborhoods: ["Sterling Heights","Utica edges","Shelby Twp edges"],
      housingTypes: "SFH, multi-family, HOA pockets",
      challenges: ["M-59 congestion","HOA rules","Longer runs north"],
      moverTips: "Collect HOA packets. Price M-59 portal time to southern Macomb honestly.",
      cityKeywords: ["sterling heights","utica","shelby"],
    },
    {
      id: "clinton-multi",
      name: "Clinton Township multi-family belt",
      shortName: "Clinton Twp",
      neighborhoods: ["Clinton Township","Mount Clemens edges","Harrison Twp edges"],
      housingTypes: "Multi-family, condos, SFH mix",
      challenges: ["Elevator reservations","Lease-end waves","Gratiot / I-94 timing"],
      moverTips: "Book elevators early for month-end. Confirm unit access type.",
      cityKeywords: ["clinton township","mount clemens"],
    },
    {
      id: "north-lakeshore",
      name: "Northern Macomb & lakeshore edges",
      shortName: "North / lakeshore",
      neighborhoods: ["St. Clair Shores edges","New Baltimore edges","Macomb Twp","Chesterfield edges"],
      housingTypes: "SFH, lake-adjacent stock, multi-family",
      challenges: ["Longer empty miles","Winter lake-effect","M-53 / I-94 timing"],
      moverTips: "Price northern pairs portal-to-portal. Photo driveway and street width.",
      cityKeywords: ["st clair shores","macomb township","chesterfield"],
    }
  ],
  costDrivers: {
    title: "What drives Macomb County moving costs",
    intro: "Industrial-corridor timing, multi-family access, and I-94/M-59 portal time drive quotes more than square footage alone.",
    drivers: [
      { title: "Multi-family elevator & stair friction", detail: "Lease-end labor hours spike." },
      { title: "I-94 / M-53 / M-59 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Industrial shift-change windows", detail: "Crew timing near Warren corridors matters." },
      { title: "Winter lake-effect contingency", detail: "East-metro snow can slip schedules." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$480–$1,550+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,450–$4,000+", note: "Multi-family friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,600–$7,500+", note: "Long I-94/M-59 pairs highest" },
      { label: "Typical 2-person crew rate", value: "$110–$185+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Macomb County",
    intro: "Manufacturing calendars, multi-family turns, summer peak, and lake-effect winter reshape east-metro windows.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce I-94/M-59 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Clinton Twp and Sterling multi-unit fill first." },
      { title: "Winter ice and lake-effect snow", detail: "Confirm contingency for driveway access." }
    ],
  },
  specialized: [
    {
      id: "macomb-warren-sterling-east-metro",
      title: "Warren/Sterling Heights east-metro & industrial mix module",
      intro: "Macomb estimates fail when industrial traffic windows, multi-family access, or I-94/M-59 empty miles are ignored.",
      bullets: ["Survey multi-unit elevators and older SFH stairs before final quotes.","Price I-94/M-53/M-59 pairs portal-to-portal.","Avoid plant shift peaks near Warren industrial corridors when flexible.","Clarify Macomb vs Oakland/Wayne destinations on multi-county estimates.","Verify Michigan motor carrier authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Macomb County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Warren, Sterling Heights, Chippewa Valley, L’Anse Creuse, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Michigan Department of Education data beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Henry Ford Macomb, Corewell/Beaumont sites, and other systems serve east-metro corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from northern Macomb into major campuses. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Industrial-adjacent SFH vs multi-family growth", detail: "Warren product differs from Sterling Heights and northern township stock." },
          { title: "Cost variation", detail: "Lakeshore-edge and multi-family product can price differently from inland two-stories." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Warren industrial-suburban pattern", detail: "Plant-adjacent logistics with older SFH stock." },
          { title: "Sterling Heights growth pattern", detail: "Suburban SFH/multi-family with M-59 timing." },
          { title: "Northern / lakeshore pattern", detail: "Longer empty miles and winter lake-effect risk." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Auto/defense manufacturing, suppliers, healthcare, and logistics shape east-metro employment." },
          { title: "Commute realism", detail: "I-94, M-53, and M-59 peaks are real. Test drive peak routes before choosing a submarket." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "East-metro identity", detail: "Macomb is east Detroit metro industrial-suburban — not Oakland corporate villages or Flint regional defaults." },
          { title: "Climate", detail: "Hot humid summers and lake-effect winter. Plan outdoor staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Macomb County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Michigan motor carrier / household goods authority (MSP CVED) for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Macomb County — official site", href: "https://www.macombgov.org/", external: true },
      { label: "MiDrive traffic (MDOT)", href: "https://mdotjboss.state.mi.us/MiDrive/", external: true }
    ],
  },
  directoryHint: "Prefer multi-family and industrial-corridor experience with honest I-94/M-59 pricing. Verify Michigan motor carrier authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
