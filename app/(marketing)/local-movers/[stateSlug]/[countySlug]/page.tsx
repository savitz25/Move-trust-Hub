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
import { LocalMoversBreadcrumbs } from '@/components/local-movers/local-movers-breadcrumbs';
import { LocalMoverCard } from '@/components/local-movers/local-mover-card';
import { LocalMoversCta } from '@/components/local-movers/local-movers-cta';
import { LocalMoversSchema } from '@/components/local-movers/local-movers-schema';
import { getLocalState } from '@/lib/local-movers/states';
import {
  buildCountyCostGuide,
  buildCountyDescription,
  buildCountyFaqItems,
  buildCountyH1,
  buildCountyMarketNotes,
  buildCountyPageMetadata,
  buildCountyTestimonials,
  buildCountyTips,
  buildCountyLabel,
  buildCountyTitle,
  getAllCountyParams,
  getCountyPath,
  getMoversForCounty,
  getStatePath,
} from '@/lib/local-movers/index';

type Props = { params: Promise<{ stateSlug: string; countySlug: string }> };

export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllCountyParams().map(({ stateSlug, countySlug }) => ({
    stateSlug,
    countySlug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { stateSlug, countySlug } = await params;
  const state = getLocalState(stateSlug);
  const result = getMoversForCounty(stateSlug, countySlug);
  if (!state || !result) return {};

  return buildCountyPageMetadata(
    result.county,
    state.name,
    result.movers,
    getCountyPath(stateSlug, countySlug)
  );
}

export default async function LocalMoversCountyPage({ params }: Props) {
  const { stateSlug, countySlug } = await params;
  const state = getLocalState(stateSlug);
  const result = getMoversForCounty(stateSlug, countySlug);

  if (!state || !result) notFound();

  const { county, movers, isRegionalFallback } = result;
  const title = buildCountyTitle(county, state.name);
  const description = buildCountyDescription(county, state.name, movers.length);
  const path = getCountyPath(stateSlug, countySlug);
  const countyLabel = buildCountyLabel(county);
  const faqItems = buildCountyFaqItems(county, state.name, movers);
  const costs = buildCountyCostGuide(county, state.name);
  const tips = buildCountyTips(county, state.name);
  const testimonials = buildCountyTestimonials(county, state.name);
  const marketNotes = buildCountyMarketNotes(county);
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
        testimonials={testimonials}
      />

      <main className="container mx-auto px-4 py-10 max-w-3xl">
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
            {state.name} · {county.stateCode}
          </p>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-3">
            {buildCountyH1(county)}
          </h1>
          {county.seat && (
            <p className="text-muted-foreground mb-3">
              {stateSlug === 'louisiana' ? 'Parish seat' : 'County seat'}:{' '}
              {county.seat}
            </p>
          )}
          <p className="text-muted-foreground leading-relaxed">
            Compare {movers.length} local moving companies serving {countyLabel}.
            Ratings, services, and FMCSA licensing — plus links to full
            profiles in our{' '}
            <Link href="/companies" className="text-primary font-medium hover:underline">
              interstate directory
            </Link>
            .
          </p>
          {marketNotes && (
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed rounded-xl border bg-muted/20 px-4 py-3">
              {marketNotes}
            </p>
          )}
          {isRegionalFallback && (
            <p className="mt-3 text-xs text-muted-foreground rounded-lg border bg-muted/30 px-3 py-2">
              Movers listed serve the greater {county.metro?.replace(/-/g, ' ')} region
              including {countyLabel}.
            </p>
          )}
        </header>

        <section className="mb-10" id="movers" aria-labelledby="movers-heading">
          <h2 id="movers-heading" className="text-2xl font-semibold tracking-tight mb-4">
            Best moving companies in {countyLabel}, {county.stateCode}
          </h2>
          {movers.length > 0 ? (
            <ol className="space-y-4 list-none p-0 m-0">
              {movers.map((mover, index) => (
                <li key={mover.id}>
                  <LocalMoverCard
                    mover={mover}
                    rank={index + 1}
                    countyLabel={countyLabel}
                    stateCode={county.stateCode}
                  />
                </li>
              ))}
            </ol>
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

        <CountyCostSection countyLabel={countyLabel} stateName={state.name} costs={costs} />

        <CountyTipsSection countyLabel={countyLabel} tips={tips} />

        <CountyTestimonialSection
          testimonials={testimonials}
          countyLabel={countyLabel}
        />

        <CountyFaqSection countyLabel={countyLabel} faqItems={faqItems} />

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
            <li>• Customer ratings and review volume</li>
            <li>• FMCSA USDOT/MC licensing and safety rating when available</li>
            <li>• Service fit for local and short-distance moves</li>
            <li>• BBB standing where reported</li>
          </ul>
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

        <LocalMoversCta countyName={countyLabel} />
      </main>
    </>
  );
}