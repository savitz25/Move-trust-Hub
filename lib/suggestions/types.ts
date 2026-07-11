import type { UsdotStatusLabel } from '@/lib/fmcsa/preview-types';
import type { WebsiteCoverageData } from '@/lib/verification/coverage-scrape-types';
import type {
  GooglePlacesData,
  PublicScrapeData,
} from '@/lib/verification/types';

/** Client-safe FMCSA preview for suggestion modal (no raw API payload). */
export type FmcsaSuggestionPreview = {
  displayNumber: string;
  usdot: string | null;
  mcNumber: string | null;
  legalName: string | null;
  dbaName: string | null;
  headquarters: string | null;
  addressStreet: string | null;
  addressCity: string | null;
  addressState: string | null;
  addressZip: string | null;
  phone: string | null;
  entityType: string | null;
  usdotStatus: UsdotStatusLabel | null;
  powerUnits: number | null;
  carrierOperation: string | null;
  cargoCarried: string | null;
  mcs150Mileage: string | null;
  authorityStatus: string | null;
  safetyRating: string | null;
  allowedToOperate: string | null;
};

/** Client-safe multi-source preview for suggestion modal. */
export type EnrichedCompanyPreview = {
  fmcsa: FmcsaSuggestionPreview | null;
  google: GooglePlacesData | null;
  publicScrape: PublicScrapeData | null;
  websiteCoverage?: WebsiteCoverageData | null;
  fetchedAt: string;
};