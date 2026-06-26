# Doors Direct Pricing Tool — Website (password protected)

This is the **website** version. The login runs on Vercel's server, so the tool is
never sent to the browser until someone signs in.

Default login (shared):
- **Username:** Brandon
- **Password:** DDS7150

## Files
```
index.html        the pricing tool (served at / after login)
login.html        branded sign-in page (served at /login)
middleware.js     guards every page; redirects to /login if not signed in
api/login.js      checks the username/password, sets the session cookie
api/logout.js     clears the session
vercel.json       clean URLs + no-cache on the tool
package.json      marks this as a functions project for Vercel
```

## Deploy
1. Put all of these in your repo root (keep `api/` as a folder).
2. Commit and push:
   ```
   git add .
   git commit -m "Password-protected pricing tool"
   git push
   ```
3. Vercel auto-detects the serverless functions in `api/` and the `middleware.js`.
   No build command, framework preset **Other**.

That's it — visiting the site now shows the login page first.

## Changing the username / password (no code edits)
In the Vercel dashboard → your project → **Settings → Environment Variables**, add:
- `AUTH_USER` — the username
- `AUTH_PASS` — the password
- `AUTH_TOKEN` — any long random string (the session secret)

Then redeploy. If you don't set these, it uses the defaults above.
Setting `AUTH_TOKEN` to your own random value is recommended once you're live —
it makes existing sessions yours alone and invalidates the built-in default.

## Notes
- The session cookie lasts 30 days, so staff sign in once per device per month.
- "Log out" is in the top-right of the tool (desktop).
- This repo is the website only. The **EXE** uses the plain tool file with no login —
  keep them in separate repos/folders so the login layer never ships in the EXE.
