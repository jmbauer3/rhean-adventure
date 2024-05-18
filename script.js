document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const endScreen = document.getElementById('end-screen');
    const gameMusic = document.getElementById('game-music');
    const fragment = document.getElementById('fragment');
    const centerText = document.getElementById('center-text');

    const fragments = [
        { src: 'assets/images/fragment1.png', text: 'Courage' },
        { src: 'assets/images/fragment2.png', text: 'Temperance' },
        { src: 'assets/images/fragment3.png', text: 'Prudence' },
        { src: 'assets/images/fragment4.png', text: 'Faith' },
        { src: 'assets/images/fragment5.png', text: 'Justice' },
        { src: 'assets/images/fragment6.png', text: 'Frailty' }
    ];

    let currentFragmentIndex = 0;

    startButton.addEventListener('click', () => {
        startScreen.classList.add('hidden');
        setTimeout(() => {
            startScreen.style.display = 'none';
            gameScreen.style.display = 'flex';
            gameScreen.classList.remove('hidden');
            gameMusic.play();
            showNextFragment();
        }, 1000);
    });

    fragment.addEventListener('click', () => {
        currentFragmentIndex++;
        if (currentFragmentIndex < fragments.length) {
            showNextFragment();
        } else {
            endGame();
        }
    });

    function showNextFragment() {
        const fragmentData = fragments[currentFragmentIndex];
        fragment.src = fragmentData.src;
        centerText.textContent = fragmentData.text;
        fragment.style.left = `${Math.random() * (gameScreen.clientWidth - fragment.width)}px`;
        fragment.style.top = `${Math.random() * (gameScreen.clientHeight - fragment.height)}px`;
        fragment.classList.remove('hidden');
    }

    function endGame() {
        gameScreen.classList.add('hidden');
        setTimeout(() => {
            gameScreen.style.display = 'none';
            endScreen.style.display = 'flex';
            endScreen.classList.remove('hidden');
            gameMusic.pause();
            setTimeout(() => {
                window.location.href = 'https://jmbauer3.github.io/Rhean/';
            }, 3000); // 3 seconds delay before redirecting
        }, 1000);
    }
});
