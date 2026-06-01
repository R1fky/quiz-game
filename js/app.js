const App = {
  showRoleSelection() {
    const role = document.getElementById("screen-role");
    if (!role) return; // 🔥 biar ga error kalau null

    role.style.display = "block";
    document.getElementById("screen-register").style.display = "none";
    document.getElementById("screen-dashboard").style.display = "none";
    document.getElementById("screen-map").style.display = "none";
    document.getElementById("screen-quiz").style.display = "none";

    renderRoleSelection();
  },
  showRegister() {
    document.getElementById("screen-role").style.display = "none"; //

    document.getElementById("screen-register").style.display = "block";
    document.getElementById("screen-dashboard").style.display = "none";
    document.getElementById("screen-map").style.display = "none";
    document.getElementById("screen-quiz").style.display = "none";

    renderRegister();

    setTimeout(() => {
      document.querySelector(".avatar-btn")?.classList.add("active");
    }, 0);
  },

  showDashboard() {
    document.getElementById("screen-role").style.display = "none"; //
    document.getElementById("screen-dashboard").style.display = "block";
    document.getElementById("screen-map").style.display = "none";
    document.getElementById("screen-quiz").style.display = "none";

    renderDashboard();
  },

  showMap() {
    document.getElementById("screen-role").style.display = "none"; // ✅

    document.getElementById("screen-dashboard").style.display = "none";
    document.getElementById("screen-map").style.display = "block";
    document.getElementById("screen-quiz").style.display = "none";

    renderMap();
  },

  showScreen(screenId) {
    document.getElementById("screen-dashboard").style.display = "none";
    document.getElementById("screen-map").style.display = "none";
    document.getElementById("screen-quiz").style.display = "none";

    document.getElementById(screenId).style.display = "block";
  },

  startQuiz(idx) {
    beginQuiz(idx);
  },
};

// window.onload = () => {
//   if (!S.userName) {
//     App.showRegister();
//   } else {
//     App.showDashboard();
//   }
// };

function renderRoleSelection() {
  document.getElementById("screen-role").innerHTML = `
    <div class="role-container">

      <h1 class="role-title">QuizQuest</h1>
      <p class="role-subtitle">Pilih Mode Aplikasi</p>

      <div class="role-cards">

        <div class="role-card player" onclick="App.showRegister()">
          <div class="role-icon">🎮</div>
          <h3>Pemain</h3>
          <p>Mainkan quiz dan jelajahi peta</p>
        </div>

        <div class="role-card admin" onclick="goToAdmin()">
          <div class="role-icon">⚙️</div>
          <h3>Admin</h3>
          <p>Kelola soal & sistem</p>
        </div>

      </div>

    </div>
  `;
}

function goToAdmin() {
  window.location.href = "../admin/admin.html";
}

window.onload = () => {
  App.showRoleSelection();
};
