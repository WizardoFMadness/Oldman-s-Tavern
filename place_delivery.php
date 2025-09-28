<?php

// Set header to plain text so the JavaScript can easily read the response
header("Content-Type: text/plain");

// Check if the request method is POST.
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // --- Database connection details ---
    // Using default credentials: user 'root', blank password (common for XAMPP/WAMP)
    $servername = "localhost"; 
    $username = "root"; 
    $password = ""; 
    $dbname = "place_delivery"; // CRITICAL: This database MUST exist!

    // Create a connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // 1. CHECK FOR CONNECTION ERROR (e.g., "Access denied" or "Unknown database")
    if ($conn->connect_error) {
        // Report a 500 status code to the browser
        http_response_code(500); 
        // Print the exact connection error for JavaScript to read.
        die("Database Connection Failed: " . $conn->connect_error);
    }

    // --- Retrieve form data ---
    // These keys match the 'name' attributes in delivery.html
    $item = $_POST['phone'];
    $address = $_POST['address'];
    $weight = $_POST['weight'];
    $price = $_POST['quantity']; 

    // --- Prepare and execute the SQL query to insert data ---
    // Ensure the table 'deliveries' exists inside the 'place_delivery' database.
    $stmt = $conn->prepare("INSERT INTO deliveries (item, address, weight, price) VALUES (?, ?, ?, ?)");
    
    // 'sssd' stands for string, string, string, double (for price)
    $stmt->bind_param("sssd", $item, $address, $weight, $price);

    // 2. CHECK FOR SQL EXECUTION ERROR (e.g., "Table 'deliveries' doesn't exist")
    if ($stmt->execute()) {
        // Success response
        echo "New delivery order successfully recorded.";
    } else {
        // Report a 500 status code for SQL failure
        http_response_code(500);
        // Print the exact SQL error for JavaScript to read.
        die("SQL Execution Error: " . $stmt->error);
    }

    $stmt->close();
    $conn->close();

} else {
    // Handle non-POST requests
    http_response_code(405); 
    echo "Invalid request method.";
}

?>
