# Task 011C.1B — Exhaustive Service-Area Evidence

**Google Places API requests: 0**

**County edges created: 0**

## Status

**PARTIAL — CORPUS IMPROVED / MODEL STILL NOT APPROVED**

Precision-scorable providers with negatives: **FL=2, WA=0** (floor ≥15 each; preferred ≥20).

## Research cohort

FL **89** · WA **64** · total **153**

## Key finding

Verified FL/WA movers rarely publish **exclusive** pickup territories or **mile-radius** origin definitions on provider-owned sites.

WA UTC Tariff 15-C “local = ≤55 miles” is a **rate classification**, not a carrier-specific service territory — **not** used as RADIUS_EXPLICIT.

## Manual second-check EXHAUSTIVE examples (FL)

- `all-about-moving-tampa-bay` — Pinellas + Hillsborough exhaustive list
- `patriot-moving-and-storage` — Palm Beach + Broward exhaustive service-areas section

These demonstrate the labeling pipeline works, but the sample is far too small for a general model gate.

## Fleet theory

**NO** — do not use power units as primary radius determinant (consistent with 011C.1A).

## Hybrid

**NOT APPROVED** pending larger exhaustive corpus.

## Recommendation

**A. Explicit-evidence-first local discovery** with **no general radius fallback** until a precision-scorable corpus exists.

Optional later product policy (not validated here): narrow **home-county / adjacent-county** fallback.

**Do not start Task 011C.2.**
