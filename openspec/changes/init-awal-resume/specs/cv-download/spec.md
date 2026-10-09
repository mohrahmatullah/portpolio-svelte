## Purpose

Memungkinkan perekrut dan klien mengunduh curriculum vitae pemilik portofolio langsung dari website dengan satu klik.

## ADDED Requirements

### Requirement: Tombol unduh CV
Website SHALL menyediakan tombol "Download CV" di Hero dan di navigasi. Klik tombol MUST mengunduh file CV yang disajikan bersama website (bukan tautan ke layanan pihak ketiga) dengan nama file deskriptif yang memuat nama pemilik.

#### Scenario: Unduh dari Hero
- **WHEN** pengunjung mengklik "Download CV" di Hero
- **THEN** browser mengunduh file CV, mis. `CV-Moh-Rahmatullah.pdf`

### Requirement: File CV tersedia di build produksi
File CV SHALL ikut tersalin ke output build statis sehingga tautan unduh tidak menghasilkan 404 setelah deploy.

#### Scenario: Setelah build
- **WHEN** website hasil build disajikan dan tombol unduh diklik
- **THEN** server merespons file CV dengan status 200
