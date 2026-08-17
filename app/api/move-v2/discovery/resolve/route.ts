import{NextResponse}from"next/server";import{resolveOriginZip}from"@/lib/move-v2/consumer-discovery/server-read";
export function GET(request:Request){if(process.env.VERCEL_ENV==="production")return new NextResponse(null,{status:404});const zip=new URL(request.url).searchParams.get("zip")??"";return NextResponse.json(resolveOriginZip(zip),{status:/^\d{5}$/.test(zip)?200:400})}
