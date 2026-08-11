# Move Quote Check — Phase 4 Compare Two Estimates

## Route
`/tools/move-quote-check/compare`

## Goal
Normalize **what you get** under each quote — not only sticker price. No winner verdict.

## Flow
1. Estimate A (guided fields + optional paste)
2. Estimate B
3. Comparison report

From a single Quote Check report: **Compare with another estimate** saves A to `sessionStorage` and opens the compare flow.

## Comparison outputs
1. **Price snapshot** — A vs B, absolute difference, which is lower on sticker only  
2. **Assumption matrix** — type, volume, weight, packing, shuttle, storage, valuation, deposit, survey, inventory detail, USDOT, role  
3. **Callouts** — plain-English material differences (cheaper-but-less-volume, type mismatch, packing, valuation, single-side USDOT, inventory distance)  
4. **Inventory baseline** — both estimates vs the same MoveTrustHub calculator inventory when present  
5. **Gap questions** — copyable  
6. **Company research** — Verify DOT + optional directory match per side  

## Engine
`lib/move-quote-check/compare-engine.ts` — deterministic only.

## Analytics
- `move_quote_check_compare_start`
- `move_quote_check_compare_report`
- `move_quote_check_compare_verify_dot_click`
- `move_quote_check_compare_save_summary`

## Privacy
- No lead form  
- Optional device save of compact comparison summary only  
- Raw paste not stored  

## Out of scope
3+ estimates · PDF OCR · “best mover” AI · booking CTAs  
