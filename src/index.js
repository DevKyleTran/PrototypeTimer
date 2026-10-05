const { app, BrowserWindow, screen } = require('electron'); /* Imports window features */
const path = require('node:path');

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  const winWidth = 500;
  const winHeight = 300;
  const margin = 20;

  /* Gets your computer's dimensions */
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,

    x: width - winWidth - margin,
    y: height - winHeight - margin,

    alwaysOnTop: true,

    webPreferences: {
      devTools: false
    },
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.webContents.openDevTools(); 
  /* Put mainWindow.load in here to call const main Window */
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});