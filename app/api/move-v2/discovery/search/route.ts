import { NextResponse } from "next/server";
import { searchLocalMovers } from "@/lib/move-v2/consumer-discovery/server-read";
import { enforceRateLimit, publicClientKey, publicError, publicReadsEnabled, validateZip } from "@/lib/move-v2/launch-candidate/public-read-security";
export function GET(request: Request) {
  if (!publicReadsEnabled()) return new NextResponse(null, { status: 404 });
  try {
    enforceRateLimit("search", publicClientKey(request)); const query = new URL(request.url).searchParams;
    if (query.has("include_experimental_derived")) return NextResponse.json({ error: "EXPERIMENTAL_GEOGRAPHY_UNAVAILABLE" }, { status: 400 });
    const originZip = validateZip(query.get("originZip")); const destination = query.get("destinationZip");
    return NextResponse.json(searchLocalMovers({ originZip, destinationZip: destination ? validateZip(destination) : undefined }));
  } catch (error) { const response = publicError(error); return NextResponse.json(response.body, { status: response.status }); }
}
