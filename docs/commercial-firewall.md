# Commercial firewall

## Status: PASS by architecture

Paid status must have zero effect on search order, eligibility, prominence, evidence, authority, classification, compare/shortlist inclusion, recommendation language, warnings, or regulatory interpretation.

The firewall has three controls:

1. **Storage separation:** subscription state is in `move_v2_commercial`, outside `move_v2`; `anon` and `authenticated` have no schema/table grants.
2. **Code separation:** public decision inputs contain provider ID, classification, evidence strength, and move eligibility only. No function accepts both public decision inputs and commercial state.
3. **Regression protection:** mandatory test 15 asserts the public decision output has no subscription state and is invariant to commerce.

Future billing can power analytics, alerts, monitoring, teams, multi-location tools, provider-published data management, APIs/webhooks, attribution, and reporting. It may authorize private console capabilities, but it cannot flow into a public provider read model or decision query.

Code review rule: any import from a commercial module into classification, eligibility, public search, compare, shortlist, warnings, or evidence is a release blocker.
