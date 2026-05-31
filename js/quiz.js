/* ============================================
   QuizQuest — quiz.js
   Quiz engine: render questions, timer,
   answer checking, result screen
   ============================================ */

// ── Active quiz session ──
let Q = {
  islandIdx: 0,
  qIdx: 0,
  score: 0,
  wrong: 0,
  earnedXP: 0,
  answered: false,
  timeLeft: 30,
  timerInterval: null,
};

// ── Start quiz ──
function beginQuiz(islandIdx) {
  Q = {
    islandIdx,
    qIdx: 0,
    score: 0,
    wrong: 0,
    earnedXP: 0,
    answered: false,
    timeLeft: 30,
    timerInterval: null,
  };
  App.showScreen("screen-quiz");
  renderQuizQuestion();
}

// ── Render question ──
function renderQuizQuestion() {
  Q.answered = false;
  const isl = ISLANDS[Q.islandIdx];
  const qData = isl.questions[Q.qIdx];
  const sc = document.getElementById("screen-quiz");
  const pct = (Q.qIdx / isl.questions.length) * 100;
  const xpThisQ = 10 + Q.qIdx * 2;

  // Streak dots
  const dotsHTML = Array.from({ length: isl.questions.length }, (_, i) => {
    if (i < Q.score) return `<div style="width:14px;height:14px;border-radius:50%;background:var(--green);box-shadow:0 0 6px var(--green)"></div>`;
    if (i === Q.qIdx) return `<div style="width:14px;height:14px;border-radius:50%;background:var(--yellow);animation:bounce 0.8s ease-in-out infinite"></div>`;
    if (i < Q.qIdx) return `<div style="width:14px;height:14px;border-radius:50%;background:var(--red);opacity:0.7"></div>`;
    return `<div style="width:14px;height:14px;border-radius:50%;background:var(--blue-pale);opacity:0.5"></div>`;
  }).join("");

  sc.innerHTML = `
  <div style="min-height:100vh;background:linear-gradient(180deg,#ddeeff 0%,var(--off-white) 100%);padding-bottom:20px">

    <!-- Quiz Header -->
    <div style="background:linear-gradient(135deg,var(--blue-main),var(--blue-deep));padding:16px 16px 24px;position:relative;overflow:hidden">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
        <button onclick="exitQuiz()" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.2);border:none;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center">
          ←
        </button>
        <div style="flex:1">
          <p style="color:rgba(255,255,255,0.7);font-size:11px;font-weight:700">${isl.name} ${isl.emoji}</p>
          <p style="color:#fff;font-family:'Fredoka One',cursive;font-size:16px">Soal ${Q.qIdx + 1} dari ${isl.questions.length}</p>
        </div>
        <!-- Timer -->
        <div style="position:relative;width:50px;height:50px">
          <svg class="timer-svg" width="50" height="50" viewBox="0 0 50 50" style="transform:rotate(-90deg)">
            <circle cx="25" cy="25" r="20" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="4"/>
            <circle id="timerCircle" cx="25" cy="25" r="20" fill="none" stroke="#f6c90e" stroke-width="4"
              stroke-dasharray="125.6" stroke-dashoffset="0" stroke-linecap="round"/>
          </svg>
          <span id="timerText" style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Fredoka One',cursive;font-size:16px">30</span>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="progress-track" style="height:10px;background:rgba(255,255,255,0.2)">
        <div class="progress-fill" style="width:${pct}%;height:100%;background:linear-gradient(90deg,#f6c90e,#ffde59)"></div>
      </div>

      <!-- Streak dots -->
      <div style="display:flex;gap:5px;justify-content:center;margin-top:10px">${dotsHTML}</div>

      <!-- Wave -->
      <svg viewBox="0 0 375 28" style="position:absolute;bottom:-1px;left:0;width:100%;pointer-events:none" preserveAspectRatio="none">
        <path d="M0,14 C80,28 160,0 240,14 S320,28 375,14 L375,28 L0,28Z" fill="#ddeeff"/>
      </svg>
    </div>

    <div style="padding:16px">
      <!-- Category & XP -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
        <span style="background:var(--blue-sky);color:var(--blue-main);border-radius:50px;padding:4px 12px;font-size:12px;font-weight:800">${qData.cat}</span>
        <span class="xp-badge" style="font-size:12px">+${xpThisQ} XP</span>
      </div>

      <!-- Question card -->
      <div class="card" style="padding:20px 18px;margin-bottom:14px;animation:slideUp 0.3s ease">
        <p style="font-size:17px;font-weight:800;color:var(--blue-deep);line-height:1.45">${qData.q}</p>
      </div>

      <!-- Answer options -->
      <div id="answerGrid" style="display:flex;flex-direction:column;gap:10px">
        ${qData.opts
          .map(
            (opt, i) => `
          <button class="answer-btn" id="opt-${i}" onclick="checkAnswer(${i})"
            style="animation:slideUp 0.3s ease ${i * 0.06}s both">
            <span class="opt-letter">${["A", "B", "C", "D"][i]}</span>
            ${opt}
          </button>`,
          )
          .join("")}
      </div>

      <!-- Feedback (hidden initially) -->
      <div id="feedbackBox" style="display:none"></div>
    </div>
  </div>`;

  startTimer(xpThisQ);
}

// ── Timer ──
function startTimer(xpThisQ) {
  clearInterval(Q.timerInterval);
  Q.timeLeft = 30;
  updateTimerDisplay();
  Q.timerInterval = setInterval(() => {
    Q.timeLeft--;
    updateTimerDisplay();
    if (Q.timeLeft <= 0) {
      clearInterval(Q.timerInterval);
      if (!Q.answered) timeOut();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const circle = document.getElementById("timerCircle");
  const text = document.getElementById("timerText");
  if (!circle || !text) return;
  const pct = Q.timeLeft / 30;
  const circ = 125.6;
  circle.style.strokeDashoffset = circ * (1 - pct);
  text.textContent = Q.timeLeft;
  circle.style.stroke = Q.timeLeft > 10 ? "#f6c90e" : Q.timeLeft > 5 ? "#f97316" : "#f04438";
}

// ── Check answer ──
function checkAnswer(chosen) {
  if (Q.answered) return;
  Q.answered = true;
  clearInterval(Q.timerInterval);

  const qData = ISLANDS[Q.islandIdx].questions[Q.qIdx];
  const isCorrect = chosen === qData.ans;
  const xpThisQ = 10 + Q.qIdx * 2;

  // Disable all buttons
  document.querySelectorAll(".answer-btn").forEach((b) => b.classList.add("disabled"));
  document.getElementById(`opt-${chosen}`).classList.add(isCorrect ? "correct" : "wrong");
  if (!isCorrect) document.getElementById(`opt-${qData.ans}`).classList.add("correct");

  if (isCorrect) {
    Q.score++;
    Q.earnedXP += xpThisQ;
    spawnConfetti(null, null, 18);
  } else {
    Q.wrong++;
  }

  // Show feedback
  const fb = document.getElementById("feedbackBox");
  fb.style.display = "block";
  fb.innerHTML = `
    <div class="feedback-box ${isCorrect ? "feedback-correct" : "feedback-wrong"}">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="font-size:28px;animation:pop 0.4s ease">${isCorrect ? "🎉" : "💡"}</span>
        <div>
          <p style="font-weight:900;font-size:15px;color:${isCorrect ? "var(--green)" : "var(--red)"}">
            ${isCorrect ? `Benar! +${xpThisQ} XP 🌟` : "Kurang tepat!"}
          </p>
          ${
            !isCorrect
              ? `<p style="font-size:12px;color:var(--blue-deep);font-weight:700;margin-top:2px">
            Jawaban: <b>${qData.opts[qData.ans]}</b></p>`
              : ""
          }
        </div>
      </div>
      <button class="btn btn-blue" onclick="nextQuestion()"
        style="width:100%;font-size:15px;padding:12px;border-radius:12px;justify-content:center;gap:6px">
        ${Q.qIdx + 1 >= ISLANDS[Q.islandIdx].questions.length ? "🏁 Lihat Hasil" : "Lanjut →"}
      </button>
    </div>`;
}

// ── Time out ──
function timeOut() {
  Q.answered = true;
  Q.wrong++;
  const qData = ISLANDS[Q.islandIdx].questions[Q.qIdx];
  document.querySelectorAll(".answer-btn").forEach((b) => b.classList.add("disabled"));
  document.getElementById(`opt-${qData.ans}`).classList.add("correct");

  const fb = document.getElementById("feedbackBox");
  fb.style.display = "block";
  fb.innerHTML = `
    <div class="feedback-box feedback-wrong">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
        <span style="font-size:28px">⏰</span>
        <div>
          <p style="font-weight:900;font-size:15px;color:var(--red)">Waktu Habis!</p>
          <p style="font-size:12px;color:var(--blue-deep);font-weight:700;margin-top:2px">
            Jawaban: <b>${qData.opts[qData.ans]}</b>
          </p>
        </div>
      </div>
      <button class="btn btn-blue" onclick="nextQuestion()"
        style="width:100%;font-size:15px;padding:12px;border-radius:12px;justify-content:center">
        ${Q.qIdx + 1 >= ISLANDS[Q.islandIdx].questions.length ? "🏁 Lihat Hasil" : "Lanjut →"}
      </button>
    </div>`;
}

// ── Next question ──
function nextQuestion() {
  Q.qIdx++;
  if (Q.qIdx >= ISLANDS[Q.islandIdx].questions.length) {
    finishQuiz();
  } else {
    renderQuizQuestion();
  }
}

// ── Exit quiz ──
function exitQuiz() {
  clearInterval(Q.timerInterval);
  // Show confirm
  const backdrop = document.createElement("div");
  backdrop.className = "modal-backdrop";
  backdrop.innerHTML = `
    <div class="modal-box">
      <span style="font-size:48px">🚪</span>
      <h3 style="font-size:20px;color:var(--blue-deep);margin:10px 0 6px">Keluar Kuis?</h3>
      <p style="font-size:13px;color:#888;font-weight:700;margin-bottom:20px">Progressmu tidak akan tersimpan!</p>
      <div style="display:flex;gap:10px">
        <button class="btn btn-outline" onclick="this.closest('.modal-backdrop').remove();startTimer()"
          style="flex:1;justify-content:center;padding:12px;border-radius:12px;font-size:14px">
          Lanjut
        </button>
        <button class="btn btn-blue" onclick="this.closest('.modal-backdrop').remove(); App.showMap()"
          style="flex:1;justify-content:center;padding:12px;border-radius:12px;font-size:14px">
          Keluar
        </button>
      </div>
    </div>`;
  document.body.appendChild(backdrop);
}

// ── Finish quiz ──
function finishQuiz() {
  clearInterval(Q.timerInterval);

  const isl = ISLANDS[Q.islandIdx];
  const stars = starsFromScore(Q.score);

  // Save to state
  if (Q.score > S.islandScores[Q.islandIdx]) S.islandScores[Q.islandIdx] = Q.score;
  if (stars > S.islandStars[Q.islandIdx]) S.islandStars[Q.islandIdx] = stars;
  addXP(Q.earnedXP);
  checkStreak();
  saveState(S);

  const newAchs = checkAchievements();
  showResultScreen(newAchs);
}

// ── Result screen ──
function showResultScreen(newAchs) {
  const isl = ISLANDS[Q.islandIdx];
  const acc = Math.round((Q.score / isl.questions.length) * 100);

  const stars = S.islandStars[Q.islandIdx];

  const grade = acc >= 90 ? ["SEMPURNA! 🔥", "#f6c90e"] : acc >= 70 ? ["Luar Biasa! 🌟", "var(--green)"] : acc >= 50 ? ["Bagus! 👍", "var(--blue-main)"] : ["Tetap Semangat! 💪", "var(--red)"];

  const sc = document.getElementById("screen-quiz");
  sc.innerHTML = `
  <div style="min-height:100vh;background:linear-gradient(180deg,#ddeeff 0%,var(--off-white) 100%);padding:24px 16px 40px;animation:fadeIn 0.4s ease">

    <!-- Mascot -->
    <div style="text-align:center;margin-bottom:4px">
      <span style="font-size:72px;animation:float 3s ease-in-out infinite;display:inline-block">${isl.emoji}</span>
      <h2 style="font-family:'Fredoka One',cursive;font-size:28px;color:${grade[1]};margin-top:6px">${grade[0]}</h2>
      <p style="font-size:14px;color:var(--blue-light);font-weight:700">${isl.name} — ${Q.score}/${isl.questions.length} benar</p>
    </div>

    <!-- Star row -->
    <div style="display:flex;justify-content:center;gap:12px;margin:16px 0">
      ${[0, 1, 2].map((j, i) => `<span style="font-size:42px;animation:${j < stars ? `starSpin 0.5s ease ${j * 0.2}s both` : "none"};display:inline-block;${j < stars ? "" : "filter:grayscale(1) opacity(0.3)"};${j < stars ? "text-shadow:0 0 20px rgba(246,201,14,0.6)" : ""}">⭐</span>`).join("")}
    </div>

    <!-- Stats -->
    <div class="card" style="padding:18px;margin-bottom:14px">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:14px">
        <div style="text-align:center">
          <p style="font-size:26px;font-family:'Fredoka One',cursive;color:var(--green)">${Q.score}</p>
          <p style="font-size:11px;font-weight:800;color:#aaa">Benar ✅</p>
        </div>
        <div style="text-align:center">
          <p style="font-size:26px;font-family:'Fredoka One',cursive;color:var(--red)">${Q.wrong}</p>
          <p style="font-size:11px;font-weight:800;color:#aaa">Salah ❌</p>
        </div>
        <div style="text-align:center">
          <p style="font-size:26px;font-family:'Fredoka One',cursive;color:var(--yellow-dark)">+${Q.earnedXP}</p>
          <p style="font-size:11px;font-weight:800;color:#aaa">XP ⚡</p>
        </div>
      </div>
      <!-- Accuracy -->
      <div>
        <div style="display:flex;justify-content:space-between;margin-bottom:6px">
          <span style="font-weight:800;font-size:13px;color:var(--blue-deep)">Akurasi</span>
          <span style="font-weight:900;font-size:13px;color:var(--blue-main)">${acc}%</span>
        </div>
        <div class="progress-track" style="height:10px">
          <div class="progress-fill" id="accBar" style="width:0%;height:100%"></div>
        </div>
      </div>
    </div>

    <!-- New achievements -->
    ${
      newAchs.length > 0
        ? `
    <div class="card" style="padding:14px;margin-bottom:14px;border:2px solid var(--yellow);background:#fffbe6">
      <p style="font-family:'Fredoka One',cursive;font-size:15px;color:var(--yellow-dark);margin-bottom:8px">🏅 Pencapaian Baru!</p>
      ${newAchs
        .map(
          (a) => `<div style="display:flex;align-items:center;gap:10px;padding:6px 0">
        <span style="font-size:24px">${a.emoji}</span>
        <div><p style="font-weight:900;font-size:13px;color:var(--blue-deep)">${a.name}</p>
        <p style="font-size:11px;color:#999;font-weight:700">${a.desc}</p></div>
      </div>`,
        )
        .join("")}
    </div>`
        : ""
    }

    <!-- Action buttons -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">
      <button class="btn btn-outline" onclick="beginQuiz(${Q.islandIdx})"
        style="justify-content:center;padding:13px;border-radius:14px;font-size:14px;gap:5px">
        🔄Coba Lagi
      </button>
      <button class="btn btn-blue" onclick="App.showMap()"
        style="justify-content:center;padding:13px;border-radius:14px;font-size:14px;gap:5px">
        🗺️ Peta
      </button>
    </div>
    <button class="btn btn-primary" onclick="App.showDashboard()"
      style="width:100%;justify-content:center;padding:14px;border-radius:14px;font-size:15px;gap:6px">
      📊 Lihat Dashboard
    </button>
  </div>`;

  // Animate accuracy bar
  setTimeout(() => {
    const bar = document.getElementById("accBar");
    if (bar) bar.style.width = acc + "%";
  }, 300);

  // Big confetti for good score
  if (Q.score >= 7) {
    setTimeout(() => spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 40), 400);
  }
}
