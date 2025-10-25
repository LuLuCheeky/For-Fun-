// Load the counter from localStorage or default to 0
let count = localStorage.getItem("clickCount") ? parseInt(localStorage.getItem("clickCount")) : 0;

// Update the counter display on page load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("counter").innerText = `Button clicked ${count} times`;
});

function incrementCounter() {
  count++;
  localStorage.setItem("clickCount", count); // Save to localStorage
  document.getElementById("counter").innerText = `Button clicked ${count} times`;

  const button = document.querySelector("button");
  button.classList.add("animate");

  setTimeout(() => {
    button.classList.remove("animate");
  }, 300); // match animation duration
}

