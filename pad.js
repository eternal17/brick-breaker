function createPad(gameBoard) {
    const pad = document.createElement("div");
    pad.classList.add("pad");
    gameBoard.appendChild(pad);
}



function movePad() {

    window.addEventListener("keydown", function (e) {
        let pad = document.querySelector(".pad");
        let padStyle = window.getComputedStyle(pad)
        let padStart = parseInt(padStyle.gridColumnStart)
        let padEnd = parseInt(padStyle.gridColumnEnd)

        if (e.key === "ArrowRight" && padStart < 19) {
            pad.style.gridColumnStart = padStart + 1;
            pad.style.gridColumnEnd = padEnd + 1;
        }

        if (e.key === "ArrowLeft" && padEnd > 6) {
            pad.style.gridColumnStart = padStart - 1;
            pad.style.gridColumnEnd = padEnd - 1;
        }
    });

    // grid-column-start: 10; /*x*/
    // grid-column-end: 15;
}

export { createPad, movePad };
