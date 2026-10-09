## Purpose

Memungkinkan pengunjung internasional maupun lokal membaca seluruh konten portofolio dalam Bahasa Inggris atau Bahasa Indonesia.

## ADDED Requirements

### Requirement: Toggle bahasa EN/ID
Website SHALL menyediakan kontrol bahasa di navigasi dengan pilihan EN dan ID. Mengganti bahasa MUST memperbarui seluruh teks halaman secara instan tanpa reload dan memperbarui atribut `lang` dokumen.

#### Scenario: Ganti ke Bahasa Indonesia
- **WHEN** pengunjung memilih ID
- **THEN** judul section, ringkasan, deskripsi, label form, dan pesan status tampil dalam Bahasa Indonesia dan `<html lang>` bernilai `id`

### Requirement: Default dan persistensi bahasa
Bahasa default SHALL English. Bila bahasa browser pengunjung diawali `id`, default MUST Bahasa Indonesia. Pilihan manual MUST disimpan di browser dan dipakai pada kunjungan berikutnya.

#### Scenario: Browser berbahasa Indonesia
- **WHEN** pengunjung baru dengan bahasa browser `id-ID` membuka website
- **THEN** website tampil dalam Bahasa Indonesia

#### Scenario: Pilihan bahasa diingat
- **WHEN** pengunjung memilih EN lalu memuat ulang halaman
- **THEN** website tampil dalam Bahasa Inggris
