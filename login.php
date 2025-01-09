<?php
header('Content-Type: application/json');
session_start();
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

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('s', $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['username'] = $username;
        echo json_encode(['message' => 'Login successful']);
    } else {
        echo json_encode(['error' => 'Invalid username or password']);
    }
} else {
    echo json_encode(['error' => 'Invalid username or password']);
}
?>
