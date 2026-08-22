# Task FL-010A — Wave 1 apply

**Status:** `LAUNCHED — OBSERVATION ACTIVE`  
**Apply executed:** YES  
**Manifest hash:** `a9165ec652ad7a27`  
**Production SHA:** `ab93c84195f3b36c7e2bbd70495a0ee1432d8140`  
**Google Places / API requests: 0**

## Apply

Transactional `COMMIT`. 37 `INGESTED → PUBLISHABLE`, `indexable=false` unchanged. Membership `local_hhg_canary_publication.wave_id = FL_STATE_WAVE_1` (not KEEP_80). CDN purged after apply so stale 404s did not stick.

| Metric | Before | After |
| ------ | -----: | ----: |
| companies | 5908 | 5908 |
| indexable | 4905 | 4905 |
| INGESTED | 887 | 850 |
| PUBLISHABLE | 4985 | 5022 |
| KEEP_80 | 80 | 80 |
| Wave 1 membership | 0 | 37 |

## Live QA

* Profiles: **37/37 HTTP 200**, **37/37 noindex**, **37/37 Florida Intrastate Mover**, **37/37 FDACS IM exact**, **0 sitemap**, **0 prohibited claims**
* Contacts: phone labels 36/37 (`nippon-express-u-s-a-inc` has no phone label), email 36/37 (Clover phone-only), address 37/37
* Compare API: Wave 1 slug hydrates
* `/companies?q=gentletouch`: visible
* County Miami-Dade / Pinellas: Wave 1 **not** in KEEP_80 county lists
* KEEP_80 canary sample still HTTP 200

Observation window: 14 days. Do not index. Do not start FL-011 automatically.
