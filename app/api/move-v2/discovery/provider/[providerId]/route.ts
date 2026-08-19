import { NextResponse } from "next/server";
import { getProviderTrustReport } from "@/lib/move-v2/consumer-discovery/server-read";
import { enforceRateLimit, publicClientKey, publicError, publicReadsEnabled, validateProviderId } from "@/lib/move-v2/launch-candidate/public-read-security";
export async function GET(request: Request, { params }: { params: Promise<{ providerId: string }> }) {
  if (!publicReadsEnabled()) return new NextResponse(null, { status: 404 });
  try { enforceRateLimit("provider", publicClientKey(request)); const id = validateProviderId((await params).providerId); const report = getProviderTrustReport(id); return report ? NextResponse.json(report) : NextResponse.json({ error: "PROVIDER_NOT_FOUND" }, { status: 404 }); }
  catch (error) { const response = publicError(error); return NextResponse.json(response.body, { status: response.status }); }
}
