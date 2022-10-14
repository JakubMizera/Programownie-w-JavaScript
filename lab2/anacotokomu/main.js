let i = 0;
const images = [];
const time = 2000;

images[0] = 'images/image-1.jpg';
images[1] = 'images/image-2.jpg';
images[2] = 'images/image-3.jpg';
images[3] = 'images/image-4.jpg';

const changeImg = () => {
    document.slide.src = images[i];

    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }
    // why is this function is qoutes?
    setTimeout("changeImg()", time);
}

window.onload = changeImg;