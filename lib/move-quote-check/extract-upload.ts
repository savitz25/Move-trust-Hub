/**
 * Phase 5 — client-side estimate file text extraction.
 * No LLM findings. Text is passed to deterministic paste-parse prefills.
 *
 * Strategy:
 * - .txt / plain text: direct read
 * - PDF: lightweight binary text harvest (text-layer PDFs); no permanent storage
 * - Images: optional best-effort browser OCR via dynamic CDN Tesseract when available;
 *   otherwise low-confidence fallback to guided mode
 */

import {
  parseEstimatePasteText,
  type PasteParseResult,
} from '@/lib/move-quote-check/paste-parse';

export const UPLOAD_MAX_BYTES = 8 * 1024 * 1024; // 8 MB
export const UPLOAD_ACCEPT =
  'application/pdf,image/png,image/jpeg,image/jpg,image/webp,text/plain';

export type UploadExtractQuality = 'high' | 'medium' | 'low' | 'failed';

export type UploadExtractResult = {
  ok: boolean;
  quality: UploadExtractQuality;
  method: 'text' | 'pdf_text' | 'image_ocr' | 'none';
  text: string;
  message: string;
  fileName: string;
  /** Parsed suggestions when quality is usable */
  parse: PasteParseResult | null;
};

function decodeLatin1(buf: ArrayBuffer): string {
  return new TextDecoder('latin1').decode(buf);
}

/** Unescape basic PDF literal string escapes. */
function unescapePdfString(s: string): string {
  return s
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\\(/g, '(')
    .replace(/\\\)/g, ')')
    .replace(/\\\\/g, '\\')
    .replace(/\\(\d{1,3})/g, (_, oct) => String.fromCharCode(parseInt(oct, 8)));
}

/**
 * Harvest readable text from a PDF binary without external deps.
 * Works best on text-layer PDFs (not pure image scans).
 */
export function extractTextFromPdfBinary(buf: ArrayBuffer): string {
  const raw = decodeLatin1(buf);
  const chunks: string[] = [];

  // (literal) Tj  or  (literal) '
  const literalRe = /\((?:\\.|[^\\)]){2,200}\)\s*(?:Tj|TJ|')/g;
  let m: RegExpExecArray | null;
  while ((m = literalRe.exec(raw)) !== null) {
    const inner = m[0].replace(/\)\s*(?:Tj|TJ|')\s*$/, '').slice(1);
    const t = unescapePdfString(inner).trim();
    if (t.length >= 2 && /[A-Za-z0-9$]/.test(t)) chunks.push(t);
  }

  // TJ arrays: [(Hello) -10 (World)] TJ
  const tjArrayRe = /\[((?:[^\[\]]|\([^\)]*\)){2,800})\]\s*TJ/g;
  while ((m = tjArrayRe.exec(raw)) !== null) {
    const parts = m[1].match(/\((?:\\.|[^\\)])*\)/g);
    if (!parts) continue;
    const line = parts
      .map((p) => unescapePdfString(p.slice(1, -1)))
      .join('')
      .trim();
    if (line.length >= 2) chunks.push(line);
  }

  // Stream text that looks like ASCII lines (last resort)
  if (chunks.length < 5) {
    const streamRe = /stream\r?\n([\s\S]{20,50000}?)\r?\nendstream/g;
    while ((m = streamRe.exec(raw)) !== null) {
      const body = m[1];
      // Prefer Flate-decoded streams only if already plain-ish
      if (body.includes('/Filter')) continue;
      const ascii = body.replace(/[^\x09\x0A\x0D\x20-\x7E]/g, ' ');
      const words = ascii.match(/[A-Za-z0-9][A-Za-z0-9$.,\-\/# ]{3,}/g);
      if (words) chunks.push(...words.slice(0, 200));
    }
  }

  // De-dupe consecutive identical chunks
  const out: string[] = [];
  for (const c of chunks) {
    if (out[out.length - 1] === c) continue;
    out.push(c);
  }
  return out.join(' ').replace(/\s+/g, ' ').trim();
}

function qualityFromText(text: string, suggestionCount: number): UploadExtractQuality {
  if (text.length < 40 && suggestionCount === 0) return 'failed';
  if (text.length < 80 && suggestionCount < 2) return 'low';
  if (suggestionCount >= 3 || text.length >= 400) return 'high';
  if (suggestionCount >= 1 || text.length >= 120) return 'medium';
  return 'low';
}

async function extractFromImage(file: File): Promise<{ text: string; method: 'image_ocr' | 'none' }> {
  // Best-effort: dynamic Tesseract from CDN (no package install required).
  // If CDN/network fails, return empty for guided fallback.
  try {
    type TesseractMod = {
      recognize: (
        image: File | Blob | string,
        lang: string,
        opts?: { logger?: (m: unknown) => void }
      ) => Promise<{ data: { text: string } }>;
    };
    // webpackIgnore / native dynamic import of ESM CDN
    const mod = (await import(
      /* webpackIgnore: true */
      'https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.esm.min.js'
    )) as TesseractMod | { default: TesseractMod };
    const Tesseract = 'recognize' in mod ? mod : (mod as { default: TesseractMod }).default;
    const result = await Tesseract.recognize(file, 'eng');
    const text = (result?.data?.text ?? '').replace(/\s+/g, ' ').trim();
    if (text.length >= 20) return { text, method: 'image_ocr' };
  } catch {
    /* CDN blocked or OCR failed */
  }
  return { text: '', method: 'none' };
}

/**
 * Extract text from an uploaded estimate file and run deterministic field scan.
 * Does not persist the file.
 */
export async function extractEstimateFromFile(file: File): Promise<UploadExtractResult> {
  const fileName = file.name || 'upload';

  if (file.size <= 0) {
    return {
      ok: false,
      quality: 'failed',
      method: 'none',
      text: '',
      message: 'Empty file. Try another upload or continue with guided questions.',
      fileName,
      parse: null,
    };
  }
  if (file.size > UPLOAD_MAX_BYTES) {
    return {
      ok: false,
      quality: 'failed',
      method: 'none',
      text: '',
      message: `File is too large (max ${Math.round(UPLOAD_MAX_BYTES / (1024 * 1024))} MB). Try a smaller PDF or paste text.`,
      fileName,
      parse: null,
    };
  }

  const type = (file.type || '').toLowerCase();
  const lowerName = fileName.toLowerCase();

  try {
    // Plain text
    if (type === 'text/plain' || lowerName.endsWith('.txt')) {
      const text = (await file.text()).trim();
      const parse = parseEstimatePasteText(text);
      const quality = qualityFromText(text, parse.suggestions.length);
      return finalize(text, 'text', quality, fileName, parse);
    }

    // PDF
    if (type === 'application/pdf' || lowerName.endsWith('.pdf')) {
      const buf = await file.arrayBuffer();
      const text = extractTextFromPdfBinary(buf);
      const parse = parseEstimatePasteText(text || ' ');
      const quality = qualityFromText(text, parse.suggestions.length);
      if (quality === 'failed' || quality === 'low') {
        return {
          ok: false,
          quality: quality === 'failed' ? 'failed' : 'low',
          method: 'pdf_text',
          text,
          message:
            quality === 'failed'
              ? 'We couldn’t read enough text from this PDF (it may be a scanned image). Continue with the guided questions, or paste selectable text from the PDF.'
              : 'We only found limited text in this PDF. Please confirm every field — or continue with the guided questions.',
          fileName,
          parse: parse.suggestions.length ? parse : null,
        };
      }
      return finalize(text, 'pdf_text', quality, fileName, parse);
    }

    // Images
    if (
      type.startsWith('image/') ||
      /\.(png|jpe?g|webp)$/i.test(lowerName)
    ) {
      const { text, method } = await extractFromImage(file);
      if (!text || method === 'none') {
        return {
          ok: false,
          quality: 'low',
          method: 'none',
          text: '',
          message:
            'We couldn’t OCR this image reliably. Continue with the guided questions, or paste text from the estimate if available.',
          fileName,
          parse: null,
        };
      }
      const parse = parseEstimatePasteText(text);
      const quality = qualityFromText(text, parse.suggestions.length);
      if (quality === 'failed' || quality === 'low') {
        return {
          ok: false,
          quality: 'low',
          method: 'image_ocr',
          text,
          message:
            'Image OCR found little reliable text. Continue with the guided questions and confirm any suggestions carefully.',
          fileName,
          parse: parse.suggestions.length ? parse : null,
        };
      }
      return finalize(text, 'image_ocr', quality, fileName, parse);
    }

    return {
      ok: false,
      quality: 'failed',
      method: 'none',
      text: '',
      message: 'Unsupported file type. Upload PDF, PNG, JPG, WEBP, or paste text.',
      fileName,
      parse: null,
    };
  } catch {
    return {
      ok: false,
      quality: 'failed',
      method: 'none',
      text: '',
      message: 'Upload processing failed. Continue with the guided questions.',
      fileName,
      parse: null,
    };
  }
}

function finalize(
  text: string,
  method: UploadExtractResult['method'],
  quality: UploadExtractQuality,
  fileName: string,
  parse: PasteParseResult
): UploadExtractResult {
  const usable = quality === 'high' || quality === 'medium';
  return {
    ok: usable,
    quality,
    method,
    text,
    message: usable
      ? `Extracted text via ${method.replace('_', ' ')}. Review suggested fields before continuing — extraction is not a legal review.`
      : 'We couldn’t read enough reliably. Continue with the guided questions.',
    fileName,
    parse: parse.suggestions.length ? parse : null,
  };
}
