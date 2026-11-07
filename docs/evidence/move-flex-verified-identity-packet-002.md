# MOVE-FLEX-VERIFIED-IDENTITY-PACKET-002

Builder: B2
Prepared: 2026-11-07
Status: candidate evidence for independent CoS/B1 review; no production write or classifier change

## Stored Tampa identity (read-only production query, 2026-11-07)

Project `arepfylnilkjmyduhwbz`, table `public.companies`, row `id = slug = flex-moving`:

| Field | Stored value |
| --- | --- |
| Google Place ID | `ChIJSxirsajpwogRvVyq2ABVg98` |
| Google name | `Flex Moving & Storage` |
| Google formatted address | `5815 Memorial Hwy Ste B, Tampa, FL 33615` |
| Google phone | `(813) 452-4976` |
| Google website URL | `https://www.goflex.com` |
| Google snapshot fetched | `2026-07-26T17:00:01.514Z` |
| Company name / headquarters | `Flex Moving` / `5815 Memorial Hwy Ste B, Tampa, FL 33615` |
| Company phone / website | `(813) 452-4976` / `https://www.goflex.com` |
| `usdot_number`, `mc_number`, `fmcsa_legal_name` | all null |
| `verification_sources.independent_legal_identity` | null |

Read-only query used: `select id, slug, name, headquarters, phone, website, usdot_number, mc_number, fmcsa_legal_name, verification_sources->'google' as google, verification_sources->'independent_legal_identity' as independent_legal_identity from public.companies where slug = 'flex-moving' limit 1;`

The same Place ID is also held by `flex-moving-storage`, whose stored headquarters is `11820 Airport Park Dr Ste B, Orlando, FL 32824`. The proposed evidence must be bound to `flex-moving` and this Place ID; the Orlando row must not inherit it. A read-only holder query on 2026-11-07 returned these two rows. Google review text is not used as identity proof.

## First-party relationship evidence

1. Flex's current [Tampa location page](https://www.goflex.com/movers/fl/tampa), inspected 2026-11-07, gives `5815 Memorial Highway, Suite B, Tampa, FL 33626`, `(813) 452-4976`, and state license `IM3819` on the same page. The address and phone connect the stored Tampa Place to Flex's own location page. The ZIP differs from the stored Google Place (`33626` versus `33615`); CoS/B1 should verify the ZIP before any row repair.
2. The Tampa page links to Flex's [Terms of Service](https://www.goflex.com/terms), revised 2026-10-26. Its exact identifying clause is: “storage, moving, and related services (collectively the “Service(s)”) offered by Flex Storage Inc. (“Flex”).” The Terms cover the website and moving services. Read together, the location page and linked Terms support the inference that `Flex Storage Inc.` provides the advertised Tampa service; neither document establishes a Tampa-specific federal carrier number.
3. Flex's [Privacy Policy](https://www.goflex.com/privacy-policy), revised 2026-07-17, independently identifies `Flex Storage Inc.` and its parent, subsidiaries and affiliates as “Flex” for the same website and services. This is corroboration, not a regulator record.

## Retained Florida regulator evidence

The original retained FDACS legacy mover export is [`data/state-hhg/fl/fdacs-legacy-im-active.xls`](../../data/state-hhg/fl/fdacs-legacy-im-active.xls), an HTML-table-format `.xls` file. Its line **967** contains one row:

| Legal name | Address | Phone | Email | Credential | Issue | Expiry | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| FLEX STORAGE INC | 1065 SW 8TH ST, MIAMI, FL 33130-3601 | 888-990-3539 | info@flex.storage | Intrastate Mover `IM3819` | 2023-11-03 | 2027-11-03 | Registered |

Original export SHA-256: `2338e89a48106de6b2c401e2c7e1941b0454c82f324e0f2d9a7d27e8c30ec7dc` (394,155 bytes). The parsed retained [`fdacs-legacy-im-active.json`](../../data/state-hhg/fl/fdacs-legacy-im-active.json) identifies source `fdacs_legacy_xls`, retrieval time `2026-08-21T03:03:00.869Z`, 1,286 records, and the IM3819 record at lines **6741–6752**. Its SHA-256 is `c7d6112bd2345c8cc025785bd1560b8f59687a7c0387ffa44247a8feb3707dfe`. TrustHub's [authority cohort](../../docs/task-011b-fl-verified-authority-cohort.json) at lines **12069–12092** preserves `sourceUrl = https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx`, `retrievedAt = 2026-08-21T03:29:40.443Z`, `sourceAuthorityId = IM3819`, `legalName = FLEX STORAGE INC`, and `canonicalCompanyId = null`, with `verificationState = UNRESOLVED` at that time.

This is a **retained August 2026 regulator-derived extract**, not a current live FDACS lookup. It names the Miami legal entity and license; it does not list the Tampa location. The current [FDACS business lookup](https://csapp.fdacs.gov/CSPublicApp/BusinessSearch/BusinessSearch.aspx) says records may reside in either its legacy or new database during migration. No current live FDACS lookup result is claimed here.

## Florida corporate record and federal cross-check

Florida Division of Corporations [entity detail](https://search.sunbiz.org/Inquiry/corporationsearch/SearchResultDetail?aggregateId=forp-f22000002365-7e7fb408-b6fe-496f-ac89-246488c8ca7a&directionType=ForwardList&inquirytype=EntityName&listNameOrder=FLEXSTORAGE+F220000023650&searchNameOrder=FLEXSTORAGE+F220000023650&searchTerm=FLEXSTAKE%2C+INC.), inspected 2026-11-07: `FLEX STORAGE INC.`, foreign profit corporation, document `F22000002365`, Delaware incorporation, Florida status `ACTIVE`, principal address `1065 SW 8TH ST., Miami, FL 33130`; 2026 annual report filed 2026-03-01. This confirms the legal entity's existence and status. It does **not** name the Tampa branch.

The [FMCSA SAFER snapshot](https://safer.fmcsa.dot.gov/query.asp?query_param=USDOT&query_string=4148650&query_type=queryCarrierSnapshot&searchtype=ANY) identifies `FLEX STORAGE INC` at the Miami address with USDOT `4148650` and MC `1592127`. Neither federal number is tied to the Tampa branch by this packet, so neither may be written to `flex-moving` without separate authority evidence.

## Identity chain and limits

Stored Tampa Place (same address, phone, domain) → Flex's Tampa page (address, phone, IM3819 claim) → Terms on that domain (Flex Storage Inc. as provider) → retained FDACS export (IM3819 assigned to FLEX STORAGE INC) → active Florida corporate filing. This is a candidate, auditable bridge for a state-license-based independent legal identity. CoS/B1 must independently verify the source pages, the retained row/hash, the stored Place values, and the ZIP discrepancy. The current rating remains correctly withheld until a reviewed row-specific `verification_sources` repair and classifier change are separately approved.

## Smallest implementation proposal (not implemented in this packet)

Use the existing `public.companies.verification_sources` JSONB column. Add one reviewed `independent_legal_identity` object **only** to `id = 'flex-moving'`, preserving every existing key including `google`; no bulk update, rating write, or sibling update. The proposed payload shape is:

```json
{
  "independent_legal_identity": {
    "company_id": "flex-moving",
    "place_id": "ChIJSxirsajpwogRvVyq2ABVg98",
    "legal_name": "FLEX STORAGE INC",
    "jurisdiction": "FL",
    "credential_type": "intrastate_mover_registration",
    "credential_number": "IM3819",
    "source": {
      "system": "fdacs_legacy_xls",
      "record_id": "FL-FDACS-IM-3819",
      "url": "https://csapp.fdacs.gov/cspublicapp/businesssearch/businesssearch.aspx",
      "retrieved_at": "2026-08-21T03:03:00.869Z",
      "artifact_sha256": "2338e89a48106de6b2c401e2c7e1941b0454c82f324e0f2d9a7d27e8c30ec7dc",
      "row_locator": "data/state-hhg/fl/fdacs-legacy-im-active.xls:967"
    },
    "first_party_relationship": {
      "location_url": "https://www.goflex.com/movers/fl/tampa",
      "terms_url": "https://www.goflex.com/terms",
      "location_address": "5815 Memorial Highway, Suite B, Tampa, FL 33626",
      "phone": "(813) 452-4976",
      "domain": "goflex.com",
      "license_claim": "IM3819",
      "observed_at": "2026-11-07"
    }
  }
}
```

Before any write, resolve the ZIP discrepancy and obtain CoS/B1 acceptance of the exact payload. Never place this state-license legal name in `fmcsa_legal_name`; never infer USDOT or MC from the Miami entity's FMCSA record. A draft repair should use an exact `id = 'flex-moving'` predicate and an expected-current-JSON/Place guard, with a one-row assertion; it must not execute as part of this packet.

The classifier change should only recognize `verification_sources.independent_legal_identity` after strict validation: object shape and required nonempty fields, trusted source system plus pinned artifact hash, source record and credential consistency, parseable dates, `company_id` and `place_id` equal to the holder, first-party domain equal to the stored Google domain, address/phone agreement after conservative normalization, and independent legal name. Thread the validated object through existing profile, directory, and backfill holder mapping. Treat malformed/free-text/untrusted evidence as absent. Use the validated legal name for the existing legal-identity and shared-place conflict comparisons; leave name/location scoring, enumeration, raw Google snapshot and rating values unchanged. The holder remains withheld if any condition fails.

Proposed code files: `lib/verification/rating-provenance.ts`, `lib/supabase/queries/companies.ts`, `lib/verification/persist-google-snapshot.ts`, `types/index.ts`, and a small validator module under `lib/verification/`. Add focused cases to `lib/verification/rating-provenance.test.ts` and holder-mapping tests as needed. No schema migration is needed because `verification_sources` already exists.

Test plan: validated Tampa evidence classifies `flex-moving` as `rightful_owner` only with a complete holder enumeration and existing score/location gates; deleting the object restores withheld status and preserves raw Google evidence; a prose string, malformed object, wrong source/hash, wrong Place ID, or mismatched address/phone/domain fails closed; Brooklyn and Orlando Flex rows do not inherit Tampa evidence; two different validated legal entities sharing a Place remain withheld; existing USDOT and `fmcsa_legal_name` fixtures stay unchanged. Run the focused rating-provenance and company-query suites plus TypeScript typecheck on the draft branch, then have B1 independently reproduce the source and behavior checks.
