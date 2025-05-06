/**
 * Code developed by Isaac Muliro - UI/UX Designer & Developer
 *
 * Usage Guidelines:
 * - Maintain modular structure when adding new features
 * - Use ES6+ syntax standards and some times I built my own modules from sratch
 * - Document any new functions with JSDoc comments
 * - For questions or contributions, contact isaac.muliro@purchase.edu
 * - Last updated: 2025-05-06
 */



const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');


require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
}); function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  const indexPath = path.join(__dirname, 'main', 'index.html');
  mainWindow.setTitle('');
  mainWindow.loadFile(indexPath);


  mainWindow.webContents.openDevTools({ mode: 'detach' });


  const swiftExecutablePath = path.join(__dirname, 'pinWindow');
  exec(swiftExecutablePath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      mainWindow.webContents.send('pin-window-reply', `Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      mainWindow.webContents.send('pin-window-reply', `Stderr: ${stderr}`);
      return;
    }
    console.log(`Stdout: ${stdout}`);
    mainWindow.webContents.send('pin-window-reply', stdout);
  });


  ipcMain.on('pin-window', (event) => {
    console.log('Received pin-window IPC message');
    exec(swiftExecutablePath, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        event.reply('pin-window-reply', `Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        event.reply('pin-window-reply', `Stderr: ${stderr}`);
        return;
      }
      console.log(`Stdout: ${stdout}`);
      event.reply('pin-window-reply', stdout);
    });
  });


  ipcMain.on('unpin-window', (event) => {
    console.log('Received unpin-window IPC message');


    event.reply('pin-window-reply', 'Window unpinned');
  });
}

app.whenReady().then(createWindow);

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