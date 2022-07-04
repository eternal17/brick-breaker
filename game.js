import { draw as drawBrick } from "./bricks.js";
import { drawBall as addBall, moveBall as ballMovement, checkWallCollision as wallCollision} from "./ball.js";
import { createPad as addPad, movePadAndBall as move } from "./pad.js";

let lastRenderTime = 0;


function main(time) {
  requestAnimationFrame(main);
  const secondsSinceLastRender = (time - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1/4) return;
  lastRenderTime = time;
  //console.log(secondsSinceLastRender);
  ballMovement();
  wallCollision()
  let mainball = document.querySelector('.ball');
//console.log(mainball);


}

requestAnimationFrame(main);

const gameBoard = document.getElementById("game-board");

drawBrick(gameBoard);
addBall(gameBoard);
addPad(gameBoard);
move();




// let mainball = document.querySelector('.ball');
// //console.log(mainball);
// let ballRect = mainball.getBoundingClientRect()
// console.log('ballX', ballRect.left);
// console.log('ballY', ballRect.top);

//ballPhysics(gameBoard)

// function draw() {
//     //gameBoard.innerHTML = ''
//     move();
// }
// draw();

function update() {}
