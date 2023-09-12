const dvdLogo = document.querySelector('.dvd-logo');
const container = document.querySelector('.dvd-container');

let x = 200; // initial x position
let y = 150; // initial y position
let xSpeed = 2; // horizontal speed
let ySpeed = 3; // vertical speed

function moveLogo() {
  // update position
  x += xSpeed;
  y += ySpeed;
  
  // reverse direction when hitting edges
  if (x + dvdLogo.clientWidth >= container.clientWidth || x <= 0) {
    xSpeed = -xSpeed;
  }
  if (y + dvdLogo.clientHeight >= container.clientHeight || y <= 0) {
    ySpeed = -ySpeed;
  }
  
  // move logo
  dvdLogo.style.transform = `translate(${x}px, ${y}px)`;
  
  // schedule next frame
  requestAnimationFrame(moveLogo);
}

// start animation
moveLogo();