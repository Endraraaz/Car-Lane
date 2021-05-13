let highscore = localStorage.getItem('highscore') || 0;

if (!localStorage.getItem('highscore')) {
    highscore = 0;
    localStorage.setItem('highscore', highscore);
} else {
    highscore = localStorage.getItem('highscore');
};

document.querySelector('.high-score-span').innerHTML = highscore;

const obstacleType = [
    "black_car",
    "red_car",
    "car",
    "mini_truck",
    "mini_van",
    "police",
    "taxi",
];

const possibleObstacleY = [-200, -450, -700];

const scoreEl = document.querySelector(".scoreboard .score-span");
obstacleCount = 3;

class Obstacle {
    constructor(x, y, type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }

    spawn() {
        let image = new Image();
        image.src = `images/${this.type}.png`;
        ctx.drawImage(image, this.x, this.y);
    };

    update() {
        this.spawn();
        this.y += carSpeed;
    };
};

const generateObstacle = () => {
    if (obstacles.length === 0) {
        var possibleXIndex1 = generateRandomFromRange(0, possibleCarLanes.length - 1);
        var imageTypeIndex1 = generateRandomFromRange(0, obstacleType.length - 1);
        var possibleYIndex1 = generateRandomFromRange(0, 2);

        while (true) {
            var possibleXIndex2 = generateRandomFromRange(0, possibleCarLanes.length - 1);
            var imageTypeIndex2 = generateRandomFromRange(0, obstacleType.length - 1);
            var possibleYIndex2 = generateRandomFromRange(0, 2);

            if (possibleXIndex1 !== possibleXIndex2 && possibleYIndex1 !== possibleYIndex2) {
                break;
            };
        };

        const obstacle1 = new Obstacle(possibleCarLanes[possibleXIndex1], possibleObstacleY[possibleYIndex1], obstacleType[imageTypeIndex1]);
        const obstacle2 = new Obstacle(possibleCarLanes[possibleXIndex2], possibleObstacleY[possibleYIndex2], obstacleType[imageTypeIndex2]);

        obstacles.push(obstacle1);
        obstacles.push(obstacle2);

    };
};

const checkCollision = () => {
    obstacles.forEach((obstacle) => {
        if ((possibleCarLanes[current] < obstacle.x + carWidth && possibleCarLanes[current] + carWidth > obstacle.x &&
            carY < obstacle.y + carHeight && carY + carHeight > obstacle.y + carHeight) ||
            (obstacle.x < possibleCarLanes[current] + carWidth && obstacle.x + carWidth > possibleCarLanes[current] &&
                obstacle.y < carY + carHeight && obstacle.y + carHeight > carY + carHeight)) {
            mode = 1;
            carSpeed = 0;
            if (localStorage.getItem('highscore') < score / 5) {
                highscore = Math.trunc(score / 5);
                localStorage.setItem('highscore', highscore);
                document.querySelector('.high-score-span').innerHTML = highscore;
            }
            score = 0;
            replay.style.display = "block";
        }
        if (carY < obstacle.y - carHeight) {
            score = score + 1;
            scoreEl.innerHTML = Math.trunc(score / 5);
        }
    });
};

const animateObstacle = () => {
    generateObstacle();
    checkCollision();
    obstacles.forEach((obstacle) => {
        obstacle.update();
    });
    obstacles = obstacles.filter(
        (obstacle) => obstacle.y < canvas.height
    );
    requestAnimationFrame(animateObstacle);
};

animateObstacle();