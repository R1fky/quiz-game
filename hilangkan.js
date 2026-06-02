





// function checkAnswer(chosen) {
//   if (Q.answered) return;
//   Q.answered = true;
//   clearInterval(Q.timerInterval);

//   const qData = ISLANDS[Q.islandIdx].questions[Q.qIdx];
//   const isCorrect = chosen === qData.ans;
//   const xpThisQ = 10 + Q.qIdx * 2;

//   // Disable all buttons
//   document.querySelectorAll(".answer-btn").forEach((b) => b.classList.add("disabled"));

//   const selectedBtn = document.getElementById(`opt-${chosen}`);

//   // Animasi klik
//   selectedBtn.classList.add("answered");

//   // Animasi berdasarkan hasil TANPA kasih tau benar/salah
//   if (isCorrect) {
//     selectedBtn.classList.add("pulse-success");
//     spawnConfetti(null, null, 12);
//   } else {
//     selectedBtn.classList.add("shake-soft");
//   }

//   if (isCorrect) {
//     Q.score++;
//     Q.earnedXP += xpThisQ;
//     spawnConfetti(null, null, 18);
//   } else {
//     Q.wrong++;
//   }

// // Show feedback
// const fb = document.getElementById("feedbackBox");
// fb.style.display = "block";
// fb.innerHTML = `
//   <div class="feedback-box ${isCorrect ? "feedback-correct" : "feedback-wrong"}">
//     <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
//       <span style="font-size:28px;animation:pop 0.4s ease">${isCorrect ? "🎉" : "💡"}</span>
//       <div>
//         <p style="font-weight:900;font-size:15px;color:${isCorrect ? "var(--green)" : "var(--red)"}">
//           ${isCorrect ? `Mantap! +${xpThisQ} XP 🌟` : "Tetap semangat, lanjut ya!"}
//         </p>
//         ${
//           !isCorrect
//             ? `<p style="font-size:12px;color:var(--blue-deep);font-weight:700;margin-top:2px">`
//             : ""
//         }
//       </div>
//     </div>
//     <button class="btn btn-blue" onclick="nextQuestion()"
//       style="width:100%;font-size:15px;padding:12px;border-radius:12px;justify-content:center;gap:6px">
//       ${Q.qIdx + 1 >= ISLANDS[Q.islandIdx].questions.length ? "🏁 Lihat Hasil" : "Lanjut →"}
//     </button>
//   </div>`;
// }

// ── Time out ──
// function timeOut() {
//   Q.answered = true;
//   Q.wrong++;
//   const qData = ISLANDS[Q.islandIdx].questions[Q.qIdx];
//   document.querySelectorAll(".answer-btn").forEach((b) => b.classList.add("disabled"));
//   document.getElementById(`opt-${qData.ans}`).classList.add("correct");

//   const fb = document.getElementById("feedbackBox");
//   fb.style.display = "block";
//   fb.innerHTML = `
//     <div class="feedback-box feedback-wrong">
//       <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
//         <span style="font-size:28px">⏰</span>
//         <div>
//           <p style="font-weight:900;font-size:15px;color:var(--red)">Waktu Habis!</p>
//           <p style="font-size:12px;color:var(--blue-deep);font-weight:700;margin-top:2px">
//             Jawaban: <b>${qData.opts[qData.ans]}</b>
//           </p>
//         </div>
//       </div>
//       <button class="btn btn-blue" onclick="nextQuestion()"
//         style="width:100%;font-size:15px;padding:12px;border-radius:12px;justify-content:center">
//         ${Q.qIdx + 1 >= ISLANDS[Q.islandIdx].questions.length ? "🏁 Lihat Hasil" : "Lanjut →"}
//       </button>
//     </div>`;
// }