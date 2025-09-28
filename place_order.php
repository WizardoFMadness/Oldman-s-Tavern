<?php
$servername = "localhost";
$username = "root"; // XAMPP default
$password = "";
$dbname = "orders_db"; // Make sure this DB exists

// Connect
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// Get POST data
$phone = $_POST['phone'];
$address = $_POST['address'];
$email = $_POST['email'];
$weight = $_POST['weight'];
$total = $_POST['total_amount'];
$ordered_items = $_POST['ordered_items'];

// Insert into DB
$stmt = $conn->prepare("INSERT INTO orders (phone, address, email, weight, total_amount, ordered_items) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssids", $phone, $address, $email, $weight, $total, $ordered_items);

if ($stmt->execute()) {
    echo "Order successfully placed!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
