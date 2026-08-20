# Task 002 — Federal identity & collision remediation

Retrieved from FMCSA QC Mobile API on 2026-08-20. Google Places API requests: **0**.

Starting main: `da083ba2e95cdcc22625db6ba28b6fa103d87f02`.

## What 125563 actually is

USDOT **125563 is not a fake placeholder**. It is the authentic FMCSA registrant:

- Legal name: `MAYFLOWER TRANSIT LLC`
- DBA: `AERO MAYFLOWER TRANSIT COMPANY`
- Active HHG common, contract, and broker authority (MC-2934)
- `authorizedForHouseholdGoods=Y`

Production had copied that Mayflower number onto Allied, Atlas, Wheaton, Graebel, and Arpin.

## Relationship architecture

`provider_relationship` was **not** added.

Existing columns already store brand vs legal entity (`name` vs `fmcsa_legal_name`). Van-line vs agent is explained in profile copy. There are no agent company rows to link, and SIRVA is not a directory identity. A new table would not have made these collisions safer.

## Publication

Restored to PUBLISHABLE/indexable only where FMCSA assigned a unique current authority to that legal entity. Graebel Van Lines LLC (USDOT 220843) has inactive authority — collision cleared, profile remains `REVIEW_REQUIRED`. Northern Michigan rows remain `REVIEW_REQUIRED` because the FMCSA registrant does not match the consumer-facing listing.
