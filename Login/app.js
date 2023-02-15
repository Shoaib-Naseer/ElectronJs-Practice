let { ipcRenderer } = require('electron');

let form = document.querySelector('form');
let input = document.querySelector('input');
let pass = document.getElementById('pass');
let email = document.getElementById('email');
let responses = document.querySelector('#responses');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  let neweEmail = email.value;
  let newPass = pass.value;
  email.value = '';
  pass.value = '';
  let responseText = await ipcRenderer.invoke('console', neweEmail, newPass);
  let response = document.createElement('div');
  response.textContent = responseText;
  responses.appendChild(response);
});
