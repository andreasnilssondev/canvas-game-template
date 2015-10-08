document.addEventListener('DOMContentLoaded', function () {
	var keys = [];

	var canvas = document.getElementById('canvas');
	canvas.width = 600;
	canvas.height = 400;
	
	var ctx = canvas.getContext('2d');

	var movingObject = {};
	movingObject.posX = 0;
	movingObject.posY = 0;
	movingObject.height = 50;
	movingObject.width = 50;
	movingObject.speed = 5;

	document.addEventListener('keydown', function (e) {
		if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
			e.preventDefault();

			var addKey = true;
			keys.forEach(function (key) {
				if (e.keyCode === key) {
					addKey = false;
				}
			});
			if (addKey) {
				keys.push(e.keyCode);
			}
		}
	});

	document.addEventListener('keyup', function (e) {
		if (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) {
			e.preventDefault();

			keys.forEach(function (key, i) {
				if (e.keyCode === key) {
					keys.splice(i, 1);
				}
			});
		}
	});

	

	function update() {
		keys.forEach(function (key) {
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
});
