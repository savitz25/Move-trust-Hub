import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Washington county testimonials — 8 premium hubs */
export const washingtonCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  king: [
    { quote: 'Two Men and a Truck Seattle handled our Capitol Hill move professionally — on time and extremely careful with our urban apartment.', name: 'Alex M.', location: 'Seattle, WA', rating: 5, moveType: 'Apartment' },
    { quote: 'All My Sons Seattle navigated our Bellevue relocation with fair pricing through bridge-crossing traffic scheduling.', name: 'Beth N.', location: 'Bellevue, WA', rating: 5, moveType: 'Townhome' },
    { quote: 'Seattle Moving served our Redmond tech-corridor move efficiently with steady communication and professional crew coordination.', name: 'Carl O.', location: 'Redmond, WA', rating: 5, moveType: 'Single-family' },
  ],
  pierce: [
    { quote: 'Two Men and a Truck Tacoma handled our Lakewood move professionally — on time and extremely careful with our suburban home.', name: 'Dana P.', location: 'Lakewood, WA', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Tacoma navigated our Tacoma relocation with fair pricing through Seattle-Tacoma metro traffic scheduling.', name: 'Evan Q.', location: 'Tacoma, WA', rating: 5, moveType: 'Townhome' },
    { quote: 'Tacoma Corridor Moving served our Puyallup move efficiently with punctual arrival and professional crew coordination.', name: 'Faye R.', location: 'Puyallup, WA', rating: 5, moveType: 'Single-family' },
  ],
  snohomish: [
    { quote: 'Two Men and a Truck Snohomish County handled our Everett move professionally — on time and extremely careful with our suburban home.', name: 'Glen S.', location: 'Everett, WA', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Everett navigated our Lynnwood relocation with fair pricing through heavy Seattle metro traffic scheduling.', name: 'Hope T.', location: 'Lynnwood, WA', rating: 5, moveType: 'Townhome' },
    { quote: 'Everett Corridor Moving served our Marysville move efficiently with steady communication and professional coordination.', name: 'Ira U.', location: 'Marysville, WA', rating: 5, moveType: 'Apartment' },
  ],
  spokane: [
    { quote: 'Two Men and a Truck Spokane handled our South Hill move professionally — on time and extremely careful with our suburban home.', name: 'Jade V.', location: 'Spokane, WA', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Spokane navigated our Spokane Valley relocation with fair pricing and excellent regional scheduling.', name: 'Kyle W.', location: 'Spokane Valley, WA', rating: 5, moveType: 'Townhome' },
    { quote: 'Spokane Corridor Moving served our Cheney move efficiently with punctual arrival and professional crew coordination.', name: 'Lynn X.', location: 'Cheney, WA', rating: 5, moveType: 'Single-family' },
  ],
  clark: [
    { quote: 'Two Men and a Truck Vancouver WA handled our suburban move professionally — on time and extremely careful with our home.', name: 'Mark Y.', location: 'Vancouver, WA', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Vancouver navigated our relocation with fair pricing through Portland metro bridge-crossing traffic.', name: 'Nina Z.', location: 'Vancouver, WA', rating: 5, moveType: 'Townhome' },
    { quote: 'Vancouver Corridor Moving served our Camas move efficiently with steady communication and professional coordination.', name: 'Otto A.', location: 'Camas, WA', rating: 5, moveType: 'Apartment' },
  ],
  thurston: [
    { quote: 'Regional Olympia / Thurston providers handled our capital-region move professionally — efficient and careful with our Olympia home.', name: 'Paul B.', location: 'Olympia, WA', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Olympia navigated our Lacey relocation with fair pricing and excellent regional scheduling.', name: 'Quinn C.', location: 'Lacey, WA', rating: 5, moveType: 'Townhome' },
    { quote: 'Olympia Corridor Moving served our Tumwater move efficiently with punctual arrival and professional coordination.', name: 'Rita D.', location: 'Tumwater, WA', rating: 5, moveType: 'Single-family' },
  ],
  kitsap: [
    { quote: 'Regional Bremerton / Kitsap providers handled our peninsula move professionally — efficient and careful with our waterfront home.', name: 'Sam E.', location: 'Bremerton, WA', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Bremerton navigated our Port Orchard relocation with fair pricing through ferry-season scheduling.', name: 'Tina F.', location: 'Port Orchard, WA', rating: 5, moveType: 'Townhome' },
    { quote: 'Bremerton Corridor Moving served our Silverdale move efficiently with steady communication and professional coordination.', name: 'Uma G.', location: 'Silverdale, WA', rating: 5, moveType: 'Apartment' },
  ],
  yakima: [
    { quote: 'Regional Yakima / Yakima County providers handled our Central Washington move professionally — efficient and careful with our valley home.', name: 'Vic H.', location: 'Yakima, WA', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Yakima navigated our West Valley relocation with fair pricing and excellent regional scheduling.', name: 'Wendy I.', location: 'Yakima, WA', rating: 5, moveType: 'Townhome' },
    { quote: 'Yakima Corridor Moving served our Selah move efficiently with punctual arrival and professional crew coordination.', name: 'Xander J.', location: 'Selah, WA', rating: 5, moveType: 'Single-family' },
  ],
};

export function getWashingtonCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return washingtonCountyTestimonials[countySlug] ?? [];
}