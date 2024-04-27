const gridSize = 3;
const boardref = document.querySelector(".tic-tac-toe");
const winnerRef = document.querySelector(".winner");

let currentPlayer = "X";
const game = [...Array(gridSize)].map((e) => Array(gridSize).fill(undefined));

function createBoard() {
  for (let i = 0; i < gridSize; i++) {
    const rowRef = document.createElement("div");
    rowRef.classList.add("row");
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-rowId", i);
      cell.setAttribute("data-colId", j);
      rowRef.appendChild(cell);
    }
    boardref.appendChild(rowRef);
  }
}

function changePlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner(rowId, colId) {
  //check row
  if (checkLine(game[rowId])) {
    return true;
  }

  //check column
  const colValues = game.map((row) => row[colId]);
  if (checkLine(colValues)) {
    return true;
  }

  if (rowId === colId) {
    //check digonal
    const digonalValues = game.map((row, idx) => row[idx]);
    if (checkLine(digonalValues)) {
      return true;
    }

    // check reverse digonal
    const reverseDigonalValues = game.map(
      (row, idx) => row[gridSize - idx - 1]
    );
    if (checkLine(reverseDigonalValues)) {
      return true;
    }
  }
  return false;
}

function checkLine(arr) {
  return arr.every((ele) => ele !== undefined && arr[0] === ele);
}
function updateGame(row, col, value) {
  game[row][col] = value;
}
boardref.addEventListener("click", (e) => {
  if (e.target.textContent) return;
  if (e.target.nodeName === "DIV" && e.target.classList.contains("cell")) {
    let nextVal = getMinerSweeperValue();
    let printVal = currentPlayer;

    if (nextVal === "*") {
      printVal = "*";
    }

    e.target.innerText = printVal;
    const rowId = e.target.dataset.rowid;
    const colId = e.target.dataset.colid;

    updateGame(rowId, colId, printVal);
    const isWinner = checkWinner(rowId, colId);
    if (isWinner) {
      winnerRef.textContent = `${currentPlayer} is winner`;
    }

    if (nextVal !== "+") {
      changePlayer();
    }
  }
});

function getMinerSweeperValue() {
  const options = ["+", "*", "-"];
  const randomValue = Math.floor(Math.random() * 10) % 3;
  return options[randomValue];
}

function onRefresh() {
  boardref.innerHTML = "";
  createBoard();
}

createBoard();

// create board
// add eventlistner to board
// check winner -> n2 to n by just checking particular row and column

// exending to MineSweeper
// * -> chance is wested
// + -> extra chance
// X/O ->  normal turn



