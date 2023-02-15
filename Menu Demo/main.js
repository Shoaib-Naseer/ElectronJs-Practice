const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const electron = require('electron');
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
let win;

function createWindow() {
  win = new BrowserWindow();
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true,
    })
  );

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', function () {
  createWindow();
  const template = [
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' },
      ],
    },
    {
      label: 'demo',
      submenu: [
        {
          label: 'subMenu1',
        },
        {
          label: 'subMenu1',
        },
      ],
    },
    {
      label: 'help',
      click: function () {
        electron.shell.openExternal('http://electron.atom.io');
      },
    },
  ];
  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);

  const ctxMenu = new Menu();
  ctxMenu.append(new MenuItem({ label: 'hello' }));
  ctxMenu.append(new MenuItem({ role: 'selectAll' }));

  win.webContents.on('context-menu', function (e, params) {
    ctxMenu.popup(win, params.x, params.y);
  });
});

app.on('window-all-closed', () => {
  if (process.platform != 'darwin') {
    app.quit();
  }
});
