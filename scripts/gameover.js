const gameOverScreen = document.getElementById('game-over-screen');
const gameResult = document.getElementById('game-result');
const gameResultSubheader = document.getElementById('game-result-subheader');
const gameMainMenu = document.getElementById('back-to-main-menu');
const playAgain = document.getElementById('play-again');
const nextGame = document.getElementById('next-game');
const guideImage = document.getElementById('related-guide-image');
const guideViewer = document.getElementById('related-guide-viewer');
const gameOverTip = document.getElementById('game-over-tip');
const exitGame = document.getElementById('exit-game');
let ACTIVE_GAME_SCORE = 0;

gameMainMenu.addEventListener('click', closeGame);
exitGame.addEventListener('click', mainMenu);
playAgain.addEventListener('click', restartGame);
guideViewer.addEventListener('click', viewGuide);

function closeGame(mode = CURRENT_ACTIVE_GAME) {
    if (mode === null || mode === undefined) {
        gameModeSelection.style.display = 'block';
        nav.style.display = 'flex';
    }
    else {
        CURRENT_ACTIVE_GAME.style.display = 'none';
        gameModeSelection.style.display = 'block';
        nav.style.display = 'flex';
        showGameOverScreen(false);
        resetGame(CURRENT_ACTIVE_GAME);
        freezeTimer();
        CURRENT_ACTIVE_GAME = undefined;
        ACTIVE_GAME_SCORE = 0;
    }
}

function gameIsOver(state) {
    if (state) {
        showGameOverScreen(true);
    }
    else {
        showGameOverScreen(false);
    }
}

function showGameOverScreen(state) {
    if (state) {
        gameFinished();
    }
    else {
        gameOverScreen.style.display = 'none';
    }
}

function gameFinished(mode = CURRENT_ACTIVE_GAME, score = ACTIVE_GAME_SCORE) {
    mode.style.display = 'none';
    gameOverScreen.style.display = 'flex';
    gameResult.textContent = `${score} points!`;
    gameResultSubheader.textContent = checkScore();
    infographics();
    freezeTimer();
    displayTip();
}

function checkScore(score = ACTIVE_GAME_SCORE) {
    if (score >= 0 && score <= 4) {
        return 'Nice try!';
    }
    else if (score >= 5 && score <= 7) {
        return 'Great job!';
    }
    else if (score >= 8 && score <= 10) {
        return 'Excellent!';
    }
    return;
}

function infographics(mode = CURRENT_ACTIVE_GAME) {
    switch (mode) {
        case gameOne:
            guideImage.src = 'assets/images/infographic/landslide.png';
            break;
        case gameTwo:
            guideImage.src = 'assets/images/infographic/earthquake.png';
            break;
        case gameThree:
            guideImage.src = 'assets/images/infographic/volcano.png';
            break;
        case gameFour:
            guideImage.src = 'assets/images/infographic/floods.png';
            break;
        case gameFive:
            guideImage.src = 'assets/images/infographic/typhoon.png';
            break;
        default:
    }
}

function viewGuide() {
    window.open(guideImage.src, '_blank');
}
