var canvas = document.getElementById('canvas');
canvas.width = 600;
canvas.height = 400;

var ctx = canvas.getContext('2d');

var movingObject = {
	posX: 0,
	posY: 0,
	height: 50,
	width: 50,
	speed: 5
};

var arrowKeys = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down'
};

var currentKeys = [];

function handleKeyDown (e) {
	if (arrowKeys[e.keyCode]) {
		e.preventDefault();

		var addKey = true;

		currentKeys.forEach(function (key) {
			if (e.keyCode === key) {
				addKey = false;
			}
		});

		if (addKey) {
			currentKeys.push(e.keyCode);
		}
	}
}

function handleKeyUp (e) {
	if (arrowKeys[e.keyCode]) {
		e.preventDefault();

		currentKeys.forEach(function (key, i) {
			if (e.keyCode === key) {
				currentKeys.splice(i, 1);
			}
		});
	}
}

document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

function update() {
	currentKeys.forEach(function (key) {
		switch(key) {
			case 37:
				// left
				if (movingObject.posX > 0) {
					movingObject.posX -= movingObject.speed;
				}
				break;
			case 38:
				// up
				if (movingObject.posY > 0) {
					movingObject.posY -= movingObject.speed;
				}
				break;
			case 39:
				// right
				if (movingObject.posX < canvas.width - movingObject.width) {
					movingObject.posX += movingObject.speed;
				}
				break;
			case 40:
				// down
				if (movingObject.posY < canvas.height - movingObject.height) {
					movingObject.posY += movingObject.speed;
				}
				break;
		}
	});
}

function render() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	ctx.fillStyle = 'red';
	ctx.fillRect(movingObject.posX, movingObject.posY, movingObject.width, movingObject.height);
}

function gameLoop() {
	update();
	render();
	requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
