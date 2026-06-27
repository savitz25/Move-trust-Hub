import type { RouteGuideExtendedContent } from '@/lib/resources/routes/types';
import { californiaToArizonaContent } from '@/lib/resources/routes/california-to-arizona';
import { californiaToFloridaContent } from '@/lib/resources/routes/california-to-florida';
import { californiaToIdahoContent } from '@/lib/resources/routes/california-to-idaho';
import { californiaToNorthCarolinaContent } from '@/lib/resources/routes/california-to-north-carolina';
import { californiaToOregonContent } from '@/lib/resources/routes/california-to-oregon';
import { californiaToSouthCarolinaContent } from '@/lib/resources/routes/california-to-south-carolina';
import { californiaToTennesseeContent } from '@/lib/resources/routes/california-to-tennessee';
import { californiaToTexasContent } from '@/lib/resources/routes/california-to-texas';
import { californiaToWashingtonContent } from '@/lib/resources/routes/california-to-washington';
import { californiaToWyomingContent } from '@/lib/resources/routes/california-to-wyoming';
import { illinoisToGeorgiaContent } from '@/lib/resources/routes/illinois-to-georgia';
import { illinoisToLouisianaContent } from '@/lib/resources/routes/illinois-to-louisiana';
import { illinoisToFloridaContent } from '@/lib/resources/routes/illinois-to-florida';
import { illinoisToTexasContent } from '@/lib/resources/routes/illinois-to-texas';
import { illinoisToNorthCarolinaContent } from '@/lib/resources/routes/illinois-to-north-carolina';
import { illinoisToSouthCarolinaContent } from '@/lib/resources/routes/illinois-to-south-carolina';
import { illinoisToArizonaContent } from '@/lib/resources/routes/illinois-to-arizona';
import { illinoisToTennesseeContent } from '@/lib/resources/routes/illinois-to-tennessee';
import { losAngelesToDallasFortWorthContent } from '@/lib/resources/routes/los-angeles-to-dallas-fort-worth';
import { massachusettsToFloridaContent } from '@/lib/resources/routes/massachusetts-to-florida';
import { massachusettsToGeorgiaContent } from '@/lib/resources/routes/massachusetts-to-georgia';
import { massachusettsToNorthCarolinaContent } from '@/lib/resources/routes/massachusetts-to-north-carolina';
import { massachusettsToSouthCarolinaContent } from '@/lib/resources/routes/massachusetts-to-south-carolina';
import { massachusettsToTennesseeContent } from '@/lib/resources/routes/massachusetts-to-tennessee';
import { massachusettsToTexasContent } from '@/lib/resources/routes/massachusetts-to-texas';
import { minnesotaToArizonaContent } from '@/lib/resources/routes/minnesota-to-arizona';
import { minnesotaToFloridaContent } from '@/lib/resources/routes/minnesota-to-florida';
import { minnesotaToGeorgiaContent } from '@/lib/resources/routes/minnesota-to-georgia';
import { minnesotaToNorthCarolinaContent } from '@/lib/resources/routes/minnesota-to-north-carolina';
import { minnesotaToSouthCarolinaContent } from '@/lib/resources/routes/minnesota-to-south-carolina';
import { minnesotaToTennesseeContent } from '@/lib/resources/routes/minnesota-to-tennessee';
import { minnesotaToTexasContent } from '@/lib/resources/routes/minnesota-to-texas';
import { newJerseyToFloridaContent } from '@/lib/resources/routes/new-jersey-to-florida';
import { newJerseyToGeorgiaContent } from '@/lib/resources/routes/new-jersey-to-georgia';
import { newJerseyToSouthCarolinaContent } from '@/lib/resources/routes/new-jersey-to-south-carolina';
import { newJerseyToTexasContent } from '@/lib/resources/routes/new-jersey-to-texas';
import { newYorkToTexasContent } from '@/lib/resources/routes/new-york-to-texas';
import { pennsylvaniaToFloridaContent } from '@/lib/resources/routes/pennsylvania-to-florida';
import { pennsylvaniaToNorthCarolinaContent } from '@/lib/resources/routes/pennsylvania-to-north-carolina';
import { pennsylvaniaToSouthCarolinaContent } from '@/lib/resources/routes/pennsylvania-to-south-carolina';
import { pennsylvaniaToTexasContent } from '@/lib/resources/routes/pennsylvania-to-texas';
import { sanDiegoToHoustonContent } from '@/lib/resources/routes/san-diego-to-houston';
import { sanFranciscoToAustinContent } from '@/lib/resources/routes/san-francisco-to-austin';

const extendedRouteGuides: Record<string, RouteGuideExtendedContent> = {
  'california-to-oregon': californiaToOregonContent,
  'california-to-washington': californiaToWashingtonContent,
  'california-to-idaho': californiaToIdahoContent,
  'california-to-wyoming': californiaToWyomingContent,
  'california-to-texas': californiaToTexasContent,
  'california-to-arizona': californiaToArizonaContent,
  'california-to-north-carolina': californiaToNorthCarolinaContent,
  'california-to-south-carolina': californiaToSouthCarolinaContent,
  'california-to-florida': californiaToFloridaContent,
  'california-to-tennessee': californiaToTennesseeContent,
  'illinois-to-georgia': illinoisToGeorgiaContent,
  'illinois-to-louisiana': illinoisToLouisianaContent,
  'illinois-to-florida': illinoisToFloridaContent,
  'illinois-to-texas': illinoisToTexasContent,
  'illinois-to-north-carolina': illinoisToNorthCarolinaContent,
  'illinois-to-south-carolina': illinoisToSouthCarolinaContent,
  'los-angeles-to-dallas-fort-worth': losAngelesToDallasFortWorthContent,
  'san-francisco-to-austin': sanFranciscoToAustinContent,
  'san-diego-to-houston': sanDiegoToHoustonContent,
  'new-jersey-to-south-carolina': newJerseyToSouthCarolinaContent,
  'new-jersey-to-florida': newJerseyToFloridaContent,
  'new-jersey-to-georgia': newJerseyToGeorgiaContent,
  'new-jersey-to-texas': newJerseyToTexasContent,
  'pennsylvania-to-south-carolina': pennsylvaniaToSouthCarolinaContent,
  'pennsylvania-to-north-carolina': pennsylvaniaToNorthCarolinaContent,
  'pennsylvania-to-florida': pennsylvaniaToFloridaContent,
  'pennsylvania-to-texas': pennsylvaniaToTexasContent,
  'massachusetts-to-south-carolina': massachusettsToSouthCarolinaContent,
  'massachusetts-to-north-carolina': massachusettsToNorthCarolinaContent,
  'massachusetts-to-georgia': massachusettsToGeorgiaContent,
  'massachusetts-to-tennessee': massachusettsToTennesseeContent,
  'massachusetts-to-florida': massachusettsToFloridaContent,
  'massachusetts-to-texas': massachusettsToTexasContent,
  'minnesota-to-texas': minnesotaToTexasContent,
  'minnesota-to-arizona': minnesotaToArizonaContent,
  'minnesota-to-tennessee': minnesotaToTennesseeContent,
  'minnesota-to-south-carolina': minnesotaToSouthCarolinaContent,
  'minnesota-to-north-carolina': minnesotaToNorthCarolinaContent,
  'minnesota-to-georgia': minnesotaToGeorgiaContent,
  'minnesota-to-florida': minnesotaToFloridaContent,
  'illinois-to-arizona': illinoisToArizonaContent,
  'illinois-to-tennessee': illinoisToTennesseeContent,
  'new-york-to-texas': newYorkToTexasContent,
};

export function getExtendedRouteGuide(slug: string): RouteGuideExtendedContent | undefined {
  return extendedRouteGuides[slug];
}

export function getExtendedRouteSlugs(): string[] {
  return Object.keys(extendedRouteGuides);
}