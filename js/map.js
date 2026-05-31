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
      fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="5"
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
        style="width:72px;height:72px;background:${isl.colorBg};
          box-shadow:0 6px 24px ${isl.colorShadow}${!unlocked ? ",0 0 0 0 transparent" : ""}">
        <span style="font-size:36px;line-height:1">${isl.emoji}</span>
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
        ${[0, 1, 2].map((j) => `<span style="font-size:11px;${j < stars ? "" : "filter:grayscale(1) opacity(0.3)"}">⭐</span>`).join("")}
      </div>

      <!-- Name label -->
      <div style="background:${unlocked ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.5)"};
        border-radius:50px;padding:3px 10px;margin-top:4px;white-space:nowrap;
        box-shadow:0 2px 8px rgba(0,0,0,0.1)">
        <span style="font-family:'Fredoka One',cursive;font-size:12px;color:var(--blue-deep)">${isl.name}</span>
      </div>
    </div>`;
  }).join("");

  sc.innerHTML = `
  <div style="min-height:100vh;padding-bottom:80px;position:relative;overflow:hidden">

    <!-- Full sky background -->
    <div class="sky-bg" style="position:fixed;inset:0;z-index:0">
      <!-- Clouds -->
      <div class="cloud cloud-1" style="left:-100px;top:8%"></div>
      <div class="cloud cloud-3" style="left:55%;top:5%"></div>
      <div class="cloud cloud-2" style="left:20%;top:18%"></div>
      <!-- Stars (night top) -->
      ${Array.from({ length: 20 }, (_, i) => `<div class="star-dot" style="left:${Math.random() * 100}%;top:${Math.random() * 25}%;--d:${2 + Math.random() * 2}s;animation-delay:${Math.random() * 3}s"></div>`).join("")}
    </div>

    <!-- Header -->
    <div style="position:relative;z-index:10;padding:16px 20px 8px;display:flex;align-items:center;gap:12px">
      <button class="btn btn-outline" onclick="App.showDashboard()"
        style="width:40px;height:40px;border-radius:50%;padding:0;background:rgba(255,255,255,0.9);border-color:transparent;font-size:18px">
        ←
      </button>
      <h2 style="color:#fff;font-size:22px;text-shadow:0 2px 8px rgba(0,0,0,0.2)">Peta Petualangan</h2>
      <div style="margin-left:auto" class="xp-badge">⚡ ${S.xp}</div>
    </div>

    <!-- Map canvas -->
    <div style="position:relative;z-index:5;width:100%;max-width:375px;margin:0 auto;height:640px">

      <!-- SVG paths -->
      <svg width="100%" height="100%" viewBox="0 0 ${W} ${H}" style="position:absolute;inset:0;pointer-events:none">
        <!-- Ground/terrain blobs -->
        <ellipse cx="188" cy="570" rx="160" ry="40" fill="rgba(255,255,255,0.06)"/>
        <ellipse cx="80"  cy="420" rx="80"  ry="30" fill="rgba(255,255,255,0.04)"/>
        <ellipse cx="260" cy="280" rx="90"  ry="28" fill="rgba(255,255,255,0.04)"/>
        <ellipse cx="150" cy="130" rx="100" ry="32" fill="rgba(255,255,255,0.05)"/>
        ${pathsSVG}
      </svg>

      <!-- Island nodes -->
      ${nodesHTML}
    </div>

    <!-- Tip -->
    <div style="position:relative;z-index:10;text-align:center;padding:0 20px 16px">
      <p style="color:rgba(255,255,255,0.7);font-size:12px;font-weight:700">
        👆 Ketuk pulau untuk mulai kuis!
      </p>
    </div>
  </div>`;
}
