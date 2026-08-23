// --- CANVAS & MOUSE SETUP ---
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const mouse = { x: 0, y: 0, isPressing: false };
const trails = [];
const fruits = [];

// Gravity replacement constant
const GRAVITY = 0.3; 
let frameCount = 0;

// Track mouse position relative to canvas
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});
canvas.addEventListener("mousedown", () => mouse.isPressing = true);
canvas.addEventListener("mouseup", () => mouse.isPressing = false);

// --- ASSET LOADING ---
const dojoBG = new Image();
dojoBG.src = "assets/dojobackground.png";

// Helper function to structure image items cleanly
function createFruitType(src, name, scale) {
    const img = new Image();
    img.src = src;
    return { img, name, scale };
}

const fruitTypes = [
    createFruitType("assets/peachwhole.png", "peach", 1.0),
    createFruitType("assets/watermelonwhole.png", "watermelon", 1.0),
    createFruitType("assets/grapewhole.png", "grape", 0.15),
    createFruitType("assets/spamton.png", "spamton", 0.15),
    createFruitType("assets/four.png", "four", 0.1),
    createFruitType("assets/happy.png", "happy", 0.075),
    createFruitType("assets/cute.png", "cute", 0.5),
    createFruitType("assets/stressed.png", "stressed", 0.2)
];

// --- SPAWN FRUIT FUNCTION ---
function spawnFruit() {
    // Pick a random fruit configuration
    const fruitData = fruitTypes[Math.floor(Math.random() * fruitTypes.length)];
    const randomX = Math.random() * (500 - 300) + 300;
    
    // Equivalent physics parameters replacing p5.play settings
    fruits.push({
        x: randomX,
        y: canvas.height + 20,
        radius: 20, 
        velX: Math.random() * (2 - (-2)) + (-2),
        velY: Math.random() * (-10 - (-14)) + (-14), // Adjusted physics scaling for vanilla loop
        scale: fruitData.scale,
        image: fruitData.img
    });
}

// --- ENGINE CORE: MAIN GAME LOOP ---
function gameLoop() {
    frameCount++;
    
    // 1. Clear background and draw Dojo image
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (dojoBG.complete) {
        ctx.drawImage(dojoBG, 0, 0, canvas.width, canvas.height);
    }

    // 2. Spawn Control (Changed to every 30 frames to match visual limits)
    if (frameCount % 30 === 0) {
        spawnFruit();
    }

    // 3. Update & Draw Physics Fruits
    for (let i = fruits.length - 1; i >= 0; i--) {
        let f = fruits[i];
        
        // Physics logic replacing engine forces
        f.velY += GRAVITY; 
        f.x += f.velX;
        f.y += f.velY;

        // Draw image asset with scaling adjustments
        if (f.image.complete) {
            let imgW = f.image.width * f.scale;
            let imgH = f.image.height * f.scale;
            
            ctx.drawImage(f.image, f.x - imgW / 2, f.y - imgH / 2, imgW, imgH);
        }

        // Garbage collection: Clean up offscreen fruits to optimize memory
        if (f.y > canvas.height + 100) {
            fruits.splice(i, 1);
        }
    }

    // 4. Mouse Trail Generation & Rendering
    if (mouse.isPressing) {
        trails.push({ x: mouse.x, y: mouse.y, life: 10 });
    }

    for (let i = trails.length - 1; i >= 0; i--) {
        let t = trails[i];
        t.life--;

        // Draw white slicing circle dots
        ctx.beginPath();
        ctx.arc(t.x, t.y, 5, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.fill();

        if (t.life <= 0) {
            trails.splice(i, 1);
        }
    }

    // Continuous execution loop
    requestAnimationFrame(gameLoop);
}

// Start game loop execution once code initializes
gameLoop();
