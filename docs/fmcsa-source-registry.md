# FMCSA source registry — 2026-08-16

All sources were verified against the live U.S. Department of Transportation data portal and downloaded through its bulk CSV export. Counts are data rows; SHA-256 covers the exact downloaded artifact. Artifacts live outside Git under `.data/fmcsa/2026-08-16`.

| Source | Dataset | Era | Data updated (UTC) | Rows | Bytes | SHA-256 |
|---|---|---|---:|---:|---:|---|
| Company Census File | `az4n-8mr2` | MCMIS_CENSUS_CURRENT | 2026-08-15 10:52:32 | 4,485,162 | 1,114,025,287 | `a27d62ec46d67c2bb1de2b172cff12bcec0702d13f30d693107bb861223f777b` |
| Motus Carrier - All With History | `inys-ebih` | MOTUS_CURRENT | 2026-08-16 10:33:07 | 107,097 | 33,522,634 | `9f3fb74bcb24f5b33c6bf442b5ea6573198ca356de3090e39e5ae347c9672e3d` |
| Motus AuthHist - All With History | `yu5v-wbh6` | MOTUS_CURRENT | 2026-08-16 10:34:42 | 120,850 | 13,392,253 | `fb49afb4b555531ad17984421ad5e79c69acd654a991658ee71dd6c6ef2fceec` |
| Motus Insur - All With History | `c5y8-a4uz` | MOTUS_CURRENT | 2026-08-16 10:33:14 | 100,645 | 13,152,600 | `18d248d480b8cfe19c4b8c81cb8b47db26a2c65253c9c91dfb0225928223f106` |
| Motus BOC3 - All With History | `6snj-ed7q` | MOTUS_CURRENT | 2026-08-16 10:34:23 | 110,966 | 10,496,244 | `51673b59962350b8648654dea9fa737b379520e2fa5da44293cb105338a01caa` |
| Motus RevokeSuspend - All With History | `wb4f-neki` | MOTUS_CURRENT | 2026-08-16 10:32:47 | 9,956 | 1,416,113 | `1ba1acab515fdd61b60f1d5cf214f21d4fa84ef08b9eb76c28e8213a246193d9` |

The Census artifact is a 27-field projection of all 147-column source rows; it excludes officer/private-person fields. A second HHG docket projection has 183,444 rows, 5,002,768 bytes, SHA `5eda2e62b25d7550ffa04fd74deec3b5f63f90da370cda8f1fca21426aaf5091`.

Metadata updates were 2026-08-16 10:22:57 (Census), 10:32:54, 10:34:35, 10:33:08, 10:34:14, and 10:32:46 UTC respectively. Publisher: Federal Motor Carrier Safety Administration.
