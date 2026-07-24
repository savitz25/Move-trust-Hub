import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const westmorelandCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "westmoreland",
  hubTitle: "Westmoreland County Moving Intelligence Hub",
  eyebrow: "Westmoreland · East-of-Pittsburgh suburbs/towns (Allegheny complement)",
  h1: "Moving in Westmoreland County: East Suburbs, Town Cores & US-30 Logistics",
  heroOpener: "Westmoreland County is Pittsburgh’s eastern complement: Greensburg and small-city multi-unit, suburban townships, longer empty miles from Allegheny yards, and US-30/I-76 logistics that are not Downtown Pittsburgh elevators and not South Hills stair product alone. A Greensburg multi-family unit, a Murrysville HOA home, a Latrobe twin, and a rural-edge lot do not share truck access or portal time. This hub is for Westmoreland — not an Allegheny rename.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-76 · US-30 · PA-66 · I-70 links · PA-119",
  whatMakesDifferent: {
    title: "What makes moving in Westmoreland County different",
    intro: "East-of-Pittsburgh towns and townships — not city hills/stairs as the default product.",
    bullets: [
      {
        title: "Longer empty miles from Pittsburgh yards are real",
        detail: "Even “local” Westmoreland pairs can price as distance work for city-based crews.",
      },
      {
        title: "US-30 / I-76 define portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Small-city multi-unit differs from rural-edge lots",
        detail: "Access surveys matter more than county-wide rates.",
      },
      {
        title: "Winter access still matters on hills and rural driveways",
        detail: "Confirm weather contingency language.",
      },
      {
        title: "Westmoreland is not Allegheny",
        detail: "Eastern suburban/town logistics differ from Pittsburgh neighborhood micro-markets.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Westmoreland access zones",
  zonesIntro: "Plan by Greensburg core, western approaches toward Allegheny, eastern small cities, and rural edges.",
  zones: [
    {
      id: "greensburg",
      name: "Greensburg multi-unit & older stock",
      shortName: "Greensburg",
      neighborhoods: ["Downtown Greensburg","City multi-family","Older SFH pockets"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Tight streets","Mixed stairs and elevators","Arterial congestion"],
      moverTips: "Photo curb. Confirm unit access type. Prefer mid-week mornings.",
      cityKeywords: ["greensburg","downtown greensburg"],
    },
    {
      id: "west-approaches",
      name: "Western approaches toward Allegheny",
      shortName: "West approaches",
      neighborhoods: ["Murrysville","Monroeville-edge (verify county)","US-22 multi-family","HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["Cross-county confusion","US-22 congestion","Long portal time to Pittsburgh core"],
      moverTips: "Clarify Westmoreland vs Allegheny addresses. Collect HOA packets. Build arterial buffer.",
      cityKeywords: ["murrysville","export","delmont"],
    },
    {
      id: "east-towns",
      name: "Eastern small cities & corridors",
      shortName: "East towns",
      neighborhoods: ["Latrobe","Jeannette edges","US-30 multi-family"],
      housingTypes: "SFH, multi-family, twins",
      challenges: ["Long empty miles","US-30 congestion","Mixed access types"],
      moverTips: "Prefer early starts. Survey driveway depth.",
      cityKeywords: ["latrobe","jeannette","irwin"],
    },
    {
      id: "rural-edges",
      name: "Northern & southern rural edges",
      shortName: "Rural edges",
      neighborhoods: ["New Kensington edges","Southern tracts","Rural driveway lots"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey truck access. Prefer early starts for long pairs.",
      cityKeywords: ["new kensington","rural westmoreland"],
    }
  ],
  costDrivers: {
    title: "What drives Westmoreland County moving costs",
    intro: "Pittsburgh-linked empty miles and town multi-unit access drive quotes.",
    drivers: [
      { title: "Longer empty miles from Allegheny yards", detail: "Distance work disguised as “local.”" },
      { title: "US-30 / I-76 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs on western approaches", detail: "Gate lists push demand into peak windows." },
      { title: "Winter rural driveway access", detail: "Ice and soft surfaces raise time risk." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,200+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,200–$3,400+", note: "Long portal times trend up" },
      { label: "3–4+ BR / long Pittsburgh-linked", value: "$2,200–$6,400+", note: "Cross-county pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Westmoreland County",
    intro: "Family seasons, multi-family turns, and winter weather reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce US-30 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "Western multi-unit fills first." },
      { title: "Winter ice and snow", detail: "Confirm contingency for rural driveway access." }
    ],
  },
  specialized: [
    {
      id: "westmoreland-east-pittsburgh",
      title: "East-of-Pittsburgh suburbs & towns module",
      intro: "Westmoreland estimates fail when empty miles or Allegheny pairs are ignored.",
      bullets: ["Price Pittsburgh-linked pairs as logistics days.","Clarify Westmoreland vs Allegheny destinations.","Collect HOA packets for western approach product.","Do not reuse Downtown Pittsburgh elevator assumptions as county defaults.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Westmoreland County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Numerous independent school districts serve Westmoreland addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, PDE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Excela Health and Pittsburgh-metro systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour times into Allegheny specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Town multi-unit vs western suburban stock", detail: "Greensburg multi-unit differs from Murrysville HOA product and rural edges." },
          { title: "Cost variation", detail: "Western approaches often price differently from eastern small cities." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Greensburg lifestyle", detail: "County-seat amenities with multi-unit logistics." },
          { title: "Western approach pattern", detail: "Closer Pittsburgh access with HOA logistics." },
          { title: "Eastern small-city pattern", detail: "Town living with longer empty-mile move logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Allegheny; local healthcare, manufacturing, education, and retail also employ residents." },
          { title: "Commute realism", detail: "US-30 and Parkway-adjacent peaks are real. Test drive peak routes into Pittsburgh." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "East-of-Pittsburgh identity", detail: "Westmoreland complements Allegheny without cloning city hills/stairs micro-markets." },
          { title: "Climate", detail: "Four seasons with meaningful winter snow/ice. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Westmoreland County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Westmoreland County — official site", href: "https://www.westmorelandcountypa.gov/", external: true },
      { label: "City of Greensburg", href: "https://www.greensburgpa.org/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer honest Pittsburgh empty-mile pricing and western HOA fluency. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
