// Game initialization variables
const fragmentImages = [
    "assets/images/fragment1.png",
    "assets/images/fragment2.png",
    "assets/images/fragment3.png",
    "assets/images/fragment4.png",
    "assets/images/fragment5.png",
    "assets/images/fragment6.png"
];
const fragmentSpeed = 1; // Speed of fragment movement (pixels per frame)
const fragmentSize = 60; // Size of fragments (width and height)
const fragmentRadius = 150; // Radius of circular movement
const fragmentAngleSpeed = 0.01; // Speed of angle change (radians per frame)
let currentFragmentIndex = 0;
let currentFragment;

// DOM elements
const gameArea = document.getElementById('game-area');
const fragmentContainer = document.getElementById('fragment-container');
const startScreen = document.getElementById('start-screen');
const startText = document.getElementById('start-text');
const gameText = document.getElementById('game-text');
const bgMusic = document.getElementById('bg-music');

// Start screen click event
startScreen.addEventListener('click', () => {
    startGame();
});

// Function to start the game
function startGame() {
    // Hide start screen
    startScreen.style.display = 'none';
    
    // Display game area and game text
    gameArea.style.display = 'block';
    gameText.style.display = 'block';

    // Play background music
    bgMusic.play();

    // Create initial fragment
    createFragment();
}

// Function to create a fragment
function createFragment() {
    currentFragment = new Image();
    currentFragment.src = fragmentImages[currentFragmentIndex];
    currentFragment.classList.add('game-fragment');
    currentFragment.dataset.fragment = currentFragmentIndex + 1; // Store fragment index
    currentFragment.style.width = `${fragmentSize}px`; // Set fragment size
    currentFragment.style.height = `${fragmentSize}px`; // Set fragment size
    fragmentContainer.appendChild(currentFragment);

    // Set initial position
    currentFragment.style.left = `${Math.random() * (window.innerWidth - fragmentSize)}px`;
    currentFragment.style.top = `${Math.random() * (window.innerHeight - fragmentSize)}px`;

    // Start movement
    moveFragment(currentFragment);
}

// Function to move the fragment in curved paths
function moveFragment(fragment) {
    let centerX = parseFloat(fragment.style.left) + fragmentSize / 2;
    let centerY = parseFloat(fragment.style.top) + fragmentSize / 2;
    let angle = Math.random() * Math.PI * 2; // Initial random angle
    let radius = fragmentRadius + Math.random() * 50; // Random radius variation
    let direction = Math.random() < 0.5 ? -1 : 1; // Randomize movement direction

    const move = () => {
        angle += fragmentAngleSpeed * direction;

        let newX = centerX + radius * Math.cos(angle);
        let newY = centerY + radius * Math.sin(angle);

        fragment.style.left = `${newX - fragmentSize / 2}px`;
        fragment.style.top = `${newY - fragmentSize / 2}px`;

        requestAnimationFrame(move);
    };

    move();

    // Click event handler
    fragment.addEventListener('click', () => {
        fragment.remove();
        currentFragmentIndex++;
        if (currentFragmentIndex < fragmentImages.length) {
            // Create the next fragment
            createFragment();
        } else {
            // All fragments collected, game won
            gameWon();
        }

        // Change game text based on fragment clicked
        handleFragmentClick(currentFragmentIndex);
    });
}

// Function to handle game won scenario
function gameWon() {
    // Change game text
    gameText.innerText = "Alas, was I the cause of your dying?";

    // Redirect to the specified link after a delay
    setTimeout(() => {
        window.location.href = 'https://jmbauer3.github.io/Rhean/';
    }, 3000); // Redirect after 3 seconds
}

// Function to handle fragment clicks
function handleFragmentClick(fragmentNumber) {
    // Change game text based on fragment clicked
    let text = "";
    switch (fragmentNumber) {
        case 1:
            text = "Courage";
            break;
        case 2:
            text = "Temperance";
            break;
        case 3:
            text = "Prudence";
            break;
        case 4:
            text = "Faith";
            break;
        case 5:
            text = "Justice";
            break;
        case 6:
            text = "Frailty";
            break;
        default:
            text = "Fūneris heu tibi causa fuī?";
            break;
    }
    gameText.innerText = text;
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Click event listener for start button
    document.getElementById('start-button').addEventListener('click', function() {
        // Show game area and hide start screen
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-area').style.display = 'block';
    });

    // Click event listener for fragments (simulated clicks for demonstration)
    document.getElementById('fragment-container').addEventListener('click', function(event) {
        if (event.target.classList.contains('game-fragment')) {
            let fragmentNumber = parseInt(event.target.dataset.fragment);
            handleFragmentClick(fragmentNumber);
        }
    });
});
