const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const setCanvasDimentions = (width = 800, height = 500) => {
  canvas.width = width;
  canvas.height = height;
};
setCanvasDimentions();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

// Start button
const startBtn = document.getElementById("start");
startBtn.addEventListener('click', update);

// Canvas size input
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heigthInput");

widthInput.addEventListener('change', () => {
  setCanvasDimentions(parseFloat(widthInput.value));
  refreshAnimation();
})
heightInput.addEventListener('change', () => {
  setCanvasDimentions(widthInput.value, parseFloat(heightInput.value));
  refreshAnimation();
})


// Number of balls input
const inputNumberOfBalls = document.getElementById("numOfBalls");
let numOfBalls = 20;
inputNumberOfBalls.addEventListener('change', () => {
  numOfBalls = parseFloat(inputNumberOfBalls.value);
  refreshAnimation();
})

// Refresh button
const refreshAnimation = () => {
  ballsArray = [];
  for (i = 0; i < numOfBalls; i++) {
    ballsArray[i] = new Ball();
  }
}
const btn = document.getElementById("btn");
btn.addEventListener("click", refreshAnimation);

class Ball {
  constructor() {
    // {x, y} = position of center of the ball
    this.x = getRandomInt(15, canvas.width - 15);
    this.y = getRandomInt(15, canvas.height - 15);
    this.vx = Math.random() * 0.3;
    this.vy = Math.random() * 0.3;
    this.ballSize = getRandomInt(10, 15);
  }
}

let ballsArray = new Array(numOfBalls);
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
    if (ball.x < ball.ballSize || ball.x > canvas.width - ball.ballSize) {
      // If it has, reverse the ball's x velocity
      ball.vx = -ball.vx;
    }
    if (ball.y < ball.ballSize || ball.y > canvas.height - ball.ballSize) {
      // If it has, reverse the ball's y velocity
      ball.vy = -ball.vy;
    }

    // Draw the ball at its new position
    ctx.fillStyle = "grey";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.ballSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }

  const checkDistance = (arr) => {
    for (i = 0; i < arr.length; i++) {
      for (j = i + 1; j < arr.length; j++) {
        const dist = Math.sqrt(Math.pow((arr[i].x - arr[j].x), 2) + Math.pow((arr[i].y - arr[j].y), 2))
        if (dist < 100) {
          ctx.beginPath();
          ctx.moveTo(arr[i].x, arr[i].y);
          ctx.lineTo(arr[j].x, arr[j].y);
          ctx.closePath();
          ctx.stroke();
        }
      }
    }
  };
  checkDistance(ballsArray);

  requestAnimationFrame(update);
}