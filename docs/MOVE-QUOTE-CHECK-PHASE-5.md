# Move Quote Check — Phase 5 PDF / Image Upload

## Goal
Optional upload of estimate PDF/image to **prefill** Quote Check fields.  
The questionnaire + deterministic rules engine remain the source of truth.

## Supported inputs
| Type | Behavior |
|------|----------|
| PDF (text layer) | Client binary text harvest → paste-parse prefills |
| PDF (scan-only) | Often low confidence → guided fallback |
| PNG / JPG / WEBP | Best-effort OCR via dynamic CDN Tesseract when network allows; else guided fallback |
| Plain `.txt` | Direct text scan |
| Max size | **8 MB** |

## Pipeline
1. User selects file (or drag/drop)  
2. Client extracts text in-browser  
3. `parseEstimatePasteText` suggests fields  
4. User confirms every field in the questionnaire  
5. Report uses existing Phase 1–4 rules only  
6. Raw file is **not** retained (input cleared after process)

## Confidence
- High/medium + ≥1 suggestion → apply prefills, continue questionnaire  
- Low/failed → calm message: *“We couldn’t read enough reliably. Continue with the guided questions.”*  
- Partial suggestions may still apply with a caution note  

## Privacy badge
- Upload optional  
- Used only to help prefill review  
- Not sold / not shared with movers  
- Not stored by default after processing  
- Educational, not legal advice  

## Surfaces
- Single tool: `/tools/move-quote-check` (Upload or paste step)  
- Compare: `/tools/move-quote-check/compare` (A and B upload assists)  

## Analytics
- `move_quote_check_upload_started`  
- `move_quote_check_upload_success`  
- `move_quote_check_upload_low_confidence_fallback`  
- `move_quote_check_prefill_from_upload_applied`  

## Limitations (honest)
- No guaranteed OCR on all scans  
- No LLM findings or severities  
- No permanent document vault  
- Text-layer PDFs work best  

## Code
| File | Role |
|------|------|
| `lib/move-quote-check/extract-upload.ts` | File → text |
| `components/move-quote-check/estimate-upload-assist.tsx` | UI |
| existing `paste-parse.ts` + rules engine | Prefill + findings |
