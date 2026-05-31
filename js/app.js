const App = {
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
  App.showDashboard();
};
