// Capture synchronous errors
window.onerror = function(message, source, lineno, colno, error) {
    console.error("An error occurred:", {
        message: message || 'Unknown error',
        filename: source || 'N/A',
        lineno: lineno || 'N/A',
        colno: colno || 'N/A',
        error: error ? error.stack : 'No stack trace available',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
    });
};

// Capture unhandled promise rejections
window.onunhandledrejection = function(event) {
    console.error("An unhandled promise rejection occurred:", {
        message: event.reason.message || 'Unhandled promise rejection',
        error: event.reason,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
    });
};

// Optional: Log any loading errors
window.addEventListener('load', function() {
    if (document.readyState !== 'complete') {
        console.error("Page did not load properly.");
        // Redirect to the error page
        window.location.href = '/error/';
    }
});