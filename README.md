# Doors Direct Pricing Tool

Internal garage-door pricing tool. Single self-contained HTML file — no build step, no dependencies, works offline.

## Deploy to Vercel

This is a static site. Vercel serves `index.html` from the repo root automatically.

### Option A — Git (recommended)
1. Put `index.html` and `vercel.json` in your repo root.
2. Commit and push:
   ```
   git add index.html vercel.json
   git commit -m "Add pricing tool"
   git push
   ```
3. In the Vercel dashboard, import the repo (or it auto-deploys if already linked).
   - Framework Preset: **Other** (no build)
   - Build Command: leave empty
   - Output Directory: `.`
4. Every push to the main branch redeploys automatically.

### Option B — Vercel CLI
```
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

### Option C — Drag & drop
Drag the folder onto the Vercel dashboard's "Add New… > Project" upload area.

## Updating prices
When you get a new build of the tool, just replace `index.html`, commit, and push. The `vercel.json` sets `index.html` to no-cache so staff always load the latest version.

## Notes
- The logo is embedded in the file (base64), so there are no external assets to host.
- Same file works for desktop, phone (responsive), and can be wrapped as a Windows `.exe` later.
