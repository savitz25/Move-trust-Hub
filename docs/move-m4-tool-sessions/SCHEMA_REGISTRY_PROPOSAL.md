# Move tool-session schema proposal

Status: proposal for CoS to hand to B2. Move does not register these keys on Ask. No route sends them. `TOOL_SESSION_EXPORT_ENABLED` is false.

Version: `move-tool-session/1`.

| schema_key | device key | storage | legacy table |
| --- | --- | --- | --- |
| `move.tool.inventory.v1` | `move-calculator-inventory` | localStorage | `saved_inventories` |
| `move.tool.plan.v1` | `mth-my-move-plan-v1` | sessionStorage | none |
| `move.tool.plan-library.v1` | `mth-my-move-plans-library-v1` | localStorage | none |
| `move.tool.comparison.v1` | `mth-quote-check-compare-a-v1` | sessionStorage | none |
| `move.tool.compare-storage.v1` | `im-compare-storage` | localStorage | `saved_comparisons` |
| `move.tool.saved-movers.v1` | `mth-local-saved-movers` | localStorage | `saved_movers` |

`requestKey` is the SHA-256 hex of `schemaKey`, a newline, and the canonical JSON of the payload. `resumeRef` is that same string. A second export of the same payload produces the same key.

Add to My TrustHub copies the device JSON into the handoff object. It does not remove the device key. Resume in Move writes that one key back when `resumeRef` matches the payload digest. A mismatch writes nothing.

Signed-out inventory, calculator, quote check, plan, compare, and saved-mover keys stay on the device. This proposal does not change those readers or writers.
