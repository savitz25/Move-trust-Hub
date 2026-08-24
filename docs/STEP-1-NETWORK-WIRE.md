# Step 1 — Wire the network (Ask Trust Hub)

## Components
| Component | Path |
|-----------|------|
| Network seal | `components/network/ask-network-seal.tsx` |
| Network bar | `components/network/ask-network-bar.tsx` |
| Constants | `lib/network/ask-trust-hub.ts` |

## Wiring
- **Bar:** `HubChrome` mounts `AskNetworkBar` above `HubNavbar` for move / insurance / lender
- **Seal:** `HubFooter` + Move `footer.tsx` + Lender `Footer.tsx` (inverted on navy)

## Schema
- `lib/hub/schemas.ts` — `parentOrganization` on Move / Insurance / Lender orgs; Ask parent in graph
- Ask parent: `consumers-trust-hub/lib/seo/schemas.ts` `subOrganization` with prose names

## Contact emails
| Hub | Email |
|-----|--------|
| Move | hello@asktrusthub.com |
| Insurance | hello@asktrusthub.com |
| Lender | hello@asktrusthub.com |

## Heroes
- Lender + Insurance how-it-works / hero rewritten (vertical-specific, not noun-swapped)
