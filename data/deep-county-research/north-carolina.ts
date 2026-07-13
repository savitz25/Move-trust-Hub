import type { DeepCountyResearch } from '@/data/deep-county-research/types';

export const northCarolinaDeepCountyResearch: Record<string, DeepCountyResearch> = {
  wake: {
    marketNotes:
      'Wake County is the Raleigh-Durham Research Triangle anchor — RTP corporate relocations, NC State housing, Cary and Apex suburban explosion, and rapid in-migration from Northeast metros.',
    costs: {
      studioRange: '$620–$1,350',
      familyRange: '$2,400–$5,900',
      avgHourly: '$115–$175/hr for a 2-person crew',
      note: 'Raleigh pricing reflects I-40 and I-440 beltline congestion, RTP campus moves, and Cary HOA move-in rules.',
    },
    tips: [
      'RTP corporate relocations often need tight timelines — confirm weekend and after-hours crews.',
      'Cary and Apex HOAs require mover registration and may limit truck hours.',
      'NC State and Meredith move weeks compress August — book before June.',
      'I-40 widening construction zones delay west Raleigh crews — build buffer days.',
      'Compare Raleigh vs Durham crew bases for Research Triangle park jobs.',
    ],
    faqExtras: [
      {
        question: 'Is Wake County part of the Research Triangle for mover pricing?',
        answer:
          'Yes — most Wake County movers also serve Durham and Orange counties, but RTP and Cary jobs may include travel minimums. Confirm your quote covers the exact campus or subdivision ZIP.',
      },
    ],
  },
  mecklenburg: {
    marketNotes:
      'Mecklenburg County is Charlotte — banking-sector relocations, Uptown high-rises, South End lofts, and sprawling suburbs in Ballantyne and Huntersville along I-77 and I-485.',
    costs: {
      studioRange: '$600–$1,320',
      familyRange: '$2,350–$5,800',
      avgHourly: '$112–$172/hr for a 2-person crew',
      note: 'Charlotte pricing reflects I-77 toll lane traffic, Uptown elevator logistics, and Ballantyne corporate move volume.',
    },
    tips: [
      'Uptown and South End towers need freight elevator COIs — lead time is often 2+ weeks.',
      'Ballantyne and Piper Glen HOAs issue strict move windows — submit forms before closing.',
      'I-485 construction and I-77 toll lanes affect crew routing — clarify toll fees.',
      'Banking-sector fiscal-year moves peak in Q1 and Q3 — book early for corporate relocations.',
      'Summer humidity affects wood furniture — ask about climate-controlled options.',
    ],
  },
  guilford: {
    marketNotes:
      'Guilford County pairs Greensboro with High Point furniture-market heritage — logistics employment, university housing, and suburban growth feeding the Piedmont Triad.',
    costs: {
      studioRange: '$560–$1,220',
      familyRange: '$2,150–$5,400',
      avgHourly: '$105–$162/hr for a 2-person crew',
      note: 'Greensboro pricing reflects I-40 and I-85 merge traffic, High Point market-week congestion, and UNCG move calendars.',
    },
    tips: [
      'High Point furniture market weeks (April and October) congest local roads — avoid those windows.',
      'UNCG and NC A&T semester turnover peaks in August — students should book early.',
      'Triad corporate moves may pull crews from Winston-Salem — confirm travel fees.',
      'Older Greensboro homes near Fisher Park have tight entries — measure large pieces.',
      'Spring pollen season affects asthmatic crews and clients — morning starts help.',
    ],
  },
  durham: {
    marketNotes:
      'Durham County blends Duke University, Research Triangle Park adjacency, and revitalized downtown lofts with Bull City startup culture and rapid Durham-Chapel Hill commuting.',
    costs: {
      studioRange: '$610–$1,330',
      familyRange: '$2,350–$5,850',
      avgHourly: '$113–$170/hr for a 2-person crew',
      note: 'Durham pricing reflects Duke campus move weeks, downtown loft elevator rules, and RTP cross-county travel.',
    },
    tips: [
      'Duke August move-in and graduation weeks are peak — book before April for fall.',
      'Downtown Durham lofts need elevator reservations; historic Brightleaf lofts have tight stairs.',
      'RTP jobs may be priced from Wake County crews — compare Durham-based quotes.',
      'American Tobacco Campus area parking is limited on event weekends.',
      'Chapel Hill cross-county moves involve Orange County rules — clarify jurisdiction.',
    ],
  },
  forsyth: {
    marketNotes:
      'Forsyth County is Winston-Salem — Wake Forest University, RJR heritage housing, and growing suburban corridors toward Clemmons with Piedmont Triad manufacturing employment.',
    costs: {
      studioRange: '$560–$1,210',
      familyRange: '$2,100–$5,300',
      avgHourly: '$104–$160/hr for a 2-person crew',
      note: 'Winston-Salem pricing reflects I-40 business 40 traffic, Wake Forest move calendars, and Clemmons suburban HOA rules.',
    },
    tips: [
      'Wake Forest move weeks (August, May) tighten availability — book before spring.',
      'Old Salem and West End historic homes need preservation-aware handling.',
      'Clemmons and Lewisville HOAs restrict Sunday truck access in some phases.',
      'Compare Winston-Salem vs Greensboro crews for Triad cross-city jobs.',
      'Tobacco-belt era homes may have narrow doorways — measure before booking.',
    ],
  },
};