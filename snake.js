const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];

let velocityX = 0;
let velocityY = 0;

let food = {
    x: 15,
    y: 15
};

let score = 0;

function gameLoop() {
    update();
    draw();
}

function update() {

    // Prevent movement before game starts
    if (velocityX === 0 && velocityY === 0) {
        return;
    }

    const head = {
        x: snake[0].x + velocityX,
        y: snake[0].y + velocityY
    };

    // Wrap around walls
    if (head.x < 0) head.x = tileCount - 1;
    if (head.x >= tileCount) head.x = 0;
    if (head.y < 0) head.y = tileCount - 1;
    if (head.y >= tileCount) head.y = 0;

    // Check collision with body
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();
            return;
        }
    }

    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {

        score++;
        scoreEl.textContent = score;

        food = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };

    } else {
        snake.pop();
    }
}

function draw() {

    // Clear screen
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#ff0000";

    ctx.fillStyle = "#ff3333";
    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 2,
        gridSize - 2
    );

    // Draw snake
    ctx.shadowBlur = 25;
    ctx.shadowColor = "#ffe600";

    for (let i = 0; i < snake.length; i++) {

        ctx.fillStyle = i === 0 ? "#fff799" : "#ffe600";

        ctx.fillRect(
            snake[i].x * gridSize,
            snake[i].y * gridSize,
            gridSize - 2,
            gridSize - 2
        );
    }

    ctx.shadowBlur = 0;
}

function resetGame() {

    alert("Game Over!");

    snake = [{ x: 10, y: 10 }];

    velocityX = 0;
    velocityY = 0;

    score = 0;
    scoreEl.textContent = score;
}

document.addEventListener("keydown", (e) => {

    switch (e.key.toLowerCase()) {

        case "arrowup":
        case "w":
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;

        case "arrowdown":
        case "s":
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;

        case "arrowleft":
        case "a":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;

        case "arrowright":
        case "d":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
});

draw();

setInterval(gameLoop, 100);
