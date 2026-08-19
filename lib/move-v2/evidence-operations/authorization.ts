import{timingSafeEqual}from"node:crypto";
export function assertOperationsAuthorization(presented:string|undefined){const expected=process.env.ADMIN_SECRET;if(!expected||!presented)throw new Error("OPERATIONS_UNAUTHORIZED");const a=Buffer.from(expected),b=Buffer.from(presented);if(a.length!==b.length||!timingSafeEqual(a,b))throw new Error("OPERATIONS_UNAUTHORIZED")}
