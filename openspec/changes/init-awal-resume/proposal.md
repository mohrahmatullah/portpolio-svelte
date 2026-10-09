## Why

Resume online yang ada saat ini (`C:\laragon\project\resume\index.html`, template Bootstrap lama) belum diperbarui dan tidak mencerminkan profil terbaru Moh Rahmatullah sebagai Web Developer berpengalaman 8+ tahun (sejak 2018), termasuk posisi terbarunya sebagai Remote Developer di Taiwan Mobile. Dibutuhkan website portofolio profesional berstandar internasional, modern, dan bilingual (EN/ID) yang dibangun dengan Svelte, lengkap dengan fitur unduh CV dan form kontak yang benar-benar terkirim.

## What Changes

- Scaffold proyek baru **Vite + Svelte 5 + TypeScript + Tailwind CSS + Lucide (`@lucide/svelte`)** di root `resume_portofolio/`, siap `npm run dev` / `npm run build` (output statis).
- Seluruh kode ditulis dalam **TypeScript**: `App.svelte` memakai `<script lang="ts">` dengan tipe untuk data profil, pengalaman, proyek, skill, dan kamus bahasa; entry `src/main.ts` dan `vite.config.ts`. Pemeriksaan tipe (`svelte-check`) menjadi bagian dari build sehingga kesalahan data (mis. kategori proyek atau id pengalaman yang salah, teks terjemahan yang hilang) tertangkap sebelum deploy. Implementasi awal berbahasa JavaScript dimigrasikan tanpa mengubah tampilan maupun perilaku.
- Seluruh UI dan data profil berada dalam satu komponen `src/App.svelte` (sesuai `task.md`), tanpa placeholder atau kode terpotong.
- **Sumber konten utama: `C:\laragon\project\resume\Profile.pdf`**, ekspor "Save to PDF" dari profil LinkedIn (`linkedin.com/in/moh-rahmatullah-b531b7163`) yang paling mutakhir: 9 posisi (Taiwan Mobile, SISI, 1980Media, Freelance, Indosistem ×2, K-Appraisal, Choir Express, Merah Putih Media), pendidikan, Top Skills, dan Tech Stack. `curiculum-new.docx`, `index.html` lama, dan `portofolio-website.pdf` hanya menjadi referensi pelengkap; bila bertentangan, Profile.pdf yang berlaku.
- Profile.pdf yang sama juga menjadi file CV yang diunduh pengunjung.
- Section: Hero (nama, role, ringkasan, CTA Download CV & Contact), About, Skills Grid terkategori (Frontend, Backend, Databases, Tools/DevOps), Project Cards interaktif dengan filter, Timeline Pengalaman & Pendidikan, Contact (form + social links).
- Dark/Light mode switcher berbasis Svelte state, tersimpan di `localStorage`, mengikuti preferensi sistem saat pertama kali.
- Toggle bahasa **EN/ID** untuk seluruh teks UI dan konten.
- Contact form terkirim via **Formspree**, dengan fallback `mailto:` bila Form ID belum dikonfigurasi.
- Fitur unduh CV (file CV disajikan dari `public/`).
- Navigasi dengan smooth scroll, layout responsif, HTML semantik.

## Capabilities

### New Capabilities
- `portfolio-content`: Data profil (identitas, ringkasan, skills, pengalaman, pendidikan, sertifikasi, proyek, kontak) dalam dua bahasa, dengan Profile.pdf (LinkedIn) sebagai sumber utama dan dokumen lokal sebagai referensi.
- `portfolio-sections`: Section halaman, navigasi smooth scroll, filter proyek, timeline, dan responsivitas.
- `theme-switching`: Dark/Light mode dengan persistensi dan default preferensi sistem.
- `language-switching`: Toggle bahasa EN/ID dan persistensinya.
- `contact-form`: Validasi, pengiriman via Formspree, fallback mailto, dan status kirim.
- `cv-download`: Penyediaan dan pengunduhan file CV dari Hero/navigasi.

### Modified Capabilities
<!-- Tidak ada; belum ada spec sebelumnya. -->

## Impact

- Input dari pemilik: `C:\laragon\project\resume\Profile.pdf` (sudah tersedia); hanya dibaca dan disalin ke `public/`, file aslinya tidak diubah.
- File baru: `package.json`, `vite.config.ts`, `svelte.config.js`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.ts`, `src/vite-env.d.ts`, `src/app.css`, `src/App.svelte`, `public/` (CV, favicon), `.gitignore`. File `src/main.js` dan `vite.config.js` dari implementasi awal digantikan versi `.ts`.
- Dependensi: `svelte@5`, `vite`, `@sveltejs/vite-plugin-svelte`, `tailwindcss` (v4 via `@tailwindcss/vite`), `@lucide/svelte`; dev: `typescript@6`, `svelte-check`, `@tsconfig/svelte`.
- Layanan eksternal: Formspree (butuh Form ID dari pemilik).
- Tidak mengubah file di luar `resume_portofolio/`; `index.html` lama dan `Profile.pdf` di folder induk tetap utuh.
