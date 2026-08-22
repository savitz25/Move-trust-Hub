# Task FL-011G — State observation checkpoint and FL-012 readiness freeze

**Status:** `FL STATE OBSERVATION CHECKPOINT FROZEN — WAITING FOR FL-012 MATURITY`  
**Production DB writes:** `0`  
**Google API:** `0`  
**FL-012:** prohibited until `2026-09-05T14:45:00Z`

## Coverage (IM movers only)

930 represented + 168 unresolved = **1098** unique active FDACS IM. **84.7%**.

This is *not* 84.7% of brokers, all Florida movers, FMCSA interstate carriers, or county-regulated businesses. Internal coverage (930) is not “published.” Public Wave 1 FDACS evidence is **37**.

## Unresolved hold `FL_STATE_UNRESOLVED_HOLD_V1`

114 possible duplicate / 46 corporate family / 5 conflict / 3 status blocked. Withheld, not publication failures. FL-011F ready pool remains 0/0/0.

## Wave 2

Ready pool frozen at **720**. Draft **50**, hash `a5d15f3dca32a59a`, apply=false, **50/50 still INGESTED / indexable=false**.

## Brokers

**29** MB records (26 active, 2 expired, 1 unknown). 2 exact canonical, 17 state-record-only, 7 identity review, 3 status blocked. Role remains `MOVING_BROKER`. Disposition: **BROKER_SCOPE_REQUIRES_BOUNDED_FOLLOWUP** → `FL-011H — Florida FDACS MB/broker identity model and internal staging (no Wave 1 change)`.

## FL-012

Observation launch `2026-08-22T14:45:00Z`. Do not KEEP/ROLLBACK until maturity. Decision model frozen; not executed.
