function handleYes() {

    createConfetti();


    const heading = document.querySelector('h1');
    heading.innerText = 'YUPPPPPIII';

    // Hide all other images/gifs
    const mainImg = document.getElementById('main-image');
    const sadCatContainer = document.getElementById('sad-cat-container');
    
    const thirdCatContainer = document.getElementById('third-cat-container');
    const fourthCatContainer = document.getElementById('fourth-cat-container');

    if (mainImg) mainImg.style.display = 'none';
    if (sadCatContainer) sadCatContainer.style.display = 'none';
    
    if (thirdCatContainer) thirdCatContainer.style.display = 'none';
    if (fourthCatContainer) fourthCatContainer.style.display = 'none';

    // Show the cozy cat and kitty cat images together
    const yesImagesContainer = document.getElementById('yes-images-container');
    if (yesImagesContainer) yesImagesContainer.style.display = 'flex';

    // Hide the buttons since they said Yes!
    const buttonsContainer = document.querySelector('.buttons-container');
    if (buttonsContainer) buttonsContainer.style.display = 'none';

    // Also hide the No button directly because it might have moved to the document body!
    const btnNo = document.getElementById('btn-no');
    if (btnNo) btnNo.style.display = 'none';
}

function handleNo() {
    const btnNo = document.getElementById('btn-no');
    btnNo.classList.add('clicked');

    // Optional: reset the other button
    document.getElementById('btn-yes').classList.remove('clicked');
}

// Make the "No" button run away on hover!
document.addEventListener('DOMContentLoaded', () => {
    const btnNo = document.getElementById('btn-no');

    // For PC (mouseover)
    btnNo.addEventListener('mouseover', moveButton);
    // For Mobile (touchstart)
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevent standard touch/click
        moveButton();
    });

    // We also select the main heading to change its text later
    const heading = document.querySelector('h1');
    const mainImg = document.getElementById('main-image');
    const sadCatContainer = document.getElementById('sad-cat-container');
    
    const thirdCatContainer = document.getElementById('third-cat-container');
    const fourthCatContainer = document.getElementById('fourth-cat-container');

    // Add a counter to keep track of hovers/clicks
    let noCount = 0;

    function moveButton() {
        noCount++; // Increment count each time they try to click "No"

        // Change text to 'Please Click Yes '
        heading.innerText = 'Please Click Yes ';

        // Hide normal image
        if (mainImg) mainImg.style.display = 'none';

        // Shuffle the image based on modulo 4
        const imageState = noCount % 4;

        // Reset all custom images to hidden first
        if (sadCatContainer) sadCatContainer.style.display = 'none';
       
        if (thirdCatContainer) thirdCatContainer.style.display = 'none';
        if (fourthCatContainer) fourthCatContainer.style.display = 'none';

        // Show the appropriate image
        if (imageState === 1) {
            if (sadCatContainer) sadCatContainer.style.display = 'block';
        } else if (imageState === 2) {
            if (thirdCatContainer) thirdCatContainer.style.display = 'block';
        } else {
            // imageState === 0
            if (fourthCatContainer) fourthCatContainer.style.display = 'block';
        }

        // We move the button to the body so it's not relative to the container's transform
        if (btnNo.parentElement !== document.body) {
            document.body.appendChild(btnNo);
            btnNo.style.position = 'fixed';
            btnNo.style.zIndex = '9999';
        }

        // Calculate safe boundaries (subtract padding/margin/button sizes)
        const maxX = window.innerWidth - btnNo.offsetWidth - 20;
        const maxY = window.innerHeight - btnNo.offsetHeight - 20;

        // Ensure the button isn't placed off-screen
        const randomX = Math.max(20, Math.floor(Math.random() * maxX));
        const randomY = Math.max(20, Math.floor(Math.random() * maxY));

        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
    }
});

// Simple confetti effect for Yes
function createConfetti() {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '1000';

        document.body.appendChild(confetti);

        const duration = Math.random() * 2 + 1;

        confetti.animate([
            { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate3d(${Math.random() * 200 - 100}px, ${window.innerHeight}px, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(.37,0,.63,1)',
            fill: 'forwards'
        });

        setTimeout(() => confetti.remove(), duration * 1000);
    }
}
