# Move Quote Check — Phase 1 MVP

## Positioning

**Move Quote Check** — *Know what you’re signing before you sign.*

Research-only estimate / contract-terms reader. Not a price-fairness oracle and not a scam verdict engine.

## Route

`/tools/move-quote-check`

## Phase 1 covers

1. Guided questionnaire (estimate type, identity, survey, inventory, money, valuation, completeness)
2. Deterministic rules engine (`lib/move-quote-check/rules.ts`)
3. Structured report (summary, checklist groups, exposure note, questions, next steps)
4. Copyable questions for the mover
5. Verify DOT deep link when USDOT present (`/verify-dot?q=…`)
6. Privacy: no lead form, no account required, estimate contents not stored by default

## Rule families

| Family | Examples |
|--------|----------|
| Estimate type | Binding / non-binding / NTE / unclear; educational 110% figure for non-binding + total |
| Identity | Missing USDOT, broker vs carrier, unclear role |
| Survey | Phone-only vs virtual/in-home |
| Inventory | Thin / volume-only / itemized |
| Deposit / payment | Large relative deposit; cash/wire/Zelle caution patterns |
| Valuation | Released vs Full Value vs unclear |
| Completeness | Signatures, dates, O/D, rights booklet, open-ended language |

## Deferred (not Phase 1)

Phase 2 adds paste assist, directory match, and device summary save — see
`docs/MOVE-QUOTE-CHECK-PHASE-2.md`.

Still deferred:

- PDF/OCR upload  
- AI verdicts  
- Fair market price conclusions  
- SAFE / SCAM labels  
- Lead forms / matching  
- Multi-quote compare  
- Local-only specialist mode  
- Auto/container quotes  
- Inventory mismatch engine (Phase 3)  


## Analytics

- `move_quote_check_start`
- `move_quote_check_report`
- `move_quote_check_verify_dot`
- `move_quote_check_copy_questions`

## Code map

| Path | Role |
|------|------|
| `lib/move-quote-check/types.ts` | Contracts |
| `lib/move-quote-check/rules.ts` | Engine |
| `lib/move-quote-check/analytics.ts` | Events |
| `components/move-quote-check/move-quote-check-client.tsx` | UI |
| `app/(move)/tools/move-quote-check/page.tsx` | Route |
