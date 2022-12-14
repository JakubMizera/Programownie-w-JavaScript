const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const setCanvasDimentions = (width = 800, height = 500) => {
  canvas.width = width;
  canvas.height = height;
};
setCanvasDimentions();

const update = () => {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawLines(ballsArray);
  drawBalls(ballsArray);
  if (!isPaused) {
    updatePositon(ballsArray);
  }

  requestAnimationFrame(update);
}

// Start button
const startBtn = document.getElementById("start");
startBtn.addEventListener('click', update);

// Stop button
let isPaused = false;
const stopBtn = document.getElementById("stop");
stopBtn.addEventListener('click', () => {
  isPaused = !isPaused;
})

// Canvas size input
const widthInput = document.getElementById("widthInput");
const heightInput = document.getElementById("heigthInput");

widthInput.addEventListener('change', () => {
  setCanvasDimentions(parseFloat(widthInput.value));
  refreshAnimation();
});
heightInput.addEventListener('change', () => {
  setCanvasDimentions(widthInput.value, parseFloat(heightInput.value));
  refreshAnimation();
});


// Number of balls input
const inputNumberOfBalls = document.getElementById("numOfBalls");
let numOfBalls = 20;
inputNumberOfBalls.addEventListener('change', () => {
  numOfBalls = parseFloat(inputNumberOfBalls.value);
  refreshAnimation();
});

// Refresh button
const refreshAnimation = () => {
  ballsArray = [];
  for (i = 0; i < numOfBalls; i++) {
    ballsArray[i] = new Ball();
  }
};
const btn = document.getElementById("btn");
btn.addEventListener("click", refreshAnimation);

class Ball {
  constructor() {
    // {x, y} = position of center of the ball
    this.ballSize = getRandomInt(15, 30);
    this.x = getRandomInt(this.ballSize, canvas.width - this.ballSize);
    this.y = getRandomInt(this.ballSize, canvas.height - this.ballSize);
    this.vx = Math.random() * (canvas.width / 1200);
    this.vy = Math.random() * (canvas.height / 800);
    this.connectedBalls = 0;
    this.color = "grey";
  }
};

let ballsArray = new Array(numOfBalls);
for (i = 0; i < ballsArray.length; i++) {
  ballsArray[i] = new Ball();
};

const drawLines = (ballsArray) => {
  for (i = 0; i < ballsArray.length; i++) {
    ballsArray[i].connectedBalls = 0;
  }

  for (i = 0; i < ballsArray.length; i++) {
    let connected = 0;
    for (j = i + 1; j < ballsArray.length; j++) {
      if (isCloseEnough(ballsArray[i], ballsArray[j], 100)) {
        ctx.beginPath();
        ctx.moveTo(ballsArray[i].x, ballsArray[i].y);
        ctx.lineTo(ballsArray[j].x, ballsArray[j].y);
        ctx.closePath();
        ctx.stroke();
        connected++;
        ballsArray[j].connectedBalls++;
      }
    }
    ballsArray[i].connectedBalls += connected;
  }
};

const isCloseEnough = (pointA, pointB, minDistance) => {
  const distance = Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2));
  return distance < minDistance;
};

const updatePositon = (ballsArray) => {
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
  }
};

const drawBalls = (ballsArray) => {
  for (const ball of ballsArray) {
    // Draw the ball at its new position
    ball.color = `hsl(${ball.connectedBalls * 320 / ballsArray.length * 2}, 80%, 50%)`;
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.ballSize, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
  }
};

const getCursorPosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  return { x, y };
};
canvas.addEventListener('mousedown', (e) => {
  const mouseXY = getCursorPosition(canvas, e);
  let deleteCounter = 0;
  ballsArray = ballsArray.filter((ball) => {
    if (isCloseEnough(mouseXY, ball, ball.ballSize)) {
      deleteCounter++;
      return false;
    }
    return true;
  });
  for (i = 0; i < deleteCounter; i++) {
    ballsArray.push(new Ball);
    ballsArray.push(new Ball);
  }
});


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};