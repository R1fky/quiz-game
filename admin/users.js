function renderUserPage() {
  document.getElementById("admin-content").innerHTML = `

  <div class="admin-header">
    <div>
      <h1>👨‍🎓 Data User</h1>
      <p>Monitoring pemain QuizQuest</p>
    </div>
  </div>

  <div class="admin-stats">

    <div class="stat-card user">
      <div class="stat-icon">👥</div>
      <div class="stat-info">
        <h2>1.250</h2>
        <p>Total User</p>
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
      <div class="stat-icon">🔥</div>
      <div class="stat-info">
        <h2>320</h2>
        <p>User Aktif</p>
      </div>
    </div>

  </div>

  <div class="admin-card">
    <h3>📋 Daftar User</h3>

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Nama</th>
            <th>XP</th>
            <th>Streak</th>
            <th>Progress</th>
          </tr>
        </thead>

        <tbody>

          ${[...Array(6)]
            .map(
              (_, i) => `
            <tr>
              <td style="font-size:20px">🧑‍🚀</td>
              <td>Player ${i + 1}</td>
              <td><span class="badge-xp">${1000 + i * 300} XP</span></td>
              <td>🔥 ${3 + i} hari</td>
              <td>
                <div class="progress-track" style="height:8px;width:100px">
                  <div class="progress-fill" style="width:${40 + i * 10}%"></div>
                </div>
              </td>
            </tr>
          `,
            )
            .join("")}

        </tbody>
      </table>
    </div>
  </div>
  `;
}
