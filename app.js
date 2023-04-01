const opponentSelect = document.getElementById('opponent');
const startGameButton = document.getElementById('start-game');

startGameButton.addEventListener('click', () => {
    const opponent = opponentSelect.value;
    if (opponent === 'computer') {
      startComputerGame();
      resetsGame();
    } else {
      opponent === 'human';
    }
    if (opponent === 'human') {
      startHumanGame();
      resetsGame();
    } else {
      opponent === 'computer';
    }
});

function resetsGame() {
  var cells = document.querySelectorAll("#game-board td");
  for (var i = 0; i < cells.length; i++) {
  cells[i].textContent = "";
  }
}

function startComputerGame() {

  let board = ['', '', '', '', '', '', '', '', ''];
  var gameEnded = false;

  function makeMove(cell, player) {
    board[cell] = player;
    updateBoard();
  }
  
  function aiMove() {
    if (gameEnded) {
      return;
    }

    // Cari kotak yang masih kosong
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
      if (board[i] === '') {
        emptyCells.push(i);
      }
    }
    
    // Pilih kotak secara acak dari kotak kosong
    let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    // Lakukan pergerakan AI
    makeMove(move, 'O');
  }
  
  function checkWin(player) {
    // Cek baris
    for (let i = 0; i < 9; i += 3) {
      if (board[i] === player && board[i + 1] === player && board[i + 2] === player) {
        return true;
      }
    }
    
    // Cek kolom
    for (let i = 0; i < 3; i++) {
      if (board[i] === player && board[i + 3] === player && board[i + 6] === player) {
        return true;
      }
    }
    
    // Cek diagonal
    if ((board[0] === player && board[4] === player && board[8] === player) || (board[2] === player && board[4] === player && board[6] === player)) {
      return true;
    }
    
    return false;
  }
  
  function updateBoard() {
    for (let i = 0; i < board.length; i++) {
      document.getElementById(`cell-${i}`).textContent = board[i];
    }
    
    // Periksa jika ada kemenangan
    if (checkWin('X')) {
      alert('Player 1 wins!');
      resetGames();
      gameEnded = true;
    } else if (checkWin('O')) {
      alert('Player 2 wins!');
      resetGames();
      gameEnded = true;
    }
    
    // Jika tidak ada kotak yang tersedia, berarti game seri
    if (!board.includes('')) {
      alert('Game is a draw!');
      resetGames();
      gameEnded = true;
    }
  }
  
  function resetGames() {
    board = ['', '', '', '', '', '', '', '', ''];
    updateBoard();
  }
  
  // Event listener untuk player 1
  document.getElementById('game-board').addEventListener('click', function(event) {
    if (event.target.tagName === 'TD' && board[event.target.id.slice(-1)] === '') {
      makeMove(event.target.id.slice(-1), 'X');
      setTimeout(function() {
        aiMove();
      }, 1000); // 1000 ms delay
    }
  });
  
  // Event listener untuk reset button
  document.getElementById('reset').addEventListener('click', resetGames);  
}

function startHumanGame() {
    
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
      
}