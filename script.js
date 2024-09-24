let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameActive = true;
let isVsComputer = false;

const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const playerVsPlayerBtn = document.getElementById('player-vs-player');
const playerVsComputerBtn = document.getElementById('player-vs-computer');
const winningLineElement = document.getElementById('winning-line');

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const clickedCell = event.target;
  const clickedCellIndex = clickedCell.getAttribute('data-index');

  if (board[clickedCellIndex] !== '' || !isGameActive) {
    return;
  }

  updateCell(clickedCell, clickedCellIndex);
  checkWinner();
  if (isVsComputer && currentPlayer === 'O' && isGameActive) {
    setTimeout(computerMove, 500);
  }
}

function updateCell(cell, index) {
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function checkWinner() {
  let roundWon = false;
  let winningIndices = [];

  for (let i = 0; i < winningConditions.length; i++) {
    const winCondition = winningConditions[i];
    const a = board[winCondition[0]];
    const b = board[winCondition[1]];
    const c = board[winCondition[2]];

    if (a === '' || b === '' || c === '') {
      continue;
    }

    if (a === b && b === c) {
      roundWon = true;
      winningIndices = winCondition;
      break;
    }
  }

  if (roundWon) {
    statusElement.textContent = `Player ${currentPlayer} Wins!`;
    drawWinningLine(winningIndices);
    isGameActive = false;
    return;
  }

  if (!board.includes('')) {
    statusElement.textContent = 'It\'s a draw!';
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  statusElement.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
  
    isGameActive = true;
    currentPlayer = 'X';
    statusElement.textContent = `Player X's turn`;
  
    document.querySelectorAll('.cell').forEach(
    cell => {
      cell.textContent = '';
      cell.style.backgroundColor = ''; 
      cell.classList.remove('winning-cell'); 
    }
    );
  }
  

function computerMove() {
  let availableCells = [];
  board.forEach((cell, index) => {
    if (cell === '') availableCells.push(index);
  });

  const randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
  const randomCell = document.querySelector(`.cell[data-index="${randomIndex}"]`);

  updateCell(randomCell, randomIndex);
  checkWinner();
}

playerVsPlayerBtn.addEventListener('click', () => {
  isVsComputer = false;
  playerVsComputerBtn.style.backgroundColor="";
  playerVsPlayerBtn.style.backgroundColor="green";
  restartGame();
});

playerVsComputerBtn.addEventListener('click', () => {
  isVsComputer = true;
  playerVsPlayerBtn.style.backgroundColor="";
  playerVsComputerBtn.style.backgroundColor="green";
  restartGame();
});
function checkWinner() {
    let roundWon = false;
    let winningIndices = [];
  
    for (let i = 0; i < winningConditions.length; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
  
      if (a === '' || b === '' || c === '') {
        continue;
      }
  
      if (a === b && b === c) {
        roundWon = true;
        winningIndices = winCondition;
        break;
      }
    }
  
    if (roundWon) {
      statusElement.textContent = `Player ${currentPlayer} Wins!`;
      highlightWinningCells(winningIndices); // Highlight winning cells
      isGameActive = false;
      return;
    }
  
    if (!board.includes('')) {
      statusElement.textContent = 'It\'s a draw!';
      isGameActive = false;
      return;
    }
  
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusElement.textContent = `Player ${currentPlayer}'s turn`;
  }
  
  function highlightWinningCells(indices) {
    indices.forEach(index => {
      const cell = document.querySelector(`.cell[data-index="${index}"]`);
      cell.classList.add('winning-cell'); // Add class to winning cells
    });
  }
  

restartBtn.addEventListener('click', restartGame);
boardElement.addEventListener('click', handleCellClick);
