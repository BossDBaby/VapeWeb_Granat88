<?php
header('Content-Type: application/json');
$conn = new mysqli('localhost', 'root', '', 'vapor_g');

if ($conn->connect_error) {
    die(json_encode(['error' => 'Database connection failed']));
}

$productId = $_GET['product_id'] ?? null;

if (!$productId) {
    echo json_encode(['error' => 'Product ID is required']);
    exit;
}

$sql = "SELECT username, rating, review FROM reviews WHERE product_id = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param('i', $productId);
    $stmt->execute();
    $result = $stmt->get_result();
    $reviews = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['reviews' => $reviews]);
} else {
    echo json_encode(['error' => 'Invalid query']);
}
?>
