const ball = document.querySelector(".ball");
const playground = document.querySelector(".playground");
const output = document.querySelector(".output");
const hole = document.querySelector(".hole");

const maxX = playground.clientWidth - ball.clientWidth; //580px
const maxY = playground.clientHeight - ball.clientHeight; //580px

hole.style.top = `${Math.floor(Math.random() * 400)}px`;
hole.style.left = `${Math.floor(Math.random() * 400)}px`;

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

    ball.style.top = `${(maxY * y) / 180}px`;
    ball.style.left = `${(maxX * x) / 180}px`;
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

    if (checkPosition([ball, hole], 5)) {
        window.alert('ball in a hole');
    }
};

window.addEventListener('deviceorientation', onDeviceMove);