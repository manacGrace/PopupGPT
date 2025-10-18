const sendBtn = document.getElementById("send");

if (sendBtn) {
  sendBtn.addEventListener("click", () => {
    sendRequest();
  });
}

document.addEventListener("DOMContentLoaded", () => {
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

export async function getUserKey() {
  const storage = chrome?.storage || browser?.storage;
  const result = await storage.local.get("apiKey");
  const apiKey = result.apiKey;

  if (!apiKey) {
    throw new Error("Please set your OpenAI API key in the options page ⚙️.");
  }
  return apiKey;
}

async function sendRequest() {
  const highlighted = document.getElementById("highlighted").value;
  const instruction = document.getElementById("instruction").value;
  const prompt = `Here is some text that needs to be corrected: "${highlighted}". Please correct it to proper grammar and clarity, or follow these instructions if any: "${instruction}"`;

  // Show loading animation
  showLoadingAnimation();

  try {
    const apiKey = await getUserKey();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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
    document.getElementById("response").textContent = output;
  } catch (error) {
    console.error("Error from OpenAI API:", error);
    if (error) alert(`${error.message}`);
  } finally {
    // Hide loading animation
    hideLoadingAnimation();
  }
}

function showLoadingAnimation() {
  const responseElement = document.getElementById("response");

  // Show loading animation inside the textarea
  responseElement.innerHTML =
    '<span class="loading-spinner"></span><span class="loading-text">Generating response...</span>';
}

function hideLoadingAnimation() {
  // This function is called in the finally block, but we don't need to do anything
  // since the response content will replace the loading animation
}
