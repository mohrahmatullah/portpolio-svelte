## Purpose

Mendefinisikan dokumen CV PDF profesional yang dihasilkan dari data konten website: isi, struktur, tampilan, dan ketersediaannya dalam dua bahasa, sehingga CV selalu konsisten dengan website.

## ADDED Requirements

### Requirement: CV dihasilkan dari data konten website
CV SHALL dibuat dari data konten yang sama dengan yang ditampilkan website (identitas, kontak, ringkasan, skills, pengalaman, proyek, pendidikan, bahasa). CV MUST NOT memuat data yang bertentangan dengan website, termasuk email selain `rahmat.noble@gmail.com`.

#### Scenario: Data berubah
- **WHEN** sebuah posisi atau kontak diubah di data konten lalu CV dibuat ulang
- **THEN** CV EN dan ID memuat nilai baru yang sama dengan yang tampil di website

#### Scenario: Email usang tidak muncul
- **WHEN** teks CV diekstrak
- **THEN** teks tidak memuat `mohrahmatullah17051992@gmail.com`, `rahmetuloh@gmail.com`, atau `youremail@gmail.com`

### Requirement: Format halaman
CV SHALL berukuran A4 dengan paling banyak 2 halaman. Entri pengalaman kerja MUST NOT terpotong di antara dua halaman.

#### Scenario: Jumlah halaman
- **WHEN** CV EN atau ID dibuat dengan data saat ini
- **THEN** PDF berukuran A4 dan berisi 1 atau 2 halaman

#### Scenario: Entri tidak terbelah
- **WHEN** sebuah entri pengalaman tidak muat di sisa halaman 1
- **THEN** seluruh entri (jabatan, perusahaan, periode, poin, proyek) dipindah ke halaman 2

### Requirement: Teks dapat dibaca mesin (ATS)
Seluruh teks CV SHALL berupa teks PDF asli yang dapat dipilih dan diekstrak, bukan gambar. Urutan ekstraksi teks MUST mengikuti urutan baca: identitas dan kontak, lalu isi kolom.

#### Scenario: Ekstraksi teks
- **WHEN** teks PDF diekstrak dengan alat ekstraksi standar
- **THEN** nama, email, nomor WhatsApp, setiap jabatan, perusahaan, dan periode terbaca sebagai teks

### Requirement: Tata letak sidebar dan kolom utama
CV SHALL memakai tata letak dua kolom:
- **Sidebar kiri:** berlatar kuning `#FBB01C` setinggi penuh di setiap halaman.
- **Kolom utama:** kanan, berlatar putih.
- **Pemisah:** garis tipis abu-abu `#DFDFDF`.
- **Judul section:** tebal dan berhuruf kapital.

#### Scenario: Sidebar di halaman kedua
- **WHEN** CV terdiri dari 2 halaman
- **THEN** halaman 2 juga menampilkan latar sidebar kuning setinggi penuh

### Requirement: Isi sidebar
Sidebar SHALL memuat, berurutan:
1. Foto profil berbentuk lingkaran.
2. Nama "ROHMATULOH" dan jabatan "Web Developer".
3. Kontak beserta ikon: email `rahmat.noble@gmail.com`, WhatsApp `+62 838-7685-4003`, lokasi "Tangerang, Indonesia", dan LinkedIn `linkedin.com/in/moh-rahmatullah-b531b7163`.
4. Skills, dikelompokkan per kategori (Frontend, Backend, Databases, Tools). Item dipisah koma, dan semua skill ditampilkan dengan gaya yang sama tanpa penanda keahlian utama.
5. Pendidikan.
6. Bahasa.

Email, WhatsApp, dan LinkedIn MUST berupa tautan yang dapat diklik di PDF.

#### Scenario: Kontak dapat diklik
- **WHEN** pembaca mengklik email, WhatsApp, atau LinkedIn di PDF
- **THEN** tautannya membuka `mailto:rahmat.noble@gmail.com`, `https://wa.me/6283876854003`, atau `https://www.linkedin.com/in/moh-rahmatullah-b531b7163`

#### Scenario: Skills lengkap
- **WHEN** section Skills dirender
- **THEN** setiap skill dari data konten muncul tepat sekali di kategorinya, dan tidak ada skill yang dicetak tebal atau diberi penanda "Top skill"

### Requirement: Isi kolom utama
Kolom utama SHALL memuat section Profile (teks ringkasan yang sama dengan ringkasan website, termasuk lama pengalaman), lalu section Experience. Experience menampilkan semua posisi, diurutkan dari tanggal mulai terbaru.

Setiap posisi MUST memuat:
- jabatan;
- perusahaan;
- periode (posisi berjalan ditulis "Present"/"Sekarang");
- lokasi, bila ada;
- poin tanggung jawab, bila ada;
- satu baris "Key projects"/"Proyek utama" berisi nama proyek terkait, bila ada.

CV MUST NOT memuat section "Summary Portfolio" terpisah.

#### Scenario: Posisi tanpa poin tanggung jawab
- **WHEN** posisi Taiwan Mobile dirender (tanpa poin tanggung jawab)
- **THEN** entri menampilkan jabatan, perusahaan, periode "Aug 2025 – Present", dan baris "Key projects: OSPF, Opbiz, Opbiz Intra, EBGEM Service"

#### Scenario: Urutan posisi
- **WHEN** section Experience dirender
- **THEN** 9 posisi tampil dengan urutan yang sama seperti timeline pengalaman di website

### Requirement: CV dua bahasa
CV SHALL tersedia dalam versi Bahasa Inggris (`CV-Rohmatuloh-EN.pdf`) dan Bahasa Indonesia (`CV-Rohmatuloh-ID.pdf`). Judul section, ringkasan, poin tanggung jawab, label periode, gelar pendidikan, dan bahasa MUST diterjemahkan. Nama diri, perusahaan, proyek, dan teknologi MUST tetap sama di kedua versi.

#### Scenario: Versi Indonesia
- **WHEN** `CV-Rohmatuloh-ID.pdf` dibuka
- **THEN** judul section berbahasa Indonesia (mis. "PENGALAMAN", "PENDIDIKAN", "BAHASA") dan posisi berjalan bertuliskan "Sekarang"
