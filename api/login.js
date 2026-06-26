// POST { username, password }. On success sets an HttpOnly session cookie.
// Credentials/token can be overridden with Vercel Environment Variables:
//   AUTH_USER, AUTH_PASS, AUTH_TOKEN
function parseMaybe(raw) {
  if (!raw) return {};
  if (typeof raw === 'object') return raw;
  try { return JSON.parse(raw); } catch (e) {}
  const out = {};
  String(raw).split('&').forEach(function (pair) {
    const i = pair.indexOf('=');
    if (i > -1) out[decodeURIComponent(pair.slice(0, i))] = decodeURIComponent(pair.slice(i + 1).replace(/\+/g, ' '));
  });
  return out;
}

function readBody(req) {
  return new Promise(function (resolve) {
    if (req.body !== undefined && req.body !== null && req.body !== '') {
      resolve(parseMaybe(req.body));
      return;
    }
    let data = '';
    req.on('data', function (c) { data += c; });
    req.on('end', function () { resolve(parseMaybe(data)); });
    req.on('error', function () { resolve({}); });
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const body = await readBody(req);
  const username = (body.username || '').trim();
  const password = body.password || '';

  const U = process.env.AUTH_USER || 'Brandon';
  const P = process.env.AUTH_PASS || 'DDS7150';
  const TOKEN = process.env.AUTH_TOKEN || 'DDS_SESSION_BRANDON_7150_x9f3';

  if (username === U && password === P) {
    const maxAge = 60 * 60 * 24 * 30; // 30 days
    res.setHeader(
      'Set-Cookie',
      `dds_auth=${TOKEN}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=${maxAge}`
    );
    res.status(200).json({ ok: true });
  } else {
    res.status(401).json({ ok: false });
  }
}
