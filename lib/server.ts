import { env } from 'cloudflare:workers';
export const bindings=()=>env as unknown as {DB:D1Database;FILES:R2Bucket};
export function owner(req:Request){const id=req.headers.get('oai-authenticated-user-id');if(!id)throw new Response(JSON.stringify({error:'请先登录后保存你的记忆'}),{status:401,headers:{'Content-Type':'application/json'}});if(req.method!=='GET'&&req.headers.get('sec-fetch-site')==='cross-site')throw new Response('Forbidden',{status:403});return id;}
export function failure(error:unknown){if(error instanceof Response)return error;console.error(error);return Response.json({error:error instanceof Error?error.message:'暂时无法保存，请重试'},{status:400});}
