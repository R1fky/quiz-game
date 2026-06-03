/* ============================================
   QuizQuest — data.js
   Islands, Questions, Achievements
   ============================================ */

// const ISLANDS = [
//   {
//     name: "Cinta",
//     emoji: "💵",
//     description: "Mengenal fungsi, ciri keaslian, dan pentingnya Rupiah sebagai simbol kedaulatan Indonesia.",

//     questions: [
//       {
//         cat: "Rupiah",
//         q: "Siapa yang berwenang mengeluarkan Rupiah?",
//         opts: ["Bank Indonesia", "Kementerian Keuangan", "OJK", "Presiden"],
//         ans: 0,
//       },
//       {
//         cat: "Rupiah",
//         q: "Rupiah merupakan alat pembayaran yang sah di?",
//         opts: ["Indonesia", "Malaysia", "Singapura", "Thailand"],
//         ans: 0,
//       },
//     ],
//   },

//   {
//     name: "Bangga",
//     emoji: "💳",
//     description: "Belajar tentang QRIS, BI-FAST, uang elektronik, dan berbagai sistem pembayaran modern.",

//     questions: [
//       {
//         cat: "QRIS",
//         q: "QRIS adalah singkatan dari?",
//         opts: ["Quick Response Indonesian Standard", "Quick Rupiah Indonesia System", "Quality Response Indonesia Service", "Quick Retail Indonesia Standard"],
//         ans: 0,
//       },
//     ],
//   },

//   {
//     name: "Paham",
//     emoji: "📈",
//     description: "Memahami peran Bank Indonesia dalam menjaga stabilitas harga dan mengendalikan inflasi.",

//     questions: [
//       {
//         cat: "Moneter",
//         q: "Tujuan utama kebijakan moneter adalah?",
//         opts: ["Menjaga stabilitas harga", "Menaikkan pajak", "Membangun jalan", "Meningkatkan ekspor"],
//         ans: 0,
//       },
//     ],
//   },
// ];

const ISLANDS = [
  {
    name: "Cinta",
    emoji: "💵",
    description: "Mengenal fungsi, ciri keaslian, dan pentingnya Rupiah sebagai simbol kedaulatan Indonesia.",

    questions: [
      {
        cat: "Rupiah",
        q: "Siapa yang berwenang mengeluarkan Rupiah?",
        opts: ["Bank Indonesia", "Kementerian Keuangan", "OJK", "Presiden"],
        ans: 0,
      },
      {
        cat: "Rupiah",
        q: "Rupiah merupakan alat pembayaran yang sah di?",
        opts: ["Indonesia", "Malaysia", "Singapura", "Thailand"],
        ans: 0,
      },
      {
        cat: "Rupiah",
        q: "Apa fungsi utama uang?",
        opts: ["Alat tukar", "Hiasan", "Tabungan saja", "Hadiah"],
        ans: 0,
      },
      {
        cat: "Rupiah",
        q: "Ciri uang asli dapat dilihat dengan metode 3D, yaitu?",
        opts: ["Dilihat, Diraba, Diterawang", "Dicuci, Disetrika, Dilipat", "Dibakar, Dipotong, Digunting", "Disimpan, Dibuang, Diganti"],
        ans: 0,
      },
      {
        cat: "Rupiah",
        q: "Menggunakan Rupiah di wilayah NKRI adalah bentuk?",
        opts: ["Cinta tanah air", "Kebiasaan biasa", "Kewajiban pajak", "Kegiatan ekonomi saja"],
        ans: 0,
      },
      {
        cat: "Rupiah",
        q: "Apa yang harus dilakukan jika menerima uang palsu?",
        opts: ["Laporkan ke bank/polisi", "Gunakan saja", "Buang", "Simpan"],
        ans: 0,
      },
      {
        cat: "Rupiah",
        q: "Siapa tokoh yang biasanya ada di uang Rupiah?",
        opts: ["Pahlawan nasional", "Artis", "Atlet", "Pengusaha"],
        ans: 0,
      },
      {
        cat: "Rupiah",
        q: "Apa simbol mata uang Indonesia?",
        opts: ["Rp", "$", "¥", "€"],
        ans: 0,
      },
      {
        cat: "Rupiah",
        q: "Apa akibat jika tidak menggunakan Rupiah di Indonesia?",
        opts: ["Melanggar hukum", "Tidak masalah", "Lebih cepat", "Lebih murah"],
        ans: 0,
      },
      {
        cat: "Rupiah",
        q: "Menjaga kondisi uang termasuk sikap?",
        opts: ["Menghargai Rupiah", "Mengabaikan uang", "Tidak peduli", "Hemat"],
        ans: 0,
      },
    ],
  },

  {
    name: "Bangga",
    emoji: "💳",
    description: "Belajar tentang QRIS, BI-FAST, uang elektronik, dan berbagai sistem pembayaran modern.",

    questions: [
      {
        cat: "QRIS",
        q: "QRIS adalah singkatan dari?",
        opts: ["Quick Response Indonesian Standard", "Quick Rupiah Indonesia System", "Quality Response Indonesia Service", "Quick Retail Indonesia Standard"],
        ans: 0,
      },
      {
        cat: "QRIS",
        q: "QRIS digunakan untuk?",
        opts: ["Pembayaran digital", "Menabung", "Investasi", "Pinjaman"],
        ans: 0,
      },
      {
        cat: "Digital",
        q: "Apa keuntungan pembayaran digital?",
        opts: ["Cepat dan praktis", "Lebih mahal", "Sulit digunakan", "Harus ke bank"],
        ans: 0,
      },
      {
        cat: "BI-FAST",
        q: "BI-FAST digunakan untuk?",
        opts: ["Transfer antar bank cepat", "Tarik tunai", "Cetak uang", "Bayar pajak"],
        ans: 0,
      },
      {
        cat: "E-wallet",
        q: "Contoh uang elektronik adalah?",
        opts: ["OVO, GoPay", "Tabungan", "Deposito", "Cek"],
        ans: 0,
      },
      {
        cat: "QRIS",
        q: "QRIS memudahkan transaksi karena?",
        opts: ["Satu QR untuk semua pembayaran", "Harus banyak QR", "Tidak aman", "Tidak praktis"],
        ans: 0,
      },
      {
        cat: "Keamanan",
        q: "Hal penting saat transaksi digital adalah?",
        opts: ["Menjaga PIN/password", "Membagikan OTP", "Gunakan wifi umum", "Pinjam akun"],
        ans: 0,
      },
      {
        cat: "Digital",
        q: "Pembayaran non-tunai berarti?",
        opts: ["Tidak menggunakan uang fisik", "Hanya uang kertas", "Hanya koin", "Gratis"],
        ans: 0,
      },
      {
        cat: "QRIS",
        q: "Siapa yang mengatur QRIS?",
        opts: ["Bank Indonesia", "OJK", "Kementerian", "Bank Swasta"],
        ans: 0,
      },
      {
        cat: "Digital",
        q: "Menggunakan sistem pembayaran digital menunjukkan?",
        opts: ["Adaptasi teknologi", "Kemalasan", "Ketergantungan", "Pemborosan"],
        ans: 0,
      },
    ],
  },

  {
    name: "Paham",
    emoji: "📈",
    description: "Memahami peran Bank Indonesia dalam menjaga stabilitas harga dan mengendalikan inflasi.",

    questions: [
      {
        cat: "Moneter",
        q: "Tujuan utama kebijakan moneter adalah?",
        opts: ["Menjaga stabilitas harga", "Menaikkan pajak", "Membangun jalan", "Meningkatkan ekspor"],
        ans: 0,
      },
      {
        cat: "Inflasi",
        q: "Apa itu inflasi?",
        opts: ["Kenaikan harga barang", "Penurunan harga", "Stabilitas harga", "Diskon besar"],
        ans: 0,
      },
      {
        cat: "BI",
        q: "Bank Indonesia adalah?",
        opts: ["Bank sentral", "Bank umum", "Perusahaan", "Koperasi"],
        ans: 0,
      },
      {
        cat: "Moneter",
        q: "Salah satu tugas BI adalah?",
        opts: ["Mengatur uang beredar", "Menjual saham", "Membangun jalan", "Mengatur pajak"],
        ans: 0,
      },
      {
        cat: "Inflasi",
        q: "Dampak inflasi tinggi adalah?",
        opts: ["Harga naik", "Harga turun", "Ekonomi stabil", "Pendapatan naik"],
        ans: 0,
      },
      {
        cat: "Suku bunga",
        q: "BI dapat mengendalikan inflasi dengan?",
        opts: ["Mengatur suku bunga", "Mencetak uang terus", "Menghapus pajak", "Menutup bank"],
        ans: 0,
      },
      {
        cat: "Ekonomi",
        q: "Jika inflasi rendah maka?",
        opts: ["Ekonomi stabil", "Harga melonjak", "Krisis", "Pengangguran tinggi"],
        ans: 0,
      },
      {
        cat: "BI",
        q: "BI independen artinya?",
        opts: ["Tidak dipengaruhi pihak lain", "Bebas pajak", "Bukan milik negara", "Swasta"],
        ans: 0,
      },
      {
        cat: "Moneter",
        q: "Kebijakan moneter berdampak pada?",
        opts: ["Ekonomi nasional", "Cuaca", "Olahraga", "Budaya"],
        ans: 0,
      },
      {
        cat: "Ekonomi",
        q: "Menjaga inflasi penting karena?",
        opts: ["Menjaga daya beli", "Menaikkan harga", "Menurunkan gaji", "Mengurangi produksi"],
        ans: 0,
      },
    ],
  },
];
const ACHIEVEMENTS = [
  {
    id: "rupiah_master",
    name: "Sahabat Rupiah",
    emoji: "💵",
    desc: "Selesaikan Pulau Rupiah",
    check: (state) => state.islandScores[0] >= 2,
  },

  {
    id: "payment_master",
    name: "Ahli QRIS",
    emoji: "📱",
    desc: "Selesaikan Pulau Sistem Pembayaran",
    check: (state) => state.islandScores[1] >= 1,
  },

  {
    id: "monetary_master",
    name: "Penjaga Inflasi",
    emoji: "📈",
    desc: "Selesaikan Pulau Kebijakan Moneter",
    check: (state) => state.islandScores[2] >= 1,
  },

  {
    id: "all_islands",
    name: "Duta BI",
    emoji: "🏆",
    desc: "Selesaikan semua pulau",
    check: (state) => state.islandScores[0] > 0 && state.islandScores[1] > 0 && state.islandScores[2] > 0,
  },
];

const AVATARS = ["🎯", "🚀", "🦁", "🦊", "🐉", "🦅", "🌟", "⚡", "🔥", "🌊", "🎸", "🏆"];
