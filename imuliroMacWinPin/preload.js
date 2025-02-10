// echo "# Uidesign" >> README.md
//                                                            git init
//                                                            git add README.md
//                                                            git commit -m "first commit"
//                                                            git branch -M main
//                                                            git remote add origin https://github.co
// m/xerxismuliro/Uidesign.git
//                                                            git push -u origin main


// git config --global http.postBuffer 524288000 // increase buffer size for large files to be pushed to github



// const { contextBridge, ipcRenderer } = require('electron');

// window.addEventListener('DOMContentLoaded', () => {
//   console.log('Preload script loaded');
// });

// // Expose a limited API to the renderer process
// contextBridge.exposeInMainWorld('electronAPI', {
//   sendMessage: (channel, data) => {
//     ipcRenderer.send(channel, data);
//   },
//   onMessage: (channel, callback) => {
//     ipcRenderer.on(channel, (event, ...args) => callback(...args));
//   },
//   pinWindow: () => {
//     console.log('Sending pin-window IPC message');
//     ipcRenderer.send('pin-window');
//   },
//   unpinWindow: () => {
//     console.log('Sending unpin-window IPC message');
//     ipcRenderer.send('unpin-window');
//   },
//   onPinWindowReply: (callback) => {
//     ipcRenderer.on('pin-window-reply', (event, data) => {
//       console.log('Received pin-window-reply IPC message');
//       callback(data);
//     });
//   }
// });


const { contextBridge, ipcRenderer } = require('electron');

window.addEventListener('DOMContentLoaded', () => {
  console.log('Preload script loaded');
});

// Expose a limited API to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  pinWindow: () => {
    console.log('Sending pin-window IPC message');
    ipcRenderer.send('pin-window');
  },
  onPinWindowReply: (callback) => {
    ipcRenderer.on('pin-window-reply', (event, data) => {
      console.log('Received pin-window-reply IPC message');
      callback(data);
    });
  }
});