// Game window
const gap = 90;
const cvs = document.getElementById("canvas");
const ctx = cvs.getContext("2d");
document.addEventListener("keydown", jump);

// Bird position
let posX = 10;
let posY = 150;
let gravitation = 1.5;

// Generator
let pipe = [];
pipe[0] = {
	x : cvs.width,
	y : 0
}

// Resources
const bg = new Image();
const bird = new Image();
const base = new Image();
const pipeUp = new Image();
const pipeDown = new Image();
bg.src = "images/bg.png";
bird.src = "images/bird.png";
base.src = "images/base.png";
pipeUp.src = "images/pipeUp.png";
pipeDown.src = "images/pipeDown.png";

// Functions
function jump() {
	posY -= 35;
}

function draw() {
	ctx.drawImage(bg, 0, 0);

	for(let i = 0; i < pipe.length; i++) {
		ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage(pipeDown, pipe[i].x, pipe[i].y + pipeUp.height + gap);
		pipe[i].x--;

		if(pipe[i].x == 125) {
			pipe.push({
				x : cvs.width,
				y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
			})
		}
		if(posX + bird.width >= pipe[i].x && posX <= pipe[i].x + pipeUp.width && (posY <= pipe[i].y + pipeUp.height || posY + bird.height >= pipe[i].y + pipeUp.height + gap) || posY + bird.height >= cvs.height - base.height) {
			location.reload();
		}
	}

	ctx.drawImage(base, 0, cvs.height - base.height);
	ctx.drawImage(bird, posX, posY);

	posY += gravitation;
	requestAnimationFrame(draw);
}

pipeDown.onload = draw;