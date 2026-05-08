// Get the body element
const body = document.body;

// Toggle between two colors every 500ms
setInterval(() => {
  if (body.style.backgroundColor === 'black') {
    body.style.backgroundColor = 'white';
  } else {
    body.style.backgroundColor = 'black';
  }
}, 250); 
