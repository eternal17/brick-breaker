import { hasSpaceBeenPressed as beenPressed } from "./pad.js";

let collidedRight = false;
let collidedTop = false;
let collidedLeft = false;
let collidedPad = false;

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

  if (beenPressed.ball & !collidedRight & !collidedTop & !collidedLeft) {
   ball.style.gridColumnStart = ballColumn +1;
    ball.style.gridRowStart = ballRow  -1;
  }
}

function checkWallCollision() {
  let ball = document.querySelector(".ball");
  let paddle = document.querySelector(".pad");
  let padRect = paddle.getBoundingClientRect()

  let ballValues = window.getComputedStyle(ball);
  let ballColumn = parseInt(ballValues.gridColumnStart);
  let ballRow = parseInt(ballValues.gridRowStart);

  let gameBoar = document.getElementById("game-board");

  let boardRect = gameBoar.getBoundingClientRect();
  // console.log('boardX',boardRect);
  // console.log('boardX',boardRect.top);
  let mainball = document.querySelector(".ball");

  let ballRect = mainball.getBoundingClientRect();

  if (ballRect.right.toFixed(2) == boardRect.right.toFixed(2)) {
    
    collidedRight = true;
    collidedTop = false;
    collidedLeft = false;
    collidedPad = false;
  }

  if (collidedRight) {
    //change direction
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
    ball.style.gridRowStart = ballRow +1;
  }

  if (ballRect.left.toFixed(2) == boardRect.left.toFixed(2)) {
    collidedRight = false;
    collidedTop = false;
    collidedLeft = true;
    collidedPad = false;
  }

  if (collidedLeft) {
    //change direction
   ball.style.gridColumnStart = ballColumn +1;
    ball.style.gridRowStart = ballRow +1;
  }





//   if(gameover){
//   if (ballRect.bottom.toFixed(2) > padRect.top.toFixed(2)) {
//     //document.location.reload()
   
//   }
// }
  

}

export { drawBall, moveBall, checkWallCollision };
