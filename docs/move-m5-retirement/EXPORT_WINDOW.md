# Legacy export window

Successor of `6ced7362ab7c569247e000d09dd0d0f004ff1654`. That commit is unchanged.

`LEGACY_EXPORT_WINDOW_DAYS` stays 180. That value is the access window. A user-initiated export keeps older rows in the JSON and sets `accessWindow` to `outside`. Rows inside the window use `inside`. Future rows, unknown tables, and unreadable dates stay in `omitted`. The caller-supplied array is not mutated and nothing is deleted.

`LegacyPageBanner` and `LegacyExportControl` return null unless `MY_MOVE_RETIREMENT_PREP` is exactly `1` on a non-production project. No page imports either component. The export control does not fetch. Production project `prj_gudPGeW9SZBkgiL8zxvi3Swfo6T0` / `move-trust-hub` stays inactive.
