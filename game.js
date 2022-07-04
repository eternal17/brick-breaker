import { draw as drawBrick } from "./bricks.js";
import { drawBall as addBall, moveBall as ballMovement } from "./ball.js";
import { createPad as addPad, movePadAndBall as move } from "./pad.js";

let lastRenderTime = 0;

function main(time) {
  requestAnimationFrame(main);
  const secondsSinceLastRender = (time - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / 10) return;
  lastRenderTime = time;
  //console.log(secondsSinceLastRender);
  ballMovement();
}
requestAnimationFrame(main);

const gameBoard = document.getElementById("game-board");

drawBrick(gameBoard);
addBall(gameBoard);
addPad(gameBoard);
move();

let board = document.querySelector("game-board");
console.log(board);
let boardRect = board.getBoundingClientRect();
console.log(boardRect);
console.log(board);

//ballPhysics(gameBoard)

// function draw() {
//     //gameBoard.innerHTML = ''
//     move();
// }
// draw();

function update() {}
