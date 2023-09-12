const squares = document.querySelectorAll('.square');
const message = document.querySelector('#message');
const restart = document.querySelector('#restart');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameEnded = false;

function playSquare(index) {
  if (!gameEnded && board[index] === '') {
    board[index] = currentPlayer;
    squares[index].classList.add(`played-${currentPlayer.toLowerCase()}`);
    squares[index].setAttribute('disabled', true);
    checkWin();
    changePlayer();
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  message.innerText = `It's ${currentPlayer}'s turn`;
}

function checkWin() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    if (
      board[combo[0]] !== '' &&
      board[combo[0]] === board[combo[1]] &&
      board[combo[1]] === board[combo[2]]
    ) {
      message.innerText = `${currentPlayer} wins!`;
      gameEnded = true;
      for (let index of combo) {
        squares[index].classList.add('winner');
      }
    }
  }

  if (!board.includes('') && !gameEnded) {
    message.innerText = 'It\'s a tie!';
    gameEnded = true;
  }
}

function restartGame() {
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameEnded = false;

  for (let square of squares) {
    square.removeAttribute('disabled');
    square.classList.remove('played-x', 'played-o', 'winner');
  }

  message.innerText = `It's ${currentPlayer}'s turn`;
}

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', function() {
    playSquare(i);
  });
}

restart.addEventListener('click', function() {
  restartGame();
});
