<?php
session_start();
include("db.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    if (!isset($_SESSION['user_email']) || !isset($_SESSION['user_id'])) {
        echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
        exit;
    }

    $user_email = $_SESSION['user_email'];
    $user_id = $_SESSION['user_id'];

    if (isset($_POST['coins'])) {
        $user_coins = $_POST['coins'];

        $query = "UPDATE accounts SET coins = ? WHERE id = ?";
        if ($stmt = $con->prepare($query)) {
            $stmt->bind_param("ii", $user_coins, $user_id);
            if ($stmt->execute()) {
                $_SESSION['user_coins'] = $user_coins;
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Failed to update coins']);
            }
            $stmt->close();
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Database query failed']);
        }
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Coins not provided']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Invalid request']);
}