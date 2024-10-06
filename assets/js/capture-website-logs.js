// Discord Webhook URL
const webhookURL = "https://discord.com/api/webhooks/1287681223757398048/Iwcld7rBj57dVd40_fO39VnZO3EcokOpGCNJny20uBgSmU4ubu6hgPjBx-WzAVG-6rMj"; // Replace with your webhook URL

// Toggles to activate or deactivate specific logging
let loggingEnabled = true; // Overall logging toggle
let consoleLogEnabled = false; // Toggle for console log events
let consoleWarnEnabled = false; // Toggle for console warning events
let consoleErrorEnabled = true; // Toggle for console error events
let jsErrorEnabled = true; // Toggle for JavaScript error events

// Function to get system and screen information
function getSystemInfo() {
  const platform = navigator.platform;
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const windowSize = `${window.innerWidth}x${window.innerHeight}`;

  return { platform, userAgent, language, screenResolution, windowSize };
}

// Function to send data to Discord
function sendToDiscord(action, details = '', link = '') {
  if (!loggingEnabled) return; // If overall logging is disabled

  // Get system info
  const { platform, userAgent, language, screenResolution, windowSize } = getSystemInfo();

  const message = {
    content:
`\`\`\`scala
- Action: "${action}"
- Details: "${details}"
- Page: "${link}"

- Language: "${language}"
- Screen Resolution: "${screenResolution}"
- Window Size: "${windowSize}"
  
- Platform: "${platform}"
- User Agent: "${userAgent}"
\`\`\``
  };  

  fetch(webhookURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(message)
  })
  .catch(error => console.error('Error sending to Discord:', error));
}

// 1. Capture Console Messages
(function() {
  const originalLog = console.log;
  console.log = function(message) {
    if (consoleLogEnabled) {
      sendToDiscord('Console Log', message, window.location.href);
    }
    originalLog.apply(console, arguments);
  };

  const originalError = console.error;
  console.error = function(message) {
    if (consoleErrorEnabled) {
      sendToDiscord('Console Error', message, window.location.href);
    }
    originalError.apply(console, arguments);
  };

  const originalWarn = console.warn;
  console.warn = function(message) {
    if (consoleWarnEnabled) {
      sendToDiscord('Console Warning', message, window.location.href);
    }
    originalWarn.apply(console, arguments);
  };
})();

// 2. Capture JavaScript Errors
window.onerror = function(message, source, lineno, colno, error) {
  if (jsErrorEnabled) {
    sendToDiscord('JavaScript Error', `Message: ${message}, Source: ${source}, Line: ${lineno}, Column: ${colno}`, window.location.href);
  }
  return false; // Prevents the error from being logged to the browser console (optional)
};