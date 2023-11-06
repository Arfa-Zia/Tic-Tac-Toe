const Form = document.querySelector('form');
const newGame = document.querySelector('#new-game');
const resetGame = document.querySelector('#reset-game')
newGame.addEventListener( 'click' , () => {
  location.reload();
})

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
const resetDom = () => {
  document.querySelectorAll('.box').forEach( box => {
    box.className = 'box'
    box.textContent = ''
  }
   
   );
}
const addEventListenerToGameBoard = (data) => {
  document.querySelectorAll('.box').forEach( box => 
    box.addEventListener('click' , (event) => {
    playMove( event.target , data);
  }))
  resetGame.addEventListener( 'click' , () => {
   initializeVariables(data);
   resetDom();
   adjustDom("displayTurn", `${data.playerOneName}'s turn`);

  })
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
  
  if(data.choice === 0){
    changePlayer(data);
  }
  else if ( data.choice === 1){
    easyAiMove(data);
    data.currentPlayer = 'X';
  }
  else if ( data.choice === 2) {
    changePlayer(data);
    hardAiMove(data);
    if(endConditions(data)){
      return
    }
    changePlayer(data);
  }
};

const endConditions = (data) => {

  if (checkWinner(data, data.currentPlayer)) {
    let winnerName =
      data.currentPlayer === "X" ? data.playerOneName : data.playerTwoName;
    adjustDom("displayTurn", winnerName + " has won the game");
    return true;
  } else if (data.round === 9) {
    adjustDom("displayTurn", "It's a Tie!");
    data.gameOver = true;
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
  let displayTurnText =
    data.currentPlayer === "X" ? data.playerOneName : data.playerTwoName;
  adjustDom("displayTurn", `${displayTurnText}'s turn`);
};

const easyAiMove = (data) => {
  changePlayer(data);
  data.round++; 
  let availableSpace = data.board.filter(
    (space) => space !== "X" && space !== "O"
  )
  let move = availableSpace[Math.floor( Math.random() * availableSpace.length )];
  data.board[move] = data.player2;
  setTimeout( () => {
   
  let box = document.getElementById(`${move}`);
  box.textContent = data.player2;
  box.classList.add('player2');
  } , 200);
  
  if(endConditions(data)){
    return;
  }
  changePlayer(data);
}

const hardAiMove = (data) => {
  data.round++
  const move = minimax(data , "O").index;
  data.board[move] =  data.player2;
  let box = document.getElementById(`${move}`);
  box.textContent = data.player2;
  box.classList.add('player2');
}

const minimax = (data , player) => {
  let availableSpace = data.board.filter(
    (space) => space !== "X" && space !== "O"
  )
  if(checkWinner(data , data.player1)){
    return {
      score : -100,
    }
  }
  else if ( checkWinner ( data , data.player2)){
    return {
      score : 100,
    }
  }
  else if( availableSpace.length === 0 ){
    return {
      score : 0,
    }
  }
  const potentialMoves = [];
  for (let i = 0 ; i< availableSpace.length; i++){
   let move= {};
   move.index = data.board[availableSpace[i]];
   data.board[availableSpace[i]] = player;
   if(player === data.player2){
    move.score = minimax(data, data.player1).score
   }
   else{
    move.score = minimax(data , data.player2 ).score;
   }
   data.board[availableSpace[i]] = move.index;
   potentialMoves.push(move);
  }

  let bestMove = 0;
  if(player === data.player2){

    let bestScore = -10000;

    for(let i = 0; i < potentialMoves.length; i++) {

      if (potentialMoves[i].score > bestScore)
       {
        bestScore = potentialMoves[i].score;
        bestMove = i;
        }
     }
   } 
  else if(player === data.player1){

    let bestScore = 10000;

    for(let i = 0; i < potentialMoves.length; i++) {

      if (potentialMoves[i].score < bestScore)
       {
        bestScore = potentialMoves[i].score;
        bestMove = i;
        }
     }
    }
    data.gameOver = false;
    return potentialMoves[bestMove];
}