// toto budeš potřebovat později
/*
if (!( panacekX + panacekSirka < minceX || minceX + minceSirka < panacekX || panacekY + panacekVyska < minceY || minceY + minceVyska < panacekY)) {
	// panacek a mince se prekryvaji
}
*/


// sem začni psát svůj program

var moveSpeed = 20;
var panacekXPos; 
var panacekYPos;  
var panacekWidth;
var panacekHeight;
var isMusicPlaying = false;

var minceXPos; 
var minceYPos;  
var minceWidth;
var minceHeight;


// PANACEK & MINCE START POSITION
function initialize() {
	let panacek = document.getElementById('panacek');
	panacekWidth = panacek.clientWidth;
	panacekHeight = panacek.clientHeight;

	let mince = document.getElementById('mince');
	minceWidth = mince.clientWidth;
	minceHeight = mince.clientHeight;
	// not in pixels

	panacekXPos = (window.innerWidth - panacekWidth)/2;
	panacekYPos = (window.innerHeight - panacekHeight)/2; 
	
	setElementPosition(panacek, panacekXPos, panacekYPos);

	randomizeMincePosition();
}


// RANDOMIZE COIN PLACEMENT
function randomizeMincePosition() {
	let mince = document.getElementById('mince');

	minceXPos = Math.floor(Math.random() * (window.innerWidth - minceWidth));
	minceYPos = Math.floor(Math.random() * (window.innerHeight - minceHeight));

	setElementPosition(mince, minceXPos, minceYPos);
}


// PANACEK MOVES RIGHT LEFT UP DOWN + MUSIC START
function handleOnKeyDown(keyboardEvent) {
	let panacek = document.getElementById('panacek');
	console.log(keyboardEvent.key);

	if (isMusicPlaying === false) {
		let bgMusic = document.getElementById('bgmusic');
		bgMusic.play();
		console.log('playing music');
		isMusicPlaying = true;
	}


	if (keyboardEvent.key === "ArrowDown") {
		movePanacek(panacek, 0, moveSpeed);
		panacek.src = "obrazky/panacek.png";
	}

	else if (keyboardEvent.key === "ArrowUp") {
		movePanacek(panacek, 0, -moveSpeed);
		panacek.src = "obrazky/panacek-nahoru.png";
	}

	else if (keyboardEvent.key === "ArrowRight") {
		movePanacek(panacek, moveSpeed, 0);
		panacek.src = "obrazky/panacek-vpravo.png";
	}

	else if (keyboardEvent.key === "ArrowLeft") {
		movePanacek(panacek, -moveSpeed, 0);
		panacek.src = "obrazky/panacek-vlevo.png";
	}
} 



//PANACEK MOVES SOMEWHERE AND FACEPLANTS WALLS
function movePanacek(panacek, xDelta, yDelta) {
	let desiredXPos = panacekXPos + xDelta;
	let desiredYPos = panacekYPos + yDelta;

	let maxXPos = window.innerWidth - panacekWidth;
	let maxYPos = window.innerHeight - panacekHeight;

	if (desiredXPos < 0) {
		panacekXPos = 0;
	}
	else if (desiredXPos > maxXPos) {
		panacekXPos = maxXPos;
	}
	else {
		panacekXPos = desiredXPos;
	}

	if (desiredYPos < 0) {
		panacekYPos = 0;
	}
	else if (desiredYPos > maxYPos) {
		panacekYPos = maxYPos;
	}
	else {
		panacekYPos = desiredYPos;
	}


	setElementPosition(panacek, panacekXPos, panacekYPos);

	//COIN RANDOM PLACEMENT UPON FACEPLANT + COIN GOTCHA SOUND
	if (
		!(
		panacekXPos + panacekWidth < minceXPos ||
		minceXPos + minceWidth < panacekXPos ||
		panacekYPos + panacekHeight < minceYPos ||
		minceYPos + minceHeight < panacekYPos )) 
		
		{
			randomizeMincePosition();
			
			let coinCollectSound = document.getElementById('zvukmince');
			coinCollectSound.play();

		}

		

}


function setElementPosition(element, xPos, yPos) {
	element.style.left = xPos + 'px';
	element.style.top = yPos + 'px';
}







//function setPanacekDirection()



