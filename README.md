# Malvern International School — website

Official website of Malvern International School, Riyadh.
Live website: **https://www.malvern.edu.sa/** (malvern.edu.sa redirects to www)

The website rebuilds and republishes itself automatically about 2 minutes after any change is saved on GitHub.

---

## Where things live

| What you want to change | Where |
|---|---|
| Wording on a page | `content/en/<page>.yaml` (e.g. `content/en/admissions.yaml`) |
| Phone, email, WhatsApp, address, map, links, licence numbers | `content/settings.yaml` |
| Menu and button words | `content/en/ui.yaml` |
| Privacy Policy | `content/en/privacy.md` |
| News stories and events | `content/news/` (copy `_TEMPLATE.md`) |
| Offers & Announcements posters | `content/offers/` (just add or delete images) |
| Logo, photos, hero video | `brand/` |
| Colours, fonts, logo wordmark | `theme.json` |
| Website address (own domain) | `site.config.mjs` |
| What is still missing | `CONTENT-NEEDED.md` |

Anything written as `[TO CONFIRM: …]` is a private reminder: it is **hidden** on the website. Sections with nothing real in them (e.g. Parent Voice, extra leadership, virtual tour, parent portal, extra videos) stay hidden until real content is added.

---

## How to edit text (no coding)

1. Open the file on GitHub (e.g. click `content` → `en` → `home.yaml`).
2. Click the **pencil icon** (✏️ "Edit this file") at the top right of the file.
3. Change only the words **inside the quotes** `"..."`. Keep the spacing at the start of each line exactly as it is.
4. Click the green **Commit changes…** button, then **Commit changes** again.
5. Wait about 2 minutes and refresh the website.

If something goes wrong, the website simply keeps the previous version — nothing breaks for visitors. Click the **Actions** tab to see a red ✗ and tell Claude.

## How to add or remove an Offers & Announcements poster

**Add:**
1. Open the `content` folder → `offers` folder.
2. Click **Add file** → **Upload files**.
3. Drag your poster (JPG or PNG) into the page. Name it with the date and a few words, e.g. `2026-11-01-early-registration.jpg`.
4. Click **Commit changes**. The poster appears on Home and Admissions in about 2 minutes.

**Remove:**
1. Open `content` → `offers` and click the poster file.
2. Click the **⋯** (three dots) at the top right → **Delete file** → **Commit changes**.

## How to add a YouTube video

1. On YouTube, open the video and copy the address from the browser (e.g. `https://www.youtube.com/watch?v=abc123XYZ00`).
2. Paste it between the quotes after `url:` in:
   - Home: `content/en/home.yaml` → `video:`
   - About: `content/en/about.yaml` → `video:`
   - Student Life: `content/en/student-life.yaml` → `video:`
   - Virtual tour: `content/settings.yaml` → `virtualTourEmbedUrl:`
3. Commit. Videos use YouTube's privacy-enhanced mode and only load when a visitor presses Play, so the site stays fast.

## How to add the home page hero video

1. Open the `brand` folder → **Add file** → **Upload files**.
2. Upload a short silent clip (10–20 seconds) named exactly `hero-video.mp4` (GitHub accepts files up to 25 MB in the browser).
3. Commit. The site automatically compresses it to under 5 MB, removes the sound, and creates a still image. Visitors on slow connections, on data-saver, or who prefer reduced motion see only the still image. A pause button is shown for accessibility.

## How to add the logo

Upload `logo.svg` (best) or `logo.png` into the `brand` folder. It replaces the "M Malvern" wordmark automatically.

---

## Enquiry form

The form includes a PDPL consent checkbox. Until it is connected to a form service, pressing **Send** prepares the message and lets the parent send it by **WhatsApp or email** (using the numbers in `content/settings.yaml`).

To connect it later (`content/settings.yaml` → `forms:`):
- **Microsoft Forms:** in Microsoft Forms click **Collect responses → Embed**, copy the link inside `src="..."`, paste it into `microsoftFormsEmbedUrl`. (Add a consent question in the Microsoft Form.)
- **Power Automate / Formspree:** paste the address into `enquiryEndpoint`.

## Own domain (www.malvern.edu.sa)

The site runs on **www.malvern.edu.sa**; **malvern.edu.sa** redirects to it.
- `site.config.mjs` → `customDomain: 'www.malvern.edu.sa'` (sets the address, links, sitemap and the `CNAME` file GitHub Pages needs).
- DNS (at the company managing the domain): `www` **CNAME** → `mnasr987.github.io`; `@` **A** → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; `@` **AAAA** → `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`.
- GitHub: **Settings → Pages → Custom domain** = `www.malvern.edu.sa`, then tick **Enforce HTTPS**.
- To return to the free GitHub address, set `customDomain: ''`.

## Re-using this project for Nile International School

Copy the repository, then change only: `theme.json` (colours, fonts, wordmark), `site.config.mjs` (address), the `brand` folder (logo, photos) and the `content` folder (all text). The design and code stay the same.

## Arabic (later phase)

The site is built bilingual-ready: right-to-left layout rules, Arabic fonts (Noto Naskh Arabic for headings, IBM Plex Sans Arabic for body) and language settings are in place. Adding Arabic means creating `content/ar/` translations and the `/ar/` pages.

---

## For developers

- [Astro](https://astro.build) static site; `npm install`, `npm run dev`, `npm run build`.
- Publishing: `.github/workflows/deploy.yml` builds on pushes to `main` and `claude/**` and publishes `dist/` to the `gh-pages` branch.
- Page layouts: `src/views/`; routes: `src/pages/`; shared components: `src/components/`.
- `scripts/prepare-media.mjs` compresses `brand/hero-video.*` with ffmpeg before each build.
