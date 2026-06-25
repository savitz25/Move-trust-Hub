import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Colorado curated county corridor links — batch 1 */
const CO_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  'el-paso': [
    { slug: 'douglas', name: 'Douglas', seat: 'Castle Rock', href: '/local-movers/colorado/douglas', displayLabel: 'Douglas County, CO' },
    { slug: 'teller', name: 'Teller', seat: 'Cripple Creek', href: '/local-movers/colorado/teller', displayLabel: 'Teller County, CO' },
    { slug: 'pueblo', name: 'Pueblo', seat: 'Pueblo', href: '/local-movers/colorado/pueblo', displayLabel: 'Pueblo County, CO' },
    { slug: 'fremont', name: 'Fremont', seat: 'Cañon City', href: '/local-movers/colorado/fremont', displayLabel: 'Fremont County, CO' },
    { slug: 'elbert', name: 'Elbert', seat: 'Kiowa', href: '/local-movers/colorado/elbert', displayLabel: 'Elbert County, CO' },
  ],
  denver: [
    { slug: 'arapahoe', name: 'Arapahoe', seat: 'Littleton', href: '/local-movers/colorado/arapahoe', displayLabel: 'Arapahoe County, CO' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Golden', href: '/local-movers/colorado/jefferson', displayLabel: 'Jefferson County, CO' },
    { slug: 'adams', name: 'Adams', seat: 'Brighton', href: '/local-movers/colorado/adams', displayLabel: 'Adams County, CO' },
    { slug: 'douglas', name: 'Douglas', seat: 'Castle Rock', href: '/local-movers/colorado/douglas', displayLabel: 'Douglas County, CO' },
    { slug: 'broomfield', name: 'Broomfield', seat: 'Broomfield', href: '/local-movers/colorado/broomfield', displayLabel: 'Broomfield County, CO' },
  ],
  arapahoe: [
    { slug: 'denver', name: 'Denver', seat: 'Denver', href: '/local-movers/colorado/denver', displayLabel: 'Denver County, CO' },
    { slug: 'douglas', name: 'Douglas', seat: 'Castle Rock', href: '/local-movers/colorado/douglas', displayLabel: 'Douglas County, CO' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Golden', href: '/local-movers/colorado/jefferson', displayLabel: 'Jefferson County, CO' },
    { slug: 'el-paso', name: 'El Paso', seat: 'Colorado Springs', href: '/local-movers/colorado/el-paso', displayLabel: 'El Paso County, CO' },
    { slug: 'elbert', name: 'Elbert', seat: 'Kiowa', href: '/local-movers/colorado/elbert', displayLabel: 'Elbert County, CO' },
  ],
  jefferson: [
    { slug: 'denver', name: 'Denver', seat: 'Denver', href: '/local-movers/colorado/denver', displayLabel: 'Denver County, CO' },
    { slug: 'arapahoe', name: 'Arapahoe', seat: 'Littleton', href: '/local-movers/colorado/arapahoe', displayLabel: 'Arapahoe County, CO' },
    { slug: 'adams', name: 'Adams', seat: 'Brighton', href: '/local-movers/colorado/adams', displayLabel: 'Adams County, CO' },
    { slug: 'douglas', name: 'Douglas', seat: 'Castle Rock', href: '/local-movers/colorado/douglas', displayLabel: 'Douglas County, CO' },
    { slug: 'clear-creek', name: 'Clear Creek', seat: 'Georgetown', href: '/local-movers/colorado/clear-creek', displayLabel: 'Clear Creek County, CO' },
  ],
  adams: [
    { slug: 'denver', name: 'Denver', seat: 'Denver', href: '/local-movers/colorado/denver', displayLabel: 'Denver County, CO' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Golden', href: '/local-movers/colorado/jefferson', displayLabel: 'Jefferson County, CO' },
    { slug: 'weld', name: 'Weld', seat: 'Greeley', href: '/local-movers/colorado/weld', displayLabel: 'Weld County, CO' },
    { slug: 'arapahoe', name: 'Arapahoe', seat: 'Littleton', href: '/local-movers/colorado/arapahoe', displayLabel: 'Arapahoe County, CO' },
    { slug: 'broomfield', name: 'Broomfield', seat: 'Broomfield', href: '/local-movers/colorado/broomfield', displayLabel: 'Broomfield County, CO' },
  ],
  douglas: [
    { slug: 'denver', name: 'Denver', seat: 'Denver', href: '/local-movers/colorado/denver', displayLabel: 'Denver County, CO' },
    { slug: 'arapahoe', name: 'Arapahoe', seat: 'Littleton', href: '/local-movers/colorado/arapahoe', displayLabel: 'Arapahoe County, CO' },
    { slug: 'el-paso', name: 'El Paso', seat: 'Colorado Springs', href: '/local-movers/colorado/el-paso', displayLabel: 'El Paso County, CO' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Golden', href: '/local-movers/colorado/jefferson', displayLabel: 'Jefferson County, CO' },
    { slug: 'elbert', name: 'Elbert', seat: 'Kiowa', href: '/local-movers/colorado/elbert', displayLabel: 'Elbert County, CO' },
  ],
  weld: [
    { slug: 'adams', name: 'Adams', seat: 'Brighton', href: '/local-movers/colorado/adams', displayLabel: 'Adams County, CO' },
    { slug: 'larimer', name: 'Larimer', seat: 'Fort Collins', href: '/local-movers/colorado/larimer', displayLabel: 'Larimer County, CO' },
    { slug: 'morgan', name: 'Morgan', seat: 'Fort Morgan', href: '/local-movers/colorado/morgan', displayLabel: 'Morgan County, CO' },
    { slug: 'logan', name: 'Logan', seat: 'Sterling', href: '/local-movers/colorado/logan', displayLabel: 'Logan County, CO' },
    { slug: 'denver', name: 'Denver', seat: 'Denver', href: '/local-movers/colorado/denver', displayLabel: 'Denver County, CO' },
  ],
};

export function getColoradoNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return CO_COUNTY_NEIGHBORS[countySlug] ?? [];
}