const questionElement = document.querySelector("#question-text");
const answerButtons = document.querySelectorAll(".response-option-button");
const answerKeys = document.querySelectorAll(".answer-key");
const questionNumber = document.querySelector('#question-number');
let questionsAnswered = 0;
let currentQuestionIndex = 0;
let currentQuestionNumber = 1;
let lastQuestionIndex = null;
let quesNum = 1;
let moveToNextQuestionTimeout;
let shownQuestionIndices = [];

const questions = [
    {
        question: "Which of the following is an effective measure to reduce landslide risk around your property?",
        answers: ["Installing gutters and directing water flow away from slopes", "Removing vegetation from slopes", "Building homes on steep slopes", "Ignoring minor soil movements"],
        correctAnswer: "Installing gutters and directing water flow away from slopes"
    },
    {
        question: "If you are indoors during a landslide, what is the best course of action?",
        answers: ["Stay near windows", "Move to a higher floor if possible", "Shelter under sturdy furniture", "Evacuate immediately if it is safe to do so"],
        correctAnswer: "Evacuate immediately if it is safe to do so"
    },
    {
        question: "Which of the following is a common warning sign of an impending landslide?",
        answers: ["Sudden drying of soil", "Cracks appearing on the ground or on structures", "Increased plant growth", "Stable water levels in streams"],
        correctAnswer: "Cracks appearing on the ground or on structures"
    },
    {
        question: "Which human activity can significantly increase the risk of landslides?",
        answers: ["Planting trees", "Constructing roads on steep slopes", "Building dams", "Fishing"],
        correctAnswer: "Constructing roads on steep slopes"
    },
    {
        question: "What is the primary cause of most landslides?",
        answers: ["Volcanic eruptions", "Earthquakes", "Heavy rainfall", "All of the Above"],
        correctAnswer: "Heavy rainfall"
    },
    {
        question: "What should you do if you are driving and encounter a landslide?",
        answers: ["Speed up to pass it", "Turn around and find another route", "Stop and stay in the car", "Get out of the car and run"],
        correctAnswer: "Turn around and find another route"
    },
    {
        question: "Which geological feature may signal a high risk of landslide?",
        answers: ["Flat plains", "Gentle hills", "Steep, rocky cliffs", "Low valleys"],
        correctAnswer: "Steep, rocky cliffs"
    },
    {
        question: "Which of the following is a common warning sign of an impending landslide?",
        answers: ["Clear, sunny weather", "Sudden appearance of cracks on the ground", "Increase in animal activity", "Decrease in water flow in streams"],
        correctAnswer: "Sudden appearance of cracks on the ground"
    },
    {
        question: "Which measure can help prevent landslides around your home?",
        answers: ["Installing retaining walls", "Removing all vegetation", "Creating steep slopes", "Building near water bodies"],
        correctAnswer: "Installing retaining walls"
    },
    {
        question: "Which human activity is least likely to cause landslides?",
        answers: ["Mining", "Irrigation", "Road construction on slopes", "Reforestation"],
        correctAnswer: "Reforestation"
    }
];

function displayQuestion() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * questions.length);
    } while (shownQuestionIndices.includes(newIndex));

    shownQuestionIndices.push(newIndex);

    currentQuestionIndex = newIndex;

    const currentQuestion = questions[newIndex];
    questionElement.textContent = currentQuestion.question;
    questionNumber.textContent = quesNum;
    currentQuestion.answers.forEach((answer, index) => {
        answerKeys[index].textContent = answer;
    });

    if (shownQuestionIndices.length === questions.length) {
        shownQuestionIndices = [];
    }
}

function moveToNextQuestion() {
    questionsAnswered++;
    quesNum++;
    if (questionsAnswered < MAX_QUESTIONS) {
        displayQuestion();
    } else {
        gameIsOver(true);
    }
}

answerButtons.forEach(button => {
    button.addEventListener("click", checkAnswer);
    button.addEventListener("mouseover", () => {
        applyAnimationOnElement(button, 'animate__pulse');
    });
});

function checkAnswer(event) {
    const allButtons = document.querySelectorAll('.response-option-button');
    const currentQuestion = questions[currentQuestionIndex];

    allButtons.forEach(button => {
        const answerKeyElement = button.querySelector('.answer-key');
        const resultIndicator = button.querySelector('.result-indicator');
        const answer = answerKeyElement.textContent;

        if (answer === currentQuestion.correctAnswer) {
            resultIndicator.setAttribute("name", "checkmark-outline");
            resultIndicator.style.display = 'block';
        } else {
            resultIndicator.style.display = 'none';
        }
    });

    const selectedButton = event.target.closest('.response-option-button');
    const selectedAnswer = selectedButton.querySelector('.answer-key').textContent;
    const selectedResultIndicator = selectedButton.querySelector('.result-indicator');

    if (selectedAnswer === currentQuestion.correctAnswer) {
        clearTimeout(moveToNextQuestionTimeout);
        ACTIVE_GAME_SCORE++;
    } else {
        selectedResultIndicator.setAttribute("name", "close-outline");
        selectedResultIndicator.style.display = 'block';
        clearTimeout(moveToNextQuestionTimeout);
    }

    freezeTimer();
    allButtons.forEach(button => {
        button.disabled = true;
    });
    moveToNextQuestionTimeout = setTimeout(() => {
        allButtons.forEach(button => {
            button.querySelector('.result-indicator').style.display = 'none';
            button.disabled = false;
        });
        moveToNextQuestion();
        restartTimer();
    }, 3000);
}
