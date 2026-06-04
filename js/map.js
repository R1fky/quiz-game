/* ============================================
   QuizQuest — map.js
   Interactive game map with island nodes,
   animated SVG path, island info modal
   ============================================ */

/* Island modal popup */
function showIslandModal(idx) {
  const isl = ISLANDS[idx];
  const unlocked = isIslandUnlockedCorrect(idx);

  if (!unlocked) {
    const needed = ISLANDS[idx - 1].name;
    showToast(`🔒 Selesaikan ${needed} dulu!`, "error");
    // Shake the node
    const node = document.getElementById(`node-${idx}`);
    if (node) {
      node.style.animation = "wrongShake 0.4s ease";
      setTimeout(() => (node.style.animation = ""), 500);
    }
    return;
  }

  const score = S.islandScores[idx];
  const stars = S.islandStars[idx];

  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.id = "island-modal";
  backdrop.onclick = (e) => {
    if (e.target === backdrop) backdrop.remove();
  };

  backdrop.innerHTML = `
    <div class="modal-box" style="max-width:320px">
      <!-- Island emoji big -->
      <div style="width:90px;height:90px;border-radius:50%;background:${isl.colorBg || "#E8F3FF"};;
        margin:0 auto 12px;display:flex;align-items:center;justify-content:center;
        font-size:44px;box-shadow:0 8px 30px ${isl.colorShadow || "rgba(0,0,0,0.15)"};;
        animation:float 3s ease-in-out infinite">
        ${isl.emoji}
      </div>

      <h2 style="font-size:24px;color:var(--blue-deep);margin-bottom:4px">${isl.name}</h2>
      <p style="font-size:13px;color:var(--blue-light);font-weight:700;margin-bottom:16px">${isl.description}</p>

      <!-- Stats row -->
      <div style="display:flex;justify-content:center;gap:20px;margin-bottom:16px">
        <div style="text-align:center">
          <p style="font-size:20px;font-family:'Fredoka One',cursive;color:var(--blue-main)">${isl.questions?.length || 0}</p>
          <p style="font-size:11px;color:#999;font-weight:700">Pertanyaan</p>
        </div>
        <div style="width:1px;background:var(--blue-sky)"></div>
        <div style="text-align:center">
          <p style="font-size:20px;font-family:'Fredoka One',cursive;color:var(--yellow-dark)">++${isl.xpReward || 0}</p>
          <p style="font-size:11px;color:#999;font-weight:700">Reward XP</p>
        </div>
        <div style="width:1px;background:var(--blue-sky)"></div>
        <div style="text-align:center">
          <p style="font-size:20px;font-family:'Fredoka One',cursive;color:var(--blue-main)">${score}/10</p>
          <p style="font-size:11px;color:#999;font-weight:700">Skormu</p>
        </div>
      </div>

      <!-- Stars -->
      <div style="display:flex;justify-content:center;gap:8px;margin-bottom:20px">
        ${[0, 1, 2].map((j) => `<span style="font-size:32px;animation:${j < stars ? `starSpin 0.5s ease ${j * 0.2}s both` : "none"};${j < stars ? "" : "filter:grayscale(1) opacity(0.3)"}">⭐</span>`).join("")}
      </div>

      <!-- Buttons -->
      <button class="btn btn-primary" onclick="document.getElementById('island-modal').remove(); App.startQuiz(${idx})"
        style="width:100%;font-size:17px;padding:14px;border-radius:14px;justify-content:center;gap:8px;margin-bottom:10px">
        ${score > 0 ? "🔄 Main Lagi!" : "▶ MULAI!"}
      </button>
      <button class="btn btn-outline" onclick="document.getElementById('island-modal').remove()"
        style="width:100%;font-size:15px;padding:11px;border-radius:14px;justify-content:center">
        Kembali
      </button>
    </div>`;

  document.body.appendChild(backdrop);
}

/* Render map screen */
function renderMap() {
  const sc = document.getElementById("screen-map");

  // We lay out 4 islands in a winding path (bottom→top)
  // Positions as % of a 375px-wide, 600px-tall canvas
  const layout = [
    { x: 50, y: 85, pathTo: null },
    { x: 25, y: 55, pathTo: 0 },
    { x: 65, y: 25, pathTo: 1 },
  ];

  // Cari posisi avatar (berdasarkan pulau terakhir yang dikerjakan)
  function getAvatarPosition() {
    for (let i = 0; i < layout.length; i++) {
      if (!S.playedIslands[i]) {
        return layout[i];
      }
    }

    // jika semua pulau selesai
    return layout[layout.length - 1];
  }

  const avatarPos = getAvatarPosition();

  if (!avatarPos) {
    console.error("avatarPos undefined");
    return;
  }

  // Build SVG paths between nodes
  // We need actual pixel values; use fixed canvas 375×640
  const W = 375,
    H = 640;
  const pos = layout.map((l) => ({ x: (l.x / 100) * W, y: (l.y / 100) * H }));

  let pathsSVG = "";
  for (let i = 1; i < layout.length; i++) {
    const from = pos[i];
    const to = pos[layout[i].pathTo];
    // Curved bezier
    const mx = (from.x + to.x) / 2 + (i % 2 === 0 ? 30 : -30);
    const my = (from.y + to.y) / 2;
    pathsSVG += `<path d="M${from.x},${from.y} Q${mx},${my} ${to.x},${to.y}"
      fill="none" stroke="#fff" stroke-width="5"
      stroke-linecap="round" class="map-path"
      stroke-dasharray="12 8"/>`;
    // Dots along path (decorative)
    for (let t of [0.25, 0.5, 0.75]) {
      const bt = 1 - t;
      const px = bt * bt * from.x + 2 * bt * t * mx + t * t * to.x;
      const py = bt * bt * from.y + 2 * bt * t * my + t * t * to.y;
      pathsSVG += `<circle cx="${px}" cy="${py}" r="4" fill="rgba(255,255,255,0.35)"/>`;
    }
  }

  // Island nodes HTML — absolutely positioned over the SVG
  const nodesHTML = ISLANDS.map((isl, i) => {
    const lp = layout[i];
    const unlocked = isIslandUnlockedCorrect(i);
    const score = S.islandScores[i];
    const stars = S.islandStars[i];
    const completed = score >= 6;
    const statusClass = !unlocked ? "" : completed ? "completed" : "current";

    return `<div id="node-${i}" class="island-node ${!unlocked ? "locked" : ""}"
      onclick="showIslandModal(${i})"
      style="position:absolute;left:${lp.x}%;top:${lp.y}%;transform:translate(-50%,-50%);
        animation:float ${3 + i * 0.4}s ease-in-out ${i * 0.3}s infinite;z-index:10">

      <!-- Glow ring -->
      ${
        unlocked && !completed
          ? `<div style="position:absolute;inset:-8px;border-radius:50%;
        background:radial-gradient(circle,rgba(246,201,14,0.25),transparent 70%);
        animation:pulse-ring 1.8s ease-in-out infinite"></div>`
          : ""
      }

      <!-- Bubble -->
      <div class="node-bubble ${statusClass}"
        style="width:100px;height:100px;background:${isl.colorBg};
          box-shadow:0 6px 24px ${isl.colorShadow}${!unlocked ? ",0 0 0 0 transparent" : ""}">
        <span style="font-size:48px;line-height:1">${isl.emoji}</span>
      </div>

      <!-- Lock overlay -->
      ${
        !unlocked
          ? `<div style="position:absolute;inset:0;border-radius:50%;
        background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;
        font-size:24px;border-radius:50%">🔒</div>`
          : ""
      }

      <!-- Stars below node -->
      <div style="display:flex;gap:2px;justify-content:center;margin-top:4px">
        ${[0, 1, 2].map((j) => `<span style="font-size:18px;${j < stars ? "" : "filter:grayscale(1) opacity(0.3)"}">⭐</span>`).join("")}
      </div>

      <!-- Name label -->
      <div style="background:${unlocked ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.5)"};
        border-radius:50px;padding:3px 10px;margin-top:4px;white-space:nowrap;
        box-shadow:0 2px 8px rgba(0,0,0,0.1)">
        <span style="font-family:'Fredoka One',cursive;font-size:17px;color:var(--blue-deep)">${isl.name}</span>
      </div>
    </div>`;
  }).join("");

  const avatarHTML = `
  <div class="map-avatar"
    style="
      position:absolute;
      left:${avatarPos.x}%;
      top:${avatarPos.y}%;
      transform:translate(-50%,-140%);
      z-index:20;
      animation:float 2s ease-in-out infinite;
    ">
    <div class="map-avatar-bubble">
      ${S.avatar}
    </div>
  </div>
`;
  //  hujan avatar
  const avatarRain = Array.from({ length: 5 })
    .map(() => {
      const left = 5 + Math.random() * 90;

      const size = [40, 55, 70][Math.floor(Math.random() * 3)];

      const delay = Math.random() * 10;

      const duration = 18 + Math.random() * 8;

      const opacity = 0.08 + Math.random() * 0.08;

      return `
      <div
        class="avatar-rain"
        style="
          left:${left}%;
          font-size:${size}px;
          opacity:${opacity};
          animation-delay:${delay}s;
          animation-duration:${duration}s;
        ">
        ${S.avatar}
      </div>
    `;
    })
    .join("");
  // const avatarRain = Array.from({ length: 5 })
  //   .map(() => {
  //     const left = Math.random() * 100;

  //     const delay = Math.random() * 12;

  //     const dur = 18 + Math.random() * 8;

  //     return `
  //     <div
  //       class="avatar-rain"
  //       style="
  //         left:${left}%;
  //         animation-delay:${delay}s;
  //         animation-duration:${dur}s;
  //       "
  //     >
  //       ${S.avatar}
  //     </div>
  //   `;
  //   })
  //   .join("");

  sc.innerHTML = `
  <div class="map-container">

    <!-- Background -->
    <div class="map-bg">
      ${avatarRain}
      <div class="shape shape-1"></div>
      <div class="shape shape-2"></div>
      <div class="red-circle red-1"></div>
      <div class="red-circle red-2"></div>
      <div class="red-circle red-3"></div>
    </div>

    <!-- CONTENT -->
    <div class="map-content">

      <!-- Header -->
      <div class="map-header">
        <button class="btn btn-outline back-btn" onclick="App.showDashboard()">←</button>

          <h2 class="map-title">Peta Petualangan</h2>

          <div class="map-logo">
        <img src="assets/images/bi-logo.png" alt="Bank Indonesia" />
      </div>
    </div>

    <!-- Map Canvas -->
    <div class="map-canvas">
      <svg viewBox="0 0 400 1000" class="map-road">
        <path d="
          M200 780
          Q120 680 220 580
          Q320 480 200 400
          Q80 300 220 220
          Q300 150 180 80" class="road-path"/>
      </svg>

    <!-- Nodes -->
    ${nodesHTML}

    <!-- Avatar -->
    ${avatarHTML}
    </div>

    <!-- Tip -->
    <div class="map-tip">
      👆 Ketuk pulau untuk mulai kuis!
    </div>

  </div>

  <!-- Footer -->
  <div class="map-footer">
    <img src="assets/images/footer-bi.png" alt="Footer BI" />
  </div>

</div>`;
}
