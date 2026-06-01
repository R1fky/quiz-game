/* ============================================
   QuizQuest — dashboard.js
   Dashboard screen: stats, chart, achievements,
   leaderboard, start button
   ============================================ */

function renderDashboard() {
  const sc = document.getElementById("screen-dashboard");
  const weeklyTotal = S.weeklyXp.reduce((a, b) => a + b, 0);
  const maxBar = Math.max(...S.weeklyXp, 20);
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  const todayIdx = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Mon=0

  // Achievement rows
  const achHTML = ACHIEVEMENTS.map((a) => {
    const earned = S.earnedAchs.includes(a.id);
    return `<div class="ach-badge ${earned ? "earned" : ""}">
      <span style="font-size:26px;${!earned ? "filter:grayscale(1) opacity(0.35)" : ""}">${a.emoji}</span>
      <span style="font-size:11px;font-weight:800;color:var(--blue-deep);text-align:center;line-height:1.2">${a.name}</span>
      ${earned ? '<span style="font-size:9px;color:var(--yellow-dark);font-weight:700">DIRAIH!</span>' : ""}
    </div>`;
  }).join("");

  // Mock leaderboard
  const mockBoard = [
    { name: "KahfiBro 🦁", xp: 870 },
    { name: "SariStar ✨", xp: 720 },
    { name: "BudiKeren 🚀", xp: 540 },
    { name: "AnaNova 🌸", xp: 410 },
  ];
  const myEntry = { name: `${S.userName || "Kamu"} 😊`, xp: S.xp, isMe: true };
  const board = [...mockBoard, myEntry].sort((a, b) => b.xp - a.xp).slice(0, 5);
  const medals = ["🥇", "🥈", "🥉", "4", "5"];
  const lbHTML = board
    .map(
      (u, i) => `
    <div class="lb-row ${u.isMe ? "me" : ""}">
      <span style="font-size:20px;width:28px;text-align:center">${medals[i]}</span>
      <span style="flex:1;font-weight:800;font-size:14px;color:var(--blue-deep)">${u.name}</span>
      <span class="xp-badge" style="font-size:13px">⚡ ${u.xp}</span>
    </div>`,
    )
    .join("");

  // Island progress rows
  const islandProgHTML = ISLANDS.map((isl, i) => {
    const unlocked = isIslandUnlockedCorrect(i);
    const pct = (S.islandScores[i] / 10) * 100;
    const stars = S.islandStars[i];
    return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1.5px solid var(--blue-sky)">
      <span style="font-size:28px;${!unlocked ? "filter:grayscale(1) opacity(0.4)" : ""}">${isl.emoji}</span>
      <div style="flex:1">
        <div style="display:flex;justify-content:space-between;margin-bottom:5px">
          <span style="font-weight:800;font-size:13px;color:${unlocked ? "var(--blue-deep)" : "#aaa"}">${isl.name}</span>
          <span style="font-size:12px;color:var(--blue-light);font-weight:700">${S.islandScores[i]}/10</span>
        </div>
        <div class="progress-track" style="height:8px">
          <div class="progress-fill" style="width:${pct}%;height:100%"></div>
        </div>
      </div>
      <div style="display:flex;gap:2px">
        ${[0, 1, 2].map((j) => `<span style="font-size:14px;${j < stars ? "" : "filter:grayscale(1) opacity(0.3)"}">⭐</span>`).join("")}
      </div>
    </div>`;
  }).join("");

  sc.innerHTML = `
  <div style="padding-bottom:20px;background:linear-gradient(180deg,#e8f3ff 0%,var(--off-white) 100%)">

    <!-- Header wave -->
    <div class="dashboard-header-bi"
      style="
      padding:28px 20px 60px;
      position:sticky;
      top:0;
      z-index:100;
      overflow:hidden;">
      <!-- clouds -->
      <div class="cloud cloud-1" style="left:-100px;opacity:0.7"></div>
      <div class="cloud cloud-2" style="left:60%;opacity:0.6"></div>

      <div style="display:flex;align-items:center;gap:14px;position:relative;z-index:2">
        <div style="width:54px;height:54px;border-radius:50%;background:rgba(255,255,255,0.2);border:3px solid rgba(255,255,255,0.5);display:flex;align-items:center;justify-content:center;font-size:28px;animation:float 3s ease-in-out infinite">
          ${S.avatar || "🧑‍🚀"}
        </div>
        <div>
          <p style="color:rgba(255,255,255,0.8);font-size:12px;font-weight:700">Selamat datang,</p>
          <h2 style="color:#fff;font-size:22px;margin:0">${S.userName || "Penjelajah"}</h2>
        </div>
        <div style="
          margin-left:auto;
          background:rgba(255,255,255,0.95);
          padding:10px 14px;
          border-radius:14px;
          box-shadow:0 4px 12px rgba(0,0,0,.1);">
          <img src="assets/images/bi-logo.png" alt="Bank Indonesia" style="height:45px; width:auto; display:block;"/>
        </div>
      </div>

      <!-- wave bottom -->
      <svg viewBox="0 0 375 40" style="position:absolute;bottom:-1px;left:0;width:100%" preserveAspectRatio="none">
        <path d="M0,20 C80,40 160,0 240,20 S320,40 375,20 L375,40 L0,40Z" fill="#e8f3ff"/>
      </svg>
    </div>

   <div style="padding:0 16px;margin-top:30px">

    <div class="rupiah-banner" style="margin-top:30px;">
      <img src="assets/images/logo-bg.png" alt="Rupiah" />
      <p>Media Edukasi Keuangan Bank Indonesia</p>
    </div>

      <!-- Stats row -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">
        <div class="card" style="padding:14px 10px;text-align:center">
          <p style="font-size:24px;font-family:'Fredoka One',cursive;color:var(--blue-main)">${S.xp}</p>
          <p style="font-size:11px;font-weight:800;color:var(--blue-light);margin-top:2px">Total XP</p>
        </div>
        <div class="card" style="padding:14px 10px;text-align:center">
          <p style="font-size:24px;font-family:'Fredoka One',cursive;color:var(--yellow-dark)">${S.islandStars.reduce((a, b) => a + b, 0)}</p>
          <p style="font-size:11px;font-weight:800;color:var(--blue-light);margin-top:2px">Bintang ⭐</p>
        </div>
        <div class="card" style="padding:14px 10px;text-align:center">
          <p style="font-size:24px;font-family:'Fredoka One',cursive;color:var(--green)">${S.islandScores.filter((v) => v >= 6).length}</p>
          <p style="font-size:11px;font-weight:800;color:var(--blue-light);margin-top:2px">Pulau Selesai</p>
        </div>
      </div>

      <!-- Weekly XP chart -->
      <div class="card" style="padding:18px 16px;margin-bottom:16px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h3 style="font-size:16px;color:var(--blue-deep)">XP Mingguan</h3>
          <span class="xp-badge" style="font-size:12px">⚡ ${weeklyTotal} XP</span>
        </div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:80px">
          ${S.weeklyXp
            .map((xp, i) => {
              const h = Math.round((xp / maxBar) * 72);
              const isToday = i === todayIdx;
              return `<div class="bar-wrap">
              <span style="font-size:9px;font-weight:800;color:${isToday ? "var(--yellow-dark)" : "var(--blue-light)"}">${xp || ""}</span>
              <div class="chart-bar ${isToday ? "today" : ""}" style="height:${h}px;${isToday ? "box-shadow:0 0 12px rgba(246,201,14,0.5)" : ""}"></div>
              <span style="font-size:9px;font-weight:800;color:${isToday ? "var(--blue-main)" : "#aaa"}">${days[i]}</span>
            </div>`;
            })
            .join("")}
        </div>
      </div>

      <!-- Island progress -->
      <div class="card" style="padding:18px 16px;margin-bottom:16px">
        <h3 style="font-size:16px;color:var(--blue-deep);margin-bottom:4px">Progress Pulau</h3>
        ${islandProgHTML}
      </div>

      <!-- Achievements -->
      <div class="card" style="padding:18px 16px;margin-bottom:16px">
        <h3 style="font-size:16px;color:var(--blue-deep);margin-bottom:12px">Pencapaian 🏅</h3>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px">
          ${achHTML}
        </div>
      </div>

      <!-- Leaderboard -->
      <div class="card" style="padding:18px 16px;margin-bottom:20px">
        <h3 style="font-size:16px;color:var(--blue-deep);margin-bottom:10px">Peringkat Minggu Ini 🏆</h3>
        ${lbHTML}
      </div>

      <!-- START ADVENTURE BUTTON -->
      <button class="btn btn-primary" onclick="App.showMap()"
        style="width:100%;font-size:18px;padding:16px;border-radius:18px;justify-content:center;gap:8px;margin-bottom:8px;animation:bounce 2s ease-in-out infinite">
        🗺️ Mulai Petualangan!
      </button>

      <p style="text-align:center;font-size:12px;color:var(--blue-light);font-weight:700;padding-bottom:8px">
        3 pulau edukasi Bank Indonesia menunggumu!
      </p>


      <div class="site-footer">
        <img src="assets/images/footer-bi.png" alt="Footer BI">
      </div>
    </div>
  </div>`;
}
