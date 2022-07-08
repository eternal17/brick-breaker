export function draw(gameBoard) {
    for (let i = 5; i < 20; i++) {
        const brick = document.createElement('div')
        brick.classList.add('brick')
        brick.style.gridRowStart = 12
        brick.style.gridColumnStart = i;
        // need to eventually make each brick bigger
        // brick.style.gridColumnEnd = i + 2
        gameBoard.appendChild(brick)
    }
}


// export function brickCollision() {
//     // need the bricks dom rect, the ball dom rect, if the ball dimensions
//     // come into same dimensions as the brick, remove element



// }