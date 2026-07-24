import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeTxTier2Pack,
  TX_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/texas/tx-tier2-shared';

/**
 * Guadalupe County — Texas Tier 2 (SA east collar — Seguin / Schertz / Cibolo).
 * Secondary-market contract vs Bexar Tier 1 parent — Schertz–Cibolo growth and
 * Seguin county-seat product, not San Antonio core elevators or renamed Bexar scripts.
 */
export const guadalupeCountyIntelligence: CountyIntelligencePack = finalizeTxTier2Pack({
  countySlug: 'guadalupe',
  hubTitle: 'Guadalupe County Moving Intelligence Hub',
  eyebrow: 'Guadalupe · SA east collar · Seguin / Schertz / Cibolo',
  h1: 'Moving in Guadalupe County: SA East Collar — Schertz, Cibolo & Seguin Growth',
  heroOpener:
    'Guadalupe County is San Antonio’s eastern collar — Schertz and Cibolo family growth on the metro edge, Seguin’s county-seat grid, and I-10 / SH-130 freeflow — not downtown Bexar elevators with a different nameplate. Schertz–Cibolo runs on planned-community logistics and SA commute timing; Seguin still carries historic-grid and US-90 character; SH-130 and I-10 turn “local” pairs into corridor-timed jobs. A Cibolo HOA two-story, a Schertz military-adjacent tract, a Seguin bungalow, and a rural McQueeney-edge home do not share truck access. Compared with Bexar, you get freer mid-day freeflow than SA inner loops, denser HOA paperwork on the Schertz–Cibolo belt than many older SA SFH blocks, and almost no vertical tower product. This guide is for people moving in Guadalupe as an east-collar market with its own role — not a recycled San Antonio core script.',
  heroCredibility:
    'SA east collar · Schertz / Cibolo / Seguin · TxDMV household goods (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'I-10 · SH-130 · US-90 · SH-123 · local Schertz–Cibolo grid',
  parentCompare: {
    parentLabel: 'Bexar County',
    parentHref: '/local-movers/texas/bexar',
    title: 'Compared with Bexar County',
    intro:
      'Guadalupe is the San Antonio east growth collar — Schertz, Cibolo, Seguin, and I-10 / SH-130 edges — not a drop-in template for downtown elevators, Medical Center docks, or far-west Bexar HOA belts. Use Bexar as the dense metro parent contrast.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Bexar crews fight I-10 through town, Loop 1604, I-35, and multi-hour cross-county pairs into Medical Center and downtown. Guadalupe pairs ride I-10, SH-130, US-90, SH-123, and the local Schertz–Cibolo grid — freer mid-day than SA inner loops, still peak-heavy on Schertz/Cibolo ↔ SA job-center and Seguin ↔ east Bexar hauls. Portal-to-portal time is real; it is not a 45-minute downtown dock job.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Bexar mixes towers, historic urban grids, and sprawling suburban HOAs under one county label. Guadalupe’s ladder is Schertz–Cibolo master-planned and military-adjacent SFH, Seguin historic and mid-century stock, US-90 corridor product, and rural/agricultural edges — far less elevator density, far more gate lists and long-local empty miles into SA.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Bexar core needs COI elevators and curb permits; many Bexar suburbs still allow freer driveway work. Guadalupe’s Schertz–Cibolo belt defaults to HOA packets — approved hours, COI, and gate lists — while Seguin stages more historic-grid and driveway work. Expect paperwork first on the metro edge, then the truck.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Guadalupe quotes often sit near or slightly below dense Bexar urban rates for comparable square footage when access is a simple driveway — HOA soft costs, I-10 / SH-130 portal time, heat windows, and Seguin long locals still push prices up. Expect secondary-collar labor rates with planned-community and corridor friction as the main premium, not downtown dock scarcity.',
      },
      {
        title: 'Role difference',
        detail:
          'Guadalupe is San Antonio’s east bedroom and growth collar — schools, SA commutes, and Schertz–Cibolo inventory — not Bexar’s job-center core and not Comal’s New Braunfels river-tourism product. Treat it as its own east-collar market when matching crews and rate cards.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Guadalupe County different',
    intro:
      'East-collar realities — Schertz–Cibolo HOA density, Seguin county-seat grids, I-10 / SH-130 freeflow that still bills, and freer mid-day than Bexar core — that change estimates.',
    bullets: [
      {
        title: 'Schertz–Cibolo HOA is the default metro-edge product',
        detail:
          'Schertz and Cibolo villages treat COI, approved hours, and gate lists as standard. A Seguin bungalow and a guarded Cibolo two-story are not interchangeable jobs — put both communities on the estimate.',
      },
      {
        title: 'I-10 / SH-130 / US-90 timing is a line item',
        detail:
          'Schertz ↔ SA Medical Center or Seguin ↔ east Bexar pairs freer than SA inner loops still burn billable time at school and commute peaks. Ask whether quotes are portal-to-portal.',
      },
      {
        title: 'Seguin county-seat vs metro-edge growth are different products',
        detail:
          'Historic Seguin grids, US-90 corridors, and rural edges do not share truck access with Schertz–Cibolo cul-de-sacs. Name both cities — “Guadalupe County local” fails across the county.',
      },
      {
        title: 'Gulf Coast heat on open suburban staging',
        detail:
          'June–September afternoons on asphalt cul-de-sacs stress crews and sealed goods. Prefer early starts; treat mid-afternoon load-outs as high risk even when the map looks short.',
      },
      TX_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Guadalupe zones: Schertz–Cibolo belt, Seguin core, I-10 / SH-130 growth & rural edges',
  zonesIntro:
    'Three to four sharp products — not a six-zone dump. Schertz–Cibolo metro edge, Seguin county seat, I-10 / SH-130 corridor growth, and rural/agricultural edges price and stage differently under the same east collar.',
  zones: [
    {
      id: 'schertz-cibolo-belt',
      name: 'Schertz–Cibolo Metro Edge',
      shortName: 'Schertz / Cibolo',
      neighborhoods: [
        'Schertz',
        'Cibolo',
        'Master-planned HOA villages',
        'Military-adjacent residential edges',
        'Local Schertz–Cibolo grid corridors',
      ],
      housingTypes:
        'Master-planned HOA SFH, townhomes, multi-family, military-adjacent and family-volume suburban product',
      challenges: [
        'HOA COI, approved hours, and gate lists as default',
        'I-10 / Loop 1604 approach peaks toward San Antonio',
        'High family-move volume on summer weekends',
        'Cul-de-sac and truck-length constraints in newer villages',
      ],
      moverTips:
        'Send HOA management packets with the estimate. Mid-week early starts beat heat and school traffic. Inventory family-volume SFH carefully. Clarify Schertz/Cibolo ↔ SA job-center drive assumptions.',
      cityKeywords: [
        'schertz',
        'cibolo',
        'schertz tx',
        'cibolo tx',
        'schertz cibolo',
      ],
    },
    {
      id: 'seguin-core',
      name: 'Seguin County Seat',
      shortName: 'Seguin',
      neighborhoods: [
        'Downtown / historic Seguin',
        'US-90 corridors',
        'SH-123 residential edges',
        'Mid-century tracts',
        'South and east Seguin growth',
      ],
      housingTypes:
        'Historic-grid SFH, mid-century tracts, some newer subdivisions, mixed multi-family',
      challenges: [
        'Older street grids and tighter parking near historic cores',
        'US-90 / SH-123 approach timing',
        'Varied access vs pure Schertz–Cibolo HOA product',
        'Heat on open lots with limited shade',
      ],
      moverTips:
        'Do not price Seguin bungalows like Cibolo HOA villages — access and inventory differ. Confirm street width and parking. Early starts still win in summer heat. Seguin ↔ Schertz is a classic underquoted local.',
      cityKeywords: [
        'seguin',
        'seguin tx',
        'us 90 seguin',
        'guadalupe seguin',
      ],
    },
    {
      id: 'i10-sh130-growth',
      name: 'I-10 & SH-130 Corridor Growth',
      shortName: 'I-10 / SH-130 growth',
      neighborhoods: [
        'I-10 east corridor tracts',
        'SH-130 approach residential',
        'Corridor multi-family pockets',
        'New-construction HOA phases',
        'Cross-county SA border edges',
      ],
      housingTypes:
        'New-construction SFH, master-planned HOA communities, multi-family, rapid growth product',
      challenges: [
        'HOA gate lists and construction-site approaches',
        'I-10 and SH-130 peak congestion',
        'Long empty miles from Seguin or SA staging',
        'Incomplete roads and truck-turn constraints in newest phases',
      ],
      moverTips:
        'Treat corridor growth as long-local jobs. Ask whether pure local rate cards still apply. Send HOA packets early and inventory new-build family volume carefully. Prefer mid-week starts over peak Saturday I-10 traffic.',
      cityKeywords: [
        'i-10 guadalupe',
        'sh 130',
        'guadalupe growth',
        'east san antonio collar',
      ],
    },
    {
      id: 'rural-lake-edges',
      name: 'Rural & Lake Edges',
      shortName: 'Rural / lake edges',
      neighborhoods: [
        'McQueeney edges',
        'Marion and small-town pockets',
        'Guadalupe River–adjacent residential',
        'Agricultural and larger-lot edges',
        'Southern and eastern rural corridors',
      ],
      housingTypes:
        'Larger-lot SFH, small-town stock, river-adjacent and agricultural-edge product, limited multi-unit',
      challenges: [
        'Long approaches and limited truck turnaround',
        'Long empty miles from Schertz–Cibolo or Seguin staging',
        'Not interchangeable with metro-edge HOA cul-de-sacs',
        'Weather-sensitive outdoor packing on open lots',
      ],
      moverTips:
        'Send driveway and turnaround photos before booking. Never assume Schertz HOA truck assumptions transfer. Price rural-edge pairs as long locals with honest empty-mile time.',
      cityKeywords: [
        'mcqueeney',
        'marion tx',
        'guadalupe rural',
        'mcqueeney tx',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Guadalupe County',
    intro:
      'Same square footage prices differently by HOA soft costs, I-10 / SH-130 corridor time, and whether the job is Schertz–Cibolo planned stock or Seguin long-local county-seat.',
    drivers: [
      {
        title: 'HOA soft costs on the Schertz–Cibolo belt',
        detail:
          'COI, approved hours, and gate coordination add paperwork and can force weekday-only windows before labor starts.',
      },
      {
        title: 'I-10 / SH-130 / US-90 portal time',
        detail:
          'Schertz ↔ SA or Seguin ↔ east Bexar pairs burn more portal-to-portal time than map miles suggest at peak — freer than Bexar core, still billable.',
      },
      {
        title: 'Heat-constrained work windows',
        detail:
          'Summer heat compresses productive hours into mornings. Jobs that slip into peak afternoon heat may need more labor or premium scheduling.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$500–$1,350+',
        note: 'Higher with multi-unit long carries or peak heat windows',
      },
      {
        label: '2–3BR house / planned community',
        value: '$1,500–$3,700+',
        note: 'HOA soft costs and SA corridor hauls trend up',
      },
      {
        label: '3–4+ BR (cross-zone / Seguin / long-local)',
        value: '$2,300–$5,600+',
        note: 'Cross-county SA and rural-edge jobs price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal & heat calendar intelligence',
    intro:
      'Guadalupe peaks follow extreme heat, school calendars, and San Antonio east spillover — not downtown lease density alone.',
    items: [
      {
        title: 'Summer heat peak: roughly June – September',
        detail:
          'Plan early-morning loads, extra water, and heat-safe packing. Mid-afternoon moves in peak heat are high risk for people and property.',
      },
      {
        title: 'School & family calendars (Schertz / Cibolo / Seguin)',
        detail:
          'Late spring through early fall weekends fill first for family SFH moves. Book 2–4 weeks ahead for popular Saturdays in planned villages.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start',
        detail:
          'Still plan around HOA weekday windows when applicable. Early starts win even in shoulder seasons when heat and arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'schertz-cibolo-hoa',
      title: 'Schertz–Cibolo HOA & metro-edge logistics',
      intro:
        'Guadalupe’s defining metro product is planned-community access on the SA east edge — gate lists, COI, and family-volume SFH that Bexar core elevator jobs do not share.',
      bullets: [
        'Send HOA management packets, COI requirements, and gate lists with the estimate.',
        'Confirm approved move hours and floor-protection rules before booking Saturday crews.',
        'Inventory family-volume SFH carefully — suburban loads often exceed older urban condos.',
        'Share driveway, cul-de-sac, and truck-length constraints for newer villages with tight turns.',
      ],
    },
    {
      id: 'i10-sh130-last-mile',
      title: 'I-10 / SH-130 / US-90 last-mile',
      intro:
        'I-10, SH-130, US-90, and SH-123 turn “local” Guadalupe pairs into corridor-timed jobs.',
      bullets: [
        'Price portal-to-portal time honestly for Schertz/Cibolo ↔ SA and Seguin ↔ east Bexar pairs.',
        'Build buffer for school and commute peaks on I-10 and the local Schertz–Cibolo grid.',
        'Note construction detours and SH-130 approaches on growth corridors.',
        'Ask whether cross-zone pairs still use a pure local rate card or a long-local schedule.',
      ],
    },
    {
      id: 'seguin-county-seat-access',
      title: 'Seguin county-seat & rural-edge access',
      intro:
        'Seguin historic grids and rural Guadalupe edges are not Schertz cul-de-sacs renamed.',
      bullets: [
        'Confirm street width and parking near historic Seguin cores.',
        'Do not interchange Seguin bungalow inventory with Cibolo HOA family volume.',
        'Price Seguin ↔ Schertz/Cibolo as a real cross-zone local with honest clock time.',
        'Send approach and turnaround photos for larger-lot and river-edge homes.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'SA east-collar value, Schertz–Cibolo planned villages, and Seguin county-seat product are different bets — validate schools and healthcare by pocket, then plan for heat and HOA calendars.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Major systems include Schertz-Cibolo-Universal City ISD, Seguin ISD, and other local districts on rural and growth edges. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'SCUC ISD vs Seguin ISD',
            detail:
              'Schertz and Cibolo addresses often fall in Schertz-Cibolo-Universal City ISD; Seguin and many southern/eastern pockets use Seguin ISD or smaller local systems. Marketing names and new tracts can span feeders — verify with official boundary tools.',
          },
          {
            title: 'Metro-edge vs county-seat systems',
            detail:
              'Enrollment pressures differ between rapid Schertz–Cibolo growth and Seguin-area districts — do not treat county averages as neighborhood truth.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites and state data should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'County acute-care anchors',
            detail:
              'Guadalupe Regional Medical Center (Seguin) and other regional campuses serve greater Guadalupe. Map ER drive times at rush hour from your target pocket — especially Schertz–Cibolo toward SA systems.',
          },
          {
            title: 'Bexar specialty spillover',
            detail:
              'San Antonio medical campuses remain common for complex needs from the east collar. Confirm insurer networks and realistic I-10 appointment drive times.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak summer move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Guadalupe resources',
    intro:
      'Local official links first; directory listings are independent. Verify Texas TxDMV for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'City of Seguin',
        href: 'https://www.seguintexas.gov/',
        note: 'County seat services; HOA rules are separate',
        external: true,
      },
      {
        label: 'City of Schertz',
        href: 'https://schertz.com/',
        external: true,
      },
      {
        label: 'City of Cibolo',
        href: 'https://www.cibolotx.gov/',
        external: true,
      },
      {
        label: 'Guadalupe County — official site',
        href: 'https://www.co.guadalupe.tx.us/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Schertz–Cibolo, Seguin, I-10/SH-130 growth, rural edges) when available. Confirm HOA packets on the metro edge, Seguin grid access, and honest I-10 / SH-130 drive assumptions — this is an SA east collar, not Bexar core.',
  lastReviewed: '2026-07-24',
});
