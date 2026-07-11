export type WebsiteCoverageStatus = 'ok' | 'skipped' | 'not_found' | 'error';

export type ParsedCoverageCity = {
  city: string;
  stateCode: string;
};

export type ParsedCoverageCounty = {
  stateSlug: string;
  countySlug: string;
  label: string;
};

/** Low-confidence coverage extracted from a public company website. */
export type WebsiteCoverageData = {
  consentGiven: boolean;
  websiteUrl: string | null;
  scrapedAt: string;
  status: WebsiteCoverageStatus;
  /** True when only national/vague language — do not expand to all counties. */
  isNationalOnly: boolean;
  summary: string | null;
  stateSlugs: string[];
  cities: ParsedCoverageCity[];
  counties: ParsedCoverageCounty[];
  officeAddresses: string[];
  regions: string[];
  pagesFetched: string[];
  rawSnippets: string[];
  error?: string;
};