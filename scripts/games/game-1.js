const questionElement = document.querySelector("#questionText");
const answerButtons = document.querySelectorAll(".responseOptionButton");
const answerKeys = document.querySelectorAll(".answerKey");
const questionNumber = document.querySelector('#questionNumber');
const maxQuestions = 10;
let questionsAnswered = 0;
let currentQuestionIndex = 0;
let currentQuestionNumber = 1;
let quesNum = 1;
let moveToNextQuestionTimeout;

const questions = [
    {
        question: "Which of the following is a natural disaster in the Philippines?",
        answers: ["Volcanic Eruption", "Earthquake", "Flood", "All of the above"],
        correctAnswer: "All of the above"
    },
    {
        question: "What should you do during a typhoon warning?",
        answers: ["Don't panic", "Prepare emergency kit", "Evacuate immediately", "Stay indoors"],
        correctAnswer: "Prepare emergency kit"
    },
    {
        question: "Which disaster is characterized by a sudden shaking of the ground?",
        answers: ["Tsunami", "Typhoon", "Flood", "Earthquake"],
        correctAnswer: "Earthquake"
    },
    {
        question: "What are you supposed to do during an earthquake?",
        answers: ["Drive during an earthquake", "Go near any live wires or debris", "Be sure to stay in a secure location until you are told it’s safe", "Return home"],
        correctAnswer: "Be sure to stay in a secure location until you are told it’s safe"
    },
    {
        question: "What are the essentials in an emergency kit?",
        answers: ["Cellphone", "TV", "Food", "Mouse"],
        correctAnswer: "Food"
    },
    {
        question: "Which of the following is a safe location to evacuate to during a tsunami warning?",
        answers: ["Beach", "Low-lying areas", "Elevated ground or designated evacuation centers", "Grocery Store"],
        correctAnswer: "Elevated ground or designated evacuation centers"
    },
    {
        question: "What causes flooding?",
        answers: ["Heavy rainfall", "Strong winds", "Tornado", "Earthquakes"],
        correctAnswer: "Heavy rainfall"
    },
    {
        question: "Which disaster is characterized by strong winds and heavy rainfall?",
        answers: ["Earthquake", "Typhoon", "Volcano eruption", "None of the above"],
        correctAnswer: "Typhoon"
    },
    {
        question: "Which government agency is responsible for issuing typhoon warnings in the Philippines?",
        answers: ["PAGASA", "DSWD", "DOH", "DENR"],
        correctAnswer: "PAGASA"
    },
    {
        question: "Which typhoon caused the highest number of damage in the Philippines?",
        answers: ["Yolanda (Haiyan)", "Ondoy (Ketsana)", "Rolly (Goni)", "Pepeng (Parma)"],
        correctAnswer: "Yolanda (Haiyan)"
    }
];

function displayQuestion() {
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    questionNumber.textContent = quesNum;
    currentQuestion.answers.forEach((answer, index) => {
        answerKeys[index].textContent = answer;
    });
}

function moveToNextQuestion() {
    questionsAnswered++;
    quesNum++;
    if (questionsAnswered < maxQuestions) {
        displayQuestion();
    } else {
        gameIsOver(true, gameOne);
    }
}

answerButtons.forEach(button => {
    button.addEventListener("click", checkAnswer);
    button.addEventListener("mouseover", () => {
        applyAnimationOnElement(button, 'animate__pulse');
    });
});

function checkAnswer(event) {
    const allButtons = document.querySelectorAll('.responseOptionButton');
    const currentQuestion = questions[currentQuestionIndex];

    allButtons.forEach(button => {
        const answerKeyElement = button.querySelector('.answerKey');
        const resultIndicator = button.querySelector('.resultIndicator');
        const answer = answerKeyElement.textContent;

        if (answer === currentQuestion.correctAnswer) {
            resultIndicator.setAttribute("name", "checkmark-outline");
            resultIndicator.style.display = 'block';
        } else {
            resultIndicator.style.display = 'none';
        }
    });

    const selectedButton = event.target.closest('.responseOptionButton');
    const selectedAnswer = selectedButton.querySelector('.answerKey').textContent;
    const selectedResultIndicator = selectedButton.querySelector('.resultIndicator');

    if (selectedAnswer === currentQuestion.correctAnswer) {
        clearTimeout(moveToNextQuestionTimeout);
        updateCoins(20);
        correctScore++;
    } else {
        selectedResultIndicator.setAttribute("name", "close-outline");
        selectedResultIndicator.style.display = 'block';

        if (userCoins - 10 >= 0) {
            clearTimeout(moveToNextQuestionTimeout);
            updateCoins(-10);
            incorrectScore++;
        }
    }

    if (!userHasNoCoins()) {
        freezeTimer();
        allButtons.forEach(button => {
            button.disabled = true;
        });
        moveToNextQuestionTimeout = setTimeout(() => {
            allButtons.forEach(button => {
                button.querySelector('.resultIndicator').style.display = 'none';
                button.disabled = false;
            });
            moveToNextQuestion();
            restartTimer();
        }, 3000);
    } else {
        gameIsOver(true, gameOne);
    }
}