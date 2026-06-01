/* ============================================
   QuizQuest — state.js
   Global state, persistence, helpers
   ============================================ */

// ── Default state ──
const DEFAULT_STATE = {
  userName: "",
  avatar: "🧑‍🚀",
  xp: 0,
  streak: 0,
  weeklyXp: [0, 0, 0, 0, 0, 0, 0], // Mon–Sun
  islandScores: [0, 0, 0, 0], // best score per island
  islandStars: [0, 0, 0, 0], // 0-3 stars
  earnedAchs: [], // achievement ids earned
  lastPlayDate: "",
};

// ── Load / Save ──
function loadState() {
  try {
    const raw = localStorage.getItem("qqState");
    if (!raw) return { ...DEFAULT_STATE };
    const saved = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...saved };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState(s) {
  try {
    localStorage.setItem("qqState", JSON.stringify(s));
  } catch {}
}

// ── Active state ──
let S = loadState();

// ── Streak logic ──
function checkStreak() {
  const today = new Date().toDateString();
  if (S.lastPlayDate === today) return;
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (S.lastPlayDate === yesterday) {
    S.streak += 1;
  } else if (S.lastPlayDate !== today) {
    S.streak = 1;
  }
  S.lastPlayDate = today;
  saveState(S);
}

// ── XP helpers ──
function addXP(amount) {
  S.xp += amount;
  // Add to today's slot (index 6 = Sunday slot, simplified)
  const dayIdx = new Date().getDay(); // 0=Sun…6=Sat
  S.weeklyXp[dayIdx] = (S.weeklyXp[dayIdx] || 0) + amount;
  saveState(S);
}

// ── Achievement check ──
function checkAchievements() {
  let newOnes = [];
  ACHIEVEMENTS.forEach((a) => {
    if (!S.earnedAchs.includes(a.id) && a.check(S)) {
      S.earnedAchs.push(a.id);
      newOnes.push(a);
    }
  });
  if (newOnes.length) saveState(S);
  return newOnes;
}

// ── Island unlock ──
function isIslandUnlocked(idx) {
  if (idx === 0) return true;
  return S.islandScores[idx - 1] >= ISLANDS[idx - 1].requiredScore || false;
  // Actually use island's own requiredScore against prev island
}

function isIslandUnlockedCorrect(idx) {
  if (idx === 0) return true;
  return S.islandScores[idx - 1] >= 6;
}

// ── Stars from score ──
function starsFromScore(score, total) {
  const pct = score / total;
  if (pct >= 0.9) return 3;
  if (pct >= 0.7) return 2;
  if (pct >= 0.5) return 1;
  return 0;
}
// ── Confetti ──
function spawnConfetti(cx, cy, count = 24) {
  const colors = ["#f6c90e", "#1565d8", "#16c784", "#f04438", "#ffffff", "#5b9cf6"];
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "confetti";
    const color = colors[i % colors.length];
    const driftX = (Math.random() - 0.5) * 200;
    const fallY = -(80 + Math.random() * 220);
    const dur = 0.9 + Math.random() * 0.8;
    el.style.cssText = `
      background:${color};
      left:${(cx || window.innerWidth / 2) + (Math.random() - 0.5) * 60}px;
      top:${cy || window.innerHeight * 0.6}px;
      --driftX:${driftX}px;
      --fallY:${fallY}px;
      --dur:${dur}s;
      transform:rotate(${Math.random() * 360}deg);
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      width:${6 + Math.random() * 6}px;
      height:${6 + Math.random() * 6}px;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000 + 100);
  }
}

// ── Toast notification ──
function showToast(msg, type = "info") {
  const old = document.getElementById("qq-toast");
  if (old) old.remove();
  const el = document.createElement("div");
  el.id = "qq-toast";
  const bg = type === "success" ? "#16c784" : type === "error" ? "#f04438" : "#1565d8";
  el.style.cssText = `
    position:fixed; top:20px; left:50%; transform:translateX(-50%);
    background:${bg}; color:#fff; padding:10px 22px;
    border-radius:50px; font-family:'Fredoka One',cursive; font-size:15px;
    box-shadow:0 4px 20px rgba(0,0,0,0.2); z-index:9999;
    animation:slideUp 0.3s ease, fadeIn 0.3s ease;
    white-space:nowrap;
  `;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transition = "opacity 0.3s";
    setTimeout(() => el.remove(), 300);
  }, 2500);
}
