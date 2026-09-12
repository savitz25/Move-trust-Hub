# Separate review pass

Method: agent self-review in a separate diff pass, plus repository-native automated behavioral/contract tests and normal PR CI. No independent human review is claimed, and no sub-agent was used.

Reviewed raw/effective field provenance, source clock semantics, stable-key/fingerprint change handling, exact equality/pair gate, multiple/historical docket limits, publication and name selection, API legacy compatibility, official-link family/value, profile/DTO re-projection and safe rollback.

Findings fixed during review: legacy Ask consumer ignores additive integrity flags (disputed rows moved to a separate sidecar and existing failReason contract); additional authority constraints could still say APPLIED through a disputed MC (now unresolved); missing local source clocks could inherit the prior snapshot date (now null); changed USDOT must not inherit the earlier corroborated verification action; Trace must not call a disputed relationship an accepted exact identity; directory DTO inference made an optional added field required (explicit Company/null return type).

React checklist: no new client fetches, subscriptions, async waterfalls or third-party dependencies; small serializable public integrity object; type-only component import; semantic disclosure/heading and real anchors; explicit conditional rendering; bounded text, keyboard-native links/details, and responsive checks recorded separately. No color-only risk classification.

Final candidate build passed. Local browser proof: 24 completed cases, no page errors, 1280/390/320; Verify POST passed locally with Supabase mutations blocked. Preview build/CI passed; interactive preview requires login and was not bypassed. Canonical deployment receipt remains pending. This is a candidate review, not a production release certificate.

The last browser review corrected the MC criterion from applied to association-not-confirmed and made the USDOT verification label explicit. The suggestion adapter cannot reconstruct the disputed MC from user input. Keyboard Tab/focus and Enter on Trace passed (`keyboard.json`). Both mutations were rerun against the final runtime source; restoration returned 13/13 green.

Follow-up cache review: `getCompaniesCached` previously returned serialized objects directly. Re-project after cache reads so an old cached object cannot bypass field containment. Preserve its stored data hash when applying the guard. The new behavioral test executes the cache boundary with a pre-release cached object and a changed fingerprint. No cache settings, database rows or new background refreshes are changed.
