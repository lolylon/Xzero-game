const board = document.querySelector(".board");
const cells = document.querySelectorAll(".cell");
const message = document.querySelector(".message");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;
const boardState = Array(9).fill(null);

let scores = { X: 0, O: 0 };
let playingWith = "friend"; 

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

function startGame(mode) {
  playingWith = mode; 
  restartGame(); 
}

function computerMove() {
  const emptyCells = boardState
    .map((cell, index) => (cell === null ? index : null))
    .filter(index => index !== null);

  if (emptyCells.length === 0) return;

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex);
}

function makeMove(index) {
  if (boardState[index] !== null || !gameActive) return;

  boardState[index] = currentPlayer;
  document.querySelectorAll(".cell")[index].textContent = currentPlayer;

  if (checkWin()) {
    scores[currentPlayer]++;
    alert(`Игрок ${currentPlayer} победил!`);
    message.textContent = `Игрок ${currentPlayer} победил!`;
    updateScoreboard();
    gameActive = false;
    return;
  }

  if (boardState.every(cell => cell !== null)) {
    alert("Ничья!");
    message.textContent = "Ничья!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  message.textContent = `Ход игрока ${currentPlayer}`;

  if (playingWith === "computer" && currentPlayer === "O") {
    setTimeout(computerMove, 500); 
  }
}

function checkWin() {
  return winningCombinations.some(combination =>
    combination.every(index => boardState[index] === currentPlayer)
  );
}

function restartGame() {
  boardState.fill(null);
  cells.forEach(cell => {
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

const menuButtons = document.getElementById("menu").querySelectorAll("button");
menuButtons.forEach(button => {
  button.addEventListener("click", event => {
    const mode = event.target.getAttribute("onclick").match(/'(.*?)'/)[1];
    startGame(mode);
  });
});

cells.forEach(cell => cell.addEventListener("click", event => {
  const index = event.target.dataset.index;
  makeMove(Number(index));
}));

restartButton.addEventListener("click", restartGame);
message.textContent = "Ход игрока X";
