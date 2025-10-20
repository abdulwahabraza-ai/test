document.addEventListener("DOMContentLoaded", function () {
  const summarizeBtn = document.getElementById("summarizeBtn");
  const status = document.getElementById("status");
  const buttonText = summarizeBtn.querySelector(".button-text");
  const loading = summarizeBtn.querySelector(".loading");

  function setStatus(message, type = "default") {
    status.textContent = message;
    status.className = `status-${type}`;
  }

  function setLoading(isLoading) {
    summarizeBtn.disabled = isLoading;
    if (isLoading) {
      buttonText.style.display = "none";
      loading.style.display = "flex";
      setStatus("AI is analyzing the page...", "loading");
    } else {
      buttonText.style.display = "block";
      loading.style.display = "none";
    }
  }

  summarizeBtn.addEventListener("click", async () => {
    try {
      setLoading(true);

      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (!tab.id) {
        throw new Error("No active tab found");
      }

      console.log("Sending message to background script for tab:", tab.id);

      // Send message to background script
      chrome.runtime.sendMessage(
        {
          type: "SUMMARIZE",
          tabId: tab.id,
        },
        (response) => {
          console.log("Received response from background:", response);

          if (chrome.runtime.lastError) {
            console.error("Chrome runtime error:", chrome.runtime.lastError);
            throw new Error(chrome.runtime.lastError.message);
          }

          if (response && response.success) {
            setStatus("✅ Analysis complete! Check the side panel.", "success");
          } else {
            throw new Error(response?.error || "Unknown error occurred");
          }
        }
      );
    } catch (error) {
      console.error("Error:", error);
      setStatus(`❌ Error: ${error.message}`, "error");
    } finally {
      setLoading(false);
    }
  });

  // Handle keyboard shortcut
  chrome.commands.onCommand.addListener((command) => {
    if (command === "summarize-page") {
      summarizeBtn.click();
    }
  });
});
