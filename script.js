const Form = document.querySelector('form');
const dialog = document.querySelector('dialog');

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
  console.log( box , data)
}