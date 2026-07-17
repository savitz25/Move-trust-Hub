/** Companies directory grid: 8 rows × 3 cards on xl. */
export const DIRECTORY_PAGE_SIZE = 24;

/**
 * Max companies returned in a single API request (e.g. "Show all remaining").
 * High enough for the full active directory — no artificial browse ceiling.
 * Progressive "next 24" loads always use DIRECTORY_PAGE_SIZE.
 */
export const DIRECTORY_MAX_PAGE_LIMIT = 5000;
