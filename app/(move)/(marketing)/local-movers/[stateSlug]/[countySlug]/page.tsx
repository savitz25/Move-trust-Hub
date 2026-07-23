import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CountyEditorialTrust,
  CALIFORNIA_COUNTY_CONTENT_UPDATED,
  FLORIDA_COUNTY_CONTENT_UPDATED,
  NEW_JERSEY_COUNTY_CONTENT_UPDATED,
  NEW_YORK_COUNTY_CONTENT_UPDATED,
  TEXAS_COUNTY_CONTENT_UPDATED,
  GEORGIA_COUNTY_CONTENT_UPDATED,
  SOUTH_CAROLINA_COUNTY_CONTENT_UPDATED,
  NORTH_CAROLINA_COUNTY_CONTENT_UPDATED,
  TENNESSEE_COUNTY_CONTENT_UPDATED,
  ALABAMA_COUNTY_CONTENT_UPDATED,
  MISSISSIPPI_COUNTY_CONTENT_UPDATED,
  LOUISIANA_PARISH_CONTENT_UPDATED,
  OKLAHOMA_COUNTY_CONTENT_UPDATED,
  ARKANSAS_COUNTY_CONTENT_UPDATED,
  KANSAS_COUNTY_CONTENT_UPDATED,
  MISSOURI_COUNTY_CONTENT_UPDATED,
  ILLINOIS_COUNTY_CONTENT_UPDATED,
  MICHIGAN_COUNTY_CONTENT_UPDATED,
  INDIANA_COUNTY_CONTENT_UPDATED,
  OHIO_COUNTY_CONTENT_UPDATED,
  KENTUCKY_COUNTY_CONTENT_UPDATED,
  WEST_VIRGINIA_COUNTY_CONTENT_UPDATED,
  VIRGINIA_COUNTY_CONTENT_UPDATED,
  DISTRICT_OF_COLUMBIA_COUNTY_CONTENT_UPDATED,
  DELAWARE_COUNTY_CONTENT_UPDATED,
  MARYLAND_COUNTY_CONTENT_UPDATED,
  PENNSYLVANIA_COUNTY_CONTENT_UPDATED,
  CONNECTICUT_COUNTY_CONTENT_UPDATED,
  MASSACHUSETTS_COUNTY_CONTENT_UPDATED,
  RHODE_ISLAND_COUNTY_CONTENT_UPDATED,
  VERMONT_COUNTY_CONTENT_UPDATED,
  NEW_HAMPSHIRE_COUNTY_CONTENT_UPDATED,
  MAINE_COUNTY_CONTENT_UPDATED,
  HAWAII_COUNTY_CONTENT_UPDATED,
  ALASKA_COUNTY_CONTENT_UPDATED,
  WASHINGTON_COUNTY_CONTENT_UPDATED,
  OREGON_COUNTY_CONTENT_UPDATED,
  NEVADA_COUNTY_CONTENT_UPDATED,
  ARIZONA_COUNTY_CONTENT_UPDATED,
  NEW_MEXICO_COUNTY_CONTENT_UPDATED,
  UTAH_COUNTY_CONTENT_UPDATED,
  COLORADO_COUNTY_CONTENT_UPDATED,
  IDAHO_COUNTY_CONTENT_UPDATED,
  MONTANA_COUNTY_CONTENT_UPDATED,
  WYOMING_COUNTY_CONTENT_UPDATED,
  NORTH_DAKOTA_COUNTY_CONTENT_UPDATED,
  SOUTH_DAKOTA_COUNTY_CONTENT_UPDATED,
  NEBRASKA_COUNTY_CONTENT_UPDATED,
  IOWA_COUNTY_CONTENT_UPDATED,
  MINNESOTA_COUNTY_CONTENT_UPDATED,
  WISCONSIN_COUNTY_CONTENT_UPDATED,
} from '@/components/local-movers/county-editorial-trust';
import { getAlabamaCountyResearch } from '@/data/alabama-county-research';
import { getMississippiCountyResearch } from '@/data/mississippi-county-research';
import { getLouisianaCountyResearch } from '@/data/louisiana-county-research';
import { getOklahomaCountyResearch } from '@/data/oklahoma-county-research';
import { getArkansasCountyResearch } from '@/data/arkansas-county-research';
import { getKansasCountyResearch } from '@/data/kansas-county-research';
import { getMissouriCountyResearch } from '@/data/missouri-county-research';
import { getIllinoisCountyResearch } from '@/data/illinois-county-research';
import { getMichiganCountyResearch } from '@/data/michigan-county-research';
import { getIndianaCountyResearch } from '@/data/indiana-county-research';
import { getOhioCountyResearch } from '@/data/ohio-county-research';
import { getKentuckyCountyResearch } from '@/data/kentucky-county-research';
import { getWestVirginiaCountyResearch } from '@/data/west-virginia-county-research';
import { getVirginiaCountyResearch } from '@/data/virginia-county-research';
import { getDistrictOfColumbiaCountyResearch } from '@/data/district-of-columbia-county-research';
import { getDelawareCountyResearch } from '@/data/delaware-county-research';
import { getMarylandCountyResearch } from '@/data/maryland-county-research';
import { getPennsylvaniaCountyResearch } from '@/data/pennsylvania-county-research';
import { getConnecticutCountyResearch } from '@/data/connecticut-county-research';
import { getMassachusettsCountyResearch } from '@/data/massachusetts-county-research';
import { getRhodeIslandCountyResearch } from '@/data/rhode-island-county-research';
import { getVermontCountyResearch } from '@/data/vermont-county-research';
import { getNewHampshireCountyResearch } from '@/data/new-hampshire-county-research';
import { getMaineCountyResearch } from '@/data/maine-county-research';
import { getHawaiiCountyResearch } from '@/data/hawaii-county-research';
import { getAlaskaCountyResearch } from '@/data/alaska-county-research';
import { getWashingtonCountyResearch } from '@/data/washington-county-research';
import { getOregonCountyResearch } from '@/data/oregon-county-research';
import { getNevadaCountyResearch } from '@/data/nevada-county-research';
import { getArizonaCountyResearch } from '@/data/arizona-county-research';
import { getNewMexicoCountyResearch } from '@/data/new-mexico-county-research';
import { getUtahCountyResearch } from '@/data/utah-county-research';
import { getColoradoCountyResearch } from '@/data/colorado-county-research';
import { getIdahoCountyResearch } from '@/data/idaho-county-research';
import { getMontanaCountyResearch } from '@/data/montana-county-research';
import { getWyomingCountyResearch } from '@/data/wyoming-county-research';
import { getNorthDakotaCountyResearch } from '@/data/north-dakota-county-research';
import { getSouthDakotaCountyResearch } from '@/data/south-dakota-county-research';
import { getNebraskaCountyResearch } from '@/data/nebraska-county-research';
import { getIowaCountyResearch } from '@/data/iowa-county-research';
import { getMinnesotaCountyResearch } from '@/data/minnesota-county-research';
import { getWisconsinCountyResearch } from '@/data/wisconsin-county-research';
import { getGeorgiaCountyResearch } from '@/data/georgia-county-research';
import { getSouthCarolinaCountyResearch } from '@/data/south-carolina-county-research';
import { getNorthCarolinaCountyResearch } from '@/data/north-carolina-county-research';
import { getTennesseeCountyResearch } from '@/data/tennessee-county-research';
import { CountyInternalLinks } from '@/components/local-movers/county-internal-links';
import { getCaliforniaNearbyCounties } from '@/lib/local-movers/california-nearby';
import { getFloridaNearbyCounties } from '@/lib/local-movers/florida-nearby';
import { getNewJerseyNearbyCounties } from '@/lib/local-movers/new-jersey-nearby';
import { getNewYorkNearbyCounties } from '@/lib/local-movers/new-york-nearby';
import { getGeorgiaNearbyCounties } from '@/lib/local-movers/georgia-nearby';
import { getSouthCarolinaNearbyCounties } from '@/lib/local-movers/south-carolina-nearby';
import { getNorthCarolinaNearbyCounties } from '@/lib/local-movers/north-carolina-nearby';
import { getTennesseeNearbyCounties } from '@/lib/local-movers/tennessee-nearby';
import { getAlabamaNearbyCounties } from '@/lib/local-movers/alabama-nearby';
import { getMississippiNearbyCounties } from '@/lib/local-movers/mississippi-nearby';
import { getLouisianaNearbyCounties } from '@/lib/local-movers/louisiana-nearby';
import { getOklahomaNearbyCounties } from '@/lib/local-movers/oklahoma-nearby';
import { getArkansasNearbyCounties } from '@/lib/local-movers/arkansas-nearby';
import { getKansasNearbyCounties } from '@/lib/local-movers/kansas-nearby';
import { getMissouriNearbyCounties } from '@/lib/local-movers/missouri-nearby';
import { getIllinoisNearbyCounties } from '@/lib/local-movers/illinois-nearby';
import { getMichiganNearbyCounties } from '@/lib/local-movers/michigan-nearby';
import { getIndianaNearbyCounties } from '@/lib/local-movers/indiana-nearby';
import { getOhioNearbyCounties } from '@/lib/local-movers/ohio-nearby';
import { getKentuckyNearbyCounties } from '@/lib/local-movers/kentucky-nearby';
import { getWestVirginiaNearbyCounties } from '@/lib/local-movers/west-virginia-nearby';
import { getVirginiaNearbyCounties } from '@/lib/local-movers/virginia-nearby';
import { getDistrictOfColumbiaNearbyCounties } from '@/lib/local-movers/district-of-columbia-nearby';
import { getDelawareNearbyCounties } from '@/lib/local-movers/delaware-nearby';
import { getMarylandNearbyCounties } from '@/lib/local-movers/maryland-nearby';
import { getPennsylvaniaNearbyCounties } from '@/lib/local-movers/pennsylvania-nearby';
import { getConnecticutNearbyCounties } from '@/lib/local-movers/connecticut-nearby';
import { getMassachusettsNearbyCounties } from '@/lib/local-movers/massachusetts-nearby';
import { getRhodeIslandNearbyCounties } from '@/lib/local-movers/rhode-island-nearby';
import { getVermontNearbyCounties } from '@/lib/local-movers/vermont-nearby';
import { getNewHampshireNearbyCounties } from '@/lib/local-movers/new-hampshire-nearby';
import { getMaineNearbyCounties } from '@/lib/local-movers/maine-nearby';
import { getHawaiiNearbyCounties } from '@/lib/local-movers/hawaii-nearby';
import { getAlaskaNearbyCounties } from '@/lib/local-movers/alaska-nearby';
import { getWashingtonNearbyCounties } from '@/lib/local-movers/washington-nearby';
import { getOregonNearbyCounties } from '@/lib/local-movers/oregon-nearby';
import { getNevadaNearbyCounties } from '@/lib/local-movers/nevada-nearby';
import { getArizonaNearbyCounties } from '@/lib/local-movers/arizona-nearby';
import { getNewMexicoNearbyCounties } from '@/lib/local-movers/new-mexico-nearby';
import { getUtahNearbyCounties } from '@/lib/local-movers/utah-nearby';
import { getColoradoNearbyCounties } from '@/lib/local-movers/colorado-nearby';
import { getIdahoNearbyCounties } from '@/lib/local-movers/idaho-nearby';
import { getMontanaNearbyCounties } from '@/lib/local-movers/montana-nearby';
import { getWyomingNearbyCounties } from '@/lib/local-movers/wyoming-nearby';
import { getNorthDakotaNearbyCounties } from '@/lib/local-movers/north-dakota-nearby';
import { getSouthDakotaNearbyCounties } from '@/lib/local-movers/south-dakota-nearby';
import { getNebraskaNearbyCounties } from '@/lib/local-movers/nebraska-nearby';
import { getIowaNearbyCounties } from '@/lib/local-movers/iowa-nearby';
import { getMinnesotaNearbyCounties } from '@/lib/local-movers/minnesota-nearby';
import { getWisconsinNearbyCounties } from '@/lib/local-movers/wisconsin-nearby';
import { getTexasNearbyCounties } from '@/lib/local-movers/texas-nearby';
import {
  CountyCostSection,
  CountyFaqSection,
  CountyTestimonialSection,
  CountyTipsSection,
} from '@/components/local-movers/county-seo-sections';
import { CountyMarketInsightsPanel } from '@/components/local-movers/county-market-insights';
import { CountyCompactStats } from '@/components/local-movers/county-compact-stats';
import { CountyMovingSnapshotCard } from '@/components/local-movers/county-moving-snapshot';
import { buildCountyMovingSnapshot } from '@/lib/local-movers/county-moving-snapshot';
import { CountyJumpToMovers } from '@/components/local-movers/county-jump-to-movers';
import { CountyGuideAccordion } from '@/components/local-movers/county-guide-accordion';
import { TrustToolsBar } from '@/components/seo/trust-tools-bar';
import { EditorialTeamPanel } from '@/components/trust/editorial-team-panel';
import { HowWeScorePanel } from '@/components/trust/how-we-score-panel';
import { VerificationTransparency } from '@/components/trust/verification-transparency';
import { buildCountyMarketInsights } from '@/lib/local-movers/county-market-insights';
import {
  getInboundRouteLinksForState,
  getOutboundRouteLinksForState,
} from '@/lib/local-movers/state-route-links';
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { SegmentedCountyMoverLists } from '@/components/local-movers/progressive-county-mover-list';
import { CountyIntentPaths } from '@/components/local-movers/county-intent-paths';
import { CountyPopularRoutesSection } from '@/components/local-movers/county-popular-routes';
import { NjRegulatoryClarity } from '@/components/local-movers/nj-regulatory-clarity';
import { CaRegulatoryClarity } from '@/components/local-movers/ca-regulatory-clarity';
import { FlRegulatoryClarity } from '@/components/local-movers/fl-regulatory-clarity';
import { TxRegulatoryClarity } from '@/components/local-movers/tx-regulatory-clarity';
import { GaRegulatoryClarity } from '@/components/local-movers/ga-regulatory-clarity';
import { getCountyPopularRoutes } from '@/lib/local-movers/county-popular-routes';
import { segmentCountyMovers } from '@/lib/local-movers/segment-county-movers';
import { buildCountyReviewBlock } from '@/lib/trust/verified-reviews';
import { LocalMoversCta } from '@/components/local-movers/local-movers-cta';
import { DirectorySearchEmbed } from '@/components/directory/directory-search-embed';
import { CountyPageHeroCta } from '@/components/local-movers/county-page-hero-cta';
import { LocalMoversSchema } from '@/components/local-movers/local-movers-schema';
import {
  DollarSign,
  HelpCircle,
  Lightbulb,
  MessageSquareQuote,
  TrendingUp,
} from 'lucide-react';

import { shouldUseCuratedTestimonials } from '@/lib/local-movers/county-indexability';
import { resolveCountyPageSeo } from '@/lib/local-movers/county-page-seo';
import {
  buildCountyHeroIntro,
  buildMoversSectionHeading,
} from '@/lib/local-movers/county-display-copy';
import { getCountyIntelligencePack } from '@/lib/local-movers/county-intelligence/registry';
import { CountyIntelligenceHub } from '@/components/local-movers/county-intelligence-hub';
import { CountyZoneMoverFilter } from '@/components/local-movers/county-zone-mover-filter';
import { ssgParams } from '@/lib/ssg/ssg-params';
import {
  buildCountyCostGuide,
  buildCountyFaqItems,
  buildCountyH1,
  buildCountyMarketNotes,
  buildCountyTips,
  buildCountyLabel,
  getAllCountyParams,
  getStatePath,
} from '@/lib/local-movers/index';

type Props = { params: Promise<{ stateSlug: string; countySlug: string }> };

export const dynamic = 'force-static';
export const dynamicParams = true;
/**
 * ISR: refresh county lists/counts periodically so newly approved local movers
 * appear even if a publish-time revalidate was missed.
 */
export const revalidate = 60;

export async function generateStaticParams() {
  return ssgParams(getAllCountyParams().map(({ stateSlug, countySlug }) => ({
    stateSlug,
    countySlug,
  })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stateSlug, countySlug } = await params;
  const seo = await resolveCountyPageSeo(stateSlug, countySlug);
  return seo?.metadata ?? {};
}

export default async function LocalMoversCountyPage({ params }: Props) {
  const { stateSlug, countySlug } = await params;
  const seo = await resolveCountyPageSeo(stateSlug, countySlug);
  if (!seo) notFound();

  const {
    state,
    county,
    movers,
    isRegionalFallback,
    title,
    description,
    path,
    indexDecision,
  } = seo;
  const countyLabel = buildCountyLabel(county);
  const intelligence = getCountyIntelligencePack(stateSlug, countySlug);
  const faqItems = buildCountyFaqItems(county, state.name, movers);
  const costs = buildCountyCostGuide(county, state.name);
  const tips = buildCountyTips(county, state.name);
  const segments = segmentCountyMovers(movers, county);
  const reviewBlock = buildCountyReviewBlock(movers, 3, {
    preferLocalMovers: segments.localInState,
    countyLabel,
  });
  // Suppress review quotes unless at least one local/in-state source contributed
  // (avoids out-of-area reviews under county-local social proof).
  const visibleTestimonials =
    shouldUseCuratedTestimonials(movers) &&
    reviewBlock.hasLocalSource &&
    reviewBlock.reviews.length > 0
      ? reviewBlock.reviews
      : [];
  const marketNotes = buildCountyMarketNotes(county);
  const marketInsights = buildCountyMarketInsights(stateSlug, countySlug, county, movers);
  const outboundRoutes = getOutboundRouteLinksForState(county.stateCode);
  const inboundRoutes = getInboundRouteLinksForState(county.stateCode);
  const popularRoutes = getCountyPopularRoutes(stateSlug, countySlug);
  const movingSnapshot = buildCountyMovingSnapshot(intelligence, popularRoutes, countyLabel);
  const usdotCount = movers.filter((m) => Boolean(m.usdotNumber?.trim())).length;
  const nearbyCounties =
    stateSlug === 'california'
      ? getCaliforniaNearbyCounties(countySlug)
      : stateSlug === 'florida'
        ? getFloridaNearbyCounties(countySlug)
        : stateSlug === 'new-jersey'
          ? getNewJerseyNearbyCounties(countySlug)
          : stateSlug === 'new-york'
            ? getNewYorkNearbyCounties(countySlug)
            : stateSlug === 'texas'
              ? getTexasNearbyCounties(countySlug)
              : stateSlug === 'georgia' && getGeorgiaCountyResearch(countySlug)
                ? getGeorgiaNearbyCounties(countySlug)
                : stateSlug === 'south-carolina' &&
                    getSouthCarolinaCountyResearch(countySlug)
                  ? getSouthCarolinaNearbyCounties(countySlug)
                  : stateSlug === 'north-carolina' &&
                      getNorthCarolinaCountyResearch(countySlug)
                    ? getNorthCarolinaNearbyCounties(countySlug)
                    : stateSlug === 'tennessee' &&
                        getTennesseeCountyResearch(countySlug)
                      ? getTennesseeNearbyCounties(countySlug)
                      : stateSlug === 'alabama' &&
                          getAlabamaCountyResearch(countySlug)
                        ? getAlabamaNearbyCounties(countySlug)
                        : stateSlug === 'mississippi' &&
                            getMississippiCountyResearch(countySlug)
                          ? getMississippiNearbyCounties(countySlug)
                          : stateSlug === 'louisiana' &&
                              getLouisianaCountyResearch(countySlug)
                            ? getLouisianaNearbyCounties(countySlug)
                            : stateSlug === 'oklahoma' &&
                                getOklahomaCountyResearch(countySlug)
                              ? getOklahomaNearbyCounties(countySlug)
                              : stateSlug === 'arkansas' &&
                                  getArkansasCountyResearch(countySlug)
                                ? getArkansasNearbyCounties(countySlug)
                                : stateSlug === 'kansas' &&
                                    getKansasCountyResearch(countySlug)
                                  ? getKansasNearbyCounties(countySlug)
                                  : stateSlug === 'missouri' &&
                                      getMissouriCountyResearch(countySlug)
                                    ? getMissouriNearbyCounties(countySlug)
                                    : stateSlug === 'illinois' &&
                                        getIllinoisCountyResearch(countySlug)
                                      ? getIllinoisNearbyCounties(countySlug)
                                      : stateSlug === 'michigan' &&
                                          getMichiganCountyResearch(countySlug)
                                        ? getMichiganNearbyCounties(countySlug)
                                        : stateSlug === 'indiana' &&
                                            getIndianaCountyResearch(countySlug)
                                          ? getIndianaNearbyCounties(countySlug)
                                          : stateSlug === 'ohio' &&
                                              getOhioCountyResearch(countySlug)
                                            ? getOhioNearbyCounties(countySlug)
                                            : stateSlug === 'kentucky' &&
                                                getKentuckyCountyResearch(countySlug)
                                              ? getKentuckyNearbyCounties(countySlug)
                                              : stateSlug === 'west-virginia' &&
                                                  getWestVirginiaCountyResearch(countySlug)
                                                ? getWestVirginiaNearbyCounties(countySlug)
                                                : stateSlug === 'virginia' &&
                                                    getVirginiaCountyResearch(countySlug)
                                                  ? getVirginiaNearbyCounties(countySlug)
                                                  : stateSlug === 'district-of-columbia' &&
                                                      getDistrictOfColumbiaCountyResearch(countySlug)
                                                    ? getDistrictOfColumbiaNearbyCounties(countySlug)
                                                    : stateSlug === 'delaware' &&
                                                        getDelawareCountyResearch(countySlug)
                                                      ? getDelawareNearbyCounties(countySlug)
                                                      : stateSlug === 'maryland' &&
                                                          getMarylandCountyResearch(countySlug)
                                                        ? getMarylandNearbyCounties(countySlug)
                                                        : stateSlug === 'pennsylvania' &&
                                                            getPennsylvaniaCountyResearch(countySlug)
                                                          ? getPennsylvaniaNearbyCounties(countySlug)
                                                          : stateSlug === 'connecticut' &&
                                                              getConnecticutCountyResearch(countySlug)
                                                            ? getConnecticutNearbyCounties(countySlug)
                                                            : stateSlug === 'massachusetts' &&
                                                                getMassachusettsCountyResearch(countySlug)
                                                              ? getMassachusettsNearbyCounties(countySlug)
                                                              : stateSlug === 'rhode-island' &&
                                                                  getRhodeIslandCountyResearch(countySlug)
                                                                ? getRhodeIslandNearbyCounties(countySlug)
                                                                : stateSlug === 'vermont' &&
                                                                    getVermontCountyResearch(countySlug)
                                                                  ? getVermontNearbyCounties(countySlug)
                                                                  : stateSlug === 'new-hampshire' &&
                                                                      getNewHampshireCountyResearch(countySlug)
                                                                    ? getNewHampshireNearbyCounties(countySlug)
                                                                    : stateSlug === 'maine' &&
                                                                        getMaineCountyResearch(countySlug)
                                                                      ? getMaineNearbyCounties(countySlug)
                                                                      : stateSlug === 'hawaii' &&
                                                                          getHawaiiCountyResearch(countySlug)
                                                                        ? getHawaiiNearbyCounties(countySlug)
                                                                        : stateSlug === 'alaska' &&
                                                                            getAlaskaCountyResearch(countySlug)
                                                                          ? getAlaskaNearbyCounties(countySlug)
                                                                          : stateSlug === 'washington' &&
                                                                              getWashingtonCountyResearch(countySlug)
                                                                            ? getWashingtonNearbyCounties(countySlug)
                                                                            : stateSlug === 'oregon' &&
                                                                                getOregonCountyResearch(countySlug)
                                                                              ? getOregonNearbyCounties(countySlug)
                                                                              : stateSlug === 'nevada' &&
                                                                                  getNevadaCountyResearch(countySlug)
                                                                                ? getNevadaNearbyCounties(countySlug)
                                                                                : stateSlug === 'arizona' &&
                                                                                    getArizonaCountyResearch(countySlug)
                                                                                  ? getArizonaNearbyCounties(countySlug)
                                                                                  : stateSlug === 'new-mexico' &&
                                                                                      getNewMexicoCountyResearch(countySlug)
                                                                                    ? getNewMexicoNearbyCounties(countySlug)
                                                                                    : stateSlug === 'utah' &&
                                                                                        getUtahCountyResearch(countySlug)
                                                                                      ? getUtahNearbyCounties(countySlug)
                                                                                      : stateSlug === 'colorado' &&
                                                                                          getColoradoCountyResearch(countySlug)
                                                                                        ? getColoradoNearbyCounties(countySlug)
                                                                                        : stateSlug === 'idaho' &&
                                                                                            getIdahoCountyResearch(countySlug)
                                                                                          ? getIdahoNearbyCounties(countySlug)
                                                                                          : stateSlug === 'montana' &&
                                                                                              getMontanaCountyResearch(countySlug)
                                                                                            ? getMontanaNearbyCounties(countySlug)
                                                                                            : stateSlug === 'wyoming' &&
                                                                                                getWyomingCountyResearch(countySlug)
                                                                                              ? getWyomingNearbyCounties(countySlug)
                                                                                              : stateSlug === 'north-dakota' &&
                                                                                                  getNorthDakotaCountyResearch(countySlug)
                                                                                                ? getNorthDakotaNearbyCounties(countySlug)
                                                                                                : stateSlug === 'south-dakota' &&
                                                                                                    getSouthDakotaCountyResearch(countySlug)
                                                                                                  ? getSouthDakotaNearbyCounties(countySlug)
                                                                                                  : stateSlug === 'nebraska' &&
                                                                                                      getNebraskaCountyResearch(countySlug)
                                                                                                    ? getNebraskaNearbyCounties(countySlug)
                                                                                                    : stateSlug === 'iowa' &&
                                                                                                        getIowaCountyResearch(countySlug)
                                                                                                      ? getIowaNearbyCounties(countySlug)
                                                                                                      : stateSlug === 'minnesota' &&
                                                                                                          getMinnesotaCountyResearch(countySlug)
                                                                                                        ? getMinnesotaNearbyCounties(countySlug)
                                                                                                        : stateSlug === 'wisconsin' &&
                                                                                                            getWisconsinCountyResearch(countySlug)
                                                                                                          ? getWisconsinNearbyCounties(countySlug)
                                                                                                          : [];

  return (
    <>
      <LocalMoversSchema
        title={title}
        description={description}
        path={path}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Local Movers', path: '/local-movers' },
          { name: state.name, path: getStatePath(state.slug) },
          { name: countyLabel, path },
        ]}
        movers={movers}
        county={county}
        stateName={state.name}
        faqItems={faqItems}
        testimonials={visibleTestimonials}
      />

      <main className="container mx-auto px-4 py-10 max-w-3xl pb-24 sm:pb-10">
        <LocalMoversBreadcrumbs
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Local Movers', href: '/local-movers' },
            { label: state.name, href: getStatePath(state.slug) },
            { label: countyLabel },
          ]}
        />

        <header className="mb-8">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
            {intelligence?.eyebrow ?? `${state.name} · ${county.stateCode}`}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            {intelligence?.h1 ?? buildCountyH1(county)}
          </h1>
          {county.seat && !intelligence ? (
            <p className="text-muted-foreground mb-3">
              {stateSlug === 'louisiana' ? 'Parish seat' : 'County seat'}:{' '}
              {county.seat}
            </p>
          ) : null}
          <p className="text-muted-foreground leading-relaxed">
            {buildCountyHeroIntro(
              countyLabel,
              movers.length,
              isRegionalFallback,
              intelligence?.heroOpener
            )}{' '}
            {movers.length > 0 && !intelligence ? (
              <>
                Full profiles are in our{' '}
                <Link href="/companies" className="text-primary font-medium hover:underline">
                  interstate directory
                </Link>
                .
              </>
            ) : null}
          </p>
          {intelligence?.heroCredibility ? (
            <p className="mt-3 text-xs font-medium text-foreground/80 rounded-lg border bg-primary/5 px-3 py-2">
              {intelligence.heroCredibility}
            </p>
          ) : null}
          {marketNotes && !intelligence ? (
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed rounded-xl border bg-muted/20 px-4 py-3">
              {marketNotes}
            </p>
          ) : null}
          {isRegionalFallback && (
            <p className="mt-3 text-xs text-muted-foreground rounded-lg border bg-muted/30 px-3 py-2">
              Movers listed serve the greater {county.metro?.replace(/-/g, ' ')} region
              including {countyLabel}. Listings are regional providers verified for FMCSA
              licensing — not necessarily headquartered in this county. For broader metro
              coverage, browse{' '}
              <Link href={getStatePath(state.slug)} className="text-primary hover:underline">
                all {state.name} county guides
              </Link>{' '}
              or our{' '}
              <Link href="/moving-to" className="text-primary hover:underline">
                destination city hubs
              </Link>
              .
            </p>
          )}
          {indexDecision.tier === 'noindex' && (
            <p className="mt-3 text-xs text-muted-foreground rounded-lg border border-amber-200/80 bg-amber-50/50 px-3 py-2">
              This is a limited-coverage county guide. For broader options, browse{' '}
              <Link href={getStatePath(state.slug)} className="text-primary hover:underline">
                all {state.name} county guides
              </Link>{' '}
              or our{' '}
              <Link href="/companies" className="text-primary hover:underline">
                interstate mover directory
              </Link>
              .
            </p>
          )}
          {movers.length > 0 ? (
            <CountyCompactStats
              countyLabel={countyLabel}
              moverCount={movers.length}
              usdotCount={usdotCount}
              localCount={segments.localInState.length}
              nationalCount={segments.national.length}
              className="mt-5"
            />
          ) : null}

          {movingSnapshot ? (
            <CountyMovingSnapshotCard countyLabel={countyLabel} snapshot={movingSnapshot} />
          ) : null}

          {/* Primary intent: jump to listings (sticky until #movers is reached) */}
          <div className="mt-6">
            <CountyJumpToMovers
              countyLabel={countyLabel}
              moverCount={movers.length}
              targetId="movers"
            />
          </div>
          <CountyIntentPaths
            countyLabel={countyLabel}
            stateHubHref={getStatePath(state.slug)}
          />
        </header>

        {/*
          Mover list is the first major content block after the hero + jump CTA.
          Hyper-local intelligence packs (e.g. LA) and generic educational sections
          live below in collapsible county guide panels — content preserved, not deleted.
        */}
        <section
          className="mb-10 scroll-mt-28"
          id="movers"
          aria-labelledby="movers-heading"
        >
          <h2 id="movers-heading" className="text-2xl font-semibold tracking-tight mb-4">
            {buildMoversSectionHeading(countyLabel, movers.length)}
          </h2>
          {movers.length > 0 ? (
            intelligence ? (
              <CountyZoneMoverFilter
                movers={movers}
                zones={intelligence.zones}
                countyLabel={countyLabel}
                stateCode={county.stateCode}
                stateName={state.name}
                county={county}
                profileReturnPath={path}
                directoryHint={intelligence.directoryHint}
              />
            ) : (
              <SegmentedCountyMoverLists
                localInState={segments.localInState}
                national={segments.national}
                countyLabel={countyLabel}
                stateCode={county.stateCode}
                stateName={state.name}
                profileReturnPath={path}
              />
            )
          ) : (
            <div className="rounded-2xl border bg-muted/30 p-6 text-sm text-muted-foreground">
              Mover listings for this county are being added. Browse{' '}
              <Link href="/companies" className="text-primary hover:underline">
                licensed interstate movers
              </Link>{' '}
              or use the{' '}
              <Link href="/moving-calculator" className="text-primary hover:underline">
                moving calculator
              </Link>{' '}
              in the meantime.
            </div>
          )}
        </section>

        <div className="mb-8">
          <CountyPageHeroCta
            countyLabel={countyLabel}
            stateName={state.name}
            stateSlug={state.slug}
          />
          <TrustToolsBar className="mt-4" />
        </div>

        <div className="mb-10">
          <DirectorySearchEmbed
            sourcePage={path}
            scope={{
              stateCode: county.stateCode,
              stateName: state.name,
              countyLabel,
              preferredMoverIds: movers.map((m) => m.id),
            }}
            heading="Search the full mover directory"
            description={`Find any licensed mover nationwide — same search as /companies. Prefer listings serving ${countyLabel}.`}
          />
        </div>

        <CountyGuideAccordion
          countyLabel={countyLabel}
          sections={[
            ...(intelligence
              ? [
                  {
                    id: 'county-intelligence',
                    title: `${countyLabel} local moving intelligence`,
                    summary:
                      'Zones, parking/HOA rules, seasonal notes, costs, and hyper-local guidance for this market.',
                    icon: <TrendingUp className="h-4 w-4" aria-hidden="true" />,
                    children: <CountyIntelligenceHub pack={intelligence} />,
                  },
                ]
              : []),
            // When an intelligence pack exists it already covers zones, costs, seasonal,
            // and relocation — skip market-insights to avoid duplicate major sections.
            ...(!intelligence && indexDecision.tier === 'index' && movers.length > 0
              ? [
                  {
                    id: 'market-insights',
                    title: `${countyLabel} market insights & local rules`,
                    summary:
                      'Service mix, cost snapshot, migration trends, parking notes, and popular routes.',
                    icon: <TrendingUp className="h-4 w-4" aria-hidden="true" />,
                    children: (
                      <CountyMarketInsightsPanel
                        countyLabel={countyLabel}
                        stateName={state.name}
                        stateCode={county.stateCode}
                        insights={marketInsights}
                        outboundRoutes={outboundRoutes}
                        inboundRoutes={inboundRoutes}
                        localCount={segments.localInState.length}
                        nationalCount={segments.national.length}
                        embedded
                      />
                    ),
                  },
                ]
              : []),
            // Generic cost/tips only when no intelligence pack (packs include richer sections)
            ...(!intelligence
              ? [
                  {
                    id: 'costs',
                    title: `Average local moving costs in ${countyLabel}`,
                    summary: `${costs.studioRange} studio · ${costs.familyRange} family home · ${costs.avgHourly}`,
                    icon: <DollarSign className="h-4 w-4" aria-hidden="true" />,
                    children: (
                      <CountyCostSection
                        countyLabel={countyLabel}
                        stateName={state.name}
                        costs={costs}
                        embedded
                      />
                    ),
                  },
                  {
                    id: 'tips',
                    title: `Tips for moving in ${countyLabel}`,
                    summary: `${tips.length} practical local tips for a smoother move day.`,
                    icon: <Lightbulb className="h-4 w-4" aria-hidden="true" />,
                    children: (
                      <CountyTipsSection countyLabel={countyLabel} tips={tips} embedded />
                    ),
                  },
                ]
              : []),
            ...(visibleTestimonials.length > 0
              ? [
                  {
                    id: 'reviews',
                    title: reviewBlock.title,
                    summary: reviewBlock.summary,
                    icon: <MessageSquareQuote className="h-4 w-4" aria-hidden="true" />,
                    children: (
                      <CountyTestimonialSection
                        testimonials={visibleTestimonials}
                        countyLabel={countyLabel}
                        embedded
                      />
                    ),
                  },
                ]
              : []),
            {
              id: 'faq',
              title: `FAQ: Local movers in ${countyLabel}`,
              summary: `${faqItems.length} answers about costs, licensing, and hiring locally.`,
              icon: <HelpCircle className="h-4 w-4" aria-hidden="true" />,
              children: (
                <CountyFaqSection
                  countyLabel={countyLabel}
                  faqItems={faqItems}
                  embedded
                />
              ),
            },
          ]}
        />

        {stateSlug === 'new-jersey' ? (
          <NjRegulatoryClarity countyLabel={countyLabel} />
        ) : null}
        {stateSlug === 'california' ? (
          <CaRegulatoryClarity countyLabel={countyLabel} />
        ) : null}
        {stateSlug === 'florida' ? (
          <FlRegulatoryClarity countyLabel={countyLabel} />
        ) : null}
        {stateSlug === 'texas' ? (
          <TxRegulatoryClarity countyLabel={countyLabel} />
        ) : null}
        {stateSlug === 'georgia' ? (
          <GaRegulatoryClarity countyLabel={countyLabel} />
        ) : null}

        {popularRoutes.length > 0 ? (
          <CountyPopularRoutesSection countyLabel={countyLabel} routes={popularRoutes} />
        ) : null}

        <HowWeScorePanel className="mb-10" compact={indexDecision.tier === 'noindex'} />

        <VerificationTransparency className="mb-10" />

        {indexDecision.tier === 'index' ? (
          <EditorialTeamPanel contentType="county" className="mb-10" compact />
        ) : null}

        <CountyInternalLinks
          stateName={state.name}
          stateSlug={state.slug}
          countySlug={county.slug}
          countyLabel={countyLabel}
          nearbyCounties={nearbyCounties}
        />

        <CountyEditorialTrust
          countyLabel={countyLabel}
          stateName={state.name}
          lastUpdated={
            stateSlug === 'california'
              ? CALIFORNIA_COUNTY_CONTENT_UPDATED
              : stateSlug === 'new-jersey'
                ? NEW_JERSEY_COUNTY_CONTENT_UPDATED
                : stateSlug === 'new-york'
                  ? NEW_YORK_COUNTY_CONTENT_UPDATED
                  : stateSlug === 'florida'
                    ? FLORIDA_COUNTY_CONTENT_UPDATED
                    : stateSlug === 'texas'
                      ? TEXAS_COUNTY_CONTENT_UPDATED
                      : stateSlug === 'georgia' && getGeorgiaCountyResearch(countySlug)
                        ? GEORGIA_COUNTY_CONTENT_UPDATED
                        : stateSlug === 'south-carolina' &&
                            getSouthCarolinaCountyResearch(countySlug)
                          ? SOUTH_CAROLINA_COUNTY_CONTENT_UPDATED
                          : stateSlug === 'north-carolina' &&
                              getNorthCarolinaCountyResearch(countySlug)
                            ? NORTH_CAROLINA_COUNTY_CONTENT_UPDATED
                            : stateSlug === 'tennessee' &&
                                getTennesseeCountyResearch(countySlug)
                              ? TENNESSEE_COUNTY_CONTENT_UPDATED
                              : stateSlug === 'alabama' &&
                                  getAlabamaCountyResearch(countySlug)
                                ? ALABAMA_COUNTY_CONTENT_UPDATED
                                : stateSlug === 'mississippi' &&
                                    getMississippiCountyResearch(countySlug)
                                  ? MISSISSIPPI_COUNTY_CONTENT_UPDATED
                                  : stateSlug === 'louisiana' &&
                                      getLouisianaCountyResearch(countySlug)
                                    ? LOUISIANA_PARISH_CONTENT_UPDATED
                                    : stateSlug === 'oklahoma' &&
                                        getOklahomaCountyResearch(countySlug)
                                      ? OKLAHOMA_COUNTY_CONTENT_UPDATED
                                      : stateSlug === 'arkansas' &&
                                          getArkansasCountyResearch(countySlug)
                                        ? ARKANSAS_COUNTY_CONTENT_UPDATED
                                        : stateSlug === 'kansas' &&
                                            getKansasCountyResearch(countySlug)
                                          ? KANSAS_COUNTY_CONTENT_UPDATED
                                          : stateSlug === 'missouri' &&
                                              getMissouriCountyResearch(countySlug)
                                            ? MISSOURI_COUNTY_CONTENT_UPDATED
                                            : stateSlug === 'illinois' &&
                                                getIllinoisCountyResearch(countySlug)
                                              ? ILLINOIS_COUNTY_CONTENT_UPDATED
                                              : stateSlug === 'michigan' &&
                                                  getMichiganCountyResearch(countySlug)
                                                ? MICHIGAN_COUNTY_CONTENT_UPDATED
                                                : stateSlug === 'indiana' &&
                                                    getIndianaCountyResearch(countySlug)
                                                  ? INDIANA_COUNTY_CONTENT_UPDATED
                                                  : stateSlug === 'ohio' &&
                                                      getOhioCountyResearch(countySlug)
                                                    ? OHIO_COUNTY_CONTENT_UPDATED
                                                    : stateSlug === 'kentucky' &&
                                                        getKentuckyCountyResearch(countySlug)
                                                      ? KENTUCKY_COUNTY_CONTENT_UPDATED
                                                      : stateSlug === 'west-virginia' &&
                                                          getWestVirginiaCountyResearch(countySlug)
                                                        ? WEST_VIRGINIA_COUNTY_CONTENT_UPDATED
                                                        : stateSlug === 'virginia' &&
                                                            getVirginiaCountyResearch(countySlug)
                                                          ? VIRGINIA_COUNTY_CONTENT_UPDATED
                                                          : stateSlug === 'district-of-columbia' &&
                                                              getDistrictOfColumbiaCountyResearch(countySlug)
                                                            ? DISTRICT_OF_COLUMBIA_COUNTY_CONTENT_UPDATED
                                                            : stateSlug === 'delaware' &&
                                                                getDelawareCountyResearch(countySlug)
                                                              ? DELAWARE_COUNTY_CONTENT_UPDATED
                                                              : stateSlug === 'maryland' &&
                                                                  getMarylandCountyResearch(countySlug)
                                                                ? MARYLAND_COUNTY_CONTENT_UPDATED
                                                                : stateSlug === 'pennsylvania' &&
                                                                    getPennsylvaniaCountyResearch(countySlug)
                                                                  ? PENNSYLVANIA_COUNTY_CONTENT_UPDATED
                                                                  : stateSlug === 'connecticut' &&
                                                                      getConnecticutCountyResearch(countySlug)
                                                                    ? CONNECTICUT_COUNTY_CONTENT_UPDATED
                                                                    : stateSlug === 'massachusetts' &&
                                                                        getMassachusettsCountyResearch(countySlug)
                                                                      ? MASSACHUSETTS_COUNTY_CONTENT_UPDATED
                                                                      : stateSlug === 'rhode-island' &&
                                                                          getRhodeIslandCountyResearch(countySlug)
                                                                        ? RHODE_ISLAND_COUNTY_CONTENT_UPDATED
                                                                        : stateSlug === 'vermont' &&
                                                                            getVermontCountyResearch(countySlug)
                                                                          ? VERMONT_COUNTY_CONTENT_UPDATED
                                                                          : stateSlug === 'new-hampshire' &&
                                                                              getNewHampshireCountyResearch(countySlug)
                                                                            ? NEW_HAMPSHIRE_COUNTY_CONTENT_UPDATED
                                                                            : stateSlug === 'maine' &&
                                                                                getMaineCountyResearch(countySlug)
                                                                              ? MAINE_COUNTY_CONTENT_UPDATED
                                                                              : stateSlug === 'hawaii' &&
                                                                                  getHawaiiCountyResearch(countySlug)
                                                                                ? HAWAII_COUNTY_CONTENT_UPDATED
                                                                                : stateSlug === 'alaska' &&
                                                                                    getAlaskaCountyResearch(countySlug)
                                                                                  ? ALASKA_COUNTY_CONTENT_UPDATED
                                                                                  : stateSlug === 'washington' &&
                                                                                      getWashingtonCountyResearch(countySlug)
                                                                                    ? WASHINGTON_COUNTY_CONTENT_UPDATED
                                                                                    : stateSlug === 'oregon' &&
                                                                                        getOregonCountyResearch(countySlug)
                                                                                      ? OREGON_COUNTY_CONTENT_UPDATED
                                                                                      : stateSlug === 'nevada' &&
                                                                                          getNevadaCountyResearch(countySlug)
                                                                                        ? NEVADA_COUNTY_CONTENT_UPDATED
                                                                                        : stateSlug === 'arizona' &&
                                                                                            getArizonaCountyResearch(countySlug)
                                                                                          ? ARIZONA_COUNTY_CONTENT_UPDATED
                                                                                          : stateSlug === 'new-mexico' &&
                                                                                              getNewMexicoCountyResearch(countySlug)
                                                                                            ? NEW_MEXICO_COUNTY_CONTENT_UPDATED
                                                                                            : stateSlug === 'utah' &&
                                                                                                getUtahCountyResearch(countySlug)
                                                                                              ? UTAH_COUNTY_CONTENT_UPDATED
                                                                                              : stateSlug === 'colorado' &&
                                                                                                  getColoradoCountyResearch(countySlug)
                                                                                                ? COLORADO_COUNTY_CONTENT_UPDATED
                                                                                                : stateSlug === 'idaho' &&
                                                                                                    getIdahoCountyResearch(countySlug)
                                                                                                  ? IDAHO_COUNTY_CONTENT_UPDATED
                                                                                                  : stateSlug === 'montana' &&
                                                                                                      getMontanaCountyResearch(countySlug)
                                                                                                    ? MONTANA_COUNTY_CONTENT_UPDATED
                                                                                                    : stateSlug === 'wyoming' &&
                                                                                                        getWyomingCountyResearch(countySlug)
                                                                                                      ? WYOMING_COUNTY_CONTENT_UPDATED
                                                                                                      : stateSlug === 'north-dakota' &&
                                                                                                          getNorthDakotaCountyResearch(countySlug)
                                                                                                        ? NORTH_DAKOTA_COUNTY_CONTENT_UPDATED
                                                                                                        : stateSlug === 'south-dakota' &&
                                                                                                            getSouthDakotaCountyResearch(countySlug)
                                                                                                          ? SOUTH_DAKOTA_COUNTY_CONTENT_UPDATED
                                                                                                          : stateSlug === 'nebraska' &&
                                                                                                              getNebraskaCountyResearch(countySlug)
                                                                                                            ? NEBRASKA_COUNTY_CONTENT_UPDATED
                                                                                                            : stateSlug === 'iowa' &&
                                                                                                                getIowaCountyResearch(countySlug)
                                                                                                              ? IOWA_COUNTY_CONTENT_UPDATED
                                                                                                              : stateSlug === 'minnesota' &&
                                                                                                                  getMinnesotaCountyResearch(countySlug)
                                                                                                                ? MINNESOTA_COUNTY_CONTENT_UPDATED
                                                                                                                : stateSlug === 'wisconsin' &&
                                                                                                                    getWisconsinCountyResearch(countySlug)
                                                                                                                  ? WISCONSIN_COUNTY_CONTENT_UPDATED
                                                                                                                  : undefined
          }
        />

        <section className="mb-10 rounded-2xl border bg-card p-6">
          <h2 className="text-lg font-semibold mb-2">How we rank local movers</h2>
          <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
            <li>
              • Local priority first — true local/intrastate movers and companies
              headquartered in this county or seat (we never invent local status)
            </li>
            <li>• Then ratings, review volume, and licensing completeness</li>
            <li>• FMCSA USDOT/MC and safety rating when available</li>
            <li>• BBB standing where reported</li>
            <li>• Stable name/id tie-breakers so order stays consistent</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
            Pages with more than 10 movers show the top 10 first; use &ldquo;Show next 10&rdquo;
            or &ldquo;Show all movers&rdquo; to expand without leaving this page.
          </p>
          <p className="text-xs text-muted-foreground mt-4">
            Always verify current licensing on{' '}
            <a
              href="https://www.fmcsa.dot.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              FMCSA.gov
            </a>{' '}
            before booking.
          </p>
        </section>

        <LocalMoversCta countyName={countyLabel} stateSlug={state.slug} />
      </main>
    </>
  );
}