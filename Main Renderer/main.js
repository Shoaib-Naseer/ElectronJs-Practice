const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let winOne, winTwo;

function createWindow() {
  //Creating Two Separate Windows
  winOne = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  winTwo = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
    },
  });

  winOne.loadURL(
    url.format({
      pathname: path.join(__dirname, 'one.html'),
      protocol: 'file',
      slashes: true,
    })
  );

  winTwo.loadURL(
    url.format({
      pathname: path.join(__dirname, 'two.html'),
      protocol: 'file',
      slashes: true,
    })
  );

  winOne.webContents.openDevTools();
  winTwo.webContents.openDevTools();

  // winOne.on('closed', () => {
  //   winOne = null;
  // });

  // winTwo.on('closed', () => {
  //   winTwo = null;
  // });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
