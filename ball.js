import { hasSpaceBeenPressed } from "./pad.js";

let collidedRight = false;
let collidedTop = false;
let collidedLeft = false;
let collidedPad = false;

let movingRight = true;
let movingLeft = false;
let goingUp = true;
let goindDown = false;
let firstX = 0;
let secondX = 0;
let difference;


function ballDirectionOne(gameBoard) {
  let ball = document.querySelector(".ball");
  let ballRect = ball.getBoundingClientRect();
  firstX = ballRect.x;
  return firstX
}

function ballDirectionTwo(gameBoard) {
  let ball = document.querySelector(".ball");
  let ballRect = ball.getBoundingClientRect();
  secondX = ballRect.x

  if (secondX - firstX){
    console.log('less than zero');
  }else{
    console.log('greater than zero')
  }
}


function drawBall(gameBoard) {
  let newball = document.createElement("div");
  newball.classList.add("ball");
  gameBoard.appendChild(newball);
}

function moveBall(gameBoard) {
  let ball = document.querySelector(".ball");
  let ballRect = ball.getBoundingClientRect();
  let ballValues = window.getComputedStyle(ball);
  let ballColumn = parseInt(ballValues.gridColumnStart);
  let ballRow = parseInt(ballValues.gridRowStart);

  let paddle = document.querySelector(".pad");
  let padRect = paddle.getBoundingClientRect();

  if (hasSpaceBeenPressed.ball & !collidedRight & !collidedTop & !collidedLeft & !collidedPad) {
    ball.style.gridColumnStart = ballColumn + 1; 
    ball.style.gridRowStart = ballRow - 1;
  }
}

function checkWallCollision() {
  let ball = document.querySelector(".ball");
  let ballValues = window.getComputedStyle(ball);
  let ballColumn = parseInt(ballValues.gridColumnStart);
  let ballRow = parseInt(ballValues.gridRowStart);

  let gameBoar = document.getElementById("game-board");

  let boardRect = gameBoar.getBoundingClientRect();

  let mainball = document.querySelector(".ball");

  let ballRect = mainball.getBoundingClientRect();
  //console.log(ballRect.y);

  if (ballRect.right.toFixed(2) == boardRect.right.toFixed(2)) {
    collidedRight = true;
    collidedTop = false;
    collidedLeft = false;
    collidedPad = false;
  }

  if (collidedRight) {
    ball.style.gridColumnStart = ballColumn - 1;
    ball.style.gridRowStart = ballRow - 1;
  }

  if (ballRect.top.toFixed(2) == boardRect.top.toFixed(2)) {
    collidedRight = false;
    collidedTop = true;
    collidedLeft = false;
    collidedPad = false;
  }

  if (collidedTop) {
    //change direction
    ball.style.gridColumnStart = ballColumn - 1;
    ball.style.gridRowStart = ballRow + 1;
  }

  if (ballRect.left.toFixed(2) == boardRect.left.toFixed(2)) {
    collidedRight = false;
    collidedTop = false;
    collidedLeft = true;
    collidedPad = false;
  }

  if (collidedLeft) {
    //change direction
    ball.style.gridColumnStart = ballColumn + 1;
    ball.style.gridRowStart = ballRow + 1;
  }
}

function checkPadCollision() {
  let ball = document.querySelector(".ball");
  let ballValues = window.getComputedStyle(ball);
  let ballColumn = parseInt(ballValues.gridColumnStart);
  let ballRow = parseInt(ballValues.gridRowStart);

  let paddle = document.querySelector(".pad");
  let padValues = window.getComputedStyle(paddle);

  let ballBottom = parseInt(ballValues.gridRowStart);
  let ballCStart = parseInt(ballValues.gridColumnStart);

  let padLeft = parseInt(padValues.gridColumnStart);
  let padRight = parseInt(padValues.gridColumnEnd);
  let padRow = parseInt(padValues.gridRowStart);



  if (padLeft <= ballCStart - 1 && ballCStart <= padRight && ballBottom == padRow) {
    collidedPad = true;
    collidedRight = false;
    collidedTop = false;
    collidedLeft = false;
  }
  if (collidedPad) {
    ball.style.gridRowStart = ballRow - 1;
    ball.style.gridColumnStart = ballColumn - 1;
  }
}

function deadBall() {
  let ball = document.querySelector(".ball");
  let ballValues = window.getComputedStyle(ball);

  let paddle = document.querySelector(".pad");
  let padValues = window.getComputedStyle(paddle);

  let ballBottom = parseInt(ballValues.gridRowStart);

  let padRow = parseInt(padValues.gridRowStart);

  if (hasSpaceBeenPressed.ball) {
    if (ballBottom == padRow + 1) {
      window.location.reload();
    }
  }
}

export { drawBall, moveBall, checkWallCollision, checkPadCollision, deadBall, ballDirectionOne, ballDirectionTwo };
