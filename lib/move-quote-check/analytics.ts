/**
 * Move Quote Check analytics helpers (client-safe wrappers).
 */

import { trackGaEvent } from '@/components/ga-events';

const PAGE = '/tools/move-quote-check';

export function trackQuoteCheckStart() {
  trackGaEvent('move_quote_check_start', { page_path: PAGE });
}

export function trackQuoteCheckReportGenerated(params: {
  high_count: number;
  review_count: number;
  has_usdot: boolean;
  estimate_type: string;
}) {
  trackGaEvent('move_quote_check_report', {
    page_path: PAGE,
    high_count: params.high_count,
    review_count: params.review_count,
    has_usdot: params.has_usdot,
    estimate_type: params.estimate_type,
  });
}

export function trackQuoteCheckVerifyDotClick() {
  trackGaEvent('move_quote_check_verify_dot', { page_path: PAGE });
}

export function trackQuoteCheckCopyQuestions() {
  trackGaEvent('move_quote_check_copy_questions', { page_path: PAGE });
}
