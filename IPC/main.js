const { app, BrowserWindow } = require('electron');
const path = require('path');
const electron = require('electron');
const url = require('url');
const ipc = electron.ipcMain;
const dialog = electron.dialog;

let win;

function createWindow() {
  win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    })
  );

  ipc.on('sync-msg', function (event) {
    event.returnValue = 'sync-reply';
  });

  ipc.on('async-msg', function (event) {
    // dialog.showErrorBox('An Error Message', 'Demo of an Error Object');
    event.sender.send('async-reply', 'Main process Handled the async Reply');
  });

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
