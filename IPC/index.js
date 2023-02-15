const electron = require('electron');
const ipc = electron.ipcRenderer;

console.log('Running');

const asyncBtn = document.getElementById('asyncBtn');
const syncBtn = document.getElementById('syncBtn');

asyncBtn.addEventListener('click', function () {
  console.log('Before Sending async');
  ipc.send('async-msg');
  console.log('After Sending async');
});

syncBtn.addEventListener('click', function () {
  console.log('Before Sending the Sync');
  const reply = ipc.sendSync('sync-msg');
  console.log(reply);
  console.log('After Sending the Sync');
});

ipc.on('async-reply', function (event, arg) {
  console.log(arg);
});
