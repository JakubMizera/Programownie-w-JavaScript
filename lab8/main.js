const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const setCanvasDimentions = () => {
  canvas.width = 500;
  canvas.height = 500;
}
setCanvasDimentions();

class Ball {
  constructor() {
    this.x = Math.random() * 500;
    this.y = Math.random() * 500;
    this.vx = Math.random() * 0.5;
    this.vy = Math.random() * 0.5;
  }
}

const ballsArray = new Array(5);
for (i = 0; i < ballsArray.length; i++) {
  ballsArray[i] = new Ball();
}


function update() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const ball of ballsArray) {
    // Move the ball by its velocity
    ball.x += ball.vx;
    ball.y += ball.vy;

    // Check if the ball has reached the edge of the canvas
    if (ball.x < 0 || ball.x > canvas.width) {
      // If it has, reverse the ball's x velocity
      ball.vx = -ball.vx;
    }
    if (ball.y < 0 || ball.y > canvas.height) {
      // If it has, reverse the ball's y velocity
      ball.vy = -ball.vy;
    }

    // Draw the ball at its new position
    ctx.fillStyle = "grey";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 10, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Rysownie linii: ctx.beginPath(), ctx.moveTo(), ctx.lineTo()


  requestAnimationFrame(update);
}

update();