<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get form data
$package = $_POST['package'] ?? '';
$price = $_POST['price'] ?? '';
$name = $_POST['name'] ?? '';
$phone = $_POST['phone'] ?? '';
$email = $_POST['email'] ?? '';
$arrivalDate = $_POST['arrivalDate'] ?? '';
$adults = $_POST['adults'] ?? '';
$children = $_POST['children'] ?? '';
$message = $_POST['message'] ?? '';

// Validate required fields
if (empty($name) || empty($phone) || empty($email) || empty($arrivalDate) || empty($adults)) {
    http_response_code(400);
    echo json_encode(['error' => 'Please fill all required fields']);
    exit;
}

// Email configuration
$to = 'wonderlustholidayskashmir@gmail.com';
$subject = 'New Quote Request - ' . $package;

// Create email body
$emailBody = "
New Quote Request from Wonderlust Travels Kashmir Website

Package Details:
- Package: {$package}
- Price: {$price}

Customer Information:
- Name: {$name}
- Phone: {$phone}
- Email: {$email}
- Date of Arrival: {$arrivalDate}
- Number of Adults: {$adults}
- Number of Children: {$children}

Message:
{$message}

---
This email was sent from the Wonderlust Travels Kashmir website.
Sent on: " . date('Y-m-d H:i:s') . "
";

// Email headers
$headers = array(
    'From: noreply@wonderlusttravelskashmir.com',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion()
);

// Send email
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you for your quote request! We will contact you soon.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send email. Please try again or contact us directly.'
    ]);
}
?> 