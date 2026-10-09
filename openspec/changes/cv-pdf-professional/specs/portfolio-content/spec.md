## MODIFIED Requirements

### Requirement: Identitas dan kontak
Website SHALL menampilkan:
- **Nama:** "Rohmatuloh". Nama ini ditetapkan langsung oleh pemilik dan mengesampingkan "Moh Rahmatullah" di Profile.pdf. Inisial yang dipakai adalah "R".
- **Headline:** ringkasan "Web Developer · Odoo · Spring Boot · Node.js · React · Vue · PHP".
- **Lokasi:** "Tangerang, Indonesia".
- **Lama pengalaman:** dihitung dari posisi paling awal (Apr 2018) hingga tahun berjalan.

Kontak SHALL berupa:
- email `rahmat.noble@gmail.com`;
- WhatsApp `083876854003`, ditampilkan sebagai `+62 838-7685-4003`;
- tautan LinkedIn `https://www.linkedin.com/in/moh-rahmatullah-b531b7163`.

Nilai kontak ini ditetapkan langsung oleh pemilik dan mengesampingkan semua sumber dokumen. Email lain dari sumber (`mohrahmatullah17051992@gmail.com`, `rahmetuloh@gmail.com`, `youremail@gmail.com`) MUST NOT ditampilkan di website.

#### Scenario: Nama pemilik
- **WHEN** halaman dirender dalam bahasa apa pun
- **THEN** nama yang tampil di Hero, teks About, `<title>`, dan meta (description, author, og:title) adalah "Rohmatuloh", dan teks "Moh Rahmatullah"/"Rahmatullah" tidak lagi tampil (kecuali di URL LinkedIn)

#### Scenario: Tautan kontak dapat diklik
- **WHEN** pengunjung mengklik email, WhatsApp, atau LinkedIn
- **THEN** tautan membuka:
  - `mailto:rahmat.noble@gmail.com` untuk email;
  - chat WhatsApp `https://wa.me/6283876854003` di tab baru;
  - profil LinkedIn di tab baru.

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

Semua skill SHALL ditampilkan setara. Website MUST NOT menandai skill mana pun sebagai keahlian unggulan ("Top skill"/"Keahlian utama"), karena pemilik menguasai seluruhnya.

#### Scenario: Setiap skill sumber masuk kategori
- **WHEN** section skills dirender
- **THEN** setiap skill di atas muncul tepat di satu kategori, tanpa duplikat

#### Scenario: Tidak ada penanda keahlian utama
- **WHEN** halaman dirender dalam bahasa apa pun
- **THEN** semua skill tampil dengan gaya yang sama, tanpa ikon bintang, badge, atau teks "Top skill"/"Keahlian utama", baik di Hero maupun di section Skills

## ADDED Requirements

### Requirement: Bahasa yang dikuasai
Konten SHALL mencatat bahasa yang dikuasai pemilik beserta tingkatnya, dalam EN dan ID:
- Indonesian (Native) / Bahasa Indonesia (Penutur asli)
- English (Passive) / Bahasa Inggris (Pasif)

Nilai ini berasal dari `curiculum-new.docx` dan dipakai oleh CV.

#### Scenario: Data bahasa tersedia dua bahasa
- **WHEN** CV dibuat dalam EN atau ID
- **THEN** section bahasa menampilkan kedua bahasa dengan tingkatnya dalam bahasa dokumen tersebut
