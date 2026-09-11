# TH-SEARCH-R1-005 diagnosis / source matrix

Model: GPT-6 Astra / High, USER-CONFIRMED; no independent session metadata claim.
Baseline: 866bde6eeeed692d23257c7de75ebca38cb11e78. Production: dpl_9hEL1KKUeNK6vsDLxVgKyMTojqRY at www.movetrusthub.com.
Fresh branch/worktree th-search-r1-005. Visible worktrees, branches, open PRs and task-related processes showed no overlapping R1-005/MT-T1 assignment. Old Move PRs1-3 and Ask PR134 untouched.

## Root cause / before proof

On 2026-09-11, API and settled native page for `JK Moving Services licensed?` returned4,321 unrelated carrier-directory profiles. Native completion2,779ms at1280px; before-api.json and before-native.png. The unchanged-code test failed on undefined nameQuery (red-before.log).

The parser excluded industry words from bare names and did not extract the licensing suffix. Its final implicit-carrier branch replaced the subject with a cohort. lookupName searched display-name substring only. cardFromCompany inferred a DBA from unequal display/legal names. The planner rejected name overrides or interpreted company words as cohort geography.

## Source / candidate matrix

|Source|Fields and evidence|Use|
|---|---|---|
|public.companies|name, fmcsa_legal_name, id, USDOT/MC, headquarters, publication_state|Existing publication-filtered directory_search_suggestions RPC; existing lower-name B-tree/trigram indexes. No schema/index changes.|
|companies.fmcsa_raw.dbaName|Actual stored FMCSA carrier DBA, consumed by existing Verify/enrichment code|Project only this scalar for retrieved IDs. No raw object sent to browser. Display/legal inequality proves no DBA.|
|Stored role/authority|entity_type, authority_active, fmcsa_last_checked|Source role, not name inference. Boolean authority label discloses missing detailed Common/Contract/Broker status. Official effective time unavailable.|

Independent read-only SQL established JK exact display identities USDOT1065394 and1300300; the former stores DBA JK MOVING SERVICES. SHIFL INC/3244649 and ALLIED VAN LINES INC/76235 are independent positives. source-oracle.json records source values, publication and stored check clocks; this is not a live regulator certification.

No separately indexed DBA/alias column exists in companies. Search uses acquired legal/display fields and corroborates retrieved names with actual stored DBA. An alias absent from searchable names may remain undiscoverable; every result discloses this limitation. No invented alias relationship, full raw JSON scan, or acquisition.

## Execution and bounds

executeMoveRequest/planMoveRequest remains the common homepage/native/API boundary. Name, task and trailing conditions survive. Explicit identifiers retain R1-001 behavior; definitions, cohorts, journeys, guidance, ranking and state limitations remain separate.

At most two existing RPC calls (full name and distinctive terms),100 references each; at most200 records hydrated by IDs. Full-name retrieval protects exact positives; distinctive retrieval avoids the legacy RPC discarding short JK amid generic-word matches. Publication/name predicates precede RPC bounds. JSON RPC values never enter SQL/PostgREST grammar. The80-character source limit is checked before execution, with no silent truncation.

Every shown row independently requires normalized source-field equality or all distinctive tokens in one source field. Generic industry/legal-suffix overlap alone is insufficient. Exact/normalized names precede relaxed candidates; stable name/ID ties. Maximum10 displayed candidates, disclosed caps, displayed-candidate counts only. Distinct identities are never merged by name.

Selection carries original q/overrides and public company ID. The server refetches publication-eligible evidence and revalidates name relevance. No client status/name/URL is trusted. Stale, held or unrelated selections clarify. Identity candidates do not prove the company on a quote, affiliation, license approval or service territory.

## Compatibility / deferred work

Read-only Ask lib/network/move-ask.ts inspection: existing move-ask-v1 mode/results/name/identifier/whyMatched/count/provenance fields remain. Name metadata, selection links, legal/DBA fields and entity keys are additive. No parent edits. Existing SAFER URL builder uses validated returned identifiers.

Deferred: alias-only index, broad spelling coverage, complete jurisdictional licensing, local service territory, ownership/complaint joins, Ask routing and Senior work. No DB writes. Rollback is a reviewed revert/deployment of this ticket only. Self-review/automated review is not independent human review.
