import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeInPack } from '@/lib/local-movers/county-intelligence/indiana/in-shared';

export const elkhartCountyInIntelligence: CountyIntelligencePack = finalizeInPack({
  countySlug: "elkhart",
  hubTitle: "Elkhart County Moving Intelligence Hub",
  eyebrow: "Elkhart · RV/manufacturing corridor, not South Bend clone",
  h1: "Moving in Elkhart County: RV Manufacturing Corridor, Goshen Access & I-80/90 Logistics",
  heroOpener: "Elkhart County is RV and manufacturing corridor logistics — not a South Bend university clone: Elkhart multi-unit and industrial adjacency, Goshen stock, Bristol/Middlebury edges, and I-80/90/US-20 portal time that is not Notre Dame lease-wave product and not Fort Wayne ring defaults. An industrial-adjacent multi-family unit, a Goshen two-story, and a Middlebury HOA ranch do not share truck access or empty-mile risk. This hub is for Elkhart — not a St. Joseph rename.",
  heroCredibility:
    'Indiana DOR household goods operating authority (IC 8-2.1-22) for intrastate IN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "I-80/90 · US-20 · US-33 · SR-19",
  whatMakesDifferent: {
    title: "What makes moving in Elkhart County different",
    intro: "These are RV/manufacturing corridor realities — industrial timing, plant-adjacent traffic, and US-20 logistics — not South Bend campus elevators as the default.",
    bullets: [
      {
        title: "RV and manufacturing calendars create hard report dates",
        detail: "Plant schedules and shift-change windows reshape crew timing.",
      },
      {
        title: "Elkhart industrial-adjacent multi-unit differs from Goshen SFH product",
        detail: "Survey access type carefully — not one corridor product.",
      },
      {
        title: "I-80/90 / US-20 define portal-to-portal time",
        detail: "Pairs toward South Bend or Michigan look regional at peak.",
      },
      {
        title: "Not a South Bend university clone",
        detail: "Manufacturing density and empty miles differ from ND multi-unit waves.",
      },
      {
        title: "Amish-country and rural edges add access friction",
        detail: "Photo driveway grades and turn radius early.",
      },
      {
        title: "Intrastate Indiana DOR HHG authority vs interstate FMCSA",
        detail: "Moves entirely within Indiana by for-hire household goods carriers generally require a Certificate of Public Convenience and Necessity (Indiana Operating Authority) from the Indiana Department of Revenue Motor Carrier Services under IC 8-2.1-22. Match the legal name on the estimate to Indiana authority before you deposit. Any out-of-state leg needs active FMCSA USDOT (and usually MC) authority — verify on FMCSA SAFER.",
      },
    ],
  },
  zonesHeading: "Elkhart access zones",
  zonesIntro: "Plan by Elkhart city/industrial, Goshen, Bristol/Middlebury, and Nappanee/south edges.",
  zones: [
    {
      id: "elkhart-city",
      name: "Elkhart city & industrial multi-unit belt",
      shortName: "Elkhart city",
      neighborhoods: ["Elkhart","downtown edges","industrial multi-family corridors"],
      housingTypes: "Multi-family, SFH, industrial-adjacent stock",
      challenges: ["Shift-change traffic","Mixed stairs and elevators","US-20 congestion"],
      moverTips: "Avoid plant shift peaks when flexible. Survey multi-unit access type.",
      cityKeywords: ["elkhart"],
    },
    {
      id: "goshen",
      name: "Goshen city & central stock",
      shortName: "Goshen",
      neighborhoods: ["Goshen","downtown Goshen edges","US-33 corridors"],
      housingTypes: "SFH, multi-family, mixed stock",
      challenges: ["US-33 congestion","Mixed access","Longer empty miles to Elkhart plants"],
      moverTips: "Clarify Goshen vs Elkhart destinations. Photo curb carefully.",
      cityKeywords: ["goshen"],
    },
    {
      id: "bristol-middlebury",
      name: "Bristol, Middlebury & east corridor edges",
      shortName: "Bristol / Middlebury",
      neighborhoods: ["Bristol","Middlebury","east industrial edges"],
      housingTypes: "SFH, multi-family, rural-adjacent stock",
      challenges: ["Longer empty miles","Industrial traffic","I-80/90 timing"],
      moverTips: "Price east pairs honestly. Confirm driveway access.",
      cityKeywords: ["bristol","middlebury"],
    },
    {
      id: "nappanee-south",
      name: "Nappanee, Wakarusa & south edges",
      shortName: "Nappanee / south",
      neighborhoods: ["Nappanee","Wakarusa edges","south rural roads"],
      housingTypes: "SFH, rural stock, limited multi-family",
      challenges: ["Longer empty miles","Rural access","US-6 / SR-19 timing"],
      moverTips: "Photo driveway and turn radius. Price rural pairs portal-to-portal.",
      cityKeywords: ["nappanee","wakarusa"],
    }
  ],
  costDrivers: {
    title: "What drives Elkhart County moving costs",
    intro: "Industrial timing and I-80/90 empty miles drive quotes more than bedroom count alone.",
    drivers: [
      { title: "Industrial shift-change windows", detail: "Crew timing near plant corridors matters." },
      { title: "I-80/90 / US-20 congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "Multi-unit access friction", detail: "Elkhart labor hours spike." },
      { title: "Rural empty miles south/east", detail: "Longer hauls cost more than map distance suggests." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$380–$1,300+", note: "Higher with elevators or long carries" },
      { label: "2–3BR condo or modest SFH", value: "$1,200–$3,400+", note: "Industrial friction trends up" },
      { label: "3–4+ BR / cross-metro", value: "$2,100–$6,500+", note: "Chicago/South Bend pairs highest" },
      { label: "Typical 2-person crew rate", value: "$90–$165+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Elkhart County",
    intro: "Manufacturing calendars, family peaks, and lake-effect winter reshape Elkhart windows more than pure academic peaks.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Clear curb and reduce US-20 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Manufacturing shutdown windows", detail: "Hard dates can cluster around plant calendars." },
      { title: "Winter lake-effect ice and snow", detail: "Confirm driveway contingency." }
    ],
  },
  specialized: [
    {
      id: "elkhart-rv-manufacturing-corridor",
      title: "Elkhart RV/manufacturing corridor module",
      intro: "Elkhart estimates fail when industrial timing or empty miles are treated like South Bend campus jobs.",
      bullets: ["Avoid plant shift peaks when flexible.","Price I-80/90/US-20 pairs portal-to-portal toward South Bend or Michigan.","Do not treat Elkhart as a St. Joseph university clone.","Clarify Elkhart vs St. Joseph destinations on multi-county estimates.","Verify Indiana DOR household goods authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Elkhart County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      { id: "schools", title: "Schools & education landscape", bullets: [
          { title: "How districts work here", detail: "Elkhart, Goshen, Middlebury, Fairfield, and other districts serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools and Indiana Department of Education data beat ranking screenshots." }
      ]},
      { id: "hospitals", title: "Hospitals & healthcare access", bullets: [
          { title: "Major systems", detail: "Beacon Health Elkhart, Goshen Health, and other systems serve corridor communities. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour drive times from Middlebury and Nappanee into major campuses. Transfer records early." }
      ]},
      { id: "housing", title: "Housing character & cost pressures", bullets: [
          { title: "Industrial multi-unit vs Goshen SFH vs rural south", detail: "Submarkets differ sharply within short distances." },
          { title: "Cost variation", detail: "Plant-adjacent multi-family often prices differently from south rural SFH." }
      ]},
      { id: "town-fit", title: "Which areas fit whom", bullets: [
          { title: "Elkhart industrial-suburban pattern", detail: "Plant adjacency with multi-unit logistics." },
          { title: "Goshen pattern", detail: "Mixed city stock with US-33 timing." },
          { title: "Middlebury / rural pattern", detail: "Longer empty miles and driveway access." }
      ]},
      { id: "jobs", title: "Jobs & commute patterns", bullets: [
          { title: "Employment anchors", detail: "RV/manufacturing, suppliers, healthcare, and logistics shape employment." },
          { title: "Commute realism", detail: "US-20 and I-80/90 peaks are real for regional workers." }
      ]},
      { id: "lifestyle", title: "Lifestyle & practical livability", bullets: [
          { title: "Manufacturing corridor identity", detail: "Elkhart is RV/industrial north-central Indiana — not South Bend campus defaults or Fort Wayne ring product." },
          { title: "Climate", detail: "Lake-effect winter is real. Plan outdoor staging contingency." }
      ]},
    ],
  },
  resources: {
    title: "Useful Elkhart County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify Indiana DOR household goods operating authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Elkhart County — official site", href: "https://elkhartcounty.com/", external: true },
      { label: "INDOT traffic", href: "https://www.in.gov/indot/", external: true }
    ],
  },
  directoryHint: "Prefer industrial-corridor experience and honest US-20 pricing. Verify Indiana DOR HHG authority in-state and FMCSA interstate.",
  lastReviewed: '2026-07-24',
});
