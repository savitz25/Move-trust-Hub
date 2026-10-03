# Move production environment packet (Vercel project `move-trust-hub`, Production scope)

No values are recorded here. Signing keys are written by the Ask repo script
`scripts/release/mth-v2-prod-secrets.mjs`; the database secret is typed once by
the operator. Nothing from the preview branch is reused.

| Name | Value | Notes |
| --- | --- | --- |
| `NEXT_PUBLIC_MOVE_PARENT_SAVE_ENABLED` | `1` | bundled at build; rebuild after changing |
| `NEXT_PUBLIC_MOVE_PARENT_SAVE_CANARY_SLUGS` | `hindman-isaacs-moving-storage-inc,gentle-giant-moving,caraway-moving-inc` | widening canary: one-click My TrustHub sync runs ONLY on these three profile pages; every other surface keeps current production behaviour. Bundled at build; rebuild after changing. Remove only after the live three-mover proof passes. See `widening.md`. |
| `MTH_MOVE_PARENT_SAVE_MODE` | `production` | set to anything else to roll the runtime back without a rebuild |
| `MTH_MOVE_PARENT_SAVE_PRODUCTION_APPROVED` | `true` | operator attestation |
| `MTH_MOVE_PARENT_SAVE_PRODUCTION_PROJECT` | `arepfylnilkjmyduhwbz` | exact pin |
| `MTH_MOVE_PARENT_SAVE_MOVE_ORIGIN` | `https://www.movetrusthub.com` | exact pin |
| `MTH_MOVE_PARENT_SAVE_PARENT_ORIGIN` | `https://www.asktrusthub.com` | exact pin |
| `MTH_MOVE_PARENT_SAVE_FORM_PATH` | `/my/profile-save` | |
| `MTH_MOVE_PARENT_SAVE_SOURCE_BACKEND` | `production-move-reader` | attestation name, not a project ref |
| `MTH_V23_MOVE_PRODUCTION_SOURCE` | `production-move-reader` | publication attestation name |
| `MTH_V23_MOVE_PRODUCTION_SOURCE_APPROVED` | `true` | |
| `MTH_MOVE_PARENT_SAVE_DATABASE_HOST` | the project's session pooler host, e.g. `aws-0-<region>.pooler.supabase.com` | exact pin for the URL host |
| `MTH_MOVE_PARENT_SAVE_DATABASE_URL` | `postgresql://mth_move_v23_prod.arepfylnilkjmyduhwbz:<password>@<session host>:5432/postgres` | secret; password from step 3.3 |
| `MTH_MOVE_PARENT_SAVE_DATABASE_CA` | Supabase CA certificate PEM | secret |
| `MY_TRUSTHUB_V23_MOVE_KEY_ID` | `move-v23-prod-<date>` | written by the script |
| `MY_TRUSTHUB_V23_MOVE_SIGNING_PRIVATE_KEY_PEM` | ed25519 private PEM | secret, written by the script |
| `MY_TRUSTHUB_V23_ASK_KEY_ID` | `ask-v23-prod-<date>` | written by the script |
| `MY_TRUSTHUB_V23_ASK_VERIFY_PUBLIC_KEY_PEM` | ed25519 public PEM | written by the script |

Must NOT be set in production: `MTH_MOVE_PARENT_SAVE_ISOLATED_APPROVED`,
`MTH_MOVE_PARENT_SAVE_PARENT_PROTECTION_BYPASS`, `MTH_V23_MOVE_ISOLATED_SOURCE*`,
`NEXT_PUBLIC_MOVE_ISOLATED_AUTH_*`. The code refuses the production pair if the
isolated approval is present.

The browser hand-off validator admits exactly
`https://www.asktrusthub.com/my/profile-save` in addition to the reviewed
preview/test hosts; no other production host or path is ever posted to.
