document.addEventListener('DOMContentLoaded', () => {
const guest = document.getElementById('guest-account');

$(document).ready(function() {
    $('#login-form').on('submit', function(e) {
        e.preventDefault();

        var email = $('#email').val();
        var password = $('#password').val();

        $.ajax({
            url: 'login.php',
            type: 'POST',
            data: {
                email: email,
                password: password
            },
            beforeSend: function() {
                $('#login-button, #email, #password').prop('disabled', true);
            },
            success: function(response) {
                var res = JSON.parse(response);
                if (res.status === 'success') {
                    window.location.href = 'main.php';
                } else {
                    $('#input-status').text(res.message);
                    if (res.remaining_time) {
                        startCountdown(res.remaining_time);
                    } else {
                        $('#login-button, #email, #password').prop('disabled', false);
                    }
                }
            },
            error: function() {
                $('#input-status').text('An error occurred');
                $('#login-button, #email, #password').prop('disabled', false);
            }
        });
    });
});

function startCountdown(seconds) {
    var countdownElement = $('#input-status');
    var interval = setInterval(function() {
        if (seconds > 0) {
            countdownElement.text('Too many failed login attempts. Please try again in ' + seconds + ' seconds.');
            seconds--;
        } else {
            clearInterval(interval);
            countdownElement.text('');
            $('#login-button, #email, #password').prop('disabled', false);
        }
    }, 1000);
}

function guestAccount() {
    window.location.href = 'main.php';
}

guest.addEventListener('click', guestAccount);

});

function showPassword() {
    const showPassword = document.querySelector('.show-password-icon');
    password.type = password.type === "password" ? "text" : "password";
    showPassword.name = password.type === "text" ? "eye" : "eye-off";
}