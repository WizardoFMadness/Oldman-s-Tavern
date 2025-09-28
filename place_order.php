<?php
$servername = "localhost";
$username = "root"; // XAMPP default
$password = "";
$dbname = "orders_db"; // Make sure this DB exists

// Connect to MySQL
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

// Get POST data from form
$phone = $_POST['phone'];
$address = $_POST['address'];
$email = $_POST['email'];
$food_id = $_POST['food_id'];
$quantity = $_POST['quantity'];
$total_amount = $_POST['total_amount'];

// Prepare and bind
$stmt = $conn->prepare("
    INSERT INTO orders (phone, address, email, food_id, quantity, total_amount)
    VALUES (?, ?, ?, ?, ?, ?)
");
$stmt->bind_param("sssiid", $phone, $address, $email, $food_id, $quantity, $total_amount);

// Execute
if ($stmt->execute()) {
    echo "Order successfully placed!";
} else {
    echo "Error: " . $stmt->error;
}

// Close connections
$stmt->close();
$conn->close();
?>
