const { app, BrowserWindow, BrowserView } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    icon: path.join(__dirname, '/icon.png'),
    backgroundColor: "#9569f3",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      plugins: true,
      contextIsolation: false,
      webSecurity: false
    }
  });

  mainWindow.setMenu(null);
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools();

  const view = new BrowserView();
  mainWindow.setBrowserView(view);
  view.setAutoResize({
    width: true,
    height: true
  });
  view.webContents.loadURL('https://www.habbocity.me');
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
