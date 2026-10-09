## Context

Implementasi awal (tugas 0–7) sudah selesai dalam JavaScript dan lolos verifikasi browser; pemilik kemudian meminta seluruh kode memakai Svelte + TypeScript (Keputusan 12, tugas 8). Sumber utama konten adalah `C:\laragon\project\resume\Profile.pdf`, ekspor "Save to PDF" profil LinkedIn (3 halaman, teks dapat diekstrak) yang disediakan pemilik karena LinkedIn memblokir akses otomatis (HTTP 999). Referensi pelengkap ada di folder induk: `curiculum-new.docx`, `index.html` (resume lama Bootstrap), `portofolio-website.pdf`. `task.md` mensyaratkan seluruh UI + data dalam satu file Svelte. Motivasi: lihat proposal.md — Why. Kebutuhan perilaku: lihat `specs/`.

## Goals / Non-Goals

**Goals:**
- Kode sepenuhnya TypeScript dengan pemeriksaan tipe ketat yang memblokir build bila gagal.
- Proyek Vite + Svelte 5 yang langsung jalan (`npm install && npm run dev`) dan menghasilkan build statis di `dist/`.
- Satu `src/App.svelte` berisi data, logika state, dan markup — selain file bootstrap minimal (entry, CSS Tailwind, config).

**Non-Goals:**
- Backend/server sendiri, CMS, atau database.
- Scraping LinkedIn otomatis.
- Halaman detail proyek terpisah atau routing multi-halaman.
- Pengaturan CI/CD dan deploy (Dockerfile/`.gitlab-ci.yml` lama di folder induk tidak disentuh).

## Decisions

1. **Vite + Svelte 5 (runes), bukan SvelteKit.** Satu halaman statis tidak butuh routing/SSR; Vite lebih ringan dan `App.svelte` cocok dengan `task.md`. Kode tetap kompatibel dipindah ke `+page.svelte` karena tidak memakai API khusus Vite. Alternatif SvelteKit + adapter-static ditolak karena konfigurasi ekstra tanpa manfaat.

2. **Tailwind CSS v4 via `@tailwindcss/vite`.** Tanpa `tailwind.config.js`/PostCSS; dark mode berbasis class memakai `@custom-variant dark (&:where(.dark, .dark *));` di `src/app.css`. Alternatif v3 ditolak karena butuh lebih banyak file konfigurasi.

3. **Ikon: `@lucide/svelte`.** Paket `lucide-svelte` sudah deprecated; penggantinya untuk Svelte 5 adalah `@lucide/svelte`. Import per ikon (`@lucide/svelte/icons/<nama>`) agar dev/build tidak memproses ~1.900 ikon. Ikon brand (LinkedIn/WhatsApp) tidak tersedia di Lucide → pakai SVG inline kecil.

4. **State dengan runes, bukan store.** `$state` untuk `theme`, `lang`, `activeFilter`, `menuOpen`, `activeSection`, `form`, `status`; `$derived` untuk `t` (kamus bahasa aktif) dan `filteredProjects`; `$effect` untuk sinkronisasi class `dark`, `document.documentElement.lang`, dan `localStorage`. Akses `localStorage` dibungkus `try/catch`.

5. **Bentuk data i18n.** Satu objek `content = { en: {...}, id: {...} }` untuk teks UI, dan data domain (experience, education, projects, skills) dengan field teks bilingual `{ en, id }`. Helper `tr(v)` mengembalikan `v[lang]` bila objek, atau `v` apa adanya untuk nama diri/teknologi. Ini menjaga satu sumber data per entri sehingga kedua bahasa tidak drift.

6. **Anti-flash tema & bahasa.** Skrip inline kecil di `index.html` (sebelum bundle) membaca `localStorage`/`prefers-color-scheme` dan memasang class `dark` + atribut `lang` lebih awal. `App.svelte` membaca nilai awal dari `document.documentElement`.

7. **Smooth scroll & section aktif.** CSS `scroll-behavior: smooth` di dalam `@media (prefers-reduced-motion: no-preference)` + `scroll-margin-top` setinggi header. Section aktif dideteksi via `IntersectionObserver` di `$effect` (dibersihkan saat unmount).

8. **Contact form: Formspree dengan fallback mailto.** Konstanta `FORMSPREE_ENDPOINT` di atas `App.svelte` (kosong secara default). Jika terisi → `fetch` POST JSON dengan header `Accept: application/json`; jika kosong → bangun `mailto:` ter-encode. Honeypot field `_gotcha` (didukung Formspree). Validasi di klien, pesan error dari kamus bahasa aktif.

9. **File CV.** CV yang diunduh harus sama mutakhirnya dengan isi website, jadi `../Profile.pdf` disalin apa adanya ke `public/CV-Moh-Rahmatullah.pdf`; tombol memakai atribut `download` dan path diatur lewat konstanta `CV_URL`. Alternatif mengonversi `curiculum-new.docx` ditolak karena isinya lebih lama (posisi Taiwan Mobile dll. tidak ada) dan masih memuat placeholder `youremail@gmail.com`.

9a. **Intake Profile.pdf.** Data sudah dibaca saat perencanaan dan ditetapkan di `specs/portfolio-content/spec.md` (9 posisi, pendidikan, skills, daftar proyek), sehingga spec menjadi kontrak isi dan tidak perlu file `extracted.md` atau folder `sources/` terpisah. Saat apply, Profile.pdf dibaca ulang hanya untuk memverifikasi bahwa file tidak berubah sejak perencanaan; bila berubah (mis. posisi baru), data terbaru yang dipakai dan perbedaannya dilaporkan.
   Normalisasi yang diterapkan pada data Profile.pdf:
   - Nama "moh rahmatullah" → "Moh Rahmatullah"; "Programer" → "Programmer"; "Dekstop" → "Desktop"; "Rest full" → "RESTful"; nama teknologi diseragamkan (mis. "Postgresql" → "PostgreSQL", "next js" → "Next.js", "BullMq" → "BullMQ").
   - Headline panjang ("Web Developer - Odoo Developer - Springboot Developer - …") diringkas menjadi role utama "Web Developer" + baris spesialisasi.
   - Summary menyebut "7+ Years" sekaligus "over 5 years"; angka yang tampil dihitung dari posisi paling awal (Apr 2018) sehingga konsisten (8+ pada 2026). Kalimat ringkasan ditulis ulang EN/ID dari Summary tanpa menambah klaim baru.
   - Lokasi: "Tangerang, Indonesia" (dari Summary) karena headline hanya "Indonesia".
   - Deskripsi posisi = daftar proyek di bawah posisi tersebut; poin tanggung jawab generik dari CV lokal (mis. "Create RESTful API", "Design database structure", integrasi Midtrans/RajaOngkir/Xendit) hanya ditambahkan ke posisi yang perusahaannya sama.

10. **Kategori proyek untuk filter.** Dibentuk dari ~28 proyek di Profile.pdf:
   - `Enterprise & Telco`: OSPF, Opbiz, Opbiz Intra, EBGEM Service (Taiwan Mobile), Mind ID E-Proc Contract Management
   - `ERP & Business`: Web ERP (Indosistem ×2), Aplikasi Koperasi, Dashboard Koperasi
   - `HR & HCMS`: Forca HR Modul LSP, HCMS Wijaya Karya, HCMS Adhi Karya, HRM App, Travel Request ABM, Travel Request PTPN IV
   - `Booking & Scheduling`: Scheduler Overbooking, RESTful API Booking Agent, Dashboard Booking Agent
   - `E-commerce & POS`: POS Retail, POS Restaurant, Marketplace Choir Express, Marketplace Merah Putih Media
   - `Media & Web`: Portal Media, Company Profile, Dashboard Choir Express, K-Appraisal, Aplikasi Kejagung, Desktop Dashboard PC
   Daftar tombol filter diturunkan dari data (`All` + kategori unik) agar tidak ada filter kosong. Proyek dari posisi terbaru diurutkan lebih dulu.

11. **Rekonsiliasi data.** Prioritas Profile.pdf > `curiculum-new.docx` > `index.html` > `portofolio-website.pdf`. Field struktural (jabatan, perusahaan, periode, lokasi, pendidikan, email) selalu dari Profile.pdf; sumber lokal hanya mengisi yang tidak ada di Profile.pdf: nomor telepon `083876854003`, pendidikan SMK Negeri 1 Pandeglang, skill tambahan (Apache, Nginx, Ajax, Windows), dan detail proyek. Pengecualian: kontak ditetapkan langsung oleh pemilik dan mengesampingkan semua dokumen — email `rahmat.noble@gmail.com` (menggantikan `mohrahmatullah17051992@gmail.com` di Profile.pdf dan `rahmetuloh@gmail.com` di CV) dan WhatsApp `083876854003`. Nomor disimpan sekali dalam format internasional `6283876854003`; tautan WhatsApp dibentuk sebagai `https://wa.me/6283876854003`, tampilan `+62 838-7685-4003`. Email dan nomor disimpan di satu objek `profile.contact` yang dipakai oleh section Contact, Hero, footer, fallback mailto, dan pesan gagal form, agar tidak ada nilai ganda. Konflik lain yang sudah teridentifikasi: lokasi (Tangerang vs Jakarta Barat), periode SISI (Dec 2022 – Sep 2026 vs Jan 2021 – Mei 2025), periode Fia Express/K-Appraisal, dan posisi Indosistem yang tidak ada di CV — semuanya mengikuti Profile.pdf. Ejaan dirapikan (mis. "Eccomerce" → "E-commerce", "Majamen" → "Manajemen", "MogoDB" → "MongoDB").

12. **TypeScript.** Seluruh kode memakai TypeScript dalam mode `strict`.
   - **Tooling:** `typescript@^6` + `svelte-check` + `@tsconfig/svelte`. TypeScript 7 (rilis native) belum masuk rentang peer `svelte-check` (`^5 || ^6`), jadi belum dipakai. Svelte 5 dan Vite memproses `lang="ts"` secara bawaan lewat `vitePreprocess`, tanpa plugin tambahan.
   - **File:** `src/main.ts`, `vite.config.ts`, `src/vite-env.d.ts` (referensi `svelte` + `vite/client`), `tsconfig.json` (extends `@tsconfig/svelte`, `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`), `tsconfig.node.json` untuk `vite.config.ts`. `svelte.config.js` tetap JS karena dimuat langsung oleh plugin.
   - **Tipe domain** dideklarasikan di atas `App.svelte` (tetap satu file sesuai `task.md`):
     - `Lang = 'en' | 'id'`, `Theme = 'light' | 'dark'`, `Localized = Record<Lang, string>`, `YearMonth = { y: number; m: number }`.
     - `Experience` dengan `id` bertipe union literal (`ExperienceId`), `CategoryKey` sebagai union literal enam kategori. Akibatnya `Project.exp` dan `Project.category` yang salah ketik gagal saat type-check, bukan diam-diam hilang dari filter atau timeline.
     - `SkillGroup`, `Education`, `Certification`, `Profile`.
     - Kamus UI: `content.en` menjadi sumber bentuk (`type Dictionary = typeof content.en`) dan `content.id` dideklarasikan `satisfies Dictionary`, sehingga key terjemahan yang hilang atau salah tipe di salah satu bahasa menjadi error kompilasi.
   - **State & form:** `$state<Theme>`, `$state<Lang>`, `$state<'all' | CategoryKey>`, `FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'mailto'`, `FormErrors = Partial<Record<'name' | 'email' | 'message', ErrorKey>>` dengan `ErrorKey = keyof Dictionary['contact']['errors']`.
   - **Ikon:** komponen ikon diketik sebagai `Component` dari `svelte` (mis. `icon: typeof Monitor`) agar `<group.icon />` lolos pengecekan.
   - **Build:** script `check` = `svelte-check --tsconfig ./tsconfig.json`, dan `build` = `npm run check && vite build`, sehingga build gagal bila ada error tipe. Vite sendiri hanya membuang tipe dan tidak memeriksanya.
   - **Alternatif ditolak:** JSDoc + `checkJs` (tipe kurang ekspresif untuk union literal dan `satisfies`, sintaks lebih ramai), atau TypeScript tanpa `svelte-check` (error tipe tidak pernah terdeteksi).

## Risks / Trade-offs

- [Profile.pdf hanya snapshot; LinkedIn bisa berubah lagi] → README menjelaskan alur pembaruan: ekspor ulang Profile.pdf, perbarui objek data di `App.svelte`, salin ulang ke `public/`.
- [Profile.pdf tidak memuat deskripsi tanggung jawab, hanya daftar proyek] → Timeline menampilkan proyek per posisi sebagai poin; poin generik dari CV hanya untuk perusahaan yang sama (Keputusan 9a).
- [Banyak periode kerja tumpang-tindih (Taiwan Mobile, SISI, Indosistem, 1980Media, Freelance pada 2025)] → Tampilkan sesuai Profile.pdf; tidak diinterpretasi ulang.
- [CV yang diunduh (salinan Profile.pdf) masih mencantumkan email `mohrahmatullah17051992@gmail.com` dan tidak memuat WhatsApp, berbeda dari kontak di website] → PDF tidak diedit; laporan apply dan README menyarankan pemilik memperbarui kontak di LinkedIn lalu mengekspor ulang Profile.pdf, atau mengganti `public/CV-Moh-Rahmatullah.pdf` dengan CV yang sudah memakai `rahmat.noble@gmail.com`.
- [Formspree belum dikonfigurasi pemilik] → Fallback mailto tetap membuat form fungsional; instruksi pengisian Form ID dicantumkan di README.
- [Migrasi JS → TS mengubah perilaku tanpa sengaja] → Perubahan dibatasi pada anotasi tipe dan penggantian nama file; suite verifikasi browser yang sama (53 cek + 6 cek Formspree) dijalankan ulang dan harus tetap lolos penuh.
- [`build` lebih lambat karena `svelte-check`] → Diterima (beberapa detik); `npm run dev` tidak menjalankan type-check sehingga hot reload tetap cepat.
- [`App.svelte` sangat besar karena satu file] → Diterima demi kepatuhan `task.md`; data dikelompokkan di blok `<script>` teratas dengan penanda section agar mudah diedit.

## Migration Plan

Proyek baru; tidak ada migrasi. Resume lama di `C:\laragon\project\resume\index.html` tetap berjalan sampai pemilik memutuskan mengganti deploy dengan isi `dist/`. Rollback = tetap memakai situs lama.

## Open Questions

- Form ID Formspree milik pemilik (cukup diisi di konstanta; tidak mengubah spesifikasi).
- Foto profil: bila pemilik menyediakan (mis. dari `../assets`), dipakai di Hero; jika tidak, pakai avatar inisial "MR".
- URL GitHub pemilik, bila ada, untuk ditambahkan ke social links.
