<?php
require "conn.php";

// Obtener datos del POST
$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT password FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result) {
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();

        if ($password == $row['password']) {
            echo json_encode(["success" => true]);
        } else {
            echo json_encode(["success" => false]);
        }
    } else {
        echo json_encode(["success" => false]);
    }
} else {
    echo json_encode(["success" => false]);
}

$conn->close();