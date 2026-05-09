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

let score = 0;

let food = generateFood();

function generateFood() {

    let newFood;

    while (true) {

        newFood = {
            x: Math.floor(Math.random() * tileCount),
            y: Math.floor(Math.random() * tileCount)
        };

        let touchingSnake = false;

        for (let segment of snake) {

            if (
                segment.x === newFood.x &&
                segment.y === newFood.y
            ) {
                touchingSnake = true;
                break;
            }
        }

        if (!touchingSnake) {
            return newFood;
        }
    }
}

function gameLoop() {
    update();
    draw();
}

function update() {

    // Wait until movement starts
    if (velocityX === 0 && velocityY === 0) {
        return;
    }

    const head = {
        x: snake[0].x + velocityX,
        y: snake[0].y + velocityY
    };

    // Wall collision
    if (
        head.x < 0 ||
        head.x >= tileCount ||
        head.y < 0 ||
        head.y >= tileCount
    ) {
        resetGame();
        return;
    }

    // Self collision
    for (let i = 0; i < snake.length; i++) {

        if (
            head.x === snake[i].x &&
            head.y === snake[i].y
        ) {
            resetGame();
            return;
        }
    }

    snake.unshift(head);

    // Eat food
    if (
        head.x === food.x &&
        head.y === food.y
    ) {

        score++;
        scoreEl.textContent = score;

        food = generateFood();

    } else {
        snake.pop();
    }
}

function drawGrid() {

    ctx.strokeStyle = "#2b2b2b";
    ctx.lineWidth = 1;

    for (let i = 0; i < tileCount; i++) {

        // Vertical
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, canvas.height);
        ctx.stroke();

        // Horizontal
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(canvas.width, i * gridSize);
        ctx.stroke();
    }
}

function draw() {

    // Background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGrid();

    // Food
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#ff3333";

    ctx.fillStyle = "#ff3333";

    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 2,
        gridSize - 2
    );

    // Snake
    ctx.shadowBlur = 18;
    ctx.shadowColor = "#ffe600";

    for (let i = 0; i < snake.length; i++) {

        // Yellow gradient trail
        const brightness = 92 - (i * 3);

        ctx.fillStyle =
            `hsl(50, 100%, ${Math.max(brightness, 30)}%)`;

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

    alert("GAME OVER");

    snake = [
        { x: 10, y: 10 }
    ];

    velocityX = 0;
    velocityY = 0;

    score = 0;
    scoreEl.textContent = score;

    food = generateFood();
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
