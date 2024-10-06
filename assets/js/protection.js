// Toggle for enabling/disabling protections
let protectionEnabled = true; // Default: true

if (protectionEnabled) {
  // Disable right-click
  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    console.log("Right-click is disabled to protect content.");
  });

  // Disable F12, Ctrl+Shift+I, Ctrl+U
  document.onkeydown = function(e) {
    if (e.keyCode === 123 || // F12
       (e.ctrlKey && e.shiftKey && e.keyCode === 'I'.charCodeAt(0)) || // Ctrl+Shift+I
       (e.ctrlKey && e.keyCode === 'U'.charCodeAt(0))) { // Ctrl+U
      e.preventDefault();
      console.log("Inspecting and viewing the source is disabled.");
      return false;
    }
  };

  // Disable Ctrl+S (Save Page As) and Ctrl+P (Print)
  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey && e.keyCode === 'S'.charCodeAt(0)) || // Ctrl+S
        (e.ctrlKey && e.keyCode === 'P'.charCodeAt(0))) { // Ctrl+P
      e.preventDefault();
      console.log("Saving or printing this page is disabled.");
      return false;
    }
  });

  // Disable text selection
  document.addEventListener('selectstart', function(e) {
    e.preventDefault();
  });

  // Obfuscation to make tampering harder
  (function() {
    let originalConsoleLog = console.log;
    let originalConsoleWarn = console.warn;
    let originalConsoleError = console.error;
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};

    // Detect console opening and redirect it
    let element = new Image();
    Object.defineProperty(element, 'id', {
      get: function() {
        console.log('Developer tools are disabled.');
        window.location.href = 'about:blank'; // Redirect if DevTools are opened
      }
    });
    console.dir(element);
  })();
}