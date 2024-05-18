window.onload = function() {
    const startScreen = document.getElementById('start-screen');
    const gameArea = document.getElementById('game-area');
    const gameOverScreen = document.getElementById('game-over-screen');
    const finalScoreDisplay = document.getElementById('final-score');
    const restartButton = document.getElementById('restart-button');
    const music = document.getElementById('backgroundMusic');
    const scoreDisplay = document.getElementById('score');
    const fragments = [
        'assets/images/fragment1.png',
        'assets/images/fragment2.png',
        'assets/images/fragment3.png',
        'assets/images/fragment4.png',
        'assets/images/fragment5.png',
        'assets/images/fragment6.png'
    ];
    let score = 0;

    // Initial settings
    let createFragmentInterval = 3000; // Interval to create fragments
    let fragmentLifetime = 5000; // Time fragments remain on screen
    let fragmentIntervalId;

    // Set initial background image for start screen
    document.body.style.backgroundImage = `url('assets/images/start.jpg')`;

    function createFragment() {
        const fragment = document.createElement('div');
        fragment.classList.add('fragment');
        const randomFragment = fragments[Math.floor(Math.random() * fragments.length)];
        fragment.style.backgroundImage = `url('${randomFragment}')`;
        fragment.style.top = `${Math.random() * (gameArea.clientHeight - 30)}px`;
        fragment.style.left = `${Math.random() * (gameArea.clientWidth - 30)}px`;

        console.log('Fragment created at:', fragment.style.top, fragment.style.left);

        fragment.addEventListener('click', () => {
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            gameArea.removeChild(fragment);

            // Increase difficulty: make fragments appear and disappear faster
            if (createFragmentInterval > 1000) {
                createFragmentInterval -= 100;
            }
            if (fragmentLifetime > 2000) {
                fragmentLifetime -= 100;
            }

            // Clear existing interval and set a new one with updated speed
            clearInterval(fragmentIntervalId);
            fragmentIntervalId = setInterval(createFragment, createFragmentInterval);
        });

        gameArea.appendChild(fragment);

        // Remove fragment after its lifetime
        setTimeout(() => {
            if (gameArea.contains(fragment)) {
                gameArea.removeChild(fragment);
                // Game over if a fragment is missed
                endGame();
            }
        }, fragmentLifetime);
    }

    function startGame() {
        score = 0;
        scoreDisplay.innerText = `Score: ${score}`;
        createFragmentInterval = 3000;
        fragmentLifetime = 5000;

        startScreen.classList.add('hidden');
        gameOverScreen.classList.add('hidden');
        gameArea.classList.remove('hidden');

        document.body.style.backgroundImage = `url('assets/images/background.jpg')`;

        music.currentTime = 0;
        music.play().catch(error => {
            console.error('Failed to play music automatically:', error);
        });

        fragmentIntervalId = setInterval(createFragment, createFragmentInterval);
    }

    function endGame() {
        clearInterval(fragmentIntervalId);
        gameArea.classList.add('hidden');
        gameOverScreen.classList.remove('hidden');
        finalScoreDisplay.innerText = score;

        document.body.style.backgroundImage = `url('assets/images/start.jpg')`;
    }

    document.body.addEventListener('click', (event) => {
        if (startScreen.contains(event.target)) {
            startGame();
        }
    });

    restartButton.addEventListener('click', startGame);
}