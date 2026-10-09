## Purpose

Memungkinkan pengunjung mengirim pesan langsung ke pemilik portofolio dari website statis, dengan validasi dan umpan balik status yang jelas.

## ADDED Requirements

### Requirement: Field dan validasi form
Form kontak SHALL memiliki field Nama (wajib), Email (wajib, format email valid), Subjek (opsional), dan Pesan (wajib, minimal 10 karakter). Pengiriman MUST dicegah selama ada field tidak valid, dan pesan error MUST tampil di dekat field terkait dalam bahasa aktif.

#### Scenario: Email tidak valid
- **WHEN** pengunjung mengisi email `abc@` lalu menekan Kirim
- **THEN** form tidak terkirim dan muncul pesan error pada field Email

### Requirement: Pengiriman via layanan form
Bila endpoint layanan form (Formspree) dikonfigurasi, form SHALL mengirim data ke endpoint tersebut tanpa meninggalkan halaman. Selama proses tombol kirim MUST nonaktif dan menampilkan status loading. Setelah sukses form MUST dikosongkan dan pesan sukses tampil; bila gagal pesan error tampil dan isian tetap dipertahankan.

#### Scenario: Pengiriman sukses
- **WHEN** pengunjung mengirim form valid dan layanan merespons sukses
- **THEN** muncul pesan sukses dan semua field dikosongkan

#### Scenario: Pengiriman gagal
- **WHEN** layanan merespons error atau jaringan terputus
- **THEN** muncul pesan gagal beserta alternatif kontak (email `rahmat.noble@gmail.com` dan WhatsApp `https://wa.me/6283876854003`), dan isian form tidak hilang

### Requirement: Fallback mailto
Bila endpoint layanan form belum dikonfigurasi, pengiriman form valid SHALL membuka email client pengunjung dengan alamat tujuan `rahmat.noble@gmail.com`, subjek, dan isi pesan yang sudah terisi.

#### Scenario: Endpoint belum diisi
- **WHEN** konfigurasi endpoint kosong dan pengunjung mengirim form valid
- **THEN** browser membuka tautan `mailto:` berisi subjek dan pesan dari form

### Requirement: Perlindungan spam dasar
Form SHALL menyertakan field honeypot tersembunyi; pengiriman dengan honeypot terisi MUST diabaikan secara diam-diam.

#### Scenario: Bot mengisi honeypot
- **WHEN** field honeypot terisi saat submit
- **THEN** tidak ada data yang dikirim
