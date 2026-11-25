# Reconciliation with Ask CONTRACT-SCHEMA-KEY-v1

Ask head `245f626581c662f7380dadb71d1e22dcda7ee428`. The registry publishes one approved key, `move.inventory/v1`. Further keys wait for a hub proposal. The earlier `move.tool.*` names do not match the contract pattern `hub.type/vN`.

| Device key | Contract key | Status at 245f6265 |
| --- | --- | --- |
| `move-calculator-inventory` | `move.inventory/v1` | approved |
| `mth-my-move-plan-v1` | `move.plan/v1` | proposed |
| `mth-my-move-plans-library-v1` | `move.worksheet/v1` | proposed |
| `mth-quote-check-compare-a-v1` | `move.comparison/v1` | proposed |
| `im-compare-storage` | `move.comparison/v2` | proposed |

The calculator page uses the inventory device key, which is the approved session. Saved movers stay on the device shortlist. They are not a session type in this contract.

A save sets `localCopy: keep`. The mock refuses an unapproved key, replays the same idempotency key, and conflicts when the body changes. Import writes only the device keys the caller selected. An empty selection writes nothing. No module calls `fetch` or `removeItem`.

`ADD_TO_MY_TRUSTHUB` must be exactly `1` on a non-production project. The production project id and name cannot turn it on. The page slots render nothing while it is off.
