// POST { username, password }. On success sets an HttpOnly session cookie.
// Accounts (shared password). Override with Vercel env vars if desired:
//   AUTH_USERS = "Brandon,Tom,CJ"   AUTH_PASS = "DDS7150"   AUTH_TOKEN = "..."
function parseMaybe(raw){
  if(!raw) return {};
  if(typeof raw==='object') return raw;
  try{ return JSON.parse(raw); }catch(e){}
  const out={};
  String(raw).split('&').forEach(function(p){const i=p.indexOf('=');if(i>-1)out[decodeURIComponent(p.slice(0,i))]=decodeURIComponent(p.slice(i+1).replace(/\+/g,' '));});
  return out;
}
function readBody(req){
  return new Promise(function(resolve){
    if(req.body!==undefined&&req.body!==null&&req.body!==''){ resolve(parseMaybe(req.body)); return; }
    let d=''; req.on('data',c=>d+=c); req.on('end',()=>resolve(parseMaybe(d))); req.on('error',()=>resolve({}));
  });
}
export default async function handler(req,res){
  if(req.method!=='POST'){ res.status(405).json({error:'Method not allowed'}); return; }
  const body=await readBody(req);
  const u=(body.username||'').trim().toLowerCase();
  const p=body.password||'';

  const USERS=(process.env.AUTH_USERS||'Brandon,Tom,CJ').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
  const PASS=process.env.AUTH_PASS||'DDS7150';
  const TOKEN=process.env.AUTH_TOKEN||'DDS_SESSION_BRANDON_7150_x9f3';

  if(USERS.includes(u) && p===PASS){
    const maxAge=60*60*24*30; // 30 days
    res.setHeader('Set-Cookie',`dds_auth=${TOKEN}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`);
    res.status(200).json({ok:true});
  } else {
    res.status(401).json({ok:false});
  }
}
