import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const berksCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "berks",
  hubTitle: "Berks County Moving Intelligence Hub",
  eyebrow: "Berks · Reading regional market (not a Philly clone)",
  h1: "Moving in Berks County: Reading Access, Township Runs & US-222 Logistics",
  heroOpener: "Berks County is a Reading-centered regional market: city multi-unit and older stock, surrounding townships, US-222/US-422 logistics, and mid-state patterns that are not Philly collar freeways and not Lehigh Valley industrial corridors alone. A Reading multi-family unit, a Wyomissing HOA home, an Exeter twin, and a rural-edge lot do not share truck access or empty-mile risk. This hub is for Berks — not a renamed Montgomery page.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "US-222 · US-422 · I-78 links · PA-61 · PA-12",
  whatMakesDifferent: {
    title: "What makes moving in Berks County different",
    intro: "Reading regional city-and-township fabric — not Philly spillover or Allentown industrial mix.",
    bullets: [
      {
        title: "Reading multi-unit differs from township SFH",
        detail: "Access surveys matter more than county-wide rates.",
      },
      {
        title: "US-222 / US-422 define portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Hills and older stock appear in city corridors",
        detail: "Stairs and curb limits raise labor hours.",
      },
      {
        title: "Longer township empty miles are routine",
        detail: "Survey driveway access on rural edges.",
      },
      {
        title: "Berks is not Philly or Lehigh Valley",
        detail: "Do not reuse collar-county or Allentown assumptions here.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Berks access zones",
  zonesIntro: "Plan by Reading city, western suburbs, eastern corridors, and rural edges.",
  zones: [
    {
      id: "reading-city",
      name: "Reading city multi-unit & older stock",
      shortName: "Reading city",
      neighborhoods: ["Downtown Reading","City multi-family","Older SFH pockets"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Hills and stairs","Tight streets","Arterial congestion"],
      moverTips: "Photo curb and stairs. Prefer mid-week mornings.",
      cityKeywords: ["reading","downtown reading"],
    },
    {
      id: "west-suburbs",
      name: "Western suburban multi-family & HOA",
      shortName: "West suburbs",
      neighborhoods: ["Wyomissing","Sinking Spring edges","US-422 multi-family","HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","US-422 congestion","Long portal time to Reading core"],
      moverTips: "Collect HOA packets. Build arterial buffer.",
      cityKeywords: ["wyomissing","sinking spring","west reading"],
    },
    {
      id: "east-corridors",
      name: "Eastern corridors & small towns",
      shortName: "East corridors",
      neighborhoods: ["Exeter","Birdsboro edges","US-422 east multi-family"],
      housingTypes: "SFH, multi-family, twins",
      challenges: ["Arterial congestion","Mixed access types","Longer empty miles"],
      moverTips: "Prefer early starts. Survey driveway depth.",
      cityKeywords: ["exeter","birdsboro","st. lawrence"],
    },
    {
      id: "rural-edges",
      name: "Northern & southern rural edges",
      shortName: "Rural edges",
      neighborhoods: ["Kutztown edges","Southern tracts","Rural driveway lots"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey truck access. Prefer early starts for long pairs.",
      cityKeywords: ["kutztown","rural berks"],
    }
  ],
  costDrivers: {
    title: "What drives Berks County moving costs",
    intro: "City hills/stairs and township empty miles drive quotes.",
    drivers: [
      { title: "City stairs and curb friction", detail: "Labor hours rise without elevators." },
      { title: "US-222 / US-422 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Township empty miles", detail: "Distance work disguised as “local.”" },
      { title: "HOA soft costs in western suburbs", detail: "Gate lists push demand into peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,200+", note: "Higher with stairs" },
      { label: "2–3BR condo or modest SFH", value: "$1,200–$3,400+", note: "Township distance trends up" },
      { label: "3–4+ BR / long township", value: "$2,200–$6,200+", note: "Rural-edge pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Berks County",
    intro: "Family seasons and multi-family lease turns reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce arterial pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Month-end multi-family turns", detail: "City and western multi-unit fill first." },
      { title: "Winter ice and snow", detail: "Hills need weather contingency language." }
    ],
  },
  specialized: [
    {
      id: "berks-reading-regional",
      title: "Reading regional city & township module",
      intro: "Berks estimates fail when hills or township empty miles are ignored.",
      bullets: ["Survey stairs and curb in Reading city carefully.","Price long township pairs portal-to-portal.","Collect HOA packets for western suburban product.","Do not reuse Philly collar or Lehigh Valley assumptions here.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Berks County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Reading School District and numerous township districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, PDE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Tower Health Reading Hospital and regional facilities serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from outer townships. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "City vs western suburban stock", detail: "Older multi-unit and hills in Reading; more HOA multi-family west." },
          { title: "Cost variation", detail: "Western suburbs often price differently from rural edges." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Reading city lifestyle", detail: "Multi-unit amenities with hill/stair logistics." },
          { title: "Western suburb pattern", detail: "HOA product with arterial congestion." },
          { title: "Rural-edge lifestyle", detail: "Space with long empty-mile move logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, manufacturing, logistics, and education shape employment." },
          { title: "Commute realism", detail: "US-222 and US-422 peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Reading regional identity", detail: "Berks is distinct from Philly collar counties and Lehigh Valley industrial corridors." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Berks County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Berks County — official site", href: "https://www.berkspa.gov/", external: true },
      { label: "City of Reading", href: "https://www.readingpa.gov/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer Reading hill/stair experience and township empty-mile honesty. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
