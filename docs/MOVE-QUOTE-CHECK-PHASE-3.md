# Move Quote Check — Phase 3 Inventory Mismatch

## Goal

Compare mover estimate **cubic feet / weight** (from questionnaire or paste assist) to the user’s **MoveTrustHub Moving Calculator inventory** on this device.

Present a calm, factual discrepancy — never accuse fraud.

## Example framing

> Mover estimate: ~650 cu. ft.  
> Your MoveTrustHub inventory: ~910 cu. ft.  
> Difference: ~260 cu. ft. (~29%)

## Data sources

| Side | Source |
|------|--------|
| Mover | `estimateCubicFeet` / `estimateWeightLbs` fields (+ paste prefill) |
| User | `localStorage` key `move-calculator-inventory` (Zustand persist) |

User weight is derived as **cu. ft. × 7 lb/cu ft** (same as Moving Calculator).

## Thresholds (conservative)

### Volume (preferred when estimate cu. ft. present)

| Status | Rule (either condition) |
|--------|-------------------------|
| Aligned | below moderate |
| Moderate | ≥ **12%** relative **or** ≥ **80** cu. ft. absolute |
| Material | ≥ **25%** relative **or** ≥ **200** cu. ft. absolute |

Relative % uses `abs(diff) / max(mover, user)`.

### Weight (when only estimate weight is present)

| Status | Rule |
|--------|------|
| Moderate | ≥ **15%** or ≥ **600** lbs |
| Material | ≥ **28%** or ≥ **1,500** lbs |

## Behavior matrix

| Inventory | Estimate vol/wt | Result |
|-----------|-----------------|--------|
| Empty | any | Prompt to build inventory — no fake mismatch |
| Present | missing | Show user totals + prompt to enter estimate figures |
| Present | present | Compare + finding ids below |

## Finding IDs

- `inventory_aligned`
- `inventory_moderate_mismatch`
- `inventory_material_mismatch`
- `inventory_unavailable_prompt`

## UI

- Survey step: optional cu. ft. / weight fields  
- Checkbox: “Use my MoveTrustHub inventory for comparison” when local inventory exists  
- Report: **Inventory comparison** module + CTAs  

## Analytics

- `move_quote_check_inventory_compare_shown`
- `move_quote_check_inventory_mismatch_material`
- `move_quote_check_inventory_review_click`

## Code

| File | Role |
|------|------|
| `lib/move-quote-check/inventory-compare.ts` | Load totals + compare + findings |
| `lib/move-quote-check/rules.ts` | Merges inventory findings into report |
| `lib/move-quote-check/paste-parse.ts` | Prefills cu. ft. / weight from paste |
| `components/move-quote-check/move-quote-check-client.tsx` | Fields + report module |

## Out of scope

- Item-by-item AI reconciliation  
- Automatic underestimating accusations  
- “True cost is X”  
- PDF OCR  
