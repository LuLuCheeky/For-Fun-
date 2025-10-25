// Load the counter from localStorage or default to 0
let count = parseInt(localStorage.getItem("clickCount")) || 0;

// Update the counter display on page load
document.addEventListener("DOMContentLoaded", () => {
  const counterEl = document.getElementById("counter");
  if (counterEl) {
    counterEl.innerText = `Button clicked ${count} times`;
  }
});

// Increment counter and animate button
function incrementCounter() {
  count++;
  localStorage.setItem("clickCount", count); // Save to localStorage

  const counterEl = document.getElementById("counter");
  if (counterEl) {
    counterEl.innerText = `Button clicked ${count} times`;
  }

  const button = document.querySelector("button");
  if (button) {
    button.classList.add("animate");

    setTimeout(() => {
      button.classList.remove("animate");
    }, 300); // match animation duration
  }
}

// Prevent double-tap zoom on mobile
let lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);

