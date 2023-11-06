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
 console.log(data);
}