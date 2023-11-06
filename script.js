const Form = document.querySelector('form');
const dialog = document.querySelector('dialog');

Form.addEventListener( 'submit' , () => { 
  const formData = new FormData(Form);
  const data = Object.fromEntries(formData);
  console.log(data)
})