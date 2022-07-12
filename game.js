const gameBoard = document.querySelector(".game-board");
const gameBoardRect = gameBoard.getBoundingClientRect()

const paddle_width = 100
const paddle_margin_bottom = 50
const paddle_height = 20

const paddle = {
  // x value is 
  x: gameBoardRect.width / 2 - paddle_width / 2,
  // y value is the top left corner value of the paddle
  y: gameBoardRect.height - paddle_margin_bottom - paddle_height,
  width: paddle_width,
  height: paddle_height,
  xMovement: 5
}
// draw paddle 
function drawPaddle() {
  let pad = document.createElement('div')
  pad.classList.add('pad')
  pad.style.left = paddle.x + 'px'
  pad.style.top = paddle.y + 'px'
  pad.style.width = paddle.width + 'px'
  pad.style.height = paddle.height + 'px'
  pad.style.backgroundColor = 'red'
  pad.style.position = 'absolute'
  gameBoard.append(pad)
}



// console.log(pad.getBoundingClientRect())



drawPaddle()