import {   game_started, ball, gameCompStyles} from "./game.js";

import{ballDiv, ballRadius} from "./ball.js"

// gameboard variables
const gameBoard = document.querySelector(".game-board");
const gameBoardRect = gameBoard.getBoundingClientRect();


// paddle variables
const paddle_width = 100;
const paddle_margin_bottom = 50;
const paddle_height = 20;

const pad = document.createElement("div");
const padCompStyles = window.getComputedStyle(pad);

//sound
const paddle_hit_sound = new Audio('./assets/paddlehit.mp3')


let paddle = {
  // start is used to track the translated values
  start: 0,
  x: gameBoardRect.width / 2 - paddle_width / 2,
  // y value is the top left corner value of the paddle
  y: gameBoardRect.height - paddle_margin_bottom - paddle_height,
  width: paddle_width,
  height: paddle_height,
  xMovement: 20,
  right: false,
  left: false,
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

  
//translates paddle on the X axis
function movePaddle() {
    const padRect = pad.getBoundingClientRect();
  
    if (paddle.right) {
      if (padRect.right + paddle.xMovement <= gameBoardRect.right) {
        paddle.start += paddle.xMovement;
      } else {
        paddle.start += gameBoardRect.right - padRect.right;
      }
  
      if (!game_started) {
        ballDiv.style.transform = `translateX(${paddle.start}px)`;
        pad.style.transform = `translateX(${paddle.start}px)`;
        paddle.right = false;
      }
  
      pad.style.transform = `translate(${paddle.start}px)`;
      paddle.right = false;
    }
  
    if (paddle.left) {
      if (padRect.left - paddle.xMovement >= gameBoardRect.left) {
        paddle.start -= paddle.xMovement;
      } else {
        paddle.start -= padRect.left - gameBoardRect.left;
      }
      if (!game_started) {
        ballDiv.style.transform = `translate(${paddle.start}px)`;
        pad.style.transform = `translate(${paddle.start}px)`;
        paddle.left = false;
      }
  
      pad.style.transform = `translate(${paddle.start}px)`;
      paddle.left = false;
    }
  }
  
  
function padCollision() {
    //also tried making the below two variables global but causes errors
    const ballRect = ballDiv.getBoundingClientRect();
    const padRect = pad.getBoundingClientRect();
  
    //added + ballRect.height
    if (ballRect.x < padRect.x + padRect.width && ballRect.x + ballRadius * 2 > padRect.x && ballRect.bottom >= padRect.top && ball.deltaY > 0) {
  
      // play sound
      if (game_started) {
        paddle_hit_sound.play()
      }
      // CHECK WHERE THE ballRect HIT THE PADDLE
      let collidePoint = ballRect.x - (padRect.x + padRect.width / 2);
  
      // NORMALIZE THE VALUES
      collidePoint = collidePoint / (padRect.width / 2);
  
      // CALCULATE THE ANGLE OF THE ballRect
      let angle = (collidePoint * Math.PI) / 3;
  
      ball.deltaX = ball.speed * Math.sin(angle);
      ball.deltaY = -ball.speed * Math.cos(angle);
    }
  }
  

  
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


export{paddle, drawPaddle, movePaddle, padCollision, pad, movePaddleBool, paddle_width, paddle_height}