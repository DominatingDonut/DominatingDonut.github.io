document.addEventListener('DOMContentLoaded', function () {
    // Update progress bar
    const audio = document.getElementById('lanes');
    audio.addEventListener('timeupdate', updateProgressBar);

    function updateProgressBar() {
        const progress = document.getElementById('progress');
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percentage + '%';
    }
});

function redirectToNextPage() {
    window.location.href = 'mainpage.html';
}