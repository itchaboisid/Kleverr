<?php
session_start();
include("db.php");

if (!isset($_SESSION['failed_attempts'])) {
    $_SESSION['failed_attempts'] = 0;
    $_SESSION['last_attempt_time'] = 0;
}

$lockout_time = 60;

if ($_SERVER['REQUEST_METHOD'] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $response = array();

    if (time() - $_SESSION['last_attempt_time'] < $lockout_time && $_SESSION['failed_attempts'] >= 3) {
        $remaining_time = $lockout_time - (time() - $_SESSION['last_attempt_time']);
        $response['status'] = 'error';
        $response['message'] = 'Too many failed login attempts. Please try again in ' . $remaining_time . ' seconds.';
        $response['remaining_time'] = $remaining_time;
        echo json_encode($response);
        exit;
    }

    if (!empty($email) && !empty($password)) {
        $query = "SELECT * FROM accounts WHERE email = ? LIMIT 1";
        if ($stmt = $con->prepare($query)) {
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result && $result->num_rows > 0) {
                $user_data = $result->fetch_assoc();

                if (password_verify($password, $user_data['password'])) {
                    $response['status'] = 'success';
                    $_SESSION['failed_attempts'] = 0;
                    $_SESSION['last_attempt_time'] = 0;
                    $_SESSION['user_email'] = $email;
                    $_SESSION['user_id'] = $user_data['id'];
                    $_SESSION['user_coins'] = $user_data['coins'];
                } else {
                    $_SESSION['failed_attempts']++;
                    $_SESSION['last_attempt_time'] = time();
                    $response['status'] = 'error';
                    $response['message'] = 'Incorrect username or password';
                }
            } else {
                $_SESSION['failed_attempts']++;
                $_SESSION['last_attempt_time'] = time();
                $response['status'] = 'error';
                $response['message'] = 'User not found';
            }
            $stmt->close();
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Database query failed';
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Please fill in both fields';
    }

    echo json_encode($response);
    exit;
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
<title>Klever | Log in</title>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="scripts/login.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
<script src="https://kit.fontawesome.com/85711b228f.js" crossorigin="anonymous"></script>
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
<link rel="manifest" href="/site.webmanifest">
</head>
<body>
    <form id="login-form" class="login-form" action="login.php" method="POST">
        <div class="form-logo-container">
            <img src="assets/images/logos/logo2.png" alt="Klever Login Page" onerror="this.src='assets/images/logos/logo2.png'">
        </div>
        <h1>Login</h1>
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
            <button id="login-button" class="btn" type="submit" value="submit">Login</button>
            <button id="guest-account" class="btn" formnovalidate>Guest Account</button>
        </div>
        <div class="centeredContainer marginTop30px">
            <p>Don't have an account? Register <a href="register.php">here</a></p>
        </div>
    </form>
</body>
</html>