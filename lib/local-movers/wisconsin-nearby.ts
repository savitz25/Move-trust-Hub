import type { NearbyCountyLink } from '@/lib/local-movers/nearby-types';

export type { NearbyCountyLink };

/** Wisconsin curated county corridor links — batch 1 (10 counties) */
const WI_COUNTY_NEIGHBORS: Record<string, NearbyCountyLink[]> = {
  milwaukee: [
    { slug: "waukesha", name: "Waukesha", seat: "Waukesha", href: "/local-movers/wisconsin/waukesha", displayLabel: "Waukesha County, WI" },
    { slug: "racine", name: "Racine", seat: "Racine", href: "/local-movers/wisconsin/racine", displayLabel: "Racine County, WI" },
    { slug: "washington", name: "Washington", seat: "West Bend", href: "/local-movers/wisconsin/washington", displayLabel: "Washington County, WI" },
    { slug: "ozaukee", name: "Ozaukee", seat: "Port Washington", href: "/local-movers/wisconsin/ozaukee", displayLabel: "Ozaukee County, WI" },
  ],
  dane: [
    { slug: "columbia", name: "Columbia", seat: "Portage", href: "/local-movers/wisconsin/columbia", displayLabel: "Columbia County, WI" },
    { slug: "dodge", name: "Dodge", seat: "Juneau", href: "/local-movers/wisconsin/dodge", displayLabel: "Dodge County, WI" },
    { slug: "green", name: "Green", seat: "Monroe", href: "/local-movers/wisconsin/green", displayLabel: "Green County, WI" },
    { slug: "iowa", name: "Iowa", seat: "Dodgeville", href: "/local-movers/wisconsin/iowa", displayLabel: "Iowa County, WI" },
    { slug: "rock", name: "Rock", seat: "Janesville", href: "/local-movers/wisconsin/rock", displayLabel: "Rock County, WI" },
  ],
  waukesha: [
    { slug: "dodge", name: "Dodge", seat: "Juneau", href: "/local-movers/wisconsin/dodge", displayLabel: "Dodge County, WI" },
    { slug: "jefferson", name: "Jefferson", seat: "Jefferson", href: "/local-movers/wisconsin/jefferson", displayLabel: "Jefferson County, WI" },
    { slug: "milwaukee", name: "Milwaukee", seat: "Milwaukee", href: "/local-movers/wisconsin/milwaukee", displayLabel: "Milwaukee County, WI" },
    { slug: "walworth", name: "Walworth", seat: "Elkhorn", href: "/local-movers/wisconsin/walworth", displayLabel: "Walworth County, WI" },
    { slug: "washington", name: "Washington", seat: "West Bend", href: "/local-movers/wisconsin/washington", displayLabel: "Washington County, WI" },
  ],
  brown: [
    { slug: "door", name: "Door", seat: "Sturgeon Bay", href: "/local-movers/wisconsin/door", displayLabel: "Door County, WI" },
    { slug: "kewaunee", name: "Kewaunee", seat: "Kewaunee", href: "/local-movers/wisconsin/kewaunee", displayLabel: "Kewaunee County, WI" },
    { slug: "oconto", name: "Oconto", seat: "Oconto", href: "/local-movers/wisconsin/oconto", displayLabel: "Oconto County, WI" },
    { slug: "outagamie", name: "Outagamie", seat: "Appleton", href: "/local-movers/wisconsin/outagamie", displayLabel: "Outagamie County, WI" },
    { slug: "shawano", name: "Shawano", seat: "Shawano", href: "/local-movers/wisconsin/shawano", displayLabel: "Shawano County, WI" },
  ],
  racine: [
    { slug: "kenosha", name: "Kenosha", seat: "Kenosha", href: "/local-movers/wisconsin/kenosha", displayLabel: "Kenosha County, WI" },
    { slug: "milwaukee", name: "Milwaukee", seat: "Milwaukee", href: "/local-movers/wisconsin/milwaukee", displayLabel: "Milwaukee County, WI" },
    { slug: "walworth", name: "Walworth", seat: "Elkhorn", href: "/local-movers/wisconsin/walworth", displayLabel: "Walworth County, WI" },
  ],
  outagamie: [
    { slug: "brown", name: "Brown", seat: "Green Bay", href: "/local-movers/wisconsin/brown", displayLabel: "Brown County, WI" },
    { slug: "calumet", name: "Calumet", seat: "Chilton", href: "/local-movers/wisconsin/calumet", displayLabel: "Calumet County, WI" },
    { slug: "manitowoc", name: "Manitowoc", seat: "Manitowoc", href: "/local-movers/wisconsin/manitowoc", displayLabel: "Manitowoc County, WI" },
    { slug: "shawano", name: "Shawano", seat: "Shawano", href: "/local-movers/wisconsin/shawano", displayLabel: "Shawano County, WI" },
    { slug: "waupaca", name: "Waupaca", seat: "Waupaca", href: "/local-movers/wisconsin/waupaca", displayLabel: "Waupaca County, WI" },
  ],
  winnebago: [
    { slug: "calumet", name: "Calumet", seat: "Chilton", href: "/local-movers/wisconsin/calumet", displayLabel: "Calumet County, WI" },
    { slug: "fond-du-lac", name: "Fond du Lac", seat: "Fond du Lac", href: "/local-movers/wisconsin/fond-du-lac", displayLabel: "Fond du Lac County, WI" },
    { slug: "green-lake", name: "Green Lake", seat: "Green Lake", href: "/local-movers/wisconsin/green-lake", displayLabel: "Green Lake County, WI" },
    { slug: "outagamie", name: "Outagamie", seat: "Appleton", href: "/local-movers/wisconsin/outagamie", displayLabel: "Outagamie County, WI" },
    { slug: "waushara", name: "Waushara", seat: "Wautoma", href: "/local-movers/wisconsin/waushara", displayLabel: "Waushara County, WI" },
  ],
  kenosha: [
    { slug: "racine", name: "Racine", seat: "Racine", href: "/local-movers/wisconsin/racine", displayLabel: "Racine County, WI" },
    { slug: "walworth", name: "Walworth", seat: "Elkhorn", href: "/local-movers/wisconsin/walworth", displayLabel: "Walworth County, WI" },
    { slug: "lake", name: "Lake", seat: "Waukegan", href: "/local-movers/illinois/lake", displayLabel: "Lake County, IL" },
  ],
  rock: [
    { slug: "dane", name: "Dane", seat: "Madison", href: "/local-movers/wisconsin/dane", displayLabel: "Dane County, WI" },
    { slug: "green", name: "Green", seat: "Monroe", href: "/local-movers/wisconsin/green", displayLabel: "Green County, WI" },
    { slug: "jefferson", name: "Jefferson", seat: "Jefferson", href: "/local-movers/wisconsin/jefferson", displayLabel: "Jefferson County, WI" },
    { slug: "walworth", name: "Walworth", seat: "Elkhorn", href: "/local-movers/wisconsin/walworth", displayLabel: "Walworth County, WI" },
    { slug: "winnebago", name: "Winnebago", seat: "Rockford", href: "/local-movers/illinois/winnebago", displayLabel: "Winnebago County, IL" },
  ],
  marathon: [
    { slug: "clark", name: "Clark", seat: "Neillsville", href: "/local-movers/wisconsin/clark", displayLabel: "Clark County, WI" },
    { slug: "langlade", name: "Langlade", seat: "Antigo", href: "/local-movers/wisconsin/langlade", displayLabel: "Langlade County, WI" },
    { slug: "lincoln", name: "Lincoln", seat: "Merrill", href: "/local-movers/wisconsin/lincoln", displayLabel: "Lincoln County, WI" },
    { slug: "portage", name: "Portage", seat: "Stevens Point", href: "/local-movers/wisconsin/portage", displayLabel: "Portage County, WI" },
    { slug: "taylor", name: "Taylor", seat: "Medford", href: "/local-movers/wisconsin/taylor", displayLabel: "Taylor County, WI" },
  ],
};

export function getWisconsinNearbyCounties(countySlug: string): NearbyCountyLink[] {
  return WI_COUNTY_NEIGHBORS[countySlug] ?? [];
}
