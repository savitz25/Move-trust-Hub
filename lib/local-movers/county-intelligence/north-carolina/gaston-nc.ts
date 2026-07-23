import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import { finalizeNcPack } from '@/lib/local-movers/county-intelligence/north-carolina/nc-shared';

/** Gaston County, NC — west Charlotte overflow (not Mecklenburg clone). */
export const gastonCountyNcIntelligence: CountyIntelligencePack = finalizeNcPack({
  countySlug: 'gaston',
  hubTitle: 'Gaston County Moving Intelligence Hub',
  eyebrow: 'Gaston · West Charlotte overflow, Gastonia mix & I-85 corridor',
  h1: 'Moving in Gaston County: West Charlotte Overflow, Gastonia Access & I-85 Logistics',
  heroOpener:
    'Gaston County is Charlotte’s western overflow market: Gastonia industrial-and-residential mix, Belmont and Mount Holly edges that feel closer to Mecklenburg, I-85 and US-321 portal time, and older mill-town stock that is not Ballantyne HOA product. A Gastonia multi-family unit, a Belmont near-river home, a Mount Holly HOA two-story, and a Cherryville rural-edge house do not share truck access or commute risk. This hub is for Gaston — not a renamed Mecklenburg South End guide.',
  heroCredibility:
    'NCUC household goods certificate (C-#) for intrastate NC moves · FMCSA for interstate · West Charlotte I-85 corridor awareness · Curated listings',
  majorCorridors: 'I-85 · US-321 · US-74 · NC-279 · Wilkinson Blvd',
  whatMakesDifferent: {
    title: 'What makes moving in Gaston County different',
    intro: 'West Charlotte spillover with industrial-residential mix — not Uptown elevators or Union south HOA rings alone.',
    bullets: [
      { title: 'I-85 defines Charlotte-linked portal time', detail: 'Cross-county pairs burn clock at peak.' },
      { title: 'Gastonia stock mixes older SFH, multi-family, and industrial adjacency', detail: 'Access surveys matter more than ZIP labels.' },
      { title: 'Belmont / Mount Holly edges feel closer to Mecklenburg logistics', detail: 'Still keep county lines clear on estimates.' },
      { title: 'US-321 and Wilkinson corridors reshape north–south timing', detail: 'Not every job is an I-85 hop.' },
      { title: 'Gaston is not Mecklenburg', detail: 'Less vertical core product; more western suburban and mill-town fabric.' },
      { title: 'Intrastate NC rules vs interstate authority', detail: 'In-state household moves generally need NCUC C-#. Interstate needs FMCSA.' },
    ],
  },
  zonesHeading: 'Gaston access zones',
  zonesIntro: 'Plan by Gastonia core, Belmont/Mount Holly eastern edges, northern growth, and western rural approaches.',
  zones: [
    {
      id: 'gastonia-core',
      name: 'Gastonia core & multi-family corridors',
      shortName: 'Gastonia core',
      neighborhoods: ['Gastonia', 'Downtown Gastonia edges', 'Franklin Boulevard multi-family', 'Older SFH pockets'],
      housingTypes: 'Older SFH, multi-family, townhomes',
      challenges: ['Mixed access types', 'Arterial congestion', 'Industrial-adjacent staging friction'],
      moverTips: 'Photo curb for older blocks. Confirm elevator vs stair access. Prefer mid-week mornings.',
      cityKeywords: ['gastonia', 'franklin', 'gaston'],
    },
    {
      id: 'belmont-mt-holly',
      name: 'Belmont, Mount Holly & eastern edges',
      shortName: 'East edges',
      neighborhoods: ['Belmont', 'Mount Holly', 'Cramerton edges', 'River-edge neighborhoods'],
      housingTypes: 'SFH, multi-family, some HOA product',
      challenges: ['Mecklenburg-linked congestion', 'US-74 / Wilkinson friction', 'County-line address confusion'],
      moverTips: 'Clarify Gaston vs Mecklenburg addresses. Build I-85/Wilkinson buffer. Survey river-edge access carefully.',
      cityKeywords: ['belmont', 'mount holly', 'cramerton'],
    },
    {
      id: 'north-growth',
      name: 'Northern Gaston multi-family & US-321',
      shortName: 'North growth',
      neighborhoods: ['Dallas edges', 'Stanley edges', 'US-321 multi-family', 'Northern HOA villages'],
      housingTypes: 'Multi-family, HOA SFH, townhomes',
      challenges: ['US-321 congestion', 'HOA rules', 'Longer empty miles to eastern edges'],
      moverTips: 'Collect HOA packets. Prefer early starts for long north–south pairs.',
      cityKeywords: ['dallas', 'stanley', 'us-321', 'north gaston'],
    },
    {
      id: 'west-rural',
      name: 'Western Gaston & Cherryville edges',
      shortName: 'West / Cherryville',
      neighborhoods: ['Cherryville', 'Bessemer City edges', 'Western rural lots'],
      housingTypes: 'SFH, rural-edge lots',
      challenges: ['Long empty miles', 'Limited alternate routes', 'Soft surfaces after rain'],
      moverTips: 'Survey driveway access. Prefer early starts for long west-county pairs.',
      cityKeywords: ['cherryville', 'bessemer city', 'west gaston'],
    },
  ],
  costDrivers: {
    title: 'What drives Gaston moving costs',
    intro: 'I-85 empty miles, mixed stock access, and western distance drive quotes.',
    drivers: [
      { title: 'I-85 Charlotte-linked congestion', detail: 'Portal-to-portal spikes at peak.' },
      { title: 'Older core stairs and curb friction', detail: 'Labor hours rise without elevators.' },
      { title: 'Eastern edge cross-county pairs', detail: 'Mecklenburg destinations raise staging distance.' },
      { title: 'Western empty miles', detail: 'Cherryville-edge jobs are not short Gastonia hops.' },
    ],
    ranges: [
      { label: 'Studio / 1BR (simple access)', value: '$400–$1,250+', note: 'Higher with stairs or peak freeways' },
      { label: '2–3BR condo or modest SFH', value: '$1,250–$3,500+', note: 'I-85 pairs trend up' },
      { label: '3–4+ BR / long Charlotte-linked', value: '$2,300–$6,600+', note: 'Cross-county pairs price highest' },
      { label: 'Typical 2-person crew rate', value: '$100–$175+/hr', note: 'Portal-to-portal' },
    ],
  },
  seasonal: {
    title: 'When to schedule a Gaston move',
    intro: 'Family seasons and Charlotte-metro spillover reshape calendars.',
    items: [
      { title: 'Best windows: mid-week early mornings', detail: 'Reduce I-85/Wilkinson pain.' },
      { title: 'Peak family season: late May–mid-August', detail: 'Book suburban Saturdays early.' },
      { title: 'Month-end multi-family turns', detail: 'Lease clusters fill crews in growth corridors.' },
      { title: 'Summer heat and storms', detail: 'Prefer early starts on open streets.' },
    ],
  },
  specialized: [
    {
      id: 'west-charlotte-gaston',
      title: 'West Charlotte overflow & industrial-residential module',
      intro: 'Gaston estimates fail when Mecklenburg pairs or mixed Gastonia stock are ignored.',
      bullets: [
        'Clarify Gaston vs Mecklenburg addresses on every estimate.',
        'Price I-85 pairs portal-to-portal.',
        'Survey older SFH stairs and curb carefully.',
        'Collect HOA packets for northern growth product.',
        'Verify NCUC C-# in-state and FMCSA interstate.',
      ],
    },
  ],
  relocation: {
    title: 'Considering a move to Gaston County?',
    intro: 'Practical fit checklist — verify on official sources. No invented rankings.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education landscape',
        bullets: [
          { title: 'How districts work here', detail: 'Gaston County Schools is the primary public K–12 system. Assignment is address-based.' },
          { title: 'Growth areas', detail: 'Eastern edges can see enrollment pressure tied to Charlotte spillover. Ask about capacity when touring.' },
          { title: 'Research sources', detail: 'District tools, NCDPI data, and campus visits beat ranking screenshots.' },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare access',
        bullets: [
          { title: 'Major systems', detail: 'CaroMont Health and Charlotte-metro systems serve residents. Confirm networks.' },
          { title: 'What relocators should do', detail: 'Map peak-hour times into Mecklenburg specialty care. Transfer records early.' },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          { title: 'Eastern spillover vs western value patterns', detail: 'Belmont/Mount Holly often price differently from western rural edges.' },
          { title: 'Mixed stock realities', detail: 'Older Gastonia product needs different access surveys than new HOA villages.' },
          { title: 'Commute tradeoffs', detail: 'Home price savings can be offset by longer Charlotte job commutes.' },
        ],
      },
      {
        id: 'town-fit',
        title: 'Which Gaston areas fit whom',
        bullets: [
          { title: 'Eastern edge lifestyle', detail: 'Closer Charlotte access with cross-county move logistics.' },
          { title: 'Gastonia core pattern', detail: 'Mixed industrial-residential fabric with varied access.' },
          { title: 'Western pattern', detail: 'More space and longer empty-mile logistics.' },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          { title: 'Employment anchors', detail: 'Many residents commute into Mecklenburg; local manufacturing, healthcare, retail, and services also employ residents.' },
          { title: 'Commute realism', detail: 'I-85, US-321, and Wilkinson peaks are real. Test drive peak routes into Charlotte.' },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Lifestyle & practical livability',
        bullets: [
          { title: 'West Charlotte overflow identity', detail: 'Gaston is western suburban and mill-town fabric — not Uptown vertical living.' },
          { title: 'Climate', detail: 'Hot humid summers and storms. Plan outdoor staging contingency.' },
          { title: 'Pace', detail: 'Eastern edges feel more Charlotte-linked; western areas quieter. Visit peak and off-peak.' },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Gaston resources',
    intro: 'Official links first. Verify NCUC in-state and FMCSA interstate.',
    items: [
      { label: 'Gaston County — official site', href: 'https://www.gastongov.com/', external: true },
      { label: 'City of Gastonia', href: 'https://www.cityofgastonia.com/', external: true },
      { label: 'Gaston County Schools', href: 'https://www.gaston.k12.nc.us/', external: true },
      { label: 'NCDOT traffic / 511', href: 'https://drivenc.gov/', external: true },
    ],
  },
  directoryHint:
    'Prefer mixed-stock access experience for Gastonia; I-85 buffer for Charlotte pairs; clarify Gaston vs Mecklenburg addresses. Verify NCUC C-# and FMCSA.',
  lastReviewed: '2026-07-23',
});
