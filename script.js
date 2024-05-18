window.onload = function() {
    const music = document.getElementById('backgroundMusic');
    const images = [
        'assets/images/image1.jpg',
        'assets/images/image2.jpg',
        'assets/images/image3.jpg',
        'assets/images/image4.jpg',
        'assets/images/image5.jpg',
        'assets/images/image6.jpg'
    ];
    const musicTracks = [
        'assets/music/Frozen Echoes.mp3',
        'assets/music/Bubbly Dream.mp3'
    ];
    let currentImageIndex = 0;
    let currentMusicIndex = 0;
    let score = 0;

    // Initial settings
    let createCrystalInterval = 3000; // Interval to create crystals
    let crystalLifetime = 5000; // Time crystals remain on screen

    // Function to change background image
    function changeBackgroundImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    }

    // Function to change music track
    function changeMusicTrack() {
        currentMusicIndex = (currentMusicIndex + 1) % musicTracks.length;
        music.src = musicTracks[currentMusicIndex];
        music.play().catch(error => {
            console.error('Failed to play new music:', error);
        });
    }

    // Set initial background image
    document.body.style.backgroundImage = `url('${images[currentImageIndex]}')`;

    // Ensure the music plays when the page loads
    music.volume = 0.2;
    music.play().catch(error => {
        console.error('Failed to play music automatically:', error);
        // Handle autoplay policy restriction by user interaction
        document.body.addEventListener('click', () => {
            music.play();
        }, { once: true });
    });

    // Game logic
    const gameArea = document.getElementById('game-area');
    const scoreDisplay = document.getElementById('score');

    function createCrystal() {
        const crystal = document.createElement('div');
        crystal.classList.add('crystal');
        crystal.style.top = `${Math.random() * (gameArea.clientHeight - 30)}px`;
        crystal.style.left = `${Math.random() * (gameArea.clientWidth - 30)}px`;

        console.log('Crystal created at:', crystal.style.top, crystal.style.left);

        crystal.addEventListener('click', () => {
            score++;
            scoreDisplay.innerText = `Score: ${score}`;
            gameArea.removeChild(crystal);

            // Change background image every 5 crystals
            if (score % 5 === 0) {
                changeBackgroundImage();
            }

            // Change music every 15 crystals
            if (score % 15 === 0) {
                changeMusicTrack();
            }

            // Increase difficulty: make crystals appear and disappear faster
            if (createCrystalInterval > 1000) {
                createCrystalInterval -= 100;
            }
            if (crystalLifetime > 2000) {
                crystalLifetime -= 100;
            }

            // Clear existing interval and set a new one with updated speed
            clearInterval(crystalIntervalId);
            crystalIntervalId = setInterval(createCrystal, createCrystalInterval);
        });

        gameArea.appendChild(crystal);

        // Remove crystal after its lifetime
        setTimeout(() => {
            if (gameArea.contains(crystal)) {
                gameArea.removeChild(crystal);
            }
        }, crystalLifetime);
    }

    // Initial interval to create crystals
    let crystalIntervalId = setInterval(createCrystal, createCrystalInterval);
}
