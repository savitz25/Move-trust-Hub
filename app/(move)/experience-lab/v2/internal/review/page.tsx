import{notFound}from"next/navigation";import{moveV2Flags}from"@/lib/move-v2/flags";import{REVIEW_FIXTURES}from"@/lib/move-v2/evidence-operations/fixtures";import{ReviewConsole}from"./review-console";
export const dynamic="force-dynamic";export const metadata={title:"Evidence operations | Internal Preview",robots:{index:false,follow:false}};
export default function Page(){const f=moveV2Flags();if(process.env.VERCEL_ENV==="production"||!f.enabled||!f.internalReview)notFound();return <ReviewConsole fixtures={REVIEW_FIXTURES}/>}
