<?php
session_start();
include("db.php");

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $default_coins = 200;
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO accounts (email, password, coins) VALUES (?, ?, ?)";
    if ($stmt = $con->prepare($query)) {
        $coins = min(max($default_coins, 0), 99999);
        $stmt->bind_param("ssi", $email, $hashed_password, $coins);
        try {
            if ($stmt->execute()) {
                header('location: success.html');
                die;
            } else {
                throw new Exception("Registration failed");
            }
        } catch (Exception $e) {
            if ($con->errno === 1062) {
                echo "<script type='text/javascript'> alert('Email already registered') </script>";
            } else {
                echo "<script type='text/javascript'> alert('Registration failed') </script>";
            }
        }
        $stmt->close();
    } else {
        echo "<script type='text/javascript'> alert('Database query failed') </script>";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/root.css">
    <link rel="stylesheet" href="styles/login.css">
    <link rel="stylesheet" href="styles/mobile.css">
    <title>Klever | Create an account</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <script src="https://kit.fontawesome.com/85711b228f.js" crossorigin="anonymous"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <link rel="manifest" href="/site.webmanifest">
</head>
<body>
    <form class="login-form" action="register.php" method="POST">
        <div class="form-logo-container">
            <img src="assets/images/logos/logo2.png" alt="Klever Login Page" onerror="this.src='assets/images/logos/logo2.png'">
        </div>
        <h1>Create an account</h1>
        <div class="input-fields">
            <input type="text" name="email" id="email" required>
            <label for="email">Email</label>
        </div>
        <div class="input-fields marginBottom5px">
            <input type="password" name="password" id="password" required>
            <label for="password">Password</label>
            <div class="show-password-container">
                <ion-icon class="show-password-icon" name="eye-off" onclick="showPassword()"></ion-icon>
            </div>
        </div>
        <div class="input-status-container">
            <span id="input-status"></span>
        </div>
        <div class="login-options centeredContainer marginTop30px">
            <button id="login-button" class="btn marginBottom5px" type="submit" value="submit">Create Account</button>
        </div>
        <div class="centeredContainer marginTop30px">
            <p><a href="login.php">Already have an account?</a></p>
        </div>
    </form>
</body>
<script src="scripts/login.js"></script>
</html>