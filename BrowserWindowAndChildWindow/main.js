const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win, child;

function createWindow() {
  win = new BrowserWindow();
  child = new BrowserWindow({
    parent: win,
    width: 400,
    height: 500,
    modal: true,
    //bydefault it will not show
    show: false,
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    })
  );
  child.loadURL('https://github.com');
  child.once('ready-to-show', () => {
    child.show();
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
