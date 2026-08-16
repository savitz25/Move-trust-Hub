import type { StateAuthorityRecord } from "./types";

export const FLORIDA_PROGRAMS = { IM: "Intrastate Mover", MB: "Moving Broker" } as const;

export function parseFloridaBusinessSearchHtml(html: string, program: "IM" | "MB"): StateAuthorityRecord[] {
  const blocks = html.split(/id="[^"\s]*MasterGv_maindiv_\d+"/i).slice(1);
  return blocks.flatMap((block, index) => {
    const raw = block.slice(0, 20_000);
    const text = raw
      .replace(/<br\s*\/?\s*>/gi, "\n").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/[ \t]+/g, " ");
    const name = raw.match(/<strong>\s*([^<]+)<\/strong>/i)?.[1]?.trim();
    const contactBlock = raw.match(/dataTab_\d+[^]*?<tr>[^]*?<\/tr>\s*<tr>[^]*?<td[^>]*>([^]*?)<\/td>/i)?.[1] ?? "";
    const address = contactBlock.split(/<br\s*\/?\s*>/i)[0].replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").trim();
    const phone = contactBlock.match(/<b>Phone:<\/b>\s*([^<&]+)/i)?.[1]?.trim();
    const cityStateZip = address.match(/,\s*([^,]+),\s*FL\s+(\d{5})/i);
    const license = text.match(new RegExp(`\\b${program}\\s*[-#:]?\\s*(\\d+)\\b`, "i"));
    const dates = [...text.matchAll(/\b\d{2}\/\d{2}\/\d{2,4}\b/g)].map((m) => m[0]);
    if (!name || !license) return [];
    return [{
      state: "FL", authorityType: program === "IM" ? "FL_IM" : "FL_MB",
      licenseNumber: `${program}${license[1]}`, status: /\bRegistered\b/i.test(text) ? "REGISTERED" : "UNKNOWN",
      legalName: name, address, city: cityStateZip?.[1]?.trim(), postalCode: cityStateZip?.[2], phone,
      effectiveDate: dates[0], expirationDate: dates[1],
      sourceRecordReference: `FDACS:${program}:${license[1]}:${index}`,
    }];
  });
}
