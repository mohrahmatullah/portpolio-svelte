## MODIFIED Requirements

### Requirement: Tombol unduh CV
Website SHALL menyediakan tombol "Download CV" di Hero dan di navigasi. Klik tombol MUST mengunduh file CV yang disajikan bersama website (bukan tautan ke layanan pihak ketiga), sesuai bahasa yang sedang aktif:
- `CV-Rohmatuloh-EN.pdf` saat bahasa Inggris aktif;
- `CV-Rohmatuloh-ID.pdf` saat bahasa Indonesia aktif.

#### Scenario: Unduh dari Hero dalam bahasa Inggris
- **WHEN** bahasa aktif EN dan pengunjung mengklik "Download CV" di Hero
- **THEN** browser mengunduh `CV-Rohmatuloh-EN.pdf`

#### Scenario: Unduh setelah ganti bahasa
- **WHEN** pengunjung mengganti bahasa ke ID lalu mengklik tombol unduh CV di mana pun
- **THEN** browser mengunduh `CV-Rohmatuloh-ID.pdf`

### Requirement: File CV tersedia di build produksi
Kedua file CV (EN dan ID) SHALL ikut tersalin ke output build statis, sehingga tautan unduh tidak menghasilkan 404 setelah deploy. File CV lama `CV-Moh-Rahmatullah.pdf` MUST NOT lagi disertakan.

#### Scenario: Setelah build
- **WHEN** website hasil build disajikan dan tombol unduh diklik dalam bahasa apa pun
- **THEN** server merespons file CV bahasa tersebut dengan status 200

## ADDED Requirements

### Requirement: CV di situs lama
Root repo SHALL berisi `curiculum-new.pdf` yang identik dengan `CV-Rohmatuloh-EN.pdf` terbaru. Dengan begitu, tombol "Download Resume" di situs lama (`index.html`) membuka CV baru dan tidak lagi 404.

#### Scenario: Tombol situs lama
- **WHEN** pengunjung situs lama mengklik "Download Resume"
- **THEN** CV versi EN terbaru terbuka

#### Scenario: CV dibuat ulang
- **WHEN** CV dibuat ulang setelah data berubah
- **THEN** `curiculum-new.pdf` di root ikut diperbarui dan isinya sama dengan `CV-Rohmatuloh-EN.pdf`
