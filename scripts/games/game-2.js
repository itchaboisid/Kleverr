const gamePlayer = document.getElementById('player');
const gameBoardContainer = document.getElementById('board-cell-grid');
const encounterPositions = new Set();
const maximumEncounters = 40;
const gameQuestionPrompt = document.getElementById('question-prompt');
const currentGameQuestion = document.getElementById('game-two-question');
const answerButtons_GAMETWO = document.querySelectorAll('.question-answers');
const rollDiceButton = document.getElementById('roll-dice-button');
let lastQuestionIndex_GAMETWO = null;
let currentQuestionIndex_GAMETWO = 0;
let playerCurrentPosition = 1;
let portalPairs = [];

const gameQuestions = [
    {
        question: "What should you include in an emergency kit?",
        answers: ["Food, water, first aid supplies", "Books, toys, electronics"],
        correctAnswer: "Food, water, first aid supplies"
    },
    {
        question: "Which of the following is a recommended action during an earthquake?",
        answers: ["Stay indoors, take cover under sturdy furniture", "Run outside as fast as possible"],
        correctAnswer: "Stay indoors, take cover under sturdy furniture"
    },
    {
        question: "What is the primary method of communication during a disaster?",
        answers: ["Cell phones", "Two-way radios"],
        correctAnswer: "Cell phones"
    },
    {
        question: "What is a key component of a family emergency plan?",
        answers: ["Meeting places", "Favorite TV shows"],
        correctAnswer: "Meeting places"
    },
    {
        question: "What is the safest location to shelter during a tornado?",
        answers: ["Basement or storm cellar", "Top floor of a tall building"],
        correctAnswer: "Basement or storm cellar"
    },
    {
        question: "What should you do if you smell gas in your home after a disaster?",
        answers: ["Evacuate immediately", "Light a match to identify the source"],
        correctAnswer: "Evacuate immediately"
    },
    {
        question: "What is the recommended action if you are caught in a flash flood?",
        answers: ["Move to higher ground immediately", "Stay in your vehicle"],
        correctAnswer: "Move to higher ground immediately"
    },
    {
        question: "What should you do if a wildfire is approaching your home?",
        answers: ["Evacuate early", "Stay and defend your property"],
        correctAnswer: "Evacuate early"
    },
    {
        question: "What is a vital item to have in your emergency kit for treating injuries?",
        answers: ["First aid manual", "Extra clothes"],
        correctAnswer: "First aid manual"
    },
    {
        question: "What is a crucial step to take before a hurricane hits?",
        answers: ["Board up windows and secure outdoor items", "Throw a hurricane party"],
        correctAnswer: "Board up windows and secure outdoor items"
    },
    {
        question: "What is the recommended way to stay informed during a disaster?",
        answers: ["Listen to local authorities and monitor news sources", "Use social media for updates"],
        correctAnswer: "Listen to local authorities and monitor news sources"
    },    
    {
        question: "What should you do if you lose power during a storm?",
        answers: ["Use flashlights instead of candles", "Use candles for illumination"],
        correctAnswer: "Use flashlights instead of candles"
    },
    {
        question: "What should you have in your emergency kit for your pets?",
        answers: ["Food, water, medications, and leashes", "Extra blankets and pillows"],
        correctAnswer: "Food, water, medications, and leashes"
    },
    {
        question: "What is a crucial document to include in your emergency kit?",
        answers: ["Insurance policies and important documents", "Family photo albums"],
        correctAnswer: "Insurance policies and important documents"
    },
    {
        question: "What is the recommended way to secure heavy furniture in your home?",
        answers: ["Secure them to the wall to prevent tipping", "Place them in high traffic areas"],
        correctAnswer: "Secure them to the wall to prevent tipping"
    },
    {
        question: "What should you do if you are driving during a hailstorm?",
        answers: ["Park under an overpass or in a garage if possible", "Continue driving at normal speed"],
        correctAnswer: "Park under an overpass or in a garage if possible"
    },
    {
        question: "What is an essential item to have in your car emergency kit during winter?",
        answers: ["Blankets, extra clothes, and a shovel", "Extra snacks and drinks"],
        correctAnswer: "Blankets, extra clothes, and a shovel"
    },
    {
        question: "What is the best way to stay informed during a disaster?",
        answers: ["Listen to local authorities and monitor news sources", "Use social media for updates"],
        correctAnswer: "Listen to local authorities and monitor news sources"
    },
    {
        question: "What should you do if you encounter a downed power line?",
        answers: ["Stay away and call emergency services immediately", "Attempt to move it yourself"],
        correctAnswer: "Stay away and call emergency services immediately"
    },
    {
        question: "What is the primary evacuation route in your area?",
        answers: ["Know the designated routes and have alternative options", "Follow the GPS navigation"],
        correctAnswer: "Know the designated routes and have alternative options"
    },
    {
        question: "If you were in a car during an earthquake, what's the first thing you would do?",
        answers: ["Pull over to a safe location", "Remain inside the car"],
        correctAnswer: "Pull over to a safe location"
    },
    {
        question: "What actions would you take if a tsunami warning was issued?",
        answers: ["Evacuate to higher ground", "Swim to the water"],
        correctAnswer: "Evacuate to higher ground"
    },
    {
        question: "What would you do first if a fire occurred at your school?",
        answers: ["Calmly evacuate the building", "Run to save your life"],
        correctAnswer: "Calmly evacuate the building"
    },
    {
        question: "How many active volcanoes are there in the Philippines?",
        answers: ["24", "68"],
        correctAnswer: "24"
    },
    {
        question: "Which Philippine city is particularly prone to flooding during heavy rains?",
        answers: ["Manila", "Cebu"],
        correctAnswer: "Manila"
    },
    {
        question: "Which disaster preparedness measure is widely promoted in the Philippines to mitigate the impact of earthquakes?",
        answers: ["Duck, cover, and hold", "Evacuation to higher ground"],
        correctAnswer: "Duck, cover, and hold"
    },
    {
        question: "What is the official disaster response agency of the Philippines?",
        answers: ["PAGASA", "NDRRMC"],
        correctAnswer: "NDRRMC"
    },
    {
        question: "Which region in the Philippines is prone to volcanic eruptions?",
        answers: ["Bicol Region", "Cordillera Administrative Region"],
        correctAnswer: "Bicol Region"
    },
    {
        question: "What is the name of the most active volcano in the Philippines?",
        answers: ["Mount Mayon", "Mount Pinatubo"],
        correctAnswer: "Mount Mayon"
    },
    {
        question: "What is the primary cause of landslides in the Philippines?",
        answers: ["Deforestation", "Heavy rainfall"],
        correctAnswer: "Deforestation"
    },
    {
        question: "What is the primary cause of flooding in Metro Manila?",
        answers: ["Poor drainage system", "Toxic Filipino's"],
        correctAnswer: "Poor drainage system"
    },
    {
        question: "In case of a storm surge, do you:",
        answers: ["Evacuate to higher ground", "Stay on the beach to observe the waves"],
        correctAnswer: "Evacuate to higher ground"
    },
    {
        question: "In case of a flash flood, do you:",
        answers: ["Seek higher ground immediately", "Stay in your vehicle and wait for rescue"],
        correctAnswer: "Seek higher ground immediately"
    },
    {
        question: "What would you do during a volcanic eruption?",
        answers: ["Follow evacuation orders and move to a safe location", "Stay in the vicinity to witness the eruption firsthand"],
        correctAnswer: "Follow evacuation orders and move to a safe location"
    }
];

function displayCurrentQuestion() {
    let newIndex;
    do {
        newIndex = Math.floor(Math.random() * gameQuestions.length);
    } while (newIndex === lastQuestionIndex_GAMETWO);

    lastQuestionIndex_GAMETWO = newIndex;
    currentQuestionIndex_GAMETWO = newIndex;
    const currentQuestion = gameQuestions[newIndex];
    currentGameQuestion.textContent = currentQuestion.question;
    currentQuestion.answers.forEach((answer, index) => {
        answerButtons_GAMETWO[index].textContent = answer;
    });
}

answerButtons_GAMETWO.forEach(button => {
    button.addEventListener("click", checkSelectedAnswer);
});

function checkSelectedAnswer(event) {
    const selectedAnswer = event.target.textContent;
    const currentQuestion = gameQuestions[currentQuestionIndex_GAMETWO];

    if (selectedAnswer === currentQuestion.correctAnswer) {
        gameQuestionPrompt.style.display = 'none';
        modifyCoins(20);
        correctScore++;
    } else {
        gameQuestionPrompt.style.display = 'none';
        if (userCoins - 10 >= 0) {
            modifyCoins(-10);
            incorrectScore++;
        }
        movePlayerBack();
        updatePlayerPosition(playerCurrentPosition);
    }
}

function movePlayerBack() {
    const stepsBack = Math.floor(Math.random() * 3) + 1;
    playerCurrentPosition = Math.max(1, playerCurrentPosition - stepsBack);
}

function initializeGameBoard() {
    gamePlayer.style.backgroundImage = 'assets/images/icons/pawn.png';
    generateEncounters();
    generatePortals();
    generateCells();
}

function generateEncounters() {
    while (encounterPositions.size < maximumEncounters) {
        const randomIndex = Math.floor(Math.random() * 99) + 1;
        if (!encounterPositions.has(randomIndex)) {
            encounterPositions.add(randomIndex);
        }
    }
}

function generatePortals() {
    const colors = ["#2E5EAA", "#690808", "#008000", "#FFFF00", "#800080", "#FFA500", "#FFC0CB", "#808080", "#00FFFF", "#5F9EA0"];
    let availablePositions = Array.from({length: 98}, (_, i) => i + 2);

    for (let i = 0; i < 10; i++) {
        let pair = {};
        for (let j = 0; j < 2; j++) {
            let index = Math.floor(Math.random() * availablePositions.length);
            let position = availablePositions.splice(index, 1)[0];

            availablePositions = availablePositions.filter(p => Math.abs(p - position) > 1);

            if (j === 0) {
                pair.position1 = position;
            } else {
                pair.position2 = position;
            }
        }
        pair.color = colors[i];
        portalPairs.push(pair);
    }
}

function generateCells() {
    for (let i = 1; i <= 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('board-cell', `cell-${i}`);
        const row = Math.ceil(i / 10);
        const col = i % 10 === 0 ? 10 : i % 10;
        cell.classList.add((row % 2 === 0 && col % 2 === 0) || (row % 2 !== 0 && col % 2 !== 0) ? 'even' : 'odd');
        gameBoardContainer.appendChild(cell);

        const portal = portalPairs.find(p => p.position1 === i || p.position2 === i);
        if (portal) {
            cell.classList.add('portal');
            cell.style.backgroundColor = portal.color;
        }

        if (encounterPositions.has(i)) {
            cell.classList.add('encounter');
        }

        if (i === 1) {
            cell.appendChild(gamePlayer);
        }

        if (i === 100) {
            cell.classList.add('finish');
        }
    }
}

function rollDice() {
    rollDiceButton.disabled = true; // Disable the button when dice is rolled
    const rollValue = Math.floor(Math.random() * 6) + 1;
    rollDiceButton.textContent = `Moved ${rollValue} steps`;

    setTimeout(() => {
        rollDiceButton.disabled = false; // Re-enable the button after 1 second
    }, 1000);

    return rollValue;
}

function movePlayerAfterDiceRoll() {
    const roll = rollDice();
    let newPosition = playerCurrentPosition + roll;
    const maxPosition = 100;

    if (newPosition >= maxPosition) {
        newPosition = maxPosition;
        updatePlayerPosition(newPosition);
        setTimeout(() => {
            gameIsOver(true, gameTwo);
            rollDiceButton.textContent = "Move";
        }, 1000);
    } else {
        updatePlayerPosition(newPosition);
        playerCurrentPosition = newPosition;

        const portal = portalPairs.find(p => p.position1 === newPosition || p.position2 === newPosition);
        if (portal) {
            setTimeout(() => {
                newPosition = newPosition === portal.position1 ? portal.position2 : portal.position1;
                updatePlayerPosition(newPosition);
                playerCurrentPosition = newPosition;
                rollDiceButton.textContent = "Move";
            }, 750);
        } else if (encounterPositions.has(newPosition)) {
            rollDiceButton.disabled = true;
            gameQuestionPrompt.style.display = 'block';
            displayCurrentQuestion();
            setTimeout(() => {
                rollDiceButton.textContent = "Move";
                rollDiceButton.disabled = false;
            }, 750);
        } else {
            setTimeout(() => {
                rollDiceButton.textContent = "Move";
            }, 750);
        }
    }
}

function updatePlayerPosition(newPosition) {
    const cellSize = gameBoardContainer.offsetWidth / 10;
    const row = Math.ceil(newPosition / 10);
    const col = newPosition % 10 === 0 ? 10 : newPosition % 10;

    const newLeft = Math.round((col - 1) * cellSize + (cellSize - gamePlayer.offsetWidth) / 2);
    const newTop = Math.round((row - 1) * cellSize + (cellSize - gamePlayer.offsetHeight) / 2);

    gamePlayer.style.left = `${newLeft}px`;
    gamePlayer.style.top = `${newTop}px`;
}

function resetPlayerPosition() {
    const firstCellLeft = 0;
    const firstCellTop = 0;

    gamePlayer.style.left = `${firstCellLeft}px`;
    gamePlayer.style.top = `${firstCellTop}px`;
    playerCurrentPosition = 1;
}