const body = document.body;

setInterval(() => {
  if (body.style.backgroundColor === 'black') {
    body.style.backgroundColor = 'white';
  } else {
    body.style.backgroundColor = 'black';
  }
}, 250); 
