



export function draw(gameBoard) {
    for (let i = 5; i < 20; i++) {
        const brick = document.createElement('div')
        brick.classList.add('brick')
        brick.style.gridRowStart = 12
        brick.style.gridColumnStart = i;
        gameBoard.appendChild(brick)
    }
}
