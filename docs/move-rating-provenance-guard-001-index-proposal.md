# MOVE-RATING-PROVENANCE-GUARD-001 index proposal

Do not apply this statement. It is not a migration and it is not authorized for Production.

## Why this is separate from the code change

Card and profile rating selection stays in memory on the row already loaded. That path does not query other companies and does not need a new index.

The enrichment write path looks up other companies that already store the same Google `place_id` before it attaches a listing. The lookup reads:

- `verification_sources->google->>place_id`
- `google_data->>place_id`

No current index matches either expression. A sequential scan is acceptable for a single reviewed write. It is not acceptable as a reason to skip the review or to delete shared associations.

## Proposed indexes

```sql
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_companies_google_sources_place_id
  ON public.companies ((verification_sources->'google'->>'place_id'))
  WHERE verification_sources->'google'->>'place_id' IS NOT NULL;

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_companies_google_data_place_id
  ON public.companies ((google_data->>'place_id'))
  WHERE google_data->>'place_id' IS NOT NULL;
```

Use `CONCURRENTLY` outside a transaction. Build both on a disposable database first. Do not run `EXPLAIN ANALYZE` for this lookup on the stressed Production database.

These indexes do not change directory sort, pagination, `minRating` eligibility, or the listing cache. Applying them is a separate dependency.

## Simultaneous writers

The holder check is a read followed later by an update. It is not a transaction and there is no unique constraint on a Google `place_id`. Two enrichment writers can both receive a successful empty holder read and both attach the same listing before either update commits. A failed lookup does not take that path: failure stays a review and is not treated as proof that the place is unclaimed. A successful empty read still means "no holder was visible," which is not the same as a lock.

The read also stops at 25 rows from each JSON location. A conflicting holder past that cap is not seen. Closing either gap requires a database constraint or a single-writer lock. That is a separate schema change and is not applied here.
