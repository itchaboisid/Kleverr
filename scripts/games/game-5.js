const gameSection = document.getElementById("game-section");
const wordDisplay = document.getElementById("word");
const guessInput = document.getElementById("guess-input");
const guessButton = document.getElementById("guess-button");
const passButton = document.getElementById("pass-button");
const gameFiveInvalid = document.getElementById("game-five-invalid-input");
const hintButton = document.getElementById('hint-button');
const hint = document.getElementById('hint');
const words = [
    {
        definition: "The area immediately surrounding the eye of the typhoon, known for its most intense winds and rainfall.",
        word: "eyewall"
    },
    {
        definition: "A storm system characterized by a low-pressure center, spiraling winds, and heavy rain. It forms over warm tropical oceans and can develop into a typhoon, hurricane, or cyclone depending on the region.",
        word: "tropical cyclone"
    },
    {
        definition: "A rise in sea level generated by a storm's winds, causing flooding in coastal areas.",
        word: "storm surge"
    },
    {
        definition: "A tropical cyclone with maximum sustained winds of 39 to 73 miles per hour (63 to 118 kilometers per hour).",
        word: "tropical storm"
    },
    {
        definition: "A tropical cyclone with maximum sustained winds of up to 38 miles per hour (62 kilometers per hour).",
        word: "tropical depression"
    },
    {
        definition: "Refers to Typhoon Haiyan, one of the most powerful tropical cyclones ever recorded. It struck the Philippines and some other parts of Southeast Asia in November 2013.",
        word: "yolanda"
    },
    {
        definition: "The speed of the winds circulating within the typhoon, measured in knots or miles per hour.",
        word: "wind speed"
    },
    {
        definition: "An informal term used to describe an extremely powerful typhoon with sustained winds reaching Category 5.",
        word: "super typhoon"
    },
    {
        definition: "The center of a typhoon, typically characterized by calm and clear skies.",
        word: "eye"
    },
    {
        definition: "It is the government agency responsible for providing weather forecasts, warnings, and advisories in the Philippines.",
        word: "pag asa"
    },
];

let invalidTimeout;
let currentWordIndex = 0;
const MAX_QUESTIONS = 10;

function skipCurrentWord() {
    currentWordIndex++;
    if (currentWordIndex === MAX_QUESTIONS) {
        gameIsOver(true);
    } else {
        displayScrambledWord();
        guessInput.value = "";
    }
}

function scrambleWord(word) {
    let wordsArray = word.split(' ');
    let scrambledWords = wordsArray.map((w) => {
        let array = w.split('');
        let nonSpaceIndices = array.reduce((acc, char, index) => {
            if (char !== ' ') {
                acc.push(index);
            }
            return acc;
        }, []);

        for (let i = nonSpaceIndices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[nonSpaceIndices[i]], array[nonSpaceIndices[j]]] = [array[nonSpaceIndices[j]], array[nonSpaceIndices[i]]];
        }
        return array.join('');
    });

    return scrambledWords.join(' ');
}

function displayScrambledWord() {
    wordDisplay.textContent = scrambleWord(words[currentWordIndex].word);
    hint.style.display = 'none';
}

function checkGuess() {
    const guess = guessInput.value.trim().toLowerCase();
    const currentWord = words[currentWordIndex].word;
    if (guess === currentWord) {
        currentWordIndex++;
        ACTIVE_GAME_SCORE++;
        if (currentWordIndex === MAX_QUESTIONS) {
            gameIsOver(true);
        } else {
            displayScrambledWord();
            guessInput.value = "";
        }
    } else {
        clearTimeout(invalidTimeout);
        invalidInput(gameFiveInvalid);
    }
    guessInput.focus();
}

window.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        checkGuess();
    }
});

function displayHint() {
    hint.textContent = words[currentWordIndex].definition;
    hint.style.display = 'flex';
}

function skipWord() {
    skipCurrentWord();
    guessInput.value = "";
    guessInput.focus();
}

guessButton.addEventListener("click", checkGuess);
hintButton.addEventListener("click", displayHint);
passButton.addEventListener("click", skipWord);
