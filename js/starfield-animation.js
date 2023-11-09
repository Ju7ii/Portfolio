//  AUTHOR:         JULIAN ROK
// VERSION:         4.0
// LAST-EDIT:       09.11.2023
// LAST FEATURE:    STOPPING ANIMATION WHEN OUT OF VIEW, SAVING RESOURCES


//$ VARIABLES

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

//$ END VARIABLES
//!--------------------------------------------------
//$ FUNCTIONS

//* DISPLAY FULLSCREEN CANVAS
const setCanvasSize = () => {
    canvasWidth = canvasContainer.clientWidth;
    canvasHeight = canvasContainer.clientHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
};

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
        console.log('%c' + new Date().toLocaleTimeString() + '\tAnimation is now Running', 'color: green;');
        requestAnimationFrame(initializeTiming);
    } else if (!isCanvasInViewport && !animationPaused) {
        // Canvas is out of view, pause the animation
        animationPaused = true;
        console.log('%c' + new Date().toLocaleTimeString() + '\tAnimation is now Paused', 'color: orange;');
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
    moveStars(elapsed * 0.0125);
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

function showStars() {
    console.table(stars);
}

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

//* GENERATE 7.500 STARS
let stars = makeStars(5000);

//* STARTING ANIMATION
//* CALL THE INITIALIZATION FUNCTION
requestAnimationFrame(initializeTiming);

//$ END FUNCTION CALLS
//!--------------------------------------------------

console.log('\n %cHello! Thank you for visiting my portfolio :)\n ', 'font-weight: bold; font-size: 32px; color: #1a9df1;');

console.info('%cSome informations:', 'color: orange; font-weight: bold', '\n');
console.info('1.\t' + 'To display stars in from the background write: ' + '%cshowStars()', 'color: orange; font-weight: bold')

console.log(' ');