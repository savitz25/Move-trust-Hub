import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Colorado curated county corridor links — batch 1+2: 23/64 */
const CO_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  'el-paso': [
    { slug: 'douglas', name: 'Douglas', seat: 'Castle Rock', href: '/local-movers/colorado/douglas', displayLabel: 'Douglas County, CO' },
    { slug: 'pueblo', name: 'Pueblo', seat: 'Pueblo', href: '/local-movers/colorado/pueblo', displayLabel: 'Pueblo County, CO' },
    { slug: 'fremont', name: 'Fremont', seat: 'Canon City', href: '/local-movers/colorado/fremont', displayLabel: 'Fremont County, CO' },
    { slug: 'elbert', name: 'Elbert', seat: 'Kiowa', href: '/local-movers/colorado/elbert', displayLabel: 'Elbert County, CO' },
    { slug: 'arapahoe', name: 'Arapahoe', seat: 'Littleton', href: '/local-movers/colorado/arapahoe', displayLabel: 'Arapahoe County, CO' },
  ],
  denver: [
    { slug: 'arapahoe', name: 'Arapahoe', seat: 'Littleton', href: '/local-movers/colorado/arapahoe', displayLabel: 'Arapahoe County, CO' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Golden', href: '/local-movers/colorado/jefferson', displayLabel: 'Jefferson County, CO' },
    { slug: 'adams', name: 'Adams', seat: 'Brighton', href: '/local-movers/colorado/adams', displayLabel: 'Adams County, CO' },
    { slug: 'broomfield', name: 'Broomfield', seat: 'Broomfield', href: '/local-movers/colorado/broomfield', displayLabel: 'Broomfield County, CO' },
    { slug: 'boulder', name: 'Boulder', seat: 'Boulder', href: '/local-movers/colorado/boulder', displayLabel: 'Boulder County, CO' },
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
    { slug: 'boulder', name: 'Boulder', seat: 'Boulder', href: '/local-movers/colorado/boulder', displayLabel: 'Boulder County, CO' },
  ],
  adams: [
    { slug: 'denver', name: 'Denver', seat: 'Denver', href: '/local-movers/colorado/denver', displayLabel: 'Denver County, CO' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Golden', href: '/local-movers/colorado/jefferson', displayLabel: 'Jefferson County, CO' },
    { slug: 'weld', name: 'Weld', seat: 'Greeley', href: '/local-movers/colorado/weld', displayLabel: 'Weld County, CO' },
    { slug: 'broomfield', name: 'Broomfield', seat: 'Broomfield', href: '/local-movers/colorado/broomfield', displayLabel: 'Broomfield County, CO' },
    { slug: 'larimer', name: 'Larimer', seat: 'Fort Collins', href: '/local-movers/colorado/larimer', displayLabel: 'Larimer County, CO' },
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
    { slug: 'boulder', name: 'Boulder', seat: 'Boulder', href: '/local-movers/colorado/boulder', displayLabel: 'Boulder County, CO' },
    { slug: 'denver', name: 'Denver', seat: 'Denver', href: '/local-movers/colorado/denver', displayLabel: 'Denver County, CO' },
  ],
  larimer: [
    { slug: 'weld', name: 'Weld', seat: 'Greeley', href: '/local-movers/colorado/weld', displayLabel: 'Weld County, CO' },
    { slug: 'boulder', name: 'Boulder', seat: 'Boulder', href: '/local-movers/colorado/boulder', displayLabel: 'Boulder County, CO' },
    { slug: 'adams', name: 'Adams', seat: 'Brighton', href: '/local-movers/colorado/adams', displayLabel: 'Adams County, CO' },
    { slug: 'morgan', name: 'Morgan', seat: 'Fort Morgan', href: '/local-movers/colorado/morgan', displayLabel: 'Morgan County, CO' },
    { slug: 'routt', name: 'Routt', seat: 'Steamboat Springs', href: '/local-movers/colorado/routt', displayLabel: 'Routt County, CO' },
  ],
  boulder: [
    { slug: 'larimer', name: 'Larimer', seat: 'Fort Collins', href: '/local-movers/colorado/larimer', displayLabel: 'Larimer County, CO' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Golden', href: '/local-movers/colorado/jefferson', displayLabel: 'Jefferson County, CO' },
    { slug: 'broomfield', name: 'Broomfield', seat: 'Broomfield', href: '/local-movers/colorado/broomfield', displayLabel: 'Broomfield County, CO' },
    { slug: 'adams', name: 'Adams', seat: 'Brighton', href: '/local-movers/colorado/adams', displayLabel: 'Adams County, CO' },
    { slug: 'weld', name: 'Weld', seat: 'Greeley', href: '/local-movers/colorado/weld', displayLabel: 'Weld County, CO' },
  ],
  pueblo: [
    { slug: 'el-paso', name: 'El Paso', seat: 'Colorado Springs', href: '/local-movers/colorado/el-paso', displayLabel: 'El Paso County, CO' },
    { slug: 'fremont', name: 'Fremont', seat: 'Canon City', href: '/local-movers/colorado/fremont', displayLabel: 'Fremont County, CO' },
    { slug: 'elbert', name: 'Elbert', seat: 'Kiowa', href: '/local-movers/colorado/elbert', displayLabel: 'Elbert County, CO' },
    { slug: 'douglas', name: 'Douglas', seat: 'Castle Rock', href: '/local-movers/colorado/douglas', displayLabel: 'Douglas County, CO' },
    { slug: 'arapahoe', name: 'Arapahoe', seat: 'Littleton', href: '/local-movers/colorado/arapahoe', displayLabel: 'Arapahoe County, CO' },
  ],
  mesa: [
    { slug: 'garfield', name: 'Garfield', seat: 'Glenwood Springs', href: '/local-movers/colorado/garfield', displayLabel: 'Garfield County, CO' },
    { slug: 'delta', name: 'Delta', seat: 'Delta', href: '/local-movers/colorado/delta', displayLabel: 'Delta County, CO' },
    { slug: 'montrose', name: 'Montrose', seat: 'Montrose', href: '/local-movers/colorado/montrose', displayLabel: 'Montrose County, CO' },
    { slug: 'eagle', name: 'Eagle', seat: 'Eagle', href: '/local-movers/colorado/eagle', displayLabel: 'Eagle County, CO' },
    { slug: 'routt', name: 'Routt', seat: 'Steamboat Springs', href: '/local-movers/colorado/routt', displayLabel: 'Routt County, CO' },
  ],
  broomfield: [
    { slug: 'denver', name: 'Denver', seat: 'Denver', href: '/local-movers/colorado/denver', displayLabel: 'Denver County, CO' },
    { slug: 'adams', name: 'Adams', seat: 'Brighton', href: '/local-movers/colorado/adams', displayLabel: 'Adams County, CO' },
    { slug: 'boulder', name: 'Boulder', seat: 'Boulder', href: '/local-movers/colorado/boulder', displayLabel: 'Boulder County, CO' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Golden', href: '/local-movers/colorado/jefferson', displayLabel: 'Jefferson County, CO' },
    { slug: 'weld', name: 'Weld', seat: 'Greeley', href: '/local-movers/colorado/weld', displayLabel: 'Weld County, CO' },
  ],
  garfield: [
    { slug: 'mesa', name: 'Mesa', seat: 'Grand Junction', href: '/local-movers/colorado/mesa', displayLabel: 'Mesa County, CO' },
    { slug: 'eagle', name: 'Eagle', seat: 'Eagle', href: '/local-movers/colorado/eagle', displayLabel: 'Eagle County, CO' },
    { slug: 'routt', name: 'Routt', seat: 'Steamboat Springs', href: '/local-movers/colorado/routt', displayLabel: 'Routt County, CO' },
    { slug: 'delta', name: 'Delta', seat: 'Delta', href: '/local-movers/colorado/delta', displayLabel: 'Delta County, CO' },
    { slug: 'summit', name: 'Summit', seat: 'Breckenridge', href: '/local-movers/colorado/summit', displayLabel: 'Summit County, CO' },
  ],
  'la-plata': [
    { slug: 'montezuma', name: 'Montezuma', seat: 'Cortez', href: '/local-movers/colorado/montezuma', displayLabel: 'Montezuma County, CO' },
    { slug: 'mesa', name: 'Mesa', seat: 'Grand Junction', href: '/local-movers/colorado/mesa', displayLabel: 'Mesa County, CO' },
    { slug: 'delta', name: 'Delta', seat: 'Delta', href: '/local-movers/colorado/delta', displayLabel: 'Delta County, CO' },
    { slug: 'archuleta', name: 'Archuleta', seat: 'Pagosa Springs', href: '/local-movers/colorado/archuleta', displayLabel: 'Archuleta County, CO' },
    { slug: 'san-juan', name: 'San Juan', seat: 'Silverton', href: '/local-movers/colorado/san-juan', displayLabel: 'San Juan County, CO' },
  ],
  eagle: [
    { slug: 'summit', name: 'Summit', seat: 'Breckenridge', href: '/local-movers/colorado/summit', displayLabel: 'Summit County, CO' },
    { slug: 'garfield', name: 'Garfield', seat: 'Glenwood Springs', href: '/local-movers/colorado/garfield', displayLabel: 'Garfield County, CO' },
    { slug: 'routt', name: 'Routt', seat: 'Steamboat Springs', href: '/local-movers/colorado/routt', displayLabel: 'Routt County, CO' },
    { slug: 'mesa', name: 'Mesa', seat: 'Grand Junction', href: '/local-movers/colorado/mesa', displayLabel: 'Mesa County, CO' },
    { slug: 'pitkin', name: 'Pitkin', seat: 'Aspen', href: '/local-movers/colorado/pitkin', displayLabel: 'Pitkin County, CO' },
  ],
  fremont: [
    { slug: 'el-paso', name: 'El Paso', seat: 'Colorado Springs', href: '/local-movers/colorado/el-paso', displayLabel: 'El Paso County, CO' },
    { slug: 'pueblo', name: 'Pueblo', seat: 'Pueblo', href: '/local-movers/colorado/pueblo', displayLabel: 'Pueblo County, CO' },
    { slug: 'elbert', name: 'Elbert', seat: 'Kiowa', href: '/local-movers/colorado/elbert', displayLabel: 'Elbert County, CO' },
    { slug: 'douglas', name: 'Douglas', seat: 'Castle Rock', href: '/local-movers/colorado/douglas', displayLabel: 'Douglas County, CO' },
    { slug: 'teller', name: 'Teller', seat: 'Cripple Creek', href: '/local-movers/colorado/teller', displayLabel: 'Teller County, CO' },
  ],
  montrose: [
    { slug: 'mesa', name: 'Mesa', seat: 'Grand Junction', href: '/local-movers/colorado/mesa', displayLabel: 'Mesa County, CO' },
    { slug: 'delta', name: 'Delta', seat: 'Delta', href: '/local-movers/colorado/delta', displayLabel: 'Delta County, CO' },
    { slug: 'montezuma', name: 'Montezuma', seat: 'Cortez', href: '/local-movers/colorado/montezuma', displayLabel: 'Montezuma County, CO' },
    { slug: 'garfield', name: 'Garfield', seat: 'Glenwood Springs', href: '/local-movers/colorado/garfield', displayLabel: 'Garfield County, CO' },
    { slug: 'ouray', name: 'Ouray', seat: 'Ouray', href: '/local-movers/colorado/ouray', displayLabel: 'Ouray County, CO' },
  ],
  delta: [
    { slug: 'mesa', name: 'Mesa', seat: 'Grand Junction', href: '/local-movers/colorado/mesa', displayLabel: 'Mesa County, CO' },
    { slug: 'montrose', name: 'Montrose', seat: 'Montrose', href: '/local-movers/colorado/montrose', displayLabel: 'Montrose County, CO' },
    { slug: 'garfield', name: 'Garfield', seat: 'Glenwood Springs', href: '/local-movers/colorado/garfield', displayLabel: 'Garfield County, CO' },
    { slug: 'gunnison', name: 'Gunnison', seat: 'Gunnison', href: '/local-movers/colorado/gunnison', displayLabel: 'Gunnison County, CO' },
    { slug: 'eagle', name: 'Eagle', seat: 'Eagle', href: '/local-movers/colorado/eagle', displayLabel: 'Eagle County, CO' },
  ],
  elbert: [
    { slug: 'douglas', name: 'Douglas', seat: 'Castle Rock', href: '/local-movers/colorado/douglas', displayLabel: 'Douglas County, CO' },
    { slug: 'el-paso', name: 'El Paso', seat: 'Colorado Springs', href: '/local-movers/colorado/el-paso', displayLabel: 'El Paso County, CO' },
    { slug: 'arapahoe', name: 'Arapahoe', seat: 'Littleton', href: '/local-movers/colorado/arapahoe', displayLabel: 'Arapahoe County, CO' },
    { slug: 'weld', name: 'Weld', seat: 'Greeley', href: '/local-movers/colorado/weld', displayLabel: 'Weld County, CO' },
    { slug: 'fremont', name: 'Fremont', seat: 'Canon City', href: '/local-movers/colorado/fremont', displayLabel: 'Fremont County, CO' },
  ],
  summit: [
    { slug: 'eagle', name: 'Eagle', seat: 'Eagle', href: '/local-movers/colorado/eagle', displayLabel: 'Eagle County, CO' },
    { slug: 'garfield', name: 'Garfield', seat: 'Glenwood Springs', href: '/local-movers/colorado/garfield', displayLabel: 'Garfield County, CO' },
    { slug: 'routt', name: 'Routt', seat: 'Steamboat Springs', href: '/local-movers/colorado/routt', displayLabel: 'Routt County, CO' },
    { slug: 'jefferson', name: 'Jefferson', seat: 'Golden', href: '/local-movers/colorado/jefferson', displayLabel: 'Jefferson County, CO' },
    { slug: 'boulder', name: 'Boulder', seat: 'Boulder', href: '/local-movers/colorado/boulder', displayLabel: 'Boulder County, CO' },
  ],
  morgan: [
    { slug: 'weld', name: 'Weld', seat: 'Greeley', href: '/local-movers/colorado/weld', displayLabel: 'Weld County, CO' },
    { slug: 'larimer', name: 'Larimer', seat: 'Fort Collins', href: '/local-movers/colorado/larimer', displayLabel: 'Larimer County, CO' },
    { slug: 'adams', name: 'Adams', seat: 'Brighton', href: '/local-movers/colorado/adams', displayLabel: 'Adams County, CO' },
    { slug: 'washington', name: 'Washington', seat: 'Akron', href: '/local-movers/colorado/washington', displayLabel: 'Washington County, CO' },
    { slug: 'logan', name: 'Logan', seat: 'Sterling', href: '/local-movers/colorado/logan', displayLabel: 'Logan County, CO' },
  ],
  montezuma: [
    { slug: 'la-plata', name: 'La Plata', seat: 'Durango', href: '/local-movers/colorado/la-plata', displayLabel: 'La Plata County, CO' },
    { slug: 'mesa', name: 'Mesa', seat: 'Grand Junction', href: '/local-movers/colorado/mesa', displayLabel: 'Mesa County, CO' },
    { slug: 'delta', name: 'Delta', seat: 'Delta', href: '/local-movers/colorado/delta', displayLabel: 'Delta County, CO' },
    { slug: 'dolores', name: 'Dolores', seat: 'Dove Creek', href: '/local-movers/colorado/dolores', displayLabel: 'Dolores County, CO' },
    { slug: 'san-juan', name: 'San Juan', seat: 'Silverton', href: '/local-movers/colorado/san-juan', displayLabel: 'San Juan County, CO' },
  ],
  routt: [
    { slug: 'eagle', name: 'Eagle', seat: 'Eagle', href: '/local-movers/colorado/eagle', displayLabel: 'Eagle County, CO' },
    { slug: 'garfield', name: 'Garfield', seat: 'Glenwood Springs', href: '/local-movers/colorado/garfield', displayLabel: 'Garfield County, CO' },
    { slug: 'summit', name: 'Summit', seat: 'Breckenridge', href: '/local-movers/colorado/summit', displayLabel: 'Summit County, CO' },
    { slug: 'larimer', name: 'Larimer', seat: 'Fort Collins', href: '/local-movers/colorado/larimer', displayLabel: 'Larimer County, CO' },
    { slug: 'jackson', name: 'Jackson', seat: 'Walden', href: '/local-movers/colorado/jackson', displayLabel: 'Jackson County, CO' },
  ],
};

export function getColoradoNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return CO_COUNTY_NEIGHBORS[countySlug] ?? [];
}
