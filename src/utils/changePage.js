settingsBtn = document.getElementById("settings");
goToIndexBtn = document.getElementById("goToIndex");

if (settingsBtn) {
  settingsBtn.addEventListener("click", () => {
    changePage("settings");
  });
}

if (goToIndexBtn) {
  goToIndexBtn.addEventListener("click", () => {
    changePage("index");
  });
}

function changePage(page) {
  window.location.href = `${page}.html`;
}
