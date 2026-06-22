export type CountyTestimonialEntry = {
  quote: string;
  name: string;
  location: string;
  rating: number;
  moveType?: string;
};

export const texasCountyTestimonials: Record<string, CountyTestimonialEntry[]> = {
  borden: [
    {
      quote:
        'Our Gail ranch move required a crew willing to drive in from Lubbock and navigate a long caliche driveway. They confirmed truck size ahead of time and handled our remote West Texas relocation professionally.',
      name: 'James R.',
      location: 'Gail, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Finding movers for Borden County was nearly impossible until a Midland-based team agreed to make the trip. Careful handling on rough ranch roads and fair travel-fee disclosure made the process manageable.',
      name: 'Susan T.',
      location: 'Borden County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We relocated a small home near Gail with limited storage options nearby. The regional provider coordinated a Lubbock warehouse hold and delivered on schedule despite the sparse local market.',
      name: 'Mark D.',
      location: 'Gail, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  kenedy: [
    {
      quote:
        'Our Sarita ranch move needed a Corpus Christi crew comfortable with South Texas heat and long ranch gates. They verified service area upfront and finished the load without damaging our tile floors.',
      name: 'Elena V.',
      location: 'Sarita, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'Kenedy County is so remote that most movers declined until a Kingsville-based provider agreed. Professional service, careful packing, and clear travel-fee estimates saved us from a last-minute scramble.',
      name: 'Carlos M.',
      location: 'Kenedy County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'We moved out of a remote South Texas property with no local storage. The regional team routed our overflow through a Corpus Christi facility and kept us updated throughout the multi-day job.',
      name: 'Linda K.',
      location: 'Sarita, TX',
      rating: 4,
      moveType: 'Ranch outbuilding',
    },
  ],
  king: [
    {
      quote:
        'Guthrie is about as remote as it gets in Texas. A Lubbock regional crew drove hours in, handled our ranch house and barn tools, and navigated our gravel access road without issues.',
      name: 'Tom W.',
      location: 'Guthrie, TX',
      rating: 5,
      moveType: 'Ranch',
    },
    {
      quote:
        'We worried no one would serve King County until a Wichita Falls provider confirmed coverage. Professional for our remote ranch move with careful handling of antiques and livestock-area equipment.',
      name: 'Karen B.',
      location: 'King County, TX',
      rating: 5,
      moveType: 'Rural',
    },
    {
      quote:
        'Our King County relocation involved a long driveway and limited cell service. The movers coordinated arrival windows clearly and finished faster than expected despite the West Texas distance.',
      name: 'Derek H.',
      location: 'Guthrie, TX',
      rating: 4,
      moveType: 'Single-family',
    },
  ],
  loving: [
    {
      quote:
        'Mentone may be the smallest county seat in Texas, but an Odessa regional crew made our desert property move work. They confirmed oilfield-area access and handled challenging terrain without damage.',
      name: 'Rachel P.',
      location: 'Mentone, TX',
      rating: 5,
      moveType: 'Remote desert',
    },
    {
      quote:
        'We needed cross-border coordination from Hobbs, NM into Loving County. The regional provider verified licensing, gave a fair travel estimate, and delivered professional service in the oil patch.',
      name: 'Steve L.',
      location: 'Loving County, TX',
      rating: 5,
      moveType: 'Oilfield area',
    },
    {
      quote:
        'Finding any mover willing to reach Mentone was the hard part. Once booked, the Odessa team was efficient, reliable, and upfront about storage limitations in such a remote county.',
      name: 'Angela F.',
      location: 'Mentone, TX',
      rating: 4,
      moveType: 'Rural',
    },
  ],
};

export function getTexasCountyTestimonials(
  countySlug: string
): CountyTestimonialEntry[] {
  return texasCountyTestimonials[countySlug] ?? [];
}