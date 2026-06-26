// POST { username, password }. On success sets an HttpOnly session cookie.
// Credentials and token can be overridden with Vercel Environment Variables:
//   AUTH_USER, AUTH_PASS, AUTH_TOKEN
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  const username = body && body.username;
  const password = body && body.password;

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
