import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizePaPack } from '@/lib/local-movers/county-intelligence/pennsylvania/pa-shared';

export const lancasterCountyPaIntelligence: CountyIntelligencePack = finalizePaPack({
  countySlug: "lancaster",
  hubTitle: "Lancaster County Moving Intelligence Hub",
  eyebrow: "Lancaster · Mid-state city + townships (not Philly spillover)",
  h1: "Moving in Lancaster County: City Access, Township Runs & US-30 Logistics",
  heroOpener: "Lancaster County is a mid-state market: Lancaster city multi-unit and older stock, surrounding townships with longer rural-edge runs, tourism pulses near certain corridors, and US-30/US-222 logistics that are not Philly collar freeways. A downtown Lancaster multi-family unit, a Manheim Township HOA home, an Ephrata twin, and a rural-edge farmhouse approach do not share truck access or empty-mile risk. This hub is for Lancaster — not a renamed Montgomery page.",
  heroCredibility:
    'PA PUC household goods authority for intrastate moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "US-30 · US-222 · PA-283 · I-76 links · PA-23",
  whatMakesDifferent: {
    title: "What makes moving in Lancaster County different",
    intro: "Mid-state city-and-township fabric — not Philly collar congestion patterns.",
    bullets: [
      {
        title: "City multi-unit and township SFH are different products",
        detail: "Do not price downtown Lancaster like rural-edge lots.",
      },
      {
        title: "US-30 / US-222 define portal time",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Tourism pulses affect some corridors",
        detail: "Prefer mid-week near visitor-heavy edges when flexible.",
      },
      {
        title: "Longer township empty miles are routine",
        detail: "Survey driveway access on rural edges.",
      },
      {
        title: "Lancaster is not Philly spillover",
        detail: "Mid-state logistics differ from I-95 collar counties.",
      },
      {
        title: 'Intrastate PA rules vs interstate authority',
        detail:
          'Moves entirely within Pennsylvania are generally subject to Pennsylvania Public Utility Commission (PUC) household goods authority. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Lancaster access zones",
  zonesIntro: "Plan by Lancaster city, northern townships, eastern corridors, and southern/western rural edges.",
  zones: [
    {
      id: "lancaster-city",
      name: "Lancaster city multi-unit & older stock",
      shortName: "Lancaster city",
      neighborhoods: ["Downtown Lancaster","City multi-family","Older SFH pockets"],
      housingTypes: "Multi-family, twins, older SFH",
      challenges: ["Tight streets","Mixed stairs and elevators","Event-day curb pressure"],
      moverTips: "Photo curb. Confirm unit access type. Prefer mid-week mornings.",
      cityKeywords: ["lancaster","downtown lancaster"],
    },
    {
      id: "north-townships",
      name: "Northern township growth",
      shortName: "North townships",
      neighborhoods: ["Manheim Township","Lititz edges","US-222 multi-family","HOA villages"],
      housingTypes: "HOA SFH, multi-family, townhomes",
      challenges: ["HOA rules","US-222 congestion","Longer empty miles from city yards"],
      moverTips: "Collect HOA packets. Build arterial buffer.",
      cityKeywords: ["manheim township","lititz","neffsville"],
    },
    {
      id: "east-corridors",
      name: "Eastern corridors & small cities",
      shortName: "East corridors",
      neighborhoods: ["Ephrata","New Holland edges","US-322 corridors"],
      housingTypes: "SFH, multi-family, twins",
      challenges: ["Arterial congestion","Mixed access types","Long portal time to Lancaster city"],
      moverTips: "Prefer early starts. Survey driveway depth.",
      cityKeywords: ["ephrata","new holland"],
    },
    {
      id: "rural-edges",
      name: "Southern & western rural edges",
      shortName: "Rural edges",
      neighborhoods: ["Quarryville edges","Columbia edges","Rural driveway lots"],
      housingTypes: "SFH, rural-edge lots",
      challenges: ["Long empty miles","Soft surfaces after rain","Limited alternate routes"],
      moverTips: "Survey truck access. Prefer early starts for long pairs.",
      cityKeywords: ["quarryville","columbia","rural lancaster"],
    }
  ],
  costDrivers: {
    title: "What drives Lancaster County moving costs",
    intro: "Township empty miles and city multi-unit access drive quotes.",
    drivers: [
      { title: "Longer township empty miles", detail: "Distance work disguised as “local.”" },
      { title: "City multi-unit access", detail: "Stairs and elevators raise labor hours." },
      { title: "US-30 / US-222 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs in growth townships", detail: "Gate lists push demand into peak windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with elevators" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,500+", note: "Township distance trends up" },
      { label: "3–4+ BR / long township", value: "$2,300–$6,500+", note: "Rural-edge pairs price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$170+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Lancaster County",
    intro: "Family seasons, multi-family turns, and tourism pulses reshape access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce arterial pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Tourism-adjacent peak weekends", detail: "Prefer mid-week near visitor-heavy edges when flexible." },
      { title: "Winter ice and snow", detail: "Confirm contingency for rural driveway access." }
    ],
  },
  specialized: [
    {
      id: "lancaster-midstate",
      title: "Mid-state city & township logistics module",
      intro: "Lancaster estimates fail when township empty miles are ignored.",
      bullets: ["Price long township pairs portal-to-portal.","Survey rural-edge driveway access carefully.","Collect HOA packets for northern growth product.","Do not reuse Philly collar assumptions here.","Verify PA PUC authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Lancaster County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "School District of Lancaster and numerous township districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, PDE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Penn Medicine Lancaster General Health and regional facilities serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from outer townships. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "City vs township stock", detail: "Multi-unit and older stock in the city; more SFH/HOA in surrounding townships." },
          { title: "Cost variation", detail: "City multi-family often prices differently from rural-edge lots." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "City lifestyle", detail: "Walkable amenities with multi-unit logistics." },
          { title: "Northern township pattern", detail: "HOA growth with arterial congestion." },
          { title: "Rural-edge lifestyle", detail: "Space with long empty-mile move logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Healthcare, manufacturing, agriculture-related industry, education, and tourism services shape employment." },
          { title: "Commute realism", detail: "US-30 and US-222 peaks are real. Test drive peak routes." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Mid-state identity", detail: "Lancaster is distinct from Philly collar counties and Pittsburgh hills." },
          { title: "Climate", detail: "Hot humid summers and winter ice/snow. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Lancaster County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify PA PUC authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Lancaster County — official site", href: "https://www.lancastercountypa.gov/", external: true },
      { label: "City of Lancaster", href: "https://cityoflancasterpa.com/", external: true },
      { label: "PennDOT 511PA traffic", href: "https://www.511pa.com/", external: true }
    ],
  },
  directoryHint: "Prefer township empty-mile honesty and city multi-unit access surveys. Verify PA PUC in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
