<?php
// save_review.php
include 'db.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

$productId = $data['productId'];
$username = $data['username'];
$rating = $data['rating'];
$review = $data['review'];

// Validasi input
if (empty($productId) || empty($username) || empty($rating) || empty($review)) {
    echo json_encode(["error" => "All fields are required."]);
    exit;
}

// Masukkan ulasan ke database
$sql = "INSERT INTO reviews (product_id, username, rating, review) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("isis", $productId, $username, $rating, $review);

if ($stmt->execute()) {
    echo json_encode(["message" => "Review added successfully."]);
} else {
    echo json_encode(["error" => "Error adding review."]);
}

$stmt->close();
$conn->close();
?>
