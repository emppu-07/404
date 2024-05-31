let speed = 20;
let scale = 0.25; // image scale
let canvas;
let ctx;
let video;
let logoColor;

let dvd = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    xspeed: 3,
    yspeed: 3,
};

(function main() {
    canvas = document.getElementById("tv-screen");
    ctx = canvas.getContext("2d");

    video = document.createElement('video');
    video.src = '0000-0199.mkv'; 
    video.loop = true;
    video.muted = true;
    video.play();

    video.onloadeddata = function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 50; 
        pickColor();
        setInitialDirection();
        update();
    }
})();

function setInitialDirection() {
    let directions = [
        { x: 3, y: 3 },
        { x: -3, y: 3 },
        { x: 3, y: -3 },
        { x: -3, y: -3 }
    ];
    let direction = directions[Math.floor(Math.random() * directions.length)];
    dvd.xspeed = direction.x;
    dvd.yspeed = direction.y;
}

function update() {
    setTimeout(() => {
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.globalCompositeOperation = 'source-in';
        ctx.fillStyle = logoColor;
        //ctx.fillRect(dvd.x, dvd.y, video.videoWidth * scale, video.videoHeight * scale);
        ctx.restore();

        ctx.drawImage(video, dvd.x, dvd.y, video.videoWidth * scale, video.videoHeight * scale);

        dvd.x += dvd.xspeed;
        dvd.y += dvd.yspeed;

        checkHitBox();
        update();
    }, speed);
}

function checkHitBox() {
    if (dvd.x + video.videoWidth * scale >= canvas.width || dvd.x <= 0) {
        dvd.xspeed *= -1;
        pickColor();
    }

    if (dvd.y + video.videoHeight * scale >= canvas.height || dvd.y <= 0) {
        dvd.yspeed *= -1;
        pickColor();
    }
}

function pickColor() {
    let r = Math.random() * 255;
    let g = Math.random() * 255;
    let b = Math.random() * 255;

    logoColor = `rgb(${r},${g},${b})`;
}
