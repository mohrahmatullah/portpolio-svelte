## Purpose

Mendefinisikan struktur halaman tunggal portofolio: section yang tersedia, navigasi, interaksi kartu proyek, timeline, serta standar responsif dan aksesibilitas.

## ADDED Requirements

### Requirement: Urutan section halaman tunggal
Halaman SHALL berupa single page dengan section berurutan: Hero, About, Skills, Projects, Experience & Education, Contact, diikuti footer. Setiap section MUST memakai elemen HTML semantik (`header`, `nav`, `main`, `section`, `footer`) dan memiliki `id` yang dapat ditautkan.

#### Scenario: Deep link ke section
- **WHEN** pengunjung membuka URL dengan hash `#projects`
- **THEN** halaman langsung menampilkan section Projects

### Requirement: Hero section
Hero SHALL menampilkan nama, role, ringkasan profil singkat, serta dua CTA: "Download CV" dan "Contact".

#### Scenario: CTA Contact
- **WHEN** pengunjung mengklik CTA "Contact"
- **THEN** halaman bergulir halus (smooth scroll) ke section Contact

### Requirement: Navigasi dengan smooth scroll
Header navigasi SHALL tetap terlihat (sticky) dan memuat tautan ke setiap section, toggle tema, dan toggle bahasa. Klik tautan MUST menggulir halus ke section tujuan tanpa tertutup header. Pada layar < 768px navigasi MUST berupa menu yang dapat dibuka/ditutup dan tertutup otomatis setelah tautan dipilih.

#### Scenario: Navigasi mobile
- **WHEN** pengunjung di layar 375px membuka menu lalu memilih "Experience"
- **THEN** menu tertutup dan halaman bergulir ke section Experience

#### Scenario: Section aktif ditandai
- **WHEN** pengunjung menggulir hingga section Skills berada di viewport
- **THEN** tautan "Skills" di navigasi ditandai sebagai aktif

### Requirement: Filter kartu proyek
Section Projects SHALL menyediakan filter kategori dengan opsi "All" plus setiap kategori proyek yang ada. Memilih filter MUST hanya menampilkan proyek pada kategori tersebut. Kartu proyek MUST memberikan umpan balik visual saat hover/focus.

#### Scenario: Filter kategori
- **WHEN** pengunjung memilih filter "E-commerce"
- **THEN** hanya kartu proyek berkategori E-commerce yang tampil dan tombol filter tersebut ditandai aktif

#### Scenario: Reset filter
- **WHEN** pengunjung memilih "All"
- **THEN** semua kartu proyek tampil kembali

### Requirement: Timeline pengalaman dan pendidikan
Pengalaman dan pendidikan SHALL ditampilkan sebagai timeline vertikal terurut dari yang terbaru, masing-masing memuat jabatan/jurusan, institusi, lokasi, periode, dan poin-poin tanggung jawab (untuk pengalaman).

#### Scenario: Sertifikasi dari LinkedIn
- **WHEN** profil LinkedIn memiliki sertifikasi atau lisensi
- **THEN** sertifikasi tampil di bawah timeline pendidikan dengan nama, penerbit, dan tahun; bila tidak ada, blok sertifikasi tidak dirender

#### Scenario: Urutan terbaru di atas
- **WHEN** timeline pengalaman dirender
- **THEN** entri dengan tanggal mulai paling baru berada paling atas

### Requirement: Responsif dan aksesibel
Layout SHALL dapat digunakan tanpa scroll horizontal pada lebar 320px hingga 1920px. Semua elemen interaktif MUST dapat dioperasikan dengan keyboard dan memiliki label aksesibel. Animasi gulir MUST dinonaktifkan bila pengguna mengaktifkan `prefers-reduced-motion`.

#### Scenario: Lebar layar kecil
- **WHEN** halaman dibuka pada lebar 320px
- **THEN** tidak ada konten yang terpotong atau memicu scroll horizontal

#### Scenario: Reduced motion
- **WHEN** sistem pengunjung menyetel `prefers-reduced-motion: reduce`
- **THEN** navigasi melompat langsung ke section tanpa animasi
