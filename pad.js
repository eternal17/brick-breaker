function createPad(gameBoard) {
  const pad = document.createElement("div");
  pad.classList.add("pad");
  gameBoard.appendChild(pad);
}

function movePad() {
  let pad = document.querySelector(".pad");
  console.log(pad.style.gridColumnStart);

  window.addEventListener("keydown", function (e) {
    var rightStart = parseInt(pad.style.gridColumnStart);
    var rightEnd = parseInt(pad.style.gridColumnEnd);

    if (e.key === "ArrowRight") {
      pad.style.gridColumnStart = rightStart + 1;
      pad.style.gridColumnEnd = rightEnd + 1;
    }

    if (e.key === "ArrowLeft") {
      pad.style.gridColumnStart -= 1;
      pad.style.gridColumnEnd -= 1;
    }
  });

  // grid-column-start: 10; /*x*/
  // grid-column-end: 15;
}

export { createPad, movePad };
