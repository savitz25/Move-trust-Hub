import type { CountyIntelligencePack } from '@/lib/local-movers/county-intelligence/types';
import {
  finalizeFlTier2Pack,
  FL_TIER2_REG_BULLET,
} from '@/lib/local-movers/county-intelligence/florida/fl-tier2-shared';

/**
 * Okaloosa County — Florida Tier 2 (Fort Walton Beach / Destin — Emerald Coast).
 * Independent Emerald Coast Panhandle secondary market vs Escambia / western Panhandle
 * defaults — beach tourism + Eglin/Hurlburt military + seasonal peaks, NOT a Pensacola rename.
 */
export const okaloosaCountyIntelligence: CountyIntelligencePack = finalizeFlTier2Pack({
  countySlug: 'okaloosa',
  hubTitle: 'Okaloosa County Moving Intelligence Hub',
  eyebrow: 'Okaloosa County · Emerald Coast independent · Fort Walton Beach / Destin',
  h1: 'Moving in Okaloosa County: Independent Emerald Coast — Destin, Fort Walton Beach & Eglin Logistics',
  heroOpener:
    'Okaloosa County is an independent Emerald Coast hub spanning Destin and Miramar Beach tourism product, Fort Walton Beach mainland and military-adjacent stock, Crestview inland growth, and Niceville/Valparaiso base-edge communities — not Pensacola with different beach labels. Compared with Escambia / western Panhandle defaults, US-98 beach approaches, FL-85 inland connectors, and FL-293 Destin corridors replace pure I-10 Navy-core scripts; Eglin and Hurlburt PCS volume is first-class demand; and seasonal tourism peaks rewrite summer capacity. This guide is for people moving in Okaloosa as a secondary market with its own role — not a recycled Escambia pack.',
  heroCredibility:
    'Independent Emerald Coast · Destin / Fort Walton · Eglin/Hurlburt-adjacent · FDACS Ch. 507 (intrastate) · FMCSA when interstate · Curated listings',
  majorCorridors: 'US-98 · FL-85 · FL-293 · I-10 (north approach) · Destin approaches',
  parentCompare: {
    parentLabel: 'Independent Emerald Coast Panhandle',
    parentHref: '/local-movers/florida/escambia',
    title: 'Compared with Escambia / western Panhandle defaults',
    intro:
      'Okaloosa is a freestanding Emerald Coast market — Destin tourism, Fort Walton Beach, Crestview inland, and Niceville/Valparaiso base edges — not a drop-in template for Pensacola Navy or Perdido scripts. Use Escambia as western Panhandle parent contrast for licensing context and long-haul routing, not as a rename template.',
    bullets: [
      {
        title: 'Drive time & corridor relationship',
        detail:
          'Escambia pairs ride I-10, I-110, US-98, and Pensacola Beach approaches. Okaloosa pairs ride US-98, FL-85, FL-293, I-10 north approaches, and Destin corridors — Destin ↔ Fort Walton or Crestview ↔ beach still burn portal-to-portal time at tourist and commute peaks. It is not a short Pensacola dock job; isolation means long-haul deadhead, not Escambia collar spillover.',
      },
      {
        title: 'Housing stock differences',
        detail:
          'Escambia’s ladder is Pensacola core, west Navy multi-family, Perdido beach, and Century rural edges. Okaloosa’s ladder is Destin/Miramar Beach tourism condos and coastal SFH, Fort Walton Beach mainland and multi-unit, Crestview inland growth SFH, and Niceville/Valparaiso military-edge product — denser beach tourism elevators and dual-base military volume, less Pensacola historic-core density.',
      },
      {
        title: 'Truck access, HOA & density',
        detail:
          'Okaloosa stages more Destin-bridge and beach-strip elevator work plus Eglin/Hurlburt multi-family turnover than pure Escambia inland driveway jobs. HOAs exist in planned inland pockets but tourism elevators and base-area apartments dominate soft costs on peak calendars.',
      },
      {
        title: 'Rough cost posture (qualitative)',
        detail:
          'Local Okaloosa quotes often sit at secondary-Panhandle rates for simple inland driveway access — Destin approaches, elevator soft costs, tourism peaks, and military PCS windows still push prices up. Expect Emerald Coast tourism and military premiums — not a thinner Escambia rate card with Destin labels.',
      },
      {
        title: 'Role difference',
        detail:
          'Okaloosa is an independent Emerald Coast hub with its own employment base (Eglin/Hurlburt defense, tourism, healthcare, retail, logistics) — not a Pensacola bedroom collar. Treat it as its own market when matching crews and rate cards. Not an Escambia rename.',
      },
    ],
  },
  whatMakesDifferent: {
    title: 'What makes moving in Okaloosa County different',
    intro:
      'Independent Emerald Coast realities — Destin tourism peaks, Eglin/Hurlburt PCS volume, Crestview inland growth, and US-98 freeflow — that change estimates.',
    bullets: [
      {
        title: 'Destin / Miramar Beach tourism rewrites summer calendars',
        detail:
          'Beach condos, short-term rental turnover, and tourist parking scarcity create peak-season capacity crunches that pure Crestview suburb calendars miss. Book elevators early; avoid peak weekend Destin loads when flexible.',
      },
      {
        title: 'Eglin / Hurlburt military cycles are first-class demand',
        detail:
          'PCS peaks, mid-month inventory, and multi-family turnover near Fort Walton Beach and Niceville/Valparaiso rewrite lead times. Book early around known military windows.',
      },
      {
        title: 'Destin vs Fort Walton vs Crestview vs Niceville are different products',
        detail:
          'Beach tourism stock, mainland multi-unit, inland growth SFH, and base-edge communities do not share truck access or clock time. Name both pockets on the estimate.',
      },
      {
        title: 'Gulf heat, humidity, and storm season are operational',
        detail:
          'Summer heat and hurricane windows compress outdoor hours and require flexible coastal contracts. Prefer early starts; document weather reschedule policies.',
      },
      FL_TIER2_REG_BULLET,
    ],
  },
  zonesHeading:
    'Okaloosa zones: Destin/Miramar Beach, Fort Walton Beach, Crestview & Niceville/Valparaiso',
  zonesIntro:
    'Four sharp products — not a six-zone dump. Destin/Miramar Beach, Fort Walton Beach, Crestview, and Niceville/Valparaiso price and stage differently under the same Emerald Coast calendar.',
  zones: [
    {
      id: 'destin-miramar',
      name: 'Destin, Miramar Beach & Gulf Approaches',
      shortName: 'Destin / Miramar',
      neighborhoods: [
        'Destin',
        'Miramar Beach',
        'US-98 / FL-293 beach corridors',
        'Coastal condo and mid-rise product',
        'Elevated coastal SFH pockets',
      ],
      housingTypes:
        'Beach condos, elevated coastal SFH, multi-family near water, tourism and snowbird-oriented product',
      challenges: [
        'Elevator/COI windows and limited beach staging',
        'Tourist peak parking scarcity and Destin approach congestion',
        'Sand protection and storm exposure',
        'Seasonal short-term rental turnover volume',
      ],
      moverTips:
        'Reserve elevators early. Budget sand protection. Prefer non-peak weekday loads on Destin approaches when flexible. Confirm building rules and truck limits before dispatch.',
      cityKeywords: [
        'destin',
        'miramar beach',
        'destin fl',
        'emerald coast',
        'fl-293',
      ],
    },
    {
      id: 'fort-walton-beach',
      name: 'Fort Walton Beach Mainland & Multi-Unit',
      shortName: 'Fort Walton Beach',
      neighborhoods: [
        'Fort Walton Beach core',
        'Mainland multi-family clusters',
        'US-98 central corridors',
        'Established mid-century neighborhoods',
        'Military-adjacent apartment belts',
      ],
      housingTypes:
        'Mainland SFH, multi-unit buildings, mid-century stock, military-adjacent rentals',
      challenges: [
        'Apartment COI and elevator windows',
        'PCS peak volume and short-notice turns',
        'US-98 / arterial approaches at peak',
        'Mix of tourist spillover and civilian multi-family',
      ],
      moverTips:
        'Collect apartment COI early. Book PCS windows as soon as orders and housing dates firm. Inventory carefully for partial loads. Weekday mornings beat heat and commute peaks.',
      cityKeywords: [
        'fort walton beach',
        'fwb',
        'fort walton',
        'okaloosa mainland',
      ],
    },
    {
      id: 'crestview',
      name: 'Crestview & Inland Growth',
      shortName: 'Crestview',
      neighborhoods: [
        'Crestview',
        'I-10 / FL-85 inland corridors',
        'North Okaloosa growth tracts',
        'Family SFH and planned pockets',
        'Inland multi-family growth',
      ],
      housingTypes:
        'Suburban SFH, modest HOA tracts, multi-family growth, working-community product',
      challenges: [
        'Longer empty miles from Destin/beach staging',
        'FL-85 / I-10 peak timing',
        'Family-volume inventory on summer weekends',
        'Different access profile than beach elevators',
      ],
      moverTips:
        'Treat Crestview ↔ Destin as a long local with arterial timing. Send HOA packets when applicable. Mid-week early starts beat heat. Ask whether pure beach rate cards still apply inland.',
      cityKeywords: [
        'crestview',
        'crestview fl',
        'fl-85',
        'north okaloosa',
        'i-10 crestview',
      ],
    },
    {
      id: 'niceville-valparaiso',
      name: 'Niceville, Valparaiso & Base-Edge Communities',
      shortName: 'Niceville / Valparaiso',
      neighborhoods: [
        'Niceville',
        'Valparaiso',
        'Eglin / Hurlburt approach influence',
        'Base-edge multi-family and SFH',
        'East bay residential corridors',
      ],
      housingTypes:
        'Military-adjacent multi-family, modest SFH, workforce rentals, some suburban tracts',
      challenges: [
        'PCS peak volume and mid-month military turnover',
        'Apartment COI and elevator windows',
        'Base-area traffic and security-perimeter routing',
        'Shorter notice inventories common in military moves',
      ],
      moverTips:
        'Book PCS windows early. Collect apartment COI before the survey is final. Buffer portal time around base traffic peaks. Inventory carefully for partial loads and storage.',
      cityKeywords: [
        'niceville',
        'valparaiso',
        'eglin',
        'hurlburt',
        'niceville fl',
      ],
    },
  ],
  costDrivers: {
    title: 'Pricing & cost drivers inside Okaloosa County',
    intro:
      'Same square footage prices differently by Destin elevators, military PCS peaks, and whether the job stays beach-adjacent or runs Crestview long-local.',
    drivers: [
      {
        title: 'Destin / Miramar Beach elevator & tourism soft costs',
        detail:
          'Elevator reservations, COI, sand protection, and tourist-peak curb scarcity add labor versus pure inland driveway jobs.',
      },
      {
        title: 'Military PCS peak capacity (Eglin / Hurlburt)',
        detail:
          'PCS windows tighten crews near Fort Walton Beach and Niceville/Valparaiso multi-family and can push rates or lead times.',
      },
      {
        title: 'US-98 / FL-85 / FL-293 / I-10 portal time',
        detail:
          'Destin ↔ Crestview or Fort Walton ↔ Niceville pairs can burn more clock than map miles suggest at peak — freer than dense metros, still billable.',
      },
      {
        title: 'Heat, humidity & storm-season flexibility',
        detail:
          'Gulf heat and hurricane windows compress outdoor hours and can require multi-day or contingent pricing structures.',
      },
    ],
    ranges: [
      {
        label: 'Studio / 1BR (same zone, simple access)',
        value: '$400–$1,200+',
        note: 'Higher with elevators, PCS peaks, or Destin approach windows',
      },
      {
        label: '2–3BR house / apartment',
        value: '$1,250–$3,600+',
        note: 'Cross-zone, military multi-unit, and beach access trend up',
      },
      {
        label: '3–4+ BR (cross-zone / Destin or Crestview long-local)',
        value: '$2,100–$6,000+',
        note: 'Beach elevators, tourism peaks, and inland empty miles price highest',
      },
    ],
  },
  seasonal: {
    title: 'Seasonal, military & tourism calendar intelligence',
    intro:
      'Okaloosa peaks follow Emerald Coast tourism, Eglin/Hurlburt PCS cycles, Gulf summer heat, and hurricane season.',
    items: [
      {
        title: 'Beach tourism peak: roughly spring break through Labor Day',
        detail:
          'Destin and Miramar Beach elevators and curb space fill first. Book early; prefer weekday non-event loads when flexible.',
      },
      {
        title: 'Military PCS windows (Eglin / Hurlburt)',
        detail:
          'Peak PCS seasons fill crews near Fort Walton Beach and Niceville/Valparaiso multi-family first. Book as soon as orders and housing dates allow.',
      },
      {
        title: 'Hurricane season (June–November)',
        detail:
          'Build flexible date language for coastal and low-lying addresses. Confirm storage and reschedule policies before deposit.',
      },
      {
        title: 'Best value: mid-month Tue–Thu, early start outside tourism/PCS crush',
        detail:
          'Still plan around apartment elevator windows when applicable. Dawn starts win when heat and beach arterials are the real constraints.',
      },
    ],
  },
  specialized: [
    {
      id: 'beach-tourism-destin',
      title: 'Beach tourism & Destin logistics',
      intro:
        'Okaloosa’s defining coastal product is Destin/Miramar Beach tourism elevators and US-98 / FL-293 approaches — not Pensacola Perdido alone.',
      bullets: [
        'Reserve elevators early; get COI naming and protection requirements in writing.',
        'Budget sand protection and limited staging plans for Destin-strip blocks.',
        'Avoid peak tourist weekend loads when flexible; price Destin approach congestion honestly.',
        'Document weather reschedule and storage policies before deposit in hurricane season.',
      ],
    },
    {
      id: 'military-eglin-hurlburt',
      title: 'Military (Eglin / Hurlburt) logistics',
      intro:
        'Okaloosa’s defining volume problem is often dual-base PCS multi-family churn around Fort Walton Beach and Niceville/Valparaiso.',
      bullets: [
        'Book as soon as orders, lease, or housing dates allow; peak capacity disappears first near base-edge multi-family.',
        'Collect apartment COI and elevator reservations before the survey is final.',
        'Inventory carefully for partial loads, storage, and short-notice PCS inventories.',
        'Buffer portal time around base-area traffic and shift peaks.',
      ],
    },
    {
      id: 'seasonal-peaks-emerald',
      title: 'Seasonal peaks without Escambia rename assumptions',
      intro:
        'Tourism and military calendars stack — but Okaloosa is not a thinner Escambia script. Survey the actual pocket and corridor pair.',
      bullets: [
        'Name both pockets on every estimate (e.g. Destin → Crestview); “Okaloosa local” hides portal time.',
        'Price peak US-98 / FL-85 / FL-293 pairs honestly — map miles understate tourist and school traffic.',
        'Clarify whether long locals toward Crestview still use a pure beach rate card.',
        'Do not import Pensacola rate cards without naming both cities and access type — this is not an Escambia rename.',
      ],
    },
  ],
  relocation: {
    title: 'Schools & hospitals for relocators',
    intro:
      'Independent Emerald Coast value, military living, and beach tourism calendars are different bets — validate schools and healthcare by pocket, then plan for PCS and storm seasons.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & education',
        intro:
          'Okaloosa County School District covers most public K–12 students. Military families should confirm zoning and transfer timelines early. Match every listing address to the correct boundary.',
        bullets: [
          {
            title: 'Zone before marketing name',
            detail:
              'Destin, Fort Walton Beach, Crestview, and Niceville brands span multiple feeders. Verify with official boundary tools and Florida DOE data.',
          },
          {
            title: 'Military family considerations',
            detail:
              'PCS mid-year moves are common near Eglin and Hurlburt. Coordinate school enrollment early and ask about military family support processes at the district.',
          },
          {
            title: 'Research tools',
            detail:
              'District sites should lead; third-party rankings are secondary. Tour campuses when possible.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Hospitals & healthcare',
        bullets: [
          {
            title: 'Regional acute-care anchors',
            detail:
              'HCA Florida Fort Walton-Destin Hospital, North Okaloosa Medical Center, and other campuses serve Okaloosa. Map ER drive times from Destin, Crestview, and Niceville at peak tourist and commute traffic.',
          },
          {
            title: 'Military & specialty reality',
            detail:
              'Military families may use base medical resources plus civilian systems. Some specialties may require travel toward larger metros — confirm insurer networks before relocating mid-treatment.',
          },
          {
            title: 'Relocator tip',
            detail:
              'Transfer pediatric and specialty care early if mid-treatment; book first appointments before peak tourism or PCS move chaos.',
          },
        ],
      },
    ],
  },
  resources: {
    title: 'Useful Okaloosa County resources',
    intro:
      'Local official links first; directory listings are independent. Verify FDACS for in-state moves and FMCSA for interstate legs before deposits.',
    items: [
      {
        label: 'Okaloosa County — official site',
        href: 'https://www.okaloosafl.gov/',
        note: 'County services hub',
        external: true,
      },
      {
        label: 'City of Destin',
        href: 'https://www.cityofdestin.com/',
        external: true,
      },
      {
        label: 'City of Fort Walton Beach',
        href: 'https://www.fwb.org/',
        external: true,
      },
      {
        label: 'Okaloosa County School District',
        href: 'https://www.okaloosaschools.com/',
        external: true,
      },
    ],
  },
  directoryHint:
    'Filter listings by zone (Destin/Miramar, Fort Walton Beach, Crestview, Niceville/Valparaiso) when available. Confirm PCS timing, Destin elevator windows, and honest US-98 / FL-85 drive assumptions — this is an independent Emerald Coast hub, not an Escambia rename.',
  lastReviewed: '2026-07-24',
});
