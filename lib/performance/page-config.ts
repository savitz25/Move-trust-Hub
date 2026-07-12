/**
 * RSC page segment defaults — import in route pages (not layouts).
 *
 * @example
 * export const dynamic = STATIC_PAGE;
 * export const revalidate = REVALIDATE_HOURLY;
 */
export const STATIC_PAGE = 'force-static' as const;
export const DYNAMIC_PAGE = 'force-dynamic' as const;
export const REVALIDATE_HOURLY = 3600;
export const REVALIDATE_DAILY = 86_400;