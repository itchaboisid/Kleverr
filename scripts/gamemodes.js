const LoadingScreen = {
    show: (text = '') => {
        loadingScreen.style.display = 'block';
        if (text) {
            loadingText.textContent = text;
        }
    },
    hide: () => {
        loadingScreen.style.display = 'none';
    }
};

const mainMenuStartButton = document.querySelector('#menu-start-button');
const menuButtons = document.querySelectorAll('.menu-buttons');

const gameModeOptions = document.getElementById('game-mode-options-container');
const gameModeGrid = document.getElementById('game-mode-grid');
const gameModes = document.querySelectorAll('.game-modes');

const tutorialPage = document.getElementById('tutorial-page');
const tutorialText = document.getElementById('tutorial-text');
const tutorialButton = document.getElementById('tutorial-button');

function displayTutorial(mode) {
    gameModeSelection.style.display = 'none';
    tutorialPage.style.display = 'flex';
    tutorialText.textContent = displayTutorialText(mode);
    tutorialButton.onclick = () => selectGame(mode);
}

function displayTutorialText(mode) {
    switch (mode) {
        case gameOne:
            return 'Click on one of four choices to answer the question provided. You have 10 seconds to answer each question, the timer will reset after you click any of the choices. The game will end if you fail to answer within 10 seconds or you have finished the game.';
        case gameTwo:
            return 'Click on the move button below the board to move, the number of moves given are random. When you land on a text bubble, a question will be displayed with only two choices. If you choose the correct answer, you will stay on your position, otherwise you will move back 1-3 places randomly. There are portals within the board that when you are above it, will teleport you to its pair. If you land back on the portal, it will teleport you back to its pair. The game will finish after you have reached the star tile.';
        case gameThree:
            return 'Click on any of the given cards to reveal them, once you have revealed all of them, you can finish the game.';
        case gameFour:
            return 'Click on any of the four choices to answer the question, or type one of the answers from the choices then press submit. You can skip the question if you have difficulties answering, however, you will not be awarded any points for that question. You only have 60 seconds to answer all the questions.';
        case gameFive:
            return 'Type your answer in the input below the scrambled word. You can press enter to quickly submit your answer. You only have 60 seconds to answer all the questions.'
    }
}

const gameOne = document.getElementById('game-one');
const gameTwo = document.getElementById('game-two');
const gameThree = document.getElementById('game-three');
const gameFour = document.getElementById('game-four');
const gameFive = document.getElementById('game-five');
let CURRENT_ACTIVE_GAME = null;

window.addEventListener('load', () => {
    LoadingScreen.hide();
    switchThemes();
    selectStartButtonOnPageLoad();
});

function selectStartButtonOnPageLoad() {
    mainMenuStartButton.focus();
    displayTip();
    menuButtons.forEach((button) => {
        button.addEventListener('mouseover', () => {
            mainMenuStartButton.blur();
        });
    });
}

function selectGame(mode) {
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

function restartGameOne() {
    resetQuestions();
    displayQuestion();
    ACTIVE_GAME_SCORE = 0;
}

function resetQuestions() {
    currentQuestionIndex = 0;
    quesNum = 1;
    questionsAnswered = 0;
    questionElement.textContent = "";
    answerKeys.forEach(button => button.textContent = "");
}

function restartGameTwo() {
    ACTIVE_GAME_SCORE = 0;
    currentQuestionIndex_GAMETWO = 0;
    gameQuestionPrompt.style.display = 'none';
    gameBoardContainer.innerHTML = '';
    encounterPositions.clear();
    portalPairs = [];
    resetPlayerPosition();
    initializeGameBoard();
}

function restartGameThree() {
    ACTIVE_GAME_SCORE = 0;
    cardFinished.style.display = 'none';
    cards.forEach(card => {
        card.classList.remove('flip-card');
    });
}

function restartGameFour() {
    GAME_FOUR_QUESTION_INDEX = 0;
    ACTIVE_GAME_SCORE = 0;
    gameFourDisplayQuestions();
    gameFourAnswer.value = '';
    gameFourAnswer.focus();
}

function restartGameFive() {
    currentWordIndex = 0;
    displayScrambledWord();
    guessInput.value = '';
    guessInput.focus();
    ACTIVE_GAME_SCORE = 0;
}

function resetGame(gameMode = CURRENT_ACTIVE_GAME) {
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

function restartGame() {
    showGameOverScreen(false);
    CURRENT_ACTIVE_GAME.style.display = 'flex';
    resetGame(CURRENT_ACTIVE_GAME);
    restartTimer(CURRENT_ACTIVE_GAME);
    displayQuestion();
}

function startGameOne() {
    tutorialPage.style.display = 'none';
    LoadingScreen.show('Preparing Game One..');
    nav.style.display = 'none';
    gameModeSelection.style.display = 'none';
    setTimeout(() => {
        LoadingScreen.hide();
        gameOne.style.display = 'flex';
        CURRENT_ACTIVE_GAME = gameOne;
        ACTIVE_GAME_SCORE = 0;
        startTimer(10);
        displayQuestion();
    }, 1000);
}

function startGameTwo() {
    tutorialPage.style.display = 'none';
    LoadingScreen.show('Preparing Game Two..');
    nav.style.display = 'none';
    gameModeSelection.style.display = 'none';
    setTimeout(() => {
        LoadingScreen.hide();
        gameTwo.style.display = 'flex';
        restartGameTwo();
        CURRENT_ACTIVE_GAME = gameTwo;
    }, 1000);
}

function startGameThree() {
    tutorialPage.style.display = 'none';
    LoadingScreen.show('Preparing Game Three..');
    nav.style.display = 'none';
    gameModeSelection.style.display = 'none';
    setTimeout(() => {
        LoadingScreen.hide();
        gameThree.style.display = 'flex';
        CURRENT_ACTIVE_GAME = gameThree;
        restartGameThree();
    }, 1000);
}

function startGameFour() {
    tutorialPage.style.display = 'none';
    LoadingScreen.show('Preparing Game Four..');
    nav.style.display = 'none';
    gameModeSelection.style.display = 'none';
    setTimeout(() => {
        LoadingScreen.hide();
        gameFour.style.display = 'flex';
        CURRENT_ACTIVE_GAME = gameFour;
        restartGameFour();
        startTimer(60);
    }, 1000);
}

function startGameFive() {
    tutorialPage.style.display = 'none';
    LoadingScreen.show('Preparing Game Five..');
    nav.style.display = 'none';
    gameModeSelection.style.display = 'none';
    setTimeout(() => {
        LoadingScreen.hide();
        gameFive.style.display = 'flex';
        restartGameFive();
        CURRENT_ACTIVE_GAME = gameFive;
        displayScrambledWord();
        startTimer(60);
    }, 1000);
}

const gameOneTimer = document.getElementById('game-one-timer');
const gameFourTimer = document.getElementById('game-four-timer');
const gameFiveTimer = document.getElementById('game-five-timer');
let TIME_DURATION = 0;
let INGAME_TIMER;

function startGameTimer(mode = CURRENT_ACTIVE_GAME) {
    switch (mode) {
        case gameOne:
            TIME_DURATION = 10;
            startTimer(TIME_DURATION);
            break;
        case gameFour:
            TIME_DURATION = 60;
            startTimer(TIME_DURATION);
            break;
        case gameFive:
            TIME_DURATION = 60;
            startTimer(TIME_DURATION);
            break;
    }
}

function startTimer(duration, mode = CURRENT_ACTIVE_GAME) {
    let gameTimer;
    switch (mode) {
        case gameOne:
            gameTimer = gameOneTimer;
            resetTimerAnimation();
            break;
        case gameFour:
            gameTimer = gameFourTimer;
            break;
        case gameFive:
            gameTimer = gameFiveTimer;
            break;
    }

    gameTimer.textContent = duration;
    INGAME_TIMER = setInterval(() => {
        duration -= 1;
        gameTimer.textContent = duration;
        if (duration <= 0) {
            clearInterval(INGAME_TIMER);
            gameFinished();
        }
    }, 1000);
}

function restartTimer(mode = CURRENT_ACTIVE_GAME) {
    clearInterval(INGAME_TIMER);
    switch (mode) {
        case gameOne:
            TIME_DURATION = 10;
            resetTimerAnimation();
            break;
        case gameFour:
            TIME_DURATION = 60;
            break;
        case gameFive:
            TIME_DURATION = 60;
            break;
    }
    startTimer(TIME_DURATION, mode);
}

function freezeTimer() {
    const circle = document.querySelector('#countdown-progress circle');
    if (circle) {
        circle.style.animationPlayState = 'paused';
        clearInterval(INGAME_TIMER);
    }
}

function resetTimerAnimation() {
    const countdownProgress = document.getElementById('countdown-progress');
    if (countdownProgress) {
        const circle = countdownProgress.querySelector('circle');
        if (circle) {
            circle.style.animationPlayState = 'running';
            const newCircle = circle.cloneNode(true);
            countdownProgress.replaceChild(newCircle, circle);
        }
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

function invalidInput(game) {
    game.style.display = "block";
    game.textContent = "Invalid input, please try again.";

    invalidTimeout = setTimeout(() => {
        game.textContent = "";
        game.style.display = "none";
    }, 3000);
}

displayTip();
