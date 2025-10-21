let count = 0;

function incrementCounter() {
  count++;
  document.getElementById("counter").innerText = `Button clicked ${count} times`;

  const button = document.querySelector("button");
  button.classList.add("animate");

  setTimeout(() => {
    button.classList.remove("animate");
  }, 300); // match animation duration
}
