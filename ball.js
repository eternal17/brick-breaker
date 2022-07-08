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
  let game = document.getElementById("game-board");

  let a
  let b 

 // let ballRect = ball.getBoundingClientRect();
  let ballValues = window.getComputedStyle(ball);
  let boardValues = window.getComputedStyle(game);

let numberOfRows = boardValues.gridTemplateRows.split(' ').length

if ( ballValues.gridColumnStart == numberOfRows -2 || ballValues.gridColumnStart == 2) {
  a = ballValues.gridRowStart
  console.log('a', a);
}else if ( ballValues.gridColumnStart  == numberOfRows -1){
  b = ballValues.gridRowStart
  console.log('b', b);
}



  //firstX = ballRect.x;
 // firstX = ballValues.gridRowStart
 // console.log("firstX", firstX);
// return firstX;
}

function ballDirectionTwo(gameBoard) {
  let ball = document.querySelector(".ball");
  let ballRect = ball.getBoundingClientRect();
  let ballValues = window.getComputedStyle(ball);

  //firstX = ballRect.x;
  secondX = ballValues.gridRowStart
 // secondX = ballRect.x;
  console.log('secondX', secondX);
}

// function diff() {
//   setInterval(ballDirectionOne, 10);
//   setInterval(ballDirectionTwo, 16);
//   console.log(firstX);
//   console.log(secondX);
//   return firstX - secondX;
//   if (secondX - firstX){
//     console.log('less than zero');
//   }else{
//     console.log('greater than zero')
//   }
// }

//setInterval(ballDirectionOne, 50);
//setInterval(ballDirectionTwo, 800);

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
  let ballRect = ball.getBoundingClientRect();
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

  let coll = false;
  if (hasSpaceBeenPressed.ball) coll = true;

  // need to see which pad sqaure is being hit and move the ball in the diagonal
  // with these checks the edge of the pad is not being accounted for when it comes down on the diagonal
  if (padLeft <= ballCStart && ballCStart <= padRight && ballBottom == padRow) {
    collidedPad = true;
    collidedRight = false;
    collidedTop = false;
    collidedLeft = false;
  }

  const leftSideofPaddle = Math.round((padRight - padLeft) / 2 + padLeft);
  // contact with left side and middle of paddle, ball coming down onto paddle
  if (collidedPad && ballCStart <= leftSideofPaddle) {
    ball.style.gridRowStart = ballRow - 1;
    ball.style.gridColumnStart = ballColumn - 1;
  } else if (collidedPad) {
    // contact with right side of paddle, however, moving one to the right first and then up.
    ball.style.gridColumnStart = ballColumn + 1;
    ball.style.gridRowStart = ballRow - 1;
  }
}

export function isGameOver() {
  const ball = document.querySelector(".ball");
  const ballValues = window.getComputedStyle(ball);
  const ballRow = parseInt(ballValues.gridRowStart);

  const paddle = document.querySelector(".pad");
  const paddleValues = window.getComputedStyle(paddle);
  const paddleRow = parseInt(paddleValues.gridRowStart);
  // let gameStatus = document.querySelector('#game-status')
  // console.log('ballrow', ballRow, 'paddlerow', paddleRow)
  // if (ballRow > paddleRow) {
  //   gameStatus.innerHTML = 'Game Over'
  //   return
  // }
  return ballRow > paddleRow;
}

export function resetBall() {
  const ball = document.querySelector(".ball");
  // const ballValues = window.getComputedStyle(ball);
  ball.style.gridRowStart = 21;
  ball.style.gridColumnStart = 12;
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
