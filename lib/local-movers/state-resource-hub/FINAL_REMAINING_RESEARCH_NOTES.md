# Final Remaining States — Research Notes (NH, VT, RI, DE, HI, AK)

Cleanup + completion wave for the last packs needed for **50/50** U.S. state Resource Hub coverage.

| Item | Status |
|------|--------|
| Master template | `california.ts` (locked) |
| Rules | `TEMPLATE_RULES.md` |
| Shared UI | `components/local-movers/state-hub/state-resource-hub.tsx` |
| Registry | `registry.ts` — **50 packs** |
| Leakage safeguard | `scripts/check-state-hub-no-leakage.mjs` — **PASS** |
| Final-6 quality gate | `scripts/tmp-final-qgate.js` — **PASS** (0 orphans / 0 duplicates) |
| Public live check (2026-07-23) | Full hub chrome (“What kind of move are you planning?”) confirmed for NH, VT, RI, DE, HI, AK |

**Small / unique state rules applied**

- **NH (10), VT (14):** lighter `regions_as_anchors` (natural multi-region packs; no empty filler modules).
- **RI (5), DE (3), HI (5):** compact natural groups in content; runtime `flat_county_list` under TEMPLATE_RULES (~&lt;8 curated counties).
- **AK (29):** multi-region borough/census-area map; **no invented HHG board** (`limited_or_none`).

Architecture parity (all packs): SSR body via shared `StateResourceHub`, progressive disclosure, 4-path intent selector, `stateName`-driven chrome, crawlable full county/borough directory.

---

## 1. New Hampshire

| Field | Value |
|-------|--------|
| **Pack** | `new-hampshire.ts` (Wave 10) |
| **Counties** | 10 / 10 |
| **Region mode** | `regions_as_anchors` (Seacoast & South, Central NH, Lakes & North Country, Southwest) |
| **Regulation mode** | `strong_state_regulator` |
| **Regulator** | Household Goods Carrier authority under NH Department of Safety / Bureau frameworks (RSA 359-T); written estimates on request; annual HHG vehicle registration with DMV; NHPC-style identifiers in consumer guidance |
| **Migration** | `outbound_dominant` (FL/Carolinas + short MA/ME hops) |
| **Challenges (real)** | Winter ice; Seacoast multi-unit / MA-border logistics; Manchester–Nashua growth; Lakes Region seasonal peaks; North Country long hauls |
| **Sources** | nh.gov / DoS HHG frameworks; RSA 359-T summaries; FMCSA SAFER; Protect Your Move |
| **Live** | Full Resource Hub at `/local-movers/new-hampshire` |

---

## 2. Vermont

| Field | Value |
|-------|--------|
| **Pack** | `vermont.ts` (Wave 10) |
| **Counties** | 14 / 14 |
| **Region mode** | `regions_as_anchors` (Northwest, Central, Southern, Northeast Kingdom) |
| **Regulation mode** | `limited_or_none` |
| **Regulator** | **No dedicated local household-goods mover license** in commonly cited consumer guidance; FMCSA for interstate; insurance + written contracts for local jobs |
| **Migration** | `outbound_dominant` (FL/Carolinas + short NY/NH/MA hops) |
| **Challenges (real)** | Rural roads; winter conditions; ski-season peaks; Burlington multi-unit access; thin Northeast Kingdom coverage |
| **Sources** | FMCSA SAFER; Protect Your Move; industry/state summaries on no local VT HHG license |
| **Honesty note** | Do **not** invent VT HHG permit numbers |
| **Live** | Full Resource Hub at `/local-movers/vermont` |

---

## 3. Rhode Island

| Field | Value |
|-------|--------|
| **Pack** | `rhode-island.ts` (Wave 10) |
| **Counties** | 5 / 5 |
| **Region mode** | Content groups (Providence Metro; South County & Newport) → runtime **`flat_county_list`** |
| **Regulation mode** | `strong_state_regulator` |
| **Regulator** | Rhode Island Division of Public Utilities and Carriers (**DPUC**) — household goods certificate; fitness/willingness/ability standard; licensed mover lists; Bill of Lading requirement |
| **Migration** | `outbound_dominant` (FL/Carolinas + constant short MA/CT hops) |
| **Challenges (real)** | Providence density; coastal / Newport access; short interstate hops mislabeled as “local”; tourism peaks |
| **Sources** | ripuc.ri.gov moving-information; Motor Carriers Division; FMCSA SAFER |
| **Live** | Full Resource Hub at `/local-movers/rhode-island` |

---

## 4. Delaware

| Field | Value |
|-------|--------|
| **Pack** | `delaware.ts` (Wave 10) |
| **Counties** | 3 / 3 |
| **Region mode** | One group per county → runtime **`flat_county_list`** |
| **Regulation mode** | `limited_or_none` |
| **Regulator** | **No special state household-goods certificate** for pure intrastate movers per commonly cited consumer guidance; business registration + insurance; FMCSA for interstate |
| **Migration** | `outbound_dominant` (FL/Carolinas + constant short PA/MD/NJ hops) |
| **Challenges (real)** | New Castle (Wilmington metro) density; Kent/Sussex beach-season peaks; most “DE hauls” quickly become interstate |
| **Sources** | FMCSA SAFER; Protect Your Move; industry/consumer summaries on no special DE HHG license |
| **Honesty note** | Do **not** invent a DE HHG board |
| **Live** | Full Resource Hub at `/local-movers/delaware` |

---

## 5. Hawaii (verify / re-confirm)

| Field | Value |
|-------|--------|
| **Pack** | `hawaii.ts` (Wave 8; re-verified this wave) |
| **Counties** | 5 / 5 (island-mapped: Honolulu/Oahu, Hawaii Island, Maui, Kauai, Kalawao) |
| **Region mode** | Island-aware content groups → runtime **`flat_county_list`** (TEMPLATE_RULES small-N) |
| **Regulation mode** | `strong_state_regulator` |
| **Regulator** | Hawaii **Public Utilities Commission** — Motor Carrier **CPCN** for household goods classification (certification, ratemaking, business regulation) |
| **Migration** | `inbound_dominant` (mainland CA/WA/TX inbound; dense inter-island traffic) |
| **Challenges (real)** | Honolulu high-rise elevators; inter-island barge/air schedules; humidity packing; mainland ocean transit + FMCSA |
| **Sources** | puc.hawaii.gov/motor_carriers; FMCSA SAFER; Protect Your Move |
| **Honesty note** | Inter-island = **intrastate** (PUC); mainland = **interstate** (FMCSA). No invented non-PUC board. |
| **Live** | Full Resource Hub at `/local-movers/hawaii` (not simple lander) |

---

## 6. Alaska (verify / re-confirm)

| Field | Value |
|-------|--------|
| **Pack** | `alaska.ts` (Wave 8; re-verified this wave) |
| **Boroughs / census areas** | 29 / 29 |
| **Region mode** | Multi-region: Anchorage & Southcentral, Interior, Southeast, Southwest & Bush |
| **Regulation mode** | `limited_or_none` |
| **Regulator** | **No dedicated state HHG permit board**; Alaska business license + insurance/contracts; AG consumer protection tools; **FMCSA for Outside/interstate** |
| **Migration** | `inbound_dominant` (Outside inbound via WA corridor) |
| **Challenges (real)** | Extreme winter access; Southeast ferry logistics; Bush air/barge-only communities; long empty miles (e.g. Anchorage ↔ Fairbanks) |
| **Sources** | FMCSA SAFER; Protect Your Move; commerce.alaska.gov business licensing |
| **Honesty note** | Deliberately **not** inventing an Alaska HHG board |
| **Live** | Full Resource Hub at `/local-movers/alaska` (not simple lander) |

---

## Quality gates (final 6)

```
new-hampshire: PASS counties 10/10 mode strong_state_regulator
vermont:       PASS counties 14/14 mode limited_or_none
rhode-island:  PASS counties 5/5   mode strong_state_regulator
delaware:      PASS counties 3/3   mode limited_or_none
hawaii:        PASS counties 5/5   mode strong_state_regulator
alaska:        PASS counties 29/29 mode limited_or_none
GATE PASSED for final 6
```

Leakage check: `node scripts/check-state-hub-no-leakage.mjs` → **State hub leakage check passed.**

---

## 50-state coverage confirmation

| Wave | States | Cumulative |
|------|--------|------------|
| Master | CA | 1 |
| 1 | TX, FL, NY, GA, AZ | 6 |
| 2 | IL, PA, NC, WA, OH | 11 |
| 3 | CO, VA, MI, NJ, TN | 16 |
| 4 | MA, MD, IN, MO, SC | 21 |
| 5 | MN, WI, AL, LA, KY | 26 |
| 6 | OR, OK, CT, IA, AR | 31 |
| 7 | UT, KS, MS, NV, NM | 36 |
| 8 | NE, ID, WV, **HI**, **AK** | 41 |
| 9 | MT, WY, ND, SD, ME | 46 |
| **10 (final)** | **NH, VT, RI, DE** | **50** |

- **Code registry:** 50 pack files + 50 `PACKS` entries in `registry.ts`.
- **Public:** Final remaining states re-checked 2026-07-23; full hub UI live for NH, VT, RI, DE, HI, AK (old simple lander titles no longer served for those routes).
- **Template fidelity:** Shared SSR hub, intent selector, regulations block with honest modes, costs + methodology, migration/routes, challenges, FAQ, full county/borough directory.
- **Zero leakage:** Safeguard script pass on full registry.

See also: `WAVE8_RESEARCH_NOTES.md` (HI/AK detail), `WAVE10_RESEARCH_NOTES.md` (NH/VT/RI/DE detail).
