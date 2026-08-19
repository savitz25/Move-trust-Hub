import { NextResponse } from "next/server";
import { compareProviderReports } from "@/lib/move-v2/consumer-discovery/server-read";
import { enforceRateLimit, publicClientKey, publicError, publicReadsEnabled, validateCompareIds } from "@/lib/move-v2/launch-candidate/public-read-security";
export function GET(request: Request) {
  if (!publicReadsEnabled()) return new NextResponse(null, { status: 404 });
  try { enforceRateLimit("compare", publicClientKey(request)); const ids = validateCompareIds((new URL(request.url).searchParams.get("providerIds") ?? "").split(",").filter(Boolean)); return NextResponse.json(compareProviderReports(ids)); }
  catch (error) { const response = publicError(error); return NextResponse.json(response.body, { status: response.status }); }
}
