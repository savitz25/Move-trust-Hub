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

| UI phase | Steps |
|---------|--------|
| Plan | Route (From / To ZIPs) |
| Build | Shortlist (max 3) → Inventory (templates) |
| Book | Report + outreach + optional save |

**Readiness score (0–100):** route +20, shortlist +20, inventory +40, report +20.

## Technical

- State: React + `sessionStorage` key `mth-my-move-plan-v1`
- APIs: existing `/api/home-route`, presets from `lib/moving-calculator/move-presets`
- Auth: `useSaveMyMoveOptional` after report
- Entry: `HomeRouteFlow` re-exports `MyMovePlanWizard`

## Optional password (post-value upgrade)

After the report (or first Save My Move sign-in), customers may create an optional password for faster logins — same standards as the Verified Mover Portal (Supabase Auth, strength rules, skippable). Magic link remains the default. Manage under **My Move → Settings**.

## Out of v1

- PDF email send, public inventory URL, Apple login, full room-by-room wizard UI