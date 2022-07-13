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
const ballDiv = document.createElement("div");
const ballRadius = 10;
const ballCompStyles = window.getComputedStyle(ballDiv);

const paddle = {
  // x value is
  x: gameBoardRect.width / 2 - paddle_width / 2,
  // y value is the top left corner value of the paddle
  y: gameBoardRect.height - paddle_margin_bottom - paddle_height,
  width: paddle_width,
  height: paddle_height,
  xMovement: 20,
};




// draw paddle
function drawPaddle() {
  pad.classList.add("pad");
  pad.style.left = paddle.x + "px";
  pad.style.top = paddle.y + "px";
  pad.style.width = paddle.width + "px";
  pad.style.height = paddle.height + "px";
  pad.style.backgroundColor = "white";
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
  speed: 5,
  radius: ballRadius,
  // these are the properties that x and y change by.
  deltaX: 4 * (Math.random() * 2 - 1),
  deltaY: -4,
};

function drawBall() {
  ballDiv.classList.add("ball");
  ballDiv.style.top = ball.y + "px";
  ballDiv.style.left = ball.x + "px";
  ballDiv.style.height = "20px";
  ballDiv.style.width = "20px";
  ballDiv.style.borderRadius = "10px";
  ballDiv.style.position = "absolute";
  ballDiv.style.backgroundColor = "silver";
  gameBoard.append(ballDiv);
}

function moveBall() {
  ball.x += ball.deltaX;
  ball.y += ball.deltaY;
}

// CHECK WHY WE NEED THESE VARIABLES
function ballWallCollision() {
  // if ball hits right side of the wall
  const ballRect = ballDiv.getBoundingClientRect();
  const padRect = pad.getBoundingClientRect();
  // collided with right side
  if (ballRect.right + parseInt(gameCompStyles.border) >= gameBoardRect.right) {
    ball.deltaX = -Math.abs(ball.deltaX);
  }
  // collided with top
  if (ballRect.top - parseInt(gameCompStyles.border) <= gameBoardRect.top) {
    ball.deltaY = Math.abs(ball.deltaY);
  }

  // collided with left
  if (ballRect.left - parseInt(gameCompStyles.border) <= gameBoardRect.left) {
    ball.deltaX = Math.abs(ball.deltaX);
  }

  // if ball goes past pad/ hits bottom of gameboard, you lose ; gameover or lose life
  if (ballRect.bottom - ballRect.height > padRect.bottom ) {
    location.reload();
  }
}

function padCollision() {
  const ballRect = ballDiv.getBoundingClientRect();
  const padRect = pad.getBoundingClientRect();
  const padFloor = ballRect.bottom + parseInt(gameCompStyles.border) >= padRect.top;

  //&& ballRect.right < padRect.x + paddle_width / 2 - middle_buffer
  // if (padFloor && padRect.x  - padRect.width< ballRect.x && padRect.right > ballRect.left) {

  //   //checking if the ball has hit the left 40% of the paddle
  //   if (ballRect.left + ballRect.width >= padRect.left  &&  ballRect.left + ballRect.width <padRect.left + paddle_width * 0.4  ) {
  //     console.log('left' , ballRect.left, ballRect.width, padRect.left);
  //     ball.deltaY = -Math.abs(ball.deltaY);
  //     ball.deltaX = -Math.abs(ball.deltaX);

  //   } else if (ballRect.right - ballRect.width <= padRect.right && ballRect.left > padRect.right -paddle_width * 0.4 ) {
  //     console.log('right', ballRect.right, ballRect.width, padRect.right);
  //     ball.deltaY = -Math.abs(ball.deltaY);
  //     ball.deltaX = Math.abs(ball.deltaX);

  //     //console.log('right', padRect.x, padRect.left, ballRect.x , ballRect.bottom);

  //   } else if(ballRect.left < padRect.left - ballRect.width || ballRect.right < padRect.right + ballRect.width ){
  //     console.log('out of bounds');

  //   }else{
  //     console.log('middle');

  //   }
  // }

  //added + ballRect.height
  if (
    ballRect.x < padRect.x + padRect.width &&
    ballRect.x > padRect.x &&
    padRect.y < padRect.y + padRect.height &&
    ballRect.y + ballRect.height > padRect.y
  ) {

    // CHECK WHERE THE ballRect HIT THE PADDLE
    let collidePoint = ballRect.x - (padRect.x + padRect.width / 2);

    // NORMALIZE THE VALUES
    collidePoint = collidePoint / (padRect.width / 2);

    // CALCULATE THE ANGLE OF THE ballRect
    let angle = (collidePoint * Math.PI) / 3;

    ball.deltaX = ball.speed * Math.sin(angle);
    ball.deltaY = -ball.speed * Math.cos(angle);

    // console.log(ball.deltaX);
    // console.log(ball.deltaY);
  }
}


//brick variables
const brick_width = 100;
const brick_height = 20;
const brick_rows = 3
const brick_column = 3
const brick_buffer = (gameBoardRect.width - brick_width*brick_rows) / brick_rows -2
let styleLeft = 15
let styleTop = 50 


let bricks = {
  width: brick_width,
  height: brick_height,
  rows : brick_rows,
  columns : brick_column,
  style_left : styleLeft,
  style_top : styleTop,
};



function createBricks() {

  const docFrag = document.createDocumentFragment();
  
  let id = 1

  for (let i =0 ; i < bricks.columns ; i++){

    for (let i =0 ; i < bricks.columns ; i++){
      let brick = document.createElement("div");
      brick.classList.add("brick");
      brick.style.left = styleLeft + 'px';
      brick.style.top = styleTop + 'px';
      brick.style.height = bricks.height + 'px';
      brick.style.width = bricks.width + 'px';
      brick.style.backgroundColor = "red";
      brick.style.position = "absolute";
      brick.id = id
      id++
      // console.log(styleLeft);
     styleLeft += brick_width + brick_buffer
      docFrag.appendChild(brick);
      
    }
    styleLeft = 15
    styleTop += 50

  }

return docFrag

}

function drawBricks(){
  let brickFrags = createBricks()
gameBoard.appendChild(brickFrags)
}


function brickCollision() {
  
  let gameBall = document.querySelector(".ball");
  let gameBricks = document.querySelectorAll(".brick");

  
  let gameBallValues = window.getComputedStyle(gameBall);
  
  for(let i = 0 ; i < gameBricks.length ; i++ ){
    
    let brickValues = window.getComputedStyle(gameBricks[i])
    
    // console.log(gameBallValues.top);
    
    if (gameBallValues.top< brickValues.top){
      console.log('has entered condition');
      // gameBricks[i].classList.remove('brick')
      gameBricks[i].top += 1000
      
      
    }
  }
  
  
}






let game_started = false

window.addEventListener("keydown", function (e) {

  if (e.code === 'Space') game_started = true 

})

//behaves funky within the game loop, frames stable nevertheless
drawBricks();

function gameLoop() {
  drawPaddle();
  drawBall();
  movePaddle();
  if(game_started) moveBall();
  padCollision();
  ballWallCollision();
  brickCollision()

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
