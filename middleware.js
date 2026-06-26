// Runs on Vercel's Edge before any page is served.
// If there's no valid session cookie, the tool is never sent — the user is
// redirected to the login page. Login page + login API are exempt.
export const config = {
  matcher: ['/((?!api/login|api/logout|login|favicon.ico).*)'],
};

export default function middleware(request) {
  const TOKEN = (typeof process !== 'undefined' && process.env && process.env.AUTH_TOKEN)
    || 'DDS_SESSION_BRANDON_7150_x9f3';
  const cookies = request.headers.get('cookie') || '';
  const authed = cookies.split(';').map(c => c.trim()).includes('dds_auth=' + TOKEN);
  if (authed) return; // allow the request through
  const loginUrl = new URL('/login', request.url);
  return Response.redirect(loginUrl, 307);
}
