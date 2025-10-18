import * as index from "./index.js";

const saveKeyBtn = document.getElementById("saveKey");
const apiKeyTextArea = document.getElementById("apiKey");

if (saveKeyBtn) {
  saveKeyBtn.addEventListener("click", () => {
    setUserKey();
  });
}

function setUserKey() {
  try {
    if (!apiKeyTextArea) return;
    if (!apiKeyTextArea.value) {
      alert("API key cannot be empty.");
      return;
    }
    const storage = chrome?.storage || browser?.storage;
    storage.local.set({ apiKey: apiKeyTextArea.value });

    alert("API key saved!");
  } catch (error) {
    console.error("Error saving API key:", error);
    alert("There was an error saving your API key.");
  }
}

async function loadUserKey() {
  const apiKey = await index.getUserKey();
  if (apiKey && apiKeyTextArea) {
    apiKeyTextArea.placeholder = apiKey;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadUserKey();
  const textareas = document.querySelectorAll("textarea, pre");

  textareas.forEach((el) => {
    // run once at load
    el.style.height = el.scrollHeight + "px";

    // dynamically resize when typing
    el.addEventListener("input", () => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    });
  });
});
