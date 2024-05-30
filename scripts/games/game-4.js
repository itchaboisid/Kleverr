const gameFourQuestion = document.getElementById('game-four-question');
const gameFourAnswer = document.getElementById('game-four-answer');
const gameFourInvalid = document.getElementById('game-four-invalid-input');
const gameFourChoices = document.querySelectorAll('.game-four-choices');
const gameFourSubmitButton = document.getElementById('game-four-submit-button');
const skipQuestion = document.getElementById('skip-question-button');
const gameFourQuestions = [
    {
        question: "What is a flood?",
        answer: "An overflow of water that submerges land",
        choices: ["A drought", "An overflow of water that submerges land", "A snowstorm", "A windstorm"]
    },
    {
        question: "Which natural event is most likely to cause a flood?",
        answer: "Heavy rainfall",
        choices: ["Earthquake", "Heavy rainfall", "Volcano eruption", "Tornado"]
    },
    {
        question: "Which of the following is NOT a common cause of floods?",
        answer: "Clear skies",
        choices: ["Dam failure", "Heavy rainfall", "Snowmelt", "Clear skies"]
    },
    {
        question: "How can floods affect infrastructure?",
        answer: "Damaging roads and bridges",
        choices: ["Strengthening bridges", "Damaging roads and bridges", "Increasing the height of buildings", "Decreasing the risk of erosion"]
    },
    {
        question: "Which population is most vulnerable during a flood?",
        answer: "Elderly and children",
        choices: ["Adults", "Elderly and children", "Middle-aged people", "Minors"]
    },
    {
        question: "What should you do during a flood if you are indoors?",
        answer: "Move to higher ground",
        choices: ["Go to the basement", "Move to higher ground", "Open all windows", "Turn off all lights"]
    },
    {
        question: "What is one of the first things to do after a flood?",
        answer: "Check for structural damage before entering your home",
        choices: ["Return home immediately", "Drink tap water", "Check for structural damage before entering your home", "Light a fire for warmth"]
    },
    {
        question: "Why is it important to avoid floodwater?",
        answer: "It may be contaminated with sewage and chemicals",
        choices: ["It is cold", "It is usually very clean", "It may be contaminated with sewage and chemicals", "It is full of fish"]
    },
    {
        question: "If you are caught in a car during a flood, what is the safest action to take?",
        answer: "Abandon the car and move to higher ground",
        choices: ["Continue driving through the water", "Abandon the car and move to higher ground", "Honk the horn repeatedly", "Turn on the radio"]
    },
    {
        question: "What is a flash flood?",
        answer: "A sudden and severe flood, often due to heavy rain",
        choices: ["A flood that occurs slowly over time", "A sudden and severe flood, often due to heavy rain", "A flood caused by a tsunami", "A seasonal flood"]
    }
];

let GAME_FOUR_QUESTION_INDEX = 0;
let GAME_FOUR_SCORE = 0;

function restartGameFour() {
    GAME_FOUR_QUESTION_INDEX = 0;
    GAME_FOUR_SCORE = 0;
    gameFourDisplayQuestions();
    gameFourAnswer.value = '';
    gameFourAnswer.focus();
}

function gameFourDisplayQuestions() {
    const currentQuestion = gameFourQuestions[GAME_FOUR_QUESTION_INDEX];
    gameFourQuestion.innerHTML = currentQuestion.question;
    currentQuestion.choices.forEach((answer, index) => {
        gameFourChoices[index].textContent = answer;
    });
}

function gameFourNextQuestion() {
    gameFourAnswer.value = '';
    GAME_FOUR_QUESTION_INDEX++;
    if (GAME_FOUR_QUESTION_INDEX < MAX_QUESTIONS) {
        gameFourDisplayQuestions();
    }
    else {
        ACTIVE_GAME_SCORE = GAME_FOUR_SCORE;
        gameIsOver(true);
    }
}

function checkGameFourAnswer() {
    const correctAnswer = gameFourQuestions[GAME_FOUR_QUESTION_INDEX].answer;
    const userAnswer = gameFourAnswer.value.trim().toLowerCase();

    if (userAnswer === correctAnswer.toLowerCase()) {
        GAME_FOUR_SCORE++;
        gameFourNextQuestion();
    } else if (userAnswer === '') {
        clearTimeout(invalidTimeout);
        invalidInput(gameFourInvalid);
    } else {
        gameFourNextQuestion();
        return;
    }

    gameFourAnswer.focus();
}

function gameFourQuestionSkip() {
    gameFourNextQuestion();
}

function placeChoice(event) {
    const selectedButton = event.target.closest('.game-four-choices');
    gameFourAnswer.value = selectedButton.textContent;
}

gameFourChoices.forEach(button => {
    button.addEventListener('click', placeChoice);
})

gameFourSubmitButton.addEventListener('click', checkGameFourAnswer);
skipQuestion.addEventListener('click', gameFourQuestionSkip);

window.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkGameFourAnswer();
    }
});