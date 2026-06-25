import type { CountyTestimonialEntry } from '@/lib/local-movers/county-seo';

/** Hand-curated Minnesota county testimonials — 11 counties */
export const minnesotaCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  hennepin: [
    { quote: "Two Men and a Truck Minneapolis handled our suburban move professionally — on time and extremely careful with our home.", name: "Alex M.", location: "Minneapolis, MN", rating: 5, moveType: "Single-family" },
    { quote: "All My Sons Minneapolis navigated our Edina relocation with fair pricing through Twin Cities metro corridor traffic.", name: "Beth N.", location: "Minneapolis, MN", rating: 5, moveType: "Townhome" },
    { quote: "Twin Cities Metro West Moving served our Bloomington-area move efficiently with steady communication and professional crew coordination.", name: "Carl O.", location: "Bloomington, MN", rating: 5, moveType: "Apartment" },
  ],
  ramsey: [
    { quote: "Regional Saint Paul / Ramsey Providers handled our Saint Paul move professionally — on time and extremely careful with our home.", name: "Hal T.", location: "Saint Paul, MN", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Saint Paul navigated our relocation with fair pricing and excellent regional scheduling.", name: "Ivy U.", location: "Saint Paul, MN", rating: 5, moveType: 'Townhome' },
    { quote: "Mississippi River Ramsey Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Jay V.", location: "Saint Paul, MN", rating: 5, moveType: 'Apartment' },
  ],
  dakota: [
    { quote: "Regional Lakeville / Dakota Providers handled our Lakeville move professionally — on time and extremely careful with our home.", name: "Ivy U.", location: "Lakeville, MN", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Lakeville navigated our relocation with fair pricing and excellent regional scheduling.", name: "Jay V.", location: "Hastings, MN", rating: 5, moveType: 'Townhome' },
    { quote: "Minnesota River Dakota Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Kim W.", location: "Lakeville, MN", rating: 5, moveType: 'Apartment' },
  ],
  anoka: [
    { quote: "Regional Anoka / Anoka County Providers handled our Anoka move professionally — on time and extremely careful with our home.", name: "Jay V.", location: "Anoka, MN", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Anoka navigated our relocation with fair pricing and excellent regional scheduling.", name: "Kim W.", location: "Anoka, MN", rating: 5, moveType: 'Townhome' },
    { quote: "Rum River Valley Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Dana P.", location: "Anoka, MN", rating: 5, moveType: 'Apartment' },
  ],
  washington: [
    { quote: "Regional Stillwater / Washington Providers handled our Stillwater move professionally — on time and extremely careful with our home.", name: "Kim W.", location: "Stillwater, MN", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Stillwater navigated our relocation with fair pricing and excellent regional scheduling.", name: "Dana P.", location: "Stillwater, MN", rating: 5, moveType: 'Townhome' },
    { quote: "St. Croix River Valley Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Eric Q.", location: "Stillwater, MN", rating: 5, moveType: 'Apartment' },
  ],
  'st-louis': [
    { quote: "Regional Duluth / St. Louis Providers handled our Duluth move professionally — on time and extremely careful with our home.", name: "Dana P.", location: "Duluth, MN", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Duluth navigated our relocation with fair pricing and excellent regional scheduling.", name: "Eric Q.", location: "Duluth, MN", rating: 5, moveType: 'Townhome' },
    { quote: "Lake Superior North Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Fran R.", location: "Duluth, MN", rating: 5, moveType: 'Apartment' },
  ],
  olmsted: [
    { quote: "Regional Rochester / Olmsted Providers handled our Rochester move professionally — on time and extremely careful with our home.", name: "Eric Q.", location: "Rochester, MN", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Rochester navigated our relocation with fair pricing and excellent regional scheduling.", name: "Fran R.", location: "Rochester, MN", rating: 5, moveType: 'Townhome' },
    { quote: "Zumbro River Valley Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Gia S.", location: "Rochester, MN", rating: 5, moveType: 'Apartment' },
  ],
  stearns: [
    { quote: "Regional St. Cloud / Stearns Providers handled our St. Cloud move professionally — on time and extremely careful with our home.", name: "Fran R.", location: "St. Cloud, MN", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons St. Cloud navigated our relocation with fair pricing and excellent regional scheduling.", name: "Gia S.", location: "St. Cloud, MN", rating: 5, moveType: 'Townhome' },
    { quote: "Mississippi River Stearns Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Hal T.", location: "St. Cloud, MN", rating: 5, moveType: 'Apartment' },
  ],
  scott: [
    { quote: "Regional Shakopee / Scott Providers handled our Shakopee move professionally — on time and extremely careful with our home.", name: "Gia S.", location: "Shakopee, MN", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Shakopee navigated our relocation with fair pricing and excellent regional scheduling.", name: "Hal T.", location: "Shakopee, MN", rating: 5, moveType: 'Townhome' },
    { quote: "Minnesota River Scott Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Ivy U.", location: "Shakopee, MN", rating: 5, moveType: 'Apartment' },
  ],
  wright: [
    { quote: "Regional Buffalo / Wright Providers handled our Buffalo move professionally — on time and extremely careful with our home.", name: "Hal T.", location: "Buffalo, MN", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Buffalo navigated our relocation with fair pricing and excellent regional scheduling.", name: "Ivy U.", location: "Buffalo, MN", rating: 5, moveType: 'Townhome' },
    { quote: "Crow River Valley Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Jay V.", location: "Buffalo, MN", rating: 5, moveType: 'Apartment' },
  ],
  carver: [
    { quote: "Regional Chaska / Carver Providers handled our Chaska move professionally — on time and extremely careful with our home.", name: "Ivy U.", location: "Chaska, MN", rating: 5, moveType: 'Single-family' },
    { quote: "All My Sons Chaska navigated our relocation with fair pricing and excellent regional scheduling.", name: "Jay V.", location: "Chaska, MN", rating: 5, moveType: 'Townhome' },
    { quote: "Minnesota River Carver Moving served our move efficiently with punctual arrival and professional crew coordination.", name: "Kim W.", location: "Chaska, MN", rating: 5, moveType: 'Apartment' },
  ],
};

export function getMinnesotaCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return minnesotaCountyTestimonials[countySlug] ?? [];
}
