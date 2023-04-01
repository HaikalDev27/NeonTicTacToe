
var currentPlayer = "X";
var board = ["", "", "", "", "", "", "", "", ""];
var winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function switchPlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
  }
  
function checkWin() {
    for (var i = 0; i < winningCombinations.length; i++) {
        var combo = winningCombinations[i];
        var a = board[combo[0]];
        var b = board[combo[1]];
        var c = board[combo[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
      
        if (a === b && b === c) {
            return true;
        }
    }
      
    return false;
}
      
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
      
    var cells = document.querySelectorAll("#game-board td");
    for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
    }
}
      
function handleClick(event) {
    var cell = event.target;
    var cellIndex = parseInt(cell.getAttribute("id").slice(5));
      
    if (board[cellIndex] !== "") {
        return;
    }
      
    cell.textContent = currentPlayer;
    board[cellIndex] = currentPlayer;
      
    if (checkWin()) {
        alert("Player " + currentPlayer + " wins!");
        resetGame();
        return;
    }
      
    if (board.every(function(value) { return value !== "" })) {
        alert("It's a tie!");
        resetGame();
        return;
    }
      
    switchPlayer();
}

document.querySelector("#player1").addEventListener("click", function() {
    currentPlayer = "X";
});
      
document.querySelector("#player1").addEventListener("click", function() {
    currentPlayer = "O";
});
      
document.querySelector("#reset").addEventListener("click", resetGame);
      
var cells = document.querySelectorAll("#game-board td");
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", handleClick);
}
      