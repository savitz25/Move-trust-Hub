# My Move Plan Wizard — Design Spec

**Date:** 2026-07-13  
**Status:** Approved (Approach A — in-page homepage wizard)

## Goal

Replace the dual homepage CTAs (“Find Trusted Movers” / “Get My Move Estimate”) with a single gamified journey that delivers a personalized move report **before** any account gate.

## Principles

1. Value-first: full report unlocked without registration.
2. Account optional: Save My Move only to email/persist.
3. Educate: shortlist of 3 = comparable estimates on same inventory.
4. Outreach is a tool (copy/mailto), not a tip.

## Structure

| UI phase | Steps | Visual tone |
|---------|--------|-------------|
| Plan | Route (From / To ZIPs) | Sky — focused route entry |
| Build | Shortlist (max 3) → Inventory (templates) | Violet — selection + live load metrics |
| Book | Report Ready (conversion) | Emerald — celebratory payoff |

**Readiness score (0–100):** route +20, shortlist +20, inventory +40, report +20. On the report step the score is an achievement badge (not a tiny pill).

### Report Ready (Book) hierarchy

1. Celebratory header + readiness achievement  
2. Unified quote-brief card (route · load · truck) with inventory preview toggle  
3. Primary full-width CTA: **Send report to all N movers**  
4. Compact shortlist checklist + ⋯ overflow (copy template / email / profile / remove)  
5. “What happens next” (reply time, same inventory, no lead resellers)  
6. Tertiary links: edit inventory, copy plan, save My Move

## Technical

- State: React + `sessionStorage` key `mth-my-move-plan-v1`
- APIs: existing `/api/home-route`, presets from `lib/moving-calculator/move-presets`
- Auth: `useSaveMyMoveOptional` after report
- Entry: `HomeRouteFlow` re-exports `MyMovePlanWizard`

## Optional password (post-value upgrade)

After the report (or first Save My Move sign-in), customers may create an optional password for faster logins — same standards as the Verified Mover Portal (Supabase Auth, strength rules, skippable). Magic link remains the default. Manage under **My Move → Settings**.

## Estimate email + profile back-nav

- **Email** on the report shortlist requires My Move sign-in (modal if signed out), then opens a prefilled estimate-request draft. Pending outreach is stashed across auth.
- Profile links use `?from=/#my-move-plan` so company **Back to My Move Plan** returns to the homepage wizard; plan state lives in `sessionStorage` (`mth-my-move-plan-v1`).

## Out of v1

- PDF email send, public inventory URL, Apple login, full room-by-room wizard UI