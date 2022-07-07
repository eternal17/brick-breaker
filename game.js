import { draw as drawBrick } from "./bricks.js";
import { drawBall as addBall, moveBall as ballMovement, checkWallCollision, checkPadCollision } from "./ball.js";
import { createPad as addPad, movePadAndBall as move } from "./pad.js";

let lastRenderTime = 0;


function main(time) {
  requestAnimationFrame(main);
  const secondsSinceLastRender = (time - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / 20) return;
  lastRenderTime = time;
  //console.log(secondsSinceLastRender);
  ballMovement();
  checkWallCollision()
  checkPadCollision()

}

requestAnimationFrame(main);

const gameBoard = document.getElementById("game-board");

drawBrick(gameBoard);
addBall(gameBoard);
addPad(gameBoard);
move();

