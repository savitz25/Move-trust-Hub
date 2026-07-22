import { trustHubLogoUrl } from '@/lib/hub/config';
import {
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
  LOUISIANA_COUNTY_CONTENT_UPDATED,
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
import { getMissouriCountyResearch } from '@/data/missouri-county-research';
import { getIllinoisCountyResearch } from '@/data/illinois-county-research';
import { getMichiganCountyResearch } from '@/data/michigan-county-research';
import { getIndianaCountyResearch } from '@/data/indiana-county-research';
import { getOhioCountyResearch } from '@/data/ohio-county-research';
import { getKentuckyCountyResearch } from '@/data/kentucky-county-research';
import { getWestVirginiaCountyResearch } from '@/data/west-virginia-county-research';
import { getVirginiaCountyResearch } from '@/data/virginia-county-research';
import { getAlabamaCountyResearch } from '@/data/alabama-county-research';
import { getMississippiCountyResearch } from '@/data/mississippi-county-research';
import { getLouisianaCountyResearch } from '@/data/louisiana-county-research';
import { getOklahomaCountyResearch } from '@/data/oklahoma-county-research';
import { getArkansasCountyResearch } from '@/data/arkansas-county-research';
import { getKansasCountyResearch } from '@/data/kansas-county-research';
import { getGeorgiaCountyResearch } from '@/data/georgia-county-research';
import { getSouthCarolinaCountyResearch } from '@/data/south-carolina-county-research';
import { getNorthCarolinaCountyResearch } from '@/data/north-carolina-county-research';
import { getTennesseeCountyResearch } from '@/data/tennessee-county-research';
import type { CountyFaqItem, CountyTestimonial } from '@/lib/local-movers/county-seo';
import {
  buildCountyLabel,
  buildCountyPlaceSchema,
  buildEmbeddedCompanyReview,
  buildFaqSchema,
  buildMoverSchemaNode,
  buildMoversItemListName,
  buildReviewSchemaNode,
} from '@/lib/local-movers/schema-helpers';
import type { LocalCounty, LocalMover } from '@/lib/local-movers/types';

const SITE_URL = 'https://www.movetrusthub.com';
const ORG_ID = `${SITE_URL}/#organization`;
const CONTENT_PUBLISHED = '2026-01-15';

type BreadcrumbItem = {
  name: string;
  path: string;
};

/** Unique per-list-item URL for ItemList rich results (website URLs can repeat across metro spillover movers). */
function buildMoverUrl(mover: LocalMover, pageUrl: string): string {
  if (mover.profileSlug) return `${SITE_URL}/companies/${mover.profileSlug}`;
  return `${pageUrl}#mover-${mover.id}`;
}

function resolveContentModified(county: LocalCounty): string {
  if (county.stateSlug === 'california') return CALIFORNIA_COUNTY_CONTENT_UPDATED;
  if (county.stateSlug === 'florida') return FLORIDA_COUNTY_CONTENT_UPDATED;
  if (county.stateSlug === 'new-jersey') return NEW_JERSEY_COUNTY_CONTENT_UPDATED;
  if (county.stateSlug === 'new-york') return NEW_YORK_COUNTY_CONTENT_UPDATED;
  if (county.stateSlug === 'texas') return TEXAS_COUNTY_CONTENT_UPDATED;
  if (county.stateSlug === 'georgia' && getGeorgiaCountyResearch(county.slug)) {
    return GEORGIA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'south-carolina' &&
    getSouthCarolinaCountyResearch(county.slug)
  ) {
    return SOUTH_CAROLINA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'north-carolina' &&
    getNorthCarolinaCountyResearch(county.slug)
  ) {
    return NORTH_CAROLINA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'tennessee' &&
    getTennesseeCountyResearch(county.slug)
  ) {
    return TENNESSEE_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'alabama' &&
    getAlabamaCountyResearch(county.slug)
  ) {
    return ALABAMA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'mississippi' &&
    getMississippiCountyResearch(county.slug)
  ) {
    return MISSISSIPPI_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'louisiana' &&
    getLouisianaCountyResearch(county.slug)
  ) {
    return LOUISIANA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'oklahoma' &&
    getOklahomaCountyResearch(county.slug)
  ) {
    return OKLAHOMA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'arkansas' &&
    getArkansasCountyResearch(county.slug)
  ) {
    return ARKANSAS_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'kansas' &&
    getKansasCountyResearch(county.slug)
  ) {
    return KANSAS_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'missouri' &&
    getMissouriCountyResearch(county.slug)
  ) {
    return MISSOURI_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'illinois' &&
    getIllinoisCountyResearch(county.slug)
  ) {
    return ILLINOIS_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'michigan' &&
    getMichiganCountyResearch(county.slug)
  ) {
    return MICHIGAN_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'indiana' &&
    getIndianaCountyResearch(county.slug)
  ) {
    return INDIANA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'ohio' &&
    getOhioCountyResearch(county.slug)
  ) {
    return OHIO_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'kentucky' &&
    getKentuckyCountyResearch(county.slug)
  ) {
    return KENTUCKY_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'west-virginia' &&
    getWestVirginiaCountyResearch(county.slug)
  ) {
    return WEST_VIRGINIA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'virginia' &&
    getVirginiaCountyResearch(county.slug)
  ) {
    return VIRGINIA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'district-of-columbia' &&
    getDistrictOfColumbiaCountyResearch(county.slug)
  ) {
    return DISTRICT_OF_COLUMBIA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'delaware' &&
    getDelawareCountyResearch(county.slug)
  ) {
    return DELAWARE_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'maryland' &&
    getMarylandCountyResearch(county.slug)
  ) {
    return MARYLAND_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'pennsylvania' &&
    getPennsylvaniaCountyResearch(county.slug)
  ) {
    return PENNSYLVANIA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'connecticut' &&
    getConnecticutCountyResearch(county.slug)
  ) {
    return CONNECTICUT_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'massachusetts' &&
    getMassachusettsCountyResearch(county.slug)
  ) {
    return MASSACHUSETTS_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'rhode-island' &&
    getRhodeIslandCountyResearch(county.slug)
  ) {
    return RHODE_ISLAND_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'vermont' &&
    getVermontCountyResearch(county.slug)
  ) {
    return VERMONT_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'new-hampshire' &&
    getNewHampshireCountyResearch(county.slug)
  ) {
    return NEW_HAMPSHIRE_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'maine' &&
    getMaineCountyResearch(county.slug)
  ) {
    return MAINE_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'hawaii' &&
    getHawaiiCountyResearch(county.slug)
  ) {
    return HAWAII_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'alaska' &&
    getAlaskaCountyResearch(county.slug)
  ) {
    return ALASKA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'washington' &&
    getWashingtonCountyResearch(county.slug)
  ) {
    return WASHINGTON_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'oregon' &&
    getOregonCountyResearch(county.slug)
  ) {
    return OREGON_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'nevada' &&
    getNevadaCountyResearch(county.slug)
  ) {
    return NEVADA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'arizona' &&
    getArizonaCountyResearch(county.slug)
  ) {
    return ARIZONA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'new-mexico' &&
    getNewMexicoCountyResearch(county.slug)
  ) {
    return NEW_MEXICO_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'utah' &&
    getUtahCountyResearch(county.slug)
  ) {
    return UTAH_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'colorado' &&
    getColoradoCountyResearch(county.slug)
  ) {
    return COLORADO_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'idaho' &&
    getIdahoCountyResearch(county.slug)
  ) {
    return IDAHO_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'montana' &&
    getMontanaCountyResearch(county.slug)
  ) {
    return MONTANA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'wyoming' &&
    getWyomingCountyResearch(county.slug)
  ) {
    return WYOMING_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'north-dakota' &&
    getNorthDakotaCountyResearch(county.slug)
  ) {
    return NORTH_DAKOTA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'south-dakota' &&
    getSouthDakotaCountyResearch(county.slug)
  ) {
    return SOUTH_DAKOTA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'nebraska' &&
    getNebraskaCountyResearch(county.slug)
  ) {
    return NEBRASKA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'iowa' &&
    getIowaCountyResearch(county.slug)
  ) {
    return IOWA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'minnesota' &&
    getMinnesotaCountyResearch(county.slug)
  ) {
    return MINNESOTA_COUNTY_CONTENT_UPDATED;
  }
  if (
    county.stateSlug === 'wisconsin' &&
    getWisconsinCountyResearch(county.slug)
  ) {
    return WISCONSIN_COUNTY_CONTENT_UPDATED;
  }
  return new Date().toISOString().slice(0, 10);
}

export function buildCountySchemaGraph({
  title,
  description,
  path,
  breadcrumbs,
  movers,
  county,
  stateName,
  faqItems,
  testimonials,
}: {
  title: string;
  description: string;
  path: string;
  breadcrumbs: BreadcrumbItem[];
  movers?: LocalMover[];
  county?: LocalCounty;
  stateName?: string;
  faqItems?: CountyFaqItem[];
  testimonials?: CountyTestimonial[];
}): Record<string, unknown>[] {
  const url = `${SITE_URL}${path}`;
  const placeId = `${url}#place`;
  const countyLabel = county ? buildCountyLabel(county) : undefined;
  const contentModified = county ? resolveContentModified(county) : CONTENT_PUBLISHED;

  const movingCompanies = (movers ?? [])
    .map((mover, index) =>
      buildMoverSchemaNode(
        mover,
        url,
        county,
        stateName,
        placeId,
        buildMoverUrl
      )
    )
    .filter((node): node is Record<string, unknown> => node !== null);

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': ORG_ID,
      name: 'Move Trust Hub',
      url: SITE_URL,
      logo: trustHubLogoUrl(SITE_URL),
      sameAs: ['https://www.fmcsa.dot.gov/'],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumbs`,
      name: 'Breadcrumb',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })),
    },
    {
      '@type': 'WebPage',
      '@id': url,
      name: title,
      description,
      url,
      inLanguage: 'en-US',
      datePublished: CONTENT_PUBLISHED,
      dateModified: contentModified,
      author: {
        '@type': 'Person',
        '@id': `${SITE_URL}/about#editor-elena-vargas`,
        name: 'Elena Vargas',
        jobTitle: 'Local Markets Research Lead',
        worksFor: { '@id': ORG_ID },
      },
      publisher: { '@id': ORG_ID },
      isPartOf: {
        '@type': 'WebSite',
        name: 'Move Trust Hub',
        url: SITE_URL,
        publisher: { '@id': ORG_ID },
      },
      breadcrumb: { '@id': `${url}#breadcrumbs` },
      ...(county && stateName ? { about: { '@id': placeId } } : {}),
      ...(faqItems?.length ? { mainEntity: { '@id': `${url}#faq` } } : {}),
    },
  ];

  if (county && stateName) {
    graph.push(buildCountyPlaceSchema(county, stateName, placeId));
  }

  if (movingCompanies.length > 0) {
    graph.push({
      '@type': 'ItemList',
      '@id': `${url}#movers`,
      name: buildMoversItemListName(county, stateName),
      numberOfItems: movingCompanies.length,
      itemListOrder: 'https://schema.org/ItemListOrderDescending',
      itemListElement: movingCompanies.map((company, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: { '@id': company['@id'] },
      })),
    });
    graph.push(...movingCompanies);
  }

  if (faqItems?.length && countyLabel) {
    graph.push(buildFaqSchema(faqItems, `${url}#faq`, countyLabel));
  }

  if (testimonials?.length) {
    // Reviews target a real listed mover as LocalBusiness itemReviewed (never
    // AdministrativeArea / Place). Google Review snippets do not accept MovingCompany
    // alone as itemReviewed — LocalBusiness is required. GSC errors we prevent:
    // "Invalid object type for field itemReviewed", missing itemReviewed, invalid author.
    const reviewNodes = testimonials
      .map((testimonial, index) =>
        buildReviewSchemaNode(
          testimonial,
          index,
          url,
          county,
          stateName,
          placeId,
          contentModified,
          movers ?? [],
          buildMoverUrl
        )
      )
      .filter((node): node is Record<string, unknown> => node !== null);

    // Attach FULL review objects (not bare @id stubs) onto the company node.
    // Bare { "@id": "..." } stubs cause GSC "missing itemReviewed" when Google
    // expands company.review without resolving the standalone Review node.
    for (const review of reviewNodes) {
      const itemReviewed = review.itemReviewed as Record<string, unknown> | undefined;
      const reviewedId = String(itemReviewed?.['@id'] ?? '');
      if (!reviewedId) continue;
      const company = graph.find((node) => String(node['@id'] ?? '') === reviewedId);
      if (!company) continue;
      const embedded = buildEmbeddedCompanyReview(review, company);
      // Drop incomplete embeds (missing author / itemReviewed / rating)
      if (
        !embedded.itemReviewed ||
        !embedded.author ||
        !embedded.reviewRating ||
        !embedded.reviewBody
      ) {
        continue;
      }
      const existing = company.review;
      if (Array.isArray(existing)) {
        existing.push(embedded);
      } else if (existing && typeof existing === 'object') {
        company.review = [existing, embedded];
      } else {
        company.review = [embedded];
      }
    }

    graph.push(...reviewNodes);
  }

  return graph;
}