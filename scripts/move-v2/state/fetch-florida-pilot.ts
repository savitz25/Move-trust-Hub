import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";

const URL = "https://csapp.fdacs.gov/CSPublicApp/BusinessSearch/BusinessSearch.aspx";
const PROGRAMS = ["IM", "MB"] as const;
const pageLimit = Math.max(1, Math.min(Number(process.env.MOVE_STATE_PAGE_LIMIT ?? 3), 10));

function hiddenInputs(html: string) {
  const values = new URLSearchParams();
  for (const match of html.matchAll(/<input[^>]+type="hidden"[^>]+name="([^"]+)"[^>]*value="([^"]*)"[^>]*>/gi))
    values.set(match[1].replaceAll("&amp;", "&"), match[2].replaceAll("&amp;", "&"));
  return values;
}

async function request(body?: URLSearchParams, cookie?: string) {
  const response = await fetch(URL, {
    method: body ? "POST" : "GET",
    headers: {
      "user-agent": "MoveTrustHub state-regulatory pilot/1.0 (+https://movetrusthub.com)",
      ...(cookie ? { cookie } : {}),
      ...(body ? { "content-type": "application/x-www-form-urlencoded", origin: "https://csapp.fdacs.gov", referer: URL } : {}),
    },
    body,
    signal: AbortSignal.timeout(90_000),
  });
  if (!response.ok) throw new Error(`FDACS ${response.status}`);
  return { html: await response.text(), cookie: response.headers.getSetCookie().map((v) => v.split(";", 1)[0]).join("; ") || cookie };
}

async function fetchProgram(program: (typeof PROGRAMS)[number]) {
  let response = await request();
  let form = hiddenInputs(response.html);
  form.set("ctl00$cpMainContent$LicenseTypeDl", program);
  form.set("ctl00$cpMainContent$CountyDl", " X");
  form.set("ctl00$cpMainContent$SingleSearchBt", "Search");
  response = await request(form, response.cookie);
  const pages = [response.html];
  for (let page = 2; page <= pageLimit; page++) {
    form = hiddenInputs(response.html);
    form.set("__EVENTTARGET", `ctl00$cpMainContent$MasterGv$ctl01$ctl${String(page - 1).padStart(2, "0")}`);
    form.set("__EVENTARGUMENT", "");
    response = await request(form, response.cookie);
    pages.push(response.html);
  }
  const html = pages.join("\n<!-- MOVE_V2_PAGE -->\n");
  return { program, html, sha256: createHash("sha256").update(html).digest("hex"), pages: pages.length };
}

async function main() {
  mkdirSync("artifacts/move-v2/state", { recursive: true });
  for (const program of PROGRAMS) {
    const result = await fetchProgram(program);
    writeFileSync(`artifacts/move-v2/state/fdacs-${program.toLowerCase()}-pilot.html`, result.html);
    console.log(JSON.stringify({ program, pages: result.pages, sha256: result.sha256, bytes: Buffer.byteLength(result.html) }));
  }
}
void main();
