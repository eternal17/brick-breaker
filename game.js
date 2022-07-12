
// gameboard variables
const gameBoard = document.querySelector(".game-board");
const gameBoardRect = gameBoard.getBoundingClientRect();
const gameCompStyles = window.getComputedStyle(gameBoard);


// paddle variables
const paddle_width = 100;
const paddle_margin_bottom = 50;
const paddle_height = 20;

const pad = document.createElement("div");
const padCompStyles = window.getComputedStyle(pad);

// ball variables
const ballDiv = document.createElement('div')
const ballRadius = 10
const ballCompStyles = window.getComputedStyle(ballDiv);



const paddle = {
  // x value is
  x: gameBoardRect.width / 2 - paddle_width / 2,
  // y value is the top left corner value of the paddle
  y: gameBoardRect.height - paddle_margin_bottom - paddle_height,
  width: paddle_width,
  height: paddle_height,
  xMovement: 6,
};

// draw paddle
function drawPaddle() {
  pad.classList.add("pad");
  pad.style.left = paddle.x + "px";
  pad.style.top = paddle.y + "px";
  pad.style.width = paddle.width + "px";
  pad.style.height = paddle.height + "px";
  pad.style.backgroundColor = "red";
  pad.style.position = "absolute";
  gameBoard.append(pad);
}

//move pad, uses gameboard border as a parameter
function movePaddle() {
  document.addEventListener("keydown", function (event) {
    const padRect = pad.getBoundingClientRect();

    if (event.key == "ArrowRight" && padRect.right + parseInt(gameCompStyles.border) < gameBoardRect.right) {
      paddle.x = parseInt(padCompStyles.left) + paddle.xMovement;
    } else if (event.key == "ArrowLeft" && padRect.left - parseInt(gameCompStyles.border) > gameBoardRect.left) {
      paddle.x = parseInt(padCompStyles.left) - paddle.xMovement;
    }
  });
}


const ball = {
  x: gameBoardRect.width / 2 - ballRadius,
  y: paddle.y - 2 * ballRadius,
  // the speed value can eventually change
  speed: 3,
  radius: ballRadius,
  // these are the properties that x and y change by. 
  deltaX: 2,
  deltaY: -2
}

function drawBall() {
  ballDiv.classList.add('ball')
  ballDiv.style.top = ball.y + 'px'
  ballDiv.style.left = ball.x + 'px'
  ballDiv.style.height = '20px'
  ballDiv.style.width = '20px'
  ballDiv.style.borderRadius = '10px'
  ballDiv.style.position = 'absolute'
  ballDiv.style.backgroundColor = 'green'
  gameBoard.append(ballDiv)
}

function moveBall() {
  ball.x += ball.deltaX
  ball.y += ball.deltaY

}

// CHECK WHY WE NEED THESE VARIABLES 


function ballWallCollision() {
  // if ball hits right side of the wall
  const ballRect = ballDiv.getBoundingClientRect()
  const padRect = pad.getBoundingClientRect();
  // collided with right side
  if (ballRect.right + parseInt(gameCompStyles.border) >= gameBoardRect.right) {
    ball.deltaX = -Math.abs(ball.deltaX)
  }
  // collided with top
  if (ballRect.top - parseInt(gameCompStyles.border) <= gameBoardRect.top) {
    ball.deltaY = Math.abs(ball.deltaY)
  }

  // collided with left 
  if (ballRect.left - parseInt(gameCompStyles.border) <= gameBoardRect.left) {
    ball.deltaX = Math.abs(ball.deltaX)
  }

  // if ball goes past pad/ hits bottom of gameboard, you lose ; gameover or lose life
  if (ballRect.bottom >= padRect.bottom) {
    location.reload()
  }
}

function gameLoop() {
  drawPaddle();
  drawBall();
  movePaddle();
  moveBall()
  ballWallCollision()

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
