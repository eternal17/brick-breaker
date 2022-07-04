import {
  hasSpaceBeenPressed as beenPressed,
  hasSpaceBeenPressed,
} from "./pad.js";

console.log("been", beenPressed);


function drawBall(gameBoard) {
  let newball = document.createElement("div");
  newball.classList.add("ball");
  gameBoard.appendChild(newball);
}



function moveBall(gameBoard) {
  
  let ball = document.querySelector(".ball")
  let ballValues = window.getComputedStyle(ball);
  let ballColumn = parseInt(ballValues.gridColumnStart);
  let ballRow = parseInt(ballValues.gridRowStart);

  if (hasSpaceBeenPressed) {
    ball.style.gridColumnStart = ballColumn +1;
    ball.style.gridRowStart = ballRow -1;
  }
}

export { drawBall, moveBall };
