## Context

Lihat proposal.md, bagian Why. Kondisi saat ini:

- **Data di App.svelte:** semua data konten di-hardcode di `src/App.svelte` (sekitar 82 KB), termasuk `profile`, `skillGroups` (yang menyimpan komponen ikon Lucide), `experience`, `education`, `projectData`, dan string i18n `en`/`id`. Ringkasan untuk Profile memakai `t.summary(years)`.
- **Situs Vite single-page:** konfigurasinya `base: './'`, dengan satu entry `index.html`. Font Inter dimuat dari Google Fonts.
- **Folder repo:** `dist/` di-ignore. Situs lama di root repo di-deploy apa adanya (nginx `COPY .` dan GitLab Pages `cp -r *`), jadi file di root langsung ikut tersaji.
- **Main spec belum ada:** `openspec/specs/` masih kosong karena `init-awal-resume` (complete) belum di-archive. Delta MODIFIED untuk `cv-download` dan `portfolio-content` baru bisa diterapkan saat archive setelah change itu di-archive lebih dulu.
- **Sumber desain:** `../curiculum-new.docx`. Sidebar kuning #FBB01C selebar sekitar 67mm, garis #DFDFDF, foto bulat, ikon kontak berupa lingkaran hitam, dan judul section kapital tebal.

## Goals / Non-Goals

**Goals:**
- Satu sumber data untuk website dan CV.
- Membuat ulang CV cukup dengan satu perintah dan hasilnya deterministik.
- Pratinjau CV bisa dilihat di browser saat `npm run dev` untuk iterasi desain.

**Non-Goals:**
- Membuat PDF di browser pengunjung secara on-the-fly.
- Mengubah tampilan atau konten website selain nama pemilik dan tautan unduh.
- Mengubah `index.html` situs lama. Tombolnya berfungsi lewat file `curiculum-new.pdf`.
- Menjalankan pembuatan CV di CI. PDF dibuat lokal lalu di-commit sebagai aset statis.

## Decisions

### 1. Modul data bersama `src/data/`
- **Isi modul:** `profile`, `skillGroups`, `experience`, `education`, `languages` (baru), `projectData`/`categories`, serta helper format periode dan lama pengalaman dipindah ke `src/data/content.ts`. String yang dipakai bersama (summary, label periode "Present"/"Sekarang") ikut dipindah ke sana. String khusus UI website tetap di `App.svelte`.
- **Ikon skill:** data hanya menyimpan `key` kategori (`frontend|backend|databases|tools`), dan `App.svelte` memetakan key ke komponen ikon. Dengan begitu modul data bebas dari dependensi UI.
- **Alternatif yang ditolak:** menyalin data ke file CV terpisah, karena data bisa kembali tidak sinkron seperti masalah email lama.

### 2. Template CV sebagai halaman Vite kedua (`cv.html`)
- **Struktur:** `cv.html` dan `src/cv/main.ts` me-mount `src/cv/Cv.svelte`, yang membaca `?lang=en|id` dari URL.
- **Build:** `vite.config.ts` diberi `build.rollupOptions.input` berisi `index.html` dan `cv.html`. Karena itu `cv.html` ikut ter-build ke `dist/`. Dampaknya kecil dan tidak ditautkan dari website.
- **Gaya:** CSS polos dengan scope komponen Svelte, dimensi dalam mm, `@page { size: A4; margin: 0 }`.
- **Sidebar setinggi penuh di setiap halaman:** dibuat dengan elemen `position: fixed` (Chromium mengulang elemen fixed di setiap halaman cetak). Konten sidebar mengalir di kolom kiri halaman 1.
- **Entri tidak terbelah:** memakai `break-inside: avoid` per entri.
- **Alternatif yang ditolak:**
  - Tailwind untuk template: kurang presisi untuk tata letak cetak.
  - Template string HTML di Node: tidak bisa memakai pratinjau `vite dev`.

### 3. Font Inter di-bundle lokal
- **Cara:** CV memakai `@fontsource-variable/inter` (devDependency) yang di-import di `src/cv/main.ts`, jadi font tertanam di PDF tanpa bergantung pada jaringan saat mencetak.
- **Website:** tetap memakai Google Fonts. Tidak diubah, karena di luar scope.

### 4. Pembuatan PDF: `scripts/build-cv.mjs` dengan Playwright
`npm run cv` menjalankan `vite build`, lalu `vite preview` di port bebas, lalu Playwright Chromium untuk setiap bahasa:
- membuka `cv.html?lang=<lang>`;
- menunggu `document.fonts.ready` dan gambar selesai dimuat;
- `page.pdf({ format: 'A4', printBackground: true, preferCSSPageSize: true })`.

Output:
- ke `public/CV-Rohmatuloh-EN.pdf` dan `public/CV-Rohmatuloh-ID.pdf`;
- versi EN juga disalin ke `../curiculum-new.pdf`.

Script gagal (exit ≠ 0) bila PDF lebih dari 2 halaman. Jumlah halaman dihitung dari `page.evaluate` tinggi konten dibagi tinggi A4, atau dengan menghitung `/Type /Page` di buffer PDF.

PDF yang dihasilkan di-commit sebagai aset. `npm run build` tidak menjalankan `cv`, supaya build biasa tidak memerlukan Chromium.

- **Alternatif yang ditolak:**
  - `puppeteer-core` dengan Chrome lokal: bergantung pada path di mesin.
  - html2pdf/jsPDF di klien: hasilnya gambar, buruk untuk ATS.

### 5. Tautan unduh mengikuti bahasa
`CV_URL`/`CV_FILENAME` menjadi turunan dari `lang` (`./CV-Rohmatuloh-${lang.toUpperCase()}.pdf`). Keempat tautan unduh yang ada memakai nilai turunan itu.

### 6. Foto profil
Pilih satu dari `../assets/img/profile.jpg`, `profile1.jpg`, atau `profile2.JPG`, yaitu yang paling formal (wajah jelas, latar polos). Foto disalin dan dikompres ke `src/assets/cv-photo.jpg` (sekitar 400px, kurang dari 80 KB) lalu di-crop bulat lewat CSS.

### 7. Ikon kontak
Ikon kontak memakai SVG inline (glyph Lucide `mail`, `phone`/`message-circle`, `map-pin`, `linkedin`) di dalam lingkaran hitam berdiameter sekitar 6,5mm, seperti di docx. Teks kontak tetap teks asli di sebelah ikon, dan tautan memakai `<a href>` agar bisa diklik di PDF.

### 8. Nama "Rohmatuloh"
Nama diubah di `profile.name` dan `initials: 'R'`, di teks About p1 (EN/ID), serta di `<title>` dan meta `index.html`, juga di `package.json` description. Di CV, nama tampil sebagai "ROHMATULOH" lewat `text-transform: uppercase`. Chromium menyimpan teks yang sudah di-uppercase ke PDF, sehingga ATS membaca "ROHMATULOH". Ini tidak masalah, karena nama tetap utuh dan terbaca.

## Risks / Trade-offs

- **Konten melebihi 2 halaman** (9 posisi, sekitar 28 nama proyek, sekitar 42 skill). Mitigasi:
  - ukuran isi 8.5–9pt;
  - proyek hanya ditampilkan namanya;
  - script menolak hasil lebih dari 2 halaman, sehingga masalah terdeteksi saat pembuatan, bukan oleh HR.
- **Sidebar `position: fixed` tidak ikut dicetak ulang di renderer lain.** Mitigasi: PDF hanya dibuat oleh Chromium via Playwright, dan perilakunya diverifikasi di task.
- **Chromium Playwright sekitar 150 MB diunduh** saat `npx playwright install chromium`. Ini hanya diperlukan di mesin yang membuat CV dan didokumentasikan di README.
- **Lupa menjalankan `npm run cv` setelah data berubah**, sehingga PDF tertinggal. Mitigasi: catatan di README dan komentar di modul data.
- **Ekstraksi teks dua kolom bisa bercampur** di sebagian ATS. Mitigasi: urutan DOM adalah sidebar, lalu kolom utama (bukan diposisikan absolut per baris), dan setiap blok berupa elemen teks utuh.
- **Urutan archive.** Delta MODIFIED gagal diterapkan bila `init-awal-resume` belum di-archive. Mitigasi: archive `init-awal-resume` sebagai task pertama.

## Migration Plan

1. Archive `init-awal-resume`.
2. Implementasi.
3. Jalankan `npm run cv`, lalu commit PDF baru dan hapus `public/CV-Moh-Rahmatullah.pdf`.
4. Deploy seperti biasa.

**Rollback:** kembalikan `public/CV-Moh-Rahmatullah.pdf` dan `CV_URL` lama.
