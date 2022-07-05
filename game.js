// import { draw as drawBrick } from "./bricks.js";
// import { drawBall as addBall, moveBall as ballMovement, checkWallCollision as wallCollision} from "./ball.js";
// import { createPad as addPad, movePadAndBall as move } from "./pad.js";
import { movePad } from "./pad.js";

import Ball from "./ball.js";


const ball = new Ball(document.getElementById("ball"));
let lastRenderTime;

function main(time) {
  if (lastRenderTime != null) {
    
    const secondsSinceLastRender = time - lastRenderTime;
    ball.updateBallMovement(secondsSinceLastRender);
  }
  // if (secondsSinceLastRender < 1 / 4) return;
  
  lastRenderTime = time;
  requestAnimationFrame(main);
}

requestAnimationFrame(main);
movePad();

// const gameBoard = document.getElementById("game-board");

// drawBrick(gameBoard);
// addBall(gameBoard);
// addPad(gameBoard);
// move();

// // let mainball = document.querySelector('.ball');
// // //console.log(mainball);
// // let ballRect = mainball.getBoundingClientRect()
// // console.log('ballX', ballRect.left);
// // console.log('ballY', ballRect.top);

// //ballPhysics(gameBoard)

// // function draw() {
// //     //gameBoard.innerHTML = ''
// //     move();
// // }
// // draw();

// function update() {}
