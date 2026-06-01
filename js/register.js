let selectedAvatar = "🧑";

function selectAvatar(avatar) {
  selectedAvatar = avatar;

  document.getElementById("avatar-preview").innerHTML = avatar;

  document.querySelectorAll(".avatar-btn").forEach((btn) => {
    btn.classList.remove("active");

    if (btn.innerText === avatar) {
      btn.classList.add("active");
    }
  });
}

function startAdventure() {
  const name = document.getElementById("user-name").value.trim();

  if (!name) {
    showToast("Masukkan nama terlebih dahulu", "error");
    return;
  }

  S.userName = name;
  S.avatar = selectedAvatar;

  saveState(S);

  showToast("Selamat datang " + name + "!", "success");

  App.showDashboard();
}

function renderRegister() {
  const sc = document.getElementById("screen-register");

  sc.innerHTML = `
  <div class="register-screen">

    <div class="bi-header">
      <img src="assets/images/bi-logo.png" alt="Bank Indonesia"/>

      <span> Bank Indonesia</span>
      <p>Edukasi Literasi Keuangan</p>
    </div>

    <div class="cloud cloud-1"></div>
    <div class="cloud cloud-2"></div>

    <img
      src="assets/images/logo-bg.png"
      class="register-logo"
      alt="QuizQuest"
    >

    <h1 class="register-title">
      QuizQuest 🚀
    </h1>

    <p class="register-subtitle">
      Jelajahi Pulau Literasi Keuangan
      bersama Bank Indonesia
    </p>

    <div class="register-form">

      <input
        id="user-name"
        class="input-field"
        placeholder="Masukkan nama penjelajah..."
      >

      <h3 class="avatar-title">
        Pilih Avatar
      </h3>

      <div class="avatar-grid">

        ${AVATARS.map(
          (a) => `
            <button
              class="avatar-btn"
              onclick="selectAvatar('${a}')"
            >
              ${a}
            </button>
          `,
        ).join("")}

      </div>

      <div id="avatar-preview">
        🧑‍🚀
      </div>

      <button
        class="btn btn-primary register-btn"
        onclick="startAdventure()"
      >
        🗺️ Mulai Petualangan
      </button>

    </div>

    <img
      src="assets/images/footer-bi.png"
      class="register-footer"
      alt="Bank Indonesia"
    >

  </div>
  `;
}
