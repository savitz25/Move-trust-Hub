import { trackGaEvent } from '@/components/ga-events';

const PAGE = '/tools/move-quote-check/compare';

export function trackCompareStart() {
  trackGaEvent('move_quote_check_compare_start', { page_path: PAGE });
}

export function trackCompareReport(params: {
  has_price_both: boolean;
  material_rows: number;
  has_inventory: boolean;
}) {
  trackGaEvent('move_quote_check_compare_report', {
    page_path: PAGE,
    has_price_both: params.has_price_both,
    material_rows: params.material_rows,
    has_inventory: params.has_inventory,
  });
}

export function trackCompareVerifyDotClick(side: 'A' | 'B') {
  trackGaEvent('move_quote_check_compare_verify_dot_click', {
    page_path: PAGE,
    side,
  });
}

export function trackCompareSaveSummary() {
  trackGaEvent('move_quote_check_compare_save_summary', { page_path: PAGE });
}
