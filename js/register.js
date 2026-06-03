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

    <div class="shape shape-1"></div>
    <div class="shape shape-2"></div>
    <div class="shape shape-3"></div>

    <div class="red-circle red-1"></div>
    <div class="red-circle red-2"></div>
    <div class="red-circle red-3"></div>
    <div class="red-circle red-4"></div>

    <div class="bi-header">
      <img src="assets/images/bi-logo.png" alt="Bank Indonesia"/>

      <span> Bank Indonesia</span>
      <p>Edukasi Literasi Keuangan</p>
    </div>

    <img
      src="assets/images/logo-bg.png"
      class="register-logo"
      alt="QuizQuest"
    >

    <h1 class="register-title">
      QuizQuest 🚀
    </h1>

    <p class="register-subtitle">
      Belajar Literasi Keuangan melalui petualangan,
      tantangan, dan misi seru bersama Bank Indonesia.
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

      <button class="rw-btn" onclick="startAdventure()" id="reg-btn" onclick="handleRegister()">
        <div class="rw-btn-inner">
          Daftar Sekarang
          <div class="rw-btn-arrow"><i class="ti ti-arrow-right" aria-hidden="true"></i></div>
        </div>
      </button>

    </div>

      
  `;
}
