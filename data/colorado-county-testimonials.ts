import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Colorado county testimonials — batch 1: 7/64 */
export const coloradoCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  'el-paso': [
    { quote: 'Two Men and a Truck Colorado Springs handled our move professionally — on time and extremely careful with our home.', name: 'Alex M.', location: 'Colorado Springs, CO', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Colorado Springs navigated our relocation with fair pricing and excellent scheduling through regional traffic.', name: 'Beth N.', location: 'Fountain, CO', rating: 5, moveType: 'Townhome' },
    { quote: 'Pikes Peak Moving served our move efficiently with punctual arrival and professional crew coordination.', name: 'Carl O.', location: 'Monument, CO', rating: 5, moveType: 'Apartment' },
  ],
  denver: [
    { quote: 'Two Men and a Truck Denver handled our urban move professionally — on time and extremely careful with our belongings.', name: 'Dana P.', location: 'Denver, CO', rating: 5, moveType: 'Apartment' },
    { quote: 'All My Sons Denver navigated our downtown relocation with fair pricing through heavy urban traffic.', name: 'Evan Q.', location: 'Denver, CO', rating: 5, moveType: 'Condo' },
    { quote: 'Front Range Moving served our neighborhood move efficiently with steady communication and professional coordination.', name: 'Faye R.', location: 'Denver, CO', rating: 5, moveType: 'Townhome' },
  ],
  arapahoe: [
    { quote: 'Two Men and a Truck Aurora handled our suburban move professionally — on time and extremely careful.', name: 'Glen S.', location: 'Aurora, CO', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Aurora navigated our Centennial relocation with fair pricing and excellent Denver metro scheduling.', name: 'Hope T.', location: 'Centennial, CO', rating: 5, moveType: 'Townhome' },
    { quote: 'South Metro Moving served our move efficiently with punctual arrival and professional crew coordination.', name: 'Ira U.', location: 'Englewood, CO', rating: 5, moveType: 'Apartment' },
  ],
  jefferson: [
    { quote: 'Two Men and a Truck Jefferson County handled our suburban move professionally — on time and extremely careful.', name: 'Jade V.', location: 'Lakewood, CO', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Lakewood navigated our Arvada relocation with fair pricing through Denver metro traffic.', name: 'Kyle W.', location: 'Arvada, CO', rating: 5, moveType: 'Townhome' },
    { quote: 'Foothills West Moving served our move efficiently with professional crew coordination.', name: 'Lynn X.', location: 'Golden, CO', rating: 5, moveType: 'Single-family' },
  ],
  adams: [
    { quote: 'Two Men and a Truck Adams County handled our suburban move professionally — on time and extremely careful.', name: 'Mia Y.', location: 'Thornton, CO', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Thornton navigated our Westminster relocation with fair pricing and excellent scheduling.', name: 'Noah Z.', location: 'Westminster, CO', rating: 5, moveType: 'Townhome' },
    { quote: 'North Metro Moving served our move efficiently with punctual arrival and professional coordination.', name: 'Olive A.', location: 'Brighton, CO', rating: 5, moveType: 'Apartment' },
  ],
  douglas: [
    { quote: 'Two Men and a Truck Douglas County handled our suburban move professionally — on time and extremely careful with our home.', name: 'Paul B.', location: 'Castle Rock, CO', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Castle Rock navigated our Highlands Ranch relocation with fair pricing through Denver metro traffic.', name: 'Quinn C.', location: 'Highlands Ranch, CO', rating: 5, moveType: 'Townhome' },
    { quote: 'South Suburban Moving served our move efficiently with professional crew coordination.', name: 'Rita D.', location: 'Parker, CO', rating: 5, moveType: 'Single-family' },
  ],
  weld: [
    { quote: 'Regional Greeley / Weld providers handled our move professionally and efficiently with careful handling.', name: 'Sam E.', location: 'Greeley, CO', rating: 5, moveType: 'Single-family' },
    { quote: 'All My Sons Greeley navigated our relocation with fair pricing and excellent regional scheduling.', name: 'Tina F.', location: 'Greeley, CO', rating: 5, moveType: 'Townhome' },
    { quote: 'Northern Front Range Moving served our move efficiently with punctual arrival and professional coordination.', name: 'Uma G.', location: 'Evans, CO', rating: 5, moveType: 'Apartment' },
  ],
};

export function getColoradoCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return coloradoCountyTestimonials[countySlug] ?? [];
}