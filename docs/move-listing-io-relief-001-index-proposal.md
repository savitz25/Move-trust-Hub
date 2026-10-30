# MOVE-LISTING-IO-RELIEF-001 index proposal

Do not apply this statement. It is not a migration and it is not authorized for Production.

## Why the current indexes do not cover the listing sort

The default directory order, in `directory_query_page` and in `PLAIN_REPUTATION_LISTING_SQL`, is:

```sql
ORDER BY COALESCE(reputation_score, 0) DESC, id ASC
```

Null `reputation_score` sorts with zero. `id ASC` is the page tie-breaker.

Already present:

- `idx_companies_reputation` on `(reputation_score DESC)` has no `id` tie-breaker and does not match the `COALESCE` expression.
- `idx_companies_scope_reputation` on `(service_scope, reputation_score DESC, id ASC)` leads with `service_scope`. The default listing predicate is `service_scope IS DISTINCT FROM 'intrastate'`, so that index is not the default browse order.

The PostgREST plain-listing fallback orders `reputation_score DESC NULLS LAST, id ASC`. That matches the SQL order only when `reputation_score` is not null. Published rows use default `0`.

## Proposed index

```sql
CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_companies_default_listing_reputation
  ON public.companies ((COALESCE(reputation_score, 0)) DESC, id ASC)
  WHERE (
          publication_state IS NULL
       OR publication_state IN ('PUBLISHABLE', 'INDEXABLE', 'VERIFIED')
        )
    AND service_scope IS DISTINCT FROM 'intrastate';
```

Use `CONCURRENTLY` outside a transaction. Build it on a disposable database first. Do not run `EXPLAIN ANALYZE` for this query on the stressed Production database.

This index serves the plain reputation listing only. Rating, price, complaint, role, state, and search orders stay on their existing plans. Complex filters still call `directory_query_page`, which selects `companies.*` before sorting. Replacing that function is a separate database change and is not part of this proposal.
