
const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');
const restartButton = document.querySelector('.restart');

let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;
let gameMode = 'player';

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.getAttribute('data-index'));

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent =currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // Add class based on current player
    checkResult();

    if (gameMode === 'ai' && gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        aiMove();
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] === '' || board[b] === '' || board[c] === '') {
            continue;
        }
        if (board[a] === board[b] && board[b] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusElement.textContent = `Player ${currentPlayer} has won!`;
        gameActive = false;
        restartButton.style.display = 'block';
        return;
    }

    if (!board.includes('')) {
        statusElement.textContent = 'Game ended in a draw!';
        gameActive = false;
        restartButton.style.display = 'block';
        return;
    }

    statusElement.textContent = `It's ${currentPlayer}'s turn`;
}

function aiMove() {
    let availableIndices = board.map((value, index) => value === '' ? index : null).filter(val => val !== null);
    let move = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    board[move] = currentPlayer;
    const cell = document.querySelector(`.cell[data-index='${move}']`);
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase()); // Add class based on current player
    checkResult();
    currentPlayer = 'X';
}

function restartGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    statusElement.textContent = `It's ${currentPlayer}'s turn`;
    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o'); // Remove previous classes
    });
    restartButton.style.display = 'none';
}

function startGame(mode) {
    gameMode = mode;
    restartGame();
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));


