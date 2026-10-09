## Purpose

Memungkinkan pengunjung memilih tampilan terang atau gelap, dengan default mengikuti preferensi sistem dan pilihan yang diingat antar kunjungan.

## ADDED Requirements

### Requirement: Toggle dark/light mode
Website SHALL menyediakan tombol toggle tema di navigasi yang beralih antara mode terang dan gelap secara instan tanpa reload. Tombol MUST memiliki label aksesibel yang menyebut mode tujuan.

#### Scenario: Beralih ke dark mode
- **WHEN** pengunjung dalam mode terang mengklik toggle tema
- **THEN** seluruh halaman berganti ke palet gelap dan ikon toggle berubah

### Requirement: Default dan persistensi tema
Pada kunjungan pertama tema SHALL mengikuti `prefers-color-scheme` sistem. Pilihan manual pengunjung MUST disimpan di browser dan dipakai pada kunjungan berikutnya. Bila penyimpanan browser tidak tersedia, website MUST tetap berfungsi dengan default sistem.

#### Scenario: Kunjungan pertama dengan sistem gelap
- **WHEN** pengunjung baru membuka website dengan sistem dalam mode gelap
- **THEN** website tampil dalam dark mode

#### Scenario: Pilihan diingat
- **WHEN** pengunjung memilih light mode lalu memuat ulang halaman
- **THEN** website tampil dalam light mode

#### Scenario: Tidak ada kilatan tema salah
- **WHEN** halaman dimuat dengan tema tersimpan gelap
- **THEN** halaman tidak sempat tampil terang sebelum beralih ke gelap
