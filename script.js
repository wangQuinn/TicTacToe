const cells = document.querySelectorAll(".cell");
        const statusText = document.getElementById("status");
        const restartButton = document.getElementById("restart");

        let currentPlayer = "X";
        let board = Array(9).fill(null);
        let gameActive = true;

        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        cells.forEach(cell => {
            cell.addEventListener("click", handleCellClick);
        });

        restartButton.addEventListener("click", restartGame);

        function handleCellClick(e) {
            const index = e.target.dataset.index;

            if (board[index] || !gameActive) return;

            board[index] = currentPlayer;
            e.target.setAttribute('data-value', currentPlayer);

            if (checkWinner()) {
                const emoji = currentPlayer === "X" ? "🍓" : "🫐";
                statusText.textContent = `Player ${currentPlayer} ${emoji} wins!`;
                gameActive = false;
                return;
            }

            if (board.every(cell => cell !== null)) {
                statusText.textContent = "It's a draw!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            const emoji = currentPlayer === "X" ? "🍓" : "🫐";
            statusText.textContent = `Player ${currentPlayer}'s turn ${emoji}`;
        }

        function checkWinner() {
            return winningCombinations.some(combo => {
                return combo.every(index => board[index] === currentPlayer);
            });
        }

        function restartGame() {
            board = Array(9).fill(null);
            gameActive = true;
            currentPlayer = "X";
            statusText.textContent = "Player X's turn 🍓";
            cells.forEach(cell => {
                cell.removeAttribute('data-value');
            });
        }