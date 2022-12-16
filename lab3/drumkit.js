var numberOfDrumButtons = document.querySelectorAll(".drum").length;

for (var i = 0; i < numberOfDrumButtons; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        var buttonInnerHTML = this.innerHTML;
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
        case "b":
            var boom = new Audio('/lab3/sounds/boom.wav');
            boom.play();
            break;
        case "c":
            var clap = new Audio('/lab3/sounds/clap.wav');
            clap.play();
            break;
        case "h":
            var hihat = new Audio('/lab3/sounds/hihat.wav');
            hihat.play();
            break;
        case "k":
            var kick = new Audio('/lab3/sounds/kick.wav');
            kick.play();
            break;
        case "o":
            var openhat = new Audio('/lab3/sounds/openhat.wav');
            openhat.play();
            break;
        case "r":
            var ride = new Audio('/lab3/sounds/ride.wav');
            ride.play();
            break;
        case "s":
            var snare = new Audio('/lab3/sounds/snare.wav');
            snare.play();
            break;
        case "t":
            var tink = new Audio('/lab3/sounds/tink.wav');
            tink.play();
            break;
        case "to":
            var tom = new Audio('/lab3/sounds/tom.wav');
            tom.play();
            break;
        default: console.log(key);
    }
}

function buttonAnimation(currentKey) {
    var activeButton = document.querySelector("." + currentKey);

    activeButton.classList.add("pressed");

    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 100);
}