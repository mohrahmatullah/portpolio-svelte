# Rohmatuloh — Portfolio Website

Single-page, bilingual (EN/ID) portfolio built with **Svelte 5 + TypeScript + Vite + Tailwind CSS v4 + Lucide icons**.
Content (profile, skills, experience, education, projects, languages) lives in [`src/data/content.ts`](src/data/content.ts)
and is shared by the site ([`src/App.svelte`](src/App.svelte)) and the printable CV ([`src/cv/Cv.svelte`](src/cv/Cv.svelte)).

Features: hero with CV download (EN/ID PDF), about, categorized skills, 28 filterable project cards,
experience & education timeline, contact form (Formspree with `mailto:` fallback), dark/light mode and EN/ID
switch (both remembered in the browser), smooth scrolling, responsive from 320px.

## Requirements

- **Node.js 20.19+ or 22.12+** (required by Vite 8).
  In Laragon: *Menu → Node.js → Version → node-v22.19.0* (already installed in `C:\laragon\bin\nodejs`).
  Node v21 is **not** supported.

## Commands

```bash
npm install
npm run dev       # development server with hot reload (http://localhost:5173), no type check
npm run check     # TypeScript + Svelte type check (svelte-check, strict mode)
npm run build     # type check, then static build into dist/ — fails if there is any type error
npm run preview   # serve the production build (http://localhost:4173)
npm run cv        # regenerate the CV PDFs from src/data/content.ts (see below)
```

TypeScript setup: `tsconfig.json` (strict, `noUncheckedIndexedAccess`) for `src/`, `tsconfig.node.json` for
`vite.config.ts`. TypeScript is pinned to v6 because `svelte-check` does not support TypeScript 7 yet.

`dist/` uses relative paths (`base: './'`), so it can be served from the web root or any subfolder
(for example `http://localhost/resume/resume_portofolio/dist/` in Laragon), or deployed to any static host.

## Configuration (top of `src/App.svelte`)

| Constant | Purpose |
| --- | --- |
| `FORMSPREE_ENDPOINT` | Empty by default → the form opens the visitor's email app addressed to `rahmat.noble@gmail.com`. To receive messages directly, create a form at [formspree.io](https://formspree.io), then paste its endpoint, e.g. `'https://formspree.io/f/abcdwxyz'`. |
| `CV_URL` / `CV_FILENAME` | Derived from the active language: every "Download CV" button serves `public/CV-Rohmatuloh-EN.pdf` or `public/CV-Rohmatuloh-ID.pdf`. |
| `profile.contact` (in `src/data/content.ts`) | Email, WhatsApp (international format `62…`), LinkedIn. Used everywhere on the page and in the CV. |

## Updating content

Content source of truth is the LinkedIn profile (exported with **More → Save to PDF**).

1. Export a fresh `Profile.pdf` from LinkedIn.
2. Update the data blocks in `src/data/content.ts`: `profile`, `skillGroups`, `experience`, `education`,
   `certifications` (block renders only when non-empty), `languages` and `projectData`
   (each project's `exp` must match an `experience` id; `category` must be a key of `categories`).
   Every visitor-facing text has an `{ en, id }` pair. UI labels live in the `en` and `id` dictionaries in
   `App.svelte` (`id` must match `en`'s shape); CV labels live in `src/cv/Cv.svelte`.
3. `npm run cv` to regenerate the CV PDFs, then `npm run build`.

The types in `src/data/content.ts` and the dictionaries in `App.svelte` guard these edits: a project pointing to an unknown `exp` id or `category`,
a missing `{ en, id }` translation, or a key present in `content.en` but missing in `content.id` is reported by
`npm run check` and stops the build. When you add a new position or category, add its id to the
`ExperienceId` / `CategoryKey` type first.

## CV PDF

`npm run cv` builds the site, prints `cv.html` (`src/cv/Cv.svelte`) with headless Chromium in English and
Indonesian, and writes `public/CV-Rohmatuloh-EN.pdf` and `public/CV-Rohmatuloh-ID.pdf`. The English PDF is also
copied to `../curiculum-new.pdf` so the "Download Resume" button of the legacy site keeps working. The script
fails if a CV grows beyond 2 A4 pages.

- One-time setup per machine: `npx playwright install chromium`.
- **Run it every time `src/data/content.ts` changes** — the PDFs are static files and do not update on their own.
- Preview while editing: `npm run dev` and open `/cv.html?lang=en` or `/cv.html?lang=id`.
- The CV photo is `src/assets/cv-photo.jpg`.

## Data notes

- Content follows `C:\laragon\project\resume\Profile.pdf` (LinkedIn). `curiculum-new.docx`, the old `index.html`
  and `portofolio-website.pdf` were used only to fill gaps (phone number, SMK education, some responsibilities,
  Midtrans/RajaOngkir/Xendit details, Apache/Nginx/Ajax/Windows skills).
- Resolved conflicts (LinkedIn wins): location Tangerang (not Jakarta Barat), SISI Dec 2022 – Sep 2026,
  Fia Express/K-Appraisal periods, Indosistem positions added. Years of experience are computed from Apr 2018.
- Contact was set by the owner: **rahmat.noble@gmail.com** and WhatsApp **+62 838-7685-4003**.
  Older addresses from the documents are not shown anywhere on the site.
- The owner's name is shown as **Rohmatuloh** (set by the owner; LinkedIn shows "Moh Rahmatullah").
- Languages (Indonesian native, English passive) come from `curiculum-new.docx`.
- No technology is stated for the 2021 Indosistem "Web ERP" project, so its card shows domain tags
  (ERP, Asset Management) instead.
