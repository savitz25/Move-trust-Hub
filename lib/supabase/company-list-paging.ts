/** PostgREST default max-rows is 1,000. Directory fetches must page past this. */
export const COMPANIES_LIST_PAGE_SIZE = 1000;

export function companyListPageOffsets(
  total: number,
  pageSize = COMPANIES_LIST_PAGE_SIZE
): number[] {
  if (total <= 0) return [];
  const offsets: number[] = [];
  for (let from = 0; from < total; from += pageSize) offsets.push(from);
  return offsets;
}
