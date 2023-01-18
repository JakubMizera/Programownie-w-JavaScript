const numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (let i = 0; i < numberOfDrumButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        const buttonInnerHTML = this.innerHTML;
        makeSound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML);
    });
}

document.addEventListener("keypress", function (event) {
    makeSound(event.key);
    buttonAnimation(event.key);
});

function makeSound(key) {
    switch (key) {
        case "q":
            const boom = new Audio('/lab3/sounds/boom.wav');
            boom.play();
            break;
        case "w":
            const clap = new Audio('/lab3/sounds/clap.wav');
            clap.play();
            break;
        case "e":
            const hihat = new Audio('/lab3/sounds/hihat.wav');
            hihat.play();
            break;
        case "a":
            const kick = new Audio('/lab3/sounds/kick.wav');
            kick.play();
            break;
        case "s":
            const openhat = new Audio('/lab3/sounds/openhat.wav');
            openhat.play();
            break;
        case "d":
            const ride = new Audio('/lab3/sounds/ride.wav');
            ride.play();
            break;
        case "z":
            const snare = new Audio('/lab3/sounds/snare.wav');
            snare.play();
            break;
        case "x":
            const tink = new Audio('/lab3/sounds/tink.wav');
            tink.play();
            break;
        case "c":
            const tom = new Audio('/lab3/sounds/tom.wav');
            tom.play();
            break;
        default: console.log(key);
    }
}

function buttonAnimation(currentKey) {
    const activeButton = document.querySelector("." + currentKey);

    activeButton.classList.add("pressed");

    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100);
}