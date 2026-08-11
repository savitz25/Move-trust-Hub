# Stage B.1 QA (Move)

1. Open a city destination hub.
2. Confirm DevTools → Application → Local Storage has `ath:research-session:v1` with `src=move`, `journey=relocate`, state (and county when known).
3. Toggle **I may buy** → session `intent` becomes `buy`.
4. Click Lender handoff → URL carries matching params.
5. Toggle **I plan to rent** → session and Insurance-primary cards update; no account modal.
