import { collidedPadLeft, collidedPadRight, collTopLeft, collTopRight } from "./ball.js";

function draw(gameBoard) {
    for (let i = 5; i < 20; i++) {
        const brick = document.createElement("div");
        brick.classList.add("brick");
        brick.style.gridRowStart = 8;
        brick.style.gridColumnStart = i;
        // brick.style.gridColumnEnd = i + 1;
        // need to eventually make each brick bigger
        // brick.style.gridColumnEnd = i + 2
        gameBoard.appendChild(brick);
    }
}

function brickCollision() {
    // need the bricks dom rect, the ball dom rect, if the ball dimensions
    // come into same dimensions as the brick, remove element

    let ball = document.querySelector(".ball");
    let bricks = document.querySelectorAll(".brick");

    //let brickValues = window.getComputedStyle(brick);
    let ballValues = window.getComputedStyle(ball);
    let ballColumn = parseInt(ballValues.gridColumnStart);
    let ballBottom = parseInt(ballValues.gridRowStart);

    for (let i = 0; i < bricks.length; i++) {

        let brickValues = window.getComputedStyle(bricks[i])

        // if the ball hits bottom side of brick
        if (ballBottom == brickValues.gridRowStart && ballColumn == brickValues.gridColumnStart) {
            bricks[i].classList.remove('brick')
        }
    }


}

export { draw, brickCollision };
