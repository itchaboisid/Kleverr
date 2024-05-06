// ! Game Modes
const modePage = document.querySelector('#gameModeSelection');
const modeGrid = document.querySelector('#gameModeGrid');
const modeSelection = document.querySelectorAll('.gameModes');

// ! Game Over Screen
const gameOverScreen = document.querySelector('#gameOverScreen');
const gameOverContentWrapper = document.querySelector('#gameOverContentWrapper');
const celebrationIcon = document.querySelector('#celebrationIcon');
const gameOverFactsContainer = document.querySelector('#gameOverFactsContainer');
const gameEndButton = document.querySelectorAll('.gameEndButton');

// ! Game mode 1
const gameOne = document.querySelector('#gameOne');
let timerDuration = 15;
let countdownInterval;

// ! Timer
const timer = document.querySelectorAll('.countdownTime');
const timerBorder = document.querySelector('.countdownTimerVisual');
let timerElement = document.querySelector('.countdownTimerVisual');
let timerMask = document.querySelector('.countdownTimerProgress');

let correctScoreAmount = document.getElementById('correctScore');
let incorrectScoreAmount = document.getElementById('incorrectScore');
let correctScore = 0;
let incorrectScore = 0;

function gameModeSelection() {
    nav.style.display = 'flex';
    applyAnimationOnElement(nav, 'animate__fadeInDownBig');
    modePage.style.display = 'block';
    applyAnimationOnElement(modeGrid, 'animate__fadeInUpBig');
}

function gameOverButtonsAnimation() {
    gameEndButton.forEach((element, index) => {
        element.style.visibility = 'visible';
        element.style.animationDelay = `${index * 250}ms`;
        element.classList.add('animate__animated', 'animate__bounceIn');
    });
}

function selectGameMode(mode) {
    switch (mode) {
        case gameOne:
            return startGameOne();
        case gameTwo:
            return startGameTwo();
        case gameThree:
            return startGameThree();
        case gameFour:
            return startGameFour();
        case gameFive:
            return startGameFive();
        default:
            throw new Error(`Invalid game mode selected: ${mode}`);
    }
}

function startGameOne() {
    LoadingScreen.show('Preparing Game One..');
    nav.style.display = 'none';
    modePage.style.display = 'none';
    setTimeout(() => {
        LoadingScreen.hide();
        gameOne.style.display = 'flex';
        restartGameOne();
        timerControl('start', gameOne);
        currentActiveGame = gameOne;
    }, 1000);
}

function startGameTwo() {
    LoadingScreen.show('Preparing Game Two..');
    nav.style.display = 'none';
    modePage.style.display = 'none';
    setTimeout(() => {
        LoadingScreen.hide();
        gameTwo.style.display = 'flex';
        restartGameTwo();
        currentActiveGame = gameTwo;
    }, 1000);
}

function startGameThree() {
    LoadingScreen.show('Preparing Game Three..');
    nav.style.display = 'none';
    modePage.style.display = 'none';
    setTimeout(() => {
        LoadingScreen.hide();
        gameThree.style.display = 'block';
        restartGameThree();
        timerControl('start', gameThree)
        currentActiveGame = gameThree;
    }, 1000);
}

function startGameFour() {
    LoadingScreen.show('Preparing Game Four..');
    nav.style.display = 'none';
    modePage.style.display = 'none';
    setTimeout(() => {
        LoadingScreen.hide();
        gameFour.style.display = 'block';
        document.body.style.backgroundImage = 'none';
        document.body.style.backgroundColor = 'var(--white)';
        restartGameFour();
        currentActiveGame = gameFour;
    }, 1000);
}

function startGameFive() {
    LoadingScreen.show('Preparing Game Five..');
    nav.style.display = 'none';
    modePage.style.display = 'none';
    setTimeout(() => {
        LoadingScreen.hide();
        gameFive.style.display = 'flex';
        restartGameFive();
        timerControl('start', gameFive);
        currentActiveGame = gameFive;
    }, 1000);
}

function restartGame(gameMode = currentActiveGame) {
    showGameOverScreen(false);
    gameMode.style.display = 'flex';
    clearInterval(countdownInterval);
    resetGame(gameMode);
    displayQuestion();
    timerControl('start', gameMode);
    background.style.backgroundColor = '#e2eefec5';
}

function displayScores() {
    correctScoreAmount.textContent = correctScore;
    incorrectScoreAmount.textContent = incorrectScore;
}

function resetScore() {
    incorrectScore = 0;
    correctScore = 0;
}

function resetQuestions() {
    currentQuestionIndex = 0;
    quesNum = 1;
    questionsAnswered = 0;
    questionElement.textContent = "";
    answerKeys.forEach(button => button.textContent = "");
}

function restartGameOne() {
    if (userCoins <= 0) {
        userCoins = 0;
    }
    resetScore();
    resetQuestions();
    timerControl('reset');
    displayQuestion();
}

function restartGameTwo() {
    resetScore();
    currentQuestionIndex_GAMETWO = 0;
    gameQuestionPrompt.style.display = 'none';
    gameBoardContainer.innerHTML = '';
    encounterPositions.clear();
    portalPairs = [];
    resetPlayerPosition();
    initializeGameBoard();
}

function restartGameThree() {
    matchCount = 0;
    movesCount = 0;
    moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
    timerControl('reset');
    generateCards();
}

function restartGameFour() {
    selectedDisaster.style.display = 'none';
    topicValue.innerHTML = `<p></p>`;
}

function restartGameFive() {
    resetScore();
    timerControl('reset');
    resetGameFive();
}

function gameIsOver(state, mode) {
    showGameOverScreen(state, mode);
}

function showGameOverScreen(state, mode) {
    try {
        if (state) {
            mode.style.display = 'none';
            gameOverScreen.style.display = 'block';
            displayTip();
            displayScores();
            gameOverAnimations();
            timerControl('freeze', mode);
        } else {
            gameOverScreen.style.display = 'none';
        }
    } catch (e) {
        console.log(e.message);
    }
}

function displayTip() {
    const tips = [
        "Create a disaster preparedness plan for you and your family. This should include evacuation routes, emergency contacts, and a designated meeting place.",
        "Keep yourself updated on potential disasters in your area through local news, weather alerts, and community notifications.",
        "Have an emergency kit ready with essentials such as water, non-perishable food, flashlight, batteries, first aid supplies, and important documents.",
        "Know when and how to evacuate if necessary. Plan multiple routes in case some roads are blocked or congested.",
        "Establish a communication plan with family and friends, including an out-of-town contact person.",
        "During a disaster, it's important to stay calm and think clearly. Panic can lead to poor decision-making.",
        "If it's safe to do so, help others in need, especially vulnerable populations like the elderly or disabled.",
        "Listen to and follow instructions from local authorities and emergency responders.",
        "If indoors during an earthquake, drop, cover, and hold on. If outside, move to an open area away from buildings, trees, and utility wires.",
        "Be cautious of potential hazards after the disaster, such as downed power lines, weakened structures, and contaminated water.",
        "Don't hesitate to seek support from mental health professionals or support groups if you're struggling emotionally after a disaster."
    ];

    const randomIndex = Math.floor(Math.random() * tips.length);
    const randomTip = tips[randomIndex];

    document.getElementById('trivia').textContent = randomTip;
}

function gameOverAnimations() {
    applyAnimationOnElement(gameOverContentWrapper, 'animate__fadeInDownBig');
    applyAnimationOnElement(gameOverFactsContainer, 'animate__fadeInUpBig');
    gameOverButtonsAnimation();
}

function closeGame() {
    if (currentActiveGame) {
        currentActiveGame.style.display = 'none';
        resetGame(currentActiveGame);
        timerControl('freeze');
        showGameOverScreen(false);
        gameModeSelection();
        currentActiveGame = undefined;
    }
}

function resetGame(gameMode = currentActiveGame) {
    if (!gameMode) return;
    switch (gameMode) {
        case gameOne:
            restartGameOne();
            break;
        case gameTwo:
            restartGameTwo();
            break;
        case gameThree:
            restartGameThree();
            break;
        case gameFour:
            restartGameFour();
            break;
        case gameFive:
            restartGameFive();
            break;
        default:
            return console.log(`Unknown game ${gameMode}`);
    }
}

function timerControl(action, mode = currentActiveGame) {
    timer.forEach(timer => {
        timer.textContent = "15";
    });
    switch (action) {
        case 'reset':
            resetTimer();
            break;
        case 'freeze':
            freezeTimer();
            break;
        case 'start':
            startTimer(mode);
            break;
        default:
            throw new Error(`Unknown action or mode: ${action}, ${mode}`);
    }
}

function resetTimer() {
    timerDuration = 15;
    resetTimerAnimation();
}

function freezeTimer() {
    clearInterval(countdownInterval);
    timer.forEach(timer => {
        timer.textContent = timerDuration;
    });
}

function startTimer(mode) {
    if (mode === gameTwo) {
        return;
    }

    countdownInterval = setInterval(() => {
        timerDuration--;
        timer.forEach(timer => {
            timer.textContent = timerDuration;
            if (timerDuration === 5) {
                applyAnimationOnElement(timer, 'animate__flash');
            }
        });
        if (timerDuration <= 0) {
            clearInterval(countdownInterval);
            gameIsOver(true, mode);
        }
    }, 1000);
}

function resetTimerAnimation() {
    document.querySelectorAll('.countdownTimerVisual').forEach(timerElement => {
        timerElement.style.animation = 'none';
    });
    document.querySelectorAll('.countdownTimerProgress').forEach(timerMask => {
        timerMask.style.animation = 'none';
    });

    void document.querySelector('.countdownTimerVisual').offsetWidth;
    void document.querySelector('.countdownTimerProgress').offsetWidth;

    requestAnimationFrame(() => {
        document.querySelectorAll('.countdownTimerVisual').forEach(timerElement => {
            timerElement.style.animation = 'time 15s steps(1000, start) infinite';
        });
        document.querySelectorAll('.countdownTimerProgress').forEach(timerMask => {
            timerMask.style.animation = 'mask 15s steps(1000, start) infinite';
        });
    });
}
