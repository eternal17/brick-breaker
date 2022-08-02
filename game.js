
import { paddle, drawPaddle, movePaddle, padCollision,pad} from "./paddle.js";

// gameboard variables
const gameBoard = document.querySelector(".game-board");
const gameBoardRect = gameBoard.getBoundingClientRect();
const gameCompStyles = window.getComputedStyle(gameBoard);


// ball variables
const ballDiv = document.createElement("div");
const ballRadius = 10;
const defaultValue = "translate(0,0)";
ballDiv.setAttribute("transform", defaultValue);

//brick variables
const brick = document.createElement("div");
const docFrag = document.createDocumentFragment();
const titleFrag = document.createDocumentFragment();

//game start boolean/title screen
let game_started = false;
const titleDiv = document.querySelector(".title-screen");
let title_started = false

// gameover - no lives left
let game_over = false;
//scoreboard
let scoreboard = document.querySelector(".scoreboard");
let score = 0;

//lives
let maxlives = 3;
let livesComp = 2;
let livesbox = document.querySelector(".lives");
livesbox.innerHTML = "&#10084".repeat(maxlives);

//pause state
let paused = false;
const pausediv = document.getElementById("pauseDiv");
// gameBoard.append(pausediv);

//timer
let timer = 0;
let timeDiv = document.querySelector(".time ");
let firstTime = 0;
let a = false;

// sounds
const win_sound = new Audio('./assets/gamewin1.mp3')
const brick_collided_sound = new Audio('./assets/brickhit1.mp3')
const life_lost_sound = new Audio('./assets/life-lost.mp3')
const game_over_sound = new Audio('./assets/game-over.mp3')
const game_music = new Audio('./assets/game-music.mp3')



//toggles boolean used within movePaddle function
function movePaddleBool() {
  document.addEventListener("keydown", function (event) {
    const padRect = pad.getBoundingClientRect();
    event.preventDefault();

    if (event.key == "ArrowRight" && padRect.right + parseInt(gameCompStyles.border) < gameBoardRect.right) {
      paddle.right = true;
    } else if (event.key == "ArrowLeft" && padRect.left - parseInt(gameCompStyles.border) > gameBoardRect.left) {
      paddle.left = true;
    }
  });
}

const ball = {
  x: gameBoardRect.width / 2 - ballRadius,
  y: paddle.y - 2 * ballRadius,
  // the speed value can eventually change
  speed: 4,
  radius: ballRadius,
  // these are the properties that x and y change by.
  deltaX: 4 * (Math.random() * 2 - 1),
  deltaY: -4,
};

function drawBall() {
  ballDiv.classList.add("ball");
  ballDiv.style.top = ball.y + "px";
  ballDiv.style.left = ball.x + "px";
  ballDiv.style.height = "14px";
  ballDiv.style.width = "14px";
  ballDiv.style.borderRadius = "10px";
  ballDiv.style.position = "absolute";
  ballDiv.style.backgroundColor = "silver";
  gameBoard.append(ballDiv);
}

function moveBall() {
  ball.x += ball.deltaX
  ball.y += ball.deltaY;
}



// CHECK WHY WE NEED THESE VARIABLES
function ballWallCollision() {
  //tried make the below two variables global but causes errors
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

  // if the ball hits goes past the paddle (i.e lose a life), all the logic for what happens should be here
  if (ballRect.top > padRect.top) {
    // reset the ball to middle of pad

    ball.x = gameBoardRect.width / 2 - ballRadius;
    ball.y = paddle.y - 2 * ballRadius;
    ballDiv.style.transform = `translateX(${paddle.start}px)`;
    maxlives -= 1;
    if (maxlives !== 0) {
      life_lost_sound.play()
    }
    livesbox.innerHTML = "&#10084".repeat(maxlives);
    game_started = false;
  }
}

//brick variables
const brick_width = 60;
const brick_height = 25;
const brick_rows = 4;
const brick_column = 4;
const brick_buffer = (gameBoardRect.width - brick_width * brick_rows) / brick_rows - 2;
let styleLeft = 20;
let styleTop = 50;

let bricks = {
  width: brick_width,
  height: brick_height,
  rows: brick_rows,
  columns: brick_column,
  style_left: styleLeft,
  style_top: styleTop,
};

///title screen///

function titleBricks() {

  let Color = "rgb(217, 56, 136)"
  let titlebrickLeft = 20
  let titleBrickTop = 25
  //let randomColor2 = Math.floor(Math.random() * 16777215).toString(16);

  for (let i = 0; i < 14; i++) {
    if (i > 6) Color = ' rgb(172, 39, 245)'
    for (let i = 0; i < 4; i++) {
      let titleBrick = document.createElement("div");
      titleBrick.classList.add("title-brick");
      titleBrick.style.left = titlebrickLeft + "px";
      titleBrick.style.top = titleBrickTop + "px";
      titleBrick.style.height = bricks.height + "px";
      titleBrick.style.width = bricks.width + "px";
      titleBrick.style.backgroundColor = Color
        ;
      titleBrick.style.position = "absolute";

      titlebrickLeft += brick_width + brick_buffer;
      titleFrag.appendChild(titleBrick);
    }
    titlebrickLeft = 20;
    titleBrickTop += 35;
  }

  return titleFrag;
}

function bricksToTitle() {
  const titleBrics = titleBricks();
  titleDiv.append(titleBrics);
}

/////////////

function createBricks() {
  let id = 1;

  for (let i = 0; i < bricks.rows; i++) {
    for (let i = 0; i < bricks.columns; i++) {
      let brick = document.createElement("div");
      brick.classList.add("brick");
      brick.style.border = '2px solid red'
      brick.style.left = styleLeft + "px";
      brick.style.top = styleTop + "px";
      brick.style.height = bricks.height + "px";
      brick.style.width = bricks.width + "px";
      brick.style.backgroundColor = "pink";
      brick.style.position = "absolute";
      brick.id = id;
      id++;

      styleLeft += brick_width + brick_buffer;
      docFrag.appendChild(brick);
    }
    styleLeft = 20;
    styleTop += 55;
  }

  return docFrag;
}
function drawBricks() {
  let brickFrags = createBricks();
  gameBoard.appendChild(brickFrags);
}

function brickCollision() {
  let gameBricks = document.getElementsByClassName("brick");

  for (let i = 0; i < gameBricks.length; i++) {
    const ballRect = ballDiv.getBoundingClientRect();
    // console.log(Math.floor(ballRect.top))
    //bottom of brick collision

    if (
      ball.deltaY < 0 &&
      ballRect.bottom > gameBricks[i].getBoundingClientRect().bottom &&
      Math.floor(ballRect.top) <= gameBricks[i].getBoundingClientRect().bottom &&
      ballRect.left > gameBricks[i].getBoundingClientRect().left - ballRadius * 2 &&
      ballRect.right < gameBricks[i].getBoundingClientRect().right + ballRadius * 2
    ) {
      console.log("hit bottom");
      score += 1;
      gameBricks[i].remove();
      ball.deltaY = Math.abs(ball.deltaY);
      brick_collided_sound.play()
      //top of brick collison
    } else if (
      ball.deltaY > 0 &&
      ballRect.top < gameBricks[i].getBoundingClientRect().top &&
      ballRect.bottom >= gameBricks[i].getBoundingClientRect().top &&
      ballRect.left > gameBricks[i].getBoundingClientRect().left - ballRadius * 2 &&
      ballRect.right < gameBricks[i].getBoundingClientRect().right + ballRadius * 2
    ) {
      console.log("hit top");
      score += 1;
      gameBricks[i].remove();
      ball.deltaY = -Math.abs(ball.deltaY);
      brick_collided_sound.play()
      //right of brick collision
    } else if (
      ballRect.right > gameBricks[i].getBoundingClientRect().right &&
      ballRect.left <= gameBricks[i].getBoundingClientRect().right &&
      ((ballRect.top > gameBricks[i].getBoundingClientRect().top - ball.radius && ballRect.bottom < gameBricks[i].getBoundingClientRect().bottom + ball.radius)
      )) {
      // (ballRect.bottom > gameBricks[i].getBoundingClientRect().bottom +ballRadius * 2 && ballRect.top < gameBricks[i].getBoundingClientRect().bottom))
      console.log("hit right");
      gameBricks[i].remove();
      score += 1;
      console.log("right1", ball.deltaX);
      ball.deltaX = Math.abs(ball.deltaX);
      brick_collided_sound.play()
      //left of brick collision
    } else if (
      ballRect.left < gameBricks[i].getBoundingClientRect().left &&
      ballRect.right >= gameBricks[i].getBoundingClientRect().left &&
      ((ballRect.top > gameBricks[i].getBoundingClientRect().top - ball.radius && ballRect.bottom < gameBricks[i].getBoundingClientRect().bottom + ball.radius)
      )
    ) {
      // (ballRect.bottom > gameBricks[i].getBoundingClientRect().bottom && ballRect.top < gameBricks[i].getBoundingClientRect().bottom)
      console.log("hit left");
      gameBricks[i].remove();
      score += 1;
      ball.deltaX = -Math.abs(ball.deltaX);
      brick_collided_sound.play()
    }
  }
}

function togglePause() {
  if (!paused) {
    pausediv.style.display = "flex";
    paused = true;
    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyR") {
        window.location.reload("true");
      }
    });
  } else if (paused) {
    pausediv.style.display = "none";
    paused = false;
    gameLoop();
  }
}

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (title_started) {
    if (e.code === "KeyP") togglePause();
  }
});

window.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (title_started) {
    if (e.code === "Space") game_started = true;

  }
});


//title screen


window.addEventListener("keydown", function (title) {
  title.preventDefault();
  if (title.code === "Enter") {
    titleDiv.style.display = 'none'
    title_started = true
    requestAnimationFrame(gameLoop);

    this.removeEventListener("keydown", title)

  }

});




//behaves funky within the game loop, frames stable nevertheless
drawBricks();

bricksToTitle();

//one time function
function updateTime(time) {
  updateTime = function () { };
  firstTime = time;
}

function gameOver() {
  const youLoseDiv = document.querySelector("#game-over");
  let scoreSpan = document.querySelector("#final-score");
  if (maxlives === 0) {
    game_over = true;
    game_over_sound.play()
    youLoseDiv.style.display = "flex";
    scoreSpan.innerHTML = `Score:${score}`;
    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyR") {
        window.location.reload("true");
      }
    });
  }
}

// When no bricks left, display you win div
function youWin() {
  let gameBricks = document.getElementsByClassName("brick");
  let youWinDiv = document.querySelector("#you-win");
  let scoreSpan = document.querySelector("#score");
  let secondsSpan = document.querySelector("#time");

  if (gameBricks.length == 0) {
    win_sound.play()
    paused = true
    youWinDiv.style.display = "flex";
    scoreSpan.innerHTML = `Score:${score}`;
    secondsSpan.innerHTML = `Time:${timer}s`;
    window.addEventListener("keydown", (e) => {
      if (e.code === "KeyR") {
        window.location.reload("true");
      }
    });
    // to stop the ball from moving
    game_started = false;
  }
}

// for the game music to keep playing 
game_music.loop = true

function gameLoop() {
  // game_music.play()
  if (title_started) {
    if (paused) {
      a = true;
      return;
    }

    //timer when paused
    if (!paused && a == true) {
      a = false;
      firstTime = performance.now() / 1000;
    }

    //out of bounds/deadball, psuedo-stops timer
    if (game_started && maxlives == livesComp) {
      livesComp--;
      firstTime = performance.now() / 1000;
    }

    scoreboard.innerHTML = score;
    drawPaddle();
    drawBall();
    movePaddleBool();
    movePaddle();
    timeDiv.innerHTML = `${timer}s`

    if (game_started) {
      moveBall();
      updateTime(performance.now() / 1000);

      if (performance.now() / 1000 > firstTime) {
        firstTime++;
        timer++;
      }
    }

    padCollision();
    ballWallCollision(performance.now() / 1000);
    brickCollision();
    gameOver();
    youWin();
    if (!game_over) {
      requestAnimationFrame(gameLoop);
    }
  }

}


requestAnimationFrame(gameLoop);

export{ballDiv, ballRadius, game_started, ball}