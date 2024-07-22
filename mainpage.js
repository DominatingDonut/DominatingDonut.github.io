document.addEventListener('DOMContentLoaded', function () {
    // Update progress bar
    const audio = document.getElementById('lanes');
    audio.addEventListener('timeupdate', updateProgressBar);

    function updateProgressBar() {
        const progress = document.getElementById('progress');
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percentage + '%';
    }

    const anchors = document.querySelectorAll('a');

    anchors.forEach(anchor => {
        // Randomize the animation duration between 15 and 30 seconds
        const duration = Math.floor(Math.random() * (3)) + 7;

        // Randomly decide the rotation direction
        const direction = Math.random() < 0.5 ? 'swirl-clockwise' : 'swirl-counterclockwise';

        // Apply the animation with the random duration and direction
        anchor.style.animation = `${direction} ${duration}s infinite linear`;
    });
});

