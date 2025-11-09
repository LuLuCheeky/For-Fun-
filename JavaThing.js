let count = parseInt(localStorage.getItem("clickCount")) || 0;

document.addEventListener("DOMContentLoaded", () => {
  updateCounterDisplay();
});

function updateCounterDisplay() {
  const counterEl = document.getElementById("counter");
  if (counterEl) {
    counterEl.innerText = `Button clicked ${count} time${count !== 1 ? "s" : ""}`;
  }
}

function incrementCounter() {
  count++;
  localStorage.setItem("clickCount", count);
  updateCounterDisplay();

  const button = document.querySelector("button");
  if (button) {
    button.classList.add("animate");
    setTimeout(() => button.classList.remove("animate"), 300);
  }
}

function resetCounter() {
  count = 0;
  localStorage.setItem("clickCount", count);
  updateCounterDisplay();
}

// Prevent double-tap zoom on mobile
let lastTouchEnd = 0;
document.addEventListener("touchend", function (event) {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);
