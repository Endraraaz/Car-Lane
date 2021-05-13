const carImage = new Image();
let mode = 0;
let speedIncrease = false;
let obstacles = [];
let score = 0;
let currentSpeed = 0;

const enterScreen = document.querySelector(".start-menu");
const replay = document.querySelector(".replay");

const carHeight = 215;
const carWidth = 92;

carImage.src = "images/ambulance.png";

const carY = canvas.height * (2 / 3);

const possibleCarLanes = [
    canvas.width * (11 / 50),
    canvas.width * (19 / 50),
    canvas.width * (11 / 20)
];

let current = 0;

const carAnimate = () => {
    let x = possibleCarLanes[current];
    let y = carY;
    ctx.drawImage(carImage, x, carY);

    speedHandler();
    currentScore = Math.trunc(score / 5);
    if (speedIncrease) {
        carSpeed += 2;
        speedIncrease = false;
    };
    requestAnimationFrame(carAnimate);
};

const speedHandler = () => {
    if (mode === 2 && score !== 0) {
        if (parseInt(scoreEl.innerHTML) % 10 === 0) {
            nextScore = parseInt(scoreEl.innerHTML)
            if (currentScore !== nextScore) {
                speedIncrease = true;
            };
        };
    };
};

const keyPressHandler = event => {
    if (event.keyCode === 37) {
        current--;
        if (current < 0) {
            current = 0;
        };
    };

    if (event.keyCode === 39) {
        current++;
        if (current > 2) {
            current = 2;
        };
    };

    if (event.keyCode === 32) {
        if (mode === 0) {
            carSpeed = 7;
            enterScreen.style.display = "none";
            mode = 2;
        } else if (mode === 1) {
            carSpeed = 7;
            replay.style.display = "none";
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            obstacles = [];
            carAnimate();
            score = 0;
            scoreEl.innerHTML = Math.trunc(score / 5);
            mode = 2;
        };
    };
};

window.addEventListener("keydown", keyPressHandler);
carAnimate();