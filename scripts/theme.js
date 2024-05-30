function switchThemes() {
    gameModeOptions.style.backgroundImage = 'var(--orange-gradient)';
    const themeSwitcher = document.querySelector('#theme');
    themeSwitcher.checked = false;
    const themedContents = document.querySelectorAll('.theme-content');
    const themedBackgrounds = document.querySelectorAll('.theme-background');

    themeSwitcher.addEventListener('change', function() {
        themedContents.forEach((themedContent) => {
            themedBackgrounds.forEach((themedBackground) => {
                if (this.checked) {
                    themedContent.classList.add('dark-mode');
                    themedContent.classList.remove('light-mode');
                    themedBackground.classList.add('dark-mode-background');
                    themedBackground.classList.remove('light-mode-background');
                    gameModeOptions.style.backgroundImage = 'var(--blue-gradient)';
                } else {
                    themedContent.classList.add('light-mode');
                    themedContent.classList.remove('dark-mode');
                    themedBackground.classList.add('light-mode-background');
                    themedBackground.classList.remove('dark-mode-background');
                    gameModeOptions.style.backgroundImage = 'var(--orange-gradient)';
                }
            });
        });
    });
}