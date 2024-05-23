<?php
    session_start();
    include("db.php");

    $user_email = $_SESSION['user_email'];
    $user_id = $_SESSION['user_id'];
    $user_coins = $_SESSION['user_coins'];
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles/root.css">
    <link rel="stylesheet" href="styles/landing.css">
    <link rel="stylesheet" href="styles/nav.css">
    <link rel="stylesheet" href="styles/gamemodes.css">
    <link rel="stylesheet" href="styles/gameover.css">
    <link rel="stylesheet" href="styles/walletandtheme.css">
    <link rel="stylesheet" href="styles/shop.css">
    <link rel="stylesheet" href="styles/mobile.css">
    <title>Klever | Home</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <script src="https://kit.fontawesome.com/85711b228f.js" crossorigin="anonymous"></script>
    <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    <link rel="manifest" href="/site.webmanifest">
</head>
<body>
    <nav id="nav" class="theme-content light-mode">
        <div class="nav-buttons-wrapper">
            <div class="nav-buttons logo" onclick="mainMenu()">
                <img id="navLogo" src="assets/images/logos/logo2.png">
            </div>
            <div class="nav-buttons menu" onclick="mainMenu()">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
                <span>Menu</span>
            </div>
            <div class="nav-buttons" onclick="contentUnavailable(gameModeSelection)">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M336 256c-20.56 0-40.44-9.18-56-25.84-15.13-16.25-24.37-37.92-26-61-1.74-24.62 5.77-47.26 21.14-63.76S312 80 336 80c23.83 0 45.38 9.06 60.7 25.52 15.47 16.62 23 39.22 21.26 63.63-1.67 23.11-10.9 44.77-26 61C376.44 246.82 356.57 256 336 256zm66-88zM467.83 432H204.18a27.71 27.71 0 01-22-10.67 30.22 30.22 0 01-5.26-25.79c8.42-33.81 29.28-61.85 60.32-81.08C264.79 297.4 299.86 288 336 288c36.85 0 71 9 98.71 26.05 31.11 19.13 52 47.33 60.38 81.55a30.27 30.27 0 01-5.32 25.78A27.68 27.68 0 01467.83 432zM147 260c-35.19 0-66.13-32.72-69-72.93-1.42-20.6 5-39.65 18-53.62 12.86-13.83 31-21.45 51-21.45s38 7.66 50.93 21.57c13.1 14.08 19.5 33.09 18 53.52-2.87 40.2-33.8 72.91-68.93 72.91zM212.66 291.45c-17.59-8.6-40.42-12.9-65.65-12.9-29.46 0-58.07 7.68-80.57 21.62-25.51 15.83-42.67 38.88-49.6 66.71a27.39 27.39 0 004.79 23.36A25.32 25.32 0 0041.72 400h111a8 8 0 007.87-6.57c.11-.63.25-1.26.41-1.88 8.48-34.06 28.35-62.84 57.71-83.82a8 8 0 00-.63-13.39c-1.57-.92-3.37-1.89-5.42-2.89z"/></svg>
                <span>About</span>
            </div>
            <div class="nav-buttons" onclick="window.open('https://www.facebook.com/profile.php?id=61557039054365', '_blank')">
                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M160 164s1.44-33 33.54-59.46C212.6 88.83 235.49 84.28 256 84c18.73-.23 35.47 2.94 45.48 7.82C318.59 100.2 352 120.6 352 164c0 45.67-29.18 66.37-62.35 89.18S248 298.36 248 324" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="40"/><circle cx="248" cy="399.99" r="32"/></svg>
                <span>Help</span>
            </div>
        </div>
        <div class="theme-and-wallet">
            <div class="toggle-theme">
                <label class="switch-themes">
                    <input type="checkbox" id="theme">
                    <span class="theme-slider"></span>
                </label>
            </div>
            <div id="player-wallet">
                <div class="wallet-wrapper">
                    <button class="add-coins" onclick="buyCoins()"><ion-icon name="add-circle">+</ion-icon></button>
                    <img class="coin-icon" src="assets/images/game-1/coin.png">
                    <div class="centeredContainer coin-balance"><span class="coins"></span></div>
                </div>
            </div>
        </div>
    </nav>
    <div id="loadingScreen">
            <div id="loaderTop"></div>
            <div id="loadingText">Loading page..</div>
            <div id="loadingWrapper">
                <svg id="loadingIcon" viewBox="25 25 50 50">
                    <circle id="loadingProgress" r="20" cy="50" cx="50"></circle>
                </svg>
            </div>
    </div>
    <div id="landing-page">
        <section id="menu-tip-section">
            <div id="menu-tip-container">
                <h1>Tip</h1>
                <p class="trivia"></p>
            </div>
        </section>
        <section id="main-menu">
            <div id="menu-option">
                <div id="menu-buttons-list">
                    <div id="klever-title">
                        <img src="assets/images/logos/logo.png"  alt="Image did not load properly." title="Klever">
                    </div>
                    <button id="menu-start-button" class="menu-buttons" onclick="playKlever()">
                        <ion-icon name="chevron-forward-outline"></ion-icon>
                        Start
                    </button>
                    <button class="menu-buttons" onclick="logout()">
                        <ion-icon name="exit-outline"></ion-icon>
                        Log out
                    </button>
                </div>
            </div>
        </section>
    </div>
    <div id="game-mode-selection">
        <div id="game-mode-options-container" class="theme-content light-mode">
            <div id="game-mode-grid" class="grid">
                <div class="game-modes" onclick="selectGame(gameOne)">
                    <div class="game-info theme-content light-mode">
                        <img src="assets/images/modes/I_know_eat.png" alt="Image did not load properly">
                        <div class="game-description">
                            <p>Test your knowledge on disasters with I no eat: the ultimate quiz game!</p>
                        </div>
                    </div>
                </div>
                <div class="game-modes" onclick="selectGame(gameTwo)">
                    <div class="game-info theme-content light-mode">
                        <img src="assets/images/modes/quake.png" alt="Image did not load properly">
                        <div class="game-description">
                            <p>Plan your escape, prepare for the quake, and conquer the challenge in Quake Escape!</p>
                        </div>
                    </div>
                </div>
                <div class="game-modes" onclick="selectGame(gameThree)">
                    <div class="game-info theme-content light-mode">
                        <img src="assets/images/modes/dds.png" alt="Image did not load properly">
                        <div class="game-description">
                            <p>Race against the clock to match disaster-themed cards in this memory game</p>
                        </div>
                    </div>
                </div>
                <div class="game-modes" onclick="selectGame(gameFour)">
                    <div class="game-info theme-content light-mode">
                        <img src="assets/images/modes/roll.jpg" alt="Image did not load properly">
                        <div class="game-description">
                            <p>Spin the wheel and uncover fascinating facts about various disasters!</p>
                        </div>
                    </div>
                </div>
                <div class="game-modes" onclick="selectGame(gameFive)">
                    <div class="game-info theme-content light-mode">
                        <img src="assets/images/modes/inferno.png" alt="Image did not load properly">
                        <div class="game-description">
                            <p>Ignite your word skills in this fiery game that explores the world of disasters!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="game-one" class="theme-background light-mode light-mode-background">
        <nav>
            <button class="default-button" onclick="closeGame()">
                <ion-icon name="exit-outline"></ion-icon>
                <span>Exit</span>
            </button>
            <div id="player-wallet">
                <div class="wallet-wrapper">
                    <button class="add-coins" onclick="buyCoins()"><ion-icon name="add-circle">+</ion-icon></button>
                    <img class="coin-icon" src="assets/images/game-1/coin.png">
                    <div class="centeredContainer coin-balance"><span class="coins"></span></div>
                </div>
            </div>
        </nav>
        <div id="gameplay-area">
            <div class="question-section">
                <span id="question-number"></span>
                <p id="question-text"></p>
            </div>
            <div class="answers-container">
                <div class="countdown-timer-container">
                    <div id="countdown">
                        <div class="countdown-time" id="game-one-timer"></div>
                        <svg id="countdown-progress">
                            <circle r="18" cx="20" cy="20"></circle>
                        </svg>
                    </div>
                </div>
                <button class="response-option-button">
                    <i class="fa-solid fa-heart answer-key-icon"></i>
                    <span class="answer-key"></span>
                    <ion-icon class="result-indicator" name=""></ion-icon>
                </button>
                <button class="response-option-button">
                    <i class="fa-solid fa-square answer-key-icon"></i>
                    <span class="answer-key"></span>
                    <ion-icon class="result-indicator" name=""></ion-icon>
                </button>
                <button class="response-option-button">
                    <i class="fa-solid fa-star answer-key-icon"></i>
                    <span class="answer-key"></span>
                    <ion-icon class="result-indicator" name=""></ion-icon>
                </button>
                <button class="response-option-button">
                    <i class="fa-solid fa-diamond answer-key-icon"></i>
                    <span class="answer-key"></span>
                    <ion-icon class="result-indicator" name=""></ion-icon>
                </button>
            </div>
        </div>
    </div>
    <div id="game-two" class="theme-background light-mode light-mode-background">
        <nav>
            <button class="default-button" onclick="closeGame()">
                <ion-icon name="exit-outline"></ion-icon>
                <span>Exit</span>
            </button>
            <div class="wallet-wrapper">
                <img class="coin-icon" src="assets/images/game-1/coin.png">
                <div class="centeredContainer coin-balance"><span class="coins"></span></div>
            </div>
        </nav>
        <div id="board" class="container">
            <div id="board-cell-grid"></div>
            <div id="player"></div>
            <button id="roll-dice-button" class="default-button" onclick="movePlayerAfterDiceRoll()">Move</button>
        </div>
        <div id="question-prompt">
            <div class="question-container">
                <span id="game-two-question"></span>
            </div>
            <div class="question-choices">
                <button class="question-answers"></button>
                <button class="question-answers"></button>
            </div>
        </div>
    </div>
    <div id="game-three" class="theme-background light-mode light-mode-background">
        <nav>
            <button class="default-button" onclick="closeGame()">
                <ion-icon name="exit-outline"></ion-icon>
                <span>Exit</span>
            </button>
        </nav>
        <div id="game-three-wrapper" class="theme-background light-mode">
            <div class="game-three-board">
                <div class="movesmade theme-content">
                    <div id="moves-count"></div>
                    <div>Time left: <span id="game-three-timer" class="countdownTime"></span></div>
                </div>
                <div class="game-container"></div>
                <div class="centeredContainer marginTop30px">
                    <div class="wallet-wrapper">
                        <img class="coin-icon" src="assets/images/game-1/coin.png">
                        <div class="centeredContainer coin-balance"><span class="coins"></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div id="game-four" class="theme-background light-mode light-mode-background">
        <nav>
            <button class="default-button" onclick="closeGame()">
                <ion-icon name="exit-outline"></ion-icon>
                <span>Exit</span>
            </button>
        </nav>
        <div class="spinner-wrapper">
            <div class="spinner-container">
                <canvas id="wheel"></canvas>
                <button id="spin-button" onclick="spinWheel()">Spin</button>
                <img src="assets/images/icons/arrow.png" alt="spinner-arrow" />
            </div>
        </div>
        <div id="selected-disaster-wrapper">
            <div class="centeredContainer">
                <img id="disaster-image" src="#" alt="Image did not load properly">
            </div>
            <div id="topic-value">
                <p></p>
            </div>
            <div class="centeredContainer open-disaster-guide">
                <button class="default-button" onclick="viewGuide()">View</button>
                <button class="default-button" onclick="closeGuide()">Close</button>
            </div>
        </div>
    </div>
    <div id="game-five" class="theme-background light-mode light-mode-background">
        <nav>
            <button class="default-button" onclick="closeGame()">
                <ion-icon name="exit-outline"></ion-icon>
                <span>Exit</span>
            </button>
            <div id="player-wallet">
                <div class="wallet-wrapper">
                    <button class="add-coins" onclick="buyCoins()"><ion-icon name="add-circle">+</ion-icon></button>
                    <img class="coin-icon" src="assets/images/game-1/coin.png">
                    <div class="centeredContainer coin-balance"><span class="coins"></span></div>
                </div>
            </div>
        </nav>
        <div class="game-five-container">
            <h1>Word Scramble</h1>
            <div id="word"></div>
            <div class="input-fields">
                <input type="text" id="guess-input" required>
                <label>Guess</label>
            </div>
            <div id="invalid-guess-wrapper">
                <span id="invalid-guess-input"></span>
            </div>
            <div id="player-choices">
                <button class="default-button" id="guess-button">Guess</button>
                <button class="default-button" id="pass-button">Pass</button>
            </div>
            <div id="counter">Words Solved: <span id="word-count">0</span></div>
            <div>Time left: <span id="game-five-timer" class="countdown-time"></span></div>
        </div>
    </div>
    <div id="game-over-screen" class="theme-background light-mode light-mode-background">
        <div class="game-over-wrapper">
            <div id="game-over-content-wrapper" class="">
                <img id="celebration-icon" src="assets/images/icons/celebration.png" alt="Image failed to load">
                <h1 id="game-over-header">Game has ended!</h1>
                <div id="game-score">
                    <div id="correct-answers" class="game-score-display">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="64" d="M352 176L217.6 336 160 272"/><rect x="64" y="64" width="384" height="384" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="64"/></svg>
                        Correct:
                        <span id="correct-score"></span>
                    </div>
                    <div id="incorrect-answers" class="game-score-display">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="64" d="M368 368L144 144M368 144L144 368"/></svg>
                        Incorrect:
                        <span id="incorrect-score"></span>
                    </div>
                </div>
            </div>
        </div>
        <div id="game-over-buttons-container">
            <button onclick="closeGame()" class="game-end-button ">Back</button>
            <button onclick="restartGame()" class="game-end-button ">Play Again</button>
            <button onclick="logout()" class="game-end-button ">Log Out</button>
        </div>
        <div class="game-over-wrapper">
            <div id="game-over-facts-container">
                <img id="trivia-icon" src="assets/images/icons/lightbulb.png" alt="Image failed to load">
                <div id="game-over-facts-content">
                    <p class="trivia"></p>
                </div>
            </div>
        </div>
    </div>
    <div id="payment-page">
        <div id="payment-modal">
            <div id="payment-tab">
                <div id="payment-tab-container">
                    <div id="prev-tab" class="payment-tabs" onclick="previousShopTab()">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="M244 400L100 256l144-144M120 256h292"/></svg>
                    </div>
                    <div id="store-tab" class="payment-tabs active-tab">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M448 448V240M64 240v208M382.47 48H129.53c-21.79 0-41.47 12-49.93 30.46L36.3 173c-14.58 31.81 9.63 67.85 47.19 69h2c31.4 0 56.85-25.18 56.85-52.23 0 27 25.46 52.23 56.86 52.23s56.8-23.38 56.8-52.23c0 27 25.45 52.23 56.85 52.23s56.86-23.38 56.86-52.23c0 28.85 25.45 52.23 56.85 52.23h1.95c37.56-1.17 61.77-37.21 47.19-69l-43.3-94.54C423.94 60 404.26 48 382.47 48zM32 464h448M136 288h80a24 24 0 0124 24v88h0-128 0v-88a24 24 0 0124-24zM288 464V312a24 24 0 0124-24h64a24 24 0 0124 24v152"/></svg>
                        <span>Store</span>
                    </div>
                    <div id="pay-tab" class="payment-tabs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><rect x="48" y="96" width="416" height="320" rx="56" ry="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="60" d="M48 192h416M128 300h48v20h-48z"/></svg>
                        <span>Payment</span>
                    </div>
                    <div id="complete-tab" class="payment-tabs">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M53.12 199.94l400-151.39a8 8 0 0110.33 10.33l-151.39 400a8 8 0 01-15-.34l-67.4-166.09a16 16 0 00-10.11-10.11L53.46 215a8 8 0 01-.34-15.06zM460 52L227 285" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                        <span>Thanks</span>
                    </div>
                </div>
                <div id="close-button-wrapper">
                    <button onclick="closeShop()" class="payment-tabs close-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M368 368L144 144M368 144L144 368"/></svg>
                        <span>Exit</span>
                    </button>
                </div>
            </div>
            <div id="payment-container">
                <div id="payment-panel">
                    <div id="shop-panel">
                        <div id="payment-logo">
                            <img src="assets/images/logos/graylogo.png" alt="Image did not load properly.">
                        </div>
                        <span id="payment-state">Select a pack to continue.</span>
                        <div id="payment-status">
                            <span id="selected-product-header">Selected Pack</span>
                            <div id="selected-product">
                                <div id="bundle-content" class="bundle-content">
                                    <div class="image-wrapper">
                                        <img id="bundle-img" src="assets/images/game-1/coin.png" alt="Image did not load">
                                    </div>
                                    <span id="bundle-info" class="bundle-info"></span>
                                </div>
                            </div>
                            <span id="bundle-price"></span>
                        </div>
                        <div id="proceed-button-panel">
                            <button id="proceed-button" class="checkout-button" onclick="checkout()">
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><circle cx="176" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="400" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M48 80h64l48 272h256"/><path d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                                <span>Checkout</span>
                            </button>
                        </div>
                    </div>
                    <div id="shop-pay">
                        <div id="payment-inputs">
                            <h1 id="payment-header">Direct Payment</h1>
                            <div class="input-fields">
                                <input id="admin-key" type="text" required>
                                <label>Admin Key</label>
                            </div>
                            <div class="input-fields">
                                <input id="credit-key" class="marginBottom5px" type="text" required>
                                <label>Credit Key</label>
                            </div>
                            <button class="checkout-button marginTop30px" onclick="confirmPurchase()">
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><circle cx="176" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><circle cx="400" cy="416" r="16" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M48 80h64l48 272h256"/><path d="M160 288h249.44a8 8 0 007.85-6.43l28.8-144a8 8 0 00-7.85-9.57H128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/></svg>
                                <span>Confirm</span>
                            </button>
                        </div>
                    </div>
                    <div id="shop-thanks">
                        <div class="centeredContainer">
                            <img src="assets/images/icons/success.png" alt="Image did not load.">
                        </div>
                        <span>Thank you for your purchase!</span>
                    </div>
                </div>
                <div id="coins-bundle-grid">
                    <button class="coins-bundle">
                        <div class="bundle-content">
                            <span class="bundle-price">10 PHP</span>
                            <div class="image-wrapper">
                                <img src="assets/images/game-1/coin.png" alt="Image did not load">
                            </div>
                            <span class="bundle-info">300 Coins</span>
                        </div>
                    </button>
                    <button class="coins-bundle">
                        <div class="bundle-content">
                            <span class="bundle-price">20 PHP</span>
                            <div class="image-wrapper">
                                <img src="assets/images/game-1/coin.png" alt="Image did not load">
                            </div>
                            <span class="bundle-info">600 Coins</span>
                        </div>
                    </button>
                    <button class="coins-bundle">
                        <div class="bundle-content">
                            <span class="bundle-price">30 PHP</span>
                            <div class="image-wrapper">
                                <img src="assets/images/game-1/coin.png" alt="Image did not load">
                            </div>
                            <span class="bundle-info">900 Coins</span>
                        </div>
                    </button>
                    <button class="coins-bundle">
                        <div class="bundle-content">
                            <span class="bundle-price">40 PHP</span>
                            <div class="image-wrapper">
                                <img src="assets/images/game-1/coin.png" alt="Image did not load">
                            </div>
                            <span class="bundle-info">1200 Coins</span>
                        </div>
                    </button>
                    <button class="coins-bundle">
                        <div class="bundle-content">
                            <span class="bundle-price">50 PHP</span>
                            <div class="image-wrapper">
                                <img src="assets/images/game-1/coin.png" alt="Image did not load">
                            </div>
                            <span class="bundle-info">1500 Coins</span>
                        </div>
                    </button>
                    <button class="coins-bundle">
                        <div class="bundle-content">
                            <span class="bundle-price">60 PHP</span>
                            <div class="image-wrapper">
                                <img src="assets/images/game-1/coin.png" alt="Image did not load">
                            </div>
                            <span class="bundle-info">1800 Coins</span>
                        </div>
                    </button>
                </div>
                <div id="other-payment-methods">
                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><rect x="48" y="96" width="416" height="320" rx="56" ry="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"/><path fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="60" d="M48 192h416M128 300h48v20h-48z"/></svg>
                    <h1>Other Payment Methods</h1>
                </div>
            </div>
        </div>
    </div>
    <div id="content-unavailable-page">
        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M436.67 184.11a27.17 27.17 0 01-38.3 0l-22.48-22.49a27.15 27.15 0 010-38.29l50.89-50.89a.85.85 0 00-.26-1.38C393.68 57 351.09 64.15 324.05 91c-25.88 25.69-27.35 64.27-17.87 98a27 27 0 01-7.67 27.14l-173 160.76a40.76 40.76 0 1057.57 57.54l162.15-173.3a27 27 0 0126.77-7.7c33.46 8.94 71.49 7.26 97.07-17.94 27.49-27.08 33.42-74.94 20.1-102.33a.85.85 0 00-1.36-.22z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="16"/><path d="M224 284c-17.48-17-25.49-24.91-31-30.29a18.24 18.24 0 01-3.33-21.35 20.76 20.76 0 013.5-4.62l15.68-15.29a18.66 18.66 0 015.63-3.87 18.11 18.11 0 0120 3.62c5.45 5.29 15.43 15 33.41 32.52M317.07 291.3c40.95 38.1 90.62 83.27 110 99.41a13.46 13.46 0 01.94 19.92L394.63 444a14 14 0 01-20.29-.76c-16.53-19.18-61.09-67.11-99.27-107" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M17.34 193.5l29.41-28.74a4.71 4.71 0 013.41-1.35 4.85 4.85 0 013.41 1.35h0a9.86 9.86 0 008.19 2.77c3.83-.42 7.92-1.6 10.57-4.12 6-5.8-.94-17.23 4.34-24.54a207 207 0 0119.78-22.6c6-5.88 29.84-28.32 69.9-44.45A107.31 107.31 0 01206.67 64c22.59 0 40 10 46.26 15.67a89.54 89.54 0 0110.28 11.64 78.92 78.92 0 00-9.21-2.77 68.82 68.82 0 00-20-1.26c-13.33 1.09-29.41 7.26-38 14-13.9 11-19.87 25.72-20.81 44.71-.68 14.12 2.72 22.1 36.1 55.49a6.6 6.6 0 01-.34 9.16l-18.22 18a6.88 6.88 0 01-9.54.09c-21.94-21.94-36.65-33.09-45-38.16s-15.07-6.5-18.3-6.85a30.85 30.85 0 00-18.27 3.87 11.39 11.39 0 00-2.64 2 14.14 14.14 0 00.42 20.08l1.71 1.6a4.63 4.63 0 010 6.64L71.73 246.6a4.71 4.71 0 01-3.41 1.4 4.86 4.86 0 01-3.41-1.35l-47.57-46.43a4.88 4.88 0 010-6.72z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
        <span>Sorry, this content is not yet available.</span>
        <button onclick="mainMenu()">Go back</button>
    </div>
</body>
<script>
    const landingPage = document.getElementById('landing-page');
    const gameModeSelection = document.getElementById('game-mode-selection');
    const contentUnavailablePage = document.getElementById('content-unavailable-page');
    const nav = document.getElementById('nav');
    const userCoins = document.querySelectorAll('.coins');
    let USER_COINS = <?php echo $user_coins; ?>;

    userCoins.forEach((element) => {
        element.textContent = USER_COINS;
    });

    function playKlever() {
        landingPage.style.display = 'none';
        gameModeSelection.style.display = 'block';
        nav.style.display = 'flex';
    }

    function modifyCoins(amount) {
        USER_COINS += amount;
        userCoins.forEach((element) => {
            element.textContent = USER_COINS;
        });
        saveCoins(USER_COINS);
    }

    function logout() {
        saveCoins(USER_COINS);
        window.location.href = 'login.php';
    }

    function contentUnavailable(currentPage) {
        nav.style.display = 'none';
        currentPage.style.display = 'none';
        contentUnavailablePage.style.display = 'flex';
    }

    function saveCoins(coins) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'update_coins.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('coins=' + coins + '&user_id=' + <?php echo $user_id;?>);
    }

    function mainMenu() {
        gameModeSelection.style.display = 'none';
        landingPage.style.display = 'flex';
        nav.style.display = 'none';
    }
</script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/chartjs-plugin-datalabels/2.1.0/chartjs-plugin-datalabels.min.js"></script>
<script src="scripts/animations.js"></script>
<script src="scripts/gamemodes.js"></script>
<script src="scripts/games/game-1.js"></script>
<script src="scripts/games/game-2.js"></script>
<script src="scripts/games/game-3.js"></script>
<script src="scripts/games/game-4.js"></script>
<script src="scripts/games/game-5.js"></script>
<script src="scripts/shop.js"></script>
<script src="scripts/theme.js"></script>
</html>
