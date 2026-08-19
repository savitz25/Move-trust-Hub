import { NextResponse } from "next/server";
import { resolveOriginZip } from "@/lib/move-v2/consumer-discovery/server-read";
import { enforceRateLimit, publicClientKey, publicError, publicReadsEnabled, validateZip } from "@/lib/move-v2/launch-candidate/public-read-security";
export function GET(request: Request) {
  if (!publicReadsEnabled()) return new NextResponse(null, { status: 404 });
  try { enforceRateLimit("zip", publicClientKey(request)); const zip = validateZip(new URL(request.url).searchParams.get("zip")); return NextResponse.json(resolveOriginZip(zip)); }
  catch (error) { const response = publicError(error); return NextResponse.json(response.body, { status: response.status }); }
}
