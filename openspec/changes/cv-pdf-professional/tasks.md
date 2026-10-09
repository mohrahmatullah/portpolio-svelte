## 1. Persiapan

- [x] 1.1 Archive change `init-awal-resume` (sudah complete) agar main spec `cv-download` dan `portfolio-content` tersedia di `openspec/specs/`
- [x] 1.2 Tambahkan devDependency `playwright` dan `@fontsource-variable/inter`, lalu jalankan `npx playwright install chromium`
- [x] 1.3 Pilih foto paling formal dari `../assets/img/profile*.jpg`, lalu kompres dan simpan sebagai `src/assets/cv-photo.jpg` (sekitar 400px, kurang dari 80 KB)

## 2. Modul data bersama

- [x] 2.1 Buat `src/data/content.ts`, lalu pindahkan tipe dan data `profile`, `skillGroups` (tanpa komponen ikon, hanya `key`), `experience` (beserta sort), `education`, `certifications`, `categories`, dan `projectData` dari `App.svelte`
- [x] 2.2 Pindahkan helper bersama (format periode bulan/tahun EN/ID, hitung lama pengalaman, label "Present"/"Sekarang") dan string `summary` EN/ID ke modul data
- [x] 2.3 Tambahkan data `languages` EN/ID: Indonesian (Native) / Bahasa Indonesia (Penutur asli), English (Passive) / Bahasa Inggris (Pasif)
- [x] 2.4 Ubah `App.svelte` agar meng-import data dari `src/data/content.ts` dan memetakan `key` kategori skill ke ikon Lucide. Pastikan tampilan website tidak berubah (`npm run check` lulus)

## 3. Nama pemilik

- [x] 3.1 Ubah `profile.name` menjadi "Rohmatuloh" dan `initials` menjadi "R"
- [x] 3.2 Ganti "Rahmatullah" di teks About p1 EN/ID menjadi "Rohmatuloh"
- [x] 3.3 Ganti "Moh Rahmatullah" di `index.html` (`<title>`, meta description, author, keywords, og:title) dan di description `package.json`

## 3b. Hapus penanda keahlian utama

- [x] 3b.1 Hapus flag `top` dari data skill dan konstanta `topSkills`
- [x] 3b.2 Hapus deretan chip Top Skills di kartu profil Hero, gaya amber/ikon bintang pada item skill, dan keterangan legenda "Top skill" di bawah section Skills
- [x] 3b.3 Hapus string i18n `skills.top`/`skills.topSkills` (EN/ID) dan import ikon `Star` bila tidak dipakai lagi, lalu pastikan `npm run check` lulus

## 4. Template CV

- [x] 4.1 Tambahkan `cv.html` dan `src/cv/main.ts` (import font Inter, baca `?lang=en|id`, mount `Cv.svelte`), lalu daftarkan `cv.html` sebagai input kedua di `vite.config.ts`
- [x] 4.2 Buat kerangka `src/cv/Cv.svelte`:
  - `@page` A4 margin 0;
  - latar sidebar kuning #FBB01C (sekitar 67mm) `position: fixed` setinggi penuh;
  - dua kolom (sidebar, lalu main) dalam urutan DOM;
  - garis #DFDFDF;
  - judul section Inter bold kapital
- [x] 4.3 Sidebar:
  - foto bulat;
  - "ROHMATULOH" dan "Web Developer";
  - kontak dengan ikon SVG dalam lingkaran hitam, sebagai tautan `mailto:`/`wa.me`/LinkedIn;
  - Skills per kategori dipisah koma, semua dengan gaya yang sama;
  - Education;
  - Languages
- [x] 4.4 Kolom utama:
  - section Profile (summary dengan lama pengalaman);
  - section Experience: semua posisi, berisi jabatan, perusahaan, periode, lokasi, poin duties, dan baris "Key projects"/"Proyek utama" dari `projectData` via `exp`;
  - `break-inside: avoid` per entri
- [x] 4.5 Label section dan teks CV EN/ID lengkap ("EXPERIENCE"/"PENGALAMAN", "EDUCATION"/"PENDIDIKAN", "LANGUAGES"/"BAHASA", "Present"/"Sekarang"). Periksa pratinjau `npm run dev` di `/cv.html?lang=en` dan `?lang=id`

## 5. Pembuatan PDF

- [x] 5.1 Buat `scripts/build-cv.mjs`:
  - jalankan `vite build` lalu `vite preview` di port bebas;
  - buka Playwright Chromium untuk `en` dan `id`;
  - tunggu font dan gambar selesai dimuat;
  - `page.pdf` A4 `printBackground`
- [x] 5.2 Tulis output ke `public/CV-Rohmatuloh-EN.pdf` dan `public/CV-Rohmatuloh-ID.pdf`, salin versi EN ke `../curiculum-new.pdf`, dan buat script gagal bila PDF lebih dari 2 halaman
- [x] 5.3 Tambahkan script `"cv": "node scripts/build-cv.mjs"` di `package.json`, lalu jalankan `npm run cv`

## 6. Tautan unduh

- [x] 6.1 Turunkan `CV_URL`/`CV_FILENAME` dari bahasa aktif (`CV-Rohmatuloh-EN.pdf`/`CV-Rohmatuloh-ID.pdf`) untuk keempat tautan unduh di `App.svelte`
- [x] 6.2 Hapus `public/CV-Moh-Rahmatullah.pdf` dan perbarui komentar CV di `App.svelte`

## 7. Verifikasi

- [x] 7.1 Periksa visual kedua PDF:
  - A4, 1–2 halaman;
  - sidebar kuning tampil di setiap halaman;
  - tidak ada entri pengalaman yang terbelah
- [x] 7.2 Ekstrak teks kedua PDF:
  - nama, email, WhatsApp, semua jabatan, perusahaan, dan periode terbaca;
  - tidak ada email usang;
  - tautan kontak dapat diklik
- [x] 7.3 Jalankan `npm run build` dan `vite preview`. Pastikan tombol unduh memberi file yang benar di EN dan ID (status 200), dan `../curiculum-new.pdf` identik dengan versi EN
- [x] 7.4 Perbarui `README.md`: cara membuat ulang CV (`npx playwright install chromium`, `npm run cv`) dan catatan untuk menjalankannya setiap kali data berubah. Hapus catatan known issue soal email lama di CV
