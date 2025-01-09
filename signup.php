<?php
header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'vapor_g');

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

if (empty($username) || empty($password)) {
    echo json_encode(['error' => 'Username and password are required']);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$sql = "INSERT INTO users (username, password) VALUES (?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ss', $username, $hashedPassword);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Signup successful']);
} else {
    echo json_encode(['error' => 'Signup failed. Username may already exist.']);
}
?>
