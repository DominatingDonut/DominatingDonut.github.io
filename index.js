document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('playButton').addEventListener('click', function() {
        const audio = document.getElementById('joy');
        audio.play().catch(function(error) {
            console.log('Autoplay was prevented: ', error);
        });
        // Make the button and the overlay div invisible
        const overlay = document.getElementById('overlay');
        overlay.style.opacity = '0';
        overlay.style.backgroundColor = 'transparent';

        // Optional: Remove the button from the DOM after transition
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 4000); // 500ms matches the transition duration
    });
    // Update progress bar
    const audio = document.getElementById('joy');
    audio.addEventListener('timeupdate', updateProgressBar);

    function updateProgressBar() {
        const progress = document.getElementById('progress');
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percentage + '%';
    }

    const arc = document.getElementById('arc');
    const dot = document.getElementById('dot');
    if (arc) {
        function updateArc() {
            // Calculate scroll progress
            const content = document.getElementById('long-content');
            const scrollProgress = window.scrollY / (content.offsetHeight - window.innerHeight);
            // original was document.documentElement.scrollHeight
            // Calculate strokeDashoffset
            const strokeDashoffset = 945 * (1 - scrollProgress);
            // Update strokeDashoffset as string
            arc.style.strokeDashoffset = `${strokeDashoffset}`;

            // Get total length of the path
            const pathLength = arc.getTotalLength();

            // Calculate point on path
            const point = arc.getPointAtLength(pathLength - strokeDashoffset);

            // Update dot position
            dot.setAttribute('cx', String(point.x));
            dot.setAttribute('cy', String(point.y));

            // const audio = document.getElementById("joy");
            // audio.play();
        }

        // Event listener for scroll
        window.addEventListener('scroll', updateArc);

        // Initial call to updateArc to set initial state
        updateArc();
    } else {
        console.error('No element found with the selector .arc circle');
    }

    // Get the elements
    const content = document.getElementById('long-content');
    const fixedDiv = document.getElementById('fixed-div');

    // Add a scroll event listener
    window.addEventListener('scroll', () => {
        const contentBottom = content.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        if (contentBottom <= windowHeight) {
            fixedDiv.classList.add('scrollable');
        } else {
            fixedDiv.classList.remove('scrollable');
        }
    });
});






let start = new Date().getTime();

const originPosition = { x: 0, y: 0 };

const last = {
    starTimestamp: start,
    starPosition: originPosition,
    mousePosition: originPosition
}

const config = {
    starAnimationDuration: 1500,
    minimumTimeBetweenStars: 250,
    minimumDistanceBetweenStars: 10,
    glowDuration: 75,
    maximumGlowPointSpacing: 10,
    colors: ["249 146 253", "252 254 255", "128 249 255"],
    sizes: ["1.4rem", "1.2rem", "1rem"],
    animations: ["fall-1", "fall-2", "fall-3"]
}

let count = 0;

const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,
    selectRandom = items => items[rand(0, items.length - 1)];

const withUnit = (value, unit) => `${value}${unit}`,
    px = value => withUnit(value, "px"),
    ms = value => withUnit(value, "ms");

const calcDistance = (a, b) => {
    const diffX = b.x - a.x,
        diffY = b.y - a.y;

    return Math.sqrt(Math.pow(diffX, 2) + Math.pow(diffY, 2));
}

const calcElapsedTime = (start, end) => end - start;

const appendElement = element => document.body.appendChild(element),
    removeElement = (element, delay) => setTimeout(() => document.body.removeChild(element), delay);

const createStar = position => {
    const star = document.createElement("span"),
        color = selectRandom(config.colors);

    star.className = "star fa-solid fa-sparkle";

    star.style.left = px(position.x);
    star.style.top = px(position.y);
    star.style.fontSize = selectRandom(config.sizes);
    star.style.color = `rgb(${color})`;
    star.style.textShadow = `0px 0px 1.5rem rgb(${color} / 0.5)`;
    star.style.animationName = config.animations[count++ % 3];
    star.style.starAnimationDuration = ms(config.starAnimationDuration);

    appendElement(star);

    removeElement(star, config.starAnimationDuration);
}

const updateLastStar = position => {
    last.starTimestamp = new Date().getTime();

    last.starPosition = position;
}

const updateLastMousePosition = position => last.mousePosition = position;

const adjustLastMousePosition = position => {
    if(last.mousePosition.x === 0 && last.mousePosition.y === 0) {
        last.mousePosition = position;
    }
};

const handleOnMove = e => {
    const dot = document.getElementById('dot');
    const xcor = parseInt(dot.getAttribute('cx')) + 420; // 155
    const ycor = parseInt(dot.getAttribute('cy')) - 60;
    const mousePosition = { x: xcor.toString(), y: ycor.toString() }
    adjustLastMousePosition(mousePosition);

    const hasMovedFarEnough = calcDistance(last.starPosition, mousePosition) >= config.minimumDistanceBetweenStars;

    if(hasMovedFarEnough) {
        createStar(mousePosition);

        updateLastStar(mousePosition);
    }

    updateLastMousePosition(mousePosition);
}

window.onscroll = e => handleOnMove(e);
// window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

document.body.onmouseleave = () => updateLastMousePosition(originPosition);

function redirectToNextPage() {
    window.location.href = 'mainpage.html';
}

