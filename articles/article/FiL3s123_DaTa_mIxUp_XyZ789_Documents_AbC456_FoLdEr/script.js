// This code will display an alert when the page loads
window.addEventListener('load', function() {
    alert('WARNING: This webpage is collecting IP adresses from devices on join');
});

// Function to display "Please Wait" alert for 2.5 seconds and then redirect
function displayPleaseWaitAlertAndRedirect(url) {
    alert("Please Wait");
    setTimeout(function () {
        // Redirect to the specified URL after 2.5 seconds
        window.location.href = url;
    }, 2500); // 2500 milliseconds (2.5 seconds)
}

// Function to redirect to Scary Place 1
function goToScaryPlace1() {
    displayPleaseWaitAlertAndRedirect("https://example.com/scary-place-1"); // Replace with the actual URL for Scary Place 1
}

// Function to redirect to Scary Place 2
function goToScaryPlace2() {
    displayPleaseWaitAlertAndRedirect("https://example.com/scary-place-2"); // Replace with the actual URL for Scary Place 2
}

// Function to redirect to Scary Place 3
function goToScaryPlace3() {
    displayPleaseWaitAlertAndRedirect("https://example.com/scary-place-3"); // Replace with the actual URL for Scary Place 3
}
