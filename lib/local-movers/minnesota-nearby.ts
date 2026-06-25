import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Minnesota curated county corridor links — 11 counties */
const MN_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  hennepin: [
    { slug: "ramsey", name: "Ramsey", seat: "Saint Paul", href: "/local-movers/minnesota/ramsey", displayLabel: "Ramsey County, MN" },
    { slug: "dakota", name: "Dakota", seat: "Hastings", href: "/local-movers/minnesota/dakota", displayLabel: "Dakota County, MN" },
    { slug: "scott", name: "Scott", seat: "Shakopee", href: "/local-movers/minnesota/scott", displayLabel: "Scott County, MN" },
    { slug: "carver", name: "Carver", seat: "Chaska", href: "/local-movers/minnesota/carver", displayLabel: "Carver County, MN" },
    { slug: "wright", name: "Wright", seat: "Buffalo", href: "/local-movers/minnesota/wright", displayLabel: "Wright County, MN" },
  ],
  ramsey: [
    { slug: "hennepin", name: "Hennepin", seat: "Minneapolis", href: "/local-movers/minnesota/hennepin", displayLabel: "Hennepin County, MN" },
    { slug: "washington", name: "Washington", seat: "Stillwater", href: "/local-movers/minnesota/washington", displayLabel: "Washington County, MN" },
    { slug: "anoka", name: "Anoka", seat: "Anoka", href: "/local-movers/minnesota/anoka", displayLabel: "Anoka County, MN" },
    { slug: "dakota", name: "Dakota", seat: "Hastings", href: "/local-movers/minnesota/dakota", displayLabel: "Dakota County, MN" },
  ],
  dakota: [
    { slug: "ramsey", name: "Ramsey", seat: "Saint Paul", href: "/local-movers/minnesota/ramsey", displayLabel: "Ramsey County, MN" },
    { slug: "washington", name: "Washington", seat: "Stillwater", href: "/local-movers/minnesota/washington", displayLabel: "Washington County, MN" },
    { slug: "scott", name: "Scott", seat: "Shakopee", href: "/local-movers/minnesota/scott", displayLabel: "Scott County, MN" },
    { slug: "rice", name: "Rice", seat: "Faribault", href: "/local-movers/minnesota/rice", displayLabel: "Rice County, MN" },
    { slug: "pierce", name: "Pierce", seat: "Ellsworth", href: "/local-movers/wisconsin/pierce", displayLabel: "Pierce County, WI" },
  ],
  anoka: [
    { slug: "hennepin", name: "Hennepin", seat: "Minneapolis", href: "/local-movers/minnesota/hennepin", displayLabel: "Hennepin County, MN" },
    { slug: "ramsey", name: "Ramsey", seat: "Saint Paul", href: "/local-movers/minnesota/ramsey", displayLabel: "Ramsey County, MN" },
    { slug: "washington", name: "Washington", seat: "Stillwater", href: "/local-movers/minnesota/washington", displayLabel: "Washington County, MN" },
    { slug: "sherburne", name: "Sherburne", seat: "Elk River", href: "/local-movers/minnesota/sherburne", displayLabel: "Sherburne County, MN" },
    { slug: "isanti", name: "Isanti", seat: "Cambridge", href: "/local-movers/minnesota/isanti", displayLabel: "Isanti County, MN" },
  ],
  washington: [
    { slug: "ramsey", name: "Ramsey", seat: "Saint Paul", href: "/local-movers/minnesota/ramsey", displayLabel: "Ramsey County, MN" },
    { slug: "anoka", name: "Anoka", seat: "Anoka", href: "/local-movers/minnesota/anoka", displayLabel: "Anoka County, MN" },
    { slug: "dakota", name: "Dakota", seat: "Hastings", href: "/local-movers/minnesota/dakota", displayLabel: "Dakota County, MN" },
    { slug: "chisago", name: "Chisago", seat: "Center City", href: "/local-movers/minnesota/chisago", displayLabel: "Chisago County, MN" },
    { slug: "pierce", name: "Pierce", seat: "Ellsworth", href: "/local-movers/wisconsin/pierce", displayLabel: "Pierce County, WI" },
  ],
  'st-louis': [
    { slug: "carlton", name: "Carlton", seat: "Moose Lake", href: "/local-movers/minnesota/carlton", displayLabel: "Carlton County, MN" },
    { slug: "lake", name: "Lake", seat: "Two Harbors", href: "/local-movers/minnesota/lake", displayLabel: "Lake County, MN" },
    { slug: "itasca", name: "Itasca", seat: "Grand Rapids", href: "/local-movers/minnesota/itasca", displayLabel: "Itasca County, MN" },
    { slug: "koochiching", name: "Koochiching", seat: "International Falls", href: "/local-movers/minnesota/koochiching", displayLabel: "Koochiching County, MN" },
    { slug: "douglas", name: "Douglas", seat: "Superior", href: "/local-movers/wisconsin/douglas", displayLabel: "Douglas County, WI" },
  ],
  olmsted: [
    { slug: "dodge", name: "Dodge", seat: "Mantorville", href: "/local-movers/minnesota/dodge", displayLabel: "Dodge County, MN" },
    { slug: "wabasha", name: "Wabasha", seat: "Wabasha", href: "/local-movers/minnesota/wabasha", displayLabel: "Wabasha County, MN" },
    { slug: "winona", name: "Winona", seat: "Winona", href: "/local-movers/minnesota/winona", displayLabel: "Winona County, MN" },
    { slug: "fillmore", name: "Fillmore", seat: "Preston", href: "/local-movers/minnesota/fillmore", displayLabel: "Fillmore County, MN" },
    { slug: "mower", name: "Mower", seat: "Austin", href: "/local-movers/minnesota/mower", displayLabel: "Mower County, MN" },
  ],
  stearns: [
    { slug: "benton", name: "Benton", seat: "Foley", href: "/local-movers/minnesota/benton", displayLabel: "Benton County, MN" },
    { slug: "morrison", name: "Morrison", seat: "Little Falls", href: "/local-movers/minnesota/morrison", displayLabel: "Morrison County, MN" },
    { slug: "todd", name: "Todd", seat: "Long Prairie", href: "/local-movers/minnesota/todd", displayLabel: "Todd County, MN" },
    { slug: "douglas", name: "Douglas", seat: "Alexandria", href: "/local-movers/minnesota/douglas", displayLabel: "Douglas County, MN" },
    { slug: "pope", name: "Pope", seat: "Glenwood", href: "/local-movers/minnesota/pope", displayLabel: "Pope County, MN" },
  ],
  scott: [
    { slug: "dakota", name: "Dakota", seat: "Hastings", href: "/local-movers/minnesota/dakota", displayLabel: "Dakota County, MN" },
    { slug: "carver", name: "Carver", seat: "Chaska", href: "/local-movers/minnesota/carver", displayLabel: "Carver County, MN" },
    { slug: "sibley", name: "Sibley", seat: "Gaylord", href: "/local-movers/minnesota/sibley", displayLabel: "Sibley County, MN" },
    { slug: "le-sueur", name: "Le Sueur", seat: "Le Center", href: "/local-movers/minnesota/le-sueur", displayLabel: "Le Sueur County, MN" },
    { slug: "rice", name: "Rice", seat: "Faribault", href: "/local-movers/minnesota/rice", displayLabel: "Rice County, MN" },
  ],
  wright: [
    { slug: "hennepin", name: "Hennepin", seat: "Minneapolis", href: "/local-movers/minnesota/hennepin", displayLabel: "Hennepin County, MN" },
    { slug: "sherburne", name: "Sherburne", seat: "Elk River", href: "/local-movers/minnesota/sherburne", displayLabel: "Sherburne County, MN" },
    { slug: "mcleod", name: "McLeod", seat: "Glencoe", href: "/local-movers/minnesota/mcleod", displayLabel: "McLeod County, MN" },
    { slug: "meeker", name: "Meeker", seat: "Litchfield", href: "/local-movers/minnesota/meeker", displayLabel: "Meeker County, MN" },
    { slug: "carver", name: "Carver", seat: "Chaska", href: "/local-movers/minnesota/carver", displayLabel: "Carver County, MN" },
  ],
  carver: [
    { slug: "scott", name: "Scott", seat: "Shakopee", href: "/local-movers/minnesota/scott", displayLabel: "Scott County, MN" },
    { slug: "sibley", name: "Sibley", seat: "Gaylord", href: "/local-movers/minnesota/sibley", displayLabel: "Sibley County, MN" },
    { slug: "mcleod", name: "McLeod", seat: "Glencoe", href: "/local-movers/minnesota/mcleod", displayLabel: "McLeod County, MN" },
    { slug: "wright", name: "Wright", seat: "Buffalo", href: "/local-movers/minnesota/wright", displayLabel: "Wright County, MN" },
    { slug: "hennepin", name: "Hennepin", seat: "Minneapolis", href: "/local-movers/minnesota/hennepin", displayLabel: "Hennepin County, MN" },
  ],
};

export function getMinnesotaNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return MN_COUNTY_NEIGHBORS[countySlug] ?? [];
}
