const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Create 9 cells
for (let i = 0; i < 9; i++) {
  const cell = document.createElement("div");
  cell.dataset.index = i;
  board.appendChild(cell);
}

const winningConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

board.addEventListener("click", (e) => {
  const cell = e.target;
  const index = cell.dataset.index;

  if (!gameActive || gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (!gameState.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
});

restartButton.addEventListener("click", () => {
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "";
  document.querySelectorAll(".board div").forEach(cell => cell.textContent = "");
});

function checkWin() {
  return winningConditions.some(combination => {
    return combination.every(index => gameState[index] === currentPlayer);
  });
}
