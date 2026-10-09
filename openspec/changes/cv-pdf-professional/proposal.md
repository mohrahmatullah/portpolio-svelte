## Why

Tombol "Download CV" saat ini mengunduh `public/CV-Moh-Rahmatullah.pdf`, yang merupakan ekspor mentah profil LinkedIn (`Profile.pdf`). Tampilannya kurang profesional, kontaknya sudah usang (email lama, tanpa WhatsApp), dan isinya tidak ikut berubah saat data website diperbarui. Selain itu, tombol "Download Resume" di situs lama (`../index.html:188`) mengarah ke `curiculum-new.pdf` yang tidak ada (404).

## What Changes

- CV PDF baru dibuat otomatis dari data yang sama dengan website. Desainnya mengacu pada `curiculum-new.docx` yang dipoles: A4, maksimal 2 halaman, sidebar kiri kuning #FBB01C, teks asli yang ramah ATS.
- CV tersedia dalam dua bahasa: `CV-Rohmatuloh-EN.pdf` dan `CV-Rohmatuloh-ID.pdf`. Tombol unduh menyajikan versi sesuai bahasa yang sedang aktif.
- **BREAKING**: `public/CV-Moh-Rahmatullah.pdf` dihapus. Tautan langsung ke file lama tidak lagi berlaku.
- Nama pemilik di website dan CV berubah dari "Moh Rahmatullah" menjadi "Rohmatuloh" (inisial menjadi "R").
- Penanda "Top skill"/"Keahlian utama" (Spring Boot, Odoo, Odoo OWL, dari LinkedIn) dihapus di website dan tidak dipakai di CV. Semua skill tampil setara.
- Data bahasa yang dikuasai (Indonesian: Native, English: Passive) ditambahkan ke konten.
- Data konten (profile, skills, experience, education, projects) dipindah dari `App.svelte` ke modul data bersama yang dipakai website dan CV.
- Ditambahkan perintah `npm run cv` yang membuat ulang kedua PDF dan menyalin versi EN ke root repo sebagai `curiculum-new.pdf`, sehingga tombol situs lama berfungsi.

## Capabilities

### New Capabilities
- `cv-document`: isi, struktur, dan tampilan dokumen CV PDF yang dihasilkan dari data website (layout, section, bahasa, ATS, jumlah halaman).

### Modified Capabilities
- `cv-download`: file yang diunduh kini bergantung pada bahasa aktif, nama file berubah, dan situs lama ikut menyajikan CV yang sama.
- `portfolio-content`: nama pemilik menjadi "Rohmatuloh", penanda keahlian utama pada skills dihapus, dan konten mencakup data bahasa yang dikuasai.

## Impact

- **Kode:**
  - `src/App.svelte`: data dipindah keluar, dan tautan unduh dibuat sesuai bahasa.
  - Modul data baru di `src/data/`.
  - Halaman cetak baru, sebagai entry Vite `cv.html` beserta komponennya.
  - Foto profil disalin dari `../assets/img/` ke `src/assets/`.
- **Dependensi:** Playwright (devDependency) untuk mencetak PDF lewat Chromium headless.
- **Build/aset:**
  - `public/CV-Rohmatuloh-EN.pdf` dan `public/CV-Rohmatuloh-ID.pdf` ditambahkan, `public/CV-Moh-Rahmatullah.pdf` dihapus.
  - `../curiculum-new.pdf` ditambahkan di root repo, di luar folder proyek ini.
- **Tidak berubah:** `Profile.pdf` dan `curiculum-new.docx` tetap ada sebagai arsip.
