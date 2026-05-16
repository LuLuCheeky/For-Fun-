const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");

const lanes = [70, 170, 270];

let notes = [];

let score = 0;

const hitLineY = 600;

function spawnNote() {

    const lane = Math.floor(Math.random() * 3);

    notes.push({
        lane: lane,
        x: lanes[lane],
        y: -50
    });
}

function update() {

    for (let i = 0; i < notes.length; i++) {

        notes[i].y += 5;
    }

    // Remove missed notes
    notes = notes.filter(note => note.y < canvas.height + 50);
}

function drawLanes() {

    ctx.strokeStyle = "#333";
    ctx.lineWidth = 4;

    for (let i = 1; i < 3; i++) {

        ctx.beginPath();
        ctx.moveTo(i * 130, 0);
        ctx.lineTo(i * 130, canvas.height);
        ctx.stroke();
    }
}

function drawHitLine() {

    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00ffff";

    ctx.fillStyle = "#00ffff";

    ctx.fillRect(0, hitLineY, canvas.width, 10);

    ctx.shadowBlur = 0;
}

function drawNotes() {

    for (let note of notes) {

        ctx.shadowBlur = 20;
        ctx.shadowColor = "#ffe600";

        ctx.fillStyle = "#ffe600";

        ctx.fillRect(
            note.x,
            note.y,
            60,
            20
        );
    }

    ctx.shadowBlur = 0;
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawLanes();

    drawHitLine();

    drawNotes();
}

function hitNote(key) {

    let lane;

    if (key === "a") lane = 0;
    if (key === "s") lane = 1;
    if (key === "d") lane = 2;

    for (let i = 0; i < notes.length; i++) {

        const note = notes[i];

        if (
            note.lane === lane &&
            Math.abs(note.y - hitLineY) < 40
        ) {

            notes.splice(i, 1);

            score += 100;

            scoreEl.textContent = score;

            return;
        }
    }
}

document.addEventListener("keydown", (e) => {

    hitNote(e.key.toLowerCase());
});

function gameLoop() {

    update();

    draw();

    requestAnimationFrame(gameLoop);
}

setInterval(spawnNote, 700);

gameLoop();
