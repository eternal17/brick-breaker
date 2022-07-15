  //const padFloor = ballRect.bottom + parseInt(gameCompStyles.border) >= padRect.top;

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