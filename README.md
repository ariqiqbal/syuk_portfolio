# Syukran Shalihin – Portfolio

## Change photos
1. Put photos in `images/`:
   - `profile.jpg` – round photo at top
   - `about.jpg` – About Me photo
   - `work1.jpg` … `work6.jpg` – gallery
2. Other names? Edit paths in `config.js`.

## Change text
Edit `config.js` only (name, role, skills, gallery, links).

## Quick test
Click **✎ Edit photos** (bottom right) → click any photo → pick a file.
This saves in YOUR browser only. For the live site, use `images/`.

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. vercel.com → Add New → Project → import repo → Deploy.
   (No build settings needed. It is a static site.)
3. Every `git push` updates the site.

## Gallery
Each item in `config.js` has `type`: `photo`, `video` or `design`.
- Filter buttons (All / Photography / Videography / Design) appear automatically.
- `video` items show a ▶ icon. Put the YouTube/Instagram link in `link` → "▶ Watch" button.

## Category pages (work.html)
Click a gallery card → new tab with ALL photos/videos of that category.
- Photos: put numbered files in a folder, e.g. `images/street/1.jpg, 2.jpg …`
  and set `folder` + `count` in `config.js`.
- Videos: add `{ youtube: "https://youtu.be/..." }` or `{ video: "videos/x.mp4" }` to `items`.
- Click a photo → full-screen viewer (← → keys, swipe on phone, Esc to close).

## Sub-filters (Event → Wedding / Concert …)
In `config.js`, a gallery item can have `subs`:
  { id: "wedding", name: "Wedding", folder: "images/event/wedding", count: 6 }
- Rename a chip: change `name`.
- Add/remove a chip: add/remove a line.
- Photos: images/event/wedding/1.jpg, 2.jpg …  (set `count`)
