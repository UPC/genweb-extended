<?php
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $_GET['url']);
curl_setopt($ch, CURLOPT_HEADER, TRUE);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, FALSE);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
if ($http_code == '301' || $http_code == '302') {
    list($headers, $response) = explode("\r\n\r\n", $response, 2);
    $headers = explode("\n", $headers);
    foreach($headers as $header) {
        if (stripos($header, 'Location: ') !== false) {
            echo substr($header, strlen('Location: '));
        }
    }
}
?>
