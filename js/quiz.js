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
  answeredCount: 0,
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
    answeredCount: 0,
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
    if (i < Q.answeredCount)
      return `
        <div style="
          width:14px;
          height:14px;
          border-radius:50%;
          background:var(--green);
          box-shadow:0 0 8px var(--green);
        "></div>
      `;

    if (i === Q.qIdx)
      return `
        <div style="
          width:14px;
          height:14px;
          border-radius:50%;
          background:var(--yellow);
          animation:bounce .8s ease-in-out infinite;
        "></div>
      `;

    return `
      <div style="
        width:14px;
        height:14px;
        border-radius:50%;
        background:var(--blue-pale);
        opacity:.5;
      "></div>
    `;
  }).join("");

  sc.innerHTML = `
    <div style="
  min-height:100vh;
  background:
  linear-gradient(
    135deg,
    #172c33 0%,
    #1f3b45 50%,
    #172c33 100%
  );
  padding-bottom:20px;
  position:relative;
  overflow:hidden;
  ">

  <!-- Avatar Pattern Background -->
  <div style="
    position:absolute;
    inset:0;
    overflow:hidden;
    pointer-events:none;
    z-index:0;
  ">

    <div style="position:absolute;top:5%;left:5%;font-size:140px;opacity:0.08;">
      ${S.avatar}
    </div>

    <div style="position:absolute;top:10%;right:10%;font-size:180px;opacity:0.08;">
      ${S.avatar}
    </div>

    <div style="position:absolute;top:35%;left:15%;font-size:220px;opacity:0.06;">
      ${S.avatar}
    </div>

    <div style="position:absolute;top:45%;right:8%;font-size:150px;opacity:0.08;">
      ${S.avatar}
    </div>

    <div style="position:absolute;bottom:20%;left:5%;font-size:180px;opacity:0.07;">
      ${S.avatar}
    </div>

    <div style="position:absolute;bottom:10%;right:15%;font-size:220px;opacity:0.06;">
      ${S.avatar}
    </div>

    <div style="
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      font-size:340px;
      opacity:0.12;
      filter:drop-shadow(0 0 25px rgba(255,255,255,0.2));">
      ${S.avatar}
    </div>

  </div>

  <!-- Logo CBP Tengah Bawah -->
  <img
    src="assets/images/cbp-logo.png"
    style="
      position:absolute;
      bottom:-40px;
      left:50%;
      transform:translateX(-50%);
      width:320px;
      opacity:0.10;
      pointer-events:none;
      z-index:0;
    "
  >

      <!-- Quiz Header -->
  <div style="
    position:relative;
    z-index:2;
    background:rgba(255,255,255,0.08);
    backdrop-filter:blur(20px);
    border:1px solid rgba(255,255,255,0.12);
    padding:16px 16px 24px;
    overflow:hidden;
  ">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px">
          <button onclick="exitQuiz()" style="width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,0.2);border:none;color:#fff;font-size:18px;cursor:pointer;display:flex;align-items:center;justify-content:center">
            ←
          </button>
          <div style="display:flex;align-items:center;gap:8px;flex:1">
          <span style="font-size:22px">${S.avatar}</span>
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
          <path d="M0,14 C80,28 160,0 240,14 S320,28 375,14 L375,28 L0,28Z" fill="rgba(255,255,255,0.05)"/>
        </svg>
      </div>

      <div style="padding:16px">
        <!-- Category & XP -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <span style="background:var(--blue-sky);color:white;border-radius:50px;padding:4px 12px;font-size:12px;font-weight:800">${qData.cat}</span>
          <span class="xp-badge" style="font-size:12px">+${xpThisQ} XP</span>
        </div>

        <!-- Question quiz-card -->
        <div style="
          padding:20px;
          border-radius:28px;
          background:rgba(255,255,255,.08);
          backdrop-filter:blur(24px);
          border:1px solid rgba(255,255,255,.15);
          box-shadow:
          0 20px 40px rgba(0,0,0,.25),
          inset 0 1px 0 rgba(255,255,255,.1);
          margin-bottom:16px;
          ">
            <p style="
              font-size:17px;
              font-weight:800;
              line-height:1.45;
              color:#fff;">
              ${qData.q}
            </p>
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

        
        <!-- Feedback -->
        <div id="feedbackBox" style="display:none"></div>

        <!-- Avatar Player -->
        <div class="quiz-avatar">
          <div class="avatar-bubble">
            ${S.avatar}
          </div>
        </div>
      </div>
    </div>`;

  startTimer(xpThisQ);
}

// ── Timer ──
function startTimer(xpThisQ) {
  clearInterval(Q.timerInterval);
  Q.timeLeft = 10;
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
  Q.answeredCount++;
  clearInterval(Q.timerInterval);

  const xpThisQ = 10 + Q.qIdx * 2;

  // Disable tombol
  document.querySelectorAll(".answer-btn").forEach((b) => b.classList.add("disabled"));

  const selectedBtn = document.getElementById(`opt-${chosen}`);

  // Animasi klik (netral)
  // Reset semua dulu (biar bersih)
  document.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.classList.remove("selected-final");
  });

  // Kasih efek ke yang dipilih
  selectedBtn.classList.add("answered");
  selectedBtn.classList.add("pulse-soft");

  // Tambah efek setelah animasi selesai
  setTimeout(() => {
    selectedBtn.classList.add("selected-final");
  }, 200);

  // ❗ LOGIC tetap jalan di belakang layar (untuk XP & statistik)
  const qData = ISLANDS[Q.islandIdx].questions[Q.qIdx];
  const isCorrect = chosen === qData.ans;

  if (isCorrect) {
    Q.score++;
    Q.earnedXP += xpThisQ;
  } else {
    Q.wrong++;
  }

  // ❌ TANPA kasih tahu benar/salah
  const fb = document.getElementById("feedbackBox");
  fb.style.display = "block";
  fb.innerHTML = `
    <div class="feedback-box" style="
      margin-top:16px;
      animation:slideUp .3s ease;
    ">
      <div style="
        text-align:center;
        margin-bottom:14px;
      ">
        <div style="
          width:60px;
          height:60px;
          margin:auto;
          border-radius:50%;
          background:rgba(45,200,160,.15);
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:28px;
        ">
          ✨
        </div>

        <p style="
          color:#fff;
          font-weight:800;
          margin-top:10px;
          font-size:15px;
        ">
          Jawaban tersimpan!
        </p>

        <p style="
          color:rgba(255,255,255,.7);
          font-size:12px;
        ">
          Siap ke soal berikutnya?
        </p>
      </div>

      <button class="rw-btn" onclick="nextQuestion()">
        <div class="rw-btn-inner">
          ${Q.qIdx + 1 >= ISLANDS[Q.islandIdx].questions.length ? "Selesaikan Quiz" : "Lanjut"}
          <div class="rw-btn-arrow">
            <i class="ti ti-arrow-right"></i>
          </div>
        </div>
      </button>
    </div>
  `;
}

function timeOut() {
  Q.answered = true;
  Q.answeredCount++;
  Q.wrong++;

  document.querySelectorAll(".answer-btn").forEach((b) => b.classList.add("disabled"));

  const fb = document.getElementById("feedbackBox");
  fb.style.display = "block";
  fb.innerHTML = `
  <div class="feedback-box" style="margin-top:16px">

    <div style="text-align:center;margin-bottom:14px">
      <div style="
        width:60px;
        height:60px;
        margin:auto;
        border-radius:50%;
        background:rgba(255,193,7,.15);
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:28px;
      ">
        ⏰
      </div>

      <p style="
        color:#fff;
        font-weight:800;
        margin-top:10px;
        font-size:15px;
      ">
        Waktu habis!
      </p>

      <p style="
        color:rgba(255,255,255,.7);
        font-size:12px;
      ">
        Jangan menyerah, lanjut ke soal berikutnya.
      </p>
    </div>

    <button class="rw-btn" onclick="nextQuestion()">
      <div class="rw-btn-inner">
        ${Q.qIdx + 1 >= ISLANDS[Q.islandIdx].questions.length ? "Selesaikan Quiz" : "Lanjut"}
        <div class="rw-btn-arrow">
          <i class="ti ti-arrow-right"></i>
        </div>
      </div>
    </button>

  </div>
  `;
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
        <h3 style="font-size:20px;color:white;margin:10px 0 6px">Keluar Kuis?</h3>
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

function finishQuiz() {
  clearInterval(Q.timerInterval);

  const isl = ISLANDS[Q.islandIdx];
  const stars = starsFromScore(Q.score, isl.questions.length); // sekalian fix bug

  // 🔥 TAMBAHKAN INI
  S.playedIslands[Q.islandIdx] = true;

  // Save to state
  if (Q.score > S.islandScores[Q.islandIdx]) {
    S.islandScores[Q.islandIdx] = Q.score;
  }

  if (stars > S.islandStars[Q.islandIdx]) {
    S.islandStars[Q.islandIdx] = stars;
  }

  addXP(Q.earnedXP);
  checkStreak();
  saveState(S);

  const newAchs = checkAchievements();
  showResultScreen(newAchs);
}

function showResultScreen(newAchs) {
  const isl = ISLANDS[Q.islandIdx];
  const acc = Math.round((Q.score / isl.questions.length) * 100);
  const stars = S.islandStars[Q.islandIdx];

  const grade = acc >= 90 ? ["SEMPURNA! 🔥", "#FFD700"] : acc >= 70 ? ["Luar Biasa! 🌟", "#7CFF7C"] : acc >= 50 ? ["Bagus! 👍", "#69B7FF"] : ["Tetap Semangat! 💪", "#FF6B6B"];

  const sc = document.getElementById("screen-quiz");

  sc.innerHTML = `
<div style="
  min-height:100vh;
  background:linear-gradient(
    135deg,
    #172c33 0%,
    #1f3b45 50%,
    #172c33 100%
  );
  padding:24px 16px 40px;
  position:relative;
  overflow:hidden;">
  <!-- Background Shapes -->
  <div class="shape shape-1"></div>
  <div class="shape shape-2"></div>
  <div class="shape shape-3"></div>

  <div class="red-circle red-1"></div>
  <div class="red-circle red-2"></div>
  <div class="red-circle red-3"></div>
  <div class="red-circle red-4"></div>

  <!-- Background Logos -->
  <div style="
    position:absolute;
    inset:0;
    pointer-events:none;
    z-index:0;
  ">
    <img src="assets/images/cbp-logo.png"
        style="position:absolute;top:5%;left:5%;width:120px;opacity:.08">

    <img src="assets/images/cbp-logo.png"
        style="position:absolute;top:8%;right:8%;width:140px;opacity:.08">

    <img src="assets/images/cbp-logo.png"
        style="position:absolute;top:30%;left:10%;width:150px;opacity:.06">

    <img src="assets/images/cbp-logo.png"
        style="position:absolute;top:40%;right:10%;width:140px;opacity:.06">

    <img src="assets/images/cbp-logo.png"
        style="position:absolute;bottom:20%;left:5%;width:160px;opacity:.07">

    <img src="assets/images/cbp-logo.png"
        style="position:absolute;bottom:15%;right:10%;width:160px;opacity:.07">

    <img src="assets/images/cbp-logo.png"
        style="
          position:absolute;
          top:50%;
          left:50%;
          transform:translate(-50%,-50%);
          width:420px;
          opacity:.04;
        ">
  </div>

  <!-- Content -->
  <div style="
    position:relative;
    z-index:5;
    max-width:500px;
    margin:auto;
  ">

    <!-- Logo -->
    <div style="
      display:flex;
      justify-content:center;
      margin-bottom:24px;
    ">
      <div style="
        background:white;
        padding:14px 24px;
        border-radius:22px;
        box-shadow:0 10px 25px rgba(0,0,0,.2);
      ">
        <img src="assets/images/bi-logo.png" style="width:180px">
      </div>
    </div>

    <!-- Avatar -->
    <div style="text-align:center;margin-bottom:20px;">
      <div style="
        width:110px;
        height:110px;
        margin:auto;
        border-radius:50%;
        background:white;
        display:flex;
        align-items:center;
        justify-content:center;
        font-size:58px;
        box-shadow:0 10px 30px rgba(0,0,0,.25);
        animation:float 3s ease-in-out infinite;
      ">
        ${S.avatar}
      </div>

      <div style="font-size:50px;margin-top:8px;">
        ${isl.emoji}
      </div>

      <h2 style="
        font-family:'Fredoka One',cursive;
        font-size:28px;
        color:${grade[1]};
        margin-top:10px;
      ">
        ${grade[0]}
      </h2>

      <p style="
        color:rgba(255,255,255,.85);
        font-size:14px;
        font-weight:700;
      ">
        ${isl.name} — ${Q.score}/${isl.questions.length} benar
      </p>
    </div>

    <!-- Stars -->
    <div style="
      display:flex;
      justify-content:center;
      gap:12px;
      margin-bottom:20px;
    ">
      ${[0, 1, 2]
        .map(
          (j) => `
        <span style="
          font-size:42px;
          ${j < stars ? "text-shadow:0 0 20px rgba(246,201,14,.6)" : "filter:grayscale(1) opacity(.3)"}
        ">⭐</span>
      `,
        )
        .join("")}
    </div>

    <!-- Stats Card -->
    <div style="
      padding:20px;
      border-radius:28px;
      background:rgba(255,255,255,.08);
      backdrop-filter:blur(24px);
      border:1px solid rgba(255,255,255,.15);
      margin-bottom:16px;
    ">
      <div style="
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:10px;
        text-align:center;
      ">
        <div>
          <p style="font-size:26px;color:white">${Q.score + Q.wrong}</p>
          <p style="font-size:11px;color:#ccc">Total Soal</p>
        </div>

        <div>
          <p style="font-size:26px;color:white">${Q.earnedXP}</p>
          <p style="font-size:11px;color:#ccc">XP</p>
        </div>

        <div>
          <p style="font-size:26px;color:white">${stars}</p>
          <p style="font-size:11px;color:#ccc">Bintang</p>
        </div>
      </div>

      <div style="margin-top:18px;">
        <div style="
          display:flex;
          justify-content:space-between;
          color:white;
          margin-bottom:6px;
        ">
          <span>Akurasi</span>
          <span>${acc}%</span>
        </div>

        <div class="progress-track" style="height:10px;">
          <div id="accBar" class="progress-fill"
              style="width:0%;height:100%;">
          </div>
        </div>
      </div>
    </div>

    ${
      newAchs.length > 0
        ? `
        <div style="
          padding:20px;
          border-radius:28px;
          background:rgba(255,255,255,.08);
          backdrop-filter:blur(24px);
          border:1px solid rgba(255,255,255,.15);
          margin-bottom:16px;
        ">
          <h3 style="color:#FFD700;">
            🏅 Pencapaian Baru!
          </h3>

          ${newAchs
            .map(
              (a) => `
            <div style="
              display:flex;
              gap:10px;
              margin-top:10px;
            ">
              <span style="font-size:24px;">
                ${a.emoji}
              </span>

              <div>
                <p style="color:white;font-weight:700;">
                  ${a.name}
                </p>

                <p style="color:#ccc;font-size:12px;">
                  ${a.desc}
                </p>
              </div>
            </div>
          `,
            )
            .join("")}
        </div>
      `
        : ""
    }

    <!-- Buttons -->
    <div style="
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:10px;
      margin-bottom:10px;
    ">
      <button onclick="beginQuiz(${Q.islandIdx})"
        style="
          background:white;
          color:#d94141;
          border:none;
          padding:15px;
          border-radius:18px;
          font-weight:900;
        ">
        🔄 Coba Lagi
      </button>

      <button onclick="App.showMap()"
        style="
          background:linear-gradient(135deg,#ff4545,#d91f26);
          color:white;
          border:none;
          padding:15px;
          border-radius:18px;
          font-weight:900;
        ">
        🗺️ Peta
      </button>
    </div>

    <button onclick="App.showDashboard()"
      style="
        width:100%;
        background:white;
        color:#d94141;
        border:none;
        padding:16px;
        border-radius:18px;
        font-weight:900;
      ">
      📊 Lihat Dashboard
    </button>

  </div>
</div>`;
  // Animate accuracy bar
  setTimeout(() => {
    const bar = document.getElementById("accBar");
    if (bar) {
      bar.style.width = acc + "%";
    }
  }, 300);

  // Confetti
  if (Q.score >= 7) {
    setTimeout(() => {
      spawnConfetti(window.innerWidth / 2, window.innerHeight / 2, 40);
    }, 400);
  }
}
