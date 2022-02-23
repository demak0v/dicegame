let blinkingGr = document.querySelector('.name-heading span');


let gameNameText = document.querySelector('.name-heading');
let spanOfName = document.querySelector('.name-heading>span');
let fontSizeOfGameName = parseFloat(window.getComputedStyle(gameNameText).getPropertyValue("font-size"));
gameNameText.style.fontSize = fontSizeOfGameName + "px";

//могу еще создать функцию, которая оборачивает в спан и тогда для многих подойдет, надо попробовать
// DEFENETILY MAKE THIS FOR ANY TEXT KIND OF FUNCTION (AT LEAST LINE OF TEXT)
//ADJUSTIBLE FONT SIZE

let dynamicFont = function changeFont() {
  if (screen.width > 1024) {
    while (gameNameText.offsetWidth < spanOfName.offsetWidth) {
      --fontSizeOfGameName;
      gameNameText.style.fontSize = fontSizeOfGameName + "px";
    }
    while (gameNameText.offsetWidth > spanOfName.offsetWidth) {
      ++fontSizeOfGameName;
      gameNameText.style.fontSize = fontSizeOfGameName + "px";
    }
  } else {
    gameNameText.style.fontSize = '';
  }
}


addEventListener('resize', dynamicFont);
addEventListener('load', dynamicFont);

//ADJUSTIBLE TEXT RULES SIZE

let rulesBlock = document.querySelector('.game-rules-text');
let rulesBlocklength = rulesBlock.offsetWidth;
rulesBlock.style.width = spanOfName.offsetWidth + "px";

let rulesResizing = function rulesSize() {
  if (screen.width > 1024) {
    rulesBlock.style.width = spanOfName.offsetWidth + "px";
    rulesBlock.style.fontSize = fontSizeOfGameName * 0.18 + "px";
  } else {
    rulesBlock.style.fontSize = '';
    rulesBlock.style.width = '';
  }
}

addEventListener('resize', rulesResizing);
addEventListener('load', rulesResizing);

// INPUT AND INPUT BUTTON
let inputPlayer1 = document.getElementById('input-player1');
let inputPlayer2 = document.getElementById('input-player2');
let checkButtonPlayer1 = document.querySelectorAll('.input-and-button label')[0];
let checkButtonPlayer2 = document.querySelectorAll('.input-and-button label')[1];

//BUTTON NEAR INPUT WHEN FOCUSED
inputPlayer1.addEventListener('focus', () => checkButtonPlayer1.classList.remove('hidden'));
// inputPlayer1.addEventListener('blur', () => checkButtonPlayer1.classList.add('hidden'));
inputPlayer2.addEventListener('focus', () => checkButtonPlayer2.classList.remove('hidden'));
// inputPlayer2.addEventListener('blur', () => checkButtonPlayer2.classList.add('hidden'));

//INPUT NAME INTO TEXT ONSCREEN
let inputAndButtonPlayer1 = document.querySelectorAll('.input-and-button')[0];
let inputAndButtonPlayer2 = document.querySelectorAll('.input-and-button')[1];

if (inputPlayer1.value === '') {
  playerName1 = 'Player 1';
}

function placeNamePlayer1() {
  if (event.key === 'Enter' || event.detail !== 0) {
    if (inputPlayer1.value != '') {
      this.parentElement.classList.add('player-heading');
      this.parentElement.textContent = inputPlayer1.value;
    }
  }
  return playerName1 = inputPlayer1.value.toUpperCase();
}

if (inputPlayer2.value === '') {
  playerName2 = 'Player 2';
}

function placeNamePlayer2() {
  if (event.key === 'Enter' || event.detail !== 0) {
    if (inputPlayer2.value != '') {
      this.parentElement.classList.add('player-heading');
      this.parentElement.textContent = inputPlayer2.value;
      playerName2 = inputPlayer2.value.toUpperCase();
    }
  }
  return playerName2
}

inputPlayer1.addEventListener('keydown', placeNamePlayer1);
checkButtonPlayer1.addEventListener('click', placeNamePlayer1);
inputPlayer2.addEventListener('keydown', placeNamePlayer2);
checkButtonPlayer2.addEventListener('click', placeNamePlayer2);


//CREATING RANDOM NUMBER ON BUTTON PRESS
let myButton = document.querySelector('.button label');
let playerDice1 = document.querySelectorAll('.cube')[0];
let playerDice2 = document.querySelectorAll('.cube')[1];
let heartsOfPlayer1 = Array.from(document.querySelectorAll(".heart-image")).splice(0, 3);
let heartsOfPlayer2 = Array.from(document.querySelectorAll(".heart-image")).splice(3);

let firstPlayerLives = 3;
let secondPlayerLives = 3;


//rolling dice ANIMATION

function cubeAnimation() {
  let start;
  let randomXAxis = (-Math.round(Math.random())) ** (Math.round(Math.random()) + 1);
  let yAxis = randomXAxis + 1.1;
  let zAxis = randomXAxis - 1.1;
  myButton.removeEventListener('click', randomNumber1To6);

  function cubeRotate(timestamp) {
    if (start === undefined) {
      start = timestamp;
    }

    let elapsed = timestamp - start;
    const count = elapsed;

    playerDice1.style.transform = 'rotate3d(' + randomXAxis + ',' + yAxis + ',' + zAxis + ',' + count * 10 + 'deg)';
    playerDice2.style.transform = 'rotate3d(' + (-randomXAxis) + ',' + yAxis + ',' + (-zAxis) + ',' + count * 10 + 'deg)';

    if (elapsed < 300) {
      window.requestAnimationFrame(cubeRotate);
    } else {
      restylingTransform();
      myButton.addEventListener('click', randomNumber1To6);
    }
    return elapsed;
  }
  window.requestAnimationFrame(cubeRotate);
}

function restylingTransform() {
  playerDice1.style.transform = '';
  playerDice2.style.transform = '';
}

//change console.log for actions

function outcomeOnDice(num1, num2) {
  playerDice1.classList.add("outcome-" + num1 + "");
  playerDice2.classList.add("outcome-" + num2 + "");
}

function randomNumber1To6() {
  let firstPlayerNumber = Math.floor(Math.random() * 6 + 1);
  let secondPlayerNumber = Math.floor(Math.random() * 6 + 1);

  let i = 0;
  while (i <= 6) {
    i++
    playerDice1.classList.remove("outcome-" + i + "");
    playerDice2.classList.remove("outcome-" + i + "");
  }

  if (firstPlayerLives > 0 && secondPlayerLives > 0) {
    if (firstPlayerNumber > secondPlayerNumber) {
      console.log('Player1 wins this round');
      console.log(firstPlayerNumber, secondPlayerNumber);
      cubeAnimation();
      outcomeOnDice(firstPlayerNumber, secondPlayerNumber);
      setTimeout(()=>{heartsOfPlayer2[secondPlayerLives].classList.add('grayscale');}, 400);
      --secondPlayerLives;
    } else if (secondPlayerNumber > firstPlayerNumber) {
      console.log('Player2 wins this round');
      console.log(firstPlayerNumber, secondPlayerNumber);
      cubeAnimation();
      outcomeOnDice(firstPlayerNumber, secondPlayerNumber);
      setTimeout(()=>{heartsOfPlayer1[firstPlayerLives].classList.add('grayscale');}, 400);
      --firstPlayerLives;
    } else {
      console.log('Draw');
      console.log(firstPlayerNumber, secondPlayerNumber);
      cubeAnimation();
      outcomeOnDice(firstPlayerNumber, secondPlayerNumber);
    }
  } else {
    console.log('Game ended');
  }
}


//WINNING SLIDE
let textForWinner = document.querySelector('.winner-container');
let spaceForNameWinner = document.getElementById('winner-name');
let spaceForAnotherNameWinner = document.getElementById('winner-name1');
let spaceForAnotherNameWinner2 = document.getElementById('winner-name2');
let spaceForNameLoser = document.getElementById('loser-name');
let gameContainer = document.querySelector('.game-section');

function winnerSlide() {
  //this function inserts names to empty spans in the winning slide
  function insertNames(playerNameWon, playerNameLost) {
    textForWinner.classList.remove('hidden');
    gameContainer.classList.add('blur-grayscale');
    spaceForNameWinner.innerText = playerNameWon;
    spaceForAnotherNameWinner.innerText = playerNameWon;
    spaceForAnotherNameWinner2.innerText = playerNameWon;
    spaceForNameLoser.innerText = playerNameLost;
  }

  if (firstPlayerLives === 0) {
    insertNames(playerName2, playerName1);
  } else if (secondPlayerLives === 0) {
    insertNames(playerName1, playerName2);
  }
}

myButton.addEventListener('click', randomNumber1To6);
myButton.addEventListener('click', ()=>{setTimeout(winnerSlide, 650)});

//WINNING SLIDE TRY AGAIN BUTTON
let tryAgainButton = document.getElementById('try-again');

function gameRestart() {
  firstPlayerLives = 3;
  secondPlayerLives = 3;
  for (let i = 0; i < 3; i++) {
    heartsOfPlayer1[i].classList.remove('grayscale');
    heartsOfPlayer2[i].classList.remove('grayscale');
  }
  textForWinner.classList.add('hidden');
  gameContainer.classList.remove('blur-grayscale');
}

tryAgainButton.addEventListener('click', gameRestart);

//REMOVING NOWRAP FROM NAME HEADING
let winnerHeading = document.querySelector('.winner-container h1');

function removeNoWrap() {
  if (window.innerWidth <= 1143 || screen.width <= 1143) {
    winnerHeading.classList.remove('nowrap');
  } else {
    winnerHeading.classList.add('nowrap');
  }
}

window.addEventListener('resize', removeNoWrap);
window.addEventListener('load', removeNoWrap);
