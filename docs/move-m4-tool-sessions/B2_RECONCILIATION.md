# Reconciliation with Ask CONTRACT-SCHEMA-KEY-v1

Ask head `245f626581c662f7380dadb71d1e22dcda7ee428`. The registry publishes one approved key, `move.inventory/v1`. Further keys wait for a hub proposal. The earlier `move.tool.*` names do not match the contract pattern `hub.type/vN`.

| Device key | Contract key | Status at 245f6265 |
| --- | --- | --- |
| `move-calculator-inventory` | `move.inventory/v1` | approved |
| `mth-my-move-plan-v1` | `move.plan/v1` | proposed |
| `mth-my-move-plans-library-v1` | `move.worksheet/v1` | proposed |
| `mth-quote-check-compare-a-v1` | `move.comparison/v1` | proposed |
| `im-compare-storage` | `move.comparison/v2` | proposed |

The calculator page uses the inventory device key. The registered payload is the aggregate `{ room_counts: { total }, estimated_cubic_feet }`. Room total is an integer from 1 to 20. Estimated cubic feet is an integer from 50 to 20000. Item names, item ids, and the device key stay out of that payload. A device inventory that cannot project into those bounds is refused and the device copy is kept. Plan, worksheet, and comparison keys stay proposed and are not sent.

A save sets `localCopy: keep`. The summary is title, primary value, unit `estimated cubic feet`, and a room label. Resume accepts a UUID resume ref, rechecks the aggregate payload, and returns `https://www.movetrusthub.com/my-move` with the ref left out of the href. Cross-hub resume stays unavailable. The mock replays the same idempotency key and conflicts when the aggregate changes. Import writes only the device keys the caller selected. An empty selection writes nothing. No module calls `fetch` or `removeItem`.

`ADD_TO_MY_TRUSTHUB` must be exactly `1` on a non-production project. The production project id and name cannot turn it on. The page slots render nothing while it is off.
