# Doors Direct Pricing Tool — Website (password protected)

The login runs on Vercel's server, so the tool is never sent to the browser until sign-in.

Logins (shared password):
- Brandon / DDS7150
- Tom / DDS7150
- CJ / DDS7150

## Files
```
index.html        the pricing tool (served at / after login)
login.html        branded sign-in page (served at /login)
middleware.js     guards every page; redirects to /login if not signed in
api/login.js      checks username/password, sets the session cookie
api/logout.js     clears the session
vercel.json       maps /login -> login.html, no-cache on the tool
package.json      marks this as a functions project
```

## Deploy
Put everything (keep the `api/` folder) in your repo root, then:
```
git add .
git commit -m "Update pricing tool"
git push
```
Framework preset: Other. No build command.

## Change logins / password without editing code
Vercel → Settings → Environment Variables:
- AUTH_USERS = comma-separated usernames (e.g. `Brandon,Tom,CJ`)
- AUTH_PASS  = the shared password
- AUTH_TOKEN = any long random string (session secret)
Then redeploy.

The EXE version is separate and has no login.
