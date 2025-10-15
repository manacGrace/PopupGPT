async function setUserKey() {
  const { apiKey } = await chrome.storage.local.get("apiKey");
  if (!apiKey) {
    alert("Please set your OpenAI API key in the options page first.");
    return;
  }
}