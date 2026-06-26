// Clears the session cookie and sends the user back to the login page.
export default function handler(req, res) {
  res.setHeader(
    'Set-Cookie',
    'dds_auth=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0'
  );
  res.statusCode = 302;
  res.setHeader('Location', '/login');
  res.end();
}
