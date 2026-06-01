function renderDashboard() {
  document.getElementById("admin-content").innerHTML = `
  
   <div class="admin-header">
          <div>
            <h1>Dashboard Admin</h1>
            <p>Kelola QuizQuest Literasi Keuangan</p>
          </div>
          <div class="admin-profile">👨‍💼 Admin Master</div>
        </div>

        <div class="admin-stats">
          <div class="stat-card user">
            <div class="stat-icon">👨‍🎓</div>
            <div class="stat-info">
              <h2>1.250</h2>
              <p>Total User</p>
            </div>
          </div>

          <div class="stat-card soal">
            <div class="stat-icon">❓</div>
            <div class="stat-info">
              <h2>120</h2>
              <p>Total Soal</p>
            </div>
          </div>

          <div class="stat-card xp">
            <div class="stat-icon">🏆</div>
            <div class="stat-info">
              <h2>52.000</h2>
              <p>Total XP</p>
            </div>
          </div>

          <div class="stat-card pulau">
            <div class="stat-icon">🏝️</div>
            <div class="stat-info">
              <h2>4</h2>
              <p>Pulau Aktif</p>
            </div>
          </div>
        </div>

        <div class="admin-content">
          <div class="admin-card">
            <h3>📈 Aktivitas Mingguan</h3>
            <div class="chart-placeholder">
              <span>📊</span>
              <span>Siap dihubungkan ke Chart.js</span>
            </div>
          </div>

          <div class="admin-card">
            <h3>✨ User Terbaru</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Nama Player</th>
                    <th style="text-align: right">Skor XP</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Rifky</td>
                    <td><span class="badge-xp">2.500 XP</span></td>
                  </tr>
                  <tr>
                    <td>Budi</td>
                    <td><span class="badge-xp">1.900 XP</span></td>
                  </tr>
                  <tr>
                    <td>Siti</td>
                    <td><span class="badge-xp">1.700 XP</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

  `;
}

function renderQuestionPage() {
  document.getElementById("admin-content").innerHTML = `

    <div class="question-page">
      <!-- Header -->
      <div class="page-header">
        <div>
          <h1>➕ Tambah Pertanyaan</h1>
          <p>Kelola soal QuizQuest Literasi Keuangan</p>
        </div>

        <button class="btn-back" id="btn-back">← Kembali</button>
      </div>

      <div class="question-layout">
        <!-- FORM -->
        <div class="question-card">
          <div class="card-title">
            <h3>📝 Form Soal Baru</h3>
          </div>

          <div class="form-group">
            <label>Pertanyaan</label>

            <textarea rows="4" placeholder="Masukkan pertanyaan..."></textarea>
          </div>

          <div class="option-grid">
            <div class="form-group">
              <label>Opsi A</label>
              <input type="text" placeholder="Jawaban A" />
            </div>

            <div class="form-group">
              <label>Opsi B</label>
              <input type="text" placeholder="Jawaban B" />
            </div>

            <div class="form-group">
              <label>Opsi C</label>
              <input type="text" placeholder="Jawaban C" />
            </div>

            <div class="form-group">
              <label>Opsi D</label>
              <input type="text" placeholder="Jawaban D" />
            </div>
          </div>

          <div class="row-2">
            <div class="form-group">
              <label>Jawaban Benar</label>

              <select>
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>
            </div>

            <div class="form-group">
              <label>Pulau / Kategori</label>

              <select>
                <option>Pulau Rupiah</option>
                <option>Pulau Tabungan</option>
                <option>Pulau Investasi</option>
                <option>Pulau Bank Sentral</option>
              </select>
            </div>
          </div>

          <div class="row-2">
            <div class="form-group">
              <label>Tingkat Kesulitan</label>

              <select>
                <option>Mudah</option>
                <option>Sedang</option>
                <option>Sulit</option>
              </select>
            </div>

            <div class="form-group">
              <label>XP Reward</label>

              <input type="number" value="10" />
            </div>
          </div>

          <div class="button-group">
            <button class="btn-save">💾 Simpan Soal</button>

            <button class="btn-reset">🔄 Reset</button>
          </div>
        </div>

        <!-- PREVIEW -->
        <div class="preview-card">
          <div class="card-title">
            <h3>👀 Preview Soal</h3>
          </div>

          <div class="quiz-preview">
            <span class="badge-level"> Mudah </span>

            <h4>Contoh pertanyaan akan tampil di sini...</h4>

            <div class="preview-option">A. Jawaban Pertama</div>

            <div class="preview-option">B. Jawaban Kedua</div>

            <div class="preview-option">C. Jawaban Ketiga</div>

            <div class="preview-option">D. Jawaban Keempat</div>
          </div>
        </div>
      </div>
    </div>

  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderDashboard();

  //   document.getElementById("menu-question").addEventListener("click", () => {
  //     document.querySelectorAll(".admin-menu").forEach((btn) => btn.classList.remove("active"));

  //     document.getElementById("menu-question").classList.add("active");

  //     renderQuestionPage();
  //   });
});

// const AdminApp = {
//   showDashboard() {
//     renderDashboard();
//   },

//   showQuestions() {
//     renderQuestionPage();
//   },

//   showUsers() {
//     renderUserPage();
//   },
// };

const AdminApp = {
  showDashboard() {
    setActiveMenu(0);
    renderDashboard();
  },

  showQuestions() {
    setActiveMenu(2);
    renderQuestionPage();
    document.getElementById("btn-back").addEventListener("click", () => {
      AdminApp.showDashboard();
    });
  },
};

function setActiveMenu(index) {
  const menus = document.querySelectorAll(".admin-menu");

  menus.forEach((menu) => {
    menu.classList.remove("active");
  });

  menus[index].classList.add("active");
}
