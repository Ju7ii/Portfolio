//$ VARIABLES

//* CONTAINER WRAPPER
const canvasContainer = document.querySelector('.background-wrapper');

//* GET CANVAS-ELEMENT AND 2D-CONTEXT
const canvas = document.getElementById('star-animation');
const ctx = canvas.getContext('2d');

//* SIZE OF CANVAS
let canvasWidth;
let canvasHeight;

//* TIMING
let prevTime;

//* PLAYSTATE ANIMATION
let animationPaused = false;

//* SPEEDING UP ANIMATION
const speedTrigger = document.getElementById('speed-trigger');
const maxSpeed = parseFloat(0.5); // 5000 - 10.000 - 0.5
let starAcceleration = parseFloat(0.0125); // 125 - 10.000 - 0.0125
let accelerationRate = parseFloat(0.0125); // 125 - 10.000 - 0.0125
let mouseIsInsideOfTrigger = false;
let currentInterval;
let currentSpeed = [];

//$ END VARIABLES
//!--------------------------------------------------
//$ FUNCTIONS

//$ ---------- MAIN FUNCTIONS  ---------- $//
//* DISPLAY FULLSCREEN CANVAS
const setCanvasSize = () => {
    canvasWidth = canvasContainer.clientWidth;
    canvasHeight = canvasContainer.clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
};

//* CALCULATE STARS TO GENERATE BASED ON CPU AND RESOLUTION
function calculateNumberOfStarsToGenerate() {

    const baseNumberOfStars = 1000;
    const defaultMultiplier = 1.0;
    let calculatedMultiplier = defaultMultiplier;

    const MAX_THREADS = navigator.hardwareConcurrency;
    const screenWidth = screen.width;

    // Calculate CPU multiplier based on the number of threads (accounting for hyperthreading)
    if (MAX_THREADS >= 16) {
        calculatedMultiplier = 5.0; // 16 or more THREADS
    } else if (MAX_THREADS < 16 && MAX_THREADS > 12) {
        calculatedMultiplier = 2.5; //  15-13 THREADS
    } else if (MAX_THREADS <= 12) {
        calculatedMultiplier = 0.5; // 12 or less THREADS
    } else {
        console.warn('No hardware information found. Setting up default value');
        calculatedMultiplier = defaultMultiplier;
    }

    // Calculate resolution multiplier based on screen width
    if (screenWidth > 1200) {
        calculatedMultiplier += 2.5; // Large screens
    } else if (screenWidth >= 769 && screenWidth <= 1024) { // 769 - 1024
        calculatedMultiplier += 2; // Laptops
    } else if (screenWidth >= 481 && screenWidth <= 768) { // 481 - 768
        calculatedMultiplier += 1.5; // Tablets
    } else if (screenWidth >= 320 && screenWidth <= 480) { // 320 - 480
        calculatedMultiplier += 1.0; // Mobile
    } else {
        calculatedMultiplier = defaultMultiplier; // Default for incorrect values
    }

    // Limit total multiplier to 7.5
    calculatedMultiplier = Math.min(calculatedMultiplier, 7.5);

    // Calculate stars based on baseNumberOfStars and the calculated multiplier
    let stars = Math.min(baseNumberOfStars * calculatedMultiplier, 7500);

    return stars;
}

//* STAR CREATOR (STARLORD)
const makeStars = (count) => {
    const starCollection = [];

    for (let i = 0; i < count; i++) {

        // RANDOM "X" AND "Y" POSITION, DEPTH "Z" AND SIZE
        const s = {
            x: Math.random() * 1600 - 800,
            y: Math.random() * 800 - 400,
            z: Math.random() * 1000,
            size: Math.random() * 2.0 + 0.5
        };
        starCollection.push(s);
    }

    return starCollection;
};

//* DELETE CANVAS CONTENT
const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};

//* FUNCTION TO DRAW PIXEL ON THE CANVAS
const putPixel = (x, y, size, brightness) => {
    const intensity = brightness * 255;
    const rgba = `rgba( ${intensity}, ${intensity}, ${intensity}, 1)`;
    ctx.fillStyle = rgba;
    ctx.beginPath();
    ctx.arc(x, y, size / 2, 0, Math.PI * 2);
    ctx.fill();
};

//* MOVING STARS (TIME-BASED)
const moveStars = (distance) => {
    stars.forEach((star) => {
        star.z -= distance;
        if (star.z <= 1) {
            star.z = 1000;
        }
    })
};

//* INITIALIZATION FUNCTION
//* SETTING UP TIMER
const initializeTiming = (time) => {
    prevTime = time;
    //* STARTING ANIMATION LOOP
    requestAnimationFrame(tick);
};

//* CHECK IF ANIMATION (CANVAS) IS INTERSECTING
const handleScroll = () => {
    const canvasRect = canvas.getBoundingClientRect();
    const isCanvasInViewport = (
        canvasRect.top < window.innerHeight &&
        canvasRect.bottom > 0
    );

    if (isCanvasInViewport && animationPaused) {
        // Canvas is in view, start or resume the animation
        animationPaused = false;
        console.group('%c' + new Date().toLocaleTimeString() + '\tAnimation is now Running', 'color: lightgreen; font-weight: bold;');
        console.log("Animation is in viewport");
        console.groupEnd();
        requestAnimationFrame(initializeTiming);
    } else if (!isCanvasInViewport && !animationPaused) {
        // Canvas is out of view, pause the animation
        animationPaused = true;
        console.group('%c' + new Date().toLocaleTimeString() + '\tAnimation is now Paused', 'color: tomato; font-weight: bold;');
        console.info("To save resources, the animation is paused when it is outside the viewport");
        console.groupEnd();
    }
};

//* MAIN ANIMATION FUNCTION
const tick = (time) => {
    if (animationPaused) {
        return;
    }
    //* CALCULATE THE ELAPSED TIME SINCE THE LAST FRAME
    let elapsed = time - prevTime;
    prevTime = time;
    moveStars(elapsed * starAcceleration);
    clear();

    //* CALCULATE HORIZONTAL CENTER OF CANVAS
    const horizontalCenter = canvasWidth / 2;

    //* CALCULATE VERTICAL CENTER OF CANVAS
    const verticalCenter = canvasHeight / 2;

    stars.forEach((star) => {
        //* DETERMINE HORIZONTAL POSITION OF THE STAR IN CANVAS
        const xAxis = horizontalCenter + star.x / (star.z * 0.001);

        //* DETERMINE VERTICAL POSITION OF THE STAR IN CANVAS
        const yAxis = verticalCenter + star.y / (star.z * 0.001);

        //* SKIP STARS OUTSITE OF THE CANVAS
        if (xAxis >= 0 && xAxis < canvasWidth && yAxis >= 0 && yAxis < canvasHeight) {
            const depth = star.z / 1000.0;
            const brightness = 1 - depth * depth; // START BLACK AND BECOME MORE WHITE 
            putPixel(xAxis, yAxis, star.size, brightness);
        }
    });

    //* START THE NEXT FRAME
    requestAnimationFrame(tick);
};

//$ ---------- END MAIN FUNCTIONS  ---------- $//

//$ ---------- TEST FUNCTIONS  ---------- $//

//* TEST FUNCTION FOR CONSOLE
function showStars() {
    console.log(stars);
}

//$ ---------- END TEST FUNCTIONS  ---------- $//

//$ ---------- SPEED STARS FUNCTIONS  ---------- $//

//* DECISION TO SPEED OR SLOW STARS
const handleAnimation = () => {
    clearInterval(currentInterval);
    starAcceleration = parseFloat(starAcceleration);
    if (mouseIsInsideOfTrigger) {
        currentInterval = setInterval(() => accelerateStars(), 100);
    } else {
        currentInterval = setInterval(() => decelerateStars(), 100);
    }
};

//* SPEED UP STARS
const accelerateStars = () => {

    if (starAcceleration < maxSpeed) {
        starAcceleration = parseFloat((starAcceleration + accelerationRate).toFixed(4));
    } else {
        clearInterval(currentInterval);
    }
};

//* SLOW DOWN STARS
const decelerateStars = () => {

    if (starAcceleration > 0.0125) {
        starAcceleration = parseFloat((starAcceleration - accelerationRate).toFixed(4));
    } else {
        clearInterval(currentInterval);
    }
};

//$ ---------- END SPEED STARS FUNCTIONS  ---------- $//


//$ END FUNCTIONS
//!--------------------------------------------------
//$ FUNCTION CALLS

//* INITIALIZE THE CANVAS SIZE
setCanvasSize();
//* FOR RESOLUTION CHANGE
window.onresize = () => {
    setCanvasSize();
};

window.addEventListener('scroll', handleScroll);

//* DEFINE THE NUMBER OF STARS TO GENERATE BASED ON CPU AND RESOLUTION
const totalNumberOfStars = calculateNumberOfStarsToGenerate();

//* GENERATE THE CALCULATED AMOUNT OF STARS
const stars = makeStars(totalNumberOfStars);

//* STARTING ANIMATION
//* IF USER WANTS ANIMATION | TRUE: CALL THE INITIALIZATION FUNCTION | FALSE: NO ANIMATED STARS
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    requestAnimationFrame(initializeTiming);
}

//* HOVER OR TAP LOGO -> SPEED UP
speedTrigger.addEventListener('mouseover', () => {
    console.log('%c' + new Date().toLocaleTimeString() + '\tSpeed up Animation', 'color: lightgreen; font-weight: bold;');
    mouseIsInsideOfTrigger = true;
    handleAnimation();
});

//* NO ACTION IN LOGO -> SLOW DOWN
speedTrigger.addEventListener('mouseout', () => {
    console.log('%c' + new Date().toLocaleTimeString() + '\tSlow down Animation', 'color: tomato; font-weight: bold;');
    mouseIsInsideOfTrigger = false;
    handleAnimation();
});


//$ END FUNCTION CALLS
//!--------------------------------------------------

console.log('\n %cHello! Thank you for visiting my portfolio :)\n ', 'font-weight: bold; font-size: 32px; color: #1a9df1;');

console.info('%cSome informations:', 'color: orange; font-weight: bold', '\n');
console.log('1.\t' + 'To display stars-array write: ' + '%cshowStars()', 'color: orange; font-weight: bold');
console.log('2.\t' + 'CPU Threads available: ', navigator.hardwareConcurrency);
console.log('3.\t' + 'Based on your hardware I made: ', stars.length, ' stars shining for you ❤️');



console.log(' ');