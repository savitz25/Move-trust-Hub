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

export function trackQuoteCheckPasteUsed() {
  trackGaEvent('move_quote_check_paste_used', { page_path: PAGE });
}

export function trackQuoteCheckPrefillApplied(params: { field_count: number }) {
  trackGaEvent('move_quote_check_prefill_applied', {
    page_path: PAGE,
    field_count: params.field_count,
  });
}

export function trackQuoteCheckProfileMatchClick() {
  trackGaEvent('move_quote_check_profile_match_click', { page_path: PAGE });
}

export function trackQuoteCheckSaveToMyMove() {
  trackGaEvent('move_quote_check_save_to_my_move', { page_path: PAGE });
}

export function trackQuoteCheckInventoryCompareShown(params: {
  status: string;
  basis: string;
}) {
  trackGaEvent('move_quote_check_inventory_compare_shown', {
    page_path: PAGE,
    status: params.status,
    basis: params.basis,
  });
}

export function trackQuoteCheckInventoryMismatchMaterial() {
  trackGaEvent('move_quote_check_inventory_mismatch_material', {
    page_path: PAGE,
  });
}

export function trackQuoteCheckInventoryReviewClick() {
  trackGaEvent('move_quote_check_inventory_review_click', {
    page_path: PAGE,
  });
}
