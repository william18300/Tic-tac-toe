const board = document.querySelector(".gameboard");

let my_arr = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let resetButton = document.querySelector(".reset");
//let sbutton = document.querySelector("#playerSubmit");
const turnDiv = document.getElementById("currentPlayer");
let turnPlayer = 0;
let gameStatus = true;
board.addEventListener("click", (e) => {
  let selection = e.target.innerHTML;
  let position = e.target.id.split("");

  if (gameStatus === false){
    return
  }

  if (turnPlayer === 0 && selection === "" && gameStatus) {
    e.target.innerHTML = "X";
    my_arr[position[0]][position[1]] = "X";
    turnPlayer++;
  } else if (turnPlayer === 1 && selection === "") {
    e.target.innerHTML = "O";
    my_arr[position[0]][position[1]] = "O";
    turnPlayer--;
  }
  const nextPlayer = (turnPlayer % 2 === 0) ? "X" : "O";
  document.getElementById("currentPlayer").innerText = `Player turn: ${nextPlayer}`;
  findWinner();
});

export const Transpose = (m) => {
    let newMatrix = [[],[],[]]
    
    for(let i = 0 ; i < m.length ; i++){
        m[i].forEach((item,index) => newMatrix[index].push(item) )
    }
    return newMatrix
}

// Get diagonal values
export const Dia = (m) => {
    return [
        [m[0][0], m[1][1], m[2][2]],  // Top-left to bottom-right
        [m[0][2], m[1][1], m[2][0]]   // Top-right to bottom-left
    ]
}

// Check rows/columns/diagonals for matches
export const Checker = (matrix) => {
    return matrix.map((item) => item.join(""))
        .filter((item) => (item === "XXX" ? "XXX" : item === "OOO" ? "OOO" : null))
}

export const Winner = (type) => {
    document.getElementById('winner').innerHTML = `Congratulations ${type} Got the W`
    gameStatus = false;
}

export const Draw = () => {
    const isBoardFull = my_arr.every(row => row.every(cell => cell !== null));
    
    if (isBoardFull && gameStatus) {
        document.getElementById('winner').innerHTML = "It's a Draw!";
        gameStatus = false;
    }
}

function findWinner() {
  let row = Checker(my_arr)
  let columnArr = Checker(Transpose(my_arr))
  let diagnols = Checker(Dia(my_arr))

  if (row[0] === "XXX" || columnArr[0] === "XXX" || diagnols[0] === "XXX") {
    console.log("X is the Winner");
    Winner('X')
  }
  if (row[0] === "OOO" || columnArr[0] === "OOO" || diagnols[0] === "OOO") {
    console.log("O is the winner");
    Winner('O')
  }
  Draw();
}

resetButton.addEventListener("click", (e) => {
  // Clear all cell content
  [...document.querySelectorAll("td")].forEach(
    (tdDomElement) => (tdDomElement.innerHTML = "")
  );
 
  // Clear winner message
  document.getElementById('winner').innerHTML = '';
  
  // Reset game state array
  my_arr = [[null,null,null],[null,null,null],[null,null,null]];
  
  // Reset turn counter
  turnPlayer = 0;
  gameStatus = true;
});


