import { draw as drawBrick } from "./bricks.js";
import { drawBall as addBall } from "./ball.js";
import { createPad as addPad, movePadAndBall as move } from "./pad.js";

function main(time) {
  //console.log(time);
  requestAnimationFrame(main);
  
}

requestAnimationFrame(main);

const gameBoard = document.getElementById("game-board");

function draw() {
    //gameBoard.innerHTML = ''
    drawBrick(gameBoard);
    addPad(gameBoard);
    addBall(gameBoard);
    move();
}
draw();

function update() {}
