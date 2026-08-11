# Move Quote Check — Phase 2

Builds on Phase 1 at `/tools/move-quote-check`.

## Added in Phase 2

### 1. Paste-text assist
- Optional step after start
- Client-side deterministic scan (`lib/move-quote-check/paste-parse.ts`)
- Prefills questionnaire fields with “Suggested from pasted text” notes
- User must still walk/confirm the questionnaire
- Raw paste is **not** stored by default (not saved with My Move summary)

### 2. Stronger USDOT / directory match
- On report generation, server action `matchQuoteCheckDirectory` uses existing
  `findCompanyByCarrierNumber` (same path as Verify DOT directory lookup)
- High-confidence match → profile link + Verify DOT
- No match → calm note + Verify DOT still available
- Never forces a bad match

### 3. Optional save summary to My Move (device)
- `Save summary to My Move (this device)` on report
- Storage key `mth-quote-check-summaries-v1` (guest-friendly localStorage)
- Compact fields only: estimate type, finding ids/titles, USDOT, prices, timestamp, optional profile slug
- No account wall

### 4. Report UX
- Company research match panel
- Next steps: matched profile, Verify DOT, inventory, another estimate, My Move

## Analytics
- `move_quote_check_paste_used`
- `move_quote_check_prefill_applied`
- `move_quote_check_profile_match_click`
- `move_quote_check_save_to_my_move`

(Plus Phase 1 events.)

## Still out of scope
- PDF OCR upload
- AI legal conclusions
- Price fairness / SAFE-SCAM labels
- Multi-quote compare
- Inventory mismatch engine (Phase 3)
- Lead gen

## Code map
| File | Role |
|------|------|
| `lib/move-quote-check/paste-parse.ts` | Paste scanner + apply |
| `lib/move-quote-check/local-report-store.ts` | Device summary store |
| `actions/move-quote-check-match.ts` | Directory match |
| `components/move-quote-check/move-quote-check-client.tsx` | UI |
