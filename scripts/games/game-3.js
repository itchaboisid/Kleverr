const cards = document.querySelectorAll('.card-wrapper');

cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('flip-card');
    });
});