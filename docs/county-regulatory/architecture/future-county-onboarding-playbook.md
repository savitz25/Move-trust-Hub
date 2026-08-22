# Future County Onboarding Playbook

**Task reference:** FL-C008  
**Status:** Playbook for future counties (FL and nationally portable). Design-only.  
**First production pilot:** Palm Beach (do not auto-start other production pilots).

---

## 1. When to onboard a new county

Onboard when:

- A ranking/discovery task identifies mover-specific regulation or high-value complaint/enforcement signals, **or**
- An ordinance-only pattern is needed to pressure-test the posture model, **and**
- Engineering capacity exists without colliding with state publication work.

Do **not** onboard solely to “fill a map.” Prefer counties that change architecture confidence or unlock Pilot-grade public evidence.

---

## 2. Posture determination (first gate)

Classify before acquisition:

| Question | If yes → |
|---|---|
| Separate mover credential + roster/application exists? | `CREDENTIAL_BASED` |
| Ordinance regulates movers but no separate public credential? | `ORDINANCE_ONLY` |
| Unclear? | Research `program-verification` until classified; do not invent credentials |

Record Monitoring vs Licensing agency language when present (Pinellas lesson).

---

## 3. Standard task sequence

1. **Discovery / ranking** — official pages only; Places APIs = 0.
2. **Acquisition & staging** — raw + normalized under `data/county-regulatory/<state>/<county>/`; provenance hashes; consumer PII = 0.
3. **Qualification** (only if public/PRA roster sufficient) — fail-closed FDACS/state crosswalk; precision gate; versioned evidence package.
4. **Architecture pressure check** — confirm concepts fit CREDENTIAL_BASED / ORDINANCE_ONLY model; note NEW concepts.
5. **Production integration spec** (design-only) — only for selected pilot counties (Palm Beach first).
6. **Controlled internal publish** — separate later task; never bundled with acquisition.

Skip qualification when there is no roster to qualify (Pinellas pattern) — capture complaint/ordinance patterns instead.

---

## 4. Required staging outputs (minimum)

- `program-verification.json` (posture, ordinance, agency)
- `source-interfaces.json`
- `roster-completeness.json` or equivalent coverage class
- Credential or mover-regulatory records file (may be empty for ordinance-only)
- Complaint / disposition / enforcement profiles as applicable
- `fdacs-matchability.json` or `NOT_APPLICABLE_NO_PUBLIC_ROSTER`
- `fl-cNNN-summary.json` with safety counters
- `meta/raw-provenance.json`
- Validator script asserting Places=0, writes=false, migrations=0, PII=0

---

## 5. Capability matrix checklist

For each capability, record coverage class:

- Credential roster
- Identity/contact
- Owner/officer
- LBT / business tax (secondary only)
- Branch
- Vehicle/fleet
- Insurance (requirement vs policy vs compliance)
- Complaint intake / history window
- Disposition catalog
- Enforcement / hearings / finality
- Zero-result semantics

Mark `SCHEMA_ONLY` vs observed rows explicitly.

---

## 6. Hard rules (carry forward)

1. LBT ≠ mover authority.
2. COMPLAINT ≠ DISPOSITION; ENFORCEMENT_EVENT ≠ FINAL_OUTCOME.
3. REQUIREMENT_DOCUMENTED ≠ CURRENT_POLICY_OBSERVED ≠ COMPLIANCE_VERIFIED.
4. SCHEMA_ONLY ≠ company observation.
5. Fail closed identity matching.
6. County evidence does not change Trust Score in V1.
7. Zero-result ≠ complaint-free.
8. Do not overload `provider_state_authority` with county credentials.
9. Do not reorganize existing county pilot trees.
10. Do not touch Builder 1 state publication paths during county tasks.

---

## 7. PRA handling

- Prefer public interfaces first.
- Draft PRA; do not send unless a follow-on task authorizes.
- Label gaps `PRA_REQUIRED` without blocking acquisition completion when docs/schema are rich.

---

## 8. National / network reuse

Reuse adapter contract, lifecycle, conflict model, and observation layers for:

- Other FL counties
- Out-of-state county/local mover programs
- Adjacent hubs where local licensing vs ordinance patterns appear (catalog only until separate tracks exist)

Accela-style complaint-history and ordinance-without-credential patterns are explicitly reusable.

---

## 9. Done criteria for a new county acquisition

- Posture classified
- Safety counters green
- Validator passes
- Recommended next task recorded (qualify **or** skip to architecture/pilot decision)
- No production writes / migrations / Places / PII
