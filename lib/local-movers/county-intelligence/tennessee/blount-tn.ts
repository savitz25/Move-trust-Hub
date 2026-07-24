import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeTnPack } from '@/lib/local-movers/county-intelligence/tennessee/tn-shared';

export const blountCountyTnIntelligence: CountyIntelligencePack = finalizeTnPack({
  countySlug: "blount",
  hubTitle: "Blount County Moving Intelligence Hub",
  eyebrow: "Blount · Maryville foothills, Knoxville south overflow & Smoky approaches",
  h1: "Moving in Blount County: Maryville Access, Foothill Driveways & US-129 Logistics",
  heroOpener: "Blount County is Knoxville’s southern foothill partner: Maryville and Alcoa multi-family and SFH, foothill driveways, airport-adjacent corridors, and Great Smoky approach logistics that are not Sevier tourism peaks and not Knoxville campus density alone. A Maryville HOA two-story, an Alcoa multi-family unit, a foothill driveway home, and a Townsend-edge cabin approach do not share truck access or grade risk. This hub is for Blount — not a Sevier tourism clone.",
  heroCredibility:
    'TDOR motor carrier intrastate authority for in-state TN moves · FMCSA for interstate · Curated directory listings',
  majorCorridors: "US-129 · US-321 · I-140 links · Alcoa Hwy · scenic foothill approaches",
  whatMakesDifferent: {
    title: "What makes moving in Blount County different",
    intro: "Foothill and Knoxville-south overflow logistics — not Pigeon Forge tourism spur congestion as the default product.",
    bullets: [
      {
        title: "Foothill driveways add grade and turn-radius risk",
        detail: "Survey access photos matter outside flat suburban lots.",
      },
      {
        title: "US-129 / Alcoa Hwy define portal time to Knoxville",
        detail: "Cross-county pairs burn clock at peak.",
      },
      {
        title: "Airport-adjacent corridors change morning staging",
        detail: "Freight and passenger traffic pulses matter near Alcoa.",
      },
      {
        title: "Smoky approach edges are not full Sevier tourism product",
        detail: "Still plan for seasonal traffic when addresses lean parkward.",
      },
      {
        title: "Blount is not Sevier",
        detail: "Do not reuse Gatlinburg cabin-tourism copy for Maryville HOA jobs.",
      },
      {
        title: 'Intrastate TN rules vs interstate authority',
        detail:
          'Moves entirely within Tennessee by for-hire carriers are generally subject to Tennessee Department of Revenue (TDOR) motor carrier intrastate authority requirements as applicable. Interstate legs need active FMCSA USDOT (and usually MC).',
      },
    ],
  },
  zonesHeading: "Blount access zones",
  zonesIntro: "Plan by Maryville core, Alcoa/airport edges, foothill residential, and Townsend/park approaches.",
  zones: [
    {
      id: "maryville",
      name: "Maryville multi-family & SFH",
      shortName: "Maryville",
      neighborhoods: ["Maryville","Downtown Maryville edges","HOA villages","Multi-family corridors"],
      housingTypes: "SFH, multi-family, townhomes, HOA product",
      challenges: ["Arterial congestion","HOA rules","Mixed access types"],
      moverTips: "Collect HOA packets. Prefer mid-week mornings. Confirm unit access type.",
      cityKeywords: ["maryville","blount"],
    },
    {
      id: "alcoa-airport",
      name: "Alcoa & airport-adjacent corridors",
      shortName: "Alcoa / airport",
      neighborhoods: ["Alcoa","Airport Hwy edges","I-140 multi-family","Industrial-adjacent residential"],
      housingTypes: "Multi-family, SFH, townhomes",
      challenges: ["Airport traffic pulses","US-129 congestion","Longer empty miles from foothill addresses"],
      moverTips: "Build US-129 buffer. Prefer early starts. Survey industrial-edge staging carefully.",
      cityKeywords: ["alcoa","airport","us-129"],
    },
    {
      id: "foothills",
      name: "Foothill residential edges",
      shortName: "Foothills",
      neighborhoods: ["Foothill driveways","Wildwood edges","Hillside SFH"],
      housingTypes: "Hillside SFH, some multi-family",
      challenges: ["Grades and turn radius","Weather-sensitive surfaces","Limited alternate routes"],
      moverTips: "Survey grade and truck length. Discuss shuttle carries when needed.",
      cityKeywords: ["foothills","wildwood","hillside"],
    },
    {
      id: "townsend-edge",
      name: "Townsend & park-approach edges",
      shortName: "Townsend edge",
      neighborhoods: ["Townsend","US-321 approaches","Park-adjacent rentals"],
      housingTypes: "SFH, cabin-adjacent, vacation-adjacent rentals",
      challenges: ["Seasonal tourism traffic","Narrow approaches","Long empty miles"],
      moverTips: "Share approach videos. Build seasonal buffer. Do not price as full Gatlinburg product without surveying.",
      cityKeywords: ["townsend","us-321","smoky"],
    }
  ],
  costDrivers: {
    title: "What drives Blount County moving costs",
    intro: "Foothill access and Knoxville-linked portal time drive quotes.",
    drivers: [
      { title: "Foothill long carries", detail: "Labor hours rise when trucks cannot park at the door." },
      { title: "US-129 / Alcoa Hwy congestion", detail: "Portal-to-portal spikes at peak." },
      { title: "HOA soft costs in Maryville growth", detail: "Gate lists push demand into peak windows." },
      { title: "Seasonal park-approach traffic", detail: "Townsend edges can raise time risk in peak tourism windows." }
    ],
    ranges: [
      { label: "Studio / 1BR (simple access)", value: "$400–$1,250+", note: "Higher with grades" },
      { label: "2–3BR condo or modest SFH", value: "$1,250–$3,500+", note: "Foothill access trends up" },
      { label: "3–4+ BR / foothill / long local", value: "$2,300–$6,600+", note: "Hillside addresses price highest" },
      { label: "Typical 2-person crew rate", value: "$100–$175+/hr", note: "Portal-to-portal" }
    ],
  },
  seasonal: {
    title: "When to schedule a move in Blount County",
    intro: "Family seasons and tourism spillover reshape foothill access.",
    items: [
      { title: "Best windows: mid-week early mornings", detail: "Reduce US-129 pain." },
      { title: "Peak family season: late May–mid-August", detail: "Book suburban Saturdays early." },
      { title: "Tourism peak spillover", detail: "Park-approach edges can clog on peak weekends." },
      { title: "Summer heat and storms", detail: "Prefer early starts; foothill weather can differ from valley floors." }
    ],
  },
  specialized: [
    {
      id: "blount-foothills",
      title: "Maryville foothills & Knoxville-south overflow module",
      intro: "Blount estimates fail when grades or US-129 empty miles are ignored.",
      bullets: ["Survey driveway grade on foothill addresses.","Price US-129/Alcoa Hwy pairs portal-to-portal.","Collect HOA packets for Maryville growth product.","Do not reuse Sevier tourism-cabin assumptions for standard Maryville HOA jobs.","Verify TDOR intrastate authority for in-state-only jobs and FMCSA for interstate legs."],
    },
  ],
  relocation: {
    title: "Considering a move to Blount County?",
    intro:
      'Use this as a practical fit checklist — schools, healthcare, housing character, and commute realism — then verify on district and hospital sites. No single ranking captures neighborhood fit.',
    modules: [
      {
        id: "schools",
        title: "Schools & education landscape",
        bullets: [
          { title: "How districts work here", detail: "Blount County Schools, Maryville City Schools, and Alcoa City Schools serve different addresses. Confirm zoning carefully." },
          { title: "Research sources", detail: "District tools, Tennessee DOE data, and campus visits beat ranking screenshots." }
        ],
      },
      {
        id: "hospitals",
        title: "Hospitals & healthcare access",
        bullets: [
          { title: "Major systems", detail: "Blount Memorial and Knoxville-metro systems serve residents. Confirm networks." },
          { title: "What relocators should do", detail: "Map peak-hour times into Knoxville specialty care. Transfer records early." }
        ],
      },
      {
        id: "housing",
        title: "Housing character & cost pressures",
        bullets: [
          { title: "Valley towns vs foothill stock", detail: "Maryville/Alcoa multi-family and SFH differ from hillside driveways and park-approach edges." },
          { title: "Cost variation", detail: "Foothill and park-adjacent addresses can price differently from valley tracts." }
        ],
      },
      {
        id: "town-fit",
        title: "Which areas fit whom",
        bullets: [
          { title: "Maryville lifestyle", detail: "Town amenities with HOA and multi-family logistics." },
          { title: "Alcoa / airport pattern", detail: "Employment access with corridor congestion." },
          { title: "Foothill lifestyle", detail: "Grades and scenic access with driveway logistics." }
        ],
      },
      {
        id: "jobs",
        title: "Jobs & commute patterns",
        bullets: [
          { title: "Employment anchors", detail: "Many residents commute into Knox; local manufacturing, healthcare, airport-related, and retail jobs also employ residents." },
          { title: "Commute realism", detail: "US-129 and Alcoa Hwy peaks are real. Test drive peak routes into Knoxville." }
        ],
      },
      {
        id: "lifestyle",
        title: "Lifestyle & practical livability",
        bullets: [
          { title: "Knoxville-south foothill identity", detail: "Blount is distinct from Sevier tourism peaks and Knoxville campus density." },
          { title: "Climate", detail: "Hot humid summers; foothill weather can shift quickly. Plan staging contingency." }
        ],
      },
    ],
  },
  resources: {
    title: "Useful Blount County resources",
    intro:
      'Official links first; directory listings are independent, not endorsements. Verify TDOR intrastate authority for in-state moves and FMCSA for interstate legs.',
    items: [
      { label: "Blount County — official site", href: "https://www.blounttn.org/", external: true },
      { label: "City of Maryville", href: "https://www.maryvillegov.com/", external: true },
      { label: "City of Alcoa", href: "https://www.cityofalcoa-tn.gov/", external: true },
      { label: "Blount County Schools", href: "https://www.blountk12.org/", external: true },
      { label: "TDOT traffic resources", href: "https://www.tn.gov/tdot.html", external: true }
    ],
  },
  directoryHint: "Prefer foothill grade surveys; HOA fluency for Maryville growth; honest US-129 pricing into Knox. Verify TDOR intrastate and FMCSA as applicable.",
  lastReviewed: '2026-07-24',
});
