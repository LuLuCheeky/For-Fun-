// Get the body element
const body = document.body;

// Toggle between two colors every 500ms
setInterval(() => {
  if (body.style.backgroundColor === 'red') {
    body.style.backgroundColor = 'black';
  } else {
    body.style.backgroundColor = 'red';
  }
}, 500); 
