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
var panacekDisplayStyle;

var minceXPos; 
var minceYPos;  
var minceWidth;
var minceHeight;
var minceDisplayStyle;

var scoreValue = 0;

var isGameStarted = false;


// INTRO BOX
function initialize() {
	let panacek = document.getElementById('panacek');
	let mince = document.getElementById('mince');

	panacekDisplayStyle = panacek.style.display;
	minceDisplayStyle = mince.style.display;

	panacek.style.display = "none";
	mince.style.display = "none";
}



//GAME START - PANACEK & MINCE START POSITION + MUSIC START
function gameStart() {
	let panacek = document.getElementById('panacek');
	let mince = document.getElementById('mince');

	panacek.style.display = panacekDisplayStyle;
	mince.style.display = minceDisplayStyle;

	panacekWidth = panacek.clientWidth;
	panacekHeight = panacek.clientHeight;


	minceWidth = mince.clientWidth;
	minceHeight = mince.clientHeight;
	// not in pixels

	panacekXPos = (window.innerWidth - panacekWidth)/2;
	panacekYPos = (window.innerHeight - panacekHeight)/2; 
	
	setElementPosition(panacek, panacekXPos, panacekYPos);

	randomizeMincePosition();

	let introDiv = document.getElementById('introbox');
	introDiv.style.display = "none";

	let bgMusic = document.getElementById('bgmusic');
	bgMusic.play();
	console.log('playing music');

	isGameStarted = true;
}


// RANDOMIZE COIN PLACEMENT
function randomizeMincePosition() {
	let mince = document.getElementById('mince');

	minceXPos = Math.floor(Math.random() * (window.innerWidth - minceWidth));
	minceYPos = Math.floor(Math.random() * (window.innerHeight - minceHeight));

	setElementPosition(mince, minceXPos, minceYPos);
}


// PANACEK MOVES RIGHT LEFT UP DOWN
function handleOnKeyDown(keyboardEvent) {
	if (!isGameStarted) {
		return;
	}

	let panacek = document.getElementById('panacek');
	console.log(keyboardEvent.key);


	if (keyboardEvent.key === "ArrowDown" || keyboardEvent.key === "s") {
		movePanacek(panacek, 0, moveSpeed);
		panacek.src = "obrazky/panacek.png";
	}

	else if (keyboardEvent.key === "ArrowUp" || keyboardEvent.key === "w") {
		movePanacek(panacek, 0, -moveSpeed);
		panacek.src = "obrazky/panacek-nahoru.png";
	}

	else if (keyboardEvent.key === "ArrowRight" || keyboardEvent.key === "d") {
		movePanacek(panacek, moveSpeed, 0);
		panacek.src = "obrazky/panacek-vpravo.png";
	}

	else if (keyboardEvent.key === "ArrowLeft" || keyboardEvent.key === "a") {
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

			let scoreCounter = document.getElementById('score');
			scoreValue = scoreValue + 1;
			scoreCounter.innerText = scoreValue;

			if (scoreValue === 5) {
				let victoryMusic = document.getElementById('zvukfanfara');
				victoryMusic.play();
				setTimeout(showVictoryAlert, 100);
			} 
		}	
}


function setElementPosition(element, xPos, yPos) {
	element.style.left = xPos + 'px';
	element.style.top = yPos + 'px';
}

function showVictoryAlert() {
	alert("Máš 5 bodov! Gratulujem k výhre!");
}
