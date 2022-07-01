import { draw as drawBrick } from './bricks.js'

const pad = document.createElement('div')
pad.classList.add('pad')


// document.body.append(pad)

const gameBoard = document.getElementById('game-board')
gameBoard.appendChild(pad)

function draw() {
    drawBrick(gameBoard)
}

// needs to go in the main loop function
draw()

function update() {

}