const App = {
  showRegister() {
    document.getElementById("screen-register").style.display = "block";
    document.getElementById("screen-dashboard").style.display = "none";
    document.getElementById("screen-map").style.display = "none";
    document.getElementById("screen-quiz").style.display = "none";

    renderRegister();

    setTimeout(() => {
      document.querySelector(".avatar-btn")?.classList.add("active");
    }, 0);
  },

  showDashboard() {
    document.getElementById("screen-dashboard").style.display = "block";
    document.getElementById("screen-map").style.display = "none";
    document.getElementById("screen-quiz").style.display = "none";

    renderDashboard();
  },

  showMap() {
    document.getElementById("screen-dashboard").style.display = "none";
    document.getElementById("screen-map").style.display = "block";
    document.getElementById("screen-quiz").style.display = "none";

    renderMap();
  },

  showScreen(screenId) {
    document.getElementById("screen-dashboard").style.display = "none";
    document.getElementById("screen-map").style.display = "none";
    document.getElementById("screen-quiz").style.display = "none";

    document.getElementById(screenId).style.display = "block";
  },

  startQuiz(idx) {
    beginQuiz(idx);
  },
};

window.onload = () => {
  if (!S.userName) {
    App.showRegister();
  } else {
    App.showDashboard();
  }
};
