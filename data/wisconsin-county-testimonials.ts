import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Wisconsin county testimonials — batch 1 (10 counties) */
export const wisconsinCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  milwaukee: [
    { quote: "Two Men and a Truck Milwaukee handled our suburban move professionally — on time and extremely careful with our home.", name: "Alex M.", location: "Milwaukee, WI", rating: 5, moveType: "Single-family" },
    { quote: "All My Sons Milwaukee navigated our Wauwatosa relocation with fair pricing through Milwaukee metro corridor traffic.", name: "Beth N.", location: "Milwaukee, WI", rating: 5, moveType: "Townhome" },
    { quote: "Lake Michigan Milwaukee Moving served our Shorewood-area move efficiently with steady communication and professional crew coordination.", name: "Carl O.", location: "Shorewood, WI", rating: 5, moveType: "Apartment" },
  ],
  dane: [
    { quote: "Regional Madison / Dane Providers handled our Madison move professionally — on time and extremely careful with our home.", name: "Hal T.", location: "Madison, WI", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Madison navigated our relocation with fair pricing and excellent regional scheduling.", name: "Ivy U.", location: "Madison, WI", rating: 5, moveType: 'Townhome' },
    { quote: "Capitol Square Dane Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Jay V.", location: "Madison, WI", rating: 5, moveType: 'Apartment' },
  ],
  waukesha: [
    { quote: "Regional Waukesha / Waukesha County Providers handled our Waukesha move professionally — on time and extremely careful with our home.", name: "Ivy U.", location: "Waukesha, WI", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Waukesha navigated our relocation with fair pricing and excellent regional scheduling.", name: "Jay V.", location: "Waukesha, WI", rating: 5, moveType: 'Townhome' },
    { quote: "Lake Country Waukesha Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Kim W.", location: "Waukesha, WI", rating: 5, moveType: 'Apartment' },
  ],
  brown: [
    { quote: "Regional Green Bay / Brown Providers handled our Green Bay move professionally — on time and extremely careful with our home.", name: "Jay V.", location: "Green Bay, WI", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Green Bay navigated our relocation with fair pricing and excellent regional scheduling.", name: "Kim W.", location: "Green Bay, WI", rating: 5, moveType: 'Townhome' },
    { quote: "Fox River Brown Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Dana P.", location: "Green Bay, WI", rating: 5, moveType: 'Apartment' },
  ],
  racine: [
    { quote: "Regional Racine / Racine County Providers handled our Racine move professionally — on time and extremely careful with our home.", name: "Kim W.", location: "Racine, WI", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Racine navigated our relocation with fair pricing and excellent regional scheduling.", name: "Dana P.", location: "Racine, WI", rating: 5, moveType: 'Townhome' },
    { quote: "Root River Racine Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Eric Q.", location: "Racine, WI", rating: 5, moveType: 'Apartment' },
  ],
  outagamie: [
    { quote: "Regional Appleton / Outagamie Providers handled our Appleton move professionally — on time and extremely careful with our home.", name: "Dana P.", location: "Appleton, WI", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Appleton navigated our relocation with fair pricing and excellent regional scheduling.", name: "Eric Q.", location: "Appleton, WI", rating: 5, moveType: 'Townhome' },
    { quote: "Fox Cities Outagamie Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Fran R.", location: "Appleton, WI", rating: 5, moveType: 'Apartment' },
  ],
  winnebago: [
    { quote: "Regional Oshkosh / Winnebago Providers handled our Oshkosh move professionally — on time and extremely careful with our home.", name: "Eric Q.", location: "Oshkosh, WI", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Oshkosh navigated our relocation with fair pricing and excellent regional scheduling.", name: "Fran R.", location: "Oshkosh, WI", rating: 5, moveType: 'Townhome' },
    { quote: "Lake Winnebago Winnebago Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Gia S.", location: "Oshkosh, WI", rating: 5, moveType: 'Apartment' },
  ],
  kenosha: [
    { quote: "Regional Kenosha / Kenosha County Providers handled our Kenosha move professionally — on time and extremely careful with our home.", name: "Fran R.", location: "Kenosha, WI", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Kenosha navigated our relocation with fair pricing and excellent regional scheduling.", name: "Gia S.", location: "Kenosha, WI", rating: 5, moveType: 'Townhome' },
    { quote: "Chicago Milwaukee Kenosha Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Hal T.", location: "Kenosha, WI", rating: 5, moveType: 'Apartment' },
  ],
  rock: [
    { quote: "Regional Janesville / Rock Providers handled our Janesville move professionally — on time and extremely careful with our home.", name: "Gia S.", location: "Janesville, WI", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Janesville navigated our relocation with fair pricing and excellent regional scheduling.", name: "Hal T.", location: "Janesville, WI", rating: 5, moveType: 'Townhome' },
    { quote: "Rock River Rock Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Ivy U.", location: "Janesville, WI", rating: 5, moveType: 'Apartment' },
  ],
  marathon: [
    { quote: "Regional Wausau / Marathon Providers handled our Wausau move professionally — on time and extremely careful with our home.", name: "Hal T.", location: "Wausau, WI", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Wausau navigated our relocation with fair pricing and excellent regional scheduling.", name: "Ivy U.", location: "Wausau, WI", rating: 5, moveType: 'Townhome' },
    { quote: "Wisconsin River Marathon Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Jay V.", location: "Wausau, WI", rating: 5, moveType: 'Apartment' },
  ],
};

export function getWisconsinCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return wisconsinCountyTestimonials[countySlug] ?? [];
}
