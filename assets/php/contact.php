<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate the inputs
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    // Validate fields
    if ($name && $email && $message) {
        // Email settings
        $to = "support@redfox-studios.org";  // Default
        $subject = "New Contact Form Submission from $name";
        $body = "
            Name: $name\n
            Email: $email\n
            Message: $message
        ";
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion();

        // Send email
        if (mail($to, $subject, $body, $headers)) {
            echo "Message sent successfully!";
        } else {
            echo "Error: Message could not be sent.";
        }
    } else {
        echo "Please fill all fields correctly.";
    }
}
?>