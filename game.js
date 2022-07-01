import { draw as drawBrick } from './bricks.js'
import { drawBall as addBall } from './ball.js'
import { createPad as addPad, movePadAndBall as move } from './pad.js'





const gameBoard = document.getElementById('game-board')

function draw() {
    drawBrick(gameBoard)
    addPad(gameBoard)
    addBall(gameBoard)
    move()
}



// needs to go in the main loop function
draw()

function update() {

}