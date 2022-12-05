const ball = document.querySelector(".ball");
const playground = document.querySelector(".playground");
const output = document.querySelector(".output");
const hole = document.querySelector(".hole");
const showTime = document.querySelector(".showTime");

const maxX = playground.clientWidth - ball.clientWidth; //580px
const maxY = playground.clientHeight - ball.clientHeight; //580px

hole.style.top = `${Math.floor(Math.random() * 400)}px`;
hole.style.left = `${Math.floor(Math.random() * 400)}px`;

let sec = 0;
const timer = setInterval(() => {
    showTime.innerHTML = `Time: ${sec} s`;
    sec++;
}, 1000);

const onDeviceMove = event => {
    let x = event.gamma;
    let y = event.beta;

    if (y > 90) {
        y = 90;
    };

    if (y < -90) {
        y = -90;
    }

    x += 90;
    y += 90;

    ball.style.top = `${(maxY * y) / 180 + 10}px`;
    ball.style.left = `${(maxX * x) / 180 + 10}px`;
    //console.log(parseInt(ball.style.top));
    console.log(parseInt(ball.style.left));

    const checkPosition = ([ball, hole], targetNumber) => {
        const topBall = parseInt(ball.style.top);
        const topHole = parseInt(hole.style.top);
        const leftBall = parseInt(ball.style.left);
        const leftHole = parseInt(hole.style.left);
        return (
            (topBall < (topHole + targetNumber) && topBall > (topHole - targetNumber))
            && (leftBall < (leftHole + targetNumber) && leftBall > (leftHole - targetNumber))
        );
    }

    if (checkPosition([ball, hole], 2)) {
        window.alert('ball in a hole');

        clearInterval(timer);
        document.location.reload(true);
    }

};




window.addEventListener('deviceorientation', onDeviceMove);