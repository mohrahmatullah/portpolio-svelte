## 0. Verifikasi Sumber

- [x] 0.1 Baca ulang `C:\laragon\project\resume\Profile.pdf` dan pastikan isinya masih sama dengan data di `specs/portfolio-content/spec.md`; bila ada perubahan, pakai data terbaru dan catat perbedaannya untuk laporan apply (design #9a)

## 1. Setup Proyek

- [x] 1.1 Buat `package.json` (scripts `dev`, `build`, `preview`) dengan dependensi `svelte@5`, `vite`, `@sveltejs/vite-plugin-svelte`, `tailwindcss`, `@tailwindcss/vite`, `lucide-svelte`; jalankan `npm install`
- [x] 1.2 Buat `vite.config.js` (plugin svelte + tailwind) dan `svelte.config.js`
- [x] 1.3 Buat `index.html` dengan meta SEO/OG, favicon, dan skrip inline anti-flash tema & bahasa (design #6)
- [x] 1.4 Buat `src/main.js` (mount `App` dengan `mount()` Svelte 5) dan `src/app.css` (`@import "tailwindcss"`, `@custom-variant dark`, smooth scroll ber-guard reduced-motion, `scroll-margin-top`)
- [x] 1.5 Buat `.gitignore` (`node_modules`, `dist`) dan pastikan `npm run dev` berjalan dengan App kosong

## 2. Data Konten (dalam `src/App.svelte`)

- [x] 2.1 Tulis objek `profile` (nama "Moh Rahmatullah", role + baris spesialisasi, lokasi Tangerang, `contact` berisi email `rahmat.noble@gmail.com` dan WhatsApp `6283876854003` (tautan `https://wa.me/6283876854003`, tampilan `+62 838-7685-4003`), LinkedIn, ringkasan EN/ID dari Summary, lama pengalaman dihitung dari Apr 2018) sesuai normalisasi design #9a
- [x] 2.2 Tulis `skills` dalam 4 kategori sesuai daftar di spec, dengan flag `top` untuk Spring Boot, Odoo, Odoo OWL
- [x] 2.3 Tulis `experience` 9 posisi dari Profile.pdf (urut terbaru, flag `current` untuk Taiwan Mobile) dengan daftar proyek per posisi sebagai poin EN/ID, ditambah poin CV hanya untuk perusahaan yang sama
- [x] 2.4 Tulis `education` (Politeknik Piksi Input Serang dari Profile.pdf + SMK Negeri 1 Pandeglang dari CV); `certifications` dibiarkan kosong karena Profile.pdf tidak memuatnya
- [x] 2.5 Tulis ~28 `projects` dari Profile.pdf dengan kategori (design #10), perusahaan/klien, deskripsi EN/ID, dan tag teknologi persis seperti Profile.pdf
- [x] 2.6 Tulis kamus UI `content.en` / `content.id` (nav, judul section, label form, pesan validasi/status, footer) dan helper `tr()`

## 3. State & Perilaku

- [x] 3.1 State tema (`$state` + `$effect`): baca nilai awal dari `<html>`, toggle class `dark`, simpan ke `localStorage` dengan try/catch
- [x] 3.2 State bahasa: default EN / `id` dari `navigator.language`, toggle EN/ID, sinkron `document.documentElement.lang`, simpan ke `localStorage`
- [x] 3.3 Navigasi: menu mobile open/close (tutup setelah klik), deteksi section aktif via `IntersectionObserver`
- [x] 3.4 Filter proyek: `activeFilter` + `filteredProjects` (`$derived`), tombol filter diturunkan dari data
- [x] 3.5 Contact form: validasi field, honeypot `_gotcha`, submit Formspree (loading/sukses/gagal) dan fallback `mailto:` bila `FORMSPREE_ENDPOINT` kosong

## 4. Markup & Styling Section

- [x] 4.1 Header sticky: logo/inisial, tautan section, toggle bahasa, toggle tema, tombol Download CV, menu hamburger mobile
- [x] 4.2 Hero: nama, role, ringkasan, CTA Download CV & Contact, avatar/foto, tautan sosial
- [x] 4.3 About: narasi profil + highlight (tahun pengalaman, domain proyek, lokasi, bahasa)
- [x] 4.4 Skills grid 4 kartu kategori dengan ikon Lucide
- [x] 4.5 Projects: tombol filter + grid kartu interaktif (hover/focus, tag teknologi, kategori)
- [x] 4.6 Timeline Experience & Education vertikal responsif, plus blok sertifikasi yang hanya dirender bila datanya ada
- [x] 4.7 Contact: info kontak, social links (SVG inline untuk ikon brand), form dengan pesan error per field dan status kirim
- [x] 4.8 Footer dengan hak cipta dan tautan kembali ke atas
- [x] 4.9 Pastikan palet dark/light konsisten di semua section dan kontras teks memadai

## 5. CV Download

- [x] 5.1 Salin `C:\laragon\project\resume\Profile.pdf` ke `public/CV-Moh-Rahmatullah.pdf` tanpa mengubah file asli (design #9)
- [x] 5.2 Set konstanta `CV_URL` dan atribut `download` di tombol Hero & header

## 6. Verifikasi

- [x] 6.1 `npm run build` sukses tanpa error/warning Svelte; `npm run preview` menyajikan halaman dan file CV (status 200)
- [x] 6.2 Cek manual skenario spec: deep link `#projects`, smooth scroll, section aktif, filter + reset, toggle tema & persistensi, toggle bahasa & persistensi, tidak ada teks kosong saat ganti bahasa
- [x] 6.3 Cek responsif pada 320px, 375px, 768px, 1280px tanpa scroll horizontal; cek navigasi keyboard dan reduced-motion
- [x] 6.4 Uji form: validasi error, fallback mailto (endpoint kosong), dan alur sukses/gagal bila endpoint diisi
- [x] 6.5 Pastikan tidak ada placeholder (`youremail@gmail.com`, lorem ipsum), satu-satunya email yang muncul (teks maupun `mailto:`) adalah `rahmat.noble@gmail.com` dan tautan WhatsApp mengarah ke `wa.me/6283876854003`, dan 9 posisi + pendidikan + proyek di website identik dengan spec `portfolio-content` / Profile.pdf

## 7. Dokumentasi

- [x] 7.1 Tulis `README.md`: cara install/dev/build, cara mengisi `FORMSPREE_ENDPOINT`, cara mengganti CV/foto, cara memperbarui data dari ekspor LinkedIn baru (Save to PDF → perbarui objek data di `App.svelte` → salin ulang ke `public/`), catatan konflik data yang sudah diselesaikan (design #11), dan saran memperbarui email di LinkedIn/CV PDF agar sama dengan `rahmat.noble@gmail.com`

## 8. Migrasi ke TypeScript (design #12)

- [x] 8.1 Tambah devDependencies `typescript@^6`, `svelte-check`, `@tsconfig/svelte`; script `check` (`svelte-check --tsconfig ./tsconfig.json`) dan ubah `build` menjadi `npm run check && vite build`
- [x] 8.2 Buat `tsconfig.json` (extends `@tsconfig/svelte`, `strict`, `noUncheckedIndexedAccess`, `verbatimModuleSyntax`, include `src`) dan `tsconfig.node.json` untuk `vite.config.ts`
- [x] 8.3 Ganti `vite.config.js` → `vite.config.ts` dan `src/main.js` → `src/main.ts` (non-null check pada `#app`); tambah `src/vite-env.d.ts`; perbarui `<script src>` di `index.html`
- [x] 8.4 Ubah `App.svelte` ke `<script lang="ts">` dan deklarasikan tipe domain: `Lang`, `Theme`, `Localized`, `YearMonth`, `ExperienceId`, `CategoryKey`, `Experience`, `Project`, `SkillGroup`, `Education`, `Certification`, `Profile`
- [x] 8.5 Ketik kamus UI: `type Dictionary = typeof content.en`, `content.id` memakai `satisfies Dictionary`; ketik `tr()`, helper tanggal, dan fungsi kamus (`summary`, `duration`, `showing`, dll.)
- [x] 8.6 Ketik state & form: `$state<Theme>`, `$state<Lang>`, `$state<'all' | CategoryKey>`, `FormStatus`, `FormErrors`/`ErrorKey`, event handler (`SubmitEvent`, `KeyboardEvent`), dan ikon sebagai `Component`
- [x] 8.7 `npm run check` bersih (0 error, 0 warning) dan `npm run build` sukses; buktikan type-check bekerja dengan sementara memasukkan `category` tidak valid dan key terjemahan yang hilang di `content.id` (keduanya harus gagal), lalu kembalikan
- [x] 8.8 Jalankan ulang verifikasi browser (53 cek) dan verifikasi Formspree (6 cek); semuanya harus lolos tanpa perubahan perilaku/tampilan
- [x] 8.9 Perbarui `README.md`: stack TypeScript, script `npm run check`, dan catatan bahwa tipe menjaga konsistensi data saat memperbarui konten
