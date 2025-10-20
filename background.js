chrome.runtime.onMessage.addListener(async (msg, sender, sendResponse) => {
  if (msg.type === "SUMMARIZE") {
    try {
      const tabId = msg.tabId;

      // First, ensure content script is injected
      try {
        await chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["content.js"],
        });
      } catch (injectError) {
        console.log(
          "Content script already injected or injection failed:",
          injectError
        );
      }

      // Wait a moment for content script to be ready
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Extract text from the page
      let extract;
      try {
        extract = await chrome.tabs.sendMessage(tabId, {
          type: "EXTRACT_TEXT",
        });
      } catch (messageError) {
        console.error(
          "Failed to send message to content script:",
          messageError
        );
        throw new Error(
          "Content script not responding. Please refresh the page and try again."
        );
      }

      if (!extract || !extract.text) {
        throw new Error("Failed to extract text from page");
      }

      // Send extracted text to Supabase Edge Function (live)
      const res = await fetch(
        "https://uztwshyinaefoyfohosf.functions.supabase.co/summarize",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: extract.url,
            title: extract.title,
            text: extract.text,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`API request failed: ${res.status} ${res.statusText}`);
      }

      const summary = await res.json();

      // Send summary back to content script
      chrome.tabs.sendMessage(tabId, {
        type: "RENDER_SUMMARY",
        payload: summary,
      });

      sendResponse({ success: true });
    } catch (error) {
      console.error("Background script error:", error);
      sendResponse({ success: false, error: error.message });
    }

    return true; // Keep message channel open for async response
  }
});

// Handle keyboard shortcut
chrome.commands.onCommand.addListener((command) => {
  if (command === "summarize-page") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        chrome.runtime.sendMessage({
          type: "SUMMARIZE",
          tabId: tabs[0].id,
        });
      }
    });
  }
});
