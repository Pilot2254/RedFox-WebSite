<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate form inputs
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $category = htmlspecialchars($_POST['category']);
    $subject = htmlspecialchars($_POST['subject']);
    $description = htmlspecialchars($_POST['description']);
    
    // File upload handling
    $file = $_FILES['file-upload'];
    $file_name = $file['name'];
    $file_tmp_name = $file['tmp_name'];
    $file_error = $file['error'];

    $to = 'support@redfox-studios.org';  // Your email
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    
    // Email subject
    $email_subject = "New Form Submission: " . $subject;

    // Email body
    $email_body = "Email: $email\n";
    $email_body .= "Category: $category\n";
    $email_body .= "Description:\n $description\n";

    // Check if there's an attachment and no error occurred
    if ($file_error === 0) {
        $file_content = chunk_split(base64_encode(file_get_contents($file_tmp_name)));
        $separator = md5(time());
        
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: multipart/mixed; boundary=\"" . $separator . "\"\r\n\r\n";
        
        $email_body = "--" . $separator . "\r\n";
        $email_body .= "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n";
        $email_body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
        $email_body .= "$description\r\n\r\n";
        $email_body .= "--" . $separator . "\r\n";
        $email_body .= "Content-Type: application/octet-stream; name=\"" . $file_name . "\"\r\n";
        $email_body .= "Content-Transfer-Encoding: base64\r\n";
        $email_body .= "Content-Disposition: attachment; filename=\"" . $file_name . "\"\r\n\r\n";
        $email_body .= $file_content . "\r\n\r\n";
        $email_body .= "--" . $separator . "--";
    }

    // Attempt to send the email
    if (mail($to, $email_subject, $email_body, $headers)) {
        // Success, redirect to mail sent success page
        header("Location: /error/mail-sent/index.html");
    } else {
        // Error, redirect to unexpected error page
        header("Location: /error/unexpected/index.html");
    }
    exit();
} else {
    // If the request method is not POST, redirect to unexpected error page
    header("Location: /error/unexpected/index.html");
    exit();
}
?>