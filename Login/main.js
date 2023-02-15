const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
let { ipcMain } = require('electron');

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

  ipcMain.handle('console', function (event, neweEmail, newPass) {
    console.log(`Received from frontend: ${neweEmail} and  ${newPass}`);
    return `Backend confirms it received: ${neweEmail} and  ${newPass}`;
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
