const canvas = document.querySelector("canvas");
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = innerHeight;

const generateRandomFromRange = (min, max) => {

    return Math.floor(Math.random() * (max - min + 1) + min)
};

// Animate Road
let carSpeed = 0;
let roadTop = -canvas.height;

const roadBg = new Image();

roadBg.src = 'images/road.jpg';

const roadAnimate = () => {
    ctx.drawImage(roadBg, canvas.width / 4, roadTop, canvas.width / 2, 2 * canvas.height);
    roadTop += carSpeed;
    if (roadTop >= 0) {
        roadTop = -canvas.height;
    }

    requestAnimationFrame(roadAnimate);
}
roadAnimate();