function renderSidebar(activeMenu = "") {
  return `
    <aside class="admin-sidebar">

      <div class="admin-brand">
        <img src="assets/images/bi-logo.png" alt="BI Logo">

        <h3>QuizQuest</h3>

        <span>Bank Indonesia Admin Panel</span>
      </div>

      <nav class="admin-nav">

        <button
          class="admin-menu ${activeMenu === "dashboard" ? "active" : ""}"
          onclick="window.location.href='admin.html'"
        >
          🏠 Dashboard
        </button>

        <button
          class="admin-menu ${activeMenu === "materi" ? "active" : ""}"
          onclick="window.location.href='materi.html'"
        >
          📚 Materi
        </button>

        <button
          class="admin-menu ${activeMenu === "soal" ? "active" : ""}"
          onclick="window.location.href='add-question.html'"
        >
          ❓ Soal
        </button>

        <button
          class="admin-menu ${activeMenu === "user" ? "active" : ""}"
          onclick="window.location.href='users.html'"
        >
          👨‍🎓 User
        </button>

        <button class="admin-menu">
          🏆 Leaderboard
        </button>

        <button class="admin-menu">
          📊 Statistik
        </button>

        <button class="admin-menu">
          ⚙️ Pengaturan
        </button>

      </nav>

    </aside>
  `;
}
