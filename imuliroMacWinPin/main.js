// const { app, BrowserWindow, ipcMain } = require('electron');
// const { exec } = require('child_process');
// const path = require('path');

// // Enable live reload for all the files inside the project directory
// require('electron-reload')(__dirname, {
//   electron: require(`${__dirname}/node_modules/electron`)
// });

// function createWindow () {
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       nodeIntegration: false,
//       contextIsolation: true,
//       preload: path.join(__dirname, 'preload.js') // Use a preload script if needed
//     }
//   });

//   const indexPath = path.join(__dirname, 'main','index.html');
//   mainWindow.setTitle(''); // Set the window title to an empty string
//   mainWindow.loadFile(indexPath);

//   // Open the DevTools in a separate window
//   mainWindow.webContents.openDevTools({ mode: 'detach' });

//   // Handle IPC call to pin window
//   ipcMain.on('pin-window', (event) => {
//     console.log('Received pin-window IPC message');
//     const swiftExecutablePath = path.join(__dirname, 'pinWindow'); // Adjust the path to your Swift executable
//     exec(swiftExecutablePath, (error, stdout, stderr) => {
//       if (error) {
//         console.error(`Error: ${error.message}`);
//         event.reply('pin-window-reply', `Error: ${error.message}`);
//         return;
//       }
//       if (stderr) {
//         console.error(`Stderr: ${stderr}`);
//         event.reply('pin-window-reply', `Stderr: ${stderr}`);
//         return;
//       }
//       console.log(`Stdout: ${stdout}`);
//       event.reply('pin-window-reply', stdout);
//     });
//   });

//   // Handle IPC call to unpin window
//   ipcMain.on('unpin-window', (event) => {
//     console.log('Received unpin-window IPC message');
//     // Implement the logic to unpin the window here
//     // For now, just send a reply indicating the window is unpinned
//     event.reply('pin-window-reply', 'Window unpinned');
//   });
// }

// app.whenReady().then(createWindow);

// app.on('window-all-closed', () => {
//   if (process.platform !== 'darwin') {
//     app.quit();
//   }
// });

// app.on('activate', () => {
//   if (BrowserWindow.getAllWindows().length === 0) {
//     createWindow();
//   }
// });




const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

// Enable live reload for all the files inside the project directory
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js') // Use a preload script if needed
    }
  });

  const indexPath = path.join(__dirname, 'main', 'index.html');
  mainWindow.setTitle(''); // Set the window title to an empty string
  mainWindow.loadFile(indexPath);

  // Open the DevTools in a separate window
  mainWindow.webContents.openDevTools({ mode: 'detach' });

  // Call the Swift executable when the app loads
  const swiftExecutablePath = path.join(__dirname, 'pinWindow'); // Adjust the path to your Swift executable
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

  // Handle IPC call to pin window
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

  // Handle IPC call to unpin window
  ipcMain.on('unpin-window', (event) => {
    console.log('Received unpin-window IPC message');
    // Implement the logic to unpin the window here
    // For now, just send a reply indicating the window is unpinned
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