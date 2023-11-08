//  AUTHOR:     JULIAN ROK
// VERSION:     3.0
// LAST-EDIT:   08.11.2023


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

//* MAIN ANIMATION FUNCTION
const tick = (time) => {

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

//$ END FUNCTIONS
//!--------------------------------------------------
//$ FUNCTION CALLS

//* INITIALIZE THE CANVAS SIZE
setCanvasSize();
//* FOR RESOLUTION CHANGE
window.onresize = () => {
    setCanvasSize();
};

//* GENERATE 7.500 STARS
let stars = makeStars(7500);

//* STARTING ANIMATION
//* CALL THE INITIALIZATION FUNCTION
requestAnimationFrame(initializeTiming);

//$ END FUNCTION CALLS
//!--------------------------------------------------

//* LOG THE GENERATED STARS
console.log(stars);
