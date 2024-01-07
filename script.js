document.addEventListener('DOMContentLoaded', function () {
    let board = initializeBoard();
    let currentPlayer = 'X';
    let gameOver = false;

    function initializeBoard() {
        return [
            [' ', ' ', ' '],
            [' ', ' ', ' '],
            [' ', ' ', ' ']
        ];
    }

    function printBoard(board) {
        const boardContainer = document.getElementById('boardContainer');

        if (!boardContainer) {
            console.error("Error: 'boardContainer' not found in the HTML.");
            return;
        }

        boardContainer.innerHTML = '';

        boardContainer.style.display = 'grid';
        boardContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cellElement = document.createElement('div');
                cellElement.classList.add('board-cell');
                cellElement.dataset.row = row;
                cellElement.dataset.col = col;

                if (board[row] && board[row][col]) {
                    cellElement.textContent = board[row][col];
                }

                boardContainer.appendChild(cellElement);
            }
        }
    }

    function playRound(row, col) {
        if (board[row][col] === ' ') {
            board[row][col] = currentPlayer;
            return true;
        } else {
            console.log('Invalid move. Try again.');
            return false;
        }
    }

    function checkWin(player) {
        for (let i = 0; i < 3; i++) {
            if (
                (board[i][0] === player && board[i][1] === player && board[i][2] === player) ||
                (board[0][i] === player && board[1][i] === player && board[2][i] === player)
            ) {
                return true;
            }
        }

        if (
            (board[0][0] === player && board[1][1] === player && board[2][2] === player) ||
            (board[0][2] === player && board[1][1] === player && board[2][0] === player)
        ) {
            return true;
        }

        return false;
    }

    function isBoardFull() {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === ' ') {
                    return false;
                }
            }
        }
        return true;
    }

    function handleClick(row, col) {
        if (!gameOver) {
            if (row >= 0 && row < 3 && col >= 0 && col < 3) {
                if (playRound(row, col)) {
                    printBoard(board);

                    if (checkWin(currentPlayer)) {
                        console.log(`Player ${currentPlayer} wins!`);
                        gameOver = true;
                    }

                    if (isBoardFull()) {
                        console.log("It's a tie!");
                        gameOver = true;
                    }

                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            } else {
                console.log('Invalid move. Row and column must be between 0 and 2.');
            }
        }
    }

    function restartGame() {
        board = initializeBoard();
        currentPlayer = 'X';
        gameOver = false;
        printBoard(board);
    }

    restartGame();

    document.getElementById('boardContainer').addEventListener('click', function (event) {
        const cell = event.target;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        handleClick(row, col);
    });
});
