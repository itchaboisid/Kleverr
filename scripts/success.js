const redirect = document.getElementById('redirect-countdown');
let REDIRECT_COOLDOWN = 5;

function redirectTimer() {
    const intervalId = setInterval(() => {
        redirect.textContent = REDIRECT_COOLDOWN--;
        if (REDIRECT_COOLDOWN <= 0) {
            clearInterval(intervalId);
            window.location.replace('login.php');
        }
    }, 1000);
}

document.addEventListener('DOMContentLoaded', redirectTimer);