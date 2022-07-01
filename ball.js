
export function drawBall(gameBoard) {
  const ball = document.createElement("div");
  ball.classList.add("ball");
  gameBoard.appendChild(ball);
}
