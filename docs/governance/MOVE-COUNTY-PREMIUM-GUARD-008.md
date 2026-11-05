# Move county Premium cap disposition packet

Baseline: `da08e31276f105cc4d358c76be9f1930dcc8936f`.

## Reproduced classification

The existing circuit breaker reported 1,695 indexable counties as Tier 1 and failed its 400 limit. The canonical Phase 3 scorer actually classifies these as:

| Phase 3 class | Count | Guard treatment |
| --- | ---: | --- |
| Premium Tier 1, intelligence pack | 199 | Counts toward the fixed Premium cap |
| Premium Tier 1, deep research | 209 | Counts toward the fixed Premium cap |
| **Premium Tier 1 total** | **408** | **Eight over the cap; CI remains red pending disposition** |
| Standard Tier 2 | 1,287 | Remains indexable; excluded from Premium cap |

The source of truth is `evaluateCountyIndexability()` and its `seoTier` value. The sitemap includes both `tier === 'index'` categories. The guard correction does not change page eligibility, metadata, sitemap output, or publication state.

## Candidate inventory and review priority

[`MOVE-COUNTY-PREMIUM-GUARD-008.csv`](./MOVE-COUNTY-PREMIUM-GUARD-008.csv) contains all 408 current Premium candidates and scorer evidence. The report generator fails if the candidate count or a required quality score is missing.

Priority order is deterministic: lowest existing quality score, then fewer explicit county movers, fewer true-local movers, fewer uniqueness points, fewer utility points, then state and county slugs alphabetically. The first eight review-priority rows are:

1. New York / Broome — score 76; 14 explicit movers; 0 true-local; 12 uniqueness points; 8 utility points.
2. New York / Cayuga — score 76; 14 explicit movers; 0 true-local; 12 uniqueness points; 8 utility points.
3. New York / Chautauqua — score 76; 14 explicit movers; 0 true-local; 12 uniqueness points; 8 utility points.
4. New York / Chemung — score 76; 14 explicit movers; 0 true-local; 12 uniqueness points; 8 utility points.
5. New York / Clinton — score 76; 14 explicit movers; 0 true-local; 12 uniqueness points; 8 utility points.
6. New York / Jefferson — score 76; 14 explicit movers; 0 true-local; 12 uniqueness points; 8 utility points.
7. New York / Oneida — score 76; 14 explicit movers; 0 true-local; 12 uniqueness points; 8 utility points.
8. New York / Ontario — score 76; 14 explicit movers; 0 true-local; 12 uniqueness points; 8 utility points.

These are a review queue, not a recommendation to downgrade them. The first eight tie on every quality measure used above; alphabetical slug order makes the review queue reproducible but does not establish that these counties are uniquely less deserving than tied candidates. There are 15 candidates in this lowest-evidence tuple. No county is automatically downgraded or removed by this patch.

## Founder decision MOVE-PREMIUM-DEMOTE-002

The cap stays 400. Broome, Cayuga, Chautauqua, Chemung, Clinton, Jefferson, Oneida, and Ontario move from Premium Tier 1 to indexable Standard. Oswego, St. Lawrence, Steuben, Sullivan, Tompkins, Ulster, and Warren stay Premium. Evidence columns on the eight rows are unchanged. Premium Tier 1 is 400 after this demotion. Standard Tier 2 stays indexable and does not count toward the cap. This change is not deployed.

## PR #224 relationship

PR #224 changes county-profile slug resolution and adds a canonical-profile-slug test. This PR does not change those files or profile-link behavior. #224 changes `.github/workflows/county-compliance.yml`; this PR adds a separate focused test workflow, so the workflows can integrate without mixing the link correction into this change. #224's link test does not count toward this Premium cap.
