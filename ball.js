import { hasSpaceBeenPressed } from "./pad.js";

let collidedRight = false;
//let collidedTop = false;
let collidedLeft = false;
let collidedPad = false;

let collTopRight = false;
let collTopLeft = false;

let movingRight = true;
let movingLeft = false;
let goingUp = false;
let goingDown = false;
let firstX = 0;
let secondX = 0;
let difference;

let obj = {};
let a;
let b;

function ballDirectionOne(gameBoard) {
  let ball = document.querySelector(".ball");
  let game = document.getElementById("game-board");

  // let ballRect = ball.getBoundingClientRect();
  let ballValues = window.getComputedStyle(ball);
  let boardValues = window.getComputedStyle(game);

  let numberOfRows = boardValues.gridTemplateRows.split(" ").length;

  //console.log(obj);

  if (ballValues.gridColumnStart == numberOfRows - 2 || ballValues.gridColumnStart == 2) {
    obj["a"] = parseInt(ballValues.gridRowStart);
  }
  if (ballValues.gridColumnStart == numberOfRows - 1 || (ballValues.gridColumnStart == 1 && obj.hasOwnProperty("a"))) {
    // still adding the b in before a for some reason.
    if (Object.keys(obj).length == 1) {
      obj["b"] = parseInt(ballValues.gridRowStart);
    }
  }

  if (Object.keys(obj).length == 2) {
    console.log("object", obj);
    if (obj.a > obj.b) {
      // going up logic
      goingUp = true;
      goingDown = false;
      console.log("going up");

      obj = {};
    } else if (obj.a < obj.b) {
      goingDown = true;
      goingUp = false;

      // going down logic
      console.log("going down");
      obj = {};
    }
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
  secondX = ballValues.gridRowStart;
  // secondX = ballRect.x;
  console.log("secondX", secondX);
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

  // first movement off the pad
  if (hasSpaceBeenPressed.ball & !collidedRight & !collTopRight & !collTopLeft & !collidedLeft & !collidedPad) {
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

  if (ballRect.right.toFixed(2) == boardRect.right.toFixed(2)) {
    collidedRight = true;
    collTopRight = false;
    collTopLeft = false;
    collidedLeft = false;
    collidedPad = false;
  }

  if (collidedRight) {
    if (goingUp) {
      ball.style.gridColumnStart = ballColumn - 1;
      ball.style.gridRowStart = ballRow - 1;
    } else if (goingDown) {
      ball.style.gridColumnStart = ballColumn - 1;
      ball.style.gridRowStart = ballRow + 1;
    }
  }

  if (ballRect.top.toFixed(2) == boardRect.top.toFixed(2)) {
    if (collidedRight) {
      collidedRight = false;
      collTopRight = true;
      collTopLeft = false;
      collidedLeft = false;
      collidedPad = false;
    }
    if (collidedLeft) {
      collidedRight = false;
      collTopRight = false;
      collTopLeft = true;
      collidedLeft = false;
      collidedPad = false;
    }
  }

    if (collTopRight) {
      //change direction
      ball.style.gridColumnStart = ballColumn - 1;
      ball.style.gridRowStart = ballRow + 1;
    }

    if(collTopLeft){
      ball.style.gridColumnStart = ballColumn + 1;
      ball.style.gridRowStart = ballRow + 1;


    }
  

  if (ballRect.left.toFixed(2) == boardRect.left.toFixed(2)) {
    collidedRight = false;
    collTopRight = false;
    collTopLeft = false;
    collidedLeft = true;
    collidedPad = false;
  }

  if (collidedLeft) {
    //change direction
    if (goingDown) {
      ball.style.gridColumnStart = ballColumn + 1;
      ball.style.gridRowStart = ballRow + 1;
    } else if (goingUp) {
      ball.style.gridColumnStart = ballColumn + 1;
      ball.style.gridRowStart = ballRow - 1;
    }
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
    collTopRight = false;
    collTopLeft = false
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
