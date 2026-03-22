# 🌙 Ucapan Idul Fitri Digital

Aplikasi web interaktif untuk mengirimkan ucapan selamat Hari Raya Idul Fitri. Dibangun dengan antarmuka yang elegan, animasi yang halus, dan fitur kustomisasi nama serta nomor WhatsApp tujuan langsung melalui URL.

## ✨ Fitur Utama

- **Kustomisasi via URL**: Ubah nama keluarga/pengirim dan nomor WhatsApp tujuan hanya dengan mengubah parameter URL.
- **Animasi Interaktif**: Menggunakan GSAP untuk efek transisi halaman, *scroll*, dan kemunculan teks yang mulus.
- **Efek Visual Menarik**: Dilengkapi dengan animasi salju turun (*snowfall*) dan awan bergerak yang realistis.
- **Musik Latar**: Musik otomatis diputar saat tombol "Buka Ucapan" diklik, lengkap dengan tombol kontrol (Play/Mute) yang melayang.
- **Desain Responsif**: Tampilan *split-screen* asimetris yang elegan untuk Desktop dan layar penuh (*full-screen*) yang rapi untuk Mobile.

## 🚀 Cara Penggunaan (URL Parameter)

Anda dapat membagikan ucapan ini kepada orang lain dengan menyesuaikan parameter pada link URL:

```text
https://domain-anda.com/?surname=Keluarga%20Besar&WA_number=6281234567890
```

- `surname`: Nama yang akan tampil di layar utama (Gunakan `%20` untuk menggantikan spasi).
- `WA_number`: Nomor WhatsApp tujuan untuk tombol balasan (Gunakan format kode negara tanpa tanda plus, misal: `628...`).

## 💻 Cara Menjalankan di Komputer Lokal

Pastikan Anda sudah menginstal [Node.js](https://nodejs.org/).

1. **Buka terminal** dan arahkan ke folder proyek ini.
2. **Instal dependensi**:
   ```bash
   npm install
   ```
3. **Jalankan server pengembangan**:
   ```bash
   npm run dev
   ```
4. Buka `http://localhost:3000` (atau port yang tertera di terminal) pada browser Anda.

## 🛠️ Teknologi yang Digunakan

- **React** (via Vite)
- **Tailwind CSS** (Styling & Layout)
- **GSAP & ScrollTrigger** (Animasi kompleks)
- **Lucide React** (Ikon)
