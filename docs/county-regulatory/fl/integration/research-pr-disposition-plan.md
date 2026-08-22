# Research PR Disposition Plan (post–selective transplant)

## During C010

Do **not** close or merge:

#45, #48, #51, #52, #54, #56, #58, #60, #62, #64 (C010)

## After future integration PR (FL-C011) merges

For each historical research PR:

1. Keep historical references (links in audit doc).
2. **Close without merge.**
3. Comment linking to the final selective-transplant integration PR.
4. Document that content was selectively transplanted per `FL_COUNTY_RESEARCH_V1_TRANSPLANT_MANIFEST`.

## Audit preservation

Maintain a table:

| Original PR | Original head SHA | Final transplanted paths | Transplant commit | Validation result |

Traceability: `C001 → C010` remains auditable even though commits do not land sequentially on main.
