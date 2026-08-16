-- Ambiguous candidates may legitimately reference the same Place ID; only accepted identities are unique.
alter table move_v2.google_place_match drop constraint if exists google_place_match_place_id_key;
create unique index if not exists google_place_match_accepted_place_idx on move_v2.google_place_match(place_id)
where place_id is not null and match_status in ('GOOGLE_MATCH_HIGH_CONFIDENCE','GOOGLE_EXISTING_MATCH_REUSED');
