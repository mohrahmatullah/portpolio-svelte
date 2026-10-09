## Purpose

Mendefinisikan konten profil profesional Moh Rahmatullah yang ditampilkan di website portofolio, termasuk sumber data, kelengkapan, dan ketersediaan dalam dua bahasa.

## ADDED Requirements

### Requirement: Profile.pdf LinkedIn sebagai sumber konten utama
Website SHALL menampilkan identitas, headline, ringkasan, pengalaman kerja, pendidikan, skills, dan proyek sesuai ekspor LinkedIn `C:\laragon\project\resume\Profile.pdf` (profil `https://www.linkedin.com/in/moh-rahmatullah-b531b7163`). Dokumen lokal (`curiculum-new.docx`, `index.html` lama, `portofolio-website.pdf`) SHALL hanya dipakai sebagai referensi untuk mengisi data yang tidak ada di Profile.pdf (mis. nomor telepon, poin tanggung jawab, detail proyek) selama tidak bertentangan. Bila terjadi konflik (jabatan, perusahaan, periode, lokasi, email), data Profile.pdf MUST menang. Website MUST NOT menampilkan pengalaman, jabatan, perusahaan, atau proyek yang tidak ada di salah satu sumber.

#### Scenario: Pengalaman kerja mengikuti Profile.pdf
- **WHEN** pengunjung membuka section pengalaman
- **THEN** tampil 9 posisi berikut dengan jabatan, perusahaan, periode, dan lokasi (bila ada) persis seperti Profile.pdf, diurutkan berdasarkan tanggal mulai terbaru (sesuai requirement timeline di `portfolio-sections`):
  1. Remote Developer — Taiwan Mobile — Aug 2025 – Present
  2. Frontend Developer — Freelance — Jun 2025 – Jul 2025
  3. Web Developer — 1980Media | PT. Digital Media Konsultama — May 2025 – Aug 2025
  4. Web Developer — PT Sinergi Informatika Semen Indonesia (SISI) — Dec 2022 – Sep 2026 — South Jakarta
  5. Web Developer — PT Indosistem Teknologi Utama — Nov 2022 – May 2025 — West Jakarta
  6. Programmer — KJPP Karmanto dan Rekan (K-Appraisal) — Jun 2022 – Sep 2022 — South Jakarta
  7. Back End Developer — Choir Express (PT Fia Express Indonesia) — Jan 2022 – Jun 2022 — South Jakarta
  8. Web Developer — PT Indosistem Teknologi Utama — Jan 2021 – Jan 2022
  9. Back End Developer — PT. Merah Putih Media — Apr 2018 – Jan 2021 — Tangerang, Banten

#### Scenario: Posisi yang sedang berjalan
- **WHEN** sebuah posisi berstatus "Present" (Taiwan Mobile)
- **THEN** periodenya ditampilkan sebagai "Present"/"Sekarang" dan diberi penanda posisi saat ini

#### Scenario: Konflik data dengan CV lokal
- **WHEN** periode atau jabatan di `curiculum-new.docx` berbeda dari Profile.pdf (mis. SISI Jan 2021 – Mei 2025 di CV vs Dec 2022 – Sep 2026 di Profile.pdf)
- **THEN** website menampilkan versi Profile.pdf

#### Scenario: Pendidikan
- **WHEN** pengunjung membuka timeline pendidikan
- **THEN** tampil "DIII, Manajemen Informatika — Politeknik Piksi Input Serang (2013 – 2016)" dari Profile.pdf, dilengkapi "Rekayasa Perangkat Lunak — SMK Negeri 1 Pandeglang (2007 – 2010)" dari CV lokal karena tidak bertentangan

#### Scenario: Tidak ada placeholder
- **WHEN** halaman dirender
- **THEN** tidak ada teks placeholder seperti "Lorem ipsum", "isi di sini", atau email `youremail@gmail.com`

### Requirement: Identitas dan kontak
Website SHALL menampilkan nama "Moh Rahmatullah" (huruf kapital dirapikan dari Profile.pdf), headline yang meringkas "Web Developer · Odoo · Spring Boot · Node.js · React · Vue · PHP", lokasi "Tangerang, Indonesia", dan lama pengalaman yang dihitung dari posisi paling awal (Apr 2018) hingga tahun berjalan. Kontak SHALL berupa email `rahmat.noble@gmail.com`, WhatsApp `083876854003` (ditampilkan sebagai `+62 838-7685-4003`), dan tautan LinkedIn `https://www.linkedin.com/in/moh-rahmatullah-b531b7163` — nilai kontak ini ditetapkan langsung oleh pemilik dan mengesampingkan semua sumber dokumen. Email lain dari sumber (`mohrahmatullah17051992@gmail.com`, `rahmetuloh@gmail.com`, `youremail@gmail.com`) MUST NOT ditampilkan di website.

#### Scenario: Tautan kontak dapat diklik
- **WHEN** pengunjung mengklik email, WhatsApp, atau LinkedIn
- **THEN** masing-masing membuka `mailto:rahmat.noble@gmail.com`, chat WhatsApp `https://wa.me/6283876854003` di tab baru, atau profil LinkedIn di tab baru

#### Scenario: Email lama tidak tampil
- **WHEN** halaman dirender dalam bahasa apa pun
- **THEN** satu-satunya alamat email yang tampil atau dipakai di tautan adalah `rahmat.noble@gmail.com`

#### Scenario: Lama pengalaman
- **WHEN** halaman dirender pada tahun 2026
- **THEN** statistik pengalaman menampilkan "8+ years"/"8+ tahun"

### Requirement: Skills terkategori
Skills SHALL merupakan gabungan Top Skills, Tech Stack di Summary, dan teknologi pada deskripsi posisi di Profile.pdf (utama), ditambah skill CV lokal (pelengkap), dikelompokkan ke kategori:
- Frontend: React.js, Next.js, Vue.js, JavaScript, TypeScript, Inertia.js, Odoo OWL, EasyUI, Bulma CSS, EJS, Ajax
- Backend: Java Spring Boot, Odoo, PHP, Laravel, Lumen, CodeIgniter, Node.js, NestJS, Express.js, Python, FastAPI, Django, Python Tkinter, REST API, Microservices, BullMQ
- Databases: PostgreSQL, MySQL/MariaDB, SQL Server, Oracle, MongoDB, Redis
- Tools/DevOps: Docker, Git, Linux, NPM, Yarn, PNPM, Apache, Nginx, Windows
Top Skills Profile.pdf (Spring Boot, Odoo, Odoo OWL) MUST ditandai sebagai keahlian unggulan.

#### Scenario: Setiap skill sumber masuk kategori
- **WHEN** section skills dirender
- **THEN** setiap skill di atas muncul tepat di satu kategori, tanpa duplikat

#### Scenario: Top skills disorot
- **WHEN** section skills dirender
- **THEN** Spring Boot, Odoo, dan Odoo OWL tampil dengan penanda visual "Top skill"

### Requirement: Proyek dari Profile.pdf
Website SHALL menampilkan proyek yang tercantum di bawah setiap posisi Profile.pdf, masing-masing dengan judul, perusahaan/klien, kategori, deskripsi singkat EN/ID, dan tag teknologi sesuai Profile.pdf. Minimal mencakup: OSPF, Opbiz, Opbiz Intra, EBGEM Service (Taiwan Mobile); Mind ID E-Proc Contract Management System, Forca HR Modul LSP (SIG Group), Travel Request PT ABM, Travel Request PTPN IV, HCMS PT Wijaya Karya, HCMS PT Adhi Karya (SISI); Aplikasi Koperasi (1980Media); Aplikasi Kejagung (Freelance); Scheduler Overbooking, REST API Booking Agent, Desktop Dashboard PC, HRM App, Dashboard Koperasi, Web ERP, POS Retail, POS Restaurant, Dashboard Booking Agent (Indosistem); K-Appraisal Web App; Marketplace & Dashboard Choir Express; Web ERP (Indosistem 2021); Portal Media, Company Profile, Marketplace (Merah Putih Media). Detail tambahan dari CV lokal (mis. integrasi Midtrans/RajaOngkir/Xendit) boleh ditambahkan ke deskripsi proyek yang sesuai.

#### Scenario: Kartu proyek berisi metadata
- **WHEN** sebuah kartu proyek ditampilkan
- **THEN** kartu memuat judul, perusahaan/klien, deskripsi singkat, kategori, dan minimal satu tag teknologi

#### Scenario: Teknologi proyek sesuai sumber
- **WHEN** kartu "Scheduler Overbooking" ditampilkan
- **THEN** tag teknologinya NestJS, TypeScript, dan BullMQ

### Requirement: Konten tersedia dalam EN dan ID
Setiap teks yang ditujukan ke pengunjung (label navigasi, judul section, ringkasan, deskripsi posisi, deskripsi proyek, pesan form) SHALL memiliki versi Bahasa Inggris dan Bahasa Indonesia. Nama diri, nama perusahaan, nama proyek, dan nama teknologi MUST tetap sama di kedua bahasa.

#### Scenario: Tidak ada teks yang hilang saat ganti bahasa
- **WHEN** bahasa diganti dari EN ke ID atau sebaliknya
- **THEN** semua teks berganti dan tidak ada label kosong atau key mentah yang tampil
