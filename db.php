<?php
// db.php
$host = 'localhost';
$user = 'root'; // Default user di XAMPP
$password = ''; // Default password kosong di XAMPP
$database = 'vapor_g';

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
