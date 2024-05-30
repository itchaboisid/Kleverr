const cards = document.querySelectorAll('.card-wrapper');
const cardFinished = document.getElementById('game-three-finish');

cardFinished.addEventListener('click', gameThreeEnd);

cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flip-card');
      ACTIVE_GAME_SCORE++;
      areAllCardsFlipped();
    });
});

function areAllCardsFlipped() {
    const cards = document.querySelectorAll('.card-wrapper');
    
    for (let card of cards) {
        if (!card.classList.contains('flip-card')) {
            return false;
        }
    }
    
    cardFinished.style.display = 'flex';
    return true;
}

function gameThreeEnd() {
    if (areAllCardsFlipped()) {
        gameIsOver(true);
    }
}
