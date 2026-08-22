# PBC-PROD-001 Rollback

## Preferred: data-only rollback

```bash
node scripts/ingest-pbc-prod-001-wave-a.mjs --rollback --manifest-hash <EXACT_MANIFEST_HASH>
```

Deletes only `provider_county_credential` rows with that `manifest_hash`.

Dry-run first:

```bash
node scripts/ingest-pbc-prod-001-wave-a.mjs --rollback --manifest-hash <EXACT_MANIFEST_HASH> --dry-run
```

## Schema

Leave `county_regulatory_program` / `provider_county_credential` in place unless the migration itself is defective.

## Must remain untouched

- `companies`
- `provider_state_authority`
- `provider_contact_observation`
- Trust Score
- publication_state / indexable
