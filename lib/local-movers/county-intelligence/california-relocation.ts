/**
 * California county relocation + specialized logistics modules.
 * Merged into county intelligence packs when those sections are missing.
 */
import type {
  CountyIntelligencePack,
  CountyRelocationModule,
  CountySpecializedModule,
} from './types';
import { DEFAULT_INTELLIGENCE_SECTION_ORDER } from './types';

export type { CountyRelocationModule, CountySpecializedModule };

type RelocationBlock = {
  title: string;
  intro: string;
  modules: CountyRelocationModule[];
};

export const CA_RELOCATION: Record<string, RelocationBlock> = {
  'los-angeles': {
    title: 'Is Los Angeles County the right fit?',
    intro:
      'LA County is a federation of housing markets, school districts, and commute realities. Treat the county brand as a map — choose a specific basin, valley, or coastal pocket before you sign a lease.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro:
          'Public education here is fragmented across many districts and charters. District boundaries often matter more than the city name on the mailbox.',
        bullets: [
          {
            title: 'Major systems to map first',
            detail:
              'Los Angeles Unified (LAUSD) covers large swaths of the city and some unincorporated areas; Long Beach Unified, Pasadena Unified, Torrance Unified, Santa Monica–Malibu Unified, Burbank Unified, Glendale Unified, and Pomona Unified are other large district anchors. Confirm the exact attendance zone for any address.',
          },
          {
            title: 'Magnet, charter & private overlays',
            detail:
              'Many families layer magnet applications, charter lotteries, or private options on top of neighborhood schools. Build calendar buffer for application windows if that path matters to you.',
          },
          {
            title: 'Do not trust a single ranking',
            detail:
              'Avoid shopping by headline GPA or “best school” lists alone. Tour campuses, ask about special education capacity, dual language, and after-care — program fit varies block by block.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        intro: 'Tertiary care is strong in aggregate; drive time and insurance networks decide day-to-day access.',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Cedars-Sinai, UCLA Health, Keck Medicine of USC, Kaiser Permanente, Providence, Adventist Health, and county DHS facilities (including LAC+USC) are among the systems residents commonly navigate. Specialty centers cluster differently on the Westside, downtown, and San Gabriel Valley.',
          },
          {
            title: 'Insurance & network reality',
            detail:
              'A hospital 8 miles away can be out of network or a 70-minute drive at peak hour. Verify primary-care and pediatric panels before you close on a lease.',
          },
          {
            title: 'Emergency access varies by zone',
            detail:
              'Hillside, canyon, and Antelope Valley addresses can mean longer EMS and ER drive times than Westside or mid-city corridors. Map the nearest ED for your specific street.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Micro-markets, not one price',
            detail:
              'Westside condos, San Fernando Valley tract homes, South Bay multi-units, and Antelope Valley newer subdivisions price and compete on different rules. County medians hide extreme spreads.',
          },
          {
            title: 'Rent control & building rules',
            detail:
              'City of LA and several other cities layer tenant protections and building move rules. Older walk-ups vs. post-1978 stock change both rent dynamics and truck logistics.',
          },
          {
            title: 'HOA / condo dues as a second mortgage',
            detail:
              'Coastal and DTLA towers often carry high HOA fees, elevator reserves, and strict move windows — budget soft costs, not only purchase price or base rent.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town & zone personality',
        bullets: [
          {
            title: 'Westside & beach cities',
            detail:
              'Santa Monica, Venice, Culver City, Marina — denser living, parking friction, coastal marine layer, premium rents.',
          },
          {
            title: 'San Fernando & San Gabriel valleys',
            detail:
              'More house-for-dollar than the Westside in many pockets; summer heat and freeway dependence define daily life.',
          },
          {
            title: 'South Bay & Long Beach',
            detail:
              'Port-adjacent logistics, mixed condo/house stock, and cross-traffic on the 110/710 corridors.',
          },
          {
            title: 'Hills & canyons',
            detail:
              'Hollywood Hills, Mount Washington, parts of Malibu and Palos Verdes trade views for shuttle trucks, grades, and fire-season awareness.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Employment is multi-nodal',
            detail:
              'Entertainment, tech, aerospace, ports, healthcare, and government do not share one downtown. Living near one job center can strand you for another.',
          },
          {
            title: 'Freeway time is the real distance',
            detail:
              'I-405, I-10, US-101, I-110, and I-5 routinely turn short map miles into long hours. Test your commute at the hour you would actually drive it.',
          },
          {
            title: 'Transit works for some corridors only',
            detail:
              'Metro rail and bus help along select spines; most households still plan around a car, especially for school runs and multi-stop days.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Coast vs inland summers',
            detail:
              'Marine layer cools the Westside; inland valleys and Antelope Valley often hit triple digits — plan move-day starts and AC readiness accordingly.',
          },
          {
            title: 'Air quality & fire season',
            detail:
              'Santa Ana winds, wildfire smoke days, and basin inversion can cancel outdoor plans and complicate move windows in canyon edges.',
          },
          {
            title: 'Parking is lifestyle infrastructure',
            detail:
              'Preferential parking districts, street sweeping, and guest rules shape whether friends can visit and whether a moving truck can legally stage.',
          },
        ],
      },
    ],
  },

  orange: {
    title: 'Is Orange County the right fit?',
    intro:
      'OC pairs master-planned suburbs and coastal cities with strong HOA culture. Coastal vs inland microclimates and master-association rules often matter more than the county label.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'Families often shortlist by district reputation and planned-community amenities — still verify the address boundary.',
        bullets: [
          {
            title: 'Large district anchors',
            detail:
              'Capistrano Unified, Irvine Unified, Newport-Mesa Unified, Garden Grove Unified, Santa Ana Unified, Anaheim Union / Anaheim Elementary pairings, Orange Unified, and Tustin Unified are among the systems residents research most. Boundaries are not the same as city limits.',
          },
          {
            title: 'Master-planned school feeder patterns',
            detail:
              'Irvine, Mission Viejo, and similar planned communities often have well-known feeder paths — still re-check annually; attendance zones can shift with growth.',
          },
          {
            title: 'Program fit over prestige labels',
            detail:
              'Compare IB, dual immersion, arts, and special education capacity directly with districts. Third-party rank lists lag real program changes.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Hoag, UCI Health, Providence (including Mission Hospital corridors), Kaiser Permanente, MemorialCare, and CHOC for pediatrics are common system names on OC insurance cards. Specialty depth is strong along the coastal and central corridors.',
          },
          {
            title: 'Network + traffic math',
            detail:
              'South County to north County specialty appointments can burn a half-day in I-5 or 405 traffic. Map clinics near home and work, not only flagship campuses.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Coastal premium vs inland value',
            detail:
              'Newport, Laguna, and Huntington Beach command coastal premiums; inland cities and parts of south County trade distance-to-beach for more square footage.',
          },
          {
            title: 'HOA is the default operating system',
            detail:
              'Many townhome and single-family tracts require COIs, move-hour limits, and architectural reviews. Factor dues and rules into total cost of ownership.',
          },
          {
            title: 'Inventory competition',
            detail:
              'Desirable school-feeder neighborhoods can see multiple-offer pressure. Rentals in coastal zips turn fast — have documents ready.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'Coastal cities',
            detail:
              'Huntington, Newport, Laguna, San Clemente — beach access, tourism spillover, tighter parking, higher price floors.',
          },
          {
            title: 'Central / planned suburbs',
            detail:
              'Irvine, Tustin, Costa Mesa edges — master plans, business parks, polished amenities, dense HOA rulebooks.',
          },
          {
            title: 'North County mix',
            detail:
              'Anaheim, Fullerton, Orange, Garden Grove — more housing variety, Disneyland-area tourism traffic, and mixed older/newer stock.',
          },
          {
            title: 'South County corridors',
            detail:
              'Mission Viejo, Laguna Niguel, Rancho Santa Margarita — family-oriented planned communities with longer LA-bound commutes.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Job centers',
            detail:
              'Irvine Spectrum / business parks, medical corridors, tourism (Anaheim), and coastal professional services. Many residents still reverse-commute into LA County.',
          },
          {
            title: 'Corridor reality',
            detail:
              'I-5, I-405, SR-55, SR-91, and SR-73 define daily life. Express lanes help some drivers; others time-shift starts aggressively.',
          },
          {
            title: 'Metrolink & limited rail',
            detail:
              'Metrolink and limited transit serve select stations; most household logistics remain car-based.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Coastal cool vs inland heat',
            detail:
              'Beach cities stay milder; inland valleys warm faster in summer. Move-day hydration and early starts matter more inland.',
          },
          {
            title: 'Tourism & event calendars',
            detail:
              'Disneyland-area and summer beach weekends inflate traffic and short-term rental turnover. Avoid peak tourist Saturdays when you can.',
          },
          {
            title: 'Outdoor culture, car dependence',
            detail:
              'Parks, trails, and beaches are lifestyle draws — but errands and school runs usually still need a car outside a few walkable cores.',
          },
        ],
      },
    ],
  },

  'san-diego': {
    title: 'Is San Diego County the right fit?',
    intro:
      'Military PCS cycles, coastal condo living, and inland suburban sprawl sit side by side. Choose by base access, beach vs inland climate, and how far you will drive for work.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'Districts and base-adjacent communities each have different transfer and capacity dynamics.',
        bullets: [
          {
            title: 'Major district anchors',
            detail:
              'San Diego Unified, Poway Unified, Grossmont Union / feeder elementary districts, Sweetwater Union, Oceanside Unified, Carlsbad Unified, and Vista Unified are among the systems families map when choosing towns. Confirm high-school feeder paths, not only elementary brands.',
          },
          {
            title: 'Military family mobility',
            detail:
              'PCS-driven enrollment churn near bases can affect waitlists and housing competition. Contact district enrollment offices early if orders are time-sensitive.',
          },
          {
            title: 'North County vs South Bay vs East County',
            detail:
              'Program availability and commute-to-school patterns differ sharply across these subregions — do not assume “San Diego schools” means one experience.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'UC San Diego Health, Scripps Health, Sharp HealthCare, Kaiser Permanente, and Naval Medical Center San Diego (for eligible beneficiaries) are core access points. Specialty clustering is denser along the I-5 / coastal medical corridor.',
          },
          {
            title: 'North & East County travel',
            detail:
              'Residents in Escondido, Oceanside, or Alpine may travel significant distance for certain specialties. Check network hospitals near both home and duty station.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Coastal condo & military rental pressure',
            detail:
              'Coastal zips and base-adjacent rentals compete hard during PCS seasons. Expect HOA move rules in towers and gated complexes.',
          },
          {
            title: 'Inland tradeoffs',
            detail:
              'East County and inland North County often offer more space for the dollar with hotter summers and longer coastal drives.',
          },
          {
            title: 'BAH vs market rents',
            detail:
              'Military households should cross-check BAH against actual zip-level rents — popular school or beach zips can exceed assumptions.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'Coastal urban core',
            detail:
              'Downtown, Bankers Hill, Pacific Beach, La Jolla edges — density, parking rules, tourism, and elevator buildings.',
          },
          {
            title: 'North County coastal & inland',
            detail:
              'Carlsbad, Oceanside, Encinitas vs Escondido, San Marcos — beach lifestyle vs more suburban square footage.',
          },
          {
            title: 'South Bay & border adjacency',
            detail:
              'Chula Vista, National City, Imperial Beach — diverse housing stock and cross-border traffic patterns on some days.',
          },
          {
            title: 'East County',
            detail:
              'El Cajon, Santee, Alpine — more inland heat, larger lots in places, longer trips to coastal jobs.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Defense, biotech, tourism, healthcare',
            detail:
              'Bases, biotech clusters, hospitality, and hospital systems drive employment. Many households optimize for one of these anchors.',
          },
          {
            title: 'I-5 / I-15 / I-8 spines',
            detail:
              'North–south I-5 and I-15 and east–west I-8 set commute pain. Midday heat can make long parking-lot waits harder on move day.',
          },
          {
            title: 'PCS timing',
            detail:
              'Summer PCS waves tighten mover calendars and rentals. Book crews and temporary lodging early when orders drop.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Mild coast, hotter inland',
            detail:
              'Coastal marine influence keeps many beach cities temperate; inland valleys run hotter and drier — plan AC and early load times accordingly.',
          },
          {
            title: 'May gray / June gloom',
            detail:
              'Late-spring marine layer can keep mornings damp near the coast; protect floors and allow cardboard dry-out time.',
          },
          {
            title: 'Outdoor culture with canyon edges',
            detail:
              'Beaches, parks, and trails are central — also respect wildfire and canyon access constraints on certain move routes.',
          },
        ],
      },
    ],
  },

  'santa-clara': {
    title: 'Is Santa Clara County the right fit?',
    intro:
      'Silicon Valley relocation is as much about HOA elevators and total housing cost as it is about the job offer. Town choice often follows school boundaries and Caltrain / 101 / 280 access.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'Tech families frequently filter towns by district and high-school feeder — validate the parcel, not the city marketing name.',
        bullets: [
          {
            title: 'Major district anchors',
            detail:
              'San Jose Unified, Fremont Union High / underlying elementary districts, Palo Alto Unified, Cupertino Union / Fremont Union feeders, Santa Clara Unified, Campbell Union, Mountain View Whisman / Mountain View–Los Altos, and Gilroy Unified are among systems commonly researched. High-school district lines can differ from elementary lines.',
          },
          {
            title: 'Competitive enrollment pressure',
            detail:
              'Housing near popular feeders is scarce and expensive. Transfer and open-enrollment policies change — read the current district rules.',
          },
          {
            title: 'Private & international options',
            detail:
              'Many dual-career households evaluate private and language programs alongside public schools. Factor tuition into total cost of living.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Stanford Health Care, El Camino Health, Kaiser Permanente, Santa Clara Valley Medical Center, and Good Samaritan / HCA-affiliated campuses are common access points. Pediatric and specialty referrals often route to regional centers.',
          },
          {
            title: 'Employer network complexity',
            detail:
              'Tech benefits packages may favor specific systems. Align housing location with in-network primary care if possible.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Among the highest cost floors in the U.S.',
            detail:
              'Purchase prices and rents in Palo Alto, Cupertino, Los Altos, Mountain View, and parts of San Jose reflect global tech demand. Budget total compensation against real after-tax, after-housing cash flow.',
          },
          {
            title: 'Condo / townhome entry points',
            detail:
              'Many arrivals start in HOA communities with elevator rules, parking stickers, and reserved move elevators — logistics paperwork is part of the housing search.',
          },
          {
            title: 'South County trade',
            detail:
              'Gilroy / Morgan Hill can offer more space with longer Peninsula and North County job commutes.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'Peninsula north edge',
            detail:
              'Palo Alto, Mountain View, Los Altos — walkable pockets, extreme housing costs, proximity to major campuses.',
          },
          {
            title: 'West Valley',
            detail:
              'Cupertino, Saratoga, Los Gatos — family-oriented, hills, premium pricing, school-driven demand.',
          },
          {
            title: 'San Jose mosaic',
            detail:
              'Downtown towers, older bungalows, and diverse suburban districts — experience varies by neighborhood more than city brand.',
          },
          {
            title: 'South County',
            detail:
              'Morgan Hill, Gilroy — more suburban/agricultural edge feel and longer tech-corridor drives.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Tech campus gravity',
            detail:
              'Major employers cluster along 101, 280, and campus shuttles. Living “in Silicon Valley” still can mean 45–90 minute reverse or cross-valley trips.',
          },
          {
            title: 'Caltrain, VTA, employer shuttles',
            detail:
              'Rail and shuttles help some corridors; last-mile and school logistics still often need a car.',
          },
          {
            title: 'Hybrid schedules change the math',
            detail:
              '2–3 office days can justify a longer home location — re-test traffic on actual office days, not midday Sunday drives.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Mild Mediterranean, inland heat pockets',
            detail:
              'Generally mild, but South County and inland valleys run warmer. Air quality can dip during wildfire smoke events.',
          },
          {
            title: 'Hills & microclimates',
            detail:
              'Los Gatos / Saratoga foothills bring cooler nights and tighter truck access on some streets.',
          },
          {
            title: 'Cost as lifestyle constraint',
            detail:
              'Dining, childcare, and services price at tech-region levels. Build a full budget beyond rent or mortgage.',
          },
        ],
      },
    ],
  },

  alameda: {
    title: 'Is Alameda County the right fit?',
    intro:
      'East Bay living spans Oakland density, Berkeley politics and hills, suburban Tri-Valley jobs, and BART-oriented corridors. Hills, freeways, and transit access define daily friction.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'District quality and vibe vary widely from Oakland to the Tri-Valley — choose the district, not “the East Bay.”',
        bullets: [
          {
            title: 'Major district anchors',
            detail:
              'Oakland Unified, Berkeley Unified, Fremont Unified, Hayward Unified, Alameda Unified, San Leandro Unified, Pleasanton Unified, Dublin Unified, and Livermore Valley Joint Unified are among systems families compare. Charter options are significant in some cities.',
          },
          {
            title: 'Hill vs flatland attendance patterns',
            detail:
              'In Oakland and Berkeley especially, neighborhood and lottery dynamics matter. Confirm current enrollment rules for any address.',
          },
          {
            title: 'Tri-Valley family draw',
            detail:
              'Dublin, Pleasanton, and Livermore often attract households seeking suburban campuses and newer housing — at corresponding price levels.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'UCSF Benioff / regional partners, Kaiser Permanente (multiple East Bay campuses), Sutter Health, Alameda Health System, and Stanford Health Care – ValleyCare (Tri-Valley) are common systems. Trauma and specialty care may route to Oakland or SF for some cases.',
          },
          {
            title: 'Bridge & tunnel delay for appointments',
            detail:
              'Peninsula or SF specialists can be a half-day trip. Prefer local networks when clinically appropriate.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Density gradient',
            detail:
              'Oakland apartments and Victorians, Berkeley hills homes, Fremont / Union City suburbs, and Tri-Valley planned communities all price differently. Earthquake retrofit and older-housing issues appear more often in older cores.',
          },
          {
            title: 'BART premium',
            detail:
              'Walkable distance to BART often raises rents. Factor last-mile safety and parking if you drive to a station.',
          },
          {
            title: 'Hill access costs',
            detail:
              'Hillside streets can mean stairs, limited truck turnaround, and higher move labor — budget logistics, not only purchase price.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'Oakland',
            detail:
              'Neighborhood-by-neighborhood variance — arts, density, hills, industrial edges. Do block-level research.',
          },
          {
            title: 'Berkeley & Albany',
            detail:
              'University influence, political culture, hills, and constrained housing stock.',
          },
          {
            title: 'Fremont / Newark / Union City',
            detail:
              'More suburban, diverse communities, 880 corridor logistics, tech-adjacent employment.',
          },
          {
            title: 'Tri-Valley',
            detail:
              'Dublin, Pleasanton, Livermore — master-planned feel, heat inland, I-580 commute patterns.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Local jobs + SF / Peninsula pull',
            detail:
              'Many residents work in Oakland, Berkeley, the Port, hospitals, or reverse-commute to SF and Silicon Valley.',
          },
          {
            title: 'BART, ferries, buses',
            detail:
              'Transit is more usable here than in most California counties, but peak crowding and last-mile gaps remain real.',
          },
          {
            title: 'Bridge corridors',
            detail:
              'Bay Bridge, San Mateo Bridge approaches, and 880/980/580 congestion shape move-day and workday timing.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Marine influence vs Tri-Valley heat',
            detail:
              'Near-bay areas stay cooler; Livermore Valley regularly runs hotter. Plan summer move starts by microclimate.',
          },
          {
            title: 'Fog & hills',
            detail:
              'Berkeley / Oakland hills can be cool and damp; protect wood floors on foggy mornings.',
          },
          {
            title: 'Outdoor access',
            detail:
              'Regional parks and shoreline trails are lifestyle anchors — also expect weekend trailhead parking pressure.',
          },
        ],
      },
    ],
  },

  riverside: {
    title: 'Is Riverside County the right fit?',
    intro:
      'Inland Empire living trades coastal prices for heat, distance, and sprawl. Many households commute toward OC, LA, or local warehouse/logistics jobs — test the real drive before you commit.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'Rapid growth means newer campuses in some cities and capacity pressure in others — verify the specific district.',
        bullets: [
          {
            title: 'Major district anchors',
            detail:
              'Riverside Unified, Corona-Norco Unified, Moreno Valley Unified, Temecula Valley Unified, Murrieta Valley Unified, Palm Springs Unified, Desert Sands Unified, and Lake Elsinore Unified are among larger systems. Coachella Valley and western IE are effectively different education markets.',
          },
          {
            title: 'Growth & boundary shifts',
            detail:
              'New tracts can reassign feeders. Get written confirmation of school assignment for a specific address.',
          },
          {
            title: 'Family-town shortlists',
            detail:
              'Temecula / Murrieta, Corona / Norco, and parts of Eastvale often draw school-focused movers — still compare program details, not only reputation chatter.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Riverside University Health System, Kaiser Permanente, Loma Linda University Health (nearby influence), Eisenhower Health (Coachella Valley), and Tenet / other regional hospitals serve different subregions. Specialty depth is uneven across the county’s vast geography.',
          },
          {
            title: 'Distance is the access problem',
            detail:
              'Desert and southwest county addresses can be far from tertiary care. Map trauma and pediatric access explicitly.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'More house, more miles',
            detail:
              'Compared with coastal Southern California, many buyers find more square footage — then spend it back in commute time and fuel.',
          },
          {
            title: 'New tract vs older cores',
            detail:
              'Master-planned communities (Eastvale, Menifee, Temecula edges) differ from older Riverside city stock and desert resort housing.',
          },
          {
            title: 'HOA + HOA heat rules',
            detail:
              'Many new communities restrict parking and move hours. Summer asphalt heat also stresses crews and materials — early starts help.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'Western IE / 91–15 corridors',
            detail:
              'Corona, Norco, Eastvale, Jurupa — LA/OC commute orientation, logistics traffic, suburban tracts.',
          },
          {
            title: 'Riverside–Moreno Valley core',
            detail:
              'University presence, mixed older neighborhoods, and central IE job access.',
          },
          {
            title: 'Southwest (Temecula / Murrieta)',
            detail:
              'Wine-country edge, family suburbs, San Diego County adjacency for some commuters.',
          },
          {
            title: 'Coachella Valley',
            detail:
              'Palm Springs to Indio — resort economy, extreme summer heat, seasonal population swings.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Logistics, healthcare, education, remote hybrids',
            detail:
              'Warehouse and distribution employment is major; many other residents reverse-commute or hybrid-work toward coastal counties.',
          },
          {
            title: 'Sprawl commute math',
            detail:
              'SR-91, I-15, I-215, and I-10 can turn “nearby” into 75+ minutes. Drive the commute at rush hour before signing.',
          },
          {
            title: 'Metrolink pockets',
            detail:
              'Select stations help some LA-bound workers; most household trips remain auto-dependent.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Heat is a planning variable',
            detail:
              'Summer highs commonly demand early move starts, water plans, and AC at destination before furniture arrives.',
          },
          {
            title: 'Santa Ana / desert wind & dust',
            detail:
              'Wind events affect outdoor loading and air quality. Flexible dates help in fall and spring.',
          },
          {
            title: 'Car-first daily life',
            detail:
              'Errands, schools, and parks are spread out. Budget a second vehicle or long solo-drive days if both adults work.',
          },
        ],
      },
    ],
  },

  'san-bernardino': {
    title: 'Is San Bernardino County the right fit?',
    intro:
      'California’s largest county by area stretches from mountain towns to high desert to warehouse corridors. Climate, altitude, and industrial traffic differ more than in almost any other county.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'Mountain, desert, and valley communities do not share one school market — research the subregion first.',
        bullets: [
          {
            title: 'Major district anchors',
            detail:
              'San Bernardino City Unified, Fontana Unified, Chino Valley Unified, Chaffey Joint Union High / feeder elementaries, Redlands Unified, Hesperia Unified, Apple Valley Unified, and Snowline Joint Unified (mountain-adjacent) are among systems movers encounter. Always match the address to the current district map.',
          },
          {
            title: 'Mountain logistics for school days',
            detail:
              'Crestline / Lake Arrowhead / Running Springs families plan around weather closures and longer drives to valley activities.',
          },
          {
            title: 'High desert growth',
            detail:
              'Victor Valley communities can see capacity and boundary changes with new housing — confirm before escrow.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Loma Linda University Health, Arrowhead Regional Medical Center, Kaiser Permanente, Dignity Health / St. Bernardine corridors, and high-desert regional hospitals serve different geographies. Tertiary care often concentrates toward Loma Linda and larger valley campuses.',
          },
          {
            title: 'Mountain & desert distance',
            detail:
              'Specialty appointments can mean long valley drives from mountain or high-desert homes. Factor winter road conditions into care access.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Valley industrial adjacency',
            detail:
              'Fontana, Ontario, Rancho Cucamonga, and nearby corridors mix suburban housing with warehouse and freight traffic. Noise and truck routing matter on some streets.',
          },
          {
            title: 'Mountain cabins vs full-time homes',
            detail:
              'Mountain communities include vacation and full-time stock — access roads, snow, and septic/utility quirks can affect both living and moving.',
          },
          {
            title: 'High desert affordability trade',
            detail:
              'Victorville / Hesperia / Apple Valley can lower entry price with heat, wind, and longer coastal job distances.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'West valley / 210–15 belt',
            detail:
              'Rancho Cucamonga, Fontana, Ontario — suburban amenities plus logistics employment and airport/freight influence.',
          },
          {
            title: 'Central valley cities',
            detail:
              'San Bernardino, Redlands, Highland — mixed older cores, university/medical influence near Loma Linda / Redlands.',
          },
          {
            title: 'Mountain communities',
            detail:
              'Lake Arrowhead, Crestline, Big Bear edges — recreation economy, weather-dependent access, tighter roads.',
          },
          {
            title: 'High desert',
            detail:
              'Victor Valley towns — space, heat, wind, and I-15 corridor orientation.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Warehouse & logistics spine',
            detail:
              'Distribution centers and Ontario-area freight drive many local jobs and a lot of truck traffic on arterial roads.',
          },
          {
            title: 'LA / OC reverse commute',
            detail:
              'Some residents still drive west for coastal wages. I-10, I-210, and SR-60 timing can dominate quality of life.',
          },
          {
            title: 'Mountain seasonal employment',
            detail:
              'Recreation and hospitality surge in peak seasons; housing turnover can cluster around those calendars.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Three climates in one county',
            detail:
              'Valley heat, mountain snow/ice, and high-desert wind are not interchangeable. Moving equipment and timing must match the elevation band.',
          },
          {
            title: 'Freight congestion',
            detail:
              'Warehouse corridors add mid-day truck volume. Avoid peak freight windows when possible for residential moves.',
          },
          {
            title: 'Recreation access vs isolation',
            detail:
              'Mountains and desert offer outdoor lifestyle — also fewer late-night services and longer supply runs.',
          },
        ],
      },
    ],
  },

  sacramento: {
    title: 'Is Sacramento County the right fit?',
    intro:
      'State government, valley heat, and a mix of urban grid and suburban sprawl define the capital region. Many moves orbit state employment cycles and river-adjacent neighborhoods.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'District choice often steers families toward specific suburbs — confirm open-enrollment and boundary maps.',
        bullets: [
          {
            title: 'Major district anchors',
            detail:
              'Sacramento City Unified, San Juan Unified, Elk Grove Unified, Folsom-Cordova Unified, Natomas Unified, Twin Rivers Unified, and Robla / smaller elementaries feeding larger high-school systems are common research starting points.',
          },
          {
            title: 'Elk Grove & Folsom family draw',
            detail:
              'These areas frequently appear on family shortlists for newer housing and school programs — inventory and traffic grow with that demand.',
          },
          {
            title: 'Urban choice landscape',
            detail:
              'City of Sacramento includes neighborhood schools plus charter options. Visit and verify transportation logistics for any non-neighborhood placement.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'UC Davis Health, Sutter Health, Kaiser Permanente, and Dignity Health campuses form the core of regional care. Pediatric and specialty referrals often route to UC Davis or large Sutter/Kaiser hubs.',
          },
          {
            title: 'Suburban distance',
            detail:
              'Elk Grove, Folsom, and Rancho Cordova residents should map drive times at peak hour for preferred hospitals and urgent care.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Capital-region pricing',
            detail:
              'Generally below Bay Area and coastal SoCal, with pockets of premium pricing near Folsom, East Sacramento, and desirable school zones.',
          },
          {
            title: 'Grid vs suburb',
            detail:
              'Midtown / Land Park / Curtis Park offer older homes and tighter streets; Elk Grove and Natomas skew newer tract and HOA patterns.',
          },
          {
            title: 'Flood & elevation awareness',
            detail:
              'River-adjacent and low-lying parcels deserve flood-zone checks during home search — not only insurance, but also street access on wet days.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'Central city',
            detail:
              'Downtown, Midtown, East Sacramento — grid living, older housing, walkable pockets, tighter parking.',
          },
          {
            title: 'Natomas & North area',
            detail:
              'Newer housing, airport adjacency, freeway access, and heat-exposed summers.',
          },
          {
            title: 'Elk Grove & South',
            detail:
              'Family suburbs, longer downtown drives, planned-community rules in many tracts.',
          },
          {
            title: 'Folsom / Cordova belt',
            detail:
              'Folsom amenities and American River access; Rancho Cordova more mixed commercial/residential.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'State government & contractors',
            detail:
              'Capitol-area employment and related professional services remain major anchors. Legislative calendars can influence downtown congestion.',
          },
          {
            title: 'Healthcare & regional private sector',
            detail:
              'Hospital systems, tech satellite offices, and logistics also matter. Hybrid schedules are common among state and private workers.',
          },
          {
            title: 'I-5 / US-50 / I-80 / Hwy 99',
            detail:
              'These spines set commute pain. Cross-town trips at 5 p.m. can rival Bay Area frustration on bad days.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Valley heat summers',
            detail:
              'Triple-digit stretches are normal. Early move starts, shade staging, and working AC are non-negotiable in July–September.',
          },
          {
            title: 'Winter tule fog',
            detail:
              'Dense fog can slow freeways and airport runs. Build buffer on winter move mornings.',
          },
          {
            title: 'Rivers, trails, trees',
            detail:
              'American River Parkway and tree-lined older neighborhoods are lifestyle draws — also watch for low wires and narrow streets on move day.',
          },
        ],
      },
    ],
  },

  'contra-costa': {
    title: 'Is Contra Costa County the right fit?',
    intro:
      'East Bay suburbs, BART towns, and Delta edges sit beyond the Caldecott and across bridge corridors. Many households balance school-driven town choice against SF/Oakland job access.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'Lamorinda, central county, and east county are different education markets under one county name.',
        bullets: [
          {
            title: 'Major district anchors',
            detail:
              'Mount Diablo Unified, San Ramon Valley Unified, West Contra Costa Unified, Acalanes Union High / feeder elementaries (Lamorinda), Liberty Union High / east county feeders, and Martinez / smaller local systems are frequent shortlist names. High-school union districts can span multiple towns.',
          },
          {
            title: 'Lamorinda & San Ramon Valley demand',
            detail:
              'Lafayette, Moraga, Orinda, Danville, and San Ramon often see school-driven housing competition. Verify current boundaries and transfer policies.',
          },
          {
            title: 'West county variation',
            detail:
              'Richmond, El Cerrito, and Hercules differ sharply by neighborhood. Block-level research matters more than city averages.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Kaiser Permanente, John Muir Health, Sutter Health, and Contra Costa Regional Medical Center are common access points. Complex specialty care may still route to Oakland or SF.',
          },
          {
            title: 'Caldecott & bridge timing for care',
            detail:
              'Appointments on the other side of the hills or bay need peak-hour buffers. Prefer local systems when clinically fine.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Premium hill & valley pockets',
            detail:
              'Lamorinda and parts of San Ramon Valley price near Bay Area highs. East county (Brentwood, Oakley, Antioch edges) often trades price for longer BART or freeway legs.',
          },
          {
            title: 'HOA suburbs & older downtowns',
            detail:
              'Planned communities with move rules sit alongside older Walnut Creek / Concord / Martinez cores with tighter street parking.',
          },
          {
            title: 'Fire & hill considerations',
            detail:
              'Some hillside addresses carry wildfire and access constraints that affect insurance and move staging.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'Lamorinda',
            detail:
              'Lafayette, Moraga, Orinda — hills, premium pricing, tunnel access to Oakland/SF.',
          },
          {
            title: 'Central county',
            detail:
              'Walnut Creek, Concord, Pleasant Hill — BART-oriented amenities, mixed housing ages.',
          },
          {
            title: 'San Ramon Valley',
            detail:
              'Danville, San Ramon — family suburbs, I-680 corridor, corporate campuses nearby.',
          },
          {
            title: 'East & Delta edges',
            detail:
              'Brentwood, Oakley, Pittsburg, Antioch — more space, heat, and longer core-Bay trips.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'BART + reverse commute mix',
            detail:
              'Many residents ride BART toward Oakland/SF; others work local healthcare, retail, or Bishop Ranch–area campuses.',
          },
          {
            title: 'I-680 / Hwy 24 / 4 corridors',
            detail:
              'These freeways and the Caldecott tunnels set daily pain. Move-day truck timing should avoid peak tunnel backups when possible.',
          },
          {
            title: 'Bridge alternatives',
            detail:
              'Some trips use the Richmond–San Rafael or other bridges — always re-check tolls and delays for the actual route.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Cooler west, hotter east',
            detail:
              'Near-bay west county stays milder; Brentwood and further east heat up significantly in summer.',
          },
          {
            title: 'Hills & parks',
            detail:
              'Regional parks and ridge trails are a lifestyle perk — hillside streets can complicate large trucks.',
          },
          {
            title: 'Car + transit hybrid living',
            detail:
              'BART towns still usually need a car for school and errands. Count total household vehicles in the budget.',
          },
        ],
      },
    ],
  },

  'san-francisco': {
    title: 'Is San Francisco the right fit?',
    intro:
      'Vertical density, steep grades, scarce parking, and strict street rules define city moves. Neighborhood microclimates and building regulations matter more than the postcard skyline.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'SFUSD assignment is not simple neighborhood default for many families — research the current student assignment system early.',
        bullets: [
          {
            title: 'SFUSD & private landscape',
            detail:
              'San Francisco Unified is the public system; many families also evaluate private and parochial options. Assignment, language pathways, and wait dynamics change — use official SFUSD resources for the current year.',
          },
          {
            title: 'Neighborhood ≠ guaranteed school',
            detail:
              'Do not assume the school two blocks away is automatic. Factor commute-to-school when choosing a neighborhood.',
          },
          {
            title: 'Family neighborhood shortlists',
            detail:
              'Sunset, Richmond, Noe/Glen Park, Bernal, and parts of the southern neighborhoods often appear on family lists — each has different fog, hills, and housing stock.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'UCSF Health, Zuckerberg San Francisco General, Kaiser Permanente, Sutter / CPMC campuses, and California Pacific Medical Center corridors provide dense urban care. Specialty depth is a city advantage.',
          },
          {
            title: 'Transit vs car for appointments',
            detail:
              'Parking near hospitals is limited and expensive. Many residents use transit, rideshare, or hospital shuttles for non-emergency visits.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Vertical living is the default',
            detail:
              'Apartments, tenancies-in-common, condos, and multi-unit Victorians dominate. Elevators, stairs, and long carries are normal move costs.',
          },
          {
            title: 'Rent control & tenant rules',
            detail:
              'Many units fall under local rent and eviction frameworks. Understand building type and lease rules before comparing “deals.”',
          },
          {
            title: 'Parking as a luxury good',
            detail:
              'Off-street parking can rival a second rent line. Street cleaning, residential permits, and tow-away zones shape daily life.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Neighborhood personality map',
        bullets: [
          {
            title: 'Northeast core',
            detail:
              'Financial District, North Beach, Russian Hill — density, tourism, hills, tight loading zones.',
          },
          {
            title: 'Central & Mission-adjacent',
            detail:
              'Mission, Castro, Noe, Hayes Valley — mixed housing ages, vibrant streets, competitive parking.',
          },
          {
            title: 'West side',
            detail:
              'Richmond, Sunset — more fog, more residential scale, longer trips downtown.',
          },
          {
            title: 'South & southeast',
            detail:
              'Bernal, Excelsior, Bayview, Visitacion Valley — varied stock and different microclimates; do block-level homework.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Tech, healthcare, hospitality, government',
            detail:
              'Employment is multi-nodal across SoMa, Mission Bay, downtown, and medical campuses. Hybrid office policies still leave many mid-week peaks.',
          },
          {
            title: 'Muni, BART, walking, bikes',
            detail:
              'Transit and active modes work better than in most U.S. cities — still plan for hills, reliability gaps, and last-block carries with luggage or kids.',
          },
          {
            title: 'Bridge & Peninsula spillovers',
            detail:
              'Some households reverse-commute to Peninsula tech or East Bay jobs. Toll and bridge timing become part of lifestyle cost.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Microclimates on a single map',
            detail:
              'Sunset fog vs Mission sun is a real quality-of-life difference. Visit at the hour you care about, not only sunny midday.',
          },
          {
            title: 'Hills & stairs',
            detail:
              'Daily life includes grades that challenge carts, strollers, and movers. Measure stair counts honestly before booking labor.',
          },
          {
            title: 'Street rules are lifestyle rules',
            detail:
              'Street cleaning tickets, temporary no-parking for moves, and cable-car or event street closures can disrupt plans — check SFMTA alerts.',
          },
        ],
      },
    ],
  },

  'san-mateo': {
    title: 'Is San Mateo County the right fit?',
    intro:
      'The Peninsula corridor links SF and Silicon Valley with coastal towns, hillside suburbs, and SFO-adjacent density. Housing cost and 101 / Caltrain access dominate most relocation math.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'Peninsula families often filter by high-school district and coastal vs bayside lifestyle.',
        bullets: [
          {
            title: 'Major district anchors',
            detail:
              'San Mateo Union High / feeder elementaries, Sequoia Union High / feeders, Cabrillo Unified (coastside), Jefferson Union High / northern feeders, and South San Francisco Unified are among systems commonly compared. Elementary and high-school boundaries can differ.',
          },
          {
            title: 'Competitive bayside towns',
            detail:
              'Burlingame, San Mateo, Hillsborough edges, Menlo Park, and Atherton-area demand is intense. Confirm assignment for the exact parcel.',
          },
          {
            title: 'Coastside difference',
            detail:
              'Half Moon Bay and coastside communities have different district logistics and weather constraints than bayside cities.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Stanford Health Care (nearby influence), Sutter Health, Kaiser Permanente, and Mills-Peninsula / regional campuses are common access points. Complex care may route to Stanford or SF.',
          },
          {
            title: '101 traffic to appointments',
            detail:
              'North–south travel for specialists can be slow. Prefer clinics near home or work corridors when possible.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Peninsula premium',
            detail:
              'Proximity to SF and tech jobs keeps purchase and rent floors high. Smaller lots and multi-unit buildings are common tradeoffs.',
          },
          {
            title: 'Hills & coast stock',
            detail:
              'Hillside homes may need shuttle or long-carry logistics; coastside housing can include older stock and marine moisture issues.',
          },
          {
            title: 'SFO noise & rental turnover',
            detail:
              'Airport-adjacent areas can see more rental churn and flight-path noise — walk the block at different times of day.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'Northern Peninsula',
            detail:
              'Daly City, South SF, Pacifica — denser housing, SF adjacency, hills and fog on the coast.',
          },
          {
            title: 'Central bayside',
            detail:
              'San Mateo, Burlingame, Belmont, San Carlos — classic Peninsula suburbs and downtown cores.',
          },
          {
            title: 'Southern Peninsula',
            detail:
              'Redwood City, Menlo Park, Atherton edges — tech proximity and extreme housing competition.',
          },
          {
            title: 'Coastside',
            detail:
              'Half Moon Bay and coast communities — marine climate, Highway 92 access constraints, more isolated feel.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Biotech, airport, tech adjacency',
            detail:
              'Genentech / biotech corridors, SFO employment, and reverse/commute flows to SF and Silicon Valley define many households.',
          },
          {
            title: 'US-101, I-280, Caltrain',
            detail:
              '101 is often congested; 280 is prettier but not door-to-door for everyone. Caltrain helps select station areas.',
          },
          {
            title: 'Hwy 92 coast link',
            detail:
              'Coastside workers and residents depend on 92 — backups and weather matter for both jobs and move trucks.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Fog line vs bayside sun',
            detail:
              'Pacifica and western hills can be cool and gray while bayside cities are milder and sunnier. Microclimate is a lifestyle decision.',
          },
          {
            title: 'Hills & narrow streets',
            detail:
              'Many residential streets challenge large trucks. Measure grades and turn radii early.',
          },
          {
            title: 'Outdoor access',
            detail:
              'Coastal trails and ridge parks are nearby — weekend traffic to trailheads and beaches is part of the package.',
          },
        ],
      },
    ],
  },

  ventura: {
    title: 'Is Ventura County the right fit?',
    intro:
      'Coastal towns, agricultural plains, and suburban valleys sit between LA County demand and a slower coastal pace. Many households optimize for LA job access without full LA County pricing.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'Coastal, Conejo Valley, and Santa Clara Valley (Oxnard plain) communities each have distinct district landscapes.',
        bullets: [
          {
            title: 'Major district anchors',
            detail:
              'Conejo Valley Unified, Ventura Unified, Oxnard Union High / feeder elementaries, Simi Valley Unified, Thousand Oaks–area systems, and smaller coastal districts are common research targets. Confirm high-school feeders separately from elementary brands.',
          },
          {
            title: 'Conejo & Simi family draw',
            detail:
              'Thousand Oaks, Newbury Park, and Simi Valley often attract school-focused movers seeking suburban stock with LA access.',
          },
          {
            title: 'Coastal city variation',
            detail:
              'Ventura, Oxnard, and Camarillo differ in housing age, density, and program options — visit campuses rather than relying on city stereotypes.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Community Memorial Healthcare, Dignity Health / St. John’s corridors, Los Robles (Thousand Oaks), Kaiser Permanente access points, and county facilities serve different subregions. Some tertiary care still routes into LA County.',
          },
          {
            title: 'LA specialty spillover',
            detail:
              'Complex care may mean a 101 drive into the San Fernando Valley or Westside. Factor that into location choice if ongoing specialty care is expected.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Below West LA, not “cheap”',
            detail:
              'Many addresses undercut Westside LA pricing while remaining expensive by national standards — especially near the coast and Conejo Valley.',
          },
          {
            title: 'Ag-adjacent & suburban mix',
            detail:
              'Oxnard plain agriculture, Camarillo suburbs, and coastal older stock create very different move logistics and neighborhood feels.',
          },
          {
            title: 'HOA common in planned areas',
            detail:
              'Conejo and newer tracts often require COIs and timed moves. Coastal multi-units add elevator rules.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'Coastal cities',
            detail:
              'Ventura, Oxnard coast, Port Hueneme — beach access, marine layer, tourism on peak weekends.',
          },
          {
            title: 'Camarillo & plains',
            detail:
              'More suburban/agricultural adjacency, 101 access, mix of newer and older housing.',
          },
          {
            title: 'Conejo Valley',
            detail:
              'Thousand Oaks, Newbury Park, Westlake edges — family suburbs, hills, premium pricing.',
          },
          {
            title: 'Simi Valley',
            detail:
              'Valley living with LA County adjacency via the 118 — heat inland relative to the immediate coast.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Local employers + LA corridor',
            detail:
              'Healthcare, agriculture-related industry, military-adjacent employment, biotech pockets, and reverse-commute into LA are all common patterns.',
          },
          {
            title: 'US-101 & SR-118',
            detail:
              '101 is the coastal spine; 118 links Simi toward the San Fernando Valley. Peak delays are the real distance measure.',
          },
          {
            title: 'Hybrid coastal living',
            detail:
              'Some households accept longer LA office days in exchange for Ventura County evenings — stress-test that trade before signing a multi-year lease.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Coastal cool, inland warmer',
            detail:
              'Beaches stay milder; Simi and interior valleys heat more. Plan summer moves by microclimate.',
          },
          {
            title: 'Ag & seasonal activity',
            detail:
              'Agricultural corridors mean seasonal truck traffic and, in places, different dust/pollen patterns — minor for many, relevant for sensitive households.',
          },
          {
            title: 'Outdoor & slower pace',
            detail:
              'Beaches, mountains, and smaller downtowns are the draw. Weekend coastal congestion still appears on sunny days.',
          },
        ],
      },
    ],
  },

  fresno: {
    title: 'Is Fresno County the right fit?',
    intro:
      'Central Valley living centers on agricultural economy, valley heat, and a growing metro core. Housing often costs less than coastal California — climate and air quality are the counterweights.',
    modules: [
      {
        id: 'schools',
        title: 'Schools & family-town fit',
        intro: 'Metro Fresno, Clovis, and smaller valley towns present different district experiences.',
        bullets: [
          {
            title: 'Major district anchors',
            detail:
              'Fresno Unified, Clovis Unified, Central Unified, Sanger Unified, and smaller rural districts surrounding the metro are the usual starting map. Clovis often appears on family shortlists — still verify the specific address boundary.',
          },
          {
            title: 'Rural & small-town schools',
            detail:
              'Outlying agricultural communities may mean longer bus rides and fewer specialized programs nearby. Confirm extracurricular and special education capacity.',
          },
          {
            title: 'Growth edges',
            detail:
              'New housing on metro edges can shift feeder patterns. Get assignment confirmation during escrow or lease signing.',
          },
        ],
      },
      {
        id: 'hospitals',
        title: 'Healthcare systems & access',
        bullets: [
          {
            title: 'Major systems',
            detail:
              'Community Medical Centers, Saint Agnes Medical Center, Kaiser Permanente access, Valley Children’s (regional pediatric draw), and UCSF Fresno–affiliated care are key names. Specialty depth is stronger in the metro than in outlying farm towns.',
          },
          {
            title: 'Rural distance to care',
            detail:
              'Mountain-edge or far agricultural addresses can mean long drives for specialists. Map trauma and pediatric access before choosing remote acreage.',
          },
        ],
      },
      {
        id: 'housing',
        title: 'Housing character & cost pressures',
        bullets: [
          {
            title: 'Lower entry vs coastal CA',
            detail:
              'Purchase and rent levels are often more approachable than Bay Area or coastal Southern California, with wide spreads between Clovis, central Fresno, and rural parcels.',
          },
          {
            title: 'Suburban growth & older cores',
            detail:
              'North Fresno / Clovis growth areas differ from older central neighborhoods and agricultural homes with well/septic considerations.',
          },
          {
            title: 'Heat-ready housing matters',
            detail:
              'Working AC, insulation, and shaded parking are quality-of-life essentials — inspect them like you would a roof.',
          },
        ],
      },
      {
        id: 'town-fit',
        title: 'Town personality map',
        bullets: [
          {
            title: 'Central Fresno',
            detail:
              'Urban grid, mixed housing ages, shorter trips to hospitals and downtown services.',
          },
          {
            title: 'Clovis & north growth',
            detail:
              'Family-oriented suburbs, newer tracts, and school-driven demand.',
          },
          {
            title: 'East toward the Sierra',
            detail:
              'Sanger, Reedley, and foothill approaches — more agricultural context and mountain weekend access.',
          },
          {
            title: 'West & south valley towns',
            detail:
              'Farm-economy communities with different amenities and longer metro drives.',
          },
        ],
      },
      {
        id: 'jobs',
        title: 'Jobs & commute patterns',
        bullets: [
          {
            title: 'Agriculture & food processing',
            detail:
              'Farming, packing, logistics, and related manufacturing remain foundational. Seasonality can affect local hiring and truck traffic.',
          },
          {
            title: 'Healthcare, education, government, distribution',
            detail:
              'Hospitals, CSU Fresno, county/city employment, and warehouses diversify the base beyond pure ag.',
          },
          {
            title: 'CA-99 / I-5 orientation',
            detail:
              'Highway 99 is the metro spine; many regional trips orient north–south along the valley. Cross-town heat and traffic still matter at rush hour.',
          },
        ],
      },
      {
        id: 'lifestyle',
        title: 'Climate & daily constraints',
        bullets: [
          {
            title: 'Central Valley heat',
            detail:
              'Prolonged summer heat shapes sports schedules, move timing, and utility bills. Start early; hydrate constantly.',
          },
          {
            title: 'Air quality days',
            detail:
              'Valley inversion and seasonal agricultural activity can produce spare-the-air days. Sensitive households should track AQI during house hunts and move week.',
          },
          {
            title: 'Sierra access tradeoff',
            detail:
              'National parks and mountain recreation are a real perk — winter mountain roads and summer heat are the balancing constraints.',
          },
        ],
      },
    ],
  },
};

export const CA_SPECIALIZED: Record<string, CountySpecializedModule[]> = {
  'los-angeles': [
    {
      id: 'high-rise-elevator-coi',
      title: 'High-rise, elevator & COI logistics',
      intro:
        'DTLA, Century City, Marina towers, and many Valley mid-rises turn move day into a building-management project before a single box is lifted.',
      bullets: [
        'Request written move rules: allowed hours, elevator padding, loading dock reservations, and COI wording (additional insured / certificate holder names).',
        'Many buildings require weekday-only windows and 48–72 hour COI approval — send the template to your mover as soon as you book.',
        'Measure service elevator dimensions and stair fallback. Oversized sofas often fail the elevator even when the unit itself is large.',
        'Budget soft costs: elevator deposits, dock fees, and overtime if the crew overruns the reserved window.',
      ],
    },
    {
      id: 'freeway-complex-moves',
      title: 'Freeway-complex local moves',
      intro:
        'A “12-mile local move” on the 405/10/101 can burn more billable time than a longer rural hop. Treat traffic as a priced risk.',
      bullets: [
        'Ask whether quotes are portal-to-portal and how the mover prices peak-hour travel between zones.',
        'Prefer early mid-week starts for cross-basin jobs (Westside ↔ Valley, South Bay ↔ SGV).',
        'Write origin/destination zone assumptions into the estimate so “local” does not silently become a long-haul minimum.',
        'If either address is port-adjacent (710/110), avoid mid-day freight peaks when you can.',
      ],
    },
  ],

  orange: [
    {
      id: 'hoa-gated-communities',
      title: 'HOA & gated-community module',
      intro:
        'Master-planned OC living often means gate codes, COIs, and association move calendars that override your preferred Saturday.',
      bullets: [
        'Collect HOA move packets the week you sign — elevator reservations and insurance requirements can take days.',
        'Confirm guest parking for the truck and whether street parking is tow-away during street sweeping.',
        'Architectural or dumpster rules can ban driveway pods; ask before you rent one.',
        'Gated entries with tight turn radii may force a smaller truck or shuttle — photo the gate approach for your mover.',
      ],
    },
    {
      id: 'coastal-vs-inland',
      title: 'Coastal vs inland move differences',
      intro:
        'Beach cities and inland valleys are different logistics climates under one county brand.',
      bullets: [
        'Coastal blocks: tourism traffic, permit parking, and marine moisture on cardboard and wood floors.',
        'Inland tracts: summer heat, longer HOA streets, and school-zone congestion on weekday mornings.',
        'Cross-county quotes toward LA should state whether rates stay “local” across the county line.',
        'South County to North County hauls can be time-expensive on I-5/405 even when miles look modest.',
      ],
    },
  ],

  'san-diego': [
    {
      id: 'military-pcs',
      title: 'Military PCS & base-adjacent moves',
      intro:
        'San Diego’s bases create predictable PCS waves — housing and mover calendars tighten when orders cluster in summer.',
      bullets: [
        'Book crews and temporary lodging as soon as orders allow; peak PCS weeks sell out quality capacity.',
        'Clarify whether HHG is government-arranged or personally procured — paperwork and claims paths differ.',
        'Base access for trucks may need sponsorship, REAL ID, or gate hours compliance; share gate rules with the mover early.',
        'Align lease end dates with delivery windows; storage-in-transit is common when housing lags.',
      ],
    },
    {
      id: 'coastal-condo',
      title: 'Coastal condo & elevator living',
      intro:
        'PB, downtown, and coastal North County towers share elevator reservations, HOA certificates, and tight loading zones.',
      bullets: [
        'Reserve elevators and loading docks in writing; tourist-season weekends are the hardest to get.',
        'COIs often need the HOA named exactly as on the CC&Rs — typos delay move day.',
        'Street parking near beaches fills early; temporary no-parking signs may be required.',
        'Marine layer mornings: protect floors and allow extra wrap time for damp conditions.',
      ],
    },
  ],

  'santa-clara': [
    {
      id: 'tech-relocation',
      title: 'Tech relocation logistics',
      intro:
        'Offer-letter timelines, corporate housing, and high-value home offices are normal — crews need inventory detail, not only square footage.',
      bullets: [
        'List monitors, servers, instruments, and packed-by-owner electronics clearly for valuation and packing tier.',
        'Corporate relocators may require specific invoice formats or licensed carriers — confirm reimbursement rules before booking.',
        'Lease-up clusters near major campuses create end-of-month Saturday scarcity; mid-week moves price better.',
        'Hybrid start dates: store overflow if the apartment is smaller than the previous house — measure elevator and doorways first.',
      ],
    },
    {
      id: 'hoa-elevators-sv',
      title: 'HOA, townhome & elevator module',
      intro:
        'Many Silicon Valley entry points are HOA communities with reserved elevators and strict move hours.',
      bullets: [
        'Submit COIs early; some associations only process certificates on business days.',
        'Ask about elevator overtime fees after 4 p.m. and whether weekend moves are banned.',
        'Townhome alleys and podium parking garages often need a smaller truck or long carry.',
        'Photo low garage clearances — many “standard” trucks will not fit underground parking.',
      ],
    },
  ],

  alameda: [
    {
      id: 'east-bay-hills',
      title: 'East Bay hills access',
      intro:
        'Oakland and Berkeley hills, plus some Fremont foothill streets, trade views for grades, switchbacks, and limited turnaround.',
      bullets: [
        'Walk the last 200 feet: grade, overhead wires, red curbs, and whether a 26-ft truck can exit without backing blindly.',
        'Budget for shuttle trucks or long carries on streets posted against large vehicles.',
        'Fog and damp mornings make wood stairs slick — non-slip runners and extra hands help.',
        'Fire-season parking and evacuation-route awareness can affect staging on certain days.',
      ],
    },
    {
      id: 'bart-transit-density',
      title: 'BART corridors & transit-density moves',
      intro:
        'Apartment clusters near BART mean tight loading zones, meter management, and peak pedestrian traffic.',
      bullets: [
        'Reserve loading zones or temporary no-parking where the city allows; do not assume red-curb forgiveness.',
        'Avoid peak BART commute hours for elevator buildings if the lobby doubles as a through-path.',
        'Confirm whether the building requires COI for common-area use even on short local hops.',
        'Last-mile from BART is great for people — not for sofas. Plan truck access separately from your own commute plan.',
      ],
    },
  ],

  riverside: [
    {
      id: 'ie-heat',
      title: 'Inland Empire heat protocol',
      intro:
        'Summer heat is an operational constraint, not a comfort footnote. It affects crew safety, packing materials, and AC-first destination readiness.',
      bullets: [
        'Start at dawn for large moves; mid-afternoon asphalt and attic pulls are slow and risky.',
        'Stage water, shade, and working destination AC before furniture arrives.',
        'Electronics and candles/wax items need climate-aware packing on extreme heat days.',
        'Flexible dates help when heat advisories stack with wind or poor air quality.',
      ],
    },
    {
      id: 'ie-distance-sprawl',
      title: 'Distance, sprawl & reverse-commute moves',
      intro:
        'Tract-to-tract miles look short on a map until 91/15/215 traffic converts them into hourly billing.',
      bullets: [
        'Get drive-time assumptions in writing for OC/LA-bound or cross-county legs.',
        'Warehouse-adjacent arterials add mid-day truck congestion — residential movers feel it too.',
        'New master-planned streets may still have incomplete shoulders or soft dirt edges after rain.',
        'If you reverse-commute for work, test the rush-hour path before you lock housing distance.',
      ],
    },
  ],

  'san-bernardino': [
    {
      id: 'mountain-desert-edges',
      title: 'Mountain & high-desert edge logistics',
      intro:
        'Elevation bands change vehicle needs, weather risk, and even whether a standard truck is the right tool.',
      bullets: [
        'Mountain roads: chains or delays in winter, tight switchbacks, and limited staging — ask about shuttle or smaller trucks.',
        'High desert: wind can topple tall items and fill open trucks with dust; secure loads and use covers.',
        'Confirm propane, septic, and unpaved driveway constraints for rural or cabin properties.',
        'Do not schedule mountain deliveries on the first storm day after a long dry spell without a weather plan.',
      ],
    },
    {
      id: 'warehouse-corridors',
      title: 'Warehouse & freight corridor moves',
      intro:
        'Ontario–Fontana–Rancho logistics traffic shares roads with residential moves. Timing is half the job.',
      bullets: [
        'Avoid peak freight windows on industrial arterials when either address sits near distribution centers.',
        'Airport and rail-adjacent streets can have odd clearance and parking patterns — scout truck paths.',
        'Cross-dock style delays are rare for household moves but congestion is not — build time buffers.',
        'If relocating for a warehouse job start date, book housing move mid-week to reduce Saturday competition.',
      ],
    },
  ],

  sacramento: [
    {
      id: 'valley-heat-sac',
      title: 'Valley heat move protocol',
      intro:
        'Sacramento summers demand early starts and destination cooling. Heat stroke risk is a real crew and client issue.',
      bullets: [
        'Book first-slot morning crews in July–September; plan indoor rest breaks for long carries.',
        'Verify AC works at the new address before the truck arrives with temperature-sensitive items.',
        'Attics and west-facing rooms become ovens — sequence those spaces early.',
        'Winter fog is the flip side: leave extra freeway time for cross-town and airport-adjacent moves.',
      ],
    },
    {
      id: 'state-government-workforce',
      title: 'State workforce & capital-region timing',
      intro:
        'State employment, contractors, and legislative calendars influence downtown congestion and lease cycles.',
      bullets: [
        'End-of-month and fiscal-year transitions can cluster apartment turns — book early for those windows.',
        'Downtown loading zones fill during session and major event days; check street restrictions.',
        'Many state workers hybrid-commute — mid-week residential streets may still be quieter than downtown cores.',
        'If reimbursement requires specific vendor paperwork, confirm invoice fields before move day.',
      ],
    },
  ],

  'contra-costa': [
    {
      id: 'east-bay-suburbs',
      title: 'East Bay suburban & HOA moves',
      intro:
        'Danville, San Ramon, and similar suburbs combine cul-de-sac geometry with association rules and school-traffic peaks.',
      bullets: [
        'Measure cul-de-sac turnarounds; large trucks may need to stage on the main road and shuttle.',
        'HOA COIs and weekday-only windows are common in townhome clusters — collect rules early.',
        'School drop-off hours clog collector roads; start before the morning wave or after 9:30 a.m.',
        'Estate and hillside lots need driveway grade photos for accurate labor estimates.',
      ],
    },
    {
      id: 'bridge-corridor-timing',
      title: 'Bridge & tunnel corridor timing',
      intro:
        'Caldecott tunnels, I-680, and bay crossings convert short map miles into long billable minutes.',
      bullets: [
        'For Oakland/SF-bound legs, avoid peak tunnel and bridge windows when scheduling truck travel.',
        'Ask movers how they price portal-to-portal time across the hills.',
        'BART-adjacent apartments still need truck loading plans — transit does not move sofas.',
        'Build a weather and traffic buffer for winter rain days on elevated freeways.',
      ],
    },
  ],

  'san-francisco': [
    {
      id: 'vertical-density',
      title: 'Vertical density & stair/elevator reality',
      intro:
        'Multi-flight Victorians, tenancies-in-common, and high-rises make vertical labor the core cost driver.',
      bullets: [
        'Count stairs accurately (flights and landings) and note whether a service elevator exists and fits furniture.',
        'COI, elevator pads, and reserved windows are standard in managed buildings — start paperwork early.',
        'Long carries from distant legal parking can exceed stair time; scout loading distance on foot.',
        'Oversized items may need hoisting or disassembly — flag them before move day, not on the curb.',
      ],
    },
    {
      id: 'parking-street-rules',
      title: 'Parking, street cleaning & SFMTA rules',
      intro:
        'Street rules decide whether the truck can legally sit still. Tickets and tows are common failure modes.',
      bullets: [
        'Check residential permit zones, street-cleaning schedules, and temporary construction postings for both addresses.',
        'Arrange temporary no-parking signs where required; do not rely on hazard lights as a permit.',
        'Event, film, and parade routes can close streets with little personal notice — verify the week of the move.',
        'Clarify in writing who pays tickets if posted rules were missed or signs were insufficient.',
      ],
    },
  ],

  'san-mateo': [
    {
      id: 'peninsula-corridor',
      title: 'Peninsula corridor (101 / Caltrain) moves',
      intro:
        'North–south Peninsula jobs and housing create frequent corridor moves where traffic, not miles, sets the clock.',
      bullets: [
        'Price and schedule around US-101 peaks; I-280 can help some pairs of addresses but not all last-mile streets.',
        'Caltrain-adjacent apartments still need curb space planning — stations do not equal loading docks.',
        'SFO-adjacent timing: flight banks and airport workers add local congestion at shift changes.',
        'Cross-county SF or Santa Clara legs should state whether rates remain local under the mover’s card.',
      ],
    },
    {
      id: 'hills-coast-access',
      title: 'Hills & coastside access',
      intro:
        'Western hills and Highway 92 coast links introduce grades, fog, and constrained truck paths.',
      bullets: [
        'Photo driveway grades and tight switchbacks for hillside homes; ask about shuttle needs.',
        'Coastside: marine moisture, weekend beach traffic, and 92 backups affect delivery windows.',
        'Low wires and tree canopies are common on older residential streets — note them for the crew.',
        'Wind and fog can make long outdoor carries slower; flexible morning slots help.',
      ],
    },
  ],

  ventura: [
    {
      id: 'coastal-ventura',
      title: 'Coastal city move constraints',
      intro:
        'Ventura and Oxnard coastal blocks mix tourism weekends, older multi-units, and marine-layer mornings.',
      bullets: [
        'Avoid peak beach weekends for large elevator buildings when possible.',
        'Protect floors against damp cardboard; allow wrap time on gray marine-layer mornings.',
        'Confirm permit parking and alley access for older coastal stock.',
        'Port Hueneme / naval-adjacent areas may have extra gate or security considerations for some addresses.',
      ],
    },
    {
      id: 'ag-suburban-la-corridor',
      title: 'Ag, suburban & LA corridor access',
      intro:
        'Agricultural edges, Conejo suburbs, and 101/118 LA access create three different move profiles in one county.',
      bullets: [
        'Ag-adjacent roads can see seasonal equipment traffic — leave time buffers at harvest peaks.',
        'Conejo HOAs often need COIs and timed moves; collect packets early.',
        'Simi ↔ San Fernando Valley hauls via the 118 should price traffic risk explicitly.',
        'If you keep an LA job, drive the actual office-day commute before you choose how far west to live.',
      ],
    },
  ],

  fresno: [
    {
      id: 'central-valley-heat',
      title: 'Central Valley heat protocol',
      intro:
        'Prolonged heat is the defining summer constraint for household moves in Fresno County.',
      bullets: [
        'Book earliest crew slots in summer; mid-afternoon attic and second-story work slows dramatically.',
        'Confirm working AC and hydration staging at destination before unload.',
        'Protect temperature-sensitive items; do not leave sealed trucks baking mid-day if avoidable.',
        'Air quality advisories can stack with heat — flexible dates reduce health and schedule risk.',
      ],
    },
    {
      id: 'agricultural-economy',
      title: 'Agricultural economy & rural access',
      intro:
        'Farm roads, packing-house corridors, and rural driveways change truck choice and timing.',
      bullets: [
        'Unpaved or soft-shoulder driveways may need smaller trucks or staging on firm pavement.',
        'Seasonal harvest traffic can clog two-lane farm roads — ask locals about peak windows.',
        'Well, septic, and power shutoff logistics differ from city apartments; coordinate utilities early.',
        'If relocating for ag-season work, align housing move with known busy road periods when you can.',
      ],
    },
  ],
};

/**
 * Merge California relocation + specialized modules into a pack when missing,
 * enable collapsible deep content, and ensure section order includes those sections.
 */
export function enhanceCaliforniaIntelligencePack(
  pack: CountyIntelligencePack,
): CountyIntelligencePack {
  const slug = pack.countySlug;
  const relocation = CA_RELOCATION[slug];
  const specialized = CA_SPECIALIZED[slug];

  const next: CountyIntelligencePack = {
    ...pack,
    collapsibleDeepContent: true,
  };

  if (!next.relocation && relocation) {
    next.relocation = {
      title: relocation.title,
      intro: relocation.intro,
      modules: relocation.modules,
    };
  }

  if (!next.specialized?.length && specialized?.length) {
    next.specialized = specialized;
  }

  const baseOrder =
    next.sectionOrder?.length ? [...next.sectionOrder] : [...DEFAULT_INTELLIGENCE_SECTION_ORDER];

  const ensure = (id: (typeof DEFAULT_INTELLIGENCE_SECTION_ORDER)[number]) => {
    if (!baseOrder.includes(id)) {
      // Insert before resources when possible; otherwise append.
      const resourcesIdx = baseOrder.indexOf('resources');
      if (resourcesIdx >= 0) {
        baseOrder.splice(resourcesIdx, 0, id);
      } else {
        baseOrder.push(id);
      }
    }
  };

  if (next.specialized?.length) ensure('specialized');
  if (next.relocation) ensure('relocation');

  next.sectionOrder = baseOrder;

  return next;
}
