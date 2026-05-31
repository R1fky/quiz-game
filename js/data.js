/* ============================================
   QuizQuest — data.js
   Islands, Questions, Achievements
   ============================================ */

const ISLANDS = [
  {
    name: "Cinta Bangga Paham Rupiah",
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
    ],
  },

  {
    name: "Sistem Pembayaran Indonesia",
    emoji: "💳",
    description: "Belajar tentang QRIS, BI-FAST, uang elektronik, dan berbagai sistem pembayaran modern.",

    questions: [
      {
        cat: "QRIS",
        q: "QRIS adalah singkatan dari?",
        opts: ["Quick Response Indonesian Standard", "Quick Rupiah Indonesia System", "Quality Response Indonesia Service", "Quick Retail Indonesia Standard"],
        ans: 0,
      },
    ],
  },

  {
    name: "Kebijakan Moneter",
    emoji: "📈",
    description: "Memahami peran Bank Indonesia dalam menjaga stabilitas harga dan mengendalikan inflasi.",

    questions: [
      {
        cat: "Moneter",
        q: "Tujuan utama kebijakan moneter adalah?",
        opts: ["Menjaga stabilitas harga", "Menaikkan pajak", "Membangun jalan", "Meningkatkan ekspor"],
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
