import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const alleghenyCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "allegheny",
  hubTitle: "Allegheny County Moving Intelligence Hub",
  eyebrow: "Allegheny · Pittsburgh hills, bridges & neighborhood micro-markets",
  h1: "Moving in Allegheny County: Pittsburgh Hills, Stairs & Parkway Logistics",
  heroOpener: "Allegheny County is Pittsburgh’s hills-and-bridges market: neighborhood stairs, steep driveways, bridge approaches, winter access risk, and Parkway East/West/North congestion that is not Philadelphia rowhome logistics and not Westmoreland’s east-suburban pattern alone. A South Side rowhome, a Squirrel Hill twin, a Downtown condo, and a North Hills HOA two-story do not share truck access or I-376 portal time. This hub is for Allegheny — not a renamed Philly page.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-376 · I-279 · I-79 · Parkway East/West/North · PA-28",
  whatMakesDifferent: {
    title: "What makes moving in Allegheny County different",
    intro: "These are Pittsburgh realities — hills, stairs, bridges, and winter access — not Philly rowhomes or Lehigh Valley industrial corridors.",
    bullets: [
      {
        title: "Hills and stairs dominate labor hours",
        detail: "Long carries and multi-flight stairs beat map-mile quotes.",
      },
      {
        title: "Bridge approaches rewrite portal time",
        detail: "Short map miles become long clocks at peak.",
      },
      {
        title: "Winter ice and snow are operational constraints",
        detail: "Steep driveways need weather contingency language.",
      },
      {
        title: "Neighborhood micro-markets are not interchangeable",
        detail: "South Side differs from North Hills HOA product and Downtown elevators.",
      },
      {
        title: "Westmoreland pairs are regional, not city local",
        detail: "Keep county lines clear for drive time and authority assumptions.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Allegheny access zones",
  zonesIntro: "Plan by Downtown/North Shore, East End, South Side/South Hills, North Hills, and airport corridor.",
  zones: [
    {
      id: "downtown",
      name: "Downtown Pittsburgh & North Shore",
      shortName: "Downtown / North Shore",
      neighborhoods: ["Downtown","North Shore","Strip District edges","Cultural District"],
      housingTypes: "High-rises, mid-rises, lofts",
      challenges: ["COI and elevators","Event-day curb pressure","Bridge approach congestion"],
      moverTips: "Get building packets early. Prefer mid-week mornings. Avoid stadium event peaks when flexible.",
      cityKeywords: ["pittsburgh","downtown","north shore","strip district"],
    },
    {
      id: "east-end",
      name: "East End neighborhoods",
      shortName: "East End",
      neighborhoods: ["Squirrel Hill","Shadyside","Oakland","Lawrenceville edges"],
      housingTypes: "Twins, multi-unit, older SFH, some elevators",
      challenges: ["Hills and stairs","Student lease waves near Oakland","Tight streets"],
      moverTips: "Photo stairs and curb. Book academic peaks early near Oakland.",
      cityKeywords: ["squirrel hill","shadyside","oakland","lawrenceville"],
    },
    {
      id: "south-hills",
      name: "South Side & South Hills",
      shortName: "South Side / South Hills",
      neighborhoods: ["South Side","Mount Washington","Dormont edges","Mt. Lebanon edges"],
      housingTypes: "Rowhomes, twins, hillside SFH, multi-family",
      challenges: ["Steep grades","Narrow streets","Parkway West congestion"],
      moverTips: "Survey driveway grade. Prefer smaller trucks when needed. Build Parkway buffer.",
      cityKeywords: ["south side","mount washington","mt lebanon","dormont"],
    },
    {
      id: "north-hills",
      name: "North Hills suburban multi-family",
      shortName: "North Hills",
      neighborhoods: ["North Hills","Ross","McCandless edges","Wexford edges"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["I-79 / McKnight Rd congestion","HOA rules","Long portal time to Downtown"],
      moverTips: "Collect HOA packets. Price north-corridor pairs honestly.",
      cityKeywords: ["north hills","ross","mccandless","wexford"],
    }
  ],
  costDrivers: {
    title: "What drives Allegheny County moving costs",
    intro: "Hills, stairs, bridges, and Parkway portal time drive quotes.",
    drivers: [
      { title: "Hillside long carries and stairs", detail: "Labor hours rise when trucks cannot park at the door." },
      { title: "Parkway / bridge congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Winter weather contingency", detail: "Ice on grades can force reschedules." },
      { title: "Downtown elevator / COI buildings", detail: "Wait time adds cost." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,300+", note: "Higher with stairs or elevators" },
      { label: "2–3BR twin or modest SFH", value: "$1,300–$3,700+", note: "Hills trend up" },
      { label: "3–4+ BR / hillside / cross-county", value: "$2,400–$7,000+", note: "Steep access prices highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Allegheny County",
    intro: "Winter weather, university calendars, and family seasons reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce Parkway pain and clear curb." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "University lease waves near Oakland", detail: "May/August clusters fill multi-family crews." },
      { title: "Winter ice and snow", detail: "Confirm contingency for hillside addresses." }
    ],
  },
  specialized: [
    {
      id: "pittsburgh-hills-bridges",
      title: "Pittsburgh hills, stairs & bridge logistics module",
      intro: "Allegheny estimates fail when grade and bridge approaches are ignored.",
      bullets: ["Survey driveway grade and stair counts before final pricing.","Price Parkway and bridge pairs portal-to-portal.","Collect Downtown building packets early.","Clarify Allegheny vs Westmoreland destinations.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Allegheny County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Pittsburgh Public Schools and numerous suburban districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, PDE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "UPMC, Allegheny Health Network, and other facilities serve county corridors. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour and bridge-affected drive times. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Hillside city stock vs North Hills suburbs", detail: "Older twins and rowhomes dominate many city neighborhoods; HOA multi-family appears more on suburban edges." },
          { title: "Winter access realities", detail: "Steep driveways change move-day risk from December through March." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "City neighborhood lifestyle", detail: "Walkable amenities with hills/stairs tradeoffs." },
          { title: "North Hills pattern", detail: "Suburban product with longer Parkway portal time to core jobs." },
          { title: "South Hills pattern", detail: "Hillside living with grade logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, education, tech, manufacturing, and professional services shape employment." },
          { title: "Commute realism", detail: "Parkways and bridges are real bottlenecks. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Hills-and-bridges identity", detail: "Allegheny is distinct from Philly rowhomes and Westmoreland’s east-suburban fabric." },
          { title: "Climate", detail: "Four seasons with meaningful winter snow/ice. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Allegheny County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Allegheny County — official site", href: "https://www.alleghenycounty.us/", external: true },
      { label: "City of Pittsburgh", href: "https://www.pittsburghpa.gov/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer hillside/stair experience and Downtown elevator fluency; honest Parkway pricing. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
