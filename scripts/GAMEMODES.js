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
        currentActiveGame = gameOne;
        startGameTimer();
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
        currentActiveGame = gameThree;
        startGameTimer();
        restartGameThree();
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
        currentActiveGame = gameFive;
        startGameTimer();
    }, 1000);
}

function restartGame(gameMode = currentActiveGame) {
    showGameOverScreen(false);
    gameMode.style.display = 'flex';
    restartTimer();
    resetGame(gameMode);
    displayQuestion();
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
    generateCards();
}

function restartGameFour() {
    selectedDisaster.style.display = 'none';
    topicValue.innerHTML = `<p></p>`;
}

function restartGameFive() {
    resetScore();
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
    const trivia = document.querySelectorAll('.trivia');
    trivia.forEach((element) => {
        element.textContent = randomTip;
    });
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
        freezeTimer();
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

const gameOneTimer = document.getElementById('gameOneTimer');
const gameThreeTimer = document.getElementById('gameThreeTimer');
const gameFiveTimer = document.getElementById('gameFiveTimer');
let timeDuration = 0;
let ingameTimer;

function startGameTimer(mode = currentActiveGame) {
    switch (mode) {
        case gameOne:
            timeDuration = 10;
            startTimer(timeDuration);
            break;
        case gameThree:
            timeDuration = 45;
            startTimer(timeDuration);
            break;
        case gameFive:
            timeDuration = 60;
            startTimer(timeDuration);
            break;
        default:
            throw new Error(`Unknown game mode: ${mode}`);
    }
}

function startTimer(duration, mode = currentActiveGame) {
    let gameTimer;
    switch (mode) {
        case gameOne:
            gameTimer = gameOneTimer;
            resetTimerAnimation();
            break;
        case gameThree:
            gameTimer = gameThreeTimer;
            break;
        case gameFive:
            gameTimer = gameFiveTimer;
            break;
        default:
            throw new Error(`Unknown game mode: ${mode}`);
    }

    gameTimer.textContent = duration;
    ingameTimer = setInterval(() => {
        duration -= 1;
        gameTimer.textContent = duration;
        if (duration <= 0) {
            clearInterval(ingameTimer);
            gameIsOver(true, mode);
        }
    }, 1000);
}

function restartTimer(mode = currentActiveGame) {
    clearInterval(ingameTimer);
    switch (mode) {
        case gameOne:
            timeDuration = 10;
            resetTimerAnimation();
            break;
        case gameThree:
            timeDuration = 45;
            break;
        case gameFive:
            timeDuration = 60;
            break;
        default:
            throw new Error(`Unknown game mode: ${mode}`);
    }
    startTimer(timeDuration, mode);
}

function freezeTimer() {
    const circle = document.querySelector('#countdownProgress circle');
    if (circle) {
        circle.style.animationPlayState = 'paused';
        clearInterval(ingameTimer);
    }
}

function resetTimerAnimation() {
    const countdownProgress = document.getElementById('countdownProgress');
    if (countdownProgress) {
        const circle = countdownProgress.querySelector('circle');
        if (circle) {
            circle.style.animationPlayState = 'running';
            const newCircle = circle.cloneNode(true);
            countdownProgress.replaceChild(newCircle, circle);
        }
    }
}