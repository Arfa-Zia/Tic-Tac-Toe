const Form = document.querySelector('form');
const winningConditions = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6] 
]
Form.addEventListener( 'submit' , () => { 
  const formData = new FormData(Form);
  const data = Object.fromEntries(formData);
  initializeGame(data)
})

const initializeVariables = (data) => {
  data.choice = +data.choice;
  data.board = [0,1,2,3,4,5,6,7,8];
  data.player1 = 'X';
  data.player2 = 'O';
  data.round = 0;
  data.currentPlayer = 'X';
  data.gameOver  = false;
}
const initializeGame = (data) => {
  adjustDom("displayTurn", `${data.playerOneName}'s turn`);
 initializeVariables(data);
 addEventListenerToGameBoard(data);
}

const addEventListenerToGameBoard = (data) => {
  document.querySelectorAll('.box').forEach( box => 
    box.addEventListener('click' , (event) => {
    playMove( event.target , data);
  }))
}
const playMove = (box , data) => {
  if(data.gameOver || data.round > 8){
    return;
  }
  if(data.board[box.id] == 'X' || data.board[box.id] == 'O'){
    return;
  }
  data.board[box.id] = data.currentPlayer;
  box.textContent = data.currentPlayer;
  box.classList.add(data.currentPlayer === 'X' ? 'player1' : 'player2')
  data.round++
 
  if(endConditions(data)){
   return
  }
  else {
    changePlayer(data);
  }
};

const endConditions = (data) => {
  //3 potential options,
  //winner
  //tie
  //game not over yet
  if (checkWinner(data, data.currentPlayer)) {
    //adjust the dom to reflect win
    let winnerName =
      data.currentPlayer === "X" ? data.playerOneName : data.playerTwoName;
    adjustDom("displayTurn", winnerName + " has won the game");
    return true;
  } else if (data.round === 9) {
    adjustDom("displayTurn", "It's a Tie!");
    data.gameOver = true;
    //adjust the dom to reflect tie
    return true;
  }
  return false;
};

const checkWinner = (data, player) => {
  let result = false;
  winningConditions.forEach((condition) => {
    if (
      data.board[condition[0]] === player &&
      data.board[condition[1]] === player &&
      data.board[condition[2]] === player
    ) {
      result = true;
    }
  });
  return result;
};

const adjustDom = (className, textContent) => {
  const elem = document.querySelector(`.${className}`);
  elem.textContent = textContent;
};

const changePlayer = (data) => {
  data.currentPlayer = data.currentPlayer === "X" ? "O" : "X";
  //adjust the dom
  let displayTurnText =
    data.currentPlayer === "X" ? data.playerOneName : data.playerTwoName;
  adjustDom("displayTurn", `${displayTurnText}'s turn`);
};