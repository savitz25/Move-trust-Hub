# FMCSA ingestion pipeline

The pipeline is release-aware and streaming:

1. verify official metadata and dictionary;
2. stream each official bulk export to a dated immutable artifact and hash it;
3. validate headers, row counts and parsing;
4. scan the Census identity universe without holding it in memory;
5. select HHG relevance using official HHG cargo/authority or an exact V1 USDOT QA match;
6. normalize provider, authority, history, insurance, suspension and BOC-3 evidence;
7. classify with `MOVE_CLASSIFICATION_RULESET_2026_08_V1`;
8. validate and publish the release atomically, leaving the prior published release intact on failure.

Stable provider IDs are deterministic UUIDs from the exact USDOT namespace. No fuzzy authoritative merges occur. Output is CSV for PostgreSQL bulk loading, not millions of JSON blobs. Re-running the same release produces the same provider IDs and source record keys; database uniqueness is `(source_release_id, source_record_key)`.

The 2026-08-16 build processed 4,485,162 Census rows in 328.98 seconds with zero parse failures and emitted 236.4 MB of normalized evidence. Eighty-eight rows lacked legal names and remain reported, not silently repaired.
