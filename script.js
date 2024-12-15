const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
const boardState = Array(9).fill(null);

let scores = { X: 0, O: 0 };

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

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (!gameActive || boardState[index] !== null) {
    return;
  }

  boardState[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWin()) {
    scores[currentPlayer]++;
    alert(`Игрок ${currentPlayer} победил!`);
    message.textContent = `Игрок ${currentPlayer} победил!`;  
    updateScoreboard();
    gameActive = false;
  } else if (boardState.every((cell) => cell !== null)) {
    alert("Ничья!");
    message.textContent = "Ничья!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    message.textContent = `Ход игрока ${currentPlayer}`;
  }
}

function checkWin() {
  return winningCombinations.some((combination) =>
    combination.every((index) => boardState[index] === currentPlayer)
  );
}

function restartGame() {
  boardState.fill(null);
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  currentPlayer = "X";
  gameActive = true;
  message.textContent = "Ход игрока X";
}

function updateScoreboard() {
  const scoreboard = document.querySelector(".scoreboard");
  scoreboard.textContent = `Счёт: X - ${scores.X}, O - ${scores.O}`;
}


cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
message.textContent = "Ход игрока X";
