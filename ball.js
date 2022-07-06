import { hasSpaceBeenPressed as beenPressed } from "./pad.js";
let xcord;
let ycord;

function ballTest() {
  if (hasSpaceBeenPressed.ball) {
    getCoords();
    removeCSS();
  }
}

function getCoords() {
  let ball = document.querySelector(".ball");
  let ballRect = ball.getBoundingClientRect();
  xcord = ballRect.x;
  ycord = ballRect.y;

  
  return { xcord, ycord };
}

function removeCSS() {
  let ball = document.querySelector(".ball");
  ball.style.gridRowStart = '1';
  ball.style.gridColumnStart = '1';

  //ball.style.removeProperty("grid-row-start")
  //ball.style.removeProperty("grid-column-start")

  
console.log(ball.getBoundingClientRect());

  // ball.style.setProperty("grid-column-start", null);
  // ball.style.setProperty("grid-column-start", null);

  //document.getElementById(ball).style.backgroundColor = 'pink';
}

export { ballTest };

// let collided = false

// console.log("been", beenPressed);

// function drawBall(gameBoard) {
//   let newball = document.createElement("div");
//   newball.classList.add("ball");
//   gameBoard.appendChild(newball);
// }

// function moveBall(gameBoard) {
//   let ball = document.querySelector(".ball");
//   let ballValues = window.getComputedStyle(ball);
//   let ballColumn = parseInt(ballValues.gridColumnStart);
//   let ballRow = parseInt(ballValues.gridRowStart);

//   if (beenPressed.ball & !collided) {
//     ball.style.gridColumnStart = ballColumn + 1;
//     ball.style.gridRowStart = ballRow - 1;
//   }
// }

// function checkWallCollision() {
//   let ball = document.querySelector(".ball");
//   let ballValues = window.getComputedStyle(ball);
//   let ballColumn = parseInt(ballValues.gridColumnStart);
//   let ballRow = parseInt(ballValues.gridRowStart);

//   let gameBoar = document.getElementById("game-board");

//   let boardRect = gameBoar.getBoundingClientRect();
//   // console.log('boardX',boardRect);
//   // console.log('boardX',boardRect.top);
//   let mainball = document.querySelector(".ball");

//   let ballRect = mainball.getBoundingClientRect();
//   // console.log('ballTop', ballRect.top);
//   // console.log('ballRight', ballRect.right);
//   // console.log('ballLeft', ballRect.left);
//   // console.log('ballBottom', ballRect.bottom);
//   if (ballRect.right.toFixed(2) == boardRect.right.toFixed(2)) {
//     collided = true;
//       }

//       if (collided){//change direction
//     ball.style.gridColumnStart = ballColumn - 1;
//     ball.style.gridRowStart = ballRow - 1;
//   }
// }

// export { drawBall, moveBall, checkWallCollision };

const INITIAL_VELOCITY = 0.025;

const gameBoard = document.querySelector("#game-board");
export const gameBoardRect = gameBoard.getBoundingClientRect();
import { hasSpaceBeenPressed } from "./pad.js";
// export default class Ball {
//   constructor(ballElement) {

//     this.ballElement = ballElement

//     // resetting the position of the ball everytime a new one is created
//     this.reset()
//   }

//   get x() {
//     return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--x'))
//   }

//   set x(value) {
//     this.ballElement.style.setProperty('--x', value)
//   }

//   get y() {
//     return parseFloat(getComputedStyle(this.ballElement).getPropertyValue('--y'))
//   }

//   set y(value) {
//     this.ballElement.style.setProperty('--y', value)
//   }

//   rect() {
//     return this.ballElement.getBoundingClientRect()
//   }

//   // need to figure out the reset position of the ball, ie on the middle of the pad
//   reset() {
//     this.x = 25
//     this.y = 25
//     this.direction = { x: 0 }

//     // while loop may not be needed in our case as the ball should be moving mainly horizontally
//     // while (Math.abs(this.direction.x) <= .2 || Math.abs(this.direction.y) >= 0.9) {
//     // }
//     const heading = randomNumberBetween(0, 2 * Math.PI)
//     this.direction = { x: Math.cos(heading), y: Math.sin(heading) }
//     this.velocity = INITIAL_VELOCITY
//   }

//   updateBallMovement(secondsSinceLastRender) {
//     this.x += this.direction.x * this.velocity * secondsSinceLastRender
//     this.y += this.direction.y * this.velocity * secondsSinceLastRender
//     const rect = this.rect()
//     // console.log(gameBoardRect)
//     if (rect.right >= gameBoardRect.right || rect.left <= gameBoardRect.left) {
//       this.direction.x *= -1
//     }
//     if (rect.bottom >= gameBoardRect.bottom || rect.top <= gameBoardRect.top) {
//       this.direction.y *= -1
//     }
//   }

// }

function randomNumberBetween(min, max) {
  return Math.random() * (max - min) + min;
}
