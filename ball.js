import { hasSpaceBeenPressed as beenPressed } from "./pad.js";

let collided = false

console.log("been", beenPressed);

function drawBall(gameBoard) {
  let newball = document.createElement("div");
  newball.classList.add("ball");
  gameBoard.appendChild(newball);
}

function moveBall(gameBoard) {
  let ball = document.querySelector(".ball");
  let ballValues = window.getComputedStyle(ball);
  let ballColumn = parseInt(ballValues.gridColumnStart);
  let ballRow = parseInt(ballValues.gridRowStart);

  if (beenPressed.ball & !collided) {
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
  // console.log('boardX',boardRect);
  // console.log('boardX',boardRect.top);
  let mainball = document.querySelector(".ball");

  let ballRect = mainball.getBoundingClientRect();
  // console.log('ballTop', ballRect.top);
  // console.log('ballRight', ballRect.right);
  // console.log('ballLeft', ballRect.left);
  // console.log('ballBottom', ballRect.bottom);
  if (ballRect.right.toFixed(2) == boardRect.right.toFixed(2)) {
    collided = true;
      }
      
      if (collided){//change direction
    ball.style.gridColumnStart = ballColumn - 1;
    ball.style.gridRowStart = ballRow - 1;
  }
}

export { drawBall, moveBall, checkWallCollision };
