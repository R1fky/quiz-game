function renderStatsPage() {
  document.getElementById("admin-content").innerHTML = `

  <div class="admin-header">
    <div>
      <h1>📊 Statistik</h1>
      <p>Analisis performa QuizQuest</p>
    </div>
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
      <div class="stat-icon">⚡</div>
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
        <span>Integrasi Chart.js di sini</span>
      </div>
    </div>

    <div class="admin-card">
      <h3>🏆 Top Player</h3>

      ${[1, 2, 3]
        .map(
          (i) => `
        <div style="display:flex;align-items:center;justify-content:space-between;margin:10px 0">
          <div style="display:flex;align-items:center;gap:10px">
            <span style="font-size:22px">🥇</span>
            <span>Player ${i}</span>
          </div>
          <span class="badge-xp">${3000 - i * 200} XP</span>
        </div>
      `,
        )
        .join("")}

    </div>

  </div>
  `;
}
    