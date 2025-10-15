document.getElementById("send").addEventListener("click", sendRequest);
document.addEventListener("DOMContentLoaded", () => {
  const textareas = document.querySelectorAll("textarea, pre");

  textareas.forEach(el => {
    // run once at load
    el.style.height = el.scrollHeight + "px";

    // dynamically resize when typing
    el.addEventListener("input", () => {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    });
  });
});

async function getUserKey() {
  const result = await chrome.storage.local.get("apiKey");
  const apiKey = result.apiKey;
  if (!apiKey) {
    alert("Please set your OpenAI API key in the options page first.");
    throw new Error("API key missing");
  }
  return apiKey;
}

async function sendRequest() {
  const highlighted = document.getElementById("highlighted").value;
  const instruction = document.getElementById("instruction").value;

  const prompt = `Here is some text that needs to be corrected: ${highlighted} Please correct it to proper grammar and clarity, or follow these instructions if any: ${instruction}`;
  try {
    /* const apiKey = await getUserKey(); */

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer sk-xxxx",
        /* Authorization: `Bearer ${apiKey}`, */
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful grammar corrector." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    console.log("Response from API:", data);

    // Get output safely
    const output = data.choices?.[0]?.message?.content || "No response.";
    document.getElementById("response").innerText = output;
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    alert(
      "There was an error processing your request. Make sure your API key is set correctly."
    );
  }
}
